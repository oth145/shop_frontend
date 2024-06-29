"use client"
import { useState,useEffect } from "react"
import * as React from "react"
import axios from "axios"
import { useShoppingCart } from "@/components/Componentcontext"
import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Interface } from "readline"
import Link from "next/link"
import { useRouter } from "next/navigation"
// import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
// import { AlertCircle,Terminal } from "lucide-react"
import Cookies from "js-cookie"
import { cookies } from "next/headers"

interface TokenData {
  email: string;
  username: string;
}


export default function Page() {
 const router = useRouter();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [check,setcheck] = useState(true);
  const {testUser,settestUser,cartItems}:any = useShoppingCart();


  const handleSubmit = async (event:any) => {
    event.preventDefault();
    try {
      const email = event.target.email.value;
    const password = event.target.password.value;
      // console.log({ email, password })
       //http://localhost:10000/
      //https://shop-backend-1-hsjy.onrender.com/
      const response = await axios.post('https://shop-backend-1-hsjy.onrender.com/api/signin', { email, password });
      if(response.data) {
        // setcheck(true)
        const stringifyData = JSON.stringify(response.data) 
        Cookies.set('key-set',stringifyData,{expires:1});
        // console.log(response.data);
        const token:any = Cookies.get('key-set')
        // console.log(token)
        if (token) {
          const tokenData:any = JSON.parse(token)
          console.log(tokenData)
          settestUser({...testUser,nameUser:tokenData.username,emailUser:tokenData.email,check:true});
        }

        if(cartItems.length !== 0) {
          router.push('/checkout')
        } else {
          router.push('/')
        }
        
      }
      // Redirect to dashboard or other page on successful sign-in
    } catch (error:any) {
      console.error('Sign-in failed:', error.response.data);
      // Handle sign-in error (e.g., display error message to user)
    }
  };
 

  return ( <div className="flex items-center justify-center h-screen">
    <Card className="w-[350px]">
      {/* <div className="mx-auto w-full max-w-screen-xl px-20"> */}
      <CardHeader>
        <CardTitle>Sign in</CardTitle>
        {/* <CardDescription>Deploy your new project in one-click.</CardDescription> */}
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="email">email</Label>
              <Input id="email" type="email" name="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Ex:exemple@gmail.com" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="password">password</Label>
              <Input id="password" type="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="*********" />
            </div>
            <div className=" flex justify-between">

              <div>
              <Button type="submit">Connect</Button>
              </div>
              <Link href='/auth/signup' className=" text-green-600 font-medium  dark:text-green-500 hover:underline">Create account! </Link>
              
            </div>
          </div>
        </form>
      </CardContent>
      {/* </div> */}
    </Card>
    {/* {check ? (
    <Alert>
            <Terminal className="h-4 w-4" />
      <AlertTitle>Connected</AlertTitle>
      <AlertDescription>
        Hello New User
      </AlertDescription>
    </Alert>) : (
      <Alert variant="destructive">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Error</AlertTitle>
      <AlertDescription>
        Your session has expired. Please log in again.
      </AlertDescription>
    </Alert>

    )
    } */}
    </div> 
    
  )
}
