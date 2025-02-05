"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default function ChatbotPage() {
  const [messages, setMessages] = useState<{ role: "user" | "bot"; content: string }[]>([])
  const [input, setInput] = useState("")

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (input.trim()) {
      setMessages([...messages, { role: "user", content: input }])
      // Simulate bot response
      setTimeout(() => {
        setMessages((prev) => [...prev, { role: "bot", content: "Message accepted" }])
      }, 500)
      setInput("")
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold text-center mb-8 text-white">UCSC Course Planner Chatbot</h1>
      <Card className="bg-white bg-opacity-10 backdrop-blur-lg text-white shadow-lg max-w-2xl mx-auto">
        <CardHeader>
          <CardTitle>Chat with our Course Planning Assistant</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4 mb-4 h-[400px] overflow-y-auto">
            {messages.map((message, index) => (
              <div
                key={index}
                className={`p-2 rounded-lg ${message.role === "user" ? "bg-ucsc-blue text-white ml-auto" : "bg-white bg-opacity-20 text-white"} max-w-[80%] ${message.role === "user" ? "ml-auto" : "mr-auto"}`}
              >
                {message.content}
              </div>
            ))}
          </div>
          <form onSubmit={handleSubmit} className="flex gap-2">
            <Input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message here..."
              className="bg-white bg-opacity-20 text-black placeholder-gray-300 border-white border-opacity-30"
            />
            <Button type="submit" className="bg-ucsc-gold text-ucsc-blue hover:bg-yellow-400 transition-colors">
              Send
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}

