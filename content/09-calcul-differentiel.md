一元函数的导数是一个数；多元函数的「导数」是一个**线性映射**，即最好的线性近似。本章按法国大纲的方式，在有限维赋范空间之间讨论可微性，然后落到 $\R^n$ 的坐标计算（偏导数、Jacobi 矩阵、梯度）。全章 $E, F$ 是有限维实赋范空间（由 {@equiv-dimfinie}，范数的选取不影响任何结论），$U \subset E$ 是开集，$f : U \to F$。

记号：$B(a, r)$、$\overline B(a, r)$ 分别是开球与闭球；$\Lin(E, F)$ 是 $E$ 到 $F$ 的线性映射空间，由 {@cor-dimfinie}，其中每个映射都连续，带算子范数 $\norm{L} = \sup_{\norm h = 1}\norm{L(h)}$（{@norme-subordonnee}），于是 $\norm{L(h)} \le \norm L\,\norm h$。在 $\R^n$ 上常用 $\norm{h}_\infty = \max_j\abs{h_j}$ 或 Euclid 范数 $\norm h_2$；不加说明时哪一个都可以。

## 多元函数的极限与连续

多元函数的极限与连续已经在第 1 章定义。这一节先把定义写成量词形式，然后强调两个容易出错的现象（沿直线趋近不够；累次极限不等于重极限），最后给出证明连续与证明不连续的常用工具。

::: rem
**回顾。** 设 $A \subset E$，$a$ 是 $A$ 的闭包中的点，$f : A \to F$，$\ell \in F$。$\lim_{x \to a} f(x) = \ell$ 的意思是
$$\forall \eps > 0,\ \exists \delta > 0,\ \forall x \in A,\quad \norm{x - a} < \delta \implies \norm{f(x) - \ell} < \eps.$$
当 $a \in A$ 且 $\ell = f(a)$ 时，这就是 $f$ 在 $a$ 连续。若只考虑 $x \ne a$（即在 $A \setminus \{a\}$ 上取极限），就是「去心极限」。和一元情形的本质区别是：$x$ 可以从**无穷多个方向、沿任意曲线**趋于 $a$，条件必须对所有这些方式**同时**成立。
:::

::: lem id=c9-lem-chemins zh="沿路径的极限" en="Limits along paths" fr="Limite le long d'un chemin" ru="Предел вдоль пути" lvl=1
设 $f : A \to F$，$\lim_{x \to a} f(x) = \ell$。若 $\gamma : \,]0, 1] \to A$ 满足 $\gamma(t) \xrightarrow[t \to 0^{+}]{} a$，则 $f(\gamma(t)) \xrightarrow[t \to 0^{+}]{} \ell$。

逆否形式：若存在两条这样的路径 $\gamma_1, \gamma_2$，使 $f \circ \gamma_1$ 与 $f \circ \gamma_2$ 的极限不同（或其中一个没有极限），则 $f$ 在 $a$ 没有极限。
:::

::: fr
Soit $f : A \to F$ telle que $\lim_{x \to a} f(x) = \ell$. Si $\gamma : \,]0, 1] \to A$ vérifie $\gamma(t) \xrightarrow[t \to 0^{+}]{} a$, alors $f(\gamma(t)) \xrightarrow[t \to 0^{+}]{} \ell$.

Par contraposée : s'il existe deux tels chemins $\gamma_1, \gamma_2$ pour lesquels $f \circ \gamma_1$ et $f \circ \gamma_2$ ont des limites différentes (ou l'une n'a pas de limite), alors $f$ n'a pas de limite en $a$.
:::

::: proof
▷ 思路：这是「极限的复合」：$t \to 0^+$ 推出 $\gamma(t) \to a$，再推出 $f(\gamma(t)) \to \ell$。我们要证：对任意 $\eps > 0$，存在 $\tau > 0$，使对一切 $t \in \,]0, \tau[$，$\norm{f(\gamma(t)) - \ell} < \eps$。

**第 1 步（翻译关于 $f$ 的假设）**　设 $\eps > 0$。由 $\lim_{x \to a}f(x) = \ell$，存在 $\delta > 0$，使对一切 $x \in A$，$\norm{x - a} < \delta \implies \norm{f(x) - \ell} < \eps$。

**第 2 步（翻译关于 $\gamma$ 的假设）**　把上一步的 $\delta$ 当作「$\eps$」用于 $\gamma(t) \to a$：存在 $\tau > 0$，使对一切 $t \in \,]0, \tau[$，$\norm{\gamma(t) - a} < \delta$。

**第 3 步（合并）**　对 $t \in \,]0, \tau[$，$x = \gamma(t) \in A$ 满足 $\norm{x - a} < \delta$，由第 1 步，$\norm{f(\gamma(t)) - \ell} < \eps$。

这就证明了 $f(\gamma(t)) \to \ell$。逆否形式：若 $f$ 在 $a$ 有极限 $\ell$，则沿任何路径的极限都存在且都等于 $\ell$；所以两条路径给出不同的极限（或某条路径上没有极限）时，$f$ 在 $a$ 没有极限。
:::

::: fr
▷ Méthode : c'est une composition de limites : $t \to 0^+$ entraîne $\gamma(t) \to a$, qui entraîne $f(\gamma(t)) \to \ell$. On veut montrer que pour tout $\eps > 0$, il existe $\tau > 0$ tel que pour tout $t \in \,]0, \tau[$, $\norm{f(\gamma(t)) - \ell} < \eps$.

**Étape 1 (on traduit l'hypothèse sur $f$)**　Soit $\eps > 0$. Puisque $\lim_{x \to a}f(x) = \ell$, il existe $\delta > 0$ tel que pour tout $x \in A$, $\norm{x - a} < \delta \implies \norm{f(x) - \ell} < \eps$.

**Étape 2 (on traduit l'hypothèse sur $\gamma$)**　On applique la définition de $\gamma(t) \to a$ avec « $\eps$ » $= \delta$ : il existe $\tau > 0$ tel que pour tout $t \in \,]0, \tau[$, $\norm{\gamma(t) - a} < \delta$.

**Étape 3 (conclusion)**　Pour $t \in \,]0, \tau[$, le point $x = \gamma(t) \in A$ vérifie $\norm{x - a} < \delta$, donc d'après l'étape 1, $\norm{f(\gamma(t)) - \ell} < \eps$.

Ainsi $f(\gamma(t)) \to \ell$. Pour la contraposée : si $f$ admet la limite $\ell$ en $a$, alors la limite le long de tout chemin existe et vaut $\ell$ ; si deux chemins donnent des limites différentes (ou si l'une n'existe pas), $f$ n'a donc pas de limite en $a$.
:::

::: cex id=cex-limite-droites lvl=1
**沿所有直线趋近并不足够。** 令 $f(x, y) = \dfrac{xy^2}{x^2 + y^4}$（$(x, y) \ne (0, 0)$），$f(0,0) = 0$。

1. 沿直线 $y = mx$（$x \ne 0$）：$f(x, mx) = \dfrac{m^2x^3}{x^2 + m^4x^4} = \dfrac{m^2x}{1 + m^4x^2} \xrightarrow[x \to 0]{} 0$。
2. 沿直线 $x = 0$（$y \ne 0$）：$f(0, y) = 0$。
3. 沿抛物线 $x = y^2$（$y \ne 0$）：$f(y^2, y) = \dfrac{y^4}{y^4 + y^4} = \dfrac12$。

取路径 $\gamma_1(t) = (t, 0)$ 与 $\gamma_2(t) = (t^2, t)$，它们都趋于 $(0, 0)$，但 $f \circ \gamma_1 \to 0$，$f \circ \gamma_2 \to \frac12$。由 {@c9-lem-chemins}，$f$ 在原点没有极限，所以不连续——尽管沿每条过原点的直线，$f$ 都趋于 $f(0,0) = 0$。

用极坐标看：$f(r\cos\theta, r\sin\theta) = \dfrac{r\cos\theta\sin^2\theta}{\cos^2\theta + r^2\sin^4\theta}$。对每个固定的 $\theta$，它在 $r \to 0$ 时趋于 $0$；但趋近的速度依赖于 $\theta$（$\theta$ 越接近 $\frac\pi2$ 越慢），所以不能找到与 $\theta$ 无关的上界。
:::

::: cex lvl=1
**累次极限存在且相等，重极限也可能不存在。** 令 $g(x, y) = \dfrac{xy}{x^2 + y^2}$（$(x, y) \ne (0, 0)$）。

1. 固定 $x \ne 0$：$g(x, y) \xrightarrow[y \to 0]{} \dfrac{0}{x^2} = 0$，所以 $\lim_{x \to 0}\lim_{y \to 0}g(x, y) = 0$；把 $x, y$ 对调，另一个累次极限也是 $0$。
2. 沿 $\gamma_1(t) = (t, 0)$：$g = 0$；沿 $\gamma_2(t) = (t, t)$：$g(t, t) = \dfrac{t^2}{2t^2} = \dfrac12$。

由 {@c9-lem-chemins}，$g$ 在原点没有极限。
:::

::: rem
**反方向也不成立：重极限存在，累次极限可以不存在。** 令 $h(x, y) = x\sin\frac1y$（$y \ne 0$），$h(x, 0) = 0$。由 $\abs{h(x, y)} \le \abs x \le \norm{(x, y)}_\infty$，$\lim_{(x,y) \to (0,0)}h(x, y) = 0$。但对固定的 $x \ne 0$，$y \mapsto x\sin\frac1y$ 在 $y \to 0$ 时没有极限（取 $y_m = \frac{1}{m\pi}$ 得 $0$，取 $y_m = \frac{1}{2m\pi + \pi/2}$ 得 $x$），所以 $\lim_{x \to 0}\lim_{y \to 0}h(x, y)$ 无意义。
:::

::: lem id=c9-lem-polaire zh="极坐标判别法" en="Polar coordinates criterion" fr="Critère en coordonnées polaires" ru="Критерий в полярных координатах" lvl=1
设 $r_0 > 0$，$f$ 定义在 $B(0, r_0) \setminus \{0\} \subset \R^2$ 上（Euclid 范数），$\ell \in F$。若存在函数 $\eps : \,]0, r_0[ \to \R_+$，满足 $\eps(r) \xrightarrow[r \to 0^{+}]{} 0$，并且
$$\forall r \in \,]0, r_0[,\ \forall \theta \in \R,\qquad \norm{f(r\cos\theta, r\sin\theta) - \ell} \le \eps(r),$$
则 $\lim_{(x, y) \to (0, 0)} f(x, y) = \ell$。关键是上界 $\eps(r)$ **与 $\theta$ 无关**。
:::

::: fr
Soit $r_0 > 0$ et $f$ définie sur $B(0, r_0) \setminus \{0\} \subset \R^2$ (norme euclidienne), et $\ell \in F$. S'il existe une fonction $\eps : \,]0, r_0[ \to \R_+$ telle que $\eps(r) \xrightarrow[r \to 0^{+}]{} 0$ et
$$\forall r \in \,]0, r_0[,\ \forall \theta \in \R,\qquad \norm{f(r\cos\theta, r\sin\theta) - \ell} \le \eps(r),$$
alors $\lim_{(x, y) \to (0, 0)} f(x, y) = \ell$. Le point essentiel est que la majoration $\eps(r)$ **ne dépend pas de $\theta$**.
:::

::: proof
▷ 思路：每个点 $(x, y) \ne 0$ 都能写成 $(r\cos\theta, r\sin\theta)$，其中 $r = \norm{(x, y)}_2$；上界只依赖 $r$，于是 $\norm{(x,y)}_2$ 小就能控制 $f - \ell$。

**第 1 步（翻译假设）**　设 $\eta > 0$。由 $\eps(r) \to 0$，存在 $\delta \in \,]0, r_0]$，使对一切 $r \in \,]0, \delta[$，$\eps(r) < \eta$。

**第 2 步（任意点的极坐标表示）**　设 $0 < \norm{(x, y)}_2 < \delta$。令 $r = \norm{(x, y)}_2 \in \,]0, \delta[$。点 $(x/r, y/r)$ 在单位圆上，所以存在 $\theta \in \R$ 使 $x = r\cos\theta$，$y = r\sin\theta$。

**第 3 步（估计）**　由假设与第 1 步，$\norm{f(x, y) - \ell} = \norm{f(r\cos\theta, r\sin\theta) - \ell} \le \eps(r) < \eta$。

所以对一切 $0 < \norm{(x, y)}_2 < \delta$，$\norm{f(x, y) - \ell} < \eta$，即 $\lim_{(x,y) \to (0,0)}f(x, y) = \ell$。
:::

::: fr
▷ Méthode : tout point $(x, y) \ne 0$ s'écrit $(r\cos\theta, r\sin\theta)$ avec $r = \norm{(x, y)}_2$ ; la majoration ne dépend que de $r$, donc la petitesse de $\norm{(x,y)}_2$ contrôle $f - \ell$.

**Étape 1 (on traduit l'hypothèse)**　Soit $\eta > 0$. Comme $\eps(r) \to 0$, il existe $\delta \in \,]0, r_0]$ tel que pour tout $r \in \,]0, \delta[$, $\eps(r) < \eta$.

**Étape 2 (écriture polaire d'un point quelconque)**　Soit $(x, y)$ tel que $0 < \norm{(x, y)}_2 < \delta$. Posons $r = \norm{(x, y)}_2 \in \,]0, \delta[$. Le point $(x/r, y/r)$ est sur le cercle unité, donc il existe $\theta \in \R$ tel que $x = r\cos\theta$ et $y = r\sin\theta$.

**Étape 3 (majoration)**　Par hypothèse et d'après l'étape 1, $\norm{f(x, y) - \ell} = \norm{f(r\cos\theta, r\sin\theta) - \ell} \le \eps(r) < \eta$.

Ainsi, pour tout $(x, y)$ tel que $0 < \norm{(x, y)}_2 < \delta$, on a $\norm{f(x, y) - \ell} < \eta$, c'est-à-dire $\lim_{(x,y) \to (0,0)}f(x, y) = \ell$.
:::

::: ex id=c9-ex-continuite lvl=1
令 $f(x, y) = \dfrac{x^2y}{x^2 + y^2}$（$(x, y) \ne 0$），$f(0, 0) = 0$。$f$ 在 $\R^2 \setminus \{0\}$ 上是连续函数的商（分母不为零），所以连续。在原点有两种证法：

1. **不等式**：$x^2 \le x^2 + y^2$，所以 $\abs{f(x, y)} \le \abs y \le \norm{(x, y)}_2$，于是 $f(x, y) \to 0 = f(0, 0)$（取 $\delta = \eps$）。
2. **极坐标**：$\abs{f(r\cos\theta, r\sin\theta)} = \abs{r\cos^2\theta\sin\theta} \le r$，取 $\eps(r) = r$，由 {@c9-lem-polaire} 得同样结论。

所以 $f$ 在 $\R^2$ 上连续。对比 {@cex-limite-droites}：那里极坐标表达式的上界依赖于 $\theta$，这里不依赖。
:::

::: method zh="证明多元函数连续或不连续的常用方法"
**证明连续：**

1. 由连续函数经四则运算、复合得到（第 1 章）；只在「可疑点」（如分母为零处）才需要单独处理。
2. 在可疑点用不等式控制，例如 $\abs{xy} \le \frac12(x^2 + y^2)$，$x^2 \le x^2 + y^2$，$\abs{x}^3 \le \abs x\,(x^2 + y^2)$。
3. 在可疑点用极坐标：若 $\norm{f(r\cos\theta, r\sin\theta) - \ell} \le \eps(r)$，其中 $\eps(r) \to 0$ **与 $\theta$ 无关**，则极限为 $\ell$（{@c9-lem-polaire}）。

**证明不连续（或没有极限）：** 找两条趋于该点的路径，使 $f$ 沿它们的极限不同（{@c9-lem-chemins}）。先试坐标轴和直线 $y = mx$；如果它们给出同一个值，再试曲线 $y = x^2$、$x = y^2$ 等，让分母中各项的阶数相同。
:::

::: q
$f(x, y) = \dfrac{x^3 + y^3}{x^2 + y^2}$，$f(0,0) = 0$，在原点连续吗？$g(x, y) = \dfrac{x^2 - y^2}{x^2 + y^2}$ 呢？
:::

::: ans
$f$ 连续：$\abs{x}^3 = \abs x \cdot x^2 \le \abs x\,(x^2 + y^2)$，把 $x, y$ 对调得 $\abs y^3 \le \abs y\,(x^2 + y^2)$，所以 $\abs{f(x, y)} \le \abs x + \abs y \le 2\norm{(x, y)}_2 \to 0$。

$g$ 在原点没有极限（无论 $g(0,0)$ 如何定义）：沿 $(t, 0)$ 得 $1$，沿 $(0, t)$ 得 $-1$，由 {@c9-lem-chemins} 即得。极坐标下 $g = \cos 2\theta$，只依赖 $\theta$。
:::

## 可微性与微分

一元情形，$f$ 在 $a$ 可导意味着 $f(a + h) = f(a) + f'(a)h + o(h)$，其中 $h \mapsto f'(a)h$ 是一个**线性**函数。多元情形保留这个形式，把「乘以一个数」换成「作用一个线性映射」。

::: def id=def-differentiable zh="可微、微分" en="Differentiable map, (Fréchet) differential" fr="Application différentiable, différentielle" ru="Дифференцируемое отображение, дифференциал Фреше"
$f : U \to F$ 在 $a \in U$ **可微**，如果存在线性映射 $L \in \Lin(E, F)$，使
$$\forall \eta > 0,\ \exists \delta > 0,\ \forall h \in E,\quad \norm h < \delta \implies \Big(a + h \in U \text{ 且 } \norm{f(a + h) - f(a) - L(h)} \le \eta\,\norm h\Big).$$
等价地：存在定义在 $0$ 的某个邻域 $B(0, r)$（$a + B(0, r) \subset U$）上的映射 $\eps : B(0, r) \to F$，满足 $\eps(0) = 0$ 与 $\eps(h) \xrightarrow[h \to 0]{} 0$，使
$$f(a + h) = f(a) + L(h) + \norm h\,\eps(h) \qquad (\norm h < r).$$
简写为 $f(a + h) = f(a) + L(h) + o(\norm h)$。$L$ 是唯一的（{@diff-prop}），称为 $f$ 在 $a$ 的**微分**，记为 $\dd f(a)$ 或 $\dd f_a$。若 $f$ 在 $U$ 的每一点可微，称 $f$ 在 $U$ 上可微。
:::

::: fr
On dit que $f : U \to F$ est **différentiable** en $a \in U$ s'il existe une application linéaire $L \in \Lin(E, F)$ telle que
$$\forall \eta > 0,\ \exists \delta > 0,\ \forall h \in E,\quad \norm h < \delta \implies \Big(a + h \in U \text{ et } \norm{f(a + h) - f(a) - L(h)} \le \eta\,\norm h\Big).$$
De manière équivalente : il existe une application $\eps : B(0, r) \to F$, définie sur une boule $B(0, r)$ telle que $a + B(0, r) \subset U$, vérifiant $\eps(0) = 0$ et $\eps(h) \xrightarrow[h \to 0]{} 0$, telle que
$$f(a + h) = f(a) + L(h) + \norm h\,\eps(h) \qquad (\norm h < r).$$
On écrit $f(a + h) = f(a) + L(h) + o(\norm h)$. L'application $L$ est unique ({@fr:diff-prop}) ; on l'appelle la **différentielle** de $f$ en $a$ et on la note $\dd f(a)$ ou $\dd f_a$. Si $f$ est différentiable en tout point de $U$, on dit que $f$ est différentiable sur $U$.
:::

白话：在 $a$ 附近，$f$ 与仿射映射 $h \mapsto f(a) + L(h)$ 之差比 $\norm h$ **更快地**趋于零。$f(a) + \dd f(a)(x - a)$ 是 $f$ 在 $a$ 处的「切平面」。

::: rem
**两种写法为什么等价。** 给定 $L$，对 $h \ne 0$ 令 $\eps(h) = \dfrac{f(a + h) - f(a) - L(h)}{\norm h}$，并令 $\eps(0) = 0$。于是 $f(a + h) = f(a) + L(h) + \norm h\,\eps(h)$ 对一切 $h$ 成立（$h = 0$ 时两边都是 $f(a)$），而第一种写法恰好说的是 $\norm{\eps(h)} \le \eta$ 对 $\norm h < \delta$ 成立，即 $\eps(h) \to 0$。约定 $\eps(0) = 0$ 使 $\eps$ 在 $0$ 连续，这在链式法则的证明中要用到。

**范数无关。** 若把 $E$ 上的范数换成等价范数 $N$（$\alpha\norm\cdot \le N \le \beta\norm\cdot$，{@def-equiv}），把 $F$ 上的范数换成 $N'$（$\alpha'\norm\cdot \le N' \le \beta'\norm\cdot$），则 $N'(f(a + h) - f(a) - L(h)) \le \beta'\eta\norm h \le \frac{\beta'}{\alpha}\eta\,N(h)$，条件中的 $\eta$ 只是乘了一个常数。所以可微性与 $\dd f(a)$ 都不依赖范数的选取。
:::

::: ex id=c9-ex-differentielles lvl=1
1. **常值与仿射映射**：若 $f(x) = L_0(x) + c$，$L_0 \in \Lin(E, F)$，则 $f(a + h) - f(a) - L_0(h) = 0$，所以 $\dd f(a) = L_0$（对一切 $a$）。
2. **$f(x, y) = xy$**（$\R^2$ 上取 $\norm\cdot_\infty$）：在 $(a, b)$ 处，
   $$f(a + h, b + k) - ab - (bh + ak) = hk,\qquad \abs{hk} \le \norm{(h, k)}_\infty^2.$$
   给定 $\eta > 0$，取 $\delta = \eta$：当 $\norm{(h, k)}_\infty < \delta$ 时，$\abs{hk} \le \norm{(h,k)}_\infty \cdot \norm{(h,k)}_\infty \le \eta\norm{(h, k)}_\infty$。所以 $\dd f(a, b)(h, k) = bh + ak$。
3. **Euclid 范数的平方**：$E$ 带内积，$f(x) = \norm x^2 = \ps{x, x}$。则 $f(a + h) = \norm a^2 + 2\ps{a, h} + \norm h^2$，余项 $\norm h^2 = \norm h \cdot \eps(h)$，$\eps(h) = \norm h \to 0$。所以 $\dd f(a)(h) = 2\ps{a, h}$。
:::

::: cex id=c9-cex-norme lvl=1
**连续不蕴含可微：范数在 $0$ 不可微。** 设 $E \ne \{0\}$，$f(x) = \norm x$（任意范数）。$f$ 是 $1$-Lipschitz 的，因而连续。反设 $f$ 在 $0$ 可微，微分为 $L$。取 $v \ne 0$。

1. 对 $t > 0$：$\dfrac{f(tv) - f(0) - L(tv)}{t} = \norm v - L(v)$，它与 $t$ 无关；可微性要求它在 $t \to 0^+$ 时趋于 $0$，所以 $L(v) = \norm v$。
2. 把 $v$ 换成 $-v$：$L(-v) = \norm{-v} = \norm v$，即 $-L(v) = \norm v$。

两式相加得 $2\norm v = 0$，与 $v \ne 0$ 矛盾。所以 $f$ 在 $0$ 不可微。
:::

::: prop id=diff-prop zh="微分的基本性质" en="Basic properties of the differential" fr="Propriétés de la différentielle" ru="Свойства дифференциала" lvl=1
设 $f : U \to F$，$a \in U$。

1. 微分若存在则唯一。
2. 若 $f$ 在 $a$ 可微，则 $f$ 在 $a$ 连续。
3. 若 $f$ 在 $a$ 可微，则对任意 $v \in E$，**方向导数**
   $$D_vf(a) = \lim_{t \to 0}\frac{f(a + tv) - f(a)}{t}$$
   存在，且等于 $\dd f(a)(v)$。
:::

::: fr
Soit $f : U \to F$ et $a \in U$.

1. Si la différentielle existe, elle est unique.
2. Si $f$ est différentiable en $a$, alors $f$ est continue en $a$.
3. Si $f$ est différentiable en $a$, alors pour tout $v \in E$, la **dérivée directionnelle** (dérivée selon le vecteur $v$)
   $$D_vf(a) = \lim_{t \to 0}\frac{f(a + tv) - f(a)}{t}$$
   existe et vaut $\dd f(a)(v)$.
:::

::: proof
▷ 思路：三条都是把定义里的 $h$ 取成特殊形式。(1) 取 $h = tv$，把 $L_1 - L_2$ 在 $v$ 上的值夹到任意小；(2) 用 $\norm{L(h)} \le \norm L\,\norm h$ 直接估计；(3) 取 $h = tv$ 再除以 $t$。

**第 1 步（唯一性）**　设 $L_1, L_2 \in \Lin(E, F)$ 都满足定义。设 $\eta > 0$。由定义，存在 $\delta_1, \delta_2 > 0$，使 $\norm h < \delta_i$ 时 $\norm{f(a + h) - f(a) - L_i(h)} \le \eta\norm h$（$i = 1, 2$）。令 $\delta = \min(\delta_1, \delta_2)$。对 $\norm h < \delta$：
$$\begin{aligned}
\norm{L_1(h) - L_2(h)} &\le \norm{f(a + h) - f(a) - L_2(h)} + \norm{f(a + h) - f(a) - L_1(h)} && \text{（三角不等式）}\\
&\le 2\eta\norm h.
\end{aligned}$$
固定 $v \ne 0$。对 $0 < t < \delta/\norm v$，取 $h = tv$（$\norm h < \delta$），由线性得 $t\,\norm{(L_1 - L_2)(v)} \le 2\eta\,t\norm v$，即 $\norm{(L_1 - L_2)(v)} \le 2\eta\norm v$。$\eta > 0$ 是任意的，所以 $(L_1 - L_2)(v) = 0$。$v = 0$ 时 $(L_1 - L_2)(0) = 0$，因为线性映射把 $0$ 映到 $0$。所以 $L_1 = L_2$。

**第 2 步（连续性）**　记 $L = \dd f(a)$。$E$ 有限维，$L$ 连续（{@cor-dimfinie}），所以 $\norm{L(h)} \le \norm L\,\norm h$（{@lin-continue}）。在定义中取 $\eta = 1$：存在 $\delta_1 > 0$，使 $\norm h < \delta_1$ 时
$$\begin{aligned}
\norm{f(a + h) - f(a)} &\le \norm{L(h)} + \norm{f(a + h) - f(a) - L(h)} && \text{（三角不等式）}\\
&\le \norm L\norm h + \norm h = (\norm L + 1)\norm h.
\end{aligned}$$
设 $\eps > 0$，令 $\delta = \min\big(\delta_1, \frac{\eps}{\norm L + 1}\big)$。当 $\norm h < \delta$ 时 $\norm{f(a + h) - f(a)} < \eps$。所以 $f$ 在 $a$ 连续。

**第 3 步（方向导数）**　若 $v = 0$，差商恒为 $0 = L(0)$。设 $v \ne 0$，$\eta > 0$，$\delta$ 如定义。对 $0 < \abs t < \delta/\norm v$，取 $h = tv$：
$$\Big\lVert\frac{f(a + tv) - f(a)}{t} - L(v)\Big\rVert = \frac{\norm{f(a + tv) - f(a) - L(tv)}}{\abs t} \le \frac{\eta\,\abs t\,\norm v}{\abs t} = \eta\norm v.$$
$\eta$ 是任意的，所以差商在 $t \to 0$ 时收敛到 $L(v)$，即 $D_vf(a) = \dd f(a)(v)$。

三条结论都已证明。
:::

::: fr
▷ Méthode : dans les trois cas on choisit une forme particulière de $h$ dans la définition. (1) On prend $h = tv$ pour rendre $(L_1 - L_2)(v)$ arbitrairement petit ; (2) on utilise $\norm{L(h)} \le \norm L\,\norm h$ ; (3) on prend $h = tv$ et on divise par $t$.

**Étape 1 (unicité)**　Soient $L_1, L_2 \in \Lin(E, F)$ vérifiant toutes deux la définition. Soit $\eta > 0$. Il existe $\delta_1, \delta_2 > 0$ tels que si $\norm h < \delta_i$, alors $\norm{f(a + h) - f(a) - L_i(h)} \le \eta\norm h$ ($i = 1, 2$). Posons $\delta = \min(\delta_1, \delta_2)$. Pour $\norm h < \delta$ :
$$\begin{aligned}
\norm{L_1(h) - L_2(h)} &\le \norm{f(a + h) - f(a) - L_2(h)} + \norm{f(a + h) - f(a) - L_1(h)} && \text{(inégalité triangulaire)}\\
&\le 2\eta\norm h.
\end{aligned}$$
Fixons $v \ne 0$. Pour $0 < t < \delta/\norm v$, prenons $h = tv$ (alors $\norm h < \delta$) ; par linéarité, $t\,\norm{(L_1 - L_2)(v)} \le 2\eta\,t\norm v$, soit $\norm{(L_1 - L_2)(v)} \le 2\eta\norm v$. Comme $\eta > 0$ est arbitraire, $(L_1 - L_2)(v) = 0$. Pour $v = 0$, $(L_1 - L_2)(0) = 0$ car une application linéaire envoie $0$ sur $0$. Donc $L_1 = L_2$.

**Étape 2 (continuité)**　Notons $L = \dd f(a)$. Comme $E$ est de dimension finie, $L$ est continue ({@fr:cor-dimfinie}), donc $\norm{L(h)} \le \norm L\,\norm h$ ({@fr:lin-continue}). On applique la définition avec $\eta = 1$ : il existe $\delta_1 > 0$ tel que pour $\norm h < \delta_1$,
$$\begin{aligned}
\norm{f(a + h) - f(a)} &\le \norm{L(h)} + \norm{f(a + h) - f(a) - L(h)} && \text{(inégalité triangulaire)}\\
&\le \norm L\norm h + \norm h = (\norm L + 1)\norm h.
\end{aligned}$$
Soit $\eps > 0$ ; posons $\delta = \min\big(\delta_1, \frac{\eps}{\norm L + 1}\big)$. Si $\norm h < \delta$, alors $\norm{f(a + h) - f(a)} < \eps$. Donc $f$ est continue en $a$.

**Étape 3 (dérivée directionnelle)**　Si $v = 0$, le taux d'accroissement est nul, égal à $L(0)$. Soit $v \ne 0$, $\eta > 0$ et $\delta$ comme dans la définition. Pour $0 < \abs t < \delta/\norm v$, avec $h = tv$ :
$$\Big\lVert\frac{f(a + tv) - f(a)}{t} - L(v)\Big\rVert = \frac{\norm{f(a + tv) - f(a) - L(tv)}}{\abs t} \le \frac{\eta\,\abs t\,\norm v}{\abs t} = \eta\norm v.$$
Comme $\eta$ est arbitraire, le taux d'accroissement converge vers $L(v)$ quand $t \to 0$, c'est-à-dire $D_vf(a) = \dd f(a)(v)$.

Les trois assertions sont démontrées.
:::

::: rem
**逆命题都不成立。**

1. 连续 $\not\Rightarrow$ 可微：范数在 $0$ 处（{@c9-cex-norme}）。
2. 所有方向导数存在 $\not\Rightarrow$ 可微，甚至 $\not\Rightarrow$ 连续：{@cex-directionnelles}。
3. 所有方向导数存在、$v \mapsto D_vf(a)$ 是线性的、$f$ 连续，仍然 $\not\Rightarrow$ 可微：{@c9-cex-gateaux}。

所以可微性必须直接用定义（或用下面的 $\Cc^1$ 判别法 {@c1-partielles}）证明，不能用方向导数「拼」出来。
:::

::: prop id=c9-diff-reel zh="一元情形：可微 ⇔ 可导" en="One variable: differentiable iff derivable" fr="Cas d'une variable réelle : différentiable ⇔ dérivable" ru="Случай одной переменной: дифференцируемость равносильна существованию производной" lvl=1
设 $I \subset \R$ 是开区间，$f : I \to F$，$a \in I$。$f$ 在 $a$ 可微当且仅当 $f$ 在 $a$ 可导（$f'(a) = \lim_{t \to 0}\frac{f(a + t) - f(a)}{t}$ 存在）。此时 $\dd f(a)(t) = t\,f'(a)$，$f'(a) = \dd f(a)(1)$，且 $\norm{\dd f(a)} = \norm{f'(a)}$（$\R$ 上取绝对值）。
:::

::: fr
Soit $I \subset \R$ un intervalle ouvert, $f : I \to F$ et $a \in I$. Alors $f$ est différentiable en $a$ si et seulement si $f$ est dérivable en $a$ (la limite $f'(a) = \lim_{t \to 0}\frac{f(a + t) - f(a)}{t}$ existe). Dans ce cas, $\dd f(a)(t) = t\,f'(a)$, $f'(a) = \dd f(a)(1)$ et $\norm{\dd f(a)} = \norm{f'(a)}$ (avec la valeur absolue sur $\R$).
:::

::: proof
▷ 思路：$\R$ 到 $F$ 的线性映射都形如 $t \mapsto t\,c$（$c \in F$），所以「线性近似」就是「乘以一个向量」。

**(⇒)**　由 {@diff-prop} 第 3 条取 $v = 1$：$\lim_{t \to 0}\frac{f(a + t) - f(a)}{t}$ 存在且等于 $\dd f(a)(1)$。

**(⇐)**　设 $f'(a)$ 存在。令 $L(t) = t\,f'(a)$，它是线性的。设 $\eta > 0$。由导数的定义，存在 $\delta > 0$，使 $0 < \abs t < \delta$ 时 $\big\lVert\frac{f(a + t) - f(a)}{t} - f'(a)\big\rVert \le \eta$。两边乘以 $\abs t$：
$$\norm{f(a + t) - f(a) - L(t)} \le \eta\abs t \qquad (0 < \abs t < \delta),$$
$t = 0$ 时左边为 $0$。所以 $f$ 在 $a$ 可微，$\dd f(a) = L$。

**算子范数**　$\norm{\dd f(a)} = \sup_{\abs t = 1}\norm{t\,f'(a)} = \norm{f'(a)}$。
:::

::: fr
▷ Méthode : les applications linéaires de $\R$ dans $F$ sont exactement les $t \mapsto t\,c$ ($c \in F$) ; « approximation linéaire » signifie donc « multiplication par un vecteur ».

**(⇒)**　On applique le point 3 de {@fr:diff-prop} avec $v = 1$ : $\lim_{t \to 0}\frac{f(a + t) - f(a)}{t}$ existe et vaut $\dd f(a)(1)$.

**(⇐)**　Supposons que $f'(a)$ existe et posons $L(t) = t\,f'(a)$, qui est linéaire. Soit $\eta > 0$. Par définition de la dérivée, il existe $\delta > 0$ tel que pour $0 < \abs t < \delta$, $\big\lVert\frac{f(a + t) - f(a)}{t} - f'(a)\big\rVert \le \eta$. En multipliant par $\abs t$ :
$$\norm{f(a + t) - f(a) - L(t)} \le \eta\abs t \qquad (0 < \abs t < \delta),$$
et pour $t = 0$ le membre de gauche est nul. Donc $f$ est différentiable en $a$ et $\dd f(a) = L$.

**Norme d'opérateur**　$\norm{\dd f(a)} = \sup_{\abs t = 1}\norm{t\,f'(a)} = \norm{f'(a)}$.
:::

::: def id=def-partielles zh="偏导数、Jacobi 矩阵、梯度" en="Partial derivatives, Jacobian matrix, gradient" fr="Dérivées partielles, matrice jacobienne, gradient" ru="Частные производные, матрица Якоби, градиент"
设 $E = \R^n$（标准基 $e_1, \dots, e_n$），$F = \R^p$，$f = (f_1, \dots, f_p)$。$f$ 在 $a$ 处关于第 $j$ 个变量的**偏导数**是（若极限存在）
$$\frac{\partial f}{\partial x_j}(a) = \partial_jf(a) = \lim_{t \to 0}\frac{f(a + te_j) - f(a)}{t} = D_{e_j}f(a) \in \R^p,$$
即固定其余变量，把 $f$ 看作 $x_j$ 的一元函数求导。若 $f$ 在 $a$ 可微，$\dd f(a)$ 在标准基下的 $p \times n$ 矩阵称为 **Jacobi 矩阵**
$$J_f(a) = \Big(\frac{\partial f_i}{\partial x_j}(a)\Big)_{1 \le i \le p,\ 1 \le j \le n},\qquad \dd f(a)(h) = \sum_{j=1}^n\frac{\partial f}{\partial x_j}(a)\,h_j.$$
$p = n$ 时 $\det J_f(a)$ 称为 **Jacobi 行列式**。若 $p = 1$ 且 $E$ 是 Euclid 空间，**梯度** $\nabla f(a)$ 是由
$$\forall h \in E,\qquad \dd f(a)(h) = \ps{\nabla f(a), h}$$
唯一确定的向量；在 $\R^n$ 的标准内积下 $\nabla f(a) = \big(\frac{\partial f}{\partial x_1}(a), \dots, \frac{\partial f}{\partial x_n}(a)\big)$（{@c9-jacobienne}）。
:::

::: fr
Soit $E = \R^n$ (base canonique $e_1, \dots, e_n$), $F = \R^p$ et $f = (f_1, \dots, f_p)$. La **dérivée partielle** de $f$ en $a$ par rapport à la $j$-ième variable est (si la limite existe)
$$\frac{\partial f}{\partial x_j}(a) = \partial_jf(a) = \lim_{t \to 0}\frac{f(a + te_j) - f(a)}{t} = D_{e_j}f(a) \in \R^p,$$
c'est-à-dire la dérivée de $f$ vue comme fonction de la seule variable $x_j$, les autres étant fixées. Si $f$ est différentiable en $a$, la matrice $p \times n$ de $\dd f(a)$ dans les bases canoniques est la **matrice jacobienne**
$$J_f(a) = \Big(\frac{\partial f_i}{\partial x_j}(a)\Big)_{1 \le i \le p,\ 1 \le j \le n},\qquad \dd f(a)(h) = \sum_{j=1}^n\frac{\partial f}{\partial x_j}(a)\,h_j.$$
Si $p = n$, $\det J_f(a)$ est le **jacobien** de $f$ en $a$. Si $p = 1$ et $E$ est euclidien, le **gradient** $\nabla f(a)$ est l'unique vecteur tel que
$$\forall h \in E,\qquad \dd f(a)(h) = \ps{\nabla f(a), h} ;$$
pour le produit scalaire canonique de $\R^n$, $\nabla f(a) = \big(\frac{\partial f}{\partial x_1}(a), \dots, \frac{\partial f}{\partial x_n}(a)\big)$ ({@fr:c9-jacobienne}).
:::

::: prop id=c9-jacobienne zh="微分与偏导数" en="Differential and partial derivatives" fr="Différentielle et dérivées partielles" ru="Дифференциал и частные производные" lvl=1
设 $f : U \subset \R^n \to \R^p$ 在 $a$ 可微。则

1. 所有偏导数 $\partial_jf(a)$ 存在，且 $\partial_jf(a) = \dd f(a)(e_j)$；
2. 对一切 $h \in \R^n$，$\dd f(a)(h) = \sum_{j=1}^n h_j\,\partial_jf(a)$；$\dd f(a)$ 的矩阵是 $J_f(a)$；
3. 若 $p = 1$，$E$ 是 Euclid 空间，则梯度 $\nabla f(a)$ 存在且唯一；在标准内积下 $\nabla f(a) = (\partial_1f(a), \dots, \partial_nf(a))$。
:::

::: fr
Soit $f : U \subset \R^n \to \R^p$ différentiable en $a$. Alors :

1. toutes les dérivées partielles $\partial_jf(a)$ existent et $\partial_jf(a) = \dd f(a)(e_j)$ ;
2. pour tout $h \in \R^n$, $\dd f(a)(h) = \sum_{j=1}^n h_j\,\partial_jf(a)$ ; la matrice de $\dd f(a)$ est $J_f(a)$ ;
3. si $p = 1$ et $E$ est euclidien, le gradient $\nabla f(a)$ existe et est unique ; pour le produit scalaire canonique, $\nabla f(a) = (\partial_1f(a), \dots, \partial_nf(a))$.
:::

::: proof
▷ 思路：偏导数是沿坐标方向的方向导数，于是 (1) 是 {@diff-prop} 的特例；(2) 用线性把 $h$ 拆成 $\sum h_je_j$；(3) 在一组标准正交基下把线性形式写成内积。

**第 1 步**　由 {@diff-prop} 第 3 条取 $v = e_j$：$D_{e_j}f(a) = \partial_jf(a)$ 存在且等于 $\dd f(a)(e_j)$。

**第 2 步**　写 $h = \sum_j h_je_j$。由 $\dd f(a)$ 的线性和第 1 步，$\dd f(a)(h) = \sum_j h_j\,\dd f(a)(e_j) = \sum_j h_j\,\partial_jf(a)$。线性映射矩阵的第 $j$ 列是基向量 $e_j$ 的像 $\partial_jf(a) \in \R^p$；$\R^p$ 中的极限按分量取，所以这一列的第 $i$ 个分量是 $\partial_jf_i(a)$。这正是 $J_f(a)$。

**第 3 步（存在）**　取 $E$ 的一组标准正交基 $(\varepsilon_1, \dots, \varepsilon_n)$，令 $w = \sum_k \dd f(a)(\varepsilon_k)\,\varepsilon_k$。对任意 $h$，$h = \sum_k\ps{\varepsilon_k, h}\varepsilon_k$，于是
$$\ps{w, h} = \sum_k \dd f(a)(\varepsilon_k)\ps{\varepsilon_k, h} = \dd f(a)\Big(\sum_k\ps{\varepsilon_k, h}\varepsilon_k\Big) = \dd f(a)(h).$$
**（唯一）**　若 $w, w'$ 都满足，则 $\ps{w - w', h} = 0$ 对一切 $h$ 成立；取 $h = w - w'$ 得 $\norm{w - w'}^2 = 0$。在 $\R^n$ 的标准内积下取 $\varepsilon_k = e_k$，由第 1 步得 $\nabla f(a) = \sum_k\partial_kf(a)\,e_k$。
:::

::: fr
▷ Méthode : une dérivée partielle est la dérivée directionnelle selon un vecteur de la base, donc (1) est un cas particulier de {@fr:diff-prop} ; pour (2) on décompose $h = \sum h_je_j$ par linéarité ; pour (3) on écrit la forme linéaire comme un produit scalaire dans une base orthonormée.

**Étape 1**　D'après le point 3 de {@fr:diff-prop} avec $v = e_j$, $D_{e_j}f(a) = \partial_jf(a)$ existe et vaut $\dd f(a)(e_j)$.

**Étape 2**　Écrivons $h = \sum_j h_je_j$. Par linéarité de $\dd f(a)$ et d'après l'étape 1, $\dd f(a)(h) = \sum_j h_j\,\dd f(a)(e_j) = \sum_j h_j\,\partial_jf(a)$. La $j$-ième colonne de la matrice d'une application linéaire est l'image du vecteur $e_j$, ici $\partial_jf(a) \in \R^p$ ; comme les limites dans $\R^p$ se calculent composante par composante, sa $i$-ième composante est $\partial_jf_i(a)$. C'est la matrice $J_f(a)$.

**Étape 3 (existence)**　Soit $(\varepsilon_1, \dots, \varepsilon_n)$ une base orthonormée de $E$ ; posons $w = \sum_k \dd f(a)(\varepsilon_k)\,\varepsilon_k$. Pour tout $h$, $h = \sum_k\ps{\varepsilon_k, h}\varepsilon_k$, d'où
$$\ps{w, h} = \sum_k \dd f(a)(\varepsilon_k)\ps{\varepsilon_k, h} = \dd f(a)\Big(\sum_k\ps{\varepsilon_k, h}\varepsilon_k\Big) = \dd f(a)(h).$$
**(Unicité)**　Si $w$ et $w'$ conviennent, $\ps{w - w', h} = 0$ pour tout $h$ ; avec $h = w - w'$, il vient $\norm{w - w'}^2 = 0$. Pour le produit scalaire canonique de $\R^n$, on prend $\varepsilon_k = e_k$ et l'étape 1 donne $\nabla f(a) = \sum_k\partial_kf(a)\,e_k$.
:::

