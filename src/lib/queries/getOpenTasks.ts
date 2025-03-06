import { db } from "@/db";
import { eq, inArray } from "drizzle-orm";
import { studentProfiles, tasks } from "@/db/schema";

export async function getOpenTasks(){
    const results = await db.select({
        taskDate: tasks.createdAt,
        title: tasks.title,
        studentId: studentProfiles.studentId,
        teacherId: studentProfiles.assignedTeacherId,
        tech: tasks.tech,
    })
    .from(tasks)
    .leftJoin(studentProfiles, eq(tasks.studentId, studentProfiles.studentId))
    .where(inArray(tasks.status, ['NS', 'IP']))

    return results
}
