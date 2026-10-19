Fourier 在 1807 年研究热传导时断言「任何周期函数都可以写成三角级数」。这个断言引出了整个现代分析：Riemann 积分、一致收敛、Cantor 集合论、Lebesgue 积分，都是为了弄清它在什么意义下成立。本章的函数都是 $2\pi$ 周期的分段连续函数 $f : \R \to \C$（fonctions continues par morceaux）。

## Fourier 系数

::: def id=def-coef-fourier zh="Fourier 系数与 Fourier 级数" en="Fourier coefficients, Fourier series" fr="Coefficients de Fourier, série de Fourier" ru="Коэффициенты Фурье, ряд Фурье"
对 $n \in \Z$，记 $e_n(t) = \e^{\ii nt}$，
$$c_n(f) = \frac{1}{2\pi}\int_{-\pi}^{\pi} f(t)\,\e^{-\ii nt}\,\dd t.$$
**Fourier 部分和** $S_N f = \sum_{\abs{n} \le N} c_n(f)\, e_n$。实形式：$a_n = c_n + c_{-n}$，$b_n = \ii(c_n - c_{-n})$，
$$S_N f(x) = \frac{a_0}{2} + \sum_{n=1}^N \big(a_n \cos nx + b_n \sin nx\big),\quad a_n = \frac1\pi\int_{-\pi}^{\pi} f(t)\cos nt\,\dd t,\ b_n = \frac1\pi\int_{-\pi}^{\pi} f(t)\sin nt\,\dd t.$$
:::

::: prop id=orthonormal zh="三角系的正交性" en="Orthonormality of the trigonometric system" fr="Orthonormalité du système trigonométrique" ru="Ортонормированность тригонометрической системы" lvl=1
在 $2\pi$ 周期连续函数空间上定义内积 $\ps{f, g} = \frac{1}{2\pi}\int_{-\pi}^{\pi} f\,\bar g$，相应范数记为 $\norm{\cdot}_2$。则 $(e_n)_{n \in \Z}$ 是正交规范族，且 $c_n(f) = \ps{f, e_n}$。
:::

::: proof
$\ps{e_n, e_m} = \frac{1}{2\pi}\int_{-\pi}^{\pi} \e^{\ii(n-m)t}\,\dd t$，$n = m$ 时为 $1$；$n \ne m$ 时原函数 $\frac{\e^{\ii(n-m)t}}{\ii(n-m)}$ 是 $2\pi$ 周期的，积分为 $0$。
:::

::: rem
分段连续函数的 $\norm{\cdot}_2$ 只是半范数（改变有限个点的值不改变积分）。这不影响下面的论证。
:::

