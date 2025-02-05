"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function RecommendedCourses() {
  const [isLoading, setIsLoading] = useState(false)
  const [recommendedCourses, setRecommendedCourses] = useState<{ id: string; name: string }[]>([])

  return (
    <Card className="bg-white bg-opacity-10 backdrop-blur-lg text-white shadow-lg animate-fade-in">
      <CardHeader>
        <CardTitle className="text-2xl font-bold">Recommended Courses</CardTitle>
        <CardDescription className="text-gray-200">Based on your major and transcript</CardDescription>
      </CardHeader>
      <CardContent>
        {isLoading ? (
          <div className="space-y-2">
            <Skeleton className="h-4 w-full bg-white bg-opacity-20" />
            <Skeleton className="h-4 w-full bg-white bg-opacity-20" />
            <Skeleton className="h-4 w-full bg-white bg-opacity-20" />
          </div>
        ) : recommendedCourses.length > 0 ? (
          <ul className="space-y-2">
            {recommendedCourses.map((course) => (
              <li key={course.id} className="bg-white bg-opacity-20 p-3 rounded-md">
                <strong className="text-ucsc-gold">{course.id}:</strong> {course.name}
              </li>
            ))}
          </ul>
        ) : (
          <p className="text-center text-gray-300">
            Upload your transcript and select your major to get course recommendations.
          </p>
        )}
      </CardContent>
    </Card>
  )
}

