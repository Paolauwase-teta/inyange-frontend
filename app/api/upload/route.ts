import { NextResponse } from 'next/server';
import cloudinary from '@/lib/cloudinary';

export async function POST(req: Request) {
    try {
        const body = await req.json();
        const { file, folder } = body;

        if (!file) {
            return NextResponse.json({ error: "No file provided" }, { status: 400 });
        }

        const response = await cloudinary.uploader.upload(file, {
            folder: folder || "inyange",
            resource_type: "auto", // Allows both videos and images
        });

        return NextResponse.json(response);
    } catch (error: any) {
        return NextResponse.json({ error: error.message }, { status: 500 });
    }
}
