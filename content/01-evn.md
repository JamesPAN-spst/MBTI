本章是整个 L2 的语言基础。法国 MP 大纲在讲级数和函数列之前先讲它：后面讨论函数列的一致收敛、幂级数、微分学时，都把对象看成某个赋范空间里的点。全章约定 $\K = \R$ 或 $\C$，$E, F$ 是 $\K$-向量空间。

**本章路线。** §1 定义范数，并证明 $\norm{\cdot}_p$ 满足三角不等式（Minkowski 不等式）；§2 把 L1 的数列极限搬到赋范空间，引入等价范数；§3 用球定义开集与闭集，给出闭包的序列刻画；§4 研究连续映射，特别是连续线性映射与算子范数；§5 讲紧性，核心结论是「有限维空间上所有范数等价」；§6 讲完备性与 Banach 不动点定理；§7 讲道路连通性与广义介值定理；§8 是 Baire 定理；§9 按「想证明什么」总结本章方法。

**直接使用的 L1 结论。** $\R$ 的上确界性质；$\R$ 与 $\C$ 中的 Bolzano–Weierstrass 定理与 Cauchy 准则（Cauchy 列收敛）；实数列的不等式取极限（若对一切 $n$ 有 $t_n \le M$ 且 $t_n \to t$，则 $t \le M$）；一元连续函数的介值定理；闭区间上连续函数有界，其积分是线性、单调的。记号：$\lfloor x \rfloor$ 是实数 $x$ 的整数部分；**抽取函数**（extractrice）指严格递增的映射 $\varphi : \N \to \N$。

## 范数与距离

在 $\R$ 中，极限与连续都是用 $\abs{x - y}$ 定义的。要在 $\R^n$、矩阵空间、函数空间里谈「$u_n$ 趋于 $\ell$」，先要给向量一个「长度」。本节给出长度应满足的三条公理（范数），并验证最常用的几个例子；其中 $\norm{\cdot}_p$ 的三角不等式（Minkowski 不等式）需要一番功夫。

::: def id=def-norme zh="范数" en="Norm" fr="Norme" ru="Норма"
映射 $N : E \to \R_+$ 称为**范数**，如果对一切 $x, y \in E$、$\lambda \in \K$：

1. （分离性）$N(x) = 0 \iff x = 0$；
2. （齐次性）$N(\lambda x) = \abs{\lambda}\, N(x)$；
3. （三角不等式）$N(x + y) \le N(x) + N(y)$。

$(E, N)$ 称为**赋范向量空间**（espace vectoriel normé，EVN）。范数常记作 $\norm{\cdot}$；记 $d(x, y) = \norm{x - y}$ 为相应的**距离**。
:::

::: fr
Une application $N : E \to \R_+$ est une **norme** si pour tous $x, y \in E$ et tout $\lambda \in \K$ :

1. (séparation) $N(x) = 0 \iff x = 0$ ;
2. (homogénéité) $N(\lambda x) = \abs{\lambda}\, N(x)$ ;
3. (inégalité triangulaire) $N(x + y) \le N(x) + N(y)$.

Le couple $(E, N)$ est appelé **espace vectoriel normé** (evn). On note souvent la norme $\norm{\cdot}$ ; on appelle $d(x, y) = \norm{x - y}$ la **distance** associée.
:::

白话：范数是向量的「长度」——只有零向量的长度为 0；把向量伸缩 $\lambda$ 倍，长度乘以 $\abs{\lambda}$；三角形两边之和不小于第三边。

::: rem
1. 分离性只需验证「$\Rightarrow$」：由齐次性，$N(0) = N(0 \cdot 0) = \abs{0}\, N(0) = 0$。
2. 距离 $d$ 满足：$d(x, y) = 0 \iff x = y$（分离性）；$d(x, y) = d(y, x)$（齐次性，取 $\lambda = -1$）；$d(x, z) \le d(x, y) + d(y, z)$（三角不等式，把 $x - z$ 写成 $(x - y) + (y - z)$）。此外 $d$ 平移不变：$d(x + c, y + c) = d(x, y)$。
3. 本章中的「球」「开集」「极限」等概念都只通过 $d$ 定义，所以一旦有了范数，L1 中关于 $\abs{x - y}$ 的论证大多可以逐字搬过来。真正的新现象（不等价的范数、有界闭集不紧、线性映射不连续）都出在无穷维空间里。
:::

下面的不等式在本章中反复使用，它说范数是 1-Lipschitz 函数（{@c1-lip-uc}）。

::: lem id=c1-ineg-tri-inverse zh="反向三角不等式" en="Reverse triangle inequality" fr="Inégalité triangulaire inverse" ru="Обратное неравенство треугольника" lvl=1
对一切 $x, y \in E$，
$$\big|\norm{x} - \norm{y}\big| \le \norm{x - y}.$$
:::

::: fr
Pour tous $x, y \in E$,
$$\big|\norm{x} - \norm{y}\big| \le \norm{x - y}.$$
:::

::: proof
▷ 思路：对实数 $t$ 和 $c \ge 0$，$\abs{t} \le c \iff -c \le t \le c$。所以要证两个不等式：$\norm{x} - \norm{y} \le \norm{x - y}$ 与 $\norm{y} - \norm{x} \le \norm{x - y}$。

**第 1 步**　把 $x$ 写成 $(x - y) + y$，由三角不等式，
$$\norm{x} = \norm{(x - y) + y} \le \norm{x - y} + \norm{y},$$
移项得 $\norm{x} - \norm{y} \le \norm{x - y}$。

**第 2 步**　在第 1 步中交换 $x$ 与 $y$ 的位置，得 $\norm{y} - \norm{x} \le \norm{y - x}$。再由齐次性（$\lambda = -1$），
$$\norm{y - x} = \norm{(-1)(x - y)} = \abs{-1}\,\norm{x - y} = \norm{x - y}.$$

由第 1、2 步，$-\norm{x - y} \le \norm{x} - \norm{y} \le \norm{x - y}$，即 $\big|\norm{x} - \norm{y}\big| \le \norm{x - y}$。
:::

::: fr
▷ Méthode : pour un réel $t$ et $c \ge 0$, $\abs{t} \le c \iff -c \le t \le c$. Il s'agit donc de montrer les deux inégalités $\norm{x} - \norm{y} \le \norm{x - y}$ et $\norm{y} - \norm{x} \le \norm{x - y}$.

**Étape 1**　On écrit $x = (x - y) + y$ ; par l'inégalité triangulaire,
$$\norm{x} = \norm{(x - y) + y} \le \norm{x - y} + \norm{y},$$
d'où $\norm{x} - \norm{y} \le \norm{x - y}$.

**Étape 2**　En échangeant les rôles de $x$ et $y$ dans l'étape 1, on obtient $\norm{y} - \norm{x} \le \norm{y - x}$. Par homogénéité ($\lambda = -1$),
$$\norm{y - x} = \norm{(-1)(x - y)} = \abs{-1}\,\norm{x - y} = \norm{x - y}.$$

D'après les étapes 1 et 2, $-\norm{x - y} \le \norm{x} - \norm{y} \le \norm{x - y}$, c'est-à-dire $\big|\norm{x} - \norm{y}\big| \le \norm{x - y}$.
:::

在函数空间上验证分离性时，要用到连续函数积分的一个性质。

::: lem id=c1-int-nulle zh="非负连续函数的积分为零" en="Vanishing integral of a nonnegative continuous function" fr="Intégrale nulle d'une fonction continue positive" ru="Интеграл от неотрицательной непрерывной функции" lvl=1
设 $a < b$，$g : [a, b] \to \R$ 连续且 $g \ge 0$。若 $\int_a^b g = 0$，则 $g = 0$（在 $[a, b]$ 上恒为零）。
:::

::: fr
Soient $a < b$ et $g : [a, b] \to \R$ continue et positive. Si $\int_a^b g = 0$, alors $g$ est identiquement nulle sur $[a, b]$.
:::

::: proof
▷ 思路：反证。若 $g$ 在某点 $t_0$ 取正值，由连续性，$g$ 在 $t_0$ 附近一个长度为正的区间上大于 $\frac{g(t_0)}{2}$，积分至少是「长度 × $\frac{g(t_0)}{2}$」$> 0$。

反设存在 $t_0 \in [a, b]$ 使 $g(t_0) > 0$。

**第 1 步（翻译连续性）**　令 $\eps = \frac{g(t_0)}{2} > 0$。由 $g$ 在 $t_0$ 连续，存在 $\delta > 0$，使对一切 $t \in [a, b]$，
$$\abs{t - t_0} \le \delta \implies \abs{g(t) - g(t_0)} < \eps \implies g(t) > g(t_0) - \eps = \frac{g(t_0)}{2}.$$

**第 2 步（找一个长度为正的区间）**　因为 $(b - t_0) + (t_0 - a) = b - a > 0$，两个数 $b - t_0$、$t_0 - a$ 中至少有一个 $\ge \frac{b - a}{2}$。令 $h = \min\big(\delta, \frac{b - a}{2}\big) > 0$。若 $b - t_0 \ge \frac{b-a}{2}$，令 $J = [t_0, t_0 + h]$；否则令 $J = [t_0 - h, t_0]$。两种情形下都有 $J \subset [a, b]$，$J$ 的长度为 $h$，且 $J$ 中的点到 $t_0$ 的距离 $\le h \le \delta$。

**第 3 步（估计积分）**　由 $g \ge 0$ 与积分的单调性，
$$\begin{aligned}
\int_a^b g &\ge \int_J g && \text{（} g \ge 0 \text{ 于 } [a,b] \setminus J \text{）}\\
&\ge h \cdot \frac{g(t_0)}{2} && \text{（第 1 步：} g > \tfrac{g(t_0)}{2} \text{ 于 } J \text{）}\\
&> 0,
\end{aligned}$$
与 $\int_a^b g = 0$ 矛盾。

所以对一切 $t \in [a, b]$，$g(t) = 0$。
:::

::: fr
▷ Méthode : par l'absurde. Si $g$ est strictement positive en un point $t_0$, par continuité $g$ reste supérieure à $\frac{g(t_0)}{2}$ sur un intervalle de longueur strictement positive autour de $t_0$, et l'intégrale vaut au moins « longueur × $\frac{g(t_0)}{2}$ » $> 0$.

Par l'absurde, supposons qu'il existe $t_0 \in [a, b]$ tel que $g(t_0) > 0$.

**Étape 1 (on traduit la continuité)**　Posons $\eps = \frac{g(t_0)}{2} > 0$. Comme $g$ est continue en $t_0$, il existe $\delta > 0$ tel que pour tout $t \in [a, b]$,
$$\abs{t - t_0} \le \delta \implies \abs{g(t) - g(t_0)} < \eps \implies g(t) > g(t_0) - \eps = \frac{g(t_0)}{2}.$$

**Étape 2 (un intervalle de longueur strictement positive)**　Comme $(b - t_0) + (t_0 - a) = b - a > 0$, l'un au moins des deux nombres $b - t_0$, $t_0 - a$ est $\ge \frac{b - a}{2}$. Posons $h = \min\big(\delta, \frac{b - a}{2}\big) > 0$. Si $b - t_0 \ge \frac{b - a}{2}$, posons $J = [t_0, t_0 + h]$ ; sinon, posons $J = [t_0 - h, t_0]$. Dans les deux cas $J \subset [a, b]$, $J$ est de longueur $h$, et tout point de $J$ est à distance $\le h \le \delta$ de $t_0$.

