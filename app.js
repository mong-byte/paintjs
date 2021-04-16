const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const range = document.getElementById("jsRange");
const colors = document.getElementsByClassName("jsColor");
const mode = document.getElementById("jsMode");
const saveBtn = document.getElementById("jsSave");

let painting = false;
let filling = false;
const INITIAL_COLOR = "#2c2c2c";
const CANVAS_SIZE  = 700;

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;
ctx.fillStyle = "white";
ctx.fillRect(0,0,CANVAS_SIZE,CANVAS_SIZE);
ctx.strokeStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;

function startPainting(){
  if(filling === false){
    painting = true;
  }
}

function stopPainting(){
  if(painting === true){
    painting = false;
  }
}

function onMouseMove(event){
  const x = event.offsetX;
  const y = event.offsetY;
  if(!painting){
    ctx.beginPath();
    ctx.moveTo(x,y);
  } else {
    ctx.lineTo(x,y);
    ctx.stroke();
  }
}

function handleRangeChange(event){
  const size = event.target.value;
  ctx.lineWidth = size;
}

function handleColorChange(event){
  const color = event.target.style.backgroundColor;
  ctx.strokeStyle = color;
  ctx.fillStyle = color
}

function handleModeClick(){
  if(filling === true){
    filling = false;
    mode.innerText = "Fill";
  } else {
    filling = true;
    mode.innerText = "Paint";
  }
}

function handleCanvasClick(){
  if(filling === true){
    ctx.fillRect(0,0,CANVAS_SIZE,CANVAS_SIZE);
  }
}

function handleSaveClick(){
  const image = canvas.toDataURL();
  const link = document.createElement("a");
  link.href = image;
  link.download = "paintJS";
  link.click();
}

function handleCM(event){
  event.preventDefault();
}

function runCanvas(){
  if(canvas){
    canvas.addEventListener("mousemove",onMouseMove);
    canvas.addEventListener("mousedown",startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave",stopPainting);
    canvas.addEventListener("click",handleCanvasClick);
    canvas.addEventListener("contextmenu",handleCM);
  }
  if(range){
    range.addEventListener("input",handleRangeChange);
  }
  if(colors){
    Array.from(colors).forEach(color => color.addEventListener("click",handleColorChange));
  }
  if(mode){
    mode.addEventListener("click", handleModeClick);
  }
  if(saveBtn){
    saveBtn.addEventListener("click",handleSaveClick);
  }
}

function init(){
  runCanvas();
}

init();