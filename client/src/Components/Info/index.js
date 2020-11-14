import { Link } from 'react-router-dom';

function Info() {
  // const [value, setValue] = useState('');

  return (
    <div>
      <div className="formContainer">
        <h1 className="display-4 font-weight-normal">Info</h1>
        <p className="lead font-weight-normal">Some info about</p>
        <div className="infoBtn">
          <Link to="/" className="btn btn-outline-secondary bnRegister">
            Register
          </Link>
          <Link to="/" className="btn btn-outline-secondary"> Login </Link>
        </div>
      </div>
    </div>
  );
}

export default Info;
