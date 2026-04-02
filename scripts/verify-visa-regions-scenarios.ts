import { runDeriveVisaRegionsScenarios } from "../lib/visa-regions/scenarios";

const { ok, errors } = runDeriveVisaRegionsScenarios();
if (!ok) {
  for (const e of errors) console.error(e);
  process.exit(1);
}
console.log("visa-regions senaryoları: OK");
