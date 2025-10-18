"use client"

import { createContext, useContext, useEffect, useState } from 'react'
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  onAuthStateChanged,
  GoogleAuthProvider,
  signInWithPopup
} from 'firebase/auth'
import { doc, setDoc, getDoc } from 'firebase/firestore'
import { auth, db } from '@/lib/firebase'

const AuthContext = createContext({})

export const useAuth = () => useContext(AuthContext)

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        try {
          // Fetch user profile from Firestore
          const userDocRef = doc(db, 'users', user.uid)
          const userDoc = await getDoc(userDocRef)
          
          if (userDoc.exists()) {
            // Add displayName from Firestore to user object
            setUser({ ...user, displayName: userDoc.data().displayName })
          } else {
            setUser(user)
          }
        } catch (error) {
          console.error("Firestore error:", error)
          // Fallback to basic user object if Firestore fails
          setUser(user)
        }
      } else {
        setUser(null)
      }
      setLoading(false)
    })

    return () => unsubscribe()
  }, [])

  const signup = async (email, password, displayName) => {
    const result = await createUserWithEmailAndPassword(auth, email, password)
    
    // Store user profile in Firestore
    if (displayName && result.user) {
      try {
        await setDoc(doc(db, 'users', result.user.uid), {
          displayName: displayName,
          email: email,
          createdAt: new Date().toISOString()
        })
      } catch (error) {
        console.error("Failed to save user profile to Firestore:", error)
        // Continue anyway - user is still created in Auth
      }
    }
    
    return result
  }

  const login = (email, password) => {
    return signInWithEmailAndPassword(auth, email, password)
  }

  const logout = () => {
    return signOut(auth)
  }

  const signInWithGoogle = async () => {
    const result = await signInWithPopup(auth, new GoogleAuthProvider())
    
    // Store user profile in Firestore if it doesn't exist
    if (result.user) {
      try {
        const userDocRef = doc(db, 'users', result.user.uid)
        const userDoc = await getDoc(userDocRef)
        
        if (!userDoc.exists()) {
          await setDoc(userDocRef, {
            displayName: result.user.displayName || result.user.email.split('@')[0],
            email: result.user.email,
            createdAt: new Date().toISOString()
          })
        }
      } catch (error) {
        console.error("Failed to save Google user profile to Firestore:", error)
        // Continue anyway - user is still signed in
      }
    }
    
    return result
  }

  return (
    <AuthContext.Provider value={{ user, signup, login, logout, signInWithGoogle }}>
      {!loading && children}
    </AuthContext.Provider>
  )
}
