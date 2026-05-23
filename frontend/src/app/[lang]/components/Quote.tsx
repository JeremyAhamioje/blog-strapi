interface QuoteProps { data: { title: string; body: string }; }

export default function Quote({ data }: QuoteProps) {
  return (
    <div className="sci-quote">
      <div className="sci-quote__text">"{data.body}"</div>
      {data.title && <div className="sci-quote__author">— {data.title}</div>}
    </div>
  );
}
