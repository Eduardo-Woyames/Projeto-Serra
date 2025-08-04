import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const passwordHash = await bcrypt.hash('123456', 10);

  await prisma.user.create({
    data: {
      email: 'admin@deezer.com',
      password: passwordHash,
    },
  });

  console.log('Seed finalizado.');
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect());
