"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { ownerProfile } from "@/content/owner-profile";
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
  const dragRef = useRef<{ id: string; offsetX: number; offsetY: number } | null>(null);
  const boardRef = useRef<HTMLDivElement>(null);
  const notesRef = useRef<Note[]>([]);

  useEffect(() => {
    notesRef.current = notes;
  }, [notes]);

  useEffect(() => {
    const saved = readStorage<Note[]>(STORAGE_KEYS.whiteboard, []);
    const quick = readStorage<Array<{ id: string; text: string; createdAt: string }>>(
      STORAGE_KEYS.quickStickies,
      [],
    );

    const imported: Note[] = quick
      .filter((q) => !saved.some((n) => n.id === q.id))
      .map((q, i) => ({
        id: q.id,
        text: q.text,
        color: COLORS[i % COLORS.length],
        x: 24 + i * 16,
        y: 24 + i * 16,
      }));

    setNotes([...saved, ...imported]);
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
      x: 32 + (notes.length % 4) * 24,
      y: 32 + (notes.length % 3) * 28,
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
    if (confirm("Delete all sticky notes on this device?")) {
      persist([]);
      writeStorage(STORAGE_KEYS.quickStickies, []);
    }
  };

  const onPointerDown = (id: string, e: React.PointerEvent) => {
    const board = boardRef.current;
    if (!board) return;
    const rect = board.getBoundingClientRect();
    const note = notes.find((n) => n.id === id);
    if (!note) return;
    dragRef.current = {
      id,
      offsetX: e.clientX - rect.left - note.x,
      offsetY: e.clientY - rect.top - note.y,
    };
    (e.target as HTMLElement).setPointerCapture(e.pointerId);
  };

  const onPointerMove = (e: React.PointerEvent) => {
    if (!dragRef.current || !boardRef.current) return;
    const rect = boardRef.current.getBoundingClientRect();
    const { id, offsetX, offsetY } = dragRef.current;
    const x = Math.max(0, Math.min(e.clientX - rect.left - offsetX, rect.width - 160));
    const y = Math.max(0, Math.min(e.clientY - rect.top - offsetY, rect.height - 120));
    setNotes((prev) => prev.map((n) => (n.id === id ? { ...n, x, y } : n)));
  };

  const onPointerUp = () => {
    if (dragRef.current) {
      writeStorage(STORAGE_KEYS.whiteboard, notesRef.current);
      dragRef.current = null;
    }
  };

  return (
    <div className="whiteboard-app space-y-4">
      <header className="whiteboard-header">
        <p className="window-kicker">{ownerProfile.identity.osName} WHITEBOARD</p>
        <h2 className="window-headline">
          Leave a <em>sticky note.</em>
        </h2>
        <p className="text-sm text-[var(--text-muted)]">
          Drag · write · persist locally. Notes stay on your device only.
        </p>
      </header>

      <div className="whiteboard-toolbar">
        <div className="whiteboard-colors">
          {COLORS.map((c) => (
            <button
              key={c}
              type="button"
              onClick={() => setColor(c)}
              className={`whiteboard-color ${color === c ? "is-active" : ""}`}
              style={{ background: c }}
              aria-label={`Select color`}
            />
          ))}
        </div>
        <input
          value={draft}
          onChange={(e) => setDraft(e.target.value)}
          placeholder="What should Aadesh build, fix, or remember?"
          maxLength={280}
          className="whiteboard-input"
          onKeyDown={(e) => e.key === "Enter" && addNote()}
        />
        <button type="button" onClick={addNote} className="retro-btn-green !w-auto shrink-0">
          + ADD STICKY
        </button>
        <button type="button" onClick={reset} className="retro-btn shrink-0">
          RESET DESKTOP ICONS
        </button>
      </div>

      <div
        ref={boardRef}
        className="whiteboard-canvas"
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerUp}
      >
        {notes.map((n) => (
          <div
            key={n.id}
            className="whiteboard-note"
            style={{ left: n.x, top: n.y, background: n.color }}
            onPointerDown={(e) => onPointerDown(n.id, e)}
          >
            <div className="whiteboard-note-head">
              <span>DRAG NOTE</span>
              <button type="button" onClick={() => deleteNote(n.id)} aria-label="Delete">
                ×
              </button>
            </div>
            <textarea
              value={n.text}
              onChange={(e) => updateNote(n.id, e.target.value)}
              className="whiteboard-note-body"
              rows={4}
            />
          </div>
        ))}
      </div>
    </div>
  );
}
