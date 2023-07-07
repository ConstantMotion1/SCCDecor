import React from "react";
import { Text, View, Image } from "react-native";

function CurrentEvent({ route }) {
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
      <Text>Decor:</Text>

      {event.selectedDecor.map((decor, index) => (
        <Image
          key={index}
          source={{ uri: decor }}
          style={{ width: 100, height: 100, margin: 10 }}
        />
      ))}
    </View>
  );
}

export default CurrentEvent;
