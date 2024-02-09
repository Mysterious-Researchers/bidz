import z from "zod";

const auctionSchema = z.object({
  title: z.string(),
  description: z.string(),
  price: z.coerce.number({ description: "Input a price of your item" }).gt(0),
  stepPrice: z.coerce
    .number({ description: "Input a step price of your item" })
    .gt(0),
  endsAt: z.coerce.date(),
  photos: z.array(z.string()),
});

const signupSchema = z
  .object({
    password: z.string().min(6),
    confirmPassword: z.string().min(6),
    nickname: z.string(),
    email: z.string().email(),
  })
  .superRefine(({ confirmPassword, password }, refinementContext) => {
    if (password !== confirmPassword) {
      return refinementContext.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Passwords do not match",
        path: ["confirmPassword"],
      });
    }
  });

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string(),
});

type TAuctionInput = z.infer<typeof auctionSchema>;
type TSignupInput = z.infer<typeof signupSchema>;
type TLoginInput = z.infer<typeof loginSchema>;

export { auctionSchema, loginSchema, signupSchema };
export type { TAuctionInput, TSignupInput, TLoginInput };
