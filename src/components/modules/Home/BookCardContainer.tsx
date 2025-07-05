import Spinner from "@/components/ui/Spinner";
import { useGetBooksQuery } from "@/redux/api/baseApi";
import BookCard from "../shared/BookCard";

export type TBook = {
  _id: string;
  title: string;
  author: string;
  genre: string;
  isbn: string;
  description?: string;
  copies: number;
  available?: boolean;
};

const BookCardContainer = () => {
  const { data, isLoading, error } = useGetBooksQuery(undefined);

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <section className="section my-10 md:my-20">
      {data ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
          {data.data.map((book: TBook) => (
            <BookCard key={book._id} book={book} />
          ))}
        </div>
      ) : (
        <p className="text-center text-lg">
          {(error as { error: string })!.error}
        </p>
      )}
    </section>
  );
};

export default BookCardContainer;
