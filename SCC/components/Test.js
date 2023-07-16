import React from "react";
import { Text, View, Image, StyleSheet, ScrollView, TouchableOpacity, Alert } from "react-native";
import { Card } from "react-native-paper";
import db from "@react-native-firebase/database";

function CurrentEvent({ route, navigation }) {
  const { event } = route.params;
  console.log('THE EVENT',event.key)

  const handleDelete = () => {
    const deleteRef = db().ref(`bookings/${event.key}`);
    deleteRef.remove()
      .then(() => {
        Alert.alert("Delete", "The event has been deleted!");
        navigation.navigate("Home");
      })
      .catch((error) => {
        console.log("Error deleting data:", error);
        // Handle error, if any
      });
  }
  

  return (
    <ScrollView>
<View style={styles.container}>
      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.title}>Title:</Text>
          <Text style={styles.eventData}>{event.title}</Text>
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.info}>Client Name:</Text>
          <Text style={styles.eventData}>{event.clientName}</Text>
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.info}>Number of Halls:</Text>
          <Text style={styles.eventData}>{event.halls}</Text>
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.info}>Attendance:</Text>
          <Text style={styles.eventData}>{event.attendance}</Text>
        </Card.Content>
      </Card>

      <Card style={styles.card}>
        <Card.Content>
          <Text style={styles.decorTitle}>Decor:</Text>

          <View style={styles.decorContainer}>
            {event.selectedDecor.map((decor, index) => (
              <Image
                key={index}
                source={{ uri: decor }}
                style={styles.decorImage}
              />
            ))}
          </View>
        </Card.Content>
      </Card>
      <TouchableOpacity onPress={handleDelete} style={styles.deletebtncontainer}>
      <Text style={styles.deleteBtn}>Delete Booking</Text>
    </TouchableOpacity>
    </View>
    </ScrollView>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#2c3032",
    padding: 30,
  },
  card: {
    marginBottom: 20,
    elevation: 4,
    backgroundColor: '#FFD700',
  },
  title: {
    color: "black",
    marginBottom: 5,
    fontWeight: "bold",
  },
  eventData: {
    color: "black",
    marginBottom: 10,
    textAlign: "center",
    fontSize: 16,
  },
  info: {
    color: "black",
    marginBottom: 5,
    fontWeight: "bold",
  },
  decorTitle: {
    color: "black",
    marginBottom: 10,
    fontWeight: "bold",
    fontSize: 16,
  },
  decorContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  decorImage: {
    width: 100,
    height: 100,
    margin: 10,
  },
  deleteBtn: {
    color: "black",
    backgroundColor: "red",
    borderWidth: 1,
    borderColor: "rgba(0,0,0,0.2)",
   textAlign: "center",
    width: 120,
    height: 30,
    fontWeight: "bold",
    borderRadius: 20,
  },
  deletebtncontainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  }
});

export default CurrentEvent;
