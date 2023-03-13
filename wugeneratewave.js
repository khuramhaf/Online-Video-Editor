var waveformsource;
var canvasid = 1;
var sourceinterval;
var sourcetime = 0;

var copyarray = null;


function generatewave(){
sourcetime = 0;
if (source){
source.stop();
source.disconnect();
}

clearInterval(intervalid);

if(waveformsource){
waveformsource.stop();
}




var start = parseFloat(document.getElementById("start").value);
var end = parseFloat(document.getElementById("end").value);


if (check === null ){

document.getElementById("error").innerHTML = "Please select a file"

}

else if (array===null){

document.getElementById("error").innerHTML = "No data available"

}

else if (isNaN(start)){
document.getElementById("error").innerHTML = "Starting point is not a number"


}
else if (start >= source.buffer.duration){
document.getElementById("error").innerHTML = "starting point is greater than or equal to source buffer duration"

} 

else if (start < 0 )
{

document.getElementById("error").innerHTML = "Starting Point must be greater than 0"

}
else if (start >= end) {
document.getElementById("error").innerHTML = "Starting Point must be less than Ending Point"

}

else if (isNaN(end)){
document.getElementById("error").innerHTML = "Ending Point is not a number"
} 
else if ( end > source.buffer.duration ){

document.getElementById("error").innerHTML = "Ending point is greater than  duration"

end < 0 }

else if ( end <= start){

document.getElementById("error").innerHTML = "Ending Point is greater than equal to Starting Point"

}


else{
if (end*source.buffer.sampleRate >= 1){
var waveformcut = array.slice(parseInt(start*audiocontext.sampleRate), parseInt(end*audiocontext.sampleRate));
var obj = {id: canvasid,
data:waveformcut,
valueindexstart: 0,
valueindexend:0,
isselected:false,
button:canvasid+1000000,
}

const canvas = document.createElement('canvas');
const button = document.createElement('button');
canvas.myNewData = obj;
canvas.width = 800;
canvas.height = 180;
canvas.style.zIndex = "2";
canvas.style.border = "3px solid black";
canvas.style.backgroundColor = "white";
canvas.style.position = "absolute";
button.style.position = "absolute";
button.innerHTML = "---"
button.style.background = "black";
button.style.color="white";
button.style.border="none"
button.style.padding="8px";

canvas.id = `"${canvasid}"`;
var buttonid = canvasid+1000000;
button.id = `"${buttonid}"`;
button.buttoncanvas = canvas.id;
canvasid++;

var margintop;
var gettingall = document.getElementsByTagName("canvas");
if (gettingall.length >0){
margintop = parseInt(gettingall[gettingall.length-1].offsetTop)+40
}
else{
margintop = 60;
}
canvas.style.top = `${margintop}px`;
canvas.style.right = "0px";
button.style.top = `${margintop}px`;
button.style.right = "800px";

document.body.appendChild(canvas);
document.body.appendChild(button);

button.addEventListener("click", (event)=>{

var zindex = document.getElementsByTagName("canvas");
var counter = 0;
while(counter<zindex.length){
zindex[counter].style.zIndex = "0";
counter++;
}

document.getElementById(button.buttoncanvas).style.zIndex="1"
})


const ctx = canvas.getContext('2d');

ctx.beginPath();
ctx.moveTo(0, canvas.height / 2);
ctx.lineWidth = 1;
const topOffset = 80;
const bottomOffset = 10;
for (let i = 0; i < waveformcut.length; i=i+500) {
const x = i / waveformcut.length * canvas.width;
const y = ((waveformcut[i] + 1) / 2 * (canvas.height - topOffset - bottomOffset)) + topOffset;
ctx.lineTo(x, y);
}
ctx.stroke();


const buttonWidth1 = 800;
const buttonHeight1 = 40;
const buttonX1 = 0
const buttonY1 = 0
ctx.fillStyle = 'red';
ctx.fillRect(buttonX1, buttonY1, buttonWidth1, buttonHeight1);

const buttonWidth2 = 60;
const buttonHeight2 = 20;
const buttonX2 = 15
const buttonY2 = 10
ctx.fillStyle = 'blue';
ctx.fillRect(buttonX2, buttonY2, buttonWidth2, buttonHeight2);

const buttonWidth3 = 60;
const buttonHeight3 = 20;
const buttonX3 = 90
const buttonY3 = 10
ctx.fillStyle = 'blue';
ctx.fillRect(buttonX3, buttonY3, buttonWidth3, buttonHeight3);

const buttonWidth4 = 60;
const buttonHeight4 = 20;
var margin = 10;
const buttonX4 = 165
const buttonY4 = 10
ctx.fillStyle = 'blue';
ctx.fillRect(buttonX4, buttonY4, buttonWidth4, buttonHeight4);


const buttonWidth5 = 60;
const buttonHeight5= 20;
var margin = 10;
const buttonX5 = 240
const buttonY5 = 10
ctx.fillStyle = 'blue';
ctx.fillRect(buttonX5, buttonY5, buttonWidth5, buttonHeight5);


const buttonWidth10 = 60;
const buttonHeight10 = 20;
const buttonX10 = 390
const buttonY10 = 10
ctx.fillStyle = 'blue';
ctx.fillRect(buttonX10, buttonY10, buttonWidth10, buttonHeight10);


const buttonWidth11 = 60;
const buttonHeight11 = 20;
const buttonX11 = 465
const buttonY11 = 10
ctx.fillStyle = 'blue';
ctx.fillRect(buttonX11, buttonY11, buttonWidth11, buttonHeight11);




const buttonWidth7 = 60;
const buttonHeight7 = 20;
const buttonX7 = 620
const buttonY7 = 10
ctx.fillStyle = 'blue';
ctx.fillRect(buttonX7, buttonY7, buttonWidth7, buttonHeight7);


const buttonexportw = 60;
const buttonexporth = 20;
const buttonexportx = 695
const buttonexporty = 10
ctx.fillStyle = 'blue';
ctx.fillRect(buttonexportx, buttonexporty, buttonexportw, buttonexporth);



const buttonWidth9 = canvas.width;
const buttonHeight9 = 30;
const buttonX9 = 0
const buttonY9 = 40
ctx.fillStyle = "green";
ctx.fillRect(buttonX9, buttonY9, buttonWidth9, buttonHeight9);




const buttonWidth = 20;
const buttonHeight = 20;
var margin = 10;
const buttonX = canvas.width - buttonWidth - margin;
const buttonY = margin;
ctx.fillStyle = 'white';
ctx.fillRect(buttonX, buttonY, buttonWidth, buttonHeight);




ctx.font = "16px Arial";
ctx.fillText("Play",30,25);
ctx.fillText("Stop",105,25);
ctx.fillText("Trim",180,25);
ctx.fillText("Cut",255,25);
ctx.fillText("Copy",400,25);
ctx.fillText("Paste",475,25);
ctx.fillText("Add",635,25);
ctx.fillText("Export",700,25);
ctx.fillText(`audio time: ${sourcetime}`,10,60);

const centerX = buttonX + buttonWidth / 2;
const centerY = buttonY + buttonHeight / 2;
ctx.strokeStyle = 'red';
ctx.lineWidth = 2;
ctx.beginPath();
ctx.moveTo(centerX - buttonWidth / 4, centerY - buttonHeight / 4);
ctx.lineTo(centerX + buttonWidth / 4, centerY + buttonHeight / 4);
ctx.moveTo(centerX + buttonWidth / 4, centerY - buttonHeight / 4);
ctx.lineTo(centerX - buttonWidth / 4, centerY + buttonHeight / 4);
ctx.stroke();

var valueIndexstart;
var valueIndexend;



var isresize = false;
var rectx = 0;
var recty =0
var rectwidth = 0;
var rectheight = 0;

var rectstatus = null;

var previousx = 0;
var isdrawing = false;

var endx;





canvas.addEventListener('click', event => {


    if (canvas.myNewData.valueindexstart === canvas.myNewData.valueindexend){

        rectx = "null";
        rectwidth = "null";
       }



var zindex = document.getElementsByTagName("canvas");
var counter = 0;
while(counter<zindex.length){
zindex[counter].style.zIndex = "0";
counter++;
}
canvas.style.zIndex = "1";
if (waveformsource){
waveformsource.stop();
}

if (source){
source.stop();
}

clearInterval(intervalid);
clearInterval(sourceinterval);
const x = event.pageX - canvas.offsetLeft;
const y = event.pageY - canvas.offsetTop;


if (x > buttonX && x < buttonX + buttonWidth && y > buttonY && y < buttonY + buttonHeight) {
document.getElementById('"'+canvas.myNewData.button+'"').remove();
canvas.remove();



}




else if (x > buttonX2 && x < buttonX2 + buttonWidth2 && y > buttonY2 && y < buttonY2 + buttonHeight2){

sourcetime = parseInt(canvas.myNewData.valueindexstart/audiocontext.sampleRate);
const rect = canvas.getBoundingClientRect();
const x = event.clientX - rect.left;
const y = event.clientY - rect.top;



var endtime = canvas.myNewData.valueindexend/audiocontext.sampleRate - canvas.myNewData.valueindexstart/audiocontext.sampleRate;

if (endtime>=0 ){
waveformsource = audiocontext.createBufferSource();
var array1 = new Float32Array(canvas.myNewData.data);
var audiobuffer =   audiocontext.createBuffer(1, array1.length, audiocontext.sampleRate);
var ab1=  audiobuffer.getChannelData(0);
ab1.set(array1);
waveformsource.buffer=audiobuffer;
waveformsource.connect(audiocontext.destination);

var valueindexstart = canvas.myNewData.valueindexstart/audiocontext.sampleRate;
var valueindexend = canvas.myNewData.valueindexend/audiocontext.sampleRate;
var fixed = valueindexstart.toFixed(3);
var fixed1 = valueindexend.toFixed(3);

waveformsource.start(0, canvas.myNewData.valueindexstart/audiocontext.sampleRate, endtime);


if (parseInt(canvas.myNewData.valueindexstart/audiocontext.sampleRate) != parseInt(canvas.myNewData.valueindexend/audiocontext.sampleRate)){
    sourceinterval =   setInterval(()=>{
        


        ctx.clearRect(0, 40, 200, 30);
        ctx.globalAlpha = 1;
        ctx.fillStyle = "green";
ctx.fillRect(0, 40, 200, 30);
        ctx.fillStyle = "white"
        sourcetime++;
        ctx.fillText(`audio time: ${sourcetime}`,10,60);
       
    
        if (sourcetime === parseInt(canvas.myNewData.valueindexend/audiocontext.sampleRate)){
            clearInterval(sourceinterval);
        }
    
    }, 1000);
        
        }
}

else{
console.log("cannot play audio");
}



}


else if (x > buttonX3 && x < buttonX3 + buttonWidth3 && y > buttonY3 && y < buttonY3 + buttonHeight3){
if (waveformsource){
waveformsource.stop();

}

clearInterval(sourceinterval);



}

else if (x > buttonX5&& x < buttonX5 + buttonWidth5 && y > buttonY5 && y < buttonY5 + buttonHeight5){




if (canvas.myNewData.isselected === true){
canvas.myNewData.isselected = false;
var endtime = canvas.myNewData.valueindexend/audiocontext.sampleRate - canvas.myNewData.valueindexstart/audiocontext.sampleRate;
if (endtime>=0 && canvas.myNewData.data.length >0){

var array = canvas.myNewData.data.slice(canvas.myNewData.valueindexstart, canvas.myNewData.valueindexend)

canvas.myNewData.data = array;

rectx = "null";
rectwidth = "null";

canvas.myNewData.valueindexstart = 0;
canvas.myNewData.valueindexend = 0;

ctx.clearRect(0, 70, canvas.width, canvas.height);
ctx.globalAlpha = 1;
ctx.strokeStyle = 'black';
ctx.lineWidth = 1;


ctx.beginPath();
ctx.moveTo(0, canvas.height / 2);

const topOffset = 80;
const bottomOffset = 10;
for (let i = 0; i < canvas.myNewData.data.length; i=i+500) {
const x = i / canvas.myNewData.data.length * canvas.width;
const y = ((canvas.myNewData.data[i] + 1) / 2 * (canvas.height - topOffset - bottomOffset)) + topOffset;
ctx.lineTo(x, y);
}

// Stroke the path immediately after drawing it
ctx.stroke();


sourcetime = 0;

ctx.fillStyle="green";
ctx.fillRect(0,40, canvas.width, 30);

ctx.fillStyle = "white";

ctx.fillText(`audio time: ${sourcetime}`,10,60);




}

else{
console.log("cannot cut audio");
}

}
}
else if (x > buttonX4 && x < buttonX4 + buttonWidth4 && y > buttonY4 && y < buttonY4 + buttonHeight4){



if(canvas.myNewData.isselected===true){
canvas.myNewData.isselected=false;
var endtime = canvas.myNewData.valueindexend/audiocontext.sampleRate - canvas.myNewData.valueindexstart/audiocontext.sampleRate;
if (endtime>=0 && canvas.myNewData.data.length>0){

endindex = canvas.myNewData.valueindexend - canvas.myNewData.valueindexstart

canvas.myNewData.data.splice(canvas.myNewData.valueindexstart, endindex)

rectx = "null";
rectwidth = "null";

canvas.myNewData.valueindexstart = 0;
canvas.myNewData.valueindexend = 0;

ctx.clearRect(0, 40, canvas.width, canvas.height);
ctx.globalAlpha = 1;
ctx.strokeStyle = 'black';
ctx.lineWidth = 1;


ctx.beginPath();
ctx.moveTo(0, canvas.height / 2);

const topOffset = 80;
const bottomOffset = 10;
for (let i = 0; i < canvas.myNewData.data.length; i=i+500) {
const x = i / canvas.myNewData.data.length * canvas.width;
const y = ((canvas.myNewData.data[i] + 1) / 2 * (canvas.height - topOffset - bottomOffset)) + topOffset;
ctx.lineTo(x, y);
}

// Stroke the path immediately after drawing it
ctx.stroke();

sourcetime = 0;

ctx.fillStyle="green";
ctx.fillRect(0,40, canvas.width, 30);

ctx.fillStyle = "white";

ctx.fillText(`audio time: ${sourcetime}`,10,60);





}

else{
console.log("cannot Trim audio");
}

}
}

else if (x > buttonexportx && x < buttonexportx + buttonexportw && y > buttonexporty && y < buttonexporty + buttonexporth){

ctx.fillStyle="black";
ctx.globalAlpha = 1;
ctx.fillText("exporting is in progress", 300, 170)
var counter = 0;



const exportobject ={

data: canvas.myNewData.data,
samplerate: audiocontext.sampleRate

}

if (canvas.myNewData.data.length>0){


var  w = new Worker("worker.js");
w.postMessage(exportobject);

w.onmessage = function(event) {
const result = event.data;
const blob = new Blob(result, { type: "audio/mp3" });
const audioURL = window.URL.createObjectURL(blob);
var a = document.createElement("a");
a.href = audioURL;
a.download = "downloaded.mp3";
document.body.appendChild(a);
a.click();
document.body.removeChild(a);
};






}




else {











}

}

else if (x > buttonX7 && x < buttonX7 + buttonWidth7 && y > buttonY7 && y < buttonY7 + buttonHeight7){

const input = document.createElement("input");
input.type = "file";
input.click();


input.onchange = function(){
var Files= input.files

file = Files[0];
if (file){
fr.readAsArrayBuffer(Files[0]);
}
}

const fr = new FileReader();

fr.onload = function(){

audiocontext.decodeAudioData(fr.result, function(audiofile){
var x = audiofile.getChannelData(0);
var y = Array.from(x);
try{
if (canvas.myNewData.data===null){
    canvas.myNewData.data = y;
    
}
else if (canvas.myNewData.valueindexstart === 0){
    canvas.myNewData.data = canvas.myNewData.data.concat(y);
}

else {

    var canvasarray = canvas.myNewData.data;
    let newArr = canvasarray.slice(0, canvas.myNewData.valueindexstart).concat(y, canvasarray.slice(canvas.myNewData.valueindexstart));

    canvas.myNewData.data = newArr;
}

}
catch(error){
alert('Limit Exceed');
console.error("error");
sourceduration=0;
}

input.remove();


ctx.clearRect(0, 70, canvas.width, canvas.height);
ctx.globalAlpha = 1;
ctx.strokeStyle = 'black';
ctx.lineWidth = 1;


ctx.beginPath();
ctx.moveTo(0, canvas.height / 2);

const topOffset = 80;
const bottomOffset = 10;
for (let i = 0; i < canvas.myNewData.data.length; i=i+500) {
const x = i / canvas.myNewData.data.length * canvas.width;
const y = ((canvas.myNewData.data[i] + 1) / 2 * (canvas.height - topOffset - bottomOffset)) + topOffset;
ctx.lineTo(x, y);
}

// Stroke the path immediately after drawing it
ctx.stroke();


})

}


}





else if (x > buttonX10 && x < buttonX10 + buttonWidth10 && y > buttonY10 && y < buttonY10 + buttonHeight10){

if (canvas.myNewData.isselected === true ){


    var endtime = canvas.myNewData.valueindexend/audiocontext.sampleRate - canvas.myNewData.valueindexstart/audiocontext.sampleRate;
if (endtime>=0 && canvas.myNewData.data.length>0){

    copyarray = canvas.myNewData.data.slice(canvas.myNewData.valueindexstart, canvas.myNewData.valueindexend);


}

}
}


else if (x > buttonX11 && x < buttonX11 + buttonWidth11 && y > buttonY11 && y < buttonY11 + buttonHeight11){
if (copyarray != null){

    rectx = "null";
    rectwidth = "null";

    canvas.myNewData.valueindexstart = 0;
    canvas.myNewData.valueindexend = 0;
    canvas.myNewData.isselected = false;
   
    var canvasarray = canvas.myNewData.data;
    let newArr = canvasarray.slice(0, canvas.myNewData.valueindexstart).concat(copyarray, canvasarray.slice(canvas.myNewData.valueindexstart));

    canvas.myNewData.data = newArr;

    ctx.clearRect(0, 70, canvas.width, canvas.height);
ctx.globalAlpha = 1;
ctx.strokeStyle = 'black';
ctx.lineWidth = 1;

ctx.beginPath();
ctx.moveTo(0, canvas.height / 2);

const topOffset = 80;
const bottomOffset = 10;
for (let i = 0; i < canvas.myNewData.data.length; i=i+500) {
const x = i / canvas.myNewData.data.length * canvas.width;
const y = ((canvas.myNewData.data[i] + 1) / 2 * (canvas.height - topOffset - bottomOffset)) + topOffset;
ctx.lineTo(x, y);
}

// Stroke the path immediately after drawing it
ctx.stroke();
}
}

else{

}
});







canvas.addEventListener("mousedown", function(event){

const x1 = event.pageX - canvas.offsetLeft;
const y1 = event.pageY - canvas.offsetTop;


if (x1 > buttonX1 && x1 < buttonX1 + buttonWidth1 && y1 > buttonY1 && y1 < buttonY1 + buttonHeight1){

}
else{

    var rect = canvas.getBoundingClientRect();
    var mouseX = event.clientX - rect.left;
    var mouseY = event.clientY - rect.top;

    previousx = rectx;

    if (mouseX >= rectx - 10 && mouseX <= rectx + 10 && mouseY>=70) {
        // Adjust the mouse coordinates to be relative to the rectangle
        isresize = true;
rectstatus = "left"
    
    }

   else if (mouseX >=rectx + rectwidth-10 && mouseX <=rectx + rectwidth+10 && mouseY>=70) {
        // Adjust the mouse coordinates to be relative to the rectangle
        isresize = true
rectstatus = "right"
    }

    else {
        
        rectx = mouseX;
        isdrawing = true;
    canvas.myNewData.isselected=false;

        valueIndexstart = Math.floor(mouseX / canvas.width * canvas.myNewData.data.length);
canvas.myNewData.valueindexstart = valueIndexstart;

ctx.globalAlpha = 1;
ctx.fillStyle = "green"
ctx.clearRect(200, 40, canvas.width, 30)

var fixed = (valueIndexstart/audiocontext.sampleRate).toFixed(3);
ctx.fillRect(200, 40, canvas.width, 30);

ctx.fillStyle = "white";

ctx.fillText(`Start time: ${fixed}`, 220, 60);


ctx.clearRect(0, 70, canvas.width, canvas.height);
ctx.globalAlpha = 1;
ctx.strokeStyle = 'black';
ctx.lineWidth = 1;


ctx.beginPath();
ctx.moveTo(0, canvas.height / 2);

const topOffset = 80;
const bottomOffset = 10;
for (let i = 0; i < canvas.myNewData.data.length; i=i+500) {
const x = i / canvas.myNewData.data.length * canvas.width;
const y = ((canvas.myNewData.data[i] + 1) / 2 * (canvas.height - topOffset - bottomOffset)) + topOffset;
ctx.lineTo(x, y);
}

// Stroke the path immediately after drawing it
ctx.stroke();




    }








}

})

canvas.addEventListener("mousemove", (event) => {
   

var rect = canvas.getBoundingClientRect();
var mouseX = event.clientX - rect.left;
var mouseY = event.clientY - rect.top;

if(isresize===true){
    if (rectstatus === "left") {

     
    rectwidth -= (mouseX - previousx);
    rectx = mouseX;

    var valueindexstartmove = (Math.floor(mouseX/canvas.width * canvas.myNewData.data.length))/audiocontext.sampleRate
    var valueindexendmove = canvas.myNewData.valueindexend/audiocontext.sampleRate;
    ctx.clearRect(0, 40, canvas.width, canvas.height);
    ctx.globalAlpha = 1;
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 1;
    
    ctx.beginPath();
    ctx.moveTo(0, canvas.height / 2);
    
    const topOffset = 80;
    const bottomOffset = 10;
    for (let i = 0; i < canvas.myNewData.data.length; i=i+500) {
    const x = i / canvas.myNewData.data.length * canvas.width;
    const y = ((canvas.myNewData.data[i] + 1) / 2 * (canvas.height - topOffset - bottomOffset)) + topOffset;
    ctx.lineTo(x, y);
    }
    
    // Stroke the path immediately after drawing it
    ctx.stroke();
    
    
    
    ctx.fillStyle = 'red';
    
    
    
    ctx.fillStyle = "green";
    ctx.fillRect(buttonX9, buttonY9, buttonWidth9, buttonHeight9);
    
    ctx.font = "16px Arial";
    ctx.fillStyle="white";
    
    var fixed = valueindexstartmove.toFixed(3);
    var fixed1 = valueindexendmove.toFixed(3);
    
    ctx.fillText(`audio time: ${sourcetime}`,10,60);
    
    ctx.fillText(`Start time: ${fixed}`, 220, 60);
    ctx.fillText(`End time: ${fixed1}`, 370, 60);
    
    ctx.fillStyle = "red";
    ctx.globalAlpha = 0.3;
     ctx.fillRect(rectx, 70, rectwidth, canvas.height);
 
        previousx = mouseX;

  
}


else if (rectstatus === "right") {
    // Adjust the mouse coordinates to be relative to the rectangle
    rectwidth = mouseX - rectx;

    var valueindexstartmove = canvas.myNewData.valueindexstart/audiocontext.sampleRate
    var valueindexendmove = (Math.floor(mouseX/canvas.width * canvas.myNewData.data.length))/audiocontext.sampleRate
    ctx.clearRect(0, 40, canvas.width, canvas.height);
    ctx.globalAlpha = 1;
    ctx.strokeStyle = 'black';
    ctx.lineWidth = 1;
    
    ctx.beginPath();
    ctx.moveTo(0, canvas.height / 2);
    
    const topOffset = 80;
    const bottomOffset = 10;
    for (let i = 0; i < canvas.myNewData.data.length; i=i+500) {
    const x = i / canvas.myNewData.data.length * canvas.width;
    const y = ((canvas.myNewData.data[i] + 1) / 2 * (canvas.height - topOffset - bottomOffset)) + topOffset;
    ctx.lineTo(x, y);
    }
    
    // Stroke the path immediately after drawing it
    ctx.stroke();
    
    
    
    ctx.fillStyle = 'red';
    
    
    
    ctx.fillStyle = "green";
    ctx.fillRect(buttonX9, buttonY9, buttonWidth9, buttonHeight9);
    
    ctx.font = "16px Arial";
    ctx.fillStyle="white";
    
    var fixed = valueindexstartmove.toFixed(3);
    var fixed1 = valueindexendmove.toFixed(3);
    
    ctx.fillText(`audio time: ${sourcetime}`,10,60);
    
    ctx.fillText(`Start time: ${fixed}`, 220, 60);
    ctx.fillText(`End time: ${fixed1}`, 370, 60);
    
    ctx.fillStyle = "red";
    ctx.globalAlpha = 0.3;
     ctx.fillRect(rectx, 70, rectwidth, canvas.height);
}

else{

}

}

if(canvas.myNewData.isselected === true){
if (mouseX >= rectx-10 && mouseX <= rectx + 10 && mouseY>=70) {
    // Adjust the mouse coordinates to be relative to the rectangle
    

    canvas.style.cursor = 'ew-resize';
}

else if (mouseX >=rectx + rectwidth-10 && mouseX <=rectx + rectwidth+10 && mouseY>=70) {
    // Adjust the mouse coordinates to be relative to the rectangle
   

    canvas.style.cursor = 'ew-resize';
}

else {
    canvas.style.cursor = 'auto';
}

}

if (isdrawing === true){

    canvas.myNewData.isselected = true

    endx = mouseX;

 rectwidth= endx - rectx;

 var valueindexstartmove = canvas.myNewData.valueindexstart/audiocontext.sampleRate
 var valueindexendmove = (Math.floor(mouseX/canvas.width * canvas.myNewData.data.length))/audiocontext.sampleRate
ctx.clearRect(200, 40, canvas.width, 30);

ctx.globalAlpha = 1;

ctx.fillStyle = "green";
ctx.fillRect(200, 40, canvas.width, 30);

ctx.font = "16px Arial";
ctx.fillStyle="white";

var fixed = valueindexstartmove.toFixed(3);
var fixed1 = valueindexendmove.toFixed(3);

ctx.fillText(`Start time: ${fixed}`, 220, 60);
ctx.fillText(`End time: ${fixed1}`, 370, 60);




ctx.clearRect(0, 70, canvas.width, canvas.height);
ctx.globalAlpha = 1;
ctx.strokeStyle = 'black';
ctx.lineWidth = 1;

ctx.beginPath();
ctx.moveTo(0, canvas.height / 2);

const topOffset = 80;
const bottomOffset = 10;
for (let i = 0; i < canvas.myNewData.data.length; i=i+500) {
const x = i / canvas.myNewData.data.length * canvas.width;
const y = ((canvas.myNewData.data[i] + 1) / 2 * (canvas.height - topOffset - bottomOffset)) + topOffset;
ctx.lineTo(x, y);
}

// Stroke the path immediately after drawing it
ctx.stroke();

ctx.fillStyle = "red";
ctx.globalAlpha = 0.3;
 ctx.fillRect(rectx, 70, rectwidth, canvas.height);

}


})


canvas.addEventListener("mouseup", function(event){

const x1 = event.pageX - canvas.offsetLeft;
const y1 = event.pageY - canvas.offsetTop;

if (x1 > buttonX1 && x1 < buttonX1 + buttonWidth1 && y1 > buttonY1 && y1 < buttonY1 + buttonHeight1){

}

else{



    var rect = canvas.getBoundingClientRect();
    var mouseX = event.clientX - rect.left;
    if (isdrawing === true){

       canvas.myNewData.valueindexend = Math.floor(mouseX/canvas.width*canvas.myNewData.data.length)
        isdrawing = false;
        rectstatus = null;
    }

    else if (rectstatus === "left"){
        canvas.myNewData.valueindexstart = Math.floor(mouseX/canvas.width*canvas.myNewData.data.length)
        rectstatus = null;
    }

    else if (rectstatus === "right"){

        canvas.myNewData.valueindexend = Math.floor(mouseX/canvas.width*canvas.myNewData.data.length)
        rectstatus = null;
    }


    isresize = false;
   


}




})



}



}




}