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
$$\begin{aligned}
S^+(f, \sigma_N) &= \frac1{N^4}\Big(\sum_{i=1}^N i\Big)\Big(\sum_{j=1}^N j\Big) = \frac{(N+1)^2}{4N^2},\\
S^-(f, \sigma_N) &= \frac1{N^4}\Big(\sum_{i=1}^{N} (i-1)\Big)^2 = \frac{(N-1)^2}{4N^2}.
\end{aligned}$$
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

## 变量替换

一元积分的换元公式 $\int_{\varphi(a)}^{\varphi(b)}f = \int_a^b f(\varphi(t))\varphi'(t)\,\dd t$ 中，$\varphi'(t)$ 是「长度伸缩因子」。在 $\R^n$ 中，$\Cc^1$ 映射 $\Phi$ 在一点附近近似于线性映射 $\dd\Phi(x)$，而线性映射把体积乘以 $\abs{\det}$。所以应当有 $\dd y = \abs{\det J_\Phi(x)}\,\dd x$。本节先说明 $\Cc^1$ 映射不会把零容度集变大，再给出变量替换公式，最后处理极坐标、球坐标这些「几乎是」微分同胚的映射。

::: lem id=c11-image-negligeable zh="$\Cc^1$ 映射保持零容度" en="C¹ maps preserve content zero" fr="L'image d'une partie de contenu nul par une application C¹" ru="Образ множества меры нуль при C¹-отображении" lvl=2
设 $U \subset \R^n$ 是开集，$\Phi : U \to \R^n$ 是 $\Cc^1$ 的。

1. （定量形式）若 $K \subset U$ 是凸集，$L = \sup_{x \in K}\norm{\dd\Phi(x)} < +\infty$（对 $\norm\cdot_\infty$ 的算子范数），则对任意矩形 $R \subset K$ 和 $\eps > 0$，$\Phi(R)$ 可以被有限个立方体覆盖，其总体积 $\le L^n\operatorname{vol}(R) + \eps$。
2. 若 $E \subset U$ 是紧的零容度集，则 $\Phi(E)$ 是零容度集。
:::

::: fr
Soient $U \subset \R^n$ un ouvert et $\Phi : U \to \R^n$ de classe $\Cc^1$.

