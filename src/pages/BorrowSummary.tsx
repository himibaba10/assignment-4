import Spinner from "@/components/ui/Spinner";
import { useGetBorrowSummaryQuery } from "@/redux/api/baseApi";

type TItem = {
  book: {
    title: string;
    isbn: string;
  };
  totalQuantity: number;
};

const BorrowSummary = () => {
  const { data, isLoading } = useGetBorrowSummaryQuery(undefined);

  if (isLoading) {
    return <Spinner />;
  }

  const summaryData = data?.data;
  return (
    <section className="section my-10 md:my-20 min-h-[70vh]">
      <h2 className="text-3xl sm:text-5xl font-bold mb-5 sm:mb-10 text-center">
        Borrowed Books Summary
      </h2>
      {summaryData && summaryData.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {summaryData.map((item: TItem, idx: number) => (
            <div
              key={item.book.isbn || idx}
              className="p-4 border rounded shadow bg-white"
            >
              <div className="font-semibold">{item.book.title}</div>
              <div className="text-sm text-gray-600">
                ISBN: {item.book.isbn}
              </div>
              <div className="mt-2">
                Total Quantity:{" "}
                <span className="font-bold">{item.totalQuantity}</span>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center text-lg">No summary data available.</div>
      )}
    </section>
  );
};

export default BorrowSummary;
