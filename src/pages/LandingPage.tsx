import { Button } from "@/components/ui/button"
import { useNavigate } from "react-router-dom"
import { Github, Code, Zap } from "lucide-react"
import { useCallback } from "react"
import Particles from "react-tsparticles"
import { loadSlim } from "tsparticles-slim"
import type { Engine } from "tsparticles-engine"

export default function LandingPage() {
  const navigate = useNavigate()

  const handleConnectGithub = () => {
    navigate("/dashboard")
  }

  const particlesInit = useCallback(async (engine: Engine) => {
    await loadSlim(engine)
  }, [])

  return (
    <div className="min-h-screen bg-black text-white relative">
      <Particles
        id="tsparticles"
        init={particlesInit}
        options={{
          background: {
            color: {
              value: "transparent",
            },
          },
          fpsLimit: 120,
          interactivity: {
            events: {
              onClick: {
                enable: true,
                mode: "push",
              },
              onHover: {
                enable: true,
                mode: "repulse",
              },
            },
            modes: {
              push: {
                quantity: 4,
              },
              repulse: {
                distance: 100,
                duration: 0.4,
              },
            },
          },
          particles: {
            color: {
              value: "#ffffff",
            },
            links: {
              color: "#ffffff",
              distance: 150,
              enable: true,
              opacity: 0.2,
              width: 1,
            },
            move: {
              enable: true,
              random: true,
              speed: 1,
              straight: false,
            },
            number: {
              density: {
                enable: true,
              },
              value: 80,
            },
            opacity: {
              value: 0.2,
            },
            shape: {
              type: "circle",
            },
            size: {
              value: { min: 1, max: 3 },
            },
          },
          detectRetina: true,
        }}
        className="absolute inset-0 z-0"
      />
      <div className="container mx-auto px-4 py-20 relative z-10">
        <div className="mx-auto max-w-3xl text-center">
          <div className="mb-8 inline-block rounded-full border-2 border-white/10 bg-white/5 px-6 py-2 backdrop-blur-sm">
            <span className="flex items-center gap-2 text-sm font-medium">
              <Zap className="h-4 w-4 text-yellow-400" />
              <span className="bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
                Analyze your GitHub repositories for performance
              </span>
            </span>
          </div>

          <h1 className="mb-6 text-6xl font-black tracking-tight">
            GitHub Repository
            <span className="block bg-gradient-to-r from-yellow-400 to-orange-500 bg-clip-text text-transparent">
              Analyzer
            </span>
          </h1>

          <p className="mb-12 text-lg text-gray-400">
            Connect your GitHub account to analyze your repositories for performance optimizations and best practices.
          </p>

          <div className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
            <Button
              size="lg"
              className="gap-2 rounded-full border-2 border-white/10 bg-white/5 px-8 py-6 text-lg font-bold hover:bg-white/10"
              onClick={handleConnectGithub}
            >
              <Github className="h-5 w-5" />
              Connect with GitHub
            </Button>
            <Button
              variant="outline"
              size="lg"
              onClick={() => navigate("/dashboard")}
              className="gap-2 rounded-full border-2 border-white/10 bg-transparent px-8 py-6 text-lg font-bold hover:bg-white/10"
            >
              <Code className="h-5 w-5" />
              Try Demo
            </Button>
          </div>
        </div>

        <div className="mt-32 grid gap-8 md:grid-cols-3">
          <div className="rounded-2xl border-2 border-white/10 bg-white/5 p-8 backdrop-blur-sm">
            <div className="mb-4 inline-block rounded-full bg-white/10 p-4">
              <Code className="h-8 w-8 text-yellow-400" />
            </div>
            <h3 className="mb-2 text-xl font-bold">Code Analysis</h3>
            <p className="text-gray-400">
              Get detailed insights into your codebase's performance and potential optimizations.
            </p>
          </div>

          <div className="rounded-2xl border-2 border-white/10 bg-white/5 p-8 backdrop-blur-sm">
            <div className="mb-4 inline-block rounded-full bg-white/10 p-4">
              <Github className="h-8 w-8 text-yellow-400" />
            </div>
            <h3 className="mb-2 text-xl font-bold">GitHub Integration</h3>
            <p className="text-gray-400">
              Seamlessly connect with your GitHub repositories for instant analysis.
            </p>
          </div>

          <div className="rounded-2xl border-2 border-white/10 bg-white/5 p-8 backdrop-blur-sm">
            <div className="mb-4 inline-block rounded-full bg-white/10 p-4">
              <Zap className="h-8 w-8 text-yellow-400" />
            </div>
            <h3 className="mb-2 text-xl font-bold">Performance Tips</h3>
            <p className="text-gray-400">
              Receive actionable suggestions to improve your code's performance.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
} 