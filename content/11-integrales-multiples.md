本章把 Riemann 积分推广到 $\R^n$ 中的区域，核心工具有两个：**Fubini 定理**把重积分化为累次积分，**变量替换公式**处理坐标变换，其中 Jacobi 行列式起着「体积伸缩因子」的作用。最后一节介绍曲线积分与 Green–Riemann 公式，它是微积分基本定理在平面上的推广。这一章属于法国 licence L2 的内容（MP 大纲没有）。L2 采用 Riemann 方法，完整的理论（Lebesgue 测度、一般的 Fubini–Tonelli 定理）在 L3 完成，所以本章有几个证明只给出概要。

## 矩形上的积分

::: def id=def-integrale-pave zh="矩形上的 Riemann 积分" en="Riemann integral on a box" fr="Intégrale de Riemann sur un pavé" ru="Интеграл Римана по брусу"
设 $P = [a_1, b_1] \times \dots \times [a_n, b_n]$ 是闭矩形（pavé），$f : P \to \R$ 有界。对 $P$ 的分割（每个坐标区间分割的乘积）$\sigma$，定义 Darboux 上和与下和
$$S^+(f, \sigma) = \sum_{Q \in \sigma}\sup_Qf\cdot\operatorname{vol}(Q),\qquad S^-(f, \sigma) = \sum_{Q \in \sigma}\inf_Qf\cdot\operatorname{vol}(Q).$$
若 $\inf_\sigma S^+ = \sup_\sigma S^-$，称 $f$ 在 $P$ 上 **Riemann 可积**，这个公共值记为 $\int_Pf$ 或 $\iint_Pf(x, y)\,\dd x\,\dd y$。
:::

::: thm id=continue-integrable zh="连续函数可积" lvl=2
矩形上的连续函数 Riemann 可积。积分是线性的、单调的，且 $\abs{\int_Pf} \le \int_P\abs f \le \operatorname{vol}(P)\norm f_\infty$。
:::

::: sketch
$f$ 在紧集 $P$ 上一致连续（{@heine}）。给定 $\eps$，取分割使每个小矩形的直径 $< \delta$，则 $\sup_Qf - \inf_Qf \le \eps$，所以 $S^+ - S^- \le \eps\operatorname{vol}(P)$。与一元情形完全相同。
:::

::: thm id=fubini-pave zh="矩形上的 Fubini 定理" en="Fubini's theorem on a box" fr="Théorème de Fubini sur un pavé" ru="Теорема Фубини для бруса" lvl=1
若 $f$ 在 $P = [a, b] \times [c, d]$ 上连续，则
$$\iint_Pf = \int_a^b\Big(\int_c^df(x, y)\,\dd y\Big)\dd x = \int_c^d\Big(\int_a^bf(x, y)\,\dd x\Big)\dd y.$$
$n$ 维情形同理，可以按任意顺序逐次积分。
:::

::: proof
两个累次积分相等就是 {@fubini-segment}。下面证明它们等于二重积分。记 $F(x) = \int_c^df(x, y)\,\dd y$。对分割 $\sigma = \{[x_{i-1}, x_i] \times [y_{j-1}, y_j]\}$，在每个小矩形上 $\inf f \le f \le \sup f$，先对 $y$ 积分再对 $x$ 积分得
$$S^-(f, \sigma) \le \sum_i\int_{x_{i-1}}^{x_i}F(x)\,\dd x = \int_a^bF \le S^+(f, \sigma).$$
$f$ 可积，所以上下和都收敛到 $\iint_Pf$。$n$ 维的情形对维数归纳。
:::

::: ex lvl=1
$\iint_{[0,1]^2}xy\,\e^{x^2}\,\dd x\,\dd y = \int_0^1x\,\e^{x^2}\,\dd x\cdot\int_0^1y\,\dd y = \frac{\e - 1}{2}\cdot\frac12$。对乘积形式的函数 $f(x)g(y)$，二重积分等于两个一元积分的乘积。
:::

## 一般区域上的积分

