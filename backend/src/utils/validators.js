const { z } = require('zod');

const registerSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  phone: z.string().optional(),
  password: z.string().min(6)
});

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string()
});

const menuSchema = z.object({
  name: z.string(),
  price: z.number().positive(),
  category: z.string(),
  image: z.string().url().optional(),
  rating: z.string().optional(),
  time: z.string().optional(),
  special: z.string().optional()
});

const orderSchema = z.object({
  items: z.array(z.object({
    menuItemId: z.string(),
    quantity: z.number().int().positive(),
    price: z.number().positive()
  })),
  totalAmount: z.number().positive()
});

module.exports = {
  registerSchema,
  loginSchema,
  menuSchema,
  orderSchema
};
