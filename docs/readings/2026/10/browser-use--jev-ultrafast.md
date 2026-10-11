# Jev Ultrafast

[Source Repository](https://github.com/browser-use/jev-ultrafast)

Read on: 2026-10-11

---

## 1. Project Overview

Jev Ultrafast is a browser agent designed to turn a single natural-language goal into reliable web actions without hand-written page scripts or hardcoded field values. Instead of following a site-specific plan, it reads the current page state, indexes visible controls, and uses a small **TypeSafe policy** to decide both the operation and the compatible target in one request. This design makes the system operate over a **dynamic action space**: every observation produces a fresh element table, and only supported operations such as CLICK, TYPE\_TEXT, SELECT, and WAIT are exposed. The core idea is **speculative fan-out**: the model does not emit selectors or executable code; it chooses an operation and then a target head that matches the observed elements, so each decision is constrained by what is actually on the page. The **browser executor** then rechecks freshness, occlusion, and context before performing the action, which helps the agent avoid stale or misleading interactions while keeping the loop fast. For text entry, a lightweight LLM generates only the required value for a `TYPE_TEXT` action, and the system may reuse that generated text across a **stale-page retry** only when the entire helper input remains unchanged. This makes the agent robust in interactive pages where layouts shift, animations occur, and suggestions appear after a field becomes active, while still preserving a very small decision loop: **page → indexed elements → operation + target → execution**. The main components are the browser snapshot reader, the model policy, the execution layer, and the local inspector/demo tooling, all working together around **structured DOM state** rather than screenshots. In practice, the project is optimized for fast browser automation with strong validation, using Browser Harness for Chrome access and a TypeSafe model API to achieve short end-to-end task times in real web flows.

## 2. Overall Meaning

这个项目的核心是：把“一个自然语言目标”转成“浏览器上的可靠操作”，而不是依赖为每个网站单独编写脚本。它的核心架构是读取当前页面状态、对可见控件建立索引、再用一个小型策略模型在同一轮请求中同时决定“操作”和“目标元素”。这种设计使它不需要站点专属动作计划，而是把决策严格限制在页面真实出现的元素和支持的操作集合内。整个系统围绕“页面快照 → 结构化DOM状态 → 模型判断 → 浏览器执行”这条高效循环工作，并在执行前再做有效性校验，以避免过期状态和遮挡问题。它同时支持文本输入、选择、等待和点击等动作，并在交互式页面中通过再验证和重试机制提高稳定性。总体来看，这个项目强调的是“快速、结构化、可验证”的浏览器自动化，而不是传统脚本式的页面驱动方式。

## 3. Sentence-by-Sentence Explanation

### Sentence 1

**Original:**

Jev Ultrafast is a browser agent designed to turn a single natural-language goal into reliable web actions without hand-written page scripts or hardcoded field values.

**中文意思：**

Jev Ultrafast 是一个浏览器代理，目标是把单个自然语言目标转换成可靠的网页操作，而不需要手写页面脚本，也不需要写死的字段值。

**Key words and expressions:**

- **browser agent** — 浏览器代理；指在浏览器环境中执行任务的自动化系统，通常负责观察页面、决策和执行操作。
- **turn ... into ...** — 把……转变成……；这是常见的表达，说明系统的输入和输出关系。
- **natural-language goal** — 自然语言目标；用户用普通语言描述的任务目标，不是结构化代码或固定命令。
- **reliable web actions** — 可靠的网页操作；表示系统执行的动作不仅能运行，而且要尽量稳定、正确。
- **hand-written page scripts** — 手写页面脚本；指为特定网站编写专用脚本逻辑。
- **hardcoded field values** — 硬编码字段值；指把某些固定文本或数据直接写死在代码中，不依赖动态页面状态。

### Sentence 2

**Original:**

Instead of following a site-specific plan, it reads the current page state, indexes visible controls, and uses a small TypeSafe policy to decide both the operation and the compatible target in one request.

**中文意思：**

它不依赖特定网站的操作计划，而是读取当前页面状态，给可见控件建立索引，并使用一个小型的 TypeSafe 策略，在一次请求中同时决定操作和兼容的目标元素。

**Key words and expressions:**

- **site-specific plan** — 针对特定站点的计划；指为某个网站单独编写的动作流程。
- **reads the current page state** — 读取当前页面状态；指观察页面上当前真实存在的元素、属性和值。
- **indexes visible controls** — 为可见控件建立索引；即把页面上可见的交互元素按结构化方式组织起来，方便后续决策。
- **visible controls** — 可见控件；用户当前能看到的交互元素，如按钮、输入框、下拉框等。
- **TypeSafe policy** — TypeSafe 策略；这里指项目中用于选择操作和目标的模型/决策机制。
- **compatible target** — 兼容目标；指与当前操作类型匹配的元素，避免不符合规则的操作对象。
- **in one request** — 一次请求；说明模型决策在一次网络调用里完成，而不是分多轮调用。

### Sentence 3

**Original:**

This design makes the system operate over a dynamic action space: every observation produces a fresh element table, and only supported operations such as CLICK, TYPE\_TEXT, SELECT, and WAIT are exposed.

**中文意思：**

这种设计使系统在一个动态动作空间中工作：每次观察都会生成一张新的元素表，并且只暴露支持的操作，例如 CLICK、TYPE\_TEXT、SELECT 和 WAIT。

**Key words and expressions:**

- **dynamic action space** — 动态动作空间；指系统的可操作动作并不是固定死的，而是根据当前页面状态实时变化。
- **operate over** — 在……上运行；这里表示系统在某个抽象空间内进行决策和控制。
- **every observation produces a fresh element table** — 每次观察都会生成一张新的元素表；说明页面状态会被重新扫描，并形成当前时刻的结构化元素列表。
- **fresh element table** — 新的元素表；表示每次决策都基于最新的页面元素集合，而不是缓存的旧数据。
- **supported operations** — 支持的操作；指当前页面允许的动作类型。
- **exposed** — 暴露；在这表示系统向模型或决策过程提供哪些可选动作。

### Sentence 4

**Original:**

The core idea is speculative fan-out: the model does not emit selectors or executable code; it chooses an operation and then a target head that matches the observed elements, so each decision is constrained by what is actually on the page.

**中文意思：**

其核心思想是“推测式扇出”：模型不会输出选择器或可执行代码；它会先选择一种操作，然后再选择与观察到的元素相匹配的目标头，因此每次决策都被页面上真实存在的内容所约束。

**Key words and expressions:**

- **core idea** — 核心思想；说明后文是整个方案的关键概念。
- **speculative fan-out** — 推测式扇出；这是一个较抽象的系统设计术语，意思是模型对多个候选可能性并行做判断，而不是只做单一路径预测。
- **emit selectors** — 输出选择器；通常指生成 DOM 选择器或者类似定位器，属于页面定位代码。
- **executable code** — 可执行代码；这里指脚本、命令或其他能直接运行的逻辑。
- **target head** — 目标头；指模型中的一个特定输出分支，用于预测“哪个元素是当前操作的对象”。
- **matches the observed elements** — 与观察到的元素相匹配；说明目标选择必须以当前页面元素为依据。
- **constrained by what is actually on the page** — 受页面上实际内容约束；强调决策不是自由生成的，而是必须遵循真实 DOM 状态。

### Sentence 5

**Original:**

The browser executor then rechecks freshness, occlusion, and context before performing the action, which helps the agent avoid stale or misleading interactions while keeping the loop fast.

**中文意思：**

浏览器执行器随后会在执行动作前重新检查页面新鲜度、遮挡情况和上下文信息，这有助于代理避免过期或误导性的交互，同时保持整个循环足够快。

**Key words and expressions:**

- **browser executor** — 浏览器执行器；负责把决策真正应用到浏览器中的组件。
- **rechecks freshness** — 重新检查新鲜度；确保页面状态与模型观察到的状态仍然一致。
- **occlusion** — 遮挡；指某个元素被其他元素覆盖，导致点击或操作可能落到错误位置。
- **context** — 上下文；这里指元素附近的环境信息，如页面状态、布局和相邻元素。
- **stale or misleading interactions** — 过期或误导性的交互；即基于旧状态做出的错误操作。
- **keeping the loop fast** — 保持循环快速；强调系统在保证正确性时尽量减少额外延迟。

### Sentence 6

**Original:**

For text entry, a lightweight LLM generates only the required value for a TYPE\_TEXT action, and the system may reuse that generated text across a stale-page retry only when the entire helper input remains unchanged.

**中文意思：**

对于文本输入，轻量级 LLM 只生成 TYPE\_TEXT 操作所需的文本值；而且系统只有在整个辅助输入保持不变的情况下，才可能在页面过期重试时复用这段生成文本。

**Key words and expressions:**

- **text entry** — 文本输入；指在输入框中填入文字的操作。
- **lightweight LLM** — 轻量级大语言模型；强调模型规模较小，适合快速生成短文本。
- **the required value** — 所需的值；指当前操作真正需要填入的文本内容。
- **stale-page retry** — 页面过期重试；页面状态发生变化后，系统重试前一个决策时出现的旧状态问题。
- **helper input** — 辅助输入；这里指用于生成文本的上下文输入内容，完整一致才允许复用结果。
- **remains unchanged** — 保持不变；这是复用缓存值的关键条件，避免使用过期上下文。

### Sentence 7

**Original:**

This makes the agent robust in interactive pages where layouts shift, animations occur, and suggestions appear after a field becomes active, while still preserving a very small decision loop: page → indexed elements → operation + target → execution.

**中文意思：**

这使得代理在交互式页面中更稳健，因为页面布局可能发生变化，动画可能持续进行，并且在字段激活后才会出现建议内容；同时它仍然保留了一个很小的决策循环：页面 → 索引后的元素 → 操作 + 目标 → 执行。

**Key words and expressions:**

- **interactive pages** — 交互式页面；指页面中有动态输入、异步更新、动画和建议列表等行为。
- **layouts shift** — 布局发生变化；界面重排导致元素位置和可见性变化。
- **animations occur** — 动画发生；页面中可能有平滑过渡或加载效果。
- **suggestions appear after a field becomes active** — 在字段激活后出现建议；例如输入框获得焦点后弹出候选项。
- **preserving a very small decision loop** — 保持一个非常小的决策循环；说明系统的决策流程很紧凑且高效。
- **page → indexed elements → operation + target → execution** — 页面 → 索引后的元素 → 操作 + 目标 → 执行；这是项目中非常关键的控制流表达，描述了每轮决策的基本链路。

**Sentence structure:**

This sentence uses a “while + still + preserving” structure to balance two ideas: the agent is robust in dynamic pages, and the control loop remains minimal. The colon after “loop” introduces a concise symbolic summary of the workflow.

### Sentence 8

**Original:**

The main components are the browser snapshot reader, the model policy, the execution layer, and the local inspector/demo tooling, all working together around structured DOM state rather than screenshots.

**中文意思：**

主要组件包括浏览器快照读取器、模型策略、执行层以及本地检查器/演示工具，它们围绕结构化 DOM 状态协同工作，而不是依赖截图。

**Key words and expressions:**

- **main components** — 主要组件；用于概括系统的核心模块。
- **browser snapshot reader** — 浏览器快照读取器；负责读取当前页面快照和可见元素状态。
- **model policy** — 模型策略；推进操作和目标决策的核心逻辑。
- **execution layer** — 执行层；负责把决策真正执行到浏览器。
- **local inspector/demo tooling** — 本地检查器/演示工具；用于调试、观察决策过程和演示运行流程。
- **structured DOM state** — 结构化 DOM 状态；指把网页元素及其属性整理成清晰、可分析的数据结构。
- **rather than screenshots** — 而不是截图；强调系统优先使用结构化页面信息，而不是基于图像理解。

### Sentence 9

**Original:**

In practice, the project is optimized for fast browser automation with strong validation, using Browser Harness for Chrome access and a TypeSafe model API to achieve short end-to-end task times in real web flows.

**中文意思：**

在实际应用中，该项目针对快速浏览器自动化进行了优化，并加入了强校验机制；它使用 Browser Harness 访问 Chrome，并通过 TypeSafe 模型 API，在真实的网页流程中实现较短的端到端任务时间。

**Key words and expressions:**

- **in practice** — 实际上；引出工程上的现实情况，而不是抽象概念。
- **optimized for** — 针对……进行优化；表示系统的设计目标和取舍。
- **fast browser automation** — 快速浏览器自动化；强调响应速度和动作执行效率。
- **strong validation** — 强校验；指在执行前后对状态和结果进行验证，减少错误动作。
- **Browser Harness** — Browser Harness；用于连接和控制 Chrome 的运行时工具或库。
- **TypeSafe model API** — TypeSafe 模型 API；指调用 TypeSafe 提供的模型推理服务。
- **end-to-end task times** — 端到端任务时间；指从开始到完成整项任务所用的总时间。
- **real web flows** — 真实网页流程；说明项目目标是处理真实站点中的正常交互，不仅限于静态 demo。

## 3. Useful Expressions

### Expression 1

**Expression:** dynamic action space

**中文意思：** 动态动作空间；根据当前页面状态实时变化的可操作动作集合。

**Usage:** 在软件工程中常用于描述“动作不是固定死的，而是由系统状态决定”的设计。

### Expression 2

**Expression:** speculative fan-out

**中文意思：** 推测式扇出；对多个候选决策并行做判断，然后选择最适合当前状态的一种。

**Usage:** 这个说法常见于模型推理、路由和决策系统，强调在有限约束下做并行候选评估。

### Expression 3

**Expression:** page → indexed elements → operation + target → execution

**中文意思：** 页面 → 索引后的元素 → 操作 + 目标 → 执行；描述一轮决策和执行的核心流程。

**Usage:** 适合用来概括 agent / automation 系统中的关键控制循环。

### Expression 4

**Expression:** structured DOM state

**中文意思：** 结构化 DOM 状态；将页面元素及其属性整理为可分析的数据结构。

**Usage:** 常用于说明系统依赖结构化页面信息，而不是依赖截图或裸图像输入。

### Expression 5

**Expression:** stale-page retry

**中文意思：** 页面过期重试；在页面状态发生变化后，系统按旧状态重试时产生的问题或机制。

**Usage:** 常见于自动化、状态同步和异步 UI 场景，强调“状态失效”的处理。

### Expression 6

**Expression:** browser executor

**中文意思：** 浏览器执行器；负责把决策落到真实浏览器中的模块。

**Usage:** 用于描述自动化系统里“决策”和“执行”之间的分层结构。

### Expression 7

**Expression:** end-to-end task times

**中文意思：** 端到端任务时间；从任务开始到完成的总耗时。

**Usage:** 常见于工程评估和性能测试，强调系统整体表现，而不是单个组件的局部指标。
