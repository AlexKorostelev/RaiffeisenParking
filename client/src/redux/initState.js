const initState = () => {
  const init = {
    cars: [],
  };
  return JSON.parse(localStorage.getItem('store')) || init;
};

export default initState;
