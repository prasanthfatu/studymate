import Form from "next/form";
import { Input } from "@/components/ui/input";
import { SearchButton } from "@/components/SearchButton";

export function TaskSearch(){
    return(
        <Form
            action='/tasks'
            className="flex gap-2 items-center"
        >
            <Input
                type="text"
                name="searchText"
                placeholder="Search Tasks"
                className="w-full"
            />
            <SearchButton />
        </Form>
    )
}