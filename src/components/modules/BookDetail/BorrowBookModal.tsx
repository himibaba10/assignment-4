import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useForm } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { useBorrowBookMutation } from "@/redux/api/baseApi";
import { useEffect } from "react";
import { toast } from "sonner";
import { useNavigate } from "react-router";
import { Toaster } from "@/components/ui/sonner";

type BorrowBookModalProps = { bookId: string; availableCopies: number };

const BorrowBookModal = ({ bookId, availableCopies }: BorrowBookModalProps) => {
  const [borrowBook, { isSuccess, isError, error }] = useBorrowBookMutation();
  const navigate = useNavigate();
  const form = useForm({
    defaultValues: {
      quantity: 0,
      dueDate: new Date().toISOString(),
    },
  });

  useEffect(() => {
    if (isSuccess) {
      toast.success("Book is borrowed successfully!", {
        position: "top-center",
      });

      setTimeout(() => {
        navigate("/borrow-summary");
      }, 1000);
    }
  }, [isSuccess, navigate, isError, error]);

  const onSubmit = (data: { quantity: number; dueDate: string }) => {
    borrowBook({
      ...data,
      book: bookId,
      dueDate: new Date(data.dueDate).toISOString(),
    });
    // form.reset();
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="text-lg cursor-pointer" disabled={!availableCopies}>
          Borrow Book
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Fill in the form below to borrow the book</DialogTitle>
          <DialogDescription>
            Make sure to enter quantity greater than zero.
          </DialogDescription>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
              <FormField
                control={form.control}
                name="quantity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Quantity</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Enter Quantity"
                        {...field}
                        required
                        min={1}
                      />
                    </FormControl>
                    {isError && (
                      <FormMessage className="!text-xs">
                        {(error as { data: { message: string } }).data?.message}
                      </FormMessage>
                    )}
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="dueDate"
                render={({ field }) => {
                  const today = new Date().toISOString().split("T")[0];

                  return (
                    <FormItem>
                      <FormLabel>Due Date</FormLabel>
                      <FormControl>
                        <Input
                          type="date"
                          placeholder="Due Date"
                          {...field}
                          required
                          min={today}
                        />
                      </FormControl>
                    </FormItem>
                  );
                }}
              />
              <div className="text-right">
                <Button type="submit" className="mt-9">
                  Borrow Book
                </Button>
              </div>
            </form>
          </Form>
        </DialogHeader>
      </DialogContent>
      <Toaster />
    </Dialog>
  );
};

export default BorrowBookModal;
