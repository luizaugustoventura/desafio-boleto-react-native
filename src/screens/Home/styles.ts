import { StatusBar, StyleSheet } from "react-native";

const statusBarHeight = StatusBar.currentHeight || 0;
const maxWidth = 320;

const styles = StyleSheet.create({
  formContainer: {
    marginTop: statusBarHeight,
  },
});

export default styles;
