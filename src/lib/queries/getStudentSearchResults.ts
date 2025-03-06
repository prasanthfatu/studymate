import { db } from "@/db";
import { studentProfiles } from "@/db/schema";
import { ilike, or, sql } from "drizzle-orm";

export async function getStudentSearchResults(searchText: string){
    const results = await db.select()
            .from(studentProfiles)
            .where(or(
                ilike(sql`CAST(${studentProfiles.studentId} AS TEXT)`, `%${searchText}%`),
                ilike(sql`CAST(${studentProfiles.assignedTeacherId} AS TEXT)`, `%${searchText}%`),
                ilike(studentProfiles.bio, `%${searchText}%`),
                ilike(studentProfiles.skills, `%${searchText}%`),
                ilike(studentProfiles.progress, `%${searchText}%`),
            ))
    return results        
}