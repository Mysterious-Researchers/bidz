import z from "zod";

const auctionSchema = z.object({
  title: z.string(),
  description: z.string(),
  price: z.coerce.number({ description: "Input a price of your item" }).gt(0),
  stepPrice: z.coerce
    .number({ description: "Input a price of your item" })
    .gt(0),
  endsAt: z.coerce.date(),
  photos: z.array(z.string()),
});

type TAuctionInput = z.infer<typeof auctionSchema>;

export { auctionSchema };
export type { TAuctionInput };
