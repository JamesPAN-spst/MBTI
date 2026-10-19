本章是整个 L2 的语言基础。法国 MP 大纲在讲级数和函数列之前先讲它：后面讨论函数列的一致收敛、幂级数、微分学时，都把对象看成某个赋范空间里的点。全章约定 $\K = \R$ 或 $\C$，$E, F$ 是 $\K$-向量空间。

## 范数与距离

::: def id=def-norme zh="范数" en="Norm" fr="Norme" ru="Норма"
映射 $N : E \to \R_+$ 称为**范数**，如果对一切 $x, y \in E$、$\lambda \in \K$：

1. （分离性）$N(x) = 0 \iff x = 0$；
2. （齐次性）$N(\lambda x) = \abs{\lambda}\, N(x)$；
3. （三角不等式）$N(x + y) \le N(x) + N(y)$。

$(E, N)$ 称为**赋范向量空间**（espace vectoriel normé，EVN）。记 $d(x, y) = \norm{x - y}$ 为相应的**距离**。
:::

由三角不等式立即得到 $\big|\norm{x} - \norm{y}\big| \le \norm{x - y}$。

::: ex zh="经典范数"
1. 在 $\K^n$ 上：$\norm{x}_1 = \sum_i \abs{x_i}$，$\norm{x}_2 = \big(\sum_i \abs{x_i}^2\big)^{1/2}$，$\norm{x}_\infty = \max_i \abs{x_i}$。更一般地，$p \ge 1$ 时 $\norm{x}_p = \big(\sum_i \abs{x_i}^p\big)^{1/p}$。
2. 在 $\Cc([a,b], \K)$ 上：$\norm{f}_\infty = \sup_{[a,b]} \abs{f}$，$\norm{f}_1 = \int_a^b \abs{f}$，$\norm{f}_2 = \big(\int_a^b \abs{f}^2\big)^{1/2}$。
3. 在 $\M_n(\K)$ 上：任何 $\K^{n^2}$ 上的范数，以及下文的算子范数。
:::

$\norm{\cdot}_p$ 的三角不等式需要证明，这就是 Minkowski 不等式。

::: lem id=young zh="Young 不等式" en="Young's inequality" fr="Inégalité de Young" ru="Неравенство Юнга" lvl=1
设 $p, q > 1$，$\frac1p + \frac1q = 1$。对一切 $a, b \ge 0$，有 $ab \le \dfrac{a^p}{p} + \dfrac{b^q}{q}$。
:::

::: proof
$a = 0$ 或 $b = 0$ 时显然。否则由 $\ln$ 的凹性，
$$\ln\Big(\frac{a^p}{p} + \frac{b^q}{q}\Big) \ge \frac1p \ln a^p + \frac1q \ln b^q = \ln(ab).$$
:::

::: thm id=holder zh="Hölder 不等式与 Minkowski 不等式" en="Hölder and Minkowski inequalities" fr="Inégalités de Hölder et de Minkowski" ru="Неравенства Гёльдера и Минковского" lvl=1
设 $p, q > 1$ 共轭。对 $x, y \in \K^n$：
$$\sum_{i=1}^n \abs{x_i y_i} \le \norm{x}_p \norm{y}_q, \qquad \norm{x + y}_p \le \norm{x}_p + \norm{y}_p.$$
因此 $\norm{\cdot}_p$（$1 \le p \le \infty$）都是 $\K^n$ 上的范数。对 $\Cc([a,b])$ 上的积分形式同样成立。
:::

::: proof
**Hölder。** 若 $x = 0$ 或 $y = 0$ 则显然。否则令 $u = x / \norm{x}_p$，$v = y / \norm{y}_q$，则 $\norm{u}_p = \norm{v}_q = 1$。由 Young 不等式，
$$\sum_i \abs{u_i v_i} \le \frac1p \sum_i \abs{u_i}^p + \frac1q \sum_i \abs{v_i}^q = \frac1p + \frac1q = 1.$$

