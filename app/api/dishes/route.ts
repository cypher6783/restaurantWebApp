import { NextResponse } from 'next/server';
import { dishes } from '@/lib/data';

export async function GET() {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 500));
  
  return NextResponse.json(dishes);
}
