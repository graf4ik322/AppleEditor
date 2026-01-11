import { useReducer, useCallback } from "react";
import type {
  PriceData,
  PriceConfig,
  PriceField,
  PriceDataAction,
} from "@/types";

const initialState: PriceData = {};

function priceDataReducer(state: PriceData, action: PriceDataAction): any {
  switch (action.type) {
    case "SET_DATA":
      return action.payload;

    case "UPDATE_PRICE": {
      const { category, model, config, field, value } = action.payload;

      if (
        !state[category] ||
        !state[category][model] ||
        !state[category][model][config]
      ) {
        return state;
      }

      const newState = { ...state };
      const newCategory = { ...newState[category] };
      const newModel = { ...newCategory[model] };
      const newConfig = { ...newModel[config] };

      (newConfig as any)[field] = value;
      newModel[config] = newConfig;
      newCategory[model] = newModel;
      newState[category] = newCategory;

      return newState;
    }

    case "ADD_CATEGORY": {
      const categoryName = action.payload;
      if (state[categoryName]) {
        return state;
      }

      return {
        ...state,
        [categoryName]: {},
      };
    }

    case "DELETE_CATEGORY": {
      const categoryName = action.payload;
      const newState = { ...state };
      delete newState[categoryName];
      return newState;
    }

    case "ADD_MODEL": {
      const { category, model } = action.payload;

      if (!state[category] || state[category][model]) {
        return state;
      }

      const newState = { ...state };
      const newCategory = { ...newState[category] };
      newCategory[model] = {};
      newState[category] = newCategory;

      return newState;
    }

    case "DELETE_MODEL": {
      const { category, model } = action.payload;

      if (!state[category] || !state[category][model]) {
        return state;
      }

      const newState = { ...state };
      const newCategory = { ...newState[category] };
      delete newCategory[model];
      newState[category] = newCategory;

      return newState;
    }

    case "ADD_CONFIG": {
      const { category, model, config, prices } = action.payload;

      if (
        !state[category] ||
        !state[category][model] ||
        state[category][model][config]
      ) {
        return state;
      }

      const newState = { ...state };
      const newCategory = { ...newState[category] };
      const newModel = { ...newCategory[model] };
      (newModel as any)[config] = prices;
      newCategory[model] = newModel;
      newState[category] = newCategory;

      return newState;
    }

    case "DELETE_CONFIG": {
      const { category, model, config } = action.payload;

      if (
        !state[category] ||
        !state[category][model] ||
        !state[category][model][config]
      ) {
        return state;
      }

      const newState = { ...state };
      const newCategory = { ...newState[category] };
      const newModel = { ...newCategory[model] };
      delete newModel[config];
      newCategory[model] = newModel;
      newState[category] = newCategory;

      return newState;
    }

    default:
      return state;
  }
}

export function usePriceData() {
  const [priceData, dispatch] = useReducer(priceDataReducer, initialState);

  const setData = useCallback((data: PriceData) => {
    dispatch({ type: "SET_DATA", payload: data });
  }, []);

  const updatePrice = useCallback(
    (
      category: string,
      model: string,
      config: string,
      field: PriceField,
      value: number | null,
    ) => {
      dispatch({
        type: "UPDATE_PRICE",
        payload: { category, model, config, field, value },
      });
    },
    [],
  );

  const addCategory = useCallback((name: string) => {
    dispatch({ type: "ADD_CATEGORY", payload: name });
  }, []);

  const deleteCategory = useCallback((name: string) => {
    dispatch({ type: "DELETE_CATEGORY", payload: name });
  }, []);

  const addModel = useCallback((category: string, name: string) => {
    dispatch({ type: "ADD_MODEL", payload: { category, model: name } });
  }, []);

  const deleteModel = useCallback((category: string, name: string) => {
    dispatch({ type: "DELETE_MODEL", payload: { category, model: name } });
  }, []);

  const addConfig = useCallback(
    (category: string, model: string, name: string, prices: PriceConfig) => {
      dispatch({
        type: "ADD_CONFIG",
        payload: { category, model, config: name, prices },
      });
    },
    [],
  );

  const deleteConfig = useCallback(
    (category: string, model: string, name: string) => {
      dispatch({
        type: "DELETE_CONFIG",
        payload: { category, model, config: name },
      });
    },
    [],
  );

  return {
    priceData,
    setData,
    updatePrice,
    addCategory,
    deleteCategory,
    addModel,
    deleteModel,
    addConfig,
    deleteConfig,
  };
}
