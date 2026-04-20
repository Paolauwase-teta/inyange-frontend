import { v2 as cloudinary } from 'cloudinary';

// Configure the SDK using our environment variables
// IMPORTANT: This file can ONLY be used on the server side (API Routes/Server Components)
// because it relies on CLOUDINARY_API_SECRET which should never leak to the browser.
cloudinary.config({
  cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export default cloudinary;
