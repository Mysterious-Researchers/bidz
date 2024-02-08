import z from "zod";

const createAuctionSchema = z.object({
  title: z.string(),
  description: z.string(),
  price: z.coerce.number(),
  endsAt: z.coerce.date(),
});

type TCreateAuctionInput = z.infer<typeof createAuctionSchema>;

export { createAuctionSchema };
export type { TCreateAuctionInput };
