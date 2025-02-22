"use client";

import React from "react";
import AuthForm from "@/components/AuthForm";
import { signInSchema } from "@/lib/validation";
// import { signInSchema } from "@/lib/validations";
// import { signInWithCredentials } from "@/lib/actions/auth";

const Page = () => (
    <AuthForm
        type="SIGN_IN"
        schema={signInSchema}
        defaultValues={{
            email: "",
            password: "",
        }}
    // onSubmit={}
    />
);

export default Page;
