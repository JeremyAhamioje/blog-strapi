import React from "react";

interface VideoEmbedProps { id: number; url: string; width?: string; height?: string; }

const getEmbedUrl = (videoUrl: string): string | null => {
  const youtubeRegex = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|watch\?v%3D)([\w-]{11}).*/;
  const youtubeMatch = videoUrl.match(youtubeRegex);
  if (youtubeMatch && youtubeMatch[2].length === 11) return `https://www.youtube.com/embed/${youtubeMatch[2]}`;
  return null;
};

export default function VideoEmbed({ data }: { data: VideoEmbedProps }) {
  const embedUrl = getEmbedUrl(data.url);
  if (!embedUrl) return <div style={{ padding: "16px", background: "var(--bg-alt)", color: "var(--text-3)", fontFamily: "var(--font-sans)", fontSize: "14px" }}>Invalid video URL</div>;
  return (
    <div style={{ position: "relative", paddingBottom: "56.25%", height: 0, overflow: "hidden", margin: "2em 0", borderRadius: "2px" }}>
      <iframe
        title="video"
        src={embedUrl}
        width={data.width || "100%"}
        height={data.height || "100%"}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        style={{ position: "absolute", top: 0, left: 0, width: "100%", height: "100%" }}
      />
    </div>
  );
}
