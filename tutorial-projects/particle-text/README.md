# Particle Text

An interactive **particle-based text animation** built using the HTML Canvas API.

Particles form dynamic text and respond to mouse movement with different animation effects.
Particle text using HTML Canvas. This is a tutorial project by **Frank's Laboratory**.

<br />

## 📷 Preview

![Preview](../../assets/thumbnails/particle-text.webp)

## ✨ Features

- 🔤 Convert text into particle-based visuals
- 🎯 Mouse interaction (repel effect)
- 🌈 Gradient-colored text rendering
- 🧠 Smooth easing + friction-based motion
- ⏱ Debounced input handling for performance
- 📱 Responsive full-screen canvas

## 🧩 How It Works

1. **Text Rendering**
    - Text is drawn on the canvas using a gradient fill.

2. **Pixel Extraction**
    - `getImageData()` reads pixel values from the rendered text.

3. **Particle Generation**
    - Each visible pixel becomes a `Particle` instance.

4. **Animation Loop**
    - Particles update position using:
        - Mouse repulsion force
        - Friction
        - Easing back to origin

## Folder Structure

```bash
📁 particle-text/
├── index.html
├── README.md
├── 📁 classes/
│   ├── Canvas.js
│   └── Particle.js
├── 📁 css/
│   └── style.css
└── 📁 js/
    └── script.js
```

## 🛠️ Tech Stack

- HTML5 Canvas API
- CSS
- Vanilla JavaScript (ES Modules)

## 🎮 Usage

1. Open the app in a browser
2. Type any text in the input field
3. Move your mouse across the canvas to interact with the particles

## 📌 Notes

- Particle density is controlled via `gap` in `Canvas.js`
- Mouse interaction radius can be adjusted for different effects
- Text rendering adapts based on screen size and input length
- This project is part of my **Frontend Project Gallery**, where I document and improve small UI/interaction experiments.

## 🚀 Potential Improvements

- Add controls UI (particle size, gap, colors)
- Add touch support (mobile interaction)
- Add performance toggle (low/high particle density)
- Export as reusable module (future portfolio move)
