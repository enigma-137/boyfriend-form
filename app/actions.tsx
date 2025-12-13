"use server"

import { supabase } from "@/lib/supabase"

export async function submitApplication(data: {
  name: string
  email: string
  age: string
  country: string
  state: string
  height: string
  education: string
  occupation: string
  grammarTest: string
  canCook: string
  anatomyKnowledge: string
  reliability: string
  footballTeam: string
  additionalInfo: string
}) {
  try {
    const { error } = await supabase
      .from('applications')
      .insert([data])

    if (error) {
      throw new Error(error.message || "Failed to submit application")
    }

    return { success: true }
  } catch (error) {
    console.error("Error submitting application:", error)
    throw error
  }
}
