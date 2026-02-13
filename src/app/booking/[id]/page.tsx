// app/(private)/booking/[id]/page.tsx
import { getServerSession } from "next-auth";
import { authOptions } from "@/lib/authOptions";
import { redirect } from "next/navigation";

export default async function BookingPage() {
    const session = await getServerSession(authOptions);

    if (!session) {
        redirect("/login?callbackUrl=/booking/123");
    }

    return <div>Booking Page</div>;
}
