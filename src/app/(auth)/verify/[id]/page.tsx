"use client";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { verifyCodeSchema } from "@/schemas/verifyCodeSchema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { z } from "zod";
import axios, { AxiosError } from "axios";
import { useToast } from "@/components/ui/use-toast";
import { ApiResponse } from "@/types/ApiResponse";
import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

const Page = () => {
  const params = useParams();
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const onSubmit = async (data: z.infer<typeof verifyCodeSchema>) => {
    try {
      setIsSubmitting(true);
      const { code } = data;
      const result = await axios.post("/api/verify-code", { id:params.id, code });
      toast({
        title: "User verified",
        description: result.data.message,
      });
      router.replace('/sign-in')
    } catch (error) {
      const axiosError = error as AxiosError<ApiResponse>;
      let errMessage = axiosError.response?.data.message;
      toast({
        title: "Error while verifying user",
        description: errMessage,
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const form = useForm({
    resolver: zodResolver(verifyCodeSchema),
    defaultValues: {
      code: "",
    },
  });

  const renderSlots = (n: number) => {
    const slots = [];
    for (let i = 0; i < n; i++) {
      slots.push(
        <InputOTPSlot key={i} index={i} className="border border-black" />
      );
    }
    return slots;
  };
  return (
    <main className="min-h-screen w-full flex justify-center items-center bg-gray-100">
      <div className="w-full max-w-md p-8 space-y-8 bg-transparent rounded-lg shadow-md">
        <div className="flex justify-center items-center py-6">
          <h1 className="text-4xl font-bold">Verify Your Account</h1>
        </div>
        <div className="w-full flex justify-center items-center">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)}>
              <FormField
                control={form.control}
                name="code"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Enter Your 6 digit verification code</FormLabel>
                    <FormControl>
                      <InputOTP maxLength={6} {...field}>
                        <InputOTPGroup>{renderSlots(6)}</InputOTPGroup>
                      </InputOTP>
                    </FormControl>
                  </FormItem>
                )}
              />
              <Button className="my-4 w-full" type="submit" >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin"/> Verifying
                  </>
                ) : (
                  "Verify"
                )}
              </Button>
            </form>
          </Form>
        </div>
      </div>
    </main>
  );
};

export default Page;
