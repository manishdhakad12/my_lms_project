import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const COURSE_PURCHASE_API = "http://localhost:8080/api/v1/purchase";

export const purchaseApi = createApi({
  reducerPath: "purchaseApi",
  baseQuery: fetchBaseQuery({ baseUrl: COURSE_PURCHASE_API, credentials: "include" }),
  endpoints: (builder) => ({
    // 👈 Keep this for Stripe (if you still use it)
    createCheckoutSession: builder.mutation({
      query: (courseId) => ({
        url: "/create-checkout-session",
        method: "POST",
        body: { courseId }
      })
    }),
    // ✅ New mutation for Cashfree
    createCashfreeOrder: builder.mutation({
      query: ({ courseId }) => ({
        url: "/create-order",  // Matches backend POST /create-order
        method: "POST",
        body: { courseId }
      })
    }),
    getCourseDetailWithStatus: builder.query({
      query: (courseId) => ({
        url: `/course/${courseId}/detail-with-status`,
        method: "GET"
      })
    }),
    getPurchasedCourses: builder.query({
      query: () => ({ url: "/", method: "GET" })
    })
  })
});

export const {
  useCreateCheckoutSessionMutation,
  useCreateCashfreeOrderMutation,
  useGetCourseDetailWithStatusQuery,
  useGetPurchasedCoursesQuery
} = purchaseApi;
