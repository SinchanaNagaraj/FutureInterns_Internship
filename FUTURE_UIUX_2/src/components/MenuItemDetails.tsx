import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Minus, Plus, Star } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { MenuItemData } from "./MenuItem";
import { useState } from "react";

interface MenuItemDetailsProps {
  item: MenuItemData | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToCart: (item: MenuItemData, quantity: number) => void;
}

export function MenuItemDetails({ item, isOpen, onClose, onAddToCart }: MenuItemDetailsProps) {
  const [quantity, setQuantity] = useState(1);

  if (!item) return null;

  const handleAddToCart = () => {
    onAddToCart(item, quantity);
    setQuantity(1);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="space-y-4">
          <ImageWithFallback
            src={item.image}
            alt={item.name}
            className="w-full h-64 object-cover rounded-lg"
          />
          
          <DialogHeader>
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <DialogTitle className="text-xl">{item.name}</DialogTitle>
                <div className="flex gap-2 mt-2">
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
              <span className="text-2xl font-semibold">₹{item.price.toFixed(0)}</span>
            </div>
          </DialogHeader>
          
          <div className="space-y-4">
            <div>
              <p className="text-muted-foreground">{item.description}</p>
              {item.calories && (
                <p className="text-sm text-muted-foreground mt-2">
                  Calories: {item.calories}
                </p>
              )}
            </div>
            
            <div className="flex items-center gap-2">
              <div className="flex items-center text-yellow-500">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    className={`w-4 h-4 ${i < 4 ? 'fill-current' : ''}`}
                  />
                ))}
              </div>
              <span className="text-sm text-muted-foreground">4.2 (127 reviews)</span>
            </div>
            
            <div className="bg-muted/50 p-4 rounded-lg">
              <h4 className="font-medium mb-2">Ingredients & Allergens</h4>
              <p className="text-sm text-muted-foreground">
                Contains: Wheat, Dairy, Eggs. May contain traces of nuts and soy.
              </p>
            </div>
            
            <div className="flex items-center justify-between pt-4 border-t">
              <div className="flex items-center gap-4">
                <span className="font-medium">Quantity:</span>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    disabled={quantity <= 1}
                  >
                    <Minus className="w-4 h-4" />
                  </Button>
                  <span className="w-8 text-center">{quantity}</span>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    <Plus className="w-4 h-4" />
                  </Button>
                </div>
              </div>
              
              <Button onClick={handleAddToCart} className="gap-2">
                Add to Cart - ₹{(item.price * quantity).toFixed(0)}
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}