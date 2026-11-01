
import { http, HttpResponse } from "msw";

export const orderHandlers = [
  http.get("/api/health", () => {
    return HttpResponse.json({
      status: "ok",
      service: "KURIO Mock API",
    });
  }),
];
