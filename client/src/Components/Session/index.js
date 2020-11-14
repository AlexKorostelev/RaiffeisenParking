/* eslint-disable no-console */
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Loader from '../Loader';

function Session() {
  const [parkingSession, setParkingSession] = useState({});
  const [time, setTime] = useState('');
  const [cost, setCost] = useState(null);

  const { carNumber } = useParams();
  const { parkingTitle, startTime, tariff } = parkingSession;

  useEffect(() => {
    fetch(`http://localhost:3333/session/${carNumber}/info`)
      .then((response) => response.json())
      .then((data) => {
        setParkingSession(data);
      });
  }, []);

  useEffect(() => {
    if (startTime) {
      setTime(
        new Date(Date.now() - Date.parse(startTime)).toLocaleTimeString(),
      );
    }
  }, [startTime]);

  useEffect(() => {
    if (startTime) {
      setTimeout(() => {
        setTime(
          new Date(Date.now() - Date.parse(startTime)).toLocaleTimeString(),
        );
      }, 1000);
    }
  }, [time]);

  useEffect(() => {
    if (startTime && tariff) {
      setCost(
        Math.round(((Date.now() - Date.parse(startTime)) * tariff) / 3600000),
      );
    }
  }, [startTime]);

  useEffect(() => {
    if (startTime && tariff) {
      setTimeout(() => {
        setCost(
          Math.round(((Date.now() - Date.parse(startTime)) * tariff) / 3600000),
        );
      }, 1000);
    }
  }, [time]);

  async function onPayButtonClick() {
    if (!parkingSession) return;
    // eslint-disable-next-line no-underscore-dangle
    const sessionId = parkingSession._id;
    const response = await fetch(`http://localhost:3333/session/${sessionId}/stop`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const jsonResponse = await response.json();
    console.log(jsonResponse);
  }

  return (
    <>
      {startTime ? (
        <div id="ssession">
          <div id="place">
            Место парковки:
            {' '}
            {parkingTitle}
          </div>
          <div id="time">
            Время парковки:
            {' '}
            {time}
          </div>
          <div id="price">
            К оплате:
            {' '}
            {cost}
            {' ₽'}
          </div>
          <button type="button" onClick={onPayButtonClick}>Оплатить</button>
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
}

export default Session;
