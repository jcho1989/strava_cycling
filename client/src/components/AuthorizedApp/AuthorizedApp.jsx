import { useEffect } from "react";
import { AppShell, Flex, Grid, MultiSelect, Skeleton } from "@mantine/core";

import ActivitiesList from "../ActivitiesList/ActivitiesList";
import Header from "../Header/Header";
import useAuthenticatedAthlete from "../../hooks/services/athletes/useAuthenticatedAthlete";
import useActivities from "../../hooks/services/activities/useAuthenticatedAthleteActivities";
import mockActivities from "./mockActivities.json";
import PhotosRow from "../PhotosRow/PhotosRow";
import ActivityPhotoContent from "../ActivityPhotoContent/ActivityPhotoContent";
import useAthleteStore from "../../store/athleteStore";
import { DISTANCE_EXERCISES } from "../../constants/activities";

export default function AuthorizedApp() {
  const { fetchAthlete } = useAthleteStore();

  useEffect(() => {
    fetchAthlete();
  }, [fetchAthlete]);

  return (
    <AppShell
      className="AuthorizedApp"
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: "sm",
      }}
      padding={0}
    >
      <Header />

      <AppShell.Navbar p="md">Navbar</AppShell.Navbar>

      <AppShell.Main>
        {/* <PhotosRow activities={activities}/> */}
        <Flex
          mih={50}
          gap="lg"
          justify="flex-start"
          align="center"
          direction="column"
          wrap="wrap"
        >
          <MultiSelect
            styles={{ wrapper: { width: 400 } }}
            label="Select activity"
            data={DISTANCE_EXERCISES}
          />

          <Grid grow={true}>
            <Grid.Col span={24}>
              <ActivitiesList />
            </Grid.Col>
          </Grid>
        </Flex>
      </AppShell.Main>
    </AppShell>
  );
}
