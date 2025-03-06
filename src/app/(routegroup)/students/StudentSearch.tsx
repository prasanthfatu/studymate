import { SearchButton } from "@/components/SearchButton";
import { Input } from "@/components/ui/input";
import Form from 'next/form'

export function StudentSearch(){
    return(
        <Form 
            action='/students'
            className="flex gap-2 items-center"
        >
            <Input
                type="text"
                name="searchText"
                placeholder="Search Students"
                className="w-full"
            />    
            <SearchButton />
        </Form>    
    )
}