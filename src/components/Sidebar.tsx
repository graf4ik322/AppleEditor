import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";
import { ChevronDown, ChevronRight, Plus, X } from "lucide-react";
import type { SidebarProps } from "@/types";

export function Sidebar({
  categories,
  priceData,
  onAddCategory,
  onAddModel,
  onAddConfig,
}: SidebarProps) {
  const [isCategoriesOpen, setIsCategoriesOpen] = useState(true);
  const [isModelsOpen, setIsModelsOpen] = useState(true);
  const [isConfigsOpen, setIsConfigsOpen] = useState(true);
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const [newCategory, setNewCategory] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [newModel, setNewModel] = useState("");
  const [selectedModel, setSelectedModel] = useState("");
  const [newConfig, setNewConfig] = useState("");
  const [newConfigPrice, setNewConfigPrice] = useState("");

  useEffect(() => {
    const handleToggle = () => setIsMobileSidebarOpen((prev) => !prev);
    window.addEventListener("toggle-mobile-sidebar", handleToggle);
    return () =>
      window.removeEventListener("toggle-mobile-sidebar", handleToggle);
  }, []);

  const handleAddCategory = () => {
    if (newCategory.trim()) {
      onAddCategory(newCategory.trim());
      setNewCategory("");
    }
  };

  const handleAddModel = () => {
    if (selectedCategory && newModel.trim()) {
      onAddModel(selectedCategory, newModel.trim());
      setNewModel("");
    }
  };

  const handleAddConfig = () => {
    if (selectedCategory && selectedModel && newConfig.trim()) {
      const price = parseFloat(newConfigPrice);
      if (!isNaN(price) && price >= 0) {
        onAddConfig(selectedCategory, selectedModel, newConfig.trim(), price);
        setNewConfig("");
        setNewConfigPrice("");
      }
    }
  };

  const getModelsForCategory = (category: string) => {
    return Object.keys(priceData[category] || {});
  };

  const SidebarContent = () => (
    <>
      <h2 className="text-base sm:text-lg font-semibold text-gray-900 mb-3 sm:mb-4">
        Управление данными
      </h2>

      {/* Add Category */}
      <Collapsible open={isCategoriesOpen} onOpenChange={setIsCategoriesOpen}>
        <CollapsibleTrigger className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2 hover:text-gray-900 w-full">
          {isCategoriesOpen ? (
            <ChevronDown className="h-4 w-4" />
          ) : (
            <ChevronRight className="h-4 w-4" />
          )}
          Добавить категорию
        </CollapsibleTrigger>
        <CollapsibleContent className="space-y-2 mb-3 sm:mb-4">
          <div className="space-y-2">
            <Label htmlFor="new-category" className="text-xs sm:text-sm">
              Название категории
            </Label>
            <div className="flex gap-2">
              <Input
                id="new-category"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                placeholder="iPhone, MacBook..."
                className="flex-1 text-sm h-8 sm:h-10"
                onKeyPress={(e) => e.key === "Enter" && handleAddCategory()}
              />
              <Button
                onClick={handleAddCategory}
                size="sm"
                className="h-8 w-8 sm:h-9 sm:w-9 flex-shrink-0"
              >
                <Plus className="h-3 w-3 sm:h-4 sm:w-4" />
              </Button>
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>

      {/* Add Model */}
      <Collapsible open={isModelsOpen} onOpenChange={setIsModelsOpen}>
        <CollapsibleTrigger className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2 hover:text-gray-900 w-full">
          {isModelsOpen ? (
            <ChevronDown className="h-4 w-4" />
          ) : (
            <ChevronRight className="h-4 w-4" />
          )}
          Добавить модель
        </CollapsibleTrigger>
        <CollapsibleContent className="space-y-2 mb-3 sm:mb-4">
          <div className="space-y-2">
            <Label htmlFor="category-select" className="text-xs sm:text-sm">
              Категория
            </Label>
            <Select
              value={selectedCategory}
              onValueChange={setSelectedCategory}
            >
              <SelectTrigger className="text-sm h-8 sm:h-10">
                <SelectValue placeholder="Выберите категорию" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="new-model" className="text-xs sm:text-sm">
              Название модели
            </Label>
            <div className="flex gap-2">
              <Input
                id="new-model"
                value={newModel}
                onChange={(e) => setNewModel(e.target.value)}
                placeholder="iPhone 15, MacBook..."
                className="flex-1 text-sm h-8 sm:h-10"
                disabled={!selectedCategory}
                onKeyPress={(e) => e.key === "Enter" && handleAddModel()}
              />
              <Button
                onClick={handleAddModel}
                size="sm"
                disabled={!selectedCategory}
                className="h-8 w-8 sm:h-9 sm:w-9 flex-shrink-0"
              >
                <Plus className="h-3 w-3 sm:h-4 sm:w-4" />
              </Button>
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>

      {/* Add Config */}
      <Collapsible open={isConfigsOpen} onOpenChange={setIsConfigsOpen}>
        <CollapsibleTrigger className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2 hover:text-gray-900 w-full">
          {isConfigsOpen ? (
            <ChevronDown className="h-4 w-4" />
          ) : (
            <ChevronRight className="h-4 w-4" />
          )}
          Добавить конфигурацию
        </CollapsibleTrigger>
        <CollapsibleContent className="space-y-2">
          <div className="space-y-2">
            <Label
              htmlFor="config-category-select"
              className="text-xs sm:text-sm"
            >
              Категория
            </Label>
            <Select
              value={selectedCategory}
              onValueChange={setSelectedCategory}
            >
              <SelectTrigger className="text-sm h-8 sm:h-10">
                <SelectValue placeholder="Выберите категорию" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="config-model-select" className="text-xs sm:text-sm">
              Модель
            </Label>
            <Select value={selectedModel} onValueChange={setSelectedModel}>
              <SelectTrigger className="text-sm h-8 sm:h-10">
                <SelectValue placeholder="Выберите модель" />
              </SelectTrigger>
              <SelectContent>
                {selectedCategory &&
                  getModelsForCategory(selectedCategory).map((model) => (
                    <SelectItem key={model} value={model}>
                      {model}
                    </SelectItem>
                  ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="new-config" className="text-xs sm:text-sm">
              Название конфигурации
            </Label>
            <Input
              id="new-config"
              value={newConfig}
              onChange={(e) => setNewConfig(e.target.value)}
              placeholder="256GB, 512GB..."
              className="text-sm h-8 sm:h-10"
              disabled={!selectedCategory || !selectedModel}
              onKeyPress={(e) => e.key === "Enter" && handleAddConfig()}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="config-price" className="text-xs sm:text-sm">
              Базовая цена
            </Label>
            <div className="flex gap-2">
              <Input
                id="config-price"
                type="number"
                value={newConfigPrice}
                onChange={(e) => setNewConfigPrice(e.target.value)}
                placeholder="99999"
                min="0"
                step="0.01"
                className="flex-1 text-sm h-8 sm:h-10"
                disabled={!selectedCategory || !selectedModel}
                onKeyPress={(e) => e.key === "Enter" && handleAddConfig()}
              />
              <Button
                onClick={handleAddConfig}
                size="sm"
                disabled={!selectedCategory || !selectedModel}
                className="h-8 w-8 sm:h-9 sm:w-9 flex-shrink-0"
              >
                <Plus className="h-3 w-3 sm:h-4 sm:w-4" />
              </Button>
            </div>
          </div>
        </CollapsibleContent>
      </Collapsible>
    </>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden md:block w-full md:w-72 lg:w-80 bg-gray-50 border-r border-gray-200 p-3 xs:p-4 h-[calc(100vh-72px)] overflow-y-auto">
        <SidebarContent />
      </div>

      {/* Mobile Sidebar - Overlay */}
      {isMobileSidebarOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-black/50"
            onClick={() => setIsMobileSidebarOpen(false)}
          />
          <div className="relative flex flex-col w-full max-w-sm bg-gray-50 h-full">
            <div className="flex items-center justify-between p-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">
                Управление данными
              </h2>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsMobileSidebarOpen(false)}
                className="p-2"
              >
                <X className="h-5 w-5" />
              </Button>
            </div>
            <div className="flex-1 overflow-y-auto p-4">
              <SidebarContent />
            </div>
          </div>
        </div>
      )}

      {/* Mobile Floating Action Button */}
      <div className="md:hidden fixed bottom-4 right-4 z-40">
        <Button
          onClick={() => setIsMobileSidebarOpen(true)}
          size="lg"
          className="rounded-full h-14 w-14 bg-gradient-to-r from-purple-500 to-purple-700 hover:from-purple-600 hover:to-purple-800 shadow-lg"
        >
          <Plus className="h-6 w-6" />
        </Button>
      </div>
    </>
  );
}
