import config from "@/config";
import ImageKit from "imagekit";
import { NextResponse } from "next/server";
console.log("hello world");

// destructure the env
const {
  env: {
    imagekit: { publicKey, privateKey, urlEndpoint },
  },
} = config;
const imagekit = new ImageKit({
  publicKey,
  privateKey,
  urlEndpoint,
});

export async function GET() {
  return NextResponse.json(imagekit.getAuthenticationParameters());
}
