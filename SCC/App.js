import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StyleSheet } from "react-native";
import Startup from "./components/Startup";
import Home from "./components/Home";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen 
        name="Startup" 
        component={Startup}
        options={{headerShown: false}} />
        <Stack.Screen 
        name="Home" 
        component={Home} 
        options={{headerShown: false}}/>
      </Stack.Navigator>
    </NavigationContainer>
  );
}
