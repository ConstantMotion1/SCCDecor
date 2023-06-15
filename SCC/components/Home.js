import React, { useState } from 'react';
import { View, Button, Modal, TextInput, Text, SafeAreaView, StyleSheet } from 'react-native';
import { TimelineCalendar, EventItem } from '@howljs/calendar-kit';


const Home = ({ navigation }) => {
  
  const [events, setEvents] = useState([
    {
      id: '1',
      title: 'Event 1',
      start: '2023-06-14T09:00:05.313Z',
      end: '2023-06-14T12:00:05.313Z',
      color: '#A3C7D6',
    },
    {
      id: '3',
      title: 'Event 3',
      start: '2023-06-14T09:00:05.313Z',
      end: '2023-06-14T12:00:05.313Z',
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

  const addEvent = (newEvent) => {
    setEvents([...events, newEvent]);
  };

  const addEvents = () => {
    navigation.navigate('Add Event')
  }

 
  return (
    <SafeAreaView style={styles.container}>
      <Button title="Add Event" style={styles.addBtn} onPress={addEvents}>+</Button>
      <TimelineCalendar
       viewMode='week'
       events={events}
      allowPinchToZoom={true}
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
