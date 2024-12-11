import {
  View,
  Text,
  SafeAreaView,
  StyleSheet,
  Platform,
  Image,
} from "react-native";
import React, { useLayoutEffect, useState, useEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import * as Icons from "react-native-heroicons/outline";
import { TextInput } from "react-native";
import { ScrollView } from "react-native";
import Categories from "../components/Categories";
import FeatureRow from "../components/FeatureRow";
import sanityClient from "../sanity";
const HomeScreen = () => {
  const [featuredCategors, setFeaturedCategors] = useState([]);
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);
  useEffect(() => {
    sanityClient
      .fetch(
        `*[ _type == 'featured' ] {
          ...,
          restaurant[]=>{
            ...,
            dishes[]=> {}
          }
      
}`
      )
      .then((data) => setFeaturedCategors(data))
      .catch((error) => console.error(error));
  }, []);
  // console.log(featuredCategors);
  return (
    <SafeAreaView className="bg-white pt-5" style={styles.droidSafeArea}>
      {/* header */}
      <View className=" flex-row pb-3 items-center mx-3 space-x-2 ">
        <Image
          source={{
            uri: "https://cdn.pixabay.com/photo/2015/08/15/10/03/author-889357_1280.jpg",
          }}
          className="h-7 w-7 bg-gray-300 p-4 rounded-full"
        />
        <View className="flex-1">
          <Text className="font-bold text-gray-400 text-xs"> Deliver Now!</Text>
          <Text className="font-bold text-xl">
            Current Location
            <Icons.ChevronDownIcon size={20} color="#00ccbb" />
          </Text>
        </View>
        <Icons.UserIcon size={35} color="#00ccbb" />
      </View>
      {/* search  */}
      <View className="flex-row items-center space-x-2 pb-2 mx-3 ">
        <View className="flex-row flex-1 space-x-2 bg-gray-200 p-3">
          <Icons.MagnifyingGlassIcon color="gray" size={20} />
          <TextInput
            placeholder="Restaurants And cuisines"
            keyboardType="default"
          />
        </View>
        <Icons.AdjustmentsVerticalIcon color="#00ccbb" />
      </View>
      {/* Body  */}
      <ScrollView
        className="bg-gray-100 "
        contentContainerStyle={{ paddingBottom: 200 }}
      >
        <Categories />

        {/* featured */}
        {featuredCategors?.map((categore) => (
          <FeatureRow
            key={categore._id}
            title={categore.name}
            description={categore.short_description}
            id={categore._id}
          />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  droidSafeArea: {
    paddingTop: Platform.OS === "android" ? 25 : 0,
  },
});
export default HomeScreen;
