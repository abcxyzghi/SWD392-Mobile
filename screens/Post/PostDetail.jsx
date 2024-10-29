import React, { useEffect, useState } from "react";
import {
  Image,
  View,
  Text,
  TouchableOpacity,
  ActivityIndicator,
  Alert,
} from "react-native";
import { Stack, useNavigation, useRouter } from "expo-router";
import Feather from "@expo/vector-icons/Feather";
import { AntDesign } from "@expo/vector-icons";
import api from "@/api/axiosInstance";
import Colors from "@/constants/Colors";

const DetailScreen = ({ route }) => {
  const { id } = route.params; // Extracting the ID from route parameters
  const [data, setData] = useState(null); // State for storing fetched data
  const [isFavorite, setIsFavorite] = useState(false); // State for favorite status
  const navigation = useNavigation();
  // Effect to fetch data when component mounts or ID changes
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await api.get(`post/${id}`);
        setData(response.data); // Update state with fetched data
        setIsFavorite(false); // Reset favorite status
      } catch (error) {
        console.error("Error fetching data:", error); // Log any errors
      }
    };
    fetchData();
  }, [id]);

  // Function to handle favorite button press
  const handleFavoritePress = () => {
    setIsFavorite((prev) => {
      const newFavoriteStatus = !prev; // Toggle favorite status
      showAlert(newFavoriteStatus); // Show alert based on new status
      return newFavoriteStatus; // Return new favorite status
    });
  };

  // Function to show alert for favorite status change
  const showAlert = (newFavoriteStatus) => {
    Alert.alert(
      newFavoriteStatus ? "Added to Favorite" : "Removed from Favorite",
      `You have ${newFavoriteStatus ? "added" : "removed"} this item to your favorites.`,
      [{ text: "OK", onPress: () => console.log("Alert closed") }] // Alert button
    );
  };

  // Function to validate image URL
  const isValidImageUrl = (url) => {
    return (
      url &&
      (url.startsWith("http://") || url.startsWith("https://")) &&
      (url.endsWith(".jpg") ||
        url.endsWith(".jpeg") ||
        url.endsWith(".png") ||
        url.endsWith(".gif"))
    );
  };

  // Default image URL for cases where the image is invalid
  const defaultImageUri =
    "https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250";

  // Determine the image URI to use
  const imageUri = isValidImageUrl(data?.imageUrl)
    ? data.imageUrl
    : defaultImageUri;

  return (
    <>
      <Stack.Screen
        options={{
          headerTransparent: true,
          headerTitle: "",
          headerLeft: () => (
            <TouchableOpacity
              className="border-2 border-gray-200 bg-gray-50 rounded-lg p-1"
              onPress={() => {
                navigation.goBack(); // Navigate back to previous screen
              }}
            >
              <Feather name="arrow-left" size={24} color="black" />
            </TouchableOpacity>
          ),
          headerRight: () => (
            <TouchableOpacity
              style={{ padding: 10 }}
              onPress={handleFavoritePress}
            >
              <AntDesign
                name={isFavorite ? "heart" : "hearto"}
                size={22}
                color={isFavorite ? Colors.red : "gray"}
              />
            </TouchableOpacity>
          ),
        }}
      />
      <View>
        <View className="h-80 w-full">
          <Image
            source={{
              uri: imageUri,
            }}
            className="object-cover flex w-full h-full"
          />
        </View>

        {!data ? (
          <View className="flex-1 justify-center items-center">
            <ActivityIndicator size="large" />
            <Text className="mt-4 text-gray-500">Loading data...</Text>
          </View>
        ) : (
          <View className="p-5">
            <Text className="font-bold text-xl">{data?.toyName}</Text>
            <View className="flex flex-row justify-between my-4">
              <View className="flex flex-row gap-2">
                <Text className="font-semibold text-md">Quantity:</Text>
                <Text className="text-md">{data?.quantity}</Text>
              </View>
              <View className="flex flex-row gap-2">
                <Text className="font-semibold text-md">Status:</Text>
                <Text className="text-md">{data?.status}</Text>
              </View>
            </View>
            <Text className="text-md font-semibold mt-1 text-yellow-500">
              ${data?.price}
            </Text>
            <View className="my-4">
              <Text className="font-light text-lg">{data?.description}</Text>
            </View>
            <View className="my-4 flex">
              <Text className="font-light text-lg mb-1">
                Post Type: {data?.postType}
              </Text>
              <Text className="font-light text-lg mb-1">
                Deposit Fee: ${data?.depositFee}
              </Text>
              <Text className="font-light text-lg mb-1">
                Price By Day: ${data?.priceByDay}
              </Text>
            </View>

            <View className="p-5">
              <TouchableOpacity
                className="bg-blue-500 rounded-lg p-3"
                // onPress={() =>
                //   router.push({
                //     pathname: "/comments",
                //     params: { id: data?.id },
                //   })
                // }
              >
                <Text className="text-white text-center text-xl font-bold">
                  See Comments
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        )}
      </View>
    </>
  );
};

export default DetailScreen;
