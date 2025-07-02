import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { Filter, Search, Users, Target, Calendar, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Progress } from "@/components/ui/progress"
import { getProjects, Project } from "@/api/projects"
import { useToast } from "@/hooks/useToast"

export function Projects() {
  const [projects, setProjects] = useState<Project[]>([])
  const [filteredProjects, setFilteredProjects] = useState<Project[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const { toast } = useToast()

  const categories = ["Environment", "Politics", "Arts", "Health", "Education"]

  useEffect(() => {
    const loadProjects = async () => {
      try {
        console.log('Loading projects...')
        const response = await getProjects() as any
        setProjects(response.projects)
        setFilteredProjects(response.projects)
        console.log('Projects loaded successfully:', response.projects.length)
      } catch (error: any) {
        console.error('Error loading projects:', error)
        toast({
          title: "Error",
          description: error.message || "Failed to load projects",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    loadProjects()
  }, [toast])

  useEffect(() => {
    let filtered = projects

    if (searchTerm) {
      filtered = filtered.filter(project =>
        project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        project.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    if (categoryFilter && categoryFilter !== "all") {
      filtered = filtered.filter(project => project.category === categoryFilter)
    }

    setFilteredProjects(filtered)
  }, [projects, searchTerm, categoryFilter])

  const clearFilters = () => {
    setSearchTerm("")
    setCategoryFilter("all")
  }

  if (loading) {
    return (
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="grid md:grid-cols-3 gap-6">
          {[...Array(6)].map((_, i) => (
            <Card key={i} className="animate-pulse">
              <div className="aspect-video bg-gray-200 rounded-t-lg" />
              <CardHeader>
                <div className="h-4 bg-gray-200 rounded w-3/4" />
                <div className="h-3 bg-gray-200 rounded w-full" />
                <div className="h-3 bg-gray-200 rounded w-2/3" />
              </CardHeader>
            </Card>
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-8">
      {/* Header */}
      <div className="text-center space-y-4">
        <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-red-600 via-green-600 to-yellow-600 bg-clip-text text-transparent">
          Community Projects
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Join ongoing projects that are making a real difference in communities across Kenya.
          Every contribution counts towards building a better future.
        </p>
      </div>

      {/* Filters */}
      <Card className="bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Filter className="w-5 h-5" />
            <span>Filter Projects</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search projects..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            <Select value={categoryFilter} onValueChange={setCategoryFilter}>
              <SelectTrigger>
                <SelectValue placeholder="All Categories" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Categories</SelectItem>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            <Button variant="outline" onClick={clearFilters}>
              Clear Filters
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Featured Project */}
      {filteredProjects.length > 0 && (
        <Card className="bg-gradient-to-r from-red-50 via-green-50 to-yellow-50 border-0 shadow-xl">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="aspect-video md:aspect-square relative overflow-hidden rounded-l-lg">
              <img
                src={filteredProjects[0].images[0]}
                alt={filteredProjects[0].title}
                className="w-full h-full object-cover"
              />
              <Badge className="absolute top-4 left-4 bg-red-500 text-white">
                Featured Project
              </Badge>
            </div>
            <div className="p-6 flex flex-col justify-center">
              <Badge className="w-fit mb-4 bg-green-100 text-green-700">
                {filteredProjects[0].category}
              </Badge>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                {filteredProjects[0].title}
              </h2>
              <p className="text-gray-600 mb-6">
                {filteredProjects[0].description}
              </p>
              <div className="space-y-4 mb-6">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span>Progress</span>
                    <span>{filteredProjects[0].progress}%</span>
                  </div>
                  <Progress value={filteredProjects[0].progress} className="h-2" />
                </div>
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <div className="flex items-center">
                    <Users className="w-4 h-4 mr-1" />
                    {filteredProjects[0].volunteerCount} volunteers
                  </div>
                  <div className="flex items-center">
                    <Target className="w-4 h-4 mr-1" />
                    {filteredProjects[0].location}
                  </div>
                </div>
              </div>
              <Link to={`/projects/${filteredProjects[0]._id}`}>
                <Button className="w-fit bg-gradient-to-r from-red-500 to-green-500 hover:from-red-600 hover:to-green-600">
                  Learn More & Volunteer
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </Card>
      )}

      {/* Projects Grid */}
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900">
            All Projects ({filteredProjects.length})
          </h2>
        </div>

        {filteredProjects.length === 0 ? (
          <Card className="text-center py-12 bg-white/80 backdrop-blur-sm">
            <CardContent>
              <Target className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No projects found</h3>
              <p className="text-gray-600 mb-4">
                Try adjusting your filters or check back later for new projects.
              </p>
              <Button variant="outline" onClick={clearFilters}>
                Clear Filters
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.slice(1).map((project) => (
              <Card key={project._id} className="bg-white/80 backdrop-blur-sm hover:shadow-lg transition-shadow">
                <div className="aspect-video relative overflow-hidden rounded-t-lg">
                  <img
                    src={project.images[0]}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                  <Badge className="absolute top-4 left-4 bg-red-500">
                    {project.category}
                  </Badge>
                </div>
                <CardHeader>
                  <CardTitle className="text-lg line-clamp-2">{project.title}</CardTitle>
                  <CardDescription className="line-clamp-3">{project.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div>
                      <div className="flex justify-between text-sm mb-2">
                        <span>Progress</span>
                        <span>{project.progress}%</span>
                      </div>
                      <Progress value={project.progress} className="h-2" />
                    </div>
                    <div className="flex items-center justify-between text-sm text-gray-600">
                      <div className="flex items-center">
                        <Users className="w-4 h-4 mr-1" />
                        {project.volunteerCount} volunteers
                      </div>
                      <div className="flex items-center">
                        <Target className="w-4 h-4 mr-1" />
                        {project.location}
                      </div>
                    </div>
                    <Link to={`/projects/${project._id}`}>
                      <Button className="w-full">
                        View Details
                        <ArrowRight className="w-4 h-4 ml-2" />
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>

      {/* Call to Action */}
      <Card className="bg-gradient-to-r from-red-600 via-green-600 to-yellow-600 text-white border-0">
        <CardContent className="text-center py-12">
          <h2 className="text-2xl md:text-3xl font-bold mb-4">
            Have a Project Idea?
          </h2>
          <p className="text-lg mb-6 opacity-90 max-w-2xl mx-auto">
            We support community-driven initiatives that create positive change.
            Share your idea and let's make it happen together.
          </p>
          <Link to="/get-involved">
            <Button size="lg" variant="secondary" className="bg-white text-gray-900 hover:bg-gray-100">
              Propose a Project
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  )
}