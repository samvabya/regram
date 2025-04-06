import { View, Text, StatusBar, Pressable, Image, Alert } from "react-native";
import React, { useState } from "react";
import {
  getUserImageSrc,
  uploadFile,
  uploadProFile,
} from "@/services/imageService";
import * as ImagePicker from "expo-image-picker";
import { Button } from "react-native-paper";
import { router, useLocalSearchParams } from "expo-router";
import { supabase } from "@/utils/supabase";

export default function NewPic() {
  const id = useLocalSearchParams<any>().id;
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState<ImagePicker.ImagePickerAsset | null>(null);

  const onPick = async () => {
    let mediaConfig: any = {
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.2,
    };

    let result = await ImagePicker.launchImageLibraryAsync(mediaConfig);

    if (!result.canceled) {
      setFile(result.assets[0]);
    }
  };

  const onUpload = async () => {
    if (!file) {
      return;
    }

    try {
      setLoading(true);
      if (file && typeof file == "object") {
        let fileResult = await uploadProFile(id, file.uri);
        if (fileResult.success) {
          const { data, error } = await supabase
            .from("users")
            .update({
              image: fileResult.data,
            })
            .eq("id", id);

          if (error) {
            console.log("error: ", error);
            setLoading(false);
            return;
          }
        } else {
          Alert.alert("Something went wrong");
        }
      }

      setLoading(false);
      router.back();
    } catch (error) {
      console.log("error: ", error);
      setLoading(false);
    }
  };

  return (
    <Pressable onPress={() => router.back()} className="flex-1">
    <View className="flex-1 items-center justify-center h-1/2 bg-black/80">
      <StatusBar barStyle="dark-content" className="bg-black/80" />
      <Pressable onPress={onPick}>
        <Image
          source={file ? { uri: file.uri } : getUserImageSrc("")}
          style={{ width: 200, height: 200, borderRadius: 100 }}
        />
      </Pressable>

      <Button
        className="mt-10"
        mode="contained"
        buttonColor="#ead7c3"
        textColor="#463f3a"
        icon={"progress-upload"}
        onPress={onUpload}
        disabled={!file || loading}
      >
        Upload
      </Button>
    </View>
    </Pressable>
  );
}
