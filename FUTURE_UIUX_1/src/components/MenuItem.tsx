import { Card, CardContent } from "./ui/card";
import { Badge } from "./ui/badge";
import { Button } from "./ui/button";
import { Plus } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";

export interface MenuItemData {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  popular?: boolean;
  spicy?: boolean;
  vegetarian?: boolean;
  calories?: number;
}

interface MenuItemProps {
  item: MenuItemData;
  onAddToCart: (item: MenuItemData) => void;
  onItemClick: (item: MenuItemData) => void;
}

export function MenuItem({ item, onAddToCart, onItemClick }: MenuItemProps) {
  return (
    <Card className="group hover:shadow-lg transition-all duration-200 cursor-pointer">
      <CardContent className="p-0">
        <div className="relative" onClick={() => onItemClick(item)}>
          <ImageWithFallback
            src={item.image}
            alt={item.name}
            className="w-full h-48 object-cover rounded-t-lg"
          />
          <div className="absolute top-2 left-2 flex gap-2">
            {item.popular && (
              <Badge variant="destructive" className="text-xs">
                Popular
              </Badge>
            )}
            {item.vegetarian && (
              <Badge variant="secondary" className="text-xs bg-green-100 text-green-800">
                🌱 Vegetarian
              </Badge>
            )}
            {item.spicy && (
              <Badge variant="secondary" className="text-xs bg-red-100 text-red-800">
                🌶️ Spicy
              </Badge>
            )}
          </div>
        </div>
        
        <div className="p-4">
          <div className="flex justify-between items-start mb-2">
            <div className="flex-1" onClick={() => onItemClick(item)}>
              <h3 className="font-medium line-clamp-1">{item.name}</h3>
              <p className="text-muted-foreground text-sm line-clamp-2 mt-1">
                {item.description}
              </p>
              {item.calories && (
                <p className="text-xs text-muted-foreground mt-1">
                  {item.calories} calories
                </p>
              )}
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <span className="text-lg font-semibold">₹{item.price.toFixed(0)}</span>
            <Button
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                onAddToCart(item);
              }}
              className="gap-1"
            >
              <Plus className="w-4 h-4" />
              Add
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}