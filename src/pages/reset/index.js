import { Box, Button } from "grommet";
import { useRouter } from "next/router";
import { useMutation } from "react-query";
import { queryClient } from "../../react-query/queryClient";
import { api } from "../../service/api";

export default function Reset() {
  const router = useRouter();

  const resetUserPoints = useMutation(
    async () => {
      return await api.put(`/users/1`, {
        id: 1,
        name: "Usuário Teste",
        points: 0,
        lastValidation: "",
      });
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries("users");
        router.push({
          pathname: "/",
        });
      },
    }
  );

  const handleCleanPoints = async () => {
    await resetUserPoints.mutateAsync();
  };

  return (
    <Box justify="center" align="center" pad="large">
      <Box width="medium" justify="center" align="center">
        <Button label="Limpar pontos" onClick={handleCleanPoints} />
      </Box>
    </Box>
  );
}
