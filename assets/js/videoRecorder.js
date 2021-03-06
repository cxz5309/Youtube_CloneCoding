const recorderContainer = document.getElementById("jsRecordContainer");
const recordBtn = document.getElementById("jsRecordBtn");
const videoPreview = document.getElementById("jsVideoPreview");

let streamObject;
let videoRecorder;

const handleVideoData = event =>{
    console.log(streamObject);
    const {data:videoFile} = event;
    
    const link = document.createElement("a");
    link.href = URL.createObjectURL(videoFile);
    link.download = "recorded.webm";
    document.body.appendChild(link);
    link.click();
}

const startRecording = () =>{
    videoRecorder = new MediaRecorder(streamObject);
    videoRecorder.start();
    videoRecorder.addEventListener( "dataavailable", handleVideoData);
    recordBtn.addEventListener("click", stopRecording);
};

function stopStreamedVideo(videoElement) {
    const stream = videoElement.srcObject;
    const tracks = stream.getTracks();
    
    tracks.forEach(function(track) {
        track.stop();
    });
    
    videoElement.srcObject = null;
};

const stopRecording = () =>{
    videoRecorder.stop();
    stopStreamedVideo(videoPreview); 
    recordBtn.removeEventListener("click", stopRecording);
    recordBtn.addEventListener("click", getVideo);
    recordBtn.innerHTML = "Start recording";
}

const getVideo = async () =>{
    try{
        const stream = await navigator.mediaDevices.getUserMedia({
          audio: true,
          video: { width: 1280, height: 720 }
        });
        videoPreview.srcObject = stream;
        videoPreview.play();
        videoPreview.muted = true;
        recordBtn.innerHTML = "Stop recording";
        streamObject = stream;
        startRecording();
    }
    catch(error){
        recordBtn.innerHTML = "☹️ Cant record";
    }
    finally{
        recordBtn.removeEventListener("click", getVideo);
    }
}

function init(){
    recordBtn.addEventListener("click", getVideo);
}

if(recorderContainer){
    init();
}