"use client";

import { useSearchParams } from "next/navigation";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

interface CustomerPaginationProps {
  totalCustomers: number;
}

export function CustomerPagination({
  totalCustomers,
}: CustomerPaginationProps) {
  const searchParams = useSearchParams();

  const page = Number(searchParams.get("page") || "1");
  const pageSize = 10;
  const totalPages = Math.ceil(totalCustomers / pageSize);

  const createPageURL = (pageNumber: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", pageNumber.toString());
    return `/customers?${params.toString()}`;
  };

  return (
    <Pagination>
      <PaginationContent>
        {page > 1 && (
          <PaginationItem>
            <PaginationPrevious href={createPageURL(page - 1)} />
          </PaginationItem>
        )}

        {[...Array(Math.min(totalPages, 5))].map((_, i) => {
          const pageNumber = i + 1;
          return (
            <PaginationItem key={pageNumber}>
              <PaginationLink
                href={createPageURL(pageNumber)}
                isActive={page === pageNumber}
              >
                {pageNumber}
              </PaginationLink>
            </PaginationItem>
          );
        })}

        {totalPages > 5 && (
          <>
            <PaginationItem>
              <PaginationEllipsis />
            </PaginationItem>
            <PaginationItem>
              <PaginationLink href={createPageURL(totalPages)}>
                {totalPages}
              </PaginationLink>
            </PaginationItem>
          </>
        )}

        {page < totalPages && (
          <PaginationItem>
            <PaginationNext href={createPageURL(page + 1)} />
          </PaginationItem>
        )}
      </PaginationContent>
    </Pagination>
  );
}
