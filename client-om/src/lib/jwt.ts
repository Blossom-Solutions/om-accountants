import jwt_decode from "jwt-decode";

export interface JwtPayload {
  email: string;
  role: string;
  exp: number;
  iat: number;
  sub: number;
}

export const getJwtPayload = (): JwtPayload | null => {
  const token = localStorage.getItem("jwtToken");
  if (!token) return null;

  try {
    const payload = jwt_decode<JwtPayload>(token);
    return payload;
  } catch (error) {
    console.error("Error decoding JWT token:", error);
    return null;
  }
};
