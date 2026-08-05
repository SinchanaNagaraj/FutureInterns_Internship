import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Bell, Menu, Search, MessageCircle, Plus } from "lucide-react";

interface HeaderProps {
  currentView: string;
  onViewChange: (view: string) => void;
  isMobile: boolean;
}

export function Header({ currentView, onViewChange, isMobile }: HeaderProps) {
  return (
    <header className="bg-card border-b border-border px-4 lg:px-6 py-4">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-primary-foreground font-bold">D</span>
            </div>
            <span className="font-bold text-xl">DesignCollab</span>
          </div>
        </div>

        {/* Navigation - Desktop */}
        {!isMobile && (
          <nav className="flex items-center space-x-6">
            <button
              onClick={() => onViewChange('home')}
              className={`hover:text-primary transition-colors ${
                currentView === 'home' ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              Home
            </button>
            <button
              onClick={() => onViewChange('jobs')}
              className={`hover:text-primary transition-colors ${
                currentView === 'jobs' ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              Find Work
            </button>
            <button
              onClick={() => onViewChange('designers')}
              className={`hover:text-primary transition-colors ${
                currentView === 'designers' ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              Find Designers
            </button>
            <button
              onClick={() => onViewChange('messages')}
              className={`hover:text-primary transition-colors ${
                currentView === 'messages' ? 'text-primary' : 'text-muted-foreground'
              }`}
            >
              Messages
            </button>
          </nav>
        )}

        {/* Right Actions */}
        <div className="flex items-center space-x-3">
          {!isMobile && (
            <>
              <Button
                variant="outline"
                size="sm"
                onClick={() => onViewChange('post-job')}
              >
                <Plus className="w-4 h-4 mr-2" />
                Post a Job
              </Button>
              <div className="relative">
                <Button variant="ghost" size="sm">
                  <Bell className="w-5 h-5" />
                </Button>
                <Badge className="absolute -top-1 -right-1 w-5 h-5 p-0 flex items-center justify-center text-xs">
                  3
                </Badge>
              </div>
              <Button variant="ghost" size="sm" onClick={() => onViewChange('messages')}>
                <MessageCircle className="w-5 h-5" />
              </Button>
            </>
          )}
          
          <Avatar className="w-8 h-8">
            <AvatarImage src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=32&h=32&fit=crop&crop=face" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>

          {isMobile && (
            <Button variant="ghost" size="sm">
              <Menu className="w-5 h-5" />
            </Button>
          )}
        </div>
      </div>
    </header>
  );
}