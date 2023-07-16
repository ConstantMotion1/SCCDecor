import React, { useState, useEffect } from "react";
import {
  View,
  Button,
  Modal,
  TextInput,
  Text,
  SafeAreaView,
  StyleSheet,
  Alert,
} from "react-native";
import { Header } from "react-native-elements";
import { TimelineCalendar } from "@howljs/calendar-kit";
import CurrentEvent from "./CurrentEvent";
import auth from "@react-native-firebase/auth";
import db from "@react-native-firebase/database";
import { color } from "react-native-reanimated";

const Home = ({ navigation }) => {
  const [events, setEvents] = useState();
  const [selectedEvent, setSelectedEvent] = useState(null);

  useEffect(() => {
    const bookingsRef = db().ref("bookings/");
    const listener = bookingsRef.on("value", (snapshot) => {
      console.log(snapshot.val());
      try {
        const snapshotValue = snapshot.val();
        const eventsArray = snapshotValue ? Object.values(snapshotValue) : [];
        setEvents(eventsArray);
      } catch (err) {
        console.log("error:" + err);
      }
    });

    // Cleanup function to remove the listener when component unmounts
    return () => {
      bookingsRef.off("value", listener);
    };
  }, []);

  const addEvents = () => {
    navigation.navigate("AddEvent");
  };

  const signOut = () => {
    auth()
      .signOut()
      .then(() => {
        console.log("User has been signed out", auth().currentUser);
        Alert.alert("Signout", "User has been signed out!");
        navigation.navigate("Startup");
      });
  };

  const handleEventPress = (event) => {
    setSelectedEvent(event);
    navigation.navigate("CurrentEvent", { event: event });
  };

  return (
    <SafeAreaView style={styles.container}>
      <TimelineCalendar
        viewMode="week"
        allowPinchToZoom={true}
        events={events}
        onLongPressEvent={handleEventPress}
        timeZone="America/Toronto"
        theme={{todayName: { color: 'black' },
        todayNumber: { color: 'black' },
        todayNumberContainer: { backgroundColor: '#FFD700' }}}
      />
      <Header
      containerStyle={styles.nav}
        leftComponent={{ icon:"menu" }}
        centerComponent={{ icon: "add", onPress: addEvents }}
        rightComponent={{
          icon: "exit-to-app",
       
          onPress: signOut,
        }}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#FFF" },
  addBtn: {
    color: "white",
    backgroundColor: "blue",
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.2)",
    alignItems: "center",
    justifyContent: "center",
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  nav: {
    color: '#2c3032',
    backgroundColor: '#FFD700',
    paddingBottom: 20,
    paddingTop: 5,
    borderTopRightRadius:20,
    borderTopLeftRadius: 20
  }
});

export default Home;
