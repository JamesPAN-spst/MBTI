幂级数是最重要的一类函数项级数：它们在收敛圆盘内部有极好的性质（正规收敛、无穷次可导、可以逐项运算），并且大部分初等函数都能写成幂级数。法国大纲用幂级数**定义**复指数函数，并由此严格地定义 $\cos$、$\sin$ 和 $\pi$。全章 $(a_n)$ 是复数列，$z$ 是复变量。

**记号与约定。** **幂级数** $\sum a_n z^n$ 是函数项级数 $\sum f_n$，其中 $f_n(z) = a_n z^n$（约定 $z^0 = 1$，包括 $z = 0$）；$a_n$ 称为它的**系数**。$D(0, r) = \{z \in \C : \abs z < r\}$ 是开圆盘，$\overline{D}(0, r) = \{\abs z \le r\}$ 是闭圆盘（$r = +\infty$ 时 $D(0, r) = \C$）。在 $[0, +\infty]$ 中约定 $\frac10 = +\infty$，$\frac1{+\infty} = 0$。本章大量使用第 3 章的结论（正规收敛 {@normale-unif}、交换定理 {@transferts-series}）。

## 收敛半径

一个幂级数在哪些点收敛？下面的 Abel 引理说明：只要在一点 $z_0$ 处「通项有界」，在更小的圆盘里就绝对收敛。于是收敛的点几乎恰好构成一个圆盘，它的半径就是收敛半径。

::: lem id=lemme-abel zh="Abel 引理" en="Abel's lemma" fr="Lemme d'Abel" ru="Лемма Абеля" lvl=1
设 $z_0 \in \C$，且数列 $(a_n z_0^n)$ 有界。则对一切 $\abs{z} < \abs{z_0}$，$\sum a_n z^n$ 绝对收敛。更精确地，对每个 $0 \le r < \abs{z_0}$，$\sum a_n z^n$ 在闭圆盘 $\overline{D}(0, r)$ 上正规收敛。
:::

::: fr
Soit $z_0 \in \C$ tel que la suite $(a_n z_0^n)$ soit bornée. Alors pour tout $\abs{z} < \abs{z_0}$, la série $\sum a_n z^n$ converge absolument. Plus précisément, pour tout $0 \le r < \abs{z_0}$, la série $\sum a_n z^n$ converge normalement sur le disque fermé $\overline{D}(0, r)$.
:::

::: proof
▷ 思路：把 $a_n z^n$ 写成 $a_n z_0^n \cdot (z / z_0)^n$：前一个因子有界，后一个是公比小于 $1$ 的几何数列。

若 $z_0 = 0$，不存在 $\abs z < 0$ 的 $z$，也不存在 $0 \le r < 0$，无需证明。设 $z_0 \ne 0$。

**第 1 步（翻译假设）**　存在 $M \ge 0$，使对一切 $n$，$\abs{a_n z_0^n} \le M$。

