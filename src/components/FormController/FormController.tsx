/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { FC } from "react";
import { Controller } from "react-hook-form";
import { TextInput } from "react-native-paper";

export interface IFormController {
  name: string;
  control: any;
  defaultValue?: string;
  error?: boolean;
  label: string;
  mode?: "flat" | "outlined";
  outlineColor?: string;
  leftIcon?: any;
  rightIcon?: any;
  secureTextEntry?: boolean;
  style: any;
  onPress?: any;
  type?: string;
}

const FormController: FC<IFormController> = ({
  name,
  control,
  defaultValue,
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
      defaultValue={defaultValue}
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
          defaultValue={defaultValue}
        />
      )}
    />
  );
};

export default FormController;
