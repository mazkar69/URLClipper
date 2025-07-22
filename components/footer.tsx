import { LinkIcon } from "lucide-react"

export function Footer() {
  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="flex items-center justify-center mb-8">
          <LinkIcon className="h-8 w-8 text-blue-400 mr-2" />
          <span className="text-2xl font-bold">URLCliper</span>
        </div>

        <div className="text-center">
          <p className="text-gray-400">© {new Date().getFullYear()} URLCliper. All rights reserved.</p>
          <p className="text-gray-400 mt-2">A clean, fast, and secure URL shortening platform.</p>
          <p className="text-gray-400 mt-4">
            Made by{" "}
            <a 
              href="https://github.com/mazkar69" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-300 transition-colors font-medium"
            >
              AzKaaR  
            </a>
             {" "} with ❤️ 
          </p>
        </div>
      </div>
    </footer>
  )
}
