import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StyleSheet, Text, View } from "react-native";

import Header from "../../components/Header/header";
import type { RootStackParamList } from "../../navigation/types";

type NavigationProps = NativeStackScreenProps<
  RootStackParamList,
  "Detalhes"
>;

export default function DetalhesScreen({
  route,
}: NavigationProps) {
  const { tarefa } = route.params;

  return (
    <View style={styles.container}>
      <Header
        titulo="Detalhes da tarefa"
        subtitulo="FC Porto 💙🐉"
      />

      <View style={styles.card}>
        <Text style={styles.etiqueta}>TAREFA</Text>

        <Text style={styles.titulo}>
          {tarefa.titulo}
        </Text>

        <View style={styles.separador} />

        <Text style={styles.etiqueta}>DESCRIÇÃO</Text>

        <Text style={styles.descricao}>
          {tarefa.descricao || "Sem descrição disponível."}
        </Text>

        <View style={styles.separador} />

        <Text style={styles.etiqueta}>ESTADO</Text>

        <View
          style={[
            styles.estadoContainer,
            tarefa.concluida
              ? styles.estadoConcluido
              : styles.estadoPendente,
          ]}
        >
          <Text style={styles.estadoTexto}>
            {tarefa.concluida
              ? "Concluída ✅"
              : "Pendente 🔵"}
          </Text>
        </View>
      </View>

      <Text style={styles.mensagem}>
        Sempre em frente, Dragões! 💙
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0050A4",
    padding: 16,
  },
  card: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 20,
    marginTop: 24,
    gap: 12,
    borderWidth: 2,
    borderColor: "#003B70",
  },
  etiqueta: {
    color: "#666666",
    fontSize: 12,
    fontWeight: "bold",
    letterSpacing: 1,
  },
  titulo: {
    color: "#003B70",
    fontSize: 23,
    fontWeight: "bold",
  },
  descricao: {
    color: "#333333",
    fontSize: 16,
    lineHeight: 24,
  },
  separador: {
    height: 1,
    backgroundColor: "#D9E2F0",
    marginVertical: 4,
  },
  estadoContainer: {
    alignSelf: "flex-start",
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 8,
  },
  estadoConcluido: {
    backgroundColor: "#D9F2E3",
  },
  estadoPendente: {
    backgroundColor: "#E0EBFA",
  },
  estadoTexto: {
    color: "#003B70",
    fontSize: 15,
    fontWeight: "bold",
  },
  mensagem: {
    color: "#FFFFFF",
    textAlign: "center",
    marginTop: 24,
    fontSize: 16,
    fontWeight: "bold",
  },
});
