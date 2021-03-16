import { gql } from "@apollo/client";

export const getLaunches = gql`
  query {
    launches {
      id
      mission_name
      details
      launch_date_utc
      links {
        mission_patch
        mission_patch_small
      }
    }
  }
`;

export const getLaunch = gql`
  query launch($id: ID!) {
    launch(id: $id) {
      id
      mission_name
      details
      launch_date_utc
      links {
        mission_patch
        mission_patch_small
      }
    }
  }
`