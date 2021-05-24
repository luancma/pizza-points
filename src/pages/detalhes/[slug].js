import { useContext, useEffect } from "react";
import { Box, Text } from "grommet";
import { api } from "../../service/api";
import { PizzaSize } from "../../components/PizzaSize";
import { ProjectContext } from "../../context/projectContext";
import { Bill } from "../../components/Bill";
import { usePizzas } from "../../service/hooks/usePizzas";
import { useRouter } from "next/router";
import { GridTemplateList } from "../../../styles/GridTemplateList";
import { PizzaCard } from "../../components/PizzaCard";
import { PizzaDetailsWrapper } from "../../../styles/PizzaDetailsWrapper";

export default function Detalhes({ propsResponse }) {
  const router = useRouter();

  if (router.isFallback) {
    return <div>Loading...</div>;
  }

  const { data: pizzas } = usePizzas({
    initialData: propsResponse.pizzas,
  });

  const { step } = useContext(ProjectContext);

  const linked = propsResponse.flavor.linked.map(
    (item) => pizzas.flavors[item]
  );

  const handleClickCard = (slug) => {
    router.push({
      pathname: "/detalhes/[slug]",
      query: { slug },
    });
  };

  useEffect(() => {
    if (step.currentStep === 1) {
      return step.incrementStep();
    }
  }, []);

  return (
    <Box
      pad="medium"
      margin={{
        vertical: "medium",
      }}
    >
      <PizzaDetailsWrapper direction="row" justify="around">
        <PizzaSize />
        <Bill />
      </PizzaDetailsWrapper>
      <Box
        direction="column"
        justify="center"
        fill
        margin={{ vertical: "2rem" }}
      >
        <Box height="xxsmall">
          <Text size="xlarge" textAlign="center">
            <b>Pizzas Relacionadas</b>
          </Text>
        </Box>
        <GridTemplateList>
          {linked?.map((flavor) => (
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

export async function getStaticPaths() {
  const response = await api.get("/pizzas").then((response) => response.data);

  const paths = response.flavors.map((pizza) => ({
    params: { slug: pizza.slug },
  }));

  return { paths, fallback: true };
}

export async function getStaticProps({ params }) {
  const response = await api.get("/pizzas").then((response) => response.data);

  const user = await api.get("/users").then((response) => response.data[0]);

  const flavors = response.flavors;

  const flavor = flavors.filter((flavor) => flavor.slug === params.slug)[0];

  const propsResponse = {
    flavor,
    user,
    pizzas: response,
  };

  return { props: { propsResponse }, revalidate: 60 * 24 };
}
