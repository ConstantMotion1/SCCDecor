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
} from "react-native";
import auth from "@react-native-firebase/auth";
//import db from "@react-native-firebase/database";

function Startup({ navigation }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showLogin, setShowLogin] = useState(false);
  const [imageOpacity] = useState(new Animated.Value(1));
  const [imageScale] = useState(new Animated.Value(1));

  const handleImageClick = () => {
    Animated.parallel([
      Animated.timing(imageOpacity, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }),
      Animated.timing(imageScale, {
        toValue: 0.2,
        duration: 500,
        useNativeDriver: true,
      }),
    ]).start(() => {
      setShowLogin(true);
    });
  };

  useEffect(() => {
    if (showLogin) {
      Animated.timing(imageOpacity, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start();
    }
  }, [showLogin]);

  const handleLogin = async () => {
    // Here you can implement your login logic
    if (email && password) {
      auth()
      .signInWithEmailAndPassword(email, password)
        .then(() => {
          navigation.navigate("Booked Events");
          Alert.alert("Login", "Logged in successfully");
          console.log("User account created & signed in!");
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
    navigation.navigate("Signup")
  }

  return (
    <View style={styles.container}>
      {showLogin ? (
        <>
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
          <Button title="Login" onPress={handleLogin} />
     
          <Button title="Sign Up" onPress={handleSignup}/>
        
        
        </>
      ) : (
        <TouchableOpacity onPress={handleImageClick}>
          <Animated.Image
            source={require("../assets/images/logohome.jpg")}
            style={[
              styles.image,
              {
                opacity: imageOpacity,
                transform: [{ scale: imageScale }],
              },
            ]}
          />
        </TouchableOpacity>
      )}
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

export default Startup;
