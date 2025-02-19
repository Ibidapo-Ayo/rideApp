import { View, Text, Image } from "react-native";
import React from "react";
import CustomButton from "./CustomButton";
import { icons } from "@/constants";

const OAuth = () => {

  const handleGoogleSignin = () => {
    console.log("Google signin");
  };

  return (
    <View className="gap-y-3 mt-5">
      <View className="flex flex-row justify-center items-center gap-x-3 my-5">
        <View className="flex-1 h-[1px] bg-general-100"></View>
        <Text className="text-lg font-JakartaMedium text-black">Or</Text>
        <View className="flex-1 h-[1px] bg-general-100"></View>
      </View>
      <CustomButton
        title="Log in with Google"
        onPress={() => handleGoogleSignin()}
        className="shadow-none bg-white border border-neutral-300"
        IconLeft={() => (
          <Image
            source={icons.google}
            resizeMode="contain"
            className="w-5 h-5 mx-2"
          />
        )}
        textVariant="primary"
      />
    </View>
  );
};

export default OAuth;
