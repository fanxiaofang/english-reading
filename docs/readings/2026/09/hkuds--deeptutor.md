# DeepTutor

[Source Repository](https://github.com/HKUDS/DeepTutor)

Read on: 2026-09-29

---

Based on the document provided and the repository files I've retrieved, here's a comprehensive overview of DeepTutor:

---

## 1. Project Overview

DeepTutor is an **agent-native** intelligent learning platform that transforms how people learn by connecting tutoring, problem-solving, research, and visualization in one **extensible system**. Built on a **two-layer plugin model**, it exposes single-function **Tools** (like web search and reasoning) and multi-stage **Capabilities** (like deep research and mastery paths) through three entry points: a CLI, WebSocket API, and Python SDK. All requests pass through a durable **TurnApplicationService** that manages execution state and replay, routing normalized context to a **TurnEngine** that dispatches work to the selected capability. At its core, DeepTutor solves the problem of fragmented learning by **unifying** chat, quizzes, research, code execution, visualization, and personalized mastery practice into a single **agent-driven** runtime where multiple specialized capabilities—from simple conversation to complex multi-stage workflows—can **access** shared knowledge bases, memory systems, and execution tools. The architecture deliberately separates concerns: Level 1 handles immediate tool invocation (chosen by the LLM on each turn), while Level 2 owns stateful execution logic across multiple turns and stages. This design lets educators and learners **mount** arbitrary tools on demand and lets other agents **drive** DeepTutor as a subordinate system through structured JSON APIs.

---

## 2. Overall Meaning

DeepTutor 是一个以智能代理为中心的学习平台，它将教学、解题、研究、可视化等多个学习功能统一到一个可扩展的系统中。整个架构围绕"工具"（Tools）和"能力"（Capabilities）两个层级组织：第一层是 LLM 按需调用的单一功能工具（如网络搜索），第二层是拥有多阶段执行逻辑的能力模块（如深度研究）。所有用户请求经过持久化的转换应用服务，这个服务协调会话状态和重放，然后把规范化后的上下文路由给转换引擎，最后由引擎分发给选定的能力处理。其创新之处在于将分散的学习工具和流程整合成一个统一的代理驱动运行时，让多个专业化的能力在共享知识库、内存系统和执行工具的基础上协作。

---

## 3. Sentence-by-Sentence Explanation

### Sentence 1

**Original:**

DeepTutor is an **agent-native** intelligent learning platform that transforms how people learn by connecting tutoring, problem-solving, research, and visualization in one **extensible system**.

**中文意思：**

DeepTutor 是一个以智能代理为中心的学习平台，它通过在一个可扩展的系统中连接辅导、解题、研究和可视化功能，从而改变人们的学习方式。

**Key words and expressions:**

- **agent-native** — 以代理（智能助手）为核心设计的，而不是以用户界面或静态工作流为中心
- **extensible system** — 可扩展的系统；指的是设计允许添加新的工具、模块或功能，不需要修改核心代码

---

### Sentence 2

**Original:**

Built on a **two-layer plugin model**, it exposes single-function **Tools** (like web search and reasoning) and multi-stage **Capabilities** (like deep research and mastery paths) through three entry points: a CLI, WebSocket API, and Python SDK.

**中文意思：**

它基于一个二层插件模型构建，通过三个入口（CLI、WebSocket API 和 Python SDK）暴露单一功能的工具（如网络搜索和推理）和多阶段的能力（如深度研究和掌握路径）。

**Key words and expressions:**

- **two-layer plugin model** — 二层插件模型；上层是工具，下层是能力，两层都可以插件形式扩展
- **expose** — 这里的意思是"公开提供""使…可用"，在软件设计中常用来表示暴露 API 或接口
- **entry points** — 入口点；用户或其他系统访问这个应用的不同接口或方式

---

### Sentence 3

**Original:**

All requests pass through a durable **TurnApplicationService** that manages execution state and replay, routing normalized context to a **TurnEngine** that dispatches work to the selected capability.

**中文意思：**

所有请求都经过一个持久化的转换应用服务（TurnApplicationService），该服务管理执行状态和重放，将规范化后的上下文路由给一个转换引擎，由后者分发工作给选定的能力。

**Key words and expressions:**

- **durable** — 这里表示"持久的""可靠的"，指能够保存和恢复状态
- **routing** — 路由；在系统设计中指根据规则把请求转发到合适的目标
- **normalized context** — 规范化的上下文；把来自不同来源的输入转化为统一格式

---

### Sentence 4

**Original:**

At its core, DeepTutor solves the problem of fragmented learning by **unifying** chat, quizzes, research, code execution, visualization, and personalized mastery practice into a single **agent-driven** runtime where multiple specialized capabilities—from simple conversation to complex multi-stage workflows—can **access** shared knowledge bases, memory systems, and execution tools.

**中文意思：**

在其核心上，DeepTutor 通过将聊天、测验、研究、代码执行、可视化和个性化掌握练习统一到一个单一的代理驱动运行时中，解决了学习碎片化的问题，使得从简单对话到复杂多阶段工作流的多个专业化能力都能访问共享的知识库、记忆系统和执行工具。

**Key words and expressions:**

- **fragmented learning** — 学习碎片化；指学习工具、资源和流程散布在不同系统中，不能有效协作
- **agent-driven** — 代理驱动的；指由智能代理（而不是人工指令或硬编码规则）控制执行流
- **access** — 访问；这里表示"有权获取和使用"

---

### Sentence 5

**Original:**

The architecture deliberately separates concerns: Level 1 handles immediate tool invocation (chosen by the LLM on each turn), while Level 2 owns stateful execution logic across multiple turns and stages.

**中文意思：**

该架构故意分离关切（职责）：第一层处理即时工具调用（由 LLM 在每一轮选择），而第二层拥有跨多个轮次和阶段的有状态执行逻辑。

**Key words and expressions:**

- **separates concerns** — 分离关切/职责；软件设计原则，指把不同功能分离到不同模块中以提高可维护性
- **stateful** — 有状态的；指系统保持和跟踪执行期间的状态变化

---

### Sentence 6

**Original:**

This design lets educators and learners **mount** arbitrary tools on demand and lets other agents **drive** DeepTutor as a subordinate system through structured JSON APIs.

**中文意思：**

这个设计让教育工作者和学习者能够按需安装任意工具，也让其他代理能够通过结构化的 JSON API 把 DeepTutor 作为一个从属系统来驱动。

**Key words and expressions:**

- **mount** — 安装、挂载；在这里表示"把工具添加到系统中使其可用"
- **subordinate system** — 从属系统；指一个可以被另一个系统调用和控制的系统

---

## 3. Useful Expressions

### Expression 1

**Expression:** separate concerns

**中文意思：** 分离关切；软件架构设计原则，指把不同功能职责分配到不同层或模块

**Usage:** 常用于描述良好的系统设计，如"The architecture separates concerns by dividing work into tools and capabilities"

---

### Expression 2

**Expression:** expose through

**中文意思：** 通过...公开提供（某个接口或功能）

**Usage:** 常用于描述 API、工具或功能的可访问方式，如"expose the API through REST endpoints"

---

### Expression 3

**Expression:** agent-driven

**中文意思：** 由代理驱动的；由 AI 智能体（而不是用户或硬编码规则）控制流程的

**Usage:** 在现代 AI 系统中常见，表示执行流由智能模型决策而非预定规则决定

---

### Expression 4

**Expression:** mount on demand

**中文意思：** 按需安装/挂载；在需要时动态添加工具或资源到系统

**Usage:** 常用于描述模块化系统如何灵活加载功能，如"mount database drivers on demand"

---

### Expression 5

**Expression:** stateful execution logic

**中文意思：** 有状态的执行逻辑；在执行过程中保持和跟踪状态变化的处理流程

**Usage:** 区别于无状态计算，强调系统在多个阶段间记住上下文和中间结果
