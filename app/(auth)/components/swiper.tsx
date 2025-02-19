import { View, Text, Image } from "react-native";
import React from "react";
import { OnboardingProps } from "@/types/type";

const SwiperComp = ({ item }: { item: OnboardingProps }) => {
  return (
    <View className="flex items-center justify-center p-7">
      <Image
        source={item.image}
        className="w-full h-[300px]"
        resizeMode="contain"
      />
       <Text className="text-black text-4xl font-JakartaBold text-center mt-10">{item.title}</Text>
       <Text className="text-center text-[#858585] text-lg mt-3">{item.description}</Text>
    </View>
  );
};

export default SwiperComp;
