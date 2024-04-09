import { NextResponse } from "next/server";
import mysql from 'mysql2/promise';
import jwt from 'jsonwebtoken';
require('dotenv').config();

const db = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_DATABASE
});

// Route to delete a blog by ID
export async function DELETE(request) {
    try {
        // Check admin authentication
        const token = request.headers.get('authorization');

        if (!token) {
            return NextResponse.json({
                success: false,
                message: "Token is missing",
            }, { status: 401 });
        }

        const jwtSecretKey = process.env.JWT_SECRET_KEY;

        const decoded = jwt.verify(token, jwtSecretKey);

        // Set User Id
        const userId = decoded.userId;

        // Retrieve user information
        const [user] = await db.query('SELECT * FROM Users WHERE id = ?', [userId]);

        // Check if the user exists
        if (user.length == 0) {
            return NextResponse.json({
                success: false,
                error: "There is no user with this email.",
            }, { status: 403 });
        }

        // Check if the user is admin
        if (!user[0].is_admin) {
            return NextResponse.json({
                success: false,
                error: "You do not have permission to perform this action.",
            }, { status: 403 });
        }

        const { searchParams } = new URL(request.url);
        const id = searchParams.get('id')

        // Check if the 'id' parameter is present
        if (!id) {
            return NextResponse.json({
                success: false,
                error: "Blog ID is required",
            }, { status: 400 });
        }

        // Check if the blog exists
        const [blog] = await db.query('SELECT * FROM Blogs WHERE id = ?', [id]);

        if (blog.length == 0) {
            return NextResponse.json({
                success: false,
                error: "Blog not found",
            }, { status: 404 });
        }

        // Delete the blog
        await db.query('DELETE FROM Blogs WHERE id = ?', [id]);

        return NextResponse.json({
            success: true,
            data: { message: "Blog deleted successfully" },
        }, { status: 200 });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
    }
}

