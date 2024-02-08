import Image, { type ImageProps } from "next/image";
type TImageProps = Omit<ImageProps, "src" | "alt">;

const Youtube = (props: TImageProps) => (
  <Image {...props} src="/icons/youtube.svg" alt="telegram"></Image>
);

const Instagram = (props: TImageProps) => (
  <Image {...props} src="/icons/instagram.svg" alt="instagram"></Image>
);
export const SocialMedia = {
  Youtube,
  Instagram,
};
