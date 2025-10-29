import React, { useEffect, useState } from "react";
import Header from "@/components/Header";
import EntryCard from "@/components/EntryCard";
import EntryForm from "@/components/EntryForm";
import { api } from "@/lib/api";
import { Entry } from "@/types";
import { Dialog } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

export default function Home() {
  const [entries, setEntries] = useState<Entry[]>([]);
  const [cursor, setCursor] = useState<number | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<Entry | null>(null);
  const [search, setSearch] = useState("");
  const [viewTable, setViewTable] = useState(false);

  // ✅ Universal loader – supports both object and array responses
  async function load(reset = false) {
    if (loading) return;
    setLoading(true);
    try {
      const params: any = { limit: 10 };
      if (!reset && cursor) params.cursor = cursor;

      const res = await api.get("/entries", { params });
      const data = res.data;

      // Handle both backend formats: { entries: [...] } or [...]
      const newEntries = Array.isArray(data) ? data : data.entries || [];

      if (reset) setEntries(newEntries);
      else setEntries((p) => [...p, ...newEntries]);

      setCursor(data.nextCursor ?? null);
      setHasMore(Boolean(data.nextCursor));
    } catch (err) {
      console.error(err);
      alert(
        "Failed to load entries – check if backend is running on port 4000"
      );
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load(true);
  }, []);

  const openAdd = () => {
    setEditing(null);
    setShowForm(true);
  };

  const handleSave = async (payload: Partial<Entry>) => {
    try {
      if (editing) {
        await api.put(`/entries/${editing.id}`, payload);
      } else {
        await api.post("/entries", payload);
      }
      setShowForm(false);
      setEditing(null);
      setCursor(null);
      await load(true);
    } catch (err: any) {
      alert("Save failed: " + (err?.response?.data?.error ?? err.message));
    }
  };

  const handleEdit = (entry: Entry) => {
    setEditing(entry);
    setShowForm(true);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Delete this entry?")) return;
    try {
      await api.delete(`/entries/${id}`);
      setEntries((p) => p.filter((e) => e.id !== id));
    } catch {
      alert("Delete failed");
    }
  };

  const filtered = entries.filter(
    (e) =>
      e.title.toLowerCase().includes(search.toLowerCase()) ||
      (e.director ?? "").toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <Header onAdd={openAdd} />

      <main className="max-w-6xl mx-auto p-4">
        <div className="flex items-center justify-between mb-4 gap-4">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by title or director"
            className="p-2 border rounded w-96"
          />

          <div className="flex items-center gap-2">
            <Button onClick={() => setViewTable(!viewTable)}>
              {viewTable ? "Card View" : "Table View"}
            </Button>
            <Button
              variant="outline"
              onClick={() => {
                setEntries([]);
                setCursor(null);
                load(true);
              }}
            >
              Refresh
            </Button>
            <Button onClick={openAdd}>Add Entry</Button>
          </div>
        </div>

        {viewTable ? (
          // 📋 Table View
          <div className="overflow-x-auto bg-card rounded shadow-sm">
            <table className="min-w-full text-sm">
              <thead className="border-b bg-muted/30">
                <tr>
                  <th className="p-2 text-left">Title</th>
                  <th>Type</th>
                  <th>Director</th>
                  <th>Budget</th>
                  <th>Location</th>
                  <th>Duration</th>
                  <th>Year/Time</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((e) => (
                  <tr key={e.id} className="border-b hover:bg-muted/10">
                    <td className="p-2">{e.title}</td>
                    <td>{e.type}</td>
                    <td>{e.director}</td>
                    <td>{e.budget}</td>
                    <td>{e.location}</td>
                    <td>{e.duration}</td>
                    <td>{e.year_time}</td>
                    <td>
                      <div className="flex gap-2">
                        <button
                          onClick={() => handleEdit(e)}
                          className="text-blue-600 hover:underline"
                        >
                          Edit
                        </button>
                        <button
                          onClick={() => handleDelete(e.id)}
                          className="text-red-600 hover:underline"
                        >
                          Delete
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          // 🖼️ Card Grid
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filtered.map((e) => (
              <EntryCard
                key={e.id}
                entry={e}
                onEdit={handleEdit}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}

        {/* Pagination */}
        <div className="mt-6 text-center">
          {hasMore ? (
            <button
              className="px-4 py-2 border rounded hover:bg-accent"
              onClick={() => load(false)}
            >
              {loading ? "Loading..." : "Load more"}
            </button>
          ) : (
            <div className="text-sm text-muted-foreground">No more entries</div>
          )}
        </div>
      </main>

      {/* ✏️ Add / Edit Dialog */}
      <Dialog
        open={showForm}
        onOpenChange={(o: any) => {
          if (!o) setShowForm(false);
        }}
      >
        <div className="bg-card text-card-foreground p-6 rounded-xl shadow-lg max-w-md mx-auto">
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-lg font-semibold">
              {editing ? "Edit Entry" : "Add Entry"}
            </h3>
            <button
              onClick={() => {
                setShowForm(false);
                setEditing(null);
              }}
              className="text-muted-foreground hover:text-foreground"
            >
              ✕
            </button>
          </div>
          <EntryForm
            initial={editing ?? {}}
            onCancel={() => {
              setShowForm(false);
              setEditing(null);
            }}
            onSave={handleSave}
          />
        </div>
      </Dialog>
    </div>
  );
}
