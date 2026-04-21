const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || "dkqshjwq5";

/**
 * Returns a high-speed Cloudinary URL for a given static asset path.
 * Automatically adds quality and format optimizations (f_auto, q_auto).
 * 
 * @param path The local asset path, e.g., "/milkpouring.mp4" or "cooking.mp4"
 * @returns The remote Cloudinary URL
 */
export function getAsset(path: string): string {
    if (!path) return "";
    
    // Default to handling basic paths correctly, avoiding double slashes.
    const cleanPath = path.startsWith('/') ? path.substring(1) : path;
    
    // Ignore already remote URLs
    if (cleanPath.startsWith('http')) return path;

    // LOCAL FALLBACK: If we're in development or if Cloudinary isn't preferred
    // we return the local public path.
    if (process.env.NODE_ENV === 'development') {
        return path.startsWith('/') ? path : `/${path}`;
    }

    // Check if the asset is a video type
    const isVideo = cleanPath.toLowerCase().match(/\.(mp4|mov|webm|ogg)$/);
    const resourceType = isVideo ? "video" : "image";

    return `https://res.cloudinary.com/${CLOUD_NAME}/${resourceType}/upload/f_auto,q_auto/inyange/${cleanPath}`;
}
