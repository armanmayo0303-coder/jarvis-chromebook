const localReply = (message) => {
  const q=message.toLowerCase();
  if(/\b(hello|hi|hey)\b/.test(q))return "Hello. I am JARVIS, running in local demo mode. What would you like to do?";
  if(q.includes("time"))return "The current local time is "+new Date().toLocaleTimeString()+".";
  if(q.includes("date"))return "Today is "+new Date().toLocaleDateString()+".";
  if(q.includes("help"))return "I can respond to basic demo prompts, tell you the local time or date, speak replies, and open the camera when you explicitly activate it. Cloud AI is not configured yet.";
  if(q.includes("offline"))return "The app shell and basic interface work offline after the first successful load. Cloud AI and many browser speech-recognition services require an internet connection.";
  if(q.includes("type")||q.includes("control my laptop"))return "A browser app cannot safely control the entire ChromeOS device. I can help with actions inside this app; system-wide automation needs a separately installed, permission-limited companion and may still be restricted by ChromeOS.";
  return "I understood your message, but this is a local demo response, not a real AI answer. Configure the secure backend endpoint in Settings to connect a cloud AI provider.";
};
export async function sendChat(message,settings={}){
  const endpoint=(settings.apiEndpoint||"").trim();
  if(endpoint){const res=await fetch(endpoint,{method:"POST",headers:{"Content-Type":"application/json"},body:JSON.stringify({message})});if(!res.ok)throw new Error("AI backend returned HTTP "+res.status);const data=await res.json();if(typeof data.reply!=="string")throw new Error("Unexpected backend response.");return {text:data.reply,mode:"cloud"};}
  return {text:localReply(message),mode:"local"};
}
