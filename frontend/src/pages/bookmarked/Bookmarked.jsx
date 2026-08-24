import React, { useEffect, useState } from "react";
import useStore from "../../store/useStore";
import AdItem from "../../components/adItem/AdItem";
import { PiTrashLight } from "react-icons/pi";
import { BsFillEmojiDizzyFill } from "react-icons/bs";
import { HiOutlineArrowLeft, HiOutlineArrowRight } from "react-icons/hi2";
import { toast } from "react-toastify";
import axios from "axios";

const BOOKMARKS_PER_PAGE = 9;

const Bookmarked = () => {
  const { url, user, bookmarks, fetchBookmarks } = useStore();
  const [currentPage, setCurrentPage] = useState(1);

  const numberOfPages = Math.max(1, Math.ceil((bookmarks?.length || 0) / BOOKMARKS_PER_PAGE));
  const pageBookmarks = (bookmarks || []).slice(
    (currentPage - 1) * BOOKMARKS_PER_PAGE,
    currentPage * BOOKMARKS_PER_PAGE
  );
  const pageNumbers = Array.from({ length: numberOfPages }, (_, i) => i + 1);

  useEffect(() => {
    setCurrentPage(1);
  }, [bookmarks?.length]);

  const emptyBookmark = async () => {
    try {
      await axios.delete(`${url}/api/user/empty-bookmarks/${user}`);
      toast.success("Bookmark Empty !");

      const removeSimilarItems = (prefix) => {
        Object.keys(localStorage).forEach((key) => {
          if (key.startsWith(prefix)) {
            localStorage.removeItem(key);
          }
        });
      };

      removeSimilarItems("bookmark");
      fetchBookmarks();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col gap-6 p-2.5">
      <div className="flex items-center justify-between flex-wrap gap-3">
        <h1 className="text-2xl sm:text-3xl font-bold text-navy dark:text-white">
          Ads in your Bookmark Collection
        </h1>

        {bookmarks?.length > 0 && (
          <button
            className="flex items-center gap-1.5 rounded-lg border border-red-700 bg-white dark:bg-transparent px-4 py-2 text-sm text-red-700 hover:bg-red-700 hover:text-white transition"
            onClick={emptyBookmark}
          >
            Empty Collection <PiTrashLight className="text-lg" />
          </button>
        )}
      </div>

      {bookmarks?.length === 0 ? (
        <div className="flex flex-col items-center gap-2 py-20 text-center">
          <h3 className="flex items-center gap-2 text-lg text-navy dark:text-white">
            You haven't bookmarked any ad <BsFillEmojiDizzyFill className="text-2xl" />
          </h3>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
            {pageBookmarks.map((item) => (
              <AdItem
                key={item._id}
                id={item._id}
                title={item.title}
                description={item.description}
                price={item?.price}
                adImage={item.adImage}
                state={item.state}
                condition={item?.condition}
                terms={item?.terms}
                item={item}
              />
            ))}
          </div>

          {numberOfPages > 1 && (
            <nav className="flex items-center justify-center gap-2 mt-4">
              <button
                onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="flex items-center gap-1 rounded-lg border border-navy dark:border-white/20 px-3 py-1.5 text-sm text-navy dark:text-white disabled:opacity-40"
              >
                <HiOutlineArrowLeft /> Prev
              </button>

              {pageNumbers.map((n) => (
                <button
                  key={n}
                  onClick={() => setCurrentPage(n)}
                  className={`rounded-lg px-3 py-1.5 text-sm border ${
                    currentPage === n
                      ? "bg-navy text-white border-navy dark:bg-accent dark:text-navy-deep dark:border-accent"
                      : "border-navy/30 dark:border-white/20 text-navy dark:text-white"
                  }`}
                >
                  {n}
                </button>
              ))}

              <button
                onClick={() => setCurrentPage((p) => Math.min(numberOfPages, p + 1))}
                disabled={currentPage === numberOfPages}
                className="flex items-center gap-1 rounded-lg border border-navy dark:border-white/20 px-3 py-1.5 text-sm text-navy dark:text-white disabled:opacity-40"
              >
                Next <HiOutlineArrowRight />
              </button>
            </nav>
          )}
        </>
      )}
    </div>
  );
};

export default Bookmarked;
