# 📁 File Reader & Writer

A developer-focused collection of lightweight browser and Node.js utilities for inspecting raw file bytes and converting local assets into Base64-encoded JavaScript buffer modules (`window.thisBuffer`).

These tools are primarily intended to help embed binary/audio assets directly into `.js` scripts so static HTML/JS projects can load them via `<script>` tags without hitting local `file://` CORS restrictions.

## 📂 Tools Included

### 1. FileReader (`FileReader/`) *(Created October 21, 2025)*
A browser-based binary and hexadecimal file inspector.
- Reads any selected file as an `ArrayBuffer` using the browser `FileReader` API and `DataView`.
- Displays every byte in a column layout showing:
  1. Byte offset (decimal index)
  2. Two-digit uppercase hexadecimal value (custom `DecToHex` converter)
  3. ASCII character representation (`String.fromCharCode`)

### 2. FileWriter — Browser Version (`FileWriter/Browser version/`) *(Created June 4, 2026)*
A single-file browser converter that turns any selected file into a downloadable JavaScript module.
- Reads the file via `FileReader.readAsDataURL()`.
- Generates and downloads `<filename>.js` containing:
  ```js
  const thisBuffer = {
      "<filename>": "data:<mime>;base64,..."
  };

  window.thisBuffer = thisBuffer;
  ```

### 3. FileWriter — Offline Version (`FileWriter/Offline version/`) *(Created June 4, 2026)*
A Node.js batch compiler for bundling multiple files at once.
- Reads all files placed inside the `folder/` directory.
- Encodes each file to Base64 and writes a combined `thisBuffer.js` exposing `window.thisBuffer`.
- **Usage**:
  1. Place your files inside `FileWriter/Offline version/folder/`.
  2. Open a terminal in `FileWriter/Offline version/`.
  3. Run:
     ```bash
     node fileWriter.js
     ```

## 🖥️ Requirements & Platform

- **FileReader** & **FileWriter (Browser Version)**: Any modern web browser.
- **FileWriter (Offline Version)**: **Node.js** (uses built-in `fs` and `path` modules only; no external dependencies).

## ⚠️ Notes & Limitations

- **FileReader performance**: Creates one DOM element (`.column` with 3 child `<div>`s) per byte of the selected file, so opening large files will be slow or freeze the browser tab.
- **Offline FileWriter MIME types**: `fileWriter.js` explicitly maps `.wav` (`audio/wav`) and `.ogg` (`audio/ogg`), and defaults all other extensions to `audio/mp3`.
- **Browser FileWriter HTML**: `FileWriter/Browser version/HTML.html` retains the original `<title>Lecteur de fichiers</title>` and meta description from `FileReader`.
