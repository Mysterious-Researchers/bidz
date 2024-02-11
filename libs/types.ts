import { AuthController } from "../apps/api/src/api/controllers/auth.controller";
import { AuctionController } from "../apps/api/src/api/controllers/auction.controller";

import { ExtractClassMethodReturnTypes } from "./util-types";

type TAuthEndpoints = ExtractClassMethodReturnTypes<
  typeof AuthController.prototype
>;

type TAuctionEndpoints = ExtractClassMethodReturnTypes<
  typeof AuthController.prototype
>;

export type { TAuthEndpoints, TAuctionEndpoints };
