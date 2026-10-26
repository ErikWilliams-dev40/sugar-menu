/* Native picture preserves the kit's art-directed crops and exact WebP files. */
/* eslint-disable @next/next/no-img-element */
export function EditorialImage({
  name,
  alt = "",
  className,
  hero = false,
  eager = false,
}: {
  name: string;
  alt?: string;
  className?: string;
  hero?: boolean;
  eager?: boolean;
}) {
  if (hero)
    return (
      <picture>
        <source
          media="(max-width: 560px)"
          srcSet={`/images/${name}-mobile.webp`}
        />
        <img
          className={className}
          src={`/images/${name}.webp`}
          width={1536}
          height={1024}
          alt={alt}
          loading={eager ? "eager" : "lazy"}
          fetchPriority={eager ? "high" : "auto"}
        />
      </picture>
    );
  return (
    <img
      className={className}
      src={`/images/${name}.webp`}
      srcSet={`/images/${name}-sm.webp 480w, /images/${name}.webp 1536w`}
      sizes="(max-width: 560px) 100vw, (max-width: 800px) 50vw, 40vw"
      width={1536}
      height={1024}
      alt={alt}
      loading={eager ? "eager" : "lazy"}
    />
  );
}
