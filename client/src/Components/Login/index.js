import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addNew } from '../../redux/actionCreators/cars';

function Form() {
  // const [value, setValue] = useState('');
  const [carNumber, setCarNumber] = useState('');
  const [password, setPassword] = useState('');

  // for saving car number
  const dispatch = useDispatch();

  function checkInputNum(str) {
    const code = {
      А: 'A',
      В: 'B',
      Е: 'E',
      К: 'K',
      М: 'M',
      Н: 'H',
      О: 'O',
      Р: 'P',
      С: 'C',
      Т: 'T',
      У: 'Y',
      Х: 'X',
    };

    let arr = str.toUpperCase().replace(/[^АВЕКМНОРСТУХABEKMHOPCTYX0123456789]/g, '').split('');
    arr = arr.map((e) => (/[АВЕКМНОРСТУХ]/.test(e) ? code[e] : e));

    return arr.join('');
  }

  function validityCheck() {
    return (/^\w{1}\d{3}\w{2}\d{2,3}$/.test(carNumber));
  }

  const submitHandler = (event) => {
    event.preventDefault();
    if (validityCheck() && password) {
      fetch('/user/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ carNumber, password }),
      }).then((res) => {
        if (res.status === 200) {
          dispatch(addNew(carNumber));
        }
      });
    }
  };

  // saving each time when when user submits

  return (
    <form onSubmit={submitHandler}>
      <div className="form-group formContainer">
        <input
          onChange={(e) => setCarNumber(checkInputNum(e.target.value))}
          placeholder="Enter car number"
          value={carNumber}
          type="text"
          className="form-control my-1"
        />
        <input
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password ..."
          value={password}
          type="password"
          className="form-control my-1"
        />
        <Link className="btn btn-outline-secondary mx-1 linkMain" to={`/session/${carNumber}/info`}>
          <button type="submit" className="btn btn-secondary .btn-block bnHide">
            Войти
          </button>
        </Link>
      </div>
    </form>
  );
}

function Login() {
  return (
    <div className="container">
      <Form />
    </div>
  );
}

export default Login;
