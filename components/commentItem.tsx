import { View, Text, TouchableOpacity, Alert } from "react-native";
import React from "react";
import Userpic from "./userpic";
import { IconButton } from "react-native-paper";
import { supabase } from "@/utils/supabase";

export default function CommentItem({
  comment,
  canDelete = false,
  onDelete = () => {},
}: {
  comment: any;
  canDelete?: boolean;
  onDelete?: () => void;
}) {
  // console.log(comment)

  const handleDelete = () => {
    // delete comment

    Alert.alert(
      "Delete Comment",
      "Are you sure you want to delete the comment?",
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
  return (
    <TouchableOpacity className="flex-row items-center gap-2 bg-primary rounded-3xl p-2">
      <Userpic imageUrl={comment.users.image} />
      <Text className="text-accent text-lg font-medium ">
        {comment.users.name}:
      </Text>
      <Text className="flex-1">{comment.text}</Text>
      {canDelete && <IconButton icon={"cancel"} size={20} onPress={handleDelete} />}
    </TouchableOpacity>
  );
}
