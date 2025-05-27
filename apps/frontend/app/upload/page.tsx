import type { Metadata } from "next"
import PartUploadForm from "@/components/part-upload-form"

export const metadata: Metadata = {
  title: "Upload Part | Form(X)",
  description: "Upload your part files for instant quoting and manufacturing",
}

export default function UploadPage() {
  return (
    <main className="container py-12">
      <div className="flex flex-col items-center justify-center space-y-4 text-center mb-8">
        <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl text-brand-dark-grey">
          Upload Your Part
        </h1>
        <p className="max-w-[700px] text-brand-light-grey md:text-xl/relaxed">
          Upload your design files to get an instant quote for manufacturing
        </p>
      </div>

      <div className="max-w-3xl mx-auto">
        <PartUploadForm />
      </div>
    </main>
  )
}
