import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Search, Star, TrendingUp, Users, Briefcase } from "lucide-react";

interface HomePageProps {
  onViewChange: (view: string) => void;
  isMobile: boolean;
}

export function HomePage({ onViewChange, isMobile }: HomePageProps) {
  const featuredJobs = [
    {
      id: 1,
      title: "Mobile App Redesign for FinTech Startup",
      budget: "$2,500 - $4,000",
      skills: ["Mobile Design", "Figma", "Prototyping"],
      description: "Looking for an experienced UI/UX designer to redesign our mobile banking app...",
      company: "TechCorp",
      posted: "2 hours ago"
    },
    {
      id: 2,
      title: "E-commerce Website Design System",
      budget: "$1,800 - $3,200",
      skills: ["Design Systems", "Web Design", "Figma"],
      description: "Need a comprehensive design system for our e-commerce platform...",
      company: "ShopFlow",
      posted: "5 hours ago"
    },
    {
      id: 3,
      title: "SaaS Dashboard UX Improvements",
      budget: "$1,200 - $2,000",
      skills: ["Dashboard Design", "User Research", "Wireframing"],
      description: "Optimize user experience for our analytics dashboard...",
      company: "DataViz Pro",
      posted: "1 day ago"
    }
  ];

  const topDesigners = [
    {
      id: 1,
      name: "Sarah Chen",
      title: "Senior UI/UX Designer",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=64&h=64&fit=crop&crop=face",
      rating: 4.9,
      completedJobs: 47,
      hourlyRate: "$85/hr"
    },
    {
      id: 2,
      name: "Marcus Rodriguez",
      title: "Product Designer",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop&crop=face",
      rating: 4.8,
      completedJobs: 62,
      hourlyRate: "$75/hr"
    },
    {
      id: 3,
      name: "Emily Johnson",
      title: "Mobile App Designer",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=64&h=64&fit=crop&crop=face",
      rating: 5.0,
      completedJobs: 39,
      hourlyRate: "$90/hr"
    }
  ];

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-br from-primary/5 to-secondary/10 py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl lg:text-6xl leading-tight">
                Find the perfect
                <span className="text-primary"> UI/UX designer</span> for your project
              </h1>
              <p className="text-xl text-muted-foreground">
                Connect with talented designers who specialize in creating exceptional user experiences. 
                Post your project or browse our pool of verified designers.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Button size="lg" onClick={() => onViewChange('post-job')}>
                  <Briefcase className="w-5 h-5 mr-2" />
                  Post a Project
                </Button>
                <Button variant="outline" size="lg" onClick={() => onViewChange('designers')}>
                  <Users className="w-5 h-5 mr-2" />
                  Browse Designers
                </Button>
              </div>
            </div>
            <div className="relative">
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1521391406205-4a6af174a4c2?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxVSSUyMFVYJTIwZGVzaWduZXIlMjB3b3Jrc3BhY2V8ZW58MXx8fHwxNzU5NjcxMjY2fDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Designer workspace"
                className="rounded-lg shadow-2xl w-full"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-card">
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl lg:text-4xl mb-2">2,847</div>
              <p className="text-muted-foreground">Active Projects</p>
            </div>
            <div className="text-center">
              <div className="text-3xl lg:text-4xl mb-2">1,392</div>
              <p className="text-muted-foreground">Verified Designers</p>
            </div>
            <div className="text-center">
              <div className="text-3xl lg:text-4xl mb-2">98%</div>
              <p className="text-muted-foreground">Client Satisfaction</p>
            </div>
            <div className="text-center">
              <div className="text-3xl lg:text-4xl mb-2">$2.4M+</div>
              <p className="text-muted-foreground">Paid to Designers</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Jobs */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl">Featured Projects</h2>
            <Button variant="outline" onClick={() => onViewChange('jobs')}>
              View All Projects
            </Button>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {featuredJobs.map((job) => (
              <Card key={job.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div>
                      <h3 className="mb-2">{job.title}</h3>
                      <p className="text-muted-foreground text-sm">{job.description}</p>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {job.skills.map((skill) => (
                        <Badge key={skill} variant="secondary">{skill}</Badge>
                      ))}
                    </div>
                    <div className="flex justify-between items-center pt-2">
                      <div className="space-y-1">
                        <div className="font-medium">{job.budget}</div>
                        <div className="text-sm text-muted-foreground">{job.posted}</div>
                      </div>
                      <Button size="sm">Apply Now</Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Top Designers */}
      <section className="py-16 bg-secondary/20">
        <div className="max-w-7xl mx-auto px-4 lg:px-6">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl">Top Rated Designers</h2>
            <Button variant="outline" onClick={() => onViewChange('designers')}>
              View All Designers
            </Button>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {topDesigners.map((designer) => (
              <Card key={designer.id} className="hover:shadow-lg transition-shadow cursor-pointer">
                <CardContent className="p-6">
                  <div className="flex items-start space-x-4">
                    <ImageWithFallback
                      src={designer.avatar}
                      alt={designer.name}
                      className="w-16 h-16 rounded-full object-cover"
                    />
                    <div className="flex-1 space-y-2">
                      <div>
                        <h3 className="text-lg">{designer.name}</h3>
                        <p className="text-muted-foreground text-sm">{designer.title}</p>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm">{designer.rating}</span>
                        <span className="text-sm text-muted-foreground">
                          ({designer.completedJobs} jobs)
                        </span>
                      </div>
                      <div className="flex justify-between items-center">
                        <span className="text-sm font-medium">{designer.hourlyRate}</span>
                        <Button size="sm" variant="outline">Contact</Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}