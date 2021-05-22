import { useContext, useEffect, useState } from "react";
import { Box, Heading, Spinner, Tab, Tabs, Text } from "grommet";
import { useMutation, useQuery } from "react-query";
import { api } from "../../service/api";
import { queryClient } from "../../react-query/queryClient";
import { validateToday } from "../../utils/validateToday";
import { useUsers } from "../../service/hooks/useUsers";
import { PizzaSize } from "../../components/PizzaSize";
import { ProjectContext } from "../../context/projectContext";
import { Bill } from "../../components/Bill";
import { usePizzas } from "../../service/hooks/usePizzas";
import { useRouter } from "next/router";
import { GridTemplateList } from "../../components/PizzaList";
import Image from "next/image";

export default function Detalhes({ propsResponse }) {
  const router = useRouter();

  const { data: pizzas } = usePizzas();

  const { step } = useContext(ProjectContext);

  const { data: user } = useUsers();

  const { isFetched } = usePizzas();

  const updateUserPoints = useMutation(
    async (user) => {
      return await api.put(`/users/${user.id}`, {
        ...user,
        points: user.points + 50,
        lastValidation: new Date().toISOString(),
      });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("users");
      },
    }
  );

  const linked = pizzas?.flavors
    .filter((flavor) => flavor.slug === router.query.slug && flavor)[0]
    .linked.map((item) => pizzas?.flavors[item]);

  function handleSelectLink(slug) {
    router.push({
      pathname: "/detalhes/[slug]",
      query: { slug },
    });
  }

  useEffect(() => {
    if (step.currentStep === 1) {
      return step.incrementStep();
    }
    const updateUser = async () => updateUserPoints.mutateAsync(user);
    if (isFetched && user && !validateToday(user.lastValidation)) {
      return updateUser();
    }
  }, []);

  return (
    <Box>
      <Heading>{propsResponse.flavor.name}</Heading>
      <Box direction="row" justify="between">
        <PizzaSize />
        <Bill />
      </Box>

      <Box
        direction="column"
        justify="center"
        fill
        margin={{ vertical: "2rem" }}
      >
        <Heading margin={{ horizontal: "5rem" }} size="medium">
          Produtos sugeridos
        </Heading>
        <GridTemplateList>
          {linked?.map((flavor) => (
            <Box
              background="brand"
              key={flavor.id}
              width="medium"
              height="medium"
              pad="medium"
              style={{ cursor: "pointer" }}
              onClick={() => handleSelectLink(flavor.slug)}
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
    </Box>
  );
}

export async function getStaticPaths() {
  const response = await api.get("/pizzas").then((response) => response.data);

  const paths = response.flavors.map((pizza) => ({
    params: { slug: pizza.slug },
  }));

  return { paths, fallback: false };
}

export async function getStaticProps({ params }) {
  const response = await api.get("/pizzas").then((response) => response.data);

  const user = await api.get("/users").then((response) => response.data[0]);

  const flavors = response.flavors;

  const flavor = flavors.filter((flavor) => flavor.slug === params.slug)[0];

  const propsResponse = {
    flavor,
    user,
  };

  return { props: { propsResponse } };
}
