一元函数中，$f'(a) \ne 0$ 意味着 $f$ 在 $a$ 附近可逆。本章的两个定理把这个事实推广到多元情形：**局部逆定理**说「微分可逆 ⇒ 局部可逆」，**隐函数定理**说「方程 $g(x, y) = 0$ 在适当条件下可以局部解出 $y = \varphi(x)$」。它们是微分几何（子流形）和最优化（Lagrange 乘子）的基础。法国 MP 2021 大纲只要求最优化部分，局部逆与隐函数定理属于 licence L2/L3 的标准内容。全章 $U \subset \R^n$ 是开集，所有映射至少是 $\Cc^1$ 的。

## 局部逆定理

::: def id=def-diffeo zh="$\Cc^k$ 微分同胚" en="$C^k$-diffeomorphism" fr="$\mathcal{C}^k$-difféomorphisme" ru="$C^k$-диффеоморфизм"
设 $U, V$ 是 $\R^n$ 的开集。$f : U \to V$ 是 **$\Cc^k$ 微分同胚**，如果 $f$ 是双射，且 $f$ 与 $f^{-1}$ 都是 $\Cc^k$ 的（$k \ge 1$）。此时由链式法则，$\dd f(a)$ 可逆，且 $\dd(f^{-1})(f(a)) = \dd f(a)^{-1}$。
:::

::: cex lvl=1
$\Cc^1$ 双射未必是微分同胚：$x \mapsto x^3$ 是 $\R$ 上的 $\Cc^\infty$ 双射，但逆映射 $x^{1/3}$ 在 $0$ 处不可导。对应地，$\dd f(0) = 0$ 不可逆。
:::

::: thm id=inversion-locale zh="局部逆定理" en="Inverse function theorem" fr="Théorème d'inversion locale" ru="Теорема об обратном отображении" lvl=1
设 $f : U \to \R^n$ 是 $\Cc^k$ 的（$k \ge 1$），$a \in U$，$\dd f(a)$ 可逆。则存在 $a$ 的开邻域 $V$ 和 $f(a)$ 的开邻域 $W$，使 $f$ 是从 $V$ 到 $W$ 的 $\Cc^k$ 微分同胚。
:::

::: proof
**化简。** 用 $\dd f(a)^{-1}\circ\big(f(a + x) - f(a)\big)$ 代替 $f$，可设 $a = 0$，$f(0) = 0$，$\dd f(0) = \Id$。令 $g(x) = x - f(x)$，则 $\dd g(0) = 0$。由 $\dd f$ 连续，取 $r > 0$ 使 $\overline{B}(0, r) \subset U$，且在 $\overline{B}(0, r)$ 上 $\norm{\dd g} \le \frac12$、$\dd f(x)$ 可逆（$\GL_n$ 是开集）。由有限增量不等式 {@accroissements-finis}，$g$ 在 $\overline{B}(0, r)$ 上是 $\frac12$-Lipschitz 的。

**求解 $f(x) = y$。** 对 $\norm y < \frac r2$，$f(x) = y$ 等价于 $x$ 是 $T_y(x) = y + g(x)$ 的不动点。$T_y$ 把 $\overline{B}(0, r)$ 映到自身：$\norm{T_y(x)} \le \norm y + \norm{g(x) - g(0)} < \frac r2 + \frac12\norm x \le r$；且 $T_y$ 是 $\frac12$-压缩的。由 Banach 不动点定理 {@point-fixe}，存在唯一的 $x \in \overline{B}(0, r)$ 使 $f(x) = y$，而且 $\norm{x} < r$。

令 $W = B(0, \frac r2)$，$V = B(0, r) \cap f^{-1}(W)$（开集）。则 $f : V \to W$ 是双射。

**逆映射连续。** 对 $x_1, x_2 \in V$：$\norm{x_1 - x_2} \le \norm{f(x_1) - f(x_2)} + \norm{g(x_1) - g(x_2)} \le \norm{f(x_1) - f(x_2)} + \frac12\norm{x_1 - x_2}$，所以 $\norm{f^{-1}(y_1) - f^{-1}(y_2)} \le 2\norm{y_1 - y_2}$。

