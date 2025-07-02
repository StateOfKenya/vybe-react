import { useEffect, useState } from "react"
import { useParams, Link } from "react-router-dom"
import { ArrowLeft, Calendar, User, Share2, Facebook, Twitter, Linkedin } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { getNewsById, NewsArticle } from "@/api/news"
import { useToast } from "@/hooks/useToast"

export function NewsDetail() {
  const { id } = useParams<{ id: string }>()
  const [article, setArticle] = useState<NewsArticle | null>(null)
  const [loading, setLoading] = useState(true)
  const { toast } = useToast()

  useEffect(() => {
    const loadArticle = async () => {
      if (!id) return

      try {
        console.log('Loading article details for ID:', id)
        const response = await getNewsById(id) as any
        setArticle(response.article)
        console.log('Article details loaded successfully')
      } catch (error: any) {
        console.error('Error loading article:', error)
        toast({
          title: "Error",
          description: error.message || "Failed to load article",
          variant: "destructive",
        })
      } finally {
        setLoading(false)
      }
    }

    loadArticle()
  }, [id, toast])

  const handleShare = (platform: string) => {
    const url = window.location.href
    const title = article?.title || "Vybe Trybe News"
    
    let shareUrl = ""
    switch (platform) {
      case "facebook":
        shareUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`
        break
      case "twitter":
        shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`
        break
      case "linkedin":
        shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`
        break
    }
    
    if (shareUrl) {
      window.open(shareUrl, '_blank', 'width=600,height=400')
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

  if (!article) {
    return (
      <div className="max-w-4xl mx-auto px-4 py-8 text-center">
        <h1 className="text-2xl font-bold text-gray-900 mb-4">Article Not Found</h1>
        <p className="text-gray-600 mb-6">The article you're looking for doesn't exist or has been removed.</p>
        <Link to="/news">
          <Button>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to News
          </Button>
        </Link>
      </div>
    )
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-8">
      {/* Back Button */}
      <Link to="/news">
        <Button variant="ghost" className="mb-4">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to News
        </Button>
      </Link>

      {/* Article Header */}
      <div className="space-y-6">
        <div className="space-y-4">
          <Badge className="bg-red-500 text-white">{article.category}</Badge>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900 leading-tight">
            {article.title}
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed">
            {article.excerpt}
          </p>
        </div>

        {/* Article Meta */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div className="flex items-center space-x-4">
            <img
              src={article.author.avatar}
              alt={article.author.name}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <div className="font-semibold text-gray-900">{article.author.name}</div>
              <div className="text-sm text-gray-600">{article.author.bio}</div>
            </div>
          </div>
          <div className="flex items-center space-x-4 text-sm text-gray-600">
            <div className="flex items-center space-x-1">
              <Calendar className="w-4 h-4" />
              <span>{new Date(article.publishedAt).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}</span>
            </div>
          </div>
        </div>

        <Separator />
      </div>

      {/* Featured Image */}
      <div className="aspect-video relative overflow-hidden rounded-lg">
        <img
          src={article.image}
          alt={article.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Article Content */}
      <Card className="bg-white/80 backdrop-blur-sm">
        <CardContent className="pt-8">
          <div 
            className="prose prose-lg max-w-none text-gray-700 leading-relaxed"
            dangerouslySetInnerHTML={{ __html: article.content }}
          />
        </CardContent>
      </Card>

      {/* Tags */}
      {article.tags && article.tags.length > 0 && (
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-900">Tags</h3>
          <div className="flex flex-wrap gap-2">
            {article.tags.map((tag) => (
              <Badge key={tag} variant="outline" className="bg-gray-50">
                {tag}
              </Badge>
            ))}
          </div>
        </div>
      )}

      {/* Share Section */}
      <Card className="bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center space-x-2">
            <Share2 className="w-5 h-5" />
            <span>Share This Article</span>
          </CardTitle>
          <CardDescription>
            Help spread the word about this story
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex space-x-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleShare('facebook')}
              className="flex items-center space-x-2"
            >
              <Facebook className="w-4 h-4" />
              <span>Facebook</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleShare('twitter')}
              className="flex items-center space-x-2"
            >
              <Twitter className="w-4 h-4" />
              <span>Twitter</span>
            </Button>
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleShare('linkedin')}
              className="flex items-center space-x-2"
            >
              <Linkedin className="w-4 h-4" />
              <span>LinkedIn</span>
            </Button>
          </div>
        </CardContent>
      </Card>

      {/* Author Bio */}
      <Card className="bg-gradient-to-r from-red-50 via-green-50 to-yellow-50 border-0">
        <CardContent className="pt-6">
          <div className="flex items-start space-x-4">
            <img
              src={article.author.avatar}
              alt={article.author.name}
              className="w-16 h-16 rounded-full object-cover flex-shrink-0"
            />
            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">
                About {article.author.name}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {article.author.bio}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Call to Action */}
      <Card className="bg-gradient-to-r from-red-600 via-green-600 to-yellow-600 text-white border-0">
        <CardContent className="text-center py-8">
          <h2 className="text-xl md:text-2xl font-bold mb-4">
            Stay Updated with Vybe Trybe
          </h2>
          <p className="mb-6 opacity-90">
            Don't miss out on the latest news and updates from our community.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/join">
              <Button size="lg" variant="secondary" className="bg-white text-gray-900 hover:bg-gray-100">
                Join the Trybe
              </Button>
            </Link>
            <Link to="/news">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                Read More News
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}