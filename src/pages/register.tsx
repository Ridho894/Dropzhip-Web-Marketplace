import Button from "@/components/core/Button";
import Checkbox from "@/components/core/Checkbox";
import Input from "@/components/core/Input";
import Seo from "@/components/Seo";
import { toastSuccess } from "@/components/core/Toast";
import env from "@/config/env";
import fetchRegister from "@/services/auth/register.service";
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
  name: string;
  username: string;
  email: string;
  password: string;
}

const schema = yup.object({
  name: yup.string().required(),
  username: yup.string().required(),
  email: yup.string().required(),
  password: yup.string().required(),
});

const Register = () => {
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

  const name = watch("name");
  const username = watch("username");
  const email = watch("email");
  const password = watch("password");

  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [isPasswordShown, setIsPasswordShown] = useState<Boolean>(false);

  const onSubmit: SubmitHandler<IFormInputs> = async (data) => {
    setIsLoading(true);
    setShowError(false);

    try {
      await fetchRegister({
        name: data.name,
        username: data.username,
        email: data.email,
        password: data.password,
      });
    } catch (error) {
      console.log(error);
      setShowError(true);
      setIsLoading(false);
    } finally {
      toastSuccess("Success create user");
      router.push("/login");
    }
  };
  return (
    <>
      <Seo templateTitle="Register" />
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
              <h3 className="font-bold text-h3 text-base-900 pb-2 text-center md:text-left">
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
                  <p className="text-base-800 font-medium text-sub2">Name</p>
                  <Input
                    type="text"
                    placeholder="Please enter your name"
                    error={errors.name != null}
                    onChange={(e) => {
                      setValue("name", e.target.value);
                    }}
                  />
                  {errors.name && (
                    <div className="text-red-600 text-sub3">
                      Name is required
                    </div>
                  )}
                </div>
                <div className="space-y-1">
                  <p className="text-base-800 font-medium text-sub2">
                    Username
                  </p>
                  <Input
                    type="text"
                    placeholder="Please enter your username"
                    error={errors.username != null}
                    onChange={(e) => {
                      setValue("username", e.target.value);
                    }}
                  />
                  {errors.username && (
                    <div className="text-red-600 text-sub3">
                      Username is required
                    </div>
                  )}
                </div>
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

              <Button full className="my-8">
                Register
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
      </div>
    </>
  );
};

export default Register;
