import { Columns } from "react-bulma-components";
import Card from "../components/Card";
import { useQuery } from "@apollo/client";

import { getLaunches } from "../graphql/queries";
import { QueryInterface } from "../interfaces";
import { useRouter } from "next/router";
import Page from "../components/Page";

const Index = () => {
  const router = useRouter();
  const { data, error, loading } = useQuery<QueryInterface>(getLaunches);
  const launches = data?.launches ?? [];

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <Page title="Launches" description="SpaceX Launches" loading={loading}>
      <Columns style={{ marginTop: 40 }}>
        {launches.slice(0, 15).map((launch) => (
          <Columns.Column key={launch.id} size={4}>
            <Card
              onClick={() => router.push(`/launch/${launch.id}`)}
              timestamp={launch.launch_date_utc}
              image_placeholder={launch.links.mission_patch}
              title={launch.mission_name}
              avatar={launch.links.mission_patch_small}
              description={launch.details}
            />
          </Columns.Column>
        ))}
      </Columns>
    </Page>
  );
};

export default Index;