::: prop id=coef-proprietes lvl=1
1. 若 $f$ 是偶函数，$b_n = 0$；若 $f$ 是奇函数，$a_n = 0$。
2. 若 $f$ 连续且分段 $\Cc^1$，则 $c_n(f') = \ii n\, c_n(f)$。
3. $\abs{c_n(f)} \le \frac{1}{2\pi}\int_{-\pi}^{\pi}\abs{f}$。
:::

::: proof
1. 对称性。2. 分部积分，边界项因周期性抵消。3. 显然。
:::

## Bessel 不等式与 Riemann–Lebesgue 引理

::: thm id=bessel zh="Bessel 不等式" en="Bessel's inequality" fr="Inégalité de Bessel" ru="Неравенство Бесселя" lvl=1
$S_N f$ 是 $f$ 在 $\mathcal{T}_N = \Vect(e_n)_{\abs n \le N}$ 上的正交投影。因此对一切 $P \in \mathcal{T}_N$，$\norm{f - S_N f}_2 \le \norm{f - P}_2$，并且
$$\sum_{n \in \Z} \abs{c_n(f)}^2 \le \norm{f}_2^2 = \frac{1}{2\pi}\int_{-\pi}^{\pi} \abs{f}^2.$$
:::

::: proof
对 $\abs{n} \le N$，$\ps{f - S_N f, e_n} = c_n(f) - c_n(f) = 0$，所以 $f - S_N f \perp \mathcal{T}_N$。对 $P \in \mathcal{T}_N$，由 Pythagoras 定理，$\norm{f - P}_2^2 = \norm{f - S_N f}_2^2 + \norm{S_N f - P}_2^2$。取 $P = 0$：$\norm{f}_2^2 = \norm{f - S_N f}_2^2 + \sum_{\abs n \le N} \abs{c_n}^2 \ge \sum_{\abs n \le N} \abs{c_n}^2$，令 $N \to \infty$。
:::

::: thm id=riemann-lebesgue zh="Riemann–Lebesgue 引理" en="Riemann–Lebesgue lemma" fr="Lemme de Riemann–Lebesgue" ru="Лемма Римана–Лебега" lvl=1
若 $g$ 在 $[a,b]$ 上分段连续，则
$$\int_a^b g(t)\,\e^{\ii\lambda t}\,\dd t \xrightarrow[\lambda \to \pm\infty]{} 0.$$
特别地 $c_n(f) \to 0$（$\abs n \to \infty$）。
:::

::: proof
若 $g = \mathbf{1}_{[c,d]}$，积分等于 $\frac{\e^{\ii\lambda d} - \e^{\ii\lambda c}}{\ii\lambda}$，绝对值 $\le \frac{2}{\abs\lambda}$。由线性，结论对阶梯函数成立。一般情形：由 {@escalier}，取阶梯函数 $h$ 使 $\norm{g - h}_\infty \le \eps$，则
$$\Big|\int_a^b g\,\e^{\ii\lambda t}\Big| \le (b - a)\eps + \Big|\int_a^b h\,\e^{\ii\lambda t}\Big|,$$
第二项在 $\abs{\lambda}$ 充分大时 $\le \eps$。
:::

## Fejér 定理

::: def id=def-fejer zh="Dirichlet 核与 Fejér 核" en="Dirichlet kernel and Fejér kernel" fr="Noyaux de Dirichlet et de Fejér" ru="Ядра Дирихле и Фейера"
$$D_N(t) = \sum_{\abs{n} \le N} \e^{\ii nt} = \frac{\sin\big((N + \frac12)t\big)}{\sin(t/2)},\qquad K_N(t) = \frac{1}{N+1}\sum_{k=0}^N D_k(t) = \frac{1}{N+1}\left(\frac{\sin\frac{(N+1)t}{2}}{\sin\frac t2}\right)^2.$$
它们满足 $S_N f(x) = \frac{1}{2\pi}\int_{-\pi}^{\pi} f(x - t)D_N(t)\,\dd t$。**Fejér 平均**（Cesàro 平均）定义为 $\sigma_N f = \frac{1}{N+1}\sum_{k=0}^N S_k f = \frac{1}{2\pi}\int_{-\pi}^{\pi} f(x-t)K_N(t)\,\dd t$。
:::

::: lem id=fejer-noyau lvl=1
1. $K_N \ge 0$；
2. $\frac{1}{2\pi}\int_{-\pi}^{\pi} K_N = 1$；
3. 对 $0 < \delta \le \abs{t} \le \pi$，$K_N(t) \le \dfrac{1}{(N+1)\sin^2(\delta/2)}$。
:::

::: proof
$D_N$ 的闭式：$\sin\frac t2 \cdot D_N(t) = \sum_{\abs n \le N} \frac{\e^{\ii(n + 1/2)t} - \e^{\ii(n-1/2)t}}{2\ii}$，求和是望远镜式的，得 $\sin((N+\frac12)t)$。$K_N$ 的闭式同理：$\sin^2\frac t2 \cdot \sum_{k=0}^N D_k(t) = \sum_{k=0}^N \sin\frac t2 \sin((k + \frac12)t) = \frac12\sum_{k=0}^N\big(\cos kt - \cos (k+1)t\big) = \frac{1 - \cos(N+1)t}{2} = \sin^2\frac{(N+1)t}{2}$。由闭式得 1 和 3；2 来自 $\frac{1}{2\pi}\int D_k = 1$（只有 $n = 0$ 项有贡献）。
:::

::: thm id=fejer zh="Fejér 定理" en="Fejér's theorem" fr="Théorème de Fejér" ru="Теорема Фейера" lvl=1
若 $f$ 是 $2\pi$ 周期的连续函数，则 $\sigma_N f$ 在 $\R$ 上一致收敛到 $f$。
:::

::: proof
由引理的第 2 条，
$$\sigma_N f(x) - f(x) = \frac{1}{2\pi}\int_{-\pi}^{\pi}\big(f(x - t) - f(x)\big)K_N(t)\,\dd t.$$
$f$ 连续且周期，所以一致连续：给定 $\eps$，存在 $\delta$，$\abs{t} \le \delta \Rightarrow \abs{f(x-t) - f(x)} \le \eps$（对一切 $x$）。把积分分成 $\abs{t} \le \delta$ 与 $\delta \le \abs{t} \le \pi$ 两部分，用 $K_N \ge 0$：
$$\abs{\sigma_N f(x) - f(x)} \le \eps \cdot 1 + 2\norm{f}_\infty \cdot \frac{1}{(N+1)\sin^2(\delta/2)}.$$
第二项与 $x$ 无关，$N \to \infty$ 时趋于 $0$。
:::

::: cor id=trig-dense zh="三角多项式的稠密性" en="Density of trigonometric polynomials" fr="Densité des polynômes trigonométriques" ru="Плотность тригонометрических многочленов" lvl=1
三角多项式在 $2\pi$ 周期连续函数空间中按 $\norm{\cdot}_\infty$ 稠密，从而按 $\norm{\cdot}_2$ 稠密。推论：$[a,b]$ 上的 Weierstrass 定理 {@weierstrass} 的另一个证明（把三角多项式展开为幂级数并截断）。
:::

::: proof
$\sigma_N f$ 是三角多项式。$\norm{g}_2 \le \norm{g}_\infty$。
:::

::: rem
$K_N \ge 0$、积分为 $1$、质量集中在 $0$ 附近：这三条性质定义了**逼近单位元**（approximate identity）。Weierstrass 定理的 Bernstein 证明和 Fejér 定理本质上是同一个想法。与之对比，Dirichlet 核 $D_N$ 变号，且 $\frac{1}{2\pi}\int\abs{D_N} \sim \frac{4}{\pi^2}\ln N \to \infty$（Lebesgue 常数），这正是部分和 $S_N f$ 可能不收敛的根源。
:::

## Parseval 恒等式

::: thm id=parseval zh="Parseval 恒等式" en="Parseval's identity" fr="Égalité de Parseval" ru="Равенство Парсеваля" lvl=1
对 $2\pi$ 周期的分段连续函数 $f$：$\norm{f - S_N f}_2 \to 0$，并且
$$\sum_{n \in \Z} \abs{c_n(f)}^2 = \frac{1}{2\pi}\int_{-\pi}^{\pi} \abs{f}^2,\qquad\text{实形式：}\ \frac{\abs{a_0}^2}{4} + \frac12\sum_{n \ge 1}\big(\abs{a_n}^2 + \abs{b_n}^2\big) = \frac{1}{2\pi}\int_{-\pi}^{\pi}\abs{f}^2.$$
:::

::: proof
先设 $f$ 连续。给定 $\eps$，由 {@trig-dense} 取三角多项式 $P \in \mathcal{T}_M$，使 $\norm{f - P}_2 \le \eps$。对 $N \ge M$，$P \in \mathcal{T}_N$，由 {@bessel} 的最佳逼近性质，$\norm{f - S_N f}_2 \le \norm{f - P}_2 \le \eps$。

一般情形：分段连续函数 $f$ 可以被连续周期函数 $g$ 按 $\norm{\cdot}_2$ 逼近（在每个间断点附近的小区间上用线性插值修改 $f$，修改量在 $\norm{\cdot}_2$ 中可以任意小）。由 $\norm{f - S_N f}_2 \le \norm{f - g}_2 + \norm{g - S_N g}_2 + \norm{S_N(g - f)}_2$ 且 $\norm{S_N h}_2 \le \norm{h}_2$（Bessel），得到结论。

最后，由 Pythagoras 定理 $\norm{f}_2^2 = \norm{f - S_N f}_2^2 + \sum_{\abs n \le N}\abs{c_n}^2$，令 $N \to \infty$。
:::

::: cor id=unicite-fourier lvl=1
若两个连续的 $2\pi$ 周期函数有相同的 Fourier 系数，则它们相等。
:::

::: proof
对差 $h$ 用 Parseval：$\int \abs{h}^2 = 0$，而 $\abs{h}^2$ 连续非负，所以 $h = 0$。
:::

## 逐点收敛：Dirichlet 定理

::: thm id=dirichlet-fourier zh="Dirichlet 定理" en="Dirichlet's theorem (pointwise convergence)" fr="Théorème de Dirichlet" ru="Теорема Дирихле о сходимости ряда Фурье" lvl=1
若 $f$ 是 $2\pi$ 周期的分段 $\Cc^1$ 函数，则对每个 $x$，
$$S_N f(x) \xrightarrow[N \to \infty]{} \frac{f(x^+) + f(x^-)}{2}.$$
特别地，在 $f$ 的连续点，Fourier 级数收敛到 $f(x)$。
:::

::: proof
$D_N$ 是偶函数，$\frac{1}{2\pi}\int_0^\pi D_N = \frac12$。于是
$$S_N f(x) - \frac{f(x^+) + f(x^-)}{2} = \frac{1}{2\pi}\int_0^\pi \big[f(x+t) - f(x^+) + f(x-t) - f(x^-)\big] D_N(t)\,\dd t.$$
令 $g(t) = \dfrac{f(x+t) - f(x^+) + f(x-t) - f(x^-)}{\sin(t/2)}$，$t \in ]0, \pi]$。$g$ 在 $]0, \pi]$ 上分段连续。当 $t \to 0^+$ 时，由于 $f$ 分段 $\Cc^1$，$\frac{f(x + t) - f(x^+)}{t}$ 有极限（右导数），$\frac{t}{\sin(t/2)} \to 2$，所以 $g$ 在 $0^+$ 处有极限，$g$ 在 $[0, \pi]$ 上分段连续。因此积分等于 $\frac{1}{2\pi}\int_0^\pi g(t)\sin\big((N + \frac12)t\big)\,\dd t$，由 Riemann–Lebesgue 引理 {@riemann-lebesgue} 趋于 $0$。
:::

