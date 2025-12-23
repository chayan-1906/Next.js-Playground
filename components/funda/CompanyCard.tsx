import Image from "next/image";
import {CompanyCardProps} from "@/types/funda";

function CompanyCard({company}: CompanyCardProps) {
    const {name, picture, headquarters, linkedIn} = company || {};

    return (
        <div className={'rounded-2xl bg-white shadow-md hover:shadow-lg transition-shadow overflow-hidden p-5'}>
            <div className={'flex items-center gap-4'}>
                {/* Company Logo */}
                <div className={'shrink-0'}>
                    {picture ? (
                        <Image src={picture} alt={name} width={56} height={56} className={'rounded-lg object-cover border border-gray-100'}/>
                    ) : (
                        <div className={'size-16 rounded-xl bg-linear-to-br from-emerald-400 to-teal-500 flex items-center justify-center text-white text-3xl font-bold'}>
                            {name.charAt(0)}
                        </div>
                    )}
                </div>

                {/* Company Info */}
                <div className={'flex-1 min-w-0'}>
                    <h3 className={'text-lg font-semibold text-gray-900 truncate'}>
                        {name}
                    </h3>
                    {headquarters && (
                        <div className={'flex items-center gap-1.5 mt-1 text-sm text-gray-500'}>
                            <span>{'📍'}</span>
                            <span className={'truncate'}>{headquarters}</span>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}

export {CompanyCard};
