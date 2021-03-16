type Launch = {
  id: string;
  mission_name: string;
  details: string;
  launch_date_utc: string;
  links: {
    mission_patch: string;
    mission_patch_small: string;
  };
};

type QueryInterface = {
  launches: Launch[];
};

export type {Launch, QueryInterface}