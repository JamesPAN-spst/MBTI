本章把 Riemann 积分推广到 $\R^n$ 中的区域，核心工具有两个：**Fubini 定理**把重积分化为累次积分，**变量替换公式**处理坐标变换，其中 Jacobi 行列式起着「体积伸缩因子」的作用。最后一节介绍曲线积分与 Green–Riemann 公式，它是微积分基本定理在平面上的推广。这一章属于法国 licence L2 的内容（MP 大纲没有）。L2 采用 Riemann 方法，完整的理论（Lebesgue 测度、一般的 Fubini–Tonelli 定理）在 L3 完成，所以本章有几个证明只给出概要。

阅读路线：第 1–2 节建立理论（Darboux 和、零容度集、Jordan 可测集），其中标 ★★ 的技术性引理第一遍可以只看陈述；第 3–5 节是计算的核心（Fubini、极坐标与球坐标、Γ 与 Β 函数、Green–Riemann），每个计算都写出了代换、Jacobi 行列式和积分限；第 7 节「方法总结」按「想算什么」整理全章的方法。

## 矩形上的积分

一元 Riemann 积分的做法是：把区间切成小段，在每一段上用常数从上、下两侧夹住函数。在 $\R^n$ 中，最自然的「小段」是各边平行于坐标轴的小矩形。本节先在矩形上定义积分，证明连续函数可积，再证明 Fubini 定理：矩形上的重积分可以化成逐次的一元积分。

::: def id=def-integrale-pave zh="矩形上的 Riemann 积分" en="Riemann integral on a box" fr="Intégrale de Riemann sur un pavé" ru="Интеграл Римана по брусу"
设 $P = [a_1, b_1] \times \dots \times [a_n, b_n]$（$a_i < b_i$）是闭矩形（pavé），体积 $\operatorname{vol}(P) = \prod_{i=1}^n (b_i - a_i)$。

1. **分割**：对每个 $i$ 取 $[a_i, b_i]$ 的分点 $a_i = t_{i,0} < t_{i,1} < \dots < t_{i,N_i} = b_i$。所有形如
$$Q = [t_{1,j_1-1}, t_{1,j_1}] \times \dots \times [t_{n,j_n-1}, t_{n,j_n}] \qquad (1 \le j_i \le N_i)$$
的小矩形组成的集合 $\sigma$ 称为 $P$ 的一个**分割**（每个坐标区间分割的乘积）。展开乘积 $\prod_{i}\sum_{j}(t_{i,j} - t_{i,j-1})$ 可知 $\sum_{Q \in \sigma}\operatorname{vol}(Q) = \operatorname{vol}(P)$。若 $\sigma'$ 在每个坐标上的分点都包含 $\sigma$ 的分点，称 $\sigma'$ 比 $\sigma$ **细**；把 $\sigma$、$\tau$ 的分点逐个坐标取并，得到比两者都细的**公共加细** $\sigma \vee \tau$。
2. **Darboux 和**：设 $f : P \to \R$ 有界。对 $Q \in \sigma$ 记 $M_Q(f) = \sup_Q f$，$m_Q(f) = \inf_Q f$，定义 Darboux 上和与下和
$$S^+(f, \sigma) = \sum_{Q \in \sigma} M_Q(f)\operatorname{vol}(Q),\qquad S^-(f, \sigma) = \sum_{Q \in \sigma} m_Q(f)\operatorname{vol}(Q).$$
3. **可积**：若
$$\inf_{\sigma} S^+(f, \sigma) = \sup_{\sigma} S^-(f, \sigma),$$
称 $f$ 在 $P$ 上 **Riemann 可积**，这个公共值记为 $\int_P f$；二维时也写 $\iint_P f(x, y)\,\dd x\,\dd y$，三维时写 $\iiint_P f$。

白话：用分片常数函数从上、下两侧夹住 $f$；如果上、下两侧的「带符号体积」可以任意接近，它们共同的值就是积分。
:::

::: fr
Soit $P = [a_1, b_1] \times \dots \times [a_n, b_n]$ ($a_i < b_i$) un pavé fermé, de volume $\operatorname{vol}(P) = \prod_{i=1}^n (b_i - a_i)$.

1. **Subdivision** : pour chaque $i$, on choisit des points $a_i = t_{i,0} < t_{i,1} < \dots < t_{i,N_i} = b_i$. L'ensemble $\sigma$ des sous-pavés
$$Q = [t_{1,j_1-1}, t_{1,j_1}] \times \dots \times [t_{n,j_n-1}, t_{n,j_n}] \qquad (1 \le j_i \le N_i)$$
est appelé une **subdivision** de $P$ (produit de subdivisions des intervalles). En développant le produit $\prod_{i}\sum_{j}(t_{i,j} - t_{i,j-1})$, on obtient $\sum_{Q \in \sigma}\operatorname{vol}(Q) = \operatorname{vol}(P)$. On dit que $\sigma'$ est **plus fine** que $\sigma$ si, pour chaque coordonnée, les points de $\sigma'$ contiennent ceux de $\sigma$ ; en réunissant coordonnée par coordonnée les points de $\sigma$ et de $\tau$, on obtient une subdivision $\sigma \vee \tau$ plus fine que les deux.
2. **Sommes de Darboux** : soit $f : P \to \R$ bornée. Pour $Q \in \sigma$, on note $M_Q(f) = \sup_Q f$, $m_Q(f) = \inf_Q f$, et l'on définit les sommes de Darboux supérieure et inférieure
$$S^+(f, \sigma) = \sum_{Q \in \sigma} M_Q(f)\operatorname{vol}(Q),\qquad S^-(f, \sigma) = \sum_{Q \in \sigma} m_Q(f)\operatorname{vol}(Q).$$
3. **Intégrabilité** : si
$$\inf_{\sigma} S^+(f, \sigma) = \sup_{\sigma} S^-(f, \sigma),$$
on dit que $f$ est **intégrable au sens de Riemann** sur $P$ ; la valeur commune est notée $\int_P f$, ou $\iint_P f(x, y)\,\dd x\,\dd y$ si $n = 2$, $\iiint_P f$ si $n = 3$.

Autrement dit : on encadre $f$ par des fonctions constantes par morceaux ; si les « volumes algébriques » des encadrements supérieur et inférieur peuvent être rendus arbitrairement proches, leur valeur commune est l'intégrale.
:::

::: lem id=c11-raffinement zh="加细与上下和" en="Refinement and Darboux sums" fr="Raffinement et sommes de Darboux" ru="Измельчение разбиения и суммы Дарбу" lvl=1
设 $f : P \to \R$ 有界，$\sigma, \tau$ 是 $P$ 的分割。

1. 若 $\tau$ 比 $\sigma$ 细，则
$$S^-(f, \sigma) \le S^-(f, \tau) \le S^+(f, \tau) \le S^+(f, \sigma).$$
2. 对任意两个分割 $\sigma, \tau$，$S^-(f, \sigma) \le S^+(f, \tau)$。

因此 $\sup_\sigma S^-(f, \sigma) \le \inf_\tau S^+(f, \tau)$（这两个数分别称为 $f$ 的**下积分**与**上积分**）。
:::

::: fr
Soient $f : P \to \R$ bornée et $\sigma, \tau$ deux subdivisions de $P$.

1. Si $\tau$ est plus fine que $\sigma$, alors
$$S^-(f, \sigma) \le S^-(f, \tau) \le S^+(f, \tau) \le S^+(f, \sigma).$$
2. Pour toutes subdivisions $\sigma, \tau$, on a $S^-(f, \sigma) \le S^+(f, \tau)$.

Par conséquent $\sup_\sigma S^-(f, \sigma) \le \inf_\tau S^+(f, \tau)$ (ces deux nombres sont appelés **intégrale inférieure** et **intégrale supérieure** de $f$).
:::

::: proof
▷ 思路：加细时，$\sigma$ 的每个小矩形 $Q$ 被切成若干更小的矩形 $Q'$；在更小的集合上，上确界只会变小、下确界只会变大。第 2 条通过公共加细 $\sigma \vee \tau$ 归结为第 1 条。

**第 1 步（中间的不等式）**　对每个 $Q \in \tau$，$m_Q(f) \le M_Q(f)$；乘以 $\operatorname{vol}(Q) \ge 0$ 再对 $Q$ 求和，得 $S^-(f, \tau) \le S^+(f, \tau)$。

**第 2 步（加细后上和变小）**　设 $\tau$ 比 $\sigma$ 细。

1. $\tau$ 的每个小矩形 $Q'$ 恰包含于 $\sigma$ 的一个小矩形 $Q$ 中（逐个坐标看：$\tau$ 的每个小区间落在 $\sigma$ 的唯一一个小区间里）。
2. 对固定的 $Q \in \sigma$，包含于 $Q$ 的那些 $Q' \in \tau$ 构成 $Q$ 的一个分割，所以 $\sum_{Q' \subset Q}\operatorname{vol}(Q') = \operatorname{vol}(Q)$（{@def-integrale-pave} 中的体积公式，用于 $Q$）。
3. $Q' \subset Q$ 推出 $M_{Q'}(f) \le M_Q(f)$（小集合上的上确界不超过大集合上的）。

于是
$$\begin{aligned}
S^+(f, \tau) &= \sum_{Q \in \sigma}\ \sum_{Q' \in \tau,\ Q' \subset Q} M_{Q'}(f)\operatorname{vol}(Q') && \text{（按所在的 } Q \text{ 分组，由 1）}\\
&\le \sum_{Q \in \sigma} M_Q(f) \sum_{Q' \subset Q}\operatorname{vol}(Q') && \text{（由 3）}\\
&= \sum_{Q \in \sigma} M_Q(f)\operatorname{vol}(Q) = S^+(f, \sigma) && \text{（由 2）。}
\end{aligned}$$

**第 3 步（加细后下和变大）**　因为 $\inf_Q f = -\sup_Q(-f)$，对任意分割有 $S^-(f, \cdot) = -S^+(-f, \cdot)$。把第 2 步用于 $-f$：$S^+(-f, \tau) \le S^+(-f, \sigma)$，两边乘以 $-1$ 即 $S^-(f, \sigma) \le S^-(f, \tau)$。第 1–3 步合起来就是第 1 条。

**第 4 步（第 2 条）**　令 $\rho = \sigma \vee \tau$，它比 $\sigma$ 和 $\tau$ 都细。由第 1 条（用两次），
$$S^-(f, \sigma) \le S^-(f, \rho) \le S^+(f, \rho) \le S^+(f, \tau).$$

**结论**　第 2 条说明每个下和 $S^-(f, \sigma)$ 都是全体上和的下界，所以 $S^-(f, \sigma) \le \inf_\tau S^+(f, \tau)$；再对 $\sigma$ 取上确界，得 $\sup_\sigma S^-(f, \sigma) \le \inf_\tau S^+(f, \tau)$。
:::

::: fr
▷ Méthode : lorsqu'on raffine, chaque sous-pavé $Q$ de $\sigma$ est découpé en sous-pavés $Q'$ plus petits ; sur un ensemble plus petit, la borne supérieure ne peut que diminuer et la borne inférieure ne peut qu'augmenter. Le point 2 se ramène au point 1 grâce à la subdivision commune $\sigma \vee \tau$.

**Étape 1 (inégalité du milieu)**　Pour tout $Q \in \tau$, $m_Q(f) \le M_Q(f)$ ; en multipliant par $\operatorname{vol}(Q) \ge 0$ et en sommant sur $Q$, on obtient $S^-(f, \tau) \le S^+(f, \tau)$.

**Étape 2 (la somme supérieure diminue)**　Supposons $\tau$ plus fine que $\sigma$.

