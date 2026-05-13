# AITI 项目规范

> 本文件约束 AITI 项目的所有开发行为。同时遵守父级 `~/.claude/CLAUDE.md` 的全局约定。

## 项目概览

**AITI（AI Type Indicator）** —— 一个病毒式 AI 使用水平测试工具，风格参照 SBTI（MBTI 的恶搞版）。

- **产品文件**：`index.html`（HTML shell）+ `src/`（所有逻辑与数据）
- **原始灵感**：`AI使用水平10个等级.md`
- **参考源码**：`sbti-test-main/`（只读参考，不修改）

---

## 新对话必读清单

开始任何开发任务前，**必须先读**以下文件（按顺序）：

1. `docs/design-decisions.md` — 所有已拍板的设计决策和理由
2. `docs/conversation-log.md` — 对话历史摘要，了解背景和待跟进事项
3. `docs/sbti-research.md` — SBTI 机制研究，理解参照物
4. `AI使用水平10个等级.md` — 原始分级框架，所有维度/人设的理论来源

读完后再动手，不重复问用户已经确认过的事情。

---

## 文档沉淀规范

### 什么时候更新文档

| 触发条件 | 更新哪个文件 |
|---------|-------------|
| 用户确认了一个新的设计决策 | `docs/design-decisions.md` |
| 对话结束或有重要决策变更 | `docs/conversation-log.md` |
| 发现 SBTI 新的机制细节 | `docs/sbti-research.md` |
| 新增或修改人设 | `docs/design-decisions.md` 的人设表格 |

### 文档目录结构

```
AI_Level_test/
├── CLAUDE.md                  # 本文件，项目规范
├── index.html                 # HTML shell（仅结构，无样式无逻辑）
├── src/
│   ├── main.js                # UI 逻辑（渲染、导航、分享卡）
│   ├── engine.js              # 计分逻辑（纯函数，无 DOM）
│   ├── styles.css             # 所有样式
│   └── data/
│       ├── questions.js       # 20道题目数据
│       └── personas.js        # 人设与稀有度数据
├── package.json               # Vite 项目配置
├── vite.config.mjs
├── AI使用水平10个等级.md       # 原始灵感文章
├── sbti-test-main/            # 参考源码（只读）
└── docs/
    ├── design-decisions.md    # 设计决策记录（最重要）
    ├── conversation-log.md    # 对话历史摘要
    └── sbti-research.md       # SBTI 机制研究笔记
```

---

## 开发规范

### 技术约束（不得违反）
- **数据与 UI 分离**：
  - `src/data/` + `src/engine.js` 不得包含任何 DOM 操作
  - `src/main.js` 不得硬编码题目、人设数据、计分阈值
  - `index.html` 只含 HTML 骨架，不含任何数据或逻辑
- **无后端**，无服务器，无数据库，无 API 调用
- 构建工具：Vite。`npm run dev` 本地开发，`npm run build` 生成 `dist/`
- 外部依赖：`html2canvas`（npm 包，在 `src/main.js` 中 import），其余不引入新依赖
- 不引入 React / Vue 等框架

### 改动规范
- 改任何 `src/` 文件前必须先用 Read 工具读取当前内容
- 任何影响题目、人设、计分逻辑的修改，仅改 `src/data/` 或 `src/engine.js`，同步更新 `docs/design-decisions.md`
- 不在 `sbti-test-main/` 目录内做任何修改
- 改完后跑 `npm run build` 验证无报错

### 内容规范
- 人设文案风格：幽默、自嘲、具体，参考 SBTI 的写法（见 `docs/sbti-research.md`）
- 人设描述：静态写死，不靠运行时生成
- 题目：情景式，贴近真实 AI 使用行为，不说教

---

## 红线（必须停下来问用户）

继承父级 CLAUDE.md 的全局红线，此外本项目额外增加：

- 修改四个核心维度定义（C/B/F/R）
- 删除或新增彩蛋人设
- 改变计分算法或等级阈值
- 将数据写入 `index.html` 或 `src/main.js`

---

## 快速上下文恢复

如果对话中断，新会话重新开始，按以下顺序恢复上下文：

```
1. 读 docs/design-decisions.md       → 了解所有已定的设计
2. 读 docs/conversation-log.md       → 了解历史进度和待跟进
3. 读 src/data/questions.js (前50行) → 了解当前数据结构
4. 告知用户：已恢复上下文，从哪里继续
```

不要在没读文档的情况下直接开始开发或回答设计问题。
