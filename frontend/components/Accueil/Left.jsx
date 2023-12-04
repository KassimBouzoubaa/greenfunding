"use client"
import { Flex } from '@chakra-ui/react'
import Etat from './Etat'

const Left = () => {
  return (
    <Flex
    bg="white"
    color="black"
    width="60vw"
    height="55vh"
    ml="2rem"
    mb="10rem"
    borderRadius="1rem"
  >
      <Etat/>
  </Flex>
  )
}

export default Left