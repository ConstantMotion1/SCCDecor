import React, { useState } from 'react';
import { View, Button, Modal, TextInput, Text, SafeAreaView, StyleSheet, Alert } from 'react-native';
import { TimelineCalendar, EventItem } from '@howljs/calendar-kit';
import auth from '@react-native-firebase/auth';
import db from "@react-native-firebase/database";

const Home = ({ navigation }) => {

  const allEvents = () => {
    db().ref('bookings/').on('value', snapshot => {
      snapshot.val()
    })
  }
console.log(allEvents)


  const [events, setEvents] = useState([
    {
      id: '1',
      title: 'Event 1',
      start: '2023-06-26T09:00:05',
      end: '2023-06-26T12:00:05',
      color: '#A3C7D6',
    },
    {
      id: '3',
      title: 'Event 3',
      start: '2023-06-26T09:00:05',
      end: '2023-06-26T12:00:05',
      color: '#A3C7D7',
    },
    {
      id: '2',
      title: 'Event 2',
      start: '2023-06-15T11:00:05.313Z',
      end: '2023-06-15T14:00:05.313Z',
      color: '#B1AFFF',
    },
  ]);

  const addEvents = () => {
    navigation.navigate('NewEvent')
  }

  const signOut = () => {
    auth().signOut()
    .then(() => {
      console.log('User has been signed out', auth().currentUser)
      Alert.alert("Signout", "User has been signed out!");
      navigation.navigate('Startup')
    })
  }

 
  return (
    <SafeAreaView style={styles.container}>
      <Button title="NewEvent" style={styles.addBtn} onPress={addEvents}/>
      <Button title="Signout" style={styles.addBtn} onPress={signOut}/>
      <TimelineCalendar
       viewMode='week'
      allowPinchToZoom={true}
      events={events}
      timeZone='America/Toronto'
       />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#FFF' },
  addBtn: {
    color: 'white',
    backgroundColor: 'blue',
    borderWidth:1,
    borderColor:'rgba(0,0,0,0.2)',
    alignItems:'center',
    justifyContent:'center',
    width:100,
    height:100,
    borderRadius:50,
  }
});

export default Home;
