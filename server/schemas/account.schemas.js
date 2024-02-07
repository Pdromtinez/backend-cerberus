import { z } from "zod";

export const AccountCreateSchemas = (req, res, next) => {
    const accountCreateSchema = z.object({
  
      email: z
      .string({
        required_error: "email is required",
      })
      .email({
        required_error: "invalid email",
      }),
  
      password: z
        .string({
          required_error: "Password is required",
        })
        .min(10, {
          message: "Password must be at least 10 characters",
        }),
    });
  
    try {
      const validatedData = accountCreateSchema.parse(req.body);
      req.validatedData = validatedData;
      next();
    } catch (error) {
      res.status(400).json({ error: error.errors });
    }
  };