
import React, { useContext, useState } from "react";
import {
    View,
    Text,
    Image,
    ScrollView,
    Pressable,
    StyleSheet,
} from "react-native";
// import { Divider } from "react-native-paper";
import Ionicons from "@expo/vector-icons/Ionicons";
import { useRoute } from "@react-navigation/native";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { AntDesign } from "@expo/vector-icons";


const ProductDetail = () => {
    const insets = useSafeAreaInsets();
    const route = useRoute();
    const { item } = route.params;

    const [userRating, setUserRating] = useState(0);
    const [hasRated, setHasRated] = useState(false);

    // Tính số lượt đánh giá theo mức sao
    const ratingCounts = item.comments.reduce(
        (acc, comment) => {
            acc[comment.rating] = (acc[comment.rating] || 0) + 1;
            return acc;
        },
        { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 } // Khởi tạo cho từng mức sao
    );

    // Tính tổng số đánh giá
    const totalReviews = Object.values(ratingCounts).reduce((sum, count) => sum + count, 0);

    // Tính tỷ lệ cho mỗi mức đánh giá
    const getRatingPercentage = (count) => (totalReviews > 0 ? (count / totalReviews) * 100 : 0);

    // Tính rating trung bình từ comment
    const calculateAverageRating = (
        comments,
        currentUserRating
    ) => {
        const totalRating = comments.reduce(
            (sum, comment) => sum + comment.rating,
            0
        );
        const totalReviews = comments.length + (hasRated ? 1 : 0);

        return totalReviews > 0
            ? ((totalRating + currentUserRating) / totalReviews).toFixed(1)
            : "0";
    };

    const averageRating = calculateAverageRating(
        item.comments,
        hasRated ? userRating : 0
    );
    const numberOfReviews = item.comments.length + (hasRated ? 1 : 0);

    const formatDate = (date) => {
        const d = new Date(date);
        return `${d.getDate()}/${d.getMonth() + 1}/${d.getFullYear()}`;
    };

    const handleUserRating = (rating) => {
        setUserRating(rating);
        if (!hasRated) {
            setHasRated(true);
        }
    };


    const discountedPrice = item.price * (1 - item.limitedTimeDeal);


    const discountPercentage = (item.limitedTimeDeal * 100).toFixed(0);

    return (
        <ScrollView style={[{ paddingTop: insets.top }, styles.container]}>
            <View style={styles.imageContainer}>
                <Image source={{ uri: item.image }} style={styles.productImage} />
            </View>

            <View style={styles.infoContainer}>
                <Text style={styles.artName}>{item.artName}</Text>
                <Text style={styles.deal}>Limited Time Deal: {discountPercentage}% OFF</Text>

                <View style={styles.ratingContainer}>
                    <Ionicons name="star" size={20} color="gold" />

                    <Text style={styles.ratingText}>{averageRating} / 5</Text>
                    <Text style={styles.reviewCount}>({numberOfReviews} reviews)</Text>
                </View>


                <View style={styles.priceContainer}>
                    <View>
                        <Text style={styles.discountedPrice}>${discountedPrice.toFixed(2)}</Text>
                        <Text style={styles.originalPrice}>${item.price}</Text>
                    </View>

                    <Pressable onPress={() => toggleFavorite(item)}>
                        <AntDesign
                            name={"hearto"}
                            size={28}
                            color={"gray"}
                            style={styles.heartIcon}
                        />
                    </Pressable>
                </View>

            </View>

            {/* <Divider style={styles.divider} /> */}

            <View style={styles.descriptionContainer}>
                <Text style={styles.brandText}>{item.brand}</Text>
                <Text style={styles.description}>{item.description}</Text>
            </View>

            <View style={[{ paddingBottom: insets.bottom + 30 }, styles.commentsContainer]}>
                <Text style={styles.sectionTitle}>Reviews</Text>

                {/* Thay thế phần hiển thị reviewCount bằng thanh ngang */}
                <View style={styles.ratingDistribution}>
                    {[5, 4, 3, 2, 1].map(stars => (
                        <View key={stars} style={styles.ratingRow}>
                            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                                {[...Array(stars)].map((_, i) => (
                                    <Ionicons key={i} name="star" size={16} color="gold" />
                                ))}
                            </View>
                            <View style={styles.progressBarContainer}>
                                <View
                                    style={[
                                        styles.progressBar,
                                        { width: `${getRatingPercentage(ratingCounts[stars])}%` }
                                    ]}
                                />
                            </View>
                            <Text style={styles.reviewCount}>{ratingCounts[stars]} </Text>
                        </View>
                    ))}
                </View>

                {item.comments?.map((comment, index) => (
                    <View key={index} style={styles.commentContainer}>
                        <View style={{ flexDirection: "row" }}>
                            <Text style={styles.commentUser}>{comment.user}</Text>
                            <Text style={styles.commentDate}>{formatDate(comment.date)}</Text>
                        </View>
                        <View style={styles.commentRating}>
                            {[...Array(comment.rating)].map((_, i) => (
                                <Ionicons key={i} name="star" size={16} color="gold" />
                            ))}
                        </View>
                        <Text style={styles.commentText}>{comment.comment}</Text>
                    </View>
                ))}
            </View>

            {/* <Divider style={styles.divider} /> */}
        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
    },
    imageContainer: {
        width: "100%",
        height: 300,
        backgroundColor: "#f5f5f5",
        justifyContent: "center",
        alignItems: "center",
    },
    productImage: {
        width: "100%",
        height: "100%",
        resizeMode: "contain",
        backgroundColor: "white",
    },
    brandText: {
        fontSize: 20,
        fontWeight: "800",
        color: "#333",
        marginBottom: 15,
    },
    infoContainer: {
        padding: 16,
    },
    artName: {
        fontSize: 18,
        fontWeight: "bold",
        marginBottom: 8,
    },
    ratingContainer: {
        flexDirection: "row",
        alignItems: "center",
        marginBottom: 10,
    },
    ratingText: {
        marginLeft: 5,
        fontSize: 16,
    },
    reviewCount: {
        marginLeft: 10,
        fontSize: 14,
        color: "#888",
    },
    priceContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
    },
    discountedPrice: {
        fontSize: 24,
        fontWeight: "bold",
        color: "red",
    },
    originalPrice: {
        fontSize: 18,
        color: "#888",
        textDecorationLine: "line-through",
        marginTop: 4,
        opacity: 0.6,
    },
    heartIcon: {
        marginLeft: 10,
    },
    deal: {
        fontSize: 14,
        color: "green",
        marginBottom: 15,
    },
    divider: {
        marginBottom: 15,
    },
    descriptionContainer: {
        paddingHorizontal: 16,
    },
    sectionTitle: {
        fontSize: 18,
        fontWeight: "bold",
    },
    description: {
        fontSize: 14,
        color: "#666",
        fontWeight: 700,
    },
    commentsContainer: {
        padding: 16,
    },
    commentContainer: {
        marginBottom: 15,
        borderColor: "#ddd",
        borderWidth: 1,
        borderRadius: 5,
        padding: 10,
        backgroundColor: "#f9f9f9",
    },
    commentUser: {
        fontWeight: "bold",
        marginBottom: 5,
    },
    commentDate: {
        fontSize: 12,
        color: "#888",
        marginBottom: 5,
        marginLeft: 20,
    },
    commentRating: {
        flexDirection: "row",
        marginBottom: 5,
    },
    commentText: {
        fontSize: 14,
        color: "#333",
    },
    ratingDistribution: {
        marginVertical: 10,
    },
    ratingRow: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        marginBottom: 5,
    },
    progressBarContainer: {
        flex: 1,
        marginHorizontal: 10,
        height: 10,
        backgroundColor: "#e0e0e0",
        borderRadius: 5,
    },
    progressBar: {
        height: 10,
        backgroundColor: "#ffc107",
        borderRadius: 5,
    },
});

export default ProductDetail;