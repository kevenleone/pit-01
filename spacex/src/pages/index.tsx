import { Columns } from "react-bulma-components";
import Card from "../components/Card";

import { getLaunches } from "../graphql/queries";
import { Launch } from "../interfaces";
import { useRouter } from "next/router";
import Page from "../components/Page";
import { GetStaticProps } from "next";
import apolloClient from "../graphql/apolloClient";

type LaunchProps = {
  launches: Launch[];
};

const Index: React.FC<LaunchProps> = ({ launches }) => {
  const router = useRouter();

  return (
    <Page title="Launches" description="SpaceX Launches">
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

export const getStaticProps: GetStaticProps = async () => {
  const { data, error } = await apolloClient.query({
    query: getLaunches,
  });

  if (error) {
    return {
      notFound: true,
    };
  }

  const launches = data.launches;

  return {
    props: {
      launches,
    },
  };
};

export default Index;
