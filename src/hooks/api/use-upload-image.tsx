import { useState } from "react"
import { api } from "@/lib/axios"

interface UploadImageResponse {
  data: {
    url: string
    // Add other response fields as needed
  }[]
}

export function useUploadImage() {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

  const uploadImage = async (files: File[]) => {
    try {
      setIsLoading(true)
      setError(null)
      
      const formData = new FormData()
      files.forEach(file => formData.append('files', file))
      
      const { data } = await api.post<UploadImageResponse>("/upload-image", formData)
      return data
    } catch (err) {
      setError(err instanceof Error ? err : new Error('Failed to upload image'))
      throw err
    } finally {
      setIsLoading(false)
    }
  }

  return { uploadImage, isLoading, error }
}