::: ex id=c9-ex-partielles lvl=1
$f(x, y) = x^2y + \e^{xy}$。固定 $y$ 对 $x$ 求导、固定 $x$ 对 $y$ 求导：
$$\frac{\partial f}{\partial x}(x, y) = 2xy + y\,\e^{xy},\qquad \frac{\partial f}{\partial y}(x, y) = x^2 + x\,\e^{xy}.$$
在 $(1, 0)$：$\partial_xf = 0$，$\partial_yf = 2$。这两个偏导数在 $\R^2$ 上连续，由后面的 {@c1-partielles}，$f$ 可微，于是 $\nabla f(1, 0) = (0, 2)$，$\dd f(1, 0)(h, k) = 2k$，沿单位向量 $v = (v_1, v_2)$ 的方向导数为 $2v_2$。
:::

::: cex id=c9-cex-partielles lvl=1
**偏导数存在 $\not\Rightarrow$ 可微。** 取 {@cex-limite-droites} 之后的函数 $g(x, y) = \dfrac{xy}{x^2 + y^2}$，$g(0, 0) = 0$。由 $g(t, 0) = 0$ 与 $g(0, t) = 0$，
$$\partial_xg(0, 0) = \lim_{t \to 0}\frac{g(t, 0) - g(0, 0)}{t} = 0,\qquad \partial_yg(0, 0) = 0.$$
但 $g$ 在原点不连续（沿 $(t, t)$ 恒为 $\frac12$），由 {@diff-prop} 第 2 条，$g$ 在原点不可微。偏导数只看两个坐标轴方向，对其他方向一无所知。
:::

::: prop id=gradient-geometrie zh="梯度的几何意义" en="Geometric meaning of the gradient" fr="Interprétation géométrique du gradient" ru="Геометрический смысл градиента" lvl=1
设 $E$ 是 Euclid 空间，$f : U \to \R$ 在 $a$ 可微，$\nabla f(a) \ne 0$。