1. Chaque sous-pavé $Q'$ de $\tau$ est contenu dans un unique sous-pavé $Q$ de $\sigma$ (coordonnée par coordonnée : chaque intervalle de $\tau$ est contenu dans un unique intervalle de $\sigma$).
2. Pour $Q \in \sigma$ fixé, les $Q' \in \tau$ contenus dans $Q$ forment une subdivision de $Q$, donc $\sum_{Q' \subset Q}\operatorname{vol}(Q') = \operatorname{vol}(Q)$ (formule du volume de la {@fr:def-integrale-pave}, appliquée à $Q$).
3. $Q' \subset Q$ entraîne $M_{Q'}(f) \le M_Q(f)$ (la borne supérieure sur une partie est inférieure à celle sur l'ensemble).

Ainsi
$$\begin{aligned}
S^+(f, \tau) &= \sum_{Q \in \sigma}\ \sum_{Q' \in \tau,\ Q' \subset Q} M_{Q'}(f)\operatorname{vol}(Q') && \text{(regroupement selon } Q \text{, par 1)}\\
&\le \sum_{Q \in \sigma} M_Q(f) \sum_{Q' \subset Q}\operatorname{vol}(Q') && \text{(par 3)}\\
&= \sum_{Q \in \sigma} M_Q(f)\operatorname{vol}(Q) = S^+(f, \sigma) && \text{(par 2).}
\end{aligned}$$

**Étape 3 (la somme inférieure augmente)**　Comme $\inf_Q f = -\sup_Q(-f)$, on a $S^-(f, \cdot) = -S^+(-f, \cdot)$ pour toute subdivision. L'étape 2 appliquée à $-f$ donne $S^+(-f, \tau) \le S^+(-f, \sigma)$, c'est-à-dire, en multipliant par $-1$, $S^-(f, \sigma) \le S^-(f, \tau)$. Les étapes 1 à 3 donnent le point 1.

**Étape 4 (point 2)**　Posons $\rho = \sigma \vee \tau$, plus fine que $\sigma$ et que $\tau$. D'après le point 1 (appliqué deux fois),
$$S^-(f, \sigma) \le S^-(f, \rho) \le S^+(f, \rho) \le S^+(f, \tau).$$

**Conclusion**　Le point 2 dit que chaque somme inférieure $S^-(f, \sigma)$ minore toutes les sommes supérieures, donc $S^-(f, \sigma) \le \inf_\tau S^+(f, \tau)$ ; en passant à la borne supérieure en $\sigma$, il vient $\sup_\sigma S^-(f, \sigma) \le \inf_\tau S^+(f, \tau)$.
:::

::: prop id=c11-critere-riemann zh="Riemann 可积准则" en="Riemann's criterion for integrability" fr="Critère d'intégrabilité de Riemann" ru="Критерий интегрируемости Римана" lvl=1
有界函数 $f : P \to \R$ Riemann 可积，当且仅当
$$\forall \eps > 0,\ \exists \sigma \text{（}P\text{ 的分割）},\quad S^+(f, \sigma) - S^-(f, \sigma) < \eps.$$
此时对满足上式的 $\sigma$，有 $S^-(f, \sigma) \le \int_P f \le S^+(f, \sigma)$，从而 $\abs{S^\pm(f, \sigma) - \int_P f} < \eps$。
:::

::: fr
Une fonction bornée $f : P \to \R$ est intégrable au sens de Riemann si et seulement si
$$\forall \eps > 0,\ \exists \sigma \text{ (subdivision de } P\text{)},\quad S^+(f, \sigma) - S^-(f, \sigma) < \eps.$$
Dans ce cas, pour une telle $\sigma$, on a $S^-(f, \sigma) \le \int_P f \le S^+(f, \sigma)$, donc $\abs{S^\pm(f, \sigma) - \int_P f} < \eps$.
:::

::: proof
▷ 思路：(⇒) 由上、下确界的定义分别取 $\sigma_1$、$\sigma_2$，再取公共加细；(⇐) 上积分与下积分之差被任意小的数控制。

**(⇒)**　设 $f$ 可积，记 $I = \int_P f = \inf_\sigma S^+(f, \sigma) = \sup_\sigma S^-(f, \sigma)$。设 $\eps > 0$。

1. 由下确界的定义，存在分割 $\sigma_1$ 使 $S^+(f, \sigma_1) < I + \frac\eps2$。
2. 由上确界的定义，存在分割 $\sigma_2$ 使 $S^-(f, \sigma_2) > I - \frac\eps2$。
3. 令 $\sigma = \sigma_1 \vee \sigma_2$。由 {@c11-raffinement} 第 1 条，$S^+(f, \sigma) \le S^+(f, \sigma_1) < I + \frac\eps2$，$S^-(f, \sigma) \ge S^-(f, \sigma_2) > I - \frac\eps2$。
4. 两式相减：$S^+(f, \sigma) - S^-(f, \sigma) < \eps$。

**(⇐)**　记 $I^- = \sup_\sigma S^-(f, \sigma)$，$I^+ = \inf_\sigma S^+(f, \sigma)$。由 {@c11-raffinement}，$I^- \le I^+$。设 $\eps > 0$，取假设给出的 $\sigma$，则
$$0 \le I^+ - I^- \le S^+(f, \sigma) - S^-(f, \sigma) < \eps \qquad (I^+ \le S^+(f, \sigma),\ I^- \ge S^-(f, \sigma)).$$
$\eps$ 任意，所以 $I^+ = I^-$，即 $f$ 可积。

**补充**　$S^-(f, \sigma) \le I^- = \int_P f = I^+ \le S^+(f, \sigma)$，所以 $\int_P f$ 与 $S^\pm(f, \sigma)$ 都落在长度小于 $\eps$ 的区间 $[S^-(f, \sigma), S^+(f, \sigma)]$ 中，彼此相差小于 $\eps$。这就证明了准则。
:::

::: fr
▷ Méthode : (⇒) on choisit $\sigma_1$ et $\sigma_2$ par définition des bornes inférieure et supérieure, puis on prend leur subdivision commune ; (⇐) l'écart entre intégrales supérieure et inférieure est majoré par un nombre arbitrairement petit.

**(⇒)**　Supposons $f$ intégrable et notons $I = \int_P f = \inf_\sigma S^+(f, \sigma) = \sup_\sigma S^-(f, \sigma)$. Soit $\eps > 0$.

1. Par définition de la borne inférieure, il existe $\sigma_1$ telle que $S^+(f, \sigma_1) < I + \frac\eps2$.
2. Par définition de la borne supérieure, il existe $\sigma_2$ telle que $S^-(f, \sigma_2) > I - \frac\eps2$.
3. Posons $\sigma = \sigma_1 \vee \sigma_2$. D'après le point 1 du {@fr:c11-raffinement}, $S^+(f, \sigma) \le S^+(f, \sigma_1) < I + \frac\eps2$ et $S^-(f, \sigma) \ge S^-(f, \sigma_2) > I - \frac\eps2$.
4. Par différence, $S^+(f, \sigma) - S^-(f, \sigma) < \eps$.

**(⇐)**　Notons $I^- = \sup_\sigma S^-(f, \sigma)$ et $I^+ = \inf_\sigma S^+(f, \sigma)$. D'après le {@fr:c11-raffinement}, $I^- \le I^+$. Soit $\eps > 0$ et $\sigma$ donnée par l'hypothèse ; alors
$$0 \le I^+ - I^- \le S^+(f, \sigma) - S^-(f, \sigma) < \eps \qquad (I^+ \le S^+(f, \sigma),\ I^- \ge S^-(f, \sigma)).$$
Comme $\eps$ est arbitraire, $I^+ = I^-$ : $f$ est intégrable.

**Complément**　On a $S^-(f, \sigma) \le I^- = \int_P f = I^+ \le S^+(f, \sigma)$ ; ainsi $\int_P f$ et $S^\pm(f, \sigma)$ appartiennent à l'intervalle $[S^-(f, \sigma), S^+(f, \sigma)]$, de longueur $< \eps$, et diffèrent donc de moins de $\eps$. Ceci démontre le critère.
:::

::: ex id=c11-ex-xy lvl=1
用定义计算 $\iint_{[0,1]^2} xy\,\dd x\,\dd y$。取正则分割 $\sigma_N$：每个坐标区间 $[0, 1]$ 分成 $N$ 等份，小矩形 $Q_{ij} = [\frac{i-1}{N}, \frac iN] \times [\frac{j-1}{N}, \frac jN]$（$1 \le i, j \le N$），面积 $\frac1{N^2}$。在 $Q_{ij}$ 上 $x, y \ge 0$，$xy$ 对每个变量单调递增，所以上确界在右上角取到、下确界在左下角取到：
$$M_{Q_{ij}} = \frac{ij}{N^2},\qquad m_{Q_{ij}} = \frac{(i-1)(j-1)}{N^2}.$$
用 $\sum_{i=1}^N i = \frac{N(N+1)}{2}$：
$$S^+(f, \sigma_N) = \frac1{N^4}\Big(\sum_{i=1}^N i\Big)\Big(\sum_{j=1}^N j\Big) = \frac{(N+1)^2}{4N^2},\qquad S^-(f, \sigma_N) = \frac1{N^4}\Big(\sum_{i=1}^{N} (i-1)\Big)^2 = \frac{(N-1)^2}{4N^2}.$$
于是 $S^+ - S^- = \frac{(N+1)^2 - (N-1)^2}{4N^2} = \frac1N \to 0$，由 {@c11-critere-riemann}，$f$ 可积；又 $\int f$ 夹在 $S^-(f, \sigma_N)$ 与 $S^+(f, \sigma_N)$ 之间，两者都趋于 $\frac14$，所以 $\iint_{[0,1]^2} xy = \frac14$。
:::

::: cex id=c11-cex-dirichlet lvl=1
$f = \mathbf{1}_{\Q^2}$（$x, y$ 都是有理数时取 $1$，否则取 $0$）在 $[0,1]^2$ 上**不可积**。任何小矩形 $Q$（各边长度 $> 0$）都含有两个坐标都是有理数的点，也含有第一个坐标是无理数的点（$\Q$ 与 $\R \setminus \Q$ 都在 $\R$ 中稠密），所以 $M_Q(f) = 1$、$m_Q(f) = 0$。于是对一切分割 $\sigma$，$S^+(f, \sigma) = \sum_Q\operatorname{vol}(Q) = 1$，$S^-(f, \sigma) = 0$，上积分 $1 \ne 0$ 下积分。
:::

::: thm id=continue-integrable zh="连续函数可积" en="Continuous functions are integrable" fr="Intégrabilité des fonctions continues" ru="Интегрируемость непрерывных функций" lvl=2
设 $f, g : P \to \R$ 在矩形 $P$ 上连续，$\lambda \in \R$。则

1. $f$ 在 $P$ 上 Riemann 可积；
2. （线性）$\int_P (f + \lambda g) = \int_P f + \lambda\int_P g$；
3. （单调）若 $f \le g$，则 $\int_P f \le \int_P g$；
4. $\abs{\int_P f} \le \int_P \abs f \le \operatorname{vol}(P)\norm f_\infty$，其中 $\norm f_\infty = \sup_P\abs f$。

性质 2、3 对任意 Riemann 可积的 $f, g$ 都成立，常数函数 $c$ 的积分为 $c\operatorname{vol}(P)$。
:::

::: fr
Soient $f, g : P \to \R$ continues sur le pavé $P$ et $\lambda \in \R$. Alors

1. $f$ est intégrable au sens de Riemann sur $P$ ;
2. (linéarité) $\int_P (f + \lambda g) = \int_P f + \lambda\int_P g$ ;
3. (croissance) si $f \le g$, alors $\int_P f \le \int_P g$ ;
4. $\abs{\int_P f} \le \int_P \abs f \le \operatorname{vol}(P)\norm f_\infty$, où $\norm f_\infty = \sup_P\abs f$.

Les propriétés 2 et 3 sont vraies pour toutes fonctions $f, g$ intégrables au sens de Riemann, et l'intégrale d'une constante $c$ vaut $c\operatorname{vol}(P)$.
:::

::: sketch
▷ 思路：第 1 条用一致连续性让每个小矩形上的振幅 $M_Q - m_Q$ 一致地小；第 2–4 条先在 Darboux 和的层面比较，再用 {@c11-critere-riemann} 取极限。

**第 1 步（可积性）**　$P$ 是有界闭集，故是紧集（{@bw-kn}）；$f$ 在 $P$ 上连续，由 {@heine} 一致连续。设 $\eps > 0$。翻译一致连续性：存在 $\delta > 0$，使得
$$\forall x, x' \in P,\quad \norm{x - x'}_\infty < \delta \implies \abs{f(x) - f(x')} < \eps.$$
令 $N = E\big(\max_i(b_i - a_i)/\delta\big) + 1$，取正则分割 $\sigma_N$（每个 $[a_i, b_i]$ 分成 $N$ 等份）。每个小矩形 $Q$ 的 $\norm\cdot_\infty$-直径为 $\max_i\frac{b_i - a_i}{N} < \delta$。$f$ 在紧集 $Q$ 上取到最大值 $f(x^*)$ 与最小值 $f(x_*)$（{@image-compact}），所以 $M_Q - m_Q = f(x^*) - f(x_*) < \eps$。于是
$$S^+(f, \sigma_N) - S^-(f, \sigma_N) = \sum_{Q}(M_Q - m_Q)\operatorname{vol}(Q) < \eps\sum_Q\operatorname{vol}(Q) = \eps\operatorname{vol}(P).$$
把 $\eps$ 换成 $\eps/\operatorname{vol}(P)$，由 {@c11-critere-riemann}，$f$ 可积。

**第 2 步（线性）**　设 $f, g$ 可积。对每个小矩形 $Q$，$\sup_Q(f + g) \le \sup_Q f + \sup_Q g$，$\inf_Q(f + g) \ge \inf_Q f + \inf_Q g$，所以
$$S^-(f, \sigma) + S^-(g, \sigma) \le S^-(f + g, \sigma) \le S^+(f + g, \sigma) \le S^+(f, \sigma) + S^+(g, \sigma).$$
给定 $\eps > 0$，由 {@c11-critere-riemann} 分别取 $\sigma_f$、$\sigma_g$，令 $\sigma = \sigma_f \vee \sigma_g$（由 {@c11-raffinement}，$f$、$g$ 的上下和之差在 $\sigma$ 上仍 $< \eps$）。则 $f + g$ 的上下和之差 $< 2\eps$，所以 $f + g$ 可积；并且 $\int(f + g)$ 与 $\int f + \int g$ 都在长度 $< 2\eps$ 的区间 $[S^-(f) + S^-(g), S^+(f) + S^+(g)]$ 中，$\eps$ 任意，故相等。数乘：$\lambda \ge 0$ 时 $\sup_Q(\lambda f) = \lambda\sup_Q f$，故 $S^\pm(\lambda f, \sigma) = \lambda S^\pm(f, \sigma)$；$\lambda < 0$ 时 $\sup_Q(\lambda f) = \lambda\inf_Q f$，故 $S^+(\lambda f, \sigma) = \lambda S^-(f, \sigma)$、$S^-(\lambda f, \sigma) = \lambda S^+(f, \sigma)$。两种情形都得 $\int\lambda f = \lambda\int f$。

**第 3 步（单调）**　若 $f \le g$，则 $g - f \ge 0$，每个 $m_Q(g - f) \ge 0$，所以 $\int(g - f) \ge S^-(g - f, \sigma) \ge 0$；由第 2 步，$\int g - \int f \ge 0$。

**第 4 步（不等式）**　常数 $c$ 的上下和都等于 $c\sum_Q\operatorname{vol}(Q) = c\operatorname{vol}(P)$，所以 $\int_P c = c\operatorname{vol}(P)$。$\abs f$ 连续，由第 1 步可积。由 $-\abs f \le f \le \abs f$ 与第 3 步，$-\int\abs f \le \int f \le \int\abs f$，即 $\abs{\int f} \le \int\abs f$。由 $\abs f \le \norm f_\infty$ 与第 3 步，$\int\abs f \le \norm f_\infty\operatorname{vol}(P)$。
:::

::: fr
▷ Méthode : pour le point 1, la continuité uniforme rend l'oscillation $M_Q - m_Q$ uniformément petite sur chaque sous-pavé ; pour les points 2 à 4, on compare d'abord les sommes de Darboux, puis on passe à la limite grâce au {@fr:c11-critere-riemann}.

**Étape 1 (intégrabilité)**　$P$ est fermé borné, donc compact ({@fr:bw-kn}) ; $f$ est continue sur $P$, donc uniformément continue d'après le {@fr:heine}. Soit $\eps > 0$. On traduit la continuité uniforme : il existe $\delta > 0$ tel que
$$\forall x, x' \in P,\quad \norm{x - x'}_\infty < \delta \implies \abs{f(x) - f(x')} < \eps.$$
Posons $N = E\big(\max_i(b_i - a_i)/\delta\big) + 1$ et prenons la subdivision régulière $\sigma_N$ (chaque $[a_i, b_i]$ découpé en $N$ parts égales). Chaque sous-pavé $Q$ est de diamètre $\max_i\frac{b_i - a_i}{N} < \delta$ pour $\norm\cdot_\infty$. Sur le compact $Q$, $f$ atteint son maximum $f(x^*)$ et son minimum $f(x_*)$ ({@fr:image-compact}), donc $M_Q - m_Q = f(x^*) - f(x_*) < \eps$. Ainsi
$$S^+(f, \sigma_N) - S^-(f, \sigma_N) = \sum_{Q}(M_Q - m_Q)\operatorname{vol}(Q) < \eps\sum_Q\operatorname{vol}(Q) = \eps\operatorname{vol}(P).$$
En remplaçant $\eps$ par $\eps/\operatorname{vol}(P)$, le {@fr:c11-critere-riemann} montre que $f$ est intégrable.

**Étape 2 (linéarité)**　Soient $f, g$ intégrables. Pour tout sous-pavé $Q$, $\sup_Q(f + g) \le \sup_Q f + \sup_Q g$ et $\inf_Q(f + g) \ge \inf_Q f + \inf_Q g$, d'où
$$S^-(f, \sigma) + S^-(g, \sigma) \le S^-(f + g, \sigma) \le S^+(f + g, \sigma) \le S^+(f, \sigma) + S^+(g, \sigma).$$
Soit $\eps > 0$ ; le {@fr:c11-critere-riemann} fournit $\sigma_f$ et $\sigma_g$ ; posons $\sigma = \sigma_f \vee \sigma_g$ (d'après le {@fr:c11-raffinement}, les écarts pour $f$ et $g$ restent $< \eps$ sur $\sigma$). L'écart pour $f + g$ est alors $< 2\eps$, donc $f + g$ est intégrable ; de plus $\int(f + g)$ et $\int f + \int g$ appartiennent à l'intervalle $[S^-(f) + S^-(g), S^+(f) + S^+(g)]$, de longueur $< 2\eps$ ; $\eps$ étant arbitraire, ils sont égaux. Multiplication par un scalaire : si $\lambda \ge 0$, $\sup_Q(\lambda f) = \lambda\sup_Q f$, donc $S^\pm(\lambda f, \sigma) = \lambda S^\pm(f, \sigma)$ ; si $\lambda < 0$, $\sup_Q(\lambda f) = \lambda\inf_Q f$, donc $S^+(\lambda f, \sigma) = \lambda S^-(f, \sigma)$ et $S^-(\lambda f, \sigma) = \lambda S^+(f, \sigma)$. Dans les deux cas, $\int\lambda f = \lambda\int f$.

**Étape 3 (croissance)**　Si $f \le g$, alors $g - f \ge 0$, chaque $m_Q(g - f) \ge 0$, donc $\int(g - f) \ge S^-(g - f, \sigma) \ge 0$ ; par l'étape 2, $\int g - \int f \ge 0$.

**Étape 4 (inégalités)**　Pour une constante $c$, les sommes de Darboux valent $c\sum_Q\operatorname{vol}(Q) = c\operatorname{vol}(P)$, donc $\int_P c = c\operatorname{vol}(P)$. La fonction $\abs f$ est continue, donc intégrable par l'étape 1. De $-\abs f \le f \le \abs f$ et de l'étape 3, on tire $-\int\abs f \le \int f \le \int\abs f$, c'est-à-dire $\abs{\int f} \le \int\abs f$. De $\abs f \le \norm f_\infty$ et de l'étape 3, on tire $\int\abs f \le \norm f_\infty\operatorname{vol}(P)$.
:::

::: rem
**逆命题不成立：可积不要求连续。** $f = \mathbf{1}_{[0,1/2]\times[0,1]}$ 在 $[0,1]^2$ 上沿线段 $\{\frac12\} \times [0, 1]$ 不连续，但它可积：对 $0 < h < \frac12$，取 $x$ 方向分点 $0 < \frac12 - h < \frac12 + h < 1$、$y$ 方向不分。三个小矩形上 $(M_Q, m_Q)$ 依次为 $(1, 1)$、$(1, 0)$、$(0, 0)$，面积依次为 $\frac12 - h$、$2h$、$\frac12 - h$，所以 $S^+ = \frac12 + h$，$S^- = \frac12 - h$，差 $2h \to 0$，积分为 $\frac12$。哪些不连续是「无害」的，是下一节的主题；{@c11-cex-dirichlet} 说明处处不连续则不行。
:::

::: q
$f(x, y) = 1$（若 $x = y$），$f(x, y) = 0$（否则）。$f$ 在 $[0, 1]^2$ 上可积吗？积分是多少？
:::

::: ans
可积，积分为 $0$。取正则分割 $\sigma_N$。小矩形 $Q_{ij}$ 与对角线相交 ⟺ 区间 $[\frac{i-1}N, \frac iN]$ 与 $[\frac{j-1}N, \frac jN]$ 相交 ⟺ $\abs{i - j} \le 1$，这样的 $(i, j)$ 有 $N + 2(N - 1) = 3N - 2$ 个，其上 $M_Q = 1$，其余 $M_Q = 0$；每个小矩形都含有对角线外的点，所以 $m_Q = 0$。于是 $S^+ = \frac{3N - 2}{N^2} \to 0$，$S^- = 0$，由 {@c11-critere-riemann}，$f$ 可积且积分为 $0$。
:::

接下来是本节的核心：把重积分化成一元积分。关键的观察是：先对一个变量积分时，Darboux 和的不等式可以「逐层」保持。

::: lem id=c11-fubini-riemann zh="可积函数的 Fubini 引理" en="Fubini's lemma for Riemann integrable functions" fr="Lemme de Fubini pour les fonctions Riemann-intégrables" ru="Лемма Фубини для интегрируемых по Риману функций" lvl=1
设 $A \subset \R^p$、$B \subset \R^q$ 是矩形，$f : A \times B \to \R$ 在矩形 $A \times B \subset \R^{p+q}$ 上可积，且对每个 $x \in A$，$f_x : y \mapsto f(x, y)$ 在 $B$ 上可积。则
$$F(x) = \int_B f(x, y)\,\dd y$$
在 $A$ 上可积，且
$$\int_{A \times B} f = \int_A\Big(\int_B f(x, y)\,\dd y\Big)\dd x.$$
交换 $x$ 与 $y$ 的角色：若对每个 $y \in B$，$x \mapsto f(x, y)$ 在 $A$ 上可积，则 $\int_{A \times B} f = \int_B\big(\int_A f(x, y)\,\dd x\big)\dd y$。
:::

::: fr
Soient $A \subset \R^p$ et $B \subset \R^q$ deux pavés, et $f : A \times B \to \R$ intégrable sur le pavé $A \times B \subset \R^{p+q}$, telle que pour tout $x \in A$, $f_x : y \mapsto f(x, y)$ soit intégrable sur $B$. Alors
$$F(x) = \int_B f(x, y)\,\dd y$$
est intégrable sur $A$ et
$$\int_{A \times B} f = \int_A\Big(\int_B f(x, y)\,\dd y\Big)\dd x.$$
En échangeant les rôles de $x$ et $y$ : si pour tout $y \in B$, $x \mapsto f(x, y)$ est intégrable sur $A$, alors $\int_{A \times B} f = \int_B\big(\int_A f(x, y)\,\dd x\big)\dd y$.
:::

::: proof
▷ 思路：$A \times B$ 的分割就是一对分割 $(\sigma_A, \sigma_B)$，小矩形是 $Q \times R$。在每个 $Q$ 上用 $m_{Q \times R}(f) \le f \le M_{Q \times R}(f)$ 夹住 $F$，得到
$$S^-(f, \sigma) \le S^-(F, \sigma_A) \le S^+(F, \sigma_A) \le S^+(f, \sigma).$$
$f$ 的上下和可以任意接近，所以 $F$ 的也可以，而且两个积分被夹在同一个小区间里。

**第 1 步（$A \times B$ 的分割）**　$A \times B$ 的分割由 $p + q$ 个坐标区间的分点组确定；前 $p$ 个给出 $A$ 的分割 $\sigma_A$，后 $q$ 个给出 $B$ 的分割 $\sigma_B$。小矩形恰是 $Q \times R$（$Q \in \sigma_A$，$R \in \sigma_B$），且 $\operatorname{vol}(Q \times R) = \operatorname{vol}(Q)\operatorname{vol}(R)$。

**第 2 步（在每个 $Q$ 上夹住 $F$）**　固定 $Q \in \sigma_A$ 与 $x \in Q$。对每个 $R \in \sigma_B$ 与 $y \in R$，$(x, y) \in Q \times R$，所以 $\sup_{y \in R} f(x, y) \le M_{Q \times R}(f)$，$\inf_{y \in R} f(x, y) \ge m_{Q \times R}(f)$。由于 $f_x$ 在 $B$ 上可积，$F(x) = \int_B f_x$ 夹在 $f_x$ 关于 $\sigma_B$ 的上下和之间（{@c11-critere-riemann} 的补充），于是
$$\sum_{R \in \sigma_B} m_{Q \times R}(f)\operatorname{vol}(R) \le S^-(f_x, \sigma_B) \le F(x) \le S^+(f_x, \sigma_B) \le \sum_{R \in \sigma_B} M_{Q \times R}(f)\operatorname{vol}(R).$$
特别地（取平凡分割）$\abs{F(x)} \le \norm f_\infty\operatorname{vol}(B)$，$F$ 有界；对 $x \in Q$ 取下、上确界，
$$m_Q(F) \ge \sum_{R} m_{Q \times R}(f)\operatorname{vol}(R),\qquad M_Q(F) \le \sum_{R} M_{Q \times R}(f)\operatorname{vol}(R).$$

**第 3 步（对 $Q$ 求和）**　乘以 $\operatorname{vol}(Q)$ 并对 $Q \in \sigma_A$ 求和，由第 1 步的体积公式，
$$S^-(f, \sigma) = \sum_{Q, R} m_{Q \times R}(f)\operatorname{vol}(Q)\operatorname{vol}(R) \le S^-(F, \sigma_A) \le S^+(F, \sigma_A) \le S^+(f, \sigma).$$

**第 4 步（结论）**　设 $\eps > 0$。由 {@c11-critere-riemann}（⇒），存在 $A \times B$ 的分割 $\sigma = (\sigma_A, \sigma_B)$ 使 $S^+(f, \sigma) - S^-(f, \sigma) < \eps$。由第 3 步，$S^+(F, \sigma_A) - S^-(F, \sigma_A) < \eps$，由 {@c11-critere-riemann}（⇐），$F$ 在 $A$ 上可积。此时 $\int_A F$ 与 $\int_{A \times B} f$ 都属于区间 $[S^-(f, \sigma), S^+(f, \sigma)]$（前者由第 3 步与 {@c11-critere-riemann} 的补充），该区间长度 $< \eps$，所以 $\abs{\int_A F - \int_{A \times B} f} < \eps$。$\eps$ 任意，故两者相等。

**第 5 步（交换角色）**　令 $g(y, x) = f(x, y)$，$(y, x) \in B \times A$。映射 $(x, y) \mapsto (y, x)$ 把 $A \times B$ 的分割一一对应到 $B \times A$ 的分割，保持每个小矩形的体积和其上的上、下确界，所以 $g$ 在 $B \times A$ 上可积且 $\int_{B \times A} g = \int_{A \times B} f$。对 $g$ 用第 1–4 步即得第二个公式。这就证明了引理。
:::

::: fr
▷ Méthode : une subdivision de $A \times B$ est un couple $(\sigma_A, \sigma_B)$ et ses sous-pavés sont les $Q \times R$. Sur chaque $Q$, on encadre $F$ grâce à $m_{Q \times R}(f) \le f \le M_{Q \times R}(f)$, ce qui donne
$$S^-(f, \sigma) \le S^-(F, \sigma_A) \le S^+(F, \sigma_A) \le S^+(f, \sigma).$$
Les sommes de Darboux de $f$ sont arbitrairement proches, donc celles de $F$ aussi, et les deux intégrales sont encadrées par le même petit intervalle.

**Étape 1 (subdivisions de $A \times B$)**　Une subdivision de $A \times B$ est donnée par les points des $p + q$ intervalles de coordonnées ; les $p$ premiers définissent une subdivision $\sigma_A$ de $A$, les $q$ derniers une subdivision $\sigma_B$ de $B$. Les sous-pavés sont exactement les $Q \times R$ ($Q \in \sigma_A$, $R \in \sigma_B$), et $\operatorname{vol}(Q \times R) = \operatorname{vol}(Q)\operatorname{vol}(R)$.

**Étape 2 (encadrement de $F$ sur chaque $Q$)**　Fixons $Q \in \sigma_A$ et $x \in Q$. Pour $R \in \sigma_B$ et $y \in R$, on a $(x, y) \in Q \times R$, donc $\sup_{y \in R} f(x, y) \le M_{Q \times R}(f)$ et $\inf_{y \in R} f(x, y) \ge m_{Q \times R}(f)$. Comme $f_x$ est intégrable sur $B$, $F(x) = \int_B f_x$ est encadrée par les sommes de Darboux de $f_x$ relatives à $\sigma_B$ (complément du {@fr:c11-critere-riemann}), d'où
$$\sum_{R \in \sigma_B} m_{Q \times R}(f)\operatorname{vol}(R) \le S^-(f_x, \sigma_B) \le F(x) \le S^+(f_x, \sigma_B) \le \sum_{R \in \sigma_B} M_{Q \times R}(f)\operatorname{vol}(R).$$
En particulier (subdivision triviale) $\abs{F(x)} \le \norm f_\infty\operatorname{vol}(B)$ : $F$ est bornée ; en passant aux bornes inférieure et supérieure en $x \in Q$,
$$m_Q(F) \ge \sum_{R} m_{Q \times R}(f)\operatorname{vol}(R),\qquad M_Q(F) \le \sum_{R} M_{Q \times R}(f)\operatorname{vol}(R).$$

**Étape 3 (sommation sur $Q$)**　En multipliant par $\operatorname{vol}(Q)$ et en sommant sur $Q \in \sigma_A$, la formule de volume de l'étape 1 donne
$$S^-(f, \sigma) = \sum_{Q, R} m_{Q \times R}(f)\operatorname{vol}(Q)\operatorname{vol}(R) \le S^-(F, \sigma_A) \le S^+(F, \sigma_A) \le S^+(f, \sigma).$$

**Étape 4 (conclusion)**　Soit $\eps > 0$. D'après le {@fr:c11-critere-riemann} (⇒), il existe une subdivision $\sigma = (\sigma_A, \sigma_B)$ de $A \times B$ telle que $S^+(f, \sigma) - S^-(f, \sigma) < \eps$. Par l'étape 3, $S^+(F, \sigma_A) - S^-(F, \sigma_A) < \eps$, donc $F$ est intégrable sur $A$ par le {@fr:c11-critere-riemann} (⇐). Alors $\int_A F$ et $\int_{A \times B} f$ appartiennent tous deux à l'intervalle $[S^-(f, \sigma), S^+(f, \sigma)]$ (le premier par l'étape 3 et le complément du critère), de longueur $< \eps$, donc $\abs{\int_A F - \int_{A \times B} f} < \eps$. Comme $\eps$ est arbitraire, ils sont égaux.

**Étape 5 (échange des rôles)**　Posons $g(y, x) = f(x, y)$ pour $(y, x) \in B \times A$. L'application $(x, y) \mapsto (y, x)$ met en bijection les subdivisions de $A \times B$ et celles de $B \times A$, en conservant le volume de chaque sous-pavé ainsi que les bornes supérieure et inférieure de la fonction sur celui-ci ; donc $g$ est intégrable sur $B \times A$ et $\int_{B \times A} g = \int_{A \times B} f$. Les étapes 1 à 4 appliquées à $g$ donnent la seconde formule. Ceci démontre le lemme.
:::

::: thm id=fubini-pave zh="矩形上的 Fubini 定理" en="Fubini's theorem on a box" fr="Théorème de Fubini sur un pavé" ru="Теорема Фубини для бруса" lvl=1
若 $f$ 在 $P = [a, b] \times [c, d]$ 上连续，则
$$\iint_Pf = \int_a^b\Big(\int_c^df(x, y)\,\dd y\Big)\dd x = \int_c^d\Big(\int_a^bf(x, y)\,\dd x\Big)\dd y.$$
$n$ 维情形同样成立：$\R^n$ 中矩形上的连续函数可以按坐标的任意次序逐次积分，结果都等于 $\int_P f$。
:::

::: fr
Si $f$ est continue sur $P = [a, b] \times [c, d]$, alors
$$\iint_Pf = \int_a^b\Big(\int_c^df(x, y)\,\dd y\Big)\dd x = \int_c^d\Big(\int_a^bf(x, y)\,\dd x\Big)\dd y.$$
Il en est de même en dimension $n$ : une fonction continue sur un pavé de $\R^n$ peut être intégrée successivement par rapport aux coordonnées, dans n'importe quel ordre, et le résultat vaut toujours $\int_P f$.
:::

::: proof
▷ 思路：验证 {@c11-fubini-riemann} 的两个假设（$f$ 在 $P$ 上可积；每个截口可积），先以 $x$ 为外层变量用一次，再交换角色用一次。$n$ 维对维数归纳。

**第 1 步（先 $y$ 后 $x$）**　$f$ 在 $P$ 上连续，由 {@continue-integrable} 可积。对每个 $x \in [a, b]$，$y \mapsto f(x, y)$ 是连续函数 $f$ 与连续映射 $y \mapsto (x, y)$ 的复合，在 $[c, d]$ 上连续，因而可积。由 {@c11-fubini-riemann}（$A = [a, b]$，$B = [c, d]$），
$$\iint_P f = \int_a^b\Big(\int_c^d f(x, y)\,\dd y\Big)\dd x.$$

**第 2 步（先 $x$ 后 $y$）**　同样，对每个 $y \in [c, d]$，$x \mapsto f(x, y)$ 在 $[a, b]$ 上连续、可积。由 {@c11-fubini-riemann} 的第二个公式，$\iint_P f = \int_c^d\big(\int_a^b f(x, y)\,\dd x\big)\dd y$。

第 1、2 步给出三者相等；特别地，两个累次积分相等，这重新证明了 {@fubini-segment}。

**第 3 步（$n$ 维：对 $n$ 归纳）**　命题 $\mathcal H(n)$：对 $\R^n$ 中任意矩形 $P$、$P$ 上任意连续函数 $f$ 和坐标的任意次序 $(k_1, \dots, k_n)$，「先对 $x_{k_1}$ 积分，再对 $x_{k_2}$，……，最后对 $x_{k_n}$」的每一层积分都有意义，且结果等于 $\int_P f$。

- **初始化**：$n = 1$ 时逐次积分就是 $\int_P f$ 本身。
- **递推**：设 $n \ge 2$ 且 $\mathcal H(n - 1)$ 成立。记最后积分的变量为 $t = x_{k_n} \in B = [a_{k_n}, b_{k_n}]$，其余 $n - 1$ 个坐标组成 $x' \in A = \prod_{i \ne k_n}[a_i, b_i]$。重排坐标不改变分割与 Darboux 和（理由同 {@c11-fubini-riemann} 第 5 步），所以可以把 $P$ 看成 $A \times B$。对每个 $t \in B$，$x' \mapsto f(x', t)$ 在 $A$ 上连续；由 $\mathcal H(n-1)$，它按次序 $(k_1, \dots, k_{n-1})$ 的逐次积分有意义，且等于 $G(t) = \int_A f(x', t)\,\dd x'$。$f$ 在 $P$ 上可积（{@continue-integrable}），每个截口 $x' \mapsto f(x', t)$ 在 $A$ 上可积，由 {@c11-fubini-riemann}（内层对 $x' \in A$、外层对 $t \in B$ 的那个公式），$G$ 在 $B$ 上可积且 $\int_P f = \int_B G(t)\,\dd t$——这正是按次序 $(k_1, \dots, k_n)$ 的逐次积分。

这就证明了 $\mathcal H(n)$ 对一切 $n \ge 1$ 成立。
:::

::: fr
▷ Méthode : on vérifie les deux hypothèses du {@fr:c11-fubini-riemann} ($f$ intégrable sur $P$ ; chaque section intégrable), en prenant d'abord $x$ comme variable extérieure, puis en échangeant les rôles. En dimension $n$, on raisonne par récurrence sur la dimension.

**Étape 1 (d'abord $y$, puis $x$)**　$f$ est continue sur $P$, donc intégrable d'après le {@fr:continue-integrable}. Pour tout $x \in [a, b]$, $y \mapsto f(x, y)$ est la composée de $f$ et de l'application continue $y \mapsto (x, y)$, donc continue sur $[c, d]$ et intégrable. D'après le {@fr:c11-fubini-riemann} ($A = [a, b]$, $B = [c, d]$),
$$\iint_P f = \int_a^b\Big(\int_c^d f(x, y)\,\dd y\Big)\dd x.$$

**Étape 2 (d'abord $x$, puis $y$)**　De même, pour tout $y \in [c, d]$, $x \mapsto f(x, y)$ est continue, donc intégrable sur $[a, b]$. La seconde formule du {@fr:c11-fubini-riemann} donne $\iint_P f = \int_c^d\big(\int_a^b f(x, y)\,\dd x\big)\dd y$.

Les étapes 1 et 2 donnent l'égalité des trois quantités ; en particulier les deux intégrales itérées sont égales, ce qui redémontre le {@fr:fubini-segment}.

**Étape 3 (dimension $n$ : récurrence sur $n$)**　Propriété $\mathcal H(n)$ : pour tout pavé $P$ de $\R^n$, toute fonction $f$ continue sur $P$ et tout ordre $(k_1, \dots, k_n)$ des coordonnées, les intégrations successives « d'abord en $x_{k_1}$, puis en $x_{k_2}$, …, enfin en $x_{k_n}$ » ont toutes un sens et le résultat vaut $\int_P f$.

- **Initialisation.** Pour $n = 1$, l'intégrale itérée est $\int_P f$ elle-même.
- **Hérédité.** Soit $n \ge 2$ tel que $\mathcal H(n - 1)$ soit vraie. Notons $t = x_{k_n} \in B = [a_{k_n}, b_{k_n}]$ la dernière variable d'intégration et $x' \in A = \prod_{i \ne k_n}[a_i, b_i]$ les $n - 1$ autres coordonnées. Réordonner les coordonnées ne change ni les subdivisions ni les sommes de Darboux (même argument qu'à l'étape 5 du {@fr:c11-fubini-riemann}) ; on peut donc voir $P$ comme $A \times B$. Pour tout $t \in B$, $x' \mapsto f(x', t)$ est continue sur $A$ ; par $\mathcal H(n-1)$, son intégrale itérée dans l'ordre $(k_1, \dots, k_{n-1})$ a un sens et vaut $G(t) = \int_A f(x', t)\,\dd x'$. Comme $f$ est intégrable sur $P$ ({@fr:continue-integrable}) et que chaque section $x' \mapsto f(x', t)$ est intégrable sur $A$, le {@fr:c11-fubini-riemann} (formule avec intégration intérieure en $x' \in A$ et extérieure en $t \in B$) montre que $G$ est intégrable sur $B$ et que $\int_P f = \int_B G(t)\,\dd t$ : c'est exactement l'intégrale itérée dans l'ordre $(k_1, \dots, k_n)$.

Ceci montre que $\mathcal H(n)$ est vraie pour tout $n \ge 1$.
:::

::: rem
**两个假设各自的作用，以及逆命题。**

1. **「$f$ 在 $P$ 上可积」不能由「累次积分存在且相等」推出**（逆命题不成立），见下面的 {@c11-cex-iterees}。
2. **截口可积的假设不能去掉。** 令 $f(x, y) = 1$（若 $x = \frac12$ 且 $y \in \Q$），否则 $f(x, y) = 0$。$f$ 在 $[0, 1]^2$ 上可积且积分为 $0$：取 $x$ 方向分点 $0 < \frac12 - h < \frac12 + h < 1$，则 $S^+ \le 2h$，$S^- = 0$。但 $x = \frac12$ 处的截口 $y \mapsto \mathbf{1}_\Q(y)$ 不可积，$F(\tfrac12)$ 无定义。（改变 $F$ 在一点的值不影响 $\int F$，所以这个例子还能补救；一般情形中「坏」的 $x$ 构成 Lebesgue 零测集，这是 L3 的内容。）
3. 对连续函数，两个假设自动成立，这就是 {@fubini-pave}。
:::

::: cex id=c11-cex-iterees lvl=1
**累次积分存在且相等，$f$ 却不可积。** 设 $E$ 是 $[0, 1]^2$ 中形如 $(\frac pq, \frac rq)$ 的点组成的集合，其中 $q \ge 1$，且 $\frac pq$、$\frac rq$ 都是**既约分数、分母同为 $q$**。令 $f = \mathbf{1}_E$。

1. **截口。** 若 $x$ 是无理数，竖线 $\{x\} \times [0, 1]$ 与 $E$ 不相交；若 $x = \frac pq$（既约），竖线上 $E$ 的点满足 $y = \frac rq$，$0 \le r \le q$，至多 $q + 1$ 个。所以每个截口 $y \mapsto f(x, y)$ 只在有限个点非零，在 $[0, 1]$ 上可积且积分为 $0$。于是 $\int_0^1\big(\int_0^1 f\,\dd y\big)\dd x = 0$；由对称性另一个累次积分也是 $0$。
2. **$E$ 在 $[0, 1]^2$ 中稠密。** 给定开矩形 $]\alpha, \beta[ \times ]\gamma, \delta[ \subset [0, 1]^2$，取素数 $q > \frac{2}{\min(\beta - \alpha, \delta - \gamma)}$。长度大于 $\frac2q$ 的开区间至少含有一个 $\frac pq$（$p \in \Z$），所以存在 $\frac pq \in ]\alpha, \beta[$、$\frac rq \in ]\gamma, \delta[$；由于这两个区间包含于 $]0, 1[$，有 $0 < p, r < q$，而 $q$ 是素数，故两个分数都既约，$(\frac pq, \frac rq) \in E$。
3. **$f$ 不可积。** $E$ 的补集也稠密（含有坐标为无理数的点），所以每个小矩形上 $M_Q = 1$、$m_Q = 0$，与 {@c11-cex-dirichlet} 一样，上积分 $1$、下积分 $0$。
:::

::: ex lvl=1
**乘积形式的函数。** 若 $f$ 在 $[a, b]$ 上连续、$g$ 在 $[c, d]$ 上连续，由 {@fubini-pave} 与线性（内层积分中 $f(x)$ 是常数），
$$\iint_{[a,b]\times[c,d]} f(x)g(y)\,\dd x\,\dd y = \int_a^b f(x)\Big(\int_c^d g(y)\,\dd y\Big)\dd x = \Big(\int_a^b f\Big)\Big(\int_c^d g\Big).$$
例如，令 $u = x^2$（$\dd u = 2x\,\dd x$），$\int_0^1 x\e^{x^2}\,\dd x = \frac12\int_0^1\e^u\,\dd u = \frac{\e - 1}2$，所以
$$\iint_{[0,1]^2}xy\,\e^{x^2}\,\dd x\,\dd y = \int_0^1x\,\e^{x^2}\,\dd x\cdot\int_0^1y\,\dd y = \frac{\e - 1}{2}\cdot\frac12 = \frac{\e - 1}{4}.$$
:::

::: q
计算 $\iint_{[0,1]^2} y\,\e^{xy}\,\dd x\,\dd y$。先对哪个变量积分更省事？
:::

::: ans
先对 $x$ 积分：$y$ 固定时 $\int_0^1 y\,\e^{xy}\,\dd x = \big[\e^{xy}\big]_{x=0}^{x=1} = \e^y - 1$（$y = 0$ 时两边都是 $0$）。再对 $y$ 积分：$\int_0^1(\e^y - 1)\,\dd y = \e - 2$。若先对 $y$ 积分，$\int_0^1 y\,\e^{xy}\,\dd y$ 需要分部积分，并且 $x = 0$ 要单独处理。由 {@fubini-pave}，两种次序结果相同，所以选简单的那个。
:::

## 一般区域上的积分

圆盘、三角形都不是矩形。办法是：把 $f$ 在区域外补成 $0$，放进一个大矩形里积分。补零后的函数在区域的边界上一般不连续，所以要先弄清楚：**什么样的不连续点集不影响可积性？** 本节的回答是「可以被总体积任意小的有限个矩形覆盖的集合」。

::: def id=c11-contenu-nul zh="零容度集" en="Set of (Jordan) content zero" fr="Partie de contenu nul (négligeable au sens de Jordan)" ru="Множество жордановой меры нуль"
设 $E \subset \R^n$。称 $E$ 是**零容度集**（也称 Jordan 零测集），如果
$$\forall \eps > 0,\ \exists m \in \N,\ \exists R_1, \dots, R_m \text{ 闭矩形},\quad E \subset R_1 \cup \dots \cup R_m\ \text{ 且 }\ \sum_{k=1}^m\operatorname{vol}(R_k) < \eps.$$
这里允许矩形退化（某些边长为 $0$，此时体积为 $0$）。

白话：$E$ 可以被**有限个**矩形盖住，而且这些矩形的总体积要多小有多小。
:::

::: fr
Soit $E \subset \R^n$. On dit que $E$ est **de contenu nul** (ou négligeable au sens de Jordan) si
$$\forall \eps > 0,\ \exists m \in \N,\ \exists R_1, \dots, R_m \text{ pavés fermés},\quad E \subset R_1 \cup \dots \cup R_m\ \text{ et }\ \sum_{k=1}^m\operatorname{vol}(R_k) < \eps.$$
Les pavés dégénérés (certains côtés de longueur nulle, donc de volume nul) sont autorisés.

Autrement dit : $E$ peut être recouvert par un nombre **fini** de pavés dont le volume total est aussi petit que l'on veut.
:::

::: ex lvl=1
1. **单点** $\{p\} \subset \R^n$：$R = \prod_i[p_i - \eta, p_i + \eta]$ 的体积 $(2\eta)^n$，取 $\eta = \frac14\eps^{1/n}$，则 $(2\eta)^n = 2^{-n}\eps < \eps$。
2. **线段** $[0, 1] \times \{0\} \subset \R^2$：被 $[0, 1] \times [-\eta, \eta]$ 覆盖，面积 $2\eta$，取 $\eta = \eps/4$。
3. **运算**：零容度集的子集是零容度集（用同一组矩形）；有限个零容度集 $E_1, \dots, E_k$ 的并是零容度集（每个 $E_j$ 用总体积 $< \eps/k$ 的矩形覆盖，合起来总体积 $< \eps$）。
4. **矩形的边界**：$\partial P$ 是 $2n$ 个面的并，每个面是退化矩形（体积 $0$），所以 $\partial P$ 是零容度集。
:::

::: cex id=c11-cex-rationnels lvl=1
$E = \Q \cap [0, 1] \subset \R$ 是可数集，但**不是**零容度集。设 $E \subset I_1 \cup \dots \cup I_m$（闭区间）。有限个闭集的并 $F = I_1 \cup \dots \cup I_m$ 是闭集，且包含 $E$，所以包含 $E$ 的闭包 $[0, 1]$。由后面 {@c11-additivite} 的第 2 条，$\sum_k\abs{I_k} \ge \operatorname{vol}([0, 1]) = 1$，不能小于 $\eps = 1$。同理（把 $[0, 1]$ 换成 $P$），任何有内点的矩形都不是零容度集。
:::

::: lem id=c11-graphe-negligeable zh="连续函数的图像是零容度集" en="Graphs of continuous functions have content zero" fr="Le graphe d'une fonction continue est de contenu nul" ru="График непрерывной функции имеет жорданову меру нуль" lvl=1
设 $K \subset \R^p$ 是紧集，$\varphi : K \to \R$ 连续。则图像 $\Gamma_\varphi = \{(x, \varphi(x)) : x \in K\}$ 是 $\R^{p+1}$ 中的零容度集。把 $\varphi$ 的值放在任何一个坐标位置上（例如 $\{(\varphi(y), y)\}$），结论同样成立。
:::

::: fr
Soient $K \subset \R^p$ un compact et $\varphi : K \to \R$ continue. Alors le graphe $\Gamma_\varphi = \{(x, \varphi(x)) : x \in K\}$ est de contenu nul dans $\R^{p+1}$. Il en est de même si la valeur de $\varphi$ est placée sur une autre coordonnée (par exemple $\{(\varphi(y), y)\}$).
:::

::: proof
▷ 思路：$\varphi$ 一致连续，在一个小矩形 $Q$ 上变化小于 $\eps$，所以 $Q$ 上方的那段图像装在「薄片」$Q \times [\varphi(c_Q) - \eps, \varphi(c_Q) + \eps]$ 里，所有薄片的总体积 $\le 2\eps\operatorname{vol}(A)$。

**第 1 步（翻译一致连续性）**　$K$ 有界，取矩形 $A \subset \R^p$ 使 $K \subset A$。$K$ 紧、$\varphi$ 连续，由 {@heine}，$\varphi$ 一致连续：设 $\eps > 0$，存在 $\delta > 0$，使对 $x, x' \in K$，$\norm{x - x'}_\infty < \delta \implies \abs{\varphi(x) - \varphi(x')} < \eps$。

**第 2 步（薄片覆盖）**　设 $A = \prod_i[a_i, b_i]$，令 $N = E\big(\max_i(b_i - a_i)/\delta\big) + 1$，取 $A$ 的正则分割 $\sigma_N$，每个小矩形的 $\norm\cdot_\infty$-直径 $< \delta$。对每个与 $K$ 相交的小矩形 $Q$，取一点 $c_Q \in Q \cap K$，令
$$T_Q = Q \times [\varphi(c_Q) - \eps, \varphi(c_Q) + \eps] \subset \R^{p+1}.$$
若 $x \in Q \cap K$，则 $\norm{x - c_Q}_\infty < \delta$，故 $\abs{\varphi(x) - \varphi(c_Q)} < \eps$，即 $(x, \varphi(x)) \in T_Q$。每个 $x \in K$ 都属于某个小矩形，所以 $\Gamma_\varphi \subset \bigcup_{Q \cap K \ne \varnothing} T_Q$。

**第 3 步（总体积）**　
$$\sum_{Q \cap K \ne \varnothing}\operatorname{vol}(T_Q) = \sum_{Q \cap K \ne \varnothing} 2\eps\operatorname{vol}(Q) \le 2\eps\sum_{Q \in \sigma_N}\operatorname{vol}(Q) = 2\eps\operatorname{vol}(A).$$
给定 $\eps' > 0$，在第 1–2 步中取 $\eps = \frac{\eps'}{2\operatorname{vol}(A) + 1}$，总体积 $< \eps'$。所以 $\Gamma_\varphi$ 是零容度集。

**坐标位置**　交换坐标把矩形变成体积相同的矩形，所以把 $\varphi$ 的值放在别的坐标上，结论不变。
:::

::: fr
▷ Méthode : $\varphi$ est uniformément continue ; sur un petit pavé $Q$ elle varie de moins de $\eps$, donc la partie du graphe au-dessus de $Q$ est contenue dans la « tranche » $Q \times [\varphi(c_Q) - \eps, \varphi(c_Q) + \eps]$, et le volume total des tranches est $\le 2\eps\operatorname{vol}(A)$.

**Étape 1 (on traduit la continuité uniforme)**　$K$ est borné ; soit $A \subset \R^p$ un pavé contenant $K$. Comme $K$ est compact et $\varphi$ continue, le {@fr:heine} montre que $\varphi$ est uniformément continue : soit $\eps > 0$, il existe $\delta > 0$ tel que pour $x, x' \in K$, $\norm{x - x'}_\infty < \delta \implies \abs{\varphi(x) - \varphi(x')} < \eps$.

**Étape 2 (recouvrement par des tranches)**　Écrivons $A = \prod_i[a_i, b_i]$, posons $N = E\big(\max_i(b_i - a_i)/\delta\big) + 1$ et prenons la subdivision régulière $\sigma_N$ de $A$ ; chaque sous-pavé est de diamètre $< \delta$ pour $\norm\cdot_\infty$. Pour chaque sous-pavé $Q$ qui rencontre $K$, choisissons $c_Q \in Q \cap K$ et posons
$$T_Q = Q \times [\varphi(c_Q) - \eps, \varphi(c_Q) + \eps] \subset \R^{p+1}.$$
Si $x \in Q \cap K$, alors $\norm{x - c_Q}_\infty < \delta$, donc $\abs{\varphi(x) - \varphi(c_Q)} < \eps$, c'est-à-dire $(x, \varphi(x)) \in T_Q$. Tout $x \in K$ appartient à un sous-pavé, donc $\Gamma_\varphi \subset \bigcup_{Q \cap K \ne \varnothing} T_Q$.

**Étape 3 (volume total)**　
$$\sum_{Q \cap K \ne \varnothing}\operatorname{vol}(T_Q) = \sum_{Q \cap K \ne \varnothing} 2\eps\operatorname{vol}(Q) \le 2\eps\sum_{Q \in \sigma_N}\operatorname{vol}(Q) = 2\eps\operatorname{vol}(A).$$
Soit $\eps' > 0$ ; en prenant $\eps = \frac{\eps'}{2\operatorname{vol}(A) + 1}$ dans les étapes 1 et 2, le volume total est $< \eps'$. Donc $\Gamma_\varphi$ est de contenu nul.

**Position de la coordonnée**　Une permutation des coordonnées transforme un pavé en un pavé de même volume ; la conclusion ne dépend donc pas de la coordonnée sur laquelle on place la valeur de $\varphi$.
:::

下面这个引理是本节所有证明的技术核心：它把「$E$ 被总体积小的矩形覆盖」翻译成「某个分割中与 $E$ 相交的小矩形总体积小」。

::: lem id=c11-recouvrement zh="覆盖引理" en="Covering lemma" fr="Lemme de recouvrement" ru="Лемма о покрытии" lvl=2
设 $P$ 是矩形，$E \subset P$，且 $E \subset R_1 \cup \dots \cup R_m$（闭矩形）。则对任意 $\eps > 0$，存在 $P$ 的分割 $\sigma$，使得 $\sigma$ 中与 $E$ 相交的小矩形的总体积 $\le \sum_{k=1}^m\operatorname{vol}(R_k) + \eps$。
:::

::: fr
Soient $P$ un pavé, $E \subset P$ et $R_1, \dots, R_m$ des pavés fermés tels que $E \subset R_1 \cup \dots \cup R_m$. Alors pour tout $\eps > 0$, il existe une subdivision $\sigma$ de $P$ telle que le volume total des sous-pavés de $\sigma$ qui rencontrent $E$ soit $\le \sum_{k=1}^m\operatorname{vol}(R_k) + \eps$.
:::

::: sketch
▷ 思路：把每个 $R_k$ 稍微放大成 $R_k^\eta$，使 $E$ 落在这些放大矩形的**内部**；用所有 $R_k^\eta$ 的顶点坐标生成网格。这样，与 $E$ 相交的网格小矩形一定整个落在某个 $R_k^\eta$ 中。

**第 1 步（放大）**　若 $R_k = \prod_i[\alpha_{k,i}, \beta_{k,i}]$，对 $\eta > 0$ 令 $R_k^\eta = \prod_i[\alpha_{k,i} - \eta, \beta_{k,i} + \eta]$。$\operatorname{vol}(R_k^\eta) = \prod_i(\beta_{k,i} - \alpha_{k,i} + 2\eta)$ 是 $\eta$ 的多项式，$\eta \to 0$ 时趋于 $\operatorname{vol}(R_k)$，所以可以固定 $\eta > 0$ 使 $\sum_k\operatorname{vol}(R_k^\eta) \le \sum_k\operatorname{vol}(R_k) + \eps$。又 $R_k \subset \operatorname{int}R_k^\eta$，故 $E \subset \bigcup_k\operatorname{int}R_k^\eta$。

**第 2 步（网格及其性质 (∗)）**　令 $\sigma$ 为 $P = \prod_i[a_i, b_i]$ 的分割，第 $i$ 个坐标的分点是 $a_i$、$b_i$ 以及所有落在 $]a_i, b_i[$ 中的 $\alpha_{k,i} - \eta$、$\beta_{k,i} + \eta$。性质 (∗)：对每个小矩形 $C \in \sigma$ 和每个 $k$，**要么 $C \subset R_k^\eta$，要么 $\operatorname{int}C \cap \operatorname{int}R_k^\eta = \varnothing$**。理由：逐个坐标看，$\operatorname{int}C$ 的第 $i$ 条边是两个相邻分点之间的开区间 $]t_{j-1}, t_j[$；$\operatorname{int}R_k^\eta$ 的第 $i$ 条边 $]\alpha_{k,i} - \eta, \beta_{k,i} + \eta[$ 的端点要么是分点，要么在 $]a_i, b_i[$ 之外，所以 $]t_{j-1}, t_j[$ 要么包含于它，要么与它不相交。若 $n$ 条边都是前者，取闭包得 $C \subset R_k^\eta$；否则某条边不相交，$\operatorname{int}C \cap \operatorname{int}R_k^\eta = \varnothing$。

**第 3 步（与 $E$ 相交的小矩形）**　设 $C \in \sigma$ 与 $E$ 交于点 $p$。由第 1 步，存在 $k$ 使 $p \in \operatorname{int}R_k^\eta$。$C$ 是 $\operatorname{int}C$ 的闭包，所以 $p$ 的每个邻域都与 $\operatorname{int}C$ 相交；开集 $\operatorname{int}R_k^\eta$ 是 $p$ 的邻域，故 $\operatorname{int}C \cap \operatorname{int}R_k^\eta \ne \varnothing$。由 (∗)，$C \subset R_k^\eta$。

**第 4 步（求和）**　把每个与 $E$ 相交的 $C$ 分给使 $C \subset R_k^\eta$ 的最小的 $k$。分给 $k$ 的小矩形互不相同，且都包含于矩形 $R_k^\eta \cap P$；而 $R_k^\eta \cap P$ 的各边端点都是分点，包含于它的 $\sigma$ 的小矩形构成它的一个分割，体积之和为 $\operatorname{vol}(R_k^\eta \cap P) \le \operatorname{vol}(R_k^\eta)$。对 $k$ 求和：与 $E$ 相交的小矩形总体积 $\le \sum_k\operatorname{vol}(R_k^\eta) \le \sum_k\operatorname{vol}(R_k) + \eps$。
:::

::: fr
▷ Méthode : on agrandit légèrement chaque $R_k$ en $R_k^\eta$, de sorte que $E$ soit contenu dans la **réunion des intérieurs** ; on construit la grille engendrée par les sommets des $R_k^\eta$. Un sous-pavé de la grille qui rencontre $E$ est alors entièrement contenu dans un $R_k^\eta$.

**Étape 1 (agrandissement)**　Si $R_k = \prod_i[\alpha_{k,i}, \beta_{k,i}]$, posons pour $\eta > 0$ $R_k^\eta = \prod_i[\alpha_{k,i} - \eta, \beta_{k,i} + \eta]$. Le volume $\operatorname{vol}(R_k^\eta) = \prod_i(\beta_{k,i} - \alpha_{k,i} + 2\eta)$ est un polynôme en $\eta$ qui tend vers $\operatorname{vol}(R_k)$ quand $\eta \to 0$ ; on fixe donc $\eta > 0$ tel que $\sum_k\operatorname{vol}(R_k^\eta) \le \sum_k\operatorname{vol}(R_k) + \eps$. De plus $R_k \subset \operatorname{int}R_k^\eta$, donc $E \subset \bigcup_k\operatorname{int}R_k^\eta$.

**Étape 2 (la grille et sa propriété (∗))**　Soit $\sigma$ la subdivision de $P = \prod_i[a_i, b_i]$ dont les points sur la $i$-ème coordonnée sont $a_i$, $b_i$ et tous les $\alpha_{k,i} - \eta$, $\beta_{k,i} + \eta$ qui appartiennent à $]a_i, b_i[$. Propriété (∗) : pour tout sous-pavé $C \in \sigma$ et tout $k$, **ou bien $C \subset R_k^\eta$, ou bien $\operatorname{int}C \cap \operatorname{int}R_k^\eta = \varnothing$**. En effet, coordonnée par coordonnée, le $i$-ème côté de $\operatorname{int}C$ est un intervalle ouvert $]t_{j-1}, t_j[$ entre deux points consécutifs ; les extrémités du $i$-ème côté $]\alpha_{k,i} - \eta, \beta_{k,i} + \eta[$ de $\operatorname{int}R_k^\eta$ sont des points de la subdivision ou se trouvent hors de $]a_i, b_i[$, donc $]t_{j-1}, t_j[$ y est contenu ou lui est disjoint. Si c'est le premier cas pour les $n$ côtés, on obtient $C \subset R_k^\eta$ en passant à l'adhérence ; sinon un côté est disjoint et $\operatorname{int}C \cap \operatorname{int}R_k^\eta = \varnothing$.

**Étape 3 (sous-pavés qui rencontrent $E$)**　Soit $C \in \sigma$ qui rencontre $E$ en un point $p$. D'après l'étape 1, il existe $k$ tel que $p \in \operatorname{int}R_k^\eta$. Comme $C$ est l'adhérence de $\operatorname{int}C$, tout voisinage de $p$ rencontre $\operatorname{int}C$ ; l'ouvert $\operatorname{int}R_k^\eta$ est un voisinage de $p$, donc $\operatorname{int}C \cap \operatorname{int}R_k^\eta \ne \varnothing$. Par (∗), $C \subset R_k^\eta$.

**Étape 4 (sommation)**　On attribue chaque $C$ qui rencontre $E$ au plus petit $k$ tel que $C \subset R_k^\eta$. Les sous-pavés attribués à $k$ sont distincts et contenus dans le pavé $R_k^\eta \cap P$ ; les extrémités des côtés de $R_k^\eta \cap P$ sont des points de la subdivision, donc les sous-pavés de $\sigma$ qu'il contient en forment une subdivision, de volume total $\operatorname{vol}(R_k^\eta \cap P) \le \operatorname{vol}(R_k^\eta)$. En sommant sur $k$ : le volume total des sous-pavés qui rencontrent $E$ est $\le \sum_k\operatorname{vol}(R_k^\eta) \le \sum_k\operatorname{vol}(R_k) + \eps$.
:::

::: lem id=c11-integrable-negligeable zh="在零容度集外连续的函数可积" en="Functions continuous off a set of content zero are integrable" fr="Une fonction continue hors d'une partie de contenu nul est intégrable" ru="Интегрируемость функции, непрерывной вне множества меры нуль" lvl=2
设 $P$ 是矩形，$f : P \to \R$ 有界（$\abs f \le M$），$E \subset P$ 是零容度集，且 $f$ 在 $P \setminus E$ 的每一点连续。则

1. $f$ 在 $P$ 上可积；
2. 若此外 $f$ 在 $P \setminus E$ 上恒为 $0$，则 $\int_P f = 0$。
:::

::: fr
Soient $P$ un pavé, $f : P \to \R$ bornée ($\abs f \le M$) et $E \subset P$ une partie de contenu nul, telles que $f$ soit continue en tout point de $P \setminus E$. Alors

1. $f$ est intégrable sur $P$ ;
2. si de plus $f$ est nulle sur $P \setminus E$, alors $\int_P f = 0$.
:::

::: sketch
▷ 思路：与 $E$ 相交的小矩形总体积很小（{@c11-recouvrement}），在那里只用 $\abs f \le M$ 粗略估计；其余小矩形的并是与 $E$ 不交的紧集，$f$ 在其上一致连续，按 {@continue-integrable} 第 1 步处理。

**第 1 步（隔离 $E$）**　设 $\eps > 0$。$E$ 是零容度集：存在闭矩形 $R_1, \dots, R_m \supset E$（并集包含 $E$），$\sum_k\operatorname{vol}(R_k) < \eps$。由 {@c11-recouvrement}，存在 $P$ 的分割 $\sigma_0$，其中与 $E$ 相交的小矩形（称为**坏的**）总体积 $\le 2\eps$。

**第 2 步（其余部分一致连续）**　令 $L$ 为 $\sigma_0$ 中不与 $E$ 相交的小矩形（**好的**）之并。$L$ 是有限个矩形的并，是紧集，且 $L \cap E = \varnothing$，所以 $f$ 在 $L$ 的每一点连续，$f|_L$ 连续，由 {@heine} 一致连续：存在 $\delta > 0$，使 $x, x' \in L$、$\norm{x - x'}_\infty < \delta$ 时 $\abs{f(x) - f(x')} < \eps$。

**第 3 步（加细与估计）**　取正则分割 $\sigma_N$ 使其小矩形直径 $< \delta$（同 {@continue-integrable} 第 1 步），令 $\sigma = \sigma_0 \vee \sigma_N$。$\sigma$ 的每个小矩形 $C$ 落在 $\sigma_0$ 的唯一一个小矩形 $C_0$ 中。

- 若 $C_0$ 是坏的：这样的 $C$ 的总体积 $= $ 坏小矩形的总体积 $\le 2\eps$，且 $M_C - m_C \le 2M$。
- 若 $C_0$ 是好的：$C \subset L$，直径 $< \delta$，所以 $M_C - m_C \le \eps$。

于是 $S^+(f, \sigma) - S^-(f, \sigma) \le 2M\cdot2\eps + \eps\operatorname{vol}(P) = \eps\big(4M + \operatorname{vol}(P)\big)$。$\eps$ 任意，由 {@c11-critere-riemann}，$f$ 可积。

**第 4 步（第 2 条）**　设 $f$ 在 $P \setminus E$ 上为 $0$。若 $C_0$ 是好的，则 $C \cap E = \varnothing$，$f$ 在 $C$ 上恒为 $0$，$M_C = m_C = 0$；坏的那些 $C$ 上 $\abs{M_C}, \abs{m_C} \le M$。所以
$$-2M\eps \le S^-(f, \sigma) \le \int_P f \le S^+(f, \sigma) \le 2M\eps.$$
$\eps$ 任意，故 $\int_P f = 0$。
:::

::: fr
▷ Méthode : les sous-pavés qui rencontrent $E$ ont un volume total petit ({@fr:c11-recouvrement}) et l'on s'y contente de la majoration $\abs f \le M$ ; la réunion des autres est un compact disjoint de $E$, sur lequel $f$ est uniformément continue, et l'on procède comme à l'étape 1 du {@fr:continue-integrable}.

**Étape 1 (on isole $E$)**　Soit $\eps > 0$. $E$ étant de contenu nul, il existe des pavés fermés $R_1, \dots, R_m$ dont la réunion contient $E$, avec $\sum_k\operatorname{vol}(R_k) < \eps$. D'après le {@fr:c11-recouvrement}, il existe une subdivision $\sigma_0$ de $P$ dont les sous-pavés qui rencontrent $E$ (les **mauvais**) ont un volume total $\le 2\eps$.

**Étape 2 (continuité uniforme ailleurs)**　Soit $L$ la réunion des sous-pavés de $\sigma_0$ qui ne rencontrent pas $E$ (les **bons**). $L$ est une réunion finie de pavés, donc compacte, et $L \cap E = \varnothing$ ; $f$ est continue en tout point de $L$, donc $f|_L$ est continue, et uniformément continue d'après le {@fr:heine} : il existe $\delta > 0$ tel que pour $x, x' \in L$, $\norm{x - x'}_\infty < \delta$ entraîne $\abs{f(x) - f(x')} < \eps$.

**Étape 3 (raffinement et estimation)**　Prenons une subdivision régulière $\sigma_N$ de pas $< \delta$ (comme à l'étape 1 du {@fr:continue-integrable}) et posons $\sigma = \sigma_0 \vee \sigma_N$. Chaque sous-pavé $C$ de $\sigma$ est contenu dans un unique sous-pavé $C_0$ de $\sigma_0$.

- Si $C_0$ est mauvais : le volume total de ces $C$ est égal à celui des mauvais sous-pavés, donc $\le 2\eps$, et $M_C - m_C \le 2M$.
- Si $C_0$ est bon : $C \subset L$ et $C$ est de diamètre $< \delta$, donc $M_C - m_C \le \eps$.

Ainsi $S^+(f, \sigma) - S^-(f, \sigma) \le 2M\cdot2\eps + \eps\operatorname{vol}(P) = \eps\big(4M + \operatorname{vol}(P)\big)$. Comme $\eps$ est arbitraire, le {@fr:c11-critere-riemann} montre que $f$ est intégrable.

**Étape 4 (point 2)**　Supposons $f$ nulle sur $P \setminus E$. Si $C_0$ est bon, alors $C \cap E = \varnothing$, $f$ est nulle sur $C$ et $M_C = m_C = 0$ ; sur les $C$ mauvais, $\abs{M_C}, \abs{m_C} \le M$. Donc
$$-2M\eps \le S^-(f, \sigma) \le \int_P f \le S^+(f, \sigma) \le 2M\eps.$$
Comme $\eps$ est arbitraire, $\int_P f = 0$.
:::

::: def id=def-jordan zh="Jordan 可测集、面积与体积" en="Jordan measurable set" fr="Partie quarrable (mesurable au sens de Jordan)" ru="Множество, измеримое по Жордану"
有界集 $D \subset \R^n$ 是 **Jordan 可测**的（二维时称「可求面积」，quarrable），如果它的边界 $\partial D$ 是零容度集（{@c11-contenu-nul}），即 $\partial D$ 可以被总体积任意小的有限个矩形覆盖。此时对 $D$ 上的连续有界函数 $f$，取包含 $D$ 的矩形 $P$，定义
$$\int_Df = \int_P\tilde f,\qquad\tilde f = f\cdot\mathbf{1}_D\ \text{（在 }D\text{ 外补零）}.$$
$\tilde f$ 只在 $\partial D$ 上可能不连续，而 $\partial D$ 是零容度集，所以 $\tilde f$ 可积（{@c11-integrable-negligeable}）。$D$ 的**体积**（二维时为面积）定义为 $\operatorname{vol}(D) = \int_D1$。
:::

::: fr
Une partie bornée $D \subset \R^n$ est **mesurable au sens de Jordan** (dans le plan, on dit **quarrable**) si sa frontière $\partial D$ est de contenu nul ({@fr:c11-contenu-nul}), c'est-à-dire si $\partial D$ peut être recouverte par un nombre fini de pavés de volume total arbitrairement petit. Pour $f$ continue et bornée sur $D$, on choisit un pavé $P$ contenant $D$ et l'on pose
$$\int_Df = \int_P\tilde f,\qquad\tilde f = f\cdot\mathbf{1}_D\ \text{(prolongement par } 0 \text{ hors de } D\text{)}.$$
La fonction $\tilde f$ ne peut être discontinue qu'aux points de $\partial D$, qui est de contenu nul ; elle est donc intégrable ({@fr:c11-integrable-negligeable}). Le **volume** de $D$ (l'**aire** en dimension 2) est $\operatorname{vol}(D) = \int_D1$.
:::

::: rem
**定义中的两个细节。**

1. **$\tilde f$ 为什么只在 $\partial D$ 上可能不连续。** $P$ 的点分三类：$D$ 的内点、$\partial D$ 的点、$\overline D$ 外的点。若 $x \in \operatorname{int}D$，在 $x$ 的某个邻域上 $\tilde f = f$，而 $f$ 在 $x$ 连续；若 $x \notin \overline D$，在 $x$ 的某个邻域上 $\tilde f = 0$。两种情形 $\tilde f$ 都在 $x$ 连续。
2. **不依赖于 $P$ 的选取。** 若 $P$、$P'$ 都包含 $D$，则 $P \cap P'$ 也是包含 $D$ 的矩形，所以只需比较 $P \subset P'$ 的情形。按 $P$ 各边的端点把 $P'$ 分成若干小矩形，$P$ 是其中之一。积分对这种分块可加（Chasles 关系：取加细这一分块的分割，Darboux 和按块相加，证明与一元情形相同）。在 $P$ 以外的每一块 $C$ 上，$\tilde f$ 只在 $C \cap P$ 上可能非零，$C \cap P$ 包含于 $C$ 的一个面，是零容度集；在 $C \setminus P$ 的点附近 $\tilde f = 0$。由 {@c11-integrable-negligeable} 第 2 条，$\int_C\tilde f = 0$。所以 $\int_{P'}\tilde f = \int_P\tilde f$。
:::

::: ex lvl=1
1. **矩形** $P'$：$\partial P'$ 是零容度集（前面例子的第 4 条），所以 $P'$ Jordan 可测；取 $P = P'$，由 {@continue-integrable}，$\operatorname{vol}(P') = \int_{P'}1 = \prod_i(b_i - a_i)$，与原来的体积一致。
2. **圆盘** $D = \{x^2 + y^2 \le R^2\}$：$\partial D$ 是圆周，它是 $[-R, R]$ 上两个连续函数 $y = \pm\sqrt{R^2 - x^2}$ 的图像之并，由 {@c11-graphe-negligeable} 是零容度集，所以圆盘可求面积。
:::

::: cex lvl=1
$D = \Q^2 \cap [0, 1]^2$ **不是** Jordan 可测的。$[0, 1]^2$ 的每一点的任何邻域里既有 $D$ 的点也有不属于 $D$ 的点，所以 $\partial D = [0, 1]^2$，它有内点，不是零容度集（{@c11-cex-rationnels} 的最后一句）。与之对应，$\mathbf{1}_D$ 正是 {@c11-cex-dirichlet} 中不可积的函数。
:::

::: prop id=c11-additivite zh="区域上积分的基本性质" en="Basic properties of the integral over a domain" fr="Propriétés de l'intégrale sur une partie quarrable" ru="Основные свойства интеграла по измеримому множеству" lvl=1
设 $D, D', D_1, D_2 \subset \R^n$ 是 Jordan 可测集，$f, g$ 是相应集合上的连续有界函数，$\lambda \in \R$。

1. （线性与单调）$\int_D(f + \lambda g) = \int_Df + \lambda\int_Dg$；若在 $D$ 上 $f \le g$，则 $\int_Df \le \int_Dg$。
2. （覆盖估计）若 Jordan 可测集 $E \subset R_1 \cup \dots \cup R_m$（闭矩形），则 $\operatorname{vol}(E) \le \sum_k\operatorname{vol}(R_k)$。特别地，零容度的 Jordan 可测集体积为 $0$。
3. $\abs{\int_Df} \le \sup_D\abs f\cdot\operatorname{vol}(D)$。
4. （可加性）$D_1 \cup D_2$、$D_1 \cap D_2$、$D_1 \setminus D_2$ 都是 Jordan 可测的；若 $\operatorname{vol}(D_1 \cap D_2) = 0$（例如 $D_1 \cap D_2 = \varnothing$ 或是零容度集），则对 $D_1 \cup D_2$ 上的连续有界函数 $f$，
$$\int_{D_1 \cup D_2}f = \int_{D_1}f + \int_{D_2}f.$$
5. （小差集）若 $D \subset D'$ 且 $D' \setminus D \subset R_1 \cup \dots \cup R_m$，则 $\abs{\int_{D'}f - \int_Df} \le \sup_{D'}\abs f\cdot\sum_k\operatorname{vol}(R_k)$。
6. （对区域单调）若 $D \subset D'$ 且在 $D'$ 上 $f \ge 0$，则 $\int_Df \le \int_{D'}f$。
:::

::: fr
Soient $D, D', D_1, D_2 \subset \R^n$ des parties mesurables au sens de Jordan, $f, g$ des fonctions continues et bornées sur les ensembles considérés, et $\lambda \in \R$.

1. (Linéarité et croissance) $\int_D(f + \lambda g) = \int_Df + \lambda\int_Dg$ ; si $f \le g$ sur $D$, alors $\int_Df \le \int_Dg$.
2. (Majoration par un recouvrement) Si $E$ est mesurable au sens de Jordan et $E \subset R_1 \cup \dots \cup R_m$ (pavés fermés), alors $\operatorname{vol}(E) \le \sum_k\operatorname{vol}(R_k)$. En particulier, une partie mesurable de contenu nul est de volume nul.
3. $\abs{\int_Df} \le \sup_D\abs f\cdot\operatorname{vol}(D)$.
4. (Additivité) $D_1 \cup D_2$, $D_1 \cap D_2$ et $D_1 \setminus D_2$ sont mesurables au sens de Jordan ; si $\operatorname{vol}(D_1 \cap D_2) = 0$ (par exemple si $D_1 \cap D_2 = \varnothing$ ou est de contenu nul), alors pour toute $f$ continue et bornée sur $D_1 \cup D_2$,
$$\int_{D_1 \cup D_2}f = \int_{D_1}f + \int_{D_2}f.$$
5. (Petite différence) Si $D \subset D'$ et $D' \setminus D \subset R_1 \cup \dots \cup R_m$, alors $\abs{\int_{D'}f - \int_Df} \le \sup_{D'}\abs f\cdot\sum_k\operatorname{vol}(R_k)$.
6. (Croissance par rapport au domaine) Si $D \subset D'$ et $f \ge 0$ sur $D'$, alors $\int_Df \le \int_{D'}f$.
:::

::: proof
▷ 思路：所有积分都在同一个包含全部集合的大矩形 $P$ 上、对补零后的函数计算（由 {@def-jordan} 后的注，结果不依赖于 $P$）；示性函数之间的恒等式就变成积分之间的恒等式。第 2 条用 {@c11-recouvrement}。

**第 1 条**　在 $P$ 上逐点有 $\widetilde{f + \lambda g} = \tilde f + \lambda\tilde g$；若 $f \le g$，则 $\tilde f \le \tilde g$。由 {@continue-integrable} 的第 2、3 条（对可积函数成立）即得。

**第 2 条**　设 $\eps > 0$。由 {@c11-recouvrement}，存在 $P$ 的分割 $\sigma$，其中与 $E$ 相交的小矩形总体积 $\le \sum_k\operatorname{vol}(R_k) + \eps$。在这些小矩形上 $M_Q(\mathbf 1_E) \le 1$，在其余小矩形上 $\mathbf 1_E = 0$。所以
$$\operatorname{vol}(E) = \int_P\mathbf 1_E \le S^+(\mathbf 1_E, \sigma) \le \sum_k\operatorname{vol}(R_k) + \eps.$$
$\eps$ 任意，得结论。若 $E$ 是零容度集，则对任意 $\eps$，$0 \le \operatorname{vol}(E) < \eps$（$\operatorname{vol}(E) \ge 0$ 由第 1 条的单调性），故 $\operatorname{vol}(E) = 0$。

**第 3 条**　记 $M = \sup_D\abs f$。在 $P$ 上 $-M\mathbf 1_D \le \tilde f \le M\mathbf 1_D$，由第 1 条（单调性与线性），$-M\operatorname{vol}(D) \le \int_Df \le M\operatorname{vol}(D)$。

**第 4 条**　*可测性*：设 $x \notin \partial D_1 \cup \partial D_2$。对 $i = 1, 2$，$x$ 要么是 $D_i$ 的内点，要么在 $\overline{D_i}$ 之外，所以存在 $x$ 的邻域 $V$，在 $V$ 上 $\mathbf 1_{D_1}$ 与 $\mathbf 1_{D_2}$ 都是常数。于是 $\mathbf 1_{D_1 \cup D_2} = \max(\mathbf 1_{D_1}, \mathbf 1_{D_2})$、$\mathbf 1_{D_1 \cap D_2} = \mathbf 1_{D_1}\mathbf 1_{D_2}$、$\mathbf 1_{D_1 \setminus D_2} = \mathbf 1_{D_1}(1 - \mathbf 1_{D_2})$ 在 $V$ 上也是常数，$x$ 不是这三个集合的边界点。所以它们的边界都包含于 $\partial D_1 \cup \partial D_2$，是零容度集（两个零容度集之并）。*公式*：由 $\mathbf 1_{D_1 \cup D_2} = \mathbf 1_{D_1} + \mathbf 1_{D_2} - \mathbf 1_{D_1 \cap D_2}$，乘以 $f$ 得 $\tilde f_{D_1 \cup D_2} = \tilde f_{D_1} + \tilde f_{D_2} - \tilde f_{D_1 \cap D_2}$。由第 1 条，
$$\int_{D_1 \cup D_2}f = \int_{D_1}f + \int_{D_2}f - \int_{D_1 \cap D_2}f,$$
而由第 3 条，$\abs{\int_{D_1 \cap D_2}f} \le \sup\abs f\cdot\operatorname{vol}(D_1 \cap D_2) = 0$。

**第 5 条**　$D' = D \cup (D' \setminus D)$，且 $D \cap (D' \setminus D) = \varnothing$；由第 4 条（$D' \setminus D$ 可测），$\int_{D'}f - \int_Df = \int_{D' \setminus D}f$。由第 3 条与第 2 条，$\abs{\int_{D' \setminus D}f} \le \sup_{D'}\abs f\cdot\operatorname{vol}(D' \setminus D) \le \sup_{D'}\abs f\cdot\sum_k\operatorname{vol}(R_k)$。

**第 6 条**　$f \ge 0$ 时，在 $P$ 上逐点 $\tilde f_D = f\mathbf 1_D \le f\mathbf 1_{D'} = \tilde f_{D'}$，由单调性得结论。
:::

::: fr
▷ Méthode : toutes les intégrales sont calculées sur un même grand pavé $P$ contenant tous les ensembles, pour les fonctions prolongées par $0$ (d'après la remarque suivant la {@fr:def-jordan}, le résultat ne dépend pas de $P$) ; les identités entre fonctions indicatrices deviennent des identités entre intégrales. Le point 2 utilise le {@fr:c11-recouvrement}.

**Point 1**　Sur $P$, on a ponctuellement $\widetilde{f + \lambda g} = \tilde f + \lambda\tilde g$ ; si $f \le g$, alors $\tilde f \le \tilde g$. Les points 2 et 3 du {@fr:continue-integrable} (valables pour des fonctions intégrables) donnent le résultat.

**Point 2**　Soit $\eps > 0$. D'après le {@fr:c11-recouvrement}, il existe une subdivision $\sigma$ de $P$ dont les sous-pavés qui rencontrent $E$ ont un volume total $\le \sum_k\operatorname{vol}(R_k) + \eps$. Sur ces sous-pavés $M_Q(\mathbf 1_E) \le 1$, et sur les autres $\mathbf 1_E = 0$. Donc
$$\operatorname{vol}(E) = \int_P\mathbf 1_E \le S^+(\mathbf 1_E, \sigma) \le \sum_k\operatorname{vol}(R_k) + \eps.$$
Comme $\eps$ est arbitraire, on conclut. Si $E$ est de contenu nul, alors pour tout $\eps$, $0 \le \operatorname{vol}(E) < \eps$ ($\operatorname{vol}(E) \ge 0$ par la croissance du point 1), donc $\operatorname{vol}(E) = 0$.

**Point 3**　Notons $M = \sup_D\abs f$. Sur $P$, $-M\mathbf 1_D \le \tilde f \le M\mathbf 1_D$, d'où par le point 1 (croissance et linéarité) $-M\operatorname{vol}(D) \le \int_Df \le M\operatorname{vol}(D)$.

**Point 4**　*Mesurabilité* : soit $x \notin \partial D_1 \cup \partial D_2$. Pour $i = 1, 2$, $x$ est intérieur à $D_i$ ou extérieur à $\overline{D_i}$ ; il existe donc un voisinage $V$ de $x$ sur lequel $\mathbf 1_{D_1}$ et $\mathbf 1_{D_2}$ sont constantes. Alors $\mathbf 1_{D_1 \cup D_2} = \max(\mathbf 1_{D_1}, \mathbf 1_{D_2})$, $\mathbf 1_{D_1 \cap D_2} = \mathbf 1_{D_1}\mathbf 1_{D_2}$ et $\mathbf 1_{D_1 \setminus D_2} = \mathbf 1_{D_1}(1 - \mathbf 1_{D_2})$ sont aussi constantes sur $V$, et $x$ n'est point frontière d'aucun de ces trois ensembles. Leurs frontières sont donc contenues dans $\partial D_1 \cup \partial D_2$, qui est de contenu nul (réunion de deux parties de contenu nul). *Formule* : de $\mathbf 1_{D_1 \cup D_2} = \mathbf 1_{D_1} + \mathbf 1_{D_2} - \mathbf 1_{D_1 \cap D_2}$, on tire en multipliant par $f$ : $\tilde f_{D_1 \cup D_2} = \tilde f_{D_1} + \tilde f_{D_2} - \tilde f_{D_1 \cap D_2}$. Par le point 1,
$$\int_{D_1 \cup D_2}f = \int_{D_1}f + \int_{D_2}f - \int_{D_1 \cap D_2}f,$$
et par le point 3, $\abs{\int_{D_1 \cap D_2}f} \le \sup\abs f\cdot\operatorname{vol}(D_1 \cap D_2) = 0$.

**Point 5**　On a $D' = D \cup (D' \setminus D)$ avec $D \cap (D' \setminus D) = \varnothing$ ; par le point 4 ($D' \setminus D$ est mesurable), $\int_{D'}f - \int_Df = \int_{D' \setminus D}f$. Par les points 3 et 2, $\abs{\int_{D' \setminus D}f} \le \sup_{D'}\abs f\cdot\operatorname{vol}(D' \setminus D) \le \sup_{D'}\abs f\cdot\sum_k\operatorname{vol}(R_k)$.

**Point 6**　Si $f \ge 0$, on a ponctuellement sur $P$ $\tilde f_D = f\mathbf 1_D \le f\mathbf 1_{D'} = \tilde f_{D'}$, et la croissance de l'intégrale conclut.
:::

::: thm id=lebesgue-critere zh="Lebesgue 可积准则" en="Lebesgue's criterion for Riemann integrability" fr="Critère de Lebesgue" ru="Критерий Лебега интегрируемости по Риману" lvl=3 ref="Spivak, *Calculus on Manifolds*，定理 3-8"
矩形上的有界函数 Riemann 可积，当且仅当它的不连续点集是 Lebesgue 零测集（对任意 $\eps$，可以被总体积 $< \eps$ 的**可数**个矩形覆盖）。
:::

::: fr
Une fonction bornée sur un pavé est intégrable au sens de Riemann si et seulement si l'ensemble de ses points de discontinuité est négligeable au sens de Lebesgue (pour tout $\eps$, il peut être recouvert par une famille **dénombrable** de pavés de volume total $< \eps$).
:::

::: rem
**零容度与 Lebesgue 零测的区别。** 零容度集一定是 Lebesgue 零测集（有限覆盖是可数覆盖的特例），所以 {@c11-integrable-negligeable} 是 {@lebesgue-critere} 的一个特例，只是充分条件。反过来不行：$\Q \cap [0, 1]$ 可数，是 Lebesgue 零测集（第 $k$ 个有理数用长度 $\eps/2^{k+1}$ 的区间盖住），但由 {@c11-cex-rationnels} 不是零容度集。Thomae 函数 $T(\frac pq) = \frac1q$（$\frac pq$ 既约）、$T(x) = 0$（$x$ 无理）在 $[0, 1]$ 上恰在有理点不连续，由 {@lebesgue-critere} 它可积（积分为 $0$），但 {@c11-integrable-negligeable} 不能用于它。
:::

::: q
$(\Q \cap [0, 1]) \times \{0\}$ 是 $\R^2$ 中的零容度集吗？这与 {@c11-cex-rationnels} 矛盾吗？
:::

::: ans
是。它包含于线段 $[0, 1] \times \{0\}$，后者被面积为 $2\eta$ 的矩形 $[0, 1] \times [-\eta, \eta]$ 覆盖。不矛盾：零容度依赖于所在空间的维数。在 $\R$ 中覆盖 $\Q \cap [0, 1]$ 的区间总长 $\ge 1$；在 $\R^2$ 中矩形可以在第二个方向上做得很薄。
:::

### 基本区域与 Fubini 定理

::: def id=def-domaine-elementaire zh="基本区域" en="Elementary (simple) domain" fr="Domaine élémentaire" ru="Элементарная область"
平面区域 $D$ 称为 **$y$-型基本区域**，如果
$$D = \{(x, y) : a \le x \le b,\ \varphi_1(x) \le y \le \varphi_2(x)\},$$
其中 $\varphi_1 \le \varphi_2$ 在 $[a,b]$ 上连续。**$x$-型**同理：$D = \{(x, y) : c \le y \le d,\ \psi_1(y) \le x \le \psi_2(y)\}$，$\psi_1 \le \psi_2$ 在 $[c, d]$ 上连续。圆盘、三角形、两条曲线之间的区域都是基本区域。

白话：$y$-型区域被每条竖直线 $x = x_0$（$a \le x_0 \le b$）截出一条线段（可能退化为一点），线段的上下端点随 $x_0$ 连续变化。
:::

::: fr
Une partie $D$ du plan est un **domaine élémentaire de type $y$** si
$$D = \{(x, y) : a \le x \le b,\ \varphi_1(x) \le y \le \varphi_2(x)\},$$
où $\varphi_1 \le \varphi_2$ sont continues sur $[a,b]$. On définit de même le **type $x$** : $D = \{(x, y) : c \le y \le d,\ \psi_1(y) \le x \le \psi_2(y)\}$, avec $\psi_1 \le \psi_2$ continues sur $[c, d]$. Les disques, les triangles, les régions comprises entre deux courbes sont des domaines élémentaires.

Autrement dit : chaque droite verticale $x = x_0$ ($a \le x_0 \le b$) coupe un domaine de type $y$ selon un segment (éventuellement réduit à un point), dont les extrémités dépendent continûment de $x_0$.
:::

::: ex lvl=1
1. **圆盘** $x^2 + y^2 \le R^2$：$y$-型，$a = -R$，$b = R$，$\varphi_1(x) = -\sqrt{R^2 - x^2}$，$\varphi_2(x) = \sqrt{R^2 - x^2}$；由对称性也是 $x$-型。
2. **三角形** $\{0 \le y \le x \le 1\}$：$y$-型（$0 \le x \le 1$，$0 \le y \le x$），也是 $x$-型（$0 \le y \le 1$，$y \le x \le 1$）。
3. **非例：圆环** $1 \le x^2 + y^2 \le 4$ 不是 $y$-型：竖直线 $x = 0$ 截出两段 $[-2, -1] \cup [1, 2]$。但它是四个「四分之一圆环」的并，例如 $\{1 \le x^2 + y^2 \le 4,\ x \ge 0,\ y \ge 0\}$ 是 $y$-型：$0 \le x \le 2$，$\varphi_1(x) = \sqrt{1 - x^2}$（$x \le 1$）或 $0$（$x \ge 1$），$\varphi_2(x) = \sqrt{4 - x^2}$，$\varphi_1$ 在 $x = 1$ 处两段都取 $0$，连续。四块两两只交于线段（零容度集），由 {@c11-additivite} 第 4 条，圆环上的积分是四块上的积分之和。
:::

::: thm id=fubini-domaine zh="基本区域上的 Fubini 定理" en="Fubini's theorem on an elementary domain" fr="Théorème de Fubini sur un domaine élémentaire" ru="Теорема Фубини для элементарной области" lvl=2
若 $f$ 在 $y$-型基本区域 $D$ 上连续，则 $D$ 是 Jordan 可测的，且
$$\iint_Df = \int_a^b\Big(\int_{\varphi_1(x)}^{\varphi_2(x)}f(x, y)\,\dd y\Big)\dd x.$$
对 $x$-型基本区域，交换 $x$ 与 $y$ 的角色：$\iint_Df = \int_c^d\big(\int_{\psi_1(y)}^{\psi_2(y)}f(x, y)\,\dd x\big)\dd y$。
:::

::: fr
Si $f$ est continue sur un domaine élémentaire $D$ de type $y$, alors $D$ est quarrable et
$$\iint_Df = \int_a^b\Big(\int_{\varphi_1(x)}^{\varphi_2(x)}f(x, y)\,\dd y\Big)\dd x.$$
Pour un domaine de type $x$, en échangeant les rôles de $x$ et $y$ : $\iint_Df = \int_c^d\big(\int_{\psi_1(y)}^{\psi_2(y)}f(x, y)\,\dd x\big)\dd y$.
:::

::: sketch
▷ 思路：把 $f$ 补零到矩形 $P$ 上，然后用 {@c11-fubini-riemann}。需要验证两件事：(i) $D$ 是 Jordan 可测的，从而 $\tilde f$ 在 $P$ 上可积；(ii) 每个竖直截口 $y \mapsto \tilde f(x, y)$ 可积，其积分是 $\int_{\varphi_1(x)}^{\varphi_2(x)}f(x, y)\,\dd y$。

**第 1 步（$D$ 紧，放进矩形）**　$\varphi_1, \varphi_2$ 连续，所以 $D$ 是闭集；它们在 $[a, b]$ 上有界（{@image-compact}），所以 $D$ 有界。令 $c = \min\varphi_1$、$d = \max\varphi_2$、$P = [a, b] \times [c - 1, d + 1] \supset D$。

**第 2 步（$\partial D$ 是零容度集）**　集合 $\Omega = \{a < x < b,\ \varphi_1(x) < y < \varphi_2(x)\}$ 是开集（三个严格不等式中的函数都连续），且 $\Omega \subset D$，所以 $\Omega \subset \operatorname{int}D$。$D$ 闭，故
$$\partial D = D \setminus \operatorname{int}D \subset D \setminus \Omega \subset \Gamma_{\varphi_1} \cup \Gamma_{\varphi_2} \cup \big(\{a\} \times [c, d]\big) \cup \big(\{b\} \times [c, d]\big).$$
两个图像是零容度集（{@c11-graphe-negligeable}），两条竖直线段是退化矩形；有限并仍是零容度集。所以 $D$ 是 Jordan 可测的，$\tilde f$ 在 $P$ 上可积（{@def-jordan}）。

**第 3 步（截口）**　固定 $x \in [a, b]$。函数 $y \mapsto \tilde f(x, y)$ 在 $[\varphi_1(x), \varphi_2(x)]$ 上等于 $f(x, y)$（连续），在其外为 $0$，所以它在 $[c - 1, d + 1]$ 上至多在两点 $\varphi_1(x)$、$\varphi_2(x)$ 不连续，可积（$n = 1$ 时的 {@c11-integrable-negligeable}，有限集是零容度集），并且由一元积分的 Chasles 关系
$$\int_{c-1}^{d+1}\tilde f(x, y)\,\dd y = \int_{\varphi_1(x)}^{\varphi_2(x)}f(x, y)\,\dd y.$$
边界情形 $\varphi_1(x) = \varphi_2(x)$：截口只在一点可能非零，两边都是 $0$。

**第 4 步（结论）**　由 {@c11-fubini-riemann}（$A = [a, b]$，$B = [c - 1, d + 1]$），
$$\iint_Df = \int_P\tilde f = \int_a^b\Big(\int_{c-1}^{d+1}\tilde f(x, y)\,\dd y\Big)\dd x = \int_a^b\Big(\int_{\varphi_1(x)}^{\varphi_2(x)}f(x, y)\,\dd y\Big)\dd x.$$
$x$-型的情形：对 $g(y, x) = f(x, y)$ 用上面的论证（交换坐标保持矩形与体积，同 {@c11-fubini-riemann} 第 5 步）。
:::

::: fr
▷ Méthode : on prolonge $f$ par $0$ à un pavé $P$, puis on applique le {@fr:c11-fubini-riemann}. Il faut vérifier deux choses : (i) $D$ est quarrable, de sorte que $\tilde f$ est intégrable sur $P$ ; (ii) chaque section verticale $y \mapsto \tilde f(x, y)$ est intégrable, d'intégrale $\int_{\varphi_1(x)}^{\varphi_2(x)}f(x, y)\,\dd y$.

**Étape 1 ($D$ est compact ; on le place dans un pavé)**　$\varphi_1$ et $\varphi_2$ sont continues, donc $D$ est fermé ; elles sont bornées sur $[a, b]$ ({@fr:image-compact}), donc $D$ est borné. Posons $c = \min\varphi_1$, $d = \max\varphi_2$ et $P = [a, b] \times [c - 1, d + 1] \supset D$.

**Étape 2 ($\partial D$ est de contenu nul)**　L'ensemble $\Omega = \{a < x < b,\ \varphi_1(x) < y < \varphi_2(x)\}$ est ouvert (les fonctions intervenant dans les trois inégalités strictes sont continues) et $\Omega \subset D$, donc $\Omega \subset \operatorname{int}D$. Comme $D$ est fermé,
$$\partial D = D \setminus \operatorname{int}D \subset D \setminus \Omega \subset \Gamma_{\varphi_1} \cup \Gamma_{\varphi_2} \cup \big(\{a\} \times [c, d]\big) \cup \big(\{b\} \times [c, d]\big).$$
Les deux graphes sont de contenu nul ({@fr:c11-graphe-negligeable}) et les deux segments verticaux sont des pavés dégénérés ; une réunion finie de parties de contenu nul est de contenu nul. Donc $D$ est quarrable et $\tilde f$ est intégrable sur $P$ ({@fr:def-jordan}).

**Étape 3 (sections)**　Fixons $x \in [a, b]$. La fonction $y \mapsto \tilde f(x, y)$ vaut $f(x, y)$ (continue) sur $[\varphi_1(x), \varphi_2(x)]$ et $0$ ailleurs ; elle est donc continue sur $[c - 1, d + 1]$ sauf peut-être aux deux points $\varphi_1(x)$ et $\varphi_2(x)$, donc intégrable ({@fr:c11-integrable-negligeable} avec $n = 1$ : un ensemble fini est de contenu nul), et par la relation de Chasles en dimension 1,
$$\int_{c-1}^{d+1}\tilde f(x, y)\,\dd y = \int_{\varphi_1(x)}^{\varphi_2(x)}f(x, y)\,\dd y.$$
Cas limite $\varphi_1(x) = \varphi_2(x)$ : la section n'est éventuellement non nulle qu'en un point et les deux membres sont nuls.

**Étape 4 (conclusion)**　D'après le {@fr:c11-fubini-riemann} ($A = [a, b]$, $B = [c - 1, d + 1]$),
$$\iint_Df = \int_P\tilde f = \int_a^b\Big(\int_{c-1}^{d+1}\tilde f(x, y)\,\dd y\Big)\dd x = \int_a^b\Big(\int_{\varphi_1(x)}^{\varphi_2(x)}f(x, y)\,\dd y\Big)\dd x.$$
Pour le type $x$ : on applique ce raisonnement à $g(y, x) = f(x, y)$ (l'échange des coordonnées conserve les pavés et les volumes, comme à l'étape 5 du {@fr:c11-fubini-riemann}).
:::

::: rem
**三维情形。** 设 $\Delta \subset \R^2$ 是紧的 Jordan 可测集（例如基本区域），$\psi_1 \le \psi_2$ 在 $\Delta$ 上连续，$D = \{(x, y, z) : (x, y) \in \Delta,\ \psi_1(x, y) \le z \le \psi_2(x, y)\}$。则对 $D$ 上的连续函数 $f$，
$$\iiint_Df = \iint_\Delta\Big(\int_{\psi_1(x,y)}^{\psi_2(x,y)}f(x, y, z)\,\dd z\Big)\dd x\,\dd y.$$
证明与上面相同：$\partial D$ 包含于两个图像（{@c11-graphe-negligeable}，$K = \Delta$）与「侧面」$\partial\Delta \times [\min\psi_1, \max\psi_2]$ 之并，后者被 $R_k \times [\min\psi_1, \max\psi_2]$ 覆盖（$R_k$ 是覆盖 $\partial\Delta$ 的矩形），也是零容度集；然后对 $A$ = $(x, y)$ 的矩形、$B$ = $z$ 的区间用 {@c11-fubini-riemann}。
:::

::: ex id=ex-triangle lvl=1
$D = \{(x, y) : 0 \le y \le x \le 1\}$。令 $g(x) = \frac{\sin x}{x}$（$x \ne 0$），$g(0) = 1$；由 $\lim_{x\to0}\frac{\sin x}x = 1$，$g$ 在 $[0, 1]$ 上连续，所以 $(x, y) \mapsto g(x)$ 在 $D$ 上连续。$D$ 是 $y$-型（$a = 0$，$b = 1$，$\varphi_1 = 0$，$\varphi_2(x) = x$），由 {@fubini-domaine}：
$$\iint_D\frac{\sin x}{x}\,\dd x\,\dd y = \int_0^1\Big(\int_0^x\frac{\sin x}{x}\,\dd y\Big)\dd x = \int_0^1 x\cdot\frac{\sin x}{x}\,\dd x = \int_0^1\sin x\,\dd x = 1 - \cos 1.$$
（内层积分中被积函数不依赖于 $y$，积分等于它乘以区间长度 $x$；$x = 0$ 时两边都是 $0$。）若按 $x$ 先积分（把 $D$ 写成 $x$-型：$0 \le y \le 1$，$y \le x \le 1$），内层积分 $\int_y^1\frac{\sin x}{x}\,\dd x$ 没有初等原函数。选择积分顺序是一种技巧。
:::

::: ex id=c11-ex-disque lvl=1
**圆盘的面积。** 由 {@fubini-domaine}，用圆盘的 $y$-型描述，
$$\operatorname{aire}(D) = \int_{-R}^R\Big(\int_{-\sqrt{R^2 - x^2}}^{\sqrt{R^2 - x^2}}\dd y\Big)\dd x = \int_{-R}^R2\sqrt{R^2 - x^2}\,\dd x.$$
代换 $x = R\sin t$：$t \mapsto R\sin t$ 是 $[-\frac\pi2, \frac\pi2] \to [-R, R]$ 的 $\Cc^1$ 双射，$\dd x = R\cos t\,\dd t$，且 $\sqrt{R^2 - R^2\sin^2t} = R\abs{\cos t} = R\cos t$（在该区间上 $\cos t \ge 0$）。于是
$$\int_{-R}^R2\sqrt{R^2 - x^2}\,\dd x = 2R^2\int_{-\pi/2}^{\pi/2}\cos^2t\,\dd t = R^2\int_{-\pi/2}^{\pi/2}(1 + \cos2t)\,\dd t = R^2\big(\pi + 0\big) = \pi R^2.$$
第 3 节会用极坐标再算一次，计算简单得多。
:::

::: q
计算 $\displaystyle\int_0^1\Big(\int_x^1\e^{y^2}\,\dd y\Big)\dd x$。
:::

::: ans
内层积分没有初等原函数，所以交换次序。积分区域 $D = \{0 \le x \le 1,\ x \le y \le 1\}$ 是 $y$-型；画图可见它也是 $x$-型：$D = \{0 \le y \le 1,\ 0 \le x \le y\}$。由 {@fubini-domaine} 的两个公式，
$$\int_0^1\Big(\int_x^1\e^{y^2}\,\dd y\Big)\dd x = \iint_D\e^{y^2} = \int_0^1\Big(\int_0^y\e^{y^2}\,\dd x\Big)\dd y = \int_0^1y\,\e^{y^2}\,\dd y = \Big[\tfrac12\e^{y^2}\Big]_0^1 = \frac{\e - 1}{2}.$$
:::

<!-- APPEND -->
