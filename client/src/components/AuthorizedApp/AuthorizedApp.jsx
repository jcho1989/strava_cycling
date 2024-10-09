import { AppShell, Grid } from "@mantine/core";

import ActivitiesList from "../ActivitiesList/ActivitiesList";
import Header from "../Header/Header";
import useAuthenticatedAthlete from "../../hooks/services/athletes/useAuthenticatedAthlete";
import useActivities from "../../hooks/services/activities/useAuthenticatedAthleteActivities";
import mockActivities from './mockActivities.json';

export default function AuthorizedApp() {
  const { results: athlete, loading } = useAuthenticatedAthlete();
  // const { results: activities, loadingActivities } = useActivities()
  // console.log("activities", activities);
  // console.log("loading", loading);

  const activities = mockActivities;
  const activitiesWithPhotos = activities.filter(activity => !!activity.total_photo_count);
  // const photoIds = activitiesWithPhotos.map(activity)

  return (
    <AppShell
      header={{ height: 60 }}
      navbar={{
        width: 300,
        breakpoint: "sm",
      }}
      padding={0}
    >
      {athlete && <Header athlete={athlete} />}

      <AppShell.Navbar p="md">Navbar</AppShell.Navbar>

      <AppShell.Main w={800} p={0}>
      <Grid gutter={{ base: 5, xs: 'md', md: 'xl', xl: 50 }}>
        <Grid.Col span={4}>1</Grid.Col>
        <Grid.Col span={4}>2</Grid.Col>
        <Grid.Col span={4}>3</Grid.Col>
      </Grid>
        
        {/* <Grid grow={true}>
          <Grid.Col span={24}>
            <ActivitiesList />  
          </Grid.Col>  
        </Grid> */}

      </AppShell.Main>
    </AppShell>
  );
}