**逆映射可微。** 设 $y, y + k \in W$，$x = f^{-1}(y)$，$x + h = f^{-1}(y + k)$，$L = \dd f(x)$。则 $k = f(x + h) - f(x) = Lh + o(\norm h)$，所以 $h = L^{-1}k + L^{-1}o(\norm h)$。由上一步 $\norm h \le 2\norm k$，所以 $o(\norm h) = o(\norm k)$，即 $f^{-1}$ 在 $y$ 可微，$\dd f^{-1}(y) = \dd f(f^{-1}(y))^{-1}$。

**正则性。** $\dd(f^{-1}) = \operatorname{inv}\circ\dd f\circ f^{-1}$，其中 $\operatorname{inv} : \GL_n \to \GL_n$ 是 $\Cc^\infty$ 的（{@diff-inverse-det}，或由 Cramer 公式）。若 $f$ 是 $\Cc^k$ 的，归纳可知 $f^{-1}$ 是 $\Cc^k$ 的。
:::

::: cor id=inversion-globale zh="整体逆定理" en="Global inverse function theorem" fr="Théorème d'inversion globale" ru="Глобальная теорема об обратном отображении" lvl=1
若 $f : U \to \R^n$ 是 $\Cc^k$ 的**单射**，且 $\dd f(x)$ 处处可逆，则 $f(U)$ 是开集，$f$ 是从 $U$ 到 $f(U)$ 的 $\Cc^k$ 微分同胚。
:::

::: proof
由局部逆定理，$f(U)$ 是开集（每个点 $f(a)$ 有邻域 $W \subset f(U)$）。$f^{-1}$ 在每个 $W$ 上与局部逆映射一致，所以是 $\Cc^k$ 的。
:::

