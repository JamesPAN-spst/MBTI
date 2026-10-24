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
4. **注意：** $\e^M$ 的元素**不是** $M$ 的元素的指数。例如 3 中 $\e^{tN}$ 的 $(1, 1)$ 元是 $1$，不是 $\e^0 = 1$ 碰巧相同，但 $(2, 1)$ 元是 $0 \ne \e^0$。
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
转置是有限维空间上的线性映射，连续，且 $(A^k)^T = (A^T)^k$，对部分和取极限得 $(\e^{tA})^T = \e^{tA^T} = \e^{-tA}$。由 {@exp-matrice-proprietes} 第 1 条，$\e^{-tA} = (\e^{tA})^{-1}$，所以 $(\e^{tA})^T\e^{tA} = I$。又 $\tr A = 0$（反对称矩阵的对角元为零），由第 4 条 $\det\e^{tA} = \e^{0} = 1$。所以 $\X' = AX$ 的解保持欧氏范数：$\norm{X(t)}_2 = \norm{X(0)}_2$。
:::

::: q
设 $A^2 = A$（投影）。求 $\e^{tA}$。
:::

::: ans
$A^k = A$（$k \ge 1$），所以 $\e^{tA} = I + \sum_{k \ge 1}\frac{t^k}{k!}A = I + (\e^t - 1)A$。这是零化多项式方法（$P(X) = X^2 - X$，$d = 2$）的一个例子。
:::
