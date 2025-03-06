import { createInsertSchema, createSelectSchema } from "drizzle-zod";
import { tasks } from "@/db/schema";
import {z} from 'zod'

export const insertTaskSchema = createInsertSchema(tasks, {
    id: z.union([z.number(), z.literal("(New)")]),
    studentId: z.coerce.number().int('Student ID must be an integer').positive('Student ID must be a positive number'),
    teacherId: z.coerce.number().int('Teacher ID must be an integer').positive('Teacher ID must be a positive number'),
    title: z.string().min(3, 'Title must be at least 3 characters'),
    description: z.string().max(1000, "Description must not exceed 1000 characters").optional(),
    status: z.enum(["NS", "IP", "C"]),
    // deadline: z.string().datetime().refine((date) => new Date(date) > new Date(), {
    //     message: "Deadline must be in the future"
    // })
    // Validate deadline in DD-MM-YYYY format
    deadline: z.string()
        .regex(/^\d{2}-\d{2}-\d{4}$/, "Deadline must be in DD-MM-YYYY format")
        .refine((date) => {
            const [day, month, year] = date.split("-").map(Number);
            const parsedDate = new Date(year, month - 1, day); // Month is 0-based
            return parsedDate > new Date();
        }, { message: "Deadline must be in the future" })
})

export const selectTaskSchema = createSelectSchema(tasks)

export const insertTaskSchemaType = typeof insertTaskSchema._type

export const selectTaskSchemaType = typeof selectTaskSchema._type