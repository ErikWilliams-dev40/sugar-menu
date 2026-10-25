export function PlaceholderImage({
  caption,
  className = "",
}: {
  caption: string;
  className?: string;
}) {
  return (
    <div
      className={`placeholder-image ${className}`}
      role="img"
      aria-label={`Photography placeholder: ${caption}`}
    >
      <span aria-hidden="true">{caption}</span>
    </div>
  );
}
