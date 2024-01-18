import React from "react";
import { StyleProp, TextInput, TextStyle } from "react-native";
import { styled } from "nativewind";

type InputProps = {
  placeholder?: string;
  value: string;
  onChangeText?: (value: string) => void;
  editable?: boolean;
  style?: StyleProp<TextStyle>;
  testID?: string;
};

const Input: React.FC<InputProps> = ({
  placeholder,
  value,
  onChangeText,
  editable = true,
  style,
  testID,
}) => {
  return (
    <TextInput
      placeholder={placeholder}
      value={value}
      onChangeText={onChangeText}
      editable={editable}
      className="h-14 px-3 text-base border border-black rounded-xl"
      style={style}
      testID={testID}
    />
  );
};

export default styled(Input, {
  props: {
    style: true,
  },
});
