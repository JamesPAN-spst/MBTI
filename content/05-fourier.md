Fourier 在 1807 年研究热传导时断言「任何周期函数都可以写成三角级数」。这个断言引出了整个现代分析：Riemann 积分、一致收敛、Cantor 集合论、Lebesgue 积分，都是为了弄清它在什么意义下成立。本章的函数都是 $2\pi$ 周期的分段连续函数 $f : \R \to \C$（fonctions continues par morceaux）。

本章的主线是三种收敛方式。它们需要的假设不同，结论也不同，读的时候要始终分清：

| 收敛方式 | 对 $f$ 的假设 | 结论 |
|---|---|---|
| 均方收敛：$\norm{f - S_N f}_2 \to 0$ | 分段连续 | Parseval 恒等式 {@parseval} |
| 逐点收敛：$S_N f(x) \to \frac12\big(f(x^+) + f(x^-)\big)$ | 分段 $\Cc^1$ | Dirichlet 定理 {@dirichlet-fourier} |
| 正规收敛（从而一致收敛） | 连续且分段 $\Cc^1$ | {@cv-normale-fourier} |

另外，Fejér 定理 {@fejer} 说明：只要 $f$ 连续，部分和的**算术平均** $\sigma_N f$ 就一致收敛到 $f$；而部分和 $S_N f$ 本身可以在某些点发散（{@du-bois-reymond}）。

## 周期函数与 Fourier 系数

要定义 Fourier 系数，需要在一个周期上积分。本节先说清楚允许哪些函数（分段连续、分段 $\Cc^1$），证明「在哪个周期上积分都一样」，然后定义系数，并算出三个标准例子：方波、锯齿波、三角波。后面几节会反复用到这三个例子。

::: def id=c5-def-cpm zh="分段连续与分段 $\Cc^1$ 的周期函数" en="Piecewise continuous and piecewise $C^1$ periodic functions" fr="Fonctions $2\pi$-périodiques continues par morceaux, de classe $\mathcal{C}^1$ par morceaux" ru="Кусочно-непрерывные и кусочно-гладкие периодические функции"
设 $f : \R \to \C$ 是 $2\pi$ 周期的。

1. 称 $f$ **分段连续**，如果存在 $[-\pi, \pi]$ 的分割 $-\pi = t_0 < t_1 < \cdots < t_p = \pi$，使得
   $$\forall k \in \{1, \dots, p\},\quad f\big|_{]t_{k-1}, t_k[}\ \text{连续，且}\ \lim_{t \to t_{k-1}^+} f(t),\ \lim_{t \to t_k^-} f(t)\ \text{存在且有限}.$$
   等价地：每个限制 $f|_{]t_{k-1}, t_k[}$ 都能延拓为 $[t_{k-1}, t_k]$ 上的连续函数 $\varphi_k$。这样的分割称为与 $f$ **相适应**的分割。

2. 称 $f$ **分段 $\Cc^1$**，如果存在分割，使每个限制 $f|_{]t_{k-1}, t_k[}$ 都能延拓为 $[t_{k-1}, t_k]$ 上的 $\Cc^1$ 函数 $\varphi_k$。

记 $\Cc_{2\pi}$ 为 $2\pi$ 周期连续函数 $\R \to \C$ 的集合，$\mathcal{CM}_{2\pi}$ 为 $2\pi$ 周期分段连续函数的集合。对 $f \in \mathcal{CM}_{2\pi}$ 和 $x \in \R$，记单侧极限 $f(x^+) = \lim_{t \to x^+} f(t)$，$f(x^-) = \lim_{t \to x^-} f(t)$。

白话：一个周期里只有有限个「坏点」，在每个坏点两侧函数都有有限的单侧极限（可以跳跃，但不能振荡，也不能趋于无穷）。分段 $\Cc^1$ 还要求每一段上的导数能连续地延拓到端点。$f$ 在分点处的取值不受任何限制。
:::

::: fr
Soit $f : \R \to \C$ une fonction $2\pi$-périodique.

1. On dit que $f$ est **continue par morceaux** s'il existe une subdivision $-\pi = t_0 < t_1 < \cdots < t_p = \pi$ de $[-\pi, \pi]$ telle que
   $$\forall k \in \{1, \dots, p\},\quad f\big|_{]t_{k-1}, t_k[}\ \text{est continue et}\ \lim_{t \to t_{k-1}^+} f(t),\ \lim_{t \to t_k^-} f(t)\ \text{existent et sont finies}.$$
   De façon équivalente, chaque restriction $f|_{]t_{k-1}, t_k[}$ se prolonge en une fonction continue $\varphi_k$ sur $[t_{k-1}, t_k]$. Une telle subdivision est dite **adaptée** à $f$.

2. On dit que $f$ est **de classe $\Cc^1$ par morceaux** s'il existe une subdivision telle que chaque restriction $f|_{]t_{k-1}, t_k[}$ se prolonge en une fonction $\varphi_k$ de classe $\Cc^1$ sur $[t_{k-1}, t_k]$.

On note $\Cc_{2\pi}$ l'ensemble des fonctions continues $2\pi$-périodiques de $\R$ dans $\C$, et $\mathcal{CM}_{2\pi}$ celui des fonctions $2\pi$-périodiques continues par morceaux. Pour $f \in \mathcal{CM}_{2\pi}$ et $x \in \R$, on note $f(x^+) = \lim_{t \to x^+} f(t)$ et $f(x^-) = \lim_{t \to x^-} f(t)$ les limites à droite et à gauche.

Autrement dit : sur une période il n'y a qu'un nombre fini de « points singuliers », et en chacun d'eux $f$ admet des limites finies à gauche et à droite (elle peut sauter, mais ni osciller ni tendre vers l'infini). Pour le caractère $\Cc^1$ par morceaux, on demande en plus que la dérivée sur chaque morceau se prolonge continûment aux extrémités. Les valeurs de $f$ aux points de la subdivision sont arbitraires.
:::

::: ex id=c5-ex-trois-signaux zh="方波、锯齿波、三角波" lvl=1
以下三个函数都先在 $]-\pi, \pi]$ 上给出，再以 $2\pi$ 为周期延拓到 $\R$。

1. **方波** $f_1$：$f_1(x) = 1$（$0 < x < \pi$），$f_1(x) = -1$（$-\pi < x < 0$），$f_1(0) = f_1(\pi) = 0$。分割 $-\pi < 0 < \pi$ 与它相适应，每段上 $f_1$ 是常数，所以 $f_1$ 分段 $\Cc^1$。它在每个 $k\pi$（$k \in \Z$）处跳跃，不连续。
2. **锯齿波** $f_2$：$f_2(x) = x$（$-\pi < x < \pi$），$f_2(\pi) = 0$。分割 $-\pi < \pi$ 与它相适应，$\varphi_1(t) = t$ 是 $\Cc^1$ 的，所以 $f_2$ 分段 $\Cc^1$。在 $\pi$ 处，$f_2(\pi^-) = \pi$，而由周期性 $f_2(\pi^+) = f_2\big((-\pi)^+\big) = -\pi$，跳跃高度为 $-2\pi$。
3. **三角波** $f_3$：$f_3(x) = \abs{x}$（$-\pi < x \le \pi$）。由于 $\lim_{x \to -\pi^+}\abs{x} = \pi = f_3(\pi)$，周期延拓是连续的。分割 $-\pi < 0 < \pi$ 与它相适应，$\varphi_1(t) = -t$，$\varphi_2(t) = t$，所以 $f_3$ 连续且分段 $\Cc^1$；它在每个 $k\pi$ 处不可导。
:::

::: cex id=c5-cex-non-cpm lvl=1
1. **连续但不是分段 $\Cc^1$。** $g(x) = \sqrt{\abs{x}}$（$-\pi < x \le \pi$，周期延拓）连续。设有分割使每段上的限制都能延拓为 $\Cc^1$ 函数。**情形 1**：$0$ 是某一段 $]t_{k-1}, t_k[$ 的内点。那么 $g$ 在 $0$ 处必须可导，但 $\frac{g(h) - g(0)}{h} = \frac{1}{\sqrt h} \to +\infty$（$h \to 0^+$），矛盾。**情形 2**：$0 = t_k$ 是分点。那么 $\sqrt{t}$ 在 $]0, t_{k+1}[$ 上要能延拓为 $[0, t_{k+1}]$ 上的 $\Cc^1$ 函数，其导数在闭区间上有界；但 $(\sqrt t)' = \frac{1}{2\sqrt t} \to +\infty$（$t \to 0^+$），矛盾。所以 $g$ 不是分段 $\Cc^1$ 的。
2. **不是分段连续。** $h(x) = \sin\frac1x$（$x \in\, ]-\pi, \pi] \setminus \{0\}$），$h(0) = 0$，周期延拓。$h(0^+)$ 不存在：$x_n = \frac{1}{\pi/2 + 2n\pi} \to 0^+$ 时 $h(x_n) = 1$，而 $y_n = \frac{1}{2n\pi} \to 0^+$ 时 $h(y_n) = 0$。无论 $0$ 是不是分点，都需要 $h(0^+)$ 存在（若 $0$ 是某段的内点，$h$ 在 $0$ 处还要连续），所以 $h \notin \mathcal{CM}_{2\pi}$。
:::

::: rem
**分段连续函数有界。** 设 $\varphi_k$ 是第 $k$ 段上的连续延拓。闭区间上的连续函数有界（{@image-compact}），所以对一切 $x \in [-\pi, \pi]$，
$$\abs{f(x)} \le \max\Big(\max_{1 \le k \le p}\ \max_{[t_{k-1}, t_k]}\abs{\varphi_k},\ \max_{0 \le k \le p}\abs{f(t_k)}\Big),$$
再由周期性，这个界对一切 $x \in \R$ 成立。记 $\norm{f}_\infty = \sup_\R \abs f$。

**$\mathcal{CM}_{2\pi}$ 的封闭性。** $\mathcal{CM}_{2\pi}$ 是向量空间，并且对乘积、共轭、平移 $x \mapsto f(x + a)$、反射 $x \mapsto f(-x)$ 封闭。证明的方法都是：把涉及的函数的分点合并（平移或反射后的分点模 $2\pi$ 放回 $[-\pi, \pi]$），在合并后的每一段上所有函数都连续且有有限的单侧极限。
:::

::: lem id=c5-periode zh="积分与周期的选取无关" en="Integral over any period" fr="Intégrale sur une période quelconque" ru="Интеграл по любому периоду" lvl=1
设 $f \in \mathcal{CM}_{2\pi}$。则对一切 $a \in \R$，
$$\int_a^{a + 2\pi} f(t)\,\dd t = \int_{-\pi}^{\pi} f(t)\,\dd t.$$
:::

::: fr
Soit $f \in \mathcal{CM}_{2\pi}$. Pour tout $a \in \R$,
$$\int_a^{a + 2\pi} f(t)\,\dd t = \int_{-\pi}^{\pi} f(t)\,\dd t.$$
:::

::: proof
▷ 思路：用 Chasles 关系在 $\pi$ 处把 $[a, a + 2\pi]$ 切开，再把 $\pi$ 右边的那一段向左平移 $2\pi$。Chasles 关系对有向积分（$\int_u^v = -\int_v^u$）总成立，所以不必区分 $a$ 与 $\pm\pi$ 的大小关系。

**第 1 步（切开）**　由 Chasles 关系，
$$\int_a^{a+2\pi} f = \int_a^{\pi} f + \int_{\pi}^{a + 2\pi} f.$$

**第 2 步（平移）**　在第二个积分中令 $t = u + 2\pi$（$\dd t = \dd u$；$t = \pi \iff u = -\pi$，$t = a + 2\pi \iff u = a$）。由周期性 $f(u + 2\pi) = f(u)$，
$$\int_{\pi}^{a+2\pi} f(t)\,\dd t = \int_{-\pi}^{a} f(u + 2\pi)\,\dd u = \int_{-\pi}^{a} f(u)\,\dd u.$$

**第 3 步（合并）**　再由 Chasles 关系，
$$\int_a^{a+2\pi} f = \int_a^{\pi} f + \int_{-\pi}^{a} f = \int_{-\pi}^{a} f + \int_a^{\pi} f = \int_{-\pi}^{\pi} f.$$

这就证明了积分与 $a$ 无关。
:::

::: fr
▷ Méthode : on coupe $[a, a + 2\pi]$ en $\pi$ par la relation de Chasles, puis on translate de $2\pi$ vers la gauche le morceau situé à droite de $\pi$. La relation de Chasles vaut pour les intégrales orientées ($\int_u^v = -\int_v^u$) ; il est donc inutile de comparer $a$ et $\pm\pi$.

**Étape 1 (découpage)**　D'après la relation de Chasles,
$$\int_a^{a+2\pi} f = \int_a^{\pi} f + \int_{\pi}^{a + 2\pi} f.$$

**Étape 2 (translation)**　Dans la seconde intégrale, posons $t = u + 2\pi$ ($\dd t = \dd u$ ; $t = \pi \iff u = -\pi$, $t = a + 2\pi \iff u = a$). Par périodicité, $f(u + 2\pi) = f(u)$, donc
$$\int_{\pi}^{a+2\pi} f(t)\,\dd t = \int_{-\pi}^{a} f(u + 2\pi)\,\dd u = \int_{-\pi}^{a} f(u)\,\dd u.$$

**Étape 3 (recollement)**　De nouveau par la relation de Chasles,
$$\int_a^{a+2\pi} f = \int_a^{\pi} f + \int_{-\pi}^{a} f = \int_{-\pi}^{a} f + \int_a^{\pi} f = \int_{-\pi}^{\pi} f.$$

Ceci montre que l'intégrale ne dépend pas de $a$.
:::

::: def id=def-coef-fourier zh="Fourier 系数与 Fourier 级数" en="Fourier coefficients, Fourier series" fr="Coefficients de Fourier, série de Fourier" ru="Коэффициенты Фурье, ряд Фурье"
对 $n \in \Z$，记 $e_n(t) = \e^{\ii nt}$。$f \in \mathcal{CM}_{2\pi}$ 的第 $n$ 个（复）**Fourier 系数**是
$$c_n(f) = \frac{1}{2\pi}\int_{-\pi}^{\pi} f(t)\,\e^{-\ii nt}\,\dd t.$$
$N$ 阶 **Fourier 部分和**是 $S_N f = \sum_{\abs{n} \le N} c_n(f)\, e_n$（$N \in \N$）；**Fourier 级数**是函数列 $(S_N f)_{N \in \N}$，记作 $\sum_{n \in \Z} c_n(f)\, e_n$。**实系数**定义为
$$a_n(f) = \frac1\pi\int_{-\pi}^{\pi} f(t)\cos nt\,\dd t\quad (n \ge 0),\qquad b_n(f) = \frac1\pi\int_{-\pi}^{\pi} f(t)\sin nt\,\dd t\quad (n \ge 1).$$
形如 $P = \sum_{\abs{n} \le N} \alpha_n e_n$（$\alpha_n \in \C$）的函数称为（$N$ 次）**三角多项式**，它们构成 $\mathcal{T}_N = \Vect(e_n)_{\abs n \le N}$。按定义，$S_N f \in \mathcal{T}_N$。

白话：$c_n(f)$ 衡量 $f$ 中「频率为 $n$」的分量有多大；$S_N f$ 只保留 $\abs{n} \le N$ 的那些频率。由 {@c5-periode}，积分区间 $[-\pi, \pi]$ 可以换成任何长为 $2\pi$ 的区间，例如 $[0, 2\pi]$。
:::

::: fr
Pour $n \in \Z$, on note $e_n(t) = \e^{\ii nt}$. Le $n$-ième **coefficient de Fourier** (exponentiel) de $f \in \mathcal{CM}_{2\pi}$ est
$$c_n(f) = \frac{1}{2\pi}\int_{-\pi}^{\pi} f(t)\,\e^{-\ii nt}\,\dd t.$$
La **somme partielle de Fourier** d'ordre $N$ est $S_N f = \sum_{\abs{n} \le N} c_n(f)\, e_n$ ($N \in \N$) ; la **série de Fourier** de $f$ est la suite de fonctions $(S_N f)_{N \in \N}$, notée $\sum_{n \in \Z} c_n(f)\, e_n$. Les **coefficients trigonométriques** sont définis par
$$a_n(f) = \frac1\pi\int_{-\pi}^{\pi} f(t)\cos nt\,\dd t\quad (n \ge 0),\qquad b_n(f) = \frac1\pi\int_{-\pi}^{\pi} f(t)\sin nt\,\dd t\quad (n \ge 1).$$
Une fonction de la forme $P = \sum_{\abs{n} \le N} \alpha_n e_n$ ($\alpha_n \in \C$) est un **polynôme trigonométrique** (de degré au plus $N$) ; ces fonctions forment $\mathcal{T}_N = \Vect(e_n)_{\abs n \le N}$. On a $S_N f \in \mathcal{T}_N$.

Autrement dit, $c_n(f)$ mesure la composante de « fréquence $n$ » de $f$, et $S_N f$ ne garde que les fréquences $\abs{n} \le N$. D'après {@fr:c5-periode}, on peut remplacer $[-\pi, \pi]$ par n'importe quel intervalle de longueur $2\pi$, par exemple $[0, 2\pi]$.
:::

::: rem
1. **收敛的含义。** 「Fourier 级数在 $x$ 处收敛」指**对称部分和** $S_N f(x) = \sum_{\abs n \le N} c_n(f)\e^{\ii nx}$ 在 $N \to \infty$ 时收敛，并不要求 $\sum_{n \ge 0}$ 与 $\sum_{n < 0}$ 分别收敛。例：锯齿波（{@c5-ex-scie}，$c_n = \frac{\ii(-1)^n}{n}$）在 $x = \pi$ 处 $c_n\e^{\ii n\pi} = \frac{\ii}{n}$，所以 $\sum_{n \ge 1}$ 与 $\sum_{n \le -1}$ 都发散（调和级数）；但 $c_n\e^{\ii n\pi} + c_{-n}\e^{-\ii n\pi} = \frac{\ii}{n} - \frac{\ii}{n} = 0$，对称部分和 $S_N f_2(\pi)$ 恒等于 $0$。
2. **非例子。** $x \mapsto \frac1x$（在 $]-\pi, \pi] \setminus\{0\}$ 上）周期延拓后在 $0$ 附近无界，不属于 $\mathcal{CM}_{2\pi}$，本章不为它定义 Fourier 系数；第 6 章的广义积分也无济于事，因为 $\int_0^\pi \frac{\dd t}{t}$ 发散（{@riemann-integrales}）。
:::

::: prop id=c5-forme-reelle zh="复系数与实系数的换算" en="Exponential and trigonometric coefficients" fr="Coefficients exponentiels et trigonométriques" ru="Комплексная и вещественная формы ряда Фурье" lvl=1
设 $f \in \mathcal{CM}_{2\pi}$，简记 $c_n = c_n(f)$，$a_n = a_n(f)$，$b_n = b_n(f)$。则 $c_0 = \frac{a_0}{2}$，且对 $n \ge 1$，
$$c_n = \frac{a_n - \ii b_n}{2},\quad c_{-n} = \frac{a_n + \ii b_n}{2},\qquad a_n = c_n + c_{-n},\quad b_n = \ii\,(c_n - c_{-n}).$$
因此对一切 $x \in \R$，
$$S_N f(x) = \frac{a_0}{2} + \sum_{n=1}^N \big(a_n\cos nx + b_n\sin nx\big).$$
若 $f$ 取实值，则 $a_n, b_n \in \R$，且 $c_{-n} = \overline{c_n}$。
:::

::: fr
Soit $f \in \mathcal{CM}_{2\pi}$ ; notons $c_n = c_n(f)$, $a_n = a_n(f)$, $b_n = b_n(f)$. Alors $c_0 = \frac{a_0}{2}$ et, pour $n \ge 1$,
$$c_n = \frac{a_n - \ii b_n}{2},\quad c_{-n} = \frac{a_n + \ii b_n}{2},\qquad a_n = c_n + c_{-n},\quad b_n = \ii\,(c_n - c_{-n}).$$
Par conséquent, pour tout $x \in \R$,
$$S_N f(x) = \frac{a_0}{2} + \sum_{n=1}^N \big(a_n\cos nx + b_n\sin nx\big).$$
Si $f$ est à valeurs réelles, alors $a_n, b_n \in \R$ et $c_{-n} = \overline{c_n}$.
:::

::: proof
▷ 思路：全部来自 Euler 公式 $\e^{\pm\ii nt} = \cos nt \pm \ii\sin nt$ 与积分的线性。

**第 1 步（用 $a_n, b_n$ 表示 $c_{\pm n}$）**　由 Euler 公式与积分的线性，
$$c_n = \frac{1}{2\pi}\int_{-\pi}^{\pi} f(t)\big(\cos nt - \ii\sin nt\big)\dd t = \frac12\big(a_n - \ii b_n\big),$$
把 $n$ 换成 $-n$（$\cos(-nt) = \cos nt$，$\sin(-nt) = -\sin nt$）得 $c_{-n} = \frac12(a_n + \ii b_n)$。$n = 0$ 时 $c_0 = \frac{1}{2\pi}\int_{-\pi}^{\pi} f = \frac{a_0}{2}$。

**第 2 步（反解）**　两式相加得 $c_n + c_{-n} = a_n$；相减得 $c_n - c_{-n} = -\ii b_n$，两边乘以 $\ii$ 得 $b_n = \ii(c_n - c_{-n})$。

**第 3 步（部分和）**　对 $n \ge 1$，
$$c_n\e^{\ii nx} + c_{-n}\e^{-\ii nx} = (c_n + c_{-n})\cos nx + \ii(c_n - c_{-n})\sin nx = a_n\cos nx + b_n\sin nx.$$
对 $1 \le n \le N$ 求和，再加上 $c_0 = \frac{a_0}{2}$，即得 $S_N f$ 的实形式。

**第 4 步（实值情形）**　若 $f$ 取实值，$a_n$、$b_n$ 是实函数的积分，为实数；于是 $c_{-n} = \frac12(a_n + \ii b_n) = \overline{\tfrac12(a_n - \ii b_n)} = \overline{c_n}$。
:::

::: fr
▷ Méthode : tout découle des formules d'Euler $\e^{\pm\ii nt} = \cos nt \pm \ii\sin nt$ et de la linéarité de l'intégrale.

**Étape 1 ($c_{\pm n}$ en fonction de $a_n, b_n$)**　Par les formules d'Euler et linéarité,
$$c_n = \frac{1}{2\pi}\int_{-\pi}^{\pi} f(t)\big(\cos nt - \ii\sin nt\big)\dd t = \frac12\big(a_n - \ii b_n\big),$$
et en remplaçant $n$ par $-n$ ($\cos(-nt) = \cos nt$, $\sin(-nt) = -\sin nt$), on obtient $c_{-n} = \frac12(a_n + \ii b_n)$. Pour $n = 0$, $c_0 = \frac{1}{2\pi}\int_{-\pi}^{\pi} f = \frac{a_0}{2}$.

**Étape 2 (inversion)**　En additionnant, $c_n + c_{-n} = a_n$ ; en soustrayant, $c_n - c_{-n} = -\ii b_n$, d'où $b_n = \ii(c_n - c_{-n})$ en multipliant par $\ii$.

**Étape 3 (sommes partielles)**　Pour $n \ge 1$,
$$c_n\e^{\ii nx} + c_{-n}\e^{-\ii nx} = (c_n + c_{-n})\cos nx + \ii(c_n - c_{-n})\sin nx = a_n\cos nx + b_n\sin nx.$$
On somme pour $1 \le n \le N$ et on ajoute $c_0 = \frac{a_0}{2}$.

**Étape 4 (cas réel)**　Si $f$ est réelle, $a_n$ et $b_n$ sont des intégrales de fonctions réelles, donc réels ; ainsi $c_{-n} = \frac12(a_n + \ii b_n) = \overline{\tfrac12(a_n - \ii b_n)} = \overline{c_n}$.
:::

::: ex id=c5-ex-creneau zh="方波的 Fourier 系数" lvl=1
对方波 $f_1$（{@c5-ex-trois-signaux}），$c_0(f_1) = \frac{1}{2\pi}\big(\pi - \pi\big) = 0$。对 $n \ne 0$，
$$\int_0^\pi \e^{-\ii nt}\,\dd t = \Big[\frac{\e^{-\ii nt}}{-\ii n}\Big]_0^\pi = \frac{1 - (-1)^n}{\ii n},\qquad \int_{-\pi}^0 \e^{-\ii nt}\,\dd t = \Big[\frac{\e^{-\ii nt}}{-\ii n}\Big]_{-\pi}^0 = \frac{(-1)^n - 1}{\ii n}$$
（用了 $\e^{\pm\ii n\pi} = (-1)^n$）。所以
$$c_n(f_1) = \frac{1}{2\pi}\Big(\int_0^\pi \e^{-\ii nt}\,\dd t - \int_{-\pi}^0 \e^{-\ii nt}\,\dd t\Big) = \frac{1 - (-1)^n}{\ii\pi n} = \begin{cases} -\dfrac{2\ii}{\pi n}, & n \text{ 奇},\\[2mm] 0, & n \text{ 偶}.\end{cases}$$
由 {@c5-forme-reelle}：$a_n(f_1) = c_n + c_{-n} = 0$，$b_n(f_1) = \ii(c_n - c_{-n}) = \frac{4}{\pi n}$（$n$ 奇），$0$（$n$ 偶）。于是
$$S_{2m-1} f_1(x) = S_{2m} f_1(x) = \frac4\pi\sum_{k=1}^{m}\frac{\sin\big((2k-1)x\big)}{2k-1}.$$
:::

::: ex id=c5-ex-scie zh="锯齿波的 Fourier 系数" lvl=1
对锯齿波 $f_2$，$c_0(f_2) = \frac{1}{2\pi}\int_{-\pi}^{\pi} t\,\dd t = 0$。对 $n \ne 0$ 分部积分（$u = t$，$v' = \e^{-\ii nt}$，$v = \frac{\e^{-\ii nt}}{-\ii n} = \frac{\ii\,\e^{-\ii nt}}{n}$）：
$$\int_{-\pi}^{\pi} t\,\e^{-\ii nt}\,\dd t = \Big[\frac{\ii\, t\,\e^{-\ii nt}}{n}\Big]_{-\pi}^{\pi} - \frac{\ii}{n}\int_{-\pi}^{\pi}\e^{-\ii nt}\,\dd t = \frac{\ii}{n}\big(\pi(-1)^n + \pi(-1)^n\big) - 0 = \frac{2\pi\ii(-1)^n}{n}.$$
所以 $c_n(f_2) = \dfrac{\ii(-1)^n}{n}$。由 {@c5-forme-reelle}：$a_n(f_2) = \frac{\ii(-1)^n}{n} + \frac{\ii(-1)^n}{-n} = 0$，
$$b_n(f_2) = \ii\Big(\frac{\ii(-1)^n}{n} - \frac{\ii(-1)^n}{-n}\Big) = -\frac{2(-1)^n}{n} = \frac{2(-1)^{n+1}}{n}.$$
于是
$$S_N f_2(x) = 2\sum_{n=1}^N \frac{(-1)^{n+1}\sin nx}{n}.$$
:::

::: prop id=orthonormal zh="三角系的正交性" en="Orthonormality of the trigonometric system" fr="Orthonormalité du système trigonométrique" ru="Ортонормированность тригонометрической системы" lvl=1
对 $f, g \in \mathcal{CM}_{2\pi}$，令
$$\ps{f, g} = \frac{1}{2\pi}\int_{-\pi}^{\pi} f(t)\,\overline{g(t)}\,\dd t,\qquad \norm{f}_2 = \sqrt{\ps{f, f}}.$$
1. $\ps{\cdot, \cdot}$ 是 $\mathcal{CM}_{2\pi}$ 上的半正定 Hermite 形式（对第一个变量线性，$\ps{g, f} = \overline{\ps{f, g}}$，$\ps{f, f} \ge 0$），在 $\Cc_{2\pi}$ 上是内积。
2. $(e_n)_{n \in \Z}$ 是正交规范族：$\ps{e_n, e_m} = 1$（$n = m$），$\ps{e_n, e_m} = 0$（$n \ne m$）。
3. $c_n(f) = \ps{f, e_n}$。若 $P = \sum_{\abs{n} \le N}\alpha_n e_n \in \mathcal{T}_N$，则 $c_n(P) = \alpha_n$（$\abs n \le N$），$c_n(P) = 0$（$\abs n > N$）。
:::

::: fr
Pour $f, g \in \mathcal{CM}_{2\pi}$, posons
$$\ps{f, g} = \frac{1}{2\pi}\int_{-\pi}^{\pi} f(t)\,\overline{g(t)}\,\dd t,\qquad \norm{f}_2 = \sqrt{\ps{f, f}}.$$
1. $\ps{\cdot, \cdot}$ est une forme hermitienne positive sur $\mathcal{CM}_{2\pi}$ (linéaire par rapport à la première variable, $\ps{g, f} = \overline{\ps{f, g}}$, $\ps{f, f} \ge 0$) ; c'est un produit scalaire sur $\Cc_{2\pi}$.
2. La famille $(e_n)_{n \in \Z}$ est orthonormale : $\ps{e_n, e_m} = 1$ si $n = m$ et $\ps{e_n, e_m} = 0$ si $n \ne m$.
3. $c_n(f) = \ps{f, e_n}$. Si $P = \sum_{\abs{n} \le N}\alpha_n e_n \in \mathcal{T}_N$, alors $c_n(P) = \alpha_n$ pour $\abs n \le N$ et $c_n(P) = 0$ pour $\abs n > N$.
:::

