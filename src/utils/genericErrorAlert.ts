import { Alert } from "react-native";

const genericErrorAlert = () => {
  Alert.alert(
    "Erro ao ler código de barras",
    "Ocorreu um erro inesperado ao ler o código de barras"
  );
};

export default genericErrorAlert;
