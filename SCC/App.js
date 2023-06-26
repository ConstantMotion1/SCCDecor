import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StyleSheet } from "react-native";
import auth from "@react-native-firebase/auth"
import Startup from "./components/Startup";
import Home from "./components/Home";
import Signup from "./components/Signup";
import AddEvent from "./components/AddEvent";
import NewEvent from "./components/NewEvent"
import { useState, useEffect } from "react";

const Stack = createNativeStackNavigator();

export default function App() {

const [initializing , setInitializing] = useState(true)
const [user, setUser] = useState(null);

function onAuthStateChanged(user) {
  setUser(user);
  if (initializing) setInitializing(false);
}

useEffect(() => {
  const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
  return subscriber
}, [])

if (initializing) return null

return (
  <NavigationContainer>
    <Stack.Navigator>
      {!user ? (
        <>
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
        </>
      ) : (
        <>
          <Stack.Screen
            name="Home"
            component={Home}
            options={{
              headerShown: true,
              headerBackVisible: false,
            }}
          />
          <Stack.Screen
            name="NewEvent"
            component={AddEvent}
            options={{ headerShown: true }}
          />
        </>
      )}
    </Stack.Navigator>
  </NavigationContainer>
);
}


