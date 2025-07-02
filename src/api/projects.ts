import api from './api';

export interface Project {
  _id: string;
  title: string;
  description: string;
  category: string;
  progress: number;
  volunteerCount: number;
  location: string;
  goals: string[];
  timeline: Array<{
    phase: string;
    status: 'completed' | 'in-progress' | 'pending';
    date: string;
  }>;
  images: string[];
  requirements: string[];
}

// Description: Get all projects with optional category filter
// Endpoint: GET /api/projects
// Request: { category?: string }
// Response: { projects: Project[] }
export const getProjects = (category?: string) => {
  // Mocking the response
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        projects: [
          {
            _id: '1',
            title: 'Nairobi River Clean-Up Initiative',
            description: 'A comprehensive environmental project aimed at restoring the health of Nairobi River through community-driven clean-up efforts and awareness campaigns.',
            category: 'Environment',
            progress: 65,
            volunteerCount: 150,
            location: 'Nairobi River Basin',
            goals: [
              'Remove 10 tons of waste from the river',
              'Plant 500 trees along riverbanks',
              'Educate 1000 community members',
              'Establish 5 waste collection points'
            ],
            timeline: [
              { phase: 'Planning & Mobilization', status: 'completed', date: '2024-01-15' },
              { phase: 'Community Clean-up Drives', status: 'in-progress', date: '2024-02-01' },
              { phase: 'Tree Planting Campaign', status: 'pending', date: '2024-03-01' },
              { phase: 'Sustainability Training', status: 'pending', date: '2024-04-01' }
            ],
            images: [
              'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800',
              'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800'
            ],
            requirements: ['Physical fitness for outdoor work', 'Commitment to environmental causes', 'Weekend availability']
          },
          {
            _id: '2',
            title: 'Youth Voter Registration Drive',
            description: 'Mobilizing young Kenyans to participate in democratic processes through voter registration and civic education.',
            category: 'Politics',
            progress: 40,
            volunteerCount: 85,
            location: '10 Counties Nationwide',
            goals: [
              'Register 5000 new young voters',
              'Conduct 50 civic education sessions',
              'Distribute 10000 information pamphlets',
              'Train 100 peer educators'
            ],
            timeline: [
              { phase: 'Volunteer Training', status: 'completed', date: '2024-01-10' },
              { phase: 'Registration Campaigns', status: 'in-progress', date: '2024-01-20' },
              { phase: 'Civic Education Sessions', status: 'in-progress', date: '2024-02-01' },
              { phase: 'Impact Assessment', status: 'pending', date: '2024-03-15' }
            ],
            images: [
              'https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=800'
            ],
            requirements: ['Strong communication skills', 'Knowledge of Kenyan politics', 'Passion for democracy']
          },
          {
            _id: '3',
            title: 'Creative Arts Workshop Series',
            description: 'Monthly skills development program focusing on various creative arts including music, dance, visual arts, and digital media.',
            category: 'Arts',
            progress: 80,
            volunteerCount: 45,
            location: 'Nairobi Creative Hub',
            goals: [
              'Train 200 young artists',
              'Organize 12 monthly workshops',
              'Create 50 collaborative artworks',
              'Host 2 major exhibitions'
            ],
            timeline: [
              { phase: 'Program Launch', status: 'completed', date: '2023-06-01' },
              { phase: 'Monthly Workshops', status: 'in-progress', date: '2023-07-01' },
              { phase: 'Mid-year Exhibition', status: 'completed', date: '2023-12-15' },
              { phase: 'Final Showcase', status: 'pending', date: '2024-06-01' }
            ],
            images: [
              'https://images.unsplash.com/photo-1513475382585-d06e58bcb0e0?w=800',
              'https://images.unsplash.com/photo-1460661419201-fd4cecdf8a8b?w=800'
            ],
            requirements: ['Creative background or interest', 'Mentoring experience preferred', 'Flexible schedule']
          }
        ]
      });
    }, 500);
  });
};

// Description: Get project details by ID
// Endpoint: GET /api/projects/:id
// Request: {}
// Response: { project: Project }
export const getProjectById = (id: string) => {
  // Mocking the response
  return new Promise((resolve) => {
    setTimeout(() => {
      const projects = [
        {
          _id: '1',
          title: 'Nairobi River Clean-Up Initiative',
          description: 'A comprehensive environmental project aimed at restoring the health of Nairobi River through community-driven clean-up efforts and awareness campaigns.',
          category: 'Environment',
          progress: 65,
          volunteerCount: 150,
          location: 'Nairobi River Basin',
          goals: [
            'Remove 10 tons of waste from the river',
            'Plant 500 trees along riverbanks',
            'Educate 1000 community members',
            'Establish 5 waste collection points'
          ],
          timeline: [
            { phase: 'Planning & Mobilization', status: 'completed', date: '2024-01-15' },
            { phase: 'Community Clean-up Drives', status: 'in-progress', date: '2024-02-01' },
            { phase: 'Tree Planting Campaign', status: 'pending', date: '2024-03-01' },
            { phase: 'Sustainability Training', status: 'pending', date: '2024-04-01' }
          ],
          images: [
            'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800',
            'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?w=800'
          ],
          requirements: ['Physical fitness for outdoor work', 'Commitment to environmental causes', 'Weekend availability']
        }
      ];
      const project = projects.find(p => p._id === id) || projects[0];
      resolve({ project });
    }, 500);
  });
};

// Description: Volunteer for a project
// Endpoint: POST /api/projects/:id/volunteer
// Request: { skills: string[], availability: string, motivation: string }
// Response: { success: boolean, message: string }
export const volunteerForProject = (projectId: string, data: { skills: string[]; availability: string; motivation: string }) => {
  // Mocking the response
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true, message: 'Successfully registered as a volunteer!' });
    }, 1000);
  });
};