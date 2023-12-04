import { Flex, Text } from "@chakra-ui/react";

const InfoText = ({ title, content }) => {
  return (
    <Flex direction="column">
      <Text color='black' fontWeight='bold' fontSize='xl'>{title}</Text>
      <Text>{content}</Text>
    </Flex>
  );
};

export default InfoText;
