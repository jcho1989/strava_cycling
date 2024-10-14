import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import cx from "clsx";

import {
  AppShell,
  Button,
  Group,
  Text,
  Avatar,
  Menu,
  rem,
  useMantineColorScheme,
  ActionIcon,
} from "@mantine/core";
import {
  IconStar,
  IconBeer,
  IconSettings,
  IconLogout,
  IconSun,
  IconMoon,
} from "@tabler/icons-react";

import useAuthStore from "../../store/useAuthStore";
import { ROUTE_URLS } from "../../constants/routes";

import classes from "./Header.module.css";
import useAthleteStore from "../../store/athleteStore";

export default function Header(
  // { athlete = {} }
) {
  const { logout } = useAuthStore();
  const navigate = useNavigate();
  const {athlete} = useAthleteStore();

  const handleLogout = () => {
    logout();
    navigate(ROUTE_URLS.LOGOUT);
  };

  const { colorScheme, setColorScheme } = useMantineColorScheme();


  const { username = null, profile = null } = athlete || {};

  return (
    <AppShell.Header>
      <Group h="100%" px="md">
        <ActionIcon
          onClick={() => setColorScheme(colorScheme === "light" ? "dark" : "light")}
          variant="default"
          size="sm"
          radius="xl"
          aria-label="Toggle color scheme"
        >
          <IconSun className={cx(classes.icon, classes.light)} stroke={1.5} />
          <IconMoon className={cx(classes.icon, classes.dark)} stroke={1.5} />
        </ActionIcon>
        <Text weight={500} size="lg">
          Pint Points
        </Text>

        <div style={{ flexGrow: 1 }}></div>

        <Group>
          <Group>
            <Text>{username}</Text>
            <Avatar src={profile} alt="Profile Icon" radius="xl" />
          </Group>

          <Menu shadow="md" width={200}>
            <Menu.Target>
              <Button variant="default">Settings</Button>
            </Menu.Target>

            <Menu.Dropdown>
              <Menu.Label>General</Menu.Label>
              <Menu.Item
                leftSection={
                  <IconStar style={{ width: rem(14), height: rem(14) }} />
                }
              >
                Goals
              </Menu.Item>
              <Menu.Item
                leftSection={
                  <IconBeer style={{ width: rem(14), height: rem(14) }} />
                }
              >
                Points
              </Menu.Item>

              <Menu.Item
                leftSection={
                  <IconSettings style={{ width: rem(14), height: rem(14) }} />
                }
              >
                Settings
              </Menu.Item>
              <Menu.Divider />

              <Menu.Item
                color="red"
                onClick={handleLogout}
                leftSection={
                  <IconLogout style={{ width: rem(14), height: rem(14) }} />
                }
              >
                Logout
              </Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Group>
      </Group>
    </AppShell.Header>
  );
}

Header.propTypes = {
  athlete: PropTypes.object,
};
