export function getTokenFromStorage() {
  return localStorage.getItem("userToken") ? localStorage.getItem("userToken") : null;
}
