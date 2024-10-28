import {
  View,
  ActivityIndicator,
  FlatList,
  Pressable,
  Keyboard,
  StyleSheet,
  Text,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation, useRouter } from "expo-router";
import Header from "@/components/header/Header";
import Search from "@/components/search/Search";
import CardItem from "@/components/cardItem/CardItem";
import api from "@/api/axiosInstance";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    display: "flex",
    justifyContent: "center",
  },
  flatList: {
    flex: 1,
  },
});

export const HomeScreen = () => {
  const insets = useSafeAreaInsets();
  const navigation = useNavigation();

  const handleNavigateToDetail = (item) => {
    navigation.navigate("DetailScreen", { id: item.id }); // Pass the id as a parameter
  };

  const [categories, setCategories] = useState([]); // State to hold categories
  const [data, setData] = useState([]); // State to hold product data
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");

  // Function to fetch product data
  const fetchData = async () => {
    try {
      const response = await api.get("post"); // Adjusted endpoint for products
      setData(response.data); // Assuming response.data.payload contains the product data
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // Function to fetch categories (brands)
  const fetchDataCategory = async () => {
    try {
      const response = await api.get("category"); // Fetch categories from the API
      console.log("Categories fetched:", response.data.payload);
      setCategories(response.data.payload); // Assuming response.data.payload contains the category data
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  useEffect(() => {
    const loadData = async () => {
      await fetchData(); // Fetch product data first
      await fetchDataCategory(); // Then fetch categories from the API
      setLoading(false);
    };

    loadData();
  }, []);

  if (loading) {
    return (
      <View style={styles.container}>
        <ActivityIndicator size="large" color="#d0d0d0" />
      </View>
    );
  }

  return (
    <Pressable onPress={Keyboard.dismiss} style={{ flex: 1 }}>
      <View style={{ paddingTop: insets.top, flex: 1 }}>
        <Header />
        <Search onSearch={setSearchText} />

        {/* Display categories (brands) */}
        <View style={{ padding: 10 }}>
          <FlatList
            data={categories} // Use categories fetched from the API
            renderItem={({ item }) => (
              <Pressable
                onPress={() => console.log(`Selected category: ${item}`)} // Handle category selection if needed
                style={{
                  padding: 10,
                  borderBottomWidth: 1,
                  borderBottomColor: "#ccc",
                }}
              >
                <Text style={{ fontSize: 18 }}>{item.toyName}</Text>{" "}
                {/* Display toyName as category */}
              </Pressable>
            )}
            keyExtractor={(item) => item.toyName} // Use toyName as key
          />
        </View>

        {/* Display product items filtered by search text */}
        <FlatList
          data={data.filter((item) =>
            item.toyName.toLowerCase().includes(searchText.toLowerCase())
          )} // Filter data based on search text
          style={styles.flatList}
          numColumns={2}
          contentContainerStyle={{ paddingBottom: insets.bottom + 65 }}
          renderItem={({ item }) => (
            <Pressable
              onPress={() => handleNavigateToDetail(item)}
              style={{ flex: 1 }}
            >
              <CardItem item={item} />
            </Pressable>
          )}
          keyExtractor={(item) => item.id.toString()} // Ensure id is a string
        />
      </View>
    </Pressable>
  );
};

export default HomeScreen;
