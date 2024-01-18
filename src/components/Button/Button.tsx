import React, { PropsWithChildren } from "react";
import { Keyboard, StyleProp, TouchableOpacity, ViewStyle } from "react-native";
import { styled } from "nativewind";

type ButtonProps = {
  onPress: () => void;
  enabled?: boolean;
  style?: StyleProp<ViewStyle>;
  testID?: string;
};

const Button: React.FC<PropsWithChildren<ButtonProps>> = ({
  onPress,
  enabled = true,
  children,
  style,
  testID,
}) => {
  // console.log(customClassName);
  return (
    <TouchableOpacity
      onPress={() => {
        Keyboard.dismiss();
        onPress();
      }}
      disabled={!enabled}
      activeOpacity={0.8}
      className={`h-14 p-2 flex-row items-center justify-center rounded-lg overflow-hidden ${
        enabled ? "bg-zinc-800" : "bg-zinc-500"
      }`}
      style={style}
      testID={testID}
    >
      {children}
    </TouchableOpacity>
  );
};

export default styled(Button, {
  props: {
    style: true,
  },
});
