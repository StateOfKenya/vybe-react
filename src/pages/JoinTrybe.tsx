import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { ArrowLeft, ArrowRight, CheckCircle, Users, Target, Heart } from "lucide-react"
import { submitMembership } from "@/api/membership"
import { useToast } from "@/hooks/useToast"

const formSchema = z.object({
  fullName: z.string().min(2, "Full name must be at least 2 characters"),
  age: z.number().min(16, "Must be at least 16 years old").max(35, "Must be 35 years or younger"),
  county: z.string().min(1, "Please select your county"),
  phone: z.string().min(10, "Please enter a valid phone number"),
  email: z.string().email("Please enter a valid email address"),
  interests: z.array(z.string()).min(1, "Please select at least one interest"),
  skills: z.array(z.string()).min(1, "Please select at least one skill"),
  motivation: z.string().min(50, "Please provide at least 50 characters explaining your motivation"),
  participation: z.array(z.string()).min(1, "Please select at least one participation preference"),
})

const counties = [
  "Nairobi", "Mombasa", "Kisumu", "Nakuru", "Eldoret", "Thika", "Malindi", "Kitale", "Garissa", "Kakamega",
  "Meru", "Nyeri", "Machakos", "Kericho", "Embu", "Migori", "Homa Bay", "Naivasha", "Voi", "Bungoma",
  "Kilifi", "Lamu", "Isiolo", "Marsabit", "Wajir", "Mandera", "Turkana", "West Pokot", "Samburu", "Laikipia",
  "Nyandarua", "Kirinyaga", "Murang'a", "Kiambu", "Kajiado", "Makueni", "Kitui", "Tana River", "Taita Taveta",
  "Kwale", "Baringo", "Elgeyo Marakwet", "Nandi", "Trans Nzoia", "Uasin Gishu", "Bomet", "Kericho", "Nyamira"
]

const interestOptions = [
  "Environment & Climate Action",
  "Politics & Governance",
  "Arts & Creative Expression",
  "Sports & Recreation",
  "Education & Mentorship",
  "Health & Wellness",
  "Technology & Innovation",
  "Entrepreneurship & Business",
  "Community Development",
  "Human Rights & Social Justice"
]

const skillOptions = [
  "Leadership & Management",
  "Public Speaking",
  "Event Organization",
  "Social Media & Marketing",
  "Writing & Communication",
  "Photography & Videography",
  "Graphic Design",
  "Web Development",
  "Project Management",
  "Fundraising",
  "Teaching & Training",
  "Research & Analysis"
]

const participationOptions = [
  "Event Organizing",
  "Volunteering for Projects",
  "Political Mobilization",
  "Community Outreach",
  "Content Creation",
  "Mentoring Other Youth",
  "Fundraising Activities",
  "Skills Training & Workshops"
]

