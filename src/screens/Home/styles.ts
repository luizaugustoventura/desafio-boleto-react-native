import { StatusBar, StyleSheet } from "react-native";

const statusBarHeight = StatusBar.currentHeight || 0;
const maxWidth = 320;

const styles = StyleSheet.create({
  container: {
    marginTop: statusBarHeight,
    padding: 8,
    flex: 1,
    backgroundColor: "#ffffffae",
    alignItems: "center",
  },

  codeContainer: {
    width: "100%",
    maxWidth: maxWidth,
    marginTop: 24,
    marginBottom: 24,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  codeInput: {
    width: 260,
  },

  cameraButton: {
    width: 50,
    height: 50,
    backgroundColor: "#333",
    borderRadius: 25,
  },

  button: {
    width: "100%",
    maxWidth: maxWidth,
  },

  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
    textAlign: "center",
  },

  paymentDetailsContainer: {
    width: "100%",
    maxWidth: maxWidth,
    flex: 1,
    marginTop: 24,
    marginBottom: 16,
    justifyContent: "space-between",
  },

  detailContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    backgroundColor: "#EEE",
    borderRadius: 10,
    marginBottom: 10,
  },

  detailInput: {
    color: "black",
  },
});

export default styles;
