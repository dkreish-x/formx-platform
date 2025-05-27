"use client"

import { useState, useCallback } from "react"
import { useDropzone } from "react-dropzone"
import { FileUp, X, CheckCircle, AlertCircle, Info, FileText } from "lucide-react"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"

interface FileUploaderProps {
  onFileChange: (file: File | null) => void
}

export function FileUploader({ onFileChange }: FileUploaderProps) {
  const [file, setFile] = useState<File | null>(null)
  const [uploadStatus, setUploadStatus] = useState<"idle" | "uploading" | "success" | "error">("idle")
  const [uploadProgress, setUploadProgress] = useState(0)

  const onDrop = useCallback(
    (acceptedFiles: File[]) => {
      if (acceptedFiles.length > 0) {
        const selectedFile = acceptedFiles[0]
        setFile(selectedFile)
        onFileChange(selectedFile)

        // Store file metadata in localStorage
        const fileMetadata = {
          name: selectedFile.name,
          size: selectedFile.size,
          type: selectedFile.type || getFileTypeFromExtension(selectedFile.name),
          lastModified: selectedFile.lastModified,
        }
        localStorage.setItem("uploadedFileMetadata", JSON.stringify(fileMetadata))
        localStorage.setItem("hasUploadedFile", "true")

        // Simulate upload progress
        setUploadStatus("uploading")
        setUploadProgress(0)

        const interval = setInterval(() => {
          setUploadProgress((prev) => {
            if (prev >= 100) {
              clearInterval(interval)
              setUploadStatus("success")
              return 100
            }
            return prev + 5
          })
        }, 100)
      }
    },
    [onFileChange],
  )

  // Helper function to determine file type from extension
  const getFileTypeFromExtension = (filename: string) => {
    const ext = filename.split(".").pop()?.toLowerCase()

    if (!ext) return "application/octet-stream"

    switch (ext) {
      case "step":
      case "stp":
        return "model/step"
      case "stl":
        return "model/stl"
      case "dxf":
        return "application/dxf"
      case "iges":
      case "igs":
        return "model/iges"
      default:
        return "application/octet-stream"
    }
  }

  const removeFile = () => {
    setFile(null)
    setUploadStatus("idle")
    setUploadProgress(0)
    onFileChange(null)
    localStorage.removeItem("uploadedFileMetadata")
    localStorage.removeItem("hasUploadedFile")
  }

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "model/stl": [".stl"],
      "model/step": [".step", ".stp"],
      "model/iges": [".iges", ".igs"],
      "application/dxf": [".dxf"],
      "application/octet-stream": [".stl", ".step", ".stp", ".dxf", ".iges", ".igs"],
    },
    maxFiles: 1,
    maxSize: 50 * 1024 * 1024, // 50MB
  })

  // Get file icon based on extension
  const getFileIcon = () => {
    if (!file) return <FileUp className="h-6 w-6 text-brand-dark-gold" />

    const ext = file.name.split(".").pop()?.toLowerCase()

    switch (ext) {
      case "step":
      case "stp":
        return <FileText className="h-6 w-6 text-blue-500" />
      case "stl":
        return <FileText className="h-6 w-6 text-green-500" />
      case "dxf":
        return <FileText className="h-6 w-6 text-purple-500" />
      case "iges":
      case "igs":
        return <FileText className="h-6 w-6 text-orange-500" />
      default:
        return <FileText className="h-6 w-6 text-gray-500" />
    }
  }

  return (
    <div className="space-y-4">
      <AnimatePresence mode="wait">
        {!file ? (
          <motion.div
            key="dropzone"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <div
              {...getRootProps()}
              className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-all ${
                isDragActive
                  ? "border-brand-dark-gold bg-brand-light-gold/10"
                  : "border-gray-300 hover:border-brand-dark-gold/50 hover:bg-gray-50"
              }`}
            >
              <input {...getInputProps()} />
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gray-100 flex items-center justify-center">
                <FileUp className={`h-8 w-8 ${isDragActive ? "text-brand-dark-gold" : "text-gray-400"}`} />
              </div>
              <h3 className="text-lg font-medium mb-2 text-gray-900">
                {isDragActive ? "Drop your file here" : "Drag & drop your file here"}
              </h3>
              <p className="text-sm text-gray-500 mb-4">Or click to browse your files</p>
              <div className="inline-flex items-center px-4 py-2 rounded-full bg-gray-100 text-xs text-gray-600">
                Supported formats: STEP, STL, IGES, DXF (max 50MB)
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div
            key="filePreview"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.3 }}
          >
            <div className="border rounded-lg p-5 bg-white">
              <div className="flex items-center">
                <div className="mr-4 flex-shrink-0 w-12 h-12 rounded-full bg-gray-50 flex items-center justify-center">
                  {uploadStatus === "success" ? (
                    <CheckCircle className="h-6 w-6 text-green-500" />
                  ) : uploadStatus === "error" ? (
                    <AlertCircle className="h-6 w-6 text-red-500" />
                  ) : (
                    getFileIcon()
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-base font-medium truncate text-gray-900">{file.name}</p>
                  <div className="flex items-center text-xs text-gray-500">
                    <span>{(file.size / 1024 / 1024).toFixed(2)} MB</span>
                    <span className="mx-2">•</span>
                    <span className="uppercase">{file.name.split(".").pop()}</span>
                  </div>
                  {uploadStatus === "uploading" && (
                    <div className="w-full mt-2">
                      <div className="h-1 w-full bg-gray-100 rounded-full overflow-hidden">
                        <motion.div
                          className="h-full bg-brand-dark-gold"
                          initial={{ width: 0 }}
                          animate={{ width: `${uploadProgress}%` }}
                          transition={{ duration: 0.5 }}
                        />
                      </div>
                      <p className="text-xs text-right mt-1 text-gray-500">{uploadProgress}%</p>
                    </div>
                  )}
                </div>
                <Button
                  variant="ghost"
                  size="icon"
                  className="ml-2 text-gray-400 hover:text-gray-600 hover:bg-gray-100"
                  onClick={removeFile}
                >
                  <X className="h-4 w-4" />
                  <span className="sr-only">Remove file</span>
                </Button>
              </div>

              {file.name.toLowerCase().endsWith(".step") || file.name.toLowerCase().endsWith(".stp") ? (
                <div className="mt-4 p-4 bg-blue-50 rounded-md flex items-start">
                  <Info className="h-5 w-5 text-blue-500 mr-3 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-blue-700 mb-1">STEP File Detected</p>
                    <p className="text-xs text-blue-600">
                      STEP files require specialized processing for web viewing. In a production environment, we would
                      convert this to a web-friendly format for the 3D viewer.
                    </p>
                  </div>
                </div>
              ) : null}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

export default FileUploader
