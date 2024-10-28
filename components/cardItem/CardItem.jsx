import React from "react";
import { View, Text, Pressable } from "react-native";
import { Image } from "../ui/image";
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
    flexDirection: "column", // Change to column to stack the items vertically
    alignItems: "flex-start", // Aligns items in the footer
    marginTop: 10, // Adds space above the footer
  },
  priceText: {
    fontSize: 14,
    fontWeight: "bold",
    color: "#333",
  },
  badge: {
    backgroundColor: "#ffcc00", // Customize badge color
    padding: 5,
    borderRadius: 5,
    alignSelf: "flex-start", // Aligns the badge to the start
    marginBottom: 8, // Adds space below the badge
  },
  badgeText: {
    fontSize: 12,
    fontWeight: "bold",
    color: "#fff", // Text color for badge
  },
  toyNameText: {
    fontSize: 14,
    fontWeight: "700",
    marginBottom: 8, // Adds space below toy name
    color: "#333", // Customize text color
  },
});

const CardItem = ({ item }) => {
  // Fallback image URL
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
  const defaultImageUri =
    "https://www.gravatar.com/avatar/2c7d99fe281ecd3bcd65ab915bac6dd5?s=250";

  // Check if the item's image URL is valid (not null or empty)
  const imageUri = isValidImageUrl(item.imageUrl)
    ? item.imageUrl
    : defaultImageUri;

  // Calculate total cost (example calculation for one day)
  const totalPrice = item.priceByDay + item.depositFee;

  return (
    <Card className="p-5 rounded-lg max-w-[100%] m-3">
      <Image
        source={{
          uri: imageUri,
        }}
        alt={item.toyName}
        className="mb-4 h-[150px] w-full rounded-md"
      />

      {/* Badge for postType */}
      <View style={styles.badge}>
        <Text style={styles.badgeText}>{item.postType}</Text>
      </View>

      <Text
        style={styles.toyNameText}
        numberOfLines={2} // Truncate after 2 lines
        ellipsizeMode="tail" // Show ellipsis for overflow
      >
        {item.toyName}
      </Text>

      <View style={styles.footerCard}>
        <Text style={styles.priceText}>Price: ${item.priceByDay} / Day</Text>
        <Text style={styles.priceText}>Deposit: ${item.depositFee}</Text>
        <Text style={styles.priceText}>
          Total: ${totalPrice} {/* Displaying the total cost */}
        </Text>

        <Pressable style={styles.heartIcon}>
          <AntDesign name={"hearto"} size={22} color={"gray"} />
        </Pressable>
      </View>
    </Card>
  );
};

export default CardItem;
