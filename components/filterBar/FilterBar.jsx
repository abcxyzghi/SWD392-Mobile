import { View, Text, StyleSheet, Pressable, ScrollView } from "react-native";
import React from "react";

const styles = StyleSheet.create({
  filterBar: {
    flexDirection: "row",
    margin: 10,
  },
  filterButton: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    borderRadius: 20,
    backgroundColor: "#f0f0f0",
  },
  activeFilterButton: {
    backgroundColor: "#d0d0d0",
  },
});



const FilterBar = ({
  selectedFilter,
  setSelectedFilter,
  brands,
}) => {
  return (
    <View style={styles.filterBar}>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        //   contentContainerStyle={styles.filterBar}
      >
        <Pressable
          onPress={() => setSelectedFilter("All")}
          style={[
            styles.filterButton,
            selectedFilter === "All" && styles.activeFilterButton,
          ]}
        >
          <Text>All</Text>
        </Pressable>

        {brands.map((brand) => (
          <Pressable
            key={brand}
            onPress={() => setSelectedFilter(brand)}
            style={[
              styles.filterButton,
              selectedFilter === brand && styles.activeFilterButton,
            ]}
          >
            <Text>{brand}</Text>
          </Pressable>
        ))}
      </ScrollView>
    </View>
  );
};

export default FilterBar;