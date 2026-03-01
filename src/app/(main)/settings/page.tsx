import { getQueryClient } from "@/lib/get-query-client";
import { AccountSection } from "./_components/accountSection";
import { CategorySection } from "./_components/categorySection";
import { ProfileSection } from "./_components/profileSection";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { categoryKeys } from "@/lib/queryKey";
import fetchReportCategories from "@/apis/categories/fetchReportCategories";
import { Suspense } from "react";
import { CategorySectionSkeleton } from "@/components/skeleton/categorySectionSkeleton";

export default async function SettingsPage() {
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: categoryKeys.list(),
    queryFn: () => fetchReportCategories(),
  });

  return (
    <div className="h-full flex flex-col bg-gray-50 lg:bg-white">
      <header className="bg-white flex items-center justify-between px-4 lg:px-6 py-3 lg:py-4 border-b border-gray-100 shrink-0">
        <div>
          <h1 className="text-base lg:text-sm font-bold text-gray-900 lg:text-gray-800">
            설정
          </h1>
          <p className="hidden lg:block text-xs text-gray-400 mt-0.5">
            앱 설정 및 카테고리 관리
          </p>
        </div>
      </header>
      <div className="flex-1 overflow-auto p-4 lg:p-5 pb-24 lg:pb-5">
        <div className="max-w-lg space-y-5">
          <ProfileSection />
          <Suspense fallback={<CategorySectionSkeleton />}>
            <HydrationBoundary state={dehydrate(queryClient)}>
              <CategorySection />
            </HydrationBoundary>
          </Suspense>
          <AccountSection />
        </div>{" "}
      </div>
    </div>
  );
}
