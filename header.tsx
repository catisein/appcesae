import { StyleSheet, Text, View, ViewStyle } from "react-native";

type HeaderProps = {
  titulo: string;
  subtitulo?: string;
  style?: ViewStyle;
};

export default function Header({
  titulo,
  subtitulo,
  style,
}: HeaderProps) {
  return (
    <View style={[styles.container, style]}>
      <Text style={styles.titulo}>{titulo}</Text>

      {subtitulo ? (
        <Text style={styles.subtitulo}>{subtitulo}</Text>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingVertical: 16,
    paddingHorizontal: 4,
    marginBottom: 12,
  },
  titulo: {
    color: "#FFFFFF",
    fontSize: 26,
    fontWeight: "bold",
  },
  subtitulo: {
    color: "#E0EBFA",
    fontSize: 15,
    marginTop: 4,
  },
});
