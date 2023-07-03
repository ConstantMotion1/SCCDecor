import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Animated,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import auth from "@react-native-firebase/auth";

function Signup({ navigation }) {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {
        // Here you can implement your login logic
        if (email && password) {
          auth()
            .createUserWithEmailAndPassword(email, password)
            .then(() => {
              navigation.navigate("Home");
              Alert.alert("Login", "Logged in successfully");
              console.log("User account signed in!");
            })
            .catch((error) => {
              if (error.code === "auth/email-already-in-use") {
                Alert.alert("Login", "Email already exists");
                console.log("That email address is already in use!");
              }
    
              if (error.code === "auth/invalid-email") {
                Alert.alert("Login", "Invalid email or password");
                console.log("That email address is invalid!");
              }
    
              console.error(error);
            });
        }
      };

  return (
    <View style={styles.container}>
      <TextInput
            style={styles.input}
            placeholder="Email"
            onChangeText={(text) => setEmail(text)}
            value={email}
          />
          <TextInput
            style={styles.input}
            placeholder="Password"
            secureTextEntry
            onChangeText={(text) => setPassword(text)}
            value={password}
          />
          <Button title="Signup" onPress={handleLogin} />
    </View>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      paddingHorizontal: 16,
      backgroundColor: "#fff",
    },
    input: {
      height: 40,
      borderColor: "gray",
      borderWidth: 1,
      marginBottom: 12,
      paddingHorizontal: 8,
    },
    image: {
      width: 400,
      height: 400,
      alignSelf: "center",
    },
  });

export default Signup;