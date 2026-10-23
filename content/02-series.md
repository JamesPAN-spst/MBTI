L1 已经接触过级数的定义和正项级数的基本判别法。本章系统化这些内容，并加入两个法国大纲特有的主题：**渐近关系的求和**（sommation des relations de comparaison）和**可和族**（familles sommables）。可和族让「任意顺序求和」「二重级数交换次序」有了干净的理论基础。全章 $(u_n)$ 是 $\K$ 中的数列，必要时也可以取值于 Banach 空间。

记号：$\K = \R$ 或 $\C$。「从某项起」（法语 *à partir d'un certain rang*，缩写 APCR）指「存在 $N \in \N$，使对一切 $n \ge N$」——每次用到它，都要说清这个 $N$ 是从哪个结论来的。$E(x)$ 表示实数 $x$ 的整数部分。

## 基本概念

级数是「把无穷多个数加起来」的严格化：先算前 $n$ 项的有限和，再问这些有限和是否有极限。本节给出定义，并建立最基本的几个工具：粗发散（通项不趋于 0 则发散）、几何级数、线性、Cauchy 准则、级数与数列的对应。

::: def id=def-serie zh="级数、部分和、收敛" en="Series, partial sums, convergence" fr="Série, sommes partielles, convergence" ru="Ряд, частичные суммы, сходимость"
设 $(u_n)_{n \ge 0}$ 是 $\K$ 中的数列。对 $n \in \N$，令
$$S_n = \sum_{k=0}^{n} u_k,$$
称为第 $n$ 个**部分和**。数列 $(S_n)_{n \ge 0}$ 称为以 $u_n$ 为**通项**的**级数**，记作 $\sum u_n$ 或 $\sum_{n \ge 0} u_n$。

若存在 $S \in \K$，使 $(S_n)$ 收敛到 $S$，即
$$\forall \eps > 0,\ \exists N \in \N,\ \forall n \ge N,\quad \abs{S_n - S} < \eps,$$
称级数**收敛**，$S$ 称为它的**和**，记作 $S = \sum_{n=0}^{+\infty} u_n$；此时对每个 $n$，$R_n = S - S_n$ 称为 $n$ 阶**余项**。否则称级数**发散**。

白话：级数收敛，就是「前 $n$ 项之和」随 $n$ 增大而稳定在某个数 $S$ 附近。
:::

::: fr
Soit $(u_n)_{n \ge 0}$ une suite d'éléments de $\K$. Pour $n \in \N$, on pose
$$S_n = \sum_{k=0}^{n} u_k ;$$
c'est la **somme partielle** d'indice $n$. La suite $(S_n)_{n \ge 0}$ s'appelle la **série** de **terme général** $u_n$ et se note $\sum u_n$ ou $\sum_{n \ge 0} u_n$.

S'il existe $S \in \K$ tel que $(S_n)$ converge vers $S$, c'est-à-dire
$$\forall \eps > 0,\ \exists N \in \N,\ \forall n \ge N,\quad \abs{S_n - S} < \eps,$$
on dit que la série **converge** ; $S$ est sa **somme**, notée $S = \sum_{n=0}^{+\infty} u_n$, et pour tout $n$, $R_n = S - S_n$ est le **reste** d'ordre $n$. Sinon, on dit que la série **diverge**.

Autrement dit : la série converge lorsque la somme des $n$ premiers termes se stabilise, quand $n$ grandit, autour d'un nombre $S$.
:::

::: rem
**三个不同的对象**（正如数列 $u$、它的项 $u_n$、它的值集 $u(\N)$ 是三个不同的对象）。

1. $\sum u_n$ 是一个**数列**（部分和数列），无论收敛与否都有意义。
2. $S_n$ 是一个**数**：有限和。
3. $\sum_{n=0}^{+\infty} u_n$ 也是一个数，但**只有在级数收敛时才有定义**。写下「$\sum_{n=0}^{+\infty} u_n$」之前，先要证明收敛。

**下标的起点。** 级数也可以从 $n_0$ 开始：$\sum_{n \ge n_0} u_n$，部分和 $S_n = \sum_{k=n_0}^n u_k$（$n \ge n_0$）。例如调和级数 $\sum_{n \ge 1} \frac1n$。

**余项本身是一个级数的和。** 设 $\sum u_n$ 收敛，和为 $S$。固定 $n$，对 $m > n$，$\sum_{k=n+1}^{m} u_k = S_m - S_n \xrightarrow[m \to \infty]{} S - S_n$。所以级数 $\sum_{k \ge n+1} u_k$ 收敛，和正是 $R_n$：
$$R_n = \sum_{k=n+1}^{+\infty} u_k, \qquad R_n = S - S_n \xrightarrow[n \to \infty]{} 0.$$
:::

::: ex id=c2-ex-def zh="直接用定义判断" lvl=1
1. $\sum_{n \ge 0} 1$：$S_n = n + 1 \to +\infty$，发散。
2. $\sum_{n \ge 0} (-1)^n$：$n$ 为偶数时 $S_n = 1$，为奇数时 $S_n = 0$。子列 $(S_{2n})$ 与 $(S_{2n+1})$ 的极限不同，所以 $(S_n)$ 发散，级数发散。
3. $\sum_{n \ge 0} \frac{1}{2^{n+1}}$：$S_n = \frac12 \cdot \frac{1 - (1/2)^{n+1}}{1 - 1/2} = 1 - \frac{1}{2^{n+1}} \to 1$。级数收敛，和为 $1$，余项 $R_n = \frac{1}{2^{n+1}}$。
:::

::: prop id=cn-grossiere zh="收敛的必要条件" en="Term test for divergence" fr="Divergence grossière" ru="Необходимое условие сходимости ряда" lvl=1
若 $\sum u_n$ 收敛，则 $u_n \to 0$。等价地（逆否命题）：若 $u_n \not\to 0$，则 $\sum u_n$ 发散；此时称级数**粗发散**（diverge grossièrement）。
:::

::: fr
Si la série $\sum u_n$ converge, alors $u_n \to 0$. De manière équivalente (contraposée) : si $(u_n)$ ne tend pas vers $0$, la série $\sum u_n$ diverge ; on dit alors qu'elle **diverge grossièrement**.
:::

::: proof
▷ 思路：通项是两个相邻部分和之差，$u_n = S_n - S_{n-1}$；两个部分和都接近 $S$，所以它们的差接近 $0$。我们要证：对任意 $\eps > 0$，存在 $N$，使对一切 $n \ge N$，$\abs{u_n} < \eps$。

**第 1 步（翻译假设）**　设 $\sum u_n$ 收敛，和为 $S$。取 $\eps > 0$。由 {@def-serie}，存在 $N_1 \in \N$，使对一切 $n \ge N_1$，$\abs{S_n - S} < \eps/2$。

**第 2 步（构造 $N$）**　令 $N = N_1 + 1$。设 $n \ge N$，则 $n \ge N_1$ 且 $n - 1 \ge N_1$，所以
$$\begin{aligned}
\abs{u_n} &= \abs{S_n - S_{n-1}} && \text{（}n \ge 1\text{ 时 } u_n = S_n - S_{n-1}\text{）}\\
&\le \abs{S_n - S} + \abs{S - S_{n-1}} && \text{（三角不等式）}\\
&< \tfrac{\eps}{2} + \tfrac{\eps}{2} = \eps && \text{（第 1 步，} n \ge N_1,\ n - 1 \ge N_1\text{）}.
\end{aligned}$$

这就证明了 $u_n \to 0$。逆否命题是同一命题的等价说法。
:::

::: fr
▷ Méthode : le terme général est la différence de deux sommes partielles consécutives, $u_n = S_n - S_{n-1}$ ; ces deux sommes sont proches de $S$, donc leur différence est proche de $0$. On veut montrer : pour tout $\eps > 0$, il existe $N$ tel que pour tout $n \ge N$, $\abs{u_n} < \eps$.

