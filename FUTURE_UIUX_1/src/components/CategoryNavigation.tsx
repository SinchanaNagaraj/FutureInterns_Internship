import { Tabs, TabsList, TabsTrigger } from "./ui/tabs";

interface Category {
  id: string;
  name: string;
  icon?: string;
}

interface CategoryNavigationProps {
  categories: Category[];
  activeCategory: string;
  onCategoryChange: (categoryId: string) => void;
}

export function CategoryNavigation({ categories, activeCategory, onCategoryChange }: CategoryNavigationProps) {
  return (
    <div className="sticky top-[88px] bg-background/95 backdrop-blur-sm border-b border-border z-40">
      <div className="max-w-7xl mx-auto px-4 py-4">
        <Tabs value={activeCategory} onValueChange={onCategoryChange}>
          <TabsList className="grid w-full grid-cols-6 h-auto">
            {categories.map((category) => (
              <TabsTrigger 
                key={category.id} 
                value={category.id}
                className="flex flex-col gap-1 p-3 h-auto data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
              >
                {category.icon && <span className="text-lg">{category.icon}</span>}
                <span className="text-sm">{category.name}</span>
              </TabsTrigger>
            ))}
          </TabsList>
        </Tabs>
      </div>
    </div>
  );
}