L1 已经接触过级数的定义和正项级数的基本判别法。本章系统化这些内容，并加入两个法国大纲特有的主题：**渐近关系的求和**（sommation des relations de comparaison）和**可和族**（familles sommables）。可和族让「任意顺序求和」「二重级数交换次序」有了干净的理论基础。全章 $(u_n)$ 是 $\K$ 中的数列，必要时也可以取值于 Banach 空间。

## 基本概念

::: def id=def-serie zh="级数、部分和、收敛" en="Series, partial sums, convergence" fr="Série, sommes partielles, convergence" ru="Ряд, частичные суммы, сходимость"
级数 $\sum u_n$ 是指部分和数列 $S_n = \sum_{k=0}^n u_k$。若 $(S_n)$ 收敛到 $S$，称级数**收敛**，$S = \sum_{n=0}^{\infty} u_n$ 称为它的**和**，$R_n = S - S_n = \sum_{k > n} u_k$ 称为**余项**。否则称级数**发散**。
:::

::: prop id=cn-grossiere zh="收敛的必要条件" en="Term test for divergence" fr="Divergence grossière" ru="Необходимое условие сходимости ряда" lvl=1
若 $\sum u_n$ 收敛，则 $u_n \to 0$。若 $u_n \not\to 0$，称级数**粗发散**（diverge grossièrement）。
:::

::: proof
$u_n = S_n - S_{n-1} \to S - S = 0$。
:::

::: ex id=ex-harmonique lvl=1
几何级数 $\sum q^n$ 当且仅当 $\abs{q} < 1$ 时收敛，和为 $\frac{1}{1-q}$。调和级数 $\sum \frac1n$ 发散，尽管 $\frac1n \to 0$：
$$S_{2n} - S_n = \sum_{k=n+1}^{2n} \frac1k \ge n \cdot \frac{1}{2n} = \frac12,$$
所以 $(S_n)$ 不是 Cauchy 列。
:::

::: prop id=cauchy-series zh="级数的 Cauchy 准则" en="Cauchy criterion for series" fr="Critère de Cauchy pour les séries" ru="Критерий Коши сходимости ряда" lvl=1
在 $\K$（或任一 Banach 空间）中，$\sum u_n$ 收敛，当且仅当
$$\forall \eps > 0,\ \exists N,\ \forall q > p \ge N,\quad \Big\lVert \sum_{k=p+1}^q u_k \Big\rVert < \eps.$$
:::

::: proof
这正是 $(S_n)$ 是 Cauchy 列的定义，而 $\K$ 完备。
:::

::: prop id=serie-telescopique zh="级数与数列的对应" en="Telescoping series" fr="Lien suite–série (séries télescopiques)" ru="Телескопический ряд" lvl=1
数列 $(a_n)$ 收敛，当且仅当级数 $\sum (a_{n+1} - a_n)$ 收敛。
:::

::: proof
部分和 $\sum_{k=0}^{n} (a_{k+1} - a_k) = a_{n+1} - a_0$。
:::

这个看似平凡的对应是研究数列渐近行为的有力工具，见下文 {@euler-gamma}。

## 正项级数

本节设 $u_n \ge 0$。此时 $(S_n)$ 单调递增，所以**正项级数收敛当且仅当部分和有界**。

::: thm id=comparaison zh="比较定理" en="Comparison test" fr="Théorème de comparaison" ru="Признак сравнения" lvl=1
设 $u_n, v_n \ge 0$。

1. 若 $u_n \le v_n$（从某项起）且 $\sum v_n$ 收敛，则 $\sum u_n$ 收敛；若 $\sum u_n$ 发散，则 $\sum v_n$ 发散。
2. 若 $u_n = O(v_n)$ 且 $\sum v_n$ 收敛，则 $\sum u_n$ 收敛。
3. 若 $u_n \sim v_n$，则两个级数同敛散。
:::

