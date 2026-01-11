import type {
  PriceData,
  PriceConfig,
  ValidationResult,
  ValidationError,
} from "@/types";

/**
 * Validates a single price configuration
 */
export function validatePriceConfig(config: unknown): config is PriceConfig {
  if (!config || typeof config !== "object") {
    return false;
  }

  const priceConfig = config as PriceConfig;

  // purchase_entry is required and must be >= 0
  if (
    typeof priceConfig.purchase_entry !== "number" ||
    priceConfig.purchase_entry < 0
  ) {
    return false;
  }

  // wholesale_small is optional, null or >= 0
  if (
    priceConfig.wholesale_small !== null &&
    (typeof priceConfig.wholesale_small !== "number" ||
      priceConfig.wholesale_small < 0)
  ) {
    return false;
  }

  // market is optional, null or >= 0
  if (
    priceConfig.market !== null &&
    (typeof priceConfig.market !== "number" || priceConfig.market < 0)
  ) {
    return false;
  }

  return true;
}

/**
 * Validates a single price value
 */
export function validatePriceValue(
  value: number | null,
  required: boolean = false,
): ValidationResult {
  const errors: ValidationError[] = [];

  if (required && (value === null || value === undefined)) {
    errors.push({
      field: "price",
      message: "Это поле обязательно для заполнения",
    });
  }

  if (value !== null && value !== undefined) {
    if (typeof value !== "number") {
      errors.push({
        field: "price",
        message: "Значение должно быть числом",
      });
    } else if (value < 0) {
      errors.push({
        field: "price",
        message: "Цена не может быть отрицательной",
      });
    } else if (!isFinite(value)) {
      errors.push({
        field: "price",
        message: "Значение должно быть конечным числом",
      });
    }
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

/**
 * Validates category name
 */
export function validateCategoryName(
  name: string,
  existingCategories: string[],
): ValidationResult {
  const errors: ValidationError[] = [];

  if (!name || typeof name !== "string" || name.trim().length === 0) {
    errors.push({
      field: "category",
      message: "Название категории не может быть пустым",
    });
  } else if (existingCategories.includes(name.trim())) {
    errors.push({
      field: "category",
      message: "Категория с таким названием уже существует",
    });
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

/**
 * Validates model name within a category
 */
export function validateModelName(
  name: string,
  category: string,
  priceData: PriceData,
): ValidationResult {
  const errors: ValidationError[] = [];

  if (!name || typeof name !== "string" || name.trim().length === 0) {
    errors.push({
      field: "model",
      message: "Название модели не может быть пустым",
    });
  } else if (priceData[category] && priceData[category][name.trim()]) {
    errors.push({
      field: "model",
      message: "Модель с таким названием уже существует в этой категории",
    });
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

/**
 * Validates configuration name within a model
 */
export function validateConfigName(
  name: string,
  category: string,
  model: string,
  priceData: PriceData,
): ValidationResult {
  const errors: ValidationError[] = [];

  if (!name || typeof name !== "string" || name.trim().length === 0) {
    errors.push({
      field: "config",
      message: "Название конфигурации не может быть пустым",
    });
  } else if (priceData[category]?.[model]?.[name.trim()]) {
    errors.push({
      field: "config",
      message: "Конфигурация с таким названием уже существует в этой модели",
    });
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

/**
 * Validates the complete PriceData structure
 */
export function validatePriceData(data: unknown): data is PriceData {
  if (!data || typeof data !== "object") {
    return false;
  }

  const priceData = data as PriceData;

  // Check each category
  for (const [categoryName, category] of Object.entries(priceData)) {
    if (
      typeof categoryName !== "string" ||
      !category ||
      typeof category !== "object"
    ) {
      return false;
    }

    // Check each model in category
    for (const [modelName, model] of Object.entries(category)) {
      if (
        typeof modelName !== "string" ||
        !model ||
        typeof model !== "object"
      ) {
        return false;
      }

      // Check each configuration in model
      for (const [configName, config] of Object.entries(model)) {
        if (typeof configName !== "string") {
          return false;
        }

        if (!validatePriceConfig(config)) {
          return false;
        }
      }
    }
  }

  return true;
}

/**
 * Validates JSON string and attempts to parse as PriceData
 */
export function validateAndParseJson(
  jsonString: string,
): ValidationResult & { data?: PriceData } {
  const errors: ValidationError[] = [];

  try {
    const parsed = JSON.parse(jsonString);

    if (!validatePriceData(parsed)) {
      errors.push({
        field: "structure",
        message: "Некорректная структура данных в JSON файле",
      });
    }

    return {
      isValid: errors.length === 0,
      errors,
      data: errors.length === 0 ? parsed : undefined,
    };
  } catch (error) {
    errors.push({
      field: "json",
      message:
        error instanceof SyntaxError
          ? "Невалидный JSON формат"
          : "Ошибка при парсинге JSON",
    });

    return {
      isValid: false,
      errors,
    };
  }
}

/**
 * Gets validation error message as a single string
 */
export function getValidationErrorMessage(
  validation: ValidationResult,
): string {
  if (validation.isValid) {
    return "";
  }

  return validation.errors.map((error) => error.message).join(". ");
}
