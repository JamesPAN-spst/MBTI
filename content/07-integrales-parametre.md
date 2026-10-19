形如 $F(x) = \int_I f(x, t)\,\dd t$ 的函数称为**含参变量积分**。$\Gamma$ 函数、Fourier 变换、Laplace 变换、卷积都是这种形式。本章研究 $F$ 的连续性和可导性，主要工具是控制收敛定理 {@cv-dominee}，这是法国大纲的做法。苏联和中国教材用「含参广义积分的一致收敛」处理同样的问题，本章最后一节说明两种方法的关系。全章 $A$ 是 $\R$ 的子集（参数的取值范围），$I$ 是区间。

## 连续性

::: thm id=continuite-parametre zh="含参积分的连续性" en="Continuity of parameter-dependent integrals" fr="Théorème de continuité sous le signe intégrale" ru="Непрерывность интеграла по параметру" lvl=1
设 $f : A \times I \to \K$ 满足：

1. 对每个 $t \in I$，$x \mapsto f(x, t)$ 在 $A$ 上连续；
2. 对每个 $x \in A$，$t \mapsto f(x, t)$ 在 $I$ 上分段连续；
3. （控制条件）存在 $I$ 上可积的 $\varphi \ge 0$，使 $\abs{f(x, t)} \le \varphi(t)$ 对一切 $(x, t) \in A \times I$ 成立。

则 $F(x) = \int_I f(x, t)\,\dd t$ 在 $A$ 上有定义且连续。
:::

::: proof
由控制条件，每个 $t \mapsto f(x, t)$ 可积，$F$ 有定义。设 $x_n \to x$（$x_n, x \in A$）。令 $g_n(t) = f(x_n, t)$。由条件 1，$g_n(t) \to f(x, t)$ 逐点成立；由条件 3，$\abs{g_n} \le \varphi$。由控制收敛定理，$F(x_n) = \int_I g_n \to \int_I f(x, \cdot) = F(x)$。由 {@carac-seq-cont}，$F$ 在 $x$ 连续。
:::

