import React from "react";
import { StyleProp, TextInput, TextStyle } from "react-native";
import { styled } from "nativewind";

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
      className="h-12 p-3 border border-black rounded-xl"
      style={style}
    />
  );
};

export default styled(Input, {
  props: {
    style: true,
  },
});

