// functions/_middleware.js
const USERNAME = "admin";        // Kendi kullanıcı adını yaz
const PASSWORD = "sifreni_buraya_yaz"; // Kendi şifreni yaz

function unauthorized() {
  return new Response("Giriş gerekli", {
    status: 401,
    headers: { "WWW-Authenticate": 'Basic realm="Korumali Alan"' },
  });
}

export const onRequest = async (context) => {
  const auth = context.request.headers.get("Authorization");
  if (!auth || !auth.startsWith("Basic ")) return unauthorized();

  const decoded = atob(auth.slice(6));
  const [user, pass] = decoded.split(":");

  if (user !== USERNAME || pass !== PASSWORD) return unauthorized();

  return context.next();
};