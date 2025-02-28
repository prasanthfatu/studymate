import { getStudentProfile } from "@/lib/queries/getStudentProfile";
import { BackButton } from "@/components/BackButton";

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
        }else {
            //new student form component
        }
    } catch (error) {
        if(error instanceof Error)
            throw error
    }
}