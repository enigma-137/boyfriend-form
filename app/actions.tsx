"use server"

import { supabase } from "@/lib/supabase"

function camelToSnake(obj: Record<string, any>): Record<string, any> {
  const result: Record<string, any> = {}
  for (const [key, value] of Object.entries(obj)) {
    const snakeKey = key.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`)
    result[snakeKey] = value
  }
  return result
}

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
    const snakeCaseData = camelToSnake(data)
    const { error } = await supabase
      .from('applications')
      .insert([snakeCaseData])

    if (error) {
      throw new Error(error.message || "Failed to submit application")
    }

    return { success: true }
  } catch (error) {
    console.error("Error submitting application:", error)
    throw error
  }
}
