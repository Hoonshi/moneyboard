import { MonthlyComparison } from "./_components/monthlyComparison";
import { DailyTrendChart } from "./_components/dailyTrendChart";
import { TopExpenses } from "./_components/topExpenses";
import ReportSummary from "./_components/reportSummary";
import MonthlyTrend from "./_components/monthlyTrendChart";
import ReportHeader from "./_components/reportHeader";

export default function ReportsPage() {
  return (
    <div className="h-full flex flex-col bg-gray-50 lg:bg-white">
      {/* 헤더 */}
      <ReportHeader />

      <div className="flex-1 overflow-auto p-4 lg:p-5 pb-24 lg:pb-5">
        <div className="space-y-4">
          {/*  요약 */}
          <ReportSummary />

          {/* 차트 */}
          <MonthlyTrend />

          {/* 전월대비 */}
          <MonthlyComparison />

          {/* 일별 지출 추이 */}
          <DailyTrendChart />

          {/* 상위 지출 5개 */}
          <TopExpenses />
        </div>
      </div>
    </div>
  );
}
