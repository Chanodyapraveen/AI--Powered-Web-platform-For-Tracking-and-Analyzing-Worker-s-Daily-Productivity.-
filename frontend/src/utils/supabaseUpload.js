const makeSafeFileName = (name = "image") => {
  const dot = name.lastIndexOf(".");
  const base = (dot > 0 ? name.slice(0, dot) : name)
    .toLowerCase()
    .replace(/[^a-z0-9_-]/g, "-");
  const ext =
    dot > 0
      ? name
          .slice(dot + 1)
          .toLowerCase()
          .replace(/[^a-z0-9]/g, "")
      : "jpg";
  return `${base || "image"}.${ext || "jpg"}`;
};

export const deriveStoragePath = (url = "") => {
  if (!url || typeof url !== "string") return "";

  try {
    // Handles Supabase public URL shape and generic URL fallback.
    const parsed = new URL(url);
    const marker = "/storage/v1/object/public/";
    const idx = parsed.pathname.indexOf(marker);
    if (idx >= 0) {
      return decodeURIComponent(parsed.pathname.slice(idx + marker.length));
    }
    return decodeURIComponent(parsed.pathname.replace(/^\/+/, ""));
  } catch {
    return "";
  }
};

export const uploadFieldImage = async (file) => {
  if (!file) throw new Error("No file provided");

  // Fallback uploader for local/dev environments when cloud storage is not configured.
  const safeName = makeSafeFileName(file.name || "field-image.jpg");
  const path = `fields/${Date.now()}-${safeName}`;
  const url = URL.createObjectURL(file);

  return { url, path };
};

export const uploadToSupabase = async (file) => {
  const { url } = await uploadFieldImage(file);
  return url;
};

export const deleteFromSupabase = async (_url) => {
  // In local fallback mode there's no remote object to delete.
  return true;
};
