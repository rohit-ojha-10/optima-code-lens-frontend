import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Search, Github } from "lucide-react"
import axios from "axios"

interface Repository {
  id: number
  name: string
  description: string
  html_url: string
  owner: {
    login: string
  }
}

export default function Dashboard() {
  const navigate = useNavigate()
  const [username, setUsername] = useState("")
  const [repos, setRepos] = useState<Repository[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const handleSearch = async () => {
    if (!username) return
    setLoading(true)
    setError("")
    try {
      const response = await axios.get(`http://localhost:5000/api/repos/${username}`)
      setRepos(response.data)
    } catch (err) {
      setError("Failed to fetch repositories. Please try again.")
      setRepos([])
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="mb-12 flex items-center justify-between">
          <h1 className="text-4xl font-black">Dashboard</h1>
          <Button
            variant="outline"
            onClick={() => navigate("/")}
            className="rounded-full border-2 border-white/10 bg-white/5 px-6 py-2 font-bold hover:bg-white/10"
          >
            Back to Home
          </Button>
        </div>

        <div className="mb-12 flex items-center gap-4">
          <div className="relative flex-1">
            <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Enter GitHub username"
              className="w-full rounded-full border-2 border-white/10 bg-white/5 px-12 py-4 text-lg font-medium text-white placeholder-gray-400 backdrop-blur-sm focus:border-yellow-400 focus:outline-none"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
            />
          </div>
          <Button 
            onClick={handleSearch} 
            disabled={loading}
            className="h-[56px] rounded-full border-2 border-white/10 bg-white/5 px-8 text-lg font-bold hover:bg-white/10"
          >
            {loading ? "Searching..." : "Search"}
          </Button>
        </div>

        {error && (
          <div className="mb-8 rounded-2xl border-2 border-red-500/20 bg-red-500/5 p-6 text-red-400">
            {error}
          </div>
        )}

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {repos.map((repo) => (
            <div
              key={repo.id}
              className="rounded-2xl border-2 border-white/10 bg-white/5 p-8 backdrop-blur-sm transition-all hover:border-yellow-400/20 hover:bg-white/10"
            >
              <div className="mb-4 flex items-center gap-3">
                <div className="rounded-full bg-white/10 p-2">
                  <Github className="h-5 w-5 text-yellow-400" />
                </div>
                <h3 className="text-xl font-bold">
                  <a
                    href={repo.html_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-yellow-400"
                  >
                    {repo.name}
                  </a>
                </h3>
              </div>
              <p className="mb-6 text-gray-400">
                {repo.description || "No description available"}
              </p>
              <Button
                onClick={() => navigate(`/analysis/${repo.owner.login}/${repo.name}`)}
                className="w-full rounded-full border-2 border-white/10 bg-white/5 py-6 text-lg font-bold hover:bg-white/10"
              >
                Analyze Repository
              </Button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
} 