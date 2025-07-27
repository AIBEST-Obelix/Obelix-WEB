import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, props: { params: Promise<{ imageId: string }> }): Promise<NextResponse> {
    const params = await props.params;

    console.log("Image API route called with imageId:", params.imageId);

    try {
        // Call your backend API directly to stream the image
        const backendUrl = `http://localhost:5151/api/items/ItemsFile/${params.imageId}`;
        console.log("Calling backend URL:", backendUrl);

        const response = await fetch(backendUrl, {
            method: 'GET',
            // Add any necessary headers for authentication if needed
        });

        console.log("Backend response status:", response.status);
        console.log("Backend response headers:", Object.fromEntries(response.headers.entries()));

        if (!response.ok) {
            console.error("Backend returned error:", response.status, response.statusText);
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        // Get the image blob from your backend
        const imageBlob = await response.blob();
        console.log("Image blob size:", imageBlob.size, "type:", imageBlob.type);

        // Return the image with proper headers
        return new NextResponse(imageBlob, {
            status: 200,
            headers: {
                'Content-Type': response.headers.get('content-type') || 'image/jpeg',
                'Cache-Control': 'public, max-age=31536000', // Cache for 1 year
            },
        });
    } catch (error: any) {
        console.error("Error streaming image:", error);

        // Return a 404 or error response
        return new NextResponse("Image not found", {
            status: 404,
        });
    }
}
