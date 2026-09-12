const YOUTUBE_WATCH_OR_SHORT = /(?:youtube\.com\/(?:watch\?v=|shorts\/)|youtu\.be\/)([a-zA-Z0-9_-]{6,})/;
const VIMEO_WATCH = /vimeo\.com\/(\d+)/;

/**
 * Normalizes a pasted video URL into an embeddable one. Admins commonly paste
 * a plain YouTube watch/shorts link or a youtu.be share link — none of those
 * can be embedded in an <iframe> directly (YouTube refuses the connection) —
 * so this rewrites them to the /embed/ form. Anything else (already an embed
 * URL, or a direct video file) passes through unchanged.
 */
export function toEmbeddableVideoUrl(url: string): string {
  const trimmed = url.trim();

  const youtubeMatch = trimmed.match(YOUTUBE_WATCH_OR_SHORT);
  if (youtubeMatch) return `https://www.youtube.com/embed/${youtubeMatch[1]}`;

  const vimeoMatch = trimmed.match(VIMEO_WATCH);
  if (vimeoMatch) return `https://player.vimeo.com/video/${vimeoMatch[1]}`;

  return trimmed;
}
