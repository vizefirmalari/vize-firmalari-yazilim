import { deriveVisaRegions } from "./derive";

type Scenario = { name: string; input: string[]; expect: string[] };

const SCENARIOS: Scenario[] = [
  {
    name: "Almanya → Schengen",
    input: ["Almanya"],
    expect: ["Schengen Bölgesi"],
  },
  {
    name: "Fransa + İtalya + Hollanda → tek Schengen",
    input: ["Fransa", "İtalya", "Hollanda"],
    expect: ["Schengen Bölgesi"],
  },
  {
    name: "Kanada",
    input: ["Kanada"],
    expect: ["Kanada"],
  },
  {
    name: "Amerika → ABD",
    input: ["Amerika"],
    expect: ["ABD"],
  },
  {
    name: "İngiltere + İskoçya → İngiltere",
    input: ["İngiltere", "İskoçya"],
    expect: ["İngiltere"],
  },
  {
    name: "Dubai",
    input: ["Dubai"],
    expect: ["Dubai / BAE"],
  },
  {
    name: "BAE",
    input: ["Birleşik Arap Emirlikleri"],
    expect: ["Dubai / BAE"],
  },
  {
    name: "Almanya + Kanada + Dubai",
    input: ["Almanya", "Kanada", "Dubai"],
    expect: ["Schengen Bölgesi", "Kanada", "Dubai / BAE"],
  },
  {
    name: "İrlanda → Schengen yok",
    input: ["İrlanda"],
    expect: [],
  },
  {
    name: "İsviçre → Schengen",
    input: ["İsviçre"],
    expect: ["Schengen Bölgesi"],
  },
];

function sameLabels(a: string[], b: string[]): boolean {
  if (a.length !== b.length) return false;
  for (let i = 0; i < a.length; i++) {
    if (a[i] !== b[i]) return false;
  }
  return true;
}

/**
 * Geliştirme sırasında senaryoları doğrular; üretimde çağrılmaz.
 * `npm run build` öncesi manuel veya CI’da kullanılabilir.
 */
export function runDeriveVisaRegionsScenarios(): { ok: boolean; errors: string[] } {
  const errors: string[] = [];
  for (const s of SCENARIOS) {
    const got = deriveVisaRegions(s.input);
    if (!sameLabels(got, s.expect)) {
      errors.push(
        `[${s.name}] beklenen ${JSON.stringify(s.expect)} gelen ${JSON.stringify(got)}`
      );
    }
  }
  return { ok: errors.length === 0, errors };
}
