"use client"

import { Button } from "@/components/ui/button"
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from "react-hook-form"
import { Form } from "@/components/ui/form"
import { ProgressArray } from "@/constants/ProgressArray"

import { InputWithLabel } from "@/components/inputs/InputWithLabel"
import { TextAreaWithLabel } from "@/components/inputs/TextAreaWithLabel"
import { SelectWithLabel } from "@/components/inputs/SelectWithLabel"

import { useKindeBrowserClient } from '@kinde-oss/kinde-auth-nextjs'

import { insertStudentSchema, type insertStudentSchemaType, type selectStudentSchemaType } from "@/zod-schemas/student"

import { useAction } from 'next-safe-action/hooks'
import { saveStudentAction } from "@/app/actions/saveStudentAction"

import { toast } from "sonner"
import { LoaderCircle } from "lucide-react"
import { DisplayServerActionResponse } from "@/components/DisplayServerActionResponse"

type Props = {
    student?: selectStudentSchemaType,
}

export default function StudentForm({student}: Props){
    const { getPermission, isLoading } = useKindeBrowserClient()
    const isTeacher = !isLoading && getPermission('teacher')?.isGranted

    const isValidProgress = (value: any): value is "NS" | "IP" | "C" => {
        return ["NS", "IP", "C"].includes(value);
    };    

    const defaultValues: insertStudentSchemaType = {
        id: student?.id ?? Number(0),
        studentId: student?.studentId ?? Number(0),
        assignedTeacherId: student?.assignedTeacherId ?? Number(0),
        bio: student?.bio ?? '',
        skills: student?.skills ?? '',
        progress: isValidProgress(student?.progress) ? student.progress : "NS"
    }
    const form = useForm<insertStudentSchemaType>({
        mode: 'onBlur',
        resolver: zodResolver(insertStudentSchema),
        defaultValues,
    })

    const {
        execute: executeSave,
        result: saveResult,
        isPending: isSaving,
        reset: resetSaveAction
    } = useAction(saveStudentAction, {
        onSuccess({data}){
            if(data?.message){
            toast.message('Success! 🎉', {
                description: data?.message ?? 'Student saved successfully!',
            })
        }
        },
        onError({error}){
            toast.error('Error', {
                description: 'Save Failed',
            });
        }
    })

    async function SubmitForm(data: insertStudentSchemaType){
        // console.log(data)
        executeSave(data)
    }
    return(
        <div className="flex flex-col gap-1 sm:px-8">
            <DisplayServerActionResponse result={saveResult} />
            <div>
                <h2 className="text-2xl font-bold">
                    {student?.id ? "Edit" : "New"} Student Form
                </h2>                
            </div>
            <Form {...form}>
                <form
                    onSubmit={form.handleSubmit(SubmitForm)}
                    className="flex flex-col md:flex-row gap-4 md:gap-8"
                >
                    <div className="flex flex-col gap-4 w-full max-w-xs">
                        <InputWithLabel<insertStudentSchemaType>
                            fieldTitle='Student ID'
                            nameInSchema="studentId"
                        />
                        <InputWithLabel<insertStudentSchemaType>
                            fieldTitle='Assigned Teacher ID'
                            nameInSchema="assignedTeacherId"
                        />
                        <TextAreaWithLabel<insertStudentSchemaType>
                            fieldTitle=  "Bio"
                            nameInSchema = "bio"
                            className="h-40"
                        />
                        <InputWithLabel<insertStudentSchemaType>
                            fieldTitle='Skills'
                            nameInSchema="skills"
                        />
                    </div>
                    <div className="flex flex-col gap-4 w-full max-w-xs">
                        <SelectWithLabel<insertStudentSchemaType>
                            fieldTitle="Progress"
                            nameInSchema="progress"
                            data={ProgressArray}
                        />
                        <div className="flex gap-2">
                            <Button
                                type="submit"
                                className="w-3/4"
                                variant='default'
                                title="Save"
                                disabled={isSaving}
                            >
                                {isSaving ? (
                                    <>
                                        <LoaderCircle className="animate-spin" />Saving
                                    </>
                                ) : "Save"}
                            </Button>
                            <Button
                                type="button"
                                variant='destructive'
                                title="Reset"
                                onClick={() => {
                                    form.reset(defaultValues)
                                    resetSaveAction()
                                }}
                            >
                                Reset
                            </Button>
                        </div>
                    </div>
                </form>
            </Form>
        </div>
    )
}