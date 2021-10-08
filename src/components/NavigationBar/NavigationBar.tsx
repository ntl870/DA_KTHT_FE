/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { FC } from "react";
import { TouchableOpacity, View, Text } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
import styles from "./styles";

const NavigationBar: FC = ({ state, descriptors, navigation }: any) => {
  return (
    <View style={styles.navigationBarContainer}>
      {state.routes.map((route: any, index: number) => {
        const { options } = descriptors[route.key];

        const isFocused = state.index === index;
        const details = [
          {
            icon: "md-people-outline",
            name: "Groups",
          },
          {
            icon: "md-menu-outline",
            name: "Menu",
          },
        ];
        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key,
          });
        };

        return (
          <TouchableOpacity
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            key={route.name}
            style={[styles.navigationBarTab, isFocused && styles.activeTab]}
          >
            <View style={styles.tabIcon}>
              <Icon
                name={details[index].icon}
                size={30}
                color={isFocused ? "#4267B2" : "#696969"}
              />
              <Text
                style={isFocused ? styles.activeText : styles.nonActiveText}
              >
                {details[index].name}
              </Text>
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default NavigationBar;
