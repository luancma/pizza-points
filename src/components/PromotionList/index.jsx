import { Box, Heading, List, Main, Spinner, Stack, Text } from "grommet";
import Image from "next/image";
import { useRouter } from "next/router";
import { usePizzas } from "../../service/hooks/usePizzas";
import { useContext, useEffect } from "react";
import styled from "styled-components";
import { ProjectContext } from "../../context/projectContext";

const GridTemplateList = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, 20rem);
  justify-content: center;
  gap: 2rem;
`;

export function PromotionList() {
  const { step } = useContext(ProjectContext);
  const router = useRouter();

  const {
    isFetching,
    isFetched,
    isLoading,
    data: pizzasData,
    refetch,
  } = usePizzas();

  const handleClick = (slug) => {
    router.push({
      pathname: "/detalhes/[slug]",
      query: { slug },
    });
  };

  const promotion = pizzasData?.daily.map((item) => pizzasData.flavors[item]);

  useEffect(() => {
    if (isFetched && !pizzasData) {
      return refetch();
    }
  }, [pizzasData, isFetched]);

  return (
    <>
      <Box
        direction="column"
        justify="center"
        fill
        margin={{ vertical: "2rem" }}
      >
        <GridTemplateList>
          {promotion?.map((flavor) => (
            <Stack anchor="top-right">
              <Box
                background="brand"
                key={flavor.id}
                width="medium"
                pad="medium"
                style={{ cursor: "pointer" }}
                onClick={() => handleClick(flavor.slug)}
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
                <Box direction="column" gap="small">
                  <Text>Ingredientes: </Text>
                  {flavor.ingredients.map((item) => (
                    <Text key={item.id}>{item}</Text>
                  ))}
                </Box>
              </Box>
              <Box background="dark-1" pad="small" round>
                <Text> + 50 pontos</Text>
              </Box>
            </Stack>
          ))}
        </GridTemplateList>
      </Box>
    </>
  );
}