::: proof
▷ 思路：2 是一个直接的积分计算；3 由 2 和线性得到。1 中唯一需要论证的是连续函数时的「定」。

**第 1 步（Hermite 形式）**　对第一个变量的线性来自积分的线性；$\overline{\ps{f, g}} = \frac{1}{2\pi}\int \overline{f}\,g = \ps{g, f}$；$\ps{f, f} = \frac{1}{2\pi}\int_{-\pi}^{\pi}\abs{f}^2 \ge 0$。若 $f \in \Cc_{2\pi}$ 且 $\ps{f, f} = 0$，反设某个 $x_0 \in [-\pi, \pi]$ 使 $\abs{f(x_0)}^2 = m > 0$。由连续性，存在 $[-\pi, \pi]$ 中长度 $\eta > 0$ 的区间 $J \ni x_0$，在 $J$ 上 $\abs{f}^2 \ge \frac m2$，于是 $\int_{-\pi}^{\pi}\abs f^2 \ge \frac{m\eta}{2} > 0$，矛盾。所以 $f = 0$ 在 $[-\pi, \pi]$ 上，由周期性 $f = 0$。

**第 2 步（正交规范）**　$\ps{e_n, e_m} = \frac{1}{2\pi}\int_{-\pi}^{\pi}\e^{\ii(n - m)t}\,\dd t$。若 $n = m$，被积函数为 $1$，积分为 $1$。若 $n \ne m$，$\frac{\e^{\ii(n-m)t}}{\ii(n-m)}$ 是被积函数的原函数，且是 $2\pi$ 周期的，所以它在 $\pi$ 与 $-\pi$ 处的值相等，积分为 $0$。

**第 3 步（系数）**　$\overline{e_n(t)} = \e^{-\ii nt}$，所以 $c_n(f) = \ps{f, e_n}$。对 $P = \sum_{\abs n \le N}\alpha_n e_n$，由第一个变量的线性和第 2 步，
$$c_m(P) = \ps{P, e_m} = \sum_{\abs n \le N}\alpha_n\ps{e_n, e_m} = \begin{cases}\alpha_m, & \abs m \le N,\\ 0, & \abs m > N\ (\text{没有一个 } n \text{ 等于 } m).\end{cases}$$
:::

::: fr
▷ Méthode : le point 2 est un calcul direct d'intégrale, le point 3 s'en déduit par linéarité. Dans le point 1, seul le caractère défini sur $\Cc_{2\pi}$ demande un argument.

**Étape 1 (forme hermitienne)**　La linéarité en la première variable vient de la linéarité de l'intégrale ; $\overline{\ps{f, g}} = \frac{1}{2\pi}\int \overline{f}\,g = \ps{g, f}$ ; $\ps{f, f} = \frac{1}{2\pi}\int_{-\pi}^{\pi}\abs{f}^2 \ge 0$. Soit $f \in \Cc_{2\pi}$ telle que $\ps{f, f} = 0$. Par l'absurde, supposons qu'il existe $x_0 \in [-\pi, \pi]$ tel que $\abs{f(x_0)}^2 = m > 0$. Par continuité, il existe un intervalle $J \ni x_0$ de $[-\pi, \pi]$, de longueur $\eta > 0$, sur lequel $\abs{f}^2 \ge \frac m2$ ; alors $\int_{-\pi}^{\pi}\abs f^2 \ge \frac{m\eta}{2} > 0$, contradiction. Donc $f = 0$ sur $[-\pi, \pi]$, puis sur $\R$ par périodicité.

**Étape 2 (orthonormalité)**　$\ps{e_n, e_m} = \frac{1}{2\pi}\int_{-\pi}^{\pi}\e^{\ii(n - m)t}\,\dd t$. Si $n = m$, l'intégrande vaut $1$ et l'intégrale vaut $1$. Si $n \ne m$, $\frac{\e^{\ii(n-m)t}}{\ii(n-m)}$ est une primitive $2\pi$-périodique de l'intégrande ; elle prend la même valeur en $\pi$ et en $-\pi$, donc l'intégrale est nulle.

