import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { ArrowRight, Users, Target, Calendar, MapPin, Star, Play } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { getMembershipStats, getTestimonials } from "@/api/membership"
import { getEvents } from "@/api/events"
import { getNews } from "@/api/news"
import { useToast } from "@/hooks/useToast"

export function Home() {
  const [stats, setStats] = useState<any>(null)
  const [testimonials, setTestimonials] = useState<any[]>([])
  const [recentEvents, setRecentEvents] = useState<any[]>([])
  const [recentNews, setRecentNews] = useState<any[]>([])
  const { toast } = useToast()

  useEffect(() => {
    const loadData = async () => {
      try {
        console.log('Loading homepage data...')
        const [statsRes, testimonialsRes, eventsRes, newsRes] = await Promise.all([
          getMembershipStats(),
          getTestimonials(),
          getEvents(),
          getNews()
        ])
        
        setStats((statsRes as any).stats)
        setTestimonials((testimonialsRes as any).testimonials)
        setRecentEvents((eventsRes as any).events.slice(0, 3))
        setRecentNews((newsRes as any).articles.slice(0, 3))
        console.log('Homepage data loaded successfully')
      } catch (error: any) {
        console.error('Error loading homepage data:', error)
        toast({
          title: "Error",
          description: error.message || "Failed to load homepage data",
          variant: "destructive",
        })
      }
    }

    loadData()
  }, [toast])

  return (
    <div className="space-y-16">
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-red-600/20 via-green-600/20 to-yellow-600/20" />
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=1200')] bg-cover bg-center opacity-10" />
        
        <div className="relative z-10 text-center max-w-4xl mx-auto px-4">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-red-600 via-green-600 to-yellow-600 bg-clip-text text-transparent">
            One Vybe. One Trybe. One Kenya.
          </h1>
          <p className="text-xl md:text-2xl text-gray-700 mb-8 max-w-2xl mx-auto">
            Empowering Kenyan youth through unity, collaboration, and positive change. 
            Join the movement that's transforming communities across all 47 counties.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/join">
              <Button size="lg" className="bg-gradient-to-r from-red-500 to-green-500 hover:from-red-600 hover:to-green-600 text-white px-8 py-3 text-lg">
                Join the Trybe
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link to="/checheza-mtaani">
              <Button size="lg" variant="outline" className="border-2 border-red-500 text-red-600 hover:bg-red-50 px-8 py-3 text-lg">
                Register for Checheza Mtaani
              </Button>
            </Link>
            <Link to="/projects">
              <Button size="lg" variant="ghost" className="text-green-600 hover:bg-green-50 px-8 py-3 text-lg">
                Explore Projects
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      {stats && (
        <section className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <Card className="text-center bg-white/70 backdrop-blur-sm border-red-200">
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-red-600 mb-2">{stats.totalMembers.toLocaleString()}</div>
                <div className="text-sm text-gray-600">Trybe Members</div>
              </CardContent>
            </Card>
            <Card className="text-center bg-white/70 backdrop-blur-sm border-green-200">
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-green-600 mb-2">{stats.activeProjects}</div>
                <div className="text-sm text-gray-600">Active Projects</div>
              </CardContent>
            </Card>
            <Card className="text-center bg-white/70 backdrop-blur-sm border-yellow-200">
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-yellow-600 mb-2">{stats.countiesReached}</div>
                <div className="text-sm text-gray-600">Counties Reached</div>
              </CardContent>
            </Card>
            <Card className="text-center bg-white/70 backdrop-blur-sm border-blue-200">
              <CardContent className="pt-6">
                <div className="text-3xl font-bold text-blue-600 mb-2">{stats.eventsOrganized}</div>
                <div className="text-sm text-gray-600">Events Organized</div>
              </CardContent>
            </Card>
          </div>
        </section>
      )}

      {/* Featured Testimonial */}
      {testimonials.length > 0 && (
        <section className="max-w-4xl mx-auto px-4 text-center">
          <Card className="bg-white/80 backdrop-blur-sm border-0 shadow-xl">
            <CardContent className="pt-8 pb-8">
              <div className="flex justify-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 text-yellow-400 fill-current" />
                ))}
              </div>
              <blockquote className="text-xl md:text-2xl text-gray-700 mb-6 italic">
                "{testimonials[0].quote}"
              </blockquote>
              <div className="flex items-center justify-center space-x-4">
                <img
                  src={testimonials[0].image}
                  alt={testimonials[0].name}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div className="text-left">
                  <div className="font-semibold text-gray-900">{testimonials[0].name}, {testimonials[0].age}</div>
                  <div className="text-gray-600">{testimonials[0].location}</div>
                </div>
              </div>
            </CardContent>
          </Card>
        </section>
      )}

      {/* Recent Events */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Upcoming Events</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Join us in making a difference. From environmental cleanups to leadership workshops, 
            there's always something happening in the Trybe.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {recentEvents.map((event) => (
            <Card key={event._id} className="bg-white/80 backdrop-blur-sm hover:shadow-lg transition-shadow">
              <div className="aspect-video relative overflow-hidden rounded-t-lg">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-full object-cover"
                />
                <Badge className="absolute top-4 left-4 bg-red-500">{event.category}</Badge>
              </div>
              <CardHeader>
                <CardTitle className="text-lg">{event.title}</CardTitle>
                <CardDescription>{event.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center text-sm text-gray-600 mb-2">
                  <Calendar className="w-4 h-4 mr-2" />
                  {new Date(event.date).toLocaleDateString()}
                </div>
                <div className="flex items-center text-sm text-gray-600 mb-4">
                  <MapPin className="w-4 h-4 mr-2" />
                  {event.location}
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-sm text-gray-600">
                    {event.participantCount} participants
                  </span>
                  <Badge variant={event.registrationStatus === 'open' ? 'default' : 'secondary'}>
                    {event.registrationStatus}
                  </Badge>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Link to="/events">
            <Button variant="outline" size="lg">
              View All Events
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Recent News */}
      <section className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">Latest News</h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Stay updated with the latest happenings, success stories, and announcements from the Vybe Trybe community.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 mb-8">
          {recentNews.map((article) => (
            <Card key={article._id} className="bg-white/80 backdrop-blur-sm hover:shadow-lg transition-shadow">
              <div className="aspect-video relative overflow-hidden rounded-t-lg">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full h-full object-cover"
                />
                <Badge className="absolute top-4 left-4 bg-green-500">{article.category}</Badge>
              </div>
              <CardHeader>
                <CardTitle className="text-lg line-clamp-2">{article.title}</CardTitle>
                <CardDescription className="line-clamp-3">{article.excerpt}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <span>{article.author.name}</span>
                  <span>{new Date(article.publishedAt).toLocaleDateString()}</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center">
          <Link to="/news">
            <Button variant="outline" size="lg">
              Read More News
              <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-gradient-to-r from-red-600 via-green-600 to-yellow-600 text-white">
        <div className="max-w-4xl mx-auto px-4 py-16 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Make a Difference?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of young Kenyans who are already creating positive change in their communities.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/join">
              <Button size="lg" variant="secondary" className="bg-white text-gray-900 hover:bg-gray-100">
                Become a Member
                <Users className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link to="/get-involved">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                Start Volunteering
                <Target className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}