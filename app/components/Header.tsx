import { GraduationCapIcon as Graduation } from "lucide-react"
import Link from "next/link"

export default function Header() {
  return (
    <header className="bg-ucsc-blue bg-opacity-90 text-white py-4 shadow-md">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <Graduation className="mr-2 text-ucsc-gold" />
          <h1 className="text-2xl font-bold">UCSC Course Planner</h1>
        </Link>
        <nav>
          <ul className="flex space-x-4">
            <li>
              <Link href="/" className="hover:text-ucsc-gold transition-colors">
                Home
              </Link>
            </li>
            <li>
              <Link href="/chatbot" className="hover:text-ucsc-gold transition-colors">
                Chatbot
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  )
}

