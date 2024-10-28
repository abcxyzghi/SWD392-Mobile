import {
  View,
  Text,
  StyleSheet,
  Pressable,
  Keyboard,
  FlatList,
  ActivityIndicator,
} from "react-native";
import React, { useEffect, useState } from "react";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { useNavigation } from "expo-router";
import axios from "axios";
import Header from "@/components/header/Header";
import Search from "@/components/search/Search";
import FilterBar from "@/components/filterBar/FilterBar";
import CardItem from "@/components/cardItem/CardItem";
import api from "@/api/axiosInstance";
const styles = StyleSheet.create({});

export const HomeScreen = () => {
  const insets = useSafeAreaInsets();
  const navigation =
    useNavigation();

  const [selectedFilter, setSelectedFilter] = useState("All");
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchText, setSearchText] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "https://659d0984633f9aee790872a1.mockapi.io/api/MMA"
        );
        setData(response.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  },[]);

  const brands = Array.from(new Set(data.map((item) => item.brand)));

  const filteredData = data.filter((item) => {
    const matchesBrand = selectedFilter === "All" ? true : item.brand === selectedFilter;
    const matchesSearchText = item.artName
      .toLowerCase()
      .includes(searchText.toLowerCase());
    return matchesBrand && matchesSearchText;
  });

  if (loading) {
    return (
      <View style={{ flex: 1, display: "flex", justifyContent: "center" }}>
        <ActivityIndicator size="large" color="#d0d0d0" />
      </View>
    );
  }

  return (
    <Pressable onPress={Keyboard.dismiss} style={{ flex: 1 }}>
      <View style={{ paddingTop: insets.top, flex: 1 }}>
        <Header />
        <Search onSearch={setSearchText}/>
        <FilterBar
          brands={brands}
          selectedFilter={selectedFilter}
          setSelectedFilter={setSelectedFilter}
        />
        <FlatList
          data={filteredData}
          style={{ flex: 1 }}
          numColumns={2}
          contentContainerStyle={{ paddingBottom: insets.bottom + 65 }}
          renderItem={({ item }) => (
            <Pressable
              onPress={() => navigation.navigate("DetailScreen", { item })}
              style={{flex:1}}
            >
              <CardItem item={item} />
            </Pressable>
          )}
          keyExtractor={(item) => item.id}
        />
      </View>
    </Pressable>
  );
}

export default HomeScreen;