"use server"

import { cookies } from "next/headers";

export const getMe = async () => {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get("accessToken")?.value;

  if (!accessToken) {
    return {
      success: false,
      message: "User not Logged In",
    };
  }

  const res = await fetch(
    `${process.env.BACKEND_API_URL}/api/users/me`,
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
      next: {
      revalidate: 60 * 60 * 24, // 24 hours
      tags: ["my-profile"],
    },
    }
  );

  const result = await res.json();

  console.log(result);

  return result;
};