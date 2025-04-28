
import { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { mockNewsData } from "@/services/mockData";

interface NewsItem {
  id: string;
  title: string;
  source: string;
  date: string;
  summary: string;
  url: string;
  imageUrl: string;
  category: string;
}

interface NewsData {
  articles: NewsItem[];
}

const NewsWidget = () => {
  const [newsData, setNewsData] = useState<NewsData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState("All");

  useEffect(() => {
    // In a real implementation, we'd fetch from an API
    const fetchData = async () => {
      setIsLoading(true);
      // Simulate API call
      setTimeout(() => {
        setNewsData(mockNewsData);
        setIsLoading(false);
      }, 1000);
    };

    fetchData();
  }, []);

  const categories = ["All", "Technology", "Business", "Health", "Sports"];

  const filteredNews = newsData?.articles.filter((article) => {
    if (activeCategory === "All") return true;
    return article.category === activeCategory;
  });

  if (isLoading) {
    return (
      <Card className="dashboard-card animate-pulse">
        <CardHeader className="dashboard-card-header">
          <CardTitle className="dashboard-card-title">Latest News</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded-md"></div>
          {[1, 2, 3].map((i) => (
            <div key={i} className="flex space-x-4">
              <div className="w-20 h-20 bg-gray-200 dark:bg-gray-700 rounded-md"></div>
              <div className="flex-1 space-y-2">
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-md"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-md w-3/4"></div>
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded-md w-1/2"></div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    );
  }

  if (!newsData) {
    return (
      <Card className="dashboard-card">
        <CardHeader className="dashboard-card-header">
          <CardTitle className="dashboard-card-title">Latest News</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-500 dark:text-gray-400">Unable to load news data.</p>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="dashboard-card animate-enter">
      <CardHeader className="dashboard-card-header">
        <CardTitle className="dashboard-card-title">Latest News</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex overflow-x-auto pb-2 mb-4 space-x-2 scrollbar-none">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-1 text-sm font-medium rounded-full whitespace-nowrap ${
                activeCategory === category
                  ? "bg-primary-100 text-primary-700 dark:bg-primary-900 dark:text-primary-300"
                  : "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400"
              }`}
            >
              {category}
            </button>
          ))}
        </div>
        <div className="space-y-4">
          {filteredNews?.slice(0, 4).map((article) => (
            <a 
              href={article.url} 
              target="_blank" 
              rel="noopener noreferrer"
              key={article.id}
              className="flex space-x-4 hover:bg-gray-50 dark:hover:bg-gray-800 p-2 rounded-md transition-colors"
            >
              <div className="w-20 h-20 bg-gray-200 dark:bg-gray-700 rounded-md overflow-hidden flex-shrink-0">
                <img 
                  src={article.imageUrl} 
                  alt={article.title} 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="flex-1">
                <h4 className="font-medium text-gray-900 dark:text-white line-clamp-2">{article.title}</h4>
                <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                  {article.source} · {article.date}
                </p>
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-1 line-clamp-2">
                  {article.summary}
                </p>
              </div>
            </a>
          ))}
          <div className="text-center pt-2">
            <button className="text-sm text-primary-600 dark:text-primary-400 font-medium hover:underline">
              View All News
            </button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default NewsWidget;
