import { useContext, useEffect, useState } from "react";
import { Box, Heading, Text } from "grommet";
import { useRouter } from "next/router";
import { ProjectContext } from "../../context/projectContext";
import { usePizzas } from "../../service/hooks/usePizzas";

export function Bill() {
  const { pizzaSize, pizzaBorder, options } = useContext(ProjectContext);
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
      options[2].filter(
        (sizes) => sizes.name === pizzaSize.size.name && sizes
      )[0]
    );
  }, [pizzaSize.size]);

  useEffect(() => {
    setCurrentBorder(
      options[3].filter(
        (border) => border.name === pizzaBorder.border.name && border
      )[0]
    );
  }, [pizzaBorder.border]);

  return (
    <Box>
      <Box margin="xxsmall">
        <Text size="xlarge" textAlign="center">
          <b>Detalhes do seu peido</b>{" "}
        </Text>
      </Box>

      {isFetched && (
        <>
          {flavor && (
            <Box margin={{ vertical: "small" }}>
              <Text>
                <b>Sabor: </b>
                {`${flavor?.name} 
              ${new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(flavor?.price)}`}
              </Text>
            </Box>
          )}
          {currentSize && (
            <Box margin={{ vertical: "small" }}>
              <Text>
                <b>Tamanho: </b>
                {`${currentSize?.name} 
              ${new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(currentSize.price)}`}
              </Text>
            </Box>
          )}
          {currentBorder && (
            <Box margin={{ vertical: "small" }}>
              <Text>
                <b>Borda: </b>

                {`${currentBorder?.name} 
              ${new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(currentBorder?.price)}`}
              </Text>
            </Box>
          )}
        </>
      )}
    </Box>
  );
}
