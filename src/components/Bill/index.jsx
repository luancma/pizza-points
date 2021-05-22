import { useContext, useEffect, useState } from "react";
import { Box, Heading, Text } from "grommet";
import { useRouter } from "next/router";
import { ProjectContext } from "../../context/projectContext";
import { usePizzas } from "../../service/hooks/usePizzas";

export function Bill() {
  const { step, pizzaSize, pizzaBorder, options } = useContext(ProjectContext);
  const { isFetched, data: pizzas } = usePizzas([]);
  const [flavor, setFlavor] = useState("");
  const [currentSize, setCurrentSize] = useState({});
  const [currentBorder, setCurrentBorder] = useState({});

  const router = useRouter();
  const { slug } = router.query;

  useEffect(() => {
    if (slug) {
      setFlavor(pizzas?.flavors.filter((flavor) => flavor.slug === slug)[0]);
    }
  }, [slug, pizzas]);

  useEffect(() => {
    setCurrentSize(
      options[2].filter((sizes) => sizes.name === pizzaSize.size && sizes)[0]
    );
  }, [pizzaSize.size]);

  useEffect(() => {
    setCurrentBorder(
      options[3].filter(
        (border) => border.name === pizzaBorder.border && border
      )[0]
    );
  }, [pizzaBorder.border]);

  return (
    <Box>
      <Heading>Resumo do Pedido</Heading>
      {isFetched && (
        <>
          {flavor && (
            <Text>
              {flavor?.name}{" "}
              {new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(flavor?.price)}
            </Text>
          )}
          {currentSize && (
            <Text>
              {currentSize?.name}{" "}
              {new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(currentSize.price)}
            </Text>
          )}
          {currentBorder && (
            <Text>
              {currentBorder?.name}{" "}
              {new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(currentBorder?.price)}
            </Text>
          )}
        </>
      )}
    </Box>
  );
}
