import type { MetadataRoute } from "next";
import { experienceSlugs } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL ?? "https://calebrogers.dev";
  const routes = ["", "/experience", "/about", "/resume", "/contact", ...experienceSlugs.map((slug) => `/experience/${slug}`)];
  return routes.map((route) => ({ url: `${baseUrl}${route}`, changeFrequency: route === "" ? "monthly" : "yearly", priority: route === "" ? 1 : 0.7 }));
}

