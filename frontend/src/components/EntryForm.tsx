import React, { useEffect, useState } from "react";
import { Entry } from "@/types";

type Props = {
  initial?: Partial<Entry>;
  onCancel: () => void;
  onSave: (payload: Partial<Entry>) => Promise<void>;
};

type Errors = Partial<
  Record<keyof Pick<Entry, "title" | "director" | "poster_url">, string>
>;

export default function EntryForm({ initial = {}, onCancel, onSave }: Props) {
  const [title, setTitle] = useState(initial.title ?? "");
  const [director, setDirector] = useState(initial.director ?? "");
  const [type, setType] = useState<Entry["type"]>(initial.type ?? "Movie");
  const [budget, setBudget] = useState(initial.budget ?? "");
  const [location, setLocation] = useState(initial.location ?? "");
  const [duration, setDuration] = useState(initial.duration ?? "");
  const [year_time, setYearTime] = useState(initial.year_time ?? "");
  const [poster_url, setPosterUrl] = useState(initial.poster_url ?? "");
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<Errors>({});
  const [imageOk, setImageOk] = useState(true);

  useEffect(() => {
    setImageOk(true);
  }, [poster_url]);

  function validate(): boolean {
    const e: Errors = {};
    if (!title.trim()) e.title = "Title is required";
    if (!director.trim()) e.director = "Director is required";
    if (poster_url && !isValidUrl(poster_url)) e.poster_url = "Invalid URL";
    setErrors(e);
    return Object.keys(e).length === 0;
  }

  function isValidUrl(s: string) {
    try {
      const u = new URL(s);
      return u.protocol === "http:" || u.protocol === "https:";
    } catch {
      return false;
    }
  }

  async function handleSave() {
    if (!validate()) return;
    const payload: Partial<Entry> = {
      title,
      director,
      type,
      budget,
      location,
      duration,
      year_time,
      poster_url: poster_url || null,
    };
    setLoading(true);
    try {
      await onSave(payload);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        <div>
          <label className="block text-sm font-medium">
            Title <span className="text-red-600">*</span>
          </label>
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className={`mt-1 w-full p-2 rounded border ${
              errors.title
                ? "border-red-500 ring-1 ring-red-200"
                : "border-border"
            }`}
            placeholder="Enter title"
          />
          {errors.title && (
            <div className="text-xs text-red-600 mt-1">{errors.title}</div>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium">
            Director <span className="text-red-600">*</span>
          </label>
          <input
            value={director}
            onChange={(e) => setDirector(e.target.value)}
            className={`mt-1 w-full p-2 rounded border ${
              errors.director
                ? "border-red-500 ring-1 ring-red-200"
                : "border-border"
            }`}
            placeholder="Enter director"
          />
          {errors.director && (
            <div className="text-xs text-red-600 mt-1">{errors.director}</div>
          )}
        </div>

        <div>
          <label className="block text-sm font-medium">Type</label>
          <select
            value={type}
            onChange={(e) => setType(e.target.value as any)}
            className="mt-1 w-full p-2 border rounded"
          >
            <option value="Movie">Movie</option>
            <option value="TV Show">TV Show</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium">Year / Range</label>
          <input
            value={year_time}
            onChange={(e) => setYearTime(e.target.value)}
            className="mt-1 w-full p-2 border rounded"
            placeholder="e.g. 2008 or 2008–2013"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Budget</label>
          <input
            value={budget}
            onChange={(e) => setBudget(e.target.value)}
            className="mt-1 w-full p-2 border rounded"
            placeholder="$ ..."
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Duration</label>
          <input
            value={duration}
            onChange={(e) => setDuration(e.target.value)}
            className="mt-1 w-full p-2 border rounded"
            placeholder="e.g. 152 min"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium">Location</label>
          <input
            value={location}
            onChange={(e) => setLocation(e.target.value)}
            className="mt-1 w-full p-2 border rounded"
            placeholder="Shooting locations"
          />
        </div>

        <div className="md:col-span-2">
          <label className="block text-sm font-medium">Poster URL</label>
          <input
            value={poster_url}
            onChange={(e) => setPosterUrl(e.target.value)}
            className={`mt-1 w-full p-2 rounded border ${
              errors.poster_url
                ? "border-red-500 ring-1 ring-red-200"
                : "border-border"
            }`}
            placeholder="https://..."
          />
          {errors.poster_url && (
            <div className="text-xs text-red-600 mt-1">{errors.poster_url}</div>
          )}
        </div>
      </div>

      {/* preview */}
      <div className="flex items-start gap-4">
        <div className="w-28 h-40 bg-gray-100 rounded overflow-hidden border">
          {poster_url ? (
            <img
              src={poster_url}
              alt="poster preview"
              onError={() => {
                setImageOk(false);
              }}
              onLoad={() => setImageOk(true)}
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="w-full h-full flex items-center justify-center text-xs text-gray-400">
              No poster
            </div>
          )}
        </div>

        <div className="flex-1 flex items-center justify-end gap-2">
          <button onClick={onCancel} className="px-3 py-2 border rounded">
            Cancel
          </button>
          <button
            onClick={handleSave}
            disabled={loading}
            className="px-4 py-2 rounded bg-accent text-accent-foreground disabled:opacity-60"
          >
            {loading ? "Saving..." : "Save"}
          </button>
        </div>
      </div>
    </div>
  );
}