1. (Forme quantitative) Si $K \subset U$ est convexe et $L = \sup_{x \in K}\norm{\dd\Phi(x)} < +\infty$ (norme d'opérateur associée à $\norm\cdot_\infty$), alors pour tout pavé $R \subset K$ et tout $\eps > 0$, $\Phi(R)$ peut être recouvert par un nombre fini de cubes de volume total $\le L^n\operatorname{vol}(R) + \eps$.
2. Si $E \subset U$ est compact et de contenu nul, alors $\Phi(E)$ est de contenu nul.
:::

::: sketch
▷ 思路：$\Phi$ 在凸集上是 $L$-Lipschitz 的，直径为 $h$ 的小块的像装得进边长 $Lh$ 的立方体；把 $R$ 切成直径 $\le h$ 的小块，体积最多放大 $L^n$ 倍。

**第 1 步（Lipschitz）**　由有限增量不等式 {@accroissements-finis}（$K$ 凸，线段在 $K$ 中），对 $x, x' \in K$，$\norm{\Phi(x) - \Phi(x')}_\infty \le L\norm{x - x'}_\infty$。

**第 2 步（小直径的集合装进小立方体）**　若非空集 $S \subset \R^n$ 的 $\norm\cdot_\infty$-直径 $\le d$，令 $s_i = \inf\{y_i : y \in S\}$，则 $S \subset \prod_i[s_i, s_i + d]$，一个边长为 $d$ 的立方体。

**第 3 步（定量形式）**　设 $R = \prod_i[\alpha_i, \beta_i] \subset K$，$h > 0$。把 $[\alpha_i, \beta_i]$ 分成 $N_i = E\big((\beta_i - \alpha_i)/h\big) + 1$ 等份，每份长 $\le h$。每个小块 $C$ 的直径 $\le h$，由第 1 步 $\Phi(C)$ 的直径 $\le Lh$，由第 2 步它包含于一个体积为 $(Lh)^n$ 的立方体。小块共 $\prod_iN_i \le \prod_i\big(\frac{\beta_i - \alpha_i}{h} + 1\big)$ 个，所以这些立方体的总体积
$$\le L^nh^n\prod_i\Big(\frac{\beta_i - \alpha_i}{h} + 1\Big) = L^n\prod_i(\beta_i - \alpha_i + h) \xrightarrow[h\to0]{} L^n\operatorname{vol}(R),$$
取 $h$ 足够小即得 $\le L^n\operatorname{vol}(R) + \eps$。

**第 4 步（第 2 条）**　对每个 $x \in E$ 取闭立方体 $C_x$（以 $x$ 为中心）使 $C_x \subset U$。$E$ 紧，被有限个 $\operatorname{int}C_{x_1}, \dots, \operatorname{int}C_{x_J}$ 覆盖。$C_j = C_{x_j}$ 是 $U$ 中的凸紧集，$L_j = \sup_{C_j}\norm{\dd\Phi} < +\infty$（连续函数在紧集上有界）。设 $\eta > 0$，取覆盖 $E$ 的矩形 $R_1, \dots, R_m$，总体积 $< \eta$。则 $E \cap C_j \subset \bigcup_k(R_k \cap C_j)$，每个 $R_k \cap C_j$ 是 $C_j$ 中的矩形（或空集）。由第 3 步，$\Phi(E \cap C_j)$ 被总体积 $\le L_j^n\eta + \eta$ 的立方体覆盖。对 $j$ 求和，$\Phi(E)$ 被总体积 $\le \eta\sum_j(L_j^n + 1)$ 的立方体覆盖；$\eta$ 任意，所以 $\Phi(E)$ 是零容度集。
:::

::: fr
▷ Méthode : $\Phi$ est $L$-lipschitzienne sur le convexe $K$ ; l'image d'un morceau de diamètre $h$ tient dans un cube de côté $Lh$. On découpe $R$ en morceaux de diamètre $\le h$ : le volume est multiplié par au plus $L^n$.

**Étape 1 (caractère lipschitzien)**　D'après l'{@fr:accroissements-finis} ($K$ convexe, les segments sont dans $K$), pour $x, x' \in K$, $\norm{\Phi(x) - \Phi(x')}_\infty \le L\norm{x - x'}_\infty$.

**Étape 2 (un ensemble de petit diamètre tient dans un petit cube)**　Si $S \subset \R^n$ non vide est de diamètre $\le d$ pour $\norm\cdot_\infty$, posons $s_i = \inf\{y_i : y \in S\}$ ; alors $S \subset \prod_i[s_i, s_i + d]$, cube de côté $d$.

**Étape 3 (forme quantitative)**　Soient $R = \prod_i[\alpha_i, \beta_i] \subset K$ et $h > 0$. On découpe $[\alpha_i, \beta_i]$ en $N_i = E\big((\beta_i - \alpha_i)/h\big) + 1$ parts égales, de longueur $\le h$. Chaque morceau $C$ est de diamètre $\le h$, donc $\Phi(C)$ est de diamètre $\le Lh$ (étape 1) et contenu dans un cube de volume $(Lh)^n$ (étape 2). Il y a $\prod_iN_i \le \prod_i\big(\frac{\beta_i - \alpha_i}{h} + 1\big)$ morceaux, donc le volume total de ces cubes est
$$\le L^nh^n\prod_i\Big(\frac{\beta_i - \alpha_i}{h} + 1\Big) = L^n\prod_i(\beta_i - \alpha_i + h) \xrightarrow[h\to0]{} L^n\operatorname{vol}(R),$$
et pour $h$ assez petit il est $\le L^n\operatorname{vol}(R) + \eps$.

**Étape 4 (point 2)**　Pour tout $x \in E$, choisissons un cube fermé $C_x$ centré en $x$ tel que $C_x \subset U$. Le compact $E$ est recouvert par un nombre fini d'intérieurs $\operatorname{int}C_{x_1}, \dots, \operatorname{int}C_{x_J}$. Chaque $C_j = C_{x_j}$ est un compact convexe contenu dans $U$ et $L_j = \sup_{C_j}\norm{\dd\Phi} < +\infty$ (fonction continue sur un compact). Soit $\eta > 0$ et soient $R_1, \dots, R_m$ des pavés recouvrant $E$, de volume total $< \eta$. Alors $E \cap C_j \subset \bigcup_k(R_k \cap C_j)$ et chaque $R_k \cap C_j$ est un pavé de $C_j$ (ou est vide). D'après l'étape 3, $\Phi(E \cap C_j)$ est recouvert par des cubes de volume total $\le L_j^n\eta + \eta$. En sommant sur $j$, $\Phi(E)$ est recouvert par des cubes de volume total $\le \eta\sum_j(L_j^n + 1)$ ; $\eta$ étant arbitraire, $\Phi(E)$ est de contenu nul.
:::

::: thm id=changement-variables zh="变量替换公式" en="Change of variables formula" fr="Formule du changement de variables" ru="Формула замены переменных в кратном интеграле" lvl=2
设 $\Phi : U \to V$ 是 $\R^n$ 开集之间的 $\Cc^1$ 微分同胚（{@def-diffeo}），$D \subset U$ 是紧的 Jordan 可测集，$f$ 在 $\Phi(D)$ 上连续。则 $\Phi(D)$ 是紧的 Jordan 可测集，且
$$\int_{\Phi(D)}f(y)\,\dd y = \int_Df(\Phi(x))\,\abs{\det J_\Phi(x)}\,\dd x.$$
:::

::: fr
Soient $\Phi : U \to V$ un $\Cc^1$-difféomorphisme entre deux ouverts de $\R^n$ ({@fr:def-diffeo}), $D \subset U$ un compact mesurable au sens de Jordan et $f$ continue sur $\Phi(D)$. Alors $\Phi(D)$ est un compact mesurable au sens de Jordan et
$$\int_{\Phi(D)}f(y)\,\dd y = \int_Df(\Phi(x))\,\abs{\det J_\Phi(x)}\,\dd x.$$
:::

::: sketch
▷ 思路：线性映射 $A$ 把体积乘以 $\abs{\det A}$；$\Cc^1$ 映射在小立方体上近似于它的微分 $\dd\Phi(c)$，所以小立方体 $Q$ 的像的体积约为 $\abs{\det J_\Phi(c)}\operatorname{vol}(Q)$；把 $D$ 切成小立方体求和，得到右边积分的近似和。先对 $f \ge 0$ 证明「$\le$」，再把同一个不等式用于 $\Phi^{-1}$ 得到「$\ge$」。严格的证明见 Spivak, *Calculus on Manifolds*，定理 3-13，或 Зорич 第二卷第 11 章。

**第 0 步（左边有意义）**　$\Phi(D)$ 是紧集（{@image-compact}）。$\Phi$ 是开集之间的同胚，所以 $\Phi(\operatorname{int}D)$ 是包含于 $\Phi(D)$ 的开集，$\Phi(\operatorname{int}D) \subset \operatorname{int}\Phi(D)$；对 $\Phi^{-1}$ 同样论证得反向包含，故 $\Phi(\operatorname{int}D) = \operatorname{int}\Phi(D)$。$D$、$\Phi(D)$ 都是闭集且 $\Phi$ 是单射，所以 $\Phi(\partial D) = \Phi(D) \setminus \Phi(\operatorname{int}D) = \partial\Phi(D)$。$\partial D$ 是紧的零容度集，由 {@c11-image-negligeable}，$\partial\Phi(D)$ 是零容度集。

**第 1 步（线性映射作用于矩形）**　设 $A \in \GL_n(\R)$，$C$ 是矩形，要证 $\operatorname{vol}(A(C)) = \abs{\det A}\operatorname{vol}(C)$（$A(C)$ 由第 0 步可测）。先看初等矩阵：

- 交换两个坐标：$A(C)$ 是交换了两条边的矩形，体积不变，$\abs{\det A} = 1$。
- 第 $i$ 个坐标乘以 $\lambda \ne 0$：$A(C)$ 是第 $i$ 条边长变为 $\abs\lambda(b_i - a_i)$ 的矩形，$\abs{\det A} = \abs\lambda$。
- 剪切 $y_1 = x_1 + cx_2$（其余坐标不变），$\det A = 1$：$A(C) = \{y : y_i \in [a_i, b_i]\ (i \ge 2),\ a_1 + cy_2 \le y_1 \le b_1 + cy_2\}$。对 $\mathbf 1_{A(C)}$ 用 {@c11-fubini-riemann}，内层对 $y_1$ 积分：$y' = (y_2, \dots, y_n) \in C' = \prod_{i \ge 2}[a_i, b_i]$ 时截口是长 $b_1 - a_1$ 的区间，否则是空集。于是 $\operatorname{vol}(A(C)) = (b_1 - a_1)\operatorname{vol}(C') = \operatorname{vol}(C)$。

一般的剪切 $x_i \mapsto x_i + cx_j$ 由上面的剪切与坐标交换复合而成；由 Gauss–Jordan 消元，每个可逆矩阵都是初等矩阵的乘积。

**第 2 步（线性映射作用于 Jordan 集）**　设 $E$ 是初等矩阵，$D$ Jordan 可测。取包含 $D$ 的矩形的一个分割，令 $I$ 为包含于 $D$ 的小矩形之并，$O$ 为与 $D$ 相交的小矩形之并。与 $D$ 相交但不包含于 $D$ 的小矩形（连通）一定与 $\partial D$ 相交，所以由 {@c11-recouvrement}，可以使 $\operatorname{vol}(O) - \operatorname{vol}(I) \le \eps$。小矩形两两只交于面，它们在 $E$ 下的像两两只交于面的像（零容度集），由第 1 步与 {@c11-additivite} 第 4 条，$\operatorname{vol}(E(I)) = \abs{\det E}\operatorname{vol}(I)$，$\operatorname{vol}(E(O)) = \abs{\det E}\operatorname{vol}(O)$。由 $E(I) \subset E(D) \subset E(O)$ 与 {@c11-additivite} 第 6 条夹逼，$\operatorname{vol}(E(D)) = \abs{\det E}\operatorname{vol}(D)$（常规的逼近论证）。对 $A = E_1\cdots E_k$ 逐个使用，并用 $\det$ 的乘法性：$\operatorname{vol}(A(D)) = \abs{\det A}\operatorname{vol}(D)$。平移显然保持体积。

**第 3 步（局部估计）**　取 $r > 0$ 使 $K = \{x : d_\infty(x, D) \le r\} \subset U$（$D$ 紧、$U$ 开），$K$ 紧。$x \mapsto J_\Phi(x)$ 在 $K$ 上一致连续，$x \mapsto J_\Phi(x)^{-1}$ 在 $K$ 上连续、有界，记 $\norm{J_\Phi(x)^{-1}} \le C$。设 $\eps \in ]0, 1]$，取 $\delta \in ]0, r]$ 使 $x, x' \in K$、$\norm{x - x'}_\infty \le \delta$ 时 $\norm{J_\Phi(x) - J_\Phi(x')} \le \eps/C$。设 $Q \subset K$ 是中心为 $c$、边长 $h \le \delta$ 的闭立方体。令 $\psi(y) = J_\Phi(c)^{-1}\big(\Phi(y) - \Phi(c)\big) - (y - c)$，则在 $Q$ 上
$$\norm{\dd\psi(y)} = \norm{J_\Phi(c)^{-1}\big(J_\Phi(y) - J_\Phi(c)\big)} \le C\cdot\frac\eps C = \eps,$$
由 {@accroissements-finis}，$\norm{\psi(y)}_\infty = \norm{\psi(y) - \psi(c)}_\infty \le \eps\norm{y - c}_\infty \le \frac{\eps h}2$。于是 $J_\Phi(c)^{-1}\big(\Phi(y) - \Phi(c)\big) \in [-\frac{(1+\eps)h}2, \frac{(1+\eps)h}2]^n =: Q_\eps$，即 $\Phi(Q) \subset \Phi(c) + J_\Phi(c)(Q_\eps)$。由第 2 步与 {@c11-additivite} 第 6 条，
$$\operatorname{vol}(\Phi(Q)) \le \abs{\det J_\Phi(c)}\,(1 + \eps)^nh^n = (1 + \eps)^n\abs{\det J_\Phi(c)}\operatorname{vol}(Q).$$

**第 4 步（$f \ge 0$ 时的「$\le$」）**　设 $f \ge 0$，令 $g = (f \circ \Phi)\abs{\det J_\Phi}$（$D$ 上连续，$\ge 0$）。取边长 $h \le \delta$ 的立方体网格，$Q_1, \dots, Q_N$ 为与 $D$ 相交的那些（它们包含于 $K$），中心为 $c_j$。$\Phi(D \cap Q_j)$ 覆盖 $\Phi(D)$ 且两两只交于面的像，由 {@c11-additivite} 第 4、3、6 条与第 3 步，
$$\begin{aligned}
\int_{\Phi(D)}f &= \sum_j\int_{\Phi(D \cap Q_j)}f \le \sum_j\sup_{D \cap Q_j}(f \circ \Phi)\operatorname{vol}(\Phi(Q_j))\\
&\le (1 + \eps)^n\sum_j\sup_{D \cap Q_j}(f \circ \Phi)\abs{\det J_\Phi(c_j)}\operatorname{vol}(Q_j).
\end{aligned}$$
把右边的和分成两部分（常规估计）：(α) $Q_j \subset D$ 的项：由 $f \circ \Phi$ 与 $\abs{\det J_\Phi}$ 的一致连续性，$\sup_{D \cap Q_j}(f \circ \Phi)\abs{\det J_\Phi(c_j)} \le g(x) + \omega(h)$ 对 $x \in Q_j$ 成立，$\omega(h) \to 0$，所以这部分 $\le \int_Dg + \omega(h)\operatorname{vol}(K)$；(β) 其余的 $Q_j$ 与 $\partial D$ 相交，它们的总体积 $V_h \to 0$（$\partial D$ 被总体积 $< \eta$ 的矩形 $R_k$ 覆盖，这些 $Q_j$ 都落在 $R_k$ 向外放大 $h$ 的矩形中），被积项有界。令 $h \to 0$，再令 $\eps \to 0$：
$$\int_{\Phi(D)}f \le \int_D(f \circ \Phi)\abs{\det J_\Phi}.$$

**第 5 步（反向不等式与结论）**　$\Phi^{-1} : V \to U$ 也是 $\Cc^1$ 微分同胚，$\Phi(D)$ 是紧的 Jordan 可测集。对 $\Phi^{-1}$、集合 $\Phi(D)$ 与函数 $g \ge 0$ 用第 4 步：
$$\begin{aligned}
\int_Dg &\le \int_{\Phi(D)}g(\Phi^{-1}(y))\abs{\det J_{\Phi^{-1}}(y)}\,\dd y\\
&= \int_{\Phi(D)}f(y)\,\abs{\det J_\Phi(\Phi^{-1}(y))}\,\abs{\det J_{\Phi^{-1}}(y)}\,\dd y = \int_{\Phi(D)}f,
\end{aligned}$$
因为由链式法则（{@chain-rule}，对 $\Phi \circ \Phi^{-1} = \Id$），$J_\Phi(\Phi^{-1}(y))\,J_{\Phi^{-1}}(y) = I_n$，行列式之积为 $1$。所以 $f \ge 0$ 时等式成立。一般的 $f$：令 $M = \max_{\Phi(D)}\abs f$，$f = (f + M) - M$，两项都 $\ge 0$，由线性得结论。
:::

::: fr
▷ Méthode : une application linéaire $A$ multiplie les volumes par $\abs{\det A}$ ; sur un petit cube, une application $\Cc^1$ est proche de sa différentielle $\dd\Phi(c)$, donc l'image d'un petit cube $Q$ a un volume voisin de $\abs{\det J_\Phi(c)}\operatorname{vol}(Q)$ ; en découpant $D$ en petits cubes et en sommant, on obtient une somme approchant l'intégrale de droite. On montre d'abord « $\le$ » pour $f \ge 0$, puis on applique la même inégalité à $\Phi^{-1}$ pour obtenir « $\ge$ ». Pour une démonstration complète, voir Spivak, *Calculus on Manifolds*, théorème 3-13, ou Зорич, tome II, chapitre 11.

**Étape 0 (le membre de gauche a un sens)**　$\Phi(D)$ est compact ({@fr:image-compact}). $\Phi$ est un homéomorphisme entre ouverts, donc $\Phi(\operatorname{int}D)$ est un ouvert contenu dans $\Phi(D)$ et $\Phi(\operatorname{int}D) \subset \operatorname{int}\Phi(D)$ ; le même argument pour $\Phi^{-1}$ donne l'inclusion réciproque, d'où $\Phi(\operatorname{int}D) = \operatorname{int}\Phi(D)$. Comme $D$ et $\Phi(D)$ sont fermés et $\Phi$ injective, $\Phi(\partial D) = \Phi(D) \setminus \Phi(\operatorname{int}D) = \partial\Phi(D)$. Or $\partial D$ est compact et de contenu nul ; d'après le {@fr:c11-image-negligeable}, $\partial\Phi(D)$ est de contenu nul.

**Étape 1 (application linéaire et pavés)**　Soient $A \in \GL_n(\R)$ et $C$ un pavé ; montrons $\operatorname{vol}(A(C)) = \abs{\det A}\operatorname{vol}(C)$ ($A(C)$ est mesurable par l'étape 0). Pour les matrices élémentaires :

- échange de deux coordonnées : $A(C)$ est le pavé dont deux côtés sont échangés, de même volume, et $\abs{\det A} = 1$ ;
- multiplication de la $i$-ème coordonnée par $\lambda \ne 0$ : $A(C)$ est un pavé dont le $i$-ème côté a pour longueur $\abs\lambda(b_i - a_i)$, et $\abs{\det A} = \abs\lambda$ ;
- transvection $y_1 = x_1 + cx_2$ (autres coordonnées inchangées), $\det A = 1$ : $A(C) = \{y : y_i \in [a_i, b_i]\ (i \ge 2),\ a_1 + cy_2 \le y_1 \le b_1 + cy_2\}$. On applique le {@fr:c11-fubini-riemann} à $\mathbf 1_{A(C)}$ avec intégration intérieure en $y_1$ : pour $y' = (y_2, \dots, y_n) \in C' = \prod_{i \ge 2}[a_i, b_i]$, la section est un intervalle de longueur $b_1 - a_1$, et elle est vide sinon. Donc $\operatorname{vol}(A(C)) = (b_1 - a_1)\operatorname{vol}(C') = \operatorname{vol}(C)$.

Une transvection générale $x_i \mapsto x_i + cx_j$ s'obtient en composant la précédente avec des échanges de coordonnées ; par l'algorithme de Gauss–Jordan, toute matrice inversible est un produit de matrices élémentaires.

**Étape 2 (application linéaire et parties mesurables)**　Soient $E$ une matrice élémentaire et $D$ mesurable au sens de Jordan. Prenons une subdivision d'un pavé contenant $D$ ; soient $I$ la réunion des sous-pavés contenus dans $D$ et $O$ la réunion de ceux qui rencontrent $D$. Un sous-pavé (connexe) qui rencontre $D$ sans y être contenu rencontre $\partial D$ ; d'après le {@fr:c11-recouvrement}, on peut donc obtenir $\operatorname{vol}(O) - \operatorname{vol}(I) \le \eps$. Les sous-pavés ne se rencontrent que selon des faces, et leurs images par $E$ selon des images de faces (de contenu nul) ; par l'étape 1 et le point 4 de la {@fr:c11-additivite}, $\operatorname{vol}(E(I)) = \abs{\det E}\operatorname{vol}(I)$ et $\operatorname{vol}(E(O)) = \abs{\det E}\operatorname{vol}(O)$. L'encadrement $E(I) \subset E(D) \subset E(O)$ et le point 6 de la {@fr:c11-additivite} donnent $\operatorname{vol}(E(D)) = \abs{\det E}\operatorname{vol}(D)$ (argument d'approximation usuel). En l'appliquant successivement à $A = E_1\cdots E_k$ et par multiplicativité du déterminant, $\operatorname{vol}(A(D)) = \abs{\det A}\operatorname{vol}(D)$. Les translations conservent évidemment le volume.

**Étape 3 (estimation locale)**　Soit $r > 0$ tel que $K = \{x : d_\infty(x, D) \le r\} \subset U$ ($D$ compact, $U$ ouvert) ; $K$ est compact. L'application $x \mapsto J_\Phi(x)$ est uniformément continue sur $K$ et $x \mapsto J_\Phi(x)^{-1}$ est continue, donc bornée sur $K$ : $\norm{J_\Phi(x)^{-1}} \le C$. Soit $\eps \in ]0, 1]$ ; choisissons $\delta \in ]0, r]$ tel que pour $x, x' \in K$, $\norm{x - x'}_\infty \le \delta$ entraîne $\norm{J_\Phi(x) - J_\Phi(x')} \le \eps/C$. Soit $Q \subset K$ un cube fermé de centre $c$ et de côté $h \le \delta$. Posons $\psi(y) = J_\Phi(c)^{-1}\big(\Phi(y) - \Phi(c)\big) - (y - c)$ ; sur $Q$,
$$\norm{\dd\psi(y)} = \norm{J_\Phi(c)^{-1}\big(J_\Phi(y) - J_\Phi(c)\big)} \le C\cdot\frac\eps C = \eps,$$
donc, par l'{@fr:accroissements-finis}, $\norm{\psi(y)}_\infty = \norm{\psi(y) - \psi(c)}_\infty \le \eps\norm{y - c}_\infty \le \frac{\eps h}2$. Ainsi $J_\Phi(c)^{-1}\big(\Phi(y) - \Phi(c)\big) \in [-\frac{(1+\eps)h}2, \frac{(1+\eps)h}2]^n =: Q_\eps$, c'est-à-dire $\Phi(Q) \subset \Phi(c) + J_\Phi(c)(Q_\eps)$. Par l'étape 2 et le point 6 de la {@fr:c11-additivite},
$$\operatorname{vol}(\Phi(Q)) \le \abs{\det J_\Phi(c)}\,(1 + \eps)^nh^n = (1 + \eps)^n\abs{\det J_\Phi(c)}\operatorname{vol}(Q).$$

**Étape 4 (« $\le$ » pour $f \ge 0$)**　Soit $f \ge 0$ et posons $g = (f \circ \Phi)\abs{\det J_\Phi}$ (continue et $\ge 0$ sur $D$). Considérons la grille de cubes de côté $h \le \delta$ et notons $Q_1, \dots, Q_N$ ceux qui rencontrent $D$ (ils sont contenus dans $K$), de centres $c_j$. Les $\Phi(D \cap Q_j)$ recouvrent $\Phi(D)$ et ne se rencontrent que selon des images de faces ; par les points 4, 3 et 6 de la {@fr:c11-additivite} et l'étape 3,
$$\begin{aligned}
\int_{\Phi(D)}f &= \sum_j\int_{\Phi(D \cap Q_j)}f \le \sum_j\sup_{D \cap Q_j}(f \circ \Phi)\operatorname{vol}(\Phi(Q_j))\\
&\le (1 + \eps)^n\sum_j\sup_{D \cap Q_j}(f \circ \Phi)\abs{\det J_\Phi(c_j)}\operatorname{vol}(Q_j).
\end{aligned}$$
On coupe la somme de droite en deux (estimation usuelle) : (α) termes avec $Q_j \subset D$ : par continuité uniforme de $f \circ \Phi$ et de $\abs{\det J_\Phi}$, $\sup_{D \cap Q_j}(f \circ \Phi)\abs{\det J_\Phi(c_j)} \le g(x) + \omega(h)$ pour $x \in Q_j$, avec $\omega(h) \to 0$, donc cette partie est $\le \int_Dg + \omega(h)\operatorname{vol}(K)$ ; (β) les autres $Q_j$ rencontrent $\partial D$ et leur volume total $V_h$ tend vers $0$ ($\partial D$ est recouvert par des pavés $R_k$ de volume total $< \eta$, et ces $Q_j$ sont contenus dans les $R_k$ agrandis de $h$), les termes étant bornés. En faisant tendre $h$ puis $\eps$ vers $0$ :
$$\int_{\Phi(D)}f \le \int_D(f \circ \Phi)\abs{\det J_\Phi}.$$

**Étape 5 (inégalité inverse et conclusion)**　$\Phi^{-1} : V \to U$ est aussi un $\Cc^1$-difféomorphisme et $\Phi(D)$ est un compact mesurable. L'étape 4 appliquée à $\Phi^{-1}$, à $\Phi(D)$ et à $g \ge 0$ donne
$$\begin{aligned}
\int_Dg &\le \int_{\Phi(D)}g(\Phi^{-1}(y))\abs{\det J_{\Phi^{-1}}(y)}\,\dd y\\
&= \int_{\Phi(D)}f(y)\,\abs{\det J_\Phi(\Phi^{-1}(y))}\,\abs{\det J_{\Phi^{-1}}(y)}\,\dd y = \int_{\Phi(D)}f,
\end{aligned}$$
car par la règle de la chaîne ({@fr:chain-rule}, appliquée à $\Phi \circ \Phi^{-1} = \Id$), $J_\Phi(\Phi^{-1}(y))\,J_{\Phi^{-1}}(y) = I_n$, dont le déterminant vaut $1$. D'où l'égalité pour $f \ge 0$. Pour $f$ quelconque, posons $M = \max_{\Phi(D)}\abs f$ et écrivons $f = (f + M) - M$, deux fonctions $\ge 0$ ; la linéarité conclut.
:::

::: rem
**绝对值与单射性。**

1. $\abs{\det J_\Phi}$ 中的绝对值很重要：重积分不涉及「方向」。一元情形 $\int_{\varphi(a)}^{\varphi(b)}f = \int_a^bf(\varphi)\varphi'$ 中没有绝对值，是因为一元积分 $\int_a^b$ 带有定向（$\int_b^a = -\int_a^b$）。例如 $\varphi(x) = -x$ 把 $[0, 1]$ 映成 $[-1, 0]$：定向公式给出 $\int_0^{-1}f = \int_0^1f(-x)\cdot(-1)\,\dd x$，两边都等于 $-\int_{-1}^0f$；重积分公式给出 $\int_{[-1,0]}f = \int_{[0,1]}f(-x)\abs{-1}\,\dd x$。两者一致。第 11.5 节的曲线积分和 Зорич 的微分形式理论会把定向的观点推广到高维。
2. **单射性不能去掉。** $\Phi(r, \theta) = (r\cos\theta, r\sin\theta)$ 在 $[0, 1] \times [0, 4\pi]$ 上把单位圆盘覆盖两次，$\iint r\,\dd r\,\dd\theta = 4\pi\cdot\frac12 = 2\pi$，是圆盘面积 $\pi$ 的两倍：不是单射时，右边计算的是「带重数的体积」。
:::

::: ex id=coord-polaires zh="极坐标、柱坐标、球坐标" lvl=1
1. **极坐标**：$\Phi(r, \theta) = (r\cos\theta, r\sin\theta)$，
   $$J_\Phi = \begin{pmatrix}\cos\theta & -r\sin\theta\\ \sin\theta & r\cos\theta\end{pmatrix},\qquad \det J_\Phi = r\cos^2\theta + r\sin^2\theta = r.$$
   记作 $\dd x\,\dd y = r\,\dd r\,\dd\theta$。$\Phi$ 是从 $]0, +\infty[ \times ]-\pi, \pi[$ 到 $\R^2 \setminus (\R_- \times \{0\})$ 的 $\Cc^\infty$ 微分同胚（{@polaires}）。
2. **柱坐标**：$\Phi(r, \theta, z) = (r\cos\theta, r\sin\theta, z)$，
   $$\det J_\Phi = \begin{vmatrix}\cos\theta & -r\sin\theta & 0\\ \sin\theta & r\cos\theta & 0\\ 0 & 0 & 1\end{vmatrix} = 1\cdot\begin{vmatrix}\cos\theta & -r\sin\theta\\ \sin\theta & r\cos\theta\end{vmatrix} = r\qquad\text{（按第三行展开）}.$$
3. **球坐标**：$\Psi(r, \varphi, \theta) = (r\sin\varphi\cos\theta, r\sin\varphi\sin\theta, r\cos\varphi)$，$\varphi \in [0, \pi]$ 是与 $z$ 轴的夹角，$\theta$ 是经度。
   $$\det J_\Psi = \begin{vmatrix}\sin\varphi\cos\theta & r\cos\varphi\cos\theta & -r\sin\varphi\sin\theta\\ \sin\varphi\sin\theta & r\cos\varphi\sin\theta & r\sin\varphi\cos\theta\\ \cos\varphi & -r\sin\varphi & 0\end{vmatrix}.$$
   按第三行展开：第 $(3,1)$ 个余子式 $= r^2\cos\varphi\sin\varphi\cos^2\theta + r^2\cos\varphi\sin\varphi\sin^2\theta = r^2\sin\varphi\cos\varphi$；第 $(3,2)$ 个余子式 $= r\sin^2\varphi\cos^2\theta + r\sin^2\varphi\sin^2\theta = r\sin^2\varphi$，带符号 $(-1)^{3+2} = -1$。于是
   $$\det J_\Psi = \cos\varphi\cdot r^2\sin\varphi\cos\varphi - (-r\sin\varphi)\cdot r\sin^2\varphi = r^2\sin\varphi(\cos^2\varphi + \sin^2\varphi) = r^2\sin\varphi.$$
   $\varphi \in [0, \pi]$ 时 $\sin\varphi \ge 0$，所以 $\abs{\det J_\Psi} = r^2\sin\varphi$，记作 $\dd x\,\dd y\,\dd z = r^2\sin\varphi\,\dd r\,\dd\varphi\,\dd\theta$。

这些映射在一个零容度集（例如极坐标中 $r = 0$ 的边、或 $\theta = \pm\pi$ 对应的半直线）上不是微分同胚，但零容度集不影响积分：先在去掉一个小邻域的紧集上用 {@changement-variables}，再令邻域缩小。下面的 {@c11-polaires-justif} 把这一点写成严格的命题。
:::

::: prop id=c11-polaires-justif zh="极坐标、球坐标下的积分公式" en="Integration in polar and spherical coordinates" fr="Intégration en coordonnées polaires et sphériques" ru="Интегрирование в полярных и сферических координатах" lvl=1
1. **极坐标。** 设 $0 \le r_1 < r_2$，$\theta_1 < \theta_2 \le \theta_1 + 2\pi$，$\Delta = [r_1, r_2] \times [\theta_1, \theta_2]$，$S = \Phi(\Delta)$（$\Phi$ 为极坐标映射）。则 $S$ 是紧的可求面积集，且对 $S$ 上的任意连续函数 $f$，
   $$\iint_Sf(x, y)\,\dd x\,\dd y = \int_{\theta_1}^{\theta_2}\Big(\int_{r_1}^{r_2}f(r\cos\theta, r\sin\theta)\,r\,\dd r\Big)\dd\theta.$$
2. **球坐标。** 设 $0 \le r_1 < r_2$，$0 \le \varphi_1 < \varphi_2 \le \pi$，$\theta_1 < \theta_2 \le \theta_1 + 2\pi$，$\Delta = [r_1, r_2] \times [\varphi_1, \varphi_2] \times [\theta_1, \theta_2]$。则 $\Psi(\Delta)$ 是紧的 Jordan 可测集，且对其上的连续函数 $f$，
   $$\iiint_{\Psi(\Delta)}f = \iiint_\Delta f(\Psi(r, \varphi, \theta))\,r^2\sin\varphi\,\dd r\,\dd\varphi\,\dd\theta.$$
3. **柱坐标**同理，$\Delta = [r_1, r_2] \times [\theta_1, \theta_2] \times [z_1, z_2]$，Jacobi 因子为 $r$。

右边的积分是矩形上连续函数的积分，由 {@fubini-pave} 可以按任意次序逐次计算。
:::

::: fr
1. **Coordonnées polaires.** Soient $0 \le r_1 < r_2$, $\theta_1 < \theta_2 \le \theta_1 + 2\pi$, $\Delta = [r_1, r_2] \times [\theta_1, \theta_2]$ et $S = \Phi(\Delta)$ ($\Phi$ l'application des coordonnées polaires). Alors $S$ est un compact quarrable et, pour toute fonction $f$ continue sur $S$,
   $$\iint_Sf(x, y)\,\dd x\,\dd y = \int_{\theta_1}^{\theta_2}\Big(\int_{r_1}^{r_2}f(r\cos\theta, r\sin\theta)\,r\,\dd r\Big)\dd\theta.$$
2. **Coordonnées sphériques.** Soient $0 \le r_1 < r_2$, $0 \le \varphi_1 < \varphi_2 \le \pi$, $\theta_1 < \theta_2 \le \theta_1 + 2\pi$ et $\Delta = [r_1, r_2] \times [\varphi_1, \varphi_2] \times [\theta_1, \theta_2]$. Alors $\Psi(\Delta)$ est un compact mesurable au sens de Jordan et, pour $f$ continue sur cet ensemble,
   $$\iiint_{\Psi(\Delta)}f = \iiint_\Delta f(\Psi(r, \varphi, \theta))\,r^2\sin\varphi\,\dd r\,\dd\varphi\,\dd\theta.$$
3. **Coordonnées cylindriques** : de même, avec $\Delta = [r_1, r_2] \times [\theta_1, \theta_2] \times [z_1, z_2]$ et le facteur jacobien $r$.

Les membres de droite sont des intégrales de fonctions continues sur des pavés ; d'après le {@fr:fubini-pave}, on peut les calculer par intégrations successives dans n'importe quel ordre.
:::

::: proof
▷ 思路：$\Phi$ 只在 $\Delta$ 的「边」上失去微分同胚的性质：$r = 0$ 处 Jacobi 行列式为 $0$；$\theta_2 - \theta_1 = 2\pi$ 时两条边 $\theta = \theta_1$、$\theta = \theta_2$ 被映到同一条半直线上。去掉宽度为 $\eta$ 的边带，在剩下的矩形 $\Delta_\eta$ 上用 {@changement-variables}，再令 $\eta \to 0$；去掉的部分及其像的面积都是 $O(\eta)$。下面写极坐标的情形。

**第 1 步（$S$ 可求面积）**　$S = \Phi(\Delta)$ 是紧集（{@image-compact}）。在 $\operatorname{int}\Delta = ]r_1, r_2[ \times ]\theta_1, \theta_2[$ 上 $r > 0$，$\det J_\Phi = r \ne 0$，由局部逆定理 {@inversion-locale}，每一点有开邻域被 $\Phi$ 微分同胚地映成开集，所以 $\Phi(\operatorname{int}\Delta)$ 是开集；它包含于 $S$，故包含于 $\operatorname{int}S$。于是
$$\partial S = S \setminus \operatorname{int}S \subset S \setminus \Phi(\operatorname{int}\Delta) \subset \Phi(\partial\Delta).$$
$\partial\Delta$ 是四条线段之并，是紧的零容度集；$\Phi$ 在 $\R^2$ 上是 $\Cc^1$ 的，由 {@c11-image-negligeable}，$\Phi(\partial\Delta)$ 是零容度集。所以 $S$ 可求面积。

**第 2 步（去掉边带）**　设 $0 < \eta < \min\big(r_2 - r_1, \frac{\theta_2 - \theta_1}2\big)$，令
$$\Delta_\eta = [r_1 + \eta, r_2] \times [\theta_1 + \eta, \theta_2 - \eta],\qquad U_\eta = \big]r_1 + \tfrac\eta2, +\infty\big[ \times \big]\theta_1 + \tfrac\eta2, \theta_2 - \tfrac\eta2\big[ \supset \Delta_\eta.$$
在开集 $U_\eta$ 上：$r > 0$，$\det J_\Phi = r > 0$；$\Phi$ 是单射——若 $\Phi(r, \theta) = \Phi(r', \theta')$，取欧氏范数得 $r = r'$，于是 $(\cos\theta, \sin\theta) = (\cos\theta', \sin\theta')$，$\theta - \theta' \in 2\pi\Z$，而 $\abs{\theta - \theta'} < \theta_2 - \theta_1 - \eta \le 2\pi - \eta < 2\pi$，故 $\theta = \theta'$。由整体逆定理 {@inversion-globale}，$\Phi : U_\eta \to \Phi(U_\eta)$ 是开集之间的 $\Cc^1$ 微分同胚。$\Delta_\eta$ 是紧的矩形，由 {@changement-variables}，
$$\iint_{\Phi(\Delta_\eta)}f = \iint_{\Delta_\eta}f(\Phi(r, \theta))\,r\,\dd r\,\dd\theta.$$

**第 3 步（右边：$\eta \to 0$）**　令 $g(r, \theta) = f(\Phi(r, \theta))\,r$，它在 $\Delta$ 上连续，$\abs g \le Mr_2$，其中 $M = \max_S\abs f$（{@image-compact}）。$\Delta \setminus \Delta_\eta$ 包含于三个矩形
$$B_1 = [r_1, r_1 + \eta] \times [\theta_1, \theta_2],\quad B_2 = [r_1, r_2] \times [\theta_1, \theta_1 + \eta],\quad B_3 = [r_1, r_2] \times [\theta_2 - \eta, \theta_2]$$
之并，总面积 $\eta\kappa$，$\kappa = (\theta_2 - \theta_1) + 2(r_2 - r_1)$。由 {@c11-additivite} 第 5 条，$\abs{\iint_\Delta g - \iint_{\Delta_\eta}g} \le Mr_2\,\eta\kappa \to 0$。

**第 4 步（左边：$\eta \to 0$）**　$S \setminus \Phi(\Delta_\eta) \subset \Phi(\Delta \setminus \Delta_\eta) \subset \Phi(B_1) \cup \Phi(B_2) \cup \Phi(B_3)$。在凸集 $K = [0, r_2] \times \R \supset \Delta$ 上，
$$\norm{\dd\Phi(r, \theta)} = \max\big(\abs{\cos\theta} + r\abs{\sin\theta},\ \abs{\sin\theta} + r\abs{\cos\theta}\big) \le 1 + r_2 =: L$$
（对 $\norm\cdot_\infty$ 的算子范数是各行绝对值之和的最大值）。由 {@c11-image-negligeable} 第 1 条，每个 $\Phi(B_i)$ 被总面积 $\le L^2\operatorname{vol}(B_i) + \eta$ 的正方形覆盖，所以 $S \setminus \Phi(\Delta_\eta)$ 被总面积 $\le (L^2\kappa + 3)\eta$ 的正方形覆盖。$\Phi(\Delta_\eta) \subset S$ 都可求面积，由 {@c11-additivite} 第 5 条，$\abs{\iint_Sf - \iint_{\Phi(\Delta_\eta)}f} \le M(L^2\kappa + 3)\eta \to 0$。

**结论**　由第 2–4 步，$\iint_Sf = \lim_{\eta\to0}\iint_{\Phi(\Delta_\eta)}f = \lim_{\eta\to0}\iint_{\Delta_\eta}g = \iint_\Delta g$，再由 {@fubini-pave} 写成累次积分。

**球坐标与柱坐标**　证明的结构不变，只需替换：$\Delta_\eta = [r_1 + \eta, r_2] \times [\varphi_1 + \eta, \varphi_2 - \eta] \times [\theta_1 + \eta, \theta_2 - \eta]$（$\eta < \min(r_2 - r_1, \frac{\varphi_2 - \varphi_1}2, \frac{\theta_2 - \theta_1}2)$），$U_\eta$ 为相应放宽 $\frac\eta2$ 的开矩形；在 $U_\eta$ 上 $r > 0$、$0 < \varphi < \pi$，故 $\det J_\Psi = r^2\sin\varphi > 0$；单射性：$r = \norm{\Psi}_2$，$\varphi = \arccos(z/r) \in ]0, \pi[$，再由 $(x, y) = r\sin\varphi\,(\cos\theta, \sin\theta)$ 与 $r\sin\varphi > 0$ 确定 $\cos\theta, \sin\theta$，从而像极坐标那样确定 $\theta$；去掉的边带是 5 个总体积 $O(\eta)$ 的矩形；Lipschitz 常数取 $L = 1 + 2r_2$（$J_\Psi$ 每行绝对值之和 $\le 1 + 2r$），面积因子 $L^2$ 换成体积因子 $L^3$。柱坐标与极坐标完全相同（$z$ 方向不需要去边带）。
:::

::: fr
▷ Méthode : $\Phi$ ne cesse d'être un difféomorphisme que sur les « bords » de $\Delta$ : en $r = 0$ le jacobien s'annule ; si $\theta_2 - \theta_1 = 2\pi$, les deux côtés $\theta = \theta_1$ et $\theta = \theta_2$ ont même image. On retire une bande de largeur $\eta$ le long des bords, on applique le {@fr:changement-variables} sur le pavé restant $\Delta_\eta$, puis on fait tendre $\eta$ vers $0$ ; les parties retirées et leurs images ont une aire $O(\eta)$. On rédige le cas polaire.

**Étape 1 ($S$ est quarrable)**　$S = \Phi(\Delta)$ est compact ({@fr:image-compact}). Sur $\operatorname{int}\Delta = ]r_1, r_2[ \times ]\theta_1, \theta_2[$, on a $r > 0$ et $\det J_\Phi = r \ne 0$ ; par le {@fr:inversion-locale}, chaque point possède un voisinage ouvert envoyé difféomorphiquement par $\Phi$ sur un ouvert, donc $\Phi(\operatorname{int}\Delta)$ est ouvert ; il est contenu dans $S$, donc dans $\operatorname{int}S$. Ainsi
$$\partial S = S \setminus \operatorname{int}S \subset S \setminus \Phi(\operatorname{int}\Delta) \subset \Phi(\partial\Delta).$$
$\partial\Delta$ est réunion de quatre segments : c'est un compact de contenu nul ; comme $\Phi$ est $\Cc^1$ sur $\R^2$, le {@fr:c11-image-negligeable} montre que $\Phi(\partial\Delta)$ est de contenu nul. Donc $S$ est quarrable.

**Étape 2 (on retire les bords)**　Soit $0 < \eta < \min\big(r_2 - r_1, \frac{\theta_2 - \theta_1}2\big)$ et posons
$$\Delta_\eta = [r_1 + \eta, r_2] \times [\theta_1 + \eta, \theta_2 - \eta],\qquad U_\eta = \big]r_1 + \tfrac\eta2, +\infty\big[ \times \big]\theta_1 + \tfrac\eta2, \theta_2 - \tfrac\eta2\big[ \supset \Delta_\eta.$$
Sur l'ouvert $U_\eta$ : $r > 0$, $\det J_\Phi = r > 0$, et $\Phi$ est injective — si $\Phi(r, \theta) = \Phi(r', \theta')$, la norme euclidienne donne $r = r'$, puis $(\cos\theta, \sin\theta) = (\cos\theta', \sin\theta')$, donc $\theta - \theta' \in 2\pi\Z$ ; or $\abs{\theta - \theta'} < \theta_2 - \theta_1 - \eta \le 2\pi - \eta < 2\pi$, donc $\theta = \theta'$. D'après le {@fr:inversion-globale}, $\Phi : U_\eta \to \Phi(U_\eta)$ est un $\Cc^1$-difféomorphisme entre ouverts. Comme $\Delta_\eta$ est un pavé compact, le {@fr:changement-variables} donne
$$\iint_{\Phi(\Delta_\eta)}f = \iint_{\Delta_\eta}f(\Phi(r, \theta))\,r\,\dd r\,\dd\theta.$$

**Étape 3 (membre de droite : $\eta \to 0$)**　Posons $g(r, \theta) = f(\Phi(r, \theta))\,r$, continue sur $\Delta$, avec $\abs g \le Mr_2$ où $M = \max_S\abs f$ ({@fr:image-compact}). $\Delta \setminus \Delta_\eta$ est contenu dans la réunion des trois pavés
$$B_1 = [r_1, r_1 + \eta] \times [\theta_1, \theta_2],\quad B_2 = [r_1, r_2] \times [\theta_1, \theta_1 + \eta],\quad B_3 = [r_1, r_2] \times [\theta_2 - \eta, \theta_2],$$
d'aire totale $\eta\kappa$ avec $\kappa = (\theta_2 - \theta_1) + 2(r_2 - r_1)$. Par le point 5 de la {@fr:c11-additivite}, $\abs{\iint_\Delta g - \iint_{\Delta_\eta}g} \le Mr_2\,\eta\kappa \to 0$.

**Étape 4 (membre de gauche : $\eta \to 0$)**　On a $S \setminus \Phi(\Delta_\eta) \subset \Phi(\Delta \setminus \Delta_\eta) \subset \Phi(B_1) \cup \Phi(B_2) \cup \Phi(B_3)$. Sur le convexe $K = [0, r_2] \times \R \supset \Delta$,
$$\norm{\dd\Phi(r, \theta)} = \max\big(\abs{\cos\theta} + r\abs{\sin\theta},\ \abs{\sin\theta} + r\abs{\cos\theta}\big) \le 1 + r_2 =: L$$
(la norme d'opérateur associée à $\norm\cdot_\infty$ est le maximum des sommes des valeurs absolues des lignes). D'après le point 1 du {@fr:c11-image-negligeable}, chaque $\Phi(B_i)$ est recouvert par des carrés d'aire totale $\le L^2\operatorname{vol}(B_i) + \eta$ ; donc $S \setminus \Phi(\Delta_\eta)$ est recouvert par des carrés d'aire totale $\le (L^2\kappa + 3)\eta$. Comme $\Phi(\Delta_\eta) \subset S$ sont quarrables, le point 5 de la {@fr:c11-additivite} donne $\abs{\iint_Sf - \iint_{\Phi(\Delta_\eta)}f} \le M(L^2\kappa + 3)\eta \to 0$.

**Conclusion**　D'après les étapes 2 à 4, $\iint_Sf = \lim_{\eta\to0}\iint_{\Phi(\Delta_\eta)}f = \lim_{\eta\to0}\iint_{\Delta_\eta}g = \iint_\Delta g$, que le {@fr:fubini-pave} permet d'écrire comme intégrale itérée.

**Coordonnées sphériques et cylindriques**　La structure est la même ; il suffit de remplacer : $\Delta_\eta = [r_1 + \eta, r_2] \times [\varphi_1 + \eta, \varphi_2 - \eta] \times [\theta_1 + \eta, \theta_2 - \eta]$ (avec $\eta < \min(r_2 - r_1, \frac{\varphi_2 - \varphi_1}2, \frac{\theta_2 - \theta_1}2)$), $U_\eta$ le pavé ouvert élargi de $\frac\eta2$ correspondant ; sur $U_\eta$, $r > 0$ et $0 < \varphi < \pi$, donc $\det J_\Psi = r^2\sin\varphi > 0$ ; injectivité : $r = \norm{\Psi}_2$, $\varphi = \arccos(z/r) \in ]0, \pi[$, puis $(x, y) = r\sin\varphi\,(\cos\theta, \sin\theta)$ avec $r\sin\varphi > 0$ détermine $\cos\theta$ et $\sin\theta$, donc $\theta$ comme dans le cas polaire ; les bandes retirées sont 5 pavés de volume total $O(\eta)$ ; on prend la constante de Lipschitz $L = 1 + 2r_2$ (chaque ligne de $J_\Psi$ a une somme des valeurs absolues $\le 1 + 2r$) et le facteur d'aire $L^2$ devient le facteur de volume $L^3$. Le cas cylindrique est identique au cas polaire (aucune bande à retirer dans la direction $z$).
:::

::: ex lvl=1
半径为 $R$ 的球的体积。先验证 $\overline B(0, R) = \Psi(\Delta)$，$\Delta = [0, R] \times [0, \pi] \times [0, 2\pi]$：一方面 $\norm{\Psi(r, \varphi, \theta)}_2^2 = r^2\sin^2\varphi(\cos^2\theta + \sin^2\theta) + r^2\cos^2\varphi = r^2 \le R^2$；另一方面，对 $\norm p_2 = r \le R$：若 $r = 0$，$p = \Psi(0, 0, 0)$；否则取 $\varphi = \arccos(z/r) \in [0, \pi]$，若 $\sin\varphi = 0$ 则 $x = y = 0$，$p = \Psi(r, \varphi, 0)$；若 $\sin\varphi > 0$，由 $x^2 + y^2 = r^2 - z^2 = r^2\sin^2\varphi$，$(x, y)/(r\sin\varphi)$ 是单位向量，写成 $(\cos\theta, \sin\theta)$，$\theta \in [0, 2\pi[$。由 {@c11-polaires-justif} 第 2 条与 {@fubini-pave}（乘积形式），
$$\iiint_{\norm x \le R}1 = \int_0^R\int_0^\pi\int_0^{2\pi}r^2\sin\varphi\,\dd\theta\,\dd\varphi\,\dd r = \Big[\frac{r^3}3\Big]_0^R\cdot\Big[-\cos\varphi\Big]_0^\pi\cdot2\pi = \frac{R^3}{3}\cdot2\cdot2\pi = \frac43\pi R^3.$$
:::

::: ex id=c11-ex-couronne lvl=1
**圆盘与圆环上的积分。**

1. 圆盘 $\overline B(0, R) = \Phi([0, R] \times [0, 2\pi])$（满射性的验证同上例），由 {@c11-polaires-justif}，面积 $= \int_0^{2\pi}\int_0^Rr\,\dd r\,\dd\theta = 2\pi\cdot\frac{R^2}2 = \pi R^2$，与 {@c11-ex-disque} 一致，但不需要三角代换。
2. 圆环 $S = \{1 \le x^2 + y^2 \le 4\} = \Phi([1, 2] \times [0, 2\pi])$。$f(x, y) = \ln(x^2 + y^2)$ 在 $S$ 上连续，$f(\Phi(r, \theta)) = \ln r^2 = 2\ln r$。由 {@c11-polaires-justif}（$\theta_2 - \theta_1 = 2\pi$ 允许）：
   $$\iint_S\ln(x^2 + y^2)\,\dd x\,\dd y = \int_0^{2\pi}\Big(\int_1^22r\ln r\,\dd r\Big)\dd\theta.$$
   分部积分（$u = \ln r$，$\dd v = 2r\,\dd r$，$v = r^2$）：$\int_1^22r\ln r\,\dd r = \big[r^2\ln r\big]_1^2 - \int_1^2r\,\dd r = 4\ln2 - \frac32$。所以积分 $= 2\pi\big(4\ln2 - \frac32\big) = 8\pi\ln2 - 3\pi \approx 7.996$。
:::

::: ex id=c11-ex-parallelogramme lvl=1
**线性代换。** 计算 $\iint_D(x + y)\,\e^{x - y}\,\dd x\,\dd y$，$D = \{(x, y) : 0 \le x + y \le 2,\ 0 \le x - y \le 2\}$（一个正方形，边不平行于坐标轴）。边界由 $x + y = \text{常数}$、$x - y = \text{常数}$ 组成，被积函数也只依赖于 $x + y$ 与 $x - y$，所以令 $u = x + y$，$v = x - y$，即
$$\Phi(u, v) = \Big(\frac{u + v}2, \frac{u - v}2\Big),\qquad J_\Phi = \begin{pmatrix}\frac12 & \frac12\\ \frac12 & -\frac12\end{pmatrix},\qquad \det J_\Phi = -\frac14 - \frac14 = -\frac12.$$
$\Phi$ 是可逆线性映射（$\R^2$ 上的微分同胚），且 $(u, v) \in [0, 2]^2 \iff \Phi(u, v) \in D$，故 $D = \Phi([0, 2]^2)$。由 {@changement-variables} 与 {@fubini-pave}，
$$\begin{aligned}
\iint_D(x + y)\,\e^{x - y}\,\dd x\,\dd y &= \iint_{[0,2]^2}u\,\e^v\cdot\Big\lvert-\frac12\Big\rvert\,\dd u\,\dd v && \text{（变量替换）}\\
&= \frac12\Big(\int_0^2u\,\dd u\Big)\Big(\int_0^2\e^v\,\dd v\Big) && \text{（乘积形式）}\\
&= \frac12\cdot2\cdot(\e^2 - 1) = \e^2 - 1.
\end{aligned}$$
:::

::: q
球坐标中为什么取 $\varphi \in [0, \pi]$，而不是像 $\theta$ 那样取 $[0, 2\pi]$？
:::

::: ans
两个原因。(1) 单射性：$\Psi(r, 2\pi - \varphi, \theta + \pi) = \Psi(r, \varphi, \theta)$（因为 $\sin(2\pi - \varphi) = -\sin\varphi$，$(\cos(\theta + \pi), \sin(\theta + \pi)) = -(\cos\theta, \sin\theta)$，两个负号抵消；$\cos(2\pi - \varphi) = \cos\varphi$），若 $\varphi \in [0, 2\pi]$，每个点被覆盖两次，算出的体积会加倍（{@changement-variables} 后的注第 2 条）。(2) $\varphi \in [0, \pi]$ 时 $\sin\varphi \ge 0$，$\abs{\det J_\Psi} = r^2\sin\varphi$ 不必再写绝对值。
:::

::: q
「$\dd x\,\dd y = r\,\dd r\,\dd\theta$」的反方向是什么？即逆映射 $(x, y) \mapsto (r, \theta)$ 的 Jacobi 行列式是多少？
:::

::: ans
由链式法则 {@chain-rule}，$J_{\Phi^{-1}}(x, y) = J_\Phi(r, \theta)^{-1}$，所以 $\det J_{\Phi^{-1}} = \frac1r = \frac1{\sqrt{x^2 + y^2}}$。直接验证（在 $x > 0$ 的区域，$r = \sqrt{x^2 + y^2}$，$\theta = \Arctan\frac yx$）：$\partial_xr = \frac xr$，$\partial_yr = \frac yr$，$\partial_x\theta = -\frac y{r^2}$，$\partial_y\theta = \frac x{r^2}$，行列式 $= \frac{x^2}{r^3} + \frac{y^2}{r^3} = \frac1r$。
:::

## 广义重积分

Gauss 积分 $\int_\R\e^{-x^2}\,\dd x$、Γ 函数、Β 函数都是无界区间上（或被积函数无界）的积分。把两个这样的一元积分相乘，就得到无界区域上的二重积分，而二重积分可以换坐标——这是本节计算的核心技巧。对非负函数，一切都可以放心交换；对变号函数，必须先检查绝对可积。

::: thm id=tonelli-continu zh="非负函数的 Tonelli 定理" en="Tonelli's theorem (non-negative continuous case)" fr="Théorème de Fubini–Tonelli (cas positif)" ru="Теорема Тонелли" lvl=3 ref="L3 积分论；Rudin, *Real and Complex Analysis*，定理 8.8"
设 $I, J$ 是区间，$f : I \times J \to \R_+$ 连续。则（在 $[0, +\infty]$ 中）
$$\int_I\Big(\int_Jf(x, y)\,\dd y\Big)\dd x = \int_J\Big(\int_If(x, y)\,\dd x\Big)\dd y,$$
这个公共值定义为广义积分 $\iint_{I \times J}f$。它也等于 $\lim_m\iint_{K_m}f$，其中 $(K_m)$ 是任意一列递增的、并为 $I \times J$ 的紧 Jordan 可测集（**穷竭序列**）。对可积的变号函数（$\iint\abs f < \infty$），结论同样成立（Fubini 定理）；严格地说，这时内层积分只对「几乎所有」的 $x$ 绝对收敛，这需要 L3 的 Lebesgue 理论来表述。
:::

::: fr
Soient $I, J$ deux intervalles et $f : I \times J \to \R_+$ continue. Alors (dans $[0, +\infty]$)
$$\int_I\Big(\int_Jf(x, y)\,\dd y\Big)\dd x = \int_J\Big(\int_If(x, y)\,\dd x\Big)\dd y,$$
et cette valeur commune définit l'intégrale généralisée $\iint_{I \times J}f$. Elle vaut aussi $\lim_m\iint_{K_m}f$ pour toute suite croissante $(K_m)$ de compacts mesurables au sens de Jordan de réunion $I \times J$ (**suite exhaustive**). Pour une fonction de signe quelconque intégrable ($\iint\abs f < \infty$), la conclusion subsiste (théorème de Fubini) ; rigoureusement, l'intégrale intérieure ne converge alors absolument que pour « presque tout » $x$, ce qui relève de la théorie de Lebesgue (L3).
:::

::: cex id=c11-cex-fubini lvl=1
**没有绝对可积性，两个累次积分可以不同。** 令 $f(x, y) = \dfrac{x^2 - y^2}{(x^2 + y^2)^2}$，$(x, y) \in ]0, 1]^2$。

1. **内层积分。** 固定 $x \in ]0, 1]$，$y \mapsto f(x, y)$ 在 $[0, 1]$ 上连续（分母 $\ge x^4 > 0$）。由
   $$\frac{\partial}{\partial y}\Big(\frac{y}{x^2 + y^2}\Big) = \frac{(x^2 + y^2) - 2y^2}{(x^2 + y^2)^2} = f(x, y),$$
   得 $\int_0^1f(x, y)\,\dd y = \Big[\frac y{x^2 + y^2}\Big]_{y=0}^{y=1} = \frac1{1 + x^2}$。
2. **外层积分。** $\int_0^1\Big(\int_0^1f(x, y)\,\dd y\Big)\dd x = \int_0^1\frac{\dd x}{1 + x^2} = \Arctan 1 = \frac\pi4$。
3. **另一个次序。** $f(y, x) = -f(x, y)$。把积分变量 $x, y$ 改名，$\int_0^1\big(\int_0^1f(x, y)\,\dd x\big)\dd y = \int_0^1\big(\int_0^1f(y, x)\,\dd y\big)\dd x = -\frac\pi4$。
4. **与 {@tonelli-continu} 不矛盾：$\iint\abs f = +\infty$。** 对 $x \in ]0, 1]$，在 $[0, x]$ 上 $f \ge 0$，所以
   $$\int_0^1\abs{f(x, y)}\,\dd y \ge \int_0^xf(x, y)\,\dd y = \frac{x}{2x^2} = \frac1{2x},\qquad \int_0^1\frac{\dd x}{2x} = +\infty.$$
   由 {@tonelli-continu}（用于连续函数 $\abs f \ge 0$），$\iint_{]0,1]^2}\abs f = +\infty$。直观上，用极坐标 $\abs f = \frac{\abs{\cos2\theta}}{r^2}$，乘以 Jacobi 因子 $r$ 后像 $\frac1r$ 那样在原点附近不可积。这是第 2 章二重级数反例 {@cex-fubini} 的连续版本。
