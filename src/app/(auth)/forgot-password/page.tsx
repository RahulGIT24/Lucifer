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
import { forgotPasswordSchema } from "@/schemas/forgotPasswordSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useState } from "react";
import { useForm } from "react-hook-form";
import {z} from "zod";
import axios, { AxiosError } from "axios"
import { ApiResponse } from "@/types/ApiResponse";
import { useToast } from "@/components/ui/use-toast";

const page = () => {
  const [isChecking, setIsChecking] = useState<boolean>(false);
  const form = useForm({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: "",
    },
  });
  const {toast} = useToast();

  const onSubmit = async (data:z.infer<typeof forgotPasswordSchema>) => {
    try {
      setIsChecking(true);
      const result = await axios.post('/api/forgot-password',{email:data.email});
      toast({
        description: result.data.message,
        variant: "default",
      })
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>
      let errMessage = axiosError.response?.data.message;
      toast({
        title: "Error occured",
        description: errMessage,
        variant: "destructive",
      });
    }finally{
      setIsChecking(false)
    }
  };
  return (
    <main className="min-h-screen w-full flex justify-center items-center bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-8 bg-transparent rounded-lg shadow-md">
        <div className="flex justify-center items-center py-6">
          <h1 className="text-4xl font-bold">Password Recovery</h1>
        </div>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Enter Email Address</FormLabel>
                <FormControl>
                  <Input placeholder="Email" {...field} />
                </FormControl>
              </FormItem>
            )}
          />
          <Button className="w-full" type="submit">
            {isChecking ? (
              <>
                <ReloadIcon className="mr-2 h-4 w-4 animate-spin"/> Sending
              </>
            ) : (
              <>Send Password Recovery Link</>
            )}
          </Button>
        </form>
      </Form>
      </div>
    </main>
  );
};

export default page;
