"use client";

import { useState, useEffect } from "react";
import { useTransactionList } from "@/hooks/query/useTransactionList";
import type { TransactionFilter, TransactionSort } from "@/types/transaction";
import { TransactionFilterBar } from "./transactionFilterBar";
import { TransactionList } from "./transactionList";
import { TransactionPagination } from "./transactionPagination";

export function TransactionContent() {
  const [page, setPage] = useState(1);
  const pageSize = 10;

  const [filter, setFilter] = useState<TransactionFilter>({
    type: "all",
    categoryId: null,
    search: "",
  });
  const [sort, setSort] = useState<TransactionSort>({
    key: "date",
    direction: "desc",
  });

  const { data, isPending, error } = useTransactionList({
    filter,
    sort,
    page,
    pageSize,
  });

  useEffect(() => {
    setTimeout(() => {
      setPage(1);
    }, 0);
  }, [filter, sort]);

  const handleFilterChange = (newFilter: TransactionFilter) => {
    setFilter(newFilter);
    setPage(1);
  };

  return (
    <div className="space-y-3">
      <TransactionFilterBar
        filter={filter}
        onFilterChange={handleFilterChange}
      />
      <TransactionList data={data.data} />
      <TransactionPagination
        page={page}
        totalPages={data.totalPages}
        onPageChange={setPage}
      />
    </div>
  );
}
