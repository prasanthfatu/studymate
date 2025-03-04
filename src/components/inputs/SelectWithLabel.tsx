"use client"

import { FormField, FormItem, FormLabel, FormMessage, FormControl } from "@/components/ui/form"
import { useFormContext } from 'react-hook-form'
import { Select, SelectContent, SelectItem, SelectValue, SelectTrigger } from "@/components/ui/select"

type DataObj = {
    id: string,
    description: string
}

type Props<S> = {
    fieldTitle: string,
    nameInSchema: keyof S & string,
    data: DataObj[],
    className?: string,
    disabled? : boolean
}

export function SelectWithLabel<S>({
    fieldTitle, nameInSchema, data, className, disabled = false
}: Props<S>) {
    const form = useFormContext()
    return(
        <FormField
            control={form.control}
            name={nameInSchema}
            render={({field}) => (
                <FormItem>
                    <FormLabel
                        className="text-base"
                        htmlFor={nameInSchema}
                    >
                        {fieldTitle}
                    </FormLabel>
                    <Select
                        {...field}
                        onValueChange={field.onChange}
                    >
                        <FormControl>
                            <SelectTrigger
                            id={nameInSchema}
                            className={`w-full max-w-xs ${className}`}
                            >
                                <SelectValue placeholder='Select' />
                            </SelectTrigger>
                        </FormControl>

                            <SelectContent>
                                {data.map(item => (
                                    <SelectItem
                                        key={`${nameInSchema}_${item.id}`}
                                        value={item.id}
                                        disabled={disabled}
                                    >
                                        {item.description}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                    </Select>
                    <FormMessage />
                </FormItem>
            )}
        />
    )
}