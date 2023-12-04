import { Heading } from '@chakra-ui/react'
import React from 'react'

const InfoHeading = ({title}) => {
  return (
    <Heading color='green' as='h3' size='lg'>
    {title}
  </Heading>
  )
}

export default InfoHeading