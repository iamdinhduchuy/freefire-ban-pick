export function getJwtSecret() {
  return process.env.JWT_SECRET ?? "freefire-ban-pick-dev-jwt-secret";
}