::: ex id=polaires zh="极坐标" lvl=1
$\Phi(r, \theta) = (r\cos\theta, r\sin\theta)$，$\det J_\Phi = r$。$\Phi$ 是从 $]0, +\infty[ \times ]-\pi, \pi[$ 到 $\R^2 \setminus (\R_- \times \{0\})$ 的 $\Cc^\infty$ 微分同胚（由 {@inversion-globale}）。但 $\Phi$ 在 $]0, +\infty[ \times \R$ 上处处是局部微分同胚，而不是单射：局部可逆不蕴含整体可逆。
:::

::: thm id=hadamard-global zh="Hadamard 整体逆定理" en="Hadamard's global inverse function theorem" fr="Théorème d'inversion globale de Hadamard" ru="Теорема Адамара" lvl=3 ref="Krantz–Parks, *The Implicit Function Theorem*，§6.2"
若 $f : \R^n \to \R^n$ 是 $\Cc^1$ 的，$\dd f(x)$ 处处可逆，且 $f$ 是**真映射**（紧集的原像是紧集；等价地 $\norm{f(x)} \to \infty$ 当 $\norm x \to \infty$），则 $f$ 是 $\R^n$ 到自身的微分同胚。
:::

::: open zh="Jacobian 猜想"
设 $F : \C^n \to \C^n$ 是多项式映射，$\det J_F$ 是非零常数。$F$ 是否一定有多项式逆映射？由局部逆定理，$F$ 局部可逆；问题在于整体。$n = 1$ 时显然成立（多项式的导数是非零常数，所以是一次多项式）。$n \ge 2$ 时，这个由 Keller 在 1939 年提出的问题至今未解决，即使 $n = 2$ 也是如此。Smale 把它列入 21 世纪的 18 个数学问题之中。
:::

## 隐函数定理

::: thm id=fonctions-implicites zh="隐函数定理" en="Implicit function theorem" fr="Théorème des fonctions implicites" ru="Теорема о неявной функции" lvl=1
设 $U \subset \R^n \times \R^p$ 开，$g : U \to \R^p$ 是 $\Cc^k$ 的，$(a, b) \in U$，$g(a, b) = 0$，且对 $y$ 的偏微分 $\partial_yg(a, b) \in \Lin(\R^p)$ 可逆（即 $p \times p$ 矩阵 $\big(\frac{\partial g_i}{\partial y_j}(a, b)\big)$ 可逆）。则存在 $a$ 的开邻域 $V$、$b$ 的开邻域 $W$ 和 $\Cc^k$ 映射 $\varphi : V \to W$，使
$$\big((x, y) \in V \times W \text{ 且 } g(x, y) = 0\big) \iff y = \varphi(x).$$
并且 $\dd\varphi(x) = -\partial_yg(x, \varphi(x))^{-1}\circ\partial_xg(x, \varphi(x))$。
:::

::: proof
令 $F(x, y) = (x, g(x, y))$，$F : U \to \R^n \times \R^p$。其 Jacobi 矩阵是分块下三角的：
$$J_F = \begin{pmatrix}I_n & 0\\ \partial_xg & \partial_yg\end{pmatrix},$$
在 $(a, b)$ 处可逆。由局部逆定理，$F$ 是从 $(a, b)$ 的某个邻域 $\Omega$ 到 $(a, 0)$ 的某个邻域 $\Omega'$ 的 $\Cc^k$ 微分同胚。逆映射形如 $F^{-1}(x, z) = (x, \psi(x, z))$，因为 $F$ 保持第一个分量。

缩小邻域：取 $V \times W \subset \Omega$ 的乘积形式，再缩小 $V$ 使 $V \times \{0\} \subset \Omega'$ 且 $\psi(x, 0) \in W$（$\psi$ 连续）。令 $\varphi(x) = \psi(x, 0)$。对 $(x, y) \in V \times W$：$g(x, y) = 0 \iff F(x, y) = (x, 0) \iff y = \psi(x, 0) = \varphi(x)$。

导数公式：对 $g(x, \varphi(x)) = 0$ 用链式法则，$\partial_xg + \partial_yg\circ\dd\varphi = 0$。
:::

::: ex zh="圆与 Descartes 叶形线" lvl=1
1. $g(x, y) = x^2 + y^2 - 1$。$\partial_yg = 2y$。在 $y_0 \ne 0$ 的点附近，$y = \pm\sqrt{1 - x^2}$；在 $(\pm1, 0)$ 处 $\partial_yg = 0$，不能解出 $y$（但可以解出 $x$）。
2. $g(x, y) = x^3 + y^3 - 3xy$。$\nabla g = (3x^2 - 3y, 3y^2 - 3x)$ 在曲线上只在原点为零。所以曲线在原点之外都是光滑的。原点是二重点：曲线在那里自交。
:::

::: method zh="求隐函数的导数"
不需要显式解出 $\varphi$。对恒等式 $g(x, \varphi(x)) = 0$ 求导，解出 $\varphi'$；再求导得 $\varphi''$。例：$x^2 + y^2 = 1$ 在 $y > 0$ 处，$2x + 2yy' = 0$，$y' = -\frac xy$；再求导，$1 + y'^2 + yy'' = 0$，$y'' = -\frac{1}{y^3}$。
:::

## ℝⁿ 的子流形

::: def id=def-sous-variete zh="子流形" en="Submanifold of $\mathbb{R}^n$" fr="Sous-variété de $\mathbb{R}^n$" ru="Подмногообразие $\mathbb{R}^n$"
$M \subset \R^n$ 是 $d$ 维 $\Cc^k$ **子流形**，如果对每个 $a \in M$，存在 $a$ 的开邻域 $U$ 和 $\Cc^k$ 映射 $g : U \to \R^{n-d}$，使 $M \cap U = g^{-1}(0)$，并且 $\dd g(a)$ 是满射（**淹没**，submersion）。
:::

::: thm id=sous-variete-equiv zh="子流形的等价定义" en="Equivalent definitions of a submanifold" fr="Caractérisations des sous-variétés" ru="Эквивалентные определения подмногообразия" lvl=2
以下条件等价（局部地，在 $a \in M$ 附近）：

1. （**方程**）$M$ 是某个淹没的零点集；
2. （**图像**）适当重排坐标后，$M$ 是某个 $\Cc^k$ 映射 $\varphi : \R^d \supset V \to \R^{n-d}$ 的图像；
3. （**参数化**）$M$ 是某个 $\Cc^k$ 映射 $\gamma : \R^d \supset \Omega \to \R^n$ 的像，$\gamma$ 是单射、$\dd\gamma$ 处处单射（**浸入**），且 $\gamma$ 是到其像的同胚；
4. （**平直化**）存在局部微分同胚 $\Phi$，使 $\Phi(M \cap U) = (\R^d \times \{0\}) \cap \Phi(U)$。
:::

::: sketch
$1 \Rightarrow 2$：$\dd g(a)$ 满射，存在 $n - d$ 个坐标，使 $g$ 关于它们的偏微分可逆，用隐函数定理。$2 \Rightarrow 3$：取 $\gamma(x) = (x, \varphi(x))$。$2 \Rightarrow 4$：取 $\Phi(x, y) = (x, y - \varphi(x))$。$4 \Rightarrow 1$：取 $g$ 为 $\Phi$ 的后 $n - d$ 个分量。$3 \Rightarrow 2$：$\dd\gamma(u_0)$ 单射，存在 $d$ 个坐标使 $\pi\circ\gamma$（投影到这些坐标）的微分可逆，用局部逆定理把 $\gamma$ 重新参数化为图像形式；这一步需要用到「$\gamma$ 是到像的同胚」以排除 8 字形之类的自交。
:::

::: def id=def-tangent zh="切空间" en="Tangent space" fr="Espace tangent" ru="Касательное пространство"
$v \in \R^n$ 是 $M$ 在 $a$ 处的**切向量**，如果存在 $\Cc^1$ 曲线 $c : ]-\eps, \eps[ \to M$，$c(0) = a$，$c'(0) = v$。切向量的集合 $T_aM$ 称为**切空间**。
:::

::: prop id=tangent-ker zh="切空间的计算" lvl=1
若在 $a$ 附近 $M = g^{-1}(0)$，$\dd g(a)$ 满射，则 $T_aM = \Ker\dd g(a)$，这是 $d$ 维向量子空间。若 $M = \gamma(\Omega)$ 是参数化，则 $T_aM = \Ima\dd\gamma(u_0)$（$\gamma(u_0) = a$）。
:::

::: proof
$\subset$：若 $c$ 是 $M$ 上的曲线，$g(c(t)) = 0$，求导得 $\dd g(a)(c'(0)) = 0$。$\supset$：用图像形式 $M = \{(x, \varphi(x))\}$（{@sous-variete-equiv}），曲线 $c(t) = (x_0 + tu, \varphi(x_0 + tu))$ 的速度 $(u, \dd\varphi(x_0)u)$ 取遍 $d$ 维空间 $\Ima(\Id, \dd\varphi(x_0))$。所以 $T_aM$ 包含一个 $d$ 维空间，它被包含在 $d$ 维空间 $\Ker\dd g(a)$ 中，两者相等。
:::

::: ex zh="球面与正交群" lvl=2
1. 球面 $S^{n-1} = g^{-1}(0)$，$g(x) = \norm x^2 - 1$，$\dd g(x)h = 2\ps{x, h}$ 在 $S^{n-1}$ 上满射。$T_xS^{n-1} = x^\perp$。
2. 正交群 $O(n) = g^{-1}(0)$，$g(M) = M^TM - I$，取值于对称矩阵空间 $\mathcal{S}_n$（维数 $\frac{n(n+1)}{2}$）。$\dd g(M)H = M^TH + H^TM$，对 $M \in O(n)$ 满射（对 $S \in \mathcal{S}_n$，取 $H = \frac12MS$）。所以 $O(n)$ 是 $\frac{n(n-1)}{2}$ 维子流形，$T_IO(n)$ 是反对称矩阵空间。这是 Lie 群理论的起点。
:::

## 条件极值：Lagrange 乘子法

::: thm id=lagrange zh="Lagrange 乘子定理" en="Lagrange multiplier theorem" fr="Théorème des extrema liés" ru="Метод множителей Лагранжа" lvl=1
设 $f, g_1, \dots, g_p : U \to \R$ 是 $\Cc^1$ 的，$M = \{x \in U : g_1(x) = \dots = g_p(x) = 0\}$。设 $a \in M$，$\dd g_1(a), \dots, \dd g_p(a)$ 线性无关。若 $f|_M$ 在 $a$ 处取局部极值，则存在实数 $\lambda_1, \dots, \lambda_p$（**Lagrange 乘子**），使
$$\nabla f(a) = \sum_{i=1}^p\lambda_i\nabla g_i(a).$$
:::

::: proof
记 $g = (g_1, \dots, g_p) : U \to \R^p$，$\dd g(a)$ 满射，所以 $M$ 在 $a$ 附近是 $n - p$ 维子流形。对 $v \in T_aM$，取 $M$ 上的曲线 $c$，$c(0) = a$，$c'(0) = v$。$t \mapsto f(c(t))$ 在 $t = 0$ 处取局部极值，所以 $\dd f(a)(v) = 0$。因此
$$\Ker\dd f(a) \supset T_aM = \Ker\dd g(a) = \bigcap_{i=1}^p\Ker\dd g_i(a)$$
（{@tangent-ker}）。由线性代数（对偶），若一个线性形式在若干个线性形式的公共核上为零，则它是这些线性形式的线性组合：$\dd f(a) = \sum\lambda_i\dd g_i(a)$。
:::

::: rem zh="几何解释"
$p = 1$、$n = 2$ 时：在约束曲线 $g = 0$ 上移动，$f$ 的极值点出现在 $f$ 的等高线与约束曲线**相切**的地方，即 $\nabla f$ 与 $\nabla g$ 平行。条件 $\nabla g(a) \ne 0$ 保证约束曲线在 $a$ 处光滑。
:::

::: method zh="Lagrange 乘子法的使用"
1. 验证约束是正则的（各 $\nabla g_i$ 线性无关）。
2. 解方程组 $\nabla f = \sum\lambda_i\nabla g_i$，$g_i = 0$（$n + p$ 个未知数，$n + p$ 个方程）。
3. 定理只给出必要条件。若 $M$ 是紧集，最值存在，在候选点中比较函数值即可。
:::

::: ex id=ex-agm-lagrange zh="用 Lagrange 乘子证明 AM-GM 不等式" lvl=1
在 $M = \{x \in \R_+^{*n} : x_1 + \dots + x_n = n\}$ 上最大化 $f(x) = x_1x_2\cdots x_n$。$f$ 在紧集 $\overline M$ 上连续，在边界（某个 $x_i = 0$）上为 $0$，所以最大值在 $M$ 内部取到。条件 $\nabla f = \lambda\nabla g$ 给出 $\frac{f(x)}{x_i} = \lambda$ 对一切 $i$ 成立，所以 $x_1 = \dots = x_n = 1$，最大值为 $1$。由齐次性，对一切正数 $x_i$，$\sqrt[n]{x_1\cdots x_n} \le \frac{x_1 + \dots + x_n}{n}$。
:::

::: ex id=ex-spectral-lagrange zh="谱定理" lvl=1
设 $S$ 是 $n \times n$ 实对称矩阵。在单位球面上最大化 $f(x) = x^TSx$。球面紧，最大值在某点 $a$ 取到；$\nabla f(a) = 2Sa$，$\nabla g(a) = 2a$。由 Lagrange 定理，$Sa = \lambda a$：$a$ 是 $S$ 的特征向量，$\lambda = f(a)$ 是最大特征值。对 $a^\perp$（$S$ 的不变子空间）归纳，得到实对称矩阵可以正交对角化。这是谱定理的一个分析证明。
:::

::: thm id=kkt zh="Karush–Kuhn–Tucker 条件" en="Karush–Kuhn–Tucker conditions" fr="Conditions de Karush–Kuhn–Tucker" ru="Условия Каруша–Куна–Таккера" lvl=3 ref="Boyd–Vandenberghe, *Convex Optimization*，§5.5"
对不等式约束 $h_j(x) \le 0$：在适当的正则性条件（约束规范）下，若 $a$ 是局部极小点，则存在 $\mu_j \ge 0$，使 $\nabla f(a) + \sum\mu_j\nabla h_j(a) = 0$，且 $\mu_jh_j(a) = 0$（**互补松弛**）。这是线性规划、凸优化与机器学习（支持向量机）的理论基础。
:::

## 拓展

::: thm id=morse zh="Morse 引理" en="Morse lemma" fr="Lemme de Morse" ru="Лемма Морса" lvl=3 ref="Milnor, *Morse Theory*，引理 2.2"
若 $a$ 是 $\Cc^\infty$ 函数 $f$ 的非退化临界点（$H_f(a)$ 可逆），则存在 $a$ 附近的局部坐标 $y$，使 $f = f(a) - y_1^2 - \dots - y_k^2 + y_{k+1}^2 + \dots + y_n^2$。$k$ 称为临界点的**指标**。因此非退化临界点的局部行为完全由 Hessian 矩阵的符号差决定，{@cs-extremum} 是这个定理的一部分。
:::

::: thm id=sard zh="Sard 定理" en="Sard's theorem" fr="Théorème de Sard" ru="Теорема Сарда" lvl=3 ref="Milnor, *Topology from the Differentiable Viewpoint*，§2–3"
若 $f : \R^n \to \R^p$ 是 $\Cc^\infty$ 的，则 $f$ 的临界值（$\dd f$ 不满射的点的像）构成 Lebesgue 零测集。推论：对「几乎所有」$c$，水平集 $f^{-1}(c)$ 是子流形（或空集）。
:::
