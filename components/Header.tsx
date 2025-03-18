import Link from "next/link";
import Image from "next/image";
// import { signOut } from "@/auth";
import { Button } from "@/components/ui/button";
import { Session } from "next-auth";
import { AvatarFallback } from "@radix-ui/react-avatar";
import { Avatar } from "./ui/avatar";
import { getInitials } from "@/lib/utils";

const Header = ({ session }: { session: Session }) => {
    console.log(session)
    return (
        <header className=" my-10 flex justify-between">
            <Link href="/">
                <Image src="/icons/logo.svg" alt="logo" width={40} height={40} />
            </Link>

            <ul className="flex flex-row items-center justify-center w-full gap-8">
                <li>
                    <form

                        className="mb-10"
                    >
                        <Button>Logout</Button>
                    </form>
                </li>

                <li>
                    <Link href="/profile">
                        <Avatar>
                            <AvatarFallback className="bg-amber-100 flex items-center justify-center">{getInitials(session?.user?.name || "SB")}</AvatarFallback>
                            Heloo

                        </Avatar>

                    </Link>
                </li >
            </ul>
        </header>
    );
};

export default Header;
