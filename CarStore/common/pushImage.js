import storage from '@react-native-firebase/storage';
export const uploadImageToStorage = async (path, imageName, onSuccess) => {
  const storageRef = storage().ref(imageName).putFile(path);
  await storageRef.on(
    'state_changed',
    snapshot => {
      console.log(snapshot.bytesTransferred);
    },
    error => {
      console.log(error);
    },
    () => {
      storageRef.snapshot.ref.getDownloadURL().then(url => onSuccess(url));
    },
  );
};
