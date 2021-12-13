import storage from "@react-native-firebase/storage";

export const uploadPictureAndGetURL = async (
  imageURI: string,
  refName: string,
  userID: string
): Promise<string> => {
  const reference = storage().ref(`Users/${userID}/${refName}`);
  await reference.putFile(imageURI);
  const downloadURL: string = await reference.getDownloadURL();
  return downloadURL;
};

export const uploadGroupPictureAndGetURL = async (
  imageURI: string,
  refName: string,
  groupID: string
): Promise<string> => {
  const reference = storage().ref(`Groups/${groupID}/${refName}`);
  await reference.putFile(imageURI);
  const downloadURL: string = await reference.getDownloadURL();
  return downloadURL;
};
