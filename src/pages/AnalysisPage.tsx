import { useState, useEffect } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Loader2, ChevronDown, ChevronUp } from "lucide-react"
import axios from "axios"
import ReactMarkdown from 'react-markdown'

interface Analysis {
  repoName: string
  overallSuggestions: string[]
  fileAnalyses: {
    path: string
    suggestions: string[]
  }[]
}

const MarkdownContent = ({ content }: { content: string }) => {
  return (
    <div className="prose prose-invert max-w-none">
      <ReactMarkdown>
        {content}
      </ReactMarkdown>
    </div>
  )
}

export default function AnalysisPage() {
  const navigate = useNavigate()
  const { owner, repo } = useParams()
  const [analysis, setAnalysis] = useState<Analysis | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [expandedFiles, setExpandedFiles] = useState<Set<string>>(new Set())
  const [isOverallExpanded, setIsOverallExpanded] = useState(false)

  useEffect(() => {
    const fetchAnalysis = async () => {
      if (!owner || !repo) return
      setLoading(true)
      setError("")
      try {
        const response = await axios.post("https://optima-code-lens-backend.onrender.com/api/analyze", {
          repoUrl: `${owner}/${repo}`
        })
        setAnalysis(response.data)
      } catch (err) {
        setError("Failed to analyze repository. Please try again.")
      } finally {
        setLoading(false)
      }
    }

    fetchAnalysis()
  }, [owner, repo])

  const toggleFile = (path: string) => {
    setExpandedFiles(prev => {
      const newSet = new Set(prev)
      if (newSet.has(path)) {
        newSet.delete(path)
      } else {
        newSet.add(path)
      }
      return newSet
    })
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-black">
        <Loader2 className="h-12 w-12 animate-spin text-yellow-400" />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="mb-12 flex items-center justify-between">
          <Button
            variant="outline"
            onClick={() => navigate("/dashboard")}
            className="gap-2 rounded-full border-2 border-white/10 bg-white/5 px-6 py-2 font-bold hover:bg-white/10"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Dashboard
          </Button>
        </div>

        {error && (
          <div className="mb-8 rounded-2xl border-2 border-red-500/20 bg-red-500/5 p-6 text-red-400">
            {error}
          </div>
        )}

        {analysis && (
          <div className="space-y-8">
            <div className="rounded-2xl border-2 border-white/10 bg-white/5 p-8 backdrop-blur-sm">
              <button
                onClick={() => setIsOverallExpanded(!isOverallExpanded)}
                className="flex w-full items-center justify-between text-left group"
              >
                <div>
                  <h2 className="mb-2 text-3xl font-black">{analysis.repoName}</h2>
                  <h3 className="text-xl font-bold text-yellow-400 group-hover:text-yellow-300 transition-colors">
                    Overall Suggestions
                  </h3>
                </div>
                {isOverallExpanded ? (
                  <ChevronUp className="h-5 w-5 text-yellow-400 group-hover:text-yellow-300 transition-colors" />
                ) : (
                  <ChevronDown className="h-5 w-5 text-yellow-400 group-hover:text-yellow-300 transition-colors" />
                )}
              </button>
              
              {isOverallExpanded && (
                <div className="mt-4">
                  <MarkdownContent content={analysis.overallSuggestions.join('\n\n')} />
                </div>
              )}
            </div>

            <div className="space-y-6">
              <h3 className="text-2xl font-black">File-Specific Analysis</h3>
              {analysis.fileAnalyses.map((fileAnalysis, index) => (
                <div
                  key={index}
                  className="rounded-2xl border-2 border-white/10 bg-white/5 p-8 backdrop-blur-sm"
                >
                  <button
                    onClick={() => toggleFile(fileAnalysis.path)}
                    className="flex w-full items-center justify-between text-left group"
                  >
                    <h4 className="text-lg font-bold text-yellow-400 group-hover:text-yellow-300 transition-colors">
                      {fileAnalysis.path}
                    </h4>
                    {expandedFiles.has(fileAnalysis.path) ? (
                      <ChevronUp className="h-5 w-5 text-yellow-400 group-hover:text-yellow-300 transition-colors" />
                    ) : (
                      <ChevronDown className="h-5 w-5 text-yellow-400 group-hover:text-yellow-300 transition-colors" />
                    )}
                  </button>
                  
                  {expandedFiles.has(fileAnalysis.path) && (
                    <div className="mt-4">
                      <MarkdownContent content={fileAnalysis.suggestions.join('\n\n')} />
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
} 