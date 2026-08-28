export function Logo() {
  return (
    <div className="flex flex-col items-center gap-2">
      <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary">
        <svg
          width="28"
          height="28"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M4 11C4 7.13401 7.13401 4 11 4H13C16.866 4 20 7.13401 20 11V11C20 11.5523 19.5523 12 19 12H5C4.44772 12 4 11.5523 4 11V11Z"
            stroke="#FAF6F1"
            strokeWidth="1.6"
          />
          <path
            d="M4 12L4.83707 17.0224C4.99128 17.9548 5.7969 18.6392 6.74166 18.6392H17.2583C18.2031 18.6392 19.0087 17.9548 19.1629 17.0224L20 12"
            stroke="#FAF6F1"
            strokeWidth="1.6"
            strokeLinecap="round"
          />
          <path
            d="M9 4C9 3 9.5 2 11 2"
            stroke="#FAF6F1"
            strokeWidth="1.4"
            strokeLinecap="round"
          />
          <path
            d="M13 4C13 3 13.5 2 15 2"
            stroke="#FAF6F1"
            strokeWidth="1.4"
            strokeLinecap="round"
          />
        </svg>
      </div>
      <div className="text-center">
        <h1 className="text-xl font-semibold tracking-tight text-charcoal">
          Cozinha Delivery
        </h1>
      </div>
    </div>
  );
}
