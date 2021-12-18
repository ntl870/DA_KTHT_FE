import React, { FC, useRef, useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { SafeAreaView, View, TouchableOpacity } from "react-native";
import storage from "@react-native-firebase/storage";
import { Button, ProgressBar } from "react-native-paper";
import { RNCamera } from "react-native-camera";
import { selectUserInfo } from "../../store/reducers/UserSlice";
import { enable, disable } from "../../store/reducers/BottomBarStatusSlice";
import LoadingOverlay from "../Loading/Loading";
import { useNavigation } from "@react-navigation/core";
import { MenuScreenProps } from "../../types/screens";
import { useSnackbarContext } from "../../hooks/useSnackBarContext";
import styles from "./styles";

interface IPictureData {
  base64: string;
  width: number;
  height: number;
  uri: string;
  pictureOrientation: number;
  deviceOrientation: number;
}

const Camera: FC = () => {
  const [transferred, setTransferred] = useState<number>(0);
  const { data: userInfo } = useSelector(selectUserInfo);
  const [loading, setLoading] = useState<boolean>(false);
  const dispatch = useDispatch();
  const { setMessage } = useSnackbarContext();
  const navigation = useNavigation<MenuScreenProps>();
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const cameraRef = useRef<any>(null);

  useEffect(() => {
    dispatch(disable());
    return () => {
      dispatch(enable());
    };
  }, [dispatch]);

  const uploadPicture = async () => {
    if (cameraRef) {
      const options = {
        quality: 1,
        base64: true,
        orientation: RNCamera.Constants.Orientation.landscapeLeft,
      };
      try {
        for (let i = 0; i < 20; i++) {
          const data: IPictureData = await cameraRef.current.takePictureAsync(
            options
          );
          const reference = storage().ref(
            `/Users/${userInfo?._id}/Models/${i + 1}.jpg`
          );
          await reference.putFile(data.uri);
          setTransferred((1 / 20) * (i + 1));
        }
        try {
          setLoading(true);
          await axios.post(
            "https://6a4f-2405-4803-d3e6-7aa0-ffff-ffff-ffff-fff8.ngrok.io/train",
            {
              userId: userInfo?._id,
            }
          );
        } catch (e) {
        } finally {
          setLoading(false);
        }
        setMessage("Model trained successfully");
      } catch (e) {
        setMessage("Model trained failed");
      } finally {
        setTransferred(0);
        navigation.navigate("MenuScreen");
      }
    }
  };
  if (loading) {
    return <LoadingOverlay active={true} />;
  }
  return (
    <SafeAreaView style={styles.root}>
      <RNCamera
        ref={cameraRef}
        captureAudio={false}
        style={styles.flexOne}
        type="front"
        androidCameraPermissionOptions={{
          title: "Permission to use camera",
          message: "We need your permission to use your camera",
          buttonPositive: "Allow",
          buttonNegative: "Disallow",
        }}
      />

      {transferred > 0 && <ProgressBar progress={transferred} color="red" />}
      {transferred === 0 && (
        <View>
          <TouchableOpacity activeOpacity={0.5} onPress={uploadPicture}>
            <Button icon="camera">Start</Button>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};

export default Camera;
