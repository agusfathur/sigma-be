// @ts-nocheck
import { v2 as cloudinary } from "cloudinary";
import path from "path";
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

export const validateImage = (image) => {
  const allowedExt = [".png", ".jpg", ".jpeg", ".PNG", ".JPG", ".JPEG"];

  const ext = path.extname(image.name);
  if (!allowedExt.includes(ext.toLocaleLowerCase())) {
    return {
      status: false,
      message: {
        image: ["File extension not allowed, allowed extension: .png, .jpg, .jpeg"]
      },
      data: {}
    };
  }
  const fileSize = image.size;

  if (fileSize > 5000000) {
    return {
      status: false,
      message: {
        image: ["File size must be less than 5MB"]
      },

      data: {}
    };
  }
  const fileName = image.md5 + ext;
  return {
    status: true,
    message: "Success Validation Image",
    data: {
      fileName,
      path: image.tempFilePath
    }
  };
};

export const UploadImageProfile = async (image) => {
  const result = await cloudinary.uploader.upload(image, {
    folder: "profile"
  });

  return result;
};

export const UploadImageAbsensi = async (image) => {
  const result = await cloudinary.uploader.upload(image, {
    folder: "absensi"
  });

  return result;
};

export const UploadFileIzin = async (file) => {
  return await cloudinary.uploader.upload(file, {
    folder: "izin"
  });
};

export const ValidateFileIzin = (file) => {
  const fileSize = file.size;

  if (fileSize > 1000000) {
    return {
      status: false,
      message: {
        image: ["File size must be less than 10MB"]
      },

      data: {
        path: ""
      }
    };
  }
  return {
    status: true,
    message: "Success Validation File Izin",
    data: {
      path: file.tempFilePath
    }
  };
};

export const DeleteImage = async (public_id) => {
  return await cloudinary.uploader.destroy(public_id, {
    invalidate: true
  });
};

export const GetPublicId = (imageUrl) => {
  const splitUrl = imageUrl.split("/");
  const imageName = splitUrl[splitUrl.length - 1].split(".")[0];
  const result = `${splitUrl[splitUrl.length - 2]}/${imageName}`;

  return result;
};
