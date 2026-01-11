import { useRef } from "react";
import { Button } from "@/components/ui/button";
import { Upload, Download, Menu } from "lucide-react";
import type { HeaderProps } from "@/types";

export function Header({ onLoadFile, onSaveFile, hasData }: HeaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      onLoadFile(file);
    }
    // Reset input value to allow selecting the same file again
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleLoadClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="bg-white border-b border-gray-200 px-3 xs:px-4 sm:px-6 py-3 sm:py-4">
      <div className="max-w-7xl xl:max-w-6xl 2xl:max-w-7xl mx-auto flex items-center justify-between">
        <div className="flex items-center gap-2 sm:gap-3">
          <Button variant="ghost" size="sm" className="md:hidden p-2">
            <Menu className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-lg sm:text-xl lg:text-2xl font-bold text-gray-900 leading-tight">
              Apple Price Manager
            </h1>
            <p className="text-xs sm:text-sm text-gray-600 mt-0.5 sm:mt-1 hidden xs:block">
              Управление ценами на продукцию Apple
            </p>
          </div>
        </div>

        <div className="flex gap-2 sm:gap-3">
          <div className="relative">
            <input
              ref={fileInputRef}
              type="file"
              accept=".json"
              onChange={handleFileSelect}
              className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
            />
            <Button
              variant="outline"
              onClick={handleLoadClick}
              size="sm"
              className="px-2 xs:px-3 sm:px-4 h-9 sm:h-10 min-w-0 xs:min-w-[auto]"
            >
              <Upload className="h-4 w-4 xs:mr-1 sm:mr-2 flex-shrink-0" />
              <span className="hidden xs:inline text-xs sm:text-sm">
                Загрузить
              </span>
            </Button>
          </div>

          <Button
            onClick={onSaveFile}
            disabled={!hasData}
            size="sm"
            className="bg-gradient-to-r from-purple-500 to-purple-700 hover:from-purple-600 hover:to-purple-800 px-2 xs:px-3 sm:px-4 h-9 sm:h-10 min-w-0 xs:min-w-[auto]"
          >
            <Download className="h-4 w-4 xs:mr-1 sm:mr-2 flex-shrink-0" />
            <span className="hidden xs:inline text-xs sm:text-sm">
              Сохранить
            </span>
          </Button>
        </div>
      </div>
    </div>
  );
}