::: rem
连续性是局部性质，控制条件只需要**局部**成立：对 $A$ 的每个闭子区间（或每个点的某个邻域）$J$，存在可积的 $\varphi_J$，使 $\abs{f(x,t)} \le \varphi_J(t)$ 对 $x \in J$ 成立。这在应用中至关重要，例如 $\Gamma$ 函数在 $]0, +\infty[$ 上不存在全局的控制函数，但在每个 $[a, b] \subset ]0, +\infty[$ 上存在。
:::

::: thm id=limite-parametre zh="含参积分的极限" lvl=1
若 $f(x, t) \to \ell(t)$（$x \to a$，$a \in \overline{A}$，可以是 $\pm\infty$）逐点成立，且控制条件成立，则 $\int_I f(x, t)\,\dd t \to \int_I \ell(t)\,\dd t$。
:::

::: proof
与 {@continuite-parametre} 相同，对任意数列 $x_n \to a$ 用控制收敛定理。
:::

## 可导性

::: thm id=derivation-parametre zh="积分号下求导" en="Differentiation under the integral sign (Leibniz rule)" fr="Théorème de dérivation sous le signe intégrale" ru="Дифференцирование интеграла по параметру" lvl=1
设 $A$ 是区间，$f : A \times I \to \K$ 满足：

1. 对每个 $x$，$t \mapsto f(x, t)$ 在 $I$ 上可积；
2. 偏导数 $\frac{\partial f}{\partial x}$ 在 $A \times I$ 上存在，对每个 $t$ 关于 $x$ 连续，对每个 $x$ 关于 $t$ 分段连续；
3. （控制条件）存在 $I$ 上可积的 $\varphi \ge 0$，使 $\Big|\frac{\partial f}{\partial x}(x, t)\Big| \le \varphi(t)$ 对一切 $(x,t)$ 成立。

则 $F$ 在 $A$ 上是 $\Cc^1$ 的，且
$$F'(x) = \int_I \frac{\partial f}{\partial x}(x, t)\,\dd t.$$
:::

::: proof
固定 $x \in A$，取 $A$ 中的数列 $h_n \to 0$，$h_n \ne 0$，$x + h_n \in A$。
$$\frac{F(x + h_n) - F(x)}{h_n} = \int_I g_n(t)\,\dd t,\qquad g_n(t) = \frac{f(x + h_n, t) - f(x, t)}{h_n}.$$
$g_n(t) \to \frac{\partial f}{\partial x}(x, t)$ 逐点成立。由中值不等式（对复值函数分别处理实部和虚部，或用有限增量不等式），$\abs{g_n(t)} \le \sup_{y \in A}\Big|\frac{\partial f}{\partial x}(y, t)\Big| \le \varphi(t)$。由控制收敛定理，差商收敛到 $\int_I \frac{\partial f}{\partial x}(x, t)\,\dd t$。由 {@continuite-parametre}（用于 $\frac{\partial f}{\partial x}$），这个导函数连续。

（严格地说，$g_n$ 关于 $t$ 的分段连续性需要 $f(x, \cdot)$ 分段连续，这由条件 1 的约定保证。）
:::

::: cor id=derivation-ck lvl=1
若 $\frac{\partial^j f}{\partial x^j}$（$0 \le j \le k$）都满足相应的连续性与（局部）控制条件，则 $F$ 是 $\Cc^k$ 的，可以在积分号下求导 $k$ 次。
:::

::: proof
对 $k$ 归纳，每一步用 {@derivation-parametre}。
:::

::: thm id=fubini-segment zh="闭矩形上的积分交换" en="Fubini's theorem on a rectangle (continuous case)" fr="Théorème de Fubini sur un pavé (cas continu)" ru="Теорема Фубини для непрерывных функций на прямоугольнике" lvl=1
若 $f$ 在 $[a, b] \times [c, d]$ 上连续，则
$$\int_a^b\Big(\int_c^d f(x, t)\,\dd t\Big)\dd x = \int_c^d\Big(\int_a^b f(x, t)\,\dd x\Big)\dd t.$$
:::

::: proof
对 $y \in [a, b]$，令 $G(y) = \int_a^y\big(\int_c^d f(x, t)\,\dd t\big)\dd x$，$H(y) = \int_c^d\big(\int_a^y f(x, t)\,\dd x\big)\dd t$。$x \mapsto \int_c^d f(x, t)\,\dd t$ 连续（{@continuite-parametre}，紧集上连续函数有界，常数可以作控制函数），所以 $G'(y) = \int_c^d f(y, t)\,\dd t$。对 $H$，被积函数 $h(y, t) = \int_a^y f(x, t)\,\dd x$ 满足 $\frac{\partial h}{\partial y} = f(y, t)$，连续且有界，由 {@derivation-parametre}，$H'(y) = \int_c^d f(y, t)\,\dd t$。所以 $G' = H'$，又 $G(a) = H(a) = 0$，从而 $G = H$。取 $y = b$。
:::

## Γ 函数

::: thm id=gamma-regularite zh="Γ 函数的正则性" lvl=1
$\Gamma$ 在 $]0, +\infty[$ 上是 $\Cc^\infty$ 的，
$$\Gamma^{(k)}(x) = \int_0^{+\infty}(\ln t)^k\, t^{x-1}\,\e^{-t}\,\dd t,$$
并且 $\Gamma$ 是对数凸的（$\ln\Gamma$ 是凸函数）。
:::

::: proof
在 $[a, b] \subset ]0, +\infty[$ 上，$\big|(\ln t)^k t^{x-1}\e^{-t}\big| \le \abs{\ln t}^k\big(t^{a-1}\mathbf{1}_{]0,1]}(t) + t^{b-1}\e^{-t}\mathbf{1}_{]1, \infty[}(t)\big)$，右边与 $x$ 无关且可积（在 $0$ 处 $\abs{\ln t}^k t^{a-1} = O(t^{a/2 - 1})$）。用局部控制版本的 {@derivation-ck}。

对数凸：由 Cauchy–Schwarz 不等式，
$\Gamma'(x)^2 = \Big(\int (\ln t)\, t^{\frac{x-1}{2}}\e^{-t/2}\cdot t^{\frac{x-1}{2}}\e^{-t/2}\,\dd t\Big)^2 \le \Gamma''(x)\,\Gamma(x)$，
所以 $(\ln\Gamma)'' = \frac{\Gamma''\Gamma - \Gamma'^2}{\Gamma^2} \ge 0$。
:::

::: thm id=bohr-mollerup zh="Bohr–Mollerup 定理" en="Bohr–Mollerup theorem" fr="Théorème de Bohr–Mollerup" ru="Теорема Бора–Моллерупа" lvl=2
$\Gamma$ 是 $]0, +\infty[$ 上满足以下三个条件的唯一函数：$f(1) = 1$；$f(x + 1) = x f(x)$；$\ln f$ 是凸函数。
:::

::: sketch
设 $f$ 满足条件，$x \in ]0, 1]$，$n \ge 2$。由凸性，$\ln f$ 在 $[n - 1, n]$、$[n, n + x]$、$[n, n+1]$ 上的斜率递增：
$$\ln(n - 1) \le \frac{\ln f(n + x) - \ln f(n)}{x} \le \ln n.$$
用函数方程把 $f(n + x)$ 写成 $x(x+1)\cdots(x + n - 1)f(x)$，$f(n) = (n-1)!$，得到
$$\frac{(n-1)^x (n-1)!}{x(x+1)\cdots(x+n-1)} \le f(x) \le \frac{n^x(n-1)!}{x(x+1)\cdots(x+n-1)}.$$
上下界都收敛到同一个极限，所以 $f$ 被唯一确定。这同时给出 **Gauss 公式**：
$$\Gamma(x) = \lim_{n \to \infty}\frac{n^x\, n!}{x(x+1)\cdots(x+n)}.$$
:::

