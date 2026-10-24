一元函数中，$f'(a) \ne 0$ 意味着 $f$ 在 $a$ 附近可逆。本章的两个定理把这个事实推广到多元情形：**局部逆定理**说「微分可逆 ⇒ 局部可逆」，**隐函数定理**说「方程 $g(x, y) = 0$ 在适当条件下可以局部解出 $y = \varphi(x)$」。它们是微分几何（子流形）和最优化（Lagrange 乘子）的基础。法国 MP 2021 大纲只要求最优化部分，局部逆与隐函数定理属于 licence L2/L3 的标准内容。全章 $U \subset \R^n$ 是开集，所有映射至少是 $\Cc^1$ 的。

本章大量使用第 9 章的工具：链式法则 {@chain-rule}、$\Cc^1$ 判别法 {@c1-partielles}、有限增量不等式 {@accroissements-finis}、$\Cc^k$ 函数的运算 {@c9-ck-operations}、求逆映射的光滑性 {@c9-inv-cinfini} 与 Neumann 级数 {@c9-neumann}；以及第 1 章的 Banach 不动点定理 {@point-fixe}。$\M_n(\R)$ 上总取算子范数。

## 局部逆定理

问题：$f : U \subset \R^n \to \R^n$，什么时候能在 $a$ 附近「解出」$f(x) = y$，并且解 $x$ 光滑地依赖于 $y$？线性情形（$f = $ 矩阵）答案是「矩阵可逆」。局部逆定理说：非线性情形只需看线性近似 $\dd f(a)$。

::: def id=def-diffeo zh="$\Cc^k$ 微分同胚" en="$C^k$-diffeomorphism" fr="$\mathcal{C}^k$-difféomorphisme" ru="$C^k$-диффеоморфизм"
设 $U, V$ 是 $\R^n$ 的开集，$k \in \N^* \cup \{\infty\}$。$f : U \to V$ 是 **$\Cc^k$ 微分同胚**，如果
$$f \text{ 是双射},\qquad f \in \Cc^k(U, \R^n),\qquad f^{-1} \in \Cc^k(V, \R^n).$$
若 $a$ 有开邻域 $V_a \subset U$，使 $f(V_a)$ 是开集且 $f : V_a \to f(V_a)$ 是 $\Cc^k$ 微分同胚，称 $f$ 在 $a$ 处是**局部 $\Cc^k$ 微分同胚**。
:::

::: fr
Soient $U, V$ deux ouverts de $\R^n$ et $k \in \N^* \cup \{\infty\}$. On dit que $f : U \to V$ est un **$\mathcal{C}^k$-difféomorphisme** si
$$f \text{ est bijective},\qquad f \in \mathcal{C}^k(U, \R^n),\qquad f^{-1} \in \mathcal{C}^k(V, \R^n).$$
Si $a$ admet un voisinage ouvert $V_a \subset U$ tel que $f(V_a)$ soit ouvert et que $f : V_a \to f(V_a)$ soit un $\mathcal{C}^k$-difféomorphisme, on dit que $f$ est un **$\mathcal{C}^k$-difféomorphisme local** en $a$.
:::

白话：微分同胚是「光滑的坐标变换」：正向和反向都光滑。

