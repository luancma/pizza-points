import { useEffect } from "react";
import { Box, Stack, Text } from "grommet";
import Image from "next/image";
import { useRouter } from "next/router";
import { usePizzas } from "../../service/hooks/usePizzas";
import { GridTemplateList } from "../../../styles/GridTemplateList";
import { PizzaCard } from "../PizzaCard";

export function PromotionList() {
  const router = useRouter();

  const { isFetched, data: pizzasData, refetch } = usePizzas();

  const handleClickCard = (slug) => {
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
        <Box height="xxsmall">
          <Text size="xlarge" textAlign="center">
            <b>Pizza do dia</b>
          </Text>
        </Box>
        <GridTemplateList>
          {promotion?.map((flavor) => (
            <Stack anchor="top-right" key={flavor.slug}>
              <PizzaCard flavor={flavor} handleClickCard={handleClickCard} />
              <Box background="dark-1" pad="small" round>
                <Text size="small"> + 50 pontos</Text>
              </Box>
            </Stack>
          ))}
        </GridTemplateList>
      </Box>
    </>
  );
}
