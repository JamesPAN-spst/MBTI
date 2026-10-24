# 讲义写作规范（第二版）

本规范用于重写 `content/*.md` 的全部 11 章。风格以法国大学 L2《Analyse 3》课堂讲义（第 2 章「Suites réelles et complexes」）为范本：**每一步推理都写出来，每个选择都有名字和公式，每个结论都说明依据**。在此基础上，每个定义、定理和证明都配法语版本，每章末尾有中法英俄术语对照。

范本讲义的特点（重写时逐条对照）：

1. 定义写成带量词的公式，紧跟一句白话，再紧跟例子与非例子。
2. 证明开头有一段灰色的「方法 / 直觉」（Méthode : …, Intuitivement …），告诉读者打算怎么证。
3. 证明里先「翻译假设」（On traduit les hypothèses），把每个条件写成「存在 N 使得……」。
4. 每个构造的对象都给出具体公式：$N = \max(N_u, N_v)$、$N_\varepsilon = E(5/\varepsilon) + 1$、$\varepsilon = \frac{\ell - \ell'}{2}$。
5. 双向证明分 (⇒)、(⇐)；归纳分 Initialisation / Hérédité；反证写清「假设……矛盾」。
6. 定理之后的「注」说明每个条件为什么不能去掉、逆命题为什么不成立，并给出具体反例（如 $u_n = \sum_{k \le n} 1/k$ 说明 $u_{n+1} - u_n \to 0$ 不能推出收敛）。
7. 穿插「Question / Réponse」，让读者停下来想。
8. 章末「Synthèse : comment montrer que … ?」，把本章的方法按「想证明什么」归类。

---

## 1. 块语法

在原有语法（见 `README.md`「写作约定」）之上新增：

| 语法 | 用途 | 渲染 |
|---|---|---|
| `::: fr` | 紧跟在 `def` `thm` `prop` `lem` `cor` `proof` `sketch` `ans` 之后，写该块的法语版本 | 和中文放在同一个块里，右上角「中 / Fr」切换；顶栏总开关切换全部 |
| 以 `▷` 开头的段落 | 思路旁白：方法、直觉、「我们要证的是……」 | 楷体、左侧细线 |
| `::: q` + `::: ans` | 想一想 + 可折叠的解答（`ans` 后可再跟 `::: fr`） | 「想一想」块 + 「解答」折叠 |
| `::: read` | 延伸阅读（含苏联教材） | 虚线框 |
| `::: glossary` | 章末术语表，内含一个四列 Markdown 表格 | 自动汇总到 `glossaire.html` |
| `{@fr:id}` | 在 `::: fr` 里引用，显示为「théorème 4.3」 | 中文正文里仍用 `{@id}` |

`::: fr` 的位置：必须紧跟在被翻译的块的结尾 `:::` 之后（中间只允许空行）。例：

```md
::: thm id=… zh="…" en="…" fr="…" ru="…" lvl=1
中文陈述
:::

::: fr
Énoncé en français
:::

::: proof
中文证明
:::

::: fr
Preuve en français
:::
```

哪些块要配法语：

- **必须**：每个 `def` `thm` `prop` `lem` `cor` 的陈述，每个 `proof` `sketch`。
- **可选**：`ans`（解答较长时建议配）。
- **不配**：`ex` `cex` `rem` `method` `q` `read` `hist` `open`（只写中文）。

---

## 2. 每一节的结构

1. **动机**：一到三句，说清这一节要解决什么问题。
2. **定义**：先给量词公式（行间公式），再给一句白话；需要时加「注」区分容易混淆的对象（范本中的 $u$、$u_n$、$u(\mathbb{N})$）。
3. **例子紧跟定义**：一个满足的、一个不满足的，计算写全。
4. **定理 → 证明 → 注**：注里讨论每个条件的必要性（给反例）、逆命题（成立吗？不成立给反例）、常见误用。
5. **想一想**：每节一到两个 `::: q`，答案放在 `::: ans`。
6. **章末**：倒数第二个 `##` 是「方法总结」，最后是 `::: read` 和 `::: glossary`（这两个块放在「方法总结」那一节里，不单独开节）。

---

## 3. 证明的写法（核心）

### 必须做到

- **开头一段 `▷ 思路：…`**，一两句说明策略（对应 Méthode）。
- **翻译假设**：把每个条件写成量词形式，并给常数命名。「由假设，存在 $N_1$，使得对一切 $n \ge N_1$，$\abs{u_n - \ell} < \varepsilon/2$。」
- **写出要证的目标**：「我们要证：对任意 $\varepsilon > 0$，存在 $N$，使得……」，可以放在 `▷` 段里。
- **每步只做一件事，并写依据**：（三角不等式）（定义 4.2）（由第 2 步）（{@id}）。
- **每个选择都有名字和公式**：取 $q$ 满足 $L\abs{z} < q < 1$；令 $N = \max(N_1, N_2)$；$N_\varepsilon = E(1/\varepsilon) + 1$。
- **不等式链竖排**，一行一步，依据写在右侧：

  ```md
  $$\begin{aligned}
  \abs{u_n - \ell} &\le \abs{u_n - v_n} + \abs{v_n - \ell} && \text{（三角不等式）}\\
  &< \tfrac{\varepsilon}{2} + \tfrac{\varepsilon}{2} = \varepsilon && \text{（} n \ge N \text{）}
  \end{aligned}$$
  ```

- **结构标记**：较长的证明分 **第 1 步（…）**、**第 2 步（…）**；双向写 **(⇒)**、**(⇐)**；归纳写 **初始化**、**递推**；反证写「反设……。……，矛盾。」；分情况写 **情形 1**。
- **边界情形单独处理**：$L = 0$、$L = +\infty$、$z = 0$、空集、$n = 0$ 等。
- **结尾一句话说清证明了什么**：「这就证明了 $u$ 收敛于 $\ell$。」

### 禁止

- 「显然」「易见」「不难验证」「同理可得」——除非后面紧跟实际的验证。「同理」只在写明替换方式时可用：「把 $u$ 换成 $-u$，由 (1) 得……」。
- 跳过量词：不能写「从某项起……」而不说明这个「某项」从哪个结论来。
- 一句话塞进三步以上的推理。

### 分级

- ★：完整证明，按上面的要求。
- ★★（`sketch`）：所有关键步骤都写出；常规计算可以压缩，但要标明「（常规计算：…）」并写出结果。
- ★★★：不写证明；必须有 `ref="…"`，指向能核实的教材（书名 + 卷，不要编造页码或节号）。

---

## 4. 法语版本

- 忠实翻译中文版，数学内容与记号完全一致；风格对照范本：
  - « Soit $\varepsilon > 0$. »「Puisque $u$ converge vers $\ell$, il existe $N \in \mathbb{N}$ tel que pour tout $n \ge N$, … »
  - « Posons $N = \max(N_1, N_2)$. »「Par hypothèse, … »「D'après {@fr:id}, … »「Par l'inégalité triangulaire, … »
  - « Ainsi … », « Ceci montre que … », « Par l'absurde, supposons que … », « Initialisation. », « Hérédité. »
  - 旁白：« ▷ Méthode : … », « ▷ Intuitivement, … », « ▷ On veut montrer que … »
  - 步骤：« **Étape 1 (on traduit l'hypothèse)** »，情形：« **Cas 1** »
- 法语里的交叉引用用 `{@fr:id}`。
- 法语正文的引号、空格按法语习惯：冒号、分号、问号前加空格（« : », « ; »）。
- 不要逐字硬译中文的口语化表达；用法国讲义里的标准说法（« on en déduit », « il vient », « APCR »（à partir d'un certain rang）可以用，但第一次出现时写全）。

---

## 5. 术语表（每章必有）

章末 `::: glossary`，表头固定：

```md
::: glossary
| 中文 | Français | English | Русский |
|---|---|---|---|
| 收敛半径 | rayon de convergence (m.) | radius of convergence | радиус сходимости |
:::
```

- 25–45 行，覆盖本章所有定义过的概念和命名的定理，以及证明里反复出现的动词短语（如「取极限」passer à la limite / pass to the limit / перейти к пределу）。
- 法语名词标阴阳性 (m.) / (f.)；俄语用主格，常用的固定搭配写全（«равномерная сходимость»）。
- 人名定理按各语言的习惯写法（«теорема Больцано — Вейерштрасса»，«Théorème de Bolzano-Weierstrass»）。

---

## 6. 延伸阅读（每章必有）

章末 `::: read`，3–6 条，至少一条苏联/俄罗斯教材，一条法国教材：

- 俄：Г. М. Фихтенгольц,《Курс дифференциального и интегрального исчисления》；В. А. Зорич,《Математический анализ》；Б. П. Демидович,《Сборник задач и упражнений по математическому анализу》；Л. Д. Кудрявцев,《Курс математического анализа》；В. А. Ильин, В. А. Садовничий, Бл. Х. Сендов,《Математический анализ》。
- 法：X. Gourdon,《Les maths en tête : Analyse》；J.-M. Monier；F. Liret, D. Martinais；E. Ramis, C. Deschamps, J. Odoux。
- 英：W. Rudin,《Principles of Mathematical Analysis》；T. Tao,《Analysis I/II》。

每条写书名、卷次和**对应的主题**（用该书的语言），并用一句中文说明为什么值得读（例如「Demidovich 的习题按难度排列，适合练计算」）。**不要编造章节号、页码、习题编号**；不确定就只写主题。

---

## 7. 方法总结（每章必有）

倒数第二节（`## 方法总结`），仿照范本第 6 节：

- 「如何证明……收敛 / 一致收敛 / 可微 / ……」——编号列表，每条一句话 + 引用对应结论 `{@id}`。
- 「如何证明……不成立」——同上。
- 常见错误：一个 `::: rem`，列出两三个典型误用及其反例。

---

## 8. 必须保留

- **所有现有 `id`**：不改名、不删除（其他章节会引用）。新加的块如需 `id`，用 `c章号-` 前缀，如 `c4-hadamard-lim`。
- **所有 `::: demo` 块**，`id` 不变。
- **覆盖面**：现有每个定义、定理、例子都保留（可以重排、合并、扩写）；为了把证明写细，可以补充需要的引理。
- **★ 级别与 `ref`**。
- 章首导语段落、宏（`\abs{…}`、`\norm{…}`、`\R` 等）。
- 数学内容的正确性高于一切：重写时重新核对每个结论、每个反例；能用 Python 数值验证的反例就验证一下。

---

## 9. 范例：Cauchy–Hadamard 公式（第 4 章）

```md
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
1. 不能把 $\limsup$ 换成 $\lim$：$\sum z^{n^2}$ 的系数 $a_n$ 在 $n$ 为完全平方数时为 1，否则为 0，$\abs{a_n}^{1/n}$ 在 0 和 1 之间来回跳，没有极限，但 $\limsup = 1$，故 $R = 1$。
2. 比值法（{@dalembert-rayon}）在这里失效：$a_{n+1}/a_n$ 常常无定义。
:::

::: q
$\sum 2^{(-1)^n n} z^n$ 的收敛半径是多少？
:::

::: ans
$\abs{a_n}^{1/n} = 2^{(-1)^n}$，在 2 和 $\tfrac12$ 之间交替，$\limsup = 2$，所以 $R = \tfrac12$。
:::
```

（范例中的 `{@c4-limsup-carac}` 是假想的 id，仅作示意；实际写作时引用真实存在的块，或在本章补一个引理。）

---

## 10. 自检

```bash
ONLY=04-series-entieres OUT_DIR=/tmp/my-out node scripts/build.mjs   # 必须通过：KaTeX 错误、未闭合的块、::: fr 位置错误都会让构建失败
node scripts/build.mjs                                                # 全部章节一起构建时，跨章引用也会检查
```

逐节重读：每个证明是否有 ▷ 思路、翻译假设、编号步骤、依据、结论句；有没有「显然」；法语是否与中文一一对应；术语表是否覆盖本章全部概念。
