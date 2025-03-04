import { getStudentProfile } from "@/lib/queries/getStudentProfile";
import { getTask } from "@/lib/queries/getTask";
import { BackButton } from "@/components/BackButton";
import TaskForm from "@/app/(routegroup)/tasks/form/TaskForm";

import { getKindeServerSession } from "@kinde-oss/kinde-auth-nextjs/server";
import { Users, init as KindeInit } from "@kinde/management-api-js"

export async function generateMetadata({
    searchParams,
}: { searchParams: Promise<{[key: string]: string | undefined}> }
) {
    const {studentId, taskId} = await searchParams
    if(!studentId && !taskId) return {
        title: `Missing Task ID or Student ID`
    }
    if(studentId) return {
        title: `New Task For Student ID ${studentId}`
    }
    if(taskId) return {
        title: `Edit Task ID ${taskId}`
    }
}

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

        const { getPermission, getUser } = getKindeServerSession()
        const [teacherPermission, user] = await Promise.all([
            getPermission('teacher'),
            getUser()
        ])
        const isTeacher = teacherPermission?.isGranted

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
            if(isTeacher){
                KindeInit() //Initialize the kinde management API
                const { users } = await Users.getUsers()
                const techs = users ? users.map(user => ({
                    id: user.email!, description: user.email!
                })) : []
                return <TaskForm student={student} techs = {techs} />
            } else {
                return <TaskForm student={student} />
            }
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
            if(isTeacher){
                const { users } = await Users.getUsers()
                const techs = users ? users.map(user => ({
                    id: user.email!, description: user.email!
                })) : []
                return <TaskForm task={task} student={student} techs={techs} />
            } else {
                const isEditable = user.email === task.tech
                console.log(`ue: ${user.email}`)
                console.log(`tech: ${task.tech}`)
                return <TaskForm task={task} student={student} isEditable={isEditable} />
            }
        }

    } catch (error) {
        if(error instanceof Error)
            throw error
    }
}