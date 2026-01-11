import { useCallback } from "react";
import { Header } from "@/components/Header";
import { Sidebar } from "@/components/Sidebar";
import { CategoryBlock } from "@/components/CategoryBlock";
import { EmptyState } from "@/components/EmptyState";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useJsonFile } from "@/hooks/useJsonFile";
import { usePriceData } from "@/hooks/usePriceData";
import { useConfirm } from "@/hooks/useConfirm";
import { useToast } from "@/hooks/use-toast";
import {
  validatePriceData,
  validateCategoryName,
  validateModelName,
  validateConfigName,
  validatePriceValue,
} from "@/lib/validators";
import type { PriceConfig, PriceField } from "@/types";

export default function App() {
  const { loadFile, saveFile } = useJsonFile();
  const {
    priceData,
    setData,
    updatePrice,
    addCategory,
    deleteCategory,
    addModel,
    deleteModel,
    addConfig,
    deleteConfig,
  } = usePriceData();
  const { toast } = useToast();
  const {
    isOpen: isConfirmOpen,
    confirm,
    handleConfirm,
    handleCancel,
  } = useConfirm();

  const handleLoadFile = useCallback(
    async (file: File) => {
      try {
        const result = await loadFile(file);

        if (!result.success || !result.data) {
          toast({
            title: "Ошибка",
            description: result.error || "Не удалось прочитать JSON файл",
            variant: "destructive",
          });
          return;
        }

        if (!validatePriceData(result.data)) {
          toast({
            title: "Ошибка",
            description: "Некорректная структура данных в JSON файле",
            variant: "destructive",
          });
          return;
        }

        setData(result.data);
        toast({
          title: "Успешно",
          description: "Файл успешно загружен",
          variant: "success",
        });
      } catch (error) {
        console.error("❌ Ошибка загрузки файла:", error);
        toast({
          title: "Ошибка",
          description: "Не удалось прочитать JSON файл",
          variant: "destructive",
        });
      }
    },
    [loadFile, setData, toast],
  );

  const handleSaveFile = useCallback(() => {
    if (!priceData || Object.keys(priceData).length === 0) {
      toast({
        title: "Ошибка",
        description: "Нет данных для сохранения",
        variant: "destructive",
      });
      return;
    }

    try {
      const result = saveFile(priceData);

      if (!result.success) {
        toast({
          title: "Ошибка",
          description: result.error || "Не удалось сохранить файл",
          variant: "destructive",
        });
        return;
      }

      toast({
        title: "Успешно",
        description: "Файл успешно сохранен",
        variant: "success",
      });
    } catch (error) {
      console.error("❌ Ошибка сохранения:", error);
      toast({
        title: "Ошибка",
        description: "Не удалось сохранить файл",
        variant: "destructive",
      });
    }
  }, [priceData, saveFile, toast]);

  const handleAddCategory = useCallback(
    (name: string) => {
      const validation = validateCategoryName(name, Object.keys(priceData));

      if (!validation.isValid) {
        toast({
          title: "Ошибка",
          description: validation.errors[0]?.message || "Ошибка валидации",
          variant: "destructive",
        });
        return;
      }

      addCategory(name);
      toast({
        title: "Успешно",
        description: "Категория добавлена",
        variant: "success",
      });
    },
    [priceData, addCategory, toast],
  );

  const handleAddModel = useCallback(
    (category: string, name: string) => {
      const validation = validateModelName(name, category, priceData);

      if (!validation.isValid) {
        toast({
          title: "Ошибка",
          description: validation.errors[0]?.message || "Ошибка валидации",
          variant: "destructive",
        });
        return;
      }

      addModel(category, name);
      toast({
        title: "Успешно",
        description: "Модель добавлена",
        variant: "success",
      });
    },
    [priceData, addModel, toast],
  );

  const handleAddConfig = useCallback(
    (category: string, model: string, name: string, price: number) => {
      const validation = validateConfigName(name, category, model, priceData);
      const priceValidation = validatePriceValue(price, true);

      if (!validation.isValid) {
        toast({
          title: "Ошибка",
          description: validation.errors[0]?.message || "Ошибка валидации",
          variant: "destructive",
        });
        return;
      }

      if (!priceValidation.isValid) {
        toast({
          title: "Ошибка",
          description:
            priceValidation.errors[0]?.message || "Ошибка валидации цены",
          variant: "destructive",
        });
        return;
      }

      const newPriceConfig: PriceConfig = {
        purchase_entry: price,
        wholesale_small: null,
        market: null,
      };

      addConfig(category, model, name, newPriceConfig);
      toast({
        title: "Успешно",
        description: "Конфигурация добавлена",
        variant: "success",
      });
    },
    [priceData, addConfig, toast],
  );

  const handleUpdatePrice = useCallback(
    (
      category: string,
      model: string,
      config: string,
      field: PriceField,
      value: number | null,
    ) => {
      const validation = validatePriceValue(value, field === "purchase_entry");

      if (!validation.isValid) {
        toast({
          title: "Ошибка",
          description: validation.errors[0]?.message || "Ошибка валидации цены",
          variant: "destructive",
        });
        return;
      }

      updatePrice(category, model, config, field, value);
    },
    [updatePrice, toast],
  );

  const handleDeleteCategory = useCallback(
    async (category: string) => {
      const confirmed = await confirm();
      if (confirmed) {
        deleteCategory(category);
        toast({
          title: "Успешно",
          description: "Категория удалена",
          variant: "success",
        });
      }
    },
    [confirm, deleteCategory, toast],
  );

  const handleDeleteModel = useCallback(
    async (category: string, model: string) => {
      const confirmed = await confirm();
      if (confirmed) {
        deleteModel(category, model);
        toast({
          title: "Успешно",
          description: "Модель удалена",
          variant: "success",
        });
      }
    },
    [confirm, deleteModel, toast],
  );

  const handleDeleteConfig = useCallback(
    async (category: string, model: string, config: string) => {
      const confirmed = await confirm();
      if (confirmed) {
        deleteConfig(category, model, config);
        toast({
          title: "Успешно",
          description: "Конфигурация удалена",
          variant: "success",
        });
      }
    },
    [confirm, deleteConfig, toast],
  );

  const categories = Object.keys(priceData);
  const hasData = categories.length > 0;

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="max-w-7xl xl:max-w-6xl 2xl:max-w-7xl mx-auto px-2 xs:px-3 sm:px-4 lg:px-6">
        <Header
          onLoadFile={handleLoadFile}
          onSaveFile={handleSaveFile}
          hasData={hasData}
        />

        <div className="flex flex-col md:flex-row">
          <Sidebar
            categories={categories}
            priceData={priceData}
            onAddCategory={handleAddCategory}
            onAddModel={handleAddModel}
            onAddConfig={handleAddConfig}
          />

          <div className="flex-1">
            <ScrollArea className="h-[calc(100vh-72px)] p-2 xs:p-3 sm:p-4">
              {!hasData ? (
                <EmptyState />
              ) : (
                <>
                  {categories.map((category) => (
                    <CategoryBlock
                      key={category}
                      categoryName={category}
                      models={
                        priceData[category] as Record<
                          string,
                          Record<string, PriceConfig>
                        >
                      }
                      onUpdatePrice={handleUpdatePrice}
                      onDeleteCategory={handleDeleteCategory}
                      onDeleteModel={handleDeleteModel}
                      onDeleteConfig={handleDeleteConfig}
                    />
                  ))}
                </>
              )}
            </ScrollArea>
          </div>
        </div>
      </div>

      <AlertDialog open={isConfirmOpen} onOpenChange={handleCancel}>
        <AlertDialogContent className="mx-4 max-w-[calc(100vw-2rem)] sm:max-w-lg">
          <AlertDialogTitle className="text-lg sm:text-xl">
            Подтверждение удаления
          </AlertDialogTitle>
          <AlertDialogDescription className="text-sm sm:text-base">
            Вы уверены, что хотите удалить этот элемент? Это действие нельзя
            отменить.
          </AlertDialogDescription>
          <div className="flex gap-2 justify-end mt-4 sm:mt-6">
            <AlertDialogCancel className="text-sm sm:text-base">
              Отмена
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={handleConfirm}
              className="bg-red-600 hover:bg-red-700 text-sm sm:text-base"
            >
              Удалить
            </AlertDialogAction>
          </div>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
