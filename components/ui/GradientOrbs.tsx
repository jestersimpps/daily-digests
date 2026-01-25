interface GradientOrbsProps {
  className?: string;
  variant?: 'default' | 'purple' | 'blue' | 'cyan';
}

export default function GradientOrbs({ className = '', variant = 'default' }: GradientOrbsProps) {
  const variants = {
    default: {
      orb1: 'bg-purple-600/25',
      orb2: 'bg-blue-600/20',
      orb3: 'bg-violet-600/20',
    },
    purple: {
      orb1: 'bg-purple-600/30',
      orb2: 'bg-fuchsia-600/25',
      orb3: 'bg-pink-600/20',
    },
    blue: {
      orb1: 'bg-blue-600/30',
      orb2: 'bg-indigo-600/25',
      orb3: 'bg-cyan-600/20',
    },
    cyan: {
      orb1: 'bg-cyan-600/30',
      orb2: 'bg-teal-600/25',
      orb3: 'bg-emerald-600/20',
    },
  };

  const colors = variants[variant];

  return (
    <div className={`absolute inset-0 overflow-hidden pointer-events-none ${className}`}>
      <div
        className={`absolute -top-20 -left-20 w-[500px] h-[500px] ${colors.orb1} rounded-full blur-[120px] animate-float-slow will-change-transform`}
      />
      <div
        className={`absolute top-1/4 -right-10 w-[450px] h-[450px] ${colors.orb2} rounded-full blur-[100px] animate-float-medium will-change-transform`}
      />
      <div
        className={`absolute bottom-0 right-1/4 w-[350px] h-[350px] ${colors.orb3} rounded-full blur-[90px] animate-float-fast will-change-transform`}
      />
    </div>
  );
}
