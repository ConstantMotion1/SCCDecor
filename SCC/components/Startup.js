import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  Button,
  StyleSheet,
  Animated,
  TouchableOpacity,
  Image,
  Alert,
  Text,
  Dimensions,
} from "react-native";
import auth from "@react-native-firebase/auth";

const {height} = Dimensions.get('screen');
function Startup({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showLogin, setShowLogin] = useState(false);
  const [imagePosition] = useState(new Animated.Value(0)); // New animated value for image position
  const [cardPosition] = useState(new Animated.Value(height));

  const handleImageClick = () => {
    Animated.parallel([
      Animated.timing(imagePosition, {  // Update the position of the image
        toValue: -height / 6,
        duration: 500,
        useNativeDriver: false,
      }),
      Animated.timing(cardPosition, {
        toValue: 0,
        duration: 500,
        useNativeDriver: false,
      }),
    ]).start(() => {
      setShowLogin(true);
    });
  };

  const handleLogin = async () => {
    if (email && password) {
      auth()
        .signInWithEmailAndPassword(email, password)
        .then(() => {
          navigation.navigate("Home");
          Alert.alert("Login", "Logged in successfully");
          console.log("User account created & signed in!", auth().currentUser);
        })
        .catch((error) => {
          if (error.code === "auth/email-already-in-use") {
            Alert.alert("Login Error", "Email already exists");
            console.log("That email address is already in use!");
          }
          if (error.code === "auth/user-not-found") {
            Alert.alert("Login Error", "Invalid Credentials");
            console.log("That email address is already in use!");
          }

          if (error.code === "auth/invalid-email") {
            Alert.alert("Login Error", "Invalid email or password");
            console.log("That email address is invalid!");
          }

          console.error(error);
        });
    }
  };

  const handleSignup = async () => {
    navigation.navigate("Signup");
  };

  return (
    <View style={styles.container}>
      <Animated.View style={{transform: [{translateY: imagePosition}]}}>  
        <TouchableOpacity onPress={handleImageClick}>
          <Animated.Image
            source={require("../assets/images/logohome.jpg")}
            style={styles.image}
          />
        </TouchableOpacity>
      </Animated.View>

      <Animated.View style={[styles.card, {transform: [{translateY: cardPosition}]}]}>
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
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button} onPress={handleSignup}>
          <Text style={styles.buttonText}>Sign Up</Text>
        </TouchableOpacity>
      </Animated.View>
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
    position: 'absolute',
    bottom: 0,
    width: '100%',
    padding: 20,
    backgroundColor: "#FFF",
    borderTopLeftRadius: 30,
    borderTopRightRadius: 30,
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
  image: {
    width: 200,
    height: 200,
    borderRadius: 100,
    overflow: "hidden",
    marginBottom: 30,
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

export default Startup;
