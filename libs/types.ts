import { AuthController } from "../apps/api/src/api/auth/auth.controller";
import { AuctionController } from "../apps/api/src/api/auction/auction.controller";
import { PhotoController } from "../apps/api/src/api/photo/photo.controller";

import { ExtractClassMethodReturnTypes } from "./util-types";

type TAuthEndpoints = ExtractClassMethodReturnTypes<
  typeof AuthController.prototype
>;

type TAuctionEndpoints = ExtractClassMethodReturnTypes<
  typeof AuctionController.prototype
>;

type TPhotoEndpoints = ExtractClassMethodReturnTypes<
  typeof PhotoController.prototype
>;

export type { TAuthEndpoints, TAuctionEndpoints, TPhotoEndpoints };
