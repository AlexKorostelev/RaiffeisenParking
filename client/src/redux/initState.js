const initState = () => {
  const init = {
    tasks: [],
  };
  return JSON.parse(localStorage.getItem('store')) || init;
};

export default initState;
