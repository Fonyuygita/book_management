"use client"
import React, { useRef, useState } from 'react'
// imagekit documentation: https://imagekit.io/docs/integration/react
import { IKImage, IKVideo, ImageKitProvider, IKUpload, ImageKitContext } from "imagekitio-next";
import config from '@/config';
import { toast } from 'sonner';
import Image from 'next/image';
import { cn } from '@/lib/utils';
// destructure the env
const {
    env: {
        imagekit: { publicKey, urlEndpoint },
    },
} = config;


// all client side component

const authenticator = async () => {
    try {
        const response = await fetch(`${config.env.apiEndpoint}/api/auth/imagekit`);
        if (!response.ok) {
            const errorText = await response.text()
            throw new Error(`Request failed with status ${response.status}: ${errorText}`)
        }

        const data = await response.json();
        const { signature, expire, token } = data

    } catch (err) {
        console.log('Error occurred while processing image');
    }
}
const ImageUpload = ({ onFileChange }: { onFileChange: (filePath: string) => void }) => {
    const ikUploadRef = useRef(null)
    // state to keep track of file uploading
    const [file, setFile] = useState<{ filePath: string } | null>(null)
    const onError = (error: any) => {
        console.log(error);

        toast(`Your could not be uploaded. Please try again.`);
    };

    const onSuccess = (res: any) => {
        setFile(res);
        onFileChange(res.filePath);

        toast(`${res.filePath} uploaded successfully!`,);
    };



    return (
        <ImageKitProvider
            publicKey={publicKey}
            urlEndpoint={urlEndpoint}
            // @ts-ignore
            authenticator={authenticator}
        >
            <IKUpload
                ref={ikUploadRef}
                onError={onError}
                onSuccess={onSuccess}
                fileName='test-upload.png'

                className="hidden"
            />

            <button
                className={cn("upload-btn")}
                onClick={(e) => {
                    e.preventDefault();

                    if (ikUploadRef.current) {
                        // @ts-ignore
                        ikUploadRef.current?.click();
                    }
                }}
            >
                <Image
                    src="/icons/upload.svg"
                    alt="upload-icon"
                    width={20}
                    height={20}
                    className="object-contain"
                />

                <p className={cn("text-base")}>Upload Image</p>

                {file && (
                    <p className={cn("upload-filename")}>loading...</p>
                )}
            </button>


        </ImageKitProvider>
    )
}

export default ImageUpload
