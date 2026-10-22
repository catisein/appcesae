import { NativeStackScreenProps } from "@react-navigation/native-stack";
import { useEffect, useState } from "react";
import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import Card from "../../components/Card/card";
import Header from "../../components/Header/header";
import { RootStackParamList } from "../../navigation/types";
import type { Tarefa } from "./types";

const data = [
  {
    id: "1",
    titulo: "Apoiar o FC Porto 💙",
    concluida: false,
  },
  {
    id: "2",
    titulo: "Vestir de azul e branco 🐉",
    concluida: false,
  },
  {
    id: "3",
    titulo: "Garantir a vitória no Dragão",
    concluida: true,
  },
] as Array<Tarefa>;

type Filtro = "todas" | "concluidas" | "pendentes";

type NavigationProps = NativeStackScreenProps<RootStackParamList, "Tarefas">;

export default function TarefasScreen({ navigation, route }: NavigationProps) {
  const [tarefas, setTarefas] = useState(data as Tarefa[]);
  const [filtro, setFiltro] = useState("todas" as Filtro);

  // Escuta a nova tarefa enviada pelo FormularioScreen
  useEffect(() => {
    const params = route.params as any;
    if (params?.novaTarefaAdicionada) {
      setTarefas((tarefasAtuais) => [params.novaTarefaAdicionada, ...tarefasAtuais]);
      // Limpa o parâmetro para não duplicar se o ecrã re-renderizar
      navigation.setParams({ novaTarefaAdicionada: undefined } as any);
    }
  }, [route.params]);

  const tarefasVisiveis = () => {
    if (filtro === "pendentes") {
      return tarefas.filter((task) => !task.concluida);
    }
    if (filtro === "concluidas") {
      return tarefas.filter((task) => task.concluida);
    }
    return tarefas;
  };

  return (
    <View style={styles.mainContainer}>
      {/* Cabeçalho com botão de voltar */}
      <View style={styles.headerRow}>
        <TouchableOpacity onPress={() => navigation.goBack()} style={styles.voltarBtn}>
          <Text style={styles.voltarText}>← Voltar</Text>
        </TouchableOpacity>
        <Header titulo="Tarefas" subtitulo="Rumo à Vitória!" />
      </View>

      {/* Botão que navega para o Ecrã de Formulário à parte */}
      <TouchableOpacity
        style={styles.botaoAbrirFormulario}
        onPress={() => navigation.navigate("Formulario")}
      >
        <Text style={styles.textoBotaoFormulario}>+ Adicionar Nova Tarefa</Text>
      </TouchableOpacity>

      {/* Botões de Filtro */}
      <View style={styles.filtrosRow}>
        <TouchableOpacity
          onPress={() => setFiltro("todas")}
          style={[styles.filtroBtn, filtro === "todas" && styles.filtroAtivo]}
        >
          <Text style={[styles.filtroText, filtro === "todas" && styles.textoFiltroAtivo]}>Ver todas</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setFiltro("concluidas")}
          style={[styles.filtroBtn, filtro === "concluidas" && styles.filtroAtivo]}
        >
          <Text style={[styles.filtroText, filtro === "concluidas" && styles.textoFiltroAtivo]}>Concluídas</Text>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => setFiltro("pendentes")}
          style={[styles.filtroBtn, filtro === "pendentes" && styles.filtroAtivo]}
        >
          <Text style={[styles.filtroText, filtro === "pendentes" && styles.textoFiltroAtivo]}>Pendentes</Text>
        </TouchableOpacity>
      </View>

      {/* Lista de Tarefas */}
      <FlatList
        data={tarefasVisiveis()}
        keyExtractor={(tarefa) => tarefa.id}
        renderItem={({ item: tarefa }) => {
          return (
            <Card
              titulo={tarefa.titulo}
              concluida={tarefa.concluida}
              id={tarefa.id}
              onPress={() => navigation.navigate('Detalhes', { tarefa: tarefa })}
              onDelete={() => {
                setTarefas(tarefas.filter((t) => t.id !== tarefa.id));
              }}
              onToggle={() => {
                setTarefas(
                  tarefas.map((t) =>
                    tarefa.id === t.id ? { ...t, concluida: !t.concluida } : t,
                  ),
                );
              }}
            />
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    paddingHorizontal: 16,
    backgroundColor: "#0050A4",
  },
  headerRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 30,
  },
  voltarBtn: {
    paddingRight: 10,
  },
  voltarText: {
    color: "#FFFFFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  botaoAbrirFormulario: {
    backgroundColor: "#FFFFFF",
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    marginVertical: 12,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  textoBotaoFormulario: {
    color: "#0050A4",
    fontWeight: "bold",
    fontSize: 16,
  },
  filtrosRow: {
    marginBottom: 12,
    flexDirection: "row",
    justifyContent: "center",
    gap: 8,
  },
  filtroBtn: {
    backgroundColor: "rgba(255, 255, 255, 0.2)",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
  },
  filtroAtivo: {
    backgroundColor: "#FFFFFF",
  },
  filtroText: {
    color: "#FFFFFF",
    fontWeight: "bold",
  },
  textoFiltroAtivo: {
    color: "#0050A4",
  },
});
