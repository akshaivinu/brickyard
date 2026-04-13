import { createHmac, pbkdf2Sync, randomBytes, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

const SESSION_COOKIE_NAME = "brickyard_session";
const DUMMY_USER_COOKIE_NAME = "brickyard_dummy_user";

const PASSWORD_ITERATIONS = 210_000;
const PASSWORD_KEY_LENGTH = 32;
const SESSION_MAX_AGE_SECONDS = 60 * 60 * 12;
const DUMMY_USER_MAX_AGE_SECONDS = 60 * 60 * 24 * 30;

const DEFAULT_DEMO_EMAIL = "demo@studio.test";
const DEFAULT_DEMO_PASSWORD = "DemoPass123!";
const DEFAULT_DEMO_NAME = "Demo User";

type SessionPayload = {
  v: 1;
  email: string;
  name: string;
  iat: number;
  exp: number;
};

type DummyUserPayload = {
  v: 1;
  email: string;
  name: string;
  salt: string;
  passwordHash: string;
};

type AuthUser = {
  email: string;
  name: string;
};

function getCookieOptions(maxAge: number) {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    maxAge,
  };
}

function toBase64Url(input: string) {
  return Buffer.from(input, "utf8").toString("base64url");
}

function fromBase64Url(input: string) {
  return Buffer.from(input, "base64url").toString("utf8");
}

function getAuthSecret() {
  return (
    process.env.DUMMY_AUTH_SECRET ??
    process.env.AUTH_SECRET ??
    "dev-only-secret-change-before-production"
  );
}

function sign(payloadBase64Url: string) {
  return createHmac("sha256", getAuthSecret())
    .update(payloadBase64Url)
    .digest("base64url");
}

function safeEqualString(left: string, right: string) {
  const leftBuffer = Buffer.from(left, "utf8");
  const rightBuffer = Buffer.from(right, "utf8");

  if (leftBuffer.length !== rightBuffer.length) {
    return false;
  }

  return timingSafeEqual(leftBuffer, rightBuffer);
}

function encodeSignedPayload(payload: SessionPayload | DummyUserPayload) {
  const payloadBase64Url = toBase64Url(JSON.stringify(payload));
  const signature = sign(payloadBase64Url);
  return `${payloadBase64Url}.${signature}`;
}

function decodeSignedPayload<T>(token: string): T | null {
  const [payloadBase64Url, signature] = token.split(".");
  if (!payloadBase64Url || !signature) {
    return null;
  }

  const expectedSignature = sign(payloadBase64Url);
  if (!safeEqualString(signature, expectedSignature)) {
    return null;
  }

  try {
    return JSON.parse(fromBase64Url(payloadBase64Url)) as T;
  } catch {
    return null;
  }
}

function hashPassword(password: string, salt: string) {
  return pbkdf2Sync(
    password,
    salt,
    PASSWORD_ITERATIONS,
    PASSWORD_KEY_LENGTH,
    "sha512",
  ).toString("base64url");
}

export async function registerDummyUser(user: {
  email: string;
  name: string;
  password: string;
}) {
  const cookieStore = await cookies();
  const salt = randomBytes(16).toString("base64url");
  const payload: DummyUserPayload = {
    v: 1,
    email: user.email.toLowerCase(),
    name: user.name,
    salt,
    passwordHash: hashPassword(user.password, salt),
  };

  cookieStore.set(
    DUMMY_USER_COOKIE_NAME,
    encodeSignedPayload(payload),
    getCookieOptions(DUMMY_USER_MAX_AGE_SECONDS),
  );
}

export async function verifyDummyLogin(email: string, password: string): Promise<AuthUser | null> {
  const cookieStore = await cookies();
  const normalizedEmail = email.toLowerCase();
  const storedToken = cookieStore.get(DUMMY_USER_COOKIE_NAME)?.value;

  if (storedToken) {
    const payload = decodeSignedPayload<DummyUserPayload>(storedToken);
    if (!payload || payload.v !== 1) {
      return null;
    }

    if (!safeEqualString(payload.email, normalizedEmail)) {
      return null;
    }

    const computedHash = hashPassword(password, payload.salt);
    if (!safeEqualString(payload.passwordHash, computedHash)) {
      return null;
    }

    return { email: payload.email, name: payload.name };
  }

  const demoEmail = (process.env.DUMMY_AUTH_EMAIL ?? DEFAULT_DEMO_EMAIL).toLowerCase();
  const demoPassword = process.env.DUMMY_AUTH_PASSWORD ?? DEFAULT_DEMO_PASSWORD;
  const demoName = process.env.DUMMY_AUTH_NAME ?? DEFAULT_DEMO_NAME;

  if (!safeEqualString(normalizedEmail, demoEmail)) {
    return null;
  }

  if (!safeEqualString(password, demoPassword)) {
    return null;
  }

  return { email: demoEmail, name: demoName };
}

export async function createSession(user: AuthUser) {
  const cookieStore = await cookies();
  const issuedAt = Math.floor(Date.now() / 1000);
  const payload: SessionPayload = {
    v: 1,
    email: user.email.toLowerCase(),
    name: user.name,
    iat: issuedAt,
    exp: issuedAt + SESSION_MAX_AGE_SECONDS,
  };

  cookieStore.set(
    SESSION_COOKIE_NAME,
    encodeSignedPayload(payload),
    getCookieOptions(SESSION_MAX_AGE_SECONDS),
  );
}

export async function getSession() {
  const cookieStore = await cookies();
  const token = cookieStore.get(SESSION_COOKIE_NAME)?.value;
  if (!token) {
    return null;
  }

  const payload = decodeSignedPayload<SessionPayload>(token);
  if (!payload || payload.v !== 1) {
    return null;
  }

  const now = Math.floor(Date.now() / 1000);
  if (payload.exp <= now) {
    return null;
  }

  return { email: payload.email, name: payload.name };
}

export async function clearSession() {
  const cookieStore = await cookies();
  cookieStore.delete(SESSION_COOKIE_NAME);
}
