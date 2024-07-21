import React from "react";
import {
  Container,
  Group,
  useMantineTheme,
  Title,
  ActionIcon,
} from "@mantine/core";
import { IoSunnyOutline } from "react-icons/io5";
import { LuMoon } from "react-icons/lu";

interface CustomNavbarProps {
  toggleColorScheme: () => void;
  colorScheme: "light" | "dark";
}

const CustomNavbar: React.FC<CustomNavbarProps> = ({
  toggleColorScheme,
  colorScheme,
}) => {
  const theme = useMantineTheme();

  const navbarStyles = {
    backgroundColor:
      colorScheme === "dark" ? theme.colors.dark[8] : theme.colors.gray[0],
    color: colorScheme === "dark" ? theme.colors.gray[0] : theme.colors.dark[8],
    borderBottom: `1px solid ${
      colorScheme === "dark" ? theme.colors.dark[6] : theme.colors.gray[2]
    }`,
    padding: "10px 0",
  };

  return (
    <div style={navbarStyles}>
      <Container
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
        }}
      >
        <Title order={3} style={{ margin: 0, color: navbarStyles.color }}>
          ManuFac
        </Title>
        <Group style={{ flex: 1, justifyContent: "flex-end" }}>
          <ActionIcon
            variant="outline"
            onClick={toggleColorScheme}
            style={{
              borderColor: navbarStyles.color,
              color: navbarStyles.color,
              backgroundColor:
                colorScheme === "dark"
                  ? theme.colors.dark[6]
                  : theme.colors.gray[1],
            }}
            size="lg"
          >
            {colorScheme === "dark" ? (
              <IoSunnyOutline size={20} />
            ) : (
              <LuMoon size={20} />
            )}
          </ActionIcon>
        </Group>
      </Container>
    </div>
  );
};

export default CustomNavbar;
