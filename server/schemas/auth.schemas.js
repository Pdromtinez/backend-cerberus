import { z } from "zod";


export const registerSchemas = (req, res, next) => {
  const schema = z.object({
    profile_img: z
      .string({
        required_error: "image is required",
      }),

    user_name: z
      .string({
        required_error: "User name is required",
      }),

    user_email: z
      .string({
        required_error: "email is required",
      })
      .email({
        required_error: "invalid email",
      }),

    user_password: z
      .string({
        required_error: "password is required",
      })
      .min(6, {
        message: "password must be at least 6 characters",
      }),
  });

  try {
    
    const validatedData = schema.parse(req.body);

    
    req.validatedData = validatedData;

    
    next();
  } catch (error) {
    
    res.status(400).json({ error: error.errors });
  }
};


  export const loginSchemas = (req, res, next) => {
    const loginSchema = z.object({
      user_email: z
        .string({
          required_error: "Email is required",
        })
        .email({
          required_error: "Invalid email",
        }),
  
      user_password: z
        .string({
          required_error: "Password is required",
        })
        .min(6, {
          message: "Password must be at least 6 characters",
        }),
    });
  
    try {
      const validatedData = loginSchema.parse(req.body);
      req.validatedData = validatedData;
      next();
    } catch (error) {
      res.status(400).json({ error: error.errors });
    }
  };