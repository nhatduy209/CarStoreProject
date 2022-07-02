import storage from '@react-native-firebase/storage';
export const uploadImageToStorage = async (path, imageName) => {
  const storageRef = storage().ref();
  const currentRef = storageRef.child(`Car/${imageName}`);
  await currentRef.putFile(path);
  return currentRef.getDownloadURL();
};

export const sendMessageImage = async (path, imageName) => {
  try {
    const storageRef = storage().ref();
    const currentRef = storageRef.child(`${imageName}`);
    await currentRef.putFile(path);
    return currentRef.getDownloadURL();
  } catch (err) {
    console.log('Lg err ' + err);
  }
};
