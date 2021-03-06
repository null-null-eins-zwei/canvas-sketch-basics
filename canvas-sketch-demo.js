import canvasSketch from 'canvas-sketch';
import random from 'canvas-sketch-util/random';
import {Pane as Tweakpane} from 'tweakpane';

const settings = {
  dimensions: [ 1080, 1080 ],
};

let manager;

let fontSize = 1200;
let fontFamily = 'serif';

const PARAMS = {
  text: 'k',
  glyphs: '_= /',
  background1: '#640096',
  background2: '#ffff37',
};

const typeCanvas = document.createElement('canvas');
const typeContext = typeCanvas.getContext('2d');

const sketch = ({ context, width, height }) => {
  const cell = 20;
  const cols = Math.floor(width  / cell);
  const rows = Math.floor(height / cell);
  const numCells = cols * rows;
  
  typeCanvas.width  = cols;
  typeCanvas.height = rows;

  return ({ context, width, height }) => {
    fontSize = cols * 1.2;
    updateTypeCanvas(fontSize);

    // Off-white background
    context.fillStyle = 'hsl(0, 0%, 98%)';
    context.fillRect(0, 0, width, height);

    // Gradient background
    const margin = 50;
    const fill = context.createLinearGradient(0, 0, width, height);
    fill.addColorStop(0, PARAMS.background1);
    fill.addColorStop(1, PARAMS.background2);
    context.fillStyle = fill;
    context.fillRect(margin, margin, width - margin * 2, height - margin * 2);
  
    // Draw
    // context.drawImage(typeCanvas, 0, 0); // debug visualisation
		const typeData = typeContext.getImageData(0, 0, cols, rows).data;

		context.textBaseline = 'middle';
		context.textAlign = 'center';

		for (let i = 0; i < numCells; i++) {
			const col = i % cols;
			const row = Math.floor(i / cols);

			const x = col * cell;
			const y = row * cell;

			const r = typeData[i * 4 + 0];
			const g = typeData[i * 4 + 1];
			const b = typeData[i * 4 + 2];
			const a = typeData[i * 4 + 3];

			const glyph = getGlyph(r);

			context.font = `${cell * 2}px ${fontFamily}`;
			if (Math.random() < 0.1) {
        context.font = `${cell * 6}px ${fontFamily}`;
      }

			context.fillStyle = 'white';

			context.save();
			context.translate(x, y);
			context.translate(cell * 0.5, cell * 0.5);

      context.fillText(glyph, 0, 0);
			
			context.restore();
		}
  };
};

const createPane = () => {
  const pane = new Tweakpane();
  const flBasics = pane.addFolder({ title: 'Basics' });
  flBasics.addInput(PARAMS, 'glyphs');
  flBasics.addMonitor(PARAMS, 'text');

  const flBackground = pane.addFolder({ title: 'Background' })
  flBackground.addInput(PARAMS, 'background1', {view: 'color', picker: 'inline', expanded: true });
  flBackground.addInput(PARAMS, 'background2', {view: 'color', picker: 'inline', expanded: true });

  pane.on('change', (ev) => {
    console.log('changed: ' + JSON.stringify(ev.value));
    manager.render();
  });
}

const updateTypeCanvas = (fontSize) => {
  typeContext.fillStyle = 'black';
  typeContext.fillRect(0, 0, typeCanvas.width, typeCanvas.height);

  typeContext.fillStyle = 'white';
  typeContext.font = `${fontSize}px ${fontFamily}`;
  typeContext.textBaseline = 'top';

  const metrics = typeContext.measureText(PARAMS.text);
  const mx = metrics.actualBoundingBoxLeft * -1;
  const my = metrics.actualBoundingBoxAscent * -1;
  const mw = metrics.actualBoundingBoxLeft + metrics.actualBoundingBoxRight;
  const mh = metrics.actualBoundingBoxAscent + metrics.actualBoundingBoxDescent;

  const tx = (typeCanvas.height - mw) * 0.5 - mx;
  const ty = (typeCanvas.width - mh) * 0.5 - my;

  typeContext.save();
  typeContext.translate(tx, ty);

  typeContext.beginPath();
  typeContext.rect(mx, my, mw, mh);
  typeContext.stroke();

  typeContext.fillText(PARAMS.text, 0, 0);
  typeContext.restore();
}

const getGlyph = (v) => {
	if (v < 50) return '';
	if (v < 100) return '.';
	if (v < 150) return '-';
	if (v < 200) return '+';

	return random.pick(PARAMS.glyphs.split(''));
};

const onKeyUp = (e) => {
	PARAMS.text = e.key.toUpperCase();
	manager.render();
};

const start = async () => {
	manager = await canvasSketch(sketch, settings);
};

createPane();
start();
document.addEventListener('keyup', onKeyUp);

