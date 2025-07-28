import React from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface CategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (category: { name: string; description?: string }) => void;
  initialName?: string;
  initialDescription?: string;
}

const CategoryModal: React.FC<CategoryModalProps> = ({
  isOpen,
  onClose,
  onSave,
  initialName = "",
  initialDescription = "",
}) => {
  // State cho tên và mô tả danh mục
  const [name, setName] = React.useState(initialName);
  const [description, setDescription] = React.useState(initialDescription);

  React.useEffect(() => {
    setName(initialName);
    setDescription(initialDescription);
  }, [initialName, initialDescription, isOpen]);

  // Xử lý lưu danh mục
  const handleSave = () => {
    if (name.trim()) {
      onSave({ name, description });
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{initialName ? "Chỉnh sửa danh mục" : "Thêm danh mục"}</DialogTitle>
        </DialogHeader>
        <Input placeholder="Tên danh mục" value={name} onChange={(e) => setName(e.target.value)} />
        <Input
          placeholder="Mô tả (tuỳ chọn)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="mt-2"
        />
        <DialogFooter>
          <Button variant="outline" onClick={onClose}>
            Hủy
          </Button>
          <Button onClick={handleSave} disabled={!name.trim()}>
            {initialName ? "Lưu" : "Thêm"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default CategoryModal;
