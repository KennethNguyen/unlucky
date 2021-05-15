import axios from "axios";
import {
  IAuthForm,
  IDemoUser,
  IPostForm,
  ICommentForm,
} from "../types/FormTypes";

const API = axios.create({
  baseURL: "https://unluckyapi.herokuapp.com",
});

// send token back to backend to verify that user is logged in for authorized access
API.interceptors.request.use(
  (req) => {
    const localUser: string | null = localStorage.getItem("profile");
    if (localUser) {
      const parsedUser = JSON.parse(localUser);
      req.headers.Authorization = `Bearer ${parsedUser.token}`;
    }
    return req;
  },
  (error) => {
    console.log(error);
  }
);

export const login = (formData: IAuthForm | IDemoUser) =>
  API.post("/users/login", formData);
export const signUp = (formData: IAuthForm) =>
  API.post("/users/signup", formData);
export const fetchPosts = () => API.get("/posts");
export const createPost = (newPostData: IPostForm) =>
  API.post("/posts", newPostData);
export const updatePost = (postId: string, updatedPostData: IPostForm) =>
  API.patch(`/posts/${postId}`, updatedPostData);
export const deletePost = (postId: string) => API.delete(`/posts/${postId}`);
export const likePost = (postId: string) => API.patch(`/posts/${postId}/like`);
export const createComment = (postId: string, text: ICommentForm) =>
  API.post(`/posts/${postId}/comments`, text);
export const likeComment = (commentId: string) =>
  API.patch(`/comments/${commentId}/like`);
export const deleteComment = (commentId: string) =>
  API.delete(`/comments/${commentId}`);
