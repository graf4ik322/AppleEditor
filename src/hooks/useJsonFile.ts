import { useCallback } from "react";
import type { PriceData, FileLoadResult, FileSaveResult } from "@/types";

export function useJsonFile() {
  const loadFile = useCallback((file: File): Promise<FileLoadResult> => {
    return new Promise((resolve) => {
      const reader = new FileReader();

      reader.onload = (e) => {
        try {
          const content = e.target?.result as string;
          const data = JSON.parse(content);

          resolve({
            success: true,
            data,
          });
        } catch (error) {
          resolve({
            success: false,
            error:
              error instanceof Error
                ? error.message
                : "Failed to parse JSON file",
          });
        }
      };

      reader.onerror = () => {
        resolve({
          success: false,
          error: "Failed to read file",
        });
      };

      reader.readAsText(file);
    });
  }, []);

  const saveFile = useCallback((data: PriceData): FileSaveResult => {
    try {
      const json = JSON.stringify(data, null, 2);
      const blob = new Blob([json], { type: "application/json" });
      const url = URL.createObjectURL(blob);

      const a = document.createElement("a");
      a.href = url;
      a.download = `price-config-${new Date().toISOString().split("T")[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);

      URL.revokeObjectURL(url);

      return { success: true };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : "Failed to save file",
      };
    }
  }, []);

  return { loadFile, saveFile };
}