::: def id=def-jordan zh="Jordan 可测集、面积与体积" en="Jordan measurable set" fr="Partie quarrable (mesurable au sens de Jordan)" ru="Множество, измеримое по Жордану"
有界集 $D \subset \R^n$ 是 **Jordan 可测**的（二维时称「可求面积」，quarrable），如果它的边界 $\partial D$ 可以被总体积任意小的有限个矩形覆盖。此时对 $D$ 上的连续有界函数 $f$，取包含 $D$ 的矩形 $P$，定义
$$\int_Df = \int_P\tilde f,\qquad\tilde f = f\cdot\mathbf{1}_D\ \text{（在 }D\text{ 外补零）}.$$
$\tilde f$ 只在 $\partial D$ 上可能不连续，而 $\partial D$ 的「体积」为零，所以 $\tilde f$ 可积（证明与 {@continue-integrable} 相同，把覆盖 $\partial D$ 的矩形单独处理）。$\operatorname{vol}(D) = \int_D1$。
:::

::: thm id=lebesgue-critere zh="Lebesgue 可积准则" en="Lebesgue's criterion for Riemann integrability" fr="Critère de Lebesgue" ru="Критерий Лебега интегрируемости по Риману" lvl=3 ref="Spivak, *Calculus on Manifolds*，定理 3-8"
矩形上的有界函数 Riemann 可积，当且仅当它的不连续点集是 Lebesgue 零测集（对任意 $\eps$，可以被总体积 $< \eps$ 的**可数**个矩形覆盖）。
:::

::: def id=def-domaine-elementaire zh="基本区域" en="Elementary (simple) domain" fr="Domaine élémentaire" ru="Элементарная область"
平面区域 $D$ 称为 **$y$-型基本区域**，如果
$$D = \{(x, y) : a \le x \le b,\ \varphi_1(x) \le y \le \varphi_2(x)\},$$
其中 $\varphi_1 \le \varphi_2$ 在 $[a,b]$ 上连续。$x$-型同理。圆盘、三角形、两条曲线之间的区域都是基本区域。
:::

::: thm id=fubini-domaine zh="基本区域上的 Fubini 定理" lvl=2
若 $f$ 在 $y$-型基本区域 $D$ 上连续，则
$$\iint_Df = \int_a^b\Big(\int_{\varphi_1(x)}^{\varphi_2(x)}f(x, y)\,\dd y\Big)\dd x.$$
:::

::: sketch
$D$ 的边界由两个连续函数的图像和两条竖直线段组成，每个连续函数的图像可以被总面积任意小的矩形覆盖（一致连续性），所以 $D$ 是 Jordan 可测的。对 $\tilde f = f\mathbf{1}_D$ 重复 {@fubini-pave} 的证明：关键是对每个 $x$，$y \mapsto \tilde f(x, y)$ 只有两个间断点，内层积分有意义，且它关于 $x$ 可积。
:::

::: ex id=ex-triangle lvl=1
$D = \{(x, y) : 0 \le y \le x \le 1\}$。
$$\iint_D\frac{\sin x}{x}\,\dd x\,\dd y = \int_0^1\Big(\int_0^x\frac{\sin x}{x}\,\dd y\Big)\dd x = \int_0^1\sin x\,\dd x = 1 - \cos 1.$$
若按 $x$ 先积分，内层积分 $\int_y^1\frac{\sin x}{x}\,\dd x$ 没有初等原函数。选择积分顺序是一种技巧。
:::

## 变量替换

::: thm id=changement-variables zh="变量替换公式" en="Change of variables formula" fr="Formule du changement de variables" ru="Формула замены переменных в кратном интеграле" lvl=2
设 $\Phi : U \to V$ 是 $\R^n$ 开集之间的 $\Cc^1$ 微分同胚，$D \subset U$ 是紧的 Jordan 可测集，$f$ 在 $\Phi(D)$ 上连续。则
$$\int_{\Phi(D)}f(y)\,\dd y = \int_Df(\Phi(x))\,\abs{\det J_\Phi(x)}\,\dd x.$$
:::

