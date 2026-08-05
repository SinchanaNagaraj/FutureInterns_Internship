import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Input } from "./ui/input";
import { Separator } from "./ui/separator";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { Search, Star, MapPin, Clock, MessageCircle, Heart, Eye } from "lucide-react";

interface DesignerProfilesProps {
  isMobile: boolean;
  onViewChange: (view: string, designerId?: number) => void;
}

export function DesignerProfiles({ isMobile, onViewChange }: DesignerProfilesProps) {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDesigner, setSelectedDesigner] = useState<number | null>(null);

  const designers = [
    {
      id: 1,
      name: "Sarah Chen",
      title: "Senior UI/UX Designer",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=64&h=64&fit=crop&crop=face",
      location: "San Francisco, CA",
      rating: 4.9,
      reviewCount: 127,
      hourlyRate: 85,
      completedJobs: 47,
      skills: ["Mobile Design", "Figma", "Prototyping", "User Research", "Design Systems"],
      about: "Passionate UI/UX designer with 6+ years of experience creating intuitive digital experiences. Specialized in mobile app design and user research.",
      portfolio: [
        "https://images.unsplash.com/photo-1587934924167-a3a04e138374?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBkZXNpZ25lciUyMHBvcnRmb2xpb3xlbnwxfHx8fDE3NTk2NzEzMzh8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral",
        "https://images.unsplash.com/photo-1581291518857-4e27b48ff24e?w=300&h=200&fit=crop",
        "https://images.unsplash.com/photo-1558655146-9f40138edfeb?w=300&h=200&fit=crop"
      ],
      availability: "Available now",
      responseTime: "1 hour"
    },
    {
      id: 2,
      name: "Marcus Rodriguez",
      title: "Product Designer",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop&crop=face",
      location: "Austin, TX",
      rating: 4.8,
      reviewCount: 89,
      hourlyRate: 75,
      completedJobs: 62,
      skills: ["Web Design", "Dashboard Design", "Figma", "User Testing", "Wireframing"],
      about: "Product designer focused on creating data-driven solutions. Expert in dashboard design and complex user interfaces.",
      portfolio: [
        "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=300&h=200&fit=crop",
        "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=300&h=200&fit=crop",
        "https://images.unsplash.com/photo-1497032628192-86f99bcd76bc?w=300&h=200&fit=crop"
      ],
      availability: "Available in 2 weeks",
      responseTime: "2 hours"
    },
    {
      id: 3,
      name: "Emily Johnson",
      title: "Mobile App Designer",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=64&h=64&fit=crop&crop=face",
      location: "New York, NY",
      rating: 5.0,
      reviewCount: 156,
      hourlyRate: 90,
      completedJobs: 39,
      skills: ["Mobile Design", "iOS Design", "Android Design", "Prototyping", "Animation"],
      about: "Award-winning mobile app designer with expertise in creating delightful user experiences for iOS and Android platforms.",
      portfolio: [
        "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?w=300&h=200&fit=crop",
        "https://images.unsplash.com/photo-1555774698-0b77e0d5fac6?w=300&h=200&fit=crop",
        "https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=300&h=200&fit=crop"
      ],
      availability: "Available now",
      responseTime: "30 minutes"
    },
    {
      id: 4,
      name: "David Kim",
      title: "UX Researcher & Designer",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop&crop=face",
      location: "Seattle, WA",
      rating: 4.7,
      reviewCount: 94,
      hourlyRate: 80,
      completedJobs: 31,
      skills: ["User Research", "Usability Testing", "Data Analysis", "Wireframing", "Persona Development"],
      about: "UX researcher and designer who combines data-driven insights with creative design to solve complex user problems.",
      portfolio: [
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=300&h=200&fit=crop",
        "https://images.unsplash.com/photo-1551650975-87deedd944c3?w=300&h=200&fit=crop",
        "https://images.unsplash.com/photo-1586953208448-b95a79798f07?w=300&h=200&fit=crop"
      ],
      availability: "Available in 1 week",
      responseTime: "4 hours"
    }
  ];

  const filteredDesigners = designers.filter(designer =>
    designer.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    designer.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    designer.skills.some(skill => skill.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  if (selectedDesigner) {
    const designer = designers.find(d => d.id === selectedDesigner)!;
    
    return (
      <div className="min-h-screen bg-background">
        <div className="max-w-6xl mx-auto px-4 lg:px-6 py-8">
          {/* Back Button */}
          <Button 
            variant="ghost" 
            onClick={() => setSelectedDesigner(null)}
            className="mb-6"
          >
            ← Back to Designers
          </Button>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Profile Info */}
            <div className="lg:col-span-1">
              <Card>
                <CardContent className="p-6 space-y-6">
                  <div className="text-center">
                    <Avatar className="w-24 h-24 mx-auto mb-4">
                      <AvatarImage src={designer.avatar} />
                      <AvatarFallback>{designer.name.slice(0, 2)}</AvatarFallback>
                    </Avatar>
                    <h2 className="text-xl mb-1">{designer.name}</h2>
                    <p className="text-muted-foreground">{designer.title}</p>
                    <div className="flex items-center justify-center gap-1 mt-2">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span>{designer.rating}</span>
                      <span className="text-muted-foreground">({designer.reviewCount})</span>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">{designer.location}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Clock className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">Responds in {designer.responseTime}</span>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Hourly Rate</div>
                      <div className="text-2xl">${designer.hourlyRate}/hr</div>
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">Completed Jobs</div>
                      <div>{designer.completedJobs}</div>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-3">
                    <Button className="w-full">
                      <MessageCircle className="w-4 h-4 mr-2" />
                      Send Message
                    </Button>
                    <Button variant="outline" className="w-full">
                      <Heart className="w-4 h-4 mr-2" />
                      Save Designer
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Portfolio & Details */}
            <div className="lg:col-span-2 space-y-6">
              {/* About */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="mb-4">About</h3>
                  <p className="text-muted-foreground">{designer.about}</p>
                </CardContent>
              </Card>

              {/* Skills */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="mb-4">Skills</h3>
                  <div className="flex flex-wrap gap-2">
                    {designer.skills.map((skill) => (
                      <Badge key={skill} variant="secondary">{skill}</Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Portfolio */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="mb-4">Portfolio</h3>
                  <div className="grid md:grid-cols-2 gap-4">
                    {designer.portfolio.map((image, index) => (
                      <div key={index} className="relative group cursor-pointer">
                        <ImageWithFallback
                          src={image}
                          alt={`Portfolio ${index + 1}`}
                          className="w-full h-48 object-cover rounded-lg"
                        />
                        <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                          <Eye className="w-6 h-6 text-white" />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Reviews */}
              <Card>
                <CardContent className="p-6">
                  <h3 className="mb-4">Recent Reviews</h3>
                  <div className="space-y-4">
                    <div className="border-b pb-4">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="flex">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                        <span className="text-sm text-muted-foreground">by TechCorp</span>
                      </div>
                      <p className="text-sm">"Excellent work on our mobile app redesign. Sarah delivered ahead of schedule and exceeded our expectations."</p>
                    </div>
                    <div className="border-b pb-4">
                      <div className="flex items-center gap-2 mb-2">
                        <div className="flex">
                          {[...Array(4)].map((_, i) => (
                            <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          ))}
                          <Star className="w-4 h-4 text-gray-300" />
                        </div>
                        <span className="text-sm text-muted-foreground">by StartupXYZ</span>
                      </div>
                      <p className="text-sm">"Great communication and solid design skills. Would definitely work with again."</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 lg:px-6 py-8">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl mb-2">Find UI/UX Designers</h1>
            <p className="text-muted-foreground">
              {filteredDesigners.length} talented designers available for your project
            </p>
          </div>
          <div className="relative flex-1 lg:w-96">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search designers, skills..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>

        {/* Designer Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredDesigners.map((designer) => (
            <Card key={designer.id} className="hover:shadow-lg transition-shadow cursor-pointer">
              <CardContent className="p-6">
                <div className="space-y-4">
                  {/* Header */}
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      <Avatar className="w-12 h-12">
                        <AvatarImage src={designer.avatar} />
                        <AvatarFallback>{designer.name.slice(0, 2)}</AvatarFallback>
                      </Avatar>
                      <div>
                        <h3 
                          className="hover:text-primary cursor-pointer"
                          onClick={() => setSelectedDesigner(designer.id)}
                        >
                          {designer.name}
                        </h3>
                        <p className="text-sm text-muted-foreground">{designer.title}</p>
                      </div>
                    </div>
                    <Button variant="ghost" size="sm">
                      <Heart className="w-4 h-4" />
                    </Button>
                  </div>

                  {/* Rating & Location */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="text-sm">{designer.rating}</span>
                      <span className="text-sm text-muted-foreground">
                        ({designer.reviewCount} reviews)
                      </span>
                    </div>
                    <div className="flex items-center gap-1">
                      <MapPin className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">{designer.location}</span>
                    </div>
                  </div>

                  {/* Portfolio Preview */}
                  <div className="grid grid-cols-3 gap-2">
                    {designer.portfolio.slice(0, 3).map((image, index) => (
                      <ImageWithFallback
                        key={index}
                        src={image}
                        alt={`Portfolio ${index + 1}`}
                        className="w-full h-16 object-cover rounded"
                      />
                    ))}
                  </div>

                  {/* Skills */}
                  <div className="flex flex-wrap gap-1">
                    {designer.skills.slice(0, 3).map((skill) => (
                      <Badge key={skill} variant="outline" className="text-xs">{skill}</Badge>
                    ))}
                    {designer.skills.length > 3 && (
                      <Badge variant="outline" className="text-xs">
                        +{designer.skills.length - 3} more
                      </Badge>
                    )}
                  </div>

                  {/* Footer */}
                  <div className="flex justify-between items-center pt-2 border-t">
                    <div>
                      <div className="font-medium">${designer.hourlyRate}/hr</div>
                      <div className="text-xs text-muted-foreground">{designer.availability}</div>
                    </div>
                    <div className="flex gap-2">
                      <Button 
                        size="sm" 
                        variant="outline"
                        onClick={() => onViewChange('messages')}
                      >
                        Message
                      </Button>
                      <Button 
                        size="sm"
                        onClick={() => setSelectedDesigner(designer.id)}
                      >
                        View Profile
                      </Button>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
}