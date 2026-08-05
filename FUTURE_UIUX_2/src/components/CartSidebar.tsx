import { Sheet, SheetContent, SheetHeader, SheetTitle } from "./ui/sheet";
import { Button } from "./ui/button";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { Label } from "./ui/label";
import { Minus, Plus, Trash2 } from "lucide-react";
import { ImageWithFallback } from "./figma/ImageWithFallback";
import { MenuItemData } from "./MenuItem";

export interface CartItem extends MenuItemData {
  quantity: number;
}

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  onUpdateQuantity: (itemId: string, quantity: number) => void;
  onRemoveItem: (itemId: string) => void;
  orderType: 'dine-in' | 'takeaway';
  onOrderTypeChange: (type: 'dine-in' | 'takeaway') => void;
  onCheckout: () => void;
}

export function CartSidebar({ 
  isOpen, 
  onClose, 
  cartItems, 
  onUpdateQuantity, 
  onRemoveItem,
  orderType,
  onOrderTypeChange,
  onCheckout
}: CartSidebarProps) {
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const tax = subtotal * 0.08;
  const total = subtotal + tax;

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-full sm:max-w-lg flex flex-col">
        <SheetHeader>
          <SheetTitle>Your Order</SheetTitle>
        </SheetHeader>
        
        <div className="flex-1 overflow-y-auto space-y-4">
          {cartItems.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-64 text-center">
              <p className="text-muted-foreground">Your cart is empty</p>
              <p className="text-sm text-muted-foreground mt-1">Add items from the menu to get started</p>
            </div>
          ) : (
            <>
              <div className="space-y-4">
                <div>
                  <h3 className="font-medium mb-3">Order Type</h3>
                  <RadioGroup value={orderType} onValueChange={onOrderTypeChange}>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="dine-in" id="dine-in" />
                      <Label htmlFor="dine-in">Dine In</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="takeaway" id="takeaway" />
                      <Label htmlFor="takeaway">Takeaway</Label>
                    </div>
                  </RadioGroup>
                </div>
                
                <Separator />
                
                <div className="space-y-3">
                  <h3 className="font-medium">Items ({cartItems.length})</h3>
                  {cartItems.map((item) => (
                    <div key={item.id} className="flex gap-3 p-3 bg-muted/30 rounded-lg">
                      <ImageWithFallback
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-md flex-shrink-0"
                      />
                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium truncate">{item.name}</h4>
                        <p className="text-sm text-muted-foreground">₹{item.price.toFixed(0)} each</p>
                        <div className="flex items-center justify-between mt-2">
                          <div className="flex items-center gap-2">
                            <Button
                              variant="outline"
                              size="sm"
                              className="h-8 w-8 p-0"
                              onClick={() => onUpdateQuantity(item.id, Math.max(0, item.quantity - 1))}
                            >
                              <Minus className="w-3 h-3" />
                            </Button>
                            <span className="text-sm w-6 text-center">{item.quantity}</span>
                            <Button
                              variant="outline"
                              size="sm"
                              className="h-8 w-8 p-0"
                              onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                            >
                              <Plus className="w-3 h-3" />
                            </Button>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className="font-medium">₹{(item.price * item.quantity).toFixed(0)}</span>
                            <Button
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0 text-destructive hover:text-destructive"
                              onClick={() => onRemoveItem(item.id)}
                            >
                              <Trash2 className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>
        
        {cartItems.length > 0 && (
          <div className="border-t pt-4 space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span>Subtotal</span>
                <span>₹{subtotal.toFixed(0)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>CGST + SGST</span>
                <span>₹{tax.toFixed(0)}</span>
              </div>
              <Separator />
              <div className="flex justify-between font-medium">
                <span>Total</span>
                <span>₹{total.toFixed(0)}</span>
              </div>
            </div>
            
            <Button 
              className="w-full" 
              size="lg"
              onClick={onCheckout}
            >
              {orderType === 'dine-in' ? 'Place Order' : 'Order for Pickup'}
            </Button>
            
            <p className="text-xs text-muted-foreground text-center">
              {orderType === 'dine-in' 
                ? 'Your order will be brought to your table' 
                : 'You will receive a pickup notification'
              }
            </p>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}