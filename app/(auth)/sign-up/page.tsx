"use client";

import AuthForm from "@/components/AuthForm";
import { signUp } from "@/lib/actions/auth";
import { signUpSchema } from "@/lib/validation";
// import { signUpSchema } from "@/lib/validations";
// import { signUp } from "@/lib/actions/auth";

const Page = () => (
    <AuthForm
        type="SIGN_UP"
        schema={signUpSchema}
        defaultValues={{
            email: "",
            password: "",
            fullName: "",
            universityId: 0,
            universityCard: "",
        }}
        // @ts-ignore

        onSubmit={signUp}
    />
);

export default Page;
