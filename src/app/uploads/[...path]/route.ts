import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";
import { UPLOAD_BASE_PATH } from "@/lib/paths";

type ParamsType = {
  path: string[];
}

export async function GET(
  _req: Request,
  context: { params: ParamsType }
) {
    const { params } = context;
    const filePath = path.join(UPLOAD_BASE_PATH, ...params.path);

    if (!fs.existsSync(filePath)) {
      return new NextResponse("Not found", { status: 404 });
    }

    const file = fs.readFileSync(filePath);
    return new NextResponse(file);
}
