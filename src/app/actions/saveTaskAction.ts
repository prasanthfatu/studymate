"use server"

import { insertTaskSchema, type insertTaskSchemaType } from "@/zod-schemas/task"
import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server"
import { actionClient } from "@/lib/safe-action"
import { flattenValidationErrors } from "next-safe-action"
import { redirect } from "next/navigation"
import { db } from "@/db"
import { tasks } from "@/db/schema"
import { eq } from "drizzle-orm"

export const saveTaskAction = actionClient
                .metadata({actionName: 'saveTaskAction'})
                .schema(insertTaskSchema, {
                    handleValidationErrorsShape: async(ve) => flattenValidationErrors(ve).fieldErrors,
                })
                .action(async({
                    parsedInput: task
                }: { parsedInput: insertTaskSchemaType }) => {

                    const { isAuthenticated } = getKindeServerSession()

                    const isAuth = await isAuthenticated

                    if(!isAuth) redirect('/login')
                    
                    //New Task
                    if(task.id === "(New)"){
                        const result = await db.insert(tasks).values({
                            title: task.title,
                            description: task.description,
                            tech: task.tech,
                            status: task.status,
                            deadline: task.deadline,
                            studentId: task.studentId,
                            teacherId: task.teacherId
                        }).returning({insertedId: tasks.id})
                        return { message: `Task ID ${result[0].insertedId} created successfully`}
                    }
                    
                    //Existing Task
                    const result = await db.update(tasks).set({
                        title: task.title,
                        description: task.description,
                        tech: task.tech,
                        status: task.status,
                        deadline: task.deadline,
                        studentId: task.studentId,
                        teacherId: task.teacherId
                    })
                    .where(eq(tasks.id, task.id))
                    .returning({updatedId: tasks.id})
                    return { message: `Task ID ${result[0].updatedId} updated successfully` }
                })