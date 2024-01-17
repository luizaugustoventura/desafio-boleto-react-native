import React from "react";
import { StyleSheet, View } from "react-native";
import {
  BarCodeScannedCallback,
  BarCodeScannerResult,
  Constants,
  BarCodeScanner as ExpoBarCodeScanner,
} from "expo-barcode-scanner";
import styles from "./styles";

type BarCodeScannerProps = {
  isVisible: boolean;
  onBarCodeScanned: BarCodeScannedCallback | undefined;
};

const BarCodeScanner: React.FC<BarCodeScannerProps> = ({
  isVisible,
  onBarCodeScanned,
}) => {
  if (!isVisible) {
    return null;
  }

  return (
    <View style={styles.cameraViewContainer}>
      <View style={[styles.surroundingEdge, styles.surroundingEdgeLeft]} />

      <ExpoBarCodeScanner
        barCodeTypes={[Constants.BarCodeType.itf14]}
        onBarCodeScanned={onBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />

      <View style={[styles.surroundingEdge, styles.surroundingEdgeRight]} />
    </View>
  );
};

export const hasCameraPermission = async () => {
  const { status } = await ExpoBarCodeScanner.requestPermissionsAsync();

  return status === "granted";
};

export type BarCodeScannerCallbackResult = BarCodeScannerResult;

export default BarCodeScanner;
