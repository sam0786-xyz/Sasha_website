"use server";
import { signIn } from "@/lib/auth";
import { redirect } from "next/navigation";
export async function login(formData:FormData){const ok=await signIn(String(formData.get("email")||""),String(formData.get("password")||""));if(!ok)redirect("/ops/login?error=1");redirect("/ops")}
