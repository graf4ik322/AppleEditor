// Core price configuration interface
export interface PriceConfig {
  purchase_entry: number; // Required, >= 0
  wholesale_small: number | null; // Optional, >= 0 or null
  market: number | null; // Optional, >= 0 or null
}

// Configuration maps configuration names to price configs
export interface Configuration {
  [configName: string]: PriceConfig;
}

// Model maps model names to configurations
export interface Model {
  [modelName: string]: Configuration;
}

// Category maps model names to models
export interface Category {
  [modelName: string]: Model;
}

// Main price data structure
export interface PriceData {
  [categoryName: string]: Category;
}

// Price field types for updates
export type PriceField = keyof PriceConfig;

// File operations interfaces
export interface FileLoadResult {
  success: boolean;
  data?: PriceData;
  error?: string;
}

export interface FileSaveResult {
  success: boolean;
  error?: string;
}

// Component props interfaces
export interface CategoryBlockProps {
  categoryName: string;
  models: Record<string, Record<string, PriceConfig>>;
  onUpdatePrice: (
    category: string,
    model: string,
    config: string,
    field: PriceField,
    value: number | null,
  ) => void;
  onDeleteCategory: (category: string) => void;
  onDeleteModel: (category: string, model: string) => void;
  onDeleteConfig: (category: string, model: string, config: string) => void;
}

export interface ModelItemProps {
  category: string;
  modelName: string;
  configs: Record<string, PriceConfig>;
  onUpdatePrice: (
    category: string,
    model: string,
    config: string,
    field: PriceField,
    value: number | null,
  ) => void;
  onDeleteModel: (category: string, model: string) => void;
  onDeleteConfig: (category: string, model: string, config: string) => void;
}

export interface ConfigItemProps {
  category: string;
  model: string;
  configName: string;
  prices: PriceConfig;
  onUpdatePrice: (
    category: string,
    model: string,
    config: string,
    field: PriceField,
    value: number | null,
  ) => void;
  onDeleteConfig: (category: string, model: string, config: string) => void;
}

export interface HeaderProps {
  onLoadFile: (file: File) => Promise<void>;
  onSaveFile: () => void;
  hasData: boolean;
}

export interface SidebarProps {
  categories: string[];
  priceData: PriceData;
  onAddCategory: (name: string) => void;
  onAddModel: (category: string, name: string) => void;
  onAddConfig: (
    category: string,
    model: string,
    name: string,
    price: number,
  ) => void;
}

// Validation interfaces
export interface ValidationError {
  field: string;
  message: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[];
}

// Price data action types for useReducer
export type PriceDataAction =
  | { type: "SET_DATA"; payload: PriceData }
  | {
      type: "UPDATE_PRICE";
      payload: {
        category: string;
        model: string;
        config: string;
        field: PriceField;
        value: number | null;
      };
    }
  | { type: "ADD_CATEGORY"; payload: string }
  | { type: "DELETE_CATEGORY"; payload: string }
  | { type: "ADD_MODEL"; payload: { category: string; model: string } }
  | { type: "DELETE_MODEL"; payload: { category: string; model: string } }
  | {
      type: "ADD_CONFIG";
      payload: {
        category: string;
        model: string;
        config: string;
        prices: PriceConfig;
      };
    }
  | {
      type: "DELETE_CONFIG";
      payload: { category: string; model: string; config: string };
    };
