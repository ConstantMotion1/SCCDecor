import React, { useState } from "react";
import {
  View,
  Text,
  Button,
  Platform,
  StyleSheet,
  TouchableOpacity,
  Alert,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";
import DateTimePicker from "@react-native-community/datetimepicker";
import { SafeAreaView } from "react-native-safe-area-context";
import db from "@react-native-firebase/database";

const AddEvent = ({navigation}) => {
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [startMode, setStartMode] = useState("date");
  const [endMode, setEndMode] = useState("date");
  const [startShow, setStartShow] = useState(false);
  const [endShow, setEndShow] = useState(false);
  const [startText, setStartText] = useState("Start Date");
  const [startTimeText, setStartTimeText] = useState("Start Time");
  const [endText, setEndText] = useState("End Date");
  const [endTimeText, setEndTimeText] = useState("End Time");
  const [attendance, setAttendance] = useState("");
  const [event, setEvent] = useState("");
  const [clientName, setClientName] = useState("");
  const [hall, setHall] = useState("");
  const [decor, setDecor] = useState("");
  const [id, setId] = useState(0); 

  const handleStartDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || startDate;
    setStartShow(Platform.OS === "ios");
    setStartDate(currentDate);

    let tempDate = new Date(currentDate);
    let fDate =
      tempDate.getDate() +
      "/" +
      (tempDate.getMonth() + 1) +
      "/" +
      tempDate.getFullYear();
    setStartText(fDate);

    console.log("Start Date: " + fDate);
  };

  const handleStartTimeChange = (event, selectedTime) => {
    const currentTime = selectedTime || startDate;
    setStartShow(Platform.OS === "ios");
    setStartDate(currentTime);

    let tempTime = new Date(currentTime);
    let fTime =
      "Hours: " + tempTime.getHours() + " | Minutes: " + tempTime.getMinutes();
    setStartTimeText(fTime);

    console.log("Start Time: " + fTime);
  };

  const handleEndDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || endDate;
    setEndShow(Platform.OS === "ios");
    setEndDate(currentDate);

    let tempDate = new Date(currentDate);
    let fDate =
      tempDate.getDate() +
      "/" +
      (tempDate.getMonth() + 1) +
      "/" +
      tempDate.getFullYear();
    setEndText(fDate);

    console.log("End Date: " + fDate);
  };

  const handleEndTimeChange = (event, selectedTime) => {
    const currentTime = selectedTime || endDate;
    setEndShow(Platform.OS === "ios");
    setEndDate(currentTime);

    let tempTime = new Date(currentTime);
    let fTime =
      "Hours: " + tempTime.getHours() + " | Minutes: " + tempTime.getMinutes();
    setEndTimeText(fTime);

    console.log("End Time: " + fTime);
  };

  const handleStartDateInputClick = () => {
    setStartShow(true);
    setStartMode("date");
  };

  const handleStartTimeInputClick = () => {
    setStartShow(true);
    setStartMode("time");
  };

  const handleEndDateInputClick = () => {
    setEndShow(true);
    setEndMode("date");
  };

  const handleEndTimeInputClick = () => {
    setEndShow(true);
    setEndMode("time");
  };

  function genRandomHexColor() {
    // Generate a random number between 0 and 16777215 (corresponding to #000000 and #FFFFFF in hex)
    const randomColor = Math.floor(Math.random() * 16777215);
  
    // Convert the decimal color value to hexadecimal
    const hexColor = "#" + randomColor.toString(16);
  
    return hexColor;
  }
  const handleSubmit = () => {
    console.log("hit");
    try {

      const startISOString = startDate.toISOString();
      const endISOString = endDate.toISOString();
      const randomColor = genRandomHexColor()
      const newId = id + 1
      db()
        .ref(`bookings/${startDate}`)
        // .ref("bookings") // Reference the "bookings" node
        // .push()
        .set({
          //id: newId,
          start: `${startISOString}`,
          end: `${endISOString}`,
          title: event,
          color: randomColor,
          clientName: clientName,
          halls: hall,
          decor: decor,
          attendance: attendance,
        });
        
        setId(newId)
      console.log("Form submitted");
      console.log(`bookings/${startDate}`);
      Alert.alert("Submit", "The event has been booked!");
      navigation.navigate('Home')
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.section}>
        <TouchableOpacity onPress={handleStartDateInputClick}>
          <TextInput
            style={styles.input}
            value={startText}
            editable={false}
          />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleStartTimeInputClick}>
          <TextInput
            style={styles.input}
            value={startTimeText}
            editable={false}
          />
        </TouchableOpacity>
        {startShow && (
          <DateTimePicker
            testID="startDateTimePicker"
            value={startDate}
            mode={startMode}
            is24Hour={false}
            display="default"
            onChange={
              startMode === "date"
                ? handleStartDateChange
                : handleStartTimeChange
            }
          />
        )}
      </View>
      <View style={styles.section}>
        <TouchableOpacity onPress={handleEndDateInputClick}>
          <TextInput style={styles.input} value={endText} editable={false} />
        </TouchableOpacity>
        <TouchableOpacity onPress={handleEndTimeInputClick}>
          <TextInput
            style={styles.input}
            value={endTimeText}
            editable={false}
          />
        </TouchableOpacity>
        {endShow && (
          <DateTimePicker
            testID="endDateTimePicker"
            value={endDate}
            mode={endMode}
            is24Hour={false}
            display="default"
            onChange={
              endMode === "date" ? handleEndDateChange : handleEndTimeChange
            }
          />
        )}
      </View>
      <View style={styles.formContainer}>
        <View style={styles.section}>
          <TextInput
            style={styles.input}
            placeholder="Event"
            value={event}
            onChangeText={setEvent}
          />
        </View>
        <View style={styles.section}>
          <TextInput
            style={styles.input}
            placeholder="Client Name"
            value={clientName}
            onChangeText={setClientName}
          />
        </View>
        <View style={styles.section}>
          <TextInput
            style={styles.input}
            placeholder="Hall Numbers"
            value={hall}
            onChangeText={setHall}
          />
        </View>
        <View style={styles.section}>
          <TextInput
            style={styles.input}
            placeholder="Attendance"
            value={attendance}
            onChangeText={setAttendance}
          />
        </View>
        <View style={styles.section}>
          <Text>Decor:</Text>
          <View>
            <Button
              title="Yes"
              onPress={() => setDecor("Yes")}
              color={decor === "Yes" ? "blue" : "#CCCCCC"}
            />
            <Button
              title="No"
              onPress={() => setDecor("No")}
              color={decor === "No" ? "blue" : "#CCCCCC"}
            />
          </View>
        </View>
        <Button title="Submit" onPress={handleSubmit} />
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    fontWeight: "bold",
    fontSize: 20,
  },
  formContainer: {
    padding: 16,
  },
  section: {
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 8,
  },
});

export default AddEvent;
