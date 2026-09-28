# DeepTutor

[Source Repository](https://github.com/HKUDS/DeepTutor)

Read on: 2026-09-29

---

### Project Overview

#### 中文概览

DeepTutor 是一个面向长期个性化学习的智能辅导平台，能够把对话、检索、研究、解题、出题、可视化和掌握式练习整合到同一个学习工作区中。它采用“工具 + 能力”的 agent-native 架构：工具负责一次性的动作，而能力负责拥有完整生命周期的多阶段学习任务。CLI、WebSocket API、Web 界面和 Python 服务共同进入统一的回合处理流程，再由共享的运行时把请求交给合适的能力。项目还通过知识库、记忆、工作区、文档处理和多种模型提供商，为持续的个性化学习提供上下文和外部能力。

DeepTutor is an agent-native learning workspace designed to provide long-term, personalized tutoring through conversation, research, problem solving, question generation, visualization, and guided practice.

It separates one-shot Tools, such as web search or reasoning, from multi-stage Capabilities, such as deep research, deep solving, immersive reading, and mastery-based learning.

The CLI, WebSocket API, and web application all enter a shared turn-processing pipeline that persists state, streams events, and routes normalized context to the selected capability.

At the center of the system, a turn application service coordinates durable sessions and replay, while the turn engine and chat orchestrator manage the agent loop.

The tool and capability registries make the runtime extensible by controlling which tools are available and which multi-stage workflows can take ownership of a turn.

Knowledge bases provide retrieval-augmented context from documents through engines such as LlamaIndex, PageIndex, GraphRAG, and LightRAG.

The platform also maintains reusable learning context through workspaces, notebooks, books, memory, skills, personas, and partner agents.

A FastAPI backend exposes HTTP and WebSocket services, while a Next.js and React frontend presents chat, reading, writing, research, visualization, and learning-management experiences.

During execution, a user request is normalized into a turn, the selected capability invokes tools and external model providers, and streamed results are persisted and replayed to the client.

The project depends on Python 3.11 or newer, Node.js, multiple LLM provider SDKs, document-processing libraries, vector and retrieval systems, and optional services such as Redis, PocketBase, Docker, and sandbox runners.

#### Sentence-by-sentence explanation

Original:

DeepTutor is an agent-native learning workspace designed to provide long-term, personalized tutoring through conversation, research, problem solving, question generation, visualization, and guided practice.

中文意思：

DeepTutor 是一个采用 agent-native 设计理念的学习工作区，旨在通过对话、研究、解题、生成问题、可视化和引导式练习，为用户提供长期且个性化的辅导。

Key words and expressions:

- agent-native — 以智能代理为核心进行设计的
- learning workspace — 学习工作区；不仅是聊天界面，还整合了资料、记忆和学习活动
- long-term, personalized tutoring — 长期的个性化辅导
- guided practice — 有引导的练习过程

Original:

It separates one-shot Tools, such as web search or reasoning, from multi-stage Capabilities, such as deep research, deep solving, immersive reading, and mastery-based learning.

中文意思：

它把一次性完成单个动作的工具（例如网页搜索或推理）与需要多个阶段完成的能力（例如深度研究、深度解题、沉浸式阅读和掌握式学习）区分开来。

Key words and expressions:

- separate A from B — 将 A 与 B 分开
- one-shot — 一次性的、单次执行的
- multi-stage Capabilities — 多阶段能力；通常包含多个连续的处理步骤
- take ownership of a turn — 负责处理一个完整的用户回合

Sentence structure:

`such as ...` 插入两个例子，用来分别说明 Tools 和 Capabilities 的含义；主干是 `It separates A from B`。

Original:

The CLI, WebSocket API, and web application all enter a shared turn-processing pipeline that persists state, streams events, and routes normalized context to the selected capability.

中文意思：

命令行界面、WebSocket API 和 Web 应用都会进入同一个共享的回合处理管线；这个管线负责保存状态、流式传输事件，并把标准化后的上下文路由给选定的能力。

Key words and expressions:

- enter a shared pipeline — 进入共享的处理管线
- persist state — 持久化保存状态
- stream events — 持续流式传输事件
- normalized context — 经过统一格式处理的上下文
- route A to B — 将 A 路由到 B

Original:

At the center of the system, a turn application service coordinates durable sessions and replay, while the turn engine and chat orchestrator manage the agent loop.

中文意思：

在系统中心，回合应用服务负责协调持久化会话和回放；与此同时，回合引擎与聊天编排器负责管理 agent 循环。

Key words and expressions:

- at the center of the system — 位于系统的核心位置
- application service — 应用服务；负责协调业务流程，而不只是处理单个函数调用
- durable sessions — 可以长期保存、恢复和继续使用的会话
- replay — 回放已经产生的事件或结果
- orchestrator — 编排器；负责协调多个组件或步骤

Sentence structure:

`while` 连接两个并行职责：前半句描述 application service 的职责，后半句描述 turn engine 和 chat orchestrator 的职责。

Original:

The tool and capability registries make the runtime extensible by controlling which tools are available and which multi-stage workflows can take ownership of a turn.

中文意思：

工具注册表和能力注册表通过控制哪些工具可用、哪些多阶段工作流可以接管一个回合，使运行时能够方便地扩展。

Key words and expressions:

- registry — 注册表；用于登记、查找和管理可用组件
- make the runtime extensible — 使运行时具有可扩展性
- control which ... — 控制哪些对象或功能可以被使用
- workflow — 工作流；由多个步骤组成的处理过程
- take ownership of a turn — 负责完成一个完整回合

Original:

Knowledge bases provide retrieval-augmented context from documents through engines such as LlamaIndex, PageIndex, GraphRAG, and LightRAG.

中文意思：

知识库通过 LlamaIndex、PageIndex、GraphRAG 和 LightRAG 等引擎，从文档中提供检索增强的上下文。

Key words and expressions:

- knowledge base — 知识库
- retrieval-augmented context — 通过检索外部资料补充的上下文
- from documents — 从文档中提取或检索信息
- retrieval engine — 检索引擎；负责查找与问题相关的内容

Original:

The platform also maintains reusable learning context through workspaces, notebooks, books, memory, skills, personas, and partner agents.

中文意思：

这个平台还通过工作区、笔记本、书籍、记忆、技能、角色设定和合作 agent，维护可以在不同学习任务之间重复使用的学习上下文。

Key words and expressions:

- maintain reusable context — 维护可复用的上下文
- workspace — 工作区；用于组织资料、会话和生成内容
- persona — 角色设定；描述 agent 的身份、行为风格或教学方式
- partner agents — 可以长期运行并与用户交互的合作型 agent

Original:

A FastAPI backend exposes HTTP and WebSocket services, while a Next.js and React frontend presents chat, reading, writing, research, visualization, and learning-management experiences.

中文意思：

FastAPI 后端对外提供 HTTP 和 WebSocket 服务，而 Next.js 与 React 前端则呈现聊天、阅读、写作、研究、可视化和学习管理功能。

Key words and expressions:

- expose services — 对外暴露或提供服务接口
- backend — 后端服务
- frontend — 前端界面
- present ... experiences — 为用户呈现某类完整的交互体验
- learning-management experiences — 学习管理相关的交互功能

Original:

During execution, a user request is normalized into a turn, the selected capability invokes tools and external model providers, and streamed results are persisted and replayed to the client.

中文意思：

执行过程中，用户请求会被标准化为一个回合；选定的能力会调用工具和外部模型提供商；产生的流式结果会被持久化，然后回放给客户端。

Key words and expressions:

- during execution — 在执行过程中
- be normalized into — 被标准化为某种统一的数据结构
- invoke tools — 调用工具
- external model providers — 外部模型服务提供商
- be persisted and replayed — 被持久化并回放

Sentence structure:

这是一个由三个并列部分组成的流程句：请求被标准化，能力调用工具和模型，结果被保存并发送给客户端。

Original:

The project depends on Python 3.11 or newer, Node.js, multiple LLM provider SDKs, document-processing libraries, vector and retrieval systems, and optional services such as Redis, PocketBase, Docker, and sandbox runners.

中文意思：

这个项目依赖 Python 3.11 或更高版本、Node.js、多种大语言模型提供商 SDK、文档处理库、向量与检索系统，以及 Redis、PocketBase、Docker 和沙箱运行器等可选服务。

Key words and expressions:

- depend on — 依赖
- LLM provider SDKs — 大语言模型服务提供商的软件开发工具包
- document-processing libraries — 文档处理库
- vector and retrieval systems — 向量系统和检索系统
- optional services — 可选服务；不是所有部署都必须启用

#### High-value expressions

Expression: separate A from B

中文意思：将 A 与 B 区分开。

Usage: 常用于说明架构中两个职责不同的模块或概念如何被拆分。

Expression: persist state

中文意思：持久化保存状态。

Usage: 常用于描述会话、任务或应用数据被保存下来，以便之后恢复或继续处理。

Expression: route A to B

中文意思：将 A 路由到 B。

Usage: 常用于请求处理、消息分发和服务编排场景。

Expression: take ownership of a turn

中文意思：接管并负责完成一个完整回合。

Usage: 用来说明某个能力或组件不仅执行一个动作，而是负责整个用户请求的生命周期。

Expression: make the runtime extensible

中文意思：使运行时具有可扩展性。

Usage: 常用于插件系统、注册表和模块化架构的说明。

Expression: be normalized into

中文意思：被标准化为。

Usage: 常用于描述来自不同入口或格式的数据被转换成统一的内部表示。

Expression: be persisted and replayed

中文意思：被持久化并回放。

Usage: 常用于事件流、会话恢复、消息系统和可重放的运行时架构。
