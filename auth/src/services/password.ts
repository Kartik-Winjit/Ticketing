import { scrypt, randomBytes } from "crypto";
import { promisify } from "util";

const scryptAsync = promisify(scrypt);
export class Password {
  static async toHash(password: String) {
    const salt = randomBytes(8).toString("hex");
    const buf = (await scryptAsync(Buffer.from(password), salt, 64)) as Buffer;

    return `${buf.toString("hex")}.${salt}`;
  }
  static async compare(storedPassword: string, suppliedPassword: string) {
    const [hashedPassword, salt] = storedPassword.split(".");
    const buf = (await scryptAsync(
      Buffer.from(suppliedPassword),
      salt,
      64
    )) as Buffer;

    return buf.toString("hex") === hashedPassword;
  }
}
