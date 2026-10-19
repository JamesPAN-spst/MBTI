本章的核心是 **Cauchy–Lipschitz 定理**（俄、英文献称 Picard–Lindelöf 定理）：在适当的正则性条件下，初值问题有唯一解。线性方程的情形在法国 MP 大纲中是必修主干；非线性情形在 L2 给出陈述与证明思路，详细理论属于 L3 的常微分方程课程。全章 $I$ 是区间，$\K = \R$ 或 $\C$，$\M_n(\K)$ 上取一个次乘范数（例如算子范数 {@norme-subordonnee}）。

## 线性方程组的 Cauchy–Lipschitz 定理

::: def id=def-edl zh="线性微分方程组" en="Linear differential system" fr="Système différentiel linéaire" ru="Линейная система дифференциальных уравнений"
设 $A : I \to \M_n(\K)$ 与 $B : I \to \K^n$ 连续。方程
$$X'(t) = A(t)X(t) + B(t) \tag{E}$$
的**解**是 $I$ 上可导的函数 $X : I \to \K^n$，满足 (E)。$B = 0$ 时称为**齐次方程** (H)。**初值问题**（problème de Cauchy）是指再加上条件 $X(t_0) = X_0$。
:::

::: thm id=cauchy-lipschitz-lineaire zh="线性 Cauchy–Lipschitz 定理" en="Existence and uniqueness for linear systems" fr="Théorème de Cauchy–Lipschitz linéaire" ru="Теорема существования и единственности для линейных систем" lvl=1
对任意 $t_0 \in I$、$X_0 \in \K^n$，初值问题 $X' = A(t)X + B(t)$，$X(t_0) = X_0$ 在**整个** $I$ 上有唯一解。
:::

::: proof
$X$ 是初值问题的解，当且仅当 $X$ 连续且满足积分方程
$$X(t) = X_0 + \int_{t_0}^t\big(A(s)X(s) + B(s)\big)\,\dd s. \tag{$\ast$}$$

**在闭区间 $J = [a, b] \subset I$（$t_0 \in J$）上的存在性。** 记 $K = \sup_J\norm{A}$。定义 Picard 迭代：$X_0(t) \equiv X_0$，
$$X_{k+1}(t) = X_0 + \int_{t_0}^t\big(A(s)X_k(s) + B(s)\big)\,\dd s.$$
记 $M = \sup_J\norm{X_1 - X_0}$。归纳可证
$$\norm{X_{k+1}(t) - X_k(t)} \le M\frac{K^k\abs{t - t_0}^k}{k!}\qquad(t \in J).$$
实际上，$X_{k+1}(t) - X_k(t) = \int_{t_0}^t A(s)\big(X_k(s) - X_{k-1}(s)\big)\,\dd s$，把归纳假设代入积分即得。于是 $\sum(X_{k+1} - X_k)$ 在 $J$ 上正规收敛（被 $M\sum\frac{(K(b-a))^k}{k!}$ 控制），$X_k$ 一致收敛到连续函数 $X$。在 $(\ast)$ 中取极限（{@integration-unif}），$X$ 满足 $(\ast)$。

**唯一性。** 若 $X, Y$ 是两个解，$\delta = X - Y$ 满足 $\delta(t) = \int_{t_0}^t A(s)\delta(s)\,\dd s$。记 $m = \sup_J\norm\delta$，同样的归纳给出 $\norm{\delta(t)} \le m\frac{K^k\abs{t-t_0}^k}{k!}$ 对一切 $k$ 成立，令 $k \to \infty$ 得 $\delta = 0$。

**整个 $I$ 上。** $I$ 是一列递增闭区间 $J_m$ 的并。在每个 $J_m$ 上有唯一解，由唯一性，它们在交集上一致，拼接起来就是 $I$ 上的解。
:::

::: cor id=structure-solutions zh="解空间的结构" en="Structure of the solution set" fr="Structure de l'ensemble des solutions" ru="Структура множества решений" lvl=1
1. 齐次方程 (H) 的解集 $\mathcal{S}_H$ 是 $\K$-向量空间，对任意 $t_0 \in I$，映射 $X \mapsto X(t_0)$ 是从 $\mathcal{S}_H$ 到 $\K^n$ 的同构。特别地 $\dim\mathcal{S}_H = n$。
2. (E) 的解集是仿射空间 $X_p + \mathcal{S}_H$，其中 $X_p$ 是任一特解。
:::

