import _default = require("@prisma/client");

const prisma = new _default.PrismaClient();

async function main() {
  const count = await prisma.entry.count();
  if (count > 0) {
    console.log("Seed skipped — entries already exist");
    return;
  }
  await prisma.entry.createMany({
    data: [
      {
        title: "Inception",
        type: "Movie",
        director: "Christopher Nolan",
        budget: "$160M",
        location: "Los Angeles, Paris",
        duration: "148 min",
        year_time: "2010",
      },
      {
        title: "Breaking Bad",
        type: "TV Show",
        director: "Vince Gilligan",
        budget: "$3M/ep",
        location: "Albuquerque",
        duration: "49 min/ep",
        year_time: "2008–2013",
      },
    ],
  });
  console.log("✅ Seed completed");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
