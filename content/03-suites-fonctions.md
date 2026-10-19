函数列的极限可以有多种含义。本章的核心问题是：**极限运算何时可以与连续性、积分、求导交换顺序？** 答案几乎总是「一致收敛」，它就是第 1 章中范数 $\norm{\cdot}_\infty$ 下的收敛。全章 $A$ 是 $\R$（或某个赋范空间）的子集，函数取值于 $\K$。

## 逐点收敛与一致收敛

::: def id=def-cv-simple zh="逐点收敛" en="Pointwise convergence" fr="Convergence simple" ru="Поточечная сходимость"
$(f_n)$ 在 $A$ 上**逐点收敛**到 $f$，如果对每个 $x \in A$，$f_n(x) \to f(x)$。
:::

::: def id=def-cv-unif zh="一致收敛" en="Uniform convergence" fr="Convergence uniforme" ru="Равномерная сходимость"
$(f_n)$ 在 $A$ 上**一致收敛**到 $f$，如果
$$\norm{f_n - f}_{\infty, A} = \sup_{x \in A} \abs{f_n(x) - f(x)} \xrightarrow[n \to \infty]{} 0.$$
即：$\forall \eps > 0$，$\exists N$，$\forall n \ge N$，$\forall x \in A$，$\abs{f_n(x) - f(x)} \le \eps$。与逐点收敛的区别在于 $N$ 不依赖于 $x$。
:::

一致收敛蕴含逐点收敛，反之不成立。判断一致收敛的标准步骤：先求逐点极限 $f$，再估计 $\sup \abs{f_n - f}$。

