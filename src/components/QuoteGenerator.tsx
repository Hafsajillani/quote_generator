import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { useTheme } from 'next-themes';
import { SunMoon, Sparkles, RefreshCw, X } from 'lucide-react';
import { toast } from '@/hooks/use-toast';
import crystalImage from '@/assets/crystal-1.png';
import quoteBubbleImage from '@/assets/quote-bubble.png';
import sparkleImage from '@/assets/sparkle.png';

interface Quote {
  text: string;
  author: string;
  topic: string;
}

// Inspirational quotes database organized by topic
const quotesDatabase: Record<string, Quote[]> = {
  motivation: [
    { text: "The only way to do great work is to love what you do.", author: "Steve Jobs", topic: "motivation" },
    { text: "Innovation distinguishes between a leader and a follower.", author: "Steve Jobs", topic: "motivation" },
    { text: "Life is what happens to you while you're busy making other plans.", author: "John Lennon", topic: "motivation" },
    { text: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt", topic: "motivation" },
    { text: "It is during our darkest moments that we must focus to see the light.", author: "Aristotle", topic: "motivation" }
  ],
  success: [
    { text: "Success is not final, failure is not fatal: it is the courage to continue that counts.", author: "Winston Churchill", topic: "success" },
    { text: "The way to get started is to quit talking and begin doing.", author: "Walt Disney", topic: "success" },
    { text: "Don't be afraid to give up the good to go for the great.", author: "John D. Rockefeller", topic: "success" },
    { text: "Success is walking from failure to failure with no loss of enthusiasm.", author: "Winston Churchill", topic: "success" },
    { text: "The only impossible journey is the one you never begin.", author: "Tony Robbins", topic: "success" }
  ],
  wisdom: [
    { text: "The only true wisdom is in knowing you know nothing.", author: "Socrates", topic: "wisdom" },
    { text: "Be yourself; everyone else is already taken.", author: "Oscar Wilde", topic: "wisdom" },
    { text: "Two things are infinite: the universe and human stupidity; and I'm not sure about the universe.", author: "Albert Einstein", topic: "wisdom" },
    { text: "In the middle of difficulty lies opportunity.", author: "Albert Einstein", topic: "wisdom" },
    { text: "Yesterday is history, tomorrow is a mystery, today is a gift of God, which is why we call it the present.", author: "Bill Keane", topic: "wisdom" }
  ],
  love: [
    { text: "Being deeply loved by someone gives you strength, while loving someone deeply gives you courage.", author: "Lao Tzu", topic: "love" },
    { text: "The best thing to hold onto in life is each other.", author: "Audrey Hepburn", topic: "love" },
    { text: "Love is composed of a single soul inhabiting two bodies.", author: "Aristotle", topic: "love" },
    { text: "Where there is love there is life.", author: "Mahatma Gandhi", topic: "love" },
    { text: "To love and be loved is to feel the sun from both sides.", author: "David Viscott", topic: "love" }
  ],
  life: [
    { text: "Life is really simple, but we insist on making it complicated.", author: "Confucius", topic: "life" },
    { text: "The purpose of our lives is to be happy.", author: "Dalai Lama", topic: "life" },
    { text: "Life is 10% what happens to you and 90% how you react to it.", author: "Charles R. Swindoll", topic: "life" },
    { text: "In the end, we will remember not the words of our enemies, but the silence of our friends.", author: "Martin Luther King Jr.", topic: "life" },
    { text: "Life isn't about finding yourself. Life is about creating yourself.", author: "George Bernard Shaw", topic: "life" }
  ]
};

const defaultQuotes: Quote[] = [
  { text: "The only way to do great work is to love what you do.", author: "Steve Jobs", topic: "motivation" },
  { text: "Innovation distinguishes between a leader and a follower.", author: "Steve Jobs", topic: "motivation" },
  { text: "Life is what happens to you while you're busy making other plans.", author: "John Lennon", topic: "life" }
];

const QuoteGenerator: React.FC = () => {
  const [topic, setTopic] = useState('');
  const [quotes, setQuotes] = useState<Quote[]>(defaultQuotes);
  const [isLoading, setIsLoading] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const generateQuotes = async () => {
    if (!topic.trim()) {
      toast({
        title: "Topic Required",
        description: "Please enter a topic to generate quotes.",
        variant: "destructive"
      });
      return;
    }

    setIsLoading(true);
    
    // Simulate API delay for better UX
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const topicLower = topic.toLowerCase().trim();
    let selectedQuotes: Quote[];
    
    // Check if topic matches any category
    if (quotesDatabase[topicLower]) {
      selectedQuotes = quotesDatabase[topicLower];
    } else {
      // For other topics, use a mix of inspirational quotes
      const allQuotes = Object.values(quotesDatabase).flat();
      selectedQuotes = allQuotes
        .sort(() => Math.random() - 0.5)
        .slice(0, 3);
    }
    
    setQuotes(selectedQuotes);
    setIsLoading(false);
    
    toast({
      title: "Quotes Generated!",
      description: `Found ${selectedQuotes.length} inspiring quotes about ${topic}.`,
    });
  };

  const clearQuotes = () => {
    setTopic('');
    setQuotes(defaultQuotes);
    toast({
      title: "Cleared",
      description: "Form and quotes have been reset.",
    });
  };

  const toggleTheme = () => {
    setTheme(theme === 'dark' ? 'light' : 'dark');
  };

  if (!mounted) {
    return null;
  }

  return (
    <div className="min-h-screen relative overflow-hidden">
      {/* Floating Decorative Elements */}
      <div className="fixed top-20 left-10 w-16 h-16 floating-decoration animate-float">
        <img src={crystalImage} alt="" className="w-full h-full opacity-40" />
      </div>
      <div className="fixed top-40 right-20 w-12 h-12 floating-decoration animate-float">
        <img src={quoteBubbleImage} alt="" className="w-full h-full opacity-30" />
      </div>
      <div className="fixed bottom-32 left-20 w-8 h-8 floating-decoration animate-float">
        <img src={sparkleImage} alt="" className="w-full h-full opacity-50" />
      </div>
      <div className="fixed bottom-20 right-10 w-12 h-12 floating-decoration animate-float">
        <img src={crystalImage} alt="" className="w-full h-full opacity-25" />
      </div>
      
      {/* Theme Toggle */}
      <div className="fixed top-6 right-6 z-50">
        <Button
          variant="glass"
          size="icon"
          onClick={toggleTheme}
          className="w-12 h-12 rounded-full hover:scale-110 transition-all duration-300"
          aria-label="Toggle theme"
        >
          <SunMoon className="w-5 h-5" />
        </Button>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 min-h-screen flex items-center justify-center">
        <div className="w-full max-w-4xl">
          {/* Header */}
          <div className="text-center mb-12 animate-fade-in">
            <h1 className="text-5xl md:text-7xl font-heading font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
              Quote Generator
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground max-w-2xl mx-auto">
              Discover inspiring quotes tailored to your interests and mood
            </p>
          </div>

          {/* Main Card */}
          <Card className="glass-card p-8 md:p-12 mb-8 animate-slide-up">
            {/* Form Section */}
            <div className="mb-8">
              <div className="flex flex-col md:flex-row gap-4 items-end">
                <div className="flex-1">
                  <Label htmlFor="topic" className="text-lg font-medium mb-3 block">
                    What inspires you today?
                  </Label>
                  <Input
                    id="topic"
                    type="text"
                    placeholder="motivation, love, success, wisdom..."
                    value={topic}
                    onChange={(e) => setTopic(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && generateQuotes()}
                    className="h-12 text-lg bg-input/50 border-glass-border focus:border-primary/50 focus:ring-2 focus:ring-primary/20 transition-all duration-300"
                    disabled={isLoading}
                  />
                </div>
                <div className="flex gap-3">
                  <Button
                    onClick={generateQuotes}
                    disabled={isLoading}
                    variant="primary-gradient"
                    size="xl"
                    className="min-w-[120px] text-lg font-semibold"
                  >
                    {isLoading ? (
                      <RefreshCw className="w-5 h-5 animate-spin" />
                    ) : (
                      <>
                        <Sparkles className="w-5 h-5 mr-2" />
                        Generate
                      </>
                    )}
                  </Button>
                  <Button
                    onClick={clearQuotes}
                    variant="glass"
                    size="xl"
                    className="px-6"
                    disabled={isLoading}
                  >
                    <X className="w-5 h-5" />
                  </Button>
                </div>
              </div>
            </div>

            {/* Quotes Section */}
            <div className="space-y-6">
              {isLoading ? (
                // Loading Skeletons
                Array.from({ length: 3 }).map((_, index) => (
                  <div key={index} className="quote-container animate-pulse">
                    <Skeleton className="h-6 w-3/4 mb-3 bg-muted/30" />
                    <Skeleton className="h-6 w-1/2 mb-2 bg-muted/30" />
                    <Skeleton className="h-4 w-1/4 bg-muted/30" />
                  </div>
                ))
              ) : (
                // Actual Quotes
                quotes.map((quote, index) => (
                  <div 
                    key={index} 
                    className="quote-container animate-slide-up"
                    style={{ animationDelay: `${index * 0.1}s` }}
                  >
                    <blockquote className="quote-text font-medium text-lg md:text-xl leading-relaxed mb-4">
                      {quote.text}
                    </blockquote>
                    <div className="flex items-center justify-between">
                      <cite className="text-muted-foreground font-medium">
                        — {quote.author}
                      </cite>
                      <span className="text-xs uppercase tracking-wider text-accent font-semibold px-3 py-1 bg-accent/10 rounded-full">
                        {quote.topic}
                      </span>
                    </div>
                  </div>
                ))
              )}
            </div>
          </Card>

          {/* Footer */}
          <div className="text-center text-muted-foreground animate-fade-in">
            <p className="text-sm">
              Crafted with ✨ to inspire your journey
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default QuoteGenerator;