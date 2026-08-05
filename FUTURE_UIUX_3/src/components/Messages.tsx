import { useState } from "react";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import { Input } from "./ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { Separator } from "./ui/separator";
import { Search, Send, Paperclip, Phone, Video, MoreVertical } from "lucide-react";

interface MessagesProps {
  isMobile: boolean;
}

export function Messages({ isMobile }: MessagesProps) {
  const [selectedConversation, setSelectedConversation] = useState(1);
  const [newMessage, setNewMessage] = useState("");

  const conversations = [
    {
      id: 1,
      name: "Sarah Chen",
      avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=64&h=64&fit=crop&crop=face",
      lastMessage: "I've uploaded the wireframes for review. Let me know what you think!",
      timestamp: "2 min ago",
      unread: 2,
      online: true,
      project: "Mobile App Redesign"
    },
    {
      id: 2,
      name: "TechCorp (Marcus)",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop&crop=face",
      lastMessage: "The prototype looks great! Can we schedule a call to discuss the next phase?",
      timestamp: "1 hour ago",
      unread: 0,
      online: false,
      project: "Dashboard Design"
    },
    {
      id: 3,
      name: "Emily Johnson",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=64&h=64&fit=crop&crop=face",
      lastMessage: "Thanks for the feedback. I'll make those adjustments and send the updated designs tomorrow.",
      timestamp: "3 hours ago",
      unread: 0,
      online: true,
      project: "E-commerce Website"
    },
    {
      id: 4,
      name: "StartupXYZ",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop&crop=face",
      lastMessage: "Perfect! Looking forward to seeing the final designs.",
      timestamp: "Yesterday",
      unread: 0,
      online: false,
      project: "Brand Identity"
    }
  ];

  const messages = [
    {
      id: 1,
      sender: "client",
      content: "Hi Sarah! Thanks for your proposal on the mobile app project. I'd like to discuss the timeline and some specific requirements.",
      timestamp: "10:30 AM",
      type: "text"
    },
    {
      id: 2,
      sender: "me",
      content: "Hi! Thank you for considering my proposal. I'd be happy to discuss the details. When would be a good time for a call?",
      timestamp: "10:35 AM",
      type: "text"
    },
    {
      id: 3,
      sender: "client",
      content: "How about this afternoon around 3 PM? Also, I have a few reference apps I'd like to share with you.",
      timestamp: "10:45 AM",
      type: "text"
    },
    {
      id: 4,
      sender: "me",
      content: "3 PM works perfectly! Please feel free to share the references - it will help me understand your vision better.",
      timestamp: "10:50 AM",
      type: "text"
    },
    {
      id: 5,
      sender: "client",
      content: "Great! I'll send you a calendar invite. Here are some apps we like the design of:",
      timestamp: "11:00 AM",
      type: "text"
    },
    {
      id: 6,
      sender: "client",
      content: "reference-apps.pdf",
      timestamp: "11:01 AM",
      type: "file"
    },
    {
      id: 7,
      sender: "me",
      content: "I've uploaded the wireframes for review. Let me know what you think!",
      timestamp: "2:15 PM",
      type: "text"
    },
    {
      id: 8,
      sender: "me",
      content: "wireframes-v1.fig",
      timestamp: "2:16 PM",
      type: "file"
    }
  ];

  const selectedConv = conversations.find(c => c.id === selectedConversation);

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim()) {
      // Handle message sending
      setNewMessage("");
    }
  };

  if (isMobile && selectedConversation) {
    // Mobile view - show only chat when conversation is selected
    return (
      <div className="h-screen flex flex-col bg-background">
        {/* Mobile Header */}
        <div className="bg-card border-b p-4 flex items-center gap-3">
          <Button 
            variant="ghost" 
            size="sm"
            onClick={() => setSelectedConversation(0)}
          >
            ←
          </Button>
          <Avatar className="w-10 h-10">
            <AvatarImage src={selectedConv?.avatar} />
            <AvatarFallback>{selectedConv?.name.slice(0, 2)}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <h3 className="font-medium">{selectedConv?.name}</h3>
            <p className="text-sm text-muted-foreground">{selectedConv?.project}</p>
          </div>
          <div className="flex gap-1">
            <Button variant="ghost" size="sm">
              <Phone className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <Video className="w-4 h-4" />
            </Button>
            <Button variant="ghost" size="sm">
              <MoreVertical className="w-4 h-4" />
            </Button>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 p-4 overflow-y-auto space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'me' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-[70%] ${message.sender === 'me' ? 'order-2' : 'order-1'}`}>
                {message.type === 'file' ? (
                  <div className={`p-3 rounded-lg ${
                    message.sender === 'me' 
                      ? 'bg-primary text-primary-foreground' 
                      : 'bg-secondary'
                  }`}>
                    <div className="flex items-center gap-2">
                      <Paperclip className="w-4 h-4" />
                      <span className="text-sm">{message.content}</span>
                    </div>
                  </div>
                ) : (
                  <div className={`p-3 rounded-lg ${
                    message.sender === 'me' 
                      ? 'bg-primary text-primary-foreground' 
                      : 'bg-secondary'
                  }`}>
                    <p className="text-sm">{message.content}</p>
                  </div>
                )}
                <p className="text-xs text-muted-foreground mt-1 px-1">
                  {message.timestamp}
                </p>
              </div>
            </div>
          ))}
        </div>

        {/* Input */}
        <form onSubmit={handleSendMessage} className="p-4 border-t bg-card">
          <div className="flex gap-2">
            <Button type="button" variant="ghost" size="sm">
              <Paperclip className="w-4 h-4" />
            </Button>
            <Input
              placeholder="Type a message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className="flex-1"
            />
            <Button type="submit" size="sm">
              <Send className="w-4 h-4" />
            </Button>
          </div>
        </form>
      </div>
    );
  }

  return (
    <div className="h-screen bg-background">
      <div className="max-w-7xl mx-auto px-4 lg:px-6 py-8">
        <h1 className="text-3xl mb-8">Messages</h1>
        
        <div className="grid lg:grid-cols-3 gap-6 h-[600px]">
          {/* Conversations List */}
          <div className={`${isMobile && selectedConversation ? 'hidden' : ''} lg:col-span-1`}>
            <Card className="h-full">
              <CardContent className="p-0">
                {/* Search */}
                <div className="p-4 border-b">
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
                    <Input placeholder="Search conversations..." className="pl-10" />
                  </div>
                </div>

                {/* Conversation List */}
                <div className="overflow-y-auto h-[500px]">
                  {conversations.map((conversation) => (
                    <div
                      key={conversation.id}
                      className={`p-4 border-b cursor-pointer hover:bg-accent transition-colors ${
                        selectedConversation === conversation.id ? 'bg-accent' : ''
                      }`}
                      onClick={() => setSelectedConversation(conversation.id)}
                    >
                      <div className="flex items-start space-x-3">
                        <div className="relative">
                          <Avatar className="w-12 h-12">
                            <AvatarImage src={conversation.avatar} />
                            <AvatarFallback>{conversation.name.slice(0, 2)}</AvatarFallback>
                          </Avatar>
                          {conversation.online && (
                            <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 rounded-full border-2 border-background"></div>
                          )}
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex justify-between items-start mb-1">
                            <h4 className="font-medium truncate">{conversation.name}</h4>
                            <span className="text-xs text-muted-foreground">{conversation.timestamp}</span>
                          </div>
                          <p className="text-sm text-muted-foreground truncate mb-1">
                            {conversation.lastMessage}
                          </p>
                          <div className="flex justify-between items-center">
                            <Badge variant="outline" className="text-xs">
                              {conversation.project}
                            </Badge>
                            {conversation.unread > 0 && (
                              <Badge className="text-xs px-2 py-1">
                                {conversation.unread}
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Chat Window */}
          <div className={`${isMobile && !selectedConversation ? 'hidden' : ''} lg:col-span-2`}>
            {selectedConversation ? (
              <Card className="h-full flex flex-col">
                {/* Chat Header */}
                <div className="p-4 border-b flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <Avatar className="w-10 h-10">
                      <AvatarImage src={selectedConv?.avatar} />
                      <AvatarFallback>{selectedConv?.name.slice(0, 2)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-medium">{selectedConv?.name}</h3>
                      <p className="text-sm text-muted-foreground">{selectedConv?.project}</p>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="ghost" size="sm">
                      <Phone className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Video className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="sm">
                      <MoreVertical className="w-4 h-4" />
                    </Button>
                  </div>
                </div>

                {/* Messages */}
                <div className="flex-1 p-4 overflow-y-auto space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.sender === 'me' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`max-w-[70%] ${message.sender === 'me' ? 'order-2' : 'order-1'}`}>
                        {message.type === 'file' ? (
                          <div className={`p-3 rounded-lg ${
                            message.sender === 'me' 
                              ? 'bg-primary text-primary-foreground' 
                              : 'bg-secondary'
                          }`}>
                            <div className="flex items-center gap-2">
                              <Paperclip className="w-4 h-4" />
                              <span className="text-sm">{message.content}</span>
                            </div>
                          </div>
                        ) : (
                          <div className={`p-3 rounded-lg ${
                            message.sender === 'me' 
                              ? 'bg-primary text-primary-foreground' 
                              : 'bg-secondary'
                          }`}>
                            <p className="text-sm">{message.content}</p>
                          </div>
                        )}
                        <p className="text-xs text-muted-foreground mt-1 px-1">
                          {message.timestamp}
                        </p>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Message Input */}
                <form onSubmit={handleSendMessage} className="p-4 border-t">
                  <div className="flex gap-2">
                    <Button type="button" variant="ghost" size="sm">
                      <Paperclip className="w-4 h-4" />
                    </Button>
                    <Input
                      placeholder="Type a message..."
                      value={newMessage}
                      onChange={(e) => setNewMessage(e.target.value)}
                      className="flex-1"
                    />
                    <Button type="submit" size="sm">
                      <Send className="w-4 h-4" />
                    </Button>
                  </div>
                </form>
              </Card>
            ) : (
              <Card className="h-full flex items-center justify-center">
                <div className="text-center text-muted-foreground">
                  <h3 className="text-lg mb-2">Select a conversation</h3>
                  <p className="text-sm">Choose a conversation from the list to start messaging</p>
                </div>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}