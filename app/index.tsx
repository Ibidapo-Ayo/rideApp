import { View, Text } from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

const HomeScreen = () => {
  return (
    <SafeAreaView className="flex-1 justify-center items-center bg-white">
      <View>
        <Text className="text-3xl font-semibold text-purple-950">HomeScreen</Text>
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;
