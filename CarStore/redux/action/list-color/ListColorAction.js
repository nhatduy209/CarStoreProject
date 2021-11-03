export const ACTION_NAME = {
  ADD_COLOR: 'ADD_COLOR',
  SET_STATE_COLOR: 'SET_STATE_COLOR',
  SET_COLOR: 'SET_COLOR',
  SET_DEFAULT_LIST_COLOR: 'SET_DEFAULT_LIST_COLOR',
};

export const addColor = data => async dispatch => {
  dispatch({
    type: ACTION_NAME.ADD_COLOR,
    data: data.listColor,
  });
};

export const setStateColor = () => async dispatch => {
  dispatch({
    type: ACTION_NAME.SET_STATE_COLOR,
  });
};

export const setColor = data => async dispatch => {
  console.log(data);
  dispatch({
    type: ACTION_NAME.SET_COLOR,
    data: data,
  });
};

export const setDefaultListColor = (listColor = []) => {
  return {
    type: ACTION_NAME.SET_DEFAULT_LIST_COLOR,
    data: listColor,
  };
};
