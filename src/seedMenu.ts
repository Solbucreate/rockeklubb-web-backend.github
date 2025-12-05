import Menu from "./models/model.menu";
import sequelize from "./config/db";

async function seedMenu() {
  await sequelize.authenticate();
  await sequelize.sync();

  const items = [
    { title: "Hjem", slug: "home", order: 1, visible: true },
    { title: "Om oss", slug: "om-oss", order: 2, visible: true },
    { title: "LR Frivillig", slug: "frivillig", order: 3, visible: true },
    { title: "Tidligere Artister", slug: "artister", order: 4, visible: true },
    { title: "Tech Spec / Utstyr", slug: "tech", order: 5, visible: true },
    { title: "Utleie", slug: "utleie", order: 6, visible: true }
  ];

  for (const item of items) {
    await Menu.findOrCreate({
      where: { slug: item.slug },
      defaults: item
    });
  }

  console.log("Menypunkter lagt inn.");
  process.exit();
}

seedMenu();
