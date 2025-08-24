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
        <Button className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 text-white">
          <PlusCircle className="w-4 h-4 mr-1" />
          Create Link
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700">
        <DialogHeader>
          <DialogTitle className="text-gray-900 dark:text-white">
            New Link
          </DialogTitle>
          <DialogDescription className="text-gray-600 dark:text-gray-300">
            Create a new short link by providing the destination URL and an
            optional description.
          </DialogDescription>
          <DialogDescription className="text-sm text-gray-500 dark:text-gray-400"></DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit}>
          <div className="space-y-2">
            <Label
              htmlFor="destination"
              className="text-gray-900 dark:text-gray-100 flex items-center gap-2"
            >
              Destination URL
              <FileQuestion className="w-4 h-4" />
            </Label>
            <Input
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              id="destination"
              placeholder="https://example.com"
              className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
            />
          </div>
          <div className="space-y-2 mt-4">
            <Label
              htmlFor="description"
              className="text-gray-900 dark:text-gray-100 flex items-center gap-2"
            >
              Description
              <MessageSquareText className="w-4 h-4" />
            </Label>
            <Input
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              id="description"
              placeholder="A brief description of the link"
              className="bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-600 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
            />
          </div>
          <DialogFooter className="mt-4">
            <Button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 text-white"
            >
              <PlusCircle className="w-4 h-4 mr-1" /> Create Link
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default CreateLink;
