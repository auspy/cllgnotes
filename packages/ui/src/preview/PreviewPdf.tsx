"use client";
import { Borders, GradientColors, PreviewPdfProps } from "@cllgnotes/types";
import Image from "next/image";
import PurchaseToRead from "../cards/PurchaseToRead";
import { useState } from "react";
import ButtonArrow from "../buttons/ButtonArrow";
import { CustomImageLoader } from "ui";

const PreviewPdf = ({
  notPurchased = true,
  img,
  type,
  totalPages: tP,
}: PreviewPdfProps) => {
  const [page, setPage] = useState(1);
  const totalPages = tP || 1;
  const handlePageChange = (increment: number) => {
    let nextIndex = page + increment;
    if (nextIndex < 1) nextIndex = 1;
    else if (nextIndex > totalPages) nextIndex = totalPages;
    setPage(nextIndex);
  };
  return (
    <div
      className="w100 rPosi grid h-fit"
      style={{
        maxWidth: 955,
      }}
    >
      {totalPages > 1 && (
        <div className="frcsb mb20">
          <ButtonArrow
            disabled={page === 1}
            isLeft={true}
            onClick={() => {
              handlePageChange(-1);
            }}
          />
          <ButtonArrow
            disabled={page === totalPages}
            onClick={() => {
              handlePageChange(1);
            }}
          />
        </div>
      )}
      {notPurchased && <PurchaseToRead />}
      <div
        className="w100 fcc"
        style={{
          border: Borders.dark,
          maxHeight: 1348,
          aspectRatio: "955/1348",
          borderRadius: 5,
        }}
      >
        {/* gradient to hide */}
        {notPurchased && (
          <div
            className="w-[99.6%] h-[99.8%] aPosi b-0 l-0"
            style={{ background: GradientColors.pdf, zIndex: 1 }}
          ></div>
        )}

        <Image
          className="h-full"
          placeholder="blur"
          blurDataURL="/images/blur.png"
          loader={({ width, src }) =>
            CustomImageLoader({
              page: page,
              type: type,
              src,
              width,
            })
          }
          style={{
            padding: 2,
            borderRadius: 5,
            objectFit: "cover",
          }}
          {...img}
          src={img.src}
        />
      </div>
    </div>
  );
};

export default PreviewPdf;
