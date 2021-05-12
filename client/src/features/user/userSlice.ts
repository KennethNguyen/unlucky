import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { login, signUp } from "../../api/api";
import { IAuthForm } from "../../types/FormTypes";

type FormError = {
  message: string;
};

export interface IUser {
  token: string;
  id: string;
  username: string;
}

export interface UserState {
  userData: IUser | null;
  status: "idle" | "loading" | "failed" | "success";
  errorMessage: string | undefined;
}

const initialState: UserState = {
  userData: null,
  status: "idle",
  errorMessage: "",
};

export const loginUser = createAsyncThunk<
  IUser,
  IAuthForm,
  { rejectValue: FormError }
>("users/loginUser", async (formData: IAuthForm, thunkAPI) => {
  try {
    const response = await login(formData);
    const fetchedUserData = response.data;
    const {
      token,
      user: { username, id },
    } = fetchedUserData;
    // reformat the returned data from api call
    const formatUserData = { token, username, id };
    return formatUserData as IUser;
  } catch (error) {
    // the last 'error' is the message return value of the api upon an error
    return thunkAPI.rejectWithValue({ message: error.response.data.error });
  }
});

export const signUpUser = createAsyncThunk<
  IUser,
  IAuthForm,
  { rejectValue: FormError }
>("users/signUpUser", async (formData: IAuthForm, thunkAPI) => {
  try {
    const response = await signUp(formData);
    const fetchedUserData = response.data;
    const {
      token,
      user: { username, id },
    } = fetchedUserData;
    const formatUserData = { token, username, id };
    return formatUserData as IUser;
  } catch (error) {
    return thunkAPI.rejectWithValue({ message: error.response.data.error });
  }
});

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logoutUser: (state) => {
      localStorage.clear();
      state.userData = null;
      state.status = "idle";
      state.errorMessage = "";
    },
    resetState: (state) => {
      state.status = "idle";
      state.errorMessage = "";
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginUser.fulfilled, (state, { payload }) => {
      state.userData = payload;
      state.status = "success";
      localStorage.setItem("profile", JSON.stringify(payload));
    });
    builder.addCase(loginUser.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(loginUser.rejected, (state, { payload }) => {
      state.errorMessage = payload?.message;
      state.status = "failed";
    });
    builder.addCase(signUpUser.fulfilled, (state, { payload }) => {
      state.userData = payload;
      state.status = "success";
      localStorage.setItem("profile", JSON.stringify(payload));
    });
    builder.addCase(signUpUser.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(signUpUser.rejected, (state, { payload }) => {
      state.errorMessage = payload?.message;
      state.status = "failed";
    });
  },
});

export const { logoutUser, resetState } = userSlice.actions;

export const formStatus = (state: RootState) => state.user.status;
export const formError = (state: RootState) => state.user.errorMessage;
export const userData = (state: RootState) => state.user.userData;

export default userSlice.reducer;
