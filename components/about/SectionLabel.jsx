export default function SectionLabel({ children, className = '' }) {
  return (
    <p
      className={`flex items-center gap-3 text-xs font-medium uppercase tracking-[0.3em] text-[#3b3c3d] ${className}`}
    >
      <span aria-hidden="true" className="h-px w-8 bg-[#2563EB]" />
      {children}
    </p>
  );
}