::: proof
线性显然。由 {@cauchy-lipschitz-lineaire}，$X \mapsto X(t_0)$ 是双射：满射是存在性，单射是唯一性。
:::

::: cor lvl=1
若齐次方程的一个解在某一点 $t_0$ 处为零，则它恒为零。$n$ 个解 $X_1, \dots, X_n$ 构成 $\mathcal{S}_H$ 的基，当且仅当 $(X_1(t_0), \dots, X_n(t_0))$ 是 $\K^n$ 的基（对某个、等价地对每个 $t_0$）。
:::

::: proof
由 {@structure-solutions} 中的同构。
:::

## 常系数方程与矩阵指数

::: def id=def-exp-matrice zh="矩阵指数" en="Matrix exponential" fr="Exponentielle de matrice" ru="Матричная экспонента"
对 $M \in \M_n(\K)$，定义
$$\exp(M) = \e^M = \sum_{k \ge 0}\frac{M^k}{k!}.$$
由次乘性 $\norm{M^k} \le \norm{M}^k$，级数绝对收敛，而 $\M_n(\K)$ 是有限维空间，从而完备（{@dimfinie-complet}），由 {@serie-abs-banach}，级数收敛。
:::

::: prop id=exp-matrice-proprietes lvl=1
1. 若 $MN = NM$，则 $\e^{M + N} = \e^M\e^N$。特别地 $\e^M$ 可逆，$(\e^M)^{-1} = \e^{-M}$。
2. $P\,\e^M P^{-1} = \e^{PMP^{-1}}$；若 $M = \operatorname{diag}(\lambda_i)$，则 $\e^M = \operatorname{diag}(\e^{\lambda_i})$。
3. $t \mapsto \e^{tM}$ 是 $\Cc^1$ 的，$\frac{\dd}{\dd t}\e^{tM} = M\e^{tM} = \e^{tM}M$。
4. $\det\e^M = \e^{\tr M}$。
:::

::: proof
1. 与 {@exp-morphisme} 相同：$M, N$ 交换时二项式公式成立，再用 Cauchy 乘积（在 Banach 代数中证明完全相同）。
2. $(PMP^{-1})^k = PM^kP^{-1}$，矩阵乘法连续，可以与级数求和交换。
3. 这是系数在 $\M_n(\K)$ 中的幂级数 $\sum\frac{t^k}{k!}M^k$，收敛半径为 $\infty$，逐项求导（{@derivation-se} 的证明对 Banach 空间值的幂级数同样适用）。
4. 在 $\C$ 上三角化 $M = PTP^{-1}$，$\e^T$ 是上三角矩阵，对角元为 $\e^{t_{ii}}$，用 2。
:::

::: cex lvl=1
不交换时第 1 条不成立。$M = \begin{pmatrix}0 & 1\\ 0 & 0\end{pmatrix}$，$N = \begin{pmatrix}0 & 0\\ 1 & 0\end{pmatrix}$：$\e^M\e^N = \begin{pmatrix}2 & 1\\ 1 & 1\end{pmatrix}$，而 $M + N$ 的平方是单位矩阵，$\e^{M+N} = \begin{pmatrix}\ch 1 & \sh 1\\ \sh 1 & \ch 1\end{pmatrix}$。
:::

::: thm id=solution-coef-constants zh="常系数方程的解与 Duhamel 公式" en="Solution of constant-coefficient systems (Duhamel's formula)" fr="Solutions d'un système à coefficients constants (formule de Duhamel)" ru="Решение системы с постоянными коэффициентами (формула Дюамеля)" lvl=1
设 $A \in \M_n(\K)$ 是常数矩阵，$B$ 连续。初值问题 $X' = AX + B(t)$，$X(t_0) = X_0$ 的唯一解为
$$X(t) = \e^{(t - t_0)A}X_0 + \int_{t_0}^t\e^{(t - s)A}B(s)\,\dd s.$$
:::

::: proof
令 $Y(t) = \e^{-tA}X(t)$。由 {@exp-matrice-proprietes}，$Y'(t) = \e^{-tA}\big(X'(t) - AX(t)\big) = \e^{-tA}B(t)$。积分并乘以 $\e^{tA}$ 即得。反之，直接求导可以验证这个公式给出解。
:::

