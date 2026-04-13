"use server";

import { redirect } from "next/navigation";
import {
  clearSession,
  createSession,
  registerDummyUser,
  verifyDummyLogin,
} from "@/lib/dummy-auth";

function getString(value: FormDataEntryValue | null) {
  return typeof value === "string" ? value.trim() : "";
}

function isValidEmail(email: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

function isValidName(name: string) {
  return name.length >= 2 && name.length <= 80;
}

function isValidPassword(password: string) {
  if (password.length < 8 || password.length > 128) {
    return false;
  }

  const hasLower = /[a-z]/.test(password);
  const hasUpper = /[A-Z]/.test(password);
  const hasDigit = /\d/.test(password);

  return hasLower && hasUpper && hasDigit;
}

export async function signupAction(formData: FormData) {
  const name = getString(formData.get("name"));
  const email = getString(formData.get("email")).toLowerCase();
  const password = getString(formData.get("password"));

  if (!isValidName(name)) {
    redirect("/signup?error=invalid_name");
  }

  if (!isValidEmail(email)) {
    redirect("/signup?error=invalid_email");
  }

  if (!isValidPassword(password)) {
    redirect("/signup?error=weak_password");
  }

  await registerDummyUser({ name, email, password });
  redirect("/login?auth=signed_up");
}

export async function loginAction(formData: FormData) {
  const email = getString(formData.get("email")).toLowerCase();
  const password = getString(formData.get("password"));

  if (!isValidEmail(email) || password.length === 0) {
    redirect("/login?error=invalid_input");
  }

  const user = await verifyDummyLogin(email, password);
  if (!user) {
    redirect("/login?error=invalid_credentials");
  }

  await createSession(user);
  redirect("/?auth=signed_in");
}

export async function logoutAction() {
  await clearSession();
  redirect("/login?auth=signed_out");
}
