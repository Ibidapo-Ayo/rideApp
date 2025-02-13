import { View, Text, ScrollView, Image } from "react-native";
import React, { useState } from "react";
import { icons, images } from "@/constants";
import Input from "@/components/Input";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  registrationSchema,
  registrationSchemaType,
} from "@/schema/validations";
import CustomButton from "@/components/CustomButton";
import { Link } from "expo-router";
import OAuth from "@/components/OAuth";

const SignUpScreen = () => {
  const {
    control,
    handleSubmit,
  } = useForm<registrationSchemaType>({
    resolver: zodResolver(registrationSchema),
  });

  const submitForm = (values: registrationSchemaType) => {
    console.log(values);
  };
  return (
    <ScrollView className="flex-1 bg-white">
      <View className="flex-1 bg-white">
        <View className="relative w-full h-[200px]">
          <Image source={images.signUpCar} className="z-0 w-full h-full" />
          <Text className="text-2xl text-black font-JakartaSemiBold absolute left-5 bottom-10">
            Create Your Account
          </Text>
        </View>

        <View className="p-4">
          <Controller
            control={control}
            name="username"
            render={({
              field: { onChange, onBlur, value },
              formState: {
                errors: { username },
              },
            }) => (
              <Input
                label="Name"
                icon={icons.person}
                placeholder="Enter your username"
                inputStyle="placeholder:text-neutral-400"
                onChangeText={onChange}
                value={value}
                errorText={username?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="email"
            render={({
              field: { onChange, value },
              formState: {
                errors: { email },
              },
            }) => (
              <Input
                label="Email address"
                icon={icons.email}
                placeholder="Enter your valid email address"
                inputStyle="placeholder:text-neutral-400"
                onChangeText={onChange}
                value={value}
                errorText={email?.message}
              />
            )}
          />
          <Controller
            control={control}
            name="password"
            render={({
              field: { onChange, value },
              formState: {
                errors: { password },
              },
            }) => (
              <Input
                label="Enter a password"
                icon={icons.lock}
                placeholder="Enter your valid email address"
                inputStyle="placeholder:text-neutral-400"
                onChangeText={onChange}
                value={value}
                errorText={password?.message}
                secureTextEntry
              />
            )}
          />

          <CustomButton
            title="Sign up"
            textVariant="default"
            onPress={handleSubmit(submitForm)}
          />

            <OAuth />

          <View className="flex justify-center items-center mt-5 flex-row gap-x-1"> 
            <Text className="text-neutral-500 font-JakartaSemiBold text-lg">Already have  an account?</Text>
            <Link className="text-lg font-JakartaSemiBold text-primary-500" href={"/(auth)/sign-in"}>Log in</Link>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

export default SignUpScreen;
