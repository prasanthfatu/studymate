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
    deadline: z.string().datetime().refine((date) => new Date(date) > new Date(), {
        message: "Deadline must be in the future"
    })
})

export const selectTaskSchema = createSelectSchema(tasks)

export const insertTaskSchemaType = typeof insertTaskSchema._type

export const selectTaskSchemaType = typeof selectTaskSchema._type