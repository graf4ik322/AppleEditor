import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, X } from "lucide-react";
import type { SidebarProps } from "@/types";

export function Sidebar({
  categories,
  priceData,
  onAddCategory,
  onAddModel,
  onAddConfig,
}: SidebarProps) {
  const [isMobileSidebarOpen, setIsMobileSidebarOpen] = useState(false);

  const [selectedCategory, setSelectedCategory] = useState("");
  const [selectedModel, setSelectedModel] = useState("");

  // Create refs for uncontrolled inputs
  const categoryInputRef = useRef<HTMLInputElement>(null);
  const modelInputRef = useRef<HTMLInputElement>(null);
  const configInputRef = useRef<HTMLInputElement>(null);
  const priceInputRef = useRef<HTMLInputElement>(null);

  // Restore hamburger menu functionality
  useEffect(() => {
    const handleToggle = () => setIsMobileSidebarOpen((prev) => !prev);
    window.addEventListener("toggle-mobile-sidebar", handleToggle);
    return () =>
      window.removeEventListener("toggle-mobile-sidebar", handleToggle);
  }, []);

  const handleAddCategory = () => {
    const value = categoryInputRef.current?.value || "";
    if (value.trim()) {
      onAddCategory(value.trim());
      if (categoryInputRef.current) {
        categoryInputRef.current.value = "";
      }
    }
  };

  const handleAddModel = () => {
    const value = modelInputRef.current?.value || "";
    if (selectedCategory && value.trim()) {
      onAddModel(selectedCategory, value.trim());
      if (modelInputRef.current) {
        modelInputRef.current.value = "";
      }
    }
  };

  const handleAddConfig = () => {
    const configValue = configInputRef.current?.value || "";
    const priceValue = priceInputRef.current?.value || "";
    const price = parseFloat(priceValue);
    if (
      selectedCategory &&
      selectedModel &&
      configValue.trim() &&
      !isNaN(price) &&
      price >= 0
    ) {
      onAddConfig(selectedCategory, selectedModel, configValue.trim(), price);
      if (configInputRef.current) {
        configInputRef.current.value = "";
      }
      if (priceInputRef.current) {
        priceInputRef.current.value = "";
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
      <div className="mb-3 sm:mb-4">
        <h3 className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2 hover:text-gray-900">
          ➕ Добавить категорию
        </h3>
        <div className="space-y-2">
          <div className="space-y-2">
            <Label htmlFor="new-category" className="text-xs sm:text-sm">
              Название категории
            </Label>
            <div className="flex gap-2">
              <input
                ref={categoryInputRef}
                id="new-category"
                placeholder="iPhone, MacBook..."
                className="flex-1 text-sm h-8 sm:h-10 px-3 py-2 border border-gray-300 rounded-md"
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
        </div>
      </div>

      {/* Add Model */}
      <div className="mb-3 sm:mb-4">
        <h3 className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2 hover:text-gray-900">
          ➕ Добавить модель
        </h3>
        <div className="space-y-2">
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
              <input
                ref={modelInputRef}
                id="new-model"
                placeholder="iPhone 15, MacBook..."
                className="flex-1 text-sm h-8 sm:h-10 px-3 py-2 border border-gray-300 rounded-md"
                disabled={!selectedCategory}
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
        </div>
      </div>

      {/* Add Config */}
      <div>
        <h3 className="flex items-center gap-2 text-sm font-medium text-gray-700 mb-2 hover:text-gray-900">
          ➕ Добавить конфигурацию
        </h3>
        <div className="space-y-2">
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
            <input
              ref={configInputRef}
              id="new-config"
              placeholder="256GB, 512GB..."
              className="text-sm h-8 sm:h-10 w-full px-3 py-2 border border-gray-300 rounded-md"
              disabled={!selectedCategory || !selectedModel}
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="config-price" className="text-xs sm:text-sm">
              Базовая цена
            </Label>
            <div className="flex gap-2">
              <input
                ref={priceInputRef}
                id="config-price"
                type="number"
                placeholder="99999"
                min="0"
                step="0.01"
                className="flex-1 text-sm h-8 sm:h-10 px-3 py-2 border border-gray-300 rounded-md"
                disabled={!selectedCategory || !selectedModel}
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
        </div>
      </div>
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