**Minkowski。** $p = 1$ 时就是三角不等式。设 $p > 1$，$S = \sum_i \abs{x_i + y_i}^p$。写
$$S \le \sum_i \abs{x_i}\,\abs{x_i + y_i}^{p-1} + \sum_i \abs{y_i}\,\abs{x_i + y_i}^{p-1},$$
对右边两项分别用 Hölder 不等式，注意 $(p-1)q = p$：
$$S \le \big(\norm{x}_p + \norm{y}_p\big)\, S^{1/q}.$$
若 $S > 0$，两边除以 $S^{1/q}$，由 $1 - \frac1q = \frac1p$ 即得。积分形式的证明完全相同，把求和换成积分。
:::

::: demo id=unitballs
拖动 $p$，观察 $\R^2$ 中单位球 $\{x : \norm{x}_p \le 1\}$ 的形状。$p = 1$ 是菱形，$p = 2$ 是圆，$p \to \infty$ 时趋于正方形。所有单位球都是凸的，这正是三角不等式的几何含义。
:::

::: def zh="球与有界集" en="Balls, bounded sets" fr="Boules, parties bornées" ru="Шары, ограниченные множества"
开球 $B(a, r) = \{x : \norm{x - a} < r\}$，闭球 $\overline{B}(a, r) = \{x : \norm{x - a} \le r\}$，球面 $S(a,r)$。集合 $A$ **有界**，如果它包含在某个球中。
:::

::: prop lvl=1
球是凸集。
:::

::: proof
若 $x, y \in B(a, r)$，$t \in [0,1]$，则
$\norm{(1-t)x + ty - a} \le (1-t)\norm{x - a} + t\norm{y - a} < r$。
:::

## 数列与等价范数

::: def zh="收敛数列" en="Convergent sequence" fr="Suite convergente" ru="Сходящаяся последовательность"
$(E, \norm{\cdot})$ 中的数列 $(u_n)$ **收敛**到 $\ell$，如果 $\norm{u_n - \ell} \to 0$。极限唯一，收敛数列有界。
:::

::: def id=def-equiv zh="等价范数" en="Equivalent norms" fr="Normes équivalentes" ru="Эквивалентные нормы"
$E$ 上的两个范数 $N_1, N_2$ **等价**，如果存在 $\alpha, \beta > 0$，使得 $\alpha N_1 \le N_2 \le \beta N_1$。
:::

::: prop id=equiv-conv lvl=1
若 $N_1, N_2$ 等价，则它们有相同的收敛数列（极限也相同）、相同的有界集、相同的开集。
:::

::: proof
由 $N_2(u_n - \ell) \le \beta N_1(u_n - \ell)$ 及对称的不等式立得收敛性的结论。有界集同理。开集的情形：$N_1$ 的球 $B_1(a, r)$ 包含 $N_2$ 的球 $B_2(a, \alpha r)$，反之亦然，所以两种拓扑的开集相同（开集的定义见下一节）。
:::

::: ex lvl=1
在 $\K^n$ 上：$\norm{x}_\infty \le \norm{x}_2 \le \norm{x}_1 \le n \norm{x}_\infty$。所以这三个范数两两等价。下文 {@equiv-dimfinie} 将说明：有限维空间上**所有**范数都等价。
:::

::: cex id=cex-normes-c01 lvl=1
在 $\Cc([0,1], \R)$ 上，$\norm{\cdot}_1$ 与 $\norm{\cdot}_\infty$ 不等价。取 $f_n(x) = x^n$：$\norm{f_n}_\infty = 1$，而 $\norm{f_n}_1 = \frac{1}{n+1} \to 0$。所以 $(f_n)$ 对 $\norm{\cdot}_1$ 收敛到 $0$，但对 $\norm{\cdot}_\infty$ 不收敛到 $0$。无穷维空间中，「收敛」依赖于范数的选取。
:::

::: def zh="数列的聚点" en="Cluster point of a sequence" fr="Valeur d'adhérence" ru="Частичный предел"
$a$ 称为 $(u_n)$ 的**聚点**（valeur d'adhérence），如果存在子列 $u_{\varphi(n)} \to a$。
:::

## 开集、闭集、闭包与内部

