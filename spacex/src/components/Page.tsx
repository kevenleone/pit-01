import React from "react";
import {
  Box,
  Heading,
  Container,
  Button,
  Loader,
} from "react-bulma-components";

type PageProps = {
  title: string;
  description: string;
  onClickBack?: () => void;
  loading?: boolean;
};

const Page: React.FC<PageProps> = ({
  title,
  description,
  onClickBack,
  loading,
  children,
}) => {
  return (
    <Container style={{ marginTop: 40 }}>
      <Box>
        <Heading>{title}</Heading>
        <Heading subtitle size={6}>
          {description}
        </Heading>

        {onClickBack && <Button onClick={onClickBack}>Back</Button>}
      </Box>

      {loading ? (
        <Loader
          style={{
            width: 300,
            height: 300,
            borderTopColor: "transparent",
            borderRightColor: "transparent",
          }}
        />
      ) : (
        children
      )}
    </Container>
  );
};

export default Page;
