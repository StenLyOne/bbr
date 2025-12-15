import { NextResponse } from "next/server";
import { fetchContactSettings } from "../../../../lib/api/contacts/fetch";

export const revalidate = 60;

export async function GET() {
  try {
    const data = await fetchContactSettings();
    return NextResponse.json(data);
  } catch (e: any) {
    return NextResponse.json(
      { error: e?.message ?? "Server error" },
      { status: 500 }
    );
  }
}
