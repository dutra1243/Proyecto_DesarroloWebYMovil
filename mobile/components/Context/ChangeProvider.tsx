import { StyleSheet, Text, View } from 'react-native'
import React, { createContext, useContext, useState } from 'react'

export const ChangeContext = createContext<any>(null)

const ChangeProvider = ({children} : {children : React.ReactNode}) => {

  const [isChanged, setIsChanged] = useState(false)

  return (
    <ChangeContext.Provider value={[isChanged, setIsChanged]} >
      {children}
    </ChangeContext.Provider>
  )
}

export default ChangeProvider

const styles = StyleSheet.create({})