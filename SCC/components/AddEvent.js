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
  ScrollView,
} from "react-native";
import { TextInput } from "react-native-gesture-handler";
import DateTimePicker from "@react-native-community/datetimepicker";
import { SafeAreaView } from "react-native-safe-area-context";
import db from "@react-native-firebase/database";
import storage from "@react-native-firebase/storage";

const AddEvent = ({ navigation }) => {
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
  const [imageURL, setImageURL] = useState([]);
  const [selectedImages, setSelectedImages] = useState([]);
  const [currentBookings, setCurrentBookings] = useState([]);
  const [selectedDecorUsed, setSelectedDecorUsed] = useState(new Set());

  function formatDate(date) {
    const day = date.getDate();
    const month = date.getMonth() + 1; // Months are zero-based, so we add 1
    const year = date.getFullYear();

    return `${day}/${month}/${year}`;
  }

  const handleStartDateChange = (event, selectedDate) => {
    const currentDate = selectedDate || startDate;
    setStartShow(Platform.OS === "ios");
    setStartDate(currentDate);
    // const fetchDate = formatDate(currentDate)
    // fetchBookings(fetchDate)

    let tempDate = new Date(currentDate);
    let fDate =
      tempDate.getDate() +
      "/" +
      (tempDate.getMonth() + 1) +
      "/" +
      tempDate.getFullYear();
    setStartText(fDate);
  };

  const handleStartTimeChange = (event, selectedTime) => {
    const currentTime = selectedTime || startDate;
    setStartShow(Platform.OS === "ios");
    setStartDate(currentTime);

    let tempTime = new Date(currentTime);
    let fTime =
      "Hours: " + tempTime.getHours() + " | Minutes: " + tempTime.getMinutes();
    setStartTimeText(fTime);
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
  };

  const handleEndTimeChange = (event, selectedTime) => {
    const currentTime = selectedTime || endDate;
    setEndShow(Platform.OS === "ios");
    setEndDate(currentTime);

    let tempTime = new Date(currentTime);
    let fTime =
      "Hours: " + tempTime.getHours() + " | Minutes: " + tempTime.getMinutes();
    setEndTimeText(fTime);
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

  useEffect(() => {
    const fetchBookings = async (selectedDate) => {
      // fetching logic remains the same...
      // instead of setting imageURL directly, update currentBookings
      try {
        const snapshot = await db()
          .ref(`bookings`)
          .orderByChild("id")
          .startAt(selectedDate)
          .once("value");

        const bookingsObj = snapshot.val();
        const bookings = Object.values(bookingsObj || []);

        console.log("Bookings for Start Date:", bookings);
        setCurrentBookings(bookings);
      } catch (error) {
        console.log("Error fetching bookings:", error);
      }
    };

    fetchBookings(formatDate(startDate));
  }, [startDate, endDate]);

  useEffect(() => {
    const newSelectedDecorUsed = new Set();

    currentBookings.forEach((booking) => {
      const { start, end, selectedDecor } = booking;

      const bookingStartDate = new Date(start);
      const bookingEndDate = new Date(end);
      const currentStartDate = new Date(startDate);
      const currentEndDate = new Date(endDate);

      if (
        currentStartDate < bookingEndDate &&
        currentEndDate > bookingStartDate
      ) {
        if (selectedDecor && Array.isArray(selectedDecor)) {
          selectedDecor.forEach((decor) => {
            newSelectedDecorUsed.add(decor);
          });
        }
      }
    });

    console.log("Selected Decor Used:", Array.from(newSelectedDecorUsed));
    setSelectedDecorUsed(newSelectedDecorUsed);
  }, [currentBookings, startDate, endDate]);

  useEffect(() => {
    if (imageURL && Array.isArray(imageURL)) {
      const filteredImageURL = imageURL.filter(
        (url) => !selectedDecorUsed.has(url)
      );
      setImageURL(filteredImageURL);
    }
  }, [selectedDecorUsed]);

  const handleSubmit = () => {
    console.log("hit");
    try {
      const startISOString = startDate.toISOString();
      const endISOString = endDate.toISOString();
      const randomColor = genRandomHexColor();
      const Id = formatDate(startDate);
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
      Alert.alert("Submit", "The event has been booked!");
      navigation.navigate("Home");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    const fetchImagesFromFirebase = async () => {
      try {
        const storageRef = storage().ref("images/"); // Replace with your reference (directory) path
        const imagesSnapshot = await storageRef.listAll();
        const downloadPromises = imagesSnapshot.items.map((imageRef) =>
          imageRef.getDownloadURL()
        );
        const downloadURLs = await Promise.all(downloadPromises);
        return downloadURLs;
      } catch (error) {
        console.log("Error fetching images from Firebase Storage:", error);
        return [];
      }
    };

    const getImageURL = async () => {
      try {
        const urls = await fetchImagesFromFirebase();
        //console.log('Image URLs:', urls);
        setImageURL(urls);
      } catch (error) {
        console.log("Error getting image URLs:", error);
      }
    };

    getImageURL();
  }, [startDate]);

  const imageContainerHeight = decor === "Yes" ? 200 : 40;

  return (
    <ScrollView>
      <SafeAreaView style={styles.container}>
        <View style={styles.section}>
        <Text style={styles.heading} >Event Starts</Text>
        <View style={styles.row}>
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
          </View>
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
        <Text style={styles.heading} >Event Ends</Text>
        <View style={styles.row}>
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
          </View>
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
        <Text style={styles.heading} >Event Information</Text>
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
            <Text style={styles.heading} >Decor</Text>
            <View style={styles.row} >
                <TouchableOpacity
                style={styles.button}
                       onPress={() => setDecor("Yes")}
                       color={decor === "Yes" ? "#FFD700" : "#CCCCCC"}>
                    <Text style={styles.buttonText}>Yes</Text>
                </TouchableOpacity>
                <TouchableOpacity
                style={styles.button}
                  onPress={() => setDecor("No")}
                  color={decor === "No" ? "#FFD700" : "#CCCCCC"}>
                    <Text style={styles.buttonText}>No</Text>
                </TouchableOpacity>
            </View>
          </View>

          <View
            style={[styles.imageContainer, { height: imageContainerHeight }]}
          >
            {decor === "Yes" && (
              <ScrollView horizontal={true}>
                <View style={styles.imageScrollContainer}>
                  {imageURL.map((url, index) => (
                    <TouchableOpacity
                      key={index}
                      onPress={() => {
                        const isSelected = selectedImages.includes(url);

                        if (isSelected) {
                          setSelectedImages(
                            selectedImages.filter((image) => image !== url)
                          );
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
<View style={styles.btnContainer}>
<TouchableOpacity style={styles.submitBtn} onPress={handleSubmit}>
          <Text style={styles.submitbtntext}>Submit</Text>
        </TouchableOpacity>
</View>
      
        </View>
      </SafeAreaView>
    </ScrollView>
  );
};

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
      paddingHorizontal: 8,
      color: "#2c3032",
      backgroundColor: "#fff",
      borderRadius: 15
    },
    button: {
        width: "50%",
        paddingVertical: 10,
        borderRadius: 30,
        marginBottom: 15,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
      },
      submitBtn: {
        width: "50%",
        backgroundColor: "#FFD700",
        paddingVertical: 10,
        borderRadius: 30,
        marginBottom: 15,
        shadowColor: "#000",
        shadowOffset: {
          width: 0,
          height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5,
      },
      btnContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
      },
      buttonText: {
        color: "#fff",
        fontWeight: "bold",
        textAlign: "center",
      },
      submitbtntext: {
        color: "black",
        fontWeight: "bold",
        textAlign: "center",
      }
  });
export default AddEvent;
