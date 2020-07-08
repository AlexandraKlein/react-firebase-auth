export const capitalize = (val: string) =>
  `${val.charAt(0).toUpperCase()}${val.slice(1)}`;

export const placeholderProfileUrl =
  "https://www.empa.ch/documents/56066/95227/Profile-Placeholder.png/34b47554-1996-4dd1-9b0d-63fa49e463c9?t=1513121750277";

export const formatDate = (milliseconds: string) =>
  new Intl.DateTimeFormat("en", {
    year: "numeric",
    month: "long",
    day: "2-digit",
    hour12: true,
  }).format(new Date(Number(milliseconds)));
