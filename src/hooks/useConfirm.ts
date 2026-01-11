import { useState, useCallback } from "react";

export function useConfirm() {
  const [isOpen, setIsOpen] = useState(false);
  const [resolvePromise, setResolvePromise] = useState<{
    resolve: (value: boolean) => void;
  } | null>(null);

  const confirm = useCallback((): Promise<boolean> => {
    return new Promise((resolve) => {
      setResolvePromise({ resolve });
      setIsOpen(true);
    });
  }, []);

  const handleConfirm = useCallback(() => {
    if (resolvePromise) {
      resolvePromise.resolve(true);
      setResolvePromise(null);
    }
    setIsOpen(false);
  }, [resolvePromise]);

  const handleCancel = useCallback(() => {
    if (resolvePromise) {
      resolvePromise.resolve(false);
      setResolvePromise(null);
    }
    setIsOpen(false);
  }, [resolvePromise]);

  return {
    isOpen,
    confirm,
    handleConfirm,
    handleCancel,
  };
}
