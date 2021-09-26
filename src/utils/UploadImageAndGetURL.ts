import storage from "@react-native-firebase/storage";

const uploadPictureAndGetURL = async (
  imageURI: string,
  refName: string,
  userID: string
): Promise<string> => {
  const reference = storage().ref(`Users/${userID}/${refName}`);
  await reference.putFile(imageURI);
  const downloadURL: string = await reference.getDownloadURL();
  return downloadURL;
};
export default uploadPictureAndGetURL;
