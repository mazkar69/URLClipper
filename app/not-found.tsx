import Link from "next/link"
import { Button } from "@/components/ui/button"
import { LinkIcon } from "lucide-react"

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="text-center">
        <LinkIcon className="h-16 w-16 text-gray-400 mx-auto mb-4" />
        <h1 className="text-4xl font-bold text-gray-900 mb-4">404 - Not Found</h1>
        <p className="text-gray-600 mb-8">The shortened URL you're looking for doesn't exist or has been removed.</p>
        <Link href="/">
          <Button>Go Home</Button>
        </Link>
      </div>
    </div>
  )
}
