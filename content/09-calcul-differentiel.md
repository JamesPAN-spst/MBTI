一元函数的导数是一个数；多元函数的「导数」是一个**线性映射**，即最好的线性近似。本章按法国大纲的方式，在有限维赋范空间之间讨论可微性，然后落到 $\R^n$ 的坐标计算（偏导数、Jacobi 矩阵、梯度）。全章 $E, F$ 是有限维实赋范空间（由 {@equiv-dimfinie}，范数的选取不影响任何结论），$U \subset E$ 是开集，$f : U \to F$。

## 多元函数的极限与连续

多元函数的极限与连续已经在第 1 章定义。这里只强调两个容易出错的现象。

::: cex id=cex-limite-droites lvl=1
沿所有直线趋近并不足够。令 $f(x, y) = \dfrac{xy^2}{x^2 + y^4}$，$f(0,0) = 0$。沿直线 $y = mx$：$f(x, mx) = \frac{m^2x}{1 + m^4x^2} \to 0$；沿 $x = 0$：$f = 0$。但沿抛物线 $x = y^2$：$f(y^2, y) = \frac12$。所以 $f$ 在原点不连续。
:::

::: cex lvl=1
$g(x, y) = \dfrac{xy}{x^2 + y^2}$ 的两个累次极限在原点都等于 $0$，但沿 $y = x$ 时 $g = \frac12$，重极限不存在。
:::

::: method zh="证明多元函数连续性的常用方法"
1. 由连续函数经运算、复合得到。
2. 在可疑点用极坐标：若 $\abs{f(r\cos\theta, r\sin\theta) - \ell} \le \varepsilon(r)$，其中 $\varepsilon(r) \to 0$ **与 $\theta$ 无关**，则极限为 $\ell$。
3. 用不等式控制，例如 $\abs{xy} \le \frac12(x^2 + y^2)$。
:::

## 可微性与微分

::: def id=def-differentiable zh="可微、微分" en="Differentiable map, (Fréchet) differential" fr="Application différentiable, différentielle" ru="Дифференцируемое отображение, дифференциал Фреше"
$f$ 在 $a \in U$ **可微**，如果存在线性映射 $L \in \Lin(E, F)$，使
$$f(a + h) = f(a) + L(h) + o(\norm h)\qquad(h \to 0).$$
$L$ 是唯一的，称为 $f$ 在 $a$ 的**微分**，记为 $\dd f(a)$ 或 $\dd f_a$。
:::

::: prop id=diff-prop lvl=1
1. 微分若存在则唯一。
2. 可微 ⇒ 连续。
3. 若 $f$ 在 $a$ 可微，则对任意 $v \in E$，**方向导数** $D_vf(a) = \lim_{t \to 0}\frac{f(a + tv) - f(a)}{t}$ 存在，且等于 $\dd f(a)(v)$。
:::

::: proof
1. 若 $L_1, L_2$ 都满足定义，则 $(L_1 - L_2)(h) = o(\norm h)$。对固定的 $v$，取 $h = tv$，$t \to 0$：$(L_1 - L_2)(v) = \frac{o(t)}{t} \to 0$。
2. $L$ 是有限维空间上的线性映射，连续（{@cor-dimfinie}），所以 $f(a + h) - f(a) = L(h) + o(\norm h) \to 0$。
3. $f(a + tv) = f(a) + t\,L(v) + o(t)$。
:::

::: def id=def-partielles zh="偏导数、Jacobi 矩阵、梯度" en="Partial derivatives, Jacobian matrix, gradient" fr="Dérivées partielles, matrice jacobienne, gradient" ru="Частные производные, матрица Якоби, градиент"
设 $E = \R^n$，$F = \R^p$。第 $j$ 个**偏导数** $\frac{\partial f}{\partial x_j}(a) = D_{e_j}f(a)$。若 $f$ 在 $a$ 可微，$\dd f(a)$ 在标准基下的矩阵是 **Jacobi 矩阵**
$$J_f(a) = \Big(\frac{\partial f_i}{\partial x_j}(a)\Big)_{1 \le i \le p,\ 1 \le j \le n},\qquad \dd f(a)(h) = \sum_{j=1}^n\frac{\partial f}{\partial x_j}(a)\,h_j.$$
若 $p = 1$ 且 $E$ 是 Euclid 空间，**梯度** $\nabla f(a)$ 是由 $\dd f(a)(h) = \ps{\nabla f(a), h}$ 唯一确定的向量；在标准内积下 $\nabla f = \big(\frac{\partial f}{\partial x_1}, \dots, \frac{\partial f}{\partial x_n}\big)$。
:::

