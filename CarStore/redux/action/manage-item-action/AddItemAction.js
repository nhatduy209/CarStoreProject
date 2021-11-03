import ManageItemBusiness from '../../../bussiness/ManageItemBusiness';
import {STATUS} from '../../../config/Status';
import {ACTION_NAME} from './ActionName';
import {uploadImageToStorage} from '../../../common/pushImage';

export const addItem = data => async dispatch => {
  var manageItem = new ManageItemBusiness();
  const newList = await Promise.all(
    data.color.map(async element => {
      let el = {};
      await uploadImageToStorage(element.url, element.img)
        .then(res => {
          console.log(res);
          el = {
            url: res,
            color: element.color,
            numberInStore: element.numberInStore,
          };
        })
        .catch(() => {
          return;
        });
      return el;
    }),
  );
  data.color = newList;
  var res = await manageItem.addItemBusiness(data);

  console.log('res', res);
  if (res.status === STATUS.SUCCESS) {
    dispatch({
      type: ACTION_NAME.ADD_ITEM_ACTION.ADD_ITEM_ACTION_SUCCESS,
      data: res,
    });
  } else {
    dispatch({
      type: ACTION_NAME.ADD_ITEM_ACTION.ADD_ITEM_ACTION_FAIL,
      data: res,
    });
  }
};
