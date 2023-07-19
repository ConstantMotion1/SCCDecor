import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { StyleSheet } from "react-native";
import auth from "@react-native-firebase/auth"
import Startup from "./components/Startup";
import Home from "./components/Home";
import Signup from "./components/Signup";
import AddEvent from "./components/AddEvent";
import Test from "./components/Test";
import CurrentEvent from "./components/CurrentEvent";
import UpdateCurrent from "./components/UpdateCurrent";
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
            name="AddEvent"
            component={AddEvent}
            options={{ headerShown: true }}
          />
          <Stack.Screen
            name="CurrentEvent"
            component={CurrentEvent}
            options={{ headerShown: true }}
          />
              <Stack.Screen
            name="UpdateCurrent"
            component={UpdateCurrent}
            options={{ headerShown: true }}
          />
        </>
      )}
    </Stack.Navigator>
  </NavigationContainer>
);
}


