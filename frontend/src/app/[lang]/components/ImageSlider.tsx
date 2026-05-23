"use client";
import { Fade } from "react-slideshow-image";
import { getStrapiMedia } from "../utils/api-helpers";
import NextImage from "next/image";

interface SlideImage { id: number; attributes: { alternativeText: string | null; caption: string | null; url: string } }
interface SlidShowProps { files: { data: SlideImage[] } }

export default function Slideshow({ data }: { data: SlidShowProps }) {
  return (
    <div style={{ margin: "2em 0", borderRadius: "2px", overflow: "hidden" }}>
      <Fade>
        {data.files.data.map((img: SlideImage, index) => {
          const imageUrl = getStrapiMedia(img.attributes.url);
          return (
            <div key={index}>
              {imageUrl && <NextImage style={{ width: "100%", height: "400px", objectFit: "cover" }} height={400} width={780} alt={img.attributes.alternativeText || ""} src={imageUrl} />}
            </div>
          );
        })}
      </Fade>
    </div>
  );
}
