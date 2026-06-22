import multer from "multer";

// ✅ Storage - memory mein rakho, Cloudinary ko buffer chahiye, disk persistent nahi hota Render pe
const storage = multer.memoryStorage();

// ✅ File filter (only images)
const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];

  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("Only JPG, JPEG, PNG allowed"), false);
  }
};

// ✅ Upload config
export const upload = multer({
  storage,
  fileFilter,
  limits: {
    fileSize: 2 * 1024 * 1024, // 🔥 2MB limit
  },
});