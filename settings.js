const KEY="jarvis.settings.v1";
const defaults={language:"en-US",speechRate:1,cameraResolution:"640x360",apiEndpoint:"",voiceId:""};
export function readSettings(){return {language:document.getElementById("language").value,speechRate:document.getElementById("speechRate").value,cameraResolution:document.getElementById("cameraResolution").value,apiEndpoint:document.getElementById("apiEndpoint").value,voiceId:document.getElementById("voiceId").value};}
export function saveSettings(settings){try{localStorage.setItem(KEY,JSON.stringify(settings));}catch{}}
export function loadSettings(){let s=defaults;try{s={...defaults,...JSON.parse(localStorage.getItem(KEY)||"{}")};}catch{}for(const [k,id] of Object.entries({language:"language",speechRate:"speechRate",cameraResolution:"cameraResolution",apiEndpoint:"apiEndpoint",voiceId:"voiceId"})){const el=document.getElementById(id);if(el)el.value=s[k];}document.getElementById("rateValue").textContent=Number(s.speechRate).toFixed(1)+"×";}
