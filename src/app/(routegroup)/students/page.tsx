import { StudentSearch } from "@/app/(routegroup)/students/StudentSearch"
import { getStudentSearchResults } from "@/lib/queries/getStudentSearchResults"
import  StudentTable  from '@/app/(routegroup)/students/StudentTable'

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
          {results.length ? <StudentTable data={results} /> : (
            <p className="mt-4">No results found</p>
          )}
        </>
      )

  }
  