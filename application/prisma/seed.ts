import { PrismaClient, Role } from '@prisma/client';
import bcrypt from 'bcryptjs';
const prisma = new PrismaClient();
const catalog = [
  ['Electronics','Aurora Wireless Headphones',12999,18],['Electronics','Nova Smart Speaker',8999,24],['Electronics','Orbit USB-C Charger',3499,35],['Electronics','Pixel Mechanical Keyboard',10999,12],
  ['Home','Linen Throw Blanket',5999,20],['Home','Ceramic Pour-over Set',4599,16],['Home','Oak Desk Lamp',7499,9],['Home','Canvas Storage Basket',2899,28],
  ['Apparel','Everyday Cotton Tee',2499,40],['Apparel','Trail Running Jacket',11999,14],['Apparel','Classic Canvas Tote',3299,31],['Apparel','Merino Beanie',2999,22],
  ['Fitness','Cork Yoga Mat',6999,19],['Fitness','Steel Water Bottle',2199,45],['Fitness','Resistance Band Set',2699,25],['Fitness','Recovery Foam Roller',3799,17],
  ['Books','The Productive Day',1899,36],['Books','Designing Useful Things',2499,15],['Books','Kitchen Stories',3299,11],['Books','City Walks Guide',1999,0]
] as const;
async function main() {
  await prisma.cartItem.deleteMany(); await prisma.orderItem.deleteMany(); await prisma.order.deleteMany(); await prisma.cart.deleteMany(); await prisma.product.deleteMany(); await prisma.category.deleteMany(); await prisma.user.deleteMany();
  const categories = await Promise.all(['Electronics','Home','Apparel','Fitness','Books'].map(name => prisma.category.create({ data: { name, slug: name.toLowerCase() } })));
  const categoryByName = new Map(categories.map(category => [category.name, category.id]));
  await prisma.product.createMany({ data: catalog.map(([category, name, price, stock], index) => ({ name, price, stock, categoryId: categoryByName.get(category)!, description: `${name} is a dependable, thoughtfully designed product for everyday use.`, imageUrl: `https://images.unsplash.com/photo-${['1511707171634-5f897ff02aa9','1505740420928-5e560c06d30e','1484704849700-f032a568e944','1587829741301-dc798b83add3'][index % 4]}?auto=format&fit=crop&w=900&q=80` })) });
  const passwordHash = await bcrypt.hash('Password123!', 12);
  for (const user of [{ email: 'admin@qa-shop.local', firstName: 'Admin', lastName: 'User', role: Role.ADMIN }, { email: 'alice@qa-shop.local', firstName: 'Alice', lastName: 'Tester', role: Role.CUSTOMER }, { email: 'bob@qa-shop.local', firstName: 'Bob', lastName: 'Tester', role: Role.CUSTOMER }]) await prisma.user.create({ data: { ...user, passwordHash, cart: { create: {} } } });
}
main().finally(() => prisma.$disconnect());
