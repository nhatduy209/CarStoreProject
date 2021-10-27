import {uploadImageToStorage} from '../../../common/pushImage';

export const ACTION_NAME = {
  ADD_COLOR: 'ADD_COLOR',
  SET_STATE_COLOR: 'SET_STATE_COLOR',
  SET_DEFAULT_LIST_COLOR: 'SET_DEFAULT_LIST_COLOR',
};

export const addColor = data => async dispatch => {
  const newColor = {
    color: data.newColor.color,
    description: data.newColor.description,
    numberInStore: 1,
  };
  const url = await uploadImageToStorage(data.newColor.url, data.newColor.img);
  if (url) {
    newColor.url = url;
    data.listColor.push(newColor);
    console.log('list', data.listColor);
    dispatch({
      type: ACTION_NAME.ADD_COLOR,
      data: data.listColor,
    });
  }
};

export const setStateColor = () => async dispatch => {
  dispatch({
    type: ACTION_NAME.SET_STATE_COLOR,
  });
};

export const setDefaultListColor = (listColor = []) => {
  return {
    type: ACTION_NAME.SET_DEFAULT_LIST_COLOR,
    data: listColor,
  };
};
