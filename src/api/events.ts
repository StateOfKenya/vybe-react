import api from './api';

export interface Event {
  _id: string;
  title: string;
  description: string;
  date: string;
  location: string;
  category: string;
  participantCount: number;
  registrationStatus: 'open' | 'closed' | 'full';
  image: string;
  county: string;
}

export interface TournamentRegistration {
  personalDetails: {
    fullName: string;
    age: number;
    email: string;
    phone: string;
    constituency: string;
  };
  competitions: string[];
  teamName?: string;
  emergencyContact: {
    name: string;
    phone: string;
  };
}

// Description: Get all events with optional filters
// Endpoint: GET /api/events
// Request: { category?: string, county?: string, dateFrom?: string, dateTo?: string }
// Response: { events: Event[] }
export const getEvents = (filters?: { category?: string; county?: string; dateFrom?: string; dateTo?: string }) => {
  // Mocking the response
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        events: [
          {
            _id: '1',
            title: 'Nairobi River Clean-Up Drive',
            description: 'Join us for a massive environmental conservation effort along Nairobi River',
            date: '2024-02-15',
            location: 'Nairobi River Banks',
            category: 'Environment',
            participantCount: 245,
            registrationStatus: 'open',
            image: 'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800',
            county: 'Nairobi'
          },
          {
            _id: '2',
            title: 'Youth Leadership Workshop',
            description: 'Develop your leadership skills and learn how to make a difference in your community',
            date: '2024-02-20',
            location: 'KICC, Nairobi',
            category: 'Workshop',
            participantCount: 89,
            registrationStatus: 'open',
            image: 'https://images.unsplash.com/photo-1517048676732-d65bc937f952?w=800',
            county: 'Nairobi'
          },
          {
            _id: '3',
            title: 'Checheza Mtaani Tournament 2024',
            description: 'The biggest street competition showcasing talent from every corner of Nairobi',
            date: '2024-03-01',
            location: 'Various Constituencies, Nairobi',
            category: 'Competition',
            participantCount: 1250,
            registrationStatus: 'open',
            image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=800',
            county: 'Nairobi'
          }
        ]
      });
    }, 500);
  });
};

// Description: Register for an event
// Endpoint: POST /api/events/register
// Request: { eventId: string, participantData: any }
// Response: { success: boolean, message: string }
export const registerForEvent = (data: { eventId: string; participantData: any }) => {
  // Mocking the response
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ success: true, message: 'Successfully registered for the event!' });
    }, 1000);
  });
};

// Description: Register for Checheza Mtaani Tournament
// Endpoint: POST /api/events/checheza-mtaani/register
// Request: TournamentRegistration
// Response: { success: boolean, message: string, registrationId: string }
export const registerForTournament = (data: TournamentRegistration) => {
  // Mocking the response
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({ 
        success: true, 
        message: 'Successfully registered for Checheza Mtaani Tournament!',
        registrationId: 'CM2024-' + Math.random().toString(36).substr(2, 9).toUpperCase()
      });
    }, 1500);
  });
};

// Description: Get tournament standings by constituency
// Endpoint: GET /api/events/checheza-mtaani/standings
// Request: {}
// Response: { standings: Array<{ constituency: string, points: number, participants: number, categories: string[] }> }
export const getTournamentStandings = () => {
  // Mocking the response
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        standings: [
          { constituency: 'Westlands', points: 245, participants: 89, categories: ['Dance', 'Skating', 'Modelling'] },
          { constituency: 'Kasarani', points: 230, participants: 76, categories: ['Dance', 'Skating'] },
          { constituency: 'Embakasi East', points: 215, participants: 92, categories: ['Modelling', 'Dance'] },
          { constituency: 'Langata', points: 200, participants: 65, categories: ['Skating', 'Dance'] },
          { constituency: 'Kibra', points: 185, participants: 58, categories: ['Dance', 'Modelling'] }
        ]
      });
    }, 500);
  });
};