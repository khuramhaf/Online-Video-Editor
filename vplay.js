



function play(){
	

    clearInterval(intervalid);
    clearInterval(videointerval)
    
    var start = parseFloat(document.getElementById("start").value);
var end = parseFloat(document.getElementById("end").value);

time = parseInt(start);




  



var final = end - start;

if (sourcecheck === null){

    
    if(source){
        source.stop();
    }

    if (waveformsource){
        waveformsource.stop();
    }
}

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
        document.getElementById("timer").innerHTML = time;
        source = audiocontext.createBufferSource();
  
  var array1 = new Float32Array(array);
      var audiobuffer = audiocontext.createBuffer(1, array.length, audiocontext.sampleRate);
      var ab1=  audiobuffer.getChannelData(0);
   ab1.set(array);

 
         
         source.buffer=audiobuffer;
         source.connect(audiocontext.destination);
         source.start(0, start, final);

         //videoplay

         setTimeout(()=>{
            var config = {
        codec:codecinfo,
        codedWidth:videoinfo.width/2,
          codedHeight: videoinfo.height/2,
          
          description:avcC,
        
        
        
        }
        videoDecoder.configure(config);
        
        var  init  = {
        type: 'key',
        data: keyframe,
        timestamp: 33+intervalcounter,
        duration: 40,
        }; 
        
        var chunk = new EncodedVideoChunk(init);
        
        videoDecoder.decode(chunk);
        
        
        
          },0)
          intervalcounter = start*videoinfo.samplerate;
        
          document.getElementById("canvas1").width = videoinfo.width/2
          document.getElementById("canvas1").height = videoinfo.height/2
        
        
          if (videoDecoder.state==="configured"){
                videoDecoder.reset();
            }
           
            clearInterval(videointerval);
        
        
         videointerval = setInterval(()=>{
    
        
           
        
            
        
        
        
        
        var  init  = {
        type: 'key',
        data: videodata[intervalcounter],
        timestamp: 33+intervalcounter,
        duration: 40,
        }; 
        
        var chunk = new EncodedVideoChunk(init);
        
        videoDecoder.decode(chunk);
        
        intervalcounter++;
        
        if (intervalcounter>=end*videoinfo.samplerate){
            clearInterval(videointerval);
        }
         },1000/videoinfo.samplerate)
        





         
         document.getElementById("duration").innerHTML = source.buffer.duration.toFixed(3);
     
         if (parseInt(start) != parseInt(end)){
intervalid =   setInterval(()=>{
    
    time++;
    document.getElementById("timer").innerHTML = time;

    if (time === parseInt(end)){
        clearInterval(intervalid);
    }

}, 1000);
    
    }}
  }