// Pill switch for comparing section layouts. Rendered only on the local dev server.
export default function VariantSwitch<T extends string>({ label, options, value, onChange }: {
  label: string; options: readonly { id: T; label: string }[]; value: T; onChange: (v: T) => void
}) {
  if (!import.meta.env.DEV) return null
  return (
    <div className="layout-switch" role="radiogroup" aria-label={label}>
      <span>{label}</span>
      {options.map((o) => (
        <button key={o.id} role="radio" aria-checked={value === o.id} className={value === o.id ? 'on' : ''} onClick={() => onChange(o.id)}>{o.label}</button>
      ))}
    </div>
  )
}
