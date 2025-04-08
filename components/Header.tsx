import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Session } from "next-auth";
import { AvatarFallback } from "@radix-ui/react-avatar";
import { Avatar } from "./ui/avatar";
import { getInitials } from "@/lib/utils";
import { BookOpen, Search, LogOut } from "lucide-react";

const Header = ({ session }: { session: Session }) => {
    return (
        <header className="py-6 px-8 flex items-center justify-between bg-black bg-opacity-95 backdrop-blur-lg border-b border-zinc-800 sticky top-0 z-50">
            <Link href="/" className="flex items-center gap-3 group">
                <div className="bg-gradient-to-br from-purple-500 to-pink-600 p-2 rounded-lg shadow-lg shadow-purple-500/20 group-hover:shadow-purple-500/30 transition-all duration-300">
                    <BookOpen size={24} color="white" />
                </div>
                <span className="text-xl font-medium bg-clip-text text-transparent bg-gradient-to-r from-purple-300 to-pink-300 group-hover:from-purple-200 group-hover:to-pink-200 transition-all duration-300">Lumina<span className="font-bold">Books</span></span>
            </Link>

            <nav className="flex-1 max-w-xl mx-auto">
                <ul className="flex justify-center gap-8">
                    <li>
                        <Link href="/browse" className="text-zinc-400 hover:text-white relative group py-2">
                            Browse
                            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-500 group-hover:w-full transition-all duration-300"></span>
                        </Link>
                    </li>
                    <li>
                        <Link href="/collections" className="text-zinc-400 hover:text-white relative group py-2">
                            Collections
                            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-500 group-hover:w-full transition-all duration-300"></span>
                        </Link>
                    </li>
                    <li>
                        <Link href="/recommendations" className="text-zinc-400 hover:text-white relative group py-2">
                            For You
                            <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-purple-500 group-hover:w-full transition-all duration-300"></span>
                        </Link>
                    </li>
                </ul>
            </nav>

            <div className="flex items-center gap-4">
                <Button variant="ghost" className="rounded-full p-2 text-zinc-400 hover:text-white hover:bg-zinc-800">
                    <Search size={20} />
                </Button>

                <form>
                    <Button variant="ghost" className="rounded-full p-2 text-zinc-400 hover:text-white hover:bg-zinc-800">
                        <LogOut size={20} />
                    </Button>
                </form>

                <Link href="/profile" className="flex items-center gap-3 group">
                    <div className="relative">
                        <Avatar className="border-2 border-zinc-800 group-hover:border-purple-500 transition-colors duration-300">
                            <AvatarFallback className="bg-gradient-to-br from-purple-600 to-pink-600 text-white flex items-center justify-center font-medium">
                                {getInitials(session?.user?.name || "SB")}
                            </AvatarFallback>
                        </Avatar>
                        <div className="absolute -bottom-1 -right-1 w-3 h-3 bg-emerald-500 rounded-full border-2 border-black"></div>
                    </div>
                    <div className="hidden md:block">
                        <p className="text-sm font-medium text-white leading-tight">
                            {session?.user?.name || "Guest Reader"}
                        </p>
                        <p className="text-xs text-zinc-500 leading-tight">Premium Member</p>
                    </div>
                </Link>
            </div>
        </header>
    );
};

export default Header;