import { useEffect, useState } from "react";
import {
  Users,
  Target,
  Heart,
  Lightbulb,
  MapPin,
  Calendar,
} from "lucide-react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function About() {
  const [activeValue, setActiveValue] = useState<string | null>(null);

  const coreValues = [
    {
      id: "unity",
      icon: Users,
      title: "Unity",
      description:
        "Breaking down tribal and social barriers to create one unified Kenyan youth movement.",
      details:
        "We believe that Kenya's strength lies in its diversity. Our unity transcends ethnic, religious, and socioeconomic boundaries, creating a space where every young Kenyan can contribute to national development regardless of their background.",
    },
    {
      id: "youth-power",
      icon: Target,
      title: "Youth Power",
      description:
        "Empowering young people to take leadership roles and drive positive change.",
      details:
        "Young people are not just the leaders of tomorrow - they are the leaders of today. We provide platforms, resources, and opportunities for youth to exercise their power and influence in shaping Kenya's future.",
    },
    {
      id: "collaboration",
      icon: Heart,
      title: "Collaboration",
      description:
        "Working together across communities to achieve common goals.",
      details:
        "No single person or community can solve Kenya's challenges alone. Through collaboration, we pool our diverse skills, perspectives, and resources to create solutions that benefit all Kenyans.",
    },
    {
      id: "consciousness",
      icon: Lightbulb,
      title: "Political Consciousness",
      description:
        "Promoting civic awareness and democratic participation among youth.",
      details:
        "We believe in informed citizenship and active participation in democratic processes. Our programs educate youth about their rights, responsibilities, and the power of their voice in shaping governance.",
    },
  ];

  const timeline = [
    {
      year: "2023",
      month: "March",
      title: "Foundation",
      description:
        "Vybe Tribe was founded by a group of passionate young Kenyans in Nairobi with a vision of unity.",
    },
    {
      year: "2023",
      month: "June",
      title: "First Project",
      description:
        "Launched our first environmental project - Nairobi River Clean-up Initiative.",
    },
    {
      year: "2023",
      month: "September",
      title: "Multi-County Expansion",
      description:
        "Expanded operations to 10 counties with over 500 active members.",
    },
    {
      year: "2023",
      month: "December",
      title: "Political Engagement",
      description:
        "Launched youth voter registration drive across 5 counties, registering over 2,000 new voters.",
    },
    {
      year: "2024",
      month: "January",
      title: "National Recognition",
      description:
        "Reached 2,847 members across all 47 counties and gained national media attention.",
    },
    {
      year: "2024",
      month: "March",
      title: "Checheza Mtaani Launch",
      description:
        "Announced the revolutionary Checheza Mtaani Tournament across Nairobi Metropolitan.",
    },
  ];

  const leadership = [
    {
      name: "Sarah Wanjiku",
      title: "Co-Founder & Executive Director",
      bio: "Environmental activist and community organizer with 5 years of experience in youth mobilization.",
      image:
        "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=300",
    },
    {
      name: "David Kipchoge",
      title: "Co-Founder & Programs Director",
      bio: "Former student leader and political science graduate passionate about civic engagement.",
      image:
        "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300",
    },
    {
      name: "Grace Achieng",
      title: "Community Outreach Manager",
      bio: "Social worker and community development specialist with expertise in grassroots organizing.",
      image:
        "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300",
    },
    {
      name: "Ahmed Hassan",
      title: "Events & Partnerships Coordinator",
      bio: "Event management professional and youth advocate with a background in sports organization.",
      image:
        "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300",
    },
  ];

  return (
    <div className="max-w-7xl mx-auto px-4 py-8 space-y-16">
      {/* Hero Section */}
      <section className="text-center space-y-6">
        <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-red-600 via-green-600 to-yellow-600 bg-clip-text text-transparent">
          About Vybe Tribe
        </h1>
        <p className="text-xl text-gray-600 max-w-3xl mx-auto">
          We are a movement of young Kenyans united by a common vision: to
          create positive change in our communities while celebrating our
          diversity and shared identity as one people.
        </p>
      </section>

      {/* Mission Statement */}
      <section className="relative">
        <div className="absolute inset-0 bg-gradient-to-r from-red-100 via-green-100 to-yellow-100 rounded-3xl" />
        <div className="relative bg-white/80 backdrop-blur-sm rounded-3xl p-8 md:p-12 text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
            Our Mission
          </h2>
          <p className="text-lg md:text-xl text-gray-700 leading-relaxed max-w-4xl mx-auto">
            To mobilize and empower Kenyan youth through a tribeless culture
            that promotes unity, collaboration, and positive social change. We
            create platforms for young people to engage in environmental
            conservation, political participation, creative expression, and
            community development while breaking down barriers that divide us.
          </p>
        </div>
      </section>

      {/* Our Story Timeline */}
      <section className="space-y-8">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Our Journey
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            From a small group of dreamers to a nationwide movement - here's how
            we've grown.
          </p>
        </div>

        <div className="relative">
          <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 h-full w-0.5 bg-gradient-to-b from-red-500 via-green-500 to-yellow-500" />

          <div className="space-y-8">
            {timeline.map((event, index) => (
              <div
                key={index}
                className={`flex items-center ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                <div
                  className={`flex-1 ${
                    index % 2 === 0 ? "md:pr-8" : "md:pl-8"
                  }`}
                >
                  <Card className="bg-white/80 backdrop-blur-sm hover:shadow-lg transition-shadow ml-8 md:ml-0">
                    <CardHeader>
                      <div className="flex items-center space-x-2 mb-2">
                        <Badge
                          variant="outline"
                          className="bg-red-50 text-red-600 border-red-200"
                        >
                          {event.month} {event.year}
                        </Badge>
                      </div>
                      <CardTitle className="text-xl">{event.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600">{event.description}</p>
                    </CardContent>
                  </Card>
                </div>

                <div className="absolute left-4 md:left-1/2 transform md:-translate-x-1/2 w-8 h-8 bg-gradient-to-r from-red-500 to-green-500 rounded-full flex items-center justify-center">
                  <Calendar className="w-4 h-4 text-white" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="space-y-8">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Our Core Values
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            These principles guide everything we do and shape our approach to
            youth empowerment.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {coreValues.map((value) => {
            const IconComponent = value.icon;
            return (
              <Card
                key={value.id}
                className={`cursor-pointer transition-all duration-300 hover:shadow-lg ${
                  activeValue === value.id
                    ? "ring-2 ring-red-500 bg-red-50"
                    : "bg-white/80 backdrop-blur-sm"
                }`}
                onClick={() =>
                  setActiveValue(activeValue === value.id ? null : value.id)
                }
              >
                <CardHeader className="text-center">
                  <div className="mx-auto w-12 h-12 bg-gradient-to-r from-red-500 to-green-500 rounded-full flex items-center justify-center mb-4">
                    <IconComponent className="w-6 h-6 text-white" />
                  </div>
                  <CardTitle className="text-xl">{value.title}</CardTitle>
                  <CardDescription>{value.description}</CardDescription>
                </CardHeader>
                {activeValue === value.id && (
                  <CardContent className="pt-0">
                    <p className="text-sm text-gray-600 leading-relaxed">
                      {value.details}
                    </p>
                  </CardContent>
                )}
              </Card>
            );
          })}
        </div>
      </section>

      {/* Leadership Team */}
      <section className="space-y-8">
        <div className="text-center">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Leadership Team
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Meet the passionate individuals leading the Vybe Tribe movement
            across Kenya.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {leadership.map((leader, index) => (
            <Card
              key={index}
              className="bg-white/80 backdrop-blur-sm hover:shadow-lg transition-shadow text-center"
            >
              <CardHeader>
                <div className="mx-auto w-24 h-24 rounded-full overflow-hidden mb-4">
                  <img
                    src={leader.image}
                    alt={leader.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardTitle className="text-lg">{leader.name}</CardTitle>
                <Badge variant="outline" className="mx-auto">
                  {leader.title}
                </Badge>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">{leader.bio}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Impact Map */}
      <section className="bg-gradient-to-r from-red-50 via-green-50 to-yellow-50 rounded-3xl p-8 md:p-12">
        <div className="text-center mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Our Reach
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Vybe Tribe has grown to become a truly national movement with active
            members and projects across Kenya.
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-6 text-center">
          <div className="space-y-2">
            <div className="text-4xl font-bold text-red-600">47</div>
            <div className="text-gray-600">Counties Reached</div>
          </div>
          <div className="space-y-2">
            <div className="text-4xl font-bold text-green-600">2,847</div>
            <div className="text-gray-600">Active Members</div>
          </div>
          <div className="space-y-2">
            <div className="text-4xl font-bold text-yellow-600">89</div>
            <div className="text-gray-600">Projects Completed</div>
          </div>
        </div>

        <div className="mt-8 text-center">
          <div className="inline-flex items-center space-x-2 text-gray-600">
            <MapPin className="w-5 h-5" />
            <span>Headquarters: Nairobi, Kenya</span>
          </div>
        </div>
      </section>
    </div>
  );
}
