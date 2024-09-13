export default function Tags({ posts }) {
  const trendingTags = Array.from(new Set(posts.flatMap((post) => post.tags)))
    .map((tag) => ({
      name: tag,
      count: posts.filter((post) => post.tags.includes(tag)).length,
    }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5)

  return (
    <div className="mb-8">
      <h2 className="text-sm font-medium text-gray-600 mb-3">Trending Tags</h2>
      <div className="flex flex-wrap gap-2">
        {trendingTags.map((tag) => (
          <span
            key={tag.name}
            className="text-xs bg-gray-100 text-gray-600 rounded-full px-2 py-1"
          >
            #{tag.name}
            <span className="text-gray-400 ml-1">{tag.count}</span>
          </span>
        ))}
      </div>
    </div>
  )
}
