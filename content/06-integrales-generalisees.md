L1 的 Riemann 积分只处理闭区间上的有界函数。本章把积分推广到任意区间（$\left]0, 1\right]$、$[0, +\infty[$、$\R$ 等）上的分段连续函数，这就是广义积分（反常积分）。法国 MP 大纲在这里做了一个重要的选择：**陈述 Lebesgue 的控制收敛定理和逐项积分定理，但不证明**，把证明留到 L3 的测度论。本网页同样处理，这两个定理标为 ★★★。全章 $I$ 是区间，函数分段连续，取值于 $\K$。

本章的路线：先定义收敛并给出最基本的性质（§1）；对非负函数，收敛问题完全归结为比较（§2）；对变号函数，先看绝对收敛，不行再用分部积分或 Abel 判别法（§3）；计算积分的两个工具是分部积分和变量替换（§4）；最后是交换极限与积分的两个「已承认」的定理（§5）。与第 2 章的级数对照着读，几乎每个结论都有级数版本，但也有重要的差别（例如 $\int_a^{+\infty} f$ 收敛**不**蕴含 $f \to 0$）。

## 广义积分的收敛

$\int_0^1 \frac{\dd t}{\sqrt t}$、$\int_1^{+\infty}\frac{\dd t}{t^2}$ 这样的积分在 L1 的意义下没有定义：前者的被积函数无界，后者的区间无界。自然的办法是先在闭子区间上积分，再让端点趋于「有问题的」端点。本节给出定义，说明它与 Riemann 积分相容，并给出判断收敛的 Cauchy 准则。

::: def id=c6-def-cpm-intervalle zh="区间上的分段连续函数" en="Piecewise continuous function on an interval" fr="Fonction continue par morceaux sur un intervalle" ru="Кусочно-непрерывная функция на промежутке"
设 $I$ 是 $\R$ 的区间（不退化为一点），$f : I \to \K$。称 $f$ 在 $I$ 上**分段连续**，如果它在 $I$ 的每个闭子区间上分段连续：
$$\begin{aligned}&\forall [c, d] \subset I,\ \exists\, c = s_0 < s_1 < \cdots < s_q = d,\ \forall j \in \{1, \dots, q\},\\ &\qquad f\big|_{]s_{j-1}, s_j[}\ \text{连续，且在 } s_{j-1}^+,\ s_j^-\ \text{处有有限极限}.\end{aligned}$$
白话：在 $I$ 的每个有界闭子区间上只有有限个跳跃；但在 $I$ 的开端点附近，$f$ 可以无界、可以振荡，跳跃点也可以有无穷多个（只要它们不在 $I$ 内部聚集）。
:::

::: fr
Soit $I$ un intervalle de $\R$ non réduit à un point et $f : I \to \K$. On dit que $f$ est **continue par morceaux sur $I$** si elle est continue par morceaux sur tout segment inclus dans $I$ :
$$\begin{aligned}&\forall [c, d] \subset I,\ \exists\, c = s_0 < s_1 < \cdots < s_q = d,\ \forall j \in \{1, \dots, q\},\\ &\qquad f\big|_{]s_{j-1}, s_j[}\ \text{est continue et admet des limites finies en } s_{j-1}^+,\ s_j^-.\end{aligned}$$
Autrement dit, sur chaque segment de $I$ il n'y a qu'un nombre fini de sauts ; mais au voisinage d'une extrémité ouverte de $I$, $f$ peut être non bornée, osciller, et avoir une infinité de points de discontinuité (pourvu qu'ils ne s'accumulent pas à l'intérieur de $I$).
:::

::: ex id=c6-ex-cpm lvl=1
1. $f(t) = \frac1t$ 在 $]0, 1]$ 上连续，因而分段连续；但无论 $f(0)$ 取何值，它在 $[0, 1]$ 上都不是分段连续的：$0^+$ 处没有有限极限。
2. $g(t) = \sin\frac1t$ 在 $]0, 1]$ 上连续，因而分段连续；它在 $0^+$ 处振荡。
3. $h(t) = E\big(\frac1t\big)$（$E$ 为整数部分）在 $]0, 1]$ 上分段连续：在每个 $[c, 1]$（$0 < c \le 1$）上，它只在有限个点 $\frac1k$（$1 \le k \le \frac1c$）处跳跃，在相邻两个跳跃点之间是常数。跳跃点 $\frac1k$ 在 $0$ 处聚集，但 $0 \notin\, ]0, 1]$。
4. **非例子**：$\mathbf{1}_\Q$ 在任何区间上都不是分段连续的，因为它在每一点都不连续，而分段连续函数在每个闭子区间上只有有限个间断点。
:::

