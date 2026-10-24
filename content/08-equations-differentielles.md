本章的核心是 **Cauchy–Lipschitz 定理**（英文文献称 Picard–Lindelöf 定理，俄文文献常称 Пикар 定理或存在唯一性定理）：在适当的正则性条件下，初值问题有唯一解。线性方程的情形在法国 MP 大纲中是必修主干；非线性情形在 L2 给出陈述与证明思路，详细理论属于 L3 的常微分方程课程。全章 $I$ 是区间，$\K = \R$ 或 $\C$，$\M_n(\K)$ 上取一个次乘范数（例如算子范数 {@norme-subordonnee}）。

**约定。** $I$ 不退化为一点。$\K^n$ 上取一个范数 $\norm{\cdot}$，$\M_n(\K)$ 上取与之相伴的算子范数，于是 $\norm{AX} \le \norm{A}\,\norm{X}$，$\norm{AB} \le \norm{A}\,\norm{B}$。向量值、矩阵值函数的连续、导数与积分都按分量定义；对连续的 $F : [a, b] \to \K^n$，$\norm{\int_a^b F} \le \int_a^b \norm{F}$（对 Riemann 和用三角不等式再取极限）。有限维空间中所有范数等价（{@equiv-dimfinie}），所以收敛与连续都不依赖于范数的选取。

本章的证明反复使用三个工具：**把微分方程改写成积分方程**；**逐次逼近**（Picard 迭代、Banach 不动点定理 {@point-fixe}）；**Grönwall 不等式**（把「导数被自身控制」变成指数上界）。

## 线性方程组的 Cauchy–Lipschitz 定理

线性方程是唯一一类对**任意**连续系数都有完整理论的方程：解总存在，定义在整个 $I$ 上，解集是有限维的仿射空间。本节证明这三件事。方法是 Picard 迭代：把初值问题写成积分方程 $X = \Phi(X)$，从常函数出发反复作用 $\Phi$，证明迭代一致收敛。

::: def id=def-edl zh="线性微分方程组" en="Linear differential system" fr="Système différentiel linéaire" ru="Линейная система дифференциальных уравнений"
设 $A : I \to \M_n(\K)$ 与 $B : I \to \K^n$ 连续。方程
$$X'(t) = A(t)X(t) + B(t) \tag{E}$$
的**解**是 $I$ 上可导的函数 $X : I \to \K^n$，满足：对一切 $t \in I$，$X'(t) = A(t)X(t) + B(t)$。（在子区间 $J \subset I$ 上的解同样定义。）$B = 0$ 时称为**齐次方程** (H)。**初值问题**（problème de Cauchy）是指再加上条件 $X(t_0) = X_0$，其中 $t_0 \in I$，$X_0 \in \K^n$。
:::

::: fr
Soient $A : I \to \M_n(\K)$ et $B : I \to \K^n$ continues. Une **solution** de l'équation
$$X'(t) = A(t)X(t) + B(t) \tag{E}$$
est une fonction $X : I \to \K^n$ dérivable sur $I$ telle que, pour tout $t \in I$, $X'(t) = A(t)X(t) + B(t)$. (On définit de même une solution sur un sous-intervalle $J \subset I$.) Si $B = 0$, on parle d'**équation homogène** (H). Le **problème de Cauchy** consiste à imposer en plus la condition $X(t_0) = X_0$, où $t_0 \in I$ et $X_0 \in \K^n$.
:::

::: ex id=c8-ex-edl zh="线性方程组：是与不是" lvl=1
1. **是。** $n = 1$：$y' = a(t)y + b(t)$，$A(t) = (a(t))$ 是 $1 \times 1$ 矩阵。
2. **是。** 二阶方程 $y'' + y = 0$：令 $X = (y, y')^T$，则 $X' = (y', y'')^T = (y', -y)^T$，即 $X' = \begin{pmatrix}0 & 1\\ -1 & 0\end{pmatrix}X$。
3. **不是（非线性）。** $y' = y^2$：右边不是 $a(t)y + b(t)$ 的形式。第 4 节会看到它的解可以在有限时间内爆破，这在线性方程中不会发生（{@cauchy-lipschitz-lineaire}）。
4. **不是（未解出导数）。** $t\,y' = 2y$ 在 $I = \R$ 上：在 $t = 0$ 处不能除以 $t$，所以它不是 (E) 的形式。{@c8-cex-singulier} 说明这时定理的结论确实会失效。
:::

::: ex id=c8-ex-ordre1 zh="一阶标量线性方程的解" lvl=1
设 $a, b : I \to \K$ 连续，$t_0 \in I$，令 $\alpha(t) = \int_{t_0}^t a(s)\,\dd s$。则 $y$ 是 $y' = a(t)y + b(t)$ 在 $I$ 上的解，当且仅当存在常数 $C \in \K$，使
$$y(t) = \e^{\alpha(t)}\Big(C + \int_{t_0}^t b(s)\,\e^{-\alpha(s)}\,\dd s\Big)\qquad (t \in I),$$
并且 $C = y(t_0)$。

**推导。** $\alpha' = a$（微积分基本定理）。对 $I$ 上可导的 $y$，
$$\big(y\,\e^{-\alpha}\big)' = (y' - a\,y)\,\e^{-\alpha}.$$
所以 $y$ 是解 $\iff$ $\big(y\,\e^{-\alpha}\big)' = b\,\e^{-\alpha}$ $\iff$ $y(t)\e^{-\alpha(t)} = y(t_0) + \int_{t_0}^t b\,\e^{-\alpha}$（在区间上，导数相同的两个函数相差常数；$\alpha(t_0) = 0$）。这对 $n = 1$ 直接给出了存在唯一性：初值 $y(t_0)$ 决定了 $C$。
:::

$n \ge 2$ 时没有这样的显式公式（矩阵 $A(t)$ 与 $\int A$ 一般不交换）。下面的引理把问题变成积分方程，这是一般情形的出发点。

::: lem id=c8-equation-integrale zh="积分方程形式" en="Integral formulation" fr="Formulation intégrale" ru="Интегральная форма задачи Коши" lvl=1
设 $J \subset I$ 是包含 $t_0$ 的区间，$X : J \to \K^n$。则 $X$ 是 (E) 在 $J$ 上满足 $X(t_0) = X_0$ 的解，当且仅当 $X$ 在 $J$ 上连续，且
$$\forall t \in J,\qquad X(t) = X_0 + \int_{t_0}^t\big(A(s)X(s) + B(s)\big)\,\dd s. \tag{$\ast$}$$
此时 $X$ 是 $\Cc^1$ 的。
:::

::: fr
Soient $J \subset I$ un intervalle contenant $t_0$ et $X : J \to \K^n$. Alors $X$ est une solution de (E) sur $J$ vérifiant $X(t_0) = X_0$ si et seulement si $X$ est continue sur $J$ et
$$\forall t \in J,\qquad X(t) = X_0 + \int_{t_0}^t\big(A(s)X(s) + B(s)\big)\,\dd s. \tag{$\ast$}$$
Dans ce cas, $X$ est de classe $\Cc^1$.
:::

::: proof
▷ 思路：两个方向都是微积分基本定理；关键是被积函数 $s \mapsto A(s)X(s) + B(s)$ 连续。

**(⇒)**　$X$ 可导，从而连续。$X' = AX + B$ 是连续函数的乘积与和，所以连续，$X$ 是 $\Cc^1$ 的。由微积分基本定理，$X(t) - X(t_0) = \int_{t_0}^t X'(s)\,\dd s = \int_{t_0}^t\big(A(s)X(s) + B(s)\big)\,\dd s$，再用 $X(t_0) = X_0$。

**(⇐)**　$X$ 连续，所以 $s \mapsto A(s)X(s) + B(s)$ 在 $J$ 上连续。由微积分基本定理，$(\ast)$ 的右边在 $J$ 上可导，导数为 $A(t)X(t) + B(t)$。所以 $X$ 可导，$X' = AX + B$；在 $(\ast)$ 中取 $t = t_0$ 得 $X(t_0) = X_0$。这就证明了等价性。
:::

::: fr
▷ Méthode : les deux sens découlent du théorème fondamental de l'analyse ; le point clé est que $s \mapsto A(s)X(s) + B(s)$ est continue.

**(⇒)**　$X$ est dérivable, donc continue. La fonction $X' = AX + B$, produit et somme de fonctions continues, est continue ; $X$ est donc $\Cc^1$. Par le théorème fondamental de l'analyse, $X(t) - X(t_0) = \int_{t_0}^t X'(s)\,\dd s = \int_{t_0}^t\big(A(s)X(s) + B(s)\big)\,\dd s$, et $X(t_0) = X_0$.

**(⇐)**　$X$ est continue, donc $s \mapsto A(s)X(s) + B(s)$ est continue sur $J$. Par le théorème fondamental de l'analyse, le membre de droite de $(\ast)$ est dérivable sur $J$, de dérivée $A(t)X(t) + B(t)$. Donc $X$ est dérivable et $X' = AX + B$ ; en faisant $t = t_0$ dans $(\ast)$, on obtient $X(t_0) = X_0$. Ceci prouve l'équivalence.
:::

::: thm id=cauchy-lipschitz-lineaire zh="线性 Cauchy–Lipschitz 定理" en="Existence and uniqueness for linear systems" fr="Théorème de Cauchy–Lipschitz linéaire" ru="Теорема существования и единственности для линейных систем" lvl=1
对任意 $t_0 \in I$、$X_0 \in \K^n$，初值问题 $X' = A(t)X + B(t)$，$X(t_0) = X_0$ 在**整个** $I$ 上有唯一解。
:::

::: fr
Pour tous $t_0 \in I$ et $X_0 \in \K^n$, le problème de Cauchy $X' = A(t)X + B(t)$, $X(t_0) = X_0$ admet une unique solution définie sur **tout** l'intervalle $I$.
:::

::: proof
▷ 思路：由引理 {@c8-equation-integrale}，只需解积分方程 $X = \Phi(X)$，其中
$$\Phi(Y)(t) = X_0 + \int_{t_0}^t\big(A(s)Y(s) + B(s)\big)\,\dd s.$$
先在包含 $t_0$ 的闭区间 $J$ 上做：从常函数 $Y_0 \equiv X_0$ 出发，令 $Y_{k+1} = \Phi(Y_k)$（Picard 迭代）。相邻两项之差被 $\frac{(K\abs{t - t_0})^k}{k!}$ 控制，级数正规收敛，极限就是解；同样的估计给出唯一性。最后把各个闭区间上的解拼成 $I$ 上的解。

**第 1 步（在闭区间上设定）**　设 $J = [a, b] \subset I$ 是包含 $t_0$ 的闭区间，$a < b$。$\norm{A}$ 在紧集 $J$ 上连续，从而有界：令 $K = \sup_J\norm{A}$。令 $Y_0(t) = X_0$（$t \in J$），$Y_{k+1} = \Phi(Y_k)$。由归纳，每个 $Y_k$ 在 $J$ 上连续（若 $Y_k$ 连续，被积函数连续，由微积分基本定理 $Y_{k+1}$ 连续）。令 $M = \sup_J\norm{Y_1 - Y_0} < +\infty$。

**第 2 步（迭代的估计）**　断言：对一切 $k \in \N$ 和 $t \in J$，
$$\norm{Y_{k+1}(t) - Y_k(t)} \le M\,\frac{K^k\abs{t - t_0}^k}{k!}.$$

- **初始化**（$k = 0$）：这是 $M$ 的定义。
- **递推**：设对 $k - 1$ 成立（$k \ge 1$）。由定义，$Y_{k+1}(t) - Y_k(t) = \int_{t_0}^t A(s)\big(Y_k(s) - Y_{k-1}(s)\big)\,\dd s$，所以
  $$\begin{aligned}
  \norm{Y_{k+1}(t) - Y_k(t)} &\le \Big|\int_{t_0}^t\norm{A(s)}\,\norm{Y_k(s) - Y_{k-1}(s)}\,\dd s\Big| && \text{（积分的估计，次乘性）}\\
  &\le \Big|\int_{t_0}^t K\cdot M\frac{K^{k-1}\abs{s - t_0}^{k-1}}{(k-1)!}\,\dd s\Big| && \text{（归纳假设）}\\
  &= M\,\frac{K^k\abs{t - t_0}^k}{k!}.
  \end{aligned}$$

**第 3 步（一致收敛）**　由第 2 步，$\sup_J\norm{Y_{k+1} - Y_k} \le M\frac{(K(b - a))^k}{k!}$，而 $\sum_k M\frac{(K(b-a))^k}{k!} = M\e^{K(b-a)} < +\infty$。所以 $\sum(Y_{k+1} - Y_k)$ 在 $J$ 上正规收敛（对每个分量用 {@normale-unif}），部分和 $Y_k = Y_0 + \sum_{j < k}(Y_{j+1} - Y_j)$ 在 $J$ 上一致收敛到某个函数 $X$。由 {@cont-limite-unif}，$X$ 连续。

**第 4 步（极限是解）**　对 $t \in J$，
$$\norm{\Phi(Y_k)(t) - \Phi(X)(t)} = \Big\|\int_{t_0}^t A(s)\big(Y_k(s) - X(s)\big)\,\dd s\Big\| \le K(b - a)\sup_J\norm{Y_k - X} \xrightarrow[k \to \infty]{} 0.$$
在 $Y_{k+1} = \Phi(Y_k)$ 中令 $k \to \infty$：左边趋于 $X(t)$，右边趋于 $\Phi(X)(t)$，所以 $X = \Phi(X)$。由引理 {@c8-equation-integrale}，$X$ 是 $J$ 上的解。

**第 5 步（在闭区间上唯一）**　设 $X, Y$ 都是 $J$ 上满足初值条件的解，$\delta = X - Y$。由引理 {@c8-equation-integrale}，$\delta(t) = \int_{t_0}^t A(s)\delta(s)\,\dd s$。令 $m = \sup_J\norm{\delta}$。与第 2 步完全相同的归纳（把 $Y_{k+1} - Y_k$ 换成 $\delta$，$M$ 换成 $m$）给出：对一切 $k$，$\norm{\delta(t)} \le m\frac{(K\abs{t - t_0})^k}{k!} \le m\frac{(K(b-a))^k}{k!}$。令 $k \to \infty$，右边趋于 $0$（收敛级数的通项），所以 $\delta = 0$。

记 $X_J$ 为 $J$ 上的唯一解。若 $J, J'$ 是两个包含 $t_0$ 的闭区间，$X_J$ 与 $X_{J'}$ 在 $J \cap J'$ 上都是解，由唯一性（$J \cap J'$ 退化为 $\{t_0\}$ 时无需证明）它们在 $J \cap J'$ 上相等。

**第 6 步（推广到整个 $I$）**　对 $t \in I$，存在 $\eta_t > 0$，使 $N_t = I \cap [t - \eta_t, t + \eta_t]$ 是不退化的闭区间（$t$ 是 $I$ 的内点时取 $[t - \eta_t, t + \eta_t] \subset I$；$t$ 是 $I$ 的端点时取 $\eta_t$ 小于 $I$ 的长度）。令 $K_t$ 为包含 $N_t$ 和 $t_0$ 的最小闭区间，$K_t \subset I$（$I$ 是区间）。定义
$$X(t) = X_{K_t}(t)\qquad (t \in I).$$

- **$X$ 是解。** 对 $s \in N_t$，$s \in K_s \cap K_t$，由第 5 步末尾，$X(s) = X_{K_s}(s) = X_{K_t}(s)$。所以 $X$ 在 $t$ 的邻域 $N_t$（相对于 $I$）上等于 $X_{K_t}$，从而在 $t$ 处可导，$X'(t) = A(t)X(t) + B(t)$。又 $X(t_0) = X_{K_{t_0}}(t_0) = X_0$。
- **唯一。** 若 $Y$ 是 $I$ 上的解，则对每个 $t$，$Y|_{K_t}$ 是 $K_t$ 上的解，由第 5 步 $Y|_{K_t} = X_{K_t}$，特别地 $Y(t) = X(t)$。

这就证明了初值问题在 $I$ 上有唯一解。
:::

::: fr
▷ Méthode : d'après le {@fr:c8-equation-integrale}, il suffit de résoudre l'équation intégrale $X = \Phi(X)$, où
$$\Phi(Y)(t) = X_0 + \int_{t_0}^t\big(A(s)Y(s) + B(s)\big)\,\dd s.$$
On travaille d'abord sur un segment $J$ contenant $t_0$ : en partant de la fonction constante $Y_0 \equiv X_0$, on pose $Y_{k+1} = \Phi(Y_k)$ (itérations de Picard). La différence de deux termes consécutifs est majorée par $\frac{(K\abs{t - t_0})^k}{k!}$, la série converge normalement et sa somme est une solution ; la même majoration donne l'unicité. On recolle enfin les solutions obtenues sur les segments.

**Étape 1 (cadre sur un segment)**　Soit $J = [a, b] \subset I$ un segment contenant $t_0$, $a < b$. La fonction $\norm{A}$ est continue sur le compact $J$, donc bornée : posons $K = \sup_J\norm{A}$. Posons $Y_0(t) = X_0$ ($t \in J$) et $Y_{k+1} = \Phi(Y_k)$. Par récurrence, chaque $Y_k$ est continue sur $J$ (si $Y_k$ est continue, l'intégrande l'est et le théorème fondamental de l'analyse montre que $Y_{k+1}$ l'est). Posons $M = \sup_J\norm{Y_1 - Y_0} < +\infty$.

**Étape 2 (majoration des itérées)**　Montrons que pour tout $k \in \N$ et tout $t \in J$,
$$\norm{Y_{k+1}(t) - Y_k(t)} \le M\,\frac{K^k\abs{t - t_0}^k}{k!}.$$

- **Initialisation** ($k = 0$) : c'est la définition de $M$.
- **Hérédité** : supposons l'inégalité vraie au rang $k - 1$ ($k \ge 1$). Par définition, $Y_{k+1}(t) - Y_k(t) = \int_{t_0}^t A(s)\big(Y_k(s) - Y_{k-1}(s)\big)\,\dd s$, donc
  $$\begin{aligned}
  \norm{Y_{k+1}(t) - Y_k(t)} &\le \Big|\int_{t_0}^t\norm{A(s)}\,\norm{Y_k(s) - Y_{k-1}(s)}\,\dd s\Big| && \text{(majoration, sous-multiplicativité)}\\
  &\le \Big|\int_{t_0}^t K\cdot M\frac{K^{k-1}\abs{s - t_0}^{k-1}}{(k-1)!}\,\dd s\Big| && \text{(hypothèse de récurrence)}\\
  &= M\,\frac{K^k\abs{t - t_0}^k}{k!}.
  \end{aligned}$$

**Étape 3 (convergence uniforme)**　D'après l'étape 2, $\sup_J\norm{Y_{k+1} - Y_k} \le M\frac{(K(b - a))^k}{k!}$ et $\sum_k M\frac{(K(b-a))^k}{k!} = M\e^{K(b-a)} < +\infty$. La série $\sum(Y_{k+1} - Y_k)$ converge donc normalement sur $J$ ({@fr:normale-unif} appliqué à chaque composante), et les sommes partielles $Y_k = Y_0 + \sum_{j < k}(Y_{j+1} - Y_j)$ convergent uniformément sur $J$ vers une fonction $X$, continue d'après {@fr:cont-limite-unif}.

