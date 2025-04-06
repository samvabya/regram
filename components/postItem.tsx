import { View, Text, Image, TouchableOpacity, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import Userpic from "./userpic";
import { getSupabaseUrl } from "@/services/imageService";
import { ResizeMode, Video } from "expo-av";
import { Icon, IconButton } from "react-native-paper";
import { useAuth } from "@/contexts/AuthContext";
import { createPostLike, removePostLike } from "@/services/postService";
import { router } from "expo-router";

export default function PostItem({
  item,
  isDetailed = false,
  onDelete = () => {},
}: {
  item: any;
  isDetailed?: boolean;
  onDelete?: () => void;
}) {
  const { user } = useAuth() as { user: any };
  const [likes, setLikes] = useState<any>([]);
  // console.log(item);

  useEffect(() => {
    setLikes(item.postLikes);
  }, []);

  const onLike = async () => {
    if (liked) {
      let updatedLikes = likes.filter((like: any) => like.userId != user.id);
      setLikes([...updatedLikes]);
      let res = await removePostLike(item.id, user.id);
      // console.log(res);
    } else {
      let data = {
        userId: user.id,
        postId: item.id,
      };
      setLikes([...likes, data]);
      let res = await createPostLike(data);
      // console.log(res);
    }
  };

  const handleDeletePost = async () => {
    Alert.alert(
      "Delete your Post",
      "Are you sure you want to delete the post?",
      [
        {
          text: "Cancel",
          onPress: () => {},
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: onDelete,
        },
      ]
    );
  };

  const liked = likes.filter((like: any) => like.userId == user.id)[0]
    ? true
    : false;
  return (
    <TouchableOpacity
      className="ml-10 mb-4 bg-primary rounded-l-3xl"
      onPress={onLike}
      onLongPress={() => {
        if (isDetailed != true) {
          router.push({
            pathname: "/postDetails",
            params: { postId: item.id },
          });
        }
      }}
    >
      <TouchableOpacity
        className="ml-2 mt-2 flex-row items-center"
        onPress={() => {
          router.push({
            pathname: "/userProfile",
            params: { userId: item.user.id },
          });
        }}
      >
        <Userpic imageUrl={item.user.image} />
        <View className="flex-1 flex-col ml-2">
          <Text style={{ fontFamily: "Poppins_500Medium", fontSize: 16 }}>
            {item.user.name}
          </Text>
          <Text
            className="text-grey-300"
            style={{ fontFamily: "Poppins_400Regular", fontSize: 12 }}
          >
            regram android
          </Text>
        </View>
        {!isDetailed && (
          <IconButton
            icon={"chevron-right"}
            onPress={() => {
              router.push({
                pathname: "/postDetails",
                params: { postId: item.id },
              });
            }}
          />
        )}
        {isDetailed && item.userId == user.id && (
          <IconButton icon={"cancel"} onPress={handleDeletePost} />
        )}
      </TouchableOpacity>
      {item.body && (
        <Text className="text-lg px-4 mb-2 font-medium">{item.body}</Text>
      )}
      {item.file && item?.file.includes("postImages") && (
        <Image
          source={getSupabaseUrl(item.file)}
          style={{ width: 300, height: 300, borderRadius: 20 }}
          className="m-2"
        />
      )}
      {item.file && item?.file.includes("postVideos") && (
        <Video
          source={getSupabaseUrl(item.file)}
          style={{ width: 300, height: 300, borderRadius: 20, margin: 8 }}
          useNativeControls
          resizeMode={ResizeMode.COVER}
          isLooping
        />
      )}
      <View className="flex-row items-center justify-end px-4 mb-2 gap-3">
        {likes.length != 0 && <Text>{likes.length}</Text>}
        <Icon source={liked ? "heart" : "heart-outline"} size={18} />
        {item.comments[0].count > 0 && <Text>{item?.comments[0]?.count}</Text>}
        <Icon source={"comment-multiple-outline"} size={18} />
        <Icon source={"repeat"} size={18} />
        <Icon source={"share-variant-outline"} size={18} />
      </View>
    </TouchableOpacity>
  );
}
