# CodePress ![Status](https://img.shields.io/badge/status-active-brightgreen)

Clean code. Better AI results.

CodePress is a lightweight frontend tool that removes comments, whitespace, and unnecessary line breaks from your code, helping you prepare compact, readable input for AI tools like ChatGPT.

<br />

## ✨ Features

### 🧠 Smart Auto-Detection

- Automatically detects file type:
    - HTML
    - CSS
    - JavaScript
    - Markdown
- Works from:
    - Pasted code
    - Uploaded files
- Visual feedback with a **filetype badge**

---

### ⚡ Instant Minification

- Removes:
    - Comments
    - Extra whitespace
    - Line breaks
- Keeps structure readable and AI-friendly
- Markdown support includes:
    - Code block preservation (``` blocks stay intact)

---

### 🖱️ Flexible Input

- Paste code directly
- Drag & drop files
- File upload support (`.html`, `.css`, `.js`, `.md`)
- Click-to-focus input zone

---

### 📦 AI-Ready Output Format

- Multiple inputs are stacked into one output
- Perfect for sending full project context to AI

#### Example Output

```bash
(Filetype: HTML)
<!doctype html><html><head>...</head><body>...</body></html>

(Filename: script.js | Filetype: JS)
const x=10;function test(){return x;}
```

---

### 🎨 Visual Feedback UI

- Filetype badge appears after processing
- Input zone briefly highlights based on detected type:
    - HTML → orange
    - CSS → blue
    - JS → yellow
    - Markdown → gray

---

### 🎬 Quick Actions

- Copy output to clipboard
- Clear input and output instantly
- Copy button gives visual success feedback

<br />

## 🧠 Why CodePress?

AI tools perform better with **clean, dense, and structured input**.

#### Messy code:

- wastes tokens
- reduces clarity
- introduces noise

#### CodePress helps you:

- reduce token usage
- improve AI understanding
- send cleaner multi-file context

## ⚙️ How It Works

1. Paste code or drop a file
2. CodePress detects the file type automatically
3. Code is minified instantly
4. Output is formatted and appended
5. Copy and use in your AI tool

## 🚧 Current Limitations

- Regex-based minification (not a full parser)
- JavaScript minification is basic (may break edge cases)
- File type detection is heuristic (can misclassify complex inputs)
- No syntax highlighting yet
- No manual formatting controls

## 🛠️ Tech Stack

- HTML
- CSS
- Vanilla JavaScript

## 💡 Use Cases

- Preparing code for ChatGPT and other AI tools
- Reducing token usage
- Sharing clean snippets quickly
- Bundling multi-file context into one input-

## 🚀 Future Improvements

- Stronger file type detection
- Safer JavaScript minification
