import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronDown, ChevronRight, Trash2 } from "lucide-react";
import { ConfigItem } from "./ConfigItem";
import type { ModelItemProps } from "@/types";

export function ModelItem({
  category,
  modelName,
  configs,
  onUpdatePrice,
  onDeleteModel,
  onDeleteConfig,
}: ModelItemProps) {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <div className="border border-gray-200 rounded-lg overflow-hidden">
      <Collapsible open={isOpen} onOpenChange={setIsOpen}>
        <CollapsibleTrigger className="w-full">
          <div className="flex items-center justify-between p-4 bg-white hover:bg-gray-50 transition-colors">
            <div className="flex items-center gap-2">
              {isOpen ? (
                <ChevronDown className="h-4 w-4 text-gray-500" />
              ) : (
                <ChevronRight className="h-4 w-4 text-gray-500" />
              )}
              <h3 className="font-medium text-gray-900">{modelName}</h3>
              <span className="text-sm text-gray-500">
                ({Object.keys(configs).length} конфигураций)
              </span>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                onDeleteModel(category, modelName);
              }}
              className="text-red-600 hover:text-red-700 hover:border-red-300"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </CollapsibleTrigger>

        <CollapsibleContent>
          <div className="p-4 pt-0 space-y-3">
            {Object.entries(configs).map(([configName, prices]) => (
              <ConfigItem
                key={configName}
                category={category}
                model={modelName}
                configName={configName}
                prices={prices}
                onUpdatePrice={onUpdatePrice}
                onDeleteConfig={onDeleteConfig}
              />
            ))}

            {Object.keys(configs).length === 0 && (
              <div className="text-center py-6 text-gray-500 text-sm">
                Нет конфигураций. Добавьте их через боковую панель.
              </div>
            )}
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}
