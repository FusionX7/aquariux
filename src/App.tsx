import React, { useState, useCallback, useEffect } from 'react';
import { useQuery } from 'react-query';
import { produce } from 'immer';
import './App.css';
import LocationSearch from './components/location-search';
import WeatherDetail from './components/weather-detail';
import SearchHistory from './components/search-history';

function useWeather(city = '', country = '') {
  return useQuery<any, any>(
    'weather',
    async () => {
      const locationParam = `${city},${country}`;
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${locationParam}&appid=9c2c4a6b0abad2dbf3442825c763929b&units=metric`
      );
      const data = await res.json();
      if (data?.message) throw new Error(data.message);

      return data;
    },
    { refetchOnWindowFocus: false, enabled: false, retry: false }
  );
}

function App() {
  const [city, setCity] = useState('');
  const [country, setCountry] = useState('');
  const [history, setHistory] = useState<
    { city: string; country: string; time: number }[]
  >([]);
  const { data, error, isFetching, refetch } = useWeather(city, country);
  const handleChangeCity = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setCity(value);
    },
    []
  );
  const handleChangeCountry = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const value = e.target.value;
      setCountry(value);
    },
    []
  );
  const handleClearInputs = useCallback(() => {
    setCity('');
    setCountry('');
  }, []);

  const handleSearchItem = useCallback((city: string, country: string) => {
    setCity(city);
    setCountry(country);
    setTimeout(() => {
      refetch()
    }, 250);
  }, []);

  const handleRemoveItem = useCallback((index: number) => {
    setHistory(prev => {
      const nextState = produce(prev, draftState => {
        draftState.splice(index, 1);
      });
      return nextState;
    });
  }, []);

  const errorMessageMarkup = error && (
    <div className="alert alert-danger mt-3" role="alert">
      {error.message}
    </div>
  );

  useEffect(() => {
    if (data) {
      const cityLabel = data.name;
      const countryLabel = data.sys.country;
      const unixTime = (new Date()).getTime();
      setHistory(prev => [
        ...prev,
        { city: cityLabel, country: countryLabel, time: unixTime },
      ]);
    }
  }, [data]);
  return (
    <div className="App container">
      <h2 className="mt-2">Today's weather</h2>
      <hr className="border border-black" />
      <LocationSearch
        city={city}
        country={country}
        onChangeCity={handleChangeCity}
        onChangeCountry={handleChangeCountry}
        onSearch={refetch}
        onClear={handleClearInputs}
        loading={isFetching}
      />
      {errorMessageMarkup}
      {!error && data && <WeatherDetail weatherData={data} />}
      <h2 className="mt-4">Search history</h2>
      <hr className="border border-black" />
      <SearchHistory
        history={history}
        onItemSearch={handleSearchItem}
        onItemDelete={handleRemoveItem}
      />
    </div>
  );
}

export default App;
