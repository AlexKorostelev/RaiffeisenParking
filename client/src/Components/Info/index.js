import { Link } from 'react-router-dom';

function Info() {

  return (
    <div>
      <div className="formContainer">
        <p className="p-0 text-center font-weight-normal">В любой момент Вы может ввести номер машины и посмотреть <Link to='/'>информацию</Link> о времени ее пребывания на парковке, сумму оплаты и оплатить её.</p>
        <div className="infoBtn">
          <Link to="/registration" className="btn btn-outline-secondary bnRegister">
            Регистрация
          </Link>
          <Link to="/login" className="btn btn-outline-secondary"> Войти </Link>
        </div>
      </div>
    </div>
  );
}

export default Info;
