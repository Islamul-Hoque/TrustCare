src/
 ├── app/
 │    ├── (public)/
 │    │     ├── page.tsx
 │    │     ├── service/[id]/page.tsx
 │    │
 │    ├── (private)/
 │    │     ├── booking/[id]/page.tsx
 │    │     ├── my-bookings/page.tsx
 │    │
 │    ├── api/
 │    │     ├── auth/[...nextauth]/route.ts
 │    │     ├── bookings/route.ts
 │    │     ├── stripe/route.ts
 │    │     ├── webhook/route.ts
 │    │
 │    ├── layout.tsx
 │    ├── globals.css
 │
 ├── components/
 ├── lib/
 │    ├── db.ts
 │    ├── auth.ts
 │    ├── resend.ts
 │    ├── stripe.ts
 │
 ├── models/
 │    ├── User.ts
 │    ├── Booking.ts
 │    ├── Service.ts
 │
 ├── types/


src/
 ├── app/
 │    ├── (public)/
 │    │     ├── login/
 │    │     │     └── page.tsx
 │    │     ├── register/
 │    │     │     └── page.tsx
 │    │
 │    ├── api/
 │    │     ├── auth/
 │    │     │     └── [...nextauth]/
 │    │     │            └── route.ts
 │    │     ├── register/
 │    │     │     └── route.ts
 │
 ├── components/
 │    ├── auth/
 │    │     ├── LoginForm.tsx
 │    │     ├── RegisterForm.tsx
 │    │     ├── SocialButton.tsx
 │
 ├── lib/
 │    ├── db.ts
 │    ├── auth.ts
 │
 ├── types/
 │    ├── next-auth.d.ts




project-root/
 ├─ app/
 │   ├─ services/
 │   │   ├─ page.tsx                  → All Services Page
 │   │   └─ _components/
 │   │       ├─ ServiceCard.tsx       → Single service card
 │   │       └─ ServiceList.tsx       → List wrapper for all services
 │   │
 │   ├─ service/
 │   │   └─ [id]/
 │   │       ├─ page.tsx              → Service Detail Page
 │   │       └─ _components/
 │   │           ├─ ServiceDetail.tsx → Detailed info section
 │   │           └─ BookButton.tsx    → Book Service button
 │   │
 │   ├─ booking/
 │   │   └─ [id]/
 │   │       ├─ page.tsx              → Booking Page
 │   │       └─ _components/
 │   │           └─ BookingForm.tsx   → Form for booking
 │   │
 │   ├─ my-bookings/
 │   │   ├─ page.tsx                  → My Bookings Page
 │   │   └─ _components/
 │   │       └─ BookingCard.tsx       → Each booking card
 │   │
 │   └─ api/
 │       ├─ services/
 │       │   └─ route.ts              → Services API
 │       └─ bookings/
 │           └─ route.ts              → Bookings API
 │
 ├─ public/
 │   └─ locations.json                → Static location dataset
