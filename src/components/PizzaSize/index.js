import { useCallback, useContext, useEffect, useState } from "react";
import { Box, Button, RadioButton, Text } from "grommet";
import { FormNext, FormPrevious } from "grommet-icons";
import { ProjectContext } from "../../context/projectContext";

export function PizzaSize() {
  const { step, pizzaSize, pizzaBorder, options } = useContext(ProjectContext);

  const [size, setPizzaSize] = useState(pizzaSize.size);

  const [border, setBorder] = useState(pizzaBorder.border);

  const handleSelectedSize = (name) => {
    options[step.currentStep].filter((option) => option.name === name)[0];
    if (step.currentStep === 2) {
      pizzaSize.setSize(name);
      setPizzaSize(name);
    }
    if (step.currentStep === 3) {
      pizzaBorder.setBorder(name);
      setBorder(name);
    }
  };

  const handleClickIncrementStep = () => {
    step.incrementStep();
  };

  const handleCheckedValue = useCallback(
    (name) => {
      if (step.currentStep === 2 && name === size) {
        return true;
      }
      if (step.currentStep === 3 && name === border) {
        return true;
      }
    },
    [step.currentStep, size, border]
  );

  useEffect(() => {
    if (step.currentStep === 2) {
      setPizzaSize(pizzaSize.size);
    }
    if (step.currentStep === 3) {
      setBorder(pizzaBorder.border);
    }
  }, [step.currentStep]);

  return (
    <Box>
      <Box pad="medium" gap="medium">
        <Text size="large">Selecione o Tamanho da sua pizza!</Text>

        {options[step.currentStep]?.map((option) => (
          <RadioButton
            name="selectButton"
            key={option.id}
            value={option.name}
            checked={handleCheckedValue(option.name)}
            label={option.name}
            onChange={(event) => handleSelectedSize(event.target.value)}
          />
        ))}

        <Button
          primary
          label={
            <Box justify="center" direction="row">
              <FormPrevious color="light-1" />
              <Text>Voltar</Text>
            </Box>
          }
          size="medium"
          style={{ width: 194 }}
          onClick={() => step.decrementStep()}
        />
        <Button
          primary
          label={
            <Box justify="center" direction="row">
              <FormNext color="light-1" />
              <Text>Avançar</Text>
            </Box>
          }
          size="medium"
          style={{ width: 194 }}
          onClick={handleClickIncrementStep}
        />
      </Box>
    </Box>
  );
}
