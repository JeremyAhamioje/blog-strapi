import { formatDate, getStrapiMedia } from "@/app/[lang]/utils/api-helpers";
import { postRenderer } from "@/app/[lang]/utils/post-renderer";
import Image from "next/image";

interface Article {
  id: number;
  attributes: {
    title: string;
    description: string;
    slug: string;
    cover: { data: { attributes: { url: string } } };
    authorsBio: { data: { attributes: { name: string; avatar: { data: { attributes: { url: string } } } } } };
    category: { data: { attributes: { name: string; slug: string } } };
    blocks: any[];
    publishedAt: string;
  };
}

export default function Post({ data }: { data: Article }) {
  const { title, description, publishedAt, cover, authorsBio, category } = data.attributes;
  const author = authorsBio.data?.attributes;
  const cat = category?.data?.attributes;
  const imageUrl = getStrapiMedia(cover.data?.attributes.url);
  const authorImgUrl = getStrapiMedia(authorsBio.data?.attributes.avatar?.data?.attributes.url);

  return (
    <article style={{ background: "var(--bg)" }}>
      <div className="sci-wrap">
        {/* Breadcrumb */}
        <div className="sci-bc">
          <a href="/">Home</a>
          <span>›</span>
          {cat && <><a href={`/en/${cat.slug}`}>{cat.name}</a><span>›</span></>}
          <span style={{ color: "var(--text)" }}>{title}</span>
        </div>

        <div style={{ maxWidth: "780px" }}>
          {cat && <div className="sci-art__cat">{cat.name}</div>}
          <h1 className="sci-art__title">{title}</h1>

          <div className="sci-art__byline">
            {authorImgUrl && <Image src={authorImgUrl} alt={author?.name || "author"} width={36} height={36} className="sci-art__byline-avatar" />}
            {author && <span className="sci-art__byline-name">By {author.name}</span>}
            <span>·</span>
            <span>{formatDate(publishedAt)}</span>
          </div>

          {imageUrl && (
            <Image src={imageUrl} alt={title} width={780} height={480} className="sci-art__cover" />
          )}

          <p className="sci-art__lead">{description}</p>

          <div className="sci-art__body">
            {data.attributes.blocks.map((section: any, index: number) => postRenderer(section, index))}
          </div>
        </div>
      </div>
    </article>
  );
}
