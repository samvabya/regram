import { View, Text, ScrollView, StatusBar, Image } from 'react-native'
import React from 'react'
import CustomHeader from '@/components/customheader'

const headsup = () => {
  return (
    <View className="flex-1 bg-secondary">
      <StatusBar className="bg-secondary" barStyle="dark-content" />
      <ScrollView>
        <CustomHeader title="Heads Up" />

        <View className="flex-1 items-center justify-center mt-10">
          <Image
          className=''
            source={require("../../assets/images/headphone.png")}
            style={{ width: 200, height: 200, borderRadius: 100 }}
          />
          <Text
          className="text-tertiary mt-4 px-10 text-center"
          style={{ fontFamily: "Poppins_400Regular", fontSize: 20 }}
        >
          Your Daily Interactions appear here
        </Text>
        </View>

      </ScrollView>
    </View>
  )
}

export default headsup