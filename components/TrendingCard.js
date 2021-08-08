import React from "react";
import {
  View,
  TouchableOpacity,
  Image,
  Text,
  Platform,
  StyleSheet,
} from "react-native";
import { SIZES, FONTS, COLORS, icons } from "../constants";
import { BlurView } from "@react-native-community/blur";
const RecipeCardDetails = ({ recipeItem }) => {
  return (
    <View
      style={{
        flex: 1,
      }}
    >
      {/* Name and Bookmark */}
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          justifyContent: "space-between",
        }}
      >
        <Text
          style={{
            width: "70%",
            color: COLORS.white,
            ...FONTS.h3,
            fontSize: 18,
          }}
        >
          {recipeItem.name}
        </Text>
        <Image
          source={recipeItem.isBookmar ? icons.bookmarkFilled : icons.bookmark}
          style={{
            width: 20,
            height: 20,
            marginRight: SIZES.base,
            tintColor: COLORS.darkGreen,
          }}
        />
      </View>

      {/* Duration and  serving */}
      <Text
        style={{
          color: COLORS.lightGray,
          ...FONTS.body4,
        }}
      >
        {recipeItem.duration} | {recipeItem.serving} Serving
      </Text>
    </View>
  );
};
const RecipeCardInfo = ({ recipeItem }) => {
  if (Platform.OS === "ios") {
    return (
      <BlurView blurType="dark" style={styles.container}>
        <RecipeCardDetails recipeItem={recipeItem} />
      </BlurView>
    );
  } else {
    return (
      <View
        style={{
          ...styles.container,
          backgroundColor: COLORS.transparentDarkGray,
        }}
      >
        <RecipeCardDetails recipeItem={recipeItem} />
      </View>
    );
  }
};
const TrendingCard = ({ containerStyle, recipeItem, onPress }) => {
  return (
    <TouchableOpacity
      style={{
        height: 350,
        width: 250,
        marginTop: SIZES.radius,
        marginRight: 20,
        borderRadius: SIZES.radius,
        ...containerStyle,
      }}
      onPress={onPress}
    >
      {/* BackgroundImage */}
      <Image
        source={recipeItem.image}
        resizeMode="cover"
        style={{
          height: 350,
          width: 250,
          borderRadius: SIZES.radius,
        }}
      />
      {/* Catagagory */}

      <View
        style={{
          position: "absolute",
          top: 20,
          left: 15,
          paddingHorizontal: SIZES.radius,
          paddingVertical: 5,
          backgroundColor: COLORS.transparentGray,
          borderRadius: SIZES.radius,
        }}
      >
        <Text
          style={{
            color: COLORS.white,
            ...FONTS.h4,
          }}
        >
          {recipeItem.category}
        </Text>
      </View>
      {/* RecipeCardInfo */}
      <RecipeCardInfo recipeItem={recipeItem} />
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    bottom: 10,
    left: 10,
    right: 10,
    height: 100,
    paddingVertical: SIZES.radius,
    paddingHorizontal: SIZES.base,
    borderRadius: SIZES.radius,
  },
});
export default TrendingCard;
