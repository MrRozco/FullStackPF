'use client'
import React, { useState } from "react";
import { PortfolioBlock as PortfolioBlockProps } from "@/payload-types";
import { Media } from "@/components/Media";
import RichText from '@/components/RichText'
import { Button } from "@/components/ui/button"
import Link from "next/link";

export const PortfolioComponent: React.FC<PortfolioBlockProps> = ({ cards, title }) => {
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState(0);

  return (
    <div className="container">
      <h2 className="text-3xl mb-4 font-bold">{title}</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {cards &&
          cards.map((card, index) => (
            <div
              key={index}
              className="card cursor-pointer border-border border rounded overflow-hidden hover:scale-105 transition-transform"
              onClick={() => {
                setSelected(index);
                setOpen(true);
              }}
            >
              <div className="card-image">
                <Media resource={card.image} />
              </div>
            </div>
          ))}
      </div>
      {open && cards && cards[selected] && (
        <div className="modal fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="modal-content border-border border  bg-card z-50 p-5 rounded max-w-lg w-[95%] md:w-full relative">
            <h3 className="text-xl font-bold mb-2 ">{cards[selected].modal.title}</h3>
            <Button
              onClick={() => setOpen(false)}
              className=" absolute top-4 right-4"
            >
              Close
            </Button>
            <div className="mb-4 mt-5 border-border border rounded overflow-hidden">
              <Media resource={cards[selected].modal.image} className="border-border border rounded " />
            </div>
            <div className="mb-4 -ml-4">
              <RichText data={cards[selected].modal.text} />
            </div>
            <div className="flex space-x-4 mb-4 justify-center">
              {cards[selected].modal.buttons?.map((button, idx) => (
                <Button key={idx} asChild className=" py-3 px-6 rounded">
                    <Link href={button.link}>
                      {button.text}
                    </Link>
                </Button>
              ))}
            </div>
            
          </div>
        </div>
      )}
    </div>
  );
};