::: prop id=gradient-geometrie zh="梯度的几何意义" lvl=1
若 $\nabla f(a) \ne 0$，则在所有单位向量 $v$ 中，方向导数 $D_vf(a)$ 在 $v = \frac{\nabla f(a)}{\norm{\nabla f(a)}}$ 时最大。梯度与等值面（等高线）的切向量正交（在第 10 章用隐函数定理严格化）。
:::

::: proof
$D_vf(a) = \ps{\nabla f(a), v} \le \norm{\nabla f(a)}$（Cauchy–Schwarz），等号当且仅当 $v$ 与 $\nabla f(a)$ 同向。正交性：若 $\gamma$ 是等值面上的可微曲线，$\gamma(0) = a$，则 $f(\gamma(t))$ 为常数，求导（链式法则，下一节）得 $\ps{\nabla f(a), \gamma'(0)} = 0$。
:::

::: cex id=cex-directionnelles lvl=1
所有方向导数都存在，函数也未必可微，甚至未必连续。令 $f(x, y) = \dfrac{x^2y}{x^4 + y^2}$，$f(0,0) = 0$。对 $v = (v_1, v_2)$，$v_2 \ne 0$：
$$\frac{f(tv)}{t} = \frac{v_1^2v_2}{t^2v_1^4 + v_2^2} \to \frac{v_1^2}{v_2};$$
$v_2 = 0$ 时 $f(tv) = 0$。所以所有方向导数都存在，但 $v \mapsto D_vf(0)$ 不是线性的，$f$ 在原点不可微。而且沿 $y = x^2$，$f = \frac12$，$f$ 在原点不连续。
:::

::: demo id=gradient
等高线（色带）与梯度场（箭头）。把指针移到图上：粗箭头是该点的梯度，绿色线段沿等高线的切线方向，两者总是垂直。在「鞍点」和「猴鞍」的原点，梯度为零，但原点不是极值点。
:::

## 运算法则

::: thm id=chain-rule zh="链式法则" en="Chain rule" fr="Différentielle d'une composée (règle de la chaîne)" ru="Дифференцирование сложного отображения" lvl=1
设 $f : U \to V$ 在 $a$ 可微，$g : V \to G$ 在 $f(a)$ 可微（$V \subset F$ 开）。则 $g \circ f$ 在 $a$ 可微，且
$$\dd(g \circ f)(a) = \dd g(f(a)) \circ \dd f(a),\qquad J_{g \circ f}(a) = J_g(f(a))\,J_f(a).$$
坐标形式：$\dfrac{\partial(g \circ f)_i}{\partial x_j} = \sum_k\dfrac{\partial g_i}{\partial y_k}\dfrac{\partial f_k}{\partial x_j}$。
:::

::: proof
记 $b = f(a)$，$L = \dd f(a)$，$M = \dd g(b)$。写 $f(a + h) = b + L(h) + \norm h\,\eps_1(h)$，$g(b + k) = g(b) + M(k) + \norm k\,\eps_2(k)$，其中 $\eps_1(h) \to 0$，$\eps_2(k) \to 0$，并约定 $\eps_2(0) = 0$。令 $k = f(a + h) - b = L(h) + \norm h\,\eps_1(h)$，则 $\norm k \le (\norm L + \norm{\eps_1(h)})\norm h$。于是
$$g(f(a + h)) = g(b) + M(L(h)) + \norm h\,M(\eps_1(h)) + \norm k\,\eps_2(k).$$
最后两项都是 $o(\norm h)$：第一项因为 $M$ 连续，第二项因为 $\norm k = O(\norm h)$ 且 $k \to 0$ 时 $\eps_2(k) \to 0$。
:::

::: prop id=diff-bilineaire zh="双线性映射与乘积" lvl=1
1. 连续线性映射 $L$ 处处可微，$\dd L(a) = L$。
2. 双线性映射 $B : E_1 \times E_2 \to F$ 处处可微，$\dd B(a, b)(h, k) = B(a, k) + B(h, b)$。推论：若 $u, v$ 可微，则 $\dd(uv) = u\,\dd v + v\,\dd u$（以及内积、矩阵乘积的类似公式）。
:::

::: proof
1. $L(a + h) = L(a) + L(h)$，余项为 $0$。
2. $B(a + h, b + k) = B(a, b) + B(a, k) + B(h, b) + B(h, k)$。有限维时 $B$ 连续，$\norm{B(h, k)} \le C\norm h\norm k = o(\norm{(h, k)})$。推论由链式法则得到。
:::

::: ex id=diff-inverse-det zh="矩阵求逆与行列式的微分" lvl=1
1. 在 $\GL_n(\R)$（开集）上，$\varphi(A) = A^{-1}$ 可微，$\dd\varphi(A)(H) = -A^{-1}HA^{-1}$。证明：$(A + H)^{-1} = (I + A^{-1}H)^{-1}A^{-1}$，对 $\norm H$ 充分小用 Neumann 级数 $(I + K)^{-1} = I - K + K^2 - \dots$，取到一阶。
2. **Jacobi 公式**：$\dd(\det)(A)(H) = \tr\big(\operatorname{com}(A)^TH\big)$，特别地 $\dd(\det)(I)(H) = \tr H$。证明：$\det$ 关于每一列是线性的，所以 $\frac{\partial\det}{\partial a_{ij}}(A)$ 是代数余子式 $\operatorname{com}(A)_{ij}$（按第 $j$ 列展开）。与 {@liouville-formule} 比较：Liouville 公式正是 Jacobi 公式与链式法则的结合。
:::

## C¹ 函数

::: def zh="$\Cc^1$ 映射" en="Continuously differentiable map" fr="Application de classe $\mathcal{C}^1$" ru="Непрерывно дифференцируемое отображение"
$f$ 在 $U$ 上是 $\Cc^1$ 的，如果它在 $U$ 上处处可微，且 $\dd f : U \to \Lin(E, F)$ 连续。
:::

::: thm id=c1-partielles zh="$\Cc^1$ 的偏导数判别法" en="$C^1$ criterion via partial derivatives" fr="Caractérisation des fonctions $\mathcal{C}^1$ par les dérivées partielles" ru="Достаточное условие дифференцируемости" lvl=1
设 $U \subset \R^n$ 开。$f$ 在 $U$ 上是 $\Cc^1$ 的，当且仅当所有偏导数 $\frac{\partial f}{\partial x_j}$ 在 $U$ 上存在且连续。
:::

::: proof
必要性：$\frac{\partial f}{\partial x_j}(x) = \dd f(x)(e_j)$，是连续映射 $\dd f$ 与求值的复合。

充分性：取 $n = 2$ 说明思路（一般情形相同）。设 $a = (a_1, a_2)$，$h = (h_1, h_2)$ 很小。写
$$f(a + h) - f(a) = \big[f(a_1 + h_1, a_2 + h_2) - f(a_1, a_2 + h_2)\big] + \big[f(a_1, a_2 + h_2) - f(a_1, a_2)\big].$$
对每个方括号用一元函数的中值定理（对 $F$ 的每个分量分别用）：第一项等于 $h_1\frac{\partial f}{\partial x_1}(a_1 + \theta_1h_1, a_2 + h_2)$，第二项等于 $h_2\frac{\partial f}{\partial x_2}(a_1, a_2 + \theta_2h_2)$，其中 $\theta_i \in ]0,1[$。由偏导数在 $a$ 的连续性，这两个偏导数分别等于 $\frac{\partial f}{\partial x_i}(a) + o(1)$。所以
$$f(a + h) - f(a) = h_1\frac{\partial f}{\partial x_1}(a) + h_2\frac{\partial f}{\partial x_2}(a) + o(\norm h),$$
即 $f$ 在 $a$ 可微。$\dd f$ 的连续性来自偏导数的连续性（$\dd f$ 的矩阵元就是偏导数）。
:::

::: thm id=accroissements-finis zh="有限增量不等式" en="Mean value inequality" fr="Inégalité des accroissements finis" ru="Теорема о конечных приращениях (неравенство)" lvl=1
设 $f : U \to F$ 是 $\Cc^1$ 的，线段 $[a, b] \subset U$。则
$$\norm{f(b) - f(a)} \le \sup_{x \in [a,b]}\norm{\dd f(x)}\cdot\norm{b - a}.$$
特别地，若 $U$ 凸且 $\norm{\dd f} \le k$，则 $f$ 在 $U$ 上是 $k$-Lipschitz 的。
:::

::: proof
令 $\gamma(t) = f(a + t(b - a))$，$t \in [0, 1]$。由链式法则，$\gamma'(t) = \dd f(a + t(b-a))(b - a)$，所以 $\norm{\gamma'(t)} \le M\norm{b - a}$，$M$ 是右边的上确界。由微积分基本定理（对向量值函数逐坐标成立），
$$\norm{f(b) - f(a)} = \Big\lVert\int_0^1\gamma'(t)\,\dd t\Big\rVert \le \int_0^1\norm{\gamma'(t)}\,\dd t \le M\norm{b - a}.$$
:::

