import { View, Text } from "react-native";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native";
import * as Animatable from "react-native-animatable";
import * as Progress from "react-native-progress";
import { useNavigation } from "@react-navigation/native";
const PreparingOrderScreen = () => {
  const navigation = useNavigation();
  useEffect(() => {
    setTimeout(() => {
      navigation.navigate("Delivery");
    }, 4000);
  }, []);
  return (
    <SafeAreaView className="bg-[#ffff] flex-1 justify-center items-center">
      <Animatable.Image
        source={require("../assets/d30c846a2e3eed2fbbd64f94bf62c3cf.gif")}
        animation="slideInUp"
        iterationCount={1}
        className="h-96 w-full"
      />
      <Animatable.Text
        animation={"slideInUp"}
        iterationCount={1}
        className="text-lg my-10 text-[#00ccbb] font-bold text-center"
      >
        Waiting for Restaurant to accpet your order
      </Animatable.Text>

      <Progress.Circle size={60} indeterminate={true} color={"#00ccbb"} />
    </SafeAreaView>
  );
};

export default PreparingOrderScreen;
