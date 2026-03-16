import { NextResponse } from 'next/server';
import { dishes } from '@/lib/data';

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const dish = dishes.find(d => d.id === id);

  if (!dish) {
    return NextResponse.json({ error: "Dish not found" }, { status: 404 });
  }

  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 400));

  return NextResponse.json(dish);
}
