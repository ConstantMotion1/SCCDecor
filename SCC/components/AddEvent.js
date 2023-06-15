import React, { useState } from "react";
import { View, Text, Button, Platform, StyleSheet } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import  DateTimePicker  from '@react-native-community/datetimepicker';
import { SafeAreaView } from "react-native-safe-area-context";

function AddEvent() {

  const [date, setDate] = useState(new Date());
  const [mode, setMode] = useState('date');
  const [show, setShow] = useState(false);
  const [text, setText] = useState('Empty');

  const showMode = (currentMode) => {
    setShow(true)
    setMode(currentMode)
  }

  const onChange = (event, selectedDate) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate)

    let tempDate = new Date(currentDate);
    let fDate = tempDate.getDate() + '/' + (tempDate.getMonth() + 1) + '/' + tempDate.getFullYear();
    let fTime = 'Hours: ' + tempDate.getHours() + ' | Minutes: ' + tempDate.getMinutes();
    setText(fDate + '/n' + fTime)

    console.log(fDate + ' (' + fTime + ')')

  }


  return (
    <View style={styles.container}>
   
      <Text style={styles.text}>{text}</Text>
      <View style={styles.button} >
        <Button title="DatePicker" onPress={() => showMode('date')} />
      </View>
      <View style={styles.button} >
        <Button title="TimePicker" onPress={() => showMode('time')} />
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
     
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    fontWeight: 'bold',
    fontSize: 20
  },
  button: {
    margin: 20
  }
})

export default AddEvent;
