import Link from "next/link";
export function Breadcrumbs({
  items,
  className = "",
  plain = false,
}: {
  items: { name: string; path?: string }[];
  className?: string;
  plain?: boolean;
}) {
  return (
    <nav
      className={`${plain ? "" : "page-shell"} breadcrumbs ${className}`.trim()}
      aria-label="Breadcrumb"
    >
      <ol>
        {items.map((item, index) => {
          const current = index === items.length - 1;
          return (
            <li key={`${item.name}-${index}`}>
              {item.path && !current ? (
                <Link href={item.path}>{item.name}</Link>
              ) : (
                <span aria-current={current ? "page" : undefined}>
                  {item.name}
                </span>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
