<<<<<<< HEAD
import { useState } from "react";
import { RestaurantHeader } from "./components/RestaurantHeader";
import { CategoryNavigation } from "./components/CategoryNavigation";
import { MenuItem, MenuItemData } from "./components/MenuItem";
import { MenuItemDetails } from "./components/MenuItemDetails";
import { CartSidebar, CartItem } from "./components/CartSidebar";
import { CheckoutModal } from "./components/CheckoutModal";
import { toast } from "sonner@2.0.3";

// Mock menu data
const categories = [
  { id: 'starters', name: 'Starters', icon: '🥙' },
  { id: 'curries', name: 'Curries', icon: '🍛' },
  { id: 'biryani', name: 'Biryani & Rice', icon: '🍚' },
  { id: 'breads', name: 'Breads', icon: '🫓' },
  { id: 'desserts', name: 'Desserts', icon: '🍮' },
  { id: 'drinks', name: 'Beverages', icon: '☕' },
];

const menuItems: MenuItemData[] = [
  {
    id: '1',
    name: 'Butter Chicken',
    description: 'Tender chicken pieces in rich, creamy tomato curry with aromatic Indian spices, served with basmati rice',
    price: 420,
    image: 'https://images.unsplash.com/photo-1603894584373-5ac82b2ae398?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXR0ZXIlMjBjaGlja2VuJTIwaW5kaWFuJTIwY3Vycnl8ZW58MXx8fHwxNzU5NjY0NTc0fDA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'curries',
    popular: true,
    calories: 485
  },
  {
    id: '2',
    name: 'Samosa (2 pieces)',
    description: 'Crispy golden pastries filled with spiced potatoes and green peas, served with mint and tamarind chutney',
    price: 120,
    image: 'https://images.unsplash.com/photo-1589301773859-bb024d3ad558?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxzYW1vc2ElMjBpbmRpYW4lMjBzbmFja3xlbnwxfHx8fDE3NTk2NjQ1NzZ8MA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'starters',
    vegetarian: true,
    calories: 320
  },
  {
    id: '3',
    name: 'Chicken Biryani',
    description: 'Fragrant basmati rice layered with marinated chicken, saffron, and aromatic spices, served with raita',
    price: 480,
    image: 'https://images.unsplash.com/photo-1666190092689-e3968aa0c32c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxiaXJ5YW5pJTIwcmljZSUyMGluZGlhbiUyMGRpc2h8ZW58MXx8fHwxNzU5NjY0NTc1fDA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'biryani',
    popular: true,
    spicy: true,
    calories: 650
  },
  {
    id: '4',
    name: 'Paneer Tikka',
    description: 'Marinated cottage cheese cubes grilled in tandoor with bell peppers and onions, served with mint chutney',
    price: 350,
    image: 'https://images.unsplash.com/photo-1586981114766-708f09a71e20?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwYW5lZXIlMjB0aWtrYSUyMGluZGlhbiUyMGFwcGV0aXplcnxlbnwxfHx8fDE3NTk2NjQ1Nzl8MA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'starters',
    vegetarian: true,
    spicy: true,
    calories: 280
  },
  {
    id: '5',
    name: 'Masala Dosa',
    description: 'Crispy South Indian crepe filled with spiced potato filling, served with coconut chutney and sambar',
    price: 220,
    image: 'https://images.unsplash.com/photo-1743615467204-8fdaa85ff2db?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYXNhbGElMjBkb3NhJTIwc291dGglMjBpbmRpYW58ZW58MXx8fHwxNzU5NjY0NTc1fDA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'starters',
    vegetarian: true,
    popular: true,
    calories: 380
  },
  {
    id: '6',
    name: 'Gulab Jamun (2 pieces)',
    description: 'Soft, spongy milk solids dumplings soaked in fragrant rose and cardamom flavored sugar syrup',
    price: 160,
    image: 'https://images.unsplash.com/photo-1666190092159-3171cf0fbb12?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxndWxhYiUyMGphbXVuJTIwaW5kaWFuJTIwZGVzc2VydHxlbnwxfHx8fDE3NTk1NjIyNzd8MA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'desserts',
    popular: true,
    vegetarian: true,
    calories: 450
  },
  {
    id: '7',
    name: 'Masala Chai',
    description: 'Traditional Indian spiced tea brewed with cardamom, cinnamon, ginger, and cloves in milk',
    price: 80,
    image: 'https://images.unsplash.com/photo-1609670438772-9cf3afc5052b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtYXNhbGElMjBjaGFpJTIwaW5kaWFuJTIwdGVhfGVufDF8fHx8MTc1OTU2NTg1M3ww&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'drinks',
    vegetarian: true,
    calories: 120
  },
  {
    id: '8',
    name: 'Tandoori Naan',
    description: 'Soft, fluffy bread baked in traditional clay oven, brushed with butter and garnished with coriander',
    price: 60,
    image: 'https://images.unsplash.com/photo-1611107517117-e5f1b0c898bf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx0YW5kb29yJTIwbmFhbiUyMGJyZWFkfGVufDF8fHx8MTc1OTY2NDU3Nnww&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'breads',
    vegetarian: true,
    calories: 280
  },
  {
    id: '9',
    name: 'Dal Tadka',
    description: 'Yellow lentils tempered with cumin, mustard seeds, and curry leaves, finished with fresh coriander',
    price: 280,
    image: 'https://images.unsplash.com/photo-1627366422957-3efa9c6df0fc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkYWwlMjBjdXJyeSUyMGluZGlhbiUyMGxlbnRpbHN8ZW58MXx8fHwxNzU5NjY0NTgwfDA&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'curries',
    vegetarian: true,
    calories: 240
  },
  {
    id: '10',
    name: 'Kulfi',
    description: 'Traditional Indian ice cream made with reduced milk, cardamom, and pistachios, garnished with nuts',
    price: 140,
    image: 'https://images.unsplash.com/photo-1610507039576-2e4d2ea93f9d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxrdWxmaSUyMGluZGlhbiUyMGljZSUyMGNyZWFtfGVufDF8fHx8MTc1OTY2NDU4MHww&ixlib=rb-4.1.0&q=80&w=1080',
    category: 'desserts',
    vegetarian: true,
    calories: 320
=======
import React, { useState } from 'react';
import { HomeScreen } from './components/HomeScreen';
import { DashboardScreen } from './components/DashboardScreen';
import { HabitDetailScreen } from './components/HabitDetailScreen';
import { Navigation } from './components/Navigation';

export type Habit = {
  id: string;
  name: string;
  icon: string;
  color: string;
  streak: number;
  targetCount: number;
  completedToday: boolean;
  completedDates: string[];
  category: 'health' | 'fitness' | 'mindfulness' | 'productivity';
  description: string;
};

export type Screen = 'home' | 'dashboard' | 'detail';

const sampleHabits: Habit[] = [
  {
    id: '1',
    name: 'Drink Water',
    icon: '💧',
    color: 'bg-blue-500',
    streak: 7,
    targetCount: 8,
    completedToday: true,
    completedDates: ['2024-10-01', '2024-10-02', '2024-10-03', '2024-10-04', '2024-10-05'],
    category: 'health',
    description: 'Stay hydrated by drinking 8 glasses of water daily'
  },
  {
    id: '2',
    name: 'Morning Exercise',
    icon: '🏃‍♂️',
    color: 'bg-green-500',
    streak: 12,
    targetCount: 1,
    completedToday: false,
    completedDates: ['2024-10-01', '2024-10-02', '2024-10-04'],
    category: 'fitness',
    description: '30 minutes of morning exercise to start the day energized'
  },
  {
    id: '3',
    name: 'Meditation',
    icon: '🧘‍♀️',
    color: 'bg-purple-500',
    streak: 5,
    targetCount: 1,
    completedToday: true,
    completedDates: ['2024-10-01', '2024-10-03', '2024-10-05'],
    category: 'mindfulness',
    description: '10 minutes of mindfulness meditation for mental clarity'
  },
  {
    id: '4',
    name: 'Read Book',
    icon: '📚',
    color: 'bg-orange-500',
    streak: 3,
    targetCount: 1,
    completedToday: false,
    completedDates: ['2024-10-02', '2024-10-03', '2024-10-04'],
    category: 'productivity',
    description: 'Read for 20 minutes to expand knowledge and improve focus'
  },
  {
    id: '5',
    name: 'Gratitude Journal',
    icon: '📝',
    color: 'bg-pink-500',
    streak: 8,
    targetCount: 1,
    completedToday: true,
    completedDates: ['2024-10-01', '2024-10-02', '2024-10-03', '2024-10-05'],
    category: 'mindfulness',
    description: 'Write down 3 things you are grateful for each day'
>>>>>>> 8b90638 (Initial commit)
  }
];

export default function App() {
<<<<<<< HEAD
  const [activeCategory, setActiveCategory] = useState('starters');
  const [selectedItem, setSelectedItem] = useState<MenuItemData | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [orderType, setOrderType] = useState<'dine-in' | 'takeaway'>('dine-in');

  const filteredItems = menuItems.filter(item => item.category === activeCategory);

  const handleAddToCart = (item: MenuItemData, quantity: number = 1) => {
    setCartItems(prevItems => {
      const existingItem = prevItems.find(cartItem => cartItem.id === item.id);
      if (existingItem) {
        return prevItems.map(cartItem =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: cartItem.quantity + quantity }
            : cartItem
        );
      } else {
        return [...prevItems, { ...item, quantity }];
      }
    });
    toast.success(`${item.name} added to cart`);
  };

  const handleUpdateQuantity = (itemId: string, quantity: number) => {
    if (quantity === 0) {
      handleRemoveItem(itemId);
    } else {
      setCartItems(prevItems =>
        prevItems.map(item =>
          item.id === itemId ? { ...item, quantity } : item
        )
      );
    }
  };

  const handleRemoveItem = (itemId: string) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== itemId));
    toast.success('Item removed from cart');
  };

  const handleItemClick = (item: MenuItemData) => {
    setSelectedItem(item);
    setIsDetailsOpen(true);
  };

  const handleCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const handleConfirmOrder = (orderDetails: any) => {
    console.log('Order confirmed:', orderDetails);
    setCartItems([]);
    toast.success('Order placed successfully!');
  };

  const totalItems = cartItems.reduce((sum, item) => sum + item.quantity, 0);
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  return (
    <div className="min-h-screen bg-background">
      <RestaurantHeader 
        cartItemCount={totalItems}
        onCartClick={() => setIsCartOpen(true)}
      />
      
      <CategoryNavigation
        categories={categories}
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
      />
      
      <main className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-6">
          <h2 className="text-2xl mb-2 capitalize">
            {categories.find(cat => cat.id === activeCategory)?.name}
          </h2>
          <p className="text-muted-foreground">
            {filteredItems.length} items available
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredItems.map((item) => (
            <MenuItem
              key={item.id}
              item={item}
              onAddToCart={handleAddToCart}
              onItemClick={handleItemClick}
            />
          ))}
        </div>
        
        {filteredItems.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No items found in this category.</p>
          </div>
        )}
      </main>
      
      <MenuItemDetails
        item={selectedItem}
        isOpen={isDetailsOpen}
        onClose={() => setIsDetailsOpen(false)}
        onAddToCart={handleAddToCart}
      />
      
      <CartSidebar
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onUpdateQuantity={handleUpdateQuantity}
        onRemoveItem={handleRemoveItem}
        orderType={orderType}
        onOrderTypeChange={setOrderType}
        onCheckout={handleCheckout}
      />
      
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cartItems={cartItems}
        orderType={orderType}
        total={total}
        onConfirmOrder={handleConfirmOrder}
