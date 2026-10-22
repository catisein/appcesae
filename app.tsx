import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import DetalhesScreen from "./src/features/Detalhes/detalhesScreen";
import FormularioScreen from "./src/features/Formulario/formularioScreen";
import HomeScreen from "./src/features/Home/homescreen";
import TarefasScreen from "./src/features/Tarefas/tarefasScreen";

import type { RootStackParamList } from "./src/navigation/types";

const Stack = createNativeStackNavigator<RootStackParamList>();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen 
          name="Home" 
          component={HomeScreen} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="Tarefas" 
          component={TarefasScreen} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="Detalhes" 
          component={DetalhesScreen} 
          options={{ headerShown: false }} 
        />
        <Stack.Screen 
          name="Formulario" 
          component={FormularioScreen} 
          options={{ headerShown: false }} 
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
