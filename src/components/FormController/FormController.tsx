/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { FC } from "react";
import { Controller } from "react-hook-form";
import { TextInput } from "react-native-paper";
import {} from "react-native";
// import {} from "react-native-vector-icons";

export interface IFormController {
  name: string;
  control: any;
  error: boolean;
  label: string;
  mode?: "flat" | "outlined" | undefined;
  outlineColor?: string;
  leftIcon?: any;
  rightIcon?: any;
  secureTextEntry?: boolean;
  style: any;
  onPress?: any;
}

const FormController: FC<IFormController> = ({
  name,
  control,
  error,
  label,
  mode,
  outlineColor,
  leftIcon,
  rightIcon,
  secureTextEntry,
  style,
  onPress,
}) => {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field: { onChange, value } }) => (
        <TextInput
          secureTextEntry={secureTextEntry}
          error={error}
          label={label}
          mode={mode}
          outlineColor={outlineColor}
          left={<TextInput.Icon name={leftIcon} />}
          right={
            rightIcon && <TextInput.Icon name={rightIcon} onPress={onPress} />
          }
          style={style}
          onChangeText={(text) => onChange(text)}
          value={value}
        />
      )}
    />
  );
};

export default FormController;