**第 2 步（与几何级数比较）**　设 $0 \le r < \abs{z_0}$，令 $q = \frac{r}{\abs{z_0}} \in [0, 1[$。对一切 $\abs{z} \le r$ 与一切 $n$，
$$\abs{a_n z^n} = \abs{a_n z_0^n} \cdot \Big|\frac{z}{z_0}\Big|^n \le M q^n.$$

**第 3 步（正规收敛）**　上界 $Mq^n$ 与 $z$ 无关，且 $\sum M q^n$ 是公比 $q \in [0, 1[$ 的几何级数，收敛。由正规收敛的定义（{@def-cv-normale}），$\sum a_n z^n$ 在 $\overline{D}(0, r)$ 上正规收敛；特别地，对每个 $\abs z \le r$，$\sum \abs{a_n z^n}$ 收敛。

**第 4 步（结论）**　若 $\abs{z} < \abs{z_0}$，取 $r = \abs z$，由第 3 步，$\sum a_n z^n$ 绝对收敛。
:::

::: fr
▷ Méthode : on écrit $a_n z^n = a_n z_0^n \cdot (z / z_0)^n$ : le premier facteur est borné, le second est une suite géométrique de raison de module $< 1$.

Si $z_0 = 0$, il n'existe ni $z$ tel que $\abs z < 0$, ni $r$ tel que $0 \le r < 0$ : il n'y a rien à montrer. Supposons $z_0 \ne 0$.

**Étape 1 (on traduit l'hypothèse)**　Il existe $M \ge 0$ tel que pour tout $n$, $\abs{a_n z_0^n} \le M$.

**Étape 2 (comparaison à une série géométrique)**　Soit $0 \le r < \abs{z_0}$ ; posons $q = \frac{r}{\abs{z_0}} \in [0, 1[$. Pour tout $\abs{z} \le r$ et tout $n$,
$$\abs{a_n z^n} = \abs{a_n z_0^n} \cdot \Big|\frac{z}{z_0}\Big|^n \le M q^n.$$

**Étape 3 (convergence normale)**　Le majorant $Mq^n$ ne dépend pas de $z$, et $\sum M q^n$ est une série géométrique de raison $q \in [0, 1[$, donc convergente. Par définition ({@fr:def-cv-normale}), $\sum a_n z^n$ converge normalement sur $\overline{D}(0, r)$ ; en particulier, pour tout $\abs z \le r$, $\sum \abs{a_n z^n}$ converge.

**Étape 4 (conclusion)**　Si $\abs{z} < \abs{z_0}$, on prend $r = \abs z$ : d'après l'étape 3, $\sum a_n z^n$ converge absolument.
:::

::: def id=def-rayon zh="收敛半径" en="Radius of convergence" fr="Rayon de convergence" ru="Радиус сходимости"
幂级数 $\sum a_n z^n$ 的**收敛半径**是
$$R = \sup I, \qquad I = \{r \ge 0 : (a_n r^n)_n \text{ 有界}\}, \qquad R \in [0, +\infty].$$
$D(0, R)$ 称为**收敛圆盘**；实变量时 $]-R, R[$ 称为**收敛区间**。

白话：$R$ 是「通项 $a_n r^n$ 还能保持有界」的最大半径。$I$ 含 $0$（$n \ge 1$ 时 $a_n 0^n = 0$），所以非空；$I$ 是区间：若 $r \in I$ 且 $0 \le r' \le r$，则 $\abs{a_n} r'^n \le \abs{a_n} r^n$，故 $r' \in I$。因此 $I$ 是 $[0, R[$ 或 $[0, R]$（$R = +\infty$ 时为 $[0, +\infty[$）。
:::

::: fr
Le **rayon de convergence** de la série entière $\sum a_n z^n$ est
$$R = \sup I, \qquad I = \{r \ge 0 : (a_n r^n)_n \text{ est bornée}\}, \qquad R \in [0, +\infty].$$
$D(0, R)$ est le **disque ouvert de convergence** ; pour une variable réelle, $]-R, R[$ est l'**intervalle ouvert de convergence**.

Autrement dit, $R$ est le plus grand rayon pour lequel le terme général $a_n r^n$ reste borné. L'ensemble $I$ contient $0$ (car $a_n 0^n = 0$ pour $n \ge 1$), donc il est non vide ; c'est un intervalle : si $r \in I$ et $0 \le r' \le r$, alors $\abs{a_n} r'^n \le \abs{a_n} r^n$, donc $r' \in I$. Ainsi $I$ vaut $[0, R[$ ou $[0, R]$ (et $[0, +\infty[$ si $R = +\infty$).
:::

::: ex id=c4-ex-rayon-def lvl=1
直接用定义计算：

1. $\sum z^n$：$(r^n)$ 有界 $\iff r \le 1$，$I = [0, 1]$，$R = 1$。
2. $\sum n z^n$：$r = 1$ 时 $(n)$ 无界；$r < 1$ 时 $n r^n \to 0$（比值 $\frac{(n+1)r}{n} \to r < 1$），有界。所以 $I = [0, 1[$，$R = 1$。与第 1 条对照：端点 $R$ 可能属于 $I$，也可能不属于。
3. $\sum \frac{z^n}{n!}$：对任意 $r \ge 0$，$u_n = \frac{r^n}{n!}$ 满足：当 $n \ge 2r$ 时 $\frac{u_{n+1}}{u_n} = \frac{r}{n+1} \le \frac12$，所以 $u_n \to 0$，有界。$I = [0, +\infty[$，$R = +\infty$。
4. $\sum n!\, z^n$：对任意 $r > 0$，$u_n = n!\,r^n$ 满足：当 $n \ge 2/r$ 时 $\frac{u_{n+1}}{u_n} = (n+1)r \ge 2$，所以 $u_n \to +\infty$，无界。$I = \{0\}$，$R = 0$：级数只在 $z = 0$ 处收敛。
:::

::: thm id=rayon-carac zh="收敛半径的刻画" en="Behaviour inside and outside the disc of convergence" fr="Comportement dans et hors du disque de convergence" ru="Поведение степенного ряда внутри и вне круга сходимости" lvl=1
设 $R$ 是 $\sum a_n z^n$ 的收敛半径。

1. 若 $\abs{z} < R$，$\sum a_n z^n$ 绝对收敛；
2. 若 $\abs{z} > R$，$(a_n z^n)$ 无界，$\sum a_n z^n$ 粗发散；
3. 在圆周 $\abs{z} = R$ 上可能出现任何情况。
:::

::: fr
Soit $R$ le rayon de convergence de $\sum a_n z^n$.

1. Si $\abs{z} < R$, la série $\sum a_n z^n$ converge absolument ;
2. si $\abs{z} > R$, la suite $(a_n z^n)$ n'est pas bornée et $\sum a_n z^n$ diverge grossièrement ;
3. sur le cercle $\abs{z} = R$, tous les comportements sont possibles.
:::

::: proof
▷ 思路：1 用上确界的刻画在 $I$ 中找一个比 $\abs z$ 大的 $r$，再用 Abel 引理；2 是上确界「是上界」的直接翻译；3 给三个例子。

**1.**　若 $R = 0$，没有 $\abs z < 0$ 的 $z$。设 $\abs{z} < R$。$R = \sup I$ 且 $\abs z < R$，所以 $\abs z$ 不是 $I$ 的上界：存在 $r \in I$ 使 $\abs z < r$。$(a_n r^n)$ 有界，由 Abel 引理（{@lemme-abel}，取 $z_0 = r$），$\sum a_n z^n$ 绝对收敛。

**2.**　若 $R = +\infty$，没有 $\abs z > R$ 的 $z$。设 $\abs z > R$。$R$ 是 $I$ 的上界，所以 $\abs z \notin I$：数列 $(a_n \abs{z}^n)$ 无界。而 $\abs{a_n z^n} = \abs{a_n}\abs{z}^n$，所以 $(a_n z^n)$ 无界，特别地不趋于 $0$；由 {@cn-grossiere}，级数粗发散。

**3.**　三个 $R = 1$ 的例子（$R = 1$ 的验证与 {@c4-ex-rayon-def} 第 1、2 条相同：$(r^n/n^2)$、$(r^n/n)$ 有界当且仅当 $r \le 1$）。

- $\sum z^n$：$\abs z = 1$ 时 $\abs{z^n} = 1 \not\to 0$，在圆周上**处处发散**。
- $\sum \frac{z^n}{n^2}$：$\abs z = 1$ 时 $\abs{\frac{z^n}{n^2}} = \frac{1}{n^2}$，在圆周上**处处绝对收敛**。
- $\sum_{n \ge 1} \frac{z^n}{n}$：$z = 1$ 时是调和级数，发散；$z = \e^{\ii\theta}$，$\theta \notin 2\pi\Z$ 时收敛（{@ex-sin-n}）但不绝对收敛。**有的点发散，有的点半收敛**。
:::

::: fr
▷ Méthode : pour 1, la caractérisation de la borne supérieure fournit un $r \in I$ plus grand que $\abs z$, puis on applique le lemme d'Abel ; 2 traduit directement le fait que la borne supérieure est un majorant ; pour 3, on donne trois exemples.

**1.**　Si $R = 0$, il n'existe pas de $z$ tel que $\abs z < 0$. Soit $\abs{z} < R$. Comme $R = \sup I$ et $\abs z < R$, le réel $\abs z$ ne majore pas $I$ : il existe $r \in I$ tel que $\abs z < r$. La suite $(a_n r^n)$ est bornée ; d'après le lemme d'Abel ({@fr:lemme-abel}, avec $z_0 = r$), $\sum a_n z^n$ converge absolument.

**2.**　Si $R = +\infty$, il n'existe pas de $z$ tel que $\abs z > R$. Soit $\abs z > R$. Comme $R$ majore $I$, $\abs z \notin I$ : la suite $(a_n \abs{z}^n)$ n'est pas bornée. Or $\abs{a_n z^n} = \abs{a_n}\abs{z}^n$, donc $(a_n z^n)$ n'est pas bornée et, en particulier, ne tend pas vers $0$ ; d'après {@fr:cn-grossiere}, la série diverge grossièrement.

**3.**　Trois exemples de rayon $1$ (le calcul de $R = 1$ est le même qu'aux points 1 et 2 de {@fr:c4-ex-rayon-def} : $(r^n/n^2)$ et $(r^n/n)$ sont bornées si et seulement si $r \le 1$).

- $\sum z^n$ : pour $\abs z = 1$, $\abs{z^n} = 1 \not\to 0$ ; la série **diverge en tout point** du cercle.
- $\sum \frac{z^n}{n^2}$ : pour $\abs z = 1$, $\abs{\frac{z^n}{n^2}} = \frac{1}{n^2}$ ; la série **converge absolument en tout point** du cercle.
- $\sum_{n \ge 1} \frac{z^n}{n}$ : en $z = 1$ c'est la série harmonique, divergente ; en $z = \e^{\ii\theta}$, $\theta \notin 2\pi\Z$, elle converge ({@fr:ex-sin-n}) sans converger absolument. **Divergence en certains points, semi-convergence en d'autres.**
:::

::: cor id=c4-rayon-pratique zh="判断收敛半径的三条实用规则" en="Practical rules for the radius" fr="Règles pratiques pour le rayon de convergence" ru="Практические правила для радиуса сходимости" lvl=1
设 $R$ 是 $\sum a_n z^n$ 的收敛半径，$z_0 \in \C$。

1. 若 $(a_n z_0^n)$ 有界（特别地，若 $a_n z_0^n \to 0$，或 $\sum a_n z_0^n$ 收敛），则 $R \ge \abs{z_0}$。
2. 若 $\sum a_n z_0^n$ 发散（特别地，若 $(a_n z_0^n)$ 无界），则 $R \le \abs{z_0}$。
3. 若 $\sum a_n z_0^n$ 收敛但不绝对收敛，则 $R = \abs{z_0}$。
:::

::: fr
Soient $R$ le rayon de convergence de $\sum a_n z^n$ et $z_0 \in \C$.

1. Si $(a_n z_0^n)$ est bornée (en particulier si $a_n z_0^n \to 0$, ou si $\sum a_n z_0^n$ converge), alors $R \ge \abs{z_0}$.
2. Si $\sum a_n z_0^n$ diverge (en particulier si $(a_n z_0^n)$ n'est pas bornée), alors $R \le \abs{z_0}$.
3. Si $\sum a_n z_0^n$ converge sans converger absolument, alors $R = \abs{z_0}$.
:::

::: proof
▷ 思路：1 是定义；2 是 {@rayon-carac} 第 1 条的逆否命题；3 把 1 和 2 的思路合起来。

**1.**　$\abs{a_n}\abs{z_0}^n = \abs{a_n z_0^n}$，所以 $(a_n \abs{z_0}^n)$ 有界，即 $\abs{z_0} \in I$，故 $\abs{z_0} \le \sup I = R$。收敛数列有界；级数收敛时通项趋于 $0$（{@cn-grossiere}），所以括号里的两种情形都包含在内。

**2.**　反设 $\abs{z_0} < R$。由 {@rayon-carac} 第 1 条，$\sum a_n z_0^n$ 绝对收敛，从而收敛，矛盾。所以 $R \le \abs{z_0}$。若 $(a_n z_0^n)$ 无界，通项不趋于 $0$，级数发散，属于前一情形。

**3.**　级数收敛，由 1，$R \ge \abs{z_0}$。反设 $\abs{z_0} < R$，由 {@rayon-carac} 第 1 条，级数在 $z_0$ 处绝对收敛，与假设矛盾。所以 $R \le \abs{z_0}$，从而 $R = \abs{z_0}$。
:::

::: fr
▷ Méthode : 1 est la définition ; 2 est la contraposée du point 1 de {@fr:rayon-carac} ; 3 combine les idées de 1 et 2.

**1.**　On a $\abs{a_n}\abs{z_0}^n = \abs{a_n z_0^n}$, donc $(a_n \abs{z_0}^n)$ est bornée, c'est-à-dire $\abs{z_0} \in I$, d'où $\abs{z_0} \le \sup I = R$. Une suite convergente est bornée ; si la série converge, son terme général tend vers $0$ ({@fr:cn-grossiere}) : les deux cas entre parenthèses sont donc couverts.

**2.**　Par l'absurde, supposons $\abs{z_0} < R$. D'après le point 1 de {@fr:rayon-carac}, $\sum a_n z_0^n$ converge absolument, donc converge : contradiction. Ainsi $R \le \abs{z_0}$. Si $(a_n z_0^n)$ n'est pas bornée, le terme général ne tend pas vers $0$ et la série diverge : on est dans le cas précédent.

**3.**　La série converge, donc $R \ge \abs{z_0}$ d'après 1. Par l'absurde, si $\abs{z_0} < R$, le point 1 de {@fr:rayon-carac} montre que la série converge absolument en $z_0$, ce qui contredit l'hypothèse. Donc $R \le \abs{z_0}$, et finalement $R = \abs{z_0}$.
:::

::: ex id=c4-ex-pratique lvl=1
1. $\sum_{n \ge 1} \frac{z^n}{n}$：在 $z_0 = -1$ 处 $\sum \frac{(-1)^n}{n}$ 由交错级数判别法（{@csa}）收敛，但 $\sum \frac1n$ 发散。由第 3 条，**立即**得 $R = 1$。
2. $\sum \sin(n)\, z^n$：$\abs{\sin n} \le 1$，在 $z_0 = 1$ 处通项有界，由第 1 条 $R \ge 1$。另一方面 $\sin n \not\to 0$：反设 $\sin n \to 0$，由 $\sin(n+1) = \sin n \cos 1 + \cos n \sin 1$ 与 $\sin 1 \ne 0$ 得 $\cos n = \frac{\sin(n+1) - \sin n\cos 1}{\sin 1} \to 0$，与 $\sin^2 n + \cos^2 n = 1$ 矛盾。所以 $\sum \sin n$ 粗发散，由第 2 条 $R \le 1$。故 $R = 1$。这里系数的比值 $\frac{\sin(n+1)}{\sin n}$ 没有极限，比值法用不上。
:::

收敛半径的定义用的是 $\sup$，不便于直接计算。Cauchy–Hadamard 公式把它写成系数的一个显式表达式，所需的工具是上极限。

::: lem id=c4-limsup-carac zh="上极限的性质" en="Properties of the limit superior" fr="Propriétés de la limite supérieure" ru="Свойства верхнего предела" lvl=1
设 $(x_n)$ 是非负实数列，$L = \limsup_{n\to\infty} x_n = \lim_{n \to \infty} \sup_{k \ge n} x_k \in [0, +\infty]$（定义见 {@c2-limsup}）。则

- (A) 若实数 $\ell > L$，则存在 $N$，使对一切 $n \ge N$，$x_n < \ell$；
- (B) 若实数 $\ell < L$，则有无穷多个 $n$ 使 $x_n > \ell$；
- (C) 若 $x_n \to \lambda \in [0, +\infty]$，则 $L = \lambda$；
- (D)（分拆计算）若 $\N = I_1 \cup \dots \cup I_p$，每个 $I_i$ 是无限集，且对每个 $i$，$x_n \to \lambda_i \in [0, +\infty]$（$n \to \infty$，$n \in I_i$），则 $L = \max(\lambda_1, \dots, \lambda_p)$。
:::

::: fr
Soit $(x_n)$ une suite de réels positifs et $L = \limsup_{n\to\infty} x_n = \lim_{n \to \infty} \sup_{k \ge n} x_k \in [0, +\infty]$ (définition dans {@fr:c2-limsup}). Alors :

- (A) si $\ell > L$ est réel, il existe $N$ tel que pour tout $n \ge N$, $x_n < \ell$ ;
- (B) si $\ell < L$ est réel, il existe une infinité d'entiers $n$ tels que $x_n > \ell$ ;
- (C) si $x_n \to \lambda \in [0, +\infty]$, alors $L = \lambda$ ;
- (D) (calcul par découpage) si $\N = I_1 \cup \dots \cup I_p$, chaque $I_i$ étant infini, et si pour tout $i$, $x_n \to \lambda_i \in [0, +\infty]$ quand $n \to \infty$, $n \in I_i$, alors $L = \max(\lambda_1, \dots, \lambda_p)$.
:::

::: proof
▷ 思路：(A)(B)(C) 已在第 2 章证明；这里只需说明 $L \ge 0$，并证明 (D)：$L \ge \max \lambda_i$ 用 (B) 的想法（某个子列「顶上去」），$L \le \max \lambda_i$ 用 (A) 的想法（每个子列最终都低于 $\ell$）。记 $s_n = \sup_{k \ge n} x_k$。

**第 0 步（$L \ge 0$ 与 (A)(B)(C)）**　$s_n \ge x_n \ge 0$，所以 $L = \inf_n s_n \ge 0$。(A)(B)(C) 即 {@c2-limsup} 的 (A)(B)(C)。

记 $\lambda = \max(\lambda_1, \dots, \lambda_p)$。

**第 1 步（(D)：$L \ge \lambda$）**　若 $\lambda = 0$，由第 0 步即得。设 $\lambda > 0$，取 $i$ 使 $\lambda_i = \lambda$，并任取实数 $\ell \in [0, \lambda[$。因为沿 $I_i$ 有 $x_n \to \lambda > \ell$，存在 $N_0$，使对 $n \in I_i$，$n \ge N_0$，$x_n > \ell$；$I_i$ 无限，所以这样的 $n$ 有无穷多个。于是对每个 $m$，存在 $n \ge m$ 使 $x_n > \ell$，从而 $s_m > \ell$；取下确界得 $L \ge \ell$。$\ell < \lambda$ 是任意的，所以 $L \ge \lambda$（$\lambda = +\infty$ 时即 $L = +\infty$）。

**第 2 步（(D)：$L \le \lambda$）**　若 $\lambda = +\infty$，无需证明。设 $\lambda < +\infty$，任取实数 $\ell > \lambda$。对每个 $i$，$\lambda_i \le \lambda < \ell$，所以存在 $N_i$，使对 $n \in I_i$，$n \ge N_i$，$x_n < \ell$。令 $N = \max(N_1, \dots, N_p)$。每个 $n \ge N$ 属于某个 $I_i$ 且 $n \ge N_i$，所以 $x_n < \ell$。于是 $s_N \le \ell$，$L \le s_N \le \ell$。$\ell > \lambda$ 是任意的，所以 $L \le \lambda$。

由第 1、2 步，$L = \lambda$。
:::

::: fr
▷ Méthode : (A), (B) et (C) ont été démontrés au chapitre 2 ; il reste à voir que $L \ge 0$ et à prouver (D) : l'inégalité $L \ge \max \lambda_i$ reprend l'idée de (B) (une sous-suite « pousse vers le haut »), l'inégalité $L \le \max \lambda_i$ celle de (A) (chaque sous-suite finit sous $\ell$). Notons $s_n = \sup_{k \ge n} x_k$.

**Étape 0 ($L \ge 0$ et (A), (B), (C))**　On a $s_n \ge x_n \ge 0$, donc $L = \inf_n s_n \ge 0$. Les points (A), (B), (C) sont ceux de {@fr:c2-limsup}.

Notons $\lambda = \max(\lambda_1, \dots, \lambda_p)$.

**Étape 1 ((D) : $L \ge \lambda$)**　Si $\lambda = 0$, c'est l'étape 0. Supposons $\lambda > 0$ ; soit $i$ tel que $\lambda_i = \lambda$, et soit $\ell \in [0, \lambda[$ réel. Comme $x_n \to \lambda > \ell$ le long de $I_i$, il existe $N_0$ tel que $x_n > \ell$ pour $n \in I_i$, $n \ge N_0$ ; comme $I_i$ est infini, il y a une infinité de tels $n$. Donc pour tout $m$, il existe $n \ge m$ avec $x_n > \ell$, d'où $s_m > \ell$ ; en passant à la borne inférieure, $L \ge \ell$. Comme $\ell < \lambda$ est quelconque, $L \ge \lambda$ (si $\lambda = +\infty$, cela signifie $L = +\infty$).

**Étape 2 ((D) : $L \le \lambda$)**　Si $\lambda = +\infty$, il n'y a rien à montrer. Supposons $\lambda < +\infty$ et soit $\ell > \lambda$ réel. Pour tout $i$, $\lambda_i \le \lambda < \ell$, donc il existe $N_i$ tel que $x_n < \ell$ pour $n \in I_i$, $n \ge N_i$. Posons $N = \max(N_1, \dots, N_p)$. Tout $n \ge N$ appartient à un certain $I_i$ et vérifie $n \ge N_i$, donc $x_n < \ell$. Ainsi $s_N \le \ell$ et $L \le s_N \le \ell$. Comme $\ell > \lambda$ est quelconque, $L \le \lambda$.

Les étapes 1 et 2 donnent $L = \lambda$.
:::

::: ex id=c4-ex-limsup lvl=1
1. $x_n = 2^{(-1)^n}$：沿偶数 $x_n = 2$，沿奇数 $x_n = \frac12$。由 (D)，$\limsup x_n = \max(2, \frac12) = 2$，而 $(x_n)$ 没有极限。
2. $x_n = 1$（$n$ 为完全平方数），$x_n = 0$（否则）：两类下标都是无限集，由 (D)，$\limsup x_n = \max(1, 0) = 1$。
3. $x_n = \sqrt[n]{n}$（$n \ge 1$）：$\ln \sqrt[n]{n} = \frac{\ln n}{n} \to 0$，所以 $x_n \to 1$，由 (C)，$\limsup x_n = 1$。
:::

::: thm id=hadamard zh="Cauchy–Hadamard 公式" en="Cauchy–Hadamard theorem" fr="Formule de Cauchy–Hadamard" ru="Формула Коши — Адамара" lvl=1
设 $L = \limsup_{n \to \infty} \abs{a_n}^{1/n} \in [0, +\infty]$。则 $\sum a_n z^n$ 的收敛半径为
$$R = \frac1L \qquad \text{（约定 } \tfrac10 = +\infty,\ \tfrac1{+\infty} = 0 \text{）。}$$
:::

::: fr
Soit $L = \limsup_{n \to \infty} \abs{a_n}^{1/n} \in [0, +\infty]$. Alors le rayon de convergence de $\sum a_n z^n$ vaut
$$R = \frac1L \qquad \text{(avec les conventions } \tfrac10 = +\infty,\ \tfrac1{+\infty} = 0\text{).}$$
:::

::: proof
▷ 思路：把 $\abs{a_n z^n}$ 写成 $\big(\abs{a_n}^{1/n} \abs{z}\big)^n$，和几何级数比较。分两步：先证 $R \ge 1/L$，再证 $R \le 1/L$。

▷ 要用的上极限的两条性质（{@c4-limsup-carac}）：

- (A) 若 $\ell > L$，则存在 $N$，使对一切 $n \ge N$，$\abs{a_n}^{1/n} < \ell$；
- (B) 若 $\ell < L$，则有无穷多个 $n$ 使 $\abs{a_n}^{1/n} > \ell$。

**第 1 步（$R \ge 1/L$）**　若 $L = +\infty$，则 $1/L = 0 \le R$，无需证明。设 $L < +\infty$，任取 $r$ 满足 $0 < r < 1/L$（$L = 0$ 时 $r$ 可取任意正数）。

1. 由 $r < 1/L$ 得 $Lr < 1$。取 $q$ 满足 $Lr < q < 1$。
2. 令 $\ell = q/r$，则 $\ell > L$。由 (A)，存在 $N$，使对一切 $n \ge N$，$\abs{a_n}^{1/n} < q/r$，即
   $$\abs{a_n} r^n < q^n \le 1 \qquad (n \ge N).$$
3. 于是 $(a_n r^n)$ 有界：对一切 $n$，$\abs{a_n} r^n \le \max\big(1, \abs{a_0}, \abs{a_1} r, \dots, \abs{a_{N-1}} r^{N-1}\big)$。
4. 由收敛半径的定义（{@def-rayon}），$r \le R$。

$r$ 是 $(0, 1/L)$ 中任意的数，所以 $R \ge 1/L$。

**第 2 步（$R \le 1/L$）**　若 $L = 0$，则 $1/L = +\infty \ge R$，无需证明。设 $L > 0$，任取 $r > 1/L$。

1. 取 $r'$ 满足 $1/L < r' < r$。
2. 令 $\ell = 1/r'$，则 $\ell < L$。由 (B)，有无穷多个 $n$ 使 $\abs{a_n}^{1/n} > 1/r'$，即 $\abs{a_n} r'^n > 1$。
3. 对这些 $n$：
   $$\abs{a_n} r^n = \abs{a_n} r'^n \cdot \Big(\frac{r}{r'}\Big)^n > \Big(\frac{r}{r'}\Big)^n \xrightarrow[n \to \infty]{} +\infty \qquad \Big(\frac{r}{r'} > 1\Big),$$
   所以 $(a_n r^n)$ 无界。
4. 由收敛半径的定义，$r$ 不属于集合 $\{r \ge 0 : (a_n r^n) \text{ 有界}\}$。

这个集合不含任何大于 $1/L$ 的数，所以它的上确界 $R \le 1/L$。

由第 1、2 步，$R = 1/L$。
:::

::: fr
▷ Méthode : on écrit $\abs{a_n z^n} = \big(\abs{a_n}^{1/n} \abs{z}\big)^n$ et on compare à une série géométrique. On montre successivement $R \ge 1/L$ et $R \le 1/L$.

▷ Deux propriétés de la limite supérieure ({@fr:c4-limsup-carac}) :

- (A) si $\ell > L$, il existe $N$ tel que pour tout $n \ge N$, $\abs{a_n}^{1/n} < \ell$ ;
- (B) si $\ell < L$, il existe une infinité d'entiers $n$ tels que $\abs{a_n}^{1/n} > \ell$.

**Étape 1 ($R \ge 1/L$)**　Si $L = +\infty$, alors $1/L = 0 \le R$ et il n'y a rien à montrer. Supposons $L < +\infty$ et soit $r$ tel que $0 < r < 1/L$ (si $L = 0$, $r > 0$ est quelconque).

1. Comme $r < 1/L$, on a $Lr < 1$. Choisissons $q$ tel que $Lr < q < 1$.
2. Posons $\ell = q/r$ ; alors $\ell > L$. D'après (A), il existe $N$ tel que pour tout $n \ge N$, $\abs{a_n}^{1/n} < q/r$, c'est-à-dire
   $$\abs{a_n} r^n < q^n \le 1 \qquad (n \ge N).$$
3. La suite $(a_n r^n)$ est donc bornée : pour tout $n$, $\abs{a_n} r^n \le \max\big(1, \abs{a_0}, \abs{a_1} r, \dots, \abs{a_{N-1}} r^{N-1}\big)$.
4. Par définition du rayon de convergence ({@fr:def-rayon}), $r \le R$.

Ceci vaut pour tout $r \in \,]0, 1/L[$, donc $R \ge 1/L$.

**Étape 2 ($R \le 1/L$)**　Si $L = 0$, alors $1/L = +\infty \ge R$. Supposons $L > 0$ et soit $r > 1/L$.

1. Choisissons $r'$ tel que $1/L < r' < r$.
2. Posons $\ell = 1/r'$ ; alors $\ell < L$. D'après (B), il existe une infinité d'entiers $n$ tels que $\abs{a_n}^{1/n} > 1/r'$, c'est-à-dire $\abs{a_n} r'^n > 1$.
3. Pour ces entiers $n$,
   $$\abs{a_n} r^n = \abs{a_n} r'^n \cdot \Big(\frac{r}{r'}\Big)^n > \Big(\frac{r}{r'}\Big)^n \xrightarrow[n \to \infty]{} +\infty \qquad \Big(\frac{r}{r'} > 1\Big),$$
   donc $(a_n r^n)$ n'est pas bornée.
4. Par définition du rayon de convergence, $r$ n'appartient pas à l'ensemble $\{r \ge 0 : (a_n r^n) \text{ bornée}\}$.

Cet ensemble ne contient aucun réel strictement supérieur à $1/L$ ; sa borne supérieure vérifie donc $R \le 1/L$.

Les étapes 1 et 2 donnent $R = 1/L$.
:::

::: rem
**两个条件都不能少。**
1. 不能把 $\limsup$ 换成 $\lim$：$\sum z^{n^2}$ 的系数 $a_n$ 在 $n$ 为完全平方数时为 1，否则为 0，$\abs{a_n}^{1/n}$ 在 0 和 1 之间来回跳，没有极限，但 $\limsup = 1$（{@c4-ex-limsup} 第 2 条），故 $R = 1$。
2. 比值法（{@dalembert-rayon}）在这里失效：$a_{n+1}/a_n$ 常常无定义。

证明本质上就是对正项级数 $\sum \abs{a_n z^n}$ 用 Cauchy 根值判别法（{@cauchy-racine}）的 $\limsup$ 形式。
:::

::: q
$\sum 2^{(-1)^n n} z^n$ 的收敛半径是多少？
:::

::: ans
$\abs{a_n}^{1/n} = 2^{(-1)^n}$，在 2 和 $\tfrac12$ 之间交替，$\limsup = 2$（{@c4-ex-limsup} 第 1 条），所以 $R = \tfrac12$。
:::

当系数的比值有极限时，下面的判别法比 Cauchy–Hadamard 公式更方便。

::: prop id=dalembert-rayon zh="用比值计算收敛半径" en="Ratio test for the radius" fr="Règle de d'Alembert pour les séries entières" ru="Признак Даламбера для радиуса сходимости" lvl=1
设从某项起 $a_n \ne 0$，且 $\Big|\dfrac{a_{n+1}}{a_n}\Big| \to \ell \in [0, +\infty]$。则 $R = \dfrac{1}{\ell}$。
:::

::: fr
On suppose que $a_n \ne 0$ à partir d'un certain rang et que $\Big|\dfrac{a_{n+1}}{a_n}\Big| \to \ell \in [0, +\infty]$. Alors $R = \dfrac{1}{\ell}$.
:::

::: proof
▷ 思路：对正项数列 $u_n = \abs{a_n} r^n$ 看相邻两项的比值，它趋于 $\ell r$：$\ell r < 1$ 时 $u_n \to 0$，$\ell r > 1$ 时 $u_n \to +\infty$。与 Hadamard 公式的证明一样分两步。

**第 0 步（翻译假设）**　存在 $N_0$，使 $n \ge N_0$ 时 $a_n \ne 0$。对 $r > 0$ 与 $n \ge N_0$，令 $u_n = \abs{a_n} r^n > 0$，则
$$\frac{u_{n+1}}{u_n} = \Big|\frac{a_{n+1}}{a_n}\Big|\, r \xrightarrow[n \to \infty]{} \ell r \in [0, +\infty] \qquad (\text{约定 } {+\infty} \cdot r = +\infty).$$

**第 1 步（$R \ge 1/\ell$）**　若 $\ell = +\infty$，$1/\ell = 0 \le R$。设 $\ell < +\infty$，任取 $r$ 满足 $0 < r < 1/\ell$（$\ell = 0$ 时 $r > 0$ 任意）。则 $\ell r < 1$，由 d'Alembert 判别法（{@dalembert}，用于 $(u_n)_{n \ge N_0}$），$\sum u_n$ 收敛，所以 $u_n \to 0$，$(a_n r^n)$ 有界，$r \le R$（{@def-rayon}）。$r < 1/\ell$ 任意，所以 $R \ge 1/\ell$。

**第 2 步（$R \le 1/\ell$）**　若 $\ell = 0$，$1/\ell = +\infty \ge R$。设 $\ell > 0$，任取 $r > 1/\ell$（$\ell = +\infty$ 时 $r > 0$ 任意）。则 $\ell r > 1$。取 $q$ 满足 $1 < q < \ell r$（$\ell r = +\infty$ 时取 $q = 2$）。存在 $N_1 \ge N_0$，使 $n \ge N_1$ 时 $\frac{u_{n+1}}{u_n} \ge q$，归纳得
$$u_n \ge u_{N_1}\, q^{\,n - N_1} \xrightarrow[n \to \infty]{} +\infty \qquad (u_{N_1} > 0,\ q > 1).$$
所以 $(a_n r^n)$ 无界，$r \notin I$，从而 $R \le r$。$r > 1/\ell$ 任意，所以 $R \le 1/\ell$。

由第 1、2 步，$R = 1/\ell$。
:::

::: fr
▷ Méthode : on étudie le quotient de deux termes consécutifs de la suite positive $u_n = \abs{a_n} r^n$ ; il tend vers $\ell r$ : si $\ell r < 1$, $u_n \to 0$ ; si $\ell r > 1$, $u_n \to +\infty$. Comme pour la formule de Hadamard, on procède en deux étapes.

**Étape 0 (on traduit l'hypothèse)**　Il existe $N_0$ tel que $a_n \ne 0$ pour $n \ge N_0$. Pour $r > 0$ et $n \ge N_0$, posons $u_n = \abs{a_n} r^n > 0$ ; alors
$$\frac{u_{n+1}}{u_n} = \Big|\frac{a_{n+1}}{a_n}\Big|\, r \xrightarrow[n \to \infty]{} \ell r \in [0, +\infty] \qquad (\text{avec } {+\infty} \cdot r = +\infty).$$

**Étape 1 ($R \ge 1/\ell$)**　Si $\ell = +\infty$, alors $1/\ell = 0 \le R$. Supposons $\ell < +\infty$ et soit $r$ tel que $0 < r < 1/\ell$ ($r > 0$ quelconque si $\ell = 0$). Alors $\ell r < 1$ et, d'après la règle de d'Alembert ({@fr:dalembert}, appliquée à $(u_n)_{n \ge N_0}$), $\sum u_n$ converge ; donc $u_n \to 0$, la suite $(a_n r^n)$ est bornée et $r \le R$ ({@fr:def-rayon}). Comme $r < 1/\ell$ est quelconque, $R \ge 1/\ell$.

**Étape 2 ($R \le 1/\ell$)**　Si $\ell = 0$, alors $1/\ell = +\infty \ge R$. Supposons $\ell > 0$ et soit $r > 1/\ell$ ($r > 0$ quelconque si $\ell = +\infty$). Alors $\ell r > 1$. Choisissons $q$ tel que $1 < q < \ell r$ ($q = 2$ si $\ell r = +\infty$). Il existe $N_1 \ge N_0$ tel que $\frac{u_{n+1}}{u_n} \ge q$ pour $n \ge N_1$, et par récurrence
$$u_n \ge u_{N_1}\, q^{\,n - N_1} \xrightarrow[n \to \infty]{} +\infty \qquad (u_{N_1} > 0,\ q > 1).$$
Donc $(a_n r^n)$ n'est pas bornée, $r \notin I$ et $R \le r$. Comme $r > 1/\ell$ est quelconque, $R \le 1/\ell$.

Les étapes 1 et 2 donnent $R = 1/\ell$.
:::

::: rem
1. **逆命题不成立**：收敛半径存在时，比值可以没有极限。$a_n = 2 + (-1)^n$：比值在 $3$ 与 $\frac13$ 之间交替，但 $1 \le \abs{a_n} \le 3$，由 {@c4-rayon-pratique} 在 $z_0 = 1$ 处（通项有界但不趋于 $0$）得 $R = 1$。
2. **系数有无穷多个为零时**（缺项级数）比值无定义。此时把比值法用于**通项** $\abs{a_n z^n}$ 本身，见下例。
:::

::: ex id=c4-ex-lacunaire lvl=1
$\sum_{n \ge 0} \frac{z^{2n}}{4^n}$：奇数次系数为 $0$，不能用 {@dalembert-rayon}。对固定的 $z \ne 0$，令 $u_n = \frac{\abs{z}^{2n}}{4^n}$，则 $\frac{u_{n+1}}{u_n} = \frac{\abs z^2}{4}$。$\abs z < 2$ 时比值 $< 1$，级数绝对收敛，由 {@c4-rayon-pratique} 第 1 条 $R \ge \abs z$；$\abs z > 2$ 时 $u_n \to +\infty$，粗发散，由第 2 条 $R \le \abs z$。所以 $R = 2$。（也可以用 Hadamard：$\abs{a_{2n}}^{1/(2n)} = \frac12$，$\abs{a_{2n+1}} = 0$，由 {@c4-limsup-carac} (D)，$L = \frac12$。）
:::

::: prop id=comparaison-rayons zh="收敛半径的比较与运算" en="Comparison and operations on radii" fr="Comparaison des rayons ; somme et produit" ru="Сравнение радиусов; сумма и произведение рядов" lvl=1
记 $R_a$、$R_b$ 分别为 $\sum a_n z^n$、$\sum b_n z^n$ 的收敛半径。

1. 若 $a_n = O(b_n)$，则 $R_a \ge R_b$；若 $a_n \sim b_n$，则 $R_a = R_b$。
2. 对 $k \in \Z$，$\sum a_n z^n$ 与 $\sum_{n \ge 1} n^k a_n z^n$ 的收敛半径相同。特别地，$\sum_{n \ge 1} n a_n z^{n-1}$ 与 $\sum_{n \ge 0} \frac{a_n}{n+1} z^{n+1}$ 的收敛半径都是 $R_a$。
3. 和 $\sum (a_n + b_n) z^n$ 与 Cauchy 乘积 $\sum c_n z^n$（$c_n = \sum_{k=0}^n a_k b_{n-k}$）的收敛半径都 $\ge \min(R_a, R_b)$，并且在 $\abs z < \min(R_a, R_b)$ 内，它们的和函数分别等于两个和函数之和、之积。
:::

::: fr
Notons $R_a$ et $R_b$ les rayons de convergence de $\sum a_n z^n$ et $\sum b_n z^n$.

1. Si $a_n = O(b_n)$, alors $R_a \ge R_b$ ; si $a_n \sim b_n$, alors $R_a = R_b$.
2. Pour $k \in \Z$, les séries $\sum a_n z^n$ et $\sum_{n \ge 1} n^k a_n z^n$ ont le même rayon. En particulier, $\sum_{n \ge 1} n a_n z^{n-1}$ et $\sum_{n \ge 0} \frac{a_n}{n+1} z^{n+1}$ sont de rayon $R_a$.
3. La somme $\sum (a_n + b_n) z^n$ et le produit de Cauchy $\sum c_n z^n$ ($c_n = \sum_{k=0}^n a_k b_{n-k}$) ont un rayon $\ge \min(R_a, R_b)$ et, pour $\abs z < \min(R_a, R_b)$, leurs sommes sont respectivement la somme et le produit des deux fonctions sommes.
:::

::: proof
▷ 思路：1 比较集合 $I_a \supset I_b$；2 在 $R_a$ 内部留出一点余量 $r < r' < R_a$，用 $n^k (r/r')^n \to 0$ 吸收多项式因子；3 在两个级数都绝对收敛的点上用数项级数的运算与 Cauchy 乘积（{@produit-cauchy}）。记 $I_a$、$I_b$ 为 {@def-rayon} 中的集合。

**1.**　翻译假设：存在 $C \ge 0$ 与 $N$，使对 $n \ge N$，$\abs{a_n} \le C\abs{b_n}$。设 $r \in I_b$，$\abs{b_n} r^n \le M$ 对一切 $n$ 成立。则 $n \ge N$ 时 $\abs{a_n} r^n \le CM$；前 $N$ 项只有有限个。所以 $(a_n r^n)$ 有界，$r \in I_a$。于是 $I_b \subset I_a$，取上确界得 $R_b \le R_a$。
若 $a_n \sim b_n$，即 $a_n = b_n(1 + \eps_n)$，$\eps_n \to 0$，则从某项起 $\frac12 \le \abs{1 + \eps_n} \le 2$，所以 $\abs{a_n} \le 2\abs{b_n}$ 且 $\abs{b_n} \le 2\abs{a_n}$：$a_n = O(b_n)$ 且 $b_n = O(a_n)$，由前半部分，$R_a = R_b$。

**2.**　记 $c_n = n^k a_n$（$n \ge 1$），$R_c$ 为其收敛半径。

1. （$R_c \ge R_a$）若 $R_a = 0$，无需证明。设 $0 < r < R_a$，取 $r'$ 满足 $r < r' < R_a$。由 $r' < \sup I_a$，存在 $\rho \in I_a$ 使 $\rho > r'$，而 $I_a$ 是区间（{@def-rayon}），所以 $r' \in I_a$：存在 $M$，使 $\abs{a_n} r'^n \le M$。于是
   $$\abs{c_n} r^n = n^k \abs{a_n} r'^n \Big(\frac{r}{r'}\Big)^n \le M\, n^k \Big(\frac{r}{r'}\Big)^n \xrightarrow[n\to\infty]{} 0 \qquad \Big(0 \le \frac{r}{r'} < 1\Big),$$
   （幂函数被几何数列压倒），所以 $(c_n r^n)$ 有界，$r \le R_c$。$r < R_a$ 任意，所以 $R_c \ge R_a$。
2. （$R_a \ge R_c$）$a_n = n^{-k} c_n$，把第 1 点用于 $(c_n)$ 与 $-k$，得 $R_a \ge R_c$。
3. 对 $r > 0$，$(n a_n r^{n-1})$ 有界 $\iff$ $(n a_n r^n)$ 有界，所以 $\sum n a_n z^{n-1}$ 与 $\sum n a_n z^n$ 收敛半径相同，都等于 $R_a$（$k = 1$）。同理（乘以 $r$ 换成除以 $r$），$(\frac{a_n}{n+1} r^{n+1})$ 有界 $\iff$ $(\frac{a_n}{n+1} r^n)$ 有界，而 $\frac{1}{n+1} \sim \frac1n$，由第 1 条与 $k = -1$，收敛半径为 $R_a$。

**3.**　令 $\rho = \min(R_a, R_b)$，设 $\abs z < \rho$。由 {@rayon-carac}，$\sum a_n z^n$ 与 $\sum b_n z^n$ 都绝对收敛，和分别记为 $A(z)$、$B(z)$。

1. （和）两个收敛级数之和收敛：$\sum (a_n + b_n) z^n$ 收敛，和为 $A(z) + B(z)$。由 {@c4-rayon-pratique} 第 1 条，其收敛半径 $\ge \abs z$。
2. （积）$c_n z^n = \sum_{k=0}^n (a_k z^k)(b_{n-k} z^{n-k})$ 正是两个绝对收敛级数 $\sum a_n z^n$、$\sum b_n z^n$ 的 Cauchy 乘积的通项。由 {@produit-cauchy}，$\sum c_n z^n$ 收敛，和为 $A(z)B(z)$。同样，其收敛半径 $\ge \abs z$。

$\abs z < \rho$ 任意，所以两个收敛半径都 $\ge \rho$。
:::

::: fr
▷ Méthode : pour 1, on compare les ensembles $I_a \supset I_b$ ; pour 2, on garde une marge $r < r' < R_a$ à l'intérieur du disque et on absorbe le facteur polynomial grâce à $n^k (r/r')^n \to 0$ ; pour 3, on utilise, en un point où les deux séries convergent absolument, les opérations sur les séries numériques et le produit de Cauchy ({@fr:produit-cauchy}). On note $I_a$, $I_b$ les ensembles de {@fr:def-rayon}.

**1.**　On traduit l'hypothèse : il existe $C \ge 0$ et $N$ tels que $\abs{a_n} \le C\abs{b_n}$ pour $n \ge N$. Soit $r \in I_b$, avec $\abs{b_n} r^n \le M$ pour tout $n$. Alors $\abs{a_n} r^n \le CM$ pour $n \ge N$, et il ne reste qu'un nombre fini de termes. Donc $(a_n r^n)$ est bornée et $r \in I_a$. Ainsi $I_b \subset I_a$ et, en passant aux bornes supérieures, $R_b \le R_a$.
Si $a_n \sim b_n$, c'est-à-dire $a_n = b_n(1 + \eps_n)$ avec $\eps_n \to 0$, alors $\frac12 \le \abs{1 + \eps_n} \le 2$ à partir d'un certain rang, donc $\abs{a_n} \le 2\abs{b_n}$ et $\abs{b_n} \le 2\abs{a_n}$ : $a_n = O(b_n)$ et $b_n = O(a_n)$, d'où $R_a = R_b$ par ce qui précède.

**2.**　Notons $c_n = n^k a_n$ ($n \ge 1$) et $R_c$ le rayon correspondant.

1. ($R_c \ge R_a$) Si $R_a = 0$, il n'y a rien à montrer. Soit $0 < r < R_a$ et $r'$ tel que $r < r' < R_a$. Comme $r' < \sup I_a$, il existe $\rho \in I_a$ avec $\rho > r'$ ; $I_a$ étant un intervalle ({@fr:def-rayon}), $r' \in I_a$ : il existe $M$ tel que $\abs{a_n} r'^n \le M$. Alors
   $$\abs{c_n} r^n = n^k \abs{a_n} r'^n \Big(\frac{r}{r'}\Big)^n \le M\, n^k \Big(\frac{r}{r'}\Big)^n \xrightarrow[n\to\infty]{} 0 \qquad \Big(0 \le \frac{r}{r'} < 1\Big)$$
   (croissances comparées), donc $(c_n r^n)$ est bornée et $r \le R_c$. Comme $r < R_a$ est quelconque, $R_c \ge R_a$.
2. ($R_a \ge R_c$) On a $a_n = n^{-k} c_n$ ; le point 1 appliqué à $(c_n)$ et $-k$ donne $R_a \ge R_c$.
3. Pour $r > 0$, $(n a_n r^{n-1})$ est bornée si et seulement si $(n a_n r^n)$ l'est ; donc $\sum n a_n z^{n-1}$ et $\sum n a_n z^n$ ont le même rayon, égal à $R_a$ ($k = 1$). De même (en divisant par $r$ au lieu de multiplier), $(\frac{a_n}{n+1} r^{n+1})$ est bornée si et seulement si $(\frac{a_n}{n+1} r^n)$ l'est ; comme $\frac{1}{n+1} \sim \frac1n$, le point 1 et le cas $k = -1$ donnent le rayon $R_a$.

**3.**　Posons $\rho = \min(R_a, R_b)$ et soit $\abs z < \rho$. D'après {@fr:rayon-carac}, $\sum a_n z^n$ et $\sum b_n z^n$ convergent absolument ; notons $A(z)$ et $B(z)$ leurs sommes.

1. (Somme) La somme de deux séries convergentes converge : $\sum (a_n + b_n) z^n$ converge, de somme $A(z) + B(z)$. D'après le point 1 de {@fr:c4-rayon-pratique}, son rayon est $\ge \abs z$.
2. (Produit) $c_n z^n = \sum_{k=0}^n (a_k z^k)(b_{n-k} z^{n-k})$ est exactement le terme général du produit de Cauchy des deux séries absolument convergentes $\sum a_n z^n$ et $\sum b_n z^n$. D'après {@fr:produit-cauchy}, $\sum c_n z^n$ converge, de somme $A(z)B(z)$. De même, son rayon est $\ge \abs z$.

Comme $\abs z < \rho$ est quelconque, les deux rayons sont $\ge \rho$.
:::

::: rem
1. **和的半径**：若 $R_a \ne R_b$，则和的半径**恰为** $\min(R_a, R_b)$。设 $R_a < R_b$，对 $R_a < \abs z < R_b$，$\sum a_n z^n$ 发散（{@rayon-carac}）而 $\sum b_n z^n$ 收敛，所以和发散，由 {@c4-rayon-pratique} 第 2 条，和的半径 $\le \abs z$。若 $R_a = R_b$，和的半径可以更大：$a_n = 1$，$b_n = -1$，和为零级数，半径 $+\infty$。
2. **积的半径可以更大**：$(1 - z) \cdot \sum z^n$ 的 Cauchy 乘积系数为 $c_0 = 1$，$c_n = 1 - 1 = 0$（$n \ge 1$），半径 $+\infty > 1 = \min(+\infty, 1)$。
3. 第 2 条说明：**乘以 $n$ 的幂不改变收敛半径**。但圆周上的性态会变：$\sum \frac{z^n}{n^2}$ 在 $\abs z = 1$ 上处处收敛，而 $\sum z^n$ 处处发散。
:::

::: ex id=c4-ex-rayons lvl=1
1. $\sum \frac{z^n}{n!}$：$\big|\frac{a_{n+1}}{a_n}\big| = \frac{1}{n+1} \to 0$，$R = +\infty$（{@dalembert-rayon}）。
2. $\sum n!\, z^n$：比值 $n + 1 \to +\infty$，$R = 0$。
3. $\sum \binom{2n}{n} z^n$：$\dfrac{\binom{2n+2}{n+1}}{\binom{2n}{n}} = \dfrac{(2n+2)(2n+1)}{(n+1)^2} = \dfrac{2(2n+1)}{n+1} \to 4$，$R = \frac14$。
4. $\sum z^{n^2}$：只有部分系数非零，用 Cauchy–Hadamard 公式，$R = 1$（{@hadamard} 后的注）。
5. $\sum \frac{n^3 + 1}{2^n} z^n$：$\frac{n^3+1}{2^n} \sim \frac{n^3}{2^n}$，由 {@comparaison-rayons} 第 1、2 条，半径与 $\sum \frac{z^n}{2^n}$ 相同，即 $R = 2$。
:::

::: q
设数项级数 $\sum a_n$ 收敛。关于 $\sum a_n z^n$ 的收敛半径，能说什么？它能恰好等于 $1$ 吗？能大于 $1$ 吗？
:::

::: ans
由 {@c4-rayon-pratique} 第 1 条（$z_0 = 1$），$R \ge 1$。两种情况都可能：$\sum \frac{z^n}{n^2}$ 满足条件且 $R = 1$；$a_0 = 1$、其余 $a_n = 0$ 时 $\sum a_n z^n = 1$，$R = +\infty$。若 $\sum a_n$ 收敛但不绝对收敛（如 $a_n = \frac{(-1)^n}{n}$），由第 3 条，$R = 1$。
:::

## 和函数的正则性

在收敛圆盘内部，幂级数在每个更小的闭圆盘上正规收敛。把第 3 章的交换定理用上去，就得到：和函数连续、无穷次可导、可以逐项求导与积分，系数由和函数唯一决定。

::: thm id=cv-normale-disque zh="闭圆盘上的正规收敛" en="Normal convergence on closed subdiscs" fr="Convergence normale sur tout disque fermé inclus dans le disque ouvert de convergence" ru="Нормальная сходимость в замкнутых подкругах" lvl=1
设 $R > 0$ 是 $\sum a_n z^n$ 的收敛半径。对任意 $0 \le r < R$，$\sum a_n z^n$ 在闭圆盘 $\overline{D}(0, r)$ 上正规收敛。因此和函数 $S(z) = \sum_{n=0}^\infty a_n z^n$ 在开圆盘 $D(0, R)$ 上连续（实变量时在 $]-R, R[$ 上连续）。
:::

::: fr
Soit $R > 0$ le rayon de convergence de $\sum a_n z^n$. Pour tout $0 \le r < R$, la série $\sum a_n z^n$ converge normalement sur le disque fermé $\overline{D}(0, r)$. Par conséquent, la fonction somme $S(z) = \sum_{n=0}^\infty a_n z^n$ est continue sur le disque ouvert $D(0, R)$ (sur $]-R, R[$ dans le cas d'une variable réelle).
:::

::: proof
▷ 思路：在 $\overline{D}(0, r)$ 上，$\abs{a_n z^n}$ 的上确界是 $\abs{a_n} r^n$，而 $\sum \abs{a_n} r^n$ 就是级数在 $z = r$ 处的绝对值级数。连续性是局部性质：每个点都落在某个更小的圆盘内部。

**第 1 步（上确界）**　设 $0 \le r < R$。对 $\abs z \le r$，$\abs{a_n z^n} = \abs{a_n}\abs{z}^n \le \abs{a_n} r^n$，且在 $z = r$ 处取等号，所以 $\norm{a_n z^n}_{\infty, \overline{D}(0,r)} = \abs{a_n} r^n$。

**第 2 步（正规收敛）**　$\abs{r} = r < R$，由 {@rayon-carac} 第 1 条，$\sum a_n r^n$ 绝对收敛，即 $\sum \abs{a_n} r^n < +\infty$。由第 1 步与 {@def-cv-normale}，$\sum a_n z^n$ 在 $\overline{D}(0, r)$ 上正规收敛，从而一致收敛（{@normale-unif}）。

**第 3 步（连续性）**　设 $z_0 \in D(0, R)$。取 $r$ 满足 $\abs{z_0} < r < R$（例如 $R < +\infty$ 时 $r = \frac{\abs{z_0} + R}{2}$，$R = +\infty$ 时 $r = \abs{z_0} + 1$）。在 $A = D(0, r)$ 上，部分和 $S_n(z) = \sum_{k \le n} a_k z^k$ 是多项式，连续；由第 2 步，$(S_n)$ 在 $A \subset \overline{D}(0, r)$ 上一致收敛到 $S$。由 {@cont-limite-unif}，$S|_A$ 在 $z_0$ 处连续。$A$ 是 $z_0$ 的邻域（开圆盘且 $\abs{z_0} < r$），所以 $S$ 在 $z_0$ 处连续。

$z_0$ 任意，所以 $S$ 在 $D(0, R)$ 上连续。实变量的情形是把上面的 $z$ 限制在 $]-R, R[$ 上。
:::

::: fr
▷ Méthode : sur $\overline{D}(0, r)$, la borne supérieure de $\abs{a_n z^n}$ vaut $\abs{a_n} r^n$, et $\sum \abs{a_n} r^n$ est la série des modules au point $z = r$. La continuité est une propriété locale : tout point est à l'intérieur d'un disque plus petit.

**Étape 1 (borne supérieure)**　Soit $0 \le r < R$. Pour $\abs z \le r$, $\abs{a_n z^n} = \abs{a_n}\abs{z}^n \le \abs{a_n} r^n$, avec égalité en $z = r$ ; donc $\norm{a_n z^n}_{\infty, \overline{D}(0,r)} = \abs{a_n} r^n$.

**Étape 2 (convergence normale)**　Comme $\abs{r} = r < R$, le point 1 de {@fr:rayon-carac} montre que $\sum a_n r^n$ converge absolument, c'est-à-dire $\sum \abs{a_n} r^n < +\infty$. D'après l'étape 1 et {@fr:def-cv-normale}, $\sum a_n z^n$ converge normalement sur $\overline{D}(0, r)$, donc uniformément ({@fr:normale-unif}).

**Étape 3 (continuité)**　Soit $z_0 \in D(0, R)$. Choisissons $r$ tel que $\abs{z_0} < r < R$ (par exemple $r = \frac{\abs{z_0} + R}{2}$ si $R < +\infty$, $r = \abs{z_0} + 1$ si $R = +\infty$). Sur $A = D(0, r)$, les sommes partielles $S_n(z) = \sum_{k \le n} a_k z^k$ sont polynomiales, donc continues ; d'après l'étape 2, $(S_n)$ converge uniformément vers $S$ sur $A \subset \overline{D}(0, r)$. D'après {@fr:cont-limite-unif}, $S|_A$ est continue en $z_0$. Comme $A$ est un voisinage de $z_0$ (disque ouvert et $\abs{z_0} < r$), $S$ est continue en $z_0$.

Le point $z_0$ étant quelconque, $S$ est continue sur $D(0, R)$. Le cas d'une variable réelle s'obtient en restreignant $z$ à $]-R, R[$.
:::

::: cex id=c4-cex-geom-unif lvl=1
在整个开圆盘上不一定一致收敛。$\sum x^n$ 在 $]-1, 1[$ 上不一致收敛：$\norm{x^n}_{\infty, ]-1,1[} = 1 \not\to 0$，由 {@c3-reste-unif} 第 3 条即得。也可以直接计算余项：
$$\sup_{]-1,1[} \Big|\frac{1}{1-x} - \sum_{k \le n} x^k\Big| = \sup_{]-1,1[} \frac{\abs{x}^{n+1}}{\abs{1 - x}} = +\infty \qquad (x \to 1^-).$$
所以 {@cv-normale-disque} 中的「$r < R$」不能换成「$r = R$」。另一方面，有时在闭圆盘 $\overline{D}(0, R)$ 上也正规收敛：$\sum \frac{z^n}{n^2}$ 在 $\overline{D}(0, 1)$ 上被 $\sum \frac{1}{n^2}$ 控制。
:::

::: thm id=derivation-se zh="逐项求导与逐项积分" en="Term-by-term differentiation and integration" fr="Dérivation et intégration terme à terme" ru="Почленное дифференцирование и интегрирование" lvl=1
设实变幂级数 $S(x) = \sum a_n x^n$（$a_n \in \C$）的收敛半径为 $R > 0$。则 $S$ 在 $]-R, R[$ 上是 $\Cc^\infty$ 的，
$$S'(x) = \sum_{n \ge 1} n a_n x^{n-1}, \qquad \int_0^x S = \sum_{n \ge 0} \frac{a_n}{n+1} x^{n+1},$$
两个级数的收敛半径都是 $R$。更一般地，对每个 $k$，$S^{(k)}(x) = \sum_{n \ge k} n(n-1)\cdots(n-k+1)\, a_n x^{n-k}$。特别地，$a_n = \dfrac{S^{(n)}(0)}{n!}$。
:::

::: fr
Soit $S(x) = \sum a_n x^n$ ($a_n \in \C$) une série entière de variable réelle, de rayon $R > 0$. Alors $S$ est de classe $\Cc^\infty$ sur $]-R, R[$ et
$$S'(x) = \sum_{n \ge 1} n a_n x^{n-1}, \qquad \int_0^x S = \sum_{n \ge 0} \frac{a_n}{n+1} x^{n+1},$$
ces deux séries ayant pour rayon $R$. Plus généralement, pour tout $k$, $S^{(k)}(x) = \sum_{n \ge k} n(n-1)\cdots(n-k+1)\, a_n x^{n-k}$. En particulier, $a_n = \dfrac{S^{(n)}(0)}{n!}$.
:::

::: proof
▷ 思路：逐项求导后的级数仍是收敛半径为 $R$ 的幂级数（{@comparaison-rayons} 第 2 条），所以在 $]-R, R[$ 的每个闭区间段上正规收敛（{@cv-normale-disque}），第 3 章的逐项求导定理（{@transferts-series} 第 3 条）适用。对求导次数归纳，得到 $\Cc^\infty$；在 $0$ 处取值得到系数公式。

**第 1 步（导数级数的收敛半径）**　由 {@comparaison-rayons} 第 2 条，$\sum_{n \ge 1} n a_n x^{n-1}$ 与 $\sum_{n \ge 0} \frac{a_n}{n+1} x^{n+1}$ 的收敛半径都是 $R$。

**第 2 步（$\Cc^1$ 与 $S'$ 的公式）**　令 $f_n(x) = a_n x^n$，则 $f_n \in \Cc^1(]-R, R[)$，$f_n'(x) = n a_n x^{n-1}$。

1. $\sum f_n$ 在 $]-R, R[$ 上逐点收敛（{@rayon-carac}）。
2. 设 $[c, d] \subset ]-R, R[$，令 $r = \max(\abs c, \abs d) < R$，则 $[c, d] \subset [-r, r]$。由第 1 步与 {@cv-normale-disque}（用于导数级数），$\sum f_n'$ 在 $[-r, r]$ 上正规收敛，从而在 $[c, d]$ 上一致收敛。
3. 由 {@transferts-series} 第 3 条，$S \in \Cc^1(]-R, R[)$，且 $S'(x) = \sum_{n \ge 1} n a_n x^{n-1}$。

**第 3 步（归纳：$\Cc^\infty$）**　记 $\mathcal{P}(k)$：「$S \in \Cc^k(]-R,R[)$，且 $S^{(k)}(x) = \sum_{n \ge k} n(n-1)\cdots(n-k+1)\, a_n x^{n-k}$，这是收敛半径为 $R$ 的幂级数」。
**初始化**：$\mathcal{P}(0)$ 即假设。
**递推**：设 $\mathcal{P}(k)$ 成立。把第 1、2 步用于幂级数 $S^{(k)}$（收敛半径 $R$）：$S^{(k)}$ 是 $\Cc^1$ 的，其导数是逐项导数
$$S^{(k+1)}(x) = \sum_{n \ge k+1} n(n-1)\cdots(n-k)\, a_n x^{n-k-1},$$
收敛半径仍为 $R$。这就是 $\mathcal{P}(k+1)$。所以 $S \in \Cc^\infty(]-R, R[)$。

**第 4 步（系数公式）**　在 $S^{(k)}(x)$ 的级数中令 $x = 0$：$n > k$ 的项含因子 $x^{n-k}$（$n - k \ge 1$），为 $0$；$n = k$ 的项是 $k(k-1)\cdots 1 \cdot a_k = k!\,a_k$。所以 $S^{(k)}(0) = k!\,a_k$。

**第 5 步（逐项积分）**　设 $x \in ]-R, R[$。在以 $0$、$x$ 为端点的闭区间段上（含于 $[-\abs x, \abs x]$），$\sum a_n t^n$ 一致收敛（{@cv-normale-disque}，$r = \abs x$）。由 {@transferts-series} 第 2 条，
$$\int_0^x S(t)\,\dd t = \sum_{n \ge 0} a_n \int_0^x t^n\,\dd t = \sum_{n \ge 0} \frac{a_n}{n+1} x^{n+1},$$
（$x < 0$ 时对 $[x, 0]$ 用同一定理，再改变积分方向的符号），其收敛半径为 $R$（第 1 步）。
:::

::: fr
▷ Méthode : la série dérivée terme à terme est encore une série entière de rayon $R$ ({@fr:comparaison-rayons}, point 2), donc elle converge normalement sur tout segment de $]-R, R[$ ({@fr:cv-normale-disque}) et le théorème de dérivation terme à terme du chapitre 3 ({@fr:transferts-series}, point 3) s'applique. Une récurrence sur l'ordre de dérivation donne le caractère $\Cc^\infty$ ; l'évaluation en $0$ donne la formule des coefficients.

**Étape 1 (rayon des séries dérivée et primitive)**　D'après le point 2 de {@fr:comparaison-rayons}, $\sum_{n \ge 1} n a_n x^{n-1}$ et $\sum_{n \ge 0} \frac{a_n}{n+1} x^{n+1}$ sont de rayon $R$.

**Étape 2 ($\Cc^1$ et formule de $S'$)**　Posons $f_n(x) = a_n x^n$ ; alors $f_n \in \Cc^1(]-R, R[)$ et $f_n'(x) = n a_n x^{n-1}$.

1. $\sum f_n$ converge simplement sur $]-R, R[$ ({@fr:rayon-carac}).
2. Soit $[c, d] \subset ]-R, R[$ et $r = \max(\abs c, \abs d) < R$ ; alors $[c, d] \subset [-r, r]$. D'après l'étape 1 et {@fr:cv-normale-disque} (appliqué à la série dérivée), $\sum f_n'$ converge normalement sur $[-r, r]$, donc uniformément sur $[c, d]$.
3. D'après le point 3 de {@fr:transferts-series}, $S \in \Cc^1(]-R, R[)$ et $S'(x) = \sum_{n \ge 1} n a_n x^{n-1}$.

**Étape 3 (récurrence : $\Cc^\infty$)**　Notons $\mathcal{P}(k)$ : « $S \in \Cc^k(]-R,R[)$ et $S^{(k)}(x) = \sum_{n \ge k} n(n-1)\cdots(n-k+1)\, a_n x^{n-k}$, série entière de rayon $R$ ».
**Initialisation** : $\mathcal{P}(0)$ est l'hypothèse.
**Hérédité** : supposons $\mathcal{P}(k)$. On applique les étapes 1 et 2 à la série entière $S^{(k)}$ (de rayon $R$) : $S^{(k)}$ est de classe $\Cc^1$ et sa dérivée est la dérivée terme à terme
$$S^{(k+1)}(x) = \sum_{n \ge k+1} n(n-1)\cdots(n-k)\, a_n x^{n-k-1},$$
encore de rayon $R$. C'est $\mathcal{P}(k+1)$. Ainsi $S \in \Cc^\infty(]-R, R[)$.

**Étape 4 (formule des coefficients)**　Faisons $x = 0$ dans la série de $S^{(k)}(x)$ : les termes $n > k$ contiennent le facteur $x^{n-k}$ ($n - k \ge 1$) et sont nuls ; le terme $n = k$ vaut $k(k-1)\cdots 1 \cdot a_k = k!\,a_k$. Donc $S^{(k)}(0) = k!\,a_k$.

**Étape 5 (intégration terme à terme)**　Soit $x \in ]-R, R[$. Sur le segment d'extrémités $0$ et $x$ (contenu dans $[-\abs x, \abs x]$), $\sum a_n t^n$ converge uniformément ({@fr:cv-normale-disque}, $r = \abs x$). D'après le point 2 de {@fr:transferts-series},
$$\int_0^x S(t)\,\dd t = \sum_{n \ge 0} a_n \int_0^x t^n\,\dd t = \sum_{n \ge 0} \frac{a_n}{n+1} x^{n+1}$$
(pour $x < 0$, on applique le théorème sur $[x, 0]$ et on change le signe en inversant les bornes), et cette série est de rayon $R$ (étape 1).
:::

::: rem
1. **收敛半径不变，圆周上的性态会变。** $\sum_{n \ge 1} \frac{x^n}{n^2}$ 在 $[-1, 1]$ 上正规收敛，而它的导数级数 $\sum_{n \ge 1} \frac{x^{n-1}}{n}$ 在 $x = 1$ 处发散：求导使端点处的收敛变差，积分使之变好。
2. **复变量。** 同样的论证（把 $\lim_{h \to 0}$ 理解为复数 $h \to 0$）说明 $S$ 在 $D(0, R)$ 上关于复变量可导，导数是逐项导数：幂级数的和是全纯函数。这是复分析（L3）的起点。
3. 第 3 步说明 $S$ 的各阶导数都是收敛半径为 $R$ 的幂级数，所以 $S'$、$S''$……也都满足本节的全部结论。
:::

::: cor id=unicite-coef zh="系数的唯一性" en="Uniqueness of the coefficients" fr="Unicité du développement en série entière" ru="Единственность разложения в степенной ряд" lvl=1
设 $r > 0$，$\sum a_n x^n$ 与 $\sum b_n x^n$ 的收敛半径都 $\ge r$，且对一切 $x \in ]-r, r[$，$\sum a_n x^n = \sum b_n x^n$。则对一切 $n$，$a_n = b_n$。特别地，若和函数 $S$ 在 $]-r, r[$ 上是偶函数，则奇数次系数全为 $0$；若是奇函数，则偶数次系数全为 $0$。
:::

::: fr
Soit $r > 0$. Si $\sum a_n x^n$ et $\sum b_n x^n$ ont un rayon $\ge r$ et si $\sum a_n x^n = \sum b_n x^n$ pour tout $x \in ]-r, r[$, alors $a_n = b_n$ pour tout $n$. En particulier, si la somme $S$ est paire sur $]-r, r[$, ses coefficients d'indice impair sont nuls ; si elle est impaire, ses coefficients d'indice pair sont nuls.
:::

::: proof
▷ 思路：系数由和函数在 $0$ 处的各阶导数决定（{@derivation-se}）。

**第 1 步**　记 $S(x) = \sum a_n x^n$，$T(x) = \sum b_n x^n$。两个级数的收敛半径都 $\ge r$，由 {@derivation-se}（用于各自的收敛半径，再限制到 $]-r, r[$），$S, T \in \Cc^\infty(]-r, r[)$，且 $a_n = \frac{S^{(n)}(0)}{n!}$，$b_n = \frac{T^{(n)}(0)}{n!}$。

**第 2 步**　$S = T$ 在开区间 $]-r, r[$ 上成立，所以各阶导数在 $]-r, r[$ 上相等，特别地 $S^{(n)}(0) = T^{(n)}(0)$。由第 1 步，$a_n = b_n$。

**第 3 步（奇偶性）**　设 $S$ 是偶函数。对 $x \in ]-r, r[$，$S(x) = S(-x) = \sum (-1)^n a_n x^n$，后者的收敛半径与 $\sum a_n x^n$ 相同（模相同）。由第 2 步，$a_n = (-1)^n a_n$，所以 $n$ 为奇数时 $2a_n = 0$。奇函数的情形：$S(x) = -S(-x) = \sum (-1)^{n+1} a_n x^n$，得 $a_n = (-1)^{n+1} a_n$，$n$ 为偶数时 $a_n = 0$。
:::

::: fr
▷ Méthode : les coefficients sont déterminés par les dérivées successives de la somme en $0$ ({@fr:derivation-se}).

**Étape 1**　Notons $S(x) = \sum a_n x^n$ et $T(x) = \sum b_n x^n$. Les deux rayons sont $\ge r$ ; d'après {@fr:derivation-se} (appliqué avec chaque rayon, puis par restriction à $]-r, r[$), $S, T \in \Cc^\infty(]-r, r[)$ avec $a_n = \frac{S^{(n)}(0)}{n!}$ et $b_n = \frac{T^{(n)}(0)}{n!}$.

**Étape 2**　Comme $S = T$ sur l'intervalle ouvert $]-r, r[$, leurs dérivées de tout ordre coïncident sur $]-r, r[$, en particulier $S^{(n)}(0) = T^{(n)}(0)$. D'après l'étape 1, $a_n = b_n$.

**Étape 3 (parité)**　Supposons $S$ paire. Pour $x \in ]-r, r[$, $S(x) = S(-x) = \sum (-1)^n a_n x^n$, série de même rayon que $\sum a_n x^n$ (mêmes modules). D'après l'étape 2, $a_n = (-1)^n a_n$, donc $2a_n = 0$ pour $n$ impair. Cas impair : $S(x) = -S(-x) = \sum (-1)^{n+1} a_n x^n$, d'où $a_n = (-1)^{n+1} a_n$ et $a_n = 0$ pour $n$ pair.
:::

收敛圆盘内部的情况已经完全清楚。在边界点上呢？若级数在 $x = R$ 处收敛，和函数在 $R$ 处的值是否等于 $\lim_{x \to R^-} S(x)$？{@cv-normale-disque} 只给出开区间上的连续性，回答这个问题需要 Abel 变换。

::: thm id=abel-radial zh="Abel 径向定理" en="Abel's theorem" fr="Théorème radial d'Abel" ru="Теорема Абеля (вторая)" lvl=2
设 $0 < R < +\infty$，且 $\sum a_n R^n$ 收敛。则 $\sum a_n x^n$ 在 $[0, R]$ 上一致收敛，从而和函数在 $[0, R]$ 上连续，
$$\lim_{x \to R^-} \sum_{n=0}^\infty a_n x^n = \sum_{n=0}^\infty a_n R^n.$$
:::

::: fr
Soit $0 < R < +\infty$ tel que $\sum a_n R^n$ converge. Alors $\sum a_n x^n$ converge uniformément sur $[0, R]$ ; par conséquent sa somme est continue sur $[0, R]$ et
$$\lim_{x \to R^-} \sum_{n=0}^\infty a_n x^n = \sum_{n=0}^\infty a_n R^n.$$
:::

::: sketch
▷ 思路：化归到 $R = 1$。对级数的一段 $\sum_{k=p}^q a_k t^k$ 作 Abel 变换（{@abel-transform}）：$t^k$ 关于 $k$ 递减且 $\le 1$，于是这一段被 $\max_m \abs{\sum_{k=p}^m a_k}$ 控制——一个与 $t$ 无关、由 $\sum a_k$ 的 Cauchy 准则可以任意小的数。

**第 0 步（化归）**　令 $b_n = a_n R^n$，$x = Rt$。则 $\sum a_n x^n = \sum b_n t^n$，$x \in [0, R] \iff t \in [0, 1]$，且 $\sum b_n$ 收敛。所以只需对 $R = 1$ 证明，下面记 $a_n$ 为 $b_n$。

**第 1 步（Abel 变换）**　固定 $1 \le p \le q$，令 $A_m = \sum_{k=p}^m a_k$（$m \ge p$），$A_{p-1} = 0$，则 $a_k = A_k - A_{k-1}$。对 $t \in [0, 1]$（常规计算：拆开后平移指标再合并），
$$\sum_{k=p}^q a_k t^k = \sum_{k=p}^{q-1} A_k\,(t^k - t^{k+1}) + A_q\, t^q.$$

**第 2 步（估计）**　$t \in [0, 1]$ 时权重 $t^k - t^{k+1} \ge 0$，$t^q \ge 0$，且它们的和是望远镜和 $t^p \le 1$。所以
$$\Big|\sum_{k=p}^q a_k t^k\Big| \le \max_{p \le m \le q} \abs{A_m} \cdot \Big(\sum_{k=p}^{q-1}(t^k - t^{k+1}) + t^q\Big) = \max_{p \le m \le q} \abs{A_m}\, t^p \le \max_{p \le m \le q} \abs{A_m}.$$

**第 3 步（一致 Cauchy）**　设 $\eps > 0$。由数项级数 $\sum a_k$ 的 Cauchy 准则（{@cauchy-series}），存在 $N$，使对 $m \ge p \ge N + 1$，$\abs{A_m} = \big|\sum_{k=p}^m a_k\big| < \eps$。由第 2 步，对 $q \ge p \ge N + 1$ 与一切 $t \in [0, 1]$，$\big|\sum_{k=p}^q a_k t^k\big| \le \eps$。由一致 Cauchy 准则（{@c3-reste-unif} 第 2 条），$\sum a_n t^n$ 在 $[0, 1]$ 上一致收敛。

**第 4 步（连续性）**　部分和是多项式，在 $[0, 1]$ 上连续；由 {@cont-limite-unif}，和函数在 $[0, 1]$ 上连续，特别地在 $1$ 处左连续：$\lim_{t \to 1^-} \sum a_n t^n = \sum a_n$。
:::

::: fr
▷ Méthode : on se ramène à $R = 1$. Sur une tranche $\sum_{k=p}^q a_k t^k$, on effectue une transformation d'Abel ({@fr:abel-transform}) : $t^k$ décroît en $k$ et reste $\le 1$, de sorte que la tranche est majorée par $\max_m \abs{\sum_{k=p}^m a_k}$, quantité indépendante de $t$ et rendue arbitrairement petite par le critère de Cauchy pour $\sum a_k$.

**Étape 0 (réduction)**　Posons $b_n = a_n R^n$ et $x = Rt$. Alors $\sum a_n x^n = \sum b_n t^n$, $x \in [0, R] \iff t \in [0, 1]$, et $\sum b_n$ converge. Il suffit donc de traiter le cas $R = 1$ ; on note encore $a_n$ au lieu de $b_n$.

**Étape 1 (transformation d'Abel)**　Fixons $1 \le p \le q$ et posons $A_m = \sum_{k=p}^m a_k$ ($m \ge p$), $A_{p-1} = 0$, de sorte que $a_k = A_k - A_{k-1}$. Pour $t \in [0, 1]$ (calcul de routine : on sépare, on décale l'indice et on regroupe),
$$\sum_{k=p}^q a_k t^k = \sum_{k=p}^{q-1} A_k\,(t^k - t^{k+1}) + A_q\, t^q.$$

**Étape 2 (majoration)**　Pour $t \in [0, 1]$, les poids $t^k - t^{k+1}$ et $t^q$ sont positifs, de somme télescopique $t^p \le 1$. Donc
$$\Big|\sum_{k=p}^q a_k t^k\Big| \le \max_{p \le m \le q} \abs{A_m} \cdot \Big(\sum_{k=p}^{q-1}(t^k - t^{k+1}) + t^q\Big) = \max_{p \le m \le q} \abs{A_m}\, t^p \le \max_{p \le m \le q} \abs{A_m}.$$

**Étape 3 (Cauchy uniforme)**　Soit $\eps > 0$. D'après le critère de Cauchy pour la série numérique $\sum a_k$ ({@fr:cauchy-series}), il existe $N$ tel que pour $m \ge p \ge N + 1$, $\abs{A_m} = \big|\sum_{k=p}^m a_k\big| < \eps$. D'après l'étape 2, pour $q \ge p \ge N + 1$ et tout $t \in [0, 1]$, $\big|\sum_{k=p}^q a_k t^k\big| \le \eps$. Par le critère de Cauchy uniforme ({@fr:c3-reste-unif}, point 2), $\sum a_n t^n$ converge uniformément sur $[0, 1]$.

**Étape 4 (continuité)**　Les sommes partielles sont polynomiales, donc continues sur $[0, 1]$ ; d'après {@fr:cont-limite-unif}, la somme est continue sur $[0, 1]$, en particulier continue à gauche en $1$ : $\lim_{t \to 1^-} \sum a_n t^n = \sum a_n$.
:::

::: rem
1. **只能沿半径方向。** 复变量时，若 $\sum a_n$ 收敛，在 $z \to 1$ 且 $z$ 留在一个以 $1$ 为顶点的角形区域（Stolz 角）内时结论仍成立；但若 $z$ 沿与单位圆相切的方向趋于 $1$，结论可以失败。
2. **只在收敛的那个端点。** $\sum_{n \ge 1} \frac{x^n}{n}$ 在 $x = -1$ 处收敛，由定理（作变换 $x \mapsto -x$）它在 $[-1, 0]$ 上一致收敛；在 $x = 1$ 处发散，在 $[0, 1[$ 上不一致收敛（否则由 {@double-limite}，$\sum \frac1n$ 将收敛）。
3. **逆命题不成立**：$\lim_{x \to 1^-} \sum a_n x^n$ 存在并不推出 $\sum a_n$ 收敛，见下面的 Tauber 定理。
:::

::: thm id=tauber zh="Tauber 定理" en="Tauber's theorem" fr="Théorème taubérien de Tauber" ru="Тауберова теорема" lvl=3 ref="Hardy, *Divergent Series*，第 7 章；Korevaar, *Tauberian Theory*"
Abel 定理的逆不成立：$\sum (-1)^n x^n = \frac{1}{1+x} \to \frac12$，但 $\sum (-1)^n$ 发散。Tauber（1897）证明：若 $\lim_{x \to 1^-} \sum a_n x^n = s$ 且 $a_n = o(\frac1n)$，则 $\sum a_n = s$。Littlewood（1911）把条件减弱为 $a_n = O(\frac1n)$；Hardy–Littlewood 定理处理正项情形。这类「从平均行为反推收敛」的定理统称 Tauber 型定理，是解析数论中素数定理证明的关键工具。
:::

::: fr
La réciproque du théorème d'Abel est fausse : $\sum (-1)^n x^n = \frac{1}{1+x} \to \frac12$, alors que $\sum (-1)^n$ diverge. Tauber (1897) a montré : si $\lim_{x \to 1^-} \sum a_n x^n = s$ et $a_n = o(\frac1n)$, alors $\sum a_n = s$. Littlewood (1911) a affaibli l'hypothèse en $a_n = O(\frac1n)$ ; le théorème de Hardy–Littlewood traite le cas des termes positifs. Ces théorèmes qui « remontent d'un comportement en moyenne à la convergence » sont appelés théorèmes taubériens ; ils sont un outil clé des démonstrations du théorème des nombres premiers en théorie analytique des nombres.
:::

::: q
$\sum_{n \ge 1} \frac{x^n}{n^2}$ 的和函数 $S$ 在 $[-1, 1]$ 上连续吗？$S$ 在 $]-1, 1[$ 上可导吗？$S'$ 能连续延拓到 $x = 1$ 吗？
:::

::: ans
$\norm{\frac{x^n}{n^2}}_{\infty, [-1,1]} = \frac{1}{n^2}$，正规收敛，所以 $S$ 在 $[-1, 1]$ 上连续（{@transferts-series} 第 1 条）。由 {@derivation-se}，$S$ 在 $]-1, 1[$ 上可导，$S'(x) = \sum_{n \ge 1} \frac{x^{n-1}}{n}$，$x \ne 0$ 时等于 $-\frac{\ln(1 - x)}{x}$（{@dse-usuels}），它在 $x \to 1^-$ 时趋于 $+\infty$，不能连续延拓到 $1$：导数级数在 $x = 1$ 处发散。
:::

::: q
设 $\sum a_n x^n$ 的收敛半径 $R > 0$，$(x_k)$ 是一列非零实数，$x_k \to 0$，且对一切 $k$，$\sum a_n x_k^n = 0$。证明所有 $a_n = 0$。（这比 {@unicite-coef} 强：只要求在一列趋于 $0$ 的点上相等。）
:::

::: ans
反设不然，令 $p$ 为使 $a_p \ne 0$ 的最小下标。对 $\abs x < R$，$S(x) = x^p g(x)$，其中 $g(x) = \sum_{n \ge p} a_n x^{n-p}$ 是收敛半径为 $R$ 的幂级数（{@comparaison-rayons} 第 2 条的同样论证），在 $0$ 处连续（{@cv-normale-disque}），$g(0) = a_p \ne 0$。所以存在 $\delta > 0$，使 $\abs x < \delta$ 时 $g(x) \ne 0$。$k$ 充分大时 $0 < \abs{x_k} < \delta$，于是 $S(x_k) = x_k^p\, g(x_k) \ne 0$，矛盾。
:::

::: fr
Par l'absurde, soit $p$ le plus petit indice tel que $a_p \ne 0$. Pour $\abs x < R$, $S(x) = x^p g(x)$ avec $g(x) = \sum_{n \ge p} a_n x^{n-p}$, série entière de rayon $R$ (même argument qu'au point 2 de {@fr:comparaison-rayons}), continue en $0$ ({@fr:cv-normale-disque}), et $g(0) = a_p \ne 0$. Il existe donc $\delta > 0$ tel que $g(x) \ne 0$ pour $\abs x < \delta$. Pour $k$ assez grand, $0 < \abs{x_k} < \delta$, d'où $S(x_k) = x_k^p\, g(x_k) \ne 0$ : contradiction.
:::

## 幂级数展开

前两节从幂级数出发研究和函数。反过来：给定一个函数 $f$，它能否写成幂级数？由 {@derivation-se}，若能，系数只能是 $\frac{f^{(n)}(0)}{n!}$——但 $f \in \Cc^\infty$ 并不保证 Taylor 级数收敛到 $f$。

::: def id=def-dse zh="可展开为幂级数" en="Function expandable in a power series" fr="Fonction développable en série entière" ru="Функция, разложимая в степенной ряд"
设 $r > 0$，$f : ]-r, r[ \to \K$。称 $f$ 在 $]-r, r[$ 上**可展开为幂级数**（développable en série entière，简记 DSE），如果存在收敛半径 $\ge r$ 的幂级数 $\sum a_n x^n$，使
$$\forall x \in ]-r, r[,\quad f(x) = \sum_{n=0}^\infty a_n x^n.$$
此时由 {@derivation-se}，$f \in \Cc^\infty(]-r, r[)$，且 $a_n = \frac{f^{(n)}(0)}{n!}$：这个幂级数就是 $f$ 的 **Taylor 级数**，由 $f$ 唯一决定（{@unicite-coef}）。

白话：$f$ 在 $]-r, r[$ 上等于它的 Taylor 级数的和。
:::

::: fr
Soient $r > 0$ et $f : ]-r, r[ \to \K$. On dit que $f$ est **développable en série entière** (DSE) sur $]-r, r[$ s'il existe une série entière $\sum a_n x^n$ de rayon $\ge r$ telle que
$$\forall x \in ]-r, r[,\quad f(x) = \sum_{n=0}^\infty a_n x^n.$$
Alors, d'après {@fr:derivation-se}, $f \in \Cc^\infty(]-r, r[)$ et $a_n = \frac{f^{(n)}(0)}{n!}$ : cette série est la **série de Taylor** de $f$, déterminée de manière unique par $f$ ({@fr:unicite-coef}).

Autrement dit, $f$ coïncide sur $]-r, r[$ avec la somme de sa série de Taylor.
:::

::: ex id=c4-ex-dse lvl=1
1. **满足**：$f(x) = \frac{1}{1 - x}$ 在 $]-1, 1[$ 上 DSE：几何级数 $\sum x^n$ 的收敛半径为 $1$，和为 $\frac{1}{1-x}$。
2. **不满足**：$f(x) = \abs{x}$ 在任何 $]-r, r[$ 上都不 DSE，因为它在 $0$ 处不可导，而 DSE 函数是 $\Cc^\infty$ 的。
3. **不满足（更微妙）**：$g(x) = \frac{1}{1 + x^2}$ 在 $\R$ 上是 $\Cc^\infty$ 的，在 $]-1, 1[$ 上 DSE（$g(x) = \sum (-1)^n x^{2n}$），但在 $]-r, r[$（$r > 1$）上不 DSE：否则由唯一性，那个幂级数只能是 $\sum (-1)^n x^{2n}$，而它的收敛半径是 $1 < r$（在 $x = 1$ 处通项不趋于 $0$）。原因在复平面上，见本章的交互演示。
:::

::: cex id=cex-non-dse lvl=1
**$\Cc^\infty$ 不蕴含可展开。** 令 $f(x) = \e^{-1/x^2}$（$x \ne 0$），$f(0) = 0$。则 $f \in \Cc^\infty(\R)$，且对一切 $n$，$f^{(n)}(0) = 0$。$f$ 的 Taylor 级数恒为 $0$（收敛半径 $+\infty$），但 $f(x) > 0$（$x \ne 0$），所以 $f$ 在任何 $]-r, r[$ 上都不 DSE。

- **第 1 步（$x \ne 0$ 处的导数）**：归纳可证 $f^{(n)}(x) = P_n(1/x)\,\e^{-1/x^2}$，$P_n$ 是多项式。$P_0 = 1$；若结论对 $n$ 成立，求导得
  $$f^{(n+1)}(x) = \Big(-\frac{1}{x^2}P_n'\Big(\frac1x\Big) + \frac{2}{x^3}P_n\Big(\frac1x\Big)\Big)\e^{-1/x^2},$$
  即 $P_{n+1}(u) = -u^2 P_n'(u) + 2u^3 P_n(u)$。
- **第 2 步（一个极限）**：对任意多项式 $Q$，$Q(1/x)\,\e^{-1/x^2} \to 0$（$x \to 0$）。只需对单项式 $u^k$ 验证：令 $u = 1/x$，$v = u^2 \to +\infty$，$\abs{u}^k \e^{-u^2} = v^{k/2}\e^{-v} \to 0$（指数压倒幂）。
- **第 3 步（$0$ 处的导数）**：归纳证明 $f^{(n)}(0) = 0$。$n = 0$ 是定义。若 $f^{(n)}(0) = 0$，则差商
  $$\frac{f^{(n)}(x) - f^{(n)}(0)}{x} = \frac1x P_n\Big(\frac1x\Big)\e^{-1/x^2} \xrightarrow[x \to 0]{} 0$$
  （第 2 步，$Q(u) = uP_n(u)$），所以 $f^{(n+1)}(0) = 0$。由第 1、2 步，$f^{(n+1)}(x) \to 0 = f^{(n+1)}(0)$，$f^{(n+1)}$ 在 $0$ 处连续。所以 $f \in \Cc^\infty(\R)$。
- **第 4 步（结论）**：若 $f$ 在某个 $]-r, r[$ 上 DSE，由 {@def-dse}，那个幂级数的系数是 $\frac{f^{(n)}(0)}{n!} = 0$，于是 $f = 0$ 于 $]-r, r[$，与 $f(\frac r2) > 0$ 矛盾。
:::

如何证明一个函数**可以**展开？最直接的办法是证明 Taylor 公式的余项趋于 $0$。

::: thm id=taylor-reste zh="用 Taylor 余项证明可展开" en="Expansion via the Taylor remainder" fr="Développement en série entière par le reste de Taylor" ru="Разложимость через остаточный член формулы Тейлора" lvl=1
设 $f \in \Cc^\infty(]-r, r[)$。若 Taylor 公式的积分余项
$$R_n(x) = \int_0^x \frac{(x-t)^n}{n!} f^{(n+1)}(t)\,\dd t$$
对每个 $x \in ]-r, r[$ 趋于 $0$，则 $f$ 在 $]-r, r[$ 上可展开为幂级数。特别地，若 $f \in \Cc^\infty(\R)$，且对每个 $A > 0$ 存在 $M_A$，使 $\abs{f^{(n)}(x)} \le M_A$ 对一切 $n$ 和一切 $\abs{x} \le A$ 成立，则 $f$ 在 $\R$ 上可展开（即在每个 $]-r, r[$ 上 DSE）。
:::

::: fr
Soit $f \in \Cc^\infty(]-r, r[)$. Si le reste intégral de la formule de Taylor
$$R_n(x) = \int_0^x \frac{(x-t)^n}{n!} f^{(n+1)}(t)\,\dd t$$
tend vers $0$ pour tout $x \in ]-r, r[$, alors $f$ est développable en série entière sur $]-r, r[$. En particulier, si $f \in \Cc^\infty(\R)$ et si pour tout $A > 0$ il existe $M_A$ tel que $\abs{f^{(n)}(x)} \le M_A$ pour tout $n$ et tout $\abs{x} \le A$, alors $f$ est développable en série entière sur $\R$ (c'est-à-dire sur tout $]-r, r[$).
:::

::: proof
▷ 思路：Taylor 公式说 $f(x) = T_n(x) + R_n(x)$，$T_n$ 是 Taylor 级数的部分和；余项趋于 $0$ 正是「Taylor 级数在 $x$ 处收敛到 $f(x)$」。第二部分用积分估计把余项控制成指数级数的通项。

**第 1 步（Taylor 公式）**　$f \in \Cc^{n+1}$，由 L1 的带积分余项的 Taylor 公式，对 $x \in ]-r, r[$，
$$f(x) = \sum_{k=0}^n \frac{f^{(k)}(0)}{k!} x^k + R_n(x).$$

**第 2 步（第一部分）**　设对每个 $x \in ]-r, r[$，$R_n(x) \to 0$。由第 1 步，Taylor 级数 $\sum \frac{f^{(k)}(0)}{k!} x^k$ 的部分和收敛到 $f(x)$：级数在 $x$ 处收敛，和为 $f(x)$。它在每个 $x \in ]-r, r[$ 处收敛，由 {@c4-rayon-pratique} 第 1 条，收敛半径 $\ge \abs x$；$\abs x < r$ 任意，所以收敛半径 $\ge r$。由 {@def-dse}，$f$ 在 $]-r, r[$ 上 DSE。

**第 3 步（第二部分：余项估计）**　设 $x \in \R$，$x \ne 0$（$x = 0$ 时 $R_n(0) = 0$），令 $A = \abs x$。对 $t$ 在 $0$ 与 $x$ 之间，$\abs t \le A$，$\abs{x - t} \le \abs x$，所以
$$\abs{R_n(x)} \le \Big|\int_0^x \frac{\abs{x - t}^n}{n!}\,\dd t\Big| \cdot \sup_{\abs t \le A} \abs{f^{(n+1)}(t)} \le \frac{\abs{x}^{n+1}}{(n+1)!}\, M_A,$$
其中用了 $\big|\int_0^x \frac{\abs{x-t}^n}{n!}\dd t\big| = \int_0^{\abs x} \frac{s^n}{n!}\dd s = \frac{\abs x^{n+1}}{(n+1)!}$。

**第 4 步**　$\frac{\abs x^{n+1}}{(n+1)!} \to 0$（它是收敛级数 $\sum \frac{\abs x^m}{m!}$ 的通项，{@c4-ex-rayon-def} 第 3 条），所以 $R_n(x) \to 0$。由第 2 步（对任意 $r > 0$），$f$ 在每个 $]-r, r[$ 上 DSE。
:::

::: fr
▷ Méthode : la formule de Taylor s'écrit $f(x) = T_n(x) + R_n(x)$, où $T_n$ est une somme partielle de la série de Taylor ; dire que le reste tend vers $0$, c'est dire que la série de Taylor converge vers $f(x)$ en $x$. Pour la seconde partie, on majore le reste par le terme général de la série exponentielle.

**Étape 1 (formule de Taylor)**　Comme $f \in \Cc^{n+1}$, la formule de Taylor avec reste intégral (L1) donne, pour $x \in ]-r, r[$,
$$f(x) = \sum_{k=0}^n \frac{f^{(k)}(0)}{k!} x^k + R_n(x).$$

**Étape 2 (première partie)**　Supposons $R_n(x) \to 0$ pour tout $x \in ]-r, r[$. D'après l'étape 1, les sommes partielles de la série de Taylor $\sum \frac{f^{(k)}(0)}{k!} x^k$ tendent vers $f(x)$ : la série converge en $x$, de somme $f(x)$. Elle converge en tout $x \in ]-r, r[$ ; d'après le point 1 de {@fr:c4-rayon-pratique}, son rayon est $\ge \abs x$ ; comme $\abs x < r$ est quelconque, son rayon est $\ge r$. D'après {@fr:def-dse}, $f$ est DSE sur $]-r, r[$.

**Étape 3 (seconde partie : majoration du reste)**　Soit $x \in \R$, $x \ne 0$ (pour $x = 0$, $R_n(0) = 0$), et posons $A = \abs x$. Pour $t$ entre $0$ et $x$, $\abs t \le A$ et $\abs{x - t} \le \abs x$, donc
$$\abs{R_n(x)} \le \Big|\int_0^x \frac{\abs{x - t}^n}{n!}\,\dd t\Big| \cdot \sup_{\abs t \le A} \abs{f^{(n+1)}(t)} \le \frac{\abs{x}^{n+1}}{(n+1)!}\, M_A,$$
où l'on a utilisé $\big|\int_0^x \frac{\abs{x-t}^n}{n!}\dd t\big| = \int_0^{\abs x} \frac{s^n}{n!}\dd s = \frac{\abs x^{n+1}}{(n+1)!}$.

**Étape 4**　On a $\frac{\abs x^{n+1}}{(n+1)!} \to 0$ (terme général de la série convergente $\sum \frac{\abs x^m}{m!}$, {@fr:c4-ex-rayon-def}, point 3), donc $R_n(x) \to 0$. D'après l'étape 2 (pour tout $r > 0$), $f$ est DSE sur tout $]-r, r[$.
:::

::: rem
1. **第一部分的逆命题成立**：若 $f$ 在 $]-r, r[$ 上 DSE，则那个幂级数就是 Taylor 级数，其部分和收敛到 $f(x)$，即 $R_n(x) \to 0$。所以「$R_n \to 0$」是 DSE 的**充要**条件。
2. **第二部分的条件只是充分的**：$\frac{1}{1-x}$ 在 $]-1, 1[$ 上 DSE，但 $f^{(n)}(x) = \frac{n!}{(1-x)^{n+1}}$ 关于 $n$ 无界。对这类函数用下面的其他方法（几何级数、逐项积分、微分方程）。
3. {@cex-non-dse} 说明：只有 $f \in \Cc^\infty$ 时，$R_n(x)$ 可以不趋于 $0$——在那个例子中 $R_n(x) = f(x) > 0$ 对一切 $n$ 成立。
:::

::: ex id=dse-usuels zh="常用展开" lvl=1
1. **由 {@taylor-reste}**（在每个 $[-A, A]$ 上各阶导数一致有界：$\exp$ 的各阶导数都是 $\exp$，界为 $\e^A$；$\sin$、$\cos$ 的各阶导数是 $\pm\sin$、$\pm\cos$，界为 $1$）：
   $$\e^x = \sum_{n \ge 0} \frac{x^n}{n!},\quad \cos x = \sum_{n \ge 0} \frac{(-1)^n x^{2n}}{(2n)!},\quad \sin x = \sum_{n \ge 0} \frac{(-1)^n x^{2n+1}}{(2n+1)!}\qquad (x \in \R).$$
   系数来自 $f^{(n)}(0)$：$\exp^{(n)}(0) = 1$；$\cos^{(n)}(0)$ 依次为 $1, 0, -1, 0, \dots$；$\sin^{(n)}(0)$ 依次为 $0, 1, 0, -1, \dots$。由 $\ch x = \frac{\e^x + \e^{-x}}{2}$、$\sh x = \frac{\e^x - \e^{-x}}{2}$ 与 {@comparaison-rayons} 第 3 条，$\ch x = \sum \frac{x^{2n}}{(2n)!}$，$\sh x = \sum \frac{x^{2n+1}}{(2n+1)!}$。（这里的 $\sin$、$\cos$ 是 L1 中的函数；第 4 节反过来用这些级数**定义**它们。）
2. **几何级数**：对 $\abs x < 1$，$\frac{1}{1 - x} = \sum x^n$，$\frac{1}{1 + x} = \sum (-1)^n x^n$，$\frac{1}{1 + x^2} = \sum (-1)^n x^{2n}$（把 $x$ 换成 $-x$、$-x^2$；后者收敛当且仅当 $x^2 < 1$，由 {@c4-rayon-pratique} 收敛半径为 $1$）。
3. **由逐项积分**（{@derivation-se}）：$\ln(1 + x) = \int_0^x \frac{\dd t}{1 + t}$，$\Arctan x = \int_0^x \frac{\dd t}{1 + t^2}$，所以
   $$\ln(1 + x) = \sum_{n \ge 1} \frac{(-1)^{n+1}}{n} x^n,\qquad \Arctan x = \sum_{n \ge 0} \frac{(-1)^n}{2n+1} x^{2n+1}\qquad (\abs{x} < 1).$$
:::

::: ex id=ln2 lvl=1
$\ln(1 + x) = \sum_{n \ge 1} \frac{(-1)^{n+1}}{n} x^n$ 在 $]-1,1[$ 内成立（{@dse-usuels}）。级数在 $x = 1$ 处收敛（交错级数，{@csa}），由 Abel 定理（{@abel-radial}）与 $\ln$ 在 $2$ 处的连续性，
$$\sum_{n \ge 1} \frac{(-1)^{n+1}}{n} = \lim_{x \to 1^-} \ln(1 + x) = \ln 2.$$
同理（把 Abel 定理用于 $\Arctan x = \sum \frac{(-1)^n}{2n+1} x^{2n+1}$；这个级数的偶数次系数为 $0$，在 $x = 1$ 处的部分和与 $\sum \frac{(-1)^n}{2n+1}$ 的部分和是同一列数，每项重复一次，所以同样收敛）得 Leibniz 公式
$$\sum_{n \ge 0} \frac{(-1)^n}{2n+1} = \lim_{x \to 1^-} \Arctan x = \Arctan 1 = \frac\pi4.$$
注意：仅有 $]-1, 1[$ 上的等式，**不能**直接代入 $x = 1$；Abel 定理正是补上这一步所需的连续性。
:::

::: thm id=binome zh="二项式级数" en="Binomial series" fr="Série du binôme" ru="Биномиальный ряд" lvl=1
对 $\alpha \in \R$ 和 $\abs{x} < 1$：
$$(1 + x)^\alpha = \sum_{n \ge 0} \binom{\alpha}{n} x^n,\qquad \binom{\alpha}{n} = \frac{\alpha(\alpha - 1)\cdots(\alpha - n + 1)}{n!}\quad \Big(\binom{\alpha}{0} = 1\Big).$$
若 $\alpha \in \N$，这是有限和，对一切 $x$ 成立；若 $\alpha \notin \N$，级数的收敛半径为 $1$。
:::

::: fr
Pour $\alpha \in \R$ et $\abs{x} < 1$ :
$$(1 + x)^\alpha = \sum_{n \ge 0} \binom{\alpha}{n} x^n,\qquad \binom{\alpha}{n} = \frac{\alpha(\alpha - 1)\cdots(\alpha - n + 1)}{n!}\quad \Big(\binom{\alpha}{0} = 1\Big).$$
Si $\alpha \in \N$, la somme est finie et l'égalité vaut pour tout $x$ ; si $\alpha \notin \N$, la série est de rayon $1$.
:::

::: proof
▷ 思路（微分方程方法）：不去估计 Taylor 余项，而是证明级数的和 $S$ 与 $(1 + x)^\alpha$ 满足同一个一阶线性微分方程 $(1 + x)y' = \alpha y$ 和同一个初值 $y(0) = 1$，再证明它们的商是常数。记 $c_n = \binom{\alpha}{n}$。

**第 1 步（$\alpha \in \N$）**　$n > \alpha$ 时 $c_n$ 的分子含因子 $\alpha - \alpha = 0$，所以 $c_n = 0$，结论就是二项式定理。下设 $\alpha \notin \N$。

**第 2 步（收敛半径）**　$\alpha \notin \N$ 时，$\alpha - k \ne 0$ 对一切 $k \in \N$ 成立，所以 $c_n \ne 0$。由定义，
$$c_{n+1} = c_n \cdot \frac{\alpha - n}{n+1}, \qquad \Big|\frac{c_{n+1}}{c_n}\Big| = \frac{\abs{\alpha - n}}{n + 1} \xrightarrow[n \to \infty]{} 1,$$
由 {@dalembert-rayon}，$R = 1$。

**第 3 步（微分方程）**　令 $S(x) = \sum c_n x^n$（$\abs x < 1$）。由 {@derivation-se}，$S'(x) = \sum_{n \ge 1} n c_n x^{n-1} = \sum_{n \ge 0} (n+1)c_{n+1} x^n$，$xS'(x) = \sum_{n \ge 0} n c_n x^n$。两个收敛级数相加，再用第 2 步的 $(n+1)c_{n+1} = (\alpha - n)c_n$：
$$(1 + x)S'(x) = \sum_{n \ge 0} \big((n+1)c_{n+1} + n c_n\big) x^n = \sum_{n \ge 0} \big((\alpha - n) c_n + n c_n\big) x^n = \alpha S(x).$$

**第 4 步（商为常数）**　在 $]-1, 1[$ 上令 $g(x) = S(x)(1 + x)^{-\alpha}$（$1 + x > 0$）。则
$$g'(x) = S'(x)(1+x)^{-\alpha} - \alpha S(x)(1+x)^{-\alpha-1} = (1+x)^{-\alpha-1}\big((1+x)S'(x) - \alpha S(x)\big) = 0.$$
$]-1, 1[$ 是区间，所以 $g$ 是常数，$g(x) = g(0) = S(0) = c_0 = 1$。

所以对一切 $\abs x < 1$，$S(x) = (1 + x)^\alpha$。
:::

::: fr
▷ Méthode (équation différentielle) : au lieu de majorer le reste de Taylor, on montre que la somme $S$ de la série et $(1 + x)^\alpha$ vérifient la même équation différentielle linéaire du premier ordre $(1 + x)y' = \alpha y$ avec la même condition initiale $y(0) = 1$, puis que leur quotient est constant. Notons $c_n = \binom{\alpha}{n}$.

**Étape 1 ($\alpha \in \N$)**　Pour $n > \alpha$, le numérateur de $c_n$ contient le facteur $\alpha - \alpha = 0$, donc $c_n = 0$, et l'énoncé est la formule du binôme. Supposons désormais $\alpha \notin \N$.

**Étape 2 (rayon)**　Si $\alpha \notin \N$, alors $\alpha - k \ne 0$ pour tout $k \in \N$, donc $c_n \ne 0$. Par définition,
$$c_{n+1} = c_n \cdot \frac{\alpha - n}{n+1}, \qquad \Big|\frac{c_{n+1}}{c_n}\Big| = \frac{\abs{\alpha - n}}{n + 1} \xrightarrow[n \to \infty]{} 1,$$
et d'après {@fr:dalembert-rayon}, $R = 1$.

**Étape 3 (équation différentielle)**　Posons $S(x) = \sum c_n x^n$ ($\abs x < 1$). D'après {@fr:derivation-se}, $S'(x) = \sum_{n \ge 1} n c_n x^{n-1} = \sum_{n \ge 0} (n+1)c_{n+1} x^n$ et $xS'(x) = \sum_{n \ge 0} n c_n x^n$. En additionnant ces deux séries convergentes et en utilisant $(n+1)c_{n+1} = (\alpha - n)c_n$ (étape 2) :
$$(1 + x)S'(x) = \sum_{n \ge 0} \big((n+1)c_{n+1} + n c_n\big) x^n = \sum_{n \ge 0} \big((\alpha - n) c_n + n c_n\big) x^n = \alpha S(x).$$

**Étape 4 (le quotient est constant)**　Sur $]-1, 1[$, posons $g(x) = S(x)(1 + x)^{-\alpha}$ ($1 + x > 0$). Alors
$$g'(x) = S'(x)(1+x)^{-\alpha} - \alpha S(x)(1+x)^{-\alpha-1} = (1+x)^{-\alpha-1}\big((1+x)S'(x) - \alpha S(x)\big) = 0.$$
Comme $]-1, 1[$ est un intervalle, $g$ est constante : $g(x) = g(0) = S(0) = c_0 = 1$.

Ainsi $S(x) = (1 + x)^\alpha$ pour tout $\abs x < 1$.
:::

::: ex id=c4-ex-arcsin lvl=1
取 $\alpha = -\frac12$。$\binom{-1/2}{n} = \frac{(-\frac12)(-\frac32)\cdots(-\frac{2n-1}{2})}{n!} = (-1)^n \frac{1 \cdot 3 \cdots (2n-1)}{2^n n!} = (-1)^n \frac{(2n)!}{4^n (n!)^2} = (-1)^n \frac{\binom{2n}{n}}{4^n}$（分子分母同乘 $2 \cdot 4 \cdots (2n) = 2^n n!$）。把 $x$ 换成 $-x^2$（$\abs x < 1$）：
$$\frac{1}{\sqrt{1 - x^2}} = \sum_{n \ge 0} \frac{\binom{2n}{n}}{4^n} x^{2n}.$$
逐项积分（{@derivation-se}），$\arcsin x = \int_0^x \frac{\dd t}{\sqrt{1 - t^2}}$：
$$\arcsin x = \sum_{n \ge 0} \frac{\binom{2n}{n}}{4^n (2n+1)} x^{2n+1} \qquad (\abs x < 1).$$
:::

::: method zh="求幂级数展开的三种方法"
1. **已知展开的代数运算**：和、积（{@comparaison-rayons} 第 3 条）、代入 $x \mapsto cx$、$x \mapsto x^2$（例如 $\e^{-x^2} = \sum \frac{(-1)^n x^{2n}}{n!}$）、部分分式分解后用几何级数。
2. **逐项求导或积分**：若 $f'$ 的展开已知，积分得到 $f$ 的展开（{@derivation-se}；如 $\ln$、$\Arctan$、$\arcsin$）。不要忘记积分常数 $f(0)$。
3. **微分方程**：找到 $f$ 满足的线性微分方程，代入未知的幂级数，求系数的递推关系（如 {@binome}、{@airy}）。最后必须验证收敛半径 $> 0$，并说明幂级数确实等于 $f$：或者像 {@binome} 那样直接比较，或者用解的唯一性（{@cauchy-lipschitz-lineaire}）。
4. 只有在以上方法都不适用时，才去估计 Taylor 余项（{@taylor-reste}）。
:::

::: thm id=borel zh="Borel 引理" en="Borel's lemma" fr="Lemme de Borel" ru="Лемма Бореля" lvl=3 ref="Hörmander, *The Analysis of Linear Partial Differential Operators I*，§1.2"
对任意实数列 $(c_n)$，存在 $f \in \Cc^\infty(\R)$，使 $f^{(n)}(0) = c_n$ 对一切 $n$ 成立。因此 Taylor 级数可以有任意的系数，收敛半径甚至可以是 $0$。
:::

::: fr
Pour toute suite réelle $(c_n)$, il existe $f \in \Cc^\infty(\R)$ telle que $f^{(n)}(0) = c_n$ pour tout $n$. Ainsi la série de Taylor d'une fonction $\Cc^\infty$ peut avoir des coefficients arbitraires, et même un rayon de convergence nul.
:::

::: q
求 $f(x) = \dfrac{1}{(1 - x)(2 - x)}$ 在 $0$ 附近的幂级数展开及其收敛半径。
:::

::: ans
部分分式：$\frac{1}{(1-x)(2-x)} = \frac{1}{1-x} - \frac{1}{2-x}$（通分验证：分子 $(2 - x) - (1 - x) = 1$）。$\frac{1}{1-x} = \sum x^n$（$R = 1$），$\frac{1}{2-x} = \frac12 \cdot \frac{1}{1 - x/2} = \sum \frac{x^n}{2^{n+1}}$（$R = 2$）。所以
$$f(x) = \sum_{n \ge 0} \Big(1 - \frac{1}{2^{n+1}}\Big) x^n,$$
两个半径不同，由 {@comparaison-rayons} 后的注，$R = \min(1, 2) = 1$。也可直接看：系数 $\to 1$，用 {@dalembert-rayon}。
:::

::: q
求 $\dfrac{\e^x}{1 - x}$ 的展开系数，并求收敛半径。
:::

::: ans
Cauchy 乘积（{@comparaison-rayons} 第 3 条）：$\e^x = \sum \frac{x^n}{n!}$（$R = +\infty$），$\frac{1}{1-x} = \sum x^n$（$R = 1$），所以对 $\abs x < 1$，
$$\frac{\e^x}{1 - x} = \sum_{n \ge 0} c_n x^n, \qquad c_n = \sum_{k=0}^n \frac{1}{k!}.$$
收敛半径 $\ge 1$；而 $c_n \to \e \ne 0$，在 $x = 1$ 处通项不趋于 $0$，由 {@c4-rayon-pratique} 第 2 条 $R \le 1$。所以 $R = 1$。
:::

## 复指数与 π 的定义

到目前为止，我们使用的 $\exp$、$\cos$、$\sin$、$\pi$ 都来自 L1 的直观定义（$\cos$、$\sin$ 依赖于「角度」「弧长」）。法国大纲的做法是倒过来：**用幂级数定义** $\exp$，再定义 $\cos$、$\sin$，最后把 $\pi$ 定义为 $\cos$ 的一个零点的两倍。这样三角函数只依赖于实数公理。

::: def id=def-exp zh="复指数函数" en="Complex exponential" fr="Exponentielle complexe" ru="Комплексная экспонента"
对 $z \in \C$，定义
$$\exp(z) = \e^z = \sum_{n \ge 0} \frac{z^n}{n!}$$
（收敛半径 $+\infty$，{@c4-ex-rayons} 第 1 条），并定义
$$\cos z = \frac{\e^{\ii z} + \e^{-\ii z}}{2},\qquad \sin z = \frac{\e^{\ii z} - \e^{-\ii z}}{2\ii},\qquad \ch z = \frac{\e^{z} + \e^{-z}}{2},\qquad \sh z = \frac{\e^{z} - \e^{-z}}{2}.$$

白话：$\exp$ 是处处收敛的幂级数的和；三角函数与双曲函数都由它组合而成。
:::

::: fr
Pour $z \in \C$, on pose
$$\exp(z) = \e^z = \sum_{n \ge 0} \frac{z^n}{n!}$$
(rayon $+\infty$, {@fr:c4-ex-rayons}, point 1), puis
$$\cos z = \frac{\e^{\ii z} + \e^{-\ii z}}{2},\qquad \sin z = \frac{\e^{\ii z} - \e^{-\ii z}}{2\ii},\qquad \ch z = \frac{\e^{z} + \e^{-z}}{2},\qquad \sh z = \frac{\e^{z} - \e^{-z}}{2}.$$

Autrement dit, $\exp$ est la somme d'une série entière partout convergente ; les fonctions trigonométriques et hyperboliques s'en déduisent.
:::

::: ex id=c4-ex-exp lvl=1
1. **与 L1 一致**：对实数 $x$，$\exp(x)$ 就是 L1 的 $\e^x$（{@dse-usuels}）。对实数 $t$，把级数代入并合并（{@comparaison-rayons} 第 3 条）：$\ii^n + (-\ii)^n$ 在 $n$ 为奇数时为 $0$，在 $n = 2m$ 时为 $2(-1)^m$，所以
   $$\cos t = \sum_{m \ge 0} \frac{(-1)^m t^{2m}}{(2m)!},$$
   与 {@dse-usuels} 中 L1 的 $\cos$ 的展开相同；$\sin$ 同样（$\ii^n - (-\ii)^n$ 只在 $n = 2m+1$ 时非零，等于 $2\ii(-1)^m$）。所以新定义在 $\R$ 上与旧定义一致。
2. **复变量的新现象**：$\cos(\ii) = \frac{\e^{-1} + \e^{1}}{2} = \ch 1 > 1$。在 $\C$ 上 $\cos$ 不再有界：$\cos(\ii y) = \ch y \to +\infty$（$y \to +\infty$）。
:::

::: thm id=exp-morphisme zh="指数函数的函数方程" en="Functional equation of exp" fr="Propriété de morphisme de l'exponentielle" ru="Основное свойство экспоненты" lvl=1
对一切 $a, b \in \C$，$\exp(a + b) = \exp(a)\exp(b)$。
:::

::: fr
Pour tous $a, b \in \C$, $\exp(a + b) = \exp(a)\exp(b)$.
:::

::: proof
▷ 思路：两个绝对收敛级数的乘积等于它们的 Cauchy 乘积；Cauchy 乘积的第 $n$ 项恰好由二项式定理合并成 $\frac{(a+b)^n}{n!}$。

**第 1 步（绝对收敛）**　收敛半径为 $+\infty$，由 {@rayon-carac}，$\sum \frac{a^n}{n!}$ 与 $\sum \frac{b^n}{n!}$ 都绝对收敛。

**第 2 步（Cauchy 乘积的通项）**　对 $n \ge 0$，
$$c_n = \sum_{k=0}^n \frac{a^k}{k!} \cdot \frac{b^{n-k}}{(n-k)!} = \frac{1}{n!}\sum_{k=0}^n \binom nk a^k b^{n-k} = \frac{(a + b)^n}{n!} \qquad \text{（二项式定理）。}$$

**第 3 步（结论）**　由 {@produit-cauchy}，$\sum c_n$ 收敛且
$$\exp(a)\exp(b) = \sum_{n \ge 0} c_n = \sum_{n \ge 0} \frac{(a + b)^n}{n!} = \exp(a + b).$$
:::

::: fr
▷ Méthode : le produit de deux séries absolument convergentes est égal à leur produit de Cauchy ; le terme d'indice $n$ de ce produit se regroupe, par la formule du binôme, en $\frac{(a+b)^n}{n!}$.

**Étape 1 (convergence absolue)**　Le rayon vaut $+\infty$ ; d'après {@fr:rayon-carac}, $\sum \frac{a^n}{n!}$ et $\sum \frac{b^n}{n!}$ convergent absolument.

**Étape 2 (terme général du produit de Cauchy)**　Pour $n \ge 0$,
$$c_n = \sum_{k=0}^n \frac{a^k}{k!} \cdot \frac{b^{n-k}}{(n-k)!} = \frac{1}{n!}\sum_{k=0}^n \binom nk a^k b^{n-k} = \frac{(a + b)^n}{n!} \qquad \text{(formule du binôme).}$$

**Étape 3 (conclusion)**　D'après {@fr:produit-cauchy}, $\sum c_n$ converge et
$$\exp(a)\exp(b) = \sum_{n \ge 0} c_n = \sum_{n \ge 0} \frac{(a + b)^n}{n!} = \exp(a + b).$$
:::

::: cor id=c4-exp-proprietes zh="指数函数的基本性质" en="Basic properties of exp" fr="Propriétés élémentaires de l'exponentielle" ru="Основные свойства экспоненты" lvl=1
1. 对一切 $z \in \C$，$\exp(z) \ne 0$，且 $\exp(-z) = \frac{1}{\exp(z)}$。
2. $\overline{\exp z} = \exp \bar z$。
3. 对 $x \in \R$，$\exp(x) > 0$。
4. 对 $t \in \R$：$\abs{\e^{\ii t}} = 1$，$\cos t = \operatorname{Re} \e^{\ii t}$，$\sin t = \operatorname{Im} \e^{\ii t}$（特别地它们是实数），$\cos^2 t + \sin^2 t = 1$。
5. $t \mapsto \e^{\ii t}$ 在 $\R$ 上可导，$\frac{\dd}{\dd t}\e^{\ii t} = \ii\, \e^{\ii t}$；因此 $\cos' = -\sin$，$\sin' = \cos$。
:::

::: fr
1. Pour tout $z \in \C$, $\exp(z) \ne 0$ et $\exp(-z) = \frac{1}{\exp(z)}$.
2. $\overline{\exp z} = \exp \bar z$.
3. Pour $x \in \R$, $\exp(x) > 0$.
4. Pour $t \in \R$ : $\abs{\e^{\ii t}} = 1$, $\cos t = \operatorname{Re} \e^{\ii t}$, $\sin t = \operatorname{Im} \e^{\ii t}$ (en particulier ce sont des réels) et $\cos^2 t + \sin^2 t = 1$.
5. $t \mapsto \e^{\ii t}$ est dérivable sur $\R$ et $\frac{\dd}{\dd t}\e^{\ii t} = \ii\, \e^{\ii t}$ ; par conséquent $\cos' = -\sin$ et $\sin' = \cos$.
:::

::: proof
▷ 思路：1、3、4 都由函数方程 {@exp-morphisme} 与共轭（2）推出；5 是对实变量 $t$ 的幂级数逐项求导（{@derivation-se}）。

**1.**　由 {@exp-morphisme}，$\exp(z)\exp(-z) = \exp(0) = 1$（$\exp(0)$ 只有 $n = 0$ 一项，等于 $1$）。所以 $\exp(z) \ne 0$ 且 $\exp(-z) = 1/\exp(z)$。

**2.**　部分和满足 $\overline{\sum_{k \le n} \frac{z^k}{k!}} = \sum_{k \le n} \frac{\bar z^k}{k!}$（系数是实数）。共轭 $w \mapsto \bar w$ 连续，令 $n \to \infty$ 即得。

**3.**　由 2，$x$ 为实数时 $\exp(x) = \overline{\exp(x)}$ 是实数。由 {@exp-morphisme}，$\exp(x) = \exp(\frac x2)^2 \ge 0$，再由 1，$\exp(x) \ne 0$，所以 $\exp(x) > 0$。

**4.**　由 2，$\overline{\e^{\ii t}} = \e^{\overline{\ii t}} = \e^{-\ii t}$。于是
$$\abs{\e^{\ii t}}^2 = \e^{\ii t}\,\overline{\e^{\ii t}} = \e^{\ii t}\e^{-\ii t} = \e^0 = 1,$$
$\cos t = \frac{\e^{\ii t} + \overline{\e^{\ii t}}}{2} = \operatorname{Re}\e^{\ii t}$，$\sin t = \frac{\e^{\ii t} - \overline{\e^{\ii t}}}{2\ii} = \operatorname{Im}\e^{\ii t}$。所以 $\e^{\ii t} = \cos t + \ii \sin t$，$\cos^2 t + \sin^2 t = \abs{\e^{\ii t}}^2 = 1$。

**5.**　$\e^{\ii t} = \sum_{n \ge 0} \frac{\ii^n}{n!} t^n$ 是实变量 $t$、复系数的幂级数，收敛半径为 $+\infty$（$\abs{\ii^n / n!} = 1/n!$）。由 {@derivation-se}，
$$\frac{\dd}{\dd t}\e^{\ii t} = \sum_{n \ge 1} \frac{\ii^n}{(n-1)!} t^{n-1} = \ii \sum_{m \ge 0} \frac{\ii^m}{m!} t^m = \ii\,\e^{\ii t}.$$
由 4，左边是 $\cos' t + \ii \sin' t$，右边是 $\ii(\cos t + \ii\sin t) = -\sin t + \ii\cos t$。比较实部与虚部（$\cos, \sin$ 是实值的），$\cos' = -\sin$，$\sin' = \cos$。
:::

::: fr
▷ Méthode : 1, 3 et 4 découlent de l'équation fonctionnelle {@fr:exp-morphisme} et de la conjugaison (point 2) ; 5 est une dérivation terme à terme d'une série entière de la variable réelle $t$ ({@fr:derivation-se}).

**1.**　D'après {@fr:exp-morphisme}, $\exp(z)\exp(-z) = \exp(0) = 1$ ($\exp(0)$ se réduit au terme $n = 0$, égal à $1$). Donc $\exp(z) \ne 0$ et $\exp(-z) = 1/\exp(z)$.

**2.**　Les sommes partielles vérifient $\overline{\sum_{k \le n} \frac{z^k}{k!}} = \sum_{k \le n} \frac{\bar z^k}{k!}$ (coefficients réels). La conjugaison $w \mapsto \bar w$ est continue : on passe à la limite $n \to \infty$.

**3.**　D'après 2, pour $x$ réel, $\exp(x) = \overline{\exp(x)}$ est réel. D'après {@fr:exp-morphisme}, $\exp(x) = \exp(\frac x2)^2 \ge 0$, et d'après 1, $\exp(x) \ne 0$ ; donc $\exp(x) > 0$.

**4.**　D'après 2, $\overline{\e^{\ii t}} = \e^{\overline{\ii t}} = \e^{-\ii t}$. Ainsi
$$\abs{\e^{\ii t}}^2 = \e^{\ii t}\,\overline{\e^{\ii t}} = \e^{\ii t}\e^{-\ii t} = \e^0 = 1,$$
$\cos t = \frac{\e^{\ii t} + \overline{\e^{\ii t}}}{2} = \operatorname{Re}\e^{\ii t}$ et $\sin t = \frac{\e^{\ii t} - \overline{\e^{\ii t}}}{2\ii} = \operatorname{Im}\e^{\ii t}$. Donc $\e^{\ii t} = \cos t + \ii \sin t$ et $\cos^2 t + \sin^2 t = \abs{\e^{\ii t}}^2 = 1$.

**5.**　$\e^{\ii t} = \sum_{n \ge 0} \frac{\ii^n}{n!} t^n$ est une série entière de la variable réelle $t$, à coefficients complexes, de rayon $+\infty$ ($\abs{\ii^n / n!} = 1/n!$). D'après {@fr:derivation-se},
$$\frac{\dd}{\dd t}\e^{\ii t} = \sum_{n \ge 1} \frac{\ii^n}{(n-1)!} t^{n-1} = \ii \sum_{m \ge 0} \frac{\ii^m}{m!} t^m = \ii\,\e^{\ii t}.$$
D'après 4, le membre de gauche vaut $\cos' t + \ii \sin' t$ et celui de droite $\ii(\cos t + \ii\sin t) = -\sin t + \ii\cos t$. En identifiant parties réelles et imaginaires ($\cos$ et $\sin$ sont à valeurs réelles), $\cos' = -\sin$ et $\sin' = \cos$.
:::

::: thm id=def-pi zh="π 的分析定义" en="Analytic definition of π" fr="Définition analytique de π" ru="Аналитическое определение числа π" lvl=2
$\cos$ 在 $]0, 2[$ 上恰有一个零点，记为 $\frac{\pi}{2}$。于是 $t \mapsto \e^{\ii t}$ 是 $2\pi$ 周期的，并且它是从 $[0, 2\pi[$ 到单位圆 $\mathbb{U} = \{w \in \C : \abs w = 1\}$ 的双射。
:::

::: fr
La fonction $\cos$ admet un unique zéro dans $]0, 2[$, que l'on note $\frac{\pi}{2}$. Alors $t \mapsto \e^{\ii t}$ est $2\pi$-périodique et réalise une bijection de $[0, 2\pi[$ sur le cercle unité $\mathbb{U} = \{w \in \C : \abs w = 1\}$.
:::

::: sketch
▷ 思路：用交错级数的余项估计（{@csa}）得到 $\cos 2 < 0$ 与 $\sin > 0$（在 $]0, 2]$ 上）；介值定理与单调性给出唯一零点。然后 $\e^{\ii\pi/2} = \ii$ 给出周期；第一象限上的单调性加上「乘以 $\ii$ 转四分之一圈」给出双射。

**第 1 步（$\cos 2 < 0$）**　$\cos 2 = \sum_{n \ge 0} (-1)^n u_n$，$u_n = \frac{4^n}{(2n)!}$：$u_0 = 1$，$u_1 = 2$，$u_2 = \frac23$。$n \ge 1$ 时 $\frac{u_{n+1}}{u_n} = \frac{4}{(2n+1)(2n+2)} \le \frac{4}{12} < 1$，所以 $(u_n)_{n \ge 1}$ 递减趋于 $0$。对交错级数 $\sum_{n \ge 1}(-1)^n u_n$ 用 {@csa}（和介于相邻两个部分和 $-u_1$ 与 $-u_1 + u_2$ 之间）：
$$\cos 2 \le 1 - u_1 + u_2 = 1 - 2 + \tfrac23 = -\tfrac13 < 0.$$

**第 2 步（$\sin > 0$ 于 $]0, 2]$）**　设 $t \in ]0, 2]$。$\sin t = \sum_{n \ge 0} (-1)^n v_n$，$v_n = \frac{t^{2n+1}}{(2n+1)!}$，$\frac{v_{n+1}}{v_n} = \frac{t^2}{(2n+2)(2n+3)} \le \frac46 < 1$，由 {@csa}，$\sin t \ge v_0 - v_1 = t\big(1 - \frac{t^2}{6}\big) \ge t\big(1 - \frac46\big) > 0$。

**第 3 步（唯一零点）**　$\cos$ 连续，$\cos 0 = 1 > 0$，$\cos 2 < 0$，由介值定理，$\cos$ 在 $]0, 2[$ 上有零点。由 {@c4-exp-proprietes} 第 5 条，$\cos' = -\sin < 0$ 于 $]0, 2]$（第 2 步），所以 $\cos$ 在 $[0, 2]$ 上严格递减，零点唯一。记为 $\frac\pi2$。

**第 4 步（周期）**　$\sin^2\frac\pi2 = 1 - \cos^2\frac\pi2 = 1$ 且 $\sin\frac\pi2 > 0$（第 2 步），所以 $\sin\frac\pi2 = 1$，$\e^{\ii\pi/2} = \cos\frac\pi2 + \ii\sin\frac\pi2 = \ii$。由 {@exp-morphisme}，$\e^{\ii k\pi/2} = \ii^k$，特别地 $\e^{2\pi\ii} = \ii^4 = 1$，于是 $\e^{\ii(t + 2\pi)} = \e^{\ii t}\e^{2\pi\ii} = \e^{\ii t}$。

**第 5 步（满射）**　在 $[0, \frac\pi2]$ 上，$\cos$ 从 $1$ 严格递减到 $0$（第 3 步），$\sin \ge 0$（第 2 步与 $\sin 0 = 0$）。设 $w = a + \ii b \in \mathbb{U}$，$a, b \ge 0$。由介值定理，存在 $t_0 \in [0, \frac\pi2]$ 使 $\cos t_0 = a$；又 $\sin t_0 \ge 0$ 且 $\sin^2 t_0 = 1 - a^2 = b^2$，所以 $\sin t_0 = b$，$w = \e^{\ii t_0}$。一般的 $w \in \mathbb{U}$：存在 $k \in \{0, 1, 2, 3\}$，使 $\ii^{-k} w$ 的实部与虚部都 $\ge 0$（逐象限检查：乘以 $\ii^{-1} = -\ii$ 把 $a + \ii b$ 变为 $b - \ii a$，即把第二象限转到第一象限，等等）。于是 $\ii^{-k} w = \e^{\ii t_0}$，$w = \e^{\ii(t_0 + k\pi/2)}$；若 $t_0 + k\frac\pi2 = 2\pi$，由第 4 步改取 $0$。所以每个 $w$ 都是某个 $t \in [0, 2\pi[$ 的像。

**第 6 步（单射）**　反设 $0 \le s < t < 2\pi$ 且 $\e^{\ii s} = \e^{\ii t}$。令 $u = t - s \in ]0, 2\pi[$，则 $\e^{\ii u} = 1$。写 $u = k\frac\pi2 + v$，$k \in \{0, 1, 2, 3\}$，$v \in [0, \frac\pi2[$。则 $\e^{\ii v} = \ii^{-k} \in \{1, -\ii, -1, \ii\}$。但 $\cos v > 0$（$\cos$ 在 $[0, \frac\pi2]$ 上严格递减到 $0$），所以 $\ii^{-k} = 1$，$k = 0$，$\e^{\ii v} = 1$，$\sin v = 0$，而 $\sin > 0$ 于 $]0, 2]$，所以 $v = 0$，$u = 0$，矛盾。

特别地，$t \mapsto \e^{\ii t}$ 没有小于 $2\pi$ 的正周期。
:::

::: fr
▷ Méthode : la majoration du reste des séries alternées ({@fr:csa}) donne $\cos 2 < 0$ et $\sin > 0$ sur $]0, 2]$ ; le théorème des valeurs intermédiaires et la monotonie donnent l'unicité du zéro. Ensuite $\e^{\ii\pi/2} = \ii$ fournit la période ; la monotonie sur le premier quadrant et « la multiplication par $\ii$ fait un quart de tour » donnent la bijection.

**Étape 1 ($\cos 2 < 0$)**　On a $\cos 2 = \sum_{n \ge 0} (-1)^n u_n$ avec $u_n = \frac{4^n}{(2n)!}$ : $u_0 = 1$, $u_1 = 2$, $u_2 = \frac23$. Pour $n \ge 1$, $\frac{u_{n+1}}{u_n} = \frac{4}{(2n+1)(2n+2)} \le \frac{4}{12} < 1$, donc $(u_n)_{n \ge 1}$ décroît vers $0$. Le critère {@fr:csa} appliqué à $\sum_{n \ge 1}(-1)^n u_n$ (la somme est comprise entre les sommes partielles consécutives $-u_1$ et $-u_1 + u_2$) donne
$$\cos 2 \le 1 - u_1 + u_2 = 1 - 2 + \tfrac23 = -\tfrac13 < 0.$$

**Étape 2 ($\sin > 0$ sur $]0, 2]$)**　Soit $t \in ]0, 2]$. On a $\sin t = \sum_{n \ge 0} (-1)^n v_n$ avec $v_n = \frac{t^{2n+1}}{(2n+1)!}$ et $\frac{v_{n+1}}{v_n} = \frac{t^2}{(2n+2)(2n+3)} \le \frac46 < 1$ ; d'après {@fr:csa}, $\sin t \ge v_0 - v_1 = t\big(1 - \frac{t^2}{6}\big) \ge t\big(1 - \frac46\big) > 0$.

**Étape 3 (zéro unique)**　$\cos$ est continue, $\cos 0 = 1 > 0$ et $\cos 2 < 0$ : par le théorème des valeurs intermédiaires, $\cos$ s'annule sur $]0, 2[$. D'après le point 5 de {@fr:c4-exp-proprietes}, $\cos' = -\sin < 0$ sur $]0, 2]$ (étape 2), donc $\cos$ est strictement décroissante sur $[0, 2]$ et le zéro est unique. On le note $\frac\pi2$.

**Étape 4 (période)**　On a $\sin^2\frac\pi2 = 1 - \cos^2\frac\pi2 = 1$ et $\sin\frac\pi2 > 0$ (étape 2), donc $\sin\frac\pi2 = 1$ et $\e^{\ii\pi/2} = \cos\frac\pi2 + \ii\sin\frac\pi2 = \ii$. D'après {@fr:exp-morphisme}, $\e^{\ii k\pi/2} = \ii^k$ ; en particulier $\e^{2\pi\ii} = \ii^4 = 1$, d'où $\e^{\ii(t + 2\pi)} = \e^{\ii t}\e^{2\pi\ii} = \e^{\ii t}$.

**Étape 5 (surjectivité)**　Sur $[0, \frac\pi2]$, $\cos$ décroît strictement de $1$ à $0$ (étape 3) et $\sin \ge 0$ (étape 2 et $\sin 0 = 0$). Soit $w = a + \ii b \in \mathbb{U}$ avec $a, b \ge 0$. Par le théorème des valeurs intermédiaires, il existe $t_0 \in [0, \frac\pi2]$ tel que $\cos t_0 = a$ ; comme $\sin t_0 \ge 0$ et $\sin^2 t_0 = 1 - a^2 = b^2$, on a $\sin t_0 = b$, donc $w = \e^{\ii t_0}$. Pour $w \in \mathbb{U}$ quelconque, il existe $k \in \{0, 1, 2, 3\}$ tel que $\ii^{-k} w$ ait parties réelle et imaginaire positives (vérification quadrant par quadrant : la multiplication par $\ii^{-1} = -\ii$ envoie $a + \ii b$ sur $b - \ii a$, c'est-à-dire le deuxième quadrant sur le premier, etc.). Alors $\ii^{-k} w = \e^{\ii t_0}$ et $w = \e^{\ii(t_0 + k\pi/2)}$ ; si $t_0 + k\frac\pi2 = 2\pi$, on le remplace par $0$ (étape 4). Tout $w$ est donc l'image d'un $t \in [0, 2\pi[$.

**Étape 6 (injectivité)**　Par l'absurde, soient $0 \le s < t < 2\pi$ avec $\e^{\ii s} = \e^{\ii t}$. Posons $u = t - s \in ]0, 2\pi[$ ; alors $\e^{\ii u} = 1$. Écrivons $u = k\frac\pi2 + v$ avec $k \in \{0, 1, 2, 3\}$ et $v \in [0, \frac\pi2[$. Alors $\e^{\ii v} = \ii^{-k} \in \{1, -\ii, -1, \ii\}$. Or $\cos v > 0$ ($\cos$ décroît strictement jusqu'à $0$ sur $[0, \frac\pi2]$), donc $\ii^{-k} = 1$, $k = 0$, $\e^{\ii v} = 1$ et $\sin v = 0$ ; comme $\sin > 0$ sur $]0, 2]$, $v = 0$, d'où $u = 0$ : contradiction.

En particulier, $t \mapsto \e^{\ii t}$ n'a pas de période strictement positive inférieure à $2\pi$.
:::

::: rem
Euler 公式 $\e^{\ii\pi} + 1 = 0$ 在这里是定义的直接推论（第 4 步：$\e^{\ii\pi} = \ii^2 = -1$）。用这种方式，三角函数和 $\pi$ 不再依赖几何直观（「弧长」「角度」），整个分析可以建立在实数公理之上。数值上，$\frac\pi2 \approx 1.5708$ 确实在 $]0, 2[$ 中。
:::

::: q
求所有满足 $\e^z = 1$ 的 $z \in \C$。$\exp$ 在 $\C$ 上是单射吗？
:::

::: ans
写 $z = x + \ii y$。由 {@exp-morphisme}，$\e^z = \e^x \e^{\ii y}$，取模（{@c4-exp-proprietes} 第 3、4 条）：$\abs{\e^z} = \e^x$。$\e^z = 1$ 推出 $\e^x = 1$；$x \mapsto \e^x$ 在 $\R$ 上严格递增（导数 $\e^x > 0$），所以 $x = 0$。再写 $y = 2\pi m + y_0$，$m \in \Z$，$y_0 \in [0, 2\pi[$，由周期性 $\e^{\ii y_0} = \e^{\ii y} = 1 = \e^{\ii 0}$，由 {@def-pi} 的单射性，$y_0 = 0$。所以 $\e^z = 1 \iff z \in 2\pi\ii\Z$。$\exp$ 不是单射：$\e^{2\pi\ii} = \e^0$。
:::

::: fr
Écrivons $z = x + \ii y$. D'après {@fr:exp-morphisme}, $\e^z = \e^x \e^{\ii y}$ et, en prenant le module ({@fr:c4-exp-proprietes}, points 3 et 4), $\abs{\e^z} = \e^x$. Si $\e^z = 1$, alors $\e^x = 1$ ; comme $x \mapsto \e^x$ est strictement croissante sur $\R$ (dérivée $\e^x > 0$), $x = 0$. Écrivons ensuite $y = 2\pi m + y_0$ avec $m \in \Z$, $y_0 \in [0, 2\pi[$ ; par périodicité $\e^{\ii y_0} = \e^{\ii y} = 1 = \e^{\ii 0}$, et l'injectivité de {@fr:def-pi} donne $y_0 = 0$. Ainsi $\e^z = 1 \iff z \in 2\pi\ii\Z$, et $\exp$ n'est pas injective : $\e^{2\pi\ii} = \e^0$.
:::

## 交互：Taylor 多项式

::: demo id=taylor
选择函数并拖动阶数 $N$。绿色带是收敛区间 $]-R, R[$。注意 $\frac{1}{1+x^2}$：它在 $\R$ 上任意次可导，Taylor 级数的收敛半径却只有 $1$。在实轴上看不到原因，原因在复平面上：$z = \pm\ii$ 是奇点，收敛圆盘不能越过它们。
:::

::: q
在演示中选 $\ln(1 + x)$。Taylor 多项式在 $x = 1$ 处收敛吗？在 $x = 1.5$ 处呢？在 $x = -1$ 处呢？用本章的定理解释你看到的现象。
:::

::: ans
收敛半径为 $1$（{@dse-usuels}；也可由 $\abs{a_n} = \frac1n$ 与 {@dalembert-rayon}）。

- $x = 1.5 > R$：由 {@rayon-carac} 第 2 条，通项 $\frac{(-1)^{n+1}1.5^n}{n}$ 无界，Taylor 多项式剧烈振荡，不收敛——尽管 $\ln(1 + 1.5)$ 有定义。
- $x = 1 = R$：交错级数收敛，由 Abel 定理（{@ln2}），极限是 $\ln 2$，但收敛很慢（误差约 $\frac{1}{N+1}$，{@csa}）。
- $x = -1$：$\ln 0$ 无定义，级数是 $-\sum\frac1n$，发散到 $-\infty$。

与 $\frac{1}{1 + x^2}$ 对照：那里实轴上没有任何奇点，半径为 $1$ 的原因是复平面上的 $\pm\ii$（$\abs{\pm\ii} = 1$）。
:::

## 应用：生成函数与微分方程

系数唯一性（{@unicite-coef}）把「数列的问题」与「函数的问题」联系起来：把数列 $(u_n)$ 编码成幂级数 $\sum u_n x^n$（**生成函数**），递推关系变成函数方程，解出函数后再展开，比较系数就得到 $u_n$。反过来，微分方程的解可以通过系数的递推关系求出。两个方向的关键步骤都是：**先证明收敛半径为正**，否则等式没有意义。

::: ex id=fibonacci zh="Fibonacci 数" lvl=1
$F_0 = 0$，$F_1 = 1$，$F_{n+2} = F_{n+1} + F_n$。证明 Binet 公式
$$F_n = \frac{\varphi^n - \psi^n}{\sqrt5},\qquad \varphi = \frac{1 + \sqrt5}{2},\ \psi = \frac{1 - \sqrt5}{2}.$$

- **第 1 步（收敛半径为正）**：归纳可证 $0 \le F_n \le 2^n$（$F_0 = 0 \le 1$，$F_1 = 1 \le 2$；若对 $n$、$n + 1$ 成立，则 $F_{n+2} \le 2^{n+1} + 2^n \le 2^{n+2}$）。由 {@comparaison-rayons} 第 1 条，$G(x) = \sum F_n x^n$ 的收敛半径 $\ge \frac12$。
- **第 2 步（函数方程）**：对 $\abs x < \frac12$，三个收敛级数相加（约定 $F_{-1} = F_{-2} = 0$）：
  $$G(x) - xG(x) - x^2G(x) = \sum_{n \ge 0} (F_n - F_{n-1} - F_{n-2}) x^n = F_0 + (F_1 - F_0)x = x,$$
  因为 $n \ge 2$ 时括号为 $0$。
- **第 3 步（解出 $G$）**：$\varphi + \psi = 1$，$\varphi\psi = -1$，所以 $1 - x - x^2 = (1 - \varphi x)(1 - \psi x)$，它的根 $\frac1\varphi \approx 0.618$、$\frac1\psi \approx -1.618$ 都在 $\abs x < \frac12$ 之外。于是 $G(x) = \frac{x}{(1 - \varphi x)(1 - \psi x)}$。部分分式：
  $$\frac{x}{(1 - \varphi x)(1 - \psi x)} = \frac{1}{\varphi - \psi}\Big(\frac{1}{1 - \varphi x} - \frac{1}{1 - \psi x}\Big)$$
  （通分：分子 $(1 - \psi x) - (1 - \varphi x) = (\varphi - \psi)x$），$\varphi - \psi = \sqrt5$。
- **第 4 步（展开并比较系数）**：对 $\abs x < \frac1\varphi$（$\abs\psi < \varphi$），$\frac{1}{1 - \varphi x} = \sum \varphi^n x^n$，$\frac{1}{1 - \psi x} = \sum \psi^n x^n$。所以在 $\abs x < \frac12$ 上 $\sum F_n x^n = \sum \frac{\varphi^n - \psi^n}{\sqrt5} x^n$，由 {@unicite-coef}，$F_n = \frac{\varphi^n - \psi^n}{\sqrt5}$。
:::

::: ex id=bernoulli zh="Bernoulli 数" lvl=2
函数 $\frac{x}{\e^x - 1}$（在 $0$ 处补充定义为 $1$）在 $0$ 附近可展开为 $\sum_{n \ge 0} \frac{B_n}{n!} x^n$，$B_n$ 称为 **Bernoulli 数**。$B_0 = 1$，$B_1 = -\frac12$，$B_2 = \frac16$，$B_4 = -\frac{1}{30}$，奇数下标 $\ge 3$ 时 $B_n = 0$。

- **第 1 步（用递推定义系数）**：令 $E(x) = \frac{\e^x - 1}{x} = \sum_{j \ge 0} \frac{x^j}{(j+1)!}$（收敛半径 $+\infty$）。若 $\big(\sum b_n x^n\big) E(x) = 1$，比较 $x^n$ 的系数（Cauchy 乘积）应有 $b_0 = 1$，且对 $n \ge 1$
  $$\sum_{k=0}^n \frac{b_k}{(n-k+1)!} = 0, \qquad\text{即}\qquad b_n = -\sum_{k=0}^{n-1} \frac{b_k}{(n-k+1)!}.$$
  用这个递推**定义** $(b_n)$。乘以 $(n+1)!$ 并记 $B_n = n!\,b_n$，得 $\sum_{k=0}^n \binom{n+1}{k} B_k = 0$（$n \ge 1$），由此依次算出 $B_1 = -\frac12$，$B_2 = \frac16$，$B_3 = 0$，$B_4 = -\frac1{30}$。
- **第 2 步（收敛半径 $\ge 1$）**：强归纳证明 $\abs{b_n} \le 1$。$b_0 = 1$；若 $\abs{b_k} \le 1$（$k < n$），则 $\abs{b_n} \le \sum_{k=0}^{n-1}\frac{1}{(n-k+1)!} = \sum_{j=2}^{n+1}\frac{1}{j!} \le \e - 2 < 1$。由 {@c4-rayon-pratique}（$z_0 = 1$），收敛半径 $\ge 1$。
- **第 3 步（等式）**：对 $0 < \abs x < 1$，两个级数都绝对收敛，由 {@comparaison-rayons} 第 3 条与第 1 步，$\big(\sum b_n x^n\big)E(x) = 1$；$x \ne 0$ 时 $E(x) \ne 0$，所以 $\sum b_n x^n = \frac{x}{\e^x - 1}$。$x = 0$ 时两边都是 $1$。
- **第 4 步（奇数下标）**：$\frac{x}{\e^x - 1} + \frac x2 = \frac x2 \cdot \frac{\e^x + 1}{\e^x - 1}$ 是偶函数（把 $x$ 换成 $-x$，分子分母同乘 $\e^x$ 即可验证）。由 {@unicite-coef}，它的奇数次系数为 $0$：$b_1 + \frac12 = 0$，$b_{2k+1} = 0$（$k \ge 1$）。

收敛半径实际上是 $2\pi$：在复平面上 $\e^z - 1$ 的非零零点是 $\pm 2\pi\ii, \pm 4\pi\ii, \dots$（{@def-pi} 后的「想一想」），最近的是 $\pm 2\pi\ii$；严格证明需要复分析。Bernoulli 数出现在 Euler 公式
$$\zeta(2k) = \frac{(-1)^{k+1} B_{2k} (2\pi)^{2k}}{2\,(2k)!}$$
中（$k = 1$ 给出 $\frac{\pi^2}{6}$，$k = 2$ 给出 $\frac{\pi^4}{90}$；第 5 章用 Parseval 恒等式证明这两个情形，{@bale}），也出现在 Euler–Maclaurin 求和公式中。
:::

::: ex id=airy zh="Airy 方程" lvl=1
求 $y'' = xy$ 的幂级数解。

- **第 1 步（化为系数的递推）**：设 $y = \sum a_n x^n$ 的收敛半径 $R > 0$。在 $]-R, R[$ 上，由 {@derivation-se}，$y''(x) = \sum_{n \ge 0} (n+2)(n+1)a_{n+2} x^n$，而 $xy(x) = \sum_{n \ge 1} a_{n-1} x^n$。由 {@unicite-coef}，$y'' = xy$ 于 $]-R, R[$ 当且仅当
  $$2a_2 = 0, \qquad (n+2)(n+1)\,a_{n+2} = a_{n-1} \quad (n \ge 1).$$
- **第 2 步（解递推）**：令 $m = n + 2$，递推即 $m(m-1)\,a_m = a_{m-3}$（$m \ge 3$）。$a_0, a_1$ 任意，$a_2 = 0$，从而 $a_{3k+2} = 0$；
  $$a_{3k} = \frac{a_0}{\prod_{j=1}^k (3j)(3j-1)}, \qquad a_{3k+1} = \frac{a_1}{\prod_{j=1}^k (3j+1)(3j)}.$$
- **第 3 步（收敛半径为 $+\infty$）**：系数有无穷多个为 $0$，不能直接用 {@dalembert-rayon}。设 $r > 0$ 且 $a_0 \ne 0$，令 $u_k = \abs{a_{3k}} r^{3k}$，则 $\frac{u_{k}}{u_{k-1}} = \frac{r^3}{3k(3k-1)} \to 0$，由 d'Alembert 判别法（{@dalembert}），$\sum u_k$ 收敛，$u_k \to 0$；同样处理 $\abs{a_{3k+1}} r^{3k+1}$（$a_1 \ne 0$ 时）；$a_0 = 0$ 或 $a_1 = 0$ 时对应的子列恒为 $0$。所以 $(a_m r^m)$ 有界，$r \le R$；$r$ 任意，$R = +\infty$。
- **第 4 步（结论）**：$R = +\infty$，第 1 步的等价在整个 $\R$ 上成立，所以由第 2 步定义的每个幂级数都是 $y'' = xy$ 在 $\R$ 上的解。$(a_0, a_1) = (1, 0)$ 与 $(0, 1)$ 给出两个解 $y_1, y_2$，它们线性无关（$y_1(0) = 1$，$y_1'(0) = 0$；$y_2(0) = 0$，$y_2'(0) = 1$）。由第 8 章（{@structure-solutions}），二阶线性方程的解空间是二维的，所以每个解都是 $a_0 y_1 + a_1 y_2$，在 $\R$ 上可展开为幂级数。
:::

::: q
设 $u_0 = 0$，$u_{n+1} = 2u_n + 1$。用生成函数求 $u_n$。
:::

::: ans
**收敛半径**：归纳得 $0 \le u_n \le 3^n$（$u_{n+1} \le 2 \cdot 3^n + 1 \le 3^{n+1}$），所以 $U(x) = \sum u_n x^n$ 的收敛半径 $\ge \frac13$（{@comparaison-rayons}）。

**函数方程**：对 $\abs x < \frac13$，
$$U(x) - 2xU(x) = u_0 + \sum_{n \ge 1} (u_n - 2u_{n-1}) x^n = \sum_{n \ge 1} x^n = \frac{x}{1 - x}.$$
所以 $U(x) = \frac{x}{(1 - x)(1 - 2x)} = \frac{1}{1 - 2x} - \frac{1}{1 - x}$（通分：分子 $(1 - x) - (1 - 2x) = x$）$= \sum (2^n - 1) x^n$。由 {@unicite-coef}，$u_n = 2^n - 1$。
:::

## 方法总结

::: method zh="如何求收敛半径"
1. **系数比值有极限**：$\big|\frac{a_{n+1}}{a_n}\big| \to \ell$，则 $R = \frac1\ell$（{@dalembert-rayon}）。
2. **缺项或比值无极限**：对通项 $\abs{a_n z^n}$ 本身用比值或根值判别法，再用 {@c4-rayon-pratique}（{@c4-ex-lacunaire}）；或用 Cauchy–Hadamard 公式 $R = 1/\limsup \abs{a_n}^{1/n}$（{@hadamard}），上极限按 {@c4-limsup-carac} (D) 分拆计算。
3. **比较**：$a_n = O(b_n) \Rightarrow R_a \ge R_b$；$a_n \sim b_n \Rightarrow R_a = R_b$；乘以 $n^k$ 不改变半径（{@comparaison-rayons}）。
4. **看一个特殊点 $z_0$**：通项有界 $\Rightarrow R \ge \abs{z_0}$；级数发散 $\Rightarrow R \le \abs{z_0}$；半收敛 $\Rightarrow R = \abs{z_0}$（{@c4-rayon-pratique}）。
5. **和与积**：半径 $\ge \min(R_a, R_b)$；$R_a \ne R_b$ 时和的半径恰为最小值（{@comparaison-rayons} 后的注）。
:::

::: method zh="如何研究和函数"
1. 在开圆盘（开区间）内：连续，$\Cc^\infty$，可以逐项求导、逐项积分，导数级数半径不变（{@cv-normale-disque}，{@derivation-se}）。
2. 一致收敛只在闭子圆盘 $\overline{D}(0, r)$（$r < R$）上保证（{@c4-cex-geom-unif}）。
3. 在端点 $x = R$：若 $\sum a_n R^n$ 收敛，Abel 定理给出 $\lim_{x \to R^-} S(x) = \sum a_n R^n$（{@abel-radial}）；反之不成立（{@tauber}）。
4. 系数由和函数决定：$a_n = \frac{S^{(n)}(0)}{n!}$；在 $0$ 的邻域上相等的两个幂级数系数相同；偶函数只有偶数次项（{@unicite-coef}）。
:::

::: method zh="如何展开一个函数 / 证明不能展开"
1. 用常用展开（{@dse-usuels}，{@binome}）做代数运算、代入、部分分式分解（第 3 节第一个「想一想」）。
2. 逐项积分已知的导数展开（$\ln$、$\Arctan$、$\arcsin$：{@c4-ex-arcsin}）。
3. 微分方程 + 系数递推，验证半径 $> 0$，再用唯一性（{@binome}，{@airy}）。
4. 估计 Taylor 余项（{@taylor-reste}），适用于各阶导数一致有界的函数。
5. **不能展开**：函数不是 $\Cc^\infty$；或 Taylor 级数在 $x \ne 0$ 处不收敛到 $f$（{@cex-non-dse}）；或 Taylor 级数的半径小于所要求的区间（{@c4-ex-dse} 第 3 条）。
:::

::: method zh="如何用幂级数求和、解递推与微分方程"
1. **数项级数求和**：把 $\sum a_n x_0^n$ 看成已知和函数在 $x_0$ 处的值；$x_0$ 在边界上时必须用 Abel 定理（{@ln2}）。$\sum n a_n x^n = x S'(x)$，$\sum \frac{a_n}{n+1}x^{n+1} = \int_0^x S$ 用来处理多项式或有理因子。
2. **线性递推**：写出生成函数，证明半径 $> 0$，由递推得函数方程，部分分式展开，比较系数（{@fibonacci}）。
3. **线性微分方程**：代入幂级数，比较系数得递推，证明半径 $> 0$（缺项时按子列分别处理），最后说明它就是所求的解（{@airy}）。
:::

::: rem
**常见错误。**

1. **在收敛区间的端点直接代入。** $\ln(1 + x) = \sum \frac{(-1)^{n+1}}{n}x^n$ 只在 $]-1, 1[$ 上由逐项积分得到；$x = 1$ 处的等式需要 Abel 定理（{@ln2}）。
2. **缺项级数套用系数比值。** $\sum \frac{z^{2n}}{4^n}$ 的「系数」$\frac{1}{4^n}$ 属于 $z^{2n}$，不是 $z^n$：$R = 2$，不是 $4$（{@c4-ex-lacunaire}）。
3. **以为在整个收敛圆盘上一致收敛。** $\sum x^n$ 在 $]-1, 1[$ 上不一致收敛（{@c4-cex-geom-unif}）；连续性、逐项求导等结论要通过闭子区间局部化得到。
4. **以为 $\Cc^\infty$ 函数等于它的 Taylor 级数**（{@cex-non-dse}），或以为 Taylor 级数的半径由实轴上的奇点决定（$\frac{1}{1+x^2}$，{@c4-ex-dse}）。
5. **把「$\ge \min(R_a, R_b)$」当成等式**：积的半径可以更大（$(1 - z)\sum z^n = 1$）。
6. **生成函数方法中忘记先证明半径 $> 0$**：没有这一步，函数方程只是形式运算。
:::

::: read
- Г. М. Фихтенгольц,《Курс дифференциального и интегрального исчисления》，т. II：степенные ряды, разложение элементарных функций в степенные ряды, теорема Абеля. ——展开计算写得最细，大量具体函数的展开与数值例子。
- В. А. Зорич,《Математический анализ》，ч. I：степенные ряды в комплексной области, экспонента, формула Эйлера и взаимосвязь элементарных функций. ——与本章第 4 节同样用级数定义 $\exp$、$\cos$、$\sin$，观点现代。
- Б. П. Демидович,《Сборник задач и упражнений по математическому анализу》：степенные ряды, область сходимости, разложение функций в степенные ряды. ——求收敛半径与展开的计算题非常多，按难度排列。
- X. Gourdon,《Les maths en tête : Analyse》：séries entières. ——法国 MP 风格的标准参考书，生成函数与微分方程方法的例题丰富。
- W. Rudin,《Principles of Mathematical Analysis》：Some Special Functions（第 8 章：幂级数、Abel 定理、指数与三角函数、π 的定义）。——简洁严格，可与第 4 节对照。
- G. H. Hardy,《Divergent Series》：Abel 求和与 Tauber 型定理。——想深入了解 Abel 定理之逆的读者的经典读物。
:::

::: glossary
| 中文 | Français | English | Русский |
|---|---|---|---|
| 幂级数 | série entière (f.) | power series | степенной ряд |
| 系数 | coefficient (m.) | coefficient | коэффициент |
| 收敛半径 | rayon de convergence (m.) | radius of convergence | радиус сходимости |
| 收敛圆盘 | disque ouvert de convergence (m.) | disc of convergence | круг сходимости |
| 收敛区间 | intervalle ouvert de convergence (m.) | interval of convergence | интервал сходимости |
| Abel 引理 | lemme (m.) d'Abel | Abel's lemma | лемма Абеля |
| 上极限 | limite supérieure (f.) | limit superior | верхний предел |
| Cauchy–Hadamard 公式 | formule (f.) de Cauchy–Hadamard | Cauchy–Hadamard formula | формула Коши — Адамара |
| 比值判别法（d'Alembert） | règle (f.) de d'Alembert | ratio test | признак Даламбера |
| 粗发散 | divergence grossière (f.) | divergence (terms not tending to 0) | расходимость (общий член не стремится к нулю) |
| 半收敛 | semi-convergence (f.) | conditional convergence | условная сходимость |
| 缺项级数 | série lacunaire (f.) | lacunary series | лакунарный ряд |
| 和函数 | fonction somme (f.) | sum function | сумма ряда |
| Cauchy 乘积 | produit (m.) de Cauchy | Cauchy product | произведение рядов по Коши |
| 闭子圆盘上的正规收敛 | convergence normale (f.) sur tout disque fermé | normal convergence on closed subdiscs | нормальная сходимость в замкнутом подкруге |
| 逐项求导 | dérivation (f.) terme à terme | term-by-term differentiation | почленное дифференцирование |
| 逐项积分 | intégration (f.) terme à terme | term-by-term integration | почленное интегрирование |
| 系数的唯一性 | unicité (f.) des coefficients | uniqueness of coefficients | единственность разложения |
| 比较系数 | identifier les coefficients | compare coefficients | сравнить коэффициенты |
| Abel 径向定理 | théorème radial (m.) d'Abel | Abel's theorem | теорема Абеля (вторая) |
| Tauber 型定理 | théorème taubérien (m.) | Tauberian theorem | тауберова теорема |
| 可展开为幂级数 | développable en série entière (DSE) | expandable in a power series | разложимая в степенной ряд |
| Taylor 级数 | série (f.) de Taylor | Taylor series | ряд Тейлора |
| 积分余项 | reste intégral (m.) | integral remainder | остаточный член в интегральной форме |
| 解析函数 | fonction analytique (f.) | analytic function | аналитическая функция |
| 二项式级数 | série (f.) du binôme | binomial series | биномиальный ряд |
| 广义二项式系数 | coefficient binomial généralisé (m.) | generalized binomial coefficient | обобщённый биномиальный коэффициент |
| 部分分式分解 | décomposition (f.) en éléments simples | partial fraction decomposition | разложение на простейшие дроби |
| Borel 引理 | lemme (m.) de Borel | Borel's lemma | лемма Бореля |
| 复指数函数 | exponentielle complexe (f.) | complex exponential | комплексная экспонента |
| 指数的函数方程 | propriété (f.) de morphisme de l'exponentielle | functional equation of the exponential | основное свойство экспоненты |
| Euler 公式 | formule (f.) d'Euler | Euler's formula | формула Эйлера |
| 单位圆 | cercle unité (m.) | unit circle | единичная окружность |
| 周期 | période (f.) | period | период |
| 生成函数 | série génératrice (f.) | generating function | производящая функция |
| 递推关系 | relation (f.) de récurrence | recurrence relation | рекуррентное соотношение |
| Bernoulli 数 | nombres (m. pl.) de Bernoulli | Bernoulli numbers | числа Бернулли |
| Airy 方程 | équation (f.) d'Airy | Airy equation | уравнение Эйри |
| 幂级数解 | solution (f.) développable en série entière | power series solution | решение в виде степенного ряда |
:::