::: sketch
**线性情形。** 若 $\Phi = A$ 是可逆线性映射，则 $\operatorname{vol}(A(D)) = \abs{\det A}\operatorname{vol}(D)$。证明：$A$ 是初等矩阵的乘积；对每种初等矩阵（交换两个坐标、一个坐标乘以常数、一个坐标加上另一个坐标的倍数）用 Fubini 定理直接验证，然后用 $\det$ 的乘法性。

**一般情形。** 局部地 $\Phi(x + h) \approx \Phi(x) + J_\Phi(x)h$，所以小立方体 $Q$ 的像的体积 $\approx \abs{\det J_\Phi(x)}\operatorname{vol}(Q)$。把 $D$ 分割成小立方体，用 $\Phi$ 的 $\Cc^1$ 性质（在紧集上 $J_\Phi$ 一致连续）控制误差，得到 Riemann 和的比较。严格的证明见 Spivak, *Calculus on Manifolds*，定理 3-13，或 Зорич 第二卷第 11 章。
:::

::: rem
$\abs{\det J_\Phi}$ 中的绝对值很重要：重积分不涉及「方向」。一元情形 $\int_{\varphi(a)}^{\varphi(b)}f = \int_a^bf(\varphi)\varphi'$ 中没有绝对值，是因为一元积分 $\int_a^b$ 带有定向（$\int_b^a = -\int_a^b$）。第 11.5 节的曲线积分和 Зорич 的微分形式理论会把定向的观点推广到高维。
:::

::: ex id=coord-polaires zh="极坐标、柱坐标、球坐标" lvl=1
1. **极坐标**：$(x, y) = (r\cos\theta, r\sin\theta)$，$\det J = r$。$\dd x\,\dd y = r\,\dd r\,\dd\theta$。
2. **柱坐标**：$(x, y, z) = (r\cos\theta, r\sin\theta, z)$，$\det J = r$。
3. **球坐标**：$(x, y, z) = (r\sin\varphi\cos\theta, r\sin\varphi\sin\theta, r\cos\varphi)$，$\varphi \in [0, \pi]$ 是与 $z$ 轴的夹角。展开 $3\times3$ 行列式得 $\det J = r^2\sin\varphi$。

这些映射在一个零测集（例如极坐标的半直线 $\theta = \pm\pi$）上不是微分同胚，但零测集不影响积分：先在去掉一个小邻域的紧集上用 {@changement-variables}，再令邻域缩小。
:::

::: ex lvl=1
半径为 $R$ 的球的体积：
$$\iiint_{\norm x \le R}1 = \int_0^R\int_0^\pi\int_0^{2\pi}r^2\sin\varphi\,\dd\theta\,\dd\varphi\,\dd r = \frac{R^3}{3}\cdot2\cdot2\pi = \frac43\pi R^3.$$
:::

## 广义重积分

::: thm id=tonelli-continu zh="非负函数的 Tonelli 定理" en="Tonelli's theorem (non-negative continuous case)" fr="Théorème de Fubini–Tonelli (cas positif)" ru="Теорема Тонелли" lvl=3 ref="L3 积分论；Rudin, *Real and Complex Analysis*，定理 8.8"
设 $I, J$ 是区间，$f : I \times J \to \R_+$ 连续。则（在 $[0, +\infty]$ 中）
$$\int_I\Big(\int_Jf(x, y)\,\dd y\Big)\dd x = \int_J\Big(\int_If(x, y)\,\dd x\Big)\dd y,$$
这个公共值定义为广义积分 $\iint_{I \times J}f$。它也等于 $\lim\iint_{K_m}f$，其中 $(K_m)$ 是任意一列递增的、并为 $I \times J$ 的紧 Jordan 可测集（**穷竭序列**）。对可积的变号函数（$\iint\abs f < \infty$），结论同样成立（Fubini 定理）。
:::

::: thm id=gauss-polaires zh="用极坐标计算 Gauss 积分" lvl=1
$$\int_{-\infty}^{+\infty}\e^{-x^2}\,\dd x = \sqrt\pi.$$
:::

