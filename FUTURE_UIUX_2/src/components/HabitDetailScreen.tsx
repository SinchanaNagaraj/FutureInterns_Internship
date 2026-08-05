import React from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Progress } from './ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Habit } from '../App';
import { 
  ArrowLeft, 
  CheckCircle2, 
  Circle, 
  Calendar, 
  TrendingUp, 
  Target,
  Clock,
  MoreHorizontal,
  Edit,
  Trash2
} from 'lucide-react';

interface HabitDetailScreenProps {
  habit: Habit;
  onToggleHabit: (habitId: string) => void;
  onBack: () => void;
}

export function HabitDetailScreen({ habit, onToggleHabit, onBack }: HabitDetailScreenProps) {
  // Generate weekly calendar for the current week
  const generateWeeklyCalendar = () => {
    const today = new Date();
    const currentWeek = [];
    const startOfWeek = new Date(today.setDate(today.getDate() - today.getDay()));
    
    for (let i = 0; i < 7; i++) {
      const date = new Date(startOfWeek);
      date.setDate(startOfWeek.getDate() + i);
      const dateString = date.toISOString().split('T')[0];
      
      currentWeek.push({
        date: date,
        dateString: dateString,
        dayName: date.toLocaleDateString('en-US', { weekday: 'short' }),
        dayNumber: date.getDate(),
        isCompleted: habit.completedDates.includes(dateString),
        isToday: dateString === new Date().toISOString().split('T')[0]
      });
    }
    
    return currentWeek;
  };

  const weeklyCalendar = generateWeeklyCalendar();
  const completedThisWeek = weeklyCalendar.filter(day => day.isCompleted).length;
  const weeklyProgress = Math.round((completedThisWeek / 7) * 100);

  // Recent activity (last 30 days)
  const getRecentActivity = () => {
    const last30Days = [];
    const today = new Date();
    
    for (let i = 29; i >= 0; i--) {
      const date = new Date(today);
      date.setDate(today.getDate() - i);
      const dateString = date.toISOString().split('T')[0];
      
      last30Days.push({
        date: dateString,
        isCompleted: habit.completedDates.includes(dateString)
      });
    }
    
    return last30Days;
  };

  const recentActivity = getRecentActivity();
  const monthlyCompletionRate = Math.round(
    (recentActivity.filter(day => day.isCompleted).length / 30) * 100
  );

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="flex items-center space-x-4">
        <Button variant="ghost" size="sm" onClick={onBack} className="p-2">
          <ArrowLeft className="w-4 h-4" />
        </Button>
        <div className="flex-1">
          <div className="flex items-center space-x-2">
            <span className="text-2xl">{habit.icon}</span>
            <h1 className="text-xl font-semibold">{habit.name}</h1>
          </div>
          <p className="text-sm text-muted-foreground mt-1">{habit.description}</p>
        </div>
        <Button variant="ghost" size="sm">
          <MoreHorizontal className="w-4 h-4" />
        </Button>
      </div>

      {/* Quick Action */}
      <Card className="p-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <Button
              variant="ghost"
              size="sm"
              className="p-0 h-auto"
              onClick={() => onToggleHabit(habit.id)}
            >
              {habit.completedToday ? (
                <CheckCircle2 className="w-8 h-8 text-green-500" />
              ) : (
                <Circle className="w-8 h-8 text-muted-foreground" />
              )}
            </Button>
            <div>
              <h3 className="font-medium">
                {habit.completedToday ? 'Completed Today!' : 'Mark as Complete'}
              </h3>
              <p className="text-sm text-muted-foreground">
                {habit.completedToday ? 'Great job! Keep it up!' : 'Tap to mark as done'}
              </p>
            </div>
          </div>
          {habit.completedToday && (
            <Badge variant="secondary" className="bg-green-100 text-green-700">
              ✓ Done
            </Badge>
          )}
        </div>
      </Card>

      {/* Stats Overview */}
      <div className="grid grid-cols-3 gap-3">
        <Card className="p-4 text-center">
          <div className="flex items-center justify-center w-8 h-8 bg-orange-100 rounded-full mx-auto mb-2">
            <TrendingUp className="w-4 h-4 text-orange-600" />
          </div>
          <p className="text-xs text-muted-foreground">Current Streak</p>
          <p className="font-semibold">{habit.streak} days</p>
        </Card>
        
        <Card className="p-4 text-center">
          <div className="flex items-center justify-center w-8 h-8 bg-blue-100 rounded-full mx-auto mb-2">
            <Target className="w-4 h-4 text-blue-600" />
          </div>
          <p className="text-xs text-muted-foreground">Total Complete</p>
          <p className="font-semibold">{habit.completedDates.length}</p>
        </Card>
        
        <Card className="p-4 text-center">
          <div className="flex items-center justify-center w-8 h-8 bg-green-100 rounded-full mx-auto mb-2">
            <Calendar className="w-4 h-4 text-green-600" />
          </div>
          <p className="text-xs text-muted-foreground">This Month</p>
          <p className="font-semibold">{monthlyCompletionRate}%</p>
        </Card>
      </div>

      {/* Detailed Tracking */}
      <Tabs defaultValue="weekly" className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="weekly">This Week</TabsTrigger>
          <TabsTrigger value="monthly">Monthly View</TabsTrigger>
        </TabsList>
        
        <TabsContent value="weekly" className="space-y-4">
          <Card className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium">Weekly Progress</h3>
              <Badge variant="outline">{completedThisWeek}/7 days</Badge>
            </div>
            
            <Progress value={weeklyProgress} className="mb-4" />
            
            <div className="grid grid-cols-7 gap-2">
              {weeklyCalendar.map((day, index) => (
                <div key={index} className="text-center">
                  <p className="text-xs text-muted-foreground mb-2">{day.dayName}</p>
                  <div 
                    className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-medium mx-auto ${
                      day.isCompleted 
                        ? 'bg-green-500 text-white' 
                        : day.isToday 
                        ? 'bg-blue-100 text-blue-600 border-2 border-blue-300'
                        : 'bg-muted text-muted-foreground'
                    }`}
                  >
                    {day.dayNumber}
                  </div>
                </div>
              ))}
            </div>
          </Card>
        </TabsContent>
        
        <TabsContent value="monthly" className="space-y-4">
          <Card className="p-4">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-medium">Last 30 Days</h3>
              <Badge variant="outline">{monthlyCompletionRate}% completion</Badge>
            </div>
            
            <div className="grid grid-cols-10 gap-1 mb-4">
              {recentActivity.map((day, index) => (
                <div
                  key={index}
                  className={`w-3 h-3 rounded-sm ${
                    day.isCompleted ? 'bg-green-500' : 'bg-muted'
                  }`}
                  title={`${day.date}: ${day.isCompleted ? 'Completed' : 'Not completed'}`}
                />
              ))}
            </div>
            
            <div className="flex items-center justify-between text-sm text-muted-foreground">
              <span>Less</span>
              <div className="flex items-center space-x-1">
                <div className="w-3 h-3 bg-muted rounded-sm" />
                <div className="w-3 h-3 bg-green-200 rounded-sm" />
                <div className="w-3 h-3 bg-green-400 rounded-sm" />
                <div className="w-3 h-3 bg-green-500 rounded-sm" />
              </div>
              <span>More</span>
            </div>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Action Buttons */}
      <div className="flex space-x-3">
        <Button variant="outline" className="flex-1">
          <Edit className="w-4 h-4 mr-2" />
          Edit Habit
        </Button>
        <Button variant="outline" className="flex-1 text-destructive border-destructive hover:bg-destructive hover:text-destructive-foreground">
          <Trash2 className="w-4 h-4 mr-2" />
          Delete
        </Button>
      </div>
    </div>
  );
}