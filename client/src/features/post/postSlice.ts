import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import {
  fetchPosts as API_fetchPosts,
  createPost as API_createPost,
  updatePost as API_updatePost,
  deletePost as API_deletePost,
  likePost as API_likePost,
  createComment as API_createComment,
  likeComment as API_likeComment,
  deleteComment as API_deleteComment,
} from "../../api/api";
import { IPostForm, ICommentForm } from "../../types/FormTypes";
import { IPost, IComment } from "../../types/PostTypes";

export interface PostState {
  posts: IPost[];
  status: "idle" | "loading" | "failed" | "success";
  formStatus: "idle" | "loading" | "failed" | "success";
}

const initialState: PostState = {
  posts: [],
  status: "idle",
  formStatus: "idle",
};

export const fetchPosts = createAsyncThunk<IPost[]>(
  "posts/fetchPosts",
  async () => {
    try {
      const response = await API_fetchPosts();
      const fetchedPosts = response.data;
      // reformat the returned data from api call
      return fetchedPosts as IPost[];
    } catch (error) {
      // the last 'error' is the message return value of the api upon an error
      throw new Error(error.response.data.error);
    }
  }
);

// { state: RootState }
export const createPost = createAsyncThunk<IPost, IPostForm>(
  "posts/createPost",
  async (formData: IPostForm) => {
    try {
      const response = await API_createPost(formData);
      const createdPost = response.data;
      return createdPost as IPost;
    } catch (error) {
      throw new Error(error.response.data.error);
    }
  }
);

export const updatePost = createAsyncThunk<
  IPost,
  { postId: string; formData: IPostForm }
>("posts/updatePost", async ({ postId, formData }) => {
  try {
    const response = await API_updatePost(postId, formData);
    const editedPost = response.data;
    return editedPost as IPost;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
});

export const deletePost = createAsyncThunk<string, string>(
  "posts/deletePost",
  async (postId) => {
    try {
      await API_deletePost(postId);
      return postId;
    } catch (error) {
      throw new Error(error.response.data.error);
    }
  }
);

export const likePost = createAsyncThunk<IPost, string>(
  "posts/likePost",
  async (postId) => {
    try {
      const response = await API_likePost(postId);
      const likedPost = response.data;
      return likedPost as IPost;
    } catch (error) {
      throw new Error(error.response.data.error);
    }
  }
);

export const createComment = createAsyncThunk<
  IComment,
  { postId: string; text: ICommentForm }
>("comments/createComment", async ({ postId, text }) => {
  try {
    const response = await API_createComment(postId, text);
    const createdComment = response.data;
    return createdComment as IComment;
  } catch (error) {
    throw new Error(error.response.data.error);
  }
});

export const likeComment = createAsyncThunk<IComment, string>(
  "comments/likeComment",
  async (commentId) => {
    try {
      const response = await API_likeComment(commentId);
      const likedComment = response.data;
      return likedComment as IComment;
    } catch (error) {
      throw new Error(error.response.data.error);
    }
  }
);

export const deleteComment = createAsyncThunk<
  { postId: string; commentId: string },
  { postId: string; commentId: string }
>("comments/deleteComment", async ({ postId, commentId }) => {
  try {
    await API_deleteComment(commentId);
    return { postId, commentId };
  } catch (error) {
    throw new Error(error.response.data.error);
  }
});

export const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPosts.fulfilled, (state, { payload }) => {
      state.posts = payload;
      state.status = "idle";
    });
    builder.addCase(fetchPosts.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(createPost.fulfilled, (state, { payload }) => {
      state.posts?.push(payload);
      state.formStatus = "idle";
    });
    builder.addCase(createPost.pending, (state) => {
      state.formStatus = "loading";
    });
    builder.addCase(updatePost.fulfilled, (state, { payload }) => {
      let postIndex = state.posts?.findIndex((post) => post.id === payload.id);
      state.posts[postIndex] = payload;
      state.formStatus = "idle";
    });
    builder.addCase(updatePost.pending, (state) => {
      state.formStatus = "loading";
    });
    builder.addCase(deletePost.fulfilled, (state, { payload }) => {
      let postIndex = state.posts?.findIndex((post) => post.id === payload);
      state.posts?.splice(postIndex, 1);
    });
    builder.addCase(likePost.fulfilled, (state, { payload }) => {
      let postIndex = state.posts?.findIndex((post) => post.id === payload.id);
      state.posts[postIndex] = payload;
    });
    builder.addCase(createComment.fulfilled, (state, { payload }) => {
      let postIndex = state.posts?.findIndex(
        (post) => post.id === payload.postId
      );
      state.posts[postIndex].comments.push(payload);
    });
    builder.addCase(likeComment.fulfilled, (state, { payload }) => {
      let postIndex = state.posts?.findIndex(
        (post) => post.id === payload.postId
      );
      let foundPost: IPost = state.posts[postIndex];
      let commentIndex = foundPost?.comments.findIndex(
        (comment) => comment.id === payload.id
      );
      foundPost.comments[commentIndex] = payload;
    });
    builder.addCase(deleteComment.fulfilled, (state, { payload }) => {
      let postIndex = state.posts?.findIndex(
        (post) => post.id === payload.postId
      );
      let foundPost: IPost = state.posts[postIndex];
      let commentIndex = foundPost?.comments.findIndex(
        (comment) => comment.id === payload.commentId
      );
      foundPost.comments.splice(commentIndex, 1);
    });
  },
});

export const postStatus = (state: RootState) => state.post.status;
export const postList = (state: RootState) => state.post.posts;
export const postFormStatus = (state: RootState) => state.post.formStatus;

export default postSlice.reducer;
