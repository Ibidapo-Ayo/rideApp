import { View, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const SignInScreen = () => {
  return (
    <SafeAreaView className="flex-1 justify-center items-center bg-white">
      <View>
        <Text className="text-3xl font-semibold text-purple-950">SignInScreen</Text>
      </View>
    </SafeAreaView>
  );
};

export default SignInScreen;
