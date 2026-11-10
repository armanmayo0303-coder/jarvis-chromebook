let activeStream=null;
export async function startCamera(video,resolution="640x360"){
  if(!navigator.mediaDevices?.getUserMedia)throw new Error("This browser does not support camera access.");
  const [width,height]=resolution.split("x").map(Number);
  activeStream=await navigator.mediaDevices.getUserMedia({audio:false,video:{facingMode:"user",width:{ideal:width},height:{ideal:height},frameRate:{ideal:15,max:20}}});
  video.srcObject=activeStream;await video.play();return activeStream;
}
export function stopCamera(video){if(activeStream){activeStream.getTracks().forEach(t=>t.stop());activeStream=null;}if(video)video.srcObject=null;}
