"use client";

import Image from "next/image";
import {useEffect, useState} from "react";
import {FallbackImageProps} from "@/types/funda";

function FallbackImage({src, alt, errorComponent, ...rest}: FallbackImageProps) {
    const [error, setError] = useState(false);

    useEffect(() => {
        setError(false);
    }, [src]);

    return (
        error ? (
            errorComponent
        ) : (
            <Image
                {...rest}
                src={src || ''}
                alt={alt}
                onError={() => {
                    setError(true);
                }}
            />
        )
    );
}

export {FallbackImage};
