import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Alert,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
  ScrollView,
  SafeAreaView
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import axios from 'axios';

const PostItem = () => {
  const [itemName, setItemName] = useState('');
  const [price, setPrice] = useState('');
  const [type, setType] = useState('sell');
  const [imageUri, setImageUri] = useState(null);

  const handleImagePick = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      Alert.alert("Permission required", "Permission to access media library is required.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.cancelled) {
      setImageUri(result.uri);
    }
  };

  const handlePost = () => {
    if (itemName === '' || price === '' || !imageUri) {
      Alert.alert('Error', 'Please fill all fields and select an image');
      return;
    }

    const data = new FormData();
    data.append('itemName', itemName);
    data.append('price', price);
    data.append('type', type);
    data.append('image', {
      uri: imageUri,
      name: 'itemImage.jpg',
      type: 'image/jpeg',
    });

    axios.post('https://your-api-url.com/post-item', data, {
      headers: { 'Content-Type': 'multipart/form-data' },
    })
      .then(response => {
        Alert.alert('Success', `Item posted successfully as ${type}`);
      })
      .catch(error => {
        Alert.alert('Error', 'There was an error posting the item');
        console.log(error);
      });
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.container}>
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <Text style={styles.label}>Item Name:</Text>
          <TextInput
            style={styles.input}
            value={itemName}
            onChangeText={setItemName}
            placeholder="Enter item name"
          />

          <Text style={styles.label}>Price:</Text>
          <TextInput
            style={styles.input}
            value={price}
            onChangeText={setPrice}
            placeholder="Enter price"
            keyboardType="numeric"
          />

          <Text style={styles.label}>Image:</Text>
          <TouchableOpacity onPress={handleImagePick} style={styles.imagePicker}>
            {imageUri ? (
              <Image source={{ uri: imageUri }} style={styles.image} />
            ) : (
              <Text>Select an Image</Text>
            )}
          </TouchableOpacity>

          <Text style={styles.label}>Post Type:</Text>
          <View style={styles.buttonContainer}>
            <Button
              title="Sell"
              onPress={() => setType('sell')}
              color={type === 'sell' ? 'green' : 'gray'}
            />
            <Button
              title="Rent"
              onPress={() => setType('rent')}
              color={type === 'rent' ? 'green' : 'gray'}
            />
          </View>

          <View style={styles.postButtonContainer}>
            <Button
              title="Post Item"
              onPress={handlePost}
              color="blue"
            />
          </View>
        </ScrollView>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  scrollContainer: {
    justifyContent: 'center',
    alignItems: 'stretch',
    paddingBottom: 20, // Add some bottom padding to the scroll view
  },
  label: {
    fontSize: 16,
    marginVertical: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 5,
  },
  imagePicker: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 5,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 20,
  },
  postButtonContainer: {
    marginVertical: 20,
  },
});

export default PostItem;
