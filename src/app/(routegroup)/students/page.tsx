import { StudentSearch } from "@/app/(routegroup)/students/StudentSearch"
import { getStudentSearchResults } from "@/lib/queries/getStudentSearchResults"

export const metadate  = {
  title: "Student Search",
}

export default async function Students({
  searchParams
}: { searchParams: Promise<{[key: string]: string | undefined}> }) {
      const { searchText } = await searchParams
      if(!searchText) return <StudentSearch />

      const results = await getStudentSearchResults(searchText)

      return(
        <>
          <StudentSearch />
          <p>{JSON.stringify(results)}</p>
        </>
      )

  }
  