export function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center min-h-[300px] xs:min-h-[400px] text-center p-4 xs:p-6 sm:p-8">
      <div className="text-4xl xs:text-5xl sm:text-6xl mb-3 xs:mb-4">📊</div>
      <h2 className="text-lg xs:text-xl sm:text-2xl font-semibold text-gray-900 mb-2 xs:mb-3">
        Нет данных для отображения
      </h2>
      <p className="text-gray-600 mb-4 xs:mb-6 max-w-xs sm:max-w-md text-sm sm:text-base">
        Загрузите JSON файл с данными о ценах или используйте кнопку "+" для
        добавления новой категории.
      </p>
      <div className="space-y-2 text-xs sm:text-sm text-gray-500 max-w-xs sm:max-w-md">
        <p>💡 Формат JSON файла:</p>
        <code className="bg-gray-100 px-2 py-1 rounded text-xs block mt-2 p-2 break-all">
          {
            '{"Категория": {"Модель": {"Конфигурация": {"purchase_entry": 1000}}}}'
          }
        </code>
      </div>
    </div>
  );
}
