'use client' // Error components must be Client Components
 
import ErrorPage from '@/components/common/error'
 
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  return (
    <ErrorPage error={error} reset={reset}/>
  )
}