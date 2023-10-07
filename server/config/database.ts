import mongoose from "mongoose";
import chalk from "chalk";

const { MONGODB_URL } = process.env;

const connect = async () => {
  try {
    if (!MONGODB_URL) throw new Error("MONGODB_URL is not defined");
    await mongoose.connect(MONGODB_URL);
    console.log(chalk.green("✓") + chalk.blue("Database Connected!"));
  } catch (e) {
    console.log(chalk.red("✗") + chalk.blue("Database Connection Error!"));
    process.exit(1);
  }
};

connect();
