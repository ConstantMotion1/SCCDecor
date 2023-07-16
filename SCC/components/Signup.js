import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Animated,
  TouchableOpacity,
  Image,
  Alert,
  Dimensions,
} from "react-native";
import auth from "@react-native-firebase/auth";

const {height} = Dimensions.get('screen');

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
      <View style={styles.card}>
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
        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2c3032",
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  card: {
    width: '100%',
    padding: 20,
    backgroundColor: "#FFF",
    borderRadius: 30,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  input: {
    height: 60,
    borderColor: "#ddd",
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 15,
    borderRadius: 25,
  },
  button: {
    width: "100%",
    backgroundColor: "#FFD700",
    paddingVertical: 10,
    borderRadius: 30,
    marginBottom: 15,
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
    textAlign: "center",
  },
});

export default Signup;
