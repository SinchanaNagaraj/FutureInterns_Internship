import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "./ui/card";
import { Input } from "./ui/input";
import { Textarea } from "./ui/textarea";
import { Label } from "./ui/label";
import { Badge } from "./ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select";
import { Checkbox } from "./ui/checkbox";
import { Calendar } from "./ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";
import { CalendarIcon, Upload, DollarSign, Clock, Star, MapPin } from "lucide-react";
import { format } from "date-fns";

interface ProposalSubmissionProps {
  onViewChange: (view: string) => void;
  isMobile: boolean;
}

export function ProposalSubmission({ onViewChange, isMobile }: ProposalSubmissionProps) {
  const [proposalData, setProposalData] = useState({
    coverLetter: "",
    bidAmount: "",
    timeline: "",
    projectType: "",
    agreedToTerms: false
  });
  const [deliveryDate, setDeliveryDate] = useState<Date>();
  const [attachments, setAttachments] = useState<string[]>([]);

  // Mock job data
  const jobData = {
    title: "E-commerce Mobile App UI/UX Design",
    company: "RetailTech Solutions",
    budget: "$3,000 - $5,000",
    description: "We're looking for a talented UI/UX designer to create a modern, user-friendly mobile app for our e-commerce platform. The app should include product browsing, shopping cart, checkout flow, and user account management.",
    skills: ["Mobile Design", "Figma", "Prototyping", "User Research", "iOS Design"],
    proposals: 8,
    clientInfo: {
      rating: 4.8,
      reviewCount: 23,
      jobsPosted: 15,
      location: "San Francisco, CA"
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle proposal submission
    alert("Proposal submitted successfully!");
    onViewChange('jobs');
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-6xl mx-auto px-4 lg:px-6 py-8">
        {/* Header */}
        <div className="mb-8">
          <Button 
            variant="ghost" 
            onClick={() => onViewChange('jobs')}
            className="mb-4"
          >
            ← Back to Job Listings
          </Button>
          <h1 className="text-3xl mb-2">Submit a Proposal</h1>
          <p className="text-muted-foreground">
            Make your best offer and explain why you're the right fit for this project
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Job Details Sidebar */}
          <div className="lg:col-span-1">
            <Card className="sticky top-8">
              <CardHeader>
                <CardTitle className="text-lg">Job Details</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <h3 className="mb-2">{jobData.title}</h3>
                  <p className="text-sm text-muted-foreground">{jobData.company}</p>
                </div>

                <div>
                  <div className="flex items-center gap-2 mb-2">
                    <DollarSign className="w-4 h-4 text-muted-foreground" />
                    <span className="font-medium">{jobData.budget}</span>
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {jobData.proposals} proposals submitted
                  </div>
                </div>

                <div className="flex flex-wrap gap-2">
                  {jobData.skills.map((skill) => (
                    <Badge key={skill} variant="outline" className="text-xs">
                      {skill}
                    </Badge>
                  ))}
                </div>

                <div className="pt-4 border-t">
                  <h4 className="mb-3">About the Client</h4>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span>{jobData.clientInfo.rating} ({jobData.clientInfo.reviewCount} reviews)</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-muted-foreground" />
                      <span>{jobData.clientInfo.location}</span>
                    </div>
                    <div className="text-muted-foreground">
                      {jobData.clientInfo.jobsPosted} jobs posted
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Proposal Form */}
          <div className="lg:col-span-2">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Cover Letter */}
              <Card>
                <CardHeader>
                  <CardTitle>Cover Letter</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      Describe your approach to this project and explain why you're the best fit.
                    </p>
                    <Textarea
                      placeholder="Hi there! I'm excited about this project because... 

I would approach this by:
1. Understanding your target users and business goals
2. Creating user flows and wireframes for the key features
3. Designing high-fidelity mockups in Figma
4. Building interactive prototypes for testing
5. Iterating based on feedback

My experience includes:
- 5+ years designing mobile apps for e-commerce
- Expert-level Figma skills with design systems
- Experience with user research and testing

