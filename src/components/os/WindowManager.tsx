"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useOS } from "@/components/os/OSProvider";
import { AppContent } from "@/components/apps/AppContent";

export function WindowManager() {
  const { windows, closeWindow, focusWindow, toggleMaximize } = useOS();

  return (
    <>
      {windows.map((win, index) => (
        <OSWindow
          key={win.id}
          win={win}
          index={index}
          onClose={() => closeWindow(win.id)}
          onFocus={() => focusWindow(win.id)}
          onToggleMax={() => toggleMaximize(win.id)}
        />
      ))}
    </>
  );
}

function OSWindow({
  win,
  index,
  onClose,
  onFocus,
  onToggleMax,
}: {
  win: { id: string; appId: string; title: string; zIndex: number; maximized: boolean };
  index: number;
  onClose: () => void;
  onFocus: () => void;
  onToggleMax: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [pos, setPos] = useState({ x: 48 + index * 24, y: 80 + index * 24 });
  const dragRef = useRef<{ x: number; y: number; px: number; py: number } | null>(null);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const onTitlePointerDown = useCallback(
    (e: React.PointerEvent) => {
      if (win.maximized || window.innerWidth < 768) return;
      onFocus();
      dragRef.current = { x: e.clientX, y: e.clientY, px: pos.x, py: pos.y };
      (e.target as HTMLElement).setPointerCapture(e.pointerId);
    },
    [onFocus, pos, win.maximized],
  );

  const onTitlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!dragRef.current) return;
    const dx = e.clientX - dragRef.current.x;
    const dy = e.clientY - dragRef.current.y;
    setPos({
      x: Math.max(8, dragRef.current.px + dx),
      y: Math.max(52, dragRef.current.py + dy),
    });
  }, []);

  const onTitlePointerUp = useCallback(() => {
    dragRef.current = null;
  }, []);

  return (
    <div
      ref={ref}
      role="dialog"
      aria-modal="true"
      aria-labelledby={`win-title-${win.id}`}
      className={`os-window ${win.maximized ? "maximized" : ""}`}
      style={{
        zIndex: win.zIndex,
        left: win.maximized ? undefined : pos.x,
        top: win.maximized ? undefined : pos.y,
        width: win.maximized ? undefined : "min(720px, 92vw)",
        height: win.maximized ? undefined : "min(520px, 70vh)",
      }}
      onMouseDown={onFocus}
    >
      <div
        className="os-window-titlebar"
        onPointerDown={onTitlePointerDown}
        onPointerMove={onTitlePointerMove}
        onPointerUp={onTitlePointerUp}
        onPointerCancel={onTitlePointerUp}
      >
        <div className="os-window-controls">
          <button
            type="button"
            className="os-window-btn close"
            onClick={onClose}
            aria-label="Close window"
          />
          <button
            type="button"
            className="os-window-btn max"
            onClick={onToggleMax}
            aria-label={win.maximized ? "Restore window" : "Maximize window"}
          />
          <button type="button" className="os-window-btn min" aria-hidden tabIndex={-1} />
        </div>
        <p id={`win-title-${win.id}`} className="flex-1 truncate text-sm font-bold uppercase">
          {win.title}
        </p>
      </div>
      <div className="os-window-body">
        <AppContent appId={win.appId} />
      </div>
    </div>
  );
}