::: thm id=complements zh="余元公式" en="Euler's reflection formula" fr="Formule des compléments" ru="Формула дополнения" lvl=3 ref="Gourdon, *Analyse*，第 4 章；Artin, *The Gamma Function*"
对 $0 < x < 1$，$\Gamma(x)\Gamma(1 - x) = \dfrac{\pi}{\sin\pi x}$。特别地 $\Gamma(\frac12) = \sqrt\pi$（也可以直接由 Gauss 积分得到，见 {@gauss}）。
:::

## 两个经典积分

::: thm id=gauss zh="Gauss 积分" en="Gaussian integral" fr="Intégrale de Gauss" ru="Интеграл Эйлера–Пуассона" lvl=1
$$\int_0^{+\infty}\e^{-t^2}\,\dd t = \frac{\sqrt\pi}{2}.$$
:::

::: proof
令 $F(x) = \Big(\int_0^x\e^{-t^2}\,\dd t\Big)^2$，$G(x) = \int_0^1\frac{\e^{-x^2(1 + t^2)}}{1 + t^2}\,\dd t$。

$F'(x) = 2\e^{-x^2}\int_0^x \e^{-t^2}\,\dd t$。对 $G$，被积函数关于 $x$ 的偏导数为 $-2x\,\e^{-x^2(1+t^2)}$，在 $[0, 1] \times [-M, M]$ 上连续有界，由 {@derivation-parametre}，
$$G'(x) = -2x\int_0^1\e^{-x^2(1 + t^2)}\,\dd t = -2\e^{-x^2}\int_0^x\e^{-u^2}\,\dd u\quad(u = xt).$$
所以 $(F + G)' = 0$，$F + G = G(0) = \int_0^1\frac{\dd t}{1 + t^2} = \frac\pi4$。当 $x \to +\infty$，$0 \le G(x) \le \e^{-x^2}\to 0$。于是 $\big(\int_0^\infty\e^{-t^2}\big)^2 = \frac\pi4$。

第 11 章用极坐标给出另一个（更常见的）证明。
:::

::: thm id=dirichlet-integrale zh="Dirichlet 积分" en="Dirichlet integral" fr="Intégrale de Dirichlet" ru="Интеграл Дирихле" lvl=1
$$\int_0^{+\infty}\frac{\sin t}{t}\,\dd t = \frac\pi2.$$
:::

::: proof
令 $F(x) = \int_0^{+\infty}\e^{-xt}\frac{\sin t}{t}\,\dd t$，$x \ge 0$。

