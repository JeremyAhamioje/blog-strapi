import Image from "next/image";
import Link from "next/link";
import { getStrapiMedia, formatDate } from "../utils/api-helpers";

interface Article {
  id: 4;
  attributes: {
    title: string;
    description: string;
    slug: string;
    createdAt: string;
    updatedAt: string;
    publishedAt: string;
    cover: { data: { attributes: { url: string } } };
    category: { data: { attributes: { name: string; slug: string } } };
    authorsBio: { data: { attributes: { name: string; avatar: { data: { attributes: { url: string } } } } } };
  };
}

export default function PostList({ data: articles, children }: { data: Article[]; children?: React.ReactNode; }) {
  return (
    <section>
      <div className="sci-wrap">
        <div className="sci-grid">
          {articles.map((article) => {
            const imageUrl = getStrapiMedia(article.attributes.cover.data?.attributes.url);
            const category = article.attributes.category.data?.attributes;
            const authorsBio = article.attributes.authorsBio.data?.attributes;

            return (
              <Link href={`${category?.slug}/${article.attributes.slug}`} key={article.id} className="sci-card">
                {imageUrl
                  ? <Image alt={article.attributes.title} width={400} height={168} className="sci-card__img" src={imageUrl} />
                  : <div className="sci-card__img-ph">◈</div>}
                <div className="sci-card__eye">
                  {category && <span className="sci-card__cat">{category.name}</span>}
                  <div className="sci-card__sep" />
                  <span className="sci-card__date">{formatDate(article.attributes.publishedAt)}</span>
                </div>
                <div className="sci-card__title">{article.attributes.title}</div>
                <div className="sci-card__desc">{article.attributes.description}</div>
                {authorsBio && <div className="sci-card__author">By {authorsBio.name}</div>}
              </Link>
            );
          })}
        </div>
        {children && <div style={{ paddingTop: "16px" }}>{children}</div>}
      </div>
    </section>
  );
}
