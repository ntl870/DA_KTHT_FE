import React, { FC, useRef, useState, useContext, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import {
  SafeAreaView,
  View,
  TouchableOpacity,
  PermissionsAndroid,
  Permission,
  Text,
} from "react-native";
import storage from "@react-native-firebase/storage";
import { Button, ProgressBar } from "react-native-paper";
import { RNCamera } from "react-native-camera";
import { selectUserInfo } from "../../store/reducers/UserSlice";
import {
  selectBottomBarStatus,
  enable,
  disable,
} from "../../store/reducers/BottomBarStatusSlice";
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
  const [transferred, setTransferred] = useState<number>(0);
  const { data: userInfo } = useSelector(selectUserInfo);
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useDispatch();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const cameraRef = useRef<any>(null);

  useEffect(() => {
    dispatch(disable());
    return () => {
      dispatch(enable());
    };
  }, [dispatch]);
  
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
      const options = {
        quality: 1,
        base64: true,
        orientation: RNCamera.Constants.Orientation.landscapeLeft,
      };
      try {
        setLoading(true);
        for (let i = 0; i < 30; i++) {
          const data: IPictureData = await cameraRef.current.takePictureAsync(
            options
          );
          const reference = storage().ref(
            `/Users/${userInfo?._id}/Models/${i + 1}.jpg`
          );
          // const pathToFile = `${utils.FilePath.PICTURES_DIRECTORY}/image.jpg`;
          await reference.putFile(data.uri);
          setTransferred((1 / 30) * (i + 1));
        }
        await axios.post("http://10.0.2.2:8000/train", {
          userId: userInfo?._id,
        });
      } catch (e) {
        console.log(e);
      } finally {
        setTransferred(0);
        setLoading(false);
      }
      // const downloadURL: string = await reference.getDownloadURL();
    }
  };

  return (
    <SafeAreaView style={styles.root}>
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
      {loading && <ProgressBar progress={transferred} color="red" />}
      {/* {loading && <Text>Uploading...</Text>} */}
      <View>
        <TouchableOpacity activeOpacity={0.5} onPress={uploadPicture}>
          <Button icon="camera">Press me</Button>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Camera;