**$x > 0$ 时。** 在 $[a, +\infty[$（$a > 0$）上，$\big|\frac{\partial}{\partial x}\e^{-xt}\frac{\sin t}{t}\big| = \abs{\e^{-xt}\sin t} \le \e^{-at}$，可积。由 {@derivation-parametre}，
$$F'(x) = -\int_0^\infty\e^{-xt}\sin t\,\dd t = -\operatorname{Im}\int_0^\infty\e^{(-x + \ii)t}\,\dd t = -\frac{1}{1 + x^2}.$$
又 $\abs{F(x)} \le \int_0^\infty\e^{-xt}\,\dd t = \frac1x \to 0$（$\abs{\sin t} \le t$）。所以 $F(x) = \frac\pi2 - \Arctan x$。

**$x = 0$ 处的连续性。** 这里控制收敛定理不适用（$\frac{\sin t}{t}$ 不可积），改用一致收敛。记 $F_A(x) = \int_0^A\e^{-xt}\frac{\sin t}{t}\,\dd t$，它关于 $x \in [0, +\infty[$ 连续（闭区间上的含参积分）。余项 $R_A(x) = \int_A^\infty\e^{-xt}\frac{\sin t}{t}\,\dd t$：函数 $t \mapsto \frac{\e^{-xt}}{t}$ 在 $[A, \infty[$ 上递减到 $0$，由积分第二中值定理（Bonnet），对每个 $B > A$，存在 $c \in [A, B]$，使
$$\Big|\int_A^B\frac{\e^{-xt}}{t}\sin t\,\dd t\Big| = \frac{\e^{-xA}}{A}\Big|\int_A^c\sin t\,\dd t\Big| \le \frac2A.$$
所以 $\abs{R_A(x)} \le \frac2A$ 对一切 $x \ge 0$ 成立，$F_A \to F$ 在 $[0, +\infty[$ 上一致收敛，$F$ 在 $0$ 处连续。因此 $F(0) = \lim_{x \to 0^+}\big(\frac\pi2 - \Arctan x\big) = \frac\pi2$。
:::

::: ex id=fourier-gaussienne zh="Gauss 函数的 Fourier 变换" lvl=1
对 $\xi \in \R$，$\displaystyle\int_{-\infty}^{+\infty}\e^{-t^2}\cos(\xi t)\,\dd t = \sqrt\pi\,\e^{-\xi^2/4}$。

令 $F(\xi)$ 为左边。偏导数 $-t\,\e^{-t^2}\sin(\xi t)$ 被可积函数 $\abs{t}\e^{-t^2}$ 控制，所以 $F'(\xi) = -\int t\,\e^{-t^2}\sin(\xi t)\,\dd t$。分部积分（$u = \sin\xi t$，$v' = -t\e^{-t^2}$）得 $F'(\xi) = -\frac\xi2 F(\xi)$。解这个线性方程，$F(\xi) = F(0)\e^{-\xi^2/4}$，$F(0) = \sqrt\pi$。这说明 Gauss 函数在 Fourier 变换下（适当归一化后）是不变的，它是不确定性原理中的极值函数。
:::

## Stirling 公式

::: thm id=stirling-gamma zh="Γ 函数的 Stirling 公式" en="Stirling's formula for Γ" fr="Formule de Stirling pour Γ" ru="Формула Стирлинга для гамма-функции" lvl=2
$$\Gamma(x + 1) \underset{x \to +\infty}{\sim} \sqrt{2\pi x}\,\Big(\frac{x}{\e}\Big)^x.$$
:::

::: sketch
（Laplace 方法）换元 $t = x + \sqrt{x}\,u$：
$$\Gamma(x + 1) = \int_0^\infty t^x\e^{-t}\,\dd t = \Big(\frac x\e\Big)^x\sqrt x\int_{-\sqrt x}^{+\infty}\exp\Big(x\ln\Big(1 + \frac{u}{\sqrt x}\Big) - \sqrt x\, u\Big)\dd u.$$
指数中的函数 $h_x(u) \to -\frac{u^2}{2}$ 逐点成立；利用 $\ln(1 + v) - v \le -\frac{v^2}{2(1 + \abs v)}$ 类型的估计，可以找到与 $x \ge 1$ 无关的可积控制函数（$u \ge 0$ 时形如 $\e^{-c\abs{u}}$，$u < 0$ 时形如 $\e^{-u^2/2}$）。由控制收敛定理，积分收敛到 $\int_{-\infty}^{\infty}\e^{-u^2/2}\,\dd u = \sqrt{2\pi}$。
:::

::: rem zh="Laplace 方法"
这个证明的思想适用于一般的 $\int \e^{x\,\phi(t)}g(t)\,\dd t$（$x \to +\infty$）：若 $\phi$ 在内点 $t_0$ 处取唯一最大值且 $\phi''(t_0) < 0$，则积分 $\sim g(t_0)\,\e^{x\phi(t_0)}\sqrt{\frac{2\pi}{x\abs{\phi''(t_0)}}}$。这是苏联分析教材（Зорич 第二卷、Федорюк）中渐近方法的起点。
:::

## 与一致收敛方法的关系

::: rem zh="另一种体系"
不使用 Lebesgue 理论时，苏联和中国教材这样处理含参广义积分 $\int_a^{+\infty}f(x, t)\,\dd t$：称它关于 $x \in A$ **一致收敛**，如果 $\sup_{x \in A}\big|\int_c^{+\infty}f(x, t)\,\dd t\big| \to 0$（$c \to +\infty$）。判别法有 Weierstrass 判别法（存在可积的控制函数，这与控制条件相同）、Abel 判别法、Dirichlet 判别法。连续性、积分交换、求导三个定理在一致收敛（求导时要求导数的积分一致收敛）的假设下成立，证明只需要 {@double-limite} 和 {@derivation-suite}。{@dirichlet-integrale} 中 $x = 0$ 处的论证就是一个例子：Dirichlet 型判别法给出一致收敛，而控制收敛不适用。

两种方法各有长处：控制收敛的条件容易验证，而一致收敛能处理条件收敛的积分。L3 学习 Lebesgue 积分之后，控制收敛方法是标准工具。
:::
