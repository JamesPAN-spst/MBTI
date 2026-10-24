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

<!-- APPEND -->
