import React from "react";
import { StyleProp, TextInput, TextStyle } from "react-native";
import styles from "./styles";

type InputProps = {
  placeholder?: string;
  value: string;
  onChangeText?: (value: string) => void;
  editable?: boolean;
  style?: StyleProp<TextStyle>;
};

const Input: React.FC<InputProps> = ({
  placeholder,
  value,
  onChangeText,
  editable = true,
  style,
}) => {
  return (
    <TextInput
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
      editable={editable}
      style={[styles.input, style]}
    />
  );
};

export default Input;

