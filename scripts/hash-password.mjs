// Usage: npm run hash-password -- "your-password"
import bcrypt from "bcryptjs";

const password = process.argv[2];
if (!password) {
  console.error('Usage: npm run hash-password -- "your-password"');
  process.exit(1);
}

const hash = await bcrypt.hash(password, 12);
// Next.js expands "$VAR" in .env files, so every "$" in the hash must be escaped.
console.log("Add this line to your .env file:\n");
console.log(`ADMIN_PASSWORD_HASH="${hash.replaceAll("$", "\\$")}"`);
