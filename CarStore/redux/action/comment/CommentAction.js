import CommentBusiness from '../../../bussiness/CommentBusiness';
import {STATUS} from '../../../config/Status';
import {ACTION_NAME} from './ActionName';
export const getListComment = name => async dispatch => {
  console.log('NAME --', name);
  var commentBusiness = new CommentBusiness();
  var res = await commentBusiness.getListCommentBusiness(name);

  if (res.status === STATUS.SUCCESS) {
    dispatch({
      type: ACTION_NAME.GET_LIST_COMMENT.GET_LIST_COMMENT_SUCCESS,
      data: res,
    });
  } else {
    dispatch({
      type: ACTION_NAME.GET_LIST_COMMENT.GET_LIST_COMMENT_FAIL,
      data: res,
    });
  }
};

export const addComment = data => async dispatch => {
  var commentBusiness = new CommentBusiness();
  var res = await commentBusiness.addCommentBusiness(data);

  console.log('RES HEEREE', res);
  if (res.status === STATUS.SUCCESS) {
    dispatch({
      type: ACTION_NAME.ADD_COMMENT.ADD_COMMENT_SUCCESS,
      data: res,
    });
  } else {
    dispatch({
      type: ACTION_NAME.ADD_COMMENT.ADD_COMMENT_FAIL,
      data: res,
    });
  }
};

export const reload = () => dispatch => {
  dispatch({
    type: ACTION_NAME.RELOAD_ADD_COMMENT,
    data: {},
  });
};
