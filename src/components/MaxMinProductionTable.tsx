import React, { useState, useEffect } from "react";
import { Table, Pagination, Select } from "@mantine/core";
import { yearlyAggregations } from "../utils/dataProcessing";

const MaxMinProductionTable: React.FC<{ colorScheme: "light" | "dark" }> = ({
  colorScheme,
}) => {
  const textColor = colorScheme === "dark" ? "#ffffff" : "#000000";
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 600);

  const years = Object.keys(yearlyAggregations);

  const paginatedYears = years.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page: number) => setCurrentPage(page);

  const handleItemsPerPageChange = (value: string | null) => {
    if (value) {
      setItemsPerPage(parseInt(value, 10));
      setCurrentPage(1);
    }
  };

  const totalPages = Math.ceil(years.length / itemsPerPage);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 600);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div style={{ padding: "20px", color: textColor }}>
      <Table style={{ width: "100%", tableLayout: "fixed" }}>
        <thead>
          <Table.Tr>
            <Table.Th style={{ width: "33.33%" }}>Year</Table.Th>
            <Table.Th style={{ width: "33.33%" }}>
              Crop with Maximum Production
            </Table.Th>
            <Table.Th style={{ width: "33.33%" }}>
              Crop with Minimum Production
            </Table.Th>
          </Table.Tr>
        </thead>
        <Table.Tbody>
          {paginatedYears.map((year) => (
            <Table.Tr key={year}>
              <Table.Td style={{ width: "33.33%" }}>{year}</Table.Td>
              <Table.Td style={{ width: "33.33%" }}>
                {yearlyAggregations[year].maxCrop}
              </Table.Td>
              <Table.Td style={{ width: "33.33%" }}>
                {yearlyAggregations[year].minCrop}
              </Table.Td>
            </Table.Tr>
          ))}
        </Table.Tbody>
      </Table>

      <div
        style={{
          marginTop: "20px",
          textAlign: "center",
          display: "flex",
          flexDirection: isMobile ? "column" : "row",
          justifyContent: "center",
          alignItems: "center",
          gap: isMobile ? "1rem" : "2rem",
        }}
      >
        {totalPages > 1 && (
          <Pagination
            value={currentPage}
            onChange={handlePageChange}
            total={totalPages}
            siblings={1}
            boundaries={1}
            style={{ display: "flex", justifyContent: "center" }}
          />
        )}

        <div
          style={{
            display: "flex",
            flexDirection: isMobile ? "column" : "row",
            alignItems: "center",
            gap: "0.5rem",
          }}
        >
          <label style={{ marginBottom: isMobile ? "0.5rem" : "0" }}>
            Items per page:
          </label>
          <Select
            value={itemsPerPage.toString()}
            onChange={handleItemsPerPageChange}
            data={[
              { value: "10", label: "10 items per page" },
              { value: "15", label: "15 items per page" },
              { value: "20", label: "20 items per page" },
            ]}
            style={{ width: "auto" }}
          />
        </div>
      </div>
    </div>
  );
};

export default MaxMinProductionTable;
