L1 的 Riemann 积分只处理闭区间上的有界函数。本章把积分推广到任意区间（$\left]0, 1\right]$、$[0, +\infty[$、$\R$ 等）上的分段连续函数，这就是广义积分（反常积分）。法国 MP 大纲在这里做了一个重要的选择：**陈述 Lebesgue 的控制收敛定理和逐项积分定理，但不证明**，把证明留到 L3 的测度论。本网页同样处理，这两个定理标为 ★★★。全章 $I$ 是区间，函数分段连续，取值于 $\K$。

## 广义积分的收敛

::: def id=def-integrale-generalisee zh="广义积分的收敛" en="Convergent improper integral" fr="Intégrale généralisée convergente" ru="Сходящийся несобственный интеграл"
设 $f$ 在 $[a, b[$（$b \le +\infty$）上分段连续。若 $\lim_{x \to b^-}\int_a^x f$ 存在且有限，称广义积分 $\int_a^b f$ **收敛**，并以此极限为其值。对 $]a, b]$ 同理。对 $]a, b[$，取 $c \in ]a,b[$，要求 $\int_a^c f$ 与 $\int_c^b f$ **分别**收敛。
:::

::: ex id=riemann-integrales zh="Riemann 积分（参考积分）" lvl=1
$$\int_1^{+\infty}\frac{\dd t}{t^\alpha}\ \text{收敛} \iff \alpha > 1,\qquad \int_0^1\frac{\dd t}{t^\alpha}\ \text{收敛} \iff \alpha < 1,\qquad \int_0^{+\infty}\e^{-\lambda t}\,\dd t = \frac1\lambda\ (\lambda > 0).$$
直接计算原函数即得。$\int_0^1 \ln t\,\dd t = -1$ 也收敛。
:::

::: cex lvl=1
$\int_{-\infty}^{+\infty} t\,\dd t$ 发散，尽管 $\int_{-x}^{x} t\,\dd t = 0$ 对一切 $x$ 成立。对称截断的极限称为 **Cauchy 主值**，它不是广义积分。
:::

::: prop id=cauchy-integrale zh="广义积分的 Cauchy 准则" en="Cauchy criterion for improper integrals" fr="Critère de Cauchy pour les intégrales" ru="Критерий Коши сходимости несобственного интеграла" lvl=1
$\int_a^b f$（$b$ 处广义）收敛，当且仅当
$\forall \eps > 0$，$\exists c < b$，$\forall x, y \in [c, b[$，$\Big|\int_x^y f\Big| < \eps$。
:::

::: proof
这是函数 $F(x) = \int_a^x f$ 在 $b^-$ 处有极限的 Cauchy 准则（由数列的 Cauchy 准则和 Heine 归结原理得到）。
:::

::: rem
与级数不同，$\int_a^{+\infty} f$ 收敛**不**蕴含 $f(t) \to 0$。例：$f$ 在每个 $[n, n + \frac{1}{n^3}]$ 上是高度为 $n$ 的三角形脉冲，其余为 $0$。$\int_0^\infty f = \sum \frac{1}{2n^2}$ 收敛，但 $\limsup f = +\infty$。不过，若 $f$ 一致连续且积分收敛，则 $f \to 0$（Barbălat 引理）。
:::

## 非负函数与可积性

::: thm id=comparaison-integrales zh="比较定理" en="Comparison test for integrals" fr="Théorème de comparaison pour les intégrales" ru="Признак сравнения для несобственных интегралов" lvl=1
设 $f, g$ 在 $[a, b[$ 上分段连续且非负。

1. 若 $f \le g$ 且 $\int_a^b g$ 收敛，则 $\int_a^b f$ 收敛。
2. 若 $f(t) = O(g(t))$（$t \to b$）且 $\int_a^b g$ 收敛，则 $\int_a^b f$ 收敛。
3. 若 $f(t) \sim g(t)$（$t \to b$），则两积分同敛散。
:::

::: proof
$f \ge 0$ 时 $x \mapsto \int_a^x f$ 递增，所以积分收敛当且仅当它有界。之后与 {@comparaison} 完全相同。
:::

::: def id=def-integrable zh="可积函数" en="Integrable function" fr="Fonction intégrable" ru="Абсолютно интегрируемая функция"
$f$ 在 $I$ 上**可积**（intégrable），如果 $\int_I \abs{f}$ 收敛（**绝对收敛**）。$I$ 上可积的分段连续函数构成向量空间，记为 $L^1(I)$。
:::

::: thm id=integrable-convergente lvl=1
若 $f$ 在 $I$ 上可积，则 $\int_I f$ 收敛，且 $\Big|\int_I f\Big| \le \int_I \abs{f}$。
:::

::: proof
$\K = \R$ 时写 $f = f^+ - f^-$，$0 \le f^\pm \le \abs{f}$，由比较定理 $\int f^\pm$ 都收敛。复值时分别处理实部和虚部。不等式对闭区间成立，取极限即可。也可以直接用 Cauchy 准则：$\big|\int_x^y f\big| \le \int_x^y \abs f$。
:::

::: ex id=sinc lvl=1
$\int_0^{+\infty}\frac{\sin t}{t}\,\dd t$ 收敛但不绝对收敛。

收敛：$\frac{\sin t}{t} \to 1$（$t \to 0$），所以在 $0$ 处没有问题。在 $[1, x]$ 上分部积分：
$$\int_1^x \frac{\sin t}{t}\,\dd t = \Big[-\frac{\cos t}{t}\Big]_1^x - \int_1^x\frac{\cos t}{t^2}\,\dd t,$$
右边第二个积分绝对收敛（被 $\frac{1}{t^2}$ 控制）。

不绝对收敛：$\int_{k\pi}^{(k+1)\pi}\frac{\abs{\sin t}}{t}\,\dd t \ge \frac{1}{(k+1)\pi}\int_0^\pi\sin = \frac{2}{(k+1)\pi}$，求和发散。

其值为 $\frac{\pi}{2}$（Dirichlet 积分，第 7 章 {@dirichlet-integrale}）。
:::

::: thm id=bertrand-integrales zh="Bertrand 积分" en="Bertrand integrals" fr="Intégrales de Bertrand" ru="Интегралы Бертрана" lvl=2
$\int_2^{+\infty}\dfrac{\dd t}{t^\alpha(\ln t)^\beta}$ 收敛，当且仅当 $\alpha > 1$，或 $\alpha = 1$ 且 $\beta > 1$。
:::

::: sketch
与 Bertrand 级数 {@bertrand} 相同：$\alpha \ne 1$ 时与 $t^{-(1+\alpha)/2}$ 比较；$\alpha = 1$ 时换元 $u = \ln t$ 化为 $\int \frac{\dd u}{u^\beta}$。
:::

::: method zh="判断广义积分收敛的步骤"
1. 找出所有「问题点」（无穷端点、函数无界的点），在每个问题点附近分别讨论。
2. 函数非负（或最终同号）时：求等价量，与 Riemann 积分或 Bertrand 积分比较。
3. 函数变号时：先试绝对收敛；不行再用分部积分（如 $\frac{\sin t}{t}$）或 Abel 型判别法。
4. 积分与级数的转换：{@serie-integrale}。
:::

## 积分技巧

::: thm id=ipp-generalisee zh="广义分部积分" en="Integration by parts on an interval" fr="Intégration par parties généralisée" ru="Интегрирование по частям в несобственном интеграле" lvl=1
设 $u, v \in \Cc^1(]a, b[)$，且 $uv$ 在 $a^+$ 和 $b^-$ 处有有限极限。则 $\int_a^b u'v$ 与 $\int_a^b uv'$ 同敛散，收敛时
$$\int_a^b u'v = \big[uv\big]_a^b - \int_a^b uv',\qquad \big[uv\big]_a^b = \lim_{b^-} uv - \lim_{a^+} uv.$$
:::

::: proof
在 $[x, y] \subset ]a, b[$ 上做普通的分部积分，然后令 $x \to a$，$y \to b$。
:::

::: thm id=changement-variable-gen zh="广义变量替换" en="Change of variables" fr="Changement de variable" ru="Замена переменной в несобственном интеграле" lvl=1
设 $\varphi : ]\alpha, \beta[ \to ]a, b[$ 是 $\Cc^1$ 的严格单调双射。则 $\int_a^b f(t)\,\dd t$ 与 $\int_\alpha^\beta f(\varphi(u))\abs{\varphi'(u)}\,\dd u$ 同敛散，收敛时相等。
:::

::: proof
在闭子区间上用普通的变量替换公式，然后取极限。$\varphi$ 是双射，所以 $u \to \alpha^+, \beta^-$ 对应 $t$ 趋于 $a, b$（顺序由单调方向决定，绝对值处理了递减的情形）。
:::

::: def id=def-gamma zh="Γ 函数" en="Gamma function" fr="Fonction Gamma d'Euler" ru="Гамма-функция Эйлера"
对 $x > 0$，
$$\Gamma(x) = \int_0^{+\infty} t^{x-1}\e^{-t}\,\dd t.$$
积分在 $0$ 处与 $t^{x-1}$ 比较（$x > 0$ 时收敛），在 $+\infty$ 处 $t^{x-1}\e^{-t} = O(t^{-2})$。
:::

::: prop id=gamma-factorielle lvl=1
$\Gamma(x + 1) = x\,\Gamma(x)$，$\Gamma(1) = 1$，从而 $\Gamma(n + 1) = n!$。
:::

::: proof
用 {@ipp-generalisee}，$u = -\e^{-t}$，$v = t^x$：边界项 $\big[-t^x\e^{-t}\big]_0^\infty = 0$（$x > 0$），所以 $\Gamma(x + 1) = x\int_0^\infty t^{x-1}\e^{-t}\,\dd t$。
:::

## 控制收敛与逐项积分

以下两个定理来自 Lebesgue 积分论。法国 MP 大纲把它们作为**已承认的定理**使用（théorèmes admis），因为它们的证明需要测度论，但它们的应用完全不需要。

::: thm id=cv-dominee zh="控制收敛定理" en="Dominated convergence theorem" fr="Théorème de convergence dominée" ru="Теорема Лебега о мажорированной сходимости" lvl=3 ref="L3 积分论；Rudin, *Real and Complex Analysis*，定理 1.34；Briane–Pagès, *Théorie de l'intégration*"
设 $(f_n)$ 是 $I$ 上分段连续的函数列，满足：

1. $(f_n)$ 在 $I$ 上逐点收敛到分段连续的函数 $f$；
2. （控制条件）存在 $I$ 上可积的非负函数 $\varphi$，使 $\abs{f_n} \le \varphi$ 对一切 $n$ 成立（$\varphi$ 不依赖于 $n$）。

则 $f_n$、$f$ 都在 $I$ 上可积，且
$$\int_I f_n \xrightarrow[n \to \infty]{} \int_I f.$$
:::

::: rem
与 {@integration-unif} 比较：这里只需要**逐点**收敛，区间可以是无界的；代价是需要一个可积的控制函数。在法国教材中，这是讨论「极限与积分交换」最常用的工具。第 7 章会把它推广到连续参数。
:::

::: ex id=ex-cv-dominee lvl=1
求 $\lim_{n \to \infty}\int_0^n\Big(1 - \frac tn\Big)^n\,\dd t$。令 $f_n(t) = (1 - \frac tn)^n\mathbf{1}_{[0,n]}(t)$。由 $\ln(1 - u) \le -u$，$0 \le f_n(t) \le \e^{-t}$，而 $\e^{-t}$ 在 $[0, +\infty[$ 上可积。$f_n(t) \to \e^{-t}$ 逐点成立。由控制收敛定理，极限为 $\int_0^\infty\e^{-t}\,\dd t = 1$。
（$f_n$ 在 $t = n$ 处连续，所以是分段连续的。）
:::

::: cex id=cex-domination lvl=1
控制条件不能省略。$f_n = n\,\mathbf{1}_{]0, 1/n]}$ 在 $]0, 1]$ 上逐点收敛到 $0$，但 $\int f_n = 1$。任何控制函数都必须满足 $\varphi \ge \sup_n f_n$，而 $\sup_n f_n(t) \ge \frac{1}{2t}$ 在 $]0, 1]$ 上不可积。{@cex-bosse} 也是同样的现象。
:::

::: thm id=integration-terme-a-terme zh="逐项积分定理" en="Term-by-term integration theorem" fr="Théorème d'intégration terme à terme" ru="Теорема о почленном интегрировании ряда" lvl=3 ref="L3 积分论（单调收敛定理的推论）；Rudin, *Real and Complex Analysis*，定理 1.38"
设 $f_n$ 在 $I$ 上分段连续且可积，$\sum f_n$ 逐点收敛到分段连续的函数 $f$，并且
$$\sum_{n}\int_I \abs{f_n} < +\infty.$$
则 $f$ 在 $I$ 上可积，且 $\displaystyle\int_I \sum_n f_n = \sum_n\int_I f_n$。
:::

::: ex id=ex-zeta2-integrale lvl=1
$$\int_0^{+\infty}\frac{t}{\e^t - 1}\,\dd t = \zeta(2) = \frac{\pi^2}{6}.$$
对 $t > 0$，$\frac{t}{\e^t - 1} = \sum_{n \ge 1} t\,\e^{-nt}$。令 $f_n(t) = t\,\e^{-nt} \ge 0$，$\int_0^\infty f_n = \frac{1}{n^2}$，$\sum\frac{1}{n^2} < \infty$。由逐项积分定理即得。一般地，对 $s > 1$，$\int_0^\infty\frac{t^{s-1}}{\e^t - 1}\,\dd t = \Gamma(s)\zeta(s)$。
:::

::: thm id=cv-monotone zh="单调收敛定理" en="Monotone convergence theorem" fr="Théorème de convergence monotone" ru="Теорема Беппо Леви о монотонной сходимости" lvl=3 ref="L3 积分论；Rudin, *Real and Complex Analysis*，定理 1.26"
设 $0 \le f_0 \le f_1 \le \cdots$ 逐点收敛到 $f$（均为分段连续）。则 $\int_I f_n \to \int_I f$（在 $[0, +\infty]$ 中，即两边可以同时为 $+\infty$）。逐项积分定理对非负函数项级数的情形是它的直接推论。
:::

## 级数与积分的比较（续）

::: prop id=serie-integrale-reste lvl=1
设 $f : [1, +\infty[ \to \R_+$ 连续递减，$\int_1^\infty f$ 收敛。则余项满足
$$\int_{n+1}^{+\infty} f \le \sum_{k > n} f(k) \le \int_n^{+\infty} f.$$
例：$\sum_{k > n}\frac{1}{k^2} \sim \frac1n$，$\sum_{k > n}\frac{1}{k^\alpha} \sim \frac{n^{1-\alpha}}{\alpha - 1}$（$\alpha > 1$）。
:::

::: proof
对 {@serie-integrale} 中的不等式从 $n+1$ 到 $\infty$ 求和。等价关系：两边的积分都等价于 $\frac{n^{1-\alpha}}{\alpha - 1}$。
:::

::: hist zh="从 Riemann 到 Lebesgue"
Riemann 积分的缺陷在于极限运算：可积函数的逐点极限（即使有界）未必 Riemann 可积，例如有理数的指示函数是阶梯函数序列的逐点极限。Lebesgue 在 1902 年的博士论文中用测度重建了积分，得到控制收敛定理和完备的 $L^1$ 空间（对比 {@cex-c01-l1}）。本章的「已承认定理」正是这个理论在分段连续函数上的投影。
:::