**Étape 3 (coefficients)**　Comme $\overline{e_n(t)} = \e^{-\ii nt}$, on a $c_n(f) = \ps{f, e_n}$. Pour $P = \sum_{\abs n \le N}\alpha_n e_n$, par linéarité en la première variable et d'après l'étape 2,
$$c_m(P) = \ps{P, e_m} = \sum_{\abs n \le N}\alpha_n\ps{e_n, e_m} = \begin{cases}\alpha_m, & \abs m \le N,\\ 0, & \abs m > N\ (\text{aucun } n \text{ n'est égal à } m).\end{cases}$$
:::

::: rem
分段连续函数的 $\norm{\cdot}_2$ 只是**半范数**：改变有限个点的值不改变积分。例如把方波 $f_1$ 在 $0$ 处的值改成 $5$，得到 $\tilde f_1$，则 $\norm{f_1 - \tilde f_1}_2 = 0$ 但 $f_1 \ne \tilde f_1$。这不影响下面的论证，因为本章用到的三个工具都只依赖线性、Hermite 对称性和 $\ps{f, f} \ge 0$，与「定」无关：

- **Pythagoras 定理**：$\norm{f + g}_2^2 = \norm f_2^2 + 2\operatorname{Re}\ps{f, g} + \norm g_2^2$，所以 $\ps{f, g} = 0 \Rightarrow \norm{f + g}_2^2 = \norm f_2^2 + \norm g_2^2$；
- **Cauchy–Schwarz 不等式** $\abs{\ps{f, g}} \le \norm f_2\norm g_2$（证明同 {@holder} 中 $p = 2$ 的情形；若 $\norm g_2 = 0$，由 $0 \le \norm{f - \lambda g}_2^2 = \norm f_2^2 - 2\operatorname{Re}\big(\bar\lambda\ps{f, g}\big)$ 对一切 $\lambda = s\ps{f, g}$（$s > 0$）成立，令 $s \to +\infty$ 得 $\ps{f, g} = 0$）；
- **三角不等式** $\norm{f + g}_2 \le \norm f_2 + \norm g_2$（由 Cauchy–Schwarz 得到）。

另外，被积函数 $\abs{f}^2 \le \norm{f}_\infty^2$，所以 $\norm{f}_2 \le \norm{f}_\infty$。
:::

::: prop id=coef-proprietes zh="Fourier 系数的基本性质" en="Basic properties of Fourier coefficients" fr="Propriétés élémentaires des coefficients de Fourier" ru="Простейшие свойства коэффициентов Фурье" lvl=1
设 $f \in \mathcal{CM}_{2\pi}$。

1. 若 $f$ 是偶函数，则 $b_n(f) = 0$，且 $a_n(f) = \frac2\pi\int_0^\pi f(t)\cos nt\,\dd t$；若 $f$ 是奇函数，则 $a_n(f) = 0$，且 $b_n(f) = \frac2\pi\int_0^\pi f(t)\sin nt\,\dd t$。
2. 若 $f$ 连续且分段 $\Cc^1$，则 $f'$（在每个周期中有限个点处任意取值）属于 $\mathcal{CM}_{2\pi}$，且对一切 $n \in \Z$，
$$c_n(f') = \ii n\, c_n(f).$$
3. 对一切 $n \in \Z$，$\abs{c_n(f)} \le \frac{1}{2\pi}\int_{-\pi}^{\pi}\abs{f} \le \norm{f}_\infty$。
:::

::: fr
Soit $f \in \mathcal{CM}_{2\pi}$.

1. Si $f$ est paire, alors $b_n(f) = 0$ et $a_n(f) = \frac2\pi\int_0^\pi f(t)\cos nt\,\dd t$ ; si $f$ est impaire, alors $a_n(f) = 0$ et $b_n(f) = \frac2\pi\int_0^\pi f(t)\sin nt\,\dd t$.
2. Si $f$ est continue et de classe $\Cc^1$ par morceaux, alors $f'$ (définie de façon arbitraire en un nombre fini de points par période) appartient à $\mathcal{CM}_{2\pi}$ et, pour tout $n \in \Z$,
$$c_n(f') = \ii n\, c_n(f).$$
3. Pour tout $n \in \Z$, $\abs{c_n(f)} \le \frac{1}{2\pi}\int_{-\pi}^{\pi}\abs{f} \le \norm{f}_\infty$.
:::

::: proof
▷ 思路：1 用换元 $t \mapsto -t$；2 在每一段上分部积分，因为 $f$ 连续，相邻两段的边界项相互抵消（望远镜求和），最后剩下的两项因周期性抵消；3 是积分的三角不等式。

**1.**　**第 1 步（对称区间上的积分）**　设 $h$ 在 $[-\pi, \pi]$ 上分段连续。在 $\int_{-\pi}^0 h$ 中令 $t = -u$：$\int_{-\pi}^0 h(t)\,\dd t = \int_0^\pi h(-u)\,\dd u$。所以若 $h$ 是奇函数，$\int_{-\pi}^0 h = -\int_0^\pi h$，$\int_{-\pi}^{\pi} h = 0$；若 $h$ 是偶函数，$\int_{-\pi}^{\pi} h = 2\int_0^\pi h$。

**第 2 步（应用）**　若 $f$ 是偶函数，$t \mapsto f(t)\sin nt$ 是奇函数（偶 × 奇），所以 $b_n(f) = 0$；$t \mapsto f(t)\cos nt$ 是偶函数，所以 $a_n(f) = \frac{2}{\pi}\int_0^\pi f(t)\cos nt\,\dd t$。$f$ 是奇函数时，把 $\cos$ 与 $\sin$ 的角色互换。

**2.**　**第 1 步（翻译假设）**　取相适应的分割 $-\pi = t_0 < \cdots < t_p = \pi$ 和 $[t_{k-1}, t_k]$ 上的 $\Cc^1$ 函数 $\varphi_k$，使 $\varphi_k = f$ 在 $]t_{k-1}, t_k[$ 上。因为 $f$ 连续，$\varphi_k(t_{k-1}) = \lim_{t \to t_{k-1}^+} f(t) = f(t_{k-1})$；把右极限换成 $t_k$ 处的左极限，得 $\varphi_k(t_k) = \lim_{t \to t_k^-} f(t) = f(t_k)$。

**第 2 步（$f' \in \mathcal{CM}_{2\pi}$）**　在 $]t_{k-1}, t_k[$ 上 $f' = \varphi_k'$，它能连续延拓到 $[t_{k-1}, t_k]$；在分点处 $f'$ 的值按周期性任意指定。所以 $f'$ 是 $2\pi$ 周期的分段连续函数。

**第 3 步（每一段上分部积分）**　$f'$ 与 $\varphi_k'$ 在 $[t_{k-1}, t_k]$ 上至多在两个端点处不同，积分相等。由分部积分（$(\e^{-\ii nt})' = -\ii n\,\e^{-\ii nt}$），
$$\begin{aligned}\int_{t_{k-1}}^{t_k} f'(t)\,\e^{-\ii nt}\,\dd t &= \Big[\varphi_k(t)\,\e^{-\ii nt}\Big]_{t_{k-1}}^{t_k} + \ii n\int_{t_{k-1}}^{t_k}\varphi_k(t)\,\e^{-\ii nt}\,\dd t\\
&= \Big[f(t)\,\e^{-\ii nt}\Big]_{t_{k-1}}^{t_k} + \ii n\int_{t_{k-1}}^{t_k} f(t)\,\e^{-\ii nt}\,\dd t,\end{aligned}$$
最后一步用了第 1 步 $\varphi_k = f$ 在 $[t_{k-1}, t_k]$ 两端成立。

**第 4 步（求和）**　对 $k = 1, \dots, p$ 求和。边界项是望远镜和：
$$\sum_{k=1}^p\Big[f(t)\,\e^{-\ii nt}\Big]_{t_{k-1}}^{t_k} = f(\pi)\e^{-\ii n\pi} - f(-\pi)\e^{\ii n\pi} = (-1)^n\big(f(\pi) - f(-\pi)\big) = 0 \qquad \text{（周期性）}.$$
于是 $\int_{-\pi}^{\pi} f'\,\e^{-\ii nt}\,\dd t = \ii n\int_{-\pi}^{\pi} f\,\e^{-\ii nt}\,\dd t$，两边除以 $2\pi$ 即得 $c_n(f') = \ii n\,c_n(f)$。

**3.**　由积分的三角不等式和 $\abs{\e^{-\ii nt}} = 1$：$\abs{c_n(f)} \le \frac{1}{2\pi}\int_{-\pi}^{\pi}\abs{f(t)}\,\dd t \le \frac{1}{2\pi}\cdot 2\pi\norm{f}_\infty$。
:::

::: fr
▷ Méthode : pour 1, changement de variable $t \mapsto -t$ ; pour 2, intégration par parties sur chaque morceau : comme $f$ est continue, les termes de bord de deux morceaux voisins se compensent (somme télescopique) et les deux termes restants se compensent par périodicité ; 3 est l'inégalité triangulaire pour les intégrales.

**1.**　**Étape 1 (intégrale sur un intervalle symétrique)**　Soit $h$ continue par morceaux sur $[-\pi, \pi]$. Le changement de variable $t = -u$ donne $\int_{-\pi}^0 h(t)\,\dd t = \int_0^\pi h(-u)\,\dd u$. Ainsi, si $h$ est impaire, $\int_{-\pi}^{\pi} h = 0$ ; si $h$ est paire, $\int_{-\pi}^{\pi} h = 2\int_0^\pi h$.

**Étape 2 (application)**　Si $f$ est paire, $t \mapsto f(t)\sin nt$ est impaire (paire × impaire), donc $b_n(f) = 0$ ; $t \mapsto f(t)\cos nt$ est paire, donc $a_n(f) = \frac{2}{\pi}\int_0^\pi f(t)\cos nt\,\dd t$. Si $f$ est impaire, on échange les rôles de $\cos$ et $\sin$.

**2.**　**Étape 1 (on traduit l'hypothèse)**　Soit $-\pi = t_0 < \cdots < t_p = \pi$ une subdivision adaptée et $\varphi_k$ de classe $\Cc^1$ sur $[t_{k-1}, t_k]$ avec $\varphi_k = f$ sur $]t_{k-1}, t_k[$. Comme $f$ est continue, $\varphi_k(t_{k-1}) = \lim_{t \to t_{k-1}^+} f(t) = f(t_{k-1})$ ; en remplaçant la limite à droite par la limite à gauche en $t_k$, on obtient $\varphi_k(t_k) = \lim_{t \to t_k^-} f(t) = f(t_k)$.

**Étape 2 ($f' \in \mathcal{CM}_{2\pi}$)**　Sur $]t_{k-1}, t_k[$, $f' = \varphi_k'$, qui se prolonge continûment à $[t_{k-1}, t_k]$ ; aux points de subdivision, on donne à $f'$ des valeurs arbitraires, de façon $2\pi$-périodique. Ainsi $f'$ est $2\pi$-périodique et continue par morceaux.

**Étape 3 (intégration par parties sur chaque morceau)**　$f'$ et $\varphi_k'$ diffèrent au plus aux extrémités de $[t_{k-1}, t_k]$, donc ont la même intégrale. Par intégration par parties ($(\e^{-\ii nt})' = -\ii n\,\e^{-\ii nt}$),
$$\begin{aligned}\int_{t_{k-1}}^{t_k} f'(t)\,\e^{-\ii nt}\,\dd t &= \Big[\varphi_k(t)\,\e^{-\ii nt}\Big]_{t_{k-1}}^{t_k} + \ii n\int_{t_{k-1}}^{t_k}\varphi_k(t)\,\e^{-\ii nt}\,\dd t\\
&= \Big[f(t)\,\e^{-\ii nt}\Big]_{t_{k-1}}^{t_k} + \ii n\int_{t_{k-1}}^{t_k} f(t)\,\e^{-\ii nt}\,\dd t,\end{aligned}$$
la dernière égalité utilisant $\varphi_k = f$ aux deux extrémités (étape 1).

**Étape 4 (sommation)**　On somme sur $k = 1, \dots, p$. Les termes de bord forment une somme télescopique :
$$\sum_{k=1}^p\Big[f(t)\,\e^{-\ii nt}\Big]_{t_{k-1}}^{t_k} = f(\pi)\e^{-\ii n\pi} - f(-\pi)\e^{\ii n\pi} = (-1)^n\big(f(\pi) - f(-\pi)\big) = 0 \qquad \text{(périodicité)}.$$
Il vient $\int_{-\pi}^{\pi} f'\,\e^{-\ii nt}\,\dd t = \ii n\int_{-\pi}^{\pi} f\,\e^{-\ii nt}\,\dd t$ ; en divisant par $2\pi$, $c_n(f') = \ii n\,c_n(f)$.

**3.**　Par l'inégalité triangulaire et $\abs{\e^{-\ii nt}} = 1$ : $\abs{c_n(f)} \le \frac{1}{2\pi}\int_{-\pi}^{\pi}\abs{f(t)}\,\dd t \le \frac{1}{2\pi}\cdot 2\pi\norm{f}_\infty$.
:::

::: rem
**第 2 条中「$f$ 连续」不能去掉。** 方波 $f_1$ 分段 $\Cc^1$ 但不连续，$f_1' = 0$（除 $k\pi$ 外），所以 $c_n(f_1') = 0$；而由 {@c5-ex-creneau}，$n$ 为奇数时 $\ii n\,c_n(f_1) = \ii n \cdot \frac{-2\ii}{\pi n} = \frac2\pi \ne 0$。证明失效在第 4 步：在跳跃点 $t_k$ 处 $\varphi_k(t_k) \ne \varphi_{k+1}(t_k)$，边界项不再相消。精确的公式见下面的「想一想」。
:::

::: ex id=c5-ex-triangle zh="三角波的 Fourier 系数" lvl=1
三角波 $f_3 = \abs{x}$ 连续且分段 $\Cc^1$，除 $k\pi$ 外 $f_3' = f_1$（方波）。由 {@coef-proprietes} 第 2 条和 {@c5-ex-creneau}，对 $n \ne 0$，
$$c_n(f_3) = \frac{c_n(f_1)}{\ii n} = \begin{cases}\dfrac{-2\ii}{\pi n}\cdot\dfrac{1}{\ii n} = -\dfrac{2}{\pi n^2}, & n \text{ 奇},\\[2mm] 0, & n \text{ 偶},\end{cases}\qquad c_0(f_3) = \frac{1}{2\pi}\int_{-\pi}^{\pi}\abs t\,\dd t = \frac{\pi}{2}.$$
于是 $a_0(f_3) = \pi$，$a_n(f_3) = c_n + c_{-n} = -\frac{4}{\pi n^2}$（$n$ 奇），$0$（$n \ge 2$ 偶），$b_n(f_3) = 0$。直接验算（{@coef-proprietes} 第 1 条，$f_3$ 是偶函数）：
$$a_n(f_3) = \frac2\pi\int_0^\pi t\cos nt\,\dd t = \frac2\pi\Big(\Big[\frac{t\sin nt}{n}\Big]_0^\pi + \Big[\frac{\cos nt}{n^2}\Big]_0^\pi\Big) = \frac{2}{\pi}\cdot\frac{(-1)^n - 1}{n^2},$$
结果一致。所以 $S_{2m-1}f_3(x) = \dfrac\pi2 - \dfrac4\pi\displaystyle\sum_{k=1}^m\frac{\cos\big((2k-1)x\big)}{(2k-1)^2}$。
:::

::: q
不用积分，求 $f(x) = \cos^3 x$ 的全部 Fourier 系数。
:::

::: ans
$\cos^3 x = \Big(\dfrac{\e^{\ii x} + \e^{-\ii x}}{2}\Big)^3 = \dfrac{\e^{3\ii x} + 3\e^{\ii x} + 3\e^{-\ii x} + \e^{-3\ii x}}{8}$ 是三角多项式。由 {@orthonormal} 第 3 条直接读出：$c_{\pm 3} = \frac18$，$c_{\pm 1} = \frac38$，其余 $c_n = 0$。实形式：$\cos^3 x = \frac34\cos x + \frac14\cos 3x$。
:::

::: q
设 $f \in \mathcal{CM}_{2\pi}$ 分段 $\Cc^1$（不一定连续），在一个周期内的跳跃点为 $t_1 < \cdots < t_p = \pi$，跳跃高度 $s_k = f(t_k^+) - f(t_k^-)$。$\ii n\, c_n(f)$ 与 $c_n(f')$ 相差多少？用方波检验。
:::

::: ans
重复 {@coef-proprietes} 第 2 条的证明，只是第 4 步边界项不再相消：$\sum_{k=1}^p\big[\varphi_k\e^{-\ii nt}\big]_{t_{k-1}}^{t_k} = \sum_{k=1}^p f(t_k^-)\e^{-\ii nt_k} - \sum_{k=0}^{p-1} f(t_k^+)\e^{-\ii nt_k}$。由周期性 $f(t_0^+)\e^{-\ii n t_0} = f(\pi^+)\e^{-\ii n\pi}$，所以这个和等于 $-\sum_{k=1}^p s_k\e^{-\ii nt_k}$。于是
$$\ii n\,c_n(f) = c_n(f') + \frac{1}{2\pi}\sum_{k=1}^p s_k\,\e^{-\ii nt_k}.$$
方波：跳跃点 $0$（$s = 2$）与 $\pi$（$s = -2$），$c_n(f_1') = 0$，右边 $= \frac{1}{2\pi}\big(2 - 2(-1)^n\big)$，$n$ 奇时为 $\frac2\pi$，与 $\ii n\,c_n(f_1) = \frac2\pi$ 一致。这说明：**系数按 $\frac1n$ 衰减通常意味着函数有跳跃**。
:::

## Bessel 不等式与 Riemann–Lebesgue 引理

两个问题：$S_N f$ 在什么意义下是 $f$ 的「最好」近似？系数 $c_n(f)$ 有多大？第一个问题的答案是正交投影，它只用到 Pythagoras 定理；第二个问题的答案是 $c_n(f) \to 0$，它有一个不依赖周期性的连续参数版本。

::: thm id=bessel zh="Bessel 不等式" en="Bessel's inequality" fr="Inégalité de Bessel" ru="Неравенство Бесселя" lvl=1
设 $f \in \mathcal{CM}_{2\pi}$，$N \in \N$。

1. $S_N f$ 是 $f$ 在 $\mathcal{T}_N$ 上的正交投影：对一切 $P \in \mathcal{T}_N$，$\ps{f - S_N f, P} = 0$，并且
$$\norm{f - P}_2^2 = \norm{f - S_N f}_2^2 + \norm{S_N f - P}_2^2 \ge \norm{f - S_N f}_2^2.$$
2. $\norm{f - S_N f}_2^2 = \norm{f}_2^2 - \sum_{\abs n \le N}\abs{c_n(f)}^2$。
3. （**Bessel 不等式**）级数 $\sum_{n \in \Z}\abs{c_n(f)}^2$ 收敛，且
$$\sum_{n \in \Z} \abs{c_n(f)}^2 \le \norm{f}_2^2 = \frac{1}{2\pi}\int_{-\pi}^{\pi} \abs{f}^2.$$
:::

::: fr
Soit $f \in \mathcal{CM}_{2\pi}$ et $N \in \N$.

1. $S_N f$ est la projection orthogonale de $f$ sur $\mathcal{T}_N$ : pour tout $P \in \mathcal{T}_N$, $\ps{f - S_N f, P} = 0$, et
$$\norm{f - P}_2^2 = \norm{f - S_N f}_2^2 + \norm{S_N f - P}_2^2 \ge \norm{f - S_N f}_2^2.$$
2. $\norm{f - S_N f}_2^2 = \norm{f}_2^2 - \sum_{\abs n \le N}\abs{c_n(f)}^2$.
3. (**Inégalité de Bessel**) La série $\sum_{n \in \Z}\abs{c_n(f)}^2$ converge et
$$\sum_{n \in \Z} \abs{c_n(f)}^2 \le \norm{f}_2^2 = \frac{1}{2\pi}\int_{-\pi}^{\pi} \abs{f}^2.$$
:::

::: proof
▷ 思路：这是有限维子空间 $\mathcal{T}_N$ 上的正交投影，只用到 $\ps{\cdot, \cdot}$ 的代数性质和 Pythagoras 定理（{@orthonormal} 之后的注），不涉及任何极限。只有第 3 条要取 $N \to \infty$，用的是「有界的递增数列收敛」。

**第 1 步（$f - S_N f \perp \mathcal{T}_N$）**　对 $\abs m \le N$，由 {@orthonormal}，
$$\ps{S_N f, e_m} = \sum_{\abs n \le N} c_n(f)\ps{e_n, e_m} = c_m(f),\qquad\text{所以}\quad \ps{f - S_N f, e_m} = c_m(f) - c_m(f) = 0.$$
对 $P = \sum_{\abs m \le N}\alpha_m e_m$，由对第二个变量的共轭线性，$\ps{f - S_N f, P} = \sum_{\abs m \le N}\overline{\alpha_m}\,\ps{f - S_N f, e_m} = 0$。

**第 2 步（Pythagoras）**　设 $P \in \mathcal{T}_N$。写 $f - P = u + v$，$u = f - S_N f$，$v = S_N f - P \in \mathcal{T}_N$。由第 1 步 $\ps{u, v} = 0$，所以
$$\norm{f - P}_2^2 = \norm{u}_2^2 + 2\operatorname{Re}\ps{u, v} + \norm{v}_2^2 = \norm{f - S_N f}_2^2 + \norm{S_N f - P}_2^2 \ge \norm{f - S_N f}_2^2.$$
这就是第 1 条。

**第 3 步（取 $P = 0$）**　第 2 步给出 $\norm{f}_2^2 = \norm{f - S_N f}_2^2 + \norm{S_N f}_2^2$。由正交规范性，
$$\norm{S_N f}_2^2 = \Big\langle \sum_{\abs n \le N} c_n e_n, \sum_{\abs m \le N} c_m e_m\Big\rangle = \sum_{\abs n, \abs m \le N} c_n\overline{c_m}\,\ps{e_n, e_m} = \sum_{\abs n \le N}\abs{c_n}^2,$$
其中 $c_n = c_n(f)$。代入即得第 2 条。

**第 4 步（$N \to \infty$）**　由第 2 条和 $\norm{f - S_N f}_2^2 \ge 0$，$T_N := \sum_{\abs n \le N}\abs{c_n}^2 \le \norm{f}_2^2$ 对一切 $N$ 成立。$(T_N)$ 递增且有上界，所以收敛，极限 $\le \norm{f}_2^2$。这就是第 3 条。
:::

::: fr
▷ Méthode : il s'agit de la projection orthogonale sur le sous-espace de dimension finie $\mathcal{T}_N$ ; on n'utilise que les propriétés algébriques de $\ps{\cdot, \cdot}$ et le théorème de Pythagore (remarque suivant {@fr:orthonormal}), sans aucun passage à la limite. Seul le point 3 fait tendre $N$ vers $+\infty$, via le théorème de la limite monotone.

**Étape 1 ($f - S_N f \perp \mathcal{T}_N$)**　Pour $\abs m \le N$, d'après {@fr:orthonormal},
$$\ps{S_N f, e_m} = \sum_{\abs n \le N} c_n(f)\ps{e_n, e_m} = c_m(f),\qquad\text{donc}\quad \ps{f - S_N f, e_m} = c_m(f) - c_m(f) = 0.$$
Pour $P = \sum_{\abs m \le N}\alpha_m e_m$, par semi-linéarité en la seconde variable, $\ps{f - S_N f, P} = \sum_{\abs m \le N}\overline{\alpha_m}\,\ps{f - S_N f, e_m} = 0$.

**Étape 2 (Pythagore)**　Soit $P \in \mathcal{T}_N$. Écrivons $f - P = u + v$ avec $u = f - S_N f$ et $v = S_N f - P \in \mathcal{T}_N$. D'après l'étape 1, $\ps{u, v} = 0$, donc
$$\norm{f - P}_2^2 = \norm{u}_2^2 + 2\operatorname{Re}\ps{u, v} + \norm{v}_2^2 = \norm{f - S_N f}_2^2 + \norm{S_N f - P}_2^2 \ge \norm{f - S_N f}_2^2.$$
C'est le point 1.

**Étape 3 ($P = 0$)**　L'étape 2 donne $\norm{f}_2^2 = \norm{f - S_N f}_2^2 + \norm{S_N f}_2^2$. Par orthonormalité,
$$\norm{S_N f}_2^2 = \Big\langle \sum_{\abs n \le N} c_n e_n, \sum_{\abs m \le N} c_m e_m\Big\rangle = \sum_{\abs n, \abs m \le N} c_n\overline{c_m}\,\ps{e_n, e_m} = \sum_{\abs n \le N}\abs{c_n}^2,$$
où $c_n = c_n(f)$. On en déduit le point 2.

**Étape 4 ($N \to +\infty$)**　D'après le point 2 et $\norm{f - S_N f}_2^2 \ge 0$, on a $T_N := \sum_{\abs n \le N}\abs{c_n}^2 \le \norm{f}_2^2$ pour tout $N$. La suite $(T_N)$ est croissante et majorée, donc converge, et sa limite est $\le \norm{f}_2^2$. C'est le point 3.
:::

::: rem
1. **Bessel 只用到正交性。** 对任何正交规范族 $(u_n)$ 都有 $\sum\abs{\ps{f, u_n}}^2 \le \norm f_2^2$；等号能否成立取决于族是否「足够大」。例如只取偶数频率 $(e_{2n})_{n \in \Z}$，对 $f = e_1$ 有 $\ps{e_1, e_{2n}} = 0$ 对一切 $n$，左边为 $0$，右边为 $1$。对完整的三角系，等号总成立，这就是 Parseval 恒等式 {@parseval}，证明需要 Fejér 定理提供的稠密性。
2. **推论：$c_n(f) \to 0$**（$\abs n \to \infty$），因为收敛级数的通项趋于 $0$（{@cn-grossiere}）。下面的 Riemann–Lebesgue 引理是它的连续参数版本，而且不需要周期性。
:::

::: thm id=riemann-lebesgue zh="Riemann–Lebesgue 引理" en="Riemann–Lebesgue lemma" fr="Lemme de Riemann–Lebesgue" ru="Лемма Римана–Лебега" lvl=1
设 $a < b$，$g : [a, b] \to \C$ 分段连续。则
$$\int_a^b g(t)\,\e^{\ii\lambda t}\,\dd t \xrightarrow[\lambda \to \pm\infty]{} 0 \qquad (\lambda \in \R).$$
因此 $\int_a^b g(t)\cos\lambda t\,\dd t \to 0$，$\int_a^b g(t)\sin\lambda t\,\dd t \to 0$；特别地，对 $f \in \mathcal{CM}_{2\pi}$，$c_n(f) \to 0$（$\abs n \to \infty$）。
:::

::: fr
Soit $a < b$ et $g : [a, b] \to \C$ continue par morceaux. Alors
$$\int_a^b g(t)\,\e^{\ii\lambda t}\,\dd t \xrightarrow[\lambda \to \pm\infty]{} 0 \qquad (\lambda \in \R).$$
Par conséquent $\int_a^b g(t)\cos\lambda t\,\dd t \to 0$ et $\int_a^b g(t)\sin\lambda t\,\dd t \to 0$ ; en particulier, pour $f \in \mathcal{CM}_{2\pi}$, $c_n(f) \to 0$ quand $\abs n \to \infty$.
:::

::: proof
▷ 思路：先对最简单的函数（区间的指示函数）直接计算，再用线性推到阶梯函数，最后用阶梯函数一致逼近一般的分段连续函数（{@escalier}）。这是「先在稠密子集上证明，再用逼近推广」的典型模式。

▷ 要证：对任意 $\eps > 0$，存在 $\Lambda > 0$，使得对一切 $\abs\lambda \ge \Lambda$，$\Big|\int_a^b g(t)\,\e^{\ii\lambda t}\,\dd t\Big| \le \eps$。

**第 1 步（区间的指示函数）**　设 $g = \mathbf{1}_J$，$J \subset [a, b]$ 是端点为 $c \le d$ 的区间（开闭不影响积分）。对 $\lambda \ne 0$，
$$\Big|\int_c^d \e^{\ii\lambda t}\,\dd t\Big| = \Big|\frac{\e^{\ii\lambda d} - \e^{\ii\lambda c}}{\ii\lambda}\Big| \le \frac{2}{\abs\lambda}.$$

**第 2 步（阶梯函数）**　阶梯函数 $h$ 在去掉有限个点后可写成 $h = \sum_{k=1}^q \alpha_k\mathbf{1}_{J_k}$（$J_k$ 为区间，$\alpha_k \in \C$），有限个点不影响积分。记 $A_h = \sum_{k=1}^q\abs{\alpha_k}$。由线性与第 1 步，
$$\Big|\int_a^b h(t)\,\e^{\ii\lambda t}\,\dd t\Big| \le \sum_{k=1}^q\abs{\alpha_k}\cdot\frac{2}{\abs\lambda} = \frac{2A_h}{\abs\lambda}\qquad(\lambda \ne 0).$$

**第 3 步（一般情形）**　设 $\eps > 0$。由 {@escalier}，存在阶梯函数 $h$ 使 $\norm{g - h}_{\infty, [a,b]} \le \dfrac{\eps}{2(b - a)}$。对 $\lambda \ne 0$，
$$\begin{aligned}
\Big|\int_a^b g\,\e^{\ii\lambda t}\Big| &\le \int_a^b\abs{g - h} + \Big|\int_a^b h\,\e^{\ii\lambda t}\Big| && \text{（三角不等式，}\abs{\e^{\ii\lambda t}} = 1\text{）}\\
&\le (b - a)\cdot\frac{\eps}{2(b-a)} + \frac{2A_h}{\abs\lambda} && \text{（第 2 步）}.
\end{aligned}$$
令 $\Lambda = \dfrac{4A_h}{\eps}$（若 $A_h = 0$，取 $\Lambda = 1$）。则对 $\abs\lambda \ge \Lambda$，$\frac{2A_h}{\abs\lambda} \le \frac\eps2$，从而 $\Big|\int_a^b g\,\e^{\ii\lambda t}\Big| \le \eps$。

**第 4 步（推论）**　由 $\cos\lambda t = \frac12(\e^{\ii\lambda t} + \e^{-\ii\lambda t})$、$\sin\lambda t = \frac{1}{2\ii}(\e^{\ii\lambda t} - \e^{-\ii\lambda t})$ 和 $\lambda \to +\infty$、$-\infty$ 两种情形，得到 $\cos$、$\sin$ 的结论。取 $[a, b] = [-\pi, \pi]$、$g = \frac{1}{2\pi}f$、$\lambda = -n$，得 $c_n(f) \to 0$。

这就证明了 Riemann–Lebesgue 引理。
:::

::: fr
▷ Méthode : on calcule directement pour les fonctions les plus simples (indicatrices d'intervalles), on passe aux fonctions en escalier par linéarité, puis aux fonctions continues par morceaux par approximation uniforme ({@fr:escalier}). C'est le schéma typique « on démontre sur une partie dense, puis on approche ».

▷ On veut montrer : pour tout $\eps > 0$, il existe $\Lambda > 0$ tel que pour tout $\abs\lambda \ge \Lambda$, $\Big|\int_a^b g(t)\,\e^{\ii\lambda t}\,\dd t\Big| \le \eps$.

**Étape 1 (indicatrice d'un intervalle)**　Soit $g = \mathbf{1}_J$, où $J \subset [a, b]$ est un intervalle d'extrémités $c \le d$ (ouvert ou fermé, peu importe pour l'intégrale). Pour $\lambda \ne 0$,
$$\Big|\int_c^d \e^{\ii\lambda t}\,\dd t\Big| = \Big|\frac{\e^{\ii\lambda d} - \e^{\ii\lambda c}}{\ii\lambda}\Big| \le \frac{2}{\abs\lambda}.$$

**Étape 2 (fonctions en escalier)**　Une fonction en escalier $h$ s'écrit, hors d'un nombre fini de points, $h = \sum_{k=1}^q \alpha_k\mathbf{1}_{J_k}$ ($J_k$ intervalles, $\alpha_k \in \C$) ; un nombre fini de points ne change pas l'intégrale. Notons $A_h = \sum_{k=1}^q\abs{\alpha_k}$. Par linéarité et d'après l'étape 1,
$$\Big|\int_a^b h(t)\,\e^{\ii\lambda t}\,\dd t\Big| \le \sum_{k=1}^q\abs{\alpha_k}\cdot\frac{2}{\abs\lambda} = \frac{2A_h}{\abs\lambda}\qquad(\lambda \ne 0).$$

**Étape 3 (cas général)**　Soit $\eps > 0$. D'après {@fr:escalier}, il existe une fonction en escalier $h$ telle que $\norm{g - h}_{\infty, [a,b]} \le \dfrac{\eps}{2(b - a)}$. Pour $\lambda \ne 0$,
$$\begin{aligned}
\Big|\int_a^b g\,\e^{\ii\lambda t}\Big| &\le \int_a^b\abs{g - h} + \Big|\int_a^b h\,\e^{\ii\lambda t}\Big| && \text{(inégalité triangulaire, } \abs{\e^{\ii\lambda t}} = 1\text{)}\\
&\le (b - a)\cdot\frac{\eps}{2(b-a)} + \frac{2A_h}{\abs\lambda} && \text{(étape 2)}.
\end{aligned}$$
Posons $\Lambda = \dfrac{4A_h}{\eps}$ (et $\Lambda = 1$ si $A_h = 0$). Pour $\abs\lambda \ge \Lambda$, $\frac{2A_h}{\abs\lambda} \le \frac\eps2$, donc $\Big|\int_a^b g\,\e^{\ii\lambda t}\Big| \le \eps$.

**Étape 4 (conséquences)**　Les formules $\cos\lambda t = \frac12(\e^{\ii\lambda t} + \e^{-\ii\lambda t})$, $\sin\lambda t = \frac{1}{2\ii}(\e^{\ii\lambda t} - \e^{-\ii\lambda t})$ et les deux cas $\lambda \to \pm\infty$ donnent les énoncés pour $\cos$ et $\sin$. Avec $[a, b] = [-\pi, \pi]$, $g = \frac{1}{2\pi}f$ et $\lambda = -n$, on obtient $c_n(f) \to 0$.

Ceci démontre le lemme de Riemann–Lebesgue.
:::

::: rem
1. **收敛速度。** 引理不给出速度。若 $g$ 在 $[a, b]$ 上是 $\Cc^1$ 的，分部积分给出
   $$\int_a^b g\,\e^{\ii\lambda t}\,\dd t = \Big[\frac{g(t)\,\e^{\ii\lambda t}}{\ii\lambda}\Big]_a^b - \frac{1}{\ii\lambda}\int_a^b g'\,\e^{\ii\lambda t}\,\dd t,$$
   从而 $\Big|\int_a^b g\,\e^{\ii\lambda t}\Big| \le \dfrac{2\norm g_\infty + (b - a)\norm{g'}_\infty}{\abs\lambda}$。函数越光滑，衰减越快，见 {@c5-regularite}。

2. **区间有界很重要。** 在 $[0, +\infty[$ 上，$\int_0^x \cos\lambda t\,\dd t = \frac{\sin\lambda x}{\lambda}$ 在 $x \to +\infty$ 时没有极限，积分 $\int_0^{+\infty}\cos\lambda t\,\dd t$ 根本不存在。第 6 章的「想一想」把引理推广到无界区间上的**可积**函数（{@def-integrable}）。
:::

::: q
$\int_0^\pi \sin^2(\lambda t)\,\dd t$ 在 $\lambda \to +\infty$ 时趋于 $0$ 吗？这与 Riemann–Lebesgue 引理矛盾吗？
:::

::: ans
不趋于 $0$：$\sin^2(\lambda t) = \frac12 - \frac12\cos(2\lambda t)$，所以 $\int_0^\pi \sin^2(\lambda t)\,\dd t = \frac\pi2 - \frac12\int_0^\pi\cos(2\lambda t)\,\dd t \to \frac\pi2$（后一项由引理趋于 $0$）。不矛盾：引理处理的是**固定的** $g$ 乘以 $\e^{\ii\lambda t}$；$\sin^2(\lambda t)$ 不是这种形式，它含有频率为 $0$ 的分量 $\frac12$。
:::

::: q
是否存在 $f \in \mathcal{CM}_{2\pi}$，使 $c_n(f) = \frac{1}{\sqrt{\abs n}}$ 对一切 $n \ne 0$ 成立？
:::

::: ans
不存在。由 Bessel 不等式 {@bessel}，$\sum_{n \in \Z}\abs{c_n(f)}^2 < +\infty$，而 $\sum_{n \ne 0}\frac{1}{\abs n} = 2\sum_{n \ge 1}\frac1n = +\infty$。注意 $\frac{1}{\sqrt{\abs n}} \to 0$，所以单靠 Riemann–Lebesgue 引理排除不了它：Bessel 不等式给出的信息更强。
:::

## Dirichlet 核、Fejér 核与 Fejér 定理

$S_N f(x)$ 可以写成 $f$ 与一个「核」的卷积，即 $f$ 在 $x$ 附近取值的加权平均。部分和对应 Dirichlet 核 $D_N$，它会变号，而且 $\int\abs{D_N}$ 无界；对部分和取算术平均（Cesàro 平均），得到的 Fejér 核 $K_N$ 是非负的。这一个差别决定了两者收敛性质的全部差别：$\sigma_N f$ 对每个连续函数一致收敛（Fejér 定理），$S_N f$ 则不然。

::: def id=def-fejer zh="Dirichlet 核与 Fejér 核" en="Dirichlet kernel and Fejér kernel" fr="Noyaux de Dirichlet et de Fejér" ru="Ядра Дирихле и Фейера"
对 $N \in \N$ 和 $t \in \R$，定义 **Dirichlet 核**与 **Fejér 核**
$$D_N(t) = \sum_{\abs{n} \le N} \e^{\ii nt},\qquad K_N(t) = \frac{1}{N+1}\sum_{k=0}^N D_k(t).$$
对 $f \in \mathcal{CM}_{2\pi}$，**Fejér 平均**（部分和的 Cesàro 平均）定义为
$$\sigma_N f = \frac{1}{N+1}\sum_{k=0}^N S_k f.$$
下面两个引理（{@c5-dirichlet-noyau}、{@fejer-noyau}）将证明：对 $t \notin 2\pi\Z$，
$$D_N(t) = \frac{\sin\big((N + \frac12)t\big)}{\sin(t/2)},\qquad K_N(t) = \frac{1}{N+1}\left(\frac{\sin\frac{(N+1)t}{2}}{\sin\frac t2}\right)^2,$$
并且
$$S_N f(x) = \frac{1}{2\pi}\int_{-\pi}^{\pi} f(x - t)\,D_N(t)\,\dd t,\qquad \sigma_N f(x) = \frac{1}{2\pi}\int_{-\pi}^{\pi} f(x-t)\,K_N(t)\,\dd t.$$
白话：$S_N f(x)$ 与 $\sigma_N f(x)$ 都是 $f$ 在 $x$ 附近取值的「加权平均」，权重分别是 $D_N$ 与 $K_N$。
:::

::: fr
Pour $N \in \N$ et $t \in \R$, on définit le **noyau de Dirichlet** et le **noyau de Fejér**
$$D_N(t) = \sum_{\abs{n} \le N} \e^{\ii nt},\qquad K_N(t) = \frac{1}{N+1}\sum_{k=0}^N D_k(t).$$
Pour $f \in \mathcal{CM}_{2\pi}$, la **moyenne de Fejér** (moyenne de Cesàro des sommes partielles) est
$$\sigma_N f = \frac{1}{N+1}\sum_{k=0}^N S_k f.$$
On montrera dans {@fr:c5-dirichlet-noyau} et {@fr:fejer-noyau} que, pour $t \notin 2\pi\Z$,
$$D_N(t) = \frac{\sin\big((N + \frac12)t\big)}{\sin(t/2)},\qquad K_N(t) = \frac{1}{N+1}\left(\frac{\sin\frac{(N+1)t}{2}}{\sin\frac t2}\right)^2,$$
et que
$$S_N f(x) = \frac{1}{2\pi}\int_{-\pi}^{\pi} f(x - t)\,D_N(t)\,\dd t,\qquad \sigma_N f(x) = \frac{1}{2\pi}\int_{-\pi}^{\pi} f(x-t)\,K_N(t)\,\dd t.$$
Autrement dit, $S_N f(x)$ et $\sigma_N f(x)$ sont des « moyennes pondérées » des valeurs de $f$ au voisinage de $x$, avec les poids $D_N$ et $K_N$.
:::

::: ex id=c5-ex-noyaux zh="$N = 1$ 的两个核" lvl=1
$D_0 = 1$，$D_1(t) = \e^{-\ii t} + 1 + \e^{\ii t} = 1 + 2\cos t$。$D_1$ **会变号**：$D_1(0) = 3$，$D_1(\pi) = -1$。与闭式核对：$\frac{\sin(3\pi/2)}{\sin(\pi/2)} = -1$。

$K_1 = \frac12(D_0 + D_1) = 1 + \cos t \ge 0$。与闭式核对：$\frac12\Big(\frac{\sin t}{\sin(t/2)}\Big)^2 = \frac12\big(2\cos\tfrac t2\big)^2 = 2\cos^2\tfrac t2 = 1 + \cos t$。
:::

::: lem id=c5-dirichlet-noyau zh="Dirichlet 核的性质" en="Properties of the Dirichlet kernel" fr="Propriétés du noyau de Dirichlet" ru="Свойства ядра Дирихле" lvl=1
1. $D_N$ 是 $2\pi$ 周期的实值偶函数，$D_N(t) = 1 + 2\sum_{n=1}^N\cos nt$，$D_N(0) = 2N + 1$。
2. 对 $t \notin 2\pi\Z$，$D_N(t) = \dfrac{\sin\big((N+\frac12)t\big)}{\sin(t/2)}$。
3. $\dfrac{1}{2\pi}\displaystyle\int_{-\pi}^{\pi}D_N(t)\,\dd t = 1$，$\dfrac{1}{2\pi}\displaystyle\int_0^{\pi}D_N(t)\,\dd t = \dfrac12$。
4. 对 $f \in \mathcal{CM}_{2\pi}$ 和 $x \in \R$，
$$S_N f(x) = \frac{1}{2\pi}\int_{-\pi}^{\pi} f(x - t)\,D_N(t)\,\dd t = \frac{1}{2\pi}\int_{-\pi}^{\pi} f(x + t)\,D_N(t)\,\dd t.$$
:::

::: fr
1. $D_N$ est une fonction réelle, paire et $2\pi$-périodique ; $D_N(t) = 1 + 2\sum_{n=1}^N\cos nt$ et $D_N(0) = 2N + 1$.
2. Pour $t \notin 2\pi\Z$, $D_N(t) = \dfrac{\sin\big((N+\frac12)t\big)}{\sin(t/2)}$.
3. $\dfrac{1}{2\pi}\displaystyle\int_{-\pi}^{\pi}D_N(t)\,\dd t = 1$ et $\dfrac{1}{2\pi}\displaystyle\int_0^{\pi}D_N(t)\,\dd t = \dfrac12$.
4. Pour $f \in \mathcal{CM}_{2\pi}$ et $x \in \R$,
$$S_N f(x) = \frac{1}{2\pi}\int_{-\pi}^{\pi} f(x - t)\,D_N(t)\,\dd t = \frac{1}{2\pi}\int_{-\pi}^{\pi} f(x + t)\,D_N(t)\,\dd t.$$
:::

::: proof
▷ 思路：1、3 是直接计算；2 是一个望远镜求和；4 把 $c_n(f)$ 的积分代入有限和，再换元并用 {@c5-periode}。

**1.**　把 $n$ 与 $-n$ 配对：$\e^{\ii nt} + \e^{-\ii nt} = 2\cos nt$，所以 $D_N(t) = 1 + 2\sum_{n=1}^N\cos nt$，它是实值、偶、$2\pi$ 周期的；$t = 0$ 时每项为 $1$，共 $2N + 1$ 项。

**2.**　设 $t \notin 2\pi\Z$。乘以 $\e^{\ii t/2} - \e^{-\ii t/2} = 2\ii\sin\frac t2$：
$$\Big(\e^{\ii t/2} - \e^{-\ii t/2}\Big)D_N(t) = \sum_{n=-N}^{N}\e^{\ii(n + \frac12)t} - \sum_{n=-N}^{N}\e^{\ii(n - \frac12)t}.$$
第二个和中令 $m = n - 1$，它变成 $\sum_{m=-N-1}^{N-1}\e^{\ii(m + \frac12)t}$。两个和相减，只剩下第一个和的最后一项与第二个和的第一项：
$$2\ii\sin\tfrac t2\,D_N(t) = \e^{\ii(N + \frac12)t} - \e^{-\ii(N + \frac12)t} = 2\ii\sin\big((N + \tfrac12)t\big).$$
因为 $\sin\frac t2 \ne 0$，两边除以 $2\ii\sin\frac t2$ 即得。

**3.**　由 {@orthonormal}，$\frac{1}{2\pi}\int_{-\pi}^{\pi}\e^{\ii nt}\,\dd t = \ps{e_n, e_0}$，$n = 0$ 时为 $1$，否则为 $0$。所以 $\frac{1}{2\pi}\int_{-\pi}^{\pi}D_N = 1$。$D_N$ 是偶函数，$\int_{-\pi}^0 D_N = \int_0^\pi D_N$（{@coef-proprietes} 的证明，第 1 步），两者各为总积分的一半。

**4.**　**第 1 步（代入）**　积分对有限和是线性的，所以
$$\begin{aligned}S_N f(x) &= \sum_{\abs n \le N}\Big(\frac{1}{2\pi}\int_{-\pi}^{\pi} f(s)\,\e^{-\ii ns}\,\dd s\Big)\e^{\ii nx}\\
&= \frac{1}{2\pi}\int_{-\pi}^{\pi} f(s)\sum_{\abs n \le N}\e^{\ii n(x - s)}\,\dd s = \frac{1}{2\pi}\int_{-\pi}^{\pi} f(s)\,D_N(x - s)\,\dd s.\end{aligned}$$

**第 2 步（换元）**　令 $s = x - t$（$\dd s = -\dd t$；$s = -\pi \iff t = x + \pi$，$s = \pi \iff t = x - \pi$）：
$$S_N f(x) = \frac{1}{2\pi}\int_{x-\pi}^{x+\pi} f(x - t)\,D_N(t)\,\dd t.$$

**第 3 步（换回 $[-\pi, \pi]$）**　$t \mapsto f(x - t)D_N(t)$ 属于 $\mathcal{CM}_{2\pi}$（{@c5-ex-trois-signaux} 后的注：对反射、平移、乘积封闭），由 {@c5-periode}（取 $a = x - \pi$），积分区间可换成 $[-\pi, \pi]$。这得到第一个等式。

**第 4 步（另一种形式）**　在第一个等式中令 $t = -u$，并用 $D_N(-u) = D_N(u)$，得到第二个等式。
:::

::: fr
▷ Méthode : 1 et 3 sont des calculs directs ; 2 est une somme télescopique ; pour 4, on reporte l'intégrale définissant $c_n(f)$ dans la somme finie, puis on change de variable et on applique {@fr:c5-periode}.

**1.**　En regroupant $n$ et $-n$ : $\e^{\ii nt} + \e^{-\ii nt} = 2\cos nt$, donc $D_N(t) = 1 + 2\sum_{n=1}^N\cos nt$, fonction réelle, paire et $2\pi$-périodique ; en $t = 0$, chacun des $2N + 1$ termes vaut $1$.

**2.**　Soit $t \notin 2\pi\Z$. Multiplions par $\e^{\ii t/2} - \e^{-\ii t/2} = 2\ii\sin\frac t2$ :
$$\Big(\e^{\ii t/2} - \e^{-\ii t/2}\Big)D_N(t) = \sum_{n=-N}^{N}\e^{\ii(n + \frac12)t} - \sum_{n=-N}^{N}\e^{\ii(n - \frac12)t}.$$
Dans la seconde somme, posons $m = n - 1$ : elle devient $\sum_{m=-N-1}^{N-1}\e^{\ii(m + \frac12)t}$. Dans la différence, il ne reste que le dernier terme de la première somme et le premier terme de la seconde :
$$2\ii\sin\tfrac t2\,D_N(t) = \e^{\ii(N + \frac12)t} - \e^{-\ii(N + \frac12)t} = 2\ii\sin\big((N + \tfrac12)t\big).$$
Comme $\sin\frac t2 \ne 0$, on divise par $2\ii\sin\frac t2$.

**3.**　D'après {@fr:orthonormal}, $\frac{1}{2\pi}\int_{-\pi}^{\pi}\e^{\ii nt}\,\dd t = \ps{e_n, e_0}$ vaut $1$ si $n = 0$ et $0$ sinon. Donc $\frac{1}{2\pi}\int_{-\pi}^{\pi}D_N = 1$. Comme $D_N$ est paire, $\int_{-\pi}^0 D_N = \int_0^\pi D_N$ (preuve de {@fr:coef-proprietes}, étape 1), et chacune vaut la moitié de l'intégrale totale.

**4.**　**Étape 1 (substitution)**　L'intégrale est linéaire vis-à-vis d'une somme finie, donc
$$\begin{aligned}S_N f(x) &= \sum_{\abs n \le N}\Big(\frac{1}{2\pi}\int_{-\pi}^{\pi} f(s)\,\e^{-\ii ns}\,\dd s\Big)\e^{\ii nx}\\
&= \frac{1}{2\pi}\int_{-\pi}^{\pi} f(s)\sum_{\abs n \le N}\e^{\ii n(x - s)}\,\dd s = \frac{1}{2\pi}\int_{-\pi}^{\pi} f(s)\,D_N(x - s)\,\dd s.\end{aligned}$$

**Étape 2 (changement de variable)**　Posons $s = x - t$ ($\dd s = -\dd t$ ; $s = -\pi \iff t = x + \pi$, $s = \pi \iff t = x - \pi$) :
$$S_N f(x) = \frac{1}{2\pi}\int_{x-\pi}^{x+\pi} f(x - t)\,D_N(t)\,\dd t.$$

**Étape 3 (retour à $[-\pi, \pi]$)**　La fonction $t \mapsto f(x - t)D_N(t)$ appartient à $\mathcal{CM}_{2\pi}$ (remarque suivant {@fr:c5-ex-trois-signaux} : stabilité par réflexion, translation et produit). D'après {@fr:c5-periode} (avec $a = x - \pi$), on peut intégrer sur $[-\pi, \pi]$. C'est la première égalité.

**Étape 4 (seconde forme)**　Dans la première égalité, on pose $t = -u$ et on utilise $D_N(-u) = D_N(u)$.
:::

::: lem id=c5-unif-cont zh="周期连续函数有界且一致连续" en="Continuous periodic functions are bounded and uniformly continuous" fr="Une fonction continue périodique est bornée et uniformément continue" ru="Непрерывная периодическая функция ограничена и равномерно непрерывна" lvl=1
设 $f \in \Cc_{2\pi}$。则 $\norm{f}_\infty = \max_{[-\pi,\pi]}\abs f < +\infty$，且 $f$ 在 $\R$ 上一致连续：
$$\forall \eps > 0,\ \exists \delta > 0,\ \forall x, y \in \R,\quad \abs{x - y} \le \delta \Rightarrow \abs{f(x) - f(y)} \le \eps.$$
:::

::: fr
Soit $f \in \Cc_{2\pi}$. Alors $\norm{f}_\infty = \max_{[-\pi,\pi]}\abs f < +\infty$, et $f$ est uniformément continue sur $\R$ :
$$\forall \eps > 0,\ \exists \delta > 0,\ \forall x, y \in \R,\quad \abs{x - y} \le \delta \Rightarrow \abs{f(x) - f(y)} \le \eps.$$
:::

::: proof
▷ 思路：在紧集 $[-2\pi, 2\pi]$ 上用 Heine 定理得到 $\delta$；任何两个相距不超过 $\pi$ 的点都可以用同一个 $2k\pi$ 平移进 $[-2\pi, 2\pi]$。

**第 1 步（有界）**　$\abs f$ 在紧集 $[-\pi, \pi]$ 上连续，取到最大值（{@image-compact}）；由周期性，$\abs f$ 在 $\R$ 上的上确界等于这个最大值。

**第 2 步（Heine）**　设 $\eps > 0$。由 Heine 定理 {@heine}，$f$ 在 $[-2\pi, 2\pi]$ 上一致连续：存在 $\delta_0 > 0$，使对 $x', y' \in [-2\pi, 2\pi]$，$\abs{x' - y'} < \delta_0 \Rightarrow \abs{f(x') - f(y')} \le \eps$。令 $\delta = \min\big(\frac{\delta_0}{2}, \pi\big)$。

**第 3 步（平移）**　设 $x, y \in \R$，$\abs{x - y} \le \delta$。取 $k = E\big(\frac{x + \pi}{2\pi}\big)$（$E$ 为整数部分），则 $x' = x - 2k\pi \in [-\pi, \pi[$。令 $y' = y - 2k\pi$，则
$$\abs{y'} \le \abs{x'} + \abs{y' - x'} \le \pi + \delta \le 2\pi,$$
所以 $x', y' \in [-2\pi, 2\pi]$，且 $\abs{x' - y'} = \abs{x - y} \le \delta < \delta_0$。由周期性和第 2 步，$\abs{f(x) - f(y)} = \abs{f(x') - f(y')} \le \eps$。

这就证明了 $f$ 在 $\R$ 上一致连续。
:::

::: fr
▷ Méthode : on applique le théorème de Heine sur le compact $[-2\pi, 2\pi]$ ; deux points distants d'au plus $\pi$ se ramènent simultanément dans $[-2\pi, 2\pi]$ par une même translation de $2k\pi$.

**Étape 1 (caractère borné)**　$\abs f$ est continue sur le compact $[-\pi, \pi]$, donc atteint son maximum ({@fr:image-compact}) ; par périodicité, la borne supérieure de $\abs f$ sur $\R$ est ce maximum.

**Étape 2 (Heine)**　Soit $\eps > 0$. D'après le théorème de Heine ({@fr:heine}), $f$ est uniformément continue sur $[-2\pi, 2\pi]$ : il existe $\delta_0 > 0$ tel que pour $x', y' \in [-2\pi, 2\pi]$, $\abs{x' - y'} < \delta_0 \Rightarrow \abs{f(x') - f(y')} \le \eps$. Posons $\delta = \min\big(\frac{\delta_0}{2}, \pi\big)$.

**Étape 3 (translation)**　Soient $x, y \in \R$ avec $\abs{x - y} \le \delta$. Posons $k = E\big(\frac{x + \pi}{2\pi}\big)$ ($E$ désigne la partie entière) ; alors $x' = x - 2k\pi \in [-\pi, \pi[$. Posons $y' = y - 2k\pi$ ; on a
$$\abs{y'} \le \abs{x'} + \abs{y' - x'} \le \pi + \delta \le 2\pi,$$
donc $x', y' \in [-2\pi, 2\pi]$ et $\abs{x' - y'} = \abs{x - y} \le \delta < \delta_0$. Par périodicité et d'après l'étape 2, $\abs{f(x) - f(y)} = \abs{f(x') - f(y')} \le \eps$.

Ceci montre que $f$ est uniformément continue sur $\R$.
:::

::: lem id=fejer-noyau zh="Fejér 核的性质" en="Properties of the Fejér kernel" fr="Propriétés du noyau de Fejér" ru="Свойства ядра Фейера" lvl=1
1. 对 $t \notin 2\pi\Z$，$K_N(t) = \dfrac{1}{N+1}\left(\dfrac{\sin\frac{(N+1)t}{2}}{\sin\frac t2}\right)^2$，且 $K_N(0) = N + 1$。特别地 $K_N \ge 0$。
2. $\dfrac{1}{2\pi}\displaystyle\int_{-\pi}^{\pi} K_N(t)\,\dd t = 1$。
3. 对 $0 < \delta \le \abs{t} \le \pi$，$K_N(t) \le \dfrac{1}{(N+1)\sin^2(\delta/2)}$。
4. $K_N = \sum_{\abs n \le N}\Big(1 - \dfrac{\abs n}{N+1}\Big)e_n$。因此对 $f \in \mathcal{CM}_{2\pi}$，$\sigma_N f = \sum_{\abs n \le N}\Big(1 - \dfrac{\abs n}{N+1}\Big)c_n(f)\,e_n \in \mathcal{T}_N$，且
$$\sigma_N f(x) = \frac{1}{2\pi}\int_{-\pi}^{\pi} f(x - t)\,K_N(t)\,\dd t.$$
:::

::: fr
1. Pour $t \notin 2\pi\Z$, $K_N(t) = \dfrac{1}{N+1}\left(\dfrac{\sin\frac{(N+1)t}{2}}{\sin\frac t2}\right)^2$, et $K_N(0) = N + 1$. En particulier $K_N \ge 0$.
2. $\dfrac{1}{2\pi}\displaystyle\int_{-\pi}^{\pi} K_N(t)\,\dd t = 1$.
3. Pour $0 < \delta \le \abs{t} \le \pi$, $K_N(t) \le \dfrac{1}{(N+1)\sin^2(\delta/2)}$.
4. $K_N = \sum_{\abs n \le N}\Big(1 - \dfrac{\abs n}{N+1}\Big)e_n$. Par conséquent, pour $f \in \mathcal{CM}_{2\pi}$, $\sigma_N f = \sum_{\abs n \le N}\Big(1 - \dfrac{\abs n}{N+1}\Big)c_n(f)\,e_n \in \mathcal{T}_N$ et
$$\sigma_N f(x) = \frac{1}{2\pi}\int_{-\pi}^{\pi} f(x - t)\,K_N(t)\,\dd t.$$
:::

::: proof
▷ 思路：1 用 $D_k$ 的闭式和积化和差，得到望远镜和；2、4 由 $D_k$ 的相应性质取平均；3 由 $\sin$ 在 $[0, \frac\pi2]$ 上递增。

**1.**　设 $t \notin 2\pi\Z$。由 {@c5-dirichlet-noyau} 第 2 条和积化和差公式 $\sin A\sin B = \frac12\big(\cos(A - B) - \cos(A + B)\big)$（$A = \frac t2$，$B = (k + \frac12)t$，$A - B = -kt$，$A + B = (k+1)t$），
$$\begin{aligned}\sin^2\tfrac t2\sum_{k=0}^N D_k(t) &= \sum_{k=0}^N\sin\tfrac t2\,\sin\big((k + \tfrac12)t\big) = \frac12\sum_{k=0}^N\big(\cos kt - \cos(k+1)t\big)\\
&= \frac{1 - \cos(N+1)t}{2} = \sin^2\frac{(N+1)t}{2}.\end{aligned}$$
（中间是望远镜和。）两边除以 $(N+1)\sin^2\frac t2 > 0$ 即得闭式。在 $t = 0$，$K_N(0) = \frac{1}{N+1}\sum_{k=0}^N(2k + 1) = \frac{(N+1)^2}{N+1} = N + 1$。闭式是平方除以正数，$K_N(0) > 0$，再由周期性，$K_N \ge 0$ 处处成立。

**2.**　由 {@c5-dirichlet-noyau} 第 3 条，$\frac{1}{2\pi}\int K_N = \frac{1}{N+1}\sum_{k=0}^N\frac{1}{2\pi}\int D_k = \frac{N+1}{N+1} = 1$。

**3.**　若 $\delta \le \abs t \le \pi$，则 $\frac{\abs t}{2} \in \big[\frac\delta2, \frac\pi2\big]$。$\sin$ 在 $[0, \frac\pi2]$ 上递增，所以 $\sin^2\frac t2 = \sin^2\frac{\abs t}{2} \ge \sin^2\frac\delta2 > 0$；分子 $\sin^2\frac{(N+1)t}{2} \le 1$。代入闭式即得。

**4.**　交换两个有限和：对固定的 $\abs n \le N$，满足 $\abs n \le k \le N$ 的 $k$ 恰有 $N + 1 - \abs n$ 个，所以
$$\sum_{k=0}^N D_k = \sum_{k=0}^N\ \sum_{\abs n \le k} e_n = \sum_{\abs n \le N}(N + 1 - \abs n)\,e_n.$$
除以 $N + 1$ 得 $K_N$ 的展开。同样地，$\sum_{k=0}^N S_k f = \sum_{\abs n \le N}(N + 1 - \abs n)\,c_n(f)\,e_n$，除以 $N + 1$ 得 $\sigma_N f$ 的展开，它属于 $\mathcal{T}_N$。积分表示：对 $k = 0, \dots, N$ 把 {@c5-dirichlet-noyau} 第 4 条的等式相加，除以 $N + 1$，用积分的线性。
:::

::: fr
▷ Méthode : pour 1, on utilise la forme close de $D_k$ et une formule de trigonométrie qui fait apparaître une somme télescopique ; 2 et 4 s'obtiennent en moyennant les propriétés de $D_k$ ; 3 vient de la croissance de $\sin$ sur $[0, \frac\pi2]$.

**1.**　Soit $t \notin 2\pi\Z$. D'après le point 2 de {@fr:c5-dirichlet-noyau} et la formule $\sin A\sin B = \frac12\big(\cos(A - B) - \cos(A + B)\big)$ (avec $A = \frac t2$, $B = (k + \frac12)t$, $A - B = -kt$, $A + B = (k+1)t$),
$$\begin{aligned}\sin^2\tfrac t2\sum_{k=0}^N D_k(t) &= \sum_{k=0}^N\sin\tfrac t2\,\sin\big((k + \tfrac12)t\big) = \frac12\sum_{k=0}^N\big(\cos kt - \cos(k+1)t\big)\\
&= \frac{1 - \cos(N+1)t}{2} = \sin^2\frac{(N+1)t}{2}\end{aligned}$$
(somme télescopique). On divise par $(N+1)\sin^2\frac t2 > 0$. En $t = 0$, $K_N(0) = \frac{1}{N+1}\sum_{k=0}^N(2k + 1) = \frac{(N+1)^2}{N+1} = N + 1$. La forme close est un carré divisé par un réel positif et $K_N(0) > 0$ ; par périodicité, $K_N \ge 0$ partout.

**2.**　D'après le point 3 de {@fr:c5-dirichlet-noyau}, $\frac{1}{2\pi}\int K_N = \frac{1}{N+1}\sum_{k=0}^N\frac{1}{2\pi}\int D_k = \frac{N+1}{N+1} = 1$.

**3.**　Si $\delta \le \abs t \le \pi$, alors $\frac{\abs t}{2} \in \big[\frac\delta2, \frac\pi2\big]$. Comme $\sin$ est croissante sur $[0, \frac\pi2]$, $\sin^2\frac t2 = \sin^2\frac{\abs t}{2} \ge \sin^2\frac\delta2 > 0$ ; le numérateur $\sin^2\frac{(N+1)t}{2}$ est $\le 1$. On conclut avec la forme close.

**4.**　On échange les deux sommes finies : pour $\abs n \le N$ fixé, il y a exactement $N + 1 - \abs n$ entiers $k$ tels que $\abs n \le k \le N$, donc
$$\sum_{k=0}^N D_k = \sum_{k=0}^N\ \sum_{\abs n \le k} e_n = \sum_{\abs n \le N}(N + 1 - \abs n)\,e_n.$$
En divisant par $N + 1$, on obtient le développement de $K_N$. De même, $\sum_{k=0}^N S_k f = \sum_{\abs n \le N}(N + 1 - \abs n)\,c_n(f)\,e_n$, d'où celui de $\sigma_N f$, qui appartient à $\mathcal{T}_N$. Représentation intégrale : on additionne les égalités du point 4 de {@fr:c5-dirichlet-noyau} pour $k = 0, \dots, N$, on divise par $N + 1$ et on utilise la linéarité de l'intégrale.
:::

::: thm id=fejer zh="Fejér 定理" en="Fejér's theorem" fr="Théorème de Fejér" ru="Теорема Фейера" lvl=1
若 $f \in \Cc_{2\pi}$，则 $\sigma_N f$ 在 $\R$ 上一致收敛到 $f$：
$$\norm{\sigma_N f - f}_\infty \xrightarrow[N \to \infty]{} 0.$$
:::

::: fr
Si $f \in \Cc_{2\pi}$, alors $\sigma_N f$ converge uniformément vers $f$ sur $\R$ :
$$\norm{\sigma_N f - f}_\infty \xrightarrow[N \to \infty]{} 0.$$
:::

::: proof
▷ 思路：$K_N$ 非负、平均值为 $1$、质量集中在 $0$ 附近，所以 $\sigma_N f(x)$ 是 $f$ 在 $x$ 附近取值的加权平均。把积分分成「$t$ 靠近 $0$」（用 $f$ 的一致连续性）和「$t$ 远离 $0$」（用 $K_N$ 很小）两部分。

▷ 要证：对任意 $\eps > 0$，存在 $N_0$，使对一切 $N \ge N_0$ 和一切 $x \in \R$，$\abs{\sigma_N f(x) - f(x)} \le 2\eps$。关键是 $N_0$ 不依赖于 $x$。

**第 1 步（翻译假设）**　记 $M = \norm f_\infty$。设 $\eps > 0$。由 {@c5-unif-cont}，存在 $\delta \in\, ]0, \pi]$（必要时把 $\delta$ 换成 $\min(\delta, \pi)$），使对一切 $x \in \R$ 和 $\abs t \le \delta$，$\abs{f(x - t) - f(x)} \le \eps$。

**第 2 步（改写）**　由 {@fejer-noyau} 第 2 条，$f(x) = \frac{1}{2\pi}\int_{-\pi}^{\pi} f(x)\,K_N(t)\,\dd t$；再由第 4 条，
$$\sigma_N f(x) - f(x) = \frac{1}{2\pi}\int_{-\pi}^{\pi}\big(f(x - t) - f(x)\big)K_N(t)\,\dd t.$$

**第 3 步（拆分与估计）**　由三角不等式和 $K_N \ge 0$（第 1 条），
$$\begin{aligned}
\abs{\sigma_N f(x) - f(x)} &\le \frac{1}{2\pi}\int_{\abs t \le \delta}\abs{f(x - t) - f(x)}\,K_N(t)\,\dd t\\
&\quad + \frac{1}{2\pi}\int_{\delta \le \abs t \le \pi}\abs{f(x - t) - f(x)}\,K_N(t)\,\dd t\\
&\le \eps\cdot\frac{1}{2\pi}\int_{-\pi}^{\pi}K_N + \frac{2M}{(N+1)\sin^2(\delta/2)}\cdot\frac{\pi - \delta}{\pi} && \text{（第 1 步；第 3 条）}\\
&\le \eps + \frac{2M}{(N+1)\sin^2(\delta/2)} && \text{（第 2 条）}.
\end{aligned}$$
在第一个积分里，把积分范围从 $\abs t \le \delta$ 扩大到 $[-\pi, \pi]$ 只会增大积分，因为 $K_N \ge 0$。

**第 4 步（选 $N_0$）**　令 $N_0 = E\Big(\dfrac{2M}{\eps\sin^2(\delta/2)}\Big)$。对 $N \ge N_0$，$N + 1 > \dfrac{2M}{\eps\sin^2(\delta/2)}$，所以第二项 $\le \eps$。

$N_0$ 只依赖于 $\eps$、$\delta$、$M$，不依赖于 $x$。因此对一切 $N \ge N_0$，$\norm{\sigma_N f - f}_\infty \le 2\eps$。这就证明了 $\sigma_N f$ 一致收敛到 $f$。
:::

::: fr
▷ Méthode : $K_N$ est positif, de moyenne $1$ et concentré près de $0$ ; $\sigma_N f(x)$ est donc une moyenne pondérée des valeurs de $f$ près de $x$. On coupe l'intégrale en deux : $t$ proche de $0$ (uniforme continuité de $f$) et $t$ loin de $0$ ($K_N$ petit).

▷ On veut montrer : pour tout $\eps > 0$, il existe $N_0$ tel que pour tout $N \ge N_0$ et tout $x \in \R$, $\abs{\sigma_N f(x) - f(x)} \le 2\eps$. L'essentiel est que $N_0$ ne dépende pas de $x$.

**Étape 1 (on traduit l'hypothèse)**　Notons $M = \norm f_\infty$. Soit $\eps > 0$. D'après {@fr:c5-unif-cont}, il existe $\delta \in\, ]0, \pi]$ (quitte à remplacer $\delta$ par $\min(\delta, \pi)$) tel que pour tout $x \in \R$ et tout $\abs t \le \delta$, $\abs{f(x - t) - f(x)} \le \eps$.

**Étape 2 (réécriture)**　D'après le point 2 de {@fr:fejer-noyau}, $f(x) = \frac{1}{2\pi}\int_{-\pi}^{\pi} f(x)\,K_N(t)\,\dd t$ ; avec le point 4,
$$\sigma_N f(x) - f(x) = \frac{1}{2\pi}\int_{-\pi}^{\pi}\big(f(x - t) - f(x)\big)K_N(t)\,\dd t.$$

**Étape 3 (découpage et majoration)**　Par l'inégalité triangulaire et $K_N \ge 0$ (point 1),
$$\begin{aligned}
\abs{\sigma_N f(x) - f(x)} &\le \frac{1}{2\pi}\int_{\abs t \le \delta}\abs{f(x - t) - f(x)}\,K_N(t)\,\dd t\\
&\quad + \frac{1}{2\pi}\int_{\delta \le \abs t \le \pi}\abs{f(x - t) - f(x)}\,K_N(t)\,\dd t\\
&\le \eps\cdot\frac{1}{2\pi}\int_{-\pi}^{\pi}K_N + \frac{2M}{(N+1)\sin^2(\delta/2)}\cdot\frac{\pi - \delta}{\pi} && \text{(étape 1 ; point 3)}\\
&\le \eps + \frac{2M}{(N+1)\sin^2(\delta/2)} && \text{(point 2)}.
\end{aligned}$$
Dans la première intégrale, agrandir le domaine de $\abs t \le \delta$ à $[-\pi, \pi]$ ne peut qu'augmenter l'intégrale, puisque $K_N \ge 0$.

**Étape 4 (choix de $N_0$)**　Posons $N_0 = E\Big(\dfrac{2M}{\eps\sin^2(\delta/2)}\Big)$. Pour $N \ge N_0$, $N + 1 > \dfrac{2M}{\eps\sin^2(\delta/2)}$, donc le second terme est $\le \eps$.

$N_0$ ne dépend que de $\eps$, $\delta$ et $M$, pas de $x$. Ainsi, pour tout $N \ge N_0$, $\norm{\sigma_N f - f}_\infty \le 2\eps$ : $\sigma_N f$ converge uniformément vers $f$.
:::

::: rem
1. **连续性不能去掉。** 方波 $f_1$ 的 $\sigma_N f_1$ 是三角多项式，连续；若它一致收敛到 $f_1$，由 {@cont-limite-unif}，$f_1$ 将是连续的，矛盾。所以对不连续的 $f$，收敛不可能一致。（逐点收敛仍然成立，见下面的「想一想」。）
2. **不能把 $\sigma_N$ 换成 $S_N$。** Fejér 定理断言的是平均值收敛；部分和 $S_N f$ 本身对连续函数可以在某点发散（{@du-bois-reymond}）。这与数列的情形一样：$u_n = (-1)^n$ 不收敛，但它的 Cesàro 平均 $\frac{1}{n+1}\sum_{k \le n}u_k \to 0$。
:::

::: cor id=trig-dense zh="三角多项式的稠密性" en="Density of trigonometric polynomials" fr="Densité des polynômes trigonométriques" ru="Плотность тригонометрических многочленов" lvl=1
1. 三角多项式在 $(\Cc_{2\pi}, \norm{\cdot}_\infty)$ 中稠密：对 $f \in \Cc_{2\pi}$ 和 $\eps > 0$，存在三角多项式 $P$ 使 $\norm{f - P}_\infty \le \eps$，从而 $\norm{f - P}_2 \le \eps$。
2. （Weierstrass 定理 {@weierstrass} 的另一个证明）$[a, b]$ 上的每个连续函数都是多项式的一致极限。
:::

::: fr
1. Les polynômes trigonométriques sont denses dans $(\Cc_{2\pi}, \norm{\cdot}_\infty)$ : pour $f \in \Cc_{2\pi}$ et $\eps > 0$, il existe un polynôme trigonométrique $P$ tel que $\norm{f - P}_\infty \le \eps$, et donc $\norm{f - P}_2 \le \eps$.
2. (Autre preuve du théorème de Weierstrass {@fr:weierstrass}) Toute fonction continue sur $[a, b]$ est limite uniforme de fonctions polynomiales.
:::

::: proof
▷ 思路：1 中取 $P = \sigma_N f$。2 中先把 $[a, b]$ 上的函数变成一个 $2\pi$ 周期的**连续**函数（偶延拓保证两端值相等），用 1 得到三角多项式，再把三角多项式展开为幂级数并截断。

**1.**　由 {@fejer-noyau} 第 4 条，$\sigma_N f \in \mathcal{T}_N$ 是三角多项式。由 Fejér 定理 {@fejer}，存在 $N$ 使 $\norm{f - \sigma_N f}_\infty \le \eps$；取 $P = \sigma_N f$。由 {@orthonormal} 之后的注，$\norm{f - P}_2 \le \norm{f - P}_\infty \le \eps$。

**2.**　设 $f \in \Cc([a, b], \C)$，$a < b$，$\eps > 0$。

**第 1 步（化为周期连续函数）**　令 $F(s) = f\big(a + \frac{(b - a)s}{\pi}\big)$，$s \in [0, \pi]$；再令 $G(s) = F(\abs s)$，$s \in [-\pi, \pi]$。$G$ 在 $[-\pi, \pi]$ 上连续，且 $G(-\pi) = F(\pi) = G(\pi)$，所以它的 $2\pi$ 周期延拓（仍记为 $G$）属于 $\Cc_{2\pi}$。

**第 2 步（三角多项式逼近）**　由 1，存在 $P = \sum_{\abs n \le M}\alpha_n e_n$ 使 $\norm{G - P}_\infty \le \eps$。

**第 3 步（截断幂级数）**　对每个 $n$，$\e^{\ii ns} = \sum_{k \ge 0}\frac{(\ii ns)^k}{k!}$，且对 $s \in [-\pi, \pi]$，$\Big|\frac{(\ii ns)^k}{k!}\Big| \le \frac{(\abs n\pi)^k}{k!}$，后者的级数收敛（和为 $\e^{\abs n\pi}$）。由 {@normale-unif}，这个级数在 $[-\pi, \pi]$ 上一致收敛。$P$ 是有限个这样的级数的线性组合，所以多项式
$$Q_K(s) = \sum_{\abs n \le M}\alpha_n\sum_{k=0}^K\frac{(\ii ns)^k}{k!}$$
在 $[-\pi, \pi]$ 上一致收敛到 $P$。取 $K$ 使 $\sup_{[-\pi, \pi]}\abs{P - Q_K} \le \eps$。

**第 4 步（换回 $[a, b]$）**　对 $s \in [0, \pi]$，$\abs{F(s) - Q_K(s)} \le \abs{G(s) - P(s)} + \abs{P(s) - Q_K(s)} \le 2\eps$。令 $R(x) = Q_K\big(\frac{\pi(x - a)}{b - a}\big)$，它是 $x$ 的多项式，且对 $x \in [a, b]$，$\abs{f(x) - R(x)} \le 2\eps$。若 $f$ 取实值，用 $\operatorname{Re} R$ 代替 $R$（仍是多项式，且 $\abs{f - \operatorname{Re}R} = \abs{\operatorname{Re}(f - R)} \le \abs{f - R}$）。

$\eps$ 任意，所以 $f$ 是多项式的一致极限。
:::

::: fr
▷ Méthode : pour 1, on prend $P = \sigma_N f$. Pour 2, on transforme d'abord la fonction donnée sur $[a, b]$ en une fonction $2\pi$-périodique **continue** (le prolongement pair assure l'égalité des valeurs aux extrémités), on l'approche par un polynôme trigonométrique grâce à 1, puis on développe ce dernier en série entière et on tronque.

**1.**　D'après le point 4 de {@fr:fejer-noyau}, $\sigma_N f \in \mathcal{T}_N$ est un polynôme trigonométrique. D'après le théorème de Fejér ({@fr:fejer}), il existe $N$ tel que $\norm{f - \sigma_N f}_\infty \le \eps$ ; on prend $P = \sigma_N f$. D'après la remarque suivant {@fr:orthonormal}, $\norm{f - P}_2 \le \norm{f - P}_\infty \le \eps$.

**2.**　Soit $f \in \Cc([a, b], \C)$ avec $a < b$, et $\eps > 0$.

**Étape 1 (fonction périodique continue)**　Posons $F(s) = f\big(a + \frac{(b - a)s}{\pi}\big)$ pour $s \in [0, \pi]$, puis $G(s) = F(\abs s)$ pour $s \in [-\pi, \pi]$. $G$ est continue sur $[-\pi, \pi]$ et $G(-\pi) = F(\pi) = G(\pi)$ ; son prolongement $2\pi$-périodique (encore noté $G$) appartient donc à $\Cc_{2\pi}$.

**Étape 2 (approximation trigonométrique)**　D'après 1, il existe $P = \sum_{\abs n \le M}\alpha_n e_n$ tel que $\norm{G - P}_\infty \le \eps$.

**Étape 3 (troncature des séries entières)**　Pour chaque $n$, $\e^{\ii ns} = \sum_{k \ge 0}\frac{(\ii ns)^k}{k!}$ et, pour $s \in [-\pi, \pi]$, $\Big|\frac{(\ii ns)^k}{k!}\Big| \le \frac{(\abs n\pi)^k}{k!}$, terme général d'une série convergente (de somme $\e^{\abs n\pi}$). D'après {@fr:normale-unif}, la série converge uniformément sur $[-\pi, \pi]$. Comme $P$ est une combinaison linéaire finie de telles séries, les polynômes
$$Q_K(s) = \sum_{\abs n \le M}\alpha_n\sum_{k=0}^K\frac{(\ii ns)^k}{k!}$$
convergent uniformément vers $P$ sur $[-\pi, \pi]$. Choisissons $K$ tel que $\sup_{[-\pi, \pi]}\abs{P - Q_K} \le \eps$.

**Étape 4 (retour à $[a, b]$)**　Pour $s \in [0, \pi]$, $\abs{F(s) - Q_K(s)} \le \abs{G(s) - P(s)} + \abs{P(s) - Q_K(s)} \le 2\eps$. Posons $R(x) = Q_K\big(\frac{\pi(x - a)}{b - a}\big)$ : c'est un polynôme en $x$ et, pour $x \in [a, b]$, $\abs{f(x) - R(x)} \le 2\eps$. Si $f$ est réelle, on remplace $R$ par $\operatorname{Re} R$ (encore polynomiale, et $\abs{f - \operatorname{Re}R} = \abs{\operatorname{Re}(f - R)} \le \abs{f - R}$).

Comme $\eps$ est arbitraire, $f$ est limite uniforme de polynômes.
:::

::: rem
$K_N \ge 0$、积分平均值为 $1$、质量集中在 $0$ 附近（$\delta \le \abs t \le \pi$ 上 $K_N \to 0$ 一致成立）：这三条性质定义了**逼近单位元**（approximate identity，approximation de l'unité）。Fejér 定理的证明只用到这三条；Weierstrass 定理的 Bernstein 证明（{@weierstrass}）本质上是同一个想法，那里的「核」是二项分布的权重 $p_k(x)$。与之对比，Dirichlet 核 $D_N$ 变号，且 Lebesgue 常数 $L_N = \frac{1}{2\pi}\int_{-\pi}^{\pi}\abs{D_N} \sim \frac{4}{\pi^2}\ln N \to \infty$（下界见 {@c5-lebesgue}），这正是部分和 $S_N f$ 可能不收敛的根源。
:::

::: q
在 Fejér 定理的证明中，若把 $K_N$ 换成 $D_N$（即试图证明 $S_N f \to f$ 一致），哪两步会失效？
:::

::: ans
第 3 步的两处都失效。(a) 第一项：$D_N$ 会变号，只能估计为 $\eps\cdot\frac{1}{2\pi}\int_{-\pi}^{\pi}\abs{D_N} = \eps L_N$，而 Lebesgue 常数 $L_N \to \infty$（{@c5-lebesgue}）。(b) 第二项：在 $\delta \le \abs t \le \pi$ 上只有 $\abs{D_N(t)} \le \frac{1}{\sin(\delta/2)}$，它不随 $N$ 趋于 $0$；$D_N$ 在那里只是快速振荡，要利用振荡就得用 Riemann–Lebesgue 引理，而这需要 $f$ 有一定的正则性（Dirichlet 定理 {@dirichlet-fourier}）。
:::

::: q
设 $f \in \mathcal{CM}_{2\pi}$（不必连续），$x \in \R$。证明 $\sigma_N f(x) \to \frac12\big(f(x^+) + f(x^-)\big)$。对方波 $f_1$ 和 $x = 0$，$\sigma_N f_1(0)$ 是多少？
:::

::: ans
记 $\ell = \frac12\big(f(x^+) + f(x^-)\big)$。$K_N$ 是偶函数，$\frac{1}{2\pi}\int_0^\pi K_N = \frac12$，与 {@c5-dirichlet-noyau} 第 4 条的推导一样（把积分在 $0$ 处分开，$[-\pi, 0]$ 上换元 $t \mapsto -t$）得到
$$\sigma_N f(x) - \ell = \frac{1}{2\pi}\int_0^\pi\big(f(x + t) - f(x^+) + f(x - t) - f(x^-)\big)K_N(t)\,\dd t.$$
给定 $\eps > 0$，由单侧极限的定义，存在 $\delta \in\, ]0, \pi]$，使 $0 < t \le \delta$ 时 $\abs{f(x + t) - f(x^+)} \le \eps$ 且 $\abs{f(x - t) - f(x^-)} \le \eps$。像 Fejér 定理第 3、4 步那样拆分，得 $\abs{\sigma_N f(x) - \ell} \le \eps + \frac{2\norm f_\infty}{(N+1)\sin^2(\delta/2)} \le 2\eps$（$N$ 充分大）。

方波：$f_1$ 是奇函数，所以 $c_{-n} = -c_n$，由 {@fejer-noyau} 第 4 条 $\sigma_N f_1$ 是奇函数，$\sigma_N f_1(0) = 0$ 对一切 $N$ 成立，等于 $\frac12(1 + (-1)) = 0$。
:::

## Parseval 恒等式

Bessel 不等式给出 $\sum\abs{c_n}^2 \le \norm f_2^2$，Fejér 定理给出三角多项式的稠密性。两者结合就得到等式：$S_N f$ 在均方意义下收敛到 $f$。对连续函数这是直接的；对分段连续函数，还要先用连续函数在均方意义下逼近它。

::: lem id=c5-approx-l2 zh="用连续函数均方逼近分段连续函数" en="Mean-square approximation by continuous functions" fr="Approximation en moyenne quadratique par des fonctions continues" ru="Приближение в среднем квадратичном непрерывными функциями" lvl=1
设 $f \in \mathcal{CM}_{2\pi}$，$\eps > 0$。则存在 $g \in \Cc_{2\pi}$，使
$$\norm{f - g}_2 \le \eps\qquad\text{且}\qquad \norm{g}_\infty \le \norm{f}_\infty.$$
:::

::: fr
Soit $f \in \mathcal{CM}_{2\pi}$ et $\eps > 0$. Il existe $g \in \Cc_{2\pi}$ telle que
$$\norm{f - g}_2 \le \eps\qquad\text{et}\qquad \norm{g}_\infty \le \norm{f}_\infty.$$
:::

::: proof
▷ 思路：只在每个可能的间断点 $\tau$ 附近一个长为 $2\eta$ 的小区间里修改 $f$，用线段把两侧连起来。被修改的区间总长度与 $\eta$ 成正比，修改量不超过 $2\norm f_\infty$，所以 $\eta$ 足够小时 $\norm{f - g}_2$ 足够小。

**第 1 步（翻译假设，选 $\eta$）**　记 $M = \norm f_\infty$（有限，见 {@c5-cex-non-cpm} 后的注）。若 $M = 0$，取 $g = 0$。设 $M > 0$，取相适应的分割 $-\pi = t_0 < \cdots < t_p = \pi$，令
$$T = \{t_k + 2m\pi : 0 \le k \le p,\ m \in \Z\},\qquad d = \min_{1 \le k \le p}(t_k - t_{k-1}) > 0.$$
$T$ 在平移 $2\pi$ 下不变，$f$ 在 $\R \setminus T$ 上连续，且 $T$ 中相邻两点的距离 $\ge d$。取
$$\eta = \min\Big(\frac d3,\ \frac{\pi\eps^2}{4(p+1)M^2}\Big).$$

**第 2 步（构造 $g$）**　对 $\tau \in T$，记 $J_\tau = [\tau - \eta, \tau + \eta]$；因为 $2\eta < d$，这些区间两两不交，且 $\tau \pm \eta \notin T$。定义 $g$：在每个 $J_\tau$ 上，$g$ 是连接 $\big(\tau - \eta, f(\tau - \eta)\big)$ 与 $\big(\tau + \eta, f(\tau + \eta)\big)$ 的仿射函数；在 $\R \setminus \bigcup_{\tau \in T}J_\tau$ 上，$g = f$。

**第 3 步（$g \in \Cc_{2\pi}$）**　$T + 2\pi = T$ 且 $f$ 是 $2\pi$ 周期的，所以 $g$ 是 $2\pi$ 周期的。设 $\tau < \tau'$ 是 $T$ 中相邻两点。在 $[\tau + \eta, \tau' - \eta] \subset\, ]\tau, \tau'[$ 上 $g = f$，而 $f$ 在 $]\tau, \tau'[$ 上连续；在每个 $J_\tau$ 上 $g$ 是仿射的；在接合点 $\tau \pm \eta$ 两边的定义给出同一个值。所以 $g$ 在 $\R$ 上连续。

**第 4 步（估计）**　在 $J_\tau$ 上，$g(s) = (1 - \theta)f(\tau - \eta) + \theta f(\tau + \eta)$（$\theta \in [0, 1]$），所以 $\abs{g(s)} \le M$；于是 $\norm g_\infty \le M$，且处处 $\abs{f - g} \le 2M$。在 $[-\pi, \pi]$ 中 $f \ne g$ 的点都落在 $J_{t_0}, \dots, J_{t_p}$ 中（$T$ 的其他点到 $[-\pi, \pi]$ 的距离 $> \eta$），这 $p + 1$ 个区间的总长度 $\le 2(p+1)\eta$。所以
$$\norm{f - g}_2^2 = \frac{1}{2\pi}\int_{-\pi}^{\pi}\abs{f - g}^2 \le \frac{1}{2\pi}\cdot 2(p+1)\eta\cdot 4M^2 = \frac{4(p+1)M^2\eta}{\pi} \le \eps^2,$$
最后一步用了 $\eta$ 的选取。这就证明了引理。
:::

::: fr
▷ Méthode : on ne modifie $f$ que sur un petit intervalle de longueur $2\eta$ autour de chaque point de discontinuité possible $\tau$, en reliant les deux côtés par un segment. La longueur totale modifiée est proportionnelle à $\eta$ et la modification est majorée par $2\norm f_\infty$ ; pour $\eta$ assez petit, $\norm{f - g}_2$ est donc petit.

**Étape 1 (on traduit l'hypothèse ; choix de $\eta$)**　Notons $M = \norm f_\infty$ (finie, cf. la remarque suivant {@fr:c5-cex-non-cpm}). Si $M = 0$, on prend $g = 0$. Supposons $M > 0$, soit $-\pi = t_0 < \cdots < t_p = \pi$ une subdivision adaptée, et posons
$$T = \{t_k + 2m\pi : 0 \le k \le p,\ m \in \Z\},\qquad d = \min_{1 \le k \le p}(t_k - t_{k-1}) > 0.$$
$T$ est invariant par translation de $2\pi$, $f$ est continue sur $\R \setminus T$, et deux points consécutifs de $T$ sont distants d'au moins $d$. Posons
$$\eta = \min\Big(\frac d3,\ \frac{\pi\eps^2}{4(p+1)M^2}\Big).$$

**Étape 2 (construction de $g$)**　Pour $\tau \in T$, notons $J_\tau = [\tau - \eta, \tau + \eta]$ ; comme $2\eta < d$, ces intervalles sont deux à deux disjoints et $\tau \pm \eta \notin T$. On définit $g$ ainsi : sur chaque $J_\tau$, $g$ est la fonction affine joignant $\big(\tau - \eta, f(\tau - \eta)\big)$ à $\big(\tau + \eta, f(\tau + \eta)\big)$ ; sur $\R \setminus \bigcup_{\tau \in T}J_\tau$, $g = f$.

**Étape 3 ($g \in \Cc_{2\pi}$)**　Comme $T + 2\pi = T$ et $f$ est $2\pi$-périodique, $g$ est $2\pi$-périodique. Soient $\tau < \tau'$ deux points consécutifs de $T$. Sur $[\tau + \eta, \tau' - \eta] \subset\, ]\tau, \tau'[$, $g = f$, qui est continue sur $]\tau, \tau'[$ ; sur chaque $J_\tau$, $g$ est affine ; aux points de raccord $\tau \pm \eta$, les deux définitions donnent la même valeur. Donc $g$ est continue sur $\R$.

**Étape 4 (majoration)**　Sur $J_\tau$, $g(s) = (1 - \theta)f(\tau - \eta) + \theta f(\tau + \eta)$ avec $\theta \in [0, 1]$, donc $\abs{g(s)} \le M$ ; ainsi $\norm g_\infty \le M$ et $\abs{f - g} \le 2M$ partout. Dans $[-\pi, \pi]$, les points où $f \ne g$ sont contenus dans $J_{t_0}, \dots, J_{t_p}$ (les autres points de $T$ sont à distance $> \eta$ de $[-\pi, \pi]$), de longueur totale $\le 2(p+1)\eta$. Donc
$$\norm{f - g}_2^2 = \frac{1}{2\pi}\int_{-\pi}^{\pi}\abs{f - g}^2 \le \frac{1}{2\pi}\cdot 2(p+1)\eta\cdot 4M^2 = \frac{4(p+1)M^2\eta}{\pi} \le \eps^2,$$
la dernière inégalité venant du choix de $\eta$. Le lemme est démontré.
:::

::: thm id=parseval zh="Parseval 恒等式" en="Parseval's identity" fr="Égalité de Parseval" ru="Равенство Парсеваля" lvl=1
对 $f \in \mathcal{CM}_{2\pi}$：$\norm{f - S_N f}_2 \to 0$（$N \to \infty$），并且
$$\sum_{n \in \Z} \abs{c_n(f)}^2 = \frac{1}{2\pi}\int_{-\pi}^{\pi} \abs{f}^2,\qquad\text{实形式：}\ \frac{\abs{a_0}^2}{4} + \frac12\sum_{n \ge 1}\big(\abs{a_n}^2 + \abs{b_n}^2\big) = \frac{1}{2\pi}\int_{-\pi}^{\pi}\abs{f}^2.$$
:::

::: fr
Pour $f \in \mathcal{CM}_{2\pi}$ : $\norm{f - S_N f}_2 \to 0$ quand $N \to \infty$, et
$$\sum_{n \in \Z} \abs{c_n(f)}^2 = \frac{1}{2\pi}\int_{-\pi}^{\pi} \abs{f}^2,\qquad\text{forme réelle :}\ \frac{\abs{a_0}^2}{4} + \frac12\sum_{n \ge 1}\big(\abs{a_n}^2 + \abs{b_n}^2\big) = \frac{1}{2\pi}\int_{-\pi}^{\pi}\abs{f}^2.$$
:::

::: proof
▷ 思路：由 Bessel 不等式的最佳逼近性质（{@bessel} 第 1 条），只需找到**某个**三角多项式 $P$ 使 $\norm{f - P}_2$ 小。连续函数的 $P$ 由 Fejér 定理提供；分段连续函数先用 {@c5-approx-l2} 换成连续函数。等式本身则是 {@bessel} 第 2 条取极限。

▷ 要证：对任意 $\eps > 0$，存在 $N_0$，使对一切 $N \ge N_0$，$\norm{f - S_N f}_2 \le 3\eps$。

**第 1 步（连续情形）**　设 $g \in \Cc_{2\pi}$，$\eps > 0$。由 {@trig-dense}，存在 $M_\eps \in \N$ 和 $P \in \mathcal{T}_{M_\eps}$，使 $\norm{g - P}_2 \le \eps$。对 $N \ge M_\eps$，$\mathcal{T}_{M_\eps} \subset \mathcal{T}_N$，由 {@bessel} 第 1 条，
$$\norm{g - S_N g}_2 \le \norm{g - P}_2 \le \eps.$$

**第 2 步（$S_N$ 线性且不增大 $\norm\cdot_2$）**　$c_n$ 是线性的，所以 $S_N(f - g) = S_N f - S_N g$。由 {@bessel} 第 3 步的计算和 Bessel 不等式，对 $h \in \mathcal{CM}_{2\pi}$，$\norm{S_N h}_2^2 = \sum_{\abs n \le N}\abs{c_n(h)}^2 \le \norm h_2^2$。

**第 3 步（一般情形）**　设 $f \in \mathcal{CM}_{2\pi}$，$\eps > 0$。由 {@c5-approx-l2}，取 $g \in \Cc_{2\pi}$ 使 $\norm{f - g}_2 \le \eps$；由第 1 步，取 $N_0$ 使对 $N \ge N_0$，$\norm{g - S_N g}_2 \le \eps$。则对 $N \ge N_0$，
$$\begin{aligned}
\norm{f - S_N f}_2 &\le \norm{f - g}_2 + \norm{g - S_N g}_2 + \norm{S_N g - S_N f}_2 && \text{（三角不等式）}\\
&\le \eps + \eps + \norm{f - g}_2 \le 3\eps && \text{（第 2 步）}.
\end{aligned}$$
所以 $\norm{f - S_N f}_2 \to 0$。

**第 4 步（等式）**　由 {@bessel} 第 2 条，$\sum_{\abs n \le N}\abs{c_n(f)}^2 = \norm f_2^2 - \norm{f - S_N f}_2^2$。令 $N \to \infty$，由第 3 步，右边趋于 $\norm f_2^2$。

**第 5 步（实形式）**　对 $n \ge 1$，由 {@c5-forme-reelle} 和平行四边形恒等式 $\abs{u - \ii v}^2 + \abs{u + \ii v}^2 = 2\abs u^2 + 2\abs v^2$（$u, v \in \C$），
$$\abs{c_n}^2 + \abs{c_{-n}}^2 = \frac14\Big(\abs{a_n - \ii b_n}^2 + \abs{a_n + \ii b_n}^2\Big) = \frac12\big(\abs{a_n}^2 + \abs{b_n}^2\big),$$
且 $\abs{c_0}^2 = \frac{\abs{a_0}^2}{4}$。把 $\sum_{\abs n \le N}$ 按 $n$ 与 $-n$ 配对，令 $N \to \infty$ 即得实形式。
:::

::: fr
▷ Méthode : grâce à la propriété de meilleure approximation ({@fr:bessel}, point 1), il suffit de trouver **un** polynôme trigonométrique $P$ tel que $\norm{f - P}_2$ soit petit. Pour $f$ continue, le théorème de Fejér fournit $P$ ; pour $f$ continue par morceaux, on se ramène au cas continu par {@fr:c5-approx-l2}. L'égalité elle-même s'obtient par passage à la limite dans le point 2 de {@fr:bessel}.

▷ On veut montrer : pour tout $\eps > 0$, il existe $N_0$ tel que pour tout $N \ge N_0$, $\norm{f - S_N f}_2 \le 3\eps$.

**Étape 1 (cas continu)**　Soit $g \in \Cc_{2\pi}$ et $\eps > 0$. D'après {@fr:trig-dense}, il existe $M_\eps \in \N$ et $P \in \mathcal{T}_{M_\eps}$ tels que $\norm{g - P}_2 \le \eps$. Pour $N \ge M_\eps$, $\mathcal{T}_{M_\eps} \subset \mathcal{T}_N$, donc d'après le point 1 de {@fr:bessel},
$$\norm{g - S_N g}_2 \le \norm{g - P}_2 \le \eps.$$

**Étape 2 ($S_N$ est linéaire et ne fait pas croître $\norm\cdot_2$)**　Les $c_n$ sont linéaires, donc $S_N(f - g) = S_N f - S_N g$. D'après le calcul de l'étape 3 de la preuve de {@fr:bessel} et l'inégalité de Bessel, pour $h \in \mathcal{CM}_{2\pi}$, $\norm{S_N h}_2^2 = \sum_{\abs n \le N}\abs{c_n(h)}^2 \le \norm h_2^2$.

**Étape 3 (cas général)**　Soit $f \in \mathcal{CM}_{2\pi}$ et $\eps > 0$. D'après {@fr:c5-approx-l2}, il existe $g \in \Cc_{2\pi}$ avec $\norm{f - g}_2 \le \eps$ ; d'après l'étape 1, il existe $N_0$ tel que $\norm{g - S_N g}_2 \le \eps$ pour $N \ge N_0$. Alors, pour $N \ge N_0$,
$$\begin{aligned}
\norm{f - S_N f}_2 &\le \norm{f - g}_2 + \norm{g - S_N g}_2 + \norm{S_N g - S_N f}_2 && \text{(inégalité triangulaire)}\\
&\le \eps + \eps + \norm{f - g}_2 \le 3\eps && \text{(étape 2)}.
\end{aligned}$$
Ainsi $\norm{f - S_N f}_2 \to 0$.

**Étape 4 (égalité)**　D'après le point 2 de {@fr:bessel}, $\sum_{\abs n \le N}\abs{c_n(f)}^2 = \norm f_2^2 - \norm{f - S_N f}_2^2$. Quand $N \to \infty$, le membre de droite tend vers $\norm f_2^2$ d'après l'étape 3.

**Étape 5 (forme réelle)**　Pour $n \ge 1$, d'après {@fr:c5-forme-reelle} et l'identité du parallélogramme $\abs{u - \ii v}^2 + \abs{u + \ii v}^2 = 2\abs u^2 + 2\abs v^2$ ($u, v \in \C$),
$$\abs{c_n}^2 + \abs{c_{-n}}^2 = \frac14\Big(\abs{a_n - \ii b_n}^2 + \abs{a_n + \ii b_n}^2\Big) = \frac12\big(\abs{a_n}^2 + \abs{b_n}^2\big),$$
et $\abs{c_0}^2 = \frac{\abs{a_0}^2}{4}$. On regroupe $n$ et $-n$ dans $\sum_{\abs n \le N}$ et on fait tendre $N$ vers $+\infty$.
:::

::: rem
1. **完备性。** Parseval 恒等式说明 Bessel 不等式对三角系总取等号，即 $(e_n)_{n \in \Z}$ 是**完备的**（totale）正交规范族：它张成的子空间在 $(\mathcal{CM}_{2\pi}, \norm\cdot_2)$ 中稠密。对比 {@bessel} 后的注：只取偶数频率时等号不成立。
2. **均方收敛不说明任何一点的情况。** 修改 $f$ 在一点的值不改变任何 $c_n(f)$，从而不改变 $S_N f$；所以 $\norm{f - S_N f}_2 \to 0$ 不可能推出 $S_N f(x) \to f(x)$。例：把方波在 $0$ 处的值改为 $5$，$S_N f(0)$ 仍恒为 $0$。逐点收敛需要另外的假设（Dirichlet 定理 {@dirichlet-fourier}）。
3. **记号陷阱。** 实形式中是 $\frac{\abs{a_0}^2}{4}$ 而不是 $\frac{\abs{a_0}^2}{2}$，因为常数项是 $\frac{a_0}{2}$。用 Parseval 求和时这是最常见的错误。
:::

::: cor id=unicite-fourier zh="Fourier 系数的唯一性" en="Uniqueness of Fourier coefficients" fr="Injectivité des coefficients de Fourier" ru="Единственность коэффициентов Фурье" lvl=1
若两个连续的 $2\pi$ 周期函数有相同的 Fourier 系数，则它们相等。
:::

::: fr
Si deux fonctions continues $2\pi$-périodiques ont les mêmes coefficients de Fourier, alors elles sont égales.
:::

::: proof
▷ 思路：差 $h = f - g$ 的系数全为 $0$，Parseval 给出 $\norm h_2 = 0$；在连续函数空间上 $\ps{\cdot,\cdot}$ 是内积（定），所以 $h = 0$。

**第 1 步**　设 $f, g \in \Cc_{2\pi}$，$c_n(f) = c_n(g)$ 对一切 $n \in \Z$ 成立。令 $h = f - g \in \Cc_{2\pi}$。由 $c_n$ 的线性，$c_n(h) = 0$ 对一切 $n$ 成立。

**第 2 步**　由 Parseval 恒等式 {@parseval}，$\norm h_2^2 = \sum_{n \in \Z}\abs{c_n(h)}^2 = 0$。

**第 3 步**　由 {@orthonormal} 第 1 条，$\ps{\cdot, \cdot}$ 在 $\Cc_{2\pi}$ 上是内积，所以 $\norm h_2 = 0$ 推出 $h = 0$，即 $f = g$。
:::

::: fr
▷ Méthode : les coefficients de $h = f - g$ sont tous nuls ; l'égalité de Parseval donne $\norm h_2 = 0$ ; sur l'espace des fonctions continues, $\ps{\cdot,\cdot}$ est un produit scalaire (défini), donc $h = 0$.

**Étape 1**　Soient $f, g \in \Cc_{2\pi}$ avec $c_n(f) = c_n(g)$ pour tout $n \in \Z$. Posons $h = f - g \in \Cc_{2\pi}$. Par linéarité de $c_n$, $c_n(h) = 0$ pour tout $n$.

**Étape 2**　D'après l'égalité de Parseval ({@fr:parseval}), $\norm h_2^2 = \sum_{n \in \Z}\abs{c_n(h)}^2 = 0$.

**Étape 3**　D'après le point 1 de {@fr:orthonormal}, $\ps{\cdot, \cdot}$ est un produit scalaire sur $\Cc_{2\pi}$ ; donc $\norm h_2 = 0$ entraîne $h = 0$, c'est-à-dire $f = g$.
:::

::: rem
**分段连续的情形。** 若 $f, g \in \mathcal{CM}_{2\pi}$ 有相同的系数，同样的论证给出 $\norm{f - g}_2 = 0$；由 {@orthonormal} 证明第 1 步的论证，$f = g$ 在 $f - g$ 的每个连续点处成立，即在每个周期中除有限个点外 $f = g$。不能再多说：方波 $f_1$ 与把 $f_1(0)$ 改成 $5$ 的函数有完全相同的系数。
:::

::: cor id=c5-parseval-polarise zh="Parseval 恒等式的双线性形式" en="Parseval's identity (polarized form)" fr="Égalité de Parseval (forme polarisée)" ru="Обобщённое равенство Парсеваля" lvl=1
对 $f, g \in \mathcal{CM}_{2\pi}$，级数 $\sum_{n \in \Z} c_n(f)\,\overline{c_n(g)}$ 绝对收敛，且
$$\sum_{n \in \Z} c_n(f)\,\overline{c_n(g)} = \ps{f, g} = \frac{1}{2\pi}\int_{-\pi}^{\pi} f(t)\,\overline{g(t)}\,\dd t.$$
:::

::: fr
Pour $f, g \in \mathcal{CM}_{2\pi}$, la série $\sum_{n \in \Z} c_n(f)\,\overline{c_n(g)}$ converge absolument et
$$\sum_{n \in \Z} c_n(f)\,\overline{c_n(g)} = \ps{f, g} = \frac{1}{2\pi}\int_{-\pi}^{\pi} f(t)\,\overline{g(t)}\,\dd t.$$
:::

::: proof
▷ 思路：$\ps{S_N f, S_N g}$ 由正交规范性等于部分和 $\sum_{\abs n \le N}c_n(f)\overline{c_n(g)}$；再用 Cauchy–Schwarz 不等式说明 $\ps{S_N f, S_N g} \to \ps{f, g}$。

**第 1 步（绝对收敛）**　由 $\abs{uv} \le \frac12(\abs u^2 + \abs v^2)$，$\abs{c_n(f)\overline{c_n(g)}} \le \frac12\big(\abs{c_n(f)}^2 + \abs{c_n(g)}^2\big)$，右边可和（{@bessel}）。

**第 2 步（部分和）**　与 {@bessel} 证明的第 3 步相同，由正交规范性，$\ps{S_N f, S_N g} = \sum_{\abs n \le N} c_n(f)\,\overline{c_n(g)}$。

**第 3 步（取极限）**　由三角不等式和 Cauchy–Schwarz 不等式（{@orthonormal} 之后的注），
$$\begin{aligned}
\abs{\ps{f, g} - \ps{S_N f, S_N g}} &\le \abs{\ps{f - S_N f, g}} + \abs{\ps{S_N f, g - S_N g}}\\
&\le \norm{f - S_N f}_2\norm g_2 + \norm{S_N f}_2\norm{g - S_N g}_2\\
&\le \big(\norm{f - S_N f}_2 + \norm{g - S_N g}_2\big)\max(\norm f_2, \norm g_2),
\end{aligned}$$
其中用了 $\norm{S_N f}_2 \le \norm f_2$（{@parseval} 证明第 2 步）。由 Parseval 恒等式，右边趋于 $0$。结合第 2 步即得结论。
:::

::: fr
▷ Méthode : par orthonormalité, $\ps{S_N f, S_N g}$ est la somme partielle $\sum_{\abs n \le N}c_n(f)\overline{c_n(g)}$ ; on montre ensuite $\ps{S_N f, S_N g} \to \ps{f, g}$ grâce à l'inégalité de Cauchy–Schwarz.

**Étape 1 (convergence absolue)**　Comme $\abs{uv} \le \frac12(\abs u^2 + \abs v^2)$, on a $\abs{c_n(f)\overline{c_n(g)}} \le \frac12\big(\abs{c_n(f)}^2 + \abs{c_n(g)}^2\big)$, terme général sommable ({@fr:bessel}).

**Étape 2 (sommes partielles)**　Comme à l'étape 3 de la preuve de {@fr:bessel}, par orthonormalité, $\ps{S_N f, S_N g} = \sum_{\abs n \le N} c_n(f)\,\overline{c_n(g)}$.

**Étape 3 (passage à la limite)**　Par l'inégalité triangulaire et l'inégalité de Cauchy–Schwarz (remarque suivant {@fr:orthonormal}),
$$\begin{aligned}
\abs{\ps{f, g} - \ps{S_N f, S_N g}} &\le \abs{\ps{f - S_N f, g}} + \abs{\ps{S_N f, g - S_N g}}\\
&\le \norm{f - S_N f}_2\norm g_2 + \norm{S_N f}_2\norm{g - S_N g}_2\\
&\le \big(\norm{f - S_N f}_2 + \norm{g - S_N g}_2\big)\max(\norm f_2, \norm g_2),
\end{aligned}$$
où l'on a utilisé $\norm{S_N f}_2 \le \norm f_2$ (étape 2 de la preuve de {@fr:parseval}). D'après l'égalité de Parseval, le membre de droite tend vers $0$. Avec l'étape 2, on conclut.
:::

::: cex id=c5-cex-riesz-fischer lvl=1
**Bessel 的逆命题在 $\mathcal{CM}_{2\pi}$ 中不成立**：平方可和的序列不一定是某个分段连续函数的 Fourier 系数。令 $\gamma_n = \frac1n$（$n \ge 1$），$\gamma_n = 0$（$n \le 0$），则 $\sum\abs{\gamma_n}^2 = \zeta(2) < \infty$。反设存在 $f \in \mathcal{CM}_{2\pi}$ 使 $c_n(f) = \gamma_n$ 对一切 $n$ 成立。

1. 由 {@fejer-noyau} 第 4 条，
$$\sigma_N f(0) = \sum_{n=1}^N\Big(1 - \frac{n}{N+1}\Big)\frac1n = \sum_{n=1}^N\frac1n - \frac{N}{N+1} \xrightarrow[N \to \infty]{} +\infty.$$
2. 另一方面，由积分表示与 $K_N \ge 0$、$\frac{1}{2\pi}\int K_N = 1$，
$$\abs{\sigma_N f(0)} \le \frac{1}{2\pi}\int_{-\pi}^{\pi}\abs{f(-t)}\,K_N(t)\,\dd t \le \norm f_\infty,$$
而分段连续函数有界。

两者矛盾。（Lebesgue 积分论中的 **Riesz–Fischer 定理**说：每个平方可和序列都是某个 $L^2$ 函数的系数；这里的函数是 $-\ln\abs{1 - \e^{\ii x}} + \ii\,\frac{\pi - x}{2}$（$0 < x < 2\pi$），它在 $0$ 附近无界。）
:::

::: q
对方波 $f_1$ 用 Parseval 恒等式，能得到哪个级数的和？
:::

::: ans
$\norm{f_1}_2^2 = \frac{1}{2\pi}\int_{-\pi}^{\pi}1\,\dd t = 1$。由 {@c5-ex-creneau}，$\abs{c_n(f_1)}^2 = \frac{4}{\pi^2 n^2}$（$n$ 奇），否则为 $0$。所以
$$1 = 2\sum_{n \ge 1,\ n\ \text{奇}}\frac{4}{\pi^2 n^2}\quad\Longrightarrow\quad\sum_{k \ge 0}\frac{1}{(2k+1)^2} = \frac{\pi^2}{8}.$$
再由 $\zeta(2) = \sum_{\text{奇}} + \sum_{\text{偶}} = \frac{\pi^2}{8} + \frac{\zeta(2)}{4}$，得 $\zeta(2) = \frac{\pi^2}{6}$。
:::

## 逐点收敛：Dirichlet 定理

均方收敛不说明任何一点处的情况（Parseval 后的注）。要在每一点 $x$ 处得到 $S_N f(x)$ 的收敛，需要 $f$ 在 $x$ 附近有一定的正则性。证明的关键是把 $S_N f(x) - \ell$ 写成 Riemann–Lebesgue 引理能处理的形式 $\int_0^\pi g(t)\sin\big((N + \frac12)t\big)\,\dd t$，而保证 $g$ 分段连续的正是分段 $\Cc^1$ 的假设。

::: lem id=c5-taux-lateral zh="分段 $\Cc^1$ 函数的单侧差商" en="One-sided difference quotients of piecewise $C^1$ functions" fr="Taux d'accroissement à droite et à gauche" ru="Односторонние разностные отношения кусочно-гладкой функции" lvl=1
设 $f \in \mathcal{CM}_{2\pi}$ 分段 $\Cc^1$，$x \in \R$。则 $f(x^+)$、$f(x^-)$ 存在，且下面两个极限存在且有限：
$$\lim_{t \to 0^+}\frac{f(x + t) - f(x^+)}{t},\qquad \lim_{t \to 0^+}\frac{f(x - t) - f(x^-)}{t}.$$
:::

::: fr
Soit $f \in \mathcal{CM}_{2\pi}$ de classe $\Cc^1$ par morceaux et $x \in \R$. Alors $f(x^+)$ et $f(x^-)$ existent, et les deux limites suivantes existent et sont finies :
$$\lim_{t \to 0^+}\frac{f(x + t) - f(x^+)}{t},\qquad \lim_{t \to 0^+}\frac{f(x - t) - f(x^-)}{t}.$$
:::

::: proof
▷ 思路：在 $x$ 的右侧（左侧）足够近的地方，$f$ 与某个闭区间上的 $\Cc^1$ 函数 $\varphi_k$ 重合，差商的极限就是 $\varphi_k$ 在 $x$ 处的单侧导数。

**第 1 步（翻译假设）**　取分割 $-\pi = t_0 < \cdots < t_p = \pi$ 和 $\Cc^1$ 函数 $\varphi_k : [t_{k-1}, t_k] \to \C$，使 $f = \varphi_k$ 在 $]t_{k-1}, t_k[$ 上。两个表达式在 $x \mapsto x + 2\pi$ 下不变，所以讨论右侧时可设 $x \in [-\pi, \pi[$，讨论左侧时可设 $x \in\, ]-\pi, \pi]$。

**第 2 步（右侧）**　设 $x \in [-\pi, \pi[$，取 $k$ 使 $x \in [t_{k-1}, t_k[$。对 $0 < t < t_k - x$，有 $x + t \in\, ]t_{k-1}, t_k[$，所以 $f(x + t) = \varphi_k(x + t)$。令 $t \to 0^+$，由 $\varphi_k$ 的连续性，$f(x^+) = \varphi_k(x)$。于是
$$\frac{f(x + t) - f(x^+)}{t} = \frac{\varphi_k(x + t) - \varphi_k(x)}{t} \xrightarrow[t \to 0^{+}]{} \varphi_k'(x).$$

**第 3 步（左侧）**　设 $x \in\, ]-\pi, \pi]$，取 $k$ 使 $x \in\, ]t_{k-1}, t_k]$。对 $0 < t < x - t_{k-1}$，$f(x - t) = \varphi_k(x - t)$，$f(x^-) = \varphi_k(x)$，于是
$$\frac{f(x - t) - f(x^-)}{t} = -\frac{\varphi_k(x - t) - \varphi_k(x)}{-t} \xrightarrow[t \to 0^{+}]{} -\varphi_k'(x).$$

两个极限都存在且有限，引理得证。
:::

::: fr
▷ Méthode : à droite (resp. à gauche) de $x$ et assez près de $x$, $f$ coïncide avec une fonction $\varphi_k$ de classe $\Cc^1$ sur un segment ; la limite du taux d'accroissement est la dérivée de $\varphi_k$ en $x$.

**Étape 1 (on traduit l'hypothèse)**　Soit $-\pi = t_0 < \cdots < t_p = \pi$ une subdivision et $\varphi_k : [t_{k-1}, t_k] \to \C$ de classe $\Cc^1$ avec $f = \varphi_k$ sur $]t_{k-1}, t_k[$. Les deux expressions sont invariantes par $x \mapsto x + 2\pi$ ; on peut donc supposer $x \in [-\pi, \pi[$ pour la limite à droite et $x \in\, ]-\pi, \pi]$ pour la limite à gauche.

**Étape 2 (à droite)**　Soit $x \in [-\pi, \pi[$ et $k$ tel que $x \in [t_{k-1}, t_k[$. Pour $0 < t < t_k - x$, on a $x + t \in\, ]t_{k-1}, t_k[$, donc $f(x + t) = \varphi_k(x + t)$. En faisant $t \to 0^+$, par continuité de $\varphi_k$, $f(x^+) = \varphi_k(x)$. Ainsi
$$\frac{f(x + t) - f(x^+)}{t} = \frac{\varphi_k(x + t) - \varphi_k(x)}{t} \xrightarrow[t \to 0^{+}]{} \varphi_k'(x).$$

**Étape 3 (à gauche)**　Soit $x \in\, ]-\pi, \pi]$ et $k$ tel que $x \in\, ]t_{k-1}, t_k]$. Pour $0 < t < x - t_{k-1}$, $f(x - t) = \varphi_k(x - t)$ et $f(x^-) = \varphi_k(x)$, donc
$$\frac{f(x - t) - f(x^-)}{t} = -\frac{\varphi_k(x - t) - \varphi_k(x)}{-t} \xrightarrow[t \to 0^{+}]{} -\varphi_k'(x).$$

Les deux limites existent et sont finies.
:::

::: thm id=dirichlet-fourier zh="Dirichlet 定理" en="Dirichlet's theorem (pointwise convergence)" fr="Théorème de Dirichlet" ru="Теорема Дирихле о сходимости ряда Фурье" lvl=1
若 $f$ 是 $2\pi$ 周期的分段 $\Cc^1$ 函数，则对每个 $x \in \R$，
$$S_N f(x) \xrightarrow[N \to \infty]{} \frac{f(x^+) + f(x^-)}{2}.$$
特别地，在 $f$ 的连续点，Fourier 级数收敛到 $f(x)$。
:::

::: fr
Si $f$ est $2\pi$-périodique et de classe $\Cc^1$ par morceaux, alors pour tout $x \in \R$,
$$S_N f(x) \xrightarrow[N \to \infty]{} \frac{f(x^+) + f(x^-)}{2}.$$
En particulier, en tout point de continuité de $f$, la série de Fourier converge vers $f(x)$.
:::

::: proof
▷ 思路：用 Dirichlet 核的积分表示，把 $S_N f(x) - \ell$ 写成 $\frac{1}{2\pi}\int_0^\pi g(t)\sin\big((N + \frac12)t\big)\,\dd t$，再用 Riemann–Lebesgue 引理。唯一的难点是证明 $g$ 在 $[0, \pi]$ 上分段连续，即 $g$ 在 $0^+$ 处有有限极限：分母 $\sin\frac t2 \to 0$，要靠 {@c5-taux-lateral} 中的单侧差商来抵消。

记 $\ell = \frac12\big(f(x^+) + f(x^-)\big)$（由 {@c5-taux-lateral}，单侧极限存在）。

**第 1 步（对称化）**　由 {@c5-dirichlet-noyau} 第 4 条（$f(x + t)$ 的形式），把积分在 $0$ 处分开，在 $\int_{-\pi}^0$ 中令 $t = -u$，并用 $D_N$ 是偶函数：
$$S_N f(x) = \frac{1}{2\pi}\int_0^{\pi}\big(f(x + t) + f(x - t)\big)D_N(t)\,\dd t.$$

**第 2 步（减去 $\ell$）**　由 {@c5-dirichlet-noyau} 第 3 条，$\ell = \big(f(x^+) + f(x^-)\big)\cdot\frac{1}{2\pi}\int_0^\pi D_N$。所以
$$S_N f(x) - \ell = \frac{1}{2\pi}\int_0^\pi\big(f(x + t) - f(x^+) + f(x - t) - f(x^-)\big)D_N(t)\,\dd t.$$

**第 3 步（引入 $g$）**　对 $t \in\, ]0, \pi]$，令
$$g(t) = \frac{f(x + t) - f(x^+) + f(x - t) - f(x^-)}{\sin(t/2)}.$$
因为 $]0, \pi] \cap 2\pi\Z = \varnothing$，由 {@c5-dirichlet-noyau} 第 2 条，在 $]0, \pi]$ 上被积函数等于 $g(t)\sin\big((N + \frac12)t\big)$。

**第 4 步（$g$ 在 $[0, \pi]$ 上分段连续）**

1. 对每个 $\eta \in\, ]0, \pi[$：分子是 $t$ 的分段连续函数（$f$ 的平移与反射），在 $[x - \pi, x + \pi]$ 中 $f$ 只有有限个间断点；分母 $\sin\frac t2$ 在 $[\eta, \pi]$ 上连续且 $\ge \sin\frac\eta2 > 0$。所以 $g$ 在 $]0, \pi]$ 上只有有限个间断点，在每个间断点处有有限的单侧极限，在 $\pi^-$ 处也是。
2. 在 $0^+$ 处：写
$$g(t) = \Big(\frac{f(x + t) - f(x^+)}{t} + \frac{f(x - t) - f(x^-)}{t}\Big)\cdot\frac{t}{\sin(t/2)}.$$
由 {@c5-taux-lateral}，括号有有限极限；$\frac{t}{\sin(t/2)} \to 2$。所以 $g(0^+)$ 存在且有限。

