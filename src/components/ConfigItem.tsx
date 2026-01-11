import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Trash2 } from "lucide-react";
import type { ConfigItemProps, PriceField } from "@/types";

export function ConfigItem({
  category,
  model,
  configName,
  prices,
  onUpdatePrice,
  onDeleteConfig,
}: ConfigItemProps) {
  const handlePriceChange = (field: PriceField, value: string) => {
    const numValue = value === "" ? null : parseFloat(value);
    if (value === "" || (!isNaN(numValue!) && numValue! >= 0)) {
      onUpdatePrice(category, model, configName, field, numValue);
    }
  };

  return (
    <div className="bg-gray-50 p-2 sm:p-3 rounded-lg space-y-2 sm:space-y-3">
      <div className="flex items-center justify-between">
        <h4 className="font-medium text-gray-900 text-sm sm:text-base">
          {configName}
        </h4>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onDeleteConfig(category, model, configName)}
          className="text-red-600 hover:text-red-700 hover:border-red-300 h-7 w-7 sm:h-8 sm:w-8 lg:h-9 lg:w-9 p-1"
        >
          <Trash2 className="h-3 w-3 sm:h-4 sm:w-4" />
        </Button>
      </div>

      <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 gap-2 xs:gap-3">
        <div className="space-y-1">
          <Label
            htmlFor={`${configName}-purchase`}
            className="text-xs font-medium text-gray-700"
          >
            Закупочная*
          </Label>
          <Input
            id={`${configName}-purchase`}
            type="number"
            value={prices.purchase_entry || ""}
            onChange={(e) =>
              handlePriceChange("purchase_entry", e.target.value)
            }
            placeholder="0"
            min="0"
            step="0.01"
            className="text-xs sm:text-sm h-8 sm:h-9"
          />
        </div>

        <div className="space-y-1">
          <Label
            htmlFor={`${configName}-wholesale`}
            className="text-xs font-medium text-gray-700"
          >
            Оптовая малая
          </Label>
          <Input
            id={`${configName}-wholesale`}
            type="number"
            value={prices.wholesale_small ?? ""}
            onChange={(e) =>
              handlePriceChange("wholesale_small", e.target.value)
            }
            placeholder="0"
            min="0"
            step="0.01"
            className="text-xs sm:text-sm h-8 sm:h-9"
          />
        </div>

        <div className="space-y-1">
          <Label
            htmlFor={`${configName}-market`}
            className="text-xs font-medium text-gray-700"
          >
            Рыночная
          </Label>
          <Input
            id={`${configName}-market`}
            type="number"
            value={prices.market ?? ""}
            onChange={(e) => handlePriceChange("market", e.target.value)}
            placeholder="0"
            min="0"
            step="0.01"
            className="text-xs sm:text-sm h-8 sm:h-9"
          />
        </div>
      </div>
    </div>
  );
}
