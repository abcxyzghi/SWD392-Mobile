import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, Alert } from 'react-native';
import axios from 'axios'; // You can use fetch as well

const PostItem = () => {
  const [itemName, setItemName] = useState('');
  const [price, setPrice] = useState('');
  const [type, setType] = useState('sell'); // Default type is "sell"

  const handlePost = () => {
    if (itemName === '' || price === '') {
      Alert.alert('Error', 'Please fill all the fields');
      return;
    }

    // Prepare the data
    const data = {
      itemName,
      price,
      type, // "sell" or "rent"
    };

    // Make the post request
    axios.post('https://your-api-url.com/post-item', data)
      .then(response => {
        Alert.alert('Success', `Item posted successfully as ${type}`);
      })
      .catch(error => {
        Alert.alert('Error', 'There was an error posting the item');
        console.log(error);
      });
  };

  return (
    <View style={styles.container}>
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

      <Button
        title="Post Item"
        onPress={handlePost}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
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
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginVertical: 20,
  },
});

export default PostItem;
