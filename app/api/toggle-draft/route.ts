import {draftMode} from "next/headers";
import {NextResponse} from "next/server";

export async function POST() {
    const draft = await draftMode();

    if (draft.isEnabled) {
        draft.disable();
        return NextResponse.json({
            message: 'draftMode disabled!',
        });
    } else {
        draft.enable();
        return NextResponse.json({
            message: 'draftMode enabled!',
        });
    }
}
