import storage from '@react-native-firebase/storage';
export const uploadImageToStorage = async (path, imageName) => {
  const storageRef = storage().ref();
  const currentRef = storageRef.child(`Car/${imageName}`);
  await currentRef.putFile(path);
  return currentRef.getDownloadURL();
};
