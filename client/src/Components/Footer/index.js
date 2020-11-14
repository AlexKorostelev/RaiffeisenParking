import { Link } from 'react-router-dom';

function Footer() {
  return (
    <div className="footer">
      <Link to="info">
        <img className="imgfooter" src="/images/info.png" alt="info" />
      </Link>
      <Link to="/">
        <img className="imgfooter" src="/images/main.png" alt="main" />
      </Link>
      <Link to="/">
        <img className="imgfooter" src="/images/pay.png" alt="pay" />
      </Link>
    </div>
  );
}

export default Footer;
