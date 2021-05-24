import { Box, Text } from "grommet";
import Image from "next/image";

export function PizzaCard({ flavor, handleClickCard }) {
  return (
    <Box
      round
      background="brand"
      key={flavor.id}
      width="medium"
      height="fill"
      pad="medium"
      style={{ cursor: "pointer" }}
      onClick={() => handleClickCard(flavor.slug)}
    >
      <Text size="large" textAlign="center">
        <b>{flavor.name}</b>
      </Text>
      <Image
        priority
        src={flavor.image}
        width={272}
        height={300}
        quality={50}
      />
      <Box
        direction="column"
        gap="small"
        pad={{
          bottom: "small",
        }}
      >
        <Text>
          <b>Ingredientes:</b>
        </Text>
        {flavor.ingredients.map((item) => (
          <Text key={item}>{item}</Text>
        ))}
      </Box>
    </Box>
  );
}
