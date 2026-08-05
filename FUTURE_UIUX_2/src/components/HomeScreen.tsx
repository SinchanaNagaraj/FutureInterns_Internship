import React from 'react';
import { Card } from './ui/card';
import { Progress } from './ui/progress';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Habit } from '../App';
import { CheckCircle2, Circle, TrendingUp, Calendar, Target } from 'lucide-react';

interface HomeScreenProps {
  habits: Habit[];
  onToggleHabit: (habitId: string) => void;
  onViewHabit: (habit: Habit) => void;
}

export function HomeScreen({ habits, onToggleHabit, onViewHabit }: HomeScreenProps) {
  const today = new Date();
  const todayString = today.toLocaleDateString('en-US', { 
    weekday: 'long', 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  });

  const completedToday = habits.filter(habit => habit.completedToday).length;
  const totalHabits = habits.length;
  const completionPercentage = Math.round((completedToday / totalHabits) * 100);

  const todaysHabits = habits.slice(0, 3); // Show first 3 habits on home
  const totalStreak = habits.reduce((sum, habit) => sum + habit.streak, 0);

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="space-y-2">
        <h1 className="text-2xl font-semibold">Good Morning! 👋</h1>
        <p className="text-muted-foreground">{todayString}</p>
      </div>

      {/* Daily Progress */}
      <Card className="p-6 bg-gradient-to-r from-blue-50 to-purple-50 border-0">
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-semibold">Today's Progress</h2>
            <Badge variant="secondary" className="bg-white/50">
              {completedToday}/{totalHabits}
            </Badge>
          </div>
          
          <div className="space-y-2">
            <Progress value={completionPercentage} className="h-3" />
            <p className="text-sm text-muted-foreground">
              {completionPercentage}% of daily habits completed
            </p>
          </div>

          <div className="grid grid-cols-3 gap-4 pt-2">
            <div className="text-center">
              <div className="flex items-center justify-center w-8 h-8 bg-green-100 rounded-full mx-auto mb-1">
                <TrendingUp className="w-4 h-4 text-green-600" />
              </div>
              <p className="text-xs text-muted-foreground">Streak</p>
              <p className="font-semibold">{totalStreak} days</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center w-8 h-8 bg-blue-100 rounded-full mx-auto mb-1">
                <Target className="w-4 h-4 text-blue-600" />
              </div>
              <p className="text-xs text-muted-foreground">Completed</p>
              <p className="font-semibold">{completedToday}</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center w-8 h-8 bg-purple-100 rounded-full mx-auto mb-1">
                <Calendar className="w-4 h-4 text-purple-600" />
              </div>
              <p className="text-xs text-muted-foreground">Total</p>
              <p className="font-semibold">{totalHabits}</p>
            </div>
          </div>
        </div>
      </Card>

      {/* Quick Actions */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <h2 className="text-lg font-semibold">Quick Actions</h2>
          <Button 
            variant="outline" 
            size="sm" 
            onClick={() => onViewHabit(habits[0])}
          >
            View All
          </Button>
        </div>

        <div className="space-y-3">
          {todaysHabits.map((habit) => (
            <Card key={habit.id} className="p-4">
              <div className="flex items-center space-x-4">
                <Button
                  variant="ghost"
                  size="sm"
                  className="p-0 h-auto"
                  onClick={() => onToggleHabit(habit.id)}
                >
                  {habit.completedToday ? (
                    <CheckCircle2 className="w-6 h-6 text-green-500" />
                  ) : (
                    <Circle className="w-6 h-6 text-muted-foreground" />
                  )}
                </Button>

                <div className="flex-1 min-w-0">
                  <div className="flex items-center space-x-2">
                    <span className="text-lg">{habit.icon}</span>
                    <h3 className="font-medium truncate">{habit.name}</h3>
                  </div>
                  
                  <div className="flex items-center space-x-2 mt-1">
                    <Badge variant="outline" className="text-xs">
                      {habit.streak} day streak
                    </Badge>
                    {habit.completedToday && (
                      <Badge variant="secondary" className="text-xs bg-green-100 text-green-700">
                        ✓ Done
                      </Badge>
                    )}
                  </div>
                </div>

                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onViewHabit(habit)}
                  className="text-muted-foreground"
                >
                  View
                </Button>
              </div>
            </Card>
          ))}
        </div>
      </div>

      {/* Motivational Quote */}
      <Card className="p-4 bg-gradient-to-r from-orange-50 to-pink-50 border-0">
        <div className="text-center space-y-2">
          <p className="text-sm italic text-muted-foreground">
            "Success is the sum of small efforts repeated day in and day out."
          </p>
          <p className="text-xs text-muted-foreground">— Robert Collier</p>
        </div>
      </Card>
    </div>
  );
}