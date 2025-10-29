import React from "react";
import { Entry } from "@/types";

export default function EntryCard({
  entry,
  onEdit,
  onDelete,
}: {
  entry: Entry;
  onEdit: (e: Entry) => void;
  onDelete: (id: number) => void;
}) {
  return (
    <div className="bg-card border rounded-xl shadow-sm overflow-hidden hover:shadow-md transition">
      <div className="w-full h-48 bg-gray-100 overflow-hidden">
        <img
          src={
            entry.poster_url ??
            "https://via.placeholder.com/400x600?text=No+Poster"
          }
          alt={entry.title}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="p-4">
        <div className="flex justify-between items-start">
          <div>
            <h3 className="text-lg font-semibold">{entry.title}</h3>
            <p className="text-sm text-muted-foreground">
              {entry.type} • {entry.year_time ?? "—"}
            </p>
          </div>

          <div className="text-sm text-gray-500 text-right">
            <div>{entry.director}</div>
            <div className="text-xs text-gray-400 mt-1">
              {new Date(entry.createdAt).toLocaleDateString()}
            </div>
          </div>
        </div>

        <p className="mt-3 text-sm text-gray-600 truncate">
          {entry.location ?? ""}
        </p>

        <div className="mt-4 flex gap-2">
          <button
            onClick={() => onEdit(entry)}
            className="px-3 py-1 rounded-md border hover:bg-gray-50"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(entry.id)}
            className="px-3 py-1 rounded-md bg-red-600 text-white hover:opacity-90"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}
