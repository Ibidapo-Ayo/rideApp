import { View, Text, TouchableOpacity } from "react-native";
import React, { useRef, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { router } from "expo-router";
import Swiper from "react-native-swiper";
import { onboarding } from "@/constants";
import SwiperComp from "./components/swiper";
import CustomButton from "@/components/CustomButton";

const WelcomeScreen = () => {
  const swiperRef = useRef<Swiper>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const isLastSlide = activeIndex === onboarding.length - 1;

  const replaceRouter = () => {
    router.replace("/(auth)/sign-up");
  };
  
  return (
    <SafeAreaView className="flex h-full bg-white items-center justify-between pb-10 px-5">
      <TouchableOpacity
        onPress={replaceRouter}
        className="w-full flex items-end py-2"
      >
        <Text className="text-xl text-black font-JakartaBold">Skip</Text>
      </TouchableOpacity>

      {/* Swiper */}
      <Swiper
        ref={swiperRef}
        loop={false}
        autoplay={false}
        dot={
          <View className="w-[10px] h-[4px] mx-1 bg-[#e2e8f0] rounded-full"></View>
        }
        activeDot={
          <View className="w-[13px] h-[4px] mx-1 bg-[#0286ff] rounded-full"></View>
        }
        onIndexChanged={(index) => setActiveIndex(index)}
      >
        {onboarding.map((item) => (
          <SwiperComp item={item} key={item.id} />
        ))}
      </Swiper>

      <CustomButton
        title={isLastSlide ? "Get started" : "Next"}
        onPress={() => {
          if (isLastSlide) {
            router.replace("/(auth)/sign-in");
          } else {
            swiperRef.current?.scrollBy(1);
          }
        }}
        className="w-11/12 mt-10"
      />
    </SafeAreaView>
  );
};

export default WelcomeScreen;
