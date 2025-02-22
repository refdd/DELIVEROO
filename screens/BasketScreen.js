import { View, Text } from "react-native";
import React, { useMemo, useState } from "react";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import { selectRestaurant } from "../features/restaurantSlice";
import {
  selectBasketItems,
  removeFroBasket,
  selectBasketTotal,
} from "../features/baskerSlice";
import { SafeAreaView } from "react-native";
import { TouchableOpacity } from "react-native";
import { XCircleIcon } from "react-native-heroicons/solid";
import { Image } from "react-native";
import { ScrollView } from "react-native";
import { urlFar } from "../sanity";
import Currency from "react-currency-formatter";

const BasketScreen = () => {
  const restaurant = useSelector(selectRestaurant);
  const navigation = useNavigation();
  const items = useSelector(selectBasketItems);
  const backetTotal = useSelector(selectBasketTotal);
  const dispatch = useDispatch();
  const [groupedIitemsInBasket, setGroupedIitemsInBasket] = useState([]);
  useMemo(() => {
    const groupedItem = items.reduce((results, item) => {
      (results[item.id] = results[item.id] || []).push(item);
      return results;
    }, {});
    setGroupedIitemsInBasket(groupedItem);
  }, [items]);
  return (
    <SafeAreaView className="flex-1 bg-white">
      <View className="flex-1 bg-gray-100">
        <View className="p-5 border-b border-[#00ccbb] bg-white shadow-xl">
          <View className="mt-2">
            <Text className="text-lg font-bold text-center">Basket</Text>
            <Text className="text-center text-gray-400">
              {restaurant.title}
            </Text>
          </View>
          <TouchableOpacity
            className="rounded-full bg-gray-100 absolute top-6 right-5"
            onPress={() => {
              navigation.goBack();
            }}
          >
            <XCircleIcon color={"#00ccbb"} size={50} />
          </TouchableOpacity>
        </View>
        <View className="flex-row items-center space-x-4 px-4 py-3 bg-white my-5">
          <Image
            source={{
              uri: "https://images.prismic.io/dbhq-deliveroo-riders-website/ed825791-0ba4-452c-b2cb-b5381067aad3_RW_hk_kit_importance.png?auto=compress,format&rect=0,0,1753,1816&w=1400&h=1450",
            }}
            className="h-7 w-7 bg-gray-300 rounded-full"
          />

          <Text className="flex-1">Deliver in 50-75 min</Text>
          <TouchableOpacity className="">
            <Text className="text-[#00ccbb]">Change</Text>
          </TouchableOpacity>
        </View>
        <ScrollView className="divide-y divide-gray-200">
          {Object.entries(groupedIitemsInBasket).map(([key, items]) => (
            <View
              key={key}
              className="flex-row items-center space-x-3 bg-white py-2 px-5"
            >
              <Text className="text-[#00ccbb]"> {items.length} x</Text>
              <Image
                source={{ uri: urlFar(items[0].image).url() }}
                className="h-12 w-12 rounded-full"
              />
              <Text className="flex-1">{items[0].name}</Text>
              <Text className="text-gray-600">
                <Currency quantity={items[0].price} currency={"GBP"} />
              </Text>
              <TouchableOpacity
                onPress={() => dispatch(removeFroBasket({ id: key }))}
              >
                <Text className="text-[#00ccbb] text-xs">Remove</Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>

        <View className="p-5 bg-white mt-5 space-y-4">
          <View className="flex-row justify-between">
            <Text className="text-gray-400">SubTotal</Text>
            <Text className="text-gray-400">
              <Currency quantity={backetTotal} currency={"GBP"} />
            </Text>
          </View>
          <View className="flex-row justify-between">
            <Text className="text-gray-400">Delivery Fee</Text>
            <Text className="text-gray-400">
              <Currency quantity={5.99} currency={"GBP"} />
            </Text>
          </View>
          <View className="flex-row justify-between">
            <Text className="">Order Total</Text>
            <Text className="font-extrabold">
              <Currency quantity={backetTotal + 5.99} currency={"GBP"} />
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate("PreparingOrderScreen")}
            className="rounded-lg bg-[#00ccbb] p-4"
          >
            <Text className="text-center text-white text-lg font-bold">
              Place Order
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default BasketScreen;
