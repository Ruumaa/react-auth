import React from 'react'
import Navbar from './Navbar'
import { Box} from '@chakra-ui/react'

function Dashboard() {
  return (
    <>
        <Navbar/>
        <Box mt={5} mx={10}>
            <h1>Hello World</h1>
        </Box>
    </>
  )
}

export default Dashboard