令 $g(0) = 0$（一个点的值不影响积分），$g$ 就是 $[0, \pi]$ 上的分段连续函数。

**第 5 步（Riemann–Lebesgue）**　由第 2、3 步，
$$S_N f(x) - \ell = \frac{1}{2\pi}\int_0^\pi g(t)\sin\big((N + \tfrac12)t\big)\,\dd t.$$
由 Riemann–Lebesgue 引理 {@riemann-lebesgue}（$\sin$ 的形式，$\lambda = N + \frac12 \to +\infty$），右边趋于 $0$。

这就证明了 $S_N f(x) \to \ell$。若 $f$ 在 $x$ 连续，$f(x^+) = f(x^-) = f(x)$，故 $\ell = f(x)$。
:::

::: fr
▷ Méthode : grâce à la représentation intégrale par le noyau de Dirichlet, on écrit $S_N f(x) - \ell$ sous la forme $\frac{1}{2\pi}\int_0^\pi g(t)\sin\big((N + \frac12)t\big)\,\dd t$, puis on applique le lemme de Riemann–Lebesgue. La seule difficulté est de montrer que $g$ est continue par morceaux sur $[0, \pi]$, c'est-à-dire que $g$ admet une limite finie en $0^+$ : le dénominateur $\sin\frac t2$ tend vers $0$, et ce sont les taux d'accroissement de {@fr:c5-taux-lateral} qui compensent.

