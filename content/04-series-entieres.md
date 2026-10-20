幂级数是最重要的一类函数项级数：它们在收敛圆盘内部有极好的性质（正规收敛、无穷次可导、可以逐项运算），并且大部分初等函数都能写成幂级数。法国大纲用幂级数**定义**复指数函数，并由此严格地定义 $\cos$、$\sin$ 和 $\pi$。全章 $(a_n)$ 是复数列，$z$ 是复变量。

## 收敛半径

::: lem id=lemme-abel zh="Abel 引理" en="Abel's lemma" fr="Lemme d'Abel" ru="Лемма Абеля" lvl=1
若 $(a_n z_0^n)$ 有界，则对一切 $\abs{z} < \abs{z_0}$，$\sum a_n z^n$ 绝对收敛。
:::

::: proof
设 $\abs{a_n z_0^n} \le M$。则 $\abs{a_n z^n} = \abs{a_n z_0^n}\, \Big|\dfrac{z}{z_0}\Big|^n \le M q^n$，其中 $q = \abs{z / z_0} < 1$，与几何级数比较。
:::

::: def id=def-rayon zh="收敛半径" en="Radius of convergence" fr="Rayon de convergence" ru="Радиус сходимости"
幂级数 $\sum a_n z^n$ 的**收敛半径**
$$R = \sup\{r \ge 0 : (a_n r^n) \text{ 有界}\} \in [0, +\infty].$$
$D(0, R) = \{\abs{z} < R\}$ 称为**收敛圆盘**；实变量时称 $]-R, R[$ 为收敛区间。
:::

::: thm id=rayon-carac zh="收敛半径的刻画" lvl=1
1. 若 $\abs{z} < R$，$\sum a_n z^n$ 绝对收敛；
2. 若 $\abs{z} > R$，$\sum a_n z^n$ 粗发散（$a_n z^n$ 无界）；
3. 在圆周 $\abs{z} = R$ 上可能出现任何情况。
:::

::: proof
1. 取 $\abs{z} < r < R$ 且 $(a_n r^n)$ 有界，用 Abel 引理。
2. 由 $R$ 的定义，$(a_n z^n)$ 无界。
3. $\sum z^n$（$R = 1$）在圆周上处处发散；$\sum \frac{z^n}{n^2}$ 在圆周上处处绝对收敛；$\sum \frac{z^n}{n}$ 在 $z = 1$ 发散，在其余点收敛（{@ex-sin-n}）。
:::

::: thm id=hadamard zh="Cauchy–Hadamard 公式" en="Cauchy–Hadamard theorem" fr="Formule de Cauchy–Hadamard" ru="Формула Коши–Адамара" lvl=1
$$\frac1R = \limsup_{n \to \infty} \abs{a_n}^{1/n}$$
（约定 $\frac10 = \infty$，$\frac1\infty = 0$）。
:::

::: proof
记 $L = \limsup \abs{a_n}^{1/n}$。若 $\abs{z} L < 1$，取 $q$ 使 $\abs{z} L < q < 1$，则从某项起 $\abs{a_n}^{1/n}\abs{z} < q$，即 $\abs{a_n z^n} < q^n$，级数收敛，所以 $R \ge \abs{z}$。若 $\abs{z} L > 1$，则有无穷多个 $n$ 使 $\abs{a_n z^n} > 1$，级数发散，所以 $R \le \abs{z}$。两者合起来得 $R = 1/L$。
:::

::: prop id=dalembert-rayon zh="用比值计算收敛半径" en="Ratio test for the radius" fr="Règle de d'Alembert pour les séries entières" ru="Признак Даламбера для радиуса сходимости" lvl=1
若 $a_n \ne 0$ 且 $\Big|\dfrac{a_{n+1}}{a_n}\Big| \to \ell \in [0, +\infty]$，则 $R = \dfrac{1}{\ell}$。
:::

::: proof
对 $\sum \abs{a_n z^n}$ 用 d'Alembert 判别法 {@dalembert}：比值趋于 $\ell \abs{z}$。
:::

::: prop id=comparaison-rayons lvl=1
1. 若 $a_n = O(b_n)$，则 $R_a \ge R_b$；若 $a_n \sim b_n$，则 $R_a = R_b$。
2. $\sum a_n z^n$ 与 $\sum n^k a_n z^n$（$k \in \Z$）收敛半径相同。
3. 和与 Cauchy 乘积的收敛半径 $\ge \min(R_a, R_b)$，并且在 $\abs z < \min(R_a, R_b)$ 内，和函数分别等于两和函数之和、之积。
:::

::: proof
1. 由 $R$ 的定义直接得到。
2. $(n^k)^{1/n} \to 1$，用 Cauchy–Hadamard 公式。
3. 和：显然。乘积：在 $\abs{z} < \min(R_a, R_b)$ 内两个级数都绝对收敛，用 {@produit-cauchy}。
:::

::: ex
$\sum \frac{z^n}{n!}$：$R = \infty$。$\sum n!\, z^n$：$R = 0$。$\sum \binom{2n}{n} z^n$：比值 $\to 4$，$R = \frac14$。$\sum z^{n^2}$：只有部分系数非零，用 Cauchy–Hadamard，$R = 1$。
:::

## 和函数的正则性

::: thm id=cv-normale-disque zh="闭圆盘上的正规收敛" lvl=1
对任意 $0 \le r < R$，$\sum a_n z^n$ 在闭圆盘 $\overline{D}(0, r)$ 上正规收敛。因此和函数 $S(z) = \sum a_n z^n$ 在开圆盘 $D(0, R)$ 上连续。
:::

::: proof
$\sup_{\abs{z} \le r} \abs{a_n z^n} = \abs{a_n} r^n$，而 $\sum \abs{a_n} r^n$ 收敛（{@rayon-carac}）。连续性：每个 $z_0 \in D(0,R)$ 都在某个 $\overline{D}(0, r)$（$r < R$）的内部，在那里级数一致收敛，用 {@cont-limite-unif}。
:::

::: cex lvl=1
在整个开圆盘上不一定一致收敛：$\sum x^n$ 在 $]-1, 1[$ 上不一致收敛，因为 $\sup_{]-1,1[} \big|\frac{1}{1-x} - \sum_{k \le n} x^k\big| = \sup \frac{\abs{x}^{n+1}}{\abs{1 - x}} = +\infty$。
:::

::: thm id=derivation-se zh="逐项求导与逐项积分" en="Term-by-term differentiation and integration" fr="Dérivation et intégration terme à terme" ru="Почленное дифференцирование и интегрирование" lvl=1
设实变幂级数 $S(x) = \sum a_n x^n$ 的收敛半径为 $R > 0$。则 $S$ 在 $]-R, R[$ 上是 $\Cc^\infty$ 的，
$$S'(x) = \sum_{n \ge 1} n a_n x^{n-1}, \qquad \int_0^x S = \sum_{n \ge 0} \frac{a_n}{n+1} x^{n+1},$$
两个级数的收敛半径都是 $R$。特别地，$a_n = \dfrac{S^{(n)}(0)}{n!}$。
:::

::: proof
由 {@comparaison-rayons}，求导后的级数收敛半径仍为 $R$，所以在每个 $[-r, r]$（$r < R$）上正规收敛。由 {@transferts-series} 的第 3 条，$S$ 是 $\Cc^1$ 的且可以逐项求导。归纳得到 $\Cc^\infty$。在 $S^{(n)}(x) = \sum_{k \ge n} k(k-1)\cdots(k-n+1) a_k x^{k-n}$ 中令 $x = 0$，得 $S^{(n)}(0) = n!\,a_n$。积分的情形用 {@transferts-series} 的第 2 条。
:::

::: cor id=unicite-coef zh="系数的唯一性" lvl=1
若 $\sum a_n x^n = \sum b_n x^n$ 在 $0$ 的某个邻域内成立，则对一切 $n$，$a_n = b_n$。
:::

::: proof
两者在 $0$ 处的各阶导数相同，用 $a_n = S^{(n)}(0)/n!$。
:::

::: thm id=abel-radial zh="Abel 径向定理" en="Abel's theorem" fr="Théorème radial d'Abel" ru="Теорема Абеля (вторая)" lvl=2
若 $\sum a_n R^n$ 收敛（$0 < R < \infty$），则 $\sum a_n x^n$ 在 $[0, R]$ 上一致收敛，从而
$$\lim_{x \to R^-} \sum_{n=0}^\infty a_n x^n = \sum_{n=0}^\infty a_n R^n.$$
:::

::: sketch
设 $R = 1$。写 $a_n x^n = (a_n) \cdot (x^n)$，其中 $(x^n)_n$ 对每个 $x \in [0,1]$ 递减，且被 $1$ 控制。对余项 $\sum_{k > n} a_k$ 用 Abel 变换 {@abel-transform}，得到 $\big|\sum_{k=p}^q a_k x^k\big| \le \sup_{p \le m \le q} \big|\sum_{k=p}^{m} a_k\big|$，这个上界与 $x$ 无关，并且由 $\sum a_n$ 的 Cauchy 准则可以任意小。
:::

::: ex id=ln2 lvl=1
$\ln(1 + x) = \sum_{n \ge 1} \frac{(-1)^{n+1}}{n} x^n$ 在 $]-1,1[$ 内成立。级数在 $x = 1$ 收敛（交错级数），由 Abel 定理，
$$\sum_{n \ge 1} \frac{(-1)^{n+1}}{n} = \ln 2.$$
同理，由 $\Arctan x = \sum \frac{(-1)^n}{2n+1} x^{2n+1}$ 得 Leibniz 公式 $\sum \frac{(-1)^n}{2n+1} = \frac\pi4$。
:::

::: thm id=tauber zh="Tauber 定理" en="Tauber's theorem" fr="Théorème taubérien de Tauber" ru="Тауберова теорема" lvl=3 ref="Hardy, *Divergent Series*，第 7 章；Korevaar, *Tauberian Theory*"
Abel 定理的逆不成立：$\sum (-1)^n x^n = \frac{1}{1+x} \to \frac12$，但 $\sum (-1)^n$ 发散。Tauber（1897）证明：若 $\lim_{x \to 1^-} \sum a_n x^n = s$ 且 $a_n = o(\frac1n)$，则 $\sum a_n = s$。Littlewood（1911）把条件减弱为 $a_n = O(\frac1n)$；Hardy–Littlewood 定理处理正项情形。这类「从平均行为反推收敛」的定理统称 Tauber 型定理，是解析数论中素数定理证明的关键工具。
:::

## 幂级数展开

::: def id=def-dse zh="可展开为幂级数" en="Real-analytic function" fr="Fonction développable en série entière" ru="Функция, разложимая в степенной ряд"
$f$ 在 $]-r, r[$ 上**可展开为幂级数**（DSE），如果存在收敛半径 $\ge r$ 的幂级数，使 $f(x) = \sum a_n x^n$ 在 $]-r, r[$ 上成立。此时必有 $f$ 是 $\Cc^\infty$ 的且 $a_n = \frac{f^{(n)}(0)}{n!}$：幂级数就是 $f$ 的 **Taylor 级数**。
:::

::: cex id=cex-non-dse lvl=1
$\Cc^\infty$ 不蕴含可展开。令 $f(x) = \e^{-1/x^2}$（$x \ne 0$），$f(0) = 0$。归纳可证 $f^{(n)}(x) = P_n(1/x)\, \e^{-1/x^2}$（$P_n$ 是多项式），所以 $f^{(n)}(x) \to 0$（$x \to 0$），从而 $f^{(n)}(0) = 0$ 对一切 $n$ 成立。$f$ 的 Taylor 级数恒为 $0$，但 $f(x) > 0$（$x \ne 0$）。
:::

::: thm id=taylor-reste zh="用 Taylor 余项证明可展开" lvl=1
设 $f \in \Cc^\infty(]-r, r[)$。若 Taylor 公式的积分余项
$$R_n(x) = \int_0^x \frac{(x-t)^n}{n!} f^{(n+1)}(t)\,\dd t$$
对每个 $x \in ]-r, r[$ 趋于 $0$，则 $f$ 在 $]-r, r[$ 上可展开为幂级数。特别地，若 $f \in \Cc^\infty(\R)$，且对每个 $A > 0$ 存在 $M_A$，使 $\abs{f^{(n)}(x)} \le M_A$ 对一切 $n$ 和一切 $\abs{x} \le A$ 成立，则 $f$ 在 $\R$ 上可展开。
:::

::: proof
第一部分就是 Taylor 公式 $f(x) = \sum_{k \le n} \frac{f^{(k)}(0)}{k!}x^k + R_n(x)$。第二部分：取 $A = \abs{x}$，$\abs{R_n(x)} \le M_A\frac{\abs{x}^{n+1}}{(n+1)!} \to 0$。
:::

::: ex id=dse-usuels zh="常用展开" lvl=1
由 {@taylor-reste}（在每个 $[-A, A]$ 上各阶导数一致有界：$\exp$ 的界是 $\e^A$，$\sin$、$\cos$ 的界是 $1$）：
$$\e^x = \sum_{n \ge 0} \frac{x^n}{n!},\quad \cos x = \sum_{n \ge 0} \frac{(-1)^n x^{2n}}{(2n)!},\quad \sin x = \sum_{n \ge 0} \frac{(-1)^n x^{2n+1}}{(2n+1)!}\qquad (x \in \R).$$
由几何级数逐项积分：
$$\ln(1 + x) = \sum_{n \ge 1} \frac{(-1)^{n+1}}{n} x^n,\qquad \Arctan x = \sum_{n \ge 0} \frac{(-1)^n}{2n+1} x^{2n+1}\qquad (\abs{x} < 1).$$
:::

::: thm id=binome zh="二项式级数" en="Binomial series" fr="Série du binôme" ru="Биномиальный ряд" lvl=1
对 $\alpha \in \R$ 和 $\abs{x} < 1$：
$$(1 + x)^\alpha = \sum_{n \ge 0} \binom{\alpha}{n} x^n,\qquad \binom{\alpha}{n} = \frac{\alpha(\alpha - 1)\cdots(\alpha - n + 1)}{n!}.$$
:::

::: proof
若 $\alpha \in \N$，这是二项式定理。否则 $\binom{\alpha}{n} \ne 0$，比值 $\big|\binom{\alpha}{n+1} / \binom{\alpha}{n}\big| = \big|\frac{\alpha - n}{n+1}\big| \to 1$，所以 $R = 1$。

**微分方程方法**：$S(x) = \sum \binom{\alpha}{n} x^n$ 满足 $(1 + x) S'(x) = \alpha S(x)$。这可以逐系数验证：$x^n$ 的系数两边分别是 $(n+1)\binom{\alpha}{n+1} + n\binom{\alpha}{n}$ 与 $\alpha\binom{\alpha}{n}$，而 $(n+1)\binom{\alpha}{n+1} = (\alpha - n)\binom{\alpha}{n}$。于是 $\big(S(x)(1+x)^{-\alpha}\big)' = 0$，又 $S(0) = 1$，所以 $S(x) = (1 + x)^\alpha$。
:::

::: method zh="求幂级数展开的三种方法"
1. **已知展开的代数运算**：和、积、代入（例如 $\e^{-x^2}$）。
2. **逐项求导或积分**：若 $f'$ 的展开已知，积分得到 $f$ 的展开（如 $\ln$、$\Arctan$、$\arcsin$）。
3. **微分方程**：找到 $f$ 满足的线性微分方程，代入未知的幂级数，求系数递推关系（如二项式级数、Bessel 函数）。最后必须验证收敛半径 $> 0$，并用解的唯一性（第 8 章）说明幂级数确实等于 $f$。
:::

::: thm id=borel zh="Borel 引理" en="Borel's lemma" fr="Lemme de Borel" ru="Лемма Бореля" lvl=3 ref="Hörmander, *The Analysis of Linear Partial Differential Operators I*，§1.2"
对任意实数列 $(c_n)$，存在 $f \in \Cc^\infty(\R)$，使 $f^{(n)}(0) = c_n$ 对一切 $n$ 成立。因此 Taylor 级数可以有任意的系数，收敛半径甚至可以是 $0$。
:::

## 复指数与 π 的定义

::: def id=def-exp zh="复指数函数" en="Complex exponential" fr="Exponentielle complexe" ru="Комплексная экспонента"
对 $z \in \C$，定义 $\exp(z) = \sum_{n \ge 0} \dfrac{z^n}{n!}$（$R = \infty$），并定义
$$\cos z = \frac{\e^{\ii z} + \e^{-\ii z}}{2},\qquad \sin z = \frac{\e^{\ii z} - \e^{-\ii z}}{2\ii}.$$
:::

::: thm id=exp-morphisme zh="指数函数的函数方程" en="Functional equation of exp" fr="Propriété de morphisme de l'exponentielle" ru="Основное свойство экспоненты" lvl=1
对一切 $a, b \in \C$，$\exp(a + b) = \exp(a)\exp(b)$。
:::

::: proof
两个级数都绝对收敛，由 Cauchy 乘积 {@produit-cauchy}，
$$\exp(a)\exp(b) = \sum_{n \ge 0} \sum_{k=0}^n \frac{a^k}{k!}\frac{b^{n-k}}{(n-k)!} = \sum_{n \ge 0} \frac{(a + b)^n}{n!}$$
（二项式定理）。
:::

::: cor lvl=1
$\exp(z) \ne 0$；$\overline{\exp z} = \exp \bar z$；对 $t \in \R$，$\abs{\e^{\ii t}} = 1$，即 $\cos^2 t + \sin^2 t = 1$；$\frac{\dd}{\dd t}\e^{\ii t} = \ii\, \e^{\ii t}$。
:::

::: proof
$\exp(z)\exp(-z) = \exp(0) = 1$。共轭：系数是实数。$\abs{\e^{\ii t}}^2 = \e^{\ii t}\,\e^{-\ii t} = 1$。导数：对实变量 $t$ 逐项求导 {@derivation-se}。
:::

::: thm id=def-pi zh="π 的分析定义" en="Analytic definition of π" fr="Définition analytique de π" ru="Аналитическое определение числа π" lvl=2
$\cos$ 在 $]0, 2[$ 上恰有一个零点，记为 $\frac{\pi}{2}$。于是 $t \mapsto \e^{\ii t}$ 是 $2\pi$ 周期的，并且它是从 $[0, 2\pi[$ 到单位圆的双射。
:::

::: sketch
$\cos 0 = 1$；由交错级数的余项估计，$\cos 2 \le 1 - 2 + \frac{2}{3} < 0$。由介值定理，$\cos$ 在 $]0, 2[$ 上有零点。在 $[0, 2]$ 上 $\sin t = t - \frac{t^3}{6} + \dots \ge t(1 - \frac{t^2}{6}) > 0$（交错级数），所以 $\cos' = -\sin < 0$，零点唯一。由 $\cos\frac{\pi}{2} = 0$，$\sin\frac\pi2 = 1$ 得 $\e^{\ii\pi/2} = \ii$，于是 $\e^{2\pi \ii} = \ii^4 = 1$。周期恰为 $2\pi$ 及双射性质需要再分析 $\cos$、$\sin$ 在各个四分之一周期上的单调性。
:::

::: rem
Euler 公式 $\e^{\ii\pi} + 1 = 0$ 在这里是定义的直接推论。用这种方式，三角函数和 $\pi$ 不再依赖几何直观（「弧长」「角度」），整个分析可以建立在实数公理之上。
:::

## 交互：Taylor 多项式

::: demo id=taylor
选择函数并拖动阶数 $N$。绿色带是收敛区间 $]-R, R[$。注意 $\frac{1}{1+x^2}$：它在 $\R$ 上任意次可导，Taylor 级数的收敛半径却只有 $1$。在实轴上看不到原因，原因在复平面上：$z = \pm\ii$ 是奇点，收敛圆盘不能越过它们。
:::

## 应用：生成函数与微分方程

::: ex id=fibonacci zh="Fibonacci 数" lvl=1
$F_0 = 0$，$F_1 = 1$，$F_{n+2} = F_{n+1} + F_n$。令 $G(x) = \sum F_n x^n$，由递推关系得 $G(x)(1 - x - x^2) = x$，即 $G(x) = \frac{x}{1 - x - x^2}$。部分分式分解后展开，得 Binet 公式
$$F_n = \frac{\varphi^n - \psi^n}{\sqrt5},\qquad \varphi = \frac{1 + \sqrt5}{2},\ \psi = \frac{1 - \sqrt5}{2}.$$
严格的论证需要先说明 $\sum F_n x^n$ 的收敛半径为正（$F_n \le 2^n$ 即可），然后由 {@unicite-coef} 比较系数。
:::

::: ex id=bernoulli zh="Bernoulli 数" lvl=2
函数 $\frac{x}{\e^x - 1}$（在 $0$ 处补充定义为 $1$）可展开为 $\sum_{n \ge 0} \frac{B_n}{n!} x^n$，收敛半径为 $2\pi$（复平面上最近的奇点是 $\pm 2\pi\ii$）。$B_0 = 1$，$B_1 = -\frac12$，$B_2 = \frac16$，$B_4 = -\frac{1}{30}$，奇数下标 $\ge 3$ 时 $B_n = 0$。它们出现在 Euler 公式
$$\zeta(2k) = \frac{(-1)^{k+1} B_{2k} (2\pi)^{2k}}{2\,(2k)!}$$
中（第 5 章证明 $k = 1, 2$ 的情形），也出现在 Euler–Maclaurin 求和公式中。
:::

::: ex id=airy zh="Airy 方程" lvl=1
求 $y'' = xy$ 的幂级数解。代入 $y = \sum a_n x^n$，比较系数得 $a_2 = 0$，$(n+2)(n+1)a_{n+2} = a_{n-1}$（$n \ge 1$）。系数由 $a_0, a_1$ 决定，且 $\abs{a_{n+3}/a_n} = \frac{1}{(n+3)(n+2)} \to 0$，收敛半径为 $\infty$。两个独立解对应 $(a_0, a_1) = (1, 0)$ 和 $(0, 1)$。
:::
