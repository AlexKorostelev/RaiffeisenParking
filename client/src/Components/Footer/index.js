import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

function Footer() {
  // getting carNumber from store in redux
  const cars = useSelector((state) => state.cars);

  // last added car. we have array of cars so later we can have functionallity to monitor parking state of multiple cars
  let car;
  if (cars) {
    car = cars[cars.length - 1];
  }

  return (
    <div className="footer">
      <Link to="/info">
        <img className="imgfooter" src="/images/info.png" alt="info" />
      </Link>
      <Link to="/">
        <img className="imgfooter" src="/images/main.png" alt="main" />
      </Link>
      <Link to={car ? `/session/${car.carNumber}/info` : '/'}>
        <img className="imgfooter" src="/images/pay.png" alt="pay" />
      </Link>
    </div>
  );
}

export default Footer;
