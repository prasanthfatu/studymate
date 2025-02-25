import Link from 'next/link'

export const metadata = {
    title: "Page Not Found",
  }
 
export default function NotFound() {
  return (
    <div className='mx-auto py-4 flex flex-col justify-center items-center gap-4'>
      <h2>Not Found</h2>
      <p>Could not find requested resource</p>
      <Link href="/">Return Home</Link>
    </div>
  )
}