::: rem
对向量值函数，中值**等式** $f(b) - f(a) = \dd f(c)(b - a)$ 一般不成立：$f(t) = (\cos t, \sin t)$，$f(2\pi) - f(0) = 0$，但 $f'(t)$ 从不为零。所以只能用不等式。
:::

::: cor id=diff-nulle-constante lvl=1
若 $U$ 是道路连通开集，$\dd f = 0$ 在 $U$ 上成立，则 $f$ 在 $U$ 上为常数。
:::

::: proof
由 {@accroissements-finis}，$f$ 在 $U$ 中每个球上为常数。固定 $a \in U$，集合 $\{x \in U : f(x) = f(a)\}$ 是开集（局部常数）；它在 $U$ 中也是相对闭集（$f$ 连续）。对任一点 $b$，取连接 $a, b$ 的道路 $\gamma$，令 $t^* = \sup\{t : f(\gamma(s)) = f(a)\ \forall s \le t\}$，由开、闭两个性质可得 $t^* = 1$。
:::

## 高阶导数

::: def zh="$\Cc^k$ 函数、Hessian 矩阵" en="$C^k$ maps, Hessian matrix" fr="Fonctions de classe $\mathcal{C}^k$, matrice hessienne" ru="Функции класса $C^k$, матрица Гессе"
$f : U \subset \R^n \to \R$ 是 $\Cc^k$ 的，如果所有直到 $k$ 阶的偏导数都存在且连续。$\Cc^2$ 函数在 $a$ 的 **Hessian 矩阵**为 $H_f(a) = \Big(\frac{\partial^2 f}{\partial x_i\partial x_j}(a)\Big)_{i,j}$。
:::

