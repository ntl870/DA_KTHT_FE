import React, { FC, useState } from "react";
import { TouchableOpacity, View, Text } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import { useNavigation } from "@react-navigation/native";
import { RootStackParamList } from "../../screens/RootStackPrams";
import { StackNavigationProp } from "@react-navigation/stack";
import styles from "./styles";

type screensProps = StackNavigationProp<RootStackParamList>;

const NavigationBar: FC = () => {
  const navigation = useNavigation<screensProps>();
  const [activeTab, setActiveTab] = useState<number>(0);

  const selectTab = (id: number, screen: keyof RootStackParamList) => {
    setActiveTab(id);
    navigation.navigate(screen);
  };

  return (
    <View style={styles.navigationBarContainer}>
      <TouchableOpacity
        onPress={() => selectTab(0, "Home")}
        style={[styles.navigationBarTab, activeTab === 0 && styles.activeTab]}
      >
        <View style={styles.tabIcon}>
          <Icon name="md-people-outline" size={30} color="#4267B2" />
          <Text>Groups</Text>
        </View>
      </TouchableOpacity>

      <TouchableOpacity
        onPress={() => selectTab(1, "Login")}
        style={[styles.navigationBarTab, activeTab === 1 && styles.activeTab]}
      >
        <View style={styles.tabIcon}>
          <Icon name="md-menu-outline" size={30} color="#4267B2" />
          <Text>Menu</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default NavigationBar;
