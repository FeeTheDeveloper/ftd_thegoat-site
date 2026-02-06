'use client';

export function SquarePayButton() {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();

    const url = 'https://square.link/u/BoMH7jVp?src=embed';
    const width = 500;
    const height = Math.round(window.innerHeight * 0.75);
    const left = Math.round((window.innerWidth - width) / 2);
    const top = Math.round((window.innerHeight - height) / 2);

    const popup = window.open(
      url,
      'square_checkout',
      `width=${width},height=${height},left=${left},top=${top},scrollbars=yes`
    );

    if (popup) {
      popup.focus();
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className="h-12 min-w-[212px] rounded-lg bg-[#006aff] px-6 font-semibold text-white transition-colors hover:bg-[#0055cc]"
    >
      Pay Now – $150
    </button>
  );
}
