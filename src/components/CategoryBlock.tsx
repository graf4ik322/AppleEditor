import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import {
  ChevronDown,
  ChevronRight,
  Trash2,
  Smartphone,
  Laptop,
  Tablet,
  Watch,
} from "lucide-react";
import { ModelItem } from "./ModelItem";
import type { CategoryBlockProps } from "@/types";

export function CategoryBlock({
  categoryName,
  models,
  onUpdatePrice,
  onDeleteCategory,
  onDeleteModel,
  onDeleteConfig,
}: CategoryBlockProps) {
  const [isOpen, setIsOpen] = useState(true);

  const getCategoryIcon = (name: string) => {
    const lowerName = name.toLowerCase();
    if (
      lowerName.includes("iphone") ||
      lowerName.includes("телефон") ||
      lowerName.includes("phone")
    ) {
      return <Smartphone className="h-4 w-4 sm:h-5 sm:w-5" />;
    }
    if (
      lowerName.includes("macbook") ||
      lowerName.includes("ноутбук") ||
      lowerName.includes("laptop")
    ) {
      return <Laptop className="h-4 w-4 sm:h-5 sm:w-5" />;
    }
    if (
      lowerName.includes("ipad") ||
      lowerName.includes("планшет") ||
      lowerName.includes("tablet")
    ) {
      return <Tablet className="h-4 w-4 sm:h-5 sm:w-5" />;
    }
    if (
      lowerName.includes("watch") ||
      lowerName.includes("часы") ||
      lowerName.includes("watch")
    ) {
      return <Watch className="h-4 w-4 sm:h-5 sm:w-5" />;
    }
    return <Smartphone className="h-4 w-4 sm:h-5 sm:w-5" />; // default icon
  };

  const handleDeleteCategory = () => {
    onDeleteCategory(categoryName);
  };

  return (
    <Card className="mb-3 xs:mb-4 sm:mb-6 mx-1 xs:mx-0">
      <CardHeader className="pb-2 xs:pb-3 px-3 xs:px-4 sm:px-6">
        <Collapsible open={isOpen} onOpenChange={setIsOpen}>
          <CollapsibleTrigger className="w-full">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-1.5 xs:gap-2 sm:gap-3">
                {isOpen ? (
                  <ChevronDown className="h-3.5 w-3.5 xs:h-4 xs:w-4 text-gray-500" />
                ) : (
                  <ChevronRight className="h-3.5 w-3.5 xs:h-4 xs:w-4 text-gray-500" />
                )}
                <div className="flex items-center gap-1 xs:gap-1.5">
                  <div className="text-purple-600">
                    {getCategoryIcon(categoryName)}
                  </div>
                  <CardTitle className="text-base xs:text-lg sm:text-xl text-gray-900 leading-tight">
                    {categoryName}
                  </CardTitle>
                </div>
                <span className="text-xs text-gray-500 bg-gray-100 px-1.5 xs:px-2 py-0.5 rounded">
                  {Object.keys(models).length}
                </span>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteCategory();
                }}
                className="text-red-600 hover:text-red-700 hover:border-red-300 h-6 w-6 xs:h-7 xs:w-7 sm:h-8 sm:w-8 p-0.5"
              >
                <Trash2 className="h-3 w-3 xs:h-3.5 xs:w-3.5 sm:h-4 sm:w-4" />
              </Button>
            </div>
          </CollapsibleTrigger>

          <CollapsibleContent>
            <CardContent className="pt-0 px-0.5 xs:px-1">
              <div className="space-y-2 xs:space-y-3">
                {Object.entries(models).map(([modelName, configs]) => (
                  <ModelItem
                    key={modelName}
                    category={categoryName}
                    modelName={modelName}
                    configs={configs}
                    onUpdatePrice={onUpdatePrice}
                    onDeleteModel={onDeleteModel}
                    onDeleteConfig={onDeleteConfig}
                  />
                ))}

                {Object.keys(models).length === 0 && (
                  <div className="text-center py-3 xs:py-4 sm:py-6 text-gray-500">
                    <div className="text-2xl xs:text-3xl sm:text-4xl mb-1.5 xs:mb-2">
                      📱
                    </div>
                    <p className="font-medium text-sm xs:text-base mb-1">
                      Нет моделей
                    </p>
                    <p className="text-xs xs:text-sm text-gray-400">
                      Используйте "+" для добавления
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </CollapsibleContent>
        </Collapsible>
      </CardHeader>
    </Card>
  );
}
