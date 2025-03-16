import { View, Text, StatusBar } from 'react-native'
import React, { useEffect } from 'react'
import { AuthProvider, useAuth } from '../contexts/AuthContext'
import { router, Stack } from 'expo-router'
import { supabase } from '@/utils/supabase'
import { getUserData } from '@/services/userService'

const _layout = () => {
  return (
    <AuthProvider>
      <StatusBar className="bg-secondary" barStyle="dark-content" />
        <Mainlayout />
    </AuthProvider>
  )
}

const Mainlayout = () => {
    const {setAuth, setUserData} = useAuth() as { setAuth: (user: any) => void, setUserData: (data: any) => void };    
    useEffect(() => {
        supabase.auth.onAuthStateChange((_event, session) => {
            console.log(session?.user.id);

            if(session) {
                setAuth(session?.user);
                updateUserData(session?.user);
                router.replace('/(tabs)')
            } else {
                setAuth(null);
                router.replace('/auth')
            }
          })
    }, []);

    const updateUserData = async (user: any) => {
        let res = await getUserData(user?.id);
        if(res.success) setUserData(res.data);
    }


  return (
    <Stack screenOptions={
        {
            headerShown: false
        }
    }/>
  )
}
export default _layout