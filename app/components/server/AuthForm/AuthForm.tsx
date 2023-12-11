"use client";
import { createUser } from "@/utils/functions/server/auth";
import Image from "next/image";
import { Button } from "../../client";
import Link from "next/link";
import { Input } from "../../client/Input";

export default function AuthForm({ action }: { action: "login" | "register" }) {
  const handleSubmit = async (formData: FormData) => {
    const user = await createUser(formData);
  };

  return (
    <form
      action={handleSubmit}
      className="md:rounded-s md:shadow-xl w-full bg-white md:w-[40rem] py-8 animate-fade-in"
    >
      <div className="w-[90%] mx-auto space-y-8">
        <div className="w-24 h-24 mx-auto">
          <Image
            src={"/images/logos/dance4life.png"}
            alt="Malipoma"
            width={1080}
            height={1080}
            draggable={false}
          />
        </div>
        <div className="text-center space-y-8">
          <h1 className="font-bold text-3xl">
            {action === "login"
              ? "Welcome to Dance4Life"
              : "Create a new account"}
          </h1>
          {action === "login" ? (
            <p className="font-semibold text-black-faded text-[1.25rem]">
              Dance! Dance like your life depends on it...
            </p>
          ) : null}
        </div>
        <div className="space-y-7">
          {/* <Input
            type="email"
            className="bg-brand-orange/10"
            leading={
              <div className="w-6 h-6">
                <Image
                  src="/icons/message.svg"
                  alt="google"
                  width={480}
                  height={480}
                />
              </div>
            }
            placeholder="Email Address"
          />
          <Input
            type="password"
            className="bg-brand-orange/10"
            leading={
              <div className="w-6 h-6">
                <Image
                  src="/icons/lock.svg"
                  alt="google"
                  width={480}
                  height={480}
                />
              </div>
            }
            placeholder="Password"
          />
          <div className="">
            <Link
              href={action === "login" ? "classes" : "register/add-details"}
            >
              <Button type="submit" color="blue" className="capitalize">
                {action === "login" ? "login" : "register"}
              </Button>
            </Link>
          </div> */}

          {/* <div className="flex justify-between text-blue-primary">
            <Link href={`${action === "login" ? "register" : "login"}`}>
              {action === "login" ? "Sign up" : "Login"} instead
            </Link>
            <Link href={"/login/recover-account"}>Problems signing in?</Link>
          </div> */}
          <div className="space-y-4 md:flex md:space-y-0 items-center gap-2">
            <div className="border active:scale-90 overflow-clip cursor-pointer bg-brand-orange/10 border-grey rounded-xl transition-all duration-200">
              <button className="flex px-3 py-3 active:!scale-100 justify-center items-center gap-2 sm:w-full w-[50%] mx-auto">
                <span className="w-8 h-8">
                  <Image
                    src="/icons/google.svg"
                    alt="google"
                    width={480}
                    height={480}
                  />
                </span>
                Continue with Google
              </button>
            </div>
          </div>
        </div>
      </div>
    </form>
  );
}
