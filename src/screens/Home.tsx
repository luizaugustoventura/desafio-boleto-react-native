import { useState } from "react";
import {
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Feather as Icon } from "@expo/vector-icons";

const statusBarHeight = StatusBar.currentHeight || 0;

const Home = () => {
  const [barCode, setBarCode] = useState("");
  const [totalValue, setTotalValue] = useState(0);
  const [validUntil, setValidUntil] = useState<Date>();

  const handleProcessBarcode = () => {
    const valueStr = barCode.slice(37, 47);
    const value = Number(valueStr) / 100;

    const dateDelta = barCode.slice(33, 37);
    const baseDate = new Date("1997-10-07");
    const validUntil = new Date(
      baseDate.getTime() + parseInt(dateDelta) * 24 * 60 * 60 * 1000
    );

    setTotalValue(value);
    setValidUntil(validUntil);
  };

  const formatTotalValue = (value: number) => {
    const formattedValue = value.toLocaleString("pt-BR", {
      style: "currency",
      currency: "BRL",
    });

    return formattedValue;
  };

  const formatDate = (date?: Date) => {
    if (!date) {
      return "";
    }

    const splitIso = date.toISOString().split("T")[0];
    const dateIso = splitIso.split("-");
    const formattedDate = `${dateIso[2]}/${dateIso[1]}/${dateIso[0]}`;

    return formattedDate;
  };

  const handlePayment = () => {
    if (validUntil) {
      const maxValidDate = validUntil;
      maxValidDate.setHours(23, 59, 59, 999);

      if (new Date() < maxValidDate) {
        console.log("Pagamento aceito");
      } else {
        console.log("Pagamento negado");
      }
    }
  };

  return (
    <View style={styles.container}>
      <View>
        <TextInput
          placeholder="Código de barras..."
          onChangeText={setBarCode}
          style={[styles.input, styles.valueInput]}
        />
      </View>

      <TouchableOpacity onPress={handleProcessBarcode} style={styles.button}>
        <Text style={styles.buttonText}>AVANÇAR</Text>

        <Icon name="chevron-right" size={20} color={"white"} />
      </TouchableOpacity>

      <View style={styles.paymentDetailsContainer}>
        <View>
          <View style={styles.detailContainer}>
            <Text>Valor a pagar:</Text>
            <TextInput
              value={formatTotalValue(totalValue) || ""}
              editable={false}
              style={[styles.input, styles.detailInput]}
            />
          </View>

          <View style={styles.detailContainer}>
            <Text>Data de vencimento:</Text>
            <TextInput
              value={formatDate(validUntil) || ""}
              editable={false}
              style={[styles.input, styles.detailInput]}
            />
          </View>
        </View>

        <TouchableOpacity onPress={handlePayment} style={styles.button}>
          <Text style={styles.buttonText}>{"PAGAR "}</Text>

          <Icon name="dollar-sign" size={16} color={"white"} />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginTop: statusBarHeight,
    padding: 8,
    flex: 1,
    backgroundColor: "#ffffffae",
    alignItems: "center",
    // justifyContent: "center",
  },

  input: {
    height: 50,
    borderWidth: 1,
    borderColor: "black",
    borderRadius: 10,
    padding: 10,
  },

  valueInput: {
    marginTop: 16,
    width: 300,
  },

  button: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 24,
    height: 50,
    width: 300,
    backgroundColor: "#333",
    borderRadius: 10,
    padding: 10,
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

export default Home;