export function JoinTrybe() {
  const [currentStep, setCurrentStep] = useState(1)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [memberId, setMemberId] = useState("")
  const { toast } = useToast()

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      age: 18,
      county: "",
      phone: "",
      email: "",
      interests: [],
      skills: [],
      motivation: "",
      participation: [],
    },
  })

  const totalSteps = 4
  const progress = (currentStep / totalSteps) * 100

  const nextStep = async () => {
    let fieldsToValidate: (keyof z.infer<typeof formSchema>)[] = []

    switch (currentStep) {
      case 1:
        fieldsToValidate = ["fullName", "age", "county", "phone", "email"]
        break
      case 2:
        fieldsToValidate = ["interests", "skills"]
        break
      case 3:
        fieldsToValidate = ["motivation"]
        break
      case 4:
        fieldsToValidate = ["participation"]
        break
    }

    const isStepValid = await form.trigger(fieldsToValidate)
    if (isStepValid && currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    }
  }

  const prevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    try {
      setIsSubmitting(true)
      console.log('Submitting membership application:', values)

      const membershipData = {
        personalInfo: {
          fullName: values.fullName,
          age: values.age,
          county: values.county,
          phone: values.phone,
          email: values.email,
        },
        interests: values.interests,
        skills: values.skills,
        motivation: values.motivation,
        participation: values.participation,
      }

      const response = await submitMembership(membershipData) as any

      if (response.success) {
        setMemberId(response.memberId)
        setIsSuccess(true)
        console.log('Membership application submitted successfully')
        toast({
          title: "Welcome to Vybe Trybe!",
          description: response.message,
        })
      }
    } catch (error: any) {
      console.error('Error submitting membership:', error)
      toast({
        title: "Error",
        description: error.message || "Failed to submit membership application",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isSuccess) {
    return (
      <div className="max-w-2xl mx-auto px-4 py-8">
        <Card className="text-center bg-white/80 backdrop-blur-sm">
          <CardHeader>
            <div className="mx-auto w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mb-4">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <CardTitle className="text-2xl text-green-600">Welcome to Vybe Trybe!</CardTitle>
            <CardDescription>Your membership application has been approved</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="bg-green-50 p-4 rounded-lg">
              <p className="text-sm text-green-700 mb-2">Your Member ID:</p>
              <p className="text-lg font-mono font-bold text-green-800">{memberId}</p>
            </div>

            <div className="space-y-4 text-left">
              <h3 className="font-semibold text-gray-900">What's Next?</h3>
              <ul className="space-y-2 text-sm text-gray-600">
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Check your email for welcome information and next steps</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Join our WhatsApp community groups</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Explore upcoming events and projects</span>
                </li>
                <li className="flex items-center space-x-2">
                  <CheckCircle className="w-4 h-4 text-green-500" />
                  <span>Access your member dashboard</span>
                </li>
              </ul>
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              <Button className="flex-1 bg-gradient-to-r from-red-500 to-green-500">
                <Users className="w-4 h-4 mr-2" />
                Go to Dashboard
              </Button>
              <Button variant="outline" className="flex-1">
                <Target className="w-4 h-4 mr-2" />
                Explore Events
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-red-600 via-green-600 to-yellow-600 bg-clip-text text-transparent mb-4">
          Join the Trybe
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Become part of Kenya's largest youth movement for positive change.
          Together, we're building a better future for all.
        </p>
      </div>

      {/* Progress Bar */}
      <div className="mb-8">
        <div className="flex justify-between items-center mb-2">
          <span className="text-sm font-medium text-gray-600">Step {currentStep} of {totalSteps}</span>
          <span className="text-sm font-medium text-gray-600">{Math.round(progress)}% Complete</span>
        </div>
        <Progress value={progress} className="h-2" />
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <Card className="bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                {currentStep === 1 && <Users className="w-5 h-5 text-red-500" />}
                {currentStep === 2 && <Target className="w-5 h-5 text-green-500" />}
                {currentStep === 3 && <Heart className="w-5 h-5 text-yellow-500" />}
                {currentStep === 4 && <CheckCircle className="w-5 h-5 text-blue-500" />}
                <span>
                  {currentStep === 1 && "Personal Information"}
                  {currentStep === 2 && "Interests & Skills"}
                  {currentStep === 3 && "Your Motivation"}
                  {currentStep === 4 && "Participation Preferences"}
                </span>
              </CardTitle>
              <CardDescription>
                {currentStep === 1 && "Tell us about yourself"}
                {currentStep === 2 && "What are you passionate about and what can you contribute?"}
                {currentStep === 3 && "Why do you want to join Vybe Trybe?"}
                {currentStep === 4 && "How would you like to get involved?"}
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-6">
              {/* Step 1: Personal Information */}
              {currentStep === 1 && (
                <div className="grid md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="fullName"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Full Name</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter your full name" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="age"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Age</FormLabel>
                        <FormControl>
                          <Input
                            type="number"
                            placeholder="Enter your age"
                            {...field}
                            onChange={(e) => field.onChange(parseInt(e.target.value))}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="county"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>County</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select your county" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {counties.map((county) => (
                              <SelectItem key={county} value={county}>
                                {county}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Phone Number</FormLabel>
                        <FormControl>
                          <Input placeholder="+254 700 000 000" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem className="md:col-span-2">
                        <FormLabel>Email Address</FormLabel>
                        <FormControl>
                          <Input placeholder="your.email@example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}

              {/* Step 2: Interests & Skills */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <FormField
                    control={form.control}
                    name="interests"
                    render={() => (
                      <FormItem>
                        <FormLabel>Areas of Interest</FormLabel>
                        <FormDescription>
                          Select all areas you're passionate about (choose at least one)
                        </FormDescription>
                        <div className="grid md:grid-cols-2 gap-3">
                          {interestOptions.map((interest) => (
                            <FormField
                              key={interest}
                              control={form.control}
                              name="interests"
                              render={({ field }) => {
                                return (
                                  <FormItem
                                    key={interest}
                                    className="flex flex-row items-start space-x-3 space-y-0"
                                  >
                                    <FormControl>
                                      <Checkbox
                                        checked={field.value?.includes(interest)}
                                        onCheckedChange={(checked) => {
                                          return checked
                                            ? field.onChange([...field.value, interest])
                                            : field.onChange(
                                                field.value?.filter(
                                                  (value) => value !== interest
                                                )
                                              )
                                        }}
                                      />
                                    </FormControl>
                                    <FormLabel className="text-sm font-normal">
                                      {interest}
                                    </FormLabel>
                                  </FormItem>
                                )
                              }}
                            />
                          ))}
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="skills"
                    render={() => (
                      <FormItem>
                        <FormLabel>Skills & Abilities</FormLabel>
                        <FormDescription>
                          Select your skills that you can contribute to the community
                        </FormDescription>
                        <div className="grid md:grid-cols-2 gap-3">
                          {skillOptions.map((skill) => (
                            <FormField
                              key={skill}
                              control={form.control}
                              name="skills"
                              render={({ field }) => {
                                return (
                                  <FormItem
                                    key={skill}
                                    className="flex flex-row items-start space-x-3 space-y-0"
                                  >
                                    <FormControl>
                                      <Checkbox
                                        checked={field.value?.includes(skill)}
                                        onCheckedChange={(checked) => {
                                          return checked
                                            ? field.onChange([...field.value, skill])
                                            : field.onChange(
                                                field.value?.filter(
                                                  (value) => value !== skill
                                                )
                                              )
                                        }}
                                      />
                                    </FormControl>
                                    <FormLabel className="text-sm font-normal">
                                      {skill}
                                    </FormLabel>
                                  </FormItem>
                                )
                              }}
                            />
                          ))}
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              )}

              {/* Step 3: Motivation */}
              {currentStep === 3 && (
                <FormField
                  control={form.control}
                  name="motivation"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Why do you want to join Vybe Trybe?</FormLabel>
                      <FormDescription>
                        Tell us about your motivation and what you hope to achieve (minimum 50 characters)
                      </FormDescription>
                      <FormControl>
                        <Textarea
                          placeholder="Share your story, your passion for change, and what you hope to contribute to the Vybe Trybe community..."
                          className="min-h-[120px]"
                          {...field}
                        />
                      </FormControl>
                      <div className="text-sm text-gray-500">
                        {field.value?.length || 0} / 50 minimum characters
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              {/* Step 4: Participation Preferences */}
              {currentStep === 4 && (
                <FormField
                  control={form.control}
                  name="participation"
                  render={() => (
                    <FormItem>
                      <FormLabel>How would you like to participate?</FormLabel>
                      <FormDescription>
                        Select all the ways you'd like to get involved with Vybe Trybe
                      </FormDescription>
                      <div className="grid md:grid-cols-2 gap-3">
                        {participationOptions.map((option) => (
                          <FormField
                            key={option}
                            control={form.control}
                            name="participation"
                            render={({ field }) => {
                              return (
                                <FormItem
                                  key={option}
                                  className="flex flex-row items-start space-x-3 space-y-0"
                                >
                                  <FormControl>
                                    <Checkbox
                                      checked={field.value?.includes(option)}
                                      onCheckedChange={(checked) => {
                                        return checked
                                          ? field.onChange([...field.value, option])
                                          : field.onChange(
                                              field.value?.filter(
                                                (value) => value !== option
                                              )
                                            )
                                      }}
                                    />
                                  </FormControl>
                                  <FormLabel className="text-sm font-normal">
                                    {option}
                                  </FormLabel>
                                </FormItem>
                              )
                            }}
                          />
                        ))}
                      </div>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
            </CardContent>
          </Card>

          {/* Navigation Buttons */}
          <div className="flex justify-between">
            <Button
              type="button"
              variant="outline"
              onClick={prevStep}
              disabled={currentStep === 1}
              className="flex items-center space-x-2"
            >
              <ArrowLeft className="w-4 h-4" />
              <span>Previous</span>
            </Button>

            {currentStep < totalSteps ? (
              <Button
                type="button"
                onClick={nextStep}
                className="flex items-center space-x-2 bg-gradient-to-r from-red-500 to-green-500"
              >
                <span>Next</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            ) : (
              <Button
                type="submit"
                disabled={isSubmitting}
                className="flex items-center space-x-2 bg-gradient-to-r from-red-500 to-green-500"
              >
                {isSubmitting ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Submitting...</span>
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-4 h-4" />
                    <span>Join Vybe Trybe</span>
                  </>
                )}
              </Button>
            )}
          </div>
        </form>
      </Form>
    </div>
  )
}