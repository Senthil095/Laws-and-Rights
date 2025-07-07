"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { MessageSquare, Send } from "lucide-react"
import { FeedbackStatus } from "@/components/feedback-status"

export default function FeedbackPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    feedback: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  // Add new state for feedback status
  const [feedbackStatus, setFeedbackStatus] = useState<"idle" | "sending" | "success" | "error">("idle")
  const [errorMessage, setErrorMessage] = useState<string>("")

  // Update the handleSubmit function
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setFeedbackStatus("sending")

    try {
      const { sendFeedback } = await import("@/lib/emailjs")

      const result = await sendFeedback({
        name: formData.name,
        email: formData.email,
        feedback: formData.feedback,
      })

      console.log("Feedback sent successfully:", result)
      console.log("Recipients:", result.recipients)
      console.log(`Successful: ${result.successful}, Failed: ${result.failed}`)

      setFeedbackStatus("success")
      setFormData({ name: "", email: "", feedback: "" })

      // Auto-reset after 8 seconds (longer to show success)
      setTimeout(() => {
        setFeedbackStatus("idle")
      }, 8000)
    } catch (error) {
      console.error("Failed to send feedback:", error)
      setErrorMessage(error instanceof Error ? error.message : "Unknown error occurred")
      setFeedbackStatus("error")

      // Auto-reset error after 5 seconds
      setTimeout(() => {
        setFeedbackStatus("idle")
        setErrorMessage("")
      }, 5000)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  // Replace the old success state check with:
  if (feedbackStatus === "success") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
        <FeedbackStatus status="success" recipientCount={5} />
      </div>
    )
  }

  if (feedbackStatus === "error") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 flex items-center justify-center p-4">
        <FeedbackStatus status="error" errorMessage={errorMessage} />
      </div>
    )
  }

  // Add the sending overlay before the return statement
  if (feedbackStatus === "sending") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-green-50 to-blue-50 flex items-center justify-center p-4">
        <FeedbackStatus status="sending" recipientCount={5} />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 py-12 px-4 dark:bg-gradient-to-br dark:from-zinc-900 dark:to-zinc-700">
      <div className="container mx-auto max-w-2xl">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}>
          <div className="text-center mb-8">
            <MessageSquare className="h-12 w-12 text-indigo-600 mx-auto mb-4 dark:text-indigo-500" />
            <h1 className="text-3xl font-bold text-gray-800 mb-2 dark:text-gray-100">We Value Your Feedback</h1>
            <p className="text-gray-600 dark:text-gray-400">
              Help us improve the learning experience by sharing your thoughts and suggestions.
            </p>
          </div>

          <Card className="dark:bg-zinc-800 dark:border-zinc-700">
            <CardHeader>
              <CardTitle className="dark:text-gray-100">Send Feedback</CardTitle>
              <CardDescription className="dark:text-gray-400">
                Your feedback will be sent to our team to help us improve the platform.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name" className="dark:text-gray-200">
                      Name
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      placeholder="Your full name"
                      value={formData.name}
                      onChange={handleInputChange}
                      required
                      className="dark:bg-zinc-700 dark:text-gray-50"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email" className="dark:text-gray-200">
                      Email
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="your.email@example.com"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className="dark:bg-zinc-700 dark:text-gray-50"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="feedback" className="dark:text-gray-200">
                    Feedback
                  </Label>
                  <Textarea
                    id="feedback"
                    name="feedback"
                    placeholder="Share your thoughts, suggestions, or report any issues you encountered..."
                    value={formData.feedback}
                    onChange={handleInputChange}
                    rows={6}
                    required
                    className="dark:bg-zinc-700 dark:text-gray-50"
                  />
                </div>

                <Button type="submit" className="w-full" disabled={isSubmitting}>
                  {isSubmitting ? (
                    "Sending..."
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" />
                      Send Feedback
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>
        </motion.div>
      </div>
    </div>
  )
}
