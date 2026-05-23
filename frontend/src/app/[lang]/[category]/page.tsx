import PageHeader from "@/app/[lang]/components/PageHeader";
import { fetchAPI } from "@/app/[lang]/utils/fetch-api";
import { getStrapiMedia, formatDate } from "@/app/[lang]/utils/api-helpers";
import Link from "next/link";
import Image from "next/image";

async function fetchPostsByCategory(filter: string) {
  try {
    const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
    const path = `/articles`;
    const urlParamsObject = {
      sort: { createdAt: "desc" },
      filters: { category: { slug: filter } },
      populate: {
        cover: { fields: ["url"] },
        category: { populate: "*" },
        authorsBio: { populate: "*" },
      },
    };
    const options = { headers: { Authorization: `Bearer ${token}` } };
    const responseData = await fetchAPI(path, urlParamsObject, options);
    return responseData;
  } catch (error) {
    console.error(error);
  }
}

export default async function CategoryRoute({ params }: { params: { category: string } }) {
  const filter = params.category;
  const { data } = await fetchPostsByCategory(filter);

  if (data.length === 0) {
    return (
      <div className="sci-wrap" style={{ padding: "60px 20px", textAlign: "center", fontFamily: "var(--font-sans)", color: "var(--text-3)" }}>
        No posts in this category yet.
      </div>
    );
  }

  const { name, description } = data[0]?.attributes.category.data.attributes;

  return (
    <div style={{ background: "var(--bg)" }}>
      <PageHeader heading={name} text={description} />
      <div className="sci-wrap" style={{ paddingBottom: "64px" }}>
        <div className="sci-grid">
          {data.map((article: any) => {
            const img = getStrapiMedia(article.attributes.cover?.data?.attributes.url);
            const cat = article.attributes.category?.data?.attributes;
            const author = article.attributes.authorsBio?.data?.attributes;
            return (
              <Link key={article.id} href={`${cat?.slug}/${article.attributes.slug}`} className="sci-card">
                {img
                  ? <Image src={img} alt={article.attributes.title} width={400} height={168} className="sci-card__img" />
                  : <div className="sci-card__img-ph">◈</div>}
                <div className="sci-card__eye">
                  {cat && <span className="sci-card__cat">{cat.name}</span>}
                  <div className="sci-card__sep" />
                  <span className="sci-card__date">{formatDate(article.attributes.publishedAt)}</span>
                </div>
                <div className="sci-card__title">{article.attributes.title}</div>
                <div className="sci-card__desc">{article.attributes.description}</div>
                {author && <div className="sci-card__author">By {author.name}</div>}
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
}

export async function generateStaticParams() { return []; }
