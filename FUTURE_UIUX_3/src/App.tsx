import { useState } from "react";
import { useIsMobile } from "./components/ui/use-mobile";
import { Header } from "./components/Header";
import { HomePage } from "./components/HomePage";
import { JobListings } from "./components/JobListings";
import { DesignerProfiles } from "./components/DesignerProfiles";
import { ProposalSubmission } from "./components/ProposalSubmission";
import { Messages } from "./components/Messages";
import { PostJob } from "./components/PostJob";

export default function App() {
  const [currentView, setCurrentView] = useState('home');
  const isMobile = useIsMobile();

  const handleViewChange = (view: string, designerId?: number) => {
    setCurrentView(view);
  };

  const renderCurrentView = () => {
    switch (currentView) {
      case 'home':
        return <HomePage onViewChange={handleViewChange} isMobile={isMobile} />;
      case 'jobs':
        return <JobListings onViewChange={handleViewChange} isMobile={isMobile} />;
      case 'designers':
        return <DesignerProfiles onViewChange={handleViewChange} isMobile={isMobile} />;
      case 'proposal':
        return <ProposalSubmission onViewChange={handleViewChange} isMobile={isMobile} />;
      case 'messages':
        return <Messages isMobile={isMobile} />;
      case 'post-job':
        return <PostJob onViewChange={handleViewChange} isMobile={isMobile} />;
      default:
        return <HomePage onViewChange={handleViewChange} isMobile={isMobile} />;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Header 
        currentView={currentView} 
        onViewChange={handleViewChange} 
        isMobile={isMobile} 
      />
      {renderCurrentView()}
    </div>
  );
}