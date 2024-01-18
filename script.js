let displayToolsOption=document.querySelector(".displayToolsOptionCont");
let displayToolsOptionOn=true;
let displayTools=document.querySelector(".toolsCont");
let penIcon=document.querySelector(".fa-pen");
let displayPen=document.querySelector(".penCont");
let displayPenOptionOn=false;
let markerIcon=document.querySelector(".fa-marker");
let displayMarker=document.querySelector(".markerCont");
let displayMarkerOptionOn=false;
let eraserIcon=document.querySelector(".fa-eraser");
let displayEraser=document.querySelector(".eraserCont");
let displayEraserOptionOn=false;
let notesIcon=document.querySelector(".fa-bookmark");
// let uploadIcon=document.querySelector(".fa-upload");

displayToolsOption.addEventListener("click",()=>{
    let iconEle=displayToolsOption.children[0];
    if(!displayToolsOptionOn){
        iconEle.classList.remove("fa-bars");
        iconEle.classList.add("fa-ban");
        displayTools.style.display="flex";
    }
    else{
        iconEle.classList.remove("fa-ban");
        iconEle.classList.add("fa-bars");
        displayTools.style.display="none";
        displayPen.style.display="none";
        displayMarker.style.display="none";
        displayEraser.style.display="none";
        // displayNotes.style.display="none";
        displayPenOptionOn=false;
        displayMarkerOptionOn=false; 
        displayEraserOptionOn=false;  
    }
    displayToolsOptionOn=!displayToolsOptionOn;
})

penIcon.addEventListener("click",()=>{
    if(!displayPenOptionOn)  displayPen.style.display="block";
    else  displayPen.style.display="none";
    displayPenOptionOn=!displayPenOptionOn;
    displayMarker.style.display="none";
    displayEraser.style.display="none";
    displayMarkerOptionOn=false;
    displayEraserOptionOn=false;
    // displayNotes.style.display="none";
})

// markerIcon.addEventListener("click",()=>{
//     if(!displayMarkerOptionOn)  displayMarker.style.display="block";
//     else  displayMarker.style.display="none";
//     displayMarkerOptionOn=!displayMarkerOptionOn;
//     displayPen.style.display="none";
//     displayEraser.style.display="none";
//     // displayNotes.style.display="none";
//     displayPenOptionOn=false
//     displayEraserOptionOn=false;
//     // displayNotesOptionOn=false;
// })

eraserIcon.addEventListener("click",()=>{
    if(!displayEraserOptionOn)  displayEraser.style.display="block";
    else  displayEraser.style.display="none";
    displayEraserOptionOn=!displayEraserOptionOn;
    displayPen.style.display="none";
    displayMarker.style.display="none";
    // displayNotes.style.display="none";
    displayPenOptionOn=false;
    displayMarkerOptionOn=false; 
    // displayNotesOptionOn=false;
})

notesIcon.addEventListener("click",()=>{
  let notes_cont=document.createElement("div");
  notes_cont.setAttribute("class","notesCont");
  notes_cont.innerHTML=`
  <div class="navCont">
      <div class="minimizeBtn">
          <i class="fa-solid fa-window-minimize cursorPointer"></i>
      </div>
      <div class="crossBtn">
          <i class="fa-solid fa-xmark cursorPointer"></i>
      </div>
  </div>
  <div class="textCont">
      <textarea spellcheck="false"></textarea>
  </div>
  `;
  document.body.appendChild(notes_cont);

  notes_cont.onmousedown = function(event) {
    dragDrop(notes_cont,event)
  }; 

  notes_cont.ondragstart = function() {
    return false;
  };

  let minimize=document.querySelector(".minimizeBtn");
  let cross=document.querySelector(".crossBtn");
  notesFuncs(minimize,cross,notes_cont);
})

//drag and drop for notes
function dragDrop(element,event){
  let shiftX = event.clientX - element.getBoundingClientRect().left;
  let shiftY = event.clientY - element.getBoundingClientRect().top;
  element.style.position = 'absolute';
  element.style.zIndex = 1000;
  moveAt(event.pageX, event.pageY);
  function moveAt(pageX, pageY) {
    element.style.left = pageX - shiftX + 'px';
    element.style.top = pageY - shiftY + 'px';
  }
  function onMouseMove(event) {
    moveAt(event.pageX, event.pageY);
  }
  document.addEventListener('mousemove', onMouseMove);
  element.onmouseup = function() {
    document.removeEventListener('mousemove', onMouseMove);
    element.onmouseup = null;
  };
}

function notesFuncs(minimize,cross,notes_cont){
  minimize.addEventListener("click",()=>{
    let notesText=notes_cont.querySelector(".textCont");
    let displayNotes=getComputedStyle(notesText).getPropertyValue("display");
    console.log(displayNotes);
    if (displayNotes === "none") notesText.style.display="block";
    else notesText.style.display="none";
  })
  cross.addEventListener("click",()=>{
    notes_cont.remove();
  })
}

// uploadIcon.addEventListener("click",()=>{
//   let input=document.createElement("input");
//   input.setAttribute ("type","file");
//   input.click();

//   input.addEventListener("change",()=>{
//     let imag=input.files[0];
//     let url=URL.createObjectURL(imag);
//   })
// })