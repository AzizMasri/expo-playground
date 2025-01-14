import { View, Text, ActivityIndicator } from 'react-native'
import React from 'react'

const LoadingSpinner = () => {
  return (
    <View className='flex-1 justify-center items-center bg-white'>
        <ActivityIndicator size="large" color="#00ada8" />
    </View>
  )
}

export default LoadingSpinner