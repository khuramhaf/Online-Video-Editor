function myFunction() {

    document.getElementById("status").innerHTML = "Loading and decoding file..."
     
            clearInterval(intervalid);
    
        if (audiocontext === undefined){
     
     audiocontext= new AudioContext();
    }
    
    
    if (source){
     source.stop();
    }
    if (waveformsource){
            waveformsource.stop();
        }
    
    
     const fr = new FileReader();
    
     fr.onload = function(){

        var extractaudiodata = fr.result.slice(0, fr.result.byteLength)

      
      
       audiocontext.decodeAudioData(extractaudiodata, function(audiofile){
        var x = audiofile.getChannelData(0);

        var y = Array.from(x);
        try{
            if (array===null){
                array = y;
                sourceduration = 0;
                
            }
            else{
    
    
                array = array.concat(y);
            }
            
        }
        catch(error){
            alert('Limit Exceed');
            console.error("error");
            sourceduration=0;
        }
    
        document.getElementById("totallength").innerHTML=array.length;
        source = audiocontext.createBufferSource();
    check = 1;
    
        time = parseInt(sourceduration);
       
        
        document.getElementById("error").innerHTML = "";
    
    
    
       
    var array1 = new Float32Array(array);
        var audiobuffer = audiocontext.createBuffer(1, array.length, audiocontext.sampleRate);
        var ab1=  audiobuffer.getChannelData(0);
     ab1.set(array);
    
     
    
    
       
           
           source.buffer=audiobuffer;
           source.connect(audiocontext.destination);
           source.start(0,0,0)
           
           sourceduration = source.buffer.duration;
           
           document.getElementById("duration").innerHTML = source.buffer.duration.toFixed(3);
    
 
    document.getElementById("status").innerHTML = "";

    
    //videofile



    var mp4boxfile = MP4Box.createFile();
    mp4boxfile.onReady = function(info) {

      

    codecinfo = info.videoTracks[0].codec;



    var movieduration = info.videoTracks[0].movie_duration
    var movietimescale = info.videoTracks[0].movie_timescale
    var samplelength = info.videoTracks[0].nb_samples;
    var durationinseconds = movieduration/movietimescale;

    videoinfo.samplerate =Math.round( samplelength/durationinseconds);

   videoinfo.height = info.videoTracks[0].track_height;
    videoinfo.width=info.videoTracks[0].track_width;

   
   
  



mp4boxfile.setExtractionOptions(1, null, {nbSamples:2000});  
mp4boxfile.start();
mp4boxfile.onSamples = function (id, user, samples) {

if (id===1){

var counter = 0;

while(counter<samples.length){
videodata.push(samples[counter].data)

counter++;
}


}

if(samples[0].number === 0){

if(id===1){
	keyframe = samples[0].data
var avccext = fr.result;
avcC = avccext.slice(
samples[0].description.boxes[0].start+samples[0].description.boxes[0].hdr_size, samples[0].description.boxes[0].start+samples[0].description.boxes[0].size)

if (videoDecoder.state==="unconfigured"){
var config = {
    codec:codecinfo,
    codedWidth:videoinfo.width/2,
      codedHeight: videoinfo.height/2,
      
      description:avcC,
    
    
    
    }
videoDecoder.configure(config);

}



var  init  = {
    type: 'key',
    data: videodata[0],
    timestamp: 2000,
    duration: 37,
    }; 
    
    var chunk = new EncodedVideoChunk(init);
    
    videoDecoder.decode(chunk);

    keyframe = videodata[0]

}
}

}}

   var buffer = fr.result;
   buffer.fileStart = 0;

    mp4boxfile.appendBuffer(buffer);
 mp4boxfile.flush();






       }).catch(function(error){
        document.getElementById("status").innerHTML = "";
        document.getElementById("error").innerHTML = "Cannot open file"
       });;
    
      
     } 
     var Files= document.getElementById("file").files
     file = Files[0];
     if (file){
      fr.readAsArrayBuffer(Files[0]);
    }
    
    document.getElementById("file").value = '';
    }
    
   