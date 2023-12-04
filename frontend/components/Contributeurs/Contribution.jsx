"use client"

import { Button, Flex, Input, Text } from "@chakra-ui/react"

const Contribution = ({action}) => {
  return (
    <Flex direction="column">
      <Text fontWeight="bold">Montant de la contribution</Text>
    <Flex>
    <Input defaultValue={0} />
    <Button ml='1rem' colorScheme='green' >
      {action}
    </Button>
  </Flex>
  <Text color="red" >Note: La contribution minimum est de 0.0001 ETH</Text>
    </Flex>
  )
}

export default Contribution