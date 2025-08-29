export default function Loading() {
  return (
    <main className="min-h-screen bg-bg flex items-center justify-center p-6">
      <div className="text-center">
        <div className="w-8 h-8 rounded-full border-2 border-primary border-t-transparent animate-spin mx-auto mb-3" />
        <p className="text-muted">Loading…</p>
      </div>
    </main>
  );
}