:::

::: thm id=gauss-polaires zh="用极坐标计算 Gauss 积分" en="Gaussian integral via polar coordinates" fr="Intégrale de Gauss par les coordonnées polaires" ru="Вычисление интеграла Эйлера — Пуассона в полярных координатах" lvl=1
$$\int_{-\infty}^{+\infty}\e^{-x^2}\,\dd x = \sqrt\pi.$$
:::

::: fr
$$\int_{-\infty}^{+\infty}\e^{-x^2}\,\dd x = \sqrt\pi.$$
:::

::: proof
▷ 思路：$\big(\int_{-R}^R\e^{-x^2}\,\dd x\big)^2$ 是正方形 $[-R, R]^2$ 上 $\e^{-(x^2 + y^2)}$ 的积分（乘积形式）；正方形夹在两个圆盘之间，而圆盘上的积分用极坐标可以精确算出。令 $R \to \infty$ 夹逼。整个证明只用到紧集上的积分。

**第 1 步（收敛）**　$\e^{-x^2} > 0$ 连续；$\abs x \ge 1$ 时 $x^2 \ge \abs x$，故 $\e^{-x^2} \le \e^{-\abs x}$，后者在 $\R$ 上可积。由比较定理 {@comparaison-integrales}，$I = \int_\R\e^{-x^2}\,\dd x$ 收敛，且 $I > 0$。记 $I_R = \int_{-R}^R\e^{-x^2}\,\dd x$，则 $I_R \to I$（$R \to +\infty$）。

