import { ReactNode } from "react"
import { Link, useLocation } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Github, Home, BarChart2 } from "lucide-react"

interface MainLayoutProps {
  children: ReactNode
}

export default function MainLayout({ children }: MainLayoutProps) {
  const location = useLocation()
  const isActive = (path: string) => location.pathname === path

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-black to-gray-900 text-white">
      {/* Header */}
      <header className="sticky top-0 z-50 backdrop-blur-md bg-black/50 border-b border-yellow-500/20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="relative">
                <div className="absolute -inset-1 bg-gradient-to-r from-yellow-600 to-yellow-400 rounded-lg blur opacity-25 group-hover:opacity-100 transition duration-1000 group-hover:duration-200"></div>
                <Github className="w-6 h-6 text-yellow-500 relative" />
              </div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-yellow-400 to-white bg-clip-text text-transparent">
                Performance Optimizer
              </h1>
            </div>
            <nav className="flex items-center space-x-4">
              <Link to="/">
                <Button
                  variant="ghost"
                  className={`flex items-center space-x-2 rounded-full border-2 border-yellow-500/20 bg-yellow-950/30 px-6 py-2 font-bold hover:bg-yellow-900/30 transition-all duration-300 hover:scale-105 ${
                    isActive("/") ? "text-yellow-500" : "text-gray-400 hover:text-yellow-400"
                  }`}
                >
                  <Home className="w-5 h-5" />
                  <span>Home</span>
                </Button>
              </Link>
              <Link to="/dashboard">
                <Button
                  variant="ghost"
                  className={`flex items-center space-x-2 rounded-full border-2 border-yellow-500/20 bg-yellow-950/30 px-6 py-2 font-bold hover:bg-yellow-900/30 transition-all duration-300 hover:scale-105 ${
                    isActive("/dashboard") ? "text-yellow-500" : "text-gray-400 hover:text-yellow-400"
                  }`}
                >
                  <BarChart2 className="w-5 h-5" />
                  <span>Dashboard</span>
                </Button>
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <footer className="sticky bottom-0 z-50 backdrop-blur-md bg-black/50 border-t border-yellow-500/20">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between text-sm">
            <div className="flex items-center space-x-4 text-gray-400">
              <span>© {new Date().getFullYear()} Performance Optimizer</span>
              <span>•</span>
              <a
                href="https://github.com/yourusername/performance-optimizer"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-yellow-400 transition-colors"
              >
                GitHub
              </a>
            </div>
            <div className="text-gray-400">
              Built with <span className="text-yellow-400">❤️</span> using React & TypeScript
            </div>
          </div>
        </div>
      </footer>
    </div>
  )
} 