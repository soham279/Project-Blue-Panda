import { LoadingSpinner } from "@/components/loading-spinner"
import { client } from "@/lib/client"
import { useQuery } from "@tanstack/react-query"

export const DashboardPageContent = () => {
  const { data: categories, isPending: isEventCategoriesLoading } = useQuery({
    queryKey: ["user-event-categories"],
    queryFn: async () => {
      const res = await client.category.getEventCategories.$get()
      const {categories} = await res.json()
      return categories
    },
  })

  if (isEventCategoriesLoading) {
    return (
      <div className="flex items-center justify-center flex-1 h-full w-full">
        <LoadingSpinner />
      </div>
    )
  }

  if(!categories || categories.length === 0){
    return (
      <div>empty state</div>
    )
  }

  return (
    <ul className="grid max-w-6xl grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
      {categories.map((category) => (
        <li key={category.id}></li>
      ))}
    </ul>
  )
}