**第 2 步（正方形）**　由乘积形式的 Fubini 公式（{@fubini-pave} 后的例子），
$$I_R^2 = \Big(\int_{-R}^R\e^{-x^2}\,\dd x\Big)\Big(\int_{-R}^R\e^{-y^2}\,\dd y\Big) = \iint_{[-R,R]^2}\e^{-(x^2 + y^2)}\,\dd x\,\dd y.$$

**第 3 步（圆盘）**　对 $\rho > 0$，$\overline B(0, \rho) = \Phi([0, \rho] \times [0, 2\pi])$（{@c11-ex-couronne}），由 {@c11-polaires-justif}，
$$\iint_{\overline B(0,\rho)}\e^{-(x^2 + y^2)}\,\dd x\,\dd y = \int_0^{2\pi}\Big(\int_0^\rho\e^{-r^2}r\,\dd r\Big)\dd\theta = 2\pi\Big[-\frac12\e^{-r^2}\Big]_0^\rho = \pi\big(1 - \e^{-\rho^2}\big).$$

**第 4 步（夹逼）**　若 $x^2 + y^2 \le R^2$，则 $\abs x, \abs y \le R$；若 $\abs x, \abs y \le R$，则 $x^2 + y^2 \le 2R^2$。所以 $\overline B(0, R) \subset [-R, R]^2 \subset \overline B(0, R\sqrt2)$。被积函数 $\ge 0$，由 {@c11-additivite} 第 6 条与第 2、3 步，
$$\pi\big(1 - \e^{-R^2}\big) \le I_R^2 \le \pi\big(1 - \e^{-2R^2}\big).$$

**第 5 步（取极限）**　令 $R \to +\infty$：两端都趋于 $\pi$，$I_R^2 \to I^2$，故 $I^2 = \pi$。又 $I > 0$，所以 $I = \sqrt\pi$。
:::

::: fr
▷ Méthode : $\big(\int_{-R}^R\e^{-x^2}\,\dd x\big)^2$ est l'intégrale de $\e^{-(x^2 + y^2)}$ sur le carré $[-R, R]^2$ (fonction produit) ; ce carré est encadré par deux disques, sur lesquels l'intégrale se calcule exactement en coordonnées polaires. On fait tendre $R$ vers $+\infty$ et l'on conclut par encadrement. La preuve n'utilise que des intégrales sur des compacts.

**Étape 1 (convergence)**　$\e^{-x^2} > 0$ est continue ; pour $\abs x \ge 1$, $x^2 \ge \abs x$, donc $\e^{-x^2} \le \e^{-\abs x}$, qui est intégrable sur $\R$. D'après le {@fr:comparaison-integrales}, $I = \int_\R\e^{-x^2}\,\dd x$ converge et $I > 0$. Notons $I_R = \int_{-R}^R\e^{-x^2}\,\dd x$ ; alors $I_R \to I$ quand $R \to +\infty$.

**Étape 2 (carré)**　D'après la formule de Fubini pour une fonction produit (exemple suivant le {@fr:fubini-pave}),
$$I_R^2 = \Big(\int_{-R}^R\e^{-x^2}\,\dd x\Big)\Big(\int_{-R}^R\e^{-y^2}\,\dd y\Big) = \iint_{[-R,R]^2}\e^{-(x^2 + y^2)}\,\dd x\,\dd y.$$

**Étape 3 (disques)**　Pour $\rho > 0$, $\overline B(0, \rho) = \Phi([0, \rho] \times [0, 2\pi])$ ({@fr:c11-ex-couronne}) ; d'après la {@fr:c11-polaires-justif},
$$\iint_{\overline B(0,\rho)}\e^{-(x^2 + y^2)}\,\dd x\,\dd y = \int_0^{2\pi}\Big(\int_0^\rho\e^{-r^2}r\,\dd r\Big)\dd\theta = 2\pi\Big[-\frac12\e^{-r^2}\Big]_0^\rho = \pi\big(1 - \e^{-\rho^2}\big).$$

**Étape 4 (encadrement)**　Si $x^2 + y^2 \le R^2$, alors $\abs x, \abs y \le R$ ; si $\abs x, \abs y \le R$, alors $x^2 + y^2 \le 2R^2$. Donc $\overline B(0, R) \subset [-R, R]^2 \subset \overline B(0, R\sqrt2)$. L'intégrande étant $\ge 0$, le point 6 de la {@fr:c11-additivite} et les étapes 2 et 3 donnent
$$\pi\big(1 - \e^{-R^2}\big) \le I_R^2 \le \pi\big(1 - \e^{-2R^2}\big).$$

**Étape 5 (passage à la limite)**　Quand $R \to +\infty$, les deux bornes tendent vers $\pi$ et $I_R^2 \to I^2$, donc $I^2 = \pi$. Comme $I > 0$, $I = \sqrt\pi$.
:::

::: rem
**与 Tonelli 定理和第 7 章的关系。** 用 {@tonelli-continu} 可以把上面的证明说得更短：$I^2 = \iint_{\R^2}\e^{-(x^2 + y^2)}$（先 $y$ 后 $x$ 的累次积分），而圆盘 $\overline B(0, m)$ 构成穷竭序列，所以 $I^2 = \lim_m\pi(1 - \e^{-m^2}) = \pi$。上面的夹逼避免了引用 ★★★ 的定理。第 7 章 {@gauss} 用含参积分得到 $\int_0^{+\infty}\e^{-t^2}\,\dd t = \frac{\sqrt\pi}2$，由偶函数性质与本定理一致。
:::

::: thm id=beta-gamma zh="Β 函数与 Γ 函数的关系" en="Beta function" fr="Fonction Bêta" ru="Бета-функция" lvl=1
对 $x, y > 0$，定义 $\mathrm{B}(x, y) = \int_0^1t^{x-1}(1 - t)^{y-1}\,\dd t$（Γ 见 {@def-gamma}）。则
$$\mathrm{B}(x, y) = \frac{\Gamma(x)\Gamma(y)}{\Gamma(x + y)}.$$
推论：$\Gamma(\frac12) = \sqrt\pi$。
:::

::: fr
Pour $x, y > 0$, on pose $\mathrm{B}(x, y) = \int_0^1t^{x-1}(1 - t)^{y-1}\,\dd t$ (pour Γ, voir la {@fr:def-gamma}). Alors
$$\mathrm{B}(x, y) = \frac{\Gamma(x)\Gamma(y)}{\Gamma(x + y)}.$$
Corollaire : $\Gamma(\frac12) = \sqrt\pi$.
:::

::: proof
▷ 思路：代换 $t = u^2$ 把 $\Gamma(x)$ 写成 $2\int_0^\infty u^{2x-1}\e^{-u^2}\,\dd u$，于是 $\Gamma(x)\Gamma(y)$ 是第一象限上的广义二重积分；换成极坐标后它分裂成「角度部分」$\times$「径向部分」，径向部分是 $\frac12\Gamma(x + y)$，角度部分是 $\frac12\mathrm B(x, y)$。

