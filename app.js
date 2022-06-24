const canvas = document.getElementById('jsCanvas');
const ctx = canvas.getContext('2d');
const colors = document.querySelectorAll('.controls_color');
const range = document.getElementById('jsRange');
const mode = document.getElementById('jsMode');
const saveBtn = document.getElementById('jsSave');

const INITIAL_COLOR = '#2c2c2c';
const CANVAS_SIZE = 700;

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;

ctx.fillStyle = 'white';
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;

let painting = false;
let filling = false;

function stopPainting() {
  painting = false;
}

function startPainting() {
  painting = true;
}

function onMouseMove(event) {
  const x = event.offsetX;
  const y = event.offsetY;
  if(!painting) {
    ctx.beginPath();
    ctx.moveTo(x, y);
  } else {
    ctx.lineTo(x, y);
    ctx.stroke();
  }
}

function handleColorClick(event) {
  const color = event.target.style.backgroundColor;
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
}

function handleRangeChange(event) {
  const lineSize = event.target.value;
  ctx.lineWidth = lineSize;
}

function handleModeClick() {
  if(filling) {
    filling = false;
    mode.innerText = 'Fill';
  } else {
    filling = true;
    mode.innerText = 'Paint';
  }
}

function handeCanvasClick() {
  if(filling) {
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
  }
}

function handleCM(event) {
  event.preventDefault();
}

function handleSaveClick(event) {
  const img = canvas.toDataURL('image/jpeg');
  const link = document.createElement('a');
  link.href = img;
  const imgName = prompt('저장할 이름을 입력하세요.');
  link.download = `${imgName}.png`;
  link.click();
}

if(canvas) {
  canvas.addEventListener('mousemove', onMouseMove);
  canvas.addEventListener('mousedown', startPainting);
  canvas.addEventListener('mouseup', stopPainting);
  canvas.addEventListener('mouseleave', stopPainting);
  canvas.addEventListener('click', handeCanvasClick);
  canvas.addEventListener('contextmenu', handleCM);
}

if(colors) {
  colors.forEach(color => color.addEventListener('click', handleColorClick));
}

if(range) {
  range.addEventListener('input', handleRangeChange);
}

if(mode) {
  mode.addEventListener('click', handleModeClick);
}

if(saveBtn) {
  saveBtn.addEventListener('click', handleSaveClick);
}