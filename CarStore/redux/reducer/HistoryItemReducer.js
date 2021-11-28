import {NAME_ACTIONS} from '../action/history-item/ActionName';

const initialState = {
  historyItem: {},
};

const HistoryItemReducer = (state = initialState, action) => {
  switch (action.type) {
    case NAME_ACTIONS.GET_HISTORY_ITEM.GET_HISTORY_ITEM_SUCCESS: {
      console.log('HELO HISTORY ', action.data);
      return {
        ...state,
        historyItem: action.data.data.data,
      };
    }
    case NAME_ACTIONS.GET_HISTORY_ITEM.GET_HISTORY_ITEM_FAIL: {
      return {
        ...state,
        historItem: {},
      };
    }
    default:
      break;
  }
  return state;
};

export default HistoryItemReducer;
