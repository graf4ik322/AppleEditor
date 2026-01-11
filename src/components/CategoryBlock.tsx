import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronDown, ChevronRight, Trash2 } from "lucide-react";
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

  const handleDeleteCategory = () => {
    onDeleteCategory(categoryName);
  };

  return (
    <Card className="mb-3 xs:mb-4 sm:mb-6 mx-1 xs:mx-0">
      <CardHeader className="pb-2 xs:pb-3 px-3 xs:px-4 sm:px-6">
        <Collapsible open={isOpen} onOpenChange={setIsOpen}>
          <CollapsibleTrigger className="w-full">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                {isOpen ? (
                  <ChevronDown className="h-5 w-5 text-gray-500" />
                ) : (
                  <ChevronRight className="h-5 w-5 text-gray-500" />
                )}
                <CardTitle className="text-xl text-gray-900">
                  {categoryName}
                </CardTitle>
                <span className="text-sm text-gray-500">
                  ({Object.keys(models).length} моделей)
                </span>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={(e) => {
                  e.stopPropagation();
                  handleDeleteCategory();
                }}
                className="text-red-600 hover:text-red-700 hover:border-red-300"
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </CollapsibleTrigger>

          <CollapsibleContent>
            <CardContent className="pt-0">
              <div className="space-y-4">
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
                  <div className="text-center py-8 text-gray-500">
                    <div className="text-4xl mb-2">📱</div>
                    <p className="font-medium">Нет моделей в этой категории</p>
                    <p className="text-sm">
                      Добавьте модели через боковую панель слева.
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
