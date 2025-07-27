import { auth } from "@clerk/nextjs/server";
import "server-only"; 
import { db } from "./db";

export async function getMyImages() {
    const user = await auth();

    if (!user.userId) {
        throw new Error("Unauthorized");
    }

    const images = await db.query.images.findMany({
        where: (images, { eq }) => eq(images.userId, user.userId),
        orderBy: (images, { desc }) => desc(images.id),
    });

    

    return images;
}