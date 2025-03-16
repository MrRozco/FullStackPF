import React from "react";

import { MystackBlock as MystackBlockProps } from "@/payload-types";

import RichText from '@/components/RichText'
import { Media } from "@/components/Media";

export const MystackComponent: React.FC<MystackBlockProps> = ({ title, content, logos }) => {
    return (
        <div className="container flex flex-col">
        {/* Left Side */}
            <div className="flex flex-col justify-center content-center text-center">
                <h2 className="text-2xl mb-4 font-bold">{title}</h2>
                {content && <RichText className="mb-4 text-lg" data={content} enableGutter={false} />}
            </div>
        {/* Right Side - Carousel */}
            <div className=" flex items-center justify-center gap-8 flex-wrap">
                {logos && logos.map((logo, index) => (
                <div key={index} className=" overflow-hidden w-12 h-12 md:w-20 md:h-20 lg:w-24 lg:h-24 xl:w-32 xl:h-32 hover:transform hover:scale-125 transition-transform duration-500">
                    <Media resource={logo.logo}/>
                </div>
                ))}
            </div>
        </div>
    )
};