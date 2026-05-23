import React from "react";
import Link from "next/link";

interface Category { id: number; attributes: { name: string; slug: string; articles: { data: Array<{}> } } }
interface Article { id: number; attributes: { title: string; slug: string } }

export default function ArticleSelect({ categories, articles, params }: { categories: Category[]; articles: Article[]; params: { slug: string; category: string } }) {
  return (
    <div className="sci-artsel">
      <div className="sci-artsel__heading">Browse By Category</div>
      <div className="sci-artsel__chips">
        {categories.map((cat: Category) => {
          if (cat.attributes.articles.data.length === 0) return null;
          return (
            <Link key={cat.id} href={`/en/${cat.attributes.slug}`} className={`sci-artsel__chip${cat.attributes.slug === params.category ? " sci-artsel__chip--active" : ""}`}>
              #{cat.attributes.name}
            </Link>
          );
        })}
        <Link href="/en" className="sci-artsel__chip">#all</Link>
      </div>

      <div className="sci-artsel__sub">Other Posts You May Like</div>
      {articles.map((article: Article) => (
        <Link key={article.id} href={`/en/${params.category}/${article.attributes.slug}`} className={`sci-artsel__link${params.slug === article.attributes.slug ? " sci-artsel__link--active" : ""}`}>
          {article.attributes.title}
        </Link>
      ))}
    </div>
  );
}
