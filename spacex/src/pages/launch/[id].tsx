import React from "react";
import { useRouter } from "next/router";
import { useQuery } from "@apollo/client";
import { Columns } from "react-bulma-components";

import { getLaunch } from "../../graphql/queries";
import Card from "../../components/Card";
import { Launch } from "../../interfaces";
import Page from "../../components/Page";

type getLaunchResponse = {
  launch: Launch;
};

export default function LaunchComponent() {
  const router = useRouter();

  const {
    query: { id },
  } = router;

  const { data, loading, error } = useQuery<getLaunchResponse>(getLaunch, {
    variables: {
      id,
    },
  });

  const launch = data?.launch;

  if (error) {
    return <div>{error}</div>;
  }

  return (
    <Page
      loading={loading}
      title="Launch"
      description="SpaceX Launch"
      onClickBack={() => router.back()}
    >
      <Columns>
        <Columns.Column size={6} offset={3}>
          <Card
            title={launch?.mission_name}
            description={launch?.details}
            timestamp={launch?.launch_date_utc}
            avatar={launch?.links.mission_patch_small}
            image_placeholder={launch?.links.mission_patch}
          />
        </Columns.Column>
      </Columns>
    </Page>
  );
}
