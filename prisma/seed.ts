import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  const password = process.env.ADMIN_PASSWORD || ""; // fallback for safety
  const email = process.env.ADMIN_EMAIL || ""; // fallback for safety
  const name = process.env.ADMIN_NAME || ""; // fallback for safety

  const hashed = await bcrypt.hash(password, 10);

  await prisma.user.upsert({
    where: { email },
    update: {
      password: hashed,
    },
    create: {
      name,
      email,
      password: hashed,
      role: "ADMIN",
      img: null,
    },
  });

  console.log(`✅ Admin user is ready (email: ${email}, password: ${password})`);
}

main()
  .catch((e) => {
    console.error("❌ Error seeding admin:", e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
});
