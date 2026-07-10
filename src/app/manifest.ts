import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Don't Cook Don't Clean",
    short_name: "DCDC",
    description:
      "Hire verified maids, cooks, babysitters, and elder care helpers in Patna.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#ff6b6b",
    icons: [
      {
        src: "/icon.png",
        sizes: "1361x627",
        type: "image/png",
      },
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
    ],
  };
}
