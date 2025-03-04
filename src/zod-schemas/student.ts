import { createInsertSchema, createSelectSchema } from 'drizzle-zod'
import { studentProfiles } from '@/db/schema'
import { z } from 'zod'

export const insertStudentSchema = createInsertSchema(studentProfiles, {
    studentId: z.coerce.number().int('Student ID must be an integer').positive('Student ID must be a positive number'),
    assignedTeacherId: z.coerce.number().int('Teacher ID must be an integer').positive('Teacher ID must be a positive number'),
    bio: z.string().min(1, 'Bio is required').max(500, 'Bio should not exceed 500 characters'),
    skills: z.string().min(1, 'Skills is required').max(300, 'Skills should not exceed 300 characters'),
    progress: z.enum(["NS", "IP", "C"]),
})

export const selectStudentSchema = createSelectSchema(studentProfiles)

export const insertStudentSchemaType = typeof insertStudentSchema._type

export const selectStudentSchemaType = typeof selectStudentSchema._type