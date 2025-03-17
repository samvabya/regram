import { View, Text, ActivityIndicator, ScrollView, Alert } from "react-native";
import React, { useEffect, useState } from "react";
import { router, useLocalSearchParams } from "expo-router";
import {
  createComment,
  fetchPostDetails,
  removeComment,
  removePost,
} from "@/services/postService";
import PostItem from "@/components/postItem";
import CustomHeader from "@/components/customheader";
import { Input } from "@rneui/themed";
import { useAuth } from "@/contexts/AuthContext";
import CommentItem from "@/components/commentItem";
import { supabase } from "@/utils/supabase";
import { getUserData } from "@/services/userService";

export default function PostDetails() {
  const { postId } = useLocalSearchParams();
  const { user } = useAuth() as { user: any };
  const [startLoading, setStartLoading] = useState(true);
  const [post, setPost] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [commentRef, setCommentRef] = useState<string>("");

  const handleNewComment = async (payload: any) => {
    console.log("new comment ", payload);
    if (payload.new) {
      let newComment = { ...payload.new };
      let res = await getUserData(newComment.userId);
      newComment.user = res.success ? res.data : {};
      setPost((prevPost: any) => {
        return {
          ...prevPost,
          comments: [newComment, ...prevPost.comments],
        };
      });
    }
  };

  useEffect(() => {
    let commentChannel = supabase
      .channel("comments")
      .on(
        "postgres_changes",
        {
          event: "INSERT",
          schema: "public",
          table: "comments",
          filter: `postId=eq.${postId}`,
        },
        handleNewComment
      )
      .subscribe();

    getPostDetails();

    return () => {
      supabase.removeChannel(commentChannel);
    };
  }, []);

  const getPostDetails = async () => {
    let res = await fetchPostDetails(postId);
    if (res.success) {
      setPost(res.data);
    }
    setStartLoading(false);
  };

  const onNewComment = async () => {
    if (!commentRef) return;
    let data = {
      userId: user.id,
      postId: postId,
      text: commentRef,
    };

    setLoading(true);
    let res = await createComment(data);
    setLoading(false);
    if (res.success) {
      setCommentRef("");
    }
  };

  const onDeleteComment = async (comment: any) => {
    let res = await removeComment(comment.id);
    if (res.success) {
      setPost((prevPost: any) => {
        let updatedPost = { ...prevPost };
        updatedPost.comments = updatedPost.comments.filter(
          (c: any) => c.id != comment.id
        );
        return updatedPost;
      });
    }
  };

  const onDeletePost = async () => {
    let res = await removePost(post.id);
    if (res.success) {
      router.back();
    } else {
      Alert.alert("Error", "Something went wrong");
    }
  };

  if (startLoading) {
    return (
      <View>
        <ActivityIndicator className="mt-4 color-tertiary" size="large" />
      </View>
    );
  }

  if (!post) {
    return (
      <View className="flex-1 items-center justify-center mt-4">
        <Text className="text-zinc-600 text-2xl font-bold">Sorry!</Text>
        <Text className="text-grey-500">This post is not available</Text>
      </View>
    );
  }
  return (
    <View className="flex-1 bg-secondary">
      <ScrollView>
        <CustomHeader title="Post" />
        <PostItem
          item={{ ...post, comments: [{ count: post.comments.length }] }}
          isDetailed={true}
          onDelete={onDeletePost}
        />
        <Input
          rightIcon={{
            type: "font-awesome-5",
            name: "paper-plane",
            size: 18,
            color: "#b2967d",
            solid: true,
            style: {
              padding: 10,
            },
            onPress: !loading ? onNewComment : undefined,
          }}
          onChangeText={(text) => setCommentRef(text)}
          value={commentRef}
          placeholder="Type Comment..."
          autoCapitalize={"none"}
        />
        <View className="mx-6 gap-2">
          {post?.comments?.map((comment: any) => (
            <CommentItem
              comment={comment}
              canDelete={post.userId == user.id || comment.userId == user.id}
              key={comment.id.toString()}
              onDelete={() => onDeleteComment(comment)}
            />
          ))}

          {post.comments.length == 0 && (
            <View className="items-center justify-center mt-4">
              <Text className="text-zinc-600 text-2xl font-bold">
                No Comments!
              </Text>
              <Text className="text-grey-500">Be the first to comment</Text>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}
