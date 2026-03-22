import { NextResponse } from 'next/server';
import { users } from '@/lib/data';

export async function POST(request: Request) {
  const body = await request.json();
  const { email, password } = body;

  // Basic mock auth check
  const user = users.find(u => u.email === email && u.password === password);

  if (!user) {
    return NextResponse.json({ error: "Invalid credentials" }, { status: 401 });
  }

  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 800));

  return NextResponse.json({
    id: user.id,
    name: user.name,
    email: user.email,
    initials: user.initials
  });
}
