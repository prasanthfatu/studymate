import {RegisterLink, LoginLink} from "@kinde-oss/kinde-auth-nextjs/components";
import { Button } from "@/components/ui/button";

export default function LoginPage(){
    return(
        <main className='flex flex-row justify-center items-center gap-4 m-5'>
            <Button
                variant="default"
                title="SignIn"
                aria-label="SignIn"
                asChild
            >
                <LoginLink>Sign In</LoginLink>
            </Button>
            <Button
                variant="default"
                title="SignUp"
                aria-label="SinUp"
                asChild
            >
                <RegisterLink>Sign Up</RegisterLink>
            </Button>
        </main>
    )
}
