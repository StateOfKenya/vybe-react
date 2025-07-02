import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { ArrowLeft, Users, Target, Calendar, CheckCircle, Clock, AlertCircle, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { getProjectById, volunteerForProject, Project } from "@/api/projects"
import { useToast } from "@/hooks/useToast"

const volunteerSchema = z.object({
  skills: z.array(z.string()).min(1, "Please select at least one skill"),
  availability: z.string().min(1, "Please select your availability"),
  motivation: z.string().min(50, "Please provide at least 50 characters explaining your motivation"),
})

const skillOptions = [
  "Leadership & Management",
  "Event Organization",
  "Social Media & Marketing",
  "Photography & Videography",
  "Writing & Communication",
  "Teaching & Training",
  "Fundraising",
  "Technical Skills",
  "Manual Labor",
  "Research & Analysis"
]

const availabilityOptions = [
  "Weekends only",
  "Weekday evenings",
  "Full-time availability",
  "Flexible schedule",
  "Specific events only"
]

export function ProjectDetail() {
  const { id } = useParams<{ id: string }>()
  const [project, setProject] = useState<Project | null>(null)
  const [loading, setLoading] = useState(true)
  const [isVolunteering, setIsVolunteering] = useState(false)
  const [volunteerSuccess, setVolunteerSuccess] = useState(false)
  const { toast } = useToast()

  const form = useForm<z.infer<typeof volunteerSchema>>({
    resolver: zodResolver(volunteerSchema),
    defaultValues: {
      skills: [],
      availability: "",
      motivation: "",
    },
  })

  useEffect(() => {
    const loadProject = async () => {
      if (!id) return

      try {
        console.log('Loading project details for ID:', id)
        const response = await getProjectById(id) as any
        setProject(response.project)
        console.log('Project details loaded successfully')
      } catch (error: any) {
        console.error('Error loading project:', error)
        toast({
          title: "Error",
          description: error.message || "Failed to load project details",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    loadProject()
  }, [id, toast])

  const onSubmit = async (values: z.infer<typeof volunteerSchema>) => {
    if (!project) return

    try {
      setIsVolunteering(true)
      console.log('Submitting volunteer application:', values)

      const response = await volunteerForProject(project._id, values) as any

      if (response.success) {
        setVolunteerSuccess(true)
        console.log('Volunteer application successful')
        toast({
          title: "Application Successful!",
          description: response.message,
        })
      }
    } catch (error: any) {
      console.error('Error submitting volunteer application:', error)
      toast({
        title: "Application Failed",
        description: error.message || "Failed to submit volunteer application",
        variant: "destructive",
      })
    } finally {
      setIsVolunteering(false)
    }
  }

  if (loading) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-gray-200 rounded w-1/4" />
          <div className="aspect-video bg-gray-200 rounded-lg" />
          <div className="h-6 bg-gray-200 rounded w-3/4" />
          <div className="h-4 bg-gray-200 rounded w-full" />
          <div className="h-4 bg-gray-200 rounded w-2/3" />
        </div>
      </div>
    )
  }

  if (!project) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Project Not Found</h1>
        <p className="text-gray-600 mb-6">The project you're looking for doesn't exist or has been removed.</p>
        <Link to="/projects">
          <Button>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Projects
          </Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      {/* Back Button */}
      <Link to="/projects">
        <Button variant="ghost" className="mb-4">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Projects
        </Button>
      </Link>

      {/* Hero Section */}
      <div className="space-y-6">
        <div className="aspect-video relative overflow-hidden rounded-lg">
          <img
            src={project.images[0]}
            alt={project.title}
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
          <div className="absolute bottom-6 left-6 text-white">
            <Badge className="mb-2 bg-red-500">{project.category}</Badge>
            <h1 className="text-3xl md:text-4xl font-bold mb-2">{project.title}</h1>
            <p className="text-lg opacity-90">{project.location}</p>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="grid md:grid-cols-3 gap-6">
          <Card className="bg-white/80 backdrop-blur-sm">
            <CardContent className="pt-6 text-center">
              <div className="text-2xl font-bold text-green-600 mb-2">{project.progress}%</div>
              <div className="text-sm text-gray-600">Progress</div>
              <Progress value={project.progress} className="mt-2" />
            </CardContent>
          </Card>
          <Card className="bg-white/80 backdrop-blur-sm">
            <CardContent className="pt-6 text-center">
              <div className="text-2xl font-bold text-blue-600 mb-2">{project.volunteerCount}</div>
              <div className="text-sm text-gray-600">Active Volunteers</div>
            </CardContent>
          </Card>
          <Card className="bg-white/80 backdrop-blur-sm">
            <CardContent className="pt-6 text-center">
              <div className="text-2xl font-bold text-yellow-600 mb-2">{project.goals.length}</div>
              <div className="text-sm text-gray-600">Project Goals</div>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Main Content */}
      <div className="grid lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-8">
          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="goals">Goals</TabsTrigger>
              <TabsTrigger value="timeline">Timeline</TabsTrigger>
              <TabsTrigger value="gallery">Gallery</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <Card className="bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Project Description</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-gray-600 leading-relaxed">{project.description}</p>
                </CardContent>
              </Card>

              <Card className="bg-white/80 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle>Volunteer Requirements</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {project.requirements.map((requirement, index) => (
                      <li key={index} className="flex items-start space-x-2">
                        <CheckCircle className="w-4 h-4 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-600">{requirement}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="goals" className="space-y-4">
              {project.goals.map((goal, index) => (
                <Card key={index} className="bg-white/80 backdrop-blur-sm">
                  <CardContent className="pt-6">
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-gradient-to-r from-red-500 to-green-500 rounded-full flex items-center justify-center text-white text-sm font-bold flex-shrink-0">
                        {index + 1}
                      </div>
                      <p className="text-gray-700">{goal}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="timeline" className="space-y-4">
              {project.timeline.map((phase, index) => (
                <Card key={index} className="bg-white/80 backdrop-blur-sm">
                  <CardContent className="pt-6">
                    <div className="flex items-start space-x-4">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                        phase.status === 'completed' ? 'bg-green-500' :
                        phase.status === 'in-progress' ? 'bg-yellow-500' : 'bg-gray-300'
                      }`}>
                        {phase.status === 'completed' ? (
                          <CheckCircle className="w-4 h-4 text-white" />
                        ) : phase.status === 'in-progress' ? (
                          <Clock className="w-4 h-4 text-white" />
                        ) : (
                          <AlertCircle className="w-4 h-4 text-white" />
                        )}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center justify-between mb-2">
                          <h3 className="font-semibold text-gray-900">{phase.phase}</h3>
                          <Badge variant={
                            phase.status === 'completed' ? 'default' :
                            phase.status === 'in-progress' ? 'secondary' : 'outline'
                          }>
                            {phase.status.replace('-', ' ')}
                          </Badge>
                        </div>
                        <p className="text-sm text-gray-600">
                          Target Date: {new Date(phase.date).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="gallery" className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                {project.images.map((image, index) => (
                  <div key={index} className="aspect-video relative overflow-hidden rounded-lg">
                    <img
                      src={image}
                      alt={`${project.title} - Image ${index + 1}`}
                      className="w-full h-full object-cover hover:scale-105 transition-transform cursor-pointer"
                    />
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
          <Card className="bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <Heart className="w-5 h-5 text-red-500" />
                <span>Join This Project</span>
              </CardTitle>
              <CardDescription>
                Make a difference by volunteering your time and skills
              </CardDescription>
            </CardHeader>
            <CardContent>
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="w-full bg-gradient-to-r from-red-500 to-green-500 hover:from-red-600 hover:to-green-600">
                    <Users className="w-4 h-4 mr-2" />
                    Volunteer Now
                  </Button>
                </DialogTrigger>
                <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto bg-white">
                  <DialogHeader>
                    <DialogTitle>Volunteer for {project.title}</DialogTitle>
                    <DialogDescription>
                      Help us make a positive impact in the community
                    </DialogDescription>
                  </DialogHeader>

                  {volunteerSuccess ? (
                    <div className="text-center space-y-6 py-8">
                      <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
                        <CheckCircle className="w-8 h-8 text-green-600" />
                      </div>
                      <div>
                        <h3 className="text-xl font-bold text-green-600 mb-2">Application Successful!</h3>
                        <p className="text-gray-600">Thank you for volunteering! Our team will contact you soon with next steps.</p>
                      </div>
                    </div>
                  ) : (
                    <Form {...form}>
                      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                          control={form.control}
                          name="skills"
                          render={() => (
                            <FormItem>
                              <FormLabel>Your Skills</FormLabel>
                              <FormDescription>
                                Select skills you can contribute to this project
                              </FormDescription>
                              <div className="grid md:grid-cols-2 gap-3 max-h-48 overflow-y-auto">
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

                        <FormField
                          control={form.control}
                          name="availability"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Availability</FormLabel>
                              <FormDescription>
                                When are you available to volunteer?
                              </FormDescription>
                              <div className="space-y-2">
                                {availabilityOptions.map((option) => (
                                  <FormField
                                    key={option}
                                    control={form.control}
                                    name="availability"
                                    render={({ field }) => {
                                      return (
                                        <FormItem
                                          key={option}
                                          className="flex flex-row items-start space-x-3 space-y-0"
                                        >
                                          <FormControl>
                                            <input
                                              type="radio"
                                              checked={field.value === option}
                                              onChange={() => field.onChange(option)}
                                              className="mt-1"
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

                        <FormField
                          control={form.control}
                          name="motivation"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Why do you want to volunteer for this project?</FormLabel>
                              <FormDescription>
                                Tell us about your motivation (minimum 50 characters)
                              </FormDescription>
                              <FormControl>
                                <Textarea
                                  placeholder="Share why this project matters to you and how you'd like to contribute..."
                                  className="min-h-[100px]"
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

                        <Button
                          type="submit"
                          className="w-full bg-gradient-to-r from-red-500 to-green-500"
                          disabled={isVolunteering}
                        >
                          {isVolunteering ? (
                            <>
                              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                              Submitting...
                            </>
                          ) : (
                            <>
                              <Heart className="w-4 h-4 mr-2" />
                              Submit Application
                            </>
                          )}
                        </Button>
                      </form>
                    </Form>
                  )}
                </DialogContent>
              </Dialog>
            </CardContent>
          </Card>

          <Card className="bg-white/80 backdrop-blur-sm">
            <CardHeader>
              <CardTitle>Project Impact</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="text-center">
                <div className="text-2xl font-bold text-green-600">{project.volunteerCount}</div>
                <div className="text-sm text-gray-600">Active Volunteers</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-600">{project.progress}%</div>
                <div className="text-sm text-gray-600">Project Completion</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-yellow-600">{project.goals.length}</div>
                <div className="text-sm text-gray-600">Goals Set</div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}