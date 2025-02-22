import { View, Text } from "react-native";
import React from "react";
import { useSelector } from "react-redux";
import { selectBasketItems, selectBasketTotal } from "../features/baskerSlice";
import { useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native";
import Currency from "react-currency-formatter";

const BadketIcon = () => {
  const items = useSelector(selectBasketItems);
  const navigation = useNavigation();
  const basketTotalprice = useSelector(selectBasketTotal);
  if (items.length === 0) return;
  return (
    <View className="absolute bottom-10 w-full z-50">
      <TouchableOpacity
        onPress={() => {
          navigation.navigate("Basket");
        }}
        className="mx-4 bg-[#00ccbb] p-4 rounded-lg flex-row items-center space-x-1"
      >
        <Text className="text-white font-extrabold text-lg bg-[#01a296] py-1 px-2">
          {items.length}
        </Text>
        <Text className="flex-1 text-white font-extrabold text-lg text-center  ">
          View Basket
        </Text>
        <Text className="text-lg text-white font-extrabold">
          <Currency quantity={basketTotalprice} currency="GBP" />
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default BadketIcon;
