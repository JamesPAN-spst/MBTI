形如 $F(x) = \int_I f(x, t)\,\dd t$ 的函数称为**含参变量积分**。$\Gamma$ 函数、Fourier 变换、Laplace 变换、卷积都是这种形式。本章研究 $F$ 的连续性和可导性，主要工具是控制收敛定理 {@cv-dominee}，这是法国大纲的做法。苏联和中国教材用「含参广义积分的一致收敛」处理同样的问题，本章最后一节说明两种方法的关系。全章 $A$ 是 $\R$ 的子集（参数的取值范围），$I$ 是区间。

**约定与工具。** $x \in A$ 是参数，$t \in I$ 是积分变量。与第 6 章一样，关于 $t$ 的函数都假定在 $I$ 上分段连续（即在 $I$ 的每个闭子区间上分段连续），「可积」指 {@def-integrable} 意义下的绝对收敛。证明反复用到两个工具：

- 控制收敛定理 {@cv-dominee}（承认，不证明）：它处理的是**函数列** $(g_n)$；
- 极限的序列刻画（Heine 归结原理，L1）：$\lim_{x \to a} F(x) = L$ 当且仅当对 $A$ 中每个趋于 $a$ 的数列 $(x_n)$，都有 $F(x_n) \to L$；连续的情形就是 {@carac-seq-cont}。

本章的定理都按同一个模式证明：**把连续参数 $x$ 换成数列 $x_n$，对函数列 $g_n = f(x_n, \cdot)$ 用控制收敛定理，再用序列刻画回到连续参数。**

## 连续性与取极限

已知每个 $x \mapsto f(x, t)$ 连续，问 $F$ 是否连续，就是问极限与积分能否交换：
$$\lim_{x \to x_0}\int_I f(x, t)\,\dd t \overset{?}{=} \int_I \lim_{x \to x_0} f(x, t)\,\dd t.$$
第 6 章的反例 {@cex-domination} 说明一般不能交换。需要的是一个**与参数无关**的可积上界。

::: def id=c7-def-domination zh="控制条件与控制函数" en="Domination hypothesis, dominating function" fr="Hypothèse de domination, fonction dominante" ru="Условие мажорирования, интегрируемая мажоранта"
设 $f : A \times I \to \K$，$B \subset A$。称 $f$ 在 $B \times I$ 上满足**控制条件**，如果存在在 $I$ 上分段连续、可积的函数 $\varphi : I \to \R_+$，使
$$\forall x \in B,\ \forall t \in I,\qquad \abs{f(x, t)} \le \varphi(t).$$
$\varphi$ 称为**控制函数**。

当 $A$ 是区间时，称 $f$ **在 $A$ 的每个闭区间上满足控制条件**，如果对每个闭区间 $[a, b] \subset A$，$f$ 在 $[a, b] \times I$ 上满足控制条件（控制函数 $\varphi_{[a,b]}$ 可以依赖于 $[a, b]$）。
:::

::: fr
Soient $f : A \times I \to \K$ et $B \subset A$. On dit que $f$ vérifie l'**hypothèse de domination** sur $B \times I$ s'il existe une fonction $\varphi : I \to \R_+$, continue par morceaux et intégrable sur $I$, telle que
$$\forall x \in B,\ \forall t \in I,\qquad \abs{f(x, t)} \le \varphi(t).$$
La fonction $\varphi$ est appelée **fonction dominante**.

Lorsque $A$ est un intervalle, on dit que $f$ vérifie l'hypothèse de **domination sur tout segment** de $A$ si, pour tout segment $[a, b] \subset A$, $f$ vérifie l'hypothèse de domination sur $[a, b] \times I$ (la fonction dominante $\varphi_{[a,b]}$ peut dépendre de $[a, b]$).
:::

白话：同一个可积函数 $\varphi$ 从上面压住**所有**的 $\abs{f(x, \cdot)}$，$x \in B$；$\varphi$ 不允许依赖于 $x$。实际操作时，先固定 $t$，计算或估计 $\sup_{x \in B}\abs{f(x, t)}$，再看它是否被一个可积函数压住：控制条件成立，当且仅当 $t \mapsto \sup_{x \in B}\abs{f(x, t)}$ 有一个可积的上界。

