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
      .select("*, user: users(id, name, image)")
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
