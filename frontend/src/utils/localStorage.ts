export function getTokenFromStorage(): string | null {
  return localStorage.getItem("userToken") ? localStorage.getItem("userToken") : null;
}
