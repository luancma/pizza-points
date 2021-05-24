import { useRouter } from "next/router";
import { Box, Spinner, Text } from "grommet";
import { usePizzas } from "../../service/hooks/usePizzas";
import { GridTemplateList } from "../../../styles/GridTemplateList";
import { PizzaCard } from "../PizzaCard";

export function PizzaList() {
  const { isLoading, data } = usePizzas();

  const router = useRouter();

  const handleClickCard = (slug) => {
    router.push({
      pathname: "/detalhes/[slug]",
      query: { slug },
    });
  };


  if (isLoading && !data?.flavors) {
    return (
      <Box fill align="center" justify="center" pad="large">
        <Spinner size="large" />
      </Box>
    );
  }

  return (
    <Box direction="column" justify="center" fill margin={{ vertical: "2rem" }}>
      <Box direction="column" justify="center">
        <Box height="xxsmall">
          <Text size="xlarge" textAlign="center">
            <b>Lista de pizzas</b>
          </Text>
        </Box>
        <GridTemplateList>
          {data.flavors.map((flavor) => (
            <PizzaCard
              key={flavor.slug}
              flavor={flavor}
              handleClickCard={handleClickCard}
            />
          ))}
        </GridTemplateList>
      </Box>
    </Box>
  );
}
