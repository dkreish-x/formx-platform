"use client"

import { useState } from "react"
import Link from "next/link"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Pencil, Trash2 } from "lucide-react"
import type { CartItem } from "@/types/cart"
import { toast } from "@/components/ui/use-toast"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"

interface CartItemsListProps {
  items: CartItem[]
}

export default function CartItemsList({ items }: CartItemsListProps) {
  const [cartItems, setCartItems] = useState<CartItem[]>(items)
  const [itemToDelete, setItemToDelete] = useState<string | null>(null)

  const handleRemoveItem = (itemId: string) => {
    setItemToDelete(itemId)
  }

  const confirmRemoveItem = () => {
    if (!itemToDelete) return

    // In a real app, this would call an API to remove the item
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== itemToDelete))

    toast({
      title: "Item removed",
      description: "The part has been removed from your quote.",
    })

    setItemToDelete(null)
  }

  const cancelRemoveItem = () => {
    setItemToDelete(null)
  }

  const getMaterialName = (materialId: string): string => {
    // This would be more comprehensive in a real app
    const materialMap: Record<string, string> = {
      aluminum: "Aluminum",
      steel: "Steel",
      stainless_steel: "Stainless Steel",
      brass: "Brass",
      copper: "Copper",
      titanium: "Titanium",
      plastic: "Plastic",
      mild_steel: "Mild Steel",
      acrylic: "Acrylic",
      wood: "Wood",
      pla: "PLA",
      abs: "ABS",
      petg: "PETG",
      nylon: "Nylon",
      tpu: "TPU",
      resin: "Resin",
      polypropylene: "Polypropylene",
      polyethylene: "Polyethylene",
      polycarbonate: "Polycarbonate",
      acetal: "Acetal",
    }

    return materialMap[materialId] || materialId
  }

  const getFinishName = (finishId: string): string => {
    // This would be more comprehensive in a real app
    const finishMap: Record<string, string> = {
      as_machined: "As Machined",
      bead_blasted: "Bead Blasted",
      anodized: "Anodized",
      powder_coated: "Powder Coated",
      polished: "Polished",
      as_cut: "As Cut",
      deburred: "Deburred",
      painted: "Painted",
      as_printed: "As Printed",
      sanded: "Sanded",
      dyed: "Dyed",
      as_molded: "As Molded",
      textured: "Textured",
      chrome_plated: "Chrome Plated",
    }

    return finishMap[finishId] || finishId
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold text-brand-dark-grey">Parts ({cartItems.length})</h2>
        <Button asChild variant="outline" className="text-brand-dark-gold border-brand-dark-gold">
          <Link href="/upload">Add Another Part</Link>
        </Button>
      </div>

      {cartItems.map((item) => (
        <Card key={item.id} className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="md:col-span-3">
              <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-6">
                <div className="w-16 h-16 bg-gray-100 rounded flex items-center justify-center flex-shrink-0">
                  {item.process === "CNC" && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-brand-dark-gold"
                    >
                      <path d="M3 3v18h18" />
                      <path d="M7 13h3a3 3 0 0 0 0-6H7v9" />
                      <path d="M17 13h3a3 3 0 0 0 0-6h-3v9" />
                    </svg>
                  )}
                  {item.process === "Laser Cutting" && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-brand-dark-gold"
                    >
                      <path d="M12 2v8" />
                      <path d="m4.93 10.93 1.41 1.41" />
                      <path d="M2 18h2" />
                      <path d="M20 18h2" />
                      <path d="m19.07 10.93-1.41 1.41" />
                      <path d="M22 22H2" />
                      <path d="m16 6-4 4-4-4" />
                      <path d="M16 18a4 4 0 0 0-8 0" />
                    </svg>
                  )}
                  {item.process === "3D Printing" && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-brand-dark-gold"
                    >
                      <path d="M6 17v1a1 1 0 0 0 1 1h10a1 1 0 0 0 1-1v-1" />
                      <path d="M5 17H3v-4.5a.5.5 0 0 1 .5-.5H5" />
                      <path d="M19 17h2v-4.5a.5.5 0 0 0-.5-.5H19" />
                      <path d="M6.5 17v-10a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 .5.5v10" />
                      <path d="M8 6.5V6a1 1 0 0 1 1-1h6a1 1 0 0 1 1 1v.5" />
                      <rect width="8" height="3" x="8" y="14" rx=".5" />
                      <path d="M8.5 11.5h7" />
                      <path d="M8.5 9h7" />
                    </svg>
                  )}
                  {item.process === "Injection Molding" && (
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-brand-dark-gold"
                    >
                      <path d="M7 21h10" />
                      <path d="M12 21v-6" />
                      <path d="M8 13v-2.5a1.5 1.5 0 0 1 3 0V13" />
                      <path d="M13 13v-2.5a1.5 1.5 0 0 1 3 0V13" />
                      <path d="M18 3H6l-4 9h20Z" />
                    </svg>
                  )}
                </div>
                <div className="flex-grow">
                  <h3 className="text-lg font-medium text-brand-dark-grey">{item.partName}</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-1 mt-2 text-sm">
                    <div className="flex justify-between md:justify-start">
                      <span className="text-brand-light-grey mr-2">Process:</span>
                      <span className="text-brand-dark-grey">{item.process}</span>
                    </div>
                    <div className="flex justify-between md:justify-start">
                      <span className="text-brand-light-grey mr-2">Material:</span>
                      <span className="text-brand-dark-grey">{getMaterialName(item.material)}</span>
                    </div>
                    <div className="flex justify-between md:justify-start">
                      <span className="text-brand-light-grey mr-2">Finish:</span>
                      <span className="text-brand-dark-grey">{getFinishName(item.finish)}</span>
                    </div>
                    <div className="flex justify-between md:justify-start">
                      <span className="text-brand-light-grey mr-2">Quantity:</span>
                      <span className="text-brand-dark-grey">{item.quantity}</span>
                    </div>
                    <div className="flex justify-between md:justify-start">
                      <span className="text-brand-light-grey mr-2">Tolerance:</span>
                      <span className="text-brand-dark-grey">{item.tolerance}</span>
                    </div>
                    <div className="flex justify-between md:justify-start">
                      <span className="text-brand-light-grey mr-2">Lead Time:</span>
                      <span className="text-brand-dark-grey">{item.leadTime}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="md:col-span-1 flex flex-col justify-between">
              <div className="text-right">
                <div className="text-xl font-bold text-brand-dark-grey">${item.price.toFixed(2)}</div>
                <div className="text-sm text-brand-light-grey">Est. Price</div>
              </div>
              <div className="flex justify-end gap-2 mt-4">
                <Button variant="outline" size="sm" className="text-brand-dark-grey border-brand-light-grey" asChild>
                  <Link href={`/configure/${item.id}`}>
                    <Pencil className="h-4 w-4 mr-1" />
                    Edit
                  </Link>
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-red-600 border-red-200 hover:bg-red-50"
                  onClick={() => handleRemoveItem(item.id)}
                >
                  <Trash2 className="h-4 w-4 mr-1" />
                  Remove
                </Button>
              </div>
            </div>
          </div>
        </Card>
      ))}

      <AlertDialog open={!!itemToDelete} onOpenChange={(open) => !open && setItemToDelete(null)}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Remove part from quote?</AlertDialogTitle>
            <AlertDialogDescription>
              This will remove the part from your current quote. This action cannot be undone.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={cancelRemoveItem}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={confirmRemoveItem} className="bg-red-600 hover:bg-red-700 text-white">
              Remove
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  )
}
