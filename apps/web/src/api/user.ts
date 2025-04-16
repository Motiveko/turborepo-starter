import httpClient from "@web/lib/http";

export const logout = async () => await httpClient.post("/api/v1/auth/logout");
