import React, { useState, useEffect } from 'react';
import RegionData from '@/data/RegionData'; // data.js 파일 임포트
import './WeatherTable.css';
import { WiDaySunny } from 'weather-icons-react';
import WeatherIcon from '@/icon/WeatherIcons';
import { WiHumidity } from "react-icons/wi";
import { FaTemperatureHalf } from "react-icons/fa6";
import { FaTemperatureHigh } from "react-icons/fa";

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
      const promises = regions.map(async (region) => {
        const { latitude, longitude } = region;
        const apiUrl = `https://api.openweathermap.org/data/2.5/forecast/daily?lat=${latitude}&lon=${longitude}&cnt=16&lang=kr&appid=${apiKey}&units=metric`;
        const response = await fetch(apiUrl);
        const data = await response.json();
        return { ...region, forecast: data.list };
      });
      const results = await Promise.all(promises);
      console.log('1111')
      console.log(results);
      console.log(results[0].forecast[0].clouds)
      
      return results;
    } catch (error) {
      console.error('Error fetching weather data:', error);
      return [];
    }
  };
  
  // const filterWeatherDataByDates = (data, startDate, endDate) => {
  //   return data.map(region => {
  //     return {
  //       ...region,
  //       forecast: region.forecast.filter(item => {
  //         const forecastDate = new Date(item.dt * 1000); // Convert timestamp to date
  //         return forecastDate >= startDate && forecastDate <= endDate;
  //       })
  //     };
  //   });
  // };


  // const filterWeatherDataByDates = (data, startDate, endDate) => {
  //   return data.map(region => {
  //     const filteredForecast = (region.forecast || []).filter(item => {
  //       const forecastDate = new Date(item.dt * 1000); // Convert timestamp to date
  //       return forecastDate >= startDate && forecastDate <= endDate;
  //     });
  
  //     return { forecast: filteredForecast };
  //   });
  // };
  
  // useEffect(() => {
  //   if (selectedStartDate && selectedEndDate) {
  //     const fetchData = async () => {
  //       const data = await fetchWeatherDataBasedOnLocation();
  //       // const filteredData = filterWeatherDataByDates(data, selectedStartDate, selectedEndDate);
  //       console.log("2222")
  //       console.log(data)
  //       console.log("3333")
  //       console.log(filteredData)
  //       setWeatherData(data);
  //       // setWeatherData(filteredData);
  //     };
  //     fetchData();
  //   }
  // }, [selectedStartDate, selectedEndDate]);
  
  useEffect(() => {
    const fetchData = async () => {
      if (selectedStartDate && selectedEndDate) {
        const data = await fetchWeatherDataBasedOnLocation();
        setWeatherData(data);
        console.log(weatherData)
      }
    };
    fetchData();
  }, [selectedStartDate, selectedEndDate]);


 return (
  <div className="-z-10 max-h-[424px] overflow-x-scroll over " >
        <table class="w-full text-sm text-left text-gray-500 dark:text-gray-400 -z-10">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                    <th scope="col" class="py-3 px-2">Date</th>
                    {regions.map((region) => (
                        <th scope="col" class="py-3 px-6" key={region.do}>{region.do}</th>
                    ))}
                    {/* Add more columns as needed */}
                </tr>
            </thead>
            <tbody>
                {dates.map((date, dateIndex) => (
                    <tr key={dateIndex}>
                      <div className="date_div">
                        <td class="py-4 px-1">{date.toLocaleDateString(undefined, { month: 'numeric', day: 'numeric' })}</td>
                        </div>
                        <div className="text-base flex flex-row-reverse ">
                        <FaTemperatureHigh />
                        </div>
                        <div className="text-2xl flex flex-row-reverse ">
                        <WiHumidity />
                        </div>
                        {regions.map((region) => {
                            const forecastForRegion = weatherData.find((data) => data.do === region.do)
                                ?.forecast.find((forecast) => {
                                    const forecastDate = new Date(forecast.dt * 1000);
                                    return forecastDate.toLocaleDateString() === date.toLocaleDateString();
                                });

                            return (
                                <td class="py-2 px-3" key={`${dateIndex}-${region.do}`}>
                                    {forecastForRegion ? (
                                        <>
                                              <WeatherIcon weatherType={forecastForRegion.weather[0].icon} />
                                            <div>{forecastForRegion.temp.day}°</div>
                                            <div>{Math.round(forecastForRegion.pop * 100)}%</div>
                                            {/* Add more weather data as needed */}
                                        </>
                                    ) : (
                                        <div>No data</div>
                                    )}
                                </td>
                            );
                        })}
                    </tr>
                ))}
            </tbody>
        </table>
    </div>

  );
}

export default WeatherTable;

