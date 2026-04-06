# CodePress ![Status](https://img.shields.io/badge/status-active-brightgreen)

Turn messy code into AI-ready input in seconds.

CodePress strips comments, whitespace, and clutter from your files so you can send clean, efficient context to AI tools.

<br />

## ✨ Features

- Multi-format support
    - HTML
    - CSS
    - JavaScript
    - Markdown (with code block preservation)
- Smart minification
    - Removes comments
    - Strips extra whitespace
    - Collapses line breaks
    - Keeps essential structure intact
- AI-friendly output format

    ```bash
    (Filename: main.css | Type: CSS)
    /* minified code here */
    ```

- Drag & drop upload
    - Drop files directly into the UI
    - Or click to upload
- Tabbed workflow
    - Switch between HTML, CSS, JS, and MD modes
    - File validation per mode
- Stacked output
    - Multiple files are appended into a single output
    - Perfect for bundling context before sending to AI
- Quick actions
    - Copy to clipboard
    - Clear output instantly

## 🧠 Why CodePress?

AI tools work better with **clean, dense input**.
<br />

Messy code with comments, spacing, and noise:

- wastes tokens
- reduces clarity
- hurts AI understanding

CodePress solves that by giving you:

- smaller input size
- cleaner structure
- better AI responses

## ⚙️ How It Works

1. Select a mode (HTML, CSS, JS, or MD)
2. Upload or drop your file
3. Code is automatically minified
4. Output is formatted and appended
5. Copy and paste into your AI tool

## 📦 Example Output

```bash
(Filename: index.html | Type: HTML)
<!doctype html><html><head>...</head><body>...</body></html>

(Filename: styles.css | Type: CSS)
body{margin:0;padding:0}
```

## 🚧 Current Limitations

- Regex-based minification (not a full parser)
- JavaScript minification is basic (may not handle edge cases)
- No inline code editing (file-based input only)
- No file renaming or manual formatting yet

## 🛠️ Tech Stack

- HTML
- CSS (Glassmorphism UI)
- Vanilla JavaScript

## 💡 Use Case

- Preparing code for ChatGPT or AI tools
- Reducing token usage
- Sharing clean snippets quickly
- Bundling multi-file context into one input
