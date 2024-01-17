import { useState } from "react";
import { Text, View, Alert } from "react-native";
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
  const [code, setCode] = useState("");
  const [isCodeProcessed, setIsCodeProcessed] = useState(false);
  const [totalValue, setTotalValue] = useState(0);
  const [validUntil, setValidUntil] = useState<Date>();

  const handleProcessBarcode = () => {
    if (!isPaymentCodeValid(code)) {
      Alert.alert(
        "Código de barras inválido",
        "Por favor, verifique o código de barras digitado"
      );
      return;
    }

    // const valueStr = code.slice(37, 47);
    // const value = Number(valueStr) / 100;
    const value = extractValueFromCode(code);

    // const dateDelta = code.slice(33, 37);
    // const baseDate = new Date("1997-10-07");
    // const validUntil = new Date(
    //   baseDate.getTime() + parseInt(dateDelta) * 24 * 60 * 60 * 1000
    // );
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
      <View>
        <Input
          placeholder="Código de barras..."
          value={code}
          onChangeText={(value) => {
            isCodeProcessed && setIsCodeProcessed(false);
            setCode(value);
          }}
          style={styles.valueInput}
        />
      </View>

      <Button onPress={handleProcessBarcode}>
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
        >
          <Text style={styles.buttonText}>{"PAGAR "}</Text>

          <Icon name="dollar-sign" size={16} color={"white"} />
        </Button>
      </View>
    </View>
  );
};

export default Home;
