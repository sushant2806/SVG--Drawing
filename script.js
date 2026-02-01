const svg = document.getElementById("svgPad");
const drawBtn = document.getElementById("drawBtn");
const eraserBtn = document.getElementById("eraserBtn");
const clearBtn = document.getElementById("clearBtn");
const sizeSlider = document.getElementById("sizeSlider");

let drawing = false;
let currentLine = null;
let tool = "draw";
let brushSize = 3;
let eraserSize = 20;

function getSVGPoint(evt) {
  const pt = svg.createSVGPoint();
  pt.x = evt.clientX;
  pt.y = evt.clientY;
  return pt.matrixTransform(svg.getScreenCTM().inverse());
}

drawBtn.onclick = () => { tool = "draw"; sizeSlider.value = brushSize; };
eraserBtn.onclick = () => { tool = "erase"; sizeSlider.value = eraserSize; };

sizeSlider.oninput = () => {
  if (tool === "draw") brushSize = sizeSlider.value;
  else eraserSize = sizeSlider.value;
};

clearBtn.onclick = () => svg.innerHTML = "";

svg.addEventListener("mousedown", e => {
  drawing = true;
  const p = getSVGPoint(e);

  currentLine = document.createElementNS("http://www.w3.org/2000/svg", "polyline");
  currentLine.setAttribute("fill", "none");
  currentLine.setAttribute("stroke-linecap", "round");
  currentLine.setAttribute("stroke-linejoin", "round");

  if (tool === "erase") {
    currentLine.setAttribute("stroke", "white");
    currentLine.setAttribute("stroke-width", eraserSize);
  } else {
    currentLine.setAttribute("stroke", "black");
    currentLine.setAttribute("stroke-width", brushSize);
  }

  currentLine.setAttribute("points", `${p.x},${p.y}`);
  svg.appendChild(currentLine);
});

svg.addEventListener("mousemove", e => {
  if (!drawing) return;
  const p = getSVGPoint(e);
  const points = currentLine.getAttribute("points");
  currentLine.setAttribute("points", points + ` ${p.x},${p.y}`);
});

svg.addEventListener("mouseup", () => drawing = false);
svg.addEventListener("mouseleave", () => drawing = false);