=======
  const [currentScreen, setCurrentScreen] = useState<Screen>('home');
  const [selectedHabit, setSelectedHabit] = useState<Habit | null>(null);
  const [habits, setHabits] = useState<Habit[]>(sampleHabits);

  const toggleHabitCompletion = (habitId: string) => {
    setHabits(prevHabits =>
      prevHabits.map(habit => {
        if (habit.id === habitId) {
          const today = new Date().toISOString().split('T')[0];
          const wasCompleted = habit.completedToday;
          
          return {
            ...habit,
            completedToday: !wasCompleted,
            streak: !wasCompleted ? habit.streak + 1 : Math.max(0, habit.streak - 1),
            completedDates: !wasCompleted 
              ? [...habit.completedDates, today]
              : habit.completedDates.filter(date => date !== today)
          };
        }
        return habit;
      })
    );
  };

  const navigateToDetail = (habit: Habit) => {
    setSelectedHabit(habit);
    setCurrentScreen('detail');
  };

  const renderScreen = () => {
    switch (currentScreen) {
      case 'home':
        return (
          <HomeScreen 
            habits={habits} 
            onToggleHabit={toggleHabitCompletion}
            onViewHabit={navigateToDetail}
          />
        );
      case 'dashboard':
        return (
          <DashboardScreen 
            habits={habits} 
            onToggleHabit={toggleHabitCompletion}
            onViewHabit={navigateToDetail}
          />
        );
      case 'detail':
        return selectedHabit ? (
          <HabitDetailScreen 
            habit={selectedHabit} 
            onToggleHabit={toggleHabitCompletion}
            onBack={() => setCurrentScreen('dashboard')}
          />
        ) : null;
      default:
        return null;
    }
  };

  return (
    <div className="w-full max-w-sm mx-auto bg-background min-h-screen flex flex-col">
      <div className="flex-1 overflow-hidden">
        {renderScreen()}
      </div>
      <Navigation 
        currentScreen={currentScreen} 
        onNavigate={setCurrentScreen} 
>>>>>>> 8b90638 (Initial commit)
      />
    </div>
  );
}