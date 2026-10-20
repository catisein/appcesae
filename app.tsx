import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import DetalhesScreen from "./src/features/Detalhes/detalhesScreen";
import HomeScreen from "./src/features/Home/homescreen";
import TarefasScreen from "./src/features/Tarefas/tarefasScreen";

import type { RootStackParamList } from "./src/navigation/types";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Home"
        screenOptions={{
          headerStyle: {
            backgroundColor: "#003B70",
          },
          headerTintColor: "#FFFFFF",
          headerTitleStyle: {
            fontWeight: "bold",
          },
          contentStyle: {
            backgroundColor: "#0050A4",
          },
        }}
      >
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: "FC Porto - Início" }}
        />

        <Stack.Screen
          name="Tarefas"
          component={TarefasScreen}
          options={{ title: "Plano de Jogos & Tarefas" }}
        />

        <Stack.Screen
          name="Detalhes"
          component={DetalhesScreen}
          options={{ title: "Detalhes da Tarefa" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