::: ex id=c10-ex-diffeo lvl=1
1. 仿射映射 $x \mapsto Ax + b$（$A \in \GL_n(\R)$）是 $\R^n$ 到自身的 $\Cc^\infty$ 微分同胚，逆为 $y \mapsto A^{-1}(y - b)$。
2. $\exp : \R \to \,]0, +\infty[$ 是 $\Cc^\infty$ 微分同胚，逆为 $\ln$。
3. 极坐标 $\Phi(r, \theta) = (r\cos\theta, r\sin\theta)$ 是 $]0, +\infty[ \times ]-\pi, \pi[$ 到 $\R^2 \setminus (\R_- \times \{0\})$ 的 $\Cc^\infty$ 微分同胚（{@polaires}）。
4. 两个 $\Cc^k$ 微分同胚的复合是 $\Cc^k$ 微分同胚：复合映射与它的逆 $(g \circ f)^{-1} = f^{-1} \circ g^{-1}$ 都是 $\Cc^k$ 映射的复合（{@c9-ck-operations}）。
:::

::: prop id=c10-diffeo-diff zh="微分同胚的微分可逆" en="The differential of a diffeomorphism is invertible" fr="La différentielle d'un difféomorphisme est inversible" ru="Дифференциал диффеоморфизма обратим" lvl=1
若 $f : U \to V$ 是 $\Cc^1$ 微分同胚，则对每个 $a \in U$，$\dd f(a)$ 可逆，且
$$\dd(f^{-1})(f(a)) = \dd f(a)^{-1},\qquad J_{f^{-1}}(f(a)) = J_f(a)^{-1}.$$
:::

::: fr
Si $f : U \to V$ est un $\mathcal{C}^1$-difféomorphisme, alors pour tout $a \in U$, $\dd f(a)$ est inversible et
$$\dd(f^{-1})(f(a)) = \dd f(a)^{-1},\qquad J_{f^{-1}}(f(a)) = J_f(a)^{-1}.$$
:::

::: proof
▷ 思路：对恒等式 $f^{-1} \circ f = \Id_U$ 与 $f \circ f^{-1} = \Id_V$ 用链式法则。

**第 1 步**　$f$ 在 $a$ 可微，$f^{-1}$ 在 $f(a)$ 可微。由链式法则 {@chain-rule}，对 $f^{-1} \circ f = \Id_U$ 在 $a$ 求微分：$\dd(f^{-1})(f(a)) \circ \dd f(a) = \Id$（恒等映射的微分是它自己，{@diff-bilineaire}）。

**第 2 步**　对 $f \circ f^{-1} = \Id_V$ 在 $f(a)$ 求微分：$\dd f(a) \circ \dd(f^{-1})(f(a)) = \Id$。

由两步，$\dd f(a)$ 可逆，逆为 $\dd(f^{-1})(f(a))$；矩阵形式由 {@c9-jacobienne} 得到。
:::

::: fr
▷ Méthode : on applique la règle de la chaîne aux identités $f^{-1} \circ f = \Id_U$ et $f \circ f^{-1} = \Id_V$.

**Étape 1**　$f$ est différentiable en $a$ et $f^{-1}$ en $f(a)$. D'après la règle de la chaîne {@fr:chain-rule} appliquée à $f^{-1} \circ f = \Id_U$ en $a$ : $\dd(f^{-1})(f(a)) \circ \dd f(a) = \Id$ (la différentielle de l'identité est l'identité, {@fr:diff-bilineaire}).

**Étape 2**　Appliquée à $f \circ f^{-1} = \Id_V$ en $f(a)$ : $\dd f(a) \circ \dd(f^{-1})(f(a)) = \Id$.

Par les deux étapes, $\dd f(a)$ est inversible, d'inverse $\dd(f^{-1})(f(a))$ ; la forme matricielle découle de {@fr:c9-jacobienne}.
:::

::: cex lvl=1
**$\Cc^\infty$ 双射未必是微分同胚。** $f(x) = x^3$ 是 $\R$ 上的 $\Cc^\infty$ 双射，逆映射 $x \mapsto x^{1/3}$ 连续，但在 $0$ 处不可导（$\frac{t^{1/3}}{t} = t^{-2/3} \to +\infty$）。与 {@c10-diffeo-diff} 对照：$\dd f(0) = 0$ 不可逆，所以 $f$ 不可能是 $0$ 附近的微分同胚。
:::

::: thm id=inversion-locale zh="局部逆定理" en="Inverse function theorem" fr="Théorème d'inversion locale" ru="Теорема об обратном отображении" lvl=1
设 $f : U \to \R^n$ 是 $\Cc^k$ 的（$k \ge 1$），$a \in U$，$\dd f(a)$ 可逆。则存在 $a$ 的开邻域 $V \subset U$ 和 $f(a)$ 的开邻域 $W$，使 $f|_V$ 是从 $V$ 到 $W$ 的 $\Cc^k$ 微分同胚；并且对 $y \in W$，$\dd(f|_V)^{-1}(y) = \dd f\big((f|_V)^{-1}(y)\big)^{-1}$。
:::

::: fr
Soit $f : U \to \R^n$ de classe $\mathcal{C}^k$ ($k \ge 1$), $a \in U$, avec $\dd f(a)$ inversible. Alors il existe un voisinage ouvert $V \subset U$ de $a$ et un voisinage ouvert $W$ de $f(a)$ tels que $f|_V$ soit un $\mathcal{C}^k$-difféomorphisme de $V$ sur $W$ ; de plus, pour $y \in W$, $\dd(f|_V)^{-1}(y) = \dd f\big((f|_V)^{-1}(y)\big)^{-1}$.
:::

::: proof
▷ 思路：先化简到 $a = 0$、$f(0) = 0$、$\dd f(0) = \Id$，此时 $f$ 是「恒等映射加一个小扰动」：$f(x) = x - g(x)$，$g$ 在 $0$ 附近的 Lipschitz 常数 $\le \frac12$。方程 $f(x) = y$ 改写成不动点问题 $x = y + g(x)$，用 Banach 不动点定理求解（得到双射）；再证逆映射 Lipschitz、可微，最后用 $J_{f^{-1}} = \operatorname{inv} \circ J_f \circ f^{-1}$ 归纳得到 $\Cc^k$ 正则性。全程用 $\R^n$ 上的一个范数及 $\M_n(\R)$ 上的相应算子范数。

**第 0 步（化简）**　令 $A = \dd f(a) \in \GL_n(\R)$，$\tilde U = \{x : a + x \in U\}$（开集，含 $0$），$\tilde f(x) = A^{-1}\big(f(a + x) - f(a)\big)$。$\tilde f$ 是 $\Cc^k$ 映射与仿射映射的复合，是 $\Cc^k$ 的（{@c9-ck-operations}），$\tilde f(0) = 0$，由链式法则 $\dd\tilde f(0) = A^{-1}\dd f(a) = \Id$。若对 $\tilde f$ 找到了 $\tilde V \ni 0$、$\tilde W \ni 0$，则 $V = a + \tilde V$，$W = f(a) + A(\tilde W)$ 对 $f$ 成立：$f(x) = f(a) + A\tilde f(x - a)$ 是三个微分同胚 $x \mapsto x - a$、$\tilde f|_{\tilde V}$、$z \mapsto f(a) + Az$ 的复合（{@c10-ex-diffeo}），$W$ 是开集 $\tilde W$ 在连续映射 $w \mapsto A^{-1}(w - f(a))$ 下的原像，是开集。所以下面设 $a = 0$，$f(0) = 0$，$\dd f(0) = \Id$。

**第 1 步（选取 $r$）**　令 $g(x) = x - f(x)$，则 $g$ 是 $\Cc^k$ 的，$g(0) = 0$，$\dd g(x) = \Id - \dd f(x)$，$\dd g(0) = 0$。由 $\dd f$ 在 $0$ 连续，存在 $r > 0$，使
$$\overline B(0, r) \subset U,\qquad \norm{\Id - \dd f(x)} \le \tfrac12\quad\text{对一切 } \norm x \le r.$$
由此得到两个结论：

- (i) 对 $\norm x \le r$，$\dd f(x) = \Id + K$，$K = \dd f(x) - \Id$，$\norm K \le \frac12 < 1$，由 {@c9-neumann}，$\dd f(x)$ 可逆。
- (ii) 对 $x_1, x_2 \in \overline B(0, r)$，线段 $[x_1, x_2] \subset \overline B(0, r) \subset U$（球是凸的），其上 $\norm{\dd g} \le \frac12$，由 {@accroissements-finis}，$\norm{g(x_1) - g(x_2)} \le \frac12\norm{x_1 - x_2}$。

**第 2 步（关键不等式）**　对 $x_1, x_2 \in \overline B(0, r)$，由 $x = f(x) + g(x)$ 与 (ii)：
$$\norm{x_1 - x_2} \le \norm{f(x_1) - f(x_2)} + \norm{g(x_1) - g(x_2)} \le \norm{f(x_1) - f(x_2)} + \tfrac12\norm{x_1 - x_2},$$
所以
$$\norm{x_1 - x_2} \le 2\,\norm{f(x_1) - f(x_2)}.$$
特别地，$f$ 在 $\overline B(0, r)$ 上是单射。

**第 3 步（解方程 $f(x) = y$）**　设 $\norm y < \frac r2$。令 $T_y(x) = y + g(x)$，则 $T_y(x) = x \iff f(x) = y$。

- $T_y$ 把 $\overline B(0, r)$ 映入 $B(0, r)$：对 $\norm x \le r$，$\norm{T_y(x)} \le \norm y + \norm{g(x) - g(0)} \le \norm y + \frac12\norm x < \frac r2 + \frac r2 = r$。
- $T_y$ 是 $\frac12$-压缩的：$\norm{T_y(x_1) - T_y(x_2)} = \norm{g(x_1) - g(x_2)} \le \frac12\norm{x_1 - x_2}$。
- $\overline B(0, r)$ 是完备空间 $\R^n$（{@dimfinie-complet}）的非空闭子集。

由 Banach 不动点定理 {@point-fixe}，存在唯一的 $x_y \in \overline B(0, r)$ 使 $f(x_y) = y$，且 $\norm{x_y} = \norm{T_y(x_y)} < r$。

**第 4 步（取 $V$、$W$）**　令
$$W = B(0, \tfrac r2),\qquad V = B(0, r) \cap f^{-1}(W).$$
$W$ 是开集；$f$ 在开集 $U$ 上连续，$f^{-1}(W)$ 是开集（{@cont-ouverts}），所以 $V$ 是开集，且 $0 \in V$（$f(0) = 0 \in W$）。由定义 $f(V) \subset W$。$f|_V$ 是单射（第 2 步）。$f|_V$ 是满射：对 $y \in W$，第 3 步给出 $x_y \in B(0, r)$，$f(x_y) = y \in W$，所以 $x_y \in V$。记 $\varphi = (f|_V)^{-1} : W \to V$。

**第 5 步（$\varphi$ 是 $2$-Lipschitz 的）**　对 $y_1, y_2 \in W$，$x_i = \varphi(y_i) \in V \subset \overline B(0, r)$，由第 2 步，$\norm{\varphi(y_1) - \varphi(y_2)} \le 2\norm{y_1 - y_2}$。特别地 $\varphi$ 连续。

**第 6 步（$\varphi$ 可微）**　固定 $y \in W$，令 $x = \varphi(y)$，$L = \dd f(x)$（由第 1 步 (i) 可逆）。由 $f$ 在 $x$ 可微，存在 $\rho > 0$ 和 $\eps : B(0, \rho) \to \R^n$，$\eps(0) = 0$，$\eps(h) \to 0$，使 $f(x + h) = f(x) + Lh + \norm h\,\eps(h)$（$\norm h < \rho$）。对 $k$ 满足 $y + k \in W$ 且 $\norm k < \rho/2$，令 $h(k) = \varphi(y + k) - x$。由第 5 步 $\norm{h(k)} \le 2\norm k < \rho$，且 $f(x + h(k)) = y + k$，所以
$$k = L\,h(k) + \norm{h(k)}\,\eps(h(k)),\qquad\text{即}\qquad \varphi(y + k) - \varphi(y) - L^{-1}k = -\norm{h(k)}\,L^{-1}\eps(h(k)).$$
对 $k \ne 0$ 令 $\eps'(k) = -\frac{\norm{h(k)}}{\norm k}L^{-1}\eps(h(k))$，则
$$\norm{\eps'(k)} \le 2\,\norm{L^{-1}}\,\norm{\eps(h(k))}.$$
当 $k \to 0$ 时 $\norm{h(k)} \le 2\norm k \to 0$，而 $\eps$ 在 $0$ 连续且 $\eps(0) = 0$，所以 $\eps(h(k)) \to 0$（与 {@chain-rule} 第 5 步相同的论证），$\eps'(k) \to 0$。因此 $\varphi$ 在 $y$ 可微，$\dd\varphi(y) = L^{-1} = \dd f(\varphi(y))^{-1}$。

**第 7 步（$\Cc^k$ 正则性）**　由第 6 步，对 $y \in W$，
$$J_\varphi(y) = \operatorname{inv}\big(J_f(\varphi(y))\big).$$
对 $j$ 归纳证明 $\varphi \in \Cc^j$（$1 \le j \le k$；$k = \infty$ 时对一切有限 $j$）。

- **初始化 $j = 1$**：$\varphi$ 连续（第 5 步），$J_f$ 的元素 $\partial_lf_i$ 连续（$f \in \Cc^1$），$\operatorname{inv}$ 在 $\GL_n(\R)$ 上连续（{@c9-inv-cinfini}），所以 $J_\varphi$ 的元素即 $\varphi$ 的偏导数连续，由 {@c1-partielles}，$\varphi \in \Cc^1$。
- **递推**：设 $j < k$ 且 $\varphi \in \Cc^j$。$J_f$ 的元素是 $\Cc^k$ 函数的一阶偏导数，属于 $\Cc^{k-1} \subset \Cc^j$；$\operatorname{inv}$ 是 $\Cc^\infty$ 的。由 {@c9-ck-operations}（复合），$y \mapsto \operatorname{inv}(J_f(\varphi(y)))$ 是 $\Cc^j$ 的，即 $\varphi$ 的所有偏导数是 $\Cc^j$ 的，所以 $\varphi \in \Cc^{j+1}$。

所以 $\varphi = (f|_V)^{-1}$ 是 $\Cc^k$ 的。$f|_V$ 是 $\Cc^k$ 的双射，逆也是 $\Cc^k$ 的：$f|_V : V \to W$ 是 $\Cc^k$ 微分同胚。
:::

::: fr
▷ Méthode : on se ramène à $a = 0$, $f(0) = 0$, $\dd f(0) = \Id$ ; $f$ est alors « l'identité plus une petite perturbation » : $f(x) = x - g(x)$, où $g$ est $\frac12$-lipschitzienne près de $0$. On réécrit l'équation $f(x) = y$ comme un problème de point fixe $x = y + g(x)$, que l'on résout par le théorème du point fixe de Banach (d'où la bijectivité) ; on montre ensuite que l'inverse est lipschitzienne puis différentiable, et l'on obtient la régularité $\mathcal{C}^k$ par récurrence à partir de $J_{f^{-1}} = \operatorname{inv} \circ J_f \circ f^{-1}$. On fixe une norme sur $\R^n$ et la norme subordonnée sur $\M_n(\R)$.

**Étape 0 (réduction)**　Posons $A = \dd f(a) \in \GL_n(\R)$, $\tilde U = \{x : a + x \in U\}$ (ouvert contenant $0$) et $\tilde f(x) = A^{-1}\big(f(a + x) - f(a)\big)$. $\tilde f$ est la composée d'applications affines et d'une application de classe $\mathcal{C}^k$, donc est de classe $\mathcal{C}^k$ ({@fr:c9-ck-operations}), $\tilde f(0) = 0$ et, par la règle de la chaîne, $\dd\tilde f(0) = A^{-1}\dd f(a) = \Id$. Si l'on a trouvé $\tilde V \ni 0$ et $\tilde W \ni 0$ convenables pour $\tilde f$, alors $V = a + \tilde V$ et $W = f(a) + A(\tilde W)$ conviennent pour $f$ : $f(x) = f(a) + A\tilde f(x - a)$ est la composée des trois difféomorphismes $x \mapsto x - a$, $\tilde f|_{\tilde V}$ et $z \mapsto f(a) + Az$ ({@fr:c10-ex-diffeo}), et $W$ est l'image réciproque de l'ouvert $\tilde W$ par l'application continue $w \mapsto A^{-1}(w - f(a))$, donc un ouvert. On suppose désormais $a = 0$, $f(0) = 0$, $\dd f(0) = \Id$.

**Étape 1 (choix de $r$)**　Posons $g(x) = x - f(x)$ ; $g$ est de classe $\mathcal{C}^k$, $g(0) = 0$, $\dd g(x) = \Id - \dd f(x)$ et $\dd g(0) = 0$. Par continuité de $\dd f$ en $0$, il existe $r > 0$ tel que
$$\overline B(0, r) \subset U,\qquad \norm{\Id - \dd f(x)} \le \tfrac12\quad\text{pour tout } \norm x \le r.$$
On en déduit deux faits :

- (i) pour $\norm x \le r$, $\dd f(x) = \Id + K$ avec $K = \dd f(x) - \Id$, $\norm K \le \frac12 < 1$ ; d'après {@fr:c9-neumann}, $\dd f(x)$ est inversible ;
- (ii) pour $x_1, x_2 \in \overline B(0, r)$, le segment $[x_1, x_2]$ est contenu dans $\overline B(0, r) \subset U$ (la boule est convexe) et $\norm{\dd g} \le \frac12$ sur ce segment ; d'après {@fr:accroissements-finis}, $\norm{g(x_1) - g(x_2)} \le \frac12\norm{x_1 - x_2}$.

**Étape 2 (inégalité clé)**　Pour $x_1, x_2 \in \overline B(0, r)$, comme $x = f(x) + g(x)$, (ii) donne
$$\norm{x_1 - x_2} \le \norm{f(x_1) - f(x_2)} + \norm{g(x_1) - g(x_2)} \le \norm{f(x_1) - f(x_2)} + \tfrac12\norm{x_1 - x_2},$$
donc
$$\norm{x_1 - x_2} \le 2\,\norm{f(x_1) - f(x_2)}.$$
En particulier, $f$ est injective sur $\overline B(0, r)$.

**Étape 3 (résolution de $f(x) = y$)**　Soit $\norm y < \frac r2$. Posons $T_y(x) = y + g(x)$, de sorte que $T_y(x) = x \iff f(x) = y$.

- $T_y$ envoie $\overline B(0, r)$ dans $B(0, r)$ : pour $\norm x \le r$, $\norm{T_y(x)} \le \norm y + \norm{g(x) - g(0)} \le \norm y + \frac12\norm x < \frac r2 + \frac r2 = r$.
- $T_y$ est $\frac12$-contractante : $\norm{T_y(x_1) - T_y(x_2)} = \norm{g(x_1) - g(x_2)} \le \frac12\norm{x_1 - x_2}$.
- $\overline B(0, r)$ est une partie fermée non vide de l'espace complet $\R^n$ ({@fr:dimfinie-complet}).

D'après le théorème du point fixe de Banach {@fr:point-fixe}, il existe un unique $x_y \in \overline B(0, r)$ tel que $f(x_y) = y$, et $\norm{x_y} = \norm{T_y(x_y)} < r$.

**Étape 4 (choix de $V$ et $W$)**　Posons
$$W = B(0, \tfrac r2),\qquad V = B(0, r) \cap f^{-1}(W).$$
$W$ est ouvert ; $f$ est continue sur l'ouvert $U$, donc $f^{-1}(W)$ est ouvert ({@fr:cont-ouverts}) ; ainsi $V$ est ouvert et $0 \in V$ (car $f(0) = 0 \in W$). Par définition $f(V) \subset W$. $f|_V$ est injective (étape 2). $f|_V$ est surjective sur $W$ : pour $y \in W$, l'étape 3 fournit $x_y \in B(0, r)$ avec $f(x_y) = y \in W$, donc $x_y \in V$. Notons $\varphi = (f|_V)^{-1} : W \to V$.

**Étape 5 ($\varphi$ est $2$-lipschitzienne)**　Pour $y_1, y_2 \in W$, les points $x_i = \varphi(y_i)$ sont dans $V \subset \overline B(0, r)$ ; d'après l'étape 2, $\norm{\varphi(y_1) - \varphi(y_2)} \le 2\norm{y_1 - y_2}$. En particulier $\varphi$ est continue.

**Étape 6 ($\varphi$ est différentiable)**　Fixons $y \in W$, posons $x = \varphi(y)$ et $L = \dd f(x)$ (inversible d'après (i)). Comme $f$ est différentiable en $x$, il existe $\rho > 0$ et $\eps : B(0, \rho) \to \R^n$, $\eps(0) = 0$, $\eps(h) \to 0$, tels que $f(x + h) = f(x) + Lh + \norm h\,\eps(h)$ ($\norm h < \rho$). Pour $k$ tel que $y + k \in W$ et $\norm k < \rho/2$, posons $h(k) = \varphi(y + k) - x$. D'après l'étape 5, $\norm{h(k)} \le 2\norm k < \rho$, et $f(x + h(k)) = y + k$, donc
$$k = L\,h(k) + \norm{h(k)}\,\eps(h(k)),\qquad\text{soit}\qquad \varphi(y + k) - \varphi(y) - L^{-1}k = -\norm{h(k)}\,L^{-1}\eps(h(k)).$$
Pour $k \ne 0$, posons $\eps'(k) = -\frac{\norm{h(k)}}{\norm k}L^{-1}\eps(h(k))$ ; alors
$$\norm{\eps'(k)} \le 2\,\norm{L^{-1}}\,\norm{\eps(h(k))}.$$
Quand $k \to 0$, $\norm{h(k)} \le 2\norm k \to 0$, et comme $\eps$ est continue en $0$ avec $\eps(0) = 0$, $\eps(h(k)) \to 0$ (même argument qu'à l'étape 5 de {@fr:chain-rule}) ; donc $\eps'(k) \to 0$. Ainsi $\varphi$ est différentiable en $y$ et $\dd\varphi(y) = L^{-1} = \dd f(\varphi(y))^{-1}$.

**Étape 7 (régularité $\mathcal{C}^k$)**　D'après l'étape 6, pour $y \in W$,
$$J_\varphi(y) = \operatorname{inv}\big(J_f(\varphi(y))\big).$$
Montrons par récurrence sur $j$ que $\varphi \in \mathcal{C}^j$ ($1 \le j \le k$ ; si $k = \infty$, pour tout $j$ fini).

- **Initialisation ($j = 1$)** : $\varphi$ est continue (étape 5), les coefficients $\partial_lf_i$ de $J_f$ sont continus ($f \in \mathcal{C}^1$) et $\operatorname{inv}$ est continue sur $\GL_n(\R)$ ({@fr:c9-inv-cinfini}) ; les coefficients de $J_\varphi$, c'est-à-dire les dérivées partielles de $\varphi$, sont donc continus, et $\varphi \in \mathcal{C}^1$ d'après {@fr:c1-partielles}.
- **Hérédité** : soit $j < k$ avec $\varphi \in \mathcal{C}^j$. Les coefficients de $J_f$ sont des dérivées partielles premières d'une fonction de classe $\mathcal{C}^k$, donc de classe $\mathcal{C}^{k-1} \subset \mathcal{C}^j$ ; $\operatorname{inv}$ est de classe $\mathcal{C}^\infty$. D'après {@fr:c9-ck-operations} (composition), $y \mapsto \operatorname{inv}(J_f(\varphi(y)))$ est de classe $\mathcal{C}^j$ : toutes les dérivées partielles de $\varphi$ sont de classe $\mathcal{C}^j$, donc $\varphi \in \mathcal{C}^{j+1}$.

Ainsi $\varphi = (f|_V)^{-1}$ est de classe $\mathcal{C}^k$. Comme $f|_V$ est une bijection de classe $\mathcal{C}^k$ d'inverse de classe $\mathcal{C}^k$, $f|_V : V \to W$ est un $\mathcal{C}^k$-difféomorphisme.
:::

::: rem
**关于条件与结论。**

1. **常数都是显式的**：在化简后的坐标里，$r$ 由「$\norm{\Id - \dd f(x)} \le \frac12$ 对 $\norm x \le r$」决定，$W$ 是半径 $\frac r2$ 的球，逆映射是 $2$-Lipschitz 的。$\frac12$ 换成任何 $q \in \,]0, 1[$ 都可以，此时 $W = B(0, (1 - q)r)$，Lipschitz 常数为 $\frac1{1 - q}$。
2. **「$\Cc^1$」不能减弱为「处处可微」。** $f(x) = x + 2x^2\sin\frac1x$，$f(0) = 0$：$f$ 在 $\R$ 上处处可微，$f'(0) = 1 \ne 0$，但 $f'(x) = 1 + 4x\sin\frac1x - 2\cos\frac1x$ 在 $x_m = \frac1{2\pi m}$ 处等于 $-1$，在 $x_m' = \frac1{(2m+1)\pi}$ 处等于 $3$。所以在 $0$ 的任何邻域里 $f'$ 都变号，$f$ 不单调；连续函数在区间上单射当且仅当严格单调，所以 $f$ 在 $0$ 的任何邻域上都不是单射。证明中用到 $\dd f$ 的连续性的地方正是第 1 步。
3. **结论只是局部的**：$\dd f$ 处处可逆也不保证 $f$ 是单射，见 {@polaires} 与下面的「想一想」。
4. **逆命题**：若 $f$ 在 $a$ 附近是 $\Cc^1$ 微分同胚，则 $\dd f(a)$ 可逆（{@c10-diffeo-diff}）；但 $f$ 可以是同胚而 $\dd f(a)$ 不可逆（$x^3$）。
:::

::: q
$f(x, y) = (x^2 - y^2, 2xy)$（即复变量 $z \mapsto z^2$）在哪些点是局部 $\Cc^\infty$ 微分同胚？它在 $\R^2 \setminus \{0\}$ 上是单射吗？
:::

::: ans
$J_f = \begin{pmatrix}2x & -2y\\ 2y & 2x\end{pmatrix}$，$\det J_f = 4(x^2 + y^2)$。由 {@inversion-locale}，$f$ 在每个 $(x, y) \ne 0$ 处是局部 $\Cc^\infty$ 微分同胚。但 $f(-x, -y) = f(x, y)$，所以 $f$ 在 $\R^2 \setminus \{0\}$ 上不是单射（每个非零值恰有两个原像）。在原点，$f$ 在任何邻域上都不是单射（同样因为 $f(-p) = f(p)$），与 $\dd f(0) = 0$ 一致。
:::

::: cor id=inversion-globale zh="整体逆定理" en="Global inverse function theorem" fr="Théorème d'inversion globale" ru="Глобальная теорема об обратном отображении" lvl=1
若 $f : U \to \R^n$ 是 $\Cc^k$ 的**单射**（$k \ge 1$），且 $\dd f(x)$ 对一切 $x \in U$ 可逆，则 $f(U)$ 是开集，$f$ 是从 $U$ 到 $f(U)$ 的 $\Cc^k$ 微分同胚。
:::

::: fr
Si $f : U \to \R^n$ est **injective** et de classe $\mathcal{C}^k$ ($k \ge 1$), et si $\dd f(x)$ est inversible pour tout $x \in U$, alors $f(U)$ est ouvert et $f$ est un $\mathcal{C}^k$-difféomorphisme de $U$ sur $f(U)$.
:::

::: proof
▷ 思路：局部逆定理在每一点给出局部的开像与局部的光滑逆；单射保证这些局部逆都是同一个整体逆 $f^{-1}$ 的限制。

**第 1 步（$f(U)$ 开）**　设 $b \in f(U)$，$b = f(a)$。由 {@inversion-locale}，存在开集 $V_a \ni a$、$W_a \ni b$，$V_a \subset U$，$f(V_a) = W_a$。所以 $W_a \subset f(U)$ 是 $b$ 的开邻域。$b$ 任意，$f(U)$ 是开集。

**第 2 步（双射）**　$f$ 是单射，$f : U \to f(U)$ 是双射，记逆为 $f^{-1}$。

**第 3 步（$f^{-1}$ 是 $\Cc^k$ 的）**　沿用第 1 步的记号。对 $y \in W_a$，$(f|_{V_a})^{-1}(y)$ 是 $V_a$ 中满足 $f(x) = y$ 的唯一点；由 $f$ 在 $U$ 上单射，它也是 $U$ 中满足 $f(x) = y$ 的唯一点，即 $f^{-1}(y)$。所以 $f^{-1}|_{W_a} = (f|_{V_a})^{-1}$ 是 $\Cc^k$ 的。$\Cc^k$ 是局部性质（偏导数的存在与连续性只依赖于每点的邻域），每个 $b \in f(U)$ 都有这样的邻域 $W_a$，所以 $f^{-1}$ 在 $f(U)$ 上是 $\Cc^k$ 的。
:::

::: fr
▷ Méthode : le théorème d'inversion locale fournit, en chaque point, une image ouverte locale et un inverse local régulier ; l'injectivité garantit que ces inverses locaux sont tous des restrictions d'un même inverse global $f^{-1}$.

**Étape 1 ($f(U)$ est ouvert)**　Soit $b \in f(U)$, $b = f(a)$. D'après {@fr:inversion-locale}, il existe des ouverts $V_a \ni a$ et $W_a \ni b$, avec $V_a \subset U$ et $f(V_a) = W_a$. Ainsi $W_a \subset f(U)$ est un voisinage ouvert de $b$. Comme $b$ est arbitraire, $f(U)$ est ouvert.

**Étape 2 (bijection)**　$f$ étant injective, $f : U \to f(U)$ est bijective ; notons $f^{-1}$ sa réciproque.

**Étape 3 ($f^{-1}$ est de classe $\mathcal{C}^k$)**　Avec les notations de l'étape 1 : pour $y \in W_a$, $(f|_{V_a})^{-1}(y)$ est l'unique point de $V_a$ tel que $f(x) = y$ ; par injectivité de $f$ sur $U$, c'est aussi l'unique point de $U$ tel que $f(x) = y$, c'est-à-dire $f^{-1}(y)$. Donc $f^{-1}|_{W_a} = (f|_{V_a})^{-1}$ est de classe $\mathcal{C}^k$. La classe $\mathcal{C}^k$ est une propriété locale (existence et continuité des dérivées partielles ne dépendent que d'un voisinage de chaque point), et tout $b \in f(U)$ admet un tel voisinage $W_a$ ; donc $f^{-1}$ est de classe $\mathcal{C}^k$ sur $f(U)$.
:::

::: rem
**两个条件都不能少。** 去掉单射：$z \mapsto z^2$ 在 $\R^2 \setminus \{0\}$ 上（上面的「想一想」）。去掉「$\dd f$ 处处可逆」：$x \mapsto x^3$ 是 $\R$ 上的 $\Cc^\infty$ 单射，$f(\R) = \R$ 是开集，但 $f^{-1}$ 在 $0$ 不可导。
:::

::: ex id=polaires zh="极坐标" lvl=1
$\Phi(r, \theta) = (r\cos\theta, r\sin\theta)$。

1. **光滑与 Jacobi 行列式**：$\Phi$ 是 $\Cc^\infty$ 的（{@c9-ck-operations}），$\det J_\Phi = \cos\theta\cdot r\cos\theta - (-r\sin\theta)\sin\theta = r$。
2. **在 $\Omega = \,]0, +\infty[ \times ]-\pi, \pi[$ 上单射**：若 $\Phi(r, \theta) = \Phi(r', \theta')$，取范数得 $r = r'$，于是 $(\cos\theta, \sin\theta) = (\cos\theta', \sin\theta')$，$\theta - \theta' \in 2\pi\Z \cap \,]-2\pi, 2\pi[ = \{0\}$。
3. **像**：$\Phi(r, \theta) \in \R_- \times \{0\}$ 要求 $\sin\theta = 0$ 且 $\cos\theta \le 0$，即 $\theta = \pm\pi$，不在 $\Omega$ 中；所以 $\Phi(\Omega) \subset D := \R^2 \setminus (\R_- \times \{0\})$。反之，对 $(x, y) \in D$，令 $r = \sqrt{x^2 + y^2} > 0$，$\theta = 2\Arctan\dfrac{y}{x + r} \in \,]-\pi, \pi[$（在 $D$ 上 $x + r > 0$）。记 $\tau = \tan\frac\theta2 = \frac{y}{x + r}$，由 $(x + r)^2 + y^2 = 2r(x + r)$ 与 $(x + r)^2 - y^2 = 2x(x + r)$ 得
   $$\cos\theta = \frac{1 - \tau^2}{1 + \tau^2} = \frac xr,\qquad \sin\theta = \frac{2\tau}{1 + \tau^2} = \frac yr,$$
   即 $\Phi(r, \theta) = (x, y)$。所以 $\Phi(\Omega) = D$。
4. **结论**：$\det J_\Phi = r > 0$ 在 $\Omega$ 上处处非零，由 {@inversion-globale}，$\Phi : \Omega \to D$ 是 $\Cc^\infty$ 微分同胚（这里第 3 步还给出了逆映射的显式公式）。
5. **局部可逆不蕴含整体可逆**：在 $]0, +\infty[ \times \R$ 上 $\Phi$ 处处是局部微分同胚，但 $\Phi(r, \theta + 2\pi) = \Phi(r, \theta)$，不是单射。
:::

::: thm id=hadamard-global zh="Hadamard 整体逆定理" en="Hadamard's global inverse function theorem" fr="Théorème d'inversion globale de Hadamard" ru="Теорема Адамара" lvl=3 ref="Krantz–Parks, *The Implicit Function Theorem*（Birkhäuser）"
若 $f : \R^n \to \R^n$ 是 $\Cc^1$ 的，$\dd f(x)$ 处处可逆，且 $f$ 是**真映射**（紧集的原像是紧集；等价地 $\norm{f(x)} \to \infty$ 当 $\norm x \to \infty$），则 $f$ 是 $\R^n$ 到自身的 $\Cc^1$ 微分同胚。
:::

::: fr
Si $f : \R^n \to \R^n$ est de classe $\mathcal{C}^1$, si $\dd f(x)$ est inversible en tout point et si $f$ est **propre** (l'image réciproque de tout compact est compacte ; de manière équivalente $\norm{f(x)} \to \infty$ quand $\norm x \to \infty$), alors $f$ est un $\mathcal{C}^1$-difféomorphisme de $\R^n$ sur lui-même.
:::

::: rem
**真映射的条件不能去掉。** $f = \Arctan : \R \to \R$，$f' > 0$，单射，但像是 $]-\frac\pi2, \frac\pi2[$，不是满射；$f$ 不是真映射：紧集 $[0, \frac\pi2]$ 的原像是 $[0, +\infty[$，不紧（等价地，$\abs{f(x)} < \frac\pi2$ 不趋于 $\infty$）。复指数 $(x, y) \mapsto (\e^x\cos y, \e^x\sin y)$ 的 Jacobi 行列式 $\e^{2x} > 0$，但它是 $2\pi$ 周期的，不是单射；它也不是真映射（$x \to -\infty$ 时像趋于 $0$）。
:::

::: open zh="Jacobian 猜想"
设 $F : \C^n \to \C^n$ 是多项式映射，$\det J_F$ 是非零常数。$F$ 是否一定有多项式逆映射？由局部逆定理，$F$ 局部可逆；问题在于整体。$n = 1$ 时成立：$F'$ 是非零常数 $c$，所以 $F(z) = cz + d$，逆映射 $w \mapsto (w - d)/c$ 是多项式。$n \ge 2$ 时，这个由 Keller 在 1939 年提出的问题至今未解决，即使 $n = 2$ 也是如此。Smale 把它列入 21 世纪的 18 个数学问题之中。
:::