I'm confident I can deliver a modern, user-friendly design that will help your business grow. Let's chat about your vision!"
                      rows={10}
                      value={proposalData.coverLetter}
                      onChange={(e) => setProposalData({
                        ...proposalData,
                        coverLetter: e.target.value
                      })}
                      className="resize-none"
                    />
                    <div className="text-sm text-muted-foreground">
                      {proposalData.coverLetter.length} / 5000 characters
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Bid & Timeline */}
              <Card>
                <CardHeader>
                  <CardTitle>Bid & Timeline</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="bidAmount">Your Bid Amount</Label>
                      <div className="relative">
                        <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                        <Input
                          id="bidAmount"
                          type="number"
                          placeholder="3500"
                          value={proposalData.bidAmount}
                          onChange={(e) => setProposalData({
                            ...proposalData,
                            bidAmount: e.target.value
                          })}
                          className="pl-10"
                        />
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        Client's budget: $3,000 - $5,000
                      </p>
                    </div>

                    <div>
                      <Label>Project Type</Label>
                      <Select 
                        value={proposalData.projectType}
                        onValueChange={(value) => setProposalData({
                          ...proposalData,
                          projectType: value
                        })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select project type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="fixed">Fixed Price</SelectItem>
                          <SelectItem value="hourly">Hourly Rate</SelectItem>
                          <SelectItem value="milestone">Milestone-based</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <Label>Project Duration</Label>
                      <Select
                        value={proposalData.timeline}
                        onValueChange={(value) => setProposalData({
                          ...proposalData,
                          timeline: value
                        })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select duration" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="1-2-weeks">1-2 weeks</SelectItem>
                          <SelectItem value="3-4-weeks">3-4 weeks</SelectItem>
                          <SelectItem value="1-2-months">1-2 months</SelectItem>
                          <SelectItem value="2-3-months">2-3 months</SelectItem>
                          <SelectItem value="3-months-plus">3+ months</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label>Expected Delivery Date</Label>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className="w-full justify-start text-left font-normal"
                          >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {deliveryDate ? format(deliveryDate, "PPP") : "Pick a date"}
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={deliveryDate}
                            onSelect={setDeliveryDate}
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Attachments */}
              <Card>
                <CardHeader>
                  <CardTitle>Portfolio & Attachments</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <p className="text-sm text-muted-foreground">
                      Add relevant work samples or documents that showcase your skills for this project.
                    </p>
                    <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                      <Upload className="w-8 h-8 text-muted-foreground mx-auto mb-4" />
                      <p className="text-sm text-muted-foreground mb-2">
                        Drop files here or click to browse
                      </p>
                      <Button variant="outline" size="sm">
                        Choose Files
                      </Button>
                      <p className="text-xs text-muted-foreground mt-2">
                        Supported formats: PDF, JPG, PNG, Figma links (Max 10MB each)
                      </p>
                    </div>
                    {attachments.length > 0 && (
                      <div className="space-y-2">
                        <Label>Attached Files:</Label>
                        {attachments.map((file, index) => (
                          <div key={index} className="flex items-center justify-between p-2 bg-secondary rounded">
                            <span className="text-sm">{file}</span>
                            <Button 
                              variant="ghost" 
                              size="sm"
                              onClick={() => setAttachments(attachments.filter((_, i) => i !== index))}
                            >
                              Remove
                            </Button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>

              {/* Terms & Submit */}
              <Card>
                <CardContent className="pt-6">
                  <div className="space-y-4">
                    <div className="flex items-start space-x-2">
                      <Checkbox 
                        id="terms"
                        checked={proposalData.agreedToTerms}
                        onCheckedChange={(checked) => setProposalData({
                          ...proposalData,
                          agreedToTerms: checked as boolean
                        })}
                      />
                      <label htmlFor="terms" className="text-sm leading-relaxed">
                        I agree to the{" "}
                        <button type="button" className="text-primary hover:underline">
                          Terms of Service
                        </button>{" "}
                        and confirm that all information provided is accurate. I understand that this proposal is binding once accepted by the client.
                      </label>
                    </div>

                    <div className="flex flex-col sm:flex-row gap-3 pt-4 border-t">
                      <Button 
                        type="button" 
                        variant="outline"
                        onClick={() => onViewChange('jobs')}
                        className="flex-1"
                      >
                        Save as Draft
                      </Button>
                      <Button 
                        type="submit"
                        disabled={!proposalData.agreedToTerms || !proposalData.coverLetter || !proposalData.bidAmount}
                        className="flex-1"
                      >
                        Submit Proposal
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}