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

## 隐函数定理

问题：方程组 $g(x, y) = 0$（$p$ 个方程，未知数 $y \in \R^p$，参数 $x \in \R^n$）在已知解 $(a, b)$ 附近，能否把 $y$ 解成 $x$ 的光滑函数？线性情形 $g(x, y) = Bx + Cy$ 的答案是「$C$ 可逆」，此时 $y = -C^{-1}Bx$。隐函数定理说：非线性情形只需看对 $y$ 的偏微分。证明的想法是把它化为局部逆定理。

::: def id=c10-def-diff-partielles zh="偏微分" en="Partial differentials" fr="Différentielles partielles" ru="Частные дифференциалы"
把 $\R^n \times \R^p$ 等同于 $\R^{n+p}$，点记为 $(x, y)$。设 $U \subset \R^n \times \R^p$ 开，$g : U \to \R^q$ 在 $(x_0, y_0)$ 可微。定义

- $\partial_xg(x_0, y_0) \in \Lin(\R^n, \R^q)$：$x \mapsto g(x, y_0)$ 在 $x_0$ 处的微分，矩阵为 $\big(\frac{\partial g_i}{\partial x_j}(x_0, y_0)\big)$（$q \times n$）；
- $\partial_yg(x_0, y_0) \in \Lin(\R^p, \R^q)$：$y \mapsto g(x_0, y)$ 在 $y_0$ 处的微分，矩阵为 $\big(\frac{\partial g_i}{\partial y_j}(x_0, y_0)\big)$（$q \times p$）。

它们称为 $g$ 关于 $x$、关于 $y$ 的**偏微分**；$J_g = \big(\partial_xg \mid \partial_yg\big)$。
:::

::: fr
On identifie $\R^n \times \R^p$ à $\R^{n+p}$ et on note $(x, y)$ ses points. Soit $U \subset \R^n \times \R^p$ ouvert et $g : U \to \R^q$ différentiable en $(x_0, y_0)$. On définit

- $\partial_xg(x_0, y_0) \in \Lin(\R^n, \R^q)$ : la différentielle en $x_0$ de $x \mapsto g(x, y_0)$, de matrice $\big(\frac{\partial g_i}{\partial x_j}(x_0, y_0)\big)$ (taille $q \times n$) ;
- $\partial_yg(x_0, y_0) \in \Lin(\R^p, \R^q)$ : la différentielle en $y_0$ de $y \mapsto g(x_0, y)$, de matrice $\big(\frac{\partial g_i}{\partial y_j}(x_0, y_0)\big)$ (taille $q \times p$).

Ce sont les **différentielles partielles** de $g$ par rapport à $x$ et à $y$ ; $J_g = \big(\partial_xg \mid \partial_yg\big)$.
:::

::: rem
**为什么 $\dd g(x_0, y_0)(h, k) = \partial_xg(x_0, y_0)h + \partial_yg(x_0, y_0)k$。** 映射 $\iota(x) = (x, y_0)$ 是仿射的，微分为 $h \mapsto (h, 0)$；由链式法则，$\partial_xg(x_0, y_0)h = \dd g(x_0, y_0)(h, 0)$。把 $\iota$ 换成 $y \mapsto (x_0, y)$（微分为 $k \mapsto (0, k)$），同样的论证给出 $\partial_yg(x_0, y_0)k = \dd g(x_0, y_0)(0, k)$。再由 $\dd g(x_0, y_0)$ 的线性，$(h, k) = (h, 0) + (0, k)$ 给出所述公式。
:::

::: thm id=fonctions-implicites zh="隐函数定理" en="Implicit function theorem" fr="Théorème des fonctions implicites" ru="Теорема о неявной функции" lvl=1
设 $U \subset \R^n \times \R^p$ 开，$g : U \to \R^p$ 是 $\Cc^k$ 的（$k \ge 1$），$(a, b) \in U$，$g(a, b) = 0$，且对 $y$ 的偏微分 $\partial_yg(a, b) \in \Lin(\R^p)$ 可逆（即 $p \times p$ 矩阵 $\big(\frac{\partial g_i}{\partial y_j}(a, b)\big)$ 可逆）。则存在 $a$ 的开邻域 $V$、$b$ 的开邻域 $W$（$V \times W \subset U$）和 $\Cc^k$ 映射 $\varphi : V \to W$，使
$$\big((x, y) \in V \times W \text{ 且 } g(x, y) = 0\big) \iff \big(x \in V \text{ 且 } y = \varphi(x)\big).$$
并且对 $x \in V$，$\partial_yg(x, \varphi(x))$ 可逆，$\dd\varphi(x) = -\partial_yg(x, \varphi(x))^{-1}\circ\partial_xg(x, \varphi(x))$。
:::

