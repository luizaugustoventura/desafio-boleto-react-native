import { useState } from "react";
import { Text, View, Alert } from "react-native";
import { Feather as Icon } from "@expo/vector-icons";
import BarCodeScanner, {
  hasCameraPermission,
} from "../../components/BarCodeScanner/BarCodeScanner";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import {
  extractExpirationDateFromCode,
  extractValueFromCode,
  formatDate,
  formatTotalValue,
  isPaymentCodeValid,
} from "./utils";
import styles from "./styles";

const Home = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [hasScanned, setHasScanned] = useState(false);
  const [code, setCode] = useState("");
  const [isCodeProcessed, setIsCodeProcessed] = useState(false);
  const [totalValue, setTotalValue] = useState(0);
  const [validUntil, setValidUntil] = useState<Date>();

  const handleScanBarCode = async () => {
    if (await hasCameraPermission()) {
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

  const onBarCodeScanned = ({ type, data }: { type: string; data: string }) => {
    console.log(`Scanned the following ${type} code: ${data}`);
    setHasScanned(true);
    setIsScanning(false);
  };

  const handleProcessBarCode = () => {
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

  return (
    <View style={styles.container}>
      <BarCodeScanner
        isVisible={isScanning}
        onBarCodeScanned={hasScanned ? undefined : onBarCodeScanned}
      />

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

          <Button onPress={handleScanBarCode} style={styles.cameraButton}>
            <Icon name="camera" size={20} color={"white"} />
          </Button>
        </View>

        <Button onPress={handleProcessBarCode} style={styles.button}>
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
