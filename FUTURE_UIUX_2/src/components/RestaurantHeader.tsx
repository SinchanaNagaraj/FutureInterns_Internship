import { ShoppingCart, MapPin, Clock } from "lucide-react";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";

interface RestaurantHeaderProps {
  cartItemCount: number;
  onCartClick: () => void;
}

export function RestaurantHeader({ cartItemCount, onCartClick }: RestaurantHeaderProps) {
  return (
    <header className="bg-background border-b border-border sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <div>
              <h1 className="text-3xl tracking-tight">Spice Paradise</h1>
              <div className="flex items-center gap-4 mt-1 text-muted-foreground">
                <div className="flex items-center gap-1">
                  <MapPin className="w-4 h-4" />
                  <span className="text-sm">Connaught Place, Delhi</span>
                </div>
                <div className="flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  <span className="text-sm">Open until 11 PM</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-4">
            <Badge variant="outline" className="text-green-600 border-green-200">
              Open Now
            </Badge>
            <Button 
              variant="outline" 
              size="sm" 
              onClick={onCartClick}
              className="relative"
            >
              <ShoppingCart className="w-4 h-4 mr-2" />
              Cart
              {cartItemCount > 0 && (
                <Badge 
                  variant="destructive" 
                  className="absolute -top-2 -right-2 w-5 h-5 flex items-center justify-center p-0 text-xs"
                >
                  {cartItemCount}
                </Badge>
              )}
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
}