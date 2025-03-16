import * as FileSystem from "expo-file-system";
import { decode } from "base64-arraybuffer";
import { supabase } from "@/utils/supabase";

export const getUserImageSrc = (imagePath: string) => {
  if (imagePath) {
    return { uri: imagePath };
  } else {
    return require("../assets/images/avatar.png");
  }
};

export const getSupabaseUrl = (filePath: string) => {
  if (filePath) {
    return {uri: `${process.env.EXPO_PUBLIC_SUPABASE_URL}/storage/v1/object/public/uploads/${filePath}`};
  } else {
    // return null;
  }
};

export const uploadFile = async (
  folderName: string,
  fileUri: string,
  isImage: boolean = true
) => {
  try {
    let fileName = getFilePath(folderName, isImage);
    const fileBase64 = await FileSystem.readAsStringAsync(fileUri, {
      encoding: FileSystem.EncodingType.Base64,
    });

    let imageData = decode(fileBase64);

    let { data, error } = await supabase.storage
      .from("uploads")
      .upload(fileName, imageData, {
        contentType: isImage ? "image/*" : "video/*",
        cacheControl: "3600",
        upsert: false,
      });

    if (error) {
      console.log("file upload error: ", error);
      return { success: false, msg: "Could not upload file" };
    }

    return { success: true, data: data?.path };
  } catch (error) {
    console.log("file upload error: ", error);
    return { success: false, msg: "Could not upload file" };
  }
};

export const getFilePath = (folderName: string, isImage: boolean) => {
  return `/${folderName}/${new Date().getTime()}.${isImage ? "jpg" : "mp4"}`;
};
