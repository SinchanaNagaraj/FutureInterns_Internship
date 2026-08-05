import React from 'react';
import { Button } from './ui/button';
import { Home, BarChart3, Plus } from 'lucide-react';
import { Screen } from '../App';

interface NavigationProps {
  currentScreen: Screen;
  onNavigate: (screen: Screen) => void;
}

export function Navigation({ currentScreen, onNavigate }: NavigationProps) {
  const navItems = [
    {
      id: 'home' as Screen,
      label: 'Home',
      icon: Home,
    },
    {
      id: 'dashboard' as Screen,
      label: 'Dashboard', 
      icon: BarChart3,
    },
  ];

  return (
    <div className="bg-background border-t border-border px-4 py-2 safe-area-pb">
      <div className="flex items-center justify-around">
        {navItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentScreen === item.id;
          
          return (
            <Button
              key={item.id}
              variant="ghost"
              size="sm"
              onClick={() => onNavigate(item.id)}
              className={`flex flex-col items-center space-y-1 h-auto py-2 px-3 ${
                isActive 
                  ? 'text-primary bg-primary/5' 
                  : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <Icon className="w-5 h-5" />
              <span className="text-xs">{item.label}</span>
            </Button>
          );
        })}
        
        {/* Add Habit Button */}
        <Button
          size="sm"
          className="flex flex-col items-center space-y-1 h-auto py-2 px-3 rounded-full bg-primary text-primary-foreground"
        >
          <Plus className="w-5 h-5" />
          <span className="text-xs">Add</span>
        </Button>
      </div>
    </div>
  );
}