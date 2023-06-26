import { NextResponse } from "next/server";

const allowedOrigins =
    process.env.NODE_ENV === "production"
        ? ["https://task-brxbs.vercel.app/"]
        : ["http://localhost:3000/"];

// This function can be marked `async` if using `await` inside
export function middleware(request: Request) {
const origin = request.headers.get('origen')
    if (origin && !allowedOrigins.includes(origin)){
          return new NextResponse(null,{
            status: 400,
            statusText: "Bad Request",
            headers:{
                'Content-Type': 'text/plain'
            }
          });
    }
    return NextResponse.next()
}

// See "Matching Paths" below to learn more
export const config = {
    matcher: "/api/:path*",
};