1. 在所有单位向量 $v$ 中，方向导数 $D_vf(a)$ 当且仅当 $v = \frac{\nabla f(a)}{\norm{\nabla f(a)}}$ 时最大，最大值为 $\norm{\nabla f(a)}$。
2. 梯度与等值面（等高线）的切向量正交：若 $\gamma : I \to U$（$I$ 是含 $0$ 的开区间）在 $0$ 可导，$\gamma(0) = a$，且 $f(\gamma(t)) = f(a)$ 对一切 $t \in I$ 成立，则 $\ps{\nabla f(a), \gamma'(0)} = 0$。

（第 10 章 {@tangent-ker} 说明：等值面 $\{f = f(a)\}$ 在 $a$ 附近是子流形，其切空间恰为 $\nabla f(a)^\perp$。）
:::

::: fr
Soit $E$ un espace euclidien et $f : U \to \R$ différentiable en $a$, avec $\nabla f(a) \ne 0$.

1. Parmi les vecteurs unitaires $v$, la dérivée directionnelle $D_vf(a)$ est maximale si et seulement si $v = \frac{\nabla f(a)}{\norm{\nabla f(a)}}$ ; la valeur maximale est $\norm{\nabla f(a)}$.
2. Le gradient est orthogonal aux vecteurs tangents aux lignes (surfaces) de niveau : si $\gamma : I \to U$ ($I$ intervalle ouvert contenant $0$) est dérivable en $0$, $\gamma(0) = a$ et $f(\gamma(t)) = f(a)$ pour tout $t \in I$, alors $\ps{\nabla f(a), \gamma'(0)} = 0$.

(Au chapitre 10, {@fr:tangent-ker} montre que la surface de niveau $\{f = f(a)\}$ est une sous-variété au voisinage de $a$, d'espace tangent $\nabla f(a)^\perp$.)
:::

::: proof
▷ 思路：(1) 是 Cauchy–Schwarz 不等式及其等号条件；(2) 对常值函数 $t \mapsto f(\gamma(t))$ 用链式法则求导（链式法则 {@chain-rule} 在下一节证明，它的证明不用到本命题）。

**第 1 步（上界）**　设 $\norm v = 1$。由 {@diff-prop} 与梯度的定义，
$$\begin{aligned}
D_vf(a) &= \dd f(a)(v) = \ps{\nabla f(a), v} && \text{（{@diff-prop}，梯度的定义）}\\
&\le \norm{\nabla f(a)}\,\norm v = \norm{\nabla f(a)} && \text{（Cauchy–Schwarz）}.
\end{aligned}$$
**第 2 步（等号条件）**　Cauchy–Schwarz 中 $\ps{u, v} = \norm u\norm v$ 当且仅当 $v = \lambda u$，$\lambda \ge 0$（$u \ne 0$）。取 $u = \nabla f(a)$，再由 $\norm v = 1$ 得 $\lambda = 1/\norm{\nabla f(a)}$。所以上界恰在 $v_0 = \nabla f(a)/\norm{\nabla f(a)}$ 处取到，且 $D_{v_0}f(a) = \norm{\nabla f(a)}$。

**第 3 步（正交性）**　令 $\varphi(t) = f(\gamma(t))$。由假设 $\varphi$ 在 $I$ 上是常数，所以 $\varphi'(0) = 0$。另一方面，$\gamma$ 在 $0$ 可微（{@c9-diff-reel}），$f$ 在 $\gamma(0) = a$ 可微，由链式法则 {@chain-rule} 与 {@c9-diff-reel}，
$$\varphi'(0) = \dd f(a)\big(\gamma'(0)\big) = \ps{\nabla f(a), \gamma'(0)}.$$
所以 $\ps{\nabla f(a), \gamma'(0)} = 0$。
:::

::: fr
▷ Méthode : (1) est l'inégalité de Cauchy–Schwarz avec son cas d'égalité ; pour (2) on dérive la fonction constante $t \mapsto f(\gamma(t))$ par la règle de la chaîne ({@fr:chain-rule}, démontrée à la section suivante sans utiliser cette proposition).

**Étape 1 (majoration)**　Soit $\norm v = 1$. D'après {@fr:diff-prop} et la définition du gradient,
$$\begin{aligned}
D_vf(a) &= \dd f(a)(v) = \ps{\nabla f(a), v} && \text{({@fr:diff-prop}, définition du gradient)}\\
&\le \norm{\nabla f(a)}\,\norm v = \norm{\nabla f(a)} && \text{(Cauchy–Schwarz)}.
\end{aligned}$$
**Étape 2 (cas d'égalité)**　Pour $u \ne 0$, on a $\ps{u, v} = \norm u\norm v$ si et seulement si $v = \lambda u$ avec $\lambda \ge 0$. Avec $u = \nabla f(a)$ et $\norm v = 1$, on obtient $\lambda = 1/\norm{\nabla f(a)}$. Le majorant est donc atteint exactement en $v_0 = \nabla f(a)/\norm{\nabla f(a)}$, et $D_{v_0}f(a) = \norm{\nabla f(a)}$.

**Étape 3 (orthogonalité)**　Posons $\varphi(t) = f(\gamma(t))$. Par hypothèse $\varphi$ est constante sur $I$, donc $\varphi'(0) = 0$. D'autre part $\gamma$ est différentiable en $0$ ({@fr:c9-diff-reel}) et $f$ est différentiable en $\gamma(0) = a$ ; d'après la règle de la chaîne {@fr:chain-rule} et {@fr:c9-diff-reel},
$$\varphi'(0) = \dd f(a)\big(\gamma'(0)\big) = \ps{\nabla f(a), \gamma'(0)}.$$
Donc $\ps{\nabla f(a), \gamma'(0)} = 0$.
:::

::: cex id=cex-directionnelles lvl=1
**所有方向导数都存在，函数也未必可微，甚至未必连续。** 令 $f(x, y) = \dfrac{x^2y}{x^4 + y^2}$（$(x, y) \ne 0$），$f(0,0) = 0$。设 $v = (v_1, v_2) \ne 0$，$t \ne 0$。

1. 若 $v_2 \ne 0$：
   $$\frac{f(tv) - f(0)}{t} = \frac{t^3v_1^2v_2}{t\,(t^4v_1^4 + t^2v_2^2)} = \frac{v_1^2v_2}{t^2v_1^4 + v_2^2} \xrightarrow[t \to 0]{} \frac{v_1^2}{v_2}.$$
2. 若 $v_2 = 0$：$f(tv) = 0$，差商为 $0$。

所以所有方向导数都存在：$D_vf(0) = v_1^2/v_2$（$v_2 \ne 0$），$D_vf(0) = 0$（$v_2 = 0$）。但 $v \mapsto D_vf(0)$ 不是线性的：$D_{(1,0)}f(0) = 0$，$D_{(0,1)}f(0) = 0$，而 $D_{(1,1)}f(0) = 1 \ne 0 + 0$。由 {@diff-prop} 第 3 条，若 $f$ 在原点可微，则 $D_vf(0) = \dd f(0)(v)$ 关于 $v$ 线性，矛盾；所以 $f$ 在原点不可微。而且沿 $y = x^2$，$f(x, x^2) = \frac{x^4}{2x^4} = \frac12$，而沿 $y = 0$，$f = 0$，由 {@c9-lem-chemins}，$f$ 在原点不连续。
:::

::: cex id=c9-cex-gateaux lvl=1
**方向导数存在且线性、函数连续，仍可能不可微。** 令 $f(x, y) = \dfrac{x^3y}{x^4 + y^2}$（$(x, y) \ne 0$），$f(0, 0) = 0$。

1. **连续**：由 $\abs{x^2y} \le \frac12(x^4 + y^2)$（即 $(x^2 - \abs y)^2 \ge 0$），$\abs{f(x, y)} = \abs x\cdot\dfrac{\abs{x^2y}}{x^4 + y^2} \le \dfrac{\abs x}{2} \to 0$。
2. **方向导数**：对 $v_2 \ne 0$，$\dfrac{f(tv)}{t} = \dfrac{t\,v_1^3v_2}{t^2v_1^4 + v_2^2} \xrightarrow[t \to 0]{} 0$；对 $v_2 = 0$，$f(tv) = 0$。所以 $D_vf(0) = 0$ 对一切 $v$ 成立，$v \mapsto D_vf(0)$ 是零映射，线性。
3. **不可微**：若可微，由 {@diff-prop}，$\dd f(0)(v) = D_vf(0) = 0$，于是应有 $\dfrac{f(h)}{\norm h_\infty} \to 0$。但对 $0 < \abs x < 1$，$h = (x, x^2)$，$\norm h_\infty = \abs x$，
   $$\frac{f(x, x^2)}{\norm h_\infty} = \frac{x^5}{2x^4\,\abs x} = \pm\frac12 \not\to 0.$$
   矛盾，所以 $f$ 在原点不可微。

满足 1、2 的映射称为在 $0$ 处 **Gâteaux 可微**；本章的「可微」是更强的 **Fréchet 可微**。
:::

::: demo id=gradient
等高线（色带）与梯度场（箭头）。把指针移到图上：粗箭头是该点的梯度，绿色线段沿等高线的切线方向，两者总是垂直。在「鞍点」和「猴鞍」的原点，梯度为零，但原点不是极值点。
:::

::: q
$f(x, y) = \sqrt{\abs{xy}}$ 在原点的两个偏导数存在吗？$f$ 在原点可微吗？
:::

::: ans
$f(t, 0) = f(0, t) = 0$，所以 $\partial_xf(0,0) = \partial_yf(0,0) = 0$。若 $f$ 在原点可微，微分只能是 $\dd f(0)(h) = \partial_xf(0)h_1 + \partial_yf(0)h_2 = 0$（{@c9-jacobienne}），于是应有 $f(h)/\norm h_2 \to 0$。但沿 $h = (t, t)$，$t > 0$：$f(t, t)/\norm{(t,t)}_2 = t/(\sqrt2\,t) = 1/\sqrt2 \not\to 0$。所以 $f$ 不可微（尽管它连续：$f \le \norm{(x,y)}_\infty$）。
:::

::: q
{@c9-ex-continuite} 中连续的函数 $f(x, y) = \dfrac{x^2y}{x^2 + y^2}$ 在原点可微吗？
:::

::: ans
不可微。对 $v \ne 0$：$\dfrac{f(tv)}{t} = \dfrac{v_1^2v_2}{v_1^2 + v_2^2}$（与 $t$ 无关），所以 $D_vf(0) = \dfrac{v_1^2v_2}{v_1^2 + v_2^2}$。$D_{(1,0)}f(0) = D_{(0,1)}f(0) = 0$，但 $D_{(1,1)}f(0) = \frac12$，不是线性的，由 {@diff-prop} 第 3 条，$f$ 在原点不可微。
:::

## 运算法则

直接用定义证明可微很繁琐。这一节建立「可微函数经过运算仍可微」的法则：线性组合、按分量、复合（链式法则）、双线性运算（乘积）。有了它们，大多数函数的可微性可以一眼看出，微分也可以机械地算出来。

::: prop id=c9-operations zh="线性组合与分量" en="Linear combinations and components" fr="Combinaisons linéaires et composantes" ru="Линейные комбинации и покомпонентная дифференцируемость" lvl=1
1. 若 $f, g : U \to F$ 在 $a$ 可微，$\lambda \in \R$，则 $f + \lambda g$ 在 $a$ 可微，且 $\dd(f + \lambda g)(a) = \dd f(a) + \lambda\,\dd g(a)$。
2. 设 $F = F_1 \times \dots \times F_p$，带范数 $\norm{(y_1, \dots, y_p)} = \max_i\norm{y_i}$，$f = (f_1, \dots, f_p)$。则 $f$ 在 $a$ 可微当且仅当每个 $f_i$ 在 $a$ 可微，此时 $\dd f(a)(h) = \big(\dd f_1(a)(h), \dots, \dd f_p(a)(h)\big)$。特别地，$F = \R^p$ 时，$f$ 可微当且仅当它的每个分量可微。
:::

::: fr
1. Si $f, g : U \to F$ sont différentiables en $a$ et $\lambda \in \R$, alors $f + \lambda g$ est différentiable en $a$ et $\dd(f + \lambda g)(a) = \dd f(a) + \lambda\,\dd g(a)$.
2. Soit $F = F_1 \times \dots \times F_p$, muni de la norme $\norm{(y_1, \dots, y_p)} = \max_i\norm{y_i}$, et $f = (f_1, \dots, f_p)$. Alors $f$ est différentiable en $a$ si et seulement si chaque $f_i$ l'est, et dans ce cas $\dd f(a)(h) = \big(\dd f_1(a)(h), \dots, \dd f_p(a)(h)\big)$. En particulier, pour $F = \R^p$, $f$ est différentiable si et seulement si chacune de ses composantes l'est.
:::

::: proof
▷ 思路：两条都是对余项的估计。(1) 两个余项相加，用三角不等式，并把 $\eta$ 按比例分给两项；(2) 乘积空间的范数是各分量范数的最大值，所以「整体余项小」等价于「每个分量的余项都小」。

**第 1 步（线性组合）**　记 $L = \dd f(a)$，$M = \dd g(a)$。设 $\eta > 0$。由假设，存在 $\delta_1, \delta_2 > 0$，使
$$\norm h < \delta_1 \implies \norm{f(a + h) - f(a) - L(h)} \le \tfrac\eta2\norm h,\qquad \norm h < \delta_2 \implies \norm{g(a + h) - g(a) - M(h)} \le \tfrac{\eta}{2(1 + \abs\lambda)}\norm h.$$
令 $\delta = \min(\delta_1, \delta_2)$。对 $\norm h < \delta$：
$$\begin{aligned}
&\norm{(f + \lambda g)(a + h) - (f + \lambda g)(a) - (L + \lambda M)(h)}\\
&\qquad\le \norm{f(a + h) - f(a) - L(h)} + \abs\lambda\,\norm{g(a + h) - g(a) - M(h)} && \text{（三角不等式）}\\
&\qquad\le \tfrac\eta2\norm h + \tfrac{\abs\lambda\,\eta}{2(1 + \abs\lambda)}\norm h \le \eta\norm h.
\end{aligned}$$
$L + \lambda M$ 是线性的，所以 $f + \lambda g$ 在 $a$ 可微，微分为 $L + \lambda M$。

**第 2 步（(⇒)）**　设 $f$ 在 $a$ 可微，$L = \dd f(a)$。记 $\pi_i : F \to F_i$ 为第 $i$ 个投影（线性），$L_i = \pi_i \circ L$（线性）。设 $\eta > 0$，取定义中的 $\delta$。对 $\norm h < \delta$：
$$\norm{f_i(a + h) - f_i(a) - L_i(h)} \le \max_j\norm{f_j(a + h) - f_j(a) - L_j(h)} = \norm{f(a + h) - f(a) - L(h)} \le \eta\norm h.$$
所以 $f_i$ 在 $a$ 可微，$\dd f_i(a) = L_i$。

**第 3 步（(⇐)）**　设每个 $f_i$ 在 $a$ 可微，$L_i = \dd f_i(a)$。令 $L(h) = (L_1(h), \dots, L_p(h))$，它是线性的。设 $\eta > 0$，对每个 $i$ 取 $\delta_i$，令 $\delta = \min_i\delta_i$。对 $\norm h < \delta$：
$$\norm{f(a + h) - f(a) - L(h)} = \max_i\norm{f_i(a + h) - f_i(a) - L_i(h)} \le \eta\norm h.$$
所以 $f$ 在 $a$ 可微，$\dd f(a) = L$。由「范数无关」的注，$F$ 上换成任何其他范数，结论不变。
:::

::: fr
▷ Méthode : dans les deux cas on majore le reste. (1) On additionne deux restes (inégalité triangulaire) en répartissant $\eta$ entre les deux termes ; (2) la norme produit est le maximum des normes des composantes, donc « le reste global est petit » équivaut à « chaque reste composante est petit ».

**Étape 1 (combinaison linéaire)**　Notons $L = \dd f(a)$ et $M = \dd g(a)$. Soit $\eta > 0$. Par hypothèse, il existe $\delta_1, \delta_2 > 0$ tels que
$$\norm h < \delta_1 \implies \norm{f(a + h) - f(a) - L(h)} \le \tfrac\eta2\norm h,\qquad \norm h < \delta_2 \implies \norm{g(a + h) - g(a) - M(h)} \le \tfrac{\eta}{2(1 + \abs\lambda)}\norm h.$$
Posons $\delta = \min(\delta_1, \delta_2)$. Pour $\norm h < \delta$ :
$$\begin{aligned}
&\norm{(f + \lambda g)(a + h) - (f + \lambda g)(a) - (L + \lambda M)(h)}\\
&\qquad\le \norm{f(a + h) - f(a) - L(h)} + \abs\lambda\,\norm{g(a + h) - g(a) - M(h)} && \text{(inégalité triangulaire)}\\
&\qquad\le \tfrac\eta2\norm h + \tfrac{\abs\lambda\,\eta}{2(1 + \abs\lambda)}\norm h \le \eta\norm h.
\end{aligned}$$
Comme $L + \lambda M$ est linéaire, $f + \lambda g$ est différentiable en $a$, de différentielle $L + \lambda M$.

**Étape 2 ((⇒))**　Supposons $f$ différentiable en $a$ et notons $L = \dd f(a)$. Soit $\pi_i : F \to F_i$ la $i$-ième projection (linéaire) et $L_i = \pi_i \circ L$ (linéaire). Soit $\eta > 0$ et $\delta$ donné par la définition. Pour $\norm h < \delta$ :
$$\norm{f_i(a + h) - f_i(a) - L_i(h)} \le \max_j\norm{f_j(a + h) - f_j(a) - L_j(h)} = \norm{f(a + h) - f(a) - L(h)} \le \eta\norm h.$$
Donc $f_i$ est différentiable en $a$ et $\dd f_i(a) = L_i$.

**Étape 3 ((⇐))**　Supposons chaque $f_i$ différentiable en $a$, et notons $L_i = \dd f_i(a)$. Posons $L(h) = (L_1(h), \dots, L_p(h))$, qui est linéaire. Soit $\eta > 0$ ; pour chaque $i$ on dispose de $\delta_i$ ; posons $\delta = \min_i\delta_i$. Pour $\norm h < \delta$ :
$$\norm{f(a + h) - f(a) - L(h)} = \max_i\norm{f_i(a + h) - f_i(a) - L_i(h)} \le \eta\norm h.$$
Donc $f$ est différentiable en $a$ et $\dd f(a) = L$. D'après la remarque sur l'indépendance vis-à-vis des normes, le résultat subsiste pour toute autre norme sur $F$.
:::

::: thm id=chain-rule zh="链式法则" en="Chain rule" fr="Différentielle d'une composée (règle de la chaîne)" ru="Дифференцирование сложного отображения" lvl=1
设 $V \subset F$ 是开集，$G$ 是有限维赋范空间，$f : U \to V$ 在 $a$ 可微，$g : V \to G$ 在 $f(a)$ 可微。则 $g \circ f$ 在 $a$ 可微，且
$$\dd(g \circ f)(a) = \dd g(f(a)) \circ \dd f(a),\qquad J_{g \circ f}(a) = J_g(f(a))\,J_f(a).$$
坐标形式：$\dfrac{\partial(g \circ f)_i}{\partial x_j}(a) = \sum_k\dfrac{\partial g_i}{\partial y_k}(f(a))\,\dfrac{\partial f_k}{\partial x_j}(a)$。
:::

::: fr
Soit $V \subset F$ un ouvert, $G$ un espace vectoriel normé de dimension finie, $f : U \to V$ différentiable en $a$ et $g : V \to G$ différentiable en $f(a)$. Alors $g \circ f$ est différentiable en $a$ et
$$\dd(g \circ f)(a) = \dd g(f(a)) \circ \dd f(a),\qquad J_{g \circ f}(a) = J_g(f(a))\,J_f(a).$$
En coordonnées : $\dfrac{\partial(g \circ f)_i}{\partial x_j}(a) = \sum_k\dfrac{\partial g_i}{\partial y_k}(f(a))\,\dfrac{\partial f_k}{\partial x_j}(a)$.
:::

::: proof
▷ 思路：把两个展开式「套」在一起：先写 $f(a + h) = b + L(h) + \norm h\,\eps_1(h)$，再把 $k = f(a + h) - b$ 代入 $g$ 的展开式。难点在 $g$ 的余项 $\norm k\,\eps_2(k)$：需要 (i) $\norm k \le C\norm h$；(ii) 用 $\eps_2(0) = 0$ 处理 $h \ne 0$ 而 $k = 0$ 的情形。我们要证：存在 $\eps_3(h) \to 0$，使 $g(f(a + h)) = g(f(a)) + M(L(h)) + \norm h\,\eps_3(h)$。

**第 1 步（翻译假设）**　记 $b = f(a)$，$L = \dd f(a)$，$M = \dd g(b)$。由 {@def-differentiable}：

- 存在 $r_1 > 0$ 和 $\eps_1 : B(0, r_1) \to F$，$a + B(0, r_1) \subset U$，$\eps_1(0) = 0$，$\eps_1(h) \xrightarrow[h \to 0]{} 0$，使 $f(a + h) = b + L(h) + \norm h\,\eps_1(h)$（$\norm h < r_1$）；
- 存在 $r_2 > 0$ 和 $\eps_2 : B(0, r_2) \to G$，$b + B(0, r_2) \subset V$，$\eps_2(0) = 0$，$\eps_2(k) \xrightarrow[k \to 0]{} 0$，使 $g(b + k) = g(b) + M(k) + \norm k\,\eps_2(k)$（$\norm k < r_2$）。

**第 2 步（$g \circ f$ 在 $a$ 附近有定义）**　$f$ 在 $a$ 连续（{@diff-prop}），所以存在 $r_3 \in \,]0, r_1]$，使 $\norm h < r_3 \implies \norm{f(a + h) - b} < r_2$。对这样的 $h$，令 $k(h) = f(a + h) - b$，则 $\norm{k(h)} < r_2$，$f(a + h) = b + k(h) \in V$。

**第 3 步（$\norm{k(h)} \le C\norm h$）**　由第 1 步，$k(h) = L(h) + \norm h\,\eps_1(h)$。因为 $\eps_1(h) \to 0$，存在 $r_4 \in \,]0, r_3]$，使 $\norm h < r_4 \implies \norm{\eps_1(h)} \le 1$。令 $C = \norm L + 1$。对 $\norm h < r_4$：
$$\norm{k(h)} \le \norm{L(h)} + \norm h\,\norm{\eps_1(h)} \le \norm L\,\norm h + \norm h = C\norm h.$$

**第 4 步（展开）**　对 $\norm h < r_4$，在 $g$ 的展开式中取 $k = k(h)$，再用 $M$ 的线性：
$$\begin{aligned}
g(f(a + h)) &= g(b) + M(k(h)) + \norm{k(h)}\,\eps_2(k(h))\\
&= g(b) + M(L(h)) + \norm h\,M(\eps_1(h)) + \norm{k(h)}\,\eps_2(k(h)).
\end{aligned}$$

**第 5 步（余项趋于零）**　对 $0 < \norm h < r_4$ 令 $\eps_3(h) = M(\eps_1(h)) + \dfrac{\norm{k(h)}}{\norm h}\,\eps_2(k(h))$，令 $\eps_3(0) = 0$。于是 $g(f(a + h)) = g(b) + (M \circ L)(h) + \norm h\,\eps_3(h)$，且由第 3 步
$$\norm{\eps_3(h)} \le \norm M\,\norm{\eps_1(h)} + C\,\norm{\eps_2(k(h))}.$$
设 $\eta > 0$。由 $\eps_1(h) \to 0$，存在 $\rho_1 > 0$ 使 $\norm h < \rho_1 \implies \norm M\,\norm{\eps_1(h)} \le \frac\eta2$。由 $\eps_2(k) \to 0$ 且 $\eps_2(0) = 0$，存在 $\rho_2 > 0$ 使 $\norm k < \rho_2 \implies C\norm{\eps_2(k)} \le \frac\eta2$（$k = 0$ 时也成立）。令 $\rho = \min\big(r_4, \rho_1, \rho_2/C\big)$。当 $\norm h < \rho$ 时，$\norm{k(h)} \le C\norm h < \rho_2$，所以 $\norm{\eps_3(h)} \le \frac\eta2 + \frac\eta2 = \eta$。即 $\eps_3(h) \to 0$。

**第 6 步（结论与矩阵形式）**　$M \circ L$ 是线性的，所以 $g \circ f$ 在 $a$ 可微，$\dd(g \circ f)(a) = M \circ L = \dd g(f(a)) \circ \dd f(a)$。线性映射复合的矩阵是矩阵的乘积，所以 $J_{g \circ f}(a) = J_g(b)J_f(a)$；取第 $(i, j)$ 个元素即得坐标形式。
:::

::: fr
▷ Méthode : on « emboîte » les deux développements : on écrit $f(a + h) = b + L(h) + \norm h\,\eps_1(h)$, puis on reporte $k = f(a + h) - b$ dans le développement de $g$. La difficulté est le reste $\norm k\,\eps_2(k)$ de $g$ : il faut (i) $\norm k \le C\norm h$ ; (ii) utiliser $\eps_2(0) = 0$ lorsque $k = 0$ avec $h \ne 0$. On veut montrer qu'il existe $\eps_3(h) \to 0$ tel que $g(f(a + h)) = g(f(a)) + M(L(h)) + \norm h\,\eps_3(h)$.

**Étape 1 (on traduit les hypothèses)**　Notons $b = f(a)$, $L = \dd f(a)$, $M = \dd g(b)$. D'après {@fr:def-differentiable} :

- il existe $r_1 > 0$ et $\eps_1 : B(0, r_1) \to F$, avec $a + B(0, r_1) \subset U$, $\eps_1(0) = 0$, $\eps_1(h) \xrightarrow[h \to 0]{} 0$, tels que $f(a + h) = b + L(h) + \norm h\,\eps_1(h)$ ($\norm h < r_1$) ;
- il existe $r_2 > 0$ et $\eps_2 : B(0, r_2) \to G$, avec $b + B(0, r_2) \subset V$, $\eps_2(0) = 0$, $\eps_2(k) \xrightarrow[k \to 0]{} 0$, tels que $g(b + k) = g(b) + M(k) + \norm k\,\eps_2(k)$ ($\norm k < r_2$).

**Étape 2 ($g \circ f$ est définie près de $a$)**　$f$ est continue en $a$ ({@fr:diff-prop}), donc il existe $r_3 \in \,]0, r_1]$ tel que $\norm h < r_3 \implies \norm{f(a + h) - b} < r_2$. Pour un tel $h$, posons $k(h) = f(a + h) - b$ ; alors $\norm{k(h)} < r_2$ et $f(a + h) = b + k(h) \in V$.

**Étape 3 ($\norm{k(h)} \le C\norm h$)**　D'après l'étape 1, $k(h) = L(h) + \norm h\,\eps_1(h)$. Comme $\eps_1(h) \to 0$, il existe $r_4 \in \,]0, r_3]$ tel que $\norm h < r_4 \implies \norm{\eps_1(h)} \le 1$. Posons $C = \norm L + 1$. Pour $\norm h < r_4$ :
$$\norm{k(h)} \le \norm{L(h)} + \norm h\,\norm{\eps_1(h)} \le \norm L\,\norm h + \norm h = C\norm h.$$

**Étape 4 (développement)**　Pour $\norm h < r_4$, on applique le développement de $g$ avec $k = k(h)$ et on utilise la linéarité de $M$ :
$$\begin{aligned}
g(f(a + h)) &= g(b) + M(k(h)) + \norm{k(h)}\,\eps_2(k(h))\\
&= g(b) + M(L(h)) + \norm h\,M(\eps_1(h)) + \norm{k(h)}\,\eps_2(k(h)).
\end{aligned}$$

**Étape 5 (le reste tend vers $0$)**　Pour $0 < \norm h < r_4$, posons $\eps_3(h) = M(\eps_1(h)) + \dfrac{\norm{k(h)}}{\norm h}\,\eps_2(k(h))$, et $\eps_3(0) = 0$. Alors $g(f(a + h)) = g(b) + (M \circ L)(h) + \norm h\,\eps_3(h)$ et, d'après l'étape 3,
$$\norm{\eps_3(h)} \le \norm M\,\norm{\eps_1(h)} + C\,\norm{\eps_2(k(h))}.$$
Soit $\eta > 0$. Comme $\eps_1(h) \to 0$, il existe $\rho_1 > 0$ tel que $\norm h < \rho_1 \implies \norm M\,\norm{\eps_1(h)} \le \frac\eta2$. Comme $\eps_2(k) \to 0$ et $\eps_2(0) = 0$, il existe $\rho_2 > 0$ tel que $\norm k < \rho_2 \implies C\norm{\eps_2(k)} \le \frac\eta2$ (y compris pour $k = 0$). Posons $\rho = \min\big(r_4, \rho_1, \rho_2/C\big)$. Si $\norm h < \rho$, alors $\norm{k(h)} \le C\norm h < \rho_2$, donc $\norm{\eps_3(h)} \le \frac\eta2 + \frac\eta2 = \eta$. Ainsi $\eps_3(h) \to 0$.

**Étape 6 (conclusion et forme matricielle)**　$M \circ L$ est linéaire, donc $g \circ f$ est différentiable en $a$ et $\dd(g \circ f)(a) = M \circ L = \dd g(f(a)) \circ \dd f(a)$. La matrice d'une composée d'applications linéaires est le produit des matrices, d'où $J_{g \circ f}(a) = J_g(b)J_f(a)$ ; le coefficient d'indice $(i, j)$ donne la forme en coordonnées.
:::

::: rem
**两个最常用的特例。**