**第 0 步（$\mathrm B$ 收敛）**　$g(t) = t^{x-1}(1 - t)^{y-1} > 0$ 在 $]0, 1[$ 上连续。$t \to 0^+$ 时 $(1 - t)^{y-1} \to 1$，$g(t) \sim t^{x-1}$，由 $x - 1 > -1$ 可积（{@riemann-integrales}）；$t \to 1^-$ 时 $g(t) \sim (1 - t)^{y-1}$，由 $y > 0$ 可积。

**第 1 步（Γ 的另一种写法）**　$u \mapsto u^2$ 是 $]0, +\infty[ \to ]0, +\infty[$ 的 $\Cc^1$ 严格递增双射，导数 $2u$。由 {@changement-variable-gen}，以 $t = u^2$ 代入：
$$\Gamma(s) = \int_0^{+\infty}t^{s-1}\e^{-t}\,\dd t = \int_0^{+\infty}u^{2s-2}\e^{-u^2}\cdot2u\,\dd u = 2\int_0^{+\infty}u^{2s-1}\e^{-u^2}\,\dd u\qquad(s > 0).$$

**第 2 步（写成二重积分）**　令 $h(u, v) = 4u^{2x-1}v^{2y-1}\e^{-(u^2 + v^2)}$，在 $]0, +\infty[^2$ 上连续且 $\ge 0$。内层积分 $\int_0^{+\infty}h(u, v)\,\dd v = 2u^{2x-1}\e^{-u^2}\cdot\Gamma(y)$（第 1 步，$s = y$），外层再积分得 $\Gamma(x)\Gamma(y)$（第 1 步，$s = x$）。由 {@tonelli-continu}，$\iint_{]0,+\infty[^2}h = \Gamma(x)\Gamma(y)$。

**第 3 步（极坐标穷竭序列）**　对 $m \ge 2$，令 $K_m = \Phi\big([\frac1m, m] \times [\frac1m, \frac\pi2 - \frac1m]\big)$（$m \ge 2$ 保证 $\frac1m < \frac\pi2 - \frac1m$）。$K_m$ 是紧的可求面积集（{@c11-polaires-justif}），随 $m$ 递增；$r > 0$、$\theta \in ]0, \frac\pi2[$ 推出 $u = r\cos\theta > 0$、$v = r\sin\theta > 0$，所以 $K_m \subset ]0, +\infty[^2$；反之，$(u, v) \in ]0, +\infty[^2$ 的极坐标 $r = \sqrt{u^2 + v^2} > 0$、$\theta = \Arctan\frac vu \in ]0, \frac\pi2[$，$m$ 充分大时 $(u, v) \in K_m$。所以 $(K_m)$ 是穷竭序列，由 {@tonelli-continu}，$\Gamma(x)\Gamma(y) = \lim_m\iint_{K_m}h$。

**第 4 步（在 $K_m$ 上计算）**　$h(r\cos\theta, r\sin\theta)\cdot r = 4r^{2x-1}\cos^{2x-1}\theta\cdot r^{2y-1}\sin^{2y-1}\theta\cdot\e^{-r^2}\cdot r = 4r^{2(x+y)-1}\e^{-r^2}\cos^{2x-1}\theta\sin^{2y-1}\theta$，是乘积形式。由 {@c11-polaires-justif} 与 {@fubini-pave}，
$$\iint_{K_m}h = 4\Big(\int_{1/m}^{\pi/2 - 1/m}\cos^{2x-1}\theta\sin^{2y-1}\theta\,\dd\theta\Big)\Big(\int_{1/m}^mr^{2(x+y)-1}\e^{-r^2}\,\dd r\Big).$$

**第 5 步（取极限）**　径向因子趋于 $\int_0^{+\infty}r^{2(x+y)-1}\e^{-r^2}\,\dd r = \frac12\Gamma(x + y)$（第 1 步，$s = x + y$）。角度因子趋于 $J(x, y) = \int_0^{\pi/2}\cos^{2x-1}\theta\sin^{2y-1}\theta\,\dd\theta$（收敛：$\theta \to 0^+$ 时被积函数 $\sim\theta^{2y-1}$，$2y - 1 > -1$；$\theta \to \frac\pi2^-$ 时 $\sim(\frac\pi2 - \theta)^{2x-1}$）。所以
$$\Gamma(x)\Gamma(y) = 4\cdot J(x, y)\cdot\frac12\Gamma(x + y) = 2J(x, y)\,\Gamma(x + y).$$

**第 6 步（$\mathrm B = 2J$）**　$\theta \mapsto \cos^2\theta$ 是 $]0, \frac\pi2[ \to ]0, 1[$ 的 $\Cc^1$ 严格递减双射，$\frac{\dd t}{\dd\theta} = -2\cos\theta\sin\theta$。以 $t = \cos^2\theta$ 代入（{@changement-variable-gen}）：$t^{x-1} = \cos^{2x-2}\theta$，$(1 - t)^{y-1} = \sin^{2y-2}\theta$，
$$\mathrm B(x, y) = \int_0^{\pi/2}\cos^{2x-2}\theta\sin^{2y-2}\theta\cdot2\cos\theta\sin\theta\,\dd\theta = 2J(x, y).$$
代入第 5 步：$\Gamma(x)\Gamma(y) = \mathrm B(x, y)\Gamma(x + y)$；$\Gamma(x + y) > 0$（正的被积函数），两边除以它即得公式。

**第 7 步（推论）**　以 $t = \sin^2\theta$ 代入（$]0, \frac\pi2[ \to ]0, 1[$ 的 $\Cc^1$ 递增双射，$\dd t = 2\sin\theta\cos\theta\,\dd\theta$，$\sqrt{t(1 - t)} = \sin\theta\cos\theta > 0$）：
$$\mathrm B\big(\tfrac12, \tfrac12\big) = \int_0^1\frac{\dd t}{\sqrt{t(1 - t)}} = \int_0^{\pi/2}\frac{2\sin\theta\cos\theta}{\sin\theta\cos\theta}\,\dd\theta = \pi.$$
又 $\Gamma(1) = 1$（{@gamma-factorielle}），所以 $\Gamma(\frac12)^2 = \pi\,\Gamma(1) = \pi$；$\Gamma(\frac12) > 0$，故 $\Gamma(\frac12) = \sqrt\pi$。（也可以由第 1 步与 {@gauss-polaires} 直接得到：$\Gamma(\frac12) = 2\int_0^{+\infty}\e^{-u^2}\,\dd u = \sqrt\pi$。）
:::

::: fr
▷ Méthode : le changement de variable $t = u^2$ écrit $\Gamma(x) = 2\int_0^\infty u^{2x-1}\e^{-u^2}\,\dd u$, de sorte que $\Gamma(x)\Gamma(y)$ est une intégrale double généralisée sur le premier quadrant ; en coordonnées polaires, elle se factorise en « partie angulaire » $\times$ « partie radiale » ; la partie radiale vaut $\frac12\Gamma(x + y)$ et la partie angulaire $\frac12\mathrm B(x, y)$.

**Étape 0 (convergence de $\mathrm B$)**　$g(t) = t^{x-1}(1 - t)^{y-1} > 0$ est continue sur $]0, 1[$. Quand $t \to 0^+$, $(1 - t)^{y-1} \to 1$ et $g(t) \sim t^{x-1}$, intégrable car $x - 1 > -1$ ({@fr:riemann-integrales}) ; quand $t \to 1^-$, $g(t) \sim (1 - t)^{y-1}$, intégrable car $y > 0$.

**Étape 1 (autre écriture de Γ)**　$u \mapsto u^2$ est une bijection $\Cc^1$ strictement croissante de $]0, +\infty[$ sur $]0, +\infty[$, de dérivée $2u$. D'après le {@fr:changement-variable-gen}, avec $t = u^2$ :
$$\Gamma(s) = \int_0^{+\infty}t^{s-1}\e^{-t}\,\dd t = \int_0^{+\infty}u^{2s-2}\e^{-u^2}\cdot2u\,\dd u = 2\int_0^{+\infty}u^{2s-1}\e^{-u^2}\,\dd u\qquad(s > 0).$$

**Étape 2 (écriture comme intégrale double)**　Posons $h(u, v) = 4u^{2x-1}v^{2y-1}\e^{-(u^2 + v^2)}$, continue et $\ge 0$ sur $]0, +\infty[^2$. L'intégrale intérieure vaut $\int_0^{+\infty}h(u, v)\,\dd v = 2u^{2x-1}\e^{-u^2}\cdot\Gamma(y)$ (étape 1, $s = y$), et l'intégrale extérieure donne $\Gamma(x)\Gamma(y)$ (étape 1, $s = x$). D'après le {@fr:tonelli-continu}, $\iint_{]0,+\infty[^2}h = \Gamma(x)\Gamma(y)$.

**Étape 3 (suite exhaustive en polaires)**　Pour $m \ge 2$, posons $K_m = \Phi\big([\frac1m, m] \times [\frac1m, \frac\pi2 - \frac1m]\big)$ ($m \ge 2$ assure $\frac1m < \frac\pi2 - \frac1m$). $K_m$ est un compact quarrable ({@fr:c11-polaires-justif}), croissant en $m$ ; $r > 0$ et $\theta \in ]0, \frac\pi2[$ entraînent $u = r\cos\theta > 0$ et $v = r\sin\theta > 0$, donc $K_m \subset ]0, +\infty[^2$ ; réciproquement, un point $(u, v) \in ]0, +\infty[^2$ a pour coordonnées polaires $r = \sqrt{u^2 + v^2} > 0$ et $\theta = \Arctan\frac vu \in ]0, \frac\pi2[$, donc $(u, v) \in K_m$ pour $m$ assez grand. Ainsi $(K_m)$ est une suite exhaustive et, d'après le {@fr:tonelli-continu}, $\Gamma(x)\Gamma(y) = \lim_m\iint_{K_m}h$.

**Étape 4 (calcul sur $K_m$)**　$h(r\cos\theta, r\sin\theta)\cdot r = 4r^{2x-1}\cos^{2x-1}\theta\cdot r^{2y-1}\sin^{2y-1}\theta\cdot\e^{-r^2}\cdot r = 4r^{2(x+y)-1}\e^{-r^2}\cos^{2x-1}\theta\sin^{2y-1}\theta$, fonction produit. D'après la {@fr:c11-polaires-justif} et le {@fr:fubini-pave},
$$\iint_{K_m}h = 4\Big(\int_{1/m}^{\pi/2 - 1/m}\cos^{2x-1}\theta\sin^{2y-1}\theta\,\dd\theta\Big)\Big(\int_{1/m}^mr^{2(x+y)-1}\e^{-r^2}\,\dd r\Big).$$

**Étape 5 (passage à la limite)**　Le facteur radial tend vers $\int_0^{+\infty}r^{2(x+y)-1}\e^{-r^2}\,\dd r = \frac12\Gamma(x + y)$ (étape 1, $s = x + y$). Le facteur angulaire tend vers $J(x, y) = \int_0^{\pi/2}\cos^{2x-1}\theta\sin^{2y-1}\theta\,\dd\theta$ (convergente : quand $\theta \to 0^+$, l'intégrande est $\sim\theta^{2y-1}$ avec $2y - 1 > -1$ ; quand $\theta \to \frac\pi2^-$, il est $\sim(\frac\pi2 - \theta)^{2x-1}$). Donc
$$\Gamma(x)\Gamma(y) = 4\cdot J(x, y)\cdot\frac12\Gamma(x + y) = 2J(x, y)\,\Gamma(x + y).$$

**Étape 6 ($\mathrm B = 2J$)**　$\theta \mapsto \cos^2\theta$ est une bijection $\Cc^1$ strictement décroissante de $]0, \frac\pi2[$ sur $]0, 1[$, avec $\frac{\dd t}{\dd\theta} = -2\cos\theta\sin\theta$. Avec $t = \cos^2\theta$ ({@fr:changement-variable-gen}) : $t^{x-1} = \cos^{2x-2}\theta$, $(1 - t)^{y-1} = \sin^{2y-2}\theta$, et
$$\mathrm B(x, y) = \int_0^{\pi/2}\cos^{2x-2}\theta\sin^{2y-2}\theta\cdot2\cos\theta\sin\theta\,\dd\theta = 2J(x, y).$$
En reportant dans l'étape 5 : $\Gamma(x)\Gamma(y) = \mathrm B(x, y)\Gamma(x + y)$ ; comme $\Gamma(x + y) > 0$ (intégrande positive), on divise et l'on obtient la formule.

**Étape 7 (corollaire)**　Avec $t = \sin^2\theta$ (bijection $\Cc^1$ croissante de $]0, \frac\pi2[$ sur $]0, 1[$, $\dd t = 2\sin\theta\cos\theta\,\dd\theta$, $\sqrt{t(1 - t)} = \sin\theta\cos\theta > 0$) :
$$\mathrm B\big(\tfrac12, \tfrac12\big) = \int_0^1\frac{\dd t}{\sqrt{t(1 - t)}} = \int_0^{\pi/2}\frac{2\sin\theta\cos\theta}{\sin\theta\cos\theta}\,\dd\theta = \pi.$$
Comme $\Gamma(1) = 1$ ({@fr:gamma-factorielle}), $\Gamma(\frac12)^2 = \pi\,\Gamma(1) = \pi$ ; puisque $\Gamma(\frac12) > 0$, $\Gamma(\frac12) = \sqrt\pi$. (On peut aussi l'obtenir directement par l'étape 1 et le {@fr:gauss-polaires} : $\Gamma(\frac12) = 2\int_0^{+\infty}\e^{-u^2}\,\dd u = \sqrt\pi$.)
:::

::: thm id=volume-boule zh="$n$ 维球的体积" en="Volume of the $n$-ball" fr="Volume de la boule unité de $\mathbb{R}^n$" ru="Объём $n$-мерного шара" lvl=1
$\R^n$ 中（欧氏范数的）闭单位球 $B_n$ 的体积为
$$V_n = \frac{\pi^{n/2}}{\Gamma\big(\frac n2 + 1\big)}.$$
$V_1 = 2$，$V_2 = \pi$，$V_3 = \frac43\pi$，$V_4 = \frac{\pi^2}{2}$，$V_5 = \frac{8\pi^2}{15}$。当 $n \to \infty$ 时 $V_n \to 0$。
:::

::: fr
Le volume de la boule unité fermée $B_n$ de $\R^n$ (norme euclidienne) est
$$V_n = \frac{\pi^{n/2}}{\Gamma\big(\frac n2 + 1\big)}.$$
On a $V_1 = 2$, $V_2 = \pi$, $V_3 = \frac43\pi$, $V_4 = \frac{\pi^2}{2}$, $V_5 = \frac{8\pi^2}{15}$, et $V_n \to 0$ quand $n \to \infty$.
:::

::: proof
▷ 思路：由 Fubini 定理按最后一个坐标切片：截面 $\{x_n = t\}$ 是半径为 $\sqrt{1 - t^2}$ 的 $n-1$ 维球，体积 $(1 - t^2)^{\frac{n-1}2}V_{n-1}$；令 $t^2 = s$ 化为 Β 函数，得递推关系，再对 $n$ 归纳。

**第 1 步（可测性与缩放）**　$n = 1$ 时 $B_1 = [-1, 1]$，$V_1 = 2$。$n \ge 2$ 时，单位球面包含于立方体 $[-1, 1]^{n-1}$ 上两个连续函数 $x_n = \pm\sqrt{\max(0, 1 - \norm{x'}_2^2)}$ 的图像之并，由 {@c11-graphe-negligeable} 是零容度集，所以 $B_n$ Jordan 可测。对 $\rho > 0$，$\overline B_n(0, \rho)$ 是 $B_n$ 在线性映射 $x \mapsto \rho x$（$\det = \rho^n$）下的像，由 {@changement-variables}（$f = 1$），$\operatorname{vol}\big(\overline B_n(0, \rho)\big) = \rho^nV_n$；$\rho = 0$ 时是单点，体积 $0 = 0^nV_n$（{@c11-additivite} 第 2 条）。

**第 2 步（切片）**　设 $n \ge 2$，记 $x = (x', t)$，$x' \in \R^{n-1}$，$t \in \R$。$\mathbf 1_{B_n}$ 在 $P = [-1, 1]^{n-1} \times [-1, 1]$ 上可积。固定 $t \in [-1, 1]$，截口 $x' \mapsto \mathbf 1_{B_n}(x', t)$ 是 $\overline B_{n-1}(0, \sqrt{1 - t^2})$ 的示性函数，由第 1 步（在 $n - 1$ 维）可积，积分为 $(1 - t^2)^{\frac{n-1}2}V_{n-1}$（$t = \pm1$ 时半径为 $0$，两边都是 $0$）。由 {@c11-fubini-riemann}（内层对 $x'$，外层对 $t$），
$$V_n = \int_{-1}^1(1 - t^2)^{\frac{n-1}2}V_{n-1}\,\dd t = V_{n-1}\,W_n,\qquad W_n = \int_{-1}^1(1 - t^2)^{\frac{n-1}2}\,\dd t.$$

**第 3 步（化为 Β 函数）**　被积函数是偶函数，$W_n = 2\int_0^1(1 - t^2)^{\frac{n-1}2}\,\dd t$。$s \mapsto \sqrt s$ 是 $]0, 1[ \to ]0, 1[$ 的 $\Cc^1$ 递增双射，以 $t = \sqrt s$、$\dd t = \frac{\dd s}{2\sqrt s}$ 代入（{@changement-variable-gen}）：
$$W_n = 2\int_0^1(1 - s)^{\frac{n-1}2}\frac{\dd s}{2\sqrt s} = \int_0^1s^{-\frac12}(1 - s)^{\frac{n-1}2}\,\dd s = \mathrm B\Big(\frac12, \frac{n+1}2\Big) = \frac{\Gamma(\frac12)\Gamma(\frac{n+1}2)}{\Gamma(\frac n2 + 1)},$$
最后一步用 {@beta-gamma}，且 $\frac12 + \frac{n+1}2 = \frac n2 + 1$。

**第 4 步（归纳）**　命题 $\mathcal H(n)$：$V_n = \pi^{n/2}/\Gamma(\frac n2 + 1)$。

- **初始化**：$\Gamma(\frac32) = \frac12\Gamma(\frac12) = \frac{\sqrt\pi}2$（{@gamma-factorielle} 与 {@beta-gamma} 的推论），所以 $\pi^{1/2}/\Gamma(\frac32) = 2 = V_1$。
- **递推**：设 $\mathcal H(n-1)$ 成立（$n \ge 2$）。由第 2、3 步与 $\Gamma(\frac12) = \sqrt\pi$，
  $$V_n = \frac{\pi^{\frac{n-1}2}}{\Gamma(\frac{n+1}2)}\cdot\frac{\sqrt\pi\,\Gamma(\frac{n+1}2)}{\Gamma(\frac n2 + 1)} = \frac{\pi^{n/2}}{\Gamma(\frac n2 + 1)}\qquad\Big(\tfrac{n-1}2 + 1 = \tfrac{n+1}2\Big).$$

**第 5 步（数值）**　由 $\Gamma(s + 1) = s\Gamma(s)$：$\Gamma(2) = 1$，$\Gamma(\frac52) = \frac32\cdot\frac12\sqrt\pi = \frac34\sqrt\pi$，$\Gamma(3) = 2$，$\Gamma(\frac72) = \frac52\cdot\frac34\sqrt\pi = \frac{15}8\sqrt\pi$。于是 $V_2 = \pi$，$V_3 = \pi^{3/2}\cdot\frac4{3\sqrt\pi} = \frac43\pi$，$V_4 = \frac{\pi^2}2$，$V_5 = \pi^{5/2}\cdot\frac8{15\sqrt\pi} = \frac{8\pi^2}{15}$。

**第 6 步（$V_n \to 0$）**　由公式与 $\Gamma(\frac n2 + 1) = \frac n2\Gamma(\frac n2)$，对 $n \ge 3$，
$$\frac{V_n}{V_{n-2}} = \frac{\pi^{n/2}}{\pi^{(n-2)/2}}\cdot\frac{\Gamma(\frac n2)}{\Gamma(\frac n2 + 1)} = \frac{2\pi}n.$$
令 $q = \frac{2\pi}7 < 1$（$2\pi \approx 6.283 < 7$）。对 $n \ge 7$，$V_n \le qV_{n-2}$，归纳得 $V_{5+2k} \le q^kV_5$、$V_{6+2k} \le q^kV_6$（$k \ge 0$），两者都趋于 $0$，所以 $V_n \to 0$。（也可以用 Stirling 公式 {@stirling-gamma}：$\Gamma(\frac n2 + 1)$ 的增长远快于 $\pi^{n/2}$。）
:::

::: fr
▷ Méthode : on découpe par tranches selon la dernière coordonnée (théorème de Fubini) : la section $\{x_n = t\}$ est une boule de dimension $n-1$ et de rayon $\sqrt{1 - t^2}$, de volume $(1 - t^2)^{\frac{n-1}2}V_{n-1}$ ; le changement $t^2 = s$ fait apparaître la fonction Bêta, d'où une relation de récurrence, puis une récurrence sur $n$.

**Étape 1 (mesurabilité et homothétie)**　Pour $n = 1$, $B_1 = [-1, 1]$ et $V_1 = 2$. Pour $n \ge 2$, la sphère unité est contenue dans la réunion des graphes des deux fonctions continues $x_n = \pm\sqrt{\max(0, 1 - \norm{x'}_2^2)}$ sur le cube $[-1, 1]^{n-1}$ ; elle est donc de contenu nul ({@fr:c11-graphe-negligeable}) et $B_n$ est mesurable au sens de Jordan. Pour $\rho > 0$, $\overline B_n(0, \rho)$ est l'image de $B_n$ par $x \mapsto \rho x$ (de déterminant $\rho^n$) ; le {@fr:changement-variables} (avec $f = 1$) donne $\operatorname{vol}\big(\overline B_n(0, \rho)\big) = \rho^nV_n$ ; pour $\rho = 0$, c'est un point, de volume $0 = 0^nV_n$ (point 2 de la {@fr:c11-additivite}).

**Étape 2 (tranches)**　Soit $n \ge 2$ ; écrivons $x = (x', t)$ avec $x' \in \R^{n-1}$, $t \in \R$. La fonction $\mathbf 1_{B_n}$ est intégrable sur $P = [-1, 1]^{n-1} \times [-1, 1]$. Pour $t \in [-1, 1]$ fixé, la section $x' \mapsto \mathbf 1_{B_n}(x', t)$ est l'indicatrice de $\overline B_{n-1}(0, \sqrt{1 - t^2})$, intégrable d'après l'étape 1 (en dimension $n - 1$), d'intégrale $(1 - t^2)^{\frac{n-1}2}V_{n-1}$ (pour $t = \pm1$, le rayon est nul et les deux membres sont nuls). D'après le {@fr:c11-fubini-riemann} (intégration intérieure en $x'$, extérieure en $t$),
$$V_n = \int_{-1}^1(1 - t^2)^{\frac{n-1}2}V_{n-1}\,\dd t = V_{n-1}\,W_n,\qquad W_n = \int_{-1}^1(1 - t^2)^{\frac{n-1}2}\,\dd t.$$

**Étape 3 (fonction Bêta)**　L'intégrande est paire : $W_n = 2\int_0^1(1 - t^2)^{\frac{n-1}2}\,\dd t$. L'application $s \mapsto \sqrt s$ est une bijection $\Cc^1$ croissante de $]0, 1[$ sur $]0, 1[$ ; avec $t = \sqrt s$, $\dd t = \frac{\dd s}{2\sqrt s}$ ({@fr:changement-variable-gen}) :
$$W_n = 2\int_0^1(1 - s)^{\frac{n-1}2}\frac{\dd s}{2\sqrt s} = \int_0^1s^{-\frac12}(1 - s)^{\frac{n-1}2}\,\dd s = \mathrm B\Big(\frac12, \frac{n+1}2\Big) = \frac{\Gamma(\frac12)\Gamma(\frac{n+1}2)}{\Gamma(\frac n2 + 1)},$$
la dernière égalité par le {@fr:beta-gamma}, avec $\frac12 + \frac{n+1}2 = \frac n2 + 1$.

**Étape 4 (récurrence)**　Propriété $\mathcal H(n)$ : $V_n = \pi^{n/2}/\Gamma(\frac n2 + 1)$.

- **Initialisation.** $\Gamma(\frac32) = \frac12\Gamma(\frac12) = \frac{\sqrt\pi}2$ ({@fr:gamma-factorielle} et corollaire du {@fr:beta-gamma}), donc $\pi^{1/2}/\Gamma(\frac32) = 2 = V_1$.
- **Hérédité.** Supposons $\mathcal H(n-1)$ vraie ($n \ge 2$). Par les étapes 2 et 3 et $\Gamma(\frac12) = \sqrt\pi$,
  $$V_n = \frac{\pi^{\frac{n-1}2}}{\Gamma(\frac{n+1}2)}\cdot\frac{\sqrt\pi\,\Gamma(\frac{n+1}2)}{\Gamma(\frac n2 + 1)} = \frac{\pi^{n/2}}{\Gamma(\frac n2 + 1)}\qquad\Big(\tfrac{n-1}2 + 1 = \tfrac{n+1}2\Big).$$

**Étape 5 (valeurs)**　Par $\Gamma(s + 1) = s\Gamma(s)$ : $\Gamma(2) = 1$, $\Gamma(\frac52) = \frac32\cdot\frac12\sqrt\pi = \frac34\sqrt\pi$, $\Gamma(3) = 2$, $\Gamma(\frac72) = \frac52\cdot\frac34\sqrt\pi = \frac{15}8\sqrt\pi$. D'où $V_2 = \pi$, $V_3 = \pi^{3/2}\cdot\frac4{3\sqrt\pi} = \frac43\pi$, $V_4 = \frac{\pi^2}2$, $V_5 = \pi^{5/2}\cdot\frac8{15\sqrt\pi} = \frac{8\pi^2}{15}$.

**Étape 6 ($V_n \to 0$)**　D'après la formule et $\Gamma(\frac n2 + 1) = \frac n2\Gamma(\frac n2)$, pour $n \ge 3$,
$$\frac{V_n}{V_{n-2}} = \frac{\pi^{n/2}}{\pi^{(n-2)/2}}\cdot\frac{\Gamma(\frac n2)}{\Gamma(\frac n2 + 1)} = \frac{2\pi}n.$$
Posons $q = \frac{2\pi}7 < 1$ ($2\pi \approx 6{,}283 < 7$). Pour $n \ge 7$, $V_n \le qV_{n-2}$ ; par récurrence $V_{5+2k} \le q^kV_5$ et $V_{6+2k} \le q^kV_6$ ($k \ge 0$), qui tendent vers $0$ ; donc $V_n \to 0$. (On peut aussi invoquer la formule de Stirling {@fr:stirling-gamma} : $\Gamma(\frac n2 + 1)$ croît bien plus vite que $\pi^{n/2}$.)
:::

::: rem zh="高维几何的反直觉"
1. **$V_n$ 在 $n = 5$ 时达到最大**，然后迅速趋于 $0$：$V_4 \approx 4.935$，$V_5 \approx 5.264$，$V_6 \approx 5.168$，$V_7 \approx 4.725$，$V_{12} \approx 1.335$。由 $V_n/V_{n-2} = 2\pi/n$，偶数项在 $n = 6$ 处最大、奇数项在 $n = 5$ 处最大，而 $V_5 > V_6$。
2. **立方体**：单位立方体 $[-\frac12, \frac12]^n$ 的体积始终为 $1$，但它的顶点到中心的距离 $\frac{\sqrt n}{2} \to \infty$。
3. **体积集中在表面附近**：由第 1 步的缩放，球壳 $\{1 - \eps \le \norm x_2 \le 1\}$ 占球体积的比例是 $1 - (1 - \eps)^n \to 1$；例如 $n = 100$、$\eps = 0.1$ 时比例约为 $0.99997$。
4. **体积集中在赤道附近**：第 2 步的截面体积正比于 $(1 - t^2)^{\frac{n-1}2} \le \e^{-\frac{(n-1)t^2}2}$（由 $1 - u \le \e^{-u}$），当 $n$ 很大时集中在宽度约 $\frac1{\sqrt n}$ 的薄片 $\abs{x_n} \lesssim \frac1{\sqrt n}$ 里。

这是**测度集中现象**，是高维概率与数据科学的重要现象。
:::

::: q
用递推 $V_n = \frac{2\pi}nV_{n-2}$ 求 $V_6$ 与 $V_7$，并与公式 $V_n = \pi^{n/2}/\Gamma(\frac n2 + 1)$ 核对。
:::

::: ans
$V_6 = \frac{2\pi}6V_4 = \frac\pi3\cdot\frac{\pi^2}2 = \frac{\pi^3}6$，与 $\pi^3/\Gamma(4) = \pi^3/3!$ 一致。$V_7 = \frac{2\pi}7V_5 = \frac{2\pi}7\cdot\frac{8\pi^2}{15} = \frac{16\pi^3}{105}$；而 $\Gamma(\frac92) = \frac72\cdot\frac52\cdot\frac32\cdot\frac12\sqrt\pi = \frac{105}{16}\sqrt\pi$，$\pi^{7/2}/\Gamma(\frac92) = \frac{16\pi^3}{105}$，一致。数值 $V_6 \approx 5.168$，$V_7 \approx 4.725$。
:::

::: q
用 {@beta-gamma} 证明中的角度积分 $J(x, y) = \int_0^{\pi/2}\cos^{2x-1}\theta\sin^{2y-1}\theta\,\dd\theta = \frac12\mathrm B(x, y)$ 计算 $\int_0^{\pi/2}\sin^4\theta\,\dd\theta$。
:::

::: ans
需要 $2x - 1 = 0$、$2y - 1 = 4$，即 $x = \frac12$、$y = \frac52$。于是
$$\int_0^{\pi/2}\sin^4\theta\,\dd\theta = \frac12\mathrm B\Big(\frac12, \frac52\Big) = \frac{\Gamma(\frac12)\Gamma(\frac52)}{2\,\Gamma(3)} = \frac{\sqrt\pi\cdot\frac34\sqrt\pi}{2\cdot2} = \frac{3\pi}{16},$$
与 Wallis 积分的结果一致。
:::

## 曲线积分与 Green–Riemann 公式

一元的微积分基本定理说：$\int_a^bF' = F(b) - F(a)$，区间上导数的积分只依赖于边界（两个端点）。本节把它推广到平面：先定义沿曲线的积分（力场做的功），看到恰当形式的曲线积分只依赖于端点；再证明 Green–Riemann 公式——区域上「旋度」的二重积分等于沿边界的曲线积分。

::: def id=def-integrale-curviligne zh="曲线积分（第二型）" en="Line integral of a 1-form" fr="Intégrale curviligne d'une forme différentielle" ru="Криволинейный интеграл второго рода"
设 $U \subset \R^2$ 是开集，$\gamma : [a, b] \to U$ 是**分段 $\Cc^1$ 的路径**：$\gamma = (x, y)$ 连续，且存在分点 $a = t_0 < t_1 < \dots < t_k = b$，使 $\gamma$ 在每个 $[t_{i-1}, t_i]$ 上是 $\Cc^1$ 的（端点处取单侧导数）。若 $\gamma(a) = \gamma(b)$，称 $\gamma$ 为**闭路径**。设 $\omega = P\,\dd x + Q\,\dd y$ 是 $U$ 上连续的**微分 1-形式**（等价地，向量场 $V = (P, Q)$）。定义
$$\int_\gamma\omega = \int_a^b\Big(P(\gamma(t))\,x'(t) + Q(\gamma(t))\,y'(t)\Big)\dd t = \int_a^b\ps{V(\gamma(t)), \gamma'(t)}\,\dd t,$$
其中 $\int_a^b$ 理解为 $\sum_{i=1}^k\int_{t_{i-1}}^{t_i}$。闭路径上的积分也记作 $\oint_\gamma\omega$。物理意义：力场 $V$ 沿路径所做的功。它与保持方向的重新参数化无关，反向时变号（{@c11-reparametrage}）。
:::

::: fr
Soient $U \subset \R^2$ un ouvert et $\gamma : [a, b] \to U$ un **chemin de classe $\Cc^1$ par morceaux** : $\gamma = (x, y)$ est continu et il existe une subdivision $a = t_0 < t_1 < \dots < t_k = b$ telle que $\gamma$ soit de classe $\Cc^1$ sur chaque $[t_{i-1}, t_i]$ (dérivées à droite et à gauche aux extrémités). Si $\gamma(a) = \gamma(b)$, on dit que $\gamma$ est un **lacet** (chemin fermé). Soit $\omega = P\,\dd x + Q\,\dd y$ une **forme différentielle de degré 1** continue sur $U$ (de manière équivalente, un champ de vecteurs $V = (P, Q)$). On pose
$$\int_\gamma\omega = \int_a^b\Big(P(\gamma(t))\,x'(t) + Q(\gamma(t))\,y'(t)\Big)\dd t = \int_a^b\ps{V(\gamma(t)), \gamma'(t)}\,\dd t,$$
où $\int_a^b$ signifie $\sum_{i=1}^k\int_{t_{i-1}}^{t_i}$. Sur un lacet, on note aussi $\oint_\gamma\omega$. Interprétation physique : travail du champ de forces $V$ le long du chemin. L'intégrale ne dépend pas d'un reparamétrage qui conserve le sens de parcours et change de signe quand on renverse ce sens ({@fr:c11-reparametrage}).
:::

::: prop id=c11-reparametrage zh="曲线积分与参数化无关" en="Invariance under reparametrization" fr="Invariance par reparamétrage" ru="Независимость криволинейного интеграла от параметризации" lvl=1
设 $\gamma : [a, b] \to U$ 分段 $\Cc^1$，$\varphi : [c, d] \to [a, b]$ 是 $\Cc^1$ 双射（因而严格单调）。则 $\gamma \circ \varphi$ 分段 $\Cc^1$，且
$$\int_{\gamma\circ\varphi}\omega = \int_\gamma\omega\ \ (\varphi\text{ 递增}),\qquad \int_{\gamma\circ\varphi}\omega = -\int_\gamma\omega\ \ (\varphi\text{ 递减}).$$
特别地，反向路径 $\gamma^-(t) = \gamma(a + b - t)$ 满足 $\int_{\gamma^-}\omega = -\int_\gamma\omega$。此外，对 $a < c' < b$，$\int_\gamma\omega = \int_{\gamma|_{[a,c']}}\omega + \int_{\gamma|_{[c',b]}}\omega$（Chasles 关系）。
:::

::: fr
Soient $\gamma : [a, b] \to U$ de classe $\Cc^1$ par morceaux et $\varphi : [c, d] \to [a, b]$ une bijection de classe $\Cc^1$ (donc strictement monotone). Alors $\gamma \circ \varphi$ est $\Cc^1$ par morceaux et
$$\int_{\gamma\circ\varphi}\omega = \int_\gamma\omega\ \ (\varphi\text{ croissante}),\qquad \int_{\gamma\circ\varphi}\omega = -\int_\gamma\omega\ \ (\varphi\text{ décroissante}).$$
En particulier, le chemin opposé $\gamma^-(t) = \gamma(a + b - t)$ vérifie $\int_{\gamma^-}\omega = -\int_\gamma\omega$. De plus, pour $a < c' < b$, $\int_\gamma\omega = \int_{\gamma|_{[a,c']}}\omega + \int_{\gamma|_{[c',b]}}\omega$ (relation de Chasles).
:::

::: proof
▷ 思路：在每个 $\Cc^1$ 段上用一元换元公式 $\int_\alpha^\beta g(\varphi(s))\varphi'(s)\,\dd s = \int_{\varphi(\alpha)}^{\varphi(\beta)}g(t)\,\dd t$（$g$ 连续，$\varphi$ 为 $\Cc^1$），再把各段加起来。

**第 1 步（$\varphi$ 递增时的分点）**　设 $a = t_0 < \dots < t_k = b$ 是 $\gamma$ 的分点，令 $s_i = \varphi^{-1}(t_i)$，则 $c = s_0 < \dots < s_k = d$。$\varphi$ 把 $[s_{i-1}, s_i]$ 映到 $[t_{i-1}, t_i]$，$\gamma$ 在其上是 $\Cc^1$ 的，由一元链式法则，$\gamma \circ \varphi$ 在 $[s_{i-1}, s_i]$ 上是 $\Cc^1$ 的，且 $(\gamma \circ \varphi)'(s) = \gamma'(\varphi(s))\varphi'(s)$。所以 $\gamma \circ \varphi$ 分段 $\Cc^1$。

**第 2 步（每一段）**　令 $g_i(t) = \ps{V(\gamma(t)), \gamma'(t)}$，它在 $[t_{i-1}, t_i]$ 上连续。由第 1 步与换元公式，
$$\int_{s_{i-1}}^{s_i}\ps{V(\gamma(\varphi(s))), \gamma'(\varphi(s))\varphi'(s)}\,\dd s = \int_{s_{i-1}}^{s_i}g_i(\varphi(s))\varphi'(s)\,\dd s = \int_{t_{i-1}}^{t_i}g_i(t)\,\dd t.$$

**第 3 步（求和）**　对 $i = 1, \dots, k$ 求和，得 $\int_{\gamma\circ\varphi}\omega = \int_\gamma\omega$。

**第 4 步（$\varphi$ 递减）**　此时 $\varphi(c) = b$、$\varphi(d) = a$，令 $s_i = \varphi^{-1}(t_{k-i})$，则 $c = s_0 < \dots < s_k = d$，$\varphi$ 把 $[s_{i-1}, s_i]$ 映到 $[t_{k-i}, t_{k-i+1}]$。同第 2 步，换元得 $\int_{s_{i-1}}^{s_i}(\dots) = \int_{t_{k-i+1}}^{t_{k-i}}g_{k-i+1} = -\int_{t_{k-i}}^{t_{k-i+1}}g_{k-i+1}$，求和得 $-\int_\gamma\omega$。反向路径对应 $\varphi(t) = a + b - t$，递减。

**第 5 步（Chasles）**　把 $c'$ 加入 $\gamma$ 的分点，定义中的和按 $c'$ 分成两部分。这就证明了命题。
:::

::: fr
▷ Méthode : sur chaque morceau $\Cc^1$, on applique la formule de changement de variable en dimension 1, $\int_\alpha^\beta g(\varphi(s))\varphi'(s)\,\dd s = \int_{\varphi(\alpha)}^{\varphi(\beta)}g(t)\,\dd t$ ($g$ continue, $\varphi$ de classe $\Cc^1$), puis on somme.

**Étape 1 (subdivision, $\varphi$ croissante)**　Soit $a = t_0 < \dots < t_k = b$ une subdivision adaptée à $\gamma$ ; posons $s_i = \varphi^{-1}(t_i)$, de sorte que $c = s_0 < \dots < s_k = d$. $\varphi$ envoie $[s_{i-1}, s_i]$ dans $[t_{i-1}, t_i]$, où $\gamma$ est $\Cc^1$ ; par la règle de la chaîne en dimension 1, $\gamma \circ \varphi$ est $\Cc^1$ sur $[s_{i-1}, s_i]$ et $(\gamma \circ \varphi)'(s) = \gamma'(\varphi(s))\varphi'(s)$. Donc $\gamma \circ \varphi$ est $\Cc^1$ par morceaux.

**Étape 2 (chaque morceau)**　Posons $g_i(t) = \ps{V(\gamma(t)), \gamma'(t)}$, continue sur $[t_{i-1}, t_i]$. Par l'étape 1 et le changement de variable,
$$\int_{s_{i-1}}^{s_i}\ps{V(\gamma(\varphi(s))), \gamma'(\varphi(s))\varphi'(s)}\,\dd s = \int_{s_{i-1}}^{s_i}g_i(\varphi(s))\varphi'(s)\,\dd s = \int_{t_{i-1}}^{t_i}g_i(t)\,\dd t.$$

**Étape 3 (sommation)**　En sommant sur $i = 1, \dots, k$, on obtient $\int_{\gamma\circ\varphi}\omega = \int_\gamma\omega$.

**Étape 4 ($\varphi$ décroissante)**　Alors $\varphi(c) = b$ et $\varphi(d) = a$ ; posons $s_i = \varphi^{-1}(t_{k-i})$, de sorte que $c = s_0 < \dots < s_k = d$ et que $\varphi$ envoie $[s_{i-1}, s_i]$ sur $[t_{k-i}, t_{k-i+1}]$. Comme à l'étape 2, le changement de variable donne $\int_{s_{i-1}}^{s_i}(\dots) = \int_{t_{k-i+1}}^{t_{k-i}}g_{k-i+1} = -\int_{t_{k-i}}^{t_{k-i+1}}g_{k-i+1}$, et la somme vaut $-\int_\gamma\omega$. Le chemin opposé correspond à $\varphi(t) = a + b - t$, décroissante.

**Étape 5 (Chasles)**　On ajoute $c'$ aux points de la subdivision de $\gamma$ ; la somme de la définition se coupe en deux au point $c'$. Ceci démontre la proposition.
:::

::: ex id=c11-ex-chemins lvl=1
**积分一般依赖于路径。** 从 $(0, 0)$ 到 $(1, 1)$ 取两条路径：线段 $\gamma_1(t) = (t, t)$ 与抛物线 $\gamma_2(t) = (t, t^2)$，$t \in [0, 1]$。

1. $\omega = x\,\dd y$：$\int_{\gamma_1}\omega = \int_0^1t\cdot1\,\dd t = \frac12$，$\int_{\gamma_2}\omega = \int_0^1t\cdot2t\,\dd t = \frac23$。两者不同。
2. $\omega = y\,\dd x + x\,\dd y$：$\int_{\gamma_1}\omega = \int_0^1(t + t)\,\dd t = 1$，$\int_{\gamma_2}\omega = \int_0^1(t^2 + t\cdot2t)\,\dd t = \int_0^13t^2\,\dd t = 1$。两者相同——因为 $\omega = \dd(xy)$，见下面的 {@forme-exacte}：积分 $= xy\big|_{(0,0)}^{(1,1)} = 1$。
:::

::: prop id=forme-exacte zh="恰当形式" en="Exact forms" fr="Formes exactes" ru="Точные формы" lvl=1
若 $\omega = \dd f$（即 $V = \nabla f$，$f \in \Cc^1(U)$），则对 $U$ 中任意分段 $\Cc^1$ 路径 $\gamma : [a, b] \to U$，$\int_\gamma\omega = f(\gamma(b)) - f(\gamma(a))$ 只依赖于端点。特别地，沿闭路径的积分为 $0$。
:::

::: fr
Si $\omega = \dd f$ (c'est-à-dire $V = \nabla f$, avec $f \in \Cc^1(U)$), alors pour tout chemin $\gamma : [a, b] \to U$ de classe $\Cc^1$ par morceaux, $\int_\gamma\omega = f(\gamma(b)) - f(\gamma(a))$ ne dépend que des extrémités. En particulier, l'intégrale sur un lacet est nulle.
:::

::: proof
▷ 思路：沿路径，$f \circ \gamma$ 的导数恰好是被积函数；在每个 $\Cc^1$ 段上用微积分基本定理，然后各段相加，中间的项相消（望远镜求和）。

**翻译假设**　$\omega = \dd f$ 意味着在 $U$ 上 $P = \frac{\partial f}{\partial x}$，$Q = \frac{\partial f}{\partial y}$，且 $f$ 是 $\Cc^1$ 的。

**第 1 步（导数）**　设 $a = t_0 < \dots < t_k = b$ 是 $\gamma$ 的分点。在 $[t_{i-1}, t_i]$ 上，$h = f \circ \gamma$ 是 $\Cc^1$ 的，由链式法则 {@chain-rule}，
$$h'(t) = \frac{\partial f}{\partial x}(\gamma(t))\,x'(t) + \frac{\partial f}{\partial y}(\gamma(t))\,y'(t) = P(\gamma(t))\,x'(t) + Q(\gamma(t))\,y'(t).$$

**第 2 步（微积分基本定理）**　$\int_{t_{i-1}}^{t_i}\big(P(\gamma)x' + Q(\gamma)y'\big)\,\dd t = h(t_i) - h(t_{i-1}) = f(\gamma(t_i)) - f(\gamma(t_{i-1}))$。

**第 3 步（求和）**　对 $i$ 求和，中间项相消：$\int_\gamma\omega = f(\gamma(t_k)) - f(\gamma(t_0)) = f(\gamma(b)) - f(\gamma(a))$。若 $\gamma$ 是闭路径，$\gamma(a) = \gamma(b)$，积分为 $0$。
:::

::: fr
▷ Méthode : le long du chemin, la dérivée de $f \circ \gamma$ est exactement l'intégrande ; on applique le théorème fondamental de l'analyse sur chaque morceau $\Cc^1$, puis on somme : les termes intermédiaires se télescopent.

**On traduit l'hypothèse**　$\omega = \dd f$ signifie que $P = \frac{\partial f}{\partial x}$ et $Q = \frac{\partial f}{\partial y}$ sur $U$, avec $f$ de classe $\Cc^1$.

**Étape 1 (dérivée)**　Soit $a = t_0 < \dots < t_k = b$ une subdivision adaptée à $\gamma$. Sur $[t_{i-1}, t_i]$, $h = f \circ \gamma$ est $\Cc^1$ et, par la règle de la chaîne ({@fr:chain-rule}),
$$h'(t) = \frac{\partial f}{\partial x}(\gamma(t))\,x'(t) + \frac{\partial f}{\partial y}(\gamma(t))\,y'(t) = P(\gamma(t))\,x'(t) + Q(\gamma(t))\,y'(t).$$

**Étape 2 (théorème fondamental de l'analyse)**　$\int_{t_{i-1}}^{t_i}\big(P(\gamma)x' + Q(\gamma)y'\big)\,\dd t = h(t_i) - h(t_{i-1}) = f(\gamma(t_i)) - f(\gamma(t_{i-1}))$.

**Étape 3 (sommation)**　En sommant sur $i$, les termes intermédiaires se télescopent : $\int_\gamma\omega = f(\gamma(t_k)) - f(\gamma(t_0)) = f(\gamma(b)) - f(\gamma(a))$. Si $\gamma$ est un lacet, $\gamma(a) = \gamma(b)$ et l'intégrale est nulle.
:::

::: rem
**逆命题与「闭」的概念。**

1. **逆命题成立**：若 $U$ 是连通开集，$\omega$ 连续，且沿 $U$ 中每条分段 $\Cc^1$ 闭路径的积分为 $0$，则 $\omega$ 是恰当的。思路：固定 $z_0 \in U$，令 $f(z) = \int_\gamma\omega$，$\gamma$ 是从 $z_0$ 到 $z$ 的任意分段 $\Cc^1$ 路径（连通开集中这样的路径存在，例如折线）；两条这样的路径 $\gamma_1, \gamma_2$ 拼成闭路径 $\gamma_1$ 接 $\gamma_2^-$，由假设与 {@c11-reparametrage} 积分相同，所以 $f$ 定义合理。再沿水平小线段 $s \mapsto z + s e_1$（$0 \le s \le h$）计算：$\frac{f(z + he_1) - f(z)}h = \frac1h\int_0^hP(z + se_1)\,\dd s \to P(z)$，所以 $\partial_xf = P$；把水平线段换成竖直线段 $s \mapsto z + se_2$，得 $\partial_yf = Q$。
2. **恰当 ⇒ 闭**：若 $P, Q$ 是 $\Cc^1$ 的且 $\omega = \dd f$，则 $f$ 是 $\Cc^2$ 的，由 Schwarz 定理 {@schwarz}，$\partial_yP = \partial_y\partial_xf = \partial_x\partial_yf = \partial_xQ$。满足 $\partial_yP = \partial_xQ$ 的形式称为**闭形式**。在星形开集上闭 ⇒ 恰当（{@poincare}）；没有星形条件时不成立，见下例。
:::

::: ex id=circulation-vortex lvl=1
$\omega = \dfrac{-y\,\dd x + x\,\dd y}{x^2 + y^2}$ 在 $\R^2\setminus\{0\}$ 上是**闭形式**：$P = \frac{-y}{x^2 + y^2}$，$Q = \frac x{x^2 + y^2}$，
$$\partial_yP = \frac{-(x^2 + y^2) + 2y^2}{(x^2 + y^2)^2} = \frac{y^2 - x^2}{(x^2 + y^2)^2},\qquad \partial_xQ = \frac{(x^2 + y^2) - 2x^2}{(x^2 + y^2)^2} = \frac{y^2 - x^2}{(x^2 + y^2)^2}.$$
但沿单位圆 $\gamma(t) = (\cos t, \sin t)$（$x^2 + y^2 = 1$，$x' = -\sin t$，$y' = \cos t$），
$$\int_\gamma\omega = \int_0^{2\pi}\big((-\sin t)(-\sin t) + \cos t\cos t\big)\,\dd t = \int_0^{2\pi}(\sin^2t + \cos^2t)\,\dd t = 2\pi \ne 0,$$
由 {@forme-exacte}，它不是恰当形式。这完成了第 9 章 {@poincare} 之后反例的论证。（局部地 $\omega = \dd\theta$，$\theta$ 是极角，但 $\theta$ 不能在整个 $\R^2 \setminus \{0\}$ 上连续地定义。）
:::

::: thm id=green-riemann zh="Green–Riemann 公式" en="Green's theorem" fr="Formule de Green–Riemann" ru="Формула Грина" lvl=1
设 $D \subset \R^2$ 既是 $x$-型又是 $y$-型基本区域：
$$D = \{a \le x \le b,\ \varphi_1(x) \le y \le \varphi_2(x)\} = \{c \le y \le d,\ \psi_1(y) \le x \le \psi_2(y)\},$$
其边界 $\partial D$ 是分段 $\Cc^1$ 的闭曲线，取**正向**（逆时针，区域在左侧）。若 $P, Q$ 在 $D$ 的一个邻域上是 $\Cc^1$ 的，则
$$\oint_{\partial D}P\,\dd x + Q\,\dd y = \iint_D\Big(\frac{\partial Q}{\partial x} - \frac{\partial P}{\partial y}\Big)\dd x\,\dd y.$$
「正向」的具体含义：按 $y$-型描述，$\partial D$ 依次是下边 $\Gamma_1$（$y = \varphi_1(x)$，$x$ 从 $a$ 增到 $b$）、右边竖直线段 $\{b\} \times [\varphi_1(b), \varphi_2(b)]$（向上）、上边 $\Gamma_2$（$y = \varphi_2(x)$，$x$ 从 $b$ 减到 $a$）、左边竖直线段（向下）；按 $x$-型描述，依次是右边（$x = \psi_2(y)$，$y$ 从 $c$ 增到 $d$）、上边水平线段（向左）、左边（$x = \psi_1(y)$，$y$ 从 $d$ 减到 $c$）、下边水平线段（向右）。两种描述是同一条逆时针闭曲线（这一几何事实我们承认）；线段可以退化为一点。
:::

::: fr
Soit $D \subset \R^2$ un domaine élémentaire à la fois de type $x$ et de type $y$ :
$$D = \{a \le x \le b,\ \varphi_1(x) \le y \le \varphi_2(x)\} = \{c \le y \le d,\ \psi_1(y) \le x \le \psi_2(y)\},$$
dont le bord $\partial D$ est une courbe fermée $\Cc^1$ par morceaux, parcourue dans le **sens direct** (sens trigonométrique, le domaine à gauche). Si $P$ et $Q$ sont de classe $\Cc^1$ sur un voisinage de $D$, alors
$$\oint_{\partial D}P\,\dd x + Q\,\dd y = \iint_D\Big(\frac{\partial Q}{\partial x} - \frac{\partial P}{\partial y}\Big)\dd x\,\dd y.$$
Sens précis du « sens direct » : dans la description de type $y$, $\partial D$ est formé successivement du bord inférieur $\Gamma_1$ ($y = \varphi_1(x)$, $x$ croissant de $a$ à $b$), du segment vertical droit $\{b\} \times [\varphi_1(b), \varphi_2(b)]$ (vers le haut), du bord supérieur $\Gamma_2$ ($y = \varphi_2(x)$, $x$ décroissant de $b$ à $a$) et du segment vertical gauche (vers le bas) ; dans la description de type $x$, du bord droit ($x = \psi_2(y)$, $y$ croissant de $c$ à $d$), du segment horizontal supérieur (vers la gauche), du bord gauche ($x = \psi_1(y)$, $y$ décroissant de $d$ à $c$) et du segment horizontal inférieur (vers la droite). Les deux descriptions définissent la même courbe fermée orientée dans le sens direct (fait géométrique que nous admettons) ; les segments peuvent être réduits à un point.
:::

::: proof
▷ 思路：分别证明 $\oint P\,\dd x = -\iint\partial_yP$（用 $y$-型描述）和 $\oint Q\,\dd y = \iint\partial_xQ$（用 $x$-型描述），两式相加。每一式都是：二重积分一侧，内层用微积分基本定理、外层用 Fubini；曲线积分一侧，用一元换元把边界上的积分化成对 $x$（或 $y$）的积分。

**第 1 步（$\iint_D\partial_yP$）**　$\partial_yP$ 在 $D$ 上连续，由 {@fubini-domaine}，
$$\iint_D\frac{\partial P}{\partial y} = \int_a^b\Big(\int_{\varphi_1(x)}^{\varphi_2(x)}\frac{\partial P}{\partial y}(x, y)\,\dd y\Big)\dd x = \int_a^bP(x, \varphi_2(x))\,\dd x - \int_a^bP(x, \varphi_1(x))\,\dd x,$$
其中内层用了微积分基本定理（$x$ 固定时 $y \mapsto P(x, y)$ 在 $[\varphi_1(x), \varphi_2(x)]$ 上是 $\Cc^1$ 的）。

**第 2 步（下边与上边上的 $\int P\,\dd x$）**　设下边 $\Gamma_1$ 的参数化为 $t \mapsto (x(t), y(t))$，$t \in [\alpha, \beta]$，分段 $\Cc^1$，$y(t) = \varphi_1(x(t))$，$x(\alpha) = a$，$x(\beta) = b$。函数 $g(s) = P(s, \varphi_1(s))$ 在 $[a, b]$ 上连续，且在每个 $\Cc^1$ 段上 $P(x(t), y(t))\,x'(t) = g(x(t))\,x'(t)$。一元换元公式 $\int_{t_{i-1}}^{t_i}g(x(t))x'(t)\,\dd t = \int_{x(t_{i-1})}^{x(t_i)}g(s)\,\dd s$ 对任何 $\Cc^1$ 函数 $x(\cdot)$ 成立（不要求单调：若 $G' = g$，则 $(G \circ x)' = g(x)\,x'$），各段相加（积分限首尾相接）得
$$\int_{\Gamma_1}P\,\dd x = \int_a^bP(s, \varphi_1(s))\,\dd s.$$
注意这里没有出现 $\varphi_1'$，所以 $\varphi_1$ 不必可导（例如圆盘在 $x = \pm R$ 处切线竖直）。把 $\varphi_1$ 换成 $\varphi_2$、把「$x$ 从 $a$ 到 $b$」换成「从 $b$ 到 $a$」，同样得 $\int_{\Gamma_2}P\,\dd x = \int_b^aP(s, \varphi_2(s))\,\dd s = -\int_a^bP(s, \varphi_2(s))\,\dd s$。

**第 3 步（竖直线段）**　在竖直线段上 $x(t)$ 是常数，$x'(t) = 0$，所以 $\int P\,\dd x = 0$；退化为一点时没有贡献。

**第 4 步（第一个等式）**　由 Chasles 关系（{@c11-reparametrage}）把四段相加，再与第 1 步比较：
$$\oint_{\partial D}P\,\dd x = \int_a^bP(s, \varphi_1(s))\,\dd s - \int_a^bP(s, \varphi_2(s))\,\dd s = -\iint_D\frac{\partial P}{\partial y}.$$

**第 5 步（第二个等式，用 $x$-型描述）**　由 {@fubini-domaine} 的 $x$-型公式与微积分基本定理，
$$\iint_D\frac{\partial Q}{\partial x} = \int_c^d\Big(\int_{\psi_1(y)}^{\psi_2(y)}\frac{\partial Q}{\partial x}\,\dd x\Big)\dd y = \int_c^dQ(\psi_2(y), y)\,\dd y - \int_c^dQ(\psi_1(y), y)\,\dd y.$$
边界一侧：在右边（$x = \psi_2(y)$，$y$ 从 $c$ 增到 $d$）上，与第 2 步相同的换元（以 $s = y(t)$，$g(s) = Q(\psi_2(s), s)$）给出 $\int Q\,\dd y = \int_c^dQ(\psi_2(s), s)\,\dd s$；在左边（$y$ 从 $d$ 减到 $c$）上给出 $\int_d^cQ(\psi_1(s), s)\,\dd s = -\int_c^dQ(\psi_1(s), s)\,\dd s$；在两条水平线段上 $y' = 0$，没有贡献。所以 $\oint_{\partial D}Q\,\dd y = \iint_D\partial_xQ$。两个等式的符号不同，是因为沿正向，$y$-型的下边（对应被减去的 $\varphi_1$）是向右走的，而 $x$-型的右边（对应被加上的 $\psi_2$）是向上走的。

**第 6 步（结论）**　第 4、5 步相加即得 Green–Riemann 公式。
:::

::: fr
▷ Méthode : on montre séparément $\oint P\,\dd x = -\iint\partial_yP$ (description de type $y$) et $\oint Q\,\dd y = \iint\partial_xQ$ (description de type $x$), puis on additionne. Pour chacune : côté intégrale double, théorème fondamental de l'analyse à l'intérieur et Fubini à l'extérieur ; côté intégrale curviligne, un changement de variable en dimension 1 ramène l'intégrale sur le bord à une intégrale en $x$ (ou en $y$).

**Étape 1 ($\iint_D\partial_yP$)**　$\partial_yP$ est continue sur $D$ ; d'après le {@fr:fubini-domaine},
$$\iint_D\frac{\partial P}{\partial y} = \int_a^b\Big(\int_{\varphi_1(x)}^{\varphi_2(x)}\frac{\partial P}{\partial y}(x, y)\,\dd y\Big)\dd x = \int_a^bP(x, \varphi_2(x))\,\dd x - \int_a^bP(x, \varphi_1(x))\,\dd x,$$
où l'on a appliqué le théorème fondamental de l'analyse à l'intérieur ($x$ fixé, $y \mapsto P(x, y)$ est $\Cc^1$ sur $[\varphi_1(x), \varphi_2(x)]$).

**Étape 2 ($\int P\,\dd x$ sur les bords inférieur et supérieur)**　Soit $t \mapsto (x(t), y(t))$, $t \in [\alpha, \beta]$, un paramétrage $\Cc^1$ par morceaux du bord inférieur $\Gamma_1$, avec $y(t) = \varphi_1(x(t))$, $x(\alpha) = a$, $x(\beta) = b$. La fonction $g(s) = P(s, \varphi_1(s))$ est continue sur $[a, b]$ et, sur chaque morceau $\Cc^1$, $P(x(t), y(t))\,x'(t) = g(x(t))\,x'(t)$. La formule de changement de variable $\int_{t_{i-1}}^{t_i}g(x(t))x'(t)\,\dd t = \int_{x(t_{i-1})}^{x(t_i)}g(s)\,\dd s$ est valable pour toute fonction $x(\cdot)$ de classe $\Cc^1$ (sans hypothèse de monotonie : si $G' = g$, alors $(G \circ x)' = g(x)\,x'$) ; en sommant (les bornes se raccordent), on obtient
$$\int_{\Gamma_1}P\,\dd x = \int_a^bP(s, \varphi_1(s))\,\dd s.$$
Remarquons que $\varphi_1'$ n'intervient pas : $\varphi_1$ n'a pas besoin d'être dérivable (par exemple pour le disque, dont les tangentes sont verticales en $x = \pm R$). En remplaçant $\varphi_1$ par $\varphi_2$ et « $x$ de $a$ à $b$ » par « de $b$ à $a$ », on obtient de même $\int_{\Gamma_2}P\,\dd x = \int_b^aP(s, \varphi_2(s))\,\dd s = -\int_a^bP(s, \varphi_2(s))\,\dd s$.

**Étape 3 (segments verticaux)**　Sur un segment vertical, $x(t)$ est constant, $x'(t) = 0$, donc $\int P\,\dd x = 0$ ; un segment réduit à un point ne contribue pas.

**Étape 4 (première égalité)**　Par la relation de Chasles ({@fr:c11-reparametrage}), on additionne les quatre morceaux et l'on compare à l'étape 1 :
$$\oint_{\partial D}P\,\dd x = \int_a^bP(s, \varphi_1(s))\,\dd s - \int_a^bP(s, \varphi_2(s))\,\dd s = -\iint_D\frac{\partial P}{\partial y}.$$

**Étape 5 (seconde égalité, description de type $x$)**　Par la formule de type $x$ du {@fr:fubini-domaine} et le théorème fondamental de l'analyse,
$$\iint_D\frac{\partial Q}{\partial x} = \int_c^d\Big(\int_{\psi_1(y)}^{\psi_2(y)}\frac{\partial Q}{\partial x}\,\dd x\Big)\dd y = \int_c^dQ(\psi_2(y), y)\,\dd y - \int_c^dQ(\psi_1(y), y)\,\dd y.$$
Côté bord : sur le bord droit ($x = \psi_2(y)$, $y$ croissant de $c$ à $d$), le même changement de variable qu'à l'étape 2 (avec $s = y(t)$, $g(s) = Q(\psi_2(s), s)$) donne $\int Q\,\dd y = \int_c^dQ(\psi_2(s), s)\,\dd s$ ; sur le bord gauche ($y$ décroissant de $d$ à $c$), il donne $\int_d^cQ(\psi_1(s), s)\,\dd s = -\int_c^dQ(\psi_1(s), s)\,\dd s$ ; sur les deux segments horizontaux, $y' = 0$ et la contribution est nulle. Donc $\oint_{\partial D}Q\,\dd y = \iint_D\partial_xQ$. Les signes diffèrent parce que, dans le sens direct, le bord inférieur de type $y$ (associé à $\varphi_1$, qui est retranché) est parcouru vers la droite, tandis que le bord droit de type $x$ (associé à $\psi_2$, qui est ajouté) est parcouru vers le haut.

**Étape 6 (conclusion)**　En additionnant les étapes 4 et 5, on obtient la formule de Green–Riemann.
:::

::: rem
**假设的作用。**

1. **区域内不能有奇点。** 对漩涡形式 $\omega$（{@circulation-vortex}）和单位圆盘 $D$：左边 $= 2\pi$，而在 $D \setminus \{0\}$ 上 $\partial_xQ - \partial_yP = 0$。公式不适用，因为 $P, Q$ 在 $0 \in D$ 处没有定义，更不是 $\Cc^1$ 的。这个例子说明「$P, Q$ 在 $D$ 的邻域上 $\Cc^1$」不能减弱为「在 $D$ 去掉一点后 $\Cc^1$」。
2. **只需要一种类型。** 证明的第 1–4 步只用了 $y$-型描述：对 $y$-型区域，$\oint_{\partial D}P\,\dd x = -\iint_D\partial_yP$ 已经成立；同样，对 $x$-型区域，$\oint_{\partial D}Q\,\dd y = \iint_D\partial_xQ$ 成立。
3. **定向。** 若边界按顺时针方向走，由 {@c11-reparametrage}，左边变号，公式变成 $-\iint_D(\partial_xQ - \partial_yP)$。
:::

::: cor id=aire-green zh="用曲线积分计算面积" en="Area as a line integral" fr="Calcul d'aire par une intégrale curviligne" ru="Площадь через криволинейный интеграл" lvl=1
在 {@green-riemann} 的条件下，
$$\operatorname{aire}(D) = \oint_{\partial D}x\,\dd y = -\oint_{\partial D}y\,\dd x = \frac12\oint_{\partial D}(x\,\dd y - y\,\dd x).$$
例：椭圆 $x = a\cos t$，$y = b\sin t$ 的面积 $= \frac12\int_0^{2\pi}ab(\cos^2t + \sin^2t)\,\dd t = \pi ab$。这个公式也是第 5 章等周不等式 {@isoperimetrique} 中面积公式的来源。
:::

::: fr
Sous les hypothèses du {@fr:green-riemann},
$$\operatorname{aire}(D) = \oint_{\partial D}x\,\dd y = -\oint_{\partial D}y\,\dd x = \frac12\oint_{\partial D}(x\,\dd y - y\,\dd x).$$
Exemple : l'aire de l'ellipse $x = a\cos t$, $y = b\sin t$ vaut $\frac12\int_0^{2\pi}ab(\cos^2t + \sin^2t)\,\dd t = \pi ab$. C'est aussi l'origine de la formule d'aire utilisée dans l'inégalité isopérimétrique du chapitre 5 ({@fr:isoperimetrique}).
:::

::: proof
▷ 思路：选 $P, Q$ 使 $\partial_xQ - \partial_yP = 1$，则 Green–Riemann 公式右边就是 $\iint_D1 = \operatorname{aire}(D)$。

**第 1 步（三个公式）**　在 {@green-riemann} 中依次取：

- $(P, Q) = (0, x)$：$\partial_xQ - \partial_yP = 1 - 0 = 1$，得 $\oint x\,\dd y = \operatorname{aire}(D)$；
- $(P, Q) = (-y, 0)$：$\partial_xQ - \partial_yP = 0 - (-1) = 1$，得 $-\oint y\,\dd x = \operatorname{aire}(D)$；
- $(P, Q) = \frac12(-y, x)$：$\partial_xQ - \partial_yP = \frac12 + \frac12 = 1$，得 $\frac12\oint(x\,\dd y - y\,\dd x) = \operatorname{aire}(D)$。

这些 $P, Q$ 都是多项式，在 $\R^2$ 上 $\Cc^1$。

**第 2 步（椭圆）**　$D = \{\frac{x^2}{a^2} + \frac{y^2}{b^2} \le 1\}$ 是 $y$-型（$\varphi_{1,2}(x) = \mp b\sqrt{1 - x^2/a^2}$，$\abs x \le a$），由对称性也是 $x$-型。$t \mapsto (a\cos t, b\sin t)$，$t \in [0, 2\pi]$，是逆时针参数化：$t \in [\pi, 2\pi]$ 时走下边，$x = a\cos t$ 从 $-a$ 增到 $a$；$t \in [0, \pi]$ 时走上边，$x$ 从 $a$ 减到 $-a$（闭曲线从哪一点出发不影响积分，由 Chasles 关系）。代入：
$$x\,\dd y - y\,\dd x = \big(a\cos t\cdot b\cos t - b\sin t\cdot(-a\sin t)\big)\,\dd t = ab\,\dd t,$$
所以面积 $= \frac12\int_0^{2\pi}ab\,\dd t = \pi ab$。（与 {@changement-variables} 一致：椭圆是单位圆盘在 $\operatorname{diag}(a, b)$ 下的像，面积 $= \abs{ab}\cdot\pi$。）
:::

::: fr
▷ Méthode : on choisit $P, Q$ tels que $\partial_xQ - \partial_yP = 1$ ; le membre de droite de la formule de Green–Riemann est alors $\iint_D1 = \operatorname{aire}(D)$.

**Étape 1 (les trois formules)**　Dans le {@fr:green-riemann}, on prend successivement :

- $(P, Q) = (0, x)$ : $\partial_xQ - \partial_yP = 1 - 0 = 1$, d'où $\oint x\,\dd y = \operatorname{aire}(D)$ ;
- $(P, Q) = (-y, 0)$ : $\partial_xQ - \partial_yP = 0 - (-1) = 1$, d'où $-\oint y\,\dd x = \operatorname{aire}(D)$ ;
- $(P, Q) = \frac12(-y, x)$ : $\partial_xQ - \partial_yP = \frac12 + \frac12 = 1$, d'où $\frac12\oint(x\,\dd y - y\,\dd x) = \operatorname{aire}(D)$.

Ces $P, Q$ sont polynomiales, donc $\Cc^1$ sur $\R^2$.

**Étape 2 (ellipse)**　$D = \{\frac{x^2}{a^2} + \frac{y^2}{b^2} \le 1\}$ est de type $y$ ($\varphi_{1,2}(x) = \mp b\sqrt{1 - x^2/a^2}$, $\abs x \le a$) et, par symétrie, de type $x$. Le paramétrage $t \mapsto (a\cos t, b\sin t)$, $t \in [0, 2\pi]$, est direct : pour $t \in [\pi, 2\pi]$ on parcourt le bord inférieur, $x = a\cos t$ croissant de $-a$ à $a$ ; pour $t \in [0, \pi]$, le bord supérieur, $x$ décroissant de $a$ à $-a$ (le point de départ d'un lacet n'influe pas sur l'intégrale, par la relation de Chasles). On calcule
$$x\,\dd y - y\,\dd x = \big(a\cos t\cdot b\cos t - b\sin t\cdot(-a\sin t)\big)\,\dd t = ab\,\dd t,$$
donc l'aire vaut $\frac12\int_0^{2\pi}ab\,\dd t = \pi ab$. (C'est cohérent avec le {@fr:changement-variables} : l'ellipse est l'image du disque unité par $\operatorname{diag}(a, b)$, d'aire $\abs{ab}\cdot\pi$.)
:::

::: ex id=c11-ex-cycloide lvl=1
**摆线下的面积。** 半径为 $1$ 的圆沿 $x$ 轴滚动一周，圆周上一点画出摆线 $x(t) = t - \sin t$，$y(t) = 1 - \cos t$，$t \in [0, 2\pi]$。$x'(t) = 1 - \cos t \ge 0$，只在 $t = 0, 2\pi$ 处为 $0$，所以 $x$ 是 $[0, 2\pi] \to [0, 2\pi]$ 的连续严格递增双射，摆线是连续函数 $\varphi_2$ 的图像，摆线与 $x$ 轴之间的区域 $D = \{0 \le x \le 2\pi,\ 0 \le y \le \varphi_2(x)\}$ 是 $y$-型。由 {@green-riemann} 后的注第 2 条，$\operatorname{aire}(D) = -\oint_{\partial D}y\,\dd x$ 只需要 $y$-型。正向边界：下边 $x$ 轴从 $(0, 0)$ 到 $(2\pi, 0)$（$y = 0$，贡献 $0$），两条竖直线段退化为点（$\varphi_2(0) = \varphi_2(2\pi) = 0$），上边是摆线**反向**走（$t$ 从 $2\pi$ 到 $0$）。由 {@c11-reparametrage}，
$$\begin{aligned}
\operatorname{aire}(D) &= -\Big(0 - \int_0^{2\pi}y(t)\,x'(t)\,\dd t\Big) = \int_0^{2\pi}(1 - \cos t)^2\,\dd t\\
&= \int_0^{2\pi}\big(1 - 2\cos t + \cos^2t\big)\,\dd t = 2\pi - 0 + \pi = 3\pi,
\end{aligned}$$
恰是滚动圆面积的 $3$ 倍。
:::

::: rem zh="更一般的区域"
任何能被切成有限个「既是 $x$-型又是 $y$-型」的区域的 $D$ 都满足 Green–Riemann 公式：对每一块用 {@green-riemann} 再相加。二重积分一侧，各块只交于曲线段（零容度集），由 {@c11-additivite} 第 4 条相加；曲线积分一侧，内部的切割线被两侧以相反方向各经过一次，由 {@c11-reparametrage} 积分互相抵消，只剩下 $D$ 的边界。带洞的区域（例如圆环）也是如此，此时外边界逆时针、内边界顺时针（区域始终在左侧）。

**例：圆环与漩涡场。** 圆环 $A = \{1 \le x^2 + y^2 \le 4\}$ 被两条坐标轴切成四个四分之一圆环，每一块既是 $y$-型（见 {@def-domaine-elementaire} 后的例子）也是 $x$-型（交换 $x, y$ 的角色）。漩涡形式 $\omega$ 在 $\R^2 \setminus \{0\} \supset A$ 上 $\Cc^1$ 且闭，所以
$$\oint_{\abs z = 2,\ \text{逆时针}}\omega + \oint_{\abs z = 1,\ \text{顺时针}}\omega = \iint_A0 = 0,\qquad\text{即}\quad \oint_{\abs z = 2}\omega = \oint_{\abs z = 1}\omega = 2\pi.$$
环量不依赖于半径——这是复分析中 Cauchy 定理与留数的雏形。
:::

::: q
用两种方法计算 $\oint_{\mathcal C}(-y^3\,\dd x + x^3\,\dd y)$，$\mathcal C$ 是逆时针的单位圆。
:::

::: ans
**Green–Riemann**：$\partial_xQ - \partial_yP = 3x^2 + 3y^2$，用极坐标（{@c11-polaires-justif}），$\iint_{x^2+y^2\le1}3(x^2 + y^2) = 3\int_0^{2\pi}\int_0^1r^2\cdot r\,\dd r\,\dd\theta = 3\cdot2\pi\cdot\frac14 = \frac{3\pi}2$。**直接计算**：$x = \cos t$，$y = \sin t$，被积式 $= (-\sin^3t)(-\sin t) + \cos^3t\cos t = \sin^4t + \cos^4t$，而 $\int_0^{2\pi}\sin^4t\,\dd t = \int_0^{2\pi}\cos^4t\,\dd t = 4\cdot\frac{3\pi}{16} = \frac{3\pi}4$（由 §4 第 2 个「想一想」与对称性），总和 $\frac{3\pi}2$。
:::

::: q
设 $\mathcal C$ 是圆心 $(3, 0)$、半径 $1$ 的逆时针圆周。漩涡形式 $\omega = \frac{-y\,\dd x + x\,\dd y}{x^2 + y^2}$ 沿 $\mathcal C$ 的积分是多少？
:::

::: ans
$0$。圆盘 $\overline B((3, 0), 1)$ 不含原点，$\omega$ 在它的一个邻域（例如 $\{x > 1\}$）上 $\Cc^1$ 且闭，由 {@green-riemann}，积分 $= \iint 0 = 0$。另一种看法：$\{x > 0\}$ 是星形的（凸），由 {@poincare}，$\omega$ 在其上恰当（$\omega = \dd\Arctan\frac yx$），由 {@forme-exacte} 闭路径积分为 $0$。
:::

## 展望：Gauss 公式与 Stokes 公式

Green–Riemann 公式有两个三维推广：把「区域与它的边界曲线」换成「立体与它的边界曲面」，得到 Gauss–Ostrogradski 公式；换成「曲面与它的边界曲线」，得到 Stokes 公式。曲面积分的严格定义需要曲面的参数化与面积元，这是 L3 的内容，这里只陈述。

::: thm id=ostrogradski zh="Gauss–Ostrogradski 公式（散度定理）" en="Divergence theorem" fr="Formule de Green–Ostrogradski" ru="Формула Остроградского–Гаусса" lvl=3 ref="Зорич，第二卷第 13 章；Spivak, *Calculus on Manifolds*，第 5 章"
设 $\Omega \subset \R^3$ 是边界光滑的有界区域，$\vec n$ 是外法向量，$V$ 是 $\Cc^1$ 向量场。则
$$\iiint_\Omega\operatorname{div}V\,\dd x\,\dd y\,\dd z = \iint_{\partial\Omega}V\cdot\vec n\,\dd S.$$
:::

::: fr
Soient $\Omega \subset \R^3$ un ouvert borné à bord régulier, $\vec n$ la normale unitaire sortante et $V$ un champ de vecteurs de classe $\Cc^1$. Alors
$$\iiint_\Omega\operatorname{div}V\,\dd x\,\dd y\,\dd z = \iint_{\partial\Omega}V\cdot\vec n\,\dd S.$$
:::

::: thm id=stokes zh="Stokes 公式" en="Stokes' theorem" fr="Formule de Stokes" ru="Формула Стокса" lvl=3 ref="Зорич，第二卷第 13 章；Spivak, *Calculus on Manifolds*，第 5 章"
设 $S$ 是 $\R^3$ 中的定向曲面，边界 $\partial S$ 取相容的方向，则 $\iint_S(\operatorname{rot}V)\cdot\vec n\,\dd S = \oint_{\partial S}V\cdot\dd\vec\ell$。用微分形式的语言，Green–Riemann、Gauss–Ostrogradski、Stokes 三个公式与微积分基本定理统一为
$$\int_M\dd\omega = \int_{\partial M}\omega.$$
这是 L3（微分几何）的主题。
:::

::: fr
Soit $S$ une surface orientée de $\R^3$, dont le bord $\partial S$ est muni de l'orientation compatible ; alors $\iint_S(\operatorname{rot}V)\cdot\vec n\,\dd S = \oint_{\partial S}V\cdot\dd\vec\ell$. Dans le langage des formes différentielles, les formules de Green–Riemann, de Green–Ostrogradski et de Stokes et le théorème fondamental de l'analyse s'unifient en
$$\int_M\dd\omega = \int_{\partial M}\omega.$$
C'est l'objet du cours de géométrie différentielle (L3).
:::

::: rem
**Green–Riemann 是二维的散度定理，也是平面上的 Stokes 公式。**

1. **通量形式。** 对平面向量场 $F = (F_1, F_2)$，在 {@green-riemann} 中取 $P = -F_2$、$Q = F_1$：
   $$\oint_{\partial D}(F_1\,\dd y - F_2\,\dd x) = \iint_D\Big(\frac{\partial F_1}{\partial x} + \frac{\partial F_2}{\partial y}\Big) = \iint_D\operatorname{div}F.$$
   若 $\gamma = (x, y)$ 是逆时针参数化，$(y', -x')$ 是指向区域外部的法向量乘以速率 $\norm{\gamma'}$，所以左边是穿出边界的通量 $\oint F\cdot\vec n\,\dd s$：这正是 {@ostrogradski} 的二维版本。
2. **环量形式。** 把 $V = (P, Q, 0)$ 看成 $\R^3$ 中的向量场，$\operatorname{rot}V\cdot\vec e_z = \partial_xQ - \partial_yP$。对平面区域 $D$（法向量 $\vec e_z$），{@green-riemann} 就是 {@stokes}。
:::

::: q
对 $V(x, y, z) = (x, y, z)$ 和单位球 $\Omega$，验证 {@ostrogradski} 的两边相等。
:::

::: ans
$\operatorname{div}V = 1 + 1 + 1 = 3$，左边 $= 3\operatorname{vol}(\Omega) = 3\cdot\frac43\pi = 4\pi$（{@volume-boule}）。在单位球面上外法向量 $\vec n = (x, y, z)$，$V\cdot\vec n = x^2 + y^2 + z^2 = 1$，右边 $=$ 球面面积 $= 4\pi$。两边相等。
:::

::: open zh="Kakeya 猜想"
**Besicovitch 集**是 $\R^n$ 中在每个方向上都包含一条单位线段的集合。Besicovitch（1919）构造出 Lebesgue 测度为零的这种集合，这本身就说明了 Jordan 测度（即本章的「体积」）的局限。**Kakeya 猜想**断言：这样的集合的 Hausdorff 维数（以及 Minkowski 维数）一定是 $n$。$n = 2$ 的情形由 Davies（1971）证明。2025 年 Hong Wang 与 Joshua Zahl 发表预印本，宣布证明了 $n = 3$ 的情形；$n \ge 4$ 时仍未解决。它与调和分析中的 Fourier 限制猜想密切相关。
:::

## 方法总结

按「想算什么、想证什么」整理本章的方法。

### 如何计算二重、三重积分？

1. **矩形上的连续函数**：逐次积分，次序任选（{@fubini-pave}）；被积函数是乘积 $f(x)g(y)$ 时直接分离成两个一元积分。选让内层积分最简单的次序（§1 的「想一想」）。
2. **一般区域**：先画图，把区域写成 $y$-型或 $x$-型（{@def-domaine-elementaire}），再用 {@fubini-domaine}。若内层积分没有初等原函数，换成另一种描述，交换积分次序（{@ex-triangle}，§2 的「想一想」）。交换次序时**积分限必须从图上重新读出**。
3. **区域不是基本区域**：沿坐标轴或其他直线切成若干基本区域，用可加性 {@c11-additivite} 第 4 条相加（例如圆环切成四块）。
4. **含 $x^2 + y^2$ 的被积函数或圆形、扇形、圆环区域**：极坐标；**含 $x^2 + y^2 + z^2$ 或球形区域**：球坐标；**绕 $z$ 轴旋转对称**：柱坐标（{@coord-polaires}，{@c11-polaires-justif}）。先把区域写成 $\Phi(\Delta)$，$\Delta$ 是参数空间中的矩形，再验证 $\Phi(\Delta)$ 恰好是所给区域；不要忘记 Jacobi 因子 $r$ 或 $r^2\sin\varphi$。
5. **区域由 $u(x, y) = \text{常数}$、$v(x, y) = \text{常数}$ 围成**：令 $(u, v)$ 为新变量（{@changement-variables}，{@c11-ex-parallelogramme}）。Jacobi 因子是 $\abs{\det\frac{\partial(x, y)}{\partial(u, v)}}$；若只容易算出 $\det\frac{\partial(u, v)}{\partial(x, y)}$，取倒数（§3 第 2 个「想一想」）。
6. **对称性**：若 $D$ 关于 $x \mapsto -x$ 对称且 $f(-x, y) = -f(x, y)$，则 $\iint_Df = 0$（用 $\Phi(x, y) = (-x, y)$，$\abs{\det} = 1$，{@changement-variables} 给出 $\iint_Df = -\iint_Df$）。
7. **体积**：已知截面面积 $A(t)$ 时，$\operatorname{vol} = \int A(t)\,\dd t$（{@c11-fubini-riemann} 的切片法，见 {@volume-boule} 第 2 步）。

### 如何计算广义重积分？

1. **被积函数 $\ge 0$**：可以随意交换积分次序，也可以用任意穷竭序列（{@tonelli-continu}）；常用圆盘或「极坐标矩形」作穷竭序列（{@gauss-polaires}，{@beta-gamma}）。
2. **被积函数变号**：先验证 $\iint\abs f < +\infty$，再交换次序；否则可能出错（{@c11-cex-fubini}：两个次序分别得 $\pm\frac\pi4$）。
3. **把一元积分的平方或乘积写成二重积分**，再换坐标：Gauss 积分（{@gauss-polaires}）、$\Gamma(x)\Gamma(y)$（{@beta-gamma}）。也可以用夹逼代替穷竭序列（{@gauss-polaires} 第 4 步）。

### 如何证明一个函数可积、一个集合可测（或否定它）？

1. 连续 ⇒ 可积（{@continue-integrable}）；不连续点包含于零容度集 ⇒ 可积（{@c11-integrable-negligeable}）；精确刻画是 {@lebesgue-critere}。
2. 用定义：构造分割使上下和之差任意小（{@c11-critere-riemann}，{@c11-ex-xy}）。
3. 集合 Jordan 可测：证明边界包含于有限个连续函数的图像与线段之并（{@c11-graphe-negligeable}），或者它是可测紧集在 $\Cc^1$ 微分同胚下的像（{@changement-variables} 第 0 步）。
4. 不可积、不可测：说明每个小矩形上振幅 $M_Q - m_Q$ 都不小（{@c11-cex-dirichlet}，{@c11-cex-iterees}）。

### 如何计算曲线积分？

1. **直接参数化**（{@def-integrale-curviligne}）；结果与保持方向的参数化无关，反向变号（{@c11-reparametrage}）。
2. **恰当形式**：先检查 $\partial_yP = \partial_xQ$；在星形开集上由 {@poincare} 找到势函数 $f$，积分等于端点值之差（{@forme-exacte}）。
3. **闭曲线围成区域，且 $P, Q$ 在区域上 $\Cc^1$**：用 {@green-riemann} 化成二重积分；面积用 {@aire-green}。
4. **区域内有奇点**：挖去一个小圆盘，在剩下的环形区域上用 Green–Riemann（{@green-riemann} 后的「更一般的区域」），把问题化成小圆周上的积分。

### 如何证明一个形式不是恰当的？

找一条闭路径，使沿它的积分 $\ne 0$；由 {@forme-exacte} 的逆否命题即得（{@circulation-vortex}）。注意：「闭」不能推出「恰当」，除非区域是星形的（{@poincare}）。

::: rem
**常见错误。**

1. **忘记 Jacobi 因子**：在极坐标中写成 $\dd x\,\dd y = \dd r\,\dd\theta$。检查方法：取 $f = 1$ 算圆盘面积，应得 $\pi R^2$，而漏掉 $r$ 会得到 $2\pi R$。
2. **交换次序时照抄积分限**：$\int_0^1\int_x^1(\dots)\,\dd y\,\dd x$ 不等于 $\int_0^1\int_x^1(\dots)\,\dd x\,\dd y$——后者内层积分限依赖于外层积分变量之外的 $x$，没有意义。正确做法是画出区域 $\{0 \le x \le y \le 1\}$，重新写成 $\int_0^1\int_0^y(\dots)\,\dd x\,\dd y$。
3. **对不绝对可积的函数交换积分次序**：{@c11-cex-fubini} 的两个累次积分是 $\frac\pi4$ 与 $-\frac\pi4$。
4. **区域内有奇点仍用 Green–Riemann**：漩涡形式沿单位圆的积分是 $2\pi$，而「$\iint 0$」是 $0$（{@green-riemann} 后的注）。
5. **定向错误**：Green–Riemann 中边界必须逆时针（区域在左侧）；带洞区域的内边界是顺时针的。例如摆线下的面积（{@c11-ex-cycloide}），按参数增加的方向走摆线是顺时针，必须反向。
6. **坐标映射不是单射**：用 $\theta \in [0, 4\pi]$ 或 $\varphi \in [0, 2\pi]$ 会把区域覆盖两次，体积加倍（{@changement-variables} 后的注）。
:::

::: read
- Г. М. Фихтенгольц,《Курс дифференциального и интегрального исчисления》，第三卷：«Криволинейные интегралы», «Двойные интегралы», «Тройные и многократные интегралы», формула Грина。例子极多，各种区域与坐标变换都有完整的计算，适合对照本章的例子练手。
- В. А. Зорич,《Математический анализ》，第二卷：«Кратные интегралы»（Jordan 可测集上的 Riemann 积分、Fubini 定理、变量替换公式）与 «Криволинейные и поверхностные интегралы»（формулы Грина, Гаусса — Остроградского, Стокса）。本章 ★★ 证明（变量替换公式）的完整版本在这里，并用微分形式统一了三个积分公式。
- Б. П. Демидович,《Сборник задач и упражнений по математическому анализу》：кратные и криволинейные интегралы。计算题按难度排列，适合练积分次序、坐标变换与 Green 公式。
- J. Lelong-Ferrand, J.-M. Arnaudiès,《Cours de mathématiques》，第 4 卷：intégrales multiples, intégrales curvilignes。法国经典教材，记号与术语和法国课堂一致。
- M. Spivak,《Calculus on Manifolds》：integration on rectangles, content zero, Fubini's theorem, change of variables, Stokes' theorem。一百多页讲完本章全部理论，变量替换与 Stokes 公式都有完整证明，是 ★★ 与 ★★★ 结论的最佳参考。
:::

::: glossary
| 中文 | Français | English | Русский |
|---|---|---|---|
| 矩形（闭长方体） | pavé (m.) | box, closed rectangle | брус, (n-мерный) промежуток |
| 分割 | subdivision (f.) | partition | разбиение |
| 加细 | raffinement (m.), subdivision plus fine (f.) | refinement | измельчение разбиения |
| Darboux 上和 / 下和 | somme de Darboux supérieure / inférieure (f.) | upper / lower Darboux sum | верхняя / нижняя сумма Дарбу |
| 上积分 / 下积分 | intégrale supérieure / inférieure (f.) | upper / lower integral | верхний / нижний интеграл Дарбу |
| Riemann 可积 | intégrable au sens de Riemann | Riemann integrable | интегрируемая по Риману |
| 振幅 | oscillation (f.) | oscillation | колебание функции |
| 重积分 | intégrale multiple (f.) | multiple integral | кратный интеграл |
| 二重积分 / 三重积分 | intégrale double / triple (f.) | double / triple integral | двойной / тройной интеграл |
| 累次积分 | intégrale itérée (f.) | iterated integral | повторный интеграл |
| Fubini 定理 | théorème de Fubini (m.) | Fubini's theorem | теорема Фубини |
| 交换积分次序 | intervertir l'ordre d'intégration | change the order of integration | изменить порядок интегрирования |
| 零容度集 | partie (f.) de contenu nul | set of (Jordan) content zero | множество жордановой меры нуль |
| Jordan 可测集 | partie quarrable (f.), mesurable au sens de Jordan | Jordan measurable set | множество, измеримое по Жордану |
| 面积 / 体积 | aire (f.) / volume (m.) | area / volume | площадь / объём |
| Lebesgue 零测集 | partie négligeable (f.) au sens de Lebesgue | (Lebesgue) null set | множество лебеговой меры нуль |
| 基本区域 | domaine élémentaire (m.) | elementary (simple) region | элементарная область |
| 截口 / 切片 | section (f.), tranche (f.) | section, slice | сечение |
| 变量替换 | changement de variables (m.) | change of variables | замена переменных |
| Jacobi 行列式 | jacobien (m.) | Jacobian (determinant) | якобиан |
| 微分同胚 | difféomorphisme (m.) | diffeomorphism | диффеоморфизм |
| 极坐标 | coordonnées polaires (f. pl.) | polar coordinates | полярные координаты |
| 柱坐标 | coordonnées cylindriques (f. pl.) | cylindrical coordinates | цилиндрические координаты |
| 球坐标 | coordonnées sphériques (f. pl.) | spherical coordinates | сферические координаты |
| 广义重积分 | intégrale multiple généralisée (f.) | improper multiple integral | несобственный кратный интеграл |
| 穷竭序列 | suite exhaustive (f.) | exhausting sequence | исчерпание (множества) |
| Γ 函数 / Β 函数 | fonction gamma / bêta (f.) | gamma / beta function | гамма- / бета-функция |
| 单位球的体积 | volume (m.) de la boule unité | volume of the unit ball | объём единичного шара |
| 测度集中 | concentration (f.) de la mesure | concentration of measure | концентрация меры |
| 路径（分段 $\Cc^1$） | chemin (m.) ($\Cc^1$ par morceaux) | (piecewise $C^1$) path | (кусочно гладкий) путь |
| 闭路径 | lacet (m.) | closed path, loop | замкнутый путь |
| 曲线积分（第二型） | intégrale curviligne (f.) | line integral | криволинейный интеграл второго рода |
| 微分 1-形式 | forme différentielle (f.) de degré 1 | differential 1-form | дифференциальная 1-форма |
| 恰当形式 / 闭形式 | forme exacte / fermée (f.) | exact / closed form | точная / замкнутая форма |
| 势函数 | primitive (f.) d'une forme, potentiel (m.) | potential | потенциал, первообразная формы |
| 重新参数化 | reparamétrage (m.) | reparametrization | замена параметра |
| 正向（逆时针） | sens direct (m.), sens trigonométrique | positive (counterclockwise) orientation | положительное направление обхода |
| 环量 | circulation (f.) | circulation | циркуляция |
| Green–Riemann 公式 | formule de Green–Riemann (f.) | Green's theorem | формула Грина |
| 散度定理 | formule de Green–Ostrogradski (f.) | divergence theorem | формула Остроградского — Гаусса |
| Stokes 公式 | formule de Stokes (f.) | Stokes' theorem | формула Стокса |
| 散度 / 旋度 | divergence (f.) / rotationnel (m.) | divergence / curl | дивергенция / ротор |
| 外法向量 | normale sortante (f.) | outward normal | внешняя нормаль |
| 取极限 | passer à la limite | pass to the limit | перейти к пределу |
:::
