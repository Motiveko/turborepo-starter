import dotenv from "dotenv";
import { runHealthChecker } from "@scheduler/health-check";

dotenv.config();

runHealthChecker();
