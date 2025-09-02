interface VideoDetailsWrapperProps {
  children: React.ReactNode;
}

export function VideoDetailsWrapper({ children }: VideoDetailsWrapperProps) {
  return (
    <div className="container mx-auto p-6 mt-12">
      <div className="card bg-base-100 shadow-xl">
        <div className="card-body">
          {children}
        </div>
      </div>
    </div>
  );
}
