"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

interface Course {
  course_code: string
  course_name: string
  credits_earned: string
  grade: string
}

interface CoursesByQuarter {
  [quarter: string]: Course[]
}

export default function CourseTable({ courses }: { courses: CoursesByQuarter }) {
  const [editableCourses, setEditableCourses] = useState<CoursesByQuarter>(courses)

  const handleInputChange = (quarter: string, index: number, field: keyof Course, value: string) => {
    setEditableCourses((prev) => ({
      ...prev,
      [quarter]: prev[quarter].map((course, i) => (i === index ? { ...course, [field]: value } : course)),
    }))
  }

  const handleSave = () => {
    // Here you would typically send the updated data to your backend
    console.log("Saved courses:", editableCourses)
  }

  return (
    <div className="space-y-8">
      {Object.entries(editableCourses).map(([quarter, quarterCourses]) => (
        <div key={quarter} className="bg-white bg-opacity-10 backdrop-blur-lg rounded-lg p-6">
          <h3 className="text-2xl font-bold mb-4 text-white">{quarter}</h3>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="text-white">Course Code</TableHead>
                <TableHead className="text-white">Course Name</TableHead>
                <TableHead className="text-white">Credits Earned</TableHead>
                <TableHead className="text-white">Grade</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {quarterCourses.map((course, index) => (
                <TableRow key={index}>
                  <TableCell>
                    <Input
                      value={course.course_code}
                      onChange={(e) => handleInputChange(quarter, index, "course_code", e.target.value)}
                      className="bg-white bg-opacity-20 text-black border-white border-opacity-30"
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      value={course.course_name}
                      onChange={(e) => handleInputChange(quarter, index, "course_name", e.target.value)}
                      className="bg-white bg-opacity-20 text-black border-white border-opacity-30"
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      value={course.credits_earned}
                      onChange={(e) => handleInputChange(quarter, index, "credits_earned", e.target.value)}
                      className="bg-white bg-opacity-20 text-black border-white border-opacity-30"
                    />
                  </TableCell>
                  <TableCell>
                    <Input
                      value={course.grade}
                      onChange={(e) => handleInputChange(quarter, index, "grade", e.target.value)}
                      className="bg-white bg-opacity-20 text-black border-white border-opacity-30"
                    />
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      ))}
      <Button onClick={handleSave} className="bg-ucsc-gold text-ucsc-blue hover:bg-yellow-400 transition-colors">
        Save Changes
      </Button>
    </div>
  )
}

