import type { NativeStackScreenProps } from "@react-navigation/native-stack";
import { StatusBar } from "expo-status-bar";
import { useMemo, useState } from "react";
import {
  Alert,
  FlatList,
  StyleSheet,
  Text,
  TextInput,
  View,
} from "react-native";

import AppButton from "../../components/AppButton/appButton";
import Card from "../../components/Card/card";
import Header from "../../components/Header/header";
import type { RootStackParamList } from "../../navigation/types";
import type { Tarefa } from "./types";

type Props = NativeStackScreenProps<RootStackParamList, "Tarefas">;

type Filtro = "todas" | "pendentes" | "concluidas";

const tarefasIniciais: Tarefa[] = [
  {
    id: "1",
    titulo: "Apoiar o FC Porto 💙",
    descricao: "Apoiar a equipa e acreditar na vitória!",
    concluida: false,
  },
  {
    id: "2",
    titulo: "Vestir-me de azul e branco",
    descricao: "Mostrar as cores do nosso clube!",
    concluida: false,
  },
  {
    id: "3",
    titulo: "Picar os rivais com um centímetro 😄",
    descricao: "Uma brincadeira saudável entre adeptos.",
    concluida: true,
  },
];

export default function TarefasScreen({ navigation }: Props) {
  const [novaTarefa, setNovaTarefa] = useState("");
  const [tarefas, setTarefas] = useState<Tarefa[]>(tarefasIniciais);
  const [filtro, setFiltro] = useState<Filtro>("todas");
  const [pesquisa, setPesquisa] = useState("");

  function inserirTarefa() {
    const titulo = novaTarefa.trim();

    if (titulo.length === 0) {
      Alert.alert(
        "Falta o texto",
        "Escreve uma tarefa antes de inserir.",
      );
      return;
    }

    const tarefa: Tarefa = {
      id: String(Date.now()),
      titulo,
      descricao: "Tarefa pessoal relacionada com o FC Porto.",
      concluida: false,
    };

    setTarefas((atuais) => [...atuais, tarefa]);
    setNovaTarefa("");
  }

  function eliminarTarefa(id: string) {
    setTarefas((atuais) =>
      atuais.filter((tarefa) => tarefa.id !== id),
    );
  }

  function alterarTarefa(id: string) {
    setTarefas((atuais) =>
      atuais.map((tarefa) =>
        tarefa.id === id
          ? { ...tarefa, concluida: !tarefa.concluida }
          : tarefa,
      ),
    );
  }

  const tarefasVisiveis = useMemo(() => {
    const termo = pesquisa.trim().toLocaleLowerCase("pt-PT");

    return tarefas.filter((tarefa) => {
      const correspondeAoFiltro =
        filtro === "todas" ||
        (filtro === "pendentes" && !tarefa.concluida) ||
        (filtro === "concluidas" && tarefa.concluida);

      const correspondeAPesquisa = tarefa.titulo
        .toLocaleLowerCase("pt-PT")
        .includes(termo);

      return correspondeAoFiltro && correspondeAPesquisa;
    });
  }, [tarefas, filtro, pesquisa]);

  return (
    <View style={styles.container}>
      <StatusBar style="light" />

      <Header
        titulo="As minhas tarefas"
        subtitulo="Foco na vitória!"
      />

      <TextInput
        value={novaTarefa}
        onChangeText={setNovaTarefa}
        placeholder="Escreve uma nova tarefa"
        placeholderTextColor="#666666"
        style={styles.input}
        returnKeyType="done"
        onSubmitEditing={inserirTarefa}
        accessibilityLabel="Nova tarefa"
      />

      <AppButton
        title="Adicionar tarefa"
        onPress={inserirTarefa}
      />

      <TextInput
        value={pesquisa}
        onChangeText={setPesquisa}
        placeholder="Pesquisar tarefas..."
        placeholderTextColor="#666666"
        style={styles.inputPesquisa}
        accessibilityLabel="Pesquisar tarefas"
      />

      <View style={styles.filtros}>
        <AppButton
          title="Todas"
          onPress={() => setFiltro("todas")}
        />

        <AppButton
          title="Pendentes"
          onPress={() => setFiltro("pendentes")}
        />

        <AppButton
          title="Concluídas"
          onPress={() => setFiltro("concluidas")}
        />
      </View>

      <Text style={styles.contagem}>
        {tarefasVisiveis.length} tarefa(s) apresentada(s)
      </Text>

      <FlatList
        data={tarefasVisiveis}
        keyExtractor={(item) => item.id}
        keyboardShouldPersistTaps="handled"
        contentContainerStyle={
          tarefasVisiveis.length === 0
            ? styles.listaVazia
            : undefined
        }
        ListEmptyComponent={
          <Text style={styles.mensagemVazia}>
            Não existem tarefas para apresentar.
          </Text>
        }
        renderItem={({ item }) => (
          <Card
            id={item.id}
            titulo={item.titulo}
            concluida={item.concluida}
            onToggle={() => alterarTarefa(item.id)}
            onDelete={() => eliminarTarefa(item.id)}
            onPress={() =>
              navigation.navigate("Detalhes", {
                tarefa: item,
              })
            }
          />
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0050A4",
    padding: 16,
  },
  input: {
    backgroundColor: "#FFFFFF",
    color: "#003B70",
    borderRadius: 8,
    padding: 12,
    marginTop: 8,
  },
  inputPesquisa: {
    backgroundColor: "#FFFFFF",
    color: "#003B70",
    borderRadius: 8,
    padding: 12,
    marginTop: 16,
    marginBottom: 12,
  },
  filtros: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
    marginBottom: 8,
    gap: 4,
  },
  contagem: {
    color: "#FFFFFF",
    marginBottom: 8,
  },
  listaVazia: {
    flexGrow: 1,
    justifyContent: "center",
  },
  mensagemVazia: {
    color: "#FFFFFF",
    textAlign: "center",
    padding: 20,
  },
});
