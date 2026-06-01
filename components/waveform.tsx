export function Waveform() {
  const bars = [28, 54, 36, 70, 45, 80, 50, 62, 34, 75, 44, 58, 30, 66, 38, 74, 46, 60];
  return (
    <div className="wave-bars flex h-12 items-center gap-1" aria-hidden="true">
      {bars.map((height, index) => (
        <span key={index} style={{ height: `${height}%` }} />
      ))}
    </div>
  );
}