::: ex id=ex-xn lvl=1
$f_n(x) = x^n$ 在 $[0,1]$ 上逐点收敛到 $f = \mathbf{1}_{\{1\}}$，但不一致收敛：$\sup_{[0,1[} x^n = 1$。在 $[0, a]$（$a < 1$）上一致收敛：$\sup_{[0,a]} x^n = a^n \to 0$。
:::

::: demo id=uniform
选择函数列，拖动 $n$ 与 $\eps$。绿色带是极限函数 $f$ 周围宽为 $\eps$ 的「管道」。一致收敛等价于：对任意 $\eps$，$n$ 足够大时 $f_n$ 的整个图像都落在管道内。红色线段标出 $\abs{f_n - f}$ 取最大值的位置。
:::

::: prop id=cauchy-unif zh="一致收敛的 Cauchy 准则" en="Uniform Cauchy criterion" fr="Critère de Cauchy uniforme" ru="Критерий Коши равномерной сходимости" lvl=1
$(f_n)$ 在 $A$ 上一致收敛，当且仅当
$\forall \eps > 0$，$\exists N$，$\forall p, q \ge N$，$\norm{f_p - f_q}_{\infty, A} \le \eps$。
:::

::: proof
必要性由三角不等式得到。充分性：对每个 $x$，$(f_n(x))$ 是 Cauchy 列，有极限 $f(x)$。在 $\abs{f_p(x) - f_q(x)} \le \eps$ 中令 $q \to \infty$，得 $\abs{f_p(x) - f(x)} \le \eps$ 对所有 $x$ 成立（这一论证与 {@c0-complet} 相同）。
:::

## 一致极限的连续性

::: thm id=cont-limite-unif zh="一致极限的连续性" en="Uniform limit theorem" fr="Continuité de la limite uniforme" ru="Непрерывность равномерного предела" lvl=1
若每个 $f_n$ 在 $a \in A$ 连续，且 $f_n$ 在 $A$ 上一致收敛到 $f$，则 $f$ 在 $a$ 连续。因此，连续函数的一致极限是连续函数。
:::

::: proof
$\eps/3$ 论证。取 $n$ 使 $\norm{f_n - f}_\infty \le \eps$；再由 $f_n$ 在 $a$ 连续，取 $\delta$ 使 $\abs{x - a} < \delta$ 时 $\abs{f_n(x) - f_n(a)} \le \eps$。于是
$$\abs{f(x) - f(a)} \le \abs{f(x) - f_n(x)} + \abs{f_n(x) - f_n(a)} + \abs{f_n(a) - f(a)} \le 3\eps.$$
:::

::: rem
连续性是局部性质，所以只要在每个点的某个邻域上一致收敛就够了。法国教材常用「在 $A$ 的每个紧子集（或每个闭区间）上一致收敛」作为假设，这比在整个 $A$ 上一致收敛弱得多。例如 $x^n$ 在 $[0,1[$ 上不一致收敛，但在每个 $[0,a]$ 上一致收敛，所以极限 $0$ 在 $[0,1[$ 上连续。
:::

::: cex lvl=1
{@ex-xn} 说明：连续函数的逐点极限可以不连续。反过来，{@cont-limite-unif} 的逆否命题给出一个实用判据：**若极限函数不连续，则收敛不一致。**
:::

::: thm id=double-limite zh="二重极限定理" en="Moore–Osgood theorem (interchange of limits)" fr="Théorème de la double limite" ru="Теорема о перестановке предельных переходов" lvl=1
设 $a \in \overline{A}$（可以是 $\pm\infty$），$f_n \to f$ 在 $A$ 上一致收敛，且对每个 $n$，$f_n(x) \to \ell_n$（$x \to a$）。则 $(\ell_n)$ 收敛到某个 $\ell$，且 $f(x) \to \ell$（$x \to a$）。即
$$\lim_{x \to a} \lim_{n \to \infty} f_n(x) = \lim_{n \to \infty} \lim_{x \to a} f_n(x).$$
:::

::: proof
由一致 Cauchy 准则，$\abs{f_p(x) - f_q(x)} \le \eps$ 对 $p, q \ge N$ 和所有 $x$ 成立；令 $x \to a$ 得 $\abs{\ell_p - \ell_q} \le \eps$，所以 $(\ell_n)$ 是 Cauchy 列，收敛到 $\ell$。然后与 {@cont-limite-unif} 一样用 $\eps/3$ 论证：
$\abs{f(x) - \ell} \le \abs{f(x) - f_n(x)} + \abs{f_n(x) - \ell_n} + \abs{\ell_n - \ell}$。
:::

::: thm id=dini zh="Dini 定理" en="Dini's theorem" fr="Théorème de Dini" ru="Теорема Дини" lvl=2
设 $K$ 紧，$f_n, f \in \Cc(K, \R)$，$(f_n)$ 逐点收敛到 $f$，且对每个 $x$，$(f_n(x))$ 单调。则收敛是一致的。
:::

::: sketch
令 $g_n = \abs{f_n - f}$。它连续、非负，且由单调性，对每个 $x$，$(g_n(x))$ 递减到 $0$（单调方向可以随 $x$ 变化）。若 $\norm{g_n}_\infty \ge \eps$ 对所有 $n$ 成立，取 $x_n$ 使 $g_n(x_n) \ge \eps$，抽取收敛子列 $x_{\varphi(n)} \to x$。对固定的 $m$ 和 $\varphi(n) \ge m$，由单调性 $g_m(x_{\varphi(n)}) \ge g_{\varphi(n)}(x_{\varphi(n)}) \ge \eps$，令 $n \to \infty$ 得 $g_m(x) \ge \eps$，与 $g_m(x) \to 0$ 矛盾。
:::

## 积分与求导

::: thm id=integration-unif zh="一致收敛下的积分交换" en="Interchange of limit and integral" fr="Intégration d'une limite uniforme sur un segment" ru="Предельный переход под знаком интеграла" lvl=1
若 $f_n \in \Cc([a,b])$ 在 $[a,b]$ 上一致收敛到 $f$，则
$$\int_a^b f_n \xrightarrow[n \to \infty]{} \int_a^b f.$$
更进一步，$x \mapsto \int_a^x f_n$ 在 $[a,b]$ 上一致收敛到 $x \mapsto \int_a^x f$。
:::

::: proof
$f$ 连续（{@cont-limite-unif}），且对 $x \in [a,b]$，
$\Big|\int_a^x f_n - \int_a^x f\Big| \le (b - a)\norm{f_n - f}_\infty \to 0$。
:::

::: cex id=cex-bosse lvl=1
在非紧区间上或只有逐点收敛时，结论不成立。$f_n(x) = n^2 x\, \e^{-nx}$ 在 $[0,1]$ 上逐点收敛到 $0$，但
$$\int_0^1 f_n = \int_0^n t\,\e^{-t}\,\dd t \xrightarrow[n\to\infty]{} 1.$$
$f_n$ 的「质量」集中在 $x = 1/n$ 附近的一个越来越高、越来越窄的峰上。第 6 章的控制收敛定理会给出更好的判据。
:::

::: thm id=derivation-suite zh="函数列的逐项求导" en="Differentiation of a sequence of functions" fr="Théorème de dérivation d'une suite de fonctions" ru="Теорема о дифференцировании функциональной последовательности" lvl=1
设 $I$ 是区间，$f_n \in \Cc^1(I)$。若

1. $(f_n)$ 在 $I$ 上逐点收敛到 $f$（只需在某一点收敛也可以），
2. $(f_n')$ 在 $I$ 的每个闭子区间上一致收敛到 $g$，

则 $f$ 是 $\Cc^1$ 的，$f' = g$，并且 $(f_n)$ 在每个闭子区间上一致收敛到 $f$。
:::

::: proof
固定 $a \in I$。由微积分基本定理，$f_n(x) = f_n(a) + \int_a^x f_n'$。由 {@integration-unif}，令 $n \to \infty$ 得
$$f(x) = f(a) + \int_a^x g.$$
$g$ 连续（一致极限），所以 $f$ 是 $\Cc^1$ 的且 $f' = g$。闭子区间上的一致收敛：$\abs{f_n(x) - f(x)} \le \abs{f_n(a) - f(a)} + \abs{x - a}\,\norm{f_n' - g}_\infty$。
:::

::: cex lvl=1
导数的收敛不能省略。$f_n(x) = \frac{\sin(nx)}{\sqrt n}$ 在 $\R$ 上一致收敛到 $0$（$\norm{f_n}_\infty = \frac{1}{\sqrt n}$），但 $f_n'(x) = \sqrt{n}\cos(nx)$ 在 $x = 0$ 处趋于 $+\infty$。一致收敛不保持可导性，更不保持导数。
:::

## 函数项级数

::: def id=def-cv-normale zh="正规收敛" en="Normal convergence (Weierstrass M-test)" fr="Convergence normale" ru="Нормальная сходимость (признак Вейерштрасса)"
函数项级数 $\sum f_n$ 的逐点、一致收敛是指部分和函数列的相应收敛。若 $\sum \norm{f_n}_{\infty, A} < +\infty$，称 $\sum f_n$ 在 $A$ 上**正规收敛**。
:::

::: thm id=normale-unif zh="正规收敛蕴含一致收敛" en="Normal convergence implies uniform convergence" fr="La convergence normale entraîne la convergence uniforme" ru="Признак Вейерштрасса" lvl=1
若 $\sum f_n$ 在 $A$ 上正规收敛，则它在 $A$ 上绝对收敛且一致收敛。实际应用中常写成：若 $\abs{f_n(x)} \le M_n$ 对所有 $x \in A$ 成立且 $\sum M_n < \infty$，则 $\sum f_n$ 一致收敛。
:::

::: proof
有界函数空间 $(\mathcal{B}(A), \norm{\cdot}_\infty)$ 是 Banach 空间（证明同 {@c0-complet}），再用 {@serie-abs-banach}。具体地，余项满足 $\big|\sum_{k > n} f_k(x)\big| \le \sum_{k>n} M_k \to 0$，与 $x$ 无关。
:::

::: cor id=transferts-series zh="函数项级数的三个交换定理" lvl=1
1. **连续性**：若 $f_n$ 连续且 $\sum f_n$ 在每个闭子区间上一致收敛，则和函数连续。
2. **逐项积分**：若 $f_n \in \Cc([a,b])$ 且 $\sum f_n$ 在 $[a,b]$ 上一致收敛，则 $\int_a^b \sum f_n = \sum \int_a^b f_n$。
3. **逐项求导**：若 $f_n \in \Cc^1(I)$，$\sum f_n$ 逐点收敛，$\sum f_n'$ 在 $I$ 的每个闭子区间上一致收敛，则 $\sum f_n$ 是 $\Cc^1$ 的，且 $\big(\sum f_n\big)' = \sum f_n'$。
:::

::: proof
把 {@cont-limite-unif}、{@integration-unif}、{@derivation-suite} 应用到部分和函数列上，并利用积分与求导的线性。
:::

::: ex id=zeta-regularite lvl=1 zh="ζ 函数的正则性"
$\zeta(s) = \sum_{n \ge 1} n^{-s}$ 在 $]1, +\infty[$ 上是 $\Cc^\infty$ 的。实际上，在 $[a, +\infty[$（$a > 1$）上 $\abs{n^{-s}} \le n^{-a}$，所以级数正规收敛；$k$ 阶导数的级数 $\sum (-\ln n)^k n^{-s}$ 在同样的区间上被 $(\ln n)^k n^{-a}$ 控制，也正规收敛。但这个级数在整个 $]1, +\infty[$ 上不一致收敛：否则由 {@double-limite}，$\lim_{s \to 1^+} \zeta(s)$ 会等于 $\sum \frac1n$，但后者发散。用级数–积分比较可以得到 $\zeta(s) \sim \frac{1}{s - 1}$（$s \to 1^+$）。
:::

::: ex id=ex-alternee-unif lvl=1
$\sum_{n \ge 1} \frac{(-1)^n}{n + x}$ 在 $[0, +\infty[$ 上一致收敛但不正规收敛。由交错级数余项估计 {@csa}，$\abs{R_n(x)} \le \frac{1}{n + 1 + x} \le \frac{1}{n+1}$，与 $x$ 无关；但 $\sup_x \frac{1}{n+x} = \frac1n$，$\sum \frac1n$ 发散。
:::

::: thm id=dirichlet-unif zh="一致收敛的 Dirichlet 判别法" en="Dirichlet's test for uniform convergence" fr="Critère d'Abel uniforme" ru="Признак Дирихле равномерной сходимости" lvl=2
设对每个 $x \in A$，$(a_n(x))$ 是递减的非负实数列，且 $a_n \to 0$ 在 $A$ 上一致；$\sum b_n(x)$ 的部分和在 $A$ 上一致有界。则 $\sum a_n b_n$ 在 $A$ 上一致收敛。
:::

::: sketch
重复 {@dirichlet-series} 的证明，并注意每一步的估计都与 $x$ 无关：$\big|\sum_{k=p}^{q} a_k b_k\big| \le 2M a_p(x) \le 2M \norm{a_p}_\infty$。
:::

## 逼近定理

::: thm id=weierstrass zh="Weierstrass 逼近定理" en="Weierstrass approximation theorem" fr="Théorème d'approximation de Weierstrass" ru="Теорема Вейерштрасса о приближении" lvl=1
$[a,b]$ 上的任何连续函数都是多项式函数的一致极限。换言之，多项式在 $(\Cc([a,b]), \norm{\cdot}_\infty)$ 中稠密。
:::

::: proof
仿射变换后可设 $[a,b] = [0,1]$。对 $f \in \Cc([0,1])$，定义 **Bernstein 多项式**
$$B_n f(x) = \sum_{k=0}^n f\Big(\frac kn\Big) \binom nk x^k (1-x)^{n-k}.$$
记 $p_k(x) = \binom nk x^k (1-x)^{n-k} \ge 0$。由二项式定理求导可得三个恒等式：
$$\sum_k p_k(x) = 1,\quad \sum_k k\, p_k(x) = nx,\quad \sum_k (k - nx)^2 p_k(x) = nx(1-x) \le \frac n4.$$
（概率解释：$p_k$ 是参数为 $(n,x)$ 的二项分布，其均值为 $nx$，方差为 $nx(1-x)$。）

给定 $\eps > 0$。由 Heine 定理 {@heine}，存在 $\delta$，使 $\abs{s - t} < \delta \Rightarrow \abs{f(s) - f(t)} < \eps$。记 $M = \norm{f}_\infty$。则
$$\abs{B_n f(x) - f(x)} \le \sum_k \Big|f\Big(\frac kn\Big) - f(x)\Big| p_k(x).$$
把求和分成 $\abs{\frac kn - x} < \delta$ 和 $\abs{\frac kn - x} \ge \delta$ 两部分。前者 $\le \eps \sum p_k = \eps$。后者 $\le 2M \sum_{\abs{k - nx} \ge n\delta} p_k(x) \le 2M \sum_k \frac{(k - nx)^2}{n^2\delta^2} p_k(x) \le \frac{2M}{n^2\delta^2} \cdot \frac n4 = \frac{M}{2n\delta^2}$（这一步就是 Chebyshev 不等式）。所以 $\norm{B_n f - f}_\infty \le \eps + \frac{M}{2n\delta^2} \le 2\eps$（$n$ 充分大）。
:::

::: thm id=escalier zh="阶梯函数逼近" en="Approximation by step functions" fr="Approximation uniforme par des fonctions en escalier" ru="Приближение ступенчатыми функциями" lvl=2
$[a,b]$ 上的分段连续函数是阶梯函数的一致极限。
:::

::: sketch
在每个连续段上，函数一致连续（延拓到闭区间后用 Heine 定理）。取足够细的分割，在每个小区间上用左端点的值代替函数值。这是法国教材定义 Riemann 积分的出发点。
:::

::: thm id=stone-weierstrass zh="Stone–Weierstrass 定理" en="Stone–Weierstrass theorem" fr="Théorème de Stone–Weierstrass" ru="Теорема Стоуна–Вейерштрасса" lvl=3 ref="Rudin, *Principles of Mathematical Analysis*，定理 7.32"
设 $K$ 是紧度量空间，$\mathcal{A} \subset \Cc(K, \R)$ 是子代数，包含常数函数且分离点。则 $\mathcal{A}$ 在 $(\Cc(K,\R), \norm{\cdot}_\infty)$ 中稠密。应用：三角多项式在 $2\pi$ 周期连续函数中稠密（第 5 章用 Fejér 定理直接证明）。
:::

::: thm id=arzela-ascoli zh="Arzelà–Ascoli 定理" en="Arzelà–Ascoli theorem" fr="Théorème d'Arzelà–Ascoli" ru="Теорема Арцела–Асколи" lvl=2
设 $K$ 紧，$(f_n)$ 是 $\Cc(K)$ 中一致有界且**等度连续**的函数列（$\forall \eps\ \exists \delta\ \forall n$，$\norm{x - y} < \delta \Rightarrow \abs{f_n(x) - f_n(y)} < \eps$）。则 $(f_n)$ 有一致收敛的子列。
:::

::: sketch
取 $K$ 的可数稠密子集 $\{x_k\}$。由对角线方法，抽取子列使它在每个 $x_k$ 处收敛。再用等度连续性与 $K$ 的紧性（有限个 $\delta$-球覆盖 $K$），证明这个子列满足一致 Cauchy 准则。第 8 章用它证明 Peano 存在性定理。
:::

## 拓展：病态函数

::: ex id=takagi zh="Takagi 函数" lvl=2
令 $\varphi(x) = \operatorname{dist}(x, \Z)$（锯齿函数，$\abs{\varphi} \le \frac12$），
$$T(x) = \sum_{n=0}^\infty \frac{\varphi(2^n x)}{2^n}.$$
级数被 $\sum 2^{-n-1}$ 控制，正规收敛，所以 $T$ 连续。$T$ 处处不可导。
:::

::: sketch
固定 $x$，取包含 $x$ 的二进区间 $[\frac{k}{2^m}, \frac{k+1}{2^m}]$，记两端为 $u_m \le x \le v_m$。对 $n < m$，$\varphi(2^n \cdot)$ 在 $[u_m, v_m]$ 上是斜率为 $\pm 2^n$ 的线性函数；对 $n \ge m$，它在两端都为 $0$。所以差商
$$\frac{T(v_m) - T(u_m)}{v_m - u_m} = \sum_{n < m} \pm 1,$$
它的奇偶性随 $m$ 交替变化，不可能收敛。如果 $T$ 在 $x$ 可导，这个差商必须收敛到 $T'(x)$。
:::

::: thm id=peano-courbe zh="Peano 曲线" en="Peano curve (space-filling curve)" fr="Courbe de Peano" ru="Кривая Пеано" lvl=3 ref="Sagan, *Space-Filling Curves*，Springer 1994"
存在从 $[0,1]$ 到 $[0,1]^2$ 的连续满射。另一方面（Netto 定理），不存在从 $[0,1]$ 到 $[0,1]^2$ 的连续双射。可以用一致收敛的折线序列构造 Peano 曲线，极限的连续性由 {@cont-limite-unif} 保证。
:::

::: thm id=muntz zh="Müntz–Szász 定理" en="Müntz–Szász theorem" fr="Théorème de Müntz" ru="Теорема Мюнца" lvl=3 ref="Rudin, *Real and Complex Analysis*，定理 15.26"
设 $0 < \lambda_1 < \lambda_2 < \cdots \to \infty$。函数 $1, x^{\lambda_1}, x^{\lambda_2}, \dots$ 的线性组合在 $\Cc([0,1])$ 中稠密，当且仅当 $\sum \frac{1}{\lambda_n} = +\infty$。例如只用 $x^{p}$（$p$ 为素数）构成的多项式也能一致逼近任何连续函数。
:::
