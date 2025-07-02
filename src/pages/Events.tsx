import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { Calendar, MapPin, Users, Filter, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { getEvents, Event } from "@/api/events"
import { useToast } from "@/hooks/useToast"

export function Events() {
  const [events, setEvents] = useState<Event[]>([])
  const [filteredEvents, setFilteredEvents] = useState<Event[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const [countyFilter, setCountyFilter] = useState("all")
  const { toast } = useToast()

  const categories = ["Environment", "Workshop", "Competition", "Rally", "Arts", "Politics", "Health"]
  const counties = ["Nairobi", "Mombasa", "Kisumu", "Nakuru", "Eldoret", "Meru", "Nyeri", "Machakos"]

  useEffect(() => {
    const loadEvents = async () => {
      try {
        console.log('Loading events...')
        const response = await getEvents() as any
        setEvents(response.events)
        setFilteredEvents(response.events)
        console.log('Events loaded successfully:', response.events.length)
      } catch (error: any) {
        console.error('Error loading events:', error)
        toast({
          title: "Error",
          description: error.message || "Failed to load events",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    loadEvents()
  }, [toast])

  useEffect(() => {
    let filtered = events

    if (searchTerm) {
      filtered = filtered.filter(event =>
        event.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.description.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    if (categoryFilter && categoryFilter !== "all") {
      filtered = filtered.filter(event => event.category === categoryFilter)
    }

    if (countyFilter && countyFilter !== "all") {
      filtered = filtered.filter(event => event.county === countyFilter)
    }

    setFilteredEvents(filtered)
  }, [events, searchTerm, categoryFilter, countyFilter])

  const clearFilters = () => {
    setSearchTerm("")
    setCategoryFilter("all")
    setCountyFilter("all")
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
          Upcoming Events
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Join us in making a difference. From environmental cleanups to leadership workshops,
          there's always something happening in the Trybe.
        </p>
      </div>

      {/* Filters */}
      <Card className="bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Filter className="w-5 h-5" />
            <span>Filter Events</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-4 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search events..."
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

            <Select value={countyFilter} onValueChange={setCountyFilter}>
              <SelectTrigger>
                <SelectValue placeholder="All Counties" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All Counties</SelectItem>
                {counties.map((county) => (
                  <SelectItem key={county} value={county}>
                    {county}
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

      {/* Featured Event */}
      {filteredEvents.length > 0 && (
        <Card className="bg-gradient-to-r from-red-50 via-green-50 to-yellow-50 border-0 shadow-xl">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="aspect-video md:aspect-square relative overflow-hidden rounded-l-lg">
              <img
                src={filteredEvents[0].image}
                alt={filteredEvents[0].title}
                className="w-full h-full object-cover"
              />
              <Badge className="absolute top-4 left-4 bg-red-500 text-white">
                Featured Event
              </Badge>
            </div>
            <div className="p-6 flex flex-col justify-center">
              <Badge className="w-fit mb-4 bg-green-100 text-green-700">
                {filteredEvents[0].category}
              </Badge>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                {filteredEvents[0].title}
              </h2>
              <p className="text-gray-600 mb-6">
                {filteredEvents[0].description}
              </p>
              <div className="space-y-3 mb-6">
                <div className="flex items-center text-gray-600">
                  <Calendar className="w-4 h-4 mr-2" />
                  {new Date(filteredEvents[0].date).toLocaleDateString('en-US', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric'
                  })}
                </div>
                <div className="flex items-center text-gray-600">
                  <MapPin className="w-4 h-4 mr-2" />
                  {filteredEvents[0].location}
                </div>
                <div className="flex items-center text-gray-600">
                  <Users className="w-4 h-4 mr-2" />
                  {filteredEvents[0].participantCount} participants registered
                </div>
              </div>
              <Button className="w-fit bg-gradient-to-r from-red-500 to-green-500 hover:from-red-600 hover:to-green-600">
                Register Now
              </Button>
            </div>
          </div>
        </Card>
      )}

      {/* Events Grid */}
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900">
            All Events ({filteredEvents.length})
          </h2>
        </div>

        {filteredEvents.length === 0 ? (
          <Card className="text-center py-12 bg-white/80 backdrop-blur-sm">
            <CardContent>
              <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No events found</h3>
              <p className="text-gray-600 mb-4">
                Try adjusting your filters or check back later for new events.
              </p>
              <Button variant="outline" onClick={clearFilters}>
                Clear Filters
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.slice(1).map((event) => (
              <Card key={event._id} className="bg-white/80 backdrop-blur-sm hover:shadow-lg transition-shadow">
                <div className="aspect-video relative overflow-hidden rounded-t-lg">
                  <img
                    src={event.image}
                    alt={event.title}
                    className="w-full h-full object-cover"
                  />
                  <Badge className="absolute top-4 left-4 bg-red-500">
                    {event.category}
                  </Badge>
                  <Badge 
                    className={`absolute top-4 right-4 ${
                      event.registrationStatus === 'open' 
                        ? 'bg-green-500' 
                        : event.registrationStatus === 'full'
                        ? 'bg-yellow-500'
                        : 'bg-gray-500'
                    }`}
                  >
                    {event.registrationStatus}
                  </Badge>
                </div>
                <CardHeader>
                  <CardTitle className="text-lg line-clamp-2">{event.title}</CardTitle>
                  <CardDescription className="line-clamp-3">{event.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <Calendar className="w-4 h-4 mr-2" />
                      {new Date(event.date).toLocaleDateString()}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <MapPin className="w-4 h-4 mr-2" />
                      {event.location}
                    </div>
                    <div className="flex items-center text-sm text-gray-600">
                      <Users className="w-4 h-4 mr-2" />
                      {event.participantCount} participants
                    </div>
                  </div>
                  <Button 
                    className="w-full" 
                    variant={event.registrationStatus === 'open' ? 'default' : 'secondary'}
                    disabled={event.registrationStatus !== 'open'}
                  >
                    {event.registrationStatus === 'open' ? 'Register' : 
                     event.registrationStatus === 'full' ? 'Event Full' : 'Registration Closed'}
                  </Button>
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
            Want to Organize Your Own Event?
          </h2>
          <p className="text-lg mb-6 opacity-90 max-w-2xl mx-auto">
            Have an idea for a community event? We provide support, resources, and promotion
            to help you make it happen.
          </p>
          <Link to="/get-involved">
            <Button size="lg" variant="secondary" className="bg-white text-gray-900 hover:bg-gray-100">
              Propose an Event
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  )
}