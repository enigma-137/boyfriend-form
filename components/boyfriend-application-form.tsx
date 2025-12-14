"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { submitApplication } from "@/app/actions"
import { ArrowRight, ArrowLeft, Heart} from "lucide-react"

interface FormData {
  name: string
  email: string
  age: string
  country: string
  state: string
  height: string
  education: string
  occupation: string
  grammarTest: string
  canCook: string
  anatomyKnowledge: string
  reliability: string
  footballTeam: string
  additionalInfo: string
}

export default function BoyfriendApplicationForm() {
  const [step, setStep] = useState(0)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)
  const [errors, setErrors] = useState<Partial<FormData>>({})
  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    age: "",
    country: "",
    state: "",
    height: "",
    education: "",
    occupation: "",
    grammarTest: "",
    canCook: "",
    anatomyKnowledge: "",
    reliability: "",
    footballTeam: "",
    additionalInfo: "",
  })

  const updateField = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    // Clear error for this field when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

  const validateStep = (stepIndex: number): boolean => {
    const newErrors: Partial<FormData> = {}

    switch (stepIndex) {
      case 0: 
        if (!formData.name.trim()) newErrors.name = "Full name is required"
        if (!formData.email.trim()) newErrors.email = "Email is required"
        if (!formData.age.trim()) newErrors.age = "Age is required"
        break
      case 1: 
        if (!formData.country.trim()) newErrors.country = "Country is required"
        if (!formData.state.trim()) newErrors.state = "State/Region is required"
        if (!formData.height) newErrors.height = "Height selection is required"
        break
      case 2: 
        if (!formData.education) newErrors.education = "Education level is required"
        if (!formData.occupation) newErrors.occupation = "Occupation type is required"
        break
      case 3: 
        if (!formData.grammarTest) newErrors.grammarTest = "Grammar test answer is required"
        if (!formData.canCook) newErrors.canCook = "Cooking ability is required"
        if (!formData.anatomyKnowledge) newErrors.anatomyKnowledge = "Anatomy knowledge is required"
        break
      case 4:
        if (!formData.reliability) newErrors.reliability = "Reliability answer is required"
        if (!formData.footballTeam) newErrors.footballTeam = "Football team selection is required"
        // additionalInfo is optional
        break
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const validateAll = (): boolean => {
    const newErrors: Partial<FormData> = {}

    if (!formData.name.trim()) newErrors.name = "Full name is required"
    if (!formData.email.trim()) newErrors.email = "Email is required"
    if (!formData.age.trim()) newErrors.age = "Age is required"
    if (!formData.country.trim()) newErrors.country = "Country is required"
    if (!formData.state.trim()) newErrors.state = "State/Region is required"
    if (!formData.height) newErrors.height = "Height selection is required"
    if (!formData.education) newErrors.education = "Education level is required"
    if (!formData.occupation) newErrors.occupation = "Occupation type is required"
    if (!formData.grammarTest) newErrors.grammarTest = "Grammar test answer is required"
    if (!formData.canCook) newErrors.canCook = "Cooking ability is required"
    if (!formData.anatomyKnowledge) newErrors.anatomyKnowledge = "Anatomy knowledge is required"
    if (!formData.reliability) newErrors.reliability = "Reliability answer is required"
    if (!formData.footballTeam) newErrors.footballTeam = "Football team selection is required"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleNext = () => {
    if (validateStep(step) && step < 4) {
      setStep(step + 1)
    }
  }

  const handleBack = () => {
    if (step > 0) setStep(step - 1)
  }

  const handleSubmit = async () => {
    if (!validateAll()) return

    setIsSubmitting(true)
    try {
      await submitApplication(formData)
      setIsSubmitted(true)
    } catch (error) {
      console.log((error as Error).message || "Something went wrong. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  const steps = [
    {
      title: "Basic Information",
      description: "Let's start with the basics",
      content: (
        <div className="space-y-4">
          <div>
            <Label htmlFor="name">Full Name *</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => updateField("name", e.target.value)}
              placeholder="Your full name"
              className={`mt-1.5 ${errors.name ? "border-red-500" : ""}`}
            />
            {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
          </div>
          <div>
            <Label htmlFor="email">Email Address *</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => updateField("email", e.target.value)}
              placeholder="your.email@example.com"
              className={`mt-1.5 ${errors.email ? "border-red-500" : ""}`}
            />
            {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
          </div>
          <div>
            <Label htmlFor="age">Age *</Label>
            <Input
              id="age"
              type="number"
              value={formData.age}
              onChange={(e) => updateField("age", e.target.value)}
              placeholder="25"
              className={`mt-1.5 ${errors.age ? "border-red-500" : ""}`}
            />
            {errors.age && <p className="text-red-500 text-sm mt-1">{errors.age}</p>}
          </div>
        </div>
      ),
    },
    {
      title: "Location & shii",
      description: "Where are you and how tall are you?",
      content: (
        <div className="space-y-4">
          <div>
            <Label htmlFor="country">Country *</Label>
            <Input
              id="country"
              value={formData.country}
              onChange={(e) => updateField("country", e.target.value)}
              placeholder="e.g., Nigeria"
              className={`mt-1.5 ${errors.country ? "border-red-500" : ""}`}
            />
            {errors.country && <p className="text-red-500 text-sm mt-1">{errors.country}</p>}
          </div>
          <div>
            <Label htmlFor="state">State/Region *</Label>
            <Input
              id="state"
              value={formData.state}
              onChange={(e) => updateField("state", e.target.value)}
              placeholder="e.g., Lagos"
              className={`mt-1.5 ${errors.state ? "border-red-500" : ""}`}
            />
            {errors.state && <p className="text-red-500 text-sm mt-1">{errors.state}</p>}
          </div>
          <div>
            <Label htmlFor="height">Height *</Label>
            <Select value={formData.height} onValueChange={(value) => updateField("height", value)}>
              <SelectTrigger className={`mt-1.5 ${errors.height ? "border-red-500" : ""}`}>
                <SelectValue placeholder="Select your height" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="below-5-11">Below 5&apos;11&quot; (Sorry, not qualified)</SelectItem>
                <SelectItem value="5-11">5&apos;11&quot;</SelectItem>
                <SelectItem value="6-0">6&apos;0&quot;</SelectItem>
                <SelectItem value="6-1">6&apos;1&quot;</SelectItem>
                <SelectItem value="6-2">6&apos;2&quot;</SelectItem>
                <SelectItem value="6-3-plus">6&apos;3&quot; and above</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      ),
    },
    {
      title: "Education & Work",
      description: "Tell us about your credentials",
      content: (
        <div className="space-y-4">
          <div>
            <Label htmlFor="education">Highest Degree *</Label>
            <Select value={formData.education} onValueChange={(value) => updateField("education", value)}>
              <SelectTrigger className={`mt-1.5 ${errors.education ? "border-red-500" : ""}`}>
                <SelectValue placeholder="Select your education level" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="high-school">High School</SelectItem>
                <SelectItem value="bachelors">Bachelor&apos;s Degree</SelectItem>
                <SelectItem value="masters">Master&apos;s Degree</SelectItem>
                <SelectItem value="phd">PhD</SelectItem>
                <SelectItem value="other">Other</SelectItem>
              </SelectContent>
            </Select>
            {errors.footballTeam && <p className="text-red-500 text-sm mt-1">{errors.footballTeam}</p>}
            {errors.education && <p className="text-red-500 text-sm mt-1">{errors.education}</p>}
            {errors.height && <p className="text-red-500 text-sm mt-1">{errors.height}</p>}
          </div>
          <div>
            <Label>Occupation Type *</Label>
            <RadioGroup
              value={formData.occupation}
              onValueChange={(value) => updateField("occupation", value)}
              className={`mt-2 ${errors.occupation ? "border border-red-500 rounded-md p-2" : ""}`}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="creative" id="creative" />
                <Label htmlFor="creative" className="font-normal cursor-pointer">
                  Creative
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="corporate" id="corporate" />
                <Label htmlFor="corporate" className="font-normal cursor-pointer">
                  Corporate 9-5
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="other" id="other-occupation" />
                <Label htmlFor="other-occupation" className="font-normal cursor-pointer">
                  Other (Sorry, doesn&apos;t qualify)
                </Label>
              </div>
            </RadioGroup>
            {errors.reliability && <p className="text-red-500 text-sm mt-1">{errors.reliability}</p>}
            {errors.anatomyKnowledge && <p className="text-red-500 text-sm mt-1">{errors.anatomyKnowledge}</p>}
            {errors.canCook && <p className="text-red-500 text-sm mt-1">{errors.canCook}</p>}
            {errors.grammarTest && <p className="text-red-500 text-sm mt-1">{errors.grammarTest}</p>}
            {errors.occupation && <p className="text-red-500 text-sm mt-1">{errors.occupation}</p>}
          </div>
        </div>
      ),
    },
    {
      title: "The Real Tests",
      description: "This is where it gets serious",
      content: (
        <div className="space-y-4">
          <div>
            <Label>Grammar Test: Complete the sentence *</Label>
            <p className="text-sm text-muted-foreground mt-1 mb-2">
              &quot;_____ going to be late if you don&apos;t hurry!&quot;
            </p>
            <RadioGroup value={formData.grammarTest} onValueChange={(value) => updateField("grammarTest", value)} className={errors.grammarTest ? "border border-red-500 rounded-md p-2" : ""}>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="your" id="your" />
                <Label htmlFor="your" className="font-normal cursor-pointer">
                  Your
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="youre" id="youre" />
                <Label htmlFor="youre" className="font-normal cursor-pointer">
                  You&apos;re
                </Label>
              </div>
            </RadioGroup>
          </div>
          <div>
            <Label>Can you cook proper jollof rice that slaps? *</Label>
            <RadioGroup
              value={formData.canCook}
              onValueChange={(value) => updateField("canCook", value)}
              className={`mt-2 ${errors.canCook ? "border border-red-500 rounded-md p-2" : ""}`}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="yes-masterchef" id="yes-masterchef" />
                <Label htmlFor="yes-masterchef" className="font-normal cursor-pointer">
                  Yes, I&apos;m basically a chef
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="yes-learning" id="yes-learning" />
                <Label htmlFor="yes-learning" className="font-normal cursor-pointer">
                  Yes, still learning but it&apos;s good
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="no" id="no-cook" />
                <Label htmlFor="no-cook" className="font-normal cursor-pointer">
                  No (Disqualified)
                </Label>
              </div>
            </RadioGroup>
          </div>
          <div>
            <Label>Bonus: Can you locate the clit without Google Maps? *</Label>
            <RadioGroup
              value={formData.anatomyKnowledge}
              onValueChange={(value) => updateField("anatomyKnowledge", value)}
              className={`mt-2 ${errors.anatomyKnowledge ? "border border-red-500 rounded-md p-2" : ""}`}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="yes-expert" id="yes-expert" />
                <Label htmlFor="yes-expert" className="font-normal cursor-pointer">
                  Yes, I&apos;m a navigator
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="yes-confident" id="yes-confident" />
                <Label htmlFor="yes-confident" className="font-normal cursor-pointer">
                  Yes, pretty confident
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="need-help" id="need-help" />
                <Label htmlFor="need-help" className="font-normal cursor-pointer">
                  I might need directions
                </Label>
              </div>
            </RadioGroup>
          </div>
        </div>
      ),
    },
    {
      title: "Final Questions",
      description: "Almost there!",
      content: (
        <div className="space-y-4">
          <div>
            <Label>Are you the type to promise and fail? *</Label>
            <RadioGroup
              value={formData.reliability}
              onValueChange={(value) => updateField("reliability", value)}
              className={`mt-2 ${errors.reliability ? "border border-red-500 rounded-md p-2" : ""}`}
            >
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="never" id="never" />
                <Label htmlFor="never" className="font-normal cursor-pointer">
                  Never, my word is my bond
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="rarely" id="rarely" />
                <Label htmlFor="rarely" className="font-normal cursor-pointer">
                  Rarely, I try my best
                </Label>
              </div>
              <div className="flex items-center space-x-2">
                <RadioGroupItem value="sometimes" id="sometimes" />
                <Label htmlFor="sometimes" className="font-normal cursor-pointer">
                  Sometimes (Red flag)
                </Label>
              </div>
            </RadioGroup>
          </div>
          <div>
            <Label>Which football team do you support? *</Label>
            <Select value={formData.footballTeam} onValueChange={(value) => updateField("footballTeam", value)}>
              <SelectTrigger className={`mt-1.5 ${errors.footballTeam ? "border-red-500" : ""}`}>
                <SelectValue placeholder="Select your team" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="arsenal">Arsenal (DISQUALIFIED)</SelectItem>
                <SelectItem value="chelsea">Chelsea (DISQUALIFIED)</SelectItem>
                <SelectItem value="liverpool">Liverpool (DISQUALIFIED)</SelectItem>
                <SelectItem value="man-united">Manchester United</SelectItem>
                <SelectItem value="man-city">Manchester City</SelectItem>
                <SelectItem value="tottenham">Tottenham</SelectItem>
                <SelectItem value="other">Other Team</SelectItem>
                <SelectItem value="none">I don&apos;t watch football</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div>
            <Label htmlFor="additionalInfo">Additional Information</Label>
            <Textarea
              id="additionalInfo"
              value={formData.additionalInfo}
              onChange={(e) => updateField("additionalInfo", e.target.value)}
              placeholder="Anything else you'd like to share? Why should I pick you?"
              className="mt-1.5 min-h-24"
            />
          </div>
        </div>
      ),
    },
  ]

  if (isSubmitted) {
    return (
      <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} className="w-full max-w-md">
        <Card className="border-2 border-primary shadow-xl">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 w-16 h-16 bg-primary rounded-full flex items-center justify-center">
              <Heart className="w-8 h-8 text-primary-foreground fill-current" />
            </div>
            <CardTitle className="text-2xl text-balance">Application Submitted!</CardTitle>
            <CardDescription className="text-pretty">
              Your application has been received. I&apos;ll review it and get back to you if you&apos;re a match. Good
              luck!
            </CardDescription>
          </CardHeader>
        </Card>
      </motion.div>
    )
  }

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="w-full max-w-2xl">
      <Card className="border-2 shadow-2xl">
        <CardHeader className="space-y-2">
          <div className="flex items-center gap-2">
         
            <CardTitle className="text-xl md:text-2xl text-balance">Natsss &apos;s 2026 Boyfriend Application Form</CardTitle>
          </div>
          <CardDescription className="text-pretty">
            Think you have what it takes? Fill out this application honestly.
          </CardDescription>
          <div className="pt-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm font-medium">
                Step {step + 1} of {steps.length}
              </span>
              <span className="text-sm text-muted-foreground">{Math.round(((step + 1) / steps.length) * 100)}%</span>
            </div>
            <div className="h-2 bg-secondary rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-primary"
                initial={{ width: 0 }}
                animate={{ width: `${((step + 1) / steps.length) * 100}%` }}
                transition={{ duration: 0.3 }}
              />
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
            >
              <div className="mb-6">
                <h3 className="text-xl font-semibold mb-1 text-balance">{steps[step].title}</h3>
                <p className="text-sm text-muted-foreground text-pretty">{steps[step].description}</p>
              </div>
              {steps[step].content}
            </motion.div>
          </AnimatePresence>

          <div className="flex gap-3 mt-8">
            {step > 0 && (
              <Button onClick={handleBack} variant="outline" className="flex-1 bg-transparent">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back
              </Button>
            )}
            {step < steps.length - 1 ? (
              <Button onClick={handleNext} className="flex-1">
                Next
                <ArrowRight className="w-4 h-4 ml-2" />
              </Button>
            ) : (
              <Button onClick={handleSubmit} disabled={isSubmitting} className="flex-1">
                {isSubmitting ? "Submitting..." : "Submit Application"}
              </Button>
            )}
          </div>
        </CardContent>
      </Card>
    </motion.div>
  )
}
