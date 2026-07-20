"use client";
import React, { useState } from "react";
import { useSignUp } from "@clerk/nextjs/legacy";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Eye, EyeOff, Lock, Mail, MailCheck, UserPlus } from "lucide-react";

function Signup() {
  const { isLoaded, signUp, setActive } = useSignUp();
  const [Emailaddress, setEmailAddress] = React.useState("");
  const [Password, setPassword] = React.useState("");
  const [pendingverfication, setpendinfVerification] = React.useState(false);
  const [code, setcode] = React.useState("");

  const [error, seterror] = useState("");
  const [showPassword, setshowPassword] = useState(false);
  const router = useRouter();

  if (!isLoaded) {
    return null;
  }

  async function submit(e: React.FormEvent) {
    {
      e.preventDefault();
      if (!isLoaded) {
        return;
      }
      try {
        const result = await signUp.create({
          emailAddress: Emailaddress,
          password: Password,
        });
        await signUp.prepareEmailAddressVerification({
          strategy: "email_code",
        });
        setpendinfVerification(true);
      } catch (e: any) {
        console.log(JSON.stringify(e, null, 2));
        seterror(e.errors[0].message);
      }
    }
  }

  async function onPressverfication(e: React.FormEvent) {
    {
      e.preventDefault();
      if (!isLoaded) {
        return;
      }
      try {
        const completeSignUp = await signUp.attemptEmailAddressVerification({
          code,
        });
        if (completeSignUp.status !== "complete") {
          // await setActive({ session: completeSignUp.createdSessionId });
          console.log(JSON.stringify(completeSignUp, null, 2));
        }
        if (completeSignUp.status === "complete") {
          // await setActive({ session: completeSignUp.createdSessionId });
          await setActive({ session: completeSignUp.createdSessionId });
          router.push("/");

          console.log(JSON.stringify(completeSignUp, null, 2));
        }
      } catch (e: any) {
        console.log(JSON.stringify(e, null, 2));
        seterror(e.errors[0].message);
      }
    }
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-background">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">
            Sign Up for Todo Master
          </CardTitle>
        </CardHeader>
        <CardContent>
          {!pendingverfication ? (
            <form onSubmit={submit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  type="email"
                  id="email"
                  value={Emailaddress}
                  onChange={(e) => setEmailAddress(e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    value={Password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setshowPassword(!showPassword)}
                    className="absolute right-2 top-1/2 -translate-y-1/2"
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4 text-gray-500" />
                    ) : (
                      <Eye className="h-4 w-4 text-gray-500" />
                    )}
                  </button>
                </div>
              </div>
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              <Button type="submit" className="w-full">
                Sign Up
              </Button>
            </form>
          ) : (
            <form onSubmit={onPressverfication} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="code">Verification Code</Label>
                <Input
                  id="code"
                  value={code}
                  onChange={(e) => setcode(e.target.value)}
                  placeholder="Enter verification code"
                  required
                />
              </div>
              {error && (
                <Alert variant="destructive">
                  <AlertDescription>{error}</AlertDescription>
                </Alert>
              )}
              <Button type="submit" className="w-full">
                Verify Email
              </Button>
            </form>
          )}
        </CardContent>
        <CardFooter className="justify-center">
          <p className="text-sm text-muted-foreground">
            Already have an account?{" "}
            <Link
              href="/sign-in"
              className="font-medium text-primary hover:underline"
            >
              Sign in
            </Link>
          </p>
        </CardFooter>
      </Card>
    </div>
  );
}

export default Signup;
