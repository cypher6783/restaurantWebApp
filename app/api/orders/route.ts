import { NextResponse } from 'next/server';
import { orders } from '@/lib/data';

export async function POST(request: Request) {
  const body = await request.json();
  const { items, total, address, paymentMethod } = body;

  if (!items || items.length === 0) {
    return NextResponse.json({ error: "Empty cart" }, { status: 400 });
  }

  const order = {
    id: `ORD-${Math.random().toString(36).substr(2, 9).toUpperCase()}`,
    items,
    total,
    address,
    paymentMethod,
    status: "pending",
    timestamp: new Date().toISOString()
  };

  orders.push(order);

  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 1200));

  return NextResponse.json({ success: true, orderId: order.id });
}
