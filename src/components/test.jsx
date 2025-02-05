"use client"
import { Transition } from '@headlessui/react';
import { Fragment, useState } from 'react';
import { useTimeoutFn } from 'react-use';

export default function Example2() {
  const [isShowing, setIsShowing] = useState(true);
  const [, , resetIsShowing] = useTimeoutFn(() => setIsShowing(true), 500);

  return (
    <div className="flex flex-col items-center py-16">
      <div className="h-32 w-32">
        {/* Render the Transition component only on the client-side */}
        {typeof window !== 'undefined' && (
          <Transition
            as={Fragment}
            show={isShowing}
            enter="transform transition duration-[400ms]"
            enterFrom="opacity-0 rotate-[-120deg] scale-50"
            enterTo="opacity-100 rotate-0 scale-100"
            leave="transform duration-200 transition ease-in-out"
            leaveFrom="opacity-100 rotate-0 scale-100 "
            leaveTo="opacity-0 scale-95 "
          >
            <div className="h-full w-full rounded-md bg-white shadow-lg" />
          </Transition>
        )}
      </div>

      <button
        onClick={() => {
          setIsShowing(false);
          resetIsShowing();
        }}
        className="backface-visibility-hidden mt-8 flex transform items-center rounded-full bg-black/20 px-3 py-2 text-sm font-medium text-white transition hover:scale-105 hover:bg-black/30 focus:outline-none active:bg-black/40"
      >
        <svg viewBox="0 0 20 20" fill="none" className="h-5 w-5 opacity-70">
          <path
            d="M14.9497 14.9498C12.2161 17.6835 7.78392 17.6835 5.05025 14.9498C2.31658 12.2162 2.31658 7.784 5.05025 5.05033C7.78392 2.31666 12.2161 2.31666 14.9497 5.05033C15.5333 5.63385 15.9922 6.29475 16.3266 7M16.9497 2L17 7H16.3266M12 7L16.3266 7"
            stroke="currentColor"
            strokeWidth="1.5"
          />
        </svg>

        <span className="ml-3">Click to transition</span>
      </button>
    </div>
  );
}
