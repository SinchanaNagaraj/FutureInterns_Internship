import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Checkbox } from "./ui/checkbox";
import { Badge } from "./ui/badge";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Calendar } from "./ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { CalendarIcon, X, Plus } from "lucide-react";
import { format } from "date-fns";

interface PostJobProps {
  onViewChange: (view: string) => void;
  isMobile: boolean;
}

export function PostJob({ onViewChange, isMobile }: PostJobProps) {
  const [jobData, setJobData] = useState({
    title: "",
    description: "",
    category: "",
    experienceLevel: "",
    projectType: "",
    budgetType: "fixed",
    budgetMin: "",
    budgetMax: "",
    duration: "",
    skills: [] as string[],
    requirements: "",
    attachments: [] as string[]
  });
  const [deadline, setDeadline] = useState<Date>();
  const [skillInput, setSkillInput] = useState("");

  const availableSkills = [
    "UI Design", "UX Design", "Mobile Design", "Web Design", "Figma", 
    "Sketch", "Adobe XD", "Prototyping", "User Research", "Wireframing",
    "Design Systems", "Interaction Design", "Visual Design", "Branding",
    "Dashboard Design", "E-commerce Design", "SaaS Design", "Game UI",
    "Accessibility", "User Testing", "Information Architecture"
  ];

  const addSkill = (skill: string) => {
    if (skill && !jobData.skills.includes(skill)) {
      setJobData({
        ...jobData,
        skills: [...jobData.skills, skill]
      });
      setSkillInput("");
    }
  };

  const removeSkill = (skillToRemove: string) => {
    setJobData({
      ...jobData,
      skills: jobData.skills.filter(skill => skill !== skillToRemove)
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle job posting
    alert("Job posted successfully!");
    onViewChange('jobs');
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-4xl mx-auto px-4 lg:px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <Button 
            variant="ghost" 
            onClick={() => onViewChange('home')}
            className="mb-4"
          >
            ← Back to Home
          </Button>
          <h1 className="text-3xl mb-2">Post a New Project</h1>
          <p className="text-muted-foreground">
            Find the perfect UI/UX designer for your project by providing detailed requirements
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle>Project Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="title">Project Title *</Label>
                <Input
                  id="title"
                  placeholder="e.g., E-commerce Mobile App UI/UX Design"
                  value={jobData.title}
                  onChange={(e) => setJobData({ ...jobData, title: e.target.value })}
                  required
                />
              </div>

              <div>
                <Label htmlFor="category">Category *</Label>
                <Select 
                  value={jobData.category}
                  onValueChange={(value) => setJobData({ ...jobData, category: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select project category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="mobile-app">Mobile App Design</SelectItem>
                    <SelectItem value="web-design">Web Design</SelectItem>
                    <SelectItem value="dashboard">Dashboard Design</SelectItem>
                    <SelectItem value="design-system">Design System</SelectItem>
                    <SelectItem value="branding">Branding & Identity</SelectItem>
                    <SelectItem value="ecommerce">E-commerce Design</SelectItem>
                    <SelectItem value="saas">SaaS Platform Design</SelectItem>
                    <SelectItem value="game-ui">Game UI Design</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label htmlFor="description">Project Description *</Label>
                <Textarea
                  id="description"
                  placeholder="Describe your project in detail. Include your goals, target audience, key features, and any specific requirements..."
                  rows={6}
                  value={jobData.description}
                  onChange={(e) => setJobData({ ...jobData, description: e.target.value })}
                  required
                />
                <p className="text-sm text-muted-foreground mt-1">
                  Be specific about what you need. This helps designers understand your project better.
                </p>
              </div>
            </CardContent>
          </Card>

          {/* Skills & Experience */}
          <Card>
            <CardHeader>
              <CardTitle>Required Skills & Experience</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Required Skills *</Label>
                <div className="space-y-2">
                  <div className="flex gap-2">
                    <Input
                      placeholder="Type a skill and press Enter"
                      value={skillInput}
                      onChange={(e) => setSkillInput(e.target.value)}
                      onKeyPress={(e) => {
                        if (e.key === 'Enter') {
                          e.preventDefault();
                          addSkill(skillInput);
                        }
                      }}
                    />
                    <Button 
                      type="button" 
                      onClick={() => addSkill(skillInput)}
                      disabled={!skillInput}
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                  
                  <div className="flex flex-wrap gap-2">
                    {availableSkills.slice(0, 10).map((skill) => (
                      <Button
                        key={skill}
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => addSkill(skill)}
                        disabled={jobData.skills.includes(skill)}
                      >
                        {skill}
                      </Button>
                    ))}
                  </div>

                  {jobData.skills.length > 0 && (
                    <div className="space-y-2">
                      <Label>Selected Skills:</Label>
                      <div className="flex flex-wrap gap-2">
                        {jobData.skills.map((skill) => (
                          <Badge key={skill} variant="default" className="cursor-pointer">
                            {skill}
                            <X 
                              className="w-3 h-3 ml-1" 
                              onClick={() => removeSkill(skill)}
                            />
                          </Badge>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <div>
                <Label>Experience Level *</Label>
                <RadioGroup
                  value={jobData.experienceLevel}
                  onValueChange={(value) => setJobData({ ...jobData, experienceLevel: value })}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="entry" id="entry" />
                    <label htmlFor="entry" className="flex-1">
                      <div>Entry Level</div>
                      <div className="text-sm text-muted-foreground">
                        New designers looking to build their portfolio
                      </div>
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="intermediate" id="intermediate" />
                    <label htmlFor="intermediate" className="flex-1">
                      <div>Intermediate</div>
                      <div className="text-sm text-muted-foreground">
                        2-5 years of experience with proven track record
                      </div>
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="expert" id="expert" />
                    <label htmlFor="expert" className="flex-1">
                      <div>Expert</div>
                      <div className="text-sm text-muted-foreground">
                        5+ years with extensive portfolio and expertise
                      </div>
                    </label>
                  </div>
                </RadioGroup>
              </div>
            </CardContent>
          </Card>

          {/* Budget & Timeline */}
          <Card>
            <CardHeader>
              <CardTitle>Budget & Timeline</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label>Budget Type *</Label>
                <RadioGroup
                  value={jobData.budgetType}
                  onValueChange={(value) => setJobData({ ...jobData, budgetType: value })}
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="fixed" id="fixed" />
                    <label htmlFor="fixed">Fixed Price Project</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="hourly" id="hourly" />
                    <label htmlFor="hourly">Hourly Rate</label>
                  </div>
                </RadioGroup>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="budgetMin">
                    {jobData.budgetType === 'fixed' ? 'Minimum Budget ($)' : 'Minimum Hourly Rate ($)'}
                  </Label>
                  <Input
                    id="budgetMin"
                    type="number"
                    placeholder="1000"
                    value={jobData.budgetMin}
                    onChange={(e) => setJobData({ ...jobData, budgetMin: e.target.value })}
                  />
                </div>
                <div>
                  <Label htmlFor="budgetMax">
                    {jobData.budgetType === 'fixed' ? 'Maximum Budget ($)' : 'Maximum Hourly Rate ($)'}
                  </Label>
                  <Input
                    id="budgetMax"
                    type="number"
                    placeholder="5000"
                    value={jobData.budgetMax}
                    onChange={(e) => setJobData({ ...jobData, budgetMax: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label>Project Duration</Label>
                  <Select
                    value={jobData.duration}
                    onValueChange={(value) => setJobData({ ...jobData, duration: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select duration" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="1-week">Less than 1 week</SelectItem>
                      <SelectItem value="1-2-weeks">1-2 weeks</SelectItem>
                      <SelectItem value="3-4-weeks">3-4 weeks</SelectItem>
                      <SelectItem value="1-2-months">1-2 months</SelectItem>
                      <SelectItem value="2-3-months">2-3 months</SelectItem>
                      <SelectItem value="3-months-plus">3+ months</SelectItem>
                      <SelectItem value="ongoing">Ongoing</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Project Deadline (Optional)</Label>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="w-full justify-start text-left font-normal"
                      >
                        <CalendarIcon className="mr-2 h-4 w-4" />
                        {deadline ? format(deadline, "PPP") : "Select deadline"}
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0">
                      <Calendar
                        mode="single"
                        selected={deadline}
                        onSelect={setDeadline}
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Additional Requirements */}
          <Card>
            <CardHeader>
              <CardTitle>Additional Requirements</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <Label htmlFor="requirements">Specific Requirements (Optional)</Label>
                <Textarea
                  id="requirements"
                  placeholder="Any specific requirements, preferences, or constraints for the project..."
                  rows={4}
                  value={jobData.requirements}
                  onChange={(e) => setJobData({ ...jobData, requirements: e.target.value })}
                />
              </div>

              <div>
                <Label>Project Preferences</Label>
                <div className="space-y-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="nda" />
                    <label htmlFor="nda" className="text-sm">Require signed NDA</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="portfolio" />
                    <label htmlFor="portfolio" className="text-sm">Must include portfolio samples</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="interview" />
                    <label htmlFor="interview" className="text-sm">Require video interview</label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="milestone" />
                    <label htmlFor="milestone" className="text-sm">Milestone-based payments</label>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Submit */}
          <Card>
            <CardContent className="pt-6">
              <div className="space-y-4">
                <div className="p-4 bg-secondary/50 rounded-lg">
                  <h4 className="mb-2">Review Your Posting</h4>
                  <p className="text-sm text-muted-foreground">
                    Your job will be visible to thousands of talented designers. 
                    Make sure all details are accurate before posting.
                  </p>
                </div>

                <div className="flex flex-col sm:flex-row gap-3">
                  <Button 
                    type="button" 
                    variant="outline"
                    onClick={() => onViewChange('home')}
                    className="flex-1"
                  >
                    Save as Draft
                  </Button>
                  <Button 
                    type="submit"
                    disabled={!jobData.title || !jobData.description || !jobData.category}
                    className="flex-1"
                  >
                    Post Project ($25 posting fee)
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </form>
      </div>
    </div>
  );
}