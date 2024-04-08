import Link from "next/link";

export default function Header() {
  return (
    <>
      <header className="flex flex-wrap sm:justify-start sm:flex-nowrap z-50 w-full bg-white border-b border-gray-200 text-sm py-3 sm:py-0 ">
        <nav
          className="relative max-w-7xl w-full mx-auto px-4 sm:flex sm:items-center sm:justify-between sm:px-6 lg:px-8"
          aria-label="Global">
          <div className="flex items-center justify-between">
            <Link
              className="flex-none text-xl font-semibold "
              href="/"
              aria-label="Brand">
              AIBlogging
            </Link>
          </div>
          <div id="navbar-collapse-with-animation" className="">
            <div className="flex flex-col gap-y-4 gap-x-0 mt-5 sm:flex-row sm:items-center sm:justify-end sm:gap-y-0 sm:gap-x-7 sm:mt-0 sm:ps-7">
              <Link
                className="flex items-center font-medium text-gray-500 border-2 border-indigo-600 text-center p-2 rounded-md hover:text-blue-600 sm:border-s sm:my-6 "
                href="/writearticle">
                Create Post
              </Link>
            </div>
          </div>
        </nav>
      </header>
    </>
  );
}
