import {STATUS} from '../../config/Status';
import {ACTION_NAME} from '../action/comment/ActionName';

const CATEGORY_STATE = {
  comment: {},
  canAddComment: STATUS.NONE,
};

const CommentReducer = (state = CATEGORY_STATE, action) => {
  switch (action.type) {
    case ACTION_NAME.GET_LIST_COMMENT.GET_LIST_COMMENT_SUCCESS:
      return {
        ...state,
        comment: action.data,
      };
    case ACTION_NAME.GET_LIST_COMMENT.GET_LIST_COMMENT_FAIL:
      return {
        ...state,
        comment: action.data,
      };
    case ACTION_NAME.ADD_COMMENT.ADD_COMMENT_SUCCESS:
      return {
        ...state,
        canAddComment: STATUS.SUCCESS,
      };

    case ACTION_NAME.ADD_COMMENT.ADD_COMMENT_FAIL:
      return {
        ...state,
        canAddComment: STATUS.FAIL,
      };

    case ACTION_NAME.RELOAD_ADD_COMMENT:
      return {
        ...state,
        canAddComment: STATUS.NONE,
      };
    default:
      return state;
  }
};

export default CommentReducer;
