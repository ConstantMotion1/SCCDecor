import React from 'react'
import { Text, View } from 'react-native'

function CurrentEvent({route}) {

  const { event } = route.params;

  return (
    <View>
        <Text>
          Title: 
          {event.title}
        </Text>
        <Text>
          Client Name: 
          {event.clientName}
        </Text>
        <Text>
          Number of Halls: 
          {event.halls}
        </Text>
           <Text>
          Attendance: 
          {event.attendance}
        </Text>
           <Text>
          Decor: 
          {event.decor}
        </Text>
    </View>
  )
}

export default CurrentEvent