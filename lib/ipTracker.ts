import ViewerCounter from './components/ViewerCounter'

export default function HomePage() {
  return (
    <main className="min-h-screen flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold">Welcome to Nvidia Core</h1>
      <ViewerCounter />
    </main>
  )
}