::: thm id=schwarz zh="Schwarz 定理" en="Schwarz's theorem (symmetry of second derivatives)" fr="Théorème de Schwarz" ru="Теорема Шварца о равенстве смешанных производных" lvl=1
若 $f$ 是 $\Cc^2$ 的，则对一切 $i, j$，$\dfrac{\partial^2 f}{\partial x_i\partial x_j} = \dfrac{\partial^2 f}{\partial x_j\partial x_i}$。因此 Hessian 矩阵是对称的。
:::

::: proof
只涉及两个变量，设 $n = 2$，$a = (0, 0)$。对小的 $h, k \ne 0$，令
$$\Delta(h, k) = f(h, k) - f(h, 0) - f(0, k) + f(0, 0).$$
令 $\varphi(x) = f(x, k) - f(x, 0)$，则 $\Delta = \varphi(h) - \varphi(0) = h\varphi'(\theta h) = h\Big[\frac{\partial f}{\partial x}(\theta h, k) - \frac{\partial f}{\partial x}(\theta h, 0)\Big]$。对 $y \mapsto \frac{\partial f}{\partial x}(\theta h, y)$ 再用一次中值定理：
$$\Delta = hk\,\frac{\partial^2 f}{\partial y\,\partial x}(\theta h, \theta' k).$$
交换 $x, y$ 的角色，用 $\psi(y) = f(h, y) - f(0, y)$，同理得 $\Delta = hk\,\frac{\partial^2 f}{\partial x\,\partial y}(\theta''h, \theta'''k)$。两式相除，令 $(h, k) \to 0$，由二阶偏导数的连续性得结论。
:::

::: cex id=cex-schwarz lvl=1
连续性条件不能省略。令 $f(x, y) = \dfrac{xy(x^2 - y^2)}{x^2 + y^2}$，$f(0, 0) = 0$（Peano 的例子）。计算得 $\frac{\partial f}{\partial x}(0, y) = -y$，$\frac{\partial f}{\partial y}(x, 0) = x$，所以
$$\frac{\partial^2 f}{\partial y\,\partial x}(0, 0) = -1,\qquad\frac{\partial^2 f}{\partial x\,\partial y}(0, 0) = 1.$$
$f$ 是 $\Cc^1$ 的，二阶偏导数在原点之外存在，但在原点不连续。
:::

::: thm id=taylor-young zh="二阶 Taylor–Young 公式" en="Second-order Taylor formula" fr="Formule de Taylor–Young à l'ordre 2" ru="Формула Тейлора второго порядка" lvl=1
若 $f : U \subset \R^n \to \R$ 是 $\Cc^2$ 的，$a \in U$，则
$$f(a + h) = f(a) + \ps{\nabla f(a), h} + \frac12 h^TH_f(a)\,h + o(\norm h^2).$$
:::

::: proof
取 $r$ 使 $B(a, r) \subset U$，$\norm h < r$。$g(t) = f(a + th)$ 在 $[0,1]$ 上是 $\Cc^2$ 的，由链式法则 $g'(t) = \ps{\nabla f(a + th), h}$，$g''(t) = h^TH_f(a + th)h$。由一元 Taylor–Lagrange 公式，存在 $\theta \in ]0, 1[$，
$$f(a + h) = f(a) + \ps{\nabla f(a), h} + \frac12h^TH_f(a + \theta h)h.$$
而 $\abs{h^T(H_f(a + \theta h) - H_f(a))h} \le \norm{H_f(a + \theta h) - H_f(a)}\,\norm h^2 = o(\norm h^2)$，因为 $H_f$ 连续。
:::

## 极值

::: def zh="局部极值、临界点" en="Local extremum, critical point" fr="Extremum local, point critique" ru="Локальный экстремум, критическая точка"
$a$ 是 $f$ 的**局部极小点**，如果存在 $a$ 的邻域 $V$，使 $f(x) \ge f(a)$ 对 $x \in V$ 成立；**严格**局部极小指 $x \ne a$ 时 $f(x) > f(a)$。若 $\dd f(a) = 0$，称 $a$ 为**临界点**（point critique）。
:::

::: thm id=cn-extremum zh="一阶必要条件" en="First-order necessary condition" fr="Condition nécessaire du premier ordre" ru="Необходимое условие экстремума" lvl=1
若 $f : U \to \R$ 在**开集** $U$ 的点 $a$ 处可微且取局部极值，则 $\dd f(a) = 0$。
:::

::: proof
对每个方向 $v$，$t \mapsto f(a + tv)$ 在 $t = 0$ 处取局部极值，由一元的 Fermat 引理，$D_vf(a) = 0$。
:::

::: rem
$U$ 必须是开集。在闭区域的边界上，极值点处梯度不必为零，需要单独讨论（或用第 10 章的 Lagrange 乘子法）。
:::

::: thm id=cs-extremum zh="二阶条件" en="Second-order conditions" fr="Conditions du second ordre" ru="Достаточные условия экстремума" lvl=1
设 $f$ 是 $\Cc^2$ 的，$a$ 是临界点。

1. 若 $a$ 是局部极小点，则 $H_f(a)$ 半正定。
2. 若 $H_f(a)$ 正定，则 $a$ 是严格局部极小点。
3. 若 $H_f(a)$ 有一正一负两个特征值，则 $a$ 不是极值点（鞍点）。
:::

::: proof
由 Taylor–Young 公式，$f(a + h) - f(a) = \frac12h^TH h + o(\norm h^2)$，$H = H_f(a)$。

1. 若有 $v$ 使 $v^THv < 0$，则 $f(a + tv) - f(a) = \frac{t^2}{2}v^THv + o(t^2) < 0$（$t$ 小），矛盾。
2. $H$ 正定，其最小特征值 $\lambda > 0$，$h^THh \ge \lambda\norm h^2$（谱定理，Euclid 范数）。于是 $f(a + h) - f(a) \ge \big(\frac\lambda2 + o(1)\big)\norm h^2 > 0$（$h \ne 0$ 充分小）。
3. 沿两个特征向量方向分别得到 $f > f(a)$ 和 $f < f(a)$ 的点。
:::

::: method zh="二元情形：Monge 记号"
对 $n = 2$，记 $r = \frac{\partial^2 f}{\partial x^2}(a)$，$s = \frac{\partial^2 f}{\partial x\partial y}(a)$，$t = \frac{\partial^2 f}{\partial y^2}(a)$（法国传统记号）。在临界点：

- $rt - s^2 > 0$，$r > 0$：严格局部极小；
- $rt - s^2 > 0$，$r < 0$：严格局部极大；
- $rt - s^2 < 0$：鞍点；
- $rt - s^2 = 0$：不能判断，需要更高阶的分析（例如 $x^4 + y^4$ 与 $x^4 - y^4$）。
:::

::: ex lvl=1
$f(x, y) = x^3 + y^3 - 3xy$。$\nabla f = (3x^2 - 3y, 3y^2 - 3x) = 0$ 给出 $(0, 0)$ 与 $(1, 1)$。在 $(0,0)$：$r = 0$，$s = -3$，$t = 0$，$rt - s^2 < 0$，鞍点。在 $(1,1)$：$r = t = 6$，$s = -3$，$rt - s^2 = 27 > 0$，严格局部极小。它不是全局极小（$f(x, 0) = x^3 \to -\infty$）。
:::

::: thm id=convexe-minimum zh="凸函数的临界点" lvl=1
若 $U$ 凸，$f : U \to \R$ 可微且凸，则 $f$ 的任何临界点都是全局极小点。
:::

::: proof
凸函数的图像在切平面上方：对 $x, a \in U$，$t \mapsto f(a + t(x - a))$ 是凸函数，其在 $0$ 处的右导数 $\le$ 割线斜率，即 $\dd f(a)(x - a) \le f(x) - f(a)$。若 $\dd f(a) = 0$，则 $f(x) \ge f(a)$。
:::

::: method zh="在紧集上求最值"
设 $K = \overline{U}$ 紧，$f$ 在 $K$ 上连续、在 $U$ 内可微。由 {@image-compact}，最值存在。最值点要么是 $U$ 内的临界点，要么在边界 $\partial U$ 上。分别列出候选点，比较函数值。
:::

## 向量场与 Poincaré 引理

::: def zh="散度、旋度、Laplace 算子" en="Divergence, curl, Laplacian" fr="Divergence, rotationnel, laplacien" ru="Дивергенция, ротор, оператор Лапласа"
对 $\R^3$ 上的 $\Cc^1$ 向量场 $V = (P, Q, R)$：$\operatorname{div}V = \partial_xP + \partial_yQ + \partial_zR$，$\operatorname{rot}V = \nabla \wedge V$。对 $\Cc^2$ 函数 $f$：$\Delta f = \operatorname{div}\nabla f = \sum\partial_{x_i}^2f$。$\Delta f = 0$ 的函数称为**调和函数**。由 Schwarz 定理，$\operatorname{rot}\nabla f = 0$，$\operatorname{div}\operatorname{rot}V = 0$。
:::

::: thm id=poincare zh="Poincaré 引理（星形域）" en="Poincaré lemma (star-shaped domain)" fr="Théorème de Poincaré" ru="Лемма Пуанкаре" lvl=1
设 $U \subset \R^n$ 是关于 $0$ 的星形开集，$V = (V_1, \dots, V_n)$ 是 $U$ 上的 $\Cc^1$ 向量场。则存在 $f \in \Cc^2(U)$，使 $V = \nabla f$（$V$ 是**梯度场**），当且仅当
$$\frac{\partial V_i}{\partial x_j} = \frac{\partial V_j}{\partial x_i}\qquad\text{对一切 } i, j.$$
:::

::: proof
必要性就是 Schwarz 定理。充分性：沿径向积分，令
$$f(x) = \int_0^1\ps{V(tx), x}\,\dd t = \int_0^1\sum_iV_i(tx)\,x_i\,\dd t.$$
被积函数关于 $x$ 是 $\Cc^1$ 的，在 $x$ 的一个紧邻域上偏导数有界，由 {@derivation-parametre}，
$$\frac{\partial f}{\partial x_j}(x) = \int_0^1\Big(V_j(tx) + \sum_i t\,\frac{\partial V_i}{\partial x_j}(tx)\,x_i\Big)\dd t = \int_0^1\Big(V_j(tx) + t\sum_ix_i\frac{\partial V_j}{\partial x_i}(tx)\Big)\dd t,$$
第二个等号用了假设。被积函数恰好是 $\frac{\dd}{\dd t}\big(tV_j(tx)\big)$，所以积分等于 $V_j(x)$。
:::

::: cex lvl=1
星形条件不能省略。在 $\R^2\setminus\{0\}$ 上，$V = \Big(\dfrac{-y}{x^2 + y^2}, \dfrac{x}{x^2 + y^2}\Big)$ 满足 $\partial_yV_1 = \partial_xV_2$，但它不是梯度场：沿单位圆的环量 $\oint V\cdot\dd\ell = 2\pi \ne 0$（第 11 章）。局部地 $V = \nabla\theta$（$\theta$ 是极角），但 $\theta$ 不能在整个 $\R^2\setminus\{0\}$ 上连续地定义。这是 de Rham 上同调的第一个例子。
:::
