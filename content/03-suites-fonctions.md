函数列的极限可以有多种含义。本章的核心问题是：**极限运算何时可以与连续性、积分、求导交换顺序？** 答案几乎总是「一致收敛」，它就是第 1 章中范数 $\norm{\cdot}_\infty$ 下的收敛。全章 $A$ 是 $\R$（或某个赋范空间）的非空子集，函数取值于 $\K$。

**记号。** 对函数 $g : A \to \K$，记
$$\norm{g}_{\infty, A} = \sup_{x \in A} \abs{g(x)} \in [0, +\infty],$$
不引起混淆时简写为 $\norm{g}_\infty$。$g$ 有界当且仅当 $\norm{g}_{\infty, A} < +\infty$；在有界函数空间 $\mathcal{B}(A, \K)$ 上，$\norm{\cdot}_{\infty, A}$ 是第 1 章意义下的范数。$E(t)$ 表示实数 $t$ 的整数部分（partie entière）。**闭区间段**（segment）指有界闭区间 $[c, d]$（$c \le d$）。

## 逐点收敛与一致收敛

给定一列函数 $f_n : A \to \K$，「$f_n$ 趋于 $f$」至少有两种自然的含义：在每个点分别看数列 $(f_n(x))_n$；或者把 $f_n$ 的整个图像与 $f$ 的图像比较。前者容易验证，但几乎不保持任何性质；后者稍难验证，却保持连续性、积分，并在适当条件下保持导数。

::: def id=def-cv-simple zh="逐点收敛" en="Pointwise convergence" fr="Convergence simple" ru="Поточечная сходимость"
设 $f_n, f : A \to \K$（$n \in \N$）。称 $(f_n)$ 在 $A$ 上**逐点收敛**（也称简单收敛）到 $f$，如果对每个 $x \in A$，数列 $(f_n(x))_n$ 收敛到 $f(x)$：
$$\forall x \in A,\ \forall \eps > 0,\ \exists N \in \N,\ \forall n \ge N,\quad \abs{f_n(x) - f(x)} \le \eps.$$
白话：每个点各自收敛；$N$ 可以依赖于 $x$（也依赖于 $\eps$），记作 $N = N(x, \eps)$。$f$ 称为 $(f_n)$ 的**逐点极限**；由数列极限的唯一性，它是唯一的。
:::

::: fr
Soient $f_n, f : A \to \K$ ($n \in \N$). On dit que $(f_n)$ **converge simplement** vers $f$ sur $A$ si, pour tout $x \in A$, la suite $(f_n(x))_n$ converge vers $f(x)$ :
$$\forall x \in A,\ \forall \eps > 0,\ \exists N \in \N,\ \forall n \ge N,\quad \abs{f_n(x) - f(x)} \le \eps.$$
Autrement dit, la convergence a lieu point par point ; l'entier $N$ peut dépendre de $x$ (et de $\eps$) : on le note $N = N(x, \eps)$. La fonction $f$ est appelée **limite simple** de $(f_n)$ ; elle est unique, par unicité de la limite d'une suite.
:::

::: ex id=c3-ex-simple lvl=1
1. **满足定义**：$f_n(x) = \big(1 + \frac xn\big)^n$ 在 $\R$ 上逐点收敛到 $\e^x$。固定 $x \in \R$。若 $x = 0$，$f_n(0) = 1 = \e^0$。若 $x \ne 0$，当 $n > \abs{x}$ 时 $1 + \frac xn > 0$，可以写
   $$f_n(x) = \exp\Big(n \ln\Big(1 + \frac xn\Big)\Big).$$
   由 $\ln(1 + u) \sim u$（$u \to 0$），$n \ln(1 + \frac xn) \sim n \cdot \frac xn = x$，即 $n\ln(1 + \frac xn) \to x$；再由 $\exp$ 的连续性，$f_n(x) \to \e^x$。注意这里至少要 $n > \abs{x}$ 才能写出上式：$N$ 确实依赖于 $x$。
2. **不满足定义**：$f_n(x) = x^n$ 在 $[-1, 1]$ 上**不**逐点收敛，因为在 $x = -1$ 处 $f_n(-1) = (-1)^n$ 发散。去掉这一点，在 $]-1, 1]$ 上它逐点收敛到 $\mathbf{1}_{\{1\}}$：$\abs{x} < 1$ 时 $x^n \to 0$，$x = 1$ 时 $x^n = 1$。
:::

::: def id=def-cv-unif zh="一致收敛" en="Uniform convergence" fr="Convergence uniforme" ru="Равномерная сходимость"
设 $f_n, f : A \to \K$。称 $(f_n)$ 在 $A$ 上**一致收敛**到 $f$，如果
$$\forall \eps > 0,\ \exists N \in \N,\ \forall n \ge N,\ \forall x \in A,\quad \abs{f_n(x) - f(x)} \le \eps,$$
等价地，
$$\norm{f_n - f}_{\infty, A} = \sup_{x \in A} \abs{f_n(x) - f(x)} \xrightarrow[n \to \infty]{} 0.$$
白话：$N$ 只依赖于 $\eps$，不依赖于 $x$。实值情形下，$n \ge N$ 时 $f_n$ 的整个图像落在以 $f$ 的图像为中心、半宽为 $\eps$ 的「管道」$\{(x, y) : \abs{y - f(x)} \le \eps\}$ 里。
:::

::: fr
Soient $f_n, f : A \to \K$. On dit que $(f_n)$ **converge uniformément** vers $f$ sur $A$ si
$$\forall \eps > 0,\ \exists N \in \N,\ \forall n \ge N,\ \forall x \in A,\quad \abs{f_n(x) - f(x)} \le \eps,$$
ce qui équivaut à
$$\norm{f_n - f}_{\infty, A} = \sup_{x \in A} \abs{f_n(x) - f(x)} \xrightarrow[n \to \infty]{} 0.$$
Autrement dit, $N$ ne dépend que de $\eps$, et pas de $x$. Dans le cas réel, pour $n \ge N$, tout le graphe de $f_n$ est contenu dans le « tube » $\{(x, y) : \abs{y - f(x)} \le \eps\}$ de demi-largeur $\eps$ autour du graphe de $f$.
:::

::: rem
1. **唯一的区别是量词顺序。** 逐点：$\forall x\ \forall \eps\ \exists N$；一致：$\forall \eps\ \exists N\ \forall x$。把 $\forall x$ 移到 $\exists N$ 之后，就要求同一个 $N$ 对所有 $x$ 都有效。
2. **两种写法等价。** 对固定的 $n$，「对一切 $x \in A$，$\abs{f_n(x) - f(x)} \le \eps$」正是说「$\eps$ 是集合 $\{\abs{f_n(x) - f(x)} : x \in A\}$ 的一个上界」，也就是 $\norm{f_n - f}_{\infty, A} \le \eps$（上确界是最小上界）。注意 $f_n - f$ 可以无界，这时 $\norm{f_n - f}_{\infty, A} = +\infty$；定义只要求 $n$ 充分大时它有限并趋于 $0$。
3. **与第 1 章的联系。** 当 $A = [a, b]$ 且 $f_n, f$ 都连续时，一致收敛就是在 Banach 空间 $(\Cc([a,b]), \norm{\cdot}_\infty)$（{@c0-complet}）中的收敛。
:::

::: prop id=c3-unif-simple zh="一致收敛蕴含逐点收敛" en="Uniform convergence implies pointwise convergence" fr="La convergence uniforme entraîne la convergence simple" ru="Из равномерной сходимости следует поточечная" lvl=1
若 $(f_n)$ 在 $A$ 上一致收敛到 $f$，则 $(f_n)$ 在 $A$ 上逐点收敛到 $f$。因此，一致极限如果存在，必定等于逐点极限。
:::

::: fr
Si $(f_n)$ converge uniformément vers $f$ sur $A$, alors $(f_n)$ converge simplement vers $f$ sur $A$. Par conséquent, si une limite uniforme existe, elle est égale à la limite simple.
:::

::: proof
▷ 思路：一致收敛给出的 $N$ 对所有 $x$ 都有效，当然对某个固定的 $x$ 也有效。

**第 1 步（翻译假设）**　固定 $x_0 \in A$ 与 $\eps > 0$。由一致收敛的定义（{@def-cv-unif}），存在 $N \in \N$，使对一切 $n \ge N$ 与一切 $x \in A$，$\abs{f_n(x) - f(x)} \le \eps$。

**第 2 步（取 $x = x_0$）**　特别地，对一切 $n \ge N$，$\abs{f_n(x_0) - f(x_0)} \le \eps$。这正是 $f_n(x_0) \to f(x_0)$ 的定义。$x_0 \in A$ 是任意的，所以 $(f_n)$ 逐点收敛到 $f$。

**第 3 步（唯一性）**　设 $(f_n)$ 一致收敛到 $f$，又逐点收敛到 $g$。由第 2 步，它也逐点收敛到 $f$；对每个 $x$，数列 $(f_n(x))$ 的极限唯一，所以 $f(x) = g(x)$。

这就证明了一致极限存在时等于逐点极限。
:::

::: fr
▷ Méthode : l'entier $N$ fourni par la convergence uniforme convient pour tous les $x$, donc en particulier pour un $x$ fixé.

