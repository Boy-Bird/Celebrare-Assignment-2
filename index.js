const canvas = document.getElementById("canvas");
const textEditor = document.getElementById("textEditor");
const boldButton = document.getElementById("boldButton");
const colorPicker = document.getElementById("colorPicker");
const fontFamily = document.getElementById("fontFamily");
const fontSize = document.getElementById("fontSize");
const lineHeight = document.getElementById("lineHeight");
const textAlignment = document.getElementById("textAlignment");
const textEditorHead = document.getElementById("textEditorHeading");
const controls = document.getElementById('controls');

let isDragging = false;
let isResizing = false;
let offsetX = 0;
let offsetY = 0;
let draggedElement = null;
let selectedTextBox = null;

// Dragging logic
function onMouseDown(event) {
  if (event.target.classList.contains("draggable")) {
    isDragging = true;
    draggedElement = event.target;
    const rect = draggedElement.getBoundingClientRect();
    offsetX = event.clientX - rect.left;
    offsetY = event.clientY - rect.top;
  }
}

function onMouseMove(event) {
  if (isDragging && draggedElement) {
    const canvasRect = canvas.getBoundingClientRect();
    const x = event.clientX - offsetX - canvasRect.left;
    const y = event.clientY - offsetY - canvasRect.top;
    // draggedElement.style.border = '2px dashed black';

    // Constrain within canvas boundaries
    draggedElement.style.left = `${Math.max(
      0,
      Math.min(x, canvasRect.width - draggedElement.offsetWidth)
    )}px`;
    draggedElement.style.top = `${Math.max(
      0,
      Math.min(y, canvasRect.height - draggedElement.offsetHeight)
    )}px`;
  }

  if (isResizing && draggedElement) {
    const rect = draggedElement.getBoundingClientRect();
    const newWidth = Math.max(50, event.clientX - rect.left); // Minimum width: 50px
    const newHeight = Math.max(30, event.clientY - rect.top); // Minimum height: 30px

    draggedElement.style.width = `${newWidth}px`;
    draggedElement.style.height = `${newHeight}px`;
  }
}

function onMouseUp() {
  isDragging = false;
  isResizing = false;
  draggedElement = null;
}

// Resize logic
function onResizeMouseDown(event) {
  isResizing = true;
  draggedElement = event.target.parentElement; // Resize the parent element (text box)
  event.stopPropagation(); // Prevent triggering drag logic
}

function changeBackgroundImage(event) {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onload = (e) => {
      canvas.style.backgroundImage = `url(${e.target.result})`;
    };
    reader.readAsDataURL(file);
  }
}

function addTextBox() {
  const newTextBox = document.createElement("div");
  newTextBox.className = "draggable";
  newTextBox.style.left = "50px";
  newTextBox.style.top = "50px";

  const contentEditableDiv = document.createElement("div");
  contentEditableDiv.contentEditable = "true";
  contentEditableDiv.innerText = "New Text Box";

  const resizeHandle = document.createElement("div");
  resizeHandle.className = "resize-handle hidden";
  resizeHandle.onmousedown = onResizeMouseDown;

  newTextBox.appendChild(contentEditableDiv);
  newTextBox.appendChild(resizeHandle);

  newTextBox.onmousedown = onMouseDown;
  newTextBox.onclick = selectTextBox;

  canvas.appendChild(newTextBox);
}

function selectTextBox(event) {
  document.querySelectorAll(".draggable").forEach((box) => {
    box.classList.remove("selected");
    // box.style.border = 'none';
    box.querySelector(".resize-handle").classList.add("hidden");
  });

  // Select the current text box
  const box = event.currentTarget;
  box.classList.add("selected");
  //   box.getElementById
  //   box.style.border = '1px solid green';
  box.querySelector(".resize-handle").classList.remove("hidden");

  selectedTextBox = box.querySelector("div[contenteditable='true']");
  // textEditor.style.display = "inline";
  controls.style.display="block";
  
  document.getElementById("stylee").style.display = "block";
  textEditor.value = selectedTextBox.innerText;
}

function updateSelectedText() {
  if (selectedTextBox) {
    selectedTextBox.innerText = textEditor.value;
  }
}

function toggleBold() {
  if (selectedTextBox) {
    const isBold = selectedTextBox.style.fontWeight === "bold";
    selectedTextBox.style.fontWeight = isBold ? "normal" : "bold";
  }
}

function changeTextColor() {
    console.log(colorPicker.value);
  if (selectedTextBox) {
    selectTextBox.style.color = "red";
  }
}

function changeFontFamily() {
  if (selectedTextBox) {
    selectedTextBox.style.fontFamily = fontFamily.value;
  }
}

function changeFontSize() {
  if (selectedTextBox) {
    selectedTextBox.style.fontSize = `${fontSize.value}px`;
  }
}

function changeLineHeight() {
  if (selectedTextBox) {
    selectedTextBox.style.lineHeight = `${lineHeight.value}`;
  }
}

function changeAlignment() {
  if (selectedTextBox) {
    selectedTextBox.style.textAlign = textAlignment.value;
  }
}

var swiper = new Swiper(".mySwiper", {
  cssMode: true,
//   loop: true, // Loop through slides
  //   pagination: {
  //     el: '.swiper-pagination',
  //     clickable: true,
  //   },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  touchStartPreventDefault: false,

  mousewheel: true,
//   keyboard: true,
  //   scrollbar: {
  //     el: ".swiper-scrollbar",
  //   },
});
