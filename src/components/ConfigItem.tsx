import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Trash2, ShoppingCart, Package, TrendingUp } from "lucide-react";
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
    <div className="bg-gray-50 p-1.5 xs:p-2 sm:p-3 rounded-lg space-y-1.5 xs:space-y-2 sm:space-y-3">
      <div className="flex items-center justify-between">
        <h4 className="font-medium text-gray-900 text-sm xs:text-sm sm:text-base">
          {configName}
        </h4>
        <Button
          variant="outline"
          size="sm"
          onClick={() => onDeleteConfig(category, model, configName)}
          className="text-red-600 hover:text-red-700 hover:border-red-300 h-5 w-5 xs:h-6 xs:w-6 sm:h-7 sm:w-7 p-0.5"
        >
          <Trash2 className="h-2.5 w-2.5 xs:h-3 xs:w-3 sm:h-3.5 sm:w-3.5" />
        </Button>
      </div>

      <div className="grid grid-cols-1 xs:grid-cols-2 md:grid-cols-3 gap-1.5 xs:gap-2 sm:gap-3">
        <div className="space-y-1">
          <Label
            htmlFor={`${configName}-purchase`}
            className="text-xs font-medium text-gray-700 flex items-center gap-1"
          >
            <ShoppingCart className="h-3 w-3 text-green-600" />
            Закуп*
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
            className="text-xs sm:text-sm h-7 xs:h-8 sm:h-9"
          />
        </div>

        <div className="space-y-1">
          <Label
            htmlFor={`${configName}-wholesale`}
            className="text-xs font-medium text-gray-700 flex items-center gap-1"
          >
            <Package className="h-3 w-3 text-blue-600" />
            Опт
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
            className="text-xs sm:text-sm h-7 xs:h-8 sm:h-9"
          />
        </div>

        <div className="space-y-1">
          <Label
            htmlFor={`${configName}-market`}
            className="text-xs font-medium text-gray-700 flex items-center gap-1"
          >
            <TrendingUp className="h-3 w-3 text-purple-600" />
            Рынок
          </Label>
          <Input
            id={`${configName}-market`}
            type="number"
            value={prices.market ?? ""}
            onChange={(e) => handlePriceChange("market", e.target.value)}
            placeholder="0"
            min="0"
            step="0.01"
            className="text-xs sm:text-sm h-7 xs:h-8 sm:h-9"
          />
        </div>
      </div>
    </div>
  );
}
