import AsyncStorage from '@react-native-async-storage/async-storage';
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
    console.log('ITEM --', item);
    return {
      index,
      isCorrect: item[1].length > 0,
    };
  });
};
