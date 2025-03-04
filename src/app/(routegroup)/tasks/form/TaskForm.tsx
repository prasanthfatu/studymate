"use client"

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { insertTaskSchema, type insertTaskSchemaType, type selectTaskSchemaType } from "@/zod-schemas/task";
import { selectStudentSchemaType } from "@/zod-schemas/student";

import { InputWithLabel } from "@/components/inputs/InputWithLabel";
import { TextAreaWithLabel } from "@/components/inputs/TextAreaWithLabel";
import { SelectWithLabel } from "@/components/inputs/SelectWithLabel";
import { ProgressArray } from "@/constants/ProgressArray";

type Props = {
    student: selectStudentSchemaType,
    task? : selectTaskSchemaType,
    techs? : {
        id: string,
        description: string
    }[],
    isEditable? : boolean,
}

export default function TaskForm({student, task, techs, isEditable = true }: Props){

    const isTeacher = Array.isArray(techs)    

    const defaultValues: insertTaskSchemaType = {
        id: task?.id ?? "(New)",
        title: task?.title ?? '',
        description: task?.description ?? '',
        status: task?.status ?? 'NS',
        deadline: task?.deadline ?? '',
        studentId: task?.studentId ?? student.studentId,
        teacherId: task?.teacherId ?? student.assignedTeacherId,
        tech: task?.tech ?? 'new-task@example.com'
    }
    const form = useForm<insertTaskSchemaType>({
        mode: "onBlur",
        resolver: zodResolver(insertTaskSchema),
        defaultValues,
    })
    async function SubmitForm(data: insertTaskSchemaType){
        console.log(data);        
    }
    return(
        <div className="flex flex-col gap-1 sm: px-8">
            <div>
                <h2 className="text-2xl font-bold">
                    {task?.id && isEditable ?
                                `Edit Tast ID ${task.id}`
                                : task?.id
                                    ? `View Ticket ID ${task.id}`
                                    : 'New Task Form'
                    }
                </h2>
                <Form {...form}>
                    <form
                        onSubmit={form.handleSubmit(SubmitForm)}
                        className="flex flex-col md:flex-row gap-4 md:gap-8"
                        >
                            <div className="flex flex-col gap-4 w-full max-w-xs">
                                <InputWithLabel<insertTaskSchemaType>
                                    fieldTitle='Title'
                                    nameInSchema="title"
                                    disabled={!isEditable}
                                />
                                {isTeacher ? (
                                    <SelectWithLabel<insertTaskSchemaType>
                                        fieldTitle="Tech ID"
                                        nameInSchema="tech"
                                        data={[
                                            {id: 'new-task@example.com', description: 'new-task@example.com'}, ...techs
                                        ]}
                                    /> 
                                    ) : (
                                        <InputWithLabel<insertTaskSchemaType>
                                            fieldTitle="Tech"
                                            nameInSchema="tech"
                                            disabled={true}
                                        />    
                                    )   
                                }
                                {task?.id ? (
                                    <SelectWithLabel<insertTaskSchemaType>
                                        fieldTitle = 'Status'
                                        nameInSchema = 'status'
                                        data = {ProgressArray}
                                        disabled={!isEditable}
                                    />
                                ) : null}
                                <InputWithLabel<insertTaskSchemaType>
                                    fieldTitle = 'Deadline'
                                    nameInSchema = 'deadline'
                                    disabled={!isEditable}
                                />            
                                <InputWithLabel<insertTaskSchemaType>
                                    fieldTitle = 'Student ID'
                                    nameInSchema = 'studentId'
                                    disabled={!isEditable}
                                />            
                                <InputWithLabel<insertTaskSchemaType>
                                    fieldTitle = 'Teacher ID'
                                    nameInSchema = 'teacherId'
                                    disabled={!isEditable}
                                /> 

                                <div className="mt-4 space-y-2">
                                    <h3>Student Details</h3>
                                    <hr className="w-4/5" />
                                    <p>Student ID : {student.studentId}</p>
                                    <p>Teacher ID : {student.assignedTeacherId}</p>
                                    <p>Bio : {student.bio}</p>
                                    <p>Skills : {student.skills}</p>
                                    <p>Progress : {student.progress}</p>
                                </div>

                            </div> 
                            <div className="flex flex-col gap-4 w-full max-w-xs">
                                <TextAreaWithLabel<insertTaskSchemaType>
                                    fieldTitle = 'Description'
                                    nameInSchema = 'description'
                                    className="h-96"
                                    disabled={!isEditable}
                                />

                                { isEditable ? (
                                    <div className="flex gap-2">
                                        <Button
                                            type="submit"
                                            className="w-3/4"
                                            variant='default'
                                            title="Save"
                                        >
                                            Save
                                        </Button>
                                        <Button
                                            type="button"
                                            variant='destructive'
                                            title="Reset"
                                            onClick={() => form.reset(defaultValues)}
                                        >
                                            Reset
                                        </Button>
                                    </div>
                                ) : null }
                            </div>   
                    </form>
                </Form>
            </div>
        </div>
    )
}