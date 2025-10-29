export interface Entry {
  id: number;
  title: string;
  type: "Movie" | "TV Show";
  director: string;
  budget?: string | null;
  location?: string | null;
  duration?: string | null;
  year_time?: string | null;
  poster_url?: string | null;
  createdAt: string;
  updatedAt: string;
}
