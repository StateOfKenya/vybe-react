import api from "./api";

export interface MembershipData {
  personalInfo: {
    fullName: string;
    age: number;
    county: string;
    phone: string;
    email: string;
  };
  interests: string[];
  skills: string[];
  motivation: string;
  participation: string[];
}

export interface MemberStats {
  totalMembers: number;
  activeProjects: number;
  countiesReached: number;
  eventsOrganized: number;
}

// Description: Submit membership application
// Endpoint: POST /api/membership/apply
// Request: MembershipData
// Response: { success: boolean, message: string, memberId: string }
export const submitMembership = (data: MembershipData) => {
  // Mocking the response
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        success: true,
        message:
          "Welcome to Vybe Tribe! Your membership application has been approved.",
        memberId: "VT" + Math.random().toString(36).substr(2, 9).toUpperCase(),
      });
    }, 1500);
  });
};

// Description: Get membership statistics
// Endpoint: GET /api/membership/stats
// Request: {}
// Response: { stats: MemberStats }
export const getMembershipStats = () => {
  // Mocking the response
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        stats: {
          totalMembers: 2847,
          activeProjects: 15,
          countiesReached: 47,
          eventsOrganized: 89,
        },
      });
    }, 500);
  });
};

// Description: Get member testimonials
// Endpoint: GET /api/membership/testimonials
// Request: {}
// Response: { testimonials: Array<{ name: string, age: number, location: string, quote: string, image: string }> }
export const getTestimonials = () => {
  // Mocking the response
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        testimonials: [
          {
            name: "Msee Wanai",
            age: 22,
            location: "Dagoretti South",
            quote:
              "Vybe Tribe gave me a platform to organize a market cleanup in Dagoretti Market. Through this community, I've been able to mobilize over 300 youth for community.",
            image:
              "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150",
          },
          {
            name: "David Kipchoge",
            age: 25,
            location: "Langata",
            quote:
              "The leadership skills I gained through Vybe Tribe helped me start a successful youth mentorship program in my community. We've impacted over 200 young people.",
            image:
              "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150",
          },
          {
            name: "Grace Achieng",
            age: 24,
            location: "Kisumu",
            quote:
              "Being part of Vybe Tribe connected me with like-minded youth across Kenya. Together, we organized the largest voter registration drive in Nyanza region.",
            image:
              "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150",
          },
        ],
      });
    }, 500);
  });
};
