"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { FileUploader } from "@/components/file-uploader"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { uploadPart } from "@/actions/part-actions"
import { toast } from "@/components/ui/use-toast"
import { Loader2 } from "lucide-react"

// Mock materials data - in a real app, this would come from an API call
const materialsByProcess = {
  CNC: [
    { id: "aluminum", name: "Aluminum" },
    { id: "steel", name: "Steel" },
    { id: "stainless_steel", name: "Stainless Steel" },
    { id: "brass", name: "Brass" },
    { id: "copper", name: "Copper" },
    { id: "titanium", name: "Titanium" },
    { id: "plastic", name: "Plastic" },
  ],
  "Laser Cutting": [
    { id: "mild_steel", name: "Mild Steel" },
    { id: "stainless_steel", name: "Stainless Steel" },
    { id: "aluminum", name: "Aluminum" },
    { id: "acrylic", name: "Acrylic" },
    { id: "wood", name: "Wood" },
  ],
  "3D Printing": [
    { id: "pla", name: "PLA" },
    { id: "abs", name: "ABS" },
    { id: "petg", name: "PETG" },
    { id: "nylon", name: "Nylon" },
    { id: "tpu", name: "TPU" },
    { id: "resin", name: "Resin" },
  ],
  "Injection Molding": [
    { id: "abs", name: "ABS" },
    { id: "polypropylene", name: "Polypropylene" },
    { id: "polyethylene", name: "Polyethylene" },
    { id: "polycarbonate", name: "Polycarbonate" },
    { id: "nylon", name: "Nylon" },
    { id: "acetal", name: "Acetal" },
  ],
}

const formSchema = z.object({
  partName: z.string().min(2, {
    message: "Part name must be at least 2 characters.",
  }),
  process: z.enum(["CNC", "Laser Cutting", "3D Printing", "Injection Molding"], {
    required_error: "Please select a manufacturing process.",
  }),
  material: z.string({
    required_error: "Please select a material.",
  }),
  quantity: z.coerce
    .number()
    .int()
    .min(1, {
      message: "Quantity must be at least 1.",
    })
    .max(10000, {
      message: "For quantities over 10,000, please contact us directly.",
    }),
  tolerance: z.enum(["Standard", "Tight", "Custom"], {
    required_error: "Please select a tolerance level.",
  }),
})

export default function PartUploadForm() {
  const router = useRouter()
  const [file, setFile] = useState<File | null>(null)
  const [fileError, setFileError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      partName: "",
      quantity: 1,
    },
  })

  const selectedProcess = form.watch("process")
  const materials = selectedProcess ? materialsByProcess[selectedProcess] : []

  // Reset material when process changes
  const onProcessChange = (value: string) => {
    form.setValue("process", value as any)
    form.setValue("material", "")
  }

  const onFileChange = (uploadedFile: File | null) => {
    setFile(uploadedFile)
    setFileError(null)
  }

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!file) {
      setFileError("Please upload a part file.")
      return
    }

    setIsSubmitting(true)

    try {
      // In a real app, you would upload the file to a storage service
      // and get back a URL or file ID
      const fileId = `file_${Date.now()}`
      const fileUrl = `/api/files/${fileId}` // This would be a real URL in production

      // Call the server action to store the part data
      const result = await uploadPart({
        ...values,
        fileId,
        fileUrl,
        fileName: file.name,
        fileSize: file.size,
        fileType: file.type,
        userId: "user_123", // In a real app, this would come from authentication
      })

      if (result.success) {
        toast({
          title: "Part uploaded successfully",
          description: "Redirecting to part configuration...",
        })

        // Navigate to the part configuration page
        router.push(`/configure/${result.partId}`)
      } else {
        throw new Error(result.error || "Failed to upload part")
      }
    } catch (error) {
      console.error("Error uploading part:", error)
      toast({
        title: "Error uploading part",
        description: error instanceof Error ? error.message : "An unknown error occurred",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="space-y-6 p-6 bg-white rounded-lg shadow-sm border border-brand-light-grey/20">
          <div className="space-y-2">
            <h2 className="text-xl font-semibold text-brand-dark-grey">Part Information</h2>
            <p className="text-sm text-brand-light-grey">Provide details about your part for accurate quoting</p>
          </div>

          <FormField
            control={form.control}
            name="partName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Part Name</FormLabel>
                <FormControl>
                  <Input placeholder="Enter part name" {...field} />
                </FormControl>
                <FormDescription>Give your part a descriptive name for easy identification</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="space-y-4">
            <FormField
              name="file-upload"
              render={() => (
                <FormItem>
                  <FormLabel htmlFor="file-upload">Part File</FormLabel>
                  <FormDescription className="mb-2">Upload your STEP, STL, or DXF file (max 50MB)</FormDescription>
                  <FormControl>
                    <FileUploader onFileChange={onFileChange} />
                  </FormControl>
                  {fileError && <p className="text-red-500 text-sm mt-1">{fileError}</p>}
                  {file && (
                    <p className="text-sm text-brand-dark-grey mt-2">
                      Selected file: {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
                    </p>
                  )}
                </FormItem>
              )}
            />
          </div>

          <FormField
            control={form.control}
            name="process"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Manufacturing Process</FormLabel>
                <Select onValueChange={onProcessChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a manufacturing process" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="CNC">CNC Machining</SelectItem>
                    <SelectItem value="Laser Cutting">Laser Cutting</SelectItem>
                    <SelectItem value="3D Printing">3D Printing</SelectItem>
                    <SelectItem value="Injection Molding">Injection Molding</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>Choose the manufacturing process best suited for your part</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="material"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Material</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a material" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {selectedProcess ? (
                      materials.map((material) => (
                        <SelectItem key={material.id} value={material.id}>
                          {material.name}
                        </SelectItem>
                      ))
                    ) : (
                      <SelectItem value="none" disabled>
                        Select a process first
                      </SelectItem>
                    )}
                  </SelectContent>
                </Select>
                <FormDescription>Select the material for your part</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="quantity"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Quantity</FormLabel>
                <FormControl>
                  <Input type="number" min={1} {...field} />
                </FormControl>
                <FormDescription>Enter the number of parts you need</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="tolerance"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Tolerance</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select tolerance level" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="Standard">Standard (±0.005")</SelectItem>
                    <SelectItem value="Tight">Tight (±0.001")</SelectItem>
                    <SelectItem value="Custom">Custom (specify in notes)</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>Specify the required dimensional tolerance for your part</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="flex justify-end space-x-4">
          <Button type="button" variant="outline" onClick={() => router.back()}>
            Cancel
          </Button>
          <Button
            type="submit"
            className="bg-brand-dark-gold hover:bg-brand-dark-gold/90 text-brand-dark-grey"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Uploading...
              </>
            ) : (
              "Upload Part"
            )}
          </Button>
        </div>
      </form>
    </Form>
  )
}
