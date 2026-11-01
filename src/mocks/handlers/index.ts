
import { orderHandlers } from "./orders";
import { passthroughHandlers } from "./passthrough";

export const handlers = [
  ...orderHandlers,
  ...passthroughHandlers,
];