::: thm id=cv-normale-fourier zh="正规收敛" lvl=1
若 $f$ 是 $2\pi$ 周期、连续且分段 $\Cc^1$ 的函数，则 $\sum \abs{c_n(f)} < \infty$，Fourier 级数在 $\R$ 上正规收敛到 $f$。
:::

::: proof
由 {@coef-proprietes}，$c_n(f) = \frac{c_n(f')}{\ii n}$（$n \ne 0$）。由 $\abs{ab} \le \frac12(a^2 + b^2)$，
$\abs{c_n(f)} \le \frac12\Big(\frac{1}{n^2} + \abs{c_n(f')}^2\Big)$，而 $\sum \abs{c_n(f')}^2 < \infty$（Bessel）。所以级数正规收敛，其和是连续函数 $g$，且与 $f$ 有相同的 Fourier 系数（逐项积分），由 {@unicite-fourier}，$g = f$。
:::

## 应用

::: ex id=bale zh="Basel 问题" lvl=1
取 $f(x) = x$（$-\pi < x < \pi$，周期延拓）。$f$ 是奇函数，$b_n = \frac{2(-1)^{n+1}}{n}$。由 Parseval，
$$\frac{1}{2\pi}\int_{-\pi}^{\pi} x^2\,\dd x = \frac{\pi^2}{3} = \frac12\sum_{n \ge 1}\frac{4}{n^2},\qquad\text{即}\quad \zeta(2) = \sum_{n \ge 1}\frac{1}{n^2} = \frac{\pi^2}{6}.$$
取 $f(x) = \abs{x}$：$a_0 = \pi$，$a_n = -\frac{4}{\pi n^2}$（$n$ 奇），其余为 $0$。Parseval 给出 $\sum_{n\ \text{奇}}\frac{1}{n^4} = \frac{\pi^4}{96}$，从而 $\zeta(4) = \frac{16}{15}\cdot\frac{\pi^4}{96} = \frac{\pi^4}{90}$。在 $x = 0$ 处用 Dirichlet 定理，得 $\sum_{n\ \text{奇}}\frac{1}{n^2} = \frac{\pi^2}{8}$。
:::

::: demo id=fourier
方波、锯齿波、三角波的 Fourier 部分和 $S_N$（蓝色）与 Fejér 平均 $\sigma_N$（紫色）。观察方波跳跃点附近：$S_N$ 的过冲不随 $N$ 增大而消失，这就是 Gibbs 现象；Fejér 平均没有过冲，因为 $K_N \ge 0$。三角波连续且分段 $\Cc^1$，部分和一致收敛，与 {@cv-normale-fourier} 一致。
:::

::: thm id=gibbs zh="Gibbs 现象" en="Gibbs phenomenon" fr="Phénomène de Gibbs" ru="Явление Гиббса" lvl=2
设 $f$ 是方波（$(0, \pi)$ 上为 $1$，$(-\pi, 0)$ 上为 $-1$）。则
$$\lim_{N \to \infty} \max_{[0,\pi]} S_N f = \frac{2}{\pi}\int_0^\pi \frac{\sin t}{t}\,\dd t \approx 1.17898.$$
过冲约为跳跃高度 $2$ 的 $8.95\%$，与 $N$ 无关。
:::

::: sketch
$S_{2m-1}f(x) = \frac{4}{\pi}\sum_{k=1}^{m}\frac{\sin(2k-1)x}{2k-1}$，其导数为 $\frac{2}{\pi}\cdot\frac{\sin 2mx}{\sin x}$，第一个正零点是 $x_m = \frac{\pi}{2m}$，那里取得最大值。$S_{2m-1}f(x_m) = \frac{2}{\pi}\sum_{k=1}^m \frac{\sin\big((2k-1)\frac{\pi}{2m}\big)}{(2k-1)\frac{\pi}{2m}}\cdot\frac{\pi}{m}$ 是 $\frac{2}{\pi}\int_0^\pi\frac{\sin t}{t}\,\dd t$ 的中点 Riemann 和。
:::

::: thm id=isoperimetrique zh="等周不等式" en="Isoperimetric inequality" fr="Inégalité isopérimétrique" ru="Изопериметрическое неравенство" lvl=2
平面上长度为 $L$ 的分段 $\Cc^1$ 简单闭曲线所围面积 $A$ 满足 $4\pi A \le L^2$，等号当且仅当曲线是圆。
:::

::: sketch
（Hurwitz，1901）用弧长参数化并缩放，使曲线为 $z : [0, 2\pi] \to \C$，$\abs{z'} = \frac{L}{2\pi}$。用 Parseval 计算：$\frac{1}{2\pi}\int\abs{z'}^2 = \sum n^2\abs{c_n}^2 = \frac{L^2}{4\pi^2}$。面积公式（第 11 章 Green–Riemann）$A = \frac12\operatorname{Im}\int_0^{2\pi}\bar z z'\,\dd t = \pi\sum n\abs{c_n}^2$。于是
$$L^2 - 4\pi A = 4\pi^2\sum_{n \in \Z}(n^2 - n)\abs{c_n}^2 \ge 0,$$
等号当且仅当 $n \notin \{0, 1\}$ 时 $c_n = 0$，即 $z(t) = c_0 + c_1\e^{\ii t}$ 是圆。
:::

::: thm id=weyl zh="Weyl 等分布定理" en="Weyl's equidistribution theorem" fr="Théorème d'équirépartition de Weyl" ru="Теорема Вейля о равномерном распределении" lvl=2
数列 $(x_n)$ 模 $1$ **等分布**，是指对每个区间 $[a, b] \subset [0, 1]$，$\frac1N\#\{n \le N : \{x_n\} \in [a,b]\} \to b - a$。**Weyl 判别准则**：$(x_n)$ 模 $1$ 等分布，当且仅当对每个整数 $k \ne 0$，
$$\frac{1}{N}\sum_{n=1}^N \e^{2\pi\ii k x_n} \xrightarrow[N\to\infty]{} 0.$$
推论：若 $\alpha$ 是无理数，$(n\alpha)$ 模 $1$ 等分布。
:::

::: sketch
条件说明对每个三角多项式 $P$（周期 $1$），$\frac1N\sum P(x_n) \to \int_0^1 P$。由 Fejér 定理推广到所有周期连续函数，再用连续函数从上下逼近区间的指示函数。对 $x_n = n\alpha$，和是几何级数，绝对值 $\le \frac{2}{\abs{1 - \e^{2\pi\ii k\alpha}}}$，除以 $N$ 后趋于 $0$。
:::

::: rem zh="热方程"
Fourier 的原始问题：$[0, \pi]$ 上的杆，两端温度为 $0$，初始温度 $f$。热方程 $\partial_t u = \partial_{xx} u$ 的分离变量解为
$$u(t, x) = \sum_{n \ge 1} b_n\,\e^{-n^2 t}\sin nx,$$
其中 $b_n$ 是 $f$ 的奇延拓的 Fourier 系数。对 $t > 0$，因子 $\e^{-n^2 t}$ 让级数及其各阶导数正规收敛，所以 $u$ 是光滑的，即使 $f$ 不连续。$\R$ 上的版本由 $f$ 与 Gauss 型热核的卷积给出，研究它的工具正是第 7 章的含参积分。
:::

## 收敛的边界

::: thm id=du-bois-reymond zh="du Bois-Reymond 反例" en="du Bois-Reymond's counterexample" fr="Contre-exemple de du Bois-Reymond" ru="Пример дю Буа-Реймона" lvl=3 ref="Katznelson, *An Introduction to Harmonic Analysis*，第 II 章"
存在连续的 $2\pi$ 周期函数，其 Fourier 级数在某一点发散（1873）。由 Baire 定理还可以证明：这样的函数在 $\Cc(\T)$ 中构成稠密 $G_\delta$ 集（Banach–Steinhaus 定理的应用，见 {@baire}）。
:::

::: thm id=kolmogorov-carleson zh="Kolmogorov 与 Carleson 定理" en="Kolmogorov's and Carleson's theorems" fr="Théorèmes de Kolmogorov et de Carleson" ru="Теоремы Колмогорова и Карлесона" lvl=3 ref="Kolmogorov (1926)；Carleson, *Acta Math.* 116 (1966)；Grafakos, *Classical Fourier Analysis*"
Kolmogorov（1926）：存在 $L^1$ 函数，其 Fourier 级数**处处**发散。Carleson（1966）：$L^2$ 函数（特别是连续函数）的 Fourier 级数**几乎处处**收敛。Hunt（1968）推广到 $L^p$，$p > 1$。
:::

::: open zh="未解决问题"
**$\big(\frac32\big)^n$ 模 $1$ 的分布。** 数列 $\{(3/2)^n\}$（小数部分）在 $[0, 1]$ 中是否稠密？是否等分布？都未知。已知对几乎所有 $\alpha > 1$，$(\alpha^n)$ 模 $1$ 等分布（Koksma，1935），但对 $\frac32$、$\e$、$\pi$ 这样的具体数都无法判断。（反过来，黄金分割比 $\varphi$ 这类 Pisot 数满足 $\{\varphi^n\} \to 0$ 或 $1$，可以判定不等分布。）与之相关的是 **Mahler 的 Z 数问题**：是否存在 $\xi > 0$，使 $\{\xi(3/2)^n\} \in [0, \frac12[$ 对一切 $n$ 成立？
:::
