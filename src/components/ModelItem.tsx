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
          <div className="flex items-center justify-between p-2 xs:p-3 bg-white hover:bg-gray-50 transition-colors">
            <div className="flex items-center gap-1.5 xs:gap-2">
              {isOpen ? (
                <ChevronDown className="h-3.5 w-3.5 xs:h-4 xs:w-4 text-gray-500" />
              ) : (
                <ChevronRight className="h-3.5 w-3.5 xs:h-4 xs:w-4 text-gray-500" />
              )}
              <h3 className="font-medium text-sm xs:text-base text-gray-900 leading-tight">
                {modelName}
              </h3>
              <span className="text-xs text-gray-500 bg-gray-100 px-1.5 py-0.5 rounded">
                {Object.keys(configs).length}
              </span>
            </div>
            <Button
              variant="outline"
              size="sm"
              onClick={(e) => {
                e.stopPropagation();
                onDeleteModel(category, modelName);
              }}
              className="text-red-600 hover:text-red-700 hover:border-red-300 h-6 w-6 xs:h-7 xs:w-7 sm:h-8 sm:w-8 p-0.5"
            >
              <Trash2 className="h-3 w-3 xs:h-3.5 xs:w-3.5 sm:h-4 sm:w-4" />
            </Button>
          </div>
        </CollapsibleTrigger>

        <CollapsibleContent>
          <div className="p-2 xs:p-3 pt-0 space-y-2 xs:space-y-3">
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
              <div className="text-center py-3 xs:py-4 text-gray-500">
                <p className="text-sm">Нет конфигураций</p>
                <p className="text-xs text-gray-400 mt-1">
                  Добавьте через боковую панель
                </p>
              </div>
            )}
          </div>
        </CollapsibleContent>
      </Collapsible>
    </div>
  );
}