**Étape 4 (la limite est solution)**　Pour $t \in J$,
$$\norm{\Phi(Y_k)(t) - \Phi(X)(t)} = \Big\|\int_{t_0}^t A(s)\big(Y_k(s) - X(s)\big)\,\dd s\Big\| \le K(b - a)\sup_J\norm{Y_k - X} \xrightarrow[k \to \infty]{} 0.$$
En faisant $k \to \infty$ dans $Y_{k+1} = \Phi(Y_k)$, le membre de gauche tend vers $X(t)$ et celui de droite vers $\Phi(X)(t)$ ; donc $X = \Phi(X)$. D'après le {@fr:c8-equation-integrale}, $X$ est solution sur $J$.

**Étape 5 (unicité sur un segment)**　Soient $X, Y$ deux solutions sur $J$ vérifiant la condition initiale et $\delta = X - Y$. D'après le {@fr:c8-equation-integrale}, $\delta(t) = \int_{t_0}^t A(s)\delta(s)\,\dd s$. Posons $m = \sup_J\norm{\delta}$. La même récurrence qu'à l'étape 2 (en remplaçant $Y_{k+1} - Y_k$ par $\delta$ et $M$ par $m$) donne, pour tout $k$, $\norm{\delta(t)} \le m\frac{(K\abs{t - t_0})^k}{k!} \le m\frac{(K(b-a))^k}{k!}$. Quand $k \to \infty$, le membre de droite tend vers $0$ (terme général d'une série convergente), donc $\delta = 0$.

Notons $X_J$ l'unique solution sur $J$. Si $J, J'$ sont deux segments contenant $t_0$, $X_J$ et $X_{J'}$ sont solutions sur $J \cap J'$ ; par unicité (il n'y a rien à montrer si $J \cap J' = \{t_0\}$), elles coïncident sur $J \cap J'$.

**Étape 6 (extension à tout $I$)**　Pour $t \in I$, il existe $\eta_t > 0$ tel que $N_t = I \cap [t - \eta_t, t + \eta_t]$ soit un segment non réduit à un point (si $t$ est intérieur à $I$, on prend $[t - \eta_t, t + \eta_t] \subset I$ ; si $t$ est une extrémité de $I$, on prend $\eta_t$ inférieur à la longueur de $I$). Soit $K_t$ le plus petit segment contenant $N_t$ et $t_0$ ; $K_t \subset I$ car $I$ est un intervalle. Posons
$$X(t) = X_{K_t}(t)\qquad (t \in I).$$

- **$X$ est solution.** Pour $s \in N_t$, on a $s \in K_s \cap K_t$, donc, d'après la fin de l'étape 5, $X(s) = X_{K_s}(s) = X_{K_t}(s)$. Ainsi $X$ coïncide avec $X_{K_t}$ sur le voisinage $N_t$ de $t$ (relatif à $I$) ; elle est donc dérivable en $t$ et $X'(t) = A(t)X(t) + B(t)$. De plus $X(t_0) = X_{K_{t_0}}(t_0) = X_0$.
- **Unicité.** Si $Y$ est une solution sur $I$, alors pour tout $t$, $Y|_{K_t}$ est solution sur $K_t$ ; d'après l'étape 5, $Y|_{K_t} = X_{K_t}$, en particulier $Y(t) = X(t)$.

Ceci montre que le problème de Cauchy admet une unique solution sur $I$.
:::

::: rem
1. **「整个 $I$ 上」是线性方程特有的。** 非线性方程的解可以在有限时间内爆破（{@ex-explosion}），即使右边是 $\Cc^\infty$ 的。线性方程的解至多指数增长：第 3 步给出 $\norm{X(t)} \le \norm{X_0} + M\e^{K\abs{t - t_0}}$ 型的估计。
2. **系数的连续性用在哪里**：第 1 步需要 $\sup_J\norm{A} < +\infty$，引理 {@c8-equation-integrale} 需要被积函数连续。
3. **方程必须是「解出导数」的形式** $X' = A(t)X + B(t)$。导数前的系数在某点为零时，结论可能失效：
:::

::: cex id=c8-cex-singulier zh="首项系数为零：存在性与唯一性都失效" lvl=1
考虑 $t\,y' = 2y$，$t \in \R$。

- 在 $]0, +\infty[$ 上，它等价于 $y' = \frac2t y$，是 (E) 的形式，由 {@c8-ex-ordre1}（$\alpha(t) = 2\ln t$），解为 $y = \lambda t^2$；同样在 $]-\infty, 0[$ 上解为 $y = \mu t^2$。
- 若 $y$ 是 $\R$ 上的可导解，则 $y(t) = \lambda t^2$（$t > 0$），$y(t) = \mu t^2$（$t < 0$），由连续性 $y(0) = 0$。反之，对任意 $\lambda, \mu$，函数 $y(t) = \lambda t^2$（$t \ge 0$）、$\mu t^2$（$t < 0$）在 $0$ 处可导，$y'(0) = 0$，满足 $0 \cdot y'(0) = 2y(0)$。

所以 $\R$ 上的解集是二维向量空间（参数 $\lambda, \mu$），而方程是一阶的；初值问题 $y(0) = 1$ 无解，$y(0) = 0$ 有无穷多个解。{@cauchy-lipschitz-lineaire} 与 {@structure-solutions} 的结论都不成立，因为在 $t = 0$ 处无法把方程写成 $y' = a(t)y$。
:::

::: cor id=structure-solutions zh="解空间的结构" en="Structure of the solution set" fr="Structure de l'ensemble des solutions" ru="Структура множества решений" lvl=1
1. 齐次方程 (H) 的解集 $\mathcal{S}_H$ 是 $\K$-向量空间，对任意 $t_0 \in I$，映射 $X \mapsto X(t_0)$ 是从 $\mathcal{S}_H$ 到 $\K^n$ 的同构。特别地 $\dim\mathcal{S}_H = n$。
2. (E) 的解集是仿射空间 $X_p + \mathcal{S}_H$，其中 $X_p$ 是任一特解。
:::

::: fr
1. L'ensemble $\mathcal{S}_H$ des solutions de l'équation homogène (H) est un $\K$-espace vectoriel et, pour tout $t_0 \in I$, l'application $X \mapsto X(t_0)$ est un isomorphisme de $\mathcal{S}_H$ sur $\K^n$. En particulier $\dim\mathcal{S}_H = n$.
2. L'ensemble des solutions de (E) est l'espace affine $X_p + \mathcal{S}_H$, où $X_p$ est une solution particulière quelconque.
:::

::: proof
▷ 思路：线性来自方程的线性；双射性正是 {@cauchy-lipschitz-lineaire}：满射是存在性，单射是唯一性。

**1.**

- **向量空间。** $0 \in \mathcal{S}_H$。若 $X, Y \in \mathcal{S}_H$，$\lambda \in \K$，则 $(X + \lambda Y)' = AX + \lambda AY = A(X + \lambda Y)$，所以 $X + \lambda Y \in \mathcal{S}_H$。
- **线性。** 对 $\mathrm{ev}_{t_0} : X \mapsto X(t_0)$，由函数加法与数乘的逐点定义，$\mathrm{ev}_{t_0}(X + \lambda Y) = (X + \lambda Y)(t_0) = X(t_0) + \lambda Y(t_0)$。
- **满射。** 任给 $X_0 \in \K^n$，由 {@cauchy-lipschitz-lineaire}（$B = 0$），存在 $X \in \mathcal{S}_H$ 使 $X(t_0) = X_0$。
- **单射。** 若 $X(t_0) = 0$，则 $X$ 与零解是同一个初值问题的解，由唯一性 $X = 0$。

所以 $\mathrm{ev}_{t_0}$ 是同构，$\dim\mathcal{S}_H = \dim\K^n = n$。

**2.**　设 $X_p$ 是 (E) 的一个解（由 {@cauchy-lipschitz-lineaire} 存在）。对 $I$ 上可导的 $X$，$(X - X_p)' - A(X - X_p) = (X' - AX - B) - (X_p' - AX_p - B) = X' - AX - B$。所以 $X$ 是 (E) 的解 $\iff$ $X - X_p \in \mathcal{S}_H$，即解集为 $X_p + \mathcal{S}_H$。
:::

::: fr
▷ Méthode : la linéarité vient de celle de l'équation ; la bijectivité est exactement {@fr:cauchy-lipschitz-lineaire} : la surjectivité est l'existence, l'injectivité est l'unicité.

**1.**

- **Espace vectoriel.** $0 \in \mathcal{S}_H$. Si $X, Y \in \mathcal{S}_H$ et $\lambda \in \K$, alors $(X + \lambda Y)' = AX + \lambda AY = A(X + \lambda Y)$, donc $X + \lambda Y \in \mathcal{S}_H$.
- **Linéarité.** L'application $\mathrm{ev}_{t_0} : X \mapsto X(t_0)$ vérifie $\mathrm{ev}_{t_0}(X + \lambda Y) = X(t_0) + \lambda Y(t_0)$ (les opérations sont définies point par point).
- **Surjectivité.** Soit $X_0 \in \K^n$ ; d'après {@fr:cauchy-lipschitz-lineaire} (avec $B = 0$), il existe $X \in \mathcal{S}_H$ telle que $X(t_0) = X_0$.
- **Injectivité.** Si $X(t_0) = 0$, alors $X$ et la solution nulle sont solutions du même problème de Cauchy ; par unicité, $X = 0$.

Donc $\mathrm{ev}_{t_0}$ est un isomorphisme et $\dim\mathcal{S}_H = \dim\K^n = n$.

**2.**　Soit $X_p$ une solution de (E) (elle existe d'après {@fr:cauchy-lipschitz-lineaire}). Pour $X$ dérivable sur $I$, $(X - X_p)' - A(X - X_p) = (X' - AX - B) - (X_p' - AX_p - B) = X' - AX - B$. Donc $X$ est solution de (E) si et seulement si $X - X_p \in \mathcal{S}_H$ : l'ensemble des solutions est $X_p + \mathcal{S}_H$.
:::

::: cor id=c8-base-solutions zh="零解与基本解组的判别" en="Zero solution and fundamental systems" fr="Solution nulle et systèmes fondamentaux" ru="Нулевое решение и фундаментальные системы" lvl=1
若齐次方程的一个解在某一点 $t_0$ 处为零，则它恒为零。$n$ 个解 $X_1, \dots, X_n$ 构成 $\mathcal{S}_H$ 的基，当且仅当 $(X_1(t_0), \dots, X_n(t_0))$ 是 $\K^n$ 的基（对某个、等价地对每个 $t_0$）。
:::

::: fr
Si une solution de l'équation homogène s'annule en un point $t_0$, elle est identiquement nulle. Des solutions $X_1, \dots, X_n$ forment une base de $\mathcal{S}_H$ si et seulement si $(X_1(t_0), \dots, X_n(t_0))$ est une base de $\K^n$ (pour un $t_0$, ou de façon équivalente pour tout $t_0$).
:::

::: proof
▷ 思路：同构把基映为基（{@structure-solutions}）。

**第一句。** $X(t_0) = 0 = \mathrm{ev}_{t_0}(0)$，而 $\mathrm{ev}_{t_0}$ 是单射，所以 $X = 0$。

**第二句。** 固定 $t_0$。同构 $\mathrm{ev}_{t_0}$ 把 $\mathcal{S}_H$ 的基映为 $\K^n$ 的基；反之它的逆也是同构，把 $\K^n$ 的基映回 $\mathcal{S}_H$ 的基。所以 $(X_1, \dots, X_n)$ 是 $\mathcal{S}_H$ 的基 $\iff$ $(X_1(t_0), \dots, X_n(t_0))$ 是 $\K^n$ 的基。左边与 $t_0$ 无关，所以「对某个 $t_0$ 成立」与「对每个 $t_0$ 成立」等价。
:::

::: fr
▷ Méthode : un isomorphisme envoie une base sur une base ({@fr:structure-solutions}).

**Première assertion.** On a $X(t_0) = 0 = \mathrm{ev}_{t_0}(0)$ et $\mathrm{ev}_{t_0}$ est injective, donc $X = 0$.

**Seconde assertion.** Soit $t_0 \in I$. L'isomorphisme $\mathrm{ev}_{t_0}$ envoie une base de $\mathcal{S}_H$ sur une base de $\K^n$ ; son inverse, qui est aussi un isomorphisme, envoie une base de $\K^n$ sur une base de $\mathcal{S}_H$. Donc $(X_1, \dots, X_n)$ est une base de $\mathcal{S}_H$ si et seulement si $(X_1(t_0), \dots, X_n(t_0))$ est une base de $\K^n$. Le membre de gauche ne dépend pas de $t_0$ : « pour un $t_0$ » et « pour tout $t_0$ » sont donc équivalents.
:::

::: def id=c8-def-systeme-fondamental zh="基本解组与基本矩阵" en="Fundamental system, fundamental matrix" fr="Système fondamental de solutions, matrice fondamentale" ru="Фундаментальная система решений, фундаментальная матрица"
(H) 的解空间 $\mathcal{S}_H$ 的一组基 $(X_1, \dots, X_n)$ 称为**基本解组**。以它们为列的矩阵值函数 $\Phi(t) = \big(X_1(t)\ \cdots\ X_n(t)\big)$ 称为**基本矩阵**。由 {@c8-base-solutions}，
$$\Phi \text{ 是基本矩阵} \iff \Phi' = A\Phi \text{ 且对某个（等价地，每个）} t_0,\ \det\Phi(t_0) \ne 0.$$
此时 (H) 的解恰好是 $X(t) = \Phi(t)C$，$C \in \K^n$。
:::

::: fr
Une base $(X_1, \dots, X_n)$ de l'espace $\mathcal{S}_H$ des solutions de (H) s'appelle un **système fondamental de solutions**. La fonction matricielle $\Phi(t) = \big(X_1(t)\ \cdots\ X_n(t)\big)$ dont les colonnes sont les $X_j$ s'appelle une **matrice fondamentale**. D'après {@fr:c8-base-solutions},
$$\Phi \text{ est fondamentale} \iff \Phi' = A\Phi \text{ et, pour un (de façon équivalente, pour tout) } t_0,\ \det\Phi(t_0) \ne 0.$$
Les solutions de (H) sont alors exactement les $X(t) = \Phi(t)C$, $C \in \K^n$.
:::

::: ex id=c8-ex-systeme-fondamental zh="基本解组：是与不是" lvl=1
方程 $y'' + y = 0$，即 $X' = \begin{pmatrix}0 & 1\\ -1 & 0\end{pmatrix}X$，$X = (y, y')^T$。

- **是。** $y_1 = \cos$，$y_2 = \sin$ 给出 $X_1 = (\cos, -\sin)^T$，$X_2 = (\sin, \cos)^T$，$\det\Phi(t) = \cos^2 t + \sin^2 t = 1 \ne 0$。所以一切解为 $y = c_1\cos t + c_2\sin t$。
- **不是。** $y_1 = \cos$，$y_2 = 2\cos$：$\det\Phi(t) = \cos t\cdot(-2\sin t) - (-\sin t)\cdot 2\cos t = 0$。它们线性相关，只张成一维子空间。
:::

::: q
(E) 的解集（$B \ne 0$）是向量空间吗？
:::

::: ans
不是：零函数不是解（$0' = 0 \ne A \cdot 0 + B$）；两个解 $X, Y$ 之和满足 $(X + Y)' = A(X + Y) + 2B$，是另一个方程的解。它是仿射空间：两个解之**差**属于 $\mathcal{S}_H$（{@structure-solutions}）。
:::

::: q
设 $n = 1$，$\K = \R$，$y, z$ 是 $y' = a(t)y + b(t)$ 在 $I$ 上的两个解，且 $y(t_1) < z(t_1)$。证明对一切 $t \in I$，$y(t) < z(t)$。
:::

::: ans
反设存在 $t_2$ 使 $y(t_2) \ge z(t_2)$。$z - y$ 连续，$(z - y)(t_1) > 0 \ge (z - y)(t_2)$，由介值定理存在 $t_3$ 使 $y(t_3) = z(t_3)$。于是 $y, z$ 是同一个初值问题（初始时刻 $t_3$）的解，由 {@cauchy-lipschitz-lineaire} 的唯一性 $y = z$，与 $y(t_1) < z(t_1)$ 矛盾。所以不同的解的图像互不相交。
:::

## 常系数方程与矩阵指数

$A$ 是常数矩阵时，$n = 1$ 的公式 $y(t) = \e^{ta}y_0$ 有完全相同的推广：$X(t) = \e^{tA}X_0$。要做的是定义矩阵的指数，并证明 $\frac{\dd}{\dd t}\e^{tA} = A\e^{tA}$。

::: def id=def-exp-matrice zh="矩阵指数" en="Matrix exponential" fr="Exponentielle de matrice" ru="Матричная экспонента"
对 $M \in \M_n(\K)$，定义
$$\exp(M) = \e^M = \sum_{k \ge 0}\frac{M^k}{k!}.$$
由次乘性 $\norm{M^k} \le \norm{M}^k$，级数绝对收敛，而 $\M_n(\K)$ 是有限维空间，从而完备（{@dimfinie-complet}），由 {@serie-abs-banach}，级数收敛，且 $\norm{\e^M} \le \e^{\norm{M}}$。
:::

::: fr
Pour $M \in \M_n(\K)$, on pose
$$\exp(M) = \e^M = \sum_{k \ge 0}\frac{M^k}{k!}.$$
Par sous-multiplicativité, $\norm{M^k} \le \norm{M}^k$ ; la série est donc absolument convergente et, $\M_n(\K)$ étant de dimension finie donc complet ({@fr:dimfinie-complet}), elle converge d'après {@fr:serie-abs-banach}, avec $\norm{\e^M} \le \e^{\norm{M}}$.
:::

白话：把 $\e^x = \sum\frac{x^k}{k!}$ 中的数 $x$ 换成矩阵。由于有限维空间中范数都等价，收敛性与所取的范数无关；按分量看，$\e^M$ 的 $(i, j)$ 元是数项级数 $\sum_k\frac{(M^k)_{ij}}{k!}$ 的和。

::: ex id=c8-ex-exp-calcul zh="直接用定义计算" lvl=1
1. $\e^{0} = I$；$\e^{\lambda I} = \sum\frac{\lambda^k}{k!}I = \e^\lambda I$。
2. **对角矩阵。** $D = \operatorname{diag}(\lambda_1, \dots, \lambda_n)$：$D^k = \operatorname{diag}(\lambda_i^k)$，部分和为 $\operatorname{diag}\big(\sum_{k \le N}\frac{\lambda_i^k}{k!}\big)$，逐元素取极限，$\e^D = \operatorname{diag}(\e^{\lambda_i})$。
3. **幂零矩阵。** $N = \begin{pmatrix}0 & 1\\ 0 & 0\end{pmatrix}$：$N^2 = 0$，级数只剩两项，$\e^{tN} = I + tN = \begin{pmatrix}1 & t\\ 0 & 1\end{pmatrix}$。一般地，若 $N^p = 0$，$\e^N = \sum_{k < p}\frac{N^k}{k!}$ 是有限和。
4. **注意：** $\e^M$ 的元素**不是** $M$ 的元素的指数（对角矩阵除外）。例如 3 中 $\e^{tN}$ 的 $(2, 1)$ 元是 $0$，而 $\e^{(tN)_{21}} = \e^0 = 1$；$(1, 2)$ 元是 $t$，而 $\e^{(tN)_{12}} = \e^t$。
:::

::: prop id=exp-matrice-proprietes zh="矩阵指数的性质" en="Properties of the matrix exponential" fr="Propriétés de l'exponentielle de matrice" ru="Свойства матричной экспоненты" lvl=1
1. 若 $MN = NM$，则 $\e^{M + N} = \e^M\e^N$。特别地 $\e^M$ 可逆，$(\e^M)^{-1} = \e^{-M}$。
2. $P\,\e^M P^{-1} = \e^{PMP^{-1}}$；若 $M = \operatorname{diag}(\lambda_i)$，则 $\e^M = \operatorname{diag}(\e^{\lambda_i})$。
3. $t \mapsto \e^{tM}$ 是 $\Cc^1$ 的，$\frac{\dd}{\dd t}\e^{tM} = M\e^{tM} = \e^{tM}M$。
4. $\det\e^M = \e^{\tr M}$。
:::

::: fr
1. Si $MN = NM$, alors $\e^{M + N} = \e^M\e^N$. En particulier $\e^M$ est inversible et $(\e^M)^{-1} = \e^{-M}$.
2. $P\,\e^M P^{-1} = \e^{PMP^{-1}}$ ; si $M = \operatorname{diag}(\lambda_i)$, alors $\e^M = \operatorname{diag}(\e^{\lambda_i})$.
3. $t \mapsto \e^{tM}$ est de classe $\Cc^1$ et $\frac{\dd}{\dd t}\e^{tM} = M\e^{tM} = \e^{tM}M$.
4. $\det\e^M = \e^{\tr M}$.
:::

::: proof
▷ 思路：先证 3（直接估计差商与导数之差）；再用 3 和**线性方程解的唯一性**证 1：$\e^{t(M+N)}$ 与 $\e^{tM}\e^{tN}$ 满足同一个初值问题。2 与 4 是对部分和计算再取极限。记 $S_p(X) = \sum_{k \le p}\frac{X^k}{k!}$。

**3.**　固定 $t \in \R$，$h \ne 0$。$M\e^{tM} = \sum_{k \ge 1}\frac{t^{k-1}M^k}{(k-1)!}$（$X \mapsto MX$ 是有限维空间上的线性映射，连续（{@cor-dimfinie}），可以与级数求和交换）。所以
$$\frac{\e^{(t+h)M} - \e^{tM}}{h} - M\e^{tM} = \sum_{k \ge 2}c_k(h)\frac{M^k}{k!},\qquad c_k(h) = \frac{(t + h)^k - t^k}{h} - kt^{k-1}$$
（$k = 0, 1$ 的项为零）。对 $u \mapsto u^k$ 在 $t$ 与 $t + h$ 之间用 Taylor–Lagrange 公式，存在 $\xi$ 介于两者之间，使 $(t+h)^k = t^k + kt^{k-1}h + \frac{k(k-1)}{2}\xi^{k-2}h^2$，所以 $\abs{c_k(h)} \le \frac{k(k-1)}{2}(\abs t + \abs h)^{k-2}\abs h$。于是
$$\begin{aligned}
\Big\|\frac{\e^{(t+h)M} - \e^{tM}}{h} - M\e^{tM}\Big\| &\le \sum_{k \ge 2}\abs{c_k(h)}\frac{\norm{M}^k}{k!} && \text{（{@serie-abs-banach}，次乘性）}\\
&\le \frac{\abs h}{2}\sum_{k \ge 2}\frac{(\abs t + \abs h)^{k-2}\norm{M}^k}{(k-2)!} = \frac{\abs h}{2}\norm{M}^2\e^{(\abs t + \abs h)\norm{M}} \xrightarrow[h \to 0]{} 0.
\end{aligned}$$
所以 $\frac{\dd}{\dd t}\e^{tM} = M\e^{tM}$。$M$ 与每个部分和 $S_p(tM)$ 交换，取极限（乘法连续）得 $M\e^{tM} = \e^{tM}M$。导数 $t \mapsto M\e^{tM}$ 是可导函数乘以常矩阵，连续，所以 $t \mapsto \e^{tM}$ 是 $\Cc^1$ 的。

**1.**　设 $MN = NM$。

1. 由归纳 $NM^k = M^kN$，所以 $N$ 与 $S_p(tM)$ 交换，取极限得 $N\e^{tM} = \e^{tM}N$。
2. 令 $Y(t) = \e^{tM}\e^{tN}$。由乘积的求导法则（矩阵乘积的元素是乘积之和）和 3，
   $$Y' = M\e^{tM}\e^{tN} + \e^{tM}N\e^{tN} = M\e^{tM}\e^{tN} + N\e^{tM}\e^{tN} = (M + N)Y.$$
3. 令 $Z(t) = \e^{t(M + N)}$。由 3，$Z' = (M + N)Z$。又 $Y(0) = Z(0) = I$。
4. 对每个 $j$，$Y$ 与 $Z$ 的第 $j$ 列都是 $X' = (M + N)X$、$X(0) = e_j$ 在 $\R$ 上的解；由 {@cauchy-lipschitz-lineaire} 的唯一性，它们相等。所以 $Y = Z$，取 $t = 1$ 得 $\e^{M + N} = \e^M\e^N$。
5. $M$ 与 $-M$ 交换，所以 $\e^M\e^{-M} = \e^{0} = I$，同样 $\e^{-M}\e^M = I$。

**2.**　由归纳，$(PMP^{-1})^k = PM^kP^{-1}$（中间的 $P^{-1}P$ 相消），所以 $S_p(PMP^{-1}) = P\,S_p(M)\,P^{-1}$。$X \mapsto PXP^{-1}$ 是有限维空间上的线性映射，从而连续（{@cor-dimfinie}），令 $p \to \infty$ 得 $\e^{PMP^{-1}} = P\e^MP^{-1}$。对角情形见 {@c8-ex-exp-calcul} 第 2 条。

**4.**　在 $\C$ 上把 $M$ 三角化：$M = PTP^{-1}$，$T$ 上三角，对角元 $t_{11}, \dots, t_{nn}$。上三角矩阵的乘积是上三角矩阵，对角元相乘，所以 $T^k$ 上三角、对角元为 $t_{ii}^k$，$S_p(T)$ 上三角、对角元为 $S_p(t_{ii})$。上三角矩阵构成有限维子空间，是闭集（{@cor-dimfinie}），取极限：$\e^T$ 上三角，对角元为 $\e^{t_{ii}}$。于是
$$\det\e^M = \det\big(P\e^TP^{-1}\big) = \det\e^T = \prod_i\e^{t_{ii}} = \e^{\sum_i t_{ii}} = \e^{\tr T} = \e^{\tr M},$$
其中用了 2 和迹的相似不变性。（$\K = \R$ 时在 $\M_n(\C)$ 中计算，级数是同一个。）
:::

::: fr
▷ Méthode : on montre d'abord 3 (majoration directe de l'écart entre le taux d'accroissement et la dérivée) ; puis 1 à l'aide de 3 et de **l'unicité des solutions d'une équation linéaire** : $\e^{t(M+N)}$ et $\e^{tM}\e^{tN}$ vérifient le même problème de Cauchy. Pour 2 et 4, on calcule sur les sommes partielles puis on passe à la limite. Notons $S_p(X) = \sum_{k \le p}\frac{X^k}{k!}$.

**3.**　Soient $t \in \R$ et $h \ne 0$. On a $M\e^{tM} = \sum_{k \ge 1}\frac{t^{k-1}M^k}{(k-1)!}$ ($X \mapsto MX$ est linéaire sur un espace de dimension finie, donc continue ({@fr:cor-dimfinie}), et commute avec la somme de la série). Donc
$$\frac{\e^{(t+h)M} - \e^{tM}}{h} - M\e^{tM} = \sum_{k \ge 2}c_k(h)\frac{M^k}{k!},\qquad c_k(h) = \frac{(t + h)^k - t^k}{h} - kt^{k-1}$$
(les termes $k = 0, 1$ sont nuls). La formule de Taylor–Lagrange appliquée à $u \mapsto u^k$ entre $t$ et $t + h$ fournit $\xi$ entre ces deux réels tel que $(t+h)^k = t^k + kt^{k-1}h + \frac{k(k-1)}{2}\xi^{k-2}h^2$ ; donc $\abs{c_k(h)} \le \frac{k(k-1)}{2}(\abs t + \abs h)^{k-2}\abs h$. Ainsi
$$\begin{aligned}
\Big\|\frac{\e^{(t+h)M} - \e^{tM}}{h} - M\e^{tM}\Big\| &\le \sum_{k \ge 2}\abs{c_k(h)}\frac{\norm{M}^k}{k!} && \text{({@fr:serie-abs-banach}, sous-multiplicativité)}\\
&\le \frac{\abs h}{2}\sum_{k \ge 2}\frac{(\abs t + \abs h)^{k-2}\norm{M}^k}{(k-2)!} = \frac{\abs h}{2}\norm{M}^2\e^{(\abs t + \abs h)\norm{M}} \xrightarrow[h \to 0]{} 0.
\end{aligned}$$
Donc $\frac{\dd}{\dd t}\e^{tM} = M\e^{tM}$. Comme $M$ commute avec chaque somme partielle $S_p(tM)$, on obtient par passage à la limite (le produit est continu) $M\e^{tM} = \e^{tM}M$. La dérivée $t \mapsto M\e^{tM}$, produit d'une matrice constante par une fonction dérivable, est continue : $t \mapsto \e^{tM}$ est $\Cc^1$.

**1.**　Supposons $MN = NM$.

1. Par récurrence, $NM^k = M^kN$, donc $N$ commute avec $S_p(tM)$ et, par passage à la limite, $N\e^{tM} = \e^{tM}N$.
2. Posons $Y(t) = \e^{tM}\e^{tN}$. Par la règle de dérivation d'un produit (les coefficients d'un produit de matrices sont des sommes de produits) et 3,
   $$Y' = M\e^{tM}\e^{tN} + \e^{tM}N\e^{tN} = M\e^{tM}\e^{tN} + N\e^{tM}\e^{tN} = (M + N)Y.$$
