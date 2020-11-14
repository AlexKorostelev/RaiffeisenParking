import style from './style.module.css';

function Loader() {
  return (
    <div className="d-flex justify-content-center">
      <div className={style['lds-ripple']}>
        <div />
        <div />
      </div>
    </div>
  );
}

export default Loader;
