/* eslint-disable no-console */
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Loader from '../Loader';

function Session() {
  const [parkingSession, setParkingSession] = useState({});
  const [time, setTime] = useState('');
  const [cost, setCost] = useState(null);
  const [imgQR, setimgQR] = useState('');
  const [qrPayload, setQrPayload] = useState('');
  const { carNumber } = useParams();
  const { parkingTitle, startTime, tariff } = parkingSession;

  useEffect(() => {
    fetch(`http://192.168.1.57:3333/session/${carNumber}/info`)
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
    const response = await fetch(`http://192.168.1.57:3333/session/${sessionId}/stop`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    const jsonResponse = await response.json();
    console.log(jsonResponse);
    const paramsQR = {
      "additionalInfo": parkingTitle,
      "amount": cost,
      "createDate": new Date(),
      "currency": "RUB",
      "order": sessionId + 5,
      "paymentDetails": "Оплата за парковку",
      "qrType": "QRDynamic",
      "qrExpirationDate": "2023-07-22T09:14:38.107227+03:00",
      "sbpMerchantId": "MA313441"
      };
    const getQR = await fetch("https://test.ecom.raiffeisen.ru/api/sbp/v1/qr/register", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json;charset=UTF-8',
      },
      body: JSON.stringify(paramsQR)
    });
    const qr = await getQR.json();
    setimgQR(qr.qrUrl);
    setQrPayload(qr.payload);
    console.log(qr);

  }

  return (
    <>
      {startTime ? (
        <div id="ssession">
          <div id="place">
            Место парковки:
            {' '}
            <b>
            {parkingTitle}
            </b>
          </div>
          <div id="time">
            Время парковки:
            {' '}
            <b>
            {time}
            </b>
          </div>
          <div id="price">
            К оплате:
            <b>
            {' '}
            {cost}
            {' ₽'}
            </b>
            <button className="btn btn-lg btn-secondary mt-2" type="button" onClick={onPayButtonClick}><b>ОПЛАТИТЬ</b></button>
          </div>
          <br />
        </div>
      ) : (
        <Loader />
      )}
    </>
  );
}

export default Session;