::: proof
令 $I = \int_{-\infty}^{\infty}\e^{-x^2}\,\dd x$。由 {@tonelli-continu}，
$I^2 = \iint_{\R^2}\e^{-(x^2 + y^2)}\,\dd x\,\dd y$，并且可以用圆盘 $\overline{B}(0, R)$ 作穷竭序列。在圆盘上用极坐标：
$$\iint_{\overline B(0,R)}\e^{-(x^2+y^2)}\,\dd x\,\dd y = \int_0^{2\pi}\int_0^R\e^{-r^2}r\,\dd r\,\dd\theta = \pi\big(1 - \e^{-R^2}\big) \xrightarrow[R\to\infty]{}\pi.$$
:::

::: thm id=beta-gamma zh="Β 函数与 Γ 函数的关系" en="Beta function" fr="Fonction Bêta" ru="Бета-функция" lvl=1
对 $x, y > 0$，定义 $\mathrm{B}(x, y) = \int_0^1t^{x-1}(1 - t)^{y-1}\,\dd t$。则
$$\mathrm{B}(x, y) = \frac{\Gamma(x)\Gamma(y)}{\Gamma(x + y)}.$$
推论：$\Gamma(\frac12) = \sqrt\pi$。
:::

::: proof
在 $\Gamma(x) = \int_0^\infty t^{x-1}\e^{-t}\,\dd t$ 中令 $t = u^2$，得 $\Gamma(x) = 2\int_0^\infty u^{2x-1}\e^{-u^2}\,\dd u$。于是由 {@tonelli-continu}，
$$\Gamma(x)\Gamma(y) = 4\iint_{\R_+^2}u^{2x-1}v^{2y-1}\e^{-(u^2+v^2)}\,\dd u\,\dd v.$$
用极坐标 $u = r\cos\theta$，$v = r\sin\theta$（$r > 0$，$\theta \in ]0, \frac\pi2[$）：
$$= 4\int_0^{\pi/2}\cos^{2x-1}\theta\sin^{2y-1}\theta\,\dd\theta\cdot\int_0^\infty r^{2(x+y)-1}\e^{-r^2}\,\dd r = 2\int_0^{\pi/2}\cos^{2x-1}\theta\sin^{2y-1}\theta\,\dd\theta\cdot\Gamma(x + y).$$
最后在 $\mathrm{B}(x,y)$ 中令 $t = \cos^2\theta$，$\dd t = -2\cos\theta\sin\theta\,\dd\theta$，得 $\mathrm{B}(x, y) = 2\int_0^{\pi/2}\cos^{2x-1}\theta\sin^{2y-1}\theta\,\dd\theta$。推论：$\mathrm{B}(\frac12, \frac12) = \int_0^1\frac{\dd t}{\sqrt{t(1-t)}} = \pi$（令 $t = \sin^2\theta$），而 $\Gamma(1) = 1$。
:::

::: thm id=volume-boule zh="$n$ 维球的体积" en="Volume of the $n$-ball" fr="Volume de la boule unité de $\mathbb{R}^n$" ru="Объём $n$-мерного шара" lvl=1
$\R^n$ 中单位球的体积为
$$V_n = \frac{\pi^{n/2}}{\Gamma\big(\frac n2 + 1\big)}.$$
$V_1 = 2$，$V_2 = \pi$，$V_3 = \frac43\pi$，$V_4 = \frac{\pi^2}{2}$，$V_5 = \frac{8\pi^2}{15}$。当 $n \to \infty$ 时 $V_n \to 0$。
:::

::: proof
由 Fubini 定理按最后一个坐标切片：截面 $\{x_n = t\}$ 是半径为 $\sqrt{1 - t^2}$ 的 $n-1$ 维球，
$$V_n = V_{n-1}\int_{-1}^1(1 - t^2)^{\frac{n-1}{2}}\,\dd t = V_{n-1}\,\mathrm{B}\Big(\frac12, \frac{n+1}{2}\Big) = V_{n-1}\frac{\Gamma(\frac12)\Gamma(\frac{n+1}{2})}{\Gamma(\frac n2 + 1)}$$
（令 $t^2 = s$ 化为 Β 函数）。由 $V_1 = 2 = \frac{\pi^{1/2}}{\Gamma(3/2)}$（$\Gamma(\frac32) = \frac12\sqrt\pi$）归纳即得。$V_n \to 0$：由 Stirling 公式，$\Gamma(\frac n2 + 1)$ 的增长远快于 $\pi^{n/2}$。
:::

::: rem zh="高维几何的反直觉"
$V_n$ 在 $n = 5$ 时达到最大，然后迅速趋于 $0$；单位立方体 $[-\frac12, \frac12]^n$ 的体积始终为 $1$，但它的顶点到中心的距离 $\frac{\sqrt n}{2} \to \infty$。高维球的体积集中在赤道附近和表面附近（测度集中现象），这是高维概率与数据科学的重要现象。
:::

## 曲线积分与 Green–Riemann 公式

::: def id=def-integrale-curviligne zh="曲线积分（第二型）" en="Line integral of a 1-form" fr="Intégrale curviligne d'une forme différentielle" ru="Криволинейный интеграл второго рода"
设 $\gamma : [a, b] \to \R^2$ 是分段 $\Cc^1$ 的路径，$\omega = P\,\dd x + Q\,\dd y$ 是连续的**微分 1-形式**（等价地，向量场 $V = (P, Q)$）。定义
$$\int_\gamma\omega = \int_a^b\Big(P(\gamma(t))\,x'(t) + Q(\gamma(t))\,y'(t)\Big)\dd t = \int_a^b\ps{V(\gamma(t)), \gamma'(t)}\,\dd t.$$
物理意义：力场 $V$ 沿路径所做的功。它与保持方向的重新参数化无关，反向时变号。
:::

::: prop id=forme-exacte zh="恰当形式" en="Exact forms" fr="Formes exactes" ru="Точные формы" lvl=1
若 $\omega = \dd f$（即 $V = \nabla f$，$f \in \Cc^1$），则 $\int_\gamma\omega = f(\gamma(b)) - f(\gamma(a))$ 只依赖于端点。特别地，沿闭路径的积分为 $0$。
:::

::: proof
$\frac{\dd}{\dd t}f(\gamma(t)) = \ps{\nabla f(\gamma(t)), \gamma'(t)}$（链式法则），用微积分基本定理（在每个 $\Cc^1$ 段上分别使用）。
:::

::: ex id=circulation-vortex lvl=1
$\omega = \dfrac{-y\,\dd x + x\,\dd y}{x^2 + y^2}$ 在 $\R^2\setminus\{0\}$ 上是**闭形式**（$\partial_yP = \partial_xQ$），但沿单位圆 $\gamma(t) = (\cos t, \sin t)$，
$$\int_\gamma\omega = \int_0^{2\pi}(\sin^2t + \cos^2t)\,\dd t = 2\pi \ne 0,$$
所以它不是恰当形式。这完成了第 9 章 {@poincare} 之后反例的论证。
:::

::: thm id=green-riemann zh="Green–Riemann 公式" en="Green's theorem" fr="Formule de Green–Riemann" ru="Формула Грина" lvl=1
设 $D \subset \R^2$ 既是 $x$-型又是 $y$-型基本区域，其边界 $\partial D$ 是分段 $\Cc^1$ 的闭曲线，取**正向**（逆时针，区域在左侧）。若 $P, Q$ 在 $D$ 的一个邻域上是 $\Cc^1$ 的，则
$$\oint_{\partial D}P\,\dd x + Q\,\dd y = \iint_D\Big(\frac{\partial Q}{\partial x} - \frac{\partial P}{\partial y}\Big)\dd x\,\dd y.$$
:::

::: proof
分别证明 $\oint P\,\dd x = -\iint\partial_yP$ 和 $\oint Q\,\dd y = \iint\partial_xQ$。

对第一个式子，用 $y$-型描述 $D = \{a \le x \le b,\ \varphi_1(x) \le y \le \varphi_2(x)\}$。由 Fubini 定理和微积分基本定理，
$$\iint_D\frac{\partial P}{\partial y} = \int_a^b\big(P(x, \varphi_2(x)) - P(x, \varphi_1(x))\big)\dd x.$$
另一方面，正向边界由四段组成：下边 $x \mapsto (x, \varphi_1(x))$（$x$ 从 $a$ 到 $b$），右边竖直线段，上边 $(x, \varphi_2(x))$（$x$ 从 $b$ 到 $a$），左边竖直线段。在竖直线段上 $\dd x = 0$。所以
$$\oint_{\partial D}P\,\dd x = \int_a^bP(x, \varphi_1(x))\,\dd x - \int_a^bP(x, \varphi_2(x))\,\dd x = -\iint_D\frac{\partial P}{\partial y}.$$
第二个式子用 $x$-型描述，同理（符号相反是因为方向）。
:::

::: cor id=aire-green zh="用曲线积分计算面积" lvl=1
$$\operatorname{aire}(D) = \oint_{\partial D}x\,\dd y = -\oint_{\partial D}y\,\dd x = \frac12\oint_{\partial D}(x\,\dd y - y\,\dd x).$$
例：椭圆 $x = a\cos t$，$y = b\sin t$ 的面积 $= \frac12\int_0^{2\pi}ab(\cos^2t + \sin^2t)\,\dd t = \pi ab$。这个公式也是第 5 章等周不等式 {@isoperimetrique} 中面积公式的来源。
:::

::: proof
在 Green–Riemann 公式中分别取 $(P, Q) = (0, x)$、$(-y, 0)$、$\frac12(-y, x)$。
:::

::: rem zh="更一般的区域"
任何能被切成有限个「既是 $x$-型又是 $y$-型」的区域的 $D$ 都满足 Green–Riemann 公式：内部的切割线被两侧以相反方向各经过一次，积分互相抵消。带洞的区域（例如圆环）也是如此，此时外边界逆时针、内边界顺时针。
:::

## 展望：Gauss 公式与 Stokes 公式

::: thm id=ostrogradski zh="Gauss–Ostrogradski 公式（散度定理）" en="Divergence theorem" fr="Formule de Green–Ostrogradski" ru="Формула Остроградского–Гаусса" lvl=3 ref="Зорич，第二卷第 13 章；Spivak, *Calculus on Manifolds*，第 5 章"
设 $\Omega \subset \R^3$ 是边界光滑的有界区域，$\vec n$ 是外法向量，$V$ 是 $\Cc^1$ 向量场。则
$$\iiint_\Omega\operatorname{div}V\,\dd x\,\dd y\,\dd z = \iint_{\partial\Omega}V\cdot\vec n\,\dd S.$$
:::

::: thm id=stokes zh="Stokes 公式" en="Stokes' theorem" fr="Formule de Stokes" ru="Формула Стокса" lvl=3 ref="Зорич，第二卷第 13 章；Spivak, *Calculus on Manifolds*，第 5 章"
设 $S$ 是 $\R^3$ 中的定向曲面，边界 $\partial S$ 取相容的方向，则 $\iint_S(\operatorname{rot}V)\cdot\vec n\,\dd S = \oint_{\partial S}V\cdot\dd\vec\ell$。用微分形式的语言，Green–Riemann、Gauss–Ostrogradski、Stokes 三个公式与微积分基本定理统一为
$$\int_M\dd\omega = \int_{\partial M}\omega.$$
这是 L3（微分几何）的主题。
:::

::: open zh="Kakeya 猜想"
**Besicovitch 集**是 $\R^n$ 中在每个方向上都包含一条单位线段的集合。Besicovitch（1919）构造出 Lebesgue 测度为零的这种集合，这本身就说明了 Jordan 测度（即本章的「体积」）的局限。**Kakeya 猜想**断言：这样的集合的 Hausdorff 维数（以及 Minkowski 维数）一定是 $n$。$n = 2$ 的情形由 Davies（1971）证明。2025 年 Hong Wang 与 Joshua Zahl 发表预印本，宣布证明了 $n = 3$ 的情形；$n \ge 4$ 时仍未解决。它与调和分析中的 Fourier 限制猜想密切相关。
:::
