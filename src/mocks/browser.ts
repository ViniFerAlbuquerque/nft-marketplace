import { setupWorker } from "msw/browser";
import { handlers } from "./handlers";

export const worker = setupWorker(...handlers);

// import { setupWorker } from "msw/browser";
// import { handlers } from "./handlers";

// export const worker = setupWorker(...handlers, {
//   onUnhandledRequest(request, print) {
//     const url = new URL(request.url);

//     if (
//       url.origin === "https://picsum.photos" ||
//       url.origin === window.location.origin
//     ) {
//       return;
//     }

//     print.warning();
//   },
// });