3. Posons $Z(t) = \e^{t(M + N)}$. D'après 3, $Z' = (M + N)Z$. De plus $Y(0) = Z(0) = I$.
4. Pour tout $j$, les $j$-ièmes colonnes de $Y$ et de $Z$ sont solutions sur $\R$ de $X' = (M + N)X$, $X(0) = e_j$ ; par l'unicité de {@fr:cauchy-lipschitz-lineaire}, elles sont égales. Donc $Y = Z$ et, pour $t = 1$, $\e^{M + N} = \e^M\e^N$.
5. $M$ et $-M$ commutent, donc $\e^M\e^{-M} = \e^{0} = I$, et de même $\e^{-M}\e^M = I$.

**2.**　Par récurrence, $(PMP^{-1})^k = PM^kP^{-1}$ (les $P^{-1}P$ intermédiaires se simplifient), donc $S_p(PMP^{-1}) = P\,S_p(M)\,P^{-1}$. L'application $X \mapsto PXP^{-1}$ est linéaire sur un espace de dimension finie, donc continue ({@fr:cor-dimfinie}) ; quand $p \to \infty$, on obtient $\e^{PMP^{-1}} = P\e^MP^{-1}$. Pour le cas diagonal, voir le point 2 de {@fr:c8-ex-exp-calcul}.

**4.**　On trigonalise $M$ dans $\C$ : $M = PTP^{-1}$ avec $T$ triangulaire supérieure de coefficients diagonaux $t_{11}, \dots, t_{nn}$. Un produit de matrices triangulaires supérieures est triangulaire supérieur, de diagonale le produit des diagonales ; donc $T^k$ est triangulaire supérieure de diagonale $(t_{ii}^k)$ et $S_p(T)$ est triangulaire supérieure de diagonale $(S_p(t_{ii}))$. Les matrices triangulaires supérieures forment un sous-espace de dimension finie, donc fermé ({@fr:cor-dimfinie}) ; par passage à la limite, $\e^T$ est triangulaire supérieure de diagonale $(\e^{t_{ii}})$. Ainsi
$$\det\e^M = \det\big(P\e^TP^{-1}\big) = \det\e^T = \prod_i\e^{t_{ii}} = \e^{\sum_i t_{ii}} = \e^{\tr T} = \e^{\tr M},$$
en utilisant 2 et l'invariance de la trace par similitude. (Si $\K = \R$, on calcule dans $\M_n(\C)$ : la série est la même.)
:::

::: cex id=c8-cex-non-commutation zh="不交换时 $\e^{M+N} \ne \e^M\e^N$" lvl=1
不交换时第 1 条不成立。$M = \begin{pmatrix}0 & 1\\ 0 & 0\end{pmatrix}$，$N = \begin{pmatrix}0 & 0\\ 1 & 0\end{pmatrix}$，$MN = \begin{pmatrix}1 & 0\\ 0 & 0\end{pmatrix} \ne NM = \begin{pmatrix}0 & 0\\ 0 & 1\end{pmatrix}$。$M^2 = N^2 = 0$，所以 $\e^M = I + M$，$\e^N = I + N$：
$$\e^M\e^N = \begin{pmatrix}1 & 1\\ 0 & 1\end{pmatrix}\begin{pmatrix}1 & 0\\ 1 & 1\end{pmatrix} = \begin{pmatrix}2 & 1\\ 1 & 1\end{pmatrix}.$$
而 $(M + N)^2 = I$，把级数分成偶次项与奇次项：$\e^{M+N} = \sum_j\frac{1}{(2j)!}I + \sum_j\frac{1}{(2j+1)!}(M + N) = \begin{pmatrix}\ch 1 & \sh 1\\ \sh 1 & \ch 1\end{pmatrix}$。$\ch 1 \approx 1.543 \ne 2$。（两者的行列式都等于 $1 = \e^{\tr(M+N)}$，与第 4 条一致。）
:::

::: thm id=solution-coef-constants zh="常系数方程的解与 Duhamel 公式" en="Solution of constant-coefficient systems (Duhamel's formula)" fr="Solutions d'un système à coefficients constants (formule de Duhamel)" ru="Решение системы с постоянными коэффициентами (формула Дюамеля)" lvl=1
设 $A \in \M_n(\K)$ 是常数矩阵，$B$ 在 $I$ 上连续。初值问题 $X' = AX + B(t)$，$X(t_0) = X_0$ 的唯一解为
$$X(t) = \e^{(t - t_0)A}X_0 + \int_{t_0}^t\e^{(t - s)A}B(s)\,\dd s.$$
特别地，齐次方程 $X' = AX$ 的解为 $X(t) = \e^{(t - t_0)A}X_0$，$\e^{tA}$ 是一个基本矩阵。
:::

::: fr
Soient $A \in \M_n(\K)$ une matrice constante et $B$ continue sur $I$. L'unique solution du problème de Cauchy $X' = AX + B(t)$, $X(t_0) = X_0$ est
$$X(t) = \e^{(t - t_0)A}X_0 + \int_{t_0}^t\e^{(t - s)A}B(s)\,\dd s.$$
En particulier, les solutions de l'équation homogène $X' = AX$ sont les $X(t) = \e^{(t - t_0)A}X_0$, et $\e^{tA}$ est une matrice fondamentale.
:::

::: proof
▷ 思路：模仿 {@c8-ex-ordre1} 的「积分因子」：令 $Y(t) = \e^{-tA}X(t)$，则 $Y'$ 只剩 $\e^{-tA}B(t)$，积分即可。

