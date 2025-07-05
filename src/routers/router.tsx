import App from "@/App";
import AllBooks from "@/pages/AllBooks";
import BookDetail from "@/pages/BookDetail";
import BorrowSummary from "@/pages/BorrowSummary";
import CreateBook from "@/pages/CreateBook";
import EditBook from "@/pages/EditBook";
import { createBrowserRouter } from "react-router";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <AllBooks /> },
      { path: "/create-book", element: <CreateBook /> },
      { path: "/books", element: <AllBooks /> },
      { path: "/books/:bookId", element: <BookDetail /> },
      { path: "/edit-book/:bookId", element: <EditBook /> },
      { path: "/borrow-summary", element: <BorrowSummary /> },
    ],
  },
]);

export default router;
