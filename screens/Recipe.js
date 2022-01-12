import React, { useRef } from "react";
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  Animated,
  Platform,
} from "react-native";

import { BlurView } from "@react-native-community/blur";
import { COLORS, FONTS, SIZES, icons } from "../constants";

import { Viewers } from "../components";
const HEADER_HEIGHT = 350;

const Recipe = ({ navigation, route }) => {
  const [selectedRecipe, setSelectedRecipe] = React.useState(null);
  const scrollY = useRef(new Animated.Value(0)).current;
  React.useEffect(() => {
    let { recipe } = route.params;
    setSelectedRecipe(recipe);
  }, []);

  function renderHeaderBar() {
    return (
      <View
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          height: 80,
          flexDirection: "row",
          alignItems: "flex-end",
          justifyContent: "space-between",
          paddingHorizontal: SIZES.padding,
          paddingBottom: 10,
        }}
      >
        {/* Screen Overlay */}
        <Animated.View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundColor: COLORS.black,
            opacity: scrollY.interpolate({
              inputRange: [HEADER_HEIGHT - 100, HEADER_HEIGHT - 70],
              outputRange: [0, 1],
            }),
          }}
        />

        {/* Header Bar */}

        <Animated.View
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            alignItems: "center",
            justifyContent: "flex-end",
            paddingBottom: 10,
            opacity: scrollY.interpolate({
              inputRange: [HEADER_HEIGHT - 100, HEADER_HEIGHT - 50],
              outputRange: [0, 1],
            }),
            transform: [
              {
                translateY: scrollY.interpolate({
                  inputRange: [HEADER_HEIGHT - 100, HEADER_HEIGHT - 50],
                  outputRange: [50, 0],
                  extrapolate: "clamp",
                }),
              },
            ],
          }}
        >
          <Text style={{ color: COLORS.lightGray2, ...FONTS.body4 }}>
            Recipe By:{" "}
          </Text>
          <Text style={{ color: COLORS.white2, ...FONTS.h3 }}>
            {selectedRecipe?.author?.name}
          </Text>
        </Animated.View>

        {/* Back Button */}

        <TouchableOpacity
          style={{
            alignItems: "center",
            justifyContent: "center",
            height: 35,
            width: 35,
            borderRadius: 18,
            borderWidth: 1,
            borderColor: COLORS.lightGray,
            backgroundColor: COLORS.transparentBlack5,
          }}
          onPress={() => navigation.goBack()}
        >
          <Image
            source={icons.back}
            style={{
              width: 15,
              height: 15,
              tintColor: COLORS.lightGray,
            }}
          ></Image>
        </TouchableOpacity>
        {/* Bookmark */}

        <TouchableOpacity
          style={{
            alignItems: "center",
            justifyContent: "center",
            height: 35,
            width: 35,
          }}
        >
          <Image
            source={
              selectedRecipe?.isBookmark ? icons.bookmarkFilled : icons.bookmark
            }
            style={{
              width: 30,
              height: 30,
              tintColor: COLORS.darkGreen,
            }}
          ></Image>
        </TouchableOpacity>
      </View>
    );
  }

  const RecipeCreaterCardDetails = ({ selectedRecipe }) => {
    return (
      <View
        style={{
          flex: 1,
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        {/* Profile Photo */}
        <View
          style={{
            width: 40,
            height: 40,
            marginLeft: 20,
          }}
        >
          <Image
            source={selectedRecipe?.author?.profilePic}
            style={{
              width: 40,
              height: 40,
              borderRadius: 20,
            }}
          />
        </View>
        {/* Labels */}
        <View
          style={{
            flex: 1,
            marginHorizontal: 20,
          }}
        >
          <Text
            style={{
              color: COLORS.lightGray2,
              ...FONTS.body4,
            }}
          >
            Recipe By:
          </Text>
          <Text
            style={{
              color: COLORS.white2,
              ...FONTS.h2,
            }}
          >
            {selectedRecipe?.author?.name}
          </Text>
        </View>

        {/* Button */}
        <TouchableOpacity
          style={{
            width: 30,
            height: 30,
            alignItems: "center",
            justifyContent: "center",
            marginRight: 20,
            borderRadius: 5,
            borderWidth: 1,
            borderColor: COLORS.lightGreen1,
          }}
          onPress={() => console.log("View Profile")}
        >
          <Image
            style={{
              tintColor: COLORS.lightGreen1,
              width: 15,
              height: 15,
            }}
            source={icons.rightArrow}
          />
        </TouchableOpacity>
      </View>
    );
  };

  const RecipeCreatorCardInfo = ({ selectedRecipe }) => {
    if (Platform.OS === "ios") {
      return (
        <BlurView
          style={{
            flex: 1,
            borderRadius: SIZES.radius,
          }}
        >
          <RecipeCreaterCardDetails selectedRecipe={selectedRecipe} />
        </BlurView>
      );
    } else {
      return (
        <View
          style={{
            flex: 1,
            borderRadius: SIZES.radius,
            backgroundColor: COLORS.transparentBlack9,
          }}
        >
          <RecipeCreaterCardDetails selectedRecipe={selectedRecipe} />
        </View>
      );
    }
  };

  function renderRecipeCardHeader() {
    return (
      <View
        style={{
          marginTop: -1000,
          paddingTop: 1000,
          alignItems: "center",
          overflow: "hidden",
        }}
      >
        {/* Background */}
        <Animated.Image
          source={selectedRecipe?.image}
          resizeMode="contain"
          style={{
            height: HEADER_HEIGHT,
            width: "200%",
            transform: [
              {
                translateY: scrollY.interpolate({
                  inputRange: [-HEADER_HEIGHT, 0, HEADER_HEIGHT],
                  outputRange: [-HEADER_HEIGHT / 2, 0, HEADER_HEIGHT * 0.75],
                }),
              },
              {
                scale: scrollY.interpolate({
                  inputRange: [-HEADER_HEIGHT, 0, HEADER_HEIGHT],
                  outputRange: [2, 1, 0.75],
                }),
              },
            ],
          }}
        />

        {/* Recipe Creater card */}
        <Animated.View
          style={{
            position: "absolute",
            left: 30,
            right: 10,
            bottom: 10,
            height: 80,
            transform: [
              {
                translateY: scrollY.interpolate({
                  inputRange: [0, 170, 250],
                  outputRange: [0, 0, 100],
                  extrapolate: "clamp",
                }),
              },
            ],
          }}
        >
          <RecipeCreatorCardInfo selectedRecipe={selectedRecipe} />
        </Animated.View>
      </View>
    );
  }

  function renderRecipeInfo() {
    return (
      <View
        style={{
          flexDirection: "row",
          height: 130,
          width: SIZES.width,
          paddingHorizontal: 30,
          paddingVertical: 20,
          alignItems: "center",
        }}
      >
        {/* Recipe */}
        <View
          style={{
            flex: 1.5,
            justifyContent: "center",
          }}
        >
          <Text style={{ ...FONTS.h2 }}>{selectedRecipe?.name}</Text>
          <Text
            style={{ marginTop: 5, color: COLORS.lightGray2, ...FONTS.body4 }}
          >
            {selectedRecipe?.duration} | {selectedRecipe?.serving} Serving
          </Text>
        </View>
        {/* Viewers */}

        <View
          style={{
            flex: 1,
            justifyContent: "center",
          }}
        >
          <Viewers viewersList={selectedRecipe?.viewers}></Viewers>
        </View>
      </View>
    );
  }

  function renderIngredientHeader() {
    return (
      <View
        style={{
          flexDirection: "row",
          paddingHorizontal: 30,
          marginTop: SIZES.radius,
          marginBottom: SIZES.padding,
        }}
      >
        <Text style={{ flex: 1, ...FONTS.h2 }}>Ingredients</Text>
        <Text style={{ color: COLORS.lightGray2, ...FONTS.body4 }}>
          {selectedRecipe?.ingredients.length} items
        </Text>
      </View>
    );
  }
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: COLORS.white,
      }}
    >
      <Animated.FlatList
        data={selectedRecipe?.ingredients}
        keyExtractor={(item) => `${item.id}`}
        showsVerticalScrollIndicator={false}
        ListHeaderComponent={
          <View>
            {/* Header */}
            {renderRecipeCardHeader()}
            {/* Info */}
            {renderRecipeInfo()}
            {/* Ingredient Title */}
            {renderIngredientHeader()}
          </View>
        }
        scrollEventThrottle={16}
        onScroll={Animated.event(
          [
            {
              nativeEvent: { contentOffset: { y: scrollY } },
            },
          ],
          { useNativeDriver: true }
        )}
        renderItem={({ item }) => {
          return (
            <View
              style={{
                flexDirection: "row",
                paddingHorizontal: 30,
                marginTop: 5,
              }}
            >
              {/* Icon */}
              <View
                style={{
                  backgroundColor: COLORS.lightGray,
                  width: 50,
                  height: 50,
                  justifyContent: "center",
                  alignItems: "center",
                  borderRadius: 5,
                }}
              >
                <Image
                  style={{
                    width: 40,
                    height: 40,
                  }}
                  source={item.icon}
                />
              </View>

              {/* Description */}
              <View
                style={{
                  paddingHorizontal: 20,
                  justifyContent: "center",
                  flex: 1,
                }}
              >
                <Text
                  style={{
                    ...FONTS.body3,
                  }}
                >
                  {item.description}
                </Text>
              </View>

              {/* Quantity */}
              <View
                style={{
                  alignItems: "flex-end",
                  justifyContent: "center",
                }}
              >
                <Text
                  style={{
                    ...FONTS.body3,
                  }}
                >
                  {item.quantity}
                </Text>
              </View>
            </View>
          );
        }}
        ListFooterComponent={<View style={{ marginBottom: 100 }}></View>}
      />
      {/* {Header Bar} */}
      {renderHeaderBar()}
    </View>
  );
};

export default Recipe;
