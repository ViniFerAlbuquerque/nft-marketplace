
import { http, passthrough } from "msw";

export const passthroughHandlers = [
  http.get("https://picsum.photos/*", () => {
    return passthrough();
  }),
];
