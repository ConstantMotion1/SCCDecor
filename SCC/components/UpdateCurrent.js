import React, { useState, useEffect } from 'react';
import { Text, View, StyleSheet, TextInput, Button, ScrollView, TouchableOpacity, SafeAreaView } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { firebase } from '@react-native-firebase/database';
import { useNavigation } from '@react-navigation/native';

export default function UpdateCurrent() {
  const [startDate, setStartDate] = useState(new Date());
  const [startTime, setStartTime] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());
  const [endTime, setEndTime] = useState(new Date());
  const [selectedDecor, setSelectedDecor] = useState("");
  const [decorList, setDecorList] = useState([]);
  const [showStartDatePicker, setShowStartDatePicker] = useState(false);
  const [showStartTimePicker, setShowStartTimePicker] = useState(false);
  const [showEndDatePicker, setShowEndDatePicker] = useState(false);
  const [showEndTimePicker, setShowEndTimePicker] = useState(false);

  const navigation = useNavigation();

  // Fetch decors from the database
  useEffect(() => {
    firebase
      .database()
      .ref('/decors')
      .once('value')
      .then(snapshot => {
        if (snapshot.exists()) {
          setDecorList(Object.values(snapshot.val()));
        }
      });
  }, []);

  const handleStartDateChange = (event, selectedDate) => {
    setShowStartDatePicker(false);
    setStartDate(selectedDate || startDate);
  };

  const handleStartTimeChange = (event, selectedTime) => {
    setShowStartTimePicker(false);
    setStartTime(selectedTime || startTime);
  };

  const handleEndDateChange = (event, selectedDate) => {
    setShowEndDatePicker(false);
    setEndDate(selectedDate || endDate);
  };

  const handleEndTimeChange = (event, selectedTime) => {
    setShowEndTimePicker(false);
    setEndTime(selectedTime || endTime);
  };

  const handleSubmit = () => {
    // Handle submission to the database
    // Navigate back to the previous screen
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.formContainer}>
        <View style={styles.section}>
          <Text style={styles.heading}>Start Date</Text>
          <TouchableOpacity onPress={() => setShowStartDatePicker(true)}>
            <Text>{startDate.toDateString()}</Text>
          </TouchableOpacity>
          {showStartDatePicker && (
            <DateTimePicker
              value={startDate}
              mode={'date'}
              display="default"
              onChange={handleStartDateChange}
            />
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.heading}>Start Time</Text>
          <TouchableOpacity onPress={() => setShowStartTimePicker(true)}>
            <Text>{startTime.toTimeString()}</Text>
          </TouchableOpacity>
          {showStartTimePicker && (
            <DateTimePicker
              value={startTime}
              mode={'time'}
              display="default"
              onChange={handleStartTimeChange}
            />
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.heading}>End Date</Text>
          <TouchableOpacity onPress={() => setShowEndDatePicker(true)}>
            <Text>{endDate.toDateString()}</Text>
          </TouchableOpacity>
          {showEndDatePicker && (
            <DateTimePicker
              value={endDate}
              mode={'date'}
              display="default"
              onChange={handleEndDateChange}
            />
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.heading}>End Time</Text>
          <TouchableOpacity onPress={() => setShowEndTimePicker(true)}>
            <Text>{endTime.toTimeString()}</Text>
          </TouchableOpacity>
          {showEndTimePicker && (
            <DateTimePicker
              value={endTime}
              mode={'time'}
              display="default"
              onChange={handleEndTimeChange}
            />
          )}
        </View>

        <View style={styles.section}>
          <Text style={styles.heading}>Select Decor</Text>
          <ScrollView horizontal style={styles.imageScrollContainer}>
            {decorList.map((decor, index) => (
              <TouchableOpacity key={index} onPress={() => setSelectedDecor(decor)}>
                <Image
                  source={{ uri: decor.imageUri }}
                  style={[styles.image, selectedDecor === decor && styles.selectedImage]}
                />
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <View style={styles.section}>
          <Button title="Update" onPress={handleSubmit} />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#2c3032",
      padding: 30
    },
    selectedImage: {
      borderColor: "#FFD700",
      borderWidth: 2,
    },
    row: {
      flexDirection: 'row',
      justifyContent: 'space-around',
    },
    imageContainer: {
      height: 40, // Adjust the height as per your requirement
    },
    imageScrollContainer: {
      flexDirection: "row",
    },
    heading: {
      color: 'white',
      marginBottom: 10,
      fontWeight: 'bold',
      textAlign: "center"
    },
    btn: {
      flex: 1,
      padding: 20
    },
    image: {
      width: 150,
      height: 150,
      marginRight: 8,
      borderRadius: 10
    },
    text: {
      fontWeight: "bold",
      fontSize: 20,
    },
    formContainer: {
      padding: 16,
    },
    section: {
      marginBottom: 16
    },
    input: {
      height: 40,
      borderColor: "#FFD700",
      borderWidth: 1,
      marginBottom: 12,
      paddingLeft: 8,
    },
    submitBtn: {
      backgroundColor: '#FFD700',
      padding: 10,
      borderRadius: 8,
      alignItems: 'center'
    },
    submitbtntext: {
      color: '#2c3032',
      fontWeight: 'bold'
    },
    button: {
      backgroundColor: '#2c3032',
      padding: 10,
      borderRadius: 8,
      margin: 4,
      flex: 1,
      alignItems: 'center'
    },
    buttonText: {
      color: '#FFD700',
      fontWeight: 'bold'
    },
  });
  
