import React from "react";
import { useRouter } from "next/router";
import { Columns } from "react-bulma-components";

import { getLaunch } from "../../graphql/queries";
import Card from "../../components/Card";
import { Launch } from "../../interfaces";
import Page from "../../components/Page";
import Meta from "../../components/Meta";
import { GetStaticPaths, GetStaticProps } from "next";
import apolloClient from "../../graphql/apolloClient";
import Loading from "../../components/Loading";

type LaunchProps = {
  launch: Launch;
};

const LaunchComponent: React.FC<LaunchProps> = ({ launch }) => {
  const router = useRouter();

  if (router.isFallback) {
    return <Loading />;
  }

  return (
    <Page
      title="Launch"
      description="SpaceX Launch"
      onClickBack={() => router.back()}
    >
      <Meta
        title={launch.mission_name}
        description={launch.details}
        url_image={launch.links.mission_patch}
      />
      <Columns>
        <Columns.Column size={6} offset={3}>
          <Card
            title={launch.mission_name}
            description={launch.details}
            timestamp={launch.launch_date_utc}
            avatar={launch.links.mission_patch_small}
            image_placeholder={launch.links.mission_patch}
          />
        </Columns.Column>
      </Columns>
    </Page>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = [...new Array(10)].map((_, index) => ({
    params: { id: String(index + 1) },
  }));

  return {
    fallback: true,
    paths,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const { id } = context.params;

  const { data, error } = await apolloClient.query({
    query: getLaunch,
    variables: {
      id,
    },
  });

  if (error) {
    return {
      notFound: true,
    };
  }

  const launch = data.launch;

  return {
    props: {
      launch,
    },
  };
};

export default LaunchComponent;