::: def zh="开集与闭集" en="Open and closed sets" fr="Ouverts et fermés" ru="Открытые и замкнутые множества"
$U \subset E$ 是**开集**，如果对每个 $a \in U$，存在 $r > 0$ 使 $B(a, r) \subset U$。$F$ 是**闭集**，如果 $E \setminus F$ 是开集。
:::

::: prop lvl=1
任意多个开集的并、有限多个开集的交都是开集；任意多个闭集的交、有限多个闭集的并都是闭集。开球是开集，闭球是闭集。
:::

::: proof
若 $a \in \bigcup U_i$，则 $a$ 属于某个 $U_{i_0}$，存在 $B(a,r) \subset U_{i_0}$。若 $a \in U_1 \cap \dots \cap U_p$，取 $r = \min r_k > 0$。闭集的结论取补集即得。对开球：若 $\norm{x - a} < r$，令 $\rho = r - \norm{x - a}$，则由三角不等式 $B(x, \rho) \subset B(a, r)$。闭球的补集同理是开集。
:::

::: cex lvl=1
无穷多个开集的交未必是开集：在 $\R$ 中 $\bigcap_{n \ge 1} \left]-\frac1n, \frac1n\right[ = \{0\}$。
:::

::: def zh="内部、闭包、边界、稠密" en="Interior, closure, boundary, dense" fr="Intérieur, adhérence, frontière, densité" ru="Внутренность, замыкание, граница, плотность"
$A$ 的**内部** $\mathring{A}$ 是包含于 $A$ 的最大开集；$A$ 的**闭包** $\overline{A}$ 是包含 $A$ 的最小闭集；**边界** $\partial A = \overline{A} \setminus \mathring{A}$。若 $\overline{A} = E$，称 $A$ 在 $E$ 中**稠密**。
:::

::: thm id=carac-seq-adh zh="闭包的序列刻画" en="Sequential characterisation of closure" fr="Caractérisation séquentielle de l'adhérence" ru="Секвенциальная характеризация замыкания" lvl=1
$a \in \overline{A}$ 当且仅当存在 $A$ 中的数列收敛到 $a$。因此，$A$ 是闭集当且仅当 $A$ 中任何收敛数列的极限都属于 $A$。
:::

::: proof
先证：$a \in \overline{A} \iff$ 对一切 $r > 0$，$B(a, r) \cap A \ne \varnothing$。若某个 $B(a, r) \cap A = \varnothing$，则 $E \setminus B(a, r)$ 是包含 $A$ 的闭集，所以 $\overline{A} \subset E \setminus B(a,r)$，$a \notin \overline{A}$。反之若 $a \notin \overline{A}$，$E \setminus \overline{A}$ 是含 $a$ 的开集，含某个 $B(a,r)$，它与 $A$ 不交。

现在若 $a \in \overline{A}$，取 $u_n \in B(a, \frac1n) \cap A$ 即得收敛到 $a$ 的数列。反之若 $A \ni u_n \to a$，则每个 $B(a, r)$ 都含某个 $u_n$，所以 $a \in \overline{A}$。最后，$A$ 闭 $\iff A = \overline{A}$。
:::

::: ex
$\Q$ 在 $\R$ 中稠密。多项式函数在 $(\Cc([a,b]), \norm{\cdot}_\infty)$ 中稠密（Weierstrass 定理，第 3 章 {@weierstrass}）。
:::

::: rem
相对拓扑：若 $A \subset E$，$A$ 的开子集是指形如 $U \cap A$（$U$ 是 $E$ 的开集）的集合。下文讨论定义在 $A$ 上的函数时，「开集的原像」都是指相对开集。
:::

## 极限、连续与连续线性映射

::: def zh="函数的极限与连续" en="Limit and continuity" fr="Limite et continuité" ru="Предел и непрерывность"
设 $f : A \subset E \to F$，$a \in \overline{A}$。$f(x) \to \ell$（$x \to a$）指：对一切 $\eps > 0$，存在 $\delta > 0$，使得 $x \in A$、$\norm{x - a} < \delta$ 时 $\norm{f(x) - \ell} < \eps$。$f$ 在 $a \in A$ **连续**，如果 $f(x) \to f(a)$。
:::

::: prop id=carac-seq-cont lvl=1
$f$ 在 $a$ 连续，当且仅当对 $A$ 中任何收敛到 $a$ 的数列 $(x_n)$，都有 $f(x_n) \to f(a)$。
:::

::: proof
必要性直接由定义得到。充分性用反证：若 $f$ 在 $a$ 不连续，存在 $\eps > 0$ 和 $x_n \in A$，$\norm{x_n - a} < \frac1n$ 但 $\norm{f(x_n) - f(a)} \ge \eps$，与假设矛盾。
:::

::: thm id=cont-ouverts zh="连续性的拓扑刻画" en="Topological characterisation of continuity" fr="Caractérisation topologique de la continuité" ru="Топологическое определение непрерывности" lvl=1
$f : A \to F$ 连续，当且仅当 $F$ 的任何开集的原像是 $A$ 的（相对）开集；当且仅当任何闭集的原像是相对闭集。
:::

::: proof
设 $f$ 连续，$V$ 是开集，$a \in f^{-1}(V)$。存在 $\eps$ 使 $B(f(a), \eps) \subset V$，再由连续性存在 $\delta$ 使 $f(B(a,\delta) \cap A) \subset V$，所以 $f^{-1}(V) \supset B(a, \delta) \cap A$。于是 $f^{-1}(V)$ 是所有这些 $B(a,\delta_a) \cap A$ 的并，是相对开集。反之，对 $V = B(f(a), \eps)$ 应用条件，得到相对开集 $f^{-1}(V) \ni a$，它包含某个 $B(a, \delta) \cap A$，这就是连续性。闭集的说法取补集即得。
:::

::: def zh="Lipschitz 映射" en="Lipschitz map" fr="Application lipschitzienne" ru="Липшицево отображение"
$f$ 是 $k$-Lipschitz 的，如果 $\norm{f(x) - f(y)} \le k \norm{x - y}$ 对一切 $x, y$ 成立。Lipschitz 映射一致连续，从而连续。范数本身是 1-Lipschitz 的。
:::

::: thm id=lin-continue zh="连续线性映射的刻画" en="Bounded linear maps" fr="Caractérisation des applications linéaires continues" ru="Критерий непрерывности линейного оператора" lvl=1
设 $u : E \to F$ 线性。以下条件等价：

1. $u$ 连续；
2. $u$ 在 $0$ 连续；
3. 存在 $C \ge 0$，使 $\norm{u(x)} \le C \norm{x}$ 对一切 $x$ 成立；
4. $u$ 是 Lipschitz 的。
:::

::: proof
$1 \Rightarrow 2$ 显然。$2 \Rightarrow 3$：对 $\eps = 1$，存在 $\delta > 0$，使 $\norm{x} \le \delta \Rightarrow \norm{u(x)} \le 1$。对 $x \ne 0$，令 $y = \delta x / \norm{x}$，则 $\norm{u(y)} \le 1$，即 $\norm{u(x)} \le \frac{1}{\delta}\norm{x}$。$3 \Rightarrow 4$：$\norm{u(x) - u(y)} = \norm{u(x - y)} \le C \norm{x - y}$。$4 \Rightarrow 1$ 显然。
:::

::: def id=norme-subordonnee zh="算子范数" en="Operator norm" fr="Norme subordonnée (norme d'opérateur)" ru="Норма оператора"
在连续线性映射空间 $\Lin_c(E, F)$ 上定义
$$\norm{u} = \sup_{x \ne 0} \frac{\norm{u(x)}}{\norm{x}} = \sup_{\norm{x} = 1} \norm{u(x)}.$$
这是一个范数，并且满足 $\norm{v \circ u} \le \norm{v}\,\norm{u}$（次乘性）。
:::

::: cex lvl=1
无穷维时线性映射未必连续。在 $E = \R[X]$ 上取范数 $\norm{P} = \sup_{[0,1]} \abs{P}$，求导映射 $D : P \mapsto P'$ 满足 $\norm{X^n} = 1$，但 $\norm{D X^n} = n$，所以不存在常数 $C$，$D$ 不连续。
:::

## 紧性

法国大纲采用的是**序列紧**（Bolzano–Weierstrass 意义下）的定义，它在赋范空间中与覆盖紧等价。

::: def id=def-compact zh="紧集" en="Compact set" fr="Partie compacte" ru="Компакт"
$K \subset E$ 是**紧集**，如果 $K$ 中的任何数列都有收敛到 $K$ 中某点的子列。
:::

::: prop id=compact-ferme-borne lvl=1
紧集是有界闭集。紧集的闭子集是紧集。紧集的有限乘积是紧集。
:::

::: proof
若 $K$ 无界，可取 $u_n \in K$ 使 $\norm{u_n} \ge n$，它没有收敛子列。若 $K \ni u_n \to a$，由紧性某个子列收敛到 $K$ 中的点，由极限唯一 $a \in K$，所以 $K$ 闭。设 $F \subset K$ 闭，$F$ 中的数列在 $K$ 中有收敛子列，极限属于 $F$（$F$ 闭）。乘积：对 $(u_n, v_n)$ 先对第一个分量取收敛子列，再对第二个分量从中取子列（「对角线式」逐次抽取）。
:::

::: thm id=image-compact zh="紧集的连续像与最值定理" en="Extreme value theorem" fr="Théorème des bornes atteintes" ru="Теорема Вейерштрасса о достижении экстремумов" lvl=1
若 $f : K \to F$ 连续，$K$ 紧，则 $f(K)$ 紧。特别地，紧集上的实值连续函数有界并取到最大值和最小值。
:::

::: proof
设 $f(x_n)$ 是 $f(K)$ 中的数列。取子列 $x_{\varphi(n)} \to a \in K$，由连续性 $f(x_{\varphi(n)}) \to f(a) \in f(K)$。对实值情形，$f(K)$ 是 $\R$ 的有界闭集，上确界属于其闭包，即属于 $f(K)$ 本身。
:::

::: thm id=heine zh="Heine 定理" en="Heine–Cantor theorem" fr="Théorème de Heine" ru="Теорема Кантора (о равномерной непрерывности)" lvl=1
紧集上的连续函数一致连续。
:::

::: proof
反设不然：存在 $\eps > 0$ 和 $x_n, y_n \in K$，$\norm{x_n - y_n} < \frac1n$ 但 $\norm{f(x_n) - f(y_n)} \ge \eps$。取子列 $x_{\varphi(n)} \to a$，则 $y_{\varphi(n)} \to a$。由连续性，$f(x_{\varphi(n)}) - f(y_{\varphi(n)}) \to 0$，矛盾。
:::

::: thm id=bw-kn zh="有限维空间中的 Bolzano–Weierstrass 定理" en="Bolzano–Weierstrass theorem" fr="Théorème de Bolzano–Weierstrass" ru="Теорема Больцано–Вейерштрасса" lvl=1
在 $(\K^n, \norm{\cdot}_\infty)$ 中，有界数列有收敛子列。因此 $\K^n$ 的紧集恰是有界闭集。
:::

::: proof
$n = 1$、$\K = \R$ 是 L1 的 Bolzano–Weierstrass 定理；$\C \simeq \R^2$。对一般的 $n$，一个有界数列的各个坐标都是有界数列，依次对每个坐标抽取收敛子列（共抽取 $n$ 次），所得子列各坐标都收敛，即对 $\norm{\cdot}_\infty$ 收敛。后一结论：有界闭集中的数列有收敛子列，极限仍在集合中（闭）；反方向见 {@compact-ferme-borne}。
:::

::: thm id=equiv-dimfinie zh="有限维空间中范数的等价性" en="Equivalence of norms in finite dimension" fr="Équivalence des normes en dimension finie" ru="Эквивалентность норм в конечномерном пространстве" lvl=1
有限维向量空间上的所有范数都等价。
:::

::: proof
取基 $(e_1, \dots, e_n)$，借此把 $E$ 等同于 $\K^n$，并记 $\norm{x}_\infty = \max \abs{x_i}$。只需证明任一范数 $N$ 与 $\norm{\cdot}_\infty$ 等价。

一方面，$N(x) = N\big(\sum x_i e_i\big) \le \big(\sum N(e_i)\big)\norm{x}_\infty = \beta \norm{x}_\infty$。所以 $N$ 对 $\norm{\cdot}_\infty$ 是 $\beta$-Lipschitz 的，特别是连续的。

另一方面，单位球面 $S = \{x : \norm{x}_\infty = 1\}$ 是 $(\K^n, \norm{\cdot}_\infty)$ 中的有界闭集，由 {@bw-kn} 是紧集。$N$ 在 $S$ 上连续且取正值，由 {@image-compact} 取到最小值 $\alpha > 0$。由齐次性，$N(x) \ge \alpha \norm{x}_\infty$ 对一切 $x$ 成立。
:::

::: cor id=cor-dimfinie lvl=1
设 $E$ 有限维。则：

1. $E$ 中的紧集恰是有界闭集；
2. 从 $E$ 出发的任何线性映射都连续；
3. 任何赋范空间的有限维子空间都是闭集。
:::

::: proof
1. 由 {@equiv-dimfinie} 可以选用 $\norm{\cdot}_\infty$，再用 {@bw-kn}。
2. 用 $\norm{\cdot}_1$：$\norm{u(x)} \le \sum \abs{x_i}\,\norm{u(e_i)} \le \big(\max \norm{u(e_i)}\big) \norm{x}_1$，再用 {@lin-continue}。
3. 设 $F$ 有限维，$F \ni u_n \to a$。$(u_n)$ 有界，落在 $F$ 的某个闭球中，这个闭球在 $F$ 中是紧集（结论 1），所以有子列收敛到 $F$ 中的点，由极限唯一 $a \in F$。
:::

::: thm id=riesz zh="Riesz 定理" en="Riesz's theorem" fr="Théorème de Riesz" ru="Теорема Рисса о компактности шара" lvl=2
赋范空间 $E$ 的闭单位球是紧集，当且仅当 $E$ 有限维。
:::

::: sketch
关键是 **Riesz 引理**：若 $F \subsetneq E$ 是闭子空间，则存在单位向量 $x$，使 $d(x, F) \ge \frac12$。若 $E$ 无穷维，归纳地取单位向量 $x_{n+1}$，使它与 $\Vect(x_1, \dots, x_n)$（有限维，所以是闭集）的距离 $\ge \frac12$。数列 $(x_n)$ 两两距离 $\ge \frac12$，没有收敛子列。
:::

## 完备性与不动点

::: def id=def-banach zh="Cauchy 列、完备空间、Banach 空间" en="Cauchy sequence, complete space, Banach space" fr="Suite de Cauchy, espace complet, espace de Banach" ru="Фундаментальная последовательность, полное пространство, банахово пространство"
$(u_n)$ 是 **Cauchy 列**，如果 $\forall \eps > 0$，$\exists N$，$\forall p, q \ge N$，$\norm{u_p - u_q} < \eps$。若 $E$ 中所有 Cauchy 列都收敛，称 $E$ **完备**；完备的赋范空间称为 **Banach 空间**。
:::

::: thm id=dimfinie-complet lvl=1 zh="有限维空间的完备性" en="Finite-dimensional spaces are complete" fr="Tout evn de dimension finie est complet" ru="Конечномерное пространство полно"
有限维赋范空间是 Banach 空间。
:::

::: proof
Cauchy 列有界，所以落在某个闭球中。这个闭球是紧集（{@cor-dimfinie}），因此有收敛子列。一个有收敛子列的 Cauchy 列本身收敛：若 $u_{\varphi(n)} \to a$，则 $\norm{u_n - a} \le \norm{u_n - u_{\varphi(n)}} + \norm{u_{\varphi(n)} - a}$，两项都可以变小。
:::

::: thm id=c0-complet zh="连续函数空间的完备性" en="Completeness of $(C([a,b]), \lVert\cdot\rVert_\infty)$" fr="Complétude de $(\mathcal{C}([a,b]), \lVert\cdot\rVert_\infty)$" ru="Полнота пространства $C[a,b]$" lvl=1
$(\Cc([a,b], \K), \norm{\cdot}_\infty)$ 是 Banach 空间。
:::

::: proof
设 $(f_n)$ 是 Cauchy 列。对每个 $x$，$\abs{f_p(x) - f_q(x)} \le \norm{f_p - f_q}_\infty$，所以 $(f_n(x))$ 是 $\K$ 中的 Cauchy 列，收敛到某个 $f(x)$。

给定 $\eps$，取 $N$ 使 $p, q \ge N$ 时 $\norm{f_p - f_q}_\infty \le \eps$。固定 $x$ 和 $p \ge N$，令 $q \to \infty$，得 $\abs{f_p(x) - f(x)} \le \eps$。这对所有 $x$ 一致成立，所以 $\norm{f_p - f}_\infty \le \eps$，即 $f_p$ 一致收敛到 $f$。

最后，$f$ 连续：这是「一致收敛保持连续性」（第 3 章 {@cont-limite-unif}），其证明只用到 $\eps/3$ 论证。
:::

::: cex id=cex-c01-l1 lvl=1
$(\Cc([0,1], \R), \norm{\cdot}_1)$ 不完备。令 $f_n$ 在 $[0, \frac12]$ 上为 $0$，在 $[\frac12 + \frac1n, 1]$ 上为 $1$，中间线性连接。则 $\norm{f_p - f_q}_1 \le \frac{1}{\min(p,q)}$，是 Cauchy 列；但它对 $\norm{\cdot}_1$ 的「极限」只能是阶梯函数 $\mathbf{1}_{]1/2, 1]}$，不是连续函数。这正是引入 Lebesgue 空间 $L^1$ 的动机（L3）。
:::

