import { View, Text, Image, ScrollView, TouchableOpacity, Alert, TextInput } from 'react-native'
import React, { useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import images from '@/constants/images'
import icons from '@/constants/icons'
import { login } from '@/lib/appwrite'
import { account } from '@/AppwriteService'


const Signin = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
    const handleLogin = async ()=>{
      try {
        const result = await account.createEmailPasswordSession(email, password);
        Alert.alert("Success", "Logged in!");
        console.log(result);
      } catch (error) {
        Alert.alert("Error", "Invalid Credential");
      }
    }

  return (
    <SafeAreaView className="bg-white h-full">
      <ScrollView contentContainerClassName="h-full">
        <Image source={images.onboarding} className="w-full h-[50%]" resizeMode="cover" />
        <View className='px-10 mt-5'>
            <Text className='text-base text-center uppercase font-rubik text-black-200'>
                Boustead Meeting Room Booking System
            </Text>
            <Text className='text-3xl font-rubik-bold text-black-300 text-center mt-2'>
                Let's Get Started
            </Text>

            {/* <Text className='text-lg text-center font-rubik text-black-200 mt-12'>
                Login
            </Text> */}
            
            {/* <TouchableOpacity onPress={handleLogin} className="bg-white shadow-md shadow-zinc-300 rounded-full w-full py-4 px-3 mt-5">
                <View className='flex flex-row items-center justify-center gap-3'>
                    <Image source={icons.google} className='w-5 h-5' resizeMode='contain'/>
                    <Text className='text-lg font-rubik'>Continue with Google</Text>
                </View>
                
            </TouchableOpacity> */}

              <View className='flex flex-col justify-center gap-3 my-10'>
                    
                    <TextInput className='rounded-full w-full py-4 px-3 border-zinc-100 border' placeholder='Email'
                     onChangeText={setEmail}
                     value={email}
                     keyboardType="email-address"
                     />
                  
                    <TextInput className='rounded-full w-full py-4 px-3 border-zinc-100 border' placeholder='Password'
                     onChangeText={setPassword}
                     value={password}
                     secureTextEntry
                     />
                    <TouchableOpacity onPress={handleLogin} className="bg-[#00ada8] shadow-md shadow-zinc-300 rounded-full w-full py-4 px-3 mt-5">
                      <View className='flex flex-row items-center justify-center gap-3'>
                          {/* <Image source={icons.google} className='w-5 h-5' resizeMode='contain'/> */}
                          <Text className='text-lg font-rubik text-white'>Login</Text>
                      </View>
                      
                  </TouchableOpacity>
                   <TouchableOpacity onPress={handleLogin} className="bg-white shadow-md shadow-zinc-300 rounded-full w-full py-4 px-3 mt-5">
                      <View className='flex flex-row items-center justify-center gap-3'>
                          <Image source={icons.google} className='w-5 h-5' resizeMode='contain'/>
                          <Text className='text-lg font-rubik'>Continue with Google</Text>
                      </View>
                      
                  </TouchableOpacity>
              </View>
            
           
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Signin