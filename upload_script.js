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
             folder: "inyange", // All assets go to this folder on Cloudinar
             resource_type: "auto",
        });
        console.log(`✅ Uploaded ${path.basename(filePath)} -> ${result.secure_url}`);
    } catch (error) {
        console.error(`❌ Failed to upload ${path.basename(filePath)}:`, error);
    }
}

async function bulkUpload() {
    if (!process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
         console.error("ERROR: Cloudinary credentials not found. Please make sure .env.local is filled out correctly.");
         process.exit(1);
    }

    console.log("Starting bulk upload to Cloudinary...");
    const files = fs.readdirSync(publicDir);

    // Filter for valid media files
    const mediaFiles = files.filter(file => {
         const ext = path.extname(file).toLowerCase();
         return ['.png', '.jpg', '.jpeg', '.webp', '.gif', '.mp4', '.mov'].includes(ext);
    });

    for (const file of mediaFiles) {
        const filePath = path.join(publicDir, file);
        if (fs.statSync(filePath).isFile()) {
            await uploadFile(filePath);
        }
    }

    console.log("🎉 Bulk upload complete.");
}

bulkUpload();
