import { Box, CheckBox, Grid, Main, Spinner, Text } from "grommet";
import { useQuery } from "react-query";
import { api } from "../../service/api";
import Image from "next/image";
import { usePizzas } from "../../service/hooks/usePizzas";
import styled from "styled-components";

export const GridTemplateList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, 20rem);
  justify-content: center;
  gap: 2rem;
`;

export function PizzaList() {
  const { isLoading, error, data } = usePizzas();

  return (
    <>
      {isLoading && !data ? (
        <Box>
          <Spinner />
        </Box>
      ) : (
        <Box direction="column" justify="center" fill>
          <GridTemplateList>
            {data?.flavors.map((flavor) => (
              <Box
                background="brand"
                key={flavor.id}
                width="medium"
                height="medium"
                pad="medium"
                style={{ cursor: "pointer" }}
              >
                <Text size="large" textAlign="center">
                  {flavor.name}
                </Text>
                <Image
                  priority
                  src={flavor.image}
                  width={150}
                  height={300}
                  quality={50}
                />
              </Box>
            ))}
          </GridTemplateList>
        </Box>
      )}
    </>
  );
}