::: method zh="如何计算 $\e^{tA}$"
1. $A$ 可对角化：$A = PDP^{-1}$，$\e^{tA} = P\e^{tD}P^{-1}$。
2. 一般情形：Dunford 分解（Jordan–Chevalley 分解）$A = D + N$，$D$ 可对角化，$N$ 幂零，$DN = ND$。于是 $\e^{tA} = \e^{tD}\sum_{k < n}\frac{t^kN^k}{k!}$（有限和）。
3. 利用零化多项式：若 $P(A) = 0$，则 $\e^{tA}$ 是 $I, A, \dots, A^{d-1}$ 的线性组合。

例：$A = \begin{pmatrix}0 & -1\\ 1 & 0\end{pmatrix}$（$A^2 = -I$）。分开偶次项和奇次项，$\e^{tA} = \cos t\,I + \sin t\,A$，即平面旋转。
:::

::: thm id=stabilite zh="线性稳定性" en="Linear stability" fr="Stabilité des systèmes linéaires" ru="Устойчивость линейных систем" lvl=2
若 $A$ 的所有特征值的实部都 $< 0$，则 $X' = AX$ 的所有解当 $t \to +\infty$ 时以指数速度趋于 $0$：存在 $C, c > 0$，使 $\norm{\e^{tA}} \le C\e^{-ct}$（$t \ge 0$）。
:::

::: sketch
在 Dunford 分解下，$\e^{tA}$ 的元素是形如 $t^k\e^{\lambda t}$ 的函数的线性组合，其中 $\lambda$ 是特征值，$k < n$。取 $c$ 小于所有 $-\operatorname{Re}\lambda$。
:::

## 标量线性方程

