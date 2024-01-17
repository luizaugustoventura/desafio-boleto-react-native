import { StatusBar, StyleSheet } from "react-native";

const statusBarHeight = StatusBar.currentHeight || 0;

const styles = StyleSheet.create({
  container: {
    marginTop: statusBarHeight,
    padding: 8,
    flex: 1,
    backgroundColor: "#ffffffae",
    alignItems: "center",
    // justifyContent: "center",
  },

  valueInput: {
    marginTop: 16,
    width: 300,
  },

  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "500",
    textAlign: "center",
  },

  paymentDetailsContainer: {
    flex: 1,
    marginTop: 24,
    marginBottom: 16,
    justifyContent: "space-between",
  },

  detailContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: 300,
    padding: 10,
    backgroundColor: "#fff",
    borderRadius: 10,
    marginBottom: 10,
  },

  detailInput: {
    color: "black",
  },
});

export default styles;
