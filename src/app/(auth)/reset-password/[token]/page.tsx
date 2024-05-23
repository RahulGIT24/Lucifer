"use client";
import { resetPasswordSchema } from "@/schemas/resetPasswordSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useParams, useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";
import axios, { AxiosError } from "axios";
import { ApiResponse } from "@/types/ApiResponse";
import { useToast } from "@/components/ui/use-toast";
import { useEffect, useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ReloadIcon } from "@radix-ui/react-icons";

const page = () => {
  const [token, setToken] = useState("");
  const [isChanging, setIsChanging] = useState<boolean>(false);
  const { toast } = useToast();
  const form = useForm({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      password: "",
      password1: "",
    },
  });
  const router = useRouter();

  const changePassword = async (data: z.infer<typeof resetPasswordSchema>) => {
    try {
      setIsChanging(true);
      if (data.password !== data.password1) {
        toast({
          title: "Passwords don't match",
          variant: "destructive",
        });
        return;
      }

      const result = await axios.post("/api/reset-password", {
        token,
        password: data.password,
      });
      toast({
        description: result.data.message,
        variant: "default",
      });
      router.replace("/sign-in");
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      let errMessage = axiosError.response?.data.message;
      toast({
        description: errMessage,
        variant: "destructive",
      });
    } finally {
      setIsChanging(false);
    }
  };

  useEffect(() => {
    const url = location.href.split("/");
    setToken(url[url.length - 1]);
  }, [location.href]);

  return (
    <main className="min-h-screen w-full flex justify-center items-center bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-8 bg-transparent rounded-lg shadow-md">
        <div className="flex justify-center items-center py-6">
          <h1 className="text-4xl font-bold">Reset Your Password</h1>
        </div>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(changePassword)}
            className="space-y-6"
          >
            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Enter Your New Password</FormLabel>
                  <FormControl>
                    <Input placeholder="Password" type="password" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="password1"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Re-enter Your New Password</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Re-enter Password"
                      type="password"
                      {...field}
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <Button type="submit" className="w-full">
              {isChanging ? (
                <>
                  <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                </>
              ) : (
                "Reset Password"
              )}
            </Button>
          </form>
        </Form>
      </div>
    </main>
  );
};

export default page;
