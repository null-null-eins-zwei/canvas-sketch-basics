# canvas-sketch-basics

This repo is based on "[Creative Coding: Making Visuals with JavaScript](https://www.domestika.org/en/courses/2729-creative-coding-making-visuals-with-javascript)" Domestika course.

## Raw HTML Canvas API usage

[raw-canvas.html](raw-canvas.html) is an example of usage raw canvas API including basic animation .

Links to additional resources:
* https://developer.mozilla.org/en-US/docs/Web/API/Canvas_API
* https://www.w3schools.com/graphics/canvas_intro.asp

## Tool: [canvas-sketch](https://github.com/mattdesl/canvas-sketch) and [canvas-sketch-util](https://github.com/mattdesl/canvas-sketch-util)

`canvas-sketch` is a loose collection of tools, modules and resources for creating generative art in JavaScript and the browser.

### CLI setup:
* https://github.com/mattdesl/canvas-sketch
* `npm install canvas-sketch-cli --global`
  * https://github.com/mattdesl/canvas-sketch/blob/master/docs/cli.md 

### Basic CLI usage:
* Create new: `canvas-sketch canvas-sketch-demo.js --new --open`
* Run existed: `canvas-sketch canvas-sketch-demo.js --open`
* Build to website: `canvas-sketch mysketch.js --name index --build --inline`
  * https://github.com/mattdesl/canvas-sketch/blob/master/docs/cli.md#building-to-a-website

### Animation export
* We can save anything we draw with `Ctrl + S`.
* By default export save in `Download` folder. To set another folder, use `--output` flag.
* When you use `Ctrl + Shift + S` to export an animation, it will begin recording *image frames as separate files* and log progress in the browser console. You can hit this keystroke again to stop recording.
* To save animation as video we need ffmpeg: 
  * `npm install @ffmpeg-installer/ffmpeg --global`
* Run with video-export mode: `canvas-sketch canvas-sketch-demo.js --output=output/stream-demo --stream`
* Details: https://github.com/mattdesl/canvas-sketch/blob/master/docs/exporting-artwork.md#exporting-animations

## Tweakpane:
Compact pane library for fine-tuning parameters and monitoring value changes.
* https://cocopon.github.io/tweakpane/
* https://www.npmjs.com/package/tweakpane