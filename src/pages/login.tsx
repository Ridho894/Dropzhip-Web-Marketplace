import Button from "@/components/core/Button";
import Checkbox from "@/components/core/Checkbox";
import Input from "@/components/core/Input";
import Seo from "@/components/Seo";
import env from "@/config/env";
import fetchSignin from "@/services/auth/signin.service";
import { yupResolver } from "@hookform/resolvers/yup";
import { useQueryClient } from "@tanstack/react-query";
import Cookies from "js-cookie";
import { getSession, signIn } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { SubmitHandler, useForm } from "react-hook-form";
import * as yup from "yup";

import EyeOpenIcon from "~/icons/akar/eye-open.svg";
import EyeSlashedIcon from "~/icons/akar/eye-slashed.svg";
import WarningIcon from "~/icons/duotone/Warning.svg";
import CloseIcon from "~/icons/line/Close.svg";

export interface IFormInputs {
  email: string;
  password: string;
  google_recaptcha: string;
}

const schema = yup.object({
  email: yup.string().required(),
  password: yup.string().required(),
});

const Login = () => {
  // hooks
  const queryClient = useQueryClient();
  const router = useRouter();
  const { redirect } = router.query;

  const [showError, setShowError] = useState<boolean>(false);

  const {
    formState: { errors },
    setValue,
    handleSubmit,
    watch,
  } = useForm<IFormInputs>({
    resolver: yupResolver(schema),
  });

  const email = watch("email");
  const password = watch("password");
  const googleRecaptcha = watch("google_recaptcha");

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isPasswordShown, setIsPasswordShown] = useState<Boolean>(false);

  const onSubmit: SubmitHandler<IFormInputs> = async (data) => {
    setIsLoading(true);
    setShowError(false);

    const result = await signIn("credentials", {
      redirect: false,
      email: data.email,
      password: data.password,
      gRecaptchaToken: data.google_recaptcha,
    });

    if (!result?.ok) {
      setShowError(true);
      setIsLoading(false);
      return;
    }
    let bcrypt = require("bcryptjs");
    let salt = bcrypt.genSaltSync(10);
    let hash = bcrypt.hashSync(data.password, salt);

    Cookies.set("dropzhip_build", hash);
    // clear all react query cache
    queryClient.clear();

    router.push("/dashboard");
  };
  return (
    <>
      <Seo templateTitle="Login" />
      <div className="flex min-h-screen">
        {/* Left  */}
        <div className="relative w-full z-0 overflow-hidden flex flex-col">
          <div className="flex justify-center pt-8 w-full">
            <Image
              src="/logo.png"
              height={50}
              width={50}
              className="mx-auto"
              alt="Dropzhip Indonesia"
              quality={100}
            />
          </div>
          <div className="flex flex-auto justify-center bg-base-100 rounded-lg p-6 md:p-0 items-center">
            <form
              onSubmit={handleSubmit(onSubmit)}
              className="w-[460px] mx-auto"
            >
              <h3 className="font-bold text-h3 text-base-900 pb-4 text-center md:text-left">
                Log In
              </h3>
              <p className="text-base-800 pb-6 text-center text-sub2 md:text-left">
                Enter your store credentials below to enter
              </p>
              {showError && (
                <div className="mb-10 mt-5 flex justify-between items-center border bg-[#FFF9F9] rounded-md border-danger-600 p-3 text-sub2 font-light shadow">
                  <div className="flex items-center gap-2">
                    <WarningIcon height={24} width={24} />
                    <span>
                      We could not find that email and password combination
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setShowError(false)}
                    className="flex items-center"
                  >
                    <CloseIcon className="my-auto" height={24} width={24} />
                  </button>
                </div>
              )}

              <div className="space-y-5">
                <div className="space-y-1">
                  <p className="text-base-800 font-medium text-sub2">
                    Email Address
                  </p>
                  <Input
                    type="text"
                    placeholder="Please enter your email Address"
                    error={errors.email != null}
                    onChange={(e) => {
                      setValue("email", e.target.value);
                    }}
                  />
                  {errors.email && (
                    <div className="text-red-600 text-sub3">
                      Email is required
                    </div>
                  )}
                </div>
                <div className="space-y-1">
                  <p className="text-base-800 pb-1 font-medium text-sub2">
                    Password
                  </p>
                  <Input
                    type={isPasswordShown ? "text" : "password"}
                    placeholder="Please enter your password"
                    rightIcon={
                      isPasswordShown ? (
                        <EyeSlashedIcon height={18} width={18} />
                      ) : (
                        <EyeOpenIcon height={18} width={18} />
                      )
                    }
                    rightIconClick={() => setIsPasswordShown(!isPasswordShown)}
                    error={errors.password != null}
                    onChange={(e) => {
                      setValue("password", e.target.value);
                    }}
                  />
                  {errors.password && (
                    <div className="text-red-600 text-sub3">
                      Password is required
                    </div>
                  )}
                </div>
              </div>

              <div className="py-8 flex">
                <div className="flex items-center mr-6">
                  <Checkbox id="remember" name="remember" />
                  <label
                    htmlFor="remember"
                    className="text-sub2 font-medium text-base-800"
                  >
                    Remember Me
                  </label>
                </div>
                {/* <div className="inline-block">
                <Checkbox id="stay_signed" name="stay_signed" />
                <label
                  htmlFor="stay_signed"
                  className="text-sub2 font-medium text-base-800"
                >
                  Stay signed in
                </label>
              </div> */}
              </div>

              <div className="pb-4">
                <ReCAPTCHA
                  className="w-full"
                  sitekey={env.GOOGLE_RECAPTCHA_KEY}
                  onChange={(token) => {
                    if (token) {
                      setValue("google_recaptcha", token);
                    }
                  }}
                />
              </div>

              <Button
                type="submit"
                full
                disabled={!email || !password || !googleRecaptcha || isLoading}
                className="mb-4 !bg-dropzhip_blue-light"
              >
                Log In
              </Button>

              <div className="text-center">
                <Link href="/forgot-password" passHref>
                  <a href="">
                    <p className="text-sub2 cursor-pointer hover:underline text-secondary-600 font-medium">
                      I forgot my password
                    </p>
                  </a>
                </Link>
              </div>
            </form>
          </div>
        </div>

        {/* Right  */}
        {/* <div className="hidden md:block min-w-[590px] relative overflow-hidden z-0">
          <div className="h-full bg-red-700">
            <Image
              src="/images/login.jpg"
              height={100}
              objectFit="cover"
              width={200}
              quality={100}
              alt=""
            />
          </div>
        </div> */}
      </div>
    </>
  );
};

export default Login;
