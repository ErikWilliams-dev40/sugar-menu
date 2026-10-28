import { getImageProps } from "next/image";

const DESKTOP = { width: 1536, height: 1024 };
const HERO_MOBILE = { width: 750, height: 1100 };

/* getImageProps returns props for a native img. The hero keeps the kit's
   art-directed crops; other images keep the existing CSS sizing. */
/* eslint-disable @next/next/no-img-element */
export function EditorialImage({
  name,
  alt = "",
  className,
  hero = false,
  eager = false,
  priority = false,
  sizes = "(max-width: 560px) 100vw, (max-width: 800px) 50vw, 40vw",
}: {
  name: string;
  alt?: string;
  className?: string;
  hero?: boolean;
  eager?: boolean;
  /** High fetch priority for the homepage hero only. */
  priority?: boolean;
  sizes?: string;
}) {
  if (hero) {
    const { props: mobile } = getImageProps({
      alt,
      sizes: "100vw",
      src: `/images/${name}-mobile.webp`,
      ...HERO_MOBILE,
    });
    const { props: desktop } = getImageProps({
      alt,
      sizes: "100vw",
      src: `/images/${name}.webp`,
      ...DESKTOP,
    });
    const {
      style: desktopStyle,
      loading: desktopLoading,
      ...desktopImg
    } = desktop;
    void desktopStyle;
    void desktopLoading;
    return (
      <picture>
        <source media="(max-width: 560px)" srcSet={mobile.srcSet} />
        <img
          {...desktopImg}
          className={className}
          alt={alt}
          fetchPriority={priority ? "high" : "auto"}
          loading={priority ? "eager" : "lazy"}
        />
      </picture>
    );
  }
  const { props } = getImageProps({
    alt,
    sizes,
    src: `/images/${name}.webp`,
    ...DESKTOP,
  });
  const { style, ...img } = props;
  void style;
  return (
    <img
      {...img}
      className={className}
      alt={alt}
      loading={eager ? "eager" : "lazy"}
    />
  );
}
