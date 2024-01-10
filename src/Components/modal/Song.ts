class Song {
    public description: string;
    public img: string;
    public title: string;
    public url: string;
    public id: number;
    public category: number;
    public categoryName: string;
    public favorite: boolean;
    
    constructor(
      description: string,
      img: string,
      title: string,
      url: string,
      id: number,
      category: number,
      categoryName: string,
      favorite: boolean,
    ) {
      this.description = description;
      this.img = img;
      this.title = title;
      this.url = url;
      this.id = id;
      this.category = category;
      this.categoryName = categoryName;
      this.favorite = favorite;
    }
  }
  
  export default Song;