let canvas=document.querySelector("canvas");
// canvas.width=window.innerWidth
// canvas.height=window.innerHeight;
let mouseClicked=false;

canvas.width="1536.5";
canvas.height="725.5";

let tool=canvas.getContext("2d");


//default
let penColor="black";

let undoRedoArray=[];
let currTrack=-1;

function draw(){
    canvas.addEventListener("mousedown",(e)=>{
        mouseClicked=true;
        beginPath({
            x: e.clientX,
            y: e.clientY
        })
    })
    
    canvas.addEventListener("mousemove",(e)=>{
        if(mouseClicked){
            drawStroke({
                x: e.clientX,
                y: e.clientY
            })
        }  
    })
    
    canvas.addEventListener("mouseup",(e)=>{
        mouseClicked=false;

        undoRedoArray.push(tool.getImageData(0,0,canvas.width,canvas.height));
        currTrack+=1;
    })

    
}
draw();

function beginPath(obj){
    tool.beginPath();
    tool.moveTo(obj.x,obj.y);
}

function drawStroke(obj){
    tool.lineTo(obj.x,obj.y);
    tool.stroke();
}

function changePenColor(){
    let colorCont=document.querySelectorAll(".penColor");
    colorCont.forEach(e =>{
        e.addEventListener("click",()=>{
            let colorTemp=e.classList[0];
            tool.strokeStyle=colorTemp;
            penColor=colorTemp;
        })
    })
}
changePenColor();

function changePenWidth(){
    let penWidthCont=document.querySelector(".penWidthCont");
    let penIcon=document.querySelector(".fa-pen");
    penIcon.addEventListener("click",()=>{
        let penWidthTemp=penWidthCont.value;
        tool.lineWidth=penWidthTemp;
        tool.strokeStyle=penColor;
    })   
    penWidthCont.addEventListener("change",()=>{
        let penWidthTemp=penWidthCont.value;
        tool.lineWidth=penWidthTemp;
    })
}
changePenWidth();

function changeEraserWidth(){
    let eraserWidthCont=document.querySelector(".eraserWidthCont");
    let eraserIcon=document.querySelector(".fa-eraser");
    eraserIcon.addEventListener("click",()=>{
        let eraserWidthTemp=eraserWidthCont.value;
        tool.lineWidth=eraserWidthTemp;
        tool.strokeStyle="white";
    })  
    eraserWidthCont.addEventListener("change",()=>{
        let eraserWidthTemp=eraserWidthCont.value;
        tool.lineWidth=eraserWidthTemp;
        tool.strokeStyle="white";
    }) 
}
changeEraserWidth();

function downloadCanvas(){
    let downloadCont=document.querySelector(".fa-download");
    downloadCont.addEventListener("click",()=>{
        let currURL=canvas.toDataURL();
        let a=document.createElement("a");
        a.href=currURL;
        a.download="canvas.jpg";
        a.click();
    })
}
downloadCanvas();

//undo redo 
let undoIcon=document.querySelector(".fa-arrow-rotate-left");
let redoIcon=document.querySelector(".fa-arrow-rotate-right");
undoIcon.addEventListener("click",()=>{
    console.log(currTrack);
    if(currTrack<=0){
        clearCanvas();
        if(currTrack==0) currTrack--;
    } 
    else {
        currTrack--;
        tool.putImageData(undoRedoArray[currTrack],0,0);
    }
    console.log(currTrack);
})
redoIcon.addEventListener("click",()=>{
    console.log(currTrack);
    if(currTrack<undoRedoArray.length-1){
        currTrack++;
        tool.putImageData(undoRedoArray[currTrack],0,0);
    }
})

let clearIcon=document.querySelector(".fa-trash");
clearIcon.addEventListener("click",()=>{
    clearCanvas();
})

function clearCanvas(){
    tool.fillStyle="white";
    tool.clearRect(0,0,canvas.width,canvas.height);
    tool.fillRect(0,0,canvas.width,canvas.height);
}
