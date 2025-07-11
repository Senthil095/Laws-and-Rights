"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Checkbox } from "@/components/ui/checkbox"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, Send, Star, MessageSquare, Bug, Lightbulb, Heart } from "lucide-react"
import Link from "next/link"
import { FeedbackStatus } from "@/components/feedback-status"

export default function FeedbackPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    type: "general",
    rating: "",
    subject: "",
    message: "",
    allowContact: false,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitted, setSubmitted] = useState(false)

  const feedbackTypes = [
    { value: "general", label: "General Feedback", icon: MessageSquare, color: "blue" },
    { value: "bug", label: "Bug Report", icon: Bug, color: "red" },
    { value: "feature", label: "Feature Request", icon: Lightbulb, color: "yellow" },
    { value: "appreciation", label: "Appreciation", icon: Heart, color: "pink" },
  ]

  const handleSubmit = async (e) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      setSubmitted(true)
    }, 2000)
  }

  const handleInputChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleRatingChange = (rating) => {
    setFormData({
      ...formData,
      rating: rating,
    })
  }

  if (submitted) {
    return <FeedbackStatus />
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="container mx-auto px-4 py-8">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="max-w-2xl mx-auto">
          <div className="flex items-center gap-4 mb-6">
            <Link href="/">
              <Button variant="outline" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Home
              </Button>
            </Link>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">Share Your Feedback</h1>
              <p className="text-gray-600">Help us improve your learning experience</p>
            </div>
          </div>

          <Card className="shadow-lg border-0">
            <CardHeader className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-t-lg">
              <CardTitle className="flex items-center gap-2">
                <MessageSquare className="h-5 w-5" />
                We Value Your Opinion
              </CardTitle>
            </CardHeader>

            <CardContent className="p-6">
              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Personal Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="name">Name</Label>
                    <Input
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleInputChange}
                      placeholder="Your name"
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="your.email@example.com"
                      required
                    />
                  </div>
                </div>

                {/* Feedback Type */}
                <div className="space-y-3">
                  <Label>Feedback Type</Label>
                  <RadioGroup
                    value={formData.type}
                    onValueChange={(value) => setFormData({ ...formData, type: value })}
                  >
                    <div className="grid grid-cols-2 gap-4">
                      {feedbackTypes.map((type) => (
                        <div key={type.value} className="flex items-center space-x-2">
                          <RadioGroupItem value={type.value} id={type.value} />
                          <Label htmlFor={type.value} className="flex items-center gap-2 cursor-pointer">
                            <type.icon className={`h-4 w-4 text-${type.color}-600`} />
                            {type.label}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </RadioGroup>
                </div>

                {/* Rating */}
                <div className="space-y-3">
                  <Label>Overall Rating</Label>
                  <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                      <Button
                        key={star}
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => handleRatingChange(star.toString())}
                        className="p-1"
                      >
                        <Star
                          className={`h-6 w-6 ${
                            Number.parseInt(formData.rating) >= star
                              ? "fill-yellow-400 text-yellow-400"
                              : "text-gray-300"
                          }`}
                        />
                      </Button>
                    ))}
                    {formData.rating && (
                      <Badge variant="secondary" className="ml-2">
                        {formData.rating}/5 stars
                      </Badge>
                    )}
                  </div>
                </div>

                {/* Subject */}
                <div className="space-y-2">
                  <Label htmlFor="subject">Subject</Label>
                  <Input
                    id="subject"
                    name="subject"
                    value={formData.subject}
                    onChange={handleInputChange}
                    placeholder="Brief summary of your feedback"
                    required
                  />
                </div>

                {/* Message */}
                <div className="space-y-2">
                  <Label htmlFor="message">Message</Label>
                  <Textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleInputChange}
                    placeholder="Please share your detailed feedback, suggestions, or report any issues you've encountered..."
                    rows={6}
                    required
                  />
                </div>

                {/* Contact Permission */}
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="allowContact"
                    checked={formData.allowContact}
                    onCheckedChange={(checked) => setFormData({ ...formData, allowContact: checked })}
                  />
                  <Label htmlFor="allowContact" className="text-sm">
                    Allow us to contact you for follow-up questions about your feedback
                  </Label>
                </div>

                {/* Submit Button */}
                <Button
                  type="submit"
                  className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      Submitting...
                    </div>
                  ) : (
                    <>
                      <Send className="h-4 w-4 mr-2" />
                      Submit Feedback
                    </>
                  )}
                </Button>
              </form>
            </CardContent>
          </Card>

          {/* Additional Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-6 text-center"
          >
            <Card className="bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
              <CardContent className="p-4">
                <p className="text-sm text-gray-600">
                  <strong>Thank you for helping us improve!</strong> Your feedback is valuable and helps us create a
                  better learning experience for everyone. We typically respond to feedback within 24-48 hours.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
