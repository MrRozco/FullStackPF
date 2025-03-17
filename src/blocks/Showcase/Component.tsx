import React from "react";

import {
    Carousel,
    CarouselContent,
    CarouselItem,
    CarouselNext,
    CarouselPrevious,
  } from "@/components/ui/carousel"
  import { Button } from "@/components/ui/button"

import { ShowcaseBlock as ShowcaseBlockProps } from "@/payload-types";

import RichText from '@/components/RichText'
import Link from "next/link";
import Image from "next/image";
import { Media } from "@/components/Media";

export const ShowcaseComponent: React.FC<ShowcaseBlockProps> = ({ items, title, content, button }) => {

    const page = button?.link;
    const url = page && typeof page === 'object' && 'slug' in page ? `/${page.slug}` : '#';

  return (
    <div className="container flex flex-col lg:flex-row">
      {/* Left Side */}
      <div className="lg:w-1/2 p-4">
        <h2 className="text-2xl mb-4 font-bold">{title}</h2>
        {content && <RichText className="mb-4 text-lg" data={content} enableGutter={false} />}
        {button && (
            <Button asChild className="border border-white py-3 px-6 rounded mt-4">
              <Link href={url} >
                {button.text}
            </Link>
            </Button>
        )}
      </div>
      {/* Right Side - Carousel */}
      <div className=" lg:w-1/2 p-10">
      <Carousel>
          <CarouselContent >
          {items && items.map((item, index) => (
              item.image ? (
                <CarouselItem key={index} >
                  <div className="carousel-item rounded-lg overflow-hidden border-border border">
                    <Media resource={item.image}/>
                  </div>
                </CarouselItem>
              ) : null
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </div>
  )
}