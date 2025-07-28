import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Все');

  const categories = ['Все', 'Фильмы', 'Сериалы', 'Документальные', 'Технологии', 'Музыка'];

  const videos = [
    {
      id: 1,
      title: 'Эпический боевик 2024',
      description: 'Захватывающий фильм с невероятными спецэффектами',
      duration: '2:15:30',
      views: '1.2M',
      category: 'Фильмы',
      thumbnail: '/img/6f6cb359-70d7-413d-873f-a6174929d91d.jpg',
      tags: ['боевик', 'драма', '2024']
    },
    {
      id: 2,
      title: 'Дикая природа Африки',
      description: 'Документальный фильм о животных саванны',
      duration: '58:45',
      views: '850K',
      category: 'Документальные',
      thumbnail: '/img/9c35c2e9-a3e1-4740-903f-d38c0b1fbbf4.jpg',
      tags: ['природа', 'документальный', 'животные']
    },
    {
      id: 3,
      title: 'Обзор новых гаджетов',
      description: 'Последние технологические новинки 2024 года',
      duration: '25:12',
      views: '320K',
      category: 'Технологии',
      thumbnail: '/img/dc388ee8-a49f-4c6a-9f92-7a8d8a1b3330.jpg',
      tags: ['технологии', 'обзор', 'гаджеты']
    },
    {
      id: 4,
      title: 'Мистический триллер',
      description: 'Загадочная история с неожиданным финалом',
      duration: '1:45:20',
      views: '2.1M',
      category: 'Фильмы',
      thumbnail: '/img/6f6cb359-70d7-413d-873f-a6174929d91d.jpg',
      tags: ['триллер', 'мистика', 'детектив']
    },
    {
      id: 5,
      title: 'Секреты океана',
      description: 'Удивительный мир морских глубин',
      duration: '42:30',
      views: '670K',
      category: 'Документальные',
      thumbnail: '/img/9c35c2e9-a3e1-4740-903f-d38c0b1fbbf4.jpg',
      tags: ['океан', 'документальный', 'природа']
    },
    {
      id: 6,
      title: 'Будущее ИИ',
      description: 'Как искусственный интеллект изменит мир',
      duration: '35:45',
      views: '1.5M',
      category: 'Технологии',
      thumbnail: '/img/dc388ee8-a49f-4c6a-9f92-7a8d8a1b3330.jpg',
      tags: ['ИИ', 'технологии', 'будущее']
    }
  ];

  const filteredVideos = videos.filter(video => {
    const matchesSearch = video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         video.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         video.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'Все' || video.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Header */}
      <header className="bg-black border-b border-gray-800 sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold text-primary">VideoStream</h1>
              <nav className="hidden md:flex space-x-6">
                <a href="#" className="hover:text-primary transition-colors">Главная</a>
                <a href="#" className="hover:text-primary transition-colors">Популярное</a>
                <a href="#" className="hover:text-primary transition-colors">Новое</a>
              </nav>
            </div>
            
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Поиск видео..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="w-80 bg-gray-900 border-gray-700 text-white placeholder-gray-400 pr-10"
                />
                <Icon name="Search" className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              </div>
              <Button variant="outline" size="icon" className="border-gray-700 text-white hover:bg-gray-800">
                <Icon name="User" size={20} />
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* Category Filter */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-wrap gap-2 mb-8">
          {categories.map((category) => (
            <Button
              key={category}
              variant={selectedCategory === category ? "default" : "outline"}
              onClick={() => setSelectedCategory(category)}
              className={`${
                selectedCategory === category 
                  ? 'bg-primary text-white' 
                  : 'bg-transparent border-gray-700 text-gray-300 hover:bg-gray-800'
              }`}
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Search Results Info */}
        {searchQuery && (
          <div className="mb-6">
            <p className="text-gray-400">
              Найдено {filteredVideos.length} результатов для "{searchQuery}"
            </p>
          </div>
        )}

        {/* Video Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredVideos.map((video) => (
            <Card key={video.id} className="bg-gray-900 border-gray-800 hover:bg-gray-800 transition-all duration-300 cursor-pointer group animate-fade-in">
              <div className="relative overflow-hidden">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute bottom-2 right-2 bg-black bg-opacity-75 px-2 py-1 rounded text-xs text-white">
                  {video.duration}
                </div>
                <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300 flex items-center justify-center">
                  <Icon name="Play" className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" size={48} />
                </div>
              </div>
              
              <CardHeader className="p-4">
                <CardTitle className="text-white text-lg line-clamp-2 group-hover:text-primary transition-colors">
                  {video.title}
                </CardTitle>
                <CardDescription className="text-gray-400 line-clamp-2">
                  {video.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent className="p-4 pt-0">
                <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                  <span>{video.views} просмотров</span>
                  <Badge variant="outline" className="border-gray-700 text-gray-400">
                    {video.category}
                  </Badge>
                </div>
                
                <div className="flex flex-wrap gap-1">
                  {video.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs bg-gray-800 text-gray-300 hover:bg-gray-700">
                      #{tag}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* No Results */}
        {filteredVideos.length === 0 && (
          <div className="text-center py-16">
            <Icon name="Search" className="mx-auto text-gray-600 mb-4" size={64} />
            <h3 className="text-xl text-gray-400 mb-2">Ничего не найдено</h3>
            <p className="text-gray-500">Попробуйте изменить поисковый запрос или выбрать другую категорию</p>
          </div>
        )}
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 border-t border-gray-800 mt-16">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-bold text-primary mb-4">VideoStream</h3>
              <p className="text-gray-400 text-sm">
                Ваша любимая платформа для просмотра видео контента
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-3">Категории</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-primary transition-colors">Фильмы</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Сериалы</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Документальные</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-3">Поддержка</h4>
              <ul className="space-y-2 text-sm text-gray-400">
                <li><a href="#" className="hover:text-primary transition-colors">Помощь</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Контакты</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">О нас</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold text-white mb-3">Соцсети</h4>
              <div className="flex space-x-3">
                <Button variant="ghost" size="icon" className="text-gray-400 hover:text-primary">
                  <Icon name="Facebook" size={20} />
                </Button>
                <Button variant="ghost" size="icon" className="text-gray-400 hover:text-primary">
                  <Icon name="Twitter" size={20} />
                </Button>
                <Button variant="ghost" size="icon" className="text-gray-400 hover:text-primary">
                  <Icon name="Instagram" size={20} />
                </Button>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-6 text-center text-sm text-gray-500">
            © 2024 VideoStream. Все права защищены.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;