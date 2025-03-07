import { db } from "@/db";
import { studentProfiles, tasks } from "@/db/schema";
import { eq, ilike, or,sql, asc } from "drizzle-orm";

export async function getTaskSearchResults(searchText: string){
    const results = await db.select({
        id: tasks.id,
        taskDate: tasks.createdAt,
        title: tasks.title,
        studentId: studentProfiles.studentId,
        teacherId: studentProfiles.assignedTeacherId,
        tech: tasks.tech,
        status: tasks.status,
    })
    .from(tasks)
    .leftJoin(studentProfiles, eq(tasks.studentId, studentProfiles.studentId))
    .where(or(
        ilike(tasks.title, `%${searchText}%`),
        ilike(tasks.tech, `%${searchText}%`),
        ilike(sql`CAST(${studentProfiles.studentId} AS TEXT)`, `%${searchText}%`),
        ilike(sql`CAST(${studentProfiles.assignedTeacherId} AS TEXT)`, `%${searchText}%`),
        ilike(studentProfiles.bio, `%${searchText}%`),
        ilike(studentProfiles.skills, `%${searchText}%`),
        ilike(studentProfiles.progress, `%${searchText}%`),
    ))
    .orderBy(asc(tasks.createdAt))

    return results
}

export type TaskSearchResultsType = Awaited<ReturnType<typeof getTaskSearchResults>>