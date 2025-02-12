import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { getBgVariantStyle, getTextVariantStyle } from "@/utils";
import { ButtonProps } from "@/types/type";

type CustomButtonProps = {
    onPress: () => void,
    title: string,
    bgVariant?: ButtonProps["bgVariant"],
    textVariant?: ButtonProps["textVariant"],
    IconLeft?: React.ElementType,
    IconRight?: React.ElementType,
    className?: string 
}



const CustomButton = ({
  onPress,
  title,
  bgVariant = "primary",
  textVariant = "default",
  IconLeft,
  IconRight,
  className,
  ...props
}: CustomButtonProps) => {
  return (
    <TouchableOpacity
    activeOpacity={0.9}
    onPress={onPress}
     className={`w-full rounded-full justify-center items-center flex flex-row p-3 shadow-md shadow-neutral-400/70 ${className} ${getBgVariantStyle(bgVariant)}`}
     {...props}
     >
      {IconLeft && <IconLeft />}
      <Text className={`text-2xl font-bold ${getTextVariantStyle(textVariant)}`}>{title}</Text>
      {IconRight && <IconRight />}
    </TouchableOpacity>
  );
};

export default CustomButton;
