import { NextResponse } from "next/server";
import mysql from 'mysql2/promise';

const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});

export async function GET() {
    try {
        const [services] = await db.query('SELECT * FROM Services');

        // Construct image URLs
        const servicesWithImageUrls = services.map((service) => ({
            ...service,
            image_url: service.image_url.includes(',') ? service.image_url.split(',') : [service.image_url],
        }));

        return NextResponse.json({
            success: true,
            data: servicesWithImageUrls,
        }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: 'Database error' }, { status: 500 });
    }
}