::: proof
1. 部分和满足 $S_n(u) \le S_n(v) + C$（$C$ 补偿前面有限项），有界性传递。
2. $u_n \le M v_n$（从某项起），用 1。
3. $u_n \sim v_n$ 蕴含从某项起 $\frac12 v_n \le u_n \le 2 v_n$，用 1 的两个方向。
:::

::: cex id=cex-equiv-signe lvl=1
第 3 条对变号级数不成立。$u_n = \frac{(-1)^n}{\sqrt n} + \frac1n$ 与 $v_n = \frac{(-1)^n}{\sqrt n}$ 等价，$\sum v_n$ 收敛（交错级数，{@csa}），但 $\sum u_n$ 发散（等于收敛级数加上调和级数）。
:::

::: thm id=serie-integrale zh="级数–积分比较" en="Integral test" fr="Comparaison série–intégrale" ru="Интегральный признак Коши–Маклорена" lvl=1
设 $f : [n_0, +\infty[ \to \R_+$ 连续递减。则对 $n > n_0$：
$$\int_n^{n+1} f \le f(n) \le \int_{n-1}^n f.$$
因此 $\sum f(n)$ 收敛当且仅当 $\int_{n_0}^{x} f$ 在 $x \to +\infty$ 时有界。
:::

::: proof
对 $t \in [n, n+1]$，$f(n+1) \le f(t) \le f(n)$，积分即得左边；把 $n$ 换成 $n-1$ 得右边。对 $n$ 求和，部分和被积分夹住。
:::

::: thm id=riemann-series zh="Riemann 级数" en="p-series" fr="Séries de Riemann" ru="Обобщённый гармонический ряд" lvl=1
$\sum \dfrac{1}{n^\alpha}$ 收敛 $\iff \alpha > 1$。
:::

::: proof
$\alpha \le 0$ 时粗发散。$\alpha > 0$ 时对 $f(t) = t^{-\alpha}$ 用 {@serie-integrale}：$\int_1^x t^{-\alpha}\,\dd t$ 在 $\alpha > 1$ 时有界（$\le \frac{1}{\alpha - 1}$），在 $\alpha \le 1$ 时趋于 $+\infty$。
:::

::: thm id=bertrand zh="Bertrand 级数" en="Bertrand series" fr="Séries de Bertrand" ru="Ряды Бертрана" lvl=2
$\sum \dfrac{1}{n^\alpha (\ln n)^\beta}$ 收敛，当且仅当 $\alpha > 1$，或 $\alpha = 1$ 且 $\beta > 1$。
:::

::: sketch
$\alpha \ne 1$ 时与 $n^{-(1+\alpha)/2}$ 比较（对数因子被幂次吸收）。$\alpha = 1$ 时用级数–积分比较：$t \mapsto \frac{1}{t (\ln t)^\beta}$ 最终递减，其原函数是 $\frac{(\ln t)^{1-\beta}}{1-\beta}$（$\beta \ne 1$）或 $\ln \ln t$（$\beta = 1$）。
:::

::: thm id=dalembert zh="d'Alembert 判别法（比值判别法）" en="Ratio test" fr="Règle de d'Alembert" ru="Признак Даламбера" lvl=1
设 $u_n > 0$，$\dfrac{u_{n+1}}{u_n} \to \ell \in [0, +\infty]$。若 $\ell < 1$，级数收敛；若 $\ell > 1$，级数粗发散；$\ell = 1$ 时不能判断。
:::

::: proof
若 $\ell < 1$，取 $q \in \left]\ell, 1\right[$，从某个 $N$ 起 $u_{n+1} \le q u_n$，于是 $u_n \le u_N q^{n-N}$，与几何级数比较。若 $\ell > 1$，从某项起 $u_{n+1} > u_n$，$u_n$ 不趋于 $0$。$\sum \frac1n$ 与 $\sum \frac1{n^2}$ 都有 $\ell = 1$，说明 $\ell = 1$ 时无法判断。
:::

::: thm id=cauchy-racine zh="Cauchy 根值判别法" en="Root test" fr="Règle de Cauchy" ru="Радикальный признак Коши" lvl=1
设 $u_n \ge 0$，$\sqrt[n]{u_n} \to \ell$。$\ell < 1$ 时收敛，$\ell > 1$ 时粗发散。更一般地，用 $\limsup \sqrt[n]{u_n}$ 代替极限，结论仍成立（这是第 4 章 Cauchy–Hadamard 公式的来源）。
:::

::: proof
$\ell < 1$ 时取 $q \in \left]\ell, 1\right[$，从某项起 $u_n \le q^n$。$\ell > 1$ 时从某项起 $u_n \ge 1$。
:::

::: thm id=raabe zh="Raabe–Duhamel 判别法" en="Raabe's test" fr="Règle de Raabe–Duhamel" ru="Признак Раабе" lvl=2
设 $u_n > 0$，$\dfrac{u_{n+1}}{u_n} = 1 - \dfrac{\alpha}{n} + o\Big(\dfrac1n\Big)$。$\alpha > 1$ 时收敛，$\alpha < 1$ 时发散。
:::

::: sketch
与 $v_n = n^{-\beta}$ 比较：$\frac{v_{n+1}}{v_n} = 1 - \frac{\beta}{n} + o(\frac1n)$。$\alpha > 1$ 时取 $1 < \beta < \alpha$，则从某项起 $\frac{u_{n+1}}{u_n} \le \frac{v_{n+1}}{v_n}$，即 $\frac{u_n}{v_n}$ 递减，所以 $u_n = O(v_n)$。$\alpha < 1$ 时取 $\alpha < \beta < 1$，反向论证。更精细地，用 $\ln u_n$ 的展开可以得到 $u_n \sim C n^{-\alpha}$（当余项为 $O(n^{-2})$ 时）。
:::

::: method zh="判别法的使用顺序"
1. 先看 $u_n \to 0$ 是否成立。
2. 找 $u_n$ 的等价量或上界（Taylor 展开），与 Riemann 级数或 Bertrand 级数比较。这是法国大纲最推崇的方法。
3. 含阶乘或 $n$ 次幂时用 d'Alembert 或 Cauchy。
4. 比值趋于 $1$ 时，展开 $\frac{u_{n+1}}{u_n}$ 到 $\frac1n$ 阶，用 Raabe–Duhamel。
:::

## 渐近关系的求和

::: thm id=sommation-relations zh="渐近关系的求和" en="Summation of asymptotic relations" fr="Sommation des relations de comparaison" ru="Суммирование асимптотических соотношений" lvl=1
设 $v_n > 0$，$u_n \in \K$。

1. （收敛情形）若 $\sum v_n$ 收敛且 $u_n = o(v_n)$，则 $\sum u_n$ 收敛，且余项满足 $\sum_{k > n} u_k = o\big(\sum_{k > n} v_k\big)$。$O$ 与 $\sim$ 的版本同理。
2. （发散情形）若 $\sum v_n$ 发散且 $u_n = o(v_n)$，则部分和满足 $\sum_{k \le n} u_k = o\big(\sum_{k \le n} v_k\big)$。$O$ 与 $\sim$ 的版本同理。
:::

::: proof
**收敛情形。** $\sum u_n$ 绝对收敛（比较定理）。给定 $\eps > 0$，存在 $N$，$k \ge N$ 时 $\abs{u_k} \le \eps v_k$。于是对 $n \ge N$，$\big|\sum_{k>n} u_k\big| \le \eps \sum_{k>n} v_k$。

**发散情形。** 记 $V_n = \sum_{k \le n} v_k \to +\infty$。给定 $\eps$，取 $N$ 使 $k > N$ 时 $\abs{u_k} \le \eps v_k$。对 $n > N$，
$$\Big|\sum_{k \le n} u_k\Big| \le \Big|\sum_{k \le N} u_k\Big| + \eps V_n.$$
第一项是常数，而 $V_n \to +\infty$，所以 $n$ 充分大时它 $\le \eps V_n$，总和 $\le 2\eps V_n$。

$\sim$ 的版本：$u_n \sim v_n$ 即 $u_n - v_n = o(v_n)$，对 $u_n - v_n$ 应用上面的结论。
:::

::: ex id=euler-gamma zh="Euler 常数" lvl=1
令 $a_n = H_n - \ln n$，$H_n = \sum_{k=1}^n \frac1k$。则
$$a_{n+1} - a_n = \frac{1}{n+1} - \ln\Big(1 + \frac1n\Big) = -\frac{1}{2n^2} + O\Big(\frac{1}{n^3}\Big),$$
这是收敛级数的通项，由 {@serie-telescopique}，$(a_n)$ 收敛到某个常数 $\gamma$。因此
$$H_n = \ln n + \gamma + o(1), \qquad \gamma \approx 0.5772156649.$$
再用 {@sommation-relations} 的收敛情形处理余项，可以得到 $H_n = \ln n + \gamma + \frac{1}{2n} + o\big(\frac1n\big)$。
:::

::: thm id=stirling-serie zh="Stirling 公式" en="Stirling's formula" fr="Formule de Stirling" ru="Формула Стирлинга" lvl=2
$$n! \sim \sqrt{2\pi n}\, \Big(\frac{n}{\e}\Big)^n.$$
:::

::: sketch
令 $a_n = \ln\big(n!\, \e^n n^{-n-1/2}\big)$。计算得 $a_{n+1} - a_n = 1 - (n + \tfrac12)\ln(1 + \tfrac1n) = O(\frac{1}{n^2})$，所以 $(a_n)$ 收敛，$n! \sim C\sqrt{n}\,(n/\e)^n$。常数 $C = \sqrt{2\pi}$ 由 Wallis 积分 $W_n = \int_0^{\pi/2} \cos^n t\,\dd t$ 决定：$W_{2n} = \frac{(2n)!}{4^n (n!)^2}\frac{\pi}{2}$ 且 $W_n \sim \sqrt{\pi / (2n)}$。第 7 章会用 $\Gamma$ 函数给出另一个证明。
:::

## 一般项级数

::: def zh="绝对收敛" en="Absolute convergence" fr="Convergence absolue" ru="Абсолютная сходимость"
若 $\sum \abs{u_n}$ 收敛，称 $\sum u_n$ **绝对收敛**。收敛但不绝对收敛的级数称为**半收敛**（条件收敛）。
:::

::: prop lvl=1
绝对收敛的级数收敛，且 $\big|\sum u_n\big| \le \sum \abs{u_n}$。
:::

::: proof
这是 {@serie-abs-banach} 在 $\K$ 上的特例。
:::

::: thm id=csa zh="交错级数判别法" en="Alternating series test" fr="Critère spécial des séries alternées" ru="Признак Лейбница" lvl=1
设 $(a_n)$ 递减趋于 $0$。则 $\sum (-1)^n a_n$ 收敛，其和 $S$ 介于任意相邻两个部分和之间，余项满足
$$\abs{R_n} \le a_{n+1}, \qquad R_n \text{ 与 } (-1)^{n+1} \text{ 同号}.$$
:::

::: proof
$S_{2n+2} - S_{2n} = a_{2n+2} - a_{2n+1} \le 0$，$S_{2n+3} - S_{2n+1} = -a_{2n+3} + a_{2n+2} \ge 0$，且 $S_{2n+1} - S_{2n} = -a_{2n+1} \to 0$。所以 $(S_{2n})$ 与 $(S_{2n+1})$ 是相邻数列（suites adjacentes），收敛到同一极限 $S$，并且 $S_{2n+1} \le S \le S_{2n}$。于是 $\abs{R_n} = \abs{S - S_n} \le \abs{S_{n+1} - S_n} = a_{n+1}$，符号由 $S$ 所在的一侧决定。
:::

::: ex
$\sum \frac{(-1)^{n+1}}{n} = \ln 2$（第 4 章用幂级数证明），$\sum \frac{(-1)^n}{2n+1} = \frac{\pi}{4}$（Leibniz 公式）。两者都半收敛。
:::

::: thm id=abel-transform zh="Abel 变换（分部求和）" en="Summation by parts" fr="Transformation d'Abel" ru="Преобразование Абеля" lvl=1
记 $B_n = \sum_{k=0}^n b_k$。则
$$\sum_{k=0}^{n} a_k b_k = a_n B_n - \sum_{k=0}^{n-1} (a_{k+1} - a_k)\, B_k.$$
:::

::: proof
$b_k = B_k - B_{k-1}$（$B_{-1} = 0$），所以 $\sum_{k=0}^n a_k b_k = \sum_{k=0}^n a_k B_k - \sum_{k=0}^{n-1} a_{k+1} B_k$，合并即得。这是分部积分 $\int f g' = fg - \int f' g$ 的离散版本。
:::

::: thm id=dirichlet-series zh="Dirichlet 判别法" en="Dirichlet's test" fr="Règle d'Abel (critère de Dirichlet)" ru="Признак Дирихле" lvl=1
设 $(a_n)$ 是实数列，递减趋于 $0$；$(b_n)$ 的部分和 $B_n$ 有界。则 $\sum a_n b_n$ 收敛。
:::

::: proof
设 $\abs{B_n} \le M$。在 {@abel-transform} 中，$a_n B_n \to 0$；而 $\abs{(a_{k+1} - a_k) B_k} \le M (a_k - a_{k+1})$，后者是收敛的望远镜级数（和为 $M a_0$）的通项，所以 $\sum (a_{k+1} - a_k) B_k$ 绝对收敛。两项都有极限，所以部分和收敛。
:::

::: ex id=ex-sin-n lvl=1
对 $\theta \notin 2\pi\Z$，$\sum \frac{\e^{\ii n\theta}}{n}$ 收敛，因为
$$\Big|\sum_{k=0}^{n} \e^{\ii k\theta}\Big| = \Big|\frac{1 - \e^{\ii(n+1)\theta}}{1 - \e^{\ii\theta}}\Big| \le \frac{1}{\abs{\sin(\theta/2)}}.$$
特别地 $\sum \frac{\sin n}{n}$、$\sum \frac{\cos n}{n}$ 收敛。但 $\sum \frac{\abs{\sin n}}{n}$ 发散：由 $\abs{\sin n} \ge \sin^2 n = \frac{1 - \cos 2n}{2}$，它的部分和至少是发散级数 $\sum\frac{1}{2n}$ 减去收敛级数。
:::

## 重排

::: def zh="重排" en="Rearrangement" fr="Permutation des termes" ru="Перестановка членов ряда"
设 $\sigma : \N \to \N$ 是双射。级数 $\sum u_{\sigma(n)}$ 称为 $\sum u_n$ 的一个**重排**。
:::

::: thm id=commutativite zh="绝对收敛级数的交换律" en="Rearrangements of absolutely convergent series" fr="Sommation dans un ordre quelconque" ru="Перестановка абсолютно сходящегося ряда" lvl=1
若 $\sum u_n$ 绝对收敛，则对任何双射 $\sigma$，$\sum u_{\sigma(n)}$ 绝对收敛，且和不变。
:::

::: proof
先设 $u_n \ge 0$。对任何 $n$，$\{\sigma(0), \dots, \sigma(n)\} \subset \{0, \dots, N\}$（$N = \max_{k \le n} \sigma(k)$），所以 $\sum_{k \le n} u_{\sigma(k)} \le S$，重排后的和 $S' \le S$。对 $\sigma^{-1}$ 同理得 $S \le S'$。

一般情形：绝对收敛性由上面的结论得到。给定 $\eps$，取 $N$ 使 $\sum_{k > N} \abs{u_k} < \eps$，再取 $M$ 使 $\{0, \dots, N\} \subset \sigma(\{0, \dots, M\})$。对 $m \ge M$，$\sum_{k \le m} u_{\sigma(k)} - \sum_{k \le N} u_k$ 只包含下标 $> N$ 的项，绝对值 $< \eps$。所以两个和相差不超过 $2\eps$。
:::

::: thm id=riemann-rearrangement zh="Riemann 重排定理" en="Riemann series theorem" fr="Théorème de réarrangement de Riemann" ru="Теорема Римана о перестановке членов ряда" lvl=1
设 $\sum u_n$ 是半收敛的实数级数。则对任意 $s \in [-\infty, +\infty]$，存在重排 $\sigma$，使 $\sum u_{\sigma(n)} = s$。
:::

::: proof
设 $s \in \R$（无穷的情形类似）。把正项和负项分开：$p_n = \max(u_n, 0)$，$q_n = \max(-u_n, 0)$。由于 $\sum u_n$ 收敛而 $\sum \abs{u_n} = \sum (p_n + q_n)$ 发散，$\sum p_n$ 和 $\sum q_n$ 都发散到 $+\infty$（若其中一个收敛，另一个等于它与 $\sum u_n$ 的组合，也收敛，矛盾）。

贪心构造：按原顺序依次取正项，直到部分和首次 $> s$；再依次取负项，直到部分和首次 $\le s$；如此交替。因为 $\sum p_n = \sum q_n = +\infty$，每一步都在有限步内完成，且每个项最终都被使用，所以这确实是一个重排。

每次「越过」$s$ 后，部分和与 $s$ 的距离不超过最后加入的那一项的绝对值。由于 $u_n \to 0$，且每一轮都至少用到一个新的正项和一个新的负项，这些「越界量」趋于 $0$，所以部分和收敛到 $s$。
:::

::: demo id=rearrange
交错调和级数 $\sum \frac{(-1)^{n+1}}{n}$ 按原顺序收敛到 $\ln 2$（灰色）。拖动「目标和」，演示按上面证明中的贪心算法重排各项（蓝色），部分和收敛到任意指定的值。
:::

::: thm id=levy-steinitz zh="Lévy–Steinitz 定理" en="Lévy–Steinitz theorem" fr="Théorème de Lévy–Steinitz" ru="Теорема Леви–Стейница" lvl=3 ref="Rosenthal, *The remarkable theorem of Lévy and Steinitz*, Amer. Math. Monthly 94 (1987)"
在 $\R^d$ 中，收敛级数所有重排之和构成的集合是一个仿射子空间（可能是单点）。$d = 1$ 时正是 Riemann 定理的二择一：单点（绝对收敛）或整条直线（半收敛）。
:::

## 可和族

法国 MP 2021 大纲用**可和族**统一处理「无序求和」：指标集 $I$ 可以是任意可数集，例如 $\N^2$。

::: def id=def-sommable-pos zh="非负可和族" en="Summable family (non-negative)" fr="Famille sommable de réels positifs" ru="Суммируемое семейство неотрицательных чисел"
设 $(u_i)_{i \in I}$ 是非负实数族。定义
$$\sum_{i \in I} u_i = \sup\Big\{\sum_{i \in J} u_i : J \subset I \text{ 有限}\Big\} \in [0, +\infty].$$
若它有限，称该族**可和**（sommable）。
:::

::: thm id=paquets-pos zh="非负族的分组求和" en="Summation by packets (non-negative case)" fr="Théorème de sommation par paquets (cas positif)" ru="Суммирование по группам (неотрицательный случай)" lvl=1
设 $I = \bigsqcup_{n \in \N} I_n$ 是一个划分，$u_i \ge 0$。则（在 $[0, +\infty]$ 中）
$$\sum_{i \in I} u_i = \sum_{n=0}^{\infty} \Big(\sum_{i \in I_n} u_i\Big).$$
:::

::: proof
记左边为 $S$，右边为 $T$，$S_n = \sum_{i \in I_n} u_i$。

$S \le T$：任一有限集 $J \subset I$ 只与有限个 $I_n$ 相交，$\sum_{J} u_i = \sum_n \sum_{J \cap I_n} u_i \le \sum_{n \le N} S_n \le T$。

$T \le S$：设 $T' < T$（$T' \in \R$），取 $N$ 使 $\sum_{n \le N} S_n > T'$，再在每个 $I_n$（$n \le N$）中取有限集 $J_n$，使 $\sum_{n \le N} \sum_{J_n} u_i > T'$。$J = \bigcup J_n$ 是有限集，所以 $S > T'$。
:::

::: def id=def-sommable zh="一般可和族" en="Summable family" fr="Famille sommable de complexes" ru="Суммируемое семейство"
复数族 $(u_i)$ 称为**可和**，如果 $(\abs{u_i})$ 可和。此时把实部、虚部分解为正部与负部，各自是非负可和族，定义 $\sum u_i$ 为它们的相应线性组合。对 $I = \N$，可和等价于绝对收敛。
:::

::: thm id=paquets zh="分组求和定理" en="Summation by packets" fr="Théorème de sommation par paquets" ru="Теорема о суммировании по группам" lvl=2
若 $(u_i)_{i \in I}$ 可和，$I = \bigsqcup I_n$，则每个 $(u_i)_{i \in I_n}$ 可和，$\sum_n \sum_{i \in I_n} u_i$ 绝对收敛，且等于 $\sum_{i \in I} u_i$。
:::

::: sketch
分解 $u = (a^+ - a^-) + \ii(b^+ - b^-)$，每一部分都是被 $\abs{u}$ 控制的非负可和族，对每一部分用 {@paquets-pos}，再利用线性组合。
:::

::: thm id=fubini-series zh="二重级数的 Fubini 定理" en="Fubini's theorem for double series" fr="Théorème de Fubini pour les sommes doubles" ru="Теорема о повторных рядах" lvl=2
设 $(u_{p,q})_{(p,q) \in \N^2}$ 满足 $\sum_p \sum_q \abs{u_{p,q}} < +\infty$。则该族可和，且
$$\sum_{p=0}^\infty \sum_{q=0}^\infty u_{p,q} = \sum_{q=0}^\infty \sum_{p=0}^\infty u_{p,q} = \sum_{(p,q) \in \N^2} u_{p,q}.$$
对非负族，不需要任何假设，等式在 $[0, +\infty]$ 中总成立。
:::

::: sketch
对 $\abs{u}$ 按行划分 $\N^2 = \bigsqcup_p (\{p\} \times \N)$，用 {@paquets-pos} 得到可和性；再分别按行、按列划分用 {@paquets}。
:::

::: cex id=cex-fubini lvl=1
可和性不能省略。令 $u_{p,p} = 1$，$u_{p,p+1} = -1$，其余为 $0$。每一行的和是 $0$，所以 $\sum_p \sum_q u_{p,q} = 0$；而按列求和，第 $0$ 列和为 $1$，其余列和为 $0$，所以 $\sum_q \sum_p u_{p,q} = 1$。
:::

::: thm id=produit-cauchy zh="Cauchy 乘积" en="Cauchy product" fr="Produit de Cauchy" ru="Произведение рядов по Коши" lvl=1
若 $\sum a_n$、$\sum b_n$ 绝对收敛，令 $c_n = \sum_{k=0}^n a_k b_{n-k}$，则 $\sum c_n$ 绝对收敛，且
$$\sum_{n=0}^\infty c_n = \Big(\sum_{n=0}^\infty a_n\Big)\Big(\sum_{n=0}^\infty b_n\Big).$$
:::

::: proof
族 $(a_p b_q)_{(p,q) \in \N^2}$ 可和：由 {@fubini-series} 的非负情形，$\sum_{p,q} \abs{a_p}\abs{b_q} = \sum \abs{a_p} \sum \abs{b_q} < \infty$。按「行」划分得到 $\sum_p a_p \sum_q b_q$；按反对角线 $I_n = \{(p,q) : p + q = n\}$ 划分得到 $\sum_n c_n$。由 {@paquets} 两者相等，且 $\sum \abs{c_n} \le \sum_n \sum_{I_n} \abs{a_p b_q} < \infty$。
:::

::: thm id=mertens zh="Mertens 定理" en="Mertens' theorem" fr="Théorème de Mertens" ru="Теорема Мертенса" lvl=3 ref="Hardy, *Divergent Series*，§10"
只要 $\sum a_n$ 绝对收敛、$\sum b_n$ 收敛，Cauchy 乘积就收敛到两和之积。
:::

::: cex lvl=1
两个级数都只是半收敛时，Cauchy 乘积可能发散。取 $a_n = b_n = \frac{(-1)^n}{\sqrt{n+1}}$，则
$$\abs{c_n} = \sum_{k=0}^n \frac{1}{\sqrt{(k+1)(n-k+1)}} \ge \sum_{k=0}^n \frac{2}{n+2} = \frac{2(n+1)}{n+2},$$
（用了 $\sqrt{xy} \le \frac{x+y}{2}$），所以 $c_n \not\to 0$。
:::

## 拓展：ζ 函数与开放问题

::: thm id=euler-produit zh="Euler 乘积公式" en="Euler product formula" fr="Produit eulérien" ru="Тождество Эйлера" lvl=2
对 $s > 1$，记 $\zeta(s) = \sum_{n \ge 1} n^{-s}$，$p$ 取遍素数，则
$$\zeta(s) = \prod_{p} \frac{1}{1 - p^{-s}}.$$
推论：$\sum_p \frac1p$ 发散，从而素数有无穷多个。
:::

::: sketch
把 $\frac{1}{1 - p^{-s}} = \sum_k p^{-ks}$ 展开。对 $p \le N$ 的素数相乘，由算术基本定理，乘积等于所有素因子 $\le N$ 的整数 $n$ 的 $n^{-s}$ 之和（非负族的任意顺序求和），它与 $\zeta(s)$ 相差至多 $\sum_{n > N} n^{-s} \to 0$。取 $s \to 1^+$ 并取对数，$\ln \zeta(s) = \sum_p \frac{1}{p^s} + O(1)$，而 $\zeta(s) \to +\infty$。
:::

::: hist zh="Basel 问题与 Apéry 定理"
Euler 在 1734 年得到 $\zeta(2) = \frac{\pi^2}{6}$（第 5 章用 Parseval 恒等式证明），并一般地给出 $\zeta(2k)$ 是 $\pi^{2k}$ 的有理倍数。奇数点的值至今没有闭式。1978 年 Apéry 证明 $\zeta(3)$ 是无理数；2000 年 Rivoal 证明无穷多个 $\zeta(2k+1)$ 是无理数；Zudilin 证明 $\zeta(5), \zeta(7), \zeta(9), \zeta(11)$ 中至少一个是无理数。
:::

::: open zh="未解决问题"
1. **Euler 常数 $\gamma$ 是否为无理数？** 至今未知。
2. **$\zeta(5)$ 是否为无理数？** 至今未知。
3. **Erdős 等差数列猜想**：若正整数集 $A$ 满足 $\sum_{a \in A} \frac1a = +\infty$，则 $A$ 含有任意长的等差数列。素数的情形由 Green–Tao 定理（2004）解决；由 {@euler-produit}，素数正好满足这个条件。
:::
