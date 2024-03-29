import { useState } from "react";
import { Text, View, Alert } from "react-native";
import { Feather as Icon } from "@expo/vector-icons";
import BarCodeScanner, {
  hasCameraPermission,
  BarCodeScannerCallbackResult,
} from "../../components/BarCodeScanner/BarCodeScanner";
import Button from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import {
  extractExpirationDateFromCode,
  extractValueFromCode,
  formatDate,
  formatTotalValue,
  isPaymentCodeValid,
} from "./utils/utils";
import styles from "./styles";
import { InvalidPaymentCodeError } from "../../errors/InvalidPaymentCode.error";
import { CameraPermissionError } from "../../errors/CameraPermissionError.error";
import genericErrorAlert from "../../utils/genericErrorAlert";

const Home = () => {
  const [isScanning, setIsScanning] = useState(false);
  const [hasScanned, setHasScanned] = useState(false);
  const [code, setCode] = useState("");
  const [isCodeProcessed, setIsCodeProcessed] = useState(false);
  const [totalValue, setTotalValue] = useState(0);
  const [validUntil, setValidUntil] = useState<Date>();

  const handleScanBarCode = async () => {
    try {
      if (await hasCameraPermission()) {
        setHasScanned(false);
        setIsScanning(true);
      } else {
        throw new CameraPermissionError("Unauthorized attempt to use camera");
      }
    } catch (err) {
      console.error(err);
      if (err instanceof CameraPermissionError) {
        Alert.alert(
          "Erro ao ler código de barras",
          "Precisamos da sua permissão para acessar a câmera e ler o código de barras"
        );
        return;
      }

      genericErrorAlert();
    }
  };

  const onBarCodeScanned = (scannedCode: BarCodeScannerCallbackResult) => {
    setCode(scannedCode.data);
    setHasScanned(true);
    setIsScanning(false);
  };

  const handleProcessBarCode = () => {
    try {
      const value = extractValueFromCode(code);
      const validUntil = extractExpirationDateFromCode(code);

      setIsCodeProcessed(true);
      setTotalValue(value);
      setValidUntil(validUntil);
    } catch (err) {
      console.error(err);
      if (err instanceof InvalidPaymentCodeError) {
        Alert.alert(
          "Código de barras inválido",
          "O código de barras/linha digitável deve conter 44, 46 ou 47 dígitos"
        );
        return;
      }

      genericErrorAlert();
    }
  };

  const handlePayment = () => {
    if (validUntil) {
      const maxValidDate = validUntil;
      const maxValidDateDelta = new Date(
        maxValidDate.getFullYear(),
        maxValidDate.getMonth(),
        maxValidDate.getDate() + 1
      );
      maxValidDateDelta.setUTCHours(0, 0, 0, 0);

      const now = new Date();
      const nowDelta = new Date(
        `${now.getFullYear()}-${
          now.getMonth() + 1
        }-${now.getDate()}T00:00:00.000Z`
      );

      if (nowDelta <= maxValidDateDelta) {
        Alert.alert("Pagamento aceito", "Seu pagamento foi aceito com sucesso");
      } else {
        Alert.alert("Pagamento negado", "O boleto é inválido ou expirou");
      }
    }
  };

  return (
    <View className="flex-1 z-0">
      <BarCodeScanner
        isVisible={isScanning}
        onBarCodeScanned={hasScanned ? undefined : onBarCodeScanned}
      />

      <View
        className="flex-1 w-full max-w-sm p-2 self-center items-center"
        style={styles.formContainer}
      >
        <View className="w-full mt-6 mb-6 flex-row justify-between">
          <Input
            placeholder="Código de barras..."
            value={code}
            onChangeText={(value) => {
              isCodeProcessed && setIsCodeProcessed(false);
              setCode(value);
            }}
            className="flex-1"
            testID="code-input"
          />

          <View className="w-2" />

          <Button
            onPress={handleScanBarCode}
            className="h-14 w-14 rounded-full"
          >
            <Icon name="camera" size={20} color={"white"} />
          </Button>
        </View>

        <Button
          onPress={handleProcessBarCode}
          className="w-full"
          testID="process-button"
        >
          <Text className="text-base font-medium text-center text-white">
            AVANÇAR
          </Text>

          <Icon name="chevron-right" size={20} color={"white"} />
        </Button>

        <View className="flex-1 w-full mt-6 mb-4 justify-between">
          <View>
            <View className="mb-3 px-3 py-2 flex-row items-center justify-between bg-gray-200 rounded-xl">
              <Text className="text-sm">Valor a pagar:</Text>
              <Input
                value={formatTotalValue(totalValue) || ""}
                editable={false}
                className="text-black"
              />
            </View>

            <View className="mb-3 px-3 py-2 flex-row items-center justify-between bg-gray-200 rounded-xl">
              <Text className="text-sm">Data de vencimento:</Text>
              <Input
                value={formatDate(validUntil) || ""}
                editable={false}
                className="text-black"
              />
            </View>
          </View>

          <Button
            onPress={handlePayment}
            enabled={isPaymentCodeValid(code) && isCodeProcessed}
            className="w-full"
            testID="payment-button"
          >
            <Text className="text-base font-medium text-center text-white">
              {"PAGAR "}
            </Text>

            <Icon name="dollar-sign" size={16} color={"white"} />
          </Button>
        </View>
      </View>
    </View>
  );
};

export default Home;
