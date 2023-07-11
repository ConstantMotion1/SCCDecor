import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  Button,
  Platform,
  StyleSheet,
  TouchableOpacity,
  Alert,
  Image,
  ScrollView
} from "react-native";
import { TextInput } from "react-native-gesture-handler";
import DateTimePicker from "@react-native-community/datetimepicker";
import { SafeAreaView } from "react-native-safe-area-context";
import db from "@react-native-firebase/database";
import storage from "@react-native-firebase/storage"

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
  const [imageURL, setImageURL] = useState(null);
  const [selectedImages, setSelectedImages] = useState([]);

  const handleStartDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || startDate;
    setStartShow(Platform.OS === "ios");
    setStartDate(currentDate);
    function formatDate(date) {
      const day = date.getDate();
      const month = date.getMonth() + 1; // Months are zero-based, so we add 1
      const year = date.getFullYear();
    
      return `${day}/${month}/${year}`;
    }
    const fetchDate = formatDate(currentDate)    
    fetchBookings(fetchDate)

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

  const allBookings = []

  const fetchBookings = async (selectedDate) => {

    console.log("STARTDATE:" + selectedDate)
    try {
      const snapshot = await db()
        .ref(`bookings`)
        .orderByChild('id')
        .startAt(selectedDate)
        .once("value");
  
      const bookingsObj = snapshot.val();
      const bookings = Object.values(bookingsObj || {});
  
      console.log("Bookings for Start Date:", bookings);
    } catch (error) {
      console.log("Error fetching bookings:", error);
    }
  };
  
  

  const handleSubmit = () => {
    console.log("hit");
    try {

      function formatDate(date) {
        const day = date.getDate();
        const month = date.getMonth() + 1; // Months are zero-based, so we add 1
        const year = date.getFullYear();
      
        return `${day}/${month}/${year}`;
      }
      
      const startISOString = startDate.toISOString();
      const endISOString = endDate.toISOString();
      const randomColor = genRandomHexColor()
      const Id = formatDate(startDate)
      console.log("ID DATE:" + Id)
      db()
        .ref(`bookings`)
        // .ref("bookings") // Reference the "bookings" node
        .push()
        .set({
          id: Id,
          start: `${startISOString}`,
          end: `${endISOString}`,
          title: event,
          color: randomColor,
          clientName: clientName,
          halls: hall,
          decor: decor,
          attendance: attendance,
          selectedDecor: selectedImages,
        });
        
        
      console.log("Form submitted");
      console.log(`bookings/${startDate}`);
      Alert.alert("Submit", "The event has been booked!");
      navigation.navigate('Home')
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchImagesFromFirebase = async () => {
      try {
        const storageRef = storage().ref('images/'); // Replace with your reference (directory) path
        const imagesSnapshot = await storageRef.listAll();
        const downloadPromises = imagesSnapshot.items.map((imageRef) =>
          imageRef.getDownloadURL()
        );
        const downloadURLs = await Promise.all(downloadPromises);
        return downloadURLs;
      } catch (error) {
        console.log('Error fetching images from Firebase Storage:', error);
        return [];
      }
    };
  
    const getImageURL = async () => {
      try {
        const urls = await fetchImagesFromFirebase();
        //console.log('Image URLs:', urls);
        setImageURL(urls);
      } catch (error) {
        console.log('Error getting image URLs:', error);
      }
    };


    getImageURL();
  }, []);

  const imageContainerHeight = decor === "Yes" ? 200 : 40;

  return (
    <ScrollView >
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


  
          <View style={[styles.imageContainer, { height: imageContainerHeight }]}>
            {decor === "Yes" && (
              <ScrollView horizontal={true}>
                <View style={styles.imageScrollContainer}>
                  {imageURL.map((url, index) => (
                    <TouchableOpacity
                      key={index}
                      onPress={() => {
                        const isSelected = selectedImages.includes(url);

                        if (isSelected) {
                          setSelectedImages(selectedImages.filter(image => image !== url));
                        } else {
                          setSelectedImages([...selectedImages, url]);
                        }
                      }}
                    >
                      <Image
                        source={{ uri: url }}
                        style={[
                          styles.image,
                          selectedImages.includes(url) && styles.selectedImage,
                        ]}
                      />
                    </TouchableOpacity>
                  ))}
                </View>
              </ScrollView>
            )}
          </View>







        <Button title="Submit" onPress={handleSubmit} />
      </View>
    </SafeAreaView>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },
  imageContainer: {
    height: 40, // Adjust the height as per your requirement
  },
  imageScrollContainer: {
    flexDirection: "row",
  },
  image: {
    width: 150,
    height: 150,
    marginRight: 8,
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
  }
});

export default AddEvent;
