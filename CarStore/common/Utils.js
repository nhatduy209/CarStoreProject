import AsyncStorage from '@react-native-async-storage/async-storage';
import Toast from 'react-native-toast-message';

export const _storeData = async (key, value) => {
  try {
    await AsyncStorage.setItem(key, value);
  } catch (error) {
    // Error saving data
  }
};

export const _retrieveData = async key => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      // We have data!!
      console.log(value);
    }
    return value;
  } catch (error) {
    // Error retrieving data
  }
};

// dataValidate : object
export const handleValidate = dataValidate => {
  const revertArray = Object.entries(dataValidate);
  return revertArray.map((item, index) => {
    console.log('ITEM --', item[1].toString().length);
    return {
      index,
      isCorrect: item[1].toString().length > 0,
    };
  });
};

export const showToastSuccess = (title, message, option) => {
  Toast.show({
    type: 'success',
    text1: title,
    text2: message,
    visibilityTime: 2000,
  });
};

export const showToastFail = (title, message, option) => {
  Toast.show({
    type: 'error',
    text1: title,
    text2: message,
    visibilityTime: 2000,
  });
};
