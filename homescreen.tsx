import type { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { Image, StyleSheet, Text, View } from "react-native";

import AppButton from "../../components/AppButton/appButton";
import type { RootStackParamList } from "../../navigation/types";

type Props = {
  navigation: NativeStackNavigationProp<RootStackParamList, "Home">;
};

export default function HomeScreen({ navigation }: Props) {
  return (
    <View style={styles.container}>
      <Text style={styles.titulo}>FC Porto 💙🐉</Text>
      <Text style={styles.subtitulo}>Bem-vindo ao Dragão!</Text>

      <Image
        style={styles.imagem}
        source={{
          uri: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQaVDWXX7_r2UFYdq6aAu5sOxOEhiNeNUJ0_yeqOfsuPw&s",
        }}
        accessibilityLabel="Imagem do FC Porto"
        resizeMode="contain"
      />

      <AppButton
        title="Controla a chama do Dragão"
        onPress={() => navigation.navigate("Tarefas")}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0050A4",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  titulo: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#FFFFFF",
    marginBottom: 8,
    textAlign: "center",
  },
  subtitulo: {
    fontSize: 16,
    color: "#E0E0E0",
    marginBottom: 24,
    textAlign: "center",
  },
  imagem: {
    width: 150,
    height: 150,
    marginBottom: 32,
  },
});
