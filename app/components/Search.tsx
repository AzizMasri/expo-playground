import { View, Text } from 'react-native'
import React, { useState } from 'react'
import { useLocalSearchParams, usePathname } from 'expo-router'

const Search = () => {
  const path = usePathname();
  const params = useLocalSearchParams<{query?: string}>();
  const [search, setSearch] = useState(null);
  
  return (
    <View>
      <Text>SearchBar</Text>
    </View>
  )
}

export default Search