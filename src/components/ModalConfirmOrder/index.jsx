import { useCallback, useContext, useEffect, useState } from "react";
import { Box, Button, Text, Layer, Heading } from "grommet";
import { useMutation } from "react-query";
import { useRouter } from "next/router";
import { queryClient } from "../../react-query/queryClient";
import { usePizzas } from "../../service/hooks/usePizzas";
import { useUsers } from "../../service/hooks/useUsers";
import { api } from "../../service/api";
import { validateToday } from "../../utils/validateToday";
import { ProjectContext } from "../../context/projectContext";

export function ModalConfirmOrder({ closeModal, confirmModal }) {
  const { pizzaSize, pizzaBorder, order } = useContext(ProjectContext);

  const [flavor, setFlavor] = useState([]);

  const router = useRouter();

  const { isFetching: isFetchingUser, data: user } = useUsers();

  const { data: pizzaData } = usePizzas();

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

  const validateDate = useCallback(
    () => validateToday(user.lastValidation),
    [user.lastValidation]
  );

  const confirmItem = () => {
    const dailyID = pizzaData.daily[0];
    const promotionPizzaSlug = pizzaData.flavors.filter(
      (flavor) => flavor.id === dailyID
    )[0].slug;

    const validationDailyPizza =
      promotionPizzaSlug === router.query.slug &&
      !validateDate(user.lastValidation);

    if (!isFetchingUser && user && validationDailyPizza) {
      const updateUser = async () => updateUserPoints.mutateAsync(user);
      updateUser();
      closeModal(false);
      confirmModal();
    }

    if (!isFetchingUser && user && !validationDailyPizza) {
      closeModal();
      confirmModal();
    }
  };

  const getCurrentFalavor = useCallback(() => {
    return pizzaData.flavors.filter(
      (flavor) => flavor.slug === router.query.slug
    )[0];
  }, [router.query.slug, pizzaData]);

  useEffect(() => {
    const currentFlavor = pizzaData.flavors.filter(
      (flavor) => flavor.slug === router.query.slug
    )[0];

    if (currentFlavor) setFlavor(currentFlavor);
  }, [pizzaData]);

  return (
    <Layer onClickOutside={() => closeModal()}>
      <Box pad="medium">
        <Text size="xxlarge">
          <b>Confirme o seu pedido</b>
        </Text>
        <Box
          pad={{
            vertical: "medium",
          }}
        >
          <Text>
            {`${getCurrentFalavor().name} ${new Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
            }).format(getCurrentFalavor().price)}`}
          </Text>
          <Text>
            {`${pizzaSize?.size?.name} ${new Intl.NumberFormat("pt-BR", {
              style: "currency",
              currency: "BRL",
            }).format(pizzaSize?.size?.price)}`}
          </Text>
          <Text>
            {`${pizzaBorder?.border?.name}: 
          ${new Intl.NumberFormat("pt-BR", {
            style: "currency",
            currency: "BRL",
          }).format(pizzaBorder?.border?.price)}`}
          </Text>
          <Text>
            <b>
              Total:
              {new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
              }).format(order.getTotalPriceByFlavor(flavor))}
            </b>
          </Text>
        </Box>

        <Box direction="row" gap="small" justify="center">
          <Button primary label="Confirmar" onClick={() => confirmItem()} />
          <Button label="Fechar" onClick={() => closeModal()} />
        </Box>
      </Box>
    </Layer>
  );
}
