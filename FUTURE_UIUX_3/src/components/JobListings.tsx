import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Input } from "./ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Checkbox } from "./ui/checkbox";
import { Separator } from "./ui/separator";
import { Search, Filter, Clock, DollarSign, MapPin, Heart } from "lucide-react";

interface JobListingsProps {
  isMobile: boolean;
  onViewChange: (view: string) => void;
}

export function JobListings({ isMobile, onViewChange }: JobListingsProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);

  const jobs = [
    {
      id: 1,
      title: "E-commerce Mobile App UI/UX Design",
      company: "RetailTech Solutions",
      location: "Remote",
      budget: "$3,000 - $5,000",
      type: "Fixed Price",
      duration: "2-3 months",
      description: "We're looking for a talented UI/UX designer to create a modern, user-friendly mobile app for our e-commerce platform. The app should include product browsing, shopping cart, checkout flow, and user account management.",
      skills: ["Mobile Design", "Figma", "Prototyping", "User Research", "iOS Design"],
      posted: "2 hours ago",
      proposals: 8,
      verified: true
    },
    {
      id: 2,
      title: "SaaS Dashboard Redesign",
      company: "DataFlow Analytics",
      location: "Remote",
      budget: "$50 - $75/hr",
      type: "Hourly",
      duration: "1-2 months",
      description: "Looking to completely redesign our analytics dashboard to improve user experience and data visualization. Need someone with strong experience in dashboard design and data presentation.",
      skills: ["Dashboard Design", "Data Visualization", "Figma", "User Testing"],
      posted: "4 hours ago",
      proposals: 12,
      verified: true
    },
    {
      id: 3,
      title: "Website Redesign for Healthcare Platform",
      company: "MedConnect",
      location: "Remote",
      budget: "$2,500 - $4,000",
      type: "Fixed Price",
      duration: "1-2 months",
      description: "Complete website redesign for our healthcare platform. Focus on accessibility, clean design, and improving patient booking flow. Experience with healthcare regulations preferred.",
      skills: ["Web Design", "Accessibility", "Healthcare", "Figma", "Responsive Design"],
      posted: "6 hours ago",
      proposals: 5,
      verified: false
    },
    {
      id: 4,
      title: "Design System Creation for Startup",
      company: "TechStart Inc.",
      location: "Remote",
      budget: "$1,500 - $2,500",
      type: "Fixed Price",
      duration: "3-4 weeks",
      description: "Create a comprehensive design system from scratch including color palette, typography, components, and documentation. Will be used across web and mobile applications.",
      skills: ["Design Systems", "Component Design", "Documentation", "Figma"],
      posted: "1 day ago",
      proposals: 15,
      verified: true
    },
    {
      id: 5,
      title: "Mobile Game UI Design",
      company: "GameStudio",
      location: "Remote",
      budget: "$60 - $90/hr",
      type: "Hourly",
      duration: "2-3 months",
      description: "Design engaging UI for a mobile puzzle game. Need creative, colorful designs that appeal to casual gamers. Experience with game UI is essential.",
      skills: ["Game UI", "Mobile Design", "Illustration", "Animation"],
      posted: "1 day ago",
      proposals: 22,
      verified: true
    },
    {
      id: 6,
      title: "Corporate Website & Branding",
      company: "Professional Services Ltd",
      location: "Remote",
      budget: "$2,000 - $3,500",
      type: "Fixed Price",
      duration: "1-2 months",
      description: "Complete rebrand and website design for professional services company. Need sophisticated, corporate design that builds trust with enterprise clients.",
      skills: ["Web Design", "Branding", "Corporate Design", "Figma"],
      posted: "2 days ago",
      proposals: 9,
      verified: false
    }
  ];

  const skillOptions = [
    "Mobile Design", "Web Design", "Figma", "Prototyping", "User Research",
    "Dashboard Design", "Design Systems", "Accessibility", "Branding", "Game UI"
  ];

  const filteredJobs = jobs.filter(job => 
    job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.company.toLowerCase().includes(searchTerm.toLowerCase()) ||
    job.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 lg:px-6 py-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl mb-2">Find UI/UX Design Jobs</h1>
            <p className="text-muted-foreground">
              {filteredJobs.length} jobs found matching your criteria
            </p>
          </div>
          <div className="flex items-center gap-3">
            <div className="relative flex-1 lg:w-80">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search jobs..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
            <Select>
              <SelectTrigger className="w-40">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Newest First</SelectItem>
                <SelectItem value="budget-high">Highest Budget</SelectItem>
                <SelectItem value="budget-low">Lowest Budget</SelectItem>
                <SelectItem value="proposals">Fewest Proposals</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        <div className="grid lg:grid-cols-4 gap-8">
          {/* Filters Sidebar */}
          {!isMobile && (
            <div className="lg:col-span-1">
              <Card>
                <CardContent className="p-6">
                  <h3 className="mb-4 flex items-center">
                    <Filter className="w-4 h-4 mr-2" />
                    Filters
                  </h3>
                  
                  <div className="space-y-6">
                    {/* Job Type */}
                    <div>
                      <h4 className="mb-3">Job Type</h4>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Checkbox id="hourly" />
                          <label htmlFor="hourly" className="text-sm">Hourly</label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="fixed" />
                          <label htmlFor="fixed" className="text-sm">Fixed Price</label>
                        </div>
                      </div>
                    </div>

                    <Separator />

                    {/* Experience Level */}
                    <div>
                      <h4 className="mb-3">Experience Level</h4>
                      <div className="space-y-2">
                        <div className="flex items-center space-x-2">
                          <Checkbox id="entry" />
                          <label htmlFor="entry" className="text-sm">Entry Level</label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="intermediate" />
                          <label htmlFor="intermediate" className="text-sm">Intermediate</label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox id="expert" />
                          <label htmlFor="expert" className="text-sm">Expert</label>
                        </div>
                      </div>
                    </div>

                    <Separator />

                    {/* Skills */}
                    <div>
                      <h4 className="mb-3">Skills</h4>
                      <div className="space-y-2 max-h-48 overflow-y-auto">
                        {skillOptions.map((skill) => (
                          <div key={skill} className="flex items-center space-x-2">
                            <Checkbox id={skill} />
                            <label htmlFor={skill} className="text-sm">{skill}</label>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          )}

          {/* Job Listings */}
          <div className={isMobile ? "col-span-1" : "lg:col-span-3"}>
            <div className="space-y-4">
              {filteredJobs.map((job) => (
                <Card key={job.id} className="hover:shadow-lg transition-shadow">
                  <CardContent className="p-6">
                    <div className="space-y-4">
                      {/* Header */}
                      <div className="flex justify-between items-start">
                        <div className="space-y-2 flex-1">
                          <div className="flex items-center gap-2">
                            <h3 className="text-xl hover:text-primary cursor-pointer">
                              {job.title}
                            </h3>
                            {job.verified && (
                              <Badge variant="secondary" className="text-xs">
                                Verified Client
                              </Badge>
                            )}
                          </div>
                          <p className="text-muted-foreground">{job.company}</p>
                        </div>
                        <Button variant="ghost" size="sm">
                          <Heart className="w-4 h-4" />
                        </Button>
                      </div>

                      {/* Description */}
                      <p className="text-muted-foreground">{job.description}</p>

                      {/* Skills */}
                      <div className="flex flex-wrap gap-2">
                        {job.skills.map((skill) => (
                          <Badge key={skill} variant="outline">{skill}</Badge>
                        ))}
                      </div>

                      {/* Job Details */}
                      <div className="flex flex-wrap items-center gap-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-1">
                          <DollarSign className="w-4 h-4" />
                          <span>{job.budget}</span>
                          <Badge variant="secondary" className="ml-2 text-xs">
                            {job.type}
                          </Badge>
                        </div>
                        <div className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          <span>{job.duration}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <MapPin className="w-4 h-4" />
                          <span>{job.location}</span>
                        </div>
                      </div>

                      {/* Footer */}
                      <div className="flex justify-between items-center pt-2 border-t">
                        <div className="text-sm text-muted-foreground">
                          Posted {job.posted} • {job.proposals} proposals
                        </div>
                        <Button 
                          onClick={() => onViewChange('proposal')}
                          className="ml-auto"
                        >
                          Submit Proposal
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}