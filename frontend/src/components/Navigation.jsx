export default function Navigation({ pages, activePage, onChange, disabled }) {
  return (
    <nav aria-label="Record types">
      {Object.entries(pages).map(([key, page]) => (
        <button key={key} aria-pressed={key === activePage} disabled={disabled}
                onClick={() => onChange(key)}>
          {page.label}
        </button>
      ))}
    </nav>
  );
}
