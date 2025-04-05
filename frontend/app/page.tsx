"use client"

import { useState } from "react"
import { SearchForm } from "../components/SearchForm"
import { SearchResults } from "../components/SearchResult"
import { Header } from "../components/Header"
import type { PodcastEpisode } from "./types"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { AlertCircle } from "lucide-react"

export default function Home() {
  const [results, setResults] = useState<PodcastEpisode[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSearch = async (query: string) => {
    setIsLoading(true)
    setError(null)
    try {
      const response = await fetch(`/api/search?q=${encodeURIComponent(query)}`)
      if (!response.ok) {
        throw new Error("Network response was not ok")
      }
      const data = await response.json()
      setResults(data)
    } catch (error) {
      console.error("Error fetching search results:", error)
      setError("An error occurred while fetching results. Please try again.")
      setResults([])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />
      <main className="container mx-auto px-4 py-8">
        <SearchForm onSearch={handleSearch} />
        {error && (
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}
        <SearchResults results={results} isLoading={isLoading} />
      </main>
    </div>
  )
}
