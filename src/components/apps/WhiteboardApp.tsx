"use client";

import { useCallback, useEffect, useState } from "react";
import { readStorage, STORAGE_KEYS, writeStorage } from "@/lib/storage";

interface Note {
  id: string;
  text: string;
  color: string;
  x: number;
  y: number;
}

const COLORS = ["#FDE047", "#FCA5A5", "#A5F3FC", "#C4B5FD", "#86EFAC"];

export function WhiteboardApp() {
  const [notes, setNotes] = useState<Note[]>([]);
  const [draft, setDraft] = useState("");
  const [color, setColor] = useState(COLORS[0]);

  useEffect(() => {
    setNotes(readStorage<Note[]>(STORAGE_KEYS.whiteboard, []));
  }, []);

  const persist = useCallback((next: Note[]) => {
    setNotes(next);
    writeStorage(STORAGE_KEYS.whiteboard, next);
  }, []);

  const addNote = () => {
    const text = draft.trim().slice(0, 280);
    if (!text) return;
    const note: Note = {
      id: crypto.randomUUID(),
      text,
      color,
      x: 20 + notes.length * 12,
      y: 20 + notes.length * 12,
    };
    persist([...notes, note]);
    setDraft("");
  };

  const updateNote = (id: string, text: string) => {
    persist(notes.map((n) => (n.id === id ? { ...n, text: text.slice(0, 280) } : n)));
  };

  const deleteNote = (id: string) => {
    persist(notes.filter((n) => n.id !== id));
  };

  const reset = () => {
    if (confirm("Delete all sticky notes on this device?")) persist([]);
  };

  return (
    <div className="space-y-4">
      <header>
        <h2 className="text-xl font-bold">Whiteboard</h2>
        <p className="text-sm text-[var(--text-muted)]">
          Notes are stored locally in your browser only — the owner does not receive them. Use
          Contact for incoming messages.
        </p>
      </header>

      <div className="flex flex-wrap gap-2">
        {COLORS.map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setColor(c)}
            className="h-8 w-8 rounded-full ring-2 ring-offset-2"
            style={{
              background: c,
              outline: color === c ? "2px solid var(--accent)" : "none",
            }}
            aria-label={`Select color ${c}`}
          />
        ))}
      </div>

      <div className="flex flex-wrap gap-2">
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="Quick thought…"
          maxLength={280}
          className="min-h-11 flex-1 rounded-lg border bg-transparent px-3"
          style={{ borderColor: "var(--border)" }}
        />
        <button
          type="button"
          onClick={addNote}
          className="min-h-11 rounded-lg px-4 text-sm font-semibold text-white"
          style={{ background: "var(--accent)" }}
        >
          Add Sticky
        </button>
        <button
          type="button"
          onClick={reset}
          className="min-h-11 rounded-lg border px-4 text-sm"
          style={{ borderColor: "var(--border)" }}
        >
          Reset board
        </button>
      </div>

      <div className="relative min-h-[240px] rounded-lg border bg-black/[0.02]" style={{ borderColor: "var(--border)" }}>
        {notes.map((n) => (
          <div
            key={n.id}
            className="absolute w-44 rounded-md p-2 shadow-md"
            style={{ left: n.x, top: n.y, background: n.color }}
          >
            <textarea
              value={n.text}
              onChange={(e) => updateNote(n.id, e.target.value)}
              className="w-full resize-none bg-transparent text-sm text-stone-900"
              rows={4}
            />
            <button
              type="button"
              onClick={() => deleteNote(n.id)}
              className="text-xs text-stone-700 underline"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
