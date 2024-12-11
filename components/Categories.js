import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import { ScrollView } from "react-native";
import CategoryCard from "./CategoryCard";
import sanityClient, { urlFar } from "../sanity";

const Categories = () => {
  const [category, setCategory] = useState([]);
  useEffect(() => {
    sanityClient
      .fetch(
        `
    *[ _type == 'category'  ]{
      ...
    }
    `
      )
      .then((data) => setCategory(data))
      .catch((error) => console.log(error));
  }, []);
  return (
    <ScrollView
      horizontal
      contentContainerStyle={{
        paddingHorizontal: 15,
        paddingTop: 10,
      }}
      showsHorizontalScrollIndicator={false}
    >
      {category?.map((item) => (
        <CategoryCard
          key={item._id}
          imgUrl={urlFar(item.image).width(200).url()}
          title={item.name}
        />
      ))}
    </ScrollView>
  );
};

export default Categories;
