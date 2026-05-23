import React from "react";
import ArticleSelect from "@/app/[lang]/components/ArticleSelect";
import { fetchAPI } from "@/app/[lang]/utils/fetch-api";

async function fetchSideMenuData(filter: string) {
  try {
    const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
    const options = { headers: { Authorization: `Bearer ${token}` } };

    const categoriesResponse = await fetchAPI("/categories", { populate: "*" }, options);
    const articlesResponse = await fetchAPI(
      "/articles",
      filter ? { filters: { category: { name: filter } } } : {},
      options
    );

    return { articles: articlesResponse.data, categories: categoriesResponse.data };
  } catch (error) {
    console.error(error);
  }
}

interface Category { id: number; attributes: { name: string; slug: string; articles: { data: Array<{}> } } }
interface Article { id: number; attributes: { title: string; slug: string } }
interface Data { articles: Article[]; categories: Category[]; }

export default async function LayoutRoute({ params, children }: { children: React.ReactNode; params: { slug: string; category: string } }) {
  const { category } = params;
  const { categories, articles } = (await fetchSideMenuData(category)) as Data;

  return (
    <div style={{ background: "var(--bg)", paddingBottom: "64px" }}>
      <div className="sci-wrap">
        <div className="sci-layout">
          <div>{children}</div>
          <aside>
            <ArticleSelect categories={categories} articles={articles} params={params} />
          </aside>
        </div>
      </div>
    </div>
  );
}

export async function generateStaticParams() {
  const token = process.env.NEXT_PUBLIC_STRAPI_API_TOKEN;
  const path = `/articles`;
  const options = { headers: { Authorization: `Bearer ${token}` } };
  const articleResponse = await fetchAPI(path, { populate: ["category"] }, options);

  return articleResponse.data.map((article: { attributes: { slug: string; category: { slug: string } } }) => ({
    slug: article.attributes.slug,
    category: article.attributes.slug,
  }));
}
