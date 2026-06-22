import cloudinary from "../config/cloudinary.js";
import streamifier from "streamifier";

export const uploadBufferToCloudinary = (buffer, options = {}) => {
  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      {
        resource_type: "auto", // PDF ke liye auto theek hai, issue aaye to "raw" try karo
        folder: "dds-marksheets",
        ...options,
      },
      (error, result) => {
        if (error) return reject(error);
        resolve(result);
      }
    );

    streamifier.createReadStream(buffer).pipe(uploadStream);
  });
};