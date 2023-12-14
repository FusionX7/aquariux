import React, { memo } from 'react';
import './weather-detail.css'

interface WeatherDetailProps {
  weatherData: any;
}

function WeatherDetail({ weatherData }: WeatherDetailProps) {
  const weatherInfoObj = weatherData.weather[0];
  const cityLabel = weatherData.name;
  const countryLabel = weatherData.sys.country;
  const { humidity, temp_min, temp_max } = weatherData.main;
  const timeLabel = new Date(weatherData.dt * 1000).toLocaleString();
  const weatherConditionLabel = weatherInfoObj.main;
  const weatherDescriptionLabel = weatherInfoObj.description;

  return (
    <div className="d-flex flex-column mt-4 ms-4">
      <small className="font-monospace text-body-secondary">
        {cityLabel}, {countryLabel}
      </small>
      <h2 className="display-4 fw-bold">{weatherConditionLabel}</h2>
      <div>
        <small className="text-body-secondary detail-label pe-2">Description:</small>
        <span>{weatherDescriptionLabel}</span>
      </div>
      <div>
        <small className="text-body-secondary pe-2">Temperature:</small>
        <span>
          {temp_min}&#8451; ~ {temp_max}&#8451;
        </span>
      </div>
      <div>
        <small className="text-body-secondary pe-2">Humidity:</small>
        <span>{humidity}%</span>
      </div>
      <div>
        <small className="text-body-secondary pe-2">Time:</small>
        <span>{timeLabel}</span>
      </div>
    </div>
  );
}

export default memo(WeatherDetail);
