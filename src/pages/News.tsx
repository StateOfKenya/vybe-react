import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { Calendar, User, ArrowRight, Filter, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { getNews, NewsArticle } from "@/api/news"
import { useToast } from "@/hooks/useToast"

export function News() {
  const [articles, setArticles] = useState<NewsArticle[]>([])
  const [filteredArticles, setFilteredArticles] = useState<NewsArticle[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [categoryFilter, setCategoryFilter] = useState("all")
  const { toast } = useToast()

  const categories = ["News", "Tournament", "Environment", "Politics", "Opinion", "Interview"]

  useEffect(() => {
    const loadNews = async () => {
      try {
        console.log('Loading news articles...')
        const response = await getNews() as any
        setArticles(response.articles)
        setFilteredArticles(response.articles)
        console.log('News articles loaded successfully:', response.articles.length)
      } catch (error: any) {
        console.error('Error loading news:', error)
        toast({
          title: "Error",
          description: error.message || "Failed to load news articles",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    loadNews()
  }, [toast])

  useEffect(() => {
    let filtered = articles

    if (searchTerm) {
      filtered = filtered.filter(article =>
        article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        article.excerpt.toLowerCase().includes(searchTerm.toLowerCase())
      )
    }

    if (categoryFilter && categoryFilter !== "all") {
      filtered = filtered.filter(article => article.category === categoryFilter)
    }

    setFilteredArticles(filtered)
  }, [articles, searchTerm, categoryFilter])

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
          News & Media
        </h1>
        <p className="text-lg text-gray-600 max-w-2xl mx-auto">
          Stay updated with the latest happenings, success stories, and announcements from the Vybe Trybe community.
        </p>
      </div>

      {/* Filters */}
      <Card className="bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Filter className="w-5 h-5" />
            <span>Filter Articles</span>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid md:grid-cols-3 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Search articles..."
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

      {/* Featured Article */}
      {filteredArticles.length > 0 && (
        <Card className="bg-gradient-to-r from-red-50 via-green-50 to-yellow-50 border-0 shadow-xl">
          <div className="grid md:grid-cols-2 gap-6">
            <div className="aspect-video md:aspect-square relative overflow-hidden rounded-l-lg">
              <img
                src={filteredArticles[0].image}
                alt={filteredArticles[0].title}
                className="w-full h-full object-cover"
              />
              <Badge className="absolute top-4 left-4 bg-red-500 text-white">
                Featured Article
              </Badge>
            </div>
            <div className="p-6 flex flex-col justify-center">
              <Badge className="w-fit mb-4 bg-green-100 text-green-700">
                {filteredArticles[0].category}
              </Badge>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">
                {filteredArticles[0].title}
              </h2>
              <p className="text-gray-600 mb-6">
                {filteredArticles[0].excerpt}
              </p>
              <div className="flex items-center space-x-4 mb-6">
                <img
                  src={filteredArticles[0].author.avatar}
                  alt={filteredArticles[0].author.name}
                  className="w-10 h-10 rounded-full object-cover"
                />
                <div>
                  <div className="font-semibold text-gray-900">{filteredArticles[0].author.name}</div>
                  <div className="text-sm text-gray-600">
                    {new Date(filteredArticles[0].publishedAt).toLocaleDateString()}
                  </div>
                </div>
              </div>
              <Link to={`/news/${filteredArticles[0]._id}`}>
                <Button className="w-fit bg-gradient-to-r from-red-500 to-green-500 hover:from-red-600 hover:to-green-600">
                  Read Full Article
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </Card>
      )}

      {/* Articles Grid */}
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-bold text-gray-900">
            All Articles ({filteredArticles.length})
          </h2>
        </div>

        {filteredArticles.length === 0 ? (
          <Card className="text-center py-12 bg-white/80 backdrop-blur-sm">
            <CardContent>
              <Calendar className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-semibold text-gray-900 mb-2">No articles found</h3>
              <p className="text-gray-600 mb-4">
                Try adjusting your filters or check back later for new articles.
              </p>
              <Button variant="outline" onClick={clearFilters}>
                Clear Filters
              </Button>
            </CardContent>
          </Card>
        ) : (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArticles.slice(1).map((article) => (
              <Card key={article._id} className="bg-white/80 backdrop-blur-sm hover:shadow-lg transition-shadow">
                <div className="aspect-video relative overflow-hidden rounded-t-lg">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover"
                  />
                  <Badge className="absolute top-4 left-4 bg-red-500">
                    {article.category}
                  </Badge>
                </div>
                <CardHeader>
                  <CardTitle className="text-lg line-clamp-2">{article.title}</CardTitle>
                  <CardDescription className="line-clamp-3">{article.excerpt}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center space-x-3 mb-4">
                    <img
                      src={article.author.avatar}
                      alt={article.author.name}
                      className="w-8 h-8 rounded-full object-cover"
                    />
                    <div>
                      <div className="text-sm font-medium text-gray-900">{article.author.name}</div>
                      <div className="text-xs text-gray-600">
                        {new Date(article.publishedAt).toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                  <Link to={`/news/${article._id}`}>
                    <Button className="w-full" variant="outline">
                      Read More
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </Link>
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
            Have a Story to Share?
          </h2>
          <p className="text-lg mb-6 opacity-90 max-w-2xl mx-auto">
            We're always looking for inspiring stories from our community members.
            Share your experience and inspire others.
          </p>
          <Link to="/contact">
            <Button size="lg" variant="secondary" className="bg-white text-gray-900 hover:bg-gray-100">
              Submit Your Story
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  )
}