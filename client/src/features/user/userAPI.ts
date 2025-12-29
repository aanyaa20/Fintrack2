import { apiClient } from "@/app/api-client";
import { UpdateUserResponse } from "./userType";

export const userApi = apiClient.injectEndpoints({
  endpoints: (builder) => ({
    updateUser: builder.mutation<UpdateUserResponse, FormData>({
      query: (formData) => ({
        url: "/user/update",
        method: "PUT",
        body: formData,
      }),
    }),
    deleteAccount: builder.mutation<void, void>({
      query: () => ({
        url: "/user/delete-account",
        method: "DELETE",
      }),
    }),
  }),
});

export const { useUpdateUserMutation, useDeleteAccountMutation } = userApi;