import { View, Text, ScrollView, Image, TouchableOpacity, ImageSourcePropType } from 'react-native'
import React, { ReactNode, useState } from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import icons from '@/constants/icons'
import images from '@/constants/images'
import { useUser } from '@/contexts/userContext'
import { settings } from '@/constants/data'
import { toast } from '@/lib/toast'
import { useRouter } from 'expo-router'
import LoadingSpinner from '@/app/components/loadingSpinner'

const Profile = () => {
  const user = useUser();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const handleLogout = async ()=>{
    try {
      setIsLoading(true);
      await user.logout();
      router.replace("/signin");
      
    } catch (error) {
      toast('error while loging out');
    } finally{
      setIsLoading(false)
    }
  }

  if(isLoading){
    <LoadingSpinner />
  }

  interface SettingItemProps {
    title: string,
    icon: ImageSourcePropType,
    onPress?: () => void;
    textStyle?: string,
    showArrow?: boolean

  }
  const SettingItem = ({title, icon, onPress, textStyle, showArrow = true}: SettingItemProps) => (
    <TouchableOpacity className='flex flex-row items-center justify-between py-3' onPress={onPress}>
      <View className='flex flex-row items-center gap-3 justify-between'>
          <Image source={icon} className='size-6'/>
          <Text className={`font-rubik-medium text-lg ${textStyle}`}>{title}</Text>
      </View>
      {showArrow && <Image source={icons.rightArrow} className='size-6'/> }
    </TouchableOpacity>
  )

  return (
    <SafeAreaView>
      <View className='h-full bg-white'>
        <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerClassName='pb-32 px-7'
        >
        <View className='flex flex-row justify-between items-center w-full mt-5'>
          <Text className='text-xl font-rubik-bold'>Profile</Text>
          <Image source={icons.bell} className='size-5'/>
        </View>

        <View className='flex flex-row items-center mt-5 justify-center'>
          <View className='flex flex-col items-center relative mt-5'>
            <Image source={{uri: user.current?.avatar}} className='size-44 relative rounded-full'/>
            <TouchableOpacity className='absolute top-2 right-0 '>
              <Image source={icons.edit} className='size-9'/>
            </TouchableOpacity>
            <Text className='font-rubik-bold text-2xl mt-3'>{user.current ? user.current.name : "Not Login"}</Text>
            <Text className='text-sm font-rubik mt-2'>{user.current?.position}</Text>
          </View>
        </View>

        <View className='flex flex-col mt-10'>
          <SettingItem
          title="My Booking"
          icon={icons.calendar}
          />
          <SettingItem
          title="Payment"
          icon={icons.wallet}
          />
        </View>

        <View className='flex flex-col mt-5 border-t pt-5 border-slate-200'>
        {settings.slice(2).map((item, index) => (
          <SettingItem key={index} {...item} />
        ))}
        </View>

        <View className='flex flex-col mt-5 border-t pt-5 border-slate-200'>
          {user.current? <SettingItem title="Logout" icon={icons.logout} textStyle='text-danger' showArrow={false} onPress={handleLogout}/> :
          <SettingItem title="Sign-In" icon={icons.logout} textStyle='text-primary-200' onPress={()=>{
            router.push('/signin')
          }} />
          }
          
        </View>
        
        </ScrollView>
      </View>
    </SafeAreaView>
  )
}

export default Profile