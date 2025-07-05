import type { TBook } from "@/components/modules/Home/BookCardContainer";
import { Button } from "@/components/ui/button";
import { Toaster } from "@/components/ui/sonner";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Spinner from "@/components/ui/Spinner";
import { useGetBookQuery, useUpdateBookMutation } from "@/redux/api/baseApi";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router";
import { toast } from "sonner";

const EditBook = () => {
  const navigate = useNavigate();
  const { bookId } = useParams();
  const { data, isLoading } = useGetBookQuery(bookId);
  const [updateBook, { isSuccess, error }] = useUpdateBookMutation();
  const [isbnError, setIsbnError] = useState("");
  const bookData: TBook = data?.data;

  const form = useForm({
    defaultValues: {
      title: "",
      author: "",
      isbn: "",
      description: "",
      genre: "",
      copies: 0,
    },
  });

  useEffect(() => {
    if (!isLoading && bookData) {
      form.reset({
        title: bookData.title,
        author: bookData.author,
        genre: bookData.genre?.toUpperCase() || "", // ✅ ensure it's always a string
        isbn: bookData.isbn,
        description: bookData.description,
        copies: bookData.copies,
      });
    }
  }, [bookData, isLoading, form]);

  useEffect(() => {
    if (error) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const errorMsg: string = (error as any).data?.message;
      if (errorMsg.includes("isbn_1")) {
        setIsbnError("This isbn already exists. Enter another.");
      }
    }

    if (isSuccess) {
      toast.success("Book is updated successfully!", {
        position: "top-center",
      });

      setTimeout(() => {
        navigate("/");
      }, 1000);
    }
  }, [isSuccess, navigate, error]);

  const onSubmit = (data: Partial<TBook>) => {
    updateBook({ _id: bookId, ...data });
  };

  if (isLoading) return <Spinner />;

  return (
    <section className="section my-10 md:my-20">
      <h2 className="text-3xl sm:text-5xl text-center mb-5">Edit the Book</h2>
      <div className="bg-white p-4 sm:p-10 shadow rounded-md max-w-3xl mx-auto">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <div className="grid gap-4 sm:gap-7 grid-cols-1 sm:grid-cols-2">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Book Name" {...field} required />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="author"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Author</FormLabel>
                    <FormControl>
                      <Input placeholder="Author name" {...field} required />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="genre"
                rules={{ required: "Genre is required" }}
                render={({ field }) => {
                  return (
                    <FormItem className="relative">
                      <FormLabel>Genre</FormLabel>
                      <FormControl>
                        <Select
                          value={field.value}
                          onValueChange={field.onChange}
                        >
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select a genre" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectLabel>Genres</SelectLabel>
                              <SelectItem value="FICTION">FICTION</SelectItem>
                              <SelectItem value="NON_FICTION">
                                NON FICTION
                              </SelectItem>
                              <SelectItem value="SCIENCE">SCIENCE</SelectItem>
                              <SelectItem value="HISTORY">HISTORY</SelectItem>
                              <SelectItem value="BIOGRAPHY">
                                BIOGRAPHY
                              </SelectItem>
                              <SelectItem value="FANTASY">FANTASY</SelectItem>
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      </FormControl>
                      <FormMessage className="absolute -bottom-[22px] !text-xs" />
                    </FormItem>
                  );
                }}
              />
              <FormField
                control={form.control}
                name="isbn"
                render={({ field }) => (
                  <FormItem className="relative">
                    <FormLabel>ISBN</FormLabel>
                    <FormControl>
                      <Input placeholder="isbn" {...field} required />
                    </FormControl>
                    {isbnError && (
                      <FormMessage className="absolute -bottom-[22px] !text-xs">
                        {isbnError}
                      </FormMessage>
                    )}
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Book Description"
                        {...field}
                        required
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="copies"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Copies</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        min={1}
                        placeholder="Book Copies"
                        {...field}
                        required
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
            <div className="text-right">
              <Button type="submit" className="mt-9">
                Save Changes
              </Button>
            </div>
          </form>
        </Form>
      </div>
      <Toaster />
    </section>
  );
};

export default EditBook;