Notons $\ell = \frac12\big(f(x^+) + f(x^-)\big)$ (les limites à droite et à gauche existent d'après {@fr:c5-taux-lateral}).

**Étape 1 (symétrisation)**　D'après le point 4 de {@fr:c5-dirichlet-noyau} (forme en $f(x + t)$), on coupe l'intégrale en $0$, on pose $t = -u$ dans $\int_{-\pi}^0$ et on utilise la parité de $D_N$ :
$$S_N f(x) = \frac{1}{2\pi}\int_0^{\pi}\big(f(x + t) + f(x - t)\big)D_N(t)\,\dd t.$$

**Étape 2 (on retranche $\ell$)**　D'après le point 3 de {@fr:c5-dirichlet-noyau}, $\ell = \big(f(x^+) + f(x^-)\big)\cdot\frac{1}{2\pi}\int_0^\pi D_N$. Donc
$$S_N f(x) - \ell = \frac{1}{2\pi}\int_0^\pi\big(f(x + t) - f(x^+) + f(x - t) - f(x^-)\big)D_N(t)\,\dd t.$$

**Étape 3 (la fonction $g$)**　Pour $t \in\, ]0, \pi]$, posons
$$g(t) = \frac{f(x + t) - f(x^+) + f(x - t) - f(x^-)}{\sin(t/2)}.$$
Comme $]0, \pi] \cap 2\pi\Z = \varnothing$, d'après le point 2 de {@fr:c5-dirichlet-noyau}, l'intégrande vaut $g(t)\sin\big((N + \frac12)t\big)$ sur $]0, \pi]$.

