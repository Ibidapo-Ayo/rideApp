import { ButtonProps } from "@/types/type";

export const getBgVariantStyle = (variant:ButtonProps['bgVariant'])=> {
    if(variant === "secondary"){
        return "bg-gray-500"
    }
    if(variant === "danger"){
        return "bg-red-500"
    }
    if(variant === "success"){
        return "bg-green-500"
    }
    if(variant === "outline"){
        return "bg-transparent border-neutral-300 border-[0.5px]"
    }

    return "bg-[#0286ff]"
}
export const getTextVariantStyle = (variant:ButtonProps['textVariant'])=> {
    if(variant === "secondary"){
        return "text-gray-100"
    }
    if(variant === "danger"){
        return "text-red-100"
    }
    if(variant === "success"){
        return "text-green-100"
    }
    if(variant === "primary"){
        return "text-black"
    }

    return "text-white"
}