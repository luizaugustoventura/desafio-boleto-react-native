import React, { PropsWithChildren } from "react";
import { Keyboard, StyleProp, TouchableOpacity, ViewStyle } from "react-native";
import { styled } from "nativewind";

type ButtonProps = {
  onPress: () => void;
  enabled?: boolean;
  style?: StyleProp<ViewStyle>;
};

const Button: React.FC<PropsWithChildren<ButtonProps>> = ({
  onPress,
  enabled = true,
  children,
  style,
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
      className={`flex-row items-center justify-center h-12 p-2.5 rounded-lg ${
        enabled ? "bg-zinc-800" : "bg-zinc-500"
      }`}
      style={style}
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

