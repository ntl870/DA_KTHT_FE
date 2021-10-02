import React, { FC, useRef, useState } from "react";
import {
  SafeAreaView,
  View,
  TouchableOpacity,
  PermissionsAndroid,
  Permission,
} from "react-native";
import storage from "@react-native-firebase/storage";
import { Button } from "react-native-paper";
import { RNCamera } from "react-native-camera";
import styles from "./styles";

interface IPictureData {
  base64: string;
  width: number;
  height: number;
  uri: string;
  pictureOrientation: number;
  deviceOrientation: number;
}

type CameraSide = "front" | "back";

const Camera: FC = () => {
  const [cameraSide, setCameraSide] = useState<CameraSide>("front");
  const [imagesURI, setImagesURI] = useState<string>("");
  const [transferred, setTransferred] = useState<number>(0);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const cameraRef = useRef<any>(null);

  const hasAndroidPermission = async (): Promise<boolean> => {
    const permission: Permission =
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;
    const hasPermission: boolean = await PermissionsAndroid.check(permission);
    if (hasPermission) {
      return true;
    }

    const status = await PermissionsAndroid.request(permission);
    return status === "granted";
  };

  const uploadPicture = async () => {
    if (cameraRef) {
      const options = { quality: 1, base64: true };
      const data: IPictureData = await cameraRef.current.takePictureAsync(
        options
      );
      const filename: string = data.uri.substring(
        data.uri.lastIndexOf("/") + 1
      );
      const reference = storage().ref(filename);
      // const pathToFile = `${utils.FilePath.PICTURES_DIRECTORY}/image.jpg`;
      await reference.putFile(data.uri);
      const downloadURL: string = await reference.getDownloadURL();
    }
  };

  const switchCameraSide = (): void => {
    setCameraSide(cameraSide === "front" ? "back" : "front");
  };
  return (
    <SafeAreaView style={styles.flexOne}>
      <RNCamera
        ref={cameraRef}
        captureAudio={false}
        style={styles.flexOne}
        type={RNCamera.Constants.Type[cameraSide]}
        androidCameraPermissionOptions={{
          title: "Permission to use camera",
          message: "We need your permission to use your camera",
          buttonPositive: "Allow",
          buttonNegative: "Disallow",
        }}
      />
      {/* <View>
        <TouchableOpacity activeOpacity={0.5} onPress={takePicture}>
          <Button icon="camera">Switch</Button>
        </TouchableOpacity>
      </View> */}
      <View>
        <TouchableOpacity activeOpacity={0.5} onPress={uploadPicture}>
          <Button icon="camera">Press me</Button>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Camera;
