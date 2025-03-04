"use server"

import { eq } from "drizzle-orm"
import { flattenValidationErrors } from "next-safe-action"
import { redirect } from "next/navigation"

import { db } from "@/db"
import { studentProfiles } from "@/db/schema"
import { actionClient } from "@/lib/safe-action"
import { insertStudentSchema, insertStudentSchemaType } from "@/zod-schemas/student"

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"

export const saveStudentAction = actionClient
            .metadata({ actionName: 'saveStudentAction'})
            .schema(insertStudentSchema, {
                handleValidationErrorsShape: async (ve) => flattenValidationErrors(ve).fieldErrors,
            })
            .action(async ({
                parsedInput: student
            }: { parsedInput: insertStudentSchemaType}) => {

                const { isAuthenticated } = getKindeServerSession()

                const isAuth = await isAuthenticated()

                if(!isAuth) redirect('/login')

                //New Student
                if(student.id === 0){
                    const result = await db.insert(studentProfiles).values({
                        studentId: student.studentId,
                        assignedTeacherId: student.assignedTeacherId,
                        bio: student.bio,
                        skills: student.skills,
                        progress: student.progress
                    }).returning({insertedId: studentProfiles.id})
                    return { message: `Student ID ${result[0].insertedId} created successfully` }
                }

                //Existing Student
                const result = await db.update(studentProfiles)
                        .set({
                            studentId: student.studentId,
                            assignedTeacherId: student.assignedTeacherId,
                            bio: student.bio,
                            skills: student.skills,
                            progress: student.progress
                        })
                        .where(eq(studentProfiles.id, student.id!))
                        .returning({ updatedId: studentProfiles.id })
                        return { message: `Student ID ${result[0].updatedId} updated successfully` }
            })