import { Suspense } from "react";
import SearchPageContent from "./SearchPageContent";

const SearchPage = () => {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-gray-50 text-gray-500">
          Loading search results...
        </div>
      }
    >
      <SearchPageContent />
    </Suspense>
  );
};

export default SearchPage;