::: thm id=serie-abs-banach zh="Banach 空间中绝对收敛的级数收敛" en="Absolutely convergent series converge in a Banach space" fr="Une série absolument convergente d'un espace de Banach converge" ru="Абсолютно сходящийся ряд в банаховом пространстве сходится" lvl=1
若 $E$ 完备，$\sum \norm{u_n} < \infty$，则 $\sum u_n$ 收敛，且 $\norm{\sum u_n} \le \sum \norm{u_n}$。
:::

::: proof
部分和 $S_n$ 满足 $\norm{S_q - S_p} \le \sum_{k=p+1}^q \norm{u_k}$，后者是收敛实数级数的 Cauchy 片段，所以 $(S_n)$ 是 Cauchy 列，收敛。不等式由三角不等式取极限得到。
:::

::: thm id=point-fixe zh="Banach 不动点定理（压缩映射原理）" en="Banach fixed-point theorem" fr="Théorème du point fixe de Banach (de Picard)" ru="Принцип сжимающих отображений" lvl=1
设 $F$ 是 Banach 空间的非空闭子集，$f : F \to F$ 是 $k$-Lipschitz 的，$0 \le k < 1$。则 $f$ 有唯一不动点 $\ell$。对任意 $x_0 \in F$，迭代 $x_{n+1} = f(x_n)$ 收敛到 $\ell$，并且
$$\norm{x_n - \ell} \le \frac{k^n}{1 - k} \norm{x_1 - x_0}.$$
:::

