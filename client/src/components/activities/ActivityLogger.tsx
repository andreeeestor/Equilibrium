import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "../ui/dialog";
import { Label } from "../ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

const activityTypes = [
  { id: "meditation", name: "Meditação" },
  { id: "exercise", name: "Exercício" },
  { id: "walking", name: "Caminhada" },
  { id: "reading", name: "Ler" },
  { id: "journaling", name: "Escrever" },
  { id: "therapy", name: "Sessão de Terapia" },
];

interface ActivityLoggerProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onActivityLogged: () => void;
}

export function ActivityLogger({
  open,
  onOpenChange,
  onActivityLogged,
}: ActivityLoggerProps) {
  const [type, setType] = useState("");
  const [name, setName] = useState("");
  const [duration, setDuration] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    setTimeout(() => {
      setType("");
      setName("");
      setDuration("");
      setDescription("");

      onOpenChange(false);
    }, 1000);
  };
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Registro das Atividades</DialogTitle>
          <DialogDescription>
            Grave sua atividade de bem-estar
          </DialogDescription>
        </DialogHeader>
        <form action="" onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label>Tipo da Atividade</Label>
            <Select value={type} onValueChange={setType}>
              <SelectTrigger>
                <SelectValue placeholder="Selecionar o tipo da atividade" />
              </SelectTrigger>
              <SelectContent>
                {activityTypes.map((type) => (
                  <SelectItem key={type.id} value={type.id}>
                    {type.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label>Nome</Label>
            <Input
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Meditação pela manhã, Caminhada pela tarde, etc."
            />
          </div>
          <div className="space-y-2">
            <Label>Duração (minutos)</Label>
            <Input
              type="number"
              value={duration}
              onChange={(e) => setDuration(e.target.value)}
              placeholder="15"
            />
          </div>
          <div className="space-y-2">
            <Label>Descrição (opcional)</Label>
            <Input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Como foi?"
            />
            <div className="flex justify-end gap-2">
              <Button type="button" variant={"ghost"}>
                Cancelar
              </Button>
              <Button type="submit" disabled>
                Salvar Atividade
              </Button>
            </div>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
}
