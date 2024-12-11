import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { ArrowRightIcon } from "react-native-heroicons/outline";
import { ScrollView } from "react-native";
import ResraurantCard from "./ResraurantCard";
import sanityClient from "../sanity";
import { ActivityIndicator } from "react-native-web";

const FeatureRow = ({ id, title, description }) => {
  const [restaurant, setRestaurant] = useState([]);
  useEffect(() => {
    sanityClient
      .fetch(
        `
        *[ _type == 'featured' && _id == $id ]{
          'restaurants': restaurant[]->{
            name,
            short_description,
            image,
            lat,
            long,
            address,
            rating,
            type->,
            dishes[]->
          }
        }[0]
      `,
        { id }
      )
      .then((data) => setRestaurant(data))
      .catch((error) => console.log(error));
  }, [id]);
  if (!restaurant) {
    return;
  }
  return (
    <View>
      <View className="mt-4 flex-row items-center justify-between px-4">
        <Text className="font-bold capitalize text-lg">{title} </Text>
        <ArrowRightIcon color={"#00ccbb"} />
      </View>
      <Text className="capitalize text-xs text-gray-500 px-4 ">
        {description}
      </Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="pt-4"
        contentContainerStyle={{
          paddingHorizontal: 15,
        }}
      >
        {/* ResraurantCard */}
        {restaurant &&
          restaurant.restaurants?.map((item, index) => (
            <ResraurantCard
              key={index}
              id={item._id}
              imgUrl={item.image}
              title={item.name}
              rating={item.rating}
              genre={item.type?.name}
              address={item.address}
              short_description={item.short_description}
              dishes={item.dishes}
              lang={item.long}
              lat={item.lat}
            />
          ))}
      </ScrollView>
    </View>
  );
};

export default FeatureRow;
