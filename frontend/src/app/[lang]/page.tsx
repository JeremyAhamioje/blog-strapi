"use client";
import { useState, useEffect, useCallback } from "react";
import { fetchAPI } from "./utils/fetch-api";
import { getStrapiMedia, formatDate } from "./utils/api-helpers";
import Link from "next/link";
import Image from "next/image";
import Loader from "./components/Loader";

interface Article {
  id: number;
  attributes: {
    title: string;
    description: string;
    slug: string;
    createdAt: string;
    publishedAt: string;
    cover: { data: { attributes: { url: string } } };
    category: { data: { attributes: { name: string; slug: string } } };
    authorsBio: { data: { attributes: { name: string; avatar: { data: { attributes: { url: string } } } } } };
  };
}

interface Meta { pagination: { start: number; limit: number; total: number; }; }

export default function Profile() {
  const [meta, setMeta] = useState<Meta | undefined>();
  const [data, setData] = useState<Article[]>([]);
  const [isLoading, setLoading] = useState(true);

  const fetchData = useCallback(async (start: number, limit: number) => {
    setLoading(true);
    try {
      const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
      const path = `/articles`;
      const urlParamsObject = {
        sort: { createdAt: "desc" },
        populate: {
          cover: { fields: ["url"] },
          category: { populate: "*" },
          authorsBio: { populate: "*" },
        },
        pagination: { start, limit },
      };
      const options = { headers: { Authorization: `Bearer ${token}` } };
      const responseData = await fetchAPI(path, urlParamsObject, options);
      if (start === 0) { setData(responseData.data); } else { setData((prev: Article[]) => [...prev, ...responseData.data]); }
      setMeta(responseData.meta);
    } catch (error) { console.error(error); } finally { setLoading(false); }
  }, []);

  useEffect(() => { fetchData(0, Number(process.env.NEXT_PUBLIC_PAGE_LIMIT)); }, [fetchData]);

  if (isLoading) return <Loader />;

  const hero = data[0];
  const listArticles = data.slice(1, 5);
  const scienceArticles = data.slice(1, 4);
  const allArticles = data.slice(1);

  const heroImg = hero ? getStrapiMedia(hero.attributes.cover?.data?.attributes.url) : null;
  const heroCat = hero?.attributes.category?.data?.attributes;
  const heroAuthor = hero?.attributes.authorsBio?.data?.attributes;

  return (
    <div style={{ background: "var(--bg)" }}>
      {/* ── HERO BANNER ────────────────────────────────────── */}
      {hero && (
        <div className="sci-hero">
          {heroImg
            ? <Image src={heroImg} alt={hero.attributes.title} width={1200} height={500} className="sci-hero__img" priority />
            : <div className="sci-hero__placeholder" />}
          <div className="sci-hero__grad" />
          <div className="sci-hero__body">
            <div className="sci-hero__eye">
              {heroCat && <span className="sci-hero__tag">{heroCat.name}</span>}
              <span className="sci-hero__date">{formatDate(hero.attributes.publishedAt)}</span>
            </div>
            <h1 className="sci-hero__title">
              <Link href={`${heroCat?.slug || ""}/${hero.attributes.slug}`}>{hero.attributes.title}</Link>
            </h1>
            <p className="sci-hero__desc">{hero.attributes.description}</p>
            {heroAuthor && <p className="sci-hero__by">By {heroAuthor.name}</p>}
          </div>
        </div>
      )}

      <div className="sci-wrap">
        {/* ── BLOGS + SIDEBAR LAYOUT ────────────────────────── */}
        <div className="sci-layout">
          {/* Main column */}
          <div>
            {/* BLOGS section header */}
            <div style={{ paddingTop: "32px" }}>
              <div className="sci-sh">
                <span className="sci-sh__title">Latest Posts</span>
              </div>
              {listArticles.map((article) => {
                const img = getStrapiMedia(article.attributes.cover?.data?.attributes.url);
                const cat = article.attributes.category?.data?.attributes;
                return (
                  <Link key={article.id} href={`${cat?.slug || ""}/${article.attributes.slug}`} className="sci-list-item">
                    {img
                      ? <Image src={img} alt={article.attributes.title} width={96} height={72} className="sci-list-item__thumb" />
                      : <div className="sci-list-item__thumb-ph" />}
                    <div className="sci-list-item__body">
                      {cat && <div className="sci-list-item__cat">{cat.name}</div>}
                      <div className="sci-list-item__title">{article.attributes.title}</div>
                      <div className="sci-list-item__desc">{article.attributes.description}</div>
                    </div>
                  </Link>
                );
              })}
            </div>

            {/* SCIENCE section */}
            <div style={{ paddingTop: "40px" }}>
              <div className="sci-sh">
                <span className="sci-sh__title">Science</span>
                <Link href="/en/Science" className="sci-sh__all">View All →</Link>
              </div>
              <div className="sci-grid">
                {scienceArticles.map((article) => {
                  const img = getStrapiMedia(article.attributes.cover?.data?.attributes.url);
                  const cat = article.attributes.category?.data?.attributes;
                  const author = article.attributes.authorsBio?.data?.attributes;
                  return (
                    <Link key={article.id} href={`${cat?.slug || ""}/${article.attributes.slug}`} className="sci-card">
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

            {/* ALL POSTS grid */}
            {allArticles.length > 4 && (
              <div style={{ paddingTop: "40px" }}>
                <div className="sci-sh">
                  <span className="sci-sh__title">All Posts</span>
                </div>
                <div className="sci-grid">
                  {allArticles.slice(4).map((article) => {
                    const img = getStrapiMedia(article.attributes.cover?.data?.attributes.url);
                    const cat = article.attributes.category?.data?.attributes;
                    const author = article.attributes.authorsBio?.data?.attributes;
                    return (
                      <Link key={article.id} href={`${cat?.slug || ""}/${article.attributes.slug}`} className="sci-card">
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
            )}

            {meta && meta.pagination.start + meta.pagination.limit < meta.pagination.total && (
              <div className="sci-load-more">
                <button className="sci-load-more__btn" onClick={() => fetchData(meta.pagination.start + meta.pagination.limit, Number(process.env.NEXT_PUBLIC_PAGE_LIMIT))}>
                  Load More Posts
                </button>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <aside>
            <div className="sci-widget">
              <div className="sci-widget__title">Most Read</div>
              {data.slice(0, 5).map((article, i) => {
                const cat = article.attributes.category?.data?.attributes;
                return (
                  <Link key={article.id} href={`${cat?.slug || ""}/${article.attributes.slug}`} className="sci-widget-link">
                    <span className="sci-widget-link__num">{String(i + 1).padStart(2, "0")}</span>
                    <div>
                      <div className="sci-widget-link__title">{article.attributes.title}</div>
                      <div className="sci-widget-link__meta">{formatDate(article.attributes.publishedAt)}</div>
                    </div>
                  </Link>
                );
              })}
            </div>

            <div className="sci-widget">
              <div className="sci-widget__title">Browse Topics</div>
              <div className="sci-chips">
                {Array.from(new Set(data.map(a => a.attributes.category?.data?.attributes?.name).filter(Boolean))).map(name => (
                  <Link key={name} href={`/en/${name}`} className="sci-chip">#{name}</Link>
                ))}
                <Link href="/en" className="sci-chip sci-chip--active">#all</Link>
              </div>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
