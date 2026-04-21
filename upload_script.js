require('dotenv').config({ path: '.env.local' });
const cloudinary = require('cloudinary').v2;
const fs = require('fs');
const path = require('path');

cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

const publicDir = path.join(__dirname, 'public');

async function uploadFile(filePath) {
    try {
        const result = await cloudinary.uploader.upload(filePath, {
             use_filename: true,
             unique_filename: false,
             overwrite: true,
             folder: "inyange", // All assets go to this folder on Cloudina
             resource_type: "auto",
        });
        console.log(`✅ Uploaded ${path.basename(filePath)} -> ${result.secure_url}`);
    } catch (error) {
        console.error(`❌ Failed to upload ${path.basename(filePath)}:`, error);
    }
}

async function getAllFiles(dirPath, arrayOfFiles) {
    const files = fs.readdirSync(dirPath);
    arrayOfFiles = arrayOfFiles || [];

    for (const file of files) {
        if (fs.statSync(dirPath + "/" + file).isDirectory()) {
            arrayOfFiles = await getAllFiles(dirPath + "/" + file, arrayOfFiles);
        } else {
            arrayOfFiles.push(path.join(dirPath, "/", file));
        }
    }
    return arrayOfFiles;
}

async function bulkUpload() {
    if (!process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
         console.error("ERROR: Cloudinary credentials not found. Please make sure .env.local is filled out correctly.");
         process.exit(1);
    }

    console.log("Starting recursive bulk upload to Cloudinary...");
    const allFiles = await getAllFiles(publicDir);

    // Filter for valid media files
    const mediaFiles = allFiles.filter(filePath => {
         const ext = path.extname(filePath).toLowerCase();
         return ['.png', '.jpg', '.jpeg', '.webp', '.gif', '.mp4', '.mov'].includes(ext);
    });

    for (const filePath of mediaFiles) {
        await uploadFile(filePath);
    }

    console.log("🎉 Bulk upload complete.");
}

bulkUpload();
