// Minimal secure API proxy scaffold. Never put provider keys in frontend code.
import express from "express";
import helmet from "helmet";
import rateLimit from "express-rate-limit";
import dotenv from "dotenv";
dotenv.config();
const app=express();
app.use(helmet());
app.use(express.json({limit:"16kb"}));
app.use(rateLimit({windowMs:60_000,limit:20,standardHeaders:true,legacyHeaders:false}));
app.get("/health",(_req,res)=>res.json({ok:true,providerConfigured:Boolean(process.env.OPENAI_API_KEY)}));
app.post("/api/chat",async(req,res)=>{
  const message=typeof req.body?.message==="string"?req.body.message.trim():"";
  if(!message||message.length>4000)return res.status(400).json({error:"Message must be 1–4000 characters."});
  if(!process.env.OPENAI_API_KEY)return res.status(503).json({error:"AI provider is not configured."});
  try{
    const upstream=await fetch("https://api.openai.com/v1/chat/completions",{method:"POST",headers:{"Authorization":`Bearer ${process.env.OPENAI_API_KEY}`,"Content-Type":"application/json"},body:JSON.stringify({model:process.env.OPENAI_MODEL||"gpt-4o-mini",messages:[{role:"system",content:"You are JARVIS, a helpful assistant. Never claim to control the user's device unless an authorized tool actually did so."},{role:"user",content:message}],temperature:0.5})});
    const data=await upstream.json();
    if(!upstream.ok)return res.status(502).json({error:"AI provider request failed."});
    return res.json({reply:data.choices?.[0]?.message?.content||"No response returned."});
  }catch{return res.status(502).json({error:"Unable to reach AI provider."});}
});
app.post("/api/speech",async(req,res)=>{
  const text=typeof req.body?.text==="string"?req.body.text.trim():"";
  const voiceId=typeof req.body?.voiceId==="string"?req.body.voiceId.trim():"";
  if(!text||text.length>2500||!voiceId)return res.status(400).json({error:"Text (max 2500 chars) and a Voice ID are required."});
  if(!process.env.ELEVENLABS_API_KEY)return res.status(503).json({error:"ElevenLabs is not configured on the backend."});
  try{
    const upstream=await fetch(`https://api.elevenlabs.io/v1/text-to-speech/${encodeURIComponent(voiceId)}`,{
      method:"POST",headers:{"xi-api-key":process.env.ELEVENLABS_API_KEY,"Content-Type":"application/json","Accept":"audio/mpeg"},
      body:JSON.stringify({text,model_id:"eleven_multilingual_v2",voice_settings:{stability:0.5,similarity_boost:0.75}})
    });
    if(!upstream.ok)return res.status(502).json({error:"ElevenLabs synthesis failed."});
    res.setHeader("Content-Type","audio/mpeg");
    res.setHeader("Cache-Control","no-store");
    return res.send(Buffer.from(await upstream.arrayBuffer()));
  }catch{return res.status(502).json({error:"Unable to reach ElevenLabs."});}
});
const port=Number(process.env.PORT||8787);
app.listen(port,()=>console.log(`JARVIS backend listening on ${port}`));
