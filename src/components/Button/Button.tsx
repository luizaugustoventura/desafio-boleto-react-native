import React, { PropsWithChildren } from "react";
import { Text, TouchableOpacity } from "react-native";
import styles from "./styles";

type ButtonProps = {
  onPress: () => void;
};

const Button: React.FC<PropsWithChildren<ButtonProps>> = ({
  onPress,
  children,
}) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      activeOpacity={0.8}
      style={styles.button}
    >
      {children}
    </TouchableOpacity>
  );
};

export default Button;

