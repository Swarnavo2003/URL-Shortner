import { FileQuestion, MessageSquareText, PlusCircle } from "lucide-react";
import { Button } from "../ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import type React from "react";
import { useState } from "react";
import { useCreateLink } from "@/hooks/useCreateLink";

const CreateLink = () => {
  const [open, setOpen] = useState(false);
  const [destination, setDestination] = useState("");
  const [description, setDescription] = useState("");

  const createLinkMutation = useCreateLink();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      await createLinkMutation.mutateAsync({
        url: destination,
        description: description || undefined,
      });

      setDestination("");
      setDescription("");
      setOpen(false);
    } catch (error) {
      console.error("Error creating link:", error);
    }
  };
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button>
          <PlusCircle className="w-4 h-4 mr-1" />
          Create Link
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>New Link</DialogTitle>
          <DialogDescription>
            Create a new short link by providing the destination URL and an
            optional description.
          </DialogDescription>
          <DialogDescription className="text-sm text-gray-500"></DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="space-y-2">
            <Label htmlFor="destination">
              Destination URL
              <FileQuestion className="w-4 h-4" />
            </Label>
            <Input
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              id="destination"
              placeholder="https://example.com"
            />
          </div>
          <div className="space-y-2 mt-4">
            <Label htmlFor="description">
              Description
              <MessageSquareText className="w-4 h-4" />
            </Label>
            <Input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              id="description"
              placeholder="A brief description of the link"
            />
          </div>
          <DialogFooter className="mt-4">
            <Button type="submit">
              <PlusCircle className="w-4 h-4 mr-1" /> Create Link
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateLink;
