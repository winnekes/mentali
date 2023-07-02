import { Heading, Input, VStack } from "@chakra-ui/react";
import { Dispatch, FunctionComponent, SetStateAction } from "react";

type Props = {
  nickname: string;
  setNickname: Dispatch<SetStateAction<string>>;
};
export const GetUserDetails: FunctionComponent<Props> = ({ nickname, setNickname }) => {
  return (
    <VStack>
      <Heading fontSize="2xl" mb={2}>
        What do I call you?
      </Heading>
      <Input
        value={nickname}
        onChange={e => setNickname(e.target.value as string)}
        placeholder="For example your first name or nickname"
        variant="flushed"
        w="80%"
      />
    </VStack>
  );
};
