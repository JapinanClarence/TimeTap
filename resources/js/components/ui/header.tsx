
export function Header ({children}: {
    children: React.ReactNode;
}) {
  return (
    <div className="text-xl md:text-3xl font-semibold font-poppins mb-5">
      {children}
    </div>
  )
}

