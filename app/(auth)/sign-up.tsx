import { View, Text, ScrollView, Image, Alert } from "react-native";
import React, { useState } from "react";
import { icons, images } from "@/constants";
import Input from "@/components/Input";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  registrationSchema,
  registrationSchemaType,
} from "@/schema/validations";
import { useSignUp } from "@clerk/clerk-expo";
import { Link, useRouter } from "expo-router";
import CustomButton from "@/components/CustomButton";
import OAuth from "@/components/OAuth";

import { ReactNativeModal } from "react-native-modal";

const SignUpScreen = () => {
  const { control, handleSubmit, getValues } = useForm<registrationSchemaType>({
    resolver: zodResolver(registrationSchema),
  });

  const { isLoaded: loaded, signUp, setActive } = useSignUp();
  const [verification, setVerification] = useState({
    state: "default",
    error: "",
    code: "",
  });

  const [isLoadingState, setIsLoadingState] = useState({
    state: "default",
    error: false,
  });

  const router = useRouter();

  const submitForm = async (values: registrationSchemaType) => {
    if (!loaded) return;

    setIsLoadingState({ ...isLoadingState, state: "register" });

    try {
      await signUp.create({
        emailAddress: values.email,
        password: values.password,
        username: values.username,
      });

      // Send user an email with verification code
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });

      setVerification({
        ...verification,
        state: "pending",
      });
    } catch (err:any) {
      console.error(JSON.stringify(err, null, 2));
      Alert.alert("Error", err.errors[0].longMessage);

      setIsLoadingState({ ...isLoadingState, error: true });
    }
  };

  // Handle submission of verification form
  const onVerifyPress = async () => {
    if (!loaded) return;

    setIsLoadingState({ ...isLoadingState, state: "verifyUser" });

    try {
      // Use the code the user provided to attempt verification
      const signUpAttempt = await signUp.attemptEmailAddressVerification({
        code: verification.code,
      });

      if (signUpAttempt.status === "complete") {
        await setActive({ session: signUpAttempt.createdSessionId });
        setVerification({ ...verification, state: "success" });
      } else {
        setVerification({
          ...verification,
          state: "failed",
          error: "Verification failed",
        });
        console.error(JSON.stringify(signUpAttempt, null, 2));
      }
    } catch (err:any) {
      setVerification({
        ...verification,
        error: err.errors[0].logMessage,
        state: "failed",
      });

      setIsLoadingState({ ...isLoadingState, error: true });
      console.error(JSON.stringify(err, null, 2));
    }
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
            title={`${isLoadingState.state === "reistering" ? "Creating account..." : "Sign up"}`}
            textVariant="default"
            onPress={handleSubmit(submitForm)}
          />

          <OAuth />

          <View className="flex justify-center items-center mt-5 flex-row gap-x-1">
            <Text className="text-neutral-500 font-JakartaSemiBold text-lg">
              Already have an account?
            </Text>
            <Link
              className="text-lg font-JakartaSemiBold text-primary-500"
              href={"/(auth)/sign-in"}
            >
              Log in
            </Link>
          </View>
        </View>

        <ReactNativeModal
          isVisible={verification.state === "pending"}
          onModalHide={() =>
            setVerification({ ...verification, state: "success" })
          }
        >
          <View className="bg-white px-7 py-9 rounded-2xl min-h-[300px]">
            <Text className="text-2xl font-JakartaSemiBold mb-2 text-center">
              Verification
            </Text>
            <Text className="text-base text-gray-400 font-Jakarta text-center">
              We've sent verification code to {getValues().email}
            </Text>

            <Input
              label="Code"
              icon={icons.lock}
              placeholder="12345"
              value={verification.code}
              keyboardType="numeric"
              onChangeText={(code) =>
                setVerification({ ...verification, code })
              }
            />

            {verification.error && (
              <Text className="text-red-500 text-sm mt-1">
                {verification.error}
              </Text>
            )}

            <CustomButton
              title={
                isLoadingState.state === "verifyUser"
                  ? "Verifying User's Email"
                  : "Verifiy Email"
              }
              onPress={onVerifyPress}
              className="mt-5 bg-success-500 text-white"
            />
          </View>
        </ReactNativeModal>

        <ReactNativeModal isVisible={verification.state === "success"}>
          <View className="bg-white px-7 py-9 rounded-2xl min-h-[300px]">
            <Image
              source={images.check}
              className="w-[110px] h-[110px] mx-auto my-6"
            />

            <Text className="text-3xl font-JakartaSemiBold text-center">
              Verified
            </Text>
            <Text className="text-base text-gray-400 font-Jakarta text-center">
              You have successfully verified your account
            </Text>

            <CustomButton
              title="Browse Home"
              onPress={() => router.replace("/(root)/(tabs)/home")}
              className="mt-5 text-white"
            />
          </View>
        </ReactNativeModal>
      </View>
    </ScrollView>
  );
};

export default SignUpScreen;
