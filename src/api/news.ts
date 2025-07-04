import api from "./api";

export interface NewsArticle {
  _id: string;
  title: string;
  excerpt: string;
  content: string;
  author: {
    name: string;
    bio: string;
    avatar: string;
  };
  category: string;
  publishedAt: string;
  image: string;
  tags: string[];
}

// Description: Get all news articles with optional category filter
// Endpoint: GET /api/news
// Request: { category?: string }
// Response: { articles: NewsArticle[] }
export const getNews = (category?: string) => {
  // Mocking the response
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        articles: [
          {
            _id: "1",
            title:
              "Vybe Tribe Launches Biggest Youth Mobilization Campaign in Kenya",
            excerpt:
              "Over 2,000 young Kenyans join the movement for positive change across all 47 counties.",
            content: `
              <p>In a historic moment for youth empowerment in Kenya, Vybe Tribe has officially launched what is being called the largest youth mobilization campaign in the country's recent history. The campaign, dubbed "One Vybe, One Tribe, One Kenya," has already attracted over 2,000 young participants from all 47 counties.</p>

              <p>The initiative focuses on three core pillars: environmental conservation, political engagement, and creative expression. Through a series of coordinated events, workshops, and community projects, Vybe Tribe aims to create a unified platform where young Kenyans can collaborate regardless of their tribal, political, or socioeconomic backgrounds.</p>

              <p>"We're not just organizing events; we're building a movement," said Sarah Wanjiku, one of the founding members. "Every young person who joins us becomes part of something bigger than themselves – a force for positive change in Kenya."</p>

              <p>The campaign's first major milestone will be the Checheza Mtaani Tournament, scheduled to take place across all 20 constituencies in Nairobi Metropolitan area. This street-level competition will showcase talents in skating, modeling, and dance, with each constituency competing for the ultimate championship.</p>
            `,
            author: {
              name: "James Mwangi",
              bio: "Youth Affairs Correspondent with 5 years of experience covering social movements in Kenya.",
              avatar:
                "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
            },
            category: "News",
            publishedAt: "2024-01-15T10:00:00Z",
            image:
              "https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=800",
            tags: ["Youth", "Mobilization", "Kenya", "Campaign"],
          },
          {
            _id: "2",
            title:
              "Checheza Mtaani: Bringing Competition to Every Street Corner",
            excerpt:
              "The revolutionary tournament that transforms Nairobi constituencies into competitive arenas.",
            content: `
              <p>Checheza Mtaani represents a paradigm shift in how we think about youth competition and community engagement. Unlike traditional tournaments held in centralized venues, this innovative approach brings the competition directly to the streets, making every constituency in Nairobi Metropolitan a battleground for talent and creativity.</p>

              <p>The tournament features three main categories: Skating (including 100m sprint, relay, and 1KM masters), Modeling (streetwear, traditional attire, and freestyle), and Dance (solo, group, and Afro-fusion). What makes it unique is the constituency-based team structure, fostering healthy rivalry and community pride.</p>

              <p>Each of the 20 participating constituencies – from Westlands to Embakasi, from Kasarani to Kibra – will field teams across different age categories (16-20, 21-25, 26-30), ensuring inclusive participation across the youth demographic.</p>

              <p>"We're not just competing for prizes," explains Mary Akinyi, a dance participant from Langata constituency. "We're representing our communities, our streets, our identity. It's about showing that talent exists everywhere in Nairobi."</p>
            `,
            author: {
              name: "Grace Njeri",
              bio: "Sports and Entertainment journalist specializing in youth culture and street competitions.",
              avatar:
                "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150",
            },
            category: "Tournament",
            publishedAt: "2024-01-20T14:30:00Z",
            image:
              "https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800",
            tags: ["Checheza Mtaani", "Tournament", "Nairobi", "Competition"],
          },
          {
            _id: "3",
            title:
              "Environmental Heroes: Youth Leading Climate Action in Mombasa",
            excerpt:
              "Young environmental activists in Mombasa organize massive beach cleanup and tree planting initiative.",
            content: `
              <p>The coastal city of Mombasa witnessed an unprecedented display of youth-led environmental activism last weekend as over 300 young people participated in a comprehensive beach cleanup and tree planting initiative organized by local Vybe Tribe members.</p>

              <p>The event, which took place along Diani Beach and extended to the nearby Shimba Hills, resulted in the collection of over 2 tons of plastic waste and the planting of 500 indigenous trees. The initiative was part of Vybe Tribe's nationwide environmental conservation program.</p>

              <p>"Climate change affects us all, but it will affect our generation the most," said Ahmed Hassan, 24, one of the event organizers. "We can't wait for others to act. We have to be the change we want to see."</p>

              <p>The success of the Mombasa initiative has inspired similar events in other coastal towns, with Malindi and Kilifi already planning their own environmental action days.</p>
            `,
            author: {
              name: "Fatuma Ali",
              bio: "Environmental journalist and climate change advocate based in Mombasa.",
              avatar:
                "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150",
            },
            category: "Environment",
            publishedAt: "2024-01-25T09:15:00Z",
            image:
              "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800",
            tags: ["Environment", "Mombasa", "Climate Action", "Youth"],
          },
        ],
      });
    }, 500);
  });
};

// Description: Get news article by ID
// Endpoint: GET /api/news/:id
// Request: {}
// Response: { article: NewsArticle }
export const getNewsById = (id: string) => {
  // Mocking the response
  return new Promise((resolve) => {
    setTimeout(() => {
      const articles = [
        {
          _id: "1",
          title:
            "Vybe Tribe Launches Biggest Youth Mobilization Campaign in Kenya",
          excerpt:
            "Over 2,000 young Kenyans join the movement for positive change across all 47 counties.",
          content: `
            <p>In a historic moment for youth empowerment in Kenya, Vybe Tribe has officially launched what is being called the largest youth mobilization campaign in the country's recent history. The campaign, dubbed "One Vybe, One Tribe, One Kenya," has already attracted over 2,000 young participants from all 47 counties.</p>

            <p>The initiative focuses on three core pillars: environmental conservation, political engagement, and creative expression. Through a series of coordinated events, workshops, and community projects, Vybe Tribe aims to create a unified platform where young Kenyans can collaborate regardless of their tribal, political, or socioeconomic backgrounds.</p>

            <p>"We're not just organizing events; we're building a movement," said Sarah Wanjiku, one of the founding members. "Every young person who joins us becomes part of something bigger than themselves – a force for positive change in Kenya."</p>

            <p>The campaign's first major milestone will be the Checheza Mtaani Tournament, scheduled to take place across all 20 constituencies in Nairobi Metropolitan area. This street-level competition will showcase talents in skating, modeling, and dance, with each constituency competing for the ultimate championship.</p>
          `,
          author: {
            name: "James Mwangi",
            bio: "Youth Affairs Correspondent with 5 years of experience covering social movements in Kenya.",
            avatar:
              "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
          },
          category: "News",
          publishedAt: "2024-01-15T10:00:00Z",
          image:
            "https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=800",
          tags: ["Youth", "Mobilization", "Kenya", "Campaign"],
        },
      ];
      const article = articles.find((a) => a._id === id) || articles[0];
      resolve({ article });
    }, 500);
  });
};
