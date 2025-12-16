export default function getMediaType(url: string): "video" | "image" {
  const cleanUrl = url.split("?")[0].toLowerCase();

  const videoExtensions = ["mp4", "webm", "mov", "m4v"];
  const imageExtensions = ["jpg", "jpeg", "png", "webp", "gif"];

  const ext = cleanUrl.split(".").pop();

  if (ext && videoExtensions.includes(ext)) return "video";
  if (ext && imageExtensions.includes(ext)) return "image";

  // fallback: считаем картинкой
  return "image";
}
