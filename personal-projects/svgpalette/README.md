# SVGPalette

A lightweight, browser-based SVG editor that lets you paste, preview, recolor, and download SVGs instantly — no design tools or manual code editing required.

<br />

## 🚀 Features

### 🧾 Paste SVG Code

- Large input area for raw SVG markup
- Automatically validates structure before processing

### 👀 Live Preview

- Instant rendering of valid SVGs
- Clear empty and error states for better UX

### 🎨 Dynamic Color Editor

- Detects fill and stroke colors automatically
- Supports:
    - Hex colors (`#fff`, `#ffffff`)
    - `currentColor` (convertible to hex)
- Generates color pickers dynamically
- Updates SVG and preview in real time

### 🔁 Smart Color Handling

- Deduplicates colors for cleaner editing
- Converts shorthand hex (#fff) → full hex (#ffffff)
- Handles global color replacement safely using regex escaping

### ⬇️ Download SVG

- One-click export using Blob API
- Automatic filename sanitization
- Ensures .svg extension

### 🧹 Clear & Reset

- Reset input, preview, colors, and filename instantly

## 🧠 How It Works

1. Paste SVG into the editor
2. App validates and renders it
3. Colors are extracted automatically
4. Color pickers are generated
5. Changes update SVG + preview instantly
6. Download the final SVG

## Folder Structure

```
📁 svgpalette/
├── index.html
├── README.md
├── 📁 css/
│   ├── main.css
│   └── setup.css
├── 📁 js/
│   ├── main.js
│   ├── 📁 constants/
│   │   └── elements.js
│   └── 📁 helpers/
│       ├── ensureSVGNamespace.js
│       ├── escapeRegex.js
│       ├── isValidSVG.js
│       ├── normalizeHex.js
│       ├── sanitizeFilename.js
│       ├── showColorsMessage.js
│       ├── showPreviewMessage.js
│       └── showPreviewSVG.js
└── 📁 assets/
    └── 📁 icons/
        ├── clear.svg
        ├── download.svg
        └── preview.svg
```

## 🛠️ Tech Stack

- HTML5
- CSS (custom properties)
- Vanilla JavaScript (ES Modules)
- Browser APIs (Blob, DOM)

> No frameworks. No build tools.

## ⚠️ Limitations

Supports:

- Hex colors (#fff, #ffffff)
- currentColor

Not yet supported:

- rgb(), hsl()
- Inline styles
- Gradients / complex SVGs

## 🎯 Future Improvements

- Support for rgb(), hsl(), and named colors
- Parse inline styles
- Better SVG validation (DOMParser)
- Gradient and advanced SVG support

## 💡 Design Philosophy

SVGPalette focuses on:

- Speed over complexity
- Clarity over features
- Real-time feedback
- Developer-friendly experience

> No unnecessary UI. No heavy dependencies. Just a tool that works.
