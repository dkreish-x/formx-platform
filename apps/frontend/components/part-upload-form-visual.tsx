"use client"

import { useState, useEffect } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { motion } from "framer-motion"
import { FileUploader } from "@/components/file-uploader"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent } from "@/components/ui/tabs"
import { uploadPart } from "@/actions/part-actions"
import { toast } from "@/components/ui/use-toast"
import { Loader2, AlertCircle, FileUp, Info, Check } from "lucide-react"
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

export default function PartUploadFormVisual() {
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
  const [currentStep, setCurrentStep] = useState(1)
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

      const newProcess = getProcessById(watchedProcess)
      const oldProcess = selectedProcess

      // Only proceed if the process has actually changed
      if (newProcess?.id !== oldProcess?.id) {
        // Reset material and finish when process changes
        form.setValue("material", "")
        form.setValue("finish", "")
        setSelectedMaterial("")
        setCompatibleFinishes([])

        // Update the selected process
        setSelectedProcess(newProcess)

        // Set defaults for new process fields after a short delay
        setTimeout(() => {
          if (newProcess?.additionalFields) {
            newProcess.additionalFields.forEach((field) => {
              if (field.default !== undefined) {
                form.setValue(field.id as any, field.default)
              }
            })
          }
          setProcessSwitching(false)
        }, 0)
      } else {
        setProcessSwitching(false)
      }
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
              <FormLabel className="text-gray-700">{additionalField.name}</FormLabel>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value || additionalField.default?.toString() || ""}
              >
                <FormControl>
                  <SelectTrigger className="h-12 bg-white border-gray-300">
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
                <FormLabel className="text-gray-700">{additionalField.name}</FormLabel>
                <FormControl>
                  <Input
                    type="number"
                    step="0.01"
                    className="h-12 bg-white border-gray-300"
                    {...field}
                    value={stringValue}
                  />
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
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border border-gray-200 p-4">
              <FormControl>
                <Checkbox checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel className="text-gray-700">{additionalField.name}</FormLabel>
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
                <FormLabel className="text-gray-700">{additionalField.name}</FormLabel>
                <FormControl>
                  <Input className="h-12 bg-white border-gray-300" {...field} value={stringValue} />
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

      // Collect additional options
      const additionalOptions: Record<string, any> = {}
      if (selectedProcess?.additionalFields) {
        selectedProcess.additionalFields.forEach((field) => {
          const fieldValue = values[field.id as keyof typeof values]
          if (fieldValue !== undefined) {
            additionalOptions[field.id] = fieldValue
          }
        })
      }

      // Call the server action to store the part data
      const result = await uploadPart({
        ...values,
        fileId,
        fileUrl,
        fileName: file.name,
        fileSize: file.size,
        fileType: file.type,
        additionalOptions,
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

  const nextStep = () => {
    if (currentStep === 1 && !file) {
      setFileError("Please upload a part file.")
      return
    }

    if (currentStep === 2) {
      const processValue = form.getValues("process")
      if (!processValue) {
        form.setError("process", { message: "Please select a manufacturing process" })
        return
      }
    }

    setCurrentStep(currentStep + 1)
  }

  const prevStep = () => {
    setCurrentStep(currentStep - 1)
  }

  // Helper function to check if a field should be displayed
  const shouldShowField = (fieldId: string) => {
    if (!selectedProcess) return false
    return selectedProcess.additionalFields?.some((field) => field.id === fieldId) || false
  }

  return (
    <div className="container max-w-4xl mx-auto">
      <Card className="border border-gray-200 shadow-sm">
        <CardHeader className="bg-white border-b border-gray-100">
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="text-2xl font-semibold text-gray-800">Upload Your Part</CardTitle>
              <CardDescription className="mt-1 text-gray-500">
                Get an instant quote for your custom manufacturing needs
              </CardDescription>
            </div>
            <div className="hidden md:flex items-center space-x-1">
              <Badge
                variant={currentStep >= 1 ? "default" : "outline"}
                className={currentStep >= 1 ? "bg-brand-dark-gold text-white" : ""}
              >
                <span className="mr-1">1</span> Upload
              </Badge>
              <div className="w-8 h-px bg-gray-200"></div>
              <Badge
                variant={currentStep >= 2 ? "default" : "outline"}
                className={currentStep >= 2 ? "bg-brand-dark-gold text-white" : ""}
              >
                <span className="mr-1">2</span> Process
              </Badge>
              <div className="w-8 h-px bg-gray-200"></div>
              <Badge
                variant={currentStep >= 3 ? "default" : "outline"}
                className={currentStep >= 3 ? "bg-brand-dark-gold text-white" : ""}
              >
                <span className="mr-1">3</span> Details
              </Badge>
            </div>
          </div>
        </CardHeader>
        <CardContent className="p-0">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <Tabs value={`step-${currentStep}`} className="w-full">
                {/* Step 1: File Upload */}
                <TabsContent value="step-1" className="m-0">
                  <div className="p-6 space-y-6">
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="text-center mb-6">
                        <h3 className="text-lg font-semibold text-gray-800">Upload Your Part File</h3>
                        <p className="text-sm text-gray-500">
                          We accept various file formats depending on the manufacturing process
                        </p>
                      </div>

                      <FormField
                        name="file-upload"
                        render={() => (
                          <FormItem>
                            <FormLabel htmlFor="file-upload">Part File</FormLabel>
                            <FormDescription className="mb-2">
                              We accept various file formats depending on the manufacturing process
                            </FormDescription>
                            <FormControl>
                              <div className="bg-gray-50 p-8 rounded-lg border border-dashed border-gray-300">
                                <FileUploader onFileChange={onFileChange} />
                                {fileError && (
                                  <div className="mt-2 text-red-500 text-sm flex items-center">
                                    <AlertCircle className="h-4 w-4 mr-1" />
                                    {fileError}
                                  </div>
                                )}
                                {file && (
                                  <div className="mt-4 p-3 bg-green-50 rounded-md border border-green-100 flex items-start">
                                    <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
                                    <div>
                                      <p className="text-sm font-medium text-green-800">File uploaded successfully</p>
                                      <p className="text-xs text-green-600">
                                        {file.name} ({(file.size / 1024 / 1024).toFixed(2)} MB)
                                      </p>
                                    </div>
                                  </div>
                                )}
                              </div>
                            </FormControl>
                          </FormItem>
                        )}
                      />

                      <div className="mt-4 text-sm text-gray-500">
                        <div className="flex items-center">
                          <Info className="h-4 w-4 mr-1" />
                          <span className="font-medium">Supported file formats:</span>
                        </div>
                        <ul className="mt-2 list-disc list-inside pl-4 space-y-1">
                          <li>For 3D models: .STEP, .STP, .IGES, .IGS, .STL</li>
                          <li>For 2D drawings: .DXF, .DWG, .SVG, .AI, .PDF</li>
                          <li>Maximum file size: 50MB</li>
                        </ul>
                      </div>
                    </motion.div>
                  </div>
                </TabsContent>

                {/* Step 2: Process Selection */}
                <TabsContent value="step-2" className="m-0">
                  <div className="p-6 space-y-6">
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="text-center mb-6">
                        <h3 className="text-lg font-semibold text-gray-800">Select Manufacturing Process</h3>
                        <p className="text-sm text-gray-500">
                          Choose the manufacturing process best suited for your part
                        </p>
                      </div>

                      <FormField
                        control={form.control}
                        name="process"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel className="text-gray-700">Manufacturing Process</FormLabel>
                            <Select onValueChange={field.onChange} defaultValue={field.value}>
                              <FormControl>
                                <SelectTrigger className="h-12 bg-white border-gray-300">
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
                            <FormDescription className="text-gray-500">
                              Choose the process that best matches your part requirements
                            </FormDescription>
                            <FormMessage />
                          </FormItem>
                        )}
                      />

                      {selectedProcess && !processSwitching && (
                        <div className="mt-6 p-4 bg-gray-50 rounded-lg border border-gray-200">
                          <h4 className="text-sm font-medium text-gray-800 mb-2">Process Information</h4>
                          <p className="text-sm text-gray-600 mb-3">{selectedProcess.description}</p>
                          <div className="grid grid-cols-2 gap-4 text-sm">
                            <div>
                              <span className="font-medium text-gray-700">Lead Time:</span>{" "}
                              <span className="text-gray-600">
                                {selectedProcess.leadTimeRange.min}-{selectedProcess.leadTimeRange.max} days
                              </span>
                            </div>
                            <div>
                              <span className="font-medium text-gray-700">Accepted Files:</span>{" "}
                              <span className="text-gray-600">{selectedProcess.acceptedFileTypes.join(", ")}</span>
                            </div>
                          </div>
                        </div>
                      )}
                    </motion.div>
                  </div>
                </TabsContent>

                {/* Step 3: Part Details */}
                <TabsContent value="step-3" className="m-0">
                  <div className="p-6 space-y-6">
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="text-center mb-6">
                        <h3 className="text-lg font-semibold text-gray-800">Part Details</h3>
                        <p className="text-sm text-gray-500">Provide specifications for your part</p>
                      </div>

                      <div className="space-y-6">
                        <FormField
                          control={form.control}
                          name="partName"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel className="text-gray-700">Part Name</FormLabel>
                              <FormControl>
                                <Input
                                  placeholder="Enter part name"
                                  {...field}
                                  className="h-12 bg-white border-gray-300"
                                />
                              </FormControl>
                              <FormDescription className="text-gray-500">
                                Give your part a descriptive name for easy identification
                              </FormDescription>
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
                                  <FormLabel className="text-gray-700">Material</FormLabel>
                                  <Select onValueChange={field.onChange} value={field.value}>
                                    <FormControl>
                                      <SelectTrigger className="h-12 bg-white border-gray-300">
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
                                  <FormDescription className="text-gray-500">
                                    Select the material for your part
                                  </FormDescription>
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
                                    <FormLabel className="text-gray-700">Finish</FormLabel>
                                    <Select onValueChange={field.onChange} value={field.value}>
                                      <FormControl>
                                        <SelectTrigger className="h-12 bg-white border-gray-300">
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
                                    <FormDescription className="text-gray-500">
                                      Select the finish for your part
                                    </FormDescription>
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
                                  <FormLabel className="text-gray-700">Quantity</FormLabel>
                                  <FormControl>
                                    <Input
                                      type="number"
                                      min={selectedProcess.minQuantity}
                                      max={selectedProcess.maxQuantity}
                                      className="h-12 bg-white border-gray-300"
                                      {...field}
                                    />
                                  </FormControl>
                                  <FormDescription className="text-gray-500">
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
                              <FormLabel className="text-gray-700">Additional Notes</FormLabel>
                              <FormControl>
                                <Textarea
                                  placeholder="Enter any special requirements or instructions"
                                  className="min-h-[100px] bg-white border-gray-300"
                                  {...field}
                                />
                              </FormControl>
                              <FormDescription className="text-gray-500">
                                Include any special requirements, tolerances, or other important details
                              </FormDescription>
                              <FormMessage />
                            </FormItem>
                          )}
                        />
                      </div>
                    </motion.div>
                  </div>
                </TabsContent>
              </Tabs>

              <div className="p-6 border-t border-gray-100 bg-gray-50 flex justify-between">
                {currentStep > 1 ? (
                  <Button type="button" variant="outline" onClick={prevStep} className="border-gray-300 text-gray-700">
                    Back
                  </Button>
                ) : (
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => router.back()}
                    className="border-gray-300 text-gray-700"
                  >
                    Cancel
                  </Button>
                )}

                {currentStep < 3 ? (
                  <Button
                    type="button"
                    className="bg-brand-dark-gold hover:bg-brand-dark-gold/90 text-white"
                    onClick={nextStep}
                  >
                    Continue
                  </Button>
                ) : (
                  <Button
                    type="submit"
                    className="bg-brand-dark-gold hover:bg-brand-dark-gold/90 text-white"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        Uploading...
                      </>
                    ) : (
                      <>
                        <FileUp className="mr-2 h-4 w-4" />
                        Upload Part
                      </>
                    )}
                  </Button>
                )}
              </div>
            </form>
          </Form>
        </CardContent>
      </Card>
    </div>
  )
}
