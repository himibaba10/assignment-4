import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://library-management-api-plum-pi.vercel.app/api",
  }),
  tagTypes: ["Book"],
  endpoints: (builder) => ({
    // Queries
    getBooks: builder.query({
      query: () => `/books?limit=100`,
      providesTags: ["Book"],
    }),
    getBook: builder.query({
      query: (bookId) => `/books/${bookId}`,
      providesTags: ["Book"],
    }),
    getBorrowSummary: builder.query({
      query: () => `/borrow`,
      providesTags: ["Book"],
    }),
    // Mutations
    createBook: builder.mutation({
      query: (payload) => ({
        url: "/books",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Book"],
    }),
    updateBook: builder.mutation({
      query: ({ _id, ...payload }) => ({
        url: `/books/${_id}`,
        method: "PUT",
        body: payload,
      }),
      invalidatesTags: ["Book"],
    }),
    borrowBook: builder.mutation({
      query: (payload) => ({
        url: "/borrow",
        method: "POST",
        body: payload,
      }),
      invalidatesTags: ["Book"],
    }),
  }),
});

export const {
  useGetBooksQuery,
  useGetBookQuery,
  useGetBorrowSummaryQuery,
  useCreateBookMutation,
  useUpdateBookMutation,
  useBorrowBookMutation,
} = baseApi;
