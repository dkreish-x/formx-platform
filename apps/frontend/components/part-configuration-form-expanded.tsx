"use client"

import { useState, useEffect } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useRouter, useSearchParams } from "next/navigation"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage, FormDescription } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import { Loader2, RefreshCw, ShoppingCart, Send, AlertCircle } from "lucide-react"
import { Separator } from "@/components/ui/separator"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { toast } from "@/components/ui/use-toast"
import {
  manufacturingProcesses,
  getProcessById,
  getCompatibleFinishes,
  calculateBasePrice,
  estimateLeadTime,
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
    leadTime: z.enum(["Standard", "Expedited", "Rush"], {
      required_error: "Please select a lead time.",
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

type PartConfigurationFormProps = {
  part: {
    id: string
    partName: string
    process: string
    material: string
    finish?: string
    quantity: number
    fileName: string
    fileSize: number
    fileType: string
    fileUrl: string
    additionalOptions?: Record<string, any>
  }
}

export default function PartConfigurationFormExpanded({ part }: PartConfigurationFormProps) {
  const router = useRouter()
  const searchParams = useSearchParams()
  const processId = searchParams.get("process") || part.process

  const [selectedProcess, setSelectedProcess] = useState<ProcessOption | undefined>(getProcessById(processId))
  const [selectedMaterial, setSelectedMaterial] = useState<string>(part.material)
  const [compatibleFinishes, setCompatibleFinishes] = useState<any[]>([])
  const [processSwitching, setProcessSwitching] = useState(false)

  const [isCalculating, setIsCalculating] = useState(false)
  const [isAddingToCart, setIsAddingToCart] = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [estimatedPrice, setEstimatedPrice] = useState<number | null>(null)
  const [selectedPricingOption, setSelectedPricingOption] = useState<string | null>(null)
  const [leadTimeEstimate, setLeadTimeEstimate] = useState<{ min: number; max: number } | null>(null)

  // Create a dynamic form schema based on the selected process
  const formSchema = createFormSchema(selectedProcess)

  // Set up the form with default values
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      partName: part.partName,
      process: processId,
      material: part.material,
      finish: part.finish || "",
      quantity: part.quantity,
      leadTime: "Standard",
      notes: "",
      ...part.additionalOptions,
    },
  })

  // Watch for changes to the process and material fields
  const watchedProcess = form.watch("process")
  const watchedMaterial = form.watch("material")
  const watchedFinish = form.watch("finish")
  const watchedQuantity = form.watch("quantity")
  const watchedLeadTime = form.watch("leadTime")

  // Update the selected process when the process field changes
  useEffect(() => {
    if (watchedProcess) {
      const newProcess = getProcessById(watchedProcess)
      const oldProcess = selectedProcess

      // Only proceed if the process has actually changed
      if (newProcess?.id !== oldProcess?.id) {
        setProcessSwitching(true)

        // First unregister old fields to prevent rendering issues
        if (oldProcess?.additionalFields) {
          oldProcess.additionalFields.forEach((field) => {
            form.unregister(field.id as any)
          })
        }

        // Then update the selected process
        setSelectedProcess(newProcess)

        // Reset material and finish when process changes
        form.setValue("material", "")
        form.setValue("finish", "")
        setSelectedMaterial("")
        setCompatibleFinishes([])

        // Set defaults for new process fields after a short delay to ensure DOM is updated
        if (newProcess?.additionalFields) {
          setTimeout(() => {
            newProcess.additionalFields.forEach((field) => {
              if (field.default !== undefined) {
                form.setValue(field.id as any, field.default)
              }
            })
            setProcessSwitching(false)
          }, 0)
        } else {
          setProcessSwitching(false)
        }

        // Reset price estimate when process changes
        setEstimatedPrice(null)
        setLeadTimeEstimate(null)
        setSelectedPricingOption(null)
      }
    }
  }, [watchedProcess, form, selectedProcess])

  // Update compatible finishes when the material field changes
  useEffect(() => {
    if (watchedProcess && watchedMaterial) {
      setSelectedMaterial(watchedMaterial)
      const finishes = getCompatibleFinishes(watchedProcess, watchedMaterial)
      setCompatibleFinishes(finishes)

      // Reset finish when material changes if current finish is not compatible
      const currentFinish = watchedFinish
      if (currentFinish && !finishes.some((f) => f.id === currentFinish)) {
        form.setValue("finish", "")
      }
    }
  }, [watchedMaterial, watchedProcess, watchedFinish, form])

  const handleEstimatePrice = async () => {
    if (!selectedProcess || !watchedMaterial || !watchedFinish) {
      toast({
        title: "Missing information",
        description: "Please select a process, material, and finish before estimating price.",
        variant: "destructive",
      })
      return
    }

    setIsCalculating(true)
    try {
      // Collect all form values for additional options
      const formValues = form.getValues()
      const additionalOptions: Record<string, any> = {}

      // Extract additional fields from the form values
      if (selectedProcess.additionalFields) {
        selectedProcess.additionalFields.forEach((field) => {
          if (formValues[field.id as keyof typeof formValues] !== undefined) {
            additionalOptions[field.id] = formValues[field.id as keyof typeof formValues]
          }
        })
      }

      // Add lead time to additional options
      additionalOptions.leadTime = watchedLeadTime

      // Calculate price
      const price = calculateBasePrice(
        watchedProcess,
        watchedMaterial,
        watchedFinish,
        watchedQuantity,
        additionalOptions,
      )

      // Estimate lead time
      const leadTime = estimateLeadTime(watchedProcess, watchedFinish, watchedQuantity, additionalOptions)

      setEstimatedPrice(price)
      setLeadTimeEstimate(leadTime)
      setSelectedPricingOption("standard")

      toast({
        title: "Price Estimated",
        description: `The estimated price for your part is $${price.toFixed(2)}`,
      })
    } catch (error) {
      console.error("Error calculating price:", error)
      toast({
        title: "Error calculating price",
        description: "There was an error calculating the price. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsCalculating(false)
    }
  }

  const handleAddToCart = async () => {
    if (!estimatedPrice) {
      toast({
        title: "Please estimate price first",
        description: "You need to estimate the price before adding to cart.",
        variant: "destructive",
      })
      return
    }

    setIsAddingToCart(true)
    try {
      // Collect all form values
      const formValues = form.getValues()

      // In a real app, this would call an API endpoint to add the item to the cart
      await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulate API call

      // Calculate final price based on pricing option
      let finalPrice = estimatedPrice
      if (selectedPricingOption === "expedited") {
        finalPrice = estimatedPrice * 1.25
      } else if (selectedPricingOption === "bulk") {
        finalPrice = estimatedPrice * 0.9
      }

      // Add to cart
      // In a real app, this would be a server action or API call
      const cartItem = {
        id: part.id,
        partName: formValues.partName,
        process: formValues.process,
        material: formValues.material,
        finish: formValues.finish,
        quantity: formValues.quantity,
        leadTime: formValues.leadTime,
        price: finalPrice,
        fileUrl: part.fileUrl,
        // Ensure tolerance is included for cart compatibility
        tolerance: "Standard", // Default value if not in form
      }

      console.log("Adding to cart:", cartItem)

      toast({
        title: "Added to cart",
        description: "Your part has been added to the cart successfully.",
      })

      // Navigate to cart page after a short delay to ensure toast is visible
      setTimeout(() => {
        router.push("/cart")
      }, 500)
    } catch (error) {
      console.error("Error adding to cart:", error)
      toast({
        title: "Error adding to cart",
        description: "There was an error adding your part to the cart. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsAddingToCart(false)
    }
  }

  const handleSubmitForReview = async () => {
    if (!estimatedPrice) {
      toast({
        title: "Please estimate price first",
        description: "You need to estimate the price before submitting for review.",
        variant: "destructive",
      })
      return
    }

    setIsSubmitting(true)
    try {
      // In a real app, this would call an API endpoint to submit the part for review
      await new Promise((resolve) => setTimeout(resolve, 1000)) // Simulate API call

      toast({
        title: "Submitted for review",
        description: "Your part has been submitted for review. We'll get back to you shortly.",
      })

      // Navigate to confirmation page
      router.push("/quote-confirmation")
    } catch (error) {
      console.error("Error submitting for review:", error)
      toast({
        title: "Error submitting for review",
        description: "There was an error submitting your part for review. Please try again.",
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  // Safely render additional fields
  const renderAdditionalField = (additionalField: any) => {
    // Skip rendering if we're in the middle of a process switch
    if (processSwitching) {
      return null
    }

    // Skip rendering if the field is not registered yet
    if (!form.getFieldState(additionalField.id as any).isDirty && !form.getValues(additionalField.id as any)) {
      return null
    }

    if (additionalField.type === "select") {
      return (
        <FormField
          key={additionalField.id}
          control={form.control}
          name={additionalField.id as any}
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-700">{additionalField.name}</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value || additionalField.default?.toString()}>
                <FormControl>
                  <SelectTrigger className="h-10 bg-white border-gray-300">
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
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-700">{additionalField.name}</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  step="0.01"
                  className="h-10 bg-white border-gray-300"
                  {...field}
                  value={field.value || additionalField.default?.toString() || ""}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
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
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-700">{additionalField.name}</FormLabel>
              <FormControl>
                <Input
                  className="h-10 bg-white border-gray-300"
                  {...field}
                  value={field.value || additionalField.default?.toString() || ""}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      )
    }
  }

  return (
    <Card className="border border-gray-200 shadow-sm">
      <CardHeader className="bg-white border-b border-gray-100">
        <CardTitle className="text-xl font-semibold text-gray-800">Part Configuration</CardTitle>
        <CardDescription className="text-gray-500">Configure your part for manufacturing</CardDescription>
      </CardHeader>
      <CardContent className="p-6">
        <Form {...form}>
          <form className="space-y-6">
            <FormField
              control={form.control}
              name="partName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700">Part Name</FormLabel>
                  <FormControl>
                    <Input {...field} className="h-10 bg-white border-gray-300" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="process"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-gray-700">Manufacturing Process</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger className="h-10 bg-white border-gray-300">
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
                          <SelectTrigger className="h-10 bg-white border-gray-300">
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
                            <SelectTrigger className="h-10 bg-white border-gray-300">
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
                          className="h-10 bg-white border-gray-300"
                          {...field}
                        />
                      </FormControl>
                      <FormDescription className="text-gray-500">
                        Min: {selectedProcess.minQuantity}, Max: {selectedProcess.maxQuantity}
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Render additional fields based on the selected process */}
                {selectedProcess.additionalFields?.map(renderAdditionalField)}

                <FormField
                  control={form.control}
                  name="leadTime"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-gray-700">Lead Time</FormLabel>
                      <Select onValueChange={field.onChange} defaultValue={field.value}>
                        <FormControl>
                          <SelectTrigger className="h-10 bg-white border-gray-300">
                            <SelectValue placeholder="Select lead time" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="Standard">Standard (Regular Production)</SelectItem>
                          <SelectItem value="Expedited">Expedited (+25% Cost)</SelectItem>
                          <SelectItem value="Rush">Rush (+50% Cost)</SelectItem>
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />

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

                {selectedProcess?.dimensionLimits && (
                  <Alert className="bg-blue-50 border-blue-100 text-blue-800">
                    <AlertCircle className="h-4 w-4 text-blue-500" />
                    <AlertTitle className="text-blue-800">Size Limitations</AlertTitle>
                    <AlertDescription className="text-blue-700">
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
              </>
            )}

            <Button
              type="button"
              onClick={handleEstimatePrice}
              className="w-full bg-brand-dark-gold hover:bg-brand-dark-gold/90 text-white"
              disabled={isCalculating || processSwitching}
            >
              {isCalculating ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Calculating...
                </>
              ) : processSwitching ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Updating Process...
                </>
              ) : (
                <>
                  <RefreshCw className="mr-2 h-4 w-4" />
                  Estimate Price
                </>
              )}
            </Button>
          </form>
        </Form>

        {estimatedPrice !== null && !processSwitching && (
          <div className="mt-6 space-y-4">
            <Separator className="bg-gray-200" />

            <div className="space-y-2">
              <h3 className="font-medium text-gray-800">Pricing Options</h3>

              <RadioGroup value={selectedPricingOption || ""} onValueChange={setSelectedPricingOption}>
                <div className="flex items-center justify-between space-x-2 rounded-md border border-gray-200 p-3">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="standard" id="standard" />
                    <Label htmlFor="standard" className="font-normal text-gray-700">
                      Standard Production
                    </Label>
                  </div>
                  <div className="text-right font-medium text-gray-800">${estimatedPrice.toFixed(2)}</div>
                </div>

                <div className="flex items-center justify-between space-x-2 rounded-md border border-gray-200 p-3">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="expedited" id="expedited" />
                    <Label htmlFor="expedited" className="font-normal text-gray-700">
                      Expedited Production (+25%)
                    </Label>
                  </div>
                  <div className="text-right font-medium text-gray-800">${(estimatedPrice * 1.25).toFixed(2)}</div>
                </div>

                <div className="flex items-center justify-between space-x-2 rounded-md border border-gray-200 p-3">
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value="bulk" id="bulk" />
                    <Label htmlFor="bulk" className="font-normal text-gray-700">
                      Bulk Discount (10+ units, -10%)
                    </Label>
                  </div>
                  <div className="text-right font-medium text-gray-800">${(estimatedPrice * 0.9).toFixed(2)}</div>
                </div>
              </RadioGroup>
            </div>

            <div className="pt-4 border-t border-gray-200">
              <div className="flex justify-between mb-2">
                <span className="font-medium text-gray-700">Total Estimated Price:</span>
                <span className="text-xl font-bold text-gray-800">
                  $
                  {selectedPricingOption === "expedited"
                    ? (estimatedPrice * 1.25).toFixed(2)
                    : selectedPricingOption === "bulk"
                      ? (estimatedPrice * 0.9).toFixed(2)
                      : estimatedPrice.toFixed(2)}
                </span>
              </div>

              {leadTimeEstimate && (
                <div className="flex justify-between mb-2">
                  <span className="font-medium text-gray-700">Estimated Lead Time:</span>
                  <span className="text-gray-800">
                    {leadTimeEstimate.min}-{leadTimeEstimate.max} business days
                  </span>
                </div>
              )}

              <p className="text-xs text-gray-500 mb-4">
                This is an estimate. Final pricing may vary based on detailed analysis of your part.
              </p>

              <div className="space-y-3">
                <Button
                  type="button"
                  onClick={handleAddToCart}
                  className="w-full bg-brand-dark-gold hover:bg-brand-dark-gold/90 text-white"
                  disabled={isAddingToCart || processSwitching || !estimatedPrice}
                >
                  {isAddingToCart ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Adding to Cart...
                    </>
                  ) : (
                    <>
                      <ShoppingCart className="mr-2 h-4 w-4" />
                      Add to Cart
                    </>
                  )}
                </Button>

                <Button
                  type="button"
                  onClick={handleSubmitForReview}
                  variant="outline"
                  className="w-full border-brand-dark-gold text-brand-dark-gold hover:bg-brand-light-gold/10"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Submitting...
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" />
                      Submit for Review
                    </>
                  )}
                </Button>
              </div>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}
