import BookList from "@/components/BookList";
import BookOverview from "@/components/BookOverview";
import Header from "@/components/Header";
import { sampleBooks } from "@/constants";
// import { db } from "@/database/drizzle";
// import { books, users } from "@/database/schema";
// import { auth } from "@/auth";
// import { desc } from "drizzle-orm";

const Home = async () => {
  // const session = await auth();

  // const latestBooks = (await db
  //   .select()
  //   .from(books)
  //   .limit(10)
  //   .orderBy(desc(books.createdAt))) as Book[];

  return (
    <>
      {/* @ts-ignore */}

      <BookOverview {...sampleBooks[0]} />

      {/* <BookList
        title="Latest Books"
        books={latestBooks.slice(1)}
        containerClassName="mt-28"
      /> */}
    </>
  );
};

export default Home;
