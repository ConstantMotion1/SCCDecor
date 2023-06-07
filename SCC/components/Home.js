import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  TextInput,
  Button,
} from "react-native";
import { Calendar } from "react-native-calendars";

const Home = () => {
  const [selectedDate, setSelectedDate] = useState("");
  const [eventModalVisible, setEventModalVisible] = useState(false);
  const [eventText, setEventText] = useState("");
  const [events, setEvents] = useState({});

  const handleDayPress = (day) => {
    setSelectedDate(day.dateString);
    setEventModalVisible(true);
  };

  const handleAddEvent = () => {
    if (eventText.trim() !== "") {
      const updatedEvents = { ...events };
      if (updatedEvents[selectedDate]) {
        updatedEvents[selectedDate].push(eventText);
      } else {
        updatedEvents[selectedDate] = [eventText];
      }
      setEvents(updatedEvents);
      setEventText("");
      setEventModalVisible(false);
    }
  };

  return (
    <View style={styles.container}>
      <Calendar
        onDayPress={handleDayPress}
        markedDates={{
          [selectedDate]: { selected: true, marked: true },
        }}
      />
      <Modal visible={eventModalVisible} animationType="slide">
        <View style={styles.modalContainer}>
          <Text style={styles.modalTitle}>Add Event</Text>
          <TextInput
            style={styles.input}
            placeholder="Event"
            onChangeText={(text) => setEventText(text)}
            value={eventText}
          />
          <Button title="Add" onPress={handleAddEvent} />
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 16,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 16,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 16,
    textAlign: "center",
  },
  input: {
    height: 40,
    borderColor: "gray",
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
});

export default Home;
