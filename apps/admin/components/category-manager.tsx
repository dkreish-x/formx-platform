"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Plus, X, AlertTriangle } from "lucide-react"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface CategoryManagerProps {
  isOpen: boolean
  onClose: () => void
  categories: string[]
  onCategoriesUpdate: (categories: string[]) => void
  title: string
  description: string
}

export function CategoryManager({
  isOpen,
  onClose,
  categories,
  onCategoriesUpdate,
  title,
  description,
}: CategoryManagerProps) {
  const [newCategory, setNewCategory] = useState("")
  const [localCategories, setLocalCategories] = useState<string[]>(categories)

  const handleAddCategory = () => {
    if (newCategory.trim() && !localCategories.includes(newCategory.trim())) {
      setLocalCategories([...localCategories, newCategory.trim()])
      setNewCategory("")
    }
  }

  const handleRemoveCategory = (categoryToRemove: string) => {
    setLocalCategories(localCategories.filter((cat) => cat !== categoryToRemove))
  }

  const handleSave = () => {
    onCategoriesUpdate(localCategories)
    onClose()
  }

  const handleCancel = () => {
    setLocalCategories(categories) // Reset to original
    setNewCategory("")
    onClose()
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      e.preventDefault()
      handleAddCategory()
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={handleCancel}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="newCategory">Add New Category</Label>
            <div className="flex gap-2">
              <Input
                id="newCategory"
                value={newCategory}
                onChange={(e) => setNewCategory(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Enter category name..."
                className="border-[#908d8d] focus:border-[#d4c273] focus:ring-[#d4c273]"
              />
              <Button
                onClick={handleAddCategory}
                disabled={!newCategory.trim()}
                className="bg-[#d4c273] hover:bg-[#d4c273]/90 text-[#fefefe]"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="space-y-2">
            <Label>Current Categories</Label>
            <div className="flex flex-wrap gap-2 min-h-[60px] p-3 border rounded-md bg-muted/20">
              {localCategories.length === 0 ? (
                <span className="text-muted-foreground text-sm">No categories defined</span>
              ) : (
                localCategories.map((category) => (
                  <Badge key={category} variant="secondary" className="flex items-center gap-1">
                    {category}
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-auto p-0 ml-1 hover:bg-transparent"
                      onClick={() => handleRemoveCategory(category)}
                    >
                      <X className="h-3 w-3" />
                    </Button>
                  </Badge>
                ))
              )}
            </div>
          </div>

          {localCategories.length < categories.length && (
            <Alert>
              <AlertTriangle className="h-4 w-4" />
              <AlertDescription>
                Removing categories will reassign processes using those categories to the first available category.
              </AlertDescription>
            </Alert>
          )}
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={handleCancel}>
            Cancel
          </Button>
          <Button onClick={handleSave} className="bg-[#d4c273] hover:bg-[#d4c273]/90 text-[#fefefe]">
            Save Categories
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
