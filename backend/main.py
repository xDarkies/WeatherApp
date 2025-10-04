from fastapi import FastAPI
import uvicorn
import requests
import json
from fastapi.middleware.cors import CORSMiddleware
from elevenlabs.client import ElevenLabs
from elevenlabs.play import save,play,stream
import os
from fastapi.responses import StreamingResponse
from dotenv import load_dotenv

app = FastAPI()
load_dotenv()

elevenlabs = ElevenLabs(
  api_key=os.getenv("ELEVENLABS_API_KEY"),
)

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)



@app.get("/daily-forecast")
async def daily_forecast(lat:float,lng:float):
    response = requests.get(f'https://api.open-meteo.com/v1/forecast?latitude={lat}&longitude={lng}&daily=temperature_2m_max,temperature_2m_min,sunset,sunrise,rain_sum,wind_speed_10m_max,wind_gusts_10m_max,visibility_mean&forecast_days=16')
    if(response.status_code != 200):
        return "Error"
    return json.loads(response.text)

@app.get("/tts")
async def tts(text:str):
    def audio_stream(text:str):
        audio =  elevenlabs.text_to_speech.stream(
        text=text,
        voice_id="JBFqnCBsd6RMkjVDRZzb",
        model_id="eleven_multilingual_v2",
        )
        for chunk in audio:
            yield chunk

    return StreamingResponse(audio_stream(text), media_type="audio/mpeg")

@app.get("/")
async def main():
    return {"message":"Api connected"}
    

if __name__ == "__main__":
    uvicorn.run(app,host="127.0.0.1",port=2137)