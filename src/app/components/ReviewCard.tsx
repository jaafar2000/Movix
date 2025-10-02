"use client";
import React, { useState } from "react";
import Image from "next/image";
import { Star } from "lucide-react";
import { Button, Modal, Box, Typography } from "@mui/material";
import { Review } from "../../type";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "90%",
  maxWidth: 600, 
  bgcolor: "#14181c",
  borderRadius: "10px",
  boxShadow: 24,
  p: 3,
};

interface Props {
  review: Review;
}

const renderStar = (count: number) => {
  const noFiledStar = 5 - count;
  return (
    <>
      {[...Array(count)].map((_, index) => (
        <Star key={index} fill="#fdc700" className="w-4 h-4 text-[#fdc700]" />
      ))}
      {[...Array(noFiledStar)].map((_, index) => (
        <Star key={index} className="w-4 h-4 text-gray-500" />
      ))}
    </>
  );
};

const ReviewCard = ({ review }: Props) => {
  const [open, setOpen] = useState(false);
  const [modalText, setModalText] = useState("");

  const handleOpen = (text: string) => {
    setModalText(text);
    setOpen(true);
  };
  const handleClose = () => setOpen(false);

  const renderText = (text: string) => {
    if (text.length > 400) {
      return (
        <span>
          {text.slice(0, 400)}...{" "}
          <Button
            onClick={() => handleOpen(text)}
            size="small"
            sx={{ color: "#fdc700", textTransform: "none", fontSize: "0.8rem" }}
          >
            Read More
          </Button>
        </span>
      );
    }
    return <>{text}</>;
  };

  return (
    <>
      <div className="flex gap-3 border-cgray border-b-[0.5px] p-3">
        <div className="w-20 sm:w-24 md:w-28 aspect-[2/3] relative rounded-md overflow-hidden flex-shrink-0">
          <Image
            src={review?.show?.image_url || "/blank.png"}
            alt={review?.show?.name || "poster"}
            fill
            className="object-cover"
          />
        </div>

        <div className="flex flex-col flex-1 text-sm">
          <div className="flex items-center gap-2 mb-1">
            <div className="relative w-8 h-8 rounded-full overflow-hidden">
              <Image
                src={review?.author?.image_url || "/blank.png"}
                alt={review?.author?.username || "user image"}
                fill
                className="object-cover"
              />
            </div>
            <div>
              <p className="text-cgray font-medium">@{review?.author?.username}</p>
              <span className="text-xs text-cgray/70">
                {review?.createdAt
                  ? new Date(review.createdAt).toLocaleDateString("en-US", {
                      day: "2-digit",
                      month: "short",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })
                  : "Unknown date"}
              </span>
            </div>
          </div>

          <div className="text-base font-semibold">{review?.show?.name}</div>
          <div className="flex gap-1 mt-1">{renderStar(review?.rating || 0)}</div>

          <p className="mt-2 leading-relaxed text-cgray/90">
            {renderText(review?.review || "")}
          </p>
        </div>
      </div>

      {/* Modal */}
      <Modal open={open} onClose={handleClose}>
        <Box sx={style}>
          <Typography sx={{ fontSize: "0.95rem", lineHeight: 1.6 }}>
            {modalText}
          </Typography>
        </Box>
      </Modal>
    </>
  );
};

export default ReviewCard;
