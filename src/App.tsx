import React, { useState, useMemo, useEffect } from "react";
import {
  MantineProvider,
  Paper,
  Title,
  MantineThemeOverride,
  Loader,
} from "@mantine/core";
import MaxMinProductionTable from "./components/MaxMinProductionTable";
import AvgYieldAreaTable from "./components/AvgYieldAreaTable";
import CustomNavbar from "./components/Navbar";

const App: React.FC = () => {
  const [colorScheme, setColorScheme] = useState<"light" | "dark">("dark");
  const [loading, setLoading] = useState(true);

  const toggleColorScheme = () => {
    setColorScheme((prevScheme) => (prevScheme === "light" ? "dark" : "light"));
  };

  useEffect(() => {
    // Simulate a data fetch with a timeout
    const fetchData = async () => {
      setLoading(true);
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setLoading(false);
    };
    fetchData();
  }, []);

  const theme: MantineThemeOverride = useMemo(
    () => ({
      colorScheme,
      colors: {
        dark: [
          "#000000",
          "#111111",
          "#222222",
          "#333333",
          "#444444",
          "#555555",
          "#666666",
          "#777777",
          "#888888",
          "#999999",
        ] as const,
        light: [
          "#ffffff",
          "#f0f0f0",
          "#e0e0e0",
          "#d0d0d0",
          "#c0c0c0",
          "#b0b0b0",
          "#a0a0a0",
          "#909090",
          "#808080",
          "#707070",
        ] as const,
      },
      components: {
        Paper: {
          styles: (theme: any) => ({
            root: {
              backgroundColor:
                colorScheme === "dark"
                  ? theme.colors.dark[3]
                  : theme.colors.light[0],
            },
          }),
        },
        Title: {
          styles: (theme: any) => ({
            root: {
              color:
                colorScheme === "dark"
                  ? theme.colors.light[0]
                  : theme.colors.dark[3],
            },
          }),
        },
      },
    }),
    [colorScheme]
  );

  return (
    <MantineProvider theme={theme}>
      <div>
        <CustomNavbar
          toggleColorScheme={toggleColorScheme}
          colorScheme={colorScheme}
        />
      </div>
      <div
        style={{
          padding: "20px",
          display: "flex",
          gap: "2rem",
          flexDirection: "column",
        }}
      >
        {loading ? (
          <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh" }}>
          <Loader color="violet" size="lg" />
          </div>
        ) : (
          <>
            <Paper shadow="xl" radius="lg" p="xl">
              <Title order={2}>Yearly Crop Aggregations</Title>
              <MaxMinProductionTable colorScheme={colorScheme} />
            </Paper>

            <Paper shadow="xl" radius="lg" p="xl">
              <Title order={2} style={{ marginTop: "20px" }}>
                Crop Averages (1950-2020)
              </Title>
              <AvgYieldAreaTable colorScheme={colorScheme} />
            </Paper>
          </>
        )}
      </div>
    </MantineProvider>
  );
};

export default App;
