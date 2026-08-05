import { Dialog, DialogContent, DialogHeader, DialogTitle } from "./ui/dialog";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import { Textarea } from "./ui/textarea";
import { Badge } from "./ui/badge";
import { CheckCircle, Clock } from "lucide-react";
import { useState } from "react";
import { CartItem } from "./CartSidebar";

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartItems: CartItem[];
  orderType: 'dine-in' | 'takeaway';
  total: number;
  onConfirmOrder: (orderDetails: any) => void;
}

export function CheckoutModal({ 
  isOpen, 
  onClose, 
  cartItems, 
  orderType, 
  total,
  onConfirmOrder 
}: CheckoutModalProps) {
  const [step, setStep] = useState<'details' | 'confirmation'>('details');
  const [orderDetails, setOrderDetails] = useState({
    customerName: '',
    phone: '',
    tableNumber: orderType === 'dine-in' ? '' : undefined,
    specialInstructions: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onConfirmOrder({
      ...orderDetails,
      items: cartItems,
      orderType,
      total,
      timestamp: new Date().toISOString()
    });
    setStep('confirmation');
  };

  const handleClose = () => {
    setStep('details');
    setOrderDetails({
      customerName: '',
      phone: '',
      tableNumber: orderType === 'dine-in' ? '' : undefined,
      specialInstructions: ''
    });
    onClose();
  };

  if (step === 'confirmation') {
    return (
      <Dialog open={isOpen} onOpenChange={handleClose}>
        <DialogContent className="max-w-md">
          <div className="text-center space-y-4">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
              <CheckCircle className="w-8 h-8 text-green-600" />
            </div>
            <DialogHeader>
              <DialogTitle className="text-xl">Order Confirmed!</DialogTitle>
            </DialogHeader>
            <div className="space-y-2">
              <p className="text-muted-foreground">
                Order #{Math.random().toString(36).substr(2, 9).toUpperCase()}
              </p>
              <Badge variant="outline" className="gap-1">
                <Clock className="w-3 h-3" />
                {orderType === 'dine-in' ? '15-20 minutes' : '10-15 minutes'}
              </Badge>
            </div>
            <div className="bg-muted/50 p-4 rounded-lg text-left">
              <h4 className="font-medium mb-2">Order Summary</h4>
              <div className="space-y-1 text-sm">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex justify-between">
                    <span>{item.quantity}x {item.name}</span>
                    <span>₹{(item.price * item.quantity).toFixed(0)}</span>
                  </div>
                ))}
                <div className="border-t pt-1 mt-2 font-medium flex justify-between">
                  <span>Total</span>
                  <span>₹{total.toFixed(0)}</span>
                </div>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">
              {orderType === 'dine-in' 
                ? 'Your order will be delivered to your table shortly.'
                : 'You will receive a notification when your order is ready for pickup.'
              }
            </p>
            <Button onClick={handleClose} className="w-full">
              Continue Browsing
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Complete Your Order</DialogTitle>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name">Name *</Label>
            <Input
              id="name"
              value={orderDetails.customerName}
              onChange={(e) => setOrderDetails({ ...orderDetails, customerName: e.target.value })}
              placeholder="Your name"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number *</Label>
            <Input
              id="phone"
              type="tel"
              value={orderDetails.phone}
              onChange={(e) => setOrderDetails({ ...orderDetails, phone: e.target.value })}
              placeholder="(555) 123-4567"
              required
            />
          </div>
          
          {orderType === 'dine-in' && (
            <div className="space-y-2">
              <Label htmlFor="table">Table Number</Label>
              <Input
                id="table"
                value={orderDetails.tableNumber || ''}
                onChange={(e) => setOrderDetails({ ...orderDetails, tableNumber: e.target.value })}
                placeholder="e.g., Table 12"
              />
            </div>
          )}
          
          <div className="space-y-2">
            <Label htmlFor="instructions">Special Instructions</Label>
            <Textarea
              id="instructions"
              value={orderDetails.specialInstructions}
              onChange={(e) => setOrderDetails({ ...orderDetails, specialInstructions: e.target.value })}
              placeholder="Any special requests or dietary notes..."
              rows={3}
            />
          </div>
          
          <div className="bg-muted/50 p-4 rounded-lg">
            <h4 className="font-medium mb-2">Order Type</h4>
            <Badge variant="outline">
              {orderType === 'dine-in' ? 'Dine In' : 'Takeaway'}
            </Badge>
            <div className="mt-2 text-sm text-muted-foreground">
              <div className="flex justify-between">
                <span>Total</span>
                <span className="font-medium">₹{total.toFixed(0)}</span>
              </div>
            </div>
          </div>
          
          <div className="flex gap-2">
            <Button type="button" variant="outline" onClick={handleClose} className="flex-1">
              Cancel
            </Button>
            <Button type="submit" className="flex-1">
              Confirm Order
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}