import React, { useContext } from "react";
import { View, Text, Pressable } from "react-native";
import { Image } from "../ui/image";
import { Heading } from "../ui/heading";
import { Card } from "../ui/card";
import { AntDesign } from "@expo/vector-icons";

import { StyleSheet } from "nativewind";


const styles = StyleSheet.create({
  heartIcon: {
    position: "absolute",
    bottom: 10,
    right: 10,
  },
  footerCard: {
    flexDirection: "row",
  },
});

const CardItem = ({ item }) => {

  return (
    <Card className="p-5 rounded-lg max-w-[100%] m-3">
      <Image
        source={{
          uri: item.image,
        }}
        alt={item.artName}
        className="mb-6 h-[150px] w-full rounded-md"
      />
      <Text
        className="text-sm font-normal mb-2 text-typography-700 max-h-10"
        style={{fontWeight: "700"}}
        numberOfLines={2}
        ellipsizeMode="tail"
      >
        {item.artName}
      </Text>
      <Heading size="md" className="mb-4">
        ${item.price}
      </Heading>
      <View style={styles.footerCard}>
        <Text className="text-sm font-normal mb-2 text-typography-700">
          {item.brand}
        </Text>
        <Pressable style={styles.heartIcon} 
        // onPress={() => toggleFavorite(item)}
        >
          <AntDesign
            name={"hearto"}
            size={22}
            color={"gray"}
          />
        </Pressable>
      </View>
    </Card>
  );
};

export default CardItem;