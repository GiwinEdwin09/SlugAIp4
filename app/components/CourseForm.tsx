"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { AlertCircle, Upload } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import majors from "../data/majors.json"

export default function CourseForm({ onCoursesLoaded }: { onCoursesLoaded: (courses: any) => void }) {
  const [major, setMajor] = useState("")
  const [transcript, setTranscript] = useState<File | null>(null)
  const [fileName, setFileName] = useState<string | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const handleTranscriptChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      if (file.type === "application/pdf") {
        setTranscript(file)
        setFileName(file.name)
        setError(null)
      } else {
        setTranscript(null)
        setFileName(null)
        setError("Please upload a PDF file.")
      }
    }
  }

  const handleRemoveFile = () => {
    setTranscript(null)
    setFileName(null)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!transcript) {
      setError("Please upload your transcript.")
      return
    }
    if (!major) {
      setError("Please select your major.")
      return
    }

    setIsLoading(true)
    setError(null)

    const formData = new FormData()
    formData.append("file", transcript)

    try {
      const response = await fetch("/api/process-transcript", {
        method: "POST",
        body: formData,
      })

      const result = await response.json()

      if (!result.success) {
        throw new Error(result.error || "Failed to process transcript")
      }

      onCoursesLoaded(result.courses)
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "An error occurred while processing your transcript. Please try again.",
      )
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 bg-white bg-opacity-10 backdrop-blur-lg p-6 rounded-lg shadow-lg animate-fade-in"
    >
      <div>
        <Label htmlFor="major" className="text-white">
          Major
        </Label>
        <Select onValueChange={setMajor} required>
          <SelectTrigger className="bg-white bg-opacity-20 text-white border-white border-opacity-30">
            <SelectValue placeholder="Select your major" />
          </SelectTrigger>
          <SelectContent>
            {majors.map((major) => (
              <SelectItem key={major} value={major.toLowerCase().replace(/\s+/g, "-")}>
                {major}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      <div>
        <Label htmlFor="transcript" className="text-white">
          Upload Transcript (PDF)
        </Label>
        <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-white border-opacity-30 border-dashed rounded-md">
          <div className="space-y-1 text-center">
            {fileName ? (
              <div className="text-white">
                <p>{fileName}</p>
                <Button
                  type="button"
                  onClick={handleRemoveFile}
                  variant="outline"
                  className="mt-2 text-black border-white hover:bg-white hover:text-ucsc-blue transition-colors"
                >
                  Remove File
                </Button>
              </div>
            ) : (
              <>
                <Upload className="mx-auto h-12 w-12 text-white" />
                <div className="flex text-sm text-white">
                  <label
                    htmlFor="transcript"
                    className="relative cursor-pointer rounded-md font-medium text-ucsc-gold hover:text-ucsc-gold focus-within:outline-none focus-within:ring-2 focus-within:ring-offset-2 focus-within:ring-ucsc-gold"
                  >
                    <span>Upload a file</span>
                    <Input
                      id="transcript"
                      name="transcript"
                      type="file"
                      accept=".pdf"
                      onChange={handleTranscriptChange}
                      required
                      className="sr-only"
                    />
                  </label>
                  <p className="pl-1">or drag and drop</p>
                </div>
                <p className="text-xs text-white">PDF up to 10MB</p>
              </>
            )}
          </div>
        </div>
      </div>
      {error && (
        <Alert variant="destructive" className="bg-red-500 bg-opacity-90 border-red-600">
          <AlertCircle className="h-4 w-4" />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      <Button
        type="submit"
        className="w-full bg-ucsc-gold text-ucsc-blue hover:bg-yellow-400 transition-colors"
        disabled={isLoading}
      >
        {isLoading ? "Processing..." : "Get Recommendations"}
      </Button>
    </form>
  )
}

