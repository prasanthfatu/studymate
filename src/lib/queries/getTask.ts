import { db } from "@/db";
import { tasks } from "@/db/schema";
import {eq} from "drizzle-orm"

export async function getTask(id: number){
    const task = await db.select()
                    .from(tasks)
                    .where(eq(tasks.id, id))

    return task[0]                
}