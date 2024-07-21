import React from "react";
import { Table } from "@mantine/core";
import { cropAggregations } from "../utils/dataProcessing";

const AvgYieldAreaTable: React.FC = () => {
  return (
    <Table>
      <thead>
        <Table.Tr>
          <Table.Th>Crop</Table.Th>
          <Table.Th>Average Yield</Table.Th>
          <Table.Th>Average Cultivation Area</Table.Th>
        </Table.Tr>
      </thead>
      <tbody>
        {cropAggregations.map((crop) => (
          <Table.Tr key={crop.Crop}>
            <Table.Td>{crop.Crop}</Table.Td>
            <Table.Td>{crop.AvgYield}</Table.Td>
            <Table.Td>{crop.AvgArea}</Table.Td>
          </Table.Tr>
        ))}
      </tbody>
    </Table>
  );
};

export default AvgYieldAreaTable;
