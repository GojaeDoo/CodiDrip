import { uploadDripImage, createDripDB } from "../storage/dripStorage";

export const dripService = {
  createDrip: async (images: string[], tags: string[], userId: string) => {
    const uploadedImages = await Promise.all(
      images.map(async (image: string) => {
        const matches = image.match(/^data:([A-Za-z-+\/]+);base64,(.+)$/);
        if (!matches || matches.length !== 3) {
          throw new Error("Invalid image format");
        }
        const contentType = matches[1];
        const base64Data = matches[2];
        const buffer = Buffer.from(base64Data, "base64");
        return await uploadDripImage(buffer, contentType);
      })
    );
    return await createDripDB(uploadedImages, tags, userId);
  },
};
