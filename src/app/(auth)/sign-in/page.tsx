"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { signInSchema } from "@/schemas/signInSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { signIn } from "next-auth/react";
import { Loader2 } from "lucide-react";

const Signin = () => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const { toast } = useToast();

  const form = useForm({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  const router = useRouter();
  const onSubmit = async (data: z.infer<typeof signInSchema>) => {
    setIsSubmitting(true);
    const result = await signIn("credentials", {
      redirect: false,
      email: data.email,
      password: data.password,
    });
    if (result?.error) {
      toast({
        title: "Login Failed",
        description: result.error,
        variant: "destructive",
      });
      setIsSubmitting(false);
      return;
    }

    if (result?.url) {
      router.replace("/talk");
    }
    toast({
      title: "Welcome Back",
      variant: "default",
    });
    setIsSubmitting(false);
  };
  return (
    <main className="min-h-screen w-full flex justify-center items-center bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-8 bg-transparent rounded-lg shadow-md">
        <div className="flex justify-center items-center py-6">
          <h1 className="text-4xl font-bold">Welcome Back</h1>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Enter Your Email Address</FormLabel>
                  <FormControl>
                    <Input placeholder="Email" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Enter Your Password</FormLabel>
                  <FormControl>
                    <Input placeholder="Password" type="password" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isSubmitting} className="w-full">
              {isSubmitting ? (
                <>
                  Signing In
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                </>
              ) : (
                "Sign In"
              )}
            </Button>
          </form>
        </Form>
        <p>
          Sign Up here{" "}
          <Link href={"/sign-up"} className="text-blue-600 hover:text-blue-800">
            Sign Up
          </Link>
        </p>
        <p>
          Have you forgotten your Password?{" "}
          <Link
            href={"/forgot-password"}
            className="text-blue-600 hover:text-blue-800"
          >
            Forgot Password
          </Link>
        </p>
      </div>
    </main>
  );
};

export default Signin;
