import {
  View,
  Text,
  KeyboardAvoidingView,
  Image,
  TextInput,
  TouchableWithoutFeedback,
  Platform,
  Keyboard,
} from "react-native";
import React, { useState } from "react";
import { InputFieldProps } from "@/types/type";
import { icons } from "@/constants";

const Input = ({
  label,
  labelStyle,
  className,
  icon,
  inputStyle,
  secureTextEntry,
  iconStyle,
  errorText,
  ...props
}: InputFieldProps) => {
  const [openPassword, setOpenPassword] = useState(secureTextEntry);

  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
    >
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View className="my-1 w-full">
          <Text className={`text-lg font-JakartaSemiBold mb-3 ${labelStyle}`}>
            {label}
          </Text>

          <View
            className={`w-full bg-neutral-100 flex flex-row items-center justify-start rounded-full border border-neutral-100 focus:border-primary-500 px-2`}
          >
            {icon && (
              <Image source={icon} className={`h-6 w-6  ${iconStyle}`} />
            )}
            <TextInput
              className={`p-4 rounded-full font-JakartaSemiBold text-[15px] flex-1 placeholder:text-neutral-400 text-left ${inputStyle}`}
              secureTextEntry={openPassword}
              {...props}
            />

            {secureTextEntry && (
              <TouchableWithoutFeedback
                onPress={() => setOpenPassword((prev) => !prev)}
              >
                <Image source={icons.eyecross} className="h-6 w-6 " />
              </TouchableWithoutFeedback>
            )}
          </View>
          <Text className="text-red-500 text-md tracking-tight font-JakartaMedium">
            {errorText}
          </Text>
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  );
};

export default Input;
