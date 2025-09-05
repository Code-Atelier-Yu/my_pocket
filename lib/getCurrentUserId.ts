"use server";

import { auth } from "@/auth";
import { redirect } from "next/navigation";

export async function getCurrentUserId () {
  const session = await auth();

  if(!session?.user) {
    redirect("/signin");
  }

  return session.user.id;
}