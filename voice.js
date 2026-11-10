export function speechSupport(){return !!(window.SpeechRecognition||window.webkitSpeechRecognition);}
export async function speak(text,settings={}){
  if(settings.voiceId && settings.apiEndpoint){
    try{
      const speechUrl=settings.apiEndpoint.replace(/\/api\/chat\/?$/,"/api/speech");
      const response=await fetch(speechUrl,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({text,voiceId:settings.voiceId})});
      if(!response.ok)throw new Error("ElevenLabs unavailable");
      const blob=await response.blob(),url=URL.createObjectURL(blob),audio=new Audio(url);
      await new Promise(resolve=>{audio.onended=resolve;audio.onerror=resolve;audio.play().catch(resolve);});
      URL.revokeObjectURL(url);return;
    }catch{/* Fall back to the device voice below. */}
  }
  return new Promise(resolve=>{if(!("speechSynthesis" in window)){resolve();return;}window.speechSynthesis.cancel();const u=new SpeechSynthesisUtterance(text);u.lang=settings.language||"en-US";u.rate=Number(settings.speechRate||1);const voices=window.speechSynthesis.getVoices();const preferred=voices.find(v=>/^en(-|_)/i.test(v.lang)&&/natural|google|microsoft/i.test(v.name))||voices.find(v=>/^en(-|_)/i.test(v.lang));if(preferred)u.voice=preferred;u.onend=resolve;u.onerror=resolve;window.speechSynthesis.speak(u);});
}
export function stopSpeaking(){if("speechSynthesis" in window)window.speechSynthesis.cancel();}
export function listenOnce(language="en-US"){return new Promise((resolve,reject)=>{const C=window.SpeechRecognition||window.webkitSpeechRecognition;if(!C){reject(new Error("Speech recognition is not supported."));return;}const r=new C();r.lang=language;r.continuous=false;r.interimResults=false;r.maxAlternatives=1;r.onresult=e=>resolve(e.results[0][0].transcript);r.onerror=e=>reject(new Error("Voice input error: "+e.error));r.onnomatch=()=>reject(new Error("No speech was recognized."));r.onend=()=>{};try{r.start();}catch(e){reject(e);}});}
