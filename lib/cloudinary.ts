import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function uploadBase64Image(
  base64Image: string,
  userId: string,
): Promise<{ imageUrl: string; publicId: string }> {
  const result = await cloudinary.uploader.upload(base64Image, {
    folder: `pixelmind/${userId}`,
    resource_type: "image",
    transformation: [
      { width: 512, height: 512, crop: "fill" },
      { quality: "auto", fetch_format: "auto" },
    ],
  });

  return {
    imageUrl: result.secure_url,
    publicId: result.public_id,
  };
}

export async function deleteImage(publicId: string): Promise<void> {
  await cloudinary.uploader.destroy(publicId);
}

export default cloudinary;
