import { getStrapiMedia } from "../utils/api-helpers";
import Image from "next/image";

interface MediaProps {
  file: { data: { id: string; attributes: { url: string; name: string; alternativeText: string } } };
}

export default function Media({ data }: { data: MediaProps }) {
  const imgUrl = getStrapiMedia(data.file.data.attributes.url);
  return (
    <div style={{ margin: "2em 0" }}>
      <Image
        src={imgUrl || ""}
        alt={data.file.data.attributes.alternativeText || "media"}
        className="sci-art__cover"
        width={780}
        height={480}
      />
    </div>
  );
}
