import { db } from "@/db";
import { eq, inArray, asc } from "drizzle-orm";
import { studentProfiles, tasks } from "@/db/schema";

export async function getOpenTasks(){
    const results = await db.select({
        id:tasks.id,
        taskDate: tasks.createdAt,
        title: tasks.title,
        studentId: studentProfiles.studentId,
        teacherId: studentProfiles.assignedTeacherId,
        tech: tasks.tech,
        status: tasks.status,
    })
    .from(tasks)
    .leftJoin(studentProfiles, eq(tasks.studentId, studentProfiles.studentId))
    .where(inArray(tasks.status, ['NS', 'IP']))
    .orderBy(asc(tasks.createdAt))

    return results
}
