import { Ionicons } from "@expo/vector-icons";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { NavigationContainer } from "@react-navigation/native";

import AcercaDeScreen from "./screens/AcercaDeScreen";
import ClimaScreen from "./screens/ClimaScreen";
import EdadScreen from "./screens/EdadScreen";
import GeneroScreen from "./screens/GeneroScreen";
import PokemonScreen from "./screens/PokemonScreen";
import PortadaScreen from "./screens/PortadaScreen";
import UniversidadesScreen from "./screens/UniversidadesScreen";
import WordPressScreen from "./screens/WordPressScreen";

const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          tabBarIcon: ({ color, size }) => {
            const icons = {
              Inicio: "grid-outline",
              Género: "person-outline",
              Edad: "hourglass-outline",
              Universidades: "school-outline",
              Clima: "cloud-outline",
              Pokémon: "flash-outline",
              WordPress: "newspaper-outline",
              "Acerca De": "information-circle-outline",
            };
            return (
              <Ionicons name={icons[route.name]} size={size} color={color} />
            );
          },
          tabBarActiveTintColor: "#E63946",
          tabBarInactiveTintColor: "#888",
          tabBarStyle: {
            backgroundColor: "#1C1C1C",
            borderTopColor: "#333",
          },
          tabBarLabelStyle: { fontSize: 9 },
          headerStyle: { backgroundColor: "#1C1C1C" },
          headerTintColor: "#fff",
          headerTitleStyle: { fontWeight: "bold" },
        })}
      >
        <Tab.Screen name="Inicio" component={PortadaScreen} />
        <Tab.Screen name="Género" component={GeneroScreen} />
        <Tab.Screen name="Edad" component={EdadScreen} />
        <Tab.Screen name="Universidades" component={UniversidadesScreen} />
        <Tab.Screen name="Clima" component={ClimaScreen} />
        <Tab.Screen name="Pokémon" component={PokemonScreen} />
        <Tab.Screen name="WordPress" component={WordPressScreen} />
        <Tab.Screen name="Acerca De" component={AcercaDeScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
