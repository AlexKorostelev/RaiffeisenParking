import * as TYPES from '../types/cars';

function carsReducer(cars = [], action) {
  switch (action.type) {
    case TYPES.ADD_NEW:
      return [...cars, action.payload];

    case TYPES.DELETE:
      return cars.filter((el) => el.id !== action.payload);

    case TYPES.CHANGE_STATUS:
      return cars.map((el) => {
        if (el.id === action.payload) {
          return {
            ...el,
            status: !el.status,
          };
        }
        return el;
      });

    default:
      return cars;
  }
}

export default carsReducer;
