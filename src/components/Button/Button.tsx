import React, { PropsWithChildren } from "react";
import { Keyboard, StyleProp, TouchableOpacity, ViewStyle } from "react-native";
import styles from "./styles";

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
  return (
    <TouchableOpacity
      onPress={() => {
        Keyboard.dismiss();
        onPress();
      }}
      disabled={!enabled}
      activeOpacity={0.8}
      style={[
        styles.button,
        { backgroundColor: enabled ? "#333" : "#ccc" },
        style,
      ]}
    >
      {children}
    </TouchableOpacity>
  );
};

export default Button;
