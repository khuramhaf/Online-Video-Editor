function exportdata(){
	
	var buttons = document.getElementsByClassName("button")
	
	buttons[0].disabled = true;
	buttons[1].disabled = true;
	buttons[2].disabled = true;
	buttons[3].disabled = true;
	buttons[4].disabled = true;

  if(source){source.stop()}

    clearInterval(intervalid);
    clearInterval(videointerval);

    if (check!=null && array !== null){
      exportflag = 1;

        document.getElementById("status").innerHTML = "Exporting in Progress it may take some time";
       

        var canvas = document.getElementById("canvas1")
        canvas.width = videoinfo.width;
        canvas.height = videoinfo.height
      
    


      document.getElementById("timer").innerHTML = time;
        source = audiocontext.createBufferSource();
  
  var array1 = new Float32Array(array);
      var audiobuffer = audiocontext.createBuffer(1, array.length, audiocontext.sampleRate);
      var ab1=  audiobuffer.getChannelData(0);
   ab1.set(array);

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
  intervalcounter = 1;


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

if (intervalcounter>=videodata.length){
    clearInterval(videointerval);
}
 },1000/videoinfo.samplerate)

 
         
         source.buffer=audiobuffer;
         source.connect(audiocontext.destination);
         source.start(0);

         const dest = audiocontext.createMediaStreamDestination();
         source.connect(dest);
        var audiotracks = dest.stream.getAudioTracks();

        var canvasstream = canvas.captureStream();
      
      
      var outputstream = new MediaStream();
      var canvastracks = canvasstream.getTracks();
      var audiotracks = dest.stream.getAudioTracks()
      outputstream.addTrack(canvastracks[0])
      outputstream.addTrack(audiotracks[0])
      
      var mediarecorder = new MediaRecorder(outputstream, {mimeType:'video/webm; codecs="vp9, opus"'});
      mediarecorder.start();
      mediarecorder.ondataavailable=((e)=>{
      videochunk.push(e.data)
      }
      )
      
      mediarecorder.onstop=(()=>{
      
        var blob = new Blob(videochunk, {type:'video/webm'})
      
        const url = URL.createObjectURL(blob);
      
      var anchor = document.createElement('a');
      anchor.href = url;
      anchor.download = "amooiz.webm"
      
      document.body.appendChild(anchor);
      anchor.click();
      })

      source.onended = function(){
        mediarecorder.stop();
        exportflag = 0;

        canvas.width = videoinfo.width/2;
        canvas.height = videoinfo.height/2
		
		var buttons = document.getElementsByClassName("button")
	
	buttons[0].disabled = false;
	buttons[1].disabled = false;
	buttons[2].disabled = false;
	buttons[3].disabled = false;
	buttons[4].disabled = false;

      }
      
}

else {

    document.getElementById("error").innerHTML = "Please select a file";
}
}