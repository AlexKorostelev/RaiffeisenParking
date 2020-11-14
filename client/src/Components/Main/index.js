import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addNew } from '../../redux/actionCreators/cars';

function Form() {
  const [carNumber, setCarNumber] = useState('');

  // for saving car number
  const dispatch = useDispatch();

  const clickHandler = () => {
    if (carNumber.trim()) {
      // car is pushed to cars array in redux
      dispatch(addNew(carNumber.trim()));
    }
  };

  // saving each time when when user submits

  return (
    <form>
      <div className="form-group formContainer">
        <input
          onChange={(e) => setCarNumber(e.target.value)}
          placeholder="Номер машины ..."
          value={carNumber}
          type="text"
          className="form-control my-1"
        />
        <Link className="btn btn-outline-secondary mx-1 linkMain" to={`/session/${carNumber}/info`}>
          <button onClick={clickHandler} type="button" className="btn btn-secondary .btn-block bnHide">
            Проверить
          </button>
        </Link>
      </div>
    </form>
  );
}

function Main() {
  return (
    <div className="container">
      <Form />
    </div>
  );
}

export default Main;
