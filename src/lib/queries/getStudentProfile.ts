import {db} from '@/db'
import { studentProfiles } from '@/db/schema'
import { eq } from 'drizzle-orm' 

export async function getStudentProfile(id: number){
    const studentProfile = await db.select()
                    .from(studentProfiles)
                    .where(eq(studentProfiles.id, id))
    return studentProfile[0]                
}