**Étape 4 ($g$ est continue par morceaux sur $[0, \pi]$)**

1. Pour tout $\eta \in\, ]0, \pi[$ : le numérateur est une fonction continue par morceaux de $t$ (translatée et réfléchie de $f$), et $f$ n'a qu'un nombre fini de discontinuités dans $[x - \pi, x + \pi]$ ; le dénominateur $\sin\frac t2$ est continu et $\ge \sin\frac\eta2 > 0$ sur $[\eta, \pi]$. Ainsi $g$ n'a qu'un nombre fini de discontinuités sur $]0, \pi]$, avec des limites finies à gauche et à droite en chacune d'elles, ainsi qu'en $\pi^-$.
2. En $0^+$ : écrivons
$$g(t) = \Big(\frac{f(x + t) - f(x^+)}{t} + \frac{f(x - t) - f(x^-)}{t}\Big)\cdot\frac{t}{\sin(t/2)}.$$
D'après {@fr:c5-taux-lateral}, la parenthèse a une limite finie ; et $\frac{t}{\sin(t/2)} \to 2$. Donc $g(0^+)$ existe et est finie.

En posant $g(0) = 0$ (la valeur en un point ne change pas l'intégrale), $g$ est continue par morceaux sur $[0, \pi]$.

**Étape 5 (Riemann–Lebesgue)**　D'après les étapes 2 et 3,
$$S_N f(x) - \ell = \frac{1}{2\pi}\int_0^\pi g(t)\sin\big((N + \tfrac12)t\big)\,\dd t.$$
D'après le lemme de Riemann–Lebesgue ({@fr:riemann-lebesgue}, forme en $\sin$, avec $\lambda = N + \frac12 \to +\infty$), le membre de droite tend vers $0$.

Ceci montre que $S_N f(x) \to \ell$. Si $f$ est continue en $x$, $f(x^+) = f(x^-) = f(x)$, donc $\ell = f(x)$.
:::

::: rem
1. **跳跃点处收敛到平均值，与 $f(x)$ 无关。** 方波：$S_N f_1(0) = 0$ 对一切 $N$ 成立（每项 $\sin((2k-1)\cdot 0) = 0$），等于 $\frac12\big(1 + (-1)\big)$；锯齿波：$S_N f_2(\pi) = 0 = \frac12\big(\pi + (-\pi)\big)$。若把 $f_1(0)$ 改成 $5$，$S_N f_1(0)$ 仍收敛到 $0 \ne 5$。
2. **假设可以减弱，但不能减到「连续」。** 证明真正用到的只是 $g$ 在 $0$ 附近可积，这导致 Dini 判别法和 Dirichlet–Jordan 判别法（{@c5-dini-jordan}）。但仅有连续性不够：存在连续函数，其 Fourier 级数在某点发散（{@du-bois-reymond}）。
3. **收敛不一定一致。** 在跳跃点附近，$S_N f$ 的最大误差不趋于 $0$（Gibbs 现象 {@gibbs}）。一致收敛的充分条件见 {@cv-normale-fourier}。
4. **局部性。** 证明中第 5 步只用到 $f$ 在 $x$ 附近的性质（$g$ 在 $0^+$ 的行为）以及 $f$ 在整个周期上分段连续。这是下面局部化原理的一个特例。
:::

::: prop id=c5-localisation zh="Riemann 局部化原理" en="Riemann localization principle" fr="Principe de localisation de Riemann" ru="Принцип локализации Римана" lvl=2
设 $f, g \in \mathcal{CM}_{2\pi}$，$x \in \R$，$\delta \in\, ]0, \pi[$，且 $f = g$ 在 $]x - \delta, x + \delta[$ 上。则
$$S_N f(x) - S_N g(x) \xrightarrow[N \to \infty]{} 0.$$
换言之，Fourier 级数在 $x$ 处是否收敛、收敛到什么，只取决于 $f$ 在 $x$ 的任意小邻域内的值。
:::

::: fr
Soient $f, g \in \mathcal{CM}_{2\pi}$, $x \in \R$ et $\delta \in\, ]0, \pi[$ tels que $f = g$ sur $]x - \delta, x + \delta[$. Alors
$$S_N f(x) - S_N g(x) \xrightarrow[N \to \infty]{} 0.$$
Autrement dit, la convergence de la série de Fourier en $x$, et sa limite éventuelle, ne dépendent que des valeurs de $f$ sur un voisinage arbitrairement petit de $x$.
:::

::: sketch
▷ 思路：差 $h = f - g$ 在 $x$ 附近为 $0$，所以积分表示中 $t$ 靠近 $0$ 的部分消失，剩下的部分里 $\sin\frac t2$ 远离 $0$，可以直接用 Riemann–Lebesgue 引理。

令 $h = f - g \in \mathcal{CM}_{2\pi}$。由 {@c5-dirichlet-noyau} 第 4 条与 $S_N$ 的线性，
$$S_N f(x) - S_N g(x) = S_N h(x) = \frac{1}{2\pi}\int_{-\pi}^{\pi}h(x - t)\,D_N(t)\,\dd t = \frac{1}{2\pi}\int_{-\pi}^{\pi}u(t)\sin\big((N + \tfrac12)t\big)\,\dd t,$$
其中 $u(t) = \dfrac{h(x - t)}{\sin(t/2)}$（$\delta \le \abs t \le \pi$），$u(t) = 0$（$\abs t < \delta$）：因为 $\abs t < \delta$ 时 $h(x - t) = 0$，而 $\delta \le \abs t \le \pi$ 时 $D_N(t) = \frac{\sin((N + 1/2)t)}{\sin(t/2)}$。在 $\delta \le \abs t \le \pi$ 上 $\abs{\sin\frac t2} \ge \sin\frac\delta2 > 0$，所以 $u$ 在 $[-\pi, \pi]$ 上分段连续（在 $\pm\delta$ 处可能跳跃）。由 Riemann–Lebesgue 引理 {@riemann-lebesgue}，积分趋于 $0$。
:::

::: fr
▷ Méthode : la différence $h = f - g$ est nulle près de $x$ ; dans la représentation intégrale, la partie où $t$ est proche de $0$ disparaît, et sur le reste $\sin\frac t2$ est loin de $0$, de sorte que le lemme de Riemann–Lebesgue s'applique directement.

Posons $h = f - g \in \mathcal{CM}_{2\pi}$. D'après le point 4 de {@fr:c5-dirichlet-noyau} et la linéarité de $S_N$,
$$S_N f(x) - S_N g(x) = S_N h(x) = \frac{1}{2\pi}\int_{-\pi}^{\pi}h(x - t)\,D_N(t)\,\dd t = \frac{1}{2\pi}\int_{-\pi}^{\pi}u(t)\sin\big((N + \tfrac12)t\big)\,\dd t,$$
où $u(t) = \dfrac{h(x - t)}{\sin(t/2)}$ pour $\delta \le \abs t \le \pi$ et $u(t) = 0$ pour $\abs t < \delta$ : en effet $h(x - t) = 0$ pour $\abs t < \delta$, et $D_N(t) = \frac{\sin((N + 1/2)t)}{\sin(t/2)}$ pour $\delta \le \abs t \le \pi$. Sur $\delta \le \abs t \le \pi$, $\abs{\sin\frac t2} \ge \sin\frac\delta2 > 0$, donc $u$ est continue par morceaux sur $[-\pi, \pi]$ (avec d'éventuels sauts en $\pm\delta$). D'après le lemme de Riemann–Lebesgue ({@fr:riemann-lebesgue}), l'intégrale tend vers $0$.
:::

::: rem
局部化原理有点出人意料：每个系数 $c_n(f)$ 都依赖于 $f$ 在整个周期上的值，但 $S_N f(x)$ 的**极限行为**只依赖于 $x$ 附近的值。由此，Dirichlet 定理可以推广到只在 $x$ 附近分段 $\Cc^1$ 的分段连续函数：把 $f$ 在 $x$ 的邻域之外换成一个分段 $\Cc^1$ 的函数，不改变 $S_N f(x)$ 的极限。
:::

::: thm id=c5-dini-jordan zh="Dini 判别法与 Dirichlet–Jordan 判别法" en="Dini's test and the Dirichlet–Jordan test" fr="Critères de Dini et de Dirichlet–Jordan" ru="Признаки Дини и Дирихле — Жордана" lvl=3 ref="Г. М. Фихтенгольц,《Курс дифференциального и интегрального исчисления》，第 III 卷（ряды Фурье）；A. Zygmund, *Trigonometric Series*，第 I 卷"
设 $f \in \mathcal{CM}_{2\pi}$，$x \in \R$。

1. （**Dini**）若存在 $\ell \in \C$ 和 $\delta > 0$，使广义积分 $\displaystyle\int_0^\delta\frac{\abs{f(x + t) + f(x - t) - 2\ell}}{t}\,\dd t$ 收敛（第 6 章），则 $S_N f(x) \to \ell$。例如 $f$ 在 $x$ 处满足 Hölder 条件 $\abs{f(x \pm t) - f(x)} \le Ct^\alpha$（$\alpha > 0$）时，取 $\ell = f(x)$。
2. （**Dirichlet–Jordan**）若 $f$ 在 $[-\pi, \pi]$ 上是有界变差的（例如分段单调），则对一切 $x$，$S_N f(x) \to \frac12\big(f(x^+) + f(x^-)\big)$；若 $f$ 还连续，收敛在 $\R$ 上一致。
:::

::: fr
Soit $f \in \mathcal{CM}_{2\pi}$ et $x \in \R$.

1. (**Dini**) S'il existe $\ell \in \C$ et $\delta > 0$ tels que l'intégrale impropre $\displaystyle\int_0^\delta\frac{\abs{f(x + t) + f(x - t) - 2\ell}}{t}\,\dd t$ converge (chapitre 6), alors $S_N f(x) \to \ell$. C'est le cas, avec $\ell = f(x)$, si $f$ vérifie en $x$ une condition de Hölder $\abs{f(x \pm t) - f(x)} \le Ct^\alpha$ ($\alpha > 0$).
2. (**Dirichlet–Jordan**) Si $f$ est à variation bornée sur $[-\pi, \pi]$ (par exemple monotone par morceaux), alors pour tout $x$, $S_N f(x) \to \frac12\big(f(x^+) + f(x^-)\big)$ ; si de plus $f$ est continue, la convergence est uniforme sur $\R$.
:::

::: thm id=cv-normale-fourier zh="正规收敛" en="Normal convergence of Fourier series" fr="Convergence normale de la série de Fourier" ru="Абсолютная и равномерная сходимость ряда Фурье" lvl=1
若 $f$ 是 $2\pi$ 周期、连续且分段 $\Cc^1$ 的函数，则 $\sum_{n \in \Z}\abs{c_n(f)} < +\infty$，Fourier 级数在 $\R$ 上正规收敛到 $f$；特别地 $\norm{f - S_N f}_\infty \to 0$。
:::

::: fr
Si $f$ est $2\pi$-périodique, continue et de classe $\Cc^1$ par morceaux, alors $\sum_{n \in \Z}\abs{c_n(f)} < +\infty$ et la série de Fourier de $f$ converge normalement vers $f$ sur $\R$ ; en particulier $\norm{f - S_N f}_\infty \to 0$.
:::

::: proof
▷ 思路：$c_n(f) = \frac{c_n(f')}{\ii n}$，而 $\sum\abs{c_n(f')}^2 < \infty$（Bessel）；用 $\abs{ab} \le \frac12(a^2 + b^2)$ 把乘积的和化成两个平方和。正规收敛给出一个连续的和函数，再用唯一性定理说明它就是 $f$。

**第 1 步（导数的系数）**　由 {@coef-proprietes} 第 2 条，$f' \in \mathcal{CM}_{2\pi}$，且对 $n \ne 0$，$c_n(f) = \dfrac{c_n(f')}{\ii n}$。

