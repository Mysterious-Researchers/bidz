import z from "zod";

const auctionSchema = z.object({
  name: z.string(),
  startPrice: z.coerce
    .number({ description: "Input a price of your item" })
    .gt(0),
  stepPrice: z.coerce
    .number({ description: "Input a step price of your item" })
    .gt(0),
  endDate: z.coerce.date(),
  description: z.string(),
  photos: z.array(z.object({ link: z.string(), index: z.number() })),
});

const signupSchema = z
  .object({
    firstName: z.string(),
    middleName: z.string().optional(),
    lastName: z.string(),
    password: z.string().min(6),
    confirmPassword: z.string().min(6),
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
