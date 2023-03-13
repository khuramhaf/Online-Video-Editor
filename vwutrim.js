function trim(){

    clearInterval(intervalid);
    clearInterval(videointerval)
    var start = parseFloat(document.getElementById("start").value);
var end = parseFloat(document.getElementById("end").value);
time=0;
var final = end - start;


    if(source){
        source.stop();
    
}

if (waveformsource){
        waveformsource.stop();
    }
    document.getElementById("timer").innerHTML = time;
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
else if ( end >= source.buffer.duration ){

document.getElementById("error").innerHTML = "Ending point is greater than or equal to  duration"

end < 0 }

else if ( end <= start){

document.getElementById("error").innerHTML = "Ending Point is greater than equal to Starting Point"

}

    else{
        

        document.getElementById("timer").innerHTML = time;
       
        array.splice(parseInt(start*audiocontext.sampleRate), parseInt(final*audiocontext.sampleRate));
        videodata.splice(parseInt(start*videoinfo.samplerate), parseInt(final*videoinfo.samplerate))
        document.getElementById("start").value="";
        document.getElementById("end").value="";
        
        document.getElementById("totallength").innerHTML=array.length;
source = audiocontext.createBufferSource();
var array1 = new Float32Array(array);
    var audiobuffer = audiocontext.createBuffer(1, array.length, audiocontext.sampleRate);
var ab1=  audiobuffer.getChannelData(0);
ab1.set(array);
   
   source.buffer=audiobuffer;
   source.connect(audiocontext.destination);
   source.start(0,0,0)
   sourceduration = source.buffer.duration;
   document.getElementById("duration").innerHTML = source.buffer.duration.toFixed(3);
   if ( source.buffer.duration >=1){
intervalid =   setInterval(()=>{
    time++;
document.getElementById("timer").innerHTML = time;
if (time === parseInt(source.buffer.duration)){
    clearInterval(intervalid);
}
}, 1000);
   }
}}