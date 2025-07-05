import BorrowBookModal from "@/components/modules/BookDetail/BorrowBookModal";
import { Button } from "@/components/ui/button";
import Spinner from "@/components/ui/Spinner";
import { useDeleteBookMutation, useGetBookQuery } from "@/redux/api/baseApi";
import { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { toast } from "sonner";

const BookDetail = () => {
  const { bookId } = useParams();
  const { data, isLoading } = useGetBookQuery(bookId);
  const [deleteBook, { isSuccess, error }] = useDeleteBookMutation();
  const navigate = useNavigate();

  useEffect(() => {
    if (isSuccess) {
      toast.success("Book is deleted successfully!", {
        position: "top-center",
      });

      setTimeout(() => {
        navigate("/");
      }, 1000);
    }

    if (error) {
      console.log(error);
    }
  }, [isSuccess, navigate, error]);

  if (isLoading) {
    return <Spinner />;
  }

  const bookData = data.data;

  const handleDeleteBook = () => {
    deleteBook(bookId);
  };

  return (
    <div className="min-h-[75vh] section">
      <div className="max-w-2xl mx-auto p-5 sm:p-10 my-10 md:my-20 bg-white rounded shadow text-center">
        <h1 className="text-3xl sm:text-4xl font-bold mb-4">
          {bookData?.title}
        </h1>
        <p className="text-gray-700 mb-2">
          <span className="font-semibold">Author:</span> {bookData?.author}
        </p>
        <p className="text-gray-700 mb-2">
          <span className="font-semibold">Genre:</span> {bookData?.genre}
        </p>
        <p className="text-gray-700 mb-2">
          <span className="font-semibold">ISBN:</span> {bookData?.isbn}
        </p>
        <p className="text-gray-700 mb-2">
          <span className="font-semibold">Copies:</span> {bookData?.copies}
        </p>
        <p className="text-gray-700 mb-2">
          <span className="font-semibold">Available:</span>{" "}
          {bookData?.available ? "Yes" : "No"}
        </p>
        <p className="text-gray-700 mb-4">
          <span className="font-semibold">Description:</span>{" "}
          {bookData?.description || "No description available."}
        </p>
        <div className="flex justify-center mt-10 max-sm:flex-wrap">
          <BorrowBookModal
            bookId={bookId!}
            availableCopies={bookData?.copies}
          />
          <Button className="sm:mx-5 max-sm:w-full max-sm:my-3">
            <Link to={`/edit-book/${bookId}`}>Edit Book</Link>
          </Button>
          <Button className="max-sm:w-full text-lg" onClick={handleDeleteBook}>
            Delete Book
          </Button>
        </div>
      </div>
    </div>
  );
};

export default BookDetail;
