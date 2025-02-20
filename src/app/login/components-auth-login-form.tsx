"use client";
import IconLockDots from "@/components/icon/icon-lock-dots";
import IconMail from "@/components/icon/icon-mail";
import { COOKIES } from "@/constants/common";
import { useAuth } from "@/hooks/useAuth";
import { TInputForm } from "@/types/inputForm";
import { getCookie } from "cookies-next";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";

const ComponentsAuthLoginForm = () => {
  const { login, isRemember, loading } = useAuth();
  const [inputs, setInputs] = useState<TInputForm>({});
  const [showPasswd, setShowPasswd] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const token = getCookie(COOKIES.tokenName);
    if (token) {
      return router.replace("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleShowPasswd = () => {
    setShowPasswd(!showPasswd);
  };

  const submitForm = async (e: FormEvent) => {
    e.preventDefault();
    await login(inputs, isRemember);
  };

  const handleChange = (event: ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setInputs((values) => ({ ...values, [name]: value }));
  };

  return (
    <form className="space-y-5 dark:text-white" onSubmit={submitForm}>
      <div>
        <label htmlFor="Email">Email</label>
        <div className="relative text-white-dark">
          <input
            id="Email"
            type="email"
            name="email"
            value={inputs.email || ""}
            onChange={handleChange}
            placeholder="Enter Email"
            className="form-input ps-10 placeholder:text-white-dark"
          />
          <span className="absolute start-4 top-1/2 -translate-y-1/2">
            <IconMail fill={true} />
          </span>
        </div>
      </div>
      <div>
        <label htmlFor="Password">Password</label>
        <div className="relative text-white-dark">
          <input
            id="Password"
            type={showPasswd ? "text" : "password"}
            name="password"
            value={inputs.password || ""}
            onChange={handleChange}
            placeholder="Enter Password"
            className="form-input ps-10 placeholder:text-white-dark"
          />
          <span className="absolute start-4 top-1/2 -translate-y-1/2">
            <IconLockDots fill={true} />
          </span>
          <div className="absolute top-0 bottom-0 flex items-center right-3">
            <button type="button" onClick={handleShowPasswd}>
              {showPasswd ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
            </button>
          </div>
        </div>
      </div>
      <div>
        <label className="flex gap-2 cursor-pointer items-center">
          <input
            type="checkbox"
            className="form-checkbox bg-white dark:bg-black"
          />
          <span className="text-white-dark">
            Subscribe to weekly newsletter
          </span>
        </label>
      </div>
      <button
        type="submit"
        className="btn btn-gradient !mt-6 w-full border-0 uppercase shadow-[0_10px_20px_-10px_rgba(67,97,238,0.44)]"
        disabled={loading}
      >
        {loading ? "Loading..." : "Sign in"}
      </button>
      <div>
        <Link href="https://reqres.in" target="_blank">
          <p className="text-info hover:text-blue-600 text-sm transition-all duration-300">
            Reference API
          </p>
        </Link>
      </div>
    </form>
  );
};

export default ComponentsAuthLoginForm;
