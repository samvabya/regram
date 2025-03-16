import {
  View,
  Text,
  Image,
  ScrollView,
  TextInput,
  TouchableOpacity,
  Alert,
} from "react-native";
import React, { useRef, useState } from "react";
import CustomHeader from "@/components/customheader";
import { useAuth } from "@/contexts/AuthContext";
import { Button, IconButton } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import { ResizeMode, Video } from "expo-av";
import { createOrUpdatePost } from "@/services/postService";
import { router } from "expo-router";

export default function NewPost() {
  const { user } = useAuth() as { user: any };
  // const bodyRef = useRef("");
  // const editorRef = useRef<RichEditor>(null);
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState<ImagePicker.ImagePickerAsset | null>(null);
  const [body, setBody] = useState("");

  const onPick = async (isImage: boolean) => {
    let mediaConfig: any = {
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 0.5,
    };

    if (!isImage) {
      mediaConfig = {
        mediaTypes: ImagePicker.MediaTypeOptions.Videos,
        allowsEditing: true,
        aspect: [4, 3],
        quality: 0.5,
      };
    }

    let result = await ImagePicker.launchImageLibraryAsync(mediaConfig);

    if (!result.canceled) {
      setFile(result.assets[0]);
    }
  };

  const isLocalFile = (file: ImagePicker.ImagePickerAsset) => {
    if (!file) return null;
    if (typeof file == "object") {
      return true;
    }
    return false;
  };

  const getFileType = (file: any) => {
    if (!file) return null;
    if (isLocalFile(file)) {
      return file.type;
    }

    // check for remote file

    if (file.includes("postImages")) {
      return "Image";
    }

    return "Video";
  };

  const getFileUri = (file: ImagePicker.ImagePickerAsset) => {
    if (!file) return "";
    if (isLocalFile(file)) {
      return file.uri;
    }

    // return getSupabaseFileUrl(file)?.uri;
    return "";
  };

  const clearFile = () => {
    setFile(null);
  };

  const onSubmit = async () => {
    if (!body && !file) {
      Alert.alert("Please add a caption or upload a file");
      return;
    }

    let data = {
      file,
      body: body,
      userId: user?.id,
    };

    setLoading(true);
    // create Post
    let res = await createOrUpdatePost(data);
    setLoading(false);
    if (res.success) {
      setBody("");
      setFile(null);
      router.back();
    } else {
      Alert.alert("Something went wrong");
    }
  };
  return (
    <View className="flex-1 bg-secondary">
      <ScrollView>
        <CustomHeader title="New Post" />
        {/* <RichTextEditor editorRef={editorRef} onChange={(body: string) => bodyRef.current = body} /> */}

        <TextInput
          className="text-lg px-4 py-4 bg-primary rounded-3xl mx-6 my-4"
          placeholder="What's on your mind?"
          onChange={(e) => setBody(e.nativeEvent.text)}
          numberOfLines={5}
          cursorColor={"#000"}
          multiline
        />
        {file && (
          <View className="mx-6 my-4">
            {getFileType(file) == "video" ? (
              <Video
                style={{
                  backgroundColor: "black",
                  width: "100%",
                  height: 200,
                  borderRadius: 24,
                }}
                source={{ uri: getFileUri(file) }}
                useNativeControls
                resizeMode={ResizeMode.COVER}
                shouldPlay
                isLooping
              />
            ) : (
              <Image
                className="w-full h-64 rounded-3xl"
                source={{ uri: getFileUri(file) }}
              />
            )}
            <View className="absolute top-2 right-2">
              <IconButton
                onPress={clearFile}
                icon="delete"
                size={24}
                iconColor="red"
                style={{ padding: 5, backgroundColor: "white", opacity: 0.7 }}
              />
            </View>
          </View>
        )}
        <View className="flex-row items-center px-4 py-4 mx-6 my-4 bg-gray-200 rounded-3xl ">
          <Text className="text-lg font-medium flex-1">Add to your Post</Text>

          <IconButton
            icon="image"
            size={30}
            iconColor="#b2967d"
            onPress={() => onPick(true)}
          />
          <IconButton
            icon="video"
            size={30}
            iconColor="#b2967d"
            onPress={() => onPick(false)}
          />
        </View>
      </ScrollView>
      <View className=" mx-6 my-4">
        <TouchableOpacity
          className="bg-tertiary rounded-3xl py-4 text-center disabled:opacity-50"
          disabled={loading}
          onPress={onSubmit}
        >
          <Text className="text-lg text-secondary font-bold text-center">
            Post
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}
