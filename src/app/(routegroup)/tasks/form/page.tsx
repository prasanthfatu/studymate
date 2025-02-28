import { getStudentProfile } from "@/lib/queries/getStudentProfile";
import { getTask } from "@/lib/queries/getTask";
import { BackButton } from "@/components/BackButton";

export default async function TaskFormPage({
    searchParams,
}: { searchParams: Promise<{[key: string]: string | undefined}> }
) {
    try {
        const {studentId, taskId} = await searchParams
        if(!studentId && !taskId){
            return(
                <>
                    <h2>Student ID or Task ID required to load task form.</h2>
                    <BackButton title="Go Back" variant="default" />
                </>
            )
        }
        //new task form
        if(studentId){
            const student = await getStudentProfile(parseInt(studentId))
            if(!student){
                return(
                    <>
                        <h2>Student ID {studentId} Not Found.</h2>
                        <BackButton title="Go Back" variant="default" />
                    </>
                )
            }
            //return task form
            console.log(student);
        }
        if(taskId){
            const task = await getTask(parseInt(taskId))
            if(!task){
                return(
                    <>
                        <h2>Task ID {taskId} Not Found. </h2>
                        <BackButton title="Go Back" variant="default" />
                    </>
                )
            }
            const student = await getStudentProfile(task.studentId)
            //return task form
            console.log('task', task);
            console.log('student', student);
            
        }
    } catch (error) {
        if(error instanceof Error)
            throw error
    }
}