import { supabase } from "@/utils/supabase";
import { uploadFile } from "./imageService";

export const createOrUpdatePost = async (post: any) => {
  try {
    if (post.file && typeof post.file == "object") {
      let isImage = post.file.type.includes("image");
      let folderName = isImage ? "postImages" : "postVideos";
      let fileResult = await uploadFile(folderName, post?.file?.uri, isImage);
      if (fileResult.success) post.file = fileResult.data;
      else {
        return fileResult;
      }
    }

    const { data, error } = await supabase
      .from("posts")
      .upsert(post)
      .select()
      .single();
    if (error) {
      console.log("post create error: ", error);
      return { success: false, msg: "Could not create post" };
    }
    return { success: true, data: data };
  } catch (error) {
    console.log("post create error: ", error);
    return { success: false, msg: "Could not create post" };
  }
};

export const fetchPosts = async (limit: number = 10) => {
  try {
    const { data, error } = await supabase
      .from("posts")
      .select("*, user: users(id, name, image), postLikes(*), comments(count)")
      .order("created_at", { ascending: false })
      .limit(limit);

    if (error) {
      console.log("posts fetch error: ", error);
      return { success: false, msg: "Could not fetch posts" };
    }

    return { success: true, data: data };
  } catch (error) {
    console.log("posts fetch error: ", error);
    return { success: false, msg: "Could not fetch posts" };
  }
};

export const fetchPostDetails = async (postId: any) => {
  try {
    const { data, error } = await supabase
      .from("posts")
      .select(
        "*, user: users(id, name, image), postLikes(*), comments(*, users(id, name, image))"
      )
      .eq("id", postId)
      .order("created_at", { ascending: false, foreignTable: "comments" })
      .single();

    if (error) {
      console.log("post details fetch error: ", error);
      return { success: false, msg: "Could not fetch post details" };
    }

    return { success: true, data: data };
  } catch (error) {
    console.log("post details fetch error: ", error);
    return { success: false, msg: "Could not fetch post details" };
  }
};

export const createPostLike = async (postLike: any) => {
  try {
    const { data, error } = await supabase
      .from("postLikes")
      .insert(postLike)
      .select()
      .single();

    if (error) {
      console.log("posts like error: ", error);
      return { success: false, msg: "Could not like posts" };
    }

    return { success: true, data: data };
  } catch (error) {
    console.log("posts like error: ", error);
    return { success: false, msg: "Could not like posts" };
  }
};

export const removePostLike = async (postId: any, userId: any) => {
  try {
    const { data, error } = await supabase
      .from("postLikes")
      .delete()
      .eq("postId", postId)
      .eq("userId", userId);

    if (error) {
      console.log("posts unlike error: ", error);
      return { success: false, msg: "Could not unlike posts" };
    }

    return { success: true };
  } catch (error) {
    console.log("posts unlike error: ", error);
    return { success: false, msg: "Could not unlike posts" };
  }
};

export const createComment = async (comment: any) => {
  try {
    const { data, error } = await supabase
      .from("comments")
      .insert(comment)
      .select()
      .single();

    if (error) {
      console.log("posts comment error: ", error);
      return { success: false, msg: "Could not comment on post" };
    }

    return { success: true, data: data };
  } catch (error) {
    console.log("posts comment error: ", error);
    return { success: false, msg: "Could not comment on post" };
  }
};

export const removeComment = async (commentId: any) => {
  try {
    const { data, error } = await supabase
      .from("comments")
      .delete()
      .eq("id", commentId);

    if (error) {
      console.log("remove comment error: ", error);
      return { success: false, msg: "Could not remove comment" };
    }

    return { success: true, data: commentId };
  } catch (error) {
    console.log("remove comment error: ", error);
    return { success: false, msg: "Could not remove comment" };
  }
};

export const removePost = async (postId: any) => {
  try {
    const { data, error } = await supabase
      .from("posts")
      .delete()
      .eq("id", postId);

    if (error) {
      console.log("remove post error: ", error);
      return { success: false, msg: "Could not remove post" };
    }

    return { success: true, data: postId };
  } catch (error) {
    console.log("remove post error: ", error);
    return { success: false, msg: "Could not remove post" };
  }
};