**Étape 3 (minoration de l'intégrale)**　Comme $g \ge 0$, par croissance de l'intégrale,
$$\begin{aligned}
\int_a^b g &\ge \int_J g && \text{(} g \ge 0 \text{ sur } [a,b] \setminus J \text{)}\\
&\ge h \cdot \frac{g(t_0)}{2} && \text{(étape 1 : } g > \tfrac{g(t_0)}{2} \text{ sur } J \text{)}\\
&> 0,
\end{aligned}$$
ce qui contredit $\int_a^b g = 0$.

Ainsi $g(t) = 0$ pour tout $t \in [a, b]$.
:::

::: ex zh="经典范数"
1. 在 $\K^n$ 上：$\norm{x}_1 = \sum_i \abs{x_i}$，$\norm{x}_2 = \big(\sum_i \abs{x_i}^2\big)^{1/2}$，$\norm{x}_\infty = \max_i \abs{x_i}$。更一般地，$p \ge 1$ 时 $\norm{x}_p = \big(\sum_i \abs{x_i}^p\big)^{1/p}$。
2. 在 $\Cc([a,b], \K)$（$a < b$）上：$\norm{f}_\infty = \sup_{[a,b]} \abs{f}$，$\norm{f}_1 = \int_a^b \abs{f}$，$\norm{f}_2 = \big(\int_a^b \abs{f}^2\big)^{1/2}$。
3. 在 $\M_n(\K)$ 上：任何 $\K^{n^2}$ 上的范数（把矩阵的 $n^2$ 个系数看成一个向量），以及下文的算子范数（{@norme-subordonnee}）。

**验证 $\K^n$ 上的 $\norm{\cdot}_\infty$。** 分离性：$\max_i \abs{x_i} = 0$ 推出每个 $\abs{x_i} = 0$。齐次性：$\abs{\lambda x_i} = \abs{\lambda}\,\abs{x_i}$，对 $i$ 取最大值得 $\norm{\lambda x}_\infty = \abs{\lambda}\,\norm{x}_\infty$。三角不等式：对每个 $i$，
$$\abs{x_i + y_i} \le \abs{x_i} + \abs{y_i} \le \norm{x}_\infty + \norm{y}_\infty,$$
右边与 $i$ 无关，对 $i$ 取最大值得 $\norm{x + y}_\infty \le \norm{x}_\infty + \norm{y}_\infty$。

**验证 $\K^n$ 上的 $\norm{\cdot}_1$。** 分离性：非负数之和为 0 当且仅当每一项为 0。齐次性：从和式中提出因子 $\abs{\lambda}$。三角不等式：把 $n$ 个不等式 $\abs{x_i + y_i} \le \abs{x_i} + \abs{y_i}$ 相加。

**验证 $\Cc([a,b], \K)$ 上的 $\norm{\cdot}_\infty$。** $\abs{f}$ 是闭区间上的连续函数，有界（L1），所以上确界有限。分离性与齐次性的验证与 $\K^n$ 的情形相同，只要把 $\max_i$ 换成 $\sup_{t \in [a,b]}$。三角不等式：对每个 $t \in [a, b]$，$\abs{f(t) + g(t)} \le \abs{f(t)} + \abs{g(t)} \le \norm{f}_\infty + \norm{g}_\infty$，右边与 $t$ 无关，再对 $t$ 取上确界。

**验证 $\Cc([a,b], \K)$ 上的 $\norm{\cdot}_1$。** 齐次性由积分的线性得到；三角不等式由积分的单调性得到：$\int_a^b \abs{f + g} \le \int_a^b \big(\abs{f} + \abs{g}\big) = \norm{f}_1 + \norm{g}_1$。分离性要用连续性：若 $\int_a^b \abs{f} = 0$，对连续函数 $g = \abs{f} \ge 0$ 用 {@c1-int-nulle}，得 $f = 0$。

$\norm{\cdot}_2$ 与一般的 $\norm{\cdot}_p$ 的三角不等式不能逐项得到，见 {@holder}。
:::

::: cex id=c1-cex-non-norme zh="不是范数的例子"
1. 在 $\K^2$ 上，$N(x) = \abs{x_1}$ 满足齐次性与三角不等式（只涉及第一个坐标，验证同上），但 $N\big((0, 1)\big) = 0$ 而 $(0, 1) \ne 0$，分离性不成立。这样的函数称为**半范数**（semi-norme）。
2. 在 $\R^2$ 上，令 $N(x) = \big(\sqrt{\abs{x_1}} + \sqrt{\abs{x_2}}\big)^2$（相当于「$p = \frac12$」）。分离性成立；齐次性成立：$N(\lambda x) = \big(\sqrt{\abs{\lambda}}\,(\sqrt{\abs{x_1}} + \sqrt{\abs{x_2}})\big)^2 = \abs{\lambda}\, N(x)$。但三角不等式不成立：取 $x = (1, 0)$，$y = (0, 1)$，
$$N(x + y) = (1 + 1)^2 = 4 > 2 = N(x) + N(y).$$
它的「单位球」$\{N \le 1\}$ 也不是凸集（对照 {@c1-boule-convexe}）：$x, y$ 在其中，而中点 $\frac{x + y}{2} = (\frac12, \frac12)$ 满足 $N = \big(2 \cdot \tfrac{1}{\sqrt2}\big)^2 = 2 > 1$。
:::

$\norm{\cdot}_p$ 的三角不等式需要证明，这就是 Minkowski 不等式。证明分三层：Young 不等式（两个数）→ Hölder 不等式（两个向量的「内积」）→ Minkowski 不等式。

::: lem id=young zh="Young 不等式" en="Young's inequality" fr="Inégalité de Young" ru="Неравенство Юнга" lvl=1
设 $p, q > 1$，$\frac1p + \frac1q = 1$（称 $p, q$ 为**共轭指数**）。对一切 $a, b \ge 0$，有 $ab \le \dfrac{a^p}{p} + \dfrac{b^q}{q}$。
:::

::: fr
Soient $p, q > 1$ tels que $\frac1p + \frac1q = 1$ (on dit que $p$ et $q$ sont des **exposants conjugués**). Pour tous $a, b \ge 0$, on a $ab \le \dfrac{a^p}{p} + \dfrac{b^q}{q}$.
:::

::: proof
▷ 思路：两边都为正时取对数，不等式就变成 $\ln$ 的凹性不等式。

**情形 1（$a = 0$ 或 $b = 0$）**　左边 $ab = 0$；右边是两个非负数之和，$\ge 0$。不等式成立。

**情形 2（$a > 0$ 且 $b > 0$）**

1. $\ln$ 在 $]0, +\infty[$ 上二阶可导，$\ln''(t) = -\frac{1}{t^2} < 0$，所以 $\ln$ 是凹函数：对一切 $s, t > 0$ 和 $\theta \in [0, 1]$，
   $$\ln\big(\theta s + (1 - \theta) t\big) \ge \theta \ln s + (1 - \theta) \ln t.$$
2. 取 $\theta = \frac1p \in \,]0, 1[$，由共轭条件 $1 - \theta = \frac1q$；再取 $s = a^p > 0$，$t = b^q > 0$：
   $$\ln\Big(\frac{a^p}{p} + \frac{b^q}{q}\Big) \ge \frac1p \ln a^p + \frac1q \ln b^q = \ln a + \ln b = \ln(ab).$$
3. $\exp$ 在 $\R$ 上递增，对两边取 $\exp$，得 $\dfrac{a^p}{p} + \dfrac{b^q}{q} \ge ab$。

两种情形下不等式都成立。
:::

::: fr
▷ Méthode : lorsque les deux membres sont strictement positifs, on passe au logarithme ; l'inégalité devient l'inégalité de concavité de $\ln$.

**Cas 1 ($a = 0$ ou $b = 0$)**　Le membre de gauche vaut $ab = 0$ ; celui de droite est une somme de deux réels positifs, donc $\ge 0$. L'inégalité est vraie.

**Cas 2 ($a > 0$ et $b > 0$)**

1. La fonction $\ln$ est deux fois dérivable sur $]0, +\infty[$ et $\ln''(t) = -\frac{1}{t^2} < 0$ ; elle est donc concave : pour tous $s, t > 0$ et tout $\theta \in [0, 1]$,
   $$\ln\big(\theta s + (1 - \theta) t\big) \ge \theta \ln s + (1 - \theta) \ln t.$$
2. Prenons $\theta = \frac1p \in \,]0, 1[$ ; par la relation de conjugaison, $1 - \theta = \frac1q$. Prenons $s = a^p > 0$ et $t = b^q > 0$ :
   $$\ln\Big(\frac{a^p}{p} + \frac{b^q}{q}\Big) \ge \frac1p \ln a^p + \frac1q \ln b^q = \ln a + \ln b = \ln(ab).$$
3. La fonction $\exp$ est croissante sur $\R$ ; en composant par $\exp$, il vient $\dfrac{a^p}{p} + \dfrac{b^q}{q} \ge ab$.

Dans les deux cas, l'inégalité est démontrée.
:::

::: thm id=holder zh="Hölder 不等式与 Minkowski 不等式" en="Hölder and Minkowski inequalities" fr="Inégalités de Hölder et de Minkowski" ru="Неравенства Гёльдера и Минковского" lvl=1
设 $p, q > 1$ 共轭。对 $x, y \in \K^n$：
$$\sum_{i=1}^n \abs{x_i y_i} \le \norm{x}_p \norm{y}_q \quad \text{（Hölder）}, \qquad \norm{x + y}_p \le \norm{x}_p + \norm{y}_p \quad \text{（Minkowski，对 } p \ge 1 \text{ 成立）}.$$
因此 $\norm{\cdot}_p$（$1 \le p \le \infty$）都是 $\K^n$ 上的范数。对 $\Cc([a,b], \K)$（$a < b$）上的积分形式同样成立：
$$\int_a^b \abs{fg} \le \norm{f}_p \norm{g}_q, \qquad \norm{f + g}_p \le \norm{f}_p + \norm{g}_p, \qquad \text{其中 } \norm{f}_p = \Big(\int_a^b \abs{f}^p\Big)^{1/p},$$
并且 $\norm{\cdot}_p$（$1 \le p < \infty$）是 $\Cc([a,b], \K)$ 上的范数。
:::

::: fr
Soient $p, q > 1$ conjugués. Pour $x, y \in \K^n$ :
$$\sum_{i=1}^n \abs{x_i y_i} \le \norm{x}_p \norm{y}_q \quad \text{(Hölder)}, \qquad \norm{x + y}_p \le \norm{x}_p + \norm{y}_p \quad \text{(Minkowski, valable pour } p \ge 1\text{)}.$$
Par conséquent, les $\norm{\cdot}_p$ ($1 \le p \le \infty$) sont des normes sur $\K^n$. Les versions intégrales sur $\Cc([a,b], \K)$ ($a < b$) sont également vraies :
$$\int_a^b \abs{fg} \le \norm{f}_p \norm{g}_q, \qquad \norm{f + g}_p \le \norm{f}_p + \norm{g}_p, \qquad \text{où } \norm{f}_p = \Big(\int_a^b \abs{f}^p\Big)^{1/p},$$
et $\norm{\cdot}_p$ ($1 \le p < \infty$) est une norme sur $\Cc([a,b], \K)$.
:::

::: proof
▷ 思路：Hölder——先把 $x, y$ 归一化，再对每一项用 Young 不等式并求和。Minkowski——把 $\abs{x_i + y_i}^p$ 写成 $\abs{x_i + y_i} \cdot \abs{x_i + y_i}^{p-1}$，拆成两项，对每一项用 Hölder。

**第 1 步（Hölder，$\K^n$）**

*情形 1：$x = 0$ 或 $y = 0$。* 两边都等于 0。

*情形 2：$x \ne 0$ 且 $y \ne 0$。* 此时 $\norm{x}_p > 0$，$\norm{y}_q > 0$（非负数之和为 0 当且仅当每项为 0）。

1. 令 $u = x / \norm{x}_p$，$v = y / \norm{y}_q$。则 $\sum_i \abs{u_i}^p = \frac{\sum_i \abs{x_i}^p}{\norm{x}_p^p} = 1$，同样（把 $x, p$ 换成 $y, q$）$\sum_i \abs{v_i}^q = 1$。
2. 对每个 $i$，用 Young 不等式（{@young}），取 $a = \abs{u_i}$，$b = \abs{v_i}$：$\abs{u_i v_i} \le \frac{\abs{u_i}^p}{p} + \frac{\abs{v_i}^q}{q}$。
3. 对 $i = 1, \dots, n$ 求和：
   $$\sum_i \abs{u_i v_i} \le \frac1p \sum_i \abs{u_i}^p + \frac1q \sum_i \abs{v_i}^q = \frac1p + \frac1q = 1.$$
4. 两边乘以 $\norm{x}_p \norm{y}_q$：$\sum_i \abs{x_i y_i} = \norm{x}_p \norm{y}_q \sum_i \abs{u_i v_i} \le \norm{x}_p \norm{y}_q$。

**第 2 步（Minkowski，$\K^n$）**

*情形 $p = 1$。* 把 $n$ 个不等式 $\abs{x_i + y_i} \le \abs{x_i} + \abs{y_i}$ 相加。

*情形 $p > 1$。* 令 $q = \frac{p}{p - 1}$，则 $\frac1p + \frac1q = \frac1p + \frac{p-1}{p} = 1$，且 $(p - 1) q = p$。令 $S = \sum_i \abs{x_i + y_i}^p = \norm{x + y}_p^p$。若 $S = 0$，则 $\norm{x + y}_p = 0$，结论成立。下设 $S > 0$。

1. 记 $w_i = \abs{x_i + y_i}^{p-1}$。由三角不等式（在 $\K$ 中），
   $$S = \sum_i \abs{x_i + y_i}\, w_i \le \sum_i \abs{x_i}\, w_i + \sum_i \abs{y_i}\, w_i.$$
2. 对向量 $x$ 与 $w = (w_i)$ 用第 1 步：
   $$\sum_i \abs{x_i}\, w_i \le \norm{x}_p \Big(\sum_i w_i^q\Big)^{1/q} = \norm{x}_p \Big(\sum_i \abs{x_i + y_i}^{(p-1)q}\Big)^{1/q} = \norm{x}_p\, S^{1/q}.$$
   同样（把 $x$ 换成 $y$）$\sum_i \abs{y_i}\, w_i \le \norm{y}_p\, S^{1/q}$。
3. 于是 $S \le \big(\norm{x}_p + \norm{y}_p\big) S^{1/q}$。两边除以 $S^{1/q} > 0$，由 $1 - \frac1q = \frac1p$ 得 $S^{1/p} \le \norm{x}_p + \norm{y}_p$，即 $\norm{x + y}_p \le \norm{x}_p + \norm{y}_p$。

**第 3 步（$\norm{\cdot}_p$ 是 $\K^n$ 上的范数）**　$p = \infty$ 的情形已在「经典范数」的例子中验证。设 $1 \le p < \infty$。分离性：$\sum_i \abs{x_i}^p = 0$ 当且仅当每个 $x_i = 0$。齐次性：$\big(\sum_i \abs{\lambda}^p \abs{x_i}^p\big)^{1/p} = \abs{\lambda}\,\norm{x}_p$。三角不等式：第 2 步。

**第 4 步（积分形式）**　把第 1–3 步中的 $\sum_{i=1}^n$ 换成 $\int_a^b \cdots \,\dd t$，把 $x_i, y_i$ 换成 $f(t), g(t)$：Young 不等式对每个 $t$ 逐点成立，再由积分的线性与单调性积分即可，步骤完全相同。唯一需要补充的是分离性（第 1 步情形 2 要用到 $f \ne 0 \Rightarrow \norm{f}_p > 0$）：若 $\norm{f}_p = 0$，则连续函数 $\abs{f}^p \ge 0$ 的积分为 0，由 {@c1-int-nulle}，$\abs{f}^p = 0$，即 $f = 0$。

这就证明了 Hölder 与 Minkowski 不等式，以及 $\norm{\cdot}_p$ 是范数。
:::

::: fr
▷ Méthode : pour Hölder, on normalise $x$ et $y$, puis on applique l'inégalité de Young terme à terme et on somme. Pour Minkowski, on écrit $\abs{x_i + y_i}^p = \abs{x_i + y_i} \cdot \abs{x_i + y_i}^{p-1}$, on sépare en deux sommes et on applique Hölder à chacune.

**Étape 1 (Hölder, dans $\K^n$)**

*Cas 1 : $x = 0$ ou $y = 0$.* Les deux membres sont nuls.

*Cas 2 : $x \ne 0$ et $y \ne 0$.* Alors $\norm{x}_p > 0$ et $\norm{y}_q > 0$ (une somme de réels positifs est nulle si et seulement si chaque terme l'est).

1. Posons $u = x / \norm{x}_p$ et $v = y / \norm{y}_q$. Alors $\sum_i \abs{u_i}^p = \frac{\sum_i \abs{x_i}^p}{\norm{x}_p^p} = 1$ et de même (en remplaçant $x, p$ par $y, q$) $\sum_i \abs{v_i}^q = 1$.
2. Pour chaque $i$, l'inégalité de Young ({@fr:young}) avec $a = \abs{u_i}$ et $b = \abs{v_i}$ donne $\abs{u_i v_i} \le \frac{\abs{u_i}^p}{p} + \frac{\abs{v_i}^q}{q}$.
3. En sommant pour $i = 1, \dots, n$ :
   $$\sum_i \abs{u_i v_i} \le \frac1p \sum_i \abs{u_i}^p + \frac1q \sum_i \abs{v_i}^q = \frac1p + \frac1q = 1.$$
4. En multipliant par $\norm{x}_p \norm{y}_q$ : $\sum_i \abs{x_i y_i} = \norm{x}_p \norm{y}_q \sum_i \abs{u_i v_i} \le \norm{x}_p \norm{y}_q$.

**Étape 2 (Minkowski, dans $\K^n$)**

*Cas $p = 1$.* On somme les $n$ inégalités $\abs{x_i + y_i} \le \abs{x_i} + \abs{y_i}$.

*Cas $p > 1$.* Posons $q = \frac{p}{p - 1}$ ; alors $\frac1p + \frac1q = \frac1p + \frac{p-1}{p} = 1$ et $(p - 1) q = p$. Posons $S = \sum_i \abs{x_i + y_i}^p = \norm{x + y}_p^p$. Si $S = 0$, alors $\norm{x + y}_p = 0$ et le résultat est vrai. Supposons désormais $S > 0$.

1. Notons $w_i = \abs{x_i + y_i}^{p-1}$. Par l'inégalité triangulaire (dans $\K$),
   $$S = \sum_i \abs{x_i + y_i}\, w_i \le \sum_i \abs{x_i}\, w_i + \sum_i \abs{y_i}\, w_i.$$
2. L'étape 1 appliquée à $x$ et à $w = (w_i)$ donne
   $$\sum_i \abs{x_i}\, w_i \le \norm{x}_p \Big(\sum_i w_i^q\Big)^{1/q} = \norm{x}_p \Big(\sum_i \abs{x_i + y_i}^{(p-1)q}\Big)^{1/q} = \norm{x}_p\, S^{1/q}.$$
   De même (en remplaçant $x$ par $y$), $\sum_i \abs{y_i}\, w_i \le \norm{y}_p\, S^{1/q}$.
3. Ainsi $S \le \big(\norm{x}_p + \norm{y}_p\big) S^{1/q}$. En divisant par $S^{1/q} > 0$ et comme $1 - \frac1q = \frac1p$, il vient $S^{1/p} \le \norm{x}_p + \norm{y}_p$, c'est-à-dire $\norm{x + y}_p \le \norm{x}_p + \norm{y}_p$.

**Étape 3 ($\norm{\cdot}_p$ est une norme sur $\K^n$)**　Le cas $p = \infty$ a été traité dans l'exemple des normes usuelles. Soit $1 \le p < \infty$. Séparation : $\sum_i \abs{x_i}^p = 0$ si et seulement si tous les $x_i$ sont nuls. Homogénéité : $\big(\sum_i \abs{\lambda}^p \abs{x_i}^p\big)^{1/p} = \abs{\lambda}\,\norm{x}_p$. Inégalité triangulaire : étape 2.

**Étape 4 (versions intégrales)**　On remplace dans les étapes 1 à 3 les sommes $\sum_{i=1}^n$ par des intégrales $\int_a^b \cdots \,\dd t$, et $x_i, y_i$ par $f(t), g(t)$ : l'inégalité de Young est vraie point par point, puis on intègre grâce à la linéarité et à la croissance de l'intégrale ; les étapes sont identiques. Il reste seulement la séparation (utilisée dans le cas 2 de l'étape 1 : $f \ne 0 \Rightarrow \norm{f}_p > 0$) : si $\norm{f}_p = 0$, la fonction continue positive $\abs{f}^p$ est d'intégrale nulle, donc d'après le {@fr:c1-int-nulle}, $\abs{f}^p = 0$, c'est-à-dire $f = 0$.

Ceci démontre les inégalités de Hölder et de Minkowski, et le fait que $\norm{\cdot}_p$ est une norme.
:::

::: rem
1. $p = q = 2$ 时，Hölder 不等式就是 Cauchy–Schwarz 不等式 $\sum_i \abs{x_i y_i} \le \norm{x}_2 \norm{y}_2$。
2. 端点情形 $p = 1$、$q = \infty$ 也成立，而且是逐项的：$\sum_i \abs{x_i y_i} \le \big(\max_j \abs{y_j}\big) \sum_i \abs{x_i} = \norm{x}_1 \norm{y}_\infty$。
3. 条件 $p \ge 1$ 不能去掉：{@c1-cex-non-norme} 第 2 条说明「$p = \frac12$」时三角不等式不成立。证明中用到 $p \ge 1$ 的地方是 Young 不等式（需要 $\frac1p \in \,]0, 1]$）。
:::

::: demo id=unitballs
拖动 $p$，观察 $\R^2$ 中单位球 $\{x : \norm{x}_p \le 1\}$ 的形状。$p = 1$ 是菱形，$p = 2$ 是圆，$p \to \infty$ 时趋于正方形。所有单位球都是凸的，这正是三角不等式的几何含义。
:::

::: def id=c1-def-boules zh="球与有界集" en="Balls, bounded sets" fr="Boules, parties bornées" ru="Шары, ограниченные множества"
设 $a \in E$，$r > 0$。**开球** $B(a, r) = \{x \in E : \norm{x - a} < r\}$，**闭球** $\overline{B}(a, r) = \{x \in E : \norm{x - a} \le r\}$，**球面** $S(a,r) = \{x \in E : \norm{x - a} = r\}$。集合 $A \subset E$ **有界**，如果它包含在某个球中；等价地（见下面的注），
$$\exists M \ge 0,\ \forall x \in A,\quad \norm{x} \le M.$$
:::

::: fr
Soient $a \in E$ et $r > 0$. On appelle **boule ouverte** $B(a, r) = \{x \in E : \norm{x - a} < r\}$, **boule fermée** $\overline{B}(a, r) = \{x \in E : \norm{x - a} \le r\}$ et **sphère** $S(a,r) = \{x \in E : \norm{x - a} = r\}$. Une partie $A \subset E$ est **bornée** si elle est contenue dans une boule ; de manière équivalente (voir la remarque ci-dessous),
$$\exists M \ge 0,\ \forall x \in A,\quad \norm{x} \le M.$$
:::

白话：有界就是集合中所有点到原点的距离都不超过同一个常数 $M$。

::: rem
**两种说法等价。** 若 $A \subset B(a, r)$（或 $\overline{B}(a, r)$），则对 $x \in A$，$\norm{x} \le \norm{x - a} + \norm{a} \le r + \norm{a}$，取 $M = r + \norm{a}$。反之若对一切 $x \in A$，$\norm{x} \le M$，则 $A \subset \overline{B}(0, M) \subset B(0, M + 1)$。

**形状依赖于范数。** 在 $\R$ 中 $B(a, r) = \,]a - r, a + r[$。在 $\R^2$ 中，$\norm{\cdot}_\infty$ 的单位开球是正方形 $]-1, 1[^2$，$\norm{\cdot}_1$ 的是菱形 $\{\abs{x_1} + \abs{x_2} < 1\}$，$\norm{\cdot}_2$ 的是圆盘（见上面的演示）。
:::

::: ex zh="有界性依赖于范数"
在 $\Cc([0,1], \R)$ 上取 $f_n(x) = n x^n$（$n \ge 1$）。

- $\norm{f_n}_\infty = \sup_{[0,1]} n x^n = n$（在 $x = 1$ 处取到），所以 $\{f_n : n \ge 1\}$ 对 $\norm{\cdot}_\infty$ **无界**；
- $\norm{f_n}_1 = \int_0^1 n x^n \,\dd x = \frac{n}{n+1} \le 1$，所以同一个集合对 $\norm{\cdot}_1$ **有界**。

同一个集合是否有界，取决于用哪个范数。§2 将说明：对**等价**的范数，有界集相同（{@equiv-conv}）。
:::

::: def id=c1-def-convexe zh="凸集" en="Convex set" fr="Partie convexe" ru="Выпуклое множество"
$A \subset E$ 称为**凸集**，如果
$$\forall x, y \in A,\ \forall t \in [0, 1],\quad (1 - t)x + ty \in A,$$
即 $A$ 包含其中任意两点之间的线段 $[x, y] = \{(1 - t)x + ty : t \in [0, 1]\}$。
:::

::: fr
Une partie $A \subset E$ est dite **convexe** si
$$\forall x, y \in A,\ \forall t \in [0, 1],\quad (1 - t)x + ty \in A,$$
c'est-à-dire si $A$ contient le segment $[x, y] = \{(1 - t)x + ty : t \in [0, 1]\}$ pour tous $x, y \in A$.
:::

例：向量子空间是凸集（对线性组合封闭）；$\R$ 中的区间是凸集。非例：$\R^2$ 中的单位圆周 $S(0, 1)$（对 $\norm{\cdot}_2$）不是凸集：$x = (1, 0)$、$y = (-1, 0)$ 在其中，而中点 $0$ 不在其中。

::: prop id=c1-boule-convexe lvl=1
球是凸集：对一切 $a \in E$、$r > 0$，$B(a, r)$ 与 $\overline{B}(a, r)$ 都是凸集。
:::

::: fr
Les boules sont convexes : pour tous $a \in E$ et $r > 0$, $B(a, r)$ et $\overline{B}(a, r)$ sont convexes.
:::

::: proof
▷ 思路：把 $(1-t)x + ty - a$ 写成 $(1-t)(x - a) + t(y - a)$，再用三角不等式与齐次性。

设 $x, y \in B(a, r)$，$t \in [0, 1]$。

1. 因为 $(1 - t)a + ta = a$，有 $(1 - t)x + ty - a = (1 - t)(x - a) + t(y - a)$。
2. 记 $m = \max\big(\norm{x - a}, \norm{y - a}\big)$，则 $m < r$。由三角不等式与齐次性（$1 - t \ge 0$，$t \ge 0$），
   $$\begin{aligned}
   \norm{(1 - t)x + ty - a} &\le (1 - t)\norm{x - a} + t\norm{y - a} && \text{（三角不等式、齐次性）}\\
   &\le (1 - t)m + tm = m < r. && \text{（} m \text{ 的定义）}
   \end{aligned}$$
3. 所以 $(1 - t)x + ty \in B(a, r)$。

对闭球，把第 2 步中的「$m < r$」换成「$m \le r$」，得 $\norm{(1 - t)x + ty - a} \le r$。这就证明了两种球都是凸集。
:::

::: fr
▷ Méthode : on écrit $(1-t)x + ty - a = (1-t)(x - a) + t(y - a)$, puis on utilise l'inégalité triangulaire et l'homogénéité.

Soient $x, y \in B(a, r)$ et $t \in [0, 1]$.

1. Comme $(1 - t)a + ta = a$, on a $(1 - t)x + ty - a = (1 - t)(x - a) + t(y - a)$.
2. Notons $m = \max\big(\norm{x - a}, \norm{y - a}\big)$ ; alors $m < r$. Par l'inégalité triangulaire et l'homogénéité ($1 - t \ge 0$, $t \ge 0$),
   $$\begin{aligned}
   \norm{(1 - t)x + ty - a} &\le (1 - t)\norm{x - a} + t\norm{y - a} && \text{(inégalité triangulaire, homogénéité)}\\
   &\le (1 - t)m + tm = m < r. && \text{(définition de } m\text{)}
   \end{aligned}$$
3. Donc $(1 - t)x + ty \in B(a, r)$.

Pour la boule fermée, on remplace « $m < r$ » par « $m \le r$ » dans l'étape 2 et on obtient $\norm{(1 - t)x + ty - a} \le r$. Les deux boules sont donc convexes.
:::

::: q
设 $N : E \to \R$（注意：没有假设 $N \ge 0$）满足齐次性与三角不等式。证明 $N(x) \ge 0$ 对一切 $x$ 自动成立。
:::

::: ans
由齐次性，$N(0) = N(0 \cdot 0) = 0 \cdot N(0) = 0$。再由三角不等式与齐次性（$\lambda = -1$），
$$0 = N(0) = N\big(x + (-x)\big) \le N(x) + N(-x) = 2N(x),$$
所以 $N(x) \ge 0$。因此定义 {@def-norme} 中的「值域 $\R_+$」其实可以由另外两条推出。
:::

::: q
在 $\R^2$ 上，$N(x) = \abs{x_1 + x_2} + \abs{x_1 - x_2}$ 是范数吗？它的单位闭球是什么形状？
:::

::: ans
先证恒等式：对实数 $a, b$，$\abs{a + b} + \abs{a - b} = 2\max(\abs{a}, \abs{b})$。由对称性（交换 $a, b$ 时左边不变，因为 $\abs{a - b} = \abs{b - a}$）不妨设 $\abs{a} \ge \abs{b}$。若 $a \ge 0$，则 $a + b \ge a - \abs{b} \ge 0$，$a - b \ge a - \abs{b} \ge 0$，所以左边 $= (a + b) + (a - b) = 2a = 2\abs{a}$；若 $a < 0$，把 $(a, b)$ 换成 $(-a, -b)$，左边不变，归结为前一情形。

于是 $N(x) = 2\max(\abs{x_1}, \abs{x_2}) = 2\norm{x}_\infty$，是范数（正数乘以范数仍是范数）。单位闭球 $\{N \le 1\} = \{\norm{x}_\infty \le \frac12\} = [-\frac12, \frac12]^2$，是正方形。
:::

## 数列与等价范数

有了距离，就可以照搬 L1 的定义谈数列的极限。本节先把 L1 中关于收敛数列的基本性质在赋范空间里重新证明一遍（证明几乎逐字相同，只是把 $\abs{\cdot}$ 换成 $\norm{\cdot}$），然后回答一个新问题：同一个空间上换一个范数，收敛性会不会改变？

::: def id=c1-def-suite-conv zh="收敛数列" en="Convergent sequence" fr="Suite convergente" ru="Сходящаяся последовательность"
设 $(u_n)_{n \in \N}$ 是 $(E, \norm{\cdot})$ 中的数列，$\ell \in E$。$(u_n)$ **收敛**到 $\ell$（记作 $u_n \to \ell$），如果实数列 $\big(\norm{u_n - \ell}\big)$ 趋于 $0$，即
$$\forall \eps > 0,\ \exists N \in \N,\ \forall n \ge N,\quad \norm{u_n - \ell} < \eps.$$
极限唯一，收敛数列有界（{@c1-suites-prop}）。
:::

::: fr
Soient $(u_n)_{n \in \N}$ une suite de $(E, \norm{\cdot})$ et $\ell \in E$. On dit que $(u_n)$ **converge** vers $\ell$ (et on note $u_n \to \ell$) si la suite réelle $\big(\norm{u_n - \ell}\big)$ tend vers $0$, c'est-à-dire
$$\forall \eps > 0,\ \exists N \in \N,\ \forall n \ge N,\quad \norm{u_n - \ell} < \eps.$$
La limite est unique et toute suite convergente est bornée ({@fr:c1-suites-prop}).
:::

白话：无论给定多小的误差 $\eps$，从某一项起，所有 $u_n$ 都落在以 $\ell$ 为球心、$\eps$ 为半径的球里。

::: ex zh="一个收敛数列与一个发散数列"
1. 在 $(\R^2, \norm{\cdot}_2)$ 中，令 $u_n = \big(\frac{1}{n+1},\ 1 + \frac{(-1)^n}{(n+1)^2}\big)$，$\ell = (0, 1)$。则
   $$\norm{u_n - \ell}_2 = \Big(\frac{1}{(n+1)^2} + \frac{1}{(n+1)^4}\Big)^{1/2} \le \Big(\frac{2}{(n+1)^2}\Big)^{1/2} = \frac{\sqrt2}{n+1}.$$
   给定 $\eps > 0$，令 $N = \lfloor \sqrt2/\eps \rfloor + 1$，则 $N > \sqrt2/\eps$；对 $n \ge N$，$\norm{u_n - \ell}_2 \le \frac{\sqrt2}{n+1} < \frac{\sqrt2}{N} < \eps$。所以 $u_n \to \ell$。
2. 令 $v_n = \big((-1)^n, 0\big)$。反设 $v_n \to \ell$。对 $\eps = 1$，存在 $N$ 使 $n \ge N$ 时 $\norm{v_n - \ell}_2 < 1$。于是
   $$2 = \norm{v_N - v_{N+1}}_2 \le \norm{v_N - \ell}_2 + \norm{\ell - v_{N+1}}_2 < 1 + 1 = 2,$$
   矛盾。所以 $(v_n)$ 发散。
:::

::: prop id=c1-suites-prop zh="收敛数列的基本性质" lvl=1
设 $(u_n)$、$(v_n)$ 是 $E$ 中的数列，$(\lambda_n)$ 是 $\K$ 中的数列。

1. （极限唯一）若 $u_n \to \ell$ 且 $u_n \to \ell'$，则 $\ell = \ell'$。
2. （有界）若 $(u_n)$ 收敛，则存在 $M \ge 0$，使对一切 $n$，$\norm{u_n} \le M$。
3. （范数连续）若 $u_n \to \ell$，则 $\norm{u_n} \to \norm{\ell}$。
4. （线性运算）若 $u_n \to \ell$，$v_n \to \ell'$，$\lambda_n \to \lambda$，则 $u_n + v_n \to \ell + \ell'$，$\lambda_n u_n \to \lambda \ell$。
:::

::: fr
Soient $(u_n)$, $(v_n)$ deux suites de $E$ et $(\lambda_n)$ une suite de $\K$.

1. (Unicité de la limite) Si $u_n \to \ell$ et $u_n \to \ell'$, alors $\ell = \ell'$.
2. (Bornitude) Si $(u_n)$ converge, il existe $M \ge 0$ tel que pour tout $n$, $\norm{u_n} \le M$.
3. (Continuité de la norme) Si $u_n \to \ell$, alors $\norm{u_n} \to \norm{\ell}$.
4. (Opérations) Si $u_n \to \ell$, $v_n \to \ell'$ et $\lambda_n \to \lambda$, alors $u_n + v_n \to \ell + \ell'$ et $\lambda_n u_n \to \lambda \ell$.
:::

::: proof
▷ 思路：每一条都是「翻译假设 → 三角不等式 → 选 $N$」。

**1（唯一性）**　▷ 要证 $\norm{\ell - \ell'} = 0$；为此证明这个非负实数小于任意 $\eps > 0$。

设 $\eps > 0$。由 $u_n \to \ell$，存在 $N_1$，使 $n \ge N_1$ 时 $\norm{u_n - \ell} < \frac{\eps}{2}$；由 $u_n \to \ell'$，存在 $N_2$，使 $n \ge N_2$ 时 $\norm{u_n - \ell'} < \frac{\eps}{2}$。令 $n = \max(N_1, N_2)$：
$$\norm{\ell - \ell'} \le \norm{\ell - u_n} + \norm{u_n - \ell'} < \frac{\eps}{2} + \frac{\eps}{2} = \eps.$$
非负实数 $\norm{\ell - \ell'}$ 小于一切正数，所以它等于 $0$；由分离性，$\ell = \ell'$。

**2（有界）**　设 $u_n \to \ell$。取 $\eps = 1$：存在 $N_1$，使 $n \ge N_1$ 时 $\norm{u_n - \ell} < 1$，从而
$$\norm{u_n} \le \norm{u_n - \ell} + \norm{\ell} < 1 + \norm{\ell} \qquad (n \ge N_1).$$
令 $M = \max\big(\norm{u_0}, \dots, \norm{u_{N_1 - 1}},\ 1 + \norm{\ell}\big)$（有限个数的最大值）。则对 $n < N_1$，$\norm{u_n} \le M$；对 $n \ge N_1$，$\norm{u_n} < 1 + \norm{\ell} \le M$。

**3（范数连续）**　设 $\eps > 0$，取 $N$ 使 $n \ge N$ 时 $\norm{u_n - \ell} < \eps$。由反向三角不等式（{@c1-ineg-tri-inverse}），对 $n \ge N$，$\big|\norm{u_n} - \norm{\ell}\big| \le \norm{u_n - \ell} < \eps$。

**4（线性运算）**

*和。* 设 $\eps > 0$。取 $N_1$ 使 $n \ge N_1$ 时 $\norm{u_n - \ell} < \frac{\eps}{2}$，取 $N_2$ 使 $n \ge N_2$ 时 $\norm{v_n - \ell'} < \frac{\eps}{2}$。令 $N = \max(N_1, N_2)$，对 $n \ge N$：
$$\norm{(u_n + v_n) - (\ell + \ell')} \le \norm{u_n - \ell} + \norm{v_n - \ell'} < \eps.$$

*数乘。* 由第 2 条（用于 $\K$ 中的收敛数列 $(\lambda_n)$），存在 $M \ge 0$，使对一切 $n$，$\abs{\lambda_n} \le M$。写
$$\lambda_n u_n - \lambda \ell = \lambda_n (u_n - \ell) + (\lambda_n - \lambda)\ell.$$
设 $\eps > 0$。取 $N_1$ 使 $n \ge N_1$ 时 $\norm{u_n - \ell} < \frac{\eps}{2(M + 1)}$，取 $N_2$ 使 $n \ge N_2$ 时 $\abs{\lambda_n - \lambda} < \frac{\eps}{2(\norm{\ell} + 1)}$（分母加 1 是为了处理 $M = 0$ 或 $\ell = 0$ 的情形）。令 $N = \max(N_1, N_2)$，对 $n \ge N$：
$$\begin{aligned}
\norm{\lambda_n u_n - \lambda \ell} &\le \abs{\lambda_n}\,\norm{u_n - \ell} + \abs{\lambda_n - \lambda}\,\norm{\ell} && \text{（三角不等式、齐次性）}\\
&< M \cdot \frac{\eps}{2(M + 1)} + \frac{\eps}{2(\norm{\ell} + 1)} \cdot \norm{\ell} && \text{（} n \ge N \text{）}\\
&\le \frac{\eps}{2} + \frac{\eps}{2} = \eps.
\end{aligned}$$

四条结论都已证明。
:::

::: fr
▷ Méthode : chaque point suit le schéma « on traduit les hypothèses → inégalité triangulaire → choix de $N$ ».

**1 (Unicité)**　▷ On veut montrer que $\norm{\ell - \ell'} = 0$ ; pour cela, on montre que ce réel positif est inférieur à tout $\eps > 0$.

Soit $\eps > 0$. Comme $u_n \to \ell$, il existe $N_1$ tel que pour tout $n \ge N_1$, $\norm{u_n - \ell} < \frac{\eps}{2}$ ; comme $u_n \to \ell'$, il existe $N_2$ tel que pour tout $n \ge N_2$, $\norm{u_n - \ell'} < \frac{\eps}{2}$. Pour $n = \max(N_1, N_2)$ :
$$\norm{\ell - \ell'} \le \norm{\ell - u_n} + \norm{u_n - \ell'} < \frac{\eps}{2} + \frac{\eps}{2} = \eps.$$
Le réel positif $\norm{\ell - \ell'}$ est inférieur à tout réel strictement positif, il est donc nul ; par séparation, $\ell = \ell'$.

**2 (Bornitude)**　Supposons $u_n \to \ell$. Pour $\eps = 1$, il existe $N_1$ tel que pour tout $n \ge N_1$, $\norm{u_n - \ell} < 1$, d'où
$$\norm{u_n} \le \norm{u_n - \ell} + \norm{\ell} < 1 + \norm{\ell} \qquad (n \ge N_1).$$
Posons $M = \max\big(\norm{u_0}, \dots, \norm{u_{N_1 - 1}},\ 1 + \norm{\ell}\big)$ (maximum d'un nombre fini de réels). Pour $n < N_1$, $\norm{u_n} \le M$ ; pour $n \ge N_1$, $\norm{u_n} < 1 + \norm{\ell} \le M$.

**3 (Continuité de la norme)**　Soit $\eps > 0$ et $N$ tel que pour tout $n \ge N$, $\norm{u_n - \ell} < \eps$. D'après l'inégalité triangulaire inverse ({@fr:c1-ineg-tri-inverse}), pour $n \ge N$, $\big|\norm{u_n} - \norm{\ell}\big| \le \norm{u_n - \ell} < \eps$.

**4 (Opérations)**

*Somme.* Soit $\eps > 0$. Soit $N_1$ tel que $\norm{u_n - \ell} < \frac{\eps}{2}$ pour $n \ge N_1$, et $N_2$ tel que $\norm{v_n - \ell'} < \frac{\eps}{2}$ pour $n \ge N_2$. Posons $N = \max(N_1, N_2)$ ; pour $n \ge N$,
$$\norm{(u_n + v_n) - (\ell + \ell')} \le \norm{u_n - \ell} + \norm{v_n - \ell'} < \eps.$$

*Produit par un scalaire.* D'après le point 2 (appliqué à la suite convergente $(\lambda_n)$ de $\K$), il existe $M \ge 0$ tel que pour tout $n$, $\abs{\lambda_n} \le M$. On écrit
$$\lambda_n u_n - \lambda \ell = \lambda_n (u_n - \ell) + (\lambda_n - \lambda)\ell.$$
Soit $\eps > 0$. Soit $N_1$ tel que $\norm{u_n - \ell} < \frac{\eps}{2(M + 1)}$ pour $n \ge N_1$, et $N_2$ tel que $\abs{\lambda_n - \lambda} < \frac{\eps}{2(\norm{\ell} + 1)}$ pour $n \ge N_2$ (on ajoute 1 aux dénominateurs pour traiter les cas $M = 0$ ou $\ell = 0$). Posons $N = \max(N_1, N_2)$ ; pour $n \ge N$,
$$\begin{aligned}
\norm{\lambda_n u_n - \lambda \ell} &\le \abs{\lambda_n}\,\norm{u_n - \ell} + \abs{\lambda_n - \lambda}\,\norm{\ell} && \text{(inégalité triangulaire, homogénéité)}\\
&< M \cdot \frac{\eps}{2(M + 1)} + \frac{\eps}{2(\norm{\ell} + 1)} \cdot \norm{\ell} && \text{(} n \ge N \text{)}\\
&\le \frac{\eps}{2} + \frac{\eps}{2} = \eps.
\end{aligned}$$

Les quatre points sont démontrés.
:::

::: def id=def-equiv zh="等价范数" en="Equivalent norms" fr="Normes équivalentes" ru="Эквивалентные нормы"
$E$ 上的两个范数 $N_1, N_2$ **等价**，如果存在 $\alpha, \beta > 0$，使得 $\alpha N_1 \le N_2 \le \beta N_1$，即
$$\exists \alpha, \beta > 0,\ \forall x \in E,\quad \alpha N_1(x) \le N_2(x) \le \beta N_1(x).$$
:::

::: fr
Deux normes $N_1, N_2$ sur $E$ sont dites **équivalentes** s'il existe $\alpha, \beta > 0$ tels que $\alpha N_1 \le N_2 \le \beta N_1$, c'est-à-dire
$$\exists \alpha, \beta > 0,\ \forall x \in E,\quad \alpha N_1(x) \le N_2(x) \le \beta N_1(x).$$
:::

白话：两个范数互相控制，只差一个与 $x$ 无关的常数倍。

::: rem
等价是一个等价关系。自反：取 $\alpha = \beta = 1$。对称：由 $\alpha N_1 \le N_2 \le \beta N_1$ 得 $\frac{1}{\beta} N_2 \le N_1 \le \frac{1}{\alpha} N_2$。传递：若 $\alpha N_1 \le N_2 \le \beta N_1$ 且 $\alpha' N_2 \le N_3 \le \beta' N_2$，则 $\alpha\alpha' N_1 \le N_3 \le \beta\beta' N_1$。所以要证明一族范数两两等价，只需证明它们都与某一个固定的范数等价（{@equiv-dimfinie} 的证明正是这样做的）。
:::

::: prop id=equiv-conv lvl=1
若 $N_1, N_2$ 等价，则它们有相同的收敛数列（极限也相同）、相同的有界集、相同的开集。
:::

::: fr
Si $N_1$ et $N_2$ sont équivalentes, elles ont les mêmes suites convergentes (avec les mêmes limites), les mêmes parties bornées et les mêmes ouverts.
:::

::: proof
▷ 思路：三个概念都由「某个范数小于某个数」定义；等价性把一个范数的不等式变成另一个范数的不等式，只是常数变了。

**翻译假设**　存在 $\alpha, \beta > 0$，使对一切 $x \in E$：
$$\alpha N_1(x) \le N_2(x) \le \beta N_1(x) \quad (\ast), \qquad \text{等价地} \qquad \tfrac{1}{\beta} N_2(x) \le N_1(x) \le \tfrac{1}{\alpha} N_2(x) \quad (\ast\ast).$$
$(\ast)$ 与 $(\ast\ast)$ 形式相同，只是 $N_1, N_2$ 互换、常数换成 $\frac1\beta, \frac1\alpha$。所以下面每一步只证「$N_1$ 的性质 $\Rightarrow$ $N_2$ 的性质」，反方向用 $(\ast\ast)$ 代替 $(\ast)$ 即得。

**第 1 步（收敛数列）**　设 $(u_n)$ 对 $N_1$ 收敛到 $\ell$。设 $\eps > 0$。由假设，存在 $N$ 使 $n \ge N$ 时 $N_1(u_n - \ell) < \frac{\eps}{\beta}$。于是对 $n \ge N$，
$$N_2(u_n - \ell) \le \beta N_1(u_n - \ell) < \eps \qquad \text{（由 } (\ast) \text{）}.$$
所以 $(u_n)$ 对 $N_2$ 也收敛到 $\ell$。

**第 2 步（有界集）**　设 $A$ 对 $N_1$ 有界：存在 $M$，使对一切 $x \in A$，$N_1(x) \le M$（{@c1-def-boules} 的等价说法）。由 $(\ast)$，$N_2(x) \le \beta M$，所以 $A$ 对 $N_2$ 有界。

**第 3 步（开集）**　记 $B_i(a, r) = \{x : N_i(x - a) < r\}$（$i = 1, 2$）。先证
$$B_2(a, \alpha r) \subset B_1(a, r). \tag{$\dagger$}$$
若 $N_2(x - a) < \alpha r$，由 $(\ast)$，$\alpha N_1(x - a) \le N_2(x - a) < \alpha r$，除以 $\alpha > 0$ 得 $N_1(x - a) < r$。

现在设 $U$ 对 $N_1$ 是开集（开集的定义见 {@c1-def-ouvert}）。设 $a \in U$。存在 $r > 0$ 使 $B_1(a, r) \subset U$。由 $(\dagger)$，$B_2(a, \alpha r) \subset U$，且 $\alpha r > 0$。所以 $U$ 对 $N_2$ 是开集。

三种性质对 $N_1$ 与 $N_2$ 都相同。
:::

::: fr
▷ Méthode : les trois notions sont définies par des inégalités du type « une norme est inférieure à un réel » ; l'équivalence transforme une inégalité pour l'une des normes en une inégalité pour l'autre, quitte à changer la constante.

**On traduit l'hypothèse**　Il existe $\alpha, \beta > 0$ tels que pour tout $x \in E$ :
$$\alpha N_1(x) \le N_2(x) \le \beta N_1(x) \quad (\ast), \qquad \text{ou de manière équivalente} \qquad \tfrac{1}{\beta} N_2(x) \le N_1(x) \le \tfrac{1}{\alpha} N_2(x) \quad (\ast\ast).$$
$(\ast)$ et $(\ast\ast)$ ont la même forme, à l'échange de $N_1$ et $N_2$ près et avec les constantes $\frac1\beta, \frac1\alpha$. Il suffit donc de montrer à chaque étape « propriété pour $N_1$ $\Rightarrow$ propriété pour $N_2$ » ; le sens réciproque s'obtient en utilisant $(\ast\ast)$ au lieu de $(\ast)$.

**Étape 1 (suites convergentes)**　Supposons que $(u_n)$ converge vers $\ell$ pour $N_1$. Soit $\eps > 0$. Par hypothèse, il existe $N$ tel que pour tout $n \ge N$, $N_1(u_n - \ell) < \frac{\eps}{\beta}$. Alors pour $n \ge N$,
$$N_2(u_n - \ell) \le \beta N_1(u_n - \ell) < \eps \qquad \text{(d'après } (\ast)\text{)}.$$
Ainsi $(u_n)$ converge aussi vers $\ell$ pour $N_2$.

**Étape 2 (parties bornées)**　Supposons $A$ bornée pour $N_1$ : il existe $M$ tel que pour tout $x \in A$, $N_1(x) \le M$ (forme équivalente de la {@fr:c1-def-boules}). D'après $(\ast)$, $N_2(x) \le \beta M$, donc $A$ est bornée pour $N_2$.

**Étape 3 (ouverts)**　Notons $B_i(a, r) = \{x : N_i(x - a) < r\}$ ($i = 1, 2$). Montrons d'abord
$$B_2(a, \alpha r) \subset B_1(a, r). \tag{$\dagger$}$$
Si $N_2(x - a) < \alpha r$, alors d'après $(\ast)$, $\alpha N_1(x - a) \le N_2(x - a) < \alpha r$, et en divisant par $\alpha > 0$, $N_1(x - a) < r$.

Soit maintenant $U$ un ouvert pour $N_1$ (la définition des ouverts est la {@fr:c1-def-ouvert}). Soit $a \in U$. Il existe $r > 0$ tel que $B_1(a, r) \subset U$. D'après $(\dagger)$, $B_2(a, \alpha r) \subset U$, avec $\alpha r > 0$. Donc $U$ est ouvert pour $N_2$.

Les trois propriétés coïncident pour $N_1$ et $N_2$.
:::

::: ex lvl=1
在 $\K^n$ 上：$\norm{x}_\infty \le \norm{x}_2 \le \norm{x}_1 \le n \norm{x}_\infty$。所以这三个范数两两等价。下文 {@equiv-dimfinie} 将说明：有限维空间上**所有**范数都等价。

逐个验证：

- $\norm{x}_\infty \le \norm{x}_2$：取 $i_0$ 使 $\abs{x_{i_0}} = \norm{x}_\infty$，则 $\norm{x}_\infty^2 = \abs{x_{i_0}}^2 \le \sum_i \abs{x_i}^2 = \norm{x}_2^2$。
- $\norm{x}_2 \le \norm{x}_1$：$\norm{x}_1^2 = \big(\sum_i \abs{x_i}\big)^2 = \sum_i \abs{x_i}^2 + \sum_{i \ne j} \abs{x_i}\,\abs{x_j} \ge \sum_i \abs{x_i}^2 = \norm{x}_2^2$。
- $\norm{x}_1 \le n\norm{x}_\infty$：每一项 $\abs{x_i} \le \norm{x}_\infty$，共 $n$ 项。

常数是最优的：$x = e_1 = (1, 0, \dots, 0)$ 时 $\norm{x}_\infty = \norm{x}_2 = \norm{x}_1 = 1$；$x = (1, \dots, 1)$ 时 $\norm{x}_1 = n = n\norm{x}_\infty$。注意常数 $n$ 依赖于维数——这预示了无穷维时等价性会失败。
:::

::: cex id=cex-normes-c01 lvl=1
在 $\Cc([0,1], \R)$ 上，$\norm{\cdot}_1$ 与 $\norm{\cdot}_\infty$ 不等价。取 $f_n(x) = x^n$：$\norm{f_n}_\infty = 1$，而 $\norm{f_n}_1 = \frac{1}{n+1} \to 0$。所以 $(f_n)$ 对 $\norm{\cdot}_1$ 收敛到 $0$，但对 $\norm{\cdot}_\infty$ 不收敛到 $0$。无穷维空间中，「收敛」依赖于范数的选取。

**计算。** $x \mapsto x^n$ 在 $[0,1]$ 上递增，所以 $\norm{f_n}_\infty = f_n(1) = 1$；$\norm{f_n}_1 = \int_0^1 x^n \,\dd x = \frac{1}{n+1}$。

**不等价。** 反设存在 $\alpha > 0$ 使对一切 $f$，$\alpha \norm{f}_\infty \le \norm{f}_1$。用于 $f_n$：$\alpha \le \frac{1}{n+1}$ 对一切 $n$ 成立，令 $n \to \infty$ 得 $\alpha \le 0$，矛盾。

另一侧的不等式是成立的：$\norm{f}_1 = \int_0^1 \abs{f} \le \int_0^1 \norm{f}_\infty = \norm{f}_\infty$。所以 $\norm{\cdot}_\infty$-收敛蕴含 $\norm{\cdot}_1$-收敛，反之不然。
:::

::: def id=c1-def-vadh zh="子列与数列的聚点" en="Subsequence, cluster point of a sequence" fr="Suite extraite, valeur d'adhérence" ru="Подпоследовательность, частичный предел"
设 $\varphi : \N \to \N$ 严格递增（抽取函数），称 $(u_{\varphi(n)})_{n \in \N}$ 为 $(u_n)$ 的**子列**（suite extraite）。$a \in E$ 称为 $(u_n)$ 的**聚点**（valeur d'adhérence），如果存在子列 $u_{\varphi(n)} \to a$：
$$\exists \varphi : \N \to \N \text{ 严格递增},\quad u_{\varphi(n)} \xrightarrow[n \to \infty]{} a.$$
:::

::: fr
Soit $\varphi : \N \to \N$ strictement croissante (une extractrice) ; la suite $(u_{\varphi(n)})_{n \in \N}$ est appelée **suite extraite** (ou sous-suite) de $(u_n)$. On dit que $a \in E$ est une **valeur d'adhérence** de $(u_n)$ s'il existe une suite extraite $u_{\varphi(n)} \to a$ :
$$\exists \varphi : \N \to \N \text{ strictement croissante},\quad u_{\varphi(n)} \xrightarrow[n \to \infty]{} a.$$
:::

::: lem id=c1-sous-suite zh="子列的基本性质" lvl=1
1. 若 $\varphi$ 是抽取函数，则对一切 $n$，$\varphi(n) \ge n$。
2. 两个抽取函数的复合 $\varphi \circ \psi$ 仍是抽取函数，$(u_{\varphi(\psi(n))})$ 是 $(u_{\varphi(n)})$ 的子列，也是 $(u_n)$ 的子列。
3. 若 $u_n \to \ell$，则它的每个子列都收敛到 $\ell$。因此收敛数列恰有一个聚点，即它的极限。
:::

::: fr
1. Si $\varphi$ est une extractrice, alors $\varphi(n) \ge n$ pour tout $n$.
2. La composée $\varphi \circ \psi$ de deux extractrices est une extractrice ; $(u_{\varphi(\psi(n))})$ est extraite de $(u_{\varphi(n)})$, donc aussi de $(u_n)$.
3. Si $u_n \to \ell$, alors toute suite extraite de $(u_n)$ converge vers $\ell$. Par conséquent, une suite convergente a exactement une valeur d'adhérence, sa limite.
:::

::: proof
**1**　对 $n$ 归纳。**初始化**：$\varphi(0) \in \N$，所以 $\varphi(0) \ge 0$。**递推**：设 $\varphi(n) \ge n$。由严格递增，$\varphi(n + 1) > \varphi(n) \ge n$；$\varphi(n+1)$ 是整数且严格大于 $n$，所以 $\varphi(n + 1) \ge n + 1$。

**2**　若 $n < m$，则 $\psi(n) < \psi(m)$（$\psi$ 严格递增），再由 $\varphi$ 严格递增，$\varphi(\psi(n)) < \varphi(\psi(m))$。令 $v_n = u_{\varphi(n)}$，则 $v_{\psi(n)} = u_{\varphi(\psi(n))}$，所以它是 $(v_n)$ 的子列，也是 $(u_n)$ 的（抽取函数 $\varphi \circ \psi$）子列。

**3**　设 $\varphi$ 是抽取函数，$\eps > 0$。由 $u_n \to \ell$，存在 $N$ 使 $n \ge N$ 时 $\norm{u_n - \ell} < \eps$。对 $n \ge N$，由第 1 条，$\varphi(n) \ge n \ge N$，所以 $\norm{u_{\varphi(n)} - \ell} < \eps$。这就证明了 $u_{\varphi(n)} \to \ell$。

于是：$\ell$ 是聚点（取 $\varphi = \mathrm{id}$）；若 $a$ 是聚点，则某个子列收敛到 $a$，而它又收敛到 $\ell$，由极限唯一（{@c1-suites-prop}），$a = \ell$。
:::

::: fr
**1**　Par récurrence sur $n$. **Initialisation** : $\varphi(0) \in \N$, donc $\varphi(0) \ge 0$. **Hérédité** : supposons $\varphi(n) \ge n$. Par stricte croissance, $\varphi(n + 1) > \varphi(n) \ge n$ ; comme $\varphi(n+1)$ est un entier strictement supérieur à $n$, on a $\varphi(n + 1) \ge n + 1$.

**2**　Si $n < m$, alors $\psi(n) < \psi(m)$ ($\psi$ strictement croissante), puis $\varphi(\psi(n)) < \varphi(\psi(m))$ ($\varphi$ strictement croissante). Posons $v_n = u_{\varphi(n)}$ ; alors $v_{\psi(n)} = u_{\varphi(\psi(n))}$, qui est donc extraite de $(v_n)$, et aussi de $(u_n)$ (par l'extractrice $\varphi \circ \psi$).

**3**　Soient $\varphi$ une extractrice et $\eps > 0$. Comme $u_n \to \ell$, il existe $N$ tel que pour tout $n \ge N$, $\norm{u_n - \ell} < \eps$. Pour $n \ge N$, d'après le point 1, $\varphi(n) \ge n \ge N$, donc $\norm{u_{\varphi(n)} - \ell} < \eps$. Ainsi $u_{\varphi(n)} \to \ell$.

Par conséquent : $\ell$ est une valeur d'adhérence (prendre $\varphi = \mathrm{id}$) ; si $a$ est une valeur d'adhérence, une suite extraite converge vers $a$ et aussi vers $\ell$, donc $a = \ell$ par unicité de la limite ({@fr:c1-suites-prop}).
:::

::: ex zh="聚点"
1. $u_n = (-1)^n$（在 $\R$ 中）：$u_{2n} = 1 \to 1$，$u_{2n+1} = -1 \to -1$，所以 $1$ 与 $-1$ 都是聚点。由 {@c1-sous-suite} 第 3 条的逆否命题，一个有两个不同聚点的数列发散。
2. 在 $(\R^2, \norm{\cdot}_2)$ 中，$u_n = \big(\cos\frac{n\pi}{2}, \sin\frac{n\pi}{2}\big)$ 依次取 $(1,0), (0,1), (-1,0), (0,-1)$ 四个值，周期为 4；子列 $(u_{4n + k})_n$（$k = 0, 1, 2, 3$）是常数列，所以这四个点都是聚点。
3. $u_n = n$（在 $\R$ 中）没有聚点：任何子列满足 $u_{\varphi(n)} = \varphi(n) \ge n$，无界，由 {@c1-suites-prop} 第 2 条不收敛。
:::

::: q
设 $N_1, N_2$ 是 $E$ 上的范数，只知道单侧不等式 $N_1 \le N_2$。$N_2$-收敛能推出 $N_1$-收敛吗？反过来呢？
:::

::: ans
$N_2$-收敛 $\Rightarrow$ $N_1$-收敛：$N_1(u_n - \ell) \le N_2(u_n - \ell) \to 0$。

反过来不成立。在 $\Cc([0,1], \R)$ 上，$\norm{\cdot}_1 \le \norm{\cdot}_\infty$（{@cex-normes-c01}），取 $N_1 = \norm{\cdot}_1$，$N_2 = \norm{\cdot}_\infty$：$f_n(x) = x^n$ 对 $N_1$ 收敛到 $0$，但 $N_2(f_n - 0) = 1$，对 $N_2$ 不收敛到 $0$。所以单侧不等式只能「单向传递」收敛性；等价性要求两侧不等式。
:::

::: q
在 $\Cc([0,1], \R)$ 上，$\norm{\cdot}_1$ 与 $\norm{\cdot}_2$ 等价吗？
:::

::: ans
不等价。

- 一侧成立：由 Cauchy–Schwarz 不等式（{@holder}，$p = q = 2$，取 $g = 1$），$\norm{f}_1 = \int_0^1 \abs{f} \cdot 1 \le \big(\int_0^1 \abs{f}^2\big)^{1/2} \big(\int_0^1 1\big)^{1/2} = \norm{f}_2$。
- 另一侧不成立：取 $f_n(x) = x^n$，$\norm{f_n}_1 = \frac{1}{n+1}$，$\norm{f_n}_2 = \big(\int_0^1 x^{2n}\,\dd x\big)^{1/2} = \frac{1}{\sqrt{2n+1}}$，
  $$\frac{\norm{f_n}_2}{\norm{f_n}_1} = \frac{n+1}{\sqrt{2n+1}} \xrightarrow[n \to \infty]{} +\infty.$$
  若存在 $\beta$ 使 $\norm{f}_2 \le \beta \norm{f}_1$，则 $\frac{n+1}{\sqrt{2n+1}} \le \beta$ 对一切 $n$ 成立，矛盾。
:::

## 开集、闭集、闭包与内部

在 $\R$ 中，开区间 $]a, b[$ 的特点是：其中每一点的周围都还有「余地」。本节用球把这个想法推广到赋范空间，得到开集与闭集；再定义内部、闭包、边界，并证明本章最常用的工具之一——闭包的序列刻画（{@carac-seq-adh}）：判断一个集合是否闭，只需看其中的收敛数列的极限是否还在集合里。

::: def id=c1-def-ouvert zh="开集与闭集" en="Open and closed sets" fr="Ouverts et fermés" ru="Открытые и замкнутые множества"
$U \subset E$ 是**开集**，如果对每个 $a \in U$，存在 $r > 0$ 使 $B(a, r) \subset U$：
$$\forall a \in U,\ \exists r > 0,\quad B(a, r) \subset U.$$
$F \subset E$ 是**闭集**，如果 $E \setminus F$ 是开集。
:::

::: fr
Une partie $U \subset E$ est un **ouvert** si pour tout $a \in U$, il existe $r > 0$ tel que $B(a, r) \subset U$ :
$$\forall a \in U,\ \exists r > 0,\quad B(a, r) \subset U.$$
Une partie $F \subset E$ est un **fermé** si $E \setminus F$ est un ouvert.
:::

白话：开集中的每一点周围都留有一个小球的「余地」。闭集是用补集定义的——「闭」**不是**「不开」的意思：一个集合可以既开又闭，也可以既不开也不闭。

::: ex zh="开集与闭集的例子"
1. $E$ 与 $\varnothing$ 都是开集（对 $\varnothing$，条件「对每个 $a \in \varnothing$……」无需验证）。它们互为补集，所以也都是闭集。
2. 在 $\R$ 中，$]0, 1[$ 是开集：对 $a \in \,]0, 1[$，令 $r = \min(a, 1 - a) > 0$，则 $a - r \ge 0$，$a + r \le 1$，所以 $]a - r, a + r[ \,\subset\, ]0, 1[$。
3. 在 $\R$ 中，$A = [0, 1[$ 既不开也不闭。
   - 不开：$0 \in A$，但对每个 $r > 0$，点 $-\frac r2 \in B(0, r)$ 而 $-\frac r2 \notin A$。
   - 不闭：补集 $\R \setminus A = \,]-\infty, 0[ \,\cup\, [1, +\infty[$ 含 $1$，而对每个 $r > 0$，点 $1 - \frac{\min(r, 1)}{2}$ 属于 $B(1, r)$，又属于 $[\frac12, 1[ \,\subset A$，不在补集中。所以补集不是开集。
:::

::: prop id=c1-ouverts-stab zh="开集与闭集的运算" en="Stability of open and closed sets" fr="Stabilité des ouverts et des fermés" ru="Свойства открытых и замкнутых множеств" lvl=1
任意多个开集的并、有限多个开集的交都是开集；任意多个闭集的交、有限多个闭集的并都是闭集。开球是开集，闭球与球面是闭集。
:::

::: fr
Toute réunion (quelconque) d'ouverts et toute intersection finie d'ouverts sont des ouverts ; toute intersection (quelconque) de fermés et toute réunion finie de fermés sont des fermés. Une boule ouverte est un ouvert ; une boule fermée et une sphère sont des fermés.
:::

::: proof
▷ 思路：每一条都归结为「找一个半径」。闭集的结论由开集的结论取补集得到。

**第 1 步（任意并）**　设 $(U_i)_{i \in I}$ 是一族开集，$a \in \bigcup_{i} U_i$。存在 $i_0 \in I$ 使 $a \in U_{i_0}$。由 $U_{i_0}$ 开，存在 $r > 0$ 使 $B(a, r) \subset U_{i_0} \subset \bigcup_i U_i$。

**第 2 步（有限交）**　设 $U_1, \dots, U_p$ 是开集，$a \in U_1 \cap \dots \cap U_p$。对每个 $k$，存在 $r_k > 0$ 使 $B(a, r_k) \subset U_k$。令 $r = \min(r_1, \dots, r_p)$；有限个正数的最小值为正，所以 $r > 0$。对每个 $k$，$B(a, r) \subset B(a, r_k) \subset U_k$，所以 $B(a, r) \subset U_1 \cap \dots \cap U_p$。

**第 3 步（闭集）**　由 De Morgan 公式，
$$E \setminus \bigcap_{i \in I} F_i = \bigcup_{i \in I} (E \setminus F_i), \qquad E \setminus \bigcup_{k=1}^{p} F_k = \bigcap_{k=1}^{p} (E \setminus F_k).$$
若 $F_i$ 都是闭集，右边分别是任意多个开集的并、有限多个开集的交，由第 1、2 步是开集；所以左边括号里的集合是闭集。

**第 4 步（开球是开集）**　设 $x \in B(a, r)$。令 $\rho = r - \norm{x - a} > 0$。对 $y \in B(x, \rho)$，
$$\norm{y - a} \le \norm{y - x} + \norm{x - a} < \rho + \norm{x - a} = r,$$
所以 $B(x, \rho) \subset B(a, r)$。

**第 5 步（闭球是闭集）**　要证补集 $V = \{x : \norm{x - a} > r\}$ 是开集。设 $x \in V$，令 $\rho = \norm{x - a} - r > 0$。对 $y \in B(x, \rho)$，由反向三角不等式（{@c1-ineg-tri-inverse}），
$$\norm{y - a} \ge \norm{x - a} - \norm{x - y} > \norm{x - a} - \rho = r,$$
所以 $B(x, \rho) \subset V$。

**第 6 步（球面是闭集）**　$S(a, r) = \overline{B}(a, r) \cap \big(E \setminus B(a, r)\big)$。$\overline{B}(a, r)$ 是闭集（第 5 步）；$E \setminus B(a, r)$ 的补集 $B(a, r)$ 是开集（第 4 步），所以它是闭集。由第 3 步，两个闭集的交是闭集。
:::

::: fr
▷ Méthode : chaque point se ramène à « trouver un rayon ». Les énoncés sur les fermés s'obtiennent par passage au complémentaire.

**Étape 1 (réunion quelconque)**　Soient $(U_i)_{i \in I}$ une famille d'ouverts et $a \in \bigcup_{i} U_i$. Il existe $i_0 \in I$ tel que $a \in U_{i_0}$. Comme $U_{i_0}$ est ouvert, il existe $r > 0$ tel que $B(a, r) \subset U_{i_0} \subset \bigcup_i U_i$.

**Étape 2 (intersection finie)**　Soient $U_1, \dots, U_p$ des ouverts et $a \in U_1 \cap \dots \cap U_p$. Pour chaque $k$, il existe $r_k > 0$ tel que $B(a, r_k) \subset U_k$. Posons $r = \min(r_1, \dots, r_p)$ ; le minimum d'un nombre fini de réels strictement positifs est strictement positif, donc $r > 0$. Pour tout $k$, $B(a, r) \subset B(a, r_k) \subset U_k$, d'où $B(a, r) \subset U_1 \cap \dots \cap U_p$.

**Étape 3 (fermés)**　D'après les formules de De Morgan,
$$E \setminus \bigcap_{i \in I} F_i = \bigcup_{i \in I} (E \setminus F_i), \qquad E \setminus \bigcup_{k=1}^{p} F_k = \bigcap_{k=1}^{p} (E \setminus F_k).$$
Si les $F_i$ sont fermés, les membres de droite sont respectivement une réunion quelconque et une intersection finie d'ouverts, donc des ouverts d'après les étapes 1 et 2 ; les ensembles entre parenthèses à gauche sont donc fermés.

**Étape 4 (une boule ouverte est ouverte)**　Soit $x \in B(a, r)$. Posons $\rho = r - \norm{x - a} > 0$. Pour $y \in B(x, \rho)$,
$$\norm{y - a} \le \norm{y - x} + \norm{x - a} < \rho + \norm{x - a} = r,$$
donc $B(x, \rho) \subset B(a, r)$.

**Étape 5 (une boule fermée est fermée)**　Montrons que le complémentaire $V = \{x : \norm{x - a} > r\}$ est ouvert. Soit $x \in V$ ; posons $\rho = \norm{x - a} - r > 0$. Pour $y \in B(x, \rho)$, d'après l'inégalité triangulaire inverse ({@fr:c1-ineg-tri-inverse}),
$$\norm{y - a} \ge \norm{x - a} - \norm{x - y} > \norm{x - a} - \rho = r,$$
donc $B(x, \rho) \subset V$.

**Étape 6 (une sphère est fermée)**　$S(a, r) = \overline{B}(a, r) \cap \big(E \setminus B(a, r)\big)$. La boule $\overline{B}(a, r)$ est fermée (étape 5) ; le complémentaire de $E \setminus B(a, r)$ est $B(a, r)$, ouvert (étape 4), donc $E \setminus B(a, r)$ est fermé. D'après l'étape 3, l'intersection de deux fermés est fermée.
:::

::: cex lvl=1
无穷多个开集的交未必是开集：在 $\R$ 中 $\bigcap_{n \ge 1} \left]-\frac1n, \frac1n\right[ = \{0\}$。

**验证。** $0$ 属于每个区间。若 $x \ne 0$，取整数 $n > \frac{1}{\abs{x}}$（Archimedes 性质），则 $\abs{x} > \frac1n$，$x \notin \left]-\frac1n, \frac1n\right[$。所以交集为 $\{0\}$。它不是开集：对每个 $r > 0$，$\frac r2 \in B(0, r)$ 但 $\frac r2 \ne 0$。

同样，无穷多个闭集的并未必是闭集：$\bigcup_{n \ge 1} \left[\frac1n, 1\right] = \,]0, 1]$（若 $x \in \,]0, 1]$，取 $n \ge \frac1x$ 则 $\frac1n \le x$），而 $]0, 1]$ 不是闭集（数列 $\frac1n \in \,]0,1]$ 收敛到 $0 \notin \,]0,1]$，见 {@carac-seq-adh}）。{@c1-ouverts-stab} 证明的第 2 步中，「有限」用在 $\min$ 上：无穷多个正数 $r_k$ 的下确界可以是 $0$（这里 $r_k = \frac1k$）。
:::

::: def id=c1-def-int-adh zh="内部、闭包、边界、稠密" en="Interior, closure, boundary, dense" fr="Intérieur, adhérence, frontière, densité" ru="Внутренность, замыкание, граница, плотность"
$A$ 的**内部** $\mathring{A}$ 是包含于 $A$ 的最大开集；$A$ 的**闭包** $\overline{A}$ 是包含 $A$ 的最小闭集；**边界** $\partial A = \overline{A} \setminus \mathring{A}$。若 $\overline{A} = E$，称 $A$ 在 $E$ 中**稠密**。具体地，
$$\mathring{A} = \bigcup_{\substack{U \text{ 开集} \\ U \subset A}} U, \qquad \overline{A} = \bigcap_{\substack{F \text{ 闭集} \\ F \supset A}} F.$$
内部也记作 $\operatorname{int} A$。
:::

::: fr
L'**intérieur** $\mathring{A}$ de $A$ est le plus grand ouvert contenu dans $A$ ; l'**adhérence** $\overline{A}$ de $A$ est le plus petit fermé contenant $A$ ; la **frontière** de $A$ est $\partial A = \overline{A} \setminus \mathring{A}$. Si $\overline{A} = E$, on dit que $A$ est **dense** dans $E$. Concrètement,
$$\mathring{A} = \bigcup_{\substack{U \text{ ouvert} \\ U \subset A}} U, \qquad \overline{A} = \bigcap_{\substack{F \text{ fermé} \\ F \supset A}} F.$$
L'intérieur est aussi noté $\operatorname{int} A$.
:::

由 {@c1-ouverts-stab}，右边的并是开集，交是闭集；它包含（被包含于）每一个参与运算的集合，这正是「最大」「最小」的含义。参与求交的闭集至少有 $E$ 本身，参与求并的开集至少有 $\varnothing$，所以两个公式都有意义。

::: lem id=c1-carac-int-adh zh="内部与闭包的球刻画" en="Interior and closure via balls" fr="Caractérisation de l'intérieur et de l'adhérence par les boules" ru="Описание внутренности и замыкания через шары" lvl=1
设 $A \subset E$，$a \in E$。

1. $a \in \mathring{A} \iff \exists r > 0,\ B(a, r) \subset A$；
2. $a \in \overline{A} \iff \forall r > 0,\ B(a, r) \cap A \ne \varnothing$；
3. $E \setminus \overline{A} = \operatorname{int}(E \setminus A)$；$A$ 闭 $\iff A = \overline{A}$；$A$ 开 $\iff A = \mathring{A}$。
:::

::: fr
Soient $A \subset E$ et $a \in E$.

1. $a \in \mathring{A} \iff \exists r > 0,\ B(a, r) \subset A$ ;
2. $a \in \overline{A} \iff \forall r > 0,\ B(a, r) \cap A \ne \varnothing$ ;
3. $E \setminus \overline{A} = \operatorname{int}(E \setminus A)$ ; $A$ est fermé $\iff A = \overline{A}$ ; $A$ est ouvert $\iff A = \mathring{A}$.
:::

::: proof
**1**　(⇒) $\mathring{A}$ 是开集且 $a \in \mathring{A}$，所以存在 $r > 0$ 使 $B(a, r) \subset \mathring{A}$；而 $\mathring{A}$ 是 $A$ 的子集的并，$\mathring{A} \subset A$。(⇐) $B(a, r)$ 是开集（{@c1-ouverts-stab}）且包含于 $A$，所以它是定义中参与求并的集合之一，$a \in B(a, r) \subset \mathring{A}$。

**2**　两个方向都证逆否命题。

(⇒) 设存在 $r > 0$ 使 $B(a, r) \cap A = \varnothing$。则 $F = E \setminus B(a, r)$ 是闭集（补集 $B(a,r)$ 是开集）且 $F \supset A$。由闭包的定义，$\overline{A} \subset F$；而 $a \in B(a, r)$，即 $a \notin F$，所以 $a \notin \overline{A}$。

(⇐) 设 $a \notin \overline{A}$。$\overline{A}$ 是闭集，所以 $E \setminus \overline{A}$ 是含 $a$ 的开集：存在 $r > 0$ 使 $B(a, r) \subset E \setminus \overline{A} \subset E \setminus A$，即 $B(a, r) \cap A = \varnothing$。

**3**　对 $a \in E$：
$$a \in E \setminus \overline{A} \overset{(2)}{\iff} \exists r > 0,\ B(a, r) \cap A = \varnothing \iff \exists r > 0,\ B(a, r) \subset E \setminus A \overset{(1)}{\iff} a \in \operatorname{int}(E \setminus A).$$
若 $A$ 闭，则 $A$ 是包含 $A$ 的闭集之一，所以 $\overline{A} \subset A$；又每个参与求交的闭集都包含 $A$，所以 $A \subset \overline{A}$；故 $A = \overline{A}$。反之若 $A = \overline{A}$，$A$ 是闭集的交，是闭集。「$A$ 开 $\iff A = \mathring{A}$」的证明相同：把「闭集、包含 $A$、交」换成「开集、包含于 $A$、并」。
:::

::: fr
**1**　(⇒) $\mathring{A}$ est ouvert et $a \in \mathring{A}$, donc il existe $r > 0$ tel que $B(a, r) \subset \mathring{A}$ ; et $\mathring{A} \subset A$ comme réunion de parties de $A$. (⇐) $B(a, r)$ est un ouvert ({@fr:c1-ouverts-stab}) contenu dans $A$ ; c'est donc l'un des ouverts de la réunion qui définit $\mathring{A}$, et $a \in B(a, r) \subset \mathring{A}$.

**2**　On montre les deux implications par contraposée.

(⇒) Supposons qu'il existe $r > 0$ tel que $B(a, r) \cap A = \varnothing$. Alors $F = E \setminus B(a, r)$ est un fermé (son complémentaire $B(a, r)$ est ouvert) qui contient $A$. Par définition de l'adhérence, $\overline{A} \subset F$ ; or $a \in B(a, r)$, c'est-à-dire $a \notin F$, donc $a \notin \overline{A}$.

(⇐) Supposons $a \notin \overline{A}$. Comme $\overline{A}$ est fermé, $E \setminus \overline{A}$ est un ouvert contenant $a$ : il existe $r > 0$ tel que $B(a, r) \subset E \setminus \overline{A} \subset E \setminus A$, c'est-à-dire $B(a, r) \cap A = \varnothing$.

**3**　Pour $a \in E$ :
$$a \in E \setminus \overline{A} \overset{(2)}{\iff} \exists r > 0,\ B(a, r) \cap A = \varnothing \iff \exists r > 0,\ B(a, r) \subset E \setminus A \overset{(1)}{\iff} a \in \operatorname{int}(E \setminus A).$$
Si $A$ est fermé, $A$ est l'un des fermés contenant $A$, donc $\overline{A} \subset A$ ; de plus chaque fermé de l'intersection contient $A$, donc $A \subset \overline{A}$ ; ainsi $A = \overline{A}$. Réciproquement, si $A = \overline{A}$, $A$ est une intersection de fermés, donc fermé. La preuve de « $A$ ouvert $\iff A = \mathring{A}$ » est identique en remplaçant « fermés contenant $A$, intersection » par « ouverts contenus dans $A$, réunion ».
:::

::: ex zh="计算内部、闭包与边界"
1. $A = [0, 1[$（在 $\R$ 中）：$\mathring{A} = \,]0, 1[$，$\overline{A} = [0, 1]$，$\partial A = \{0, 1\}$。
   - 内部：$]0,1[$ 是含于 $A$ 的开集，所以 $]0,1[ \,\subset \mathring{A}$；而 $0 \notin \mathring{A}$，因为每个 $B(0, r)$ 含 $-\frac r2 \notin A$（{@c1-carac-int-adh} 第 1 条）。
   - 闭包：$[0,1]$ 是包含 $A$ 的闭集（补集 $]-\infty, 0[ \,\cup\, ]1, +\infty[$ 是开集），所以 $\overline{A} \subset [0,1]$；而 $1 \in \overline{A}$，因为每个 $B(1, r)$ 含 $1 - \frac{\min(r,1)}{2} \in A$（第 2 条）。
2. $\Q$（在 $\R$ 中）：每个区间 $]a - r, a + r[$ 既含有理数也含无理数，所以 $\mathring{\Q} = \varnothing$（第 1 条），$\overline{\Q} = \R$（第 2 条），$\partial \Q = \R$。
:::

::: thm id=carac-seq-adh zh="闭包的序列刻画" en="Sequential characterisation of closure" fr="Caractérisation séquentielle de l'adhérence" ru="Секвенциальная характеризация замыкания" lvl=1
$a \in \overline{A}$ 当且仅当存在 $A$ 中的数列收敛到 $a$。因此，$A$ 是闭集当且仅当 $A$ 中任何收敛数列的极限都属于 $A$。
:::

::: fr
On a $a \in \overline{A}$ si et seulement s'il existe une suite d'éléments de $A$ qui converge vers $a$. Par conséquent, $A$ est fermé si et seulement si la limite de toute suite convergente d'éléments de $A$ appartient à $A$.
:::

::: proof
▷ 思路：用 {@c1-carac-int-adh} 第 2 条——$a \in \overline{A}$ 等价于每个球 $B(a, r)$ 都碰到 $A$。取 $r = \frac{1}{n+1}$ 就得到一个数列。

**(⇒)**　设 $a \in \overline{A}$。对每个 $n \in \N$，由 {@c1-carac-int-adh} 第 2 条（取 $r = \frac{1}{n+1}$），$B\big(a, \frac{1}{n+1}\big) \cap A \ne \varnothing$；从中取一点 $u_n$。则 $u_n \in A$ 且 $\norm{u_n - a} < \frac{1}{n+1}$。设 $\eps > 0$，令 $N = \lfloor 1/\eps \rfloor$，则 $N + 1 > \frac1\eps$；对 $n \ge N$，$\norm{u_n - a} < \frac{1}{n+1} \le \frac{1}{N+1} < \eps$。所以 $u_n \to a$。

**(⇐)**　设 $u_n \in A$，$u_n \to a$。设 $r > 0$。由收敛的定义，存在 $N$ 使 $\norm{u_N - a} < r$，即 $u_N \in B(a, r) \cap A$。所以每个 $B(a, r)$ 都碰到 $A$，由 {@c1-carac-int-adh} 第 2 条，$a \in \overline{A}$。

**第二个结论**　由 {@c1-carac-int-adh} 第 3 条，$A$ 闭 $\iff A = \overline{A}$。若 $A$ 闭且 $A \ni u_n \to a$，由 (⇐)，$a \in \overline{A} = A$。反之，若 $A$ 中收敛数列的极限都属于 $A$：对 $a \in \overline{A}$，由 (⇒) 存在 $A$ 中的数列收敛到 $a$，所以 $a \in A$；于是 $\overline{A} \subset A \subset \overline{A}$，$A = \overline{A}$ 是闭集。
:::

::: fr
▷ Méthode : on utilise le point 2 du {@fr:c1-carac-int-adh} : $a \in \overline{A}$ si et seulement si toute boule $B(a, r)$ rencontre $A$. En prenant $r = \frac{1}{n+1}$, on obtient une suite.

**(⇒)**　Soit $a \in \overline{A}$. Pour tout $n \in \N$, d'après le point 2 du {@fr:c1-carac-int-adh} (avec $r = \frac{1}{n+1}$), $B\big(a, \frac{1}{n+1}\big) \cap A \ne \varnothing$ ; choisissons-y un point $u_n$. Alors $u_n \in A$ et $\norm{u_n - a} < \frac{1}{n+1}$. Soit $\eps > 0$ ; posons $N = \lfloor 1/\eps \rfloor$, de sorte que $N + 1 > \frac1\eps$. Pour $n \ge N$, $\norm{u_n - a} < \frac{1}{n+1} \le \frac{1}{N+1} < \eps$. Ainsi $u_n \to a$.

**(⇐)**　Soit $(u_n)$ une suite de $A$ telle que $u_n \to a$. Soit $r > 0$. Par définition de la convergence, il existe $N$ tel que $\norm{u_N - a} < r$, c'est-à-dire $u_N \in B(a, r) \cap A$. Toute boule $B(a, r)$ rencontre donc $A$, et d'après le point 2 du {@fr:c1-carac-int-adh}, $a \in \overline{A}$.

**Seconde assertion**　D'après le point 3 du {@fr:c1-carac-int-adh}, $A$ est fermé $\iff A = \overline{A}$. Si $A$ est fermé et $A \ni u_n \to a$, alors d'après (⇐), $a \in \overline{A} = A$. Réciproquement, supposons que la limite de toute suite convergente de $A$ appartienne à $A$ : pour $a \in \overline{A}$, d'après (⇒), il existe une suite de $A$ qui converge vers $a$, donc $a \in A$ ; ainsi $\overline{A} \subset A \subset \overline{A}$, et $A = \overline{A}$ est fermé.
:::

::: ex
$\Q$ 在 $\R$ 中稠密。多项式函数在 $(\Cc([a,b]), \norm{\cdot}_\infty)$ 中稠密（Weierstrass 定理，第 3 章 {@weierstrass}）。

**$\Q$ 稠密的序列证明。** 设 $x \in \R$。对 $n \ge 1$，令 $q_n = \frac{\lfloor nx \rfloor}{n} \in \Q$。由 $\lfloor nx \rfloor \le nx < \lfloor nx \rfloor + 1$ 得 $0 \le x - q_n < \frac1n$，所以 $q_n \to x$，由 {@carac-seq-adh}，$x \in \overline{\Q}$。把 $q_n$ 换成 $q_n + \frac{\sqrt2}{n}$（有理数加无理数，是无理数），它到 $x$ 的距离 $< \frac{1 + \sqrt2}{n} \to 0$，所以 $\R \setminus \Q$ 也在 $\R$ 中稠密。

**注意范数。** 由于 $\norm{f}_1 \le (b - a)\norm{f}_\infty$，在 $\norm{\cdot}_\infty$ 下逼近 $f$ 的多项式列在 $\norm{\cdot}_1$ 下也逼近 $f$；所以多项式对 $\norm{\cdot}_1$ 也稠密。稠密性和开闭性一样依赖于范数，但「更强」的范数下稠密蕴含「更弱」的范数下稠密。
:::

::: lem id=c1-dist zh="点到集合的距离" en="Distance to a set" fr="Distance à une partie" ru="Расстояние от точки до множества" lvl=1
设 $A \subset E$ 非空。对 $x \in E$ 令 $d(x, A) = \inf_{a \in A} \norm{x - a}$（非空且以 $0$ 为下界的实数集有下确界）。则：

1. 对一切 $x, y \in E$，$\abs{d(x, A) - d(y, A)} \le \norm{x - y}$；
2. $d(x, A) = 0 \iff x \in \overline{A}$。
:::

::: fr
Soit $A \subset E$ non vide. Pour $x \in E$, on pose $d(x, A) = \inf_{a \in A} \norm{x - a}$ (borne inférieure d'une partie non vide de $\R$ minorée par $0$). Alors :

1. pour tous $x, y \in E$, $\abs{d(x, A) - d(y, A)} \le \norm{x - y}$ ;
2. $d(x, A) = 0 \iff x \in \overline{A}$.
:::

::: proof
**1**　▷ 证 $d(x, A) \le \norm{x - y} + d(y, A)$，再交换 $x, y$。

设 $a \in A$。由下确界的定义与三角不等式，
$$d(x, A) \le \norm{x - a} \le \norm{x - y} + \norm{y - a}.$$
所以 $d(x, A) - \norm{x - y} \le \norm{y - a}$ 对一切 $a \in A$ 成立，即 $d(x, A) - \norm{x - y}$ 是集合 $\{\norm{y - a} : a \in A\}$ 的一个下界。下确界是最大的下界，所以 $d(x, A) - \norm{x - y} \le d(y, A)$。交换 $x$ 与 $y$ 的位置（$\norm{y - x} = \norm{x - y}$），得 $d(y, A) - \norm{x - y} \le d(x, A)$。两式合起来即为结论。

**2**　(⇒) 设 $d(x, A) = 0$，$r > 0$。$r$ 大于最大下界 $0$，所以 $r$ 不是下界：存在 $a \in A$ 使 $\norm{x - a} < r$，即 $B(x, r) \cap A \ne \varnothing$。由 {@c1-carac-int-adh} 第 2 条，$x \in \overline{A}$。

(⇐) 设 $x \in \overline{A}$。反设 $\delta = d(x, A) > 0$。由 {@c1-carac-int-adh} 第 2 条（取 $r = \delta$），存在 $a \in A$ 使 $\norm{x - a} < \delta = \inf_{a' \in A} \norm{x - a'}$，矛盾。所以 $d(x, A) = 0$。
:::

::: fr
**1**　▷ On montre $d(x, A) \le \norm{x - y} + d(y, A)$, puis on échange $x$ et $y$.

Soit $a \in A$. Par définition de la borne inférieure et par l'inégalité triangulaire,
$$d(x, A) \le \norm{x - a} \le \norm{x - y} + \norm{y - a}.$$
Ainsi $d(x, A) - \norm{x - y} \le \norm{y - a}$ pour tout $a \in A$ : le réel $d(x, A) - \norm{x - y}$ est un minorant de $\{\norm{y - a} : a \in A\}$. La borne inférieure étant le plus grand des minorants, $d(x, A) - \norm{x - y} \le d(y, A)$. En échangeant $x$ et $y$ (et puisque $\norm{y - x} = \norm{x - y}$), on obtient $d(y, A) - \norm{x - y} \le d(x, A)$. Les deux inégalités donnent le résultat.

**2**　(⇒) Supposons $d(x, A) = 0$ et soit $r > 0$. Le réel $r$ est strictement supérieur au plus grand minorant $0$, ce n'est donc pas un minorant : il existe $a \in A$ tel que $\norm{x - a} < r$, c'est-à-dire $B(x, r) \cap A \ne \varnothing$. D'après le point 2 du {@fr:c1-carac-int-adh}, $x \in \overline{A}$.

(⇐) Supposons $x \in \overline{A}$. Par l'absurde, supposons $\delta = d(x, A) > 0$. D'après le point 2 du {@fr:c1-carac-int-adh} (avec $r = \delta$), il existe $a \in A$ tel que $\norm{x - a} < \delta = \inf_{a' \in A} \norm{x - a'}$, ce qui est absurde. Donc $d(x, A) = 0$.
:::

::: def id=c1-def-relatif zh="相对开集与相对闭集" en="Relatively open and closed subsets" fr="Ouverts et fermés relatifs" ru="Открытые и замкнутые подмножества относительно A"
设 $A \subset E$，$V \subset A$。$V$ 称为 $A$ 的**相对开集**（ouvert relatif de $A$），如果存在 $E$ 的开集 $U$ 使 $V = U \cap A$；称为 $A$ 的**相对闭集**，如果存在 $E$ 的闭集 $F$ 使 $V = F \cap A$。
:::

::: fr
Soient $A \subset E$ et $V \subset A$. On dit que $V$ est un **ouvert relatif** de $A$ s'il existe un ouvert $U$ de $E$ tel que $V = U \cap A$ ; on dit que $V$ est un **fermé relatif** de $A$ s'il existe un fermé $F$ de $E$ tel que $V = F \cap A$.
:::

相对拓扑：若 $A \subset E$，$A$ 的开子集是指形如 $U \cap A$（$U$ 是 $E$ 的开集）的集合。下文讨论定义在 $A$ 上的函数时，「开集的原像」都是指相对开集。例：$A = [0, 1]$，$V = [0, \frac12[ \,= \,]-1, \frac12[ \,\cap A$ 是 $A$ 的相对开集，但不是 $\R$ 的开集。$A$ 本身既是 $A$ 的相对开集也是相对闭集（$A = E \cap A$）。

::: lem id=c1-relatif-carac zh="相对开集的刻画" en="Characterisation of relatively open sets" fr="Caractérisation des ouverts relatifs" ru="Описание относительно открытых множеств" lvl=1
设 $A \subset E$，$V \subset A$。

1. $V$ 是 $A$ 的相对开集 $\iff \forall a \in V,\ \exists r > 0,\ B(a, r) \cap A \subset V$；
2. $V$ 是 $A$ 的相对闭集 $\iff A \setminus V$ 是 $A$ 的相对开集。
:::

::: fr
Soient $A \subset E$ et $V \subset A$.

1. $V$ est un ouvert relatif de $A$ $\iff \forall a \in V,\ \exists r > 0,\ B(a, r) \cap A \subset V$ ;
2. $V$ est un fermé relatif de $A$ $\iff A \setminus V$ est un ouvert relatif de $A$.
:::

::: proof
**1**　(⇒) 设 $V = U \cap A$，$U$ 开，$a \in V$。则 $a \in U$，存在 $r > 0$ 使 $B(a, r) \subset U$，于是 $B(a, r) \cap A \subset U \cap A = V$。

(⇐) 对每个 $a \in V$ 取 $r_a > 0$ 使 $B(a, r_a) \cap A \subset V$。令 $U = \bigcup_{a \in V} B(a, r_a)$，它是开球的并，是开集（{@c1-ouverts-stab}）。一方面 $U \cap A = \bigcup_{a \in V} \big(B(a, r_a) \cap A\big) \subset V$；另一方面每个 $a \in V$ 属于 $B(a, r_a) \cap A \subset U \cap A$。所以 $V = U \cap A$。

**2**　(⇒) 设 $V = F \cap A$，$F$ 闭。则 $A \setminus V = A \cap (E \setminus F)$（$x \in A$ 不属于 $F \cap A$ 当且仅当 $x \notin F$），$E \setminus F$ 是开集，所以 $A \setminus V$ 是相对开集。(⇐) 设 $A \setminus V = U \cap A$，$U$ 开。则 $V = A \setminus (U \cap A) = A \cap (E \setminus U)$，$E \setminus U$ 是闭集，所以 $V$ 是相对闭集。
:::

::: fr
**1**　(⇒) Soient $V = U \cap A$ avec $U$ ouvert, et $a \in V$. Alors $a \in U$, donc il existe $r > 0$ tel que $B(a, r) \subset U$, d'où $B(a, r) \cap A \subset U \cap A = V$.

(⇐) Pour chaque $a \in V$, choisissons $r_a > 0$ tel que $B(a, r_a) \cap A \subset V$. Posons $U = \bigcup_{a \in V} B(a, r_a)$ ; c'est une réunion de boules ouvertes, donc un ouvert ({@fr:c1-ouverts-stab}). D'une part $U \cap A = \bigcup_{a \in V} \big(B(a, r_a) \cap A\big) \subset V$ ; d'autre part tout $a \in V$ appartient à $B(a, r_a) \cap A \subset U \cap A$. Donc $V = U \cap A$.

**2**　(⇒) Soit $V = F \cap A$ avec $F$ fermé. Alors $A \setminus V = A \cap (E \setminus F)$ (un $x \in A$ n'est pas dans $F \cap A$ si et seulement si $x \notin F$) et $E \setminus F$ est ouvert, donc $A \setminus V$ est un ouvert relatif. (⇐) Soit $A \setminus V = U \cap A$ avec $U$ ouvert. Alors $V = A \setminus (U \cap A) = A \cap (E \setminus U)$ et $E \setminus U$ est fermé, donc $V$ est un fermé relatif.
:::

::: q
设 $a \in E$，$r > 0$。证明 $\overline{B(a, r)} = \overline{B}(a, r)$，即开球的闭包是闭球。（在一般的度量空间中这可能不成立；赋范空间的线性结构在这里起作用。）
:::

::: ans
**$\subset$**：$\overline{B}(a, r)$ 是闭集（{@c1-ouverts-stab}）且包含 $B(a, r)$，而闭包是包含 $B(a, r)$ 的最小闭集。

**$\supset$**：设 $\norm{x - a} \le r$。若 $\norm{x - a} < r$，则 $x \in B(a, r) \subset \overline{B(a, r)}$。若 $\norm{x - a} = r$，令 $x_n = a + \big(1 - \frac{1}{n}\big)(x - a)$（$n \ge 1$）。则
$$\norm{x_n - a} = \Big(1 - \frac1n\Big) r < r, \qquad \norm{x_n - x} = \frac1n \norm{x - a} = \frac{r}{n} \to 0,$$
所以 $x_n \in B(a, r)$ 且 $x_n \to x$；由 {@carac-seq-adh}，$x \in \overline{B(a, r)}$。

关键是可以沿着「从 $a$ 到 $x$ 的线段」逼近，这用到了向量空间的结构。
:::

::: fr
**$\subset$** : $\overline{B}(a, r)$ est un fermé ({@fr:c1-ouverts-stab}) contenant $B(a, r)$, et l'adhérence est le plus petit fermé contenant $B(a, r)$.

**$\supset$** : soit $x$ tel que $\norm{x - a} \le r$. Si $\norm{x - a} < r$, alors $x \in B(a, r) \subset \overline{B(a, r)}$. Si $\norm{x - a} = r$, posons $x_n = a + \big(1 - \frac{1}{n}\big)(x - a)$ ($n \ge 1$). Alors
$$\norm{x_n - a} = \Big(1 - \frac1n\Big) r < r, \qquad \norm{x_n - x} = \frac1n \norm{x - a} = \frac{r}{n} \to 0,$$
donc $x_n \in B(a, r)$ et $x_n \to x$ ; d'après le {@fr:carac-seq-adh}, $x \in \overline{B(a, r)}$.

L'idée est d'approcher $x$ le long du segment de $a$ à $x$, ce qui utilise la structure d'espace vectoriel.
:::

::: q
证明 $\partial A = \overline{A} \cap \overline{E \setminus A}$，从而边界总是闭集。由此求 $\partial B(a, r)$（$r > 0$）。
:::

::: ans
对 $E \setminus A$ 用 {@c1-carac-int-adh} 第 3 条（$E \setminus (E \setminus A) = A$）：$E \setminus \overline{E \setminus A} = \operatorname{int} A = \mathring{A}$。所以
$$\partial A = \overline{A} \setminus \mathring{A} = \overline{A} \cap \big(E \setminus \mathring{A}\big) = \overline{A} \cap \overline{E \setminus A},$$
是两个闭集的交，是闭集（{@c1-ouverts-stab}）。

对 $A = B(a, r)$：它是开集，$\mathring{A} = A$（{@c1-carac-int-adh} 第 3 条）；由上一题 $\overline{A} = \overline{B}(a, r)$。所以 $\partial B(a, r) = \overline{B}(a, r) \setminus B(a, r) = S(a, r)$。
:::

## 极限、连续与连续线性映射

本节把 L1 的 $\eps$-$\delta$ 连续性搬到赋范空间之间的映射上，给出三种等价的刻画（$\eps$-$\delta$、序列、开集的原像），再专门研究**线性**映射：在有限维空间里线性映射总是连续的，在无穷维空间里却未必——判别准则是一个不等式 $\norm{u(x)} \le C\norm{x}$，最小的常数 $C$ 就是算子范数。

::: def id=c1-def-limite zh="函数的极限与连续" en="Limit and continuity" fr="Limite et continuité" ru="Предел и непрерывность"
设 $f : A \subset E \to F$，$a \in \overline{A}$，$\ell \in F$。$f(x) \to \ell$（$x \to a$）指：对一切 $\eps > 0$，存在 $\delta > 0$，使得 $x \in A$、$\norm{x - a} < \delta$ 时 $\norm{f(x) - \ell} < \eps$：
$$\forall \eps > 0,\ \exists \delta > 0,\ \forall x \in A,\quad \norm{x - a} < \delta \implies \norm{f(x) - \ell} < \eps.$$
$f$ 在 $a \in A$ **连续**，如果 $f(x) \to f(a)$（$x \to a$）；$f$ 在 $A$ 上**连续**，如果它在 $A$ 的每一点连续。
:::

::: fr
Soient $f : A \subset E \to F$, $a \in \overline{A}$ et $\ell \in F$. On dit que $f(x) \to \ell$ quand $x \to a$ si pour tout $\eps > 0$, il existe $\delta > 0$ tel que pour $x \in A$ vérifiant $\norm{x - a} < \delta$, on a $\norm{f(x) - \ell} < \eps$ :
$$\forall \eps > 0,\ \exists \delta > 0,\ \forall x \in A,\quad \norm{x - a} < \delta \implies \norm{f(x) - \ell} < \eps.$$
On dit que $f$ est **continue** en $a \in A$ si $f(x) \to f(a)$ quand $x \to a$, et que $f$ est **continue** sur $A$ si elle est continue en tout point de $A$.
:::

白话：只要 $x$ 足够靠近 $a$，$f(x)$ 就任意靠近 $\ell$。条件 $a \in \overline{A}$ 保证每个 $B(a, \delta) \cap A$ 非空（{@c1-carac-int-adh}），从而极限唯一——证明与 {@c1-suites-prop} 第 1 条相同，只要把「取 $n = \max(N_1, N_2)$」换成「取 $x \in B(a, \min(\delta_1, \delta_2)) \cap A$」。

::: ex zh="连续与不连续"
1. 范数 $\norm{\cdot} : E \to \R$ 在每一点连续：由 {@c1-ineg-tri-inverse}，$\big|\norm{x} - \norm{a}\big| \le \norm{x - a}$，取 $\delta = \eps$ 即可。
2. 在 $(\R^2, \norm{\cdot}_2)$ 上，令 $f(x, y) = \frac{xy}{x^2 + y^2}$（$(x,y) \ne 0$），$f(0, 0) = 0$。对每个固定的 $y$，$x \mapsto f(x, y)$ 都连续，但 $f$ 在 $0$ 不连续：$u_n = \big(\frac1n, \frac1n\big) \to 0$，而 $f(u_n) = \frac{1/n^2}{2/n^2} = \frac12 \not\to 0 = f(0)$（由下面的 {@carac-seq-cont}）。「对每个变量分别连续」不等于「连续」。
:::

::: prop id=carac-seq-cont lvl=1
$f$ 在 $a$ 连续，当且仅当对 $A$ 中任何收敛到 $a$ 的数列 $(x_n)$，都有 $f(x_n) \to f(a)$。
:::

::: fr
L'application $f$ est continue en $a$ si et seulement si pour toute suite $(x_n)$ d'éléments de $A$ convergeant vers $a$, on a $f(x_n) \to f(a)$.
:::

::: proof
▷ 思路：(⇒) 把连续性给出的 $\delta$ 当作数列收敛定义中的「$\eps$」。(⇐) 证逆否命题：写出「不连续」的量词否定，取 $\delta = \frac{1}{n+1}$ 构造一个坏数列。

**(⇒)**　设 $f$ 在 $a$ 连续，$(x_n)$ 是 $A$ 中的数列，$x_n \to a$。设 $\eps > 0$。

1. 由连续性，存在 $\delta > 0$，使对 $x \in A$，$\norm{x - a} < \delta \Rightarrow \norm{f(x) - f(a)} < \eps$。
2. 由 $x_n \to a$（对正数 $\delta$ 用收敛的定义），存在 $N$，使 $n \ge N$ 时 $\norm{x_n - a} < \delta$。
3. 对 $n \ge N$，$x_n \in A$ 且 $\norm{x_n - a} < \delta$，由第 1 步，$\norm{f(x_n) - f(a)} < \eps$。

所以 $f(x_n) \to f(a)$。

**(⇐)**　证逆否命题：设 $f$ 在 $a$ 不连续，要构造 $A$ 中的数列 $x_n \to a$ 使 $f(x_n) \not\to f(a)$。

1. 「不连续」的量词否定：存在 $\eps > 0$，对一切 $\delta > 0$，存在 $x \in A$ 使 $\norm{x - a} < \delta$ 且 $\norm{f(x) - f(a)} \ge \eps$。
2. 对每个 $n \in \N$，取 $\delta = \frac{1}{n+1}$，得到 $x_n \in A$，$\norm{x_n - a} < \frac{1}{n+1}$，$\norm{f(x_n) - f(a)} \ge \eps$。
3. 由 $\norm{x_n - a} < \frac{1}{n+1}$，$x_n \to a$（同 {@carac-seq-adh} 的证明，取 $N = \lfloor 1/\eps' \rfloor$）。
4. 但对一切 $n$，$\norm{f(x_n) - f(a)} \ge \eps$，所以 $f(x_n) \not\to f(a)$（否则从某项起 $\norm{f(x_n) - f(a)} < \eps$）。

这就证明了等价性。
:::

::: fr
▷ Méthode : (⇒) le $\delta$ fourni par la continuité joue le rôle du « $\eps$ » dans la définition de la convergence de la suite. (⇐) On montre la contraposée : on écrit la négation de la continuité avec les quantificateurs, puis on construit une « mauvaise » suite en prenant $\delta = \frac{1}{n+1}$.

**(⇒)**　Supposons $f$ continue en $a$, et soit $(x_n)$ une suite de $A$ telle que $x_n \to a$. Soit $\eps > 0$.

1. Par continuité, il existe $\delta > 0$ tel que pour $x \in A$, $\norm{x - a} < \delta \Rightarrow \norm{f(x) - f(a)} < \eps$.
2. Comme $x_n \to a$ (définition de la convergence appliquée au réel $\delta > 0$), il existe $N$ tel que pour $n \ge N$, $\norm{x_n - a} < \delta$.
3. Pour $n \ge N$, $x_n \in A$ et $\norm{x_n - a} < \delta$, donc d'après l'étape 1, $\norm{f(x_n) - f(a)} < \eps$.

Ainsi $f(x_n) \to f(a)$.

**(⇐)**　Montrons la contraposée : supposons $f$ non continue en $a$ ; construisons une suite $(x_n)$ de $A$ telle que $x_n \to a$ mais $f(x_n) \not\to f(a)$.

1. Négation de la continuité : il existe $\eps > 0$ tel que pour tout $\delta > 0$, il existe $x \in A$ avec $\norm{x - a} < \delta$ et $\norm{f(x) - f(a)} \ge \eps$.
2. Pour chaque $n \in \N$, avec $\delta = \frac{1}{n+1}$, on obtient $x_n \in A$ tel que $\norm{x_n - a} < \frac{1}{n+1}$ et $\norm{f(x_n) - f(a)} \ge \eps$.
3. Comme $\norm{x_n - a} < \frac{1}{n+1}$, on a $x_n \to a$ (comme dans la preuve du {@fr:carac-seq-adh}, avec $N = \lfloor 1/\eps' \rfloor$).
4. Mais pour tout $n$, $\norm{f(x_n) - f(a)} \ge \eps$, donc $f(x_n) \not\to f(a)$ (sinon on aurait $\norm{f(x_n) - f(a)} < \eps$ à partir d'un certain rang).

L'équivalence est démontrée.
:::

::: prop id=c1-cont-operations zh="连续函数的运算" en="Operations on continuous maps" fr="Opérations sur les applications continues" ru="Действия над непрерывными отображениями" lvl=1
设 $A \subset E$，$a \in A$，$f, g : A \to F$ 与 $\lambda : A \to \K$ 都在 $a$ 连续。

1. $f + g$ 与 $\lambda f$ 在 $a$ 连续；
2. 设 $B \subset F$，$f(A) \subset B$，$h : B \to G$（$G$ 是赋范空间）在 $f(a)$ 连续，则 $h \circ f$ 在 $a$ 连续；
3. 若 $\mu : A \to \K$ 在 $a$ 连续且在 $A$ 上不取零值，则 $1/\mu$ 在 $a$ 连续。

特别地，连续映射的和、数乘、复合，以及（取 $F = \K$ 时）连续函数的乘积与商，都是连续的。
:::

::: fr
Soient $A \subset E$, $a \in A$, et $f, g : A \to F$, $\lambda : A \to \K$ continues en $a$.

1. $f + g$ et $\lambda f$ sont continues en $a$ ;
2. soient $B \subset F$ avec $f(A) \subset B$, et $h : B \to G$ ($G$ evn) continue en $f(a)$ ; alors $h \circ f$ est continue en $a$ ;
3. si $\mu : A \to \K$ est continue en $a$ et ne s'annule pas sur $A$, alors $1/\mu$ est continue en $a$.

En particulier, les sommes, produits par un scalaire et composées d'applications continues, ainsi que (pour $F = \K$) les produits et quotients de fonctions continues, sont continus.
:::

::: proof
▷ 思路：用序列刻画（{@carac-seq-cont}）把问题化为数列极限的运算（{@c1-suites-prop}）。

**1**　设 $(x_n)$ 是 $A$ 中的数列，$x_n \to a$。由 {@carac-seq-cont}（⇒），$f(x_n) \to f(a)$，$g(x_n) \to g(a)$，$\lambda(x_n) \to \lambda(a)$。由 {@c1-suites-prop} 第 4 条，
$$f(x_n) + g(x_n) \to f(a) + g(a), \qquad \lambda(x_n) f(x_n) \to \lambda(a) f(a).$$
这对 $A$ 中每个收敛到 $a$ 的数列成立，由 {@carac-seq-cont}（⇐），$f + g$ 与 $\lambda f$ 在 $a$ 连续。

**2**　设 $A \ni x_n \to a$。由 $f$ 在 $a$ 连续，$f(x_n) \to f(a)$；$(f(x_n))$ 是 $B$ 中收敛到 $f(a)$ 的数列，由 $h$ 在 $f(a)$ 连续（{@carac-seq-cont} 用于 $h$），$h(f(x_n)) \to h(f(a))$。再由 {@carac-seq-cont}（⇐），$h \circ f$ 在 $a$ 连续。

**3**　先证 $\iota : \K \setminus \{0\} \to \K$，$t \mapsto 1/t$ 在每个 $t_0 \ne 0$ 连续。设 $\eps > 0$，令 $\delta = \min\big(\frac{\abs{t_0}}{2}, \frac{\eps \abs{t_0}^2}{2}\big) > 0$。若 $\abs{t - t_0} < \delta$，则 $\abs{t} \ge \abs{t_0} - \abs{t - t_0} > \frac{\abs{t_0}}{2}$，于是
$$\Big|\frac1t - \frac1{t_0}\Big| = \frac{\abs{t - t_0}}{\abs{t}\,\abs{t_0}} < \frac{2\abs{t - t_0}}{\abs{t_0}^2} < \frac{2\delta}{\abs{t_0}^2} \le \eps.$$
然后 $1/\mu = \iota \circ \mu$，由第 2 条（取 $B = \K \setminus \{0\}$）在 $a$ 连续。

最后一句：乘积 $fg$ 是第 1 条中取 $\lambda = f$ 的情形；商 $f/\mu = f \cdot (1/\mu)$。
:::

::: fr
▷ Méthode : par la caractérisation séquentielle ({@fr:carac-seq-cont}), on se ramène aux opérations sur les limites de suites ({@fr:c1-suites-prop}).

**1**　Soit $(x_n)$ une suite de $A$ telle que $x_n \to a$. D'après la {@fr:carac-seq-cont} (⇒), $f(x_n) \to f(a)$, $g(x_n) \to g(a)$ et $\lambda(x_n) \to \lambda(a)$. D'après le point 4 de la {@fr:c1-suites-prop},
$$f(x_n) + g(x_n) \to f(a) + g(a), \qquad \lambda(x_n) f(x_n) \to \lambda(a) f(a).$$
Ceci vaut pour toute suite de $A$ convergeant vers $a$ ; d'après la {@fr:carac-seq-cont} (⇐), $f + g$ et $\lambda f$ sont continues en $a$.

**2**　Soit $A \ni x_n \to a$. Comme $f$ est continue en $a$, $f(x_n) \to f(a)$ ; $(f(x_n))$ est une suite de $B$ qui converge vers $f(a)$, et comme $h$ est continue en $f(a)$ ({@fr:carac-seq-cont} appliquée à $h$), $h(f(x_n)) \to h(f(a))$. D'après la {@fr:carac-seq-cont} (⇐), $h \circ f$ est continue en $a$.

**3**　Montrons d'abord que $\iota : \K \setminus \{0\} \to \K$, $t \mapsto 1/t$, est continue en tout $t_0 \ne 0$. Soit $\eps > 0$ ; posons $\delta = \min\big(\frac{\abs{t_0}}{2}, \frac{\eps \abs{t_0}^2}{2}\big) > 0$. Si $\abs{t - t_0} < \delta$, alors $\abs{t} \ge \abs{t_0} - \abs{t - t_0} > \frac{\abs{t_0}}{2}$, d'où
$$\Big|\frac1t - \frac1{t_0}\Big| = \frac{\abs{t - t_0}}{\abs{t}\,\abs{t_0}} < \frac{2\abs{t - t_0}}{\abs{t_0}^2} < \frac{2\delta}{\abs{t_0}^2} \le \eps.$$
Ensuite $1/\mu = \iota \circ \mu$ est continue en $a$ d'après le point 2 (avec $B = \K \setminus \{0\}$).

Dernière phrase : le produit $fg$ est le cas $\lambda = f$ du point 1 ; le quotient s'écrit $f/\mu = f \cdot (1/\mu)$.
:::

::: ex zh="多项式函数与行列式的连续性"
在 $(\K^n, \norm{\cdot}_\infty)$ 上，坐标函数 $\pi_i(x) = x_i$ 满足 $\abs{\pi_i(x) - \pi_i(y)} = \abs{x_i - y_i} \le \norm{x - y}_\infty$，所以连续（取 $\delta = \eps$）。由 {@c1-cont-operations}，单项式 $x \mapsto x_1^{k_1} \cdots x_n^{k_n}$（坐标函数的乘积）连续，多项式函数（单项式的线性组合）连续。

特别地，把 $\M_n(\K)$ 看成 $\K^{n^2}$（范数 $\max_{i,j} \abs{a_{ij}}$），$\det$ 是 $n^2$ 个系数的多项式，所以 $\det : \M_n(\K) \to \K$ 连续。由 {@equiv-dimfinie}，换成 $\M_n(\K)$ 上任何其他范数，这个结论不变。
:::

::: thm id=cont-ouverts zh="连续性的拓扑刻画" en="Topological characterisation of continuity" fr="Caractérisation topologique de la continuité" ru="Топологическое определение непрерывности" lvl=1
$f : A \to F$ 连续，当且仅当 $F$ 的任何开集的原像是 $A$ 的（相对）开集；当且仅当任何闭集的原像是相对闭集。
:::

::: fr
L'application $f : A \to F$ est continue si et seulement si l'image réciproque de tout ouvert de $F$ est un ouvert (relatif) de $A$, si et seulement si l'image réciproque de tout fermé de $F$ est un fermé relatif de $A$.
:::

::: proof
▷ 思路：用 {@c1-relatif-carac} 把「相对开集」翻译成球的语言，它和 $\eps$-$\delta$ 定义几乎逐字对应：$V \supset B(f(a), \eps)$ 对应 $\eps$，$B(a, \delta) \cap A \subset f^{-1}(V)$ 对应 $\delta$。记三个条件为 (C)「$f$ 连续」，(O)「开集的原像是相对开集」，(F)「闭集的原像是相对闭集」。

**(C) ⇒ (O)**　设 $V$ 是 $F$ 的开集，$a \in f^{-1}(V)$，即 $a \in A$，$f(a) \in V$。

1. $V$ 开：存在 $\eps > 0$ 使 $B(f(a), \eps) \subset V$。
2. $f$ 在 $a$ 连续：存在 $\delta > 0$，使对 $x \in A$，$\norm{x - a} < \delta \Rightarrow f(x) \in B(f(a), \eps) \subset V$。
3. 即 $B(a, \delta) \cap A \subset f^{-1}(V)$。

$a$ 是 $f^{-1}(V)$ 中任意一点，由 {@c1-relatif-carac} 第 1 条，$f^{-1}(V)$ 是 $A$ 的相对开集。

**(O) ⇒ (C)**　设 $a \in A$，$\eps > 0$。

1. $V = B(f(a), \eps)$ 是开集（{@c1-ouverts-stab}），由 (O)，$f^{-1}(V)$ 是 $A$ 的相对开集，且含 $a$。
2. 由 {@c1-relatif-carac} 第 1 条，存在 $\delta > 0$ 使 $B(a, \delta) \cap A \subset f^{-1}(V)$。
3. 即：$x \in A$、$\norm{x - a} < \delta$ 时 $\norm{f(x) - f(a)} < \eps$。这正是 $f$ 在 $a$ 连续。

**(O) ⇔ (F)**　对任何 $G \subset F$，$f^{-1}(F \setminus G) = A \setminus f^{-1}(G)$（$x \in A$ 满足 $f(x) \notin G$ 当且仅当 $x \notin f^{-1}(G)$）。

- (O) ⇒ (F)：设 $G$ 闭。则 $F \setminus G$ 开，由 (O)，$A \setminus f^{-1}(G) = f^{-1}(F \setminus G)$ 是相对开集；由 {@c1-relatif-carac} 第 2 条，$f^{-1}(G)$ 是相对闭集。
- (F) ⇒ (O)：设 $V$ 开。则 $F \setminus V$ 闭，由 (F)，$f^{-1}(F \setminus V) = A \setminus f^{-1}(V)$ 是相对闭集；由 {@c1-relatif-carac} 第 2 条（用于 $A \setminus f^{-1}(V)$，其在 $A$ 中的补集是 $f^{-1}(V)$），$f^{-1}(V)$ 是相对开集。

三个条件两两等价。
:::

::: fr
▷ Méthode : grâce au {@fr:c1-relatif-carac}, la notion d'ouvert relatif se traduit en termes de boules, et correspond presque mot pour mot à la définition $\eps$-$\delta$ : $V \supset B(f(a), \eps)$ correspond à $\eps$, $B(a, \delta) \cap A \subset f^{-1}(V)$ correspond à $\delta$. Notons (C) « $f$ est continue », (O) « l'image réciproque de tout ouvert est un ouvert relatif », (F) « l'image réciproque de tout fermé est un fermé relatif ».

**(C) ⇒ (O)**　Soient $V$ un ouvert de $F$ et $a \in f^{-1}(V)$, c'est-à-dire $a \in A$ et $f(a) \in V$.

1. $V$ est ouvert : il existe $\eps > 0$ tel que $B(f(a), \eps) \subset V$.
2. $f$ est continue en $a$ : il existe $\delta > 0$ tel que pour $x \in A$, $\norm{x - a} < \delta \Rightarrow f(x) \in B(f(a), \eps) \subset V$.
3. Autrement dit, $B(a, \delta) \cap A \subset f^{-1}(V)$.

Le point $a$ de $f^{-1}(V)$ étant quelconque, $f^{-1}(V)$ est un ouvert relatif de $A$ d'après le point 1 du {@fr:c1-relatif-carac}.

**(O) ⇒ (C)**　Soient $a \in A$ et $\eps > 0$.

1. $V = B(f(a), \eps)$ est un ouvert ({@fr:c1-ouverts-stab}) ; d'après (O), $f^{-1}(V)$ est un ouvert relatif de $A$, qui contient $a$.
2. D'après le point 1 du {@fr:c1-relatif-carac}, il existe $\delta > 0$ tel que $B(a, \delta) \cap A \subset f^{-1}(V)$.
3. Autrement dit : pour $x \in A$ avec $\norm{x - a} < \delta$, on a $\norm{f(x) - f(a)} < \eps$. C'est exactement la continuité de $f$ en $a$.

**(O) ⇔ (F)**　Pour toute partie $G \subset F$, $f^{-1}(F \setminus G) = A \setminus f^{-1}(G)$ (un $x \in A$ vérifie $f(x) \notin G$ si et seulement si $x \notin f^{-1}(G)$).

- (O) ⇒ (F) : soit $G$ fermé. Alors $F \setminus G$ est ouvert, et d'après (O), $A \setminus f^{-1}(G) = f^{-1}(F \setminus G)$ est un ouvert relatif ; d'après le point 2 du {@fr:c1-relatif-carac}, $f^{-1}(G)$ est un fermé relatif.
- (F) ⇒ (O) : soit $V$ ouvert. Alors $F \setminus V$ est fermé, et d'après (F), $f^{-1}(F \setminus V) = A \setminus f^{-1}(V)$ est un fermé relatif ; d'après le point 2 du {@fr:c1-relatif-carac} (appliqué à $A \setminus f^{-1}(V)$, dont le complémentaire dans $A$ est $f^{-1}(V)$), $f^{-1}(V)$ est un ouvert relatif.

Les trois conditions sont équivalentes.
:::

::: rem
1. **最常用的情形 $A = E$**：此时相对开（闭）集就是开（闭）集。若 $\varphi : E \to \R$ 连续，则 $\{\varphi < c\}$、$\{\varphi > c\}$ 是开集（$]-\infty, c[$、$]c, +\infty[$ 的原像），$\{\varphi \le c\}$、$\{\varphi = c\}$ 是闭集。例：$\GL_n(\K) = \det^{-1}(\K \setminus \{0\})$ 是 $\M_n(\K)$ 的开集；$\{(x, y) \in \R^2 : xy = 1\}$ 是 $\R^2$ 的闭集。
2. **方向不能反**：连续映射把开集的**原像**变成开集，但**像**未必是开集，闭集的像也未必是闭集。$f(x) = x^2$ 连续，$f(\,]-1, 1[\,) = [0, 1[$ 不是开集；$\Arctan$ 连续，$\Arctan(\R) = \,]-\frac\pi2, \frac\pi2[$，$\R$ 是闭集而像不是。
:::

::: def id=c1-def-lip zh="Lipschitz 映射" en="Lipschitz map" fr="Application lipschitzienne" ru="Липшицево отображение"
设 $k \ge 0$。$f : A \to F$ 是 **$k$-Lipschitz** 的，如果
$$\forall x, y \in A,\quad \norm{f(x) - f(y)} \le k \norm{x - y}.$$
Lipschitz 映射一致连续，从而连续。范数本身是 1-Lipschitz 的（{@c1-lip-uc}）。
:::

::: fr
Soit $k \ge 0$. Une application $f : A \to F$ est dite **$k$-lipschitzienne** si
$$\forall x, y \in A,\quad \norm{f(x) - f(y)} \le k \norm{x - y}.$$
Une application lipschitzienne est uniformément continue, donc continue. La norme est elle-même 1-lipschitzienne ({@fr:c1-lip-uc}).
:::

::: def id=c1-def-unif-cont zh="一致连续" en="Uniform continuity" fr="Continuité uniforme" ru="Равномерная непрерывность"
$f : A \to F$ **一致连续**，如果
$$\forall \eps > 0,\ \exists \delta > 0,\ \forall x, y \in A,\quad \norm{x - y} < \delta \implies \norm{f(x) - f(y)} < \eps.$$
:::

::: fr
Une application $f : A \to F$ est **uniformément continue** si
$$\forall \eps > 0,\ \exists \delta > 0,\ \forall x, y \in A,\quad \norm{x - y} < \delta \implies \norm{f(x) - f(y)} < \eps.$$
:::

白话：与「在每一点连续」（$\forall a\ \forall \eps\ \exists \delta$，$\delta$ 可以依赖于 $a$）相比，一致连续要求同一个 $\delta$ 对所有点都管用（$\forall \eps\ \exists \delta\ \forall x, y$）。量词顺序的这一点差别，就是两个概念的全部差别。

::: prop id=c1-lip-uc zh="Lipschitz ⇒ 一致连续 ⇒ 连续" en="Lipschitz implies uniformly continuous implies continuous" fr="Lipschitzienne ⇒ uniformément continue ⇒ continue" ru="Липшицево ⇒ равномерно непрерывно ⇒ непрерывно" lvl=1
1. $k$-Lipschitz 映射一致连续；一致连续映射连续。
2. 范数 $\norm{\cdot} : E \to \R$ 是 1-Lipschitz 的；对非空的 $A \subset E$，$x \mapsto d(x, A)$ 是 1-Lipschitz 的。
:::

::: fr
1. Une application $k$-lipschitzienne est uniformément continue ; une application uniformément continue est continue.
2. La norme $\norm{\cdot} : E \to \R$ est 1-lipschitzienne ; pour $A \subset E$ non vide, $x \mapsto d(x, A)$ est 1-lipschitzienne.
:::

::: proof
**1**　设 $f$ 是 $k$-Lipschitz 的，$\eps > 0$。令 $\delta = \frac{\eps}{k + 1} > 0$（分母用 $k + 1$ 是为了包括 $k = 0$ 的情形）。若 $\norm{x - y} < \delta$，则
$$\norm{f(x) - f(y)} \le k\norm{x - y} \le k\delta = \frac{k}{k+1}\eps < \eps.$$
所以 $f$ 一致连续。设 $f$ 一致连续，$a \in A$，$\eps > 0$。取一致连续定义中的 $\delta$，并令 $y = a$：对 $x \in A$，$\norm{x - a} < \delta \Rightarrow \norm{f(x) - f(a)} < \eps$。这就是 $f$ 在 $a$ 连续。

**2**　范数：{@c1-ineg-tri-inverse}。$d(\cdot, A)$：{@c1-dist} 第 1 条。
:::

::: fr
**1**　Soient $f$ $k$-lipschitzienne et $\eps > 0$. Posons $\delta = \frac{\eps}{k + 1} > 0$ (le dénominateur $k + 1$ permet d'inclure le cas $k = 0$). Si $\norm{x - y} < \delta$, alors
$$\norm{f(x) - f(y)} \le k\norm{x - y} \le k\delta = \frac{k}{k+1}\eps < \eps.$$
Donc $f$ est uniformément continue. Soient maintenant $f$ uniformément continue, $a \in A$ et $\eps > 0$. On prend le $\delta$ de la définition de la continuité uniforme, avec $y = a$ : pour $x \in A$, $\norm{x - a} < \delta \Rightarrow \norm{f(x) - f(a)} < \eps$. C'est la continuité de $f$ en $a$.

**2**　La norme : {@fr:c1-ineg-tri-inverse}. La fonction $d(\cdot, A)$ : point 1 du {@fr:c1-dist}.
:::

::: cex id=c1-cex-uc zh="两个逆命题都不成立"
1. **一致连续但不 Lipschitz**：$f(x) = \sqrt{x}$ 在 $[0, 1]$ 上。
   - 一致连续：对 $0 \le y \le x$，$(\sqrt x - \sqrt y)^2 \le (\sqrt x - \sqrt y)(\sqrt x + \sqrt y) = x - y$，所以 $\abs{\sqrt x - \sqrt y} \le \sqrt{\abs{x - y}}$；给定 $\eps$，取 $\delta = \eps^2$。
   - 不 Lipschitz：反设 $\abs{\sqrt x - \sqrt 0} \le k\abs{x - 0}$ 对一切 $x \in [0, 1]$ 成立。取 $x = \frac{1}{(k+1)^2} \in \,]0, 1]$，则 $\sqrt{x} = \frac{1}{k+1}$，而 $kx = \frac{k}{(k+1)^2} < \frac{1}{k+1}$，矛盾。
2. **连续但不一致连续**：$f(x) = x^2$ 在 $\R$ 上。取 $x_n = n + \frac1n$，$y_n = n$：$\abs{x_n - y_n} = \frac1n \to 0$，而 $\abs{x_n^2 - y_n^2} = 2 + \frac{1}{n^2} \ge 2$。若 $f$ 一致连续，对 $\eps = 2$ 有 $\delta$；取 $n > \frac1\delta$，则 $\abs{x_n - y_n} < \delta$ 而 $\abs{f(x_n) - f(y_n)} \ge 2$，矛盾。
:::

::: thm id=lin-continue zh="连续线性映射的刻画" en="Bounded linear maps" fr="Caractérisation des applications linéaires continues" ru="Критерий непрерывности линейного оператора" lvl=1
设 $u : E \to F$ 线性。以下条件等价：

1. $u$ 连续；
2. $u$ 在 $0$ 连续；
3. 存在 $C \ge 0$，使 $\norm{u(x)} \le C \norm{x}$ 对一切 $x$ 成立；
4. $u$ 是 Lipschitz 的。
:::

::: fr
Soit $u : E \to F$ linéaire. Les assertions suivantes sont équivalentes :

1. $u$ est continue ;
2. $u$ est continue en $0$ ;
3. il existe $C \ge 0$ tel que $\norm{u(x)} \le C \norm{x}$ pour tout $x$ ;
4. $u$ est lipschitzienne.
:::

::: proof
▷ 思路：按 $1 \Rightarrow 2 \Rightarrow 3 \Rightarrow 4 \Rightarrow 1$ 循环证明。关键是 $2 \Rightarrow 3$：在 $0$ 连续给出一个小球，它被 $u$ 映到单位球里；再用齐次性把任意 $x$ 缩放到这个小球里。

**$1 \Rightarrow 2$**　$u$ 在 $E$ 的每一点连续，特别在 $0$ 连续。

**$2 \Rightarrow 3$**

1. 由线性，$u(0) = 0$。由 $u$ 在 $0$ 连续，对 $\eps = 1$，存在 $\delta > 0$，使 $\norm{x} < \delta \Rightarrow \norm{u(x)} < 1$。
2. 设 $x \ne 0$。令 $y = \frac{\delta}{2\norm{x}}\, x$，则 $\norm{y} = \frac{\delta}{2} < \delta$，所以 $\norm{u(y)} < 1$。
3. 由线性，$u(y) = \frac{\delta}{2\norm{x}}\, u(x)$，于是 $\frac{\delta}{2\norm{x}}\,\norm{u(x)} < 1$，即 $\norm{u(x)} < \frac{2}{\delta}\norm{x}$。
4. 对 $x = 0$，$\norm{u(0)} = 0 = \frac2\delta \norm{0}$。

所以 $C = \frac{2}{\delta}$ 满足条件 3。（取 $y = \frac{\delta}{2\norm{x}}x$ 而不是 $\frac{\delta}{\norm{x}}x$，是因为后者范数恰为 $\delta$，不满足严格不等式 $\norm{y} < \delta$。）

**$3 \Rightarrow 4$**　对 $x, y \in E$，由线性与条件 3，$\norm{u(x) - u(y)} = \norm{u(x - y)} \le C\norm{x - y}$。所以 $u$ 是 $C$-Lipschitz 的。

**$4 \Rightarrow 1$**　{@c1-lip-uc}。

四个条件等价。
:::

::: fr
▷ Méthode : on montre $1 \Rightarrow 2 \Rightarrow 3 \Rightarrow 4 \Rightarrow 1$. Le point clé est $2 \Rightarrow 3$ : la continuité en $0$ fournit une petite boule envoyée par $u$ dans la boule unité ; par homogénéité, on ramène tout $x$ dans cette petite boule.

**$1 \Rightarrow 2$**　$u$ est continue en tout point de $E$, en particulier en $0$.

**$2 \Rightarrow 3$**

1. Par linéarité, $u(0) = 0$. Comme $u$ est continue en $0$, pour $\eps = 1$, il existe $\delta > 0$ tel que $\norm{x} < \delta \Rightarrow \norm{u(x)} < 1$.
2. Soit $x \ne 0$. Posons $y = \frac{\delta}{2\norm{x}}\, x$ ; alors $\norm{y} = \frac{\delta}{2} < \delta$, donc $\norm{u(y)} < 1$.
3. Par linéarité, $u(y) = \frac{\delta}{2\norm{x}}\, u(x)$, d'où $\frac{\delta}{2\norm{x}}\,\norm{u(x)} < 1$, c'est-à-dire $\norm{u(x)} < \frac{2}{\delta}\norm{x}$.
4. Pour $x = 0$, $\norm{u(0)} = 0 = \frac2\delta \norm{0}$.

Ainsi $C = \frac{2}{\delta}$ convient. (On prend $y = \frac{\delta}{2\norm{x}}x$ et non $\frac{\delta}{\norm{x}}x$ : ce dernier est de norme exactement $\delta$ et ne vérifie pas l'inégalité stricte $\norm{y} < \delta$.)

**$3 \Rightarrow 4$**　Pour $x, y \in E$, par linéarité et d'après 3, $\norm{u(x) - u(y)} = \norm{u(x - y)} \le C\norm{x - y}$. Donc $u$ est $C$-lipschitzienne.

**$4 \Rightarrow 1$**　{@fr:c1-lip-uc}.

Les quatre assertions sont équivalentes.
:::

::: rem
1. 实践中，证明线性映射连续几乎总是证明条件 3：写出 $\norm{u(x)}$，用三角不等式把它放大成 $C\norm{x}$。
2. 条件 3 等价于「$u$ 在单位球 $\overline{B}(0, 1)$ 上有界」，也等价于「$u$ 把有界集映成有界集」。所以英文文献把连续线性映射叫做 bounded linear map。
3. 从有限维空间出发的线性映射总是连续的（{@cor-dimfinie}）；无穷维时不然（{@c1-cex-derivation}）。
:::

::: def id=norme-subordonnee zh="算子范数" en="Operator norm" fr="Norme subordonnée (norme d'opérateur)" ru="Норма оператора"
在连续线性映射空间 $\Lin_c(E, F)$ 上定义（设 $E \ne \{0\}$）
$$\norm{u} = \sup_{x \ne 0} \frac{\norm{u(x)}}{\norm{x}} = \sup_{\norm{x} = 1} \norm{u(x)}.$$
这是一个范数，并且满足 $\norm{v \circ u} \le \norm{v}\,\norm{u}$（次乘性）（{@c1-norme-sub-prop}）。
:::

::: fr
Sur l'espace $\Lin_c(E, F)$ des applications linéaires continues, on définit (pour $E \ne \{0\}$)
$$\norm{u} = \sup_{x \ne 0} \frac{\norm{u(x)}}{\norm{x}} = \sup_{\norm{x} = 1} \norm{u(x)}.$$
C'est une norme, et elle vérifie $\norm{v \circ u} \le \norm{v}\,\norm{u}$ (sous-multiplicativité) ({@fr:c1-norme-sub-prop}).
:::

两个上确界相等：两个集合 $\big\{\frac{\norm{u(x)}}{\norm{x}} : x \ne 0\big\}$ 与 $\{\norm{u(y)} : \norm{y} = 1\}$ 相同——由线性，$\frac{\norm{u(x)}}{\norm{x}} = \norm{u\big(\frac{x}{\norm{x}}\big)}$，而 $x \mapsto \frac{x}{\norm{x}}$ 把 $E \setminus \{0\}$ 映满单位球面。上确界有限，因为由 {@lin-continue} 条件 3，集合以 $C$ 为上界。约定：$E = \{0\}$ 时 $\Lin_c(E, F) = \{0\}$，令 $\norm{0} = 0$。白话：$\norm{u}$ 是 $u$ 能把向量「拉长」的最大倍数。

::: prop id=c1-norme-sub-prop zh="算子范数的性质" en="Properties of the operator norm" fr="Propriétés de la norme subordonnée" ru="Свойства нормы оператора" lvl=1
设 $E \ne \{0\}$，$u \in \Lin_c(E, F)$。

1. 对一切 $x \in E$，$\norm{u(x)} \le \norm{u}\,\norm{x}$；并且 $\norm{u}$ 是满足「$\forall x,\ \norm{u(x)} \le C\norm{x}$」的最小常数 $C \ge 0$。
2. $u \mapsto \norm{u}$ 是 $\Lin_c(E, F)$ 上的范数。
3. 若 $G$ 是赋范空间，$v \in \Lin_c(F, G)$，则 $v \circ u \in \Lin_c(E, G)$，且 $\norm{v \circ u} \le \norm{v}\,\norm{u}$。
:::

::: fr
Soient $E \ne \{0\}$ et $u \in \Lin_c(E, F)$.

1. Pour tout $x \in E$, $\norm{u(x)} \le \norm{u}\,\norm{x}$ ; de plus $\norm{u}$ est la plus petite constante $C \ge 0$ telle que « $\forall x,\ \norm{u(x)} \le C\norm{x}$ ».
2. L'application $u \mapsto \norm{u}$ est une norme sur $\Lin_c(E, F)$.
3. Si $G$ est un evn et $v \in \Lin_c(F, G)$, alors $v \circ u \in \Lin_c(E, G)$ et $\norm{v \circ u} \le \norm{v}\,\norm{u}$.
:::

::: proof
**1**　对 $x \ne 0$，由上确界的定义，$\frac{\norm{u(x)}}{\norm{x}} \le \norm{u}$，即 $\norm{u(x)} \le \norm{u}\,\norm{x}$；对 $x = 0$，两边都为 $0$。所以 $C = \norm{u}$ 满足条件。反之，若 $C$ 满足条件，则对一切 $x \ne 0$，$\frac{\norm{u(x)}}{\norm{x}} \le C$，即 $C$ 是上界，而上确界是最小的上界，所以 $\norm{u} \le C$。

**2**　先说明 $\Lin_c(E, F)$ 是向量空间：两个连续线性映射的和、连续线性映射的数乘仍是线性的，并且由 {@c1-cont-operations} 仍连续。

- 分离性：若 $\norm{u} = 0$，由第 1 条，对一切 $x$，$\norm{u(x)} \le 0$，所以 $u(x) = 0$，$u = 0$。
- 齐次性：对 $\norm{x} = 1$，$\norm{(\lambda u)(x)} = \abs{\lambda}\,\norm{u(x)}$。非负数 $\abs{\lambda}$ 乘以一个集合的每个元素，上确界也乘以 $\abs{\lambda}$，所以 $\norm{\lambda u} = \abs{\lambda}\,\norm{u}$。
- 三角不等式：对 $\norm{x} = 1$，$\norm{(u + v)(x)} \le \norm{u(x)} + \norm{v(x)} \le \norm{u} + \norm{v}$（第 1 条）。所以 $\norm{u} + \norm{v}$ 是上界，$\norm{u + v} \le \norm{u} + \norm{v}$。

**3**　$v \circ u$ 是线性的。对 $x \in E$，两次用第 1 条：
$$\norm{v(u(x))} \le \norm{v}\,\norm{u(x)} \le \norm{v}\,\norm{u}\,\norm{x}.$$
由 {@lin-continue}（条件 3，$C = \norm{v}\,\norm{u}$），$v \circ u$ 连续；再由第 1 条（最小常数），$\norm{v \circ u} \le \norm{v}\,\norm{u}$。（若 $F = \{0\}$，则 $u = 0$，$v \circ u = 0$，结论平凡。）
:::

::: fr
**1**　Pour $x \ne 0$, par définition de la borne supérieure, $\frac{\norm{u(x)}}{\norm{x}} \le \norm{u}$, c'est-à-dire $\norm{u(x)} \le \norm{u}\,\norm{x}$ ; pour $x = 0$, les deux membres sont nuls. Donc $C = \norm{u}$ convient. Réciproquement, si $C$ convient, alors pour tout $x \ne 0$, $\frac{\norm{u(x)}}{\norm{x}} \le C$ : $C$ est un majorant, et la borne supérieure est le plus petit des majorants, donc $\norm{u} \le C$.

**2**　Remarquons d'abord que $\Lin_c(E, F)$ est un espace vectoriel : la somme de deux applications linéaires continues et le produit d'une application linéaire continue par un scalaire sont linéaires, et continus d'après la {@fr:c1-cont-operations}.

- Séparation : si $\norm{u} = 0$, d'après le point 1, $\norm{u(x)} \le 0$ pour tout $x$, donc $u(x) = 0$ et $u = 0$.
- Homogénéité : pour $\norm{x} = 1$, $\norm{(\lambda u)(x)} = \abs{\lambda}\,\norm{u(x)}$. Multiplier chaque élément d'une partie de $\R_+$ par le réel positif $\abs{\lambda}$ multiplie sa borne supérieure par $\abs{\lambda}$, donc $\norm{\lambda u} = \abs{\lambda}\,\norm{u}$.
- Inégalité triangulaire : pour $\norm{x} = 1$, $\norm{(u + v)(x)} \le \norm{u(x)} + \norm{v(x)} \le \norm{u} + \norm{v}$ (point 1). Donc $\norm{u} + \norm{v}$ est un majorant, et $\norm{u + v} \le \norm{u} + \norm{v}$.

**3**　L'application $v \circ u$ est linéaire. Pour $x \in E$, en appliquant deux fois le point 1 :
$$\norm{v(u(x))} \le \norm{v}\,\norm{u(x)} \le \norm{v}\,\norm{u}\,\norm{x}.$$
D'après le {@fr:lin-continue} (assertion 3 avec $C = \norm{v}\,\norm{u}$), $v \circ u$ est continue ; puis d'après le point 1 (plus petite constante), $\norm{v \circ u} \le \norm{v}\,\norm{u}$. (Si $F = \{0\}$, alors $u = 0$, $v \circ u = 0$ et le résultat est immédiat.)
:::

::: ex id=c1-ex-norme-matrice zh="矩阵对 ∞-范数的算子范数"
设 $A = (a_{ij}) \in \M_n(\K)$，$u_A(x) = Ax$，$\K^n$ 上取 $\norm{\cdot}_\infty$。则
$$\norm{u_A} = L, \qquad L = \max_{1 \le i \le n} \sum_{j=1}^n \abs{a_{ij}} \quad \text{（行和的最大值）}.$$

- **$\norm{u_A} \le L$**：对每个 $i$，$\abs{(Ax)_i} = \big|\sum_j a_{ij} x_j\big| \le \sum_j \abs{a_{ij}}\,\abs{x_j} \le \big(\sum_j \abs{a_{ij}}\big)\norm{x}_\infty \le L\norm{x}_\infty$；对 $i$ 取最大值，$\norm{Ax}_\infty \le L\norm{x}_\infty$。由 {@c1-norme-sub-prop} 第 1 条（最小常数），$\norm{u_A} \le L$。
- **$\norm{u_A} \ge L$**：取 $i_0$ 使第 $i_0$ 行的和等于 $L$。令 $x_j = \frac{\overline{a_{i_0 j}}}{\abs{a_{i_0 j}}}$（若 $a_{i_0 j} \ne 0$），$x_j = 1$（若 $a_{i_0 j} = 0$）。则 $\abs{x_j} = 1$，$\norm{x}_\infty = 1$，且 $(Ax)_{i_0} = \sum_j a_{i_0 j} x_j = \sum_j \abs{a_{i_0 j}} = L$。所以 $\norm{u_A} \ge \norm{Ax}_\infty \ge L$。

数值例子：$A = \begin{pmatrix} 1 & -2 \\ 3 & 4 \end{pmatrix}$，行和为 $3$ 与 $7$，$\norm{u_A} = 7$；取 $x = (1, 1)$，$Ax = (-1, 7)$，$\norm{Ax}_\infty = 7$。
:::

::: cex id=c1-cex-derivation lvl=1
无穷维时线性映射未必连续。在 $E = \R[X]$ 上取范数 $\norm{P} = \sup_{[0,1]} \abs{P}$，求导映射 $D : P \mapsto P'$ 满足 $\norm{X^n} = 1$，但 $\norm{D X^n} = n$，所以不存在常数 $C$，$D$ 不连续。

**细节。** (a) $\norm{\cdot}$ 是 $\R[X]$ 上的范数：齐次性与三角不等式同 $\Cc([0,1])$ 上的 $\norm{\cdot}_\infty$；分离性：若 $P$ 在 $[0,1]$ 上恒为零，则 $P$ 有无穷多个根，$P = 0$。(b) $x \mapsto x^n$ 在 $[0,1]$ 上递增，$\norm{X^n} = 1$；$D X^n = nX^{n-1}$，$\norm{D X^n} = n$（$n \ge 1$）。(c) 若存在 $C$ 使 $\norm{DP} \le C\norm{P}$ 对一切 $P$ 成立，则 $n \le C$ 对一切 $n \ge 1$ 成立，矛盾；由 {@lin-continue}，$D$ 不连续。(d) 不连续性的序列形式：$P_n = \frac{X^n}{n}$ 满足 $\norm{P_n} = \frac1n \to 0$，但 $\norm{D P_n} = \norm{X^{n-1}} = 1 \not\to 0 = \norm{D0}$。
:::

::: q
在 $E = \Cc([0,1], \R)$ 上考虑线性型 $\delta_0 : f \mapsto f(0)$。它对 $\norm{\cdot}_\infty$ 连续吗？对 $\norm{\cdot}_1$ 呢？
:::

::: ans
**对 $\norm{\cdot}_\infty$ 连续**：$\abs{\delta_0(f)} = \abs{f(0)} \le \norm{f}_\infty$，由 {@lin-continue}（$C = 1$）连续，且 $\norm{\delta_0} \le 1$；取 $f = 1$ 得 $\abs{\delta_0(1)} = 1 = \norm{1}_\infty$，所以 $\norm{\delta_0} = 1$。

**对 $\norm{\cdot}_1$ 不连续**：令 $f_n(x) = \max(0, 1 - nx)$（$n \ge 1$），它连续，$f_n(0) = 1$，而 $\norm{f_n}_1 = \int_0^{1/n} (1 - nx)\,\dd x = \frac{1}{2n}$（底为 $\frac1n$、高为 $1$ 的三角形面积）。若 $\abs{f(0)} \le C\norm{f}_1$ 对一切 $f$ 成立，则 $1 \le \frac{C}{2n}$ 对一切 $n$ 成立，矛盾。同一个线性映射是否连续，取决于所用的范数。
:::

::: q
$f(x) = \frac1x$ 在 $]0, 1]$ 上一致连续吗？在 $[1, +\infty[$ 上呢？
:::

::: ans
**在 $]0, 1]$ 上不一致连续**：令 $x_n = \frac1n$，$y_n = \frac{1}{n+1}$，则 $\abs{x_n - y_n} = \frac{1}{n(n+1)} \to 0$，而 $\abs{f(x_n) - f(y_n)} = 1$。若一致连续，对 $\eps = 1$ 有 $\delta$；取 $n$ 使 $\frac{1}{n(n+1)} < \delta$，矛盾。

**在 $[1, +\infty[$ 上是 1-Lipschitz 的**：$\big|\frac1x - \frac1y\big| = \frac{\abs{x - y}}{xy} \le \abs{x - y}$（$xy \ge 1$），所以一致连续（{@c1-lip-uc}）。第 5 节的 Heine 定理（{@heine}）将说明：问题出在 $]0, 1]$ 不是紧集。
:::

## 紧性

法国大纲采用的是**序列紧**（Bolzano–Weierstrass 意义下）的定义，它在赋范空间中与覆盖紧等价。

紧性是把「闭区间 $[a, b]$ 上的连续函数有最值、一致连续」这些 L1 定理推广到一般空间的关键。本节的主线是：紧集的基本性质 → 紧集上连续函数的性质（最值定理、Heine 定理）→ $\K^n$ 中的 Bolzano–Weierstrass 定理 → **有限维空间上所有范数等价** → Riesz 定理（单位闭球紧当且仅当有限维）。

::: def id=def-compact zh="紧集" en="Compact set" fr="Partie compacte" ru="Компакт"
$K \subset E$ 是**紧集**，如果 $K$ 中的任何数列都有收敛到 $K$ 中某点的子列：
$$\forall (u_n) \in K^{\N},\ \exists \varphi \text{ 抽取函数},\ \exists a \in K,\quad u_{\varphi(n)} \xrightarrow[n \to \infty]{} a.$$
:::

::: fr
Une partie $K \subset E$ est **compacte** si toute suite d'éléments de $K$ admet une suite extraite qui converge vers un élément de $K$ :
$$\forall (u_n) \in K^{\N},\ \exists \varphi \text{ extractrice},\ \exists a \in K,\quad u_{\varphi(n)} \xrightarrow[n \to \infty]{} a.$$
:::

白话：$K$ 中的每个数列在 $K$ 中都有聚点（{@c1-def-vadh}）。注意极限必须在 $K$ **之中**。

::: ex zh="紧集与非紧集"
1. **有限集** $\{a_1, \dots, a_p\}$ 是紧集：对其中的数列 $(u_n)$，$\N = \bigcup_{k=1}^p \{n : u_n = a_k\}$，有限个集合的并是无限集，所以某个 $I_k = \{n : u_n = a_k\}$ 是无限集；把 $I_k$ 的元素从小到大排成 $\varphi(0) < \varphi(1) < \cdots$，则 $u_{\varphi(n)} = a_k$ 是常数列，收敛到 $a_k \in K$。空集也是紧集（条件无需验证）。
2. **$[a, b]$ 是紧集**：$[a,b]$ 中的数列有界，由 L1 的 Bolzano–Weierstrass 定理有收敛子列 $u_{\varphi(n)} \to c$；对 $a \le u_{\varphi(n)} \le b$ 取极限得 $a \le c \le b$。
3. **$]0, 1]$ 不是紧集**：$u_n = \frac{1}{n+1} \in \,]0, 1]$ 收敛到 $0$，由 {@c1-sous-suite}，它的每个子列都收敛到 $0 \notin \,]0, 1]$；而极限唯一，所以没有子列收敛到 $]0,1]$ 中的点。
4. **$\R$ 不是紧集**：$u_n = n$ 的任何子列满足 $u_{\varphi(n)} = \varphi(n) \ge n$，无界，不收敛（{@c1-suites-prop} 第 2 条）。
:::

讨论乘积之前，先在乘积空间上放一个范数。

::: prop id=c1-produit zh="乘积范数" en="Product norm" fr="Norme produit" ru="Норма на произведении пространств" lvl=1
设 $(E, \norm{\cdot}_E)$、$(F, \norm{\cdot}_F)$ 是赋范空间。$N(x, y) = \max\big(\norm{x}_E, \norm{y}_F\big)$ 是 $E \times F$ 上的范数，并且
$$(x_n, y_n) \to (x, y) \iff x_n \to x \text{ 且 } y_n \to y.$$
对有限个赋范空间的乘积 $E_1 \times \cdots \times E_p$（范数取各分量范数的最大值）同样成立。
:::

::: fr
Soient $(E, \norm{\cdot}_E)$ et $(F, \norm{\cdot}_F)$ deux evn. L'application $N(x, y) = \max\big(\norm{x}_E, \norm{y}_F\big)$ est une norme sur $E \times F$, et
$$(x_n, y_n) \to (x, y) \iff x_n \to x \text{ et } y_n \to y.$$
Il en est de même pour un produit fini $E_1 \times \cdots \times E_p$ d'evn (avec pour norme le maximum des normes des composantes).
:::

::: proof
**范数**　分离性：$\max\big(\norm{x}_E, \norm{y}_F\big) = 0 \iff \norm{x}_E = \norm{y}_F = 0 \iff (x, y) = (0, 0)$。齐次性：$\max(\abs\lambda a, \abs\lambda b) = \abs\lambda \max(a, b)$（$a, b \ge 0$）。三角不等式：
$$\norm{x + x'}_E \le \norm{x}_E + \norm{x'}_E \le N(x, y) + N(x', y'),$$
同样（把 $x, E$ 换成 $y, F$）$\norm{y + y'}_F \le N(x, y) + N(x', y')$；取两者的最大值，$N\big((x,y) + (x',y')\big) \le N(x, y) + N(x', y')$。

**收敛**　(⇒) $\norm{x_n - x}_E \le N\big((x_n, y_n) - (x, y)\big) \to 0$；对 $y_n$ 同样。(⇐) 设 $\eps > 0$。取 $N_1$ 使 $n \ge N_1$ 时 $\norm{x_n - x}_E < \eps$，取 $N_2$ 使 $n \ge N_2$ 时 $\norm{y_n - y}_F < \eps$。对 $n \ge \max(N_1, N_2)$，两者都 $< \eps$，所以最大值 $< \eps$。

**有限乘积**　把上面的「两个分量的最大值」换成「$p$ 个分量的最大值」，证明逐字不变。
:::

::: fr
**Norme**　Séparation : $\max\big(\norm{x}_E, \norm{y}_F\big) = 0 \iff \norm{x}_E = \norm{y}_F = 0 \iff (x, y) = (0, 0)$. Homogénéité : $\max(\abs\lambda a, \abs\lambda b) = \abs\lambda \max(a, b)$ pour $a, b \ge 0$. Inégalité triangulaire :
$$\norm{x + x'}_E \le \norm{x}_E + \norm{x'}_E \le N(x, y) + N(x', y'),$$
et de même (en remplaçant $x, E$ par $y, F$) $\norm{y + y'}_F \le N(x, y) + N(x', y')$ ; en prenant le maximum, $N\big((x,y) + (x',y')\big) \le N(x, y) + N(x', y')$.

**Convergence**　(⇒) $\norm{x_n - x}_E \le N\big((x_n, y_n) - (x, y)\big) \to 0$, et de même pour $y_n$. (⇐) Soit $\eps > 0$. Soit $N_1$ tel que $\norm{x_n - x}_E < \eps$ pour $n \ge N_1$, et $N_2$ tel que $\norm{y_n - y}_F < \eps$ pour $n \ge N_2$. Pour $n \ge \max(N_1, N_2)$, les deux sont $< \eps$, donc leur maximum aussi.

**Produit fini**　On remplace « maximum de deux composantes » par « maximum de $p$ composantes » ; la preuve est mot pour mot la même.
:::

::: prop id=compact-ferme-borne lvl=1
紧集是有界闭集。紧集的闭子集是紧集。紧集的有限乘积是紧集（乘积空间取 {@c1-produit} 中的范数）。
:::

::: fr
Toute partie compacte est fermée et bornée. Toute partie fermée d'un compact est compacte. Tout produit fini de compacts est compact (l'espace produit étant muni de la norme de la {@fr:c1-produit}).
:::

::: proof
▷ 思路：三条都直接从定义出发。「有界」用反证：无界集中能取到范数趋于无穷的数列，它没有收敛子列。「闭」用序列刻画 {@carac-seq-adh}。乘积：先对第一个分量抽子列，再从这个子列中对第二个分量抽子列。

**第 1 步（紧 ⇒ 有界）**　设 $K$ 紧。反设 $K$ 无界：对每个 $n \in \N$，$K \not\subset \overline{B}(0, n)$，所以存在 $u_n \in K$ 使 $\norm{u_n} > n$。由紧性，存在抽取函数 $\varphi$ 与 $a \in K$ 使 $u_{\varphi(n)} \to a$。收敛数列有界（{@c1-suites-prop} 第 2 条）：存在 $M$ 使对一切 $n$，$\norm{u_{\varphi(n)}} \le M$。但由 {@c1-sous-suite} 第 1 条，$\norm{u_{\varphi(n)}} > \varphi(n) \ge n$。取 $n = \lfloor M \rfloor + 1 > M$，得 $M \ge \norm{u_{\varphi(n)}} > n > M$，矛盾。

**第 2 步（紧 ⇒ 闭）**　设 $(u_n)$ 是 $K$ 中的数列，$u_n \to a \in E$。由紧性，存在子列 $u_{\varphi(n)} \to b \in K$。由 {@c1-sous-suite} 第 3 条，$u_{\varphi(n)} \to a$。由极限唯一，$a = b \in K$。由 {@carac-seq-adh}，$K$ 是闭集。

**第 3 步（紧集的闭子集）**　设 $K$ 紧，$F \subset K$ 且 $F$ 是 $E$ 的闭集。设 $(u_n)$ 是 $F$ 中的数列。它也是 $K$ 中的数列，所以有子列 $u_{\varphi(n)} \to a \in K$。$a$ 是 $F$ 中数列的极限，$F$ 闭，由 {@carac-seq-adh}，$a \in F$。所以 $F$ 紧。

**第 4 步（乘积）**　设 $K \subset E$、$L \subset F$ 紧，$(x_n, y_n)$ 是 $K \times L$ 中的数列。

1. $(x_n)$ 是 $K$ 中的数列：存在抽取函数 $\varphi$ 与 $a \in K$，使 $x_{\varphi(n)} \to a$。
2. $(y_{\varphi(n)})$ 是 $L$ 中的数列：存在抽取函数 $\psi$ 与 $b \in L$，使 $y_{\varphi(\psi(n))} \to b$。
3. $(x_{\varphi(\psi(n))})$ 是 $(x_{\varphi(n)})$ 的子列（{@c1-sous-suite} 第 2 条），所以也收敛到 $a$（第 3 条）。
4. 由 {@c1-produit}，$(x, y)_{\varphi \circ \psi(n)} \to (a, b) \in K \times L$，而 $\varphi \circ \psi$ 是抽取函数。

所以 $K \times L$ 紧。对 $p$ 个紧集的乘积，对 $p$ 归纳：$K_1 \times \cdots \times K_p = (K_1 \times \cdots \times K_{p-1}) \times K_p$。
:::

::: fr
▷ Méthode : les trois points découlent directement de la définition. Pour « borné », on raisonne par l'absurde : dans une partie non bornée, on trouve une suite dont la norme tend vers l'infini, qui n'a pas de suite extraite convergente. Pour « fermé », on utilise la caractérisation séquentielle ({@fr:carac-seq-adh}). Pour le produit, on extrait d'abord selon la première composante, puis on extrait de cette suite extraite selon la seconde.

**Étape 1 (compact ⇒ borné)**　Soit $K$ compact. Par l'absurde, supposons $K$ non borné : pour tout $n \in \N$, $K \not\subset \overline{B}(0, n)$, donc il existe $u_n \in K$ tel que $\norm{u_n} > n$. Par compacité, il existe une extractrice $\varphi$ et $a \in K$ tels que $u_{\varphi(n)} \to a$. Une suite convergente est bornée (point 2 de la {@fr:c1-suites-prop}) : il existe $M$ tel que pour tout $n$, $\norm{u_{\varphi(n)}} \le M$. Mais d'après le point 1 du {@fr:c1-sous-suite}, $\norm{u_{\varphi(n)}} > \varphi(n) \ge n$. Pour $n = \lfloor M \rfloor + 1 > M$, on obtient $M \ge \norm{u_{\varphi(n)}} > n > M$, ce qui est absurde.

**Étape 2 (compact ⇒ fermé)**　Soit $(u_n)$ une suite de $K$ telle que $u_n \to a \in E$. Par compacité, il existe une suite extraite $u_{\varphi(n)} \to b \in K$. D'après le point 3 du {@fr:c1-sous-suite}, $u_{\varphi(n)} \to a$. Par unicité de la limite, $a = b \in K$. D'après le {@fr:carac-seq-adh}, $K$ est fermé.

**Étape 3 (fermé d'un compact)**　Soient $K$ compact et $F \subset K$ un fermé de $E$. Soit $(u_n)$ une suite de $F$. C'est aussi une suite de $K$ ; elle admet donc une suite extraite $u_{\varphi(n)} \to a \in K$. Le point $a$ est limite d'une suite de $F$ et $F$ est fermé, donc $a \in F$ d'après le {@fr:carac-seq-adh}. Ainsi $F$ est compact.

**Étape 4 (produit)**　Soient $K \subset E$, $L \subset F$ compacts et $(x_n, y_n)$ une suite de $K \times L$.

1. $(x_n)$ est une suite de $K$ : il existe une extractrice $\varphi$ et $a \in K$ tels que $x_{\varphi(n)} \to a$.
2. $(y_{\varphi(n)})$ est une suite de $L$ : il existe une extractrice $\psi$ et $b \in L$ tels que $y_{\varphi(\psi(n))} \to b$.
3. $(x_{\varphi(\psi(n))})$ est extraite de $(x_{\varphi(n)})$ (point 2 du {@fr:c1-sous-suite}), donc converge aussi vers $a$ (point 3).
4. D'après la {@fr:c1-produit}, $(x, y)_{\varphi \circ \psi(n)} \to (a, b) \in K \times L$, et $\varphi \circ \psi$ est une extractrice.

Donc $K \times L$ est compact. Pour un produit de $p$ compacts, on raisonne par récurrence sur $p$ : $K_1 \times \cdots \times K_p = (K_1 \times \cdots \times K_{p-1}) \times K_p$.
:::

::: cex id=c1-cex-boule-c01 lvl=1
有界闭集未必紧。在 $E = \big(\Cc([0,1], \R), \norm{\cdot}_\infty\big)$ 中，闭单位球 $\overline{B}(0, 1)$ 是有界闭集（{@c1-ouverts-stab}），但不是紧集。

**证明。** $f_n(x) = x^n$ 满足 $\norm{f_n}_\infty = 1$，所以 $f_n \in \overline{B}(0,1)$。反设某个子列 $f_{\varphi(n)} \to g \in E$（对 $\norm{\cdot}_\infty$）。对每个 $x \in [0, 1]$，$\abs{f_{\varphi(n)}(x) - g(x)} \le \norm{f_{\varphi(n)} - g}_\infty \to 0$，所以 $g(x) = \lim_n x^{\varphi(n)}$：$x < 1$ 时为 $0$，$x = 1$ 时为 $1$。这样的 $g$ 在 $1$ 处不连续，与 $g \in E$ 矛盾。所以 $(f_n)$ 没有收敛子列。

在有限维空间中情况相反：有界闭集都是紧集（{@cor-dimfinie}）。Riesz 定理（{@riesz}）说明这个现象恰好刻画了无穷维。
:::

::: thm id=image-compact zh="紧集的连续像与最值定理" en="Extreme value theorem" fr="Théorème des bornes atteintes" ru="Теорема Вейерштрасса о достижении экстремумов" lvl=1
若 $f : K \to F$ 连续，$K$ 紧，则 $f(K)$ 紧。特别地，非空紧集上的实值连续函数有界并取到最大值和最小值。
:::

::: fr
Si $f : K \to F$ est continue et $K$ compact, alors $f(K)$ est compact. En particulier, une fonction continue à valeurs réelles sur un compact non vide est bornée et atteint ses bornes (son maximum et son minimum).
:::

::: proof
▷ 思路：$f(K)$ 中的数列来自 $K$ 中的数列；在 $K$ 中抽收敛子列，再用连续性的序列刻画把收敛性传过去。最值：$f(K)$ 是 $\R$ 的有界闭集，上确界是 $f(K)$ 中数列的极限，所以属于 $f(K)$。

**第 1 步（$f(K)$ 紧）**　设 $(y_n)$ 是 $f(K)$ 中的数列。对每个 $n$，取 $x_n \in K$ 使 $y_n = f(x_n)$。由 $K$ 紧，存在抽取函数 $\varphi$ 与 $a \in K$，使 $x_{\varphi(n)} \to a$。由 $f$ 在 $a$ 连续（{@carac-seq-cont}），$y_{\varphi(n)} = f(x_{\varphi(n)}) \to f(a) \in f(K)$。所以 $f(K)$ 紧。

**第 2 步（最大值）**　设 $K \ne \varnothing$，$F = \R$。由第 1 步与 {@compact-ferme-borne}，$f(K)$ 是 $\R$ 的非空有界闭集，所以有上确界 $M = \sup f(K)$。对每个 $n \ge 1$，$M - \frac1n < M$ 不是上界，所以存在 $t_n \in f(K)$ 使 $M - \frac1n < t_n \le M$。于是 $\abs{t_n - M} < \frac1n$，$t_n \to M$。$f(K)$ 闭，由 {@carac-seq-adh}，$M \in f(K)$：存在 $x_M \in K$ 使 $f(x_M) = M$，即 $f$ 在 $x_M$ 取到最大值。

**第 3 步（最小值）**　$-f$ 也在 $K$ 上连续（{@c1-cont-operations}），由第 2 步，$-f$ 在某点 $x_m$ 取到最大值，即 $f$ 在 $x_m$ 取到最小值 $\min f(K) = -\max(-f)(K)$。

$f$ 有界：对一切 $x \in K$，$f(x_m) \le f(x) \le f(x_M)$。
:::

::: fr
▷ Méthode : une suite de $f(K)$ provient d'une suite de $K$ ; on en extrait une suite convergente dans $K$, puis la caractérisation séquentielle de la continuité transporte la convergence. Pour les bornes : $f(K)$ est une partie fermée bornée de $\R$, et sa borne supérieure est limite d'une suite de $f(K)$, donc appartient à $f(K)$.

**Étape 1 ($f(K)$ est compact)**　Soit $(y_n)$ une suite de $f(K)$. Pour tout $n$, choisissons $x_n \in K$ tel que $y_n = f(x_n)$. Comme $K$ est compact, il existe une extractrice $\varphi$ et $a \in K$ tels que $x_{\varphi(n)} \to a$. Comme $f$ est continue en $a$ ({@fr:carac-seq-cont}), $y_{\varphi(n)} = f(x_{\varphi(n)}) \to f(a) \in f(K)$. Donc $f(K)$ est compact.

**Étape 2 (maximum)**　Supposons $K \ne \varnothing$ et $F = \R$. D'après l'étape 1 et la {@fr:compact-ferme-borne}, $f(K)$ est une partie non vide, fermée et bornée de $\R$ ; elle admet donc une borne supérieure $M = \sup f(K)$. Pour tout $n \ge 1$, $M - \frac1n < M$ n'est pas un majorant, donc il existe $t_n \in f(K)$ tel que $M - \frac1n < t_n \le M$. Ainsi $\abs{t_n - M} < \frac1n$ et $t_n \to M$. Comme $f(K)$ est fermé, d'après le {@fr:carac-seq-adh}, $M \in f(K)$ : il existe $x_M \in K$ tel que $f(x_M) = M$, c'est-à-dire que $f$ atteint son maximum en $x_M$.

**Étape 3 (minimum)**　La fonction $-f$ est aussi continue sur $K$ ({@fr:c1-cont-operations}) ; d'après l'étape 2, elle atteint son maximum en un point $x_m$, c'est-à-dire que $f$ atteint en $x_m$ son minimum $\min f(K) = -\max(-f)(K)$.

$f$ est bornée : pour tout $x \in K$, $f(x_m) \le f(x) \le f(x_M)$.
:::

::: rem
**每个条件都不能去掉。**
1. $K$ 紧：$f(x) = x$ 在 $]0, 1]$ 上连续，下确界 $0$ 取不到；在 $\R$ 上无界。
2. $f$ 连续：$f(x) = x$（$x < 1$），$f(1) = 0$，定义在紧集 $[0,1]$ 上，上确界 $1$ 取不到。
3. $K \ne \varnothing$：否则 $f(K) = \varnothing$ 没有最大值。

**逆命题不成立**：$f(K)$ 紧推不出 $K$ 紧，例如常值函数把 $\R$ 映成一个点。
:::

::: thm id=heine zh="Heine 定理" en="Heine–Cantor theorem" fr="Théorème de Heine" ru="Теорема Кантора (о равномерной непрерывности)" lvl=1
紧集上的连续函数一致连续：若 $K \subset E$ 紧，$f : K \to F$ 连续，则 $f$ 在 $K$ 上一致连续。
:::

::: fr
Toute application continue sur un compact y est uniformément continue : si $K \subset E$ est compact et $f : K \to F$ est continue, alors $f$ est uniformément continue sur $K$.
:::

::: proof
▷ 思路：反证。「不一致连续」给出两列越来越近、像却保持距离的点；用紧性抽出收敛子列，两列有共同的极限 $a$；在 $a$ 处的连续性迫使像的距离趋于 $0$，矛盾。

反设 $f$ 在 $K$ 上不一致连续。

**第 1 步（写出否定）**　存在 $\eps > 0$，对一切 $\delta > 0$，存在 $x, y \in K$ 使 $\norm{x - y} < \delta$ 且 $\norm{f(x) - f(y)} \ge \eps$。对每个 $n \in \N$ 取 $\delta = \frac{1}{n+1}$，得到 $x_n, y_n \in K$：
$$\norm{x_n - y_n} < \frac{1}{n+1}, \qquad \norm{f(x_n) - f(y_n)} \ge \eps.$$

**第 2 步（抽子列）**　由 $K$ 紧，存在抽取函数 $\varphi$ 与 $a \in K$ 使 $x_{\varphi(n)} \to a$。于是
$$\norm{y_{\varphi(n)} - a} \le \norm{y_{\varphi(n)} - x_{\varphi(n)}} + \norm{x_{\varphi(n)} - a} < \frac{1}{\varphi(n) + 1} + \norm{x_{\varphi(n)} - a} \le \frac{1}{n+1} + \norm{x_{\varphi(n)} - a},$$
（最后一步用 $\varphi(n) \ge n$）右边趋于 $0$，所以 $y_{\varphi(n)} \to a$。

**第 3 步（用连续性）**　$f$ 在 $a$ 连续，由 {@carac-seq-cont}，$f(x_{\varphi(n)}) \to f(a)$，$f(y_{\varphi(n)}) \to f(a)$。由 {@c1-suites-prop} 第 4、3 条，$\norm{f(x_{\varphi(n)}) - f(y_{\varphi(n)})} \to \norm{f(a) - f(a)} = 0$。所以存在 $n$ 使 $\norm{f(x_{\varphi(n)}) - f(y_{\varphi(n)})} < \eps$，与第 1 步矛盾。

所以 $f$ 在 $K$ 上一致连续。
:::

::: fr
▷ Méthode : par l'absurde. La négation de la continuité uniforme fournit deux suites de points de plus en plus proches dont les images restent à distance $\ge \eps$ ; la compacité permet d'extraire des suites convergentes, de limite commune $a$ ; la continuité en $a$ force la distance des images à tendre vers $0$, contradiction.

Par l'absurde, supposons que $f$ ne soit pas uniformément continue sur $K$.

**Étape 1 (on écrit la négation)**　Il existe $\eps > 0$ tel que pour tout $\delta > 0$, il existe $x, y \in K$ avec $\norm{x - y} < \delta$ et $\norm{f(x) - f(y)} \ge \eps$. Pour chaque $n \in \N$, avec $\delta = \frac{1}{n+1}$, on obtient $x_n, y_n \in K$ tels que
$$\norm{x_n - y_n} < \frac{1}{n+1}, \qquad \norm{f(x_n) - f(y_n)} \ge \eps.$$

**Étape 2 (extraction)**　Comme $K$ est compact, il existe une extractrice $\varphi$ et $a \in K$ tels que $x_{\varphi(n)} \to a$. Alors
$$\norm{y_{\varphi(n)} - a} \le \norm{y_{\varphi(n)} - x_{\varphi(n)}} + \norm{x_{\varphi(n)} - a} < \frac{1}{\varphi(n) + 1} + \norm{x_{\varphi(n)} - a} \le \frac{1}{n+1} + \norm{x_{\varphi(n)} - a}$$
(la dernière inégalité utilise $\varphi(n) \ge n$) ; le membre de droite tend vers $0$, donc $y_{\varphi(n)} \to a$.

**Étape 3 (continuité)**　Comme $f$ est continue en $a$, d'après la {@fr:carac-seq-cont}, $f(x_{\varphi(n)}) \to f(a)$ et $f(y_{\varphi(n)}) \to f(a)$. D'après les points 4 et 3 de la {@fr:c1-suites-prop}, $\norm{f(x_{\varphi(n)}) - f(y_{\varphi(n)})} \to \norm{f(a) - f(a)} = 0$. Il existe donc $n$ tel que $\norm{f(x_{\varphi(n)}) - f(y_{\varphi(n)})} < \eps$, ce qui contredit l'étape 1.

Ainsi $f$ est uniformément continue sur $K$.
:::

::: rem
紧性不能去掉：$\frac1x$ 在 $]0, 1]$ 上连续但不一致连续（§4 的「想一想」）；$x^2$ 在 $\R$ 上也是（{@c1-cex-uc}）。Heine 定理是第 3 章 Weierstrass 逼近定理与第 11 章 Riemann 积分存在性的关键工具。
:::

::: thm id=bw-kn zh="有限维空间中的 Bolzano–Weierstrass 定理" en="Bolzano–Weierstrass theorem" fr="Théorème de Bolzano–Weierstrass" ru="Теорема Больцано–Вейерштрасса" lvl=1
在 $(\K^n, \norm{\cdot}_\infty)$ 中，有界数列有收敛子列。因此 $\K^n$ 的紧集恰是有界闭集。
:::

::: fr
Dans $(\K^n, \norm{\cdot}_\infty)$, toute suite bornée admet une suite extraite convergente. Par conséquent, les compacts de $\K^n$ sont exactement les parties fermées bornées.
:::

::: proof
▷ 思路：L1 的 Bolzano–Weierstrass 定理处理一个坐标；$n$ 个坐标就逐次抽取 $n$ 次（对 $n$ 归纳），每次都从上一次得到的子列里再抽。

$n = 1$、$\K = \R$ 是 L1 的 Bolzano–Weierstrass 定理。下面用 $k$ 作数列下标，$n$ 是维数。

**第 1 步（$\K = \C$，$n = 1$）**　设 $(z_k)$ 是 $\C$ 中的有界数列，$\abs{z_k} \le M$。则 $\abs{\operatorname{Re} z_k} \le \abs{z_k} \le M$，$\abs{\operatorname{Im} z_k} \le M$。

1. 由 L1 的定理，存在抽取函数 $\varphi$ 与 $\alpha \in \R$ 使 $\operatorname{Re} z_{\varphi(k)} \to \alpha$。
2. $(\operatorname{Im} z_{\varphi(k)})$ 有界，存在抽取函数 $\psi$ 与 $\beta \in \R$ 使 $\operatorname{Im} z_{\varphi(\psi(k))} \to \beta$。
3. $(\operatorname{Re} z_{\varphi(\psi(k))})$ 是 $(\operatorname{Re} z_{\varphi(k)})$ 的子列，仍收敛到 $\alpha$（{@c1-sous-suite}）。
4. 由 $\abs{z - (\alpha + \ii\beta)} \le \abs{\operatorname{Re} z - \alpha} + \abs{\operatorname{Im} z - \beta}$，$z_{\varphi(\psi(k))} \to \alpha + \ii\beta$。

**第 2 步（对 $n$ 归纳）**　命题 $P(n)$：$(\K^n, \norm{\cdot}_\infty)$ 中的有界数列有收敛子列。

**初始化**　$P(1)$：L1 的定理（$\K = \R$）与第 1 步（$\K = \C$）。

**递推**　设 $P(n)$ 成立。把 $\K^{n+1}$ 写成 $\K^n \times \K$，则 $\norm{(x, t)}_\infty = \max\big(\norm{x}_\infty, \abs{t}\big)$，正是 {@c1-produit} 中的乘积范数。设 $(x_k, t_k)$ 有界，$\norm{(x_k, t_k)}_\infty \le M$，则 $\norm{x_k}_\infty \le M$，$\abs{t_k} \le M$。

1. 由 $P(n)$，存在 $\varphi$ 与 $a \in \K^n$ 使 $x_{\varphi(k)} \to a$。
2. $(t_{\varphi(k)})$ 有界，由 $P(1)$，存在 $\psi$ 与 $b \in \K$ 使 $t_{\varphi(\psi(k))} \to b$。
3. $x_{\varphi(\psi(k))} \to a$（子列，{@c1-sous-suite}）。
4. 由 {@c1-produit}，$(x_{\varphi(\psi(k))}, t_{\varphi(\psi(k))}) \to (a, b)$。

所以 $P(n+1)$ 成立。

**第 3 步（紧集 = 有界闭集）**　紧 ⇒ 有界闭：{@compact-ferme-borne}。反之设 $K \subset \K^n$ 有界闭，$(u_k)$ 是 $K$ 中的数列。$(u_k)$ 有界，由第 2 步有子列 $u_{\varphi(k)} \to a \in \K^n$；$K$ 闭，由 {@carac-seq-adh}，$a \in K$。所以 $K$ 紧。
:::

::: fr
▷ Méthode : le théorème de Bolzano–Weierstrass de L1 traite une coordonnée ; pour $n$ coordonnées, on extrait $n$ fois successivement (récurrence sur $n$), chaque fois à partir de la suite extraite précédente.

Le cas $n = 1$, $\K = \R$ est le théorème de Bolzano–Weierstrass de L1. Ci-dessous, $k$ désigne l'indice des suites et $n$ la dimension.

**Étape 1 ($\K = \C$, $n = 1$)**　Soit $(z_k)$ une suite bornée de $\C$, $\abs{z_k} \le M$. Alors $\abs{\operatorname{Re} z_k} \le \abs{z_k} \le M$ et $\abs{\operatorname{Im} z_k} \le M$.

1. D'après le théorème de L1, il existe une extractrice $\varphi$ et $\alpha \in \R$ tels que $\operatorname{Re} z_{\varphi(k)} \to \alpha$.
2. La suite $(\operatorname{Im} z_{\varphi(k)})$ est bornée : il existe une extractrice $\psi$ et $\beta \in \R$ tels que $\operatorname{Im} z_{\varphi(\psi(k))} \to \beta$.
3. La suite $(\operatorname{Re} z_{\varphi(\psi(k))})$ est extraite de $(\operatorname{Re} z_{\varphi(k)})$, donc converge encore vers $\alpha$ ({@fr:c1-sous-suite}).
4. Comme $\abs{z - (\alpha + \ii\beta)} \le \abs{\operatorname{Re} z - \alpha} + \abs{\operatorname{Im} z - \beta}$, on a $z_{\varphi(\psi(k))} \to \alpha + \ii\beta$.

**Étape 2 (récurrence sur $n$)**　Notons $P(n)$ : « toute suite bornée de $(\K^n, \norm{\cdot}_\infty)$ admet une suite extraite convergente ».

**Initialisation**　$P(1)$ : théorème de L1 ($\K = \R$) et étape 1 ($\K = \C$).

**Hérédité**　Supposons $P(n)$. On écrit $\K^{n+1} = \K^n \times \K$ ; alors $\norm{(x, t)}_\infty = \max\big(\norm{x}_\infty, \abs{t}\big)$ est exactement la norme produit de la {@fr:c1-produit}. Soit $(x_k, t_k)$ bornée, $\norm{(x_k, t_k)}_\infty \le M$ ; alors $\norm{x_k}_\infty \le M$ et $\abs{t_k} \le M$.

1. D'après $P(n)$, il existe $\varphi$ et $a \in \K^n$ tels que $x_{\varphi(k)} \to a$.
2. La suite $(t_{\varphi(k)})$ est bornée ; d'après $P(1)$, il existe $\psi$ et $b \in \K$ tels que $t_{\varphi(\psi(k))} \to b$.
3. $x_{\varphi(\psi(k))} \to a$ (suite extraite, {@fr:c1-sous-suite}).
4. D'après la {@fr:c1-produit}, $(x_{\varphi(\psi(k))}, t_{\varphi(\psi(k))}) \to (a, b)$.

Donc $P(n+1)$ est vraie.

**Étape 3 (compacts = fermés bornés)**　Compact ⇒ fermé borné : {@fr:compact-ferme-borne}. Réciproquement, soient $K \subset \K^n$ fermé borné et $(u_k)$ une suite de $K$. La suite $(u_k)$ est bornée ; d'après l'étape 2, elle admet une suite extraite $u_{\varphi(k)} \to a \in \K^n$ ; comme $K$ est fermé, $a \in K$ d'après le {@fr:carac-seq-adh}. Donc $K$ est compact.
:::

::: thm id=equiv-dimfinie zh="有限维空间中范数的等价性" en="Equivalence of norms in finite dimension" fr="Équivalence des normes en dimension finie" ru="Эквивалентность норм в конечномерном пространстве" lvl=1
有限维向量空间上的所有范数都等价。
:::

::: fr
Sur un espace vectoriel de dimension finie, toutes les normes sont équivalentes.
:::

::: proof
▷ 思路：等价是等价关系（{@def-equiv} 后的注），所以只需证明任一范数 $N$ 都与一个固定的范数 $\norm{\cdot}_\infty$ 等价。上界 $N \le \beta\norm{\cdot}_\infty$ 来自三角不等式；下界 $N \ge \alpha\norm{\cdot}_\infty$ 来自 $N$ 在紧的单位球面上取到正的最小值。

**第 0 步（设定）**　若 $E = \{0\}$，$E$ 上只有一个范数（零函数），无需证明。设 $n = \dim E \ge 1$，取基 $(e_1, \dots, e_n)$。每个 $x \in E$ 唯一地写成 $x = \sum_{i=1}^n x_i e_i$，令 $\norm{x}_\infty = \max_i \abs{x_i}$，这是 $E$ 上的范数（验证同「经典范数」的例子）。坐标映射 $\Phi : x \mapsto (x_1, \dots, x_n)$ 是 $E$ 到 $\K^n$ 的线性双射，且 $\norm{\Phi(x)}_\infty = \norm{x}_\infty$。设 $N$ 是 $E$ 上的任一范数。

**第 1 步（上界）**　由三角不等式与齐次性，
$$N(x) = N\Big(\sum_i x_i e_i\Big) \le \sum_i \abs{x_i}\, N(e_i) \le \Big(\sum_i N(e_i)\Big) \norm{x}_\infty = \beta \norm{x}_\infty,$$
其中 $\beta = \sum_i N(e_i) > 0$（$e_1 \ne 0$）。

**第 2 步（$N$ 对 $\norm{\cdot}_\infty$ 连续）**　由反向三角不等式与第 1 步，$\abs{N(x) - N(y)} \le N(x - y) \le \beta\norm{x - y}_\infty$，所以 $N$ 是 $(E, \norm{\cdot}_\infty)$ 上的 $\beta$-Lipschitz 函数，连续（{@c1-lip-uc}）。

**第 3 步（单位球面 $S = \{x : \norm{x}_\infty = 1\}$ 紧）**　设 $(s_k)$ 是 $S$ 中的数列。$(\Phi(s_k))$ 是 $\K^n$ 中的有界数列（范数为 1），由 {@bw-kn}，存在 $\varphi$ 与 $c \in \K^n$ 使 $\Phi(s_{\varphi(k)}) \to c$。令 $s = \Phi^{-1}(c)$，则 $\norm{s_{\varphi(k)} - s}_\infty = \norm{\Phi(s_{\varphi(k)}) - c}_\infty \to 0$，并且 $\norm{s}_\infty = \lim_k \norm{s_{\varphi(k)}}_\infty = 1$（{@c1-suites-prop} 第 3 条），即 $s \in S$。所以 $S$ 在 $(E, \norm{\cdot}_\infty)$ 中紧。又 $e_1 \in S$，$S \ne \varnothing$。

**第 4 步（最小值）**　由第 2、3 步与 {@image-compact}，$N$ 在 $S$ 上某点 $x_0$ 取到最小值 $\alpha = N(x_0)$。由于 $\norm{x_0}_\infty = 1$，$x_0 \ne 0$，由分离性 $\alpha > 0$。

**第 5 步（下界）**　设 $x \ne 0$，则 $\frac{x}{\norm{x}_\infty} \in S$，所以 $N\big(\frac{x}{\norm{x}_\infty}\big) \ge \alpha$；由齐次性，$N(x) \ge \alpha\norm{x}_\infty$。$x = 0$ 时两边都为 0。

由第 1、5 步，$\alpha\norm{x}_\infty \le N(x) \le \beta\norm{x}_\infty$ 对一切 $x$ 成立，$N$ 与 $\norm{\cdot}_\infty$ 等价。由等价关系的对称性与传递性，$E$ 上任意两个范数都等价。
:::

::: fr
▷ Méthode : l'équivalence des normes est une relation d'équivalence (remarque suivant la {@fr:def-equiv}) ; il suffit donc de montrer que toute norme $N$ est équivalente à une norme fixée $\norm{\cdot}_\infty$. La majoration $N \le \beta\norm{\cdot}_\infty$ vient de l'inégalité triangulaire ; la minoration $N \ge \alpha\norm{\cdot}_\infty$ vient du fait que $N$ atteint un minimum strictement positif sur la sphère unité, qui est compacte.

**Étape 0 (cadre)**　Si $E = \{0\}$, il n'y a qu'une norme sur $E$ (la fonction nulle) et il n'y a rien à montrer. Supposons $n = \dim E \ge 1$ et fixons une base $(e_1, \dots, e_n)$. Tout $x \in E$ s'écrit de manière unique $x = \sum_{i=1}^n x_i e_i$ ; posons $\norm{x}_\infty = \max_i \abs{x_i}$, qui est une norme sur $E$ (même vérification que dans l'exemple des normes usuelles). L'application coordonnées $\Phi : x \mapsto (x_1, \dots, x_n)$ est une bijection linéaire de $E$ sur $\K^n$, et $\norm{\Phi(x)}_\infty = \norm{x}_\infty$. Soit $N$ une norme quelconque sur $E$.

**Étape 1 (majoration)**　Par l'inégalité triangulaire et l'homogénéité,
$$N(x) = N\Big(\sum_i x_i e_i\Big) \le \sum_i \abs{x_i}\, N(e_i) \le \Big(\sum_i N(e_i)\Big) \norm{x}_\infty = \beta \norm{x}_\infty,$$
où $\beta = \sum_i N(e_i) > 0$ (car $e_1 \ne 0$).

**Étape 2 ($N$ est continue pour $\norm{\cdot}_\infty$)**　Par l'inégalité triangulaire inverse et l'étape 1, $\abs{N(x) - N(y)} \le N(x - y) \le \beta\norm{x - y}_\infty$ ; ainsi $N$ est $\beta$-lipschitzienne sur $(E, \norm{\cdot}_\infty)$, donc continue ({@fr:c1-lip-uc}).

**Étape 3 (la sphère unité $S = \{x : \norm{x}_\infty = 1\}$ est compacte)**　Soit $(s_k)$ une suite de $S$. La suite $(\Phi(s_k))$ est bornée dans $\K^n$ (de norme 1) ; d'après le {@fr:bw-kn}, il existe $\varphi$ et $c \in \K^n$ tels que $\Phi(s_{\varphi(k)}) \to c$. Posons $s = \Phi^{-1}(c)$ ; alors $\norm{s_{\varphi(k)} - s}_\infty = \norm{\Phi(s_{\varphi(k)}) - c}_\infty \to 0$, et $\norm{s}_\infty = \lim_k \norm{s_{\varphi(k)}}_\infty = 1$ (point 3 de la {@fr:c1-suites-prop}), c'est-à-dire $s \in S$. Ainsi $S$ est compacte dans $(E, \norm{\cdot}_\infty)$. De plus $e_1 \in S$, donc $S \ne \varnothing$.

**Étape 4 (minimum)**　D'après les étapes 2 et 3 et le {@fr:image-compact}, $N$ atteint sur $S$ son minimum $\alpha = N(x_0)$ en un point $x_0$. Comme $\norm{x_0}_\infty = 1$, on a $x_0 \ne 0$, donc $\alpha > 0$ par séparation.

**Étape 5 (minoration)**　Soit $x \ne 0$ ; alors $\frac{x}{\norm{x}_\infty} \in S$, donc $N\big(\frac{x}{\norm{x}_\infty}\big) \ge \alpha$, et par homogénéité $N(x) \ge \alpha\norm{x}_\infty$. Pour $x = 0$, les deux membres sont nuls.

D'après les étapes 1 et 5, $\alpha\norm{x}_\infty \le N(x) \le \beta\norm{x}_\infty$ pour tout $x$ : $N$ est équivalente à $\norm{\cdot}_\infty$. Par symétrie et transitivité, deux normes quelconques sur $E$ sont équivalentes.
:::

::: rem
1. **有限维不能去掉**：{@cex-normes-c01}。证明中真正用到有限维的地方是第 3 步（单位球面紧）；无穷维时它不紧（{@c1-cex-boule-c01}，{@riesz}）。
2. **证明用到了 $\R$ 的完备性**（通过 Bolzano–Weierstrass）。在 $\Q$-向量空间 $\Q^2$ 上，$N(x, y) = \abs{x + y\sqrt2}$ 是范数（分离性：若 $x + y\sqrt2 = 0$ 且 $y \ne 0$，则 $\sqrt2 = -\frac xy \in \Q$，矛盾；所以 $y = 0$，进而 $x = 0$），但它与 $\norm{\cdot}_\infty$ 不等价：由 $\Q$ 在 $\R$ 中稠密，取有理数 $r_k$ 使 $\abs{r_k - \sqrt2} < \frac1k$，则 $N(r_k, -1) = \abs{r_k - \sqrt2} < \frac1k$，而 $\norm{(r_k, -1)}_\infty \ge 1$，不存在 $\alpha > 0$ 使 $N \ge \alpha\norm{\cdot}_\infty$。
3. **后果**：在有限维空间中，「收敛」「有界」「开」「闭」「紧」「连续」都不依赖于范数的选取（{@equiv-conv}）。所以在 $\R^n$、$\M_n(\K)$ 上可以随手选最方便的范数。
:::

::: cor id=cor-dimfinie lvl=1
设 $E$ 有限维。则：

1. $E$ 中的紧集恰是有界闭集；
2. 从 $E$ 出发的任何线性映射都连续；
3. 任何赋范空间的有限维子空间都是闭集。
:::

::: fr
Soit $E$ de dimension finie. Alors :

1. les compacts de $E$ sont exactement les parties fermées bornées ;
2. toute application linéaire définie sur $E$ est continue ;
3. tout sous-espace de dimension finie d'un evn est fermé.
:::

::: proof
▷ 思路：由 {@equiv-dimfinie}，可以换成在基下的坐标范数 $\norm{\cdot}_\infty$ 或 $\norm{\cdot}_1$，于是问题化为 $\K^n$ 上的计算。

若 $E = \{0\}$，三条都平凡（$E$ 的子集 $\varnothing$、$\{0\}$ 都紧、有界、闭；唯一的线性映射是零映射）。下设 $n = \dim E \ge 1$，取基 $(e_i)$，记号 $\norm{\cdot}_\infty$、$\Phi$ 同 {@equiv-dimfinie} 的证明。设 $N$ 是 $E$ 上给定的范数。

**1**　由 {@equiv-dimfinie} 与 {@equiv-conv}，$N$ 与 $\norm{\cdot}_\infty$ 有相同的收敛数列、有界集、开集，从而相同的闭集（补集）与紧集（紧性只用收敛数列定义）。所以只需在 $(E, \norm{\cdot}_\infty)$ 中证明。紧 ⇒ 有界闭：{@compact-ferme-borne}。有界闭 ⇒ 紧：设 $K$ 有界闭，$(u_k)$ 是 $K$ 中的数列。$(\Phi(u_k))$ 在 $\K^n$ 中有界，由 {@bw-kn} 有子列 $\Phi(u_{\varphi(k)}) \to c$；于是 $u_{\varphi(k)} \to \Phi^{-1}(c)$（$\Phi$ 保持范数），由 $K$ 闭（{@carac-seq-adh}），$\Phi^{-1}(c) \in K$。

**2**　设 $u : E \to F$ 线性。令 $\norm{x}_1 = \sum_i \abs{x_i}$（$E$ 上的范数）。

1. 由线性与三角不等式，$\norm{u(x)} = \big\|\sum_i x_i u(e_i)\big\| \le \sum_i \abs{x_i}\,\norm{u(e_i)} \le M\norm{x}_1$，其中 $M = \max_i \norm{u(e_i)}$。
2. 由 {@equiv-dimfinie}，存在 $c > 0$ 使 $\norm{x}_1 \le c\,N(x)$。
3. 于是 $\norm{u(x)} \le Mc\,N(x)$，由 {@lin-continue}，$u$ 连续。

**3**　设 $G$ 是赋范空间，$F \subset G$ 是有限维子空间，$(u_k)$ 是 $F$ 中的数列，$u_k \to a \in G$。

1. 收敛数列有界：存在 $M$ 使 $\norm{u_k} \le M$ 对一切 $k$ 成立。
2. 令 $K = \{x \in F : \norm{x} \le M\}$。它在 $(F, \norm{\cdot})$ 中有界；也是闭的：若 $F \ni x_j \to x \in F$ 且 $\norm{x_j} \le M$，则 $\norm{x} = \lim \norm{x_j} \le M$（{@c1-suites-prop} 第 3 条与不等式取极限）。由结论 1（用于有限维空间 $F$），$K$ 紧。
3. $(u_k)$ 是 $K$ 中的数列，所以有子列 $u_{\varphi(k)} \to b \in K \subset F$。
4. 又 $u_{\varphi(k)} \to a$（{@c1-sous-suite}）。由极限唯一，$a = b \in F$。

由 {@carac-seq-adh}，$F$ 在 $G$ 中闭。
:::

::: fr
▷ Méthode : d'après le {@fr:equiv-dimfinie}, on peut remplacer la norme par la norme coordonnées $\norm{\cdot}_\infty$ ou $\norm{\cdot}_1$ dans une base, et se ramener à des calculs dans $\K^n$.

Si $E = \{0\}$, les trois points sont immédiats (les parties $\varnothing$ et $\{0\}$ sont compactes, fermées et bornées ; la seule application linéaire est nulle). Supposons $n = \dim E \ge 1$, fixons une base $(e_i)$, et reprenons les notations $\norm{\cdot}_\infty$, $\Phi$ de la preuve du {@fr:equiv-dimfinie}. Soit $N$ la norme donnée sur $E$.

**1**　D'après le {@fr:equiv-dimfinie} et la {@fr:equiv-conv}, $N$ et $\norm{\cdot}_\infty$ ont les mêmes suites convergentes, les mêmes parties bornées et les mêmes ouverts, donc aussi les mêmes fermés (complémentaires) et les mêmes compacts (la compacité ne fait intervenir que des suites convergentes). Il suffit donc de raisonner dans $(E, \norm{\cdot}_\infty)$. Compact ⇒ fermé borné : {@fr:compact-ferme-borne}. Fermé borné ⇒ compact : soient $K$ fermé borné et $(u_k)$ une suite de $K$. La suite $(\Phi(u_k))$ est bornée dans $\K^n$ ; d'après le {@fr:bw-kn}, elle admet une suite extraite $\Phi(u_{\varphi(k)}) \to c$ ; alors $u_{\varphi(k)} \to \Phi^{-1}(c)$ ($\Phi$ conserve la norme), et comme $K$ est fermé ({@fr:carac-seq-adh}), $\Phi^{-1}(c) \in K$.

**2**　Soit $u : E \to F$ linéaire. Posons $\norm{x}_1 = \sum_i \abs{x_i}$ (norme sur $E$).

1. Par linéarité et inégalité triangulaire, $\norm{u(x)} = \big\|\sum_i x_i u(e_i)\big\| \le \sum_i \abs{x_i}\,\norm{u(e_i)} \le M\norm{x}_1$, où $M = \max_i \norm{u(e_i)}$.
2. D'après le {@fr:equiv-dimfinie}, il existe $c > 0$ tel que $\norm{x}_1 \le c\,N(x)$.
3. Ainsi $\norm{u(x)} \le Mc\,N(x)$, et $u$ est continue d'après le {@fr:lin-continue}.

**3**　Soient $G$ un evn, $F \subset G$ un sous-espace de dimension finie et $(u_k)$ une suite de $F$ telle que $u_k \to a \in G$.

1. Une suite convergente est bornée : il existe $M$ tel que $\norm{u_k} \le M$ pour tout $k$.
2. Posons $K = \{x \in F : \norm{x} \le M\}$. Cette partie est bornée dans $(F, \norm{\cdot})$ ; elle est aussi fermée : si $F \ni x_j \to x \in F$ avec $\norm{x_j} \le M$, alors $\norm{x} = \lim \norm{x_j} \le M$ (point 3 de la {@fr:c1-suites-prop} et passage à la limite dans les inégalités). D'après le point 1 (appliqué à l'espace de dimension finie $F$), $K$ est compacte.
3. $(u_k)$ est une suite de $K$, donc elle admet une suite extraite $u_{\varphi(k)} \to b \in K \subset F$.
4. Par ailleurs $u_{\varphi(k)} \to a$ ({@fr:c1-sous-suite}). Par unicité de la limite, $a = b \in F$.

D'après le {@fr:carac-seq-adh}, $F$ est fermé dans $G$.
:::

最后的问题：无穷维时有界闭集不紧（{@c1-cex-boule-c01}），这是偶然的吗？Riesz 定理说：不是，它**刻画**了无穷维。关键工具是下面的引理（俄文文献称「几乎垂直」引理）。

::: lem id=c1-lemme-riesz zh="Riesz 引理" en="Riesz's lemma" fr="Lemme de Riesz" ru="Лемма Рисса о почти перпендикуляре" lvl=2
设 $F \subsetneq E$ 是闭子空间。则存在 $x \in E$，$\norm{x} = 1$，使 $d(x, F) \ge \frac12$。
:::

::: fr
Soit $F \subsetneq E$ un sous-espace fermé. Il existe $x \in E$ avec $\norm{x} = 1$ et $d(x, F) \ge \frac12$.
:::

::: sketch
▷ 思路：取 $F$ 外的一点 $y$ 及 $F$ 中「几乎最近」的点 $z$，把 $y - z$ 归一化。

1. 取 $y \in E \setminus F$。由 $F$ 闭与 {@c1-dist} 第 2 条，$d = d(y, F) > 0$。
2. $2d > d$ 不是 $\{\norm{y - z'} : z' \in F\}$ 的下界，所以存在 $z \in F$ 使 $\norm{y - z} < 2d$。又 $y - z \ne 0$（$y \notin F$）。
3. 令 $x = \frac{y - z}{\norm{y - z}}$，$\norm{x} = 1$。对 $w \in F$，
   $$\norm{x - w} = \frac{\big\|y - \big(z + \norm{y - z}\,w\big)\big\|}{\norm{y - z}} \ge \frac{d}{\norm{y - z}} > \frac{d}{2d} = \frac12,$$
   因为 $z + \norm{y - z}\,w \in F$（子空间），所以分子 $\ge d(y, F) = d$。
4. 对 $w \in F$ 取下确界，$d(x, F) \ge \frac12$。
:::

::: fr
▷ Méthode : on prend un point $y$ hors de $F$ et un point $z$ de $F$ « presque le plus proche », puis on normalise $y - z$.

1. Soit $y \in E \setminus F$. Comme $F$ est fermé, d'après le point 2 du {@fr:c1-dist}, $d = d(y, F) > 0$.
2. Le réel $2d > d$ n'est pas un minorant de $\{\norm{y - z'} : z' \in F\}$ ; il existe donc $z \in F$ tel que $\norm{y - z} < 2d$. De plus $y - z \ne 0$ (car $y \notin F$).
3. Posons $x = \frac{y - z}{\norm{y - z}}$, de sorte que $\norm{x} = 1$. Pour $w \in F$,
   $$\norm{x - w} = \frac{\big\|y - \big(z + \norm{y - z}\,w\big)\big\|}{\norm{y - z}} \ge \frac{d}{\norm{y - z}} > \frac{d}{2d} = \frac12,$$
   car $z + \norm{y - z}\,w \in F$ (sous-espace), donc le numérateur est $\ge d(y, F) = d$.
4. En passant à la borne inférieure sur $w \in F$, $d(x, F) \ge \frac12$.
:::

::: thm id=riesz zh="Riesz 定理" en="Riesz's theorem" fr="Théorème de Riesz" ru="Теорема Рисса о компактности шара" lvl=2
赋范空间 $E$ 的闭单位球是紧集，当且仅当 $E$ 有限维。
:::

::: fr
La boule unité fermée d'un evn $E$ est compacte si et seulement si $E$ est de dimension finie.
:::

::: sketch
关键是 **Riesz 引理**（{@c1-lemme-riesz}）：若 $F \subsetneq E$ 是闭子空间，则存在单位向量 $x$，使 $d(x, F) \ge \frac12$。若 $E$ 无穷维，归纳地取单位向量 $x_{n+1}$，使它与 $\Vect(x_0, \dots, x_n)$（有限维，所以是闭集）的距离 $\ge \frac12$。数列 $(x_n)$ 两两距离 $\ge \frac12$，没有收敛子列。

**(⇐)**　$E$ 有限维时，$\overline{B}(0, 1)$ 是有界闭集（{@c1-ouverts-stab}），由 {@cor-dimfinie} 第 1 条是紧集。

**(⇒)**　证逆否命题：设 $E$ 无穷维，构造闭单位球中没有收敛子列的数列。

1. $E \ne \{0\}$，取 $x_0$ 使 $\norm{x_0} = 1$。
2. 设已取好单位向量 $x_0, \dots, x_n$。$F_n = \Vect(x_0, \dots, x_n)$ 有限维，由 {@cor-dimfinie} 第 3 条是闭集；$F_n \ne E$（$E$ 无穷维）。由 Riesz 引理，存在 $x_{n+1}$，$\norm{x_{n+1}} = 1$，$d(x_{n+1}, F_n) \ge \frac12$；特别地，对 $m \le n$，$\norm{x_{n+1} - x_m} \ge \frac12$（$x_m \in F_n$）。
3. 于是对一切 $m \ne n$，$\norm{x_n - x_m} \ge \frac12$。反设某个子列 $x_{\varphi(n)} \to a$，取 $N$ 使 $n \ge N$ 时 $\norm{x_{\varphi(n)} - a} < \frac14$，则 $\norm{x_{\varphi(N)} - x_{\varphi(N+1)}} < \frac14 + \frac14 = \frac12$，而 $\varphi(N) \ne \varphi(N+1)$，矛盾。

所以 $(x_n)$ 是闭单位球中没有收敛子列的数列，闭单位球不紧。
:::

::: fr
Le point clé est le **lemme de Riesz** ({@fr:c1-lemme-riesz}) : si $F \subsetneq E$ est un sous-espace fermé, il existe un vecteur unitaire $x$ tel que $d(x, F) \ge \frac12$. Si $E$ est de dimension infinie, on choisit par récurrence un vecteur unitaire $x_{n+1}$ à distance $\ge \frac12$ de $\Vect(x_0, \dots, x_n)$ (de dimension finie, donc fermé). La suite $(x_n)$ a ses termes deux à deux à distance $\ge \frac12$ et n'admet aucune suite extraite convergente.

**(⇐)**　Si $E$ est de dimension finie, $\overline{B}(0, 1)$ est fermée et bornée ({@fr:c1-ouverts-stab}), donc compacte d'après le point 1 du {@fr:cor-dimfinie}.

**(⇒)**　Montrons la contraposée : supposons $E$ de dimension infinie, et construisons une suite de la boule unité fermée sans suite extraite convergente.

1. Comme $E \ne \{0\}$, on choisit $x_0$ tel que $\norm{x_0} = 1$.
2. Supposons construits des vecteurs unitaires $x_0, \dots, x_n$. Le sous-espace $F_n = \Vect(x_0, \dots, x_n)$ est de dimension finie, donc fermé d'après le point 3 du {@fr:cor-dimfinie} ; et $F_n \ne E$ ($E$ est de dimension infinie). D'après le lemme de Riesz, il existe $x_{n+1}$ avec $\norm{x_{n+1}} = 1$ et $d(x_{n+1}, F_n) \ge \frac12$ ; en particulier, pour $m \le n$, $\norm{x_{n+1} - x_m} \ge \frac12$ (car $x_m \in F_n$).
3. Ainsi $\norm{x_n - x_m} \ge \frac12$ pour tous $m \ne n$. Par l'absurde, si une suite extraite vérifiait $x_{\varphi(n)} \to a$, on choisirait $N$ tel que $\norm{x_{\varphi(n)} - a} < \frac14$ pour $n \ge N$ ; alors $\norm{x_{\varphi(N)} - x_{\varphi(N+1)}} < \frac14 + \frac14 = \frac12$, alors que $\varphi(N) \ne \varphi(N+1)$ : contradiction.

La suite $(x_n)$ de la boule unité fermée n'admet donc aucune suite extraite convergente, et cette boule n'est pas compacte.
:::

::: q
设 $(u_n)$ 是 $E$ 中的收敛数列，极限为 $\ell$。证明 $K = \{u_n : n \in \N\} \cup \{\ell\}$ 是紧集。
:::

::: ans
设 $(v_k)$ 是 $K$ 中的数列。

**情形 1：$K$ 中某一点 $c$ 被 $v_k$ 取到无穷多次。** 把集合 $\{k : v_k = c\}$ 的元素从小到大排成 $\psi(0) < \psi(1) < \cdots$，则 $v_{\psi(j)} = c$ 是常数列，收敛到 $c \in K$。

**情形 2：$K$ 的每一点都只被取到有限次。** 特别地，只有有限个 $k$ 使 $v_k = \ell$，取 $k_0$ 使 $k \ge k_0$ 时 $v_k \ne \ell$。对 $k \ge k_0$，$v_k$ 是某个 $u_m$，记 $m(k)$ 为使 $v_k = u_m$ 的最小的 $m$。对每个整数 $M$，集合 $\{k \ge k_0 : m(k) \le M\}$ 是有限集（$u_0, \dots, u_M$ 这有限个点各被取到有限次）。归纳地构造：$\psi(0) = k_0$；已有 $\psi(j)$ 时，集合 $\{k : k \le \psi(j)\} \cup \{k \ge k_0 : m(k) \le m(\psi(j))\}$ 有限，所以存在 $k > \psi(j)$ 使 $m(k) > m(\psi(j))$，取它为 $\psi(j+1)$。于是 $\psi$ 与 $m \circ \psi$ 都严格递增，$v_{\psi(j)} = u_{m(\psi(j))}$ 是 $(u_n)$ 的子列，由 {@c1-sous-suite} 收敛到 $\ell \in K$。

两种情形下 $(v_k)$ 都有收敛到 $K$ 中的点的子列，所以 $K$ 紧。（若去掉 $\ell$，$\{u_n\}$ 一般不紧：例如 $\{\frac{1}{n+1} : n \in \N\}$ 不闭。）
:::

::: q
证明正交群 $O_n(\R) = \{M \in \M_n(\R) : M^{\mathsf T} M = I_n\}$ 是 $\M_n(\R)$ 的紧集。
:::

::: ans
$\M_n(\R)$ 有限维，由 {@cor-dimfinie} 第 1 条，只需证明 $O_n(\R)$ 有界且闭；由 {@equiv-dimfinie}，可以选范数 $\norm{M} = \max_{i,j} \abs{m_{ij}}$。

**闭**：映射 $f : M \mapsto M^{\mathsf T} M$ 的每个系数 $\sum_k m_{ki} m_{kj}$ 是 $M$ 的系数的多项式，所以 $f$ 连续（{@c1-cont-operations} 与 {@c1-produit}：映射到 $\M_n(\R) \simeq \R^{n^2}$ 连续当且仅当每个坐标连续）。单点集 $\{I_n\}$ 是闭集（常数列的极限，{@carac-seq-adh}）。所以 $O_n(\R) = f^{-1}(\{I_n\})$ 是闭集（{@cont-ouverts}）。

**有界**：若 $M^{\mathsf T} M = I_n$，比较对角元得 $\sum_i m_{ij}^2 = 1$（每一列是单位向量），所以 $\abs{m_{ij}} \le 1$，$\norm{M} \le 1$。

所以 $O_n(\R)$ 紧。由 {@image-compact}，$O_n(\R)$ 上的任何实值连续函数（例如 $M \mapsto \tr(AM)$）都取到最大值。
:::

<!-- NEXT -->
