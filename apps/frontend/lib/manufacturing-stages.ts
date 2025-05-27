import type React from "react"
import {
  FileCheck,
  Microscope,
  Package,
  Truck,
  CheckCircle,
  Hammer,
  Cog,
  Clipboard,
  ShoppingCart,
  Box,
  Home,
} from "lucide-react"
import type { PartStatus, StageDetail, ManufacturingStage } from "@/components/orders/order-status-tracker"

// Helper function to create a stage detail
function createStageDetail(
  stage: ManufacturingStage,
  name: string,
  description: string,
  icon: React.ReactNode,
  status: "completed" | "in_progress" | "pending" | "issue" = "pending",
  timestamp?: string,
  estimatedCompletion?: string,
  notes?: string,
): StageDetail {
  return {
    stage,
    name,
    description,
    icon,
    status,
    timestamp,
    estimatedCompletion,
    notes,
  }
}

// Generate mock part status for demo purposes
export function generateMockPartStatus(partId: string, partName: string, currentStage: ManufacturingStage): PartStatus {
  const stages: StageDetail[] = [
    createStageDetail(
      "order_received",
      "Order Received",
      "Order has been received and is being processed.",
      <FileCheck className="h-4 w-4" />,
      "completed",
      "May 5, 2023 at 10:30 AM",
    ),
    createStageDetail(
      "engineering_review",
      "Engineering Review",
      "Engineers are reviewing your design for manufacturability.",
      <Microscope className="h-4 w-4" />,
      currentStage === "engineering_review"
        ? "in_progress"
        : currentStage === "order_received"
          ? "pending"
          : "completed",
      currentStage === "engineering_review" ? undefined : "May 6, 2023 at 2:15 PM",
      "May 8, 2023 at 5:00 PM",
      currentStage === "engineering_review" ? "Checking tolerances and material specifications." : undefined,
    ),
    createStageDetail(
      "material_procurement",
      "Material Procurement",
      "Sourcing and preparing materials for production.",
      <ShoppingCart className="h-4 w-4" />,
      currentStage === "material_procurement"
        ? "in_progress"
        : ["order_received", "engineering_review"].includes(currentStage)
          ? "pending"
          : "completed",
      currentStage === "material_procurement"
        ? undefined
        : ["order_received", "engineering_review"].includes(currentStage)
          ? undefined
          : "May 8, 2023 at 9:30 AM",
      "May 10, 2023 at 12:00 PM",
    ),
    createStageDetail(
      "production_queued",
      "Production Queued",
      "Your order is in the production queue.",
      <Clipboard className="h-4 w-4" />,
      currentStage === "production_queued"
        ? "in_progress"
        : ["order_received", "engineering_review", "material_procurement"].includes(currentStage)
          ? "pending"
          : "completed",
      currentStage === "production_queued"
        ? undefined
        : ["order_received", "engineering_review", "material_procurement"].includes(currentStage)
          ? undefined
          : "May 10, 2023 at 3:45 PM",
    ),
    createStageDetail(
      "production_in_progress",
      "Production In Progress",
      "Your parts are being manufactured.",
      <Cog className="h-4 w-4" />,
      currentStage === "production_in_progress"
        ? "in_progress"
        : ["order_received", "engineering_review", "material_procurement", "production_queued"].includes(currentStage)
          ? "pending"
          : "completed",
      currentStage === "production_in_progress"
        ? undefined
        : ["order_received", "engineering_review", "material_procurement", "production_queued"].includes(currentStage)
          ? undefined
          : "May 12, 2023 at 8:15 AM",
      "May 14, 2023 at 5:00 PM",
    ),
    createStageDetail(
      "quality_inspection",
      "Quality Inspection",
      "Your parts are being inspected for quality assurance.",
      <CheckCircle className="h-4 w-4" />,
      currentStage === "quality_inspection"
        ? "in_progress"
        : [
              "order_received",
              "engineering_review",
              "material_procurement",
              "production_queued",
              "production_in_progress",
            ].includes(currentStage)
          ? "pending"
          : "completed",
    ),
    createStageDetail(
      "finishing",
      "Finishing",
      "Applying final finishes and treatments.",
      <Hammer className="h-4 w-4" />,
      currentStage === "finishing"
        ? "in_progress"
        : [
              "order_received",
              "engineering_review",
              "material_procurement",
              "production_queued",
              "production_in_progress",
              "quality_inspection",
            ].includes(currentStage)
          ? "pending"
          : "completed",
    ),
    createStageDetail(
      "packaging",
      "Packaging",
      "Your parts are being packaged for shipping.",
      <Box className="h-4 w-4" />,
      currentStage === "packaging"
        ? "in_progress"
        : [
              "order_received",
              "engineering_review",
              "material_procurement",
              "production_queued",
              "production_in_progress",
              "quality_inspection",
              "finishing",
            ].includes(currentStage)
          ? "pending"
          : "completed",
    ),
    createStageDetail(
      "shipping_preparation",
      "Shipping Preparation",
      "Preparing your order for shipment.",
      <Package className="h-4 w-4" />,
      currentStage === "shipping_preparation"
        ? "in_progress"
        : [
              "order_received",
              "engineering_review",
              "material_procurement",
              "production_queued",
              "production_in_progress",
              "quality_inspection",
              "finishing",
              "packaging",
            ].includes(currentStage)
          ? "pending"
          : "completed",
    ),
    createStageDetail(
      "shipped",
      "Shipped",
      "Your order has been shipped.",
      <Truck className="h-4 w-4" />,
      currentStage === "shipped"
        ? "in_progress"
        : [
              "order_received",
              "engineering_review",
              "material_procurement",
              "production_queued",
              "production_in_progress",
              "quality_inspection",
              "finishing",
              "packaging",
              "shipping_preparation",
            ].includes(currentStage)
          ? "pending"
          : "completed",
    ),
    createStageDetail(
      "delivered",
      "Delivered",
      "Your order has been delivered.",
      <Home className="h-4 w-4" />,
      currentStage === "delivered" ? "completed" : "pending",
    ),
  ]

  return {
    partId,
    partName,
    currentStage,
    stages,
  }
}
