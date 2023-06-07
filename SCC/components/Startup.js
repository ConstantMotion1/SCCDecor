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
import db from "@react-native-firebase/database";

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
      try {
        const response = await auth().createUserWithEmailAndPassword(
          email,
          password
        );

        if (response.user) {
          await createProfile(response)
          navigation.navigate("Home");
          Alert.alert("Login", "Logged in successfully");
        }
      } catch (error) {
        Alert.alert("Login", "Invalid email or password");
        console.log(error);
      }
    }

    // auth()
    // .createUserWithEmailAndPassword(email, password)
    // .then(userCredentials => {
    //   const user = userCredentials.user
    //   console.log(user.email)
    // })
    // .catch(error => alert(error.message))

  };

  const createProfile =  async (response) => {
    db().ref(`/users/${response.user.uid}`).set({user})
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