**第 2 步（绝对可和）**　对 $n \ne 0$，由 $\abs{ab} \le \frac12(\abs a^2 + \abs b^2)$，
$$\abs{c_n(f)} = \frac{1}{\abs n}\cdot\abs{c_n(f')} \le \frac12\Big(\frac{1}{n^2} + \abs{c_n(f')}^2\Big).$$
$\sum_{n \ne 0}\frac{1}{n^2} = 2\zeta(2) < \infty$，由 Bessel 不等式 {@bessel}（用于 $f'$），$\sum_n\abs{c_n(f')}^2 \le \norm{f'}_2^2 < \infty$。由比较定理，$\sum_{n \in \Z}\abs{c_n(f)} < \infty$。

**第 3 步（正规收敛）**　令 $u_0 = c_0(f)$，$u_n = c_n(f)e_n + c_{-n}(f)e_{-n}$（$n \ge 1$），则 $S_N f = \sum_{n=0}^N u_n$，且 $\norm{u_n}_\infty \le \abs{c_n(f)} + \abs{c_{-n}(f)}$。由第 2 步，$\sum_n\norm{u_n}_\infty < \infty$：级数 $\sum u_n$ 在 $\R$ 上正规收敛（{@def-cv-normale}），从而一致收敛（{@normale-unif}）到某个函数 $S$。每个 $u_n$ 连续，所以 $S$ 连续（{@cont-limite-unif}），且 $S$ 是 $2\pi$ 周期的。

**第 4 步（$S$ 的系数）**　固定 $k \in \Z$。因为 $\abs{e_{-k}} = 1$，$S_N f\cdot e_{-k} \to S\,e_{-k}$ 在 $[-\pi, \pi]$ 上一致成立。由 {@integration-unif}，
$$c_k(S) = \frac{1}{2\pi}\int_{-\pi}^{\pi}S\,e_{-k} = \lim_{N \to \infty}\frac{1}{2\pi}\int_{-\pi}^{\pi}S_N f\cdot e_{-k} = \lim_{N \to \infty}c_k(S_N f) = c_k(f),$$
最后一步：$N \ge \abs k$ 时，由 {@orthonormal} 第 3 条，$c_k(S_N f) = c_k(f)$。

**第 5 步（唯一性）**　$S$ 与 $f$ 都属于 $\Cc_{2\pi}$，且系数相同。由 {@unicite-fourier}，$S = f$。

所以 Fourier 级数在 $\R$ 上正规收敛到 $f$。
:::

::: fr
▷ Méthode : $c_n(f) = \frac{c_n(f')}{\ii n}$ et $\sum\abs{c_n(f')}^2 < \infty$ (Bessel) ; l'inégalité $\abs{ab} \le \frac12(a^2 + b^2)$ ramène la somme des produits à deux sommes de carrés. La convergence normale fournit une somme continue, que le théorème d'unicité identifie à $f$.

**Étape 1 (coefficients de la dérivée)**　D'après le point 2 de {@fr:coef-proprietes}, $f' \in \mathcal{CM}_{2\pi}$ et, pour $n \ne 0$, $c_n(f) = \dfrac{c_n(f')}{\ii n}$.

**Étape 2 (sommabilité absolue)**　Pour $n \ne 0$, par $\abs{ab} \le \frac12(\abs a^2 + \abs b^2)$,
$$\abs{c_n(f)} = \frac{1}{\abs n}\cdot\abs{c_n(f')} \le \frac12\Big(\frac{1}{n^2} + \abs{c_n(f')}^2\Big).$$
On a $\sum_{n \ne 0}\frac{1}{n^2} = 2\zeta(2) < \infty$ et, d'après l'inégalité de Bessel ({@fr:bessel}) appliquée à $f'$, $\sum_n\abs{c_n(f')}^2 \le \norm{f'}_2^2 < \infty$. Par comparaison, $\sum_{n \in \Z}\abs{c_n(f)} < \infty$.

**Étape 3 (convergence normale)**　Posons $u_0 = c_0(f)$ et $u_n = c_n(f)e_n + c_{-n}(f)e_{-n}$ pour $n \ge 1$ ; alors $S_N f = \sum_{n=0}^N u_n$ et $\norm{u_n}_\infty \le \abs{c_n(f)} + \abs{c_{-n}(f)}$. D'après l'étape 2, $\sum_n\norm{u_n}_\infty < \infty$ : la série $\sum u_n$ converge normalement sur $\R$ ({@fr:def-cv-normale}), donc uniformément ({@fr:normale-unif}) vers une fonction $S$. Chaque $u_n$ est continue, donc $S$ est continue ({@fr:cont-limite-unif}) ; $S$ est $2\pi$-périodique.

**Étape 4 (coefficients de $S$)**　Fixons $k \in \Z$. Comme $\abs{e_{-k}} = 1$, $S_N f\cdot e_{-k} \to S\,e_{-k}$ uniformément sur $[-\pi, \pi]$. D'après {@fr:integration-unif},
$$c_k(S) = \frac{1}{2\pi}\int_{-\pi}^{\pi}S\,e_{-k} = \lim_{N \to \infty}\frac{1}{2\pi}\int_{-\pi}^{\pi}S_N f\cdot e_{-k} = \lim_{N \to \infty}c_k(S_N f) = c_k(f),$$
car pour $N \ge \abs k$, $c_k(S_N f) = c_k(f)$ d'après le point 3 de {@fr:orthonormal}.

**Étape 5 (unicité)**　$S$ et $f$ appartiennent à $\Cc_{2\pi}$ et ont les mêmes coefficients. D'après {@fr:unicite-fourier}, $S = f$.

Ainsi la série de Fourier converge normalement vers $f$ sur $\R$.
:::

::: rem
1. **「连续」不能去掉。** 方波 $f_1$ 分段 $\Cc^1$，但 $\sum_n\abs{c_n(f_1)} = 2\sum_{n\ \text{奇}}\frac{2}{\pi n} = +\infty$；而且它的 Fourier 级数不可能一致收敛：部分和连续，而 $f_1$ 不连续（{@cont-limite-unif}）。
2. **逆命题不成立：一致收敛不需要 $\sum\abs{c_n} < \infty$。** 例如 $\sum_{n \ge 2}\frac{\sin nx}{n\ln n}$ 在 $\R$ 上一致收敛（Chaundy–Jolliffe 定理：$b_n \ge 0$ 递减时，$\sum b_n\sin nx$ 一致收敛当且仅当 $nb_n \to 0$），它是自己的和函数的 Fourier 级数（与第 4 步同样的逐项积分），但 $\sum\frac{1}{n\ln n} = +\infty$（{@bertrand}）。
3. **「分段 $\Cc^1$」可以减弱。** 证明只用到 $f$ 连续且 $f'$ 的系数平方可和；第 3 步之后不再需要别的条件。
:::

::: prop id=c5-regularite zh="正则性与系数的衰减" en="Smoothness and decay of Fourier coefficients" fr="Régularité et décroissance des coefficients" ru="Гладкость функции и убывание коэффициентов Фурье" lvl=1
1. 若 $f \in \Cc_{2\pi}$ 是 $\Cc^k$ 的（$k \ge 1$），则对 $n \ne 0$，$c_n(f) = \dfrac{c_n(f^{(k)})}{(\ii n)^k}$，从而 $n^k c_n(f) \xrightarrow[\abs n \to \infty]{} 0$。
2. 反之，若复数族 $(\gamma_n)_{n \in \Z}$ 满足 $\sum_{n \in \Z}\abs n^k\abs{\gamma_n} < +\infty$，则 $g = \sum_{n \in \Z}\gamma_n e_n$（按对称部分和）在 $\R$ 上正规收敛，$g \in \Cc_{2\pi}$ 是 $\Cc^k$ 的，$c_n(g) = \gamma_n$，并且对 $0 \le j \le k$，$g^{(j)} = \sum_n(\ii n)^j\gamma_n e_n$。
:::

::: fr
1. Si $f \in \Cc_{2\pi}$ est de classe $\Cc^k$ ($k \ge 1$), alors pour $n \ne 0$, $c_n(f) = \dfrac{c_n(f^{(k)})}{(\ii n)^k}$ ; par conséquent $n^k c_n(f) \xrightarrow[\abs n \to \infty]{} 0$.
2. Réciproquement, si une famille de complexes $(\gamma_n)_{n \in \Z}$ vérifie $\sum_{n \in \Z}\abs n^k\abs{\gamma_n} < +\infty$, alors $g = \sum_{n \in \Z}\gamma_n e_n$ (sommes partielles symétriques) converge normalement sur $\R$, $g \in \Cc_{2\pi}$ est de classe $\Cc^k$, $c_n(g) = \gamma_n$ et, pour $0 \le j \le k$, $g^{(j)} = \sum_n(\ii n)^j\gamma_n e_n$.
:::

::: proof
▷ 思路：1 对 $k$ 归纳地使用 $c_n(f') = \ii n\,c_n(f)$，最后用 Riemann–Lebesgue 引理；2 用逐项求导定理，每求一次导，系数乘以 $\ii n$。

**1.**　**归纳。** 对 $0 \le j \le k - 1$，$f^{(j)}$ 是 $\Cc^1$ 的周期函数，特别地连续且分段 $\Cc^1$。由 {@coef-proprietes} 第 2 条，$c_n(f^{(j+1)}) = \ii n\,c_n(f^{(j)})$。从 $j = 0$ 到 $j = k - 1$ 连乘得 $c_n(f^{(k)}) = (\ii n)^k c_n(f)$。**结论。** $f^{(k)}$ 连续，由 Riemann–Lebesgue 引理 {@riemann-lebesgue}，$c_n(f^{(k)}) \to 0$，所以 $\abs{n^k c_n(f)} = \abs{c_n(f^{(k)})} \to 0$。

**2.**　**第 1 步（正规收敛）**　对 $0 \le j \le k$，令 $v_0^{(0)} = \gamma_0$，$v_0^{(j)} = 0$（$j \ge 1$），$v_n^{(j)} = (\ii n)^j\gamma_n e_n + (-\ii n)^j\gamma_{-n}e_{-n}$（$n \ge 1$）。$\norm{v_n^{(j)}}_\infty \le \abs n^j(\abs{\gamma_n} + \abs{\gamma_{-n}}) \le \abs n^k(\abs{\gamma_n} + \abs{\gamma_{-n}})$（$n \ge 1$），所以每个 $\sum_n v_n^{(j)}$ 在 $\R$ 上正规收敛，从而一致收敛。

**第 2 步（逐项求导）**　$(v_n^{(j)})' = v_n^{(j+1)}$。由 {@transferts-series} 第 3 条（$\sum v_n^{(j)}$ 收敛，$\sum v_n^{(j+1)}$ 一致收敛），对 $j = 0, 1, \dots, k - 1$ 依次得到：$g$ 是 $\Cc^k$ 的，且 $g^{(j)} = \sum_n v_n^{(j)}$。

**第 3 步（系数）**　与 {@cv-normale-fourier} 证明的第 4 步相同，逐项积分给出 $c_n(g) = \gamma_n$。
:::

::: fr
▷ Méthode : pour 1, on itère $c_n(f') = \ii n\,c_n(f)$ et on conclut par le lemme de Riemann–Lebesgue ; pour 2, on dérive terme à terme, chaque dérivation multipliant les coefficients par $\ii n$.

**1.**　**Récurrence.** Pour $0 \le j \le k - 1$, $f^{(j)}$ est périodique de classe $\Cc^1$, donc continue et $\Cc^1$ par morceaux. D'après le point 2 de {@fr:coef-proprietes}, $c_n(f^{(j+1)}) = \ii n\,c_n(f^{(j)})$. En enchaînant de $j = 0$ à $j = k - 1$, on obtient $c_n(f^{(k)}) = (\ii n)^k c_n(f)$. **Conclusion.** $f^{(k)}$ est continue ; d'après le lemme de Riemann–Lebesgue ({@fr:riemann-lebesgue}), $c_n(f^{(k)}) \to 0$, donc $\abs{n^k c_n(f)} = \abs{c_n(f^{(k)})} \to 0$.

**2.**　**Étape 1 (convergence normale)**　Pour $0 \le j \le k$, posons $v_0^{(0)} = \gamma_0$, $v_0^{(j)} = 0$ ($j \ge 1$), et $v_n^{(j)} = (\ii n)^j\gamma_n e_n + (-\ii n)^j\gamma_{-n}e_{-n}$ pour $n \ge 1$. On a $\norm{v_n^{(j)}}_\infty \le \abs n^j(\abs{\gamma_n} + \abs{\gamma_{-n}}) \le \abs n^k(\abs{\gamma_n} + \abs{\gamma_{-n}})$ ($n \ge 1$), donc chaque série $\sum_n v_n^{(j)}$ converge normalement, donc uniformément, sur $\R$.

**Étape 2 (dérivation terme à terme)**　$(v_n^{(j)})' = v_n^{(j+1)}$. D'après le point 3 de {@fr:transferts-series} ($\sum v_n^{(j)}$ converge et $\sum v_n^{(j+1)}$ converge uniformément), on obtient successivement pour $j = 0, 1, \dots, k - 1$ : $g$ est de classe $\Cc^k$ et $g^{(j)} = \sum_n v_n^{(j)}$.

**Étape 3 (coefficients)**　Comme à l'étape 4 de la preuve de {@fr:cv-normale-fourier}, l'intégration terme à terme donne $c_n(g) = \gamma_n$.
:::

::: rem
**光滑性 ⟺ 系数快速衰减。** 跳跃 ⟹ 系数 $\asymp \frac1n$（方波）；连续但导数跳跃 ⟹ 系数 $\asymp \frac{1}{n^2}$（三角波）；$\Cc^\infty$ ⟹ 系数比任何 $\frac{1}{n^k}$ 都小。精确地说，对 $f \in \Cc_{2\pi}$：$f$ 是 $\Cc^\infty$ 的，当且仅当对一切 $k$，$n^k c_n(f) \to 0$。（⇒）由 1。（⇐）对每个 $k$，$\abs n^{k+2}\abs{c_n(f)}$ 有界，记上界为 $C_k$，则 $\abs n^k\abs{c_n(f)} \le \frac{C_k}{n^2}$，$\sum_n\abs n^k\abs{c_n(f)} < \infty$；由 2，$g = \sum c_n(f)e_n$ 是 $\Cc^\infty$ 的且 $c_n(g) = c_n(f)$，由 {@unicite-fourier}，$f = g$。热方程（本章 §6 的注）就利用了这一点：因子 $\e^{-n^2 t}$ 让系数衰减得比任何多项式都快。
:::

::: q
设 $f$ 连续且分段 $\Cc^1$。给出 $\norm{f - S_N f}_\infty$ 的一个显式上界，说明它是 $O\big(\frac{1}{\sqrt N}\big)$。
:::

::: ans
由 {@cv-normale-fourier}，$f - S_N f = \sum_{\abs n > N}c_n(f)e_n$（一致收敛），所以
$$\norm{f - S_N f}_\infty \le \sum_{\abs n > N}\frac{\abs{c_n(f')}}{\abs n} \le \Big(\sum_{\abs n > N}\frac{1}{n^2}\Big)^{1/2}\Big(\sum_{\abs n > N}\abs{c_n(f')}^2\Big)^{1/2} \le \sqrt{\frac2N}\,\norm{f'}_2,$$
第二步是 Cauchy–Schwarz 不等式（对有限和成立，再取极限），第三步用了 $\sum_{n > N}\frac{1}{n^2} \le \int_N^{+\infty}\frac{\dd t}{t^2} = \frac1N$（{@serie-integrale}）与 Bessel 不等式。事实上由 Parseval，$\sum_{\abs n > N}\abs{c_n(f')}^2 \to 0$，所以误差甚至是 $o\big(\frac{1}{\sqrt N}\big)$。
:::

## 应用

前面的定理给出三种工具：Parseval 恒等式把 $\int\abs f^2$ 变成 $\sum\abs{c_n}^2$；Dirichlet 定理在连续点给出 $f(x)$ 的级数表示；Fejér 定理把「对三角多项式成立」推广到「对连续函数成立」。下面依次用它们求数值级数的和、分析 Gibbs 现象、证明等周不等式和 Weyl 等分布定理。

::: ex id=bale zh="Basel 问题" lvl=1
**(a) $\zeta(2)$。** 取锯齿波 $f_2$（$f(x) = x$，$-\pi < x < \pi$，周期延拓）。由 {@c5-ex-scie}，$a_n = 0$，$b_n = \frac{2(-1)^{n+1}}{n}$。由 Parseval 恒等式 {@parseval} 的实形式，
$$\frac{1}{2\pi}\int_{-\pi}^{\pi} x^2\,\dd x = \frac{1}{2\pi}\cdot\frac{2\pi^3}{3} = \frac{\pi^2}{3} = \frac12\sum_{n \ge 1}\frac{4}{n^2},\qquad\text{即}\quad \zeta(2) = \sum_{n \ge 1}\frac{1}{n^2} = \frac{\pi^2}{6}.$$

**(b) $\zeta(4)$。** 取三角波 $f_3 = \abs{x}$。由 {@c5-ex-triangle}，$a_0 = \pi$，$a_n = -\frac{4}{\pi n^2}$（$n$ 奇），其余为 $0$。Parseval 给出
$$\frac{\pi^2}{3} = \frac{\pi^2}{4} + \frac12\sum_{n\ \text{奇}}\frac{16}{\pi^2 n^4}\quad\Longrightarrow\quad \sum_{n\ \text{奇}}\frac{1}{n^4} = \frac{\pi^2}{12}\cdot\frac{\pi^2}{8} = \frac{\pi^4}{96}.$$
偶数项之和为 $\sum_{m \ge 1}\frac{1}{(2m)^4} = \frac{\zeta(4)}{16}$，所以 $\zeta(4) = \frac{\pi^4}{96} + \frac{\zeta(4)}{16}$，$\zeta(4) = \frac{16}{15}\cdot\frac{\pi^4}{96} = \frac{\pi^4}{90}$。

**(c) 奇数平方倒数和。** $f_3$ 连续且分段 $\Cc^1$，在 $x = 0$ 处用 Dirichlet 定理 {@dirichlet-fourier}（这里甚至是正规收敛，{@cv-normale-fourier}）：
$$0 = f_3(0) = \frac\pi2 - \frac4\pi\sum_{n\ \text{奇}}\frac{1}{n^2},\qquad\text{即}\quad\sum_{n\ \text{奇}}\frac{1}{n^2} = \frac{\pi^2}{8}.$$
这与 Parseval 用于方波的结果（§4 的「想一想」）一致。
:::

::: q
锯齿波 $f_2$ 在 $x = \frac\pi2$ 处连续。用 Dirichlet 定理能得到哪个级数的和？
:::

::: ans
由 {@c5-ex-scie} 与 {@dirichlet-fourier}，$\frac\pi2 = 2\sum_{n \ge 1}\frac{(-1)^{n+1}\sin(n\pi/2)}{n}$。$n$ 偶时 $\sin\frac{n\pi}{2} = 0$；$n = 2k + 1$ 时 $\sin\frac{n\pi}{2} = (-1)^k$，$(-1)^{n+1} = 1$。所以 $\frac\pi2 = 2\sum_{k \ge 0}\frac{(-1)^k}{2k+1}$，即 **Leibniz 公式** $1 - \frac13 + \frac15 - \cdots = \frac\pi4$。
:::

::: demo id=fourier
方波、锯齿波、三角波的 Fourier 部分和 $S_N$（蓝色）与 Fejér 平均 $\sigma_N$（紫色）。观察方波跳跃点附近：$S_N$ 的过冲不随 $N$ 增大而消失，这就是 Gibbs 现象；Fejér 平均没有过冲，因为 $K_N \ge 0$。三角波连续且分段 $\Cc^1$，部分和一致收敛，与 {@cv-normale-fourier} 一致。
:::

::: thm id=gibbs zh="Gibbs 现象" en="Gibbs phenomenon" fr="Phénomène de Gibbs" ru="Явление Гиббса" lvl=2
设 $f$ 是方波（$(0, \pi)$ 上为 $1$，$(-\pi, 0)$ 上为 $-1$）。则
$$\lim_{N \to \infty} \max_{[0,\pi]} S_N f = \frac{2}{\pi}\int_0^\pi \frac{\sin t}{t}\,\dd t \approx 1.17898.$$
过冲约为跳跃高度 $2$ 的 $8.95\%$，与 $N$ 无关。
:::

::: fr
Soit $f$ le signal créneau (égal à $1$ sur $(0, \pi)$ et à $-1$ sur $(-\pi, 0)$). Alors
$$\lim_{N \to \infty} \max_{[0,\pi]} S_N f = \frac{2}{\pi}\int_0^\pi \frac{\sin t}{t}\,\dd t \approx 1{,}17898.$$
Le dépassement vaut environ $8{,}95\,\%$ de la hauteur $2$ du saut, indépendamment de $N$.
:::

::: sketch
▷ 思路：求出 $S_N f$ 的导数的闭式，找到第一个极大值点 $x_m = \frac{\pi}{2m}$，证明它是最大值点，再把 $S_N f(x_m)$ 认出是一个 Riemann 和。

**第 1 步（化简）**　由 {@c5-ex-creneau}，偶数项系数为 $0$，所以 $S_{2m} f = S_{2m-1} f =: T_m$，
$$T_m(x) = \frac{4}{\pi}\sum_{k=1}^{m}\frac{\sin\big((2k-1)x\big)}{2k-1}.$$
只需证明 $\max_{[0, \pi]} T_m \to \frac2\pi\int_0^\pi\frac{\sin t}{t}\,\dd t$（$m \to \infty$）。

**第 2 步（导数）**　由 $2\sin x\cos\big((2k-1)x\big) = \sin(2kx) - \sin\big((2k-2)x\big)$ 求和（望远镜），对 $x \notin \pi\Z$，
$$T_m'(x) = \frac4\pi\sum_{k=1}^m\cos\big((2k-1)x\big) = \frac{2}{\pi}\cdot\frac{\sin 2mx}{\sin x}.$$

**第 3 步（最大值点）**　$T_m(\pi - x) = T_m(x)$（因为 $\sin\big((2k-1)(\pi - x)\big) = \sin\big((2k-1)x\big)$），所以只需看 $[0, \frac\pi2]$。$T_m$ 在 $]0, \frac\pi2]$ 中的临界点是 $x_j = \frac{j\pi}{2m}$（$1 \le j \le m$），$j$ 奇时 $T_m'$ 由正变负（局部极大）。对奇数 $j$（$j + 2 \le m$），
$$T_m(x_{j+2}) - T_m(x_j) = \frac2\pi\int_{x_j}^{x_{j+2}}\frac{\sin 2mx}{\sin x}\,\dd x < 0,$$
因为 $[x_j, x_{j+1}]$ 上的负的部分经平移 $x \mapsto x + \frac{\pi}{2m}$ 后与 $[x_{j+1}, x_{j+2}]$ 上的正的部分有相同的 $\abs{\sin 2mx}$，而 $\frac{1}{\sin x}$ 在 $]0, \frac\pi2]$ 上严格递减。所以局部极大值依次减小，$\max_{[0, \pi]}T_m = T_m(x_1)$，$x_1 = \frac{\pi}{2m}$。（常规检查：$T_m(0) = 0$，端点 $\frac\pi2$ 处的值不超过相邻的极大值。）

**第 4 步（Riemann 和）**　令 $s_k = \frac{(2k-1)\pi}{2m} = \big(k - \frac12\big)\frac{\pi}{m}$，则 $\frac{1}{2k-1} = \frac{\pi}{2m}\cdot\frac{1}{s_k}$，
$$T_m(x_1) = \frac4\pi\sum_{k=1}^m\frac{\sin s_k}{2k - 1} = \frac2\pi\sum_{k=1}^m\frac{\sin s_k}{s_k}\cdot\frac\pi m.$$
这是连续函数 $t \mapsto \frac{\sin t}{t}$（在 $0$ 处补值 $1$）在 $[0, \pi]$ 上步长 $\frac\pi m$ 的中点 Riemann 和，所以 $T_m(x_1) \to \frac2\pi\int_0^\pi\frac{\sin t}{t}\,\dd t$。

**第 5 步（数值）**　（常规计算：$\int_0^\pi\frac{\sin t}{t}\,\dd t \approx 1.851937$。）极限 $\approx 1.178980$。从 $-1$ 到 $1$ 的跳跃高度为 $2$，越过 $1$ 的部分 $\approx 0.17898 \approx 8.95\% \times 2$。
:::

::: fr
▷ Méthode : on calcule une forme close de la dérivée de $S_N f$, on repère le premier maximum $x_m = \frac{\pi}{2m}$, on montre que c'est le maximum global, puis on reconnaît dans $S_N f(x_m)$ une somme de Riemann.

**Étape 1 (réduction)**　D'après {@fr:c5-ex-creneau}, les coefficients d'indice pair sont nuls, donc $S_{2m} f = S_{2m-1} f =: T_m$, avec
$$T_m(x) = \frac{4}{\pi}\sum_{k=1}^{m}\frac{\sin\big((2k-1)x\big)}{2k-1}.$$
Il suffit de montrer que $\max_{[0, \pi]} T_m \to \frac2\pi\int_0^\pi\frac{\sin t}{t}\,\dd t$ quand $m \to \infty$.

**Étape 2 (dérivée)**　En sommant $2\sin x\cos\big((2k-1)x\big) = \sin(2kx) - \sin\big((2k-2)x\big)$ (somme télescopique), pour $x \notin \pi\Z$,
$$T_m'(x) = \frac4\pi\sum_{k=1}^m\cos\big((2k-1)x\big) = \frac{2}{\pi}\cdot\frac{\sin 2mx}{\sin x}.$$

**Étape 3 (point de maximum)**　On a $T_m(\pi - x) = T_m(x)$ (car $\sin\big((2k-1)(\pi - x)\big) = \sin\big((2k-1)x\big)$) ; il suffit donc d'étudier $[0, \frac\pi2]$. Les points critiques de $T_m$ dans $]0, \frac\pi2]$ sont les $x_j = \frac{j\pi}{2m}$ ($1 \le j \le m$) ; pour $j$ impair, $T_m'$ passe du positif au négatif (maximum local). Pour $j$ impair avec $j + 2 \le m$,
$$T_m(x_{j+2}) - T_m(x_j) = \frac2\pi\int_{x_j}^{x_{j+2}}\frac{\sin 2mx}{\sin x}\,\dd x < 0,$$
car la translation $x \mapsto x + \frac{\pi}{2m}$ envoie la partie négative sur $[x_j, x_{j+1}]$ sur la partie positive sur $[x_{j+1}, x_{j+2}]$ en conservant $\abs{\sin 2mx}$, tandis que $\frac{1}{\sin x}$ est strictement décroissante sur $]0, \frac\pi2]$. Les maxima locaux décroissent donc, et $\max_{[0, \pi]}T_m = T_m(x_1)$ avec $x_1 = \frac{\pi}{2m}$. (Vérification de routine : $T_m(0) = 0$, et la valeur en $\frac\pi2$ ne dépasse pas le maximum local voisin.)

**Étape 4 (somme de Riemann)**　Posons $s_k = \frac{(2k-1)\pi}{2m} = \big(k - \frac12\big)\frac{\pi}{m}$ ; alors $\frac{1}{2k-1} = \frac{\pi}{2m}\cdot\frac{1}{s_k}$ et
$$T_m(x_1) = \frac4\pi\sum_{k=1}^m\frac{\sin s_k}{2k - 1} = \frac2\pi\sum_{k=1}^m\frac{\sin s_k}{s_k}\cdot\frac\pi m.$$
C'est la somme de Riemann aux points milieux, de pas $\frac\pi m$, de la fonction continue $t \mapsto \frac{\sin t}{t}$ (prolongée par $1$ en $0$) sur $[0, \pi]$ ; donc $T_m(x_1) \to \frac2\pi\int_0^\pi\frac{\sin t}{t}\,\dd t$.

**Étape 5 (valeur numérique)**　(Calcul de routine : $\int_0^\pi\frac{\sin t}{t}\,\dd t \approx 1{,}851937$.) La limite vaut $\approx 1{,}178980$. Le saut de $-1$ à $1$ a pour hauteur $2$, et le dépassement au-dessus de $1$ vaut $\approx 0{,}17898 \approx 8{,}95\,\% \times 2$.
:::

::: rem
**Gibbs 现象与 Dirichlet 定理不矛盾。** 对每个固定的 $x \in\, ]0, \pi[$，$S_N f(x) \to 1$；但取得最大值的点 $x_1 = \frac{\pi}{2m}$ 随 $N$ 向跳跃点 $0$ 移动。这正说明收敛不是一致的：$\sup_{]0, \pi[}\abs{S_N f - f} \to 0.17898\ldots \ne 0$。Fejér 平均没有这种过冲：由 $K_N \ge 0$ 与 $\frac{1}{2\pi}\int K_N = 1$，$\abs{\sigma_N f} \le \norm f_\infty = 1$。
:::

::: thm id=isoperimetrique zh="等周不等式" en="Isoperimetric inequality" fr="Inégalité isopérimétrique" ru="Изопериметрическое неравенство" lvl=2
平面上长度为 $L$ 的分段 $\Cc^1$ 简单闭曲线所围面积 $A$ 满足 $4\pi A \le L^2$，等号当且仅当曲线是圆。
:::

::: fr
L'aire $A$ du domaine délimité par une courbe fermée simple $\Cc^1$ par morceaux de longueur $L$ dans le plan vérifie $4\pi A \le L^2$, avec égalité si et seulement si la courbe est un cercle.
:::

::: sketch
（Hurwitz，1901）▷ 思路：把曲线看成 $2\pi$ 周期的复值函数 $z(t)$。长度与面积都能用 Fourier 系数表示（分别用 Parseval 恒等式和它的双线性形式），两者之差是一个非负项的和。

**第 1 步（规范化）**　用弧长 $s \in [0, L]$ 参数化曲线，再令 $t = \frac{2\pi s}{L}$，得到 $2\pi$ 周期、连续、分段 $\Cc^1$ 的 $z : \R \to \C$，$z = x + \ii y$，除有限个点外 $\abs{z'(t)} = \frac{L}{2\pi}$。取正向（逆时针），记 $c_n = c_n(z)$。

**第 2 步（长度）**　由 {@coef-proprietes} 第 2 条，$c_n(z') = \ii n\,c_n$。由 Parseval 恒等式 {@parseval}，
$$\frac{L^2}{4\pi^2} = \frac{1}{2\pi}\int_0^{2\pi}\abs{z'}^2 = \sum_{n \in \Z}n^2\abs{c_n}^2.$$

**第 3 步（面积）**　$\overline{z}\,z' = (x - \ii y)(x' + \ii y')$，虚部为 $xy' - yx'$。由 {@aire-green}，$A = \frac12\int_0^{2\pi}(xy' - yx')\,\dd t = \frac12\operatorname{Im}\int_0^{2\pi}z'\,\overline z\,\dd t$。由 {@c5-parseval-polarise}，$\frac{1}{2\pi}\int_0^{2\pi}z'\,\overline z = \sum_n c_n(z')\overline{c_n} = \ii\sum_n n\abs{c_n}^2$，所以
$$A = \frac12\operatorname{Im}\Big(2\pi\ii\sum_n n\abs{c_n}^2\Big) = \pi\sum_{n \in \Z}n\abs{c_n}^2.$$

**第 4 步（比较）**　
$$L^2 - 4\pi A = 4\pi^2\sum_{n \in \Z}(n^2 - n)\abs{c_n}^2 = 4\pi^2\sum_{n \in \Z}n(n - 1)\abs{c_n}^2 \ge 0,$$
因为对每个整数 $n$，$n(n-1) \ge 0$。

**第 5 步（等号）**　$n(n - 1) = 0 \iff n \in \{0, 1\}$。所以等号成立当且仅当 $c_n = 0$ 对一切 $n \notin \{0, 1\}$ 成立。此时 $z$ 与 $c_0 + c_1e_1$ 是有相同系数的连续函数，由 {@unicite-fourier}，$z(t) = c_0 + c_1\e^{\ii t}$：圆心 $c_0$、半径 $\abs{c_1} = \frac{L}{2\pi}$ 的圆。反之，对圆 $z = c_0 + c_1e_1$，只有 $c_0, c_1$ 可能非零，第 4 步的和为 $0$，等号成立。
:::

::: fr
(Hurwitz, 1901) ▷ Méthode : on voit la courbe comme une fonction $2\pi$-périodique $z(t)$ à valeurs complexes. La longueur et l'aire s'expriment à l'aide des coefficients de Fourier (par l'égalité de Parseval et sa forme polarisée) ; leur différence est une somme de termes positifs.

**Étape 1 (normalisation)**　On paramètre la courbe par l'abscisse curviligne $s \in [0, L]$, puis on pose $t = \frac{2\pi s}{L}$ : on obtient $z : \R \to \C$, $z = x + \ii y$, $2\pi$-périodique, continue et $\Cc^1$ par morceaux, avec $\abs{z'(t)} = \frac{L}{2\pi}$ sauf en un nombre fini de points. On oriente la courbe dans le sens direct et on note $c_n = c_n(z)$.

**Étape 2 (longueur)**　D'après le point 2 de {@fr:coef-proprietes}, $c_n(z') = \ii n\,c_n$. D'après l'égalité de Parseval ({@fr:parseval}),
$$\frac{L^2}{4\pi^2} = \frac{1}{2\pi}\int_0^{2\pi}\abs{z'}^2 = \sum_{n \in \Z}n^2\abs{c_n}^2.$$

**Étape 3 (aire)**　$\overline{z}\,z' = (x - \ii y)(x' + \ii y')$ a pour partie imaginaire $xy' - yx'$. D'après {@fr:aire-green}, $A = \frac12\int_0^{2\pi}(xy' - yx')\,\dd t = \frac12\operatorname{Im}\int_0^{2\pi}z'\,\overline z\,\dd t$. D'après {@fr:c5-parseval-polarise}, $\frac{1}{2\pi}\int_0^{2\pi}z'\,\overline z = \sum_n c_n(z')\overline{c_n} = \ii\sum_n n\abs{c_n}^2$, donc
$$A = \frac12\operatorname{Im}\Big(2\pi\ii\sum_n n\abs{c_n}^2\Big) = \pi\sum_{n \in \Z}n\abs{c_n}^2.$$

**Étape 4 (comparaison)**
$$L^2 - 4\pi A = 4\pi^2\sum_{n \in \Z}(n^2 - n)\abs{c_n}^2 = 4\pi^2\sum_{n \in \Z}n(n - 1)\abs{c_n}^2 \ge 0,$$
car $n(n-1) \ge 0$ pour tout entier $n$.

