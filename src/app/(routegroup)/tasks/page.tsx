import { TaskSearch } from "@/app/(routegroup)/tasks/TaskSearch"
import { getOpenTasks } from "@/lib/queries/getOpenTasks"
import { getTaskSearchResults } from "@/lib/queries/getTaskSearchResults"

export const metadate  = {
  title: "Task Search",
}


export default async function Tickets({
  searchParams
}: { searchParams: Promise<{[key: string]: string | undefined}>}) {
      const {searchText} = await searchParams
      if(!searchText){
        const results = await getOpenTasks()
        console.log(results);
        
        return(
          <>
            <TaskSearch />
            <p>{JSON.stringify(results)}</p>
          </>
        )
      }

      const results = await getTaskSearchResults(searchText)
      console.log(results);
      
      return(
        <>
          <TaskSearch />
          <p>{JSON.stringify(results)}</p>
        </>
      )
  }
  