import { useState } from "react";
import { Text, View, Alert, StyleSheet } from "react-native";
import { BarCodeScanner, Constants } from "expo-barcode-scanner";
import { Feather as Icon } from "@expo/vector-icons";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import styles from "./styles";
import {
  extractExpirationDateFromCode,
  extractValueFromCode,
  formatDate,
  formatTotalValue,
  isPaymentCodeValid,
} from "./utils";

const Home = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [hasScanned, setHasScanned] = useState(false);
  const [code, setCode] = useState("");
  const [isCodeProcessed, setIsCodeProcessed] = useState(false);
  const [totalValue, setTotalValue] = useState(0);
  const [validUntil, setValidUntil] = useState<Date>();

  const handleScanBarcode = async () => {
    const { status } = await BarCodeScanner.requestPermissionsAsync();

    if (status === "granted") {
      setHasScanned(false);
      setIsScanning(true);
    } else {
      // throw
      Alert.alert(
        "Erro ao ler código de barras",
        "Precisamos da sua permissão para acessar a câmera"
      );
    }
  };

  const handleProcessBarcode = () => {
    if (!isPaymentCodeValid(code)) {
      Alert.alert(
        "Código de barras inválido",
        "Por favor, verifique o código de barras digitado"
      );
      return;
    }

    const value = extractValueFromCode(code);

    const validUntil = extractExpirationDateFromCode(code);

    setIsCodeProcessed(true);
    setTotalValue(value);
    setValidUntil(validUntil);
  };

  const handlePayment = () => {
    if (validUntil) {
      const maxValidDate = validUntil;
      maxValidDate.setHours(23, 59, 59, 999);

      if (new Date() < maxValidDate) {
        Alert.alert("Pagamento aceito", "Seu pagamento foi aceito com sucesso");
      } else {
        Alert.alert("Pagamento negado", "O boleto é inválido ou expirou");
      }
    }
  };

  const onBarcodeScanned = ({ type, data }: { type: string; data: string }) => {
    console.log(`Scanned the following ${type} code: ${data}`);
    setHasScanned(true);
    setIsScanning(false);
  };

  return (
    <View style={styles.container}>
      {isScanning && (
        <View style={styles.cameraViewContainer}>
          <View
            style={{
              backgroundColor: "black",
              position: "absolute",
              zIndex: 2,
              left: 0,
              width: "25%",
              height: "100%",
            }}
          />
          <BarCodeScanner
            barCodeTypes={[Constants.BarCodeType.itf14]}
            onBarCodeScanned={hasScanned ? undefined : onBarcodeScanned}
            style={StyleSheet.absoluteFillObject}
          />
          <View
            style={{
              backgroundColor: "black",
              position: "absolute",
              zIndex: 2,
              right: 0,
              width: "25%",
              height: "100%",
            }}
          />
        </View>
      )}

      <View style={styles.formContainer}>
        <View style={styles.codeContainer}>
          <Input
            placeholder="Código de barras..."
            value={code}
            onChangeText={(value) => {
              isCodeProcessed && setIsCodeProcessed(false);
              setCode(value);
            }}
            style={styles.codeInput}
          />

          <Button onPress={handleScanBarcode} style={styles.cameraButton}>
            <Icon name="camera" size={20} color={"white"} />
          </Button>
        </View>

        <Button onPress={handleProcessBarcode} style={styles.button}>
          <Text style={styles.buttonText}>AVANÇAR</Text>

          <Icon name="chevron-right" size={20} color={"white"} />
        </Button>

        <View style={styles.paymentDetailsContainer}>
          <View>
            <View style={styles.detailContainer}>
              <Text>Valor a pagar:</Text>
              <Input
                value={formatTotalValue(totalValue) || ""}
                editable={false}
                style={styles.detailInput}
              />
            </View>

            <View style={styles.detailContainer}>
              <Text>Data de vencimento:</Text>
              <Input
                value={formatDate(validUntil) || ""}
                editable={false}
                style={styles.detailInput}
              />
            </View>
          </View>

          <Button
            onPress={handlePayment}
            enabled={isPaymentCodeValid(code) && isCodeProcessed}
            style={styles.button}
          >
            <Text style={styles.buttonText}>{"PAGAR "}</Text>

            <Icon name="dollar-sign" size={16} color={"white"} />
          </Button>
        </View>
      </View>
    </View>
  );
};

export default Home;

