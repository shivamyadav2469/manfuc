import React, { useState } from 'react';
import { MantineProvider, Paper, Title } from '@mantine/core';
import MaxMinProductionTable from './components/MaxMinProductionTable';
import AvgYieldAreaTable from './components/AvgYieldAreaTable';
import CustomNavbar from './components/Navbar';



const App: React.FC = () => {
  const [colorScheme, setColorScheme] = useState<'light' | 'dark'>('dark');

  const toggleColorScheme = () => {
    setColorScheme((prevScheme) => (prevScheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <MantineProvider
  theme={{
    colorScheme: colorScheme,
    colors: {
      dark: ['#1a1a1a', '#333333', '#444444', '#555555', '#666666', '#808080', '#999999', '#b3b3b3', '#cccccc', '#e6e6e6'],
      gray: ['#ffffff', '#f5f5f5', '#e0e0e0', '#cccccc', '#b3b3b3', '#999999', '#808080', '#666666', '#333333', '#000000'],
    },
    components: {
      Paper: {
        styles: (theme: any) => ({
          root: {
            backgroundColor: theme.colorScheme === 'dark' ? '#333333' : '#ffffff',
            color: theme.colorScheme === 'dark' ? '#ffffff' : '#000000',
          },
        }),
      },
      Title: {
        styles: (theme: any) => ({
          root: {
            color: theme.colorScheme === 'dark' ? '#ffffff' : '#000000',
          },
        }),
      },
      Table: {
        styles: (theme: any) => ({
          root: {
            borderColor: theme.colorScheme === 'dark' ? '#555555' : '#cccccc',
            color: theme.colorScheme === 'dark' ? '#ffffff' : '#000000',
          },
          thead: {
            backgroundColor: theme.colorScheme === 'dark' ? '#444444' : '#e0e0e0',
          },
          tbody: {
            backgroundColor: theme.colorScheme === 'dark' ? '#333333' : '#ffffff',
          },
        }),
      },
      Button: {
        styles: (theme: any) => ({
          root: {
            backgroundColor: theme.colorScheme === 'dark' ? '#444444' : '#f0f0f0',
            color: theme.colorScheme === 'dark' ? '#ffffff' : '#000000',
            border: `1px solid ${theme.colorScheme === 'dark' ? '#555555' : '#cccccc'}`,
            '&:hover': {
              backgroundColor: theme.colorScheme === 'dark' ? '#555555' : '#e0e0e0',
            },
          },
        }),
      },
    },
  }}
>

      <div>
        <CustomNavbar toggleColorScheme={toggleColorScheme} colorScheme={colorScheme} />
      </div>
      <div style={{ padding: '20px', display: 'flex', gap: '2rem', flexDirection: 'column' }}>
        <Paper shadow="xl" radius="lg" p="xl">
          <Title order={2}>Yearly Crop Aggregations</Title>
          <MaxMinProductionTable />
        </Paper>

        <Paper shadow="xl" radius="lg" p="xl">
          <Title order={2} style={{ marginTop: '20px' }}>
            Crop Averages (1950-2020)
          </Title>
          <AvgYieldAreaTable  />
        </Paper>
      </div>
    </MantineProvider>
  );
};

export default App;
