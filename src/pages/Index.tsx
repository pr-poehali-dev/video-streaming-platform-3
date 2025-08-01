import React, { useState, useRef } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import Icon from '@/components/ui/icon';

const Index = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Все');
  const [selectedVideo, setSelectedVideo] = useState(null);
  const [isPlayerOpen, setIsPlayerOpen] = useState(false);
  const [uploadedVideos, setUploadedVideos] = useState([]);
  const [isDragOver, setIsDragOver] = useState(false);
  const [showUploadZone, setShowUploadZone] = useState(false);
  const fileInputRef = useRef(null);

  const categories = ['Все', 'Фильмы', 'Сериалы', 'Документальные', 'Технологии', 'Музыка', 'Пользовательские'];

  const videos = [
    {
      id: 1,
      title: 'Эпический боевик 2024',
      description: 'Захватывающий фильм с невероятными спецэффектами',
      duration: '2:15:30',
      views: '1.2M',
      category: 'Фильмы',
      thumbnail: '/img/6f6cb359-70d7-413d-873f-a6174929d91d.jpg',
      videoUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
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
      videoUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_2mb.mp4',
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
      videoUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_5mb.mp4',
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
      videoUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_1mb.mp4',
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
      videoUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_2mb.mp4',
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
      videoUrl: 'https://sample-videos.com/zip/10/mp4/SampleVideo_1280x720_5mb.mp4',
      tags: ['ИИ', 'технологии', 'будущее']
    }
  ];

  const allVideos = [...videos, ...uploadedVideos];
  
  const filteredVideos = allVideos.filter(video => {
    const matchesSearch = video.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         video.description.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         video.tags.some(tag => tag.toLowerCase().includes(searchQuery.toLowerCase()));
    
    const matchesCategory = selectedCategory === 'Все' || video.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  const handleVideoClick = (video) => {
    setSelectedVideo(video);
    setIsPlayerOpen(true);
  };

  const handleFileUpload = (files) => {
    Array.from(files).forEach((file) => {
      if (file.type.startsWith('video/')) {
        const video = {
          id: Date.now() + Math.random(),
          title: file.name.replace(/\.[^/.]+$/, ''),
          description: 'Загруженное пользователем видео',
          duration: '0:00',
          views: '0',
          category: 'Пользовательские',
          thumbnail: '/placeholder.svg',
          videoUrl: URL.createObjectURL(file),
          tags: ['загружено', 'пользователь'],
          isUserUploaded: true,
          file: file
        };
        
        // Создаем превью для видео
        const videoElement = document.createElement('video');
        videoElement.src = video.videoUrl;
        videoElement.addEventListener('loadedmetadata', () => {
          const duration = Math.floor(videoElement.duration);
          const minutes = Math.floor(duration / 60);
          const seconds = duration % 60;
          video.duration = `${minutes}:${seconds.toString().padStart(2, '0')}`;
          
          // Генерируем thumbnail
          const canvas = document.createElement('canvas');
          const ctx = canvas.getContext('2d');
          canvas.width = 320;
          canvas.height = 180;
          videoElement.currentTime = 1;
          
          videoElement.addEventListener('seeked', () => {
            ctx.drawImage(videoElement, 0, 0, canvas.width, canvas.height);
            video.thumbnail = canvas.toDataURL();
            setUploadedVideos(prev => [...prev, video]);
          }, { once: true });
        });
      }
    });
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    setIsDragOver(false);
    const files = e.dataTransfer.files;
    handleFileUpload(files);
  };

  const handleFileInputChange = (e) => {
    const files = e.target.files;
    if (files.length > 0) {
      handleFileUpload(files);
    }
  };

  const removeUploadedVideo = (videoId) => {
    setUploadedVideos(prev => prev.filter(video => video.id !== videoId));
  };

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
              <Button 
                onClick={() => setShowUploadZone(!showUploadZone)}
                className="bg-primary text-white hover:bg-red-600"
              >
                <Icon name="Upload" size={20} className="mr-2" />
                Загрузить
              </Button>
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

        {/* Upload Zone */}
        {showUploadZone && (
          <div className="mb-8">
            <Card className="bg-gray-900 border-gray-800">
              <CardHeader>
                <CardTitle className="text-white flex items-center gap-2">
                  <Icon name="Upload" size={24} className="text-primary" />
                  Загрузить видео
                </CardTitle>
                <CardDescription className="text-gray-400">
                  Перетащите видеофайлы сюда или нажмите для выбора
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div
                  className={`border-2 border-dashed rounded-lg p-8 text-center transition-all duration-300 cursor-pointer ${
                    isDragOver 
                      ? 'border-primary bg-red-950/20 text-primary' 
                      : 'border-gray-600 hover:border-gray-500 text-gray-400'
                  }`}
                  onDragOver={handleDragOver}
                  onDragLeave={handleDragLeave}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                >
                  <Icon name="Upload" size={48} className="mx-auto mb-4" />
                  <p className="text-lg mb-2">Перетащите видео или нажмите для выбора</p>
                  <p className="text-sm">Поддерживаются форматы: MP4, AVI, MOV, WebM</p>
                  
                  <input
                    ref={fileInputRef}
                    type="file"
                    multiple
                    accept="video/*"
                    onChange={handleFileInputChange}
                    className="hidden"
                  />
                </div>
                
                {uploadedVideos.length > 0 && (
                  <div className="mt-6">
                    <h4 className="text-white font-medium mb-3">Загруженные видео ({uploadedVideos.length})</h4>
                    <div className="space-y-2 max-h-40 overflow-y-auto">
                      {uploadedVideos.map((video) => (
                        <div key={video.id} className="flex items-center justify-between bg-gray-800 p-3 rounded">
                          <div className="flex items-center gap-3">
                            <div className="w-12 h-8 bg-gray-700 rounded overflow-hidden">
                              <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover" />
                            </div>
                            <div>
                              <p className="text-white text-sm font-medium">{video.title}</p>
                              <p className="text-gray-400 text-xs">{video.duration}</p>
                            </div>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeUploadedVideo(video.id)}
                            className="text-red-400 hover:text-red-300 hover:bg-red-950/20"
                          >
                            <Icon name="Trash2" size={16} />
                          </Button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        )}

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
            <Card key={video.id} className={`bg-gray-900 border-gray-800 hover:bg-gray-800 transition-all duration-300 cursor-pointer group animate-fade-in ${video.isUserUploaded ? 'ring-1 ring-primary/20' : ''}`} onClick={() => handleVideoClick(video)}>
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
                
                <div className="flex flex-wrap gap-1 items-center">
                  {video.isUserUploaded && (
                    <Badge variant="outline" className="text-xs border-primary text-primary">
                      Моё видео
                    </Badge>
                  )}
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

      {/* Video Player Modal */}
      <Dialog open={isPlayerOpen} onOpenChange={setIsPlayerOpen}>
        <DialogContent className="max-w-4xl bg-black border-gray-800 text-white">
          <DialogHeader>
            <DialogTitle className="text-xl text-primary">{selectedVideo?.title}</DialogTitle>
          </DialogHeader>
          
          <div className="space-y-4">
            {/* Video Player */}
            <div className="relative bg-black rounded-lg overflow-hidden">
              <video
                controls
                className="w-full h-[60vh] object-contain"
                poster={selectedVideo?.thumbnail}
                src={selectedVideo?.videoUrl}
                autoPlay
              >
                Ваш браузер не поддерживает воспроизведение видео.
              </video>
            </div>
            
            {/* Video Info */}
            <div className="flex flex-col md:flex-row gap-4">
              <div className="flex-1">
                <p className="text-gray-300 mb-3">{selectedVideo?.description}</p>
                
                <div className="flex items-center gap-4 text-sm text-gray-400 mb-4">
                  <span className="flex items-center gap-1">
                    <Icon name="Eye" size={16} />
                    {selectedVideo?.views} просмотров
                  </span>
                  <span className="flex items-center gap-1">
                    <Icon name="Clock" size={16} />
                    {selectedVideo?.duration}
                  </span>
                  <Badge variant="outline" className="border-gray-700 text-gray-400">
                    {selectedVideo?.category}
                  </Badge>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {selectedVideo?.tags.map((tag) => (
                    <Badge key={tag} variant="secondary" className="text-xs bg-gray-800 text-gray-300">
                      #{tag}
                    </Badge>
                  ))}
                </div>
              </div>
              
              {/* Video Controls */}
              <div className="flex flex-col gap-2 min-w-fit">
                <Button variant="outline" className="border-gray-700 text-gray-300 hover:bg-gray-800">
                  <Icon name="ThumbsUp" size={16} className="mr-2" />
                  Нравится
                </Button>
                <Button variant="outline" className="border-gray-700 text-gray-300 hover:bg-gray-800">
                  <Icon name="Share" size={16} className="mr-2" />
                  Поделиться
                </Button>
                <Button variant="outline" className="border-gray-700 text-gray-300 hover:bg-gray-800">
                  <Icon name="Plus" size={16} className="mr-2" />
                  В плейлист
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

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