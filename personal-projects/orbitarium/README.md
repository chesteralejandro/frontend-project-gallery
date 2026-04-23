# Orbitarium

Orbitarium is a visually rich, interactive Solar System simulation built using pure HTML, CSS, and JavaScript — no 3D libraries, no frameworks.

It demonstrates how far carefully structured layouts, CSS animations, and thoughtful interaction design can go in creating an immersive educational experience.

<br />

## 🚀 Features

### 🪐 Fully Animated Orbital System

- Planets orbit the Sun with consistent motion and spacing
- Nested orbit system (e.g., Moon orbiting Earth)

### 🎯 Interactive Planet Focus

- Click any planet to center and zoom into it
- Background planets dim for visual hierarchy

### 🧭 Dynamic Camera System

- Smooth camera translation and scaling toward selected planets
- Reset view by clicking outside any planet

### 🧾 Smart Information Panel

- Displays planet name and description
- Follows the selected planet in real-time
- Automatically avoids screen edges

### 🔊 Audio Experience

- Background ambient music
- Voice narration for each planet
- Smooth volume transitions during interactions

### 🎬 Cinematic Intro

- Glassmorphism start screen
- Controlled entry animation into the solar system
- Welcome voice narration

## 🛠️ Tech Stack

- HTML5 – semantic structure
- CSS3
    - Custom properties (variables)
    - Keyframe animations
    - 2D transforms
    - Glassmorphism UI
- Vanilla JavaScript (ES Modules)
    - DOM interaction
    - Animation control
    - Audio management

## 📁 Folder Structure

```bash
📁 orbitarium/
├── index.html
├── README.md
├── 📁 css/
│   ├── celestial.css
│   ├── main.css
│   └── orbit.css
├── 📁 js/
│   ├── main.js
│   └── 📁 constants/
│       └── planetData.js
└── 📁 assets/
    ├── 📁 audio/
    │   ├── 📁 music/
    │   │   └── cosmos.mp3
    │   └── 📁 voice/
    │       ├── earth.mp3
    │       ├── jupiter.mp3
    │       ├── mars.mp3
    │       ├── mercury.mp3
    │       ├── moon.mp3
    │       ├── neptune.mp3
    │       ├── saturn.mp3
    │       ├── sun.mp3
    │       ├── uranus.mp3
    │       ├── venus.mp3
    │       └── welcome.mp3
    └── 📁 images/
        ├── 📁 background/
        │   └── stars.png
        └── 📁 textures/
            ├── earth.webp
            ├── jupiter.webp
            ├── mars.webp
            ├── mercury.webp
            ├── moon.webp
            ├── neptune.webp
            ├── saturn.webp
            ├── sun.webp
            ├── uranus.webp
            └── venus.webp
```

## 🎮 How to Use

1. Open index.html in your browser
2. Click Start Experience
3. Wait for the intro animation and narration
4. Click on any planet to:
    - Focus and zoom in
    - View information
    - Hear narration
5. Click anywhere outside a planet to reset the view

## 🧠 Design Principles

- **Visual Hierarchy**<br />
  Focus-driven interaction using scale, opacity, and motion
- **Consistency Over Realism**<br />
  Orbital timing and spacing are tuned for clarity, not scientific accuracy
- **Performance First**<br />
  Achieved using only CSS animations and lightweight JavaScript
- **Immersion Through Simplicity**<br />
  No external libraries — everything is handcrafted

## ⚠️ Limitations

- Not physically accurate (orbital speeds and distances are stylized)
- Desktop-first experience (mobile optimizations can be improved)
- Audio depends on user interaction due to browser autoplay policies

## 🔮 Potential Improvements

- Better mobile responsiveness
- Hover/click assist for small fast-moving planets
- Zoom depth layers (parallax feel)
- UI controls (pause, speed control, mute)
- Educational mode (quiz / guided tour)

## 📥 Assets

Planet textures sourced from: <br />
[https://www.solarsystemscope.com/textures/](https://www.solarsystemscope.com/textures/)

Background Image from: <br />
[transparenttextures.com](transparenttextures.com)

## 🤖 AI Assistance

This project was built with the help of AI tools (ChatGPT) for:

- Guidance and problem-solving
- Iterative refinement

> All code was **reviewed, modified, and understood** as part of the learning and development process.
