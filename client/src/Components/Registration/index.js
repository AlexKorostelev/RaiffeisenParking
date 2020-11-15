import { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addNew } from '../../redux/actionCreators/cars';
import Loader from '../Loader';

function Form() {
  const [carNumber, setCarNumber] = useState('');
  const [password, setPassword] = useState('');
  const [userStatus, setUserStatus] = useState(false);
  const [trigger, setTrigger] = useState(true);

  // for saving car number
  const dispatch = useDispatch();
  const user = { carNumber, password, userStatus };

  const submitHandler = (e) => {
    setTrigger(false);
    e.preventDefault();
    if (carNumber && password) {
      fetch('http://localhost:3333/user/new', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ carNumber, password }),
      }).then((res) => {
        if (res.status === 200) {
          setUserStatus(true);
          dispatch(addNew(user));
        }
      });
    }
  };

  // saving each time when when user submits

  return (
    <>
      {
      userStatus ? <Redirect to={`/session/${carNumber}/info`} />
        : (
          <form>
            <div className="form-group">
              <input
                onChange={(e) => setCarNumber(e.target.value)}
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
            </div>
            {trigger
              ? (
                <button onClick={submitHandler} type="submit" className="btn btn-secondary .btn-block">
                  Регистрация
                </button>
              )
              : <Loader />}
          </form>
        )
    }
    </>
  );
}

function Registration() {
  return (
    <div className="container">
      <Form />
    </div>
  );
}

export default Registration;