::: ex id=c7-ex-domination zh="控制条件：满足与不满足" lvl=1
1. **满足。** $f(x, t) = \e^{-xt}$，$B = [a, +\infty[$（$a > 0$），$I = [0, +\infty[$。对 $x \ge a$、$t \ge 0$，有 $-xt \le -at$，指数函数递增，所以
   $$0 < \e^{-xt} \le \e^{-at} =: \varphi(t),\qquad \int_0^{+\infty}\e^{-at}\,\dd t = \frac1a < +\infty.$$
2. **全局不满足，但在每个闭区间上满足。** 同一个 $f$，$B = ]0, +\infty[$。若 $\varphi$ 是控制函数，则对每个 $t \ge 0$，$\varphi(t) \ge \sup_{x > 0}\e^{-xt} = 1$（令 $x \to 0^{+}$）。常数 $1$ 在 $[0, +\infty[$ 上不可积，由比较定理 {@comparaison-integrales}，$\varphi$ 也不可积，矛盾。但对每个闭区间 $[a, b] \subset ]0, +\infty[$，由第 1 条，$\varphi_{[a,b]}(t) = \e^{-at}$ 是控制函数。
3. **在 $0$ 的任何邻域上都不满足。** $f(x, t) = x\e^{-xt}$，$B = [0, b]$（$b > 0$），$I = ]0, +\infty[$。固定 $t > 0$，$x \mapsto x\e^{-xt}$ 的导数是 $(1 - xt)\e^{-xt}$，在 $x = 1/t$ 处取最大值 $\frac{1}{\e t}$。当 $t \ge 1/b$ 时 $1/t \in [0, b]$，所以任何控制函数满足
   $$\varphi(t) \ge \frac{1}{\e t}\qquad (t \ge 1/b),$$
   而 $\frac1t$ 在 $[1/b, +\infty[$ 上不可积（{@riemann-integrales}）。所以 $f$ 在 $[0, b] \times I$ 上不满足控制条件。
:::

证明「局部控制即可」时要用到下面这个关于数列的小引理：收敛数列连同它的极限，总落在 $A$ 的某个闭区间里。

::: lem id=c7-suite-segment zh="收敛数列落在一个闭区间里" en="A convergent sequence lies in a segment" fr="Une suite convergente est contenue dans un segment" ru="Сходящаяся последовательность лежит на отрезке" lvl=1
设 $A$ 是区间，$(x_n)$ 是 $A$ 中的数列，$x_n \to x^* \in A$。则存在闭区间 $[m, M] \subset A$，它包含 $x^*$ 和所有的 $x_n$。
:::

::: fr
Soient $A$ un intervalle et $(x_n)$ une suite d'éléments de $A$ qui converge vers $x^* \in A$. Il existe un segment $[m, M] \subset A$ qui contient $x^*$ et tous les $x_n$.
:::

::: proof
▷ 思路：令 $S = \{x^*\} \cup \{x_n : n \in \N\}$。只要证明 $S$ 有最小元 $m$ 和最大元 $M$：它们属于 $S \subset A$，而 $A$ 是区间，所以 $[m, M] \subset A$。难点在于 $S$ 是无限集，下确界未必取得到；收敛性保证「靠下的点」只有有限个。

**第 1 步（$S$ 有下确界）**　收敛数列有界，所以 $S$ 有界，$m = \inf S$ 存在。又 $x^* \in S$，所以 $m \le x^*$。

**第 2 步（下确界取得到）**

- **情形 1：$m = x^*$。** 则 $m \in S$。
- **情形 2：$m < x^*$。** 令 $\eta = \frac{x^* - m}{2} > 0$。因为 $x_n \to x^*$，存在 $N \in \N$，使对一切 $n \ge N$，$\abs{x_n - x^*} < \eta$，特别地
  $$x_n > x^* - \eta = m + \eta \qquad (n \ge N).$$
  令 $m' = \min(x^*, x_0, \dots, x_{N-1})$（有限集的最小元；$N = 0$ 时 $m' = x^*$），则 $m' \in S$。$S$ 的元素要么是 $x^*, x_0, \dots, x_{N-1}$ 之一（$\ge m'$），要么是某个 $x_n$，$n \ge N$（$> m + \eta$），所以 $\min(m', m + \eta)$ 是 $S$ 的下界，从而 $\min(m', m + \eta) \le m$。因为 $m + \eta > m$，这个最小值只能是 $m'$，即 $m' \le m$。另一方面，$m' \in S$ 给出 $m \le m'$。所以 $m = m' \in S$。

**第 3 步（最大元）**　数列 $(-x_n)$ 收敛到 $-x^*$。对集合 $-S = \{-x^*\} \cup \{-x_n\}$ 重复第 1、2 步（这两步没有用到 $A$），$-S$ 有最小元，即 $S$ 有最大元 $M$。

**第 4 步（结论）**　$m, M \in S \subset A$，$A$ 是区间，所以 $[m, M] \subset A$。$S$ 的每个元素都在 $m$ 与 $M$ 之间。这就证明了 $[m, M]$ 包含 $x^*$ 和所有的 $x_n$。
:::

::: fr
▷ Méthode : on pose $S = \{x^*\} \cup \{x_n : n \in \N\}$. Il suffit de montrer que $S$ admet un plus petit élément $m$ et un plus grand élément $M$ : ils appartiennent à $S \subset A$ et, $A$ étant un intervalle, $[m, M] \subset A$. La difficulté est que $S$ est infini et que sa borne inférieure n'est pas forcément atteinte ; la convergence assure qu'il n'y a qu'un nombre fini de points « en bas ».

**Étape 1 ($S$ admet une borne inférieure)**　Une suite convergente est bornée, donc $S$ est bornée et $m = \inf S$ existe. Comme $x^* \in S$, on a $m \le x^*$.

**Étape 2 (la borne inférieure est atteinte)**

- **Cas 1 : $m = x^*$.** Alors $m \in S$.
- **Cas 2 : $m < x^*$.** Posons $\eta = \frac{x^* - m}{2} > 0$. Puisque $x_n \to x^*$, il existe $N \in \N$ tel que pour tout $n \ge N$, $\abs{x_n - x^*} < \eta$ ; en particulier
  $$x_n > x^* - \eta = m + \eta \qquad (n \ge N).$$
  Posons $m' = \min(x^*, x_0, \dots, x_{N-1})$ (minimum d'un ensemble fini ; si $N = 0$, $m' = x^*$) ; alors $m' \in S$. Un élément de $S$ est soit l'un des réels $x^*, x_0, \dots, x_{N-1}$ (donc $\ge m'$), soit un $x_n$ avec $n \ge N$ (donc $> m + \eta$). Ainsi $\min(m', m + \eta)$ minore $S$, d'où $\min(m', m + \eta) \le m$. Comme $m + \eta > m$, ce minimum ne peut être que $m'$, c'est-à-dire $m' \le m$. D'autre part $m' \in S$ donne $m \le m'$. Donc $m = m' \in S$.

**Étape 3 (plus grand élément)**　La suite $(-x_n)$ converge vers $-x^*$. En répétant les étapes 1 et 2 (qui n'utilisent pas $A$) pour l'ensemble $-S = \{-x^*\} \cup \{-x_n\}$, on obtient que $-S$ admet un plus petit élément, c'est-à-dire que $S$ admet un plus grand élément $M$.

**Étape 4 (conclusion)**　On a $m, M \in S \subset A$ et $A$ est un intervalle, donc $[m, M] \subset A$. Tout élément de $S$ est compris entre $m$ et $M$. Ceci montre que $[m, M]$ contient $x^*$ et tous les $x_n$.
:::

::: thm id=continuite-parametre zh="含参积分的连续性" en="Continuity of parameter-dependent integrals" fr="Théorème de continuité sous le signe intégrale" ru="Непрерывность интеграла по параметру" lvl=1
设 $A \subset \R$，$I$ 是区间，$f : A \times I \to \K$ 满足：

1. 对每个 $t \in I$，$x \mapsto f(x, t)$ 在 $A$ 上连续；
2. 对每个 $x \in A$，$t \mapsto f(x, t)$ 在 $I$ 上分段连续；
3. （控制条件，{@c7-def-domination}）存在 $I$ 上分段连续、可积的 $\varphi \ge 0$，使 $\abs{f(x, t)} \le \varphi(t)$ 对一切 $(x, t) \in A \times I$ 成立。

则对每个 $x \in A$，$t \mapsto f(x, t)$ 在 $I$ 上可积，$F(x) = \int_I f(x, t)\,\dd t$ 在 $A$ 上有定义且连续。
:::

::: fr
Soient $A \subset \R$, $I$ un intervalle et $f : A \times I \to \K$ telle que :

1. pour tout $t \in I$, $x \mapsto f(x, t)$ est continue sur $A$ ;
2. pour tout $x \in A$, $t \mapsto f(x, t)$ est continue par morceaux sur $I$ ;
3. (hypothèse de domination, {@fr:c7-def-domination}) il existe $\varphi : I \to \R_+$ continue par morceaux et intégrable sur $I$ telle que $\abs{f(x, t)} \le \varphi(t)$ pour tout $(x, t) \in A \times I$.

Alors, pour tout $x \in A$, la fonction $t \mapsto f(x, t)$ est intégrable sur $I$, et $F(x) = \int_I f(x, t)\,\dd t$ est définie et continue sur $A$.
:::

::: proof
▷ 思路：用序列刻画，只需证明 $x_n \to x$ 时 $F(x_n) \to F(x)$。令 $g_n(t) = f(x_n, t)$，这是一个函数列，对它用控制收敛定理。控制函数 $\varphi$ 与 $x$ 无关，所以也与 $n$ 无关——这正是控制收敛定理需要的。

**第 1 步（$F$ 有定义）**　固定 $x \in A$。由条件 2，$t \mapsto f(x, t)$ 分段连续；由条件 3，$\abs{f(x, t)} \le \varphi(t)$，而 $\varphi$ 可积。由比较定理 {@comparaison-integrales}（在 $I$ 的每个端点附近分别用），$\int_I \abs{f(x, t)}\,\dd t$ 收敛，即 $f(x, \cdot)$ 可积；由 {@integrable-convergente}，$F(x)$ 有定义。

**第 2 步（要证什么）**　固定 $x \in A$，任取 $A$ 中的数列 $(x_n)$，$x_n \to x$。由 {@carac-seq-cont}，只需证明 $F(x_n) \to F(x)$。

**第 3 步（逐点收敛）**　对 $n \in \N$ 和 $t \in I$，令 $g_n(t) = f(x_n, t)$，$g(t) = f(x, t)$。固定 $t \in I$：由条件 1，$y \mapsto f(y, t)$ 在 $x$ 处连续，又 $x_n \to x$，由 {@carac-seq-cont}（必要性），$g_n(t) \to g(t)$。所以 $(g_n)$ 在 $I$ 上逐点收敛到 $g$。

**第 4 步（控制）**　对条件 3 取 $x_n$ 代替 $x$：对一切 $n \in \N$ 和 $t \in I$，$\abs{g_n(t)} \le \varphi(t)$。$\varphi$ 不依赖于 $n$。

**第 5 步（控制收敛）**　$g_n$ 与 $g$ 都分段连续（条件 2）。第 3、4 步验证了 {@cv-dominee} 的两个条件，所以
$$F(x_n) = \int_I g_n(t)\,\dd t \xrightarrow[n \to \infty]{} \int_I g(t)\,\dd t = F(x).$$

数列 $(x_n)$ 是任取的，所以 $F$ 在 $x$ 处连续；$x \in A$ 是任取的，所以 $F$ 在 $A$ 上连续。
:::

::: fr
▷ Méthode : par la caractérisation séquentielle, il suffit de montrer que $F(x_n) \to F(x)$ lorsque $x_n \to x$. On pose $g_n(t) = f(x_n, t)$ : c'est une suite de fonctions, à laquelle on applique le théorème de convergence dominée. La fonction dominante $\varphi$ ne dépend pas de $x$, donc pas de $n$ : c'est exactement ce que demande la convergence dominée.

**Étape 1 ($F$ est bien définie)**　Soit $x \in A$. D'après l'hypothèse 2, $t \mapsto f(x, t)$ est continue par morceaux ; d'après l'hypothèse 3, $\abs{f(x, t)} \le \varphi(t)$, avec $\varphi$ intégrable. Par le théorème de comparaison {@fr:comparaison-integrales} (appliqué au voisinage de chaque extrémité de $I$), $\int_I \abs{f(x, t)}\,\dd t$ converge, c'est-à-dire que $f(x, \cdot)$ est intégrable ; d'après {@fr:integrable-convergente}, $F(x)$ est bien défini.

**Étape 2 (ce qu'il faut montrer)**　Soient $x \in A$ et $(x_n)$ une suite d'éléments de $A$ qui converge vers $x$. D'après {@fr:carac-seq-cont}, il suffit de montrer que $F(x_n) \to F(x)$.

**Étape 3 (convergence simple)**　Pour $n \in \N$ et $t \in I$, posons $g_n(t) = f(x_n, t)$ et $g(t) = f(x, t)$. Soit $t \in I$ : d'après l'hypothèse 1, $y \mapsto f(y, t)$ est continue en $x$ ; comme $x_n \to x$, {@fr:carac-seq-cont} (sens direct) donne $g_n(t) \to g(t)$. Ainsi $(g_n)$ converge simplement vers $g$ sur $I$.

**Étape 4 (domination)**　En appliquant l'hypothèse 3 au point $x_n$ : pour tout $n \in \N$ et tout $t \in I$, $\abs{g_n(t)} \le \varphi(t)$, et $\varphi$ ne dépend pas de $n$.

**Étape 5 (convergence dominée)**　Les fonctions $g_n$ et $g$ sont continues par morceaux (hypothèse 2). Les étapes 3 et 4 sont les deux hypothèses de {@fr:cv-dominee}, donc
$$F(x_n) = \int_I g_n(t)\,\dd t \xrightarrow[n \to \infty]{} \int_I g(t)\,\dd t = F(x).$$

La suite $(x_n)$ étant quelconque, $F$ est continue en $x$ ; $x \in A$ étant quelconque, $F$ est continue sur $A$.
:::

::: cex id=c7-cex-continuite zh="没有控制条件，连续性可能失败" lvl=1
$f(x, t) = x\e^{-xt}$，$A = [0, +\infty[$，$I = ]0, +\infty[$。条件 1、2 成立（$f$ 关于两个变量都连续）。

- $x = 0$：$f(0, t) = 0$，所以 $F(0) = 0$。
- $x > 0$：$F(x) = \int_0^{+\infty}x\e^{-xt}\,\dd t = \big[-\e^{-xt}\big]_0^{+\infty} = 1$。

所以 $F = \mathbf{1}_{]0, +\infty[}$ 在 $0$ 处不连续。由 {@c7-ex-domination} 第 3 条，$f$ 在 $[0, b] \times I$ 上不满足控制条件，不论 $b > 0$ 多小。直观地看：$x \to 0^{+}$ 时，$t \mapsto x\e^{-xt}$ 的图像越来越扁平地铺向 $+\infty$，逐点趋于 $0$，但面积恒为 $1$——质量「逃逸到了无穷远」。
:::

::: rem
**三个条件各自的作用。**

1. **控制条件不能去掉**：{@c7-cex-continuite}。
2. **条件 1 不能去掉**：令 $I = [0, +\infty[$，$f(x, t) = \e^{-t}$（$x > 0$），$f(x, t) = 0$（$x \le 0$）。控制函数 $\varphi(t) = \e^{-t}$ 存在，但 $F = \mathbf{1}_{]0, +\infty[}$ 在 $0$ 处不连续——被积函数本身关于 $x$ 就不连续。
3. **条件 2 的作用**是让每个 $F(x)$ 在第 6 章的框架里有意义（被积函数分段连续）。
4. **逆命题不成立**：控制条件是充分条件，不是必要条件。$F$ 可以连续而控制函数不存在，见本节第二个「想一想」。
:::

连续是局部性质：$F$ 在 $x_0$ 处是否连续，只取决于 $F$ 在 $x_0$ 附近的值。所以控制函数只需要在每个点附近存在。这在应用中至关重要：例如 $\Gamma$ 函数在 $]0, +\infty[$ 上不存在全局的控制函数，但在每个 $[a, b] \subset ]0, +\infty[$ 上存在（{@gamma-regularite}）。

::: prop id=c7-domination-locale zh="局部控制即可" en="Local domination suffices" fr="Il suffit d'une domination locale" ru="Достаточно локальной мажоранты" lvl=1
在 {@continuite-parametre} 中，条件 3 可以换成以下任一个较弱的条件，结论不变：

- (a) 每个 $x_0 \in A$ 有一个邻域 $V$，使 $f$ 在 $(A \cap V) \times I$ 上满足控制条件；
- (b) $A$ 是区间，$f$ 在 $A$ 的每个闭区间上满足控制条件。
:::

::: fr
Dans {@fr:continuite-parametre}, on peut remplacer l'hypothèse 3 par l'une des hypothèses plus faibles suivantes, la conclusion restant la même :

- (a) tout $x_0 \in A$ admet un voisinage $V$ tel que $f$ vérifie l'hypothèse de domination sur $(A \cap V) \times I$ ;
- (b) $A$ est un intervalle et $f$ vérifie l'hypothèse de domination sur tout segment de $A$.
:::

::: proof
▷ 思路：在 $x_0$ 附近的一个集合 $B$ 上用 {@continuite-parametre}，得到 $F|_B$ 在 $x_0$ 处连续；再说明趋于 $x_0$ 的数列（从某项起）落在 $B$ 里。(a) 中 $B = A \cap V$，(b) 中 $B$ 是引理 {@c7-suite-segment} 给出的闭区间。

**(a)**　固定 $x_0 \in A$，取 (a) 中的邻域 $V$，存在 $r > 0$ 使 $]x_0 - r, x_0 + r[ \subset V$。令 $B = A \cap V$。

1. 在 $B$ 上，{@continuite-parametre} 的条件 1、2 成立（它们对 $A$ 成立），条件 3 由 (a) 成立。所以 $F|_B$ 在 $B$ 上有定义且连续，特别地在 $x_0$ 处连续。
2. 任取 $A$ 中的数列 $x_n \to x_0$。存在 $N$，使对一切 $n \ge N$，$\abs{x_n - x_0} < r$，从而 $x_n \in B$。数列 $(x_{N + k})_{k \ge 0}$ 在 $B$ 中且趋于 $x_0$，由第 1 步，$F(x_{N+k}) \to F(x_0)$（$k \to \infty$），即 $F(x_n) \to F(x_0)$。
3. 由 {@carac-seq-cont}，$F$ 在 $x_0$ 处连续。（$F(x_0)$ 有定义已包含在第 1 步中。）

**(b)**　固定 $x_0 \in A$。对闭区间 $[x_0, x_0]$ 用 (b)，$f(x_0, \cdot)$ 被一个可积函数控制，所以 $F(x_0)$ 有定义（同 {@continuite-parametre} 第 1 步）。任取 $A$ 中的数列 $x_n \to x_0$。

1. 由引理 {@c7-suite-segment}，存在闭区间 $J = [m, M] \subset A$，它包含 $x_0$ 和所有的 $x_n$。
2. 由 (b)，$f$ 在 $J \times I$ 上满足控制条件。对 $J$ 用 {@continuite-parametre}：$F|_J$ 在 $J$ 上连续，特别地在 $x_0$ 处连续。
3. 所有 $x_n$ 都在 $J$ 中，且 $x_n \to x_0$，所以 $F(x_n) \to F(x_0)$。

由 {@carac-seq-cont}，$F$ 在 $x_0$ 处连续。$x_0$ 是任取的，这就证明了 $F$ 在 $A$ 上连续。
:::

::: fr
▷ Méthode : on applique {@fr:continuite-parametre} sur une partie $B$ proche de $x_0$, ce qui donne la continuité de $F|_B$ en $x_0$ ; puis on montre qu'une suite qui tend vers $x_0$ est (à partir d'un certain rang) dans $B$. Dans (a), $B = A \cap V$ ; dans (b), $B$ est le segment fourni par le {@fr:c7-suite-segment}.

**(a)**　Soit $x_0 \in A$ et $V$ le voisinage donné par (a) ; il existe $r > 0$ tel que $]x_0 - r, x_0 + r[ \subset V$. Posons $B = A \cap V$.

1. Sur $B$, les hypothèses 1 et 2 de {@fr:continuite-parametre} sont vraies (elles le sont sur $A$) et l'hypothèse 3 est vraie d'après (a). Donc $F|_B$ est définie et continue sur $B$, en particulier en $x_0$.
2. Soit $(x_n)$ une suite de $A$ qui tend vers $x_0$. Il existe $N$ tel que pour tout $n \ge N$, $\abs{x_n - x_0} < r$, donc $x_n \in B$. La suite $(x_{N + k})_{k \ge 0}$ est à valeurs dans $B$ et tend vers $x_0$ ; d'après le point 1, $F(x_{N+k}) \to F(x_0)$ quand $k \to \infty$, c'est-à-dire $F(x_n) \to F(x_0)$.
3. D'après {@fr:carac-seq-cont}, $F$ est continue en $x_0$. (Le fait que $F(x_0)$ soit défini est contenu dans le point 1.)

**(b)**　Soit $x_0 \in A$. En appliquant (b) au segment $[x_0, x_0]$, $f(x_0, \cdot)$ est majorée par une fonction intégrable, donc $F(x_0)$ est défini (comme à l'étape 1 de {@fr:continuite-parametre}). Soit $(x_n)$ une suite de $A$ qui tend vers $x_0$.

1. D'après le {@fr:c7-suite-segment}, il existe un segment $J = [m, M] \subset A$ qui contient $x_0$ et tous les $x_n$.
2. D'après (b), $f$ vérifie l'hypothèse de domination sur $J \times I$. En appliquant {@fr:continuite-parametre} sur $J$, $F|_J$ est continue sur $J$, en particulier en $x_0$.
3. Tous les $x_n$ sont dans $J$ et $x_n \to x_0$, donc $F(x_n) \to F(x_0)$.

D'après {@fr:carac-seq-cont}, $F$ est continue en $x_0$. Comme $x_0$ est quelconque, $F$ est continue sur $A$.
:::

::: ex id=c7-ex-continuite zh="一个 Laplace 型积分" lvl=1
$F(x) = \displaystyle\int_0^{+\infty}\frac{\e^{-xt}}{1 + t^2}\,\dd t$ 在 $[0, +\infty[$ 上连续，$F(0) = \frac\pi2$，且 $F(x) \to 0$（$x \to +\infty$）。

- **连续性。** $f(x, t) = \frac{\e^{-xt}}{1 + t^2}$ 关于两个变量都连续。对 $x \ge 0$、$t \ge 0$，$0 < \e^{-xt} \le 1$，所以 $\abs{f(x, t)} \le \varphi(t) = \frac{1}{1 + t^2}$，$\int_0^{+\infty}\varphi = \big[\Arctan t\big]_0^{+\infty} = \frac\pi2$。由 {@continuite-parametre}，$F$ 在 $[0, +\infty[$ 上连续，$F(0) = \int_0^{+\infty}\varphi = \frac\pi2$。
- **在 $+\infty$ 处的极限。** 直接估计：对 $x > 0$，$0 \le F(x) \le \int_0^{+\infty}\e^{-xt}\,\dd t = \frac1x \to 0$。也可以用下面的 {@limite-parametre}：$t > 0$ 时 $f(x, t) \to 0$，$t = 0$ 时 $f(x, 0) = 1$，极限函数 $\ell = \mathbf{1}_{\{0\}}$ 分段连续，$\int_0^{+\infty}\ell = 0$。

注意 $x \mapsto F(x)$ 在 $]0, +\infty[$ 上还可以求导，见第 2 节的「想一想」。
:::

::: thm id=limite-parametre zh="含参积分的极限" en="Limit under the integral sign" fr="Passage à la limite sous le signe intégrale" ru="Предельный переход под знаком интеграла" lvl=1
设 $A \subset \R$，$a \in \overline{A}$（$a$ 是 $A$ 的附着点，可以是 $\pm\infty$），$I$ 是区间，$f : A \times I \to \K$ 满足：

1. 对每个 $t \in I$，$f(x, t) \to \ell(t)$（$x \to a$，$x \in A$）；
2. 对每个 $x \in A$，$f(x, \cdot)$ 在 $I$ 上分段连续；$\ell$ 在 $I$ 上分段连续；
3. （控制条件）存在 $a$ 的邻域 $V$（$a = +\infty$ 时取 $V = ]c, +\infty[$，$a = -\infty$ 时取 $V = ]-\infty, c[$），使 $f$ 在 $(A \cap V) \times I$ 上满足控制条件，控制函数为 $\varphi$。

则 $\ell$ 在 $I$ 上可积，并且
$$\int_I f(x, t)\,\dd t \xrightarrow[x \to a]{} \int_I \ell(t)\,\dd t.$$
（左边对 $x \in A \cap V$ 有定义；$V = \R$ 就是全局控制的情形。）
:::

::: fr
Soient $A \subset \R$, $a \in \overline{A}$ (un point adhérent à $A$, éventuellement $\pm\infty$), $I$ un intervalle et $f : A \times I \to \K$ telle que :

1. pour tout $t \in I$, $f(x, t) \to \ell(t)$ quand $x \to a$, $x \in A$ ;
2. pour tout $x \in A$, $f(x, \cdot)$ est continue par morceaux sur $I$ ; $\ell$ est continue par morceaux sur $I$ ;
3. (domination) il existe un voisinage $V$ de $a$ (de la forme $]c, +\infty[$ si $a = +\infty$, $]-\infty, c[$ si $a = -\infty$) tel que $f$ vérifie l'hypothèse de domination sur $(A \cap V) \times I$, de fonction dominante $\varphi$.

Alors $\ell$ est intégrable sur $I$ et
$$\int_I f(x, t)\,\dd t \xrightarrow[x \to a]{} \int_I \ell(t)\,\dd t.$$
(Le membre de gauche est défini pour $x \in A \cap V$ ; le cas $V = \R$ est celui d'une domination globale.)
:::

::: proof
▷ 思路：与 {@continuite-parametre} 完全相同：用序列刻画把 $x \to a$ 换成数列 $x_n \to a$，再对 $g_n = f(x_n, \cdot)$ 用控制收敛定理。

**第 1 步（要证什么）**　因为 $V$ 是 $a$ 的邻域，$x \to a$ 时的极限只取决于 $A \cap V$ 上的值。由极限的序列刻画，只需证明：对 $A \cap V$ 中任何趋于 $a$ 的数列 $(x_n)$，有 $\int_I f(x_n, t)\,\dd t \to \int_I \ell$。

**第 2 步（逐点收敛）**　取这样的数列，令 $g_n(t) = f(x_n, t)$。固定 $t \in I$：由条件 1 和序列刻画，$g_n(t) \to \ell(t)$。

**第 3 步（控制）**　因为 $x_n \in A \cap V$，由条件 3，对一切 $n$ 和 $t$，$\abs{g_n(t)} \le \varphi(t)$。

**第 4 步（控制收敛）**　$g_n$、$\ell$ 分段连续（条件 2）。由 {@cv-dominee}，$g_n$ 与 $\ell$ 都可积，并且 $\int_I g_n \to \int_I \ell$。

这就证明了 $\ell$ 可积，且 $\int_I f(x, t)\,\dd t \to \int_I \ell(t)\,\dd t$。
:::

::: fr
▷ Méthode : exactement comme pour {@fr:continuite-parametre} : par la caractérisation séquentielle, on remplace $x \to a$ par une suite $x_n \to a$ et on applique la convergence dominée à $g_n = f(x_n, \cdot)$.

**Étape 1 (ce qu'il faut montrer)**　Comme $V$ est un voisinage de $a$, la limite quand $x \to a$ ne dépend que des valeurs sur $A \cap V$. Par la caractérisation séquentielle de la limite, il suffit de montrer que, pour toute suite $(x_n)$ d'éléments de $A \cap V$ qui tend vers $a$, $\int_I f(x_n, t)\,\dd t \to \int_I \ell$.

**Étape 2 (convergence simple)**　Soit une telle suite ; posons $g_n(t) = f(x_n, t)$. Pour $t \in I$ fixé, l'hypothèse 1 et la caractérisation séquentielle donnent $g_n(t) \to \ell(t)$.

**Étape 3 (domination)**　Comme $x_n \in A \cap V$, l'hypothèse 3 donne $\abs{g_n(t)} \le \varphi(t)$ pour tous $n$ et $t$.

**Étape 4 (convergence dominée)**　Les fonctions $g_n$ et $\ell$ sont continues par morceaux (hypothèse 2). D'après {@fr:cv-dominee}, $g_n$ et $\ell$ sont intégrables et $\int_I g_n \to \int_I \ell$.

Ceci montre que $\ell$ est intégrable et que $\int_I f(x, t)\,\dd t \to \int_I \ell(t)\,\dd t$.
:::

::: ex id=c7-ex-wallis-limite zh="极限函数可以不连续" lvl=1
$\displaystyle\lim_{x \to +\infty}\int_0^{\pi/2}(\sin t)^x\,\dd t = 0.$

令 $A = [1, +\infty[$，$I = [0, \frac\pi2]$，$f(x, t) = (\sin t)^x$。

- **逐点极限。** 对 $t \in [0, \frac\pi2[$，$0 \le \sin t < 1$，所以 $(\sin t)^x \to 0$；对 $t = \frac\pi2$，$f(x, \frac\pi2) = 1 \to 1$。极限函数 $\ell = \mathbf{1}_{\{\pi/2\}}$ 不连续，但分段连续，$\int_I \ell = 0$。
- **控制。** $0 \le f(x, t) \le 1 = \varphi(t)$，常数在有界区间 $I$ 上可积。

由 {@limite-parametre}，积分趋于 $\int_I \ell = 0$。更精确的结论 $\int_0^{\pi/2}(\sin t)^x\,\dd t \sim \sqrt{\frac{\pi}{2x}}$ 可以用第 5 节的 Laplace 方法得到。
:::

::: q
设 $F(x) = \displaystyle\int_0^{+\infty}\frac{x}{x^2 + t^2}\,\dd t$（$x \in \R$）。求 $F$，并找出 {@continuite-parametre} 在 $0$ 附近的哪个条件失效。
:::

::: ans
- $x > 0$：换元 $t = xu$（{@changement-variable-gen}），$F(x) = \int_0^{+\infty}\frac{x \cdot x\,\dd u}{x^2(1 + u^2)} = \frac\pi2$。
- $x < 0$：$f(-x, t) = -f(x, t)$，所以 $F(x) = -F(-x) = -\frac\pi2$。
- $x = 0$：被积函数为 $0$，$F(0) = 0$。

所以 $F(x) = \frac\pi2\operatorname{sgn}(x)$，在 $0$ 处不连续。条件 1、2 成立；失效的是控制条件：对 $t \in ]0, b]$，$\sup_{\abs{x} \le b}\frac{\abs{x}}{x^2 + t^2} = \frac{1}{2t}$（在 $\abs{x} = t$ 处取到），在 $]0, b]$ 上不可积。在每个 $[a, b] \subset ]0, +\infty[$ 上，$\frac{x}{x^2 + t^2} \le \frac{b}{a^2 + t^2}$ 是可积的控制函数，与 $F$ 在 $]0, +\infty[$ 上连续（为常数）相符。
:::

::: q
控制条件是 $F$ 连续的必要条件吗？考虑 $f(x, t) = x\e^{-xt} - 2x\e^{-2xt}$，$x \in [0, +\infty[$，$t \in ]0, +\infty[$。
:::

::: ans
不是。对 $x > 0$，$\int_0^{+\infty}x\e^{-xt}\,\dd t = 1$，$\int_0^{+\infty}2x\e^{-2xt}\,\dd t = 1$，所以 $F(x) = 0$；又 $F(0) = 0$。$F \equiv 0$ 连续。

但在任何 $[0, b]$（$b > 0$）上都没有控制函数：对 $t \ge 1/b$，取 $x = 1/t \in [0, b]$，
$$\abs{f(1/t, t)} = \frac1t\big(\e^{-1} - 2\e^{-2}\big) = \frac{\e - 2}{\e^2}\cdot\frac1t,$$
$\frac{\e - 2}{\e^2} > 0$，所以控制函数在 $[1/b, +\infty[$ 上至少是 $\frac{c}{t}$（$c > 0$），不可积。两块「逃逸到无穷远的质量」恰好抵消，$F$ 仍然连续：控制条件只是充分条件。
:::

## 积分号下求导

导数是差商的极限，而差商
$$\frac{F(x_0 + h) - F(x_0)}{h} = \int_I \frac{f(x_0 + h, t) - f(x_0, t)}{h}\,\dd t$$
本身是一个含参积分（参数是 $h$）。所以只需对它重复上一节的论证。被积的差商由微积分基本定理（有限增量）控制，控制它的是 $\frac{\partial f}{\partial x}$——因此控制条件要加在偏导数上，而不是加在 $f$ 上。

::: thm id=derivation-parametre zh="积分号下求导" en="Differentiation under the integral sign (Leibniz rule)" fr="Théorème de dérivation sous le signe intégrale" ru="Дифференцирование интеграла по параметру" lvl=1
设 $A$ 是区间（不退化为一点），$I$ 是区间，$f : A \times I \to \K$ 满足：

1. 对每个 $x \in A$，$t \mapsto f(x, t)$ 在 $I$ 上分段连续且可积；
2. 对每个 $t \in I$，$x \mapsto f(x, t)$ 在 $A$ 上可导，且偏导数 $x \mapsto \frac{\partial f}{\partial x}(x, t)$ 在 $A$ 上连续；对每个 $x \in A$，$t \mapsto \frac{\partial f}{\partial x}(x, t)$ 在 $I$ 上分段连续；
3. （控制条件）$\frac{\partial f}{\partial x}$ 在 $A$ 的每个闭区间上满足控制条件：对每个 $[a, b] \subset A$，存在 $I$ 上可积的 $\varphi_{[a,b]} \ge 0$，使
   $$\Big|\frac{\partial f}{\partial x}(x, t)\Big| \le \varphi_{[a,b]}(t)\qquad\text{对一切 } (x, t) \in [a, b] \times I.$$
   （一个对全体 $(x, t) \in A \times I$ 成立的控制函数当然满足这个条件。）

则 $F(x) = \int_I f(x, t)\,\dd t$ 在 $A$ 上是 $\Cc^1$ 的，且（Leibniz 公式）
$$F'(x) = \int_I \frac{\partial f}{\partial x}(x, t)\,\dd t.$$
:::

::: fr
Soient $A$ un intervalle (non réduit à un point), $I$ un intervalle et $f : A \times I \to \K$ telle que :

1. pour tout $x \in A$, $t \mapsto f(x, t)$ est continue par morceaux et intégrable sur $I$ ;
2. pour tout $t \in I$, $x \mapsto f(x, t)$ est dérivable sur $A$ et sa dérivée $x \mapsto \frac{\partial f}{\partial x}(x, t)$ est continue sur $A$ ; pour tout $x \in A$, $t \mapsto \frac{\partial f}{\partial x}(x, t)$ est continue par morceaux sur $I$ ;
3. (domination) $\frac{\partial f}{\partial x}$ vérifie l'hypothèse de domination sur tout segment de $A$ : pour tout $[a, b] \subset A$, il existe $\varphi_{[a,b]} \ge 0$ intégrable sur $I$ telle que
   $$\Big|\frac{\partial f}{\partial x}(x, t)\Big| \le \varphi_{[a,b]}(t)\qquad\text{pour tout } (x, t) \in [a, b] \times I.$$
   (Une fonction dominante valable sur tout $A \times I$ convient évidemment.)

Alors $F(x) = \int_I f(x, t)\,\dd t$ est de classe $\Cc^1$ sur $A$ et (formule de Leibniz)
$$F'(x) = \int_I \frac{\partial f}{\partial x}(x, t)\,\dd t.$$
:::

::: proof
▷ 思路：固定 $x_0$。对任何 $h_n \to 0$，把差商写成 $\int_I g_n$，其中 $g_n$ 是 $f$ 关于 $x$ 的差商。$g_n$ 逐点收敛到 $\frac{\partial f}{\partial x}(x_0, \cdot)$；由微积分基本定理，$\abs{g_n} \le \varphi_J$。控制收敛给出 $F'(x_0)$。最后对 $\frac{\partial f}{\partial x}$ 用 {@c7-domination-locale} 得到 $F'$ 连续。

**第 1 步（$F$ 与候选导数有定义）**　由条件 1，每个 $F(x)$ 有定义。固定 $x_0 \in A$。由条件 3（取闭区间 $[x_0, x_0]$），$\abs{\frac{\partial f}{\partial x}(x_0, t)} \le \varphi_{[x_0, x_0]}(t)$，又 $\frac{\partial f}{\partial x}(x_0, \cdot)$ 分段连续（条件 2），由比较定理它可积。令
$$L = \int_I \frac{\partial f}{\partial x}(x_0, t)\,\dd t.$$

**第 2 步（要证什么）**　由极限的序列刻画，$F'(x_0) = L$ 当且仅当：对每个满足 $h_n \ne 0$、$x_0 + h_n \in A$、$h_n \to 0$ 的数列 $(h_n)$，都有
$$\frac{F(x_0 + h_n) - F(x_0)}{h_n} \xrightarrow[n \to \infty]{} L.$$
（$A$ 是不退化的区间，这样的数列存在；若 $x_0$ 是 $A$ 的端点，这是单侧导数。）任取这样的数列 $(h_n)$。

**第 3 步（取一个闭区间）**　数列 $x_0 + h_n$ 在 $A$ 中且趋于 $x_0$。由引理 {@c7-suite-segment}，存在闭区间 $J = [m, M] \subset A$，它包含 $x_0$ 和所有的 $x_0 + h_n$。令 $\varphi = \varphi_J$（条件 3）。

**第 4 步（差商写成积分）**　$f(x_0 + h_n, \cdot)$ 与 $f(x_0, \cdot)$ 都可积（条件 1），由积分的线性，
$$\frac{F(x_0 + h_n) - F(x_0)}{h_n} = \int_I g_n(t)\,\dd t,\qquad g_n(t) = \frac{f(x_0 + h_n, t) - f(x_0, t)}{h_n}.$$
$g_n$ 是两个分段连续函数的线性组合，分段连续。

**第 5 步（逐点收敛）**　固定 $t \in I$。由条件 2，$x \mapsto f(x, t)$ 在 $x_0$ 处可导，由序列刻画，$g_n(t) \to \frac{\partial f}{\partial x}(x_0, t)$。

**第 6 步（控制）**　固定 $t \in I$ 和 $n$。由条件 2，$x \mapsto f(x, t)$ 在 $A$ 上是 $\Cc^1$ 的；$x_0$ 与 $x_0 + h_n$ 之间的闭区间包含在 $J$ 中（$J$ 是包含这两点的区间）。由微积分基本定理（对 $\K$ 值函数成立），
$$f(x_0 + h_n, t) - f(x_0, t) = \int_{x_0}^{x_0 + h_n}\frac{\partial f}{\partial x}(y, t)\,\dd y,$$
所以
$$\begin{aligned}
\abs{f(x_0 + h_n, t) - f(x_0, t)} &\le \abs{h_n}\sup_{y \in J}\Big|\frac{\partial f}{\partial x}(y, t)\Big| && \text{（积分的估计）}\\
&\le \abs{h_n}\,\varphi(t) && \text{（条件 3，} y \in J\text{）}.
\end{aligned}$$
除以 $\abs{h_n}$：对一切 $n$ 和 $t$，$\abs{g_n(t)} \le \varphi(t)$。

**第 7 步（控制收敛）**　第 4、5、6 步验证了 {@cv-dominee} 的条件，所以 $\int_I g_n \to L$。由第 2 步，$F$ 在 $x_0$ 处可导，$F'(x_0) = L$。

**第 8 步（$F'$ 连续）**　对函数 $(x, t) \mapsto \frac{\partial f}{\partial x}(x, t)$ 用 {@c7-domination-locale}(b)：它关于 $x$ 连续、关于 $t$ 分段连续（条件 2），在 $A$ 的每个闭区间上满足控制条件（条件 3）。所以 $x \mapsto \int_I \frac{\partial f}{\partial x}(x, t)\,\dd t = F'(x)$ 在 $A$ 上连续。

这就证明了 $F \in \Cc^1(A)$，且 Leibniz 公式成立。
:::

::: fr
▷ Méthode : on fixe $x_0$. Pour toute suite $h_n \to 0$, on écrit le taux d'accroissement sous la forme $\int_I g_n$, où $g_n$ est le taux d'accroissement de $f$ par rapport à $x$. La suite $(g_n)$ converge simplement vers $\frac{\partial f}{\partial x}(x_0, \cdot)$ et, par le théorème fondamental de l'analyse, $\abs{g_n} \le \varphi_J$. La convergence dominée donne $F'(x_0)$. Enfin, {@fr:c7-domination-locale} appliqué à $\frac{\partial f}{\partial x}$ donne la continuité de $F'$.

**Étape 1 ($F$ et la dérivée candidate sont définies)**　D'après l'hypothèse 1, chaque $F(x)$ est défini. Soit $x_0 \in A$. D'après l'hypothèse 3 (appliquée au segment $[x_0, x_0]$), $\abs{\frac{\partial f}{\partial x}(x_0, t)} \le \varphi_{[x_0, x_0]}(t)$ ; comme $\frac{\partial f}{\partial x}(x_0, \cdot)$ est continue par morceaux (hypothèse 2), elle est intégrable par comparaison. Posons
$$L = \int_I \frac{\partial f}{\partial x}(x_0, t)\,\dd t.$$

**Étape 2 (ce qu'il faut montrer)**　Par la caractérisation séquentielle de la limite, $F'(x_0) = L$ si et seulement si, pour toute suite $(h_n)$ telle que $h_n \ne 0$, $x_0 + h_n \in A$ et $h_n \to 0$,
$$\frac{F(x_0 + h_n) - F(x_0)}{h_n} \xrightarrow[n \to \infty]{} L.$$
(De telles suites existent car $A$ est un intervalle non trivial ; si $x_0$ est une extrémité de $A$, il s'agit d'une dérivée à droite ou à gauche.) Soit $(h_n)$ une telle suite.

**Étape 3 (choix d'un segment)**　La suite $(x_0 + h_n)$ est à valeurs dans $A$ et tend vers $x_0$. D'après le {@fr:c7-suite-segment}, il existe un segment $J = [m, M] \subset A$ qui contient $x_0$ et tous les $x_0 + h_n$. Posons $\varphi = \varphi_J$ (hypothèse 3).

**Étape 4 (le taux d'accroissement est une intégrale)**　Les fonctions $f(x_0 + h_n, \cdot)$ et $f(x_0, \cdot)$ sont intégrables (hypothèse 1) ; par linéarité de l'intégrale,
$$\frac{F(x_0 + h_n) - F(x_0)}{h_n} = \int_I g_n(t)\,\dd t,\qquad g_n(t) = \frac{f(x_0 + h_n, t) - f(x_0, t)}{h_n}.$$
La fonction $g_n$, combinaison linéaire de fonctions continues par morceaux, est continue par morceaux.

**Étape 5 (convergence simple)**　Soit $t \in I$. D'après l'hypothèse 2, $x \mapsto f(x, t)$ est dérivable en $x_0$ ; par la caractérisation séquentielle, $g_n(t) \to \frac{\partial f}{\partial x}(x_0, t)$.

**Étape 6 (domination)**　Soient $t \in I$ et $n \in \N$. D'après l'hypothèse 2, $x \mapsto f(x, t)$ est de classe $\Cc^1$ sur $A$ ; le segment d'extrémités $x_0$ et $x_0 + h_n$ est contenu dans $J$ (intervalle contenant ces deux points). Par le théorème fondamental de l'analyse (valable pour les fonctions à valeurs dans $\K$),
$$f(x_0 + h_n, t) - f(x_0, t) = \int_{x_0}^{x_0 + h_n}\frac{\partial f}{\partial x}(y, t)\,\dd y,$$
donc
$$\begin{aligned}
\abs{f(x_0 + h_n, t) - f(x_0, t)} &\le \abs{h_n}\sup_{y \in J}\Big|\frac{\partial f}{\partial x}(y, t)\Big| && \text{(majoration de l'intégrale)}\\
&\le \abs{h_n}\,\varphi(t) && \text{(hypothèse 3, } y \in J\text{)}.
\end{aligned}$$
En divisant par $\abs{h_n}$ : pour tous $n$ et $t$, $\abs{g_n(t)} \le \varphi(t)$.

**Étape 7 (convergence dominée)**　Les étapes 4, 5 et 6 sont les hypothèses de {@fr:cv-dominee}, donc $\int_I g_n \to L$. D'après l'étape 2, $F$ est dérivable en $x_0$ et $F'(x_0) = L$.

**Étape 8 (continuité de $F'$)**　On applique {@fr:c7-domination-locale} (b) à la fonction $(x, t) \mapsto \frac{\partial f}{\partial x}(x, t)$ : elle est continue en $x$ et continue par morceaux en $t$ (hypothèse 2), et dominée sur tout segment de $A$ (hypothèse 3). Donc $x \mapsto \int_I \frac{\partial f}{\partial x}(x, t)\,\dd t = F'(x)$ est continue sur $A$.

Ceci montre que $F \in \Cc^1(A)$ et que la formule de Leibniz est vraie.
:::

::: rem
1. **为什么控制的是 $\frac{\partial f}{\partial x}$**：第 6 步中，差商 $g_n$ 的上界来自偏导数。$f$ 本身的控制并不需要。
2. **条件 1 可以减弱**：只要 $f(x_0, \cdot)$ 对**某一个** $x_0 \in A$ 可积即可。事实上，对 $x \in A$，取 $J = [\min(x_0, x), \max(x_0, x)]$，第 6 步的估计给出 $\abs{f(x, t)} \le \abs{f(x_0, t)} + \abs{x - x_0}\,\varphi_J(t)$，右边可积。
3. **端点**：若 $A$ 的端点属于 $A$（例如 $A = [0, +\infty[$），$F'$ 在端点处是单侧导数。
4. **控制条件不能去掉，逆命题也不成立**：见下面的反例。
:::

::: cex id=c7-cex-derivation zh="偏导数没有控制，Leibniz 公式失效" lvl=1
$f(x, t) = \dfrac{1 - \cos(xt)}{t^2}$，$A = \R$，$I = ]0, +\infty[$。

- **条件 1 成立。** $f(x, \cdot)$ 连续且 $f \ge 0$。由 $1 - \cos u \le \frac{u^2}{2}$ 与 $1 - \cos u \le 2$，$0 \le f(x, t) \le \min\big(\frac{x^2}{2}, \frac{2}{t^2}\big)$，所以 $f(x, \cdot)$ 在 $]0, +\infty[$ 上可积。
- **条件 2 成立。** $\frac{\partial f}{\partial x}(x, t) = \frac{\sin(xt)}{t}$，关于 $x$、关于 $t$ 都连续。
- **条件 3 不成立。** 设 $b > 0$。对 $t \ge \frac{\pi}{2b}$，取 $x = \frac{\pi}{2t} \in [0, b]$，得 $\big|\frac{\partial f}{\partial x}(x, t)\big| = \frac1t$。所以 $[-b, b]$ 上的控制函数在 $[\frac{\pi}{2b}, +\infty[$ 上 $\ge \frac1t$，不可积。
- **结论不成立。** 令 $C = \int_0^{+\infty}\frac{1 - \cos u}{u^2}\,\dd u$，被积函数连续、非负且不恒为零，所以 $0 < C < +\infty$。对 $x > 0$，换元 $u = xt$（{@changement-variable-gen}）：
  $$F(x) = \int_0^{+\infty}\frac{1 - \cos u}{u^2/x^2}\cdot\frac{\dd u}{x} = Cx.$$
  $f(-x, t) = f(x, t)$，$F(0) = 0$，所以 $F(x) = C\abs{x}$，在 $0$ 处不可导。

（{@dirichlet-integrale} 的证明中会算出 $C = \frac\pi2$。）这个例子还说明逆命题不成立：在 $]0, +\infty[$ 上 $F(x) = Cx$ 可导，$F'(x) = C = \int_0^{+\infty}\frac{\sin(xt)}{t}\,\dd t$，Leibniz 公式**成立**；但对任何 $[a, b] \subset ]0, +\infty[$ 和 $t \ge \frac{\pi}{b - a}$，区间 $[at, bt]$ 的长度 $\ge \pi$，其中有使 $\abs{\sin u} = 1$ 的点 $u = xt$，所以 $\sup_{x \in [a,b]}\big|\frac{\partial f}{\partial x}(x, t)\big| = \frac1t$，控制函数仍然不存在——定理给不出这个结论。
:::

求高阶导数时，把 {@derivation-parametre} 用到 $\frac{\partial^j f}{\partial x^j}$ 上即可。下面的版本（法国大纲的写法）只要求**最高阶**偏导数的控制，低阶偏导数只需可积。

::: cor id=derivation-ck zh="$\Cc^k$ 版本" en="Class $C^k$ for integrals depending on a parameter" fr="Classe $\mathcal{C}^k$ d'une intégrale à paramètre" ru="Интеграл, зависящий от параметра, класса $C^k$" lvl=1
设 $A$ 是区间（不退化为一点），$k \ge 1$，$f : A \times I \to \K$ 满足：

1. 对每个 $t \in I$，$x \mapsto f(x, t)$ 在 $A$ 上是 $\Cc^k$ 的；
2. 对每个 $j \in \{0, \dots, k\}$ 和每个 $x \in A$，$t \mapsto \frac{\partial^j f}{\partial x^j}(x, t)$ 在 $I$ 上分段连续；当 $j \le k - 1$ 时它还在 $I$ 上可积；
3. $\frac{\partial^k f}{\partial x^k}$ 在 $A$ 的每个闭区间上满足控制条件。

则 $F$ 在 $A$ 上是 $\Cc^k$ 的，并且对 $0 \le j \le k$，
$$F^{(j)}(x) = \int_I \frac{\partial^j f}{\partial x^j}(x, t)\,\dd t.$$
若这对每个 $k \ge 1$ 成立，则 $F$ 是 $\Cc^\infty$ 的。
:::

::: fr
Soient $A$ un intervalle (non réduit à un point), $k \ge 1$ et $f : A \times I \to \K$ telle que :

1. pour tout $t \in I$, $x \mapsto f(x, t)$ est de classe $\Cc^k$ sur $A$ ;
2. pour tout $j \in \{0, \dots, k\}$ et tout $x \in A$, $t \mapsto \frac{\partial^j f}{\partial x^j}(x, t)$ est continue par morceaux sur $I$, et intégrable sur $I$ si $j \le k - 1$ ;
3. $\frac{\partial^k f}{\partial x^k}$ vérifie l'hypothèse de domination sur tout segment de $A$.

Alors $F$ est de classe $\Cc^k$ sur $A$ et, pour $0 \le j \le k$,
$$F^{(j)}(x) = \int_I \frac{\partial^j f}{\partial x^j}(x, t)\,\dd t.$$
Si ceci est vrai pour tout $k \ge 1$, $F$ est de classe $\Cc^\infty$.
:::

::: proof
▷ 思路：对 $j$ 归纳，每一步用 {@derivation-parametre}。但 {@derivation-parametre} 要求每个 $\frac{\partial^j f}{\partial x^j}$（$1 \le j \le k$）都被控制，而我们只假设了最高阶的控制。所以先证明：最高阶的局部控制可以「向下传递」到低阶偏导数。

记 $\partial^j f = \frac{\partial^j f}{\partial x^j}$。

**第 1 步（控制向下传递）**　断言：对 $j = k, k-1, \dots, 1$，$\partial^j f$ 在 $A$ 的每个闭区间上满足控制条件。对 $j$ 从 $k$ 向下归纳。

- **初始化**（$j = k$）：这就是条件 3。
- **递推**：设 $2 \le j \le k$，$\partial^j f$ 在每个闭区间上满足控制条件，证明 $\partial^{j-1} f$ 也是。取闭区间 $[a, b] \subset A$，设 $\psi$ 是 $\partial^j f$ 在 $[a, b] \times I$ 上的控制函数。对 $x \in [a, b]$、$t \in I$：$y \mapsto \partial^{j-1}f(y, t)$ 是 $\Cc^1$ 的（因为 $j \le k$，条件 1），由微积分基本定理，
  $$\partial^{j-1}f(x, t) = \partial^{j-1}f(a, t) + \int_a^x \partial^j f(y, t)\,\dd y,$$
  所以
  $$\abs{\partial^{j-1}f(x, t)} \le \abs{\partial^{j-1}f(a, t)} + (b - a)\,\psi(t) =: \psi'(t).$$
  $\psi'$ 分段连续；$j - 1 \le k - 1$，由条件 2，$\partial^{j-1}f(a, \cdot)$ 可积，所以 $\psi'$ 可积。这就是 $\partial^{j-1} f$ 在 $[a, b] \times I$ 上的控制函数。

**第 2 步（对导数的阶归纳）**　对 $1 \le j \le k$，记 $P(j)$：「$F$ 是 $\Cc^j$ 的，且 $F^{(j)}(x) = \int_I \partial^j f(x, t)\,\dd t$」。

- **初始化**（$j = 1$）：对 $f$ 用 {@derivation-parametre}。条件 1：$f(x, \cdot)$ 分段连续且可积（条件 2，$j = 0 \le k - 1$）；条件 2：$f(\cdot, t)$ 是 $\Cc^1$ 的（$k \ge 1$），$\partial f(x, \cdot)$ 分段连续；条件 3：第 1 步（$j = 1$）。所以 $P(1)$ 成立。
- **递推**：设 $1 \le j \le k - 1$ 且 $P(j)$ 成立。对 $g = \partial^j f$ 用 {@derivation-parametre}。条件 1：$g(x, \cdot)$ 分段连续且可积（$j \le k - 1$）；条件 2：$g(\cdot, t)$ 是 $\Cc^1$ 的（$j + 1 \le k$），$\frac{\partial g}{\partial x} = \partial^{j+1} f$ 关于 $t$ 分段连续；条件 3：第 1 步（$j + 1$）。所以 $x \mapsto \int_I \partial^j f(x, t)\,\dd t = F^{(j)}(x)$ 是 $\Cc^1$ 的，导数为 $\int_I \partial^{j+1}f(x, t)\,\dd t$，即 $P(j + 1)$ 成立。

由归纳，$P(k)$ 成立；$j = 0$ 的公式就是 $F$ 的定义。若对每个 $k$ 都成立，则 $F$ 对每个 $k$ 是 $\Cc^k$ 的，即 $\Cc^\infty$。
:::

::: fr
▷ Méthode : récurrence sur $j$, en appliquant {@fr:derivation-parametre} à chaque étape. Mais {@fr:derivation-parametre} demande une domination de chaque $\frac{\partial^j f}{\partial x^j}$ ($1 \le j \le k$), alors qu'on ne suppose dominée que la dérivée d'ordre $k$. On montre donc d'abord que la domination locale « descend » vers les dérivées d'ordre inférieur.

Notons $\partial^j f = \frac{\partial^j f}{\partial x^j}$.

**Étape 1 (la domination descend)**　Montrons que, pour $j = k, k-1, \dots, 1$, $\partial^j f$ vérifie l'hypothèse de domination sur tout segment de $A$. Récurrence descendante sur $j$.

- **Initialisation** ($j = k$) : c'est l'hypothèse 3.
- **Hérédité** : soit $2 \le j \le k$ tel que $\partial^j f$ soit dominée sur tout segment ; montrons-le pour $\partial^{j-1} f$. Soit $[a, b] \subset A$ et $\psi$ une fonction dominante de $\partial^j f$ sur $[a, b] \times I$. Pour $x \in [a, b]$ et $t \in I$, $y \mapsto \partial^{j-1}f(y, t)$ est de classe $\Cc^1$ (car $j \le k$, hypothèse 1) ; par le théorème fondamental de l'analyse,
  $$\partial^{j-1}f(x, t) = \partial^{j-1}f(a, t) + \int_a^x \partial^j f(y, t)\,\dd y,$$
  donc
  $$\abs{\partial^{j-1}f(x, t)} \le \abs{\partial^{j-1}f(a, t)} + (b - a)\,\psi(t) =: \psi'(t).$$
  La fonction $\psi'$ est continue par morceaux ; comme $j - 1 \le k - 1$, $\partial^{j-1}f(a, \cdot)$ est intégrable (hypothèse 2), donc $\psi'$ est intégrable. C'est une fonction dominante de $\partial^{j-1} f$ sur $[a, b] \times I$.

**Étape 2 (récurrence sur l'ordre de dérivation)**　Pour $1 \le j \le k$, notons $P(j)$ : « $F$ est de classe $\Cc^j$ et $F^{(j)}(x) = \int_I \partial^j f(x, t)\,\dd t$ ».

- **Initialisation** ($j = 1$) : on applique {@fr:derivation-parametre} à $f$. Hypothèse 1 : $f(x, \cdot)$ est continue par morceaux et intégrable (hypothèse 2 avec $j = 0 \le k - 1$) ; hypothèse 2 : $f(\cdot, t)$ est $\Cc^1$ ($k \ge 1$) et $\partial f(x, \cdot)$ est continue par morceaux ; hypothèse 3 : étape 1 avec $j = 1$. Donc $P(1)$ est vraie.
- **Hérédité** : soit $1 \le j \le k - 1$ tel que $P(j)$ soit vraie. On applique {@fr:derivation-parametre} à $g = \partial^j f$. Hypothèse 1 : $g(x, \cdot)$ est continue par morceaux et intégrable ($j \le k - 1$) ; hypothèse 2 : $g(\cdot, t)$ est $\Cc^1$ ($j + 1 \le k$) et $\frac{\partial g}{\partial x} = \partial^{j+1} f$ est continue par morceaux en $t$ ; hypothèse 3 : étape 1 avec $j + 1$. Donc $x \mapsto \int_I \partial^j f(x, t)\,\dd t = F^{(j)}(x)$ est de classe $\Cc^1$, de dérivée $\int_I \partial^{j+1}f(x, t)\,\dd t$ : c'est $P(j + 1)$.

Par récurrence, $P(k)$ est vraie ; pour $j = 0$, la formule est la définition de $F$. Si l'énoncé vaut pour tout $k$, $F$ est de classe $\Cc^k$ pour tout $k$, c'est-à-dire $\Cc^\infty$.
:::

::: ex id=c7-ex-moments zh="积分号下逐次求导：$\int_0^{+\infty}t^n\e^{-xt}\,\dd t$" lvl=1
对 $x > 0$ 和 $n \in \N$，$\displaystyle\int_0^{+\infty}t^n\e^{-xt}\,\dd t = \frac{n!}{x^{n+1}}$。

令 $F(x) = \int_0^{+\infty}\e^{-xt}\,\dd t = \frac1x$（$x > 0$），$f(x, t) = \e^{-xt}$，$A = ]0, +\infty[$，$I = [0, +\infty[$。

1. $f(\cdot, t)$ 是 $\Cc^\infty$ 的，$\frac{\partial^j f}{\partial x^j}(x, t) = (-t)^j\e^{-xt}$，关于 $t$ 连续。
2. 可积性：$t^j\e^{-xt} = O(1/t^2)$（$t \to +\infty$），所以每个 $(-t)^j\e^{-xt}$ 在 $I$ 上可积。
3. 控制：在 $[a, b] \subset ]0, +\infty[$ 上，$\abs{(-t)^k\e^{-xt}} \le t^k\e^{-at}$，可积，与 $x$ 无关。

由 {@derivation-ck}（对每个 $k$），$F$ 是 $\Cc^\infty$ 的，$F^{(n)}(x) = (-1)^n\int_0^{+\infty}t^n\e^{-xt}\,\dd t$。另一方面 $F^{(n)}(x) = \big(\frac1x\big)^{(n)} = \frac{(-1)^n n!}{x^{n+1}}$。比较即得。$x = 1$ 时就是 $\Gamma(n + 1) = n!$（{@gamma-factorielle}）。

注意全局控制不存在：$\sup_{x > 0}t^k\e^{-xt} = t^k$ 不可积。局部控制正好够用。
:::

::: ex id=c7-ex-ln zh="一个可以求出的含参积分" lvl=1
对 $x > -1$，$\displaystyle I(x) = \int_0^1\frac{t^x - 1}{\ln t}\,\dd t = \ln(1 + x)$。

令 $A = ]-1, +\infty[$，积分区间为 $]0, 1[$，$f(x, t) = \frac{t^x - 1}{\ln t}$。关键的改写：因为 $\frac{\partial}{\partial s}t^s = (\ln t)\,t^s$，
$$t^x - 1 = \int_0^x(\ln t)\,t^s\,\dd s,\qquad\text{所以}\qquad f(x, t) = \int_0^x t^s\,\dd s.$$

1. **可积性。** $s \mapsto t^s$ 单调，所以 $s$ 在 $0$ 与 $x$ 之间时 $t^s \le \max(1, t^x) \le 1 + t^x$，从而 $\abs{f(x, t)} \le \abs{x}(1 + t^x)$。$x > -1$ 时 $t^x$ 在 $]0, 1[$ 上可积（{@riemann-integrales}），所以 $f(x, \cdot)$ 可积。
2. **偏导数。** 由改写式，$\frac{\partial f}{\partial x}(x, t) = t^x$，关于 $x$、$t$ 都连续。
3. **控制。** 在 $[a, b] \subset ]-1, +\infty[$ 上：$t \in ]0, 1[$、$x \ge a$ 时 $t^x \le t^a$，而 $t^a$ 在 $]0, 1[$ 上可积（$a > -1$）。

由 {@derivation-parametre}，$I'(x) = \int_0^1 t^x\,\dd t = \frac{1}{x + 1}$。又 $I(0) = 0$。$I$ 与 $x \mapsto \ln(1 + x)$ 在区间 $]-1, +\infty[$ 上导数相同、在 $0$ 处值相同，所以相等。
:::

二重积分的积分次序交换，是积分号下求导的一个直接应用。

::: thm id=fubini-segment zh="闭矩形上的积分交换" en="Fubini's theorem on a rectangle (continuous case)" fr="Théorème de Fubini sur un pavé (cas continu)" ru="Теорема Фубини для непрерывных функций на прямоугольнике" lvl=1
若 $f$ 在 $[a, b] \times [c, d]$ 上连续（$a < b$，$c < d$），则
$$\int_a^b\Big(\int_c^d f(x, t)\,\dd t\Big)\dd x = \int_c^d\Big(\int_a^b f(x, t)\,\dd x\Big)\dd t.$$
:::

::: fr
Si $f$ est continue sur $[a, b] \times [c, d]$ ($a < b$, $c < d$), alors
$$\int_a^b\Big(\int_c^d f(x, t)\,\dd t\Big)\dd x = \int_c^d\Big(\int_a^b f(x, t)\,\dd x\Big)\dd t.$$
:::

::: proof
▷ 思路：把两边都看成积分上限 $y \in [a, b]$ 的函数 $G(y)$ 与 $H(y)$，证明它们导数相同、在 $a$ 处都为 $0$。$G'$ 由微积分基本定理得到；$H'$ 要在积分号下求导——正是 {@derivation-parametre}。

对 $y \in [a, b]$，令
$$G(y) = \int_a^y\Big(\int_c^d f(x, t)\,\dd t\Big)\dd x,\qquad H(y) = \int_c^d h(y, t)\,\dd t,\quad h(y, t) = \int_a^y f(x, t)\,\dd x.$$

**第 0 步（$f$ 有界）**　$[a, b] \times [c, d]$ 是紧集（{@compact-ferme-borne}：闭区间紧，紧集的乘积紧），$f$ 连续，所以 $f([a, b] \times [c, d])$ 紧（{@image-compact}），从而有界。令 $K = \sup\abs{f} < +\infty$。

**第 1 步（内层积分关于 $x$ 连续）**　令 $u(x) = \int_c^d f(x, t)\,\dd t$。对 $A = [a, b]$、$I = [c, d]$ 用 {@continuite-parametre}：$f(\cdot, t)$、$f(x, \cdot)$ 连续，$\abs{f} \le K$，常数 $K$ 在有界区间 $[c, d]$ 上可积。所以 $u$ 在 $[a, b]$ 上连续。

**第 2 步（$G'$）**　$G(y) = \int_a^y u$，$u$ 连续，由微积分基本定理，$G$ 是 $\Cc^1$ 的，$G'(y) = u(y) = \int_c^d f(y, t)\,\dd t$。

**第 3 步（$h$ 的性质）**

- 固定 $t$：$x \mapsto f(x, t)$ 在 $[a, b]$ 上连续，由微积分基本定理，$y \mapsto h(y, t)$ 是 $\Cc^1$ 的，$\frac{\partial h}{\partial y}(y, t) = f(y, t)$。
- 固定 $y$：$t \mapsto h(y, t)$ 在 $[c, d]$ 上连续。$y = a$ 时 $h(a, \cdot) = 0$；$y > a$ 时，对参数 $t \in [c, d]$、积分变量 $x \in [a, y]$ 用 {@continuite-parametre}，控制函数为常数 $K$。

**第 4 步（$H'$）**　对 $A = [a, b]$、$I = [c, d]$ 和函数 $h$ 用 {@derivation-parametre}。条件 1：$h(y, \cdot)$ 在 $[c, d]$ 上连续，从而可积；条件 2：$h(\cdot, t)$ 是 $\Cc^1$ 的，$\frac{\partial h}{\partial y} = f$ 关于 $y$ 连续、关于 $t$ 连续；条件 3：$\abs{\frac{\partial h}{\partial y}} = \abs{f} \le K$，在 $[c, d]$ 上可积。所以 $H$ 是 $\Cc^1$ 的，
$$H'(y) = \int_c^d f(y, t)\,\dd t.$$

**第 5 步（结论）**　由第 2、4 步，$(G - H)' = 0$ 在区间 $[a, b]$ 上成立，所以 $G - H$ 是常数。$G(a) = 0$，$H(a) = \int_c^d 0\,\dd t = 0$，所以 $G = H$。取 $y = b$，这就是要证的等式。
:::

::: fr
▷ Méthode : on considère les deux membres comme des fonctions $G(y)$ et $H(y)$ de la borne supérieure $y \in [a, b]$, et on montre qu'elles ont la même dérivée et s'annulent en $a$. $G'$ s'obtient par le théorème fondamental de l'analyse ; $H'$ demande une dérivation sous le signe intégrale, c'est-à-dire {@fr:derivation-parametre}.

Pour $y \in [a, b]$, posons
$$G(y) = \int_a^y\Big(\int_c^d f(x, t)\,\dd t\Big)\dd x,\qquad H(y) = \int_c^d h(y, t)\,\dd t,\quad h(y, t) = \int_a^y f(x, t)\,\dd x.$$

**Étape 0 ($f$ est bornée)**　Le pavé $[a, b] \times [c, d]$ est compact ({@fr:compact-ferme-borne} : un segment est compact et un produit de compacts est compact) et $f$ est continue, donc $f([a, b] \times [c, d])$ est compact ({@fr:image-compact}), donc borné. Posons $K = \sup\abs{f} < +\infty$.

**Étape 1 (l'intégrale intérieure est continue en $x$)**　Posons $u(x) = \int_c^d f(x, t)\,\dd t$. On applique {@fr:continuite-parametre} avec $A = [a, b]$ et $I = [c, d]$ : $f(\cdot, t)$ et $f(x, \cdot)$ sont continues, et $\abs{f} \le K$, constante intégrable sur l'intervalle borné $[c, d]$. Donc $u$ est continue sur $[a, b]$.

**Étape 2 ($G'$)**　On a $G(y) = \int_a^y u$ avec $u$ continue ; par le théorème fondamental de l'analyse, $G$ est $\Cc^1$ et $G'(y) = u(y) = \int_c^d f(y, t)\,\dd t$.

**Étape 3 (propriétés de $h$)**

- À $t$ fixé : $x \mapsto f(x, t)$ est continue sur $[a, b]$ ; par le théorème fondamental de l'analyse, $y \mapsto h(y, t)$ est $\Cc^1$ et $\frac{\partial h}{\partial y}(y, t) = f(y, t)$.
- À $y$ fixé : $t \mapsto h(y, t)$ est continue sur $[c, d]$. Si $y = a$, $h(a, \cdot) = 0$ ; si $y > a$, on applique {@fr:continuite-parametre} avec le paramètre $t \in [c, d]$, la variable d'intégration $x \in [a, y]$ et la fonction dominante constante $K$.

**Étape 4 ($H'$)**　On applique {@fr:derivation-parametre} avec $A = [a, b]$, $I = [c, d]$ et la fonction $h$. Hypothèse 1 : $h(y, \cdot)$ est continue sur $[c, d]$, donc intégrable ; hypothèse 2 : $h(\cdot, t)$ est $\Cc^1$ et $\frac{\partial h}{\partial y} = f$ est continue en $y$ et en $t$ ; hypothèse 3 : $\abs{\frac{\partial h}{\partial y}} = \abs{f} \le K$, intégrable sur $[c, d]$. Donc $H$ est $\Cc^1$ et
$$H'(y) = \int_c^d f(y, t)\,\dd t.$$

**Étape 5 (conclusion)**　D'après les étapes 2 et 4, $(G - H)' = 0$ sur l'intervalle $[a, b]$, donc $G - H$ est constante. Comme $G(a) = 0$ et $H(a) = \int_c^d 0\,\dd t = 0$, on a $G = H$. En prenant $y = b$, on obtient l'égalité annoncée.
:::

::: cex id=c7-cex-fubini-integrales zh="被积函数在角上无界时，两个累次积分可以不同" lvl=1
$f(x, y) = \dfrac{x^2 - y^2}{(x^2 + y^2)^2}$ 在 $]0, 1]^2$ 上连续，但在 $(0, 0)$ 附近无界，不能延拓为 $[0, 1]^2$ 上的连续函数。由 $\frac{\partial}{\partial y}\frac{y}{x^2 + y^2} = \frac{x^2 - y^2}{(x^2 + y^2)^2}$，对 $x \in ]0, 1]$，
$$\int_0^1 f(x, y)\,\dd y = \Big[\frac{y}{x^2 + y^2}\Big]_0^1 = \frac{1}{1 + x^2},\qquad \int_0^1\Big(\int_0^1 f(x, y)\,\dd y\Big)\dd x = \frac\pi4.$$
$f(y, x) = -f(x, y)$，所以另一个次序的累次积分等于 $-\frac\pi4$。{@fubini-segment} 中「在闭矩形上连续」不是装饰。无界区域或无界函数的情形需要 Fubini–Tonelli 定理（第 11 章）。
:::

::: q
设 $F(x) = \displaystyle\int_0^{+\infty}\frac{\e^{-xt}}{1 + t^2}\,\dd t$（{@c7-ex-continuite}）。证明 $F$ 在 $]0, +\infty[$ 上是 $\Cc^2$ 的，并求它满足的微分方程。
:::

::: ans
$f(x, t) = \frac{\e^{-xt}}{1 + t^2}$，$\frac{\partial f}{\partial x} = \frac{-t\,\e^{-xt}}{1 + t^2}$，$\frac{\partial^2 f}{\partial x^2} = \frac{t^2\e^{-xt}}{1 + t^2}$。对 $x > 0$，$f$ 与 $\frac{\partial f}{\partial x}$ 被 $\e^{-xt}$ 控制，可积；在 $[a, b] \subset ]0, +\infty[$ 上，$\big|\frac{\partial^2 f}{\partial x^2}\big| \le \e^{-at}$，可积。由 {@derivation-ck}（$k = 2$），$F$ 是 $\Cc^2$ 的，并且
$$F''(x) + F(x) = \int_0^{+\infty}\frac{(t^2 + 1)\,\e^{-xt}}{1 + t^2}\,\dd t = \int_0^{+\infty}\e^{-xt}\,\dd t = \frac1x.$$
这是一个二阶线性方程，第 8 章的常数变易法 {@variation-constantes} 可以把 $F$ 写成显式积分。
:::

::: q
设 $F(x) = \displaystyle\int_0^1\ln(x^2 + t^2)\,\dd t$。在 $x = 0$ 处能否在积分号下求导？
:::

::: ans
形式上，$\frac{\partial f}{\partial x}(0, t) = \frac{2 \cdot 0}{0 + t^2} = 0$，「公式」会给出 $F'(0) = 0$。但控制条件在 $0$ 附近失效：对 $t \in ]0, b]$，$\sup_{\abs{x} \le b}\frac{2\abs{x}}{x^2 + t^2} = \frac1t$（在 $\abs{x} = t$ 处取到），不可积。实际上，分部积分可以算出（$x \ne 0$）
$$F(x) = \ln(1 + x^2) - 2 + 2\abs{x}\Arctan\frac{1}{\abs{x}},\qquad F(0) = \int_0^1 2\ln t\,\dd t = -2,$$
所以 $\frac{F(x) - F(0)}{\abs{x}} \to 2 \cdot \frac\pi2 = \pi$（$x \to 0$），$F$ 在 $0$ 处有一个角点，不可导。
:::

## Γ 函数

第 6 章定义了 $\Gamma(x) = \int_0^{+\infty}t^{x-1}\e^{-t}\,\dd t$（$x > 0$，{@def-gamma}），并证明了 $\Gamma(x + 1) = x\Gamma(x)$、$\Gamma(n + 1) = n!$（{@gamma-factorielle}）。本节用积分号下求导研究 $\Gamma$ 的正则性，并说明三个性质——$\Gamma(1) = 1$、函数方程、对数凸——唯一地刻画了 $\Gamma$。被积函数 $t^{x-1}\e^{-t}$ 关于 $x$ 求 $k$ 次导数，会出现因子 $(\ln t)^k$；先证明这样的函数都可积。

::: lem id=c7-gamma-integrable zh="Γ 型积分的可积性" en="Integrability of Gamma-type integrands" fr="Intégrabilité des intégrandes de type Gamma" ru="Интегрируемость подынтегральных функций гамма-типа" lvl=1
对 $c > 0$ 和 $k \in \N$，函数 $t \mapsto \abs{\ln t}^k\,t^{c-1}\e^{-t}$ 在 $]0, +\infty[$ 上可积。
:::

::: fr
Pour $c > 0$ et $k \in \N$, la fonction $t \mapsto \abs{\ln t}^k\,t^{c-1}\e^{-t}$ est intégrable sur $]0, +\infty[$.
:::

::: proof
▷ 思路：函数连续非负，问题点是 $0$ 和 $+\infty$。在 $0$ 附近，对数因子比任何正的幂次 $t^{c/2}$ 增长得慢，所以与 $t^{c/2 - 1}$ 比较；在 $+\infty$ 附近，$\e^{-t}$ 压倒一切幂次和对数，与 $\frac{1}{t^2}$ 比较。

记 $g(t) = \abs{\ln t}^k\,t^{c-1}\e^{-t}$，它在 $]0, +\infty[$ 上连续且 $\ge 0$。

**第 1 步（在 $]0, 1]$ 上）**　令 $s = -\ln t$，$t \to 0^{+}$ 对应 $s \to +\infty$，$t^{c/2}\abs{\ln t}^k = s^k\e^{-cs/2} \to 0$（指数压倒幂次）。所以
$$g(t) \le \abs{\ln t}^k\,t^{c-1} = \big(t^{c/2}\abs{\ln t}^k\big)\,t^{c/2 - 1} = o\big(t^{c/2 - 1}\big)\qquad (t \to 0^{+}).$$
$t^{c/2 - 1} = \frac{1}{t^{1 - c/2}}$，而 $1 - \frac c2 < 1$，由 {@riemann-integrales}，$\int_0^1 t^{c/2 - 1}\,\dd t$ 收敛。由比较定理 {@comparaison-integrales}，$\int_0^1 g$ 收敛。

**第 2 步（在 $[1, +\infty[$ 上）**　对 $t \ge 1$，$0 \le \ln t \le t$，所以 $t^2 g(t) \le t^{k + c + 1}\e^{-t} \to 0$（$t \to +\infty$）。于是 $g(t) = o(1/t^2)$，由 {@riemann-integrales} 与比较定理，$\int_1^{+\infty} g$ 收敛。

由第 1、2 步，$g$ 在 $]0, +\infty[$ 上可积。
:::

::: fr
▷ Méthode : la fonction est continue et positive ; les points à étudier sont $0$ et $+\infty$. Au voisinage de $0$, le facteur logarithmique croît moins vite que toute puissance $t^{c/2}$ : on compare à $t^{c/2 - 1}$. Au voisinage de $+\infty$, $\e^{-t}$ l'emporte sur les puissances et les logarithmes : on compare à $\frac{1}{t^2}$.

Notons $g(t) = \abs{\ln t}^k\,t^{c-1}\e^{-t}$ ; $g$ est continue et positive sur $]0, +\infty[$.

**Étape 1 (sur $]0, 1]$)**　Posons $s = -\ln t$ ; $t \to 0^{+}$ équivaut à $s \to +\infty$, et $t^{c/2}\abs{\ln t}^k = s^k\e^{-cs/2} \to 0$ (croissances comparées). Donc
$$g(t) \le \abs{\ln t}^k\,t^{c-1} = \big(t^{c/2}\abs{\ln t}^k\big)\,t^{c/2 - 1} = o\big(t^{c/2 - 1}\big)\qquad (t \to 0^{+}).$$
Or $t^{c/2 - 1} = \frac{1}{t^{1 - c/2}}$ avec $1 - \frac c2 < 1$ ; d'après {@fr:riemann-integrales}, $\int_0^1 t^{c/2 - 1}\,\dd t$ converge. Par le théorème de comparaison {@fr:comparaison-integrales}, $\int_0^1 g$ converge.

**Étape 2 (sur $[1, +\infty[$)**　Pour $t \ge 1$, $0 \le \ln t \le t$, donc $t^2 g(t) \le t^{k + c + 1}\e^{-t} \to 0$ quand $t \to +\infty$. Ainsi $g(t) = o(1/t^2)$ et, d'après {@fr:riemann-integrales} et le théorème de comparaison, $\int_1^{+\infty} g$ converge.

Les étapes 1 et 2 montrent que $g$ est intégrable sur $]0, +\infty[$.
:::

::: thm id=gamma-regularite zh="Γ 函数的正则性" en="Smoothness and log-convexity of Γ" fr="Régularité et log-convexité de la fonction Γ" ru="Гладкость и логарифмическая выпуклость гамма-функции" lvl=1
$\Gamma$ 在 $]0, +\infty[$ 上取正值，是 $\Cc^\infty$ 的，对每个 $k \in \N$，
$$\Gamma^{(k)}(x) = \int_0^{+\infty}(\ln t)^k\, t^{x-1}\,\e^{-t}\,\dd t,$$
并且 $\Gamma$ 是对数凸的（$\ln\Gamma$ 是凸函数）。
:::

::: fr
La fonction $\Gamma$ est strictement positive et de classe $\Cc^\infty$ sur $]0, +\infty[$ ; pour tout $k \in \N$,
$$\Gamma^{(k)}(x) = \int_0^{+\infty}(\ln t)^k\, t^{x-1}\,\e^{-t}\,\dd t,$$
et $\Gamma$ est log-convexe ($\ln\Gamma$ est convexe).
:::

::: proof
▷ 思路：用 {@derivation-ck}，$k$ 任意。被积函数 $f(x, t) = t^{x-1}\e^{-t} = \e^{(x-1)\ln t}\e^{-t}$ 关于 $x$ 的 $k$ 阶偏导数是 $(\ln t)^k t^{x-1}\e^{-t}$。关键是控制：$x$ 在 $[a, b]$ 中变化时，$t^{x-1}$ 在 $t \le 1$ 时被 $t^{a-1}$ 压住，在 $t > 1$ 时被 $t^{b-1}$ 压住。对数凸性来自一个二次多项式的判别式（即 Cauchy–Schwarz 不等式）。

**第 1 步（偏导数）**　固定 $t > 0$，$x \mapsto f(x, t) = \e^{(x-1)\ln t}\,\e^{-t}$ 是 $\Cc^\infty$ 的，且（$\frac{\dd}{\dd x}\e^{\lambda x} = \lambda\e^{\lambda x}$，$\lambda = \ln t$）
$$\frac{\partial^j f}{\partial x^j}(x, t) = (\ln t)^j\,t^{x-1}\e^{-t}.$$
固定 $x$，它关于 $t$ 在 $]0, +\infty[$ 上连续。

**第 2 步（可积性）**　由引理 {@c7-gamma-integrable}（$c = x$），对每个 $j$，$\frac{\partial^j f}{\partial x^j}(x, \cdot)$ 在 $]0, +\infty[$ 上可积。

**第 3 步（在闭区间上控制）**　取 $[a, b] \subset ]0, +\infty[$。断言：对 $x \in [a, b]$、$t > 0$，$t^{x-1} \le t^{a-1} + t^{b-1}$。

- **情形 1：$0 < t \le 1$。** $\ln t \le 0$，$x \ge a$，所以 $(x - 1)\ln t \le (a - 1)\ln t$，取指数得 $t^{x-1} \le t^{a-1}$。
- **情形 2：$t > 1$。** $\ln t > 0$，$x \le b$，所以 $t^{x-1} \le t^{b-1}$。

于是对 $x \in [a, b]$，
$$\Big|\frac{\partial^k f}{\partial x^k}(x, t)\Big| \le \varphi_k(t) := \abs{\ln t}^k\big(t^{a-1} + t^{b-1}\big)\e^{-t},$$
$\varphi_k$ 与 $x$ 无关，由引理 {@c7-gamma-integrable}（$c = a$ 与 $c = b$）可积。

**第 4 步（$\Cc^\infty$）**　第 1–3 步验证了 {@derivation-ck} 的条件，对每个 $k \ge 1$ 成立。所以 $\Gamma$ 是 $\Cc^\infty$ 的，导数公式成立。

**第 5 步（正性）**　$\Gamma(x)$ 与 $\Gamma''(x)$ 是连续非负函数 $t^{x-1}\e^{-t}$、$(\ln t)^2t^{x-1}\e^{-t}$ 的积分，并且这两个函数在 $[2, 3]$ 上连续且 $> 0$，所以 $\Gamma(x) \ge \int_2^3 t^{x-1}\e^{-t}\,\dd t > 0$，同理 $\Gamma''(x) \ge \int_2^3(\ln t)^2t^{x-1}\e^{-t}\,\dd t > 0$。

**第 6 步（判别式）**　固定 $x > 0$。对 $\lambda \in \R$，令
$$P(\lambda) = \int_0^{+\infty}(\lambda\ln t + 1)^2\,t^{x-1}\e^{-t}\,\dd t \ge 0.$$
展开 $(\lambda\ln t + 1)^2 = \lambda^2(\ln t)^2 + 2\lambda\ln t + 1$，三项分别可积（第 2 步），由积分的线性和导数公式，
$$P(\lambda) = \lambda^2\,\Gamma''(x) + 2\lambda\,\Gamma'(x) + \Gamma(x).$$
这是首项系数 $\Gamma''(x) > 0$ 的二次多项式，在 $\R$ 上 $\ge 0$，所以判别式 $\le 0$：
$$4\Gamma'(x)^2 - 4\Gamma''(x)\Gamma(x) \le 0.$$

**第 7 步（对数凸）**　$\Gamma > 0$ 且 $\Cc^\infty$，所以 $\ln\Gamma$ 是 $\Cc^2$ 的，
$$(\ln\Gamma)'' = \Big(\frac{\Gamma'}{\Gamma}\Big)' = \frac{\Gamma''\Gamma - \Gamma'^2}{\Gamma^2} \ge 0\qquad\text{（第 6 步）}.$$
二阶导数非负的 $\Cc^2$ 函数在区间上是凸的。这就证明了 $\ln\Gamma$ 是凸函数。
:::

::: fr
▷ Méthode : on applique {@fr:derivation-ck} pour tout $k$. La dérivée $k$-ième par rapport à $x$ de $f(x, t) = t^{x-1}\e^{-t} = \e^{(x-1)\ln t}\e^{-t}$ est $(\ln t)^k t^{x-1}\e^{-t}$. Le point clé est la domination : pour $x \in [a, b]$, $t^{x-1}$ est majoré par $t^{a-1}$ si $t \le 1$ et par $t^{b-1}$ si $t > 1$. La log-convexité vient du discriminant d'un trinôme du second degré (c'est l'inégalité de Cauchy–Schwarz).

**Étape 1 (dérivées partielles)**　Pour $t > 0$ fixé, $x \mapsto f(x, t) = \e^{(x-1)\ln t}\,\e^{-t}$ est de classe $\Cc^\infty$ et (car $\frac{\dd}{\dd x}\e^{\lambda x} = \lambda\e^{\lambda x}$ avec $\lambda = \ln t$)
$$\frac{\partial^j f}{\partial x^j}(x, t) = (\ln t)^j\,t^{x-1}\e^{-t}.$$
Pour $x$ fixé, cette fonction est continue en $t$ sur $]0, +\infty[$.

**Étape 2 (intégrabilité)**　D'après le {@fr:c7-gamma-integrable} (avec $c = x$), pour tout $j$, $\frac{\partial^j f}{\partial x^j}(x, \cdot)$ est intégrable sur $]0, +\infty[$.

**Étape 3 (domination sur un segment)**　Soit $[a, b] \subset ]0, +\infty[$. Montrons que pour $x \in [a, b]$ et $t > 0$, $t^{x-1} \le t^{a-1} + t^{b-1}$.

- **Cas 1 : $0 < t \le 1$.** On a $\ln t \le 0$ et $x \ge a$, donc $(x - 1)\ln t \le (a - 1)\ln t$ et, en passant à l'exponentielle, $t^{x-1} \le t^{a-1}$.
- **Cas 2 : $t > 1$.** On a $\ln t > 0$ et $x \le b$, donc $t^{x-1} \le t^{b-1}$.

Ainsi, pour $x \in [a, b]$,
$$\Big|\frac{\partial^k f}{\partial x^k}(x, t)\Big| \le \varphi_k(t) := \abs{\ln t}^k\big(t^{a-1} + t^{b-1}\big)\e^{-t},$$
où $\varphi_k$ ne dépend pas de $x$ et est intégrable d'après le {@fr:c7-gamma-integrable} (avec $c = a$ et $c = b$).

**Étape 4 (classe $\Cc^\infty$)**　Les étapes 1 à 3 sont les hypothèses de {@fr:derivation-ck}, pour tout $k \ge 1$. Donc $\Gamma$ est $\Cc^\infty$ et la formule des dérivées est vraie.

**Étape 5 (positivité)**　$\Gamma(x)$ et $\Gamma''(x)$ sont les intégrales des fonctions continues positives $t^{x-1}\e^{-t}$ et $(\ln t)^2t^{x-1}\e^{-t}$, qui sont continues et $> 0$ sur $[2, 3]$ ; donc $\Gamma(x) \ge \int_2^3 t^{x-1}\e^{-t}\,\dd t > 0$ et de même $\Gamma''(x) \ge \int_2^3(\ln t)^2t^{x-1}\e^{-t}\,\dd t > 0$.

**Étape 6 (discriminant)**　Soit $x > 0$. Pour $\lambda \in \R$, posons
$$P(\lambda) = \int_0^{+\infty}(\lambda\ln t + 1)^2\,t^{x-1}\e^{-t}\,\dd t \ge 0.$$
En développant $(\lambda\ln t + 1)^2 = \lambda^2(\ln t)^2 + 2\lambda\ln t + 1$, dont les trois termes sont intégrables (étape 2), la linéarité de l'intégrale et la formule des dérivées donnent
$$P(\lambda) = \lambda^2\,\Gamma''(x) + 2\lambda\,\Gamma'(x) + \Gamma(x).$$
C'est un trinôme de coefficient dominant $\Gamma''(x) > 0$, positif sur $\R$ ; son discriminant est donc négatif ou nul :
$$4\Gamma'(x)^2 - 4\Gamma''(x)\Gamma(x) \le 0.$$

**Étape 7 (log-convexité)**　Comme $\Gamma > 0$ est $\Cc^\infty$, $\ln\Gamma$ est $\Cc^2$ et
$$(\ln\Gamma)'' = \Big(\frac{\Gamma'}{\Gamma}\Big)' = \frac{\Gamma''\Gamma - \Gamma'^2}{\Gamma^2} \ge 0\qquad\text{(étape 6)}.$$
Une fonction de classe $\Cc^2$ sur un intervalle, de dérivée seconde positive, est convexe. Ceci montre que $\ln\Gamma$ est convexe.
:::

::: rem
**为什么必须局部控制。** 在整个 $]0, +\infty[ \times ]0, +\infty[$ 上，$\sup_{x > 0}t^{x-1}\e^{-t}$ 对 $t > 1$ 等于 $+\infty$（令 $x \to +\infty$），对 $t < 1$ 等于 $\frac{\e^{-t}}{t}$（令 $x \to 0^{+}$），在 $0$ 附近不可积。所以连 $\Gamma$ 本身的连续性也无法用全局控制证明；第 3 步的「分 $t \le 1$ 与 $t > 1$ 两种情形，分别用区间的左端点和右端点」是这一类积分的标准技巧。
:::

::: prop id=c7-gamma-variations zh="Γ 的变化" en="Behaviour of Γ" fr="Variations de Γ" ru="Поведение гамма-функции" lvl=1
1. $\Gamma(x) \underset{x \to 0^{+}}{\sim} \dfrac1x$，特别地 $\Gamma(x) \to +\infty$（$x \to 0^{+}$）。
2. $\Gamma$ 是严格凸的；$\Gamma'$ 在 $]0, +\infty[$ 上恰有一个零点 $x_0 \in ]1, 2[$；$\Gamma$ 在 $]0, x_0]$ 上严格递减，在 $[x_0, +\infty[$ 上严格递增。
3. $\Gamma(x) \to +\infty$（$x \to +\infty$）。

（数值上 $x_0 \approx 1.4616$，$\Gamma(x_0) \approx 0.8856$。）
:::

::: fr
1. $\Gamma(x) \underset{x \to 0^{+}}{\sim} \dfrac1x$ ; en particulier $\Gamma(x) \to +\infty$ quand $x \to 0^{+}$.
2. $\Gamma$ est strictement convexe ; $\Gamma'$ s'annule en un unique point $x_0 \in ]1, 2[$ ; $\Gamma$ est strictement décroissante sur $]0, x_0]$ et strictement croissante sur $[x_0, +\infty[$.
3. $\Gamma(x) \to +\infty$ quand $x \to +\infty$.

(Numériquement, $x_0 \approx 1{,}4616$ et $\Gamma(x_0) \approx 0{,}8856$.)
:::

::: proof
▷ 思路：$0$ 附近用函数方程把 $\Gamma(x)$ 移到 $\Gamma(x + 1)$，后者在 $1$ 处连续；变化由 $\Gamma'' > 0$ 和 $\Gamma(1) = \Gamma(2)$ 决定（Rolle）；$+\infty$ 处与 $n!$ 比较。

**1.**　由 {@gamma-factorielle}，$x\Gamma(x) = \Gamma(x + 1)$。由 {@gamma-regularite}，$\Gamma$ 在 $1$ 处连续，所以 $x\Gamma(x) = \Gamma(x + 1) \to \Gamma(1) = 1$（$x \to 0^{+}$），即 $\Gamma(x) \sim \frac1x$。

**2.**　由 {@gamma-regularite} 的导数公式，$\Gamma''(x) = \int_0^{+\infty}(\ln t)^2t^{x-1}\e^{-t}\,\dd t > 0$（同 {@gamma-regularite} 证明第 5 步），所以 $\Gamma'$ 严格递增，$\Gamma$ 严格凸。$\Gamma(1) = 1$，$\Gamma(2) = 1 \cdot \Gamma(1) = 1$，由 Rolle 定理，存在 $x_0 \in ]1, 2[$ 使 $\Gamma'(x_0) = 0$；$\Gamma'$ 严格递增，所以零点唯一，且 $\Gamma' < 0$ 于 $]0, x_0[$，$\Gamma' > 0$ 于 $]x_0, +\infty[$。由此得到单调性。

**3.**　由 2，$\Gamma$ 在 $[2, +\infty[$ 上递增。对 $x \ge 2$，令 $n = \lfloor x \rfloor - 1 \ge 1$，则 $x \ge n + 1 \ge 2$，所以 $\Gamma(x) \ge \Gamma(n + 1) = n! \ge n$。$x \to +\infty$ 时 $n \to +\infty$，所以 $\Gamma(x) \to +\infty$。
:::

::: fr
▷ Méthode : près de $0$, l'équation fonctionnelle ramène $\Gamma(x)$ à $\Gamma(x + 1)$, continue en $1$ ; les variations découlent de $\Gamma'' > 0$ et de $\Gamma(1) = \Gamma(2)$ (Rolle) ; en $+\infty$, on compare à $n!$.

**1.**　D'après {@fr:gamma-factorielle}, $x\Gamma(x) = \Gamma(x + 1)$. D'après {@fr:gamma-regularite}, $\Gamma$ est continue en $1$, donc $x\Gamma(x) = \Gamma(x + 1) \to \Gamma(1) = 1$ quand $x \to 0^{+}$, c'est-à-dire $\Gamma(x) \sim \frac1x$.

**2.**　D'après la formule des dérivées de {@fr:gamma-regularite}, $\Gamma''(x) = \int_0^{+\infty}(\ln t)^2t^{x-1}\e^{-t}\,\dd t > 0$ (comme à l'étape 5 de la preuve de {@fr:gamma-regularite}) ; donc $\Gamma'$ est strictement croissante et $\Gamma$ est strictement convexe. Comme $\Gamma(1) = 1$ et $\Gamma(2) = 1 \cdot \Gamma(1) = 1$, le théorème de Rolle fournit $x_0 \in ]1, 2[$ tel que $\Gamma'(x_0) = 0$ ; $\Gamma'$ étant strictement croissante, ce zéro est unique, $\Gamma' < 0$ sur $]0, x_0[$ et $\Gamma' > 0$ sur $]x_0, +\infty[$. On en déduit les variations.

**3.**　D'après 2, $\Gamma$ est croissante sur $[2, +\infty[$. Pour $x \ge 2$, posons $n = \lfloor x \rfloor - 1 \ge 1$ ; alors $x \ge n + 1 \ge 2$, donc $\Gamma(x) \ge \Gamma(n + 1) = n! \ge n$. Quand $x \to +\infty$, $n \to +\infty$, donc $\Gamma(x) \to +\infty$.
:::

$\Gamma$ 在正整数上插值阶乘：$\Gamma(n + 1) = n!$。插值阶乘的光滑函数有无穷多个（例如 $\Gamma(x) + \sin(\pi x)\,g(x)$）。下面的定理说明：加上「对数凸」这一个条件，插值就唯一了。

::: thm id=bohr-mollerup zh="Bohr–Mollerup 定理" en="Bohr–Mollerup theorem" fr="Théorème de Bohr–Mollerup" ru="Теорема Бора — Моллерупа" lvl=2
$\Gamma$ 是满足以下三个条件的唯一函数 $f : ]0, +\infty[ \to ]0, +\infty[$：

1. $f(1) = 1$；
2. 对一切 $x > 0$，$f(x + 1) = x f(x)$；
3. $\ln f$ 是凸函数。

并且对每个 $x > 0$，有 **Gauss 公式**
$$\Gamma(x) = \lim_{n \to \infty}\frac{n^x\, n!}{x(x+1)\cdots(x+n)}.$$
:::

::: fr
La fonction $\Gamma$ est l'unique fonction $f : ]0, +\infty[ \to ]0, +\infty[$ vérifiant :

1. $f(1) = 1$ ;
2. pour tout $x > 0$, $f(x + 1) = x f(x)$ ;
3. $\ln f$ est convexe.

De plus, pour tout $x > 0$, on a la **formule de Gauss**
$$\Gamma(x) = \lim_{n \to \infty}\frac{n^x\, n!}{x(x+1)\cdots(x+n)}.$$
:::

::: sketch
▷ 思路：凸函数的弦斜率递增（三弦引理）。在整数点 $n - 1, n, n + 1$ 附近比较斜率，把 $f(n + x)$ 夹在两个只依赖于 $n$ 和 $x$ 的量之间；再用函数方程把 $f(n + x)$ 换成 $f(x)$。上下界之比趋于 $1$，所以 $f(x)$ 被唯一确定。

**第 0 步（$\Gamma$ 满足三个条件）**　$\Gamma > 0$ 且对数凸（{@gamma-regularite}），$\Gamma(1) = 1$ 且满足函数方程（{@gamma-factorielle}）。

**第 1 步（三弦引理，L1）**　设 $\varphi$ 在区间上凸，记 $p(u, v) = \frac{\varphi(v) - \varphi(u)}{v - u}$。若 $u < v < w$，则 $p(u, v) \le p(u, w) \le p(v, w)$。特别地，$p(u, v) \le p(v, w)$，并且固定 $u$ 时 $v \mapsto p(u, v)$ 递增。

**第 2 步（夹住 $f(n + x)$）**　设 $f$ 满足三个条件，$\varphi = \ln f$，$x \in ]0, 1]$，整数 $n \ge 2$。由条件 1、2 归纳，$f(n) = (n - 1)!$。对 $n - 1 < n < n + x \le n + 1$ 用第 1 步：
$$p(n - 1, n) \le p(n, n + x) \le p(n, n + 1).$$
其中 $p(n - 1, n) = \ln\frac{(n-1)!}{(n-2)!} = \ln(n - 1)$，$p(n, n + 1) = \ln n$。乘以 $x > 0$ 再取指数：
$$(n - 1)^x\,(n - 1)! \le f(n + x) \le n^x\,(n - 1)!.$$

**第 3 步（回到 $f(x)$）**　由条件 2 归纳，$f(x + n) = x(x + 1)\cdots(x + n - 1)\,f(x)$。代入第 2 步：
$$\frac{(n - 1)^x\,(n - 1)!}{x(x+1)\cdots(x+n-1)} \le f(x) \le \frac{n^x\,(n - 1)!}{x(x+1)\cdots(x+n-1)}.$$

**第 4 步（取极限）**　令 $u_n(x) = \frac{n^x\,n!}{x(x+1)\cdots(x+n)}$。第 3 步的上界等于 $u_n(x)\cdot\frac{x + n}{n}$；把第 3 步的下界中的 $n$ 换成 $n + 1$（$n + 1 \ge 2$），它恰好等于 $u_n(x)$。所以对 $n \ge 2$：
$$u_n(x) \le f(x) \le u_n(x)\,\frac{x + n}{n},\qquad\text{即}\qquad f(x)\,\frac{n}{n + x} \le u_n(x) \le f(x).$$
由夹逼定理，$u_n(x) \to f(x)$。

**第 5 步（唯一性）**　对 $x \in ]0, 1]$，$f(x) = \lim u_n(x)$ 不依赖于 $f$。对 $x > 1$，取整数 $m \ge 1$ 使 $x - m \in ]0, 1]$，由条件 2，$f(x) = (x - 1)(x - 2)\cdots(x - m)\,f(x - m)$，也被确定。所以满足三个条件的函数至多一个；由第 0 步，它就是 $\Gamma$。

**第 6 步（Gauss 公式对一切 $x > 0$ 成立）**　第 4 步（$f = \Gamma$）给出 $x \in ]0, 1]$ 的情形。直接计算 $u_n(x + 1) = u_n(x)\cdot\frac{nx}{x + n + 1}$；若 $u_n(x) \to \Gamma(x)$，则 $u_n(x + 1) \to x\Gamma(x) = \Gamma(x + 1)$。对 $\lceil x \rceil$ 归纳，公式对一切 $x > 0$ 成立。
:::

::: fr
▷ Méthode : les pentes des cordes d'une fonction convexe sont croissantes (lemme des trois cordes). En comparant les pentes autour des entiers $n - 1, n, n + 1$, on encadre $f(n + x)$ par deux quantités qui ne dépendent que de $n$ et $x$ ; l'équation fonctionnelle remplace ensuite $f(n + x)$ par $f(x)$. Le rapport des deux bornes tend vers $1$, donc $f(x)$ est déterminé.

**Étape 0 ($\Gamma$ vérifie les trois conditions)**　$\Gamma > 0$ est log-convexe ({@fr:gamma-regularite}), $\Gamma(1) = 1$ et $\Gamma$ vérifie l'équation fonctionnelle ({@fr:gamma-factorielle}).

**Étape 1 (lemme des trois cordes, L1)**　Soit $\varphi$ convexe sur un intervalle ; notons $p(u, v) = \frac{\varphi(v) - \varphi(u)}{v - u}$. Si $u < v < w$, alors $p(u, v) \le p(u, w) \le p(v, w)$. En particulier $p(u, v) \le p(v, w)$ et, à $u$ fixé, $v \mapsto p(u, v)$ est croissante.

**Étape 2 (encadrement de $f(n + x)$)**　Soit $f$ vérifiant les trois conditions, $\varphi = \ln f$, $x \in ]0, 1]$ et $n \ge 2$ entier. Par récurrence à partir des conditions 1 et 2, $f(n) = (n - 1)!$. L'étape 1 appliquée à $n - 1 < n < n + x \le n + 1$ donne
$$p(n - 1, n) \le p(n, n + x) \le p(n, n + 1),$$
avec $p(n - 1, n) = \ln\frac{(n-1)!}{(n-2)!} = \ln(n - 1)$ et $p(n, n + 1) = \ln n$. En multipliant par $x > 0$ puis en passant à l'exponentielle :
$$(n - 1)^x\,(n - 1)! \le f(n + x) \le n^x\,(n - 1)!.$$

**Étape 3 (retour à $f(x)$)**　Par récurrence à partir de la condition 2, $f(x + n) = x(x + 1)\cdots(x + n - 1)\,f(x)$. En reportant dans l'étape 2 :
$$\frac{(n - 1)^x\,(n - 1)!}{x(x+1)\cdots(x+n-1)} \le f(x) \le \frac{n^x\,(n - 1)!}{x(x+1)\cdots(x+n-1)}.$$

**Étape 4 (passage à la limite)**　Posons $u_n(x) = \frac{n^x\,n!}{x(x+1)\cdots(x+n)}$. Le majorant de l'étape 3 vaut $u_n(x)\cdot\frac{x + n}{n}$ ; en remplaçant $n$ par $n + 1$ ($n + 1 \ge 2$) dans le minorant de l'étape 3, on obtient exactement $u_n(x)$. Donc, pour $n \ge 2$,
$$u_n(x) \le f(x) \le u_n(x)\,\frac{x + n}{n},\qquad\text{c'est-à-dire}\qquad f(x)\,\frac{n}{n + x} \le u_n(x) \le f(x).$$
Par le théorème des gendarmes, $u_n(x) \to f(x)$.

**Étape 5 (unicité)**　Pour $x \in ]0, 1]$, $f(x) = \lim u_n(x)$ ne dépend pas de $f$. Pour $x > 1$, soit $m \ge 1$ entier tel que $x - m \in ]0, 1]$ ; d'après la condition 2, $f(x) = (x - 1)(x - 2)\cdots(x - m)\,f(x - m)$ est aussi déterminé. Il existe donc au plus une fonction vérifiant les trois conditions ; d'après l'étape 0, c'est $\Gamma$.

**Étape 6 (formule de Gauss pour tout $x > 0$)**　L'étape 4 (avec $f = \Gamma$) donne le cas $x \in ]0, 1]$. Un calcul direct donne $u_n(x + 1) = u_n(x)\cdot\frac{nx}{x + n + 1}$ ; si $u_n(x) \to \Gamma(x)$, alors $u_n(x + 1) \to x\Gamma(x) = \Gamma(x + 1)$. Par récurrence sur $\lceil x \rceil$, la formule vaut pour tout $x > 0$.
:::

::: thm id=complements zh="余元公式" en="Euler's reflection formula" fr="Formule des compléments" ru="Формула дополнения" lvl=3 ref="Stein–Shakarchi, *Complex Analysis*，第 6 章；Artin, *The Gamma Function*"
对 $0 < x < 1$，$\Gamma(x)\Gamma(1 - x) = \dfrac{\pi}{\sin\pi x}$。特别地 $\Gamma(\frac12) = \sqrt\pi$（也可以直接由 Gauss 积分得到，见 {@gauss} 与 {@c7-gamma-demi}）。
:::

::: fr
Pour $0 < x < 1$, $\Gamma(x)\Gamma(1 - x) = \dfrac{\pi}{\sin\pi x}$. En particulier $\Gamma(\frac12) = \sqrt\pi$ (ce que l'on obtient aussi directement à partir de l'intégrale de Gauss, voir {@fr:gauss} et {@fr:c7-gamma-demi}).
:::

::: q
设 $s > 0$，$x > 0$。计算 $\displaystyle\int_0^{+\infty}t^{x-1}\e^{-st}\,\dd t$；再说明 $x \mapsto \int_0^{+\infty}(\ln t)\,t^{x-1}\e^{-t}\,\dd t$ 在 $x_0 \approx 1.4616$ 处变号。
:::

::: ans
换元 $t = u/s$（{@changement-variable-gen}，$u \mapsto u/s$ 是 $]0, +\infty[$ 上的 $\Cc^1$ 递增双射）：
$$\int_0^{+\infty}t^{x-1}\e^{-st}\,\dd t = \int_0^{+\infty}\frac{u^{x-1}}{s^{x-1}}\e^{-u}\,\frac{\dd u}{s} = \frac{\Gamma(x)}{s^x}.$$
第二个积分就是 $\Gamma'(x)$（{@gamma-regularite}，$k = 1$）。由 {@c7-gamma-variations}，$\Gamma'$ 在 $]0, x_0[$ 上 $< 0$，在 $]x_0, +\infty[$ 上 $> 0$。
:::

## 两个经典积分

$\e^{-t^2}$ 和 $\frac{\sin t}{t}$ 都没有初等原函数，它们在 $[0, +\infty[$ 上的积分却能精确算出。方法是同一个：**引入一个参数，使含参积分满足一个可解的微分方程，再用特殊值或极限确定常数。**

::: thm id=gauss zh="Gauss 积分" en="Gaussian integral" fr="Intégrale de Gauss" ru="Интеграл Эйлера — Пуассона" lvl=1
$$\int_0^{+\infty}\e^{-t^2}\,\dd t = \frac{\sqrt\pi}{2}.$$
:::

::: fr
$$\int_0^{+\infty}\e^{-t^2}\,\dd t = \frac{\sqrt\pi}{2}.$$
:::

::: proof
▷ 思路：记 $I = \int_0^{+\infty}\e^{-t^2}\,\dd t$。构造两个函数
$$F(x) = \Big(\int_0^x\e^{-t^2}\,\dd t\Big)^2,\qquad G(x) = \int_0^1\frac{\e^{-x^2(1 + t^2)}}{1 + t^2}\,\dd t\qquad (x \ge 0),$$
证明 $(F + G)' = 0$。$x = 0$ 处 $F + G = \frac\pi4$；$x \to +\infty$ 时 $F \to I^2$，$G \to 0$。

**第 0 步（$I$ 收敛）**　$\e^{-t^2}$ 连续且 $> 0$；对 $t \ge 1$，$t^2 \ge t$，所以 $\e^{-t^2} \le \e^{-t}$，后者可积（{@riemann-integrales}）。由比较定理，$I$ 收敛。

**第 1 步（$F'$）**　令 $\Phi(x) = \int_0^x\e^{-t^2}\,\dd t$。由微积分基本定理，$\Phi' = \e^{-x^2}$，所以 $F' = 2\e^{-x^2}\Phi(x)$。

**第 2 步（$G$ 可导）**　对 $A = [0, +\infty[$、$I = [0, 1]$、$g(x, t) = \frac{\e^{-x^2(1 + t^2)}}{1 + t^2}$ 用 {@derivation-parametre}：

- 条件 1：$g(x, \cdot)$ 在 $[0, 1]$ 上连续，从而可积；
- 条件 2：$\frac{\partial g}{\partial x}(x, t) = -2x\,\e^{-x^2(1 + t^2)}$，关于 $x$、$t$ 连续；
- 条件 3：对 $x \ge 0$、$t \in [0, 1]$，
  $$\Big|\frac{\partial g}{\partial x}(x, t)\Big| = 2x\,\e^{-x^2}\,\e^{-x^2t^2} \le 2x\,\e^{-x^2} \le \frac{2x}{1 + x^2} \le 1,$$
  其中用了 $\e^{x^2} \ge 1 + x^2$ 和 $2x \le 1 + x^2$。常数 $\varphi = 1$ 在 $[0, 1]$ 上可积，是全局的控制函数。

所以 $G$ 在 $[0, +\infty[$ 上是 $\Cc^1$ 的，$G'(x) = -2x\,\e^{-x^2}\int_0^1\e^{-x^2t^2}\,\dd t$。

**第 3 步（$G' = -F'$）**　对 $x > 0$，换元 $u = xt$：$\int_0^1\e^{-x^2t^2}\,\dd t = \frac1x\int_0^x\e^{-u^2}\,\dd u = \frac{\Phi(x)}{x}$，所以 $G'(x) = -2\e^{-x^2}\Phi(x) = -F'(x)$。对 $x = 0$：$G'(0) = 0$，$F'(0) = 2\Phi(0) = 0$。所以 $(F + G)' = 0$ 在区间 $[0, +\infty[$ 上成立，$F + G$ 是常数：
$$F(x) + G(x) = F(0) + G(0) = 0 + \int_0^1\frac{\dd t}{1 + t^2} = \frac\pi4.$$

**第 4 步（令 $x \to +\infty$）**　因为 $\frac{\e^{-x^2t^2}}{1 + t^2} \le 1$，$0 \le G(x) \le \int_0^1\e^{-x^2}\,\dd t = \e^{-x^2} \to 0$。由广义积分的定义，$\Phi(x) \to I$，所以 $F(x) \to I^2$。于是 $I^2 = \frac\pi4$。$I \ge 0$（非负函数的积分），所以 $I = \frac{\sqrt\pi}{2}$。

第 11 章用极坐标给出另一个（更常见的）证明 {@gauss-polaires}。
:::

::: fr
▷ Méthode : notons $I = \int_0^{+\infty}\e^{-t^2}\,\dd t$. On introduit les deux fonctions
$$F(x) = \Big(\int_0^x\e^{-t^2}\,\dd t\Big)^2,\qquad G(x) = \int_0^1\frac{\e^{-x^2(1 + t^2)}}{1 + t^2}\,\dd t\qquad (x \ge 0),$$
et on montre que $(F + G)' = 0$. En $x = 0$, $F + G = \frac\pi4$ ; quand $x \to +\infty$, $F \to I^2$ et $G \to 0$.

**Étape 0 ($I$ converge)**　La fonction $\e^{-t^2}$ est continue et $> 0$ ; pour $t \ge 1$, $t^2 \ge t$ donc $\e^{-t^2} \le \e^{-t}$, qui est intégrable ({@fr:riemann-integrales}). Par comparaison, $I$ converge.

**Étape 1 ($F'$)**　Posons $\Phi(x) = \int_0^x\e^{-t^2}\,\dd t$. Par le théorème fondamental de l'analyse, $\Phi' = \e^{-x^2}$, donc $F' = 2\e^{-x^2}\Phi(x)$.

**Étape 2 ($G$ est dérivable)**　On applique {@fr:derivation-parametre} avec $A = [0, +\infty[$, $I = [0, 1]$ et $g(x, t) = \frac{\e^{-x^2(1 + t^2)}}{1 + t^2}$ :

- hypothèse 1 : $g(x, \cdot)$ est continue sur $[0, 1]$, donc intégrable ;
- hypothèse 2 : $\frac{\partial g}{\partial x}(x, t) = -2x\,\e^{-x^2(1 + t^2)}$ est continue en $x$ et en $t$ ;
- hypothèse 3 : pour $x \ge 0$ et $t \in [0, 1]$,
  $$\Big|\frac{\partial g}{\partial x}(x, t)\Big| = 2x\,\e^{-x^2}\,\e^{-x^2t^2} \le 2x\,\e^{-x^2} \le \frac{2x}{1 + x^2} \le 1,$$
  où l'on a utilisé $\e^{x^2} \ge 1 + x^2$ et $2x \le 1 + x^2$. La constante $\varphi = 1$ est intégrable sur $[0, 1]$ : c'est une fonction dominante globale.

Donc $G$ est $\Cc^1$ sur $[0, +\infty[$ et $G'(x) = -2x\,\e^{-x^2}\int_0^1\e^{-x^2t^2}\,\dd t$.

**Étape 3 ($G' = -F'$)**　Pour $x > 0$, le changement de variable $u = xt$ donne $\int_0^1\e^{-x^2t^2}\,\dd t = \frac1x\int_0^x\e^{-u^2}\,\dd u = \frac{\Phi(x)}{x}$, donc $G'(x) = -2\e^{-x^2}\Phi(x) = -F'(x)$. Pour $x = 0$ : $G'(0) = 0$ et $F'(0) = 2\Phi(0) = 0$. Ainsi $(F + G)' = 0$ sur l'intervalle $[0, +\infty[$ et $F + G$ est constante :
$$F(x) + G(x) = F(0) + G(0) = 0 + \int_0^1\frac{\dd t}{1 + t^2} = \frac\pi4.$$

**Étape 4 ($x \to +\infty$)**　Comme $\frac{\e^{-x^2t^2}}{1 + t^2} \le 1$, on a $0 \le G(x) \le \int_0^1\e^{-x^2}\,\dd t = \e^{-x^2} \to 0$. Par définition de l'intégrale généralisée, $\Phi(x) \to I$, donc $F(x) \to I^2$. Ainsi $I^2 = \frac\pi4$ ; comme $I \ge 0$ (intégrale d'une fonction positive), $I = \frac{\sqrt\pi}{2}$.

Le chapitre 11 en donne une autre preuve (plus classique) en coordonnées polaires, {@fr:gauss-polaires}.
:::

::: cor id=c7-gamma-demi zh="Gauss 积分的几个推论" en="Consequences of the Gaussian integral" fr="Conséquences de l'intégrale de Gauss" ru="Следствия интеграла Эйлера — Пуассона" lvl=1
1. 对 $a > 0$，$\displaystyle\int_{-\infty}^{+\infty}\e^{-at^2}\,\dd t = \sqrt{\frac\pi a}$；特别地 $\int_{-\infty}^{+\infty}\e^{-t^2}\,\dd t = \sqrt\pi$，$\int_{-\infty}^{+\infty}\e^{-u^2/2}\,\dd u = \sqrt{2\pi}$。
2. $\Gamma(\frac12) = \sqrt\pi$，并且对 $n \in \N$，$\Gamma(n + \frac12) = \dfrac{(2n)!}{4^n\,n!}\sqrt\pi$。
:::

::: fr
1. Pour $a > 0$, $\displaystyle\int_{-\infty}^{+\infty}\e^{-at^2}\,\dd t = \sqrt{\frac\pi a}$ ; en particulier $\int_{-\infty}^{+\infty}\e^{-t^2}\,\dd t = \sqrt\pi$ et $\int_{-\infty}^{+\infty}\e^{-u^2/2}\,\dd u = \sqrt{2\pi}$.
2. $\Gamma(\frac12) = \sqrt\pi$ et, pour $n \in \N$, $\Gamma(n + \frac12) = \dfrac{(2n)!}{4^n\,n!}\sqrt\pi$.
:::

::: proof
▷ 思路：都是变量替换 {@changement-variable-gen} 加上 {@gauss}；$\Gamma(n + \frac12)$ 再用函数方程归纳。

**1.**　$t \mapsto \e^{-t^2}$ 是偶函数，由 {@gauss}，$\int_{-\infty}^{+\infty}\e^{-t^2}\,\dd t = 2 \cdot \frac{\sqrt\pi}{2} = \sqrt\pi$。对 $a > 0$，换元 $t = u/\sqrt a$（$\R$ 到 $\R$ 的 $\Cc^1$ 递增双射）：$\int_{\R}\e^{-at^2}\,\dd t = \frac{1}{\sqrt a}\int_{\R}\e^{-u^2}\,\dd u = \sqrt{\pi/a}$。取 $a = \frac12$ 得 $\sqrt{2\pi}$。

**2.**　换元 $t = u^2$（$u \mapsto u^2$ 是 $]0, +\infty[$ 到自身的 $\Cc^1$ 递增双射，$\dd t = 2u\,\dd u$）：
$$\Gamma\big(\tfrac12\big) = \int_0^{+\infty}t^{-1/2}\e^{-t}\,\dd t = \int_0^{+\infty}\frac{1}{u}\,\e^{-u^2}\,2u\,\dd u = 2\int_0^{+\infty}\e^{-u^2}\,\dd u = \sqrt\pi.$$
对 $n$ 归纳证明第二个公式。**初始化**：$n = 0$ 时右边为 $\sqrt\pi$。**递推**：若公式对 $n$ 成立，由 {@gamma-factorielle}，
$$\Gamma\big(n + \tfrac32\big) = \big(n + \tfrac12\big)\Gamma\big(n + \tfrac12\big) = \frac{2n + 1}{2}\cdot\frac{(2n)!}{4^n\,n!}\sqrt\pi = \frac{(2n + 2)(2n + 1)\,(2n)!}{4 \cdot 4^n\,(n + 1)\,n!}\sqrt\pi = \frac{(2n + 2)!}{4^{n+1}(n + 1)!}\sqrt\pi.$$
（倒数第二个等号是分子分母同乘 $2(n + 1)$。）这就是 $n + 1$ 的公式。
:::

::: fr
▷ Méthode : changements de variable {@fr:changement-variable-gen} et {@fr:gauss} ; pour $\Gamma(n + \frac12)$, récurrence avec l'équation fonctionnelle.

**1.**　La fonction $t \mapsto \e^{-t^2}$ est paire ; d'après {@fr:gauss}, $\int_{-\infty}^{+\infty}\e^{-t^2}\,\dd t = 2 \cdot \frac{\sqrt\pi}{2} = \sqrt\pi$. Pour $a > 0$, le changement de variable $t = u/\sqrt a$ (bijection $\Cc^1$ croissante de $\R$ sur $\R$) donne $\int_{\R}\e^{-at^2}\,\dd t = \frac{1}{\sqrt a}\int_{\R}\e^{-u^2}\,\dd u = \sqrt{\pi/a}$. Avec $a = \frac12$ on obtient $\sqrt{2\pi}$.

**2.**　Le changement de variable $t = u^2$ ($u \mapsto u^2$ est une bijection $\Cc^1$ croissante de $]0, +\infty[$ sur lui-même, $\dd t = 2u\,\dd u$) donne
$$\Gamma\big(\tfrac12\big) = \int_0^{+\infty}t^{-1/2}\e^{-t}\,\dd t = \int_0^{+\infty}\frac{1}{u}\,\e^{-u^2}\,2u\,\dd u = 2\int_0^{+\infty}\e^{-u^2}\,\dd u = \sqrt\pi.$$
On démontre la seconde formule par récurrence sur $n$. **Initialisation** : pour $n = 0$, le membre de droite vaut $\sqrt\pi$. **Hérédité** : si la formule est vraie au rang $n$, d'après {@fr:gamma-factorielle},
$$\Gamma\big(n + \tfrac32\big) = \big(n + \tfrac12\big)\Gamma\big(n + \tfrac12\big) = \frac{2n + 1}{2}\cdot\frac{(2n)!}{4^n\,n!}\sqrt\pi = \frac{(2n + 2)(2n + 1)\,(2n)!}{4 \cdot 4^n\,(n + 1)\,n!}\sqrt\pi = \frac{(2n + 2)!}{4^{n+1}(n + 1)!}\sqrt\pi$$
(l'avant-dernière égalité s'obtient en multipliant numérateur et dénominateur par $2(n + 1)$). C'est la formule au rang $n + 1$.
:::

::: thm id=dirichlet-integrale zh="Dirichlet 积分" en="Dirichlet integral" fr="Intégrale de Dirichlet" ru="Интеграл Дирихле" lvl=1
$$\int_0^{+\infty}\frac{\sin t}{t}\,\dd t = \frac\pi2.$$
:::

::: fr
$$\int_0^{+\infty}\frac{\sin t}{t}\,\dd t = \frac\pi2.$$
:::

::: proof
▷ 思路：引入「收敛因子」$\e^{-xt}$，令 $F(x) = \int_0^{+\infty}\e^{-xt}\frac{\sin t}{t}\,\dd t$（$x \ge 0$）。$x > 0$ 时可以在积分号下求导，$F' = -\frac{1}{1 + x^2}$，所以 $F(x) = \frac\pi2 - \Arctan x$。难点在 $x = 0$：$\frac{\sin t}{t}$ 不可积，$0$ 附近找不到控制函数。办法是先分部积分，把 $F(x)$ 改写成一个可以控制的绝对收敛积分，再用 {@continuite-parametre}。

记 $f(x, t) = \e^{-xt}\frac{\sin t}{t}$（$x \ge 0$，$t > 0$）。

**第 1 步（$F$ 在 $[0, +\infty[$ 上有定义）**　$x = 0$：$\int_0^{+\infty}\frac{\sin t}{t}\,\dd t$ 收敛（{@sinc}）。$x > 0$：由 $\abs{\sin t} \le t$，$\abs{f(x, t)} \le \e^{-xt}$，可积。

**第 2 步（$F$ 在 $]0, +\infty[$ 上是 $\Cc^1$ 的）**　对 $A = ]0, +\infty[$、$I = ]0, +\infty[$ 用 {@derivation-parametre}。条件 1 由第 1 步；条件 2：$\frac{\partial f}{\partial x}(x, t) = -\e^{-xt}\sin t$，关于 $x$、$t$ 连续；条件 3：在 $[a, b] \subset ]0, +\infty[$ 上，$\big|\frac{\partial f}{\partial x}(x, t)\big| \le \e^{-at}$，可积。所以
$$F'(x) = -\int_0^{+\infty}\e^{-xt}\sin t\,\dd t\qquad (x > 0).$$

**第 3 步（算出 $F'$）**　固定 $x > 0$。对 $B > 0$，
$$\int_0^B\e^{(-x + \ii)t}\,\dd t = \frac{\e^{(-x + \ii)B} - 1}{-x + \ii},\qquad \big|\e^{(-x + \ii)B}\big| = \e^{-xB} \xrightarrow[B \to +\infty]{} 0,$$
所以 $\int_0^{+\infty}\e^{(-x + \ii)t}\,\dd t = \frac{1}{x - \ii} = \frac{x + \ii}{1 + x^2}$。取虚部（积分的虚部等于虚部的积分）：$\int_0^{+\infty}\e^{-xt}\sin t\,\dd t = \frac{1}{1 + x^2}$。于是 $F'(x) = -\frac{1}{1 + x^2}$。

**第 4 步（定常数）**　在区间 $]0, +\infty[$ 上 $(F + \Arctan)' = 0$，所以存在常数 $C$ 使 $F(x) = C - \Arctan x$。又 $\abs{F(x)} \le \int_0^{+\infty}\e^{-xt}\,\dd t = \frac1x \to 0$（$x \to +\infty$），而 $\Arctan x \to \frac\pi2$，所以 $C = \frac\pi2$：
$$F(x) = \frac\pi2 - \Arctan x\qquad (x > 0).$$

**第 5 步（分部积分改写 $F$）**　固定 $x \ge 0$。在 $]0, +\infty[$ 上对 $u(t) = 1 - \cos t$（$u' = \sin t$）与 $v(t) = \frac{\e^{-xt}}{t}$（$v'(t) = -\frac{(1 + xt)\e^{-xt}}{t^2}$）用 {@ipp-generalisee}。边界项：由 $0 \le 1 - \cos t \le \frac{t^2}{2}$，$0 \le u(t)v(t) \le \frac t2 \to 0$（$t \to 0^{+}$）；由 $1 - \cos t \le 2$，$0 \le u(t)v(t) \le \frac2t \to 0$（$t \to +\infty$）。$\int_0^{+\infty}u'v = F(x)$ 收敛（第 1 步），所以 $\int_0^{+\infty}uv'$ 也收敛，且
$$F(x) = \big[uv\big]_0^{+\infty} - \int_0^{+\infty}uv' = \int_0^{+\infty}\frac{(1 - \cos t)(1 + xt)\,\e^{-xt}}{t^2}\,\dd t.$$

**第 6 步（$F$ 在 $[0, +\infty[$ 上连续）**　令 $h(x, t) = \frac{(1 - \cos t)(1 + xt)\,\e^{-xt}}{t^2}$。它关于 $x$、$t$ 连续。对 $s \ge 0$，$\e^s \ge 1 + s$，即 $(1 + s)\e^{-s} \le 1$；取 $s = xt$：
$$0 \le h(x, t) \le \varphi(t) := \frac{1 - \cos t}{t^2}\qquad (x \ge 0,\ t > 0).$$
$\varphi$ 可积：在 $]0, 1]$ 上 $\varphi \le \frac12$，在 $[1, +\infty[$ 上 $\varphi \le \frac{2}{t^2}$。由 {@continuite-parametre}（$A = [0, +\infty[$），$F$ 在 $[0, +\infty[$ 上连续。

**第 7 步（结论）**　由第 4、6 步，
$$\int_0^{+\infty}\frac{\sin t}{t}\,\dd t = F(0) = \lim_{x \to 0^{+}}F(x) = \lim_{x \to 0^{+}}\Big(\frac\pi2 - \Arctan x\Big) = \frac\pi2.$$
（第 5 步取 $x = 0$ 还给出 $\int_0^{+\infty}\frac{1 - \cos t}{t^2}\,\dd t = \frac\pi2$，这就是 {@c7-cex-derivation} 中的常数 $C$。）
:::

::: fr
▷ Méthode : on introduit le « facteur de convergence » $\e^{-xt}$ et on pose $F(x) = \int_0^{+\infty}\e^{-xt}\frac{\sin t}{t}\,\dd t$ ($x \ge 0$). Pour $x > 0$ on peut dériver sous le signe intégrale : $F' = -\frac{1}{1 + x^2}$, d'où $F(x) = \frac\pi2 - \Arctan x$. La difficulté est en $x = 0$ : $\frac{\sin t}{t}$ n'est pas intégrable, et il n'y a pas de fonction dominante au voisinage de $0$. On commence donc par une intégration par parties qui transforme $F(x)$ en une intégrale absolument convergente que l'on sait dominer, puis on applique {@fr:continuite-parametre}.

Notons $f(x, t) = \e^{-xt}\frac{\sin t}{t}$ ($x \ge 0$, $t > 0$).

**Étape 1 ($F$ est définie sur $[0, +\infty[$)**　Pour $x = 0$, $\int_0^{+\infty}\frac{\sin t}{t}\,\dd t$ converge ({@fr:sinc}). Pour $x > 0$, comme $\abs{\sin t} \le t$, $\abs{f(x, t)} \le \e^{-xt}$, qui est intégrable.

**Étape 2 ($F$ est $\Cc^1$ sur $]0, +\infty[$)**　On applique {@fr:derivation-parametre} avec $A = ]0, +\infty[$ et $I = ]0, +\infty[$. Hypothèse 1 : étape 1 ; hypothèse 2 : $\frac{\partial f}{\partial x}(x, t) = -\e^{-xt}\sin t$ est continue en $x$ et en $t$ ; hypothèse 3 : sur $[a, b] \subset ]0, +\infty[$, $\big|\frac{\partial f}{\partial x}(x, t)\big| \le \e^{-at}$, intégrable. Donc
$$F'(x) = -\int_0^{+\infty}\e^{-xt}\sin t\,\dd t\qquad (x > 0).$$

**Étape 3 (calcul de $F'$)**　Soit $x > 0$. Pour $B > 0$,
$$\int_0^B\e^{(-x + \ii)t}\,\dd t = \frac{\e^{(-x + \ii)B} - 1}{-x + \ii},\qquad \big|\e^{(-x + \ii)B}\big| = \e^{-xB} \xrightarrow[B \to +\infty]{} 0,$$
donc $\int_0^{+\infty}\e^{(-x + \ii)t}\,\dd t = \frac{1}{x - \ii} = \frac{x + \ii}{1 + x^2}$. En prenant les parties imaginaires (la partie imaginaire de l'intégrale est l'intégrale de la partie imaginaire) : $\int_0^{+\infty}\e^{-xt}\sin t\,\dd t = \frac{1}{1 + x^2}$. Ainsi $F'(x) = -\frac{1}{1 + x^2}$.

**Étape 4 (détermination de la constante)**　Sur l'intervalle $]0, +\infty[$, $(F + \Arctan)' = 0$, donc il existe une constante $C$ telle que $F(x) = C - \Arctan x$. Or $\abs{F(x)} \le \int_0^{+\infty}\e^{-xt}\,\dd t = \frac1x \to 0$ quand $x \to +\infty$, et $\Arctan x \to \frac\pi2$ ; donc $C = \frac\pi2$ :
$$F(x) = \frac\pi2 - \Arctan x\qquad (x > 0).$$

**Étape 5 (réécriture de $F$ par parties)**　Soit $x \ge 0$. On applique {@fr:ipp-generalisee} sur $]0, +\infty[$ à $u(t) = 1 - \cos t$ ($u' = \sin t$) et $v(t) = \frac{\e^{-xt}}{t}$ ($v'(t) = -\frac{(1 + xt)\e^{-xt}}{t^2}$). Termes de bord : comme $0 \le 1 - \cos t \le \frac{t^2}{2}$, $0 \le u(t)v(t) \le \frac t2 \to 0$ quand $t \to 0^{+}$ ; comme $1 - \cos t \le 2$, $0 \le u(t)v(t) \le \frac2t \to 0$ quand $t \to +\infty$. L'intégrale $\int_0^{+\infty}u'v = F(x)$ converge (étape 1), donc $\int_0^{+\infty}uv'$ converge aussi et
$$F(x) = \big[uv\big]_0^{+\infty} - \int_0^{+\infty}uv' = \int_0^{+\infty}\frac{(1 - \cos t)(1 + xt)\,\e^{-xt}}{t^2}\,\dd t.$$

**Étape 6 ($F$ est continue sur $[0, +\infty[$)**　Posons $h(x, t) = \frac{(1 - \cos t)(1 + xt)\,\e^{-xt}}{t^2}$, continue en $x$ et en $t$. Pour $s \ge 0$, $\e^s \ge 1 + s$, c'est-à-dire $(1 + s)\e^{-s} \le 1$ ; avec $s = xt$ :
$$0 \le h(x, t) \le \varphi(t) := \frac{1 - \cos t}{t^2}\qquad (x \ge 0,\ t > 0).$$
La fonction $\varphi$ est intégrable : $\varphi \le \frac12$ sur $]0, 1]$ et $\varphi \le \frac{2}{t^2}$ sur $[1, +\infty[$. D'après {@fr:continuite-parametre} (avec $A = [0, +\infty[$), $F$ est continue sur $[0, +\infty[$.

**Étape 7 (conclusion)**　D'après les étapes 4 et 6,
$$\int_0^{+\infty}\frac{\sin t}{t}\,\dd t = F(0) = \lim_{x \to 0^{+}}F(x) = \lim_{x \to 0^{+}}\Big(\frac\pi2 - \Arctan x\Big) = \frac\pi2.$$
(L'étape 5 avec $x = 0$ donne aussi $\int_0^{+\infty}\frac{1 - \cos t}{t^2}\,\dd t = \frac\pi2$ : c'est la constante $C$ de {@fr:c7-cex-derivation}.)
:::

::: rem
**为什么第 6 步之前必须先分部积分。** 对原来的被积函数，$\sup_{x \ge 0}\abs{f(x, t)} = \frac{\abs{\sin t}}{t}$（在 $x = 0$ 处取到），而 $\frac{\abs{\sin t}}{t}$ 在 $]0, +\infty[$ 上不可积（{@sinc}）。所以在任何 $[0, b]$ 上都没有控制函数，{@continuite-parametre} 不能直接用。分部积分把**半收敛**的积分换成了**绝对收敛**的积分，控制函数 $\frac{1 - \cos t}{t^2}$ 就出现了。另一种办法是一致收敛，见 {@c7-dirichlet-unif}。
:::

::: ex id=fourier-gaussienne zh="Gauss 函数的 Fourier 变换" en="Fourier transform of the Gaussian" fr="Transformée de Fourier de la gaussienne" ru="Преобразование Фурье гауссовой функции" lvl=1
对 $\xi \in \R$，$\displaystyle\int_{-\infty}^{+\infty}\e^{-t^2}\cos(\xi t)\,\dd t = \sqrt\pi\,\e^{-\xi^2/4}$。

令 $F(\xi)$ 为左边，$f(\xi, t) = \e^{-t^2}\cos(\xi t)$。

1. **有定义。** $\abs{f(\xi, t)} \le \e^{-t^2}$，在 $\R$ 上可积（{@c7-gamma-demi}）。
2. **可导。** $\frac{\partial f}{\partial \xi}(\xi, t) = -t\,\e^{-t^2}\sin(\xi t)$，关于 $\xi$、$t$ 连续，且 $\big|\frac{\partial f}{\partial \xi}\big| \le \abs{t}\,\e^{-t^2}$，后者与 $\xi$ 无关，在 $\R$ 上可积（$\abs{t}\e^{-t^2} = O(1/t^2)$）。由 {@derivation-parametre}，$F'(\xi) = -\int_{\R}t\,\e^{-t^2}\sin(\xi t)\,\dd t$。
3. **分部积分。** 令 $w(t) = \frac12\e^{-t^2}$，$w' = -t\,\e^{-t^2}$。边界项 $\abs{w(t)\sin(\xi t)} \le \frac12\e^{-t^2} \to 0$（$t \to \pm\infty$）。由 {@ipp-generalisee}，
   $$F'(\xi) = \int_{\R}w'(t)\sin(\xi t)\,\dd t = \big[w(t)\sin(\xi t)\big]_{-\infty}^{+\infty} - \xi\int_{\R}w(t)\cos(\xi t)\,\dd t = -\frac\xi2\,F(\xi).$$
4. **解方程。** $\big(F(\xi)\e^{\xi^2/4}\big)' = \big(F'(\xi) + \frac\xi2F(\xi)\big)\e^{\xi^2/4} = 0$，所以 $F(\xi) = F(0)\,\e^{-\xi^2/4}$，而 $F(0) = \sqrt\pi$（{@c7-gamma-demi}）。

因为 $t \mapsto \e^{-t^2}\sin(\xi t)$ 是奇函数，上式也就是 $\int_{\R}\e^{-t^2}\e^{-\ii\xi t}\,\dd t = \sqrt\pi\,\e^{-\xi^2/4}$。换元后可得：在归一化 $\hat f(\xi) = \frac{1}{\sqrt{2\pi}}\int_{\R}f(t)\e^{-\ii\xi t}\,\dd t$ 下，$\e^{-t^2/2}$ 是 Fourier 变换的不动点。Gauss 函数也是 Heisenberg 不确定性原理中取等号的函数。
:::

::: q
计算 $\displaystyle\int_0^{+\infty}\Big(\frac{\sin t}{t}\Big)^2\dd t$，以及对 $a \in \R$，$\displaystyle\int_0^{+\infty}\frac{\sin(at)}{t}\,\dd t$。
:::

::: ans
第一个：在 $]0, +\infty[$ 上对 $u(t) = \sin^2 t$、$v(t) = \frac1t$ 用 {@ipp-generalisee}。边界项 $\frac{\sin^2 t}{t} \to 0$（$t \to 0^{+}$ 与 $t \to +\infty$）；$u'(t) = 2\sin t\cos t = \sin 2t$，$\int_0^{+\infty}\frac{\sin 2t}{t}\,\dd t$ 收敛（换元 $s = 2t$ 化为 {@dirichlet-integrale}）。所以
$$\int_0^{+\infty}\frac{\sin^2 t}{t^2}\,\dd t = -\int_0^{+\infty}uv' = \int_0^{+\infty}u'v - \big[uv\big]_0^{+\infty} = \int_0^{+\infty}\frac{\sin 2t}{t}\,\dd t = \frac\pi2.$$
第二个：$a > 0$ 时换元 $s = at$ 得 $\frac\pi2$；$a = 0$ 时为 $0$；$a < 0$ 时由奇偶性为 $-\frac\pi2$。所以它等于 $\frac\pi2\operatorname{sgn}(a)$——作为 $a$ 的函数在 $0$ 处不连续，与 {@c7-cex-derivation} 的 $F'(x) = C\operatorname{sgn}(x)$ 一致。
:::

## Stirling 公式

第 2 章用 Wallis 积分证明了 $n! \sim \sqrt{2\pi n}\,(n/\e)^n$（{@stirling-serie}）。这里用 $\Gamma$ 函数和 {@limite-parametre} 给出另一个证明，并且得到实变量 $x \to +\infty$ 的版本。思路（Laplace 方法）：被积函数 $t^x\e^{-t}$ 在 $t = x$ 处取最大值，并集中在宽度约为 $\sqrt x$ 的范围内；换元 $t = x + \sqrt x\,u$ 把这个峰「放大」到固定的尺度，峰的形状趋于 Gauss 函数 $\e^{-u^2/2}$。控制函数来自下面这个关于对数的引理。

::: lem id=c7-kappa zh="$w - \ln(1 + w)$ 的积分表示" en="An integral formula for $w - \ln(1+w)$" fr="Une écriture intégrale de $w - \ln(1+w)$" ru="Интегральное представление $w - \ln(1+w)$" lvl=1
对 $w > -1$，
$$w - \ln(1 + w) = w^2\,\kappa(w),\qquad \kappa(w) = \int_0^1\frac{\sigma}{1 + w\sigma}\,\dd\sigma.$$
$\kappa$ 在 $]-1, +\infty[$ 上连续、递减，$\kappa(0) = \frac12$。
:::

::: fr
Pour $w > -1$,
$$w - \ln(1 + w) = w^2\,\kappa(w),\qquad \kappa(w) = \int_0^1\frac{\sigma}{1 + w\sigma}\,\dd\sigma.$$
La fonction $\kappa$ est continue et décroissante sur $]-1, +\infty[$, et $\kappa(0) = \frac12$.
:::

::: proof
▷ 思路：把 $w - \ln(1 + w)$ 写成从 $0$ 到 $w$ 的积分，再用线性换元把 $w$ 从积分限移到被积函数里；单调性和连续性都从被积函数读出来。

**第 0 步（被积函数有意义）**　对 $w > -1$、$\sigma \in [0, 1]$：若 $w \ge 0$，$1 + w\sigma \ge 1$；若 $-1 < w < 0$，$1 + w\sigma \ge 1 + w > 0$。所以 $1 + w\sigma \ge \min(1, 1 + w) > 0$。

**第 1 步（积分表示）**　$\tau \mapsto \tau - \ln(1 + \tau)$ 的导数是 $1 - \frac{1}{1 + \tau} = \frac{\tau}{1 + \tau}$，在 $0$ 处取值 $0$，由微积分基本定理，$w - \ln(1 + w) = \int_0^w\frac{\tau}{1 + \tau}\,\dd\tau$。若 $w \ne 0$，换元 $\tau = w\sigma$（$\sigma \in [0, 1]$，$\dd\tau = w\,\dd\sigma$）：
$$\int_0^w\frac{\tau}{1 + \tau}\,\dd\tau = \int_0^1\frac{w\sigma}{1 + w\sigma}\,w\,\dd\sigma = w^2\kappa(w).$$
若 $w = 0$，两边都是 $0$。

**第 2 步（递减）**　设 $-1 < w < w'$。对 $\sigma \in ]0, 1]$，$0 < 1 + w\sigma < 1 + w'\sigma$，所以 $\frac{\sigma}{1 + w\sigma} > \frac{\sigma}{1 + w'\sigma}$。积分得 $\kappa(w) \ge \kappa(w')$。

**第 3 步（连续）**　对 $[a, b] \subset ]-1, +\infty[$、$w \in [a, b]$、$\sigma \in [0, 1]$，由第 0 步的论证，$1 + w\sigma \ge 1 + a\sigma \ge \min(1, 1 + a) > 0$，所以 $0 \le \frac{\sigma}{1 + w\sigma} \le \frac{1}{\min(1, 1 + a)}$，常数在 $[0, 1]$ 上可积。被积函数关于 $w$、$\sigma$ 连续。由 {@c7-domination-locale}(b)，$\kappa$ 连续。最后 $\kappa(0) = \int_0^1\sigma\,\dd\sigma = \frac12$。
:::

::: fr
▷ Méthode : on écrit $w - \ln(1 + w)$ comme une intégrale de $0$ à $w$, puis un changement de variable linéaire fait passer $w$ de la borne dans l'intégrande ; la monotonie et la continuité se lisent sur l'intégrande.

**Étape 0 (l'intégrande est bien défini)**　Pour $w > -1$ et $\sigma \in [0, 1]$ : si $w \ge 0$, $1 + w\sigma \ge 1$ ; si $-1 < w < 0$, $1 + w\sigma \ge 1 + w > 0$. Donc $1 + w\sigma \ge \min(1, 1 + w) > 0$.

**Étape 1 (écriture intégrale)**　La dérivée de $\tau \mapsto \tau - \ln(1 + \tau)$ est $1 - \frac{1}{1 + \tau} = \frac{\tau}{1 + \tau}$ et sa valeur en $0$ est $0$ ; par le théorème fondamental de l'analyse, $w - \ln(1 + w) = \int_0^w\frac{\tau}{1 + \tau}\,\dd\tau$. Si $w \ne 0$, le changement de variable $\tau = w\sigma$ ($\sigma \in [0, 1]$, $\dd\tau = w\,\dd\sigma$) donne
$$\int_0^w\frac{\tau}{1 + \tau}\,\dd\tau = \int_0^1\frac{w\sigma}{1 + w\sigma}\,w\,\dd\sigma = w^2\kappa(w).$$
Si $w = 0$, les deux membres sont nuls.

**Étape 2 (décroissance)**　Soient $-1 < w < w'$. Pour $\sigma \in ]0, 1]$, $0 < 1 + w\sigma < 1 + w'\sigma$, donc $\frac{\sigma}{1 + w\sigma} > \frac{\sigma}{1 + w'\sigma}$. En intégrant, $\kappa(w) \ge \kappa(w')$.

**Étape 3 (continuité)**　Pour $[a, b] \subset ]-1, +\infty[$, $w \in [a, b]$ et $\sigma \in [0, 1]$, l'argument de l'étape 0 donne $1 + w\sigma \ge 1 + a\sigma \ge \min(1, 1 + a) > 0$, donc $0 \le \frac{\sigma}{1 + w\sigma} \le \frac{1}{\min(1, 1 + a)}$, constante intégrable sur $[0, 1]$. L'intégrande est continu en $w$ et en $\sigma$. D'après {@fr:c7-domination-locale} (b), $\kappa$ est continue. Enfin $\kappa(0) = \int_0^1\sigma\,\dd\sigma = \frac12$.
:::

::: thm id=stirling-gamma zh="Γ 函数的 Stirling 公式" en="Stirling's formula for Γ" fr="Formule de Stirling pour Γ" ru="Формула Стирлинга для гамма-функции" lvl=2
$$\Gamma(x + 1) \underset{x \to +\infty}{\sim} \sqrt{2\pi x}\,\Big(\frac{x}{\e}\Big)^x.$$
:::

::: fr
$$\Gamma(x + 1) \underset{x \to +\infty}{\sim} \sqrt{2\pi x}\,\Big(\frac{x}{\e}\Big)^x.$$
:::

::: sketch
▷ 思路（Laplace 方法）：换元 $t = x + \sqrt x\,u$ 把 $\frac{\Gamma(x + 1)}{(x/\e)^x\sqrt x}$ 写成 $\int_{\R}g_x(u)\,\dd u$，$g_x(u) \to \e^{-u^2/2}$；用引理 {@c7-kappa} 找出与 $x \ge 1$ 无关的控制函数，再用 {@limite-parametre}（$a = +\infty$）。

**第 1 步（换元）**　设 $x > 0$。$u \mapsto x + \sqrt x\,u$ 是 $]-\sqrt x, +\infty[$ 到 $]0, +\infty[$ 的 $\Cc^1$ 递增双射，$\dd t = \sqrt x\,\dd u$，且 $t^x\e^{-t} = x^x\big(1 + \frac{u}{\sqrt x}\big)^x\e^{-x}\e^{-\sqrt x\,u}$。由 {@changement-variable-gen}，
$$\Gamma(x + 1) = \int_0^{+\infty}t^x\e^{-t}\,\dd t = \Big(\frac x\e\Big)^x\sqrt x\int_{-\sqrt x}^{+\infty}\exp\Big(x\ln\Big(1 + \frac{u}{\sqrt x}\Big) - \sqrt x\, u\Big)\dd u.$$
由引理 {@c7-kappa}（$w = u/\sqrt x > -1$），指数等于 $x\big(\ln(1 + w) - w\big) = -xw^2\kappa(w) = -u^2\kappa(u/\sqrt x)$。令
$$g_x(u) = \begin{cases}\exp\big(-u^2\kappa(u/\sqrt x)\big) & u > -\sqrt x,\\ 0 & u \le -\sqrt x,\end{cases}\qquad\text{则}\qquad \frac{\Gamma(x + 1)}{(x/\e)^x\sqrt x} = \int_{\R}g_x(u)\,\dd u.$$
（$u \to -\sqrt x^{\,+}$ 时 $x\ln(1 + u/\sqrt x) \to -\infty$，所以 $g_x$ 在 $\R$ 上连续。）

**第 2 步（逐点极限）**　固定 $u \in \R$。当 $x > u^2$ 时 $u > -\sqrt x$，$g_x(u) = \exp\big(-u^2\kappa(u/\sqrt x)\big)$；$x \to +\infty$ 时 $u/\sqrt x \to 0$，$\kappa$ 在 $0$ 处连续且 $\kappa(0) = \frac12$，所以 $g_x(u) \to \e^{-u^2/2}$。

**第 3 步（控制，$x \ge 1$）**　设 $x \ge 1$。

- $u \ge 0$：$0 \le u/\sqrt x \le u$，$\kappa$ 递减，所以 $\kappa(u/\sqrt x) \ge \kappa(u)$，从而 $u^2\kappa(u/\sqrt x) \ge u^2\kappa(u) = u - \ln(1 + u)$（引理），$g_x(u) \le \e^{-u + \ln(1+u)} = (1 + u)\e^{-u}$。
- $-\sqrt x < u < 0$：$u/\sqrt x \in ]-1, 0[$，$\kappa(u/\sqrt x) \ge \kappa(0) = \frac12$，所以 $g_x(u) \le \e^{-u^2/2}$。
- $u \le -\sqrt x$：$g_x(u) = 0$。

所以 $0 \le g_x \le \varphi$，其中 $\varphi(u) = \e^{-u^2/2}$（$u < 0$），$\varphi(u) = (1 + u)\e^{-u}$（$u \ge 0$）。$\varphi$ 连续，在 $\R$ 上可积（$(1 + u)\e^{-u} = O(1/u^2)$；$\e^{-u^2/2}$ 见 {@c7-gamma-demi}），且与 $x$ 无关。

**第 4 步（取极限）**　由 {@limite-parametre}（$A = ]0, +\infty[$，$a = +\infty$，$V = ]1, +\infty[$），
$$\frac{\Gamma(x + 1)}{(x/\e)^x\sqrt x} = \int_{\R}g_x \xrightarrow[x \to +\infty]{} \int_{\R}\e^{-u^2/2}\,\dd u = \sqrt{2\pi}\qquad\text{（{@c7-gamma-demi}）}.$$
这就是 $\Gamma(x + 1) \sim \sqrt{2\pi x}\,(x/\e)^x$。
:::

::: fr
▷ Méthode (méthode de Laplace) : le changement de variable $t = x + \sqrt x\,u$ écrit $\frac{\Gamma(x + 1)}{(x/\e)^x\sqrt x}$ sous la forme $\int_{\R}g_x(u)\,\dd u$ avec $g_x(u) \to \e^{-u^2/2}$ ; le {@fr:c7-kappa} fournit une fonction dominante indépendante de $x \ge 1$, et on conclut par {@fr:limite-parametre} (avec $a = +\infty$).

**Étape 1 (changement de variable)**　Soit $x > 0$. L'application $u \mapsto x + \sqrt x\,u$ est une bijection $\Cc^1$ croissante de $]-\sqrt x, +\infty[$ sur $]0, +\infty[$, avec $\dd t = \sqrt x\,\dd u$ et $t^x\e^{-t} = x^x\big(1 + \frac{u}{\sqrt x}\big)^x\e^{-x}\e^{-\sqrt x\,u}$. D'après {@fr:changement-variable-gen},
$$\Gamma(x + 1) = \int_0^{+\infty}t^x\e^{-t}\,\dd t = \Big(\frac x\e\Big)^x\sqrt x\int_{-\sqrt x}^{+\infty}\exp\Big(x\ln\Big(1 + \frac{u}{\sqrt x}\Big) - \sqrt x\, u\Big)\dd u.$$
D'après le {@fr:c7-kappa} (avec $w = u/\sqrt x > -1$), l'exposant vaut $x\big(\ln(1 + w) - w\big) = -xw^2\kappa(w) = -u^2\kappa(u/\sqrt x)$. Posons
$$g_x(u) = \begin{cases}\exp\big(-u^2\kappa(u/\sqrt x)\big) & u > -\sqrt x,\\ 0 & u \le -\sqrt x,\end{cases}\qquad\text{de sorte que}\qquad \frac{\Gamma(x + 1)}{(x/\e)^x\sqrt x} = \int_{\R}g_x(u)\,\dd u.$$
(Quand $u \to -\sqrt x^{\,+}$, $x\ln(1 + u/\sqrt x) \to -\infty$, donc $g_x$ est continue sur $\R$.)

**Étape 2 (limite simple)**　Soit $u \in \R$. Pour $x > u^2$, on a $u > -\sqrt x$ et $g_x(u) = \exp\big(-u^2\kappa(u/\sqrt x)\big)$ ; quand $x \to +\infty$, $u/\sqrt x \to 0$, et $\kappa$ est continue en $0$ avec $\kappa(0) = \frac12$, donc $g_x(u) \to \e^{-u^2/2}$.

**Étape 3 (domination pour $x \ge 1$)**　Soit $x \ge 1$.

- $u \ge 0$ : $0 \le u/\sqrt x \le u$ et $\kappa$ est décroissante, donc $\kappa(u/\sqrt x) \ge \kappa(u)$, d'où $u^2\kappa(u/\sqrt x) \ge u^2\kappa(u) = u - \ln(1 + u)$ (lemme) et $g_x(u) \le \e^{-u + \ln(1+u)} = (1 + u)\e^{-u}$.
- $-\sqrt x < u < 0$ : $u/\sqrt x \in ]-1, 0[$, donc $\kappa(u/\sqrt x) \ge \kappa(0) = \frac12$ et $g_x(u) \le \e^{-u^2/2}$.
- $u \le -\sqrt x$ : $g_x(u) = 0$.

Ainsi $0 \le g_x \le \varphi$, où $\varphi(u) = \e^{-u^2/2}$ pour $u < 0$ et $\varphi(u) = (1 + u)\e^{-u}$ pour $u \ge 0$. La fonction $\varphi$ est continue, intégrable sur $\R$ ($(1 + u)\e^{-u} = O(1/u^2)$ ; pour $\e^{-u^2/2}$, voir {@fr:c7-gamma-demi}) et ne dépend pas de $x$.

**Étape 4 (passage à la limite)**　D'après {@fr:limite-parametre} (avec $A = ]0, +\infty[$, $a = +\infty$, $V = ]1, +\infty[$),
$$\frac{\Gamma(x + 1)}{(x/\e)^x\sqrt x} = \int_{\R}g_x \xrightarrow[x \to +\infty]{} \int_{\R}\e^{-u^2/2}\,\dd u = \sqrt{2\pi}\qquad\text{({@fr:c7-gamma-demi})}.$$
C'est exactement $\Gamma(x + 1) \sim \sqrt{2\pi x}\,(x/\e)^x$.
:::

::: rem
取 $x = n$ 就得到 $n! \sim \sqrt{2\pi n}\,(n/\e)^n$（{@stirling-serie}）。这个证明不用 Wallis 积分：常数 $\sqrt{2\pi}$ 直接来自 Gauss 积分。数值上，$\Gamma(x + 1)\big/\big(\sqrt{2\pi x}\,(x/\e)^x\big)$ 在 $x = 1, 10, 100$ 处分别约为 $1.084$、$1.0084$、$1.00083$，相对误差大约是 $\frac{1}{12x}$。
:::

::: rem zh="Laplace 方法"
这个证明的思想适用于一般的 $\int \e^{x\,\phi(t)}g(t)\,\dd t$（$x \to +\infty$）：若 $\phi$ 在内点 $t_0$ 处取唯一最大值且 $\phi''(t_0) < 0$（$g$ 在 $t_0$ 处连续，$g(t_0) \ne 0$，并有适当的可积性），则积分 $\sim g(t_0)\,\e^{x\phi(t_0)}\sqrt{\frac{2\pi}{x\abs{\phi''(t_0)}}}$。对 $\Gamma(x + 1) = x^{x+1}\int_0^{+\infty}\e^{x(\ln s - s)}\,\dd s$（$t = xs$），$\phi(s) = \ln s - s$，$t_0 = 1$，$\phi(1) = -1$，$\phi''(1) = -1$，正好给出 Stirling 公式。这是苏联分析教材（Зорич 第二卷、Федорюк）中渐近方法的起点。
:::

::: q
用 Stirling 公式求 $\dbinom{2n}{n}$ 当 $n \to \infty$ 时的等价量。
:::

::: ans
$$\binom{2n}{n} = \frac{(2n)!}{(n!)^2} \sim \frac{\sqrt{4\pi n}\,(2n/\e)^{2n}}{2\pi n\,(n/\e)^{2n}} = \frac{\sqrt{4\pi n}}{2\pi n}\,4^n = \frac{4^n}{\sqrt{\pi n}}.$$
（等价可以相乘、相除。）
:::

## 与一致收敛方法的关系

控制收敛定理要求被积函数**绝对可积**，并且有一个与参数无关的可积上界。苏联和中国的教材沿用 19 世纪的另一条路：把含参广义积分看成截断积分 $\int_a^c f(x, t)\,\dd t$ 当 $c \to +\infty$ 时的极限，要求这个极限关于参数**一致**。这条路能处理半收敛的积分，例如 {@dirichlet-integrale} 中 $x = 0$ 的情形。

::: def id=c7-def-cv-unif-integrale zh="含参广义积分的一致收敛" en="Uniform convergence of an improper integral depending on a parameter" fr="Convergence uniforme d'une intégrale généralisée à paramètre" ru="Равномерная сходимость несобственного интеграла, зависящего от параметра"
设 $f : A \times [a, +\infty[ \to \K$，对每个 $x \in A$，$f(x, \cdot)$ 分段连续，且 $\int_a^{+\infty}f(x, t)\,\dd t$ 收敛（可以是半收敛）。记余项 $R_c(x) = \int_c^{+\infty}f(x, t)\,\dd t$（$c \ge a$）。称这个积分**关于 $x \in A$ 一致收敛**，如果
$$\forall \eps > 0,\ \exists c_0 \ge a,\ \forall c \ge c_0,\ \forall x \in A,\qquad \abs{R_c(x)} \le \eps,$$
即 $\sup_{x \in A}\abs{R_c(x)} \to 0$（$c \to +\infty$）。
:::

::: fr
Soit $f : A \times [a, +\infty[ \to \K$ telle que, pour tout $x \in A$, $f(x, \cdot)$ soit continue par morceaux et $\int_a^{+\infty}f(x, t)\,\dd t$ converge (éventuellement semi-convergente). Notons $R_c(x) = \int_c^{+\infty}f(x, t)\,\dd t$ le reste ($c \ge a$). On dit que cette intégrale **converge uniformément par rapport à $x \in A$** si
$$\forall \eps > 0,\ \exists c_0 \ge a,\ \forall c \ge c_0,\ \forall x \in A,\qquad \abs{R_c(x)} \le \eps,$$
c'est-à-dire si $\sup_{x \in A}\abs{R_c(x)} \to 0$ quand $c \to +\infty$.
:::

白话：截断误差可以对所有参数**同时**变小。这与函数列的一致收敛（{@def-cv-unif}）完全平行：一致收敛等价于截断积分 $F_c(x) = \int_a^c f(x, t)\,\dd t$ 当 $c \to +\infty$ 时在 $A$ 上一致收敛到 $F$，因为 $F - F_c = R_c$。

::: ex id=c7-ex-cv-unif zh="一致收敛与非一致收敛" lvl=1
1. **一致收敛。** $\int_0^{+\infty}\e^{-xt}\,\dd t$，$A = [a, +\infty[$（$a > 0$）：$R_c(x) = \frac{\e^{-xc}}{x} \le \frac{\e^{-ac}}{a} \to 0$，上界与 $x$ 无关。
2. **不一致收敛。** 同一个积分，$A = ]0, +\infty[$：$R_c(x) = \frac{\e^{-xc}}{x} \to +\infty$（$x \to 0^{+}$），所以 $\sup_{x > 0}R_c(x) = +\infty$。
3. **半收敛、不一致收敛。** $\int_0^{+\infty}\frac{\sin(xt)}{t}\,\dd t$，$A = ]0, +\infty[$：换元 $u = xt$，$R_c(x) = \int_{cx}^{+\infty}\frac{\sin u}{u}\,\dd u$。$x \to 0^{+}$ 时 $cx \to 0$，$R_c(x) \to \int_0^{+\infty}\frac{\sin u}{u}\,\dd u = \frac\pi2$，所以对每个 $c$，$\sup_{x > 0}\abs{R_c(x)} \ge \frac\pi2$。
:::

::: prop id=c7-weierstrass-integrale zh="Weierstrass 判别法" en="Weierstrass M-test for integrals" fr="Critère de Weierstrass pour les intégrales" ru="Признак Вейерштрасса равномерной сходимости интеграла" lvl=1
若存在 $[a, +\infty[$ 上可积的 $\varphi$，使 $\abs{f(x, t)} \le \varphi(t)$ 对一切 $x \in A$、$t \ge a$ 成立（即控制条件），则对每个 $x$，$\int_a^{+\infty}f(x, t)\,\dd t$ 绝对收敛，并且关于 $x \in A$ 一致收敛。
:::

::: fr
S'il existe $\varphi$ intégrable sur $[a, +\infty[$ telle que $\abs{f(x, t)} \le \varphi(t)$ pour tous $x \in A$ et $t \ge a$ (hypothèse de domination), alors, pour tout $x$, $\int_a^{+\infty}f(x, t)\,\dd t$ est absolument convergente, et elle converge uniformément par rapport à $x \in A$.
:::

::: proof
▷ 思路：余项被 $\varphi$ 的余项控制，而后者与 $x$ 无关。

**第 1 步（绝对收敛）**　由比较定理 {@comparaison-integrales}，$\int_a^{+\infty}\abs{f(x, t)}\,\dd t$ 收敛。

**第 2 步（余项估计）**　对 $c \ge a$ 和 $x \in A$，由 {@integrable-convergente}，
$$\abs{R_c(x)} \le \int_c^{+\infty}\abs{f(x, t)}\,\dd t \le \int_c^{+\infty}\varphi(t)\,\dd t =: \rho(c).$$

**第 3 步（$\rho(c) \to 0$）**　$\int_a^{+\infty}\varphi$ 收敛，所以 $\rho(c) = \int_a^{+\infty}\varphi - \int_a^c\varphi \to 0$（$c \to +\infty$）。给定 $\eps > 0$，取 $c_0$ 使 $c \ge c_0$ 时 $\rho(c) \le \eps$（$\rho$ 递减），则对一切 $c \ge c_0$、$x \in A$，$\abs{R_c(x)} \le \eps$。这就是一致收敛。
:::

::: fr
▷ Méthode : le reste est majoré par le reste de $\varphi$, qui ne dépend pas de $x$.

**Étape 1 (convergence absolue)**　Par le théorème de comparaison {@fr:comparaison-integrales}, $\int_a^{+\infty}\abs{f(x, t)}\,\dd t$ converge.

**Étape 2 (majoration du reste)**　Pour $c \ge a$ et $x \in A$, d'après {@fr:integrable-convergente},
$$\abs{R_c(x)} \le \int_c^{+\infty}\abs{f(x, t)}\,\dd t \le \int_c^{+\infty}\varphi(t)\,\dd t =: \rho(c).$$

**Étape 3 ($\rho(c) \to 0$)**　Comme $\int_a^{+\infty}\varphi$ converge, $\rho(c) = \int_a^{+\infty}\varphi - \int_a^c\varphi \to 0$ quand $c \to +\infty$. Soit $\eps > 0$ ; choisissons $c_0$ tel que $\rho(c) \le \eps$ pour $c \ge c_0$ ($\rho$ est décroissante). Alors pour tous $c \ge c_0$ et $x \in A$, $\abs{R_c(x)} \le \eps$ : c'est la convergence uniforme.
:::

::: prop id=c7-continuite-unif zh="一致收敛下的连续性" en="Continuity under uniform convergence" fr="Continuité sous convergence uniforme" ru="Непрерывность равномерно сходящегося интеграла по параметру" lvl=1
设 $A$ 是区间，$f$ 在 $A \times [a, +\infty[$ 上连续，且 $\int_a^{+\infty}f(x, t)\,\dd t$ 在 $A$ 的每个闭区间上关于 $x$ 一致收敛。则 $F(x) = \int_a^{+\infty}f(x, t)\,\dd t$ 在 $A$ 上连续。
:::

::: fr
Soient $A$ un intervalle et $f$ continue sur $A \times [a, +\infty[$ telle que $\int_a^{+\infty}f(x, t)\,\dd t$ converge uniformément par rapport à $x$ sur tout segment de $A$. Alors $F(x) = \int_a^{+\infty}f(x, t)\,\dd t$ est continue sur $A$.
:::

::: proof
▷ 思路：$F$ 是截断积分 $F_n(x) = \int_a^{a+n}f(x, t)\,\dd t$ 的一致极限；$F_n$ 是闭区间上的含参积分，连续；连续函数的一致极限连续（{@cont-limite-unif}）。最后用引理 {@c7-suite-segment} 从闭区间回到 $A$。

**第 1 步（$F_n$ 连续）**　固定闭区间 $J \subset A$ 和 $n \ge 1$。$J \times [a, a + n]$ 是紧集，$f$ 在其上连续，从而有界（{@image-compact}、{@compact-ferme-borne}）：$\abs{f} \le K_n$。常数 $K_n$ 在有界区间 $[a, a + n]$ 上可积。由 {@continuite-parametre}，$F_n$ 在 $J$ 上连续。

**第 2 步（一致收敛）**　$F(x) - F_n(x) = R_{a+n}(x)$，所以 $\sup_{x \in J}\abs{F(x) - F_n(x)} = \sup_{x \in J}\abs{R_{a+n}(x)} \to 0$（在 $J$ 上一致收敛）。

**第 3 步（$F|_J$ 连续）**　由第 1、2 步和 {@cont-limite-unif}，$F|_J$ 在 $J$ 上连续。

**第 4 步（回到 $A$）**　设 $x_0 \in A$，$(y_k)$ 是 $A$ 中趋于 $x_0$ 的数列。由引理 {@c7-suite-segment}，存在闭区间 $J \subset A$ 包含 $x_0$ 和所有 $y_k$。由第 3 步，$F(y_k) \to F(x_0)$。由 {@carac-seq-cont}，$F$ 在 $x_0$ 处连续。
:::

::: fr
▷ Méthode : $F$ est limite uniforme des intégrales tronquées $F_n(x) = \int_a^{a+n}f(x, t)\,\dd t$ ; $F_n$ est une intégrale à paramètre sur un segment, donc continue ; une limite uniforme de fonctions continues est continue ({@fr:cont-limite-unif}). On revient enfin des segments à $A$ grâce au {@fr:c7-suite-segment}.

**Étape 1 ($F_n$ est continue)**　Soient $J \subset A$ un segment et $n \ge 1$. L'ensemble $J \times [a, a + n]$ est compact et $f$ y est continue, donc bornée ({@fr:image-compact}, {@fr:compact-ferme-borne}) : $\abs{f} \le K_n$. La constante $K_n$ est intégrable sur l'intervalle borné $[a, a + n]$. D'après {@fr:continuite-parametre}, $F_n$ est continue sur $J$.

**Étape 2 (convergence uniforme)**　On a $F(x) - F_n(x) = R_{a+n}(x)$, donc $\sup_{x \in J}\abs{F(x) - F_n(x)} = \sup_{x \in J}\abs{R_{a+n}(x)} \to 0$ (convergence uniforme sur $J$).

**Étape 3 ($F|_J$ est continue)**　D'après les étapes 1, 2 et {@fr:cont-limite-unif}, $F|_J$ est continue sur $J$.

**Étape 4 (retour à $A$)**　Soient $x_0 \in A$ et $(y_k)$ une suite de $A$ qui tend vers $x_0$. D'après le {@fr:c7-suite-segment}, il existe un segment $J \subset A$ contenant $x_0$ et tous les $y_k$. D'après l'étape 3, $F(y_k) \to F(x_0)$. D'après {@fr:carac-seq-cont}, $F$ est continue en $x_0$.
:::

::: ex id=c7-dirichlet-unif zh="Dirichlet 积分的一致收敛" lvl=1
$\int_0^{+\infty}\e^{-xt}\frac{\sin t}{t}\,\dd t$ 关于 $x \in [0, +\infty[$ 一致收敛：对 $c > 0$、$x \ge 0$，$\abs{R_c(x)} \le \frac2c$。

固定 $x \ge 0$ 和 $B > c > 0$。$w(t) = \frac{\e^{-xt}}{t}$ 在 $[c, B]$ 上是 $\Cc^1$ 的，$w > 0$，$w'(t) = -\frac{(1 + xt)\e^{-xt}}{t^2} < 0$。在闭区间上分部积分（$\sin t = (-\cos t)'$）：
$$\int_c^B w(t)\sin t\,\dd t = \big[-w(t)\cos t\big]_c^B + \int_c^B w'(t)\cos t\,\dd t.$$

- 边界项：$\abs{w(c)\cos c - w(B)\cos B} \le w(c) + w(B)$。
- 积分项：$\big|\int_c^B w'\cos\big| \le \int_c^B\abs{w'} = -\int_c^B w' = w(c) - w(B)$（$w' < 0$）。

相加：$\big|\int_c^B w(t)\sin t\,\dd t\big| \le 2w(c) \le \frac2c$。令 $B \to +\infty$（积分收敛，{@dirichlet-integrale} 证明第 1 步），$\abs{R_c(x)} \le \frac2c$，与 $x$ 无关。

把 $t \mapsto \frac{\sin t}{t}$ 在 $0$ 处延拓为 $1$，$f(x, t) = \e^{-xt}\frac{\sin t}{t}$ 在 $[0, +\infty[ \times [0, +\infty[$ 上连续。由 {@c7-continuite-unif}，$F$ 在 $[0, +\infty[$ 上连续——这是 {@dirichlet-integrale} 第 6 步的另一个证明，不需要分部积分改写。注意这里**没有**控制函数（{@dirichlet-integrale} 之后的注），一致收敛处理的正是这种半收敛的情形。
:::

::: rem zh="另一种体系"
不使用 Lebesgue 理论时，苏联和中国教材这样处理含参广义积分 $\int_a^{+\infty}f(x, t)\,\dd t$：要求它关于 $x \in A$ **一致收敛**（{@c7-def-cv-unif-integrale}）。判别法有 Weierstrass 判别法（存在可积的控制函数，这与控制条件相同，{@c7-weierstrass-integrale}）、Abel 判别法、Dirichlet 判别法（后两者对应 {@dirichlet-series} 型的估计，{@c7-dirichlet-unif} 就是一例）。连续性、积分交换、求导三个定理在一致收敛（求导时要求导数的积分一致收敛）的假设下成立，证明只需要 {@double-limite} 和 {@derivation-suite}；连续性见 {@c7-continuite-unif}。{@dirichlet-integrale} 中 $x = 0$ 处的情形就是一个例子：Dirichlet 型估计给出一致收敛，而控制收敛不能直接用。

两种方法各有长处：控制收敛的条件容易验证（只需一个不等式），而一致收敛能处理条件收敛的积分。L3 学习 Lebesgue 积分之后，控制收敛方法是标准工具。
:::

::: q
$\int_0^{+\infty}\frac{\sin(xt)}{t}\,\dd t$ 在 $[a, +\infty[$（$a > 0$）上一致收敛吗？与 {@c7-ex-cv-unif} 第 3 条比较。
:::

::: ans
一致收敛。换元 $u = xt$：$R_c(x) = \int_{cx}^{+\infty}\frac{\sin u}{u}\,\dd u$。{@c7-dirichlet-unif} 取 $x = 0$ 给出：对 $s > 0$，$\big|\int_s^{+\infty}\frac{\sin u}{u}\,\dd u\big| \le \frac2s$。所以对 $x \ge a$，$\abs{R_c(x)} \le \frac{2}{cx} \le \frac{2}{ca} \to 0$，与 $x$ 无关。在 $]0, +\infty[$ 上不一致收敛，问题完全出在 $x \to 0^{+}$；这与 $F(x) = \frac\pi2\operatorname{sgn}(x)$ 在 $]0, +\infty[$ 上连续、在 $0$ 处跳跃相符。
:::

## 方法总结

### 如何证明 $F(x) = \int_I f(x, t)\,\dd t$ 连续

1. 写清参数集 $A$ 与积分区间 $I$，验证 $f(\cdot, t)$ 连续、$f(x, \cdot)$ 分段连续（{@continuite-parametre} 的条件 1、2）。
2. 固定 $t$，求出或估计 $\sup_{x \in J}\abs{f(x, t)}$，$J$ 取 $A$ 的闭区间或 $[a, +\infty[$ 这类「远离坏点」的子区间；若它被一个可积函数压住，这就是控制函数（{@c7-def-domination}）。
3. 全局控制不存在时，改用局部控制（{@c7-domination-locale}）。对 $t^{x-1}$ 型的因子，在 $t \le 1$ 与 $t > 1$ 上分别用区间的左、右端点（{@gamma-regularite} 第 3 步）。
4. 坏点处被积函数只是半收敛时：分部积分化为绝对收敛的积分（{@dirichlet-integrale} 第 5 步），或者证明一致收敛（{@c7-continuite-unif}、{@c7-dirichlet-unif}）。

### 如何证明 $F$ 可导、是 $\Cc^k$ 的

1. 控制的是 $\frac{\partial f}{\partial x}$（或最高阶 $\frac{\partial^k f}{\partial x^k}$），不是 $f$；低阶偏导数只需可积（{@derivation-parametre}、{@derivation-ck}）。
2. 最常用的控制：$x \ge a > 0$ 时 $\e^{-xt} \le \e^{-at}$（{@c7-ex-moments}、{@dirichlet-integrale}）。
3. 写出 $F'$ 后，常常可以再用分部积分把 $F'$ 化回 $F$，得到微分方程（{@fourier-gaussienne}）。

### 如何用含参积分计算一个积分

1. 引入参数，使 $F'$ 能算出来：收敛因子 $\e^{-xt}$（{@dirichlet-integrale}），把常数换成参数（{@c7-ex-ln}），或者构造导数互相抵消的两个函数（{@gauss}）。
2. 解出 $F$ 后，用一个特殊值（$F(0)$）或一个极限（$x \to +\infty$，用 {@limite-parametre} 或直接估计）定出常数。
3. 端点处若需要连续性，单独证明（{@dirichlet-integrale} 第 6 步）。

### 如何求极限或渐近等价

1. 参数只在被积函数里：直接用 {@limite-parametre}（{@c7-ex-wallis-limite}、{@c7-ex-continuite}）。
2. 被积函数集中在随参数移动的区域：先换元把峰放到固定位置和尺度，再控制（Laplace 方法，{@stirling-gamma}）。

### 如何交换积分次序

1. 闭矩形上的连续函数：{@fubini-segment}。
2. 无界区间或无界函数：需要绝对可积性（第 11 章）；否则两个累次积分可能不同（{@c7-cex-fubini-integrales}）。

### 如何证明 $F$ 不连续或不可导

1. 直接算出 $F$（{@c7-cex-continuite}、{@c7-cex-derivation}、第 2 节第二个「想一想」）。
2. 控制函数不存在**不等于**结论不成立（第 1 节第二个「想一想」）：要否定结论，必须真的算出来或估计出来。

::: rem zh="常见错误"
1. **控制函数依赖于参数。**「$\abs{\e^{-xt}\sin t} \le \e^{-xt}$，可积」不是控制：右边依赖于 $x$。必须找 $\sup_x$ 的上界，例如 $x \ge a$ 时 $\le \e^{-at}$。
2. **局部与全局搞混。** 连续性、可导性是局部性质，在 $]0, +\infty[$ 上找不到全局控制不要紧，在每个 $[a, b]$ 上控制即可（{@c7-domination-locale}）。但求 $x \to 0^{+}$ 的**极限**或证明 $F$ 在 $0$ 处连续时，需要的恰恰是 $0$ 附近的控制，局部控制在 $]0, +\infty[$ 的闭区间上帮不了忙（{@c7-cex-continuite}）。
3. **只控制 $f$ 就求导。** {@c7-cex-derivation} 中 $f$ 被 $\min(\frac{x^2}{2}, \frac{2}{t^2})$ 很好地控制，$F = C\abs{x}$ 却在 $0$ 处不可导。
4. **随意交换累次积分。** {@c7-cex-fubini-integrales}：两个次序分别得到 $\frac\pi4$ 和 $-\frac\pi4$。
:::

::: read
- Г. М. Фихтенгольц,《Курс дифференциального и интегрального исчисления》，том II：интегралы, зависящие от параметра; равномерная сходимость интегралов; эйлеровы интегралы。一致收敛体系最全面的经典论述，例子极多，Euler 积分（Γ、B）部分尤其详细。
- В. А. Зорич,《Математический анализ》，часть II：собственные и несобственные интегралы, зависящие от параметра; эйлеровы интегралы; асимптотика интегралов (метод Лапласа)。把一致收敛方法与 Laplace 渐近方法放在一起讲，适合读完本章后对照。
- Б. П. Демидович,《Сборник задач и упражнений по математическому анализу》：интегралы, зависящие от параметра。大量计算题：用积分号下求导算积分、判别一致收敛，适合练手。
- М. В. Федорюк,《Асимптотика: интегралы и ряды》：метод Лапласа, метод перевала。Laplace 方法与鞍点法的专著，适合想深入渐近分析的读者。
- X. Gourdon,《Les maths en tête : Analyse》：intégrales à paramètre, fonction Γ。法国 MP 备考的标准参考书，定理陈述与本章一致（控制收敛体系），习题有代表性。
- E. Artin,《The Gamma Function》：Bohr–Mollerup theorem, log-convexity。一本小书，从对数凸出发推出 Γ 的全部经典性质，{@bohr-mollerup} 的思路来源。
:::

::: glossary
| 中文 | Français | English | Русский |
|---|---|---|---|
| 含参变量积分 | intégrale à paramètre (f.) | integral depending on a parameter | интеграл, зависящий от параметра |
| 参数 | paramètre (m.) | parameter | параметр |
| 积分变量 | variable d'intégration (f.) | variable of integration | переменная интегрирования |
| 控制条件 | hypothèse de domination (f.) | domination hypothesis | условие мажорирования |
| 控制函数 | fonction dominante (f.) | dominating function | интегрируемая мажоранта |
| 在每个闭区间上控制 | domination sur tout segment (f.) | domination on every compact interval | мажорирование на каждом отрезке |
| 控制收敛定理 | théorème de convergence dominée (m.) | dominated convergence theorem | теорема Лебега о мажорированной сходимости |
| 分段连续 | continue par morceaux | piecewise continuous | кусочно-непрерывная |
| 可积函数 | fonction intégrable (f.) | integrable function | абсолютно интегрируемая функция |
| 逐点收敛 | convergence simple (f.) | pointwise convergence | поточечная сходимость |
| 极限的序列刻画 | caractérisation séquentielle de la limite (f.) | sequential characterization of limits | определение предела по Гейне |
| 附着点 | point adhérent (m.) | adherent point | точка прикосновения |
| 闭区间 | segment (m.) | compact interval | отрезок |
| 积分号下取极限 | passage à la limite sous le signe intégrale (m.) | passing to the limit under the integral sign | предельный переход под знаком интеграла |
| 取极限 | passer à la limite | pass to the limit | перейти к пределу |
| 积分号下求导 | dérivation sous le signe intégrale (f.) | differentiation under the integral sign | дифференцирование под знаком интеграла |
| Leibniz 公式 | formule de Leibniz (f.) | Leibniz integral rule | правило Лейбница |
| 偏导数 | dérivée partielle (f.) | partial derivative | частная производная |
| 差商 | taux d'accroissement (m.) | difference quotient | разностное отношение |
| 有限增量不等式 | inégalité des accroissements finis (f.) | mean value inequality | неравенство конечных приращений |
| 交换积分次序 | intervertir l'ordre d'intégration | interchange the order of integration | изменить порядок интегрирования |
| 累次积分 | intégrale itérée (f.) | iterated integral | повторный интеграл |
| Fubini 定理 | théorème de Fubini (m.) | Fubini's theorem | теорема Фубини |
| Γ 函数 | fonction Gamma (f.) | Gamma function | гамма-функция |
| 函数方程 | équation fonctionnelle (f.) | functional equation | функциональное уравнение |
| 凸函数 | fonction convexe (f.) | convex function | выпуклая функция |
| 对数凸 | log-convexe | logarithmically convex | логарифмически выпуклая |
| 三弦引理 | lemme des trois cordes (m.) | three-chord lemma | лемма о трёх хордах |
| Bohr–Mollerup 定理 | théorème de Bohr–Mollerup (m.) | Bohr–Mollerup theorem | теорема Бора — Моллерупа |
| Gauss 公式（Γ 的极限表示） | formule de Gauss (f.) | Gauss's limit formula | формула Эйлера — Гаусса |
| 余元公式 | formule des compléments (f.) | reflection formula | формула дополнения |
| Gauss 积分 | intégrale de Gauss (f.) | Gaussian integral | интеграл Эйлера — Пуассона |
| Dirichlet 积分 | intégrale de Dirichlet (f.) | Dirichlet integral | интеграл Дирихле |
| 半收敛（条件收敛） | semi-convergente | conditionally convergent | условно сходящийся |
| Fourier 变换 | transformée de Fourier (f.) | Fourier transform | преобразование Фурье |
| Stirling 公式 | formule de Stirling (f.) | Stirling's formula | формула Стирлинга |
| Laplace 方法 | méthode de Laplace (f.) | Laplace's method | метод Лапласа |
| 渐近等价 | équivalent (m.) | asymptotically equivalent | асимптотически эквивалентный |
| 含参积分的一致收敛 | convergence uniforme (f.) | uniform convergence | равномерная сходимость |
| 余项 | reste (m.) | remainder | остаток |
| Weierstrass 判别法 | critère de Weierstrass (m.) | Weierstrass M-test | признак Вейерштрасса |
| 分部积分 | intégration par parties (f.) | integration by parts | интегрирование по частям |
| 变量替换 | changement de variable (m.) | change of variable | замена переменной |
| 判别式 | discriminant (m.) | discriminant | дискриминант |
:::