1. **沿曲线求导**：若 $\gamma : I \to U$ 在 $t$ 可导，$f$ 在 $\gamma(t)$ 可微，则由链式法则与 {@c9-diff-reel}（$\gamma'(t) = \dd\gamma(t)(1)$），
   $$(f \circ \gamma)'(t) = \dd f(\gamma(t))\big(\gamma'(t)\big) \;=\; \ps{\nabla f(\gamma(t)), \gamma'(t)}\quad\text{（$f$ 实值，$E$ 为 Euclid 空间时）}.$$
2. **偏导数的链式法则**：若 $F(u, v) = f(x(u, v), y(u, v))$，则 $\dfrac{\partial F}{\partial u} = \dfrac{\partial f}{\partial x}\dfrac{\partial x}{\partial u} + \dfrac{\partial f}{\partial y}\dfrac{\partial y}{\partial u}$，对 $v$ 同样（把 $u$ 换成 $v$）。

**可微性的假设不能换成「偏导数存在」。** 取 {@c9-ex-continuite} 中的 $f(x, y) = \frac{x^2y}{x^2 + y^2}$，它在原点的两个偏导数都是 $0$，但不可微。沿 $\gamma(t) = (t, t)$：$f(\gamma(t)) = \frac t2$，导数为 $\frac12$；而「公式」$\partial_xf(0)\cdot1 + \partial_yf(0)\cdot1$ 给出 $0$。
:::

::: ex id=c9-ex-polaires-chaine zh="极坐标下的偏导数" lvl=1
设 $f : \R^2 \to \R$ 可微，$\Phi(r, \theta) = (r\cos\theta, r\sin\theta)$，$F = f \circ \Phi$。$\Phi$ 的分量的偏导数都连续，由 {@c1-partielles}，$\Phi$ 可微，
$$J_\Phi(r, \theta) = \begin{pmatrix}\cos\theta & -r\sin\theta\\ \sin\theta & r\cos\theta\end{pmatrix}.$$
由链式法则 $J_F(r, \theta) = J_f(\Phi(r, \theta))\,J_\Phi(r, \theta)$，即（右边的偏导数都在 $\Phi(r, \theta)$ 处取值）
$$\frac{\partial F}{\partial r} = \cos\theta\,\frac{\partial f}{\partial x} + \sin\theta\,\frac{\partial f}{\partial y},\qquad \frac{\partial F}{\partial \theta} = -r\sin\theta\,\frac{\partial f}{\partial x} + r\cos\theta\,\frac{\partial f}{\partial y}.$$
把第一式平方，加上第二式除以 $r$（$r > 0$）后的平方，交叉项抵消，$\cos^2\theta + \sin^2\theta = 1$：
$$\Big(\frac{\partial f}{\partial x}\Big)^2 + \Big(\frac{\partial f}{\partial y}\Big)^2 = \Big(\frac{\partial F}{\partial r}\Big)^2 + \frac1{r^2}\Big(\frac{\partial F}{\partial \theta}\Big)^2.$$
这是 $\norm{\nabla f}^2$ 的极坐标表达式。
:::

::: q
设 $f : \R^n \setminus \{0\} \to \R$ 可微，且是 $\alpha$ 次**正齐次**的：$f(tx) = t^\alpha f(x)$ 对一切 $t > 0$、$x \ne 0$ 成立。证明 **Euler 恒等式** $\ps{\nabla f(x), x} = \alpha f(x)$。
:::

::: ans
固定 $x \ne 0$，令 $\varphi(t) = f(tx)$，$t > 0$。一方面 $\varphi(t) = t^\alpha f(x)$，所以 $\varphi'(1) = \alpha f(x)$。另一方面 $t \mapsto tx$ 可导、导数为 $x$，由链式法则（上面注中的特例 1），$\varphi'(1) = \dd f(x)(x) = \ps{\nabla f(x), x}$。两者相等。例：$f(x, y) = \sqrt{x^2 + y^2}$，$\alpha = 1$，$x\partial_xf + y\partial_yf = \frac{x^2 + y^2}{\sqrt{x^2 + y^2}} = f$。
:::

::: prop id=diff-bilineaire zh="双线性映射与乘积" en="Differential of bilinear maps and products" fr="Différentielle d’une application bilinéaire, d’un produit" ru="Дифференцирование билинейных отображений и произведений" lvl=1
设 $E_1, E_2$ 是有限维赋范空间，$E_1 \times E_2$ 带范数 $\norm{(h, k)} = \max(\norm h, \norm k)$。

1. 线性映射 $L \in \Lin(E, F)$ 处处可微，$\dd L(a) = L$。
2. 双线性映射 $B : E_1 \times E_2 \to F$ 处处可微，$\dd B(a, b)(h, k) = B(a, k) + B(h, b)$。
3. 推论：若 $u : U \to E_1$，$v : U \to E_2$ 在 $x$ 可微，则 $B(u, v) : y \mapsto B(u(y), v(y))$ 在 $x$ 可微，
   $$\dd\big[B(u, v)\big](x)(h) = B\big(\dd u(x)h, v(x)\big) + B\big(u(x), \dd v(x)h\big).$$
   特别地：$\dd(uv) = u\,\dd v + v\,\dd u$（实值函数），$\dd\ps{u, v} = \ps{\dd u, v} + \ps{u, \dd v}$，$\dd(UV) = (\dd U)V + U(\dd V)$（矩阵值函数）。
:::

::: fr
Soient $E_1, E_2$ deux espaces vectoriels normés de dimension finie ; on munit $E_1 \times E_2$ de la norme $\norm{(h, k)} = \max(\norm h, \norm k)$.

1. Toute application linéaire $L \in \Lin(E, F)$ est différentiable en tout point, et $\dd L(a) = L$.
2. Toute application bilinéaire $B : E_1 \times E_2 \to F$ est différentiable en tout point, et $\dd B(a, b)(h, k) = B(a, k) + B(h, b)$.
3. Corollaire : si $u : U \to E_1$ et $v : U \to E_2$ sont différentiables en $x$, alors $B(u, v) : y \mapsto B(u(y), v(y))$ est différentiable en $x$ et
   $$\dd\big[B(u, v)\big](x)(h) = B\big(\dd u(x)h, v(x)\big) + B\big(u(x), \dd v(x)h\big).$$
   En particulier : $\dd(uv) = u\,\dd v + v\,\dd u$ (fonctions réelles), $\dd\ps{u, v} = \ps{\dd u, v} + \ps{u, \dd v}$, $\dd(UV) = (\dd U)V + U(\dd V)$ (fonctions matricielles).
:::

::: proof
▷ 思路：(1) 余项为零。(2) 展开 $B(a + h, b + k)$，一次项给出微分，余项是 $B(h, k)$，它是「二阶小量」：先证一个界 $\norm{B(h, k)} \le C\norm h\norm k$。(3) 把 $B(u, v)$ 写成 $B \circ (u, v)$，用链式法则。

**第 1 步（线性映射）**　$L(a + h) - L(a) - L(h) = 0$，余项为零，所以 $\dd L(a) = L$。

**第 2 步（双线性映射的界）**　取 $E_1$ 的基 $(\varepsilon_1, \dots, \varepsilon_m)$、$E_2$ 的基 $(\phi_1, \dots, \phi_q)$，并在两个空间上用坐标的 $\norm\cdot_\infty$（由 {@equiv-dimfinie}，换成其他范数只改变下面的常数）。对 $h = \sum_ih_i\varepsilon_i$，$k = \sum_jk_j\phi_j$，由双线性，
$$\norm{B(h, k)} = \Big\lVert\sum_{i,j}h_ik_j\,B(\varepsilon_i, \phi_j)\Big\rVert \le \sum_{i,j}\abs{h_i}\abs{k_j}\,\norm{B(\varepsilon_i, \phi_j)} \le C\,\norm h_\infty\norm k_\infty,\qquad C = \sum_{i,j}\norm{B(\varepsilon_i, \phi_j)}.$$

**第 3 步（双线性映射可微）**　由双线性，
$$B(a + h, b + k) = B(a, b) + \underbrace{B(a, k) + B(h, b)}_{\text{关于 }(h,k)\text{ 线性}} + B(h, k).$$
由第 2 步，$\norm{B(h, k)} \le C\norm h\norm k \le C\norm{(h, k)}^2$。对 $(h, k) \ne 0$ 令 $\eps(h, k) = B(h, k)/\norm{(h, k)}$，则 $\norm{\eps(h, k)} \le C\norm{(h, k)} \to 0$。所以 $B$ 在 $(a, b)$ 可微，$\dd B(a, b)(h, k) = B(a, k) + B(h, b)$。

**第 4 步（推论）**　令 $\Phi(y) = (u(y), v(y)) \in E_1 \times E_2$。由 {@c9-operations} 第 2 条，$\Phi$ 在 $x$ 可微，$\dd\Phi(x)h = (\dd u(x)h, \dd v(x)h)$。$B(u, v) = B \circ \Phi$，由链式法则 {@chain-rule} 与第 3 步，
$$\dd(B \circ \Phi)(x)(h) = \dd B(\Phi(x))\big(\dd\Phi(x)h\big) = B\big(u(x), \dd v(x)h\big) + B\big(\dd u(x)h, v(x)\big).$$
取 $B(s, t) = st$（$\R \times \R \to \R$）、$B = \ps{\cdot, \cdot}$、$B(X, Y) = XY$（$\M_n(\R)^2 \to \M_n(\R)$），即得三个特例。
:::

::: fr
▷ Méthode : (1) le reste est nul. (2) On développe $B(a + h, b + k)$ : les termes du premier ordre donnent la différentielle, le reste est $B(h, k)$, qui est « du second ordre » ; on établit d'abord une majoration $\norm{B(h, k)} \le C\norm h\norm k$. (3) On écrit $B(u, v) = B \circ (u, v)$ et on applique la règle de la chaîne.

**Étape 1 (applications linéaires)**　$L(a + h) - L(a) - L(h) = 0$ ; le reste est nul, donc $\dd L(a) = L$.

**Étape 2 (majoration d'une application bilinéaire)**　Soient $(\varepsilon_1, \dots, \varepsilon_m)$ une base de $E_1$ et $(\phi_1, \dots, \phi_q)$ une base de $E_2$ ; on munit les deux espaces de la norme $\norm\cdot_\infty$ des coordonnées (d'après {@fr:equiv-dimfinie}, changer de normes ne modifie que la constante ci-dessous). Pour $h = \sum_ih_i\varepsilon_i$ et $k = \sum_jk_j\phi_j$, par bilinéarité,
$$\norm{B(h, k)} = \Big\lVert\sum_{i,j}h_ik_j\,B(\varepsilon_i, \phi_j)\Big\rVert \le \sum_{i,j}\abs{h_i}\abs{k_j}\,\norm{B(\varepsilon_i, \phi_j)} \le C\,\norm h_\infty\norm k_\infty,\qquad C = \sum_{i,j}\norm{B(\varepsilon_i, \phi_j)}.$$

**Étape 3 (différentiabilité de $B$)**　Par bilinéarité,
$$B(a + h, b + k) = B(a, b) + \underbrace{B(a, k) + B(h, b)}_{\text{linéaire en }(h,k)} + B(h, k).$$
D'après l'étape 2, $\norm{B(h, k)} \le C\norm h\norm k \le C\norm{(h, k)}^2$. Pour $(h, k) \ne 0$, posons $\eps(h, k) = B(h, k)/\norm{(h, k)}$ ; alors $\norm{\eps(h, k)} \le C\norm{(h, k)} \to 0$. Donc $B$ est différentiable en $(a, b)$ et $\dd B(a, b)(h, k) = B(a, k) + B(h, b)$.

**Étape 4 (corollaire)**　Posons $\Phi(y) = (u(y), v(y)) \in E_1 \times E_2$. D'après le point 2 de {@fr:c9-operations}, $\Phi$ est différentiable en $x$ et $\dd\Phi(x)h = (\dd u(x)h, \dd v(x)h)$. Comme $B(u, v) = B \circ \Phi$, la règle de la chaîne {@fr:chain-rule} et l'étape 3 donnent
$$\dd(B \circ \Phi)(x)(h) = \dd B(\Phi(x))\big(\dd\Phi(x)h\big) = B\big(u(x), \dd v(x)h\big) + B\big(\dd u(x)h, v(x)\big).$$
Avec $B(s, t) = st$ ($\R \times \R \to \R$), $B = \ps{\cdot, \cdot}$ et $B(X, Y) = XY$ ($\M_n(\R)^2 \to \M_n(\R)$), on obtient les trois cas particuliers.
:::

::: lem id=c9-neumann zh="Neumann 级数" en="Neumann series" fr="Série de Neumann" ru="Ряд Неймана" lvl=1
在 $\R^n$ 上取一个范数，$\M_n(\R)$ 上取相应的算子范数（于是 $\norm{XY} \le \norm X\norm Y$，$\norm I = 1$）。若 $K \in \M_n(\R)$，$\norm K < 1$，则 $I + K$ 可逆，
$$(I + K)^{-1} = \sum_{m \ge 0}(-K)^m,\qquad \norm{(I + K)^{-1}} \le \frac1{1 - \norm K},\qquad \norm{(I + K)^{-1} - I + K} \le \frac{\norm K^2}{1 - \norm K}.$$
:::

::: fr
On munit $\R^n$ d'une norme et $\M_n(\R)$ de la norme subordonnée (donc $\norm{XY} \le \norm X\norm Y$ et $\norm I = 1$). Si $K \in \M_n(\R)$ vérifie $\norm K < 1$, alors $I + K$ est inversible et
$$(I + K)^{-1} = \sum_{m \ge 0}(-K)^m,\qquad \norm{(I + K)^{-1}} \le \frac1{1 - \norm K},\qquad \norm{(I + K)^{-1} - I + K} \le \frac{\norm K^2}{1 - \norm K}.$$
:::

::: proof
▷ 思路：模仿几何级数 $\frac1{1 + x} = \sum(-x)^m$（$\abs x < 1$）：级数绝对收敛，部分和乘以 $I + K$ 后望远镜式相消。

**第 1 步（收敛）**　由次乘性，归纳得 $\norm{(-K)^m} \le \norm K^m$。几何级数 $\sum\norm K^m$ 收敛（$\norm K < 1$）。$\M_n(\R)$ 有限维，所以完备（{@dimfinie-complet}）；由 {@serie-abs-banach}，$S = \sum_{m \ge 0}(-K)^m$ 收敛，且 $\norm S \le \sum_m\norm K^m = \frac1{1 - \norm K}$。

**第 2 步（$S$ 是逆）**　令 $S_N = \sum_{m=0}^N(-K)^m$。则
$$(I + K)S_N = \sum_{m=0}^N(-K)^m - \sum_{m=0}^N(-K)^{m+1} = I - (-K)^{N+1},$$
$S_N$ 是 $K$ 的多项式，与 $K$ 可交换，所以 $S_N(I + K) = (I + K)S_N = I - (-K)^{N+1}$。$\norm{(-K)^{N+1}} \le \norm K^{N+1} \to 0$，而矩阵乘法连续（{@diff-bilineaire} 第 2 步的界），令 $N \to \infty$ 得 $(I + K)S = S(I + K) = I$。

**第 3 步（余项的界）**　$S - I + K = \sum_{m \ge 2}(-K)^m = K^2S$（对部分和 $\sum_{m=2}^{N+2}(-K)^m = K^2S_N$ 取极限）。所以 $\norm{S - I + K} \le \norm K^2\norm S \le \frac{\norm K^2}{1 - \norm K}$。
:::

::: fr
▷ Méthode : on imite la série géométrique $\frac1{1 + x} = \sum(-x)^m$ ($\abs x < 1$) : la série converge absolument, et ses sommes partielles multipliées par $I + K$ se télescopent.

**Étape 1 (convergence)**　Par sous-multiplicativité et récurrence, $\norm{(-K)^m} \le \norm K^m$. La série géométrique $\sum\norm K^m$ converge ($\norm K < 1$). L'espace $\M_n(\R)$ est de dimension finie, donc complet ({@fr:dimfinie-complet}) ; d'après {@fr:serie-abs-banach}, $S = \sum_{m \ge 0}(-K)^m$ converge et $\norm S \le \sum_m\norm K^m = \frac1{1 - \norm K}$.

**Étape 2 ($S$ est l'inverse)**　Posons $S_N = \sum_{m=0}^N(-K)^m$. Alors
$$(I + K)S_N = \sum_{m=0}^N(-K)^m - \sum_{m=0}^N(-K)^{m+1} = I - (-K)^{N+1},$$
et, comme $S_N$ est un polynôme en $K$ et commute donc avec $K$, $S_N(I + K) = (I + K)S_N = I - (-K)^{N+1}$. Comme $\norm{(-K)^{N+1}} \le \norm K^{N+1} \to 0$ et que le produit matriciel est continu (majoration de l'étape 2 de {@fr:diff-bilineaire}), on obtient en faisant $N \to \infty$ : $(I + K)S = S(I + K) = I$.

**Étape 3 (majoration du reste)**　$S - I + K = \sum_{m \ge 2}(-K)^m = K^2S$ (passage à la limite dans $\sum_{m=2}^{N+2}(-K)^m = K^2S_N$). Donc $\norm{S - I + K} \le \norm K^2\norm S \le \frac{\norm K^2}{1 - \norm K}$.
:::

::: ex id=diff-inverse-det zh="矩阵求逆与行列式的微分" lvl=1
$\M_n(\R)$ 上取算子范数（{@c9-neumann}）。

**1. 求逆。** $\GL_n(\R)$ 是开集，$\varphi(A) = A^{-1}$ 在 $\GL_n(\R)$ 上可微，$\dd\varphi(A)(H) = -A^{-1}HA^{-1}$。

- 设 $A \in \GL_n(\R)$，$\norm H < 1/\norm{A^{-1}}$。令 $K = A^{-1}H$，则 $\norm K \le \norm{A^{-1}}\norm H < 1$。由 {@c9-neumann}，$A + H = A(I + K)$ 可逆。所以 $B(A, 1/\norm{A^{-1}}) \subset \GL_n(\R)$：$\GL_n(\R)$ 是开集。
- $(A + H)^{-1} = (I + K)^{-1}A^{-1}$，于是
  $$(A + H)^{-1} - A^{-1} - \big(-A^{-1}HA^{-1}\big) = \big[(I + K)^{-1} - I + K\big]A^{-1}.$$
- 由 {@c9-neumann}，当 $\norm H \le \frac1{2\norm{A^{-1}}}$ 时（此时 $\norm K \le \frac12$），上式的范数
  $$\le \frac{\norm K^2}{1 - \norm K}\norm{A^{-1}} \le 2\norm{A^{-1}}^3\norm H^2.$$
  所以余项 $= \norm H\,\eps(H)$，$\norm{\eps(H)} \le 2\norm{A^{-1}}^3\norm H \to 0$。$H \mapsto -A^{-1}HA^{-1}$ 是线性的，结论成立。$n = 1$ 时就是 $(1/x)' = -1/x^2$。

**2. Jacobi 公式。** $\det$ 在 $\M_n(\R)$ 上处处可微，$\dd(\det)(A)(H) = \tr\big(\operatorname{com}(A)^TH\big) = \sum_{i,j}\operatorname{com}(A)_{ij}h_{ij}$，其中 $\operatorname{com}(A)_{ij} = (-1)^{i+j}\det(A \text{ 去掉第 } i \text{ 行第 } j \text{ 列})$ 是代数余子式。特别地 $\dd(\det)(I)(H) = \tr H$；$A$ 可逆时 $\operatorname{com}(A)^T = \det(A)\,A^{-1}$，故 $\dd(\det)(A)(H) = \det(A)\tr(A^{-1}H)$。

- 记 $A$ 的列为 $C_1, \dots, C_n$，$H$ 的列为 $D_1, \dots, D_n$。$\det$ 关于每一列线性，所以
  $$\det(A + H) = \sum_{S \subset \{1, \dots, n\}}\det(M_S),$$
  其中 $M_S$ 的第 $j$ 列在 $j \in S$ 时为 $D_j$，否则为 $C_j$。
- $S = \varnothing$ 给出 $\det A$。$S = \{j\}$ 时，按第 $j$ 列展开：$\det(M_{\{j\}}) = \sum_i h_{ij}\operatorname{com}(A)_{ij}$（去掉第 $j$ 列后剩下的是 $A$ 的列）。对 $j$ 求和得 $\sum_{i,j}\operatorname{com}(A)_{ij}h_{ij} = \tr(\operatorname{com}(A)^TH)$，关于 $H$ 线性。
- $\abs S \ge 2$ 时，用 Leibniz 公式，$\det(M_S)$ 是 $n!$ 个乘积之和，每个乘积有 $\abs S \ge 2$ 个因子来自 $H$、其余来自 $A$。记 $\norm X_{\max} = \max_{i,j}\abs{x_{ij}}$，$c = \max(1, \norm A_{\max})$。当 $\norm H_{\max} \le 1$ 时，每个乘积的绝对值 $\le \norm H_{\max}^2c^n$，所以 $\abs{\det M_S} \le n!\,c^n\norm H_{\max}^2$。这样的 $S$ 不超过 $2^n$ 个，因此
  $$\abs{\det(A + H) - \det A - \tr(\operatorname{com}(A)^TH)} \le 2^n\,n!\,c^n\,\norm H_{\max}^2 = o(\norm H_{\max}).$$

**与 Liouville 公式比较**（{@liouville-formule}）：若 $\Phi' = A(t)\Phi$，$\Phi(t)$ 可逆，$W = \det\Phi$，则沿曲线 $t \mapsto \Phi(t)$ 用链式法则，$W' = \dd(\det)(\Phi)(\Phi') = \det(\Phi)\tr(\Phi^{-1}A\Phi) = \tr(A)\,W$。Liouville 公式正是 Jacobi 公式与链式法则的结合。

$\varphi$ 与 $\det$ 实际上是 $\Cc^\infty$ 的，见 {@c9-inv-cinfini}。
:::

::: q
设 $A \in \M_n(\R)$（不一定对称），$f(x) = \ps{Ax, x}$（$\R^n$ 标准内积）。求 $\dd f(x)$ 与 $\nabla f(x)$。
:::

::: ans
$f = B(u, v)$，其中 $B = \ps{\cdot,\cdot}$，$u(x) = Ax$，$v(x) = x$，二者线性（$\dd u(x) = A$，$\dd v(x) = \Id$）。由 {@diff-bilineaire} 第 3 条，$\dd f(x)(h) = \ps{Ah, x} + \ps{Ax, h} = \ps{A^Tx, h} + \ps{Ax, h} = \ps{(A + A^T)x, h}$。所以 $\nabla f(x) = (A + A^T)x$；$A$ 对称时 $\nabla f(x) = 2Ax$。
:::

## C¹ 函数

上一节说明了「偏导数存在」远不足以推出可微。这一节给出实际中最常用的判别法：**偏导数存在且连续 ⇒ 可微**（而且微分连续）。然后证明有限增量不等式：微分有界的函数是 Lipschitz 的。

::: def id=c9-def-c1 zh="$\Cc^1$ 映射" en="Continuously differentiable map" fr="Application de classe $\mathcal{C}^1$" ru="Непрерывно дифференцируемое отображение"
$f : U \to F$ 在 $U$ 上是 **$\Cc^1$ 的**（连续可微），如果它在 $U$ 上处处可微，且微分映射 $\dd f : U \to \Lin(E, F)$ 连续（$\Lin(E, F)$ 带算子范数）：
$$\forall a \in U,\ \forall \eta > 0,\ \exists \delta > 0,\ \forall x \in U,\quad \norm{x - a} < \delta \implies \norm{\dd f(x) - \dd f(a)} \le \eta.$$
:::

::: fr
On dit que $f : U \to F$ est **de classe $\mathcal{C}^1$** sur $U$ si elle est différentiable en tout point de $U$ et si l'application différentielle $\dd f : U \to \Lin(E, F)$ est continue ($\Lin(E, F)$ étant muni de la norme subordonnée) :
$$\forall a \in U,\ \forall \eta > 0,\ \exists \delta > 0,\ \forall x \in U,\quad \norm{x - a} < \delta \implies \norm{\dd f(x) - \dd f(a)} \le \eta.$$
:::

白话：最佳线性近似随着点连续地变化。由 {@equiv-dimfinie}，$\Lin(E, F)$ 上换成任何范数（例如矩阵元的最大绝对值），连续性不变；所以在 $\R^n$ 上，$\dd f$ 连续等价于 Jacobi 矩阵的每个元素连续。

::: ex id=c9-ex-c1 lvl=1
1. 线性映射 $L$：$\dd L(x) = L$ 是常值映射，所以 $L$ 是 $\Cc^1$ 的。
2. $f(x) = \norm x^2$（Euclid 空间）：$\dd f(x) = 2\ps{x, \cdot}$（{@c9-ex-differentielles}），$\norm{\dd f(x) - \dd f(a)} = \sup_{\norm h = 1}\abs{2\ps{x - a, h}} = 2\norm{x - a}$（Cauchy–Schwarz，取 $h = \frac{x - a}{\norm{x - a}}$ 时取等），所以 $f$ 是 $\Cc^1$ 的。
3. **可微但不是 $\Cc^1$**：$f(x) = x^2\sin\frac1x$（$x \ne 0$），$f(0) = 0$。由 $\abs{t\sin\frac1t} \le \abs t$，$f'(0) = \lim_{t \to 0}t\sin\frac1t = 0$；对 $x \ne 0$，$f'(x) = 2x\sin\frac1x - \cos\frac1x$。取 $x_m = \frac{1}{2\pi m}$：$f'(x_m) = -1 \not\to f'(0)$。由 {@c9-diff-reel}，$\norm{\dd f(x) - \dd f(0)} = \abs{f'(x) - f'(0)}$，所以 $\dd f$ 在 $0$ 不连续。
:::

::: lem id=c9-diff-partielles-point zh="逐点的偏导数判别法" en="Pointwise criterion via partial derivatives" fr="Critère ponctuel de différentiabilité par les dérivées partielles" ru="Достаточное условие дифференцируемости в точке" lvl=1
设 $U \subset \R^n$ 开，$f : U \to \R^p$，$a \in U$。若所有偏导数 $\partial_1f, \dots, \partial_nf$ 在 $a$ 的某个邻域上存在，且在 $a$ 处连续，则 $f$ 在 $a$ 可微，且 $\dd f(a)(h) = \sum_{j=1}^n h_j\,\partial_jf(a)$。
:::

::: fr
Soit $U \subset \R^n$ ouvert, $f : U \to \R^p$ et $a \in U$. Si toutes les dérivées partielles $\partial_1f, \dots, \partial_nf$ existent sur un voisinage de $a$ et sont continues en $a$, alors $f$ est différentiable en $a$ et $\dd f(a)(h) = \sum_{j=1}^n h_j\,\partial_jf(a)$.
:::

::: proof
▷ 思路：从 $a$ 走到 $a + h$，沿坐标轴走一条折线，每段只改变一个坐标。每一段上 $f$ 是一个变量的函数，可以用一元的中值定理，而那一段上的导数恰好是一个偏导数；偏导数在 $a$ 的连续性保证它与 $\partial_jf(a)$ 相差很小。全程在 $\R^n$、$\R^p$ 上都用 $\norm\cdot_\infty$。我们要证：对任意 $\eta > 0$，存在 $\delta > 0$，使 $\norm h_\infty < \delta$ 时 $\norm{f(a + h) - f(a) - \sum_jh_j\partial_jf(a)}_\infty \le n\eta\norm h_\infty$。

**第 1 步（翻译假设）**　存在 $r > 0$，使 $B_\infty(a, r) \subset U$ 且各 $\partial_jf$ 在 $B_\infty(a, r)$ 上存在。设 $\eta > 0$。由 $\partial_jf$ 在 $a$ 连续，存在 $\delta_j > 0$，使 $\norm{x - a}_\infty < \delta_j \implies \norm{\partial_jf(x) - \partial_jf(a)}_\infty \le \eta$。令 $\delta = \min(r, \delta_1, \dots, \delta_n)$。

**第 2 步（折线）**　设 $\norm h_\infty < \delta$。令 $a_0 = a$，$a_k = a + \sum_{j \le k}h_je_j$（$1 \le k \le n$），则 $a_n = a + h$，且
$$f(a + h) - f(a) = \sum_{k=1}^n\big[f(a_k) - f(a_{k-1})\big].$$
点 $a_{k-1} + te_k$（$t$ 介于 $0$ 与 $h_k$ 之间）的每个坐标与 $a$ 的对应坐标至多相差 $\norm h_\infty$，所以它们都在 $B_\infty(a, \delta) \subset U$ 中。

**第 3 步（一元函数）**　固定 $k$，在以 $0$、$h_k$ 为端点的闭区间 $I_k$ 上令
$$\psi(t) = f(a_{k-1} + te_k) - t\,\partial_kf(a) \in \R^p.$$
由偏导数的定义，$s \mapsto f(a_{k-1} + se_k)$ 在 $s = t$ 处的导数是 $\partial_kf(a_{k-1} + te_k)$。所以 $\psi$ 在 $I_k$ 上可导，$\psi'(t) = \partial_kf(a_{k-1} + te_k) - \partial_kf(a)$，由第 1、2 步，$\norm{\psi'(t)}_\infty \le \eta$。

**第 4 步（逐分量用中值定理）**　若 $h_k = 0$，则 $f(a_k) - f(a_{k-1}) - h_k\partial_kf(a) = 0$。若 $h_k \ne 0$，对每个分量 $\psi_i$（实值可导函数）用 L1 的中值定理：存在 $c_i$ 介于 $0$ 与 $h_k$ 之间，使 $\psi_i(h_k) - \psi_i(0) = h_k\psi_i'(c_i)$，所以 $\abs{\psi_i(h_k) - \psi_i(0)} \le \eta\abs{h_k}$。对 $i$ 取最大值：
$$\norm{f(a_k) - f(a_{k-1}) - h_k\,\partial_kf(a)}_\infty = \norm{\psi(h_k) - \psi(0)}_\infty \le \eta\abs{h_k}.$$

**第 5 步（求和）**　由第 2 步与三角不等式，
$$\Big\lVert f(a + h) - f(a) - \sum_{k=1}^nh_k\,\partial_kf(a)\Big\rVert_\infty \le \sum_{k=1}^n\eta\abs{h_k} \le n\eta\norm h_\infty.$$
$L(h) = \sum_kh_k\partial_kf(a)$ 是线性的；$\eta > 0$ 任意（把 $\eta$ 换成 $\eta/n$ 即得定义中的形式）。所以 $f$ 在 $a$ 可微，$\dd f(a) = L$。
:::

::: fr
▷ Méthode : pour aller de $a$ à $a + h$, on suit une ligne brisée parallèle aux axes, en ne modifiant qu'une coordonnée à la fois. Sur chaque segment, $f$ est une fonction d'une seule variable, à laquelle on applique le théorème des accroissements finis, et la dérivée y est précisément une dérivée partielle ; la continuité des dérivées partielles en $a$ garantit qu'elle est proche de $\partial_jf(a)$. On utilise partout la norme $\norm\cdot_\infty$ sur $\R^n$ et $\R^p$. On veut montrer que pour tout $\eta > 0$, il existe $\delta > 0$ tel que $\norm h_\infty < \delta$ entraîne $\norm{f(a + h) - f(a) - \sum_jh_j\partial_jf(a)}_\infty \le n\eta\norm h_\infty$.

**Étape 1 (on traduit les hypothèses)**　Il existe $r > 0$ tel que $B_\infty(a, r) \subset U$ et que les $\partial_jf$ existent sur $B_\infty(a, r)$. Soit $\eta > 0$. Par continuité de $\partial_jf$ en $a$, il existe $\delta_j > 0$ tel que $\norm{x - a}_\infty < \delta_j \implies \norm{\partial_jf(x) - \partial_jf(a)}_\infty \le \eta$. Posons $\delta = \min(r, \delta_1, \dots, \delta_n)$.

**Étape 2 (ligne brisée)**　Soit $\norm h_\infty < \delta$. Posons $a_0 = a$ et $a_k = a + \sum_{j \le k}h_je_j$ ($1 \le k \le n$), de sorte que $a_n = a + h$ et
$$f(a + h) - f(a) = \sum_{k=1}^n\big[f(a_k) - f(a_{k-1})\big].$$
Chaque coordonnée d'un point $a_{k-1} + te_k$ ($t$ entre $0$ et $h_k$) diffère de celle de $a$ d'au plus $\norm h_\infty$, donc ces points sont dans $B_\infty(a, \delta) \subset U$.

**Étape 3 (fonction d'une variable)**　Fixons $k$ et posons, sur le segment $I_k$ d'extrémités $0$ et $h_k$,
$$\psi(t) = f(a_{k-1} + te_k) - t\,\partial_kf(a) \in \R^p.$$
Par définition de la dérivée partielle, la dérivée de $s \mapsto f(a_{k-1} + se_k)$ en $s = t$ est $\partial_kf(a_{k-1} + te_k)$. Donc $\psi$ est dérivable sur $I_k$, $\psi'(t) = \partial_kf(a_{k-1} + te_k) - \partial_kf(a)$, et d'après les étapes 1 et 2, $\norm{\psi'(t)}_\infty \le \eta$.

**Étape 4 (accroissements finis composante par composante)**　Si $h_k = 0$, alors $f(a_k) - f(a_{k-1}) - h_k\partial_kf(a) = 0$. Si $h_k \ne 0$, on applique à chaque composante $\psi_i$ (fonction réelle dérivable) le théorème des accroissements finis de L1 : il existe $c_i$ entre $0$ et $h_k$ tel que $\psi_i(h_k) - \psi_i(0) = h_k\psi_i'(c_i)$, donc $\abs{\psi_i(h_k) - \psi_i(0)} \le \eta\abs{h_k}$. En prenant le maximum sur $i$ :
$$\norm{f(a_k) - f(a_{k-1}) - h_k\,\partial_kf(a)}_\infty = \norm{\psi(h_k) - \psi(0)}_\infty \le \eta\abs{h_k}.$$

**Étape 5 (sommation)**　D'après l'étape 2 et l'inégalité triangulaire,
$$\Big\lVert f(a + h) - f(a) - \sum_{k=1}^nh_k\,\partial_kf(a)\Big\rVert_\infty \le \sum_{k=1}^n\eta\abs{h_k} \le n\eta\norm h_\infty.$$
L'application $L(h) = \sum_kh_k\partial_kf(a)$ est linéaire, et $\eta > 0$ est arbitraire (remplacer $\eta$ par $\eta/n$ donne la forme de la définition). Donc $f$ est différentiable en $a$ et $\dd f(a) = L$.
:::

::: thm id=c1-partielles zh="$\Cc^1$ 的偏导数判别法" en="$C^1$ criterion via partial derivatives" fr="Caractérisation des fonctions $\mathcal{C}^1$ par les dérivées partielles" ru="Достаточное условие дифференцируемости" lvl=1
设 $U \subset \R^n$ 开，$f : U \to \R^p$。$f$ 在 $U$ 上是 $\Cc^1$ 的，当且仅当所有偏导数 $\frac{\partial f}{\partial x_j}$（$1 \le j \le n$）在 $U$ 上存在且连续。此时 $\dd f(x)(h) = \sum_jh_j\,\partial_jf(x)$。
:::

::: fr
Soit $U \subset \R^n$ ouvert et $f : U \to \R^p$. Alors $f$ est de classe $\mathcal{C}^1$ sur $U$ si et seulement si toutes les dérivées partielles $\frac{\partial f}{\partial x_j}$ ($1 \le j \le n$) existent et sont continues sur $U$. Dans ce cas, $\dd f(x)(h) = \sum_jh_j\,\partial_jf(x)$.
:::

::: proof
▷ 思路：偏导数是 $\dd f$ 在基向量上的值，所以 (⇒) 只需把 $\dd f$ 的连续性「投影」到各列；(⇐) 先由 {@c9-diff-partielles-point} 得到每点可微，再用「矩阵元小 ⇒ 算子范数小」得到 $\dd f$ 连续。

**(⇒)**　设 $f$ 是 $\Cc^1$ 的。由 {@c9-jacobienne}，对每个 $x \in U$，$\partial_jf(x) = \dd f(x)(e_j)$ 存在。对 $x, a \in U$：
$$\norm{\partial_jf(x) - \partial_jf(a)} = \norm{(\dd f(x) - \dd f(a))(e_j)} \le \norm{\dd f(x) - \dd f(a)}\,\norm{e_j} \xrightarrow[x \to a]{} 0,$$
所以 $\partial_jf$ 在 $a$ 连续。

**(⇐) 第 1 步（每点可微）**　设各 $\partial_jf$ 在 $U$ 上存在且连续。对每个 $a \in U$，{@c9-diff-partielles-point} 的两个条件（在 $a$ 的邻域 $U$ 上存在；在 $a$ 处连续）都满足，所以 $f$ 在 $a$ 可微，$\dd f(a)(h) = \sum_jh_j\partial_jf(a)$。

**(⇐) 第 2 步（$\dd f$ 连续）**　在 $\R^n$、$\R^p$ 上用 $\norm\cdot_\infty$。对 $x, a \in U$ 与任意 $h$：
$$\norm{(\dd f(x) - \dd f(a))(h)}_\infty = \Big\lVert\sum_jh_j\big(\partial_jf(x) - \partial_jf(a)\big)\Big\rVert_\infty \le \norm h_\infty\sum_j\norm{\partial_jf(x) - \partial_jf(a)}_\infty.$$
所以 $\norm{\dd f(x) - \dd f(a)} \le \sum_j\norm{\partial_jf(x) - \partial_jf(a)}_\infty \xrightarrow[x \to a]{} 0$（每个 $\partial_jf$ 在 $a$ 连续）。即 $\dd f$ 在 $a$ 连续。

两个方向都已证明。
:::

::: fr
▷ Méthode : les dérivées partielles sont les valeurs de $\dd f$ sur les vecteurs de base ; pour (⇒) il suffit donc de « projeter » la continuité de $\dd f$ sur chaque colonne ; pour (⇐), le {@fr:c9-diff-partielles-point} donne la différentiabilité en chaque point, puis « coefficients petits ⇒ norme d'opérateur petite » donne la continuité de $\dd f$.

**(⇒)**　Supposons $f$ de classe $\mathcal{C}^1$. D'après {@fr:c9-jacobienne}, pour tout $x \in U$, $\partial_jf(x) = \dd f(x)(e_j)$ existe. Pour $x, a \in U$ :
$$\norm{\partial_jf(x) - \partial_jf(a)} = \norm{(\dd f(x) - \dd f(a))(e_j)} \le \norm{\dd f(x) - \dd f(a)}\,\norm{e_j} \xrightarrow[x \to a]{} 0,$$
donc $\partial_jf$ est continue en $a$.

**(⇐) Étape 1 (différentiabilité en chaque point)**　Supposons que les $\partial_jf$ existent et sont continues sur $U$. Pour tout $a \in U$, les hypothèses de {@fr:c9-diff-partielles-point} sont satisfaites (existence sur le voisinage $U$, continuité en $a$), donc $f$ est différentiable en $a$ et $\dd f(a)(h) = \sum_jh_j\partial_jf(a)$.

**(⇐) Étape 2 (continuité de $\dd f$)**　On munit $\R^n$ et $\R^p$ de $\norm\cdot_\infty$. Pour $x, a \in U$ et tout $h$ :
$$\norm{(\dd f(x) - \dd f(a))(h)}_\infty = \Big\lVert\sum_jh_j\big(\partial_jf(x) - \partial_jf(a)\big)\Big\rVert_\infty \le \norm h_\infty\sum_j\norm{\partial_jf(x) - \partial_jf(a)}_\infty.$$
Donc $\norm{\dd f(x) - \dd f(a)} \le \sum_j\norm{\partial_jf(x) - \partial_jf(a)}_\infty \xrightarrow[x \to a]{} 0$ (chaque $\partial_jf$ est continue en $a$). Ainsi $\dd f$ est continue en $a$.

Les deux implications sont démontrées.
:::

::: rem
**三个层次严格递增：$\Cc^1$ ⇒ 可微 ⇒ 偏导数存在，两个箭头都不可逆。**

1. 偏导数存在 $\not\Rightarrow$ 可微：{@c9-cex-partielles}。
2. 可微 $\not\Rightarrow$ $\Cc^1$，甚至 $\not\Rightarrow$ 偏导数连续：$f(x, y) = (x^2 + y^2)\sin\dfrac{1}{\sqrt{x^2 + y^2}}$，$f(0, 0) = 0$。由 $\abs{f(h)} \le \norm h_2^2$，$f$ 在 $0$ 可微且 $\dd f(0) = 0$。但对 $(x, y) \ne 0$，记 $r = \sqrt{x^2 + y^2}$，$\partial_xf(x, y) = 2x\sin\frac1r - \frac xr\cos\frac1r$；在 $x_m = \frac1{2\pi m}$、$y = 0$ 处 $\partial_xf(x_m, 0) = -1$，不趋于 $\partial_xf(0, 0) = 0$。
3. 所以 {@c1-partielles} 是**充分**条件；证明一个具体函数可微时，它几乎总是第一选择，失效时（往往是在某个孤立点）才回到定义。
:::

::: ex id=c9-ex-polynomes-c1 lvl=1
1. 多项式函数 $\R^n \to \R$ 的偏导数仍是多项式，因而连续，所以多项式函数是 $\Cc^1$ 的；分母不为零处，有理函数也是 $\Cc^1$ 的。例如 $\det : \M_n(\R) \simeq \R^{n^2} \to \R$ 是 $\Cc^1$ 的。
2. $\Phi(r, \theta) = (r\cos\theta, r\sin\theta)$ 的四个偏导数 $\cos\theta, -r\sin\theta, \sin\theta, r\cos\theta$ 连续，所以 $\Phi$ 是 $\Cc^1$ 的（{@c9-ex-polaires-chaine} 中用到）。
3. {@c9-ex-partielles} 中 $f(x, y) = x^2y + \e^{xy}$ 的偏导数连续，所以 $f$ 是 $\Cc^1$ 的。
:::

::: thm id=accroissements-finis zh="有限增量不等式" en="Mean value inequality" fr="Inégalité des accroissements finis" ru="Теорема о конечных приращениях (неравенство)" lvl=1
设 $f : U \to F$ 是 $\Cc^1$ 的，线段 $[a, b] = \{a + t(b - a) : t \in [0, 1]\} \subset U$。则
$$\norm{f(b) - f(a)} \le \sup_{x \in [a,b]}\norm{\dd f(x)}\cdot\norm{b - a}.$$
特别地，若 $U$ 凸且 $\norm{\dd f(x)} \le k$ 对一切 $x \in U$ 成立，则 $f$ 在 $U$ 上是 $k$-Lipschitz 的。
:::

::: fr
Soit $f : U \to F$ de classe $\mathcal{C}^1$ et $[a, b] = \{a + t(b - a) : t \in [0, 1]\} \subset U$. Alors
$$\norm{f(b) - f(a)} \le \sup_{x \in [a,b]}\norm{\dd f(x)}\cdot\norm{b - a}.$$
En particulier, si $U$ est convexe et si $\norm{\dd f(x)} \le k$ pour tout $x \in U$, alors $f$ est $k$-lipschitzienne sur $U$.
:::

::: proof
▷ 思路：把问题限制到线段上：$\gamma(t) = f(a + t(b - a))$ 是一元向量值函数，$f(b) - f(a) = \int_0^1\gamma'(t)\,\dd t$，再用「积分的范数 $\le$ 范数的积分」。

**第 1 步（$\gamma$ 有定义且是 $\Cc^1$ 的）**　令 $c(t) = a + t(b - a)$。集合 $J = \{t \in \R : c(t) \in U\} = c^{-1}(U)$ 是开集（连续映射下开集的原像，{@cont-ouverts}），由假设包含 $[0, 1]$。在 $J$ 上令 $\gamma = f \circ c$。$c$ 可导，$c'(t) = b - a$；由链式法则与 {@c9-diff-reel}，$\gamma$ 在 $J$ 上可导，
$$\gamma'(t) = \dd f(c(t))(b - a).$$
$\gamma'$ 连续：$\norm{\gamma'(t) - \gamma'(s)} \le \norm{\dd f(c(t)) - \dd f(c(s))}\,\norm{b - a}$，而 $\dd f \circ c$ 连续。

**第 2 步（上确界有限）**　$[a, b] = c([0, 1])$ 是紧集（{@image-compact}），$x \mapsto \norm{\dd f(x)}$ 在其上连续，所以 $M = \sup_{x \in [a,b]}\norm{\dd f(x)}$ 有限（{@image-compact}）。对 $t \in [0, 1]$，$\norm{\gamma'(t)} \le \norm{\dd f(c(t))}\,\norm{b - a} \le M\norm{b - a}$。

**第 3 步（微积分基本定理）**　取 $F$ 的一组基，按坐标定义连续向量值函数的积分。每个分量 $\gamma_i$ 是 $[0, 1]$ 上的实值 $\Cc^1$ 函数，由 L1 的微积分基本定理 $\gamma_i(1) - \gamma_i(0) = \int_0^1\gamma_i'(t)\,\dd t$。所以
$$f(b) - f(a) = \gamma(1) - \gamma(0) = \int_0^1\gamma'(t)\,\dd t.$$

**第 4 步（积分的范数）**　对连续的 $\phi : [0, 1] \to F$，Riemann 和 $R_N = \frac1N\sum_{k=1}^N\phi(\frac kN)$ 按坐标收敛到 $\int_0^1\phi$；由三角不等式 $\norm{R_N} \le \frac1N\sum_{k=1}^N\norm{\phi(\frac kN)}$，右边是连续实函数 $\norm\phi$ 的 Riemann 和，收敛到 $\int_0^1\norm\phi$。范数连续，取极限得 $\norm{\int_0^1\phi} \le \int_0^1\norm\phi$。

**第 5 步（结论）**　
$$\begin{aligned}
\norm{f(b) - f(a)} &= \Big\lVert\int_0^1\gamma'(t)\,\dd t\Big\rVert && \text{（第 3 步）}\\
&\le \int_0^1\norm{\gamma'(t)}\,\dd t && \text{（第 4 步）}\\
&\le \int_0^1M\norm{b - a}\,\dd t = M\norm{b - a} && \text{（第 2 步）}.
\end{aligned}$$
**特殊情形**：$U$ 凸时，对任意 $a, b \in U$，$[a, b] \subset U$，且 $M \le k$，所以 $\norm{f(b) - f(a)} \le k\norm{b - a}$。
:::

::: fr
▷ Méthode : on se ramène au segment : $\gamma(t) = f(a + t(b - a))$ est une fonction vectorielle d'une variable réelle, $f(b) - f(a) = \int_0^1\gamma'(t)\,\dd t$, et l'on utilise « la norme de l'intégrale est majorée par l'intégrale de la norme ».

**Étape 1 ($\gamma$ est définie et de classe $\mathcal{C}^1$)**　Posons $c(t) = a + t(b - a)$. L'ensemble $J = \{t \in \R : c(t) \in U\} = c^{-1}(U)$ est ouvert (image réciproque d'un ouvert par une application continue, {@fr:cont-ouverts}) et contient $[0, 1]$ par hypothèse. Sur $J$ on pose $\gamma = f \circ c$. L'application $c$ est dérivable, $c'(t) = b - a$ ; d'après la règle de la chaîne et {@fr:c9-diff-reel}, $\gamma$ est dérivable sur $J$ et
$$\gamma'(t) = \dd f(c(t))(b - a).$$
$\gamma'$ est continue : $\norm{\gamma'(t) - \gamma'(s)} \le \norm{\dd f(c(t)) - \dd f(c(s))}\,\norm{b - a}$, et $\dd f \circ c$ est continue.

**Étape 2 (la borne supérieure est finie)**　Le segment $[a, b] = c([0, 1])$ est compact ({@fr:image-compact}) et $x \mapsto \norm{\dd f(x)}$ y est continue, donc $M = \sup_{x \in [a,b]}\norm{\dd f(x)}$ est finie ({@fr:image-compact}). Pour $t \in [0, 1]$, $\norm{\gamma'(t)} \le \norm{\dd f(c(t))}\,\norm{b - a} \le M\norm{b - a}$.

**Étape 3 (théorème fondamental de l'analyse)**　On fixe une base de $F$ et on définit l'intégrale d'une fonction vectorielle continue coordonnée par coordonnée. Chaque composante $\gamma_i$ est une fonction réelle de classe $\mathcal{C}^1$ sur $[0, 1]$, donc $\gamma_i(1) - \gamma_i(0) = \int_0^1\gamma_i'(t)\,\dd t$. Ainsi
$$f(b) - f(a) = \gamma(1) - \gamma(0) = \int_0^1\gamma'(t)\,\dd t.$$

**Étape 4 (norme d'une intégrale)**　Pour $\phi : [0, 1] \to F$ continue, les sommes de Riemann $R_N = \frac1N\sum_{k=1}^N\phi(\frac kN)$ convergent coordonnée par coordonnée vers $\int_0^1\phi$ ; par l'inégalité triangulaire $\norm{R_N} \le \frac1N\sum_{k=1}^N\norm{\phi(\frac kN)}$, et le membre de droite est une somme de Riemann de la fonction réelle continue $\norm\phi$, qui converge vers $\int_0^1\norm\phi$. La norme étant continue, le passage à la limite donne $\norm{\int_0^1\phi} \le \int_0^1\norm\phi$.

**Étape 5 (conclusion)**　
$$\begin{aligned}
\norm{f(b) - f(a)} &= \Big\lVert\int_0^1\gamma'(t)\,\dd t\Big\rVert && \text{(étape 3)}\\
&\le \int_0^1\norm{\gamma'(t)}\,\dd t && \text{(étape 4)}\\
&\le \int_0^1M\norm{b - a}\,\dd t = M\norm{b - a} && \text{(étape 2)}.
\end{aligned}$$
**Cas particulier** : si $U$ est convexe, pour tous $a, b \in U$ on a $[a, b] \subset U$ et $M \le k$, d'où $\norm{f(b) - f(a)} \le k\norm{b - a}$.
:::

::: rem
**对向量值函数，中值等式一般不成立**，只能用不等式。$f(t) = (\cos t, \sin t)$：$f(2\pi) - f(0) = 0$，但 $f'(c) = (-\sin c, \cos c)$ 的范数恒为 $1$，所以不存在 $c$ 使 $f(2\pi) - f(0) = 2\pi f'(c)$。（实值函数的中值等式之所以成立，靠的是 $\R$ 的序结构：Rolle 定理。）
:::

::: rem
**「Lipschitz」那一部分的凸性不能去掉。** 令 $U = \{(x, y) : 1 < x^2 + y^2 < 4\} \setminus (\R_- \times \{0\})$（去掉一条缝的圆环），$\theta : U \to \,]-\pi, \pi[$ 为极角，$\theta(x, y) = 2\Arctan\dfrac{y}{x + \sqrt{x^2 + y^2}}$（在 $U$ 上分母 $x + \sqrt{x^2 + y^2} > 0$）。由下一节的 {@c9-ck-operations}，它是 $\Cc^1$ 的，直接求导得 $\nabla\theta = \dfrac{(-y, x)}{x^2 + y^2}$，Euclid 范数 $\norm{\nabla\theta} = \frac1r \le 1$。但点 $p_s = (-\frac32, s)$、$q_s = (-\frac32, -s)$（$0 < s < \frac12$）在 $U$ 中，$\norm{p_s - q_s} = 2s \to 0$，而 $\theta(p_s) - \theta(q_s) \to \pi - (-\pi) = 2\pi$。所以 $\theta$ 不是 Lipschitz 的：连接 $p_s$ 与 $q_s$ 的线段穿过了缝，不在 $U$ 中。
:::

::: cor id=diff-nulle-constante zh="微分为零的函数" en="Maps with zero differential" fr="Application de différentielle nulle" ru="Отображение с нулевым дифференциалом" lvl=1
若 $U$ 是道路连通的开集，$f : U \to F$ 可微且 $\dd f = 0$ 在 $U$ 上成立，则 $f$ 在 $U$ 上为常数。
:::

::: fr
Si $U$ est un ouvert connexe par arcs et si $f : U \to F$ est différentiable avec $\dd f = 0$ sur $U$, alors $f$ est constante sur $U$.
:::

::: proof
▷ 思路：先局部（在每个球上，球是凸的，用有限增量不等式），再用道路把局部常数「传播」到整个 $U$：沿道路取「$f$ 保持不变」的最大时刻 $t^*$，证明 $t^* = 1$。

**第 1 步（局部常数）**　$\dd f = 0$ 是连续映射，所以 $f$ 是 $\Cc^1$ 的。设 $x \in U$，取 $r > 0$ 使 $B(x, r) \subset U$。球是凸的，在其上 $\norm{\dd f} \le 0$，由 {@accroissements-finis}，$f$ 在 $B(x, r)$ 上是 $0$-Lipschitz 的，即为常数。

**第 2 步（沿道路传播）**　固定 $a, b \in U$，取连续道路 $\gamma : [0, 1] \to U$，$\gamma(0) = a$，$\gamma(1) = b$。令 $\varphi = f \circ \gamma$（连续，{@diff-prop}）与
$$T = \{t \in [0, 1] : \forall s \in [0, t],\ \varphi(s) = \varphi(0)\},\qquad t^* = \sup T.$$
$0 \in T$，所以 $T$ 非空，$t^*$ 有定义。

**第 3 步（$t^* \in T$）**　对 $s < t^*$，存在 $t \in T$ 使 $s < t$，所以 $\varphi(s) = \varphi(0)$。由 $\varphi$ 在 $t^*$ 连续，$\varphi(t^*) = \lim_{s \to t^*,\,s < t^*}\varphi(s) = \varphi(0)$（$t^* = 0$ 时直接成立）。所以 $t^* \in T$。

**第 4 步（$t^* = 1$）**　反设 $t^* < 1$。由第 1 步，存在 $r > 0$，使 $f$ 在 $B(\gamma(t^*), r) \subset U$ 上为常数，值为 $f(\gamma(t^*)) = \varphi(0)$。由 $\gamma$ 在 $t^*$ 连续，存在 $\tau > 0$，使 $s \in [t^*, t^* + \tau] \cap [0, 1]$ 时 $\gamma(s) \in B(\gamma(t^*), r)$，从而 $\varphi(s) = \varphi(0)$。于是 $\min(1, t^* + \tau) \in T$，它严格大于 $t^*$，与 $t^* = \sup T$ 矛盾。

所以 $t^* = 1 \in T$，$f(b) = \varphi(1) = \varphi(0) = f(a)$。$a, b$ 任意，$f$ 为常数。
:::

::: fr
▷ Méthode : d'abord localement (sur chaque boule, qui est convexe, par l'inégalité des accroissements finis), puis on « propage » le long d'un chemin : on considère le plus grand instant $t^*$ jusqu'auquel $f$ reste constante et on montre que $t^* = 1$.

**Étape 1 (constance locale)**　Comme $\dd f = 0$ est continue, $f$ est de classe $\mathcal{C}^1$. Soit $x \in U$ et $r > 0$ tel que $B(x, r) \subset U$. La boule est convexe et $\norm{\dd f} \le 0$ sur celle-ci ; d'après {@fr:accroissements-finis}, $f$ est $0$-lipschitzienne sur $B(x, r)$, c'est-à-dire constante.

**Étape 2 (propagation le long d'un chemin)**　Fixons $a, b \in U$ et un chemin continu $\gamma : [0, 1] \to U$ tel que $\gamma(0) = a$, $\gamma(1) = b$. Posons $\varphi = f \circ \gamma$ (continue, {@fr:diff-prop}) et
$$T = \{t \in [0, 1] : \forall s \in [0, t],\ \varphi(s) = \varphi(0)\},\qquad t^* = \sup T.$$
Comme $0 \in T$, $T$ est non vide et $t^*$ est bien défini.

**Étape 3 ($t^* \in T$)**　Pour $s < t^*$, il existe $t \in T$ avec $s < t$, donc $\varphi(s) = \varphi(0)$. Par continuité de $\varphi$ en $t^*$, $\varphi(t^*) = \lim_{s \to t^*,\,s < t^*}\varphi(s) = \varphi(0)$ (si $t^* = 0$, c'est immédiat). Donc $t^* \in T$.

**Étape 4 ($t^* = 1$)**　Par l'absurde, supposons $t^* < 1$. D'après l'étape 1, il existe $r > 0$ tel que $f$ soit constante sur $B(\gamma(t^*), r) \subset U$, de valeur $f(\gamma(t^*)) = \varphi(0)$. Par continuité de $\gamma$ en $t^*$, il existe $\tau > 0$ tel que pour $s \in [t^*, t^* + \tau] \cap [0, 1]$, $\gamma(s) \in B(\gamma(t^*), r)$, donc $\varphi(s) = \varphi(0)$. Ainsi $\min(1, t^* + \tau) \in T$, et ce nombre est strictement supérieur à $t^*$ : contradiction avec $t^* = \sup T$.

Donc $t^* = 1 \in T$ et $f(b) = \varphi(1) = \varphi(0) = f(a)$. Comme $a$ et $b$ sont arbitraires, $f$ est constante.
:::

::: rem
**连通性不能去掉。** $U = B((0, 0), 1) \cup B((3, 0), 1)$（两个不相交的圆盘），$f = 0$ 在第一个上、$f = 1$ 在第二个上：$\dd f = 0$，但 $f$ 不是常数。一般结论是：$\dd f = 0$ 的函数在每个道路连通分支上为常数。
:::

::: q
设 $U \subset \R^2$ 开，$f \in \Cc^1(U)$，$\partial_xf = 0$ 在 $U$ 上成立。$f$ 一定「只依赖 $y$」吗？
:::

::: ans
不一定。若 $U$ 的每条水平截线 $\{x : (x, y) \in U\}$ 都是区间（例如 $U$ 凸），对每个固定的 $y$ 用一元结论，$x \mapsto f(x, y)$ 为常数，此时成立。反例：$U = \R^2 \setminus (\{0\} \times [0, +\infty[)$，令 $f(x, y) = y^2$（若 $x > 0$ 且 $y > 0$），否则 $f(x, y) = 0$。在 $\{x > 0\}$ 上 $f = (\max(y, 0))^2$ 是 $\Cc^1$ 的，在 $\{x < 0\}$ 上 $f = 0$，在点 $(0, y_0)$（$y_0 < 0$）附近 $f = 0$。所以 $f \in \Cc^1(U)$，$\partial_xf = 0$，但 $f(1, 1) = 1 \ne 0 = f(-1, 1)$：水平线 $y = 1$ 被挖掉的半直线截成两段。
:::

## 高阶导数

偏导数本身又是函数，可以再求偏导数。这一节定义 $\Cc^k$ 函数，证明它们在运算下封闭，然后证明两个核心结果：混合偏导数可以交换次序（Schwarz），以及二阶 Taylor–Young 公式——下一节判断极值全靠它。

::: def id=c9-def-ck zh="$\Cc^k$ 函数、Hessian 矩阵" en="$C^k$ maps, Hessian matrix" fr="Fonctions de classe $\mathcal{C}^k$, matrice hessienne" ru="Функции класса $C^k$, матрица Гессе"
设 $U \subset \R^n$ 开，$f : U \to \R^p$。若偏导数 $\partial_jf$ 在 $U$ 上处处存在，它又是 $U$ 上的函数，可以再求偏导数；记
$$\frac{\partial^2 f}{\partial x_i\,\partial x_j} = \partial_i(\partial_jf)\quad\text{（先对 } x_j\text{、再对 } x_i \text{ 求导）},$$
依此类推得到 $k$ 阶偏导数 $\dfrac{\partial^kf}{\partial x_{i_1}\cdots\partial x_{i_k}}$。$f$ 是 **$\Cc^0$ 的**指 $f$ 连续；对 $k \ge 1$，$f$ 是 **$\Cc^k$ 的**，如果所有阶数 $\le k$ 的偏导数都在 $U$ 上存在且连续；等价地（递归）：所有 $\partial_jf$ 存在且是 $\Cc^{k-1}$ 的。$f$ 是 **$\Cc^\infty$ 的**，如果它对一切 $k$ 都是 $\Cc^k$ 的。若 $f : U \to \R$ 是 $\Cc^2$ 的，$f$ 在 $a$ 的 **Hessian 矩阵**为
$$H_f(a) = \Big(\frac{\partial^2 f}{\partial x_i\,\partial x_j}(a)\Big)_{1 \le i, j \le n}.$$
:::

::: fr
Soit $U \subset \R^n$ ouvert et $f : U \to \R^p$. Si la dérivée partielle $\partial_jf$ existe en tout point de $U$, c'est une fonction sur $U$ que l'on peut à nouveau dériver ; on note
$$\frac{\partial^2 f}{\partial x_i\,\partial x_j} = \partial_i(\partial_jf)\quad\text{(on dérive d'abord par rapport à } x_j\text{, puis par rapport à } x_i\text{)},$$
et ainsi de suite pour les dérivées partielles d'ordre $k$, $\dfrac{\partial^kf}{\partial x_{i_1}\cdots\partial x_{i_k}}$. On dit que $f$ est **de classe $\mathcal{C}^0$** si elle est continue ; pour $k \ge 1$, $f$ est **de classe $\mathcal{C}^k$** si toutes ses dérivées partielles d'ordre $\le k$ existent et sont continues sur $U$ ; de manière équivalente (par récurrence) : toutes les $\partial_jf$ existent et sont de classe $\mathcal{C}^{k-1}$. $f$ est **de classe $\mathcal{C}^\infty$** si elle est de classe $\mathcal{C}^k$ pour tout $k$. Si $f : U \to \R$ est de classe $\mathcal{C}^2$, la **matrice hessienne** de $f$ en $a$ est
$$H_f(a) = \Big(\frac{\partial^2 f}{\partial x_i\,\partial x_j}(a)\Big)_{1 \le i, j \le n}.$$
:::

::: ex id=c9-ex-ck lvl=1
1. 多项式函数是 $\Cc^\infty$ 的（{@c9-ck-operations}）。
2. **$\Cc^1$ 但不是 $\Cc^2$**（一元）：$f(x) = x\abs x$。$f'(x) = 2\abs x$（$x \ne 0$ 时直接求导；$x = 0$ 时 $\frac{f(t)}{t} = \abs t \to 0$），连续；但 $f'$ 在 $0$ 不可导。
3. **$\Cc^1$、二阶偏导数处处存在，但不是 $\Cc^2$**（二元）：Peano 的函数 {@cex-schwarz}。
:::

::: prop id=c9-ck-operations zh="$\Cc^k$ 函数的运算" en="Operations on $C^k$ maps" fr="Opérations sur les fonctions de classe $\mathcal{C}^k$" ru="Операции над функциями класса $C^k$" lvl=1
设 $k \in \N \cup \{\infty\}$。

1. 多项式函数 $\R^n \to \R$ 是 $\Cc^\infty$ 的；一元函数 $\exp$、$\sin$、$\cos$（在 $\R$ 上）、$\ln$（在 $]0, +\infty[$ 上）、$t \mapsto 1/t$（在 $\R^*$ 上）、$\Arctan$（在 $\R$ 上）是 $\Cc^\infty$ 的。
2. $f : U \to \R^p$ 是 $\Cc^k$ 的，当且仅当它的每个分量是 $\Cc^k$ 的。
3. （复合）若 $V \subset \R^q$ 开，$f : U \to V$ 与 $g : V \to \R^p$ 都是 $\Cc^k$ 的，则 $g \circ f$ 是 $\Cc^k$ 的。
4. 若 $u, v : U \to \R$ 是 $\Cc^k$ 的，$\lambda \in \R$，则 $u + \lambda v$ 与 $uv$ 是 $\Cc^k$ 的；若 $v$ 不取零值，$u/v$ 是 $\Cc^k$ 的。
:::

::: fr
Soit $k \in \N \cup \{\infty\}$.

1. Les fonctions polynomiales $\R^n \to \R$ sont de classe $\mathcal{C}^\infty$ ; les fonctions d'une variable $\exp$, $\sin$, $\cos$ (sur $\R$), $\ln$ (sur $]0, +\infty[$), $t \mapsto 1/t$ (sur $\R^*$), $\Arctan$ (sur $\R$) sont de classe $\mathcal{C}^\infty$.
2. $f : U \to \R^p$ est de classe $\mathcal{C}^k$ si et seulement si chacune de ses composantes l'est.
3. (Composition) Si $V \subset \R^q$ est ouvert et si $f : U \to V$ et $g : V \to \R^p$ sont de classe $\mathcal{C}^k$, alors $g \circ f$ est de classe $\mathcal{C}^k$.
4. Si $u, v : U \to \R$ sont de classe $\mathcal{C}^k$ et $\lambda \in \R$, alors $u + \lambda v$ et $uv$ sont de classe $\mathcal{C}^k$ ; si $v$ ne s'annule pas, $u/v$ est de classe $\mathcal{C}^k$.
:::

::: proof
▷ 思路：(1)(2) 直接由定义；(3) 对 $k$ 归纳，关键是链式法则的坐标形式 $\partial_j(g \circ f)_i = \sum_l(\partial_lg_i \circ f)\,\partial_jf_l$：右边是「$\Cc^{k}$ 函数的复合与乘积」，正好落在归纳假设里；(4) 把和、积、倒数写成多项式或 $1/t$ 与 $(u, v)$ 的复合。$k = \infty$ 的情形由一切有限 $k$ 的情形得到，下面设 $k$ 有限。

**第 1 步（(1)(2)）**　单项式 $x^\alpha = x_1^{\alpha_1}\cdots x_n^{\alpha_n}$ 对 $x_j$ 的偏导数是 $\alpha_jx^{\alpha - e_j}$（$\alpha_j = 0$ 时为 $0$），仍是单项式；所以多项式的偏导数是多项式，归纳可知各阶偏导数都存在且是多项式，因而连续。一元函数的结论是 L1 的内容。(2)：$f$ 的偏导数是各分量偏导数组成的向量，$\R^p$ 中的连续性按分量判断。

**第 2 步（(3) 的归纳：初始化 $k = 0$ 与 $k = 1$）**　$k = 0$：连续函数的复合连续。$k = 1$：$f, g$ 可微，由链式法则 {@chain-rule}，$g \circ f$ 可微，且
$$\partial_j(g \circ f)_i(x) = \sum_{l=1}^q\partial_lg_i(f(x))\,\partial_jf_l(x).$$
右边是连续函数（$\partial_lg_i \circ f$ 是连续函数的复合）的乘积之和，连续。由 {@c1-partielles}，$g \circ f$ 是 $\Cc^1$ 的。

**第 3 步（(3) 的归纳：递推）**　设 $k \ge 1$，(3) 对 $k$ 成立（对一切 $f, g$）。设 $f, g$ 是 $\Cc^{k+1}$ 的。由第 2 步 $g \circ f$ 是 $\Cc^1$ 的，偏导数由上式给出。其中：

- $\partial_lg_i \in \Cc^k$，$f \in \Cc^{k+1} \subset \Cc^k$，由归纳假设 $\partial_lg_i \circ f \in \Cc^k$；
- $\partial_jf_l \in \Cc^k$；
- 乘积：$m(s, t) = st$ 是多项式（$\Cc^\infty$，由第 1 步），$(u, w) \mapsto uw = m \circ (u, w)$；若 $u, w \in \Cc^k$，由 (2) $(u, w) \in \Cc^k$，再由归纳假设 $m \circ (u, w) \in \Cc^k$。和的情形把 $m$ 换成多项式 $s(x, y) = x + y$，论证不变。

所以每个 $\partial_j(g \circ f)_i$ 是 $\Cc^k$ 的，即 $g \circ f \in \Cc^{k+1}$。由归纳，(3) 对一切 $k$ 成立。

**第 4 步（(4)）**　$u + \lambda v = s_\lambda \circ (u, v)$，$s_\lambda(x, y) = x + \lambda y$；$uv = m \circ (u, v)$；$1/v = \iota \circ v$，$\iota(t) = 1/t$ 在 $\R^*$ 上是 $\Cc^\infty$ 的；$u/v = u \cdot (1/v)$。由 (1)(2)(3) 即得。
:::

::: fr
▷ Méthode : (1) et (2) découlent des définitions ; pour (3) on raisonne par récurrence sur $k$, la clé étant la règle de la chaîne en coordonnées $\partial_j(g \circ f)_i = \sum_l(\partial_lg_i \circ f)\,\partial_jf_l$ : le membre de droite est formé de composées et de produits de fonctions de classe $\mathcal{C}^{k}$, ce qui relève de l'hypothèse de récurrence ; pour (4) on écrit somme, produit et inverse comme composées de $(u, v)$ avec un polynôme ou avec $1/t$. Le cas $k = \infty$ découle des cas $k$ fini ; on suppose donc $k$ fini.

**Étape 1 ((1) et (2))**　La dérivée partielle du monôme $x^\alpha = x_1^{\alpha_1}\cdots x_n^{\alpha_n}$ par rapport à $x_j$ est $\alpha_jx^{\alpha - e_j}$ (nulle si $\alpha_j = 0$), encore un monôme ; les dérivées partielles d'un polynôme sont donc des polynômes, et par récurrence toutes ses dérivées partielles existent et sont polynomiales, donc continues. Les énoncés sur les fonctions d'une variable relèvent de L1. (2) : les dérivées partielles de $f$ sont les vecteurs formés des dérivées partielles des composantes, et la continuité dans $\R^p$ se vérifie composante par composante.

**Étape 2 (récurrence pour (3) : initialisation $k = 0$ et $k = 1$)**　$k = 0$ : une composée de fonctions continues est continue. $k = 1$ : $f$ et $g$ sont différentiables ; d'après la règle de la chaîne {@fr:chain-rule}, $g \circ f$ est différentiable et
$$\partial_j(g \circ f)_i(x) = \sum_{l=1}^q\partial_lg_i(f(x))\,\partial_jf_l(x).$$
Le membre de droite est une somme de produits de fonctions continues ($\partial_lg_i \circ f$ est une composée de fonctions continues), donc continu. D'après {@fr:c1-partielles}, $g \circ f$ est de classe $\mathcal{C}^1$.

**Étape 3 (récurrence pour (3) : hérédité)**　Soit $k \ge 1$ ; supposons (3) vraie au rang $k$ (pour toutes $f, g$). Soient $f, g$ de classe $\mathcal{C}^{k+1}$. D'après l'étape 2, $g \circ f$ est de classe $\mathcal{C}^1$ et ses dérivées partielles sont données par la formule ci-dessus. Or :

- $\partial_lg_i \in \mathcal{C}^k$ et $f \in \mathcal{C}^{k+1} \subset \mathcal{C}^k$, donc $\partial_lg_i \circ f \in \mathcal{C}^k$ par hypothèse de récurrence ;
- $\partial_jf_l \in \mathcal{C}^k$ ;
- produit : $m(s, t) = st$ est polynomiale (donc $\mathcal{C}^\infty$ par l'étape 1) et $uw = m \circ (u, w)$ ; si $u, w \in \mathcal{C}^k$, alors $(u, w) \in \mathcal{C}^k$ par (2), puis $m \circ (u, w) \in \mathcal{C}^k$ par hypothèse de récurrence. Pour la somme, on remplace $m$ par le polynôme $s(x, y) = x + y$ ; l'argument est inchangé.

Chaque $\partial_j(g \circ f)_i$ est donc de classe $\mathcal{C}^k$, c'est-à-dire $g \circ f \in \mathcal{C}^{k+1}$. Par récurrence, (3) est vraie pour tout $k$.

**Étape 4 ((4))**　$u + \lambda v = s_\lambda \circ (u, v)$ avec $s_\lambda(x, y) = x + \lambda y$ ; $uv = m \circ (u, v)$ ; $1/v = \iota \circ v$ où $\iota(t) = 1/t$ est de classe $\mathcal{C}^\infty$ sur $\R^*$ ; $u/v = u \cdot (1/v)$. On conclut par (1), (2) et (3).
:::

::: prop id=c9-inv-cinfini zh="行列式与求逆的光滑性" en="Smoothness of the determinant and of inversion" fr="Régularité du déterminant et de l'inversion" ru="Гладкость определителя и обращения матриц" lvl=1
把 $\M_n(\R)$ 等同于 $\R^{n^2}$。则 $\det : \M_n(\R) \to \R$ 是 $\Cc^\infty$ 的，$\GL_n(\R)$ 是开集，$\operatorname{inv} : A \mapsto A^{-1}$ 在 $\GL_n(\R)$ 上是 $\Cc^\infty$ 的。
:::

::: fr
On identifie $\M_n(\R)$ à $\R^{n^2}$. Alors $\det : \M_n(\R) \to \R$ est de classe $\mathcal{C}^\infty$, $\GL_n(\R)$ est un ouvert, et $\operatorname{inv} : A \mapsto A^{-1}$ est de classe $\mathcal{C}^\infty$ sur $\GL_n(\R)$.
:::

::: proof
▷ 思路：$\det$ 是矩阵元的多项式；由 Cramer 公式，$A^{-1}$ 的每个元素是「多项式 ÷ $\det A$」。

**第 1 步（$\det$）**　由 Leibniz 公式 $\det A = \sum_{\sigma \in \mathfrak S_n}\varepsilon(\sigma)\prod_{j=1}^na_{\sigma(j)j}$，$\det$ 是 $n^2$ 个变量的多项式，由 {@c9-ck-operations} 第 1 条，它是 $\Cc^\infty$ 的。

**第 2 步（$\GL_n(\R)$ 开）**　$\GL_n(\R) = \det^{-1}(\R \setminus \{0\})$ 是开集 $\R \setminus \{0\}$ 在连续映射下的原像，是开集（{@cont-ouverts}）。

**第 3 步（$\operatorname{inv}$）**　由 Cramer 公式，对 $A \in \GL_n(\R)$，$A^{-1} = \frac{1}{\det A}\operatorname{com}(A)^T$。$\operatorname{com}(A)$ 的每个元素是 $\pm$ 一个 $(n-1)$ 阶子式，是矩阵元的多项式。所以 $A^{-1}$ 的每个元素是一个多项式与 $1/\det A$ 的乘积，其中 $\det$ 在 $\GL_n(\R)$ 上不取零值。由 {@c9-ck-operations} 第 4 条，每个元素是 $\Cc^\infty$ 的，再由第 2 条，$\operatorname{inv}$ 是 $\Cc^\infty$ 的。它的微分已在 {@diff-inverse-det} 中算出：$\dd\operatorname{inv}(A)(H) = -A^{-1}HA^{-1}$。
:::

::: fr
▷ Méthode : $\det$ est un polynôme en les coefficients ; d'après les formules de Cramer, chaque coefficient de $A^{-1}$ est un « polynôme divisé par $\det A$ ».

**Étape 1 ($\det$)**　D'après la formule de Leibniz $\det A = \sum_{\sigma \in \mathfrak S_n}\varepsilon(\sigma)\prod_{j=1}^na_{\sigma(j)j}$, $\det$ est un polynôme en $n^2$ variables ; d'après le point 1 de {@fr:c9-ck-operations}, il est de classe $\mathcal{C}^\infty$.

**Étape 2 ($\GL_n(\R)$ est ouvert)**　$\GL_n(\R) = \det^{-1}(\R \setminus \{0\})$ est l'image réciproque de l'ouvert $\R \setminus \{0\}$ par une application continue, donc un ouvert ({@fr:cont-ouverts}).

**Étape 3 ($\operatorname{inv}$)**　D'après les formules de Cramer, pour $A \in \GL_n(\R)$, $A^{-1} = \frac{1}{\det A}\operatorname{com}(A)^T$. Chaque coefficient de $\operatorname{com}(A)$ est, au signe près, un mineur d'ordre $n - 1$, donc un polynôme en les coefficients. Chaque coefficient de $A^{-1}$ est ainsi le produit d'un polynôme par $1/\det A$, où $\det$ ne s'annule pas sur $\GL_n(\R)$. D'après le point 4 de {@fr:c9-ck-operations}, chaque coefficient est de classe $\mathcal{C}^\infty$, puis d'après le point 2, $\operatorname{inv}$ est de classe $\mathcal{C}^\infty$. Sa différentielle a été calculée dans {@fr:diff-inverse-det} : $\dd\operatorname{inv}(A)(H) = -A^{-1}HA^{-1}$.
:::

::: thm id=schwarz zh="Schwarz 定理" en="Schwarz's theorem (symmetry of second derivatives)" fr="Théorème de Schwarz" ru="Теорема Шварца о равенстве смешанных производных" lvl=1
若 $f : U \subset \R^n \to \R^p$ 是 $\Cc^2$ 的，则对一切 $i, j$ 与一切 $a \in U$，
$$\frac{\partial^2 f}{\partial x_i\,\partial x_j}(a) = \frac{\partial^2 f}{\partial x_j\,\partial x_i}(a).$$
因此（$p = 1$ 时）Hessian 矩阵是对称的。
:::

::: fr
Si $f : U \subset \R^n \to \R^p$ est de classe $\mathcal{C}^2$, alors pour tous $i, j$ et tout $a \in U$,
$$\frac{\partial^2 f}{\partial x_i\,\partial x_j}(a) = \frac{\partial^2 f}{\partial x_j\,\partial x_i}(a).$$
En particulier (pour $p = 1$) la matrice hessienne est symétrique.
:::

::: proof
▷ 思路：考虑「二阶差分」
$$\Delta(h, k) = f(a + he_i + ke_j) - f(a + he_i) - f(a + ke_j) + f(a),$$
它对两个方向是对称的。先沿 $x_i$ 方向、再沿 $x_j$ 方向各用一次一元中值定理，得 $\Delta = hk\,\partial_j\partial_if(P)$；顺序反过来，得 $\Delta = hk\,\partial_i\partial_jf(Q)$。$P, Q$ 都在 $a$ 附近，令 $h = k \to 0$，由二阶偏导数在 $a$ 的连续性即得。

**第 0 步（化简）**　按分量考虑，可设 $p = 1$。$i = j$ 时无需证明，设 $i \ne j$。取 $r > 0$ 使 $B_\infty(a, r) \subset U$。对 $0 < \abs h, \abs k < r$，点 $a + se_i + te_j$（$\abs s \le \abs h$，$\abs t \le \abs k$）都在 $B_\infty(a, r) \subset U$ 中，$\Delta(h, k)$ 有定义。

**第 1 步（先沿 $x_i$）**　在以 $0, h$ 为端点的区间上令 $\varphi(s) = f(a + se_i + ke_j) - f(a + se_i)$，则 $\Delta = \varphi(h) - \varphi(0)$。由偏导数的定义，$\varphi$ 可导，$\varphi'(s) = \partial_if(a + se_i + ke_j) - \partial_if(a + se_i)$。由一元中值定理，存在 $\theta_1 \in \,]0, 1[$，
$$\Delta = h\,\varphi'(\theta_1h) = h\big[\partial_if(a + \theta_1he_i + ke_j) - \partial_if(a + \theta_1he_i)\big].$$

**第 2 步（再沿 $x_j$）**　在以 $0, k$ 为端点的区间上令 $\chi(t) = \partial_if(a + \theta_1he_i + te_j)$。$\partial_if$ 是 $\Cc^1$ 的，$\chi'(t) = \partial_j\partial_if(a + \theta_1he_i + te_j)$。由中值定理，存在 $\theta_2 \in \,]0, 1[$，$\chi(k) - \chi(0) = k\,\partial_j\partial_if(a + \theta_1he_i + \theta_2ke_j)$。所以
$$\Delta = hk\,\partial_j\partial_if(P),\qquad P = a + \theta_1he_i + \theta_2ke_j.$$

**第 3 步（顺序反过来）**　令 $\psi(t) = f(a + he_i + te_j) - f(a + te_j)$，则 $\Delta = \psi(k) - \psi(0)$。把第 1、2 步中 $(i, h)$ 与 $(j, k)$ 的角色互换：存在 $\theta_3, \theta_4 \in \,]0, 1[$，
$$\Delta = k\big[\partial_jf(a + he_i + \theta_3ke_j) - \partial_jf(a + \theta_3ke_j)\big] = hk\,\partial_i\partial_jf(Q),\qquad Q = a + \theta_4he_i + \theta_3ke_j.$$

**第 4 步（取极限）**　由第 2、3 步，$hk \ne 0$，所以 $\partial_j\partial_if(P) = \partial_i\partial_jf(Q)$。取 $h = k = t \in \,]0, r[$，记相应的点为 $P_t, Q_t$，则 $\norm{P_t - a}_\infty \le t$，$\norm{Q_t - a}_\infty \le t$（$\theta$ 依赖于 $t$，但都在 $]0, 1[$ 中）。令 $t \to 0^{+}$，由 $\partial_j\partial_if$、$\partial_i\partial_jf$ 在 $a$ 连续，
$$\partial_j\partial_if(a) = \lim_{t \to 0^{+}}\partial_j\partial_if(P_t) = \lim_{t \to 0^{+}}\partial_i\partial_jf(Q_t) = \partial_i\partial_jf(a).$$
这就证明了混合偏导数相等；于是 $H_f(a)$ 的 $(i, j)$ 元与 $(j, i)$ 元相等，Hessian 矩阵对称。
:::

::: fr
▷ Méthode : on considère la « différence seconde »
$$\Delta(h, k) = f(a + he_i + ke_j) - f(a + he_i) - f(a + ke_j) + f(a),$$
symétrique vis-à-vis des deux directions. En appliquant le théorème des accroissements finis d'abord selon $x_i$ puis selon $x_j$, on obtient $\Delta = hk\,\partial_j\partial_if(P)$ ; dans l'autre ordre, $\Delta = hk\,\partial_i\partial_jf(Q)$. Les points $P, Q$ sont proches de $a$ ; on fait $h = k \to 0$ et on conclut par continuité des dérivées secondes en $a$.

**Étape 0 (réduction)**　En raisonnant composante par composante, on peut supposer $p = 1$. Si $i = j$, il n'y a rien à montrer ; supposons $i \ne j$. Soit $r > 0$ tel que $B_\infty(a, r) \subset U$. Pour $0 < \abs h, \abs k < r$, les points $a + se_i + te_j$ ($\abs s \le \abs h$, $\abs t \le \abs k$) sont dans $B_\infty(a, r) \subset U$ et $\Delta(h, k)$ est bien défini.

**Étape 1 (d'abord selon $x_i$)**　Sur le segment d'extrémités $0$ et $h$, posons $\varphi(s) = f(a + se_i + ke_j) - f(a + se_i)$, de sorte que $\Delta = \varphi(h) - \varphi(0)$. Par définition des dérivées partielles, $\varphi$ est dérivable et $\varphi'(s) = \partial_if(a + se_i + ke_j) - \partial_if(a + se_i)$. D'après le théorème des accroissements finis, il existe $\theta_1 \in \,]0, 1[$ tel que
$$\Delta = h\,\varphi'(\theta_1h) = h\big[\partial_if(a + \theta_1he_i + ke_j) - \partial_if(a + \theta_1he_i)\big].$$

**Étape 2 (puis selon $x_j$)**　Sur le segment d'extrémités $0$ et $k$, posons $\chi(t) = \partial_if(a + \theta_1he_i + te_j)$. Comme $\partial_if$ est de classe $\mathcal{C}^1$, $\chi'(t) = \partial_j\partial_if(a + \theta_1he_i + te_j)$. Par les accroissements finis, il existe $\theta_2 \in \,]0, 1[$ tel que $\chi(k) - \chi(0) = k\,\partial_j\partial_if(a + \theta_1he_i + \theta_2ke_j)$. Donc
$$\Delta = hk\,\partial_j\partial_if(P),\qquad P = a + \theta_1he_i + \theta_2ke_j.$$

**Étape 3 (dans l'autre ordre)**　Posons $\psi(t) = f(a + he_i + te_j) - f(a + te_j)$, de sorte que $\Delta = \psi(k) - \psi(0)$. En échangeant les rôles de $(i, h)$ et $(j, k)$ dans les étapes 1 et 2, on obtient $\theta_3, \theta_4 \in \,]0, 1[$ tels que
$$\Delta = k\big[\partial_jf(a + he_i + \theta_3ke_j) - \partial_jf(a + \theta_3ke_j)\big] = hk\,\partial_i\partial_jf(Q),\qquad Q = a + \theta_4he_i + \theta_3ke_j.$$

**Étape 4 (passage à la limite)**　D'après les étapes 2 et 3, et comme $hk \ne 0$, on a $\partial_j\partial_if(P) = \partial_i\partial_jf(Q)$. Prenons $h = k = t \in \,]0, r[$ et notons $P_t, Q_t$ les points correspondants ; alors $\norm{P_t - a}_\infty \le t$ et $\norm{Q_t - a}_\infty \le t$ (les $\theta$ dépendent de $t$ mais restent dans $]0, 1[$). En faisant $t \to 0^{+}$, par continuité de $\partial_j\partial_if$ et de $\partial_i\partial_jf$ en $a$,
$$\partial_j\partial_if(a) = \lim_{t \to 0^{+}}\partial_j\partial_if(P_t) = \lim_{t \to 0^{+}}\partial_i\partial_jf(Q_t) = \partial_i\partial_jf(a).$$
Les dérivées croisées sont donc égales ; les coefficients $(i, j)$ et $(j, i)$ de $H_f(a)$ coïncident, et la hessienne est symétrique.
:::

::: rem
1. 证明只用到：$\partial_if, \partial_jf$ 在 $a$ 附近存在，$\partial_j\partial_if, \partial_i\partial_jf$ 在 $a$ 附近存在且**在 $a$ 处连续**。
2. 归纳可得：若 $f$ 是 $\Cc^k$ 的，则 $k$ 阶以内的偏导数与求导次序无关。
3. 推论（第 11 章与 {@poincare} 要用）：$\Cc^2$ 函数的梯度场满足 $\partial_j(\partial_if) = \partial_i(\partial_jf)$。
:::

::: cex id=cex-schwarz lvl=1
**连续性条件不能省略。** 令 $f(x, y) = \dfrac{xy(x^2 - y^2)}{x^2 + y^2}$，$f(0, 0) = 0$（Peano 的例子）。

1. **一阶偏导数**：对 $(x, y) \ne 0$ 直接求导，
   $$\partial_xf = \frac{y(x^4 + 4x^2y^2 - y^4)}{(x^2 + y^2)^2},\qquad \partial_yf = \frac{x(x^4 - 4x^2y^2 - y^4)}{(x^2 + y^2)^2};$$
   在原点，$f(t, 0) = f(0, t) = 0$，所以 $\partial_xf(0, 0) = \partial_yf(0, 0) = 0$。
2. **$f$ 是 $\Cc^1$ 的**：$2(x^2 + y^2)^2 - (x^4 + 4x^2y^2 + y^4) = x^4 + y^4 \ge 0$，所以 $\abs{\partial_xf} \le 2\abs y$，$\abs{\partial_yf} \le 2\abs x$，两个偏导数在原点也连续；由 {@c1-partielles}，$f \in \Cc^1(\R^2)$。
3. **交叉偏导数**：由 1，$\partial_xf(0, y) = \frac{y\cdot(-y^4)}{y^4} = -y$（$y \ne 0$），且 $y = 0$ 时也成立；所以
   $$\frac{\partial^2 f}{\partial y\,\partial x}(0, 0) = \frac{\dd}{\dd y}(-y)\Big|_{y=0} = -1.$$
   类似地，由 1 的第二个公式，$\partial_yf(x, 0) = \frac{x\cdot x^4}{x^4} = x$（$x \ne 0$），$x = 0$ 时也成立，所以 $\dfrac{\partial^2 f}{\partial x\,\partial y}(0, 0) = \frac{\dd}{\dd x}(x)\big|_{x=0} = 1$。两者不等。
4. **为何不矛盾**：二阶偏导数处处存在（原点外是有理函数；在原点，$\partial_xf(x, 0) = 0$、$\partial_yf(0, y) = 0$ 给出 $\partial_x^2f(0,0) = \partial_y^2f(0,0) = 0$），但对 $(x, y) \ne 0$，
   $$\frac{\partial^2 f}{\partial y\,\partial x}(x, y) = \frac{(x^2 - y^2)(x^4 + 10x^2y^2 + y^4)}{(x^2 + y^2)^3},$$
   它在 $(x, 0)$ 处等于 $1$，在 $(0, y)$ 处等于 $-1$，在原点不连续。所以 $f$ 不是 $\Cc^2$ 的，Schwarz 定理不适用。
:::

::: thm id=taylor-young zh="二阶 Taylor–Young 公式" en="Second-order Taylor formula" fr="Formule de Taylor–Young à l'ordre 2" ru="Формула Тейлора второго порядка" lvl=1
若 $f : U \subset \R^n \to \R$ 是 $\Cc^2$ 的，$a \in U$，则
$$f(a + h) = f(a) + \ps{\nabla f(a), h} + \frac12 h^TH_f(a)\,h + o(\norm h^2),$$
即存在 $\eps(h) \xrightarrow[h \to 0]{} 0$，使 $f(a + h) = f(a) + \ps{\nabla f(a), h} + \frac12h^TH_f(a)h + \norm h^2\eps(h)$。这里 $h^TH_f(a)h = \sum_{i,j}h_ih_j\,\partial_i\partial_jf(a)$。
:::

::: fr
Si $f : U \subset \R^n \to \R$ est de classe $\mathcal{C}^2$ et $a \in U$, alors
$$f(a + h) = f(a) + \ps{\nabla f(a), h} + \frac12 h^TH_f(a)\,h + o(\norm h^2),$$
c'est-à-dire qu'il existe $\eps(h) \xrightarrow[h \to 0]{} 0$ tel que $f(a + h) = f(a) + \ps{\nabla f(a), h} + \frac12h^TH_f(a)h + \norm h^2\eps(h)$. Ici $h^TH_f(a)h = \sum_{i,j}h_ih_j\,\partial_i\partial_jf(a)$.
:::

::: proof
▷ 思路：限制到线段上，$g(t) = f(a + th)$ 是一元 $\Cc^2$ 函数，用 L1 的 Taylor–Lagrange 公式展开到二阶，余项里的 Hessian 在中间点 $a + \theta h$ 取值；再用 Hessian 在 $a$ 的连续性，把它换成 $H_f(a)$，误差为 $o(\norm h^2)$。全程用 Euclid 范数，矩阵用相应的算子范数。

**第 1 步（设定）**　取 $r > 0$ 使 $B(a, r) \subset U$。设 $0 < \norm h < r$。与 {@accroissements-finis} 的第 1 步相同，$g(t) = f(a + th)$ 在包含 $[0, 1]$ 的开区间上有定义。

**第 2 步（$g$ 的导数）**　由链式法则与 {@c9-jacobienne}，$g'(t) = \dd f(a + th)(h) = \sum_ih_i\,\partial_if(a + th)$。每个 $\partial_if$ 是 $\Cc^1$ 的，对它用同样的链式法则，$t \mapsto \partial_if(a + th)$ 可导，导数为 $\sum_jh_j\,\partial_j\partial_if(a + th)$。所以
$$g''(t) = \sum_{i,j}h_ih_j\,\partial_j\partial_if(a + th) = h^TH_f(a + th)\,h,$$
（$H_f$ 对称，{@schwarz}），$g''$ 连续，$g$ 是 $\Cc^2$ 的。

**第 3 步（Taylor–Lagrange）**　由 L1 的 Taylor–Lagrange 公式，存在 $\theta \in \,]0, 1[$（依赖于 $h$），使 $g(1) = g(0) + g'(0) + \frac12g''(\theta)$，即
$$f(a + h) = f(a) + \ps{\nabla f(a), h} + \frac12h^TH_f(a + \theta h)h.$$

**第 4 步（余项）**　令 $R(h) = f(a + h) - f(a) - \ps{\nabla f(a), h} - \frac12h^TH_f(a)h$。由第 3 步，
$$\begin{aligned}
\abs{R(h)} &= \tfrac12\abs{h^T\big(H_f(a + \theta h) - H_f(a)\big)h} \\
&\le \tfrac12\norm h\,\norm{\big(H_f(a + \theta h) - H_f(a)\big)h} && \text{（Cauchy–Schwarz）}\\
&\le \tfrac12\norm{H_f(a + \theta h) - H_f(a)}\,\norm h^2 && \text{（算子范数）}.
\end{aligned}$$

**第 5 步（$\eps(h) \to 0$）**　对 $h \ne 0$ 令 $\eps(h) = R(h)/\norm h^2$，$\eps(0) = 0$。设 $\eta > 0$。$H_f$ 的元素在 $a$ 连续，$\M_n(\R)$ 上的范数都等价，所以 $H_f$ 在 $a$ 按算子范数连续：存在 $\delta \in \,]0, r]$，使 $\norm{y - a} < \delta \implies \norm{H_f(y) - H_f(a)} \le 2\eta$。当 $0 < \norm h < \delta$ 时，$\norm{\theta h} < \delta$，由第 4 步 $\abs{\eps(h)} \le \eta$。所以 $\eps(h) \to 0$，公式成立。
:::

::: fr
▷ Méthode : on se ramène au segment : $g(t) = f(a + th)$ est une fonction de classe $\mathcal{C}^2$ d'une variable ; la formule de Taylor–Lagrange de L1 à l'ordre 2 fait apparaître la hessienne en un point intermédiaire $a + \theta h$ ; la continuité de la hessienne en $a$ permet de la remplacer par $H_f(a)$ avec une erreur $o(\norm h^2)$. On utilise la norme euclidienne et, pour les matrices, la norme subordonnée.

**Étape 1 (cadre)**　Soit $r > 0$ tel que $B(a, r) \subset U$, et $0 < \norm h < r$. Comme à l'étape 1 de {@fr:accroissements-finis}, $g(t) = f(a + th)$ est définie sur un intervalle ouvert contenant $[0, 1]$.

**Étape 2 (dérivées de $g$)**　D'après la règle de la chaîne et {@fr:c9-jacobienne}, $g'(t) = \dd f(a + th)(h) = \sum_ih_i\,\partial_if(a + th)$. Chaque $\partial_if$ étant de classe $\mathcal{C}^1$, $t \mapsto \partial_if(a + th)$ est dérivable de dérivée $\sum_jh_j\,\partial_j\partial_if(a + th)$. Ainsi
$$g''(t) = \sum_{i,j}h_ih_j\,\partial_j\partial_if(a + th) = h^TH_f(a + th)\,h$$
($H_f$ est symétrique, {@fr:schwarz}) ; $g''$ est continue et $g$ est de classe $\mathcal{C}^2$.

**Étape 3 (Taylor–Lagrange)**　D'après la formule de Taylor–Lagrange, il existe $\theta \in \,]0, 1[$ (dépendant de $h$) tel que $g(1) = g(0) + g'(0) + \frac12g''(\theta)$, c'est-à-dire
$$f(a + h) = f(a) + \ps{\nabla f(a), h} + \frac12h^TH_f(a + \theta h)h.$$

**Étape 4 (reste)**　Posons $R(h) = f(a + h) - f(a) - \ps{\nabla f(a), h} - \frac12h^TH_f(a)h$. D'après l'étape 3,
$$\begin{aligned}
\abs{R(h)} &= \tfrac12\abs{h^T\big(H_f(a + \theta h) - H_f(a)\big)h} \\
&\le \tfrac12\norm h\,\norm{\big(H_f(a + \theta h) - H_f(a)\big)h} && \text{(Cauchy–Schwarz)}\\
&\le \tfrac12\norm{H_f(a + \theta h) - H_f(a)}\,\norm h^2 && \text{(norme subordonnée)}.
\end{aligned}$$

**Étape 5 ($\eps(h) \to 0$)**　Pour $h \ne 0$, posons $\eps(h) = R(h)/\norm h^2$, et $\eps(0) = 0$. Soit $\eta > 0$. Les coefficients de $H_f$ sont continus en $a$ et toutes les normes sur $\M_n(\R)$ sont équivalentes, donc $H_f$ est continue en $a$ pour la norme subordonnée : il existe $\delta \in \,]0, r]$ tel que $\norm{y - a} < \delta \implies \norm{H_f(y) - H_f(a)} \le 2\eta$. Si $0 < \norm h < \delta$, alors $\norm{\theta h} < \delta$, et l'étape 4 donne $\abs{\eps(h)} \le \eta$. Donc $\eps(h) \to 0$, ce qui établit la formule.
:::

::: rem
1. 同样的方法（对 $g$ 用 $k$ 阶 Taylor–Lagrange）给出 $\Cc^k$ 函数的 $k$ 阶 Taylor–Young 公式：$f(a + h) = \sum_{m=0}^k\frac1{m!}\sum_{i_1, \dots, i_m}\partial_{i_1}\cdots\partial_{i_m}f(a)\,h_{i_1}\cdots h_{i_m} + o(\norm h^k)$。
2. $o(\norm h^2)$ 不依赖范数（等价范数只差常数倍）。
3. 实际计算时常常不必求 Hessian：把已知的一元展开（$\e^x$、$\cos y$ 等）相乘，保留二阶以内的项即可。这是因为二阶展开是唯一的：若次数 $\le 2$ 的多项式 $P$ 满足 $P(h) = o(\norm h^2)$，对固定的 $v$ 取 $h = tv$，$P(tv) = c_0 + c_1(v)t + c_2(v)t^2 = o(t^2)$ 迫使 $c_0 = c_1(v) = c_2(v) = 0$，所以 $P = 0$。
:::

::: ex id=c9-ex-taylor lvl=1
$f(x, y) = \e^x\cos y$ 在 $(0, 0)$：$f(0,0) = 1$；$\partial_xf = \e^x\cos y$，$\partial_yf = -\e^x\sin y$，$\nabla f(0) = (1, 0)$；$\partial_x^2f = \e^x\cos y$，$\partial_x\partial_yf = -\e^x\sin y$，$\partial_y^2f = -\e^x\cos y$，$H_f(0) = \begin{pmatrix}1 & 0\\ 0 & -1\end{pmatrix}$。所以
$$\e^x\cos y = 1 + x + \tfrac12(x^2 - y^2) + o(x^2 + y^2).$$
验证：$\e^x\cos y = (1 + x + \frac{x^2}2 + o(x^2))(1 - \frac{y^2}2 + o(y^2))$，展开后二阶以内的项相同。
:::

::: q
$\lim_{(x,y) \to (0,0)}\dfrac{\e^x\cos y - 1 - x}{x^2 + y^2}$ 存在吗？
:::

::: ans
由 {@c9-ex-taylor}，分子 $= \frac12(x^2 - y^2) + (x^2 + y^2)\eps(x, y)$，$\eps \to 0$。所以商 $= \frac12\cdot\frac{x^2 - y^2}{x^2 + y^2} + \eps(x, y)$。沿 $(t, 0)$ 趋于 $\frac12$，沿 $(0, t)$ 趋于 $-\frac12$，由 {@c9-lem-chemins}，极限不存在。
:::

## 极值

求极值分两步：先用一阶条件（梯度为零）列出候选点，再用二阶条件（Hessian 的符号）或其他论证（凸性、紧性、直接比较）判断。全节 $f : U \to \R$，$U \subset \R^n$ 开（除非另有说明），$\R^n$ 带 Euclid 范数。

::: def id=c9-def-extremum zh="局部极值、临界点" en="Local extremum, critical point" fr="Extremum local, point critique" ru="Локальный экстремум, критическая точка"
设 $A \subset \R^n$，$f : A \to \R$，$a \in A$。

- $a$ 是 $f$ 的**局部极小点**，如果 $\exists \rho > 0,\ \forall x \in A,\ \norm{x - a} < \rho \implies f(x) \ge f(a)$；
- **严格**局部极小点：$\exists \rho > 0,\ \forall x \in A,\ 0 < \norm{x - a} < \rho \implies f(x) > f(a)$；
- **全局极小点**：$\forall x \in A,\ f(x) \ge f(a)$。

把不等号反向得到（严格、全局）局部极大点；极小点与极大点统称**极值点**。若 $A = U$ 开、$f$ 在 $a$ 可微且 $\dd f(a) = 0$（即 $\nabla f(a) = 0$），称 $a$ 为 $f$ 的**临界点**。
:::

::: fr
Soit $A \subset \R^n$, $f : A \to \R$ et $a \in A$.

- $a$ est un **minimum local** de $f$ si $\exists \rho > 0,\ \forall x \in A,\ \norm{x - a} < \rho \implies f(x) \ge f(a)$ ;
- un minimum local **strict** si $\exists \rho > 0,\ \forall x \in A,\ 0 < \norm{x - a} < \rho \implies f(x) > f(a)$ ;
- un **minimum global** si $\forall x \in A,\ f(x) \ge f(a)$.

En renversant les inégalités on obtient les maxima locaux (stricts, globaux) ; minima et maxima sont des **extrema**. Si $A = U$ est ouvert, si $f$ est différentiable en $a$ et si $\dd f(a) = 0$ (c'est-à-dire $\nabla f(a) = 0$), on dit que $a$ est un **point critique** de $f$.
:::

::: ex id=c9-ex-extremum lvl=1
1. $f(x, y) = x^2 + y^2$：$(0, 0)$ 是严格全局极小点（$f(x, y) > 0 = f(0, 0)$ 对 $(x, y) \ne 0$）。
2. $f(x, y) = x^2$（在 $\R^2$ 上）：$(0, 0)$ 是全局极小点，但不严格：$f(0, y) = 0 = f(0, 0)$ 对一切 $y$。
3. **临界点但不是极值点**：$f(x, y) = xy$，$\nabla f(0, 0) = (0, 0)$，但 $f(t, t) = t^2 > 0$，$f(t, -t) = -t^2 < 0$：原点的任何邻域里 $f$ 既取比 $f(0,0)$ 大的值也取比它小的值。这样的临界点称为**鞍点**。
:::

::: thm id=cn-extremum zh="一阶必要条件" en="First-order necessary condition" fr="Condition nécessaire du premier ordre" ru="Необходимое условие экстремума" lvl=1
若 $f : U \to \R$ 在**开集** $U$ 的点 $a$ 处可微且取局部极值，则 $\dd f(a) = 0$。
:::

::: fr
Si $f : U \to \R$ est différentiable en un point $a$ de l'**ouvert** $U$ et admet un extremum local en $a$, alors $\dd f(a) = 0$.
:::

::: proof
▷ 思路：沿每个方向 $v$ 限制到直线上，$t \mapsto f(a + tv)$ 在 $t = 0$ 取局部极值，由一元的 Fermat 引理其导数为零，而这个导数就是 $\dd f(a)(v)$。$U$ 开保证 $a + tv$ 对小的 $\abs t$（正负两侧）都有定义。

**第 1 步（翻译假设）**　不妨设 $a$ 是局部极小点（极大点的情形把 $f$ 换成 $-f$）。存在 $\rho > 0$，使 $B(a, \rho) \subset U$（$U$ 开）且 $f(x) \ge f(a)$ 对 $x \in B(a, \rho)$ 成立。

**第 2 步（限制到直线）**　固定 $v \ne 0$，令 $\varphi(t) = f(a + tv)$，$\abs t < \rho/\norm v$。则 $\varphi(t) \ge \varphi(0)$。由 {@diff-prop}，$\varphi'(0) = D_vf(a) = \dd f(a)(v)$ 存在。

**第 3 步（Fermat）**　对 $0 < t < \rho/\norm v$，$\frac{\varphi(t) - \varphi(0)}{t} \ge 0$，令 $t \to 0^{+}$ 得 $\varphi'(0) \ge 0$；对 $-\rho/\norm v < t < 0$，$\frac{\varphi(t) - \varphi(0)}{t} \le 0$，令 $t \to 0^{-}$ 得 $\varphi'(0) \le 0$。所以 $\dd f(a)(v) = \varphi'(0) = 0$。

$v$ 任意（$v = 0$ 时 $\dd f(a)(0) = 0$），所以 $\dd f(a) = 0$。
:::

::: fr
▷ Méthode : on se restreint à chaque droite de direction $v$ : $t \mapsto f(a + tv)$ admet un extremum local en $t = 0$, donc sa dérivée y est nulle (lemme de Fermat en une variable), et cette dérivée vaut $\dd f(a)(v)$. Le fait que $U$ soit ouvert garantit que $a + tv$ est défini pour $\abs t$ petit, des deux côtés.

**Étape 1 (on traduit l'hypothèse)**　Quitte à remplacer $f$ par $-f$, supposons que $a$ est un minimum local. Il existe $\rho > 0$ tel que $B(a, \rho) \subset U$ ($U$ ouvert) et $f(x) \ge f(a)$ pour $x \in B(a, \rho)$.

**Étape 2 (restriction à une droite)**　Fixons $v \ne 0$ et posons $\varphi(t) = f(a + tv)$ pour $\abs t < \rho/\norm v$. Alors $\varphi(t) \ge \varphi(0)$, et d'après {@fr:diff-prop}, $\varphi'(0) = D_vf(a) = \dd f(a)(v)$ existe.

**Étape 3 (Fermat)**　Pour $0 < t < \rho/\norm v$, $\frac{\varphi(t) - \varphi(0)}{t} \ge 0$, d'où $\varphi'(0) \ge 0$ en faisant $t \to 0^{+}$ ; pour $-\rho/\norm v < t < 0$, $\frac{\varphi(t) - \varphi(0)}{t} \le 0$, d'où $\varphi'(0) \le 0$ en faisant $t \to 0^{-}$. Donc $\dd f(a)(v) = \varphi'(0) = 0$.

Comme $v$ est arbitraire (et $\dd f(a)(0) = 0$), $\dd f(a) = 0$.
:::

::: rem
1. **$U$ 必须是开集。** $f(x, y) = x + y$ 在闭单位圆盘上的最大值在边界点 $(\frac{\sqrt2}2, \frac{\sqrt2}2)$ 取到，但 $\nabla f = (1, 1) \ne 0$：证明的第 3 步需要从两侧趋近，边界点只能从一侧。闭区域的边界要单独讨论（参数化边界，或用第 10 章的 Lagrange 乘子法 {@lagrange}）。
2. **逆命题不成立**：临界点不一定是极值点（{@c9-ex-extremum} 第 3 条的 $xy$，或一元的 $x^3$）。
:::

::: thm id=cs-extremum zh="二阶条件" en="Second-order conditions" fr="Conditions du second ordre" ru="Достаточные условия экстремума" lvl=1
设 $f : U \to \R$ 是 $\Cc^2$ 的，$a$ 是临界点，$H = H_f(a)$（由 {@schwarz}，$H$ 对称）。

1. 若 $a$ 是局部极小点，则 $H$ 半正定（$h^THh \ge 0$ 对一切 $h$）。
2. 若 $H$ 正定（$h^THh > 0$ 对一切 $h \ne 0$），则 $a$ 是严格局部极小点。
3. 若 $H$ 有一正一负两个特征值，则 $a$ 不是极值点（鞍点）。

把 $f$ 换成 $-f$：局部极大 ⇒ $H$ 半负定；$H$ 负定 ⇒ 严格局部极大。
:::

::: fr
Soit $f : U \to \R$ de classe $\mathcal{C}^2$, $a$ un point critique et $H = H_f(a)$ (symétrique d'après {@fr:schwarz}).

1. Si $a$ est un minimum local, alors $H$ est positive ($h^THh \ge 0$ pour tout $h$).
2. Si $H$ est définie positive ($h^THh > 0$ pour tout $h \ne 0$), alors $a$ est un minimum local strict.
3. Si $H$ a une valeur propre strictement positive et une valeur propre strictement négative, alors $a$ n'est pas un extremum (point col, ou point selle).

En remplaçant $f$ par $-f$ : maximum local ⇒ $H$ négative ; $H$ définie négative ⇒ maximum local strict.
:::

::: proof
▷ 思路：在临界点，Taylor–Young 公式的一次项消失，$f(a + h) - f(a)$ 的主部是二次型 $\frac12h^THh$。只要余项 $\norm h^2\eps(h)$ 被二次型「压住」（取 $\delta$ 使 $\abs{\eps(h)}$ 小于二次型系数的四分之一），$f - f(a)$ 就与二次型同号。

**第 0 步（展开）**　$\nabla f(a) = 0$，由 {@taylor-young}，存在 $\eps(h) \xrightarrow[h \to 0]{} 0$，使
$$f(a + h) - f(a) = \tfrac12h^THh + \norm h^2\eps(h)\qquad(\norm h < r,\ B(a, r) \subset U).$$

**第 1 步（必要条件，反证）**　设 $a$ 是局部极小点：存在 $\rho > 0$，使 $\norm{x - a} < \rho \implies f(x) \ge f(a)$。反设存在单位向量 $v$ 使 $q := v^THv < 0$。取 $\delta \in \,]0, r]$ 使 $\norm h < \delta \implies \abs{\eps(h)} \le \frac{\abs q}4$。对 $0 < t < \min(\rho, \delta)$，取 $h = tv$：
$$f(a + tv) - f(a) = t^2\big(\tfrac12q + \eps(tv)\big) \le t^2\big(\tfrac12q + \tfrac14\abs q\big) = \tfrac{t^2q}4 < 0,$$
与 $f(a + tv) \ge f(a)$ 矛盾。所以 $H$ 半正定。

**第 2 步（充分条件）**　$H$ 实对称，由谱定理存在标准正交特征基 $(u_1, \dots, u_n)$，特征值 $\lambda_1 \le \dots \le \lambda_n$；$H$ 正定，所以 $\lambda_1 = u_1^THu_1 > 0$。对 $h = \sum_kc_ku_k$：
$$h^THh = \sum_k\lambda_kc_k^2 \ge \lambda_1\sum_kc_k^2 = \lambda_1\norm h^2.$$
取 $\delta \in \,]0, r]$ 使 $\norm h < \delta \implies \abs{\eps(h)} \le \frac{\lambda_1}4$。对 $0 < \norm h < \delta$：
$$f(a + h) - f(a) \ge \tfrac{\lambda_1}2\norm h^2 - \tfrac{\lambda_1}4\norm h^2 = \tfrac{\lambda_1}4\norm h^2 > 0.$$
所以 $a$ 是严格局部极小点。

**第 3 步（鞍点）**　设 $Hu^+ = \lambda^+u^+$，$Hu^- = \lambda^-u^-$，$\lambda^+ > 0 > \lambda^-$，$\norm{u^\pm} = 1$。令 $\mu = \min(\lambda^+, \abs{\lambda^-})$，取 $\delta \in \,]0, r]$ 使 $\norm h < \delta \implies \abs{\eps(h)} \le \frac\mu4$。对 $0 < t < \delta$：
$$f(a + tu^+) - f(a) = t^2\big(\tfrac{\lambda^+}2 + \eps(tu^+)\big) \ge \tfrac{t^2\lambda^+}4 > 0,\qquad f(a + tu^-) - f(a) \le t^2\big(\tfrac{\lambda^-}2 + \tfrac{\abs{\lambda^-}}4\big) = \tfrac{t^2\lambda^-}4 < 0.$$
所以 $a$ 的任何邻域中都有使 $f > f(a)$ 的点和使 $f < f(a)$ 的点，$a$ 不是极值点。

**极大的情形**：$H_{-f}(a) = -H$，对 $-f$ 用第 1、2 步。
:::

::: fr
▷ Méthode : en un point critique, le terme du premier ordre de Taylor–Young disparaît et la partie principale de $f(a + h) - f(a)$ est la forme quadratique $\frac12h^THh$. Il suffit que le reste $\norm h^2\eps(h)$ soit « dominé » par la forme quadratique (on choisit $\delta$ pour que $\abs{\eps(h)}$ soit inférieur au quart du coefficient de la forme) : $f - f(a)$ a alors le signe de la forme quadratique.

**Étape 0 (développement)**　Comme $\nabla f(a) = 0$, d'après {@fr:taylor-young}, il existe $\eps(h) \xrightarrow[h \to 0]{} 0$ tel que
$$f(a + h) - f(a) = \tfrac12h^THh + \norm h^2\eps(h)\qquad(\norm h < r,\ B(a, r) \subset U).$$

**Étape 1 (condition nécessaire, par l'absurde)**　Supposons que $a$ est un minimum local : il existe $\rho > 0$ tel que $\norm{x - a} < \rho \implies f(x) \ge f(a)$. Par l'absurde, supposons qu'il existe un vecteur unitaire $v$ tel que $q := v^THv < 0$. Choisissons $\delta \in \,]0, r]$ tel que $\norm h < \delta \implies \abs{\eps(h)} \le \frac{\abs q}4$. Pour $0 < t < \min(\rho, \delta)$, avec $h = tv$ :
$$f(a + tv) - f(a) = t^2\big(\tfrac12q + \eps(tv)\big) \le t^2\big(\tfrac12q + \tfrac14\abs q\big) = \tfrac{t^2q}4 < 0,$$
ce qui contredit $f(a + tv) \ge f(a)$. Donc $H$ est positive.

**Étape 2 (condition suffisante)**　$H$ est symétrique réelle ; d'après le théorème spectral, il existe une base orthonormée de vecteurs propres $(u_1, \dots, u_n)$, de valeurs propres $\lambda_1 \le \dots \le \lambda_n$ ; comme $H$ est définie positive, $\lambda_1 = u_1^THu_1 > 0$. Pour $h = \sum_kc_ku_k$ :
$$h^THh = \sum_k\lambda_kc_k^2 \ge \lambda_1\sum_kc_k^2 = \lambda_1\norm h^2.$$
Choisissons $\delta \in \,]0, r]$ tel que $\norm h < \delta \implies \abs{\eps(h)} \le \frac{\lambda_1}4$. Pour $0 < \norm h < \delta$ :
$$f(a + h) - f(a) \ge \tfrac{\lambda_1}2\norm h^2 - \tfrac{\lambda_1}4\norm h^2 = \tfrac{\lambda_1}4\norm h^2 > 0.$$
Donc $a$ est un minimum local strict.

**Étape 3 (point col)**　Soient $Hu^+ = \lambda^+u^+$ et $Hu^- = \lambda^-u^-$ avec $\lambda^+ > 0 > \lambda^-$ et $\norm{u^\pm} = 1$. Posons $\mu = \min(\lambda^+, \abs{\lambda^-})$ et choisissons $\delta \in \,]0, r]$ tel que $\norm h < \delta \implies \abs{\eps(h)} \le \frac\mu4$. Pour $0 < t < \delta$ :
$$f(a + tu^+) - f(a) = t^2\big(\tfrac{\lambda^+}2 + \eps(tu^+)\big) \ge \tfrac{t^2\lambda^+}4 > 0,\qquad f(a + tu^-) - f(a) \le t^2\big(\tfrac{\lambda^-}2 + \tfrac{\abs{\lambda^-}}4\big) = \tfrac{t^2\lambda^-}4 < 0.$$
Tout voisinage de $a$ contient donc des points où $f > f(a)$ et des points où $f < f(a)$ : $a$ n'est pas un extremum.

**Cas du maximum** : $H_{-f}(a) = -H$ ; on applique les étapes 1 et 2 à $-f$.
:::

::: rem
**两个逆命题都不成立，$H$ 退化时没有结论。**

1. 半正定 $\not\Rightarrow$ 极小：$f(x, y) = x^2 + y^3$，$H_f(0) = \operatorname{diag}(2, 0)$ 半正定，但 $f(0, y) = y^3$ 在 $0$ 两侧变号，原点不是极值点。
2. 严格极小 $\not\Rightarrow$ 正定：$f(x, y) = x^4 + y^4$，原点是严格全局极小点，但 $H_f(0) = 0$。
3. 当 $H$ 半定且奇异（有零特征值）时，二阶条件无法判断：$x^2 + y^4$（极小）、$x^2 - y^4$（鞍点）、$x^2 + y^3$（非极值）的 Hessian 在原点都是 $\operatorname{diag}(2, 0)$，必须看更高阶的项或直接分析。
:::

::: lem id=c9-monge zh="2×2 对称矩阵的符号" en="Sign of a 2×2 symmetric matrix" fr="Signe d'une matrice symétrique 2×2" ru="Знакоопределённость симметричной матрицы 2×2" lvl=1
设 $H = \begin{pmatrix}r & s\\ s & t\end{pmatrix}$ 实对称。则

1. $H$ 正定 $\iff$ $rt - s^2 > 0$ 且 $r > 0$；
2. $H$ 负定 $\iff$ $rt - s^2 > 0$ 且 $r < 0$；
3. $H$ 有一正一负两个特征值 $\iff$ $rt - s^2 < 0$。
:::

::: fr
Soit $H = \begin{pmatrix}r & s\\ s & t\end{pmatrix}$ symétrique réelle. Alors

1. $H$ est définie positive $\iff$ $rt - s^2 > 0$ et $r > 0$ ;
2. $H$ est définie négative $\iff$ $rt - s^2 > 0$ et $r < 0$ ;
3. $H$ a une valeur propre $> 0$ et une valeur propre $< 0$ $\iff$ $rt - s^2 < 0$.
:::

::: proof
▷ 思路：$H$ 的两个特征值 $\lambda_1, \lambda_2$ 是实数（谱定理），且 $\lambda_1\lambda_2 = \det H = rt - s^2$，$\lambda_1 + \lambda_2 = \tr H = r + t$。符号问题化为乘积与和的符号。

**第 1 步（3）**　$\lambda_1\lambda_2 < 0$ 当且仅当两个特征值异号。

**第 2 步（1，(⇒)）**　$H$ 正定，则 $\lambda_1, \lambda_2 > 0$（$\lambda_i = u_i^THu_i$，$u_i$ 为单位特征向量），所以 $rt - s^2 = \lambda_1\lambda_2 > 0$；且 $r = e_1^THe_1 > 0$。

**第 3 步（1，(⇐)）**　设 $rt - s^2 > 0$，$r > 0$。则 $rt > s^2 \ge 0$，所以 $t$ 与 $r$ 同号，$t > 0$，$\lambda_1 + \lambda_2 = r + t > 0$。又 $\lambda_1\lambda_2 > 0$，两个特征值同号，和为正，所以都为正。于是（同 {@cs-extremum} 第 2 步）$h^THh \ge \min(\lambda_1, \lambda_2)\norm h^2 > 0$（$h \ne 0$），$H$ 正定。

**第 4 步（2）**　把 1 用于 $-H$：$\det(-H) = \det H$，$-H$ 的左上角元素为 $-r$。
:::

::: fr
▷ Méthode : les deux valeurs propres $\lambda_1, \lambda_2$ de $H$ sont réelles (théorème spectral) et $\lambda_1\lambda_2 = \det H = rt - s^2$, $\lambda_1 + \lambda_2 = \tr H = r + t$. On se ramène aux signes du produit et de la somme.

**Étape 1 (point 3)**　$\lambda_1\lambda_2 < 0$ si et seulement si les deux valeurs propres sont de signes opposés.

**Étape 2 (point 1, (⇒))**　Si $H$ est définie positive, $\lambda_1, \lambda_2 > 0$ ($\lambda_i = u_i^THu_i$ avec $u_i$ vecteur propre unitaire), donc $rt - s^2 = \lambda_1\lambda_2 > 0$ ; de plus $r = e_1^THe_1 > 0$.

**Étape 3 (point 1, (⇐))**　Supposons $rt - s^2 > 0$ et $r > 0$. Alors $rt > s^2 \ge 0$, donc $t$ est du signe de $r$, $t > 0$ et $\lambda_1 + \lambda_2 = r + t > 0$. Comme $\lambda_1\lambda_2 > 0$, les deux valeurs propres ont le même signe, et leur somme est positive : elles sont toutes deux strictement positives. Ainsi (comme à l'étape 2 de {@fr:cs-extremum}) $h^THh \ge \min(\lambda_1, \lambda_2)\norm h^2 > 0$ pour $h \ne 0$ : $H$ est définie positive.

**Étape 4 (point 2)**　On applique le point 1 à $-H$ : $\det(-H) = \det H$ et le coefficient en haut à gauche de $-H$ vaut $-r$.
:::

::: method zh="二元情形：Monge 记号"
对 $n = 2$，记 $r = \frac{\partial^2 f}{\partial x^2}(a)$，$s = \frac{\partial^2 f}{\partial x\partial y}(a)$，$t = \frac{\partial^2 f}{\partial y^2}(a)$（法国传统记号）。在临界点，由 {@cs-extremum} 与 {@c9-monge}：

- $rt - s^2 > 0$，$r > 0$：严格局部极小；
- $rt - s^2 > 0$，$r < 0$：严格局部极大；
- $rt - s^2 < 0$：鞍点；
- $rt - s^2 = 0$：不能判断，需要更高阶的分析（例如 $x^4 + y^4$ 与 $x^4 - y^4$，Hessian 都是零矩阵）。
:::

::: ex lvl=1
$f(x, y) = x^3 + y^3 - 3xy$。

1. **临界点**：$\nabla f = (3x^2 - 3y,\ 3y^2 - 3x) = 0$ 给出 $y = x^2$ 与 $x = y^2 = x^4$，即 $x(x^3 - 1) = 0$，$x \in \{0, 1\}$。临界点为 $(0, 0)$ 与 $(1, 1)$。
2. **二阶导数**：$r = 6x$，$s = -3$，$t = 6y$。
3. **在 $(0, 0)$**：$r = t = 0$，$s = -3$，$rt - s^2 = -9 < 0$，鞍点。直接验证：$f(x, x) = x^2(2x - 3) < 0$（$0 < \abs x$ 小），$f(x, -x) = 3x^2 > 0$。
4. **在 $(1, 1)$**：$r = t = 6$，$s = -3$，$rt - s^2 = 27 > 0$，$r > 0$，严格局部极小，$f(1, 1) = -1$。
5. **不是全局极小**：$f(x, 0) = x^3 \xrightarrow[x \to -\infty]{} -\infty$。
:::

::: thm id=convexe-minimum zh="凸函数的临界点" en="Critical points of convex functions" fr="Points critiques d'une fonction convexe" ru="Критические точки выпуклой функции" lvl=1
设 $U$ 凸，$f : U \to \R$ 可微且凸（即 $\forall x, y \in U,\ \forall t \in [0, 1],\ f((1 - t)x + ty) \le (1 - t)f(x) + tf(y)$）。则对一切 $a, x \in U$，
$$f(x) \ge f(a) + \dd f(a)(x - a),$$
因此 $f$ 的任何临界点都是全局极小点。
:::

::: fr
Soit $U$ convexe et $f : U \to \R$ différentiable et convexe (c'est-à-dire $\forall x, y \in U,\ \forall t \in [0, 1],\ f((1 - t)x + ty) \le (1 - t)f(x) + tf(y)$). Alors pour tous $a, x \in U$,
$$f(x) \ge f(a) + \dd f(a)(x - a),$$
et par conséquent tout point critique de $f$ est un minimum global.
:::

::: proof
▷ 思路：凸函数的图像在切平面上方。在凸性不等式中把 $a$ 当作起点、沿 $x - a$ 方向走 $t$，得到「割线斜率 $\ge$ 差商」，再令 $t \to 0^{+}$，差商趋于方向导数 $\dd f(a)(x - a)$。

**第 1 步（凸性不等式）**　固定 $a, x \in U$。对 $t \in \,]0, 1]$，$a + t(x - a) = (1 - t)a + tx \in U$（$U$ 凸），由凸性
$$f(a + t(x - a)) \le (1 - t)f(a) + tf(x),\qquad\text{即}\qquad \frac{f(a + t(x - a)) - f(a)}{t} \le f(x) - f(a).$$

**第 2 步（取极限）**　令 $t \to 0^{+}$。由 {@diff-prop} 第 3 条，左边趋于 $D_{x-a}f(a) = \dd f(a)(x - a)$。不等式在极限下保持（非严格），所以 $\dd f(a)(x - a) \le f(x) - f(a)$。

**第 3 步（临界点）**　若 $\dd f(a) = 0$，则对一切 $x \in U$，$f(x) \ge f(a)$：$a$ 是全局极小点。
:::

::: fr
▷ Méthode : le graphe d'une fonction convexe est au-dessus de ses plans tangents. Dans l'inégalité de convexité, on part de $a$ et on avance de $t$ dans la direction $x - a$ : on obtient « pente de la corde $\ge$ taux d'accroissement », puis on fait $t \to 0^{+}$ ; le taux d'accroissement tend vers la dérivée directionnelle $\dd f(a)(x - a)$.

**Étape 1 (inégalité de convexité)**　Fixons $a, x \in U$. Pour $t \in \,]0, 1]$, $a + t(x - a) = (1 - t)a + tx \in U$ ($U$ convexe), et par convexité
$$f(a + t(x - a)) \le (1 - t)f(a) + tf(x),\qquad\text{soit}\qquad \frac{f(a + t(x - a)) - f(a)}{t} \le f(x) - f(a).$$

**Étape 2 (passage à la limite)**　Faisons $t \to 0^{+}$. D'après le point 3 de {@fr:diff-prop}, le membre de gauche tend vers $D_{x-a}f(a) = \dd f(a)(x - a)$. Les inégalités larges passent à la limite, donc $\dd f(a)(x - a) \le f(x) - f(a)$.

**Étape 3 (point critique)**　Si $\dd f(a) = 0$, alors $f(x) \ge f(a)$ pour tout $x \in U$ : $a$ est un minimum global.
:::

::: rem
1. 若 $U$ 还是开集，由 {@cn-extremum}，对可微凸函数有：$a$ 是全局极小点 $\iff$ $a$ 是临界点。
2. 凸性不能去掉：$x^3$ 在 $0$ 处是临界点，不是极值点。
3. 若 $f$ **严格**凸（$x \ne y$、$t \in \,]0,1[$ 时不等式严格），则极小点至多一个：若 $a \ne b$ 都是极小点，值为 $m$，则 $f(\frac{a + b}2) < \frac m2 + \frac m2 = m$，矛盾。
:::

::: method zh="在紧集上求最值"
设 $K = \overline{U}$ 紧（$U$ 开且有界），$f$ 在 $K$ 上连续、在 $U$ 内可微。

1. **存在性**：由 {@image-compact}，最大值与最小值都取到。
2. **内部候选点**：若最值点 $a \in U$，则它是局部极值点，由 {@cn-extremum}，$\nabla f(a) = 0$。解 $\nabla f = 0$。
3. **边界候选点**：最值点也可能在 $\partial U = K \setminus U$ 上。把边界参数化，化为低维问题（或用第 10 章的 {@lagrange}）。
4. **比较**：在全部候选点处计算 $f$ 的值，最大者为最大值，最小者为最小值。不需要二阶条件。
:::

::: ex id=c9-ex-compact lvl=1
求 $f(x, y) = x^2 + 2y^2 - x$ 在闭单位圆盘 $D = \{x^2 + y^2 \le 1\}$ 上的最值。

1. **存在**：$D$ 是有界闭集，因而紧（{@cor-dimfinie}），$f$ 连续，最值存在。
2. **内部**：$\nabla f = (2x - 1, 4y) = 0$ 给出 $(\frac12, 0)$，在开圆盘内，$f(\frac12, 0) = -\frac14$。
3. **边界**：$(x, y) = (\cos\theta, \sin\theta)$，$f = \cos^2\theta + 2\sin^2\theta - \cos\theta = 2 - c^2 - c$，$c = \cos\theta \in [-1, 1]$。$g(c) = 2 - c - c^2$，$g'(c) = -1 - 2c$ 在 $c = -\frac12$ 为零。$g(-1) = 2$，$g(-\frac12) = \frac94$，$g(1) = 0$；所以边界上最大值 $\frac94$（在 $(-\frac12, \pm\frac{\sqrt3}2)$），最小值 $0$（在 $(1, 0)$）。
4. **比较**：候选值 $-\frac14, \frac94, 2, 0$。最大值 $\frac94$，在 $(-\frac12, \pm\frac{\sqrt3}2)$ 取到；最小值 $-\frac14$，在 $(\frac12, 0)$ 取到。
:::

::: q
设 $f(x, y) = x^2 + y^2(1 - x)^3$。证明 $(0, 0)$ 是 $f$ 唯一的临界点，且是严格局部极小点。它是全局极小点吗？（一元情形，「唯一的临界点是局部极小 ⇒ 全局极小」是对的。）
:::

::: ans
$\partial_yf = 2y(1 - x)^3 = 0$ 给出 $y = 0$ 或 $x = 1$。若 $y = 0$：$\partial_xf = 2x - 3y^2(1 - x)^2 = 2x = 0$，$x = 0$。若 $x = 1$：$\partial_xf = 2 \ne 0$。所以唯一的临界点是 $(0, 0)$；$H_f(0) = \operatorname{diag}(2, 2)$ 正定，由 {@cs-extremum}，它是严格局部极小点，$f(0,0) = 0$。但 $f(4, 1) = 16 - 27 = -11 < 0$：不是全局极小。二元情形，函数可以「绕过」局部极小点下降到 $-\infty$ 而不产生新的临界点。
:::

::: q
求 $f(x, y) = x^4 + y^4 - 2(x - y)^2$ 的临界点并判断其类型。
:::

::: ans
$\nabla f = (4x^3 - 4(x - y),\ 4y^3 + 4(x - y))$。两式相加得 $x^3 + y^3 = 0$，即 $y = -x$；代入第一式 $x^3 - 2x = 0$，临界点为 $(0, 0)$、$(\sqrt2, -\sqrt2)$、$(-\sqrt2, \sqrt2)$。$r = 12x^2 - 4$，$s = 4$，$t = 12y^2 - 4$。

- 在 $(\pm\sqrt2, \mp\sqrt2)$：$r = t = 20$，$s = 4$，$rt - s^2 = 384 > 0$，$r > 0$：严格局部极小，$f = -8$（由于 $f \ge x^4 + y^4 - 4(x^2 + y^2) \to +\infty$，它们也是全局极小）。
- 在 $(0, 0)$：$r = t = -4$，$s = 4$，$rt - s^2 = 0$，二阶条件失效。直接看：$f(x, x) = 2x^4 > 0$，$f(x, 0) = x^4 - 2x^2 < 0$（$0 < \abs x < \sqrt2$），所以原点是鞍点。
:::

## 向量场与 Poincaré 引理

一元情形，每个连续函数都有原函数。多元情形的对应问题是：给定向量场 $V$，是否存在函数 $f$ 使 $V = \nabla f$？由 Schwarz 定理，有一个明显的必要条件（「交叉偏导数对称」）；Poincaré 引理说，在星形区域上它也是充分的。区域的形状不能去掉，这是拓扑进入分析的第一个例子。

::: def id=c9-def-champs zh="散度、旋度、Laplace 算子" en="Divergence, curl, Laplacian" fr="Divergence, rotationnel, laplacien" ru="Дивергенция, ротор, оператор Лапласа"
设 $U \subset \R^3$ 开，$V = (P, Q, R) : U \to \R^3$ 是 $\Cc^1$ 向量场。定义
$$\operatorname{div}V = \partial_xP + \partial_yQ + \partial_zR,\qquad \operatorname{rot}V = \big(\partial_yR - \partial_zQ,\ \partial_zP - \partial_xR,\ \partial_xQ - \partial_yP\big)$$
（形式上 $\operatorname{rot}V = \nabla \wedge V$）。对 $U \subset \R^n$ 上的 $\Cc^2$ 函数 $f$，**Laplace 算子**为 $\Delta f = \operatorname{div}\nabla f = \sum_i\partial_{x_i}^2f$；$\Delta f = 0$ 的函数称为**调和函数**。若 $V = \nabla f$，称 $V$ 为**梯度场**，$f$ 为 $V$ 的**势函数**。
:::

::: fr
Soit $U \subset \R^3$ ouvert et $V = (P, Q, R) : U \to \R^3$ un champ de vecteurs de classe $\mathcal{C}^1$. On définit
$$\operatorname{div}V = \partial_xP + \partial_yQ + \partial_zR,\qquad \operatorname{rot}V = \big(\partial_yR - \partial_zQ,\ \partial_zP - \partial_xR,\ \partial_xQ - \partial_yP\big)$$
(formellement $\operatorname{rot}V = \nabla \wedge V$). Pour $f$ de classe $\mathcal{C}^2$ sur $U \subset \R^n$, le **laplacien** est $\Delta f = \operatorname{div}\nabla f = \sum_i\partial_{x_i}^2f$ ; une fonction telle que $\Delta f = 0$ est dite **harmonique**. Si $V = \nabla f$, on dit que $V$ est un **champ de gradient** et que $f$ est un **potentiel** de $V$.
:::

::: ex id=c9-ex-harmoniques lvl=1
1. $x^2 - y^2$ 与 $xy$ 在 $\R^2$ 上调和：$\partial_x^2(x^2 - y^2) + \partial_y^2(x^2 - y^2) = 2 - 2 = 0$。
2. $\ln(x^2 + y^2)$ 在 $\R^2 \setminus \{0\}$ 上调和：$\partial_x^2\ln(x^2 + y^2) = \frac{2(y^2 - x^2)}{(x^2 + y^2)^2}$，$\partial_y^2$ 把 $x, y$ 对调，二者之和为 $0$。$\frac1{\norm x_2}$ 在 $\R^3 \setminus \{0\}$ 上调和（Newton 势）。
3. 非例：$x^2 + y^2$，$\Delta = 4 \ne 0$。
:::

::: prop id=c9-rot-grad zh="rot grad = 0，div rot = 0" en="curl grad = 0, div curl = 0" fr="rot grad = 0, div rot = 0" ru="rot grad = 0, div rot = 0" lvl=1
设 $U \subset \R^3$ 开。

1. 若 $f \in \Cc^2(U)$，则 $\operatorname{rot}\nabla f = 0$。
2. 若 $V \in \Cc^2(U, \R^3)$，则 $\operatorname{div}\operatorname{rot}V = 0$。
:::

::: fr
Soit $U \subset \R^3$ ouvert.

1. Si $f \in \mathcal{C}^2(U)$, alors $\operatorname{rot}\nabla f = 0$.
2. Si $V \in \mathcal{C}^2(U, \R^3)$, alors $\operatorname{div}\operatorname{rot}V = 0$.
:::

::: proof
▷ 思路：展开定义，每一项都是一对互相抵消的混合偏导数，用 Schwarz 定理。

**第 1 步**　$\nabla f = (\partial_xf, \partial_yf, \partial_zf)$，所以
$$\operatorname{rot}\nabla f = \big(\partial_y\partial_zf - \partial_z\partial_yf,\ \partial_z\partial_xf - \partial_x\partial_zf,\ \partial_x\partial_yf - \partial_y\partial_xf\big) = 0 \qquad\text{（{@schwarz}）}.$$

**第 2 步**　
$$\operatorname{div}\operatorname{rot}V = (\partial_x\partial_yR - \partial_y\partial_xR) + (\partial_y\partial_zP - \partial_z\partial_yP) + (\partial_z\partial_xQ - \partial_x\partial_zQ) = 0,$$
每个括号由 {@schwarz} 为零（$P, Q, R$ 是 $\Cc^2$ 的）。
:::

::: fr
▷ Méthode : on développe les définitions ; chaque terme est une paire de dérivées croisées qui se compensent, d'après le théorème de Schwarz.

**Étape 1**　$\nabla f = (\partial_xf, \partial_yf, \partial_zf)$, donc
$$\operatorname{rot}\nabla f = \big(\partial_y\partial_zf - \partial_z\partial_yf,\ \partial_z\partial_xf - \partial_x\partial_zf,\ \partial_x\partial_yf - \partial_y\partial_xf\big) = 0 \qquad\text{({@fr:schwarz})}.$$

**Étape 2**　
$$\operatorname{div}\operatorname{rot}V = (\partial_x\partial_yR - \partial_y\partial_xR) + (\partial_y\partial_zP - \partial_z\partial_yP) + (\partial_z\partial_xQ - \partial_x\partial_zQ) = 0,$$
chaque parenthèse étant nulle d'après {@fr:schwarz} ($P, Q, R$ sont de classe $\mathcal{C}^2$).
:::

::: def id=c9-def-etoile zh="星形集" en="Star-shaped set" fr="Partie étoilée" ru="Звёздное множество"
$U \subset \R^n$ 关于点 $c \in U$ 是**星形的**，如果
$$\forall x \in U,\ \forall t \in [0, 1],\qquad c + t(x - c) \in U,$$
即从 $c$ 到 $U$ 中任一点的线段都在 $U$ 中。
:::

::: fr
On dit que $U \subset \R^n$ est **étoilé** par rapport au point $c \in U$ si
$$\forall x \in U,\ \forall t \in [0, 1],\qquad c + t(x - c) \in U,$$
c'est-à-dire si le segment joignant $c$ à tout point de $U$ est contenu dans $U$.
:::

::: ex id=c9-ex-etoile lvl=1
1. 凸集关于它的每一点都是星形的。
2. 割缝平面 $\R^2 \setminus (\R_- \times \{0\})$ 不凸（$(-1, 1)$ 与 $(-1, -1)$ 之间的线段经过 $(-1, 0)$），但关于 $c = (1, 0)$ 是星形的：若 $x = (x_1, x_2)$，$x_2 \ne 0$，则线段 $[c, x]$ 只在 $t = 0$ 时与 $x$ 轴相交，交点为 $c$；若 $x_2 = 0$，则 $x_1 > 0$，线段在正半轴上。
3. 非例：$\R^2 \setminus \{0\}$ 关于任何点都不是星形的：对 $c \ne 0$，从 $c$ 到 $-c$ 的线段经过 $0$。
:::

::: thm id=poincare zh="Poincaré 引理（星形域）" en="Poincaré lemma (star-shaped domain)" fr="Théorème de Poincaré" ru="Лемма Пуанкаре" lvl=1
设 $U \subset \R^n$ 是关于 $0$ 的星形开集，$V = (V_1, \dots, V_n)$ 是 $U$ 上的 $\Cc^1$ 向量场。则存在 $f \in \Cc^2(U)$，使 $V = \nabla f$（$V$ 是**梯度场**），当且仅当
$$\frac{\partial V_i}{\partial x_j} = \frac{\partial V_j}{\partial x_i}\qquad\text{对一切 } i, j.$$
此时可取 $f(x) = \int_0^1\ps{V(tx), x}\,\dd t$。
:::

::: fr
Soit $U \subset \R^n$ un ouvert étoilé par rapport à $0$ et $V = (V_1, \dots, V_n)$ un champ de vecteurs de classe $\mathcal{C}^1$ sur $U$. Il existe $f \in \mathcal{C}^2(U)$ telle que $V = \nabla f$ ($V$ est un **champ de gradient**) si et seulement si
$$\frac{\partial V_i}{\partial x_j} = \frac{\partial V_j}{\partial x_i}\qquad\text{pour tous } i, j.$$
Dans ce cas, on peut prendre $f(x) = \int_0^1\ps{V(tx), x}\,\dd t$.
:::

::: proof
▷ 思路：必要性就是 Schwarz 定理。充分性模仿一元情形「原函数 $= \int_0^xV$」：沿从 $0$ 到 $x$ 的线段积分 $V$（星形保证线段在 $U$ 中），得到 $f(x) = \int_0^1\ps{V(tx), x}\,\dd t$；然后在积分号下求导，用对称条件把被积函数化成一个对 $t$ 的全导数。

**(⇒)**　若 $V = \nabla f$，$f \in \Cc^2$，则 $\partial_jV_i = \partial_j\partial_if = \partial_i\partial_jf = \partial_iV_j$（{@schwarz}）。

**(⇐) 第 1 步（$f$ 有定义）**　对 $x \in U$ 与 $t \in [0, 1]$，$tx = 0 + t(x - 0) \in U$（星形）。$t \mapsto \ps{V(tx), x} = \sum_iV_i(tx)x_i$ 在 $[0, 1]$ 上连续，所以 $f(x) = \int_0^1\sum_iV_i(tx)x_i\,\dd t$ 有定义。

**(⇐) 第 2 步（对 $x_j$ 求导）**　固定 $x^0 \in U$ 与 $j$。取 $r > 0$ 使 $\overline B(x^0, r) \subset U$，令 $A = \,]-r, r[$。对 $s \in A$，$y(s) = x^0 + se_j \in U$，且
$$f(y(s)) = \int_0^1\phi(s, t)\,\dd t,\qquad \phi(s, t) = \sum_iV_i\big(t\,y(s)\big)\,y_i(s).$$
由乘积与链式法则（$\frac{\dd}{\dd s}V_i(t\,y(s)) = t\,\partial_jV_i(t\,y(s))$，$\frac{\dd}{\dd s}y_i(s) = \delta_{ij}$），
$$\partial_s\phi(s, t) = V_j\big(t\,y(s)\big) + t\sum_iy_i(s)\,\partial_jV_i\big(t\,y(s)\big),$$
它在 $A \times [0, 1]$ 上连续。**控制**：集合 $K = \{ty : t \in [0, 1],\ y \in \overline B(x^0, r)\}$ 是紧集 $[0, 1] \times \overline B(x^0, r)$ 在连续映射 $(t, y) \mapsto ty$ 下的像，是紧集（{@image-compact}），且由星形 $K \subset U$。连续函数 $V_j$、$\partial_jV_i$ 在 $K$ 上有界，设界为 $M$。于是对一切 $(s, t) \in A \times [0, 1]$，
$$\abs{\partial_s\phi(s, t)} \le M + \sum_i(\abs{x^0_i} + r)M =: C,$$
常数 $C$ 在 $[0, 1]$ 上可积。由 {@derivation-parametre}，$s \mapsto f(y(s))$ 在 $A$ 上可导，在 $s = 0$ 处得
$$\partial_jf(x^0) = \int_0^1\Big(V_j(tx^0) + t\sum_ix^0_i\,\partial_jV_i(tx^0)\Big)\dd t.$$

**(⇐) 第 3 步（用对称条件）**　由假设 $\partial_jV_i = \partial_iV_j$，被积函数等于
$$V_j(tx^0) + t\sum_ix^0_i\,\partial_iV_j(tx^0) = \frac{\dd}{\dd t}\Big(t\,V_j(tx^0)\Big)$$
（乘积法则，且由链式法则 $\frac{\dd}{\dd t}V_j(tx^0) = \sum_ix^0_i\,\partial_iV_j(tx^0)$）。

**(⇐) 第 4 步（积分）**　$\partial_jf(x^0) = \big[t\,V_j(tx^0)\big]_{t=0}^{t=1} = V_j(x^0)$。

**(⇐) 第 5 步（正则性）**　$\partial_jf = V_j$ 在 $U$ 上连续，由 {@c1-partielles}，$f$ 是 $\Cc^1$ 的且 $\nabla f = V$；$f$ 的一阶偏导数 $V_j$ 是 $\Cc^1$ 的，所以 $f \in \Cc^2(U)$。
:::

::: fr
▷ Méthode : la nécessité est le théorème de Schwarz. Pour la suffisance, on imite le cas d'une variable (« primitive $= \int_0^xV$ ») : on intègre $V$ le long du segment de $0$ à $x$ (contenu dans $U$ car $U$ est étoilé), ce qui donne $f(x) = \int_0^1\ps{V(tx), x}\,\dd t$ ; on dérive sous le signe intégrale, et la condition de symétrie transforme l'intégrande en une dérivée totale par rapport à $t$.

**(⇒)**　Si $V = \nabla f$ avec $f \in \mathcal{C}^2$, alors $\partial_jV_i = \partial_j\partial_if = \partial_i\partial_jf = \partial_iV_j$ ({@fr:schwarz}).

**(⇐) Étape 1 ($f$ est bien définie)**　Pour $x \in U$ et $t \in [0, 1]$, $tx = 0 + t(x - 0) \in U$ ($U$ étoilé). La fonction $t \mapsto \ps{V(tx), x} = \sum_iV_i(tx)x_i$ est continue sur $[0, 1]$, donc $f(x) = \int_0^1\sum_iV_i(tx)x_i\,\dd t$ est bien définie.

**(⇐) Étape 2 (dérivation par rapport à $x_j$)**　Fixons $x^0 \in U$ et $j$. Soit $r > 0$ tel que $\overline B(x^0, r) \subset U$, et $A = \,]-r, r[$. Pour $s \in A$, $y(s) = x^0 + se_j \in U$ et
$$f(y(s)) = \int_0^1\phi(s, t)\,\dd t,\qquad \phi(s, t) = \sum_iV_i\big(t\,y(s)\big)\,y_i(s).$$
Par la règle du produit et la règle de la chaîne ($\frac{\dd}{\dd s}V_i(t\,y(s)) = t\,\partial_jV_i(t\,y(s))$, $\frac{\dd}{\dd s}y_i(s) = \delta_{ij}$),
$$\partial_s\phi(s, t) = V_j\big(t\,y(s)\big) + t\sum_iy_i(s)\,\partial_jV_i\big(t\,y(s)\big),$$
qui est continue sur $A \times [0, 1]$. **Domination** : l'ensemble $K = \{ty : t \in [0, 1],\ y \in \overline B(x^0, r)\}$ est l'image du compact $[0, 1] \times \overline B(x^0, r)$ par l'application continue $(t, y) \mapsto ty$, donc compact ({@fr:image-compact}), et $K \subset U$ car $U$ est étoilé. Les fonctions continues $V_j$, $\partial_jV_i$ sont bornées sur $K$, disons par $M$. Ainsi, pour tout $(s, t) \in A \times [0, 1]$,
$$\abs{\partial_s\phi(s, t)} \le M + \sum_i(\abs{x^0_i} + r)M =: C,$$
et la constante $C$ est intégrable sur $[0, 1]$. D'après {@fr:derivation-parametre}, $s \mapsto f(y(s))$ est dérivable sur $A$ et, en $s = 0$,
$$\partial_jf(x^0) = \int_0^1\Big(V_j(tx^0) + t\sum_ix^0_i\,\partial_jV_i(tx^0)\Big)\dd t.$$

**(⇐) Étape 3 (on utilise la symétrie)**　Par hypothèse $\partial_jV_i = \partial_iV_j$, donc l'intégrande vaut
$$V_j(tx^0) + t\sum_ix^0_i\,\partial_iV_j(tx^0) = \frac{\dd}{\dd t}\Big(t\,V_j(tx^0)\Big)$$
(règle du produit, et $\frac{\dd}{\dd t}V_j(tx^0) = \sum_ix^0_i\,\partial_iV_j(tx^0)$ par la règle de la chaîne).

**(⇐) Étape 4 (intégration)**　$\partial_jf(x^0) = \big[t\,V_j(tx^0)\big]_{t=0}^{t=1} = V_j(x^0)$.

**(⇐) Étape 5 (régularité)**　$\partial_jf = V_j$ est continue sur $U$ ; d'après {@fr:c1-partielles}, $f$ est de classe $\mathcal{C}^1$ et $\nabla f = V$ ; les dérivées partielles $V_j$ de $f$ sont de classe $\mathcal{C}^1$, donc $f \in \mathcal{C}^2(U)$.
:::

::: rem
1. 若 $U$ 关于点 $c$ 星形，平移后用定理：$f(x) = \int_0^1\ps{V(c + t(x - c)), x - c}\,\dd t$。
2. 在 $\R^3$ 中，三个条件 $\partial_jV_i = \partial_iV_j$（$\{i, j\} = \{2,3\}, \{3,1\}, \{1,2\}$）恰好是 $\operatorname{rot}V = 0$ 的三个分量。所以：**星形开集上，$\operatorname{rot}V = 0 \iff V$ 是梯度场**。
3. 用第 11 章的语言：$\omega = \sum V_i\,\dd x_i$ 是**闭形式**（对称条件）与**恰当形式**（$\omega = \dd f$）；Poincaré 引理说星形开集上闭形式都是恰当的（{@forme-exacte}）。
:::

::: ex id=c9-ex-potentiel lvl=1
$V(x, y) = (2xy + 1,\ x^2 + 3y^2)$ 在 $\R^2$ 上。$\partial_yV_1 = 2x = \partial_xV_2$，$\R^2$ 凸，由 {@poincare}，$V$ 有势函数。**求法**：由 $\partial_xf = 2xy + 1$，对 $x$ 积分得 $f = x^2y + x + c(y)$；代入 $\partial_yf = x^2 + c'(y) = x^2 + 3y^2$，得 $c'(y) = 3y^2$，$c(y) = y^3 + C$。所以 $f(x, y) = x^2y + x + y^3$（加任意常数）。用定理中的公式验证：$\int_0^1\big[(2t^2xy + 1)x + (t^2x^2 + 3t^2y^2)y\big]\dd t = \frac23x^2y + x + \frac13x^2y + y^3 = x^2y + x + y^3$。
:::

::: cex lvl=1
**星形条件不能省略。** 在 $\R^2 \setminus \{0\}$ 上，$V = \Big(\dfrac{-y}{x^2 + y^2}, \dfrac{x}{x^2 + y^2}\Big)$。

1. **对称条件成立**：$\partial_yV_1 = -\dfrac{(x^2 + y^2) - 2y^2}{(x^2 + y^2)^2} = \dfrac{y^2 - x^2}{(x^2 + y^2)^2}$，$\partial_xV_2 = \dfrac{(x^2 + y^2) - 2x^2}{(x^2 + y^2)^2} = \dfrac{y^2 - x^2}{(x^2 + y^2)^2}$。
2. **不是梯度场**：反设 $V = \nabla f$，$f \in \Cc^1(\R^2 \setminus \{0\})$。令 $\gamma(t) = (\cos t, \sin t)$，$\varphi = f \circ \gamma$。由链式法则，$\varphi'(t) = \ps{V(\gamma(t)), \gamma'(t)} = (-\sin t)(-\sin t) + \cos t\cos t = 1$，所以 $\varphi(2\pi) - \varphi(0) = 2\pi$；但 $\gamma(2\pi) = \gamma(0)$，$\varphi(2\pi) = \varphi(0)$，矛盾。（这就是沿单位圆的环量 $\oint V\cdot\dd\ell = 2\pi \ne 0$，见第 11 章 {@circulation-vortex}。）
3. **局部是梯度场**：在割缝平面 $\R^2 \setminus (\R_- \times \{0\})$（关于 $(1, 0)$ 星形，{@c9-ex-etoile}）上，$V = \nabla\theta$，$\theta$ 是 {@accroissements-finis} 之后的注中的极角。但 $\theta$ 不能在整个 $\R^2 \setminus \{0\}$ 上连续地定义。这是 de Rham 上同调的第一个例子。
:::

::: q
在 $\R^3$ 上，$V = (yz, xz, xy)$ 是梯度场吗？若是，求势函数。
:::

::: ans
$\operatorname{rot}V = (x - x,\ y - y,\ z - z) = 0$，$\R^3$ 凸，由 {@poincare} 及其后注的第 2 条，$V$ 是梯度场。由 $\partial_xf = yz$ 得 $f = xyz + c(y, z)$；$\partial_yf = xz + \partial_yc = xz$ 给出 $c = c(z)$；$\partial_zf = xy + c'(z) = xy$ 给出 $c$ 为常数。所以 $f = xyz$（加常数）。
:::

## 方法总结

**如何证明多元函数在一点连续（或有极限）？**

1. 由连续函数经运算、复合得到；只在孤立的可疑点单独处理。
2. 在可疑点用不等式把 $\abs{f(x) - \ell}$ 控制成 $\norm{x - a}$ 的函数（{@c9-ex-continuite}）。
3. 在 $\R^2$ 中用极坐标，找到与 $\theta$ 无关的上界 $\eps(r) \to 0$（{@c9-lem-polaire}）。

**如何证明没有极限（或不连续）？** 找两条趋于该点的路径使极限不同（{@c9-lem-chemins}）：先试坐标轴与直线，再试 $y = x^2$ 等曲线（{@cex-limite-droites}）。

**如何证明可微？**

1. 由运算法则：线性组合与分量（{@c9-operations}）、复合（{@chain-rule}）、乘积（{@diff-bilineaire}）、$\Cc^k$ 函数的运算（{@c9-ck-operations}）。
2. 偏导数存在且连续 ⇒ $\Cc^1$ ⇒ 可微（{@c1-partielles}，逐点版本 {@c9-diff-partielles-point}）。
3. 在孤立的可疑点回到定义：先用偏导数确定**唯一可能**的微分 $L(h) = \sum_jh_j\partial_jf(a)$（{@c9-jacobienne}），再证 $\frac{f(a + h) - f(a) - L(h)}{\norm h} \to 0$（常用极坐标或不等式）。
4. 对矩阵函数，直接展开 $f(A + H)$ 并估计余项（{@diff-inverse-det}）。

**如何证明不可微？**

1. 不连续 ⇒ 不可微（{@diff-prop}）。
2. 某个方向导数不存在，或 $v \mapsto D_vf(a)$ 不是线性的（{@diff-prop}，{@cex-directionnelles}）。
3. 候选微分 $L$ 已知（由偏导数），找一条路径使 $\frac{f(a + h) - f(a) - L(h)}{\norm h} \not\to 0$（{@c9-cex-gateaux}）。

**如何估计增量、证明 Lipschitz 或常数？** 有限增量不等式（{@accroissements-finis}，要求线段在定义域内）；$\dd f = 0$ 且道路连通 ⇒ 常数（{@diff-nulle-constante}）。

**如何求开集上的极值？**

1. 解 $\nabla f = 0$ 得临界点（{@cn-extremum}）。
2. 在每个临界点算 Hessian：正定 ⇒ 严格极小，负定 ⇒ 严格极大，有正负特征值 ⇒ 鞍点（{@cs-extremum}）；二元时用 $rt - s^2$ 与 $r$ 的符号（{@c9-monge}）。
3. Hessian 退化时直接分析：沿直线或曲线比较 $f$ 与 $f(a)$ 的大小。
4. 全局极值：凸函数的临界点是全局极小（{@convexe-minimum}）；紧集上比较内部临界点与边界上的值（{@c9-ex-compact}）；有约束时用第 10 章的 Lagrange 乘子法（{@lagrange}）。

**如何判断向量场是否是梯度场？** 必要条件：交叉偏导数对称（$\R^3$ 中即 $\operatorname{rot}V = 0$）。星形区域上它也充分（{@poincare}），势函数可逐个变量积分求出（{@c9-ex-potentiel}）。在非星形区域上，沿某条闭路的积分不为零就说明不是梯度场。

::: rem
**常见错误。**

1. **只沿直线检验连续性或可微性。** {@cex-limite-droites} 沿每条直线都趋于 $0$，但沿 $x = y^2$ 趋于 $\frac12$。
2. **「偏导数存在 ⇒ 可微」或「可微 ⇒ $\Cc^1$」。** 反例：$\frac{xy}{x^2 + y^2}$（{@c9-cex-partielles}）；$x^2\sin\frac1x$（{@c9-ex-c1}）。
3. **对向量值函数用中值等式。** $f(t) = (\cos t, \sin t)$ 没有「中值点」，只有不等式（{@accroissements-finis}）。
4. **误用二阶条件。** 在非临界点看 Hessian 毫无意义；$rt - s^2 = 0$ 时不能下结论（$x^2 + y^3$ 与 $x^2 + y^4$ 的 Hessian 相同）；在闭区域的边界上不要求 $\nabla f = 0$。
5. **忽略定理的条件。** Schwarz 定理要求 $\Cc^2$（{@cex-schwarz}）；Poincaré 引理要求星形（$\R^2 \setminus \{0\}$ 上的涡旋场）；有限增量不等式推出 Lipschitz 要求凸性（割缝圆环上的极角）。
:::

::: read
- В. А. Зорич,《Математический анализ》，第 1 卷（Дифференциальное исчисление функций многих переменных）与第 2 卷（Дифференциальное исчисление с более общей точки зрения）。先在 $\R^n$ 中、再在赋范空间之间讲微分，正是本章的路线；例子与几何解释都很丰富。
- Б. П. Демидович,《Сборник задач и упражнений по математическому анализу》（Частные производные и дифференциалы, экстремумы функций нескольких переменных）。习题按难度排列，适合练偏导数、隐式求导与极值的计算。
- Г. М. Фихтенгольц,《Курс дифференциального и интегрального исчисления》，第 1 卷（Функции нескольких переменных）。经典的坐标式讲法，对可微性条件、混合偏导数与极值的讨论非常细致。
- H. Cartan,《Calcul différentiel》（Hermann）。法国的经典教材：Banach 空间中的微分、有限增量定理、高阶微分与 Taylor 公式，本章的写法（微分是线性映射）来源于此。
- F. Rouvière,《Petit guide de calcul différentiel à l'usage de la licence et de l'agrégation》（Cassini）。以「问题—方法—例子」组织，Monge 记号、极值与 Poincaré 引理都有大量练习。
- W. Rudin,《Principles of Mathematical Analysis》（Functions of Several Variables）。简洁严格的英文参考，含有限增量不等式与 $\Cc^1$ 判别法的证明。
:::

::: glossary
| 中文 | Français | English | Русский |
|---|---|---|---|
| 可微 | différentiable | differentiable | дифференцируемый |
| 微分 | différentielle (f.) | differential | дифференциал |
| 方向导数 | dérivée directionnelle (f.), dérivée selon un vecteur (f.) | directional derivative | производная по направлению |
| 偏导数 | dérivée partielle (f.) | partial derivative | частная производная |
| Jacobi 矩阵 | matrice jacobienne (f.) | Jacobian matrix | матрица Якоби |
| Jacobi 行列式 | jacobien (m.) | Jacobian (determinant) | якобиан |
| 梯度 | gradient (m.) | gradient | градиент |
| 等值线、等值面 | ligne de niveau (f.), surface de niveau (f.) | level curve, level surface | линия уровня, поверхность уровня |
| 链式法则 | règle de la chaîne (f.), différentielle d'une composée (f.) | chain rule | правило дифференцирования сложной функции |
| 双线性映射 | application bilinéaire (f.) | bilinear map | билинейное отображение |
| 算子范数 | norme subordonnée (f.) | operator norm | норма оператора |
| Neumann 级数 | série de Neumann (f.) | Neumann series | ряд Неймана |
| 代数余子式 | cofacteur (m.) | cofactor | алгебраическое дополнение |
| C¹ 映射 | application de classe C¹ (f.) | continuously differentiable map | непрерывно дифференцируемое отображение |
| 有限增量不等式 | inégalité des accroissements finis (f.) | mean value inequality | неравенство о конечных приращениях |
| 中值定理 | théorème des accroissements finis (m.) | mean value theorem | теорема Лагранжа о среднем |
| Lipschitz 映射 | application lipschitzienne (f.) | Lipschitz map | липшицево отображение |
| 凸集 | partie convexe (f.) | convex set | выпуклое множество |
| 道路连通 | connexe par arcs | path-connected | линейно связный |
| 混合偏导数 | dérivée partielle croisée (f.) | mixed partial derivative | смешанная производная |
| Schwarz 定理 | théorème de Schwarz (m.) | Schwarz's (Clairaut's) theorem | теорема Шварца |
| Hessian 矩阵 | matrice hessienne (f.) | Hessian matrix | матрица Гессе, гессиан |
| Taylor–Young 公式 | formule de Taylor–Young (f.) | Taylor's formula with Peano remainder | формула Тейлора с остаточным членом в форме Пеано |
| 局部极值 | extremum local (m.) | local extremum | локальный экстремум |
| 全局极值 | extremum global (m.) | global extremum | глобальный экстремум |
| 临界点 | point critique (m.) | critical point | критическая (стационарная) точка |
| 鞍点 | point col (m.), point selle (m.) | saddle point | седловая точка |
| 正定 | défini positif | positive definite | положительно определённый |
| 半正定 | positif | positive semidefinite | неотрицательно определённый |
| 凸函数 | fonction convexe (f.) | convex function | выпуклая функция |
| 齐次函数 | fonction homogène (f.) | homogeneous function | однородная функция |
| 向量场 | champ de vecteurs (m.) | vector field | векторное поле |
| 梯度场、势函数 | champ de gradient (m.), potentiel (m.) | gradient field, potential | потенциальное поле, потенциал |
| 散度 | divergence (f.) | divergence | дивергенция |
| 旋度 | rotationnel (m.) | curl | ротор, вихрь |
| Laplace 算子 | laplacien (m.) | Laplacian | оператор Лапласа, лапласиан |
| 调和函数 | fonction harmonique (f.) | harmonic function | гармоническая функция |
| 星形集 | partie étoilée (f.) | star-shaped set | звёздное множество |
| Poincaré 引理 | théorème de Poincaré (m.) | Poincaré lemma | лемма Пуанкаре |
| Gâteaux 可微 | différentiable au sens de Gâteaux | Gâteaux differentiable | дифференцируемый по Гато |
| 取极限 | passer à la limite | pass to the limit | перейти к пределу |
| 限制到直线上 | se restreindre à une droite | restrict to a line | ограничить на прямую |
:::
