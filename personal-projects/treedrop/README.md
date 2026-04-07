# TreeDrop ![Status](https://img.shields.io/badge/status-active-brightgreen)

TreeDrop is a lightweight frontend utility that lets you drag and drop a project folder and instantly generate a clean ASCII tree structure.

Perfect for:

- README documentation
- Sharing project structure in chats
- Giving AI tools better context

<br />

## 🎯 Why TreeDrop Exists

When documenting projects or asking for help, sharing a clean folder structure is often necessary — but manually writing it is tedious and error-prone.

TreeDrop solves this by instantly generating a readable ASCII tree from a real project folder, making documentation faster and more accurate.

This tool focuses on **speed, simplicity, and developer experience**, instead of adding unnecessary complexity.

## ✨ Features

- 📂 Drag & Drop Folder Upload
- 🌳 Automatic ASCII Tree Generation
- 🚫 Smart Ignoring of Unnecessary Folders
    - node_modules
    - .git
    - dist
    - build
- 📋 One-Click Copy
    - Visual feedback (Copied! state + color change)
- 🧹 Clear Output Button
- 🎨 Clean and minimal UI

## 🖥️ Demo Behavior

1. Drag and drop a folder into the drop zone
2. TreeDrop processes the structure
3. A formatted ASCII tree is generated
4. Copy or clear the result as needed

**Example output:**

```bash
📁 project/
├── index.html
├── 📁 css/
│   └── main.css
├── 📁 js/
│   └── main.js
└── README.md
```

## 🚀 How It Works

TreeDrop uses the browser’s File API to:

- Traverse directory structures (webkitGetAsEntry)
- Reconstruct hierarchy in memory
- Render a formatted ASCII tree using recursive logic

## 📁 Project Structure

```bash
📁 treedrop/
├── index.html
├── README.md
├── 📁 css/
│   └── main.css
└── 📁 js/
    └── main.js

```

## 🧠 Engineering Focus

While building TreeDrop, the focus was on:

- **Efficient tree construction**
    - Converting flat file paths into a nested structure

- **Recursive rendering**
    - Generating clean and readable ASCII output

- **User experience details**
    - Immediate visual feedback on copy action
    - Disabled states to prevent invalid actions

- **Practical defaults**
    - Ignoring heavy/unnecessary folders like `node_modules`

The goal was not just to make it work, but to make it **pleasant and reliable to use**.

## 🗒️ Key Implementation Details

- Recursive directory traversal
- Tree object construction
- ASCII rendering with proper branching (`├──`, `└──`, `│`)
- UI state management
    - Button enable/disable
    - Copy feedback animation

- Folder filtering system

```js
const IGNORED_FOLDERS = ['node_modules', '.git', /^dist$/, /^build$/];-
```

## ⚠️ Trade-offs & Limitations

- Relies on non-standard browser APIs (`webkitGetAsEntry`)
    - Best supported in Chromium-based browsers

- Large directories may impact performance due to recursive traversal
- No persistence — output is not saved automatically

These decisions were intentional to keep the app **fully client-side and lightweight**, avoiding backend complexity.

## 🤖 AI Assistance Disclosure

This project was built with the help of AI as a development assistant. <br />

All implementation decisions, refinements, and trade-offs were reviewed and guided to ensure the final result is intentional and well understood.

## 💬 Final Note

TreeDrop is intentionally simple — fast, focused, and practical. <br />
If it saves you even a few minutes when documenting projects, it’s doing its job.
