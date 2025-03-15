import { View, Text } from 'react-native'
import React from 'react'
import { IconButton } from 'react-native-paper'

const CustomHeader = ({title}: {title: string}) => {
  return (
    <View className="flex-row items-center">
        <View className="flex-1 flex-col">
          <Text
            className="ml-10 mt-6"
            style={{ fontFamily: "Poppins_400Regular", fontSize: 30 }}
          >
            {title}
          </Text>
        </View>
      </View>
  )
}

export default CustomHeader