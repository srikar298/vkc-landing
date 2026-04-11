import { db } from "./index";
import { seedIAM } from "./seeds/iam.seed";
import { seedMembers } from "./seeds/members.seed";

async function main() {
  console.log("🌱 Starting Global Seeding Orchestrator...");

  try {
    // Phase 1: IAM (Base for everything)
    console.log("\n[1/2] Seeding IAM Module...");
    await seedIAM(db);

    // Phase 2: Members
    console.log("\n[2/2] Seeding Members Module...");
    await seedMembers(db);

    console.log("\n✅ Global Seeding Completed Successfully.");
    process.exit(0);
  } catch (err) {
    console.error("\n❌ Seeding Failed:", err);
    process.exit(1);
  }
}

main();
