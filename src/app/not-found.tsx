import Link from 'next/link'

// TODO: Update page not found page

export default function NotFound() {
  return(
    <div>
      <h2>Not Found</h2>
      <p>Could not find requested resource</p>
      <Link href="/">Return Home</Link>
    </div>
  )
}