**Étape 1 (on traduit l'hypothèse)**　Supposons que $\sum u_n$ converge, de somme $S$. Soit $\eps > 0$. D'après la {@fr:def-serie}, il existe $N_1 \in \N$ tel que pour tout $n \ge N_1$, $\abs{S_n - S} < \eps/2$.

**Étape 2 (construction de $N$)**　Posons $N = N_1 + 1$. Soit $n \ge N$ ; alors $n \ge N_1$ et $n - 1 \ge N_1$, donc
$$\begin{aligned}
\abs{u_n} &= \abs{S_n - S_{n-1}} && \text{(pour } n \ge 1,\ u_n = S_n - S_{n-1}\text{)}\\
&\le \abs{S_n - S} + \abs{S - S_{n-1}} && \text{(inégalité triangulaire)}\\
&< \tfrac{\eps}{2} + \tfrac{\eps}{2} = \eps && \text{(étape 1, car } n \ge N_1,\ n - 1 \ge N_1\text{)}.
\end{aligned}$$

Ceci montre que $u_n \to 0$. La contraposée n'est qu'une reformulation équivalente.
:::

::: rem
**逆命题不成立**：$u_n \to 0$ 不能推出 $\sum u_n$ 收敛，反例是调和级数（{@ex-harmonique}）。所以 {@cn-grossiere} 只用来**证明发散**：例如 $\sum (-1)^n$（$\abs{u_n} = 1$）、$\sum n \sin\frac1n$（$u_n \to 1$）、$\sum \big(1 + \frac1n\big)^n$（$u_n \to \e$）都粗发散。拿到一个级数，第一件事就是看通项是否趋于 $0$。
:::

::: prop id=c2-geom zh="几何级数" en="Geometric series" fr="Série géométrique" ru="Геометрический ряд" lvl=1
设 $q \in \K$。几何级数 $\sum_{n \ge 0} q^n$ 收敛当且仅当 $\abs{q} < 1$。此时
$$\sum_{n=0}^{+\infty} q^n = \frac{1}{1-q}, \qquad R_n = \sum_{k=n+1}^{+\infty} q^k = \frac{q^{n+1}}{1-q}.$$
:::

::: fr
Soit $q \in \K$. La série géométrique $\sum_{n \ge 0} q^n$ converge si et seulement si $\abs{q} < 1$. Dans ce cas,
$$\sum_{n=0}^{+\infty} q^n = \frac{1}{1-q}, \qquad R_n = \sum_{k=n+1}^{+\infty} q^k = \frac{q^{n+1}}{1-q}.$$
:::

::: proof
▷ 思路：几何级数的部分和有封闭形式，直接求极限；发散的方向用 {@cn-grossiere}。

**第 1 步（部分和）**　若 $q = 1$，则 $S_n = n + 1$。若 $q \ne 1$，展开 $(1 - q)(1 + q + \dots + q^n)$，中间的项两两抵消，得 $1 - q^{n+1}$，所以
$$S_n = \frac{1 - q^{n+1}}{1 - q} \qquad (q \ne 1).$$

**第 2 步（$\abs{q} < 1$ 时收敛）**　此时 $q \ne 1$，且 $\abs{q^{n+1}} = \abs{q}^{n+1} \to 0$（L1：$0 \le r < 1$ 时 $r^n \to 0$）。由第 1 步，$S_n \to \frac{1}{1-q}$，余项为
$$R_n = \frac{1}{1-q} - \frac{1 - q^{n+1}}{1-q} = \frac{q^{n+1}}{1-q}.$$

**第 3 步（$\abs{q} \ge 1$ 时发散）**　此时对一切 $n$，$\abs{q^n} = \abs{q}^n \ge 1$，所以 $q^n \not\to 0$。由 {@cn-grossiere}，级数粗发散。（$q = 1$ 的情形也包含在内。）

由第 2、3 步，$\sum q^n$ 收敛当且仅当 $\abs{q} < 1$。
:::

::: fr
▷ Méthode : les sommes partielles d'une série géométrique ont une forme close, dont on calcule la limite ; pour la divergence, on utilise la {@fr:cn-grossiere}.

**Étape 1 (sommes partielles)**　Si $q = 1$, alors $S_n = n + 1$. Si $q \ne 1$, en développant $(1 - q)(1 + q + \dots + q^n)$, les termes intermédiaires se télescopent et il reste $1 - q^{n+1}$, donc
$$S_n = \frac{1 - q^{n+1}}{1 - q} \qquad (q \ne 1).$$

**Étape 2 (convergence si $\abs{q} < 1$)**　Alors $q \ne 1$ et $\abs{q^{n+1}} = \abs{q}^{n+1} \to 0$ (L1 : si $0 \le r < 1$, $r^n \to 0$). D'après l'étape 1, $S_n \to \frac{1}{1-q}$, et le reste vaut
$$R_n = \frac{1}{1-q} - \frac{1 - q^{n+1}}{1-q} = \frac{q^{n+1}}{1-q}.$$

**Étape 3 (divergence si $\abs{q} \ge 1$)**　Pour tout $n$, $\abs{q^n} = \abs{q}^n \ge 1$, donc $(q^n)$ ne tend pas vers $0$. D'après la {@fr:cn-grossiere}, la série diverge grossièrement. (Le cas $q = 1$ est inclus.)

Les étapes 2 et 3 montrent que $\sum q^n$ converge si et seulement si $\abs{q} < 1$.
:::

::: ex id=ex-harmonique zh="调和级数" lvl=1
调和级数 $\sum_{n \ge 1} \frac1n$ 发散，尽管 $\frac1n \to 0$。（对照几何级数 {@c2-geom}：那里通项以指数速度趋于 0。）

记 $H_n = \sum_{k=1}^n \frac1k$。对 $n \ge 1$，和式 $\sum_{k=n+1}^{2n} \frac1k$ 有 $n$ 项，每一项满足 $\frac1k \ge \frac1{2n}$（因为 $k \le 2n$），所以
$$H_{2n} - H_n = \sum_{k=n+1}^{2n} \frac1k \ge n \cdot \frac{1}{2n} = \frac12.$$
反设 $(H_n)$ 收敛到 $H$。$(H_{2n})$ 是它的子列，也收敛到 $H$，于是 $H_{2n} - H_n \to H - H = 0$，与 $H_{2n} - H_n \ge \frac12$ 矛盾。所以 $(H_n)$ 发散；又因为 $(H_n)$ 递增，由单调极限定理，$H_n \to +\infty$。用 Cauchy 准则（{@cauchy-series}）的语言：$(H_n)$ 不是 Cauchy 列。

后面会得到更精确的 $H_n = \ln n + \gamma + o(1)$（{@euler-gamma}）。
:::

::: prop id=c2-linearite zh="线性；修改有限项" en="Linearity; changing finitely many terms" fr="Linéarité ; modification d'un nombre fini de termes" ru="Линейность; изменение конечного числа членов ряда" lvl=1
设 $\sum u_n$、$\sum v_n$ 是 $\K$ 中的级数，$\lambda \in \K$。

1. 若 $\sum u_n$ 与 $\sum v_n$ 都收敛，则 $\sum (u_n + \lambda v_n)$ 收敛，且 $\sum_{n=0}^{+\infty}(u_n + \lambda v_n) = \sum_{n=0}^{+\infty} u_n + \lambda \sum_{n=0}^{+\infty} v_n$。
2. 若 $\sum u_n$ 收敛而 $\sum v_n$ 发散，则 $\sum (u_n + v_n)$ 发散。
3. 若存在 $N_0$，使对一切 $n \ge N_0$，$u_n = v_n$，则 $\sum u_n$ 与 $\sum v_n$ 同敛散（和一般不同）。
:::

::: fr
Soient $\sum u_n$ et $\sum v_n$ deux séries à termes dans $\K$ et $\lambda \in \K$.

1. Si $\sum u_n$ et $\sum v_n$ convergent, alors $\sum (u_n + \lambda v_n)$ converge et $\sum_{n=0}^{+\infty}(u_n + \lambda v_n) = \sum_{n=0}^{+\infty} u_n + \lambda \sum_{n=0}^{+\infty} v_n$.
2. Si $\sum u_n$ converge et $\sum v_n$ diverge, alors $\sum (u_n + v_n)$ diverge.
3. S'il existe $N_0$ tel que pour tout $n \ge N_0$, $u_n = v_n$, alors $\sum u_n$ et $\sum v_n$ sont de même nature (leurs sommes diffèrent en général).
:::

::: proof
▷ 思路：部分和是有限和，满足线性；再用数列极限的运算法则。记 $U_n = \sum_{k=0}^n u_k$，$V_n = \sum_{k=0}^n v_k$。

**第 1 步（第 1 条）**　由有限和的线性，$\sum_{k=0}^n (u_k + \lambda v_k) = U_n + \lambda V_n$。由假设 $U_n \to U$、$V_n \to V$，由数列极限的运算法则，$U_n + \lambda V_n \to U + \lambda V$。

**第 2 步（第 2 条）**　反设 $\sum (u_n + v_n)$ 收敛。对收敛级数 $\sum (u_n + v_n)$ 与 $\sum u_n$ 用第 1 条（$\lambda = -1$），得 $\sum \big((u_n + v_n) - u_n\big) = \sum v_n$ 收敛，与假设矛盾。

**第 3 步（第 3 条）**　令 $C = \sum_{k=0}^{N_0 - 1} (u_k - v_k)$（$N_0 = 0$ 时 $C = 0$）。对 $n \ge N_0$，
$$U_n - V_n = \sum_{k=0}^{N_0-1} (u_k - v_k) + \sum_{k=N_0}^{n} \underbrace{(u_k - v_k)}_{=\,0} = C.$$
于是对 $n \ge N_0$，$U_n = V_n + C$：$(U_n)$ 收敛当且仅当 $(V_n)$ 收敛，且收敛时 $\sum_{n=0}^{+\infty} u_n = \sum_{n=0}^{+\infty} v_n + C$。
:::

::: fr
▷ Méthode : les sommes partielles sont des sommes finies, donc linéaires ; on conclut par les opérations sur les limites. Notons $U_n = \sum_{k=0}^n u_k$ et $V_n = \sum_{k=0}^n v_k$.

**Étape 1 (point 1)**　Par linéarité des sommes finies, $\sum_{k=0}^n (u_k + \lambda v_k) = U_n + \lambda V_n$. Par hypothèse $U_n \to U$ et $V_n \to V$ ; par opérations sur les limites, $U_n + \lambda V_n \to U + \lambda V$.

**Étape 2 (point 2)**　Par l'absurde, supposons que $\sum (u_n + v_n)$ converge. En appliquant le point 1 (avec $\lambda = -1$) aux séries convergentes $\sum (u_n + v_n)$ et $\sum u_n$, on obtient que $\sum \big((u_n + v_n) - u_n\big) = \sum v_n$ converge : contradiction.

**Étape 3 (point 3)**　Posons $C = \sum_{k=0}^{N_0 - 1} (u_k - v_k)$ (avec $C = 0$ si $N_0 = 0$). Pour $n \ge N_0$,
$$U_n - V_n = \sum_{k=0}^{N_0-1} (u_k - v_k) + \sum_{k=N_0}^{n} \underbrace{(u_k - v_k)}_{=\,0} = C.$$
Ainsi $U_n = V_n + C$ pour $n \ge N_0$ : $(U_n)$ converge si et seulement si $(V_n)$ converge, et dans ce cas $\sum_{n=0}^{+\infty} u_n = \sum_{n=0}^{+\infty} v_n + C$.
:::

::: rem
1. 两个**发散**级数之和可以收敛：$u_n = 1$、$v_n = -1$。所以「发散 + 发散」什么也说不出。
2. 第 3 条说明：判断敛散性时只需看通项「从某项起」的行为。以后所有判别法里的不等式都只要求从某项起成立。
:::

::: prop id=cauchy-series zh="级数的 Cauchy 准则" en="Cauchy criterion for series" fr="Critère de Cauchy pour les séries" ru="Критерий Коши сходимости ряда" lvl=1
在 $\K$（或任一 Banach 空间）中，$\sum u_n$ 收敛，当且仅当
$$\forall \eps > 0,\ \exists N,\ \forall q > p \ge N,\quad \Big\lVert \sum_{k=p+1}^q u_k \Big\rVert < \eps.$$
:::

::: fr
Dans $\K$ (ou dans un espace de Banach quelconque), la série $\sum u_n$ converge si et seulement si
$$\forall \eps > 0,\ \exists N,\ \forall q > p \ge N,\quad \Big\lVert \sum_{k=p+1}^q u_k \Big\rVert < \eps.$$
:::

::: proof
▷ 思路：$\sum_{k=p+1}^{q} u_k = S_q - S_p$，所以准则说的正是「$(S_n)$ 是 Cauchy 列」；再用空间的完备性。

**第 1 步（改写条件）**　对 $q > p \ge 0$，$S_q - S_p = \sum_{k=p+1}^q u_k$。所以准则中的条件就是
$$\forall \eps > 0,\ \exists N,\ \forall q > p \ge N,\quad \norm{S_q - S_p} < \eps.$$
由于 $\norm{S_p - S_q} = \norm{S_q - S_p}$，且 $p = q$ 时差为 $0$，这正是「$(S_n)$ 是 Cauchy 列」的定义（{@def-banach}）。

**第 2 步 (⇒)**　设 $S_n \to S$。取 $\eps > 0$，存在 $N$，使对一切 $n \ge N$，$\norm{S_n - S} < \eps/2$。对 $q > p \ge N$，
$$\norm{S_q - S_p} \le \norm{S_q - S} + \norm{S - S_p} < \tfrac{\eps}{2} + \tfrac{\eps}{2} = \eps \qquad \text{（三角不等式）}.$$
由第 1 步，准则成立。

**第 3 步 (⇐)**　设准则成立。由第 1 步，$(S_n)$ 是 Cauchy 列。$\K$ 是完备的（L1：$\R$ 中 Cauchy 列收敛；在 $\C$ 中对实部、虚部分别用），Banach 空间按定义是完备的，所以 $(S_n)$ 收敛，即 $\sum u_n$ 收敛。
:::

::: fr
▷ Méthode : $\sum_{k=p+1}^{q} u_k = S_q - S_p$, donc le critère dit exactement que « $(S_n)$ est de Cauchy » ; on conclut par la complétude de l'espace.

**Étape 1 (reformulation)**　Pour $q > p \ge 0$, $S_q - S_p = \sum_{k=p+1}^q u_k$. La condition du critère s'écrit donc
$$\forall \eps > 0,\ \exists N,\ \forall q > p \ge N,\quad \norm{S_q - S_p} < \eps.$$
Comme $\norm{S_p - S_q} = \norm{S_q - S_p}$ et que la différence est nulle pour $p = q$, c'est exactement la définition de « $(S_n)$ est une suite de Cauchy » ({@fr:def-banach}).

**Étape 2 (⇒)**　Supposons $S_n \to S$. Soit $\eps > 0$ ; il existe $N$ tel que pour tout $n \ge N$, $\norm{S_n - S} < \eps/2$. Pour $q > p \ge N$,
$$\norm{S_q - S_p} \le \norm{S_q - S} + \norm{S - S_p} < \tfrac{\eps}{2} + \tfrac{\eps}{2} = \eps \qquad \text{(inégalité triangulaire)}.$$
D'après l'étape 1, le critère est vérifié.

**Étape 3 (⇐)**　Supposons le critère vérifié. D'après l'étape 1, $(S_n)$ est de Cauchy. Or $\K$ est complet (L1 : toute suite de Cauchy de $\R$ converge ; dans $\C$, on raisonne sur les parties réelle et imaginaire), et un espace de Banach est complet par définition. Donc $(S_n)$ converge, c'est-à-dire que $\sum u_n$ converge.
:::

::: rem
1. **用途**：Cauchy 准则不需要事先知道和是多少，就能证明收敛。绝对收敛（{@c2-abs-cv}）与 Dirichlet 判别法（{@dirichlet-series}）都靠它。
2. **否定形式**：$\sum u_n$ 发散，当且仅当
   $$\exists \eps > 0,\ \forall N,\ \exists q > p \ge N,\quad \Big\lVert \sum_{k=p+1}^q u_k \Big\rVert \ge \eps.$$
   调和级数（{@ex-harmonique}）正是这样：取 $\eps = \frac12$；对任意 $N$，取 $p = \max(N, 1)$、$q = 2p$，则 $\sum_{k=p+1}^{2p} \frac1k \ge \frac12$。
:::

::: prop id=serie-telescopique zh="级数与数列的对应" en="Telescoping series" fr="Lien suite–série (séries télescopiques)" ru="Телескопический ряд" lvl=1
数列 $(a_n)$ 收敛，当且仅当级数 $\sum (a_{n+1} - a_n)$ 收敛。此时
$$\sum_{n=0}^{+\infty} (a_{n+1} - a_n) = \lim_{n \to \infty} a_n - a_0.$$
:::

::: fr
La suite $(a_n)$ converge si et seulement si la série $\sum (a_{n+1} - a_n)$ converge. Dans ce cas,
$$\sum_{n=0}^{+\infty} (a_{n+1} - a_n) = \lim_{n \to \infty} a_n - a_0.$$
:::

::: proof
▷ 思路：部分和「望远镜式」地相消，只剩首尾两项。

**第 1 步（计算部分和）**　在第一个和中令 $j = k + 1$：
$$S_n = \sum_{k=0}^{n} (a_{k+1} - a_k) = \sum_{j=1}^{n+1} a_j - \sum_{k=0}^{n} a_k = a_{n+1} - a_0,$$
因为 $a_1, \dots, a_n$ 在两个和中各出现一次，相互抵消。

**第 2 步（结论）**　由第 1 步，$(S_n)$ 收敛当且仅当 $(a_{n+1})_n$ 收敛；而 $(a_{n+1})_n$ 收敛当且仅当 $(a_n)$ 收敛（平移一位不改变收敛性与极限）。收敛时，$\sum_{n=0}^{+\infty} (a_{n+1} - a_n) = \lim S_n = \lim a_n - a_0$。
:::

::: fr
▷ Méthode : les sommes partielles se télescopent ; il ne reste que le premier et le dernier terme.

**Étape 1 (calcul des sommes partielles)**　Dans la première somme, on pose $j = k + 1$ :
$$S_n = \sum_{k=0}^{n} (a_{k+1} - a_k) = \sum_{j=1}^{n+1} a_j - \sum_{k=0}^{n} a_k = a_{n+1} - a_0,$$
car $a_1, \dots, a_n$ apparaissent une fois dans chaque somme et se compensent.

**Étape 2 (conclusion)**　D'après l'étape 1, $(S_n)$ converge si et seulement si $(a_{n+1})_n$ converge, ce qui équivaut à la convergence de $(a_n)$ (un décalage d'indice ne change ni la convergence ni la limite). Dans ce cas, $\sum_{n=0}^{+\infty} (a_{n+1} - a_n) = \lim S_n = \lim a_n - a_0$.
:::

这个看似平凡的对应是研究数列渐近行为的有力工具：要证明数列 $(a_n)$ 收敛，只需证明级数 $\sum (a_{n+1} - a_n)$ 收敛，而后者常常可以用下一节的比较方法处理。见下文 {@euler-gamma} 与 {@stirling-serie}。

::: ex id=c2-ex-telescop zh="望远镜级数" lvl=1
1. $\sum_{n \ge 1} \frac{1}{n(n+1)} = 1$。令 $a_n = -\frac1n$（$n \ge 1$），则 $a_{n+1} - a_n = \frac1n - \frac{1}{n+1} = \frac{1}{n(n+1)}$。$a_n \to 0$，由 {@serie-telescopique}（下标从 $1$ 开始），和为 $\lim a_n - a_1 = 0 - (-1) = 1$。
2. $\sum_{n \ge 1} \ln\big(1 + \frac1n\big)$ 发散：$\ln\big(1 + \frac1n\big) = \ln(n+1) - \ln n$，而 $a_n = \ln n \to +\infty$ 不收敛。
3. 由 $\ln(1 + x) \le x$（$x > -1$，凹函数在切线下方）得 $\ln\big(1 + \frac1n\big) \le \frac1n$；于是第 2 条与比较定理（{@comparaison}）再次说明调和级数发散。
:::

::: q
若 $\sum u_n$ 收敛，$\sum u_{2n}$ 是否一定收敛？若再假设 $u_n \ge 0$ 呢？
:::

::: ans
不一定。取 $u_n = \frac{(-1)^n}{n+1}$：$\sum u_n$ 收敛（交错级数判别法 {@csa}），但 $u_{2n} = \frac{1}{2n+1} \ge \frac{1}{2(n+1)}$，而 $\sum \frac{1}{2(n+1)}$ 是调和级数（{@ex-harmonique}）的倍数，发散；由比较定理（{@comparaison}），$\sum u_{2n}$ 发散。

若 $u_n \ge 0$，则成立：记 $S = \sum_{n=0}^{+\infty} u_n$，部分和递增，所以 $\sum_{k=0}^{n} u_{2k} \le \sum_{k=0}^{2n} u_k \le S$。$\sum u_{2n}$ 的部分和有界，由 {@c2-pos-bornee} 收敛。
:::

::: q
设 $u_n \to 0$，且 $(S_{2n})$ 收敛到 $S$。证明 $\sum u_n$ 收敛到 $S$。条件 $u_n \to 0$ 能去掉吗？
:::

::: ans
**第 1 步**　$S_{2n+1} = S_{2n} + u_{2n+1} \to S + 0 = S$。

**第 2 步（偶数项与奇数项拼起来）**　取 $\eps > 0$。存在 $N_1$，使 $n \ge N_1$ 时 $\abs{S_{2n} - S} < \eps$；存在 $N_2$，使 $n \ge N_2$ 时 $\abs{S_{2n+1} - S} < \eps$。令 $N = \max(2N_1, 2N_2 + 1)$。设 $m \ge N$：若 $m = 2n$，则 $n \ge N_1$；若 $m = 2n + 1$，则 $2n + 1 \ge 2N_2 + 1$，即 $n \ge N_2$。两种情形都有 $\abs{S_m - S} < \eps$。

条件不能去掉：$u_n = (-1)^n$ 时 $S_{2n} = 1$ 收敛，但级数粗发散。这个「偶数项、奇数项分别处理」的技巧会在 {@csa} 的证明中用到。
:::

## 正项级数

通项非负时，部分和单调递增，「是否收敛」化为「部分和是否有界」。于是可以把待研究的级数与已知敛散性的级数（几何级数、Riemann 级数）逐项比较。本节设 $u_n \ge 0$（由 {@c2-linearite} 第 3 条，只需从某项起成立）。

::: rem
**记号回顾**（L1）。下面的定义都写成量词形式，证明中「翻译假设」时直接使用。

1. $u_n = o(v_n)$：$\forall \eps > 0,\ \exists N,\ \forall n \ge N,\ \abs{u_n} \le \eps \abs{v_n}$。
2. $u_n = O(v_n)$：$\exists M \ge 0,\ \exists N,\ \forall n \ge N,\ \abs{u_n} \le M \abs{v_n}$。
3. $u_n \sim v_n$：$u_n - v_n = o(v_n)$。当 $v_n$ 从某项起不为 $0$ 时，这等价于 $\frac{u_n}{v_n} \to 1$。
:::

::: lem id=c2-pos-bornee zh="正项级数收敛当且仅当部分和有界" en="A series of non-negative terms converges iff its partial sums are bounded" fr="Une série à termes positifs converge si et seulement si ses sommes partielles sont majorées" ru="Ряд с неотрицательными членами сходится тогда и только тогда, когда его частичные суммы ограничены" lvl=1
设对一切 $n$，$u_n \ge 0$。则部分和 $(S_n)$ 递增，并且：

1. $\sum u_n$ 收敛，当且仅当 $(S_n)$ 有上界；此时 $\sum_{n=0}^{+\infty} u_n = \sup_{n} S_n$，特别地对一切 $n$，$S_n \le \sum_{k=0}^{+\infty} u_k$。
2. 若 $\sum u_n$ 发散，则 $S_n \to +\infty$。此时记 $\sum_{n=0}^{+\infty} u_n = +\infty$。
:::

::: fr
Supposons $u_n \ge 0$ pour tout $n$. La suite des sommes partielles $(S_n)$ est croissante et :

1. $\sum u_n$ converge si et seulement si $(S_n)$ est majorée ; dans ce cas $\sum_{n=0}^{+\infty} u_n = \sup_{n} S_n$ ; en particulier, pour tout $n$, $S_n \le \sum_{k=0}^{+\infty} u_k$.
2. Si $\sum u_n$ diverge, alors $S_n \to +\infty$. On note alors $\sum_{n=0}^{+\infty} u_n = +\infty$.
:::

::: proof
▷ 思路：这是单调极限定理（L1）对部分和数列的直接应用。

**第 1 步（单调性）**　对一切 $n$，$S_{n+1} - S_n = u_{n+1} \ge 0$，所以 $(S_n)$ 递增。

**第 2 步（第 1 条）**　(⇒) 收敛数列有界，特别地有上界。(⇐) 若 $(S_n)$ 递增且有上界，由单调极限定理，$(S_n)$ 收敛到 $\sup_n S_n$；递增数列的每一项都不超过上确界，所以 $S_n \le \sum_{k=0}^{+\infty} u_k$。

**第 3 步（第 2 条）**　若 $\sum u_n$ 发散，由第 1 条，$(S_n)$ 无上界。由单调极限定理，递增且无上界的数列趋于 $+\infty$：对任意 $A$，存在 $N$ 使 $S_N > A$，于是对 $n \ge N$，$S_n \ge S_N > A$。
:::

::: fr
▷ Méthode : c'est le théorème de la limite monotone (L1) appliqué à la suite des sommes partielles.

**Étape 1 (monotonie)**　Pour tout $n$, $S_{n+1} - S_n = u_{n+1} \ge 0$ : la suite $(S_n)$ est croissante.

**Étape 2 (point 1)**　(⇒) Une suite convergente est bornée, donc majorée. (⇐) Si $(S_n)$ est croissante et majorée, le théorème de la limite monotone montre qu'elle converge vers $\sup_n S_n$ ; chaque terme d'une suite croissante est majoré par sa borne supérieure, donc $S_n \le \sum_{k=0}^{+\infty} u_k$.

**Étape 3 (point 2)**　Si $\sum u_n$ diverge, $(S_n)$ n'est pas majorée d'après le point 1. Une suite croissante non majorée tend vers $+\infty$ : pour tout $A$, il existe $N$ tel que $S_N > A$, et alors pour $n \ge N$, $S_n \ge S_N > A$.
:::

::: thm id=comparaison zh="比较定理" en="Comparison test" fr="Théorème de comparaison" ru="Признак сравнения" lvl=1
设对一切 $n$，$u_n \ge 0$，$v_n \ge 0$。

1. 若从某项起 $u_n \le v_n$，且 $\sum v_n$ 收敛，则 $\sum u_n$ 收敛。等价地（逆否），若 $\sum u_n$ 发散，则 $\sum v_n$ 发散。
2. 若 $u_n = O(v_n)$（特别地，若 $u_n = o(v_n)$），且 $\sum v_n$ 收敛，则 $\sum u_n$ 收敛。
3. 若 $u_n \sim v_n$，则两个级数同敛散。
:::

::: fr
Soient $(u_n)$ et $(v_n)$ telles que $u_n \ge 0$ et $v_n \ge 0$ pour tout $n$.

1. Si $u_n \le v_n$ à partir d'un certain rang et si $\sum v_n$ converge, alors $\sum u_n$ converge. De manière équivalente (contraposée), si $\sum u_n$ diverge, alors $\sum v_n$ diverge.
2. Si $u_n = O(v_n)$ (en particulier si $u_n = o(v_n)$) et si $\sum v_n$ converge, alors $\sum u_n$ converge.
3. Si $u_n \sim v_n$, les deux séries sont de même nature.
:::

::: proof
▷ 思路：正项级数收敛当且仅当部分和有界（{@c2-pos-bornee}）；不等式 $u_n \le v_n$ 把 $\sum v_n$ 部分和的上界传给 $\sum u_n$。第 2、3 条都化为第 1 条。记 $U_n = \sum_{k=0}^n u_k$，$V_n = \sum_{k=0}^n v_k$。

**第 1 步（第 1 条）**　翻译假设：存在 $N_0$，使对一切 $n \ge N_0$，$u_n \le v_n$。设 $\sum v_n$ 收敛，记 $V = \sum_{n=0}^{+\infty} v_n$；由 {@c2-pos-bornee}，对一切 $n$，$V_n \le V$。令 $C = \sum_{k=0}^{N_0 - 1} u_k$（$N_0 = 0$ 时 $C = 0$）。对 $n \ge N_0$，
$$\begin{aligned}
U_n &= C + \sum_{k=N_0}^{n} u_k \le C + \sum_{k=N_0}^{n} v_k && \text{（}k \ge N_0\text{ 时 } u_k \le v_k\text{）}\\
&\le C + V_n \le C + V && \text{（}v_k \ge 0\text{；引理 } V_n \le V\text{）}.
\end{aligned}$$
对 $n < N_0$，$U_n \le C$（因为 $u_k \ge 0$）。所以对一切 $n$，$U_n \le C + V$。由 {@c2-pos-bornee}，$\sum u_n$ 收敛。第二句是第一句的逆否命题。

**第 2 步（第 2 条）**　翻译假设：存在 $M \ge 0$ 与 $N_1$，使对一切 $n \ge N_1$，$u_n \le M v_n$（$u_n, v_n \ge 0$，绝对值可以去掉）。由 {@c2-linearite}，$\sum M v_n$ 收敛；对 $u_n$ 与 $M v_n$ 用第 1 条，$\sum u_n$ 收敛。若 $u_n = o(v_n)$：在 $o$ 的定义中取 $\eps = 1$，得到 $N_1$ 使 $n \ge N_1$ 时 $u_n \le v_n$，即 $u_n = O(v_n)$（$M = 1$）。

**第 3 步（第 3 条）**　翻译假设：$u_n - v_n = o(v_n)$。取 $\eps = \frac12$，存在 $N_2$，使对一切 $n \ge N_2$，$\abs{u_n - v_n} \le \frac12 v_n$，即
$$\tfrac12 v_n \le u_n \le \tfrac32 v_n \qquad (n \ge N_2).$$
若 $\sum v_n$ 收敛，则 $\sum \frac32 v_n$ 收敛，由右边的不等式和第 1 条，$\sum u_n$ 收敛。若 $\sum u_n$ 收敛，则 $\sum 2u_n$ 收敛，由左边的不等式 $v_n \le 2u_n$ 和第 1 条，$\sum v_n$ 收敛。所以两个级数同敛散。
:::

::: fr
▷ Méthode : une série à termes positifs converge si et seulement si ses sommes partielles sont majorées ({@fr:c2-pos-bornee}) ; l'inégalité $u_n \le v_n$ transmet le majorant des sommes partielles de $\sum v_n$ à celles de $\sum u_n$. Les points 2 et 3 se ramènent au point 1. On note $U_n = \sum_{k=0}^n u_k$ et $V_n = \sum_{k=0}^n v_k$.

**Étape 1 (point 1)**　On traduit l'hypothèse : il existe $N_0$ tel que pour tout $n \ge N_0$, $u_n \le v_n$. Supposons que $\sum v_n$ converge et notons $V = \sum_{n=0}^{+\infty} v_n$ ; d'après le {@fr:c2-pos-bornee}, $V_n \le V$ pour tout $n$. Posons $C = \sum_{k=0}^{N_0 - 1} u_k$ (avec $C = 0$ si $N_0 = 0$). Pour $n \ge N_0$,
$$\begin{aligned}
U_n &= C + \sum_{k=N_0}^{n} u_k \le C + \sum_{k=N_0}^{n} v_k && \text{(car } u_k \le v_k \text{ pour } k \ge N_0\text{)}\\
&\le C + V_n \le C + V && \text{(car } v_k \ge 0 \text{ et } V_n \le V\text{)}.
\end{aligned}$$
Pour $n < N_0$, $U_n \le C$ (car $u_k \ge 0$). Ainsi $U_n \le C + V$ pour tout $n$ et, d'après le {@fr:c2-pos-bornee}, $\sum u_n$ converge. La seconde phrase est la contraposée de la première.

**Étape 2 (point 2)**　On traduit l'hypothèse : il existe $M \ge 0$ et $N_1$ tels que pour tout $n \ge N_1$, $u_n \le M v_n$ (les valeurs absolues disparaissent car $u_n, v_n \ge 0$). D'après la {@fr:c2-linearite}, $\sum M v_n$ converge ; le point 1 appliqué à $u_n$ et $M v_n$ montre que $\sum u_n$ converge. Si $u_n = o(v_n)$ : en prenant $\eps = 1$ dans la définition de $o$, on obtient $N_1$ tel que $u_n \le v_n$ pour $n \ge N_1$, c'est-à-dire $u_n = O(v_n)$ avec $M = 1$.

**Étape 3 (point 3)**　On traduit l'hypothèse : $u_n - v_n = o(v_n)$. Avec $\eps = \frac12$, il existe $N_2$ tel que pour tout $n \ge N_2$, $\abs{u_n - v_n} \le \frac12 v_n$, c'est-à-dire
$$\tfrac12 v_n \le u_n \le \tfrac32 v_n \qquad (n \ge N_2).$$
Si $\sum v_n$ converge, alors $\sum \frac32 v_n$ converge, et l'inégalité de droite avec le point 1 donne la convergence de $\sum u_n$. Si $\sum u_n$ converge, alors $\sum 2u_n$ converge, et l'inégalité de gauche $v_n \le 2u_n$ avec le point 1 donne la convergence de $\sum v_n$. Les deux séries sont donc de même nature.
:::

::: cex id=cex-equiv-signe lvl=1
第 3 条对变号级数不成立。对 $n \ge 1$，令
$$u_n = \frac{(-1)^n}{\sqrt n} + \frac1n, \qquad v_n = \frac{(-1)^n}{\sqrt n}.$$

1. $u_n \sim v_n$：$\frac{u_n}{v_n} = 1 + \frac{(-1)^n}{\sqrt n} \to 1$。
2. $\sum v_n$ 收敛：$\big(\frac{1}{\sqrt n}\big)$ 递减趋于 $0$，由交错级数判别法（{@csa}）。
3. $\sum u_n$ 发散：$u_n = v_n + \frac1n$，$\sum v_n$ 收敛而 $\sum \frac1n$ 发散（{@ex-harmonique}），由 {@c2-linearite} 第 2 条。

问题出在 $v_n$ 不定号：证明第 3 步中，由 $\abs{u_n - v_n} \le \frac12 \abs{v_n}$ 推出 $\frac12 v_n \le u_n$ 用到了 $v_n \ge 0$。
:::

::: rem
1. **正性只需从某项起成立**：由 {@c2-linearite} 第 3 条。若从某项起 $v_n \le 0$，对 $-u_n$、$-v_n$ 用定理即可。真正不能去掉的是「定号」，见 {@cex-equiv-signe}。
2. 比较定理只回答「收敛还是发散」。部分和、余项之间的定量关系见 {@sommation-relations}。
3. 实际使用时，第 3 条最常用：用 Taylor 展开求出 $u_n$ 的等价量，再与 Riemann 级数（{@riemann-series}）或 Bertrand 级数（{@bertrand}）比较。
:::

::: thm id=serie-integrale zh="级数–积分比较" en="Integral test" fr="Comparaison série–intégrale" ru="Интегральный признак Коши–Маклорена" lvl=1
设 $n_0 \in \N$，$f : [n_0, +\infty[ \to \R_+$ 连续且递减。

1. 对一切整数 $n \ge n_0 + 1$，
   $$\int_n^{n+1} f(t)\,\dd t \le f(n) \le \int_{n-1}^n f(t)\,\dd t$$
   （左边的不等式对 $n = n_0$ 也成立）。
2. 级数 $\sum_{n \ge n_0} f(n)$ 收敛，当且仅当函数 $x \mapsto \int_{n_0}^{x} f(t)\,\dd t$ 在 $[n_0, +\infty[$ 上有界；等价地，当且仅当 $\int_{n_0}^{x} f(t)\,\dd t$ 在 $x \to +\infty$ 时有有限极限。
:::

::: fr
Soient $n_0 \in \N$ et $f : [n_0, +\infty[ \to \R_+$ continue et décroissante.

1. Pour tout entier $n \ge n_0 + 1$,
   $$\int_n^{n+1} f(t)\,\dd t \le f(n) \le \int_{n-1}^n f(t)\,\dd t$$
   (l'inégalité de gauche vaut aussi pour $n = n_0$).
2. La série $\sum_{n \ge n_0} f(n)$ converge si et seulement si la fonction $x \mapsto \int_{n_0}^{x} f(t)\,\dd t$ est bornée sur $[n_0, +\infty[$ ; de manière équivalente, si et seulement si $\int_{n_0}^{x} f(t)\,\dd t$ admet une limite finie quand $x \to +\infty$.
:::

::: proof
▷ 思路：$f$ 递减，所以在每个区间 $[k, k+1]$ 上 $f$ 被夹在两个端点的值之间；积分得到第 1 条，再求和，部分和就被积分夹住，有界性互相传递。

**第 1 步（单个区间上的不等式）**　设整数 $k \ge n_0$。对 $t \in [k, k+1]$，由 $f$ 递减，$f(k+1) \le f(t) \le f(k)$。在长度为 $1$ 的区间 $[k, k+1]$ 上积分（积分保序）：
$$f(k+1) \le \int_k^{k+1} f(t)\,\dd t \le f(k) \qquad (k \ge n_0). \qquad (*)$$
右半边取 $k = n$（$n \ge n_0$）得 $\int_n^{n+1} f \le f(n)$；左半边取 $k = n - 1$（要求 $n - 1 \ge n_0$）得 $f(n) \le \int_{n-1}^n f$。这就是第 1 条。

**第 2 步（部分和被积分夹住）**　记 $F(x) = \int_{n_0}^x f(t)\,\dd t$（$x \ge n_0$），$S_n = \sum_{k=n_0}^n f(k)$（$n \ge n_0$）。因为 $f \ge 0$，$F$ 递增。把 $(*)$ 的右半边对 $k = n_0, \dots, n$ 求和（Chasles 关系）：
$$F(n+1) = \sum_{k=n_0}^{n} \int_k^{k+1} f \le \sum_{k=n_0}^n f(k) = S_n.$$
把 $(*)$ 的左半边对 $k = n_0, \dots, n-1$ 求和（$n \ge n_0 + 1$）：
$$S_n - f(n_0) = \sum_{k=n_0}^{n-1} f(k+1) \le \sum_{k=n_0}^{n-1}\int_k^{k+1} f = F(n);$$
$n = n_0$ 时两边都是 $0$。于是对一切 $n \ge n_0$，
$$F(n+1) \le S_n \le f(n_0) + F(n). \qquad (**)$$

**第 3 步 (⇐)**　设 $F$ 有界：存在 $M$，使对一切 $x \ge n_0$，$F(x) \le M$。由 $(**)$，$S_n \le f(n_0) + M$。正项级数的部分和有界，由 {@c2-pos-bornee}，级数收敛。

**第 4 步 (⇒)**　设级数收敛，和为 $S$；由 {@c2-pos-bornee}，$S_n \le S$。任取 $x \ge n_0$，令 $n = E(x)$，则 $n \ge n_0$ 且 $x < n + 1$。由 $F$ 递增与 $(**)$，
$$0 \le F(x) \le F(n+1) \le S_n \le S.$$
所以 $F$ 有界。

**第 5 步（有界 ⟺ 有有限极限）**　$F$ 在 $[n_0, +\infty[$ 上递增，由函数的单调极限定理，$\lim_{x \to +\infty} F(x)$ 存在于 $\R \cup \{+\infty\}$，且它有限当且仅当 $F$ 有上界（$F \ge 0$，下界自动成立）。

由第 3、4、5 步，第 2 条得证。
:::

::: fr
▷ Méthode : $f$ étant décroissante, sur chaque intervalle $[k, k+1]$ elle est encadrée par ses valeurs aux extrémités ; en intégrant on obtient le point 1, puis en sommant, les sommes partielles sont encadrées par des intégrales, et le caractère borné se transmet dans les deux sens.

**Étape 1 (inégalité sur un intervalle)**　Soit un entier $k \ge n_0$. Pour $t \in [k, k+1]$, la décroissance de $f$ donne $f(k+1) \le f(t) \le f(k)$. En intégrant sur $[k, k+1]$, de longueur $1$ (croissance de l'intégrale) :
$$f(k+1) \le \int_k^{k+1} f(t)\,\dd t \le f(k) \qquad (k \ge n_0). \qquad (*)$$
La moitié droite avec $k = n$ ($n \ge n_0$) donne $\int_n^{n+1} f \le f(n)$ ; la moitié gauche avec $k = n - 1$ (il faut $n - 1 \ge n_0$) donne $f(n) \le \int_{n-1}^n f$. C'est le point 1.

**Étape 2 (encadrement des sommes partielles)**　Notons $F(x) = \int_{n_0}^x f(t)\,\dd t$ ($x \ge n_0$) et $S_n = \sum_{k=n_0}^n f(k)$ ($n \ge n_0$). Comme $f \ge 0$, $F$ est croissante. En sommant la moitié droite de $(*)$ pour $k = n_0, \dots, n$ (relation de Chasles) :
$$F(n+1) = \sum_{k=n_0}^{n} \int_k^{k+1} f \le \sum_{k=n_0}^n f(k) = S_n.$$
En sommant la moitié gauche de $(*)$ pour $k = n_0, \dots, n-1$ ($n \ge n_0 + 1$) :
$$S_n - f(n_0) = \sum_{k=n_0}^{n-1} f(k+1) \le \sum_{k=n_0}^{n-1}\int_k^{k+1} f = F(n) ;$$
pour $n = n_0$, les deux membres sont nuls. Ainsi, pour tout $n \ge n_0$,
$$F(n+1) \le S_n \le f(n_0) + F(n). \qquad (**)$$

**Étape 3 (⇐)**　Supposons $F$ bornée : il existe $M$ tel que $F(x) \le M$ pour tout $x \ge n_0$. D'après $(**)$, $S_n \le f(n_0) + M$. Les sommes partielles de cette série à termes positifs sont majorées ; d'après le {@fr:c2-pos-bornee}, la série converge.

**Étape 4 (⇒)**　Supposons que la série converge, de somme $S$ ; d'après le {@fr:c2-pos-bornee}, $S_n \le S$. Soit $x \ge n_0$ et posons $n = E(x)$ ; alors $n \ge n_0$ et $x < n + 1$. Par croissance de $F$ et d'après $(**)$,
$$0 \le F(x) \le F(n+1) \le S_n \le S.$$
Donc $F$ est bornée.

**Étape 5 (bornée ⟺ limite finie)**　$F$ est croissante sur $[n_0, +\infty[$ ; par le théorème de la limite monotone pour les fonctions, $\lim_{x \to +\infty} F(x)$ existe dans $\R \cup \{+\infty\}$, et elle est finie si et seulement si $F$ est majorée ($F \ge 0$ est automatiquement minorée).

Les étapes 3, 4 et 5 démontrent le point 2.
:::

::: cor id=c2-encadrement zh="部分和与余项的积分估计" en="Integral bounds for partial sums and remainders" fr="Encadrement des sommes partielles et des restes" ru="Интегральные оценки частичных сумм и остатков" lvl=1
在 {@serie-integrale} 的假设下：

1. 对一切 $n \ge n_0$，$\displaystyle \int_{n_0}^{n+1} f \le \sum_{k=n_0}^{n} f(k) \le f(n_0) + \int_{n_0}^{n} f$。
2. 若 $\sum f(n)$ 收敛，记 $\int_a^{+\infty} f = \lim_{x \to +\infty} \int_a^x f$（$a \ge n_0$），则对一切 $n \ge n_0$，
   $$\int_{n+1}^{+\infty} f \le \sum_{k=n+1}^{+\infty} f(k) \le \int_n^{+\infty} f.$$
:::

::: fr
Sous les hypothèses du {@fr:serie-integrale} :

1. pour tout $n \ge n_0$, $\displaystyle \int_{n_0}^{n+1} f \le \sum_{k=n_0}^{n} f(k) \le f(n_0) + \int_{n_0}^{n} f$ ;
2. si $\sum f(n)$ converge, en notant $\int_a^{+\infty} f = \lim_{x \to +\infty} \int_a^x f$ ($a \ge n_0$), on a pour tout $n \ge n_0$
   $$\int_{n+1}^{+\infty} f \le \sum_{k=n+1}^{+\infty} f(k) \le \int_n^{+\infty} f.$$
:::

::: proof
▷ 思路：对 {@serie-integrale} 第 1 条的两个不等式求和；余项的情形先在有限区间上求和，再取极限。

**第 1 步（第 1 条）**　把 $\int_k^{k+1} f \le f(k)$ 对 $k = n_0, \dots, n$ 求和，得左边的不等式；把 $f(k) \le \int_{k-1}^k f$ 对 $k = n_0 + 1, \dots, n$ 求和，再加上 $f(n_0)$，得右边的不等式（Chasles 关系；$n = n_0$ 时右边的不等式是等式）。

**第 2 步（第 2 条，有限的一段）**　设 $m > n \ge n_0$。把 $\int_k^{k+1} f \le f(k)$ 与 $f(k) \le \int_{k-1}^k f$ 都对 $k = n+1, \dots, m$ 求和（此时 $k \ge n_0 + 1$）：
$$\int_{n+1}^{m+1} f \le \sum_{k=n+1}^{m} f(k) \le \int_n^m f.$$

**第 3 步（取极限）**　级数收敛，由 {@serie-integrale} 第 2 条，$F(x) = \int_{n_0}^x f$ 有有限极限，所以对 $a \ge n_0$，$\int_a^x f = F(x) - F(a)$ 在 $x \to +\infty$ 时也有有限极限。令 $m \to \infty$：左边趋于 $\int_{n+1}^{+\infty} f$，中间趋于余项 $\sum_{k=n+1}^{+\infty} f(k)$，右边趋于 $\int_n^{+\infty} f$。取极限保持不严格的不等式，第 2 条得证。
:::

::: fr
▷ Méthode : on somme les deux inégalités du point 1 du {@fr:serie-integrale} ; pour les restes, on somme d'abord sur une tranche finie, puis on passe à la limite.

**Étape 1 (point 1)**　En sommant $\int_k^{k+1} f \le f(k)$ pour $k = n_0, \dots, n$, on obtient l'inégalité de gauche ; en sommant $f(k) \le \int_{k-1}^k f$ pour $k = n_0 + 1, \dots, n$ et en ajoutant $f(n_0)$, on obtient celle de droite (relation de Chasles ; pour $n = n_0$, l'inégalité de droite est une égalité).

**Étape 2 (point 2, tranche finie)**　Soient $m > n \ge n_0$. On somme $\int_k^{k+1} f \le f(k)$ et $f(k) \le \int_{k-1}^k f$ pour $k = n+1, \dots, m$ (on a alors $k \ge n_0 + 1$) :
$$\int_{n+1}^{m+1} f \le \sum_{k=n+1}^{m} f(k) \le \int_n^m f.$$

**Étape 3 (passage à la limite)**　La série converge ; d'après le point 2 du {@fr:serie-integrale}, $F(x) = \int_{n_0}^x f$ admet une limite finie, donc pour $a \ge n_0$, $\int_a^x f = F(x) - F(a)$ aussi. Faisons tendre $m$ vers l'infini : le membre de gauche tend vers $\int_{n+1}^{+\infty} f$, celui du milieu vers le reste $\sum_{k=n+1}^{+\infty} f(k)$, celui de droite vers $\int_n^{+\infty} f$. Le passage à la limite conserve les inégalités larges, d'où le point 2.
:::

::: rem
**单调性不能去掉**（两个方向都会失败）。

1. 级数收敛、积分发散：$f(t) = \sin^2(\pi t)$ 连续、非负但不单调。对一切整数 $n$，$f(n) = 0$，$\sum f(n)$ 收敛；而 $\int_0^x f = \frac{x}{2} - \frac{\sin(2\pi x)}{4\pi} \to +\infty$。
2. 级数发散、积分收敛：在每个整数 $n \ge 1$ 处放一个以 $n$ 为中心、高为 $1$、底宽为 $\frac{1}{n^2}$ 的三角形「尖峰」（这些底边两两不相交），其余处为 $0$。$f$ 连续、非负，$f(n) = 1$，$\sum f(n)$ 粗发散；而每个尖峰的面积是 $\frac{1}{2n^2}$，$\int_0^{x} f \le \sum_{n \ge 1} \frac{1}{2n^2} < +\infty$ 有界。
:::

::: thm id=riemann-series zh="Riemann 级数" en="p-series" fr="Séries de Riemann" ru="Обобщённый гармонический ряд" lvl=1
设 $\alpha \in \R$。$\displaystyle\sum_{n \ge 1} \frac{1}{n^\alpha}$ 收敛 $\iff \alpha > 1$。
:::

::: fr
Soit $\alpha \in \R$. La série $\displaystyle\sum_{n \ge 1} \frac{1}{n^\alpha}$ converge si et seulement si $\alpha > 1$.
:::

::: proof
▷ 思路：$\alpha \le 0$ 时通项不趋于 $0$；$\alpha > 0$ 时 $t \mapsto t^{-\alpha}$ 正、连续、递减，用级数–积分比较（{@serie-integrale}），积分可以直接算出来。

**情形 1（$\alpha \le 0$）**　对一切 $n \ge 1$，$n^{-\alpha} = n^{\abs{\alpha}} \ge 1$，通项不趋于 $0$。由 {@cn-grossiere}，级数粗发散。

**情形 2（$\alpha > 0$）**　令 $f(t) = t^{-\alpha}$，$n_0 = 1$。$f$ 在 $[1, +\infty[$ 上连续、正，且递减（$f'(t) = -\alpha t^{-\alpha - 1} < 0$）。计算 $F(x) = \int_1^x t^{-\alpha}\,\dd t$（$x \ge 1$）：
$$F(x) = \begin{cases} \dfrac{x^{1-\alpha} - 1}{1 - \alpha}, & \alpha \ne 1, \\[2mm] \ln x, & \alpha = 1. \end{cases}$$

- 若 $\alpha > 1$：$F(x) = \frac{1 - x^{1-\alpha}}{\alpha - 1} \le \frac{1}{\alpha - 1}$（因为 $x^{1-\alpha} > 0$），$F$ 有界，级数收敛。
- 若 $\alpha = 1$：$F(x) = \ln x \to +\infty$，$F$ 无界，级数发散。
- 若 $0 < \alpha < 1$：$1 - \alpha > 0$，$x^{1-\alpha} \to +\infty$，$F$ 无界，级数发散。

每一种情况都由 {@serie-integrale} 第 2 条得出结论。综合两种情形：级数收敛当且仅当 $\alpha > 1$。
:::

::: fr
▷ Méthode : pour $\alpha \le 0$, le terme général ne tend pas vers $0$ ; pour $\alpha > 0$, $t \mapsto t^{-\alpha}$ est positive, continue et décroissante, et on applique la comparaison série–intégrale ({@fr:serie-integrale}) avec une intégrale calculable explicitement.

**Cas 1 ($\alpha \le 0$)**　Pour tout $n \ge 1$, $n^{-\alpha} = n^{\abs{\alpha}} \ge 1$ : le terme général ne tend pas vers $0$. D'après la {@fr:cn-grossiere}, la série diverge grossièrement.

**Cas 2 ($\alpha > 0$)**　Posons $f(t) = t^{-\alpha}$ et $n_0 = 1$. La fonction $f$ est continue, positive et décroissante sur $[1, +\infty[$ ($f'(t) = -\alpha t^{-\alpha - 1} < 0$). Calculons $F(x) = \int_1^x t^{-\alpha}\,\dd t$ ($x \ge 1$) :
$$F(x) = \begin{cases} \dfrac{x^{1-\alpha} - 1}{1 - \alpha}, & \alpha \ne 1, \\[2mm] \ln x, & \alpha = 1. \end{cases}$$

- Si $\alpha > 1$ : $F(x) = \frac{1 - x^{1-\alpha}}{\alpha - 1} \le \frac{1}{\alpha - 1}$ (car $x^{1-\alpha} > 0$) ; $F$ est bornée et la série converge.
- Si $\alpha = 1$ : $F(x) = \ln x \to +\infty$ ; $F$ n'est pas bornée et la série diverge.
- Si $0 < \alpha < 1$ : $1 - \alpha > 0$, donc $x^{1-\alpha} \to +\infty$ ; $F$ n'est pas bornée et la série diverge.

Dans chaque cas, on conclut par le point 2 du {@fr:serie-integrale}. En réunissant les deux cas : la série converge si et seulement si $\alpha > 1$.
:::

::: ex id=c2-ex-riemann-equiv zh="部分和与余项的等价量" lvl=1
用 {@c2-encadrement} 和 $F$ 的显式表达式：

1. **调和级数**（$\alpha = 1$）：$\ln(n+1) \le H_n \le 1 + \ln n$。两边除以 $\ln n$（$n \ge 2$），左边 $\frac{\ln(n+1)}{\ln n} = 1 + \frac{\ln(1 + 1/n)}{\ln n} \to 1$，右边 $\frac{1}{\ln n} + 1 \to 1$，由夹逼定理 $H_n \sim \ln n$。
2. **$\alpha > 1$ 的余项**：$\int_a^{+\infty} t^{-\alpha}\,\dd t = \frac{a^{1-\alpha}}{\alpha - 1}$，所以
   $$\frac{(n+1)^{1-\alpha}}{\alpha - 1} \le \sum_{k=n+1}^{+\infty} \frac{1}{k^\alpha} \le \frac{n^{1-\alpha}}{\alpha - 1}.$$
   因为 $\big(\frac{n+1}{n}\big)^{1-\alpha} \to 1$，两端都等价于 $\frac{n^{1-\alpha}}{\alpha - 1}$，于是 $\sum_{k > n} \frac{1}{k^\alpha} \sim \frac{1}{(\alpha - 1)\,n^{\alpha - 1}}$。例如 $\sum_{k > n} \frac{1}{k^2} \sim \frac1n$。
3. **$0 < \alpha < 1$ 的部分和**：$\frac{(n+1)^{1-\alpha} - 1}{1 - \alpha} \le \sum_{k=1}^n \frac{1}{k^\alpha} \le 1 + \frac{n^{1-\alpha} - 1}{1 - \alpha}$，两端都等价于 $\frac{n^{1-\alpha}}{1-\alpha}$（$n^{1-\alpha} \to +\infty$ 吸收了常数），所以 $\sum_{k=1}^n \frac{1}{k^\alpha} \sim \frac{n^{1-\alpha}}{1-\alpha}$。
:::

::: ex id=c2-ex-riemann zh="与 Riemann 级数比较" lvl=1
1. $u_n = \dfrac{n + \ln n}{n^3 + 1}$：$u_n = \dfrac{1}{n^2} \cdot \dfrac{1 + \frac{\ln n}{n}}{1 + \frac{1}{n^3}}$，第二个因子 $\to 1$（$\frac{\ln n}{n} \to 0$），所以 $u_n \sim \frac{1}{n^2}$。两者为正，$2 > 1$，由 {@comparaison} 第 3 条与 {@riemann-series}，**收敛**。
2. $u_n = \sin\frac1n$（$n \ge 1$）：$0 < \frac1n \le 1 < \pi$，所以 $u_n > 0$；$\sin x \sim x$（$x \to 0$），所以 $u_n \sim \frac1n$。**发散**。
3. $u_n = 1 - \cos\frac1n$：$1 - \cos x \sim \frac{x^2}{2}$，所以 $u_n \sim \frac{1}{2n^2}$。**收敛**。
4. $u_n = \dfrac{\ln n}{n^2}$：它不等价于任何 $\frac{c}{n^\alpha}$，但 $n^{3/2} u_n = \frac{\ln n}{\sqrt n} \to 0$（对数与幂的增长比较），即 $u_n = o\big(n^{-3/2}\big)$，$\frac32 > 1$，由 {@comparaison} 第 2 条，**收敛**。
5. $u_n = \dfrac{1}{\sqrt n\,\ln n}$（$n \ge 2$）：$n u_n = \frac{\sqrt n}{\ln n} \to +\infty$，所以存在 $N$，使 $n \ge N$ 时 $n u_n \ge 1$，即 $u_n \ge \frac1n$。由 {@comparaison} 第 1 条的逆否形式，**发散**。

第 4、5 条是常用的「$n^\alpha u_n$ 法则」：若存在 $\alpha > 1$ 使 $n^\alpha u_n \to 0$（或有界），则收敛；若 $n u_n \to +\infty$（或从某项起 $\ge c > 0$），则发散。
:::

::: thm id=bertrand zh="Bertrand 级数" en="Bertrand series" fr="Séries de Bertrand" ru="Ряды Бертрана" lvl=2
设 $\alpha, \beta \in \R$。$\displaystyle\sum_{n \ge 2} \frac{1}{n^\alpha (\ln n)^\beta}$ 收敛，当且仅当 $\alpha > 1$，或 $\alpha = 1$ 且 $\beta > 1$。
:::

::: fr
Soient $\alpha, \beta \in \R$. La série $\displaystyle\sum_{n \ge 2} \frac{1}{n^\alpha (\ln n)^\beta}$ converge si et seulement si $\alpha > 1$, ou bien $\alpha = 1$ et $\beta > 1$.
:::

::: sketch
▷ 思路：$\alpha \ne 1$ 时对数因子被幂次「吸收」，与 Riemann 级数 $n^{-\gamma}$ 比较，$\gamma = \frac{1+\alpha}{2}$ 取在 $\alpha$ 与 $1$ 的正中间；$\alpha = 1$ 时对数决定一切，用级数–积分比较。记 $u_n = \frac{1}{n^\alpha (\ln n)^\beta}$。

**情形 1（$\alpha > 1$）**　令 $\gamma = \frac{1 + \alpha}{2}$，则 $1 < \gamma < \alpha$。
$$n^\gamma u_n = \frac{(\ln n)^{-\beta}}{n^{(\alpha - 1)/2}} \xrightarrow[n \to \infty]{} 0 \qquad \text{（对数与幂的增长比较，} \tfrac{\alpha - 1}{2} > 0\text{）},$$
即 $u_n = o(n^{-\gamma})$。$\gamma > 1$，由 {@comparaison} 第 2 条与 {@riemann-series}，收敛。

**情形 2（$\alpha < 1$）**　令 $\gamma = \frac{1 + \alpha}{2}$，则 $\alpha < \gamma < 1$。$n^\gamma u_n = n^{(1-\alpha)/2} (\ln n)^{-\beta} \to +\infty$，所以从某项起 $n^\gamma u_n \ge 1$，即 $u_n \ge n^{-\gamma}$。$\gamma < 1$，$\sum n^{-\gamma}$ 发散，由 {@comparaison} 第 1 条，发散。

**情形 3（$\alpha = 1$，$\beta \le 0$）**　对 $n \ge 3$，$\ln n \ge 1$，所以 $(\ln n)^{-\beta} \ge 1$，$u_n \ge \frac1n$。发散。

**情形 4（$\alpha = 1$，$\beta > 0$）**　令 $f(t) = \frac{1}{t (\ln t)^\beta}$，$n_0 = 2$。$t \mapsto t (\ln t)^\beta$ 在 $[2, +\infty[$ 上是两个正的递增函数之积，所以递增且为正，$f$ 连续、正、递减。原函数（常规计算：求导验证）：
$$\int_2^x f = \begin{cases} \dfrac{(\ln x)^{1-\beta} - (\ln 2)^{1-\beta}}{1 - \beta}, & \beta \ne 1, \\[2mm] \ln \ln x - \ln \ln 2, & \beta = 1. \end{cases}$$
$\beta > 1$ 时它 $\le \frac{(\ln 2)^{1-\beta}}{\beta - 1}$，有界，级数收敛；$\beta = 1$ 或 $0 < \beta < 1$ 时它 $\to +\infty$，级数发散（{@serie-integrale}）。

四种情形合起来就是定理的结论。
:::

::: fr
▷ Méthode : pour $\alpha \ne 1$, le facteur logarithmique est « absorbé » par la puissance : on compare à la série de Riemann $n^{-\gamma}$, avec $\gamma = \frac{1+\alpha}{2}$ choisi au milieu de $\alpha$ et $1$ ; pour $\alpha = 1$, c'est le logarithme qui décide, et on utilise la comparaison série–intégrale. On note $u_n = \frac{1}{n^\alpha (\ln n)^\beta}$.

**Cas 1 ($\alpha > 1$)**　Posons $\gamma = \frac{1 + \alpha}{2}$, de sorte que $1 < \gamma < \alpha$. Alors
$$n^\gamma u_n = \frac{(\ln n)^{-\beta}}{n^{(\alpha - 1)/2}} \xrightarrow[n \to \infty]{} 0 \qquad \text{(croissances comparées, } \tfrac{\alpha - 1}{2} > 0\text{)},$$
c'est-à-dire $u_n = o(n^{-\gamma})$. Comme $\gamma > 1$, le point 2 du {@fr:comparaison} et le {@fr:riemann-series} donnent la convergence.

**Cas 2 ($\alpha < 1$)**　Posons $\gamma = \frac{1 + \alpha}{2}$, de sorte que $\alpha < \gamma < 1$. Alors $n^\gamma u_n = n^{(1-\alpha)/2} (\ln n)^{-\beta} \to +\infty$, donc à partir d'un certain rang $n^\gamma u_n \ge 1$, soit $u_n \ge n^{-\gamma}$. Comme $\gamma < 1$, $\sum n^{-\gamma}$ diverge, et le point 1 du {@fr:comparaison} donne la divergence.

**Cas 3 ($\alpha = 1$, $\beta \le 0$)**　Pour $n \ge 3$, $\ln n \ge 1$, donc $(\ln n)^{-\beta} \ge 1$ et $u_n \ge \frac1n$ : la série diverge.

**Cas 4 ($\alpha = 1$, $\beta > 0$)**　Posons $f(t) = \frac{1}{t (\ln t)^\beta}$ et $n_0 = 2$. Sur $[2, +\infty[$, $t \mapsto t (\ln t)^\beta$ est le produit de deux fonctions positives croissantes, donc elle est positive et croissante, et $f$ est continue, positive et décroissante. Une primitive (calcul de routine : on dérive) donne
$$\int_2^x f = \begin{cases} \dfrac{(\ln x)^{1-\beta} - (\ln 2)^{1-\beta}}{1 - \beta}, & \beta \ne 1, \\[2mm] \ln \ln x - \ln \ln 2, & \beta = 1. \end{cases}$$
Pour $\beta > 1$, cette quantité est majorée par $\frac{(\ln 2)^{1-\beta}}{\beta - 1}$ et la série converge ; pour $\beta = 1$ ou $0 < \beta < 1$, elle tend vers $+\infty$ et la série diverge ({@fr:serie-integrale}).

Les quatre cas réunis donnent l'énoncé.
:::

::: rem
$\frac{1}{n \ln n} = o\big(\frac1n\big)$，但 $\sum \frac{1}{n \ln n}$ 仍然发散；$\frac{1}{n (\ln n)^2}$ 只比它小一个对数因子，$\sum \frac{1}{n(\ln n)^2}$ 却收敛。Riemann 级数这把「尺子」在 $\alpha = 1$ 附近太粗，Bertrand 级数把刻度细化了一层。
:::

下面三个判别法（比值、根值、Raabe–Duhamel）都是「与一个已知级数比较」的特例，比较的对象分别是几何级数和 Riemann 级数。为此先给出一个比较「相邻项之比」的引理。

::: lem id=c2-comp-log zh="比值比较引理" en="Ratio comparison lemma" fr="Comparaison logarithmique" ru="Признак сравнения отношений" lvl=1
设对一切 $n$，$u_n > 0$，$v_n > 0$，且从某项起
$$\frac{u_{n+1}}{u_n} \le \frac{v_{n+1}}{v_n}.$$
则 $u_n = O(v_n)$。因此：若 $\sum v_n$ 收敛，则 $\sum u_n$ 收敛；若 $\sum u_n$ 发散，则 $\sum v_n$ 发散。
:::

::: fr
Soient $(u_n)$ et $(v_n)$ telles que $u_n > 0$ et $v_n > 0$ pour tout $n$, et telles qu'à partir d'un certain rang
$$\frac{u_{n+1}}{u_n} \le \frac{v_{n+1}}{v_n}.$$
Alors $u_n = O(v_n)$. Par conséquent, si $\sum v_n$ converge, $\sum u_n$ converge ; si $\sum u_n$ diverge, $\sum v_n$ diverge.
:::

::: proof
▷ 思路：比值的不等式等价于「$\frac{u_n}{v_n}$ 递减」。

**第 1 步（翻译假设）**　存在 $N$，使对一切 $n \ge N$，$\frac{u_{n+1}}{u_n} \le \frac{v_{n+1}}{v_n}$。两边乘以正数 $\frac{u_n}{v_{n+1}}$，得 $\frac{u_{n+1}}{v_{n+1}} \le \frac{u_n}{v_n}$。

**第 2 步（单调性）**　于是 $\big(\frac{u_n}{v_n}\big)_{n \ge N}$ 递减，对一切 $n \ge N$，$\frac{u_n}{v_n} \le \frac{u_N}{v_N}$。令 $M = \frac{u_N}{v_N}$，得 $u_n \le M v_n$（$n \ge N$），即 $u_n = O(v_n)$。

**第 3 步（结论）**　由 {@comparaison} 第 2 条，$\sum v_n$ 收敛蕴含 $\sum u_n$ 收敛；后一句是它的逆否命题。
:::

::: fr
▷ Méthode : l'inégalité sur les rapports équivaut à la décroissance de $\frac{u_n}{v_n}$.

**Étape 1 (on traduit l'hypothèse)**　Il existe $N$ tel que pour tout $n \ge N$, $\frac{u_{n+1}}{u_n} \le \frac{v_{n+1}}{v_n}$. En multipliant par le réel positif $\frac{u_n}{v_{n+1}}$, il vient $\frac{u_{n+1}}{v_{n+1}} \le \frac{u_n}{v_n}$.

**Étape 2 (monotonie)**　Ainsi $\big(\frac{u_n}{v_n}\big)_{n \ge N}$ est décroissante, et pour tout $n \ge N$, $\frac{u_n}{v_n} \le \frac{u_N}{v_N}$. En posant $M = \frac{u_N}{v_N}$, on obtient $u_n \le M v_n$ pour $n \ge N$, c'est-à-dire $u_n = O(v_n)$.

**Étape 3 (conclusion)**　D'après le point 2 du {@fr:comparaison}, la convergence de $\sum v_n$ entraîne celle de $\sum u_n$ ; la dernière phrase en est la contraposée.
:::

::: thm id=dalembert zh="d'Alembert 判别法（比值判别法）" en="Ratio test" fr="Règle de d'Alembert" ru="Признак Даламбера" lvl=1
设对一切 $n$，$u_n > 0$，且 $\dfrac{u_{n+1}}{u_n} \to \ell \in [0, +\infty]$。若 $\ell < 1$，级数收敛；若 $\ell > 1$，级数粗发散；$\ell = 1$ 时不能判断。
:::

::: fr
Supposons $u_n > 0$ pour tout $n$ et $\dfrac{u_{n+1}}{u_n} \to \ell \in [0, +\infty]$. Si $\ell < 1$, la série converge ; si $\ell > 1$, elle diverge grossièrement ; si $\ell = 1$, on ne peut pas conclure.
:::

::: proof
▷ 思路：$\ell < 1$ 时，从某项起比值小于一个固定的 $q < 1$，于是 $u_n$ 被几何数列 $C q^n$ 控制；$\ell > 1$ 时，从某项起 $u_n$ 递增，不可能趋于 $0$。

**情形 1（$\ell < 1$）**

1. 令 $q = \frac{1 + \ell}{2}$，则 $\ell < q < 1$。
2. 翻译假设：取 $\eps = q - \ell = \frac{1 - \ell}{2} > 0$，存在 $N$，使对一切 $n \ge N$，$\frac{u_{n+1}}{u_n} < \ell + \eps = q$。
3. 由归纳法，对一切 $n \ge N$，$u_n \le u_N q^{n - N}$。初始化：$n = N$ 时是等式。递推：若 $u_n \le u_N q^{n-N}$，则 $u_{n+1} < q u_n \le u_N q^{n+1-N}$。
4. 令 $K = u_N q^{-N}$，则 $u_n \le K q^n$（$n \ge N$）。$0 < q < 1$，$\sum K q^n$ 收敛（{@c2-geom}，{@c2-linearite}），由 {@comparaison} 第 1 条，$\sum u_n$ 收敛。

**情形 2（$\ell > 1$，含 $\ell = +\infty$）**

1. 若 $\ell < +\infty$，取 $\eps = \ell - 1 > 0$，存在 $N$，使对一切 $n \ge N$，$\frac{u_{n+1}}{u_n} > \ell - \eps = 1$。若 $\ell = +\infty$，由「趋于 $+\infty$」的定义（取界 $1$），同样存在 $N$，使对一切 $n \ge N$，$\frac{u_{n+1}}{u_n} > 1$。
2. 于是对 $n \ge N$，$u_{n+1} > u_n$；由归纳法，对一切 $n \ge N$，$u_n \ge u_N > 0$。
3. 反设 $u_n \to 0$，则从某项起 $u_n < u_N$，与第 2 点矛盾。所以 $u_n \not\to 0$，由 {@cn-grossiere}，级数粗发散。

**情形 3（$\ell = 1$）**　$u_n = \frac1n$ 与 $u_n = \frac{1}{n^2}$ 都满足 $\frac{u_{n+1}}{u_n} \to 1$（分别是 $\frac{n}{n+1}$ 与 $\frac{n^2}{(n+1)^2}$），而前者发散、后者收敛（{@riemann-series}）。所以 $\ell = 1$ 时无法判断。
:::

::: fr
▷ Méthode : si $\ell < 1$, le rapport est majoré à partir d'un certain rang par un $q < 1$ fixé, et $u_n$ est dominé par la suite géométrique $C q^n$ ; si $\ell > 1$, $(u_n)$ est croissante à partir d'un certain rang et ne peut pas tendre vers $0$.

**Cas 1 ($\ell < 1$)**

1. Posons $q = \frac{1 + \ell}{2}$ ; alors $\ell < q < 1$.
2. On traduit l'hypothèse avec $\eps = q - \ell = \frac{1 - \ell}{2} > 0$ : il existe $N$ tel que pour tout $n \ge N$, $\frac{u_{n+1}}{u_n} < \ell + \eps = q$.
3. Par récurrence, pour tout $n \ge N$, $u_n \le u_N q^{n - N}$. Initialisation : pour $n = N$, c'est une égalité. Hérédité : si $u_n \le u_N q^{n-N}$, alors $u_{n+1} < q u_n \le u_N q^{n+1-N}$.
4. Posons $K = u_N q^{-N}$ ; alors $u_n \le K q^n$ pour $n \ge N$. Comme $0 < q < 1$, $\sum K q^n$ converge ({@fr:c2-geom}, {@fr:c2-linearite}), et le point 1 du {@fr:comparaison} montre que $\sum u_n$ converge.

**Cas 2 ($\ell > 1$, y compris $\ell = +\infty$)**

1. Si $\ell < +\infty$, avec $\eps = \ell - 1 > 0$, il existe $N$ tel que pour tout $n \ge N$, $\frac{u_{n+1}}{u_n} > \ell - \eps = 1$. Si $\ell = +\infty$, la définition de « tendre vers $+\infty$ » (avec le seuil $1$) fournit de même $N$ tel que pour tout $n \ge N$, $\frac{u_{n+1}}{u_n} > 1$.
2. Ainsi $u_{n+1} > u_n$ pour $n \ge N$, et par récurrence $u_n \ge u_N > 0$ pour tout $n \ge N$.
3. Par l'absurde, si $u_n \to 0$, alors $u_n < u_N$ à partir d'un certain rang, ce qui contredit le point 2. Donc $(u_n)$ ne tend pas vers $0$ et, d'après la {@fr:cn-grossiere}, la série diverge grossièrement.

**Cas 3 ($\ell = 1$)**　Les suites $u_n = \frac1n$ et $u_n = \frac{1}{n^2}$ vérifient toutes deux $\frac{u_{n+1}}{u_n} \to 1$ (les rapports valent $\frac{n}{n+1}$ et $\frac{n^2}{(n+1)^2}$), alors que la première série diverge et la seconde converge ({@fr:riemann-series}). On ne peut donc pas conclure si $\ell = 1$.
:::

::: rem
1. **证明里真正用到的是**：从某项起 $\frac{u_{n+1}}{u_n} \le q$，$q < 1$ **固定**（收敛）；从某项起 $\frac{u_{n+1}}{u_n} \ge 1$（发散）。只知道「对一切 $n$，$\frac{u_{n+1}}{u_n} < 1$」是不够的：$u_n = \frac1n$。
2. **比值判别法不是必要条件**：令 $u_n = 2^{-n}$（$n$ 偶）、$u_n = 3^{-n}$（$n$ 奇）。$u_n \le 2^{-n}$，级数收敛；但
   $$\frac{u_{2k+1}}{u_{2k}} = \frac13 \Big(\frac49\Big)^k \to 0, \qquad \frac{u_{2k+2}}{u_{2k+1}} = \frac34 \Big(\frac94\Big)^k \to +\infty,$$
   比值没有极限，d'Alembert 判别法无从用起。根值判别法（{@cauchy-racine}）却能处理它。
:::

::: ex id=c2-ex-dalembert zh="比值判别法的典型用法" lvl=1
比值判别法适合含阶乘、指数的通项：比值里的阶乘会约掉。

1. $\sum \frac{x^n}{n!}$（$x > 0$）：$\frac{u_{n+1}}{u_n} = \frac{x}{n+1} \to 0 < 1$，**收敛**。
2. $\sum \frac{n!}{n^n}$：$\frac{u_{n+1}}{u_n} = \frac{(n+1)!}{(n+1)^{n+1}} \cdot \frac{n^n}{n!} = \Big(\frac{n}{n+1}\Big)^n = \Big(1 + \frac1n\Big)^{-n} \to \e^{-1} < 1$（L1：$n \ln(1 + \frac1n) \to 1$），**收敛**。
3. $\sum \frac{n^2}{2^n}$：$\frac{u_{n+1}}{u_n} = \frac12 \big(1 + \frac1n\big)^2 \to \frac12$，**收敛**。
4. $\sum \frac{n^n}{n!}$：比值是第 2 条的倒数，$\to \e > 1$，**粗发散**。
:::

根值判别法需要上极限。上极限在第 4 章的 Cauchy–Hadamard 公式中还会用到，这里把需要的性质一次证明完。

::: lem id=c2-limsup zh="上极限" en="Limit superior" fr="Limite supérieure" ru="Верхний предел" lvl=1
设 $(x_n)$ 是实数列。对每个 $n$，令 $s_n = \sup_{k \ge n} x_k \in \R \cup \{+\infty\}$。则 $(s_n)$ 递减，因而有极限
$$\limsup_{n \to \infty} x_n := \lim_{n \to \infty} s_n = \inf_{n} s_n \in [-\infty, +\infty],$$
称为 $(x_n)$ 的**上极限**。记 $L = \limsup x_n$，则：

- (A) 若实数 $\ell > L$，则存在 $N$，使对一切 $n \ge N$，$x_n < \ell$；
- (B) 若实数 $\ell < L$，则有无穷多个 $n$ 使 $x_n > \ell$；
- (C) 若 $x_n \to L' \in [-\infty, +\infty]$，则 $L = L'$。
:::

::: fr
Soit $(x_n)$ une suite réelle. Pour tout $n$, posons $s_n = \sup_{k \ge n} x_k \in \R \cup \{+\infty\}$. La suite $(s_n)$ est décroissante, donc admet une limite
$$\limsup_{n \to \infty} x_n := \lim_{n \to \infty} s_n = \inf_{n} s_n \in [-\infty, +\infty],$$
appelée **limite supérieure** de $(x_n)$. En notant $L = \limsup x_n$ :

- (A) si $\ell > L$ est réel, il existe $N$ tel que pour tout $n \ge N$, $x_n < \ell$ ;
- (B) si $\ell < L$ est réel, il existe une infinité d'entiers $n$ tels que $x_n > \ell$ ;
- (C) si $x_n \to L' \in [-\infty, +\infty]$, alors $L = L'$.
:::

::: proof
▷ 思路：$s_n$ 是「第 $n$ 项以后的最高点」，随 $n$ 增大只会降低；(A)(B) 分别是下确界定义与上确界定义的直接翻译。

**第 1 步（单调性与极限的存在）**　$\{x_k : k \ge n+1\} \subset \{x_k : k \ge n\}$，较小集合的上确界较小，所以 $s_{n+1} \le s_n$。

- 情形 1：$(x_n)$ 无上界。去掉有限多项后仍无上界（有限多个数有最大值），所以对一切 $n$，$s_n = +\infty$，$L = +\infty = \inf_n s_n$。
- 情形 2：$(x_n)$ 有上界。则每个 $s_n \in \R$，$(s_n)$ 是递减实数列，由单调极限定理，$s_n \to \inf_n s_n \in [-\infty, +\infty[$。

**第 2 步 (A)**　设 $\ell > L$（此时 $L < +\infty$，处于情形 2）。$\ell > \inf_n s_n$，所以 $\ell$ 不是 $\{s_n\}$ 的下界：存在 $N$ 使 $s_N < \ell$。于是对一切 $n \ge N$，$x_n \le s_N < \ell$。

**第 3 步 (B)**　设 $\ell < L$。对一切 $n$，$s_n \ge \inf_m s_m = L > \ell$。$s_n$ 是 $\{x_k : k \ge n\}$ 的上确界且 $> \ell$，所以 $\ell$ 不是这个集合的上界：存在 $k \ge n$ 使 $x_k > \ell$。于是集合 $\{k : x_k > \ell\}$ 中对每个 $n$ 都有 $\ge n$ 的元素，它无上界，因而是无穷集。

**第 4 步 (C)**

- $L' \in \R$：取 $\eps > 0$，存在 $N$，使对一切 $k \ge N$，$L' - \eps < x_k < L' + \eps$。对 $n \ge N$：$L' + \eps$ 是 $\{x_k : k \ge n\}$ 的上界，所以 $s_n \le L' + \eps$；又 $s_n \ge x_n > L' - \eps$。所以 $\abs{s_n - L'} \le \eps$（$n \ge N$），$s_n \to L'$，即 $L = L'$。
- $L' = +\infty$：$(x_n)$ 无上界，由第 1 步情形 1，$L = +\infty$。
- $L' = -\infty$：任取 $A \in \R$，存在 $N$，使对一切 $k \ge N$，$x_k < A$，所以对 $n \ge N$，$s_n \le A$。故 $s_n \to -\infty$，$L = -\infty$。
:::

::: fr
▷ Méthode : $s_n$ est « le plus haut niveau atteint après le rang $n$ », qui ne peut que baisser quand $n$ augmente ; (A) et (B) sont les traductions directes des définitions de la borne inférieure et de la borne supérieure.

**Étape 1 (monotonie et existence de la limite)**　On a $\{x_k : k \ge n+1\} \subset \{x_k : k \ge n\}$, et la borne supérieure d'un ensemble plus petit est plus petite : $s_{n+1} \le s_n$.

- Cas 1 : $(x_n)$ n'est pas majorée. Elle reste non majorée après suppression d'un nombre fini de termes (un ensemble fini de réels admet un maximum), donc $s_n = +\infty$ pour tout $n$, et $L = +\infty = \inf_n s_n$.
- Cas 2 : $(x_n)$ est majorée. Alors chaque $s_n$ est réel, $(s_n)$ est une suite réelle décroissante et, par le théorème de la limite monotone, $s_n \to \inf_n s_n \in [-\infty, +\infty[$.

**Étape 2 (A)**　Soit $\ell > L$ (alors $L < +\infty$, on est dans le cas 2). Comme $\ell > \inf_n s_n$, $\ell$ ne minore pas $\{s_n\}$ : il existe $N$ tel que $s_N < \ell$. Alors pour tout $n \ge N$, $x_n \le s_N < \ell$.

**Étape 3 (B)**　Soit $\ell < L$. Pour tout $n$, $s_n \ge \inf_m s_m = L > \ell$. Comme $s_n$ est la borne supérieure de $\{x_k : k \ge n\}$ et que $s_n > \ell$, $\ell$ ne majore pas cet ensemble : il existe $k \ge n$ tel que $x_k > \ell$. Ainsi l'ensemble $\{k : x_k > \ell\}$ possède, pour tout $n$, un élément $\ge n$ ; il n'est pas majoré, donc il est infini.

**Étape 4 (C)**

- $L' \in \R$ : soit $\eps > 0$ ; il existe $N$ tel que pour tout $k \ge N$, $L' - \eps < x_k < L' + \eps$. Pour $n \ge N$, $L' + \eps$ majore $\{x_k : k \ge n\}$, donc $s_n \le L' + \eps$ ; et $s_n \ge x_n > L' - \eps$. Ainsi $\abs{s_n - L'} \le \eps$ pour $n \ge N$ : $s_n \to L'$, c'est-à-dire $L = L'$.
- $L' = +\infty$ : $(x_n)$ n'est pas majorée et, d'après le cas 1 de l'étape 1, $L = +\infty$.
- $L' = -\infty$ : soit $A \in \R$ ; il existe $N$ tel que pour tout $k \ge N$, $x_k < A$, donc $s_n \le A$ pour $n \ge N$. Ainsi $s_n \to -\infty$ et $L = -\infty$.
:::

::: thm id=cauchy-racine zh="Cauchy 根值判别法" en="Root test" fr="Règle de Cauchy" ru="Радикальный признак Коши" lvl=1
设对一切 $n \ge 1$，$u_n \ge 0$。

1. 若 $\sqrt[n]{u_n} \to \ell \in [0, +\infty]$：$\ell < 1$ 时级数收敛，$\ell > 1$ 时级数粗发散，$\ell = 1$ 时不能判断。
2. 更一般地，令 $L = \limsup_{n \to \infty} \sqrt[n]{u_n}$（{@c2-limsup}）：$L < 1$ 时级数收敛，$L > 1$ 时级数粗发散。这是第 4 章 Cauchy–Hadamard 公式（{@hadamard}）的来源。
:::

::: fr
Supposons $u_n \ge 0$ pour tout $n \ge 1$.

1. Si $\sqrt[n]{u_n} \to \ell \in [0, +\infty]$ : pour $\ell < 1$ la série converge, pour $\ell > 1$ elle diverge grossièrement, et pour $\ell = 1$ on ne peut pas conclure.
2. Plus généralement, soit $L = \limsup_{n \to \infty} \sqrt[n]{u_n}$ ({@fr:c2-limsup}) : pour $L < 1$ la série converge, pour $L > 1$ elle diverge grossièrement. C'est l'origine de la formule de Cauchy–Hadamard du chapitre 4 ({@fr:hadamard}).
:::

::: proof
▷ 思路：$\sqrt[n]{u_n} < q$ 就是 $u_n < q^n$，直接与几何级数比较。先证第 2 条；第 1 条由 {@c2-limsup} (C) 化为第 2 条。

**第 1 步（$L < 1$）**　因为 $u_n \ge 0$，每个 $\sqrt[n]{u_n} \ge 0$，所以 $L \ge 0$。令 $q = \frac{1 + L}{2}$，则 $L < q < 1$。由 {@c2-limsup} (A)（取 $\ell = q$），存在 $N$，使对一切 $n \ge N$，$\sqrt[n]{u_n} < q$，即 $0 \le u_n < q^n$。$\sum q^n$ 收敛（{@c2-geom}），由 {@comparaison} 第 1 条，$\sum u_n$ 收敛。

**第 2 步（$L > 1$，含 $L = +\infty$）**　由 {@c2-limsup} (B)（取 $\ell = 1 < L$），有无穷多个 $n$ 使 $\sqrt[n]{u_n} > 1$，即 $u_n > 1$。反设 $u_n \to 0$，则从某项起 $u_n < 1$，与「无穷多个 $n$ 使 $u_n > 1$」矛盾。所以 $u_n \not\to 0$，由 {@cn-grossiere}，级数粗发散。

**第 3 步（第 1 条）**　若 $\sqrt[n]{u_n} \to \ell$，由 {@c2-limsup} (C)，$L = \ell$，由第 1、2 步得 $\ell < 1$、$\ell > 1$ 两种情形的结论。$\ell = 1$ 时：$u_n = \frac1n$ 与 $u_n = \frac1{n^2}$ 都满足 $\sqrt[n]{u_n} \to 1$（因为 $n^{-1/n} = \e^{-\ln n / n} \to \e^0 = 1$），前者发散、后者收敛。
:::

::: fr
▷ Méthode : $\sqrt[n]{u_n} < q$ signifie $u_n < q^n$ ; on compare directement à une série géométrique. On montre d'abord le point 2 ; le point 1 s'y ramène grâce au (C) du {@fr:c2-limsup}.

**Étape 1 ($L < 1$)**　Comme $u_n \ge 0$, chaque $\sqrt[n]{u_n}$ est $\ge 0$, donc $L \ge 0$. Posons $q = \frac{1 + L}{2}$ ; alors $L < q < 1$. D'après le (A) du {@fr:c2-limsup} (avec $\ell = q$), il existe $N$ tel que pour tout $n \ge N$, $\sqrt[n]{u_n} < q$, c'est-à-dire $0 \le u_n < q^n$. La série $\sum q^n$ converge ({@fr:c2-geom}) et le point 1 du {@fr:comparaison} montre que $\sum u_n$ converge.

**Étape 2 ($L > 1$, y compris $L = +\infty$)**　D'après le (B) du {@fr:c2-limsup} (avec $\ell = 1 < L$), il existe une infinité d'entiers $n$ tels que $\sqrt[n]{u_n} > 1$, c'est-à-dire $u_n > 1$. Par l'absurde, si $u_n \to 0$, alors $u_n < 1$ à partir d'un certain rang, ce qui contredit l'existence d'une infinité de $n$ tels que $u_n > 1$. Donc $(u_n)$ ne tend pas vers $0$ et, d'après la {@fr:cn-grossiere}, la série diverge grossièrement.

**Étape 3 (point 1)**　Si $\sqrt[n]{u_n} \to \ell$, le (C) du {@fr:c2-limsup} donne $L = \ell$, et les étapes 1 et 2 traitent les cas $\ell < 1$ et $\ell > 1$. Pour $\ell = 1$ : $u_n = \frac1n$ et $u_n = \frac1{n^2}$ vérifient toutes deux $\sqrt[n]{u_n} \to 1$ (car $n^{-1/n} = \e^{-\ln n / n} \to \e^0 = 1$), alors que la première série diverge et la seconde converge.
:::

::: rem
1. **根值判别法比比值判别法强**：{@dalembert} 后注中的例子 $u_n = 2^{-n}$（$n$ 偶）、$3^{-n}$（$n$ 奇）里，$\sqrt[n]{u_n}$ 在 $\frac12$ 与 $\frac13$ 之间交替，没有极限，第 1 条用不上；但 $\limsup \sqrt[n]{u_n} = \frac12 < 1$，由第 2 条收敛。一般地，若 $\frac{u_{n+1}}{u_n} \to \ell$，则 $\sqrt[n]{u_n} \to \ell$（见 §2.3 末的「想一想」），所以比值判别法能下结论时，根值判别法也能。
2. 尽管如此，比值判别法常常更好算（阶乘会约掉）；根值判别法适合 $u_n = (\cdots)^n$ 或 $(\cdots)^{n^2}$ 这样的通项。
:::

::: ex id=c2-ex-racine zh="根值判别法的典型用法" lvl=1
1. $\sum_{n \ge 1} \big(1 - \frac1n\big)^{n^2}$：$\sqrt[n]{u_n} = \big(1 - \frac1n\big)^n = \exp\big(n \ln(1 - \frac1n)\big)$。由 $\ln(1 - x) \sim -x$，$n \ln(1 - \frac1n) \to -1$，所以 $\sqrt[n]{u_n} \to \e^{-1} < 1$，**收敛**。
2. $\sum \big(\frac{n}{2n+1}\big)^n$：$\sqrt[n]{u_n} = \frac{n}{2n+1} \to \frac12 < 1$，**收敛**。
3. $\sum \big(\frac{n+1}{n}\big)^{n^2}$：$\sqrt[n]{u_n} = \big(1 + \frac1n\big)^n \to \e > 1$，**粗发散**。
:::

::: thm id=raabe zh="Raabe–Duhamel 判别法" en="Raabe's test" fr="Règle de Raabe–Duhamel" ru="Признак Раабе" lvl=2
设对一切 $n$，$u_n > 0$，且存在 $\alpha \in \R$ 使
$$\frac{u_{n+1}}{u_n} = 1 - \frac{\alpha}{n} + o\Big(\frac1n\Big).$$
$\alpha > 1$ 时级数收敛，$\alpha < 1$ 时级数发散，$\alpha = 1$ 时不能判断。
:::

::: fr
Supposons $u_n > 0$ pour tout $n$ et qu'il existe $\alpha \in \R$ tel que
$$\frac{u_{n+1}}{u_n} = 1 - \frac{\alpha}{n} + o\Big(\frac1n\Big).$$
Si $\alpha > 1$, la série converge ; si $\alpha < 1$, elle diverge ; si $\alpha = 1$, on ne peut pas conclure.
:::

::: sketch
▷ 思路：比值趋于 $1$，几何级数太粗；改与 Riemann 级数 $v_n = n^{-\beta}$ 比较，用 {@c2-comp-log}。$\beta$ 取在 $\alpha$ 与 $1$ 的正中间。

**第 1 步（参照级数的比值）**　设 $\beta \in \R$，$v_n = n^{-\beta}$。由 $(1 + x)^{-\beta} = 1 - \beta x + o(x)$（$x \to 0$）：
$$\frac{v_{n+1}}{v_n} = \Big(1 + \frac1n\Big)^{-\beta} = 1 - \frac{\beta}{n} + o\Big(\frac1n\Big).$$
于是
$$\frac{u_{n+1}}{u_n} - \frac{v_{n+1}}{v_n} = \frac{\beta - \alpha}{n} + o\Big(\frac1n\Big) = \frac1n\big(\beta - \alpha + \eps_n\big), \qquad \eps_n \to 0.$$
当 $\beta \ne \alpha$ 时，取 $N$ 使 $n \ge N$ 时 $\abs{\eps_n} < \frac{\abs{\beta - \alpha}}{2}$，则括号与 $\beta - \alpha$ 同号（$n \ge N$）。

**第 2 步（$\alpha > 1$）**　取 $\beta = \frac{1 + \alpha}{2}$，则 $1 < \beta < \alpha$。由第 1 步，从某项起 $\frac{u_{n+1}}{u_n} < \frac{v_{n+1}}{v_n}$。由 {@c2-comp-log}，$u_n = O(v_n)$；$\beta > 1$，$\sum v_n$ 收敛（{@riemann-series}），所以 $\sum u_n$ 收敛。

**第 3 步（$\alpha < 1$）**　取 $\beta = \frac{1 + \alpha}{2}$，则 $\alpha < \beta < 1$。由第 1 步，从某项起 $\frac{v_{n+1}}{v_n} < \frac{u_{n+1}}{u_n}$。对 $(v_n, u_n)$ 用 {@c2-comp-log}（两者角色互换）：$\sum v_n$ 发散（$\beta < 1$），所以 $\sum u_n$ 发散。

**第 4 步（$\alpha = 1$）**　$u_n = \frac1n$：$\frac{u_{n+1}}{u_n} = \frac{n}{n+1} = 1 - \frac1n + \frac{1}{n(n+1)} = 1 - \frac1n + o\big(\frac1n\big)$，级数发散。$u_n = \frac{1}{n (\ln n)^2}$（$n \ge 2$）：（常规计算）$\frac{\ln n}{\ln(n+1)} = 1 - \frac{1}{n \ln n} + o\big(\frac{1}{n \ln n}\big)$，而 $\frac{1}{n\ln n} = o\big(\frac1n\big)$，所以 $\frac{u_{n+1}}{u_n} = \frac{n}{n+1}\Big(\frac{\ln n}{\ln (n+1)}\Big)^2 = 1 - \frac1n + o\big(\frac1n\big)$，而级数收敛（{@bertrand}）。所以 $\alpha = 1$ 时无法判断。
:::

::: fr
▷ Méthode : le rapport tend vers $1$, la comparaison aux séries géométriques est trop grossière ; on compare aux séries de Riemann $v_n = n^{-\beta}$ à l'aide du {@fr:c2-comp-log}, avec $\beta$ choisi au milieu de $\alpha$ et $1$.

**Étape 1 (rapport de la série de référence)**　Soient $\beta \in \R$ et $v_n = n^{-\beta}$. Comme $(1 + x)^{-\beta} = 1 - \beta x + o(x)$ quand $x \to 0$,
$$\frac{v_{n+1}}{v_n} = \Big(1 + \frac1n\Big)^{-\beta} = 1 - \frac{\beta}{n} + o\Big(\frac1n\Big).$$
Par conséquent
$$\frac{u_{n+1}}{u_n} - \frac{v_{n+1}}{v_n} = \frac{\beta - \alpha}{n} + o\Big(\frac1n\Big) = \frac1n\big(\beta - \alpha + \eps_n\big), \qquad \eps_n \to 0.$$
Si $\beta \ne \alpha$, choisissons $N$ tel que $\abs{\eps_n} < \frac{\abs{\beta - \alpha}}{2}$ pour $n \ge N$ ; la parenthèse a alors le signe de $\beta - \alpha$ pour $n \ge N$.

**Étape 2 ($\alpha > 1$)**　Prenons $\beta = \frac{1 + \alpha}{2}$, de sorte que $1 < \beta < \alpha$. D'après l'étape 1, $\frac{u_{n+1}}{u_n} < \frac{v_{n+1}}{v_n}$ à partir d'un certain rang. D'après le {@fr:c2-comp-log}, $u_n = O(v_n)$ ; comme $\beta > 1$, $\sum v_n$ converge ({@fr:riemann-series}), donc $\sum u_n$ converge.

**Étape 3 ($\alpha < 1$)**　Prenons $\beta = \frac{1 + \alpha}{2}$, de sorte que $\alpha < \beta < 1$. D'après l'étape 1, $\frac{v_{n+1}}{v_n} < \frac{u_{n+1}}{u_n}$ à partir d'un certain rang. Le {@fr:c2-comp-log} appliqué au couple $(v_n, u_n)$ (rôles échangés) montre que, $\sum v_n$ divergeant ($\beta < 1$), $\sum u_n$ diverge.

**Étape 4 ($\alpha = 1$)**　Pour $u_n = \frac1n$ : $\frac{u_{n+1}}{u_n} = \frac{n}{n+1} = 1 - \frac1n + \frac{1}{n(n+1)} = 1 - \frac1n + o\big(\frac1n\big)$, et la série diverge. Pour $u_n = \frac{1}{n (\ln n)^2}$ ($n \ge 2$) : (calcul de routine) $\frac{\ln n}{\ln(n+1)} = 1 - \frac{1}{n \ln n} + o\big(\frac{1}{n \ln n}\big)$ et $\frac{1}{n\ln n} = o\big(\frac1n\big)$, donc $\frac{u_{n+1}}{u_n} = \frac{n}{n+1}\Big(\frac{\ln n}{\ln (n+1)}\Big)^2 = 1 - \frac1n + o\big(\frac1n\big)$, alors que la série converge ({@fr:bertrand}). On ne peut donc pas conclure si $\alpha = 1$.
:::

当余项更好（$O(\frac{1}{n^2})$ 而不只是 $o(\frac1n)$）时，可以得到通项本身的等价量，$\alpha = 1$ 的情形也随之解决。原来写在 Raabe 判别法证明末尾的这句话，这里单独成为一个命题。

::: prop id=c2-raabe-precis zh="比值展开到 $O(1/n^2)$ 时的等价量" en="Asymptotics from a ratio expansion" fr="Équivalent à partir du développement du rapport" ru="Асимптотика члена по разложению отношения" lvl=2
设对一切 $n \ge 1$，$u_n > 0$，且
$$\frac{u_{n+1}}{u_n} = 1 - \frac{\alpha}{n} + O\Big(\frac{1}{n^2}\Big).$$
则存在常数 $C > 0$，使 $u_n \sim \dfrac{C}{n^\alpha}$。因此 $\sum u_n$ 收敛当且仅当 $\alpha > 1$（$\alpha = 1$ 时发散）。
:::

::: fr
Supposons $u_n > 0$ pour tout $n \ge 1$ et
$$\frac{u_{n+1}}{u_n} = 1 - \frac{\alpha}{n} + O\Big(\frac{1}{n^2}\Big).$$
Alors il existe une constante $C > 0$ telle que $u_n \sim \dfrac{C}{n^\alpha}$. Par conséquent, $\sum u_n$ converge si et seulement si $\alpha > 1$ (elle diverge pour $\alpha = 1$).
:::

::: sketch
▷ 思路：要证 $n^\alpha u_n$ 收敛到一个正数。取对数，化为数列 $w_n = \ln(n^\alpha u_n)$ 的收敛性，再用级数与数列的对应（{@serie-telescopique}）。

**第 1 步（相邻两项之差）**　令 $w_n = \ln(n^\alpha u_n) = \alpha \ln n + \ln u_n$。由 $\ln(1 + x) = x + O(x^2)$（$x \to 0$），且 $-\frac{\alpha}{n} + O(\frac{1}{n^2}) \to 0$，
$$\begin{aligned}
w_{n+1} - w_n &= \alpha \ln\Big(1 + \frac1n\Big) + \ln \frac{u_{n+1}}{u_n} \\
&= \alpha\Big(\frac1n + O\Big(\frac{1}{n^2}\Big)\Big) + \Big(-\frac{\alpha}{n} + O\Big(\frac{1}{n^2}\Big)\Big) = O\Big(\frac{1}{n^2}\Big).
\end{aligned}$$

**第 2 步（$(w_n)$ 收敛）**　$\abs{w_{n+1} - w_n} = O(\frac{1}{n^2})$，由 {@comparaison} 第 2 条与 {@riemann-series}，$\sum (w_{n+1} - w_n)$ 绝对收敛，从而收敛（{@c2-abs-cv}）。由 {@serie-telescopique}，$(w_n)$ 收敛到某个 $w \in \R$。

**第 3 步（结论）**　由 $\exp$ 的连续性，$n^\alpha u_n = \e^{w_n} \to \e^{w} =: C > 0$，即 $u_n \sim \frac{C}{n^\alpha}$。由 {@comparaison} 第 3 条与 {@riemann-series}，$\sum u_n$ 收敛当且仅当 $\alpha > 1$。
:::

::: fr
▷ Méthode : on veut montrer que $n^\alpha u_n$ converge vers un réel strictement positif. On passe au logarithme et on étudie la suite $w_n = \ln(n^\alpha u_n)$ grâce au lien suite–série ({@fr:serie-telescopique}).

**Étape 1 (différence de deux termes consécutifs)**　Posons $w_n = \ln(n^\alpha u_n) = \alpha \ln n + \ln u_n$. Comme $\ln(1 + x) = x + O(x^2)$ quand $x \to 0$, et que $-\frac{\alpha}{n} + O(\frac{1}{n^2}) \to 0$,
$$\begin{aligned}
w_{n+1} - w_n &= \alpha \ln\Big(1 + \frac1n\Big) + \ln \frac{u_{n+1}}{u_n} \\
&= \alpha\Big(\frac1n + O\Big(\frac{1}{n^2}\Big)\Big) + \Big(-\frac{\alpha}{n} + O\Big(\frac{1}{n^2}\Big)\Big) = O\Big(\frac{1}{n^2}\Big).
\end{aligned}$$

**Étape 2 ($(w_n)$ converge)**　Comme $\abs{w_{n+1} - w_n} = O(\frac{1}{n^2})$, le point 2 du {@fr:comparaison} et le {@fr:riemann-series} montrent que $\sum (w_{n+1} - w_n)$ converge absolument, donc converge ({@fr:c2-abs-cv}). D'après la {@fr:serie-telescopique}, $(w_n)$ converge vers un réel $w$.

**Étape 3 (conclusion)**　Par continuité de $\exp$, $n^\alpha u_n = \e^{w_n} \to \e^{w} =: C > 0$, c'est-à-dire $u_n \sim \frac{C}{n^\alpha}$. Le point 3 du {@fr:comparaison} et le {@fr:riemann-series} montrent que $\sum u_n$ converge si et seulement si $\alpha > 1$.
:::

::: ex id=c2-ex-binom zh="中心二项式系数" lvl=2
令 $u_n = \dbinom{2n}{n} \dfrac{1}{4^n}$。比值判别法失效：
$$\frac{u_{n+1}}{u_n} = \frac{(2n+2)(2n+1)}{(n+1)^2} \cdot \frac14 = \frac{2n+1}{2n+2} = 1 - \frac{1}{2(n+1)} \to 1.$$
展开：$\frac{1}{2(n+1)} = \frac{1}{2n} \cdot \frac{1}{1 + 1/n} = \frac{1}{2n} + O\big(\frac{1}{n^2}\big)$，所以 $\frac{u_{n+1}}{u_n} = 1 - \frac{1/2}{n} + O\big(\frac{1}{n^2}\big)$。由 {@c2-raabe-precis}（$\alpha = \frac12$），$u_n \sim \frac{C}{\sqrt n}$，$\sum u_n$ 发散。由 Stirling 公式（{@stirling-serie}）可以算出 $C = \frac{1}{\sqrt\pi}$。
:::

::: method zh="判别法的使用顺序"
1. 先看 $u_n \to 0$ 是否成立（{@cn-grossiere}）。不成立就结束了。
2. 找 $u_n$ 的等价量或上界（Taylor 展开），与 Riemann 级数（{@riemann-series}）或 Bertrand 级数（{@bertrand}）比较（{@comparaison}）。这是法国大纲最推崇的方法。找不到等价量时，试 $n^\alpha u_n$ 法则（{@c2-ex-riemann}）。
3. 含阶乘或 $a^n$ 时用 d'Alembert（{@dalembert}）；含 $(\cdots)^n$ 时用 Cauchy（{@cauchy-racine}）。
4. 比值趋于 $1$ 时，把 $\frac{u_{n+1}}{u_n}$ 展开到 $\frac1n$ 阶，用 Raabe–Duhamel（{@raabe}）；能展开到 $\frac{1}{n^2}$ 阶时用 {@c2-raabe-precis}，连等价量一起得到。
5. $u_n = f(n)$ 且 $f$ 单调、积分可算时，用级数–积分比较（{@serie-integrale}）。
6. 以上全部只适用于（从某项起）**定号**的通项。变号的情形见 §2.4。
:::

::: q
若 $u_n \ge 0$ 且 $\sum u_n$ 收敛，是否一定有 $u_n = o\big(\frac1n\big)$？若再假设 $(u_n)$ 递减呢？
:::

::: ans
**一般不成立。** 令 $u_n = \frac{1}{\sqrt n}$（当 $n = k^4$，$k \ge 1$），其余 $u_n = 0$。部分和 $\sum_{m \le n} u_m = \sum_{k : k^4 \le n} \frac{1}{k^2} \le \sum_{k \ge 1} \frac{1}{k^2}$ 有界，由 {@c2-pos-bornee} 收敛。但在 $n = k^4$ 处 $n u_n = \sqrt n = k^2 \to +\infty$，$u_n$ 甚至不是 $O\big(\frac1n\big)$。

**若 $(u_n)$ 递减，则成立**（Abel–Pringsheim）。

1. 对 $n \ge 1$，和 $\sum_{k=n+1}^{2n} u_k$ 有 $n$ 项，每一项 $\ge u_{2n}$（递减），所以 $0 \le n u_{2n} \le \sum_{k=n+1}^{2n} u_k \le R_n$（$u_k \ge 0$）。
2. 收敛级数的余项 $R_n \to 0$，由夹逼，$n u_{2n} \to 0$，即 $(2n) u_{2n} \to 0$。
3. 奇数下标：$0 \le (2n+1) u_{2n+1} \le (2n+1) u_{2n} = \frac{2n+1}{2n} \cdot 2n u_{2n} \to 1 \cdot 0 = 0$。
4. 偶数项与奇数项的子列都趋于 $0$，所以 $n u_n \to 0$（拼接方法同 §2.1 第二个「想一想」）。
:::

::: q
$\sum_{n \ge 1} \dfrac{1}{n^{1 + 1/n}}$ 收敛吗？「指数 $1 + \frac1n$ 总大于 $1$」能说明问题吗？
:::

::: ans
发散。$n^{1 + 1/n} = n \cdot n^{1/n}$，而 $n^{1/n} = \e^{\ln n / n} \to 1$，所以 $\frac{1}{n^{1+1/n}} \sim \frac1n$，由 {@comparaison} 第 3 条与调和级数，发散。Riemann 判别法要求指数是**固定**的 $\alpha > 1$；指数随 $n$ 变化并趋于 $1$ 时，它不适用。
:::

## 渐近关系的求和

比较定理只回答「收敛还是发散」。很多时候需要更多：部分和以什么速度趋于无穷？余项以什么速度趋于 $0$？本节的定理说，以一个**正项**级数为参照时，关系 $o$、$O$、$\sim$ 可以「求和」：收敛时对余项求和，发散时对部分和求和。结合级数与数列的对应（{@serie-telescopique}），它能给出 $H_n$、$n!$ 这类数列的渐近展开。

::: thm id=sommation-relations zh="渐近关系的求和" en="Summation of asymptotic relations" fr="Sommation des relations de comparaison" ru="Суммирование асимптотических соотношений" lvl=1
设对一切 $n$，$v_n > 0$；$(u_n)$ 是 $\K$ 中的数列。

1. （收敛情形）设 $\sum v_n$ 收敛。
   - 若 $u_n = o(v_n)$，则 $\sum u_n$ 绝对收敛，且余项满足 $\sum_{k > n} u_k = o\big(\sum_{k > n} v_k\big)$；
   - 若 $u_n = O(v_n)$，则 $\sum u_n$ 绝对收敛，且 $\sum_{k > n} u_k = O\big(\sum_{k > n} v_k\big)$；
   - 若 $u_n \sim v_n$，则 $\sum u_n$ 绝对收敛，且 $\sum_{k > n} u_k \sim \sum_{k > n} v_k$。
2. （发散情形）设 $\sum v_n$ 发散。
   - 若 $u_n = o(v_n)$，则部分和满足 $\sum_{k \le n} u_k = o\big(\sum_{k \le n} v_k\big)$；
   - 若 $u_n = O(v_n)$，则 $\sum_{k \le n} u_k = O\big(\sum_{k \le n} v_k\big)$；
   - 若 $u_n \sim v_n$，则 $\sum u_n$ 发散，且 $\sum_{k \le n} u_k \sim \sum_{k \le n} v_k$。
:::

::: fr
Soient $(v_n)$ telle que $v_n > 0$ pour tout $n$, et $(u_n)$ une suite d'éléments de $\K$.

1. (Cas convergent) Supposons que $\sum v_n$ converge.
   - Si $u_n = o(v_n)$, alors $\sum u_n$ converge absolument et les restes vérifient $\sum_{k > n} u_k = o\big(\sum_{k > n} v_k\big)$ ;
   - si $u_n = O(v_n)$, alors $\sum u_n$ converge absolument et $\sum_{k > n} u_k = O\big(\sum_{k > n} v_k\big)$ ;
   - si $u_n \sim v_n$, alors $\sum u_n$ converge absolument et $\sum_{k > n} u_k \sim \sum_{k > n} v_k$.
2. (Cas divergent) Supposons que $\sum v_n$ diverge.
   - Si $u_n = o(v_n)$, alors les sommes partielles vérifient $\sum_{k \le n} u_k = o\big(\sum_{k \le n} v_k\big)$ ;
   - si $u_n = O(v_n)$, alors $\sum_{k \le n} u_k = O\big(\sum_{k \le n} v_k\big)$ ;
   - si $u_n \sim v_n$, alors $\sum u_n$ diverge et $\sum_{k \le n} u_k \sim \sum_{k \le n} v_k$.
:::

::: proof
▷ 思路：$o$ 的定义给出「从某项起 $\abs{u_k} \le \eps v_k$」。收敛情形：直接对 $k > n$ 求和。发散情形：前面有限多项的贡献是一个常数，它被 $\sum_{k \le n} v_k \to +\infty$「淹没」。$O$ 与 $\sim$ 的版本都套用 $o$ 的论证。

记 $V_n = \sum_{k=0}^n v_k$，$U_n = \sum_{k=0}^n u_k$；收敛情形记 $\rho_n = \sum_{k > n} v_k$。因为 $v_k > 0$，$V_n > 0$、$\rho_n > 0$，所以「$= o(\rho_n)$」可以写成「$\le \eps \rho_n$」。

**第 1 步（收敛情形，$o$）**

1. 绝对收敛：在 $o$ 的定义中取 $\eps = 1$，从某项起 $\abs{u_n} \le v_n$；由 {@comparaison} 第 1 条，$\sum \abs{u_n}$ 收敛，再由 {@c2-abs-cv}，$\sum u_n$ 收敛。
2. 翻译假设：取 $\eps > 0$，存在 $N$，使对一切 $k \ge N$，$\abs{u_k} \le \eps v_k$。
3. 设 $n \ge N$，$m > n$。由三角不等式与第 2 点，
   $$\Big|\sum_{k=n+1}^m u_k\Big| \le \sum_{k=n+1}^m \abs{u_k} \le \eps \sum_{k=n+1}^m v_k.$$
4. 令 $m \to \infty$：左边趋于 $\big|\sum_{k > n} u_k\big|$（$\abs{\cdot}$ 连续），右边趋于 $\eps \rho_n$；取极限保持不严格不等式。所以对一切 $n \ge N$，$\big|\sum_{k > n} u_k\big| \le \eps \rho_n$。

这就证明了 $\sum_{k > n} u_k = o(\rho_n)$。

**第 2 步（发散情形，$o$）**

1. 由 {@c2-pos-bornee}，$V_n \to +\infty$。
2. 翻译假设：取 $\eps > 0$，存在 $N_1$，使对一切 $k \ge N_1$，$\abs{u_k} \le \frac{\eps}{2} v_k$。
3. 令 $C = \big|\sum_{k=0}^{N_1 - 1} u_k\big|$（常数，$N_1 = 0$ 时为 $0$）。对 $n \ge N_1$，
   $$\begin{aligned}
   \abs{U_n} &\le C + \sum_{k=N_1}^n \abs{u_k} && \text{（三角不等式）}\\
   &\le C + \tfrac{\eps}{2} \sum_{k=N_1}^n v_k \le C + \tfrac{\eps}{2} V_n && \text{（第 2 点；} v_k > 0\text{）}.
   \end{aligned}$$
4. 由第 1 点，存在 $N_2$，使对一切 $n \ge N_2$，$V_n \ge \frac{2C}{\eps}$，即 $C \le \frac{\eps}{2} V_n$。
5. 令 $N = \max(N_1, N_2)$。对 $n \ge N$，$\abs{U_n} \le \frac{\eps}{2} V_n + \frac{\eps}{2} V_n = \eps V_n$。

这就证明了 $U_n = o(V_n)$。

**第 3 步（$O$ 的版本）**　翻译假设：存在 $M \ge 0$ 与 $N$，使对一切 $k \ge N$，$\abs{u_k} \le M v_k$。收敛情形：由 {@comparaison} 第 2 条与 {@c2-abs-cv}，$\sum u_n$ 绝对收敛；把第 1 步第 3、4 点中的 $\eps$ 换成 $M$，得 $n \ge N$ 时 $\big|\sum_{k > n} u_k\big| \le M \rho_n$。发散情形：同第 2 步第 3 点，$n \ge N$ 时 $\abs{U_n} \le C + M V_n$（$C = \big|\sum_{k < N} u_k\big|$）；取 $N'$ 使 $n \ge N'$ 时 $V_n \ge C$，则 $n \ge \max(N, N')$ 时 $\abs{U_n} \le (M + 1) V_n$。

**第 4 步（$\sim$ 的版本）**　令 $w_n = u_n - v_n$，假设即 $w_n = o(v_n)$。

- 收敛情形：由第 1 步，$\sum w_n$ 绝对收敛且 $\sum_{k > n} w_k = o(\rho_n)$。$\abs{u_n} \le \abs{w_n} + v_n$，所以 $\sum u_n$ 绝对收敛（{@comparaison}），且由 {@c2-linearite}，$\sum_{k > n} u_k = \rho_n + \sum_{k > n} w_k = \rho_n + o(\rho_n)$，即 $\sum_{k > n} u_k \sim \rho_n$。
- 发散情形：由第 2 步，$\sum_{k \le n} w_k = o(V_n)$，所以 $U_n = V_n + \sum_{k \le n} w_k = V_n + o(V_n)$，即 $U_n \sim V_n$。特别地（在 $o$ 的定义中取 $\eps = \frac12$），从某项起 $\abs{U_n} \ge V_n - \frac12 V_n = \frac12 V_n \to +\infty$，$(U_n)$ 不收敛，$\sum u_n$ 发散。
:::

::: fr
▷ Méthode : la définition de $o$ fournit « $\abs{u_k} \le \eps v_k$ à partir d'un certain rang ». Dans le cas convergent, on somme directement pour $k > n$. Dans le cas divergent, la contribution des premiers termes est une constante, « noyée » par $\sum_{k \le n} v_k \to +\infty$. Les versions $O$ et $\sim$ reprennent l'argument du $o$.

On note $V_n = \sum_{k=0}^n v_k$, $U_n = \sum_{k=0}^n u_k$ et, dans le cas convergent, $\rho_n = \sum_{k > n} v_k$. Comme $v_k > 0$, on a $V_n > 0$ et $\rho_n > 0$, donc « $= o(\rho_n)$ » peut s'écrire « $\le \eps \rho_n$ ».

**Étape 1 (cas convergent, $o$)**

1. Convergence absolue : en prenant $\eps = 1$ dans la définition de $o$, on a $\abs{u_n} \le v_n$ à partir d'un certain rang ; d'après le point 1 du {@fr:comparaison}, $\sum \abs{u_n}$ converge, puis $\sum u_n$ converge d'après la {@fr:c2-abs-cv}.
2. On traduit l'hypothèse : soit $\eps > 0$ ; il existe $N$ tel que pour tout $k \ge N$, $\abs{u_k} \le \eps v_k$.
3. Soient $n \ge N$ et $m > n$. Par l'inégalité triangulaire et le point 2,
   $$\Big|\sum_{k=n+1}^m u_k\Big| \le \sum_{k=n+1}^m \abs{u_k} \le \eps \sum_{k=n+1}^m v_k.$$
4. Faisons tendre $m$ vers l'infini : le membre de gauche tend vers $\big|\sum_{k > n} u_k\big|$ (continuité de $\abs{\cdot}$), celui de droite vers $\eps \rho_n$, et le passage à la limite conserve les inégalités larges. Ainsi, pour tout $n \ge N$, $\big|\sum_{k > n} u_k\big| \le \eps \rho_n$.

Ceci montre que $\sum_{k > n} u_k = o(\rho_n)$.

**Étape 2 (cas divergent, $o$)**

1. D'après le {@fr:c2-pos-bornee}, $V_n \to +\infty$.
2. On traduit l'hypothèse : soit $\eps > 0$ ; il existe $N_1$ tel que pour tout $k \ge N_1$, $\abs{u_k} \le \frac{\eps}{2} v_k$.
3. Posons $C = \big|\sum_{k=0}^{N_1 - 1} u_k\big|$ (une constante, nulle si $N_1 = 0$). Pour $n \ge N_1$,
   $$\begin{aligned}
   \abs{U_n} &\le C + \sum_{k=N_1}^n \abs{u_k} && \text{(inégalité triangulaire)}\\
   &\le C + \tfrac{\eps}{2} \sum_{k=N_1}^n v_k \le C + \tfrac{\eps}{2} V_n && \text{(point 2 ; } v_k > 0\text{)}.
   \end{aligned}$$
4. D'après le point 1, il existe $N_2$ tel que pour tout $n \ge N_2$, $V_n \ge \frac{2C}{\eps}$, c'est-à-dire $C \le \frac{\eps}{2} V_n$.
5. Posons $N = \max(N_1, N_2)$. Pour $n \ge N$, $\abs{U_n} \le \frac{\eps}{2} V_n + \frac{\eps}{2} V_n = \eps V_n$.

Ceci montre que $U_n = o(V_n)$.

**Étape 3 (version $O$)**　On traduit l'hypothèse : il existe $M \ge 0$ et $N$ tels que pour tout $k \ge N$, $\abs{u_k} \le M v_k$. Cas convergent : d'après le point 2 du {@fr:comparaison} et la {@fr:c2-abs-cv}, $\sum u_n$ converge absolument ; en remplaçant $\eps$ par $M$ dans les points 3 et 4 de l'étape 1, on obtient $\big|\sum_{k > n} u_k\big| \le M \rho_n$ pour $n \ge N$. Cas divergent : comme au point 3 de l'étape 2, $\abs{U_n} \le C + M V_n$ pour $n \ge N$ (avec $C = \big|\sum_{k < N} u_k\big|$) ; soit $N'$ tel que $V_n \ge C$ pour $n \ge N'$ ; alors $\abs{U_n} \le (M + 1) V_n$ pour $n \ge \max(N, N')$.

**Étape 4 (version $\sim$)**　Posons $w_n = u_n - v_n$ ; l'hypothèse s'écrit $w_n = o(v_n)$.

- Cas convergent : d'après l'étape 1, $\sum w_n$ converge absolument et $\sum_{k > n} w_k = o(\rho_n)$. Comme $\abs{u_n} \le \abs{w_n} + v_n$, $\sum u_n$ converge absolument ({@fr:comparaison}) et, d'après la {@fr:c2-linearite}, $\sum_{k > n} u_k = \rho_n + \sum_{k > n} w_k = \rho_n + o(\rho_n)$, c'est-à-dire $\sum_{k > n} u_k \sim \rho_n$.
- Cas divergent : d'après l'étape 2, $\sum_{k \le n} w_k = o(V_n)$, donc $U_n = V_n + \sum_{k \le n} w_k = V_n + o(V_n)$, c'est-à-dire $U_n \sim V_n$. En particulier (avec $\eps = \frac12$ dans la définition de $o$), $\abs{U_n} \ge V_n - \frac12 V_n = \frac12 V_n \to +\infty$ à partir d'un certain rang : $(U_n)$ ne converge pas, et $\sum u_n$ diverge.
:::

::: rem
1. **参照级数必须定号。** 令 $v_n = \frac{(-1)^n}{\sqrt n}$，$u_n = \frac{1}{n \ln n}$（$n \ge 2$）。$\big|\frac{u_n}{v_n}\big| = \frac{1}{\sqrt n \ln n} \to 0$，所以 $u_n = o(v_n)$；$\sum v_n$ 收敛（{@csa}），但 $\sum u_n$ 发散（{@bertrand}）。第 1 条的结论完全失效。
2. **发散情形只谈部分和**：$u_n = o(v_n)$ 且 $\sum v_n$ 发散时，$\sum u_n$ 可能收敛（$\frac{1}{n^2} = o(\frac1n)$），也可能发散（$\frac{1}{n \ln n} = o(\frac1n)$）。
3. **口诀**：收敛看余项，发散看部分和。取 $v_n = 1$ 就得到 Cesàro 型的结论：若 $u_n \to 0$，则 $\frac1n \sum_{k < n} u_k \to 0$。
:::

::: ex id=euler-gamma zh="Euler 常数" lvl=1
令 $H_n = \sum_{k=1}^n \frac1k$，$a_n = H_n - \ln n$（$n \ge 1$）。

**(a) 相邻项之差。** $a_{n+1} - a_n = \frac{1}{n+1} - \ln(n+1) + \ln n = \frac{1}{n+1} - \ln\big(1 + \frac1n\big)$。由 Taylor 展开
$$\frac{1}{n+1} = \frac1n \cdot \frac{1}{1 + \frac1n} = \frac1n - \frac{1}{n^2} + O\Big(\frac{1}{n^3}\Big), \qquad \ln\Big(1 + \frac1n\Big) = \frac1n - \frac{1}{2n^2} + O\Big(\frac{1}{n^3}\Big),$$
得
$$a_{n+1} - a_n = -\frac{1}{2n^2} + O\Big(\frac{1}{n^3}\Big), \qquad \text{即} \quad a_{n+1} - a_n \sim -\frac{1}{2n^2}.$$

**(b) $(a_n)$ 收敛。** $-(a_{n+1} - a_n) \sim \frac{1}{2n^2}$，后者为正且 $\sum \frac{1}{2n^2}$ 收敛，由 {@sommation-relations} 第 1 条（$\sim$），$\sum (a_{n+1} - a_n)$ 收敛。由 {@serie-telescopique}，$(a_n)$ 收敛；记其极限为 $\gamma$（Euler 常数）。因此
$$H_n = \ln n + \gamma + o(1), \qquad \gamma \approx 0.5772156649.$$

**(c) 下一项。** 对 $n \ge 1$，$\sum_{k=n}^{m} (a_{k+1} - a_k) = a_{m+1} - a_n \to \gamma - a_n$，所以 $a_n - \gamma = \sum_{k \ge n} \big(-(a_{k+1} - a_k)\big)$。对 $-(a_{k+1} - a_k) \sim \frac{1}{2k^2}$ 再用 {@sommation-relations} 第 1 条（余项从 $k = n$ 开始），并用 {@c2-ex-riemann-equiv} 第 2 条（$\sum_{k \ge n} \frac{1}{k^2} = \sum_{k > n-1} \frac{1}{k^2} \sim \frac{1}{n-1} \sim \frac1n$）：
$$a_n - \gamma \sim \sum_{k \ge n} \frac{1}{2k^2} \sim \frac{1}{2n}, \qquad \text{即} \quad H_n = \ln n + \gamma + \frac{1}{2n} + o\Big(\frac1n\Big).$$
数值检验：$H_{10} = 2.92897\ldots$，而 $\ln 10 + \gamma + \frac{1}{20} = 2.92980\ldots$，误差约 $8 \times 10^{-4}$，确实远小于 $\frac{1}{20}$。
:::

::: ex id=c2-ex-sqrt zh="找一个等价的望远镜项" lvl=1
求 $\sum_{k=1}^n \frac{1}{\sqrt k}$ 的等价量。

1. **望远镜项。** $\sqrt{k+1} - \sqrt k = \frac{1}{\sqrt{k+1} + \sqrt k}$，而 $\frac{\sqrt{k+1} + \sqrt k}{2\sqrt k} = \frac{1 + \sqrt{1 + 1/k}}{2} \to 1$，所以
   $$\frac{1}{\sqrt k} \sim 2\big(\sqrt{k+1} - \sqrt k\big) =: v_k > 0.$$
2. **参照级数发散。** $\sum_{k=1}^n v_k = 2(\sqrt{n+1} - 1) \to +\infty$（望远镜求和）。
3. **求和。** 由 {@sommation-relations} 第 2 条（$\sim$），
   $$\sum_{k=1}^n \frac{1}{\sqrt k} \sim 2\big(\sqrt{n+1} - 1\big) \sim 2\sqrt n.$$

这是本节最常用的技巧：**为通项找一个可以望远镜求和的等价量**。$H_n \sim \ln n$ 也可以这样得到：$\frac1k \sim \ln(k+1) - \ln k$。
:::

::: thm id=stirling-serie zh="Stirling 公式" en="Stirling's formula" fr="Formule de Stirling" ru="Формула Стирлинга" lvl=2
$$n! \sim \sqrt{2\pi n}\, \Big(\frac{n}{\e}\Big)^n.$$
:::

::: fr
$$n! \sim \sqrt{2\pi n}\, \Big(\frac{n}{\e}\Big)^n.$$
:::

::: sketch
▷ 思路：先用级数与数列的对应证明 $n! \e^n n^{-n-1/2}$ 收敛到某个 $C > 0$；再用 Wallis 积分把 $C$ 算出来。

**第 1 步（存在常数 $C$）**　令 $a_n = \ln\big(n!\, \e^n n^{-n-1/2}\big) = \ln n! + n - (n + \tfrac12)\ln n$（$n \ge 1$）。直接计算：
$$a_{n+1} - a_n = \ln(n+1) + 1 - \big(n + \tfrac32\big)\ln(n+1) + \big(n + \tfrac12\big)\ln n = 1 - \big(n + \tfrac12\big)\ln\Big(1 + \frac1n\Big).$$
（常规计算：$\ln(1 + x) = x - \frac{x^2}{2} + \frac{x^3}{3} + O(x^4)$，$x = \frac1n$）
$$\big(n + \tfrac12\big)\ln\Big(1 + \frac1n\Big) = 1 + \frac{1}{12 n^2} + O\Big(\frac{1}{n^3}\Big), \qquad \text{所以} \quad a_{n+1} - a_n \sim -\frac{1}{12 n^2}.$$
由 {@sommation-relations} 第 1 条，$\sum (a_{n+1} - a_n)$ 收敛；由 {@serie-telescopique}，$a_n \to L \in \R$。令 $C = \e^L > 0$，由 $\exp$ 连续，$n!\,\e^n n^{-n-1/2} \to C$，即 $n! \sim C\sqrt n\,(n/\e)^n$。

**第 2 步（Wallis 积分）**　令 $W_n = \int_0^{\pi/2} \cos^n t\,\dd t$。

1. $W_0 = \frac{\pi}{2}$，$W_1 = 1$；被积函数连续、非负且不恒为 $0$，所以 $W_n > 0$；$0 \le \cos t \le 1$ 给出 $\cos^{n+1} t \le \cos^n t$，所以 $(W_n)$ 递减。
2. 分部积分（$\cos^{n+2} = \cos^{n+1} \cdot \cos$，常规计算）：$W_{n+2} = (n+1)(W_n - W_{n+2})$，即 $W_{n+2} = \frac{n+1}{n+2} W_n$。
3. 由第 2 点归纳：$W_{2n} = \dfrac{(2n)!}{4^n (n!)^2} \cdot \dfrac{\pi}{2}$；且 $(n+1) W_{n+1} W_n$ 与 $n$ 无关，等于 $1 \cdot W_1 W_0 = \frac{\pi}{2}$。
4. 由单调性，$\frac{n+1}{n+2} = \frac{W_{n+2}}{W_n} \le \frac{W_{n+1}}{W_n} \le 1$，夹逼得 $W_{n+1} \sim W_n$。于是 $\frac{\pi}{2} = (n+1) W_{n+1} W_n \sim n W_n^2$，即 $W_n \sim \sqrt{\frac{\pi}{2n}}$。

**第 3 步（确定 $C$）**　由第 1 步（注意 $(2n)^{2n} = 4^n n^{2n}$），
$$\frac{(2n)!}{4^n (n!)^2} \sim \frac{C\sqrt{2n}\,(2n)^{2n}\e^{-2n}}{4^n\, C^2 n\, n^{2n} \e^{-2n}} = \frac{\sqrt 2}{C\sqrt n}.$$
由第 2 步第 3、4 点，$\frac{(2n)!}{4^n (n!)^2} = \frac{2}{\pi} W_{2n} \sim \frac{2}{\pi}\sqrt{\frac{\pi}{4n}} = \frac{1}{\sqrt{\pi n}}$。两个等价量之比趋于 $1$：$\frac{\sqrt 2 \sqrt{\pi n}}{C\sqrt n} = \frac{\sqrt{2\pi}}{C} = 1$，所以 $C = \sqrt{2\pi}$。

第 7 章会用 $\Gamma$ 函数给出另一个证明（{@stirling-gamma}）。
:::

::: fr
▷ Méthode : on montre d'abord, grâce au lien suite–série, que $n! \e^n n^{-n-1/2}$ converge vers un certain $C > 0$ ; on calcule ensuite $C$ à l'aide des intégrales de Wallis.

**Étape 1 (existence de la constante $C$)**　Posons $a_n = \ln\big(n!\, \e^n n^{-n-1/2}\big) = \ln n! + n - (n + \tfrac12)\ln n$ ($n \ge 1$). Un calcul direct donne
$$a_{n+1} - a_n = \ln(n+1) + 1 - \big(n + \tfrac32\big)\ln(n+1) + \big(n + \tfrac12\big)\ln n = 1 - \big(n + \tfrac12\big)\ln\Big(1 + \frac1n\Big).$$
(Calcul de routine : $\ln(1 + x) = x - \frac{x^2}{2} + \frac{x^3}{3} + O(x^4)$ avec $x = \frac1n$.)
$$\big(n + \tfrac12\big)\ln\Big(1 + \frac1n\Big) = 1 + \frac{1}{12 n^2} + O\Big(\frac{1}{n^3}\Big), \qquad \text{donc} \quad a_{n+1} - a_n \sim -\frac{1}{12 n^2}.$$
D'après le point 1 du {@fr:sommation-relations}, $\sum (a_{n+1} - a_n)$ converge ; d'après la {@fr:serie-telescopique}, $a_n \to L \in \R$. Posons $C = \e^L > 0$ ; par continuité de $\exp$, $n!\,\e^n n^{-n-1/2} \to C$, c'est-à-dire $n! \sim C\sqrt n\,(n/\e)^n$.

**Étape 2 (intégrales de Wallis)**　Posons $W_n = \int_0^{\pi/2} \cos^n t\,\dd t$.

1. $W_0 = \frac{\pi}{2}$, $W_1 = 1$ ; l'intégrande est continue, positive et non identiquement nulle, donc $W_n > 0$ ; comme $0 \le \cos t \le 1$, $\cos^{n+1} t \le \cos^n t$, donc $(W_n)$ est décroissante.
2. Une intégration par parties ($\cos^{n+2} = \cos^{n+1} \cdot \cos$, calcul de routine) donne $W_{n+2} = (n+1)(W_n - W_{n+2})$, soit $W_{n+2} = \frac{n+1}{n+2} W_n$.
3. Par récurrence à partir du point 2 : $W_{2n} = \dfrac{(2n)!}{4^n (n!)^2} \cdot \dfrac{\pi}{2}$ ; de plus $(n+1) W_{n+1} W_n$ ne dépend pas de $n$ et vaut $1 \cdot W_1 W_0 = \frac{\pi}{2}$.
4. Par décroissance, $\frac{n+1}{n+2} = \frac{W_{n+2}}{W_n} \le \frac{W_{n+1}}{W_n} \le 1$, et le théorème des gendarmes donne $W_{n+1} \sim W_n$. Ainsi $\frac{\pi}{2} = (n+1) W_{n+1} W_n \sim n W_n^2$, soit $W_n \sim \sqrt{\frac{\pi}{2n}}$.

**Étape 3 (calcul de $C$)**　D'après l'étape 1 (noter que $(2n)^{2n} = 4^n n^{2n}$),
$$\frac{(2n)!}{4^n (n!)^2} \sim \frac{C\sqrt{2n}\,(2n)^{2n}\e^{-2n}}{4^n\, C^2 n\, n^{2n} \e^{-2n}} = \frac{\sqrt 2}{C\sqrt n}.$$
D'après les points 3 et 4 de l'étape 2, $\frac{(2n)!}{4^n (n!)^2} = \frac{2}{\pi} W_{2n} \sim \frac{2}{\pi}\sqrt{\frac{\pi}{4n}} = \frac{1}{\sqrt{\pi n}}$. Le quotient de ces deux équivalents tend vers $1$ : $\frac{\sqrt 2 \sqrt{\pi n}}{C\sqrt n} = \frac{\sqrt{2\pi}}{C} = 1$, donc $C = \sqrt{2\pi}$.

Le chapitre 7 donne une autre preuve à l'aide de la fonction $\Gamma$ ({@fr:stirling-gamma}).
:::

::: rem
**下一项。** 第 1 步还能给出更多。对 $a_{k+1} - a_k \sim -\frac{1}{12k^2}$ 用 {@sommation-relations} 第 1 条，与 {@euler-gamma} (c) 完全相同的计算给出 $a_n - L \sim \frac{1}{12n}$，于是
$$n! = \sqrt{2\pi n}\,\Big(\frac{n}{\e}\Big)^n \Big(1 + \frac{1}{12n} + o\Big(\frac1n\Big)\Big).$$
数值检验：$10! = 3\,628\,800$，$\sqrt{20\pi}\,(10/\e)^{10} \approx 3\,598\,696$，比值 $\approx 1.00837$，而 $1 + \frac{1}{120} \approx 1.00833$。
:::

::: q
设对一切 $n$，$u_n > 0$，且 $\frac{u_{n+1}}{u_n} \to \ell \in [0, +\infty]$。证明 $\sqrt[n]{u_n} \to \ell$。由此说明：比值判别法（{@dalembert}）能下结论时，根值判别法（{@cauchy-racine}）也能。
:::

::: ans
**情形 $0 < \ell < +\infty$。** 令 $w_k = \ln u_{k+1} - \ln u_k - \ln \ell$。由 $\ln$ 的连续性，$w_k = \ln\frac{u_{k+1}}{u_k} - \ln \ell \to 0$，即 $w_k = o(1)$。取 $v_k = 1$（$\sum v_k$ 发散，$\sum_{k < n} v_k = n$），由 {@sommation-relations} 第 2 条，
$$\sum_{k=0}^{n-1} w_k = \ln u_n - \ln u_0 - n \ln \ell = o(n).$$
除以 $n$：$\frac{\ln u_n}{n} \to \ln \ell$，由 $\exp$ 的连续性，$\sqrt[n]{u_n} = \exp\big(\frac{\ln u_n}{n}\big) \to \ell$。

**情形 $\ell = 0$。** 取 $\eps \in \left]0, 1\right[$，存在 $N$ 使 $n \ge N$ 时 $u_{n+1} \le \eps u_n$，于是 $u_n \le u_N \eps^{-N} \eps^n$，$\sqrt[n]{u_n} \le (u_N \eps^{-N})^{1/n} \eps \to \eps$。所以从某项起 $0 < \sqrt[n]{u_n} \le 2\eps$，$\sqrt[n]{u_n} \to 0$。**情形 $\ell = +\infty$** 对 $\frac{1}{u_n}$ 用 $\ell = 0$ 的情形。

逆命题不成立：{@dalembert} 后注中的例子 $\sqrt[n]{u_n}$ 有上极限 $\frac12$，而比值无极限。
:::

::: q
用 Stirling 公式求 $\dbinom{2n}{n}$ 的等价量，并与 {@c2-ex-binom} 对照。
:::

::: ans
$$\binom{2n}{n} = \frac{(2n)!}{(n!)^2} \sim \frac{\sqrt{4\pi n}\,(2n/\e)^{2n}}{2\pi n\,(n/\e)^{2n}} = \frac{2\sqrt{\pi n}\; 4^n}{2\pi n} = \frac{4^n}{\sqrt{\pi n}}.$$
所以 $u_n = \binom{2n}{n} 4^{-n} \sim \frac{1}{\sqrt{\pi n}}$：{@c2-ex-binom} 中的常数 $C = \frac{1}{\sqrt\pi}$。
:::

<!-- c2-continue -->
