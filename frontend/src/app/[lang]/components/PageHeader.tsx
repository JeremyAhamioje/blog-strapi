import React from "react";

interface PageHeaderProps { heading: string; text?: string; }

export default function PageHeader({ heading, text }: PageHeaderProps) {
  return (
    <div className="sci-wrap">
      <div className="sci-ph">
        <div className="sci-ph__eyebrow">Blogs</div>
        <h2 className="sci-ph__heading">{heading}</h2>
        {text && <p className="sci-ph__text">{text}</p>}
      </div>
    </div>
  );
}