::: proof
**唯一性**：若 $f(\ell) = \ell$，$f(\ell') = \ell'$，则 $\norm{\ell - \ell'} \le k \norm{\ell - \ell'}$，所以 $\ell = \ell'$。

**存在性**：归纳得 $\norm{x_{n+1} - x_n} \le k^n \norm{x_1 - x_0}$。对 $p > n$，
$$\norm{x_p - x_n} \le \sum_{j=n}^{p-1} k^j \norm{x_1 - x_0} \le \frac{k^n}{1-k}\norm{x_1 - x_0}.$$
所以 $(x_n)$ 是 Cauchy 列，在完备空间中收敛到某个 $\ell$，又因 $F$ 闭，$\ell \in F$。由 $f$ 的连续性，在 $x_{n+1} = f(x_n)$ 中取极限得 $\ell = f(\ell)$。在上面的不等式中令 $p \to \infty$ 即得误差估计。
:::

::: rem
不动点定理贯穿 L2：第 8 章用它证明 Cauchy–Lipschitz 定理，第 10 章用它证明局部逆定理。
:::

::: cex lvl=1
条件不能减弱为 $\norm{f(x) - f(y)} < \norm{x - y}$：$f(x) = x + \frac1x$ 在 $[1, +\infty[$ 上满足这个严格不等式，却没有不动点。
:::

## 道路连通性

::: def zh="道路连通" en="Path-connected" fr="Connexe par arcs" ru="Линейно связное множество"
$A$ **道路连通**，如果任意两点 $a, b \in A$ 之间有连续道路 $\gamma : [0,1] \to A$，$\gamma(0) = a$，$\gamma(1) = b$。凸集（特别是球）和星形集都是道路连通的。
:::

::: thm id=image-connexe zh="道路连通集的连续像" en="Continuous image of a path-connected set" fr="Image continue d'un connexe par arcs" ru="Непрерывный образ линейно связного множества" lvl=1
道路连通集的连续像是道路连通的。$\R$ 的道路连通子集恰是区间。
:::

::: proof
若 $\gamma$ 连接 $a, b$，则 $f \circ \gamma$ 连接 $f(a), f(b)$。在 $\R$ 中：区间是凸的，所以道路连通；反之，若 $A$ 道路连通，$a < c < b$，$a, b \in A$，则连接 $a, b$ 的道路 $\gamma$ 是 $[0,1]$ 上的实值连续函数，由 L1 的介值定理，某个 $\gamma(t) = c$，所以 $c \in A$，$A$ 是区间。
:::

::: cor id=tvi-general zh="广义介值定理" en="Generalised intermediate value theorem" fr="Théorème des valeurs intermédiaires généralisé" ru="Обобщённая теорема о промежуточном значении" lvl=1
若 $A$ 道路连通，$f : A \to \R$ 连续，则 $f(A)$ 是区间。
:::

::: proof
由 {@image-connexe}，$f(A)$ 是 $\R$ 的道路连通子集，即区间。
:::

::: rem
一般拓扑中还有「连通」的概念（不能分成两个不交的非空相对开集）。道路连通 ⇒ 连通，反之不成立：拓扑学家的正弦曲线 $\{(x, \sin\frac1x) : x > 0\} \cup (\{0\} \times [-1,1])$ 连通但不道路连通。在 $\R^n$ 的**开集**上两者等价。
:::

## 拓展：Baire 定理

::: thm id=baire zh="Baire 纲定理" en="Baire category theorem" fr="Théorème de Baire" ru="Теорема Бэра о категориях" lvl=2
在 Banach 空间中，可数个稠密开集的交仍然稠密。等价地：可数个无内点的闭集的并没有内点。
:::

::: sketch
设 $U_n$ 是稠密开集，$B_0$ 是任一开球。由稠密性 $B_0 \cap U_1 \ne \varnothing$，它是开集，含一个闭球 $\overline{B}_1$，半径 $\le 1$。依次取 $\overline{B}_{n} \subset B_{n-1} \cap U_n$，半径 $\le \frac1n$。球心构成 Cauchy 列，极限属于所有 $\overline{B}_n$，从而属于 $B_0 \cap \bigcap U_n$。
:::

::: thm id=banach-nulle-part zh="处处不可导函数的普遍性" en="Generic continuous functions are nowhere differentiable" fr="Les fonctions continues nulle part dérivables sont génériques" ru="Типичная непрерывная функция нигде не дифференцируема" lvl=3 ref="Banach, *Studia Math.* 3 (1931)；Oxtoby, *Measure and Category*，第 11 章"
在 $(\Cc([0,1]), \norm{\cdot}_\infty)$ 中，处处不可导的函数构成一个稠密 $G_\delta$ 集（可数个稠密开集的交）。从 Baire 的意义上说，「绝大多数」连续函数处处不可导。
:::

::: hist zh="Banach 的基问题"
Banach 在 1932 年问：可分 Banach 空间是否都有 Schauder 基？这个问题悬而未决四十年，直到 Per Enflo 在 1973 年构造出反例。Mazur 曾为与之密切相关的「逼近问题」（Scottish Book 第 153 题）悬赏一只活鹅。Enflo 构造的空间不具有逼近性质，而有 Schauder 基的空间一定具有逼近性质，所以同时回答了两个问题；他也因此领取了这只鹅。
:::
