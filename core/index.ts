import imageSize from "image-size";

export function getImageSize(image: Buffer) {
  const dimensions = imageSize(image);
  return {
    width: dimensions.width,
    height: dimensions.height,
  }
}
