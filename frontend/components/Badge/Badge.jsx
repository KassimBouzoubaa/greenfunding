import { Tag, TagLabel, TagLeftIcon } from "@chakra-ui/react";
import { CheckCircleIcon } from "@chakra-ui/icons";

const Badge = ({title}) => {
  return (
    <Tag
      size="md"
      variant="subtle"
      colorScheme="green"
      borderRadius="full"
      py="1"
      px="2"
      display="flex"
      alignItems="center"
    >
      <TagLeftIcon as={CheckCircleIcon} boxSize="12px" />
      <TagLabel>{title}</TagLabel>
    </Tag>
  );
};

export default Badge;
