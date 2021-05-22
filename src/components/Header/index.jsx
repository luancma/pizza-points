import { useContext } from "react";
import { Header as GrommetHeader, Box, Text, Heading } from "grommet";
import { Achievement } from "grommet-icons";
import { useUsers } from "../../service/hooks/useUsers";
import { ProjectContext } from "../../context/projectContext";
import { useRouter } from "next/router";

export function Header() {
  const router = useRouter();
  const { data: user } = useUsers();
  const { step } = useContext(ProjectContext);

  return (
    <GrommetHeader background="dark-1" pad="medium">
      <Heading
        onClick={() => router.push("/")}
        size="small"
        style={{ cursor: "pointer" }}
      >
        Web-Pizza
      </Heading>

      <Box>
        <Text>Etapa: {step.currentStep}/3</Text>
      </Box>

      <Box>
        <Box display="flex" direction="row">
          <Achievement style={{ marginRight: "8px" }} />
          Pontos de Fidelidade:
        </Box>
        <Text textAlign="end">
          {user?.id ? `${user?.points} pontos` : "Carregando..."}
        </Text>
      </Box>
    </GrommetHeader>
  );
}
