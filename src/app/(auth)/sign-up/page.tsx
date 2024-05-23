"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";
import { signUpSchema } from "@/schemas/signUpSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { ReloadIcon } from "@radix-ui/react-icons";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { ApiResponse } from "@/types/ApiResponse";
import Link from "next/link";

const sinUp = () => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const { toast } = useToast();
  const router = useRouter();

  const form = useForm({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
      gender: "",
    },
  });

  async function signup(data: any) {
    try {
      setIsSubmitting(true);
      const res = await axios.post<ApiResponse>("/api/sign-up", data);
      toast({
        title: "Success",
        description: res.data.message,
      });
      router.replace(`/verify/${res.data.userId}`);
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      let errMessage = axiosError.response?.data.message;
      toast({
        title: "Sign Up Failed",
        description: errMessage,
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  }
  return (
    <main className="min-h-screen w-full flex justify-center items-center bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-8 bg-transparent rounded-lg shadow-md">
        <div className="flex justify-center items-center py-6">
          <h1 className="text-4xl font-bold">Create Your Account</h1>
        </div>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(signup)} className="space-y-6">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Enter Your Full Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Name" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
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
                    <Input placeholder="password"  type="password" {...field} />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="gender"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Select Your Gender</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger className="text-black">
                        <SelectValue placeholder="Gender" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </FormItem>
              )}
            />
            <Button type="submit" disabled={isSubmitting} className="w-full">
              {isSubmitting ? (
                <>
                  <ReloadIcon className="mr-2 h-4 w-4 animate-spin" /> Signing
                  Up
                </>
              ) : (
                "Sign Up"
              )}
            </Button>
          </form>
        </Form>
        <p>Already have an account? <Link
              href={"/sign-in"}
              className="text-blue-600 hover:text-blue-800"
            >
              Sign In
            </Link></p>
      </div>
    </main>
  );
};

export default sinUp;
