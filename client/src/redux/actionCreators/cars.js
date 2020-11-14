import * as TYPES from '../types/cars';

export function addNew(carNumber) {
  return {
    type: TYPES.ADD_NEW,
    payload: {
      carNumber,
    },
  };
}

export function changeStatus(id) {
  return {
    type: TYPES.CHANGE_STATUS,
    payload: id,
  };
}

export function deleteTask(id) {
  return {
    type: TYPES.DELETE,
    payload: id,
  };
}
