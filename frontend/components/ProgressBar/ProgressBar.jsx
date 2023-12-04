"use client"
import { Flex, Progress, Text } from '@chakra-ui/react'
import React from 'react'

const ProgressBar = () => {
  return (
    <Flex direction="column">

    <Progress value={50} colorScheme='green' size='md' />
      <Flex direction='column' alignItems='center'>
        <Text fontSize='l' fontWeight='bold'>
          50%
        </Text>
      </Flex>
    </Flex>
  )
}

export default ProgressBar