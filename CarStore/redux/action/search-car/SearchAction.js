import SearchCarBusiness from '../../../bussiness/SearchCarBusiness'
import { STATUS } from '../../../config/Status';
import { ACTION_NAME } from './ActionName';

export const searchCar = ( name ) => async dispatch => {
  var searchBusiness = new SearchCarBusiness();
  var result = await searchBusiness.searchCar( {name} )

  console.log(' RESULT -----' , result.data);
  if(result.status === STATUS.SUCCESS){
    dispatch({
      type : ACTION_NAME.SEARCH_ACTION.SEARCH_ACTION_SUCCESS,
      data : result.data.data
    } )
  }else {
    dispatch({
      type : ACTION_NAME.SEARCH_ACTION.SEARCH_ACTION_FAIL,
      data : result.data.data
    } )
  }
}