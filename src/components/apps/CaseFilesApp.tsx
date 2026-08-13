"use client";

import { useState } from "react";

interface FileNode {
  name: string;
  kind: "folder" | "file";
  children?: FileNode[];
}

const FILE_TREE: FileNode[] = [
  {
    name: "Start Here",
    kind: "folder",
    children: [{ name: "README.case", kind: "file" }],
  },
  {
    name: "Admeasy Ai",
    kind: "folder",
    children: [
      { name: "Agentic OS.case", kind: "file" },
      { name: "Voice Engine.case", kind: "file" },
    ],
  },
  {
    name: "Admeasy.in",
    kind: "folder",
    children: [{ name: "Admissions Platform.case", kind: "file" }],
  },
  {
    name: "Proof",
    kind: "folder",
    children: [
      { name: "NIT Podcast.case", kind: "file" },
      { name: "Foundervoice.case", kind: "file" },
    ],
  },
  {
    name: "Experiments",
    kind: "folder",
    children: [{ name: "Portfolio OS.case", kind: "file" }],
  },
];

export function CaseFilesApp() {
  const [path, setPath] = useState<string[]>([]);
  const [selected, setSelected] = useState<string | null>(null);

  const current = path.reduce<FileNode[] | undefined>((nodes, segment) => {
    const folder = nodes?.find((n) => n.name === segment && n.kind === "folder");
    return folder?.children;
  }, FILE_TREE);

  const items = current ?? FILE_TREE;

  const openFolder = (name: string) => setPath((p) => [...p, name]);
  const goBack = () => setPath((p) => p.slice(0, -1));

  return (
    <div className="space-y-3">
      <p className="window-kicker">CASE FILES / FINDER</p>
      <h2 className="window-headline">
        Nested folders. <em>Double-click.</em>
      </h2>

      <div className="flex gap-2">
        <button type="button" className="retro-btn" onClick={goBack} disabled={path.length === 0}>
          ← BACK
        </button>
        <span className="retro-panel flex-1 px-2 py-1 font-mono text-sm">
          Aadesh OS / {path.join(" / ") || "Case Files"}
        </span>
      </div>

      <div className="grid grid-cols-2 gap-0 border-2 border-[var(--border)] bg-[#1a1a1a] text-[#f5f0e8] sm:grid-cols-1">
        <div className="border-r-2 border-[var(--border)] p-2 sm:border-r-0 sm:border-b-2">
          <p className="mb-2 text-xs opacity-70">FAVOURITES</p>
          {items.map((item) => (
            <button
              key={item.name}
              type="button"
              onClick={() =>
                item.kind === "folder" ? openFolder(item.name) : setSelected(item.name)
              }
              onDoubleClick={() => item.kind === "folder" && openFolder(item.name)}
              className="block w-full px-2 py-1 text-left text-sm hover:bg-[#333]"
            >
              {item.kind === "folder" ? "📁" : "📄"} {item.name}
            </button>
          ))}
        </div>
        <div className="p-3 text-sm">
          {selected ? (
            <p>Preview: <strong>{selected}</strong> — demo file. Full case study opens in Projects.</p>
          ) : (
            <p className="opacity-70">Single-click to preview. Double-click folders to open.</p>
          )}
        </div>
      </div>
    </div>
  );
}