**Étape 5 (cas d'égalité)**　$n(n - 1) = 0 \iff n \in \{0, 1\}$. L'égalité a donc lieu si et seulement si $c_n = 0$ pour tout $n \notin \{0, 1\}$. Dans ce cas, $z$ et $c_0 + c_1e_1$ sont continues et ont les mêmes coefficients ; d'après {@fr:unicite-fourier}, $z(t) = c_0 + c_1\e^{\ii t}$ : c'est le cercle de centre $c_0$ et de rayon $\abs{c_1} = \frac{L}{2\pi}$. Réciproquement, pour un cercle $z = c_0 + c_1e_1$, seuls $c_0$ et $c_1$ peuvent être non nuls, la somme de l'étape 4 est nulle et l'égalité a lieu.
:::

::: thm id=weyl zh="Weyl 等分布定理" en="Weyl's equidistribution theorem" fr="Théorème d'équirépartition de Weyl" ru="Теорема Вейля о равномерном распределении" lvl=2
记 $\{x\} = x - E(x)$ 为 $x$ 的小数部分。实数列 $(x_n)_{n \ge 1}$ 称为模 $1$ **等分布**，如果对每个区间 $[a, b] \subset [0, 1]$，
$$\frac1N\#\{1 \le n \le N : \{x_n\} \in [a,b]\} \xrightarrow[N \to \infty]{} b - a.$$
**Weyl 判别准则**：$(x_n)$ 模 $1$ 等分布，当且仅当对每个整数 $k \ne 0$，
$$\frac{1}{N}\sum_{n=1}^N \e^{2\pi\ii k x_n} \xrightarrow[N\to\infty]{} 0.$$
推论：若 $\alpha$ 是无理数，则 $(n\alpha)_{n \ge 1}$ 模 $1$ 等分布。
:::

::: fr
On note $\{x\} = x - E(x)$ la partie fractionnaire de $x$. Une suite réelle $(x_n)_{n \ge 1}$ est dite **équirépartie modulo $1$** si pour tout intervalle $[a, b] \subset [0, 1]$,
$$\frac1N\#\{1 \le n \le N : \{x_n\} \in [a,b]\} \xrightarrow[N \to \infty]{} b - a.$$
**Critère de Weyl** : $(x_n)$ est équirépartie modulo $1$ si et seulement si, pour tout entier $k \ne 0$,
$$\frac{1}{N}\sum_{n=1}^N \e^{2\pi\ii k x_n} \xrightarrow[N\to\infty]{} 0.$$
Corollaire : si $\alpha$ est irrationnel, la suite $(n\alpha)_{n \ge 1}$ est équirépartie modulo $1$.
:::

::: sketch
▷ 思路：等分布说的是「对区间的指示函数 $\chi$，$\frac1N\sum\chi(x_n) \to \int_0^1\chi$」，Weyl 条件说的是「对 $\e^{2\pi\ii kx}$ 同样成立」。两者之间的桥梁是 $1$ 周期连续函数：从指数函数到连续函数用 Fejér 定理（稠密性），从连续函数到指示函数用上下夹逼；反方向用阶梯函数逼近。

记 $\mu_N(h) = \frac1N\sum_{n=1}^N h(x_n)$，$h$ 为 $1$ 周期函数。

**(⇐) 第 1 步（三角多项式）**　若 $P(x) = \sum_{\abs k \le K}\alpha_k\e^{2\pi\ii kx}$，则 $\mu_N(P) = \alpha_0 + \sum_{k \ne 0}\alpha_k\,\mu_N(\e^{2\pi\ii k\cdot}) \to \alpha_0 = \int_0^1 P$。

**第 2 步（连续函数）**　设 $g$ 是 $1$ 周期连续函数，$\eps > 0$。对 $t \mapsto g\big(\frac{t}{2\pi}\big) \in \Cc_{2\pi}$ 用 {@trig-dense}，得到上面形式的 $P$ 使 $\norm{g - P}_\infty \le \eps$。于是
$$\Big|\mu_N(g) - \int_0^1 g\Big| \le \mu_N(\abs{g - P}) + \Big|\mu_N(P) - \int_0^1 P\Big| + \int_0^1\abs{P - g} \le 2\eps + \Big|\mu_N(P) - \int_0^1 P\Big|,$$
由第 1 步，$N$ 充分大时 $\le 3\eps$。

**第 3 步（区间）**　设 $[a, b] \subset [0, 1]$，$\chi(x) = \mathbf{1}_{[a,b]}(\{x\})$，$\eps \in\, ]0, \frac14[$。（常规构造：梯形函数。）取 $1$ 周期连续函数 $g_- \le \chi \le g_+$：$g_+(x) = \max\big(0, 1 - \frac1\eps\operatorname{dist}(x, [a,b] + \Z)\big)$；$b - a > 2\eps$ 时 $g_-$ 在 $[a + \eps, b - \eps]$ 上为 $1$、在 $]a, b[$ 之外为 $0$、中间线性，否则 $g_- = 0$。则 $\int_0^1 g_+ \le b - a + 2\eps$，$\int_0^1 g_- \ge b - a - 2\eps$。由 $\mu_N(g_-) \le \mu_N(\chi) \le \mu_N(g_+)$ 和第 2 步，
$$b - a - 2\eps \le \liminf_N\mu_N(\chi) \le \limsup_N\mu_N(\chi) \le b - a + 2\eps.$$
$\eps$ 任意，所以 $\mu_N(\chi) \to b - a$。

**(⇒)**　由等分布与线性，$\mu_N(h) \to \int_0^1 h$ 对 $[0,1[$ 上的阶梯函数（周期延拓）成立（单点 $\{c\} = [c, c]$ 的频率趋于 $0$，所以开闭端点无关）。对 $1$ 周期连续函数 $g$，用阶梯函数一致逼近（{@escalier}）并作 $\eps/3$ 论证；最后取 $g(x) = \cos 2\pi kx$ 与 $\sin 2\pi kx$。

**推论**　设 $\alpha \notin \Q$，$k \ne 0$。则 $k\alpha \notin \Z$，$q = \e^{2\pi\ii k\alpha} \ne 1$，几何级数求和给出
$$\Big|\frac1N\sum_{n=1}^N \e^{2\pi\ii kn\alpha}\Big| = \frac1N\Big|q\,\frac{q^N - 1}{q - 1}\Big| \le \frac1N\cdot\frac{2}{\abs{1 - \e^{2\pi\ii k\alpha}}} \xrightarrow[N \to \infty]{} 0.$$
由 Weyl 判别准则，$(n\alpha)$ 模 $1$ 等分布。
:::

::: fr
▷ Méthode : l'équirépartition dit que « pour l'indicatrice $\chi$ d'un intervalle, $\frac1N\sum\chi(x_n) \to \int_0^1\chi$ », le critère de Weyl dit la même chose pour $\e^{2\pi\ii kx}$. Le pont entre les deux est la classe des fonctions continues $1$-périodiques : des exponentielles aux fonctions continues par le théorème de Fejér (densité), des fonctions continues aux indicatrices par encadrement ; dans l'autre sens, par approximation par des fonctions en escalier.

Notons $\mu_N(h) = \frac1N\sum_{n=1}^N h(x_n)$ pour $h$ $1$-périodique.

**(⇐) Étape 1 (polynômes trigonométriques)**　Si $P(x) = \sum_{\abs k \le K}\alpha_k\e^{2\pi\ii kx}$, alors $\mu_N(P) = \alpha_0 + \sum_{k \ne 0}\alpha_k\,\mu_N(\e^{2\pi\ii k\cdot}) \to \alpha_0 = \int_0^1 P$.

**Étape 2 (fonctions continues)**　Soit $g$ continue $1$-périodique et $\eps > 0$. En appliquant {@fr:trig-dense} à $t \mapsto g\big(\frac{t}{2\pi}\big) \in \Cc_{2\pi}$, on obtient $P$ de la forme précédente avec $\norm{g - P}_\infty \le \eps$. Alors
$$\Big|\mu_N(g) - \int_0^1 g\Big| \le \mu_N(\abs{g - P}) + \Big|\mu_N(P) - \int_0^1 P\Big| + \int_0^1\abs{P - g} \le 2\eps + \Big|\mu_N(P) - \int_0^1 P\Big|,$$
qui est $\le 3\eps$ pour $N$ assez grand d'après l'étape 1.

**Étape 3 (intervalles)**　Soit $[a, b] \subset [0, 1]$, $\chi(x) = \mathbf{1}_{[a,b]}(\{x\})$ et $\eps \in\, ]0, \frac14[$. (Construction de routine : fonctions trapèzes.) On choisit des fonctions continues $1$-périodiques $g_- \le \chi \le g_+$ : $g_+(x) = \max\big(0, 1 - \frac1\eps\operatorname{dist}(x, [a,b] + \Z)\big)$ ; si $b - a > 2\eps$, $g_-$ vaut $1$ sur $[a + \eps, b - \eps]$, $0$ hors de $]a, b[$ et est affine entre les deux ; sinon $g_- = 0$. Alors $\int_0^1 g_+ \le b - a + 2\eps$ et $\int_0^1 g_- \ge b - a - 2\eps$. Comme $\mu_N(g_-) \le \mu_N(\chi) \le \mu_N(g_+)$, l'étape 2 donne
$$b - a - 2\eps \le \liminf_N\mu_N(\chi) \le \limsup_N\mu_N(\chi) \le b - a + 2\eps.$$
$\eps$ étant arbitraire, $\mu_N(\chi) \to b - a$.

**(⇒)**　Par équirépartition et linéarité, $\mu_N(h) \to \int_0^1 h$ pour toute fonction en escalier sur $[0, 1[$ (prolongée par périodicité) : un point $\{c\} = [c, c]$ a une fréquence qui tend vers $0$, donc la nature des extrémités est sans importance. Pour $g$ continue $1$-périodique, on approche uniformément $g$ par des fonctions en escalier ({@fr:escalier}) et on fait un argument en $\eps/3$ ; on prend enfin $g(x) = \cos 2\pi kx$ et $\sin 2\pi kx$.

**Corollaire**　Soit $\alpha \notin \Q$ et $k \ne 0$. Alors $k\alpha \notin \Z$, donc $q = \e^{2\pi\ii k\alpha} \ne 1$, et la somme géométrique donne
$$\Big|\frac1N\sum_{n=1}^N \e^{2\pi\ii kn\alpha}\Big| = \frac1N\Big|q\,\frac{q^N - 1}{q - 1}\Big| \le \frac1N\cdot\frac{2}{\abs{1 - \e^{2\pi\ii k\alpha}}} \xrightarrow[N \to \infty]{} 0.$$
D'après le critère de Weyl, $(n\alpha)$ est équirépartie modulo $1$.
:::

::: rem
**无理性不能去掉。** 若 $\alpha = \frac pq$（$q \ge 1$），则 $\{n\alpha\}$ 只取 $\{0, \frac1q, \dots, \frac{q-1}{q}\}$ 中的值，区间 $\big[\frac{1}{3q}, \frac{2}{3q}\big]$ 不含任何 $\{n\alpha\}$，频率为 $0 \ne \frac{1}{3q}$。对应地，取 $k = q$，$\e^{2\pi\ii qn\alpha} = 1$，Weyl 和恒等于 $1$。
:::

::: q
$2^n$（$n \ge 1$）的十进制首位数字是 $7$ 的频率是多少？
:::

::: ans
$2^n$ 的首位是 $d$，当且仅当存在整数 $m$ 使 $d\cdot 10^m \le 2^n < (d+1)\cdot 10^m$，即 $\log_{10}d \le \{n\log_{10}2\} < \log_{10}(d + 1)$。$\log_{10}2$ 是无理数（若 $\log_{10}2 = \frac ab$，则 $2^b = 10^a$，但右边被 $5$ 整除而左边不能）。由 Weyl 定理（半开区间与闭区间只差一个点，频率相同），频率为 $\log_{10}\frac{d+1}{d}$；$d = 7$ 时为 $\log_{10}\frac87 \approx 0.058$。这就是 **Benford 定律**的一个严格版本。
:::

::: rem zh="热方程"
Fourier 的原始问题：$[0, \pi]$ 上的杆，两端温度为 $0$，初始温度 $f$。热方程 $\partial_t u = \partial_{xx} u$ 的分离变量解为
$$u(t, x) = \sum_{n \ge 1} b_n\,\e^{-n^2 t}\sin nx,$$
其中 $b_n$ 是 $f$ 的奇延拓的 Fourier 系数。对 $t \ge t_0 > 0$，$\abs{n^k b_n\e^{-n^2 t}} \le 2\norm f_\infty\,n^k\e^{-n^2 t_0}$，右边可和，所以由 {@c5-regularite} 第 2 条的论证，级数及其对 $x$、对 $t$ 的各阶导数都正规收敛，$u$ 是光滑的，即使 $f$ 不连续。$\R$ 上的版本由 $f$ 与 Gauss 型热核的卷积给出，研究它的工具正是第 7 章的含参积分。
:::

## 收敛的边界

Fejér 定理说连续函数的 Fourier 级数「Cesàro 可和」；Dirichlet 定理要求分段 $\Cc^1$。两者之间的空隙是真实存在的：仅有连续性，部分和可以发散。本节先给出发散的「定量原因」（Lebesgue 常数无界），再陈述几个只能从文献中查证的深刻结果。

::: prop id=c5-lebesgue zh="Lebesgue 常数的下界" en="Lower bound for the Lebesgue constants" fr="Minoration des constantes de Lebesgue" ru="Оценка снизу констант Лебега" lvl=2
**Lebesgue 常数** $L_N = \dfrac{1}{2\pi}\displaystyle\int_{-\pi}^{\pi}\abs{D_N(t)}\,\dd t$ 满足
$$L_N \ge \frac{4}{\pi^2}\sum_{k=1}^N\frac1k \ge \frac{4}{\pi^2}\ln(N + 1) \xrightarrow[N \to \infty]{} +\infty.$$
:::

::: fr
Les **constantes de Lebesgue** $L_N = \dfrac{1}{2\pi}\displaystyle\int_{-\pi}^{\pi}\abs{D_N(t)}\,\dd t$ vérifient
$$L_N \ge \frac{4}{\pi^2}\sum_{k=1}^N\frac1k \ge \frac{4}{\pi^2}\ln(N + 1) \xrightarrow[N \to \infty]{} +\infty.$$
:::

::: sketch
▷ 思路：用 $\abs{\sin\frac t2} \le \frac{\abs t}{2}$ 把 $\abs{D_N}$ 换成 $\frac{2\abs{\sin((N + 1/2)t)}}{t}$，换元后在每个长为 $\pi$ 的区间上分别估计，得到调和级数。

**第 1 步（化简）**　$D_N$ 是偶函数，$L_N = \frac1\pi\int_0^\pi\abs{D_N}$。对 $0 < t \le \pi$，$0 < \sin\frac t2 \le \frac t2$，所以 $\abs{D_N(t)} \ge \frac{2\abs{\sin((N + \frac12)t)}}{t}$。

**第 2 步（换元）**　令 $u = (N + \frac12)t$：
$$L_N \ge \frac2\pi\int_0^\pi\frac{\abs{\sin((N + \frac12)t)}}{t}\,\dd t = \frac2\pi\int_0^{(N + \frac12)\pi}\frac{\abs{\sin u}}{u}\,\dd u \ge \frac2\pi\sum_{k=0}^{N-1}\int_{k\pi}^{(k+1)\pi}\frac{\abs{\sin u}}{u}\,\dd u.$$

**第 3 步（逐段估计）**　在 $[k\pi, (k+1)\pi]$ 上 $\frac1u \ge \frac{1}{(k+1)\pi}$，且 $\int_{k\pi}^{(k+1)\pi}\abs{\sin u}\,\dd u = 2$。所以 $L_N \ge \frac2\pi\sum_{k=0}^{N-1}\frac{2}{(k+1)\pi} = \frac{4}{\pi^2}\sum_{k=1}^N\frac1k$。

**第 4 步（调和级数）**　$\frac1k \ge \int_k^{k+1}\frac{\dd t}{t}$（{@serie-integrale}），求和得 $\sum_{k=1}^N\frac1k \ge \ln(N + 1)$。
:::

::: fr
▷ Méthode : l'inégalité $\abs{\sin\frac t2} \le \frac{\abs t}{2}$ permet de remplacer $\abs{D_N}$ par $\frac{2\abs{\sin((N + 1/2)t)}}{t}$ ; après changement de variable, on minore sur chaque intervalle de longueur $\pi$ et la série harmonique apparaît.

**Étape 1 (réduction)**　$D_N$ est paire, donc $L_N = \frac1\pi\int_0^\pi\abs{D_N}$. Pour $0 < t \le \pi$, $0 < \sin\frac t2 \le \frac t2$, donc $\abs{D_N(t)} \ge \frac{2\abs{\sin((N + \frac12)t)}}{t}$.

**Étape 2 (changement de variable)**　Avec $u = (N + \frac12)t$ :
$$L_N \ge \frac2\pi\int_0^\pi\frac{\abs{\sin((N + \frac12)t)}}{t}\,\dd t = \frac2\pi\int_0^{(N + \frac12)\pi}\frac{\abs{\sin u}}{u}\,\dd u \ge \frac2\pi\sum_{k=0}^{N-1}\int_{k\pi}^{(k+1)\pi}\frac{\abs{\sin u}}{u}\,\dd u.$$

**Étape 3 (minoration morceau par morceau)**　Sur $[k\pi, (k+1)\pi]$, $\frac1u \ge \frac{1}{(k+1)\pi}$ et $\int_{k\pi}^{(k+1)\pi}\abs{\sin u}\,\dd u = 2$. Donc $L_N \ge \frac2\pi\sum_{k=0}^{N-1}\frac{2}{(k+1)\pi} = \frac{4}{\pi^2}\sum_{k=1}^N\frac1k$.

**Étape 4 (série harmonique)**　$\frac1k \ge \int_k^{k+1}\frac{\dd t}{t}$ ({@fr:serie-integrale}) ; en sommant, $\sum_{k=1}^N\frac1k \ge \ln(N + 1)$.
:::

::: rem
更精确地，$L_N = \frac{4}{\pi^2}\ln N + O(1)$（数值上 $L_N - \frac{4}{\pi^2}\ln N \to 1.27\ldots$；例如 $L_{10} \approx 2.223$，$L_{200} \approx 3.419$）。$L_N$ 正是线性泛函 $f \mapsto S_N f(0)$ 在 $(\Cc_{2\pi}, \norm\cdot_\infty)$ 上的算子范数（{@norme-subordonnee}），见下面的「想一想」。
:::

::: thm id=du-bois-reymond zh="du Bois-Reymond 反例" en="du Bois-Reymond's counterexample" fr="Contre-exemple de du Bois-Reymond" ru="Пример дю Буа-Реймона" lvl=3 ref="Katznelson, *An Introduction to Harmonic Analysis*，第 II 章"
存在连续的 $2\pi$ 周期函数，其 Fourier 级数在某一点发散（1873）。由 Baire 定理还可以证明：这样的函数在 $\Cc(\T)$ 中构成稠密 $G_\delta$ 集（Banach–Steinhaus 定理的应用，见 {@baire}）。
:::

::: fr
Il existe une fonction continue $2\pi$-périodique dont la série de Fourier diverge en un point (1873). Grâce au théorème de Baire, on montre même que ces fonctions forment un $G_\delta$ dense de $\Cc(\T)$ (application du théorème de Banach–Steinhaus, voir {@fr:baire}).
:::

::: q
为什么 $L_N \to \infty$ 「迫使」存在 Fourier 级数在 $0$ 处发散的连续函数？
:::

::: ans
线性泛函 $\Phi_N(f) = S_N f(0) = \frac{1}{2\pi}\int_{-\pi}^{\pi}f(t)D_N(t)\,\dd t$（用了 $D_N$ 是偶函数）满足 $\abs{\Phi_N(f)} \le L_N\norm f_\infty$；取连续函数 $f$ 逼近 $\operatorname{sgn}D_N$（只在 $D_N$ 的有限个零点附近修改），可以使 $\abs{\Phi_N(f)}$ 任意接近 $L_N$，所以 $\Phi_N$ 的算子范数恰为 $L_N$。**一致有界原理**（Banach–Steinhaus，Baire 定理 {@baire} 的推论）说：若对每个 $f \in \Cc_{2\pi}$，$\sup_N\abs{\Phi_N(f)} < \infty$，则 $\sup_N L_N < \infty$。这与 {@c5-lebesgue} 矛盾，所以必有某个连续 $f$ 使 $(S_N f(0))$ 无界，从而发散。这个论证只证明存在性，不构造函数。
:::

::: thm id=kolmogorov-carleson zh="Kolmogorov 与 Carleson 定理" en="Kolmogorov's and Carleson's theorems" fr="Théorèmes de Kolmogorov et de Carleson" ru="Теоремы Колмогорова и Карлесона" lvl=3 ref="Kolmogorov (1926)；Carleson, *Acta Math.* 116 (1966)；Grafakos, *Classical Fourier Analysis*"
Kolmogorov（1926）：存在 $L^1$ 函数，其 Fourier 级数**处处**发散。Carleson（1966）：$L^2$ 函数（特别是连续函数）的 Fourier 级数**几乎处处**收敛。Hunt（1968）推广到 $L^p$，$p > 1$。
:::

::: fr
Kolmogorov (1926) : il existe une fonction de $L^1$ dont la série de Fourier diverge **partout**. Carleson (1966) : la série de Fourier d'une fonction de $L^2$ (en particulier d'une fonction continue) converge **presque partout**. Hunt (1968) a étendu ce résultat à $L^p$, $p > 1$.
:::

::: open zh="未解决问题"
**$\big(\frac32\big)^n$ 模 $1$ 的分布。** 数列 $\{(3/2)^n\}$（小数部分）在 $[0, 1]$ 中是否稠密？是否等分布？都未知。已知对几乎所有 $\alpha > 1$，$(\alpha^n)$ 模 $1$ 等分布（Koksma，1935），但对 $\frac32$、$\e$、$\pi$ 这样的具体数都无法判断。（反过来，黄金分割比 $\varphi$ 这类 Pisot 数满足 $\{\varphi^n\} \to 0$ 或 $1$，可以判定不等分布。）与之相关的是 **Mahler 的 Z 数问题**：是否存在 $\xi > 0$，使 $\{\xi(3/2)^n\} \in [0, \frac12[$ 对一切 $n$ 成立？
:::

## 方法总结

本章的方法按「想证明什么」归类如下。

**如何计算 Fourier 系数**

1. 先看奇偶性：偶函数只算 $a_n$，奇函数只算 $b_n$，并化成 $[0, \pi]$ 上积分的两倍（{@coef-proprietes} 第 1 条）；积分区间可以换成任何一个周期（{@c5-periode}）。
2. 优先算复系数 $c_n$：被积函数是 $f(t)\e^{-\ii nt}$，通常分部积分一次就够（{@c5-ex-scie}），再用 {@c5-forme-reelle} 换成 $a_n, b_n$。
3. 若已知 $f'$ 的系数：$f$ 连续且分段 $\Cc^1$ 时 $c_n(f) = \frac{c_n(f')}{\ii n}$（{@coef-proprietes} 第 2 条）；$f$ 有跳跃时要加跳跃项（§1 的「想一想」）。例：三角波由方波得到（{@c5-ex-triangle}）。
4. 三角多项式（如 $\cos^3x$）直接展开成 $\e^{\ii nx}$ 的组合，读出系数，不必积分（{@orthonormal} 第 3 条）。
5. 检验：$c_n \to 0$（{@riemann-lebesgue}）；$\sum\abs{c_n}^2 = \norm f_2^2$（{@parseval}）；衰减速度与光滑性相符（{@c5-regularite}）。

**如何判断 Fourier 级数的收敛**

1. 均方收敛：对一切 $f \in \mathcal{CM}_{2\pi}$ 成立（{@parseval}），无需验证。
2. 逐点收敛：$f$ 分段 $\Cc^1$ ⟹ $S_N f(x) \to \frac12\big(f(x^+) + f(x^-)\big)$（{@dirichlet-fourier}）；只在 $x$ 附近正则也够（{@c5-localisation}）；更弱的条件见 {@c5-dini-jordan}。
3. 一致收敛：$f$ 连续且分段 $\Cc^1$ ⟹ 正规收敛（{@cv-normale-fourier}）；或直接验证 $\sum\abs{c_n} < \infty$。
4. 只需要平均值收敛：$f$ 连续 ⟹ $\sigma_N f$ 一致收敛（{@fejer}）。

**如何证明「不成立」**

1. 否定一致收敛：先用 Dirichlet 定理求出逐点极限，若它不连续，而部分和连续，则收敛不一致（{@cont-limite-unif}）；或直接在跳跃点附近计算 $\sup\abs{S_N f - f}$（{@gibbs}）。
2. 否定「$(\gamma_n)$ 是某个 $f \in \mathcal{CM}_{2\pi}$ 的系数」：$\sum\abs{\gamma_n}^2 = \infty$ 时用 Bessel 不等式（§2 的「想一想」）；否则看 Fejér 平均是否有界（{@c5-cex-riesz-fischer}）。
3. 否定「连续 ⟹ 部分和收敛」：Lebesgue 常数无界（{@c5-lebesgue}）与 du Bois-Reymond 反例（{@du-bois-reymond}）。

**如何用 Fourier 级数求数值级数的和**

1. 选一个系数含 $\frac{1}{n^p}$ 的函数，在连续点用 Dirichlet 定理取特殊值（{@bale} (c)；§6 的「想一想」：Leibniz 级数）。
2. 用 Parseval 恒等式得到 $\sum\abs{c_n}^2$（{@bale} (a)(b)；§4 的「想一想」）。
3. 奇偶分开：$\sum_{n\ \text{偶}}\frac{1}{n^p} = 2^{-p}\zeta(p)$，由奇数项之和解出 $\zeta(p)$。

::: rem zh="常见错误"
1. 「$f$ 连续 ⟹ Fourier 级数收敛到 $f$」：错。连续只保证 $\sigma_N f \to f$（{@fejer}）；$S_N f$ 可以在某点发散（{@du-bois-reymond}）。
2. 对不连续的函数用 $c_n(f') = \ii n\,c_n(f)$：方波 $f_1' = 0$（几乎处处），但 $c_n(f_1) \ne 0$。
3. 在跳跃点写 $S_N f(x) \to f(x)$：极限是左右极限的平均，与 $f(x)$ 的取值无关（{@dirichlet-fourier} 后的注）。
4. Parseval 实形式中把 $\frac{\abs{a_0}^2}{4}$ 写成 $\frac{\abs{a_0}^2}{2}$（常数项是 $\frac{a_0}{2}$）。
5. 「$\sum\abs{c_n} = \infty$ ⟹ 不一致收敛」：错，$\sum_{n \ge 2}\frac{\sin nx}{n\ln n}$ 是反例（{@cv-normale-fourier} 后的注）。
6. 把均方收敛当作逐点收敛：改变 $f$ 在一点的值不改变 $S_N f$（{@parseval} 后的注）。
:::

::: read
- Г. М. Фихтенгольц,《Курс дифференциального и интегрального исчисления》，第 III 卷：«Ряды Фурье»。古典处理最完整的教材之一：Dirichlet 积分、局部化原理、Dini 与 Dirichlet–Jordan 判别法、Fejér 求和、Gibbs 现象都有详细计算，适合查本章每个结论的另一种写法。
- В. А. Зорич,《Математический анализ》，第 II 卷：«Ряд Фурье и преобразование Фурье»。从内积空间与正交系的角度讲 Fourier 级数（与本章 Bessel–Parseval 的路线一致），并自然过渡到 Fourier 变换。
- Б. П. Демидович,《Сборник задач и упражнений по математическому анализу》：«Ряды Фурье»。大量计算系数、用 Parseval 与 Dirichlet 定理求级数和的习题，按难度排列，适合练计算。
- X. Gourdon,《Les maths en tête : Analyse》：« Séries de Fourier »。法国 MP / L2 风格的简洁证明与经典习题（Parseval 的应用、正规收敛、Fejér），写法最接近法国考试的要求。
- E. M. Stein, R. Shakarchi,《Fourier Analysis: An Introduction》（Princeton Lectures in Analysis, I）：convergence of Fourier series; applications (isoperimetric inequality, Weyl equidistribution, heat equation)。本章 §6 的三个应用在这里都有完整而清楚的证明。
- Y. Katznelson,《An Introduction to Harmonic Analysis》：convergence and divergence of Fourier series。du Bois-Reymond 型反例、Kolmogorov 反例与 Banach–Steinhaus 论证的标准参考。
:::

::: glossary
| 中文 | Français | English | Русский |
|---|---|---|---|
| Fourier 系数 | coefficient de Fourier (m.) | Fourier coefficient | коэффициент Фурье |
| Fourier 级数 | série de Fourier (f.) | Fourier series | ряд Фурье |
| 部分和 | somme partielle (f.) | partial sum | частичная сумма |
| 三角多项式 | polynôme trigonométrique (m.) | trigonometric polynomial | тригонометрический многочлен |
| 周期函数 | fonction périodique (f.) | periodic function | периодическая функция |
| 分段连续函数 | fonction continue par morceaux (f.) | piecewise continuous function | кусочно-непрерывная функция |
| 分段 $\Cc^1$ 函数 | fonction de classe $\Cc^1$ par morceaux (f.) | piecewise $C^1$ function | кусочно-гладкая функция |
| 分割 | subdivision (f.) | subdivision, partition | разбиение |
| 单侧极限 | limite à droite / à gauche (f.) | one-sided limit | односторонний предел |
| 跳跃 | saut (m.) | jump | скачок |
| 偶函数 / 奇函数 | fonction paire / impaire (f.) | even / odd function | чётная / нечётная функция |
| 内积 | produit scalaire (m.) | inner product | скалярное произведение |
| 半范数 | semi-norme (f.) | seminorm | полунорма |
| 正交规范族 | famille orthonormale (f.) | orthonormal family | ортонормированная система |
| 正交投影 | projection orthogonale (f.) | orthogonal projection | ортогональная проекция |
| 最佳逼近 | meilleure approximation (f.) | best approximation | наилучшее приближение |
| Bessel 不等式 | inégalité de Bessel (f.) | Bessel's inequality | неравенство Бесселя |
| Parseval 恒等式 | égalité de Parseval (f.) | Parseval's identity | равенство Парсеваля |
| 完备的正交系 | famille orthonormale totale (f.) | complete orthonormal system | полная ортонормированная система |
| Riemann–Lebesgue 引理 | lemme de Riemann–Lebesgue (m.) | Riemann–Lebesgue lemma | лемма Римана — Лебега |
| 阶梯函数 | fonction en escalier (f.) | step function | ступенчатая функция |
| Dirichlet 核 | noyau de Dirichlet (m.) | Dirichlet kernel | ядро Дирихле |
| Fejér 核 | noyau de Fejér (m.) | Fejér kernel | ядро Фейера |
| Cesàro 平均 | moyenne de Cesàro (f.) | Cesàro mean | среднее Чезаро |
| 卷积 | produit de convolution (m.) | convolution | свёртка |
| 逼近单位元 | approximation de l'unité (f.) | approximate identity | аппроксимативная единица |
| 一致连续性 | continuité uniforme (f.) | uniform continuity | равномерная непрерывность |
| 稠密性 | densité (f.) | density | плотность |
| 均方收敛 | convergence en moyenne quadratique (f.) | mean-square convergence | сходимость в среднем квадратичном |
| 逐点收敛 | convergence simple (f.) | pointwise convergence | поточечная сходимость |
| 正规收敛 | convergence normale (f.) | normal convergence | нормальная сходимость |
| Dirichlet 定理 | théorème de Dirichlet (m.) | Dirichlet's theorem | теорема Дирихле |
| 局部化原理 | principe de localisation (m.) | localization principle | принцип локализации |
| 有界变差函数 | fonction à variation bornée (f.) | function of bounded variation | функция ограниченной вариации |
| Gibbs 现象 | phénomène de Gibbs (m.) | Gibbs phenomenon | явление Гиббса |
| Lebesgue 常数 | constante de Lebesgue (f.) | Lebesgue constant | константа Лебега |
| 方波 | signal créneau (m.) | square wave | прямоугольная волна (меандр) |
| 锯齿波 | signal en dents de scie (m.) | sawtooth wave | пилообразная функция |
| 等周不等式 | inégalité isopérimétrique (f.) | isoperimetric inequality | изопериметрическое неравенство |
| 等分布 | équirépartition (f.) | equidistribution | равномерное распределение |
| Weyl 判别准则 | critère de Weyl (m.) | Weyl's criterion | критерий Вейля |
| 热方程 | équation de la chaleur (f.) | heat equation | уравнение теплопроводности |
| 取极限 | passer à la limite | pass to the limit | перейти к пределу |
| 分部积分 | intégrer par parties | integrate by parts | интегрировать по частям |
:::
