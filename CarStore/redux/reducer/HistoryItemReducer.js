import {STATUS, unauthoriedMessage} from '../../config/Status';
import {NAME_ACTIONS} from '../action/history-item/ActionName';

const initialState = {
  historyItem: {},
  status: STATUS.NONE,
};

const HistoryItemReducer = (state = initialState, action) => {
  switch (action.type) {
    case NAME_ACTIONS.GET_HISTORY_ITEM.GET_HISTORY_ITEM_SUCCESS: {
      if (action.data.data.error === unauthoriedMessage) {
        return {
          ...state,
          historyItem: {},
          status: STATUS.UNAUTHORIED,
        };
      } else {
        return {
          ...state,
          historyItem: action.data.data.data,
          status: STATUS.SUCCESS,
        };
      }
    }
    case NAME_ACTIONS.GET_HISTORY_ITEM.GET_HISTORY_ITEM_FAIL: {
      return {
        ...state,
        historItem: {},
        status: STATUS.FAIL,
      };
    }
    default:
      break;
  }
  return state;
};

export default HistoryItemReducer;
