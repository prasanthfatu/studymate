"use client"

import { useFormStatus } from "react-dom"
import { Button } from "@/components/ui/button"
import { LucideCircle } from "lucide-react"

export function SearchButton(){
    const status = useFormStatus()
    return(
        <Button
            type="submit"
            className="w-20"
            disabled={status.pending}
        >
            {status.pending ? (
                    <LucideCircle className="animate-spin" />
            ): "Search"}
        </Button>    
    )
}