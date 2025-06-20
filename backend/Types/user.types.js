import zod from 'zod';

const userCheckSchema = zod.object({
    username: zod.string(),
    password: zod.string(),
    firstName: zod.string(),
    lastName: zod.string(),
});

export const userCheck = (req,res,next) => {
    const paylod = req.body;
    const result = userCheckSchema.safeParse(paylod);
    if (!result.success) {
        return res.status(400).json({ message: "Invalid input", errors: result.error.errors });
    }
    next();
}

const userUpdateSchema = zod.object({
    username: zod.string().optional(),
    firstName: zod.string().optional(),
    lastName: zod.string().optional(),
    password: zod.string().min(6).optional(),
});

export const userUpdateCheck = (req, res, next) => {
    const payload = req.body;
    const result = userUpdateSchema.safeParse(payload);
    if (!result.success) {
        return res.status(400).json({ message: "Invalid input", errors: result.error.errors });
    }
    next();
}