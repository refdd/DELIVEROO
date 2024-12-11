import { View, Text, Platform } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native";
import { Image } from "react-native";
import { StarIcon } from "react-native-heroicons/solid";
import { MapPinIcon } from "react-native-heroicons/outline";
import { urlFar } from "../sanity";
import { useNavigation } from "@react-navigation/native";
const ResraurantCard = ({
  id,
  imgUrl,
  title,
  rating,
  genre,
  address,
  short_description,
  dishes,
  lang,
  lat,
}) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      className={`bg-white mr-3 mb-2 ${
        Platform.OS === "ios" ? "shadow-lg" : ""
      } rounded-md `}
      style={{
        elevation: Platform.OS === "android" && 5,
      }}
      onPress={() => {
        navigation.navigate("Restaurant", {
          id,
          imgUrl,
          title,
          rating,
          genre,
          address,
          short_description,
          dishes,
          lang,
          lat,
        });
      }}
    >
      <Image
        source={{ uri: urlFar(imgUrl).url() }}
        className="h-36 w-64 rounded-t-sm"
      />
      <View className="px-3 pb-4">
        <Text className="font-bold text-lg pt-2"> {title}</Text>
        <View className="flex-row items-center space-x-2">
          <StarIcon size={22} opacity={0.5} color="green" />
          <Text className="text-xs text-gray-500">
            <Text className="text-green-500"> {rating}</Text> . {genre}{" "}
          </Text>
        </View>
        <View className="flex-row items-center space-x-2">
          <MapPinIcon color={"gray"} opacity={0.4} size={22} />
          <Text className="text-xs text-gray-500">Nearby . {address}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default ResraurantCard;
