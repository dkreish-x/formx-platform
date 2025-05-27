import type { Metadata } from "next"
import MaterialsClientPage from "./MaterialsClientPage"

export const metadata: Metadata = {
  title: "Materials Library | FormX Manufacturing",
  description: "Explore our extensive collection of high-performance materials for all manufacturing processes.",
}

export default function MaterialsPage() {
  return <MaterialsClientPage />
}
