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
