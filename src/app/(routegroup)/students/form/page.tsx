import { getStudentProfile } from "@/lib/queries/getStudentProfile";
import { BackButton } from "@/components/BackButton";
import StudentForm from "@/app/(routegroup)/students/form/StudentForm";

export async function generateMetadata({
    searchParams,
}: {
    searchParams: Promise<{[key: string]: string | undefined}>
}) {
    const {studentId} = await searchParams
    if(!studentId) return { title : 'New Student' }
    return { title : `Edit Student ${studentId}` }
}

export default async function StudentFormPage({
    searchParams,
}: {
    searchParams: Promise<{[key: string]: string | undefined}>
}) {
    try {
        const {studentId} = await searchParams
        //Edit student profile form
        if(studentId){
            const student = await getStudentProfile(parseInt(studentId))
            if(!student){
                return(
                    <>
                        <h2>Student Profile ID {studentId} Not Found.</h2>
                        <BackButton title="Go Back" variant="default" />
                    </>
                )
            }
            console.log(student)
            //put student form component
            return <StudentForm student={student} />
        }else {
            //new student form component
            return <StudentForm />
        }
    } catch (error) {
        if(error instanceof Error)
            throw error
    }
}