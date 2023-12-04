"use client"

import { Button, Flex, Input } from "@chakra-ui/react"

const Collecte = () => {
  return (
    <Flex>
    <Input defaultValue={0} />
    <Button ml='1rem' colorScheme='green'>
      Retirer
    </Button>
  </Flex>
  )
}

export default Collecte