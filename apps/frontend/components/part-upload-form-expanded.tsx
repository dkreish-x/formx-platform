"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { FileUploader } from "@/components/file-uploader"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import { uploadPart } from "@/actions/part-actions"
import { toast } from "@/components/ui/use-toast"
import { Loader2, AlertCircle } from "lucide-react"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import {
  manufacturingProcesses,
  getProcessById,
  getCompatibleFinishes,
  type ProcessOption,
} from "@/lib/manufacturing-processes"

// Create a dynamic form schema based on the selected process
const createFormSchema = (process: ProcessOption | undefined) => {
  const baseSchema = {
    partName: z.string().min(2, {
      message: "Part name must be at least 2 characters.",
    }),
    process: z.string({
      required_error: "Please select a manufacturing process.",
    }),
    material: z.string({
      required_error: "Please select a material.",
    }),
    finish: z.string({
      required_error: "Please select a finish.",
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
    notes: z.string().optional(),
  }

  // Add additional fields based on the selected process
  const additionalFields: Record<string, any> = {}

  if (process?.additionalFields) {
    process.additionalFields.forEach((field) => {
      if (field.type === "number") {
        additionalFields[field.id] = z.coerce.number().optional()
      } else if (field.type === "checkbox") {
        additionalFields[field.id] = z.boolean().optional()
      } else {
        additionalFields[field.id] = z.string().optional()
      }
    })
  }

  return z.object({
    ...baseSchema,
    ...additionalFields,
  })
}

export default function PartUploadFormExpanded() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const initialProcessId = searchParams.get("process") || ""

  const [selectedProcess, setSelectedProcess] = useState<ProcessOption | undefined>(
    initialProcessId ? getProcessById(initialProcessId) : undefined,
  )
  const [selectedMaterial, setSelectedMaterial] = useState<string>("")
  const [compatibleFinishes, setCompatibleFinishes] = useState<any[]>([])
  const [file, setFile] = useState<File | null>(null)
  const [fileError, setFileError] = useState<string | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [processSwitching, setProcessSwitching] = useState(false)

  // Create a dynamic form schema based on the selected process
  const formSchema = createFormSchema(selectedProcess)

  // Set up the form with default values
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      partName: "",
      process: initialProcessId,
      material: "",
      finish: "",
      quantity: 1,
      notes: "",
    },
  })

  // Watch for changes to the process and material fields
  const watchedProcess = form.watch("process")
  const watchedMaterial = form.watch("material")

  // Update the selected process when the process field changes
  useEffect(() => {
    if (watchedProcess) {
      // Set process switching flag to prevent rendering fields during transition
      setProcessSwitching(true)

      // Unregister old process-specific fields before updating the selected process
      if (selectedProcess?.additionalFields) {
        selectedProcess.additionalFields.forEach((field) => {
          form.unregister(field.id as any)
        })
      }

      const process = getProcessById(watchedProcess)

      // Reset material and finish when process changes
      form.setValue("material", "")
      form.setValue("finish", "")
      setSelectedMaterial("")
      setCompatibleFinishes([])

      // Update the selected process
      setSelectedProcess(process)

      // Use setTimeout to ensure the DOM has updated before setting new field values
      setTimeout(() => {
        setProcessSwitching(false)
      }, 0)
    }
  }, [watchedProcess, form, selectedProcess])

  // Update compatible finishes when the material field changes
  useEffect(() => {
    if (watchedProcess && watchedMaterial) {
      setSelectedMaterial(watchedMaterial)
      const finishes = getCompatibleFinishes(watchedProcess, watchedMaterial)
      setCompatibleFinishes(finishes)

      // Reset finish when material changes
      form.setValue("finish", "")
    }
  }, [watchedMaterial, watchedProcess, form])

  // Handle file upload
  const onFileChange = (uploadedFile: File | null) => {
    setFile(uploadedFile)
    setFileError(null)
  }

  // Validate file type
  const validateFileType = (file: File | null) => {
    if (!file || !selectedProcess) return false

    const fileExtension = `.${file.name.split(".").pop()?.toLowerCase()}`
    return selectedProcess.acceptedFileTypes.includes(fileExtension)
  }

  // Safely render additional fields
  const renderAdditionalField = (additionalField: any) => {
    // Skip rendering during process switching
    if (processSwitching) return null

    if (additionalField.type === "select") {
      return (
        <FormField
          key={additionalField.id}
          control={form.control}
          name={additionalField.id as any}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{additionalField.name}</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value || additionalField.default?.toString() || ""}
              >
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder={`Select ${additionalField.name.toLowerCase()}`} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {additionalField.options?.map((option: any) => (
                    <SelectItem key={option.id} value={option.id}>
                      {option.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />
      )
    } else if (additionalField.type === "number") {
      return (
        <FormField
          key={additionalField.id}
          control={form.control}
          name={additionalField.id as any}
          render={({ field }) => {
            // Convert value to string to avoid "children" error with Input
            const stringValue =
              field.value !== undefined && field.value !== null
                ? String(field.value)
                : additionalField.default !== undefined && additionalField.default !== null
                  ? String(additionalField.default)
                  : ""

            return (
              <FormItem>
                <FormLabel>{additionalField.name}</FormLabel>
                <FormControl>
                  <Input type="number" step="0.01" {...field} value={stringValue} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )
          }}
        />
      )
    } else if (additionalField.type === "checkbox") {
      return (
        <FormField
          key={additionalField.id}
          control={form.control}
          name={additionalField.id as any}
          render={({ field }) => (
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
              <FormControl>
                <Checkbox checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel>{additionalField.name}</FormLabel>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
      )
    } else {
      return (
        <FormField
          key={additionalField.id}
          control={form.control}
          name={additionalField.id as any}
          render={({ field }) => {
            // Convert value to string to avoid "children" error with Input
            const stringValue =
              field.value !== undefined && field.value !== null
                ? String(field.value)
                : additionalField.default !== undefined && additionalField.default !== null
                  ? String(additionalField.default)
                  : ""

            return (
              <FormItem>
                <FormLabel>{additionalField.name}</FormLabel>
                <FormControl>
                  <Input {...field} value={stringValue} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )
          }}
        />
      )
    }
  }

  // Form submission handler
  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    if (!file) {
      setFileError("Please upload a part file.")
      return
    }

    if (!validateFileType(file)) {
      setFileError(`Invalid file type. Accepted file types: ${selectedProcess?.acceptedFileTypes.join(", ")}`)
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
        router.push(`/configure/${result.partId}?process=${values.process}`)
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
                  <FormDescription className="mb-2">
                    Upload your part file
                    {selectedProcess && <span> ({selectedProcess.acceptedFileTypes.join(", ")})</span>}
                    (max 50MB)
                  </FormDescription>
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
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a manufacturing process" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {manufacturingProcesses.map((process) => (
                      <SelectItem key={process.id} value={process.id}>
                        {process.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <FormDescription>Choose the manufacturing process best suited for your part</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {selectedProcess && !processSwitching && (
            <>
              <FormField
                control={form.control}
                name="material"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Material</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a material" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {selectedProcess.materials.map((material) => (
                          <SelectItem key={material.id} value={material.id}>
                            {material.name}
                            {material.description && ` - ${material.description}`}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormDescription>Select the material for your part</FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {selectedMaterial && compatibleFinishes.length > 0 && (
                <FormField
                  control={form.control}
                  name="finish"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Finish</FormLabel>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a finish" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {compatibleFinishes.map((finish) => (
                            <SelectItem key={finish.id} value={finish.id}>
                              {finish.name}
                              {finish.description && ` - ${finish.description}`}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                      <FormDescription>Select the finish for your part</FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              <FormField
                control={form.control}
                name="quantity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Quantity</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min={selectedProcess.minQuantity}
                        max={selectedProcess.maxQuantity}
                        {...field}
                      />
                    </FormControl>
                    <FormDescription>
                      Enter the number of parts you need (min: {selectedProcess.minQuantity}, max:{" "}
                      {selectedProcess.maxQuantity})
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Render additional fields based on the selected process */}
              {selectedProcess.additionalFields?.map(renderAdditionalField)}
            </>
          )}

          <FormField
            control={form.control}
            name="notes"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Additional Notes</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Enter any special requirements or instructions"
                    className="min-h-[100px]"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Include any special requirements, tolerances, or other important details
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {selectedProcess?.dimensionLimits && !processSwitching && (
            <Alert>
              <AlertCircle className="h-4 w-4" />
              <AlertTitle>Size Limitations</AlertTitle>
              <AlertDescription>
                <p className="text-sm">This process has the following size limitations:</p>
                <ul className="text-sm list-disc list-inside mt-1">
                  {selectedProcess.dimensionLimits.maxLength && (
                    <li>Maximum Length: {selectedProcess.dimensionLimits.maxLength}mm</li>
                  )}
                  {selectedProcess.dimensionLimits.maxWidth && (
                    <li>Maximum Width: {selectedProcess.dimensionLimits.maxWidth}mm</li>
                  )}
                  {selectedProcess.dimensionLimits.maxHeight && (
                    <li>Maximum Height: {selectedProcess.dimensionLimits.maxHeight}mm</li>
                  )}
                  {selectedProcess.dimensionLimits.maxDiameter && (
                    <li>Maximum Diameter: {selectedProcess.dimensionLimits.maxDiameter}mm</li>
                  )}
                  {selectedProcess.dimensionLimits.minDiameter && (
                    <li>Minimum Diameter: {selectedProcess.dimensionLimits.minDiameter}mm</li>
                  )}
                  {selectedProcess.dimensionLimits.maxWeight && (
                    <li>Maximum Weight: {selectedProcess.dimensionLimits.maxWeight}kg</li>
                  )}
                </ul>
              </AlertDescription>
            </Alert>
          )}
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