**Étape 1 (on traduit l'hypothèse)**　Fixons $x_0 \in A$ et $\eps > 0$. Par définition de la convergence uniforme ({@fr:def-cv-unif}), il existe $N \in \N$ tel que pour tout $n \ge N$ et tout $x \in A$, $\abs{f_n(x) - f(x)} \le \eps$.

**Étape 2 (on prend $x = x_0$)**　En particulier, pour tout $n \ge N$, $\abs{f_n(x_0) - f(x_0)} \le \eps$. C'est exactement la définition de $f_n(x_0) \to f(x_0)$. Comme $x_0 \in A$ est quelconque, $(f_n)$ converge simplement vers $f$.

**Étape 3 (unicité)**　Supposons que $(f_n)$ converge uniformément vers $f$ et simplement vers $g$. D'après l'étape 2, elle converge aussi simplement vers $f$ ; pour tout $x$, la limite de la suite $(f_n(x))$ est unique, donc $f(x) = g(x)$.

Ceci montre que la limite uniforme, lorsqu'elle existe, coïncide avec la limite simple.
:::

由此得到判断一致收敛的标准步骤：**先求逐点极限 $f$**（唯一可能的一致极限），**再估计 $\sup_{x \in A} \abs{f_n(x) - f(x)}$**。

::: ex id=c3-ex-unif lvl=1
1. **一致收敛**：$f_n(x) = x^n(1 - x)$，$A = [0, 1]$。
   - 逐点极限：$x \in [0, 1[$ 时 $x^n \to 0$，所以 $f_n(x) \to 0$；$x = 1$ 时 $f_n(1) = 0$。所以 $f = 0$。
   - 求上确界：$f_n \ge 0$，且对 $n \ge 1$，$f_n'(x) = x^{n-1}\big(n - (n+1)x\big)$。记 $x_n = \frac{n}{n+1}$，则 $f_n' \ge 0$ 于 $[0, x_n]$，$f_n' \le 0$ 于 $[x_n, 1]$，所以 $f_n$ 在 $x_n$ 处取最大值：
     $$\norm{f_n - 0}_{\infty, [0,1]} = f_n(x_n) = \Big(\frac{n}{n+1}\Big)^n \frac{1}{n+1} \le \frac{1}{n+1} \xrightarrow[n \to \infty]{} 0.$$
   - 结论：一致收敛。具体地，给定 $\eps > 0$，令 $N = E(1/\eps)$，则 $N + 1 > 1/\eps$，于是 $n \ge N$ 时 $\norm{f_n}_\infty \le \frac{1}{n+1} \le \frac{1}{N+1} < \eps$。
2. **不一致收敛**：$g_n(x) = \frac xn$，$A = \R$。逐点极限为 $0$（固定 $x$，$\abs{x}/n \to 0$），但对每个 $n$，$\sup_{x \in \R} \abs{x}/n = +\infty$，所以在 $\R$ 上不一致收敛。逐点收敛所需的 $N(x, \eps) = E(\abs{x}/\eps) + 1$ 随 $\abs{x}$ 无界增长，找不到对所有 $x$ 都有效的 $N$。在有界区间 $[-M, M]$ 上，$\sup_{\abs{x} \le M} \abs{g_n(x)} = M/n \to 0$，一致收敛。
:::

::: ex id=ex-xn lvl=1
$f_n(x) = x^n$ 在 $[0,1]$ 上逐点收敛到 $f = \mathbf{1}_{\{1\}}$，但不一致收敛；在 $[0, a]$（$0 \le a < 1$）上一致收敛。

- **在 $[0, 1]$ 上**：对 $n \ge 1$，$\abs{f_n(x) - f(x)}$ 在 $x \in [0, 1[$ 时等于 $x^n$，在 $x = 1$ 时等于 $0$。所以
  $$\norm{f_n - f}_{\infty, [0,1]} = \sup_{x \in [0,1[} x^n = 1,$$
  因为 $x^n < 1$ 且 $x^n \to 1$（$x \to 1^-$）：上确界是 $1$ 但取不到。它不趋于 $0$，收敛不一致。
- **在 $[0, a]$ 上**：$f = 0$，$\sup_{[0,a]} x^n = a^n \to 0$，一致收敛。具体地，对 $\eps \in \left]0, 1\right[$ 与 $0 < a < 1$，$a^n \le \eps \iff n \ge \frac{\ln \eps}{\ln a}$，可取 $N = E\big(\frac{\ln \eps}{\ln a}\big) + 1$（$a = 0$ 时 $N = 1$）。
- **对照**：在 $x \in \left]0, 1\right[$ 处，逐点收敛所需的 $N(x, \eps) = E\big(\frac{\ln \eps}{\ln x}\big) + 1$ 在 $x \to 1^-$ 时趋于 $+\infty$。这就是 $[0, 1]$ 上不一致的原因：「坏点」聚集在 $x = 1$ 附近。
:::

::: prop id=c3-carac-unif zh="一致收敛的实用判别" en="Practical criteria for uniform convergence" fr="Critères pratiques de convergence uniforme" ru="Практические признаки равномерной сходимости" lvl=1
设 $f_n, f : A \to \K$。

1. **（与 $x$ 无关的上界）** 若存在实数列 $(\alpha_n)$ 与 $N_0 \in \N$，使 $\alpha_n \to 0$，且对一切 $n \ge N_0$ 与一切 $x \in A$，$\abs{f_n(x) - f(x)} \le \alpha_n$，则 $(f_n)$ 在 $A$ 上一致收敛到 $f$。
2. **（点列判别）** $(f_n)$ 在 $A$ 上一致收敛到 $f$，当且仅当对 $A$ 中任意点列 $(x_n)$，$f_n(x_n) - f(x_n) \to 0$。特别地，若存在点列 $(x_n) \in A^\N$ 使 $f_n(x_n) - f(x_n) \not\to 0$，则收敛不一致。
:::

::: fr
Soient $f_n, f : A \to \K$.

1. **(Majoration indépendante de $x$)** S'il existe une suite réelle $(\alpha_n)$ et $N_0 \in \N$ tels que $\alpha_n \to 0$ et, pour tout $n \ge N_0$ et tout $x \in A$, $\abs{f_n(x) - f(x)} \le \alpha_n$, alors $(f_n)$ converge uniformément vers $f$ sur $A$.
2. **(Critère séquentiel)** $(f_n)$ converge uniformément vers $f$ sur $A$ si et seulement si, pour toute suite $(x_n)$ de points de $A$, $f_n(x_n) - f(x_n) \to 0$. En particulier, s'il existe $(x_n) \in A^\N$ telle que $f_n(x_n) - f(x_n) \not\to 0$, la convergence n'est pas uniforme.
:::

::: proof
▷ 思路：第 1 条是把难算的上确界换成一个更大、但好算的数 $\alpha_n$。第 2 条的 (⇐) 用逆否命题：如果收敛不一致，就把每个 $n$ 的「坏点」挑出来，排成一个点列。

**1.**　设 $\eps > 0$。由 $\alpha_n \to 0$，存在 $N_1$，使对一切 $n \ge N_1$，$\alpha_n \le \eps$。令 $N = \max(N_0, N_1)$。对一切 $n \ge N$ 与一切 $x \in A$，
$$\abs{f_n(x) - f(x)} \le \alpha_n \le \eps \qquad (n \ge N_0 \text{ 与 } n \ge N_1).$$
这正是一致收敛的定义（{@def-cv-unif}）。

**2. (⇒)**　设 $(f_n)$ 一致收敛到 $f$，$(x_n)$ 是 $A$ 中任一点列，$\eps > 0$。由定义，存在 $N$，使对一切 $n \ge N$ 与一切 $x \in A$，$\abs{f_n(x) - f(x)} \le \eps$。对每个 $n \ge N$ 取 $x = x_n$，得 $\abs{f_n(x_n) - f(x_n)} \le \eps$。所以 $f_n(x_n) - f(x_n) \to 0$。

**(⇐)**　用逆否命题：设 $(f_n)$ 不一致收敛到 $f$，我们构造一个点列使 $f_n(x_n) - f(x_n) \not\to 0$。

1. 否定定义：存在 $\eps_0 > 0$，使对一切 $N \in \N$，存在 $n \ge N$ 与 $x \in A$，$\abs{f_n(x) - f(x)} > \eps_0$。
2. 令 $I = \{n \in \N : \exists x \in A,\ \abs{f_n(x) - f(x)} > \eps_0\}$。由第 1 点，$I$ 中有任意大的元素，所以 $I$ 是无限集。
3. 对 $n \in I$，取 $x_n \in A$ 使 $\abs{f_n(x_n) - f(x_n)} > \eps_0$；对 $n \notin I$，任取 $x_n \in A$（$A$ 非空）。
4. 于是对无穷多个 $n$（所有 $n \in I$），$\abs{f_n(x_n) - f(x_n)} > \eps_0$，所以 $f_n(x_n) - f(x_n)$ 不趋于 $0$。

两个方向都已证明。
:::

::: fr
▷ Méthode : le point 1 remplace une borne supérieure difficile à calculer par un majorant $\alpha_n$ plus grand mais plus simple. Pour le sens (⇐) du point 2, on raisonne par contraposée : si la convergence n'est pas uniforme, on choisit pour chaque $n$ un « mauvais point » et on en fait une suite.

**1.**　Soit $\eps > 0$. Comme $\alpha_n \to 0$, il existe $N_1$ tel que pour tout $n \ge N_1$, $\alpha_n \le \eps$. Posons $N = \max(N_0, N_1)$. Pour tout $n \ge N$ et tout $x \in A$,
$$\abs{f_n(x) - f(x)} \le \alpha_n \le \eps \qquad (n \ge N_0 \text{ et } n \ge N_1).$$
C'est exactement la définition de la convergence uniforme ({@fr:def-cv-unif}).

**2. (⇒)**　Supposons que $(f_n)$ converge uniformément vers $f$ ; soient $(x_n)$ une suite de points de $A$ et $\eps > 0$. Par définition, il existe $N$ tel que pour tout $n \ge N$ et tout $x \in A$, $\abs{f_n(x) - f(x)} \le \eps$. Pour chaque $n \ge N$, on prend $x = x_n$ : $\abs{f_n(x_n) - f(x_n)} \le \eps$. Donc $f_n(x_n) - f(x_n) \to 0$.

**(⇐)**　Par contraposée : supposons que $(f_n)$ ne converge pas uniformément vers $f$ ; construisons une suite telle que $f_n(x_n) - f(x_n) \not\to 0$.

1. On nie la définition : il existe $\eps_0 > 0$ tel que pour tout $N \in \N$, il existe $n \ge N$ et $x \in A$ avec $\abs{f_n(x) - f(x)} > \eps_0$.
2. Posons $I = \{n \in \N : \exists x \in A,\ \abs{f_n(x) - f(x)} > \eps_0\}$. D'après le point 1, $I$ contient des éléments arbitrairement grands : $I$ est infini.
3. Pour $n \in I$, choisissons $x_n \in A$ tel que $\abs{f_n(x_n) - f(x_n)} > \eps_0$ ; pour $n \notin I$, choisissons $x_n \in A$ quelconque ($A$ est non vide).
4. Alors $\abs{f_n(x_n) - f(x_n)} > \eps_0$ pour une infinité d'entiers $n$ (tous les $n \in I$), donc $f_n(x_n) - f(x_n)$ ne tend pas vers $0$.

Les deux sens sont démontrés.
:::

::: rem
**用法。** 证明一致收敛时，找一个与 $x$ 无关的上界 $\alpha_n \to 0$（第 1 条）；否定一致收敛时，猜一个「坏点」列 $x_n$（通常是 $\abs{f_n - f}$ 的最大值点附近）。例如 {@ex-xn} 中取 $x_n = 1 - \frac1n$（$n \ge 1$）：
$$f_n(x_n) - f(x_n) = \Big(1 - \frac1n\Big)^n = \exp\Big(n \ln\Big(1 - \frac1n\Big)\Big) \xrightarrow[n \to \infty]{} \e^{-1} \ne 0,$$
所以 $x^n$ 在 $[0, 1[$ 上不一致收敛到 $0$——不用算上确界就得到了结论。
:::

::: demo id=uniform
选择函数列，拖动 $n$ 与 $\eps$。绿色带是极限函数 $f$ 周围宽为 $\eps$ 的「管道」。一致收敛等价于：对任意 $\eps$，$n$ 足够大时 $f_n$ 的整个图像都落在管道内。红色线段标出 $\abs{f_n - f}$ 取最大值的位置。
:::

当极限函数未知时（典型情形是函数项级数的和），需要一个只涉及 $f_n$ 本身的判据。

::: prop id=cauchy-unif zh="一致收敛的 Cauchy 准则" en="Uniform Cauchy criterion" fr="Critère de Cauchy uniforme" ru="Критерий Коши равномерной сходимости" lvl=1
设 $f_n : A \to \K$。$(f_n)$ 在 $A$ 上一致收敛（到某个函数 $f : A \to \K$），当且仅当
$$\forall \eps > 0,\ \exists N \in \N,\ \forall p, q \ge N,\ \forall x \in A,\quad \abs{f_p(x) - f_q(x)} \le \eps,$$
即 $\forall \eps > 0$，$\exists N$，$\forall p, q \ge N$，$\norm{f_p - f_q}_{\infty, A} \le \eps$。
:::

::: fr
Soit $f_n : A \to \K$. La suite $(f_n)$ converge uniformément sur $A$ (vers une certaine fonction $f : A \to \K$) si et seulement si
$$\forall \eps > 0,\ \exists N \in \N,\ \forall p, q \ge N,\ \forall x \in A,\quad \abs{f_p(x) - f_q(x)} \le \eps,$$
c'est-à-dire $\forall \eps > 0$, $\exists N$, $\forall p, q \ge N$, $\norm{f_p - f_q}_{\infty, A} \le \eps$.
:::

::: proof
▷ 思路：(⇒) 用三角不等式，把 $f_p - f_q$ 拆成 $(f_p - f) + (f - f_q)$。(⇐) 分两步：先用 $\K$ 的完备性在每一点得到极限 $f(x)$，再在 Cauchy 不等式中令 $q \to \infty$，得到一个与 $x$ 无关的估计。这一论证与 {@c0-complet} 相同。

**(⇒)**　设 $(f_n)$ 一致收敛到 $f$，$\eps > 0$。由定义，存在 $N$，使对一切 $n \ge N$ 与一切 $x \in A$，$\abs{f_n(x) - f(x)} \le \eps/2$。于是对 $p, q \ge N$ 与 $x \in A$：
$$\begin{aligned}
\abs{f_p(x) - f_q(x)} &\le \abs{f_p(x) - f(x)} + \abs{f(x) - f_q(x)} && \text{（三角不等式）}\\
&\le \tfrac{\eps}{2} + \tfrac{\eps}{2} = \eps && \text{（} p \ge N,\ q \ge N \text{）。}
\end{aligned}$$

**(⇐)**

**第 1 步（构造逐点极限）**　固定 $x \in A$。由假设，对任意 $\eps > 0$，存在 $N$，使 $p, q \ge N$ 时 $\abs{f_p(x) - f_q(x)} \le \eps$：数列 $(f_n(x))_n$ 是 $\K$ 中的 Cauchy 列。$\K$ 完备，所以它收敛；记其极限为 $f(x)$。这样定义了 $f : A \to \K$，且 $(f_n)$ 逐点收敛到 $f$。

**第 2 步（翻译假设）**　设 $\eps > 0$。由假设，存在 $N$，使对一切 $p, q \ge N$ 与一切 $x \in A$，$\abs{f_p(x) - f_q(x)} \le \eps$。

**第 3 步（令 $q \to \infty$）**　固定 $p \ge N$ 与 $x \in A$。对一切 $q \ge N$，$\abs{f_p(x) - f_q(x)} \le \eps$。令 $q \to \infty$：$f_q(x) \to f(x)$（第 1 步），$\abs{\cdot}$ 连续，而非严格不等式（$\le$）在取极限时保持，所以
$$\abs{f_p(x) - f(x)} \le \eps.$$

**第 4 步（一致性）**　第 3 步中的 $N$ 来自第 2 步，与 $x$ 无关。所以：对一切 $p \ge N$ 与一切 $x \in A$，$\abs{f_p(x) - f(x)} \le \eps$。

这正是 $(f_n)$ 在 $A$ 上一致收敛到 $f$。
:::

::: fr
▷ Méthode : pour (⇒), on utilise l'inégalité triangulaire en écrivant $f_p - f_q = (f_p - f) + (f - f_q)$. Pour (⇐), on procède en deux temps : la complétude de $\K$ fournit en chaque point une limite $f(x)$, puis on fait $q \to \infty$ dans l'inégalité de Cauchy pour obtenir une estimation indépendante de $x$. L'argument est le même que dans {@fr:c0-complet}.

**(⇒)**　Supposons que $(f_n)$ converge uniformément vers $f$ et soit $\eps > 0$. Par définition, il existe $N$ tel que pour tout $n \ge N$ et tout $x \in A$, $\abs{f_n(x) - f(x)} \le \eps/2$. Alors, pour $p, q \ge N$ et $x \in A$ :
$$\begin{aligned}
\abs{f_p(x) - f_q(x)} &\le \abs{f_p(x) - f(x)} + \abs{f(x) - f_q(x)} && \text{(inégalité triangulaire)}\\
&\le \tfrac{\eps}{2} + \tfrac{\eps}{2} = \eps && (p \ge N,\ q \ge N).
\end{aligned}$$

**(⇐)**

**Étape 1 (construction de la limite simple)**　Fixons $x \in A$. Par hypothèse, pour tout $\eps > 0$ il existe $N$ tel que $\abs{f_p(x) - f_q(x)} \le \eps$ pour $p, q \ge N$ : la suite $(f_n(x))_n$ est de Cauchy dans $\K$. Comme $\K$ est complet, elle converge ; notons $f(x)$ sa limite. On définit ainsi $f : A \to \K$, et $(f_n)$ converge simplement vers $f$.

**Étape 2 (on traduit l'hypothèse)**　Soit $\eps > 0$. Par hypothèse, il existe $N$ tel que pour tous $p, q \ge N$ et tout $x \in A$, $\abs{f_p(x) - f_q(x)} \le \eps$.

**Étape 3 (on fait $q \to \infty$)**　Fixons $p \ge N$ et $x \in A$. Pour tout $q \ge N$, $\abs{f_p(x) - f_q(x)} \le \eps$. Faisons tendre $q$ vers $+\infty$ : $f_q(x) \to f(x)$ (étape 1), $\abs{\cdot}$ est continue et les inégalités larges passent à la limite, d'où
$$\abs{f_p(x) - f(x)} \le \eps.$$

**Étape 4 (uniformité)**　L'entier $N$ de l'étape 3 provient de l'étape 2 et ne dépend pas de $x$. Ainsi, pour tout $p \ge N$ et tout $x \in A$, $\abs{f_p(x) - f(x)} \le \eps$.

C'est exactement dire que $(f_n)$ converge uniformément vers $f$ sur $A$.
:::

::: rem
Cauchy 准则的价值在于：**不必知道极限是什么**就能证明一致收敛。这正是函数项级数（第 4 节）的情形：和函数一般没有显式表达式。证明中只用到了值域 $\K$ 的完备性，所以对取值于任一 Banach 空间的函数同样成立。
:::

::: q
设 $(f_n)$ 在 $A$ 上和在 $B$ 上都一致收敛到 $f$。它在 $A \cup B$ 上一致收敛吗？如果 $(f_n)$ 在无穷多个集合 $A_1, A_2, \dots$ 的每一个上都一致收敛到 $f$，在 $\bigcup_k A_k$ 上呢？
:::

::: ans
有限并：是。给定 $\eps$，取 $A$ 上的 $N_A$ 与 $B$ 上的 $N_B$，令 $N = \max(N_A, N_B)$，则 $n \ge N$ 时对 $A \cup B$ 中每一点都有 $\abs{f_n(x) - f(x)} \le \eps$。

可数并：不一定。$f_n(x) = x^n$ 在每个 $A_k = [0, 1 - \frac1k]$ 上一致收敛到 $0$（{@ex-xn}），但在 $\bigcup_k A_k = [0, 1[$ 上不一致收敛。问题在于 $\max(N_{A_1}, N_{A_2}, \dots)$ 可能是 $+\infty$。
:::

::: q
$f_n(x) = \dfrac{nx}{1 + n^2x^2}$ 在 $[0, 1]$ 上一致收敛吗？在 $[a, 1]$（$0 < a < 1$）上呢？
:::

::: ans
逐点极限：$f_n(0) = 0$；$x > 0$ 时 $f_n(x) \le \frac{nx}{n^2x^2} = \frac{1}{nx} \to 0$。所以 $f = 0$。

在 $[0, 1]$ 上不一致：取 $x_n = \frac1n$，$f_n(x_n) = \frac{1}{1 + 1} = \frac12 \not\to 0$（{@c3-carac-unif} 第 2 条）。

在 $[a, 1]$ 上一致：对 $x \in [a, 1]$，$0 \le f_n(x) \le \frac{1}{nx} \le \frac{1}{na}$，上界与 $x$ 无关且趋于 $0$（{@c3-carac-unif} 第 1 条）。
:::

## 一致极限的连续性与二重极限

{@ex-xn} 中每个 $x^n$ 都连续，逐点极限却在 $1$ 处跳跃。这一节说明：一致收敛恰好能阻止这种情况，并且更一般地允许交换两个极限。

::: thm id=cont-limite-unif zh="一致极限的连续性" en="Uniform limit theorem" fr="Continuité de la limite uniforme" ru="Непрерывность равномерного предела" lvl=1
设 $a \in A$，每个 $f_n : A \to \K$ 在 $a$ 处连续，且 $(f_n)$ 在 $A$ 上一致收敛到 $f$。则 $f$ 在 $a$ 处连续。因此，连续函数的一致极限是连续函数。
:::

::: fr
Soit $a \in A$. On suppose que chaque $f_n : A \to \K$ est continue en $a$ et que $(f_n)$ converge uniformément vers $f$ sur $A$. Alors $f$ est continue en $a$. En particulier, une limite uniforme de fonctions continues est continue.
:::

::: proof
▷ 思路（$\eps/3$ 论证）：用**一个固定的** $f_N$ 在整个 $A$ 上一致地逼近 $f$，再利用这一个 $f_N$ 在 $a$ 处的连续性。

▷ 我们要证：对任意 $\eps > 0$，存在 $\delta > 0$，使对一切 $x \in A$，$\abs{x - a} < \delta \Rightarrow \abs{f(x) - f(a)} \le \eps$（$A$ 在赋范空间中时把 $\abs{x - a}$ 换成 $\norm{x - a}$）。

设 $\eps > 0$。

**第 1 步（翻译一致收敛）**　由 {@def-cv-unif}，存在 $N$，使对一切 $n \ge N$ 与一切 $x \in A$，$\abs{f_n(x) - f(x)} \le \eps/3$。从现在起固定 $n = N$。

**第 2 步（翻译 $f_N$ 在 $a$ 处连续）**　存在 $\delta > 0$，使对一切 $x \in A$，$\abs{x - a} < \delta \Rightarrow \abs{f_N(x) - f_N(a)} \le \eps/3$。

**第 3 步（三角不等式）**　设 $x \in A$，$\abs{x - a} < \delta$。则
$$\begin{aligned}
\abs{f(x) - f(a)} &\le \abs{f(x) - f_N(x)} + \abs{f_N(x) - f_N(a)} + \abs{f_N(a) - f(a)} && \text{（三角不等式）}\\
&\le \tfrac\eps3 + \tfrac\eps3 + \tfrac\eps3 = \eps && \text{（第 1 步用于 } x \text{ 与 } a \text{；第 2 步）。}
\end{aligned}$$

这就证明了 $f$ 在 $a$ 处连续。若每个 $f_n$ 在 $A$ 上处处连续，对每个 $a \in A$ 应用上述结论，得 $f$ 在 $A$ 上连续。
:::

::: fr
▷ Méthode (argument en $\eps/3$) : on approche $f$ uniformément sur $A$ par **une seule** fonction $f_N$, puis on utilise la continuité de cette $f_N$ en $a$.

▷ On veut montrer : pour tout $\eps > 0$, il existe $\delta > 0$ tel que pour tout $x \in A$, $\abs{x - a} < \delta \Rightarrow \abs{f(x) - f(a)} \le \eps$ (on remplace $\abs{x - a}$ par $\norm{x - a}$ si $A$ est une partie d'un espace vectoriel normé).

Soit $\eps > 0$.

**Étape 1 (on traduit la convergence uniforme)**　D'après {@fr:def-cv-unif}, il existe $N$ tel que pour tout $n \ge N$ et tout $x \in A$, $\abs{f_n(x) - f(x)} \le \eps/3$. On fixe désormais $n = N$.

**Étape 2 (on traduit la continuité de $f_N$ en $a$)**　Il existe $\delta > 0$ tel que pour tout $x \in A$, $\abs{x - a} < \delta \Rightarrow \abs{f_N(x) - f_N(a)} \le \eps/3$.

**Étape 3 (inégalité triangulaire)**　Soit $x \in A$ avec $\abs{x - a} < \delta$. Alors
$$\begin{aligned}
\abs{f(x) - f(a)} &\le \abs{f(x) - f_N(x)} + \abs{f_N(x) - f_N(a)} + \abs{f_N(a) - f(a)} && \text{(inégalité triangulaire)}\\
&\le \tfrac\eps3 + \tfrac\eps3 + \tfrac\eps3 = \eps && \text{(étape 1 en } x \text{ et en } a \text{ ; étape 2).}
\end{aligned}$$

Ceci montre que $f$ est continue en $a$. Si chaque $f_n$ est continue sur $A$, on applique ce résultat en tout point $a \in A$ : $f$ est continue sur $A$.
:::

::: rem
**一致性用在了哪里？** 第 3 步的第一项 $\abs{f(x) - f_N(x)}$ 中，$x$ 是 $a$ 附近的**任意**点，而 $N$ 必须在选 $\delta$ 之前固定（$\delta$ 依赖于 $f_N$）。若只有逐点收敛，$N$ 会依赖于 $x$，就不能先固定 $N$ 再选 $\delta$。{@ex-xn} 说明这不是证明技巧的问题，而是结论本身会失败。
:::

::: cex id=c3-cex-discontinue lvl=1
{@ex-xn} 说明：连续函数的逐点极限可以不连续。反过来，{@cont-limite-unif} 的逆否命题给出一个实用判据：**若每个 $f_n$ 连续，而逐点极限 $f$ 不连续，则收敛不一致。**

例：$f_n(x) = \Arctan(nx)$ 在 $\R$ 上逐点收敛到
$$f(x) = \begin{cases} \pi/2, & x > 0,\\ 0, & x = 0,\\ -\pi/2, & x < 0,\end{cases}$$
（$x > 0$ 时 $nx \to +\infty$，$x < 0$ 时 $nx \to -\infty$）。$f$ 在 $0$ 处不连续，所以在 $\R$ 上收敛不一致。

**判据的逆命题不成立**：极限连续并不推出一致收敛。在 $]0, +\infty[$ 上，同一个函数列的极限 $f = \pi/2$ 是连续的，但取 $x_n = \frac1n$，$f_n(x_n) - f(x_n) = \Arctan 1 - \frac\pi2 = -\frac\pi4 \not\to 0$，由 {@c3-carac-unif}，收敛仍不一致。
:::

::: cor id=c3-cont-segments zh="在每个闭区间段上一致收敛就够了" en="Uniform convergence on every compact subinterval preserves continuity" fr="Convergence uniforme sur tout segment et continuité" ru="Равномерная сходимость на каждом отрезке сохраняет непрерывность" lvl=1
设 $I$ 是 $\R$ 的区间，$f_n \in \Cc(I, \K)$，且 $(f_n)$ 在 $I$ 的每个闭区间段 $[c, d] \subset I$ 上一致收敛到 $f$。则 $f \in \Cc(I, \K)$。
:::

::: fr
Soient $I$ un intervalle de $\R$ et $f_n \in \Cc(I, \K)$. Si $(f_n)$ converge uniformément vers $f$ sur tout segment $[c, d] \subset I$, alors $f \in \Cc(I, \K)$.
:::

::: proof
▷ 思路：连续性是局部性质。要证 $f$ 在 $a$ 处连续，只需看 $f$ 在 $a$ 附近的值；在 $I$ 中找一个闭区间段 $J$，它包含 $I$ 在 $a$ 附近的所有点，在 $J$ 上用 {@cont-limite-unif}。

若 $I$ 只含一个点，单点集上的函数都连续，无需证明。设 $I$ 不止一个点，固定 $a \in I$ 与 $\eps > 0$。

**第 1 步（选闭区间段）**　存在 $\eta > 0$ 与闭区间段 $J \subset I$，使
$$I \cap \left]a - \eta, a + \eta\right[ \subset J.$$
**情形 1**：$a$ 是 $I$ 的内点。取 $\eta > 0$ 使 $[a - \eta, a + \eta] \subset I$，令 $J = [a - \eta, a + \eta]$。
**情形 2**：$a = \min I$。因 $I$ 不止一个点，存在 $b \in I$，$b > a$；令 $\eta = b - a$，$J = [a, b] \subset I$（$I$ 是区间）。此时 $I \cap \left]a - \eta, a + \eta\right[ = [a, b[ \subset J$。
**情形 3**：$a = \max I$。把情形 2 左右对调：取 $b \in I$，$b < a$，令 $\eta = a - b$，$J = [b, a]$。

**第 2 步（在 $J$ 上用定理）**　由假设，$(f_n|_J)$ 在 $J$ 上一致收敛到 $f|_J$，且每个 $f_n|_J$ 在 $a$ 处连续。由 {@cont-limite-unif}，$f|_J$ 在 $a$ 处连续：存在 $\delta > 0$，使对一切 $x \in J$，$\abs{x - a} < \delta \Rightarrow \abs{f(x) - f(a)} \le \eps$。

**第 3 步（回到 $I$）**　令 $\delta' = \min(\delta, \eta)$。若 $x \in I$ 且 $\abs{x - a} < \delta'$，则 $x \in I \cap \left]a - \eta, a + \eta\right[ \subset J$（第 1 步），于是 $\abs{f(x) - f(a)} \le \eps$（第 2 步）。

所以 $f$ 在 $a$ 处连续。$a \in I$ 是任意的，故 $f \in \Cc(I, \K)$。
:::

::: fr
▷ Méthode : la continuité est une propriété locale. Pour montrer que $f$ est continue en $a$, il suffit de regarder $f$ près de $a$ ; on trouve un segment $J \subset I$ qui contient tous les points de $I$ proches de $a$, et on applique {@fr:cont-limite-unif} sur $J$.

Si $I$ est réduit à un point, toute fonction sur $I$ est continue. Supposons que $I$ contient au moins deux points, et fixons $a \in I$ et $\eps > 0$.

**Étape 1 (choix d'un segment)**　Il existe $\eta > 0$ et un segment $J \subset I$ tels que
$$I \cap \left]a - \eta, a + \eta\right[ \subset J.$$
**Cas 1** : $a$ est intérieur à $I$. On choisit $\eta > 0$ tel que $[a - \eta, a + \eta] \subset I$ et on pose $J = [a - \eta, a + \eta]$.
**Cas 2** : $a = \min I$. Comme $I$ contient au moins deux points, il existe $b \in I$ avec $b > a$ ; on pose $\eta = b - a$ et $J = [a, b] \subset I$ ($I$ est un intervalle). Alors $I \cap \left]a - \eta, a + \eta\right[ = [a, b[ \subset J$.
**Cas 3** : $a = \max I$. On échange les rôles de la gauche et de la droite dans le cas 2 : on prend $b \in I$ avec $b < a$, $\eta = a - b$ et $J = [b, a]$.

**Étape 2 (on applique le théorème sur $J$)**　Par hypothèse, $(f_n|_J)$ converge uniformément vers $f|_J$ sur $J$, et chaque $f_n|_J$ est continue en $a$. D'après {@fr:cont-limite-unif}, $f|_J$ est continue en $a$ : il existe $\delta > 0$ tel que pour tout $x \in J$, $\abs{x - a} < \delta \Rightarrow \abs{f(x) - f(a)} \le \eps$.

**Étape 3 (retour à $I$)**　Posons $\delta' = \min(\delta, \eta)$. Si $x \in I$ et $\abs{x - a} < \delta'$, alors $x \in I \cap \left]a - \eta, a + \eta\right[ \subset J$ (étape 1), donc $\abs{f(x) - f(a)} \le \eps$ (étape 2).

Ainsi $f$ est continue en $a$. Comme $a \in I$ est quelconque, $f \in \Cc(I, \K)$.
:::

::: rem
连续性是局部性质，所以只要在每个点的某个邻域上一致收敛就够了。法国教材常用「在 $I$ 的每个闭区间段（或每个紧子集）上一致收敛」作为假设，这比在整个 $I$ 上一致收敛弱得多。例如 $x^n$ 在 $[0, 1[$ 上不一致收敛，但在每个 $[0, a]$（$a < 1$）上一致收敛（{@ex-xn}）：每个闭区间段 $[c, d] \subset [0, 1[$ 都含于某个 $[0, a]$（取 $a = d$），所以极限 $0$ 在 $[0, 1[$ 上连续——这当然是已知的，但对和函数没有显式表达式的级数，这就是证明连续性的标准方法。
:::

连续性可以写成 $\lim_{x \to a} f(x) = f(a)$。把它推广到 $a$ 不在 $A$ 中（甚至 $a = \pm\infty$）的情形，就得到「交换两个极限」的定理。

::: thm id=double-limite zh="二重极限定理" en="Moore–Osgood theorem (interchange of limits)" fr="Théorème de la double limite" ru="Теорема о перестановке предельных переходов" lvl=1
设 $a \in \overline{A}$；或者 $A \subset \R$ 无上界而 $a = +\infty$（无下界而 $a = -\infty$）。设

1. $(f_n)$ 在 $A$ 上一致收敛到 $f$；
2. 对每个 $n$，$f_n(x) \xrightarrow[x \to a,\ x \in A]{} \ell_n \in \K$。

则数列 $(\ell_n)$ 收敛到某个 $\ell \in \K$，且 $f(x) \to \ell$（$x \to a$，$x \in A$）。即
$$\lim_{x \to a} \lim_{n \to \infty} f_n(x) = \lim_{n \to \infty} \lim_{x \to a} f_n(x).$$
:::

::: fr
Soit $a \in \overline{A}$ ; ou bien $A \subset \R$ n'est pas majorée et $a = +\infty$ (n'est pas minorée et $a = -\infty$). On suppose que

1. $(f_n)$ converge uniformément vers $f$ sur $A$ ;
2. pour tout $n$, $f_n(x) \xrightarrow[x \to a,\ x \in A]{} \ell_n \in \K$.

Alors la suite $(\ell_n)$ converge vers un certain $\ell \in \K$, et $f(x) \to \ell$ lorsque $x \to a$, $x \in A$. Autrement dit,
$$\lim_{x \to a} \lim_{n \to \infty} f_n(x) = \lim_{n \to \infty} \lim_{x \to a} f_n(x).$$
:::

::: proof
▷ 思路：先在一致 Cauchy 准则中令 $x \to a$，证明 $(\ell_n)$ 是 Cauchy 列，从而有极限 $\ell$；再用与 {@cont-limite-unif} 相同的 $\eps/3$ 论证，只是把中间项换成 $\abs{f_N(x) - \ell_N}$。

▷ 记号：「$x$ 靠近 $a$」指 $x \in A \cap V$，其中 $V$ 是 $a$ 的邻域：$a$ 有限时 $V = \left]a - \delta, a + \delta\right[$（赋范空间中为开球 $B(a, \delta)$），$a = +\infty$ 时 $V = \left]B, +\infty\right[$，$a = -\infty$ 时 $V = \left]-\infty, B\right[$。

**第 1 步（$(\ell_n)$ 是 Cauchy 列）**　设 $\eps > 0$。由 {@cauchy-unif}（⇒），存在 $N$，使对一切 $p, q \ge N$ 与一切 $x \in A$，$\abs{f_p(x) - f_q(x)} \le \eps$。固定 $p, q \ge N$，令 $x \to a$（$x \in A$）：由假设 2，$f_p(x) - f_q(x) \to \ell_p - \ell_q$；取极限时 $\le$ 保持，所以 $\abs{\ell_p - \ell_q} \le \eps$。因此 $(\ell_n)$ 是 $\K$ 中的 Cauchy 列；$\K$ 完备，它收敛，记其极限为 $\ell$。

**第 2 步（翻译两个收敛）**　设 $\eps > 0$。由假设 1，存在 $N_1$，使对 $n \ge N_1$ 与一切 $x \in A$，$\abs{f_n(x) - f(x)} \le \eps/3$。由第 1 步，存在 $N_2$，使对 $n \ge N_2$，$\abs{\ell_n - \ell} \le \eps/3$。令 $N = \max(N_1, N_2)$，并固定 $n = N$。

**第 3 步（$f_N$ 在 $a$ 处的极限）**　由假设 2，存在 $a$ 的邻域 $V$，使对一切 $x \in A \cap V$，$\abs{f_N(x) - \ell_N} \le \eps/3$。

**第 4 步（三角不等式）**　对 $x \in A \cap V$：
$$\begin{aligned}
\abs{f(x) - \ell} &\le \abs{f(x) - f_N(x)} + \abs{f_N(x) - \ell_N} + \abs{\ell_N - \ell} && \text{（三角不等式）}\\
&\le \tfrac\eps3 + \tfrac\eps3 + \tfrac\eps3 = \eps && \text{（第 2 步，第 3 步，第 2 步）。}
\end{aligned}$$

这就证明了 $f(x) \to \ell$（$x \to a$），且 $\ell = \lim_n \ell_n$，两个累次极限相等。
:::

::: fr
▷ Méthode : on fait d'abord $x \to a$ dans le critère de Cauchy uniforme pour montrer que $(\ell_n)$ est de Cauchy, donc converge vers un certain $\ell$ ; puis on reprend l'argument en $\eps/3$ de {@fr:cont-limite-unif}, le terme du milieu devenant $\abs{f_N(x) - \ell_N}$.

▷ Notation : « $x$ proche de $a$ » signifie $x \in A \cap V$ où $V$ est un voisinage de $a$ : $V = \left]a - \delta, a + \delta\right[$ si $a$ est fini (la boule ouverte $B(a, \delta)$ dans un evn), $V = \left]B, +\infty\right[$ si $a = +\infty$, $V = \left]-\infty, B\right[$ si $a = -\infty$.

**Étape 1 ($(\ell_n)$ est de Cauchy)**　Soit $\eps > 0$. D'après {@fr:cauchy-unif} (⇒), il existe $N$ tel que pour tous $p, q \ge N$ et tout $x \in A$, $\abs{f_p(x) - f_q(x)} \le \eps$. Fixons $p, q \ge N$ et faisons tendre $x$ vers $a$ ($x \in A$) : d'après l'hypothèse 2, $f_p(x) - f_q(x) \to \ell_p - \ell_q$ ; l'inégalité large passe à la limite, donc $\abs{\ell_p - \ell_q} \le \eps$. Ainsi $(\ell_n)$ est une suite de Cauchy de $\K$ ; comme $\K$ est complet, elle converge. Notons $\ell$ sa limite.

**Étape 2 (on traduit les deux convergences)**　Soit $\eps > 0$. D'après l'hypothèse 1, il existe $N_1$ tel que pour $n \ge N_1$ et tout $x \in A$, $\abs{f_n(x) - f(x)} \le \eps/3$. D'après l'étape 1, il existe $N_2$ tel que pour $n \ge N_2$, $\abs{\ell_n - \ell} \le \eps/3$. Posons $N = \max(N_1, N_2)$ et fixons $n = N$.

**Étape 3 (limite de $f_N$ en $a$)**　D'après l'hypothèse 2, il existe un voisinage $V$ de $a$ tel que pour tout $x \in A \cap V$, $\abs{f_N(x) - \ell_N} \le \eps/3$.

**Étape 4 (inégalité triangulaire)**　Pour $x \in A \cap V$ :
$$\begin{aligned}
\abs{f(x) - \ell} &\le \abs{f(x) - f_N(x)} + \abs{f_N(x) - \ell_N} + \abs{\ell_N - \ell} && \text{(inégalité triangulaire)}\\
&\le \tfrac\eps3 + \tfrac\eps3 + \tfrac\eps3 = \eps && \text{(étapes 2, 3, 2).}
\end{aligned}$$

Ceci montre que $f(x) \to \ell$ quand $x \to a$, avec $\ell = \lim_n \ell_n$ : les deux limites itérées sont égales.
:::

::: rem
1. **一致收敛不能换成逐点收敛。** $f_n(x) = x^n$，$A = [0, 1[$，$a = 1$：
   $$\lim_{x \to 1^-} \lim_{n \to \infty} x^n = \lim_{x \to 1^-} 0 = 0, \qquad \lim_{n \to \infty} \lim_{x \to 1^-} x^n = \lim_{n \to \infty} 1 = 1.$$
2. **只需在 $a$ 附近一致收敛。** 若 $(f_n)$ 在 $A \cap V_0$ 上一致收敛（$V_0$ 是 $a$ 的某个邻域），把定理用于 $A \cap V_0$ 即可：$a$ 仍是 $A \cap V_0$ 的闭包点，而 $x \to a$ 时的极限只与 $a$ 附近的值有关。
3. **{@cont-limite-unif} 是特例**：$a \in A$ 且 $f_n$ 在 $a$ 处连续时，$\ell_n = f_n(a)$，结论 $f(x) \to \ell = f(a)$ 就是 $f$ 在 $a$ 处连续。
4. **逆否命题可以否定一致收敛**：若每个 $\lim_{x \to a} f_n(x) = \ell_n$ 都存在，但 $(\ell_n)$ 发散，或 $\lim_{x \to a} f(x) \ne \lim_n \ell_n$，则在 $a$ 的任何邻域内收敛都不一致。{@zeta-regularite} 用的就是这个办法。
:::

::: thm id=dini zh="Dini 定理" en="Dini's theorem" fr="Théorème de Dini" ru="Теорема Дини" lvl=2
设 $K$ 是（赋范空间中的）紧集，$f_n, f \in \Cc(K, \R)$，$(f_n)$ 在 $K$ 上逐点收敛到 $f$，且对每个 $x \in K$，数列 $(f_n(x))_n$ 单调（单调方向可以随 $x$ 变化）。则 $(f_n)$ 在 $K$ 上一致收敛到 $f$。
:::

::: fr
Soient $K$ un compact (d'un espace vectoriel normé) et $f_n, f \in \Cc(K, \R)$. On suppose que $(f_n)$ converge simplement vers $f$ sur $K$ et que, pour tout $x \in K$, la suite $(f_n(x))_n$ est monotone (le sens de monotonie peut dépendre de $x$). Alors $(f_n)$ converge uniformément vers $f$ sur $K$.
:::

::: sketch
▷ 思路：化归为一列逐点递减到 $0$ 的连续函数 $g_n = \abs{f_n - f}$；用反证法，把「坏点」$x_n$ 用紧性抽取收敛子列，在极限点处得到矛盾。

**第 1 步（化归）**　令 $g_n = \abs{f_n - f}$。它连续（连续函数的差与绝对值）且非负。固定 $x \in K$：若 $(f_n(x))$ 递增，则 $f_n(x) \le f(x)$（递增数列不超过其极限），$g_n(x) = f(x) - f_n(x)$ 关于 $n$ 递减；若 $(f_n(x))$ 递减，同理（把 $f_n, f$ 换成 $-f_n, -f$）$g_n(x) = f_n(x) - f(x)$ 递减。所以对每个 $x$，$(g_n(x))$ 递减到 $0$。由此 $\norm{g_n}_\infty$ 关于 $n$ 也递减（$g_{n+1} \le g_n$ 逐点成立）。

**第 2 步（反设）**　要证 $\norm{g_n}_\infty \to 0$。反设不然。由于 $(\norm{g_n}_\infty)$ 递减且非负，它有极限 $\lambda > 0$；令 $\eps = \lambda$，则对一切 $n$，$\norm{g_n}_\infty \ge \eps$。$g_n$ 在紧集 $K$ 上连续，取到最大值（{@image-compact}）：存在 $x_n \in K$ 使 $g_n(x_n) = \norm{g_n}_\infty \ge \eps$。

**第 3 步（抽取子列）**　$K$ 紧，存在严格递增的 $\varphi : \N \to \N$ 与 $x^* \in K$，使 $x_{\varphi(n)} \to x^*$。

**第 4 步（固定 $m$，取极限）**　固定 $m \in \N$。对满足 $\varphi(n) \ge m$ 的 $n$（由于 $\varphi(n) \ge n$，$n \ge m$ 即可），由第 1 步的单调性（在点 $x_{\varphi(n)}$ 处），
$$g_m(x_{\varphi(n)}) \ge g_{\varphi(n)}(x_{\varphi(n)}) \ge \eps.$$
令 $n \to \infty$：$g_m$ 连续，$x_{\varphi(n)} \to x^*$，所以 $g_m(x^*) \ge \eps$。

**第 5 步（矛盾）**　第 4 步对每个 $m$ 成立：$g_m(x^*) \ge \eps$ 对一切 $m$ 成立，这与 $g_m(x^*) \to 0$（第 1 步）矛盾。

所以 $\norm{f_n - f}_\infty = \norm{g_n}_\infty \to 0$，即一致收敛。
:::

::: fr
▷ Méthode : on se ramène à une suite de fonctions continues $g_n = \abs{f_n - f}$ qui décroît simplement vers $0$ ; on raisonne par l'absurde et on extrait, grâce à la compacité, une sous-suite convergente des « mauvais points » $x_n$, ce qui donne une contradiction au point limite.

**Étape 1 (réduction)**　Posons $g_n = \abs{f_n - f}$. Elle est continue (différence et valeur absolue de fonctions continues) et positive. Fixons $x \in K$ : si $(f_n(x))$ est croissante, alors $f_n(x) \le f(x)$ (une suite croissante est majorée par sa limite) et $g_n(x) = f(x) - f_n(x)$ décroît en $n$ ; si $(f_n(x))$ est décroissante, on applique ce qui précède à $-f_n$ et $-f$ : $g_n(x) = f_n(x) - f(x)$ décroît. Ainsi, pour tout $x$, $(g_n(x))$ décroît vers $0$. Par conséquent $\norm{g_n}_\infty$ décroît aussi en $n$ (car $g_{n+1} \le g_n$ point par point).

**Étape 2 (raisonnement par l'absurde)**　On veut montrer que $\norm{g_n}_\infty \to 0$. Supposons le contraire. La suite $(\norm{g_n}_\infty)$ est décroissante et positive, donc elle a une limite $\lambda > 0$ ; avec $\eps = \lambda$, on a $\norm{g_n}_\infty \ge \eps$ pour tout $n$. Comme $g_n$ est continue sur le compact $K$, elle atteint son maximum ({@fr:image-compact}) : il existe $x_n \in K$ tel que $g_n(x_n) = \norm{g_n}_\infty \ge \eps$.

**Étape 3 (extraction)**　Comme $K$ est compact, il existe une extractrice $\varphi$ et $x^* \in K$ tels que $x_{\varphi(n)} \to x^*$.

**Étape 4 (on fixe $m$ et on passe à la limite)**　Fixons $m \in \N$. Pour tout $n$ tel que $\varphi(n) \ge m$ (il suffit que $n \ge m$, car $\varphi(n) \ge n$), la monotonie de l'étape 1 au point $x_{\varphi(n)}$ donne
$$g_m(x_{\varphi(n)}) \ge g_{\varphi(n)}(x_{\varphi(n)}) \ge \eps.$$
Faisons $n \to \infty$ : $g_m$ est continue et $x_{\varphi(n)} \to x^*$, donc $g_m(x^*) \ge \eps$.

**Étape 5 (contradiction)**　L'étape 4 vaut pour tout $m$ : $g_m(x^*) \ge \eps$ pour tout $m$, ce qui contredit $g_m(x^*) \to 0$ (étape 1).

Donc $\norm{f_n - f}_\infty = \norm{g_n}_\infty \to 0$ : la convergence est uniforme.
:::

::: rem
**四个条件都不能去掉。**

1. **$K$ 紧**：$x^n$ 在 $[0, 1[$ 上连续、逐点递减到连续函数 $0$，但不一致收敛（{@ex-xn}）。
2. **$f$ 连续**：$x^n$ 在紧集 $[0, 1]$ 上逐点递减到 $\mathbf{1}_{\{1\}}$，不一致收敛。
3. **$f_n$ 连续**：$f_n = \mathbf{1}_{]0, 1/n[}$（$n \ge 1$）在 $[0, 1]$ 上逐点递减到 $0$（对 $x \in \left]0, 1\right]$，只要 $n \ge 1/x$ 就有 $f_n(x) = 0$），但 $\norm{f_n}_\infty = 1$。
4. **单调性**：$f_n(x) = nx\,\e^{-nx}$ 在 $[0, 1]$ 上逐点收敛到 $0$，但 $\norm{f_n}_\infty = f_n(\frac1n) = \e^{-1}$（$n \ge 1$）。对固定的 $x > 0$，$t \mapsto tx\,\e^{-tx}$ 的导数为 $x\,\e^{-tx}(1 - tx)$，所以 $(f_n(x))$ 只在 $n \ge 1/x$ 之后递减——单调只从一个**依赖于 $x$ 的**项开始，不够用。
:::

::: q
$f_n(x) = \dfrac{1}{1 + (x - n)^2}$ 在 $\R$ 上连续，逐点收敛到连续函数 $0$。收敛一致吗？在 $[-M, M]$ 上呢？这与 Dini 定理有什么关系？
:::

::: ans
在 $\R$ 上不一致：$\norm{f_n}_\infty = f_n(n) = 1$。这不与 Dini 定理矛盾，因为 $\R$ 不紧（而且对固定的 $x$，$(f_n(x))$ 只在 $n \ge x$ 之后才递减）。

在 $[-M, M]$ 上一致：对 $n \ge M$ 与 $\abs{x} \le M$，$(x - n)^2 \ge (n - M)^2$，所以 $0 \le f_n(x) \le \frac{1}{1 + (n - M)^2} \to 0$，上界与 $x$ 无关。也可以对子列 $(f_n)_{n \ge M}$ 用 Dini 定理：在紧集 $[-M, M]$ 上它逐点递减。
:::

::: q
Dini 定理的证明中，「$f$ 连续」用在了哪里？
:::

::: ans
用在 $g_m = \abs{f_m - f}$ 的连续性上，具体在第 4 步：由 $x_{\varphi(n)} \to x^*$ 推出 $g_m(x_{\varphi(n)}) \to g_m(x^*)$。（第 2 步中最大值的存在也用到了它，但那里可以绕开：只需取 $x_n$ 使 $g_n(x_n) \ge \eps/2$。）反例：$x^n$ 在 $[0, 1]$ 上，$f = \mathbf{1}_{\{1\}}$ 不连续，结论失败。
:::

## 积分与求导的交换

本节回答两个问题：何时 $\lim \int f_n = \int \lim f_n$？何时 $(\lim f_n)' = \lim f_n'$？对积分，闭区间段上的一致收敛就够了；对导数，需要的是**导数列**的一致收敛。

::: thm id=integration-unif zh="一致收敛下的积分交换" en="Interchange of limit and integral" fr="Intégration d'une limite uniforme sur un segment" ru="Предельный переход под знаком интеграла" lvl=1
设 $f_n \in \Cc([a,b], \K)$，且 $(f_n)$ 在 $[a,b]$ 上一致收敛到 $f$。则 $f$ 连续，且
$$\int_a^b f_n \xrightarrow[n \to \infty]{} \int_a^b f.$$
更进一步，$F_n : x \mapsto \int_a^x f_n$ 在 $[a,b]$ 上一致收敛到 $F : x \mapsto \int_a^x f$。
:::

::: fr
Soient $f_n \in \Cc([a,b], \K)$ telles que $(f_n)$ converge uniformément vers $f$ sur $[a,b]$. Alors $f$ est continue et
$$\int_a^b f_n \xrightarrow[n \to \infty]{} \int_a^b f.$$
Plus précisément, $F_n : x \mapsto \int_a^x f_n$ converge uniformément sur $[a,b]$ vers $F : x \mapsto \int_a^x f$.
:::

::: proof
▷ 思路：积分的绝对值不超过「区间长度 × 被积函数的上确界」，而 $\norm{f_n - f}_\infty \to 0$ 正是一致收敛。

**第 1 步（$f$ 连续）**　由 {@cont-limite-unif}，$f \in \Cc([a,b], \K)$，所以 $\int_a^x f$ 有意义。

**第 2 步（对固定的 $x$ 估计）**　设 $x \in [a, b]$。则
$$\begin{aligned}
\abs{F_n(x) - F(x)} &= \Big|\int_a^x \big(f_n(t) - f(t)\big)\,\dd t\Big| && \text{（积分的线性）}\\
&\le \int_a^x \abs{f_n(t) - f(t)}\,\dd t && \text{（积分的三角不等式，} x \ge a \text{）}\\
&\le (x - a)\,\norm{f_n - f}_{\infty, [a,b]} && \text{（积分的单调性）}\\
&\le (b - a)\,\norm{f_n - f}_{\infty, [a,b]}.
\end{aligned}$$

**第 3 步（一致性）**　令 $\alpha_n = (b - a)\norm{f_n - f}_{\infty, [a,b]}$。它与 $x$ 无关，且由假设 $\alpha_n \to 0$。由 {@c3-carac-unif} 第 1 条，$(F_n)$ 在 $[a,b]$ 上一致收敛到 $F$。取 $x = b$ 得 $\int_a^b f_n \to \int_a^b f$。
:::

::: fr
▷ Méthode : la valeur absolue d'une intégrale est majorée par « longueur de l'intervalle × borne supérieure de l'intégrande », et $\norm{f_n - f}_\infty \to 0$ est précisément la convergence uniforme.

**Étape 1 ($f$ est continue)**　D'après {@fr:cont-limite-unif}, $f \in \Cc([a,b], \K)$, donc $\int_a^x f$ a un sens.

**Étape 2 (estimation à $x$ fixé)**　Soit $x \in [a,b]$. Alors
$$\begin{aligned}
\abs{F_n(x) - F(x)} &= \Big|\int_a^x \big(f_n(t) - f(t)\big)\,\dd t\Big| && \text{(linéarité de l'intégrale)}\\
&\le \int_a^x \abs{f_n(t) - f(t)}\,\dd t && \text{(inégalité triangulaire, } x \ge a \text{)}\\
&\le (x - a)\,\norm{f_n - f}_{\infty, [a,b]} && \text{(croissance de l'intégrale)}\\
&\le (b - a)\,\norm{f_n - f}_{\infty, [a,b]}.
\end{aligned}$$

**Étape 3 (uniformité)**　Posons $\alpha_n = (b - a)\norm{f_n - f}_{\infty, [a,b]}$. Ce majorant ne dépend pas de $x$ et tend vers $0$ par hypothèse. D'après le point 1 de {@fr:c3-carac-unif}, $(F_n)$ converge uniformément vers $F$ sur $[a,b]$. Pour $x = b$, on obtient $\int_a^b f_n \to \int_a^b f$.
:::

::: rem
1. 定理对分段连续（甚至 Riemann 可积）的 $f_n$ 同样成立，证明不变（只需另外知道一致极限仍可积）。
2. **区间有界不能去掉。** 在 $[0, +\infty[$ 上，$g_n(x) = \frac1n \e^{-x/n}$（$n \ge 1$）一致收敛到 $0$（$\norm{g_n}_\infty = \frac1n$），但 $\int_0^{+\infty} g_n = 1$ 对一切 $n$ 成立。上面的估计 $(b - a)\norm{g_n}_\infty$ 在 $b = +\infty$ 时失效：函数越来越低，但「铺」得越来越宽。
:::

::: cex id=cex-bosse lvl=1
只有逐点收敛时，结论不成立（即使区间是 $[0, 1]$）。令 $f_n(x) = n^2 x\, \e^{-nx}$。

- **逐点极限**：$f_n(0) = 0$；对 $x \in \left]0, 1\right]$，$f_n(x) = x \cdot n^2 \e^{-nx} \to 0$（指数压倒多项式）。所以 $f = 0$，$\int_0^1 f = 0$。
- **积分**：作变量替换 $t = nx$（$\dd x = \dd t / n$），再分部积分：
  $$\int_0^1 f_n = \int_0^n t\,\e^{-t}\,\dd t = \Big[-t\,\e^{-t}\Big]_0^n + \int_0^n \e^{-t}\,\dd t = 1 - (n + 1)\e^{-n} \xrightarrow[n\to\infty]{} 1.$$
- **与定理的关系**：$\lim \int f_n = 1 \ne 0 = \int \lim f_n$，所以由 {@integration-unif}，收敛不可能一致。直接验证：$f_n'(x) = n^2 \e^{-nx}(1 - nx)$，最大值 $\norm{f_n}_\infty = f_n(\frac1n) = \frac{n}{\e} \to +\infty$。

$f_n$ 的「质量」集中在 $x = 1/n$ 附近的一个越来越高、越来越窄的峰上。第 6 章的控制收敛定理会给出更好的判据。
:::

::: thm id=derivation-suite zh="函数列的逐项求导" en="Differentiation of a sequence of functions" fr="Théorème de dérivation d'une suite de fonctions" ru="Теорема о дифференцировании функциональной последовательности" lvl=1
设 $I$ 是 $\R$ 的区间，$f_n \in \Cc^1(I, \K)$。若

1. 存在 $x_0 \in I$，使 $(f_n(x_0))$ 收敛（特别地，若 $(f_n)$ 在 $I$ 上逐点收敛，此条成立）；
2. $(f_n')$ 在 $I$ 的每个闭区间段上一致收敛到某个函数 $g$，

则 $(f_n)$ 在 $I$ 的每个闭区间段上一致收敛到某个函数 $f$，$f \in \Cc^1(I, \K)$，且 $f' = g$，即
$$\Big(\lim_{n \to \infty} f_n\Big)' = \lim_{n \to \infty} f_n'.$$
:::

::: fr
Soient $I$ un intervalle de $\R$ et $f_n \in \Cc^1(I, \K)$. On suppose que

1. il existe $x_0 \in I$ tel que $(f_n(x_0))$ converge (c'est le cas en particulier si $(f_n)$ converge simplement sur $I$) ;
2. $(f_n')$ converge uniformément sur tout segment de $I$ vers une fonction $g$.

Alors $(f_n)$ converge uniformément sur tout segment de $I$ vers une fonction $f$, $f \in \Cc^1(I, \K)$ et $f' = g$, c'est-à-dire
$$\Big(\lim_{n \to \infty} f_n\Big)' = \lim_{n \to \infty} f_n'.$$
:::

::: proof
▷ 思路：用微积分基本定理把 $f_n$ 写成 $f_n(x) = f_n(x_0) + \int_{x_0}^x f_n'$，于是导数列的一致收敛通过积分（{@integration-unif} 中的估计）传给 $f_n$ 本身。先写出候选极限 $f(x) = \ell_0 + \int_{x_0}^x g$，再证明一致收敛。

**第 1 步（翻译假设）**　记 $\ell_0 = \lim_n f_n(x_0)$。每个 $f_n'$ 在 $I$ 上连续，且 $(f_n')$ 在 $I$ 的每个闭区间段上一致收敛到 $g$，由 {@c3-cont-segments}，$g \in \Cc(I, \K)$。

**第 2 步（候选极限）**　对 $x \in I$，令
$$f(x) = \ell_0 + \int_{x_0}^x g(t)\,\dd t.$$
$g$ 连续，由微积分基本定理，$f$ 在 $I$ 上可导且 $f' = g$；$f'$ 连续，所以 $f \in \Cc^1(I, \K)$。

**第 3 步（$f_n$ 的积分表示）**　$f_n \in \Cc^1(I, \K)$，由微积分基本定理，对一切 $x \in I$，
$$f_n(x) = f_n(x_0) + \int_{x_0}^x f_n'(t)\,\dd t.$$

**第 4 步（在闭区间段上估计）**　设 $[c, d] \subset I$。令 $J = [\min(c, x_0), \max(d, x_0)]$；$I$ 是区间且含 $c, d, x_0$，所以 $J \subset I$，记 $\lambda = \max(d, x_0) - \min(c, x_0)$ 为其长度。对 $x \in [c, d]$，$x$ 与 $x_0$ 之间的线段含于 $J$，所以
$$\begin{aligned}
\abs{f_n(x) - f(x)} &= \Big|f_n(x_0) - \ell_0 + \int_{x_0}^x \big(f_n'(t) - g(t)\big)\,\dd t\Big| && \text{（第 2、3 步相减）}\\
&\le \abs{f_n(x_0) - \ell_0} + \abs{x - x_0}\,\norm{f_n' - g}_{\infty, J} && \text{（三角不等式，积分估计）}\\
&\le \abs{f_n(x_0) - \ell_0} + \lambda\,\norm{f_n' - g}_{\infty, J} =: \alpha_n && (\abs{x - x_0} \le \lambda).
\end{aligned}$$

**第 5 步（结论）**　$\alpha_n$ 与 $x \in [c, d]$ 无关。由第 1 步，$\abs{f_n(x_0) - \ell_0} \to 0$；$J$ 是 $I$ 的闭区间段，由假设 2，$\norm{f_n' - g}_{\infty, J} \to 0$。所以 $\alpha_n \to 0$，由 {@c3-carac-unif} 第 1 条，$(f_n)$ 在 $[c, d]$ 上一致收敛到 $f$。

综上，$(f_n)$ 在 $I$ 的每个闭区间段上一致收敛到 $f \in \Cc^1(I, \K)$，且 $f' = g$。若 $(f_n)$ 还在 $I$ 上逐点收敛到某个 $\tilde f$，由逐点极限的唯一性，$\tilde f = f$。
:::

::: fr
▷ Méthode : par le théorème fondamental de l'analyse, $f_n(x) = f_n(x_0) + \int_{x_0}^x f_n'$ ; la convergence uniforme des dérivées se transmet ainsi à $f_n$ elle-même par intégration (estimation de {@fr:integration-unif}). On écrit d'abord la limite candidate $f(x) = \ell_0 + \int_{x_0}^x g$, puis on montre la convergence uniforme.

**Étape 1 (on traduit les hypothèses)**　Notons $\ell_0 = \lim_n f_n(x_0)$. Chaque $f_n'$ est continue sur $I$ et $(f_n')$ converge uniformément vers $g$ sur tout segment de $I$ ; d'après {@fr:c3-cont-segments}, $g \in \Cc(I, \K)$.

**Étape 2 (limite candidate)**　Pour $x \in I$, posons
$$f(x) = \ell_0 + \int_{x_0}^x g(t)\,\dd t.$$
Comme $g$ est continue, le théorème fondamental de l'analyse montre que $f$ est dérivable sur $I$ et $f' = g$ ; $f'$ est continue, donc $f \in \Cc^1(I, \K)$.

**Étape 3 (représentation intégrale de $f_n$)**　Comme $f_n \in \Cc^1(I, \K)$, le théorème fondamental de l'analyse donne, pour tout $x \in I$,
$$f_n(x) = f_n(x_0) + \int_{x_0}^x f_n'(t)\,\dd t.$$

**Étape 4 (estimation sur un segment)**　Soit $[c, d] \subset I$. Posons $J = [\min(c, x_0), \max(d, x_0)]$ ; comme $I$ est un intervalle contenant $c$, $d$ et $x_0$, on a $J \subset I$ ; notons $\lambda = \max(d, x_0) - \min(c, x_0)$ sa longueur. Pour $x \in [c, d]$, le segment d'extrémités $x$ et $x_0$ est contenu dans $J$, donc
$$\begin{aligned}
\abs{f_n(x) - f(x)} &= \Big|f_n(x_0) - \ell_0 + \int_{x_0}^x \big(f_n'(t) - g(t)\big)\,\dd t\Big| && \text{(différence des étapes 2 et 3)}\\
&\le \abs{f_n(x_0) - \ell_0} + \abs{x - x_0}\,\norm{f_n' - g}_{\infty, J} && \text{(inégalité triangulaire, majoration de l'intégrale)}\\
&\le \abs{f_n(x_0) - \ell_0} + \lambda\,\norm{f_n' - g}_{\infty, J} =: \alpha_n && (\abs{x - x_0} \le \lambda).
\end{aligned}$$

**Étape 5 (conclusion)**　Le majorant $\alpha_n$ ne dépend pas de $x \in [c, d]$. D'après l'étape 1, $\abs{f_n(x_0) - \ell_0} \to 0$ ; comme $J$ est un segment de $I$, l'hypothèse 2 donne $\norm{f_n' - g}_{\infty, J} \to 0$. Donc $\alpha_n \to 0$ et, d'après le point 1 de {@fr:c3-carac-unif}, $(f_n)$ converge uniformément vers $f$ sur $[c, d]$.

En conclusion, $(f_n)$ converge uniformément sur tout segment de $I$ vers $f \in \Cc^1(I, \K)$, et $f' = g$. Si de plus $(f_n)$ converge simplement sur $I$ vers une fonction $\tilde f$, l'unicité de la limite simple donne $\tilde f = f$.
:::

::: rem
1. **一点处的收敛不能去掉**：$f_n(x) = n$（常函数）满足 $f_n' = 0$ 一致收敛，但 $(f_n(x))$ 处处发散。导数只决定函数到相差一个常数为止，条件 1 正是用来固定这个常数。
2. **只需在每个闭区间段上一致收敛**：这对幂级数（第 4 章）至关重要，因为它们一般只在收敛区间的每个闭区间段上一致收敛。
3. 法国大纲的陈述假设 $f_n \in \Cc^1$；只假设 $f_n$ 可导时结论仍成立，但证明要换成有限增量不等式。
:::

::: cex id=c3-cex-derivee lvl=1
**导数列的收敛不能省略**：$f_n$ 本身一致收敛远远不够。

1. $f_n(x) = \dfrac{\sin(nx)}{\sqrt n}$（$n \ge 1$）在 $\R$ 上一致收敛到 $0$：$\norm{f_n}_\infty = \frac{1}{\sqrt n}$（在 $x = \frac{\pi}{2n}$ 处取到）。但 $f_n'(x) = \sqrt{n}\cos(nx)$，$f_n'(0) = \sqrt n \to +\infty$：导数列甚至不逐点收敛，而极限函数 $0$ 的导数是 $0$。
2. $h_n(x) = \sqrt{x^2 + 1/n^2}$（$n \ge 1$）是 $\Cc^\infty$ 函数，在 $\R$ 上一致收敛到 $\abs{x}$：
   $$0 \le h_n(x) - \abs{x} = \frac{1/n^2}{\sqrt{x^2 + 1/n^2} + \abs{x}} \le \frac{1/n^2}{1/n} = \frac1n.$$
   极限 $\abs{x}$ 在 $0$ 处不可导。

一致收敛不保持可导性，更不保持导数。更极端地，由 {@weierstrass}，$[a, b]$ 上的任何连续函数——包括处处不可导的（{@takagi}）——都是多项式的一致极限。
:::

::: cor id=c3-derivation-ck zh="$\Cc^k$ 版本" en="Differentiation theorem, $C^k$ version" fr="Théorème de dérivation, version $\mathcal{C}^k$" ru="Теорема о дифференцировании, вариант для $C^k$" lvl=1
设 $k \ge 1$，$I$ 是区间，$f_n \in \Cc^k(I, \K)$。若

1. 对 $0 \le j \le k - 1$，$(f_n^{(j)})$ 在 $I$ 上逐点收敛；
2. $(f_n^{(k)})$ 在 $I$ 的每个闭区间段上一致收敛，

则 $(f_n)$ 的逐点极限 $f$ 属于 $\Cc^k(I, \K)$，并且对 $0 \le j \le k$，$(f_n^{(j)})$ 在 $I$ 的每个闭区间段上一致收敛到 $f^{(j)}$。若对每个 $k$ 条件都成立，则 $f \in \Cc^\infty(I, \K)$。
:::

::: fr
Soient $k \ge 1$, $I$ un intervalle et $f_n \in \Cc^k(I, \K)$. On suppose que

1. pour $0 \le j \le k - 1$, $(f_n^{(j)})$ converge simplement sur $I$ ;
2. $(f_n^{(k)})$ converge uniformément sur tout segment de $I$.

Alors la limite simple $f$ de $(f_n)$ appartient à $\Cc^k(I, \K)$ et, pour $0 \le j \le k$, $(f_n^{(j)})$ converge uniformément sur tout segment de $I$ vers $f^{(j)}$. Si les hypothèses sont satisfaites pour tout $k$, alors $f \in \Cc^\infty(I, \K)$.
:::

::: proof
▷ 思路：对 $k$ 归纳。递推时，把归纳假设用于**导函数列** $(f_n')$，再把 {@derivation-suite} 用于 $(f_n)$。

记 $\mathcal{P}(k)$：「对任意区间 $I$ 与任意满足条件 1、2（对这个 $k$）的序列 $(f_n) \subset \Cc^k(I, \K)$，结论成立」。

**初始化（$k = 1$）**　条件 1 说 $(f_n)$ 在 $I$ 上逐点收敛，条件 2 说 $(f_n')$ 在每个闭区间段上一致收敛到某个 $g$。由 {@derivation-suite}，$(f_n)$ 在每个闭区间段上一致收敛到 $f \in \Cc^1(I, \K)$，且 $f' = g$，即 $(f_n')$ 在每个闭区间段上一致收敛到 $f'$。这就是 $\mathcal{P}(1)$。

**递推**　设 $\mathcal{P}(k)$ 成立，$(f_n) \subset \Cc^{k+1}(I, \K)$ 满足 $k + 1$ 时的条件 1、2。令 $h_n = f_n' \in \Cc^k(I, \K)$。

1. 对 $0 \le j \le k - 1$，$h_n^{(j)} = f_n^{(j+1)}$ 在 $I$ 上逐点收敛（条件 1，因为 $1 \le j + 1 \le k$）。
2. $h_n^{(k)} = f_n^{(k+1)}$ 在每个闭区间段上一致收敛（条件 2）。
3. 由 $\mathcal{P}(k)$（用于 $(h_n)$），逐点极限 $h = \lim f_n'$ 属于 $\Cc^k(I, \K)$，且对 $0 \le j \le k$，$(f_n^{(j+1)}) = (h_n^{(j)})$ 在每个闭区间段上一致收敛到 $h^{(j)}$。特别地（$j = 0$），$(f_n')$ 在每个闭区间段上一致收敛到 $h$。
4. $(f_n)$ 在 $I$ 上逐点收敛（条件 1，$j = 0$）。由 {@derivation-suite}，$(f_n)$ 在每个闭区间段上一致收敛到 $f \in \Cc^1(I, \K)$，且 $f' = h$。
5. 由 $h \in \Cc^k$ 得 $f \in \Cc^{k+1}$，且 $f^{(j+1)} = h^{(j)}$ 是 $(f_n^{(j+1)})$ 在每个闭区间段上的一致极限（$0 \le j \le k$）。

这就是 $\mathcal{P}(k + 1)$。由归纳法，$\mathcal{P}(k)$ 对一切 $k \ge 1$ 成立。最后一句：若对每个 $k$ 条件都成立，则 $f \in \Cc^k$ 对一切 $k$ 成立，即 $f \in \Cc^\infty$。
:::

::: fr
▷ Méthode : récurrence sur $k$. Pour l'hérédité, on applique l'hypothèse de récurrence à la **suite des dérivées** $(f_n')$, puis {@fr:derivation-suite} à $(f_n)$.

Notons $\mathcal{P}(k)$ : « pour tout intervalle $I$ et toute suite $(f_n) \subset \Cc^k(I, \K)$ vérifiant les hypothèses 1 et 2 (pour cet entier $k$), la conclusion est vraie ».

**Initialisation ($k = 1$)**　L'hypothèse 1 dit que $(f_n)$ converge simplement sur $I$, l'hypothèse 2 que $(f_n')$ converge uniformément sur tout segment vers une fonction $g$. D'après {@fr:derivation-suite}, $(f_n)$ converge uniformément sur tout segment vers $f \in \Cc^1(I, \K)$ et $f' = g$, c'est-à-dire que $(f_n')$ converge uniformément sur tout segment vers $f'$. C'est $\mathcal{P}(1)$.

**Hérédité**　Supposons $\mathcal{P}(k)$ vraie et soit $(f_n) \subset \Cc^{k+1}(I, \K)$ vérifiant les hypothèses 1 et 2 au rang $k + 1$. Posons $h_n = f_n' \in \Cc^k(I, \K)$.

1. Pour $0 \le j \le k - 1$, $h_n^{(j)} = f_n^{(j+1)}$ converge simplement sur $I$ (hypothèse 1, car $1 \le j + 1 \le k$).
2. $h_n^{(k)} = f_n^{(k+1)}$ converge uniformément sur tout segment (hypothèse 2).
3. D'après $\mathcal{P}(k)$ appliquée à $(h_n)$, la limite simple $h = \lim f_n'$ appartient à $\Cc^k(I, \K)$ et, pour $0 \le j \le k$, $(f_n^{(j+1)}) = (h_n^{(j)})$ converge uniformément sur tout segment vers $h^{(j)}$. En particulier ($j = 0$), $(f_n')$ converge uniformément sur tout segment vers $h$.
4. $(f_n)$ converge simplement sur $I$ (hypothèse 1, $j = 0$). D'après {@fr:derivation-suite}, $(f_n)$ converge uniformément sur tout segment vers $f \in \Cc^1(I, \K)$ et $f' = h$.
5. Comme $h \in \Cc^k$, on a $f \in \Cc^{k+1}$, et $f^{(j+1)} = h^{(j)}$ est la limite uniforme sur tout segment de $(f_n^{(j+1)})$ ($0 \le j \le k$).

C'est $\mathcal{P}(k + 1)$. Par récurrence, $\mathcal{P}(k)$ est vraie pour tout $k \ge 1$. Enfin, si les hypothèses sont satisfaites pour tout $k$, alors $f \in \Cc^k$ pour tout $k$, c'est-à-dire $f \in \Cc^\infty$.
:::

::: q
$f_n(x) = x^n$ 在 $[0, 1]$ 上不一致收敛到 $f = \mathbf{1}_{\{1\}}$。$\int_0^1 f_n \to \int_0^1 f$ 是否仍然成立？这与 {@integration-unif} 矛盾吗？
:::

::: ans
成立：$\int_0^1 x^n\,\dd x = \frac{1}{n+1} \to 0 = \int_0^1 \mathbf{1}_{\{1\}}$（只在一点非零的阶梯函数积分为 $0$）。这不矛盾：一致收敛是积分交换的**充分**条件，不是必要条件。{@cex-bosse} 则说明没有一致收敛时交换确实可能失败。
:::

::: q
设 $f_n \in \Cc^1([0, 1])$ 一致收敛到 $f$，而且已知 $f \in \Cc^1([0, 1])$。能否推出 $(f_n')$ 逐点收敛到 $f'$？
:::

::: ans
不能。$f_n(x) = \frac{\sin(nx)}{\sqrt n}$ 在 $[0, 1]$ 上一致收敛到 $f = 0 \in \Cc^1$，但 $f_n'(0) = \sqrt n \to +\infty \ne f'(0)$（{@c3-cex-derivee}）。{@derivation-suite} 的方向是「导数列一致收敛 $\Rightarrow$ 极限可导且导数等于极限」，不能倒过来用。
:::

## 函数项级数

函数项级数就是部分和构成的函数列，所以前三节的结论都可以直接搬过来。困难在于：和函数一般没有显式表达式，无法直接计算 $\sup \abs{S_n - S}$。本节给出只看**通项** $f_n$ 的判据，其中最常用的是正规收敛。

::: def id=c3-def-serie-fonctions zh="函数项级数的收敛" en="Convergence of a series of functions" fr="Convergence d'une série de fonctions" ru="Сходимость функционального ряда"
设 $f_n : A \to \K$。函数项级数 $\sum f_n$ 是指部分和函数列 $S_n = \sum_{k=0}^n f_k$。

- 若 $(S_n)$ 在 $A$ 上逐点收敛，称 $\sum f_n$ 在 $A$ 上**逐点收敛**；极限 $S(x) = \sum_{n=0}^\infty f_n(x)$ 称为**和函数**，$R_n(x) = S(x) - S_n(x) = \sum_{k > n} f_k(x)$ 称为**余项**。
- 若 $(S_n)$ 在 $A$ 上一致收敛（到 $S$），称 $\sum f_n$ 在 $A$ 上**一致收敛**。
- 若对每个 $x \in A$，$\sum \abs{f_n(x)}$ 收敛，称 $\sum f_n$ 在 $A$ 上**绝对收敛**。

白话：前两个概念就是把函数列的概念用到部分和上；绝对收敛是逐点的概念，每个 $x$ 各自看。
:::

::: fr
Soient $f_n : A \to \K$. La série de fonctions $\sum f_n$ est la suite des sommes partielles $S_n = \sum_{k=0}^n f_k$.

- Si $(S_n)$ converge simplement sur $A$, on dit que $\sum f_n$ **converge simplement** sur $A$ ; la limite $S(x) = \sum_{n=0}^\infty f_n(x)$ est la **fonction somme** et $R_n(x) = S(x) - S_n(x) = \sum_{k > n} f_k(x)$ est le **reste** d'ordre $n$.
- Si $(S_n)$ converge uniformément (vers $S$) sur $A$, on dit que $\sum f_n$ **converge uniformément** sur $A$.
- Si pour tout $x \in A$ la série $\sum \abs{f_n(x)}$ converge, on dit que $\sum f_n$ **converge absolument** sur $A$.

Autrement dit, les deux premières notions sont celles des suites de fonctions appliquées aux sommes partielles ; la convergence absolue est une notion ponctuelle, qui s'examine en chaque $x$ séparément.
:::

::: ex id=c3-ex-serie-geom lvl=1
几何级数 $\sum x^n$，$A = \left]-1, 1\right[$。部分和 $S_n(x) = \frac{1 - x^{n+1}}{1 - x}$，所以 $\sum x^n$ 逐点收敛，和函数与余项为
$$S(x) = \frac{1}{1 - x}, \qquad R_n(x) = \frac{x^{n+1}}{1 - x}.$$

- **在 $[-a, a]$（$0 \le a < 1$）上一致收敛**：对 $\abs{x} \le a$，$\abs{x^{n+1}} \le a^{n+1}$ 且 $\abs{1 - x} \ge 1 - a$，所以 $\abs{R_n(x)} \le \frac{a^{n+1}}{1 - a}$，上界与 $x$ 无关且趋于 $0$。
- **在 $]-1, 1[$ 上不一致收敛**：对固定的 $n$，$R_n(x) \to +\infty$（$x \to 1^-$），所以 $\sup_{]-1,1[} \abs{R_n} = +\infty$。
- **在 $[-1, 1[$ 上甚至不逐点收敛**：$x = -1$ 时通项 $(-1)^n$ 不趋于 $0$。
:::

::: prop id=c3-reste-unif zh="余项、Cauchy 准则与必要条件" en="Remainder, Cauchy criterion and a necessary condition" fr="Reste, critère de Cauchy et condition nécessaire" ru="Остаток, критерий Коши и необходимое условие" lvl=1
设 $f_n : A \to \K$。

1. $\sum f_n$ 在 $A$ 上一致收敛，当且仅当它在 $A$ 上逐点收敛，且余项在 $A$ 上一致趋于 $0$：$\sup_{x \in A} \abs{R_n(x)} \to 0$。
2. **（一致 Cauchy 准则）** $\sum f_n$ 在 $A$ 上一致收敛，当且仅当
   $$\forall \eps > 0,\ \exists N,\ \forall q > p \ge N,\ \forall x \in A,\quad \Big|\sum_{k=p+1}^q f_k(x)\Big| \le \eps.$$
3. **（必要条件）** 若 $\sum f_n$ 在 $A$ 上一致收敛，则 $(f_n)$ 在 $A$ 上一致收敛到 $0$。
:::

::: fr
Soient $f_n : A \to \K$.

1. $\sum f_n$ converge uniformément sur $A$ si et seulement si elle converge simplement sur $A$ et son reste tend uniformément vers $0$ sur $A$ : $\sup_{x \in A} \abs{R_n(x)} \to 0$.
2. **(Critère de Cauchy uniforme)** $\sum f_n$ converge uniformément sur $A$ si et seulement si
   $$\forall \eps > 0,\ \exists N,\ \forall q > p \ge N,\ \forall x \in A,\quad \Big|\sum_{k=p+1}^q f_k(x)\Big| \le \eps.$$
3. **(Condition nécessaire)** Si $\sum f_n$ converge uniformément sur $A$, alors $(f_n)$ converge uniformément vers $0$ sur $A$.
:::

::: proof
▷ 思路：三条都是把函数列的结论翻译成部分和与余项的语言；关键恒等式是 $R_n = S - S_n$ 与 $f_n = R_{n-1} - R_n$。

**1.**　两个方向中都有逐点收敛（(⇒) 由 {@c3-unif-simple}），此时 $S$ 有定义且 $R_n = S - S_n$。所以
$$\sup_{x \in A} \abs{R_n(x)} = \norm{S - S_n}_{\infty, A},$$
「$(S_n)$ 一致收敛到 $S$」与「$\sup_A \abs{R_n} \to 0$」是同一件事。

**2.**　对 $q > p$，$S_q - S_p = \sum_{k=p+1}^q f_k$。把 {@cauchy-unif} 用于 $(S_n)$：$p = q$ 时 $S_p - S_q = 0$，而 $p > q$ 时交换 $p, q$ 即可，所以 {@cauchy-unif} 的条件恰好就是这里写的条件。

**3.**　设 $\sum f_n$ 一致收敛。对 $n \ge 1$，
$$f_n = S_n - S_{n-1} = (S - S_{n-1}) - (S - S_n) = R_{n-1} - R_n,$$
所以对一切 $x \in A$，$\abs{f_n(x)} \le \norm{R_{n-1}}_{\infty, A} + \norm{R_n}_{\infty, A}$。由第 1 条，右边趋于 $0$ 且与 $x$ 无关，由 {@c3-carac-unif} 第 1 条，$(f_n)$ 一致收敛到 $0$。
:::

::: fr
▷ Méthode : les trois points traduisent les résultats sur les suites de fonctions en termes de sommes partielles et de restes ; les identités clés sont $R_n = S - S_n$ et $f_n = R_{n-1} - R_n$.

**1.**　Dans les deux sens, il y a convergence simple ((⇒) par {@fr:c3-unif-simple}) ; $S$ est alors définie et $R_n = S - S_n$. Ainsi
$$\sup_{x \in A} \abs{R_n(x)} = \norm{S - S_n}_{\infty, A},$$
et « $(S_n)$ converge uniformément vers $S$ » équivaut à « $\sup_A \abs{R_n} \to 0$ ».

**2.**　Pour $q > p$, $S_q - S_p = \sum_{k=p+1}^q f_k$. On applique {@fr:cauchy-unif} à $(S_n)$ : pour $p = q$, $S_p - S_q = 0$, et pour $p > q$ on échange $p$ et $q$ ; la condition de {@fr:cauchy-unif} est donc exactement celle de l'énoncé.

**3.**　Supposons que $\sum f_n$ converge uniformément. Pour $n \ge 1$,
$$f_n = S_n - S_{n-1} = (S - S_{n-1}) - (S - S_n) = R_{n-1} - R_n,$$
donc pour tout $x \in A$, $\abs{f_n(x)} \le \norm{R_{n-1}}_{\infty, A} + \norm{R_n}_{\infty, A}$. D'après le point 1, le membre de droite tend vers $0$ et ne dépend pas de $x$ ; d'après le point 1 de {@fr:c3-carac-unif}, $(f_n)$ converge uniformément vers $0$.
:::

::: rem
**第 3 条的逆命题不成立。** $\sum x^n(1 - x)$ 在 $[0, 1]$ 上：通项一致趋于 $0$（{@c3-ex-unif}：$\norm{x^n(1-x)}_\infty \le \frac{1}{n+1}$），但级数不一致收敛。实际上 $x \in [0, 1[$ 时和为 $(1 - x)\cdot\frac{1}{1 - x} = 1$，$x = 1$ 时和为 $0$：每一项连续而和函数不连续，由 {@cont-limite-unif}（用于部分和）收敛不一致。第 3 条的用处在于**否定**：例如 $\sum x^n$ 在 $]-1, 1[$ 上，$\norm{x^n}_\infty = 1 \not\to 0$，立即知道不一致收敛。
:::

::: def id=def-cv-normale zh="正规收敛" en="Normal convergence (Weierstrass M-test)" fr="Convergence normale" ru="Нормальная сходимость (признак Вейерштрасса)"
设 $f_n : A \to \K$。称 $\sum f_n$ 在 $A$ 上**正规收敛**，如果每个 $f_n$ 在 $A$ 上有界，且数项级数
$$\sum_n \norm{f_n}_{\infty, A} < +\infty.$$
等价地：存在非负实数列 $(M_n)$，使 $\sum M_n < +\infty$，且对一切 $n$ 与一切 $x \in A$，$\abs{f_n(x)} \le M_n$。（若正规收敛，取 $M_n = \norm{f_n}_{\infty, A}$；反过来，$\norm{f_n}_{\infty, A} \le M_n$，由比较定理 {@comparaison}，$\sum \norm{f_n}_{\infty, A}$ 收敛。）

白话：每一项都被一个**与 $x$ 无关**的数 $M_n$ 控制，而这些数构成收敛的数项级数。
:::

::: fr
Soient $f_n : A \to \K$. On dit que $\sum f_n$ **converge normalement** sur $A$ si chaque $f_n$ est bornée sur $A$ et si la série numérique
$$\sum_n \norm{f_n}_{\infty, A} < +\infty.$$
De manière équivalente : il existe une suite $(M_n)$ de réels positifs telle que $\sum M_n < +\infty$ et, pour tout $n$ et tout $x \in A$, $\abs{f_n(x)} \le M_n$. (S'il y a convergence normale, on prend $M_n = \norm{f_n}_{\infty, A}$ ; réciproquement, $\norm{f_n}_{\infty, A} \le M_n$ et le théorème de comparaison {@fr:comparaison} montre que $\sum \norm{f_n}_{\infty, A}$ converge.)

Autrement dit, chaque terme est majoré par un réel $M_n$ **indépendant de $x$**, et ces réels forment une série convergente.
:::

::: ex id=c3-ex-normale lvl=1
1. **正规收敛**：$\sum_{n \ge 1} \frac{\sin(nx)}{n^2}$ 在 $\R$ 上。$\norm{\frac{\sin(n\,\cdot)}{n^2}}_{\infty, \R} = \frac{1}{n^2}$（在 $x = \frac{\pi}{2n}$ 处取到），而 $\sum \frac{1}{n^2} < +\infty$。
2. **不正规收敛**：$\sum x^n$ 在 $]-1, 1[$ 上。$\norm{x^n}_{\infty, ]-1,1[} = 1$，$\sum 1$ 发散。但在 $[-a, a]$（$0 \le a < 1$）上 $\norm{x^n}_{\infty, [-a,a]} = a^n$，$\sum a^n$ 收敛，所以正规收敛。

正规收敛依赖于集合 $A$：缩小 $A$，上确界变小，更容易正规收敛。
:::

::: thm id=normale-unif zh="正规收敛蕴含一致收敛" en="Normal convergence implies uniform convergence" fr="La convergence normale entraîne la convergence uniforme" ru="Признак Вейерштрасса" lvl=1
若 $\sum f_n$ 在 $A$ 上正规收敛，则它在 $A$ 上绝对收敛且一致收敛，并且余项满足
$$\sup_{x \in A} \abs{R_n(x)} \le \sum_{k > n} \norm{f_k}_{\infty, A}.$$
实际应用中常写成：若 $\abs{f_n(x)} \le M_n$ 对所有 $x \in A$ 成立且 $\sum M_n < \infty$，则 $\sum f_n$ 在 $A$ 上一致收敛。
:::

::: fr
Si $\sum f_n$ converge normalement sur $A$, alors elle converge absolument et uniformément sur $A$, et son reste vérifie
$$\sup_{x \in A} \abs{R_n(x)} \le \sum_{k > n} \norm{f_k}_{\infty, A}.$$
En pratique : si $\abs{f_n(x)} \le M_n$ pour tout $x \in A$ et si $\sum M_n < \infty$, alors $\sum f_n$ converge uniformément sur $A$.
:::

::: proof
▷ 思路：余项 $R_n(x)$ 被数项级数 $\sum M_k$ 的余项控制，后者与 $x$ 无关并趋于 $0$。

记 $M_n = \norm{f_n}_{\infty, A}$，$\rho_n = \sum_{k > n} M_k$（收敛数项级数的余项）。

**第 1 步（绝对收敛）**　固定 $x \in A$。对一切 $n$，$\abs{f_n(x)} \le M_n$，而 $\sum M_n$ 收敛，由比较定理 {@comparaison}，$\sum \abs{f_n(x)}$ 收敛。绝对收敛的数项级数收敛（$\K$ 完备），所以 $\sum f_n$ 在 $A$ 上逐点收敛，$S$ 与 $R_n$ 有定义。

**第 2 步（余项的估计）**　固定 $x \in A$ 与 $n$。对 $q > n$，由三角不等式，
$$\Big|\sum_{k=n+1}^q f_k(x)\Big| \le \sum_{k=n+1}^q \abs{f_k(x)} \le \sum_{k=n+1}^q M_k \le \rho_n.$$
令 $q \to \infty$：左边趋于 $\abs{R_n(x)}$（$\abs{\cdot}$ 连续），取极限保持 $\le$，所以 $\abs{R_n(x)} \le \rho_n$。

**第 3 步（一致性）**　$\rho_n$ 与 $x$ 无关，所以 $\sup_{x \in A} \abs{R_n(x)} \le \rho_n$；而收敛数项级数的余项 $\rho_n \to 0$。由 {@c3-reste-unif} 第 1 条，$\sum f_n$ 在 $A$ 上一致收敛。
:::

::: fr
▷ Méthode : le reste $R_n(x)$ est majoré par le reste de la série numérique $\sum M_k$, qui ne dépend pas de $x$ et tend vers $0$.

Notons $M_n = \norm{f_n}_{\infty, A}$ et $\rho_n = \sum_{k > n} M_k$ (reste d'une série numérique convergente).

**Étape 1 (convergence absolue)**　Fixons $x \in A$. Pour tout $n$, $\abs{f_n(x)} \le M_n$ et $\sum M_n$ converge ; par le théorème de comparaison {@fr:comparaison}, $\sum \abs{f_n(x)}$ converge. Une série numérique absolument convergente converge ($\K$ est complet), donc $\sum f_n$ converge simplement sur $A$, et $S$ et $R_n$ sont bien définis.

**Étape 2 (majoration du reste)**　Fixons $x \in A$ et $n$. Pour $q > n$, l'inégalité triangulaire donne
$$\Big|\sum_{k=n+1}^q f_k(x)\Big| \le \sum_{k=n+1}^q \abs{f_k(x)} \le \sum_{k=n+1}^q M_k \le \rho_n.$$
Faisons $q \to \infty$ : le membre de gauche tend vers $\abs{R_n(x)}$ (continuité de $\abs{\cdot}$) et l'inégalité large passe à la limite, d'où $\abs{R_n(x)} \le \rho_n$.

**Étape 3 (uniformité)**　Le majorant $\rho_n$ ne dépend pas de $x$, donc $\sup_{x \in A} \abs{R_n(x)} \le \rho_n$, et $\rho_n \to 0$ comme reste d'une série convergente. D'après le point 1 de {@fr:c3-reste-unif}, $\sum f_n$ converge uniformément sur $A$.
:::

::: rem
1. **抽象的证明。** $(\mathcal{B}(A, \K), \norm{\cdot}_{\infty, A})$ 是 Banach 空间（证明与 {@c0-complet} 相同），正规收敛就是这个空间中的绝对收敛，由 {@serie-abs-banach} 即得一致收敛。
2. **蕴含关系**：正规 $\Rightarrow$ 一致 $\Rightarrow$ 逐点；正规 $\Rightarrow$ 绝对。逆命题都不成立：
   - 逐点但不一致：$\sum x^n$ 在 $]-1, 1[$ 上（{@c3-ex-serie-geom}）；
   - 一致但不正规（甚至处处不绝对收敛）：{@ex-alternee-unif}；
   - 一致且绝对、但不正规：{@c3-cex-bosses}。
:::

::: cex id=c3-cex-bosses lvl=1
**一致收敛 + 绝对收敛 $\not\Rightarrow$ 正规收敛。** 令 $h(t) = \max(0, 1 - 2\abs{t})$（以 $0$ 为中心、底宽 $1$、高 $1$ 的三角形），$f_n(x) = \frac1n h(x - n)$（$n \ge 1$），$A = [0, +\infty[$。每个 $f_n$ 连续。

- **支集互不相交**：$f_n(x) \ne 0 \iff \abs{x - n} < \frac12$。所以对每个 $x$，至多一个 $n$ 使 $f_n(x) \ne 0$；$\sum f_n(x)$ 只有至多一个非零项，绝对收敛。
- **一致收敛**：对 $x \in A$ 与 $N \in \N$，余项 $R_N(x) = \sum_{n > N} f_n(x)$ 至多有一个非零项 $f_m(x)$（$m > N$），而 $0 \le f_m(x) \le \frac1m \le \frac{1}{N+1}$。所以 $\sup_A \abs{R_N} \le \frac{1}{N+1} \to 0$，由 {@c3-reste-unif}，一致收敛。
- **不正规收敛**：$\norm{f_n}_\infty = f_n(n) = \frac1n$，$\sum \frac1n$ 发散。

原因：各项的上确界在**不同的点**取到，余项每次只「用到」其中一个；而正规收敛要求所有上确界之和有限。
:::

正规收敛是证明一致收敛最常用的手段。下面把前三节的定理翻译到级数上。

::: cor id=transferts-series zh="函数项级数的三个交换定理" en="Continuity, integration and differentiation of series of functions" fr="Continuité, intégration et dérivation terme à terme" ru="Непрерывность, почленное интегрирование и дифференцирование рядов" lvl=1
设 $I$ 是 $\R$ 的区间，$f_n : I \to \K$。

1. **连续性**：若每个 $f_n$ 在 $I$ 上连续，且 $\sum f_n$ 在 $I$ 的每个闭区间段上一致收敛，则和函数 $S$ 在 $I$ 上连续。
2. **逐项积分**：若 $f_n \in \Cc([a,b], \K)$ 且 $\sum f_n$ 在 $[a,b]$ 上一致收敛，则数项级数 $\sum \int_a^b f_n$ 收敛，且
   $$\int_a^b \sum_{n=0}^\infty f_n = \sum_{n=0}^\infty \int_a^b f_n.$$
3. **逐项求导**：若 $f_n \in \Cc^1(I, \K)$，$\sum f_n$ 在 $I$ 上逐点收敛（只在某一点收敛也够），且 $\sum f_n'$ 在 $I$ 的每个闭区间段上一致收敛，则 $\sum f_n$ 在 $I$ 的每个闭区间段上一致收敛，和函数 $S \in \Cc^1(I, \K)$，且
   $$S' = \Big(\sum_{n=0}^\infty f_n\Big)' = \sum_{n=0}^\infty f_n'.$$
:::

::: fr
Soient $I$ un intervalle de $\R$ et $f_n : I \to \K$.

1. **Continuité** : si chaque $f_n$ est continue sur $I$ et si $\sum f_n$ converge uniformément sur tout segment de $I$, alors la fonction somme $S$ est continue sur $I$.
2. **Intégration terme à terme** : si $f_n \in \Cc([a,b], \K)$ et si $\sum f_n$ converge uniformément sur $[a,b]$, alors la série numérique $\sum \int_a^b f_n$ converge et
   $$\int_a^b \sum_{n=0}^\infty f_n = \sum_{n=0}^\infty \int_a^b f_n.$$
3. **Dérivation terme à terme** : si $f_n \in \Cc^1(I, \K)$, si $\sum f_n$ converge simplement sur $I$ (la convergence en un point suffit) et si $\sum f_n'$ converge uniformément sur tout segment de $I$, alors $\sum f_n$ converge uniformément sur tout segment de $I$, sa somme $S$ appartient à $\Cc^1(I, \K)$ et
   $$S' = \Big(\sum_{n=0}^\infty f_n\Big)' = \sum_{n=0}^\infty f_n'.$$
:::

::: proof
▷ 思路：把 {@c3-cont-segments}、{@integration-unif}、{@derivation-suite} 用于部分和函数列 $S_n = \sum_{k \le n} f_k$；有限和与积分、求导可以交换（线性）。

**1.**　每个 $S_n$ 是有限个连续函数之和，连续；由假设 $(S_n)$ 在每个闭区间段上一致收敛到 $S$。由 {@c3-cont-segments}，$S$ 在 $I$ 上连续。

**2.**　$S_n \in \Cc([a,b], \K)$，且 $(S_n)$ 在 $[a,b]$ 上一致收敛到 $S$。由 {@integration-unif}，$\int_a^b S_n \to \int_a^b S$。由积分的线性，$\int_a^b S_n = \sum_{k=0}^n \int_a^b f_k$，这是数项级数 $\sum \int_a^b f_k$ 的部分和。所以这个数项级数收敛，和为 $\int_a^b S$。

**3.**　$S_n \in \Cc^1(I, \K)$，且由求导的线性，$S_n' = \sum_{k=0}^n f_k'$ 是 $\sum f_k'$ 的部分和。由假设，$(S_n)$ 在某点收敛，$(S_n')$ 在每个闭区间段上一致收敛到 $T = \sum f_k'$。由 {@derivation-suite}，$(S_n)$ 在每个闭区间段上一致收敛到 $S \in \Cc^1(I, \K)$，且 $S' = T$。
:::

::: fr
▷ Méthode : on applique {@fr:c3-cont-segments}, {@fr:integration-unif} et {@fr:derivation-suite} à la suite des sommes partielles $S_n = \sum_{k \le n} f_k$ ; les sommes finies commutent avec l'intégrale et la dérivée (linéarité).

**1.**　Chaque $S_n$ est une somme finie de fonctions continues, donc continue ; par hypothèse, $(S_n)$ converge uniformément vers $S$ sur tout segment. D'après {@fr:c3-cont-segments}, $S$ est continue sur $I$.

**2.**　On a $S_n \in \Cc([a,b], \K)$ et $(S_n)$ converge uniformément vers $S$ sur $[a,b]$. D'après {@fr:integration-unif}, $\int_a^b S_n \to \int_a^b S$. Par linéarité de l'intégrale, $\int_a^b S_n = \sum_{k=0}^n \int_a^b f_k$ est la somme partielle de la série numérique $\sum \int_a^b f_k$. Cette série converge donc, de somme $\int_a^b S$.

**3.**　On a $S_n \in \Cc^1(I, \K)$ et, par linéarité de la dérivation, $S_n' = \sum_{k=0}^n f_k'$ est la somme partielle de $\sum f_k'$. Par hypothèse, $(S_n)$ converge en un point et $(S_n')$ converge uniformément sur tout segment vers $T = \sum f_k'$. D'après {@fr:derivation-suite}, $(S_n)$ converge uniformément sur tout segment vers $S \in \Cc^1(I, \K)$ et $S' = T$.
:::

::: rem
1. $\Cc^k$ 与 $\Cc^\infty$ 的版本：把 {@c3-derivation-ck} 用于部分和。若对每个 $j \le k - 1$，$\sum f_n^{(j)}$ 逐点收敛，且 $\sum f_n^{(k)}$ 在每个闭区间段上一致收敛，则 $S \in \Cc^k$，$S^{(j)} = \sum f_n^{(j)}$。
2. 实际验证时，「在每个闭区间段上一致收敛」通常通过「在每个闭区间段上正规收敛」得到（{@normale-unif}），而且常常只需检查形如 $[a, +\infty[$ 或 $[-a, a]$ 的集合，因为每个闭区间段都含于其中某一个。
:::

::: cor id=c3-limite-terme-a-terme zh="逐项取极限" en="Term-by-term passage to the limit" fr="Théorème de la double limite pour les séries" ru="Почленный предельный переход" lvl=1
设 $\sum f_n$ 在 $A$ 上一致收敛，$a$ 如 {@double-limite} 中所设，且对每个 $n$，$f_n(x) \to \ell_n \in \K$（$x \to a$）。则数项级数 $\sum \ell_n$ 收敛，且
$$\lim_{x \to a} \sum_{n=0}^\infty f_n(x) = \sum_{n=0}^\infty \ell_n.$$
:::

::: fr
Supposons que $\sum f_n$ converge uniformément sur $A$, que $a$ est comme dans {@fr:double-limite} et que, pour tout $n$, $f_n(x) \to \ell_n \in \K$ quand $x \to a$. Alors la série numérique $\sum \ell_n$ converge et
$$\lim_{x \to a} \sum_{n=0}^\infty f_n(x) = \sum_{n=0}^\infty \ell_n.$$
:::

::: proof
▷ 思路：把二重极限定理用于部分和。

**第 1 步**　部分和 $S_n = \sum_{k=0}^n f_k$ 满足：$S_n(x) \to L_n := \sum_{k=0}^n \ell_k$（$x \to a$），因为有限和的极限等于极限的和。

**第 2 步**　$(S_n)$ 在 $A$ 上一致收敛到 $S$。由 {@double-limite}，数列 $(L_n)$ 收敛到某个 $\ell$，且 $S(x) \to \ell$（$x \to a$）。

$(L_n)$ 是 $\sum \ell_n$ 的部分和，所以 $\sum \ell_n$ 收敛且其和为 $\ell = \lim_{x \to a} S(x)$。
:::

::: fr
▷ Méthode : on applique le théorème de la double limite aux sommes partielles.

**Étape 1**　Les sommes partielles $S_n = \sum_{k=0}^n f_k$ vérifient $S_n(x) \to L_n := \sum_{k=0}^n \ell_k$ quand $x \to a$, car la limite d'une somme finie est la somme des limites.

**Étape 2**　$(S_n)$ converge uniformément vers $S$ sur $A$. D'après {@fr:double-limite}, la suite $(L_n)$ converge vers un certain $\ell$ et $S(x) \to \ell$ quand $x \to a$.

Comme $(L_n)$ est la suite des sommes partielles de $\sum \ell_n$, cette série converge et sa somme vaut $\ell = \lim_{x \to a} S(x)$.
:::

::: ex id=zeta-regularite lvl=1 zh="ζ 函数的正则性"
$\zeta(s) = \sum_{n \ge 1} n^{-s}$ 在 $]1, +\infty[$ 上是 $\Cc^\infty$ 的；它在 $]1, +\infty[$ 上不一致收敛；$\zeta(s) \sim \frac{1}{s - 1}$（$s \to 1^+$），$\zeta(s) \to 1$（$s \to +\infty$）。

- **$\Cc^\infty$**：记 $f_n(s) = n^{-s} = \e^{-s\ln n}$，则 $f_n^{(k)}(s) = (-\ln n)^k n^{-s}$。固定 $a > 1$，对 $s \ge a$，$\abs{f_n^{(k)}(s)} \le (\ln n)^k n^{-a}$。令 $b = \frac{1 + a}{2} > 1$，则 $(\ln n)^k n^{-a} = n^{-b} \cdot (\ln n)^k n^{-(a-1)/2}$，而 $(\ln n)^k n^{-(a-1)/2} \to 0$（对数被幂次压倒），所以 $(\ln n)^k n^{-a} = o(n^{-b})$，$\sum (\ln n)^k n^{-a}$ 收敛（{@comparaison}、{@riemann-series}）。因此对每个 $k \ge 0$，$\sum f_n^{(k)}$ 在 $[a, +\infty[$ 上正规收敛。每个闭区间段 $[c, d] \subset ]1, +\infty[$ 都含于 $[c, +\infty[$（$c > 1$），由 {@transferts-series} 后的注（$\Cc^\infty$ 版本），$\zeta \in \Cc^\infty(]1, +\infty[)$，且 $\zeta^{(k)}(s) = \sum_{n \ge 1} (-\ln n)^k n^{-s}$。
- **在 $]1, +\infty[$ 上不一致收敛**：若一致收敛，由 {@c3-limite-terme-a-terme}（$a = 1$，每项 $n^{-s} \to \frac1n$），$\sum \frac1n$ 应收敛，矛盾。
- **$s \to 1^+$ 时的等价**：$s > 1$ 时 $t \mapsto t^{-s}$ 递减，所以对 $n \ge 1$，$\int_n^{n+1} t^{-s}\,\dd t \le n^{-s}$，对 $n \ge 2$，$n^{-s} \le \int_{n-1}^n t^{-s}\,\dd t$。求和（级数–积分比较，{@serie-integrale}）：
  $$\frac{1}{s - 1} = \int_1^{+\infty} t^{-s}\,\dd t \le \zeta(s) \le 1 + \int_1^{+\infty} t^{-s}\,\dd t = 1 + \frac{1}{s - 1}.$$
  乘以 $s - 1 > 0$：$1 \le (s - 1)\zeta(s) \le s$，令 $s \to 1^+$，得 $(s - 1)\zeta(s) \to 1$，即 $\zeta(s) \sim \frac{1}{s - 1}$。
- **$s \to +\infty$**：在 $[2, +\infty[$ 上 $\abs{n^{-s}} \le n^{-2}$，正规收敛从而一致收敛。$s \to +\infty$ 时 $1^{-s} = 1$，而 $n \ge 2$ 时 $n^{-s} \to 0$。由 {@c3-limite-terme-a-terme}，$\zeta(s) \to 1$。
:::

::: ex id=ex-alternee-unif lvl=1
$\sum_{n \ge 1} \frac{(-1)^n}{n + x}$ 在 $[0, +\infty[$ 上一致收敛，但不正规收敛，而且在任何一点都不绝对收敛。

- **一致收敛**：固定 $x \ge 0$，$\big(\frac{1}{n + x}\big)_n$ 递减趋于 $0$。由交错级数判别法与余项估计 {@csa}，级数收敛，且 $\abs{R_n(x)} \le \frac{1}{n + 1 + x} \le \frac{1}{n + 1}$。上界与 $x$ 无关，由 {@c3-reste-unif}，一致收敛。由 {@transferts-series}，和函数在 $[0, +\infty[$ 上连续。
- **不正规收敛**：$\sup_{x \ge 0} \frac{1}{n + x} = \frac1n$（在 $x = 0$ 处取到），$\sum \frac1n$ 发散。
- **不绝对收敛**：$\frac{1}{n + x} \sim \frac1n$（$n \to \infty$），由 {@comparaison}，$\sum \frac{1}{n+x}$ 发散。
:::

交错级数的余项估计之所以有效，是因为它利用了**符号的抵消**。下面的 Dirichlet 判别法是这一想法的一般形式。

::: thm id=dirichlet-unif zh="一致收敛的 Dirichlet 判别法" en="Dirichlet's test for uniform convergence" fr="Critère d'Abel uniforme" ru="Признак Дирихле равномерной сходимости" lvl=2
设 $a_n : A \to \R$，$b_n : A \to \K$，满足

1. 对每个 $x \in A$，$(a_n(x))_n$ 是递减的非负实数列，且 $(a_n)$ 在 $A$ 上一致收敛到 $0$；
2. $\sum b_n$ 的部分和在 $A$ 上一致有界：存在 $M$，使对一切 $n$ 与一切 $x \in A$，$\big|\sum_{k=0}^n b_k(x)\big| \le M$。

则 $\sum a_n b_n$ 在 $A$ 上一致收敛。
:::

::: fr
Soient $a_n : A \to \R$ et $b_n : A \to \K$ telles que

1. pour tout $x \in A$, la suite $(a_n(x))_n$ est décroissante et positive, et $(a_n)$ converge uniformément vers $0$ sur $A$ ;
2. les sommes partielles de $\sum b_n$ sont uniformément bornées sur $A$ : il existe $M$ tel que pour tout $n$ et tout $x \in A$, $\big|\sum_{k=0}^n b_k(x)\big| \le M$.

Alors $\sum a_n b_n$ converge uniformément sur $A$.
:::

::: sketch
▷ 思路：重复 {@dirichlet-series} 的证明（Abel 变换 {@abel-transform}），检查每一步的估计都与 $x$ 无关，然后用一致 Cauchy 准则。

**第 1 步（Abel 变换）**　记 $B_n(x) = \sum_{k=0}^n b_k(x)$（$B_{-1} = 0$），则 $b_k = B_k - B_{k-1}$。对 $q > p \ge 1$（常规计算：把求和指标平移后合并）：
$$\sum_{k=p}^{q} a_k b_k = a_q B_q - a_p B_{p-1} + \sum_{k=p}^{q-1} (a_k - a_{k+1}) B_k.$$

**第 2 步（估计）**　由假设 2，$\abs{B_k(x)} \le M$；由假设 1，$a_k(x) - a_{k+1}(x) \ge 0$。所以
$$\Big|\sum_{k=p}^q a_k(x) b_k(x)\Big| \le M a_q(x) + M a_p(x) + M\sum_{k=p}^{q-1}\big(a_k(x) - a_{k+1}(x)\big) = 2M a_p(x) \le 2M\norm{a_p}_{\infty, A}$$
（求和是望远镜和，等于 $a_p(x) - a_q(x)$）。

**第 3 步（一致 Cauchy）**　设 $\eps > 0$。由假设 1，存在 $N$，使 $p \ge N$ 时 $2M\norm{a_p}_{\infty, A} \le \eps$。于是对 $q \ge p \ge N + 1$ 与一切 $x \in A$，$\big|\sum_{k=p}^q a_k b_k(x)\big| \le \eps$。由 {@c3-reste-unif} 第 2 条，$\sum a_n b_n$ 在 $A$ 上一致收敛。
:::

::: fr
▷ Méthode : on reprend la preuve de {@fr:dirichlet-series} (transformation d'Abel {@fr:abel-transform}), on vérifie que chaque majoration est indépendante de $x$, puis on applique le critère de Cauchy uniforme.

**Étape 1 (transformation d'Abel)**　Notons $B_n(x) = \sum_{k=0}^n b_k(x)$ ($B_{-1} = 0$), de sorte que $b_k = B_k - B_{k-1}$. Pour $q > p \ge 1$ (calcul de routine : décalage d'indice puis regroupement) :
$$\sum_{k=p}^{q} a_k b_k = a_q B_q - a_p B_{p-1} + \sum_{k=p}^{q-1} (a_k - a_{k+1}) B_k.$$

**Étape 2 (majoration)**　D'après l'hypothèse 2, $\abs{B_k(x)} \le M$ ; d'après l'hypothèse 1, $a_k(x) - a_{k+1}(x) \ge 0$. Donc
$$\Big|\sum_{k=p}^q a_k(x) b_k(x)\Big| \le M a_q(x) + M a_p(x) + M\sum_{k=p}^{q-1}\big(a_k(x) - a_{k+1}(x)\big) = 2M a_p(x) \le 2M\norm{a_p}_{\infty, A}$$
(la somme est télescopique et vaut $a_p(x) - a_q(x)$).

**Étape 3 (Cauchy uniforme)**　Soit $\eps > 0$. D'après l'hypothèse 1, il existe $N$ tel que pour $p \ge N$, $2M\norm{a_p}_{\infty, A} \le \eps$. Alors, pour $q \ge p \ge N + 1$ et tout $x \in A$, $\big|\sum_{k=p}^q a_k b_k(x)\big| \le \eps$. D'après le point 2 de {@fr:c3-reste-unif}, $\sum a_n b_n$ converge uniformément sur $A$.
:::

::: ex id=c3-ex-sin-nx lvl=1
$\sum_{n \ge 1} \frac{\sin(nx)}{n}$：在每个 $[\delta, 2\pi - \delta]$（$0 < \delta < \pi$）上一致收敛，但在 $]0, 2\pi[$ 上不一致收敛；和函数在 $]0, 2\pi[$ 上连续。

- **在 $[\delta, 2\pi - \delta]$ 上一致收敛**：取 $a_n = \frac1n$（与 $x$ 无关，递减趋于 $0$），$b_n(x) = \sin(nx)$。由 $\abs{1 - \e^{\ii x}} = 2\abs{\sin\frac x2}$，
  $$\Big|\sum_{k=1}^n \sin(kx)\Big| \le \Big|\sum_{k=1}^n \e^{\ii kx}\Big| = \Big|\frac{\e^{\ii x}(1 - \e^{\ii nx})}{1 - \e^{\ii x}}\Big| \le \frac{2}{\abs{1 - \e^{\ii x}}} = \frac{1}{\abs{\sin(x/2)}}.$$
  对 $x \in [\delta, 2\pi - \delta]$，$\frac x2 \in [\frac\delta2, \pi - \frac\delta2]$，$\sin\frac x2 \ge \sin\frac\delta2 > 0$，所以部分和被 $M = 1/\sin\frac\delta2$ 一致控制。由 {@dirichlet-unif}，一致收敛。
- **在 $]0, 2\pi[$ 上不一致收敛**：对 $n \ge 1$ 取 $x_n = \frac{\pi}{4n}$。对 $n + 1 \le k \le 2n$，$kx_n \in \left]\frac\pi4, \frac\pi2\right]$，所以 $\sin(kx_n) \ge \sin\frac\pi4 = \frac{\sqrt2}{2}$，又 $\frac1k \ge \frac{1}{2n}$，于是
  $$\sum_{k=n+1}^{2n} \frac{\sin(kx_n)}{k} \ge n \cdot \frac{\sqrt2}{2} \cdot \frac{1}{2n} = \frac{\sqrt2}{4}.$$
  对 $\eps = \frac{\sqrt2}{8}$，无论 $N$ 多大，取 $n \ge N$、$p = n$、$q = 2n$、$x = x_n$，Cauchy 片段都 $> \eps$。由 {@c3-reste-unif} 第 2 条，收敛不一致。
- **和函数连续**：每个闭区间段 $[c, d] \subset ]0, 2\pi[$ 都含于某个 $[\delta, 2\pi - \delta]$（取 $\delta = \min(c, 2\pi - d, \frac\pi2)$），由 {@transferts-series} 第 1 条，和函数在 $]0, 2\pi[$ 上连续。（第 5 章将证明和函数等于 $\frac{\pi - x}{2}$。）
:::

::: q
$\sum_{n \ge 1} \frac{(-1)^n}{n} x^n$ 在 $[0, 1]$ 上正规收敛吗？一致收敛吗？
:::

::: ans
不正规：$\norm{\frac{x^n}{n}}_{\infty, [0,1]} = \frac1n$，$\sum \frac1n$ 发散。

一致收敛：对固定的 $x \in [0, 1]$，$\big(\frac{x^n}{n}\big)_n$ 递减趋于 $0$，由 {@csa}，$\abs{R_n(x)} \le \frac{x^{n+1}}{n+1} \le \frac{1}{n+1}$，上界与 $x$ 无关。所以和函数在 $[0, 1]$ 上连续——第 4 章由此得到 $\sum \frac{(-1)^{n+1}}{n} = \ln 2$（{@ln2}）。
:::

::: q
$\sum_{n \ge 0} x\,\e^{-nx}$ 在 $[0, +\infty[$ 上一致收敛吗？在 $[a, +\infty[$（$a > 0$）上呢？
:::

::: ans
和函数：$x = 0$ 时每项为 $0$，$S(0) = 0$；$x > 0$ 时是公比 $\e^{-x} < 1$ 的几何级数，$S(x) = \frac{x}{1 - \e^{-x}} \to 1$（$x \to 0^+$）。每项连续而 $S$ 在 $0$ 处不连续，所以在 $[0, +\infty[$ 上不一致收敛（{@cont-limite-unif} 用于部分和）。

在 $[a, +\infty[$ 上正规收敛：$\frac{\dd}{\dd x}(x\e^{-nx}) = \e^{-nx}(1 - nx) \le 0$ 当 $x \ge \frac1n$，所以对 $n \ge \frac1a$，$\norm{x\e^{-nx}}_{\infty, [a, +\infty[} = a\,\e^{-na}$，而 $\sum a\,\e^{-na}$ 是收敛的几何级数。
:::

## 逼近定理

前几节研究「已知一列函数，极限有什么性质」。反过来的问题是：**一个给定的函数能否被简单函数一致逼近？** 若能，就可以先对简单函数证明某个性质，再取极限（第 5 章的 Riemann–Lebesgue 引理就是这样证明的）。本节的主角是 Weierstrass 定理：闭区间段上的连续函数可以被多项式一致逼近。我们用 Bernstein 多项式给出构造性证明，先准备三个恒等式。

::: lem id=c3-bernstein zh="Bernstein 恒等式" en="Bernstein identities" fr="Identités de Bernstein" ru="Тождества для многочленов Бернштейна" lvl=1
设 $n \ge 1$，$x \in \R$，$p_{n,k}(x) = \binom nk x^k (1 - x)^{n-k}$（$0 \le k \le n$）。则
$$\sum_{k=0}^n p_{n,k}(x) = 1, \qquad \sum_{k=0}^n k\,p_{n,k}(x) = nx, \qquad \sum_{k=0}^n (k - nx)^2\, p_{n,k}(x) = nx(1 - x).$$
:::

::: fr
Soient $n \ge 1$, $x \in \R$ et $p_{n,k}(x) = \binom nk x^k (1 - x)^{n-k}$ ($0 \le k \le n$). Alors
$$\sum_{k=0}^n p_{n,k}(x) = 1, \qquad \sum_{k=0}^n k\,p_{n,k}(x) = nx, \qquad \sum_{k=0}^n (k - nx)^2\, p_{n,k}(x) = nx(1 - x).$$
:::

::: proof
▷ 思路：三式都来自二项式定理，配合恒等式 $k\binom nk = n\binom{n-1}{k-1}$。概率解释：$x \in [0,1]$ 时 $p_{n,k}(x)$ 是二项分布 $\mathcal{B}(n, x)$ 取值 $k$ 的概率，三式分别说「总概率为 $1$」「均值为 $nx$」「方差为 $nx(1-x)$」。

**第 1 式**　由二项式定理，$\sum_{k=0}^n \binom nk x^k (1-x)^{n-k} = \big(x + (1 - x)\big)^n = 1$。

**第 2 式**　$k = 0$ 的项为 $0$。对 $1 \le k \le n$，
$$k\binom nk = \frac{k \cdot n!}{k!\,(n-k)!} = n \cdot \frac{(n-1)!}{(k-1)!\,(n-k)!} = n\binom{n-1}{k-1}.$$
令 $j = k - 1$，
$$\sum_{k=0}^n k\,p_{n,k}(x) = n\sum_{k=1}^n \binom{n-1}{k-1} x^k (1-x)^{n-k} = nx \sum_{j=0}^{n-1} \binom{n-1}{j} x^j (1-x)^{n-1-j} = nx,$$
最后一步是第 1 式（$n - 1$ 代替 $n$；$n = 1$ 时这个和只有一项，等于 $1$）。

**第 3 式**　先算 $\sum_k k(k-1)\,p_{n,k}(x)$。若 $n = 1$，$k \in \{0, 1\}$ 时 $k(k-1) = 0$，和为 $0 = n(n-1)x^2$。若 $n \ge 2$，对 $2 \le k \le n$，把第 2 式中的恒等式用两次：$k(k-1)\binom nk = n(n-1)\binom{n-2}{k-2}$，同样得
$$\sum_{k=0}^n k(k-1)\,p_{n,k}(x) = n(n-1)x^2 \sum_{j=0}^{n-2} \binom{n-2}{j} x^j (1-x)^{n-2-j} = n(n-1)x^2.$$
再把 $(k - nx)^2$ 展开成 $k(k-1) + k - 2nx\,k + n^2x^2$，由前面三个和：
$$\sum_{k=0}^n (k - nx)^2 p_{n,k}(x) = n(n-1)x^2 + nx - 2nx \cdot nx + n^2x^2 \cdot 1 = nx - nx^2 = nx(1-x).$$
:::

::: fr
▷ Méthode : les trois formules découlent de la formule du binôme et de l'identité $k\binom nk = n\binom{n-1}{k-1}$. Interprétation probabiliste : pour $x \in [0,1]$, $p_{n,k}(x)$ est la probabilité qu'une variable de loi binomiale $\mathcal{B}(n, x)$ vaille $k$ ; les trois formules disent que la probabilité totale vaut $1$, que l'espérance vaut $nx$ et que la variance vaut $nx(1-x)$.

**Première formule**　Par la formule du binôme, $\sum_{k=0}^n \binom nk x^k (1-x)^{n-k} = \big(x + (1 - x)\big)^n = 1$.

**Deuxième formule**　Le terme $k = 0$ est nul. Pour $1 \le k \le n$,
$$k\binom nk = \frac{k \cdot n!}{k!\,(n-k)!} = n \cdot \frac{(n-1)!}{(k-1)!\,(n-k)!} = n\binom{n-1}{k-1}.$$
Avec $j = k - 1$,
$$\sum_{k=0}^n k\,p_{n,k}(x) = n\sum_{k=1}^n \binom{n-1}{k-1} x^k (1-x)^{n-k} = nx \sum_{j=0}^{n-1} \binom{n-1}{j} x^j (1-x)^{n-1-j} = nx,$$
la dernière égalité étant la première formule (avec $n - 1$ au lieu de $n$ ; pour $n = 1$ la somme a un seul terme, égal à $1$).

**Troisième formule**　Calculons d'abord $\sum_k k(k-1)\,p_{n,k}(x)$. Si $n = 1$, $k(k-1) = 0$ pour $k \in \{0, 1\}$ et la somme vaut $0 = n(n-1)x^2$. Si $n \ge 2$, on applique deux fois l'identité précédente : $k(k-1)\binom nk = n(n-1)\binom{n-2}{k-2}$ pour $2 \le k \le n$, d'où de même
$$\sum_{k=0}^n k(k-1)\,p_{n,k}(x) = n(n-1)x^2 \sum_{j=0}^{n-2} \binom{n-2}{j} x^j (1-x)^{n-2-j} = n(n-1)x^2.$$
On développe ensuite $(k - nx)^2 = k(k-1) + k - 2nx\,k + n^2x^2$ et on utilise les trois sommes :
$$\sum_{k=0}^n (k - nx)^2 p_{n,k}(x) = n(n-1)x^2 + nx - 2nx \cdot nx + n^2x^2 \cdot 1 = nx - nx^2 = nx(1-x).$$
:::

::: thm id=weierstrass zh="Weierstrass 逼近定理" en="Weierstrass approximation theorem" fr="Théorème d'approximation de Weierstrass" ru="Теорема Вейерштрасса о приближении" lvl=1
设 $f \in \Cc([a,b], \K)$。对任意 $\eps > 0$，存在多项式函数 $P$，使 $\norm{f - P}_{\infty, [a,b]} \le \eps$。换言之，$[a,b]$ 上的任何连续函数都是多项式函数的一致极限：多项式在 $(\Cc([a,b]), \norm{\cdot}_\infty)$ 中稠密。
:::

::: fr
Soit $f \in \Cc([a,b], \K)$. Pour tout $\eps > 0$, il existe une fonction polynomiale $P$ telle que $\norm{f - P}_{\infty, [a,b]} \le \eps$. Autrement dit, toute fonction continue sur $[a,b]$ est limite uniforme de fonctions polynomiales : les polynômes sont denses dans $(\Cc([a,b]), \norm{\cdot}_\infty)$.
:::

::: proof
▷ 思路：给出显式的逼近——**Bernstein 多项式**
$$B_n f(x) = \sum_{k=0}^n f\Big(\frac kn\Big) p_{n,k}(x), \qquad p_{n,k}(x) = \binom nk x^k (1-x)^{n-k}.$$
它是 $f$ 在格点 $\frac kn$ 处取值的加权平均，权重 $p_{n,k}(x)$ 集中在 $\frac kn \approx x$ 附近（二项分布集中在均值附近）。把误差分成「近处」与「远处」两部分：近处用一致连续性，远处用方差估计（Chebyshev 不等式的思想）。

**第 0 步（化归到 $[0, 1]$）**　若 $a = b$，取常数多项式 $P = f(a)$。设 $a < b$，令 $g(t) = f\big(a + t(b - a)\big)$，$g \in \Cc([0,1], \K)$。若多项式 $Q$ 满足 $\norm{g - Q}_{\infty, [0,1]} \le \eps$，则 $P(x) = Q\big(\frac{x - a}{b - a}\big)$ 是多项式，且由于 $x \mapsto \frac{x - a}{b - a}$ 是 $[a,b]$ 到 $[0,1]$ 的双射，$\norm{f - P}_{\infty, [a,b]} = \norm{g - Q}_{\infty, [0,1]} \le \eps$。所以只需对 $[a,b] = [0,1]$ 证明。下面的论证对 $\K = \R$ 与 $\K = \C$ 逐字相同。

**第 1 步（误差的表示）**　设 $n \ge 1$，$x \in [0, 1]$。由 {@c3-bernstein} 第 1 式，$f(x) = \sum_k f(x)\,p_{n,k}(x)$，所以
$$B_n f(x) - f(x) = \sum_{k=0}^n \Big(f\Big(\frac kn\Big) - f(x)\Big) p_{n,k}(x).$$
$x \in [0,1]$ 时 $p_{n,k}(x) \ge 0$，由三角不等式，
$$\abs{B_n f(x) - f(x)} \le \sum_{k=0}^n \Big|f\Big(\frac kn\Big) - f(x)\Big|\, p_{n,k}(x).$$

**第 2 步（翻译一致连续性）**　设 $\eps > 0$。由 Heine 定理 {@heine}，$f$ 在 $[0,1]$ 上一致连续：存在 $\delta > 0$，使对一切 $s, t \in [0, 1]$，$\abs{s - t} < \delta \Rightarrow \abs{f(s) - f(t)} \le \eps$。记 $M = \norm{f}_{\infty, [0,1]}$（有限，{@image-compact}）。

**第 3 步（近处的项）**　令 $K_1 = \{k : \abs{\frac kn - x} < \delta\}$，$K_2 = \{k : \abs{\frac kn - x} \ge \delta\}$。对 $k \in K_1$，$\abs{f(\frac kn) - f(x)} \le \eps$（第 2 步），所以
$$\sum_{k \in K_1} \Big|f\Big(\frac kn\Big) - f(x)\Big|\, p_{n,k}(x) \le \eps \sum_{k \in K_1} p_{n,k}(x) \le \eps \sum_{k=0}^n p_{n,k}(x) = \eps.$$

**第 4 步（远处的项）**　对 $k \in K_2$，$\abs{f(\frac kn) - f(x)} \le 2M$，且 $\abs{k - nx} \ge n\delta$，即 $1 \le \frac{(k - nx)^2}{n^2\delta^2}$。所以
$$\begin{aligned}
\sum_{k \in K_2} \Big|f\Big(\frac kn\Big) - f(x)\Big|\, p_{n,k}(x) &\le 2M \sum_{k \in K_2} \frac{(k - nx)^2}{n^2\delta^2}\, p_{n,k}(x) && \text{（乘以一个} \ge 1 \text{ 的因子）}\\
&\le \frac{2M}{n^2\delta^2} \sum_{k=0}^n (k - nx)^2\, p_{n,k}(x) && \text{（补上非负项）}\\
&= \frac{2M}{n^2\delta^2} \cdot nx(1 - x) && \text{（{@c3-bernstein} 第 3 式）}\\
&\le \frac{2M}{n^2\delta^2} \cdot \frac n4 = \frac{M}{2n\delta^2} && \big(x(1 - x) \le \tfrac14\big).
\end{aligned}$$

**第 5 步（与 $x$ 无关的估计）**　由第 1、3、4 步，对一切 $x \in [0, 1]$ 与 $n \ge 1$，
$$\abs{B_n f(x) - f(x)} \le \eps + \frac{M}{2n\delta^2}.$$

**第 6 步（选 $N$）**　令 $N = E\big(\frac{M}{2\delta^2\eps}\big) + 1$，则 $N > \frac{M}{2\delta^2\eps}$，于是 $n \ge N$ 时 $\frac{M}{2n\delta^2} \le \frac{M}{2N\delta^2} < \eps$。所以 $n \ge N$ 时 $\norm{B_n f - f}_{\infty, [0,1]} \le 2\eps$。

这就证明了 $B_n f$ 在 $[0, 1]$ 上一致收敛到 $f$。对给定的 $\eps$，把上面的 $\eps$ 换成 $\eps/2$，$P = B_N f$ 即为所求的多项式。
:::

::: fr
▷ Méthode : on construit explicitement l'approximation — les **polynômes de Bernstein**
$$B_n f(x) = \sum_{k=0}^n f\Big(\frac kn\Big) p_{n,k}(x), \qquad p_{n,k}(x) = \binom nk x^k (1-x)^{n-k}.$$
C'est une moyenne pondérée des valeurs de $f$ aux points $\frac kn$, dont les poids $p_{n,k}(x)$ se concentrent près de $\frac kn \approx x$ (la loi binomiale se concentre autour de sa moyenne). On découpe l'erreur en une partie « proche », traitée par la continuité uniforme, et une partie « lointaine », traitée par la variance (idée de l'inégalité de Bienaymé–Tchebychev).

**Étape 0 (réduction à $[0, 1]$)**　Si $a = b$, le polynôme constant $P = f(a)$ convient. Supposons $a < b$ et posons $g(t) = f\big(a + t(b - a)\big)$, $g \in \Cc([0,1], \K)$. Si un polynôme $Q$ vérifie $\norm{g - Q}_{\infty, [0,1]} \le \eps$, alors $P(x) = Q\big(\frac{x - a}{b - a}\big)$ est un polynôme et, comme $x \mapsto \frac{x - a}{b - a}$ est une bijection de $[a,b]$ sur $[0,1]$, $\norm{f - P}_{\infty, [a,b]} = \norm{g - Q}_{\infty, [0,1]} \le \eps$. Il suffit donc de traiter le cas $[a,b] = [0,1]$. L'argument ci-dessous est identique pour $\K = \R$ et $\K = \C$.

**Étape 1 (expression de l'erreur)**　Soient $n \ge 1$ et $x \in [0, 1]$. D'après la première formule de {@fr:c3-bernstein}, $f(x) = \sum_k f(x)\,p_{n,k}(x)$, donc
$$B_n f(x) - f(x) = \sum_{k=0}^n \Big(f\Big(\frac kn\Big) - f(x)\Big) p_{n,k}(x).$$
Pour $x \in [0,1]$, $p_{n,k}(x) \ge 0$ ; par l'inégalité triangulaire,
$$\abs{B_n f(x) - f(x)} \le \sum_{k=0}^n \Big|f\Big(\frac kn\Big) - f(x)\Big|\, p_{n,k}(x).$$

**Étape 2 (on traduit la continuité uniforme)**　Soit $\eps > 0$. D'après le théorème de Heine {@fr:heine}, $f$ est uniformément continue sur $[0,1]$ : il existe $\delta > 0$ tel que pour tous $s, t \in [0, 1]$, $\abs{s - t} < \delta \Rightarrow \abs{f(s) - f(t)} \le \eps$. Notons $M = \norm{f}_{\infty, [0,1]}$ (fini, {@fr:image-compact}).

**Étape 3 (termes proches)**　Posons $K_1 = \{k : \abs{\frac kn - x} < \delta\}$ et $K_2 = \{k : \abs{\frac kn - x} \ge \delta\}$. Pour $k \in K_1$, $\abs{f(\frac kn) - f(x)} \le \eps$ (étape 2), donc
$$\sum_{k \in K_1} \Big|f\Big(\frac kn\Big) - f(x)\Big|\, p_{n,k}(x) \le \eps \sum_{k \in K_1} p_{n,k}(x) \le \eps \sum_{k=0}^n p_{n,k}(x) = \eps.$$

**Étape 4 (termes lointains)**　Pour $k \in K_2$, $\abs{f(\frac kn) - f(x)} \le 2M$ et $\abs{k - nx} \ge n\delta$, c'est-à-dire $1 \le \frac{(k - nx)^2}{n^2\delta^2}$. Donc
$$\begin{aligned}
\sum_{k \in K_2} \Big|f\Big(\frac kn\Big) - f(x)\Big|\, p_{n,k}(x) &\le 2M \sum_{k \in K_2} \frac{(k - nx)^2}{n^2\delta^2}\, p_{n,k}(x) && \text{(on multiplie par un facteur} \ge 1 \text{)}\\
&\le \frac{2M}{n^2\delta^2} \sum_{k=0}^n (k - nx)^2\, p_{n,k}(x) && \text{(on ajoute des termes positifs)}\\
&= \frac{2M}{n^2\delta^2} \cdot nx(1 - x) && \text{(troisième formule de {@fr:c3-bernstein})}\\
&\le \frac{2M}{n^2\delta^2} \cdot \frac n4 = \frac{M}{2n\delta^2} && \big(x(1 - x) \le \tfrac14\big).
\end{aligned}$$

**Étape 5 (majoration indépendante de $x$)**　D'après les étapes 1, 3 et 4, pour tout $x \in [0, 1]$ et tout $n \ge 1$,
$$\abs{B_n f(x) - f(x)} \le \eps + \frac{M}{2n\delta^2}.$$

**Étape 6 (choix de $N$)**　Posons $N = E\big(\frac{M}{2\delta^2\eps}\big) + 1$ ; alors $N > \frac{M}{2\delta^2\eps}$, donc pour $n \ge N$, $\frac{M}{2n\delta^2} \le \frac{M}{2N\delta^2} < \eps$. Ainsi, pour $n \ge N$, $\norm{B_n f - f}_{\infty, [0,1]} \le 2\eps$.

Ceci montre que $B_n f$ converge uniformément vers $f$ sur $[0, 1]$. Pour $\eps$ donné, on applique ce qui précède avec $\eps/2$ : le polynôme $P = B_N f$ convient.
:::

::: rem
1. **闭区间段不能换成 $\R$。** 若多项式列 $(P_n)$ 在 $\R$ 上一致收敛到 $f$，则 $f$ 是多项式。证明：取 $N$ 使 $n \ge N$ 时 $\norm{P_n - f}_{\infty, \R} \le 1$；则 $n \ge N$ 时 $P_n - P_N$ 是 $\R$ 上有界（被 $2$ 控制）的多项式，因而是常数 $c_n$（非常数多项式在 $\pm\infty$ 处模趋于 $+\infty$）。$c_n = P_n - P_N$ 一致收敛到 $f - P_N$，所以 $f - P_N$ 是常数 $c = \lim c_n$，$f = P_N + c$ 是多项式。因此 $\e^x$、$\sin x$ 不能在 $\R$ 上被多项式一致逼近。
2. **Bernstein 多项式收敛很慢。** 对 $f(x) = x^2$，由 {@c3-bernstein}，$B_n f(x) = \frac{1}{n^2}\sum_k k^2 p_{n,k}(x) = x^2 + \frac{x(1-x)}{n}$，误差恰为 $\frac{1}{4n}$（在 $x = \frac12$ 处）。它的价值在于显式与「保正性」：$f \ge 0 \Rightarrow B_n f \ge 0$。
3. 第 5 章给出另一个证明：先用 Fejér 定理以三角多项式逼近，再把三角多项式展开成幂级数并截断（{@trig-dense}）。
:::

::: thm id=escalier zh="阶梯函数逼近" en="Approximation by step functions" fr="Approximation uniforme par des fonctions en escalier" ru="Приближение ступенчатыми функциями" lvl=2
设 $f : [a,b] \to \K$ **分段连续**：存在分割 $a = a_0 < a_1 < \dots < a_m = b$，使每个 $f|_{]a_i, a_{i+1}[}$ 可以延拓成 $[a_i, a_{i+1}]$ 上的连续函数 $\tilde f_i$。则对任意 $\eps > 0$，存在 $[a,b]$ 上的阶梯函数 $\varphi$，使 $\norm{f - \varphi}_{\infty, [a,b]} \le \eps$。即分段连续函数是阶梯函数的一致极限。
:::

::: fr
Soit $f : [a,b] \to \K$ **continue par morceaux** : il existe une subdivision $a = a_0 < a_1 < \dots < a_m = b$ telle que chaque restriction $f|_{]a_i, a_{i+1}[}$ se prolonge en une fonction continue $\tilde f_i$ sur $[a_i, a_{i+1}]$. Alors pour tout $\eps > 0$, il existe une fonction en escalier $\varphi$ sur $[a,b]$ telle que $\norm{f - \varphi}_{\infty, [a,b]} \le \eps$. Autrement dit, toute fonction continue par morceaux est limite uniforme de fonctions en escalier.
:::

::: sketch
▷ 思路：在每一段上 $f$ 一致连续（延拓后用 Heine 定理）；取足够细的分割，在每个小开区间上用 $f$ 在左端点处的右极限代替 $f$。

**第 1 步（一致连续）**　设 $\eps > 0$。每个 $\tilde f_i$ 在闭区间段 $[a_i, a_{i+1}]$ 上连续，由 {@heine} 一致连续：存在 $\delta_i > 0$，使 $s, t \in [a_i, a_{i+1}]$，$\abs{s - t} < \delta_i \Rightarrow \abs{\tilde f_i(s) - \tilde f_i(t)} \le \eps$。令 $\delta = \min_i \delta_i > 0$（有限个正数的最小值）。

**第 2 步（加细分割）**　取整数 $L$ 使 $\frac{b - a}{L} < \delta$，把每个 $[a_i, a_{i+1}]$ 等分成 $L$ 段，得到包含所有 $a_i$ 的分割 $x_0 < x_1 < \dots < x_r$，且每段长度 $< \delta$。每个 $]x_j, x_{j+1}[$ 含于唯一的某个 $]a_i, a_{i+1}[$。

**第 3 步（定义 $\varphi$）**　在分点处令 $\varphi(x_j) = f(x_j)$；在 $]x_j, x_{j+1}[ \subset ]a_i, a_{i+1}[$ 上令 $\varphi \equiv \tilde f_i(x_j)$（$f$ 在 $x_j$ 处的右极限）。$\varphi$ 是阶梯函数。

**第 4 步（估计）**　在分点处 $f - \varphi = 0$。对 $x \in ]x_j, x_{j+1}[$，$f(x) = \tilde f_i(x)$，而 $\abs{x - x_j} < \delta \le \delta_i$，所以 $\abs{f(x) - \varphi(x)} = \abs{\tilde f_i(x) - \tilde f_i(x_j)} \le \eps$。

所以 $\norm{f - \varphi}_\infty \le \eps$。这是法国教材定义分段连续函数的积分的出发点：先对阶梯函数定义积分，再用一致逼近取极限。
:::

::: fr
▷ Méthode : sur chaque morceau, $f$ est uniformément continue (théorème de Heine appliqué au prolongement) ; on prend une subdivision assez fine et, sur chaque petit intervalle ouvert, on remplace $f$ par sa limite à droite en l'extrémité gauche.

**Étape 1 (continuité uniforme)**　Soit $\eps > 0$. Chaque $\tilde f_i$ est continue sur le segment $[a_i, a_{i+1}]$, donc uniformément continue d'après {@fr:heine} : il existe $\delta_i > 0$ tel que $s, t \in [a_i, a_{i+1}]$, $\abs{s - t} < \delta_i \Rightarrow \abs{\tilde f_i(s) - \tilde f_i(t)} \le \eps$. Posons $\delta = \min_i \delta_i > 0$ (minimum d'un nombre fini de réels strictement positifs).

**Étape 2 (subdivision plus fine)**　Soit $L$ un entier tel que $\frac{b - a}{L} < \delta$ ; en découpant chaque $[a_i, a_{i+1}]$ en $L$ parties égales, on obtient une subdivision $x_0 < x_1 < \dots < x_r$ contenant tous les $a_i$, de pas $< \delta$. Chaque $]x_j, x_{j+1}[$ est contenu dans un unique $]a_i, a_{i+1}[$.

**Étape 3 (définition de $\varphi$)**　Aux points de la subdivision, on pose $\varphi(x_j) = f(x_j)$ ; sur $]x_j, x_{j+1}[ \subset ]a_i, a_{i+1}[$, on pose $\varphi \equiv \tilde f_i(x_j)$ (limite à droite de $f$ en $x_j$). La fonction $\varphi$ est en escalier.

**Étape 4 (majoration)**　Aux points de la subdivision, $f - \varphi = 0$. Pour $x \in ]x_j, x_{j+1}[$, on a $f(x) = \tilde f_i(x)$ et $\abs{x - x_j} < \delta \le \delta_i$, donc $\abs{f(x) - \varphi(x)} = \abs{\tilde f_i(x) - \tilde f_i(x_j)} \le \eps$.

Ainsi $\norm{f - \varphi}_\infty \le \eps$. C'est le point de départ de la définition de l'intégrale des fonctions continues par morceaux dans les cours français : on intègre d'abord les fonctions en escalier, puis on passe à la limite uniforme.
:::

::: thm id=stone-weierstrass zh="Stone–Weierstrass 定理" en="Stone–Weierstrass theorem" fr="Théorème de Stone–Weierstrass" ru="Теорема Стоуна–Вейерштрасса" lvl=3 ref="Rudin, *Principles of Mathematical Analysis*，定理 7.32"
设 $K$ 是紧度量空间，$\mathcal{A} \subset \Cc(K, \R)$ 是子代数（对加法、乘法、数乘封闭），包含常数函数且**分离点**（对 $x \ne y$，存在 $g \in \mathcal{A}$ 使 $g(x) \ne g(y)$）。则 $\mathcal{A}$ 在 $(\Cc(K,\R), \norm{\cdot}_\infty)$ 中稠密。应用：三角多项式在 $2\pi$ 周期连续函数中稠密（第 5 章用 Fejér 定理直接证明，{@trig-dense}）。
:::

::: fr
Soient $K$ un espace métrique compact et $\mathcal{A} \subset \Cc(K, \R)$ une sous-algèbre (stable par somme, produit et multiplication par un scalaire) contenant les fonctions constantes et **séparant les points** (pour $x \ne y$, il existe $g \in \mathcal{A}$ telle que $g(x) \ne g(y)$). Alors $\mathcal{A}$ est dense dans $(\Cc(K,\R), \norm{\cdot}_\infty)$. Application : les polynômes trigonométriques sont denses dans les fonctions continues $2\pi$-périodiques (démontré directement au chapitre 5 par le théorème de Fejér, {@fr:trig-dense}).
:::

::: rem
Weierstrass 定理是 $K = [a, b]$、$\mathcal{A}$ = 多项式的特例（$x \mapsto x$ 分离点）。两个条件都不能去掉：在 $[0, 1]$ 上，没有常数项的多项式构成的代数分离点，但它们都在 $0$ 处为 $0$，一致极限也在 $0$ 处为 $0$，逼近不了常数 $1$；在 $[-1, 1]$ 上，偶多项式构成的代数含常数，但不分离 $x$ 与 $-x$（见下面的「想一想」）。
:::

::: thm id=muntz zh="Müntz–Szász 定理" en="Müntz–Szász theorem" fr="Théorème de Müntz" ru="Теорема Мюнца" lvl=3 ref="Rudin, *Real and Complex Analysis*，定理 15.26"
设 $0 < \lambda_1 < \lambda_2 < \cdots$，$\lambda_n \to \infty$。函数 $1, x^{\lambda_1}, x^{\lambda_2}, \dots$ 的线性组合在 $\Cc([0,1])$ 中稠密，当且仅当 $\sum \frac{1}{\lambda_n} = +\infty$。例如只用 $1$ 与 $x^{p}$（$p$ 为素数）构成的多项式也能一致逼近任何连续函数（Euler：$\sum_p \frac1p = +\infty$）；而只用 $1$ 与 $x^{n^2}$ 不行。
:::

::: fr
Soient $0 < \lambda_1 < \lambda_2 < \cdots$ avec $\lambda_n \to \infty$. Les combinaisons linéaires des fonctions $1, x^{\lambda_1}, x^{\lambda_2}, \dots$ sont denses dans $\Cc([0,1])$ si et seulement si $\sum \frac{1}{\lambda_n} = +\infty$. Par exemple, les polynômes formés de $1$ et des $x^p$ ($p$ premier) approchent uniformément toute fonction continue (Euler : $\sum_p \frac1p = +\infty$) ; ceux formés de $1$ et des $x^{n^2}$ ne le font pas.
:::

::: q
在 $[0, 1]$ 上，偶多项式（只含 $x^{2k}$ 的多项式）能一致逼近任意连续函数吗？在 $[-1, 1]$ 上呢？
:::

::: ans
在 $[0, 1]$ 上能。设 $f \in \Cc([0,1])$，令 $g(t) = f(\sqrt t)$，$g \in \Cc([0,1])$。由 {@weierstrass}，存在多项式 $Q$ 使 $\norm{g - Q}_{\infty, [0,1]} \le \eps$。令 $P(x) = Q(x^2)$（偶多项式），则对 $x \in [0, 1]$，$\abs{f(x) - P(x)} = \abs{g(x^2) - Q(x^2)} \le \eps$。

在 $[-1, 1]$ 上不能。偶多项式的一致极限是偶函数，所以 $f(x) = x$ 逼近不了。具体地，若偶多项式 $P$ 满足 $\norm{P - x}_{\infty, [-1,1]} \le \eps$，则 $\abs{P(1) - 1} \le \eps$ 且 $\abs{P(-1) + 1} = \abs{P(1) + 1} \le \eps$，相减得 $2 \le 2\eps$，所以 $\eps \ge 1$。
:::

::: q
设 $f \in \Cc([0,1], \R)$，且对一切 $n \in \N$，$\int_0^1 f(x)\,x^n\,\dd x = 0$。证明 $f = 0$。
:::

::: ans
由线性，对一切多项式 $P$，$\int_0^1 fP = 0$。由 {@weierstrass}，取多项式 $P_n$ 使 $\norm{P_n - f}_\infty \to 0$。则
$$\Big|\int_0^1 f^2 - \int_0^1 fP_n\Big| = \Big|\int_0^1 f(f - P_n)\Big| \le \norm{f}_\infty \norm{f - P_n}_\infty \to 0,$$
所以 $\int_0^1 f^2 = \lim \int_0^1 fP_n = 0$。$f^2$ 连续、非负、积分为 $0$，所以 $f^2 = 0$，即 $f = 0$。
:::

::: fr
Par linéarité, $\int_0^1 fP = 0$ pour tout polynôme $P$. D'après {@fr:weierstrass}, il existe des polynômes $P_n$ tels que $\norm{P_n - f}_\infty \to 0$. Alors
$$\Big|\int_0^1 f^2 - \int_0^1 fP_n\Big| = \Big|\int_0^1 f(f - P_n)\Big| \le \norm{f}_\infty \norm{f - P_n}_\infty \to 0,$$
donc $\int_0^1 f^2 = \lim \int_0^1 fP_n = 0$. Comme $f^2$ est continue, positive et d'intégrale nulle, $f^2 = 0$, c'est-à-dire $f = 0$.
:::

## 紧性：Arzelà–Ascoli 定理

在 $\K^n$ 中，有界序列有收敛子列（{@bw-kn}）。在 $(\Cc([0,1]), \norm{\cdot}_\infty)$ 中这不成立：$x^n$ 有界（被 $1$ 控制），但没有一致收敛的子列——任何子列都逐点收敛到不连续的 $\mathbf{1}_{\{1\}}$。要得到一致收敛的子列，还需要一个「所有 $f_n$ 一起连续」的条件。

::: def id=c3-def-equicontinue zh="一致有界与等度连续" en="Uniform boundedness and equicontinuity" fr="Suite uniformément bornée, suite équicontinue" ru="Равномерная ограниченность и равностепенная непрерывность"
设 $K$ 是赋范空间 $E$ 的子集，$f_n : K \to \K$。

- $(f_n)$ **一致有界**：$\exists M \ge 0,\ \forall n \in \N,\ \forall x \in K,\ \abs{f_n(x)} \le M$。
- $(f_n)$ **等度连续**：
  $$\forall \eps > 0,\ \exists \delta > 0,\ \forall n \in \N,\ \forall x, y \in K,\quad \norm{x - y} < \delta \Rightarrow \abs{f_n(x) - f_n(y)} < \eps.$$

白话：等度连续是说每个 $f_n$ 都一致连续，而且**同一个** $\delta$ 对所有 $n$ 都有效（$\delta$ 只依赖于 $\eps$）。
:::

::: fr
Soient $K$ une partie d'un espace vectoriel normé $E$ et $f_n : K \to \K$.

- $(f_n)$ est **uniformément bornée** si $\exists M \ge 0,\ \forall n \in \N,\ \forall x \in K,\ \abs{f_n(x)} \le M$.
- $(f_n)$ est **équicontinue** si
  $$\forall \eps > 0,\ \exists \delta > 0,\ \forall n \in \N,\ \forall x, y \in K,\quad \norm{x - y} < \delta \Rightarrow \abs{f_n(x) - f_n(y)} < \eps.$$

Autrement dit, chaque $f_n$ est uniformément continue, et **le même** $\delta$ convient pour tous les $n$ ($\delta$ ne dépend que de $\eps$).
:::

::: ex id=c3-ex-equicontinue lvl=1
1. **满足**：若所有 $f_n$ 都是 $L$-Lipschitz 的（同一个 $L > 0$），则 $(f_n)$ 等度连续：给定 $\eps$，取 $\delta = \eps/L$，则 $\norm{x - y} < \delta \Rightarrow \abs{f_n(x) - f_n(y)} \le L\norm{x - y} < \eps$。例如 $f_n(x) = \sin(x + n)$ 在 $\R$ 上：由中值定理与 $\abs{\cos} \le 1$，每个 $f_n$ 是 $1$-Lipschitz 的；它还被 $1$ 一致有界。
2. **不满足**：$f_n(x) = x^n$ 在 $[0, 1]$ 上。取 $\eps = \frac12$。对任意 $\delta \in \left]0, 1\right[$，令 $y = 1$，$x = 1 - \frac\delta2$，则 $\abs{x - y} < \delta$，但 $(1 - \frac\delta2)^n \to 0$，所以 $n$ 充分大时 $\abs{f_n(1) - f_n(x)} = 1 - (1 - \frac\delta2)^n > \frac12$。没有对所有 $n$ 都有效的 $\delta$。（每个 $f_n$ 单独都一致连续。）
:::

::: lem id=c3-precompact zh="紧集的有限 δ-网" en="Compact sets are totally bounded" fr="Un compact est précompact" ru="Компакт вполне ограничен" lvl=1
设 $K$ 是赋范空间中的紧集，$\delta > 0$。则存在有限个点 $y_1, \dots, y_r \in K$，使 $K \subset \bigcup_{j=1}^r B(y_j, \delta)$。
:::

::: fr
Soient $K$ un compact d'un espace vectoriel normé et $\delta > 0$. Il existe un nombre fini de points $y_1, \dots, y_r \in K$ tels que $K \subset \bigcup_{j=1}^r B(y_j, \delta)$.
:::

::: proof
▷ 思路：反证。若有限个球永远盖不住 $K$，就能逐个挑出两两距离 $\ge \delta$ 的点，这样的序列没有收敛子列，与紧性（{@def-compact}）矛盾。

若 $K = \emptyset$，取 $r = 0$。设 $K \ne \emptyset$，反设任何有限个以 $K$ 中点为中心、半径为 $\delta$ 的球都盖不住 $K$。

**第 1 步（归纳构造）**　任取 $y_0 \in K$。设已取定 $y_0, \dots, y_n \in K$；由反设，$\bigcup_{j \le n} B(y_j, \delta)$ 不包含 $K$，取 $y_{n+1} \in K$ 不属于其中任何一个球，即对一切 $j \le n$，$\norm{y_{n+1} - y_j} \ge \delta$。

**第 2 步（两两远离）**　由构造，对一切 $p \ne q$，$\norm{y_p - y_q} \ge \delta$。

**第 3 步（矛盾）**　由紧性，存在子列 $(y_{\varphi(n)})$ 收敛，从而是 Cauchy 列：存在 $N$，使 $n \ge N$ 时 $\norm{y_{\varphi(n+1)} - y_{\varphi(n)}} < \delta$。但 $\varphi(n+1) \ne \varphi(n)$，由第 2 步这个距离 $\ge \delta$，矛盾。

所以有限个球可以覆盖 $K$。
:::

::: fr
▷ Méthode : par l'absurde. Si aucun nombre fini de boules ne recouvre $K$, on choisit de proche en proche des points deux à deux à distance $\ge \delta$ ; une telle suite n'a pas de sous-suite convergente, ce qui contredit la compacité ({@fr:def-compact}).

Si $K = \emptyset$, on prend $r = 0$. Supposons $K \ne \emptyset$ et, par l'absurde, qu'aucune réunion finie de boules de rayon $\delta$ centrées en des points de $K$ ne recouvre $K$.

**Étape 1 (construction par récurrence)**　Soit $y_0 \in K$. Supposons $y_0, \dots, y_n \in K$ construits ; par hypothèse, $\bigcup_{j \le n} B(y_j, \delta)$ ne contient pas $K$ : choisissons $y_{n+1} \in K$ hors de toutes ces boules, c'est-à-dire $\norm{y_{n+1} - y_j} \ge \delta$ pour tout $j \le n$.

**Étape 2 (points éloignés)**　Par construction, $\norm{y_p - y_q} \ge \delta$ pour tous $p \ne q$.

**Étape 3 (contradiction)**　Par compacité, il existe une sous-suite $(y_{\varphi(n)})$ convergente, donc de Cauchy : il existe $N$ tel que pour $n \ge N$, $\norm{y_{\varphi(n+1)} - y_{\varphi(n)}} < \delta$. Or $\varphi(n+1) \ne \varphi(n)$, donc cette distance est $\ge \delta$ d'après l'étape 2 : contradiction.

Ainsi un nombre fini de boules recouvre $K$.
:::

::: thm id=arzela-ascoli zh="Arzelà–Ascoli 定理" en="Arzelà–Ascoli theorem" fr="Théorème d'Arzelà–Ascoli" ru="Теорема Арцела–Асколи" lvl=2
设 $K$ 是赋范空间中的紧集，$(f_n)$ 是 $\Cc(K, \K)$ 中**一致有界**且**等度连续**的函数列（{@c3-def-equicontinue}）。则 $(f_n)$ 有在 $K$ 上一致收敛的子列（其极限连续）。
:::

::: fr
Soient $K$ un compact d'un espace vectoriel normé et $(f_n)$ une suite de $\Cc(K, \K)$ **uniformément bornée** et **équicontinue** ({@fr:c3-def-equicontinue}). Alors $(f_n)$ admet une sous-suite qui converge uniformément sur $K$ (vers une fonction continue).
:::

::: sketch
▷ 思路：先在 $K$ 的一个可数稠密子集上，用对角线方法抽取一个处处收敛的子列；再用等度连续性与 $K$ 的有限 $\delta$-网，把「在稠密子集上收敛」升级为「一致 Cauchy」。

**第 1 步（可数稠密子集）**　设 $K \ne \emptyset$（否则无需证明）。对每个 $m \ge 1$，由 {@c3-precompact}，存在有限集 $F_m \subset K$ 使 $K \subset \bigcup_{y \in F_m} B(y, \frac1m)$。令 $D = \bigcup_{m \ge 1} F_m$，它是可数集，排成 $d_0, d_1, d_2, \dots$（有限时重复最后一个）。$D$ 在 $K$ 中稠密：对 $x \in K$ 与 $\eta > 0$，取 $m > 1/\eta$，存在 $y \in F_m$ 使 $\norm{x - y} < \frac1m < \eta$。

**第 2 步（对角线抽取）**　设 $\abs{f_n} \le M$。数列 $(f_n(d_0))_n$ 有界，由 {@bw-kn}，存在严格递增的 $\varphi_0$ 使 $(f_{\varphi_0(n)}(d_0))$ 收敛。归纳地，存在严格递增的 $\varphi_i$ 使 $(f_{\varphi_0 \circ \dots \circ \varphi_i(n)}(d_i))_n$ 收敛。令 $\psi(n) = \varphi_0 \circ \varphi_1 \circ \dots \circ \varphi_n(n)$，$g_n = f_{\psi(n)}$。（常规验证：$\psi$ 严格递增；对每个 $i$，$(\psi(n))_{n \ge i}$ 是 $(\varphi_0 \circ \dots \circ \varphi_i(n))_n$ 的子列。）所以对每个 $i$，$(g_n(d_i))_n$ 收敛。

**第 3 步（选 $\delta$ 与有限网）**　设 $\eps > 0$。由等度连续，存在 $\delta > 0$，使对一切 $n$，$\norm{x - y} < 2\delta \Rightarrow \abs{f_n(x) - f_n(y)} < \eps$。由 {@c3-precompact}，存在 $y_1, \dots, y_r \in K$ 使 $K \subset \bigcup_j B(y_j, \delta)$；由 $D$ 稠密，对每个 $j$ 取 $e_j \in D$ 使 $\norm{y_j - e_j} < \delta$。于是 $K \subset \bigcup_{j=1}^r B(e_j, 2\delta)$（三角不等式）。

**第 4 步（一致 Cauchy）**　有限个数列 $(g_n(e_j))_n$（$1 \le j \le r$）都收敛，从而都是 Cauchy 列：存在 $N$（取各 $N_j$ 的最大值），使 $p, q \ge N$ 时对一切 $j$，$\abs{g_p(e_j) - g_q(e_j)} < \eps$。对 $x \in K$，取 $j$ 使 $\norm{x - e_j} < 2\delta$，则对 $p, q \ge N$：
$$\abs{g_p(x) - g_q(x)} \le \abs{g_p(x) - g_p(e_j)} + \abs{g_p(e_j) - g_q(e_j)} + \abs{g_q(e_j) - g_q(x)} < 3\eps.$$
由 {@cauchy-unif}，$(g_n)$ 在 $K$ 上一致收敛；由 {@cont-limite-unif}，极限连续。
:::

::: fr
▷ Méthode : on extrait d'abord, par le procédé diagonal, une sous-suite qui converge en tout point d'une partie dénombrable dense de $K$ ; puis l'équicontinuité et un recouvrement fini de $K$ par des boules de rayon $\delta$ transforment « convergence sur une partie dense » en « critère de Cauchy uniforme ».

**Étape 1 (partie dénombrable dense)**　Supposons $K \ne \emptyset$ (sinon il n'y a rien à montrer). Pour tout $m \ge 1$, d'après {@fr:c3-precompact}, il existe un ensemble fini $F_m \subset K$ tel que $K \subset \bigcup_{y \in F_m} B(y, \frac1m)$. L'ensemble $D = \bigcup_{m \ge 1} F_m$ est dénombrable ; écrivons-le $d_0, d_1, d_2, \dots$ (en répétant le dernier terme s'il est fini). $D$ est dense dans $K$ : pour $x \in K$ et $\eta > 0$, on prend $m > 1/\eta$ ; il existe $y \in F_m$ tel que $\norm{x - y} < \frac1m < \eta$.

**Étape 2 (extraction diagonale)**　Soit $M$ tel que $\abs{f_n} \le M$. La suite $(f_n(d_0))_n$ est bornée ; d'après {@fr:bw-kn}, il existe une extractrice $\varphi_0$ telle que $(f_{\varphi_0(n)}(d_0))$ converge. Par récurrence, il existe des extractrices $\varphi_i$ telles que $(f_{\varphi_0 \circ \dots \circ \varphi_i(n)}(d_i))_n$ converge. Posons $\psi(n) = \varphi_0 \circ \varphi_1 \circ \dots \circ \varphi_n(n)$ et $g_n = f_{\psi(n)}$. (Vérification de routine : $\psi$ est strictement croissante et, pour tout $i$, $(\psi(n))_{n \ge i}$ est extraite de $(\varphi_0 \circ \dots \circ \varphi_i(n))_n$.) Ainsi, pour tout $i$, $(g_n(d_i))_n$ converge.

**Étape 3 (choix de $\delta$ et recouvrement fini)**　Soit $\eps > 0$. Par équicontinuité, il existe $\delta > 0$ tel que pour tout $n$, $\norm{x - y} < 2\delta \Rightarrow \abs{f_n(x) - f_n(y)} < \eps$. D'après {@fr:c3-precompact}, il existe $y_1, \dots, y_r \in K$ tels que $K \subset \bigcup_j B(y_j, \delta)$ ; par densité de $D$, on choisit pour chaque $j$ un point $e_j \in D$ tel que $\norm{y_j - e_j} < \delta$. Alors $K \subset \bigcup_{j=1}^r B(e_j, 2\delta)$ (inégalité triangulaire).

**Étape 4 (Cauchy uniforme)**　Les suites $(g_n(e_j))_n$ ($1 \le j \le r$), en nombre fini, convergent et sont donc de Cauchy : il existe $N$ (le maximum des $N_j$) tel que pour $p, q \ge N$ et tout $j$, $\abs{g_p(e_j) - g_q(e_j)} < \eps$. Pour $x \in K$, on choisit $j$ tel que $\norm{x - e_j} < 2\delta$ ; pour $p, q \ge N$,
$$\abs{g_p(x) - g_q(x)} \le \abs{g_p(x) - g_p(e_j)} + \abs{g_p(e_j) - g_q(e_j)} + \abs{g_q(e_j) - g_q(x)} < 3\eps.$$
D'après {@fr:cauchy-unif}, $(g_n)$ converge uniformément sur $K$ ; d'après {@fr:cont-limite-unif}, la limite est continue.
:::

::: rem
**三个条件都不能去掉。**

1. **一致有界**：$f_n = n$（常函数）等度连续，但没有收敛子列。
2. **等度连续**：$x^n$ 在 $[0, 1]$ 上被 $1$ 一致有界；它的任何子列都逐点收敛到不连续的 $\mathbf{1}_{\{1\}}$，所以没有一致收敛的子列（一致极限必须等于逐点极限且连续）。
3. **$K$ 紧**：$f_n(x) = h(x - n)$ 在 $\R$ 上（$h$ 是 {@c3-cex-bosses} 中的三角形），一致有界（被 $1$）、等度连续（都是 $2$-Lipschitz 的），但 $n \ne m$ 时 $\norm{f_n - f_m}_\infty \ge \abs{f_n(n) - f_m(n)} = 1$，任何子列都不是一致 Cauchy 列。

第 8 章用这个定理证明 Peano 存在性定理（{@cauchy-peano}）：Euler 折线近似解一致有界且等度连续。证明中一致有界只用于第 2 步，所以「逐点有界」就够了。
:::

::: q
反过来，设 $K$ 紧，$f_n \in \Cc(K, \K)$ 在 $K$ 上一致收敛到 $f$。证明 $(f_n)$ 一致有界且等度连续。
:::

::: ans
**一致有界**：取 $N$ 使 $n \ge N$ 时 $\norm{f_n - f}_\infty \le 1$；$f$ 连续（{@cont-limite-unif}），在紧集上有界（{@image-compact}）。令 $M = \max\big(\norm{f}_\infty + 1, \norm{f_0}_\infty, \dots, \norm{f_{N-1}}_\infty\big)$，则 $\abs{f_n} \le M$ 对一切 $n$ 成立。

**等度连续**：设 $\eps > 0$。取 $N$ 使 $n \ge N$ 时 $\norm{f_n - f}_\infty \le \eps/4$。由 Heine 定理（{@heine}），$f, f_0, \dots, f_{N-1}$ 都一致连续：取 $\delta_f$ 使 $\norm{x - y} < \delta_f \Rightarrow \abs{f(x) - f(y)} \le \eps/4$，取 $\delta_n$ 使 $\norm{x - y} < \delta_n \Rightarrow \abs{f_n(x) - f_n(y)} < \eps$（$n < N$），令 $\delta = \min(\delta_f, \delta_0, \dots, \delta_{N-1})$。对 $n \ge N$ 与 $\norm{x - y} < \delta$：$\abs{f_n(x) - f_n(y)} \le \abs{f_n(x) - f(x)} + \abs{f(x) - f(y)} + \abs{f(y) - f_n(y)} \le \frac{3\eps}{4} < \eps$；对 $n < N$，由 $\delta \le \delta_n$ 直接得到。
:::

## 拓展：病态函数

一致收敛保持连续性，却不保持可导性（{@c3-cex-derivee}）。把这一点推到极端，就得到处处连续而处处不可导的函数，以及填满正方形的连续曲线。证明处处不可导需要一个关于差商的引理。

::: lem id=c3-taux-encadrant zh="夹住一点的差商" en="Difference quotients straddling a point" fr="Taux d'accroissement encadrant un point" ru="Разностные отношения на отрезках, содержащих точку" lvl=1
设 $g$ 是定义在包含 $x$ 的区间上的实值函数，在 $x$ 处可导。设 $u_m \le x \le v_m$，$u_m < v_m$，且 $v_m - u_m \to 0$。则
$$D_m = \frac{g(v_m) - g(u_m)}{v_m - u_m} \xrightarrow[m \to \infty]{} g'(x).$$
:::

::: fr
Soit $g$ une fonction réelle définie sur un intervalle contenant $x$ et dérivable en $x$. Soient $u_m \le x \le v_m$ avec $u_m < v_m$ et $v_m - u_m \to 0$. Alors
$$D_m = \frac{g(v_m) - g(u_m)}{v_m - u_m} \xrightarrow[m \to \infty]{} g'(x).$$
:::

::: proof
▷ 思路：把 $g(v_m) - g(u_m)$ 拆成 $[u_m, x]$ 与 $[x, v_m]$ 上的两个增量，每一个都用一阶 Taylor 展开估计；因为 $x$ 夹在中间，两段长度之和恰好是 $v_m - u_m$。

**第 1 步（翻译可导）**　设 $\eps > 0$。由 $g$ 在 $x$ 处可导，存在 $\rho > 0$，使对 $\abs{t - x} < \rho$（$t$ 在定义域中），
$$\abs{g(t) - g(x) - g'(x)(t - x)} \le \eps\abs{t - x}.$$

**第 2 步（选 $M$）**　由 $v_m - u_m \to 0$，存在 $M$，使 $m \ge M$ 时 $v_m - u_m < \rho$。由 $u_m \le x \le v_m$，此时 $0 \le v_m - x < \rho$ 且 $0 \le x - u_m < \rho$。

**第 3 步（拆分）**　对 $m \ge M$，
$$\begin{aligned}
&\abs{g(v_m) - g(u_m) - g'(x)(v_m - u_m)}\\
&\quad\le \abs{g(v_m) - g(x) - g'(x)(v_m - x)} + \abs{g(x) - g(u_m) - g'(x)(x - u_m)} && \text{（三角不等式）}\\
&\quad\le \eps(v_m - x) + \eps(x - u_m) = \eps(v_m - u_m) && \text{（第 1、2 步）。}
\end{aligned}$$

**第 4 步**　两边除以 $v_m - u_m > 0$：对 $m \ge M$，$\abs{D_m - g'(x)} \le \eps$。

这就证明了 $D_m \to g'(x)$。
:::

::: fr
▷ Méthode : on découpe $g(v_m) - g(u_m)$ en deux accroissements, sur $[u_m, x]$ et sur $[x, v_m]$, que l'on estime par le développement limité à l'ordre 1 ; comme $x$ est entre $u_m$ et $v_m$, la somme des deux longueurs vaut exactement $v_m - u_m$.

**Étape 1 (on traduit la dérivabilité)**　Soit $\eps > 0$. Comme $g$ est dérivable en $x$, il existe $\rho > 0$ tel que pour $\abs{t - x} < \rho$ ($t$ dans le domaine),
$$\abs{g(t) - g(x) - g'(x)(t - x)} \le \eps\abs{t - x}.$$

**Étape 2 (choix de $M$)**　Comme $v_m - u_m \to 0$, il existe $M$ tel que $v_m - u_m < \rho$ pour $m \ge M$. Puisque $u_m \le x \le v_m$, on a alors $0 \le v_m - x < \rho$ et $0 \le x - u_m < \rho$.

**Étape 3 (découpage)**　Pour $m \ge M$,
$$\begin{aligned}
&\abs{g(v_m) - g(u_m) - g'(x)(v_m - u_m)}\\
&\quad\le \abs{g(v_m) - g(x) - g'(x)(v_m - x)} + \abs{g(x) - g(u_m) - g'(x)(x - u_m)} && \text{(inégalité triangulaire)}\\
&\quad\le \eps(v_m - x) + \eps(x - u_m) = \eps(v_m - u_m) && \text{(étapes 1 et 2).}
\end{aligned}$$

**Étape 4**　En divisant par $v_m - u_m > 0$ : pour $m \ge M$, $\abs{D_m - g'(x)} \le \eps$.

Ceci montre que $D_m \to g'(x)$.
:::

::: rem
「$x$ 夹在 $u_m$ 与 $v_m$ 之间」不能去掉。$g(t) = t^2\sin\frac1t$（$g(0) = 0$）在 $0$ 处可导，$g'(0) = 0$。取 $v_m = \frac{1}{2m\pi}$，$u_m = \frac{1}{2m\pi + \pi/2}$（都在 $0$ 的右侧），则 $g(v_m) = 0$，$g(u_m) = u_m^2$，$v_m - u_m = \frac\pi2 u_m v_m$，所以
$$D_m = \frac{-u_m^2}{\frac\pi2 u_m v_m} = -\frac2\pi \cdot \frac{u_m}{v_m} \xrightarrow[m \to \infty]{} -\frac2\pi \ne g'(0).$$
:::

::: ex id=takagi zh="Takagi 函数" lvl=2
令 $\varphi(x) = \operatorname{dist}(x, \Z)$（锯齿函数，$0 \le \varphi \le \frac12$），
$$T(x) = \sum_{n=0}^\infty \frac{\varphi(2^n x)}{2^n}.$$
级数被 $\sum 2^{-n-1}$ 控制，正规收敛（{@normale-unif}），每项连续，所以 $T$ 在 $\R$ 上连续（{@transferts-series}）。$T$ 处处不可导。
:::

::: sketch
▷ 思路：固定 $x$，取包含 $x$ 的二进区间 $[u_m, v_m]$（长度 $2^{-m}$）。在这个区间上，前 $m$ 项都是斜率 $\pm 1$ 的一次函数，后面的项在两端都为 $0$。于是差商 $D_m$ 是 $m$ 个 $\pm 1$ 之和，且 $D_{m+1} - D_m = \pm 1$，不可能收敛；由 {@c3-taux-encadrant}，$T$ 在 $x$ 处不可导。

**第 1 步（锯齿函数的结构）**　对 $j \in \Z$，$\varphi$ 在 $[j, j + \frac12]$ 上等于 $y - j$（斜率 $1$），在 $[j + \frac12, j + 1]$ 上等于 $j + 1 - y$（斜率 $-1$）。所以 $\varphi$ 在每个 $[\frac j2, \frac{j+1}{2}]$ 上是斜率为 $\pm 1$ 的一次函数，而 $y \mapsto \frac{\varphi(2^n y)}{2^n}$ 在每个 $[\frac{j}{2^{n+1}}, \frac{j+1}{2^{n+1}}]$ 上是斜率为 $\pm 1$ 的一次函数。

**第 2 步（二进区间）**　固定 $x \in \R$。对 $m \ge 1$，令 $k_m = E(2^m x)$，$u_m = \frac{k_m}{2^m}$，$v_m = u_m + \frac{1}{2^m}$。则 $u_m \le x < v_m$，$v_m - u_m = 2^{-m} \to 0$，且 $[u_{m+1}, v_{m+1}] \subset [u_m, v_m]$。

**第 3 步（$n \ge m$ 的项）**　$2^n u_m = 2^{n-m}k_m \in \Z$，$2^n v_m = 2^{n-m}(k_m + 1) \in \Z$，所以 $\varphi(2^n u_m) = \varphi(2^n v_m) = 0$：这些项对 $T(v_m) - T(u_m)$ 没有贡献。

**第 4 步（$n < m$ 的项）**　$n + 1 \le m$，所以 $[u_m, v_m]$ 含于某个 $[\frac{j}{2^{n+1}}, \frac{j+1}{2^{n+1}}]$（取 $j = E(k_m / 2^{m-n-1})$）。由第 1 步，第 $n$ 项在 $[u_m, v_m]$ 上是斜率 $\eps_n \in \{1, -1\}$ 的一次函数；又因为 $[u_{m'}, v_{m'}] \subset [u_m, v_m]$（$m' \ge m$），这个斜率 $\eps_n$ 只依赖于 $n$（和 $x$），不依赖于 $m > n$。

**第 5 步（差商）**　由第 3、4 步，
$$D_m = \frac{T(v_m) - T(u_m)}{v_m - u_m} = \sum_{n=0}^{m-1} \eps_n, \qquad D_{m+1} - D_m = \eps_m \in \{1, -1\}.$$
所以 $\abs{D_{m+1} - D_m} = 1$ 对一切 $m$ 成立，$(D_m)$ 不是 Cauchy 列，不收敛。

**第 6 步（结论）**　若 $T$ 在 $x$ 处可导，由 {@c3-taux-encadrant}（$u_m \le x \le v_m$），$D_m \to T'(x)$，与第 5 步矛盾。所以 $T$ 在 $x$ 处不可导；$x$ 任意。
:::

::: fr
▷ Méthode : on fixe $x$ et on considère l'intervalle dyadique $[u_m, v_m]$ de longueur $2^{-m}$ qui contient $x$. Sur cet intervalle, les $m$ premiers termes sont affines de pente $\pm 1$ et les suivants s'annulent aux deux extrémités. Le taux d'accroissement $D_m$ est donc une somme de $m$ termes $\pm 1$, avec $D_{m+1} - D_m = \pm 1$ : il ne peut pas converger, et {@fr:c3-taux-encadrant} montre que $T$ n'est pas dérivable en $x$.

**Étape 1 (structure de la fonction en dents de scie)**　Pour $j \in \Z$, $\varphi$ vaut $y - j$ sur $[j, j + \frac12]$ (pente $1$) et $j + 1 - y$ sur $[j + \frac12, j + 1]$ (pente $-1$). Donc $\varphi$ est affine de pente $\pm 1$ sur chaque $[\frac j2, \frac{j+1}{2}]$, et $y \mapsto \frac{\varphi(2^n y)}{2^n}$ est affine de pente $\pm 1$ sur chaque $[\frac{j}{2^{n+1}}, \frac{j+1}{2^{n+1}}]$.

**Étape 2 (intervalles dyadiques)**　Fixons $x \in \R$. Pour $m \ge 1$, posons $k_m = E(2^m x)$, $u_m = \frac{k_m}{2^m}$ et $v_m = u_m + \frac{1}{2^m}$. Alors $u_m \le x < v_m$, $v_m - u_m = 2^{-m} \to 0$ et $[u_{m+1}, v_{m+1}] \subset [u_m, v_m]$.

**Étape 3 (termes $n \ge m$)**　On a $2^n u_m = 2^{n-m}k_m \in \Z$ et $2^n v_m = 2^{n-m}(k_m + 1) \in \Z$, donc $\varphi(2^n u_m) = \varphi(2^n v_m) = 0$ : ces termes ne contribuent pas à $T(v_m) - T(u_m)$.

**Étape 4 (termes $n < m$)**　Comme $n + 1 \le m$, l'intervalle $[u_m, v_m]$ est contenu dans un intervalle $[\frac{j}{2^{n+1}}, \frac{j+1}{2^{n+1}}]$ (avec $j = E(k_m / 2^{m-n-1})$). D'après l'étape 1, le terme d'indice $n$ est affine sur $[u_m, v_m]$, de pente $\eps_n \in \{1, -1\}$ ; et comme $[u_{m'}, v_{m'}] \subset [u_m, v_m]$ pour $m' \ge m$, cette pente $\eps_n$ ne dépend que de $n$ (et de $x$), pas de $m > n$.

**Étape 5 (taux d'accroissement)**　D'après les étapes 3 et 4,
$$D_m = \frac{T(v_m) - T(u_m)}{v_m - u_m} = \sum_{n=0}^{m-1} \eps_n, \qquad D_{m+1} - D_m = \eps_m \in \{1, -1\}.$$
Ainsi $\abs{D_{m+1} - D_m} = 1$ pour tout $m$ : $(D_m)$ n'est pas de Cauchy, donc ne converge pas.

**Étape 6 (conclusion)**　Si $T$ était dérivable en $x$, {@fr:c3-taux-encadrant} (avec $u_m \le x \le v_m$) donnerait $D_m \to T'(x)$, ce qui contredit l'étape 5. Donc $T$ n'est pas dérivable en $x$, et $x$ est quelconque.
:::

::: rem
历史上第一个公开发表的例子是 Weierstrass（1872）的 $\sum a^n \cos(b^n \pi x)$；Takagi（1903）的例子证明最短。第 1 章的 Baire 纲定理（{@banach-nulle-part}）说明这样的函数不是例外：在 $\Cc([0,1])$ 中，「至少在一点可导」的函数只构成一个「小」集合。
:::

::: thm id=peano-courbe zh="Peano 曲线" en="Peano curve (space-filling curve)" fr="Courbe de Peano" ru="Кривая Пеано" lvl=3 ref="Sagan, *Space-Filling Curves*，Springer 1994"
存在从 $[0,1]$ 到 $[0,1]^2$ 的连续满射。另一方面（Netto 定理），不存在从 $[0,1]$ 到 $[0,1]^2$ 的连续双射。可以用一致收敛的折线序列构造 Peano 曲线，极限的连续性由 {@cont-limite-unif} 保证。
:::

::: fr
Il existe une surjection continue de $[0,1]$ sur $[0,1]^2$. En revanche (théorème de Netto), il n'existe pas de bijection continue de $[0,1]$ sur $[0,1]^2$. On peut construire une courbe de Peano comme limite uniforme d'une suite de lignes polygonales ; la continuité de la limite est assurée par {@fr:cont-limite-unif}.
:::

::: q
Takagi 函数的部分和 $T_m = \sum_{n < m} \frac{\varphi(2^n x)}{2^n}$ 是分段线性的连续函数，除有限个点外可导。为什么不能用 {@derivation-suite}（或 {@transferts-series} 第 3 条）推出 $T$ 可导？
:::

::: ans
定理要求 $T_m \in \Cc^1$ 且导数列 $(T_m')$ 在每个闭区间段上一致收敛。这里两条都不满足：$T_m$ 在二进点处有折角，不是 $\Cc^1$；更本质地，在可导的点处 $T_m'(x) = \sum_{n < m} \eps_n$，而相邻两项相差 $\pm 1$，$(T_m'(x))$ 根本不收敛。
:::

## 方法总结

::: method zh="如何证明函数列 $(f_n)$ 在 $A$ 上一致收敛"
1. 先求逐点极限 $f$：它是唯一可能的一致极限（{@c3-unif-simple}）。
2. 估计 $\abs{f_n(x) - f(x)}$，找一个与 $x$ 无关、趋于 $0$ 的上界 $\alpha_n$（{@c3-carac-unif} 第 1 条）。常用手段：对 $x$ 求导求最大值（{@c3-ex-unif}）、有限增量不等式、单调性、Taylor 不等式。
3. 不知道极限时，验证一致 Cauchy 准则（{@cauchy-unif}）。
4. 紧集 + 连续极限 + 对每个 $x$ 单调：Dini 定理（{@dini}）。
5. 若导数列一致收敛、且在一点收敛：{@derivation-suite} 直接给出闭区间段上的一致收敛。
6. 只需要连续性、积分、求导时，通常只要在**每个闭区间段**（或每个 $[a, +\infty[$、$[-a, a]$）上一致收敛（{@c3-cont-segments}）。
:::

::: method zh="如何证明收敛不一致"
1. 找点列 $x_n \in A$，使 $f_n(x_n) - f(x_n) \not\to 0$（{@c3-carac-unif} 第 2 条）；$x_n$ 通常取 $\abs{f_n - f}$ 的最大值点或其附近（{@ex-xn}：$x_n = 1 - \frac1n$）。
2. 每个 $f_n$ 连续而极限 $f$ 不连续（{@cont-limite-unif}，{@c3-cex-discontinue}）。
3. 二重极限不可交换：$\lim_{x \to a} f_n(x) = \ell_n$，但 $(\ell_n)$ 发散或 $\lim_{x\to a} f \ne \lim \ell_n$（{@double-limite}）。
4. 积分不能交换：$\int_a^b f_n \not\to \int_a^b f$（{@integration-unif}，{@cex-bosse}）。
:::

::: method zh="如何研究函数项级数 $\sum f_n$"
1. **逐点收敛**：固定 $x$，用第 2 章的数项级数判别法。
2. **正规收敛**：求 $\norm{f_n}_{\infty, A}$（或找 $M_n \ge \abs{f_n(x)}$），验证 $\sum M_n < \infty$（{@normale-unif}）。这是首选方法。
3. **一致但不正规**：交错级数余项估计 $\abs{R_n(x)} \le \abs{f_{n+1}(x)}$（{@ex-alternee-unif}）；Abel 变换 / Dirichlet 判别法（{@dirichlet-unif}）。
4. **否定一致收敛**：通项不一致趋于 $0$（{@c3-reste-unif} 第 3 条）；和函数不连续；逐项取极限得到发散级数（{@c3-limite-terme-a-terme}，{@zeta-regularite}）；Cauchy 片段在某些点上不小（{@c3-ex-sin-nx}）。
5. **和函数的性质**：连续、逐项积分、逐项求导（{@transferts-series}，$\Cc^k$ 版本见 {@c3-derivation-ck}），以及端点处的极限（{@c3-limite-terme-a-terme}）。总是先把问题局部化到闭区间段上，再在闭区间段上证明正规收敛。
:::

::: method zh="如何逼近一个函数"
1. $[a,b]$ 上的连续函数：多项式（{@weierstrass}，显式的 Bernstein 多项式）；更一般的代数：{@stone-weierstrass}。
2. $[a,b]$ 上的分段连续函数：阶梯函数（{@escalier}）。
3. 从一个函数列中抽取一致收敛的子列：验证一致有界与等度连续（{@arzela-ascoli}）。
4. 典型用法：先对简单函数证明，再用一致逼近取极限（例如本章 Weierstrass 后的第二个「想一想」）。
:::

::: rem
**常见错误。**

1. **「每个 $f_n$ 连续，所以逐点极限连续」**。错：$x^n$ 在 $[0,1]$ 上（{@ex-xn}）。需要一致收敛，至少在每个闭区间段上。
2. **「极限连续，所以收敛一致」**。错：$\Arctan(nx)$ 在 $]0, +\infty[$ 上（{@c3-cex-discontinue}），$\frac{nx}{1 + n^2x^2}$ 在 $[0, 1]$ 上。
3. **「$\sum \abs{f_n(x)}$ 对每个 $x$ 收敛，所以正规收敛」**。错：正规收敛要求 $\sum \sup_x \abs{f_n(x)} < \infty$，上确界在求和之前取（{@c3-cex-bosses}）。
4. **「$f_n$ 一致收敛，所以 $f_n' \to f'$」**。错：$\frac{\sin(nx)}{\sqrt n}$（{@c3-cex-derivee}）。求导定理的假设是**导数列**一致收敛。
5. **计算 $\sup$ 时只看临界点**。上确界可能在区间端点（或开区间端点的极限处）取到、甚至取不到：$\sup_{[0,1[} x^n = 1$ 不被取到，却不趋于 $0$。
6. **在 $\R$ 上套用 Weierstrass 定理**。$\R$ 上多项式的一致极限只能是多项式。
:::

::: read
- Г. М. Фихтенгольц,《Курс дифференциального и интегрального исчисления》，т. II：функциональные последовательности и ряды, равномерная сходимость, почленный переход к пределу, интегрирование и дифференцирование. ——例子极多、计算写得极细，书中也有连续而处处不可导函数的构造，适合对照本章每一个反例。
- В. А. Зорич,《Математический анализ》，ч. II：равномерная сходимость и основные операции анализа над рядами и семействами функций; теорема Стоуна, теорема Арцела–Асколи. ——用度量空间的语言统一处理，与第 1 章的风格衔接最好。
- Б. П. Демидович,《Сборник задач и упражнений по математическому анализу》：равномерная сходимость функциональных последовательностей и рядов. ——大量「判断是否一致收敛」的计算题，按难度排列，适合练手。
- X. Gourdon,《Les maths en tête : Analyse》：suites et séries de fonctions, théorèmes de Dini et de Weierstrass. ——法国 MP 风格的标准参考书，例题与本章的方法总结一一对应。
- W. Rudin,《Principles of Mathematical Analysis》：Sequences and Series of Functions（第 7 章）。——证明简洁，Stone–Weierstrass 与等度连续的处理是经典。
:::

::: glossary
| 中文 | Français | English | Русский |
|---|---|---|---|
| 函数列 | suite de fonctions (f.) | sequence of functions | функциональная последовательность |
| 函数项级数 | série de fonctions (f.) | series of functions | функциональный ряд |
| 逐点收敛 | convergence simple (f.) | pointwise convergence | поточечная сходимость |
| 逐点极限 | limite simple (f.) | pointwise limit | поточечный предел |
| 一致收敛 | convergence uniforme (f.) | uniform convergence | равномерная сходимость |
| 一致范数、上确界范数 | norme uniforme (f.), norme infinie (f.) | uniform norm, sup norm | равномерная норма, sup-норма |
| 一致 Cauchy 准则 | critère de Cauchy uniforme (m.) | uniform Cauchy criterion | критерий Коши равномерной сходимости |
| 在每个闭区间段上一致收敛 | convergence uniforme sur tout segment (f.) | uniform convergence on compact subintervals | равномерная сходимость на каждом отрезке |
| 极限交换 | interversion (f.) des limites | interchange of limits | перестановка предельных переходов |
| 二重极限定理 | théorème (m.) de la double limite | Moore–Osgood theorem | теорема о перестановке предельных переходов |
| Dini 定理 | théorème (m.) de Dini | Dini's theorem | теорема Дини |
| 和函数 | fonction somme (f.) | sum function | сумма ряда |
| 部分和 | somme partielle (f.) | partial sum | частичная сумма |
| 余项 | reste (m.) | remainder | остаток ряда |
| 绝对收敛 | convergence absolue (f.) | absolute convergence | абсолютная сходимость |
| 正规收敛 | convergence normale (f.) | normal convergence | нормальная сходимость |
| Weierstrass 判别法（M 判别法） | critère (m.) de convergence normale | Weierstrass M-test | признак Вейерштрасса |
| 与 $x$ 无关的上界 | majorant (m.) indépendant de $x$ | bound independent of $x$ | оценка, не зависящая от $x$ |
| 逐项积分 | intégration (f.) terme à terme | term-by-term integration | почленное интегрирование |
| 逐项求导 | dérivation (f.) terme à terme | term-by-term differentiation | почленное дифференцирование |
| 逐项取极限 | passage (m.) à la limite terme à terme | term-by-term passage to the limit | почленный предельный переход |
| 取极限 | passer à la limite | pass to the limit | перейти к пределу |
| 交错级数 | série alternée (f.) | alternating series | знакочередующийся ряд |
| Abel 变换 | transformation (f.) d'Abel | summation by parts | преобразование Абеля |
| 一致收敛的 Dirichlet 判别法 | critère (m.) d'Abel uniforme | Dirichlet's test for uniform convergence | признак Дирихле равномерной сходимости |
| 多项式逼近 | approximation (f.) polynomiale | polynomial approximation | приближение многочленами |
| Weierstrass 逼近定理 | théorème (m.) d'approximation de Weierstrass | Weierstrass approximation theorem | аппроксимационная теорема Вейерштрасса |
| Bernstein 多项式 | polynôme (m.) de Bernstein | Bernstein polynomial | многочлен Бернштейна |
| 稠密 | dense | dense | плотный (всюду плотный) |
| 阶梯函数 | fonction (f.) en escalier | step function | ступенчатая функция |
| 分段连续函数 | fonction (f.) continue par morceaux | piecewise continuous function | кусочно-непрерывная функция |
| Stone–Weierstrass 定理 | théorème (m.) de Stone–Weierstrass | Stone–Weierstrass theorem | теорема Стоуна — Вейерштрасса |
| 分离点 | séparer les points | separate points | разделять точки |
| 一致有界 | uniformément borné | uniformly bounded | равномерно ограниченный |
| 等度连续 | équicontinuité (f.) | equicontinuity | равностепенная непрерывность |
| Arzelà–Ascoli 定理 | théorème (m.) d'Arzelà–Ascoli | Arzelà–Ascoli theorem | теорема Арцела — Асколи |
| 对角线方法 | procédé (m.) diagonal | diagonal argument | диагональный процесс |
| 有限 δ-网（全有界） | précompacité (f.) | total boundedness | вполне ограниченность |
| 处处不可导的连续函数 | fonction (f.) continue nulle part dérivable | continuous nowhere differentiable function | непрерывная нигде не дифференцируемая функция |
| Peano 曲线 | courbe (f.) de Peano | Peano curve | кривая Пеано |
| Müntz 定理 | théorème (m.) de Müntz | Müntz–Szász theorem | теорема Мюнца |
:::

