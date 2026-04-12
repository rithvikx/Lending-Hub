import fs from "fs";
import path from "path";

export interface RelatedProduct {
  label: string;
  href: string;
}

export interface ProductData {
  badge: string;
  title: string;
  tagline: string;
  description: string;
  ctaLabel: string;
  ctaHref: string;
  features: string[];
  eligibility: string[];
  documents: string[];
  relatedProducts: RelatedProduct[];
}

export interface NavLink {
  href: string;
  label: string;
}

export interface NavConfig {
  loans: NavLink[];
  insurance: NavLink[];
}

/** Resolve path inside /public/cms-data */
function dataPath(category: string, slug: string) {
  return path.join(process.cwd(), "public", "cms-data", category, `${slug}.json`);
}

function navPath() {
  return path.join(process.cwd(), "public", "cms-data", "navigation.json");
}

/** Read product JSON — throws if slug not found */
export function readProductData(category: string, slug: string): ProductData {
  const filePath = dataPath(category, slug);
  const raw = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(raw) as ProductData;
}

/** Write product JSON — overwrites existing file */
export function writeProductData(
  category: string,
  slug: string,
  data: ProductData
): void {
  const filePath = dataPath(category, slug);
  // Ensure directory exists
  const dir = path.dirname(filePath);
  if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
  fs.writeFileSync(filePath, JSON.stringify(data, null, 2), "utf-8");
}

/** Read navigation config */
export function readNavigation(): NavConfig {
  try {
    const raw = fs.readFileSync(navPath(), "utf-8");
    return JSON.parse(raw) as NavConfig;
  } catch {
    // Fallback defaults
    return {
      loans: [
        { href: "/loans/personal-loan", label: "Personal Loan" },
        { href: "/loans/business-loan", label: "Business Loan" },
        { href: "/loans/loan-against-property", label: "Loan Against Property" },
        { href: "/loans/vehicle-loan", label: "Vehicle Loan" },
      ],
      insurance: [
        { href: "/insurance/car-insurance", label: "Car Insurance" },
        { href: "/insurance/bike-insurance", label: "Bike Insurance" },
        { href: "/insurance/health-insurance", label: "Health Insurance" },
        { href: "/insurance/life-insurance", label: "Life Insurance" },
      ],
    };
  }
}

/** Write navigation config */
export function writeNavigation(data: NavConfig): void {
  fs.writeFileSync(navPath(), JSON.stringify(data, null, 2), "utf-8");
}

/** Check if a product JSON file exists */
export function productExists(category: string, slug: string): boolean {
  return fs.existsSync(dataPath(category, slug));
}

/** List all products grouped by category */
export function listAllProducts(): {
  category: string;
  slug: string;
  title: string;
}[] {
  const base = path.join(process.cwd(), "public", "cms-data");
  const result: { category: string; slug: string; title: string }[] = [];

  for (const cat of ["loans", "insurance"]) {
    const catDir = path.join(base, cat);
    if (!fs.existsSync(catDir)) continue;
    const files = fs.readdirSync(catDir).filter((f) => f.endsWith(".json"));
    for (const file of files) {
      const slug = file.replace(".json", "");
      try {
        const data = readProductData(cat, slug);
        result.push({ category: cat, slug, title: data.title });
      } catch {
        result.push({ category: cat, slug, title: slug });
      }
    }
  }

  return result;
}
