import React, { useState } from "react";
import { View, Text, Button, Platform, StyleSheet, TouchableOpacity, Alert } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import DateTimePicker from "@react-native-community/datetimepicker";
import { SafeAreaView } from "react-native-safe-area-context";
import db from "@react-native-firebase/database"

const AddEvent = () => {
  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState("date");
  const [show, setShow] = useState(false);
  const [text, setText] = useState("Date");
  const [textone, setTextone] = useState("Time");
  const [attendance, setAttendance] = useState("");
  const [event, setEvent] = useState("");
  const [clientName, setClientName] = useState("");
  const [hall, setHall] = useState("");
  const [decor, setDecor] = useState("");


  const handleSubmit = () => {
    console.log('hit')
    try {
        db().ref('bookings/').set({
            date: date,
            event: event,
            clientName: clientName,
            halls: hall,
            decor: decor,
            attendance: attendance
          })
          console.log("Form submitted");
          Alert.alert("Submit", "The event has been booked!")


    } catch (error) {
        console.log(error)
    }
  
  };

  const showMode = (currentMode) => {
    setShow(true);
    setMode(currentMode);
  };

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === "ios");
    setDate(currentDate);

    let tempDate = new Date(currentDate);
    let fDate =
      tempDate.getDate() +
      "/" +
      (tempDate.getMonth() + 1) +
      "/" +
      tempDate.getFullYear();
    let fTime =
      "Hours: " + tempDate.getHours() + " | Minutes: " + tempDate.getMinutes();
    setText(fDate);
    setTextone(fTime);

    console.log(fDate + " (" + fTime + ")");
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.button}>
        <Button title="DatePicker" onPress={() => showMode("date")} />
      </View>
      <View style={styles.button}>
        <Button title="TimePicker" onPress={() => showMode("time")} />
      </View>
      <View style={styles.section}>
        <TouchableOpacity>
            <TextInput style={styles.input} value={text} onPress={() => showMode("date")}/>
        </TouchableOpacity>
      </View>
      <View>
        <TouchableOpacity>
            <TextInput style={styles.input} value={textone} onPress={() => showMode("time")}/>
        </TouchableOpacity>
      </View>

      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={date}
          mode={mode}
          is24Hour={false}
          display="default"
          onChange={onChange}
        />
      )}

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
        <Text >Decor:</Text>
        <View >
          <Button
            title="Yes"
            onPress={() => setDecor('Yes')}
            color={decor === 'Yes' ? 'blue' : '#CCCCCC'}
          />
          <Button
            title="No"
            onPress={() => setDecor('No')}
            color={decor === 'No' ? 'blue' : '#CCCCCC'}
          />
        </View>
      <Button title="Submit" onPress={handleSubmit} />
    </View>
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
  button: {
    margin: 20,
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
