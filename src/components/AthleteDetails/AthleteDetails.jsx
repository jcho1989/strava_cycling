import {Card, Skeleton, Text, Accordion} from '@mantine/core';

import useAuthenticatedAthlete from '../../hooks/useAuthenticatedAthlete';

export default function AthleteDetails() {

  const {results, loading} = useAuthenticatedAthlete();
  console.log('results', results);
  console.log('loading', loading);

  const username = results?.username;
  const bikes = results?.bikes;

  const items = bikes.map((item) => (
    <Accordion.Item key={item.id} value={item.name}>
      <Accordion.Control>{item.name}</Accordion.Control>
      <Accordion.Panel>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Text fw={500} style={{ marginRight: '8px' }}>Distance:</Text>
          <span>{item.converted_distance} miles</span>
        </div>
      </Accordion.Panel>
    </Accordion.Item>
  ));
  

  return (
    <Card withBorder shadow="sm" radius="md" style={{width: '800px'}}>
      <Skeleton animate={true} visible={loading}>
        <Card.Section withBorder inheritPadding py="xs">
          <Text fw={500}>{username} bikes</Text>
        </Card.Section>
        <Card.Section>
          <Accordion defaultValue="Apples" wit>
            {items}
          </Accordion>
        </Card.Section>  
      </Skeleton>
    </Card>
  );


}





  