**第 1 步（积分因子）**　设 $X$ 是初值问题的解（由 {@cauchy-lipschitz-lineaire} 存在且唯一）。令 $Y(t) = \e^{-tA}X(t)$。由乘积的求导法则与 {@exp-matrice-proprietes} 第 3 条（$M = -A$），
$$Y'(t) = -A\e^{-tA}X(t) + \e^{-tA}X'(t) = \e^{-tA}\big(X'(t) - AX(t)\big) = \e^{-tA}B(t),$$
其中用了 $A\e^{-tA} = \e^{-tA}A$。

**第 2 步（积分）**　$Y'$ 连续，由微积分基本定理，$Y(t) = Y(t_0) + \int_{t_0}^t\e^{-sA}B(s)\,\dd s$，即
$$\e^{-tA}X(t) = \e^{-t_0A}X_0 + \int_{t_0}^t\e^{-sA}B(s)\,\dd s.$$

**第 3 步（乘以 $\e^{tA}$）**　$tA$ 与 $-t_0A$、$-sA$ 交换，由 {@exp-matrice-proprietes} 第 1 条，$\e^{tA}\e^{-t_0A} = \e^{(t - t_0)A}$，$\e^{tA}\e^{-sA} = \e^{(t - s)A}$；且 $\e^{tA}\e^{-tA} = I$。左乘 $\e^{tA}$（常矩阵可以移进积分）即得公式。

**第 4 步（齐次情形）**　$B = 0$ 时 $X(t) = \e^{(t-t_0)A}X_0$。取 $t_0 = 0$，$\e^{tA}$ 的第 $j$ 列是初值为 $e_j$ 的解，$\det\e^{0} = 1 \ne 0$，由 {@c8-def-systeme-fondamental}，$\e^{tA}$ 是基本矩阵。

（由于解存在且唯一，第 1–3 步说明这个唯一解必须由公式给出；也可以直接求导验证公式给出解。）
:::

::: fr
▷ Méthode : on imite le « facteur intégrant » de {@fr:c8-ex-ordre1} : en posant $Y(t) = \e^{-tA}X(t)$, il ne reste dans $Y'$ que $\e^{-tA}B(t)$, qu'on intègre.

**Étape 1 (facteur intégrant)**　Soit $X$ la solution du problème de Cauchy (elle existe et est unique d'après {@fr:cauchy-lipschitz-lineaire}). Posons $Y(t) = \e^{-tA}X(t)$. Par la règle de dérivation d'un produit et le point 3 de {@fr:exp-matrice-proprietes} (avec $M = -A$),
$$Y'(t) = -A\e^{-tA}X(t) + \e^{-tA}X'(t) = \e^{-tA}\big(X'(t) - AX(t)\big) = \e^{-tA}B(t),$$
où l'on a utilisé $A\e^{-tA} = \e^{-tA}A$.

**Étape 2 (intégration)**　$Y'$ est continue ; par le théorème fondamental de l'analyse, $Y(t) = Y(t_0) + \int_{t_0}^t\e^{-sA}B(s)\,\dd s$, c'est-à-dire
$$\e^{-tA}X(t) = \e^{-t_0A}X_0 + \int_{t_0}^t\e^{-sA}B(s)\,\dd s.$$

**Étape 3 (multiplication par $\e^{tA}$)**　$tA$ commute avec $-t_0A$ et $-sA$ ; d'après le point 1 de {@fr:exp-matrice-proprietes}, $\e^{tA}\e^{-t_0A} = \e^{(t - t_0)A}$ et $\e^{tA}\e^{-sA} = \e^{(t - s)A}$ ; de plus $\e^{tA}\e^{-tA} = I$. En multipliant à gauche par $\e^{tA}$ (une matrice constante entre dans l'intégrale), on obtient la formule.

**Étape 4 (cas homogène)**　Si $B = 0$, $X(t) = \e^{(t-t_0)A}X_0$. Avec $t_0 = 0$, la $j$-ième colonne de $\e^{tA}$ est la solution de donnée initiale $e_j$, et $\det\e^{0} = 1 \ne 0$ ; d'après {@fr:c8-def-systeme-fondamental}, $\e^{tA}$ est une matrice fondamentale.

(Comme la solution existe et est unique, les étapes 1 à 3 montrent qu'elle est nécessairement donnée par la formule ; on peut aussi vérifier directement, en dérivant, que la formule définit une solution.)
:::

::: ex id=c8-ex-duhamel zh="Jordan 块与受迫振子" lvl=1
1. **Jordan 块。** $A = \begin{pmatrix}\lambda & 1\\ 0 & \lambda\end{pmatrix} = \lambda I + N$，$N = \begin{pmatrix}0 & 1\\ 0 & 0\end{pmatrix}$。$\lambda I$ 与 $N$ 交换，由 {@exp-matrice-proprietes} 第 1 条和 {@c8-ex-exp-calcul}，
   $$\e^{tA} = \e^{\lambda t}\,\e^{tN} = \e^{\lambda t}\begin{pmatrix}1 & t\\ 0 & 1\end{pmatrix}.$$
   所以 $X' = AX$ 的解是 $X(t) = \e^{\lambda t}\big(c_1 + c_2t,\ c_2\big)^T$：特征值重复且矩阵不可对角化时，出现 $t\,\e^{\lambda t}$ 这样的项。
2. **受迫振子。** $y'' + y = f(t)$（$f$ 连续）写成 $X = (y, y')^T$，$X' = AX + (0, f(t))^T$，$A = \begin{pmatrix}0 & 1\\ -1 & 0\end{pmatrix}$。$A^2 = -I$，把级数分成偶次项与奇次项，$\e^{tA} = \cos t\,I + \sin t\,A = \begin{pmatrix}\cos t & \sin t\\ -\sin t & \cos t\end{pmatrix}$。由 Duhamel 公式（$t_0 = 0$），取第一个分量：
   $$y(t) = y(0)\cos t + y'(0)\sin t + \int_0^t\sin(t - s)\,f(s)\,\dd s.$$
:::

::: method zh="如何计算 $\e^{tA}$"
1. $A$ 可对角化：$A = PDP^{-1}$，$\e^{tA} = P\e^{tD}P^{-1}$（{@exp-matrice-proprietes} 第 2 条）。
2. 一般情形：Dunford 分解（Jordan–Chevalley 分解）$A = D + N$，$D$ 可对角化（在 $\C$ 上），$N$ 幂零，$DN = ND$。于是 $\e^{tA} = \e^{tD}\sum_{k < n}\frac{t^kN^k}{k!}$（有限和，见 {@c8-ex-duhamel} 第 1 条）。
3. 利用零化多项式：若 $P(A) = 0$，$\deg P = d$，则每个 $A^k$ 都是 $I, A, \dots, A^{d-1}$ 的线性组合（对 $k$ 归纳，用 $P$ 作带余除法），这些组合构成有限维子空间，是闭集（{@cor-dimfinie}），所以 $\e^{tA}$ 是 $I, A, \dots, A^{d-1}$ 的线性组合，系数是 $t$ 的函数。
4. 对小矩阵也可以直接解方程组 $X' = AX$（例如先解出一个分量），得到基本矩阵 $\Phi$，再 $\e^{tA} = \Phi(t)\Phi(0)^{-1}$。

例：$A = \begin{pmatrix}0 & -1\\ 1 & 0\end{pmatrix}$（$A^2 = -I$，$d = 2$）。分开偶次项和奇次项，$\e^{tA} = \cos t\,I + \sin t\,A = \begin{pmatrix}\cos t & -\sin t\\ \sin t & \cos t\end{pmatrix}$，即平面旋转。
:::

::: thm id=stabilite zh="线性稳定性" en="Linear stability" fr="Stabilité des systèmes linéaires" ru="Устойчивость линейных систем" lvl=2
若 $A$ 的所有特征值的实部都 $< 0$，则 $X' = AX$ 的所有解当 $t \to +\infty$ 时以指数速度趋于 $0$：存在 $C, c > 0$，使 $\norm{\e^{tA}} \le C\e^{-ct}$（$t \ge 0$）。
:::

::: fr
Si toutes les valeurs propres de $A$ sont de partie réelle $< 0$, alors toutes les solutions de $X' = AX$ tendent vers $0$ à vitesse exponentielle quand $t \to +\infty$ : il existe $C, c > 0$ tels que $\norm{\e^{tA}} \le C\e^{-ct}$ pour $t \ge 0$.
:::

::: sketch
▷ 思路：用 Dunford 分解把 $\e^{tA}$ 拆成「$\e^{\lambda t}$ 型因子」乘以「$t$ 的多项式」；指数衰减压倒多项式增长。

**第 1 步（分解）**　在 $\C$ 上写 $A = D + N$，$D = P\operatorname{diag}(\lambda_1, \dots, \lambda_n)P^{-1}$，$N^n = 0$，$DN = ND$（线性代数）。由 {@exp-matrice-proprietes}，
$$\e^{tA} = P\operatorname{diag}(\e^{\lambda_1t}, \dots, \e^{\lambda_nt})P^{-1}\sum_{k < n}\frac{t^kN^k}{k!}.$$

**第 2 步（估计）**　令 $\alpha = \max_i\operatorname{Re}\lambda_i < 0$。$\abs{\e^{\lambda_it}} = \e^{t\operatorname{Re}\lambda_i} \le \e^{\alpha t}$（$t \ge 0$）。由范数等价，存在常数 $C_1$ 使 $\norm{\operatorname{diag}(\mu_i)} \le C_1\max\abs{\mu_i}$。于是对 $t \ge 0$，
$$\norm{\e^{tA}} \le C_1\norm{P}\,\norm{P^{-1}}\,\e^{\alpha t}\sum_{k < n}\frac{t^k\norm{N}^k}{k!} \le C_2\,(1 + t)^{n-1}\e^{\alpha t}.$$

**第 3 步（吸收多项式）**　取 $c = -\alpha/2 > 0$。函数 $t \mapsto (1 + t)^{n-1}\e^{(\alpha + c)t} = (1 + t)^{n-1}\e^{\alpha t/2}$ 在 $[0, +\infty[$ 上连续且趋于 $0$，从而有界，设上界为 $C_3$。令 $C = C_2C_3$，得 $\norm{\e^{tA}} \le C\e^{-ct}$。每个解 $X(t) = \e^{tA}X(0)$ 满足 $\norm{X(t)} \le C\e^{-ct}\norm{X(0)}$。
:::

::: fr
▷ Méthode : la décomposition de Dunford écrit $\e^{tA}$ comme produit de facteurs du type $\e^{\lambda t}$ et d'un polynôme en $t$ ; la décroissance exponentielle l'emporte sur la croissance polynomiale.

**Étape 1 (décomposition)**　Dans $\C$, on écrit $A = D + N$ avec $D = P\operatorname{diag}(\lambda_1, \dots, \lambda_n)P^{-1}$, $N^n = 0$ et $DN = ND$ (algèbre linéaire). D'après {@fr:exp-matrice-proprietes},
$$\e^{tA} = P\operatorname{diag}(\e^{\lambda_1t}, \dots, \e^{\lambda_nt})P^{-1}\sum_{k < n}\frac{t^kN^k}{k!}.$$

**Étape 2 (majoration)**　Posons $\alpha = \max_i\operatorname{Re}\lambda_i < 0$. On a $\abs{\e^{\lambda_it}} = \e^{t\operatorname{Re}\lambda_i} \le \e^{\alpha t}$ pour $t \ge 0$. Par équivalence des normes, il existe $C_1$ tel que $\norm{\operatorname{diag}(\mu_i)} \le C_1\max\abs{\mu_i}$. Donc, pour $t \ge 0$,
$$\norm{\e^{tA}} \le C_1\norm{P}\,\norm{P^{-1}}\,\e^{\alpha t}\sum_{k < n}\frac{t^k\norm{N}^k}{k!} \le C_2\,(1 + t)^{n-1}\e^{\alpha t}.$$

**Étape 3 (absorption du polynôme)**　Posons $c = -\alpha/2 > 0$. La fonction $t \mapsto (1 + t)^{n-1}\e^{(\alpha + c)t} = (1 + t)^{n-1}\e^{\alpha t/2}$ est continue sur $[0, +\infty[$ et tend vers $0$, donc elle est bornée, disons par $C_3$. Avec $C = C_2C_3$, on obtient $\norm{\e^{tA}} \le C\e^{-ct}$. Toute solution $X(t) = \e^{tA}X(0)$ vérifie $\norm{X(t)} \le C\e^{-ct}\norm{X(0)}$.
:::

::: rem
1. **条件是必要的。** 若某个特征值 $\lambda$ 满足 $\operatorname{Re}\lambda \ge 0$，取（复）特征向量 $v$，则 $X(t) = \e^{\lambda t}v$ 是解（$X' = \lambda X = AX$），$\norm{X(t)} = \e^{t\operatorname{Re}\lambda}\norm{v}$ 不趋于 $0$。例如旋转 $A = \begin{pmatrix}0 & -1\\ 1 & 0\end{pmatrix}$（特征值 $\pm\ii$）的解有界但不趋于 $0$。
2. **看的是特征值，不是矩阵元素。** $A = \begin{pmatrix}-1 & 100\\ 0 & -1\end{pmatrix}$ 的解 $\e^{-t}(c_1 + 100c_2t, c_2)$ 先增长到 $\approx 37\abs{c_2}$ 再衰减；定理只保证最终的指数衰减，常数 $C$ 可能很大。
3. **只对常系数成立**：见下面的反例。
:::

::: cex id=c8-cex-markus-yamabe zh="变系数时「特征值实部为负」不够" lvl=2
（Markus–Yamabe，1960）令
$$A(t) = \begin{pmatrix}-1 + \frac32\cos^2 t & 1 - \frac32\cos t\sin t\\ -1 - \frac32\sin t\cos t & -1 + \frac32\sin^2 t\end{pmatrix}.$$
直接计算 $\tr A(t) = -\frac12$，$\det A(t) = \frac12$，所以对每个 $t$，$A(t)$ 的特征值是 $\frac{-1 \pm \ii\sqrt7}{4}$，实部为 $-\frac14 < 0$。但
$$X(t) = \e^{t/2}\begin{pmatrix}-\cos t\\ \sin t\end{pmatrix}$$
是 $X' = A(t)X$ 的解（逐分量代入：两边都等于 $\e^{t/2}\big(\sin t - \frac12\cos t,\ \cos t + \frac12\sin t\big)^T$，用 $\cos^2 t + \sin^2 t = 1$），它指数增长。冻结每个时刻的特征值不能描述变系数系统的行为。
:::

::: q
设 $A \in \M_n(\R)$ 反对称（$A^T = -A$）。证明对每个 $t$，$\e^{tA}$ 是正交矩阵，且 $\det\e^{tA} = 1$。
:::

::: ans
转置是有限维空间上的线性映射，连续，且 $(A^k)^T = (A^T)^k$，对部分和取极限得 $(\e^{tA})^T = \e^{tA^T} = \e^{-tA}$。由 {@exp-matrice-proprietes} 第 1 条，$\e^{-tA} = (\e^{tA})^{-1}$，所以 $(\e^{tA})^T\e^{tA} = I$。又 $\tr A = 0$（反对称矩阵的对角元为零），由第 4 条 $\det\e^{tA} = \e^{0} = 1$。所以 $X' = AX$ 的解保持欧氏范数：$\norm{X(t)}_2 = \norm{X(0)}_2$。
:::

::: q
设 $A^2 = A$（投影）。求 $\e^{tA}$。
:::

::: ans
$A^k = A$（$k \ge 1$），所以 $\e^{tA} = I + \sum_{k \ge 1}\frac{t^k}{k!}A = I + (\e^t - 1)A$。这是零化多项式方法（$P(X) = X^2 - X$，$d = 2$）的一个例子。
:::

## 标量线性方程

$n$ 阶标量方程 $y^{(n)} + a_{n-1}y^{(n-1)} + \dots + a_0y = b$ 是方程组的特例：把 $y$ 及其前 $n - 1$ 阶导数排成向量即可。本节把第 1 节的结论翻译到这个情形，并重点讨论二阶方程：Wronski 行列式判别基本解组，常数变易法求特解。

::: def id=c8-def-edl-scalaire zh="$n$ 阶线性方程与 Wronski 行列式" en="Scalar linear equations, Wronskian" fr="Équations scalaires d'ordre $n$, wronskien" ru="Линейные уравнения $n$-го порядка, определитель Вронского"
设 $a_0, \dots, a_{n-1}, b : I \to \K$ 连续。$n$ 阶线性方程
$$y^{(n)} + a_{n-1}(t)y^{(n-1)} + \dots + a_0(t)y = b(t) \tag{$E_n$}$$
的**解**是 $I$ 上 $n$ 次可导且满足 $(E_n)$ 的函数 $y$；$b = 0$ 时记为 $(H_n)$。通过 $X = (y, y', \dots, y^{(n-1)})^T$，$(E_n)$ 化为一阶方程组 $X' = C(t)X + b(t)e_n$，其中 $e_n = (0, \dots, 0, 1)^T$，**伴随矩阵**为
$$C(t) = \begin{pmatrix}0 & 1 & & \\ & \ddots & \ddots & \\ & & 0 & 1\\ -a_0(t) & -a_1(t) & \cdots & -a_{n-1}(t)\end{pmatrix}.$$
对 $(H_n)$ 的 $n$ 个解 $y_1, \dots, y_n$，**Wronski 行列式**为 $W(t) = \det\big(y_j^{(i-1)}(t)\big)_{1 \le i, j \le n}$。对二阶方程 $y'' + a(t)y' + b(t)y = 0$ 的两个解 $y_1, y_2$，
$$W(t) = \begin{vmatrix}y_1 & y_2\\ y_1' & y_2'\end{vmatrix} = y_1y_2' - y_1'y_2.$$
:::

::: fr
Soient $a_0, \dots, a_{n-1}, b : I \to \K$ continues. Une **solution** de l'équation linéaire d'ordre $n$
$$y^{(n)} + a_{n-1}(t)y^{(n-1)} + \dots + a_0(t)y = b(t) \tag{$E_n$}$$
est une fonction $y$, $n$ fois dérivable sur $I$, qui vérifie $(E_n)$ ; si $b = 0$, on note $(H_n)$ l'équation. En posant $X = (y, y', \dots, y^{(n-1)})^T$, $(E_n)$ se ramène au système $X' = C(t)X + b(t)e_n$, où $e_n = (0, \dots, 0, 1)^T$ et où la **matrice compagnon** est
$$C(t) = \begin{pmatrix}0 & 1 & & \\ & \ddots & \ddots & \\ & & 0 & 1\\ -a_0(t) & -a_1(t) & \cdots & -a_{n-1}(t)\end{pmatrix}.$$
Pour $n$ solutions $y_1, \dots, y_n$ de $(H_n)$, le **wronskien** est $W(t) = \det\big(y_j^{(i-1)}(t)\big)_{1 \le i, j \le n}$. Pour deux solutions $y_1, y_2$ de l'équation d'ordre 2 $y'' + a(t)y' + b(t)y = 0$,
$$W(t) = \begin{vmatrix}y_1 & y_2\\ y_1' & y_2'\end{vmatrix} = y_1y_2' - y_1'y_2.$$
:::

::: prop id=c8-ordre-n zh="$n$ 阶方程的 Cauchy–Lipschitz 定理" en="Cauchy–Lipschitz for scalar equations of order $n$" fr="Cauchy–Lipschitz pour les équations scalaires d'ordre $n$" ru="Теорема существования и единственности для уравнения $n$-го порядка" lvl=1
1. $y$ 是 $(E_n)$ 的解，当且仅当 $X = (y, y', \dots, y^{(n-1)})^T$ 是 $X' = C(t)X + b(t)e_n$ 的解。
2. 对任意 $t_0 \in I$ 和 $(c_0, \dots, c_{n-1}) \in \K^n$，存在唯一的解 $y$ 满足 $y^{(k)}(t_0) = c_k$（$0 \le k \le n - 1$），它定义在整个 $I$ 上。
3. $(H_n)$ 的解集是 $n$ 维向量空间，$y \mapsto \big(y(t_0), \dots, y^{(n-1)}(t_0)\big)$ 是它到 $\K^n$ 的同构。
:::

::: fr
1. $y$ est solution de $(E_n)$ si et seulement si $X = (y, y', \dots, y^{(n-1)})^T$ est solution de $X' = C(t)X + b(t)e_n$.
2. Pour tous $t_0 \in I$ et $(c_0, \dots, c_{n-1}) \in \K^n$, il existe une unique solution $y$ vérifiant $y^{(k)}(t_0) = c_k$ ($0 \le k \le n - 1$), et elle est définie sur tout $I$.
3. L'ensemble des solutions de $(H_n)$ est un espace vectoriel de dimension $n$, et $y \mapsto \big(y(t_0), \dots, y^{(n-1)}(t_0)\big)$ en est un isomorphisme sur $\K^n$.
:::

::: proof
▷ 思路：1 是逐个分量的验证；2、3 由 1 把 {@cauchy-lipschitz-lineaire} 与 {@structure-solutions} 搬过来。

**1. (⇒)**　$y$ 是 $n$ 次可导的，所以 $X$ 的每个分量 $y^{(k)}$（$k \le n - 1$）可导，$X' = (y', \dots, y^{(n-1)}, y^{(n)})^T$。前 $n - 1$ 个分量就是 $X$ 的后 $n - 1$ 个分量；最后一个分量 $y^{(n)} = b - \sum_k a_ky^{(k)}$。这正是 $X' = CX + be_n$。

**1. (⇐)**　设 $X = (x_1, \dots, x_n)^T$ 是方程组的解。前 $n - 1$ 行给出 $x_{k+1} = x_k'$（$1 \le k \le n - 1$），所以由归纳 $x_1$ 是 $n - 1$ 次可导的，$x_k = x_1^{(k-1)}$；最后一行给出 $x_n' = b - \sum_k a_kx_{k+1}$，所以 $y = x_1$ 是 $n$ 次可导的且满足 $(E_n)$，并且 $X = (y, \dots, y^{(n-1)})^T$。

**2.**　条件 $y^{(k)}(t_0) = c_k$ 就是 $X(t_0) = (c_0, \dots, c_{n-1})^T$。$C$ 与 $be_n$ 在 $I$ 上连续，由 {@cauchy-lipschitz-lineaire}，方程组的这个初值问题在 $I$ 上有唯一解；由 1，它对应 $(E_n)$ 的唯一解。

**3.**　由 1，$y \mapsto X$ 是 $(H_n)$ 的解集到 $X' = CX$ 的解集 $\mathcal{S}_H$ 的线性双射（逆映射是取第一个分量）。再复合 {@structure-solutions} 中的同构 $X \mapsto X(t_0)$。
:::

::: fr
▷ Méthode : 1 se vérifie composante par composante ; 2 et 3 se déduisent de {@fr:cauchy-lipschitz-lineaire} et {@fr:structure-solutions} grâce à 1.

**1. (⇒)**　Comme $y$ est $n$ fois dérivable, chaque composante $y^{(k)}$ ($k \le n - 1$) de $X$ est dérivable et $X' = (y', \dots, y^{(n-1)}, y^{(n)})^T$. Les $n - 1$ premières composantes sont les $n - 1$ dernières composantes de $X$ ; la dernière vaut $y^{(n)} = b - \sum_k a_ky^{(k)}$. C'est exactement $X' = CX + be_n$.

**1. (⇐)**　Soit $X = (x_1, \dots, x_n)^T$ une solution du système. Les $n - 1$ premières lignes donnent $x_{k+1} = x_k'$ ($1 \le k \le n - 1$), donc par récurrence $x_1$ est $n - 1$ fois dérivable et $x_k = x_1^{(k-1)}$ ; la dernière ligne donne $x_n' = b - \sum_k a_kx_{k+1}$, donc $y = x_1$ est $n$ fois dérivable, vérifie $(E_n)$, et $X = (y, \dots, y^{(n-1)})^T$.

**2.**　La condition $y^{(k)}(t_0) = c_k$ s'écrit $X(t_0) = (c_0, \dots, c_{n-1})^T$. Les fonctions $C$ et $be_n$ sont continues sur $I$ ; d'après {@fr:cauchy-lipschitz-lineaire}, ce problème de Cauchy pour le système a une unique solution sur $I$, qui correspond d'après 1 à une unique solution de $(E_n)$.

**3.**　D'après 1, $y \mapsto X$ est une bijection linéaire de l'ensemble des solutions de $(H_n)$ sur l'ensemble $\mathcal{S}_H$ des solutions de $X' = CX$ (la bijection réciproque est la première composante). On compose avec l'isomorphisme $X \mapsto X(t_0)$ de {@fr:structure-solutions}.
:::

::: thm id=liouville-formule zh="Liouville 公式" en="Abel–Liouville identity" fr="Formule de Liouville" ru="Формула Лиувилля — Остроградского" lvl=1
对方程组 $X' = A(t)X$，若 $\Phi(t)$ 是由 $n$ 个解作为列构成的矩阵，则 $W(t) = \det\Phi(t)$ 满足 $W' = \tr(A)\,W$，即
$$W(t) = W(t_0)\exp\Big(\int_{t_0}^t\tr A(s)\,\dd s\Big).$$
对二阶方程 $y'' + a(t)y' + b(t)y = 0$：$W' = -a(t)W$。因此 $W$ 要么恒为零，要么处处不为零。
:::

::: fr
Pour le système $X' = A(t)X$, si $\Phi(t)$ est la matrice dont les colonnes sont $n$ solutions, alors $W(t) = \det\Phi(t)$ vérifie $W' = \tr(A)\,W$, c'est-à-dire
$$W(t) = W(t_0)\exp\Big(\int_{t_0}^t\tr A(s)\,\dd s\Big).$$
Pour l'équation d'ordre 2 $y'' + a(t)y' + b(t)y = 0$ : $W' = -a(t)W$. Par conséquent, $W$ est soit identiquement nul, soit partout non nul.
:::

::: proof
▷ 思路：行列式关于列是多重线性的，所以 $W'$ 是「每次把一列换成它的导数」所得的 $n$ 个行列式之和；把 $X_j' = AX_j$ 代入，再用一个代数事实——$\sum_j\det(v_1, \dots, Av_j, \dots, v_n) = \tr(A)\det(v_1, \dots, v_n)$。最后解一阶标量方程。

记 $X_1, \dots, X_n$ 为 $\Phi$ 的列，$X_j = (x_{1j}, \dots, x_{nj})^T$。

**第 1 步（行列式的导数）**　$W = \sum_{\sigma}\varepsilon(\sigma)\prod_{j=1}^n x_{\sigma(j)j}$（对 $\{1, \dots, n\}$ 的置换求和）。对每个乘积用乘积的求导法则，再按「哪一个因子被求导」重新分组：
$$W' = \sum_{j=1}^n\sum_\sigma\varepsilon(\sigma)\,x_{\sigma(j)j}'\prod_{l \ne j}x_{\sigma(l)l} = \sum_{j=1}^n\det(X_1, \dots, X_j', \dots, X_n).$$

**第 2 步（代入方程）**　$X_j' = AX_j$，所以 $W'(t) = \sum_j\det\big(X_1, \dots, A(t)X_j, \dots, X_n\big)$。

**第 3 步（代数引理）**　固定矩阵 $A$，令 $\varphi(v_1, \dots, v_n) = \sum_j\det(v_1, \dots, Av_j, \dots, v_n)$。

- $\varphi$ 是 $n$ 重线性的：每一项关于每个 $v_l$ 线性（$\det$ 多重线性，$A$ 线性）。
- $\varphi$ 是交错的：设 $v_p = v_q$（$p < q$）。$j \notin \{p, q\}$ 的项有两列相等，为零；$j = p$ 与 $j = q$ 的两项，交换第 $p$、$q$ 列可以互相得到，行列式变号，相加为零。

$\K^n$ 上的交错 $n$ 重线性形式构成一维空间，由 $\det$ 张成，所以 $\varphi = c\det$。在标准基上计算：$Ae_j = \sum_i a_{ij}e_i$，$\det(e_1, \dots, Ae_j, \dots, e_n) = a_{jj}$（只有 $i = j$ 的项不出现重复列），所以 $c = \sum_j a_{jj} = \tr A$。

**第 4 步（解标量方程）**　由第 2、3 步，$W' = \tr(A(t))\,W$。这是一阶标量线性方程，由 {@c8-ex-ordre1}（$b = 0$），$W(t) = W(t_0)\exp\big(\int_{t_0}^t\tr A\big)$。指数不为零，所以 $W(t_0) = 0$ 时 $W \equiv 0$，否则 $W$ 处处不为零。

**第 5 步（二阶方程）**　二阶方程的伴随矩阵是 $C(t) = \begin{pmatrix}0 & 1\\ -b(t) & -a(t)\end{pmatrix}$，$\tr C = -a$，而 $W = y_1y_2' - y_1'y_2$ 正是 $\det(X_1, X_2)$。所以 $W' = -aW$。也可以直接计算：
$$W' = y_1y_2'' - y_1''y_2 = y_1(-ay_2' - by_2) - (-ay_1' - by_1)y_2 = -a(y_1y_2' - y_1'y_2) = -aW.$$
:::

::: fr
▷ Méthode : le déterminant est multilinéaire en les colonnes, donc $W'$ est la somme des $n$ déterminants obtenus en dérivant une colonne à la fois ; on remplace $X_j'$ par $AX_j$ et on utilise un fait algébrique : $\sum_j\det(v_1, \dots, Av_j, \dots, v_n) = \tr(A)\det(v_1, \dots, v_n)$. On résout enfin une équation scalaire du premier ordre.

Notons $X_1, \dots, X_n$ les colonnes de $\Phi$, $X_j = (x_{1j}, \dots, x_{nj})^T$.

**Étape 1 (dérivée d'un déterminant)**　On a $W = \sum_{\sigma}\varepsilon(\sigma)\prod_{j=1}^n x_{\sigma(j)j}$ (somme sur les permutations de $\{1, \dots, n\}$). En dérivant chaque produit et en regroupant selon le facteur dérivé :
$$W' = \sum_{j=1}^n\sum_\sigma\varepsilon(\sigma)\,x_{\sigma(j)j}'\prod_{l \ne j}x_{\sigma(l)l} = \sum_{j=1}^n\det(X_1, \dots, X_j', \dots, X_n).$$

**Étape 2 (on utilise l'équation)**　Comme $X_j' = AX_j$, $W'(t) = \sum_j\det\big(X_1, \dots, A(t)X_j, \dots, X_n\big)$.

**Étape 3 (lemme algébrique)**　Soit $A$ fixée ; posons $\varphi(v_1, \dots, v_n) = \sum_j\det(v_1, \dots, Av_j, \dots, v_n)$.

- $\varphi$ est $n$-linéaire : chaque terme est linéaire en chaque $v_l$ ($\det$ est multilinéaire et $A$ linéaire).
- $\varphi$ est alternée : supposons $v_p = v_q$ ($p < q$). Les termes avec $j \notin \{p, q\}$ ont deux colonnes égales, donc sont nuls ; les termes $j = p$ et $j = q$ s'échangent en permutant les colonnes $p$ et $q$, donc sont opposés et leur somme est nulle.

L'espace des formes $n$-linéaires alternées sur $\K^n$ est de dimension 1, engendré par $\det$ ; donc $\varphi = c\det$. Calcul sur la base canonique : $Ae_j = \sum_i a_{ij}e_i$ et $\det(e_1, \dots, Ae_j, \dots, e_n) = a_{jj}$ (seul le terme $i = j$ ne crée pas de colonne répétée), donc $c = \sum_j a_{jj} = \tr A$.

**Étape 4 (résolution de l'équation scalaire)**　D'après les étapes 2 et 3, $W' = \tr(A(t))\,W$. C'est une équation scalaire linéaire du premier ordre ; d'après {@fr:c8-ex-ordre1} (avec $b = 0$), $W(t) = W(t_0)\exp\big(\int_{t_0}^t\tr A\big)$. L'exponentielle ne s'annule pas : si $W(t_0) = 0$, $W \equiv 0$ ; sinon $W$ ne s'annule jamais.

**Étape 5 (équation d'ordre 2)**　La matrice compagnon est $C(t) = \begin{pmatrix}0 & 1\\ -b(t) & -a(t)\end{pmatrix}$, de trace $-a$, et $W = y_1y_2' - y_1'y_2$ est exactement $\det(X_1, X_2)$. Donc $W' = -aW$. On peut aussi le vérifier directement :
$$W' = y_1y_2'' - y_1''y_2 = y_1(-ay_2' - by_2) - (-ay_1' - by_1)y_2 = -a(y_1y_2' - y_1'y_2) = -aW.$$
:::

::: cor id=c8-wronskien-base zh="Wronski 行列式判别基本解组" en="Wronskian criterion" fr="Critère du wronskien" ru="Критерий Вронского" lvl=1
设 $y_1, \dots, y_n$ 是 $(H_n)$ 的解。以下三条等价：(i) 它们构成解空间的基；(ii) 存在 $t_0 \in I$ 使 $W(t_0) \ne 0$；(iii) 对一切 $t \in I$，$W(t) \ne 0$。
:::

::: fr
Soient $y_1, \dots, y_n$ des solutions de $(H_n)$. Les assertions suivantes sont équivalentes : (i) elles forment une base de l'espace des solutions ; (ii) il existe $t_0 \in I$ tel que $W(t_0) \ne 0$ ; (iii) pour tout $t \in I$, $W(t) \ne 0$.
:::

::: proof
▷ 思路：把标量解换成伴随方程组的解，用 {@c8-base-solutions}；(ii)⇔(iii) 是 Liouville 公式。

令 $X_j = (y_j, \dots, y_j^{(n-1)})^T$，则 $W = \det(X_1, \dots, X_n)$。

**(i)⇔(ii)**　由 {@c8-ordre-n} 第 3 条的证明，$y \mapsto X$ 是同构，所以 $(y_j)$ 是基 $\iff$ $(X_j)$ 是 $\mathcal{S}_H$ 的基 $\iff$（{@c8-base-solutions}，任取 $t_0$）$(X_j(t_0))$ 是 $\K^n$ 的基 $\iff$ $W(t_0) \ne 0$。

**(ii)⇔(iii)**　(iii)⇒(ii) 不需证明；(ii)⇒(iii) 由 {@liouville-formule}：$W$ 不恒为零，就处处不为零。
:::

::: fr
▷ Méthode : on remplace les solutions scalaires par les solutions du système compagnon et on applique {@fr:c8-base-solutions} ; (ii)⇔(iii) est la formule de Liouville.

Posons $X_j = (y_j, \dots, y_j^{(n-1)})^T$, de sorte que $W = \det(X_1, \dots, X_n)$.

**(i)⇔(ii)**　D'après la preuve du point 3 de {@fr:c8-ordre-n}, $y \mapsto X$ est un isomorphisme ; donc $(y_j)$ est une base $\iff$ $(X_j)$ est une base de $\mathcal{S}_H$ $\iff$ ({@fr:c8-base-solutions}, pour n'importe quel $t_0$) $(X_j(t_0))$ est une base de $\K^n$ $\iff$ $W(t_0) \ne 0$.

**(ii)⇔(iii)**　(iii)⇒(ii) est immédiat ; (ii)⇒(iii) découle de {@fr:liouville-formule} : $W$ n'étant pas identiquement nul, il ne s'annule jamais.
:::

::: cex id=c8-cex-wronskien zh="不是同一方程的解时，$W \equiv 0$ 不推出线性相关" lvl=1
$y_1(t) = t^3$，$y_2(t) = \abs{t}^3$ 在 $\R$ 上是 $\Cc^2$ 的（$y_2' = 3t\abs t$，$y_2'' = 6\abs t$）。
$$W(t) = t^3\cdot 3t\abs{t} - 3t^2\cdot\abs{t}^3 = 3t^4\abs t - 3t^4\abs t = 0\qquad(\abs{t}^3 = t^2\abs t).$$
但它们线性无关：若 $\lambda t^3 + \mu\abs{t}^3 \equiv 0$，取 $t = 1$ 得 $\lambda + \mu = 0$，取 $t = -1$ 得 $-\lambda + \mu = 0$，所以 $\lambda = \mu = 0$。由 {@c8-wronskien-base}，$t^3$ 与 $\abs t^3$ 不可能同时是某个 $y'' + a(t)y' + b(t)y = 0$（$a, b$ 在 $\R$ 上连续）的解。「都是同一个线性方程的解」这个条件不能省略。
:::

::: prop id=c8-equation-caracteristique zh="常系数二阶方程：特征方程" en="Constant-coefficient second-order equations" fr="Équation caractéristique (ordre 2, coefficients constants)" ru="Характеристическое уравнение (второй порядок, постоянные коэффициенты)" lvl=1
设 $p, q \in \K$，$\chi(r) = r^2 + pr + q$。方程 $y'' + py' + qy = 0$ 的解空间的一组基为：

1. $\chi$ 有两个不同的根 $r_1 \ne r_2$（在 $\C$ 中；$\K = \R$ 时要求它们是实数）：$\e^{r_1t}$，$\e^{r_2t}$；
2. $\chi$ 有二重根 $r$：$\e^{rt}$，$t\,\e^{rt}$；
3. $\K = \R$，$\chi$ 的根为 $\alpha \pm \ii\beta$（$\beta \ne 0$）：$\e^{\alpha t}\cos\beta t$，$\e^{\alpha t}\sin\beta t$。
:::

::: fr
Soient $p, q \in \K$ et $\chi(r) = r^2 + pr + q$. Une base de l'espace des solutions de $y'' + py' + qy = 0$ est :

1. si $\chi$ a deux racines distinctes $r_1 \ne r_2$ (dans $\C$ ; réelles si $\K = \R$) : $\e^{r_1t}$, $\e^{r_2t}$ ;
2. si $\chi$ a une racine double $r$ : $\e^{rt}$, $t\,\e^{rt}$ ;
3. si $\K = \R$ et les racines de $\chi$ sont $\alpha \pm \ii\beta$ ($\beta \ne 0$) : $\e^{\alpha t}\cos\beta t$, $\e^{\alpha t}\sin\beta t$.
:::

::: proof
▷ 思路：逐个验证是解，再算 $W(0) \ne 0$；解空间是二维的（{@c8-ordre-n}），由 {@c8-wronskien-base}，两个解构成基。

**1.**　$(\e^{rt})'' + p(\e^{rt})' + q\e^{rt} = \chi(r)\e^{rt}$，所以 $\chi(r_i) = 0$ 时 $\e^{r_it}$ 是解。$W(0) = \begin{vmatrix}1 & 1\\ r_1 & r_2\end{vmatrix} = r_2 - r_1 \ne 0$。

**2.**　二重根满足 $\chi(r) = 0$ 与 $\chi'(r) = 2r + p = 0$。令 $y = t\e^{rt}$，则 $y' = (1 + rt)\e^{rt}$，$y'' = (2r + r^2t)\e^{rt}$，
$$y'' + py' + qy = \big(t(r^2 + pr + q) + (2r + p)\big)\e^{rt} = \big(t\chi(r) + \chi'(r)\big)\e^{rt} = 0.$$
$W(0) = \begin{vmatrix}1 & 0\\ r & 1\end{vmatrix} = 1 \ne 0$。

**3.**　由 1（在 $\C$ 上），$z = \e^{(\alpha + \ii\beta)t}$ 是解。$p, q$ 是实数，对 $z'' + pz' + qz = 0$ 取实部与虚部，$\operatorname{Re}z = \e^{\alpha t}\cos\beta t$ 与 $\operatorname{Im}z = \e^{\alpha t}\sin\beta t$ 都是实解。$W(0) = \begin{vmatrix}1 & 0\\ \alpha & \beta\end{vmatrix} = \beta \ne 0$。

三种情形中，所给的两个解都满足 $W(0) \ne 0$，由 {@c8-wronskien-base} 构成基。
:::

::: fr
▷ Méthode : on vérifie que ce sont des solutions, puis que $W(0) \ne 0$ ; l'espace des solutions est de dimension 2 ({@fr:c8-ordre-n}) et {@fr:c8-wronskien-base} conclut.

**1.**　$(\e^{rt})'' + p(\e^{rt})' + q\e^{rt} = \chi(r)\e^{rt}$, donc $\e^{r_it}$ est solution lorsque $\chi(r_i) = 0$. $W(0) = \begin{vmatrix}1 & 1\\ r_1 & r_2\end{vmatrix} = r_2 - r_1 \ne 0$.

**2.**　Une racine double vérifie $\chi(r) = 0$ et $\chi'(r) = 2r + p = 0$. Pour $y = t\e^{rt}$, on a $y' = (1 + rt)\e^{rt}$, $y'' = (2r + r^2t)\e^{rt}$ et
$$y'' + py' + qy = \big(t(r^2 + pr + q) + (2r + p)\big)\e^{rt} = \big(t\chi(r) + \chi'(r)\big)\e^{rt} = 0.$$
$W(0) = \begin{vmatrix}1 & 0\\ r & 1\end{vmatrix} = 1 \ne 0$.

**3.**　D'après 1 (dans $\C$), $z = \e^{(\alpha + \ii\beta)t}$ est solution. Comme $p, q$ sont réels, en prenant parties réelle et imaginaire dans $z'' + pz' + qz = 0$, on obtient que $\operatorname{Re}z = \e^{\alpha t}\cos\beta t$ et $\operatorname{Im}z = \e^{\alpha t}\sin\beta t$ sont des solutions réelles. $W(0) = \begin{vmatrix}1 & 0\\ \alpha & \beta\end{vmatrix} = \beta \ne 0$.

Dans les trois cas, les deux solutions proposées vérifient $W(0) \ne 0$ et forment donc une base d'après {@fr:c8-wronskien-base}.
:::

::: thm id=variation-constantes zh="常数变易法" en="Variation of parameters" fr="Méthode de variation des constantes" ru="Метод вариации постоянных" lvl=1
设 $y_1, y_2$ 是 $y'' + a(t)y' + b(t)y = 0$ 的基本解组，$c : I \to \K$ 连续。则 $y = \lambda_1 y_1 + \lambda_2 y_2$ 是 $y'' + ay' + by = c(t)$ 的解，只要 $\lambda_1, \lambda_2$ 满足
$$\begin{cases}\lambda_1'y_1 + \lambda_2'y_2 = 0\\ \lambda_1'y_1' + \lambda_2'y_2' = c\end{cases}\qquad\text{即}\quad \lambda_1' = -\frac{c\,y_2}{W},\ \lambda_2' = \frac{c\,y_1}{W}.$$
这样的 $\lambda_1, \lambda_2$ 存在（取右边的原函数）。
:::

::: fr
Soient $y_1, y_2$ un système fondamental de solutions de $y'' + a(t)y' + b(t)y = 0$ et $c : I \to \K$ continue. Alors $y = \lambda_1 y_1 + \lambda_2 y_2$ est solution de $y'' + ay' + by = c(t)$ dès que $\lambda_1, \lambda_2$ vérifient
$$\begin{cases}\lambda_1'y_1 + \lambda_2'y_2 = 0\\ \lambda_1'y_1' + \lambda_2'y_2' = c\end{cases}\qquad\text{c'est-à-dire}\quad \lambda_1' = -\frac{c\,y_2}{W},\ \lambda_2' = \frac{c\,y_1}{W}.$$
De tels $\lambda_1, \lambda_2$ existent (primitives des seconds membres).
:::

::: proof
▷ 思路：让齐次解的「常数」随 $t$ 变化。第一个条件是我们**自己加**的，目的是让 $y'$ 中不出现 $\lambda_i'$；代入方程后，齐次部分消去，剩下的正是第二个条件。

**第 1 步（$W$ 处处不为零）**　$y_1, y_2$ 是基本解组，由 {@c8-wronskien-base}，对一切 $t$，$W(t) \ne 0$。

**第 2 步（解出 $\lambda_i'$）**　关于未知数 $(\lambda_1', \lambda_2')$ 的线性方程组的行列式就是 $W(t) \ne 0$，由 Cramer 法则，它有唯一解
$$\lambda_1' = \frac{\begin{vmatrix}0 & y_2\\ c & y_2'\end{vmatrix}}{W} = -\frac{c\,y_2}{W},\qquad \lambda_2' = \frac{\begin{vmatrix}y_1 & 0\\ y_1' & c\end{vmatrix}}{W} = \frac{c\,y_1}{W}.$$
右边在 $I$ 上连续，取 $\lambda_1, \lambda_2$ 为它们的原函数，$\lambda_i$ 是 $\Cc^1$ 的。

**第 3 步（$y'$）**　$y = \lambda_1y_1 + \lambda_2y_2$ 可导，由第一个条件，
$$y' = \lambda_1y_1' + \lambda_2y_2' + \underbrace{(\lambda_1'y_1 + \lambda_2'y_2)}_{= 0} = \lambda_1y_1' + \lambda_2y_2'.$$

**第 4 步（$y''$）**　$\lambda_i$ 与 $y_i'$ 可导，所以 $y'$ 可导，由第二个条件，
$$y'' = \lambda_1y_1'' + \lambda_2y_2'' + \underbrace{(\lambda_1'y_1' + \lambda_2'y_2')}_{= c} = \lambda_1y_1'' + \lambda_2y_2'' + c.$$

**第 5 步（代入）**
$$y'' + ay' + by = \lambda_1\underbrace{(y_1'' + ay_1' + by_1)}_{= 0} + \lambda_2\underbrace{(y_2'' + ay_2' + by_2)}_{= 0} + c = c.$$

这就证明了 $y$ 是解。由 {@structure-solutions}，一切解为 $y + \mu_1y_1 + \mu_2y_2$（相当于原函数中的积分常数）。这与 Duhamel 公式 {@solution-coef-constants} 是同一个想法（让齐次解的「常数」随 $t$ 变化），只是推广到了变系数方程。
:::

::: fr
▷ Méthode : on fait varier les « constantes » de la solution homogène. La première condition est **imposée par nous**, pour que $\lambda_i'$ n'apparaisse pas dans $y'$ ; en reportant dans l'équation, la partie homogène disparaît et il reste exactement la seconde condition.

**Étape 1 ($W$ ne s'annule pas)**　$y_1, y_2$ est un système fondamental ; d'après {@fr:c8-wronskien-base}, $W(t) \ne 0$ pour tout $t$.

**Étape 2 (calcul des $\lambda_i'$)**　Le déterminant du système linéaire d'inconnues $(\lambda_1', \lambda_2')$ est $W(t) \ne 0$ ; par les formules de Cramer, il admet une unique solution
$$\lambda_1' = \frac{\begin{vmatrix}0 & y_2\\ c & y_2'\end{vmatrix}}{W} = -\frac{c\,y_2}{W},\qquad \lambda_2' = \frac{\begin{vmatrix}y_1 & 0\\ y_1' & c\end{vmatrix}}{W} = \frac{c\,y_1}{W}.$$
Les seconds membres sont continus sur $I$ ; on prend pour $\lambda_1, \lambda_2$ des primitives, qui sont $\Cc^1$.

**Étape 3 ($y'$)**　La fonction $y = \lambda_1y_1 + \lambda_2y_2$ est dérivable et, d'après la première condition,
$$y' = \lambda_1y_1' + \lambda_2y_2' + \underbrace{(\lambda_1'y_1 + \lambda_2'y_2)}_{= 0} = \lambda_1y_1' + \lambda_2y_2'.$$

**Étape 4 ($y''$)**　Les $\lambda_i$ et les $y_i'$ sont dérivables, donc $y'$ aussi et, d'après la seconde condition,
$$y'' = \lambda_1y_1'' + \lambda_2y_2'' + \underbrace{(\lambda_1'y_1' + \lambda_2'y_2')}_{= c} = \lambda_1y_1'' + \lambda_2y_2'' + c.$$

**Étape 5 (report dans l'équation)**
$$y'' + ay' + by = \lambda_1\underbrace{(y_1'' + ay_1' + by_1)}_{= 0} + \lambda_2\underbrace{(y_2'' + ay_2' + by_2)}_{= 0} + c = c.$$

Ceci montre que $y$ est solution. D'après {@fr:structure-solutions}, toutes les solutions sont les $y + \mu_1y_1 + \mu_2y_2$ (ce qui revient aux constantes d'intégration des primitives). C'est la même idée que la formule de Duhamel {@fr:solution-coef-constants} (faire varier les « constantes » de la solution homogène), étendue aux coefficients variables.
:::

::: ex id=c8-ex-resonance zh="共振" lvl=1
$y'' + \omega^2y = \cos(\Omega t)$，$\omega, \Omega > 0$。齐次方程的基本解组为 $y_1 = \cos\omega t$，$y_2 = \sin\omega t$（{@c8-equation-caracteristique}，根 $\pm\ii\omega$），$W = \omega$。

- **$\Omega \ne \omega$。** 试 $y = A\cos\Omega t$：$y'' + \omega^2y = A(\omega^2 - \Omega^2)\cos\Omega t$，取 $A = \frac{1}{\omega^2 - \Omega^2}$。特解 $\frac{\cos\Omega t}{\omega^2 - \Omega^2}$ 有界，所以一切解有界。
- **$\Omega = \omega$。** 上面的分母为零。用常数变易法：$\lambda_1' = -\frac{\cos\omega t\sin\omega t}{\omega}$，$\lambda_2' = \frac{\cos^2\omega t}{\omega}$。取原函数 $\lambda_1 = \frac{\cos^2\omega t}{2\omega^2}$，$\lambda_2 = \frac{t}{2\omega} + \frac{\sin 2\omega t}{4\omega^2}$。于是
  $$y = \lambda_1\cos\omega t + \lambda_2\sin\omega t = \frac{\cos^3\omega t}{2\omega^2} + \frac{t\sin\omega t}{2\omega} + \frac{\sin^2\omega t\cos\omega t}{2\omega^2} = \frac{t\sin\omega t}{2\omega} + \frac{\cos\omega t}{2\omega^2}$$
  （用了 $\sin 2\omega t\sin\omega t = 2\sin^2\omega t\cos\omega t$ 与 $\cos^2 + \sin^2 = 1$）。去掉齐次部分 $\frac{\cos\omega t}{2\omega^2}$，特解为 $\frac{t\sin\omega t}{2\omega}$。由 {@structure-solutions}，**每个**解都等于它加上一个有界的齐次解，所以每个解的振幅都线性增长：这就是**共振**。
:::

::: rem zh="幂级数解"
系数为多项式（或解析函数）时，可以寻找幂级数形式的解，见第 4 章的 Airy 方程 {@airy}。由 {@c8-ordre-n}，幂级数方法找到的解（在其收敛区间上）就是唯一解。正则奇点的情形（例如 Bessel 方程 $t^2y'' + ty' + (t^2 - \nu^2)y = 0$）需要 Frobenius 方法，寻找 $t^r\sum a_kt^k$ 形式的解；注意 Bessel 方程在 $t = 0$ 处首项系数为零，不是 $(E_n)$ 的形式（对比 {@c8-cex-singulier}）。
:::

::: q
（降阶法）设 $y_1$ 是 $y'' + a(t)y' + b(t)y = 0$ 在 $I$ 上的一个不取零值的解。用 Liouville 公式求第二个解，并对 $t^2y'' - ty' + y = 0$（$t > 0$，$y_1 = t$）计算。
:::

::: ans
若 $y_2$ 是另一个解，则 $W = y_1y_2' - y_1'y_2 = y_1^2\big(\frac{y_2}{y_1}\big)'$。由 {@liouville-formule}，$W = C\e^{-\int a}$，所以 $\big(\frac{y_2}{y_1}\big)' = \frac{C\e^{-\int a}}{y_1^2}$，取 $C = 1$：
$$y_2 = y_1\int\frac{\e^{-\int a}}{y_1^2}.$$
反过来可以直接验证它是解，且 $W = \e^{-\int a} \ne 0$。例子中方程化为 $y'' - \frac1ty' + \frac{1}{t^2}y = 0$，$a = -\frac1t$，$\e^{-\int a} = t$，$y_2 = t\int\frac{t}{t^2}\,\dd t = t\ln t$。验证：$y_2' = \ln t + 1$，$y_2'' = \frac1t$，$t^2\cdot\frac1t - t(\ln t + 1) + t\ln t = 0$。
:::

::: q
求 $y'' + y = \tan t$ 在 $]-\frac\pi2, \frac\pi2[$ 上的一个特解。
:::

::: ans
$y_1 = \cos t$，$y_2 = \sin t$，$W = 1$。$\lambda_1' = -\tan t\sin t = -\frac{\sin^2 t}{\cos t} = \cos t - \frac{1}{\cos t}$，$\lambda_2' = \tan t\cos t = \sin t$。取 $\lambda_1 = \sin t - \ln\frac{1 + \sin t}{\cos t}$（$\big(\ln\frac{1 + \sin t}{\cos t}\big)' = \frac{1}{\cos t}$），$\lambda_2 = -\cos t$。于是
$$y_p = \lambda_1\cos t + \lambda_2\sin t = -\cos t\,\ln\frac{1 + \sin t}{\cos t}.$$
:::

## 非线性方程

对一般的方程 $x' = f(t, x)$，没有解的公式，也没有「解定义在整个区间上」的保证。我们问三个问题：解是否存在？是否唯一？能延伸多远？答案分别是 Peano 定理（只要 $f$ 连续）、Cauchy–Lipschitz 定理（要求 $f$ 关于 $x$ 局部 Lipschitz）、逃离紧集定理。全节 $U \subset \R \times \R^n$ 是开集，$f : U \to \R^n$ 连续。

::: def id=def-lipschitz-local zh="局部 Lipschitz 条件" en="Locally Lipschitz in the state variable" fr="Fonction localement lipschitzienne par rapport à la seconde variable" ru="Локальное условие Липшица по второй переменной"
设 $U \subset \R \times \R^n$ 是开集，$f : U \to \R^n$ 连续。若每一点都有一个邻域 $V$ 和常数 $k$，使 $\norm{f(t, x) - f(t, y)} \le k\norm{x - y}$ 对 $(t,x), (t,y) \in V$ 成立，称 $f$ 关于第二个变量**局部 Lipschitz**。若 $f$ 是 $\Cc^1$ 的，由中值不等式（第 9 章），这个条件成立（{@c8-c1-lipschitz}）。
:::

::: fr
Soient $U \subset \R \times \R^n$ un ouvert et $f : U \to \R^n$ continue. On dit que $f$ est **localement lipschitzienne** par rapport à la seconde variable si tout point admet un voisinage $V$ et une constante $k$ tels que $\norm{f(t, x) - f(t, y)} \le k\norm{x - y}$ pour tous $(t,x), (t,y) \in V$. Si $f$ est de classe $\Cc^1$, cette condition est vérifiée d'après l'inégalité des accroissements finis (chapitre 9), voir {@fr:c8-c1-lipschitz}.
:::

白话：在每个点附近，$f(t, \cdot)$ 的「斜率」有一个与 $t$ 无关的上界。量词的位置很重要：常数 $k$ 可以随点变化（局部），但在一个邻域内对所有 $t$ 共用。

::: ex id=c8-ex-lipschitz zh="局部 Lipschitz：是与不是" lvl=1
1. **是（但不是全局的）。** $n = 1$，$f(t, x) = x^2$。在 $V = \R \times ]x_0 - 1, x_0 + 1[$ 上，$\abs{x^2 - y^2} = \abs{x + y}\,\abs{x - y} \le 2(\abs{x_0} + 1)\abs{x - y}$。但 $\abs{x + y}$ 在 $\R^2$ 上无界，所以没有全局的 Lipschitz 常数。
2. **是（关于 $x$ 全局）。** 线性情形 $f(t, x) = A(t)x + B(t)$，$U = \mathring{I} \times \R^n$：对 $I$ 的闭子区间 $J$ 和 $t \in J$，$\norm{f(t, x) - f(t, y)} = \norm{A(t)(x - y)} \le k_J\norm{x - y}$，$k_J = \sup_J\norm{A}$。
3. **不是。** $f(x) = 3x^{2/3}$（$x^{2/3} = (x^2)^{1/3}$）在 $x = 0$ 附近：$\frac{\abs{f(x) - f(0)}}{\abs{x - 0}} = 3\abs{x}^{-1/3} \to +\infty$（$x \to 0$），所以在 $0$ 的任何邻域上都没有 Lipschitz 常数。在 $x \ne 0$ 处 $f$ 是 $\Cc^1$ 的，局部 Lipschitz。
:::

::: prop id=c8-c1-lipschitz zh="$\Cc^1$ 蕴含局部 Lipschitz" en="$C^1$ implies locally Lipschitz" fr="Une fonction $\mathcal{C}^1$ est localement lipschitzienne" ru="Непрерывно дифференцируемая функция локально липшицева" lvl=1
若 $f : U \to \R^n$ 连续，并且关于 $x$ 的偏微分 $\partial_x f(t, x) \in \Lin(\R^n)$ 存在且在 $U$ 上连续（特别地，若 $f$ 是 $\Cc^1$ 的），则 $f$ 关于 $x$ 局部 Lipschitz。
:::

::: fr
Si $f : U \to \R^n$ est continue et si la différentielle partielle $\partial_x f(t, x) \in \Lin(\R^n)$ existe et est continue sur $U$ (en particulier si $f$ est de classe $\Cc^1$), alors $f$ est localement lipschitzienne par rapport à $x$.
:::

::: proof
▷ 思路：在一个紧的「圆柱」上 $\norm{\partial_x f}$ 有界；圆柱在 $x$ 方向是凸的，在线段上用有限增量不等式。

**第 1 步（选圆柱）**　设 $(t_0, x_0) \in U$。$U$ 是开集，存在 $r > 0$ 使紧集 $C = [t_0 - r, t_0 + r] \times \overline{B}(x_0, r) \subset U$。令 $V = ]t_0 - r, t_0 + r[ \times B(x_0, r)$，它是 $(t_0, x_0)$ 的邻域。

**第 2 步（偏微分有界）**　$(t, x) \mapsto \norm{\partial_x f(t, x)}$ 在紧集 $C$ 上连续，从而有界（{@image-compact}），令 $k = \max_C\norm{\partial_x f}$。

**第 3 步（有限增量）**　设 $(t, x), (t, y) \in V$。球 $B(x_0, r)$ 是凸的，所以线段 $[x, y] \subset B(x_0, r)$。对 $g = f(t, \cdot)$ 在 $B(x_0, r)$ 上用 {@accroissements-finis}：
$$\norm{f(t, x) - f(t, y)} \le \sup_{z \in [x, y]}\norm{\partial_x f(t, z)}\,\norm{x - y} \le k\norm{x - y}.$$
这就是 $(t_0, x_0)$ 处的局部 Lipschitz 条件。
:::

::: fr
▷ Méthode : sur un « cylindre » compact, $\norm{\partial_x f}$ est bornée ; le cylindre est convexe en $x$, et on applique l'inégalité des accroissements finis sur un segment.

**Étape 1 (choix du cylindre)**　Soit $(t_0, x_0) \in U$. Comme $U$ est ouvert, il existe $r > 0$ tel que le compact $C = [t_0 - r, t_0 + r] \times \overline{B}(x_0, r)$ soit inclus dans $U$. Posons $V = ]t_0 - r, t_0 + r[ \times B(x_0, r)$, voisinage de $(t_0, x_0)$.

**Étape 2 (la différentielle partielle est bornée)**　La fonction $(t, x) \mapsto \norm{\partial_x f(t, x)}$ est continue sur le compact $C$, donc bornée ({@fr:image-compact}) ; posons $k = \max_C\norm{\partial_x f}$.

**Étape 3 (accroissements finis)**　Soient $(t, x), (t, y) \in V$. La boule $B(x_0, r)$ est convexe, donc le segment $[x, y]$ est inclus dans $B(x_0, r)$. En appliquant {@fr:accroissements-finis} à $g = f(t, \cdot)$ sur $B(x_0, r)$ :
$$\norm{f(t, x) - f(t, y)} \le \sup_{z \in [x, y]}\norm{\partial_x f(t, z)}\,\norm{x - y} \le k\norm{x - y}.$$
C'est la condition de Lipschitz locale en $(t_0, x_0)$.
:::

::: def id=c8-def-solution-maximale zh="解、延拓与最大解" en="Solutions, extensions, maximal solutions" fr="Solutions, prolongements, solutions maximales" ru="Решения, продолжения, непродолжаемые решения"
方程 $x' = f(t, x)$ 的一个**解**是一对 $(J, x)$：$J$ 是不退化为一点的区间，$x : J \to \R^n$ 可导，且对一切 $t \in J$，$(t, x(t)) \in U$，$x'(t) = f(t, x(t))$。若 $J \subset \tilde J$ 且 $\tilde x|_J = x$，称解 $(\tilde J, \tilde x)$ **延拓**了 $(J, x)$。没有异于自身的延拓的解称为**最大解**。
:::

::: fr
Une **solution** de $x' = f(t, x)$ est un couple $(J, x)$ où $J$ est un intervalle non réduit à un point et $x : J \to \R^n$ est dérivable, avec, pour tout $t \in J$, $(t, x(t)) \in U$ et $x'(t) = f(t, x(t))$. Une solution $(\tilde J, \tilde x)$ **prolonge** $(J, x)$ si $J \subset \tilde J$ et $\tilde x|_J = x$. Une solution qui n'admet pas d'autre prolongement qu'elle-même est dite **maximale**.
:::

::: ex id=c8-ex-solution-maximale zh="最大解：是与不是" lvl=1
方程 $y' = y^2$（$U = \R^2$），初值 $y(0) = 1$。

- $\big(]-1, \frac12[,\ t \mapsto \frac{1}{1 - t}\big)$ 是解（$y' = \frac{1}{(1-t)^2} = y^2$），但**不是**最大解：$\big(]-\infty, 1[,\ \frac{1}{1-t}\big)$ 延拓了它。
- $\big(]-\infty, 1[,\ \frac{1}{1-t}\big)$ 是最大解：任何延拓都要在 $t = 1$ 处有定义且连续，而 $\frac{1}{1-t} \to +\infty$（$t \to 1^{-}$）。详见 {@ex-explosion}。
:::

在证明 Cauchy–Lipschitz 定理之前，先给出估计解的基本工具。

::: lem id=gronwall zh="Grönwall 引理" en="Grönwall's inequality" fr="Lemme de Grönwall" ru="Лемма Гронуолла" lvl=1
设 $\varphi, \psi$ 在 $[t_0, T]$ 上连续非负，$c \ge 0$，且
$$\varphi(t) \le c + \int_{t_0}^t\psi(s)\varphi(s)\,\dd s\qquad (t \in [t_0, T]).$$
则 $\varphi(t) \le c\exp\Big(\int_{t_0}^t\psi\Big)$。特别地，$c = 0$ 时 $\varphi \equiv 0$。
:::

::: fr
Soient $\varphi, \psi$ continues et positives sur $[t_0, T]$, et $c \ge 0$, telles que
$$\varphi(t) \le c + \int_{t_0}^t\psi(s)\varphi(s)\,\dd s\qquad (t \in [t_0, T]).$$
Alors $\varphi(t) \le c\exp\Big(\int_{t_0}^t\psi\Big)$. En particulier, si $c = 0$, $\varphi \equiv 0$.
:::

::: proof
▷ 思路：把右边记为 $R(t)$。$R$ 可导，且 $R' = \psi\varphi \le \psi R$——这是一个「微分不等式」。像 {@c8-ex-ordre1} 那样乘以积分因子 $\e^{-\int\psi}$，得到一个递减函数。

**第 1 步（微分不等式）**　令 $R(t) = c + \int_{t_0}^t\psi\varphi$。$\psi\varphi$ 连续，由微积分基本定理，$R$ 是 $\Cc^1$ 的，$R' = \psi\varphi$。由假设 $\varphi \le R$，又 $\psi \ge 0$，所以 $R' = \psi\varphi \le \psi R$。

**第 2 步（积分因子）**　令 $\Psi(t) = \int_{t_0}^t\psi$。则
$$\big(R\,\e^{-\Psi}\big)' = (R' - \psi R)\,\e^{-\Psi} \le 0,$$
所以 $R\,\e^{-\Psi}$ 在 $[t_0, T]$ 上递减：$R(t)\e^{-\Psi(t)} \le R(t_0)\e^{0} = c$。

**第 3 步（结论）**　$\varphi(t) \le R(t) \le c\,\e^{\Psi(t)}$。$c = 0$ 时 $0 \le \varphi \le 0$。
:::

::: fr
▷ Méthode : notons $R(t)$ le membre de droite. $R$ est dérivable et $R' = \psi\varphi \le \psi R$ : c'est une « inégalité différentielle ». Comme dans {@fr:c8-ex-ordre1}, on multiplie par le facteur intégrant $\e^{-\int\psi}$ pour obtenir une fonction décroissante.

**Étape 1 (inégalité différentielle)**　Posons $R(t) = c + \int_{t_0}^t\psi\varphi$. Comme $\psi\varphi$ est continue, $R$ est $\Cc^1$ et $R' = \psi\varphi$ (théorème fondamental de l'analyse). Par hypothèse $\varphi \le R$ et $\psi \ge 0$, donc $R' = \psi\varphi \le \psi R$.

**Étape 2 (facteur intégrant)**　Posons $\Psi(t) = \int_{t_0}^t\psi$. Alors
$$\big(R\,\e^{-\Psi}\big)' = (R' - \psi R)\,\e^{-\Psi} \le 0,$$
donc $R\,\e^{-\Psi}$ est décroissante sur $[t_0, T]$ : $R(t)\e^{-\Psi(t)} \le R(t_0)\e^{0} = c$.

**Étape 3 (conclusion)**　$\varphi(t) \le R(t) \le c\,\e^{\Psi(t)}$. Si $c = 0$, $0 \le \varphi \le 0$.
:::

::: rem
**$\psi \ge 0$ 不能去掉**（第 1 步从 $\varphi \le R$ 推出 $\psi\varphi \le \psi R$ 时用到）。反例：$\psi \equiv -1$，$c = 1$，$\varphi \equiv \frac12$ 在 $[0, 1]$ 上。假设成立：$\frac12 \le 1 - \frac t2$（$t \le 1$）。结论不成立：$\frac12 \le \e^{-1} \approx 0.368$ 是错的。
:::

::: thm id=cauchy-lipschitz zh="Cauchy–Lipschitz 定理（局部版本）" en="Picard–Lindelöf theorem" fr="Théorème de Cauchy–Lipschitz" ru="Теорема Пикара — Линделёфа" lvl=2
设 $f$ 在开集 $U$ 上连续，且关于 $x$ 局部 Lipschitz。则对每个 $(t_0, x_0) \in U$，初值问题 $x' = f(t, x)$，$x(t_0) = x_0$ 有唯一的**最大解**，其定义区间是开区间；任何其他解都是它的限制。
:::

::: fr
Soit $f$ continue sur l'ouvert $U$ et localement lipschitzienne par rapport à $x$. Pour tout $(t_0, x_0) \in U$, le problème de Cauchy $x' = f(t, x)$, $x(t_0) = x_0$ admet une unique **solution maximale**, définie sur un intervalle ouvert ; toute autre solution en est une restriction.
:::

::: sketch
▷ 思路：(i) 在 $(t_0, x_0)$ 附近的紧圆柱上，积分算子 $\Phi$ 是压缩映射，Banach 不动点定理给出局部解；(ii) 两个解在公共区间上相等（Grönwall）；(iii) 把所有解拼起来就是最大解；(iv) 最大解的区间若包含端点，可以再延拓，矛盾。

**第 1 步（积分方程）**　与 {@c8-equation-integrale} 相同：$(J, x)$ 是初值问题的解，当且仅当 $x$ 连续、图像在 $U$ 中，且 $x(t) = x_0 + \int_{t_0}^t f(s, x(s))\,\dd s$。

**第 2 步（局部存在）**　由 {@def-lipschitz-local}，$(t_0, x_0)$ 有邻域 $V$ 和常数 $k > 0$（必要时把 $k$ 加大）。取 $a, r > 0$ 使紧圆柱 $C = [t_0 - a, t_0 + a] \times \overline{B}(x_0, r) \subset V \cap U$。令 $M = \max_C\norm f$，$\tau = \min(a, \frac rM)$（$M = 0$ 时 $\tau = a$）。在
$$E = \Cc\big([t_0 - \tau, t_0 + \tau], \overline{B}(x_0, r)\big),\qquad \norm{x}_k = \sup_t\e^{-2k\abs{t - t_0}}\norm{x(t)}$$
上考虑 $\Phi(x)(t) = x_0 + \int_{t_0}^t f(s, x(s))\,\dd s$。

- $E$ 完备：$\e^{-2k\tau}\norm{x}_\infty \le \norm{x}_k \le \norm{x}_\infty$，两个范数等价；$E$ 是 Banach 空间 $\Cc([t_0 - \tau, t_0 + \tau], \R^n)$（{@c0-complet}，逐分量）的闭子集。
- $\Phi(E) \subset E$：$\norm{\Phi(x)(t) - x_0} \le \abs{t - t_0}M \le \tau M \le r$——$\tau \le \frac rM$ 正是为此。
- $\Phi$ 是 $\frac12$-压缩的：
  $$\norm{\Phi(x)(t) - \Phi(y)(t)} \le \Big|\int_{t_0}^t k\,\e^{2k\abs{s - t_0}}\,\dd s\Big|\,\norm{x - y}_k = \frac{\e^{2k\abs{t - t_0}} - 1}{2}\norm{x - y}_k \le \frac12\e^{2k\abs{t - t_0}}\norm{x - y}_k,$$
  乘以 $\e^{-2k\abs{t - t_0}}$ 取上确界，$\norm{\Phi(x) - \Phi(y)}_k \le \frac12\norm{x - y}_k$。

由 {@point-fixe}，$\Phi$ 有不动点，由第 1 步它是 $[t_0 - \tau, t_0 + \tau]$ 上的解。

**第 3 步（唯一性：两个解在公共区间上相等）**　设 $(J_1, x_1)$、$(J_2, x_2)$ 是解，$J = J_1 \cap J_2$。反设存在 $t_1 \in J$，$t_1 > t_0$，$x_1(t_1) \ne x_2(t_1)$。令 $T = \sup\{s \in [t_0, t_1] : x_1 = x_2 \text{ 于 } [t_0, s]\}$，则 $T < t_1$，由连续性 $x_1(T) = x_2(T) =: p$。取 $(T, p)$ 处的邻域 $V'$ 与常数 $k'$；由连续性存在 $\eta > 0$，使 $[T, T + \eta] \subset J$ 且 $s \in [T, T + \eta]$ 时 $(s, x_i(s)) \in V'$。于是 $\norm{x_1(s) - x_2(s)} \le \int_T^s k'\norm{x_1 - x_2}$，由 {@gronwall}（$c = 0$），$x_1 = x_2$ 于 $[T, T + \eta]$，与 $T$ 的定义矛盾。$t_1 < t_0$ 的情形：把 $\sup$ 换成 $\inf$、$[T, T + \eta]$ 换成 $[T - \eta, T]$，并对 $s \mapsto x_i(T - s)$ 用 Grönwall（时间反转，见 {@dependance-continue} 的证明第 2 步）。

**第 4 步（最大解）**　令 $J_{\max}$ 为所有解的定义区间之并（都含 $t_0$，所以是区间），对 $t \in J_{\max}$ 令 $x(t) = x_J(t)$，其中 $(J, x_J)$ 是任一定义在 $t$ 处的解；由第 3 步，这与 $J$ 的选取无关。$x$ 在每一点附近与某个解重合，所以 $(J_{\max}, x)$ 是解，而且每个解都是它的限制——它是唯一的最大解。

**第 5 步（区间是开的）**　反设 $J_{\max}$ 包含右端点 $\beta$。对 $(\beta, x(\beta)) \in U$ 用第 2 步，得到 $[\beta - \tau', \beta + \tau']$ 上的解；由第 3 步它与 $x$ 在公共部分相等，拼接后（两边在 $\beta$ 处的单侧导数都等于 $f(\beta, x(\beta))$）得到定义在 $J_{\max} \cup [\beta, \beta + \tau']$ 上的解，与最大性矛盾。左端点同理（把 $\beta$ 换成左端点、$[\beta, \beta + \tau']$ 换成 $[\alpha - \tau', \alpha]$）。
:::

::: fr
▷ Méthode : (i) sur un cylindre compact autour de $(t_0, x_0)$, l'opérateur intégral $\Phi$ est contractant et le théorème du point fixe de Banach fournit une solution locale ; (ii) deux solutions coïncident sur leur intervalle commun (Grönwall) ; (iii) en recollant toutes les solutions on obtient la solution maximale ; (iv) si l'intervalle de la solution maximale contenait une extrémité, on pourrait encore la prolonger, ce qui est absurde.

**Étape 1 (équation intégrale)**　Comme dans le {@fr:c8-equation-integrale}, $(J, x)$ est solution du problème de Cauchy si et seulement si $x$ est continue, à graphe dans $U$, et $x(t) = x_0 + \int_{t_0}^t f(s, x(s))\,\dd s$.

**Étape 2 (existence locale)**　D'après {@fr:def-lipschitz-local}, $(t_0, x_0)$ admet un voisinage $V$ et une constante $k > 0$ (quitte à augmenter $k$). Choisissons $a, r > 0$ tels que le cylindre compact $C = [t_0 - a, t_0 + a] \times \overline{B}(x_0, r)$ soit inclus dans $V \cap U$. Posons $M = \max_C\norm f$ et $\tau = \min(a, \frac rM)$ ($\tau = a$ si $M = 0$). On considère $\Phi(x)(t) = x_0 + \int_{t_0}^t f(s, x(s))\,\dd s$ sur
$$E = \Cc\big([t_0 - \tau, t_0 + \tau], \overline{B}(x_0, r)\big),\qquad \norm{x}_k = \sup_t\e^{-2k\abs{t - t_0}}\norm{x(t)}.$$

- $E$ est complet : $\e^{-2k\tau}\norm{x}_\infty \le \norm{x}_k \le \norm{x}_\infty$, les deux normes sont équivalentes, et $E$ est une partie fermée de l'espace de Banach $\Cc([t_0 - \tau, t_0 + \tau], \R^n)$ ({@fr:c0-complet}, composante par composante).
- $\Phi(E) \subset E$ : $\norm{\Phi(x)(t) - x_0} \le \abs{t - t_0}M \le \tau M \le r$ — c'est la raison du choix $\tau \le \frac rM$.
- $\Phi$ est $\frac12$-contractante :
  $$\norm{\Phi(x)(t) - \Phi(y)(t)} \le \Big|\int_{t_0}^t k\,\e^{2k\abs{s - t_0}}\,\dd s\Big|\,\norm{x - y}_k = \frac{\e^{2k\abs{t - t_0}} - 1}{2}\norm{x - y}_k \le \frac12\e^{2k\abs{t - t_0}}\norm{x - y}_k ;$$
  en multipliant par $\e^{-2k\abs{t - t_0}}$ et en passant au sup, $\norm{\Phi(x) - \Phi(y)}_k \le \frac12\norm{x - y}_k$.

D'après {@fr:point-fixe}, $\Phi$ admet un point fixe, qui est une solution sur $[t_0 - \tau, t_0 + \tau]$ d'après l'étape 1.

**Étape 3 (unicité : deux solutions coïncident sur leur intervalle commun)**　Soient $(J_1, x_1)$, $(J_2, x_2)$ deux solutions et $J = J_1 \cap J_2$. Par l'absurde, supposons qu'il existe $t_1 \in J$, $t_1 > t_0$, avec $x_1(t_1) \ne x_2(t_1)$. Posons $T = \sup\{s \in [t_0, t_1] : x_1 = x_2 \text{ sur } [t_0, s]\}$ ; alors $T < t_1$ et, par continuité, $x_1(T) = x_2(T) =: p$. Soient $V'$ et $k'$ le voisinage et la constante en $(T, p)$ ; par continuité, il existe $\eta > 0$ tel que $[T, T + \eta] \subset J$ et $(s, x_i(s)) \in V'$ pour $s \in [T, T + \eta]$. Alors $\norm{x_1(s) - x_2(s)} \le \int_T^s k'\norm{x_1 - x_2}$ et, d'après {@fr:gronwall} (avec $c = 0$), $x_1 = x_2$ sur $[T, T + \eta]$, ce qui contredit la définition de $T$. Cas $t_1 < t_0$ : on remplace $\sup$ par $\inf$ et $[T, T + \eta]$ par $[T - \eta, T]$, et on applique Grönwall à $s \mapsto x_i(T - s)$ (renversement du temps, voir l'étape 2 de la preuve de {@fr:dependance-continue}).

**Étape 4 (solution maximale)**　Soit $J_{\max}$ la réunion des intervalles de toutes les solutions (ils contiennent tous $t_0$, donc $J_{\max}$ est un intervalle). Pour $t \in J_{\max}$, posons $x(t) = x_J(t)$, où $(J, x_J)$ est une solution quelconque définie en $t$ ; d'après l'étape 3, cela ne dépend pas de $J$. Au voisinage de chaque point, $x$ coïncide avec une solution ; donc $(J_{\max}, x)$ est une solution, et toute solution en est une restriction : c'est l'unique solution maximale.

**Étape 5 (l'intervalle est ouvert)**　Par l'absurde, supposons que $J_{\max}$ contienne son extrémité droite $\beta$. L'étape 2 appliquée en $(\beta, x(\beta)) \in U$ donne une solution sur $[\beta - \tau', \beta + \tau']$ ; d'après l'étape 3 elle coïncide avec $x$ sur la partie commune et, en recollant (les dérivées à gauche et à droite en $\beta$ valent toutes deux $f(\beta, x(\beta))$), on obtient une solution sur $J_{\max} \cup [\beta, \beta + \tau']$, ce qui contredit la maximalité. On raisonne de même pour l'extrémité gauche (en remplaçant $\beta$ par l'extrémité gauche $\alpha$ et $[\beta, \beta + \tau']$ par $[\alpha - \tau', \alpha]$).
:::

::: cor id=dependance-continue zh="解对初值的连续依赖" en="Continuous dependence on initial conditions" fr="Dépendance continue par rapport aux conditions initiales" ru="Непрерывная зависимость решения от начальных данных" lvl=1
在 {@cauchy-lipschitz} 的条件下，若 $f$ 关于 $x$ 是全局 $k$-Lipschitz 的（对一切 $(t, x), (t, y) \in U$，$\norm{f(t, x) - f(t, y)} \le k\norm{x - y}$），则定义在同一区间 $J \ni t_0$ 上的两个解满足
$\norm{x(t) - y(t)} \le \norm{x(t_0) - y(t_0)}\,\e^{k\abs{t - t_0}}$（$t \in J$）。
:::

::: fr
Sous les hypothèses de {@fr:cauchy-lipschitz}, si $f$ est globalement $k$-lipschitzienne en $x$ (pour tous $(t, x), (t, y) \in U$, $\norm{f(t, x) - f(t, y)} \le k\norm{x - y}$), alors deux solutions définies sur un même intervalle $J \ni t_0$ vérifient
$\norm{x(t) - y(t)} \le \norm{x(t_0) - y(t_0)}\,\e^{k\abs{t - t_0}}$ ($t \in J$).
:::

::: proof
▷ 思路：两个积分方程相减，用 Lipschitz 条件得到 Grönwall 引理的假设；$t < t_0$ 时把时间反过来。

记 $\varphi(t) = \norm{x(t) - y(t)}$，它连续且非负。

**第 1 步（$t \ge t_0$）**　由积分方程（{@cauchy-lipschitz} 证明第 1 步），
$$x(t) - y(t) = x(t_0) - y(t_0) + \int_{t_0}^t\big(f(s, x(s)) - f(s, y(s))\big)\,\dd s,$$
所以
$$\varphi(t) \le \varphi(t_0) + \int_{t_0}^t\norm{f(s, x(s)) - f(s, y(s))}\,\dd s \le \varphi(t_0) + \int_{t_0}^t k\,\varphi(s)\,\dd s.$$
对每个 $T \in J$，$T \ge t_0$，在 $[t_0, T]$ 上用 {@gronwall}（$\psi = k$，$c = \varphi(t_0)$）：$\varphi(t) \le \varphi(t_0)\e^{k(t - t_0)}$。

**第 2 步（$t \le t_0$）**　对 $s \ge 0$ 且 $t_0 - s \in J$，令 $\tilde\varphi(s) = \varphi(t_0 - s)$。同样相减（积分从 $t_0 - s$ 到 $t_0$）并换元 $u = t_0 - \sigma$：
$$\tilde\varphi(s) \le \tilde\varphi(0) + \int_{t_0 - s}^{t_0}k\,\varphi(u)\,\dd u = \tilde\varphi(0) + \int_0^s k\,\tilde\varphi(\sigma)\,\dd\sigma.$$
由 {@gronwall}，$\tilde\varphi(s) \le \varphi(t_0)\e^{ks}$，即 $\varphi(t) \le \varphi(t_0)\e^{k(t_0 - t)}$。

合起来就是 $\varphi(t) \le \varphi(t_0)\e^{k\abs{t - t_0}}$。
:::

::: fr
▷ Méthode : on soustrait les deux équations intégrales et la condition de Lipschitz donne l'hypothèse du lemme de Grönwall ; pour $t < t_0$, on renverse le temps.

Notons $\varphi(t) = \norm{x(t) - y(t)}$, continue et positive.

**Étape 1 ($t \ge t_0$)**　D'après l'équation intégrale (étape 1 de la preuve de {@fr:cauchy-lipschitz}),
$$x(t) - y(t) = x(t_0) - y(t_0) + \int_{t_0}^t\big(f(s, x(s)) - f(s, y(s))\big)\,\dd s,$$
donc
$$\varphi(t) \le \varphi(t_0) + \int_{t_0}^t\norm{f(s, x(s)) - f(s, y(s))}\,\dd s \le \varphi(t_0) + \int_{t_0}^t k\,\varphi(s)\,\dd s.$$
Pour tout $T \in J$ avec $T \ge t_0$, {@fr:gronwall} sur $[t_0, T]$ (avec $\psi = k$ et $c = \varphi(t_0)$) donne $\varphi(t) \le \varphi(t_0)\e^{k(t - t_0)}$.

**Étape 2 ($t \le t_0$)**　Pour $s \ge 0$ tel que $t_0 - s \in J$, posons $\tilde\varphi(s) = \varphi(t_0 - s)$. En soustrayant de même (intégrale de $t_0 - s$ à $t_0$) et en posant $u = t_0 - \sigma$ :
$$\tilde\varphi(s) \le \tilde\varphi(0) + \int_{t_0 - s}^{t_0}k\,\varphi(u)\,\dd u = \tilde\varphi(0) + \int_0^s k\,\tilde\varphi(\sigma)\,\dd\sigma.$$
D'après {@fr:gronwall}, $\tilde\varphi(s) \le \varphi(t_0)\e^{ks}$, c'est-à-dire $\varphi(t) \le \varphi(t_0)\e^{k(t_0 - t)}$.

Au total, $\varphi(t) \le \varphi(t_0)\e^{k\abs{t - t_0}}$.
:::

::: rem
1. **意义。** 初值的误差至多按 $\e^{k\abs{t - t_0}}$ 放大：在有限时间内，解连续地依赖于初值（$c = 0$ 时就是唯一性）。但放大因子随时间指数增长——这就是长期预报困难（「混沌」）的来源。
2. **局部版本。** 只假设局部 Lipschitz 时，在每个紧时间区间上同样的结论成立（用一个紧邻域上的 Lipschitz 常数），这属于 L3 的内容。
:::

::: cex id=cex-unicite lvl=1
Lipschitz 条件不能省略。$y' = 3y^{2/3}$，$y(0) = 0$ 有无穷多个解：$y \equiv 0$，以及对任意 $c \ge 0$，
$$y_c(t) = \begin{cases}0 & t \le c\\ (t - c)^3 & t > c.\end{cases}$$
$f(y) = 3y^{2/3}$ 在 $y = 0$ 处连续但不 Lipschitz（导数在 $0$ 处趋于无穷）。

**验证。** $t > c$ 时 $y_c' = 3(t - c)^2 = 3\big((t - c)^3\big)^{2/3}$；$t < c$ 时两边都为 $0$；在 $t = c$ 处左右导数都是 $0$，且 $3y_c(c)^{2/3} = 0$。所以 $y_c$ 是 $\R$ 上的（$\Cc^1$）解。$f$ 不是局部 Lipschitz 的，见 {@c8-ex-lipschitz} 第 3 条。（$f$ 连续，所以存在性由 {@cauchy-peano} 保证；失去的只是唯一性。在 $y \ne 0$ 的区域 $f$ 是 $\Cc^1$ 的，解在离开 $0$ 之前是唯一的。）
:::

::: ex id=ex-explosion lvl=1
最大解的区间可以是有界的。$y' = y^2$，$y(0) = 1$ 的解 $y = \frac{1}{1 - t}$ 在 $t \to 1^-$ 时爆破。$f(y) = y^2$ 是 $\Cc^1$ 的，但不是全局 Lipschitz 的。

**细节。** $f$ 是 $\Cc^1$ 的，由 {@c8-c1-lipschitz} 与 {@cauchy-lipschitz}，存在唯一的最大解。$\big(]-\infty, 1[, \frac{1}{1-t}\big)$ 是解，且不能延拓（任何延拓在 $1$ 处连续，而 $\frac{1}{1-t} \to +\infty$），所以它就是最大解（{@cauchy-lipschitz}：最大解延拓一切解）。一般地，$y(0) = y_0 > 0$ 的最大解是 $\frac{y_0}{1 - y_0t}$，定义在 $]-\infty, \frac{1}{y_0}[$ 上：初值越大，爆破越早。右边光滑并不能阻止爆破；阻止爆破的是「增长至多线性」（{@c8-existence-globale}）。
:::

::: thm id=sortie-compact zh="爆破判据（逃离紧集定理）" en="Blow-up alternative" fr="Théorème de sortie de tout compact" ru="Теорема о продолжении решения" lvl=3 ref="Demailly, *Analyse numérique et équations différentielles*（EDP Sciences）"
设 $x$ 是最大解，定义在 $]\alpha, \beta[$ 上，$\beta < +\infty$。则当 $t \to \beta^-$ 时，$(t, x(t))$ 最终离开 $U$ 的任何紧子集。特别地，若 $U = \R \times \R^n$，则 $\norm{x(t)} \to +\infty$。推论：若 $U = \R \times \R^n$，且 $f$ 有界或 $\norm{f(t, x)} \le a(t) + b(t)\norm x$（$a, b$ 连续），则最大解定义在整个 $\R$ 上（证明见 {@c8-existence-globale}）。
:::

::: fr
Soit $x$ une solution maximale, définie sur $]\alpha, \beta[$ avec $\beta < +\infty$. Alors, quand $t \to \beta^-$, $(t, x(t))$ finit par sortir de tout compact de $U$. En particulier, si $U = \R \times \R^n$, $\norm{x(t)} \to +\infty$. Corollaire : si $U = \R \times \R^n$ et si $f$ est bornée ou vérifie $\norm{f(t, x)} \le a(t) + b(t)\norm x$ ($a, b$ continues), alors les solutions maximales sont définies sur $\R$ tout entier (preuve : {@fr:c8-existence-globale}).
:::

::: cor id=c8-existence-globale zh="增长至多线性时解全局存在" en="Global existence under linear growth" fr="Existence globale sous croissance au plus linéaire" ru="Глобальная разрешимость при линейном росте" lvl=1
设 $f : \R \times \R^n \to \R^n$ 连续，关于 $x$ 局部 Lipschitz，并且存在连续函数 $a, b \ge 0$ 使 $\norm{f(t, x)} \le a(t) + b(t)\norm{x}$。则每个最大解都定义在整个 $\R$ 上。
:::

::: fr
Soit $f : \R \times \R^n \to \R^n$ continue, localement lipschitzienne en $x$, et telle qu'il existe des fonctions continues $a, b \ge 0$ vérifiant $\norm{f(t, x)} \le a(t) + b(t)\norm{x}$. Alors toute solution maximale est définie sur $\R$ tout entier.
:::

::: proof
▷ 思路：反设最大解在有限时刻 $\beta$ 结束。由 Grönwall，$\norm{x(t)}$ 在 $[t_0, \beta[$ 上有界，于是 $(t, x(t))$ 留在一个紧集里，与 {@sortie-compact} 矛盾。

设最大解 $x$ 定义在 $]\alpha, \beta[$ 上，$t_0 \in ]\alpha, \beta[$。

**第 1 步（反设）**　设 $\beta < +\infty$。令 $C = \norm{x(t_0)} + \int_{t_0}^\beta a$，$B = \max_{[t_0, \beta]}b$（连续函数在闭区间上有界）。

**第 2 步（Grönwall）**　对 $t \in [t_0, \beta[$，由积分方程，
$$\norm{x(t)} \le \norm{x(t_0)} + \int_{t_0}^t\big(a(s) + b(s)\norm{x(s)}\big)\,\dd s \le C + \int_{t_0}^t B\,\norm{x(s)}\,\dd s.$$
对每个 $T \in [t_0, \beta[$ 在 $[t_0, T]$ 上用 {@gronwall}：$\norm{x(t)} \le C\e^{B(t - t_0)} \le C\e^{B(\beta - t_0)} =: R$。

**第 3 步（矛盾）**　对 $t \in [t_0, \beta[$，$(t, x(t))$ 属于紧集 $[t_0, \beta] \times \overline{B}(0, R)$，不会「最终离开」它，与 {@sortie-compact} 矛盾。所以 $\beta = +\infty$。

**第 4 步（左端）**　$\alpha > -\infty$ 的情形：对 $t \in ]\alpha, t_0]$ 用 {@dependance-continue} 证明中的时间反转，得到同样的界，矛盾。所以 $\alpha = -\infty$。

（$f$ 有界是 $b = 0$ 的特殊情形；线性方程组 $f = A(t)x + B(t)$ 也是特殊情形，与 {@cauchy-lipschitz-lineaire} 一致。）
:::

::: fr
▷ Méthode : par l'absurde, supposons que la solution maximale s'arrête en un temps fini $\beta$. Le lemme de Grönwall montre que $\norm{x(t)}$ reste borné sur $[t_0, \beta[$, donc que $(t, x(t))$ reste dans un compact, ce qui contredit {@fr:sortie-compact}.

Soit $x$ une solution maximale définie sur $]\alpha, \beta[$ et $t_0 \in ]\alpha, \beta[$.

**Étape 1 (hypothèse absurde)**　Supposons $\beta < +\infty$. Posons $C = \norm{x(t_0)} + \int_{t_0}^\beta a$ et $B = \max_{[t_0, \beta]}b$ (fonction continue sur un segment).

**Étape 2 (Grönwall)**　Pour $t \in [t_0, \beta[$, d'après l'équation intégrale,
$$\norm{x(t)} \le \norm{x(t_0)} + \int_{t_0}^t\big(a(s) + b(s)\norm{x(s)}\big)\,\dd s \le C + \int_{t_0}^t B\,\norm{x(s)}\,\dd s.$$
Pour tout $T \in [t_0, \beta[$, {@fr:gronwall} sur $[t_0, T]$ donne $\norm{x(t)} \le C\e^{B(t - t_0)} \le C\e^{B(\beta - t_0)} =: R$.

**Étape 3 (contradiction)**　Pour $t \in [t_0, \beta[$, $(t, x(t))$ appartient au compact $[t_0, \beta] \times \overline{B}(0, R)$ et n'en sort donc pas, ce qui contredit {@fr:sortie-compact}. Donc $\beta = +\infty$.

**Étape 4 (extrémité gauche)**　Si $\alpha > -\infty$, on renverse le temps sur $]\alpha, t_0]$ comme dans la preuve de {@fr:dependance-continue} et on obtient la même majoration, d'où une contradiction. Donc $\alpha = -\infty$.

(Le cas $f$ bornée correspond à $b = 0$ ; les systèmes linéaires $f = A(t)x + B(t)$ sont aussi un cas particulier, en accord avec {@fr:cauchy-lipschitz-lineaire}.)
:::

::: ex id=c8-ex-logistique zh="用唯一性做定性分析：logistic 方程" lvl=1
$y' = y(1 - y)$，$y(0) = y_0 \in ]0, 1[$。不解方程，只用 {@cauchy-lipschitz}：

1. **解夹在两个平衡解之间。** $f(y) = y(1 - y)$ 是 $\Cc^1$ 的，常函数 $0$ 和 $1$ 是解。若最大解 $y$ 在某个 $t_1$ 处取值 $0$，则 $y$ 与零解是同一个初值问题（时刻 $t_1$）的最大解，由唯一性 $y \equiv 0$，与 $y(0) = y_0 \ne 0$ 矛盾。同样 $y$ 不取值 $1$。$y$ 连续，$y(0) \in ]0, 1[$，由介值定理，$0 < y(t) < 1$ 处处成立。
2. **单调。** $y' = y(1 - y) > 0$，所以 $y$ 严格递增。
3. **全局存在。** 若最大区间的右端点 $\beta < +\infty$，则对 $t \in [0, \beta[$，$(t, y(t))$ 在紧集 $[0, \beta] \times [0, 1]$ 中，与 {@sortie-compact} 矛盾。左端点 $\alpha > -\infty$ 时，把紧集换成 $[\alpha, 0] \times [0, 1]$，同样矛盾（{@sortie-compact} 对左端点也成立：把 $t$ 换成 $-t$）。所以 $y$ 定义在 $\R$ 上。
4. **极限。** $y$ 递增且有界，$\ell = \lim_{+\infty}y \in ]0, 1]$ 存在。若 $\ell < 1$，则对 $t \ge 0$，$y(t) \in [y_0, \ell]$，$y' = y(1 - y) \ge y_0(1 - \ell) > 0$，积分得 $y(t) \ge y_0 + y_0(1 - \ell)t \to +\infty$，矛盾。所以 $\ell = 1$。在 $-\infty$ 处，$\ell' = \lim_{-\infty}y \in [0, y_0[$ 存在；若 $\ell' > 0$，则对 $t \le 0$，$y(t) \in [\ell', y_0]$，$y' \ge \ell'(1 - y_0) > 0$，于是 $y_0 - y(t) = \int_t^0 y' \ge \ell'(1 - y_0)\abs t \to +\infty$，与 $y_0 - y(t) \le y_0$ 矛盾。所以 $\ell' = 0$。

（显式解 $y(t) = \frac{1}{1 + (1/y_0 - 1)\e^{-t}}$ 验证了这些结论。）
:::

::: thm id=cauchy-peano zh="Cauchy–Peano 定理" en="Peano existence theorem" fr="Théorème de Cauchy–Peano–Arzelà" ru="Теорема Пеано" lvl=3 ref="Hartman, *Ordinary Differential Equations*，第 II 章"
若 $f$ 只是连续的，初值问题仍有（局部）解，但可能不唯一（{@cex-unicite}）。证明：构造 Euler 折线近似解，它们一致有界且等度连续，由 Arzelà–Ascoli 定理 {@arzela-ascoli} 抽取一致收敛子列，极限就是解。
:::

::: fr
Si $f$ est seulement continue, le problème de Cauchy admet encore une solution (locale), mais elle peut ne pas être unique ({@fr:cex-unicite}). Preuve : on construit des solutions approchées affines par morceaux (méthode d'Euler) ; elles sont uniformément bornées et équicontinues, et le théorème d'Arzelà–Ascoli {@fr:arzela-ascoli} permet d'en extraire une sous-suite uniformément convergente, dont la limite est solution.
:::

::: demo id=slopefield
方向场与解曲线。点击画布添加初值条件，曲线用四阶 Runge–Kutta 方法向两个方向积分。可以试试 $y' = y^2$（有限时间爆破）和 $y' = 3y^{2/3}$（从 $y(0) = 0$ 出发，数值方法只给出零解，而理论上有无穷多个解）。
:::

::: q
设 $y$ 是单摆方程 $y'' = -\sin y$ 满足 $y(0) = a$、$y'(0) = 0$ 的最大解。证明 $y$ 定义在 $\R$ 上，且是偶函数。
:::

::: ans
写成方程组 $X = (y, y')$，$X' = F(X) = (y', -\sin y)$。$F$ 是 $\Cc^1$ 的，且 $\norm{F(X)}_1 = \abs{y'} + \abs{\sin y} \le 1 + \norm{X}_1$，由 {@c8-existence-globale}，最大解定义在 $\R$ 上。令 $z(t) = y(-t)$，则 $z'(t) = -y'(-t)$，$z''(t) = y''(-t) = -\sin z(t)$，$z(0) = a$，$z'(0) = -y'(0) = 0$。所以 $z$ 与 $y$ 是同一个初值问题在 $\R$ 上的解，由 {@cauchy-lipschitz} 的唯一性，$z = y$，即 $y(-t) = y(t)$。
:::

::: q
求 $x' = 1 + x^2$，$x(0) = 0$ 的最大解。为什么它不能延拓到 $\R$？
:::

::: ans
$x(t) = \tan t$ 在 $]-\frac\pi2, \frac\pi2[$ 上是解（$\tan' = 1 + \tan^2$），且 $t \to \pm\frac\pi2$ 时 $\abs{\tan t} \to +\infty$，不能延拓，所以它就是最大解。$1 + x^2$ 的增长是二次的，{@c8-existence-globale} 不适用——与 {@sortie-compact} 一致：$\abs{x(t)} \to +\infty$。
:::

::: open zh="Hilbert 第 16 问题（第二部分）"
平面多项式向量场 $x' = P(x, y)$，$y' = Q(x, y)$（$\deg P, \deg Q \le d$）的**极限环**（孤立的周期轨道）个数是否有一个只依赖于 $d$ 的上界 $H(d)$？即使 $d = 2$，这个问题也未解决。已知每个具体的向量场只有有限个极限环（Ilyashenko 1991，Écalle 1992）。
:::
