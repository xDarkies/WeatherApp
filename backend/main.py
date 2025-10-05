from fastapi import FastAPI
import uvicorn
import requests
import json
from fastapi.middleware.cors import CORSMiddleware
from elevenlabs.play import save,play,stream
import os
from fastapi.responses import StreamingResponse
from dotenv import load_dotenv
from google import genai
from elevenlabs.client import ElevenLabs

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

client = genai.Client(api_key=os.getenv("GEMINI_API_KEY"))

@app.get("/formatTTS")
async def formatTTS(text:str):
    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents="Become a weather forecast presenter and create short weather forecast write only text that you say as a presenter dont write something like 'opening' from this data (data is in metric system, date is in format YYYY-MM-DD):" + text
    )
    return {"message":response.text}


@app.get("/daily-forecast")
async def daily_forecast(lat:float,lng:float):
    response = requests.get(f'https://api.open-meteo.com/v1/forecast?latitude={lat}&longitude={lng}&daily=temperature_2m_max,temperature_2m_min,sunset,sunrise,rain_sum,wind_speed_10m_max,wind_gusts_10m_max,visibility_mean,cloud_cover_mean&forecast_days=16')
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

@app.get("/hourly-forecast")
async def hourlu_forecast(lat:float,lng:float,option:str):
    url = f"https://api.open-meteo.com/v1/forecast?latitude={lat}&longitude={lng}&hourly="
    # &daily=rain_sum,visibility_mean&hourly=&forecast_days=16"
    #temperature
    if option.find("temperature") != -1:
        url += "temperature_2m,"
    #precipitation
    if option.find("quantityOfWater") != -1:
        url += "precipitation,"
    #wind_speed_10m
    if option.find("windSpeed") != -1:
        url += "wind_speed_10m,"
    #visibility
    if option.find("visibility") != -1:
        url += "visibility,"
    #surface_pressure
    if option.find("pressure") != -1:
        url += "surface_pressure,"
    #precipitation_probability
    if option.find("probOfPrecipitation") != -1:
        url += "precipitation_probability,"
    if url[-1] == ",":
        url = url[:-1]

    url += "&forecast_days=16"
    response = requests.get(url=url)

    

    if(response.status_code != 200):
        return "Error"

    return json.loads(response.text)


    

if __name__ == "__main__":
    uvicorn.run(app,host="127.0.0.1",port=2137)