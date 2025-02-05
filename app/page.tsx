"use client"

import { useState } from "react"
import CourseForm from "./components/CourseForm"
import CourseTable from "./components/CourseTable"

export default function Home() {
  const [courses, setCourses] = useState(null)

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-4 text-white">UCSC Course Planner</h1>
      <p className="text-center mb-8 text-gray-200">
        Plan your academic journey at UCSC. Upload your transcript, select your major, and get personalized course
        recommendations.
      </p>
      <div className="space-y-8">
        <CourseForm onCoursesLoaded={setCourses} />
        {courses && <CourseTable courses={courses} />}
      </div>
    </div>
  )
}

