from fastapi import FastAPI
import uvicorn
import requests
import json
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI()

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

@app.get("/")
async def main():
    return {"message":"Api connected"}
    

if __name__ == "__main__":
    uvicorn.run(app,host="127.0.0.1",port=2137)