import { useCallback, useContext, useEffect, useState } from "react";
import { Box, Button, RadioButton, Text, Layer, Heading } from "grommet";
import { FormNext, FormPrevious } from "grommet-icons";
import { ProjectContext } from "../../context/projectContext";
import { useRouter } from "next/router";
import { usePizzas } from "../../service/hooks/usePizzas";
import { ModalConfirmOrder } from "../ModalConfirmOrder";
import { ConfirmOrder } from "../ConfirmOrder";
import { PizzaSizeWrapper } from "./styles";

export function PizzaSize() {
  const router = useRouter();

  const [confirmModal, setConfirmModal] = useState(false);

  const [openFinishedOrder, setFinishedOrder] = useState(false);

  const { data: pizzaData } = usePizzas();

  const { step, pizzaSize, pizzaBorder, options, order } =
    useContext(ProjectContext);

  const [size, setPizzaSize] = useState(pizzaSize.size);

  const [border, setBorder] = useState(pizzaBorder.border);

  const handleSelectedSize = (name) => {
    const teste = options[step.currentStep].filter(
      (option) => option.name === name
    )[0];
    options[step.currentStep].filter((option) => option.name === name)[0];
    if (step.currentStep === 2) {
      pizzaSize.setSize(teste);
      setPizzaSize(teste);
    }
    if (step.currentStep === 3) {
      pizzaBorder.setBorder(teste);
      setBorder(teste);
    }
  };

  const handleClickNextNext = () => {
    if (step.currentStep < 3) {
      return step.incrementStep();
    }

    const flavor = pizzaData.flavors.filter(
      (flavor) => flavor.slug === router.query.slug
    )[0];
    setConfirmModal(true);
    order.getTotalPriceByFlavor(flavor);
  };

  const handleCheckedValue = useCallback(
    (name) => {
      if (step.currentStep === 2 && name === size.name) {
        return true;
      }
      if (step.currentStep === 3 && name === border.name) {
        return true;
      }
    },
    [step.currentStep, size, border]
  );

  const closeConfirmNextModal = () => {
    setConfirmModal(false);
    setFinishedOrder(true);
  };

  const setCloseModal = () => {
    setConfirmModal(false);
  };

  const closeFinishOrderModal = () => {
    setFinishedOrder(false);
    router.push({
      pathname: "/",
    });
    order.setResetPizzaSteps();
  };

  useEffect(() => {
    if (step.currentStep === 2) {
      setPizzaSize(pizzaSize.size);
    }
    if (step.currentStep === 3) {
      setBorder(pizzaBorder.border);
    }
  }, [step.currentStep]);

  return (
    <>
      <PizzaSizeWrapper direction="column" justify="center">
        <Box margin="xxsmall">
          <Text size="xlarge" textAlign="center">
            <b>Selecione o Tamanho da sua pizza!</b>
          </Text>
        </Box>

        {options[step.currentStep]?.map((option) => (
          <Box
          margin={{
            vertical: "small",
          }}
          key={option.id}
          >
            <RadioButton
              name="selectButton"
              key={option.id}
              value={option.name}
              checked={handleCheckedValue(option.name)}
              label={option.name}
              onChange={(event) => handleSelectedSize(event.target.value)}
            />
          </Box>
        ))}
        <Box direction="row" gap="small">
          <Button
            primary
            label={
              <Box justify="center" direction="row">
                <FormPrevious color="light-1" />
                <Text>Voltar</Text>
              </Box>
            }
            onClick={() => step.decrementStep()}
          />
          <Button
            primary
            label={
              <Box justify="center" direction="row">
                <FormNext color="light-1" />
                <Text>{step.currentStep === 3 ? "Finalizar" : "Avançar"}</Text>
              </Box>
            }
            onClick={handleClickNextNext}
          />
        </Box>
      </PizzaSizeWrapper>
      {confirmModal && (
        <ModalConfirmOrder
          confirmModal={closeConfirmNextModal}
          closeModal={setCloseModal}
        />
      )}
      {openFinishedOrder && <ConfirmOrder closeModal={closeFinishOrderModal} />}
    </>
  );
}
