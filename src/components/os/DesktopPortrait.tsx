export function DesktopPortrait() {
  return (
    <div className="desktop-portrait" aria-hidden>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src="/assets/character-aadesh-transparent.png"
        alt=""
        width={160}
        height={320}
        className="desktop-portrait-img"
        draggable={false}
      />
    </div>
  );
}
