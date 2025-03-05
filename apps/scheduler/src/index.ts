import { runHealthChecker } from "@scheduler/health-check";
import dotenv from "dotenv";

dotenv.config();

runHealthChecker();
