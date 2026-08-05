import React, { useState } from 'react';
import { Card } from './ui/card';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import { Progress } from './ui/progress';
import { Habit } from '../App';
import { CheckCircle2, Circle, Plus, MoreHorizontal, Calendar, TrendingUp } from 'lucide-react';

interface DashboardScreenProps {
  habits: Habit[];
  onToggleHabit: (habitId: string) => void;
  onViewHabit: (habit: Habit) => void;
}

export function DashboardScreen({ habits, onToggleHabit, onViewHabit }: DashboardScreenProps) {
  const [activeTab, setActiveTab] = useState('all');

  const filterHabits = (category: string) => {
    if (category === 'all') return habits;
    return habits.filter(habit => habit.category === category);
  };

  const getCategoryStats = (category: string) => {
    const categoryHabits = filterHabits(category);
    const completed = categoryHabits.filter(h => h.completedToday).length;
    return {
      total: categoryHabits.length,
      completed,
      percentage: categoryHabits.length > 0 ? Math.round((completed / categoryHabits.length) * 100) : 0
    };
  };

  const categories = [
    { id: 'all', name: 'All Habits', icon: '📊' },
    { id: 'health', name: 'Health', icon: '🍎' },
    { id: 'fitness', name: 'Fitness', icon: '💪' },
    { id: 'mindfulness', name: 'Mindfulness', icon: '🧘' },
    { id: 'productivity', name: 'Productivity', icon: '⚡' }
  ];

  const currentCategory = categories.find(cat => cat.id === activeTab);
  const filteredHabits = filterHabits(activeTab);
  const stats = getCategoryStats(activeTab);

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Habit Dashboard</h1>
          <p className="text-muted-foreground">Track your daily progress</p>
        </div>
        <Button size="sm" className="rounded-full">
          <Plus className="w-4 h-4 mr-2" />
          Add Habit
        </Button>
      </div>

      {/* Category Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-5 w-full h-auto p-1">
          {categories.map((category) => (
            <TabsTrigger 
              key={category.id} 
              value={category.id}
              className="flex flex-col items-center p-2 text-xs"
            >
              <span className="text-sm mb-1">{category.icon}</span>
              <span className="truncate">{category.name.split(' ')[0]}</span>
            </TabsTrigger>
          ))}
        </TabsList>

        {/* Category Stats */}
        <Card className="p-4 mt-4">
          <div className="flex items-center justify-between mb-3">
            <h3 className="font-medium">{currentCategory?.name} Progress</h3>
            <Badge variant="outline">
              {stats.completed}/{stats.total}
            </Badge>
          </div>
          <Progress value={stats.percentage} className="mb-2" />
          <p className="text-sm text-muted-foreground">
            {stats.percentage}% completed today
          </p>
        </Card>

        {/* Habits List */}
        <TabsContent value={activeTab} className="space-y-3 mt-4">
          {filteredHabits.length === 0 ? (
            <Card className="p-8 text-center">
              <div className="text-4xl mb-2">🎯</div>
              <h3 className="font-medium mb-1">No habits yet</h3>
              <p className="text-sm text-muted-foreground mb-4">
                Start building healthy habits today!
              </p>
              <Button size="sm">
                <Plus className="w-4 h-4 mr-2" />
                Add Your First Habit
              </Button>
            </Card>
          ) : (
            filteredHabits.map((habit) => (
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
                    <div className="flex items-center space-x-2 mb-1">
                      <span className="text-lg">{habit.icon}</span>
                      <h3 className="font-medium truncate">{habit.name}</h3>
                    </div>
                    
                    <p className="text-sm text-muted-foreground truncate mb-2">
                      {habit.description}
                    </p>

                    <div className="flex items-center space-x-3">
                      <div className="flex items-center space-x-1">
                        <TrendingUp className="w-3 h-3 text-orange-500" />
                        <span className="text-xs text-muted-foreground">
                          {habit.streak} day streak
                        </span>
                      </div>
                      
                      <div className="flex items-center space-x-1">
                        <Calendar className="w-3 h-3 text-blue-500" />
                        <span className="text-xs text-muted-foreground">
                          {habit.completedDates.length} total
                        </span>
                      </div>

                      {habit.completedToday && (
                        <Badge variant="secondary" className="text-xs bg-green-100 text-green-700">
                          ✓ Done
                        </Badge>
                      )}
                    </div>
                  </div>

                  <div className="flex items-center space-x-1">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => onViewHabit(habit)}
                      className="text-muted-foreground"
                    >
                      View
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="p-1 h-auto text-muted-foreground"
                    >
                      <MoreHorizontal className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              </Card>
            ))
          )}
        </TabsContent>
      </Tabs>
    </div>
  );
}