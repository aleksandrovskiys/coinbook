export function getTokenFromStorage(): string | null {
  return localStorage.getItem("userToken") || null;
}
