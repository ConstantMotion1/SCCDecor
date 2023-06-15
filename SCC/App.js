import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StyleSheet } from "react-native";
import Startup from "./components/Startup";
import Home from "./components/Home";
import Signup from "./components/Signup";
import AddEvent from "./components/AddEvent";

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Startup"
          component={Startup}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Signup"
          component={Signup}
          options={{ headerShown: false }}
        />
        <Stack.Screen
          name="Booked Events"
          component={Home}
          options={{ headerShown: true, headerBackVisible: false }}
        />
        <Stack.Screen
          name="Add Event"
          component={AddEvent}
          options={{ headerShown: true }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
