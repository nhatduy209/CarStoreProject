export const ACTION_NAME = {
  ADD_COLOR: 'ADD_COLOR',
  SET_DEFAULT_LIST_COLOR: 'SET_DEFAULT_LIST_COLOR',
};

export const addColor = color => {
  return {
    type: ACTION_NAME.ADD_COLOR,
    data: color,
  };
};

export const setDefaultListColor = (listColor = []) => {
  return {
    type: ACTION_NAME.SET_DEFAULT_LIST_COLOR,
    data: listColor,
  };
};
