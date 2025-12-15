/*
 * Copyright 2025 Jtjr86
 *
 * Licensed under the Apache License, Version 2.0 (the \"License\");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *     http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an \"AS IS\" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */
import fs from "fs";
import path from "path";
import readline from "readline";
import { RPXEntry } from "./src/types";

const LOG_PATH = path.join(__dirname, "rpx-log.jsonl");

async function main() {
  if (!fs.existsSync(LOG_PATH)) {
    console.error("No RPX log file found at:", LOG_PATH);
    process.exit(1);
  }

  const stream = fs.createReadStream(LOG_PATH, { encoding: "utf8" });
  const rl = readline.createInterface({ input: stream, crlfDelay: Infinity });

  for await (const line of rl) {
    if (!line.trim()) continue;

    try {
      const entry = JSON.parse(line) as RPXEntry;

      console.log("────────────────────────────────────────");
      console.log("RPX ID:     ", entry.rpx_id);
      console.log("Created:    ", entry.created_at);
      console.log("Client:     ", entry.request.client_id);
      console.log("System:     ", entry.request.system_id);
      console.log("Action:     ", entry.request.action.type);
      console.log("Decision:   ", entry.decision.decision);
      console.log("Reason:     ", entry.decision.reason);
      console.log("Rules Eval: ", entry.decision.details.rules_evaluated.join(", ") || "-");
      console.log("Rules Hit:  ", entry.decision.details.rules_triggered.join(", ") || "-");
      console.log("Hash:       ", (entry as any).hash ? (entry as any).hash.substring(0, 16) + "..." : "(legacy entry)");
    } catch (e) {
      console.error("Failed to parse RPX line:", e);
    }
  }
}

main().catch((e) => {
  console.error("Unexpected error in view-rpx:", e);
});
