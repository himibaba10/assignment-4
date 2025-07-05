import { Button } from "@/components/ui/button";
import {
  Card,
  CardAction,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { TBook } from "../Home/BookCardContainer";
import { useNavigate } from "react-router";

type BookCardProps = { book: TBook };

const BookCard = ({ book }: BookCardProps) => {
  const navigate = useNavigate();
  const handleBookClick = () => {
    navigate(`/books/${book._id}`);
  };

  return (
    <Card>
      <CardHeader className="flex flex-col grow">
        <CardTitle className="text-xl sm:text-2xl">{book.title}</CardTitle>
        <CardDescription>{book.description}</CardDescription>
        <CardAction>By {book.author}</CardAction>
        <CardAction>Genre: {book.genre}</CardAction>
        <CardAction>Available Copies: {book.copies}</CardAction>
      </CardHeader>
      <CardFooter>
        <Button onClick={handleBookClick}>Get Detail</Button>
      </CardFooter>
    </Card>
  );
};

export default BookCard;