::: def zh="$n$ 阶线性方程与 Wronski 行列式" en="Scalar linear equations, Wronskian" fr="Équations scalaires d'ordre $n$, wronskien" ru="Линейные уравнения $n$-го порядка, определитель Вронского"
$n$ 阶方程 $y^{(n)} + a_{n-1}(t)y^{(n-1)} + \dots + a_0(t)y = b(t)$ 通过 $X = (y, y', \dots, y^{(n-1)})^T$ 化为一阶方程组（伴随矩阵）。因此 {@cauchy-lipschitz-lineaire} 适用：给定 $y(t_0), \dots, y^{(n-1)}(t_0)$，解存在且唯一。对二阶齐次方程 $y'' + a(t)y' + b(t)y = 0$ 的两个解 $y_1, y_2$，**Wronski 行列式**为
$$W(t) = \begin{vmatrix}y_1 & y_2\\ y_1' & y_2'\end{vmatrix} = y_1y_2' - y_1'y_2.$$
:::

::: thm id=liouville-formule zh="Liouville 公式" en="Abel–Liouville identity" fr="Formule de Liouville" ru="Формула Лиувилля–Остроградского" lvl=1
对方程组 $X' = A(t)X$，若 $\Phi(t)$ 是由 $n$ 个解作为列构成的矩阵，则 $W(t) = \det\Phi(t)$ 满足 $W' = \tr(A)\,W$，即
$$W(t) = W(t_0)\exp\Big(\int_{t_0}^t\tr A(s)\,\dd s\Big).$$
对二阶方程 $y'' + a(t)y' + b(t)y = 0$：$W' = -a(t)W$。因此 $W$ 要么恒为零，要么处处不为零。
:::

::: proof
二阶情形直接计算：$W' = y_1y_2'' - y_1''y_2 = y_1(-ay_2' - by_2) - (-ay_1' - by_1)y_2 = -aW$。

一般情形：行列式关于列是多重线性的，所以 $W'$ 是把第 $j$ 列换成其导数 $A\Phi_j$ 所得的 $n$ 个行列式之和。对固定的 $t$，映射 $(v_1, \dots, v_n) \mapsto \sum_j\det(v_1, \dots, Av_j, \dots, v_n)$ 是交错多重线性形式，所以等于 $c\det(v_1, \dots, v_n)$；在标准基上计算得 $c = \sum_j a_{jj} = \tr A$。
:::

::: thm id=variation-constantes zh="常数变易法" en="Variation of parameters" fr="Méthode de variation des constantes" ru="Метод вариации постоянных" lvl=1
设 $y_1, y_2$ 是 $y'' + a(t)y' + b(t)y = 0$ 的基本解组。则 $y = \lambda_1 y_1 + \lambda_2 y_2$ 是 $y'' + ay' + by = c(t)$ 的解，只要 $\lambda_1, \lambda_2$ 满足
$$\begin{cases}\lambda_1'y_1 + \lambda_2'y_2 = 0\\ \lambda_1'y_1' + \lambda_2'y_2' = c\end{cases}\qquad\text{即}\quad \lambda_1' = -\frac{c\,y_2}{W},\ \lambda_2' = \frac{c\,y_1}{W}.$$
:::

::: proof
第一个条件给出 $y' = \lambda_1y_1' + \lambda_2y_2'$；再求导，$y'' = \lambda_1y_1'' + \lambda_2y_2'' + \lambda_1'y_1' + \lambda_2'y_2'$。代入方程，$y_1, y_2$ 的齐次部分消去，剩下 $\lambda_1'y_1' + \lambda_2'y_2' = c$。由 Liouville 公式 $W \ne 0$，方程组有唯一解（Cramer 法则）。这本质上是 {@solution-coef-constants} 在伴随方程组上的应用。
:::

::: ex zh="共振" lvl=1
$y'' + \omega^2y = \cos(\Omega t)$。$\Omega \ne \omega$ 时有特解 $\frac{\cos\Omega t}{\omega^2 - \Omega^2}$，解有界。$\Omega = \omega$ 时用常数变易法得到特解 $\frac{t\sin\omega t}{2\omega}$，振幅线性增长：这就是**共振**。
:::

::: rem zh="幂级数解"
系数为多项式（或解析函数）时，可以寻找幂级数形式的解，见第 4 章的 Airy 方程 {@airy}。正则奇点的情形（例如 Bessel 方程 $t^2y'' + ty' + (t^2 - \nu^2)y = 0$）需要 Frobenius 方法，寻找 $t^r\sum a_kt^k$ 形式的解。
:::

## 非线性方程

::: def id=def-lipschitz-local zh="局部 Lipschitz 条件" en="Locally Lipschitz in the state variable" fr="Fonction localement lipschitzienne par rapport à la seconde variable" ru="Локальное условие Липшица по второй переменной"
设 $U \subset \R \times \R^n$ 是开集，$f : U \to \R^n$ 连续。若每一点都有一个邻域 $V$ 和常数 $k$，使 $\norm{f(t, x) - f(t, y)} \le k\norm{x - y}$ 对 $(t,x), (t,y) \in V$ 成立，称 $f$ 关于第二个变量**局部 Lipschitz**。若 $f$ 是 $\Cc^1$ 的，由中值不等式（第 9 章），这个条件成立。
:::

::: thm id=cauchy-lipschitz zh="Cauchy–Lipschitz 定理（局部版本）" en="Picard–Lindelöf theorem" fr="Théorème de Cauchy–Lipschitz" ru="Теорема Пикара–Линделёфа" lvl=2
设 $f$ 在开集 $U$ 上连续，且关于 $x$ 局部 Lipschitz。则对每个 $(t_0, x_0) \in U$，初值问题 $x' = f(t, x)$，$x(t_0) = x_0$ 有唯一的**最大解**，其定义区间是开区间；任何其他解都是它的限制。
:::

::: sketch
在 $(t_0, x_0)$ 附近取紧邻域 $[t_0 - a, t_0 + a] \times \overline{B}(x_0, r) \subset U$，其上 $\norm{f} \le M$，Lipschitz 常数为 $k$。取 $\tau = \min(a, \frac rM)$，在 $\Cc([t_0 - \tau, t_0 + \tau], \overline{B}(x_0, r))$ 上考虑映射
$$\Phi(x)(t) = x_0 + \int_{t_0}^t f(s, x(s))\,\dd s.$$
$\tau \le \frac rM$ 保证 $\Phi$ 把这个闭集映到自身。用加权范数 $\norm{x}_k = \sup\e^{-2k\abs{t - t_0}}\norm{x(t)}$，$\Phi$ 是 $\frac12$-压缩的（或者缩小 $\tau$ 使 $k\tau < 1$），由 Banach 不动点定理 {@point-fixe} 得到局部解的存在唯一性。最大解：考虑所有解的定义区间的并，由局部唯一性，各解在公共区间上一致（这一步用连通性论证）。
:::

::: lem id=gronwall zh="Grönwall 引理" en="Grönwall's inequality" fr="Lemme de Grönwall" ru="Лемма Гронуолла" lvl=1
设 $\varphi, \psi$ 在 $[t_0, T]$ 上连续非负，$c \ge 0$，且
$$\varphi(t) \le c + \int_{t_0}^t\psi(s)\varphi(s)\,\dd s.$$
则 $\varphi(t) \le c\exp\Big(\int_{t_0}^t\psi\Big)$。
:::

::: proof
令 $R(t) = c + \int_{t_0}^t\psi\varphi$，则 $R' = \psi\varphi \le \psi R$。所以 $\Big(R(t)\e^{-\int_{t_0}^t\psi}\Big)' = (R' - \psi R)\e^{-\int\psi} \le 0$，从而 $R(t)\e^{-\int_{t_0}^t\psi} \le R(t_0) = c$。最后 $\varphi \le R$。
:::

::: cor id=dependance-continue zh="解对初值的连续依赖" lvl=1
在 {@cauchy-lipschitz} 的条件下，若 $f$ 关于 $x$ 是全局 $k$-Lipschitz 的，则两个解满足
$\norm{x(t) - y(t)} \le \norm{x(t_0) - y(t_0)}\,\e^{k\abs{t - t_0}}$。
:::

::: proof
$\norm{x(t) - y(t)} \le \norm{x(t_0) - y(t_0)} + \int_{t_0}^t k\norm{x(s) - y(s)}\,\dd s$（$t \ge t_0$），用 Grönwall 引理。
:::

::: cex id=cex-unicite lvl=1
Lipschitz 条件不能省略。$y' = 3y^{2/3}$，$y(0) = 0$ 有无穷多个解：$y \equiv 0$，以及对任意 $c \ge 0$，
$$y_c(t) = \begin{cases}0 & t \le c\\ (t - c)^3 & t > c.\end{cases}$$
$f(y) = 3y^{2/3}$ 在 $y = 0$ 处连续但不 Lipschitz（导数在 $0$ 处趋于无穷）。
:::

::: ex id=ex-explosion lvl=1
最大解的区间可以是有界的。$y' = y^2$，$y(0) = 1$ 的解 $y = \frac{1}{1 - t}$ 在 $t \to 1^-$ 时爆破。$f(y) = y^2$ 是 $\Cc^1$ 的，但不是全局 Lipschitz 的。
:::

::: thm id=sortie-compact zh="爆破判据（逃离紧集定理）" en="Blow-up alternative" fr="Théorème de sortie de tout compact" ru="Теорема о продолжении решения" lvl=3 ref="Demailly, *Analyse numérique et équations différentielles*，第 V 章"
设 $x$ 是最大解，定义在 $]\alpha, \beta[$ 上，$\beta < +\infty$。则当 $t \to \beta^-$ 时，$(t, x(t))$ 最终离开 $U$ 的任何紧子集。特别地，若 $U = \R \times \R^n$，则 $\norm{x(t)} \to +\infty$。推论：若 $f$ 有界，或 $\norm{f(t, x)} \le a(t) + b(t)\norm x$，则最大解定义在整个 $\R$ 上。
:::

::: thm id=cauchy-peano zh="Cauchy–Peano 定理" en="Peano existence theorem" fr="Théorème de Cauchy–Peano–Arzelà" ru="Теорема Пеано" lvl=3 ref="Hartman, *Ordinary Differential Equations*，第 II 章"
若 $f$ 只是连续的，初值问题仍有（局部）解，但可能不唯一（{@cex-unicite}）。证明：构造 Euler 折线近似解，它们一致有界且等度连续，由 Arzelà–Ascoli 定理 {@arzela-ascoli} 抽取一致收敛子列，极限就是解。
:::

::: demo id=slopefield
方向场与解曲线。点击画布添加初值条件，曲线用四阶 Runge–Kutta 方法向两个方向积分。可以试试 $y' = y^2$（有限时间爆破）和 $y' = 3y^{2/3}$（从 $y(0) = 0$ 出发，数值方法只给出零解，而理论上有无穷多个解）。
:::

::: open zh="Hilbert 第 16 问题（第二部分）"
平面多项式向量场 $x' = P(x, y)$，$y' = Q(x, y)$（$\deg P, \deg Q \le d$）的**极限环**（孤立的周期轨道）个数是否有一个只依赖于 $d$ 的上界 $H(d)$？即使 $d = 2$，这个问题也未解决。已知每个具体的向量场只有有限个极限环（Ilyashenko 1991，Écalle 1992）。
:::