::: fr
Soit $U \subset \R^n \times \R^p$ ouvert, $g : U \to \R^p$ de classe $\mathcal{C}^k$ ($k \ge 1$), $(a, b) \in U$ avec $g(a, b) = 0$, et supposons la différentielle partielle $\partial_yg(a, b) \in \Lin(\R^p)$ inversible (c'est-à-dire la matrice $p \times p$ $\big(\frac{\partial g_i}{\partial y_j}(a, b)\big)$ inversible). Alors il existe un voisinage ouvert $V$ de $a$, un voisinage ouvert $W$ de $b$ (avec $V \times W \subset U$) et une application $\varphi : V \to W$ de classe $\mathcal{C}^k$ tels que
$$\big((x, y) \in V \times W \text{ et } g(x, y) = 0\big) \iff \big(x \in V \text{ et } y = \varphi(x)\big).$$
De plus, pour $x \in V$, $\partial_yg(x, \varphi(x))$ est inversible et $\dd\varphi(x) = -\partial_yg(x, \varphi(x))^{-1}\circ\partial_xg(x, \varphi(x))$.
:::

::: proof
▷ 思路：把 $x$ 当作「附带的坐标」，考虑 $F(x, y) = (x, g(x, y))$。它的 Jacobi 矩阵是分块下三角的，可逆当且仅当 $\partial_yg$ 可逆，所以局部逆定理适用。$F$ 保持第一个分量，于是 $F^{-1}(x, z) = (x, \psi(x, z))$，而方程 $g(x, y) = 0$ 正是 $F(x, y) = (x, 0)$，解为 $y = \psi(x, 0)$。难点在于把邻域缩小成乘积形式 $V \times W$。$\R^n \times \R^p$ 上用范数 $\norm{(x, y)} = \max(\norm x, \norm y)$，于是 $B((x, y), r) = B(x, r) \times B(y, r)$。

**第 1 步（辅助映射）**　令 $F : U \to \R^n \times \R^p$，$F(x, y) = (x, g(x, y))$。各分量是 $\Cc^k$ 的，所以 $F$ 是 $\Cc^k$ 的（{@c9-ck-operations}）。其 Jacobi 矩阵是分块下三角的：
$$J_F(x, y) = \begin{pmatrix}I_n & 0\\ \partial_xg(x, y) & \partial_yg(x, y)\end{pmatrix},\qquad \det J_F(x, y) = \det\partial_yg(x, y).$$
由假设 $\det J_F(a, b) \ne 0$。

**第 2 步（局部逆）**　由 {@inversion-locale}，存在开集 $\Omega \ni (a, b)$（$\Omega \subset U$）与开集 $\Omega' \ni F(a, b) = (a, 0)$，使 $F|_\Omega : \Omega \to \Omega'$ 是 $\Cc^k$ 微分同胚。

**第 3 步（逆映射的形式）**　写 $(F|_\Omega)^{-1}(x, z) = (\alpha(x, z), \psi(x, z))$，$\alpha, \psi$ 是 $\Cc^k$ 的。由 $F(\alpha, \psi) = (\alpha, g(\alpha, \psi)) = (x, z)$，得
$$\alpha(x, z) = x,\qquad (x, \psi(x, z)) \in \Omega,\qquad g(x, \psi(x, z)) = z\qquad\text{对一切 } (x, z) \in \Omega'.$$
又 $F(a, b) = (a, 0)$，所以 $\psi(a, 0) = b$。

**第 4 步（取乘积邻域）**　$\Omega$ 是开集，存在 $r > 0$ 使 $B(a, r) \times B(b, r) \subset \Omega$。$\Omega'$ 是开集，存在 $r' > 0$ 使 $B(a, r') \times B(0, r') \subset \Omega'$。映射 $x \mapsto \psi(x, 0)$ 在 $B(a, r')$ 上连续，$\psi(a, 0) = b$，所以存在 $r'' \in \,]0, \min(r, r')]$，使 $\norm{x - a} < r'' \implies \norm{\psi(x, 0) - b} < r$。令
$$V = B(a, r''),\qquad W = B(b, r),\qquad \varphi(x) = \psi(x, 0)\quad(x \in V).$$
则 $V \times W \subset \Omega \subset U$，$\varphi : V \to W$，且 $\varphi$ 是 $\Cc^k$ 映射 $\psi$ 与 $x \mapsto (x, 0)$ 的复合，是 $\Cc^k$ 的。

**第 5 步（等价性）**　设 $(x, y) \in V \times W$。则 $(x, y) \in \Omega$，且 $(x, 0) \in B(a, r') \times B(0, r') \subset \Omega'$。

- **(⇐)** 若 $y = \varphi(x)$，由第 3 步（取 $z = 0$），$g(x, \varphi(x)) = g(x, \psi(x, 0)) = 0$。
- **(⇒)** 若 $g(x, y) = 0$，则 $F(x, y) = (x, 0)$。另一方面 $(x, \varphi(x)) = (F|_\Omega)^{-1}(x, 0) \in \Omega$，且 $F(x, \varphi(x)) = (x, 0)$。$F$ 在 $\Omega$ 上是单射，两点都在 $\Omega$ 中，所以 $(x, y) = (x, \varphi(x))$，即 $y = \varphi(x)$。

**第 6 步（导数公式）**　对 $x \in V$，$(x, \varphi(x)) \in \Omega$，$F|_\Omega$ 是微分同胚，由 {@c10-diffeo-diff}，$J_F(x, \varphi(x))$ 可逆，即 $\det\partial_yg(x, \varphi(x)) \ne 0$。在 $V$ 上 $g(x, \varphi(x)) = 0$；令 $\Theta(x) = (x, \varphi(x))$，$\dd\Theta(x)u = (u, \dd\varphi(x)u)$。由链式法则与上面的注，对一切 $u \in \R^n$：
$$0 = \dd g(\Theta(x))\big(u, \dd\varphi(x)u\big) = \partial_xg(x, \varphi(x))u + \partial_yg(x, \varphi(x))\,\dd\varphi(x)u.$$
左乘 $\partial_yg(x, \varphi(x))^{-1}$ 即得 $\dd\varphi(x) = -\partial_yg(x, \varphi(x))^{-1}\circ\partial_xg(x, \varphi(x))$。
:::

::: fr
▷ Méthode : on traite $x$ comme une « coordonnée passive » et on considère $F(x, y) = (x, g(x, y))$. Sa matrice jacobienne est triangulaire inférieure par blocs, inversible si et seulement si $\partial_yg$ l'est : le théorème d'inversion locale s'applique. Comme $F$ conserve la première composante, $F^{-1}(x, z) = (x, \psi(x, z))$, et l'équation $g(x, y) = 0$ s'écrit exactement $F(x, y) = (x, 0)$, de solution $y = \psi(x, 0)$. La difficulté est de réduire les voisinages à un produit $V \times W$. On munit $\R^n \times \R^p$ de la norme $\norm{(x, y)} = \max(\norm x, \norm y)$, de sorte que $B((x, y), r) = B(x, r) \times B(y, r)$.

**Étape 1 (application auxiliaire)**　Posons $F : U \to \R^n \times \R^p$, $F(x, y) = (x, g(x, y))$. Ses composantes sont de classe $\mathcal{C}^k$, donc $F$ aussi ({@fr:c9-ck-operations}). Sa matrice jacobienne est triangulaire inférieure par blocs :
$$J_F(x, y) = \begin{pmatrix}I_n & 0\\ \partial_xg(x, y) & \partial_yg(x, y)\end{pmatrix},\qquad \det J_F(x, y) = \det\partial_yg(x, y).$$
Par hypothèse, $\det J_F(a, b) \ne 0$.

**Étape 2 (inversion locale)**　D'après {@fr:inversion-locale}, il existe un ouvert $\Omega \ni (a, b)$ ($\Omega \subset U$) et un ouvert $\Omega' \ni F(a, b) = (a, 0)$ tels que $F|_\Omega : \Omega \to \Omega'$ soit un $\mathcal{C}^k$-difféomorphisme.

**Étape 3 (forme de l'inverse)**　Écrivons $(F|_\Omega)^{-1}(x, z) = (\alpha(x, z), \psi(x, z))$, avec $\alpha, \psi$ de classe $\mathcal{C}^k$. De $F(\alpha, \psi) = (\alpha, g(\alpha, \psi)) = (x, z)$ on tire
$$\alpha(x, z) = x,\qquad (x, \psi(x, z)) \in \Omega,\qquad g(x, \psi(x, z)) = z\qquad\text{pour tout } (x, z) \in \Omega'.$$
De plus $F(a, b) = (a, 0)$, donc $\psi(a, 0) = b$.

**Étape 4 (voisinages produits)**　$\Omega$ étant ouvert, il existe $r > 0$ tel que $B(a, r) \times B(b, r) \subset \Omega$. $\Omega'$ étant ouvert, il existe $r' > 0$ tel que $B(a, r') \times B(0, r') \subset \Omega'$. L'application $x \mapsto \psi(x, 0)$ est continue sur $B(a, r')$ et $\psi(a, 0) = b$, donc il existe $r'' \in \,]0, \min(r, r')]$ tel que $\norm{x - a} < r'' \implies \norm{\psi(x, 0) - b} < r$. Posons
$$V = B(a, r''),\qquad W = B(b, r),\qquad \varphi(x) = \psi(x, 0)\quad(x \in V).$$
Alors $V \times W \subset \Omega \subset U$, $\varphi : V \to W$, et $\varphi$ est de classe $\mathcal{C}^k$ comme composée de $\psi$ et de $x \mapsto (x, 0)$.

**Étape 5 (équivalence)**　Soit $(x, y) \in V \times W$. Alors $(x, y) \in \Omega$ et $(x, 0) \in B(a, r') \times B(0, r') \subset \Omega'$.

- **(⇐)** Si $y = \varphi(x)$, l'étape 3 (avec $z = 0$) donne $g(x, \varphi(x)) = g(x, \psi(x, 0)) = 0$.
- **(⇒)** Si $g(x, y) = 0$, alors $F(x, y) = (x, 0)$. D'autre part $(x, \varphi(x)) = (F|_\Omega)^{-1}(x, 0) \in \Omega$ et $F(x, \varphi(x)) = (x, 0)$. Comme $F$ est injective sur $\Omega$ et que les deux points sont dans $\Omega$, $(x, y) = (x, \varphi(x))$, c'est-à-dire $y = \varphi(x)$.

**Étape 6 (formule de la différentielle)**　Pour $x \in V$, $(x, \varphi(x)) \in \Omega$ et $F|_\Omega$ est un difféomorphisme ; d'après {@fr:c10-diffeo-diff}, $J_F(x, \varphi(x))$ est inversible, c'est-à-dire $\det\partial_yg(x, \varphi(x)) \ne 0$. Sur $V$, $g(x, \varphi(x)) = 0$ ; posons $\Theta(x) = (x, \varphi(x))$, de sorte que $\dd\Theta(x)u = (u, \dd\varphi(x)u)$. Par la règle de la chaîne et la remarque précédente, pour tout $u \in \R^n$ :
$$0 = \dd g(\Theta(x))\big(u, \dd\varphi(x)u\big) = \partial_xg(x, \varphi(x))u + \partial_yg(x, \varphi(x))\,\dd\varphi(x)u.$$
En composant à gauche par $\partial_yg(x, \varphi(x))^{-1}$, on obtient $\dd\varphi(x) = -\partial_yg(x, \varphi(x))^{-1}\circ\partial_xg(x, \varphi(x))$.
:::

::: rem
**关于条件与结论。**

1. **唯一性只在 $V \times W$ 中成立。** 单位圆 $g(x, y) = x^2 + y^2 - 1$ 在 $(0, 1)$ 附近：$\varphi(x) = \sqrt{1 - x^2}$。点 $(x, -\sqrt{1 - x^2})$ 也满足方程，但不在 $V \times W$ 中（$W$ 是 $1$ 的小邻域）。
2. **「$\partial_yg(a, b)$ 可逆」不能去掉**，否则可能出现三种情况（$n = p = 1$，$(a, b) = (0, 0)$）：
   - 解存在且唯一，但不可微：$g = y^3 - x$，解为 $y = x^{1/3}$，在 $0$ 不可导；
   - 解不唯一：$g = y^2 - x^2$，在原点的任何邻域里有两支 $y = x$ 与 $y = -x$；
   - 附近没有解：$g = x^2 + y^2$，零点集只有原点，$x \ne 0$ 时无解。
3. **最常用的特例** $n = p = 1$：若 $g(a, b) = 0$，$\partial_yg(a, b) \ne 0$，则在 $(a, b)$ 附近 $g(x, y) = 0 \iff y = \varphi(x)$，且 $\varphi'(x) = -\dfrac{\partial_xg(x, \varphi(x))}{\partial_yg(x, \varphi(x))}$。
4. **与梯度的几何意义的联系**：$p = 1$ 时，$\nabla g(a, b) \ne 0$ 意味着某个偏导数非零；对那个变量用定理，等值集 $\{g = 0\}$ 在 $(a, b)$ 附近是一个光滑图像。这正是 {@gradient-geometrie} 中「等值面」的严格含义（见下一节 {@tangent-ker}）。
:::

::: ex lvl=1
**圆与 Descartes 叶形线。**

1. $g(x, y) = x^2 + y^2 - 1$，$\partial_yg = 2y$。在 $y_0 \ne 0$ 的点 $(x_0, y_0)$ 附近，$y = \varphi(x)$，$\varphi(x) = \sqrt{1 - x^2}$（$y_0 > 0$）或 $-\sqrt{1 - x^2}$（$y_0 < 0$）。在 $(\pm1, 0)$ 处 $\partial_yg = 0$，不能把 $y$ 解成 $x$ 的函数：在 $(1, 0)$ 的任何邻域里，对 $x < 1$ 接近 $1$ 有两个解 $y = \pm\sqrt{1 - x^2}$，对 $x > 1$ 没有解。但 $\partial_xg(\pm1, 0) = \pm2 \ne 0$，可以把 $x$ 解成 $y$ 的函数：$x = \pm\sqrt{1 - y^2}$。
2. $g(x, y) = x^3 + y^3 - 3xy$（Descartes 叶形线）。$\nabla g = (3x^2 - 3y, 3y^2 - 3x)$ 的零点是 $(0, 0)$ 与 $(1, 1)$（{@cs-extremum} 之后的例子），而 $g(1, 1) = -1 \ne 0$，所以在曲线上 $\nabla g$ 只在原点为零。由定理，曲线在原点之外的每一点附近都是光滑图像（关于 $x$ 或关于 $y$）。曲线上 $\partial_yg = 0$ 的点满足 $x = y^2$，代入得 $y^6 - 2y^3 = 0$，即原点与 $(2^{2/3}, 2^{1/3})$；在后一点 $\partial_xg = 3\cdot2^{1/3} \ne 0$，切线竖直，可以解出 $x = \chi(y)$。原点是**二重点**：参数化 $t \mapsto \big(\frac{3t}{1 + t^3}, \frac{3t^2}{1 + t^3}\big)$ 在 $t = 0$ 与 $t \to \pm\infty$ 时都趋于原点，曲线在那里自交，不是任何函数的图像。
:::

::: method zh="求隐函数的导数"
不需要显式解出 $\varphi$。对恒等式 $g(x, \varphi(x)) = 0$ 求导，解出 $\varphi'$；再求导得 $\varphi''$。

例：$x^2 + y^2 = 1$ 在 $y > 0$ 处。对 $x$ 求导：$2x + 2yy' = 0$，$y' = -\frac xy$。再求导：$2 + 2y'^2 + 2yy'' = 0$，即 $1 + y'^2 + yy'' = 0$，所以 $y'' = -\frac{1 + y'^2}{y} = -\frac{y^2 + x^2}{y^3} = -\frac1{y^3}$。多变量时同样处理：对 $g(x, \varphi(x)) = 0$ 求各个偏导数（定理中的公式）。
:::

::: q
证明方程 $y^5 + y + x = 0$ 对每个 $x \in \R$ 有唯一实数解 $y = \varphi(x)$，$\varphi$ 是 $\Cc^\infty$ 的，并求 $\varphi'(x)$ 与 $\varphi'(0)$。
:::

::: ans
**存在唯一**：$h(y) = y^5 + y$ 连续、严格递增（$h' = 5y^4 + 1 > 0$），$h(y) \to \pm\infty$（$y \to \pm\infty$），所以是 $\R$ 到 $\R$ 的双射，$\varphi(x) = h^{-1}(-x)$。**光滑**：$g(x, y) = y^5 + y + x$，$\partial_yg = 5y^4 + 1 \ne 0$。在每个 $x_0$ 处对 $(x_0, \varphi(x_0))$ 用 {@fonctions-implicites}，得到 $V \ni x_0$ 上的 $\Cc^\infty$ 解 $\tilde\varphi$；由整体唯一性 $\tilde\varphi = \varphi$ 在 $V$ 上成立，所以 $\varphi$ 在每点附近是 $\Cc^\infty$ 的。**导数**：$\varphi'(x) = -\dfrac{\partial_xg}{\partial_yg} = -\dfrac{1}{5\varphi(x)^4 + 1}$；$\varphi(0) = 0$，所以 $\varphi'(0) = -1$。
:::

## $\R^n$ 的子流形

曲线、曲面以及更高维的「光滑弯曲的子集」统称子流形。隐函数定理说明：由「独立的方程」定义的集合，局部上是光滑图像。这一节给出子流形的四种等价描述，并计算切空间——下一节的 Lagrange 乘子法完全建立在切空间的计算上。全节 $0 \le d \le n$，$k \ge 1$。

::: def id=def-sous-variete zh="子流形" en="Submanifold of $\mathbb{R}^n$" fr="Sous-variété de $\mathbb{R}^n$" ru="Подмногообразие $\mathbb{R}^n$"
$M \subset \R^n$ 是 **$d$ 维 $\Cc^k$ 子流形**，如果
$$\forall a \in M,\ \exists U \text{ 开} \ni a,\ \exists g \in \Cc^k(U, \R^{n-d}),\qquad M \cap U = \{x \in U : g(x) = 0\}\ \text{ 且 }\ \dd g(a) \text{ 满射}.$$
$\dd g(a)$ 满射的 $g$ 称为在 $a$ 处是**淹没**（submersion）；等价地，$J_g(a)$ 的秩为 $n - d$，即 $g$ 的 $n - d$ 个分量的微分线性无关。
:::

::: fr
On dit que $M \subset \R^n$ est une **sous-variété de classe $\mathcal{C}^k$ et de dimension $d$** si
$$\forall a \in M,\ \exists U \text{ ouvert} \ni a,\ \exists g \in \mathcal{C}^k(U, \R^{n-d}),\qquad M \cap U = \{x \in U : g(x) = 0\}\ \text{ et }\ \dd g(a) \text{ surjective}.$$
Une application $g$ telle que $\dd g(a)$ soit surjective est une **submersion** en $a$ ; de manière équivalente, $J_g(a)$ est de rang $n - d$, c'est-à-dire que les différentielles des $n - d$ composantes de $g$ sont linéairement indépendantes.
:::

白话：在每一点附近，$M$ 由 $n - d$ 个「独立的」方程切出来，因而有 $d$ 个自由度。

::: ex id=c10-ex-sous-varietes lvl=1
1. **球面** $S^{n-1} = \{\norm x_2 = 1\}$：$g(x) = \norm x_2^2 - 1$，$\dd g(x)h = 2\ps{x, h}$。对 $x \in S^{n-1}$，$\dd g(x)(x/2) = \norm x^2 = 1$，所以 $\dd g(x)$ 的像含 $1$，是满射。$S^{n-1}$ 是 $n - 1$ 维 $\Cc^\infty$ 子流形。
2. **图像**：若 $V \subset \R^d$ 开，$\varphi \in \Cc^k(V, \R^{n-d})$，则 $\Gamma = \{(x, \varphi(x)) : x \in V\}$ 是 $d$ 维 $\Cc^k$ 子流形：取 $U = V \times \R^{n-d}$，$g(x, y) = y - \varphi(x)$，$J_g = \big(-J_\varphi \mid I_{n-d}\big)$ 的秩为 $n - d$。
3. **仿射子空间** $\{x : Ax = c\}$，$A \in \M_{(n-d) \times n}(\R)$ 的秩为 $n - d$：$g(x) = Ax - c$，$\dd g = A$ 满射。
4. **开集**是 $n$ 维子流形（$g$ 取值于 $\R^0 = \{0\}$）。
5. **非例**（证明见 {@tangent-ker} 之后）：圆锥 $\{x^2 + y^2 = z^2\}$ 在原点、两条坐标轴的并 $\{xy = 0\}$ 在原点都不是子流形。
:::

::: thm id=sous-variete-equiv zh="子流形的等价定义" en="Equivalent definitions of a submanifold" fr="Caractérisations des sous-variétés" ru="Эквивалентные определения подмногообразия" lvl=2
设 $M \subset \R^n$，$a \in M$。以下条件等价（每一条都只涉及 $a$ 的某个开邻域 $U$）：

1. （**方程**）存在 $U \ni a$ 与 $g \in \Cc^k(U, \R^{n-d})$，$M \cap U = g^{-1}(0)$，$\dd g(a)$ 满射。
2. （**图像**）适当重排 $\R^n$ 的坐标、记为 $(x, y) \in \R^d \times \R^{n-d}$ 后，存在 $U \ni a$、$\R^d$ 的开集 $V$ 和 $\varphi \in \Cc^k(V, \R^{n-d})$，使 $M \cap U = \{(x, \varphi(x)) : x \in V\}$。
3. （**参数化**）存在 $U \ni a$、$\R^d$ 的开集 $\Omega$ 和 $\gamma \in \Cc^k(\Omega, \R^n)$，使 $\gamma(\Omega) = M \cap U$，$\dd\gamma(u)$ 对一切 $u$ 是单射（$\gamma$ 是**浸入**），且 $\gamma : \Omega \to M \cap U$ 是同胚。
4. （**平直化**）存在 $U \ni a$ 与 $\Cc^k$ 微分同胚 $\Phi : U \to \Phi(U)$，使 $\Phi(M \cap U) = (\R^d \times \{0\}) \cap \Phi(U)$。

因此「$M$ 是 $d$ 维子流形」可以用其中任何一条（对每个 $a \in M$）来定义。
:::

::: fr
Soit $M \subset \R^n$ et $a \in M$. Les conditions suivantes sont équivalentes (chacune ne fait intervenir qu'un voisinage ouvert $U$ de $a$) :

1. (**Équation**) Il existe $U \ni a$ et $g \in \mathcal{C}^k(U, \R^{n-d})$ avec $M \cap U = g^{-1}(0)$ et $\dd g(a)$ surjective.
2. (**Graphe**) Après une permutation des coordonnées de $\R^n$, notées $(x, y) \in \R^d \times \R^{n-d}$, il existe $U \ni a$, un ouvert $V$ de $\R^d$ et $\varphi \in \mathcal{C}^k(V, \R^{n-d})$ tels que $M \cap U = \{(x, \varphi(x)) : x \in V\}$.
3. (**Paramétrage**) Il existe $U \ni a$, un ouvert $\Omega$ de $\R^d$ et $\gamma \in \mathcal{C}^k(\Omega, \R^n)$ tels que $\gamma(\Omega) = M \cap U$, $\dd\gamma(u)$ soit injective pour tout $u$ ($\gamma$ est une **immersion**) et $\gamma : \Omega \to M \cap U$ soit un homéomorphisme.
4. (**Redressement**) Il existe $U \ni a$ et un $\mathcal{C}^k$-difféomorphisme $\Phi : U \to \Phi(U)$ tels que $\Phi(M \cap U) = (\R^d \times \{0\}) \cap \Phi(U)$.

On peut donc définir « $M$ est une sous-variété de dimension $d$ » par n'importe laquelle de ces conditions (en tout $a \in M$).
:::

::: sketch
▷ 思路：证明 $1 \Rightarrow 2 \Rightarrow 3 \Rightarrow 2$ 与 $2 \Rightarrow 4 \Rightarrow 1$。从方程到图像用隐函数定理，从参数化到图像用局部逆定理，其余是显式构造。坐标的排列是线性等距同构，不影响任何结论。

**$1 \Rightarrow 2$**　$J_g(a)$ 是 $(n - d) \times n$ 矩阵，秩为 $n - d$，所以有 $n - d$ 列线性无关。重排坐标，使它们是最后 $n - d$ 列，记 $a = (x_0, y_0)$；于是 $\partial_yg(a)$ 可逆。由 {@fonctions-implicites}，存在 $V \ni x_0$、$W \ni y_0$（$V \times W \subset U$）与 $\Cc^k$ 映射 $\varphi : V \to W$，使 $(x, y) \in V \times W$ 时 $g(x, y) = 0 \iff y = \varphi(x)$。所以 $M \cap (V \times W) = \{(x, \varphi(x)) : x \in V\}$。

**$2 \Rightarrow 3$**　$\gamma(x) = (x, \varphi(x))$，$x \in V$。它是 $\Cc^k$ 单射；$\dd\gamma(x)u = (u, \dd\varphi(x)u)$ 是单射；$\gamma$ 的逆是投影 $(x, y) \mapsto x$ 在 $M \cap U$ 上的限制，连续。所以 $\gamma$ 是到 $M \cap U$ 的同胚。

**$3 \Rightarrow 2$**　设 $\gamma(u_0) = a$。$J_\gamma(u_0)$ 是 $n \times d$ 矩阵，秩为 $d$，有 $d$ 行线性无关；重排坐标使它们是前 $d$ 行，令 $\pi(x, y) = x$，$\pi'(x, y) = y$。则 $J_{\pi\circ\gamma}(u_0)$ 是可逆的 $d \times d$ 矩阵。由 {@inversion-locale}，存在开集 $\Omega_0 \ni u_0$（$\Omega_0 \subset \Omega$）与 $V_0 \ni \pi(a)$，使 $\pi\circ\gamma : \Omega_0 \to V_0$ 是 $\Cc^k$ 微分同胚，记其逆为 $\sigma$。令 $\varphi = \pi'\circ\gamma\circ\sigma : V_0 \to \R^{n-d}$（$\Cc^k$）。对 $u \in \Omega_0$，$x = \pi\gamma(u)$，有 $\gamma(u) = (x, \varphi(x))$；所以 $\gamma(\Omega_0) = \{(x, \varphi(x)) : x \in V_0\}$。**这里用到同胚的假设**：$\Omega_0$ 是 $\Omega$ 中的开集，$\gamma$ 是到 $M \cap U$ 的同胚，所以 $\gamma(\Omega_0)$ 是 $M \cap U$ 的相对开集，即存在开集 $U_0$ 使 $\gamma(\Omega_0) = M \cap U \cap U_0$。于是 $M \cap (U \cap U_0)$ 是 $\varphi$ 的图像。（没有这个假设，$\gamma(\Omega_0)$ 可能不是 $a$ 在 $M$ 中的邻域，见下面的「8 字形」反例 {@c10-cex-non-sous-varietes}。）

**$2 \Rightarrow 4$**　$\Phi(x, y) = (x, y - \varphi(x))$ 在 $V \times \R^{n-d}$ 上是 $\Cc^k$ 的，有 $\Cc^k$ 逆 $(x, z) \mapsto (x, z + \varphi(x))$，是到 $V \times \R^{n-d}$ 的微分同胚，且把图像 $\{(x, \varphi(x))\}$ 映到 $V \times \{0\}$。取 $U' = U \cap (V \times \R^{n-d})$，则 $\Phi(M \cap U') = (\R^d \times \{0\}) \cap \Phi(U')$。

**$4 \Rightarrow 1$**　令 $g = (\Phi_{d+1}, \dots, \Phi_n) : U \to \R^{n-d}$。则 $M \cap U = \{x \in U : \Phi(x) \in \R^d \times \{0\}\} = g^{-1}(0)$；$J_g(a)$ 是可逆矩阵 $J_\Phi(a)$（{@c10-diffeo-diff}）的后 $n - d$ 行，秩为 $n - d$，所以 $\dd g(a)$ 满射。
:::

::: fr
▷ Méthode : on montre $1 \Rightarrow 2 \Rightarrow 3 \Rightarrow 2$ et $2 \Rightarrow 4 \Rightarrow 1$. On passe de l'équation au graphe par le théorème des fonctions implicites, du paramétrage au graphe par le théorème d'inversion locale ; le reste consiste en des constructions explicites. Une permutation des coordonnées est une isométrie linéaire et ne change rien.

**$1 \Rightarrow 2$**　$J_g(a)$ est une matrice $(n - d) \times n$ de rang $n - d$ : elle possède $n - d$ colonnes linéairement indépendantes. On permute les coordonnées pour que ce soient les $n - d$ dernières et on écrit $a = (x_0, y_0)$ ; alors $\partial_yg(a)$ est inversible. D'après {@fr:fonctions-implicites}, il existe $V \ni x_0$, $W \ni y_0$ ($V \times W \subset U$) et $\varphi : V \to W$ de classe $\mathcal{C}^k$ tels que, pour $(x, y) \in V \times W$, $g(x, y) = 0 \iff y = \varphi(x)$. Donc $M \cap (V \times W) = \{(x, \varphi(x)) : x \in V\}$.

**$2 \Rightarrow 3$**　$\gamma(x) = (x, \varphi(x))$, $x \in V$. C'est une injection de classe $\mathcal{C}^k$ ; $\dd\gamma(x)u = (u, \dd\varphi(x)u)$ est injective ; la réciproque de $\gamma$ est la restriction à $M \cap U$ de la projection $(x, y) \mapsto x$, qui est continue. Donc $\gamma$ est un homéomorphisme sur $M \cap U$.

**$3 \Rightarrow 2$**　Soit $\gamma(u_0) = a$. $J_\gamma(u_0)$ est une matrice $n \times d$ de rang $d$, qui possède $d$ lignes linéairement indépendantes ; on permute les coordonnées pour que ce soient les $d$ premières, et on pose $\pi(x, y) = x$, $\pi'(x, y) = y$. Alors $J_{\pi\circ\gamma}(u_0)$ est une matrice $d \times d$ inversible. D'après {@fr:inversion-locale}, il existe des ouverts $\Omega_0 \ni u_0$ ($\Omega_0 \subset \Omega$) et $V_0 \ni \pi(a)$ tels que $\pi\circ\gamma : \Omega_0 \to V_0$ soit un $\mathcal{C}^k$-difféomorphisme, de réciproque notée $\sigma$. Posons $\varphi = \pi'\circ\gamma\circ\sigma : V_0 \to \R^{n-d}$ (de classe $\mathcal{C}^k$). Pour $u \in \Omega_0$ et $x = \pi\gamma(u)$, on a $\gamma(u) = (x, \varphi(x))$ ; donc $\gamma(\Omega_0) = \{(x, \varphi(x)) : x \in V_0\}$. **C'est ici qu'intervient l'hypothèse d'homéomorphisme** : $\Omega_0$ est ouvert dans $\Omega$ et $\gamma$ est un homéomorphisme sur $M \cap U$, donc $\gamma(\Omega_0)$ est un ouvert relatif de $M \cap U$ : il existe un ouvert $U_0$ tel que $\gamma(\Omega_0) = M \cap U \cap U_0$. Ainsi $M \cap (U \cap U_0)$ est le graphe de $\varphi$. (Sans cette hypothèse, $\gamma(\Omega_0)$ pourrait ne pas être un voisinage de $a$ dans $M$ : voir le contre-exemple du « huit » {@fr:c10-cex-non-sous-varietes}.)

**$2 \Rightarrow 4$**　$\Phi(x, y) = (x, y - \varphi(x))$ est de classe $\mathcal{C}^k$ sur $V \times \R^{n-d}$, d'inverse $(x, z) \mapsto (x, z + \varphi(x))$ de classe $\mathcal{C}^k$ : c'est un difféomorphisme de $V \times \R^{n-d}$ sur lui-même, qui envoie le graphe $\{(x, \varphi(x))\}$ sur $V \times \{0\}$. Avec $U' = U \cap (V \times \R^{n-d})$, on a $\Phi(M \cap U') = (\R^d \times \{0\}) \cap \Phi(U')$.

**$4 \Rightarrow 1$**　Posons $g = (\Phi_{d+1}, \dots, \Phi_n) : U \to \R^{n-d}$. Alors $M \cap U = \{x \in U : \Phi(x) \in \R^d \times \{0\}\} = g^{-1}(0)$ ; $J_g(a)$ est formée des $n - d$ dernières lignes de la matrice inversible $J_\Phi(a)$ ({@fr:c10-diffeo-diff}), donc de rang $n - d$, et $\dd g(a)$ est surjective.
:::

::: def id=def-tangent zh="切空间" en="Tangent space" fr="Espace tangent" ru="Касательное пространство"
设 $M \subset \R^n$（任意子集），$a \in M$。$v \in \R^n$ 是 $M$ 在 $a$ 处的**切向量**，如果
$$\exists \eps > 0,\ \exists c \in \Cc^1(]-\eps, \eps[, \R^n),\qquad c(t) \in M\ (\forall t),\quad c(0) = a,\quad c'(0) = v.$$
切向量的集合 $T_aM$ 称为 $M$ 在 $a$ 处的**切空间**（锥）。
:::

::: fr
Soit $M \subset \R^n$ (partie quelconque) et $a \in M$. Un vecteur $v \in \R^n$ est **tangent** à $M$ en $a$ si
$$\exists \eps > 0,\ \exists c \in \mathcal{C}^1(]-\eps, \eps[, \R^n),\qquad c(t) \in M\ (\forall t),\quad c(0) = a,\quad c'(0) = v.$$
L'ensemble $T_aM$ des vecteurs tangents est l'**espace tangent** (cône tangent) à $M$ en $a$.
:::

白话：$T_aM$ 是在 $M$ 上经过 $a$ 运动的质点所有可能的速度。对一般的集合它只是一个锥（对数乘封闭：$c(\lambda t)$ 的速度是 $\lambda v$）；对子流形它是向量空间（下面的命题）。

::: prop id=tangent-ker zh="切空间的计算" en="Computing tangent spaces" fr="Calcul de l'espace tangent" ru="Вычисление касательного пространства" lvl=1
1. 设 $M \subset \R^n$，$a \in M$，$U \ni a$ 开，$g \in \Cc^1(U, \R^{n-d})$，$M \cap U = g^{-1}(0)$，$\dd g(a)$ 满射。则
   $$T_aM = \Ker\dd g(a),$$
   这是 $d$ 维向量子空间。
2. 若 $M$ 是 $d$ 维子流形，$\gamma \in \Cc^1(\Omega, \R^n)$（$\Omega \subset \R^d$ 开），$\gamma(\Omega) \subset M$，$\gamma(u_0) = a$，$\dd\gamma(u_0)$ 是单射，则 $T_aM = \Ima\dd\gamma(u_0)$。
:::

::: fr
1. Soit $M \subset \R^n$, $a \in M$, $U \ni a$ ouvert, $g \in \mathcal{C}^1(U, \R^{n-d})$ avec $M \cap U = g^{-1}(0)$ et $\dd g(a)$ surjective. Alors
   $$T_aM = \Ker\dd g(a),$$
   qui est un sous-espace vectoriel de dimension $d$.
2. Si $M$ est une sous-variété de dimension $d$, si $\gamma \in \mathcal{C}^1(\Omega, \R^n)$ ($\Omega \subset \R^d$ ouvert) vérifie $\gamma(\Omega) \subset M$, $\gamma(u_0) = a$ et $\dd\gamma(u_0)$ injective, alors $T_aM = \Ima\dd\gamma(u_0)$.
:::

::: proof
▷ 思路：(1) 的 $\subset$：沿 $M$ 上的曲线 $g \equiv 0$，求导即可。$\supset$：用隐函数定理把 $M$ 写成图像，对核中的每个向量写出一条以它为速度的曲线。(2) 一个包含关系由求导得到，另一个由维数相等得到。

**第 1 步（(1) 的 $\subset$）**　设 $v \in T_aM$，$c$ 如定义。$c$ 连续，$c(0) = a \in U$，$U$ 开，所以存在 $\eps' > 0$，使 $\abs t < \eps'$ 时 $c(t) \in M \cap U$，从而 $g(c(t)) = 0$。由链式法则在 $t = 0$ 求导：$\dd g(a)(c'(0)) = 0$，即 $v \in \Ker\dd g(a)$。

**第 2 步（维数）**　由秩定理，$\dim\Ker\dd g(a) = n - \rg\dd g(a) = n - (n - d) = d$。

**第 3 步（(1) 的 $\supset$）**　与 {@sous-variete-equiv} 中 $1 \Rightarrow 2$ 相同：重排坐标（这是线性同构，$M$、$T_aM$ 与 $\Ker\dd g(a)$ 都相应地变换），使 $a = (x_0, y_0)$ 且 $\partial_yg(a)$ 可逆。由 {@fonctions-implicites}，存在 $V \ni x_0$、$W \ni y_0$（$V \times W \subset U$）与 $\Cc^1$ 映射 $\varphi : V \to W$，使 $M \cap (V \times W) = \{(x, \varphi(x)) : x \in V\}$，$\varphi(x_0) = y_0$，且 $\dd\varphi(x_0) = -\partial_yg(a)^{-1}\partial_xg(a)$。设 $v = (u, w) \in \Ker\dd g(a)$，即 $\partial_xg(a)u + \partial_yg(a)w = 0$，于是 $w = -\partial_yg(a)^{-1}\partial_xg(a)u = \dd\varphi(x_0)u$。取 $\eps > 0$ 使 $\abs t < \eps$ 时 $x_0 + tu \in V$，令 $c(t) = (x_0 + tu, \varphi(x_0 + tu))$。$c$ 是 $\Cc^1$ 的，$c(t) \in M$，$c(0) = a$，$c'(0) = (u, \dd\varphi(x_0)u) = v$。所以 $v \in T_aM$。

**第 4 步（(2)）**　对 $w \in \R^d$，取 $\eps > 0$ 使 $\abs t < \eps$ 时 $u_0 + tw \in \Omega$，令 $c(t) = \gamma(u_0 + tw) \in M$。由链式法则 $c'(0) = \dd\gamma(u_0)w$，所以 $\Ima\dd\gamma(u_0) \subset T_aM$。$\dd\gamma(u_0)$ 是单射，$\dim\Ima\dd\gamma(u_0) = d$；$M$ 是 $d$ 维子流形，由 (1)，$T_aM$ 是 $d$ 维的。所以两者相等。
:::

::: fr
▷ Méthode : pour (1), l'inclusion $\subset$ s'obtient en dérivant $g \equiv 0$ le long d'une courbe de $M$ ; pour $\supset$, on écrit $M$ comme un graphe grâce au théorème des fonctions implicites et on construit, pour chaque vecteur du noyau, une courbe dont c'est la vitesse. Pour (2), une inclusion vient de la dérivation, l'autre de l'égalité des dimensions.

**Étape 1 (inclusion $\subset$ dans (1))**　Soit $v \in T_aM$ et $c$ comme dans la définition. $c$ est continue, $c(0) = a \in U$ et $U$ est ouvert, donc il existe $\eps' > 0$ tel que $c(t) \in M \cap U$ pour $\abs t < \eps'$, d'où $g(c(t)) = 0$. En dérivant en $t = 0$ par la règle de la chaîne : $\dd g(a)(c'(0)) = 0$, c'est-à-dire $v \in \Ker\dd g(a)$.

**Étape 2 (dimension)**　D'après le théorème du rang, $\dim\Ker\dd g(a) = n - \rg\dd g(a) = n - (n - d) = d$.

**Étape 3 (inclusion $\supset$ dans (1))**　Comme dans $1 \Rightarrow 2$ de {@fr:sous-variete-equiv} : on permute les coordonnées (isomorphisme linéaire, qui transforme de la même façon $M$, $T_aM$ et $\Ker\dd g(a)$) de sorte que $a = (x_0, y_0)$ et que $\partial_yg(a)$ soit inversible. D'après {@fr:fonctions-implicites}, il existe $V \ni x_0$, $W \ni y_0$ ($V \times W \subset U$) et $\varphi : V \to W$ de classe $\mathcal{C}^1$ tels que $M \cap (V \times W) = \{(x, \varphi(x)) : x \in V\}$, $\varphi(x_0) = y_0$ et $\dd\varphi(x_0) = -\partial_yg(a)^{-1}\partial_xg(a)$. Soit $v = (u, w) \in \Ker\dd g(a)$, c'est-à-dire $\partial_xg(a)u + \partial_yg(a)w = 0$ ; donc $w = -\partial_yg(a)^{-1}\partial_xg(a)u = \dd\varphi(x_0)u$. Soit $\eps > 0$ tel que $x_0 + tu \in V$ pour $\abs t < \eps$ ; posons $c(t) = (x_0 + tu, \varphi(x_0 + tu))$. Alors $c$ est de classe $\mathcal{C}^1$, $c(t) \in M$, $c(0) = a$ et $c'(0) = (u, \dd\varphi(x_0)u) = v$. Donc $v \in T_aM$.

**Étape 4 (point (2))**　Pour $w \in \R^d$, soit $\eps > 0$ tel que $u_0 + tw \in \Omega$ pour $\abs t < \eps$, et $c(t) = \gamma(u_0 + tw) \in M$. Par la règle de la chaîne, $c'(0) = \dd\gamma(u_0)w$ ; donc $\Ima\dd\gamma(u_0) \subset T_aM$. Comme $\dd\gamma(u_0)$ est injective, $\dim\Ima\dd\gamma(u_0) = d$ ; comme $M$ est une sous-variété de dimension $d$, $T_aM$ est de dimension $d$ d'après (1). Les deux espaces sont donc égaux.
:::

::: cex id=c10-cex-non-sous-varietes zh="不是子流形的集合" lvl=1
**用切空间的维数排除子流形。** 由 {@tangent-ker}，若 $M$ 在 $a$ 附近是 $d$ 维子流形，则 $T_aM$ 是 $d$ 维向量空间；$d = 0$ 时 $a$ 是 $M$ 的孤立点，$d = n$ 时 $M$ 包含 $a$ 的一个邻域。

1. **两条坐标轴** $M = \{xy = 0\} \subset \R^2$ 在原点：曲线 $t \mapsto (t, 0)$ 与 $t \mapsto (0, t)$ 在 $M$ 中，所以 $e_1, e_2 \in T_0M$，于是 $d = 1$ 不可能；$d = 0$ 不可能（原点不孤立）；$d = 2$ 不可能（$(t, t) \notin M$，$M$ 不含原点的邻域）。
2. **圆锥** $M = \{x^2 + y^2 = z^2\} \subset \R^3$ 在原点：直线 $t \mapsto t(\cos\alpha, \sin\alpha, 1)$ 在 $M$ 中，取 $\alpha = 0, \frac\pi2, \pi$ 得切向量 $(1, 0, 1), (0, 1, 1), (-1, 0, 1)$，其行列式为 $2 \ne 0$，所以 $T_0M = \R^3$，只能 $d = 3$；但 $(0, 0, t) \notin M$（$t \ne 0$），矛盾。去掉原点后，$\nabla(x^2 + y^2 - z^2) = 2(x, y, -z) \ne 0$，$M \setminus \{0\}$ 是 $2$ 维子流形。
3. **8 字形**（单射浸入的像不一定是子流形）：$\gamma(t) = (\sin 2t, \sin t)$，$t \in \,]0, 2\pi[$。$\gamma$ 是单射（若 $\sin t_1 = \sin t_2 \ne 0$，由 $\sin 2t = 2\sin t\cos t$ 得 $\cos t_1 = \cos t_2$，从而 $t_1 = t_2$；若 $\sin t_1 = \sin t_2 = 0$，则 $t_1 = t_2 = \pi$），也是浸入（$\cos t = 0$ 时 $\cos 2t = -1 \ne 0$，所以 $\gamma'(t) \ne 0$）。但 $M = \gamma(]0, 2\pi[)$ 在原点 $= \gamma(\pi)$ 处不是子流形：曲线 $s \mapsto \gamma(\pi + s)$ 给出切向量 $\gamma'(\pi) = (2, -1)$；曲线 $c(s) = (\sin 2s, \sin s)$（$\abs s < \frac\pi2$）也在 $M$ 中（$s > 0$ 时 $c(s) = \gamma(s)$，$s < 0$ 时 $c(s) = \gamma(s + 2\pi)$，$c(0) = \gamma(\pi)$），给出切向量 $(2, 1)$。两者线性无关，只能 $d = 2$，但 $(t, 0) \notin M$（$t \ne 0$），矛盾。问题在于 $\gamma$ 不是到像的同胚：$t \to 0^{+}$ 时 $\gamma(t) \to \gamma(\pi)$，而 $t \not\to \pi$。
:::

::: ex lvl=2
**球面与正交群。**

1. **球面**：$S^{n-1} = g^{-1}(0)$，$g(x) = \norm x^2 - 1$（{@c10-ex-sous-varietes}）。由 {@tangent-ker}，$T_xS^{n-1} = \Ker\dd g(x) = \{h : \ps{x, h} = 0\} = x^\perp$：球面的切空间垂直于半径。
2. **正交群**：$O(n) = g^{-1}(0)$，$g(A) = A^TA - I$，$g : \M_n(\R) \to \mathcal{S}_n$，$\mathcal{S}_n$ 是对称矩阵空间（维数 $\frac{n(n+1)}{2}$，取一组基后等同于 $\R^{n(n+1)/2}$）。$g$ 是多项式，$\Cc^\infty$；由 {@diff-bilineaire}，$\dd g(A)H = A^TH + H^TA$。**满射**：对 $A \in O(n)$ 与 $S \in \mathcal{S}_n$，取 $H = \frac12AS$，则 $A^TH + H^TA = \frac12A^TAS + \frac12S^TA^TA = \frac12S + \frac12S = S$。所以 $O(n)$ 是 $\M_n(\R)$ 中 $n^2 - \frac{n(n+1)}{2} = \frac{n(n-1)}{2}$ 维的子流形，$T_IO(n) = \Ker\dd g(I) = \{H : H + H^T = 0\}$ 是反对称矩阵空间。这是 Lie 群理论的起点。
:::

::: q
$y = \abs x$ 的图像 $M$ 是 $\R^2$ 的 $1$ 维 $\Cc^1$ 子流形吗？
:::

::: ans
不是。反设它在原点附近是 $1$ 维 $\Cc^1$ 子流形。由 {@sous-variete-equiv}，在原点的某个邻域 $U$ 中，$M \cap U$ 是关于 $x$ 或关于 $y$ 的 $\Cc^1$ 函数的图像。**关于 $x$**：$M \cap U = \{(x, \varphi(x))\}$，但 $M$ 中横坐标为 $x$ 的点只有 $(x, \abs x)$，所以 $\varphi(x) = \abs x$ 在 $0$ 附近成立，而 $\abs x$ 在 $0$ 不可导，矛盾。**关于 $y$**：$M \cap U = \{(\chi(y), y)\}$，但对小的 $y > 0$，$(y, y)$ 与 $(-y, y)$ 都在 $M \cap U$ 中，纵坐标相同、横坐标不同，矛盾。（注意 $M$ 是 $\Cc^0$ 意义下的曲线，也是一个 $\Cc^2$ 单射 $t \mapsto (t^3, \abs t^3)$ 的像，但这不是浸入：在 $t = 0$ 处速度为零。）
:::

## 条件极值：Lagrange 乘子法

问题：在约束 $g_1 = \dots = g_p = 0$ 下求 $f$ 的极值。约束集 $M$ 一般不是开集，第 9 章的一阶条件 {@cn-extremum} 不能直接用。思路：$f$ 沿 $M$ 上任何曲线在极值点的导数为零，所以 $\dd f(a)$ 在切空间 $T_aM$ 上为零；切空间由约束的微分刻画，线性代数给出乘子。

::: lem id=c10-lem-formes zh="线性形式的公共核" en="Linear forms vanishing on a common kernel" fr="Formes linéaires et noyau commun" ru="Линейные формы с общим ядром" lvl=1
设 $\ell, \ell_1, \dots, \ell_p$ 是 $\R^n$ 上的线性形式，且 $\bigcap_{i=1}^p\Ker\ell_i \subset \Ker\ell$。则存在 $\lambda_1, \dots, \lambda_p \in \R$，使 $\ell = \sum_{i=1}^p\lambda_i\ell_i$；若 $\ell_1, \dots, \ell_p$ 线性无关，这些 $\lambda_i$ 唯一。
:::

::: fr
Soient $\ell, \ell_1, \dots, \ell_p$ des formes linéaires sur $\R^n$ telles que $\bigcap_{i=1}^p\Ker\ell_i \subset \Ker\ell$. Alors il existe $\lambda_1, \dots, \lambda_p \in \R$ tels que $\ell = \sum_{i=1}^p\lambda_i\ell_i$ ; si $\ell_1, \dots, \ell_p$ sont linéairement indépendantes, les $\lambda_i$ sont uniques.
:::

::: proof
▷ 思路：把 $\ell$ 写成 $\mu \circ \Lambda$，其中 $\Lambda = (\ell_1, \dots, \ell_p) : \R^n \to \R^p$；核的包含关系保证 $\mu$ 在 $\Ima\Lambda$ 上有定义，再把 $\mu$ 延拓到整个 $\R^p$。

**第 1 步**　令 $\Lambda(x) = (\ell_1(x), \dots, \ell_p(x))$，则 $\Ker\Lambda = \bigcap_i\Ker\ell_i$。

**第 2 步（在 $\Ima\Lambda$ 上定义 $\mu$）**　对 $z = \Lambda(x) \in \Ima\Lambda$，令 $\mu(z) = \ell(x)$。这不依赖于 $x$ 的选取：若 $\Lambda(x) = \Lambda(x')$，则 $x - x' \in \Ker\Lambda \subset \Ker\ell$，$\ell(x) = \ell(x')$。$\mu$ 在 $\Ima\Lambda$ 上线性：$\mu(\Lambda(x) + s\Lambda(x')) = \mu(\Lambda(x + sx')) = \ell(x) + s\ell(x')$。

**第 3 步（延拓）**　取 $\Ima\Lambda$ 在 $\R^p$ 中的一个补空间 $S$，在 $S$ 上令 $\mu = 0$，得到 $\R^p$ 上的线性形式 $\mu$。记 $\lambda_i = \mu(e_i)$，则 $\mu(z) = \sum_i\lambda_iz_i$。

**第 4 步（结论）**　对一切 $x$，$\ell(x) = \mu(\Lambda(x)) = \sum_i\lambda_i\ell_i(x)$。**唯一性**：若 $\sum_i\lambda_i\ell_i = \sum_i\lambda_i'\ell_i$，则 $\sum_i(\lambda_i - \lambda_i')\ell_i = 0$，由线性无关 $\lambda_i = \lambda_i'$。
:::

::: fr
▷ Méthode : on écrit $\ell = \mu \circ \Lambda$ avec $\Lambda = (\ell_1, \dots, \ell_p) : \R^n \to \R^p$ ; l'inclusion des noyaux garantit que $\mu$ est bien définie sur $\Ima\Lambda$, puis on prolonge $\mu$ à $\R^p$.

**Étape 1**　Posons $\Lambda(x) = (\ell_1(x), \dots, \ell_p(x))$ ; alors $\Ker\Lambda = \bigcap_i\Ker\ell_i$.

**Étape 2 (définition de $\mu$ sur $\Ima\Lambda$)**　Pour $z = \Lambda(x) \in \Ima\Lambda$, posons $\mu(z) = \ell(x)$. Cela ne dépend pas du choix de $x$ : si $\Lambda(x) = \Lambda(x')$, alors $x - x' \in \Ker\Lambda \subset \Ker\ell$, donc $\ell(x) = \ell(x')$. $\mu$ est linéaire sur $\Ima\Lambda$ : $\mu(\Lambda(x) + s\Lambda(x')) = \mu(\Lambda(x + sx')) = \ell(x) + s\ell(x')$.

**Étape 3 (prolongement)**　Soit $S$ un supplémentaire de $\Ima\Lambda$ dans $\R^p$ ; on pose $\mu = 0$ sur $S$, ce qui définit une forme linéaire $\mu$ sur $\R^p$. Avec $\lambda_i = \mu(e_i)$, on a $\mu(z) = \sum_i\lambda_iz_i$.

**Étape 4 (conclusion)**　Pour tout $x$, $\ell(x) = \mu(\Lambda(x)) = \sum_i\lambda_i\ell_i(x)$. **Unicité** : si $\sum_i\lambda_i\ell_i = \sum_i\lambda_i'\ell_i$, alors $\sum_i(\lambda_i - \lambda_i')\ell_i = 0$, d'où $\lambda_i = \lambda_i'$ par indépendance linéaire.
:::

::: thm id=lagrange zh="Lagrange 乘子定理" en="Lagrange multiplier theorem" fr="Théorème des extrema liés" ru="Метод множителей Лагранжа" lvl=1
设 $f, g_1, \dots, g_p : U \to \R$ 是 $\Cc^1$ 的，$M = \{x \in U : g_1(x) = \dots = g_p(x) = 0\}$。设 $a \in M$，$\dd g_1(a), \dots, \dd g_p(a)$ 线性无关。若 $f|_M$ 在 $a$ 处取局部极值，则存在唯一的一组实数 $\lambda_1, \dots, \lambda_p$（**Lagrange 乘子**），使
$$\nabla f(a) = \sum_{i=1}^p\lambda_i\nabla g_i(a)\qquad\big(\text{等价地 } \dd f(a) = \textstyle\sum_i\lambda_i\,\dd g_i(a)\big).$$
:::

::: fr
Soient $f, g_1, \dots, g_p : U \to \R$ de classe $\mathcal{C}^1$ et $M = \{x \in U : g_1(x) = \dots = g_p(x) = 0\}$. Soit $a \in M$ tel que $\dd g_1(a), \dots, \dd g_p(a)$ soient linéairement indépendantes. Si $f|_M$ admet un extremum local en $a$, alors il existe des réels $\lambda_1, \dots, \lambda_p$ uniques (**multiplicateurs de Lagrange**) tels que
$$\nabla f(a) = \sum_{i=1}^p\lambda_i\nabla g_i(a)\qquad\big(\text{de manière équivalente } \dd f(a) = \textstyle\sum_i\lambda_i\,\dd g_i(a)\big).$$
:::

::: proof
▷ 思路：由 {@tangent-ker}，约束集 $M$ 在 $a$ 处的切空间是 $\bigcap_i\Ker\dd g_i(a)$。$f$ 沿 $M$ 上任何经过 $a$ 的曲线在 $a$ 取极值，由一元 Fermat 引理，$\dd f(a)$ 在每个切向量上为零。最后用 {@c10-lem-formes}。

**第 1 步（约束的切空间）**　令 $g = (g_1, \dots, g_p) : U \to \R^p$，它是 $\Cc^1$ 的。$J_g(a)$ 的各行是 $\dd g_i(a)$ 的坐标，线性无关，所以 $\rg J_g(a) = p$，$\dd g(a)$ 满射。$M = M \cap U = g^{-1}(0)$。由 {@tangent-ker}（取 $d = n - p$），
$$T_aM = \Ker\dd g(a) = \bigcap_{i=1}^p\Ker\dd g_i(a).$$

**第 2 步（翻译极值假设）**　不妨设 $a$ 是 $f|_M$ 的局部极大点（极小时把 $f$ 换成 $-f$，乘子变号）：存在 $\rho > 0$，使对 $x \in M$，$\norm{x - a} < \rho \implies f(x) \le f(a)$。

**第 3 步（$\dd f(a)$ 在 $T_aM$ 上为零）**　设 $v \in T_aM$，$c : \,]-\eps, \eps[ \to M$ 是 $\Cc^1$ 曲线，$c(0) = a$，$c'(0) = v$。由 $c$ 在 $0$ 连续，存在 $\eps' \in \,]0, \eps]$，使 $\abs t < \eps'$ 时 $\norm{c(t) - a} < \rho$。于是 $\varphi = f \circ c$ 在开区间 $]-\eps', \eps'[$ 上满足 $\varphi(t) \le \varphi(0)$，即在 $0$ 取局部极大。由链式法则 $\varphi'(0) = \dd f(a)(v)$，由一元情形的 {@cn-extremum}，$\varphi'(0) = 0$。所以 $T_aM \subset \Ker\dd f(a)$。

**第 4 步（线性代数）**　由第 1、3 步，$\bigcap_i\Ker\dd g_i(a) \subset \Ker\dd f(a)$。由 {@c10-lem-formes}，存在唯一的 $\lambda_1, \dots, \lambda_p$ 使 $\dd f(a) = \sum_i\lambda_i\dd g_i(a)$。

**第 5 步（梯度形式）**　于是对一切 $h$，$\ps{\nabla f(a), h} = \sum_i\lambda_i\ps{\nabla g_i(a), h} = \ps{\sum_i\lambda_i\nabla g_i(a), h}$；由梯度的唯一性（{@c9-jacobienne}），$\nabla f(a) = \sum_i\lambda_i\nabla g_i(a)$。
:::

::: fr
▷ Méthode : d'après {@fr:tangent-ker}, l'espace tangent en $a$ à l'ensemble des contraintes $M$ est $\bigcap_i\Ker\dd g_i(a)$. Le long de toute courbe de $M$ passant par $a$, $f$ admet un extremum en $a$ ; par le lemme de Fermat en une variable, $\dd f(a)$ s'annule sur tout vecteur tangent. On conclut par {@fr:c10-lem-formes}.

**Étape 1 (espace tangent aux contraintes)**　Posons $g = (g_1, \dots, g_p) : U \to \R^p$, de classe $\mathcal{C}^1$. Les lignes de $J_g(a)$ sont les coordonnées des $\dd g_i(a)$, linéairement indépendantes, donc $\rg J_g(a) = p$ et $\dd g(a)$ est surjective. On a $M = M \cap U = g^{-1}(0)$. D'après {@fr:tangent-ker} (avec $d = n - p$),
$$T_aM = \Ker\dd g(a) = \bigcap_{i=1}^p\Ker\dd g_i(a).$$

**Étape 2 (on traduit l'hypothèse d'extremum)**　Quitte à remplacer $f$ par $-f$ (ce qui change le signe des multiplicateurs), supposons que $a$ est un maximum local de $f|_M$ : il existe $\rho > 0$ tel que pour $x \in M$, $\norm{x - a} < \rho \implies f(x) \le f(a)$.

**Étape 3 ($\dd f(a)$ s'annule sur $T_aM$)**　Soit $v \in T_aM$ et $c : \,]-\eps, \eps[ \to M$ une courbe de classe $\mathcal{C}^1$ avec $c(0) = a$, $c'(0) = v$. Par continuité de $c$ en $0$, il existe $\eps' \in \,]0, \eps]$ tel que $\norm{c(t) - a} < \rho$ pour $\abs t < \eps'$. Ainsi $\varphi = f \circ c$ vérifie $\varphi(t) \le \varphi(0)$ sur l'intervalle ouvert $]-\eps', \eps'[$ : elle admet un maximum local en $0$. Par la règle de la chaîne $\varphi'(0) = \dd f(a)(v)$, et d'après {@fr:cn-extremum} en une variable, $\varphi'(0) = 0$. Donc $T_aM \subset \Ker\dd f(a)$.

**Étape 4 (algèbre linéaire)**　D'après les étapes 1 et 3, $\bigcap_i\Ker\dd g_i(a) \subset \Ker\dd f(a)$. D'après {@fr:c10-lem-formes}, il existe des $\lambda_1, \dots, \lambda_p$ uniques tels que $\dd f(a) = \sum_i\lambda_i\dd g_i(a)$.

**Étape 5 (forme gradient)**　Pour tout $h$, $\ps{\nabla f(a), h} = \sum_i\lambda_i\ps{\nabla g_i(a), h} = \ps{\sum_i\lambda_i\nabla g_i(a), h}$ ; par unicité du gradient ({@fr:c9-jacobienne}), $\nabla f(a) = \sum_i\lambda_i\nabla g_i(a)$.
:::

::: rem zh="几何解释"
$p = 1$、$n = 2$ 时：在约束曲线 $g = 0$ 上移动，$f$ 的极值点出现在 $f$ 的等高线与约束曲线**相切**的地方，即 $\nabla f$ 与 $\nabla g$ 平行（两者都垂直于曲线的切线，{@gradient-geometrie}）。若在某点 $\nabla f$ 与 $\nabla g$ 不平行，$\nabla f$ 在切线方向上有非零分量，沿曲线朝这个方向走 $f$ 增加、反方向走 $f$ 减少，不可能是极值。条件 $\nabla g(a) \ne 0$ 保证约束曲线在 $a$ 处光滑。
:::

::: rem
**条件的必要性与结论的局限。**

1. **正则性条件不能去掉。** 在尖点曲线 $M = \{y^2 = x^3\}$ 上最小化 $f(x, y) = x$：在 $M$ 上 $x^3 = y^2 \ge 0$，所以 $x \ge 0 = f(0, 0)$，原点是最小点。但 $\nabla g(0, 0) = (-3x^2, 2y)|_{(0,0)} = (0, 0)$，而 $\nabla f = (1, 0)$ 不是 $\nabla g(0,0)$ 的倍数：结论失效。
2. **只是必要条件。** $M = \R \times \{0\}$（$g(x, y) = y$），$f(x, y) = x^3$：在原点 $\nabla f = 0 = 0\cdot\nabla g$，但 $f|_M = x^3$ 在 $0$ 不取极值。
3. **Lagrange 函数**：令 $\mathcal{L}(x, \lambda) = f(x) - \sum_i\lambda_ig_i(x)$。定理的条件加上约束，恰好是 $\mathcal{L}$ 关于 $(x, \lambda)$ 的临界点方程：$\nabla_x\mathcal{L} = 0$，$\partial_{\lambda_i}\mathcal{L} = -g_i = 0$。
:::

::: method zh="Lagrange 乘子法的使用"
1. **验证约束是正则的**：在 $M$ 的每一点（或至少在候选点），各 $\nabla g_i$ 线性无关；不正则的点要单独列为候选点。
2. **解方程组** $\nabla f = \sum\lambda_i\nabla g_i$，$g_i = 0$（$n + p$ 个未知数 $x, \lambda$，$n + p$ 个方程）。技巧：先消去 $\lambda$（如对两个分量作差、作比）。
3. **判断**：定理只给出必要条件。若 $M$ 是紧集，最值存在（{@image-compact}），在全部候选点中比较函数值即可；若 $M$ 不紧，要另外论证（例如 $f \to \infty$ 的行为）。
4. **不等式与边界**：若约束集还有边界（如 $x_i \ge 0$），边界上的点要单独讨论。
:::

::: ex id=c10-ex-lagrange-cercle zh="两个约束：球面与平面的交线" lvl=1
求 $f(x, y, z) = z$ 在 $M = \{x^2 + y^2 + z^2 = 1,\ x + y + z = 1\}$ 上的最值。

1. **存在**：$M$ 是有界闭集，非空（$(1, 0, 0) \in M$），所以紧；$f$ 连续，最值存在。
2. **正则性**：$g_1 = x^2 + y^2 + z^2 - 1$，$g_2 = x + y + z - 1$，$\nabla g_1 = 2(x, y, z)$，$\nabla g_2 = (1, 1, 1)$。在球面上 $(x, y, z) \ne 0$，两者线性相关当且仅当 $x = y = z$；代入平面得 $x = \frac13$，但 $3\cdot\frac19 = \frac13 \ne 1$，不在球面上。所以 $M$ 上处处正则。
3. **方程**：$(0, 0, 1) = \lambda(2x, 2y, 2z) + \mu(1, 1, 1)$，即 $2\lambda x + \mu = 0$，$2\lambda y + \mu = 0$，$2\lambda z + \mu = 1$。前两式相减：$\lambda(x - y) = 0$。若 $\lambda = 0$，则 $\mu = 0$，第三式给出 $0 = 1$，矛盾；所以 $x = y$。约束化为 $2x + z = 1$，$2x^2 + z^2 = 1$；代入 $z = 1 - 2x$ 得 $6x^2 - 4x = 0$，$x \in \{0, \frac23\}$。候选点：$(0, 0, 1)$ 与 $(\frac23, \frac23, -\frac13)$。
4. **比较**：最大值 $1$（在 $(0, 0, 1)$），最小值 $-\frac13$（在 $(\frac23, \frac23, -\frac13)$）。
:::

::: ex id=ex-agm-lagrange zh="用 Lagrange 乘子证明 AM-GM 不等式" lvl=1
在 $M = \{x \in (\R_+^*)^n : x_1 + \dots + x_n = n\}$ 上最大化 $f(x) = x_1x_2\cdots x_n$。

1. **最大值存在且在 $M$ 中取到**：$\overline M = \{x \in \R_+^n : \sum x_i = n\}$ 是有界闭集，因而紧，$f$ 在其上连续，最大值存在（{@image-compact}）。在 $\overline M \setminus M$ 上（某个 $x_i = 0$）$f = 0$，而 $f(1, \dots, 1) = 1 > 0$，所以最大值在某点 $a \in M$ 取到，$a$ 是 $f|_M$ 的局部极大点。
2. **Lagrange 条件**：$U = (\R_+^*)^n$ 开，$g(x) = \sum x_i - n$，$\nabla g = (1, \dots, 1) \ne 0$。由 {@lagrange}，存在 $\lambda$ 使 $\partial_if(a) = \prod_{j \ne i}a_j = \frac{f(a)}{a_i} = \lambda$ 对一切 $i$ 成立。$f(a) > 0$，所以 $\lambda > 0$ 且 $a_i = \frac{f(a)}\lambda$ 全部相等；由 $\sum a_i = n$ 得 $a = (1, \dots, 1)$，最大值为 $1$。并且最大值**只**在 $(1, \dots, 1)$ 取到（任何最大点都满足同样的条件）。
3. **齐次化**：设 $y \in \R_+^n$，$s = \sum y_i > 0$。令 $x = \frac nsy \in \overline M$，则 $\prod\frac{ny_i}{s} \le 1$，即
   $$\sqrt[n]{y_1\cdots y_n} \le \frac{y_1 + \dots + y_n}{n},$$
   等号当且仅当 $x = (1, \dots, 1)$，即 $y_1 = \dots = y_n$。（$s = 0$ 时两边都是 $0$。）
:::

::: ex id=ex-spectral-lagrange zh="谱定理" lvl=1
设 $S$ 是 $n \times n$ 实对称矩阵，在单位球面 $S^{n-1}$ 上最大化 $f(x) = x^TSx$。

1. **存在**：$S^{n-1}$ 紧，最大值在某点 $a$ 取到。
2. **Lagrange 条件**：由 {@diff-bilineaire}（见第 9 章运算法则一节末的「想一想」），$\nabla f(x) = (S + S^T)x = 2Sx$；$g(x) = \norm x^2 - 1$，$\nabla g(a) = 2a \ne 0$。由 {@lagrange}，$2Sa = 2\lambda a$，即 $Sa = \lambda a$：$a$ 是 $S$ 的特征向量，且 $\lambda = a^TSa = f(a)$ 是 $f$ 在球面上的最大值，因此是 $S$ 的最大特征值（任何单位特征向量 $u$ 满足 $u^TSu = $ 特征值 $\le f(a)$）。
3. **归纳**：$a^\perp$ 是 $S$ 的不变子空间：若 $\ps{x, a} = 0$，则 $\ps{Sx, a} = \ps{x, Sa} = \lambda\ps{x, a} = 0$。$S$ 在 $a^\perp$（$n - 1$ 维，带诱导内积）上的限制仍是对称的，对维数归纳，它有由特征向量组成的标准正交基；加上 $a$，得到 $\R^n$ 的标准正交特征基。

这是「实对称矩阵可以正交对角化」的一个分析证明。
:::

::: thm id=kkt zh="Karush–Kuhn–Tucker 条件" en="Karush–Kuhn–Tucker conditions" fr="Conditions de Karush–Kuhn–Tucker" ru="Условия Каруша–Куна–Таккера" lvl=3 ref="Boyd–Vandenberghe, *Convex Optimization*，§5.5"
在不等式约束 $h_j(x) \le 0$（$1 \le j \le m$，$f, h_j$ 为 $\Cc^1$）下最小化 $f$。在适当的正则性条件（**约束规范**，例如在 $a$ 处取等号的约束的梯度线性无关）下，若 $a$ 是局部极小点，则存在 $\mu_j \ge 0$，使
$$\nabla f(a) + \sum_j\mu_j\nabla h_j(a) = 0,\qquad \mu_jh_j(a) = 0\quad\text{（**互补松弛**）}.$$
这是线性规划、凸优化与机器学习（支持向量机）的理论基础。
:::

::: fr
On minimise $f$ sous les contraintes d'inégalité $h_j(x) \le 0$ ($1 \le j \le m$, $f$ et $h_j$ de classe $\mathcal{C}^1$). Sous une condition de régularité convenable (**qualification des contraintes**, par exemple l'indépendance linéaire des gradients des contraintes actives en $a$), si $a$ est un minimum local, il existe des $\mu_j \ge 0$ tels que
$$\nabla f(a) + \sum_j\mu_j\nabla h_j(a) = 0,\qquad \mu_jh_j(a) = 0\quad\text{(**complémentarité**)}.$$
C'est le fondement théorique de la programmation linéaire, de l'optimisation convexe et de l'apprentissage automatique (machines à vecteurs de support).
:::

::: q
在双曲线的一支 $M = \{xy = 1,\ x > 0\}$ 上，Lagrange 乘子法对 $f(x, y) = x + y$ 给出什么？它是最大值还是最小值？
:::

::: ans
$g = xy - 1$，$\nabla g = (y, x) \ne 0$。条件 $(1, 1) = \lambda(y, x)$ 给出 $x = y$，与 $xy = 1$、$x > 0$ 联立得唯一候选点 $(1, 1)$，$f = 2$。$M$ 不紧，不能直接下结论：在 $M$ 上 $f = x + \frac1x = 2 + \frac{(x - 1)^2}{x} \ge 2$，所以 $(1, 1)$ 是全局最小点；而 $f(x, \frac1x) \to +\infty$（$x \to +\infty$），没有最大值。
:::

## 拓展

两个以局部逆定理为基础的深入结果：Morse 引理说非退化临界点附近的函数「就是」它的二次部分；Sard 定理说「几乎所有」水平集都是子流形。

::: thm id=morse zh="Morse 引理" en="Morse lemma" fr="Lemme de Morse" ru="Лемма Морса" lvl=3 ref="Milnor, *Morse Theory*，引理 2.2"
若 $a$ 是 $\Cc^\infty$ 函数 $f : U \to \R$ 的**非退化**临界点（$\nabla f(a) = 0$，$H_f(a)$ 可逆），则存在 $a$ 的开邻域 $V$ 和 $\Cc^\infty$ 微分同胚 $y = \Phi(x)$（$\Phi(a) = 0$），使在 $V$ 上
$$f = f(a) - y_1^2 - \dots - y_k^2 + y_{k+1}^2 + \dots + y_n^2.$$
$k$（$H_f(a)$ 的负特征值个数）称为临界点的**指标**。因此非退化临界点附近 $f$ 的行为完全由 Hessian 矩阵的符号差决定；{@cs-extremum} 的第 2、3 条（在非退化、$\Cc^\infty$ 的情形）可以直接从这个标准形读出。
:::

::: fr
Si $a$ est un point critique **non dégénéré** d'une fonction $f : U \to \R$ de classe $\mathcal{C}^\infty$ ($\nabla f(a) = 0$, $H_f(a)$ inversible), il existe un voisinage ouvert $V$ de $a$ et un $\mathcal{C}^\infty$-difféomorphisme $y = \Phi(x)$ ($\Phi(a) = 0$) tels que, sur $V$,
$$f = f(a) - y_1^2 - \dots - y_k^2 + y_{k+1}^2 + \dots + y_n^2.$$
L'entier $k$ (nombre de valeurs propres négatives de $H_f(a)$) est l'**indice** du point critique. Le comportement de $f$ près d'un point critique non dégénéré est donc entièrement déterminé par la signature de la hessienne ; les points 2 et 3 de {@fr:cs-extremum} (dans le cas non dégénéré et $\mathcal{C}^\infty$) se lisent directement sur cette forme normale.
:::

::: thm id=sard zh="Sard 定理" en="Sard's theorem" fr="Théorème de Sard" ru="Теорема Сарда" lvl=3 ref="Milnor, *Topology from the Differentiable Viewpoint*，§2–3"
若 $f : \R^n \to \R^p$ 是 $\Cc^\infty$ 的，则 $f$ 的**临界值**（使 $\dd f(x)$ 不是满射的点 $x$ 的像 $f(x)$）构成 Lebesgue 零测集。推论：对「几乎所有」$c \in \R^p$，水平集 $f^{-1}(c)$ 是 $n - p$ 维子流形或空集（由 {@def-sous-variete}，因为 $f^{-1}(c)$ 的每一点都使 $\dd f$ 满射）。
:::

::: fr
Si $f : \R^n \to \R^p$ est de classe $\mathcal{C}^\infty$, l'ensemble des **valeurs critiques** de $f$ (images $f(x)$ des points $x$ où $\dd f(x)$ n'est pas surjective) est négligeable au sens de Lebesgue. Corollaire : pour « presque tout » $c \in \R^p$, la ligne de niveau $f^{-1}(c)$ est une sous-variété de dimension $n - p$ ou est vide (d'après {@fr:def-sous-variete}, puisque $\dd f$ est surjective en tout point de $f^{-1}(c)$).
:::

::: q
$f(x, y) = x^2 - y^2$ 与 $f(x, y) = xy$ 在原点的临界点指标各是多少？$f = xy$ 的水平集 $f^{-1}(c)$ 何时是子流形？
:::

::: ans
两者的 Hessian 分别是 $\operatorname{diag}(2, -2)$ 与 $\begin{pmatrix}0 & 1\\ 1 & 0\end{pmatrix}$（特征值 $\pm1$），都可逆、各有一个负特征值，指标都是 $1$（鞍点）。实际上 $xy = \big(\frac{x + y}2\big)^2 - \big(\frac{x - y}2\big)^2$，线性坐标变换就把它化成 Morse 标准形。$\nabla(xy) = (y, x)$ 只在原点为零，唯一的临界值是 $0$：对 $c \ne 0$，$\{xy = c\}$ 是 $1$ 维子流形（双曲线）；$\{xy = 0\}$ 不是（{@c10-cex-non-sous-varietes}）。
:::

## 方法总结

**如何证明一个映射是（局部）微分同胚？**

1. **局部**：在 $a$ 处 $\det J_f(a) \ne 0$ ⇒ $f$ 是 $a$ 附近的 $\Cc^k$ 微分同胚（{@inversion-locale}）。
2. **整体**：$f$ 是 $\Cc^k$ 单射且 $\det J_f$ 处处非零 ⇒ $f$ 是到开集 $f(U)$ 的微分同胚（{@inversion-globale}）；单射性往往要单独证明，或者直接写出逆映射（{@polaires}）。$\R^n$ 到自身且为真映射时可用 Hadamard 定理（{@hadamard-global}）。
3. **否定**：某点 $\det J_f = 0$ ⇒ 在该点附近不是 $\Cc^1$ 微分同胚（{@c10-diffeo-diff}）；找到 $p \ne q$ 使 $f(p) = f(q)$ ⇒ 不是单射。

**如何用隐函数定理？**

1. 把问题写成 $g(x, y) = 0$，检查 $g(a, b) = 0$ 与 $\partial_yg(a, b)$ 可逆（$p = 1$ 时即 $\partial g/\partial y \ne 0$）（{@fonctions-implicites}）。
2. 求导数不需要显式解：对 $g(x, \varphi(x)) = 0$ 求导（「求隐函数的导数」的方法）。
3. 要得到整体的解，先用单调性等论证整体存在唯一，再用定理得到局部光滑性（$y^5 + y + x = 0$ 的「想一想」）。

**如何证明一个集合是子流形，如何求切空间？**

1. 写成 $g^{-1}(0)$ 并验证 $\dd g$ 在每一点满射（{@def-sous-variete}）；或写成光滑图像、正则参数化（{@sous-variete-equiv}）。
2. 切空间：$T_aM = \Ker\dd g(a)$ 或 $\Ima\dd\gamma(u_0)$（{@tangent-ker}）。
3. 否定：在可疑点找出多于 $d$ 个线性无关的切向量（{@c10-cex-non-sous-varietes}）。

**如何求条件极值？**

1. 检验约束的正则性，不正则的点单独列为候选点。
2. 解 $\nabla f = \sum\lambda_i\nabla g_i$，$g_i = 0$（{@lagrange}，{@c10-ex-lagrange-cercle}）。
3. 紧集上比较候选点的函数值；非紧时另外论证（{@ex-agm-lagrange} 用紧化，双曲线的「想一想」用直接估计）。

::: rem
**常见错误。**

1. **把局部可逆当成整体可逆。** $\det J_f$ 处处非零不推出单射：$z \mapsto z^2$ 在 $\R^2 \setminus \{0\}$ 上，极坐标在 $]0, +\infty[ \times \R$ 上。
2. **隐函数定理的条件与结论。** 忘记检查 $\partial_yg(a, b)$ 可逆（$y^3 = x$、$y^2 = x^2$）；或以为解在 $(a, b)$ 的整个邻域里唯一，而唯一性只在乘积邻域 $V \times W$ 中成立（圆的下半支）。
3. **Lagrange 乘子法的三个陷阱。** 约束不正则时条件可能不成立（尖点 $y^2 = x^3$）；条件只是必要的（$x^3$ 在 $x$ 轴上）；$M$ 不紧时候选点不一定是最值（$xy = 1$ 上的 $x + y$ 没有最大值）。
4. **单射浸入的像不一定是子流形**（8 字形，{@c10-cex-non-sous-varietes}）：参数化的定义要求 $\gamma$ 是到像的同胚。
5. **维数与方程个数**：$\R^n$ 中 $d$ 维子流形由 $n - d$ 个方程定义；Lagrange 定理中 $p$ 个约束对应 $n - p$ 维的约束集。
:::

::: read
- В. А. Зорич,《Математический анализ》，第 1 卷（Теорема о неявной функции; поверхности в $\R^n$; условный экстремум）。隐函数定理、$\R^n$ 中的曲面与条件极值讲得最系统，几何直观与严格证明并重。
- Б. П. Демидович,《Сборник задач и упражнений по математическому анализу》（Неявные функции, замена переменных, условный экстремум）。大量隐式求导与 Lagrange 乘子法的计算题。
- H. Cartan,《Calcul différentiel》（Hermann）。在 Banach 空间中证明局部逆定理与隐函数定理，用的正是本章的压缩映射方法。
- F. Rouvière,《Petit guide de calcul différentiel à l'usage de la licence et de l'agrégation》（Cassini）。局部逆、子流形、条件极值与 Morse 引理都有详细的例子和习题。
- J. Lafontaine,《Introduction aux variétés différentielles》（EDP Sciences）。从 $\R^n$ 的子流形过渡到抽象流形，是本章第 3 节的自然延续。
- S. G. Krantz, H. R. Parks,《The Implicit Function Theorem: History, Theory, and Applications》（Birkhäuser）。隐函数定理的历史与各种变体（包括 Hadamard 整体逆定理）。
:::

::: glossary
| 中文 | Français | English | Русский |
|---|---|---|---|
| 微分同胚 | difféomorphisme (m.) | diffeomorphism | диффеоморфизм |
| 局部微分同胚 | difféomorphisme local (m.) | local diffeomorphism | локальный диффеоморфизм |
| 局部逆定理 | théorème d'inversion locale (m.) | inverse function theorem | теорема об обратном отображении |
| 整体逆定理 | théorème d'inversion globale (m.) | global inverse function theorem | глобальная теорема об обратном отображении |
| 压缩映射 | application contractante (f.) | contraction mapping | сжимающее отображение |
| 不动点 | point fixe (m.) | fixed point | неподвижная точка |
| 真映射 | application propre (f.) | proper map | собственное отображение |
| 同胚 | homéomorphisme (m.) | homeomorphism | гомеоморфизм |
| 隐函数定理 | théorème des fonctions implicites (m.) | implicit function theorem | теорема о неявной функции |
| 隐函数 | fonction implicite (f.) | implicit function | неявная функция |
| 偏微分 | différentielle partielle (f.) | partial differential | частный дифференциал |
| 子流形 | sous-variété (f.) | submanifold | подмногообразие |
| 淹没 | submersion (f.) | submersion | субмерсия |
| 浸入 | immersion (f.) | immersion | иммерсия, погружение |
| 参数化 | paramétrage (m.) | parametrisation | параметризация |
| 图像 | graphe (m.) | graph | график |
| 平直化 | redressement (m.) | straightening | выпрямление |
| 切向量 | vecteur tangent (m.) | tangent vector | касательный вектор |
| 切空间 | espace tangent (m.) | tangent space | касательное пространство |
| 秩 | rang (m.) | rank | ранг |
| 秩定理（秩–零化度） | théorème du rang (m.) | rank–nullity theorem | теорема о ранге |
| 正交群 | groupe orthogonal (m.) | orthogonal group | ортогональная группа |
| 反对称矩阵 | matrice antisymétrique (f.) | skew-symmetric matrix | кососимметрическая матрица |
| 条件极值 | extremum lié (m.) | constrained extremum | условный экстремум |
| 约束 | contrainte (f.) | constraint | ограничение, связь |
| Lagrange 乘子 | multiplicateur de Lagrange (m.) | Lagrange multiplier | множитель Лагранжа |
| Lagrange 函数 | lagrangien (m.) | Lagrangian | функция Лагранжа |
| 线性形式 | forme linéaire (f.) | linear form | линейная форма |
| 补空间 | supplémentaire (m.) | complementary subspace | дополнительное подпространство |
| 约束规范 | qualification des contraintes (f.) | constraint qualification | условие регулярности ограничений |
| 互补松弛 | complémentarité (f.) | complementary slackness | условие дополняющей нежёсткости |
| 非退化临界点 | point critique non dégénéré (m.) | non-degenerate critical point | невырожденная критическая точка |
| 指标 | indice (m.) | index | индекс |
| 临界值 | valeur critique (f.) | critical value | критическое значение |
| 正则值 | valeur régulière (f.) | regular value | регулярное значение |
| 零测集 | ensemble négligeable (m.) | null set | множество меры нуль |
| 二重点 | point double (m.) | double point | двойная точка |
| Descartes 叶形线 | folium de Descartes (m.) | folium of Descartes | декартов лист |
| 极坐标 | coordonnées polaires (f. pl.) | polar coordinates | полярные координаты |
| 算术–几何平均不等式 | inégalité arithmético-géométrique (f.) | AM–GM inequality | неравенство между средним арифметическим и средним геометрическим |
| 谱定理 | théorème spectral (m.) | spectral theorem | спектральная теорема |
| Jacobian 猜想 | conjecture jacobienne (f.) | Jacobian conjecture | гипотеза о якобиане |
| 缩小邻域 | restreindre le voisinage | shrink the neighbourhood | уменьшить окрестность |
:::
