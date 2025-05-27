"use client"

import { useState, useEffect } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { Checkbox } from "@/components/ui/checkbox"
import { Textarea } from "@/components/ui/textarea"
import { Info } from "lucide-react"
import {
  manufacturingProcesses,
  getProcessById,
  getCompatibleFinishes,
  type ProcessOption,
} from "@/lib/manufacturing-processes"

// Create a dynamic form schema based on the selected process
const createFormSchema = (process: ProcessOption | undefined) => {
  const baseSchema = {
    process: z.string(),
    material: z.string(),
    finish: z.string(),
    specialInstructions: z.string().optional(),
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
  part: any
  onPartChange: (part: any) => void
}

export default function PartConfigurationForm({ part, onPartChange }: PartConfigurationFormProps) {
  const [selectedProcess, setSelectedProcess] = useState<ProcessOption | undefined>(getProcessById(part.process))
  const [selectedMaterial, setSelectedMaterial] = useState<string>(part.material || "")
  const [compatibleFinishes, setCompatibleFinishes] = useState<any[]>([])

  // Create a dynamic form schema based on the selected process
  const formSchema = createFormSchema(selectedProcess)

  // Set up the form with default values
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      process: part.process || "",
      material: part.material || "",
      finish: part.finish || "",
      specialInstructions: "",
      ...part.additionalOptions,
    },
  })

  // Watch for changes to the process and material fields
  const watchedProcess = form.watch("process")
  const watchedMaterial = form.watch("material")

  // Update the selected process when the process field changes
  useEffect(() => {
    if (watchedProcess) {
      const newProcess = getProcessById(watchedProcess)
      const oldProcess = selectedProcess

      // Only proceed if the process has actually changed
      if (newProcess?.id !== oldProcess?.id) {
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
          }, 0)
        }
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

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    // Collect additional options
    const additionalOptions: Record<string, any> = {}

    if (selectedProcess?.additionalFields) {
      selectedProcess.additionalFields.forEach((field) => {
        if (values[field.id as keyof typeof values] !== undefined) {
          additionalOptions[field.id] = values[field.id as keyof typeof values]
        }
      })
    }

    onPartChange({
      ...part,
      ...values,
      additionalOptions,
    })
  }

  // Safely render additional fields
  const renderAdditionalField = (additionalField: any) => {
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
              <Select onValueChange={field.onChange} value={field.value || additionalField.default?.toString() || ""}>
                <FormControl>
                  <SelectTrigger className="bg-white">
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
                  className="bg-white"
                  {...field}
                  value={field.value || additionalField.default?.toString() || ""}
                />
              </FormControl>
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
            <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
              <FormControl>
                <Checkbox checked={field.value} onCheckedChange={field.onChange} />
              </FormControl>
              <div className="space-y-1 leading-none">
                <FormLabel className="text-gray-700">{additionalField.name}</FormLabel>
              </div>
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
                  className="bg-white"
                  {...field}
                  value={field.value || additionalField.default?.toString() || ""}
                />
              </FormControl>
            </FormItem>
          )}
        />
      )
    }
  }

  return (
    <Form {...form}>
      <form onChange={form.handleSubmit(onSubmit)} className="space-y-5">
        <FormField
          control={form.control}
          name="process"
          render={({ field }) => (
            <FormItem>
              <FormLabel className="text-gray-700">Process</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger className="bg-white">
                    <SelectValue placeholder="Select a process" />
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
            </FormItem>
          )}
        />

        {selectedProcess && (
          <>
            <FormField
              control={form.control}
              name="material"
              render={({ field }) => (
                <FormItem>
                  <div className="flex items-center justify-between">
                    <FormLabel className="text-gray-700">Material</FormLabel>
                    <a href="#" className="text-xs text-blue-600 hover:underline">
                      Learn about our materials
                    </a>
                  </div>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger className="bg-white">
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
                        <SelectTrigger className="bg-white">
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
                  </FormItem>
                )}
              />
            )}

            {/* Render additional fields based on the selected process */}
            {selectedProcess.additionalFields?.map(renderAdditionalField)}
          </>
        )}

        <FormField
          control={form.control}
          name="specialInstructions"
          render={({ field }) => (
            <FormItem>
              <div className="flex items-center space-x-2">
                <FormLabel className="text-gray-700">Special Instructions</FormLabel>
                <Info className="h-4 w-4 text-gray-400" />
              </div>
              <FormControl>
                <Textarea placeholder="Add a note or drawing" className="resize-none bg-white" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  )
}
