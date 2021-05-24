import { Box, Button, Text, Layer } from "grommet";
import { Checkmark } from "grommet-icons";

export function ConfirmOrder({ closeModal }) {
  return (
    <Layer onClickOutside={() => closeModal(false)}>
      <Box pad="medium">
        <Text size="xxlarge">
          <b>Pedido Concluído!</b>
        </Text>
        <Box
          pad={{
            vertical: "medium",
          }}
        >
          <Text>
            Seu pedido foi realizado com sucesso!{" "}
            <Checkmark color="brand" size="medium" />
          </Text>
        </Box>

        <Box direction="row" gap="small" justify="center">
          <Button label="Okay!" onClick={() => closeModal()} />
        </Box>
      </Box>
    </Layer>
  );
}