::: def id=def-integrale-generalisee zh="广义积分的收敛" en="Convergent improper integral" fr="Intégrale généralisée convergente" ru="Сходящийся несобственный интеграл"
设 $-\infty < a < b \le +\infty$，$f$ 在 $[a, b[$ 上分段连续。若极限
$$\lim_{x \to b^-}\int_a^x f(t)\,\dd t$$
存在且**有限**，称广义积分 $\int_a^b f$ **收敛**，并以此极限为其值；否则称它**发散**。量词形式：$\int_a^b f$ 收敛于 $\ell \in \K$，当且仅当
$$\forall \eps > 0,\ \exists A \in [a, b[,\ \forall x \in [A, b[,\quad \Big|\int_a^x f - \ell\Big| < \eps.$$
对 $]a, b]$（$-\infty \le a < b < +\infty$）同理，取 $x \to a^+$。对 $]a, b[$（$-\infty \le a < b \le +\infty$），取 $c \in\, ]a, b[$，要求 $\int_a^c f$ 与 $\int_c^b f$ **分别**收敛，并令 $\int_a^b f = \int_a^c f + \int_c^b f$（与 $c$ 无关，见 {@c6-coherence}）。

白话：先在闭子区间上积分，再让端点趋于「有问题的」端点。两个端点都有问题时，两端必须**各自独立地**取极限。
:::

::: fr
Soit $-\infty < a < b \le +\infty$ et $f$ continue par morceaux sur $[a, b[$. Si la limite
$$\lim_{x \to b^-}\int_a^x f(t)\,\dd t$$
existe et est **finie**, on dit que l'intégrale généralisée $\int_a^b f$ **converge**, et sa valeur est cette limite ; sinon, on dit qu'elle **diverge**. Avec des quantificateurs : $\int_a^b f$ converge vers $\ell \in \K$ si et seulement si
$$\forall \eps > 0,\ \exists A \in [a, b[,\ \forall x \in [A, b[,\quad \Big|\int_a^x f - \ell\Big| < \eps.$$
On procède de même sur $]a, b]$ ($-\infty \le a < b < +\infty$) en faisant $x \to a^+$. Sur $]a, b[$ ($-\infty \le a < b \le +\infty$), on choisit $c \in\, ]a, b[$ et on exige que $\int_a^c f$ et $\int_c^b f$ convergent **toutes les deux** ; on pose alors $\int_a^b f = \int_a^c f + \int_c^b f$ (ce qui ne dépend pas de $c$, cf. {@fr:c6-coherence}).

Autrement dit, on intègre d'abord sur un segment, puis on fait tendre la borne vers l'extrémité « impropre ». Lorsque les deux extrémités sont impropres, les deux passages à la limite doivent se faire **indépendamment**.
:::

::: ex id=riemann-integrales zh="Riemann 积分（参考积分）" lvl=1
$$\int_1^{+\infty}\frac{\dd t}{t^\alpha}\ \text{收敛} \iff \alpha > 1,\qquad \int_0^1\frac{\dd t}{t^\alpha}\ \text{收敛} \iff \alpha < 1,\qquad \int_0^{+\infty}\e^{-\lambda t}\,\dd t = \frac1\lambda\ (\lambda > 0).$$
直接计算原函数即得：

1. **$[1, +\infty[$。** 对 $\alpha \ne 1$，$\int_1^x t^{-\alpha}\,\dd t = \frac{x^{1-\alpha} - 1}{1 - \alpha}$。$x \to +\infty$ 时，若 $\alpha > 1$，$x^{1-\alpha} \to 0$，积分 $\to \frac{1}{\alpha - 1}$；若 $\alpha < 1$，$x^{1-\alpha} \to +\infty$，发散。$\alpha = 1$ 时 $\int_1^x \frac{\dd t}{t} = \ln x \to +\infty$，发散。
2. **$]0, 1]$。** 对 $\alpha \ne 1$，$\int_x^1 t^{-\alpha}\,\dd t = \frac{1 - x^{1-\alpha}}{1 - \alpha}$。$x \to 0^+$ 时，若 $\alpha < 1$，$x^{1-\alpha} \to 0$，积分 $\to \frac{1}{1 - \alpha}$；若 $\alpha > 1$，$x^{1-\alpha} \to +\infty$，发散。$\alpha = 1$ 时 $\int_x^1\frac{\dd t}{t} = -\ln x \to +\infty$，发散。
3. **指数。** $\int_0^x \e^{-\lambda t}\,\dd t = \frac{1 - \e^{-\lambda x}}{\lambda} \to \frac1\lambda$（$\lambda > 0$）。$\lambda = 0$ 时积分为 $x$，$\lambda < 0$ 时为 $\frac{\e^{\abs\lambda x} - 1}{\abs\lambda}$，都发散。
4. **对数。** $\int_x^1\ln t\,\dd t = \big[t\ln t - t\big]_x^1 = -1 - x\ln x + x \to -1$（$x \to 0^+$，因为 $x\ln x \to 0$）。所以 $\int_0^1\ln t\,\dd t = -1$ 收敛，尽管 $\ln t \to -\infty$。
5. **两端都有问题。** $\int_0^{+\infty}\frac{\dd t}{t^\alpha}$ 对**任何** $\alpha$ 都发散：按定义要求 $\int_0^1$ 与 $\int_1^{+\infty}$ 都收敛，即 $\alpha < 1$ 且 $\alpha > 1$，不可能。
:::

::: cex lvl=1
$\int_{-\infty}^{+\infty} t\,\dd t$ 发散，尽管 $\int_{-x}^{x} t\,\dd t = 0$ 对一切 $x$ 成立。按定义，要求 $\int_0^{+\infty} t\,\dd t$ 收敛，但 $\int_0^x t\,\dd t = \frac{x^2}{2} \to +\infty$。对称截断的极限 $\lim_{x \to +\infty}\int_{-x}^x f$ 称为 **Cauchy 主值**，它不是广义积分：两端没有各自独立地取极限。
:::

::: prop id=c6-coherence zh="定义的相容性" en="Consistency of the definition" fr="Cohérence de la définition" ru="Согласованность определения" lvl=1
1. 若 $b < +\infty$ 且 $f$ 在闭区间 $[a, b]$ 上分段连续，则广义积分 $\int_a^b f$（视为 $[a, b[$ 上的）收敛，其值等于 Riemann 积分。
2. 设 $f$ 在 $[a, b[$ 上分段连续，$c \in [a, b[$。则 $\int_a^b f$ 收敛 $\iff$ $\int_c^b f$ 收敛，且此时 $\int_a^b f = \int_a^c f + \int_c^b f$。
3. 在 $]a, b[$ 的定义中，收敛性与积分值都与 $c$ 的选取无关。
:::

::: fr
1. Si $b < +\infty$ et si $f$ est continue par morceaux sur le segment $[a, b]$, l'intégrale généralisée $\int_a^b f$ (vue sur $[a, b[$) converge et sa valeur est l'intégrale de Riemann.
2. Soit $f$ continue par morceaux sur $[a, b[$ et $c \in [a, b[$. Alors $\int_a^b f$ converge $\iff$ $\int_c^b f$ converge, et dans ce cas $\int_a^b f = \int_a^c f + \int_c^b f$.
3. Dans la définition sur $]a, b[$, la convergence et la valeur ne dépendent pas du choix de $c$.
:::

::: proof
▷ 思路：1 用「积分上限函数是 Lipschitz 的」；2、3 都是 Chasles 关系：去掉一个闭区间上的积分只改变一个常数。

**1.**　记 $F(x) = \int_a^x f$（Riemann 积分，$x \in [a, b]$），$M = \sup_{[a,b]}\abs f$（闭区间上的分段连续函数有界）。对 $x \in [a, b[$，
$$\abs{F(b) - F(x)} = \Big|\int_x^b f\Big| \le M(b - x) \xrightarrow[x \to b^{-}]{} 0.$$
所以 $\lim_{x \to b^-}F(x) = F(b)$。

**2.**　对 $x \in [c, b[$，由 Chasles 关系，$\int_a^x f = \int_a^c f + \int_c^x f$，其中 $\int_a^c f$ 是与 $x$ 无关的常数（闭区间上的 Riemann 积分）。所以当 $x \to b^-$ 时，一边有有限极限当且仅当另一边有，且两个极限相差 $\int_a^c f$。

**3.**　设 $c < c'$ 都在 $]a, b[$ 中。由 2（以 $c$ 为起点），$\int_c^b f$ 收敛 $\iff$ $\int_{c'}^b f$ 收敛，且 $\int_c^b f = \int_c^{c'} f + \int_{c'}^b f$。把 2 用于 $a$ 端（$x \to a^+$，论证相同），$\int_a^{c'} f$ 收敛 $\iff$ $\int_a^c f$ 收敛，且 $\int_a^{c'} f = \int_a^c f + \int_c^{c'} f$。于是
$$\int_a^{c'} f + \int_{c'}^b f = \int_a^c f + \int_c^{c'} f + \int_{c'}^b f = \int_a^c f + \int_c^b f.$$
:::

::: fr
▷ Méthode : pour 1, la fonction « intégrale fonction de sa borne supérieure » est lipschitzienne ; 2 et 3 reposent sur la relation de Chasles : retirer l'intégrale sur un segment ne change qu'une constante.

**1.**　Notons $F(x) = \int_a^x f$ (intégrale de Riemann, $x \in [a, b]$) et $M = \sup_{[a,b]}\abs f$ (une fonction continue par morceaux sur un segment est bornée). Pour $x \in [a, b[$,
$$\abs{F(b) - F(x)} = \Big|\int_x^b f\Big| \le M(b - x) \xrightarrow[x \to b^{-}]{} 0.$$
Donc $\lim_{x \to b^-}F(x) = F(b)$.

**2.**　Pour $x \in [c, b[$, la relation de Chasles donne $\int_a^x f = \int_a^c f + \int_c^x f$, où $\int_a^c f$ est une constante indépendante de $x$ (intégrale de Riemann sur un segment). Quand $x \to b^-$, un membre a une limite finie si et seulement si l'autre en a une, et les limites diffèrent de $\int_a^c f$.

**3.**　Soient $c < c'$ dans $]a, b[$. D'après 2 (avec $c$ pour origine), $\int_c^b f$ converge $\iff$ $\int_{c'}^b f$ converge, et $\int_c^b f = \int_c^{c'} f + \int_{c'}^b f$. Le même argument du côté de $a$ ($x \to a^+$) montre que $\int_a^{c'} f$ converge $\iff$ $\int_a^c f$ converge, et $\int_a^{c'} f = \int_a^c f + \int_c^{c'} f$. Ainsi
$$\int_a^{c'} f + \int_{c'}^b f = \int_a^c f + \int_c^{c'} f + \int_{c'}^b f = \int_a^c f + \int_c^b f.$$
:::

::: prop id=c6-proprietes zh="收敛积分的运算性质" en="Properties of convergent integrals" fr="Propriétés des intégrales convergentes" ru="Свойства сходящихся несобственных интегралов" lvl=1
设 $I$ 是区间，$f, g, h$ 在 $I$ 上分段连续，$\int_I f$ 与 $\int_I g$ 收敛，$\lambda \in \K$。

1. （线性）$\int_I (f + \lambda g)$ 收敛，且 $\int_I (f + \lambda g) = \int_I f + \lambda\int_I g$。
2. （单调性）若 $\K = \R$ 且 $f \le g$ 在 $I$ 上成立，则 $\int_I f \le \int_I g$；特别地，$f \ge 0 \Rightarrow \int_I f \ge 0$。
3. （收敛 + 发散 = 发散）若 $\int_I h$ 发散，则 $\int_I(f + h)$ 发散。
4. （严格正性）若 $f$ 在 $I$ 上连续、非负，且 $\int_I f = 0$，则 $f = 0$ 在 $I$ 上成立。
:::

::: fr
Soit $I$ un intervalle, $f, g, h$ continues par morceaux sur $I$, avec $\int_I f$ et $\int_I g$ convergentes, et $\lambda \in \K$.

1. (Linéarité) $\int_I (f + \lambda g)$ converge et $\int_I (f + \lambda g) = \int_I f + \lambda\int_I g$.
2. (Croissance) Si $\K = \R$ et $f \le g$ sur $I$, alors $\int_I f \le \int_I g$ ; en particulier $f \ge 0 \Rightarrow \int_I f \ge 0$.
3. (Convergente + divergente = divergente) Si $\int_I h$ diverge, alors $\int_I(f + h)$ diverge.
4. (Stricte positivité) Si $f$ est continue et positive sur $I$ et si $\int_I f = 0$, alors $f = 0$ sur $I$.
:::

::: proof
▷ 思路：1、2 是闭区间上相应性质取极限；3 由 1 反证；4 用连续性在某点附近得到一块正的面积。对 $]a, b[$ 型区间，在某个 $c$ 处分开，分别处理两个半开区间（{@c6-coherence}），下面只写 $I = [a, b[$ 的情形。

**1.**　对 $x \in [a, b[$，$\int_a^x(f + \lambda g) = \int_a^x f + \lambda\int_a^x g$（闭区间上的线性）。右边当 $x \to b^-$ 时有有限极限 $\int_I f + \lambda\int_I g$，所以左边也有。

**2.**　对 $x \in [a, b[$，$\int_a^x f \le \int_a^x g$（闭区间上的单调性）。令 $x \to b^-$，大小关系在极限中保持（不等式取极限）。

**3.**　反设 $\int_I(f + h)$ 收敛。由 1（取 $\lambda = -1$），$\int_I h = \int_I\big((f + h) - f\big)$ 收敛，矛盾。

**4.**　反设存在 $x_0 \in I$ 使 $f(x_0) = m > 0$。由连续性，存在 $I$ 的闭子区间 $J = [\alpha, \beta]$（$\alpha < \beta$，$x_0 \in J$），在 $J$ 上 $f \ge \frac m2$。由 Chasles 关系与 2（$f \ge 0$），$\int_I f \ge \int_\alpha^\beta f \ge \frac m2(\beta - \alpha) > 0$，矛盾。
:::

::: fr
▷ Méthode : 1 et 2 s'obtiennent par passage à la limite à partir des propriétés sur un segment ; 3 se déduit de 1 par l'absurde ; pour 4, la continuité fournit une « aire » strictement positive au voisinage d'un point. Pour un intervalle $]a, b[$, on coupe en un point $c$ et on traite séparément les deux intervalles semi-ouverts ({@fr:c6-coherence}) ; on écrit seulement le cas $I = [a, b[$.

**1.**　Pour $x \in [a, b[$, $\int_a^x(f + \lambda g) = \int_a^x f + \lambda\int_a^x g$ (linéarité sur un segment). Le membre de droite a une limite finie $\int_I f + \lambda\int_I g$ quand $x \to b^-$, donc le membre de gauche aussi.

**2.**　Pour $x \in [a, b[$, $\int_a^x f \le \int_a^x g$ (croissance sur un segment). On passe à la limite $x \to b^-$ dans l'inégalité.

**3.**　Par l'absurde, supposons que $\int_I(f + h)$ converge. D'après 1 (avec $\lambda = -1$), $\int_I h = \int_I\big((f + h) - f\big)$ converge, contradiction.

**4.**　Par l'absurde, supposons qu'il existe $x_0 \in I$ avec $f(x_0) = m > 0$. Par continuité, il existe un segment $J = [\alpha, \beta] \subset I$ ($\alpha < \beta$, $x_0 \in J$) sur lequel $f \ge \frac m2$. Par la relation de Chasles et le point 2 ($f \ge 0$), $\int_I f \ge \int_\alpha^\beta f \ge \frac m2(\beta - \alpha) > 0$, contradiction.
:::

::: prop id=cauchy-integrale zh="广义积分的 Cauchy 准则" en="Cauchy criterion for improper integrals" fr="Critère de Cauchy pour les intégrales" ru="Критерий Коши сходимости несобственного интеграла" lvl=1
设 $f$ 在 $[a, b[$ 上分段连续（$b \le +\infty$）。$\int_a^b f$ 收敛，当且仅当
$$\forall \eps > 0,\ \exists c \in [a, b[,\ \forall x, y \in [c, b[,\quad \Big|\int_x^y f\Big| < \eps.$$
:::

::: fr
Soit $f$ continue par morceaux sur $[a, b[$ ($b \le +\infty$). L'intégrale $\int_a^b f$ converge si et seulement si
$$\forall \eps > 0,\ \exists c \in [a, b[,\ \forall x, y \in [c, b[,\quad \Big|\int_x^y f\Big| < \eps.$$
:::

::: proof
▷ 思路：这是函数 $F(x) = \int_a^x f$ 在 $b^-$ 处有极限的 Cauchy 准则。(⇒) 用三角不等式；(⇐) 先沿任一趋于 $b$ 的数列得到一个极限（$\K$ 完备），再说明它不依赖于数列，最后用反证法回到函数的极限。

记 $F(x) = \int_a^x f$，则 $\int_x^y f = F(y) - F(x)$（Chasles）。

**(⇒)**　设 $F(x) \to \ell$（$x \to b^-$），$\eps > 0$。存在 $c \in [a, b[$，使对一切 $x \in [c, b[$，$\abs{F(x) - \ell} < \frac\eps2$。于是对 $x, y \in [c, b[$，
$$\Big|\int_x^y f\Big| = \abs{F(y) - F(x)} \le \abs{F(y) - \ell} + \abs{\ell - F(x)} < \frac\eps2 + \frac\eps2 = \eps.$$

**(⇐)　第 1 步（沿数列）**　设 $(x_n)$ 是 $[a, b[$ 中趋于 $b$ 的数列，$\eps > 0$，$c$ 由假设给出。因为 $x_n \to b$ 且 $c < b$，存在 $N$ 使 $n \ge N \Rightarrow x_n \ge c$。于是 $p, q \ge N$ 时 $\abs{F(x_p) - F(x_q)} < \eps$：$(F(x_n))$ 是 Cauchy 列，在 $\K$ 中收敛（$\K$ 完备）。

**第 2 步（极限与数列无关）**　设 $(x_n)$、$(y_n)$ 是两个这样的数列，令 $z_{2n} = x_n$，$z_{2n+1} = y_n$，则 $z_n \to b$。由第 1 步，$(F(z_n))$ 收敛；它的两个子列 $(F(x_n))$、$(F(y_n))$ 有同一极限。记这个公共极限为 $\ell$。

**第 3 步（函数的极限）**　反设 $F(x) \not\to \ell$（$x \to b^-$）：存在 $\eps_0 > 0$ 和 $[a, b[$ 中趋于 $b$ 的数列 $(x_n)$，使 $\abs{F(x_n) - \ell} \ge \eps_0$。但由第 2 步 $F(x_n) \to \ell$，矛盾。所以 $\int_a^b f$ 收敛于 $\ell$。
:::

::: fr
▷ Méthode : c'est le critère de Cauchy pour l'existence d'une limite de $F(x) = \int_a^x f$ en $b^-$. (⇒) par l'inégalité triangulaire ; (⇐) on obtient d'abord une limite le long d'une suite tendant vers $b$ ($\K$ est complet), on montre qu'elle ne dépend pas de la suite, puis on revient par l'absurde à la limite de la fonction.

Notons $F(x) = \int_a^x f$ ; alors $\int_x^y f = F(y) - F(x)$ (Chasles).

**(⇒)**　Supposons $F(x) \to \ell$ quand $x \to b^-$, et soit $\eps > 0$. Il existe $c \in [a, b[$ tel que pour tout $x \in [c, b[$, $\abs{F(x) - \ell} < \frac\eps2$. Pour $x, y \in [c, b[$,
$$\Big|\int_x^y f\Big| = \abs{F(y) - F(x)} \le \abs{F(y) - \ell} + \abs{\ell - F(x)} < \frac\eps2 + \frac\eps2 = \eps.$$

**(⇐)　Étape 1 (le long d'une suite)**　Soit $(x_n)$ une suite de $[a, b[$ tendant vers $b$, $\eps > 0$ et $c$ donné par l'hypothèse. Comme $x_n \to b$ et $c < b$, il existe $N$ tel que $n \ge N \Rightarrow x_n \ge c$. Pour $p, q \ge N$, $\abs{F(x_p) - F(x_q)} < \eps$ : la suite $(F(x_n))$ est de Cauchy, donc converge dans $\K$ (complet).

**Étape 2 (indépendance vis-à-vis de la suite)**　Soient $(x_n)$, $(y_n)$ deux telles suites ; posons $z_{2n} = x_n$, $z_{2n+1} = y_n$, de sorte que $z_n \to b$. D'après l'étape 1, $(F(z_n))$ converge ; ses deux suites extraites $(F(x_n))$ et $(F(y_n))$ ont donc la même limite, notée $\ell$.

**Étape 3 (limite de la fonction)**　Par l'absurde, supposons que $F(x) \not\to \ell$ quand $x \to b^-$ : il existe $\eps_0 > 0$ et une suite $(x_n)$ de $[a, b[$ tendant vers $b$ telle que $\abs{F(x_n) - \ell} \ge \eps_0$. Or $F(x_n) \to \ell$ d'après l'étape 2, contradiction. Donc $\int_a^b f$ converge vers $\ell$.
:::

::: prop id=c6-faux-probleme zh="有限端点处的有界函数（「假问题」）" en="Bounded integrand at a finite endpoint" fr="Faux problème en une borne finie" ru="Ограниченная функция у конечного конца" lvl=1
设 $b < +\infty$，$f$ 在 $[a, b[$ 上分段连续且**有界**（例如 $f$ 在 $b^-$ 处有有限极限）。则 $\int_a^b f$ 收敛。
:::

::: fr
Soit $b < +\infty$ et $f$ continue par morceaux et **bornée** sur $[a, b[$ (par exemple, $f$ admet une limite finie en $b^-$). Alors $\int_a^b f$ converge.
:::

::: proof
▷ 思路：验证 Cauchy 准则：区间 $[x, y]$ 的长度不超过 $b - c$，被积函数有界，所以积分小。

**第 1 步（翻译假设）**　设 $\abs f \le M$ 在 $[a, b[$ 上成立（若 $f$ 在 $b^-$ 处有有限极限 $\ell$，则存在 $c_0 \in [a, b[$ 使 $[c_0, b[$ 上 $\abs f \le \abs\ell + 1$，而 $[a, c_0]$ 上 $f$ 分段连续因而有界）。

**第 2 步（选 $c$）**　设 $\eps > 0$，令 $c = \max\Big(a,\ b - \dfrac{\eps}{M + 1}\Big) \in [a, b[$。对 $x, y \in [c, b[$，
$$\Big|\int_x^y f\Big| \le M\abs{y - x} \le M(b - c) \le \frac{M\eps}{M + 1} < \eps.$$
由 Cauchy 准则 {@cauchy-integrale}，$\int_a^b f$ 收敛。
:::

::: fr
▷ Méthode : on vérifie le critère de Cauchy : l'intervalle $[x, y]$ a une longueur au plus $b - c$ et l'intégrande est bornée, donc l'intégrale est petite.

**Étape 1 (on traduit l'hypothèse)**　Soit $M$ tel que $\abs f \le M$ sur $[a, b[$ (si $f$ admet une limite finie $\ell$ en $b^-$, il existe $c_0 \in [a, b[$ tel que $\abs f \le \abs\ell + 1$ sur $[c_0, b[$, et $f$ est bornée sur le segment $[a, c_0]$ car continue par morceaux).

**Étape 2 (choix de $c$)**　Soit $\eps > 0$ ; posons $c = \max\Big(a,\ b - \dfrac{\eps}{M + 1}\Big) \in [a, b[$. Pour $x, y \in [c, b[$,
$$\Big|\int_x^y f\Big| \le M\abs{y - x} \le M(b - c) \le \frac{M\eps}{M + 1} < \eps.$$
D'après le critère de Cauchy ({@fr:cauchy-integrale}), $\int_a^b f$ converge.
:::

::: rem
1. **例。** $\int_0^1\frac{\sin t}{t}\,\dd t$、$\int_0^1\frac{1 - \cos t}{t^2}\,\dd t$、$\int_0^1\sin\frac1t\,\dd t$ 都收敛：被积函数在 $]0, 1]$ 上有界（前两个在 $0^+$ 处有有限极限 $1$ 和 $\frac12$，第三个以 $1$ 为界）。这类端点在法国讲义里叫「假问题」（faux problème）。
2. **有限端点是必要的。** 在无穷端点处，有界不够：$\int_0^x\cos t\,\dd t = \sin x$ 在 $x \to +\infty$ 时没有极限，所以 $\int_0^{+\infty}\cos t\,\dd t$ 发散。
3. **有界也是必要的。** $\frac1t$ 在 $]0, 1]$ 上无界，$\int_0^1\frac{\dd t}{t}$ 发散（{@riemann-integrales}）。
:::

::: rem
**与级数不同，$\int_a^{+\infty} f$ 收敛不蕴含 $f(t) \to 0$。** 例：对 $n \ge 2$，令 $f$ 在每个 $[n, n + \frac{1}{n^3}]$ 上是底边为这个区间、高为 $n$ 的三角形脉冲，其余为 $0$。这些区间两两不交，$f$ 连续且非负，第 $n$ 个脉冲的面积为 $\frac12\cdot\frac{1}{n^3}\cdot n = \frac{1}{2n^2}$。对 $x \ge 2$，$\int_0^x f \le \sum_{n \ge 2}\frac{1}{2n^2}$，有界且递增，所以 $\int_0^{+\infty} f$ 收敛（{@c6-positif-borne}）；但 $f(n + \frac{1}{2n^3}) = n$，$\limsup_{+\infty} f = +\infty$。即使 $f$ 有界也不够：$\int_0^{+\infty}\sin(t^2)\,\dd t$ 收敛（§4 的「想一想」），而 $\sin(t^2)$ 不趋于 $0$。不过，若 $f$ 有极限，或 $f$ 一致连续，则 $f \to 0$（下面两个命题）。
:::

::: prop id=c6-limite-infini zh="有极限的被积函数" en="Integrand with a limit at infinity" fr="Intégrande admettant une limite en $+\infty$" ru="Подынтегральная функция, имеющая предел на бесконечности" lvl=1
设 $f$ 在 $[a, +\infty[$ 上分段连续，$\int_a^{+\infty} f$ 收敛，且 $f(t) \to \ell$（$t \to +\infty$），其中 $\ell \in \K$，或 $\K = \R$ 时 $\ell = \pm\infty$。则 $\ell = 0$。
:::

::: fr
Soit $f$ continue par morceaux sur $[a, +\infty[$ telle que $\int_a^{+\infty} f$ converge et $f(t) \to \ell$ quand $t \to +\infty$, avec $\ell \in \K$, ou $\ell = \pm\infty$ si $\K = \R$. Alors $\ell = 0$.
:::

::: proof
▷ 思路：若 $\ell \ne 0$，$f$ 最终离开 $0$ 一段距离且符号固定，积分就像 $\int c\,\dd t$ 一样趋于无穷。

**情形 1（$\K = \R$，$\ell > 0$ 或 $\ell = +\infty$）**　令 $m = \frac\ell2$（$\ell = +\infty$ 时取 $m = 1$）。由极限的定义，存在 $c \ge a$，使 $t \ge c$ 时 $f(t) \ge m$。于是对 $x \ge c$，
$$\int_a^x f = \int_a^c f + \int_c^x f \ge \int_a^c f + m(x - c) \xrightarrow[x \to +\infty]{} +\infty,$$
与收敛矛盾。

**情形 2（$\K = \R$，$\ell < 0$ 或 $\ell = -\infty$）**　把 $f$ 换成 $-f$（$\int(-f)$ 也收敛），由情形 1 得矛盾。

**情形 3（$\K = \C$）**　$\operatorname{Re}\int_a^x f = \int_a^x\operatorname{Re}f$，所以 $\int_a^{+\infty}\operatorname{Re}f$ 收敛，且 $\operatorname{Re}f \to \operatorname{Re}\ell$；由情形 1、2，$\operatorname{Re}\ell = 0$。同理（把 $\operatorname{Re}$ 换成 $\operatorname{Im}$）$\operatorname{Im}\ell = 0$。

所以 $\ell = 0$。
:::

::: fr
▷ Méthode : si $\ell \ne 0$, $f$ finit par rester à distance de $0$ avec un signe fixe, et l'intégrale tend vers l'infini comme $\int c\,\dd t$.

**Cas 1 ($\K = \R$, $\ell > 0$ ou $\ell = +\infty$)**　Posons $m = \frac\ell2$ ($m = 1$ si $\ell = +\infty$). Par définition de la limite, il existe $c \ge a$ tel que $f(t) \ge m$ pour $t \ge c$. Pour $x \ge c$,
$$\int_a^x f = \int_a^c f + \int_c^x f \ge \int_a^c f + m(x - c) \xrightarrow[x \to +\infty]{} +\infty,$$
ce qui contredit la convergence.

**Cas 2 ($\K = \R$, $\ell < 0$ ou $\ell = -\infty$)**　On remplace $f$ par $-f$ (dont l'intégrale converge aussi) et on applique le cas 1.

**Cas 3 ($\K = \C$)**　$\operatorname{Re}\int_a^x f = \int_a^x\operatorname{Re}f$, donc $\int_a^{+\infty}\operatorname{Re}f$ converge, et $\operatorname{Re}f \to \operatorname{Re}\ell$ ; d'après les cas 1 et 2, $\operatorname{Re}\ell = 0$. En remplaçant $\operatorname{Re}$ par $\operatorname{Im}$, $\operatorname{Im}\ell = 0$.

Donc $\ell = 0$.
:::

::: prop id=c6-barbalat zh="Barbălat 引理" en="Barbălat's lemma" fr="Lemme de Barbălat" ru="Лемма Барбалата" lvl=2
若 $f$ 在 $[a, +\infty[$ 上一致连续，且 $\int_a^{+\infty} f$ 收敛，则 $f(t) \to 0$（$t \to +\infty$）。
:::

::: fr
Si $f$ est uniformément continue sur $[a, +\infty[$ et si $\int_a^{+\infty} f$ converge, alors $f(t) \to 0$ quand $t \to +\infty$.
:::

::: sketch
▷ 思路：若 $f$ 在无穷多个点 $x_n$ 处 $\ge \eps$，一致连续性保证 $f$ 在每个 $[x_n, x_n + \delta]$ 上 $\ge \frac\eps2$（$\delta$ 与 $n$ 无关），这些小区间上的积分 $\ge \frac{\eps\delta}{2}$，与 Cauchy 准则矛盾。

**实值情形。** 反设 $f \not\to 0$：存在 $\eps > 0$ 和 $x_n \to +\infty$，使 $\abs{f(x_n)} \ge \eps$。$f(x_n) \ge \eps$ 或 $f(x_n) \le -\eps$ 之一对无穷多个 $n$ 成立；必要时把 $f$ 换成 $-f$ 并抽取子列，可设 $f(x_n) \ge \eps$ 对一切 $n$ 成立。由一致连续，存在 $\delta > 0$，使 $\abs{x - y} \le \delta \Rightarrow \abs{f(x) - f(y)} \le \frac\eps2$；于是在 $[x_n, x_n + \delta]$ 上 $f \ge \frac\eps2$，$\int_{x_n}^{x_n + \delta} f \ge \frac{\eps\delta}{2}$。由 Cauchy 准则 {@cauchy-integrale}（取 $\frac{\eps\delta}{2}$），存在 $c$ 使 $x, y \ge c \Rightarrow \abs{\int_x^y f} < \frac{\eps\delta}{2}$；取 $n$ 使 $x_n \ge c$，矛盾。

**复值情形。** $\operatorname{Re}f$、$\operatorname{Im}f$ 也一致连续（$\abs{\operatorname{Re}u} \le \abs u$），积分也收敛，分别用实值情形。
:::

::: fr
▷ Méthode : si $f \ge \eps$ en une infinité de points $x_n$, l'uniforme continuité assure $f \ge \frac\eps2$ sur chaque $[x_n, x_n + \delta]$ ($\delta$ indépendant de $n$) ; les intégrales sur ces petits intervalles sont $\ge \frac{\eps\delta}{2}$, ce qui contredit le critère de Cauchy.

**Cas réel.** Par l'absurde, supposons $f \not\to 0$ : il existe $\eps > 0$ et $x_n \to +\infty$ avec $\abs{f(x_n)} \ge \eps$. L'une des conditions $f(x_n) \ge \eps$, $f(x_n) \le -\eps$ est vraie pour une infinité de $n$ ; quitte à remplacer $f$ par $-f$ et à extraire, on peut supposer $f(x_n) \ge \eps$ pour tout $n$. Par uniforme continuité, il existe $\delta > 0$ tel que $\abs{x - y} \le \delta \Rightarrow \abs{f(x) - f(y)} \le \frac\eps2$ ; donc $f \ge \frac\eps2$ sur $[x_n, x_n + \delta]$ et $\int_{x_n}^{x_n + \delta} f \ge \frac{\eps\delta}{2}$. D'après le critère de Cauchy ({@fr:cauchy-integrale}, avec $\frac{\eps\delta}{2}$), il existe $c$ tel que $x, y \ge c \Rightarrow \abs{\int_x^y f} < \frac{\eps\delta}{2}$ ; en prenant $n$ avec $x_n \ge c$, on obtient une contradiction.

**Cas complexe.** $\operatorname{Re}f$ et $\operatorname{Im}f$ sont uniformément continues ($\abs{\operatorname{Re}u} \le \abs u$) et d'intégrales convergentes ; on applique le cas réel à chacune.
:::

::: q
设 $f$ 在 $[a, +\infty[$ 上递减，且 $\int_a^{+\infty} f$ 收敛。证明 $f(t) \to 0$，且 $t\,f(t) \to 0$。（对比第 2 章：$u_n$ 递减且 $\sum u_n$ 收敛 ⟹ $n u_n \to 0$。）
:::

::: ans
$f$ 递减，所以在 $+\infty$ 处有极限 $\ell \in [-\infty, +\infty[$；由 {@c6-limite-infini}，$\ell = 0$，因此 $f \ge 0$（递减到 $0$）。对 $x \ge \max(2a, 0) + 1$（保证 $\frac x2 \ge a$），由 $f$ 递减，
$$\int_{x/2}^x f \ge \frac x2\,f(x) \ge 0.$$
由 Cauchy 准则 {@cauchy-integrale}，$\frac x2 \to +\infty$ 时左边趋于 $0$，所以 $x f(x) \to 0$。
:::

::: q
$\int_0^1\sin\frac1t\,\dd t$ 收敛吗？$\int_0^1\frac1t\sin\frac1t\,\dd t$ 呢？
:::

::: ans
第一个收敛，而且绝对收敛：$\abs{\sin\frac1t} \le 1$，有界函数在有限端点处是假问题（{@c6-faux-probleme}，用于 $f$ 和 $\abs f$）。第二个的被积函数在 $0^+$ 附近无界，不是假问题。换元 $u = \frac1t$（$\dd t = -\frac{\dd u}{u^2}$，{@changement-variable-gen}）把它变成
$$\int_1^{+\infty}u\sin u\cdot\frac{\dd u}{u^2} = \int_1^{+\infty}\frac{\sin u}{u}\,\dd u,$$
后者收敛但不绝对收敛（{@sinc}）。所以第二个积分收敛，但不绝对收敛。
:::

## 非负函数的积分：比较定理

当 $f \ge 0$ 时，$x \mapsto \int_a^x f$ 递增，收敛问题变成「有没有界」的问题，于是可以像第 2 章的正项级数一样用比较定理。本节的参考尺度是 Riemann 积分 {@riemann-integrales} 与 Bertrand 积分。

::: lem id=c6-positif-borne zh="非负函数的积分收敛当且仅当有界" en="Non-negative integrands: convergence iff boundedness" fr="Intégrale d'une fonction positive : convergence et majoration" ru="Интеграл от неотрицательной функции сходится тогда и только тогда, когда ограничен" lvl=1
设 $f$ 在 $[a, b[$ 上分段连续且 $f \ge 0$，$F(x) = \int_a^x f$。则 $F$ 在 $[a, b[$ 上递增，且
$$\int_a^b f\ \text{收敛} \iff F\ \text{有上界}.$$
此时 $\int_a^b f = \sup_{x \in [a, b[}F(x)$；否则 $F(x) \to +\infty$（$x \to b^-$）。
:::

::: fr
Soit $f$ continue par morceaux et positive sur $[a, b[$, et $F(x) = \int_a^x f$. Alors $F$ est croissante sur $[a, b[$ et
$$\int_a^b f\ \text{converge} \iff F\ \text{est majorée}.$$
Dans ce cas, $\int_a^b f = \sup_{x \in [a, b[}F(x)$ ; sinon $F(x) \to +\infty$ quand $x \to b^-$.
:::

::: proof
▷ 思路：这是单调函数的极限定理。

**第 1 步（递增）**　对 $a \le x \le y < b$，$F(y) - F(x) = \int_x^y f \ge 0$（Chasles 与闭区间上积分的正性）。

**第 2 步（⇐）**　设 $F$ 有上界，令 $S = \sup F$。设 $\eps > 0$，由上确界的刻画，存在 $x_\eps \in [a, b[$ 使 $F(x_\eps) > S - \eps$。由第 1 步，对 $x \in [x_\eps, b[$，$S - \eps < F(x_\eps) \le F(x) \le S$。所以 $F(x) \to S$（$x \to b^-$）。

**第 3 步（⇒ 与无界情形）**　若 $F$ 无上界，对任意 $A > 0$，存在 $x_A$ 使 $F(x_A) > A$，由递增性 $x \ge x_A \Rightarrow F(x) > A$，所以 $F(x) \to +\infty$，积分发散。逆否即得 (⇒)。
:::

::: fr
▷ Méthode : c'est le théorème de la limite monotone.

**Étape 1 (croissance)**　Pour $a \le x \le y < b$, $F(y) - F(x) = \int_x^y f \ge 0$ (Chasles et positivité de l'intégrale sur un segment).

**Étape 2 (⇐)**　Supposons $F$ majorée et posons $S = \sup F$. Soit $\eps > 0$ ; par caractérisation de la borne supérieure, il existe $x_\eps \in [a, b[$ tel que $F(x_\eps) > S - \eps$. D'après l'étape 1, pour $x \in [x_\eps, b[$, $S - \eps < F(x_\eps) \le F(x) \le S$. Donc $F(x) \to S$ quand $x \to b^-$.

**Étape 3 (⇒ et cas non majoré)**　Si $F$ n'est pas majorée, pour tout $A > 0$ il existe $x_A$ avec $F(x_A) > A$, et par croissance $x \ge x_A \Rightarrow F(x) > A$ ; donc $F(x) \to +\infty$ et l'intégrale diverge. Par contraposée, on obtient (⇒).
:::

::: thm id=comparaison-integrales zh="比较定理" en="Comparison test for integrals" fr="Théorème de comparaison pour les intégrales" ru="Признак сравнения для несобственных интегралов" lvl=1
设 $f, g$ 在 $[a, b[$ 上分段连续且非负。

1. 若 $f \le g$（在某个 $[c, b[$ 上即可）且 $\int_a^b g$ 收敛，则 $\int_a^b f$ 收敛；等价地，若 $\int_a^b f$ 发散，则 $\int_a^b g$ 发散。
2. 若 $f(t) = O(g(t))$（$t \to b$）且 $\int_a^b g$ 收敛，则 $\int_a^b f$ 收敛。
3. 若 $f(t) \sim g(t)$（$t \to b$），则两积分同敛散。
:::

::: fr
Soient $f, g$ continues par morceaux et positives sur $[a, b[$.

1. Si $f \le g$ (sur un intervalle $[c, b[$ suffit) et si $\int_a^b g$ converge, alors $\int_a^b f$ converge ; de façon équivalente, si $\int_a^b f$ diverge, alors $\int_a^b g$ diverge.
2. Si $f(t) = O(g(t))$ quand $t \to b$ et si $\int_a^b g$ converge, alors $\int_a^b f$ converge.
3. Si $f(t) \sim g(t)$ quand $t \to b$, les deux intégrales sont de même nature.
:::

::: proof
▷ 思路：由 {@c6-positif-borne}，非负函数的积分收敛当且仅当积分上限函数有界；有界性在不等式下传递。2、3 先把渐近关系翻译成某个 $[c, b[$ 上的不等式，再用 1。与级数的比较定理 {@comparaison} 完全平行。

**1.**　**第 1 步（化到 $[c, b[$）**　由 {@c6-coherence} 第 2 条，$\int_a^b$ 与 $\int_c^b$ 同敛散，所以可设 $f \le g$ 在整个 $[c, b[$ 上，并只讨论 $\int_c^b$。**第 2 步（有界性传递）**　对 $x \in [c, b[$，$\int_c^x f \le \int_c^x g \le \int_c^b g$（第二个不等式：$\int_c^x g$ 递增趋于 $\int_c^b g$，见 {@c6-positif-borne}）。所以 $x \mapsto \int_c^x f$ 有上界，由 {@c6-positif-borne}，$\int_c^b f$ 收敛。后半句是前半句的逆否命题。

**2.**　**翻译假设**：存在 $c \in [a, b[$ 和 $M \ge 0$，使对 $t \in [c, b[$，$f(t) \le M g(t)$。由 {@c6-proprietes} 第 1 条，$\int_a^b Mg$ 收敛；由 1，$\int_a^b f$ 收敛。

**3.**　**翻译假设**：$f(t) = g(t)\big(1 + \eps(t)\big)$，$\eps(t) \to 0$（$t \to b$）。取 $c \in [a, b[$ 使 $t \in [c, b[$ 时 $\abs{\eps(t)} \le \frac12$，则在 $[c, b[$ 上
$$\tfrac12 g \le f \le \tfrac32 g.$$
若 $\int g$ 收敛，由右边不等式和 1（用于 $\frac32 g$），$\int f$ 收敛；若 $\int f$ 收敛，由左边不等式和 1（用于 $2f \ge g$），$\int g$ 收敛。
:::

::: fr
▷ Méthode : d'après {@fr:c6-positif-borne}, l'intégrale d'une fonction positive converge si et seulement si la fonction « borne supérieure » est majorée ; la majoration se transmet par inégalité. Pour 2 et 3, on traduit d'abord la relation asymptotique en une inégalité sur un intervalle $[c, b[$, puis on applique 1. C'est exactement parallèle au théorème de comparaison des séries ({@fr:comparaison}).

**1.**　**Étape 1 (réduction à $[c, b[$)**　D'après le point 2 de {@fr:c6-coherence}, $\int_a^b$ et $\int_c^b$ sont de même nature ; on peut donc supposer $f \le g$ sur tout $[c, b[$ et ne considérer que $\int_c^b$. **Étape 2 (transmission de la majoration)**　Pour $x \in [c, b[$, $\int_c^x f \le \int_c^x g \le \int_c^b g$ (la seconde inégalité car $\int_c^x g$ croît vers $\int_c^b g$, cf. {@fr:c6-positif-borne}). Donc $x \mapsto \int_c^x f$ est majorée et, d'après {@fr:c6-positif-borne}, $\int_c^b f$ converge. La seconde phrase est la contraposée de la première.

**2.**　**On traduit l'hypothèse** : il existe $c \in [a, b[$ et $M \ge 0$ tels que $f(t) \le M g(t)$ pour $t \in [c, b[$. D'après le point 1 de {@fr:c6-proprietes}, $\int_a^b Mg$ converge ; d'après 1, $\int_a^b f$ converge.

**3.**　**On traduit l'hypothèse** : $f(t) = g(t)\big(1 + \eps(t)\big)$ avec $\eps(t) \to 0$ quand $t \to b$. Choisissons $c \in [a, b[$ tel que $\abs{\eps(t)} \le \frac12$ pour $t \in [c, b[$ ; alors sur $[c, b[$,
$$\tfrac12 g \le f \le \tfrac32 g.$$
Si $\int g$ converge, l'inégalité de droite et 1 (appliqué à $\frac32 g$) montrent que $\int f$ converge ; si $\int f$ converge, l'inégalité de gauche et 1 (appliqué à $2f \ge g$) montrent que $\int g$ converge.
:::

::: rem
1. **正性不能去掉。** 第 3 条对变号函数不成立，反例见 {@c6-cex-equiv-signe}（§3）。
2. **只看端点附近。** 由于 {@c6-coherence}，比较只需在问题端点附近成立；有多个问题点时（例如 $]0, +\infty[$），在中间某点分开，每个端点分别比较。
3. **$O$ 不能换成双向的结论。** 第 2 条只给一个方向：$f = O(g)$ 且 $\int f$ 收敛推不出 $\int g$ 收敛。例：在 $[1, +\infty[$ 上 $\frac{1}{t^2} = O\big(\frac1t\big)$，$\int_1^{+\infty}\frac{\dd t}{t^2}$ 收敛，而 $\int_1^{+\infty}\frac{\dd t}{t}$ 发散。要判断发散，必须找一个**下界**，其积分发散。

:::

::: ex id=c6-ex-comparaison zh="比较定理的四个例子" lvl=1
1. **$\int_0^{+\infty}\e^{-t^2}\,\dd t$ 收敛。** 唯一的问题点是 $+\infty$。对 $t \ge 1$，$t^2 \ge t$，所以 $0 \le \e^{-t^2} \le \e^{-t}$；$\int_1^{+\infty}\e^{-t}\,\dd t$ 收敛（{@riemann-integrales}），由比较定理第 1 条即得。
2. **$\int_0^1\frac{\dd t}{\sqrt{t(1-t)}}$ 收敛。** 两个问题点 $0$ 与 $1$，在 $\frac12$ 处分开。$t \to 0^+$ 时 $\frac{1}{\sqrt{t(1-t)}} \sim \frac{1}{\sqrt t}$，而 $\int_0^{1/2} t^{-1/2}\,\dd t$ 收敛（$\alpha = \frac12 < 1$）；$t \to 1^-$ 时 $\sim \frac{1}{\sqrt{1 - t}}$，换元 $u = 1 - t$ 化为同样的情形。由第 3 条，两半都收敛。（其值为 $\pi$，见 {@c6-ex-changement}。）
3. **$\int_1^{+\infty}\frac{\ln t}{t^2}\,\dd t$ 收敛。** $t^{3/2}\cdot\frac{\ln t}{t^2} = \frac{\ln t}{\sqrt t} \to 0$，所以 $\frac{\ln t}{t^2} = o\big(t^{-3/2}\big)$，特别地 $= O\big(t^{-3/2}\big)$；$\int_1^{+\infty}t^{-3/2}\,\dd t$ 收敛（$\frac32 > 1$），由第 2 条即得。（分部积分可得其值为 $1$。）
4. **$\int_2^{+\infty}\frac{\dd t}{\ln t}$ 发散。** 对 $t \ge 2$，$0 < \ln t \le t$，所以 $\frac{1}{\ln t} \ge \frac1t$；$\int_2^{+\infty}\frac{\dd t}{t}$ 发散，由第 1 条的逆否形式即得。
:::

::: thm id=bertrand-integrales zh="Bertrand 积分" en="Bertrand integrals" fr="Intégrales de Bertrand" ru="Интегралы Бертрана" lvl=2
$\int_2^{+\infty}\dfrac{\dd t}{t^\alpha(\ln t)^\beta}$ 收敛，当且仅当 $\alpha > 1$，或 $\alpha = 1$ 且 $\beta > 1$。
:::

::: fr
L'intégrale $\int_2^{+\infty}\dfrac{\dd t}{t^\alpha(\ln t)^\beta}$ converge si et seulement si $\alpha > 1$, ou $\alpha = 1$ et $\beta > 1$.
:::

::: sketch
▷ 思路：与 Bertrand 级数 {@bertrand} 相同。$\alpha \ne 1$ 时，用介于 $\alpha$ 与 $1$ 之间的指数 $\frac{1 + \alpha}{2}$ 吸收对数因子；$\alpha = 1$ 时，换元 $u = \ln t$ 化为 Riemann 积分。记 $f(t) = \frac{1}{t^\alpha(\ln t)^\beta} > 0$。

**情形 1（$\alpha > 1$）**　令 $\gamma = \frac{1 + \alpha}{2} \in\, ]1, \alpha[$。则 $\frac{f(t)}{t^{-\gamma}} = \frac{t^{\gamma - \alpha}}{(\ln t)^\beta} = \frac{1}{t^{(\alpha - 1)/2}(\ln t)^\beta} \to 0$（幂函数压倒对数，对任何 $\beta$），所以 $f = o(t^{-\gamma})$。$\int_2^{+\infty}t^{-\gamma}$ 收敛，由比较定理第 2 条，收敛。

**情形 2（$\alpha < 1$）**　同样令 $\gamma = \frac{1 + \alpha}{2} \in\, ]\alpha, 1[$。则 $\frac{f(t)}{t^{-\gamma}} = \frac{t^{(1 - \alpha)/2}}{(\ln t)^\beta} \to +\infty$，所以存在 $c$ 使 $t \ge c$ 时 $f(t) \ge t^{-\gamma}$。$\int_c^{+\infty}t^{-\gamma}$ 发散，由比较定理第 1 条，发散。

**情形 3（$\alpha = 1$）**　对 $x > 2$，令 $u = \ln t$（$\dd u = \frac{\dd t}{t}$）：$\int_2^x\frac{\dd t}{t(\ln t)^\beta} = \int_{\ln 2}^{\ln x}\frac{\dd u}{u^\beta}$。$x \to +\infty$ 时 $\ln x \to +\infty$，由 {@riemann-integrales}，右边收敛当且仅当 $\beta > 1$。（$\beta = 1$ 时原函数是 $\ln\ln t$。）
:::

::: fr
▷ Méthode : comme pour les séries de Bertrand ({@fr:bertrand}). Si $\alpha \ne 1$, l'exposant intermédiaire $\frac{1 + \alpha}{2}$ absorbe le facteur logarithmique ; si $\alpha = 1$, le changement de variable $u = \ln t$ ramène à une intégrale de Riemann. Notons $f(t) = \frac{1}{t^\alpha(\ln t)^\beta} > 0$.

**Cas 1 ($\alpha > 1$)**　Posons $\gamma = \frac{1 + \alpha}{2} \in\, ]1, \alpha[$. Alors $\frac{f(t)}{t^{-\gamma}} = \frac{t^{\gamma - \alpha}}{(\ln t)^\beta} = \frac{1}{t^{(\alpha - 1)/2}(\ln t)^\beta} \to 0$ (croissances comparées, pour tout $\beta$), donc $f = o(t^{-\gamma})$. Comme $\int_2^{+\infty}t^{-\gamma}$ converge, le point 2 du théorème de comparaison donne la convergence.

**Cas 2 ($\alpha < 1$)**　Posons encore $\gamma = \frac{1 + \alpha}{2} \in\, ]\alpha, 1[$. Alors $\frac{f(t)}{t^{-\gamma}} = \frac{t^{(1 - \alpha)/2}}{(\ln t)^\beta} \to +\infty$, donc il existe $c$ tel que $f(t) \ge t^{-\gamma}$ pour $t \ge c$. Comme $\int_c^{+\infty}t^{-\gamma}$ diverge, le point 1 du théorème de comparaison donne la divergence.

**Cas 3 ($\alpha = 1$)**　Pour $x > 2$, posons $u = \ln t$ ($\dd u = \frac{\dd t}{t}$) : $\int_2^x\frac{\dd t}{t(\ln t)^\beta} = \int_{\ln 2}^{\ln x}\frac{\dd u}{u^\beta}$. Quand $x \to +\infty$, $\ln x \to +\infty$, et d'après {@fr:riemann-integrales} le membre de droite converge si et seulement si $\beta > 1$. (Pour $\beta = 1$, une primitive est $\ln\ln t$.)
:::

::: lem id=c6-serie-integrale-pos zh="非负函数：积分与级数" en="Non-negative integrands: integral versus series" fr="Fonctions positives : intégrale et série" ru="Неотрицательные функции: интеграл и ряд" lvl=1
设 $f$ 在 $[a, +\infty[$ 上分段连续且 $f \ge 0$，令 $u_n = \int_{a+n}^{a+n+1} f$（$n \in \N$）。则 $\int_a^{+\infty} f$ 收敛，当且仅当 $\sum u_n$ 收敛，且此时 $\int_a^{+\infty} f = \sum_{n \ge 0}u_n$。
:::

::: fr
Soit $f$ continue par morceaux et positive sur $[a, +\infty[$, et $u_n = \int_{a+n}^{a+n+1} f$ ($n \in \N$). Alors $\int_a^{+\infty} f$ converge si et seulement si $\sum u_n$ converge, et dans ce cas $\int_a^{+\infty} f = \sum_{n \ge 0}u_n$.
:::

::: proof
▷ 思路：两者都是递增量的有界性问题，而 $F(a + N)$ 恰好是级数的部分和。

记 $F(x) = \int_a^x f$，$S_N = \sum_{n=0}^{N-1}u_n$。由 Chasles 关系，$S_N = F(a + N)$。

**(⇒)**　若 $\int_a^{+\infty} f$ 收敛，由 {@c6-positif-borne}，$S_N = F(a + N) \le \sup F < \infty$，正项级数 $\sum u_n$ 的部分和有界，所以收敛。

**(⇐)**　若 $\sum u_n$ 收敛于 $S$，对 $x \ge a$，取 $N = E(x - a) + 1$，则 $a + N > x$，由 $F$ 递增，$F(x) \le F(a + N) = S_N \le S$。由 {@c6-positif-borne}，$\int_a^{+\infty} f$ 收敛。

**（值）**　收敛时 $F(a + N) \to \int_a^{+\infty} f$（沿数列 $a + N \to +\infty$ 取极限），而 $F(a + N) = S_N \to \sum u_n$。
:::

::: fr
▷ Méthode : dans les deux cas, il s'agit de majorer une quantité croissante, et $F(a + N)$ est exactement une somme partielle de la série.

Notons $F(x) = \int_a^x f$ et $S_N = \sum_{n=0}^{N-1}u_n$. Par la relation de Chasles, $S_N = F(a + N)$.

**(⇒)**　Si $\int_a^{+\infty} f$ converge, d'après {@fr:c6-positif-borne}, $S_N = F(a + N) \le \sup F < \infty$ : les sommes partielles de la série à termes positifs $\sum u_n$ sont majorées, donc elle converge.

**(⇐)**　Si $\sum u_n$ converge vers $S$, pour $x \ge a$ posons $N = E(x - a) + 1$ ; alors $a + N > x$ et, $F$ étant croissante, $F(x) \le F(a + N) = S_N \le S$. D'après {@fr:c6-positif-borne}, $\int_a^{+\infty} f$ converge.

**(Valeur)**　En cas de convergence, $F(a + N) \to \int_a^{+\infty} f$ (limite le long de la suite $a + N \to +\infty$), et $F(a + N) = S_N \to \sum u_n$.
:::

::: prop id=serie-integrale-reste zh="级数余项的积分估计" en="Integral bounds for the remainder of a series" fr="Encadrement du reste d'une série par des intégrales" ru="Оценка остатка ряда интегралами" lvl=1
设 $f : [1, +\infty[ \to \R_+$ 连续递减，$\int_1^\infty f$ 收敛。则对 $n \ge 1$，余项满足
$$\int_{n+1}^{+\infty} f \le \sum_{k > n} f(k) \le \int_n^{+\infty} f.$$
例：$\sum_{k > n}\frac{1}{k^2} \sim \frac1n$，$\sum_{k > n}\frac{1}{k^\alpha} \sim \frac{n^{1-\alpha}}{\alpha - 1}$（$\alpha > 1$）。
:::

::: fr
Soit $f : [1, +\infty[ \to \R_+$ continue et décroissante, avec $\int_1^\infty f$ convergente. Pour $n \ge 1$, le reste vérifie
$$\int_{n+1}^{+\infty} f \le \sum_{k > n} f(k) \le \int_n^{+\infty} f.$$
Exemple : $\sum_{k > n}\frac{1}{k^2} \sim \frac1n$, et $\sum_{k > n}\frac{1}{k^\alpha} \sim \frac{n^{1-\alpha}}{\alpha - 1}$ ($\alpha > 1$).
:::

::: proof
▷ 思路：对 {@serie-integrale} 中每一项的夹逼不等式从 $k = n + 1$ 到 $+\infty$ 求和；等价关系由夹逼得到。

**第 1 步（逐项夹逼）**　由 {@serie-integrale}（$f$ 在 $[k - 1, k + 1]$ 上递减），对 $k \ge 2$，$\int_k^{k+1} f \le f(k) \le \int_{k-1}^k f$。

**第 2 步（求和）**　对 $k = n + 1, \dots, m$ 求和（$k - 1 \ge n \ge 1$），由 Chasles 关系，
$$\int_{n+1}^{m+1} f \le \sum_{k=n+1}^m f(k) \le \int_n^m f.$$
令 $m \to \infty$：两端积分收敛（{@c6-coherence}），中间是收敛的正项级数（由右边有界），取极限得结论。

**第 3 步（例）**　$f(t) = t^{-\alpha}$（$\alpha > 1$）：$\int_n^{+\infty}t^{-\alpha}\,\dd t = \frac{n^{1-\alpha}}{\alpha - 1}$，$\int_{n+1}^{+\infty}t^{-\alpha}\,\dd t = \frac{(n+1)^{1-\alpha}}{\alpha - 1}$。因为 $\big(\frac{n+1}{n}\big)^{1-\alpha} \to 1$，两端都等价于 $\frac{n^{1-\alpha}}{\alpha - 1}$，由夹逼，余项也等价于它。$\alpha = 2$ 时为 $\frac1n$。
:::

::: fr
▷ Méthode : on somme pour $k$ de $n + 1$ à $+\infty$ l'encadrement terme à terme de {@fr:serie-integrale} ; l'équivalent s'obtient par encadrement.

**Étape 1 (encadrement terme à terme)**　D'après {@fr:serie-integrale} ($f$ décroissante sur $[k - 1, k + 1]$), pour $k \ge 2$, $\int_k^{k+1} f \le f(k) \le \int_{k-1}^k f$.

**Étape 2 (sommation)**　En sommant pour $k = n + 1, \dots, m$ ($k - 1 \ge n \ge 1$) et par la relation de Chasles,
$$\int_{n+1}^{m+1} f \le \sum_{k=n+1}^m f(k) \le \int_n^m f.$$
On fait tendre $m$ vers $+\infty$ : les intégrales aux extrémités convergent ({@fr:c6-coherence}), le terme du milieu est une série à termes positifs convergente (majorée par le membre de droite), et on passe à la limite.

**Étape 3 (exemple)**　Pour $f(t) = t^{-\alpha}$ ($\alpha > 1$) : $\int_n^{+\infty}t^{-\alpha}\,\dd t = \frac{n^{1-\alpha}}{\alpha - 1}$ et $\int_{n+1}^{+\infty}t^{-\alpha}\,\dd t = \frac{(n+1)^{1-\alpha}}{\alpha - 1}$. Comme $\big(\frac{n+1}{n}\big)^{1-\alpha} \to 1$, les deux bornes sont équivalentes à $\frac{n^{1-\alpha}}{\alpha - 1}$, donc le reste aussi, par encadrement. Pour $\alpha = 2$, on obtient $\frac1n$.
:::

::: method zh="判断广义积分收敛的步骤"
1. 找出所有「问题点」（无穷端点、函数无界或振荡的端点），在每两个问题点之间取一个分点，对每个问题点分别讨论（{@def-integrale-generalisee}）。有界函数在有限端点处是「假问题」（{@c6-faux-probleme}）。
2. 函数非负（或在问题点附近定号）时：求等价量或上界，与 Riemann 积分（{@riemann-integrales}）或 Bertrand 积分（{@bertrand-integrales}）比较（{@comparaison-integrales}）。
3. 函数变号时：先试绝对收敛（{@integrable-convergente}）；不行再用分部积分（如 $\frac{\sin t}{t}$，{@sinc}）或 Abel 判别法（{@c6-abel-integrales}）。
4. 积分与级数的转换：{@serie-integrale}、{@c6-serie-integrale-pos}。
:::

::: q
对哪些 $(\alpha, \beta)$，$\int_0^{1/2}\dfrac{\dd t}{t^\alpha\abs{\ln t}^\beta}$ 收敛？
:::

::: ans
换元 $t = \frac1u$（$\dd t = -\frac{\dd u}{u^2}$，$\abs{\ln t} = \ln u$，{@changement-variable-gen}）：
$$\int_0^{1/2}\frac{\dd t}{t^\alpha\abs{\ln t}^\beta} = \int_2^{+\infty}\frac{u^\alpha}{(\ln u)^\beta}\cdot\frac{\dd u}{u^2} = \int_2^{+\infty}\frac{\dd u}{u^{2-\alpha}(\ln u)^\beta}.$$
由 {@bertrand-integrales}，收敛当且仅当 $2 - \alpha > 1$，或 $2 - \alpha = 1$ 且 $\beta > 1$，即 **$\alpha < 1$，或 $\alpha = 1$ 且 $\beta > 1$**。注意在 $0$ 处与在 $+\infty$ 处，$\alpha$ 的临界方向相反。
:::

## 绝对收敛与可积函数

对变号的函数，比较定理不能直接用。第一步总是看 $\abs f$：若 $\int\abs f$ 收敛，则 $\int f$ 收敛（与级数的绝对收敛相同）。但存在收敛而不绝对收敛的积分，最典型的是 $\int_0^{+\infty}\frac{\sin t}{t}\,\dd t$；处理这类积分要利用正负抵消，工具是分部积分（Abel 判别法）。

::: def id=def-integrable zh="可积函数" en="Integrable function" fr="Fonction intégrable" ru="Абсолютно интегрируемая функция"
设 $f$ 在区间 $I$ 上分段连续。称 $f$ 在 $I$ 上**可积**（intégrable），如果 $\int_I \abs{f}$ 收敛；此时也说 $\int_I f$ **绝对收敛**。$I$ 上可积的分段连续函数构成向量空间（{@c6-l1-ev}），记为 $L^1(I)$。收敛但不绝对收敛的积分称为**半收敛**的。

白话：「可积」比「积分收敛」强，它要求 $\abs f$ 下方的面积有限，正负抵消不算数。对非负函数，两者相同。
:::

::: fr
Soit $f$ continue par morceaux sur un intervalle $I$. On dit que $f$ est **intégrable** sur $I$ si $\int_I \abs{f}$ converge ; on dit aussi que $\int_I f$ est **absolument convergente**. Les fonctions continues par morceaux intégrables sur $I$ forment un espace vectoriel ({@fr:c6-l1-ev}), noté $L^1(I)$. Une intégrale convergente mais non absolument convergente est dite **semi-convergente**.

Autrement dit, « intégrable » est plus fort que « d'intégrale convergente » : on demande que l'aire sous $\abs f$ soit finie, sans compter sur les compensations de signe. Pour une fonction positive, les deux notions coïncident.
:::

::: ex id=c6-ex-integrable lvl=1
1. $t \mapsto \e^{-t}\sin t$ 在 $[0, +\infty[$ 上可积：$\abs{\e^{-t}\sin t} \le \e^{-t}$，后者积分收敛（{@comparaison-integrales}）。
2. $t \mapsto \frac{1}{\sqrt t}$ 在 $]0, 1]$ 上可积（非负，$\alpha = \frac12 < 1$）。
3. **非例子**：$t \mapsto \frac{\sin t}{t}$ 在 $[1, +\infty[$ 上积分收敛，但**不可积**（{@sinc}）。
4. **非例子**：$t \mapsto \frac1t$ 在 $[1, +\infty[$ 上不可积，虽然它趋于 $0$。
:::

::: prop id=c6-l1-ev zh="可积函数的比较与线性" en="Comparison and linearity for integrable functions" fr="Comparaison et linéarité pour les fonctions intégrables" ru="Сравнение и линейность для абсолютно интегрируемых функций" lvl=1
设 $I$ 是区间。

1. 若 $f$ 在 $I$ 上分段连续，$g$ 在 $I$ 上可积，且 $\abs f \le g$，则 $f$ 可积。
2. $L^1(I)$ 是向量空间：若 $f, g$ 可积，$\lambda \in \K$，则 $f + \lambda g$ 可积。
:::

::: fr
Soit $I$ un intervalle.

1. Si $f$ est continue par morceaux sur $I$, $g$ intégrable sur $I$ et $\abs f \le g$, alors $f$ est intégrable.
2. $L^1(I)$ est un espace vectoriel : si $f, g$ sont intégrables et $\lambda \in \K$, alors $f + \lambda g$ est intégrable.
:::

::: proof
▷ 思路：两条都是对非负函数 $\abs f$ 用比较定理。

**1.**　$0 \le \abs f \le g$，$\int_I g$ 收敛。由比较定理 {@comparaison-integrales} 第 1 条（对 $]a, b[$ 型区间在中间分开，两端分别用），$\int_I\abs f$ 收敛。

**2.**　$f + \lambda g$ 分段连续，且由三角不等式 $\abs{f + \lambda g} \le \abs f + \abs\lambda\abs g$。右边的积分收敛（{@c6-proprietes} 第 1 条），由 1，$f + \lambda g$ 可积。零函数可积，所以 $L^1(I)$ 是分段连续函数空间的子空间。
:::

::: fr
▷ Méthode : dans les deux cas, on applique le théorème de comparaison à la fonction positive $\abs f$.

**1.**　On a $0 \le \abs f \le g$ et $\int_I g$ converge. D'après le point 1 de {@fr:comparaison-integrales} (pour un intervalle du type $]a, b[$, on coupe au milieu et on traite chaque extrémité), $\int_I\abs f$ converge.

**2.**　$f + \lambda g$ est continue par morceaux et, par l'inégalité triangulaire, $\abs{f + \lambda g} \le \abs f + \abs\lambda\abs g$. L'intégrale du membre de droite converge ({@fr:c6-proprietes}, point 1) ; d'après 1, $f + \lambda g$ est intégrable. La fonction nulle est intégrable, donc $L^1(I)$ est un sous-espace vectoriel de l'espace des fonctions continues par morceaux.
:::

::: thm id=integrable-convergente zh="绝对收敛蕴含收敛" en="Absolute convergence implies convergence" fr="Une intégrale absolument convergente est convergente" ru="Абсолютно сходящийся интеграл сходится" lvl=1
若 $f$ 在 $I$ 上可积，则 $\int_I f$ 收敛，且 $\Big|\int_I f\Big| \le \int_I \abs{f}$。
:::

::: fr
Si $f$ est intégrable sur $I$, alors $\int_I f$ converge et $\Big|\int_I f\Big| \le \int_I \abs{f}$.
:::

::: proof
▷ 思路：用 Cauchy 准则 {@cauchy-integrale}：$\big|\int_x^y f\big| \le \int_x^y\abs f$，而后者可以任意小。这个证明对复值函数直接成立，不必拆成正部、负部或实部、虚部。

先设 $I = [a, b[$。

**第 1 步（翻译假设）**　$\int_a^b\abs f$ 收敛。由 Cauchy 准则（必要性），对 $\eps > 0$，存在 $c \in [a, b[$，使对 $c \le x \le y < b$，$\int_x^y\abs f < \eps$。

**第 2 步（$f$ 满足 Cauchy 准则）**　对 $x, y \in [c, b[$（不妨 $x \le y$），由闭区间上积分的三角不等式，
$$\Big|\int_x^y f\Big| \le \int_x^y\abs f < \eps.$$
由 Cauchy 准则（充分性），$\int_a^b f$ 收敛。

**第 3 步（不等式）**　对 $x \in [a, b[$，$\big|\int_a^x f\big| \le \int_a^x\abs f \le \int_a^b\abs f$（后一个不等式：$\int_a^x\abs f$ 递增趋于 $\int_a^b\abs f$，{@c6-positif-borne}）。令 $x \to b^-$，由模的连续性，$\big|\int_a^b f\big| \le \int_a^b\abs f$。

**第 4 步（其他区间）**　$]a, b]$ 的情形把 $x \to b^-$ 换成 $x \to a^+$，论证相同。对 $]a, b[$，在 $c$ 处分开，两半分别由前面的情形收敛，且 $\big|\int_a^c f + \int_c^b f\big| \le \int_a^c\abs f + \int_c^b\abs f = \int_a^b\abs f$。
:::

::: fr
▷ Méthode : on utilise le critère de Cauchy ({@fr:cauchy-integrale}) : $\big|\int_x^y f\big| \le \int_x^y\abs f$, et ce dernier est arbitrairement petit. La preuve vaut directement pour les fonctions complexes, sans passer par parties positive et négative ni parties réelle et imaginaire.

Supposons d'abord $I = [a, b[$.

**Étape 1 (on traduit l'hypothèse)**　$\int_a^b\abs f$ converge. D'après le critère de Cauchy (condition nécessaire), pour $\eps > 0$, il existe $c \in [a, b[$ tel que pour $c \le x \le y < b$, $\int_x^y\abs f < \eps$.

**Étape 2 ($f$ vérifie le critère de Cauchy)**　Pour $x, y \in [c, b[$ (disons $x \le y$), par l'inégalité triangulaire sur un segment,
$$\Big|\int_x^y f\Big| \le \int_x^y\abs f < \eps.$$
D'après le critère de Cauchy (condition suffisante), $\int_a^b f$ converge.

**Étape 3 (inégalité)**　Pour $x \in [a, b[$, $\big|\int_a^x f\big| \le \int_a^x\abs f \le \int_a^b\abs f$ (la seconde inégalité car $\int_a^x\abs f$ croît vers $\int_a^b\abs f$, {@fr:c6-positif-borne}). En faisant $x \to b^-$, par continuité du module, $\big|\int_a^b f\big| \le \int_a^b\abs f$.

**Étape 4 (autres intervalles)**　Pour $]a, b]$, on remplace $x \to b^-$ par $x \to a^+$. Pour $]a, b[$, on coupe en $c$ : les deux moitiés convergent d'après ce qui précède, et $\big|\int_a^c f + \int_c^b f\big| \le \int_a^c\abs f + \int_c^b\abs f = \int_a^b\abs f$.
:::

::: ex id=sinc zh="Dirichlet 积分的收敛性" lvl=1
$\int_0^{+\infty}\frac{\sin t}{t}\,\dd t$ 收敛但不绝对收敛。

**$0$ 处。** $\frac{\sin t}{t} \to 1$（$t \to 0^+$），所以在 $0$ 处是假问题（{@c6-faux-probleme}），$\int_0^1\frac{\sin t}{t}\,\dd t$ 收敛。只需讨论 $[1, +\infty[$。

**收敛。** 在 $[1, x]$ 上分部积分（$u = \frac1t$，$v' = \sin t$，$v = -\cos t$）：
$$\int_1^x \frac{\sin t}{t}\,\dd t = \Big[-\frac{\cos t}{t}\Big]_1^x - \int_1^x\frac{\cos t}{t^2}\,\dd t = \cos 1 - \frac{\cos x}{x} - \int_1^x\frac{\cos t}{t^2}\,\dd t.$$
$x \to +\infty$ 时，$\big|\frac{\cos x}{x}\big| \le \frac1x \to 0$；$\big|\frac{\cos t}{t^2}\big| \le \frac{1}{t^2}$，所以 $\int_1^{+\infty}\frac{\cos t}{t^2}\,\dd t$ 绝对收敛，从而收敛（{@integrable-convergente}）。右边有有限极限，所以左边收敛。

**不绝对收敛。** 对 $k \ge 1$，在 $[k\pi, (k+1)\pi]$ 上 $\frac1t \ge \frac{1}{(k+1)\pi}$，且 $\int_{k\pi}^{(k+1)\pi}\abs{\sin t}\,\dd t = 2$，所以
$$\int_\pi^{(N+1)\pi}\frac{\abs{\sin t}}{t}\,\dd t = \sum_{k=1}^N\int_{k\pi}^{(k+1)\pi}\frac{\abs{\sin t}}{t}\,\dd t \ge \frac2\pi\sum_{k=1}^N\frac{1}{k+1} \xrightarrow[N \to \infty]{} +\infty.$$
所以 $x \mapsto \int_\pi^x\frac{\abs{\sin t}}{t}\,\dd t$ 无界，由 {@c6-positif-borne}，$\int_\pi^{+\infty}\frac{\abs{\sin t}}{t}\,\dd t$ 发散。

其值为 $\frac{\pi}{2}$（Dirichlet 积分，第 7 章 {@dirichlet-integrale}）。
:::

::: thm id=c6-abel-integrales zh="积分的 Abel 判别法" en="Dirichlet's test for improper integrals" fr="Règle d'Abel pour les intégrales" ru="Признак Дирихле для несобственных интегралов" lvl=1
设 $f : [a, +\infty[ \to \K$ 连续，$g : [a, +\infty[ \to \R$ 是 $\Cc^1$ 的，且

1. $f$ 的积分有界：存在 $M \ge 0$，使对一切 $x \ge a$，$\Big|\int_a^x f\Big| \le M$；
2. $g$ 递减，且 $g(t) \to 0$（$t \to +\infty$）。

则 $\int_a^{+\infty} f\,g$ 收敛。
:::

::: fr
Soient $f : [a, +\infty[ \to \K$ continue et $g : [a, +\infty[ \to \R$ de classe $\Cc^1$ telles que

1. les intégrales de $f$ sont bornées : il existe $M \ge 0$ tel que pour tout $x \ge a$, $\Big|\int_a^x f\Big| \le M$ ;
2. $g$ est décroissante et $g(t) \to 0$ quand $t \to +\infty$.

Alors $\int_a^{+\infty} f\,g$ converge.
:::

::: proof
▷ 思路：令 $F(x) = \int_a^x f$，分部积分把 $\int fg$ 变成 $Fg$ 与 $\int Fg'$；前者趋于 $0$，后者绝对收敛，因为 $\abs{Fg'} \le M(-g')$，而 $\int(-g')$ 是望远镜式的。这是级数的 Dirichlet 判别法 {@dirichlet-series} 的连续版本（Abel 变换 ↔ 分部积分）。

**第 1 步（翻译假设）**　令 $F(x) = \int_a^x f$。$f$ 连续，所以 $F$ 是 $\Cc^1$ 的，$F' = f$，且 $\abs F \le M$。$g$ 递减趋于 $0$，所以 $g \ge 0$，$g' \le 0$。

**第 2 步（分部积分）**　对 $x \ge a$，
$$\int_a^x f\,g = \big[F g\big]_a^x - \int_a^x F\,g' = F(x)g(x) - \int_a^x F\,g'\qquad(F(a) = 0).$$

**第 3 步（边界项）**　$\abs{F(x)g(x)} \le M g(x) \to 0$（$x \to +\infty$）。

**第 4 步（积分项）**　$\abs{F g'} \le M(-g')$。而 $\int_a^x(-g') = g(a) - g(x) \to g(a)$，所以 $\int_a^{+\infty}(-g')$ 收敛（$-g' \ge 0$）。由 {@c6-l1-ev} 第 1 条，$Fg'$ 在 $[a, +\infty[$ 上可积；由 {@integrable-convergente}，$\int_a^x F g'$ 在 $x \to +\infty$ 时有有限极限。

由第 2–4 步，$\int_a^x f g$ 有有限极限，即 $\int_a^{+\infty} fg$ 收敛。
:::

::: fr
▷ Méthode : avec $F(x) = \int_a^x f$, une intégration par parties transforme $\int fg$ en $Fg$ et $\int Fg'$ ; le premier terme tend vers $0$, le second est absolument convergent car $\abs{Fg'} \le M(-g')$ et $\int(-g')$ est « télescopique ». C'est la version continue de la règle d'Abel pour les séries ({@fr:dirichlet-series}) : la transformation d'Abel devient l'intégration par parties.

**Étape 1 (on traduit les hypothèses)**　Posons $F(x) = \int_a^x f$. Comme $f$ est continue, $F$ est de classe $\Cc^1$, $F' = f$ et $\abs F \le M$. Comme $g$ décroît vers $0$, $g \ge 0$ et $g' \le 0$.

**Étape 2 (intégration par parties)**　Pour $x \ge a$,
$$\int_a^x f\,g = \big[F g\big]_a^x - \int_a^x F\,g' = F(x)g(x) - \int_a^x F\,g'\qquad(F(a) = 0).$$

**Étape 3 (terme de bord)**　$\abs{F(x)g(x)} \le M g(x) \to 0$ quand $x \to +\infty$.

**Étape 4 (terme intégral)**　$\abs{F g'} \le M(-g')$. Or $\int_a^x(-g') = g(a) - g(x) \to g(a)$, donc $\int_a^{+\infty}(-g')$ converge ($-g' \ge 0$). D'après le point 1 de {@fr:c6-l1-ev}, $Fg'$ est intégrable sur $[a, +\infty[$ ; d'après {@fr:integrable-convergente}, $\int_a^x F g'$ admet une limite finie quand $x \to +\infty$.

D'après les étapes 2 à 4, $\int_a^x f g$ admet une limite finie : $\int_a^{+\infty} fg$ converge.
:::

::: ex id=c6-ex-abel zh="$\int_1^{+\infty}\frac{\sin t}{t^\alpha}\,\dd t$" lvl=1
设 $\alpha > 0$。取 $f = \sin$，$g(t) = t^{-\alpha}$：$\big|\int_1^x\sin t\,\dd t\big| = \abs{\cos 1 - \cos x} \le 2$，$g$ 是 $\Cc^1$ 的、递减、趋于 $0$。由 {@c6-abel-integrales}，$\int_1^{+\infty}\frac{\sin t}{t^\alpha}\,\dd t$ **收敛**。

**绝对收敛当且仅当 $\alpha > 1$。** 若 $\alpha > 1$，$\frac{\abs{\sin t}}{t^\alpha} \le \frac{1}{t^\alpha}$，可积。若 $0 < \alpha \le 1$，对 $t \ge 1$，$t^\alpha \le t$，所以 $\frac{\abs{\sin t}}{t^\alpha} \ge \frac{\abs{\sin t}}{t}$，后者不可积（{@sinc}），由比较定理不可积。（$\alpha \le 0$ 时，$\frac{\sin t}{t^\alpha}$ 不趋于 $0$ 且在每个 $[2k\pi + \frac\pi6, 2k\pi + \frac{5\pi}6]$ 上 $\ge \frac12$，由 Cauchy 准则发散。）
:::

::: cex id=c6-cex-equiv-signe lvl=1
**比较定理第 3 条对变号函数不成立。** 在 $[1, +\infty[$ 上令
$$u(t) = \frac{\sin t}{\sqrt t},\qquad v(t) = \frac{\sin t}{\sqrt t} + \frac{\sin^2 t}{t} = u(t)\Big(1 + \frac{\sin t}{\sqrt t}\Big).$$
因为 $\frac{\sin t}{\sqrt t} \to 0$，$v \sim u$（$t \to +\infty$）。$\int_1^{+\infty}u$ 收敛（{@c6-ex-abel}，$\alpha = \frac12$）。但 $\frac{\sin^2 t}{t} = \frac{1}{2t} - \frac{\cos 2t}{2t}$，其中 $\int_1^{+\infty}\frac{\cos 2t}{2t}\,\dd t$ 收敛（{@c6-abel-integrales}，$f(t) = \cos 2t$），$\int_1^{+\infty}\frac{\dd t}{2t}$ 发散，所以 $\int_1^{+\infty}\frac{\sin^2 t}{t}\,\dd t$ 发散（{@c6-proprietes} 第 3 条），$\int_1^{+\infty}v = \int u + \int\frac{\sin^2 t}{t}$ 也发散。这是级数反例 {@cex-equiv-signe} 的积分版本。
:::

::: cex id=c6-cex-produit lvl=1
**可积函数的乘积不一定可积；$L^1$ 与「平方可积」互不包含。**

1. $f(t) = \frac{1}{\sqrt t}$ 在 $]0, 1]$ 上可积（$\alpha = \frac12 < 1$），但 $f^2 = \frac1t$ 在 $]0, 1]$ 上不可积。
2. $g(t) = \frac1t$ 在 $[1, +\infty[$ 上不可积，但 $g^2 = \frac{1}{t^2}$ 可积。

（若 $f$ 可积且**有界**，$\abs f \le M$，则 $\abs f^2 \le M\abs f$，由 {@c6-l1-ev} 第 1 条，$f^2$ 可积。）
:::

::: q
（第 5 章 Riemann–Lebesgue 引理在无界区间上的版本）设 $g$ 在 $[0, +\infty[$ 上可积。证明 $\int_0^{+\infty} g(t)\,\e^{\ii\lambda t}\,\dd t \to 0$（$\lambda \to \pm\infty$）。
:::

::: ans
$\abs{g(t)\e^{\ii\lambda t}} = \abs{g(t)}$，所以积分绝对收敛（{@integrable-convergente}）。设 $\eps > 0$。由 {@c6-positif-borne}，$\int_0^A\abs g \to \int_0^{+\infty}\abs g$，所以可取 $A > 0$ 使 $\int_A^{+\infty}\abs g \le \eps$。于是
$$\Big|\int_0^{+\infty} g\,\e^{\ii\lambda t}\Big| \le \Big|\int_0^A g\,\e^{\ii\lambda t}\Big| + \int_A^{+\infty}\abs g \le \Big|\int_0^A g\,\e^{\ii\lambda t}\Big| + \eps.$$
由 {@riemann-lebesgue}（闭区间 $[0, A]$），第一项在 $\abs\lambda$ 充分大时 $\le \eps$。所以 $\abs\lambda$ 充分大时整个积分 $\le 2\eps$。这里「截断」是处理无界区间的标准手法：先用可积性把尾部变小，再在闭区间上用已知结论。
:::

## 分部积分与变量替换

计算广义积分的两个基本工具与闭区间上相同，只是多了一步取极限。实践中最安全的做法是：**先在闭子区间上做分部积分或换元，再取极限**；下面两个定理把这个过程一次性写好。本节最后用它们研究 Euler 的 $\Gamma$ 函数。

::: thm id=ipp-generalisee zh="广义分部积分" en="Integration by parts on an interval" fr="Intégration par parties généralisée" ru="Интегрирование по частям в несобственном интеграле" lvl=1
设 $u, v \in \Cc^1(]a, b[)$（$-\infty \le a < b \le +\infty$），且 $uv$ 在 $a^+$ 和 $b^-$ 处有有限极限。则 $\int_a^b u'v$ 与 $\int_a^b uv'$ 同敛散，收敛时
$$\int_a^b u'v = \big[uv\big]_a^b - \int_a^b uv',\qquad \big[uv\big]_a^b = \lim_{b^-} uv - \lim_{a^+} uv.$$
:::

::: fr
Soient $u, v \in \Cc^1(]a, b[)$ ($-\infty \le a < b \le +\infty$) telles que $uv$ admette des limites finies en $a^+$ et en $b^-$. Alors $\int_a^b u'v$ et $\int_a^b uv'$ sont de même nature et, en cas de convergence,
$$\int_a^b u'v = \big[uv\big]_a^b - \int_a^b uv',\qquad \big[uv\big]_a^b = \lim_{b^-} uv - \lim_{a^+} uv.$$
:::

::: proof
▷ 思路：在闭子区间上做普通的分部积分，然后让端点趋于 $a$、$b$。边界项有极限，所以另外两项「同时有极限或同时没有」。

固定 $c \in\, ]a, b[$，记 $L_a = \lim_{a^+}uv$，$L_b = \lim_{b^-}uv$。$u'v$ 与 $uv'$ 在 $]a, b[$ 上连续。

**第 1 步（$a$ 端）**　对 $x \in\, ]a, c]$，由闭区间上的分部积分，
$$\int_x^c u'v = u(c)v(c) - u(x)v(x) - \int_x^c uv'.$$
$x \to a^+$ 时 $u(x)v(x) \to L_a$，所以 $\int_x^c u'v$ 有有限极限当且仅当 $\int_x^c uv'$ 有，即 $\int_a^c u'v$ 与 $\int_a^c uv'$ 同敛散；收敛时 $\int_a^c u'v = u(c)v(c) - L_a - \int_a^c uv'$。

**第 2 步（$b$ 端）**　把第 1 步中的 $[x, c]$ 换成 $[c, y]$（$y \to b^-$），得到 $\int_c^b u'v$ 与 $\int_c^b uv'$ 同敛散，收敛时 $\int_c^b u'v = L_b - u(c)v(c) - \int_c^b uv'$。

**第 3 步（合并）**　由定义 {@def-integrale-generalisee}，$\int_a^b u'v$ 收敛当且仅当两半都收敛，对 $uv'$ 也一样；由第 1、2 步，两者同敛散。收敛时把两式相加，$u(c)v(c)$ 抵消，得 $\int_a^b u'v = L_b - L_a - \int_a^b uv'$。
:::

::: fr
▷ Méthode : on intègre par parties sur un segment, puis on fait tendre les bornes vers $a$ et $b$. Le terme de bord ayant une limite, les deux autres termes ont une limite « en même temps ».

Fixons $c \in\, ]a, b[$ et notons $L_a = \lim_{a^+}uv$, $L_b = \lim_{b^-}uv$. Les fonctions $u'v$ et $uv'$ sont continues sur $]a, b[$.

**Étape 1 (extrémité $a$)**　Pour $x \in\, ]a, c]$, l'intégration par parties sur un segment donne
$$\int_x^c u'v = u(c)v(c) - u(x)v(x) - \int_x^c uv'.$$
Quand $x \to a^+$, $u(x)v(x) \to L_a$ ; donc $\int_x^c u'v$ a une limite finie si et seulement si $\int_x^c uv'$ en a une : $\int_a^c u'v$ et $\int_a^c uv'$ sont de même nature, et en cas de convergence $\int_a^c u'v = u(c)v(c) - L_a - \int_a^c uv'$.

**Étape 2 (extrémité $b$)**　En remplaçant $[x, c]$ par $[c, y]$ ($y \to b^-$), on obtient que $\int_c^b u'v$ et $\int_c^b uv'$ sont de même nature et, en cas de convergence, $\int_c^b u'v = L_b - u(c)v(c) - \int_c^b uv'$.

**Étape 3 (recollement)**　Par définition ({@fr:def-integrale-generalisee}), $\int_a^b u'v$ converge si et seulement si ses deux moitiés convergent, et de même pour $uv'$ ; d'après les étapes 1 et 2, les deux intégrales sont de même nature. En cas de convergence, on additionne : $u(c)v(c)$ disparaît et $\int_a^b u'v = L_b - L_a - \int_a^b uv'$.
:::

::: rem
**边界项的假设不能去掉。** 在 $[0, +\infty[$ 上取 $u = \sin$，$v = 1$：$\int_0^{+\infty}uv' = \int_0^{+\infty}0 = 0$ 收敛，而 $\int_0^{+\infty}u'v = \int_0^{+\infty}\cos t\,\dd t$ 发散；这里 $uv = \sin$ 在 $+\infty$ 处没有极限。实践中，若不确定边界项是否收敛，就回到闭区间 $[x, y]$ 上写出等式，再逐项讨论极限（如 {@sinc}）。
:::

::: thm id=changement-variable-gen zh="广义变量替换" en="Change of variables" fr="Changement de variable" ru="Замена переменной в несобственном интеграле" lvl=1
设 $\varphi : ]\alpha, \beta[ \to ]a, b[$ 是 $\Cc^1$ 的严格单调双射，$f$ 在 $]a, b[$ 上分段连续。则 $\int_a^b f(t)\,\dd t$ 与 $\int_\alpha^\beta f(\varphi(u))\abs{\varphi'(u)}\,\dd u$ 同敛散，收敛时相等。
:::

::: fr
Soit $\varphi : ]\alpha, \beta[ \to ]a, b[$ une bijection strictement monotone de classe $\Cc^1$, et $f$ continue par morceaux sur $]a, b[$. Alors $\int_a^b f(t)\,\dd t$ et $\int_\alpha^\beta f(\varphi(u))\abs{\varphi'(u)}\,\dd u$ sont de même nature et égales en cas de convergence.
:::

::: proof
▷ 思路：在闭子区间上用 L1 的换元公式，再取极限。$\varphi$ 是连续的严格单调双射，它的逆 $\varphi^{-1}$ 也是，所以「$u \to \beta^-$」与「$t = \varphi(u)$ 趋于对应的端点」是一回事；绝对值处理了递减的情形。

固定 $\gamma \in\, ]\alpha, \beta[$，令 $c = \varphi(\gamma)$。

**情形 1（$\varphi$ 递增）**　此时 $\varphi(u) \to b^-$（$u \to \beta^-$），$\varphi(u) \to a^+$（$u \to \alpha^+$），对 $\varphi^{-1}$ 也有相应的结论（单调双射在端点处的极限是端点），且 $\abs{\varphi'} = \varphi'$。

1. **闭区间上的公式**：对 $y \in [\gamma, \beta[$，$\int_c^{\varphi(y)} f(t)\,\dd t = \int_\gamma^y f(\varphi(u))\varphi'(u)\,\dd u$。（L1 的换元公式；$f$ 分段连续时，在 $f$ 的间断点处分开，它们在 $\varphi$ 下的原像也只有有限个。）
2. **(⇐)** 设 $\int_\gamma^\beta f(\varphi)\varphi'$ 收敛于 $L$。对 $t \in [c, b[$，令 $y = \varphi^{-1}(t)$；$t \to b^-$ 时 $y \to \beta^-$，由 1 与复合函数的极限，$\int_c^t f = \int_\gamma^{\varphi^{-1}(t)} f(\varphi)\varphi' \to L$。
3. **(⇒)** 设 $\int_c^b f$ 收敛于 $L'$。$y \to \beta^-$ 时 $\varphi(y) \to b^-$，由 1，$\int_\gamma^y f(\varphi)\varphi' = \int_c^{\varphi(y)} f \to L'$。
4. **$a$ 端**：把 $[\gamma, y]$ 换成 $[x, \gamma]$（$x \to \alpha^+$），论证相同。两端合并即得结论。

**情形 2（$\varphi$ 递减）**　此时 $\varphi(u) \to a^+$（$u \to \beta^-$），$\varphi(u) \to b^-$（$u \to \alpha^+$），$\abs{\varphi'} = -\varphi'$。对 $y \in [\gamma, \beta[$，L1 的换元公式给出
$$\int_{\varphi(y)}^{c} f(t)\,\dd t = -\int_\gamma^y f(\varphi(u))\varphi'(u)\,\dd u = \int_\gamma^y f(\varphi(u))\abs{\varphi'(u)}\,\dd u,$$
所以 $\int_a^c f$ 与 $\int_\gamma^\beta f(\varphi)\abs{\varphi'}$ 同敛散且相等（与情形 1 的第 2、3 步相同）；$b$ 端与 $\int_\alpha^\gamma$ 对应。两端合并即得结论。
:::

::: fr
▷ Méthode : on applique la formule de changement de variable de L1 sur un segment, puis on passe à la limite. $\varphi$ est une bijection continue strictement monotone, de même que $\varphi^{-1}$, donc « $u \to \beta^-$ » équivaut à « $t = \varphi(u)$ tend vers l'extrémité correspondante » ; la valeur absolue traite le cas décroissant.

Fixons $\gamma \in\, ]\alpha, \beta[$ et posons $c = \varphi(\gamma)$.

**Cas 1 ($\varphi$ croissante)**　Alors $\varphi(u) \to b^-$ quand $u \to \beta^-$ et $\varphi(u) \to a^+$ quand $u \to \alpha^+$, et de même pour $\varphi^{-1}$ (une bijection monotone a pour limites aux bornes les bornes de l'intervalle image) ; de plus $\abs{\varphi'} = \varphi'$.

1. **Formule sur un segment** : pour $y \in [\gamma, \beta[$, $\int_c^{\varphi(y)} f(t)\,\dd t = \int_\gamma^y f(\varphi(u))\varphi'(u)\,\dd u$. (Formule de L1 ; si $f$ est seulement continue par morceaux, on découpe aux points de discontinuité de $f$, dont les antécédents par $\varphi$ sont en nombre fini.)
2. **(⇐)** Supposons que $\int_\gamma^\beta f(\varphi)\varphi'$ converge vers $L$. Pour $t \in [c, b[$, posons $y = \varphi^{-1}(t)$ ; quand $t \to b^-$, $y \to \beta^-$, donc, d'après 1 et par composition des limites, $\int_c^t f = \int_\gamma^{\varphi^{-1}(t)} f(\varphi)\varphi' \to L$.
3. **(⇒)** Supposons que $\int_c^b f$ converge vers $L'$. Quand $y \to \beta^-$, $\varphi(y) \to b^-$, donc d'après 1, $\int_\gamma^y f(\varphi)\varphi' = \int_c^{\varphi(y)} f \to L'$.
4. **Extrémité $a$** : on remplace $[\gamma, y]$ par $[x, \gamma]$ ($x \to \alpha^+$), avec le même argument. On recolle les deux extrémités.

**Cas 2 ($\varphi$ décroissante)**　Alors $\varphi(u) \to a^+$ quand $u \to \beta^-$, $\varphi(u) \to b^-$ quand $u \to \alpha^+$, et $\abs{\varphi'} = -\varphi'$. Pour $y \in [\gamma, \beta[$, la formule de L1 donne
$$\int_{\varphi(y)}^{c} f(t)\,\dd t = -\int_\gamma^y f(\varphi(u))\varphi'(u)\,\dd u = \int_\gamma^y f(\varphi(u))\abs{\varphi'(u)}\,\dd u,$$
donc $\int_a^c f$ et $\int_\gamma^\beta f(\varphi)\abs{\varphi'}$ sont de même nature et égales (mêmes étapes 2 et 3 que dans le cas 1) ; l'extrémité $b$ correspond à $\int_\alpha^\gamma$. On recolle les deux extrémités.
:::

::: ex id=c6-ex-changement zh="换元的四个例子" lvl=1
1. **$\int_0^1\frac{\dd t}{\sqrt{1 - t^2}} = \frac\pi2$。** $\varphi(u) = \sin u$ 是 $]0, \frac\pi2[ \to ]0, 1[$ 的 $\Cc^1$ 递增双射，$\frac{\varphi'(u)}{\sqrt{1 - \sin^2 u}} = \frac{\cos u}{\cos u} = 1$（$\cos u > 0$）。所以积分 $= \int_0^{\pi/2}1\,\dd u = \frac\pi2$。
2. **$\int_0^1\frac{\dd t}{\sqrt{t(1-t)}} = \pi$。** $\varphi(\theta) = \sin^2\theta$ 是 $]0, \frac\pi2[ \to ]0, 1[$ 的 $\Cc^1$ 递增双射，$\varphi'(\theta) = 2\sin\theta\cos\theta$，$\sqrt{\varphi(1 - \varphi)} = \sin\theta\cos\theta$，被积函数变为 $2$，积分 $= \int_0^{\pi/2}2\,\dd\theta = \pi$。
3. **$\int_0^{+\infty}\e^{-\sqrt t}\,\dd t = 2$。** $\varphi(u) = u^2$ 是 $]0, +\infty[$ 到自身的 $\Cc^1$ 递增双射：积分 $= \int_0^{+\infty}2u\,\e^{-u}\,\dd u$。由 {@ipp-generalisee}（$u \mapsto -2u\e^{-u}$ 在 $0$ 与 $+\infty$ 处的极限都是 $0$），$\int_0^{+\infty}2u\,\e^{-u}\,\dd u = \int_0^{+\infty}2\,\e^{-u}\,\dd u = 2$。
4. **$\int_0^{+\infty}\frac{\ln t}{1 + t^2}\,\dd t = 0$。** 先证收敛：在 $0$ 处 $\big|\frac{\ln t}{1 + t^2}\big| \le \abs{\ln t}$，可积（{@riemann-integrales}）；在 $+\infty$ 处 $0 \le \frac{\ln t}{1 + t^2} \le \frac{\ln t}{t^2}$，可积（{@c6-ex-comparaison}）。记积分为 $I$。$\varphi(u) = \frac1u$ 是 $]0, +\infty[$ 到自身的 $\Cc^1$ 递减双射，$\abs{\varphi'(u)} = \frac{1}{u^2}$：
   $$I = \int_0^{+\infty}\frac{\ln(1/u)}{1 + 1/u^2}\cdot\frac{\dd u}{u^2} = \int_0^{+\infty}\frac{-\ln u}{u^2 + 1}\,\dd u = -I,$$
   所以 $I = 0$。
:::

::: rem
**先证收敛，再换元。** 第 4 例中「$I = -I$，所以 $I = 0$」的论证要求 $I$ 是一个数。若不先证收敛，同样的换元 $t = -u$ 会「证明」$\int_{-\infty}^{+\infty}t\,\dd t = 0$，而这个积分发散（§1 的反例）。
:::

::: q
证明 $\int_0^{+\infty}\sin(t^2)\,\dd t$ 收敛，尽管 $\sin(t^2)$ 在 $+\infty$ 处不趋于 $0$。这与 Barbălat 引理 {@c6-barbalat} 矛盾吗？
:::

::: ans
在 $[0, 1]$ 上被积函数连续，没有问题。在 $[1, +\infty[$ 上，$\varphi(u) = \sqrt u$ 是 $]1, +\infty[$ 到自身的 $\Cc^1$ 递增双射，$\varphi'(u) = \frac{1}{2\sqrt u}$，由 {@changement-variable-gen}，$\int_1^{+\infty}\sin(t^2)\,\dd t$ 与 $\int_1^{+\infty}\frac{\sin u}{2\sqrt u}\,\dd u$ 同敛散；后者由 {@c6-ex-abel}（$\alpha = \frac12$）收敛。另一方面，$t_k = \sqrt{\frac\pi2 + 2k\pi} \to +\infty$ 处 $\sin(t_k^2) = 1$，所以 $\sin(t^2) \not\to 0$。不矛盾：$\sin(t^2)$ 在 $[0, +\infty[$ 上**不**一致连续（$t^2$ 增加 $\frac\pi2$ 时 $\sin(t^2)$ 从 $0$ 变到 $1$，对应的 $t$ 的增量约为 $\frac{\pi}{4t} \to 0$）。这个积分（Fresnel 积分）的值是 $\sqrt{\pi/8}$，用复分析计算。
:::

::: def id=def-gamma zh="Γ 函数" en="Gamma function" fr="Fonction Gamma d'Euler" ru="Гамма-функция Эйлера"
对 $x > 0$，
$$\Gamma(x) = \int_0^{+\infty} t^{x-1}\e^{-t}\,\dd t.$$
（积分对 $x > 0$ 收敛，见 {@c6-gamma-definie}。）

白话：$\Gamma$ 把阶乘 $n \mapsto n!$ 「插值」成 $]0, +\infty[$ 上的光滑函数（{@gamma-factorielle}）。
:::

::: fr
Pour $x > 0$,
$$\Gamma(x) = \int_0^{+\infty} t^{x-1}\e^{-t}\,\dd t.$$
(L'intégrale converge pour $x > 0$, cf. {@fr:c6-gamma-definie}.)

Autrement dit, $\Gamma$ « interpole » la factorielle $n \mapsto n!$ par une fonction régulière sur $]0, +\infty[$ ({@fr:gamma-factorielle}).
:::

::: prop id=c6-gamma-definie zh="Γ 积分的收敛域" en="Domain of convergence of the Gamma integral" fr="Domaine de définition de Γ" ru="Область сходимости интеграла для гамма-функции" lvl=1
对 $x \in \R$，$\int_0^{+\infty}t^{x-1}\e^{-t}\,\dd t$ 收敛当且仅当 $x > 0$。
:::

::: fr
Pour $x \in \R$, l'intégrale $\int_0^{+\infty}t^{x-1}\e^{-t}\,\dd t$ converge si et seulement si $x > 0$.
:::

::: proof
▷ 思路：被积函数在 $]0, +\infty[$ 上连续且为正，有两个问题点，在 $1$ 处分开：$0$ 处与 $t^{x-1}$ 比较（这里决定 $x > 0$），$+\infty$ 处 $\e^{-t}$ 压倒一切幂次。

记 $h(t) = t^{x-1}\e^{-t} > 0$。

**第 1 步（$0$ 处）**　$\e^{-t} \to 1$（$t \to 0^+$），所以 $h(t) \sim t^{x-1} = \frac{1}{t^{1-x}}$。由 {@riemann-integrales}，$\int_0^1\frac{\dd t}{t^{1-x}}$ 收敛当且仅当 $1 - x < 1$，即 $x > 0$。由比较定理第 3 条，$\int_0^1 h$ 收敛当且仅当 $x > 0$。

**第 2 步（$+\infty$ 处）**　$t^2h(t) = t^{x+1}\e^{-t} \to 0$（指数压倒幂次），所以 $h(t) = O\big(\frac{1}{t^2}\big)$。$\int_1^{+\infty}\frac{\dd t}{t^2}$ 收敛，由比较定理第 2 条，$\int_1^{+\infty} h$ 对一切 $x$ 收敛。

由定义 {@def-integrale-generalisee}，$\int_0^{+\infty} h$ 收敛当且仅当两半都收敛，即 $x > 0$。
:::

::: fr
▷ Méthode : l'intégrande est continue et strictement positive sur $]0, +\infty[$, avec deux bornes impropres ; on coupe en $1$. En $0$, on compare à $t^{x-1}$ (c'est là que se joue la condition $x > 0$) ; en $+\infty$, l'exponentielle l'emporte sur toute puissance.

Notons $h(t) = t^{x-1}\e^{-t} > 0$.

**Étape 1 (en $0$)**　$\e^{-t} \to 1$ quand $t \to 0^+$, donc $h(t) \sim t^{x-1} = \frac{1}{t^{1-x}}$. D'après {@fr:riemann-integrales}, $\int_0^1\frac{\dd t}{t^{1-x}}$ converge si et seulement si $1 - x < 1$, c'est-à-dire $x > 0$. D'après le point 3 du théorème de comparaison, $\int_0^1 h$ converge si et seulement si $x > 0$.

**Étape 2 (en $+\infty$)**　$t^2h(t) = t^{x+1}\e^{-t} \to 0$ (croissances comparées), donc $h(t) = O\big(\frac{1}{t^2}\big)$. Comme $\int_1^{+\infty}\frac{\dd t}{t^2}$ converge, le point 2 du théorème de comparaison montre que $\int_1^{+\infty} h$ converge pour tout $x$.

Par définition ({@fr:def-integrale-generalisee}), $\int_0^{+\infty} h$ converge si et seulement si les deux moitiés convergent, c'est-à-dire si et seulement si $x > 0$.
:::

::: prop id=gamma-factorielle zh="Γ 函数与阶乘" en="Gamma and the factorial" fr="Fonction Γ et factorielle" ru="Гамма-функция и факториал" lvl=1
对 $x > 0$，$\Gamma(x + 1) = x\,\Gamma(x)$；$\Gamma(1) = 1$；从而对 $n \in \N$，$\Gamma(n + 1) = n!$。
:::

::: fr
Pour $x > 0$, $\Gamma(x + 1) = x\,\Gamma(x)$ ; $\Gamma(1) = 1$ ; par conséquent, pour $n \in \N$, $\Gamma(n + 1) = n!$.
:::

::: proof
▷ 思路：对 $t^x\e^{-t}$ 用广义分部积分，把 $t^x$ 求导；边界项在两端都为 $0$。

**第 1 步（分部积分）**　设 $x > 0$。在 $]0, +\infty[$ 上取 $u(t) = -\e^{-t}$，$v(t) = t^x$，都是 $\Cc^1$ 的，$u'v = t^x\e^{-t}$，$uv' = -x\,t^{x-1}\e^{-t}$。

**第 2 步（边界项）**　$uv = -t^x\e^{-t}$：$t \to 0^+$ 时 $\to 0$（因为 $x > 0$）；$t \to +\infty$ 时 $\to 0$（指数压倒幂次）。所以 $\big[uv\big]_0^{+\infty} = 0$。

**第 3 步（应用 {@ipp-generalisee}）**　$\int_0^{+\infty}uv' = -x\,\Gamma(x)$ 收敛（{@c6-gamma-definie}），所以 $\int_0^{+\infty}u'v$ 也收敛，且
$$\Gamma(x + 1) = \int_0^{+\infty}t^x\e^{-t}\,\dd t = 0 - \int_0^{+\infty}\big(-x\,t^{x-1}\e^{-t}\big)\,\dd t = x\,\Gamma(x).$$

**第 4 步（阶乘）**　$\Gamma(1) = \int_0^{+\infty}\e^{-t}\,\dd t = 1$（{@riemann-integrales}）。**初始化**：$\Gamma(0 + 1) = 1 = 0!$。**递推**：若 $\Gamma(n) = (n-1)!$（$n \ge 1$），则 $\Gamma(n + 1) = n\,\Gamma(n) = n!$。
:::

::: fr
▷ Méthode : intégration par parties généralisée sur $t^x\e^{-t}$, en dérivant $t^x$ ; le terme de bord est nul aux deux extrémités.

**Étape 1 (intégration par parties)**　Soit $x > 0$. Sur $]0, +\infty[$, posons $u(t) = -\e^{-t}$ et $v(t) = t^x$, de classe $\Cc^1$, avec $u'v = t^x\e^{-t}$ et $uv' = -x\,t^{x-1}\e^{-t}$.

**Étape 2 (terme de bord)**　$uv = -t^x\e^{-t}$ tend vers $0$ quand $t \to 0^+$ (car $x > 0$) et quand $t \to +\infty$ (croissances comparées). Donc $\big[uv\big]_0^{+\infty} = 0$.

**Étape 3 (application de {@fr:ipp-generalisee})**　$\int_0^{+\infty}uv' = -x\,\Gamma(x)$ converge ({@fr:c6-gamma-definie}), donc $\int_0^{+\infty}u'v$ converge aussi et
$$\Gamma(x + 1) = \int_0^{+\infty}t^x\e^{-t}\,\dd t = 0 - \int_0^{+\infty}\big(-x\,t^{x-1}\e^{-t}\big)\,\dd t = x\,\Gamma(x).$$

**Étape 4 (factorielle)**　$\Gamma(1) = \int_0^{+\infty}\e^{-t}\,\dd t = 1$ ({@fr:riemann-integrales}). **Initialisation** : $\Gamma(0 + 1) = 1 = 0!$. **Hérédité** : si $\Gamma(n) = (n-1)!$ ($n \ge 1$), alors $\Gamma(n + 1) = n\,\Gamma(n) = n!$.
:::

::: ex id=c6-ex-gamma-demi zh="$\Gamma(\frac12) = \sqrt\pi$" lvl=1
$\varphi(u) = u^2$ 是 $]0, +\infty[$ 到自身的 $\Cc^1$ 递增双射。由 {@changement-variable-gen} 和 Gauss 积分 {@gauss}，
$$\Gamma\big(\tfrac12\big) = \int_0^{+\infty}t^{-1/2}\e^{-t}\,\dd t = \int_0^{+\infty}u^{-1}\e^{-u^2}\cdot 2u\,\dd u = 2\int_0^{+\infty}\e^{-u^2}\,\dd u = \sqrt\pi.$$
由 {@gamma-factorielle} 反复使用 $\Gamma(x + 1) = x\Gamma(x)$：
$$\Gamma\big(n + \tfrac12\big) = \Big(n - \tfrac12\Big)\Big(n - \tfrac32\Big)\cdots\tfrac12\,\Gamma\big(\tfrac12\big) = \frac{1\cdot 3\cdots(2n-1)}{2^n}\sqrt\pi = \frac{(2n)!}{4^n\,n!}\sqrt\pi.$$
（最后一步：$1\cdot 3\cdots(2n - 1) = \frac{(2n)!}{2\cdot 4\cdots 2n} = \frac{(2n)!}{2^n n!}$。）例如 $\Gamma(\frac32) = \frac{\sqrt\pi}{2}$。
:::

::: q
求 $\int_0^1(\ln t)^n\,\dd t$（$n \in \N$）。
:::

::: ans
$\varphi(u) = \e^{-u}$ 是 $]0, +\infty[ \to ]0, 1[$ 的 $\Cc^1$ 递减双射，$\abs{\varphi'(u)} = \e^{-u}$，$\ln\varphi(u) = -u$。由 {@changement-variable-gen} 和 {@gamma-factorielle}，
$$\int_0^1(\ln t)^n\,\dd t = \int_0^{+\infty}(-u)^n\e^{-u}\,\dd u = (-1)^n\,\Gamma(n + 1) = (-1)^n\,n!.$$
（收敛性也由换元定理一并得到。）$n = 1$ 时为 $-1$，与 {@riemann-integrales} 一致。
:::

## 控制收敛与逐项积分

第 3 章的 {@integration-unif} 要求闭区间和一致收敛；在无界区间上，或只有逐点收敛时，结论可能失败（{@cex-bosse}）。以下两个定理来自 Lebesgue 积分论。法国 MP 大纲把它们作为**已承认的定理**使用（théorèmes admis），因为它们的证明需要测度论，但它们的应用完全不需要。使用时的关键只有一点：找到一个**与 $n$ 无关**的可积控制函数。

::: thm id=cv-dominee zh="控制收敛定理" en="Dominated convergence theorem" fr="Théorème de convergence dominée" ru="Теорема Лебега о мажорированной сходимости" lvl=3 ref="L3 积分论；Rudin, *Real and Complex Analysis*，定理 1.34；Briane–Pagès, *Théorie de l'intégration*"
设 $(f_n)$ 是 $I$ 上分段连续的函数列，满足：

1. $(f_n)$ 在 $I$ 上逐点收敛到分段连续的函数 $f$；
2. （控制条件）存在 $I$ 上可积的非负函数 $\varphi$，使 $\abs{f_n} \le \varphi$ 对一切 $n$ 成立（$\varphi$ 不依赖于 $n$）。

则 $f_n$、$f$ 都在 $I$ 上可积，且
$$\int_I f_n \xrightarrow[n \to \infty]{} \int_I f.$$
:::

::: fr
Soit $(f_n)$ une suite de fonctions continues par morceaux sur $I$ telle que :

1. $(f_n)$ converge simplement sur $I$ vers une fonction $f$ continue par morceaux ;
2. (hypothèse de domination) il existe une fonction $\varphi$ positive et intégrable sur $I$ telle que $\abs{f_n} \le \varphi$ pour tout $n$ ($\varphi$ ne dépend pas de $n$).

Alors les $f_n$ et $f$ sont intégrables sur $I$ et
$$\int_I f_n \xrightarrow[n \to \infty]{} \int_I f.$$
:::

::: rem
1. **与 {@integration-unif} 比较。** 这里只需要**逐点**收敛，区间可以是无界的；代价是需要一个可积的控制函数。在法国教材中，这是讨论「极限与积分交换」最常用的工具。第 7 章会把它推广到连续参数。
2. **「$f$ 分段连续」在本章的框架里不能省。** 令 $f_n$ 为 $\{\frac pq \in [0, 1] : 1 \le q \le n\}$（有限集）的指示函数，它们分段连续，$\abs{f_n} \le 1$，逐点收敛到 $\mathbf{1}_{\Q \cap [0, 1]}$；后者不是分段连续的，甚至不是 Riemann 可积的，「$\int f$」在本章没有意义。（Lebesgue 理论中它的积分为 $0$，与 $\int f_n = 0$ 一致。）
3. **可积性的部分是容易的。** 由 $\abs{f_n} \le \varphi$ 和 {@c6-l1-ev}，每个 $f_n$ 可积；令 $n \to \infty$ 得 $\abs f \le \varphi$，所以 $f$ 也可积。已承认的只是积分的收敛。
:::

::: ex id=ex-cv-dominee zh="$\int_0^n(1 - \frac tn)^n\,\dd t \to 1$" lvl=1
求 $\lim_{n \to \infty}\int_0^n\Big(1 - \frac tn\Big)^n\,\dd t$。

**第 1 步（化为固定区间）**　令 $f_n(t) = (1 - \frac tn)^n\mathbf{1}_{[0,n]}(t)$，$t \in [0, +\infty[$。在 $t = n$ 处两边的值都是 $0$，所以 $f_n$ 在 $[0, +\infty[$ 上连续，且 $\int_0^{+\infty}f_n = \int_0^n(1 - \frac tn)^n\,\dd t$。

**第 2 步（逐点极限）**　固定 $t \ge 0$。对 $n > t$，$f_n(t) = \exp\big(n\ln(1 - \frac tn)\big)$，而 $n\ln(1 - \frac tn) = n\big(-\frac tn + o(\frac1n)\big) \to -t$，所以 $f_n(t) \to \e^{-t}$。

**第 3 步（控制）**　对 $u \in [0, 1[$，$\ln(1 - u) \le -u$（凹函数在切线下方）。所以对 $t \in [0, n[$，$f_n(t) = \exp\big(n\ln(1 - \frac tn)\big) \le \exp(-t)$；对 $t \ge n$，$f_n(t) = 0 \le \e^{-t}$。于是 $0 \le f_n \le \varphi$，$\varphi(t) = \e^{-t}$ 在 $[0, +\infty[$ 上可积，且与 $n$ 无关。

**第 4 步（结论）**　由控制收敛定理，极限为 $\int_0^{+\infty}\e^{-t}\,\dd t = 1$。

（验证：换元 $t = nu$ 给出精确值 $\int_0^n(1 - \frac tn)^n\,\dd t = n\int_0^1(1 - u)^n\,\dd u = \frac{n}{n+1} \to 1$。）
:::

::: cex id=cex-domination lvl=1
**控制条件不能省略。** 在 $]0, 1]$ 上令 $f_n = n\,\mathbf{1}_{]0, 1/n]}$（分段连续）。

1. **逐点收敛到 $0$**：固定 $t \in\, ]0, 1]$，对 $n > \frac1t$，$t \notin\, ]0, \frac1n]$，$f_n(t) = 0$。
2. **积分不收敛到 $0$**：$\int_0^1 f_n = n\cdot\frac1n = 1$ 对一切 $n$ 成立。
3. **没有可积的控制函数**：若 $\abs{f_n} \le \varphi$ 对一切 $n$ 成立，则 $\varphi(t) \ge \sup_n f_n(t)$。对 $t \in\, ]0, 1]$，令 $n = E(\frac1t) \ge 1$，则 $\frac1n \ge t$，$f_n(t) = n$；又 $E(y) \ge \frac y2$ 对 $y \ge 1$ 成立（$1 \le y < 2$ 时 $E(y) = 1 \ge \frac y2$；$y \ge 2$ 时 $E(y) > y - 1 \ge \frac y2$）。所以 $\varphi(t) \ge \frac{1}{2t}$，由比较定理与 {@riemann-integrales}，$\varphi$ 在 $]0, 1]$ 上不可积。

{@cex-bosse} 也是同样的现象：质量集中在越来越窄的区间上，「逃逸」到边界。
:::

::: thm id=integration-terme-a-terme zh="逐项积分定理" en="Term-by-term integration theorem" fr="Théorème d'intégration terme à terme" ru="Теорема о почленном интегрировании ряда" lvl=3 ref="L3 积分论（单调收敛定理的推论）；Rudin, *Real and Complex Analysis*，定理 1.38"
设 $f_n$ 在 $I$ 上分段连续且可积，$\sum f_n$ 逐点收敛到分段连续的函数 $f$，并且
$$\sum_{n}\int_I \abs{f_n} < +\infty.$$
则 $f$ 在 $I$ 上可积，且 $\displaystyle\int_I \sum_n f_n = \sum_n\int_I f_n$。
:::

::: fr
Soit $(f_n)$ une suite de fonctions continues par morceaux et intégrables sur $I$ telle que $\sum f_n$ converge simplement vers une fonction $f$ continue par morceaux, et
$$\sum_{n}\int_I \abs{f_n} < +\infty.$$
Alors $f$ est intégrable sur $I$ et $\displaystyle\int_I \sum_n f_n = \sum_n\int_I f_n$.
:::

::: ex id=ex-zeta2-integrale zh="$\int_0^{+\infty}\frac{t}{\e^t - 1}\,\dd t = \zeta(2)$" lvl=1
$$\int_0^{+\infty}\frac{t}{\e^t - 1}\,\dd t = \zeta(2) = \frac{\pi^2}{6}.$$

**第 1 步（展开）**　对 $t > 0$，$0 < \e^{-t} < 1$，由几何级数，$\frac{1}{\e^t - 1} = \frac{\e^{-t}}{1 - \e^{-t}} = \sum_{n \ge 1}\e^{-nt}$，所以 $\frac{t}{\e^t - 1} = \sum_{n \ge 1}f_n(t)$，$f_n(t) = t\,\e^{-nt} \ge 0$。和函数在 $]0, +\infty[$ 上连续。

**第 2 步（逐项的积分）**　换元 $u = nt$ 并用 {@gamma-factorielle}：$\int_0^{+\infty}t\,\e^{-nt}\,\dd t = \frac{1}{n^2}\int_0^{+\infty}u\,\e^{-u}\,\dd u = \frac{\Gamma(2)}{n^2} = \frac{1}{n^2}$。

**第 3 步（条件）**　$\sum_n\int_0^{+\infty}\abs{f_n} = \sum_{n \ge 1}\frac{1}{n^2} < +\infty$。由逐项积分定理，
$$\int_0^{+\infty}\frac{t}{\e^t - 1}\,\dd t = \sum_{n \ge 1}\frac{1}{n^2} = \zeta(2) = \frac{\pi^2}{6},$$
最后一步是第 5 章的 {@bale}。

一般地，对 $s > 1$，同样的计算（$\int_0^{+\infty}t^{s-1}\e^{-nt}\,\dd t = \frac{\Gamma(s)}{n^s}$）给出 $\int_0^{+\infty}\frac{t^{s-1}}{\e^t - 1}\,\dd t = \Gamma(s)\zeta(s)$。
:::

::: ex id=c6-ex-ln2 zh="条件不满足时：对部分和用控制收敛" lvl=1
1. **逐项积分定理适用。** 对 $t \in\, ]0, 1]$，$\frac{\ln(1 + t)}{t} = \sum_{n \ge 1}\frac{(-1)^{n+1}t^{n-1}}{n}$（第 4 章，$\ln(1 + t)$ 的幂级数展开）。$\int_0^1\frac{t^{n-1}}{n}\,\dd t = \frac{1}{n^2}$，$\sum\frac{1}{n^2} < \infty$，所以
   $$\int_0^1\frac{\ln(1 + t)}{t}\,\dd t = \sum_{n \ge 1}\frac{(-1)^{n+1}}{n^2} = \Big(1 - \frac{2}{4}\Big)\zeta(2) = \frac{\pi^2}{12}.$$
   （$\sum\frac{(-1)^{n+1}}{n^2} = \zeta(2) - 2\sum_{n\ \text{偶}}\frac{1}{n^2} = \zeta(2) - \frac{\zeta(2)}{2}$。）

2. **逐项积分定理不适用，但控制收敛适用。** 在 $I = [0, 1[$ 上，$\frac{1}{1 + t} = \sum_{n \ge 0}(-t)^n$，而 $\sum_n\int_0^1 t^n\,\dd t = \sum_n\frac{1}{n+1} = +\infty$。改为对**部分和** $S_N(t) = \sum_{n=0}^N(-t)^n = \frac{1 - (-t)^{N+1}}{1 + t}$ 用控制收敛定理：$S_N(t) \to \frac{1}{1 + t}$（$t \in [0, 1[$），且 $\abs{S_N(t)} \le \frac{2}{1 + t} \le 2$，常数 $2$ 在 $[0, 1[$ 上可积。所以
   $$\sum_{n=0}^N\frac{(-1)^n}{n+1} = \int_0^1 S_N \xrightarrow[N \to \infty]{} \int_0^1\frac{\dd t}{1 + t} = \ln 2,$$
   即 $1 - \frac12 + \frac13 - \cdots = \ln 2$（对比第 4 章 {@ln2}）。
:::

::: thm id=cv-monotone zh="单调收敛定理" en="Monotone convergence theorem" fr="Théorème de convergence monotone" ru="Теорема Беппо Леви о монотонной сходимости" lvl=3 ref="L3 积分论；Rudin, *Real and Complex Analysis*，定理 1.26"
设 $0 \le f_0 \le f_1 \le \cdots$ 逐点收敛到 $f$（均为分段连续）。则 $\int_I f_n \to \int_I f$（在 $[0, +\infty]$ 中，即两边可以同时为 $+\infty$）。逐项积分定理对非负函数项级数的情形是它的直接推论。
:::

::: fr
Soit $0 \le f_0 \le f_1 \le \cdots$ une suite de fonctions (continues par morceaux) convergeant simplement vers $f$ (continue par morceaux). Alors $\int_I f_n \to \int_I f$ dans $[0, +\infty]$ (les deux membres pouvant valoir $+\infty$). Le théorème d'intégration terme à terme pour les séries de fonctions positives en est une conséquence immédiate.
:::

::: q
求 $\displaystyle\lim_{n \to \infty}\int_0^{+\infty}\frac{n\sin(t/n)}{t(1 + t^2)}\,\dd t$。
:::

::: ans
令 $f_n(t) = \frac{n\sin(t/n)}{t(1 + t^2)}$（$t > 0$），它在 $]0, +\infty[$ 上连续。**逐点**：$n\sin\frac tn \to t$，所以 $f_n(t) \to \frac{1}{1 + t^2}$。**控制**：$\abs{\sin x} \le \abs x$ 给出 $\abs{n\sin\frac tn} \le t$，所以 $\abs{f_n(t)} \le \frac{1}{1 + t^2}$，与 $n$ 无关，且 $\int_0^{+\infty}\frac{\dd t}{1 + t^2} = \lim_{x \to +\infty}\Arctan x = \frac\pi2$ 收敛。由控制收敛定理，极限为 $\frac\pi2$。（数值：$n = 100$ 时积分约为 $1.563$，$\frac\pi2 \approx 1.571$。）
:::

::: q
求 $\displaystyle\lim_{n \to \infty}\int_0^{+\infty}\e^{-t^n}\,\dd t$。
:::

::: ans
**逐点**：$0 \le t < 1$ 时 $t^n \to 0$，$\e^{-t^n} \to 1$；$t > 1$ 时 $t^n \to +\infty$，$\e^{-t^n} \to 0$；$t = 1$ 时恒为 $\e^{-1}$。极限函数 $f = \mathbf{1}_{[0, 1[} + \e^{-1}\mathbf{1}_{\{1\}}$ 分段连续。**控制**（$n \ge 1$）：$t \le 1$ 时 $\e^{-t^n} \le 1$；$t \ge 1$ 时 $t^n \ge t$，$\e^{-t^n} \le \e^{-t}$。所以 $\varphi = \mathbf{1}_{[0,1]} + \e^{-t}\mathbf{1}_{]1, +\infty[}$ 是可积的控制函数。由控制收敛定理，极限为 $\int_0^{+\infty}f = 1$。
:::

::: hist zh="从 Riemann 到 Lebesgue"
Riemann 积分的缺陷在于极限运算：可积函数的逐点极限（即使有界）未必 Riemann 可积，例如有理数的指示函数是阶梯函数序列的逐点极限（上面注中的 $f_n$）。Lebesgue 在 1902 年的博士论文中用测度重建了积分，得到控制收敛定理和完备的 $L^1$ 空间（对比 {@cex-c01-l1}）。本章的「已承认定理」正是这个理论在分段连续函数上的投影。
:::

## 方法总结

本章的方法按「想证明什么」归类如下。

**如何证明 $\int_I f$ 收敛**

1. 找出所有问题点，在它们之间分开，逐个讨论（{@def-integrale-generalisee}）；有界函数在有限端点处是假问题（{@c6-faux-probleme}）。
2. 能直接求原函数时，计算 $\int_a^x f$ 再取极限（{@riemann-integrales}）。
3. $f \ge 0$（或在问题点附近定号）：求等价量或上界，与 Riemann 积分、Bertrand 积分比较（{@comparaison-integrales}、{@bertrand-integrales}）。常用的上界：$\e^{-t^2} \le \e^{-t}$（$t \ge 1$），$\ln t = o(t^\eps)$，$t^k\e^{-t} = o(t^{-2})$。
4. $f$ 变号：先证绝对收敛（{@integrable-convergente}）；不行再用分部积分或 Abel 判别法（{@sinc}、{@c6-abel-integrales}）。
5. 换元化为已知积分（{@changement-variable-gen}），例如 $\int\sin(t^2)$ 化为 $\int\frac{\sin u}{\sqrt u}$。
6. 理论性的证明（如 {@integrable-convergente}、{@c6-barbalat}）用 Cauchy 准则（{@cauchy-integrale}）。

**如何证明 $\int_I f$ 发散 / $f$ 不可积**

1. $f \ge 0$ 且（在问题点附近）$f \ge g \ge 0$，$\int g$ 发散（比较定理第 1 条）。
2. $f$ 在 $+\infty$ 处有非零极限（{@c6-limite-infini}）。
3. 违反 Cauchy 准则：找到 $x_n, y_n \to b$ 使 $\big|\int_{x_n}^{y_n} f\big| \ge \eps$（{@c6-ex-abel} 中 $\alpha \le 0$ 的情形）。
4. 收敛 + 发散 = 发散（{@c6-proprietes} 第 3 条），例如 $\frac{\sin^2 t}{t} = \frac{1}{2t} - \frac{\cos 2t}{2t}$。
5. 否定可积：把 $\int\abs f$ 切成一段段的和，与发散级数比较（{@sinc}、{@c6-serie-integrale-pos}）。

**如何交换极限与积分**

1. 闭区间上一致收敛：{@integration-unif}。
2. 否则用控制收敛（{@cv-dominee}）：先求逐点极限，再找与 $n$ 无关的可积控制函数。常用不等式：$\abs{\sin x} \le \abs x$，$\ln(1 + u) \le u$，$\ln(1 - u) \le -u$，$t \ge 1$ 时 $t^n \ge t$。
3. 级数：若 $\sum\int\abs{f_n} < \infty$，逐项积分（{@integration-terme-a-terme}）；否则对部分和用控制收敛（{@c6-ex-ln2}）；非负项用单调收敛（{@cv-monotone}）。
4. 否定交换：质量逃逸的反例（{@cex-domination}、{@cex-bosse}）。

::: rem zh="常见错误"
1. 「$\int_a^{+\infty} f$ 收敛 ⟹ $f \to 0$」：错。三角形脉冲、$\sin(t^2)$ 都是反例（§1 的注）；只有加上「$f$ 有极限」或「$f$ 一致连续」才对（{@c6-limite-infini}、{@c6-barbalat}）。
2. 对变号函数用等价量判断敛散：{@c6-cex-equiv-signe}。
3. 用对称截断代替定义：$\int_{-x}^{x} t\,\dd t = 0$ 不说明 $\int_{-\infty}^{+\infty} t\,\dd t$ 收敛（Cauchy 主值，§1 的反例）。
4. 先换元、后检查收敛：「$I = -I$ 所以 $I = 0$」要求 $I$ 收敛（§4 的注）。
5. 控制函数依赖于 $n$，或直接用「$\abs{f_n} \le \sup_n\abs{f_n}$」而不检查 $\sup_n\abs{f_n}$ 是否可积（{@cex-domination}）。
6. 分部积分时把两个发散的积分相减；边界项没有极限时 {@ipp-generalisee} 不适用，应回到闭区间 $[x, y]$ 上处理。
:::

::: read
- Г. М. Фихтенгольц,《Курс дифференциального и интегрального исчисления》，第 II 卷：«Несобственные интегралы»。对各种收敛判别法（比较、Abel、Dirichlet）和大量经典积分（Euler、Fresnel、Dirichlet 积分）有极详细的计算，是本章最好的苏联参考。
- В. А. Зорич,《Математический анализ》，第 I 卷：«Несобственный интеграл»。简洁地从 Cauchy 准则出发建立整个理论，与本章 §1、§3 的证明路线相同。
- Б. П. Демидович,《Сборник задач и упражнений по математическому анализу》：«Несобственные интегралы»。大量判断敛散性与计算广义积分的习题，按难度排列，适合练「找等价量」。
- X. Gourdon,《Les maths en tête : Analyse》：« Intégration sur un intervalle quelconque »。法国 MP 风格的证明与经典习题（包括控制收敛定理的典型应用），写法最接近法国考试的要求。
- M. Briane, G. Pagès,《Théorie de l'intégration》：théorème de convergence dominée, théorème de convergence monotone。L3 测度论教材，本章两个 ★★★ 定理的完整证明在这里。
- W. Rudin,《Real and Complex Analysis》：Lebesgue integration, convergence theorems。英文的标准参考，控制收敛与单调收敛定理的经典表述。
:::

::: glossary
| 中文 | Français | English | Русский |
|---|---|---|---|
| 广义积分（反常积分） | intégrale généralisée (f.), intégrale impropre (f.) | improper integral | несобственный интеграл |
| 收敛 | convergence (f.) | convergence | сходимость |
| 发散 | divergence (f.) | divergence | расходимость |
| 分段连续函数 | fonction continue par morceaux (f.) | piecewise continuous function | кусочно-непрерывная функция |
| 闭子区间 | segment (m.) | compact subinterval | отрезок |
| 原函数 | primitive (f.) | antiderivative | первообразная |
| Chasles 关系 | relation de Chasles (f.) | additivity with respect to the interval | аддитивность интеграла |
| Cauchy 准则 | critère de Cauchy (m.) | Cauchy criterion | критерий Коши |
| Cauchy 主值 | valeur principale de Cauchy (f.) | Cauchy principal value | главное значение по Коши |
| 假问题（可去的端点） | faux problème (m.) | removable endpoint singularity | устранимая особенность |
| 比较定理 | théorème de comparaison (m.) | comparison test | признак сравнения |
| 等价 | équivalence (f.) ; fonctions équivalentes | asymptotic equivalence | эквивалентность |
| 大 $O$ / 小 $o$ | grand O / petit o (m.) | big O / little o | О большое / о малое |
| Riemann 积分（参考积分） | intégrale de Riemann (f.) | $p$-integral | эталонный интеграл $\int\frac{dx}{x^\alpha}$ |
| Bertrand 积分 | intégrale de Bertrand (f.) | Bertrand integral | интеграл Бертрана |
| 可积函数 | fonction intégrable (f.) | integrable function | абсолютно интегрируемая функция |
| 绝对收敛 | convergence absolue (f.) | absolute convergence | абсолютная сходимость |
| 半收敛（条件收敛） | semi-convergence (f.) | conditional convergence | условная сходимость |
| Abel 判别法 | règle d'Abel (f.) | Dirichlet's test | признак Дирихле |
| 分部积分 | intégration par parties (f.) | integration by parts | интегрирование по частям |
| 变量替换 | changement de variable (m.) | change of variables | замена переменной |
| Γ 函数 | fonction Gamma (f.) | Gamma function | гамма-функция |
| Gauss 积分 | intégrale de Gauss (f.) | Gaussian integral | интеграл Эйлера — Пуассона |
| Dirichlet 积分 | intégrale de Dirichlet (f.) | Dirichlet integral | интеграл Дирихле |
| Fresnel 积分 | intégrale de Fresnel (f.) | Fresnel integral | интеграл Френеля |
| Barbălat 引理 | lemme de Barbălat (m.) | Barbălat's lemma | лемма Барбалата |
| 一致连续性 | continuité uniforme (f.) | uniform continuity | равномерная непрерывность |
| 级数–积分比较 | comparaison série–intégrale (f.) | integral test | интегральный признак Коши — Маклорена |
| 余项 | reste (m.) | remainder | остаток ряда |
| 单调极限定理 | théorème de la limite monotone (m.) | monotone limit theorem | теорема о пределе монотонной функции |
| 逐点收敛 | convergence simple (f.) | pointwise convergence | поточечная сходимость |
| 控制收敛定理 | théorème de convergence dominée (m.) | dominated convergence theorem | теорема Лебега о мажорированной сходимости |
| 控制条件 | hypothèse de domination (f.) | domination hypothesis | условие мажорирования |
| 控制函数 | fonction dominante (f.) | dominating function | интегрируемая мажоранта |
| 逐项积分 | intégration terme à terme (f.) | term-by-term integration | почленное интегрирование |
| 单调收敛定理 | théorème de convergence monotone (m.) | monotone convergence theorem | теорема Беппо Леви |
| 已承认的定理 | théorème admis (m.) | theorem stated without proof | теорема, принимаемая без доказательства |
| 截断 | troncature (f.) | truncation | срезка |
| 取极限 | passer à la limite | pass to the limit | перейти к пределу |
| 控制（动词） | dominer | dominate | мажорировать |
:::
