import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { UPLOAD_BASE_PATH } from "@/lib/paths";

export async function GET(
  _req: Request,
  context: { params: Promise<{ path: string[] }> }
) {
    const { path: filePath } = await context.params;
    const fullPath = path.join(UPLOAD_BASE_PATH, ...filePath);

    if (!fs.existsSync(fullPath)) {
      return new NextResponse("Not found", { status: 404 });
    }

    const file = fs.readFileSync(fullPath);
    return new NextResponse(file);
}
