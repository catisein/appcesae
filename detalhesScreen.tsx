import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

import Header from "../../components/Header/header";
import type { RootStackParamList } from "../../navigation/types";

type NavigationProps = NativeStackScreenProps<
  RootStackParamList,
  "Detalhes"
>;

export default function DetalhesScreen({ navigation, route }: NavigationProps) {
  const { tarefa } = route.params;

  return (
    <View style={styles.mainContainer}>
      <Header titulo="Detalhes da Tarefa" />

      {/* Bloco de Informações / Categoria */}
      <View style={styles.cardInfo}>
        <Text style={styles.textInfo}>Entrega: 24 out, 23:59</Text>
        <Text style={styles.textInfo}>Categoria: FC Porto</Text>
      </View>

      {/* */}
      <View style={styles.cardDescricao}>
        <Text style={styles.tituloSecao}>Descrição</Text>
        <Text style={styles.textDescricao}>{tarefa.titulo}</Text>
      </View>

      {/*  */}
      <View style={styles.floatingContainer}>
        <TouchableOpacity style={styles.actionButton}>
          <Text style={styles.actionButtonText}>Eliminar Tarefa</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#0050A4",
  },
  cardInfo: {
    padding: 20,
    marginHorizontal: 20,
    backgroundColor: "#fff",
    marginTop: 15,
    borderRadius: 15,
  },
  textInfo: {
    fontSize: 16,
    marginBottom: 3,
    color: "#333",
  },
  cardDescricao: {
    padding: 20,
    marginHorizontal: 20,
    backgroundColor: "#fff",
    marginTop: 15,
    borderRadius: 15,
  },
  tituloSecao: {
    fontSize: 16,
    marginBottom: 5,
    fontWeight: "bold",
    color: "#000",
  },
  textDescricao: {
    fontSize: 16,
    marginBottom: 5,
    color: "#333",
  },
  floatingContainer: {
    position: "absolute",
    bottom: 60,
    left: 0,
    right: 0,
    display: "flex",
    marginHorizontal: 20,
    flexDirection: "row",
  },
  actionButton: {
    backgroundColor: "#fff",
    padding: 15,
    borderRadius: 15,
    alignItems: "center",
    flex: 1,
  },
  actionButtonText: {
    color: "#D32F2F",
    fontWeight: "bold",
    fontSize: 16,
  },
});
