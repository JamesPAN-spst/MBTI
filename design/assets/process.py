"""插画素材处理：清理透明通道、去掉画进图里的透明格子、裁边、缩放、导出 WebP。

用法：python3 -I process.py <原图目录> <输出目录>
原图目录里的文件名形如 NN-name.png；输出 NN-name.webp（大图）与 NN-name-sm.webp（缩略图）。
"""
import glob
import os
import sys

import numpy as np
from PIL import Image, ImageFilter
from scipy import ndimage

LARGE = (1100, 1320)   # 封面上最高约 650px，按 2 倍屏准备
SMALL = (360, 440)     # 方案页缩略图


def remove_checker(rgb):
    """把画进像素里的灰白棋盘格识别为背景，返回 alpha（0–255）。"""
    a = rgb.astype(int)
    mx, mn = a.max(2), a.min(2)
    neutral = (mx - mn) <= 14
    hi = neutral & (mn >= 244)
    lo = neutral & (mn >= 200) & (mx <= 228)
    cand = neutral & (mn >= 198)        # 包括两种格子色之间的过渡像素，整张棋盘才能连成一片
    lab, n = ndimage.label(cand)
    bg = np.zeros(cand.shape, bool)
    border = set(np.unique(np.concatenate([lab[0], lab[-1], lab[:, 0], lab[:, -1]]))) - {0}
    sizes = ndimage.sum(np.ones_like(lab), lab, index=np.arange(1, n + 1))
    hi_cnt = ndimage.sum(hi, lab, index=np.arange(1, n + 1))
    lo_cnt = ndimage.sum(lo, lab, index=np.arange(1, n + 1))
    for k in range(1, n + 1):
        s = sizes[k - 1]
        two_tone = s > 150 and hi_cnt[k - 1] / s > .2 and lo_cnt[k - 1] / s > .2
        if k in border or two_tone:
            bg |= lab == k
    # 去掉背景里残留的孤立小块（半个格子之类），主体内部的白点不受影响
    fg = ~bg
    flab, fn = ndimage.label(fg)
    fsizes = ndimage.sum(np.ones_like(flab), flab, index=np.arange(1, fn + 1))
    fg &= np.isin(flab, np.arange(1, fn + 1)[fsizes >= 900])
    # 收紧 1px，避免边缘残留浅色光晕；再轻微羽化
    fg = ndimage.binary_opening(fg, iterations=1)
    fg = ndimage.binary_erosion(fg, iterations=1)
    alpha = Image.fromarray((fg * 255).astype(np.uint8)).filter(ImageFilter.GaussianBlur(.7))
    return np.asarray(alpha)


def clean(path):
    im = Image.open(path)
    if im.mode == 'RGBA':
        arr = np.asarray(im).copy()
        al = arr[..., 3].astype(int)
        al[al >= 232] = 255          # 主体本应不透明（原图约 252）
        al[al <= 10] = 0             # 去掉四周几乎看不见的雾
        arr[..., 3] = al.astype(np.uint8)
    else:
        rgb = np.asarray(im.convert('RGB'))
        arr = np.dstack([rgb, remove_checker(rgb)])
    out = Image.fromarray(arr, 'RGBA')
    bbox = Image.fromarray((arr[..., 3] > 10).astype(np.uint8) * 255).getbbox()
    pad = int(max(out.size) * .015)
    x0, y0, x1, y1 = bbox
    return out.crop((max(0, x0 - pad), max(0, y0 - pad), min(out.width, x1 + pad), min(out.height, y1 + pad)))


def fit(im, box):
    im = im.copy()
    im.thumbnail(box, Image.LANCZOS)
    return im


def main(src, dst):
    os.makedirs(dst, exist_ok=True)
    for path in sorted(glob.glob(os.path.join(src, '*.png'))):
        name = os.path.splitext(os.path.basename(path))[0]
        im = clean(path)
        big, small = fit(im, LARGE), fit(im, SMALL)
        big.save(os.path.join(dst, f'{name}.webp'), 'WEBP', quality=80, alpha_quality=90, method=6)
        small.save(os.path.join(dst, f'{name}-sm.webp'), 'WEBP', quality=76, alpha_quality=85, method=6)
        kb = lambda f: os.path.getsize(os.path.join(dst, f)) // 1024
        print(f'{name}: {big.size} {kb(name + ".webp")}KB · {small.size} {kb(name + "-sm.webp")}KB')


if __name__ == '__main__':
    main(sys.argv[1], sys.argv[2])
