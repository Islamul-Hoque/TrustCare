"use client";

import Link from "next/link";
import { SocialButtons } from "./SocialButton";
import { useState, ChangeEvent, FormEvent } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import Swal from "sweetalert2";
import { AiOutlineLoading } from "react-icons/ai";

interface RegisterFormState {
  nid: string;
  name: string;
  email: string;
  contact: string;
  password: string;
}

export const RegisterForm = () => {
  const params = useSearchParams();
  const router = useRouter();
  const callbackUrl = params.get("callbackUrl") || "/";
  const [loading, setLoading] = useState<boolean>(false);
  const [form, setForm] = useState<RegisterFormState>({
    nid: "",
    name: "",
    email: "",
    contact: "",
    password: "",
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const isStrongPassword = (password: string) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/;
    return regex.test(password);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log("Form Input Data:", form);
    setLoading(true);

    if (!isStrongPassword(form.password)) {
      Swal.fire(
        "Weak Password",
        "Password must be 6+ characters with 1 uppercase and 1 lowercase letter",
        "error"
      );
      setLoading(false);
      return;
    }

    const res = await fetch("/api/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(form),
    });

    if (!res.ok) {
      const data = await res.json();
      Swal.fire("Error", data?.error || "Registration failed", "error");
      setLoading(false);
      return;
    }

    const result = await signIn("credentials", {
      email: form.email,
      password: form.password,
      redirect: false,
      callbackUrl,
    });
    console.log("SignIn Result:", result);

    if (result?.ok) {
      Swal.fire("Success", "Registered successfully", "success");
      router.push(callbackUrl);
    }

    setLoading(false);
  };

  return (
    <div className="min-h-screen relative flex items-center justify-center bg-base-200">
      {loading && (
        <div className="flex opacity-80 inset-0 absolute z-20 glass w-full h-full justify-center items-center gap-4">
          <AiOutlineLoading size={50} className="animate-spin text-primary font-bold" />
          <h2 className="text-xl font-bold animate-pulse">
            Processing Registration
          </h2>
        </div>
      )}

      <div className="card w-full max-w-sm shadow-xl bg-base-100">
        <div className="card-body">
          <h2 className="text-2xl font-bold text-center">Create Account</h2>

          <form onSubmit={handleSubmit} className="space-y-3">
            <input
              type="text"
              name="nid"
              placeholder="NID No"
              className="input input-bordered w-full"
              onChange={handleChange}
              required
            />

            <input
              type="text"
              name="name"
              placeholder="Full Name"
              className="input input-bordered w-full"
              onChange={handleChange}
              required
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              className="input input-bordered w-full"
              onChange={handleChange}
              required
            />

            <input
              type="tel"
              name="contact"
              placeholder="Contact Number"
              className="input input-bordered w-full"
              onChange={handleChange}
              required
            />

            <input
              type="password"
              name="password"
              placeholder="Min 6 chars, 1 uppercase, 1 lowercase"
              className="input input-bordered w-full"
              onChange={handleChange}
              required
            />

            <button
              disabled={loading}
              type="submit"
              className="btn btn-primary w-full"
            >
              Register
            </button>
          </form>

          <SocialButtons />

          <p className="text-center text-sm mt-4">
            Already have an account?{" "}
            <Link href="/login" className="link link-primary">
              Login
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};
