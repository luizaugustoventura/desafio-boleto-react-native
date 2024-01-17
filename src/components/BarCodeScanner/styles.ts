import { StyleSheet } from "react-native";

const styles = StyleSheet.create({
  cameraViewContainer: {
    position: "absolute",
    height: "100%",
    width: "100%",
    zIndex: 1,
    backgroundColor: "black",
    flexDirection: "row",
  },

  surroundingEdge: {
    backgroundColor: "black",
    position: "absolute",
    zIndex: 2,
    width: "25%",
    height: "100%",
  },

  surroundingEdgeLeft: {
    left: 0,
  },

  surroundingEdgeRight: {
    right: 0,
  },
});

export default styles;
