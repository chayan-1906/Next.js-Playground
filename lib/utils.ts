import {twMerge} from "tailwind-merge";
import {type ClassValue, clsx} from "clsx";

function cn(...inputs: ClassValue[]) {
    return twMerge(clsx(inputs));
}

export {cn};
