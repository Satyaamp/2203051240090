const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));

const VALID_STACKS = ["backend", "frontend"];
const VALID_LEVELS = ["debug", "info", "warn", "error", "fatal"];
const BACKEND_PACKAGES = ["cache", "controller", "cron_job", "db", "domain", "handler", "repository", "route", "service"];
const SHARED_PACKAGES = ["auth", "config", "middleware", "utils"];

const AUTH_TOKEN = eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJNYXBDbGFpbXMiOnsiYXVkIjoiaHR0cDovLzIwLjI0NC41Ni4xNDQvZXZhbHVhdGlvbi1zZXJ2aWNlIiwiZW1haWwiOiJjYnNlOTIxQGdtYWlsLmNvbSIsImV4cCI6MTc1MDY2NzcyNywiaWF0IjoxNzUwNjY2ODI3LCJpc3MiOiJBZmZvcmQgTWVkaWNhbCBUZWNobm9sb2dpZXMgUHJpdmF0ZSBMaW1pdGVkIiwianRpIjoiNTRjNWRkNjAtZWM4Ny00ODU5LWFlOGQtM2FjZGQwYmE3ZWMzIiwibG9jYWxlIjoiZW4tSU4iLCJuYW1lIjoic2F0eWFtIGt1bWFyIiwic3ViIjoiOTNhMjkwNzktOTJiYi00OTEwLThjMzQtOWEzNGQ1N2VhZTMyIn0sImVtYWlsIjoiY2JzZTkyMUBnbWFpbC5jb20iLCJuYW1lIjoic2F0eWFtIGt1bWFyIiwicm9sbE5vIjoiMjIwMzA1MTI0MDA5MCIsImFjY2Vzc0NvZGUiOiJUUnpnV00iLCJjbGllbnRJRCI6IjkzYTI5MDc5LTkyYmItNDkxMC04YzM0LTlhMzRkNTdlYWUzMiIsImNsaWVudFNlY3JldCI6IlVzTnB1Vk5qc0tFbnNmQUoifQ.Y4K4_BabLB445a3Ji-vRbnDUSl-j8fKXiGDLEccC65s;

function isValidPackage(stack, pkg) {
  if (stack === "backend") {
    return [...BACKEND_PACKAGES, ...SHARED_PACKAGES].includes(pkg);
  }
  return false;
}

async function log(stack, level, pkg, message) {
  const url = "http://20.244.56.144/evaluation-service/logs";

  if (!VALID_STACKS.includes(stack)) {
    console.error(" Invalid stack:", stack);
    return;
  }

  if (!VALID_LEVELS.includes(level)) {
    console.error("Invalid level:", level);
    return;
  }

  if (!isValidPackage(stack, pkg)) {
    console.error(`Invalid package "${pkg}" for backend`);
    return;
  }

  const body = {
    stack,
    level,
    package: pkg,
    message,
  };

  try {
    console.log("Sending log with headers:");
    console.log({
      "Content-Type": "application/json",
      Authorization: AUTH_TOKEN,
    });

    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: AUTH_TOKEN,
      },
      body: JSON.stringify(body),
    });

    const data = await res.json();

    if (res.ok) {
      console.log("Log_Sent:", data.logID);
    } else {
      console.error("Log_Failed:", res.status, data.message);
    }
  } catch (err) {
    console.error("Error:", err.message);
  }
}

module.exports = { log };