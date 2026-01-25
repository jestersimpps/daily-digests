interface DotGridProps {
  className?: string;
  dotColor?: string;
  dotSize?: number;
  spacing?: number;
}

export default function DotGrid({
  className = '',
  dotColor = 'rgba(255, 255, 255, 0.08)',
  dotSize = 1,
  spacing = 24,
}: DotGridProps) {
  return (
    <div
      className={`absolute inset-0 pointer-events-none ${className}`}
      style={{
        backgroundImage: `radial-gradient(circle, ${dotColor} ${dotSize}px, transparent ${dotSize}px)`,
        backgroundSize: `${spacing}px ${spacing}px`,
      }}
    />
  );
}
