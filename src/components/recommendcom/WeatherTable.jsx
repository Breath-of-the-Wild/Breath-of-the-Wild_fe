import React, { useState, useEffect } from 'react';
import RegionData from '@/data/RegionData'; // data.js 파일 임포트

function WeatherTable({ selectedStartDate, selectedEndDate }) {
  const [weatherData, setWeatherData] = useState([]);
  const [dates, setDates] = useState([]);
  const [clearCount, setClearCount] = useState(0);
  const [regions, setRegions] = useState([]);

  useEffect(() => {
    setDates(getDates());
    setRegions(RegionData);
  }, [selectedStartDate, selectedEndDate]);

  useEffect(() => {
    if (weatherData.length > 0) {
      countClearValues();
    }
  }, [weatherData]);

  const getDates = () => {
    const startDate = new Date(selectedStartDate);
    const endDate = new Date(selectedEndDate);
    const dates = [];

    for (let date = startDate; date <= endDate; date.setDate(date.getDate() + 1)) {
      dates.push(new Date(date));
    }

    return dates;
  };

  const countClearValues = () => {
    let count = 0;
    weatherData.forEach(data => {
      if (data.forecast && data.forecast.length > 0 && data.forecast[0].weather[0].main === 'Clear') {
        count++;
      }
    });
    setClearCount(count);
  };

  const fetchWeatherDataBasedOnLocation = async () => {
    try {
      const apiKey = '5875c07a24e6e9876697423c7192dc2d';
      const filteredDates = dates.filter(date => date >= selectedStartDate && date <= selectedEndDate);
      const promises = regions.map(async (region) => {
        const { latitude, longitude } = region;
        const apiUrl = `https://api.openweathermap.org/data/2.5/forecast/daily?lat=${latitude}&lon=${longitude}&cnt=16&appid=${apiKey}&units=metric`;
        const response = await fetch(apiUrl);
        const data = await response.json();
        console.log(data);
        return { ...region, forecast: data.list.filter((_, index) => filteredDates.includes(dates[index])) };
      });
      const results = await Promise.all(promises);
      setWeatherData(results);
      // countClearValues();
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  useEffect(() => {
    if (selectedStartDate && selectedEndDate) {
      fetchWeatherDataBasedOnLocation();
    }
  }, [selectedStartDate, selectedEndDate]);

  return (
    <div className="flex items-center justify-center min-h-screen bg-white-900 container1">
      <div className="col-span-12">
        <div className="overflow-auto lg:overflow-visible">
          <div className="flex flex-row">
            {weatherData.length > 0 && (
              <table className="table text-gray-400 border-separate space-y-6 text-sm table-fixed">
                <thead className="bg-gray-800 text-gray-500">
                  <tr>
                    <th className="p-3 text-left">날짜 / 지역</th>
                    {regions.map(region => (
                      <th className="p-3 text-left" key={region.id}>{region.do}</th>
                    ))}
                  </tr>
                </thead>
                <tbody>
                  {dates.map((date, index) => (
                    <tr className="bg-gray-800 " key={date}>
                      <td className="p-3 regiontd">{date.toLocaleDateString()}</td>
                      {weatherData.map(data => (
                        <td key={`${data.id}-${index}`}>
                          {data.forecast && data.forecast[index] ? (
                            <div>
                              <img src={`http://openweathermap.org/img/wn/${data.forecast[index].weather[0].icon}@2x.png`} alt="weather icon" />
                              {data.forecast[index].weather[0].main}<br />
                              {data.forecast[index].temp.morn}<br />
                              {data.forecast[index].temp.day}<br />
                              {data.forecast[index].rain}<br />
                              {data.forecast[index].pop}
                            </div>
                          ) : (
                            '-'
                          )}
                        </td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
          {/* <div className="clearCount">Clear 값의 수: {clearCount}</div> */}
        </div>
      </div>
    </div>
  );
}

export default WeatherTable;
